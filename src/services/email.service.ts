import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { create } from "express-handlebars";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
  },
});

// Configuración de handlebars (v7)
// Instancia de express-handlebars
const hbsEngine = create({
  extname: ".hbs",
  layoutsDir: path.resolve(__dirname, "../../templates/"),
  defaultLayout: false,
  partialsDir: path.resolve(__dirname ,"../../templates/partials/"), // opcional
});

// Configuración handlebars para nodemailer
const handlebarOptions = {
  viewEngine: hbsEngine,              // ✅ ahora es instancia
  viewPath: path.resolve(__dirname, "../../templates/"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));


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

/**
 * Envía un correo con un template handlebars
 * @param to Destinatario
 * @param subject Asunto del correo
 * @param template Nombre del archivo .hbs dentro de /templates
 * @param context Variables dinámicas para el template
 */
export const sendTemplateEmail = async (
  to: string,
  subject: string,
  template: string,
  context: Record<string, any>
) => {
  try {
    const info = await transporter.sendMail({
      from: `"Mi App 🚀" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      template, // por ejemplo: "mtb-confirmation"
      context,
    } as any);

    console.log("📩 Email enviado:", info);
    return info;
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    throw error;
  }
};