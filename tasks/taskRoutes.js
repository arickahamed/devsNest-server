import express from "express";
import { deleteTask, getTask, postTask, updateTask } from "./taskController.js";

const router = express.Router();

router.post("/post-task", postTask);
router.get("/get-all-tasks", getTask);
router.delete("/delete-task/:id", deleteTask);
router.put("/update-task/:id", updateTask);

export default router;
