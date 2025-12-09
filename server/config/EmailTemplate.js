

import nodemailer from "nodemailer";


/**
 * Function: sendEmailtoUser
 * Description: Sends a verification email to the user with the provided link.
 * 
 * 
 * sendEmailtoUser = async (link, email)
 * sendStatusEmail = async (email, name, jobTitle, status)
 * sendApplicantThankYou = async (email, name, jobTitle)
 */// 🔹 Template for sendEmailtoUser(link, email)
export const verificationTemplate = (link) => {
  return `
    <div style="font-family:Arial; padding:20px;">
      <h2>Email Verification</h2>
      <p>Please click the button below to verify your email:</p>
      <a href="${link}"
         style="display:inline-block; background:#4CAF50; color:#fff; padding:10px 20px; 
                border-radius:5px; text-decoration:none;">
         Verify Email
      </a>
      <p>If button doesn't work, copy this link:</p>
      <p>${link}</p>
    </div>
  `;
};

// 🔹 Template for sendStatusEmail(email, name, jobTitle, status)
export const jobStatusTemplate = (name, jobTitle, status) => {
  return `
    <div style="font-family:Arial; padding:20px;">
      <h2>Hello ${name},</h2>
      <p>Your application status for <strong>${jobTitle}</strong> has been updated.</p>

      <h3>Status: 
        <span style="color:${status === "Shortlisted" ? "green" : "red"};">
          ${status}
        </span>
      </h3>

      ${
        status === "Shortlisted"
          ? `<p>🎉 Congratulations! You have been shortlisted. We will contact you soon.</p>`
          : `<p>Unfortunately, you were not selected. Thank you for applying.</p>`
      }
    </div>
  `;
};

// 🔹 Template for sendApplicantThankYou(email, name, jobTitle)
export const applicantThankYouTemplate = (name, jobTitle) => {
  return `
    <div style="font-family:Arial; padding:20px;">
      <h2>Hello ${name},</h2>
      <p>Thank you for applying for <strong>${jobTitle}</strong>.</p>
      <p>Your application has been received successfully.</p>
      <p>We will review it and contact you soon.</p>
    </div>
  `;
};
