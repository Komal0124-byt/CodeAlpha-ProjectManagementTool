import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/project/:projectId", protect, getTasksByProject);
router.put("/:id/status", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);
export default router;