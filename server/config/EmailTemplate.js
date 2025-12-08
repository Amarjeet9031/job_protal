// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services].
//  You shall not disclose such confidential information and shall use it only in accordance
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]
import transporter from "./emailTransporter";
/**
 * Function: sendEmailtoUser
 * Description: Sends a verification email to the user with the provided link.
 */
// Verification Email
export const sendEmailtoUser = async (link, email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<a href="${link}">Verify Email</a>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Function: sendStatusEmail
 * Description: Sends job application status email (Shortlisted / Rejected)
 */
// Status Email
export const sendStatusEmail = async (email, name, jobTitle, status) => {
  try {
    let subject, html;
    if (status === "Shortlisted") {
      subject = `Congratulations! You are shortlisted for ${jobTitle}`;
      html = `<p>Hello ${name},<br/>You are shortlisted for <strong>${jobTitle}</strong>.</p>`;
    } else {
      subject = `Update on your ${jobTitle} application`;
      html = `<p>Hello ${name},<br/>Unfortunately, you were not selected for <strong>${jobTitle}</strong>.</p>`;
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      html,
    });
    console.log("📩 Status Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Status Email Error:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Function: sendApplicantThankYou
 * Description: Sends a thank-you email to the applicant after applying
 */
// Applicant Thank You
export const sendApplicantThankYou = async (email, name, jobTitle) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Thank you for applying for ${jobTitle}`,
      html: `<p>Hello ${name},<br/>Thank you for applying for <strong>${jobTitle}</strong>.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📩 Applicant Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Applicant Email Error:", err);
    return { success: false, error: err.message };
  }
};
