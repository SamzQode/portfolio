/**
 * GitHub OAuth proxy for Decap CMS on static hosting (Hostinger).
 * Deploy this to Render, Railway, or Vercel — see CMS-SETUP.md
 *
 * Required env vars:
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *   OAUTH_REDIRECT_URI  (e.g. https://your-app.onrender.com/callback)
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;
const PORT = process.env.PORT || 3000;

function send(res, status, body, contentType = 'text/html') {
  res.writeHead(status, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
  res.end(body);
}

function fetchToken(code) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    });
    const req = https.request(
      {
        hostname: 'github.com',
        path: '/login/oauth/access_token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve(JSON.parse(data)));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/health') {
    return send(res, 200, 'ok', 'text/plain');
  }

  if (url.pathname === '/auth') {
    const target = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo,user`;
    res.writeHead(302, { Location: target });
    return res.end();
  }

  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    if (!code) return send(res, 400, 'Missing code');

    try {
      const token = await fetchToken(code);
      if (token.error) return send(res, 400, JSON.stringify(token), 'application/json');

      const script = `
        <script>
          (function() {
            function receiveMessage(e) {
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({ token: token.access_token, provider: 'github' })}',
                e.origin
              );
              window.removeEventListener('message', receiveMessage);
            }
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          })();
        </script>
      `;
      return send(res, 200, script);
    } catch (err) {
      return send(res, 500, err.message);
    }
  }

  send(res, 404, 'Not found');
});

server.listen(PORT, () => {
  console.log(`OAuth proxy listening on port ${PORT}`);
});
