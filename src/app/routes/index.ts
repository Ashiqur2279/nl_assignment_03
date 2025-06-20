import express from "express";
import { BookRoutes } from "../modules/book/book.route";
import { BorrowRoutes } from "../modules/borrow/borrow.route";

const router = express.Router();

router.use("/books", BookRoutes);
router.use("/borrow", BorrowRoutes);

export default router;
