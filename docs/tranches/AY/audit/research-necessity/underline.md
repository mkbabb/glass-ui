# Research-necessity audit — lane: underline (GlassUnderline / AY.W-UNDERLINE)

**Auditor:** read-only research-necessity lane · 2026-06-09
**Question:** is another iterative SOTA research pass NECESSARY for the underline component,
or can the remaining refinements be divined from the existing corpus + code?

## VERDICT: REFINE-FROM-EXISTING

No fresh research pass is warranted — not for the build, and not for the variant continuum.
The corpus is exceptionally deep and exceptionally FRESH (the bulk dated 2026-06-08/09, i.e.
yesterday/today), and it already contains a definitive SOTA-libs verdict. A new research pass
would re-tread a settled corpus — churn by this audit's own bar.

## The existing corpus (what already answers everything)

1. **The wave spec** — `docs/tranches/AY/waves/AY.W-UNDERLINE.md` (102 lines, OPEN). Objective,
   edit-sites, 5 hard gates (born-RED π draw-readback, filter-free witness, export surface,
   geometry-fidelity byte-compare, DELTA), scope fence. Complete and buildable as written.
2. **The production source R&D** — `sci-report/usf/web/src/platform/charts/HandUnderline.vue`
   (241 lines, mature, 4 mastheads). Two clocks (`load` = keyframes.js `NumericAnimation` over
   `--hu-off` with `play(): Promise` + `snap()`; `scroll` = native `@keyframes` on `view()`
   under a structural PRM `@media` fence, `:219-240`), filter-free pen+ghost dual path
   (`:78-83`), dark-arm stroke lift (`:208-210`), PRM total-parity contract (`:26-31, :109-124`).
3. **The sci-report handmark research fold** — `sci-report/usf/docs/tranches/C/handmark/`
   (**35 documents**, 2026-06-08/09): `sota-libs-answer.md` (the definitive "no single library
   does this — BUILD" verdict with a 6-library capability matrix: rough.js / rough-notation /
   perfect-freehand / p5.brush / paper.js / pencil-boil), `r-libs-survey.md`,
   `r-stroke-techniques.md`, `r-texture-brush.md`, `r-boil-animation.md`,
   `r-crayons-analysis.md`, `r-pencilboil-mine.md`, `r-academic-procedural.md`,
   per-variant prototypes (`proto-pen-variant.md`, `proto-pencil-variant.md`,
   `proto-crayon-variant.md`, `proto-drawon-boil.md`, `proto-pencilboil-extend.md`,
   `proto-perfectfreehand.md`, `proto-roughnotation.md`, `proto-svgfilter.md`,
   `proto-shapes.md`, `proto-perf-a11y.md`, `proto-vue-component.md` + a live `proto/` sandbox),
   design spine (`p-api-design.md`, `p-architecture.md`, `p-brush-model.md`,
   `p-fit-atlas-glassui.md`, `judge-engines.md`, `SPEC.md` 48 KB, `C-HANDMARK.md`,
   `convergence-check.md`), and **`glassui-upstream.md`** — the glass-ui abstraction/packaging
   plan verified against the live glass-ui 3.8.0 `package.json` + `vite.library.ts` auto-glob.
4. **The slides-twin analysis** — `sci-report/.../handmark/r-slides-til-pen.md` documents the
   slides pen technique, geometry, and CSS recipe in full (against an earlier deck revision).
5. **The live slides twins** — `slides/src/decks/til-briefing/slides/SlideIntro.vue:121-134`
   (`s1-draw`) + `SlideCloser.vue:114-128,~185` (`cta-draw`).
6. **AY framing** — `docs/tranches/AY/audit/MASTER-RECAP-2026-06-09.md:42,60,67-69,88`
   (W-UNDERLINE in the DAG; keyframes/value.js seam lanes; L round-2 adopt). The b2
   hand-challenge corpus (`audit/hardening/b2/`) carries NO underline findings — the wave is
   too new to have accreted hardening defects.

## As-built state in glass-ui: BORN-RED (correct)

`src/components/custom/underline/` does not exist; no `/underline` subpath barrel; no
`GlassUnderline*` types in `src/api/index.ts` (the only "underline" hits in `src/` are
SegmentedTabs' `underline` variant + text-decoration utilities). This matches gate 1's
"born-RED — the component does not exist." Nothing here is stale; it is pre-build.

## README state: MISSING

The package README + demo story are W-UNDERLINE deliverables (§2.4-5) — nothing to grade yet.
One stale claim INSIDE the wave spec itself (see refinement 1): the "slides ×3 sites" count.

## The variant continuum (pencil / crayon / boil): stays DEFERRED headroom — and is ALREADY researched

The wave's open question — does the continuum warrant research NOW? **No, doubly:**

- **It stays headroom** exactly as both the source (`HandUnderline.vue:33-39, :55-59`) and the
  wave fence (§5) record: `pen` is the only proven filter-free render; pencil/crayon need a
  `feTurbulence` branch (forbidden on the masthead pen path) and/or the `perfect-freehand` +
  `@mkbabb/pencil-boil` substrate.
- **The research for that headroom ALREADY EXISTS** — the handmark fold has per-variant
  research AND working prototypes (`r-crayons-analysis`, `r-texture-brush`, `r-boil-animation`,
  `proto-pencil-variant`, `proto-crayon-variant`, `proto-drawon-boil`, plus the packaging plan
  in `glassui-upstream.md` §2-4: pencil-boil as PEER, the mulberry32 single-source ruling, the
  one upstream `ellipsePoints` addition). When a future wave lights a variant, it starts from
  that fold, not from a search engine. Researching it again now would be churn against a corpus
  finished TODAY.

## Divined refinements (concrete, no research needed)

1. **Correct the slides consumer count: ×2, not ×3.** `AY.W-UNDERLINE.md:34-38` counts
   SlideSovereignty as a third bespoke site, but `SlideSovereignty.vue:159-161` deliberately
   carries NO glyph ("the calm register; the draw-on glyphs belong to the cover + the closer").
   The real twins are `SlideIntro.vue:130-131` (`s1-draw`) + `SlideCloser.vue:127-128`
   (`cta-draw`). The abstraction bar still clears with margin (sci-report ×4 mastheads +
   slides ×2); the L-side `no-bespoke-underline` grep (§5) should target 2 sites. (The ×3 read
   likely inherited from `r-slides-til-pen.md` §1, which documented an EARLIER deck revision —
   Slide01/Slide10/SlideConclusion — where a third "scale" site existed.)
2. **The slides twins run a THIRD clock shape — attribute-gated CSS** (`[data-state="active"]`
   + `animation … 0.7s forwards`, `SlideIntro.vue:130`, `SlideCloser.vue:127`) — neither
   `load`-via-`play()` nor `scroll`. Divined adoption path: slides fire `play()` on slide
   activation (their reveal sequencing already owns the 0.7 s delay), OR the component adds a
   declarative `active?: boolean` prop (watch → `play()`/`snap()`) so a template binding
   suffices. Decidable at build time from code in hand.
3. **Tokenize the stroke metrics.** `HandUnderline.vue:193,202` hardcodes stroke-width 2.4/3.4;
   `:174-182` hardcodes the ink box (inset-block-end `-0.18em`, height `0.5em`). The slides
   register is bolder (stroke-width 6, height `0.3em`, offsets `-0.16em/-0.14em` —
   `SlideIntro.vue:122-129`, `SlideCloser.vue:118-126`). Expose `--gu-stroke-width` /
   `--gu-ink-height` / `--gu-ink-offset` custom properties (glass-ui token-first axis) so the
   bolder slides register is a token override, not a geometry fork. The wave spec covers the
   `paths` escape (§2.2) but not stroke-metric tokens — add them.
4. **The dark arm DELETES rather than transposes.** `HandUnderline.vue:208-210` hardcodes the
   NCSU red lift under `.dark`. In glass-ui the default `--primary` re-resolves under `.dark`
   via the token cascade, so the transposed component needs NO `:where(.dark)` block — the
   NCSU lift becomes the sci-report consumer's `color` prop (presets-in-consumers). Consistent
   with spec §2.1's "token re-resolution"; this makes the deletion explicit.
5. **The `timeline` prop implementation** (spec §2.3): the source hardcodes
   `animation-timeline: --beat-tl` (`HandUnderline.vue:234`). Divined: bind via custom property
   (`animation-timeline: var(--gu-timeline, view())`) with the existing `@supports` gate
   (`:220`) transposed as-is; the wave's own π gate (gate 1) verifies it live — a testable
   implementation detail, not a research question.
6. **Easing register reconciliation.** Source hardcodes `easeOutCubic`
   (`HandUnderline.vue:117-120`); slides use `var(--ease-out-expo)`. Per the glass-ui §6 easing
   doctrine the draw-on is an ENTER — `easeOutCubic` default is doctrine-compliant; optionally
   expose `easing?: TimingFunction` for the expo register. Delay stays consumer-owned
   (`play()` chaining).
7. **`paths` escape must carry the full geometry tuple.** Slides geometry differs in viewBox
   (`0 0 100 12` vs the canonical `0 0 100 10`), dasharray (260/340 vs `HU_LEN` 120,
   `SlideIntro.vue:57,128`; `HandUnderline.vue:78-83`), and ships single-path (no ghost). The
   escape prop should accept `{ stroke, ghost?, viewBox?, len? }` — or (likelier, per §2.2's
   "NO third fork") the slides re-point simply ADOPTS the canonical geometry + ghost, an
   upgrade (they currently lack the "hand never lays one clean line" overdraw).
8. **Reconcile `/underline` with the handmark packaging plan BEFORE minting the subpath.**
   `AY.W-UNDERLINE.md` §3 mints `custom/underline/` + `/underline`; the sci-report
   `glassui-upstream.md` §1 plans `custom/handmark/` + `/handmark` (the full mark family —
   underline·circle·strike·highlight, pencil-boil as peer). Subpath names are publish surface
   under no-backwards-compat — record the relationship in the wave spec/README (e.g.
   `/underline` is the pen-only day-one slice; the handmark family, if it ever clears the
   ≥2-consumer bar in glass-ui terms, either extends this package or lands separately with the
   ruling recorded). Corpus-internal reconciliation; both docs in hand.
9. **The PRM seam to reuse/extract.** Source imports sci-report-local `useReducedMotion`
   (`HandUnderline.vue:43,85`). glass-ui has PRM machinery but no shared reactive leaf:
   `useRAFLoop` carries a per-instance matchMedia listener + `isReducedMotion` ref
   (`src/composables/motion/useRAFLoop.ts:70,108,234-247,282`), `useCountup` a module-local
   one-shot `prefersReducedMotion()` (`src/composables/motion/useCountup.ts:56-64`), and
   `NumericAnimation` handles the engine side (`respectReducedMotion: true`,
   `HandUnderline.vue:119`). Divined: either the one-shot read suffices (the scroll clock is
   structurally fenced by the CSS `@media`; the load clock by the engine flag — only the
   initial `off` seeding at `:100` needs the read), or extract a tiny shared
   `usePrefersReducedMotion` leaf — the ≥2-sites bar is ALREADY met by the existing
   duplication (useRAFLoop + useCountup + now underline).
10. **The fixed over-long dasharray truncates the ease tail ~17% early** (`HU_LEN` 120 vs
    ~100-unit path, `HandUnderline.vue:74-78`): at offset ≈20 the path is already fully drawn,
    so the last fraction of the sweep is a visual no-op. The source records this as a
    deliberate nicety-tradeoff; keep it (the easeOutCubic tail is sub-perceptual there), or
    measure `getTotalLength()` once on mount for exactness — a one-line decision, not research.

## Research gaps (questions ONLY fresh external research can answer)

**None.** The only conceivably-external unknowns (browser quirks of `var()` indirection into
`animation-timeline`; `view()` support breadth) are settled by the wave's own `@supports` gate
+ the born-RED π readback gate — verification work, not research work. The SOTA question
("does a library already do this?") was asked and definitively answered TODAY in
`sota-libs-answer.md`.
