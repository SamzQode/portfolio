/**
 * ═══════════════════════════════════════════════════════════════
 *  PORTFOLIO CONFIG — Edit this file to update your site content
 * ═══════════════════════════════════════════════════════════════
 *
 *  After saving, refresh the browser. No build step required.
 *  Upload this file to Hostinger along with the rest of the site.
 */

const PORTFOLIO = {

  /* ── Profile ─────────────────────────────────────────────── */
  profile: {
    name: "Samz Qode",
    email: "omer.samih@gmail.com",
    title: "Software Engineer · Product Developer",
    role: "iOS · Web · Healthcare Tech",
    tagline: [
      "Building digital",
      "products with",
      "intent."
    ],
    bio: "I design and ship thoughtful software — from SwiftUI mobile apps and watchOS companions to full-stack web platforms and enterprise documentation systems.",
    tags: ["SwiftUI", "Next.js", "PMP", "Business Analysis", "Healthcare Tech"],
    copyright: "© 2026 Samz Qode. All rights reserved."
  },

  /* ── Social links ────────────────────────────────────────── */
  social: {
    linkedin: "https://www.linkedin.com/in/samih-el-khider-a636aab1/",
    github:   "https://github.com/Samzqode",
    x:        "https://x.com/Samih_Omer"
  },

  /* ── About stats (home page) ─────────────────────────────── */
  stats: [
    { num: "6+",  label: "Projects shipped across mobile & web" },
    { num: "8+",  label: "Professional certifications earned" },
    { num: "Full", label: "Stack from design to deployment" }
  ],

  /* ── Education ───────────────────────────────────────────── */
  education: [
    {
      year: "UiTM",
      degree: "Master of Science",
      org: "Universiti Teknologi MARA (UiTM)",
      desc: "Graduated with First Class Honours."
    },
    {
      year: "MMU",
      degree: "Bachelor of Information Technology",
      org: "Multimedia University (MMU)",
      desc: "Graduated with Honours."
    }
  ],

  /* ── Courses & certifications ────────────────────────────── */
  courses: [
    { provider: "PMI",  name: "PMP",                          meta: "Project Management Professional" },
    { provider: "PMI",  name: "PBA",                          meta: "Professional in Business Analysis" },
    { provider: "CPM",  name: "Certified Project Manager",    meta: "Project management certification" },
    { provider: "INFORMS", name: "CAP",                       meta: "Certified Analytics Professional" },
    { provider: "AXELOS",  name: "PRINCE2",                   meta: "Projects in Controlled Environments" },
    { provider: "Apple",   name: "Certified Mac OS X",        meta: "Apple platform administration" },
    { provider: "Cisco",   name: "CCNA",                      meta: "Cisco Certified Network Associate" },
    { provider: "Biometrics", name: "Biometrics Essential",   meta: "Certified biometrics fundamentals" }
  ],

  /* ── Projects ────────────────────────────────────────────── */
  // featured: true  → shown on home page (max 4 recommended)
  // url: external link, or leave "" for no link
  projects: [
    {
      id: "maison-sale",
      initials: "MS",
      thumb: "thumb-maison",
      title: "Maison Sale",
      type: "iOS · SwiftUI · watchOS",
      short: "Luxury resale marketplace with AI visual search, real-time bidding, and a watchOS companion app.",
      full: "A luxury resale marketplace for iOS with a full onboarding flow, AI-powered visual search, real-time bidding, and an embedded watchOS companion app. Built with SwiftUI, featuring Figma-aligned design tokens and persistent navigation.",
      url: "",
      featured: true
    },
    {
      id: "floom",
      initials: "FL",
      thumb: "thumb-floom",
      title: "Floom",
      type: "iOS · SwiftData · Security",
      short: "Personal finance app with budgeting, bill tracking, milestones, and biometric app lock via Keychain.",
      full: "A personal finance app for tracking budgets, bills, and milestones. Features SwiftData persistence, biometric gate via Keychain, secure profile storage, and a clean tab-based navigation with dashboard analytics.",
      url: "",
      featured: true
    },
    {
      id: "sudan-health",
      initials: "SH",
      thumb: "thumb-health",
      title: "Sudan HealthCare Hub",
      type: "Healthcare · Documentation · Jira",
      short: "End-to-end healthcare platform documentation — BRD, BPMN flows, ERD data model, and Jira backlog management.",
      full: "Comprehensive healthcare platform documentation including BRD, BPMN process flows, ERD data model, UAT test cases, Figma wireframe briefs, and a full Jira backlog with automated import scripts for the SHH project.",
      url: "",
      featured: true
    },
    {
      id: "bits3",
      initials: "B3",
      thumb: "thumb-bits3",
      title: "bits3 Corporate Website",
      type: "Next.js 15 · Strapi 5 · CMS",
      short: "Bilingual corporate site with a headless CMS dashboard, dark/light mode, and fully editable content.",
      full: "A bilingual (EN/AR) corporate website with Next.js 15 frontend, Strapi 5 headless CMS, dark/light theming, Docker deployment, and a custom admin dashboard for managing portfolio, blog, team, and services content.",
      url: "",
      featured: true
    },
    {
      id: "maison-watch",
      initials: "MW",
      thumb: "thumb-watch",
      title: "Maison Watch",
      type: "watchOS · SwiftUI · Companion",
      short: "watchOS companion for Maison Sale with bidding, payments, and inbox messaging.",
      full: "watchOS companion for Maison Sale featuring product browsing, bidding confirmation modals, payment flow, order confirmation, and inbox messaging — all designed for the Apple Watch form factor.",
      url: "",
      featured: false
    },
    {
      id: "avenues",
      initials: "AV",
      thumb: "thumb-avenues",
      title: "Online Avenues",
      type: "Wireframes · Product Design",
      short: "Product wireframes and UX flows for an online education platform.",
      full: "Product wireframes and UX flows for an online education platform, covering user journeys, screen layouts, and interaction patterns for web and mobile experiences.",
      url: "",
      featured: false
    }
  ]

};
