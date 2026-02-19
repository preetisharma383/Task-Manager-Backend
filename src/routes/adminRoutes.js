import express from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  deleteAllUsers,
  assignTask,
} from "../controllers/auth/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", protect, isAdmin, createUser);
router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users", protect, isAdmin, deleteAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.post("/assign-task", protect, isAdmin, assignTask);

export default router;
