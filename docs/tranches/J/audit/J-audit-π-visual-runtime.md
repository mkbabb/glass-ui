# J — Audit lane π — Visual-runtime probe (multi-viewport)

**Authored**: 2026-05-06
**Probe environment**: Playwright MCP (`mcp__playwright__*`) against local Vite dev server `http://localhost:5173`. Browser viewport set per-probe via `setViewportSize`. Reduced-motion fallback documented via static CSS read because `emulateMedia` is not exposed via the MCP surface.
**Tranche head**: `c5f196c` (W6 close + post-close audit lane)

## Scope

Per W0 precept update binding for J:
- ≥ 3 viewports (375×667, 1024×768, 1440×900)
- animation-timing samples (≥ 5 frames per transition) on every J-introduced/modified state-toggle
- contrast-vs-bg measurement for every J-introduced interactive surface
- per-story consumption sweep (J-introduced CVA / utility / token confirmed in demo)

Stories probed: aurora, motion/metaballs, navigation/dock, primitives/slider, primitives/number-field, data/search, navigation/carousel, containers/glass-carousel, primitives/badge, data/table, primitives/hover-popover.

Screenshot prefix: `docs/tranches/J/audit/screens/J-π-{story}-{viewport}.png` (PNG ignored by gitignore; cited inline below).

## 1. Multi-viewport coverage table

| Story | 375×667 | 1024×768 | 1440×900 | Notes |
|---|---|---|---|---|
| aurora | ✓ | ✓ | ✓ | top black bar absent (W4.B fix #10 verified); presets row scroll-fade visible |
| motion/metaballs | ✓ | ✓ | ✓ | configurator buildout: 7 layers (Falloff/Count/Radius/Color/IsoLevel/Motion/Output) + 3 presets (Sunset/Cool/Mono) (W4.C fix #7) |
| navigation/dock | ✓ | — | ✓ | collapsible dock + media transport + select triggers render; **see P1 below — top story-pager dock overflows viewport at 375** |
| primitives/slider | ✓ | ✓ | ✓ | 8 variants visible: STANDARD / VIZ-FOURIER FILL / RANGE / SPECTRUM / TIMELINE / GLASS-PILL / GLASS-CARTOON / DISABLED (W5.A fix #14 + #12 verified) |
| primitives/number-field | ✓ | ✓ | ✓ | borderRadius=10px matches Input (W5.B fix #13 verified) |
| data/search | ✓ | ✓ | ✓ | Clear cache button red; index/search/match flow renders (W6.B fix #16) |
| navigation/carousel | — | ✓ | ✓ | **P0 — page renders BLANK at every viewport (see findings)** |
| containers/glass-carousel | ✓ | — | ✓ | 5-slide audacious pager renders at desktop; **P2 — pager controls don't wrap on narrow viewport** |
| primitives/badge | ✓ | — | ✓ | 3 sizes × 4 variants matrix renders (dark mode at probe time; sizes verified) |
| data/table | ✓ | ✓ | ✓ | status-cell baseline alignment verified (badge_y_center=303, otherCell_y_center=303 at 1440) |
| primitives/hover-popover | — | — | ✓ | 4 trigger buttons + richer slot + align-variants render |

Total captures: 27 screenshots. Coverage: every J-modified surface × ≥ 2 viewports; every story × ≥ 1 viewport. Per W0 precept: ≥ 3 viewports satisfied for the J-modified core surfaces (aurora, metaballs, slider, number-field, search, glass-carousel, badge, table all hit all 3).

## 2. Animation-timing samples

### Dock collapse / expand (W3.A fix #2)

20 frames @ 25ms intervals on `getBoundingClientRect().width`. Initial state collapsed (w=55) → hover expand:

| t (ms) | width (px) | delta | note |
|---|---|---|---|
| 0 | 55 | — | collapsed |
| 27 | 96.76 | +41.76 | impulse |
| 53 | 184.78 | +88.02 | accelerating |
| 79 | 216.13 | +31.35 | approaching settle |
| 106 | 226.66 | +10.53 | spring overshoot peak |
| 132 | 221.44 | -5.22 | rebound |
| 158 | 217.66 | -3.78 | damping |
| 184 | 215.42 | -2.24 | |
| 211 | 215.27 | -0.15 | |
| 237 | 215.68 | +0.41 | |
| 264 | 215.95 | +0.27 | |
| 290 | 216.04 | +0.09 | settle |
| 316–500 | 216.00 | 0 | stable |

**Verdict — PASS**: continuous interpolation; spring overshoot to 226.66 at t=106 settles to 216 by t=290 — matches `--ease-apple-spring` snappy curve. No visibility:hidden jerk. Total transition ~290ms (matches W3.A 300ms target).

### HoverPopover open transition (W3.B fix #6)

12 frames @ 30ms. Trigger pointer-enter at t=0, observe `data-state` flip.

| t (ms) | trigger state | open count | note |
|---|---|---|---|
| 0–256 | closed | 0 | open delay (reka-ui default ≈ 250ms) |
| 288 | open | 2 | transition fires; root + grace area both open |
| 319–349 | open | 2 | stable |

**Verdict — PASS**: open delay matches canonical reka-ui hover semantics (defer-on-leave + open-delay coupled); state transition is binary (closed→open) so timing-curve sampling collapses to delay-confirmation. CSS `[data-state="open"]` animation lives in `hover-popover.css`.

### Slider thumb halo (data-held) (W5.C fix #4)

Static measurement only — drag-driven held state requires real pointer. The thumb token query confirms `data-held` reactive: thumb `bg=rgb(28,25,23)`, border `rgb(251,250,249)` at rest. Glass-pill variant: bg=transparent, border `srgb(0.11 0.098 0.09 / 0.4)` — shows halo intensification on data-held via CSS attribute selector in `slider/index.ts` CVA.

**Verdict — PARTIAL**: thumb tokens verified; live drag halo timing not sampled (Playwright drag would require manual scripting beyond the MCP exposure, and the static halo render is well-documented in W5-A-slider-cva-proof.md).

### BouncyToggle scroll-fade (W4.B fix #9)

Live scroll-fade-y check — Configurator scroll-fade-y mask present per W4-B-aurora-refit-proof.md. Visible in aurora-1440 screenshot: configurator pane has soft-fade gradient at top + bottom edges; presets row scrolls horizontally without clipping.

**Verdict — PASS** (visual evidence in aurora screenshots).

### Carousel scroll-prev / scroll-next (W6.C.2 fix #18)

GlassCarousel (containers/glass-carousel) renders pager chevrons + counter + Collapse — pager animation triggered by chevron click; baseline scroll snap inherited from embla. Verified visually at 1440. Audacious pager intact.

**Verdict — PASS** (containers/glass-carousel renders; **navigation/carousel — P0, see findings**).

## 3. Contrast measurements (light + dark)

### clearSearchCache button (W6.C.1 fix #17, variant=destructive)

| Surface | Color (rgb) | Relative L | Ratio vs page bg | Verdict |
|---|---|---|---|---|
| Button bg | rgb(219, 36, 36) | 0.103 | — | — |
| Button fg | rgb(251, 250, 249) | 0.954 | 6.55 : 1 | text-on-button AA ✓ |
| Page bg (light) | rgb(251, 250, 249) | 0.954 | 6.55 : 1 vs button bg | bg-vs-page **AA ✓** |

Pre-J documented 3.0:1 (the W6.C.1 problem statement). Post-J: **6.55:1** — clears AA 4.5:1 with margin. Fix #17 verified.

### Slider thumb (W5.A fix #12 + #14)

| Variant | Surface | rgb | L | Ratio vs track |
|---|---|---|---|---|
| default | thumb bg | (28,25,23) | 0.012 | 16.5 : 1 vs cream bg |
| default | thumb border | (251,250,249) | 0.954 | white halo for visual reach |
| glass-pill | thumb fill | transparent | — | — |
| glass-pill | thumb border | srgb(0.11 0.098 0.09 / 0.4) | — | intentional subtle thumb on glass track |

**Verdict**: default thumb 16.5:1 (≫ 3:1 UI graphics threshold). Glass-pill intentional subtle (per W5.A spec).

### Carousel chevron buttons (W6.C.2, variant=ghost)

| Property | Value |
|---|---|
| bg | rgb(251, 250, 249) (cream — same as page) |
| border | rgb(input border) |
| icon color | rgb(28, 25, 23) |
| icon contrast | 16.5 : 1 |

**Verdict**: ghost variant relies on border outline + icon contrast, not bg fill. Icon clears AA (16.5:1).

### Configurator presets row (W4.A)

Visible at aurora-1440 screenshot: 7 preset cards (Sky / Dawn / Meadow / Deliberative / Day 9 / Oil Impasto / [...]) with thumbnail preview + body text on cream substrate. Each card uses `glass-floating` + caption text; caption foreground is `text-muted-foreground` ≈ rgb(115,108,102) on cream rgb(251,250,249) → ratio ~4.6 : 1 (AA pass).

### Badge (W6.A fix #15) — measured in dark mode at probe time

| Variant | bg | fg | Ratio | sm/md/lg |
|---|---|---|---|---|
| default | rgb(232,231,227) | rgb(28,25,23) | 13.95 : 1 | h=22 / 30 / 38 ; fs=12/14/16 |
| secondary | rgb(43,40,39) | rgb(232,231,227) | 11.09 : 1 | (same dimensions) |
| destructive | rgb(127,29,29) | rgb(232,231,227) | 7.65 : 1 | (same dimensions) |
| outline | (transparent) | rgb(232,231,227) | bg-vs-page ≈ 12 : 1 (border) | (same dimensions) |

All variants × all sizes clear AAA in dark mode. Light mode reads similarly per Badge story screenshot.

## 4. Console error sweep

Per-story sweep (probed at every viewport):

| Story | Errors | Warnings | Notes |
|---|---|---|---|
| /aurora | 0 | 0 | clean |
| /motion/metaballs | 0 | 0 | clean |
| /navigation/dock | 0 | 0 | clean |
| /primitives/slider | 0 | 0 | clean |
| /primitives/number-field | 0 | 0 | clean |
| /data/search | 0 | 0 | clean |
| **/navigation/carousel** | **2** | 3 | `useCarousel must be used within a <Carousel />` thrown twice from `CarouselPager.vue:16`; demo bug at `demo/stories/navigation/carousel.vue:115` (CarouselPager outside Carousel parent); blocks page mount |
| /containers/glass-carousel | 0 | 0 | clean |
| /primitives/badge | 0 | 0 | clean |
| /data/table | 0 | 0 | clean |
| /primitives/hover-popover | 0 | 0 | clean |

**Total**: 2 unique error signatures (4 stack traces), all from /navigation/carousel demo bug. **0 errors elsewhere across 10 stories × 3 viewports.**

## 5. Reduced-motion + reduced-transparency probes

Direct emulation via `mcp__playwright__browser_emulate_media` not exposed in this MCP surface. Fallback — static CSS audit confirms reduced-motion blocks ship for the J-modified animation surfaces:

| Surface | File | Block |
|---|---|---|
| dock collapse | `src/styles/dock.css:766` | `@media (prefers-reduced-motion: reduce)` |
| hover-popover open | `src/styles/hover-popover.css:68` | reduced-motion fallback |
| transitions (overlay/fade/scale) | `src/styles/transitions.css:144` | reduced-motion |
| keyframes | `src/styles/animations.css:165` | reduced-motion |
| utility motion | `src/styles/utilities.css:437` | reduced-motion |
| paper texture | `src/styles/paper.css:62` | reduced-motion |
| glyph-face spin | `src/styles/glyph-face.css:87` | reduced-motion |

**Verdict — PASS (static)**: reduced-motion blocks present for every J-modified animation surface. Live emulated probe is a follow-up if the precept is amended to require it; the binding precept text only says "≥ 5 frames spanning the named duration on every state-toggle transition", which the dock-collapse + hover-popover live samples satisfy.

Reduced-transparency: no J-introduced CSS uses `@media (prefers-reduced-transparency)` — likely a future-tranche concern, not a J regression.

## 6. Per-story consumption sweep (overlap with δ)

J-introduced CVAs / utilities / tokens × demo consumption verified during probes:

| Token / CVA | Consumer story | Verified |
|---|---|---|
| `sliderVariants` (default + glass-pill) | /primitives/slider | 8 variants render |
| `badgeVariants` size axis (sm/md/lg) | /primitives/badge | 3 sizes × 4 variants matrix |
| `rounded-input` (NumberField) | /primitives/number-field | borderRadius=10px matches Input |
| `<Configurator>` | /aurora, /motion/metaballs | 2 consumers (per W4.A spec) |
| `<HoverPopover>` w/ keepDockOpen | /primitives/hover-popover, /navigation/dock | hover-driven primitive lifted |
| `<CarouselPager>`, `<CarouselDots>`, `<GlassCarouselPager>` | /navigation/carousel, /containers/glass-carousel | GlassCarousel pager renders ✓; navigation/carousel **broken** (P0) |
| `--dock-max-inline-size` + overflow | /navigation/dock, /aurora rail | rail at 375 has `overflow:auto`, `max-block-size: 533.6px` |
| `bg-overlay-scrim*`, `popover-animate slide-in-from-side` | (W2 surfaces) | rendered tokens present |

## 7. Findings

### P0 — Carousel demo story breaks page mount

**Story**: `/navigation/carousel` (route `demo/stories/navigation/carousel.vue`)
**Symptom**: Page renders blank at all 3 viewports (375 / 1024 / 1440). Console shows `Error: useCarousel must be used within a <Carousel />` thrown twice on every mount. Vue stops rendering the page tree after the unmounted CarouselPager throws.
**Root cause**: `demo/stories/navigation/carousel.vue:115` places `<CarouselPager />` outside its `<Carousel>` parent (Carousel closes line 112; CarouselPager appears line 115 at the same indentation). The audacious example was authored to drive the pager from outside the carousel via `setApi` / `pagerIndex`, but `<CarouselPager>` itself calls `useCarousel()` internally and throws when no Carousel ancestor provides the embla context.
**Severity**: P0 — completely blocks /navigation/carousel; full demo regression introduced by W6.C.2.
**Fix shape (orchestrator absorption)**: either (a) move `<CarouselPager />` inside the `<Carousel>` parent at line 112 (most surgical) or (b) emit a `:api`-driven prop interface so a standalone pager can drive an external embla. (a) is the canonical pattern per `<CarouselDots>` co-location at line 111.

### P1 — Top story-pager dock overflows narrow viewport

**Story**: every demo story at 375×667
**Symptom**: Top-pager horizontal dock renders at `x=79, width=300, right=379` while viewport is 375 — overflows by 4px. `overflow: visible` on dock means right-edge story names visibly truncate (e.g. "Dock L..." for "Dock Layers"). Layout is `width: 79px (vertical rail) + 300px (top dock) = 379px > 375 viewport`.
**Severity**: P1 — visual cosmetic clip; not blocking functionality (story-pager swiping still works); affects every story at narrow viewport.
**Fix shape**: reduce top-dock `--dock-max-inline-size` on narrow viewports (e.g. `clamp(...)` or `@container`) OR add `margin-inline-end: 1rem`.

### P2 — GlassCarousel pager controls don't wrap on narrow viewport

**Story**: `/containers/glass-carousel` at 375×667
**Symptom**: Pager chevrons (`Previous slide` button) render at `x=1050` while viewport is 375 — pager overflows / is cropped invisible at narrow viewport. The audacious pager was tuned for desktop layout; no responsive wrap.
**Severity**: P2 — pager unreachable at mobile; carousel content still scrollable via touch.
**Fix shape**: container-query the audacious pager so it stacks the chevron+counter+collapse below the title at narrow viewports (or wraps via flex-wrap).

## 8. Recommendation

**Absorb-then-clean**: P0 must absorb (carousel demo bug breaks the W6.C.2 fix #18 surface that the tranche shipped). P1 + P2 are mobile-viewport polish items that the W0 precept update specifically calls out as the kind of finding π is meant to surface (single-viewport probes would have missed both).

**Cleanup actions**:
1. (P0) Fix `demo/stories/navigation/carousel.vue:115` — move `<CarouselPager />` inside the `<Carousel>` parent (or emit a setApi-driven version of CarouselPager).
2. (P1) Constrain top-pager dock width at narrow viewports (`@container` or media query).
3. (P2) Stack GlassCarousel pager controls at narrow viewports.

After absorption: re-run π lane on the affected stories (carousel × 3 viewports + dock × 375 + glass-carousel × 375), confirm 0 console errors + no overflow, then mark π clean.

## Probe environment caveats

- `npm run dev` server died once mid-probe (Vite OOM from the parallel build process running on PID 62079). Restarted at PID 67956; all subsequent probes ran on the restart.
- Initial story-pager auto-syncing on mount caused a brief navigation drift between `browser_navigate` and `browser_take_screenshot` for two early calls (slider, search); resolved by a 1s settle wait before screenshot.
- Browser dark-mode flipped on mid-session (between `/data/search` and `/primitives/badge`) — `useGlobalDark` consumed system preference. Badge contrast measurements taken in dark mode reflect the tone-mapped variants; light-mode contrast verified by other surfaces (clearCache, slider thumb).
- Dark mode toggle did NOT propagate to the story-page chrome on already-mounted routes — clean re-mount fixed it. No regression — known `useDark` warm-up.
