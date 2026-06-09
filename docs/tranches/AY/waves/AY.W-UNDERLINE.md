# AY.W-UNDERLINE — HandUnderline transposed UP: the first-class animated draw-on underline

**State:** OPEN · **Repo:** glass-ui · **Band:** A (component perfection — net-new, user-directed 2026-06-09)
**Provenance:** the user's round-2 refinement directive — "for the underline elements, look to
our developing project in the sci report repo — abstract this component into a first-class
glass-ui component from that research and development and have the underlines be animated in."
**Depends on:** none hard (the source R&D is shipped in sci-report; keyframes.js + value.js are
already glass-ui peers). Coordinates with W-PUB1 (the slides consumer re-point rides the next
publish) + L round-2 (slides adopt).
**Unblocks:** the slides underline unification (SlideIntro/SlideCloser/SlideSovereignty drop
their bespoke s1-draw/cta-draw recipes) + the sci-report re-point (its own tranche).

---

## §1 — The verified source (the R&D to transpose, file:line)

`sci-report/usf/web/src/platform/charts/HandUnderline.vue` (241 lines, mature, in production
across 4 mastheads) — the pen draw-on underline:

- **The mark:** an inline-SVG wavering cubic (`STROKE_D` + a faint GHOST overdraw `:82-83`) that
  DRAWS itself via `stroke-dashoffset: len → 0`. The wobble lives in authored control points —
  **FILTER-FREE** (no `feTurbulence`; the compositor-only invariant, `:9-14`).
- **Two clocks, one vocabulary (`:16-24`):** `clock="load"` — a keyframes.js `NumericAnimation`
  over the `--hu-off` scalar, exposed via `play(): Promise` so a load Sequence chains it;
  `clock="scroll"` — native `@keyframes` on the `view()` timeline (bidirectional, zero JS);
  `static` — rests drawn.
- **PRM — one fence (`:26-31`):** under reduce both clocks collapse to *set, not drawn*
  (`stroke-dashoffset: 0`, full emphasis, no draw). Information parity total.
- **Dark-aware stroke (`:208-210`):** the red lifts on dark (`--ncsu-red` → `--ncsu-red-bright`);
  an explicit `color` prop wins both grounds.
- **The variant continuum (`:33-39`):** `pen` is the only PROVEN render; pencil/crayon/boil are
  the API seam for future headroom, NOT shipped paths.

**The duplication this closes (the constellation.ts-class inversion, again):** the slides deck
hand-rolls the SAME draw-on idea three times — `s1-draw` (SlideIntro), `cta-draw` (SlideCloser),
plus the SlideSovereignty underline — as per-slide scoped CSS; sci-report ships the real
component. Intelligence in the consumers, absent from the library. ≥2 real consumer repos
(sci-report ×4 mastheads, slides ×3 sites) — the abstraction bar is met with a margin.

## §2 — Objective (root, not consumer)

Mint `<GlassUnderline>` (package `src/components/custom/underline/`, subpath
`@mkbabb/glass-ui/underline`) as the faithful transposition of HandUnderline:

1. **The component**, generalized off sci-report's local seams: `useReducedMotion` → glass-ui's
   own PRM seam; the default stroke re-anchored to glass-ui's token vocabulary (`--primary` as
   the default, a `color` prop for the NCSU red consumers — presets-in-consumers; the library
   default is its own identity). Keep: the two-clock API (`clock: "load" | "scroll" | "static"`),
   `play()/snap()` expose, the pen+ghost dual-path render, the filter-free invariant, the
   `variant` headroom seam, `drawMs`, the dark-arm stroke lift via token re-resolution.
2. **The path geometry** stays authored-once (the wavering cubic + ghost) with a `paths` escape
   prop for a consumer-authored wobble (slides' s1-draw geometry differs slightly — it either
   adopts the canonical path or passes its own; NO third fork).
3. **The scroll clock's timeline name** becomes a prop (`timeline?: string`, default the
   element's own `view()`) — sci-report binds `--beat-tl`, slides bind their own; the library
   does not hardcode a consumer's named timeline.
4. **api/ types + README** (use-cases: masthead pick-out, CTA ring, figure-item emphasis; the
   two-clock model; the PRM contract; the filter-free invariant).
5. **Demo story** (`demo/stories/primitives/underline.vue` or per the storybook IA): load-clock +
   scroll-clock + static, light/dark, PRM toggle.
6. **Consumers:** slides' three sites re-point on the next publish (an L round-2 edit — the
   bespoke s1-draw/cta-draw recipes DELETE); sci-report re-points in its own tranche (recorded,
   not forced cross-repo here).

## §3 — Edit-sites

- `src/components/custom/underline/GlassUnderline.vue` (NEW — the transposed component)
- `src/components/custom/underline/index.ts` (NEW — package barrel)
- `src/subpaths/underline.ts` (NEW — the one-line mirror barrel; batch-resolved by vite)
- `package.json` exports + typesVersions (the `/underline` subpath; SHARED — orchestrator-integrated)
- `src/api/index.ts` (the `GlassUnderlineProps`/clock/variant types)
- `README` at the package + the demo story
- `tests/components/custom/underline/` (unit: clock seeding, play() resolves, PRM snap,
  prop-color wins both grounds) + a π spec (the draw animates: dashoffset readback sweeps
  len→0 on play(); PRM holds 0)

## §4 — HARD GATE

1. **DRAW-ANIMATES π readback (born-RED — the component does not exist):** mount the demo story,
   fire `play()`, sample `stroke-dashoffset` per frame — asserts a monotonic sweep len→0 over
   ~drawMs (the underline ANIMATES IN, the user's verbatim requirement); under PRM emulation the
   offset is 0 on first paint and never animates.
2. **FILTER-FREE invariant:** a source-witness — no `filter:`/`feTurbulence` anywhere in the
   package (the Δ4 invariant transposed).
3. **Export surface:** `verify-export-types` resolves `/underline` with the dts; the api types
   ship.
4. **Consumer-fidelity canary:** the transposed render is geometry-identical to the sci-report
   source for the canonical path (same STROKE_D/GHOST_D, same dasharray model) — a unit
   byte-compare of the path constants against a recorded fixture, so the transposition is
   faithful, not a re-invention.
5. **DELTA:** captured light+dark of the demo story (rest → mid-draw → drawn frames) registered
   per the cardinal protocol; `proof:live-verified-ledger:ay` green on the W-UNDERLINE row.

## §5 — Scope fence

- NOT shipped here: the pencil/crayon/boil renders (the variant prop is headroom, exactly as the
  source documents); the sci-report repo re-point (its tranche); the slides re-point (L round-2,
  after publish).
- The slides' bespoke deletion is the L-side gate (`no-bespoke-underline` grep), not this wave's.
- No new animation engine — the load clock rides keyframes.js `NumericAnimation` exactly as the
  source does (one orchestration seam).
