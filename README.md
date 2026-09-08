# feliciali.com

Personal portfolio site for Felicia Li — senior product designer, UX/UI.

Built with Astro, hosted free on GitHub Pages, served at feliciali.com.

## Stack

| Piece      | Choice                                          | Why                                             |
| ---------- | ------------------------------------------------ | ------------------------------------------------ |
| Framework  | Astro                                            | Case studies live as markdown files, not hand-edited HTML |
| Hosting    | GitHub Pages                                     | Free, HTTPS included, deploys on push           |
| CI         | GitHub Actions                                   | Builds the Astro site and publishes it automatically |
| Registrar  | Squarespace Domains (formerly Google Domains)    | Where the domain is registered                  |
| DNS        | To be moved off Wix                              | Currently on Wix nameservers                    |

## Roadmap

### Phase 1 — Domain and access

- [x] Locate the Squarespace account holding feliciali.com
- [x] Confirm auto-renew is on and a valid card is on file (expires 2026-10-20)
- [ ] Leave Wix — nameservers move to Squarespace at the end of the project (confirmed still on `ns8.wixdns.net` / `ns9.wixdns.net` as of 2026-09-08 — left alone on purpose until Phase 3)

### Phase 2 — Build

- [x] Create repo `XinyuFeliciaLi.github.io` (public) — create it on GitHub and push this local repo
- [x] Clone locally
- [x] Confirm Node and npm are installed
- [x] Scaffold Astro
- [x] Port the design system from Figma ([NZCCJJITy1aAd8bQ4GZkvg](https://www.figma.com/design/NZCCJJITy1aAd8bQ4GZkvg/Portfolio-Web)): Poppins sitewide, grayscale surfaces + one blue accent (`#3d83c4`), Material 3 spacing — see [src/styles/tokens.css](src/styles/tokens.css). Supersedes the earlier Jost+Danfo/cream-terracotta guess from before the Figma was shared.
- [x] Build the page layouts, matching the Figma's actual nav — Home, Projects (top 4 featured), Playground (smaller/faster pieces), About, Resume (JPG portfolio). No separate Contact page; Figma has none.
- [x] Add motion: scroll reveals, page transitions, hover micro-interactions, hero moment — see "Motion and media" below
- [x] Move case studies in as markdown (placeholder copy, pending real content) — see [src/content/case-studies/](src/content/case-studies/) and [src/content/playground/](src/content/playground/)
  - [ ] Web Design — Fortune Kids — replace placeholder copy
  - [ ] Voice and text input for ai platform — AlterStaff (AI2U) — replace placeholder copy
  - [ ] Design Snapshots — AlterStaff — replace placeholder copy
  - [ ] Children's museum — CMP — replace placeholder copy
  - [ ] 6 Playground items (HUA, Dreamville Mart, MonoMon MR, Graphic Design Snapshots, UXR Instagram, UI Collections) — replace placeholder one-liners
  - [ ] Nonprofit volunteer engagement platform (anonymized) — not in the Figma's top 4, kept as `draft: true` in [src/content/case-studies/nonprofit-volunteer-platform.md](src/content/case-studies/nonprofit-volunteer-platform.md) pending a decision on where it lives
- [ ] Replace placeholder About bio, the 6 "Key Strength" reason cards on Home (unfilled in the Figma too), and the Resume page's JPG(s)

### Phase 3 — Ship

- [x] Add the GitHub Actions deploy workflow — see [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- [ ] Verify the site works at xinyufeliciali.github.io
- [ ] Only then: point DNS at GitHub, add CNAME, enable HTTPS

Order matters. The domain stays pointed at Wix until the new site is confirmed working on the free GitHub URL. That way feliciali.com never shows a broken page.

## Local development

```bash
npm install       # once, after cloning
npm run dev       # local preview at http://localhost:4321
npm run build     # production build into dist/
npm run preview   # preview the production build
```

## Deploying

Push to main. GitHub Actions builds the site and publishes it. Takes about a minute.

```bash
git add .
git commit -m "describe the change"
git push
```

## DNS reference (Phase 3 only — do not apply yet)

Once the site is live on xinyufeliciali.github.io, point the domain at GitHub.

**Apex domain** — four A records for feliciali.com:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Optional IPv6** — four AAAA records:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**Subdomain** — one CNAME for www:

```
www  ->  xinyufeliciali.github.io
```

Then in the repo: Settings → Pages → Custom domain, enter `feliciali.com`, save, wait for the DNS check to pass, and tick Enforce HTTPS. That writes a `CNAME` file into the repo — leave it there, it is load-bearing.

Certificate issuance can take up to 24 hours. A warning during that window is normal.

## Domain facts

- Registered: 2022-10-20
- Expires: 2026-10-20
- Registrar: Squarespace Domains II LLC (inherited from Google Domains)
- Current nameservers: `ns8.wixdns.net`, `ns9.wixdns.net` — to be changed

## Motion and media

The site uses motion in four places: scroll reveals, page transitions, hover micro-interactions, and a hero moment on the landing page.

Rules for keeping it fast and accessible:

- **No GIFs for screen recordings.** Export to MP4 and WebM instead. A GIF of a UI interaction is routinely 10x the file size of the same clip as video, for no visual gain. Use `<video autoplay loop muted playsinline>`.
- **Respect `prefers-reduced-motion`.** Some viewers get motion sickness from scroll animations. Every animation needs a reduced-motion fallback that skips straight to the end state. Implemented in [src/styles/global.css](src/styles/global.css) and the reveal observer in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro).
- **Lazy-load video below the fold.** Nothing plays until it is near the viewport.
- **Watch the budget.** GitHub Pages caps published sites at 1 GB with a soft 100 GB/month bandwidth limit. Media is what eats it.

Real animated artwork — pixel loops, motion graphics where the format is the point — can stay as GIF. This is about screen captures.
