import mongoose from "mongoose";
import AppError from "../../../utils/AppError";
import { Book } from "../book/book.model";
import { TBorrow } from "./borrow.interface";
import { Borrow } from "./borrow.model";

const borrowBookIntoDB = async (payload: TBorrow) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { book: bookId, quantity } = payload;
    const book = await Book.findById(bookId).session(session);

    if (!book) {
      throw new AppError("Book not found!", 404); // 404 Not Found
    }
    if (!book.available || book.copies < quantity) {
      throw new AppError("Book not available or insufficient copies.", 400); // 400 Bad Request
    }

    book.copies -= quantity;
    await book.save({ session: session });

    const borrowRecord = await Borrow.create([payload], { session: session });

    if (!borrowRecord.length) {
      throw new AppError("Failed to create borrow record", 500);
    }

    await session.commitTransaction();
    await session.endSession();
    return borrowRecord[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getBorrowedBooksSummaryFromDB = async () => {
  const result = await Borrow.aggregate([
    { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    { $unwind: "$bookDetails" },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);
  return result;
};

export const BorrowServices = {
  borrowBookIntoDB,
  getBorrowedBooksSummaryFromDB,
};
