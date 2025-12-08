// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights
//  reserved. This software is confidential and proprietary.
// ============================================================
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./logger.js";
import morgan from "morgan";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/job.routes.js";
import applicantRoutes from "./routes/applicant.routes.js";

// Socket IO
import { setSocket } from "./controllers/job.controller.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// ================================
// MIDDLEWARE
// ================================
app.use(express.json({ limit: "10mb" }));

app.use(cors({
  origin: [
    process.env.FRONTEND_URL
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// ================================
// API ROUTES
// ================================
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/auth", authRoutes);

// ================================
// NO FRONTEND SERVING (Render backend only)
// ================================
app.get("/", (req, res) => {
  res.send("Job Portal Backend is running 👍");
});

// ================================
// SERVER + SOCKET
// ================================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
});

setSocket(io);

io.on("connection", (socket) => {
  logger.info(`🟢 Client connected: ${socket.id}`);
  socket.on("disconnect", () => {
    logger.info(`🔴 Client disconnected: ${socket.id}`);
  });
});

// ================================
// START SERVER
// ================================
const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error("❌ Server start error: " + err.message);
  }
};

start();
