"use server";

import nodemailer from "nodemailer";
import { OAuth2Client } from 'google-auth-library';
import type { z } from "zod";
import { contactFormSchema } from "@/lib/schemas";

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export type SendContactMessageResult = {
  success: boolean;
  message: string;
};

export async function sendContactMessage(
  data: ContactFormInputs
): Promise<SendContactMessageResult> {
  const { name, email, message } = data;

  const {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REFRESH_TOKEN,
  } = process.env;

  const senderEmail = "MnOadmin@sirius-sc.vn";
  const recipientEmail = "infor@sirius-sc.vn";

  if (!name || !email || !message) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET || !OAUTH_REFRESH_TOKEN) {
    console.error("Server Error: OAuth2 credentials are not configured for sending email.");
    return {
      success: false,
      message: "Server Error: Failed to send message.",
    };
  }

  try {
    const oauth2Client = new OAuth2Client(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: OAUTH_REFRESH_TOKEN
    });

    const { token } = await oauth2Client.getAccessToken();

    if (!token) {
        throw new Error("Failed to get access token.");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: senderEmail,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: token,
      },
    });

    const mailOptions = {
      from: `"${name}" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Inquiry from the Sirius Website - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Inquiry from Sirius Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };

  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: "There was an error sending your message. Please try again.",
    };
  }
}
