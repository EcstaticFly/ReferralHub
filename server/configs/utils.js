import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export const sendBulkEmail = async (
  recipientEmails,
  subject,
  baseText,
  referralLinks
) => {
  // Create a transporter (adjust settings as needed)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.SECRET_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Create an array of email sending promises
  const emailPromises = recipientEmails.map(async (email) => {
    // Find the referral entry for this email from referralLinks array
    const referralEntry = referralLinks.find(
      (entry) => entry.referredEmail === email
    );
    const referralLink = referralEntry
      ? referralEntry.referralLink
      : "Link not available";

      const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${referralLink !== "Link not available" ? "You're Invited!" : "Thank You!"}</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333; text-align: center; margin-bottom: 20px;">
              ${referralLink !== "Link not available" ? "You're Invited!" : "Thank You!"}
            </h1>
            <p style="color: #555555; font-size: 16px; line-height: 1.5;">Hello,</p>
            <p style="color: #555555; font-size: 16px; line-height: 1.5;">
              ${baseText}
            </p>
    
            ${referralLink !== "Link not available" ? 
              `<div style="text-align: center; margin: 30px 0;">
                <a href="${referralLink}" 
                  style="display: inline-block; background-color: #007BFF; color: #ffffff; 
                  text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 16px;">
                  Join Now
                </a>
              </div>` 
            : ""}
    
            <p style="color: #777777; font-size: 14px; line-height: 1.5; text-align: center; margin-top: 20px;">
              If you have any questions, please contact our support team.
            </p>
            <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 30px;">
              © 2025 Your Company. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `;
    
    

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html: htmlTemplate,
    };

    return transporter.sendMail(mailOptions);
  });

  await Promise.all(emailPromises);
  console.log("All emails sent!");
};
