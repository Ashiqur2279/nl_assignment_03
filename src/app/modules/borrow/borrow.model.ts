import { Schema, model } from "mongoose";
import { TBorrow } from "./borrow.interface";

const borrowSchema = new Schema<TBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is mandatory"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is mandatory"],
      min: [1, "Quantity must be a positive number"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is mandatory"],
    },
  },
  {
    timestamps: true,
  }
);

export const Borrow = model<TBorrow>("Borrow", borrowSchema);
