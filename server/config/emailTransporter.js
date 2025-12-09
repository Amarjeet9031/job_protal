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
    console.log("🔍 Getting Access Token...");
    const accessTokenResponse = await oauth2Client.getAccessToken();

    console.log("accessToken response:", accessTokenResponse);

    const accessToken = accessTokenResponse?.token || accessTokenResponse;

    if (!accessToken) {
      console.log("❌ ACCESS TOKEN NOT GENERATED");
      throw new Error("No access token received");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.OAUTH_USER_EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken,
      },
    });

    await transporter.verify();
    console.log("✅ Transporter verified");
    return transporter;
  } catch (err) {
    console.error("❌ Transporter Error:", err);
    throw err;
  }
};
