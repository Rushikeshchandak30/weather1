// utils/sendEmail.js
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email using this token: ${token}`,
    html: `<p>Please verify your email using this token: <b>${token}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
};
