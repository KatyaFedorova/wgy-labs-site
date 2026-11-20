# WGY Labs website: handoff brief

This repo holds the marketing site for **WGY Labs** (short for "We Got You"), Kat's AI ops automation company. The site is already built: `index.html` is a single self-contained page (HTML + CSS + a little JS, Google Fonts only). Don't redesign it; the design ("Style D", approved 2026-11-19) is approved.

**Pages (2026-11-20):** `index.html` (home), `services.html` (/services: Build/Test/Monitor, health check, how we build each flow, after launch, monitoring table) and `case-studies.html` (/case-studies: full Easi Breezi story + example projects). Each page carries its own copy of the CSS and header/footer; when you change shared styles or the menu, update all three. Deploy all three files together.

## Hosting and email (live since 2026-11-18)
- Live site: https://wgylabs.com (and www), served by **Cloudflare Pages** project `wgy-labs-site` in Kat's own Cloudflare account (`6cb7c2713b5f88e2e1fa9cef0ea37d23`). Never use Ash's account.
- Deploy: `CLOUDFLARE_ACCOUNT_ID=6cb7c2713b5f88e2e1fa9cef0ea37d23 npx wrangler pages deploy <dir with index.html> --project-name wgy-labs-site --branch main`. Pushing to GitHub does NOT deploy.
- Domain: wgylabs.com registered at Cloudflare Registrar, $11.17/yr, auto-renews 2027-11-18. DNS is Cloudflare.
- Email: incoming mail to hello@wgylabs.com is forwarded to Kat's Gmail by Cloudflare Email Routing (MX = Cloudflare). Sending is from Zoho Mail Forever Free (mail.zoho.com, display name "Kat at WGY Labs"). SPF includes zohomail.com and _spf.mx.cloudflare.net; DKIM for Zoho (`zmail._domainkey`) and Cloudflare (`cf2024-1._domainkey`); DMARC p=none.
- GitHub Pages is switched off for this repo. Do NOT touch `KatyaFedorova/KatyaFedorova.github.io` (Kat's personal site, katfedorova.com).

## Approved decisions (keep these)
- **Name:** WGY Labs. Tagline: "We've got your back." Company voice ("we"), founder = Kat. Don't show her surname on the site.
- **Positioning:** reliability-first AI ops automation for Shopify brands (~$1–20M GMV). Build, Test, Monitor. Main buyer pain: automations that "fail quietly". Future scope: AI agent security and governance.
- **Look ("Style D", quiet premium, replaced the green design on 2026-11-19):** black #0A0A0B hero/contact/footer, pure white sections, no colour accent. Geist Light headlines with a grey second half, Geist Mono small caps for labels. Editorial layout: hairline rules and columns, no cards, no glows, no green. Hero = full-height black with a "particle core": a canvas sphere of ~2,000 points that breathes, turns and is scanned by light (Kat picked it from 5 options on 2026-11-19); a smaller one sits in the contact section. Buttons are rectangular (2px radius) with mono caps and a thin arrow. "AI at work" touches (added 2026-11-19): a typed "AI agent at work · <task>" line with a blinking cursor in the hero (Kat prefers this typing version over a streaming/shimmer one), and the sample order timeline plays step by step (Running → Done). All light sections are pure white #FFFFFF, separated by hairlines; all greys are neutral. Kat dislikes both warm/beige (reads yellow) and grey section backgrounds. Kat rejected the orb with orbits ("solar system", not current tech). Kat rejected: dark green, pure black-to-grey gradients, sharp 0-radius minimalism, curvy serif, pill buttons, "techy" glow/grain details.
- **Logo:** lowercase "wgy labs" wordmark with a curve underneath ("held up"), in the current text colour. Built in HTML/CSS; favicon is a bone "w" on warm black.
- **Header:** Services (dropdown: Build, Test, Monitor, AI agent health check) · Case studies · Pricing · About · Book a call.
- **Pricing (USD):** Audit $750 (credited to a build) · Build from $2,500 per workflow package · Support and maintenance $750/mo (core product, labelled "Recommended"; never claim "chosen by most clients" until it is true) · Monitor and grow $2,000/mo · AI agent health check from $1,000.
- **Prices stay visible** (Kat, 2026-11-20): don't hide them behind an email form; transparent pricing is a selling point vs agencies. An optional "email me an estimate" is fine if lead capture is wanted later.
- **No "founding client" discount on the site** (removed 2026-11-20: it signalled no clients). Pricing ends with "A low-risk start": audit plan is yours to keep, $750 credited in full to a build. Don't add wording that reveals how many clients there are (e.g. "our first client", "first five brands"). No more free projects.
- **Free 30-min intro call:** it's a fit/sales call, not free consulting. Deep analysis = the paid audit. A qualifying form sits in front of it.
- **Case studies:** currently 3 "Example project" cards, clearly labeled illustrative. Never present them as real client results. Replace with real ones as they come.
- **Honesty rules:** no fake testimonials, logos, client names or results. The hero dashboard and monthly figures are labeled as sample data; keep those labels.
- **Numbers on the site (2026-11-20):** savings calculator (hours/week × 50 weeks × $25/h) plus two sourced stats: 64% won't reorder after a failed delivery (Sendcloud 2025, 1,000 UK consumers) and $51.5k average US e-commerce operations coordinator salary (ZipRecruiter 2026). Kat has no paid clients yet: never imply many clients or past results beyond Easi Breezi. Skip the "30–50% of tickets are WISMO" claim: no traceable study.

## Open to-dos (in priority order)
0. **Next up (Kat, 2026-11-19): pain-language copy + chapter breaks.**
   - Rewrite copy so it speaks the founder's daily pain in their own words: "the automation is there, but you still have to be involved", keeping everything in your head so nothing gets forgotten, checking that things actually ran, being the backup for every tool. Lead with their reality, not our services.
   - Split the long page into clear chapters by switching some sections to the black background (like the hero/contact), alternating with white. Keep Style D otherwise (no grey, no beige).
   - Show Kat on the preview before publishing.
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
