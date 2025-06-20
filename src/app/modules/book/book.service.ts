import { TBook } from "./book.interface";
import { Book } from "./book.model";

// 1. Create a new book
const createBookIntoDB = async (payload: TBook) => {
  // isbn is checked by static method
  if (await Book.isBookExistsByISBN(payload.isbn)) {
    throw new Error("A book with this ISBN already exists.");
  }
  const result = await Book.create(payload);
  return result;
};

// 2. Get all books with filtering and sorting
const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const {
    filter,
    sortBy = "createdAt", // default shorting field
    sort = "desc", // default shorting order
    limit = 10, // default limit
  } = query;

  const filterQuery: Record<string, unknown> = {};
  if (filter) {
    filterQuery.genre = filter;
  }

  const sortOrder = sort === "asc" ? 1 : -1;

  const result = await Book.find(filterQuery)
    .sort({ [sortBy as string]: sortOrder })
    .limit(Number(limit));

  return result;
};

// 3. Get a single book by ID
const getSingleBookFromDB = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

// 4. Update a book
const updateBookInDB = async (id: string, payload: Partial<TBook>) => {
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// 5. Delete a book
const deleteBookFromDB = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookInDB,
  deleteBookFromDB,
};
