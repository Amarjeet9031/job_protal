// server/config/emailTransporter.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,           // Set in Render environment variables
    pass: process.env.EMAIL_PASSWORD,  // Gmail App Password
  },
});

// Verify transporter on startup
transporter.verify((err, success) => {
  if (err) console.error("❌ Email Transporter Error:", err);
  else console.log("✅ Email Transporter Ready");
});

export default transporter;
