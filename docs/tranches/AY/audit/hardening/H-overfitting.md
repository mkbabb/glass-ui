# H-overfitting — adversarial challenge of the ≥2-consumer bar (AY + L)

**Verdict: GAPS-FOUND.** The ≥2-consumer bar is mostly intact for the headline surfaces
(constellation, fourier-field, the two-variant slider — all already shipped on `at-dock-convergence`
and consumed externally), BUT the AY plan is materially STALE relative to the working tree, names
hard-gate proofs that do not exist, and the storybook-prune lane (W-SB1) prunes only DEMO ROUTES
while leaving the underlying substrate-without-external-consumer COMPONENTS (`header-ribbon`,
`glass-panel`, `useTokenColor`) in tree as library-orphans. There is also a genuine dead export
(`evalFourier`) on a published subpath, and a SECOND bespoke-copy class (the slides
feedback-coder Fourier deck arm) the plan never accounts for.

Scope read: `AY.md`, `AUDIT-LEDGER.md §B`, `PROMPT-CORPUS.md §B`, `docs/audits/overfitting-audit.md`,
`L.md`, plus live source on branch `at-dock-convergence` (HEAD `fba6262`) and the slides + speedtest
working trees.

---

## Finding 1 — STALE PLAN: AY re-describes already-landed AX work as fresh waves (planning-coherence BLOCKER for the H lane)

The AY plan (`AY.md:39`) asserts "AX is at `at-dock-convergence` … glass-ui already exports
`Constellation`, `Aurora`, `GooBlob`, `GlassDock` — AY PERFECTS them". But three of the H-lane's
NEW surfaces it lists as work-to-do are ALREADY LANDED and consumed on this very branch:

- **Constellation click-warp (W-CON2 headline).** `AY.md:53` plans "Click WARPS the anomaly/found
  dot → the nearest node to the cursor (animated, eased)". This is DONE: `Constellation.vue:40-44,52,70-78`
  ships `warpOnClick` (AX.W17 — git `45cfb79 feat(constellation): W17 — click-to-warp focal`), with
  the engine-owned `field.warp.{x,y}` spring and a live π proof `scripts/proof-constellation-warp-live.mjs`
  (real fail-closed driver, not a scaffold). The AUDIT-LEDGER row #2 (`AUDIT-LEDGER.md:21`) marks it
  "UNADDRESSED" — FALSE against HEAD.
- **Slider consolidation (W-SLD1).** `AY.md:73` plans "Collapse the slider zoo → `glass-scrubber` +
  `spectrum`". DONE: `src/components/ui/slider/index.ts:34-66` ships EXACTLY two variants — `standard`
  (the integrated-cylinder glass scrubber) + `spectrum` (AX.W59 — git `a730782 feat(slider)`). The
  ledger row #9 (`AUDIT-LEDGER.md:28`) marks it "DEFERRED" — FALSE.
- **Fourier-field abstraction (W-FF2).** `AY.md:63` plans "Abstract fourier-field into a glass-ui
  element (≥2-consumer bar or formally book)". DONE: `src/components/custom/fourier-field/FourierField.vue`
  exists, ships on the `/fourier-field` subpath (`package.json:296-298`, `src/subpaths/fourier-field.ts`),
  and is consumed by TWO external slides (`slides/src/decks/feedback-coder/slides/Slide01.vue:10` +
  `Slide05.vue`). The ledger row #8 (`AUDIT-LEDGER.md:27`) marks it "DEFERRED".

**Why this is an H-lane defect, not just sloppy bookkeeping:** the overfitting bar is evaluated
against the REAL tree at close. If the AY plan dispatches W-CON2 / W-SLD1 / W-FF2 as greenfield
"abstract + export" waves, an agent will re-introduce a SECOND warp seam, a THIRD slider variant, or
a parallel fourier element — the exact substrate-duplication the ≥2-bar exists to prevent. The plan
must be re-grounded to HEAD FIRST: every W-CON*/W-SLD*/W-FF* row restated as "VERIFY-and-perfect the
landed surface", not "build". The ledger statuses (#2/#8/#9) are wrong and will mislead the close
audit's "did we do it?" pass.

---

## Finding 2 — DEAD EXPORT on a published subpath: `evalFourier` is a library-orphan

`src/components/custom/fourier-field/index.ts:4` re-exports `evalFourier` from `math.ts:39`, and the
`/fourier-field` subpath barrel (`src/subpaths/fourier-field.ts`) re-exports the whole index — so
`evalFourier` is on the PUBLIC subpath surface. Usage grep (`rg "evalFourier" src/ demo/`): the ONLY
hits are the definition (`math.ts:39`) + the re-export line (`index.ts:4`) + a jsdoc `{@link evalFourier}`
reference. **Zero call sites anywhere** — not in `FourierField.vue` (which uses `positionsAt` +
`makeEllipticSpectrum`, never `evalFourier`), not in demo, not in the two slides consumers.

Per `docs/audits/overfitting-audit.md` verdict precedence this is `library-orphan` (exported,
0 sites) — the strongest overfitting signal for a public library. Triage: delete the export (and the
function unless it earns its keep as internal math), OR wire a consumer. No `consumer-evidence`
doc exists, so there is no `keep-current` defense. AY has no wave that catches this; W-CLOSE1's
"overfitting audit" is the only candidate, and it is unscoped to fourier-field.

Sibling note: `comp` (`math.ts:25`) and `BasisComponent` are exported on the same subpath but ARE
used internally (`math.ts:126-138`, `FourierField.vue:136`), so they clear the bar as internal-multi-site.
Only `evalFourier` is dead.

---

## Finding 3 — W-SB1 prunes the ROUTE but leaves the ORPHAN COMPONENT (substrate-without-external-consumer survives)

The W-SB1 prune (`AY.md:79`) is route-scoped: "remove header-ribbon/glyph-face/disco-glyph routes …
remove icon-button-token-ladder/use-token-color stray routes". But removing a DEMO ROUTE does not
resolve the substrate-without-consumer question for the underlying COMPONENT, which is the H-lane's
binding test. Three artefacts survive as library-orphans after the planned route prune:

- **`header-ribbon`** — `src/components/custom/header-ribbon/` + the `/header-ribbon` subpath
  (`src/subpaths/header-ribbon.ts`, `package.json`) + `HeaderRibbonProps` re-exported in `api/index.ts`.
  Consumers (`rg "HeaderRibbon|header-ribbon" src/ demo/`): only its OWN demo story
  (`demo/stories/navigation/header-ribbon.vue`) + `manifest.ts` + the api type re-export. ZERO src
  consumers, ZERO external consumers (the only slides hit is a markdown design doc, not code). After
  W-SB1 deletes the route, the component + subpath + api type are a published surface NOBODY uses.
- **`glass-panel`** — `src/components/custom/glass-panel/` + `/glass-panel` subpath. Consumers: 2 demo
  stories (`substrates/glass-panel.vue`, `foundations/paper-glass.vue`) + `glass.css` + api type. No
  src component consumer, no external consumer. W-SB1 says "fix glass-panel" — fixing a story does not
  answer whether the COMPONENT clears the ≥2-consumer bar.
- **`useTokenColor`** — exported from the ROOT barrel (`src/index.ts`) + `composables/dom/index.ts`.
  Consumers: 2 demo stories + the manifest. CRITICAL: `useResolveTokenColor.ts:18-22` explicitly states
  it is NOT a consumer of `useTokenColor` ("NOT `useTokenColor`: … a sibling … not a rename"). So
  `useTokenColor` has ZERO src consumers and ZERO external consumers — a root-barrel library-orphan.
  The speedtest `useMeterTokenColors` (`speedtest/src/.../meter/useMeterTokenColors.ts`) is a separate
  speedtest-local composable, NOT a consumer of glass-ui's `useTokenColor`.

**The fix the plan needs:** W-SB1 (or W-SB2's speedtest-boundary sibling) must take a verdict on each
ORPHAN COMPONENT — keep with a named ≥2-consumer roadmap, or RETIRE the component + subpath + api type
(clean break, per the no-legacy precept), not merely delete the demo route. A route-only prune that
leaves the orphan published is the substrate-without-consumer-binary invariant (L invariant 8) violated.

---

## Finding 4 — UNNAMED second bespoke-copy class: the slides feedback-coder Fourier deck arm

The AY/L plan names exactly ONE bespoke-copy to kill: the slides `constellation.ts`
(`AY.md:54`, `L.md:56`, "the exemplar to KILL"). But the binding precept is "slides consume perfected
glass-ui components, NO bespoke copies" — a CLASS, not a single instance. The slides feedback-coder
deck already correctly consumes `@mkbabb/glass-ui/fourier-field` (`Slide01.vue:10`, `Slide05.vue`) —
GOOD — but it ALSO carries a deck-LOCAL Fourier theme + design corpus
(`slides/src/decks/feedback-coder/theme.css`, `DESIGN-FOURIER.md`, `DESIGN-FOURIER-v2.md`,
`AUDIT-FOURIER.md/-v2.md`) re-pointing tokens (`--m-red: var(--viz-fourier)`) and asserting a
deck-local Fourier identity. The L tranche's W-ADOPT (`L.md:56`) only deletes `constellation.ts`; it
never audits the feedback-coder Fourier arm for bespoke-token drift vs the library's fourier-field
token surface. This is the same drift class the constellation exemplar represents.

**Why H-lane:** the convergence directive ("converge on a glass-ui library optimum",
`PROMPT-CORPUS.md:104`) is per-component, and the feedback-coder Fourier tokens are a second
divergence surface. L.W-ADOPT's hard gate ("bespoke copy gone") is single-instance; it should be
"NO deck consumes a bespoke copy of a befitting glass-ui visual; deck-local token re-points are
documented presets, not silent forks" with the feedback-coder Fourier arm explicitly audited.

---

## Finding 5 — UNDER-SPECCED hard gates: 4 named AY proofs do not exist; `proof:touch-target` is named but absent

`tranche/AND-WAVE-SPEC.md §"Hard gate"` requires an evidence-backed, artefact-verifiable gate.
Several AY hard gates name `proof:*` scripts that DO NOT EXIST in the tree, so the wave rows have
no enforceable bar:

- **`proof:no-bespoke-constellation`** (`AY.md:54`, W-CON3 gate) — NOT in `scripts/`, NOT in
  `package.json`. The "bespoke copy gone" gate is unenforced.
- **`proof:touch-target`** (`AY.md:71`, W-SCALE1 gate — "every interactive atom ≥ floor on coarse")
  — NOT in `package.json`. Note the `--touch-target: 2.75rem` token + the `--control-floor`/
  `max(scaled, floor)` system ALREADY exist (`tokens.css:1394-1403,1788`), so W-SCALE1 is partly a
  VERIFY-existing wave, not greenfield — but with no gate script it cannot close on evidence.
- **`proof:no-orphan-demo-route`** (`AY.md:79`) — script EXISTS (`scripts/proof-no-orphan-demo-route.mjs`)
  but is NOT wired into `proof:all`/CI; it cannot gate W-SB1 if it never runs.
- **`proof:speedtest-boundary`** + **`proof:aurora-painterly-statistics`** + **`proof:dock-animation-live`**
  — scripts exist on disk but their CI/`proof:all` wiring is unverified; the AY plan must state which
  are CI-promoted vs local-only (the W-LIVE1 decision touches this but does not enumerate them).

The H-lane consequence: a wave whose ≥2-bar / no-bespoke / orphan-route gate is a non-existent
`proof:*` cannot CLOSE on evidence — it closes on a grep or a claim, exactly the insufficiency the
spec forbids (`TRANCHE-AND-WAVE-SPEC.md:42` — "API exists checks are insufficient").

---

## Chronic-miss read

The storybook route-prune SPECIFICS (corpus #11, `AUDIT-LEDGER.md:68`) are flagged CHRONIC
("IA restructured, the named-route cull not finished") across AX→AY. The H-lane sharpening: the cull
keeps being framed as a ROUTE prune, so each tranche removes a story and re-flags "done", while the
underlying orphan COMPONENTS (header-ribbon/glass-panel/useTokenColor) persist on the public surface
tranche after tranche. This is the substrate-without-consumer invariant deferred under cover of a
route prune — it will recur in AY exactly as it did in AX unless W-SB1 is re-scoped to take a
component-level RETIRE-or-keep verdict with a deletion-proof gate.

---

## waveSpecInputs (concrete material for the authored wave specs)

1. **Re-ground AY to HEAD (new W0-REGROUND, blocks all Band A perfection waves).**
   - Defect: `AY.md:39,53,73,63` + `AUDIT-LEDGER.md:21,27,28` describe landed AX work (warp AX.W17,
     slider AX.W59, fourier-field) as work-to-do; statuses #2/#8/#9 are wrong vs HEAD `fba6262`.
   - Objective: restate W-CON2/W-SLD1/W-FF2 as VERIFY-and-perfect the existing surface; correct the
     ledger statuses.
   - Edit sites: `docs/tranches/AY/AY.md` (W-CON2/W-SLD1/W-FF1/W-FF2 rows), `AUDIT-LEDGER.md §B` rows
     #2/#8/#9.
   - HARD GATE: each re-grounded row cites the landed git SHA (`45cfb79`/`a730782`) + the live
     `Constellation.vue:52` `warpOnClick` prop / `slider/index.ts:34` two-variant CVA / `Slide01.vue:10`
     fourier consumer as the "already landed" evidence; the ledger statuses re-marked DONE/PARTIAL with
     the file:line evidence.

2. **Kill the `evalFourier` library-orphan (fold into W-FF2 or W-CLOSE1).**
   - Defect: `src/components/custom/fourier-field/math.ts:39` `evalFourier` exported on `/fourier-field`
     (`index.ts:4`), 0 call sites anywhere.
   - Objective: delete the export (and the function if no internal use survives), clean break.
   - Edit sites: `src/components/custom/fourier-field/index.ts:4`, `math.ts:39`.
   - HARD GATE: `rg "evalFourier" src/ demo/ ../slides/src ../speedtest/src` returns only-removed; the
     `/fourier-field` subpath dts probe (`verify-export-types`) green without `evalFourier`.

3. **Re-scope W-SB1 from route-prune to component-RETIRE verdict.**
   - Defect: `AY.md:79` prunes routes; the orphan components survive — `header-ribbon`
     (`src/components/custom/header-ribbon/` + `/header-ribbon` subpath + `api/index.ts` HeaderRibbonProps;
     0 src + 0 external consumers), `glass-panel` (same shape), `useTokenColor` (`src/index.ts` root-barrel
     export, 0 src + 0 external consumers; `useResolveTokenColor.ts:18-22` explicitly disclaims consuming it).
   - Objective: per orphan, RETIRE (component dir + subpath + `package.json` export + api type, clean break)
     OR keep with a named ≥2-consumer roadmap entry; route prune is downstream of the verdict.
   - Edit sites: `src/components/custom/{header-ribbon,glass-panel}/`, `src/subpaths/{header-ribbon,glass-panel}.ts`,
     `package.json` exports + `typesVersions`, `src/api/index.ts`, `src/index.ts` (useTokenColor),
     `src/composables/dom/index.ts`, the demo stories + `manifest.ts`.
   - HARD GATE: a deletion-proof gate (`proof:no-orphan-demo-route` WIRED into `proof:all` + a new
     component-orphan check) — every `custom/` component + subpath + root-barrel composable has ≥2
     non-self consumers OR a `docs/consumer-evidence/<artefact>.md`; build + `verify-export-types` green
     post-retire.

4. **Author the missing gate scripts (fold into the waves that name them).**
   - Defect: `proof:no-bespoke-constellation` (W-CON3) + `proof:touch-target` (W-SCALE1) named in
     `AY.md` but absent from `scripts/`/`package.json`; `proof:no-orphan-demo-route` exists but is
     un-wired.
   - Objective: author each named gate as a real artefact-verifiable script and wire into `proof:all`.
   - Edit sites: `scripts/proof-no-bespoke-constellation.mjs`, `scripts/proof-touch-target.mjs`,
     `package.json` (`proof:*` + the `proof:all` aggregator + CI).
   - HARD GATE: `npm run proof:no-bespoke-constellation` exits non-zero when `slides/src/.../constellation.ts`
     exists; `proof:touch-target` reads computed coarse-pointer heights ≥ 44px on the interactive atoms
     (runtime observation, not grep); both green at the owning wave's close.

5. **Extend the bespoke-copy precept to a CLASS (fold into L.W-ADOPT + AY W-CON3).**
   - Defect: `L.md:56` + `AY.md:54` name only `constellation.ts`; the slides feedback-coder Fourier
     deck arm (`slides/src/decks/feedback-coder/theme.css` `--m-red: var(--viz-fourier)`, DESIGN-FOURIER*)
     is a second divergence surface unaccounted for.
   - Objective: audit EVERY befitting visual for a bespoke copy; document deck-local token re-points as
     named presets (per the presets-in-consumers precept), not silent forks.
   - Edit sites: `slides/src/decks/feedback-coder/theme.css` (document the `--viz-fourier` re-point as a
     preset), `slides/docs/tranches/L/L.md` W-ADOPT row.
   - HARD GATE: a slides-side `proof:no-bespoke-visual` enumerating each befitting glass-ui visual and
     asserting no deck reimplements it (constellation + fourier + aurora + blob); feedback-coder Fourier
     arm consumes the lib component (already true) with a documented preset, no silent token fork.

## Convergence criterion (the H-lane acceptance bar)

Every NEW or perfected AY/L surface — Constellation (+warp+easter-eggs), the two slider variants
(standard/spectrum), FourierField + its `/fourier-field` math exports, the touch/type-scale tokens,
aurora/blob — has ≥2 non-self consumers OR is exported with a `docs/consumer-evidence/<artefact>.md`
OR is a demo-private helper; `evalFourier` and the header-ribbon/glass-panel/useTokenColor orphans are
RETIRED or evidenced; NO consumer (slides decks, speedtest) carries a bespoke copy of a befitting
glass-ui visual; every AY hard gate names a real, CI-wired, artefact-verifiable `proof:*` (no
named-but-absent gate); and the AY plan + ledger are re-grounded to HEAD so no wave re-builds a
landed surface. Machine-locked by a `proof:overfitting-ay` orphan-scan + `verify-export-types` green
+ the deletion-proofs for the retired surfaces.
