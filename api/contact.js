import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  'https://gearshyft.nl',
  'https://www.gearshyft.nl',
  'http://localhost:5173',
];

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const cors = getCorsHeaders(origin);
  Object.entries(cors).forEach(([key, val]) => res.setHeader(key, val));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'GearShyft Website <noreply@gearshyft.nl>',
      to: ['max@gearshyft.nl'],
      replyTo: email,
      subject: `Nieuw bericht van ${name}`,
      html: `
        <h2>Nieuw contactbericht via gearshyft.nl</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Autoresponder to the visitor
    await resend.emails.send({
      from: 'Max van GearShyft <noreply@gearshyft.nl>',
      to: [email],
      replyTo: 'max@gearshyft.nl',
      subject: 'Bedankt voor je bericht',
      html: `
        <p>Hi ${name},</p>
        <p>Bedankt voor je bericht via gearshyft.nl. Ik neem binnen een werkdag contact met je op.</p>
        <p>Groet,<br>Max Poppes<br>GearShyft</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
