import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Project Management Tool API Running...");
});

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});