// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import { Schema, model } from "mongoose";

const applicantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  jobTitle: { type: String, required: true },
//   jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  resumeUrl: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Shortlisted", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default model("Applicant", applicantSchema);
