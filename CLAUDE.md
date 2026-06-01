# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static marketing site for Dev Dudes (Elliott & Austin), a freelance web development duo. No build step, no framework — just `index.html`, two PNG assets, and a Supabase contact form.

## Deploying changes

Push to `main` on GitHub and Vercel auto-deploys within ~30 seconds:

```
git add <files>
git commit -m "message"
git push
```

Live URL: **https://dev-dudes.vercel.app**
GitHub: **https://github.com/Emsloan/dev-dudes**

## Architecture

Everything lives in `index.html` — styles, markup, and JS are all inline (intentional; no build tooling). There are no external JS dependencies except:
- Google Fonts (Newsreader serif + Hanken Grotesk sans) via `<link>`
- Supabase JS SDK v2 via CDN (`@supabase/supabase-js`)

`Elliott.png` and `Austin.png` are illustrated founder portraits with transparent backgrounds, referenced directly from `index.html`.

## Design tokens

All colors, fonts, and shadows are CSS custom properties defined in `:root`:

| Variable | Value | Usage |
|---|---|---|
| `--grape` | `#7a55c4` | Primary purple — buttons, accents, highlights |
| `--grape-deep` | `#5d3ea6` | Hover states, darker purple |
| `--grape-wash` | `#ebe3f8` | Light purple tint, eyebrow badges |
| `--cream` | `#f5efe3` | Page background |
| `--ink` | `#221f1a` | Primary text, dark sections |
| `--serif` | Newsreader | Headlines, prices, wordmark |
| `--sans` | Hanken Grotesk | Body, nav, labels |

## Supabase contact form

The quote form at `#contact` submits to Supabase table `quote_requests` (columns: `id`, `created_at`, `name`, `email`, `need`, `message`).

Credentials are hardcoded in `index.html` near the bottom of the `<script>` block:
- `SUPABASE_URL` → `https://opbrhucpfsxxqhtmlrak.supabase.co`
- `SUPABASE_ANON` → the `sb_publishable_*` key (safe to expose; RLS restricts to insert-only)

The table has RLS enabled with a single policy allowing anonymous inserts. View submissions at **supabase.com → Table Editor → quote_requests**.

## Page sections (in order)

`#top` → sticky nav → `.hero` (headline + founder cards) → `.pitch` (Squarespace pricing callout) → `#services` (3 service cards with pricing) → `#contact` (copy + quote form) → footer
