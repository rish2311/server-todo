// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Error handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
