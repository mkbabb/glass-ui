# AZ.W-DOCK-NORMALIZE — every NAV dock carries the persistent home/nav pattern; the feature docks stay clean

**Name**: W-DOCK-NORMALIZE - the dock persistent-controls census executed
**Opens after**: AZ Batch 2 (after W-DOCK-TAXONOMY renames land; runs ‖ W-RAIL-EXTEND ‖ W-DOCK-CONTEXT)
**Agents**: 1
**Hard gate**: `proof:dock-unify` EXTENDED — the C3 census matrix bound as gate witnesses: every NAV-flavored exemplar dock carries the home-left `#persistent` + `<DockSeparator>` pattern (zero hand-rolled home chrome, zero raw-class separators); the FEATURE-demo docks are explicitly census-exempt and the exemption is recorded, not silently passed.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave executes the C3 per-dock persistent-controls census matrix — the fleet walked
the `<GlassDock>` instances and graded each (AZ invariant 3: execute the census, do not
re-census from scratch). **Count drift (re-grep at HEAD)**: the fleet recorded "26" instances;
a HEAD `grep -rc '<GlassDock' demo/` returns **23** (9 overview + 5 layers + 4 rail + 2
dark-toggle + 1 metric-pill + 1 SidebarDock + 1 BottomDock). The census doc enumerates the
ACTUAL HEAD set, not the stale 26 — the W5 closure asserts the enumerated count matches the
list union. The CRITICAL scoping verdict (C3-NORMALIZATION-SCOPE):
R3-5's "ALL docks should have persistent controls" must be SCOPED to NAV docks — forcing a
home control onto the FEATURE-demo docks (media transport, triggers, hover-popover, slider,
overflow-wrap, card-grid, the layer drill-ins, the dark-toggle sizing hosts, the metric-pill
container host) would POLLUTE the teaching surface; those docks exist to demonstrate a
SPECIFIC facility, not navigation.

Grounding findings (FLEET-DIGEST.md): **C3-DOCK-CENSUS-SHELL** [the 2 shell docks, already
normalized], **C3-DOCK-CENSUS-STORIES** [the 24 story-dock census], **C3-NORMALIZATION-SCOPE**
[S3 — the binding scoping verdict], **C3-AZ-EDIT-LIST** [the E5 exact edit].

**The census matrix (C3 — confirmed at HEAD this authoring; the dock-unify gate already
encodes the NAV/SHELL split).** `proof-dock-unify.mjs` carries two dock lists:
`SHOWCASE_DOCKS` (overview.vue `requireHome:true`, rail.vue `requireHome:true`, layers.vue
`requireHome:false`) audited STRICTLY, and `SHELL_DOCKS` (BottomDock.vue, SidebarDock.vue)
tracked as `pendingW40` (the W40 rebuild flips them GREEN). The `auditDock` detector
(proof-dock-unify.mjs:160-178) tests `<GlassDock>` root + `<DockSeparator>` divider +
`#persistent` anchor. The census rows:

- **NORMALIZED (have `#persistent` home + nav)**: SidebarDock.vue (the ℱ wordmark home-left
  + `#collapsed` trailing dark toggle), BottomDock.vue (the category-Sheet trigger home-left
  + DockSeparator-grouped prev/next/category nav), dock/overview.vue collapse demo
  (`#persistent` Home @111-116, `#collapsed` @463-473), dock/rail.vue (`#persistent` Home
  @68-92, @106-122).
- **THE "ONE NORMALIZATION CANDIDATE" — RE-GROUND DRIFT, BLOCKING (read before editing).**
  The C3 fleet finding (FLEET-DIGEST C3-DOCK-CENSUS-STORIES + C3-AZ-EDIT-LIST E5) grades
  `dock/overview.vue:370-389` as a "bottom-nav silhouette uses inline Home" and names it the
  sole normalization target. **This grading does NOT survive a HEAD re-grep.** At HEAD
  `overview.vue:370-389` is the `<GlassDock overflow="wrap" always-expanded>` 14-control
  OVERFLOW-WRAP demo (two `Home`/`Home (2)` controls among 14, demonstrating the wrap reflow at
  `--dock-max-inline-size: 28rem`) — the SAME feature class as the exempt overflow-wrap demo at
  `@398`. The word "silhouette" in the source (`overview.vue:364`) refers to the WRAP shape
  lifting onto the card tier, NOT a navigation silhouette. There is NO inline-Home nav-flavored
  divergent dock in `overview.vue` at HEAD: every genuinely nav-flavored dock there
  (`@111` collapse-demo, `@463` collapse-demo) ALREADY uses `#persistent`/`#collapsed`.
  **Consequence for the impl agent**: do NOT move `@370`'s `Home` into `#persistent` — that
  would inject a home anchor onto a FEATURE-demo (overflow-wrap) dock, violating this wave's
  OWN scoping verdict (C3-NORMALIZATION-SCOPE forbids polluting teaching surfaces). The §0
  mandate ("if any cite has drifted, record the drift and re-locate before proceeding")
  fires HERE: re-run the full C3 census at HEAD over EVERY demo `<GlassDock>` and determine
  whether a genuine nav-exemplar divergence exists. If the re-census finds ZERO divergent
  nav docks (the likely outcome — the contract is already satisfied), the wave's
  normalization edit RETIRES with that finding recorded, and the wave reduces to the
  gate-extension work (scope 2-4) alone. **This is a hinge-class re-ground; it fires the
  scope-reveal trigger if the re-census disagrees with the fleet grading — escalate to the
  orchestrator, do not improvise a normalization target.**
- **FEATURE-DEMO docks (census-EXEMPT BY DESIGN)**: overview media-transport(@128),
  triggers(@151), hover-popover(@217), slider(@305), overflow-wrap(@370 AND @398), card-grid(@424);
  layers.vue ALL 6 DockLayerGroup drill-ins (@67,120,148,190,225 — the rail IS the
  switcher); rail.vue bare-comparison docks(@141,155); dark-mode-toggle.vue 3 sizing-host
  docks(@49); metric-pill.vue containerName cluster host(@80). A home button would pollute
  these teaching surfaces.

RE-GROUND command set (run all; confirm the census + the gate split):

```
sed -n '40,115p'  scripts/proof-dock-unify.mjs               # the NAV/SHELL dock lists + the F4 audit
sed -n '160,178p' scripts/proof-dock-unify.mjs               # the auditDock detector
sed -n '269,300p' scripts/proof-dock-unify.mjs               # the F4 census + pendingW40 body
sed -n '108,131p' demo/layout/BottomDock.vue                 # the shell home-left + DockSeparator
sed -n '86,122p'  demo/layout/SidebarDock.vue                # the ℱ home-left #persistent
sed -n '358,395p' demo/stories/dock/overview.vue             # RE-GROUND: @370 is the overflow="wrap" 14-control demo, NOT a nav silhouette — confirm the drift above
grep -n '<GlassDock\|#persistent\|#collapsed\|overflow=\|always-expanded' demo/stories/dock/overview.vue  # the per-dock census — every <GlassDock> + its slot shape, to re-grade nav-vs-feature at HEAD
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the state |
|---|---|---|---|
| 1 | C3-NORMALIZATION-SCOPE [S3] | `CLAUDE.md` AX.W61 nav-pattern; `demo/stories/dock/overview.vue:128,151,217,305,370,398,424` (feature docks, no home by design — incl. the @370/@398 overflow-wrap pair) | the feature-exempt set; R3-5 must be scoped to nav docks. The fleet's "one nav candidate @370" does NOT survive HEAD re-grep — @370 is an overflow-wrap FEATURE demo (see §0 RE-GROUND DRIFT) |
| 2 | C3-AZ-EDIT-LIST E5 (RE-GROUND DRIFT) | `demo/stories/dock/overview.vue:370-389` (the cited target — at HEAD an `overflow="wrap"` feature demo, NOT a "bottom-nav silhouette") | E5's "move the bottom-nav silhouette's Home into `#persistent`" mis-targets a feature dock; the normalization edit RE-CENSUSES at HEAD (§0) and RETIRES if no genuine nav-exemplar divergence is found |
| 3 | C3-DOCK-CENSUS-SHELL | `demo/layout/SidebarDock.vue:86-122,208-214`; `demo/layout/BottomDock.vue:83-131,137,196` | the 2 shell docks already carry the home-left + DockSeparator contract (tracked `pendingW40` in the gate today — W40 not yet run) |
| 4 | the gate to extend | `scripts/proof-dock-unify.mjs:62-75` (SHOWCASE/SHELL lists), `:269-300` (F4 census) | the F4 census already exists; this wave binds the full matrix + the explicit feature-exempt list |

## Goal criterion

Every NAV-flavored dock in the demo (the shell docks + the navigation exemplar story docks)
carries the SAME persistent pattern — a home-left `#persistent` anchor, nav items,
`<DockSeparator>` dividers, zero hand-rolled home chrome, zero raw-class separators — so the
docks read as ONE normalized system; and the FEATURE-demo docks remain deliberately clean
(no home pollution), with that exemption RECORDED in the gate, not silently passed.

## Scope

1. Normalize the diverging nav exemplar(s) found at HEAD re-census (C3-AZ-EDIT-LIST E5 —
   RE-GROUND FIRST). The fleet named `overview.vue:370-389` as the target, but at HEAD that
   is the `overflow="wrap"` feature demo, NOT a nav silhouette (§0 RE-GROUND DRIFT). So this
   scope item is CONDITIONAL: re-run the C3 census over every demo `<GlassDock>` at HEAD; for
   any GENUINELY nav-flavored story dock that still uses an inline `Home` instead of the
   `#persistent` slot, move it onto the home-left pattern the collapse-demo (@111) + rail
   (@68) docks use. If the re-census finds NO such divergence (the likely outcome — the
   contract is already satisfied across the nav docks), this edit RETIRES with the finding
   recorded in the census doc, and the wave's binding work is scope 2-4 (the gate extension).
   Do NOT normalize a feature-demo dock (overflow-wrap @370/@398, media @128, etc.) — that
   violates the scoping verdict.
2. Extend `proof:dock-unify` (the F4 census witness) to BIND the full C3 matrix as gate
   facts: the NAV-dock list asserts the home-left `#persistent` + `<DockSeparator>` + ZERO
   raw-class separators (the SHOWCASE_DOCKS already do this; add any re-censused nav exemplar's
   normalized state as a witness), a NEW explicit FEATURE-EXEMPT list records each
   census-exempt feature dock by path + rationale so the exemption is asserted-and-recorded,
   never a silent pass (the "feature docks must NOT carry a home" half is a positive
   contract, not absence-of-failure), AND the census-CLOSURE (W5): the gate enumerates every
   demo `<GlassDock>`-bearing SFC and asserts each is on exactly one list (no unaccounted dock
   file — the anti-gameability floor for the otherwise-OPEN hardcoded lists).
3. Promote the SHELL_DOCKS rows from `pendingW40` to STRICT in the gate IF the shell docks
   are already compliant at HEAD (C3-DOCK-CENSUS-SHELL says they carry the contract) — the
   `pendingW40` framing was for the un-run W40 rebuild; at AZ the shell docks ARE on the
   contract, so the gate asserts them strictly (or records why a row stays pending with a
   named successor). Confirm by re-running `auditDock` over BottomDock/SidebarDock at HEAD.
4. Record the normalized census in CLAUDE.md (the AX.W61 dock nav-pattern section): the
   NAV-dock-vs-feature-dock scoping is now canon — R3-5 normalization applies to nav docks;
   feature-demo docks are exempt by design.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if extending the gate's feature-exempt
  contract requires the gate to PARSE each dock's slot-content to distinguish "nav dock" from
  "feature dock" at runtime (rather than the declared path lists), that is a scope-reveal —
  triumvirate. The census is a DECLARED matrix (the C3 grading), not an inferred one; the
  gate asserts the declared lists, it does not re-derive nav-ness. NOTE the W5 census-CLOSURE
  is DISTINCT and in-scope: it ENUMERATES dock-bearing files and asserts each is on exactly one
  declared list (a file-ACCOUNTING closure) — it does NOT infer nav-vs-feature (that stays the
  declared human grade). Closure-by-accounting is the anti-gameability floor; nav-inference is
  the forbidden over-build.
- **Hard-gate failures not local-edit-recoverable**: if promoting the SHELL_DOCKS to strict
  reveals a shell dock that does NOT carry the contract at HEAD (contradicting
  C3-DOCK-CENSUS-SHELL), that is a census-accuracy reveal — record the row as a named
  successor (the W40-class rebuild) rather than forcing a shell-dock edit this wave (the
  shell docks are W-SHELL-CONFIG / W-DOCK-CONTEXT territory; do not cross-wave-edit them).
- **Diagnostic loop halt**: if a re-censused nav-exemplar `#persistent` move breaks that
  dock's layout (the inline Home was load-bearing for the row layout) and three iterations
  have not resolved it, halt and triumvirate.
- **The re-census disagrees with the fleet grading (the @370 drift)**: if the HEAD re-census
  finds the fleet's named target (@370) is a feature dock and no genuine nav divergence
  exists, that is a scope-reveal on the wave's premise — record the zero-divergence finding,
  reduce the wave to the gate-extension work, and surface it to the orchestrator (do NOT
  improvise an alternate normalization target to "have something to normalize").

## File Bounds

| File | Access |
|---|---|
| `demo/stories/dock/overview.vue` | modify ONLY a genuinely nav-flavored dock found at HEAD re-census — NOT @370-389 (an `overflow="wrap"` feature dock); often a no-op if no divergence exists |
| `scripts/proof-dock-unify.mjs` | modify (extend F4: bind the full census matrix + the feature-exempt list + promote SHELL rows) |
| `CLAUDE.md` | modify (record the nav-vs-feature normalization scoping as canon) |
| `docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md` | create (the executed census matrix doc the gate cites) |

Do NOT touch: the feature-demo docks (overview media/triggers/hover/slider/wrap/grid,
layers drill-ins, dark-toggle hosts, metric-pill host) — they are census-EXEMPT, editing
them violates the scoping verdict; the shell docks `demo/layout/{BottomDock,SidebarDock}.vue`
(read-only census subjects here — W-SHELL-CONFIG / W-DOCK-CONTEXT own shell edits; if a
shell dock needs a rebuild it is a named successor, not this wave); any `src/components/custom/dock/`
source (this is a demo-census + gate wave, no library edit).

### Disjointness

Single agent. Across Batch 2: W-RAIL-EXTEND creates the beyond-dock rail primitive (new
files); W-DOCK-CONTEXT writes the route→layer seam + the shell docks' contextual wiring —
**coordination note**: W-DOCK-CONTEXT also touches `demo/layout/{SidebarDock,BottomDock}.vue`
(the route-context consumers), which this wave reads but does not write; this wave's only
demo edit (if the re-census finds a divergent nav dock) is in `dock/overview.vue` — NOT the
@370-389 overflow-wrap range, which is a feature dock — disjoint from W-DOCK-CONTEXT's
shell-layout edits. `proof-dock-unify.mjs` is written by NO other Batch-2 wave.

## Agent Units

### AZ.W-DOCK-NORMALIZE.1 the nav-exemplar normalization (CONDITIONAL — re-census first)

- Goal: every genuinely nav-flavored story dock found at HEAD re-census carries the home-left
  `#persistent` pattern, matching the other nav docks.
- Mechanism: re-run the C3 census over every demo `<GlassDock>` at HEAD (the fleet's @370
  target is the overflow-wrap feature demo, not a nav silhouette — §0 RE-GROUND DRIFT). For
  any genuinely nav-flavored story dock still using an inline `Home`, lift it into a
  `#persistent` slot with `<DockSeparator>` dividers — the shape the collapse-demo (@111-116)
  and rail (@68-92) docks use. If the re-census finds no divergent nav dock, RETIRE this edit
  with the finding recorded.
- Files: `demo/stories/dock/overview.vue` (the specific range determined by the re-census, NOT
  the pre-fixed @370-389 — that range is a feature dock).
- Sub-gate: **NOT** the whole-file `auditDock` over `overview.vue` (that file already carries
  `#persistent` at @111, so the file-level audit is a HEAD-passing tautology — it cannot
  witness a per-dock change). Instead: the census doc records the per-dock grade for every
  `<GlassDock>` in `overview.vue` (nav|feature, home-status, verdict), and the F4 witness
  (NORMALIZE.2) binds that recorded matrix. If a nav dock is normalized, its before/after
  per-dock grade flips in the census doc; if none diverges, the doc records the zero-divergence
  finding.

### AZ.W-DOCK-NORMALIZE.2 the census bound into proof:dock-unify

- Goal: the full C3 census matrix is a gate fact — nav docks asserted strict, feature docks
  asserted EXEMPT (recorded, not silently passed).
- Mechanism: extend `proof-dock-unify.mjs` F4 — (a) the SHOWCASE_DOCKS strict audit stays;
  (b) add a `FEATURE_EXEMPT_DOCKS` declared list (each path + the facility it demonstrates)
  that the gate RECORDS in its artefact (the positive "these are exempt by design" contract);
  (c) promote the SHELL_DOCKS from `pendingW40` to strict IF compliant at HEAD (else record
  the named successor). The census doc `W-DOCK-NORMALIZE-census.md` is the human-readable
  matrix the gate's artefact mirrors.
- Files: `scripts/proof-dock-unify.mjs:62-75,269-300`, `W-DOCK-NORMALIZE-census.md` (create).
- Sub-gate: `node scripts/proof-dock-unify.mjs` GREEN with the extended census in its JSON
  artefact (nav-strict + feature-exempt list + shell-row status + the census-CLOSURE: every
  `<GlassDock>`-bearing demo file appears on exactly one list); born-RED before the extension
  (no feature-exempt declaration + no closure check exists at HEAD).

## Hard Gate

`proof:dock-unify` EXTENDED (born-RED on the new census witnesses, driven GREEN by the wave):

1. **The NAV-dock strict census.** Every NAV-flavored dock (SHOWCASE_DOCKS + any
   re-censused nav exemplar normalized this wave + the SHELL_DOCKS promoted to strict if
   compliant) carries the home-left `#persistent` + `<DockSeparator>` + ZERO raw-class
   separators. NOTE: the fleet's named target `overview.vue:370-389` is at HEAD an
   `overflow="wrap"` FEATURE demo, not a divergent nav exemplar (§0 RE-GROUND DRIFT); the
   RED-at-HEAD anchor for this witness is whatever genuine nav divergence the re-census finds
   (if none, the witness is GREEN-at-HEAD for the nav set and the wave's RED witnesses are
   W2 feature-exempt + W5 closure). **Bite caveat (recorded)**: `auditDock` is WHOLE-FILE —
   a story file with multiple docks passes `requireHome` if ANY dock carries `#persistent`,
   so the per-file audit cannot witness a single divergent dock inside a multi-dock file; the
   per-dock grade lives in the census doc (W4), the file-audit is the coarse floor only.
2. **The FEATURE-EXEMPT positive contract.** The declared `FEATURE_EXEMPT_DOCKS` list is
   present in the gate + recorded in the artefact + mirrored in `W-DOCK-NORMALIZE-census.md`
   — the exemption is asserted, not absence-of-failure. RED at HEAD: no feature-exempt
   declaration exists (the gate only audits the showcase/shell lists).
3. **The shell-dock disposition.** The SHELL_DOCKS rows are either strict-GREEN (compliant
   at HEAD) or carry an explicit named successor in the artefact — no row sits silently
   `pendingW40` without a named owner. RED at HEAD: the rows are `pendingW40` with the W40
   rebuild as an unstated implicit successor.
4. **The census doc artefact.** `docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md` exists,
   carries the HEAD-enumerated dock matrix (23 at this authoring — each row: path,
   nav|feature, home-status, verdict), and the gate cites it. (Document-presence +
   reconciliation, the valid hard-gate kind for a census wave.)
5. **The census CLOSURE (anti-gameability — the exempt list is OPEN otherwise).** The gate
   ENUMERATES every demo `<GlassDock>`-bearing SFC (a glob over `demo/**/*.vue` filtered to
   files containing `<GlassDock`) and asserts each appears on EXACTLY ONE census list
   (nav-strict SHOWCASE/SHELL, or FEATURE_EXEMPT) — zero unaccounted dock files. Without this,
   the three hardcoded path lists are a SNAPSHOT, not a closure: a future agent adding a new
   nav dock to a NEW story file (with hand-rolled home chrome, no `#persistent`) evades all
   three lists and the gate passes while R3-5 ("ALL docks normalized") is left alive for the
   new dock. The closure forces every new dock onto a list (nav → audited strict; feature →
   declared exempt with a rationale), so a "helpful" agent cannot smuggle an un-normalized nav
   dock in unaudited. RED at HEAD: no enumeration/closure exists (the gate only reads the
   declared lists; an off-list dock file is invisible).

This is a SOURCE/STRUCTURE wave (the census is a markup + gate matter); the binding
evidence is the gate's extended census artefact (incl. the W5 closure) + any re-censused
nav-exemplar normalization. A π readback is NOT required here (the normalization is
structural, not a visual-register change) — the one visual confirmation, IF a nav dock is
normalized, is that the normalized dock still renders correctly (captured to the census doc
as a smoke frame); if no divergence is found, no render edit occurs and no smoke frame is owed.

**Runner-truth disposition (the AY W-LIVE1 lesson, IN the spec).** This wave EXTENDS the EXISTING
`proof:dock-unify` gate (a `gates.mjs` row already tagged `["local","ci"]` — a DEVICE-FREE SOURCE
arm with its π live arm tracked separately in the AX.W61 DELTA, the AY runner-truth shape already
shipped). The new census witnesses (W1–W5) are ALL device-free src/markup scans (the demo-glob
closure, the FEATURE-EXEMPT list, the SHELL_DOCKS disposition, the census-doc reconciliation) — they
ADD to the device-free SOURCE arm and inherit its `ci` posture; NO new gate row + NO new tag is
minted (the extension keeps `proof:dock-unify` at `["local","ci"]`). The gate-script-parity trio is
satisfied by the existing registration (`proof:dock-unify` is already a `package.json` key + a
`gates.mjs` `["local","ci"]` row); the wave runs `proof:gate-script-parity` after the gate-script
edit per the Format cadence. NO π split is owed (the normalization is structural) — the AX.W61 π
DELTA remains the binding visual close for the dock-unify family, untouched by this census extension.

## Format And Lint Cadence

`npm run typecheck` after the overview.vue edit; `node scripts/proof-dock-unify.mjs` born-RED
before the normalization, GREEN at close; `npm run proof:gate-script-parity` (the gate row
already registered — confirm parity after the extension); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md` — the executed HEAD-enumerated census
  matrix (23 docks at this authoring).
- The extended `proof:dock-unify` JSON artefact (nav-strict + feature-exempt + shell rows + W5 closure).
- A smoke frame of a normalized nav dock IF one is re-censused (else the zero-divergence finding).

## Commit Plan

- impl commit (only if a nav dock is re-censused divergent): `refactor(demo): normalize the re-censused nav exemplar onto #persistent home-left (AZ.W-DOCK-NORMALIZE)`.
- gate commit: `test(dock): proof:dock-unify extended — full census matrix + feature-exempt contract + shell-row disposition`.
- doc/status commit: the CLAUDE.md scoping canon + the census doc + PROGRESS row.

## Dependencies

- **Depends on**: W-DOCK-TAXONOMY (Batch 2 head) — the taxonomy rename may relabel the dock
  family; this wave's census must reflect the post-rename names (the SHOWCASE/SHELL/EXEMPT
  paths re-key if the taxonomy renames the demo dock files). Re-ground the census AFTER the
  taxonomy lands.
- **Blocks**: nothing downstream depends on the normalization, but W-DOCK-CONTEXT (sibling)
  reads the same shell docks — coordinate so the route-context wiring and the census stay
  consistent (both must agree on which docks are nav-flavored).

## Archaeology

Prior: AX.W61 minted the nav-pattern contract + `proof:dock-unify` with F4 tracking the
shell docks as `pendingW40` (the W40 rebuild was the named successor). At AZ the R3-5
normalization mandate folds in — but the C3 census found the contract is ALREADY satisfied
on the nav docks; the residual is the missing positive feature-exempt contract + the census
closure. The fleet's "ONE bottom-nav silhouette @370" normalization residual does NOT survive
a HEAD re-grep — @370 is the overflow-wrap feature demo (§0 RE-GROUND DRIFT), so the wave's
normalization edit is conditional on a fresh re-census and likely a no-op. The new guardrails:
the gate now asserts the feature-exempt set as a POSITIVE contract (these docks must NOT
carry a home) AND the W5 census-CLOSURE (every dock-bearing file on exactly one list), so a
future "helpful" agent can neither add home chrome to a teaching dock NOR smuggle an
un-normalized nav dock into a new off-list file and pass the gate — the scoping verdict is
machine-bound, not just prose.


## §X — Orchestrator ruling (HC-DOCK-A, 2026-06-10)

The premise re-census stands as specced (conditional, no-op-if-clean). RULING: the wave is KEPT,
RE-SCOPED THIN — if the Batch-2 re-census confirms zero divergent nav docks, the wave executes its
gate-extension scope alone (the census-closure W5 + the feature-exempt contract + the pendingW40
promotion) and records the no-op honestly. It does NOT merge into another wave (the census-closure
gate is load-bearing for R3-5 regardless of whether a divergent dock exists today).
