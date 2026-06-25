# Pass-E META-STORYBOOK DEMO audit — foundations/radii

- **Route:** `/foundations/radii` · **SFC:** `demo/stories/foundations/radii.vue` · **Live:** http://localhost:5173/foundations/radii (verified)
- **Manifest row:** `manifest.ts:484` `s("foundations","radii","Radii","Radius tokens from xs to pill.")` — `variant="page"` (no `hero`), background defaults `paper` (`manifest.ts:182`), subpath auto-derived `/foundations/radii` (`manifest.ts:209`).
- **Verdict class:** FLAT TOKEN-TOUR — fails the BD north star on every axis but path-label.

---

## (1) DEMO CONGRUENCE — does it show radii at its BEST + exercise the full API? NO.

The page paints 14 inert cream squares (`radii.vue:42-49`, `67-74`): `h-20 w-20 border border-border bg-card shadow-cartoon` + the radius class. The radius token is shown as an abstract corner on an empty box — it NEVER demonstrates the radius doing its job on a REAL component.

- The `semantic` aliases literally name their consumers in prose — `rounded-card` "cards, elevated surfaces", `rounded-dialog` "modals, sheets", `rounded-button` "buttons", `rounded-dock` "glass pill dock" (`radii.vue:22-30`) — yet renders NONE of them. The page TELLS instead of SHOWS. A `rounded-card` swatch should BE a `<Card>`; `rounded-button` should BE a `<Button>`; `rounded-dock` should BE a live `<GlassDock>` pill. This is the demo-congruence miss: the component whose radius is the point is absent.
- Zero animation affordance. The north star mandates "HIGH animation affordance for EVERY component." The only motion is the inherited `.scroll-cascade` entrance on the wrapper (`radii.vue:36,61`). No hover morph, no radius-interpolation demo (e.g. a slider scrubbing `--radius` live across all aliases — the obvious interactive radii demo), no `@property`-animated corner.
- Zero dock API usage. `rounded-dock` is the dock's own radius token; the page should mount a real dock to show it (and per the BD ask, "leverage the dock APIs — contextual switching/animating"). It instead draws a circle and writes "GLASS PILL DOCK" beneath it.

## (2) COMPONENT ABILITY — deft series of glass-ui components? NO — THIN/FLAT.

The SFC imports exactly THREE things: `StoryPage`, `StorySection`, `cn` (`radii.vue:8-10`). It composes ZERO library components — no `<Card>`, `<Button>`, `<Tabs>`, `<GlassDock>`, no procedural-anim. It is a `v-for` over two hardcoded arrays of `<div>`s. Against the BD bar ("each page deftly uses a series of docks/procedural-anims/cards/tabs/buttons") this is the floor, not the bar.

Suggested gestalt: a `<SegmentedTabs>` switching Scale ↔ Semantic ↔ "Live" (real Card/Button/Dialog/Dock at their alias radii); a radius `<Slider>` driving `--radius` so the lg-derived aliases breathe in real time; the dock-radius row as an actual `<GlassDock>`.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field? NO. Paper morphism? PARTIAL/INERT.

- The body IS a glass plate — `backdrop: blur(10px) saturate(1.05)`, bg `oklab(0.934 … / 0.664)`, `rounded-card 16px` (live computed). But it floats over a FLAT near-white substrate (`paper` wash, body bg transparent → near-white). With nothing behind it, the blur/saturate/refraction reads as NOTHING — the morphism is invisible. The BD ask is explicit: "glass demos over COLORFUL aurora backgrounds." This page has no aurora, no constellation, no colorful field.
- The swatches themselves are opaque cream `bg-card` (`rgb(251,248,244)`, live) — they do not demo glass at all, and being opaque they would occlude any field even if one existed (the BG-2 black-plate class the W-STAGE `tier="field"` host exists to fix — unused here).
- Paper morphism: the `paper` manifest default is the apt register for a foundations token page, but the live wash is sub-perceptual at this card tier — no readable paper-grain/blueprint-grid texture is visible. Inert, not present.

## (4) STRUCTURE — own glassy card per sub-section? main area BIG enough? NO on both.

- The two sub-sections (Scale, Semantic aliases) share ONE outer glass card, separated only by the `.story-sections--delimited` hairline (`StoryPage.vue:166-175`). The BD ask — "each sub-section in its OWN glassy card" — is unmet: there is one card with two flat regions inside it, not two cards.
- Main card area is NOT big — it is bounded by `--story-page-max-inline` (`StoryPage.vue:86-87`) and sits in a sea of empty page (full-page screenshot shows the card occupying ~half the width with vast top/left/right whitespace). The ask "main card area BIGGER (more screen space)" is unmet; the swatch grids are tiny (`h-20 w-20`) inside a huge empty plate.

## (5) PATH-LABEL — STANDARDIZED. ✓

The hero renders the `/foundations/radii` Fira-Code chip via the auto-derived `SUBPATHS` map (`manifest.ts:209` → `StoryPage.vue` subpath chip). No hand-rolled label, no drift. This axis passes.

## (6) LANGUAGE — minor tightening.

- Blurb "Radius tokens from xs to pill." (`manifest.ts:484`) is acceptable but generic. Slightly tighter / more descriptive: "Radius scale + semantic aliases." — optional.
- The `hint`/`role` strings are crisp (`radii.vue:13-30`); no superfluous prose there.
- The SFC header comment (`radii.vue:2-7`) is dense BB-era provenance prose; not user-facing, leave as-is.

## (7) BUGS — none functional; design-dead, not code-dead.

- No dead demo / broken animation in the code sense — the `.scroll-cascade` entrance fires, swatches render. The "bug" is design: a token-spec-sheet masquerading as a component demo. No console errors observed.
- `rounded-md` hint says "6px" (`radii.vue:15`) — spot-check the actual `--radius-md` token to confirm the hint is not stale (hints `2/4/6/12/16px` are hardcoded strings, a drift risk if tokens retune; `rounded-lg` correctly defers to `var(--radius)`).

---

## Remediation sketch (gestalt, not patch)

1. Mount the page over a LIVE colorful field (aurora/constellation contained) or at minimum a readable paper-grid wash; host swatches in `tier="field"` so glass reads through.
2. Split Scale and Semantic into their OWN glassy cards (two `<Card>`/glass plates), main area widened.
3. Make the semantic aliases REAL: `rounded-card`→`<Card>`, `rounded-dialog`→a Dialog preview, `rounded-button`→`<Button>`, `rounded-dock`→a live `<GlassDock>` pill (the dock-API ask).
4. Add a radius `<Slider>` driving `--radius` live + a `<SegmentedTabs>` Scale/Semantic/Live switcher — the animation + component-series affordance.
