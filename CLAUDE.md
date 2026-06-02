# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What we're building

Dev Dudes is a two-person freelance web development studio. The repo is their marketing site — a single-page static HTML site, live at **https://dev-dudes.vercel.app**.

**Elliott** (the one you're talking to) — level 2 software engineer at General Dynamics Mission Systems, DevOps/embedded background. AI lead; works agentic — he designs, tests, and validates, not writes code directly. Also an amateur illustrator.

**Austin** — the original business. Gets clients through his personal network/manager. Luxury sales background (Neiman Marcus, Suit Supply, high-end watches, GoDaddy sales). Tastemaker, people person, creative director instincts. Has been doing Squarespace/GoDaddy sites for clients before Elliott joined.

**The pitch:** clients overpay Squarespace/Shopify forever. Dev Dudes builds it once, hand-coded, client owns it outright. Elliott's technical ceiling raises what's possible far beyond what Austin could offer alone.

## Copy and tone rules

- **Don't use "AI-powered"** — creative clients (musicians, makers, small businesses) tend to be anti-AI. Describe Elliott's work as engineering, problem-solving, validating.
- **No closing/sales language** on client-facing copy — reads as predatory. Austin's sales background is framed as a client benefit (makes you feel taken care of, gets the vision out of you).
- **Elliott does not "write code"** — he validates and ships. Use that framing.
- **The founder portraits** (`Elliott.png`, `Austin.png`) are AI-generated illustrations (Nano Banana img2img), not drawn by Elliott.
- Brand voice: informal, direct, a bit cheeky. Short punchy labels over full bios.

## Deploying changes

Push to `main` — Vercel auto-deploys in ~30 seconds:

```
git add <files>
git commit -m "message"
git push
```

Live URL: **https://dev-dudes.vercel.app**
GitHub: **https://github.com/Emsloan/dev-dudes**

## Architecture

Everything lives in `index.html` — styles, markup, and JS are all inline (intentional; no build tooling). External dependencies only:
- Google Fonts (Newsreader serif + Hanken Grotesk sans) via `<link>`
- Supabase JS SDK v2 via CDN (`@supabase/supabase-js`)

`Elliott.png` and `Austin.png` are founder portraits with transparent backgrounds, referenced directly from `index.html`.

## Design tokens

All colors, fonts, and shadows are CSS custom properties in `:root`:

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

Quote form at `#contact` inserts into Supabase table `quote_requests` (columns: `id`, `created_at`, `name`, `email`, `need`, `message`). Credentials hardcoded in `index.html` at the bottom of the `<script>` block:
- `SUPABASE_URL` → `https://opbrhucpfsxxqhtmlrak.supabase.co`
- `SUPABASE_ANON` → `sb_publishable_*` key (safe to expose; RLS restricts to insert-only)

View submissions: **supabase.com → Table Editor → quote_requests**

## Page sections (in order)

`#top` → sticky nav → `.hero` (headline + founder cards) → `.pitch` (Squarespace pricing callout) → `#services` (3 service cards with pricing) → `#contact` (copy + quote form) → footer
