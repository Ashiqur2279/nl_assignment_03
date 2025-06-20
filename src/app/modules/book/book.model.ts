import { Schema, model } from "mongoose";
import { BookModel, TBook, TGenre } from "./book.interface";

const genreValues: TGenre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const bookSchema = new Schema<TBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: genreValues, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Mongoose Middleware (pre-save hook)
bookSchema.pre("save", function (next) {
  // when the book number is 0 then available will be false
  if (this.isModified("copies") && this.copies === 0) {
    this.available = false;
  }
  // when the book number increase then available will be true
  if (this.isModified("copies") && this.copies > 0) {
    this.available = true;
  }
  next();
});

// Mongoose Static Method
bookSchema.statics.isBookExistsByISBN = async function (isbn: string) {
  return this.findOne({ isbn });
};

export const Book = model<TBook, BookModel>("Book", bookSchema);
