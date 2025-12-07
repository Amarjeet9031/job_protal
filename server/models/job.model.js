// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]
import { Schema, model } from "mongoose";

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: String, required: true },
    Opening: { type: Number, required: true },
    experience: { type: String, default: "Fresher" },
    salary: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Job", JobSchema);
