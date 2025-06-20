import express from "express";
import bookRoutes from "./modules/book/book.route";

const router = express.Router();
router.use("/api", bookRoutes);

export default router;
