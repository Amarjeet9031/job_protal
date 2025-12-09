import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);
oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const sendGmail = async ({ to, subject, html }) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const raw = Buffer.from(
      `To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${html}`
    ).toString("base64url");

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    console.log("📩 Email sent via Gmail API:", res.data.id);
    return { success: true };
  } catch (err) {
    console.error("❌ Gmail API send error:", err);
    return { success: false, error: err.message };
  }
};

export const sendEmailtoUser = (email, linkOrOTP, type = "link") => {
  const subject = type === "link" ? "Verify Your Email" : "Your OTP Code";
  const html =
    type === "link"
      ? `<p>Please click the link below to verify your email:</p><a href="${linkOrOTP}">${linkOrOTP}</a>`
      : `<p>Your OTP code is: <strong>${linkOrOTP}</strong></p>`;

  return sendGmail({ to: email, subject, html });
};

export const sendStatusEmail = (email, name, jobTitle, status) => {
  const subject =
    status === "Shortlisted"
      ? `Congratulations! You are shortlisted for ${jobTitle}`
      : `Update on your ${jobTitle} application`;

  const html =
    status === "Shortlisted"
      ? `<p>Hello ${name},</p><p>You are shortlisted for <strong>${jobTitle}</strong>.</p>`
      : `<p>Hello ${name},</p><p>Unfortunately, you were not selected for <strong>${jobTitle}</strong>.</p>`;

  return sendGmail({ to: email, subject, html });
};

export const sendApplicantThankYou = (email, name, jobTitle) => {
  return sendGmail({
    to: email,
    subject: `Thank you for applying for ${jobTitle}`,
    html: `<p>Hello ${name},</p><p>Thank you for applying for <strong>${jobTitle}</strong>.</p>`,
  });
};
