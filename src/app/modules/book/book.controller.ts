import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { BookServices } from "./book.service";

// 1. Create Book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.createBookIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

// 2. Get All Books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.getAllBooksFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

// 3. Get Single Book by ID
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.getSingleBookFromDB(id);
  if (!result) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

// 4. Update Book
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.updateBookInDB(id, req.body);
  if (!result) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

// 5. Delete Book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await BookServices.deleteBookFromDB(id);
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
