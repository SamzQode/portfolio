# Samih Elkhider — Personal Portfolio

Static portfolio with **Decap CMS** visual editor. Inspired by [MO—ARTS](https://mo-arts.framer.ai/).

**Live repo:** https://github.com/SamzQode/portfolio

## Edit with CMS (recommended)

```bash
cd /Users/samz/portfolio
npm install
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:8080 | Preview site |
| http://localhost:8080/admin | Visual editor |

Edit text, upload project images, and click **Publish**. Then commit and push:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Full setup guide (local + live on Hostinger): **[CMS-SETUP.md](./CMS-SETUP.md)**

## Manual editing

All content lives in **`content/portfolio.json`**. The site loads this file automatically.

## Project structure

```
portfolio/
├── admin/              ← Decap CMS editor (/admin)
│   ├── index.html
│   └── config.yml
├── content/
│   └── portfolio.json  ← ★ Site content (edited via CMS or manually)
├── images/uploads/     ← Uploaded project images
├── oauth/              ← GitHub OAuth proxy (for live CMS on Hostinger)
├── index.html
├── projects.html
├── css/styles.css
└── js/main.js
```

## Upload to Hostinger

1. [hPanel](https://hpanel.hostinger.com) → **File Manager** → `public_html`
2. Upload all files keeping folder structure
3. Visit your domain
4. CMS editor at `yourdomain.com/admin` (requires OAuth setup — see CMS-SETUP.md)

## Preview only

```bash
python3 -m http.server 8080
```

Open http://localhost:8080
