import express from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
} from "../controllers/commentsControllers";

export const router = express.Router();

router.get("/", getAllComments);
router.get("/:commentId", getCommentById);
router.post("/", createComment);
