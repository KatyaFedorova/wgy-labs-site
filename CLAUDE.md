# WGY Labs website: handoff brief

This repo holds the marketing site for **WGY Labs** (short for "We Got You"), Kat's AI ops automation company. The site is already built: `index.html` is a single self-contained page (HTML + CSS + a little JS, Google Fonts only). Don't redesign it; the design is approved.

## Hosting and email (live since 2026-11-18)
- Live site: https://wgylabs.com (and www), served by **Cloudflare Pages** project `wgy-labs-site` in Kat's own Cloudflare account (`6cb7c2713b5f88e2e1fa9cef0ea37d23`). Never use Ash's account.
- Deploy: `CLOUDFLARE_ACCOUNT_ID=6cb7c2713b5f88e2e1fa9cef0ea37d23 npx wrangler pages deploy <dir with index.html> --project-name wgy-labs-site --branch main`. Pushing to GitHub does NOT deploy.
- Domain: wgylabs.com registered at Cloudflare Registrar, $11.17/yr, auto-renews 2027-11-18. DNS is Cloudflare.
- Email: incoming mail to hello@wgylabs.com is forwarded to Kat's Gmail by Cloudflare Email Routing (MX = Cloudflare). Sending is from Zoho Mail Forever Free (mail.zoho.com, display name "Kat at WGY Labs"). SPF includes zohomail.com and _spf.mx.cloudflare.net; DKIM for Zoho (`zmail._domainkey`) and Cloudflare (`cf2024-1._domainkey`); DMARC p=none.
- GitHub Pages is switched off for this repo. Do NOT touch `KatyaFedorova/KatyaFedorova.github.io` (Kat's personal site, katfedorova.com).

## Approved decisions (keep these)
- **Name:** WGY Labs. Tagline: "We've got your back." Company voice ("we"), founder = Kat. Don't show her surname on the site.
- **Positioning:** reliability-first AI ops automation for Shopify brands (~$1–20M GMV). Build, Test, Monitor. Main buyer pain: automations that "fail quietly". Future scope: AI agent security and governance.
- **Look:** green palette (forest #0D3B2B, green #16A05D, mint backgrounds, yellow accent #F2C14E), Newsreader serif headlines + Manrope body. Detailed and serious, not template-like.
- **Logo:** lowercase "wgy labs" wordmark with a green curve underneath ("held up"). Currently built in HTML/CSS; favicon is a "w" on dark green.
- **Header:** Services (dropdown: Build, Test, Monitor, AI agent health check) · Case studies · Pricing · About · Book a call.
- **Pricing (USD):** Audit $750 (credited to a build) · Build from $2,500 per workflow package · Monitor $750/mo (core product, "chosen by most clients") · Monitor and grow $2,000/mo · AI agent health check from $1,000.
- **Founding client offer:** first 5 brands get 30% off their first build in exchange for a testimonial + case study rights. No more free projects.
- **Free 20-min intro call:** it's a fit/sales call, not free consulting. Deep analysis = the paid audit. A qualifying form sits in front of it.
- **Case studies:** currently 3 "Example project" cards, clearly labeled illustrative. Never present them as real client results. Replace with real ones as they come.
- **Honesty rules:** no fake testimonials, logos, client names or results. The hero dashboard and monthly figures are labeled as sample data; keep those labels.

## Open to-dos (in priority order)
1. ~~Publish~~ done (see Hosting).
2. ~~Mobile menu~~ done.
3. ~~Booking form~~ done: posts to the `worker/` Worker (`wgy-booking`, route wgylabs.com/api/book), which validates and emails Kat via Cloudflare Email Routing `send_email` (from bookings@wgylabs.com; recipient is the `TO` Worker secret, never commit it). Deploy with `cd worker && npx wrangler deploy`. All fields required; validation rules live in both `index.html` and `worker/src/validate.js`, keep them in sync.
4. ~~Domain + email~~ done.
5. **Real case study:** Kat did one free project; add it once she gives details + client permission.
6. **Confirm placeholders with Kat:** 30-day cancellation (FAQ), "reply within one business day", 30% / 5 founding clients, all prices, $150 refund limit in the sample dashboard.
7. **SEO:** title/meta are set; still to do: keyword research, per-service pages, Open Graph image, sitemap, partner directory listings (Zapier Solution Partner, n8n Expert Partner, Make, Shopify Partner).
8. **Logo files:** export the wordmark as SVG/PNG; check "WGY" trademark (USPTO/EUIPO) and run the logo through an image search before registering the company.

## Research summary (for copy and pricing)
- Generic n8n/Make/Zapier builds are commoditized (Fiverr from $5, Upwork n8n median ~$23/hr). Shopify Flow/Sidekick and helpdesk AI agents (Gorgias ~$0.90–1.00 per resolution) cover simple automation.
- Gap: testing, monitoring and maintenance of AI agents/automations; few competitors productize it. Benchmarks: productized retainers ~$1,500–2,500/mo, US agencies $5k–24k per build.
- Gartner (June 2025): 40%+ of agentic AI projects expected to be cancelled by end of 2027 (cited on the site).
