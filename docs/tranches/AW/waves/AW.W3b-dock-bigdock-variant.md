# AW.W3b - Big-dock variant (card shape + grid layout + wrap morph) — DEFERRED

## State

**Name**: W3b - Big-dock card shape + grid layout + multi-row wrap morph
**Opens after**: AW.W2 (consumes the clip-reveal shell + the settled `--spring-dock`) — but ONLY on
consumer #1 (see below)
**Agents**: 1 serial (when it opens)
**Hard gate**: `proof:dock-big-dock` (NEW, born-RED) asserts the card shell is finite/non-pill when
expanded AND a pill when collapsed, the pill↔card radius morphs over ≥3 frames, `layout="grid"`
produces ≥2 grid rows on overflow with concentric inner tiles, and the squircle is `@supports`-gated;
`proof:dock-wrap-morph` (NEW, born-RED) asserts the `overflow="wrap"` reflow `min-height` morphs over
≥3 frames and snaps under PRM.
**Status**: **DEFERRED — opens on consumer #1.** This wave is fully specced (API + CSS + tokens +
gates) so the substrate is ready, but it does NOT ship in the AW dock-motion band. Per glass-ui
invariant 10 / L invariant 8 (visual-load-bearing-ness — substrate ships only with ≥2 consumers or
formal retirement), the big-dock card+grid variant has **zero current consumer** and is consumer-gated.

## Why deferred

The motion-convergence ask (AW band A) is the clip-reveal one-clock morph (W2 + W3). It stands alone.
The big-dock card+grid variant is a **NET-NEW feature set** — two public props (`shape="card"`,
`layout="grid"`), a new radius rung (`--radius-3xl`), a grid tile token (`--dock-tile-min`), a
concentric-inner-tile recipe, a `@supports`-gated squircle tier, and a pill↔card radius morph — with
**no current consumer**. Shipping it on the motion-fix tranche would:
- dilute the motion rewrite,
- add public-API surface the convergence task did not ask for,
- ship consumer-less substrate (the invariant-10 violation),
- and bolt on a feature whose central feasibility (grid reflow-during-width-morph) needs an empirical
  check.

So it is specced and gated, ready the instant a consumer materializes. **Candidate consumer #1**: the
slides constellation panel (a 2D node grid that reads as a plate, not a pill). A **second consumer is
required for the ≥2 floor** before this wave opens. See `docs/tranches/AW/audit/dock-perfection-plan.md`
§3.

## Goal criterion (when it opens)

This wave succeeds if a `shape="card" layout="grid" alwaysExpanded` `GlassDock` renders a
finite-rounded multi-row/column **concentric** plate (NOT a stadium-in-stadium pill nest); the
pill↔card transition is ONE spring interpolation on the existing `--dock-motion-resize`; and an
`overflow="wrap"` reflow MORPHS rather than jump-cutting at the `--dock-overflow-bp` breakpoint. The
card shell + grid reuse the same `dim` + clip + spring as the linear dock with ZERO new axis code
(the grid is the IN-aperture arrangement, orthogonal to the morph axis).

## The load-bearing gap this also fixes

Today `shape="rounded"` does NOTHING on a horizontal dock: the `shape-*` rules bind only under
`.variant-rail` (`dock.css:306-312`), and the horizontal dock root is hardwired to
`border-radius: var(--radius-dock)` = `--radius-pill` (`dock.css:85`, `theme.css:48`). So a documented
prop silently no-ops in the default variant. The card-shape work adds explicit horizontal-root shape
rules, which ALSO makes `shape="rounded"` actually paint on a horizontal dock — closing a
documented-but-dead prop. Clean break: no alias (the prop exists; it gains an effect). **Until this
wave opens, the `shape` prop's JSDoc (updated in band A) documents it as rail-only** so the docs do
not promise a horizontal effect that lands only here.

## Scope (when it opens)

1. **`shape="card"` — the finite concentric card shell.** Add `"card"` to the `GlassDock.shape`
   union (`GlassDock.vue` `shape?: "pill" | "rounded" | "card"`). Flows through the existing
   `shape-${shape}` class binding (`GlassDock.vue:365`), so no template change beyond widening the
   union. NEW radius rung in `theme.css`:

   ```css
   --radius-3xl: 1.5rem;                /* 24px — above --radius-2xl (16px), below --radius-pill */
   --radius-dock-card: var(--radius-3xl);
   ```

   The card shell radius is the density-scaled `--dock-card-radius` token (compact tighter, spacious
   looser; `--radius-3xl` is its comfortable default — consistent with the dock's density cascade).
   The horizontal-root override (closing the `shape-rounded`-no-op gap):

   ```css
   .glass-dock.shape-card {
       --dock-card-radius: var(--radius-dock-card);
       border-radius: var(--dock-card-radius);
   }
   .glass-dock.shape-card.collapsed { border-radius: var(--radius-pill); }
   @supports (corner-shape: squircle) { .glass-dock.shape-card { corner-shape: squircle; } }
   ```

   The squircle is an `@supports`-gated enhancement ONLY (Chrome 139+, no FF/Safari 2026). The
   border-radius card shell is the CONTRACT; the squircle is the better tier. At `--radius-3xl=24px`
   the arc-vs-squircle delta is visible — the baseline circular arc must be the acceptable contract,
   NOT a degraded fallback.

2. **pill↔card radius morph.** The `border-radius` animates on the SAME `--dock-motion-resize`
   spring the aperture rides — ONE free interpolation. REQUIRES adding
   `border-radius var(--dock-motion-resize)` to the `.glass-dock:not(.vertical)` transition list
   (`dock.css:262-268`) — it is ABSENT today, so without it the pill↔card snaps discretely. NOTE
   (risk): this list is shared by ALL horizontal docks (pill, rounded, card, instrument-strip), so
   adding `border-radius` animates corner radius on any class change — including the existing wrap
   collapsed↔expanded radius swap (`dock.css:711-715, 928-953`). This is likely DESIRABLE (it glides
   the wrap radius swap too) but is a behavioral change to the pill/rounded/instrument-strip variants
   that have shipped consumers (the speedtest `SurveyResultDock` instrument-strip). The gate verifies
   no existing horizontal showcase looks wrong.

3. **`layout="grid"` — the 2D auto-grid.** NEW prop `layout?: "linear" | "grid"` (default `"linear"`),
   emitting a `layout-${layout}` root class. `linear` is the current behavior verbatim. `grid`
   switches the active layer to a self-wrapping tile grid (Launchpad/Stage-Manager track symmetry,
   distinct from `overflow="wrap"`'s content-ordered flex-wrap):

   ```css
   .glass-dock.layout-grid .dock-layer--full {
       display: grid;
       grid-template-columns: repeat(auto-fill, minmax(var(--dock-tile-min, 4.5rem), 1fr));
       grid-auto-rows: var(--dock-tile-min, 4.5rem);   /* explicit row height or the concentric look breaks */
       gap: var(--dock-layer-gap);
       width: 100%; height: auto; white-space: normal;
   }
   .glass-dock.layout-grid.shape-card .dock-layer--full > * {
       border-radius: calc(var(--dock-card-radius) - var(--dock-padding-inline, 0.5rem));   /* concentric: inner = outer - padding */
   }
   ```

   NEW density-scaled token `--dock-tile-min` (default `4.5rem`, wired into the
   compact/comfortable/spacious/audacious cascade — never a magic number).

   **Hard contract**: a `layout="grid"` dock is `alwaysExpanded` (a 2D panel does not read as a
   collapsible pill, and `alwaysExpanded` means no width morph, so NO per-frame grid-column reflow —
   the apple-motion reflow-during-morph anti-pattern is structurally avoided). If it CAN collapse,
   the `#collapsed` summary slot renders a pill (the morph target). Document the canonical pairing
   `shape="card" layout="grid" alwaysExpanded`; keep the props independent (no auto-implication —
   coupling orthogonal props is the clean-break anti-choice).

4. **Graceful multi-row wrap morph** (MOVED here from the prior W3 scope 4). The `overflow="wrap"`
   recipe flips `flex-wrap` + `border-radius` at the `--dock-overflow-bp` `@media` boundary
   (`dock.css:928`) with no morph — a jump-cut. Sequence the row reflow through a `min-height` settle
   on the `--dock-motion-resize` curve so wrap/unwrap MORPHS, gated to snap under
   `prefers-reduced-motion`. The wrap radius swap (`dock.css:711, 931`) glides too once scope 2 adds
   `border-radius` to the transition list.

## Constraints (each a finding pitfall)

- NEVER nest two pills (pill shell + pill tiles = stadium-in-stadium, mismatched curvature). Finite
  shell; tiles step down to outer-minus-padding (concentric).
- A grid big dock is `alwaysExpanded` by contract (scope 3). No width morph → no reflow-during-morph.
- container-type trap: a grid dock must NOT set the default container — already fixed by AW.W1
  (`containerName` opt-in). The grid self-wraps via `auto-fill` without the root becoming a container
  subject.
- `--dock-tile-min` + `--dock-card-radius` are density-scaled tokens, never magic numbers.

## File Bounds (when it opens)

| File | Access |
|---|---|
| `src/components/custom/dock/GlassDock.vue` | modify (the `shape="card"` union member + the `layout` prop + the `layout-${layout}` class) |
| `src/styles/theme.css` | modify (`--radius-3xl` + `--radius-dock-card`) |
| `src/styles/dock.css` | modify (the `.shape-card` horizontal-root radius override; the pill↔card morph + `border-radius` in the `:not(.vertical)` transition list; the `.layout-grid` auto-grid + concentric inner-tile radius; `--dock-tile-min` density wiring; the wrap min-height spring settle moved from W3) |
| `src/api/index.ts` | modify (the widened `shape` union type export — if a `ShapeVariant`/`DockShape` type is published; otherwise the prop is internal) |
| `scripts/proof-dock-big-dock.mjs` | create |
| `scripts/proof-dock-wrap-morph.mjs` | create |
| `tests/components/custom/dock/dock-big-dock.detect.test.ts` | create |
| `demo/stories/navigation/dock.vue` | modify (a big-dock card+grid showcase + the wrap showcase — consumer #1 in the demo) |

Do NOT touch: the W2 clip-reveal shell + the W3 layering folds (this wave consumes them), the spring
curve / `regen-spring-tokens.mjs` (consumes the settled `--spring-dock`).

## Disjointness

Single agent unit (when it opens). Sequences after W2 + W3 (it consumes the clip-reveal shell + the
unified motion). No parallel wave writes `GlassDock.vue` / `dock.css` / `theme.css` concurrently.

## Hard Gate (when it opens)

1. `npm run proof:dock-big-dock` (NEW Playwright gate, harness-gated SKIP) — behavioral, on the
   demo big-dock showcase:
   (a) `shape="card"` expanded renders a FINITE `border-radius` (== `--radius-dock-card`, NOT 9999px
   / `--radius-pill`) AND collapsed renders `--radius-pill`;
   (b) the pill↔card `border-radius` rises monotonically over ≥3 frames on the `--dock-motion-resize`
   spring (born-RED: discrete snap because `border-radius` is absent from the `:not(.vertical)`
   transition list);
   (c) `layout="grid"` with N > capacity tiles produces ≥2 grid rows (track symmetry, not a single
   flex row);
   (d) inner-tile computed `border-radius` == `calc(outer - padding)` (concentric);
   (e) `corner-shape: squircle` is present ONLY under `@supports` (never the baseline radius);
   (f) NO grid-column reflow occurs during any morph (the `alwaysExpanded` contract — sample the
   grid-template-columns track count across a hover/scale and assert it is constant).
2. `npm run proof:dock-wrap-morph` (NEW Playwright gate, harness-gated SKIP) — the `overflow="wrap"`
   row reflow `min-height` MORPHS over ≥3 frames at a `--dock-overflow-bp` crossing (born-RED: the
   current `@media` flex-wrap jump-cut is ≤1 frame); under forced `prefers-reduced-motion: reduce`
   the morph collapses to an instant snap (0 morph frames) while the reflow still completes.
3. `npx vitest run tests/components/custom/dock/dock-big-dock.detect.test.ts` — the pure detectors
   (finite-vs-pill radius, monotone radius morph, concentric inner radius, grid-row count) over
   synthetic timelines + computed-style fixtures.
4. `npm run proof:dock-clip-reveal` + `proof:dock-animation-live` + `proof:dock-layering-polish` +
   `proof:dock-opacity-lockstep` + `proof:spring-tokens-synced` stay GREEN (the big-dock does not
   regress the motion contracts — and verify no existing horizontal showcase, incl. the
   instrument-strip, looks wrong with `border-radius` now in the shared transition list).
5. `npm run typecheck` clean; `npm run build` green.
6. BORN-RED CAPTURE. `proof:dock-big-dock` + `proof:dock-wrap-morph` SKIP fail-open on a harnessless
   runner, so the born-RED artefacts (the discrete radius snap, the jump-cut wrap) are CAPTURED in the
   MCP/dev Playwright env on the pre-fix build BEFORE and the GREEN artefact AFTER. A deliberate-inject
   reddening confirms each sub-assert bites.

## Format And Lint Cadence

`npm run typecheck` after the integration batch. Prettier over the new `.mjs` gates + `.test.ts` + the
`.vue` story. `git diff --check`. The proof gates above run before close.

## Verification Artefacts (when it opens)

- `docs/tranches/AW/audit/W3b-big-dock.json` — the gate artefact: the finite-card-radius vs pill
  measurement, the monotone pill↔card radius-morph series, the grid-row count, the concentric
  inner-radius check, the squircle-only-under-@supports confirmation, the no-reflow-during-morph
  track-count series.
- `docs/tranches/AW/audit/W3b-wrap-before-after.png` — a screenshot pair of the multi-row wrap morph
  (jump-cut vs glided).
- The consumer #1 + #2 citation (the ≥2-consumer floor that opened the wave).

## Commit Plan (when it opens)

- `feat(dock): card shape — finite concentric shell + pill↔card radius morph` — the `GlassDock.vue`
  union member + `theme.css` `--radius-3xl` + `dock.css` `.shape-card` override + the `border-radius`
  transition (body: closes the `shape-rounded`-no-op-on-horizontal gap; the concentric rule; the
  shared-transition-list behavioral change verified).
- `feat(dock): grid layout — 2D auto-grid big dock` — the `layout` prop + the `.layout-grid` recipe +
  the `--dock-tile-min` density token + the `alwaysExpanded` contract.
- `feat(dock): graceful multi-row wrap morph` — the wrap min-height spring settle (moved from W3).
- `test(dock): proof:dock-big-dock + proof:dock-wrap-morph + detector unit` — the gates.
- `docs(AW): W3b close — big-dock artefact + consumer citation + status`.

## Dependencies

- **Depends on**: AW.W2 (the clip-reveal shell + the settled `--spring-dock`), AW.W3 (the unified
  motion — the card morph rides the same spring vocabulary), AND consumer #1 + #2 (the ≥2 floor).
- **Blocks**: nothing in band A (it is out-of-band). When it opens, the dock README's big-dock
  section.

## Archaeology

- `shape="rounded"` has been a documented-but-dead prop on horizontal docks since the shape-* rules
  bound only under `.variant-rail`. This wave closes it as a side effect of the card-shape work.
- The `overflow="wrap"` reflow has always been a `@media` flex-wrap jump-cut (`dock.css:928`) — the
  prior W3 draft owned the morph; it is moved here because the wrap radius-morph is part of the
  card/grid radius story.
- The grid reflow-during-width-morph anti-pattern (the apple-motion finding) is structurally avoided
  by the `alwaysExpanded` contract (scope 3) — a 2D panel does not width-morph, so there is no
  per-frame reflow. The gate verifies the track count is constant across a morph.
- Per invariant 10, this substrate does NOT ship until ≥2 consumers exist. The wave is specced and
  gated so it is ready the instant the slides constellation panel (candidate consumer #1) + a second
  consumer land.
