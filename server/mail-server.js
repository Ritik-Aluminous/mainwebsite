import http from 'node:http';
import { sendLeadEmail } from './lead-mail.js';

const PORT = Number(process.env.MAIL_SERVER_PORT || 3001);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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

  try {
    const body = await readJsonBody(req);
    await sendLeadEmail(body, process.env);
    sendJson(res, 200, { success: true });
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    sendJson(res, error.statusCode || 500, {
      error: error.message || 'Failed to process enquiry.',
    });
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
