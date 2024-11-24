import { Router } from "express";
import {
  getAllMembers,
  getMemberDetails,
} from "../controllers/memberController";

const router = Router();

router.get("/", getAllMembers);
router.get("/:id", getMemberDetails);

export default router;
