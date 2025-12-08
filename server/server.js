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

import { setSocket } from "./controllers/job.controller.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;
const _dirname = path.resolve();

// ================================
// CORS
// ================================
app.use(
  cors({
    origin: ["https://job-protal-1-bwud.onrender.com","https://job-protal-fbct.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ================================
// MIDDLEWARE
// ================================
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// ================================
// API ROUTES (MUST COME BEFORE STATIC)
// ================================
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/auth", authRoutes);

// ================================
// SOCKET.IO
// ================================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://job-protal-1-bwud.onrender.com","https://job-protal-fbct.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

setSocket(io);

io.on("connection", (socket) => {
  logger.info(`🟢 Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`🔴 Client disconnected: ${socket.id}`);
  });
});

// ================================
// STATIC FILES (ONLY ONCE, AT BOTTOM)
// ================================
app.use(express.static(path.join(_dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

// ================================
// START SERVER
// ================================
const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () =>
      logger.info(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    logger.error("❌ Server failed: " + error.message);
  }
};

start();




// app.get("/", (req, res) => {
//   res.send("Job Portal Backend API is running 👍");
// });

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
// });