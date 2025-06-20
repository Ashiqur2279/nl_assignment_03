import express from "express";
import { BookRoutes } from "../modules/book/book.route";

const router = express.Router();

router.use("/books", BookRoutes);

export default router;
