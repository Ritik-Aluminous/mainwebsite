import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'info@aluminous.in';

export async function sendLeadEmail(payload, env = process.env) {
  const smtpUser = env.GMAIL_SMTP_USER || '';
  const smtpPassword = env.GMAIL_SMTP_PASSWORD || '';

  if (!smtpUser || !smtpPassword) {
    throw createError(
      'Mail server is not configured. Set GMAIL_SMTP_USER and GMAIL_SMTP_PASSWORD.',
      500,
    );
  }

  validateLeadPayload(payload);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  await transporter.sendMail({
    from: `"Aluminous Website" <${smtpUser}>`,
    to: RECIPIENT_EMAIL,
    subject: `New enquiry from ${payload.name}`,
    html: buildLeadHtml(payload),
  });
}

function validateLeadPayload(payload) {
  if (!payload?.name || !payload?.contactNumber) {
    throw createError('Name and contact number are required.', 400);
  }
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

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
