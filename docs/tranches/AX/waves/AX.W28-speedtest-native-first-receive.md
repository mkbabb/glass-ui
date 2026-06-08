# AX.W28 — Speedtest native-first receive (cross-repo): the inv-16' native-first half of the repatriation DAG

**Band** K · SPEEDTEST · **Severity** blocker · **dependsOn** AX.W00 *(the visual-runtime π lane + the
"live re-diagnosis BEFORE the fix" wave-open ritual the cross-repo siblings inherit)* · **Charter**
AX.md §3 (the `### AX.W28` block, lines 1428-1470) + the §1 summary row (line 138) + the §2 band-K
membership (lines 190-192) + the §2b band-K precept row (line 223) + §4 note 8 (the cross-repo native-first
DAG, lines 2032-2036) + §4 note 12 (publish-currency — the R-CONSUME tail is UNBLOCKED but UNDONE, lines
2057-2067) · **Audit** `deep-audit-corpus.json` slice `speedtest-ownership` (F0 = the inv-16' native-first
sequencing wall; F1/F2 = metric-pill + instrument-rail are TRUE ORPHANS, parallel-prune, NOT muster-blocked,
routed to W29; F3 = the false-coupling guard — metric-cell/stack import only vue+cn, MetricBadge STAYS;
F4 = the SUBPATH_OWNED metaball→goo-blob drift + the `proof:repatriate-local` gate) + slice
`instrument-chassis-removal` F1 (the twin-line-divider @utility loses both consumers atomically — the
native copies inline their own) + slice `aw-plan-delivery-audit` F5 (the user's §7 REMOVE directive is
≥2-consumer-blocked; repatriation FIRST drops the count to 0) · **Constellation digest**
`constellation-analysis-corpus.json` slice `idiom:muster` F0 (muster is the SECOND blocking consumer —
the whole app shell is `<InstrumentChassis variant="spine">`), F9 (TravelMatrix strips the MetricCell
glass-wash backplate — fix the appearance impedance at the native-receive), slice `idiom:speedtest` F4
(metric-stack-row-gap library gap — the native copy ships the token), slice `harden:encapsulation-close`
F7 (the missing born-RED clean-sibling gate-0 — the dirty-tree wall), slice `hist:speedtest` F0 (the
unbanked AT/AU R-CONSUME tail — out of W28's metric-receive scope; routed to W34).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD on **two falsifiable witnesses** that do NOT hold today. The charter audit
baseline is `eaba94f`; the witnesses were re-measured LIVE (per the §0 cardinal "re-verify before acting"
and the AX.W00 wave-open ritual) at write-time against the three live trees — glass-ui `at-dock-convergence`,
speedtest `master` (pin `^3.6.0`), muster `master` (pin `^3.1.0`).

- **RED witness 1 — `proof:repatriate-local` does NOT exist on EITHER sibling, and every repatriation
  target STILL imports from glass-ui subpaths.** The native-first half of the inv-16' DAG has NEVER run in
  either consumer (slice `speedtest-ownership` F0). Live-confirmed: NO `scripts/proof-repatriate-local.mjs`
  exists under either `speedtest/scripts/` or `muster/frontend/scripts/`; NO native copies of metric-cell /
  metric-stack / instrument-chassis exist under `speedtest/src/components/` or `muster/frontend/src/components/`
  (a `find` returns nothing — the one `ResultDetailSheet` grep hit is the IMPORT, not a local def); and the
  live subpath imports survive — speedtest `ResultDetailSheet.vue:7` (`MetricCell` ×4), `ResultStack.vue:116`
  (`MetricStack`/`MetricRow`), `App.vue:239` + `MapView.vue:53` + `ChartsView.vue:131` (`InstrumentChassis`
  ×4) all import from `@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}`; muster consumes the
  same three across 12 files (`App.vue` spine, `WinnerHero.vue` glass, `TravelMatrix.vue`, `RankedVerdict.vue`,
  `WhyThisWonSheet.vue`, `InstrumentAside` ChassisDivider, the `InstrumentChassisPhase` type in
  `App/VerdictStage/WinnerHero/useMusterApp`). *The falsifiable RED: author the speedtest-side AND muster-side
  born-RED `proof:repatriate-local` gate — it FAILS the instant it is authored (zero native copies exist,
  ≥16 `@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}` imports survive). It GREENs only after
  the sibling sessions land the native copies + rewire every import to local. glass-ui writes NO sibling
  source — it AUTHORS the annex specifying the gate; the sibling sessions execute it.*

- **RED witness 2 — neither sibling presents a CLEAN working tree on a known branch, so the receive ASKS
  cannot dispatch (the dirty-sibling wall, the gate-0 `R-clean`).** Live-confirmed at write-time:
  `git -C speedtest status --porcelain` is non-empty AND `git -C speedtest stash list` carries `stash@{0}`
  (`WIP on worktree-agent-…: b7173fb7 build(vite/freshness)…` — the exact stale stash + 23-ahead reconcile
  debt the audit names, slice `harden:encapsulation-close` F7); `git -C muster status --porcelain` is
  non-empty (a dirty `docs/tranches/F/audit/…` tree on `master`). This is the precise "neither consumer's
  tree was clean enough to take the IMPL go" wall that muster-blocked the prune across AV/AW
  (`speedtest-ownership` notes). *The falsifiable RED: a born-RED gate-0 `R-clean` that asserts BOTH siblings
  present an empty `git status --porcelain` on a known branch FAILS at HEAD (both are dirty; speedtest carries
  a stash). It GREENs only after the orchestrator-verified clean-branch landing of each sibling — the
  sibling-baseline-capture ritual.*

The HardGate drives BOTH witnesses RED→GREEN on the SIBLING side. This wave's glass-ui-owned product is the
AUTHORED ANNEXES + the coordination doc + the SUBPATH_OWNED reconcile annex — NOT a `src/` edit (the
glass-ui export surface is struck by W29, AFTER both receives confirm). The two-stage DAG is
`R-clean → R0-receive` (this wave) → `W-prune` (W29) → `R1-bump` (W34/the publish hinge).

---

## Goal

Both speedtest and muster ship NATIVE copies of metric-cell, metric-stack (MetricStack + MetricRow), and
instrument-chassis (the dial AND the spine register, + ChassisDivider) under their own
`src/components/`, with every import rewired to local and ZERO surviving
`@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}` import, each guarded by a sibling-side
born-RED `proof:repatriate-local` gate flipped GREEN — so the glass-ui prune (W29) can strike with zero
dangling consumer, the ≥2-consumer count having dropped to 0.

---

## Scope (the gestalt fix — no workaround, no legacy, inv-16' native-first)

The root cause is an **architectural sequencing wall, NOT a code defect** (slice `speedtest-ownership` F0):
the inv-16' native-first/prune-after policy forbids glass-ui from pruning the three families while two live
consumers still import them, and the decisive R0 native-first half never ran in either consumer. The gestalt
fix is to DRIVE the 3-stage cross-repo DAG to completion as ordered native-first waves — NOT a glass-ui-side
rip. **glass-ui writes NO sibling source** (inv-16: it authors the handoff annexes; the sibling sessions
execute under their own tranche). W28's glass-ui-owned deliverables are the ANNEX specs + the coordination
doc + the in-repo SUBPATH_OWNED-reconcile annex routing. The receive IMPL is sibling-executed.

**(1) Author the born-RED gate-0 `R-clean` clean-sibling precondition (slice `harden:encapsulation-close`
F7 — the missing precondition the charter §3 block now carries as the "clean-sibling gate-0").** Encode
`R-clean → R0-receive → W-prune → R1-bump` with the **bbnf sibling-baseline-capture ritual**: before any
receive ASK dispatches, the orchestrator captures each sibling's HEAD + `git status --porcelain` +
`branch --show-current` + `stash list`, and the receive cannot dispatch until BOTH present a CLEAN tree on a
known branch (speedtest must clear `stash@{0}` + the 23-ahead reconcile debt; muster must clear its dirty
tree). The captured baseline + the clean-state confirmation lands in `coordination/CONSTELLATION.md`. This
is the antidote to the exact dirty-tree wall that muster-blocked the prune across AV/AW.

**(2) Author the speedtest-side native-receive ANNEX (slice `speedtest-ownership` F0(a), `idiom:speedtest`
F4, `idiom:speedtest` notes).** The annex specifies: speedtest lands `metric-cell` near `ResultDetailSheet`
(`src/components/dashboard/MetricCell.vue` — the charter's "near ResultDetailSheet"); `metric-stack` near
`ResultStack` (`src/components/speedtest/MetricStack.vue` + `MetricRow.vue`); `instrument-chassis` near
`App.vue`/`useRouteTransition`/`MapView`/`ChartsView` (BOTH the glass dial register AND the spine register
the live App consumes). Each native copy de-glass-ui-ifies its internal imports (`cn()` kept from the root
barrel or vendored, `useResizeObserver` → `@vueuse/core` directly), and every consuming import site rewires
to a local relative path. **The native `metric-stack` copy SHIPS a `--metric-stack-row-gap` consumer token**
(slice `idiom:speedtest` F4) — discharging the doubled-class-specificity `row-gap` override
`ResultStack.vue:238-246` carries today against glass-ui's hardcoded gap (the file flags the library-gap
itself). The repatriation makes the glass-ui-side `--metric-stack-row-gap` token fix MOOT — the token lands
in the native copy, not the pruned library.

**(3) Author the muster-side native-receive ANNEX (slice `idiom:muster` F0 + F9 — muster is the SECOND
blocking consumer, make its exact surface explicit).** muster's ENTIRE app shell is
`<InstrumentChassis variant="spine">` wrapping `<Configurator>`; it consumes all three families. The annex
specifies muster lands native copies under `frontend/src/components/`: `instrument-chassis` (BOTH
`variant="spine"` for `App.vue:31,215-216` AND `variant="glass"` for `WinnerHero.vue:46,185`, PLUS
`ChassisDivider` for `InstrumentAside`, PLUS the `InstrumentChassisPhase` type used in
`App/VerdictStage/WinnerHero/useMusterApp`); `metric-cell` near `TravelMatrix.vue:27,88`; `metric-stack`
(MetricStack + MetricRow) near `RankedVerdict.vue:40,198` + `WhyThisWonSheet.vue:35`. Every import rewires
to local; born-RED `proof:repatriate-local` on the muster side. **Fix the appearance impedance AT the
native-receive (slice `idiom:muster` F9):** muster's `TravelMatrix.vue:142-149` strips the MetricCell
`background`/`box-shadow`/`padding` back off because the compact glass-wash backplate reads heavy per-row in
the grid — the native copy ships a surface-less/flush density variant (or drops the glass-wash default) so
the consumer no longer fights the primitive's baked appearance. The native-first repatriation is the moment
to fix the impedance, not preserve the fight.

**(4) Author the sibling-side born-RED `proof:repatriate-local` gate spec + the SUBPATH_OWNED reconcile
(slice `speedtest-ownership` F4 + F0).** The gate (one per sibling, sibling-authored from the annex spec)
asserts three things: (a) the 3 families EXIST under the sibling's `src/components/`; (b) ZERO
`@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}` import survives anywhere in the sibling
`src/`; (c) `SUBPATH_OWNED` (speedtest's `check-glass-ui-boundary.mjs`) no longer needs the 3 families. In
the same pass, RECONCILE the stale `MetaballCanvas`/`useMetaballs`/`MetaballConfig` SUBPATH_OWNED entries
(speedtest `check-glass-ui-boundary.mjs:68-70`) — these are now `GooBlob` @ `/goo-blob` in glass-ui 3.6.0;
add the `/goo-blob` symbol so the hand-maintained snapshot matches the published export table.
`MetricBadge`/`Pulse`/`StatusDot` STAY in SUBPATH_OWNED (they are kept generic atoms — slice
`speedtest-ownership` F3).

**(5) Encode the false-coupling guard in the annex (slice `speedtest-ownership` F3 — the directive's
"metric-cell composes MetricBadge" premise is FALSE at HEAD).** The annex specifies that the native copies
import ONLY `vue` + `cn` (verified live: glass-ui `MetricCell.vue`, `MetricStack.vue`, `MetricRow.vue` import
no `MetricBadge`/`AnimatedDigit` — its sole internal compositor was `MetricPill`, itself being pruned by W29).
The 3 compositions repatriate BYTE-INDEPENDENT of the kept atoms — MetricBadge stays in glass-ui untouched
(it is kept by speedtest `SurveyResultDock.vue:59` + fourier ×13 + value.js + muster ×6). The
`proof:repatriate-local` gate asserts the native copies import only `vue`+`cn` so a future agent cannot
erroneously drag `MetricBadge` out (that would break fourier ×13 + muster).

**(6) Declare ALL cross-repo state in `coordination/CONSTELLATION.md` (the band-K section).** The
sibling-baseline capture, the writer-vs-reader boundaries (glass-ui = reader/annex-author; siblings = writers
of their own `src/`), the shared surfaces (none — disjoint by repo), and the `R-clean → R0 → W-prune → R1`
DAG with the per-leg gate. **Scope note:** the speedtest R-CONSUME TAIL (the unbanked AT/AU body — VT
re-founding, preflight, M3, the dark-default pin against an AX-published glass-ui, the H10 stopgap-revert) is
NOT W28's metric-receive scope (slice `hist:speedtest` F0; §4 note 12 — it is UNBLOCKED-but-UNDONE pending an
AX publish). W28 names it in the coordination ledger and ROUTES it to W34's cross-repo receiver + the W41
publish hinge — it does not silently treat the AT/AU tranche as done.

NO glass-ui `src/` edit, NO export-surface strike, NO MIGRATION.md rewrite, NO twin-line-divider removal
(all of that is W29, gated behind both receives confirming). NO legacy alias, NO compat shim — when W29
strikes, the consumers are already on local copies, so the bump never dangles (inv-16' native-first ordering
is the whole point).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

W28 is glass-ui-owned ANNEX AUTHORSHIP + a coordination doc. It writes NO glass-ui `src/` and NO sibling
source.

| File | Edit |
|------|------|
| `coordination/CONSTELLATION.md` | **NEW** (this wave OPENS the constellation coordination doc per SPEC.md §Document Set — required when cross-repo handoff annexes exist). The band-K section: the sibling-baseline capture (HEAD + status + branch + stash for speedtest + muster), the `R-clean → R0-receive → W-prune → R1-bump` DAG, the writer-vs-reader boundaries, the conflict-resolution protocol. **W34 extends this same doc** with the §16 receiver bands — W28 authors the band-K + gate-0 section, W34 the rest. |
| `docs/tranches/AX/audit/W28-speedtest-native-first-receive.json` | **NEW** — the born-RED ledger (the two RED witnesses), the speedtest + muster native-receive ANNEX specs (target paths, de-glass-ui-ify list, import-rewire roster), the false-coupling guard assertion, the SUBPATH_OWNED metaball→goo-blob reconcile spec, the `proof:repatriate-local` gate spec (sibling-authored), and the R-CONSUME-tail / W29 / W34 / W41 routing record. |
| `docs/tranches/AX/waves/AX.W28-speedtest-native-first-receive.md` | This spec (the wave doc). |

**Sibling-executed (NOT glass-ui-written — the annex SPECIFIES, the sibling session WRITES under its own
tranche):** `speedtest/src/components/dashboard/MetricCell.vue`, `speedtest/src/components/speedtest/{MetricStack,MetricRow}.vue`,
the speedtest instrument-chassis native copy, every speedtest import-site rewire, `speedtest/scripts/proof-repatriate-local.mjs`,
`speedtest/scripts/check-glass-ui-boundary.mjs` (the SUBPATH_OWNED reconcile); the muster `frontend/src/components/`
native copies + import rewires + `muster/frontend/scripts/proof-repatriate-local.mjs`.

**OUT of bounds (W29 — the glass-ui-side prune, gated behind both receives):** the strike of
`src/components/custom/metric-cell/`, `/metric-stack/`, `/instrument-chassis/` + their `src/subpaths/*.ts`
mirrors + `package.json` exports (`:320-326,376-378`) + typesVersions (`:64-68,100-101`) + `api/index.ts`
types (`:96,222-227`) + the root-barrel lines (`src/index.ts:118` instrument-chassis) + `instrument-chassis.css`
+ demo stories; the `twin-line-divider` @utility removal (`utilities.css`); the orphan-prune of
`metric-pill` + `instrument-rail` (slice `speedtest-ownership` F1/F2 — NO native receive, NO muster-block,
parallelizable); the chassis-hardcoding gate updates; MIGRATION.md honesty. **OUT of bounds (W34):** the
speedtest R-CONSUME AT/AU tail intake; the muster LabeledField under-adoption (slice `idiom:muster` F4); the
consumer version-bump (R1) to the pruned cut. **OUT of bounds (W41):** the publish hinge the R1 bump resolves
through.

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W29 (glass-ui repatriation-prune + orphan-prune) — the dependsOn child.** W29 dependsOn W28 (charter
  line 1475). **Disjoint by repo AND by stage:** W28 writes the SIBLING side (native copies + import rewires
  + sibling gates) via authored annexes; W29 writes the GLASS-UI side (the export-surface strike + the
  twin-line @utility removal + the gate updates + MIGRATION.md). They share ZERO file. The DAG ordering
  guarantees the prune never dangles: W28's `proof:repatriate-local` GREEN on BOTH siblings is the literal
  precondition W29 opens behind. The twin-line-divider @utility (slice `instrument-chassis-removal` F1) loses
  both consumers ATOMICALLY in W29 — W28's native copies inline their own twin-line α-pair (the annex
  specifies it), so by the time W29 deletes the @utility it already has zero remaining consumer.

- **vs W34 (cross-constellation §16 receiver + the coordination doc body).** W34 EXTENDS
  `coordination/CONSTELLATION.md` with the §16 idiom-maximization receiver bands (the muster LabeledField
  adoption, the speedtest aurora-derive E2 adoption, the consumer R1 bumps). **Disjoint by section:** W28
  authors the band-K + gate-0 section of the coordination doc (the metric-receive DAG); W34 appends the
  other-consumer bands. Coordinate so the two waves write DISJOINT sections of the one doc (W28 first — it
  OPENS the file). The speedtest R-CONSUME AT/AU tail is W28-NAMED but W34-ROUTED — W28 does not execute it.

- **vs W41 (publisher-side cross-repo build + supplier-edge).** The consumer R1 bump (speedtest ^3.6.0 → the
  AX-pruned cut, muster ^3.1.0 → the pruned cut) resolves through the AX publish hinge W41 hardens (the
  `build:watch` dts-freshness keystone + the cross-repo-dev-resolution contract-v2). **Disjoint by stage:**
  W28 lands the native-first receive (R0) on the CURRENT pin — the consumers do not bump in W28 (the imports
  are already local, so the bump is a clean version-only move AFTER the prune). W41 is the publish hinge the
  bump rides; W28 routes the bump there.

- **vs W25b (utilities.css carve — the §7/§8 metric-ownership decision).** W25b's utilities-portion dependsOn
  W29 (charter line 1321) because the ~190-line metric-badge recipe relocates to the RIGHT repo only after
  the §8 ownership decision lands. **Disjoint by repo + ownership:** W28 makes the metric-cell/stack/chassis
  OWNERSHIP decision concrete (the native copies receive them); W25b relocates the surviving glass-ui-side
  metric-badge recipe (MetricBadge STAYS — false-coupling guard) AFTER W29 prunes. W28 touches no
  `utilities.css`. The decision W28 enacts is the input W25b/W29 sequence behind.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

This is a CROSS-REPO authoring wave — the glass-ui side writes NO source, so the "implement" arm is
ANNEX-AUTHORSHIP, and the actual IMPL runs in the sibling sessions (out of glass-ui's dispatch). The actual
glass-ui-side count is **2** (1 annex-author + 1 adversarial-verify), under the AX ≤6-implementation /
≤7-read-only ceiling. The sibling-side receive IMPL is each sibling's own ≤6-agent wave.

- **Annex-author + coordination-doc author (≤1 glass-ui agent — the deliverable is the annex, not source).**
  Captures the sibling baselines (orchestrator-run read-only `git -C <sibling> status/branch/stash/log`);
  authors `coordination/CONSTELLATION.md` band-K + gate-0; authors the speedtest + muster native-receive
  annex specs in the audit json (target paths, de-glass-ui-ify roster, import-rewire census, the
  `--metric-stack-row-gap` token directive, the TravelMatrix flush-density directive, the false-coupling
  guard, the SUBPATH_OWNED metaball→goo-blob reconcile, the `proof:repatriate-local` gate spec). Records the
  R-CONSUME-tail / W29 / W34 / W41 routing. Touches NO glass-ui `src/` and NO sibling source — annex + doc
  only.

- **Adversarially-verify (≤1 glass-ui read-only lane).** Re-runs both RED witnesses against the live trees:
  (a) confirms no `proof:repatriate-local` exists on either sibling and the ≥16 subpath imports survive
  (witness 1 RED at HEAD); (b) confirms both sibling trees are dirty / speedtest carries a stash (witness 2
  RED at HEAD). ADVERSARIAL twists: **(i)** confirms the false-coupling premise is FALSE at HEAD by grepping
  the three glass-ui `MetricCell/MetricStack/MetricRow.vue` import lines (no `MetricBadge`) — so the annex's
  "import only vue+cn" guard is correct and MetricBadge must NOT be dragged out (a wrong guard would break
  fourier ×13 + muster ×6); **(ii)** confirms `metric-pill` + `instrument-rail` have ZERO live consumers
  across the constellation (the `MetricPillCluster`/`.metric-pill-stack` grep hits are speedtest-LOCAL
  red-herrings, not glass-ui `<MetricPill>` — these route to W29's PARALLEL orphan-prune, NOT this
  muster-blocked DAG); **(iii)** confirms the SUBPATH_OWNED stale entries are exactly
  `MetaballCanvas`/`useMetaballs`/`MetaballConfig` (now `GooBlob` @ `/goo-blob`) and that
  `MetricBadge`/`Pulse`/`StatusDot` correctly STAY; **(iv)** confirms the clean-sibling gate-0 cannot be
  silently skipped — a receive ASK dispatched against a dirty tree re-mints the AV/AW dirty-sibling wall.

- **Gate-author (the sibling-side `proof:repatriate-local` — SPECIFIED here, AUTHORED sibling-side).** The
  glass-ui annex SPECIFIES the gate's three assertions (native copies exist; zero glass-ui-subpath import
  survives; SUBPATH_OWNED no longer needs the 3 families); the SIBLING session authors the actual
  `scripts/proof-repatriate-local.mjs` under its own tranche (glass-ui writes no sibling source). The gate is
  born-RED at authoring (zero native copies) → GREEN after the receive. The clean-sibling gate-0 `R-clean`
  is an orchestrator-run read-only check (`git status --porcelain` empty on a known branch for both siblings),
  recorded in the coordination doc.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH cross-repo live audit clause)

**Cross-repo gates — born-RED→GREEN (sibling-side, glass-ui-specified).** Per `precepts/instructions/tranche/SPEC.md:96-104`
the accepted artefact forms are build/test/runtime/deletion/explicit-document-reconciliation; these gates are
deletion-of-import + file-existence + clean-tree artefacts — precept-valid, NOT grep-only-for-runtime-behaviour
(an import-presence assertion IS the purely-structural target the precept carves out, and the VISUAL-TRUTH
clause below carries the runtime axis).

1. **Gate-0 `R-clean` — both siblings present an empty `git status --porcelain` on a known branch (a
   clean-tree artefact).** **Born-RED** at HEAD (speedtest dirty + `stash@{0}`; muster dirty `master`). GREEN
   only after the orchestrator-verified clean-branch landing of each sibling (the sibling-baseline-capture
   ritual). The receive ASKS cannot dispatch until this GREENs — it is the literal precondition gate.
2. **`proof:repatriate-local` (speedtest-side) — born-RED → GREEN (a test/deletion-of-import artefact).**
   Asserts the 3 families exist under `speedtest/src/components/`, ZERO
   `@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}` import survives in `speedtest/src/`, and
   SUBPATH_OWNED no longer needs them. **Born-RED** (no native copies; imports survive); GREEN after the
   speedtest receive. Sibling-authored from the glass-ui annex spec.
3. **`proof:repatriate-local` (muster-side) — born-RED → GREEN (same form, muster's 12-file surface).**
   Asserts the same three conditions over `muster/frontend/src/`. **Born-RED**; GREEN after the muster
   receive. Sibling-authored from the glass-ui annex spec.
4. **SUBPATH_OWNED reconcile — the stale metaball→goo-blob entries corrected (a document-reconciliation
   artefact).** speedtest `check-glass-ui-boundary.mjs` no longer lists `MetaballCanvas`/`useMetaballs`/
   `MetaballConfig` and lists the `/goo-blob` symbol instead; `MetricBadge`/`Pulse`/`StatusDot` STAY.
   Sibling-side edit specified by the glass-ui annex.
5. **The false-coupling guard asserts in `proof:repatriate-local` — the native copies import only vue+cn (a
   test artefact).** A drift that imported `MetricBadge`/`AnimatedDigit` into a native copy reds the gate, so
   MetricBadge cannot be erroneously repatriated.

**VISUAL-TRUTH clause (the NON-NEGOTIABLE AX.W00 close discipline — cross-repo live audit, NOT a headless
proof alone).** This wave HAS a visual surface on BOTH consumers (the metric grids, the dial, the spine
chassis are live rendered chrome), so the AX.W00 mandate binds at full strength: **the wave does NOT close on
the `proof:repatriate-local` GREEN alone.** The binding close evidence is a **paired BEFORE/AFTER cross-repo
live Playwright + frontend-design audit** (the W00 paired-π BEFORE/AFTER + DELTA protocol): on each sibling,
capture the metric-cell grid (speedtest `ResultDetailSheet`, muster `TravelMatrix`), the metric-stack
(speedtest `ResultStack`, muster `RankedVerdict`/`WhyThisWonSheet`), and the instrument-chassis (speedtest
`App`/`MapView`/`ChartsView` dial + spine, muster `App` spine + `WinnerHero` glass) BEFORE the receive (the
glass-ui subpath render) and AFTER (the native-copy render), and a DELTA confirming the surfaces render
**byte-equivalent** on the native copies — affordance, hierarchy, spacing, padding, NO visual occlusion, NO
regression. The muster `TravelMatrix` capture additionally CONFIRMS the flush-density fix removed the
`background`/`box-shadow`/`padding` override-fight (slice `idiom:muster` F9) — the AFTER renders the flush
matrix without the consumer stripping the primitive's baked surface. A frontend-design pass confirms the
native copies read as the same component family the library shipped. The π-lane runs on the SIBLING repos
(the cross-repo π discipline is binding on the consumers, not only glass-ui). The captures land under
`docs/tranches/AX/audit/` (the glass-ui-side ledger references the sibling-side π artefacts).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + sibling-baseline capture.** Orchestrator-run read-only
   `git -C speedtest status --porcelain / branch --show-current / stash list / log --oneline HEAD~10..HEAD`
   and the same for `muster`; confirm BOTH RED witnesses (no `proof:repatriate-local`; the ≥16 subpath
   imports survive; both trees dirty; speedtest stash present). Capture the baselines in
   `coordination/CONSTELLATION.md`. Re-prove the false-coupling premise (grep the three glass-ui
   `MetricCell/MetricStack/MetricRow.vue` import lines → no MetricBadge). Do NOT trust the audit's word.
2. **Open `coordination/CONSTELLATION.md` band-K + gate-0.** Author the `R-clean → R0-receive → W-prune →
   R1-bump` DAG, the writer-vs-reader boundaries (glass-ui = annex-author/reader; siblings = own-src writers),
   the conflict-resolution protocol, and the gate-0 `R-clean` precondition. Name the R-CONSUME-tail / W34 /
   W41 routing.
3. **Author the speedtest native-receive annex.** Target paths (`MetricCell.vue` near ResultDetailSheet,
   `MetricStack`+`MetricRow` near ResultStack, instrument-chassis near App/MapView/ChartsView), the
   de-glass-ui-ify roster (cn from root barrel, useResizeObserver → @vueuse/core), the import-rewire census,
   the `--metric-stack-row-gap` token directive (discharge the ResultStack override), the SUBPATH_OWNED
   metaball→goo-blob reconcile, the false-coupling guard, the `proof:repatriate-local` gate spec.
4. **Author the muster native-receive annex.** The full 12-file surface (instrument-chassis spine + glass +
   ChassisDivider + InstrumentChassisPhase type; metric-cell near TravelMatrix; metric-stack near
   RankedVerdict/WhyThisWonSheet), the TravelMatrix flush-density directive (fix the impedance), the
   import-rewire census, the `proof:repatriate-local` gate spec.
5. **Gate-0 R-clean confirmation + dispatch the sibling receives.** Once BOTH siblings present a clean tree
   on a known branch (orchestrator-verified — speedtest clears `stash@{0}` + the 23-ahead debt; muster clears
   its dirty tree), the sibling sessions execute the annexes under their own tranches and author + flip GREEN
   their `proof:repatriate-local` gates.
6. **VISUAL-TRUTH paired BEFORE/AFTER cross-repo live audit + close.** Run the paired-π BEFORE/AFTER + DELTA
   on both siblings (metric grids + dial + spine), confirm byte-equivalent native render + the TravelMatrix
   flush-density fix. Record the receive-confirmed state in `coordination/CONSTELLATION.md` (the W29 open
   precondition is now met). Write `audit/W28-…json` to its born-RED→GREEN-on-the-sibling-side state. Route
   the R-CONSUME tail to W34 + the R1 bump to W41.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W28-speedtest-native-first-receive.json` — the born-RED ledger (the two RED
  witnesses with their live measurements), the sibling-baseline capture (speedtest HEAD + dirty +
  `stash@{0}`; muster HEAD + dirty), the speedtest + muster native-receive ANNEX specs (target paths,
  de-glass-ui-ify roster, import-rewire census), the `--metric-stack-row-gap` token + TravelMatrix
  flush-density directives, the false-coupling guard assertion, the SUBPATH_OWNED metaball→goo-blob reconcile
  spec, the `proof:repatriate-local` gate spec, and the R-CONSUME-tail / W29 / W34 / W41 routing record.
- `coordination/CONSTELLATION.md` (band-K + gate-0 section) — the cross-repo coordination doc: the
  sibling-baseline capture, the `R-clean → R0-receive → W-prune → R1-bump` DAG, the writer-vs-reader
  boundaries, the conflict-resolution protocol, the receive-confirmed close state.
- The sibling-side gate outputs (REFERENCED, not glass-ui-owned): `speedtest/scripts/proof-repatriate-local.mjs`
  + `muster/frontend/scripts/proof-repatriate-local.mjs` born-RED→GREEN logs; the reconciled
  speedtest `check-glass-ui-boundary.mjs` SUBPATH_OWNED set.
- The paired BEFORE/AFTER cross-repo π-lane captures (the VISUAL-TRUTH evidence) — the metric-cell grid /
  metric-stack / instrument-chassis renders on both siblings, BEFORE (glass-ui subpath) vs AFTER (native
  copy), with the DELTA confirming byte-equivalence + the TravelMatrix flush-density fix — captured under
  `docs/tranches/AX/audit/` (referencing the sibling-side π artefacts).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `docs(AX.W28): born-RED baseline — no proof:repatriate-local on either sibling, ≥16 glass-ui subpath imports survive, both trees dirty (speedtest stash@{0}) — the inv-16' native-first wall (slice speedtest-ownership F0)`
2. `docs(coordination): open CONSTELLATION.md band-K + gate-0 — the R-clean → R0-receive → W-prune → R1-bump DAG + sibling-baseline capture (AX.W28)`
3. `docs(AX.W28): speedtest native-receive annex — metric-cell/stack/chassis target paths + --metric-stack-row-gap token + SUBPATH_OWNED metaball→goo-blob reconcile + proof:repatriate-local spec`
4. `docs(AX.W28): muster native-receive annex — instrument-chassis spine+glass+ChassisDivider + metric-cell/stack + TravelMatrix flush-density fix + false-coupling guard`
5. `docs(AX.W28): gate-0 R-clean confirmed + sibling receives dispatched — proof:repatriate-local born-RED→GREEN on both siblings (sibling-authored)`
6. `docs(AX.W28): audit ledger — paired BEFORE/AFTER cross-repo π VISUAL-TRUTH confirms byte-equivalent native render; W29 open-precondition met; R-CONSUME tail → W34, R1 bump → W41`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash/
checkout per the hardened agent git clause, in glass-ui AND in any peer repo. Cross-repo push is ALWAYS
orchestrator-authored per ORCHESTRATION.md §Cross-repo commit policy. These are the messages the orchestrator
authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (the visual-runtime π lane + the "live re-diagnosis BEFORE the fix" wave-open ritual) — the
  binding dependsOn.** The charter `### AX.W28` block (line 1429) lists `dependsOn AX.W00`. W28's
  cross-repo VISUAL-TRUTH close runs the W00 paired-π BEFORE/AFTER + DELTA protocol on the SIBLING repos —
  the cross-repo π discipline is binding on the consumers (the metric grids + dial + spine are live visual
  surfaces, so a byte-equivalent native render must be live-proven, not assumed from a green
  `proof:repatriate-local`). W28 also inherits W00's wave-open re-diagnosis ritual (re-confirm the dirty-tree
  + import-survival witnesses LIVE before dispatching the receives — the AV/AW dirty-sibling wall is the
  archetype of a misdiagnosed precondition).
- **Why NOT a dependsOn on the dock band (W01-W06) or the graphics band (W07-W16):** W28 is repo-disjoint
  from those — it touches no dock/aurora/blob surface. The only glass-ui-internal coupling is the
  false-coupling guard (MetricBadge stays), which is verified at HEAD, not produced by a prior wave.
- **Blocks: AX.W29 (the glass-ui repatriation-prune).** W29 dependsOn W28 (charter line 1475) — the prune
  CANNOT run until BOTH `proof:repatriate-local` gates are GREEN (the ≥2-consumer count having dropped to 0).
  W28 is the literal native-first precondition the inv-16' policy demands. **Routes (not blocks): W34** (the
  R-CONSUME AT/AU tail intake + the consumer R1 bump) and **W41** (the publish hinge the R1 bump resolves
  through) — W28 names + routes these; it does not execute them.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited as evidence)

- **`docs/tranches/AW/audit/repatriation/_DECISION.md:31-51,66-75`** (the binding verdict set + the
  sequencing) — the authoritative file that OVERRODE the per-family `instrument-chassis.md` "KEEP-SHARED
  verdict" header to REPATRIATE per the user's 2026-06-07 "not general enough" call (the GENERIC-ATOM vs
  DOMAIN-SPECIFIC-COMPOSITION lens). The digest header holds consumer EVIDENCE; `_DECISION.md` holds the
  binding DISPOSITION (slice `speedtest-ownership` notes — do NOT regress by reading the stale digest header).
- **`AW.W19-orphan-prune.md:6,154`** (the glass-ui prune wave, status PLANNED) — explicitly opens ONLY after
  "the speedtest AV repatriate-receive wave + the muster L repatriate-receive wave must have landed native
  copies." The R0 native-first half NEVER ran; the prune is muster-blocked. W28 IS the corrective successor
  that drives R0 to completion. The AW.W19 stale "subpath only" surface claim is corrected by W29 (the root
  barrel IS in scope — `src/index.ts:118` instrument-chassis — a surviving dangling `export *` = build break).
- **`speedtest-AV-adopt.md` AV-R0** (the receive wave, Gate-2-gated, never run) — the handoff annex gated
  behind a Gate-2 go that was never given because neither consumer's tree was clean enough to take the IMPL
  go (the dirty-sibling wall). W28's gate-0 `R-clean` is the structural antidote.
- **speedtest `stash@{0}` (`WIP on worktree-agent-…: b7173fb7 build(vite/freshness)…`) + the 23-ahead
  reconcile debt** (slice `harden:encapsulation-close` F7; AV-W0; SUM-1 push freeze) — the live witness of
  the exact dirty-sibling wall, confirmed at write-time. muster's dirty `master` tree is the second wall.
- **`MetricPill.vue:8` "the speedtest stacked-pill default"** (a STALE credit) + `0601d62` (MetricPill's
  introduction "new primitive — stacked taller-fatter pill composing MetricBadge") — the orphan substrate
  speedtest never adopted (its consumers route through MetricBadge directly, `SurveyResultDock.vue:59`). This
  is W29's PARALLEL orphan-prune (NO muster-block), NOT W28's DAG — W28's adversarial-verify confirms the
  `MetricPillCluster`/`.metric-pill-stack` grep hits are speedtest-LOCAL red-herrings so the routing is
  correct.
- **`AI.W1-γ`** (the `RegionDivider` → `ChassisDivider` rename) — the rename never propagated to glass-ui's
  CLAUDE.md structure prose (slice `speedtest-ownership` F4); that doc sweep is W29-owned (glass-ui-side),
  not W28 (W28 is sibling-side + coordination).
- **AT/AU (speedtest's unbanked R-CONSUME tail — `useCompletionChoreography.ts` 394 lines, `dev-mock.ts`
  367, `grep startViewTransition src/` → 0)** — the fully-hardened never-dispatched speedtest tranche (slice
  `hist:speedtest` F0). UNBLOCKED-but-UNDONE pending an AX publish (§4 note 12). W28 NAMES it in the
  coordination ledger and ROUTES it to W34 + W41 — it is explicitly OUT of W28's metric-receive scope, not
  silently assumed done.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-K binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire — the inv-16' native-first ordering**
  (`precepts/instructions/tranche/SPEC.md:158` "substrate-with-consumer wiring … describes the work required
  to close"; the J inv 10 / L inv 8 substrate-without-consumer-binary; the visual-load-bearing-ness invariant
  in CLAUDE.md §Design Axes 3). The whole wave IS this precept in cross-repo form: glass-ui MUST NOT prune
  the 3 families while ≥2 live consumers import them — the consumers RECEIVE NATIVE COPIES FIRST (W28), THEN
  glass-ui prunes (W29), THEN consumers bump (R1). The native-first ordering is what makes the bump never
  dangle. MUST NOT invert the order (a glass-ui-side rip before the receives = ≥16 dangling import sites
  across two live consumers = a build break in both).
- **cross-repo coordination doc + sibling-baseline-capture ritual** (`precepts/instructions/tranche/SPEC.md:19,38`
  "`coordination/<peer-letter>.md` … required when the tranche has a confirmed cross-repo race surface …
  names the other repo's HEAD at coordination time, the surfaces both tranches may write, the writer-vs-reader
  boundaries, and the conflict-resolution protocol" + `coordination/CONSTELLATION.md` if cross-repo origin;
  the bbnf sibling-baseline-capture ritual per the charter §0). W28 OPENS `coordination/CONSTELLATION.md`
  with the band-K + gate-0 section and captures each sibling's HEAD + status + branch + stash BEFORE any
  cross-repo edit. MUST NOT dispatch a receive ASK against an uncaptured or dirty sibling tree (the gate-0
  `R-clean` is the structural enforcement).
- **the hardened agent git clause + the cross-repo commit policy**
  (`precepts/instructions/ORCHESTRATION.md:107-138` + `tranche/AGENT_DISPATCH_TEMPLATE.md`). glass-ui writes
  NO sibling source — it authors ADDITIVE handoff annexes; the sibling sessions execute under their own
  tranche; cross-repo PUSH is ALWAYS orchestrator-authored, NEVER agent-authored; before any cross-repo
  action the orchestrator runs read-only inspection (`git -C <sibling> status --porcelain / branch / log`)
  and HALTS for arbitration if the receiving repo is dirty in the contention zone. MUST NOT have a glass-ui
  agent stage/commit/checkout in a peer repo.
- **no-silent-deferrals + the §16.4 zero-loss forcing-function** (`precepts/instructions/tranche/SPEC.md:191`
  P invariant 28 — "every item LANDS, RETIRES with rationale, or ARCHIVES … 'deferred to next tranche' is
  not an acceptable close-state"; the DEGRADED-outcome clause `:118-133` requires a NAMED restoration wave).
  The speedtest R-CONSUME AT/AU tail is NAMED in the coordination ledger and ROUTED to W34 + W41 — NOT
  silently treated as done (slice `hist:speedtest` F0). The §4 note 12 publish-currency gap (the R-CONSUME is
  UNBLOCKED but UNDONE) is recorded with its restoration hinge (the AX publish via W41). MUST NOT leave the
  AT/AU tail as an unrouted "still broken" claim.
- **binding-doc honesty — MIGRATION.md no-retired-survivor** (the L invariant 16 migration-guide-is-binding;
  CLAUDE.md §Subpath surface). W28 ENACTS the ownership decision (the native copies receive the 3 families);
  the MIGRATION.md honesty rewrite + the CLAUDE.md `RegionDivider`→`ChassisDivider` + struck-structure-lines
  sweep are W29-owned (glass-ui-side, post-prune). MUST NOT leave a MIGRATION.md/CLAUDE.md entry that names a
  surviving subpath for a repatriated family (that is W29's reconcile, gated behind this wave). W28's job is
  the receive; W28 must not pre-empt the doc sweep, but must ROUTE it so it lands in W29.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation**
  (`precepts/instructions/tranche/SPEC.md:112-116`; CLAUDE.md §0 mandate). The clean-break is fail-LOUD by
  construction: after W29 strikes the families, an unconverted consumer import fails the build (no silent
  alias, no compat shim) — but W28's native-first ordering ensures there IS no unconverted import at strike
  time. The `proof:repatriate-local` gate is the fail-explicit enforcement (a surviving glass-ui-subpath
  import reds the gate). MUST NOT ship a back-compat alias or a graceful re-export that would silently absorb
  a missed import-rewire.
- **the π visual-runtime lane — binding on the consumer repos**
  (`precepts/instructions/tranche/SPEC.md:216-246`; AX.W00). The cross-repo VISUAL-TRUTH close runs the
  paired-π BEFORE/AFTER + DELTA on BOTH siblings — the metric grids + dial + spine are live visual surfaces,
  so the wave closes on a live cross-repo audit, NOT a headless `proof:repatriate-local` GREEN alone (the
  cardinal AW lesson). MUST NOT close W28 on the sibling gate green without the paired-π byte-equivalence
  proof (incl. the TravelMatrix flush-density fix verification).
