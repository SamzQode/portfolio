/**
 * GitHub OAuth proxy for Decap CMS on static hosting (Hostinger).
 * Deploy this to Render, Railway, or Vercel — see CMS-SETUP.md
 *
 * Required env vars:
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *
 * Optional:
 *   OAUTH_REDIRECT_URI — only needed off Render; on Render we use RENDER_EXTERNAL_URL
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const PORT = process.env.PORT || 3000;

function getRedirectUri(req) {
  if (process.env.RENDER_EXTERNAL_URL) {
    return `${process.env.RENDER_EXTERNAL_URL.replace(/\/$/, '')}/callback`;
  }
  const host = (req?.headers['x-forwarded-host'] || req?.headers.host || '')
    .split(',')[0]
    .trim();
  if (host && !host.includes('localhost')) {
    return `https://${host}/callback`;
  }
  return process.env.OAUTH_REDIRECT_URI || '';
}

function configStatus(req) {
  const redirectUri = getRedirectUri(req);
  const issues = [];
  if (!CLIENT_ID) issues.push('GITHUB_CLIENT_ID is missing');
  else if (CLIENT_ID.length < 10) {
    issues.push('GITHUB_CLIENT_ID looks too short — recopy from GitHub OAuth App settings');
  }
  if (!CLIENT_SECRET) issues.push('GITHUB_CLIENT_SECRET is missing');
  if (!redirectUri) issues.push('Could not determine callback URL');
  else if (!redirectUri.endsWith('/callback')) {
    issues.push('Callback URL must end with /callback');
  }
  return {
    ok: issues.length === 0,
    issues,
    clientIdPrefix: CLIENT_ID ? `${CLIENT_ID.slice(0, 4)}…` : null,
    redirectUri: redirectUri || null,
  };
}

function send(res, status, body, contentType = 'text/html') {
  res.writeHead(status, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
  res.end(body);
}

function fetchToken(code, redirectUri) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
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
  const redirectUri = getRedirectUri(req);
  const config = configStatus(req);

  if (url.pathname === '/health') {
    const body = config.ok
      ? `ok\n${redirectUri}`
      : JSON.stringify({ status: 'misconfigured', ...config }, null, 2);
    return send(res, config.ok ? 200 : 503, body, config.ok ? 'text/plain' : 'application/json');
  }

  if (url.pathname === '/auth') {
    if (!config.ok) {
      return send(res, 503, JSON.stringify(config, null, 2), 'application/json');
    }
    const target = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
    res.writeHead(302, { Location: target });
    return res.end();
  }

  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    if (!code) return send(res, 400, 'Missing code');

    try {
      const token = await fetchToken(code, redirectUri);
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
  const config = configStatus();
  console.log(`OAuth proxy listening on port ${PORT}`);
  console.log(`Callback URL: ${getRedirectUri()}`);
  if (!config.ok) {
    console.warn('OAuth config issues:', config.issues.join('; '));
  }
});
