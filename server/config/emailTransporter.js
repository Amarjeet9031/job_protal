import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

// OAuth2 Client
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

async function createTransporter() {
  try {
    // Get a fresh access token
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token || accessTokenResponse;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token for Gmail OAuth2");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",   // Explicit SMTP host
      port: 465,                // SSL port
      secure: true,             // Use SSL
      auth: {
        type: "OAuth2",
        user: process.env.OAUTH_USER_EMAIL, // Must match Gmail used to generate refresh token
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Verify transporter connection
    await transporter.verify();
    console.log("✅ Transporter verified successfully");
    return transporter;
  } catch (error) {
    console.error("❌ Email Transporter Error:", error);
    throw error; // Ensure calling function knows transport failed
  }
}

export default createTransporter;
