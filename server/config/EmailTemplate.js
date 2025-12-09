import { createTransporter } from "../config/emailTransporter.js";

// Send verification / OTP email
export const sendEmailtoUser = async (linkOrOTP, email, type = "link") => {
  try {
    const transporter = await createTransporter();
    const subject = type === "link" ? "Verify Your Email" : "Your OTP Code";
    const html =
      type === "link"
        ? `<h2>Verify Your Email</h2><p>Please click the link below:</p><a href="${linkOrOTP}">Verify Email</a>`
        : `<h2>Your OTP Code</h2><p><strong>${linkOrOTP}</strong></p>`;

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

// Send job application status email
export const sendStatusEmail = async (email, name, jobTitle, status) => {
  try {
    const transporter = await createTransporter();
    const subject =
      status === "Shortlisted"
        ? `Congratulations! You are Shortlisted for ${jobTitle}`
        : `Update on your ${jobTitle} Application`;

    const html =
      status === "Shortlisted"
        ? `<h2>Hello ${name}</h2><p>🎉 Congratulations! You are shortlisted for <strong>${jobTitle}</strong>.</p>`
        : `<h2>Hello ${name}</h2><p>Unfortunately, your application was <strong>not selected</strong> for <strong>${jobTitle}</strong>.</p>`;

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

// Send applicant thank-you email
export const sendApplicantThankYou = async (email, name, jobTitle) => {
  try {
    const transporter = await createTransporter();
    const subject = `Thank you for applying for ${jobTitle}`;
    const html = `<h2>Hello ${name}</h2><p>Thank you for applying for <strong>${jobTitle}</strong>.</p><p>We will contact you soon.</p>`;

    const info = await transporter.sendMail({
      from: process.env.OAUTH_USER_EMAIL,
      to: email,
      subject,
      html,
    });

    console.log("📩 Applicant Thank-You Email sent:", info.response);
    return { success: true };
  } catch (err) {
    console.error("❌ Applicant Email Error:", err.message);
    return { success: false, error: err.message };
  }
};
