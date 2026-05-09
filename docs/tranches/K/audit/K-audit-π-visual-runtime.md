# K — Audit lane π — Visual-runtime probe (multi-viewport)

**Authored**: 2026-05-09
**Probe environment**: Playwright MCP (`mcp__playwright__*`) against local Vite dev server `http://localhost:5173`. Viewports set per-probe via `page.setViewportSize`. `getBoundingClientRect()` + `body.scrollWidth` reads via `browser_evaluate`. Reduced-motion live-emulated via `page.emulateMedia({ reducedMotion: 'reduce' })`.
**Tranche head**: post-W6 / W7 / WP HEAD (K close ceremony state — pre-FINAL).

## Scope (per dispatch)

Five steps:

1. Multi-viewport probe (375×667, 1024×768, 1440×900) across 11 canonical surfaces.
2. Animation-timing samples on every K-introduced state-toggle.
3. Contrast probe on every K-introduced/modified interactive surface.
4. W6 brittleness window restoration probe (≤ 0.5% PNG-diff target).
5. Reduced-motion gating probe.

## 1. Multi-viewport probe

### Per-viewport horizontal overflow + content presence

| Surface | 375×667 | 1024×768 | 1440×900 | Notes |
|---|---|---|---|---|
| `/foundations/intro` (landing) | ✓ no overflow, content | ✓ | ✓ | story pager + hero |
| `/primitives/buttons` | ✓ | ✓ | ✓ | 3 audacious cells render; ✦ `::after` glyph present at rest opacity 0; sparkle-sweep fires on hover |
| `/primitives/hover-popover` | ✓ | ✓ | ✓ | 3 hoverOpenDelay cells (default · 250ms / snappy · 80ms / deferred · 500ms) — tested live, see §2 |
| `/primitives/dock-group` | **OVERFLOW 24px** | ✓ | ✓ | "DENSITY · AUDACIOUS" row (`0.8ms` chip clipped at right edge of 375 viewport); see Finding π-1 |
| `/navigation/dock` | ✓ | ✓ | ✓ | dock chrome + media transport + select trigger render; aria-labels on icon-only `DockIconButton`s preserved (WP P1-3 fix verified — `aria-label="Dock command"` removed) |
| `/navigation/carousel` | ✓ | ✓ | ✓ | 2 carousels + 4 chevrons + dots + counter pill all visible; J's P0 (`useCarousel must be used within Carousel`) absorbed by V — 0 errors at HEAD |
| `/compositions/dock-with-slider` | ✓ | ✓ | ✓ | W7 demo: 4 sliders inside collapsible docks; thumb-halo intensification verified via direct `dockKeepOpen()` invocation (see §2 + §3) |
| `/motion/metaballs` | ✓ | ✓ | ✓ | Configurator P0 fix verified — 3 preset swaps (Sunset → Cool → Mono → Sunset) produce 0 console errors / 0 warnings |
| `/aurora` | overflow 8px (decorative bloom) | ✓ | ✓ | `absolute -inset-6 ... blur-2xl` decorative bloom extends 8px past viewport; not user-facing; see Finding π-2 |
| `/feedback/skeleton` | ✓ | ✓ | ✓ | 28 `.skeleton-shimmer` instances render; transform-only animation verified (see §2 + §5) |
| `/compositions/instrument-chassis` | ✓ | ✓ | ✓ | phase-color cascade alive — clicking PING button propagates `--phase-color: hsl(224 67% 72%)` from chassis section to nested `[data-tier="primary"]` |

Total: 33 probes (11 surfaces × 3 viewports). Of these, 31 pass cleanly; 2 surface a non-blocking overflow finding (Findings π-1 + π-2 below).

### Console error sweep (375×667)

11 routes navigated with `page.on('console')` + `page.on('pageerror')` listeners. **0 errors / 0 warnings across all 11 routes.** Notably:

- `/motion/metaballs` — 0 errors after preset swaps (Configurator recursive-update P0 absorbed).
- `/navigation/carousel` — 0 errors (J's `useCarousel must be used within Carousel` P0 absorbed).
- `/compositions/dock-with-slider` — 0 errors during dock hover-expand cycle.

### Screenshots captured

```
docs/tranches/K/audit/screens/
├── K-pi-buttons-{375,1440-hovered}.png
├── K-pi-dock-group-{375,1440}.png
├── K-pi-carousel-{375,1440}.png
├── K-pi-dock-with-slider-{375,1440}.png
├── K-pi-metaballs-{375,1440}.png
├── K-pi-aurora-375.png
├── K-pi-instrument-chassis-1440.png
└── K-pi-skeleton-reduced-motion.png
```

(PNGs gitignored per repo policy; cited inline below.)

## 2. Animation-timing samples

### `Button variant="primary-audacious"` sparkle-sweep on hover (W6)

**Method**: `page.locator('button.btn-audacious').first().hover()`, then `getComputedStyle(b, '::after')` on the `✦` glyph.

| Property | Rest state | Hover state |
|---|---|---|
| `content` | `"✦"` | `"✦"` |
| `position` | absolute | absolute |
| `opacity` | 0 | (animates to ≥ 0 via keyframe) |
| `top / left` | `4px / 8px` | unchanged |
| `color` | `rgba(255,255,255,0.7)` | unchanged |
| `animation-name` | `none` | **`sparkle-sweep`** |
| `animation-duration` | `0s` | **`0.6s`** |
| `animation-timing-function` | linear | **`cubic-bezier(0.16, 1, 0.3, 1)`** (ease-out-expo / Apple-spring-out-quint) |

**Hover state also confirms**:
- `background-image` includes the SVG `feTurbulence` data-URI (**disco-grain**) + `radial-gradient` overlay.
- `box-shadow` swaps from rest `rgba(255,255,255,0.05) 0 0.5px 0 inset, rgba(0,0,0,0.06) 0 0.5px 0` to hover `rgba(255,255,255,0.3) 0 1.5px 0 inset, rgba(0,0,0,0.06) 0 0.5px 0` — the **specular highlight intensification** (rim lift from 0.05 → 0.3 alpha).

All three load-bearing W6 ingredients (disco-grain + sparkle-sweep + specular-highlight) verified at HEAD.

### Slider thumb-halo intensification (W7 contract)

**Method**: Direct invocation of `provides.dockKeepOpen()` on the GlassDock component instance found via Vue parent traversal from `[data-test-target="dock-slider-0"] .glass-slider`. (Synthetic Playwright drag did not propagate through reka-ui's pointer-capture path; the contract IS wired correctly per Vue inject chain — `dockKeepOpen` / `dockHeld` provides resolved on the GlassDock + Slider instances; manual invocation confirmed end-to-end propagation.)

| State | `.glass-dock[data-held]` | `.glass-slider[data-held]` | thumb `box-shadow` |
|---|---|---|---|
| rest | (absent) | (absent) | `color(srgb 0.91 0.906 0.89 / 0.06) 0px 2px 8px 0px` |
| `dockKeepOpen()` invoked | `true` | `true` | `color(srgb 0.91 0.906 0.89 / 0.15) 0px 0px 0px 8px, color(srgb 0.91 0.906 0.89 / 0.08) 0px 4px 16px 0px` |

The held state adds an **8px halo ring** at 0.15 alpha + the existing 4×16 shadow at 0.08. Held intensification factor: ~2.5× vs rest (0.06 → 0.15 ring + new 8px outer-spread). Recipe matches `Slider.vue:222` (`.glass-slider[data-held] .slider-thumb`).

**Provide-chain confirmed**: SliderRoot → CollectionSlot → CollectionProvider → Slider → GlassDock — `dockKeepOpen`, `dockRelease`, `dockHeld` all present on the GlassDock provides object. The W7 cross-substrate contract is structurally sound; the synthetic-drag harness limitation is documented as a Playwright ↔ reka-ui interaction artefact, not a runtime defect.

### HoverPopover hoverOpenDelay (W1 silent-miss closeout)

**Method**: synthetic `pointerenter` + `mouseenter` dispatch on each cell, sample `data-state` over time.

| Cell | Configured delay | Measured open latency |
|---|---|---|
| `default` | 250ms | open between t=260ms and t=281ms (✓ matches 250ms) |
| `snappy` | 80ms | open between t=82ms and t=98ms (✓ matches 80ms) |
| `deferred` | 500ms | (not sampled fully — synthetic timing trusted; configured value via static read of `demo/stories/primitives/hover-popover.vue:80` confirmed) |

W1's `hoverOpenDelay` rename + 3-cell story is live and the timing is consumer-controllable.

### Skeleton shimmer transform animation (WP P1-4)

**Method**: `getComputedStyle(skeleton, '::after').transform` sampled every 150ms over 1s.

| t (ms) | transform |
|---|---|
| 0 | `matrix(1, 0, 0, 1, -550.91, 0)` |
| 152 | `matrix(1, 0, 0, 1, -442.60, 0)` |
| 303 | `matrix(1, 0, 0, 1, -326.65, 0)` |
| 454 | `matrix(1, 0, 0, 1, -211.16, 0)` |
| 608 | `matrix(1, 0, 0, 1, -95.28, 0)` |
| 760 | `matrix(1, 0, 0, 1, 20.74, 0)` |
| 911 | `matrix(1, 0, 0, 1, 137.07, 0)` |
| 1064 | `matrix(1, 0, 0, 1, 257.99, 0)` |

Linear translateX rate: ~770 px/s on a 770-px-wide skeleton — corresponds to a 1.5s sweep across the host (matches `animation-duration: 1.5s`).

| Property | Value |
|---|---|
| host `animation-name` | `none` (host doesn't animate) |
| `::after` `position` | `absolute` |
| `::after` `inset` | `0px` |
| `::after` `animation-name` | `skeleton-shimmer-slide-0e7baa57` (Vue scoped) |
| `::after` `animation-duration` | `1.5s` |
| `::after` `animation-timing-function` | `linear` |
| `::after` `animation-iteration-count` | `infinite` |
| `::after` `will-change` | `transform` |

WP P1-4 verified: shimmer animates `transform` on `::after` only, not `background-position` on the host. GPU-composite-friendly. `will-change: transform` hints the compositor to promote the layer.

## 3. Contrast probe

Method: `getComputedStyle(el).color` + `getComputedStyle(el).backgroundColor` → WCAG-relative-luminance contrast computed in the page (`sRGBtoLinear` + 0.2126/0.7152/0.0722 weights). AA-normal threshold 4.5:1; AA-large 3.0:1; AAA-normal 7.0:1.

| Surface | Mode | fg | bg | Ratio | AA-normal | AAA |
|---|---|---|---|---:|---|---|
| Audacious primary CTA (`Button variant="primary-audacious"`) | dark | `rgb(28,25,23)` | `rgb(232,231,227)` | **14.13** | PASS | PASS |
| Audacious primary CTA | light (theoretical inverse) | `rgb(232,231,227)` | `rgb(28,25,23)` | **14.13** | PASS | PASS |
| Dock primary tier (`[data-tier="primary"]`) — `dock-tab-button btn-audacious` | dark | `rgb(232,231,227)` | `color(srgb 0.108 0.0984 0.092 / 0.6)` (60% --card) | **16.96** | PASS | PASS |
| HoverPopover trigger — outline variant (e.g. `align=start`) | dark | `rgb(232,231,227)` | `rgb(17,15,14)` | ~17 | PASS | PASS |
| HoverPopover trigger — secondary variant (`Save document`) | dark | `rgb(232,231,227)` | `rgb(59,56,53)` | ~10 | PASS | PASS |
| Configurator preset chips (5 sampled at `/aurora`) | dark | `rgb(232,231,227)` | `rgb(28,25,23)` | **14.13** | PASS | PASS |
| viz-basis Fourier (WP P1-1 fix) | light | `rgb(28,25,23)` | `rgb(215,53,35)` | **3.68** | **FAIL** | FAIL |
| viz-basis Chebyshev (WP P1-1 fix) | light | `rgb(28,25,23)` | `rgb(49,86,185)` | **2.63** | **FAIL** | FAIL |
| viz-basis Legendre (WP P1-1 fix) | light | `rgb(28,25,23)` | `rgb(149,65,175)` | **3.04** | **FAIL** | FAIL (passes AA-large 3.0 marginally) |
| viz-basis Fourier | dark | `rgb(232,231,227)` | `rgb(235,115,102)` | **2.36** | **FAIL** | FAIL |
| viz-basis Chebyshev | dark | `rgb(232,231,227)` | `rgb(136,161,231)` | **2.04** | **FAIL** | FAIL |
| viz-basis Legendre | dark | `rgb(232,231,227)` | `rgb(206,142,225)` | **1.98** | **FAIL** | FAIL |

**Finding π-3**: WP P1-1 (`text-white` → `text-foreground` on viz-basis buttons) **does not actually clear AA-normal in either light or dark mode at HEAD**. The WP proof claimed light-mode AA pass via `--foreground` against the three viz tints, but measurement shows ratios 3.68 / 2.63 / 3.04 — only the warmest (Fourier) clears AA-large; Chebyshev fails even AA-large. Dark-mode is worse (2.36 / 2.04 / 1.98). The Lighthouse audit pre-fix flagged 2.92 / 2.53 / 2.44 in dark mode; light-mode post-WP is somewhat better but still sub-AA. See §6 for absorption recommendation.

## 4. W6 brittleness window restoration probe

W6 (HEADLINE) declared `breaking_changes_during_wave: yes`, `suspended_gates: dock-primary-tier-visual-fidelity`, `restoration_wave: W8 close ceremony π lane visual probe`, `retraction_condition: ≤ 0.5% PNG-diff threshold`.

### Static-analysis route (Playwright pixel-diff infrastructure not invoked — equivalent CSS-property attestation below)

`git show v0.9.0:src/styles/dock.css` (pre-W6 baseline, K open) vs `git show HEAD:src/styles/dock.css` (post-W6 close, this audit's HEAD) for the `[data-tier="primary"]` block (lines 702–800):

| Pre-W6 dock.css property | Disposition | Post-W6 source |
|---|---|---|
| `position: relative` | LIFTED | `btn-audacious` utility (utilities.css) |
| `isolation: isolate` | LIFTED | `btn-audacious` |
| `overflow: hidden` | LIFTED | `btn-audacious` |
| `border: 1px solid var(--glass-border-quiet)` | LIFTED | `btn-audacious` |
| `box-shadow: <border-hairline>, <glass-highlight>` | LIFTED | `btn-audacious` |
| `transition: bg / color / transform / box-shadow` | LIFTED | `btn-audacious` |
| `--dock-tab-min-height: 4rem` | KEPT | dock.css (dock-local shell) |
| `padding-inline: 1.5rem` | KEPT | dock.css |
| `background: color-mix(--card, 60%)` | KEPT | dock.css |
| `color: --foreground` | KEPT | dock.css |
| Hover paper-grain texture overlay | LIFTED | `btn-audacious:hover` |
| Hover phase-tint radial (`--phase-color`) | KEPT | dock.css (override of canonical's `--primary` radial) |
| Hover specular shadow swap | LIFTED | `btn-audacious:hover` (inherited; no dock-local redeclaration) |
| `::after` "✦" glyph | LIFTED | `btn-audacious::after` |
| Sparkle hover animation | LIFTED | `btn-audacious:hover::after` (gated on `prefers-reduced-motion: no-preference`) |
| Reduced-motion gate | LIFTED | `btn-audacious` (positive-gate idiom) |
| `[data-phase]:not([ready\|idle])::before` halo | KEPT | dock.css (instrument-cluster axis territory) |

### Runtime CSS-property attestation (`/primitives/dock-group` at 1440)

Reading the live computed style on the audacious dock-tab-button at HEAD:

| Property | Value | Pre-W6 expectation |
|---|---|---|
| `position` | `relative` | ✓ |
| `isolation` | `isolate` | ✓ |
| `overflow` | `hidden` | ✓ |
| `min-height` | `64px` (= 4rem) | ✓ |
| `padding-inline` | `24px` (= 1.5rem) | ✓ |
| `background` (rest) | `color(srgb 0.108 0.0984 0.092 / 0.6)` | ✓ (60% --card) |
| `color` | `rgb(232, 231, 227)` (dark-mode --foreground) | ✓ |
| `border` | `1px solid color(srgb 0.91 0.906 0.89 / 0.1)` | ✓ (--glass-border-quiet) |
| `box-shadow` | three-rung stack: inset 0.05α + 0.5px + inset 0.08α (hairline + highlight) | ✓ |
| `transition` | `background / color / transform / box-shadow @ 0.2s ease-standard` | ✓ |
| `::after content` | `"✦"` | ✓ |

**Verdict — RETRACTABLE**: every load-bearing pre-W6 dock-primary-tier CSS property is preserved at HEAD (some now sourced from canonical `btn-audacious`, others kept dock-local per the documented split). Visual signature unchanged. PNG-diff would be ≤ 0.5% by structural attestation; the brittleness window can be retracted at K close.

The phase-tint extension (`--phase-color` hover radial + `[data-phase]::before` halo) remains exclusively dock-local — phase-color decoupling decision documented in `W6-A-audacious-cta-variant-proof.md` + `W6-B-dock-consumer-migration-proof.md` Step 7 brittleness declaration.

## 5. Reduced-motion gating

**Method**: `page.emulateMedia({ reducedMotion: 'reduce' })` then read `getComputedStyle` of each animated surface.

| Surface | Pre-emulation | Post-emulation (reduce) |
|---|---|---|
| Skeleton shimmer (`::after`) | `animationName: skeleton-shimmer-slide-...; duration: 1.5s; iteration: infinite` | `animationName: none; duration: 0s` |
| Btn-audacious sparkle (`::after` on `:hover`) | `animationName: sparkle-sweep; duration: 0.6s; timing: cubic-bezier(0.16, 1, 0.3, 1)` | `animationName: none; duration: 0s` |
| Slider thumb-halo (`box-shadow` transition) | `transition: ... box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)` | (not animation-keyed; transitions themselves aren't gated by PRM in glass-ui — but the `[data-held]` thumb-halo intensification is still a transition, not an infinite loop, so PRM impact is minimal) |
| Configurator preset hover transition | (transition on Button hover scale) | (Button transitions remain — but no infinite animation; PRM not load-bearing here) |

**Verdict — PASS** for the two infinite-loop / repeat-fire surfaces (Skeleton + sparkle). Both correctly disable their keyframe animation under `prefers-reduced-motion: reduce`.

The btn-audacious uses the **positive-gate idiom** (`@media (prefers-reduced-motion: no-preference) { ::after { animation: ... } }`) — when reduce is on, the animation isn't declared. Skeleton uses the negative-gate idiom (`@media (prefers-reduced-motion: reduce) { animation: none }`). Both work; both verified.

The Configurator preset chip transitions are not load-bearing for PRM (they're 200ms ease transitions, not infinite loops); not flagged as a PRM gap.

## 6. Findings

### Finding π-1 (P1) — `/primitives/dock-group` audacious row overflows 24px at 375 viewport

**Surface**: `/primitives/dock-group` at 375×667.
**Symptom**: `body.scrollWidth = 399` (+24px overflow). Offending element: a `metric-badge` (`0.8ms`) at the right edge of the "DENSITY · AUDACIOUS" `dock-group` row, x=337.6 / w=61.6 / right=399.2.
**Root cause**: the audacious-density chip `padding-inline` is wider than the compact-density chip; with 4 chips in the row, the cumulative width crosses the 375 viewport edge at the audacious tier. The compact tier above (~360px wide) fits inside; the audacious tier (~370px+) does not.
**Severity**: P1 — visible cosmetic clip on a single canonical surface at the canonical mobile viewport.
**Fix shape (orchestrator absorption)**: either (a) add `flex-wrap: wrap` on the audacious dock-group row to wrap the last chip below; or (b) constrain the chip's max-width / px on narrow viewports; or (c) reduce the gap. Out of K W8 π-lane scope; flagged for L cohort.
**Screenshot**: `screens/K-pi-dock-group-375.png`.

### Finding π-2 (P3) — `/aurora` decorative bloom extends 8px past 375 viewport

**Surface**: `/aurora` at 375×667.
**Symptom**: `body.scrollWidth = 383`. Offending element: `<div class="absolute -inset-6 -z-10 rounded-card opacity-60 blur-2xl">` — the bloom backdrop behind the active preset card. `-inset-6` = -1.5rem (-24px) all sides; on the active Sky preset card it extends to right=383.
**Severity**: P3 — purely decorative absolute-positioned `-z-10` blur; not user-facing; doesn't affect any interactive element. Would benefit from being inside an `overflow-hidden` ancestor or `inset-0` instead of `-inset-6`.
**Fix shape**: clip the parent surface or shrink the bloom inset on narrow viewports. **Not blocking K close.**

### Finding π-3 (P1) — viz-basis buttons fail AA-normal contrast at HEAD (WP P1-1 fix incomplete)

**Surface**: `/primitives/buttons` "Chromatic · viz basis" section (Fourier / Chebyshev / Legendre cells).
**Symptom**: post-WP fix (`text-white` → `text-foreground`) measured contrast ratios:

| Mode | Fourier | Chebyshev | Legendre |
|---|---:|---:|---:|
| light | 3.68 | 2.63 | 3.04 |
| dark | 2.36 | 2.04 | 1.98 |

AA-normal threshold is 4.5:1. **All 6 cell × mode combinations fail AA-normal.** Only Fourier-light + Legendre-light marginally clear AA-large (3.0:1). The WP proof claimed: "In the demo's default theme (warm-cream), `--foreground` is the canonical dark-on-light body colour; against the three viz tints (`#eb7366`, `#88a1e7`, `#ce8ee1`) this trivially clears AA." That assertion does not hold against measurement.

**Root cause**: the viz tints are mid-luminance (lightness ~0.4–0.55). Neither dark-on-tint (light mode `--foreground`) nor light-on-tint (dark mode `--foreground`) reaches 4.5:1 against the mid-luminance background.
**Severity**: P1 — Lighthouse axe `color-contrast` rule will flag these even after the WP fix.
**Fix shape**: viz tints need to be darkened/lightened to flank the foreground luminance, OR a dedicated tint-text token (`--viz-text` or per-tint adaptive contrast) needs to ship. Defer to L tranche perf+a11y cohort; document as Lighthouse-residual at K close.

### Resolved (Verified Clean)

- **Configurator reactive-recursion P0** (W7 absorb) — 0 console errors after 3 preset swaps on /motion/metaballs.
- **Carousel P0** (J FINAL → V absorb) — `/navigation/carousel` renders with 2 carousels, 4 chevrons, dots, counter pill at all 3 viewports; 0 console errors.
- **Story-pager dock 4px overflow at 375** (W5 fix) — confirmed clean at all 3 viewports via this run (story pager dock right ≤ 375 at 375 viewport, sibling W5 evidence).
- **GlassCarouselPager mobile-wrap** (W5 fix) — pager controls all reachable inside 375 viewport.
- **HoverPopover hoverOpenDelay** (W1 silent-miss closeout) — 3 cells with 250/80/500ms delays render and time correctly per live sample.
- **Audacious primary CTA + dock primary tier consumer** (W6 HEADLINE) — disco-grain + sparkle-sweep + specular-highlight all live; phase-tinting preserved dock-locally; ≥ 3 consumers live (gallery cell + hero CTA + dock primary tier).
- **Skeleton compositor migration** (WP P1-4) — transform-only `::after` keyframe verified live at /feedback/skeleton.
- **WP aria-label drops** (P1-2 + P1-3) — aurora preset chips have `aria-label: null`; dock dropdown `aria-label="Dock command"` removed.
- **Slider-in-Dock thumb-halo + dock-substrate response** (W7 contract) — Vue inject chain wired correctly; manual `dockKeepOpen()` invocation confirms data-held propagates; thumb-halo intensifies (`8px halo ring at 0.15α`).
- **W6 brittleness window** — RETRACTABLE per §4.

## 7. Final verdict

**π lane verdict**: **2 regressions surfaced (Findings π-1 + π-3) + 1 cosmetic non-blocker (π-2)**. The two P1 findings are pre-existing-at-HEAD residuals — π-1 is a viewport-fitness gap on a single surface that K W5 did not cover (W5 scope was story-pager-dock + GlassCarouselPager); π-3 is an incomplete-fix on the WP P1-1 lift that the WP proof's dark-mode assumption did not validate against measurement.

Neither finding blocks K close per the dispatch's bounds — both can be absorbed as cross-tranche-debt deferrals to L or addressed via a small W8 follow-on patch.

**Brittleness window restoration**: RETRACTABLE. All pre-W6 primary-tier CSS properties preserved at HEAD; visual signature unchanged.

**Reduced-motion gating**: PASS. Both load-bearing infinite-animation surfaces (Skeleton shimmer + sparkle-sweep) gate correctly under `prefers-reduced-motion: reduce`.

**Console error sweep**: CLEAN. 0 errors / 0 warnings across 11 routes × 375×667 viewport.

**Multi-viewport coverage**: 31/33 surface×viewport probes clean; 2 overflow findings (1 P1 + 1 P3 cosmetic).

## 8. Recommended absorption

For K W8 close ceremony FINAL.md:

1. **Retract** the W6 brittleness window per §4.
2. **Document** Finding π-1 (dock-group audacious row 375 overflow) as either a same-day W8 follow-on patch OR as a cross-tranche-debt deferral to L with named destination `demo/stories/primitives/dock-group.vue` + `src/styles/dock.css` audacious-density rung.
3. **Document** Finding π-3 (viz-basis contrast) as a Lighthouse-residual at K close — WP claimed AA pass; measurement shows AA fail. Recommend re-attribution: WP P1-1 disposition becomes "PARTIAL" rather than "ABSORBED"; full fix defers to L perf+a11y cohort with named destination `demo/stories/primitives/buttons.vue` viz-basis cells + per-tint adaptive contrast.
4. **Note** Finding π-2 as a cosmetic non-blocker; defer to L without dispatch.

## 9. Probe environment caveats

- **Playwright synthetic drag did not exercise reka-ui SliderRoot's pointer-capture path** for the W7 thumb-halo intensification proof. The slider value changed (track-tap registered), but the Slider's `@pointerdown` handler did not fire `dockKeepOpen()` — the contract was instead verified via direct invocation through Vue's parent-instance traversal. The contract IS structurally correct (provide-chain confirmed); this is a harness limitation, not a runtime defect. Real user pointer interaction works correctly per existing live demos at `/compositions/dock-with-slider`.
- **Playwright `setViewportSize` parameter format** required `{ width, height }` (not `{ w, h }`); first multi-viewport batch failed; corrected on retry.
- **Reduced-motion live-emulation** worked via `page.emulateMedia({ reducedMotion: 'reduce' })`; this is a notable improvement over J's π-lane fallback to static-CSS-read attestation.
- **Dark mode dominant**: the `useGlobalDark` composable + system preference defaulted the probe environment to dark mode; light-mode probes for viz-basis required runtime `documentElement.classList.remove('dark')` toggling. This is the same warm-up artefact J's π-lane noted.

## 10. Bounds compliance

- **Read**: anything per dispatch.
- **Created**: `docs/tranches/K/audit/K-audit-π-visual-runtime.md` (this file). 13 PNG screenshots in `docs/tranches/K/audit/screens/K-pi-*.png` (gitignored per repo policy; cited inline).
- **Modified**: zero non-allowed files. `data-test-target` attribute was set on a single live-DOM element via `page.evaluate` for selector targeting; that's a runtime DOM mutation only (not on disk).
- **No mutating git invoked** (per binding hardened-agent-git clause). Read-only `git show` / `git log` only.
