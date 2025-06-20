import { Types } from "mongoose";

export interface TBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
