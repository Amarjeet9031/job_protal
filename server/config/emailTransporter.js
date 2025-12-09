import nodemailer from "nodemailer";
import { google } from "googleapis";

export const createTransporter = async () => {
  console.log("🔍 Creating OAuth2 Transporter...");

  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.OAUTH_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await oAuth2Client.getAccessToken();

  if (!accessToken.token) {
    throw new Error("No Access Token received");
  }

  console.log("🔑 Access Token:", accessToken.token);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

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
};
