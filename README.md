# NYClaw.io - AI Solution Builder

The website for NYClaw.io, showcasing two core services:

1. **AI Setup Agency** - We set up and manage OpenClaw AI systems for your business
2. **AI Marketing Agency** - We build and manage AI-powered marketing systems that generate revenue

## Built With

- Next.js 15+
- React 19+
- Tailwind CSS
- TypeScript

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx         # Root layout
├── page.tsx           # Home page (all sections)
├── blog/
│   └── page.tsx       # Blog/resources page
└── globals.css        # Global styles & animations
```

## Design System

**Colors:**
- Navy: #003366
- Sky Blue: #0066cc
- Dark Red: #c41e3a
- Charcoal: #2c2c2c
- White: #ffffff
- Light Gray: #e8e8e8

**Aesthetic:** Neon + Industrial with slow pulsing animations (2.5s)

## Content Placeholders

- `[STORY]` - Giani's origin/background story (to be added)
- `[CASE_STUDY_1]` - Rumble Simulator details (to be added)
- `[CASE_STUDY_2]` - Sarah Influencer details (to be added)
- `[PRICING_4]` - AI Marketing Agency pricing (to be added)

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or push to GitHub and connect to Vercel for auto-deployment.

## Domain Configuration

Update domain to `nyclaw.io` in Vercel project settings.
