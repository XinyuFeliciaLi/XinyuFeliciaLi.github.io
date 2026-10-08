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
- [x] Port the design system from the final Figma ([g3zH06cDNIeq0Uhdjn2axc](https://www.figma.com/design/g3zH06cDNIeq0Uhdjn2axc/Portfolio---Web--Final)): Poppins sitewide (self-hosted), navy ink `#253746` on page `#F1F2F4`, white surfaces, mint accent `#5ADBA6`, one set of type roles — see [src/styles/tokens.css](src/styles/tokens.css). Supersedes the earlier NZCCJJITy1aAd8bQ4GZkvg file.
- [x] Build the page layouts, matching the Figma's actual nav — Home, Projects (top 4 featured), Playground (smaller/faster pieces), About, Resume (JPG portfolio). No separate Contact page; Figma has none.
- [x] Add motion: scroll reveals, page transitions, hover micro-interactions, hero moment — see "Motion and media" below
- [x] Build all 9 case studies from the final Figma: 4 Projects (Fortune Kid, AI2U voice and chat, AI2U Design Snapshots, Children's Museum) and 5 Playground (HUA, Soul Seasoned, Dreamville Mart, Monomon MR, Graphic & UI). Real copy and images, no placeholders.
- [ ] Export the 4 videos (see "Content rules")
- [ ] Re-export key images at 2x for sharper screens (current crops are 1x)
- [ ] About and Resume pages: not designed in the Figma yet, still placeholders

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

## Content rules (from the Figma)

Source of truth: [Portfolio - Web (Final)](https://www.figma.com/design/g3zH06cDNIeq0Uhdjn2axc/Portfolio---Web--Final). The case study copy and images are final there.

- **Text is copied word for word.** The only edits are the typo fixes and meta-label wording below. Nothing else is reworded.
- **Images are exported as-is.** None are added or removed.
- **Typography and color are unified, not copied.** Figma sets body copy in Jost at many slightly different sizes. The site uses Poppins and the type roles in [src/styles/tokens.css](src/styles/tokens.css) everywhere.
- **Every case study uses the Fortune Kid section format:** phase eyebrow (Understand / Research / Define / Design / Iterate), then the section heading, then content. Final-design sections use the MonomonMR format: FINAL DESIGN eyebrow followed by the Experience Walkthrough heading. Impact is a heading with no eyebrow. In AI2U and Children's Museum, the phase names were large blue headings in Figma and become eyebrows. The heading that follows the phase becomes the section heading.

### Where content lives

| What | Where |
| --- | --- |
| Case study list and card copy | [src/data/cases.ts](src/data/cases.ts) |
| Case study pages (text, cards, rows, image references) | `src/data/cases/<slug>.json`, generated from the Figma frames |
| Case study images (cropped from Figma at 1x) | `src/assets/cases/<slug>/` |
| Hero mockups | `src/assets/heroes/<slug>.png` |
| Videos | `src/assets/media/<slug>/<figma-node>.mp4` (see below) |
| Renderer | [src/components/Blocks.astro](src/components/Blocks.astro), [src/components/CaseStudy.astro](src/components/CaseStudy.astro) |

**Videos still to export.** Figma can't export video, so these four show their poster frame until the MP4 is dropped in. Once the file exists, it becomes a click-to-play video automatically:

- `src/assets/media/ai2u-voice-chat/30-2096.mp4`: AI2U, "Recording stops on click"
- `src/assets/media/ai2u-voice-chat/30-2102.mp4`: AI2U, "No mic feedback while speaking"
- `src/assets/media/monomon-mr/30-3596.mp4`: Monomon MR, Highlights
- `src/assets/media/monomon-mr/30-3757.mp4`: Monomon MR, Experience Walkthrough

### Typo fixes applied on the site (Figma still has the original)

| Page | Figma | Site |
| --- | --- | --- |
| Graphic & UI (title) | Graphic & UI Design Snpashots | Graphic & UI Design Snapshots |
| Dreamville Mart (title) | Dreamville Mart:AI Multiplayer Game | Dreamville Mart: AI Multiplayer Game |
| Soul Seasoned | 03 · Chat Hisotry | 03 · Chat History |
| Children's Museum | Orginal Design | Original Design |
| AI2U | Collaborating with development,we refined | Collaborating with development, we refined |
| Soul Seasoned | CMU ETC FestivalShowcase | CMU ETC Festival Showcase |
| AI2U Design Snapshots (Problem) | stent interaction patterns increased… | Inconsistent interaction patterns increased… (text box was cut off) |
| AI2U Design Snapshots | What I’d learned from these project | What I’d learned from these projects |
| AI2U | …work began. scope that coordination work… | …work began. Scope that coordination work… |
| HUA | high-fidelity Interface | High-fidelity Interface |

### Meta label wording (unified across all case studies)

| Figma | Site |
| --- | --- |
| Deliverables / Deliverable | Deliverable |
| Tool / Tools | Tools |
| Timeline / Timeline & Status / Status | Status |
| Focus | Focus |

Role, Client, Collaborators and Responsibilities stay as they are.

## Motion and media

The site uses motion in four places: scroll reveals, page transitions, hover micro-interactions, and a hero moment on the landing page.

Rules for keeping it fast and accessible:

- **No GIFs for screen recordings.** Export to MP4 and WebM instead. A GIF of a UI interaction is routinely 10x the file size of the same clip as video, for no visual gain.
- **Videos never autoplay.** Use [src/components/VideoPlayer.astro](src/components/VideoPlayer.astro): it shows the poster frame, and the viewer clicks to play and clicks again to pause.
- **Respect `prefers-reduced-motion`.** Some viewers get motion sickness from scroll animations. Every animation needs a reduced-motion fallback that skips straight to the end state. Implemented in [src/styles/global.css](src/styles/global.css) and the reveal observer in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro).
- **Load video lazily.** `preload="metadata"` fetches only the first frame and duration until the viewer presses play.
- **Watch the budget.** GitHub Pages caps published sites at 1 GB with a soft 100 GB/month bandwidth limit. Media is what eats it.

Real animated artwork — pixel loops, motion graphics where the format is the point — can stay as GIF. This is about screen captures.
