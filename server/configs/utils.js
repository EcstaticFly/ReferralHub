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

export const sendBulkEmail = async (recipientEmails, subject, baseText, referralLinks) => {
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
    const referralEntry = referralLinks.find((entry) => entry.referredEmail === email);
    const referralLink = referralEntry ? referralEntry.referralLink : "Link not available";

    // Build a personalized message including the referral link
    // const personalizedText = `${baseText}\n\nYour personal referral link: ${referralLink}`;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject,
      // text: personalizedText,
      // If you want HTML, you could add:
      html: `<p>${baseText}</p><p>Your personal referral link: <a href="${referralLink}">${referralLink}</a></p>`
    };

    return transporter.sendMail(mailOptions);
  });

  await Promise.all(emailPromises);
};


