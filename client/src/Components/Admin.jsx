import React, { useState } from "react";
import axios from "axios";

const API = "https://job-protal-fbct.onrender.com/api/admin";

export default function Admin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    try {
      const res = await axios.post(`${API}/signup`, form, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Signup failed.");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, form, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(res.data.message);

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
      }
    } catch (error) {
      setMessage("Login failed.");
    }
  };

  return (
    <div style={{ width: "320px", margin: "80px auto", textAlign: "center" }}>
      <h2>Admin Login / Signup</h2>

      <input type="text" name="username" placeholder="Username"
        value={form.username} onChange={handleChange}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }} />

      <input type="password" name="password" placeholder="Password"
        value={form.password} onChange={handleChange}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={signup} style={{ width: "48%", padding: "10px" }}>
          Signup
        </button>

        <button onClick={login} style={{ width: "48%", padding: "10px" }}>
          Login
        </button>
      </div>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
