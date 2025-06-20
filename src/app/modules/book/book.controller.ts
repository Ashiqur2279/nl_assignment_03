import { Request, Response } from "express";
import { BookServices } from "./book.service";

// 1. Create Book
const createBook = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.createBookIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create book",
      error: error,
    });
  }
};

// 2. Get All Books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBooksFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error,
    });
  }
};

// 3. Get Single Book by ID
const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BookServices.getSingleBookFromDB(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error,
    });
  }
};

// 4. Update Book
const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BookServices.updateBookInDB(id, req.body);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error,
    });
  }
};

// 5. Delete Book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BookServices.deleteBookFromDB(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null, // if delete successfully the data will be null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error,
    });
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
