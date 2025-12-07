// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services].
//  You shall not disclose such confidential information and shall use it only in accordance
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]
// src/config/config.js
import { config } from "dotenv";
config();

export const port = process.env.PORT || 9000;
export const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://Amarjeet_223711:Hostel90311@cluster1.2thf3.mongodb.net/jobPortal?retryWrites=true w=majority&appName=Cluster1";
