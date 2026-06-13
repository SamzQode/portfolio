/* ── SVG icons ─────────────────────────────────────────────── */
const ICONS = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
};

const CONTENT_URL = 'content/portfolio.json';

/* ── Render helpers ────────────────────────────────────────── */
function padNum(n) {
  return String(n).padStart(2, '0');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderThumb(project) {
  if (project.image) {
    return `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="project-thumb-img" />`;
  }
  return `<div class="project-thumb-inner ${project.thumb}">${escapeHtml(project.initials)}</div>`;
}

function renderProjectCard(project, index, { full = false } = {}) {
  const num = padNum(index + 1);
  const desc = full ? project.full : project.short;
  const href = project.url || (full ? '' : `projects.html#${project.id}`);
  const isLink = Boolean(href);
  const tag = isLink ? 'a' : 'div';
  const extraAttrs = isLink
    ? `href="${escapeHtml(href)}"${project.url ? ' target="_blank" rel="noopener noreferrer"' : ''}`
    : 'style="cursor:default"';

  return `
    <article class="project-card" id="${escapeHtml(project.id)}">
      <${tag} class="project-card-link" ${extraAttrs}>
        <div class="project-thumb">${renderThumb(project)}</div>
        <div class="project-num">${num}</div>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-type">${escapeHtml(project.type)}</p>
        <p class="project-desc">${escapeHtml(desc)}</p>
        ${isLink ? `<div class="project-arrow">${ICONS.arrow}</div>` : ''}
      </${tag}>
    </article>`;
}

function renderEducation(items) {
  return items.map((item) => `
    <div class="timeline-item">
      <div class="timeline-year">${escapeHtml(item.year)}</div>
      <div>
        <h3 class="timeline-title">${escapeHtml(item.degree)}</h3>
        <p class="timeline-org">${escapeHtml(item.org)}</p>
        <p class="timeline-desc">${escapeHtml(item.desc)}</p>
      </div>
    </div>`).join('');
}

function renderCourses(items) {
  return items.map((item) => `
    <div class="course-card">
      <div class="course-provider">${escapeHtml(item.provider)}</div>
      <h3 class="course-name">${escapeHtml(item.name)}</h3>
      <p class="course-meta">${escapeHtml(item.meta)}</p>
    </div>`).join('');
}

function renderSocialLinks(social) {
  const links = [
    { label: 'LinkedIn', url: social.linkedin, icon: ICONS.linkedin },
    { label: 'GitHub', url: social.github, icon: ICONS.github },
    { label: 'X (Twitter)', url: social.x, icon: ICONS.x }
  ];
  return links.map((l) => `
    <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="social-link">
      ${l.label}
      ${l.icon}
    </a>`).join('');
}

function renderStats(stats) {
  return stats.map((s) => `
    <div>
      <div class="stat-num">${escapeHtml(s.num)}</div>
      <div class="stat-label">${escapeHtml(s.label)}</div>
    </div>`).join('');
}

function asStrings(items, key) {
  if (!items?.length) return [];
  return items.map((item) => (typeof item === 'string' ? item : item[key]));
}

function renderBrand(profile) {
  const navLogo = document.getElementById('nav-logo');
  const heroLogo = document.getElementById('hero-logo');
  const heroPhoto = document.getElementById('hero-photo');

  if (navLogo && profile.logo) {
    navLogo.innerHTML = `<img src="${escapeHtml(profile.logo)}" alt="${escapeHtml(profile.name)}" class="nav-logo-img" width="160" height="40" />`;
  } else if (navLogo) {
    navLogo.textContent = profile.name;
  }

  if (heroLogo && profile.logo) {
    heroLogo.src = profile.logo;
    heroLogo.alt = `${profile.name} logo`;
  }

  if (heroPhoto && profile.profilePhoto) {
    heroPhoto.src = profile.profilePhoto;
    heroPhoto.alt = profile.name;
  }
}

function renderHero(profile) {
  const eyebrow = document.getElementById('hero-eyebrow');
  const name = document.getElementById('hero-name');
  const tagline = document.getElementById('hero-tagline');
  const role = document.getElementById('hero-role');
  const desc = document.getElementById('hero-desc');
  const tags = document.getElementById('hero-tags');
  const taglineLines = asStrings(profile.tagline, 'line');
  const skillTags = asStrings(profile.tags, 'tag');

  if (eyebrow) eyebrow.textContent = profile.title;
  if (name) name.textContent = profile.name;
  if (role) role.textContent = profile.role;
  if (desc) desc.textContent = profile.bio;

  if (tagline && taglineLines.length) {
    const last = taglineLines[taglineLines.length - 1];
    const rest = taglineLines.slice(0, -1).join(' ');
    tagline.innerHTML = rest
      ? `${escapeHtml(rest)} <em>${escapeHtml(last)}</em>`
      : `<em>${escapeHtml(last)}</em>`;
  }

  if (tags && skillTags.length) {
    tags.innerHTML = skillTags
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join('');
  }
}

/* ── Populate page from content ────────────────────────────── */
function initPortfolio(data) {
  const { profile, social, stats, education, courses, projects } = data;

  renderBrand(profile);
  renderHero(profile);

  document.querySelectorAll('[data-email]').forEach((el) => {
    el.href = `mailto:${profile.email}`;
    el.textContent = profile.email;
  });

  document.querySelectorAll('[data-copyright]').forEach((el) => {
    el.textContent = profile.copyright;
  });

  const statsEl = document.getElementById('stats-grid');
  if (statsEl) statsEl.innerHTML = renderStats(stats);

  const eduEl = document.getElementById('education-list');
  if (eduEl) eduEl.innerHTML = renderEducation(education);

  const coursesEl = document.getElementById('courses-grid');
  if (coursesEl) coursesEl.innerHTML = renderCourses(courses);

  document.querySelectorAll('[data-social]').forEach((el) => {
    el.innerHTML = renderSocialLinks(social);
  });

  const featuredEl = document.getElementById('featured-projects');
  if (featuredEl) {
    featuredEl.innerHTML = projects
      .filter((p) => p.featured)
      .map((p, i) => renderProjectCard(p, i))
      .join('');
  }

  const allEl = document.getElementById('all-projects');
  if (allEl) {
    allEl.innerHTML = projects
      .map((p, i) => renderProjectCard(p, i, { full: true }))
      .join('');
  }
}

async function loadPortfolio() {
  try {
    const res = await fetch(CONTENT_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to load portfolio content:', err);
    return null;
  }
}

/* ── Nav scroll + mobile menu ──────────────────────────────── */
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
});

toggle?.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links?.classList.toggle('open');
});

links?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    toggle?.classList.remove('open');
    links?.classList.remove('open');
  });
});

/* ── Scroll reveal ─────────────────────────────────────────── */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
}

/* ── Active nav link on scroll ─────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navAnchors.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });
}

/* ── Boot ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadPortfolio();
  if (data) initPortfolio(data);
  initReveal();
});
