# Inventory — W-misc-planned (W22 · W28 · W29 · W36 · W44 · W48 · W49 · W51)

Step-back inventory of the AX "misc planned" lane: the font reconciliation (W22, complete),
the chassis-retire cross-repo DAG (W28→W29), the forced-colors a11y skin (W36), the
dark-contrast token (W44), the glass-material demo reauthor (W48), the math-paper×latex-paper
transposition (W49), and the library-wide `--ui-scale` umbrella (W51). HEAD `c72d2ac`,
branch `at-dock-convergence == master`, glass-ui 3.8.0 published. Read-only; planning only.

## Per-wave status (live-verified at source)

| Wave | Title | Plan status | Source-verified at HEAD | Wave doc | Audit JSON |
|---|---|---|---|---|---|
| W22 | font register reconciliation | **complete** | DONE — `src/fonts/fraunces/` ABSENT, 0 Fraunces in `src/styles/`, `proof-font-axes` RETIRED, `proof-font-cascade-live` SHIPS | yes (50 KB) | yes (full GREEN ledger) |
| W28 | speedtest native-first receive | **planned** (born-RED) | NOT STARTED — `coordination/CONSTELLATION.md` ABSENT; no sibling native copies; chassis/metric subpath imports survive in speedtest+muster | yes (44 KB) | NO |
| W29 | repatriation prune + orphan prune | **planned** (born-RED) | NOT STARTED — all 5 families ship (`instrument-chassis`, `instrument-rail`, `metric-cell`, `metric-stack`, `metric-pill` dirs PRESENT) | yes (60 KB) | NO |
| W36 | forced-colors glass-language skin | **planned** (born-RED) | NOT STARTED — forced-colors block does NOT cover glass tiers/StatusDot/floating; `proof-forced-colors-skin` ABSENT | yes (48 KB) | NO |
| W44 | dark-mode semantic-token contrast (D10) | **planned** (born-RED) | NOT STARTED — dark `--destructive` still `hsl(0 62.8% 30.6%)` at both arms (`:1605`/`:1727`); no `--destructive-text`; no `proof-dark-semantic-contrast` | yes (25 KB) | NO |
| W48 | glass-material demo reauthor (D8) | **planned** (born-RED) | NOT STARTED — `glass-material.vue` composes NO `useSpecularTracking`/`--glass-tint-strength`, still carries 3× `glass-btn`; no `proof-glass-material-demo` | yes (28 KB) | NO |
| W49 | math-paper composes latex-paper (D16) | **planned** (born-RED) | NOT STARTED — `math-paper.vue` has 0 latex-paper/useKatex/MathBlock refs; `latex-paper`+`katex` not in `package.json` | yes (32 KB) | NO |
| W51 | library-wide `--ui-scale` (D18 umbrella) | **planned** | NOT STARTED — no `--ui-scale` token, no `proof-ui-scale`; **NO WAVE DOC AUTHORED** (only referenced from W45/W50) | **NO** | NO |

**Net: 1 complete (W22), 7 planned/born-RED. W22 alone has a written audit JSON.** Six of
the seven planned waves carry a full wave-spec doc; **W51 has no wave doc** — it is the only
lane member that is un-specced (see Gaps).

---

## W22 — font register reconciliation — COMPLETE (audited GREEN)

The only DONE wave in the lane. Excised Fraunces wholesale (path-a EXCISE per the AS-P5-vs-W22
blocker adjudication — recorded BEFORE any source edit per RATIFY-BEFORE-IMPL). The library
DEFAULT register now == what live surfaces render (Plus Jakarta text/display, Fira Code mono).

- **Verified at HEAD:** `src/fonts/fraunces/` dir gone (the 67388-byte woff2 + the @font-face),
  0 `Fraunces` refs in `src/styles/`, `proof-font-axes` RETIRED (script + package.json +
  gates.mjs + ci.yml registrations gone — a deletion-proof), `proof-font-cascade-live.mjs`
  ships (the new π-lane gate with a device-free STRUCTURE arm + a fail-CLOSED RENDER arm).
- F0-F3 all DONE: ONE register model + ONE token source; the WONK/SOFT axes machinery deleted;
  the `data-typography-preset="brand-uniform-sans"` indirection deleted from the demo; the
  Fraunces option removed from the configurator. `.cm-serif` is the ONE allowed serif survivor
  (a DISTINCT Computer-Modern math voice, repointed to `var(--font-serif-math, serif)`).
- **Carry-into-tranche (NOT a W22 gap — routed):** the cross-constellation Fraunces register
  repoints (speedtest preset-undo, words body-defaults-to-serif anti-pattern, slides re-ground)
  are NAMED in W22's `consumerRepointAnnex_W34` and ROUTED to **W34/W35** as per-consumer
  adoption legs — glass-ui writes NO sibling source. value.js self-supplies Fraunces (zero
  breakage). This is the no-silent-deferrals discharge, not an open W22 item.
- **Residual live obligation:** the W22 audit JSON records the π RENDER arm
  (`font-cascade-live.spec.ts`) as SKIP-in-worktree / fail-CLOSED-on-device. The binding
  VISUAL-TRUTH close (light+dark, 3 viewports, demo+speedtest+words, paired-π DELTA) is an
  orchestrator-device capture. Verify it was actually captured before treating W22 as fully
  closed on the cardinal-lesson axis (the JSON says "the orchestrator captures" — confirm it did).

---

## W28 + W29 — the chassis-retire cross-repo DAG (the lane's sequencing core)

This is the most architecturally load-bearing pair in the lane. The D12 user defect ("I thought
the instrument chassis was to be removed?") is owned here — the convergence-1 plan confirmed
the chassis retire is ALREADY PLANNED (W29 authors the strike, W28 the native-first receive),
**NOT a stale survivor and NOT a new wave** (CONVERGENCE-PLAN.md line 45). Both born-RED at HEAD.

### The DAG: `R-clean → R0-receive (W28) → W-prune (W29) → R1-bump (W34/W41)`

The inv-16' native-first / prune-after wall is the whole shape: glass-ui MUST NOT prune
`instrument-chassis`/`metric-cell`/`metric-stack` while speedtest + muster still import them
(≥2 live consumers). The consumers RECEIVE native copies FIRST (W28), THEN glass-ui prunes
(W29), THEN consumers bump (R1, routed to W34/W41). Inverting the order = ≥16 dangling imports
across two production apps = a build break in both.

### W28 (native-first receive) — NOT STARTED, blocked on the dirty-sibling wall

- **glass-ui's deliverable is ANNEX AUTHORSHIP, not source** — `coordination/CONSTELLATION.md`
  (band-K + gate-0) + the `W28-…json` born-RED ledger + the speedtest/muster native-receive
  annex specs. The receive IMPL runs in the SIBLING sessions under their own tranches.
- **Two RED witnesses at HEAD, both confirmed live in this inventory:** (1) no
  `proof:repatriate-local` on either sibling + ≥16 subpath imports survive; (2) **neither
  sibling presents a clean tree** — speedtest carries `stash@{0}` + a 23-ahead reconcile debt,
  muster is dirty on `master`. The gate-0 `R-clean` is the structural antidote — the exact
  dirty-sibling wall that muster-blocked the prune across AV/AW.
- **`coordination/CONSTELLATION.md` is ABSENT** — confirmed. W28 OPENS this file. It is also
  the file W34/W35/W41 extend, so W28 is the constellation-coordination-doc keystone for the
  whole cross-repo band.
- **Sibling-receive specifics encoded in the annex:** speedtest lands `metric-cell` near
  ResultDetailSheet, `metric-stack` near ResultStack, instrument-chassis near
  App/MapView/ChartsView (dial AND spine); the native `metric-stack` ships a
  `--metric-stack-row-gap` token (discharges the ResultStack override-fight). muster lands all
  three across its 12-file surface (spine + glass variant + ChassisDivider +
  `InstrumentChassisPhase` type) and fixes the `TravelMatrix` flush-density impedance (it
  strips the glass-wash backplate today). False-coupling guard: native copies import only
  `vue`+`cn` — `MetricBadge` must NOT be dragged out (it is kept by fourier ×13 + value.js +
  muster ×6 + speedtest). SUBPATH_OWNED reconcile: stale `MetaballCanvas`/`useMetaballs`/
  `MetaballConfig` entries → `GooBlob` @ `/goo-blob`.
- **The visual-truth close is CROSS-REPO π** — a paired BEFORE/AFTER + DELTA on both siblings
  proving byte-equivalent native render (the metric grids + dial + spine are live chrome). The
  cardinal-lesson discipline is binding on the consumer repos, not only glass-ui.

### W29 (glass-ui-side prune) — NOT STARTED, the repatriate half gated on W28

- **All 5 families ship at HEAD — confirmed live:** `instrument-chassis`, `instrument-rail`,
  `metric-cell`, `metric-stack` dirs PRESENT + `metric-pill` PRESENT.
- **Two halves, both clean breaks (no shim, no `@deprecated` re-export):**
  - **(A) REPATRIATE-PRUNE** (instrument-chassis + metric-cell + metric-stack) — GATED on W28's
    native receive being GREEN on BOTH siblings. The decisive lens is
    generic-atom-vs-domain-composition (NOT raw consumer count) — `_DECISION.md`: "the
    instrument chassis is not general enough" + "Muster does not count".
  - **(B) ORPHAN-PRUNE** (instrument-rail + metric-pill) — NO native landing, NOT muster-gated,
    **parallelizes with W28** and must not be held hostage to the cross-repo receive.
    instrument-rail lost its sole consumer at AN-D6/D7/D11; metric-pill is the manufactured
    "speedtest stacked-pill default" speedtest never adopted (it routes through MetricBadge).
- **Six RED witnesses** including: the families on the FULL surface (the AW.W19 "subpath only"
  claim is FALSE at HEAD — `src/index.ts:118` puts instrument-chassis on the ROOT barrel, so a
  surviving dangling `export *` = build break); the `twin-line-divider` @utility loses both
  consumers atomically; the dead `variant="instrument-strip"` dock mode (0 live bindings, ~60
  lines of dock.css); FIVE gate scripts hardcode the families as fixtures; the MIGRATION.md
  `RETIRED (AV.W10)` binding-doc lie.
- **EDIT-ORDER INVARIANT (the build-break guard):** strike every re-export + fix the 5 gate
  scripts BEFORE deleting any dir, so `vue-tsc`/`build` never see a dangling `export *`. Per
  family: root barrel → subpath → api → package.json → gates → CSS → THEN the dir.
- **Coherence contract with W21:** W21 rewrites the MIGRATION.md lie to the un-retired TRUTH +
  authors `proof:no-retired-survivor` born-RED + adds the `/metric-pill` subpath; W29 makes the
  retired claim TRUE (the prune) + keeps the gate GREEN. **Sequence W21 BEFORE W29.**
- **Shared-file co-edits to reconcile:** `chart-chassis-palette.vue` (co-edited with W19's
  DiscoGlyph removal — the `--chart-*` ladder SURVIVES both, file NEVER wholesale-deleted);
  `dock.css` instrument-strip strike order vs W06's dock.css split; W25b's metric-badge recipe
  carve dependsOn W29's §8 ownership decision.

### Chassis-retire sequencing — the answer to the lane's headline question

The retire is correctly modelled as a 4-stage DAG, NOT a unilateral rip. Execution order:
1. **W21 FIRST** (MIGRATION.md un-retired truth + `proof:no-retired-survivor` born-RED + the
   `/metric-pill` subpath) — the baseline W29 prunes FROM. RATIFY which metric-pill path landed.
2. **W28 R-clean → R0** (the cross-repo receive) — blocked until BOTH siblings clear their dirty
   trees (speedtest stash + 23-ahead, muster master). The orphan-prune half of W29 can run in
   PARALLEL here (it is not W28-gated).
3. **W29 W-prune** (the glass-ui strike) — repatriate half opens behind W28's GREEN
   `proof:repatriate-local`; orphan half already done.
4. **W34/W41 R1-bump** (consumer pin-bump to the pruned AX cut, post-publish).

The chronic risk is the dirty-sibling wall at gate-0 (it muster-blocked AV/AW twice). W28's
`R-clean` gate-0 + the sibling-baseline-capture ritual is the structural fix, but it requires
the orchestrator to actually land each sibling on a clean known branch — a coordination
action, not a code one. This is the single highest-risk dependency in the lane.

---

## W36 — forced-colors / Windows-High-Contrast glass-language skin — NOT STARTED

- **Born-RED confirmed:** the only `@media (forced-colors: active)` block in `src/styles/`
  (`utilities.css:1084-1102`) is the AS-era focus-ring/silhouette patch — it covers 5
  focus-visible + 3 silhouette selectors and does NOT touch the 5-rung glass-material ladder,
  StatusDot hue identity, or floating surfaces (verified: no glass-tier coverage in the block).
  `proof-forced-colors-skin.mjs` ABSENT.
- **Gestalt:** ONE co-located skin (riding W25b's `glass-material.css`) GENERALIZES the
  focus-ring seed to the whole glass language — tier panes → `CanvasText` border, hue identity
  → bordered system glyph (shape/border, NOT chroma), focus → `Highlight`. Universal a11y
  obligation — NOT presets-in-consumer (the precept does not delegate it).
- **dependsOn W00 + W09.** Cross-cuts the glass-first-class band (CONVERGENCE-PLAN-2 line 38:
  "W36 ← coordinate the opaque a11y path with W54/W55") — the opaque escape (W54) + adaptive
  legibility (W55) share the forced-colors a11y axis.
- **Disjoint from W44** — W44 is normal dark-mode token contrast; W36 is the FORCED system
  palette where light/dark is irrelevant. Different axis, no shared file (W36 owns the
  forced-colors block, W44 owns the `--destructive` token rows).

## W44 — dark-mode semantic-token contrast (D10) — NOT STARTED

- **Born-RED confirmed:** dark `--destructive` is the unmodified shadcn `hsl(0 62.8% 30.6%)` at
  BOTH arms — `tokens.css:1605` (the `light-dark()` enhancement) + `:1727` (the `.dark` floor).
  At HEAD it is 1.75:1 as text over `--card` (under the 4.5 body floor) + 1.91:1 as a plate vs
  page (under the 3.0 graphic floor) — the user's illegible "Session expired" Alert (D10).
- **Gestalt:** lift the dark arm to `hsl(0 80% 60%)` (4.60:1 text/card + 5.03:1 plate/page) in
  BOTH arms in lockstep (the §2c fallback-floor contract). Token-first, dark-arm-ONLY, ZERO SFC
  edits in the single-token path. Two-token `--destructive-text` split is the RECORDED FALLBACK
  (the chart-label precedent), decided at the π-ratify step, NOT the default.
- **NEW gate `proof:dark-semantic-contrast`** — a device-free Arm A (parse tokens.css, resolve
  the dark cascade, compute WCAG, assert ≥4.6/≥5, lockstep clause, sibling-red sweep of
  `--like`/`--delete`/`--accent-red`) + a fail-CLOSED Arm B (axe `color-contrast` +
  `getComputedStyle` readback under `.dark`).
- **dependsOn W00, sequenced BEFORE W39** (so W39's dark a11y arm measures the corrected token;
  {detector: W39, fixer: W44}). This is one of the convergence "live-truth re-opens first"
  cohort (the user's loudest defects).

## W48 — glass-material demo reauthor (D8) — NOT STARTED

- **Born-RED confirmed:** `glass-material.vue` composes NO `useSpecularTracking` and writes no
  `--glass-tint-strength` (0 hits), still carries 3× `glass-btn` (the abused icon-button coerced
  wide via `!h-12 !w-44`). `proof-glass-material-demo.mjs` ABSENT.
- **The library grammar is SOUND** (W09/W20/W25b own + freeze it); the breakage is entirely in
  the DEMO — a story authored against the pre-W09 louder specular, never rewired after W09 made
  the recipe dormant-at-rest (`--glass-specular-intensity-rest: 0`). Four RED witnesses: dead
  unwired specular, inert 0%-strength tint, abused glass-btn, device-less subtle rim.
- **Gestalt:** REAUTHOR the SFC body to BIND the shipped seams — compose `useSpecularTracking` +
  `:style="specularStyle" @pointermove`; set BOTH `--glass-tint-source` + non-zero
  `--glass-tint-strength`; replace glass-btn with `.glass-card` + `<Button variant="glass">`;
  add a rim on/off contrast device. ZERO library edits.
- **The critical gate insight:** the existing `proof:glass-material-unified`/`-sota` are
  LIBRARY-grammar gates that PASS green over this broken demo (they never scan the SFC). The new
  `proof:glass-material-demo` is the demo-route falsifier. This is the SAME meta-class as D7
  (blob-mood) + the W20 card-story — a cross-story class-guard is RECORDED for the W33 close, NOT
  authored here.
- **dependsOn W09 (complete) + W00; SEQUENCE-AFTER W18** (W18 may relocate the SFC — they must
  not race the same file).

## W49 — math-paper composes latex-paper (D16) — NOT STARTED

- **Born-RED confirmed:** `math-paper.vue` has 0 latex-paper/useKatex/MathBlock refs (a
  hand-rolled Unicode `∑`/`∫`/`Sₙ` + `<sub>`/`<sup>` salad); `latex-paper`/`katex` not in
  `package.json`. Three RED witnesses: the glyph salad, the uncomposed sibling lib, the absent
  theorem/equation-number environments.
- **Gestalt (architectural transposition):** add `@mkbabb/latex-paper@0.2.1` + `katex` as
  glass-ui DEV/demo deps via the contract-v2 sibling path (like keyframes.js/value.js);
  reauthor `math-paper.vue` onto `useKatex()`/`MathBlock`/`MathInline`/`Theorem`; du
  Bois-Reymond → a real `<Theorem>`, Dirichlet–Jordan → a numbered `<MathBlock>`.
- **The token-bridge constraint:** re-express the math/theorem chrome in glass-ui's token idiom,
  do NOT import latex-paper's `theme.css` raw (it carries the legacy `hsl(var(--token))`
  double-wrap anti-pattern). KaTeX's own font-metric CSS imports as-is (not token-bearing).
- **dependsOn W00; SEQUENCE-AFTER W18.** Dedup'd from W43 (fourier-FIELD graphics, distinct
  surface).

## W51 — library-wide `--ui-scale` (D18 umbrella) — NOT STARTED + UN-SPECCED

- **The lane's only un-authored wave.** No `--ui-scale` token, no `proof-ui-scale`, and **NO
  `AX.W51-*.md` wave doc exists** — it is referenced only from W45 and W50, which model
  themselves as SPECIALIZATIONS that read it.
- **Scope (from CONVERGENCE-PLAN.md line 29):** the shadcn-vue compact defaults (h-9/h-8,
  text-sm/text-xs, size-4 glyphs) read too small on mobile AND desktop. Mint ONE coordinated
  `--ui-scale` (default >1 comfortable; ~1.0 desktop / ~1.5 coarse-pointer) threaded through the
  CVA base sizing + the typography ladder so height/padding/gap/font/glyph grow in lockstep.
  Author `proof:ui-scale` (device-free: no stray h-9/text-sm/size-4 literal in the CVA bases;
  coarse-pointer amplifies; π arm: 1.5× size+font parity under coarse-pointer).
- **The reconcile architecture (load-bearing):** **W45's `--dock-scale` + W50's `--dropdown-text`
  become SPECIALIZATIONS that read `--ui-scale`** — ONE scale system, not three. The convergence
  plan SEQUENCES **W51 BEFORE W45/W50** so they specialize the global axis. W50's doc already
  carries a forward-reconcile note + a RATIFY hinge on the W51 ordering, and W45's `--dock-scale`
  block is co-driven by the same root scalar.

---

## DEFERRED items that FOLD INTO this tranche

- **D12 (chassis retire)** — folds into W28/W29 (confirmed NOT a new wave; the sequencing is the
  deliverable). The user's "I thought the chassis was removed" is the live-truth that the retire
  was planned-but-blocked on the muster wall across AV/AW.
- **D8 (glass-material broken) → W48; D10 (dark contrast) → W44; D16 (math-paper) → W49; D18
  (small components umbrella) → W51** — all four conv-1 defects own their net-new wave; none is a
  duplicate or augment.
- **W22's cross-constellation Fraunces repoints** (speedtest preset-undo, words body-serif
  anti-pattern, slides re-ground) — ROUTED to W34/W35, named in the W22 audit JSON. Not an open
  W22 item but a tranche-level cross-repo leg to track.
- **The W28-named R-CONSUME AT/AU speedtest tail** (VT re-founding, preflight, M3, dark-default
  pin) — UNBLOCKED-but-UNDONE pending an AX publish; W28 NAMES it in the coordination ledger and
  ROUTES it to W34 + W41 (no-silent-deferrals). Track it does not silently collapse to "done".
- **W48's cross-story class-guard** (every substrate story exercises the tokens/seams it claims)
  — recorded for the W33 close / overfitting pass; the per-story `proof:glass-material-demo` is
  the template W33 generalizes from.
- **W36's W54/W55 coordination** (opaque a11y path) — the forced-colors a11y axis composes with
  the glass-first-class opaque-escape + adaptive-legibility waves.

## GAPS — unaddressed prompts / plan divergences

1. **W51 has NO wave doc.** It is the D18 umbrella that W45 + W50 explicitly specialize, the
   convergence plan sequences it FIRST, yet no `AX.W51-*.md` spec was authored. This is a real
   planning gap — the global `--ui-scale` axis (CVA base sizing reauthor + typography ladder
   thread + the `proof:ui-scale` gate + the W45/W50 reconcile) needs a spec before it can drive.
   Highest-priority authoring gap in the lane.
2. **Six of seven planned waves have no audit JSON** (only W22 does). The born-RED ledgers
   (W28/W29/W36/W44/W48/W49) are spec'd in the wave docs' FileBounds as `**NEW**` deliverables
   but not yet written — expected for planned waves, but it means none has a re-proven-at-base
   born-RED record yet. The wave-open ritual (re-verify witnesses live, not on the audit's word)
   is owed at each wave's first sub-step.
3. **W28's `coordination/CONSTELLATION.md` keystone is absent.** Until W28 opens it, W34/W35/W41
   have no doc to extend — the whole cross-repo band is gated on this single file. And W28 itself
   is gated on the orchestrator landing BOTH siblings on clean trees (the chronic dirty-sibling
   wall). This is a coordination action no agent can perform read-only.
4. **W22's binding VISUAL-TRUTH π capture** (light+dark, 3 viewports, demo+speedtest+words,
   paired-π DELTA) is described as "the orchestrator captures" but the JSON does not record it as
   DONE. Confirm the live capture actually ran before treating W22 as fully cardinal-lesson-closed
   (the JSON's RENDER arm is SKIP-in-worktree).
5. **W45 ↔ W51 ↔ W50 scale-system reconcile is a latent three-way collision** if executed out of
   order. The plan mandates W51-first, but W45 is already `live-verified (DEVELOPED)` per
   PROGRESS.md with its own `--dock-scale` — so the global `--ui-scale` may need to re-anchor an
   ALREADY-LANDED `--dock-scale` rather than precede it. RATIFY whether W51 reconciles onto the
   shipped dock scale or the dock scale was always meant to be the W51 specialization.

## PATH FORWARD (gestalt, planning only)

The lane splits into THREE coherent sub-batches with one hard cross-repo serialization:

**Batch 1 — independent token/demo waves (parallelizable, in-repo, no cross-repo leg):**
W44 (dark-contrast) is a clean token-first lift + a new two-arm gate — smallest, highest-user-
visibility (a loud defect), ship early in the live-truth re-open cohort. W48 (glass-material
demo) + W49 (math-paper) are file-disjoint per-story demo reauthors that share the D8/D16/D7
meta-class; both SEQUENCE-AFTER W18 (IA tree) but neither blocks the other. W36 (forced-colors)
is a self-contained a11y skin riding W25b's `glass-material.css` rename — coordinate its opaque
path with W54/W55 but it does not block them.

**Batch 2 — the `--ui-scale` scale-system (authoring gap FIRST):** AUTHOR the W51 wave doc
before anything reads `--ui-scale`. Resolve the W45-already-developed ordering inversion at
ratify (is `--ui-scale` the global axis `--dock-scale` re-anchors onto, or vice versa?). Then W51
mints the global axis + the `proof:ui-scale` gate; W50's `--dropdown-text` re-anchors as a
one-line derivation; W45's `--dock-scale` reconciles to the shipped/global scalar. ONE scale
system, three specializations.

**Batch 3 — the chassis-retire cross-repo DAG (serialized, the lane's critical path):** the
strict order is W21 (un-retired truth + gate + subpath) → [W28 R-clean gate-0 + the
orchestrator landing both siblings clean] → W28 R0 receive (sibling-executed annexes) ‖ W29
orphan-prune half (parallel, not W28-gated) → W29 repatriate-prune half (behind W28 GREEN) →
W34/W41 R1-bump (post-publish). The chronic risk is the dirty-sibling wall at gate-0 — front-load
the orchestrator-owned clean-branch landing of speedtest (clear `stash@{0}` + the 23-ahead debt)
and muster, and OPEN `coordination/CONSTELLATION.md` early since the whole cross-repo band
extends it. The orphan-prune half (instrument-rail + metric-pill, zero consumers) should be
pulled FORWARD — it has no cross-repo gate and must not be held hostage to the receive.

Every wave closes on the LIVE real-device audit (the cardinal lesson), not a headless gate — for
W44 the legible "Session expired" Alert under `.dark`, for W48 the pointer-tracked catch-light
+ biting tint, for W49 real typeset KaTeX, for W28/W29 the byte-equivalent cross-repo native
render with no dangling storybook routes. No quick fixes, no compat shims, clean breaks
throughout — the chassis prune is a clean break (no `@deprecated` re-export), the Fraunces excise
already was, and the `--destructive` lift REPLACES the stock value with no alias.
