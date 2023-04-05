import express from "express";
const router = express.Router();
import { getBooks, getBook, addBooks, deleteBook, updateBook } from "../controllers/bookController.js";


router.get("/", getBooks);
router.post("/", addBooks);
router.get("/:id", getBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

export default router;