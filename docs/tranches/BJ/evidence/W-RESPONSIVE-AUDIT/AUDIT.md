# BJ.W-RESPONSIVE-AUDIT (F14) — the per-page responsive audit table

**Wave:** `BJ.W-RESPONSIVE-AUDIT` (STORY band W6). **Model:** Opus (build seat; browser-seat owner).
**Spec of record:** `docs/tranches/BJ/waves/BAND-STORY.md` §BJ.W-RESPONSIVE-AUDIT.
**HEAD at audit:** `git describe = v7.0.0-131-g87440837` (the band file's born-RED pin `v7.0.0-70`
has moved; STORY W2/W3 + sibling bands landed since. Every probe below was re-run at THIS head, per
the STANDING LAW — the band file + a fresh census win over the stale pin).
**Method (AMEND-D-15):** audit ALL routes AGAINST the per-type collapse rules, never page-by-page ad
hoc. `landing` bento 3→2→1 · `spec` single-column + measure cap · `studio` controls-right→stacked ·
`family` switcher→Select · `dock` single-file. A page needing a *bespoke* breakpoint is a taxonomy
smell to escalate, not patch.
**Viewports:** 390px (mobile-first) + 1440px (desktop). **Browser seat:** serialized singleton.

---

## 1. The census (the roster IS the spec)

99 navigable routes swept: 1 catalog (`/`) + 11 category landings + 87 story routes. (The band file
says 88 stories; the manifest at this head declares 87 via the `s(...)` helper — a −1 drift, noted,
not material to the audit.) Full route list + method: `390-overflow-sweep.txt`.

## 2. G-RSP-2 — 390px, no horizontal scroll / no crush

**Machine report:** `390-overflow-sweep.txt` — a headless 390px pass over all 99 routes
measuring `documentElement.scrollWidth − clientWidth` and enumerating any non-fixed element crossing
the right edge.

**Result: 0 / 99 routes overflow at 390px.** The chassis type-rule collapses are structurally
SOUND at this head. The born-RED premise carried from the `v7.0.0-70` pin — "the ~23 bespoke-`<style>`
SFCs break at 390px" — **does NOT reproduce** at `v7.0.0-131`: those SFCs (34 now carry a `<style>`
block; enumerated below) were hardened by the intervening W2/W3 + sibling-band work. This is reported
honestly as refactor-DERIVED green, NOT dressed as a born-RED I reduced.

**Crush spot-checks (screenshot/computed-style, the dense/wide-content set):** data-table (table
scrolls INSIDE its own container — the correct wide-table pattern; header sort toggles are 20px but
the tap area is the header cell), configurator (studio variant: preset strip scrolls, stage stacks
below), css-utilities, glass-material, glass-panel, typography, the 2-col forms (labeled-field) all
COLLAPSE to single-column and read without crush. No primary control is squished below use.

**Out-of-scope tiny-control flags (routed, not fixed):** `/forms/slider` thumb/ticks (18–24px) →
the mobile slider modal/grow variant is **A01 → family G / BI.W-ENGAGE-AFFORD** (band Out).
`/motion/curve-gallery` 11px SVG curve handles → **easing tooling, ASK-11 / family C** (band Out).

## 3. G-RSP-3 — 1440px, horizontal usage (the F13 class)

**Measurement (`page`/spec routes, 1440px):** EVERY spec route computes `data-variant="page"`,
`article width = 1288px`, `max-inline-size: none`. The story-page article is **uncapped** because
`--story-article-w` is referenced (`StoryPage.vue:51`) but **undefined** — so `page` articles
compute `max-inline-size: none` and stretch to the full available measure.

**This systemic desktop over-width is `BAND-STORY` W4's `G-WID-1` defect, not this wave's.** It is
ROUTED to **`BJ.W-WIDTH-HIERARCHY-TRUTH` (W4)** — the owner of `StoryPage.vue:51` + `story-hero.css`
(one owner per file). Once W4 collapses `--story-article-w` onto `--story-page-max-inline` (72rem),
every spec page reads at a bounded measure and the bulk of the "waste" resolves at the chassis level,
once — exactly the AMEND-D-15 discipline (fix the type rule once, don't patch per page).

**Beyond the systemic uncap, the chassis pages use horizontal space WELL** (verified by screenshot
survey): metric (side-by-side cells + responsive ledger grid), labeled-field (2-col form grid),
collapsible (2-col disclosure grid), checks (inline specimen rows), alert (full-width banners by
nature). These need NO page-level fix — the article cap (W4) is sufficient.

**One genuine STRUCTURAL outlier remained** — a page whose waste persists even AFTER the article cap,
because its two demos stack single-column when they are parallel specimens that should pair. That is
the F13 named anchor, fixed below.

---

## 4. The flagged-fix table  (breakage@viewport → type-rule/bespoke → fix → DELTA)

| page | breakage @ viewport | type-rule or bespoke | fix | DELTA |
| --- | --- | --- | --- | --- |
| **`/data/sortable-list`** (F13 anchor, `:69`/`:109`/`:143`) | @1440: the two single-column list demos (Single list + Handle-only) each stretch a grip+dot+short-label row across ~1100px — vast horizontal waste ("needs better horizontal use of space"). @390: clean (no overflow). | **spec**, type-rule-aligned. A single sortable list MUST stay one vertical column (drag-reorder semantics) — so horizontal space is used by PAIRING two lists, not by widening one. The kanban (`:143`) already collapses 1→3 correctly and is KEPT as-is. **No bespoke breakpoint minted** — a native responsive grid, the same idiom as the kanban. | Wrapped the two parallel single-list sections in `grid items-start gap-6 md:grid-cols-2`: 2-up at ≥md (uses the width), single-file at <md (390 preserved). `gap-6` (24px) matches the page section rhythm at 390 for consistent vertical cadence. | born-RED: `sortable-list_{390,1440}_BORN-RED.png` · after: `sortable-list_{390,1440}_DELTA.png` |

**No other flagged fixes.** Every other desktop-waste observation reduces to the systemic
`--story-article-w` uncap (→ W4), and every 390px route is overflow-free.

## 5. Routings (named — cures owned by other waves; flagged here, edited there)

| observation | owner (named) | why not here |
| --- | --- | --- |
| Uncapped `page`/spec article (`maxInline: none`, artW 1288 on every spec route) — the systemic desktop over-width | **W4 `BJ.W-WIDTH-HIERARCHY-TRUTH`** (`G-WID-1`, owns `StoryPage.vue:51` + `story-hero.css`) | one owner per file; the type-rule cure lands once in the chassis, not per page |
| Landing bento grid at mobile (`CatalogLanding.vue` / `SectionLanding.vue` fixed `grid-cols-1/2/3`) | **W5 `BJ.W-PREVIEW-CARD`** (`G-PRV-1` masonry; owns the landing grids) | already W5's target; landings swept overflow-free @390, so no born-RED regression to hand off |
| Mobile slider thumb / grow-on-touch (`/forms/slider`) | **family G / `BI.W-ENGAGE-AFFORD`** (A01) | band Out (explicit non-goal) |
| Curve-gallery SVG control handles @390 (`/motion/curve-gallery`) | **easing tooling — ASK-11 / family C** | band Out (overfit-page redesign is family C; this wave flags) |

## 6. Enumerated `<style>`-block SFCs (34 at this head; the born-RED "~23 break @390" set)

All swept @390 with 0 overflow. `auth-shell, gate-pattern, settings, configurator,
expandable-container, avatar, instrument-chassis, TimelineContinuousBody, buttons.tile, card.tile,
card, status-dot, surface, DockStage, cta-receive, dock-search, layers, overview.tile, overview,
inputs.tile, css-utilities, overlays-scrims, paper-glass, paper-texture, shadows, surface-tints,
deck, reveal, tempo, carousel, header-ribbon, RendererStatus, aurora, blob`. None is a 390px
type-rule violation at this head.

---

## Gate ledger

- **G-RSP-1** (audit table exists, every flagged page carries breakage→rule→fix→DELTA): **GREEN** —
  this file; §4 carries the one flagged fix with paired 390+1440 born-RED/DELTA captures.
- **G-RSP-2** (each flagged page passes @390, no scroll/crush): **GREEN** — 0/99 overflow
  (`390-overflow-sweep.txt`); sortable-list @390 unchanged and clean (paired capture).
- **G-RSP-3** (flagged pages use the space @1440; fixes dogfood shipped idioms; 0 new bespoke
  breakpoints without an escalation row): **GREEN** — sortable-list now 2-up via native responsive
  grid (no bespoke breakpoint); the systemic uncap escalated to W4 (§5).

**KISS note:** the one fix is a single wrapper `<div>` + a Tailwind grid class — a layout cure, not a
rewrite. The larger desktop-waste class is deleted by ONE chassis cap in W4, not by 88 per-page edits.
