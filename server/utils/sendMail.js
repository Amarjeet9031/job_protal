import { createTransporter } from "../config/emailTransporter.js";
import {
  verificationTemplate,
  jobStatusTemplate,
  applicantThankYouTemplate,
} from "../config/EmailTemplate.js";

// 1️⃣ sendEmailtoUser(link, email)
export const sendEmailtoUser = async (link, email) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: process.env.OAUTH_USER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: verificationTemplate(link),
    });

    console.log("📧 Verification Email Sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Verification Email Error:", err.message);
    return { success: false, error: err.message };
  }
};

// 2️⃣ sendStatusEmail(email, name, jobTitle, status)
export const sendStatusEmail = async (email, name, jobTitle, status) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: process.env.OAUTH_USER_EMAIL,
      to: email,
      subject: `Application Status Update – ${jobTitle}`,
      html: jobStatusTemplate(name, jobTitle, status),
    });

    console.log("📧 Status Email Sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Status Email Error:", err.message);
    return { success: false, error: err.message };
  }
};

// 3️⃣ sendApplicantThankYou(email, name, jobTitle)
export const sendApplicantThankYou = async (email, name, jobTitle) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: process.env.OAUTH_USER_EMAIL,
      to: email,
      subject: `Thank You for Applying – ${jobTitle}`,
      html: applicantThankYouTemplate(name, jobTitle),
    });

    console.log("📧 Thank You Email Sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Thank You Email Error:", err.message);
    return { success: false, error: err.message };
  }
};
