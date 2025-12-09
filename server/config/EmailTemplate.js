// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services].
//  You shall not disclose such confidential information and shall use it only in accordance
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]
import createTransporter from "./emailTransporter.js";

export const sendEmailtoUser = async (email, linkOrOTP, type = "link") => {
  try {
    const transporter = await createTransporter();  // <-- FIX

    let html, subject;

    if (type === "link") {
      subject = "Verify Your Email";
      html = `
        <p>Please click the link below to verify your email:</p>
        <a href="${linkOrOTP}">${linkOrOTP}</a>
      `;
    } else {
      subject = "Your OTP Code";
      html = `<p>Your OTP code is: <strong>${linkOrOTP}</strong></p>`;
    }

    const info = await transporter.sendMail({
      from: process.env.OAUTH_USER_EMAIL,  
      to: email,
      subject,
      html,
    });

    console.log("✅ Verification/OTP Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Verification/OTP Email Error:", err.message);
    return { success: false, error: err.message };
  }
};


/**
 * Send Job Application Status Email (Shortlisted / Rejected)
 */
export const sendStatusEmail = async (email, name, jobTitle, status) => {
  try {
    const transporter = await createTransporter();  // <-- FIX

    let subject, html;

    if (status === "Shortlisted") {
      subject = `Congratulations! You are shortlisted for ${jobTitle}`;
      html = `<p>Hello ${name},</p><p>You are shortlisted for <strong>${jobTitle}</strong>.</p>`;
    } else {
      subject = `Update on your ${jobTitle} application`;
      html = `<p>Hello ${name},</p><p>Unfortunately, you were not selected for <strong>${jobTitle}</strong>.</p>`;
    }

    const info = await transporter.sendMail({
      from: process.env.OAUTH_USER_EMAIL,
      to: email,
      subject,
      html,
    });

    console.log("📩 Status Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Status Email Error:", err.message);
    return { success: false, error: err.message };
  }
};


/**
 * Send Thank-you Email to Applicant
 */
export const sendApplicantThankYou = async (email, name, jobTitle) => {
  try {
    const transporter = await createTransporter();  // <-- FIX

    const info = await transporter.sendMail({
      from: process.env.OAUTH_USER_EMAIL,
      to: email,
      subject: `Thank you for applying for ${jobTitle}`,
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for applying for <strong>${jobTitle}</strong>.</p>
      `,
    });

    console.log("📩 Applicant Thank-you Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Applicant Email Error:", err.message);
    return { success: false, error: err.message };
  }
};

