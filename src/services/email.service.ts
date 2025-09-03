import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email enviado: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error al enviar email:", error);
    throw error;
  }
};
