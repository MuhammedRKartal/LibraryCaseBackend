import { getBookDetails, getAllBooks } from "../controllers/bookController";
import { Router } from "express";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookDetails);

export default router;
