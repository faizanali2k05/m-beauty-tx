import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('!!! EMAIL CONFIG MISSING: SMTP_USER or SMTP_PASS not found !!!');
    return res.json({
      success: true,
      message: 'Mensaje recibido (Modo Demo)',
      warning: 'Email no enviado. Configura SMTP_USER y SMTP_PASS.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `M Beauty TX Contact <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || 'Maribolivar94@gmail.com',
      replyTo: email,
      subject: `Nuevo Mensaje de Contacto: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #d4af37; padding: 20px; border-radius: 10px; background-color: #fcfcfc;">
          <h2 style="color: #d4af37; text-align: center; text-transform: uppercase;">Nuevo Mensaje</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888; text-align: center;">M Beauty TX - Dallas, Texas</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
    res.json({ success: true, message: 'Mensaje enviado con éxito' });
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    res.status(500).json({
      error: 'Error al enviar el mensaje por email',
      details: error.message
    });
  }
}
