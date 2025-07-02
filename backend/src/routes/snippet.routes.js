import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createSnippet,
  getUserSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
} from "../controllers/snippet.controller.js";

const router = express.Router();


router.use(verifyJWT);


router.post("/", createSnippet);
router.get("/", getUserSnippets);
router.get("/:id", getSnippetById);
router.patch("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);

export default router;