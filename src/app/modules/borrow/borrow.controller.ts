import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { BorrowServices } from "./borrow.service";

const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BorrowServices.borrowBookIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
});

const getBorrowedBooksSummary = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BorrowServices.getBorrowedBooksSummaryFromDB();
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  }
);

export const BorrowControllers = {
  borrowBook,
  getBorrowedBooksSummary,
};
