# FD-slides-mobile-dark — til-briefing on phones + tablets, light AND dark

**Lane:** FD-slides-mobile-dark (design audit, decision 17: mobile + dark first-class)
**Surface:** http://127.0.0.1:5273/til-briefing — all 9 slides at 390x844 (portrait phone), 844x390 (landscape phone), 768x1024 (tablet portrait); `?light` + `?dark` each.
**Captures:** `FD-slides-mobile-dark/` (37 PNGs — the full p390 fold set both modes, scroll ladders, defect zooms, l844 + t768 contact sheets). All geometry claims below are DOM-probe-verified (playwright bounding-box intersection), not eyeballed.
**Console:** zero page/console errors across all 54 loads.

**Verdict: DESIGN-DEFECTS** — portrait-phone and tablet are genuinely designed surfaces (the editorial system survives 390px with its character intact, and dark mode is composed, not inverted), but slide 8 portrait is text-over-text broken in both modes, and landscape-phone is a deck-wide failure class with no layout arm at all.

---

## What is EXCEPTIONAL (name it, keep it)

**1. Dark mode is designed, not inverted.** Warm near-black ground, the constellation lattice resolving into legible star-points (`p390-dark-s1.png`, `p390-dark-s9.png`), red accents recalibrated against ink, and—the best move on the deck—the slide-3 invoice receipt STAYS paper-white in dark (`p390-dark-s3.png`): a physical artifact lit on a dark desk, not a recolored div. The browser-window posters on slide 2 likewise stay light ("a window into a live site") under dark window chrome. This is what decision 17 means by first-class.

**2. The portrait reflow architecture works.** The block-flow + scroll-region move (deck.css `max-aspect-ratio: 1/1` arm) holds for 7 of 9 slides: nothing squished, footers clear the dock, the √φ `--space-*` rhythm reads proportional, scroll depth is honest (1.2–2.2 viewports). The typographic registers—serif display, mono eyebrows, red `em` emphasis—keep their full character at 390px (`p390-light-s3.png`, `p390-light-s5.png` are straightforwardly handsome phone pages).

**3. Motion language survives mobile.** Reveal stagger is live and settles (probed mid-flight opacities `[0.61, 0.05, 0, 0, 0]` → all 1): one cascade grammar, no dead static mobile fallback.

**4. The coarse-pointer Xray poster gate is the right call.** Phones get poster + tap-to-launch instead of a desktop-tuned iframe—correct judgment (the poster's execution has defects, below).

**5. Dock chrome:** collapsed pill 149x74 with a 20px bottom gap, primary controls 44x44. Tidy, discoverable, out of the content's way.

---

## Defects (severity-ordered) — the L.W-MOB feed

### D1 — BROKEN: slide 8 (Pipeline) portrait, BOTH modes — text paints over text
`p390-light-s8.png`, `p390-dark-s8.png`, zooms `zoom-s8-overlap-light.png` / `zoom-s8-overlap-dark.png`.
The engine-traits column (UNBIASED / PERIODIC / ON DEMAND / THE HUMAN STAYS IN, `.cadence__*`) double-paints over the pipeline rail (`.stage__*`) and the WOPR console. DOM-verified: `.stage__body` ∩ `.cadence__body` 272x32px (frac 0.78), `.console__id` "WOPR · TERMINAL 01" ∩ `.cadence__body` frac 0.90, "ONLINE" badge frac 1.0. The slide reports `sh=876` ("fits") precisely BECAUSE the overlap eats the height the column should add—the desktop two-column overlay never reflows to one column under the slide's `@container` arm. The WOPR frame, the deck's single best prop, is illegible under paragraph soup. Worst defect on the deck.

### D2 — BROKEN: landscape phone (844x390), deck-wide on dense slides — no layout arm exists
`sheet-l844-light.png` / `sheet-l844-dark.png`; full-size `l844-light-s2.png`, `l844-light-s5.png`, `l844-light-s8.png`, `l844-dark-s9.png`.
The deck's only mobile branch is `max-aspect-ratio: 1/1`—a landscape phone (aspect 2.16) is treated as a desktop and letterboxed to a 693x390 stage. The flex-fitted desktop layout overflows it exactly as the portrait comment in deck.css predicts ("overflows onto its siblings"), and since `overflow-y: auto` is portrait-only, the overflow is CLIPPED—unreachable, not scrollable. Probed: s2 `sh=2349` vs `ch=390` (2000px of slide 2 cannot be reached), s4 `sh=2090`, s5 `sh=1490`, s8 `sh=935`. Collisions everywhere: s9 presenter card over the CTA headline + body (frac 0.82–1.0), s5 keyline over the next example's title, s2 footer/til-mark over tile titles, s8 the same cadence-over-stage soup as D1. Slides 1/3/6/7 mostly survive (cover and lighter slides). A phone rotated sideways is not an exotic posture for a briefing handed across a table; this needs a short-viewport arm (height-based, e.g. `max-height: ~480px` → the portrait block-flow + scroll treatment), not just an aspect test.

### D3 — DEFECT: slide 4 (Examples2) civic-records figure inflates to a near-empty void — portrait AND tablet, both modes
`p390-light-s4-scroll1.png`, `p390-dark-s4-scroll1.png`; tablet `sh=2451`.
`.recon__ties` is authored `viewBox="0 0 64 120"` (tall-narrow, for the desktop side-by-side card) with `height: 100%`. In portrait block flow the parent has no definite height, `height: 100%` falls back to auto, and the SVG sizes from its intrinsic 64:120 ratio: **324x608 at 390w, 640x1200 at 768w** (both probe-measured; 390 × 120/64 and 640 × 120/64 exactly). The result is ~1.5 viewports of dashed-hairline emptiness with one fat red bar—it reads as a rendering accident, and it separates "Two records, one person." from its explanation by a full screen. The sibling `.glyph` figure already has the fix (`--chart-min-h-portrait` clamp in the `@container (width < 880px)` block); `.recon` never got it. One-rule-shaped fix.

### D4 — DEFECT: slide 7 (Xray) portrait — portal window overflows its stage; footer paints over the poster; poster crop clips its own words
`p390-light-s7.png`, `p390-dark-s7.png`, zoom `zoom-s7-window-bottom-light.png`.
Probed geometry: `.xray__stage` claims h=239 (y 437–676) but the `.window` inside it is h=405 (y 437–842)—overflowing its container by ~166px—so `.slide__footer` (y 686) z-paints over the dark poster, grey footer mono + the TIL roundel sitting on the portal's hero text. Separately, the poster image (349x363 box over a desktop-wide screenshot) center-crops to left-clipped fragments: "…tion facts / …e models / …ely on." On a slide whose pitch is "written down for anyone to read," the window literally cuts the words off. Needs (a) the stage to own its height (or the window to respect it) and (b) an art-directed poster crop for narrow frames (object-position to the wordmark, or a phone-framed poster asset).

### D5 — MINOR: constellation anomaly node lands inside text on portrait
`p390-light-s9.png` / `p390-dark-s9.png` (red node mid-sentence in "a proven team, billed time-and-materials"), `p390-light-s1.png` (red tick beside the standfirst). The full-bleed canvas is seeded for a 16:9 stage with text columns that leave clear margins; at 390px the text spans the full width and the signature red node reads as a stray mark in a sentence. Wants a text-exclusion zone (or edge-biased seeding) below ~700px stage width. Related atmosphere note: in LIGHT portrait the lattice is effectively invisible (the H.W4 visibility lift was tuned at desktop densities)—the cover reads as plain cream; dark keeps its stars. Light-mode portrait loses the deck's signature motif entirely.

### D6 — NOTE (borderline, not failing): two small registers
- Pager dots are 24x24—exactly the WCAG 2.5.8 floor (primary dock controls are a healthy 44x44). Fine, but no margin.
- Dark-mode red display accents (`#C00` on near-black, e.g. "$350 million", "pays for itself.") sit ≈3.2–3.4:1—passes AA-large for display sizes, but it is the muddiest read on an otherwise crisp dark surface; one step of luminance (the dark arm already exists for the constellation accent) would make the red sing instead of smolder.

---

## Per-slide mobile defect matrix (for L.W-MOB)

| Slide | p390 light | p390 dark | l844 (landscape) | t768 |
|---|---|---|---|---|
| 1 Intro | OK (lattice invisible—D5) | EXCELLENT | OK | OK |
| 2 Success | OK | OK | **D2: 2000px unreachable, footer/title collisions** | OK |
| 3 Examples1 | GOOD (receipt) | EXCELLENT (paper artifact) | mostly OK | OK |
| 4 Examples2 | **D3: figure void 608px** | **D3** | **D2 + D3 (1083px figure)** | **D3: figure 1200px, sh=2451** |
| 5 Examples3 | OK | OK | **D2: keyline/title collisions, clipped** | OK |
| 6 Sovereignty | OK | OK | OK-ish | OK |
| 7 Xray | **D4: footer-over-window + poster clip** | **D4** | OK-ish (desktop-shaped) | D4 poster crop only |
| 8 Pipeline | **D1: BROKEN overlap** | **D1** | **D1/D2: same soup** | OK (no overlap, probed) |
| 9 Closer | OK (D5 node-on-text) | EXCELLENT (D5) | **D2: presenter card over headline** | OK |

## Design-lens summary

- **Distinctiveness:** high—the editorial-forensic register (mono eyebrows, receipt/nutrition-label/WOPR props, one disciplined red) is nobody's component-library default, and it survives the phone. No AI-slop sameness anywhere.
- **Typography:** the three registers hold their steps at 390px; hierarchy never collapses.
- **Color/theme:** committed—cream/ink/NCSU-red with a true dark arm. D6's red-on-black is the one muddy note.
- **Motion:** one reveal grammar, live on mobile, settles clean.
- **Spatial:** portrait composition is intentional where it reflows (s3, s5, s6); D1/D3 are the two places the desktop overlay/aspect leaked through.
- **Backgrounds/depth:** dark is atmospheric (stars + grain); LIGHT portrait is flat—the lattice motif doesn't survive (D5 note).
- **Affordance:** dock reads instantly; tap-to-launch poster is honest; pager dots are floor-sized.
- **Delight:** the receipt, the WOPR terminal, the anomaly-resolves bookend—present and discoverable. D1 currently buries the best one.

## Suggested spec edits (L.W-MOB intake)

1. **deck.css:** add a SHORT-VIEWPORT arm—`@media (max-height: 480px)` (or compound aspect+height)—applying the same block-flow + `overflow-y: auto` + dock-clearance treatment as the portrait arm. This alone un-breaks D2 deck-wide.
2. **SlidePipeline.vue:** in the `@container` narrow arm, reflow the `.cadence` traits column BELOW the stage rail + console (single column, natural heights). Fixes D1.
3. **SlideExamples2.vue:** give `.recon`/`.recon__ties` a bounded portrait height (mirror the `.glyph` `--chart-min-h-portrait` clamp; cap ≈ `clamp(120px, 34cqi, 200px)`). Fixes D3 at all widths including t768.
4. **SlideXray.vue:** make `.xray__stage` own its height on portrait (window `max-height: 100%`/`overflow: hidden` or stage `height: auto`), and art-direct the poster crop (`object-position` to the wordmark, or a narrow-frame poster asset). Fixes D4.
5. **constellation.ts:** text-exclusion (or edge-biased anomaly seeding) below ~700px stage width; consider a portrait-density arm so the LIGHT lattice reads at phone scale. Fixes/softens D5.
6. **deck-theme tuning (optional):** one luminance step up for dark-arm display red (D6).
