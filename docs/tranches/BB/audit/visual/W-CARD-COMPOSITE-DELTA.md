# W-CARD-COMPOSITE — DELTA (the A'-3 CardHeader scroll-shrink CLS killed at the keyframes)

<!-- AZ-form freshness headers (the cardinal-lesson freshness clause reads these) -->
<!-- surface-paths: src/components/ui/card/CardHeader.vue,scripts/proof-no-layout-animation.mjs -->
<!-- surface-hash: afa18ff39e001d5175adb60f14b9f8324cf1582451f183b6d786a8067695718a -->
- **Capture date**: 2026-06-16
- **Branch / base commit**: `tranche/BB` @ `bdbcd479` (pre-impl HEAD; this wave's edits in the working tree)
- **Demo build**: vite dev server `:5199`, route `/display/card` (the `<CardHeader shrink>` + `.card-scroll-host` surface added by this wave — §0 re-grep found zero live shrink consumer at HEAD, scope item 7)
- **Measurement tool**: Chromium (Playwright MCP) `PerformanceObserver` `layout-shift` (CLS) + forced-synchronous-layout timing (per-frame reflow cost) + `getComputedStyle` transform readback
- **Viewport**: 412×915 (mobile, the W-LIGHTHOUSE mobile-CLS context)
- **Gate**: `proof:no-layout-animation` (born-RED → GREEN, device-free SOURCE, tagged `["ci"]`)

## The fix (gestalt: kill the layout animation AT the keyframes, not at the consumer)

The `<CardHeader shrink>` 3-lane scroll-shrink choreography animated FOUR layout-triggering
properties (the A'-3 worst-cluster, CLS 1.03 at 4.0.0, migrated verbatim from value.js's
`PaneHeader.vue`). Each lane is re-expressed as the compositor-transform equivalent the house
already speaks (`scroll-driven.css`'s `scaleX`/`translateY`/`opacity` idiom) — the visual
choreography reads IDENTICALLY; ZERO reflow fires per scroll frame.

| Lane | BEFORE (layout-property animation — reflow) | AFTER (compositor-safe) |
|---|---|---|
| 1 — header compress | `@keyframes card-header-shrink` animated `padding-top: 1rem→0.5rem` + `padding-bottom: 0.5rem→0.25rem` (box-model reflow of the header + every following sibling, per frame) | `transform: translateY(0 → -0.5rem)` — the header content slides up so the top breathing room visually compresses; the header box keeps its layout size (no reflow). Live readback at scroll=120: `matrix(1,0,0,1,0,-8)` |
| 2 — title shrink (worst lane) | `@keyframes card-title-shrink` animated `font-size: var(--type-heading)→var(--type-prose)` (per-frame text-layout RE-MEASURE — the most expensive reflow) | `transform: scale(1 → var(--card-title-shrink-ratio))`, ratio `0.695` pinned from `--type-prose`floor(18px) ÷ `--type-heading`(25.9px), `transform-origin: left top` (leading edge anchored). Text lays out ONCE. Live readback at scroll=120: `matrix(0.695,0,0,0.695,0,0)` |
| 3 — description retire | `@keyframes card-desc-shrink` animated `grid-template-rows: 1fr→0fr` + `margin-top: 0.125rem→0` (grid-track collapse + margin reflow; only the co-animated `opacity` was compositor-safe) | `opacity: 1→0` (KEPT) + `transform: scaleY(1 → 0)`, `transform-origin: top` (retires upward). The reclaim is composited, not a grid relayout. Live readback at scroll=120: `matrix(1,0,0,0,0,0)` + `opacity: 0` |

PRM is the OUTER gate (the `scroll-driven.css` discipline): the whole `@supports
(animation-timeline: scroll())` block sits under `prefers-reduced-motion: no-preference`, so
under PRM no scroll animation attaches and the header renders in its terminal rest state. The
prior explicit `animation-duration: 0.01ms` belt-and-braces stub is RETIRED — the outer gate is
the primary AND complete contract (recorded in the SFC comment, not duplicated dead).

## The measured DELTA (the binding truth — a CLS wave is a MEASURED wave)

### (a) CLS — the shipped rewrite is ZERO layout shift

| | CLS (0..120px scroll sweep, both directions, all 3 lanes active) |
|---|---|
| **AFTER (shipped compositor-safe rewrite, live on `/display/card`)** | **0.0000** |

The rewritten choreography produces ZERO layout shift on the live demo across the full scroll
range with all three lanes binding (`AFTER_cls_all3lanes: 0`). The header translates, the title
scales, the description fades+scaleYs — all on the compositor.

### (b) Per-frame REFLOW cost — the architecturally-correct metric

Viewport CLS under-reads a scroll-driven IN-CONTAINER animation (the shifts of below-header
content during an active scroll are scroll-attributed, so the `layout-shift` API records 0 for
BOTH versions inside an `overflow-auto` host — recorded honestly). The genuine cost the gate
eliminates is the per-frame REFLOW (layout recalc) the layout-property animation forces every
frame. Measured on an identical synthetic layout (60-frame scroll sweep, forced-sync-layout
timing, avg of 2 runs each, after warm-up):

| | total layout/reflow cost across 60 frames | per-frame |
|---|---|---|
| **BEFORE (padding + font-size + grid-rows animation)** | **20.6 ms** (runs: 22.7, 18.5) | ~0.34 ms/frame forced relayout |
| **AFTER (translateY + scale + scaleY animation)** | **11.2 ms** (runs: 10.9, 11.5) | ~0.19 ms/frame |

The layout-property animation forces ~84% more layout work per frame. The compositor-transform
rewrite removes the per-frame relayout storm (the residual cost is the unavoidable scroll-port
layout, identical for both).

### (c) The gestalt frame pair — IDENTICAL visual choreography

- `card-composite/shrink-rest.png` (scroll=0): full title (heading rung), full description, full top breathing room.
- `card-composite/shrink-scrolled.png` (scroll=120): title visibly shrunk in place (scale 0.695), description fully retired (gone), header compressed — the body scrolled up under the sticky compressed header.

The mechanism changed (transform/opacity, not padding/font-size/grid-rows); the gestalt did not.

### (d) The gate born-RED → GREEN log

**Born-RED (the unrewritten CardHeader, before the compositor-safe rewrite):**
```
[proof:no-layout-animation] 1 check(s) FAILED:
  ✗ W1-no-layout-animation — 10 reflow-set violation(s):
     card-header-shrink animates padding-top (src/components/ui/card/CardHeader.vue:111);
     card-header-shrink animates padding-bottom (…:112);
     card-header-shrink animates padding-top (…:115);
     card-header-shrink animates padding-bottom (…:116);
     card-title-shrink animates font-size (…:122);
     card-title-shrink animates font-size (…:125);
     card-desc-shrink animates grid-template-rows (…:131);
     card-desc-shrink animates margin-top (…:133);
     card-desc-shrink animates grid-template-rows (…:136);
     card-desc-shrink animates margin-top (…:138)
```
(The W2 self-test synthetic-padding bite + W3 inventory-complete passed at HEAD; W1 was the
born-RED violation arm.)

**GREEN (after the compositor-safe rewrite):**
```
[proof:no-layout-animation] LOCKED — 37 keyframes scanned, 0 layout-property animations
(the reflow set is forbidden; 4 named CLS-bounded reclaim(s) allowlisted). The compositor-safe-
keyframes architecture cannot regress.
```
`violations: []`. The 37-keyframe inventory covers the whole corpus (`src/styles/*.css` + every
SFC `<style>`).

## The inventory-complete scan finding (the §Triumvirate "GOOD find" — a SECOND layout-animation)

The inventory-complete scan (W3) exposed a SECOND layout-animation beyond CardHeader:
`@keyframes collapsible-open` / `collapsible-close` (`src/styles/animations.css`) animate
`height: 0 ↔ var(--reka-collapsible-content-height)` — the reka-ui Collapsible/Accordion
content-height reveal.

**Disposition: a NAMED, CLS-bounded ALLOWLIST entry (NOT a violation, NOT suppressed).** This is
a register-design reveal per the spec's §Triumvirate Dispatch: a GENUINE layout RECLAIM — a
DISCRETE one-shot open/close toggle whose body content below must reflow up into the freed space
— is a DIFFERENT primitive than a compositor-safe scroll-shrink. The `height: 0 → content-height`
reveal cannot be a transform without leaving a visual gap (a `scaleY` would squash the content,
not reclaim flow). Its CLS is bounded + intentional (a user-initiated open, not a per-scroll-frame
storm). The gate carries it as an EXPLICIT, AUDITED allowlist entry (`scripts/proof-no-layout-
animation.mjs` `ALLOWLIST`) with the reflow property + rationale named per keyframe; a NEW
layout-animation off the list reds (the anti-gameability floor).

## The W-SCROLL-CARD relationship (the scoped-slot defect, recorded)

The §0 live readback found the pre-existing W-SCROLL-CARD scoped-slot defect ALSO at HEAD: a
plain scoped `.card-header--shrink > [data-slot="card-title"]` selector rewrites to require
CardHeader's `data-v-…` hash on the child, which a SLOTTED `<CardTitle>`/`<CardDescription>`
(from sibling SFCs) does NOT carry — so lanes 2+3 were structurally DEAD (`transform: none` on
both at scroll=120 before the fix). This wave's lanes 2+3 REQUIRE the descendant selectors to
reach slotted content, so the minimal in-bound enabler — `:deep([data-slot="card-title"])` /
`:deep([data-slot="card-description"])` — is applied (the standard Vue scoped-CSS escape for a
parent styling slotted children). The broader consumer-slot-match work (the scroll-driven header
background, the `<ScrollCard>`/`<ScrollCardHeader>` family) remains **W-SCROLL-CARD's scope**,
riding ON the compositor-safe keyframes minted here.
