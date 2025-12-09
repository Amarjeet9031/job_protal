import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});
export const createTransporter = async () => {
  try {
    console.log("🔍 Creating OAuth2 Transporter...");
    console.log("CLIENT_ID:", process.env.OAUTH_CLIENT_ID ? "Loaded" : "Missing");
    console.log("CLIENT_SECRET:", process.env.OAUTH_CLIENT_SECRET ? "Loaded" : "Missing");
    console.log("REFRESH_TOKEN:", process.env.OAUTH_REFRESH_TOKEN ? "Loaded" : "Missing");
    console.log("USER_EMAIL:", process.env.OAUTH_USER_EMAIL);

    const accessToken = await oAuth2Client.getAccessToken();
    console.log("🔑 Access Token:", accessToken);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.OAUTH_USER_EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    console.log("✅ Transporter created successfully");
    return transporter;
  } catch (err) {
    console.error("❌ Transporter Creation Error:", err);
    throw err;
  }
};
