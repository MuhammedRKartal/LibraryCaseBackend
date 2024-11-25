import { Router } from "express";
import { borrowBook, returnBook } from "../controllers/borrowController";

const router = Router();

router.post("/users/:memberId/borrow/:bookId", borrowBook);
router.post("/users/:memberId/return/:bookId", returnBook);

export default router;
