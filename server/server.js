// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights
//  reserved. This software is confidential and proprietary.
// ============================================================

import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/job.routes.js";
import applicantRoutes from "./routes/applicant.routes.js";

// Socket.io logic
import { setSocket } from "./controllers/job.controller.js";
import { Server } from "socket.io";

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 9000;

// ================================
// MIDDLEWARE
// ================================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Static file serving

// ================================
// API ROUTES
// ================================
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/auth", authRoutes);

// ================================
// CREATE HTTP SERVER
// ================================
const server = http.createServer(app);

// ================================
// SOCKET.IO CONFIG
// ================================
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Share IO instance with controllers
setSocket(io);

// Log events
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ================================
// START SERVER
// ================================
const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

start();
