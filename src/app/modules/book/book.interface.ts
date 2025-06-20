import { Model } from "mongoose";

export type TGenre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface TBook {
  title: string;
  author: string;
  genre: TGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

// for static method
export interface BookModel extends Model<TBook> {
  // eslint-disable-next-line no-unused-vars
  isBookExistsByISBN(isbn: string): Promise<TBook | null>;
}
