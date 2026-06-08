# AX.W29 — glass-ui repatriation-prune + orphan-prune

**Band** K · SPEEDTEST · **Severity** major · **dependsOn** AX.W28 (+ coordinates with AX.W21)
**Charter** `AX.md` `### AX.W29` (lines 1474-1499) · **foldsFindings** slice 19 F0-F7, slice 23
F1/F2/F3/F4, slice 17 F4, slice 31 F5 · **§4 notes** 4 (keep-both metric verdict), 8 (cross-repo
native-first DAG) · **§2b band-K precepts** substrate-with-consumer / wire-before-retire (inv-16');
cross-repo coordination doc + sibling-baseline-capture; no-silent-deferrals; binding-doc honesty
(MIGRATION.md no-retired-survivor).

**Actual agent count: 4** (2 implement, file-disjoint arms · 1 adversarial-verify · 1 gate-author) —
within the AX ≤6-implementation / ≤7-read-only ceiling.

---

## State (born-RED — the gate must fail at HEAD)

The instrument-chassis + instrument-rail families, the `metric-pill` orphan, the `twin-line-divider`
@utility, and the dead `variant="instrument-strip"` dock mode all SHIP at HEAD `eaba94f` — confirmed live
against the working tree, not the audit's word:

- **RED witness 1 (the repatriated families are still on the full surface).** `instrument-chassis` rides
  the root barrel (`src/index.ts:118` `export * from "./components/custom/instrument-chassis"`), the
  subpath mirror (`src/subpaths/instrument-chassis.ts`), the `./instrument-chassis` `package.json` export
  (`:376-378`) + `typesVersions` (`:100-101`), the api re-export (`src/api/index.ts:96`
  `InstrumentChassisPhase`), the CSS (`src/styles/instrument-chassis.css`, `@import` at
  `src/styles/index.css:128`), and the demo composition (`demo/stories/compositions/instrument-chassis.vue`
  + `manifest.ts:240`). `instrument-rail` rides `src/index.ts:119`, `src/subpaths/instrument-rail.ts`,
  `package.json:380-382`/`:103-104`, `src/styles/instrument-rail.css` (`index.css:129`), and
  `demo/stories/compositions/instrument-rail.vue` + `manifest.ts:241`.
  *Witness:* `grep -c "export \* from \"./components/custom/instrument-chassis\"" src/index.ts` = 1 (the
  family is on the barrel — the AW.W19 plan's "subpath only" claim is FALSE at HEAD); `test -d
  src/components/custom/instrument-chassis && test -d src/components/custom/instrument-rail` → both present
  (RED).

- **RED witness 2 (`metric-pill` is a zero-consumer orphan still re-exported).** `MetricPill` is a 67-line
  pure composition (`src/components/ui/metric-pill/MetricPill.vue` renders `<MetricBadge>` with
  `labelPosition="stacked"` + `density="spacious"` + `size="lg"` baked in) with a stale "speedtest
  stacked-pill default" credit at `MetricPill.vue:8` — and ZERO real consumers in the 6-repo constellation
  (speedtest routes through `<MetricBadge>` directly at `SurveyResultDock.vue:59`). It rides the root barrel
  (`src/index.ts:95`), the `.metric-pill` density CSS block (`src/styles/utilities.css:482-524`), and the
  demo story (`demo/stories/primitives/metric-pill.vue` + `manifest.ts:126`). If W21 lands the recommended
  `/metric-pill` subpath (its RATIFY fold 7), that subpath is ALSO a surviving surface this wave prunes.
  *Witness:* `grep -rc "from \"@mkbabb/glass-ui/metric-pill\"\|from \"@mkbabb/glass-ui\".*MetricPill"` over
  speedtest + muster + the other 4 consumers = 0 (zero binary consumers, substrate-without-consumer per L
  invariant 8) AND `test -f src/components/ui/metric-pill/MetricPill.vue` → present (RED).

- **RED witness 3 (the `twin-line-divider` @utility + its tokens lose both consumers atomically).** The
  `@utility twin-line-divider` (`src/styles/utilities.css:705-713` + its `.dark` arm + the doc-comment)
  publishes `--twin-line-catch` / `--twin-line-shadow` and was extracted at AW.W15 to DRY the bezel-line
  α-pair shared by `instrument-chassis.css` (`.bezel-line.top`/`.bottom`) and `instrument-rail.css` — its
  ONLY two consumers by construction. Both CSS files leave glass-ui this wave, so the utility becomes a
  0-consumer orphan the moment the chassis/rail CSS is deleted. `proof-composable-return-types.mjs` clause
  #2 currently REQUIRES those two CSS files as the ≥2 consumers of the utility.
  *Witness:* `grep -rc "twin-line-divider\|--twin-line-catch\|--twin-line-shadow" src/styles/` shows the
  utility def + exactly its two chassis/rail CSS consumers, no third (RED — removing both leaves the
  utility orphaned, and `proof:composable-return-types` clause #2 reds).

- **RED witness 4 (the dead `variant="instrument-strip"` dock mode).** `GlassDock.vue:44` carries a third
  variant value `"instrument-strip"` in the union + two computed branches (`:158` orientation, `:186`
  fitContent) that fork on it + ~60 lines of dedicated `dock.css` (`:422-481`, the
  `.glass-dock.variant-instrument-strip` surface + `::before` engraved bezel reading
  `--glass-bg-chassis`). ZERO live template binding exists anywhere (speedtest `SurveyResultDock.vue:20` /
  `SurveyWizard.vue:16` + muster `CommandDock.vue:13` describe it ONLY in stale "is retired" comments).
  *Witness:* `grep -rc "variant=\"instrument-strip\"\|:variant=\"'instrument-strip'\"" ` over the whole
  constellation = 0 live bindings, yet `grep -c "instrument-strip" src/components/custom/dock/GlassDock.vue`
  = ≥3 (the union member + two computed branches) and the `dock.css:449` block ships (RED).

- **RED witness 5 (five gate scripts hardcode the families as permanent fixtures).** Five gates LOCK the
  chassis families' current shape and break on removal: `proof-composable-return-types.mjs:43-44,100-121`
  (clause #2 requires the two CSS files as twin-line consumers), `proof-consumers-static.mjs:137-138`
  (census paths for both `index.ts`), `proof-storybook-ia.mjs:75` (the two slugs in the compositions IA
  band), `proof-tailwind-v4-idiom.mjs:151-155` (the chassis `CONTAINER_CONTEXT` assert), and
  `proof-dock-vocabulary.mjs:14` (a comment example — non-load-bearing).
  *Witness:* `grep -ln "instrument-chassis\|instrument-rail\|twin-line-divider" scripts/proof-*.mjs` →
  all five named scripts (RED — a removed artefact cannot satisfy a gate asserting its presence/shape).

- **RED witness 6 (the binding-doc lie, finalized arm).** `MIGRATION.md:800-823` declares the
  `metric-cell` + `metric-stack` subpaths "RETIRED (AV.W10)" — a lie at HEAD (both dirs/subpaths/exports/
  §17-tokens ship). **W21 repairs this to the un-retired TRUTH and authors `proof:no-retired-survivor`
  born-RED at HEAD.** After W28 lands the native receives and THIS wave prunes for real, the MIGRATION.md
  entry must be RE-WRITTEN to the FINAL retired state and `proof:no-retired-survivor` must stay GREEN —
  the coherence contract across W21→W29.
  *Witness:* at HEAD (pre-W21) `grep -n "RETIRED (AV.W10)" MIGRATION.md` = 1 claim CONTRADICTED by
  `test -d src/components/custom/metric-cell` present; post-W21/pre-W29 the entry tells the un-retired
  truth; THIS wave's RED is that the truth is still "un-retired" (the families ship) when the W28 receive
  is done and the prune has not yet run.

The combined RED is: at HEAD `eaba94f` the three repatriated families + the two orphans + the
twin-line-divider + the instrument-strip variant all ship; `proof:storybook-complete` /
`proof:no-orphan-demo-route` / the five chassis gates / `proof:no-retired-survivor` cannot be made GREEN
over a prune that has not happened. The wave is born-RED: the prune must FAIL to be needed.

---

## Goal

With both blocking consumers on native copies (W28 done), glass-ui strikes the three repatriated families
(instrument-chassis + metric-cell + metric-stack) and the two true orphans (instrument-rail + metric-pill)
plus the now-orphaned `twin-line-divider` @utility and the dead `instrument-strip` dock variant — with
ZERO residue (no dangling export, no orphaned gate, no surviving binding-doc lie).

---

## Scope (the gestalt fix — no workaround, no legacy alias, no rehome)

The §7 "REMOVE ALL" directive for the instrument families was blocked across AV/AW by the ≥2-consumer
invariant (J invariant 10 / L invariant 8): instrument-chassis is a LIVE speedtest + muster consumer
surface, so a unilateral glass-ui rip would strand two production apps (the inv-16' native-first / prune-
after wall). W28 discharges that wall (both consumers land native copies + rewire + de-glass-ui their
imports); THIS wave executes the glass-ui-side strike. Two halves, both clean breaks (no shim, no
`@deprecated` re-export — no-backwards-compat law):

**(A) REPATRIATE-PRUNE — instrument-chassis + metric-cell + metric-stack (gated behind W28's native
receive).** These are DOMAIN-SPECIFIC INSTRUMENT COMPOSITIONS, not generic UI atoms (the decisive lens is
generic-atom-vs-domain-composition, NOT raw consumer count — `_DECISION.md:9-13,37`: "the instrument
chassis is not general enough" + "Muster does not count"). With both apps native (W28), strike each
family's ENTIRE surface: the component dir (`InstrumentChassis.vue` + `ChassisDivider.vue` + `index.ts`;
the `metric-cell/` + `metric-stack/{MetricCell,MetricStack,MetricRow}` dirs), the subpath mirror
(`src/subpaths/instrument-chassis.ts` / `metric-cell.ts` / `metric-stack.ts`), the root barrel
(`src/index.ts:118` + the `metric-cell`/`metric-stack` cherry-pick comment mentions at `:53,:71`), the api
re-exports (`src/api/index.ts:96` `InstrumentChassisPhase`; `:216-228` the MetricCell/MetricStack type
block + the `:19,:220` comment mentions), the `package.json` exports + `typesVersions`
(`:376-378`/`:100-101` chassis; `:320-326`/`:64-68` metric-cell/stack), the CSS
(`src/styles/instrument-chassis.css` + `index.css:128` + the rung-12 doc-comment `:95-97`) AND the
tokens.css §17 METRIC block (`src/styles/tokens.css:1197-1220` — the `--metric-row-*` / `--metric-cell-*`
tokens the native copies inline), and the demo stories (`compositions/instrument-chassis.vue`,
`data/metric-cell.vue`, `data/metric-stack.vue` + their `manifest.ts:240,187,188` rows). The native
speedtest/muster copies own the §17 tokens locally; glass-ui keeps none.

**(B) ORPHAN-PRUNE — instrument-rail + metric-pill (no native landing; nothing receives them; parallel,
NOT muster-gated).** `instrument-rail` (AK-W2-α cockpit-ratio rail) lost its sole consumer when speedtest
collapsed the survey-dock posture at AN-D6/D7/D11 ("deletion-favoring, no legacy code left behind") and
was never re-adopted — re-introducing it native would resurrect code speedtest intentionally deleted.
`metric-pill` is the manufactured "speedtest stacked-pill default" speedtest never adopted (it routes
through `<MetricBadge>` directly). Both are plain prunes — strike the dir + subpath + root barrel
(`src/index.ts:119` rail / `:95` pill) + `package.json` export/`typesVersions` (rail) + the CSS
(`instrument-rail.css` + `index.css:129` + the rung-13 doc-comment `:98-101`; the `.metric-pill` density
block `utilities.css:482-524`) + the demo stories (`compositions/instrument-rail.vue`,
`primitives/metric-pill.vue` + `manifest.ts:241,126`). IF W21 added the `/metric-pill` subpath (its
recommended RATIFY), strike that subpath block too. **This orphan-prune half is NOT muster-blocked — it
parallelizes with W28 and must not be held hostage to the cross-repo receive.**

**(C) THE SHARED-CSS CONSEQUENCES.** Excise the `@utility twin-line-divider` + `--twin-line-catch` /
`--twin-line-shadow` (`utilities.css:705-713` + its `.dark` arm + the doc-comment) — it loses both
consumers (instrument-chassis.css + instrument-rail.css) atomically this wave; the native copies inline
their own bezel-line α-pair. Excise the dead `variant="instrument-strip"` dock mode (`GlassDock.vue:44`
union member + the `:158`/`:186` computed branches collapse to the surviving `"rail"` branch, which already
provides identical vertical-orientation + fitContent behaviour) + the `dock.css:422-481` block + the
`--glass-bg-chassis` reference there. The `rail` variant is the surviving vertical-dock register.

**(D) THE GATE + DOC RECONCILIATION (the same cut — the families cannot leave green-gated otherwise).**
Update the FIVE chassis-hardcoding gates in lockstep: (1) `proof-composable-return-types.mjs` RETIRE clause
#2 (the twin-line DRY check — the @utility is deleted with both consumers); keep the other 4 clauses. (2)
`proof-consumers-static.mjs:137-138` drop both census lines + adjust the cherry-pick-count comment to
account for the chassis/metric families leaving. (3) `proof-storybook-ia.mjs:75` drop both compositions
slugs. (4) `proof-tailwind-v4-idiom.mjs:151-155` drop the chassis `CONTAINER_CONTEXT` entry (the dock
container-context assert stays as the surviving ≥1 consumer; if the gate requires ≥2, re-point the second
to another live `@container` site). (5) `proof-dock-vocabulary.mjs:14` the comment example (non-load-
bearing — trim for hygiene). RE-WRITE `MIGRATION.md:800-823` to the FINAL retired state (metric-cell/stack
+ instrument-chassis now genuinely retired, native-consumed in speedtest/muster) and keep W21's
`proof:no-retired-survivor` GREEN. Sweep `CLAUDE.md` of the now-dead `ChassisDivider` / instrument-chassis
/ instrument-rail / metric-pill references (6 hits). CORRECT the stale AW.W19 "subpath only" surface
claim — the root barrel IS in scope (a surviving dangling `export *` after the dir is deleted = build
break).

**KEEP-SET — the generic atoms STAY (false-coupling guard).** metric-badge, scrolling-text, pulse,
status-dot, animated-digit stay in glass-ui BY KIND (a value pill / status dot / number reel / marquee /
spinner is the proactive surface of a design system), NOT by raw consumer count. Encode the false-coupling
guard so no future agent drags `MetricBadge` into the repatriation: assert `metric-cell/MetricCell.vue` +
`metric-stack/{MetricStack,MetricRow}.vue` import only `vue` + `cn` (no `MetricBadge` / `AnimatedDigit`),
making the repatriation of the three compositions byte-independent of the kept atoms. (Verified at HEAD:
`MetricCell.vue:2-4`, `MetricRow.vue:1-4`, `MetricStack.vue:1-3` import only vue+cn.) `MetricBadge` is kept
by fourier ×13 + value.js + muster — it does NOT repatriate.

**EDIT-ORDER INVARIANT (the build-break guard — restated from the slice 19 F7 / harden-critique).** Strike
every re-export AND fix the five gate scripts BEFORE deleting any component dir, so `vue-tsc` + `npm run
build` never see a dangling `export *`. Order per family: root barrel line → subpath mirror → api re-export
→ package.json export + typesVersions → gate scripts → CSS `@import` → THEN the dir. The build is the
dangling-import canary — run `vue-tsc` + `npm run build` after each family.

**RATIFY-BEFORE-IMPL (charter-flagged decisions, recommended path recorded):**
- **metric-pill subpath disposition** → recommended path: W21 ships the `/metric-pill` subpath (publication
  symmetry, fold 7); W29 then PRUNES it as part of the §8 metric-family wholesale repatriation. RATIFY the
  W21↔W29 hand: if W21's RATIFY chose the fallback (route-the-zero-consumer-pill-to-W29-prune WITHOUT first
  adding the subpath), W29 prunes the pill with no subpath block to strike. Either way the pill is gone at
  W29 close — RATIFY which W21 path landed BEFORE touching `package.json` (avoid a no-op or a double-prune).
- **`proof-tailwind-v4-idiom` CONTAINER_CONTEXT ≥2-floor** → recommended path: drop the chassis entry, keep
  the dock container-context as the surviving ≥1 consumer. RATIFY whether the gate enforces a hard ≥2
  floor (if so, re-point the second slot to another live `@container` site rather than weakening the gate).
- **chart-chassis-palette.vue co-edit with W19** → the foundations chart-palette story is co-edited by W19
  (DiscoGlyph removal) and W29 (InstrumentChassis removal); the `--chart-*` token ladder is load-bearing
  for MetricRow/tokens.css and MUST survive both. RATIFY the sequence: the LATER wave reconciles against
  the earlier edit; the file is NOT wholesale-deleted. (Recommended: W29 removes the `<InstrumentChassis>`
  import + the live mini-chassis section while KEEPING the `--chart-*` ladder; if W19 already re-expressed
  the DiscoGlyph block to plain token tiles, W29 edits the chassis section of the already-rewritten file.)

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/instrument-chassis/` (whole dir incl. `InstrumentChassis.vue` + `ChassisDivider.vue` + `index.ts`) | **DELETE** (slice 19 F0/F1 — after W28 native receive). |
| `src/components/custom/instrument-rail/` (whole dir) | **DELETE** (slice 19 F2 / slice 23 F2 — orphan, no receive). |
| `src/components/custom/metric-cell/` (whole dir) | **DELETE** (slice 17 F4 / slice 23 F0 — after W28 native receive). |
| `src/components/custom/metric-stack/` (whole dir incl. `MetricStack.vue` + `MetricRow.vue`) | **DELETE** (slice 17 F4 / slice 23 F0 — after W28 native receive). |
| `src/components/ui/metric-pill/` (whole dir) | **DELETE** (slice 23 F1 — orphan, no receive). |
| `src/subpaths/instrument-chassis.ts` · `instrument-rail.ts` · `metric-cell.ts` · `metric-stack.ts` (+ `metric-pill.ts` IF W21 added it) | **DELETE** (the `vite.library.ts` subpaths glob auto-drops the chunks). |
| `src/index.ts` | DELETE the root-barrel `export *` lines `:118` (instrument-chassis) + `:119` (instrument-rail) + `:95` (metric-pill) + the `instrument-chassis`/`instrument-rail` tokens in the `:53` cherry-pick comment + the `metric-cell`/`metric-stack` tokens in the `:71` subpath note. |
| `src/api/index.ts` | DELETE the `InstrumentChassisPhase` re-export (`:96`) + the `MetricCellAppearance`/`MetricCellProps`/`MetricStackProps` block (`:216-228`) + the `:19,:220` comment mentions. |
| `package.json` | DELETE the `./instrument-chassis` (`:376-378`), `./instrument-rail` (`:380-382`), `./metric-cell` (`:320-322`), `./metric-stack` (`:324-326`) `exports` blocks + the four `typesVersions['*']` rows (`:100-101`, `:103-104`, `:64-65`, `:67-68`) + the `./metric-pill` block IF W21 added it. |
| `src/styles/instrument-chassis.css` · `src/styles/instrument-rail.css` | **DELETE** both. |
| `src/styles/index.css` | DELETE the two `@import` lines (`:128` chassis, `:129` rail) + the rung-12/13 cascade doc-comments (`:95-97`, `:98-101`). |
| `src/styles/utilities.css` | DELETE the `@utility twin-line-divider` def + its `.dark` arm + the doc-comment (`:705-713` + the `:699-704` comment) AND the `.metric-pill` density block (`:482-524`). |
| `src/styles/tokens.css` | DELETE the §17 METRIC block (`:1197-1220`, the `--metric-row-*`/`--metric-cell-*` tokens the native copies inline) — verify NO surviving glass-ui consumer references them before removal. |
| `src/components/custom/dock/GlassDock.vue` | EXCISE `"instrument-strip"` from the variant union (`:44`), collapse the `:158`/`:186` computed branches to the `"rail"` branch (slice 19 F4). |
| `src/styles/dock.css` | DELETE the `.glass-dock.variant-instrument-strip` block (`:422-481`) + the `--glass-bg-chassis` reference; preserve the rail surface (`:395` comment + the rail block). |
| `demo/stories/compositions/instrument-chassis.vue` · `compositions/instrument-rail.vue` · `data/metric-cell.vue` · `data/metric-stack.vue` · `primitives/metric-pill.vue` | **DELETE** all five. |
| `demo/stories/manifest.ts` | DELETE the five rows (`:240` instrument-chassis, `:241` instrument-rail, `:187` metric-cell, `:188` metric-stack, `:126` metric-pill). |
| `demo/stories/foundations/chart-chassis-palette.vue` | REMOVE the `<InstrumentChassis>` import + the live mini-chassis section (`:15,:103-113`) but KEEP the `--chart-*` token ladder (consumed by tokens.css + the surviving palette tour); retitle/rescope to a pure chart-color palette. **Co-edited with W19** (DiscoGlyph removal) — reconcile against the earlier edit, do NOT wholesale-delete. |
| `scripts/proof-composable-return-types.mjs` | RETIRE clause #2 (`:43-44,:100-121` — the twin-line-divider DRY check); keep the other 4 clauses. |
| `scripts/proof-consumers-static.mjs` | DELETE the chassis/rail census lines (`:137-138`) + adjust the cherry-pick COUNT comment for the families leaving. |
| `scripts/proof-storybook-ia.mjs` | DELETE the `instrument-chassis`/`instrument-rail` slugs (`:75`, compositions band) + the metric-cell/stack/pill slugs if enumerated. |
| `scripts/proof-tailwind-v4-idiom.mjs` | DELETE the chassis `CONTAINER_CONTEXT` entry (`:151-155`); keep the dock container-context as the surviving ≥1 consumer (RATIFY the ≥2-floor). |
| `scripts/proof-dock-vocabulary.mjs` | Trim the `instrument-strip` comment example (`:14`, non-load-bearing). |
| `MIGRATION.md` | RE-WRITE the `RETIRED (AV.W10)` entry (`:800-823`) to the FINAL truth: metric-cell/stack + instrument-chassis genuinely retired, native-consumed in speedtest/muster; keep W21's `proof:no-retired-survivor` GREEN. |
| `CLAUDE.md` | SWEEP the now-dead `ChassisDivider`/instrument-chassis/instrument-rail/metric-pill references (6 hits) from the structure tree + the contract sections. |
| `docs/tranches/AX/audit/W29-repatriation-prune.json` | **NEW** — the born-RED→GREEN audit artefact. |

**OUT of bounds:** the W28-owned speedtest/muster NATIVE copies + their `proof:repatriate-local` gates +
`coordination/CONSTELLATION.md` (W28/W34 author the sibling source; this wave writes NO sibling source);
the W21-owned MIGRATION.md `proof:no-retired-survivor` GATE AUTHORSHIP + the metric-pill `/metric-pill`
subpath ADDITION + the configurator root-barrel contradiction (W21 makes the doc honest NOW + adds the
subpath; W29 prunes); the W19-owned `header-ribbon`/`glyph-face`/`disco-glyph` prune (W19 only NOTES the
chart-chassis-palette co-edit — DIFFERENT block, the DiscoGlyph swatch grid); the KEPT atoms
(`metric-badge` / `scrolling-text` / `pulse` / `status-dot` / `animated-digit` dirs — DO NOT TOUCH; the
keep-set is correct per §4 note 4); the W25b utilities.css/tokens.css CARVES (W25b's utilities-portion
dependsOn W29 — the ~190-line metric-badge recipe relocates AFTER this ownership decision; W29 only deletes
the metric-pill density block + the §17 metric-cell/stack tokens, NOT the metric-badge recipe); the live
`--chart-*` token ladder (load-bearing for MetricRow's successor consumers + tokens.css — SURVIVES).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W28 (speedtest native-first receive — the HARD PREDECESSOR).** W28 lands the native copies in
  speedtest + muster, rewires every import to local, de-glass-ui's them, and authors the born-RED
  `proof:repatriate-local` (speedtest-side + muster-side). **W29 is the glass-ui-side strike that runs ONLY
  AFTER W28's native receive is green** (the repatriate-prune half; the orphan-prune half is NOT gated and
  parallelizes). **Disjoint by repo + by phase:** W28 writes ONLY sibling source (speedtest/muster) + the
  `coordination/CONSTELLATION.md` annexes; W29 writes ONLY glass-ui source. The shared surface is the
  CONSTELLATION coordination doc — W28 declares the receive complete, W29 reads it as the prune-go signal.
  The `R-clean → R0-receive → W-prune → R1-bump` DAG: W29 is `W-prune`.
- **vs W21 (recategorize-ledger + barrel coherence + metric-pill + MIGRATION.md honesty).** **The most
  surface-shared sibling — disjoint by ACTION, not by file.** W21 makes the MIGRATION.md DOC honest NOW
  (rewrites the `RETIRED (AV.W10)` entry to the un-retired TRUTH), AUTHORS `proof:no-retired-survivor`
  born-RED, and ADDS the `/metric-pill` subpath (publication symmetry). W29 PRUNES the families for real
  (after W28) + RE-WRITES MIGRATION.md to the FINAL retired state + PRUNES the metric-pill (subpath
  included). **Coherence contract:** `proof:no-retired-survivor` is born-RED at HEAD, GREEN after W21's doc
  truth (the un-retired state is honestly declared), and STAYS GREEN after W29's prune (the now-retired
  state resolves to zero survivors). W21 does NOT prune; W29 does NOT author the gate. Shared files
  (`src/index.ts`, `package.json`, `MIGRATION.md`, `src/api/index.ts`): W21 may add the metric-pill subpath
  block + rewrite the MIGRATION.md entry to un-retired; W29 deletes the metric-pill block + the chassis/
  metric exports + rewrites MIGRATION.md to retired. **Sequence W21 BEFORE W29** (W21's un-retired truth +
  the subpath are the baseline W29 prunes FROM). RATIFY which W21 metric-pill path landed before touching
  `package.json` (subpath-then-prune vs route-to-W29).
- **vs W19 (primitive prune A — header-ribbon/glyph-face/disco-glyph).** **One shared file:**
  `demo/stories/foundations/chart-chassis-palette.vue` — the manufactured 2nd-consumer demo for BOTH
  DiscoGlyph (W19 excises) AND InstrumentChassis (W29 excises). Both must surgically preserve the surviving
  `--chart-*` token ladder. **Disjoint by block:** W19 rewrites the DiscoGlyph swatch grid (`:16,:60-99`) to
  plain token tiles; W29 removes the `<InstrumentChassis>` import + the live mini-chassis section
  (`:15,:103-113`). The LATER wave reconciles against the earlier edit; the file is NEVER wholesale-deleted
  (the `--chart-*` tour survives both). Both touch `proof-storybook-ia.mjs` + `proof-consumers-static.mjs`
  but DIFFERENT slugs/ledger entries (W19: the three primitives; W29: the two chassis compositions + the
  metric stories). Coordinate the manifest-row + gate-ledger deletions at merge (disjoint row/slug sets, no
  semantic conflict).
- **vs W06 (dock storybook consolidation + dock.css split).** W06 splits `dock.css` (1227 lines) into
  `src/styles/dock/` cohesive partials. W29 EXCISES the `.glass-dock.variant-instrument-strip` block
  (`dock.css:422-481`). **Disjoint by sequence:** W06 dependsOn W01+W04 (it carves the FINAL dock model
  AFTER the morph + wrap rewrites); W29 should strike the instrument-strip variant from `dock.css` BEFORE
  W06's partition (so W06 partitions a model already free of the dead variant) OR W29 strikes it from the
  carved partial if W06 landed first. RATIFY the order with W06's gate-author; the instrument-strip block
  is W29's regardless of WHERE it lives at strike-time (slice 19 F4 owns it as a chassis-vocabulary
  excision).
- **vs W25b (CSS monolith carves — utilities.css RELOCATE + tokens.css §-seam partials).** W25b's
  utilities-portion **dependsOn W29** (§4 note 19): the ~190-line metric-badge recipe in `utilities.css`
  relocates to the RIGHT repo only AFTER this §7/§8 metric-ownership decision lands. **Disjoint by
  artefact:** W29 deletes the `.metric-pill` density block (`:482-524`) + the §17 metric-cell/stack tokens
  (`tokens.css:1197-1220`); W25b carves the SURVIVING metric-badge recipe + the §-seam partials. W29 does
  NOT carve the monoliths; W25b does NOT prune the metric families. W29 runs FIRST (W25b waits on it).
- **vs W18 (storybook IA ground-up reinvention).** W18 authors the new category tree + re-baselines the
  three IA gates LAST over the already-pruned manifest. W29 deletes its five manifest rows + the
  `proof:storybook-ia` slugs FIRST. **Disjoint by ownership:** W29 owns the five row/slug deletions; W18
  owns the CATEGORY-TREE authorship + the `EXPECTED_TREE` re-baseline. W29 does NOT author the tree; W18
  does NOT re-add the pruned families.
- **vs W34/W35 (cross-repo idiom-census + consumer-migration DAG).** W34 receives the §16 idiom census +
  routes the speedtest/muster pin-bump-to-the-pruned-cut adoption (R1). W35 sequences the keyframes
  HeaderRibbon/GlassPanel consumer migrations before the W19/W20 publish. **Disjoint by repo:** W29 writes
  ONLY glass-ui source (the in-repo prune); the PUBLISH of the prune + the consumer pin-bumps ride W33/W34
  (the AX cut). W29 carries the speedtest/muster R1-bump as a routed NOTE, not an execution.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms; Arm B parallelizes Arm A but the orphan-prune is NOT
  W28-gated).** Arm A (the repatriate-prune — GATED on W28's native receive, serial within the arm):
  per-family, FIRST strike the root barrel line + subpath mirror + api re-export + package.json export/
  typesVersions + the relevant gate scripts + the CSS `@import`, THEN delete the dir (the edit-order
  invariant — the build never sees a dangling `export *`); `vue-tsc` + `npm run build` after EACH family
  (instrument-chassis, then metric-cell, then metric-stack); excise the twin-line-divider @utility + the §17
  metric tokens; delete the three demo stories + manifest rows; re-write MIGRATION.md to the FINAL retired
  state; sweep CLAUDE.md. Arm B (the orphan-prune + the dock variant — NOT W28-gated, parallel): strike
  instrument-rail (dir + subpath + barrel + package.json + CSS + demo + manifest) + metric-pill (dir +
  barrel + the `.metric-pill` density block + demo + manifest + the `/metric-pill` subpath IF W21 added it)
  + the dead `instrument-strip` dock variant (GlassDock union + computed branches + dock.css block) + the
  chart-chassis-palette mini-chassis section (reconciled against W19's DiscoGlyph edit). `vue-tsc` + `npm
  run build` at every interval (the dangling-import canary). The five gate-script edits are shared — Arm A
  owns the twin-line/census/IA edits, Arm B owns the tailwind-v4-idiom/dock-vocabulary edits; coordinate the
  consumers-static COUNT comment.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched tree:
  asserts all five dirs are GONE; asserts `node -e 'import("@mkbabb/glass-ui/instrument-chassis")'` (+
  `/instrument-rail`, `/metric-cell`, `/metric-stack`, `/metric-pill`) all 404 at resolution; asserts ZERO
  `instrument-chassis`/`instrument-rail`/`metric-cell`/`metric-stack`/`metric-pill` refs across
  package.json / api / index.ts / index.css / manifest / the five gate scripts / CLAUDE.md; grep-confirms NO
  surviving `twin-line-divider`/`--twin-line-catch`/`--twin-line-shadow` and NO `variant-instrument-strip`/
  `instrument-strip` in dock source; re-renders chart-chassis-palette to confirm the `--chart-*` tour
  survives sans chassis; confirms `proof:no-retired-survivor` (W21's gate) STAYS GREEN with MIGRATION.md at
  the final retired state. ADVERSARIAL twists: (a) tries to "pass" the prune with a family merely demoted
  from the root barrel but the dir/subpath surviving (confirms a demote ≠ a delete); (b) confirms the KEPT
  atoms (`metric-badge`/`scrolling-text`/`pulse`/`status-dot`/`animated-digit`) are UNTOUCHED and that
  `MetricBadge` did NOT get dragged into the repatriation (the false-coupling guard: the deleted MetricCell/
  MetricStack/MetricRow imported only vue+cn, so MetricBadge is byte-independent); (c) confirms `dock.css`
  partition (if W06 landed) / the `rail` variant still renders after the instrument-strip collapse (the
  surviving vertical register); (d) tries to "pass" `proof:no-retired-survivor` by deleting the MIGRATION.md
  RETIRED heading entirely (confirms the gate requires the truthful retired claim, not the heading erased).
- **Gate-author (≤1 agent — re-baseline + clause-retire, plus the coherence check).** RETIRES
  `proof-composable-return-types` clause #2; re-baselines `proof:storybook-ia` (slug set shrunk, with W18);
  trims `proof-consumers-static` census + the cherry-pick count; drops the chassis `CONTAINER_CONTEXT` from
  `proof-tailwind-v4-idiom`; confirms `proof:storybook-complete` + `proof:no-orphan-demo-route` GREEN after
  the five row deletions; runs the deletion/resolution-404 proofs; confirms W21's `proof:no-retired-survivor`
  STAYS GREEN. Confirms each assertion FAILS at the pre-prune tree and PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement +
1 verify + 1 gate.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN (build/structural/deletion artefacts, the precept-valid
forms — NOT grep-for-source-string-as-runtime-behaviour):**

1. **`vue-tsc --noEmit` GREEN** (the dangling-import canary): after every re-export is struck per the
   edit-order invariant, there is NO unresolved `instrument-chassis`/`instrument-rail`/`metric-cell`/
   `metric-stack`/`metric-pill` import in the typegraph. **Born-RED** if a dir is deleted before its
   `export *` (a dangling import reds the typecheck); GREEN after the ordered strike.
2. **`npm run build` GREEN** — the `vite.library.ts` subpaths glob auto-drops the five chunks once the
   `src/subpaths/*.ts` mirrors are gone; `dist/instrument-chassis.js` / `instrument-rail.js` /
   `metric-cell.js` / `metric-stack.js` / `metric-pill.js` (+ their `.d.ts`) ARE NO LONGER EMITTED.
   **Born-RED** if a package.json export still points at a now-absent dist file (the `verify-export-types`
   probe reds); GREEN after the export blocks drop. `verify-export-types` + `proof:resolution`
   auto-drop the removed subpaths (they enumerate `package.json.exports` dynamically).
3. **`proof:storybook-complete` + `proof:no-orphan-demo-route` GREEN** — every manifest route resolves to
   an existing SFC; no dangling route after the five story-file + manifest-row deletions. **Born-RED** if a
   manifest row points at a deleted story; GREEN after the rows drop.
4. **`proof:storybook-ia` re-baselined** — the EXPECTED slug set NO LONGER carries `instrument-chassis`/
   `instrument-rail` (+ the metric slugs). **Born-RED** at the pre-prune tree (the slugs present); GREEN
   after the slug deletions + re-baseline.
5. **The five chassis gates GREEN at their NEW shape:** `proof:composable-return-types` (clause #2 retired,
   the other 4 hold), `proof:consumers-static` (census + count trimmed), `proof:tailwind-v4-idiom` (chassis
   CONTAINER_CONTEXT dropped, dock container-context holds), `proof:dock-vocabulary` (comment trimmed).
   **Born-RED** if any still hardcodes a removed family; GREEN after.
6. **`proof:no-retired-survivor` STAYS GREEN** (the W21→W29 coherence contract): MIGRATION.md's RETIRED
   entries now resolve to ZERO surviving dir/subpath/export/token (the families are genuinely gone). W21
   authored the gate born-RED; W29 keeps it green at the FINAL retired state.
7. A **deletion-PROOF** (valid artefact form, NOT a runtime grep): `test -d
   src/components/custom/{instrument-chassis,instrument-rail,metric-cell,metric-stack}` + `test -d
   src/components/ui/metric-pill` → all absent; `node -e 'import("@mkbabb/glass-ui/instrument-chassis")
   .then(()=>process.exit(1)).catch(()=>process.exit(0))'` (+ the four siblings) → resolution 404 (exit 0);
   `grep -rc "instrument-chassis\|instrument-rail\|metric-cell\|metric-stack\|metric-pill\|twin-line-divider\|
   variant-instrument-strip" package.json src/api/index.ts src/index.ts src/styles/ scripts/proof-*.mjs
   CLAUDE.md` → 0 across the surface (excepting the survivor `metric-badge` recipe W25b owns).
8. A **cross-repo born-RED handoff PROOF (PUBLISH-gating, owned by W28+W34)**: W28's speedtest-side +
   muster-side `proof:repatriate-local` is GREEN (both consumers native + ZERO `@mkbabb/glass-ui/{metric-
   cell,metric-stack,instrument-chassis}` import survives) BEFORE this prune is depended on; the
   speedtest/muster R1 pin-bump-to-the-pruned-cut rides W34 after the AX publish. W29 records the bump as a
   routed NOTE, not a re-implementation.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; appearance/interaction
axis, NOT a headless proof alone).** A live Playwright + frontend-design pass in **light AND dark** at **≥ 3
viewports** (375×667 / 1280×800 / 1440×900):
- **No dangling routes / no 404s in the demo storybook:** navigate the storybook and confirm there is NO
  route, nav link, or search result for `instrument-chassis`, `instrument-rail`, `metric-cell`,
  `metric-stack`, or `metric-pill` — the five removed surfaces leave NO broken navigation, NO blank panel,
  NO console error.
- **The chart-chassis-palette tour survives the chassis removal:** the foundations chart-palette story
  renders the `--chart-*` (ping/download/upload/jitter) token tiles correctly without the live
  `<InstrumentChassis>` mini-chassis; affordance/hierarchy/spacing/padding hold; no visual occlusion (and no
  collision with W19's DiscoGlyph-block rewrite).
- **The dock `rail` variant renders unchanged after the `instrument-strip` collapse:** a vertical
  `GlassDock variant="rail"` reads identically (the surviving vertical register) — the instrument-strip
  excision did NOT collateral-break the rail's orientation/fitContent behaviour.
- **The KEPT atoms render unchanged:** the `metric-badge` / `scrolling-text` / `pulse` / `status-dot` /
  `animated-digit` stories paint identically — the prune did NOT collateral-delete a kept generic atom
  (the false-coupling guard, live-confirmed).
- **Cross-repo live confirm (read-only, the W28 receive surfaces):** speedtest + muster render their native
  copies unchanged (the cross-repo live audit W28 captures; W29 reads it as the prune-safe signal). The
  published glass-ui surface (post-build `dist/`) has no broken references.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against the
   pre-prune tree live: the five dirs exist + their subpaths resolve; instrument-chassis/rail are on the
   root barrel (the AW.W19 "subpath only" claim is FALSE); metric-pill has zero binary consumers; the
   twin-line-divider has exactly its two chassis/rail CSS consumers; the instrument-strip variant has zero
   live bindings; MIGRATION.md (post-W21) declares the un-retired truth and `proof:no-retired-survivor` is
   GREEN at the un-retired state. **VERIFY W28's `proof:repatriate-local` is GREEN (both siblings native)
   before the repatriate-prune half** — do not proceed on the audit's word; re-prove the receive. Record
   the born-RED baseline in `audit/W29-…json`.
2. **REPATRIATE-PRUNE instrument-chassis (Arm A — gated on W28).** Per the edit-order invariant: strike the
   root barrel `:118` + subpath mirror + api `:96` + package.json `:376-378`/`:100-101` + the chassis gate
   scripts (composable-return-types clause #2, consumers-static, storybook-ia, tailwind-v4-idiom,
   dock-vocabulary) + the CSS `@import` `:128`, THEN delete the dir + `instrument-chassis.css`. `vue-tsc` +
   `npm run build`.
3. **REPATRIATE-PRUNE metric-cell + metric-stack (Arm A).** Strike each family's root barrel/comment + api
   `:216-228` + package.json `:320-326`/`:64-68` + the §17 metric tokens (`tokens.css:1197-1220`), THEN
   delete the two dirs + the two demo stories (`data/metric-cell.vue`, `data/metric-stack.vue`) + manifest
   rows `:187,:188`. `vue-tsc` + `npm run build`.
4. **ORPHAN-PRUNE instrument-rail + metric-pill (Arm B — parallel, NOT W28-gated).** Strike instrument-rail
   (`:119` + subpath + package.json `:380-382`/`:103-104` + `instrument-rail.css` + `index.css:129` + demo
   `compositions/instrument-rail.vue` + manifest `:241`); strike metric-pill (`:95` + the `.metric-pill`
   density block `utilities.css:482-524` + demo `primitives/metric-pill.vue` + manifest `:126` + the
   `/metric-pill` subpath IF W21 added it). `vue-tsc` + `npm run build`.
5. **EXCISE the shared-CSS consequences (Arm B).** Delete the `@utility twin-line-divider` +
   `--twin-line-catch`/`--twin-line-shadow` + doc-comment (`utilities.css:699-713`); excise the
   `instrument-strip` dock variant (GlassDock union `:44` + computed branches `:158`/`:186` collapse to
   `rail` + `dock.css:422-481` block + the `--glass-bg-chassis` ref); re-express the chart-chassis-palette
   mini-chassis section (keep the `--chart-*` ladder; reconcile against W19's DiscoGlyph edit). `vue-tsc` +
   `npm run build`.
6. **RECONCILE the docs (both arms).** RE-WRITE `MIGRATION.md:800-823` to the FINAL retired state
   (metric-cell/stack + instrument-chassis genuinely retired, native-consumed); sweep `CLAUDE.md` (6 hits);
   confirm W21's `proof:no-retired-survivor` STAYS GREEN.
7. **Gates GREEN + visual truth.** Run the five chassis gates at their new shape + `proof:storybook-complete`
   + `proof:no-orphan-demo-route` + the deletion/resolution-404 proofs; run the VISUAL-TRUTH live storybook
   audit (no dangling route, chart-palette survives, rail renders, kept atoms render); capture the paired-π
   BEFORE/AFTER + DELTA; route the speedtest/muster R1 pin-bump NOTE to W34; write `audit/W29-…json` to
   GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W29-repatriation-prune.json` — the born-RED→GREEN ledger: the six RED witnesses
  (the families on the full surface; the metric-pill zero-consumer orphan; the twin-line-divider two-only
  consumers; the dead instrument-strip variant; the five hardcoding gates; the MIGRATION.md binding-doc
  arm), the per-finding (slice 19 F0-F7 / slice 23 F1-F4 / slice 17 F4) disposition, the W28 receive-green
  precondition checkmark, and the post-wave GREEN measurements (five dirs gone, five subpaths 404, the five
  gate scripts at their new shape, MIGRATION.md at the final retired state, the §17 tokens + twin-line
  utility + instrument-strip variant gone, the `--chart-*` ladder + kept atoms surviving).
- The post-build `dist/` proof: `dist/instrument-chassis.js` / `instrument-rail.js` / `metric-cell.js` /
  `metric-stack.js` / `metric-pill.js` (+ their `.d.ts`) ARE NO LONGER EMITTED (the subpaths-glob auto-drop
  evidence; `verify-export-types` + `proof:resolution` auto-drop the removed exports).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the storybook nav before/after (the five
  routes present → gone, no 404), the chart-chassis-palette story before/after (the mini-chassis removed,
  the `--chart-*` hues still reading), the dock rail variant before/after (unchanged after the
  instrument-strip collapse), at ≥ 3 viewports × light/dark.
- The false-coupling-guard evidence: `MetricCell.vue` / `MetricStack.vue` / `MetricRow.vue` import only
  vue+cn (the byte-independence of the repatriation from the kept `MetricBadge`), recorded so a future agent
  cannot drag MetricBadge into a later repatriation.
- A speedtest/muster R1-bump NOTE annex (routed to W34, NOT executed here): both consumers bump their pin to
  the pruned AX cut after publish; `coordination/CONSTELLATION.md` declares the bump as the R1 leg of the
  `R-clean → R0-receive → W-prune → R1-bump` DAG.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(prune): W29 born-RED baseline — the 3 repatriated families + 2 orphans + twin-line-divider + instrument-strip on the full surface; W28 receive-green precondition (AX.W29)`
2. `refactor(custom): repatriate-prune instrument-chassis — dir + ChassisDivider + root barrel + subpath + api + exports + css + the 5 chassis gates (AX.W29 slice19 F0/F1)`
3. `refactor(custom): repatriate-prune metric-cell + metric-stack — dirs + barrel + api types + exports + §17 tokens + demo stories (AX.W29 slice17 F4 / slice23 F0)`
4. `refactor(custom): orphan-prune instrument-rail + metric-pill — dirs + barrel + exports + css + the .metric-pill density block + demos (AX.W29 slice19 F2 / slice23 F1/F2)`
5. `refactor(styles): excise the twin-line-divider @utility + the dead GlassDock instrument-strip variant + re-express the chart-palette tour sans chassis (AX.W29 slice19 F3/F4)`
6. `docs(prune): MIGRATION.md final-retired-state rewrite + CLAUDE.md ChassisDivider/instrument/metric sweep; proof:no-retired-survivor stays green (AX.W29 slice17 F4 / slice23 F4)`
7. `chore(AX.W29): audit ledger GREEN + the 5 chassis gates re-shaped + storybook-ia re-baseline + paired-π no-dangling-route capture + R1-bump NOTE→W34`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W28 (speedtest native-first receive) — the HARD PREDECESSOR of the repatriate-prune half (charter
  `### AX.W29` dependsOn AX.W28, line 1475).** instrument-chassis is a LIVE speedtest (`^3.6.0`) + muster
  (`^3.1.0`) consumer surface — a unilateral glass-ui rip strands two production apps. Per the inv-16'
  native-first / prune-after wall (§4 note 8 / slice 23 F0), W28 lands the native copies + rewires + de-
  glass-ui's the imports + greens `proof:repatriate-local` BEFORE W29 strikes. The `R-clean → R0-receive →
  W-prune → R1-bump` DAG places W29 at `W-prune`. **The orphan-prune half (instrument-rail + metric-pill,
  ZERO consumers) is NOT W28-gated** — it parallelizes (slice 23 F1/F2, "no native-first gate") and must not
  be held hostage to the cross-repo receive.
- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  no-dangling-route live storybook audit + the chart-palette/rail before/after — the binding close
  criterion. W29 cannot close on the structural gates alone (a green `proof:storybook-ia` over a 404-ing
  live storybook is exactly the AW cardinal failure); W00 stands up the lane it closes on.
- **AX.W21 (recategorize-ledger + MIGRATION.md honesty + metric-pill subpath) — the COHERENCE PREDECESSOR
  (coordinate, not a hard charter dependsOn).** W21 rewrites the MIGRATION.md `RETIRED (AV.W10)` lie to the
  un-retired TRUTH NOW (so the binding-doc lie does not ride the whole tranche to W29), authors
  `proof:no-retired-survivor` born-RED, and adds the `/metric-pill` subpath (publication symmetry). W29 is
  the wave that makes the doc's retired claim TRUE (the prune) + prunes the pill (subpath included) + keeps
  W21's gate GREEN. **Sequence W21 BEFORE W29** — W21's un-retired truth + the subpath are the baseline W29
  prunes FROM. RATIFY which W21 metric-pill path landed.
- **Downstream:** **AX.W25b** (utilities.css/tokens.css carves) dependsOn W29 (§4 note 19) — the metric-
  badge recipe relocates to the right repo only AFTER this §7/§8 ownership decision. **AX.W18** re-baselines
  the IA tree over the W29-pruned manifest. **AX.W34** receives the speedtest/muster R1 pin-bump-to-the-
  pruned-cut adoption (the §16 receiver) + the §16 idiom census. **AX.W33** registers the W29 gate-shape
  changes into the close gate-fleet + `proof:ax-final`.
- **Coordination (not a blocker):** **AX.W19** co-edits `chart-chassis-palette.vue` (the DiscoGlyph block,
  DIFFERENT from W29's chassis block) — the `--chart-*` ladder survives both; the LATER wave reconciles.
  **AX.W06** owns the `dock.css` split — coordinate the instrument-strip variant strike order.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`_DECISION.md` (2026-06-07 user policy override, `docs/tranches/AW/audit/repatriation/_DECISION.md:9-13,
  37,43-44,63-64`)** — the BINDING verdict that flipped instrument-chassis from the earlier KEEP-SHARED to
  REPATRIATE ("the instrument chassis is not general enough" + "Muster does not count") and confirmed
  metric-pill + instrument-rail as plain orphan-prunes. This overrides the stale `_glassui-prune-plan.md:222`
  KEEP-SHARED verdict and the AW per-family digest. The decisive lens is generic-atom-vs-domain-composition,
  NOT raw consumer count.
- **`docs/tranches/AW/waves/AW.W19-orphan-prune.md` (status "planned", never ran)** — the repatriate-prune
  wave authored to fix this, deferred per §13 (the muster-block: speedtest's stale stash + 23-ahead reconcile
  debt + muster's zero native copies = neither tree clean enough to take the IMPL go). Its scope prose
  carries the STALE "none of the 3 ride the root barrel … reach consumers via subpath only" claim — FALSE at
  HEAD (`src/index.ts:118-119` ARE `export *` lines). The AX wave MUST strike the root barrel (a surviving
  dangling `export *` after the dir is deleted = build break; slice 19 F7 — the audit-hygiene finding that
  prevents a shipped regression). The `src/index.ts:71` the AW.W19 plan cites is a DIFFERENT comment (the
  metric-cell/stack subpath note), not the instrument-chassis line.
- **`0601d62`** ("new primitive — stacked taller-fatter pill composing MetricBadge") — the MetricPill
  landing, shipped as a "speedtest stacked-pill default" speedtest never adopted (`MetricPill.vue:8` carries
  the stale credit). The overfit-substrate origin (slice 23 F1; `metric-badge-pill.md:28-31,39` red-herring
  analysis + overfit verdict).
- **AK-W2-α** — the InstrumentRail landing (the speedtest survey two-pane cockpit 1/φ² flex-basis rail).
- **AN-D6/D7/D11** ("deletion-favoring, no legacy code left behind") — the speedtest cockpit-posture
  collapse that stranded InstrumentRail as substrate-without-consumer; it was never garbage-collected because
  the AW.W19 prune that would have removed it never ran.
- **AJ-W1-δ** (per G-AJ-D7 Path 1) — the `variant="instrument-strip"` dock mode landing (sympathetic-mimicry
  coupling: duplicating InstrumentChassis surface vocabulary inside the dock for a vertical speedtest cockpit
  dock). Lost its only consumer at the AN-D6 cockpit retire; never pruned.
- **AW.W15** — the `@utility twin-line-divider` extraction (DRY the bezel-line α-pair shared by the chassis +
  rail — its only two consumers by construction). Both leave glass-ui this wave, so the utility orphans
  atomically (J invariant 10 / L invariant 8).
- **AV.W10** — the half-landed metric-cell/stack retirement: MIGRATION.md `:800-823` declares them "RETIRED
  (AV.W10)" while the dirs/subpaths/exports/§17-tokens all ship (the binding-doc lie; L invariant 16). W21
  repairs the doc to the truth NOW; W29 makes the retired claim genuine.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; all five dirs ship, the five
  subpaths resolve, instrument-chassis/rail are on the root barrel, the twin-line-divider + instrument-strip
  + §17 metric tokens are live; the published registry line is 3.6.0 (speedtest `^3.6.0`, muster `^3.1.0`
  pins) — the R1 bump rides the AX cut.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-K binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (inv-16'; `precepts/README.md` line 8 "Substrate and
  consumer land together. A primitive that is not consumed is unfinished work."; SPEC.md §"Every wave lands
  substrate with its consumer or deletes the substrate").** The repatriate-prune half is the inv-16'
  native-first / prune-after discipline made concrete: W28 lands the native consumers BEFORE W29 retires the
  glass-ui substrate, so no production app is stranded mid-prune. The orphan-prune half is the unconsumed-
  substrate disposition (delete the primitive that has no consumer — instrument-rail + metric-pill have ZERO
  binary consumers). MUST NOT leave a demoted-but-surviving dir/subpath/export (a demote ≠ a delete);
  MUST NOT run the repatriate-prune half before W28's `proof:repatriate-local` is green (that would resurrect
  the muster-block strand).
- **no-overfitting (`precepts/README.md` lines 10-11 "No overfitting. A public surface … needs a current
  consumer and evidence. Otherwise delete it."; `precepts/audits/overfitting-audit.md`).** instrument-rail
  + metric-pill + the `instrument-strip` dock variant are textbook overfit substrate (a primitive minted for
  one absent consumer / a manufactured default never adopted). The wave DELETES them. The KEEP-SET
  (metric-badge / scrolling-text / pulse / status-dot / animated-digit) is NOT overfit — it is the generic-
  atom surface of a design system; the wave MUST NOT over-prune the kept atoms. The false-coupling guard
  (MetricCell/Stack/Row import only vue+cn) is the no-overfitting evidence that the repatriation is
  byte-independent of the kept MetricBadge.
- **one-path / no-legacy-code (no-backwards-compat memory; SPEC.md §"no shadow APIs or temporary
  compatibility layers").** The excision is clean — no legacy alias, no `@deprecated` re-export, no rehome.
  The twin-line-divider + the §17 metric tokens + the instrument-strip variant are deleted, not bridged with
  a shim; the native speedtest/muster copies inline their own. MUST NOT ship a stub re-export of any of the
  five subpaths; MUST NOT keep the `instrument-strip` variant as a dead union member.
- **cross-repo coordination doc + sibling-baseline-capture (the band-K named precept; SPEC.md §Document
  Set).** The repatriate-prune half is the `W-prune` leg of the `R-clean → R0-receive → W-prune → R1-bump`
  DAG declared in `coordination/CONSTELLATION.md`. W29 reads W28's receive-complete signal from the
  coordination doc (the sibling-baseline-capture ritual: speedtest + muster HEAD + clean-tree at receive
  time) and routes the R1 pin-bump to W34. MUST NOT write sibling source (glass-ui writes ONLY its own src;
  W28/W34 own the sibling edits).
- **binding-doc honesty / no-retired-survivor (L invariant 16 "the migration guide is binding";
  `MIGRATION.md`).** W29 RE-WRITES the MIGRATION.md RETIRED entry to the FINAL truthful state (the families
  genuinely retired, native-consumed) and keeps W21's `proof:no-retired-survivor` GREEN. The anti-pattern
  the gate forbids: a half-landed retirement the migration guide asserts as complete (the exact AW
  "doc-says-done but reverted" failure class). MUST NOT "pass" the gate by erasing the RETIRED heading —
  the truth must be told (genuinely retired + native-consumed).
- **no-silent-deferrals (SPEC.md §"'consumer will be wired later' is NOT a valid gate"; the §16.4
  zero-loss).** The speedtest/muster R1 pin-bump-to-the-pruned-cut is NOT silently dropped — it is ROUTED to
  W34 with the `coordination/CONSTELLATION.md` declaration (an explicit handoff, the R1 leg of the DAG). The
  chart-chassis-palette `--chart-*` ladder is NOT collateral-deleted — it is explicitly preserved + routed
  through the W19 co-edit reconciliation. The W25b metric-badge recipe relocation is NOT pre-empted here — it
  is signposted as W25b's (dependsOn W29).
- **gates-close-on-evidence (`precepts/README.md` line 13; SPEC.md §Hard Gates — build/test/runtime/diff/
  deletion, NOT grep-for-source-string-as-runtime-behaviour).** The gates are build (`vue-tsc` / `npm run
  build` as the dangling-import canary + the dist auto-drop), structural (`proof:storybook-ia` slug set,
  `proof:consumers-static` census, the re-shaped chassis gates), DELETION proofs (the five dirs absent, the
  five subpaths 404), and the binding-doc gate (`proof:no-retired-survivor`) — the precept-valid artefact
  forms. The close is the executed live storybook Playwright pass (no dangling route, chart-palette + rail +
  kept atoms render), never a headless proof alone — the cardinal AX precept.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **metric-pill subpath disposition (W21↔W29 hand).** Recommended: W21 ships `/metric-pill` (publication
   symmetry); W29 prunes it as part of the §8 wholesale metric repatriation. RATIFY which W21 path landed
   (subpath-then-prune vs route-to-W29-prune-without-subpath) BEFORE touching `package.json` — avoid a
   no-op (no subpath block to strike) or a double-prune. **RATIFY-BEFORE-IMPL.**
2. **`proof-tailwind-v4-idiom` CONTAINER_CONTEXT ≥2-floor.** Recommended: drop the chassis entry, keep the
   dock container-context as the surviving ≥1 consumer. RATIFY whether the gate enforces a hard ≥2 floor —
   if so, re-point the second slot to another live `@container` site rather than weakening the gate.
   **RATIFY-BEFORE-IMPL.**
3. **chart-chassis-palette.vue co-edit order with W19.** RATIFY the sequence so the survivor (the pure
   chart-color palette + `--chart-*` ladder) is authored once: the LATER wave reconciles against the earlier
   edit; the file is NOT wholesale-deleted. (Recommended: W29 edits only the chassis section; W19 edits only
   the DiscoGlyph section.)
4. **instrument-strip variant strike order vs W06's dock.css split.** RATIFY whether W29 strikes the
   `instrument-strip` block from `dock.css` BEFORE W06's partition (so W06 carves a model already free of the
   dead variant) or from the carved partial if W06 landed first. The strike is W29's regardless of location.
5. **§17 metric-token removal vs surviving consumers.** Verify NO glass-ui consumer references the
   `--metric-row-*`/`--metric-cell-*` §17 tokens before deletion (the native copies inline them). If a
   surviving glass-ui surface reads `--chart-*` via the metric block, preserve the load-bearing subset (the
   `--chart-*` ladder survives for MetricRow's successor consumers + tokens.css).
