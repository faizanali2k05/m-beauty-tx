import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Startup log to check if environment variables are detected
  console.log('--- Server Startup ---');
  console.log('SMTP_USER detected:', !!process.env.SMTP_USER);
  console.log('SMTP_PASS detected:', !!process.env.SMTP_PASS);
  console.log('SMTP_SERVICE:', process.env.SMTP_SERVICE || 'gmail (default)');
  console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL || 'Maribolivar94@gmail.com (default)');

  // API Route for Booking
  app.post('/api/book', async (req, res) => {
    const { name, phone, date, time, serviceName, servicePrice, notes } = req.body;

    if (!name || !phone || !date || !time || !serviceName) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('!!! EMAIL CONFIG MISSING: SMTP_USER or SMTP_PASS not found in Secrets !!!');
      console.log('Booking details:', req.body);
      return res.json({ 
        success: true, 
        message: 'Reserva registrada (Modo Demo)', 
        warning: 'Configuración de email incompleta en el servidor.' 
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
        from: `M Beauty TX <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || 'Maribolivar94@gmail.com',
        subject: `Nueva Reserva: ${serviceName} - ${name}`,
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
                <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-weight: bold; letter-spacing: 2px;">NUEVA CITA AGENDADA</h1>
              </div>

              <!-- Main Content -->
              <div style="padding: 30px 25px; color: #ffffff;">
                <!-- Details Box -->
                <div style="background-color: #1a1a1a; border: 1px solid #d4af37; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                  <p style="margin: 0 0 15px 0; font-size: 14px;">
                    <span style="color: #d4af37; font-weight: bold;">Cliente:</span> 
                    <span style="color: #ffffff;">${name}</span>
                  </p>
                  <p style="margin: 0 0 15px 0; font-size: 14px;">
                    <span style="color: #d4af37; font-weight: bold;">Teléfono:</span> 
                    <span style="color: #ffffff;">${phone}</span>
                  </p>
                  <p style="margin: 0 0 15px 0; font-size: 14px;">
                    <span style="color: #d4af37; font-weight: bold;">Servicio:</span> 
                    <span style="color: #ffffff;">${serviceName}</span>
                  </p>
                  <p style="margin: 0 0 15px 0; font-size: 14px;">
                    <span style="color: #d4af37; font-weight: bold;">Precio:</span> 
                    <span style="color: #ffffff;">${servicePrice}</span>
                  </p>
                  <p style="margin: 0 0 15px 0; font-size: 14px;">
                    <span style="color: #d4af37; font-weight: bold;">Fecha:</span> 
                    <span style="color: #ffffff;">${date}</span>
                  </p>
                  <p style="margin: 0 0 0 0; font-size: 14px;">
                    <span style="color: #d4af37; font-weight: bold;">Hora:</span> 
                    <span style="color: #ffffff;">${time}</span>
                  </p>
                  ${notes ? `
                  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #444;">
                    <p style="margin: 0; font-size: 14px;">
                      <span style="color: #d4af37; font-weight: bold;">Notas del Cliente:</span>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 13px; color: #d0d0d0; font-style: italic;">${notes}</p>
                  </div>
                  ` : ''}
                </div>

                <!-- Action Reminder -->
                <div style="background-color: rgba(212, 175, 55, 0.1); border-left: 4px solid #d4af37; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                  <p style="margin: 0; font-size: 13px; color: #d4af37;">
                    <strong>⭐ Recuerda:</strong> Confirma la cita con el cliente y prepárate para su llegada.
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
      console.log('Booking email sent successfully to:', mailOptions.to);
      res.json({ success: true, message: 'Reserva enviada con éxito' });
    } catch (error: any) {
      console.error('CRITICAL: Error sending booking email:', error.message);
      res.status(500).json({ 
        error: 'Error al enviar el email', 
        details: error.message 
      });
    }
  });

  // API Route for Contact Form
  app.post('/api/contact', async (req, res) => {
    const { name, phone, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('!!! CONTACT CONFIG MISSING: SMTP_USER or SMTP_PASS not found !!!');
      console.log('Contact details:', req.body);
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
      console.log('Contact email sent successfully to:', mailOptions.to);
      res.json({ success: true, message: 'Mensaje enviado con éxito' });
    } catch (error: any) {
      console.error('CRITICAL: Error sending contact email:', error.message);
      res.status(500).json({ 
        error: 'Error al enviar el mensaje por email', 
        details: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
