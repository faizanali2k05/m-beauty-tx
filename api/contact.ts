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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a1a;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #2a2a2a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <!-- Header with Brand -->
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 20px; text-align: center; border-bottom: 2px solid #d4af37;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-weight: bold; letter-spacing: 2px;">NUEVO MENSAJE</h1>
            </div>

            <!-- Main Content -->
            <div style="padding: 30px 25px; color: #ffffff;">
              <!-- Details Box -->
              <div style="background-color: #1a1a1a; border: 1px solid #d4af37; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                <p style="margin: 0 0 15px 0; font-size: 14px;">
                  <span style="color: #d4af37; font-weight: bold;">Nombre:</span>
                  <span style="color: #ffffff;">${name}</span>
                </p>
                <p style="margin: 0 0 15px 0; font-size: 14px;">
                  <span style="color: #d4af37; font-weight: bold;">Email:</span>
                  <span style="color: #ffffff;">${email}</span>
                </p>
                <p style="margin: 0 0 15px 0; font-size: 14px;">
                  <span style="color: #d4af37; font-weight: bold;">Teléfono:</span>
                  <span style="color: #ffffff;">${phone || 'No proporcionado'}</span>
                </p>
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #444;">
                  <p style="margin: 0 0 10px 0; font-size: 14px;">
                    <span style="color: #d4af37; font-weight: bold;">Mensaje:</span>
                  </p>
                  <p style="margin: 0; font-size: 13px; color: #d0d0d0; white-space: pre-wrap; font-style: italic;">${message}</p>
                </div>
              </div>

              <!-- Action Reminder -->
              <div style="background-color: rgba(212, 175, 55, 0.1); border-left: 4px solid #d4af37; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 13px; color: #d4af37;">
                  <strong>📧 Responde a:</strong> ${email}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #1a1a1a; border-top: 1px solid #444; padding: 20px; text-align: center; font-size: 12px; color: #888;">
              <p style="margin: 5px 0;">M Beauty TX</p>
              <p style="margin: 5px 0; color: #d4af37;">Dallas, Texas</p>
            </div>
          </div>
        </body>
        </html>
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
