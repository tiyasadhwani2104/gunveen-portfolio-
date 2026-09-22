# Gunveen — Service Design Portfolio

A portfolio site for a final-year ISDI Service Design Management (SDM) student, built with
Next.js, Tailwind CSS, Framer Motion, and Lenis (smooth scroll).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Make it yours

Almost everything is driven by one file:

**`src/lib/data.ts`**
- `siteConfig` — your name, tagline, bio, email, location, resume link, social links
- `caseStudies` — the 4 placeholder projects. Replace with your real work (same shape: context,
  challenge, research, process steps, solution, outcome, reflection, metrics)
- `skills` — research / strategy / tools lists shown on the homepage marquee and About page
- `experience` — education + work timeline shown on the About page

**Images**: every project cover and your photo currently render as an animated gradient
placeholder (`PlaceholderMedia` component) labeled with what should go there. Once you have real
images, drop them in `public/images/` and swap `<PlaceholderMedia .../>` for `next/image` in:
- `src/components/ProjectCard.tsx`
- `src/components/CaseStudyView.tsx`
- `src/app/about/page.tsx`

**Resume**: add your PDF as `public/resume.pdf` — the "Resume" links in the nav, footer, and
About page already point to `/resume.pdf`.

**Colors/fonts**: edit the CSS variables at the top of `src/app/globals.css` (`--background`,
`--foreground`, `--accent`) and the font imports in `src/app/layout.tsx`.

## Pages

- `/` — hero, skills marquee, featured work, about teaser, CTA
- `/work` — full case study grid
- `/work/[slug]` — individual case study (context → research → process → solution → outcome)
- `/about` — bio, process philosophy, skills, timeline
- `/contact` — email + social links

## Deploy on Vercel

```bash
npx vercel
```

or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) — no config needed, it's
a standard Next.js app.
