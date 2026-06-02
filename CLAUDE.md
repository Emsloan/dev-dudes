# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Who we are

**Dev Dudes** — two-person freelance web dev studio. Elliott and Austin.

**Elliott** (the one you're talking to) — level 2 software engineer at General Dynamics Mission Systems, DevOps/embedded background (C++, Python). AI lead at GDMS; works agentic — he designs, tests, and validates output, he does not write code directly. Amateur illustrator. Strong problem-solver, organizer, flexible thinker. Not a natural salesperson but apparently well-suited for it.

**Austin** — the original business. Gets clients through his personal manager (Austin has a parallel creative career: VA, acting, music, modeling). Luxury sales background: Neiman Marcus, Suit Supply, high-end watches, jewelry, GoDaddy sales and tech support. Tastemaker. Creative director instincts — knows what's hot, what's marketable, and can pull a client's vision out of them even when they can't articulate it. People person. Has been doing Squarespace sites, GoDaddy domain/DNS setup for clients long before Elliott joined.

**Why this exists:** Elliott saw that in a post-Claude Code world, real hand-coded custom sites are cheap and fast to build — while Squarespace/Shopify still charge clients monthly forever. He joined Austin's existing business to raise the technical ceiling: real custom sites, Stripe integrations, migrations off subscription platforms. The pitch to clients is "pay once, own it outright."

## What's built

A single-page static marketing site. **Fully live.** Everything is working.

- **Live URL:** https://dev-dudes.vercel.app
- **GitHub:** https://github.com/Emsloan/dev-dudes (authenticated as `Emsloan`)
- **Deploy workflow:** `git push` to `main` → Vercel auto-deploys in ~30 seconds. No build step.

### What's complete and working
- Full page design: nav, hero + founder cards, pitch bar, services (3 tiers), contact form, footer
- Supabase contact form — wired, table created, RLS configured, live
- Founder portraits — `Elliott.png` and `Austin.png`, AI-generated (Nano Banana img2img), backgrounds removed with `rembg` (u2net model)
- Mobile responsive — hamburger nav ≤880px, single-column layout, tightened padding ≤520px

## Copy and tone rules — important

- **Do not say "AI-powered"** — creative clients (musicians, makers, small businesses) skew anti-AI. Describe Elliott's work as engineering, problem-solving, validating.
- **Do not say Elliott "writes code"** — he validates and ships via agentic dev. Use "solves it, validates it, ships it" framing.
- **No closing/sales language** on client-facing copy ("closes deals" etc.) — reads predatory. Austin's sales background is framed as a client benefit.
- **The founder portraits were not drawn by Elliott** — they are AI-generated illustrations.
- **Brand voice:** informal, direct, a bit cheeky. Short punchy labels over full bios. Sounds like two humans, not an agency.

### Current founder card copy (do not change without discussion)
- **Elliott:** "The engineer — solves it, validates it, ships it. The reason we can do things Squarespace never will."
- **Austin:** "The creative director — knows what looks good, what's marketable, and has a way of getting the vision out of you even when you can't find the words."

## Architecture

Everything lives in `index.html` — styles, markup, and JS are all inline. No build tooling, no framework, intentional. External dependencies only:
- Google Fonts: Newsreader (serif) + Hanken Grotesk (sans) via `<link>`
- Supabase JS SDK v2 via CDN (`@supabase/supabase-js`)

`Elliott.png` and `Austin.png` are PNG portraits with transparent backgrounds, referenced directly from `index.html`.

## Design tokens

All in `:root` at the top of `index.html`:

| Variable | Value | Usage |
|---|---|---|
| `--grape` | `#7a55c4` | Primary purple — buttons, accents, highlights |
| `--grape-deep` | `#5d3ea6` | Hover states |
| `--grape-wash` | `#ebe3f8` | Light purple tint, eyebrow badges |
| `--cream` | `#f5efe3` | Page background |
| `--ink` | `#221f1a` | Primary text, dark sections |
| `--serif` | Newsreader | Headlines, prices, wordmark |
| `--sans` | Hanken Grotesk | Body, nav, labels |

## Supabase contact form

Form at `#contact` inserts into table `quote_requests`. Credentials are hardcoded in `index.html` in the `<script>` block at the bottom:
- `SUPABASE_URL` → `https://opbrhucpfsxxqhtmlrak.supabase.co`
- `SUPABASE_ANON` → `sb_publishable_NBVxhhmvIXoA7Fx4lVsKHg_sG_uHAhJ` (safe to expose — publishable key, RLS insert-only)

Table schema: `id`, `created_at`, `name`, `email`, `need`, `message`. RLS enabled with a single insert-for-all policy. View submissions at supabase.com → Table Editor → quote_requests.

## Page sections (in order)

`#top` → sticky nav → `.hero` (headline + founder cards) → `.pitch` (Squarespace pricing callout) → `#services` (3 service cards: Custom Site $900, With a Shop $1500, The Great Escape $400) → `#contact` (copy + quote form) → footer

## Environment notes

- **Python 3.11.9** is available on Elliott's machine. `rembg[cpu]` is installed — use `python -c "from rembg import remove; ..."` for background removal (the CLI entrypoint doesn't work, use the Python API directly).
- **GitHub CLI** is authenticated as `Emsloan`.
- If image background removal is needed again: `python -c "from rembg import remove; from PIL import Image; img = Image.open('file.png'); remove(img).save('file.png')"`
