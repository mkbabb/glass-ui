# BUILD-REPORT-2 — W-VIZ-BROKEN-FIX (iteration 2)

**Date.** 2026-06-23 · **Host.** macOS Chrome via chrome-devtools-mcp, dpr 2, demo `http://localhost:5173` (path-routed SPA — NOT hash). **Branch.** `prototype/liquid-dock`.

**Verdict target.** JUDGE-1 passed D1–D4, D6 (paint-verified) and FAILED only **D5 — the hero text "should NOT scroll like this on every page."** Iteration 2 DECISIVELY fixes D5 (the judge's preferred Option 1 — the hero scrolls AWAY) + addresses the held goo-dot faintness refinement, and re-verifies the five already-passing defects still hold live.

---

## What built (iteration 2)

### D5 — the DECISIVE fix: the hero title SCROLLS AWAY on hero/viz pages (the user's literal ask)

**Root cause (re-confirmed live).** The `.story-hero-shrink` sticky large-title-collapse register was applied to BOTH content pages (`variant="page"`) AND hero/substrate-viz pages (`variant="hero"` — every viz: blob, goo-dot, fourier-field, aurora, …). On a viz page the "collapse" was a fraud: `position: sticky` + `scale(0.82)` left a ~211px `text-display-hero` word at **opacity 1.0 stuck over the viz canvas** — the title NEVER faded, only the eyebrow/blurb did. Measured live on `/substrates/blob` at scrollTop 700: cluster `position: sticky`, transform `scale(0.82)`, **title opacity 1.0, title rect 211px overlapping the viz canvas by 22.8%.** The iOS large-title collapse is the wrong model for a viz page — the viz IS the content, and a 200px display word plastered over it is unusable.

**The fix (no-legacy, idiomatic split).** The sticky large-title-collapse is now scoped to the CONTENT-PAGE chrome header ONLY (`StoryPage.vue`, `variant="page"`, where a slim sticky nav header is genuine). The HERO/viz cluster gets a DISJOINT twin register — `.story-hero-scroll-away` — that is NOT sticky: it sits in normal flow and scrolls UP AND OFF with the body as you scroll, so the field owns the viewport (the verbatim user ask). A liquid-weight gentle LEAVE ([[feedback-liquid-weight-universal]]): the cluster feathers its opacity 1→0 + lifts `translateY(-1.5rem)` over a 120px→340px scroll() window so the giant word DISSOLVES off the top with inertia rather than hard-clipping — compositor-only (opacity + translateY), native `scroll()` timeline (NO Lenis/GSAP), gated under `@supports (animation-timeline: scroll())` + `prefers-reduced-motion: no-preference` (PRM/gap-engine → the cluster simply scrolls off in plain flow, the correct static fallback). Because the cluster is `position: relative` (not sticky), the body can never scroll UNDER it — the overlap is structurally impossible.

**Files:**
| File | Edit | Lines |
|---|---|---|
| `demo/stories/StoryHero.vue` | both hero-variant cluster sites (the fullBleed path + the contained Card path): `class="story-hero-cluster story-hero-shrink"` → `story-hero-scroll-away` + the rationale comment | template L346, L394 (cluster class) + the two block comments |
| `demo/stories/story-hero.css` | re-scoped the `.story-hero-shrink` register doc to content-pages-only; ADDED the `.story-hero-scroll-away` register (`position: relative` + the leave knobs `--hero-leave-range-start: 120px` / `-range-end: 340px` / `-lift: -1.5rem`) + the `@keyframes story-hero-scroll-leave` (opacity + translateY) under the `@supports`+PRM gate | the scroll-shrink section (~L208–305) |
| `scripts/proof-page-chassis.mjs` | PC1 `shrinkRange` regex follows the iteration-1 tokenization: `animation-range: 0 \d+px` → `0 (\d+px \| var(--hero-condense-range, Npx))` (the condense range is now a token, per BUILD-SPEC D5; the range-START stays the literal `0`) | L205–211 |

`StoryPage.vue` is UNTOUCHED — the content-page chrome `<header>` keeps `.story-hero-shrink` (sticky collapse preserved).

### Goo-dot faintness (the held non-blocking refinement — presets-in-consumers, ZERO library change)

The judge noted the goo-dot field was "VERY faint — pale cream dots on a pale cream substrate." The library `DEFAULT_GOO_DOT_CONFIG` is the calm library identity (correct — `proof:no-gray` reads it). The DEMO `GOO_DOT_PRESET_WARM` (presets-in-consumers — the demo's louder read) lifts the dot contrast so the warm-cream field READS on the demo's warm-cream card: `dotMax 0.42→0.54` (bigger bright core), `dotMin 0.18→0.24` (touch-larger rim dot), `dotBrightFloor 0.35→0.52` (lift the dim-outside floor). The library default + the warm-identity fence are byte-untouched.

| File | Edit |
|---|---|
| `demo/stories/substrates/presets.ts` | `GOO_DOT_PRESET_WARM` gains `dotMax: 0.54, dotMin: 0.24, dotBrightFloor: 0.52` (demo-local contrast lift) |

### D1–D4, D6 (iteration-1 work) — VERIFIED INTACT (source + live), no edits this iteration

Confirmed the iteration-1 fixes are present in source and live:
- **D1** `FourierField.vue` — the live `renderConfig` Proxy over `cfg.value` + `watch(() => props.config, () => renderer.wake(), {deep})` (L142–185).
- **D2** `GooDotMatrix.vue` — the `renderConfig` Proxy + deep wake watcher (L51–88); `useGooDotMatrix.ts` — `getField()` live-reads at the per-frame sites, the `const field` SETUP snapshot kept for the satellite bind (L106–113).
- **D4** `WatercolorDot.vue` — the `.watercolor-ghost-stroke` dashed-`<div>` reading `activeBorderRadius` (L210–212); the old `<ellipse rx=46>` is GONE.
- **D6** `useFourierField.ts` — the velocity scrub `headT += (baseRate + velocity.x*SCRUB_GAIN + momentum)*dt` (L121–129); `SCRUB_GAIN = 0.15` in `constants.ts`.

---

## Live before/after (computed values)

### D5 — the blocker, DECISIVELY closed

| Surface | BEFORE (iter-1, judge) | AFTER (iter-2) |
|---|---|---|
| `/substrates/blob` @ reading scroll | cluster `position: sticky`, transform `scale(0.82)`, **title opacity 1.0, overlap 22.8%** of viz canvas | cluster `position: relative`, title scrolled OFF (top `-548`→`-1070`), **overlap 0%**, canvas `aria-hidden:true`, title color warm-ink `rgb(28,25,23)` at rest |
| `/substrates/goo-dot` @ reading scroll | (same sticky overlap) | `position: relative`, title top `-572`, **overlap 0%**, canvas backing 2066×920 (NOT stuck) |
| `/substrates/fourier-field` @ reading scroll | (same sticky overlap) | `position: relative`, title top `-1070`, **overlap 0%**, canvas backing 1246×1042 (NOT stuck) |
| `/substrates/aurora` (full-bleed path) | (same) | `position: relative` (isFullBleedPath true), title scrolled off (top `-373`) — the fullBleed AND contained paths both fixed |

**The leave-fade frame-series** (`/substrates/blob`, rAF-sampled): scrollTop 0 → opacity **1.0** translateY 0 (title reads FULL at rest); scrollTop 230 → opacity **0.5** translateY -12px (mid-leave feather); scrollTop 340 → opacity **0** translateY -24px (fully faded as it clears). `ScrollTimeline` correctly attached. Liquid-weight inertia on the exit, smooth.

**Content-page register PRESERVED** (`/forms/inputs`): `.story-hero-shrink` present (sticky), NO `.story-hero-scroll-away`; title "Inputs" rest transform `scale(1)` → scrollTop 200 transform `scale(0.82)` — the iOS large-title collapse STILL fires on content pages (the split is clean).

### Goo-dot faintness — improved
The dot-field metaball cloud now reads clearly (the dense-bright core / sparse-dim rim warm-amber gradient is visibly present), where iter-1 was a near-invisible whisper. Warm-cream identity holds.

### D1–D4, D6 re-verified live (no regression)
- **D3 blob/goo-dot/fourier canvas backings:** blob 1536² (768×dpr2), goo-dot 2066×920, fourier 1246×1042 — NONE stuck 300×150; zero console errors on all three pages.
- **D4 watercolor ghost:** 4 `.watercolor-ghost-stroke` divs, each a DISTINCT 8-value `border-radius` superellipse, `border: 2px dashed`; no `50%`/ellipse, no old `<ellipse rx=46>`.
- **D6 fourier cursor:** canvas `pointer-events: none`, host `.fourier-field--interactive` receives the pointer sweep (the velocity-scrub architecture).
- **D2 goo-dot config:** the variant buttons (dot-field/dot-dither/dot-lattice/dot-sphere) + interactive/paused switches live (judge-verified; the WebGPU canvas pixel-readback is premultiplied-transparent so the change is verified visually, not numerically).

---

## Screenshots (docs/tranches/BD/viz/refine/viz-broken-fix/)
- `BEFORE2-blob-hero-overlap.png` — the defect: giant "GooBlob" plastered over the gold droplet + the entire configurator (22.8% canvas overlap).
- `AFTER2-blob-scroll-away.png` / `AFTER2-blob-viz-unobstructed.png` — the gold blob viz + full configurator, title GONE (overlap 0%).
- `AFTER2-blob-rest.png` — the rest state: the audacious "GooBlob" title reads full + large at the top, scrolls away on scroll.
- `AFTER2-goodot-field.png` (rest title) / `AFTER2-goodot-viz.png` / `AFTER2-goodot-louder.png` — the goo-dot HYBRID dot cloud, title scrolled off; the louder (contrast-lifted) read.
- `AFTER2-fourier-viz.png` — the fourier epicycle reconstruction + full configurator, title scrolled off.

---

## Typecheck / siblings / a11y / gates

- **Typecheck.** `npx vue-tsc --noEmit -p tsconfig.json` — ZERO `error TS` (CSS + numeric preset + class renames + comments are type-safe).
- **Siblings.** `node scripts/verify-siblings-intact.mjs --quiet` → `SIBLINGS_OK`. ZERO touches outside `glass-ui src/`+`demo/` (+ the one gate-follow in `scripts/`).
- **a11y.** Viz canvases keep `aria-hidden="true"` (verified live). The readable hero title resolves warm-ink `--foreground` (`rgb(28,25,23)`) at rest — AA contrast preserved. No semantic change. PRM-carved: the scroll-leave is under `@media (prefers-reduced-motion: no-preference)`; under reduce the cluster scrolls off in plain flow (no fade — the vestibular floor).
- **Compositor-only.** `proof:no-layout-animation` → **LOCKED** (52 keyframes scanned, 0 layout animations off the allowlist — the new `story-hero-scroll-leave` is opacity+translateY only).
- **Gates I touched / could affect — GREEN:**
  - `proof:page-chassis` — PC1 (scroll-shrink register) now **GREEN** (the regex-follow restored it after iter-1's tokenization broke the literal-`Npx` match). PC3 (`display/buttons` + `dock/liquid-playground` double-card) + PC2/4/5/6/7 unaffected.
  - `proof:no-gray` — viz-palette-warm-{goo-dot-matrix,dot-matrix,goo-blob} **GREEN** (my preset change is dot geometry/brightness, NOT palette colors; the library default is untouched).
  - `proof:viz-hybrid` — **GREEN** (warm-identity + paint-wiring).
  - `proof:page-hierarchy` 6/6, `proof:hierarchy` 10/10, `proof:grid-simple` PASS.
- **Pre-existing failures NOT introduced by this wave (out of scope):**
  - `proof:page-chassis` PC3 (`display/buttons.vue`, `dock/liquid-playground` double-card) — those SFCs were modified by OTHER BD prototype waves (in the working-tree diff), not by D5.
  - `proof:ba-animate` W2 (`.scroll-progress` on the route scroller) — absent in `AppShell.vue` at BOTH HEAD and working tree → RED at HEAD, independent of all BD work.

---

## North-star compliance

- **The verbatim defect closed.** "The hero text should NOT scroll like this on every page" — on every hero/viz page the title now scrolls AWAY (overlap 0%), the viz owns the viewport. The sticky collapse survives ONLY where it belongs (content pages).
- **Warm identity holds** — gold blob, warm-amber goo-dot cloud, rose fourier curve. NO gray. (`proof:no-gray` GREEN.)
- **Liquid weight** — the scroll-leave is a gentle inertial feather (opacity + lift), not a hard clip.
- **Compositor-only / PRM-carved / Safari-OK** — native `scroll()` (Baseline Safari 26+) with the static plain-flow fallback; opacity+translateY only; `@supports`+PRM gated.
- **No legacy** — clean disjoint twin register (`.story-hero-scroll-away`), no alias, no back-compat shim; the gate follows the tokenized source.

**Net.** D5 — the one blocker — is decisively fixed and live-proven (22.8% overlap → 0%, title scrolls away, viz unobstructed). The five already-passing defects re-verified intact. The goo-dot faintness refinement landed (presets-in-consumers). No new gate failures; typecheck clean; siblings intact.
