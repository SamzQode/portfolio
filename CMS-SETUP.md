# Decap CMS Setup Guide

Your portfolio has a visual editor at **`/admin`** — no code editing required.

## Option 1 — Edit locally (easiest, works now)

Use this on your Mac before uploading to Hostinger.

### 1. Install dependencies

```bash
cd /Users/samz/portfolio
npm install
```

### 2. Start CMS + preview

```bash
npm run dev
```

This runs:
- **Preview site** → http://localhost:8080
- **CMS backend** → port 8081 (automatic)

### 3. Open the editor

Go to **http://localhost:8080/admin**

- Click **Site Content** in the left sidebar
- Edit profile, projects, education, courses, social links
- Upload project images via the **Thumbnail image** field
- Click **Publish** to save changes to `content/portfolio.json`

### 4. Publish to the web

After saving in the CMS:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Then re-upload changed files to Hostinger (or set up Git deploy).

---

## Option 2 — Edit live on your domain (Hostinger)

For `yoursite.com/admin` to work on Hostinger, you need a **GitHub OAuth proxy** (one-time setup).

### Step 1 — Create a GitHub OAuth App

1. Go to [GitHub → Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. **New OAuth App**
3. Fill in:
   - **Application name:** Portfolio CMS
   - **Homepage URL:** `https://yourdomain.com`
   - **Authorization callback URL:** `https://YOUR-OAUTH-APP.onrender.com/callback`
4. Save **Client ID** and generate a **Client Secret**

### Step 2 — Deploy the OAuth proxy (free on Render)

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your `SamzQode/portfolio` repo
3. Settings:
   - **Root directory:** `oauth`
   - **Build command:** (leave empty)
   - **Start command:** `node server.js`
4. Environment variables:
   - `GITHUB_CLIENT_ID` = from Step 1
   - `GITHUB_CLIENT_SECRET` = from Step 1
   - `OAUTH_REDIRECT_URI` = `https://YOUR-APP.onrender.com/callback`
5. Deploy and copy your Render URL (e.g. `https://portfolio-oauth.onrender.com`)

### Step 3 — Enable GitHub backend in CMS

Edit `admin/config.yml`:

1. **Comment out** `local_backend: true`
2. **Uncomment** the `backend:` section
3. Set `base_url` and `auth_endpoint` to your Render URL:

```yaml
backend:
  name: github
  repo: SamzQode/portfolio
  branch: main
  base_url: https://portfolio-oauth.onrender.com
  auth_endpoint: auth
```

4. Commit and push, then upload to Hostinger

### Step 4 — Use live CMS

Open **https://yourdomain.com/admin** → Login with GitHub → Edit → Publish

Changes are committed directly to your GitHub repo. Pull or re-upload to Hostinger to update the live site.

---

## What you can edit in the CMS

| Section | Includes |
|---------|----------|
| Profile | Name, email, bio, tagline, skill tags |
| Social Links | LinkedIn, GitHub, X |
| About Stats | Home page numbers |
| Education | Degrees and institutions |
| Courses | Certifications |
| Projects | Titles, descriptions, images, featured toggle |

## Image uploads

- Images save to `images/uploads/`
- In the CMS, use the **Thumbnail image** field on any project
- If no image is set, the colored gradient + initials fallback is used

## Manual editing (alternative)

You can still edit `content/portfolio.json` directly in any text editor if you prefer.
