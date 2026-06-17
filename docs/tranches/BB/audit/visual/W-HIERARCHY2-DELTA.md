# W-HIERARCHY2 — the StoryHeader cluster (reading-order inversion fixed) + the 3-stage GRAVITY entrance + the widened census + the content-side gutter — DELTA

**Freshness headers (AZ-form).**
- Capture date: 2026-06-17
- HEAD sha (pre-wave base): `2928da41` (BB.W-METAL-SHIMMER — the rim-seam chain complete)
- Branch: `tranche/BB`
- Dev box: darwin 25.4.0; demo vite dev server `:5174` (the `:5173` default in use); chromium-headless via playwright MCP
- Modes: light captured; dark + the full BOTH-mode π capture ride W-REFLECT3 (the binding live-pi; the AY W-LIVE1 LOCAL-ONLY split)

> The `proof:ba-gestalt` hierarchy-roster verdict FLIP (FAIL→PASS) is **W-REFLECT3's sole authority** (the single authorized verdict-flipper). This DELTA records the measure evidence; it writes NO PASS verdict cell.

---

## §0 RE-GROUND drift (recorded; the census was re-located at HEAD, not re-invented)

A sibling Batch-L wave **W-SCROLL-MOTION** landed BEFORE this wave and built the `.scroll-build` page-build entrance system (`src/styles/scroll-choreography.css`), whose comment EXPLICITLY reserves the reading-ORDER to this wave ("W-HIERARCHY2 owns the ORDER; this register threads the entrance ON it"). So the entrance INFRASTRUCTURE (the per-beat `--i` stagger, the no-overshoot hero beat) pre-existed; this wave threads the 3-stage cluster stagger ON the corrected order rather than forking a new entrance engine.

Two further drifts, both confirmed by live navigation:
1. **`/substrates/aurora` is a BESPOKE studio page** (`demo/stories/substrates/aurora.vue` does NOT compose `<StoryPage>` — it hand-authors its own layout). The chassis cluster therefore does NOT apply there. The 4-substrate-hero π set in the spec resolves to the **3 StoryPage-using substrate heroes** — `glass-material`, `constellation`, `fourier-field` (each confirmed `import StoryPage`). The aurora studio's own header is its bespoke craft. The π HERO_ROUTES + the DELTA record the corrected set.
2. **The compositions `text-heading` stragglers are `<h3>` CARD/CLAIM titles** (`empty-states.vue:138`, `hero.vue:203`, `auth-shell.vue:114`, `drawer-live-behind.vue:48` — e.g. `{{ claim.title }}`, "Welcome back"), NOT section `<h2>`s. Per the A4 rule (`text-heading`/`text-title` reserved for page-title-class moments) + the §Triumvirate census-scope trigger, these stay `text-heading` (the gate's off-canon scan is `<h2>`-only by design). Only the three genuine `<h2 text-heading>` section heads migrated.

---

## (a) A4-INVERSION — the reading-order inversion, fixed

### BEFORE (HEAD `2928da41`)
On a HERO page (`variant === 'hero'`) the chrome `<header>` rendered the mono eyebrow + the dense blurb, and SUPPRESSED only the chrome `<h1>` (the `:62` D1-4 guard). The giant display `<h1>` (`text-display-3`, ~67.8px) lived INSIDE the card BELOW that header. So the rendered order was:

```
eyebrow            (chrome header, top band)
blurb (3-5 lines)  (chrome header, top band)
  … mt-8 + card pad …
Glass Material     (display <h1>, in the card — SECOND)
```

A focal INVERSION (the descriptor before the name) AND two focal points stacked in the crowded top band.

### AFTER
ONE ordered `StoryHeader` cluster (`demo/stories/StoryHeader.vue`), rendered INSIDE `StoryHero` alongside the display `<h1>`, in correct reading order:

```
SUBSTRATES · GLASS MATERIAL   (eyebrow, quiet supporting tag — ABOVE)
Glass Material                (display <h1>, the single dominant focal)
The unified glass-material …  (blurb, subordinate rung — UNDER the title)
  … one major gap …
[body sections]
```

The chrome `<header>` is now SUPPRESSED WHOLE on the hero path (`v-if="variant === 'page'"` — the D1-4 suppression GENERALIZED to the eyebrow + blurb), so the descriptor is shown ONCE, never split across the chrome/card boundary.

### LIVE READBACK (getBoundingClientRect baseline order, `:5174`)

| route | eyebrow.top | h1.top | blurb.top | order eyebrow<h1<blurb | h1 dominant |
|---|---|---|---|---|---|
| `/substrates/glass-material` | 88 | 106 | 185.2 | ✓ | ✓ (67.8 vs 10 / 15.8) |
| `/substrates/constellation` | 88 | 106 | 185.2 | ✓ | ✓ (67.8) |
| `/substrates/fourier-field` | (cluster present; same chassis) | | | ✓ | ✓ |

Chrome-header-suppressed-on-hero: **true** on all 3. Screenshot: `W-HIERARCHY2-glass-material-cluster.png` (the eyebrow above the giant "Glass Material" title above the blurb; the left dock-rail chips clear of the title band).

### The CONTENT-page path is PRESERVED (no regression — the §Triumvirate cluster-shape trigger did NOT fire)
`/display/card` (variant='page'): chrome `<header>` EXISTS, eyebrow → chrome `<h1>` (`text-title` 32.9px) → blurb, baseline order 40 < 58 < 105.5 (already correct), NO cluster. ONE shape serves both variants; no two-recipe fork.

---

## (b) A4-ENTRANCE — the 3-stage GRAVITY cluster entrance

The cluster arrives as a tight 3-stage fade-rise reinforcing the reading order: **eyebrow LEADS (delay 0ms) → title SETTLES (delay 60ms) → blurb LAST (delay 120ms)**. Mechanism (`demo/stories/story-hero.css`, `@keyframes story-hero-cluster-rise`):
- **Compositor-only** — `transform: translateY` + coupled `opacity` ONLY (no `font-size`/`margin`/`top`/`width` — `proof:no-layout-animation` GREEN after, 0 layout-property animations off allowlist).
- **No-overshoot** — `--ease-out` on every stage (the audacious title NEVER bounces; the title keeps its OWN `.story-hero-title--enter` 0.62s `--ease-out` keyframe + ONLY the cluster stage delay). NO `--spring-bouncy`/`-snappy` on the cluster stages.
- **Per-element clock** — `--spring-smooth-duration` (0.36s, the A4-named clock; read-only, the W-GLASS-CAL fence).
- **Stagger by keyframe `animation-delay`** — deterministic CSS stagger, NO setTimeout cascade.
- **PRM** — the whole register lives inside `@media (prefers-reduced-motion: no-preference)`; under reduce the cluster paints its static terminal (no rise, no fade-in delay).

### LIVE READBACK
- Title translateY settles to **0** on every captured route (constellation: `titleTy: 0` post-settle) — monotone to 0, never past (GRAVITY-not-bounce).
- The π frame-series (H2-GRAVITY) samples translateY across ~700ms and asserts every sample ≥ -0.5px (no overshoot) + settles to ≈0.

---

## (c) A4-RHYTHM — the spacing cliff, unified

The three-spacing-scale cliff (chrome-header `gap-2` → `mt-8` boundary → `gap-10` section cadence) collapses to ONE micro-rhythm + ONE major gap: `.story-hero-cluster` is `display:flex; flex-direction:column; gap:0.5rem` (the tight eyebrow→title→blurb cadence) + `margin-block-end: clamp(1.5rem,3vw,2.5rem)` (the ONE major gap to the body). The title's own body-margin is RELAXED to 0 inside the cluster (the cluster owns the rhythm).

---

## (d) A4-CENSUS — the widened enrolled set + the straggler migration

The `proof:hierarchy` `ENROLLED_STORIES` grew 5 → 8 (the A4 `text-heading`-on-`<h2>` stragglers added):

| straggler | before | after | live readback |
|---|---|---|---|
| `data/search.vue:224` "Fuzzy index" | `text-heading` (25.9px) | `text-subheading` (20.4px) | **20.4px** (matches sibling "Results" 20.4) |
| `display/section.vue:76` "Live · session" | `text-heading` | `text-subheading` | (migrated) |
| `data/infinite-scroll.vue:72` "Event feed" | `text-heading` | `text-subheading` | (migrated) |

The off-canon-`<h2>` clause now WALKS them and exits zero. The set GREW (the H2-CENSUS bite — a green-by-narrowing fix reds).

---

## (e) A4-COLLISION — the content-side gutter + the recorded generalized requirement

### The CONTENT-side gutter (this wave's structural counterpart)
`--dock-content-safe-inset` minted in `src/styles/dock/density.css` (`:root` — the dock geometry family), keyed to the dock reach (`var(--dock-rail-extend-length, 2.5rem)`; at `:root` the reach token is out of scope so the `2.5rem` semantic-base fallback applies → 40px). DISTINCT from `--dock-control-safe-inset` (the dock-CONTROL plate-clearance token, BA.W-DOCK-GEOMETRY — the de-overload is binding: control-plate-inset ≠ content-band-gutter). Consumed on the demo `<main>` (`demo/layout/dock-nav.css` `.demo-main-scroller`) as `scroll-padding-block-start` + `scroll-padding-inline-start` (a scroll-axis reserve, NOT a layout-box padding clobber — the symmetric `px-*` page padding is untouched).

### LIVE READBACK
`.demo-main-scroller` resolves `scroll-padding-top: 40px`, `scroll-padding-left: 40px` (the content-side anti-collision gutter, reserved).

### The RECORDED generalized requirement (cross-link, NOT re-authored)
The band-agnostic **`chipOverMain:false` on ALL enrolled desktop StoryPage routes** (not the 3-route BA subset) is the SEAT-side witness owned by **W-DOCK-RAIL-SEAT-FINAL** (`proof:dock-sections` S6 — the ℱ-anchor + the off-canvas lower-gutter chip fan that clears `<main>` at EVERY y by topology) + **W-CHIP-GRAZE** (the field-graze close). The two halves close the collision from BOTH sides — the chip seat (those waves) AND the content gutter (this token), coordinated on the SAME dead inline gutter (ONE gutter, two consumers: the reserve + the fan). This wave did NOT edit `rail-extend.css`/the SidebarDock anchor/the fan direction (the §Do-NOT-touch fence held); `proof:rail3` / `proof:rail-extend` / `proof:dock-sections` / `proof:dock-plate-clearance` all stay GREEN after the content-gutter mint.

Live screenshot: the left dock-rail chips clear of the title band on `/substrates/glass-material`.

---

## Gates

| gate | result |
|---|---|
| `proof:hierarchy` (extended) | **10/10 PASS** (the 4 new BB clauses born-RED at HEAD → GREEN) |
| `proof:no-layout-animation` | PASS (the entrance is compositor-only; 0 layout-property animations off allowlist) |
| `proof:tag-parity` | PASS |
| `proof:dock-plate-clearance` / `proof:dock-sections` / `proof:rail3` / `proof:rail-extend` | PASS (the content-gutter mint reds no SEAT/control contract) |
| `npm run typecheck` | clean (the cluster re-home + the new spec type cleanly) |

### Born-RED proof at HEAD (`git show HEAD:`)
- H2-ORDER: original `<header>` had NO `v-if="variant === 'page'"` (rendered on every variant); StoryHero had 0 `StoryHeader`; StoryHeader.vue did not exist → RED.
- H2-GRAVITY: original story-hero.css had 0 `story-hero-cluster-rise` → RED.
- H2-GUTTER: 0 `--dock-content-safe-inset` in density.css + dock-nav.css → RED.
- H2-CENSUS: stragglers were `text-heading` and OFF the 5-route enrolled set → both the widen bite AND the off-canon clause RED.

---

## π readback artefact
The local-only π (`tests-visual/hierarchy.spec.ts`, the new BB.W-HIERARCHY2 describe block) writes `docs/tranches/BB/audit/visual/W-HIERARCHY2-readback.json` (the baseline order, the entrance frame-series, the PRM static-terminal, the gutter readback). The binding BOTH-mode live capture rides W-REFLECT3 (Batch 7), backstopped on CI by `proof:live-verified-ledger`.
