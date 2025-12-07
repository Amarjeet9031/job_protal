// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is confidential and proprietary.
// ============================================================

// ================================
// job.routes.js
// ================================

import express from "express";
const router = express.Router();

import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";

// ROUTES
router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
