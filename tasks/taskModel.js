// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
        required: true,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
