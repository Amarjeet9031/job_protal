import { resend, FROM_EMAIL } from "../config/emailTransporter.js";

// ==============================
// 1. Send Verification or OTP Email
// ==============================


export const sendEmailtoUser = async (link, email) => {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<h2>Verify Your Email</h2><p>Click <a href="${link}">here</a> to verify.</p>`,
    });

    console.log("✅ Email sent:", response);
    return { success: true };
  } catch (err) {
    console.error("❌ Email sending error:", err.message);
    return { success: false, error: err.message };
  }
};


// ==============================
// 2. Send Job Application Status Email
// ==============================
export const sendStatusEmail = async (email, name, jobTitle, status) => {
  try {
    const subject =
      status === "Shortlisted"
        ? `Congratulations! You are Shortlisted for ${jobTitle}`
        : `Update on your ${jobTitle} Application`;

    const html =
      status === "Shortlisted"
        ? `
        <h2>Hello ${name}</h2>
        <p>🎉 Congratulations! You are shortlisted for <strong>${jobTitle}</strong>.</p>
      `
        : `
        <h2>Hello ${name}</h2>
        <p>We appreciate your interest in <strong>${jobTitle}</strong>.</p>
        <p>Unfortunately, you were not selected.</p>
      `;

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    });

    console.log("📩 Status Email sent:", response?.id);
    return { success: true };
  } catch (err) {
    console.error("❌ Status Email Error:", err.message);
    return { success: false, error: err.message };
  }
};

// ==============================
// 3. Send Thank-You Email (After Job Application)
// ==============================
export const sendApplicantThankYou = async (email, name, jobTitle) => {
  try {
    const subject = `Thank you for applying for ${jobTitle}`;

    const html = `
      <h2>Hello ${name}</h2>
      <p>Thank you for applying for <strong>${jobTitle}</strong>.</p>
      <p>We will review your application and contact you soon.</p>
    `;

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    });

    console.log("📩 Applicant Thank-You Email sent:", response?.id);
    return { success: true };
  } catch (err) {
    console.error("❌ Applicant Email Error:", err.message);
    return { success: false, error: err.message };
  }
};
