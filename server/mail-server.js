import http from 'node:http';
import nodemailer from 'nodemailer';

const PORT = Number(process.env.MAIL_SERVER_PORT || 3001);
const RECIPIENT_EMAIL = 'siddhantvij001@gmail.com';
const SMTP_USER = process.env.GMAIL_SMTP_USER || '';
const SMTP_PASSWORD = process.env.GMAIL_SMTP_PASSWORD || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/lead') {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  if (!SMTP_USER || !SMTP_PASSWORD) {
    sendJson(res, 500, {
      error:
        'Mail server is not configured. Set GMAIL_SMTP_USER and GMAIL_SMTP_PASSWORD.',
    });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const {
      name,
      contactNumber,
      siteLocation,
      email,
      remarks,
      role,
      material,
      timeline,
    } = body;

    if (!name || !contactNumber) {
      sendJson(res, 400, {
        error: 'Name and contact number are required.',
      });
      return;
    }

    await transporter.sendMail({
      from: `"Aluminous Website" <${SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `New enquiry from ${name}`,
      html: buildLeadHtml({
        name,
        contactNumber,
        siteLocation,
        email,
        remarks,
        role,
        material,
        timeline,
      }),
    });

    sendJson(res, 200, { success: true });
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    sendJson(res, 500, { error: 'Failed to process enquiry.' });
  }
});

server.listen(PORT, () => {
  console.log(`Mail server listening on http://localhost:${PORT}`);
});

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    ...corsHeaders,
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(rawBody || '{}'));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function buildLeadHtml({
  name,
  contactNumber,
  siteLocation,
  email,
  remarks,
  role,
  material,
  timeline,
}) {
  return `
    <h2>New Lead Enquiry from Aluminous Website</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px; font-family: Arial, sans-serif;">
      <tr style="background-color: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; width: 200px;">Name</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Contact Number</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(contactNumber)}</td>
      </tr>
      <tr style="background-color: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Site Location</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(siteLocation || 'Not provided')}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Email</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(email || 'Not provided')}</td>
      </tr>
      <tr style="background-color: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Role in Project</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(role || 'Not specified')}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Preferred Material</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(material || 'Not specified')}</td>
      </tr>
      <tr style="background-color: #f8f9fa;">
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Timeline</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(timeline || 'Not specified')}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Remarks</td>
        <td style="padding: 12px; border: 1px solid #dee2e6;">${escapeHtml(remarks || 'None')}</td>
      </tr>
    </table>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
