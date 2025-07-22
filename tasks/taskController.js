import Task from "./taskModel.js";

export const postTask  = async( req,  res) => {
    try {
            const { title, description, dueDate, status, priority } = req.body;
            const task = new Task({
                title,
                description,
                dueDate,
                status,
                priority,
            });
            const savedTask = await task.save();
            res.status(201).json({
                success: true,
                message: "Congratulations, task created",
                data: savedTask
            });
        } catch (err) {
            res.status(400).json({success: false, message: "Something wrong", error: err.message });
        }
};

export const getTask = async(req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });

        res.json({success: true, message: "Task deleted successfully", deletedTask });
    } catch (err) {
        res.status(500).json({success: false, message: "Something went wrong", error: err.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, status, priority },
            { new: true }
        );

        // checking throught git add

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            updatedTask,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
};