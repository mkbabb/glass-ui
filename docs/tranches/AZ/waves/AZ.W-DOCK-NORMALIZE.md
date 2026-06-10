# AZ.W-DOCK-NORMALIZE — every NAV dock carries the persistent home/nav pattern; the feature docks stay clean

**Name**: W-DOCK-NORMALIZE - the dock persistent-controls census executed
**Opens after**: AZ Batch 2 (after W-DOCK-TAXONOMY renames land; runs ‖ W-RAIL-EXTEND ‖ W-DOCK-CONTEXT)
**Agents**: 1
**Hard gate**: `proof:dock-unify` EXTENDED — the C3 census matrix bound as gate witnesses: every NAV-flavored exemplar dock carries the home-left `#persistent` + `<DockSeparator>` pattern (zero hand-rolled home chrome, zero raw-class separators); the FEATURE-demo docks are explicitly census-exempt and the exemption is recorded, not silently passed.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave executes the C3 per-dock persistent-controls census matrix — the fleet already
walked all 26 `<GlassDock>` instances and graded each (AZ invariant 3: execute the census,
do not re-census from scratch). The CRITICAL scoping verdict (C3-NORMALIZATION-SCOPE):
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
- **THE ONE NORMALIZATION CANDIDATE**: the dock/overview bottom-nav silhouette (@370-389)
  uses an INLINE `Home`, not the `#persistent` slot — the single nav-flavored exemplar that
  diverges from the home-left pattern (C3-NORMALIZATION-SCOPE + C3-AZ-EDIT-LIST E5).
- **FEATURE-DEMO docks (census-EXEMPT BY DESIGN)**: overview media-transport(@128),
  triggers(@151), hover-popover(@217), slider(@305), overflow-wrap(@398), card-grid(@424);
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
sed -n '365,395p' demo/stories/dock/overview.vue             # the bottom-nav silhouette INLINE Home (the candidate)
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the state |
|---|---|---|---|
| 1 | C3-NORMALIZATION-SCOPE [S3] | `CLAUDE.md` AX.W61 nav-pattern; `demo/stories/dock/overview.vue:370-389` (inline Home); `:128,151,217,305` (feature docks, no home by design) | the one nav candidate + the feature-exempt set; R3-5 must be scoped to nav docks |
| 2 | C3-AZ-EDIT-LIST E5 | `demo/stories/dock/overview.vue:370-389` | the bottom-nav silhouette's leading Home moves into a `#persistent` slot for nav-pattern uniformity |
| 3 | C3-DOCK-CENSUS-SHELL | `demo/layout/SidebarDock.vue:86-122,208-214`; `demo/layout/BottomDock.vue:83-131,137,196` | the 2 shell docks already carry the home-left + DockSeparator contract (tracked `pendingW40` in the gate today — W40 not yet run) |
| 4 | the gate to extend | `scripts/proof-dock-unify.mjs:62-75` (SHOWCASE/SHELL lists), `:269-300` (F4 census) | the F4 census already exists; this wave binds the full matrix + the explicit feature-exempt list |

## Goal criterion

Every NAV-flavored dock in the demo (the shell docks + the navigation exemplar story docks)
carries the SAME persistent pattern — a home-left `#persistent` anchor, nav items,
`<DockSeparator>` dividers, zero hand-rolled home chrome, zero raw-class separators — so the
docks read as ONE normalized system; and the FEATURE-demo docks remain deliberately clean
(no home pollution), with that exemption RECORDED in the gate, not silently passed.

## Scope

1. Normalize the one diverging nav exemplar (C3-AZ-EDIT-LIST E5): move the dock/overview
   bottom-nav silhouette's leading `Home` (overview.vue:370-389) from the inline render into
   a `#persistent` slot, matching the home-left pattern the collapse-demo + rail docks
   already use. This is the sole story-dock normalization edit — the census already grades
   every other nav dock as compliant.
2. Extend `proof:dock-unify` (the F4 census witness) to BIND the full C3 matrix as gate
   facts: the NAV-dock list asserts the home-left `#persistent` + `<DockSeparator>` + ZERO
   raw-class separators (the SHOWCASE_DOCKS already do this; add the bottom-nav silhouette's
   normalized state as a witness), and a NEW explicit FEATURE-EXEMPT list records each
   census-exempt feature dock by path + rationale so the exemption is asserted-and-recorded,
   never a silent pass (the "feature docks must NOT carry a home" half is a positive
   contract, not absence-of-failure).
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
  gate asserts the declared lists, it does not re-derive nav-ness.
- **Hard-gate failures not local-edit-recoverable**: if promoting the SHELL_DOCKS to strict
  reveals a shell dock that does NOT carry the contract at HEAD (contradicting
  C3-DOCK-CENSUS-SHELL), that is a census-accuracy reveal — record the row as a named
  successor (the W40-class rebuild) rather than forcing a shell-dock edit this wave (the
  shell docks are W-SHELL-CONFIG / W-DOCK-CONTEXT territory; do not cross-wave-edit them).
- **Diagnostic loop halt**: if the bottom-nav silhouette `#persistent` move breaks the
  silhouette's layout (the inline Home was load-bearing for the row layout) and three
  iterations have not resolved it, halt and triumvirate.

## File Bounds

| File | Access |
|---|---|
| `demo/stories/dock/overview.vue` | modify (the bottom-nav silhouette `#persistent` Home move — lines 370-389 only) |
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
demo edit is `dock/overview.vue:370-389`, disjoint from W-DOCK-CONTEXT's shell-layout edits.
`proof-dock-unify.mjs` is written by NO other Batch-2 wave.

## Agent Units

### AZ.W-DOCK-NORMALIZE.1 the one nav-exemplar normalization

- Goal: the dock/overview bottom-nav silhouette carries the home-left `#persistent` pattern,
  matching every other nav dock.
- Mechanism: lift the inline `Home` (overview.vue:370-389) into a `#persistent` slot on its
  `<GlassDock>`, with `<DockSeparator>` dividers if the silhouette groups nav items — the
  same shape the collapse-demo (@111-116) and rail (@68-92) docks already use.
- Files: `demo/stories/dock/overview.vue:370-389`.
- Sub-gate: `auditDock` over `dock/overview.vue` reports the bottom-nav region compliant
  (`#persistent` present, no raw-class separator); the gate's extended F4 witness GREEN.

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
  artefact (nav-strict + feature-exempt list + shell-row status); born-RED before the
  overview.vue normalization (the bottom-nav silhouette diverges).

## Hard Gate

`proof:dock-unify` EXTENDED (born-RED on the new census witnesses, driven GREEN by the wave):

1. **The NAV-dock strict census.** Every NAV-flavored dock (SHOWCASE_DOCKS + the normalized
   bottom-nav silhouette + the SHELL_DOCKS promoted to strict if compliant) carries the
   home-left `#persistent` + `<DockSeparator>` + ZERO raw-class separators. RED at HEAD: the
   bottom-nav silhouette uses an inline Home (overview.vue:370-389), not `#persistent`.
2. **The FEATURE-EXEMPT positive contract.** The declared `FEATURE_EXEMPT_DOCKS` list is
   present in the gate + recorded in the artefact + mirrored in `W-DOCK-NORMALIZE-census.md`
   — the exemption is asserted, not absence-of-failure. RED at HEAD: no feature-exempt
   declaration exists (the gate only audits the showcase/shell lists).
3. **The shell-dock disposition.** The SHELL_DOCKS rows are either strict-GREEN (compliant
   at HEAD) or carry an explicit named successor in the artefact — no row sits silently
   `pendingW40` without a named owner. RED at HEAD: the rows are `pendingW40` with the W40
   rebuild as an unstated implicit successor.
4. **The census doc artefact.** `docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md` exists,
   carries the 26-dock matrix (each row: path, nav|feature, home-status, verdict), and the
   gate cites it. (Document-presence + reconciliation, the valid hard-gate kind for a
   census wave.)

This is a SOURCE/STRUCTURE wave (the census is a markup + gate matter); the binding
evidence is the gate's extended census artefact + the normalized silhouette render. A π
readback is NOT required here (the normalization is structural, not a visual-register
change) — the one visual confirmation is that the normalized bottom-nav silhouette still
renders correctly (captured to the census doc as a smoke frame).

## Format And Lint Cadence

`npm run typecheck` after the overview.vue edit; `node scripts/proof-dock-unify.mjs` born-RED
before the normalization, GREEN at close; `npm run proof:gate-script-parity` (the gate row
already registered — confirm parity after the extension); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md` — the executed 26-dock census matrix.
- The extended `proof:dock-unify` JSON artefact (nav-strict + feature-exempt + shell rows).
- A smoke frame of the normalized bottom-nav silhouette (in the census doc).

## Commit Plan

- impl commit: `refactor(demo): normalize the bottom-nav silhouette onto #persistent home-left (AZ.W-DOCK-NORMALIZE)`.
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
on most nav docks; the residual is the ONE bottom-nav silhouette + the missing positive
feature-exempt contract. The new guardrail: the gate now asserts the feature-exempt set as a
POSITIVE contract (these docks must NOT carry a home), so a future "helpful" agent cannot
add home chrome to a teaching dock and pass the gate — the scoping verdict is machine-bound,
not just prose.
