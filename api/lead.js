import { sendLeadEmail } from '../server/lead-mail.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const payload =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

    await sendLeadEmail(payload, process.env);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Failed to process enquiry.' });
  }
}
