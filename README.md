# Samz Qode — Personal Portfolio

Static portfolio site inspired by [MO—ARTS](https://mo-arts.framer.ai/). Ready to upload to Hostinger.

## Quick edit guide

**Most content lives in one file:** `js/config.js`

Open it in any text editor, change what you need, save, and refresh the browser.

| Section | Edit in `config.js` |
|---------|---------------------|
| Name, email, bio, tags | `profile` |
| LinkedIn, GitHub, X links | `social` |
| Education | `education` array |
| Certifications & courses | `courses` array |
| Projects (titles, descriptions, links) | `projects` array |
| About stats | `stats` array |

### Adding a new project

Add an entry to the `projects` array in `config.js`:

```js
{
  id: "my-project",        // used for anchor links
  initials: "MP",          // thumbnail letters
  thumb: "thumb-maison",   // color style (see css/styles.css)
  title: "My Project",
  type: "iOS · SwiftUI",
  short: "One-line summary for home page.",
  full: "Longer description for projects page.",
  url: "https://github.com/Samzqode/my-repo",  // or "" for no link
  featured: true           // true = shown on home page
}
```

### Changing social links

```js
social: {
  linkedin: "https://www.linkedin.com/in/samih-el-khider-a636aab1/",
  github:   "https://github.com/Samzqode",
  x:        "https://x.com/Samih_Omer"
}
```

## Files

```
portfolio/
├── index.html       ← Main page
├── projects.html    ← Full project showcase
├── js/
│   ├── config.js    ← ★ EDIT THIS FILE for content updates
│   └── main.js      ← Renders config into the pages
├── css/styles.css
└── images/          ← Optional project screenshots
```

## Upload to Hostinger

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Websites → Manage → File Manager**
3. Open `public_html`
4. Upload all files keeping the folder structure
5. Visit your domain

## Local preview

```bash
cd /Users/samz/portfolio
python3 -m http.server 8080
```

Open http://localhost:8080
