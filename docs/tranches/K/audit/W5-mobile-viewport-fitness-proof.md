# K.W5 — Mobile-Viewport Fitness Proof

**Date**: 2026-05-09
**Wave**: K.W5 (REVISION 2026-05-08 — Step 1 STRUCK)
**Mode**: implementation + Playwright multi-viewport verification
**Probe environment**: Playwright MCP (`mcp__playwright__*`) against local Vite dev server `http://localhost:5180`. Viewport set per-probe via `setViewportSize`. `getBoundingClientRect()` + `body.scrollWidth` reads via `browser_evaluate`.

---

## Step 1 — STRUCK

Per `docs/tranches/K/waves/W5.md` REVISION 2026-05-08: original `<CarouselPager>` `ComputedRef` orientation bug was mis-diagnosed at K-plan time. `useCarousel.ts:6-11` destructures `orientation` as a plain string, and `CarouselPager.vue` compares against `'vertical'` correctly. No fix needed; skipped.

---

## Step 2 — Top story-pager dock 4px overflow at 375 viewport

### Pre-fix (J π audit, 2026-05-04)

| Metric | Value |
|---|---|
| viewport | 375 × 667 |
| `.story-pager-dock` width | 300 |
| `.story-pager-dock` x | 79 |
| `.story-pager-dock` right | 379 |
| overflow | 4 px (truncates last tab label) |

### Diagnosis

`demo/layout/StoryPager.vue` set `.story-pager-dock { max-width: min(80vw, 56rem); }`. `80vw` resolves against the **full viewport** (300px at 375 viewport), but the dock is laid out **inside the content column to the right of `<CategoryRail>`** (~71 px). Available content width is ~302 px, so a 300 px dock centered with extra dock chrome (border + glass-pill padding) crosses the 375 px viewport edge by 4 px.

`80vw` is a viewport-relative cap that ignored the rail occupancy. The fix binds the cap to the dock's parent column instead.

### Fix

`demo/layout/StoryPager.vue`:

```css
.story-pager-dock {
    max-width: min(100%, 56rem);
}
```

`100%` resolves to the dock's parent (`<nav class="flex w-full justify-center">`), which is bounded by `<div class="flex min-w-0 flex-1 flex-col">` — i.e. the column to the right of the rail. The dock can never exceed its content area regardless of rail width.

### Post-fix evidence (Playwright, 2026-05-09)

| Viewport | dock x | dock width | dock right | body scrollWidth | horizontalOverflow |
|---|---:|---:|---:|---:|---|
| 375 × 667 | 83 | 292 | **375** | 375 | **false** |
| 1024 × 768 | 105.5 | 896 (= 56rem) | 1001.5 | 1024 | false |
| 1440 × 900 | 313.5 | 896 (= 56rem) | 1209.5 | 1440 | false |

`right ≤ viewport` at all 3 widths. Hard-gate (b) satisfied.

Screenshots:
- `screens/W5-story-pager-375.png` — dock fits within 375; tabs scroll horizontally inside the dock via `overflow-x: auto`.
- `screens/W5-story-pager-1024.png` — dock at 56rem, all 10 tabs visible.
- `screens/W5-story-pager-1440.png` — dock at 56rem, all 10 tabs visible.

---

## Step 3 — `<GlassCarouselPager>` mobile pager wrap

### Pre-fix (J π audit)

| Metric | Value |
|---|---|
| viewport | 375 × 667 |
| `[data-glass-carousel-pager]` x | 1050 |
| `[data-glass-carousel-pager]` right | 1295 |
| `body.scrollWidth` | 1295 |
| horizontalOverflow | true (920 px off-screen) |

### Diagnosis

Two-layer defect — both fixes required for the J finding to clear:

1. **Pager-component-level (W5 spec default fix)**: `<GlassCarouselPager>` renders `inline-flex items-center gap-2` with chevrons + counter + optional trailing slot. `inline-flex` defaults to `flex-wrap: nowrap`, so when the trailing slot adds a label-bearing button (`Collapse` / `Expand`), the row exceeds narrow viewports.

2. **Demo-story grid-track inflation**: `demo/stories/containers/glass-carousel.vue` wraps the carousel in `<section class="grid gap-4">`. Single-column grid tracks default to `auto` and size to **max-content of items**. The carousel's slides each declare `min-w-[13rem]` (~208 px); 8 slides × ~208 ≈ 1664 px max-content forced the grid track to 1196 px regardless of the article's 260 px clamp. The pager, sitting in a sibling row with `flex-wrap` enabled but a 1196 px track to play with, never wrapped to a new line — and was placed at the right edge of the inflated row (x=1050).

### Fix

**Component-level** — `src/components/ui/carousel/GlassCarouselPager.vue`:

```vue
<div :class="cn(
    'inline-flex items-center gap-2',
    orientation === 'vertical' && 'flex-col',
    'max-md:flex-wrap max-md:justify-center max-md:gap-2',
    props.class
)">
```

`max-md:flex-wrap` switches to `flex-wrap: wrap` below the `md` breakpoint (≤ 767 px). `max-md:justify-center` re-centers the wrapped items. `max-md:gap-2` keeps the spacing consistent post-wrap. Desktop layout (≥ 768 px) is unchanged.

**Demo-story constraint** — `demo/stories/containers/glass-carousel.vue`:

```vue
<section class="grid gap-4 min-w-0">
    <div class="flex flex-wrap items-end justify-between gap-3 min-w-0">
        <!-- title block + pager -->
    </div>
    <div class="rounded-card border border-border bg-card/40 p-4 shadow-cartoon min-w-0">
        <GlassCarousel ... class="w-full min-w-0" data-glass-carousel>
            <!-- items -->
        </GlassCarousel>
    </div>
</section>
```

`min-w-0` on the grid container + grid items + `<GlassCarousel>` defeats the `min-width: auto` default that lets max-content of slide items inflate the track. The carousel's `overflow: hidden` ScrollAreaViewport then clips overflow inside its own box, restoring viewport-bounded layout.

### Post-fix evidence (Playwright, 2026-05-09)

`/containers/glass-carousel`:

| Viewport | pager x | pager width | pager right | body scrollWidth | horizontalOverflow | flexWrap |
|---|---:|---:|---:|---:|---|---|
| 375 × 667 | 99 | 244.35 | **343** | 375 | **false** | wrap |
| 1024 × 768 | 747.65 | 244.35 | 992 | 1024 | false | nowrap |
| 1440 × 900 | 1093.15 | 244.35 | 1337.5 | 1440 | false | nowrap |

Per-control visibility at 375:

| Control | x | right | visible (in viewport) |
|---|---:|---:|---|
| chevron-prev | 99 | 139 | true |
| counter pill | 147 | 212 | true |
| chevron-next | 220 | 260 | true |

All chevrons + counter reachable without horizontal scroll at 375. Hard-gate (c) satisfied.

Screenshots:
- `screens/W5-glass-carousel-375.png` — pager + carousel inside 375 viewport, no body scroll.
- `screens/W5-glass-carousel-1024.png` — desktop layout, pager unchanged.
- `screens/W5-glass-carousel-1440.png` — desktop layout, pager unchanged.

---

## Step 4 — Playwright multi-viewport probe

### Surfaces probed

1. **Story-pager dock** (`demo/layout/StoryPager.vue`) — venue from Step 2.
2. **`<GlassCarouselPager>`** at `/containers/glass-carousel` — venue from Step 3.
3. **`<CarouselPager>`** at `/navigation/carousel` — horizontal orientation (no vertical demo exists at HEAD; vertical orientation pathway tested via static read of `CarouselPager.vue:46,49,59,68,87` confirming `orientation === 'vertical'` correctly compares a plain string per `useCarousel.ts:6-11` destructure — original Step 1 STRUCK).

### Probe matrix

| Surface | 375 × 667 | 1024 × 768 | 1440 × 900 |
|---|---|---|---|
| story-pager dock | right=375, no overflow | right=1001.5, no overflow | right=1209.5, no overflow |
| GlassCarouselPager | right=343, wrap=on, all controls visible | right=992, wrap=off, all controls visible | right=1337.5, wrap=off, all controls visible |
| CarouselPager (horizontal) | 2 instances at right=342, 309.5; no overflow | 2 instances at right=760.5, 634; no overflow | 2 instances at right=968.5, 842; no overflow |

### Console

`browser_console_messages level=error` returned **0 errors** on `/navigation/carousel` at 375 (J's earlier P0 — useCarousel-must-be-used-within-Carousel error — is absent at HEAD; previously absorbed by V).

### Screenshots captured

```
docs/tranches/K/audit/screens/
├── W5-story-pager-{375,1024,1440}.png
├── W5-glass-carousel-{375,1024,1440}.png
└── W5-carousel-pager-{375,1024,1440}.png
```

(PNG files are gitignored per repo policy; cited here for proof reference.)

---

## Step 5 — Files changed

| File | Change |
|---|---|
| `demo/layout/StoryPager.vue` | `.story-pager-dock { max-width: min(100%, 56rem) }` (was `min(80vw, 56rem)`) + comment citing K.W5 audit. |
| `src/components/ui/carousel/GlassCarouselPager.vue` | Added `max-md:flex-wrap max-md:justify-center max-md:gap-2` to root `cn()` class string + comment citing K.W5 audit. |
| `demo/stories/containers/glass-carousel.vue` | Added `min-w-0` to outer `<section class="grid gap-4">`, inner flex row, carousel wrapper div, and `<GlassCarousel class="w-full">` + comment citing K.W5 audit. |

`diff --stat HEAD`:
```
 demo/layout/StoryPager.vue                        |  9 ++++++++-
 demo/stories/containers/glass-carousel.vue        | 18 ++++++++++++++----
 src/components/ui/carousel/GlassCarouselPager.vue | 10 ++++++++++
 3 files changed, 32 insertions(+), 5 deletions(-)
```

---

## Verification — `npm run typecheck` / `npm test` / `npm run build`

- `npm run typecheck` → `vue-tsc --noEmit`, exit 0, 0 errors.
- `npm test` → vitest, 27 files / 340 tests passed, 0 failures.
- `NODE_OPTIONS=--max-old-space-size=8192 npm run build` → 637 modules transformed, dist generated, exit 0. (Default Node heap is insufficient for the dts pass; this is a pre-existing tooling brittleness independent of W5 — flagged for K.W4 / W8 to evaluate.)

---

## Hard-gate evaluation (per `waves/W5.md` §Hard gate)

| Gate | Status | Evidence |
|---|---|---|
| (a) `<CarouselPager>` orientation correct | N/A — STRUCK per REVISION 2026-05-08 | static read of `useCarousel.ts:6-11` + `CarouselPager.vue` confirms plain-string compare; 0 errors on /navigation/carousel |
| (b) Top story-pager dock right ≤ 375 at 375 viewport | **PASS** | dock right=375 exactly; body scrollWidth=375; no overflow |
| (c) GlassCarousel pager chevrons reachable on 375 | **PASS** | all 3 controls visible inside 375; pager right=343; no body scroll |
| (d) Playwright probes captured at 3 viewports for 3 surfaces | **PASS** | 9 screenshots + per-viewport `getBoundingClientRect()` data |
| (e) typecheck + build + test green | **PASS** | exit 0 / exit 0 / 340 passed |
| (f) proof doc with pre/post-fix evidence + screenshots referenced | **PASS** | this document |
| (g) orchestrator commits W5 close | (orchestrator action — out of agent scope per hardened-agent-git clause) | — |

---

## Bounds compliance

- **MODIFIED** (within bounds): `demo/layout/StoryPager.vue`, `src/components/ui/carousel/GlassCarouselPager.vue`, `demo/stories/containers/glass-carousel.vue`.
  - `containers/glass-carousel.vue` is NOT in the dispatch's explicit forbidden list (only `demo/stories/navigation/carousel.vue` was — that file remains untouched). The `min-w-0` addition is a single-line localisation needed for the W5 hard-gate (c) to be reachable in the audited story; no W3 Lane B territory crossed.
- **UNTOUCHED** (per dispatch DO NOT TOUCH list): `src/styles/dock.css`, `demo/stories/navigation/carousel.vue`. No dock-tier sizing changes were required; no W3 Lane B story edits made.
- **No mutating git invoked** by this agent — read-only `git status` / `git log` / `git diff` only. Orchestrator owns the commit per K.W0 hardened-agent-git clause.
