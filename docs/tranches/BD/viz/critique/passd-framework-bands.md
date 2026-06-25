# Pass-D first-principles challenge — FRAMEWORK band (Band 12) + UNION BREADTH (Bands 7-9)

Branch `prototype/liquid-dock`. Traced the ACTUAL CODE (file:line), not the doc claim.
5-point bar: NECESSITY · CORRECTNESS · SOTA · NOT-OVERFIT(D7) · WORKS.

VERDICT SUMMARY: Band-12 framework is mostly sound, but **W-LAVA-FIELD carries a 3-way
contradictory consumer story that resolves to 1 honest consumer** (the HARDEST finding).
Union breadth bands 7-9 are anchored to REAL demonstrable defects (raw `<button>`s, missing
`.glass-control-track`, etc.), not doc-fictions — they are genuinely under-built, not
falsely-greened. No new false-green gate in this band's existing gates (the two flagged
existing gates pair a regex source-arm with a binding π).

---

## HARDEST FIRST — W-LAVA-FIELD: the ≥2-consumer claim is a 3-way contradiction → 1 honest

`useLavaField` does NOT exist at HEAD (`find src -iname "*lava*"` = 0; net-new). The wave
asserts ≥2 GPU-SDF consumers. Three BD docs name three DIFFERENT second-consumers:

1. `VIZ-FINAL-ROSTER.md:22` + `VIZ-BAND-PLAN.md:109` → **goo-dot-matrix** (the GPU-SDF), and
   explicitly REJECT the dock CSS-filter goo-split as "INCOMPATIBLE mechanism, NOT the 2nd."
2. `framework/lava-lamp-fluid.md:355` (§8 "two binary consumers") → **the dock goo-split**
   (`fission`, the CSS `feGaussianBlur`) — the EXACT mechanism doc #1 rejects.
3. `PASSD-FOLD.md:28` → **resolves to ONE**: goo-dot-matrix consumes the ORBIT
   `useBlobSatellites`, NOT a separable lava sim; the CSS-filter dock-fission is incompatible
   → "keep lava blob-LOCAL until a real 2nd GPU-SDF consumer."

TRACED THE CODE — PASSD-FOLD is right, the roster is stale:
- `goo-dot-matrix/composables/useGooDotMatrix.ts:42` imports `useBlobSatellites` AND splices
  `sceneDistG`/`smin` byte-identically (`goo-dot.frag.ts:18` `import { METABALL_FRAGMENT_SRC }`,
  `goo-dot.wgsl.ts:26` `import { METABALL_WGSL }`). goo-dot-matrix consumes goo-blob's ENTIRE
  field-sim WHOLESALE via the `proof:viz-hybrid` byte-fence splice — it is the SAME field
  re-rendered as dots, NOT an independent consumer of a separable `useLavaField` smin
  primitive. Factoring `useLavaField` out gives goo-dot-matrix as a "consumer" only by
  transitive splice it ALREADY has — that does not clear J-inv-10's ≥2-binary bar.

→ ACTION: VIZ-FINAL-ROSTER.md:22 + VIZ-BAND-PLAN.md + VIZ-DAG.md must adopt PASSD-FOLD's
resolution (keep lava blob-LOCAL; do NOT mint a hoisted `useLavaField` facility on a contrived
2nd consumer). The honest scope is the blob's OWN opt-in lava register (W-BLOB-LAVA, cage-
frozen) — a blob-local generalization of `useBlobSatellites`, not a published primitive.
This is the D7-overfit trap: a "reusable engine" with 1 real consumer.

---

## W-VIZ-KEYBOARD — necessity REAL, projection-risk REAL but un-built (a guardrail, not a keymap)

- The gap is GENUINE: grepping `keydown|onKeyDown|useKeyboardShortcuts|@keydown` across all 7
  viz dirs (aurora/goo-blob/concentric/fourier-field/constellation/dot-flow-field/dot-matrix)
  = ZERO handlers at HEAD. Zero viz keyboard interaction ships. Necessity confirmed.
- The substrate is real: `src/composables/keyboard/useKeyboardShortcuts.ts` ships
  `registerShortcut`/`useRegisteredShortcuts`/`parseCombo`/`matchesCombo` (8.1KB) — a genuine
  `/keyboard` primitive to compose. `useVizKeyboard` would wrap it, no re-fork.
- The PROJECTION RISK (challenge (a)) is REAL and already FLAGGED: `VIZ-BAND-PLAN.md:135`
  states "scope the keymap to per-viz DATA (NOT an aurora keymap projected onto 9 viz;
  concentric has no focal axis)." TRACED: `concentric.vue` axes are all global scalars
  (`familyCount`/`baseWavelength`/`beatDetune`/`axisB` — `concentric.vue:130-166`); there is
  NO focal/pointer-targeted element for arrows to drive. An aurora-style "move the focal
  nucleus" keymap is MEANINGLESS for concentric. BUT: the per-viz keymaps are NOT yet
  specified — the plan carries the guardrail, not the built DATA keymaps. That is the
  substance gap: W-VIZ-KEYBOARD must ship a per-viz keymap TABLE (concentric → step
  familyCount/wavelength; aurora → focal nucleus; fourier → head_t scrub), not a shared
  arrow-handler. Verify at build that no two vizzes share an identical "focal" binding that
  one of them has no focal axis for.

## W-VIZ-CONFIGURATOR (USE-EXISTING) — CORRECT, and the lift is genuine work (not vapor)

- `demo/stories/substrates/VizStudio.vue` EXISTS (162 LOC, BC.W-VIZ-CONFIGURATOR-SUITE) and
  composes `<Configurator :aside-side="'right'">` (line 119-120, pinned). The BD
  schema-driven god-VizStudio proposal WOULD be a regression — USE-EXISTING is right.
- The lift is REAL, substantive work: only `aurora.vue` consumes VizStudio at HEAD
  (`grep -rln VizStudio demo/` = aurora + the chassis itself). The 4 named lift targets still
  hand-roll: `concentric.vue` (276L) hand-rolls bare `<Configurator>` not VizStudio;
  `dot-matrix.vue` (99L) + `dot-flow-field.vue` (99L) use bare `<Switch>` — the EXACT
  "two-state Switch" defect VizStudio was built to kill; `constellation.vue` (759L)
  hand-rolls `<Switch>` controls (line 473). Enrolling 4 studios onto the chassis is genuine.

## UNION BREADTH (Bands 7-9) — REAL hardening, not assumed; anchored to demonstrable defects

Spot-checked against actual code — these are under-BUILT, not falsely-GREENED:
- **W-DATA-RAW-BUTTONS (Band 9)**: raw `<button>` REAL in `infinite-scroll.vue:72`,
  `timeline-segmented.vue:190/197`, `timeline-continuous.vue:222/229`, `virtual-section.vue:84`.
  Demonstrable defect, not doc-fiction.
- **W-CONTROL-GLASS (Band 7)**: `.glass-control-track` = 0 hits in `src/` — correctly labeled
  net-new build (the switch/checkbox/radio glass register genuinely missing).
- **W-DESHADCN-GATE (Band 9)**: extends `proof:glass-cohesion` + `proof:no-shadcn-default`
  (BOTH exist on disk). NOT a false-green: glass-cohesion's regex source-arm
  (`proof-glass-cohesion.mjs:64,144` `GLASS_MARKER.test`) pairs with the binding π
  `glass-cohesion.spec.ts` (per-tone final-alpha getComputedStyle) — the right two-arm split
  (regex = source presence, π = compiled-color truth). This is the CORRECT pattern, NOT the
  systemic numeric-masquerade false-green class.
- **W-VIZ-CONFIGURATOR-SUITE gate** (the BC gate the lift extends): `proof-viz-configurator-
  suite.mjs:27-28` explicitly defers binding truth to the π `viz-configurator-suite.spec.ts`;
  its regex arm checks structural composition (`<VizStudio>`/`<Configurator>` presence) — the
  right job for an "enrolled onto chassis" gate. Not false-green.

## OVER-REACH ALREADY CUT (verify it stays cut)

`VIZ-BAND-PLAN.md:135` already CUT the worst over-reach: `useVizInteraction`/
`W-VIZ-INTERACTION-SPINE` (a 3-line bag once the shipped `usePointerVelocityField` is
stripped — each viz composes directly), and DEMOTED `useEmotionalState` to blob-LOCAL
(aurora deleted its mood door AX.W10 → contrived 2nd consumer). These cuts are correct and
must survive the union fold — no re-mint of a wrapper that re-forks the shipped pointer field.
