<div align="center">

# 🌌 Dharani Kumar J — 3D Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Spline 3D](https://img.shields.io/badge/Spline-3D-FF59B3?style=for-the-badge&logo=spline&logoColor=white)](https://spline.design/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p align="center">
  A futuristic, interactive 3D developer portfolio showcasing Artificial Intelligence, Machine Learning pipelines, and automation engineering.
</p>

[🌐 Live Demo](https://dharanikumar.vercel.app) • [💼 LinkedIn](https://linkedin.com/in/dharani-kumar-j-25ad036) • [💻 GitHub](https://github.com/dharanikumarj16-code) • [🧩 LeetCode](https://leetcode.com/u/dharanikumarj)

</div>

---

## 🚀 Key Highlights & Features

- **🎮 Interactive 3D Cyber Avatar**: Custom 3D character avatar featuring real-time mouse-tracking perspective tilt, ambient cyber halos, and floating AI status badges across Hero, About, and Contact sections.
- **🎹 Interactive 3D Spline Keyboard**: Custom mechanical keyboard scene where each keycap triggers authentic mechanical switch audio and reveals core engineering skills.
- **🌌 Smooth Cinematic Transitions**: Powered by **GSAP (ScrollTrigger)** and **Framer Motion** for butter-smooth pinned scroll reveals, card stacking, and scene transitions.
- **🛠️ Projects Showcase**: Horizontal pinned scroll carousel showcasing projects like **SmartFarm AI**, **JARVIS Voice Assistant**, and ML prediction systems.
- **⚡ Stacking Experience Timeline**: Layered career and education cards that stack smoothly as you scroll down.
- **📬 Responsive Contact Suite**: Connect form with instant email delivery via **Web3Forms** & direct mailto fallback.
- **📱 100% Responsive Design**: Safe-area compliant, dynamic viewport height (`dvh`) aware, and tested on mobile, tablet, and desktop screens.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| **Frontend Framework** | [Next.js 14](https://nextjs.org/) (App Router), [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Lucide Icons, React Icons |
| **3D & Animation** | [Spline 3D](https://spline.design/), [GSAP](https://greensock.com/gsap/) (ScrollTrigger), [Framer Motion](https://www.framer.com/motion/) |
| **Backend & Services** | Web3Forms API, EmailJS, Node.js |
| **Deployment & DevOps**| [Vercel](https://vercel.com/), [Docker](https://www.docker.com/), GitHub Actions CI/CD |

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or higher recommended)
- [pnpm](https://pnpm.io/) (or `npm` / `yarn`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dharanikumarj16-code/my-3d-portfolio-2026.git
   cd my-3d-portfolio-2026
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   Configure your keys in `.env.local`:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key_here
   ```

4. **Run the local development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Architecture

```
my-3d-portfolio-2026/
├── public/
│   ├── assets/
│   │   ├── dharani-about-avatar.jpg   # 3D Avatar (balcony pose)
│   │   ├── dharani-3d-portrait.jpg    # 3D Avatar (front portrait)
│   │   ├── dharani-3d-avatar.png      # 3D Avatar (transparent)
│   │   ├── skills-keyboard.spline     # Spline 3D scene file
│   │   └── tech/                      # Technology logos
├── src/
│   ├── app/
│   │   ├── about/page.tsx             # About Me page
│   │   ├── page.tsx                   # Main Landing page
│   │   └── layout.tsx                 # Root layout & providers
│   ├── components/
│   │   ├── hero-3d-profile.tsx        # 3D interactive tilt avatar
│   │   ├── ContactForm.tsx            # Contact form component
│   │   └── sections/                  # Hero, Skills, Experience, Projects, Contact
│   └── data/
│       ├── config.ts                  # Author metadata & social profiles
│       ├── constants.ts               # Skills, experience, & navigation data
│       └── projects.tsx               # Projects portfolio data
├── Dockerfile                         # Multi-stage production container
└── docker-compose.yml                 # Local Docker orchestration
```

---

## 🌐 Deployment to Vercel

This portfolio is optimized for one-click zero-config deployment on **[Vercel](https://vercel.com)**:

1. Push your repository to your GitHub account (`dharanikumarj16-code/my-3d-portfolio-2026`).
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **Import**.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = *your Web3Forms access key*
4. Click **Deploy**. Your site will be live with free SSL in ~60 seconds!

---

## 🐳 Docker Deployment

Run the portfolio in an isolated container environment:

```bash
# Build and run with Docker Compose
docker compose up --build -d

# View running container at http://localhost:3000
# Stop the container
docker compose down
```

---

## 📬 Contact & Connect

- **Author**: Dharani Kumar J
- **Role**: Artificial Intelligence & Data Science Student | AI Engineer
- **Email**: [dharanikumarj16@gmail.com](mailto:dharanikumarj16@gmail.com)
- **LinkedIn**: [linkedin.com/in/dharani-kumar-j-25ad036](https://linkedin.com/in/dharani-kumar-j-25ad036)
- **GitHub**: [github.com/dharanikumarj16-code](https://github.com/dharanikumarj16-code)

---

<div align="center">
  <sub>Designed &amp; Built with ❤️ by Dharani Kumar J</sub>
</div>
