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

async function sendEmail(to,email, text) {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    };
    // console.log("h1");
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
    // console.log("h2");

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Error occured: ", error.message);
      else console.log("OTP sent successfully: ", info.response);
    });
    // console.log("h3");
    return true;
  } catch (e) {
    console.log("Otp sending fail.");
    return false;
  }
}

export const sendBulkEmail = async (recipients, subject, text) => {
  const emailPromises = recipients.map(email => sendEmail(email, subject, text));
  await Promise.all(emailPromises);
};

