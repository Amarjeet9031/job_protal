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
import path from "path";

// Socket.io logic
import { setSocket } from "./controllers/job.controller.js";
import { Server } from "socket.io";

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 9000;

const _dirname = path.resolve();
// ================================
// MIDDLEWARE
// ================================
app.use(cors({
  origin:["https://job-protal-1-bwud.onrender.com"],
  credentials:true,
}

));
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(_dirname, "/client/dist")));

// Default test route — fixes Render 404 spam


// ================================
// CREATE HTTP SERVER
// ================================
const server = http.createServer(app);

// ================================
// SOCKET.IO CONFIG
// ================================
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://job-protal-1-bwud.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});





// Pass io instance to controller
setSocket(io);

// Socket events
io.on("connection", (socket) => {
  logger.info(`🟢 Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`🔴 Client disconnected: ${socket.id}`);
  });
});

// ================================
// API ROUTES
// ================================
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/auth", authRoutes);

// ================================
// START SERVER
// ================================
app.use(express.static(path.join(_dirname, "/client/dist")));

// Fallback route for React (Express v5 compatible)
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

const start = async () => {
  try {
    logger.info("Starting server...");
    await connectDB();

    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Server failed to start: " + error.message);
  }
};

start();




// app.get("/", (req, res) => {
//   res.send("Job Portal Backend API is running 👍");
// });

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
// });