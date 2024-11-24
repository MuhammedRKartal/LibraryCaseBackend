import { Router } from "express";
import { borrowBook, returnBook } from "../controllers/borrowController";

const router = Router();

router.post("/members/:memberId/borrow/:bookId", borrowBook);
router.post("/members/:memberId/return/:bookId", returnBook);

export default router;
