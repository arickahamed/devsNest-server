import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import taskRoutes from "./tasks/taskRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'https://devs-nest-client-hbnq.vercel.app',  
  credentials: true                 
}));

app.use(cookieParser());


const mongoUri = process.env.MONGO_URI || "";
if (!mongoUri) {
  throw new Error("MONGO_URI missing");
}
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection error:", err));

app.use("/api/tasks", taskRoutes);

app.listen(8080, () => {
  console.log("Server running on https://devs-nest-client-hbnq.vercel.app");
});

export default app;
