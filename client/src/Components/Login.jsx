// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of
//  [Rasa Consultancy Services]. You shall not disclose such confidential 
//  information and shall use it only in accordance with the license agreement.
// --------------------------------------------------------------------------

import React, { useState } from "react";
import axios from "axios";

const API = "https://job-protal-fbct.onrender.com/api/admin";

export default function Admin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("login"); // login / signup

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      const url = mode === "login" ? `${API}/login` : `${API}/signup`;

      const res = await axios.post(url, form, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(res.data.message);

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
      }
    } catch (error) {
      setMessage(`${mode === "login" ? "Login" : "Signup"} failed.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 px-4">
      {/* Card */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
        
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wider">
          {mode === "login" ? "Admin Login" : "Create Admin Account"}
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 text-white focus:ring-2 focus:ring-indigo-300 outline-none"
            placeholder="Enter username"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 text-white focus:ring-2 focus:ring-indigo-300 outline-none"
            placeholder="Enter password"
          />
        </div>

        {/* Button */}
        <button
          onClick={submitForm}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all"
        >
          {mode === "login" ? "Login" : "Signup"}
        </button>

        {/* Switch Mode */}
        <p className="text-center mt-4 text-sm text-white/80">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}  
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="ml-1 text-yellow-300 font-semibold underline hover:text-yellow-400"
          >
            {mode === "login" ? "Signup" : "Login"}
          </button>
        </p>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center bg-white/20 p-2 rounded-lg font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
