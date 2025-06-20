import { Request, Response } from "express";
import { Book } from "./book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const book = await Book.create(bookData);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Validation Failed",
      error: error.message,
    });
  }
};
