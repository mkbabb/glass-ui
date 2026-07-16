# Glass BI/P/Q active execution handoff

**Snapshot:** 2026-07-16
**Repository:** `/Users/mkbabb/Programming/glass-ui`
**Branch / HEAD:** `codex/bi-p-q-execution` / `c181f0a7`
**Mode:** tranche execution and product development, not formation and not read-only audit
**Release state:** local Glass `7.0.0` is **unpublished and untagged**
**Handoff file state:** present on the shared filesystem but uncommitted; preserve it and commit it
at the next bounded documentation boundary

This is the durable continuation document for another agentic system. It supersedes the
status, launch, release, and gate-process statements in `HANDOFF-PERFECTED-BI.md` wherever they
conflict with current disk truth. It does not replace the product architecture, wave contracts,
clean-break rules, or addenda.

## 1. Authority and read order

Read in this order before writing:

1. this handoff;
2. `addenda/README.md`, `addenda/PLAN.md`, `addenda/DISPOSITIONS.md`,
   `addenda/JUDGMENT-ROSTER.md`, `addenda/PROCESS-CODEX.md`, and `addenda/REGISTRY.md`;
3. the specific `FORMATION/waves/BI.W-P###.md` files owned by the next bounded slice;
4. `MIGRATION.md`, `package.json`, `package-lock.json`, and the actual source/tests;
5. the 23 files in `addenda/reports/` only as evidence and archaeology, never as a current
   worktree count or execution engine.

Authority order when documents disagree:

1. current user rulings;
2. the current execution-hardened P/Q/addenda product contracts;
3. current source, package graph, ordinary tests, built declarations, and native Browser
   observations as evidence of what is or is not implemented;
4. this handoff's synthesized status and continuation;
5. formation reports and historic plans.

Evidence establishes implementation truth; it cannot silently rewrite a product contract. A
measured contradiction routes through research/hardening and an in-place wave amendment before the
implementation is accepted.

The following are archival or stale as live status surfaces:

- `FORMATION/WAVE-INDEX.md` says every P row is nonterminal;
- `FORMATION/waves.json` still says every P row is planned;
- `FORMATION/FINAL-PRECONDITIONS.md` retains deleted receipt/gate machinery;
- the old 93-wave `PLAN.md` retains obsolete 5/6 release and full-gate-battery language;
- `HANDOFF-PERFECTED-BI.md` still describes a paused formation phase;
- `asks-and-consumes.md` still carries old Glass/Value/Keyframes pins;
- several line-3 P statuses and Q counts named below have drifted.

Do not revive a deleted monolithic progress ledger, generated formation graph, receipt schema,
proof script, gate runner, or status compiler to repair that drift. Truth the human documents
at the same bounded product boundary.

## 2. Binding execution law

- Preserve the whole shared worktree. Do not reset, stash, checkout, clean, or overwrite another
  owner's changes.
- Use bounded subagent ownership and maximal useful parallelism. Research, hardening, and wave
  amendment may run in parallel with real implementation; they must not serialize the product.
- No quick fixes, aliases, migration shims, forwarding coordinates, dual paths, hidden pins,
  masking fallbacks, consumer CSS patches, or legacy compatibility surfaces.
- Prefer the smallest coherent owner and fewer lines. Remove a concept when no real product
  consumer earns it.
- Ordinary validation is typecheck, focused/full unit tests, library build, demo production build,
  and the retained strict package verifier. Meta/proof/gate scripts are abrogated.
- Visual gestalt is native in-app Browser-first. Standalone/headless Playwright may automate a
  named cross-engine repetition that the Browser cannot express, but it never authors or attests
  visual judgment.
- Do not validate after every tiny edit. Validate focused ownership while developing, then run one
  consolidated ordinary batch after a major coherent change set.
- Do not publish from source-green, local metadata, a held rehearsal, or a dirty worktree.

### Two-challenge law

Every implemented wave must receive two independent challenges **after its last material edit**:

1. **feature/wave challenge:** contract fidelity, API shape, failure and boundary behavior,
   simplicity, accessibility, performance, and test value;
2. **tranche/gestalt challenge:** whether the wave is still the right idea in the larger Glass
   system, whether it duplicates an owner, whether its affordance/proportion/material/motion is
   earned, and whether it creates downstream friction.

Both passes inspect code and the live product where paint is relevant. A pass that finds a defect
is valuable but not clean; the affected wave requires two fresh clean passes after repair. Passes
may cover a coherent batch, but their disposition must name every covered wave. This is not a new
receipt system: each pass must end in a concrete code/spec correction, a supported terminal
disposition, or a clean finding. Keep challenge lanes parallel to implementation so audit never
becomes the product.

## 3. How the wave sets compose

Do not count the historic 93 reform waves and the P graph as two independent backlogs.

- `PLAN.md` contains the **historic 93-wave BI reform roster**.
- `FORMATION/waves/BI.W-P000.md` through `BI.W-P133.md` are the perfected 134-row execution
  projection that absorbed and expanded that roster.
- `addenda/PLAN.md` continues the same graph with **20 Q waves**. It is not a new tranche.

The current P ledger has no wholly undispositioned row:

- **61 literal `DONE` rows:** P006-P012, P024, P032, P034, P038-P040, P043-P045,
  P048-P050, P054, P057, P059, P063-P064, P066, P069-P074, P078, P080-P088, P090,
  P095-P096, P099, P103, P106, P109-P112, P114-P115, P117-P121, P123-P124, P130.
- **2 achieved by abrogation:** P000-P001.
- **22 terminal declined/superseded/abrogated rows:** P002-P005, P013-P014, P033, P037, P052-P053,
  P061, P079, P089, P100, P113, P125-P126, P128-P129, P131-P133.
- **49 landed/source-implemented but nonterminal rows:** P015-P023, P025-P031, P035-P036,
  P041-P042, P046-P047, P051, P055-P056, P058, P060, P062, P065, P067-P068,
  P075-P077, P091-P094, P097-P098, P101-P102, P104-P105, P107-P108, P116, P122,
  P127.

Arithmetic: 61 + 2 + 22 + 49 = 134.

These are formal line-3 dispositions, not new two-challenge credit. In particular:

- P024 is reopened by the current Springs/clipboard hardening;
- P114 is reopened by the explicit HeaderRibbon contract and declaration close;
- P059's old native-accepted wording conflicts with live Q003 paint debt;
- P020, P023, and P127 still speak as if Value 4 / Keyframes 6 are pending, which is stale.

## 4. Immutable and worktree boundaries

### Landed commits

- `9f0e67dd` — preserves seven cited iOS 27 source-media assets with immutable hashes.
- `490cc46e` — lands the principal Glass 7 component, motion, material, demo, and public-surface
  cut across 926 files.
- `d17153ec` — deletes receipt/proof/gate machinery and restores ordinary CI.
- `c181f0a7` — reconciles P dispositions and lands the 20-wave Q rail and its audit corpus.

Earlier durable coordinates include DataTable virtual-shell work at `4cdabdd1` and `e5b3a209`,
Dock focus correction `95b0d20f`, WebGL disposal correction `693b58b7`, and the
ScrollProgressRim occlusion correction `d87d0bd1`.

The committed `490cc46e` batch recorded:

- typecheck green;
- 176 test files / 1,131 tests green;
- library build 771 modules / 69 declaration entries;
- demo build 3,572 modules;
- package verification 210 targets / 510 reachable declarations / 109 CSS files /
  69 strict imports;
- bundle profile; and
- native HeaderRibbon, Drawer, four-side Sheet, and Configurator observations.

That evidence belongs to that committed cut. It does not terminalize later dirty Q changes.

### Current dirty transaction

At this snapshot, counting each short-status entry once and excluding recursively expanded
children inside untracked directories:

- 427 tracked paths are dirty, including the dirty `docs/precepts` submodule;
- the tracked delta is 4,547 insertions and 15,214 deletions;
- 19 untracked short-status entries exist, including this handoff itself (18 pre-handoff);
- the dominant slices are Q031 virtual ownership, Q032 motion colocation, Q041 demeta scrub,
  Q042 procedural ownership, P024-P026 Springs/clipboard, and P114 HeaderRibbon/declarations.

Preserve specifically:

- dirty `docs/precepts` submodule: read-only, never stage or repair here;
- unrelated untracked `docs/tranches/BH/coordination/atlas-inbox-2026-07-16-p-addenda-augment.md`;
- related untracked `docs/tranches/BI/coordination/addenda-inbound-2026-07-16-reaudit-marks.md`;
- untracked motion-domain files, `blobSimulation.ts`, and new Clipboard/Springs tests.

Five virtual files present as index renames have further working-tree edits/deletions. Inspect
index and worktree separately before staging. Only the orchestrator stages and commits bounded
slices.

### Producer and publication truth

- Local `package.json` says `@mkbabb/glass-ui@7.0.0`.
- There is no `v7.0.0` tag, immutable Glass 7 tarball, integrity, gitHead, provenance, or registry
  coordinate. `git describe` is `v6.0.0-4-gc181f0a7-dirty`.
- The immutable Glass baseline remains `v6.0.0` at `e5b3a209`.
- `package-lock.json` now resolves the registry producer pair with one coherent graph:
  `@mkbabb/value.js@4.0.0` and `@mkbabb/keyframes.js@6.0.0`.
- Never consume any prior Value, Keyframes, or Glass rehearsal archive.

Immutable producer coordinates:

- Value: `@mkbabb/value.js@4.0.0`, tag `v4.0.0`, commit/gitHead
  `44ddaff7a22283a4f7a42608893eeae7bc234424`, registry tarball
  `https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz`, integrity
  `sha512-Z8ywb4htSxJlRFvoU1DNtvzr9Bsuaw9ahT/hvNlKbnRj6fTnLuXjn0itKq1Q5s6rwg24ct0zcLZ04BuR3/SzGw==`,
  provenance run `29497728532`.
- Keyframes: `@mkbabb/keyframes.js@6.0.0`, tag object
  `26190755ce1e57c54cb14ef0a454ae02ed2b3da0`, commit/gitHead
  `5a9183a7afe24702081a7b87c8adc7286ddce9a0`, registry tarball
  `https://registry.npmjs.org/@mkbabb/keyframes.js/-/keyframes.js-6.0.0.tgz`, integrity
  `sha512-mpb3gSxU8UgO4HBBG2he6CFNCq7tW+k9id82DgAjeeDdeAmtEzmZ2/kuK3j5AbUZRULcN1QNkNJychNk49bT4Q==`,
  provenance run `29499708034`.
- Pencil: `@mkbabb/pencil-boil@0.9.2`, gitHead
  `3f72d17fe946a79857a1238c56babb84f5ba4dd1`, integrity
  `sha512-3auwDqZEisVXL3T9vBeV4Q/rNnmjOynS2YIvWDriIC9oYj9m0tlNZsxk8b2pgJb4yYFRlO8pE1d0YSmlGLiQaQ==`.

Glass 7 is a justified major because its packed public surface removes and reshapes public
entries and types. Do not increment majors merely because later product work lands: nonbreaking
facilities belong to minor releases and compatible repairs to patches.

## 5. Gestalt constitution

Judge every slice as part of one chromatic **Optical Bench**, not a generic dashboard:

- the spectral meniscus/procedural field is the principal signature;
- the inert WatercolorDot is the secondary chromatic species;
- surrounding glass stays quiet enough for those signatures to read;
- Fraunces owns selected identity, Fira Code numeric/data readouts, and Plus Jakarta Sans
  controls/body;
- label/kicker and numeric-headline hierarchy follows the P019 proportional pair;
- margins, padding, corner radii, small controls, dividers, and card anatomy must read as one
  proportional system;
- dividers exist only where they encode grouping;
- motion and decoration must be earned;
- every action has a legible semantic affordance, and every inert ornament is honestly inert;
- duplicate, ornamental, or distracting controls are removed; affordance is added only where
  behavior would otherwise be illegible.

Spend boldness in the procedural/chromatic signature and precision in everything around it.
Challenge Card/Surface/InstrumentChassis nesting, repeated route marks, status pills, icons,
eyebrows, and explanatory copy rather than treating existing anatomy as sacred.

## 6. Selected high-risk product work that genuinely exists

The following are the product truths most likely to be lost or overclaimed at handoff. They are
not the entire committed Glass 7 surface; `MIGRATION.md` remains the complete public break map.

### Proportional system and instrument housing

- P019 defines the exact family-neutral `1/sqrt(phi)` pair
  (`0.7861513777574233`) from one fluid headline authority in
  `src/styles/typography/scale.css` and `semantic.css`.
- P122 retains `InstrumentChassis` as a general physical instrument sleeve, not the old
  Speedtest-specific phase/meter component. The public root is only `/instrument-chassis`;
  stage, optional inspector, and optional action remain landmark-neutral.
- Its only spacing authorities are dial inline/block padding, dial gap, control inline/block
  padding, and control gap; title gap is independently dial-inline / 2.618. Golden and
  preview-dominant ratios, opt-in boundaries, and opt-in reserves exist. The universal minimum
  block-size and domain phases are gone.
- Native 1440/390/320/400%-zoom coordinate and hierarchy review remains owed. Downstream Value
  owns its Card-to-InstrumentChassis consumer transposition; Glass must not add a workaround.

### Progress, slider, and Rim delineations

- P075 owns public optional `marks` for Progress; P093 owns them for Slider. Both use the same
  private value-domain math.
- Marks share one normalization owner, sort and exact-deduplicate finite interior domain values,
  omit endpoints/out-of-range values, and remain pointer/ARIA decorative.
- Progress and thumbs continue to interpolate continuously across fixed marks; no hidden snapping
  or chunked state machine was added.
- Horizontal/vertical, RTL/inverted, arbitrary-domain, determinate/indeterminate boundaries and
  range sliders have ordinary tests and live demo specimens.
- `BI.W-VALUE-MARKS` is the direct product wave joining these additive facilities with the final
  minimal ScrollProgressRim repair. The Rim's source continuity fix landed, but remains RED until
  the native matrix proves the real Dock host and collapsed disc at 0/50/100, every arc/corner and
  coverage edge, LTR/RTL, narrow/tall resize, and 1px/4px/stress widths without border occlusion.
- Do not expand ScrollProgressRim to answer marks; it remains a separate minimal scroll crest and
  freezes after continuity closes.

### Dock, Drawer, HeaderRibbon, DataTable

- GCF-01 truthful Dock prepaint initialization and GCF-02 reversible Drawer spring/presence are in
  the committed Glass 7 cut. Fixed-radius Drawer material and the separately owned graded Sheet
  edge follow Q023.
- DataTable exposes the caller-windowed shell, stable row identity, absolute row indices/count,
  row attrs/refs, and caller-selected mounted tab stop without absorbing consumer query/state.
- HeaderRibbon has an explicit public contract: it is persistent-only — one named toolbar with
  props `{ placement?, ariaLabel?, class }` and a single `#items` slot. The collapsible mode,
  `anchorLabel`, anchor button/slot, and reveal/pin/Escape machinery are removed. VNode/DOM
  guessing and delayed correction are gone.
- HeaderRibbon focused source suite is 6 tests; the native matrix (placement, RTL, forced-colors,
  coarse-pointer) and two clean post-hardening challenges remain owed.
- A future Atlas request for a controlled/manual GlassDock collapsed posture is queued only for a
  safe future boundary. It must not interrupt this close or become consumer CSS.

### Procedural systems

- P046 owns one typed eight-zone Aurora substrate and cross-engine interaction contract.
- P047 owns one Blob mass seam, `BlobConfig.geometry.bodyRadius`, plus public settled frame,
  backing/DPR, and explicit simulation origin. Dirty Q042 moves shared simulation/quiescence into
  one internal `blobSimulation` owner and removes renderer-internal public compatibility exports.
- P051 WatercolorDot is an inert, pointer-transparent, `aria-hidden` face with no button/tag/
  selection/drag contract.
- The four-case Blob DPR1/DPR2 x WebGPU/WebGL2 alpha-component/centroid/hull measurement and the
  rendered 0.66 target remain unproven; do not infer rendered mass from nominal `2r`.

### Motion and clipboard hardening

- The Springs story uses one managed `NumericAnimation` progress writer and stage-owned responsive
  geometry, including exact generated-node overshoot in available travel.
- `useClipboard` now owns one `navigator.clipboard.writeText` path, explicit status, generation-
  based latest-attempt ownership, payload invalidation, reset timer, and disposal. The legacy
  `execCommand` fallback is deleted.
- Springs and CodeBlock consume that one owner; neither owns a parallel timer or clipboard path.
- Focused tests cover races, payload change, disposal, failure recovery, focus retention, and
  responsive geometry. The first two challenges found real defects; current code addresses them,
  but two fresh clean post-repair challenges and native wide/narrow/RTL/PRM review are still owed.

### Strict package declarations

- `scripts/verify-export-types.mjs` is retained because it catches observable packed-consumer
  defects, not because it is a tranche gate.
- It uses `skipLibCheck:false`, walks every export-reachable declaration and relative edge,
  includes triple-slash type references, derives every bare package root, and requires direct
  dependency/peer/optional ownership.
- Last reported dirty-tree run: 211 targets, 510 reachable declarations, 109 CSS entries,
  69 strict consumer imports, and zero unowned roots. Embla is honestly direct; accidental
  `@vue/shared`, Reka, and VueUse declaration reaches were absent.
- This enhancement remains uncommitted and needs two clean challenges plus a fresh packed run.

### Other substantial committed surfaces

- The semantic component clean cut covers Chip, Tabs, Slider, NumberField, TagsInput,
  LabeledField, disclosure/overlay/menu families, Drawer, Command, and DataTable; their native debt
  is routed below rather than repeated here.
- Deck, Dock, HandMark, CompletionSeal, SortableList, the Metric family, and the minimal
  ScrollProgressRim remain intentional public facilities. The old overfit aliases/wrappers and
  Speedtest phase-bus Progress are gone.
- Glass consumes exact Value capabilities (`/color`, `/css`, `/easing`) and Keyframes public
  entries without a package-root fallback or nested legacy core.
- Plus Jakarta Sans and Fira Code packed assets, the explicit `./styles/theme` bridge, and the
  strict export/declaration surface exist; Fraunces remains consumer-owned where selected identity
  calls for it.

## 7. External addenda already absorbed

- GCF-01: Dock initial posture is initialized before first paint; no mount-time corrective expand.
- GCF-02: one reversible Drawer spring owns open/close and presence through settle; interrupted
  reopen retargets the live state.
- V-A88/V-A96: strict reachable declaration ownership and `skipLibCheck:false`; upstream Reka/
  VueUse implementation universes must not leak accidentally.
- V-A90-V-A93: HeaderRibbon persistent default; no VNode/DOM classifier or delayed first-frame
  correction. V-A92's explicit collapsible-opt-in half is SUPERSEDED — HeaderRibbon is now
  persistent-only (see the value.js inbound mark).
- V-A94: AuroraStage's old 30rem floor is removed. At the observed 1280x720 route, stage and
  configurator aperture both measured 340.296875px and the interaction cue painted inside. Retain
  an ordinary regression assertion and native recheck; do not re-open the offset workaround.
- V-A95/V-A125: nested material simplification is valid, but the second-reverse black-slab defect
  remains active. The Chromium-only attribution and inert backing-plane experiment are withdrawn.
- V-A97: producer DAG is resolved by immutable registry Value 4, then Keyframes 6. Glass now owns
  only its registry-only strict/native/package close.
- V-A111-V-A121: P019/P122/P047 source is not downstream product acceptance. Value owns its Picker
  Card-to-InstrumentChassis transposition, Blob placement/0.325 consumer tuning, composite bounds,
  and Dock affordance economy after immutable Glass 7 is installed.
- V-A122: Q023 cannot animate Drawer blur radius. The graded edge belongs to Sheet/overlay; the
  engage register is declined without a real second consumer.

These are amendments to existing P/Q owners, not reasons to mint another tranche or meta gate.

## 8. Q-addenda disposition matrix

The 20 Q waves are the governing continuation:

| wave | binding scope | current truth | terminal work |
| --- | --- | --- | --- |
| Q002 | once-per-candidate pre-tag paint lane | pending | run only on a clean candidate; native gestalt remains authoritative |
| Q003 | tree-wide native paint/material/accessibility batch | **ACTIVE RED**; current filters are 4/0 desktop and 3/0 narrow | resolve V-A95, then close the full nonterminal native roster below, including P016-P022/P046/P047/P051/P055-P060/P062/P075/P093/P122, Rim continuity, and judgment captures |
| Q010 | DataTable/Card proportional substitutions and route dedupe | source dirty/implemented | ordinary batch, 1440/390 both schemes, two clean challenges |
| Q020 | retire unconsumed eyeglass spring path | source implemented; seven presets | native Tabs matrix and two clean challenges |
| Q021 | Dock fission evidence packet | user-gated | assemble after Q003 evidence; Q051 row 1 decides ratify/rebuild |
| Q023 | graded Sheet edge; Drawer blur-engage declined | source committed | wide/narrow five-placement native matrix; Drawer remains fixed-radius |
| Q024 | retune only overlay arrival scale 0.88 to 0.94 | source implemented | Dialog/Popover/Toast native matrix and clean challenges |
| Q030 | shared cleanup | materially landed | retroactive two challenges and status truth-up |
| Q031 | move virtual windowing to demo; delete false library/store ownership | staged/dirty; 390 partial green | desktop + Dock Search + final ToC native close; no forwarder |
| Q032 | seven-domain internal motion colocation | dirty/implemented | source/public-surface checks, native motion routes, two challenges |
| Q033 | orphan script/primitives retirement | partial | finish dirty primitives retirement and challenge value, not file counts |
| Q040 | verification declaration and strict package closure | materially landed/dirty | finalize declaration ownership; no new runner |
| Q041 | scrub wave/meta implementation commentary | partial dirty | finish without deleting useful product rationale; two challenges |
| Q042 | Aurora fields/GL setup/Blob simulation owner carves | dirty/implemented | focused ordinary matrix, both-engine native behavior, two challenges |
| Q043 | ordinary CI consistency | landed at `d17153ec` | retroactive two challenges only; no CI expansion |
| Q050 | terminal disposition ledger | committed with dirty truth-up | correct tense/status/version drift and current Q003 facts |
| Q051 | one user judgment roster | open | present 16 live decisions only after evidence riders are ready |
| Q060 | consumer outbounds | pending settled export/artifact | truth pins and return exact immutable Glass coordinates after publish |
| Q063 | source-media preservation | seven source-media assets committed | preserve divergent dot-flow original or narrow archive claim by user ruling |
| Q070 | process codex | landed | retroactive two challenges; keep it descriptive, not machinery |

Q080 is retracted. Q081 is banked and may re-open only on a fresh explicit user order.

### Executable map of the 49 nonterminal P rows

| product lane | P rows | what closes them |
| --- | --- | --- |
| material, type, responsive, accessibility, producer migration | P015-P023 | Q003 material/input/accessibility matrix, P019 proportions, exact Value/Keyframes declarations, then Q002/package close |
| temporal authority and motion | P025-P031 | current Springs/lifecycle hardening; press, morph, enter/exit, scroll, PRM native routes; two post-edit challenges |
| Dock plate, selection, motion, demo | P035, P036, P041, P042 | initial posture/layering/static backdrop/overflow/focus/orientation/PRM in Q003 and Q021 evidence |
| procedural marks and fields | P046, P047, P051 | Aurora dual-engine/input/lifecycle, Blob DPR/engine painted mass, HandMark/WatercolorDot visual semantics |
| demo chassis, information architecture, heroes, examples, accessibility | P055, P056, P058, P060, P062 | native routed demo hierarchy, proportionality, copy/failure, keyboard/focus/accessibility; no generated scenario matrix |
| core controls and feedback | P065, P067, P068, P075-P077 | Button/Input/Textarea and Progress/Pulse/StatusDot native states, marks/Rim continuity where applicable |
| semantic component apotheosis | P091-P094, P097-P098, P101-P102, P104-P105, P107-P108, P116 | Chip/Tabs/Slider/NumberField/TagsInput/LabeledField/disclosures/Tooltip/Menu/Drawer/Command/DataTable native contract matrices |
| physical sleeve and package boundary | P122, P127 | InstrumentChassis coordinate witness; registry-only clean graph, strict declarations, exact clean candidate, Q002, immutable publish |

This table is routing, not a new gate. Open the named wave files for exact acceptance and close
coherent families together instead of overfitting the current three hot lanes.

### Q051 user decisions

There are **16 live decisions**. The roster now restores row 6 to a blank `DECISION:` line while
retaining the “moot/superseded” recommendation; only row 17 was user-closed.

1. Dock fission ratify or rebuild.
2. Dock spring recommendation/veto.
3. Pager worm aesthetic.
4. Tempo identity/veto.
5. Button blur-mute cohort.
6. Eyeglass sizing-axis supersession ratification.
7. Hero cartoon-weight A/B.
8. Drawer detents recommendation/veto.
9. Inline-edit primitive retirement.
10. Eight Baseline standing books retirement.
11. Aurora medium lazy split.
12. Metrics sextet scope.
13. Hover-popover Kronecker fold.
14. CompletionSeal consumer question; border-progress half is moot. The latest Atlas augmentation
    reports four real Atlas/SCI imports, so truth this row before asking rather than preserving the
    old “0-or-1 consumer” premise.
15. Dot-flow halftone revival.
16. Metric-badge inversion confirmation.

Do not ask this roster piecemeal. Evidence-dependent rows wait for Q003/Q021.

## 9. Principal RED: Q003 / V-A95

The plan's `5 active / 0 nested` and adjacency-pending text is stale. Current native/source truth
is **4 active backdrop filters / 0 nested** at desktop and **3 / 0** at narrow width after the
valid simplification from roughly 95 active / 92 nested.

Latest in-app Browser causal observation on `/substrates/aurora`:

- first forward/reverse and second forward native drags were clean;
- the second reverse drag produced broad black slabs at about +70ms across the preset ribbon,
  right studio controls, and sidebar/bottom dock;
- Aurora root and canvas CSS geometry remained exactly
  `[225, 198.5625, 718, 474.546875]`;
- canvas backing remained exactly `1077 x 712` before, immediate, and settled;
- all damaged layers recovered by roughly +950ms;
- matched-size adjacency experiments were refuted;
- therefore canvas resize/backing-store mutation and the prior adjacency hypothesis are refuted;
  damaged regions align with independent live backdrop plates, but a causal correction is not yet
  proven.

Run a research/harden/wave-update triumvirate against this measured mechanism while other product
work proceeds. The next bounded experiment must change one shared material/layer ownership variable,
preserve real glass affordance, and restore the honest 4/0 baseline if red. Forbidden: z-index or
opacity cover, inert backing plane, overflow reveal, filter target, second sampler, canvas reset,
reload cure, engine masking, raster/static replacement, per-site patch, or consumer override.
The first such bounded experiment has now LANDED in-tree — Aurora.vue gives the live GPU canvas
permanent compositing isolation (`isolation: isolate`, V-A95); it is one
shared material/layer-ownership change, not a forbidden mask. Cure-confirmation is still owed on
the real instrument (the second-reverse drag on `/substrates/aurora`).

No Glass pack/tag/publication credit while this remains red. An evidence-backed decline is only
honest if the platform defect is isolated beyond Glass ownership and the product remains usable;
transient black slabs are currently a user-visible Glass defect, not an acceptable platform shrug.

## 10. Native debt that source/tests cannot close

The consolidated Browser batch must cover, at minimum:

- P019 and P122 at 1440, 390, 320, and 400% zoom, both schemes;
- P046 Aurora WebGPU/WebGL2 equivalence where an honest engine environment exists, pointer medium,
  repeated forward/reverse input, PRM, park/resume/failure identity;
- P047 Blob DPR 1/2 x WebGPU/WebGL2 rendered-component measurements;
- P075 Progress marks and P093 Slider marks, including the shared arbitrary-domain model,
  range, RTL/inverted, vertical, boundary interpolation, and ScrollProgressRim continuity;
- HeaderRibbon persistent-only: placement (left/right), first paint, RTL, forced-colors, and
  coarse-pointer arms;
- Springs named/custom, wide/narrow, exact overshoot bounds, parameter reseat, RTL, PRM, copy
  keyboard/failure/payload change;
- Dock initial collapsed/expanded, orientation, layering, overflow, focus, safe inset, PRM;
- Drawer/Sheet open, close, reverse, interruption, five placements, scrolling, Escape/outside,
  no ghost hit target or terminal jump;
- Tabs one-fill geometry across orientation/direction/input;
- Q010 Table/DataTable/Card topology and state/selection/action/focus;
- the Q051 capture pairs named in the Q plan.

Use the in-app Browser. If an honest WebGL2, Safari, device, zoom, or GPU arm is unavailable,
record the arm pending; never counterfeit it with a screenshot, engine failure, source inference,
or standalone headless gestalt.

## 11. Continuation path

Run three bounded lanes in parallel, never a competing edit on the same files:

### Write leases at handoff

No local subagent remains a live writer when this handoff returns, but the dirty transaction itself
is the prior owner's work. Re-census before claiming a lease.

| lease | exclusive write set | collision rule |
| --- | --- | --- |
| A — Springs/clipboard | `src/composables/dom/useClipboard.ts`; `demo/stories/motion/springs.vue`; `demo/chassis/code/CodeBlock.vue`; their focused tests; P024-P026 and the matching MIGRATION row | no Q032/Q041 edit touches these paths until A transfers them |
| B — HeaderRibbon/declarations | `src/components/header-ribbon/**`; `tests/components/header-ribbon.contract.test.ts`; P114; `scripts/verify-export-types.mjs`; declaration-only package changes | package/export edits require orchestrator arbitration with P127/Q040 |
| C — Q003 native research | live Browser state plus Q003/V-A95 notes | research/native-only while Q042 owns Aurora/Blob source; a source experiment begins only after an explicit Q042 path handoff |
| Q031 | `demo/composables/virtual/**`, its two stories, sidebar tracker, related tests/docs | do not start a second virtual implementation lane |
| Q032 | `src/composables/motion/**`, import repairs, motion tests/docs | direct file overlap transfers to A first; no forwarding barrels |
| Q041 | cross-cutting comment/prose scrub | pause while any product lane edits the same file; resume from an exact manifest after product quiescence |
| Q042 | `src/components/aurora/**`, internal Blob simulation/renderer ownership, focused procedural tests/docs | owns procedural source until its carve is collected; Q003 may observe but not race it |

### Lane A — Springs/clipboard

1. Inspect the current P024/P025/P026 diff and focused tests.
2. Run the focused ordinary tests after the latest hardening.
3. Dispatch two fresh independent challenges.
4. Correct any material result, rerun two clean passes, then native Browser.
5. Amend P024's premature `DONE` only when this slice is genuinely terminal.

### Lane B — HeaderRibbon/declarations

1. Preserve the explicit persistent-default/collapsible-opt-in contract.
2. Challenge public API, first render, focus lifecycle, placement, SSR, and declaration reach.
3. Run focused suite, type graphs, library build, and strict package verification.
4. Complete left/right wide/narrow native matrix and two clean passes.
5. No VNode classifier, DOM observer, width/z-index patch, skipLibCheck, or dependency shim.

### Lane C — Q003 research/hardening

1. Reproduce from the 4/0 baseline with repeated forward/reverse native drags.
2. Preserve exact before/immediate/+70ms/+900ms/settled observations.
3. Research the shared live-backdrop/layer mechanism and make one reversible bounded correction.
4. Keep or revert strictly by native product behavior.
5. Update Q003/V-A95 prose to current measured truth at the same boundary.

The prior Browser observations came from the in-app Browser against the ephemeral demo at
`http://127.0.0.1:5199` (notably `/substrates/aurora`). Do not assume that process or tab survives
handoff. Re-establish it with `npm run demo:serve`, open the exact route in the in-app Browser,
confirm a nonempty mounted route and current engine/status, then begin native actions.

In parallel after owner-safe boundaries, continue Q031/Q032/Q041/Q042 and the Q033/Q050 truth-up.
Then close Q010/Q020/Q023/Q024 natively, execute the remaining P native roster, prepare Q021/Q051,
and finish Q060.

Before Q002, close the new challenge debt by domain-batching the implemented rows: material/glass,
Dock/overlay, motion, procedural, component/data, demo/chassis, and package/public surface. Map both
independent passes back to every covered P/Q id in concise wave prose. Credit an already documented
clean pass only when it followed that wave's last material edit; do not rerun it for ceremony. Do
not serialize 134 miniature audits or mint a coverage script—the pass should inspect real coherent
features while adjacent implementation continues.

The truth-up includes the stale 0.68/zeta-0.64 Dock comment in
`src/styles/tokens/scheme-spring.css`, Q003's old 5/0 and adjacency prose, Q050's pre-commit tense,
the old pins in `asks-and-consumes.md`, the missing Value-V inbound mark, Q051 row 6, the Q063
dot-flow “duplicate” claim, and the first addenda inbox's missing discharge banner. The earlier
`./styles/theme` contradiction is already discharged because that export now exists.

Only after all of that:

1. run focused validation for each final bounded slice, then stage and commit only that slice with
   commit discipline;
2. establish one clean exact candidate HEAD; if unrelated owner work prevents a clean tree, do not
   pretend it is a release candidate;
3. on that exact commit, run consolidated `npm run typecheck`, the substantive focused/full
   `npm test` set, `npm run build`, `npm run demo:dist:build`, and
   `npm run verify:package` with strict declarations;
4. optionally run the live manual `npm run profile:bundle` because it still answers a real bundle
   question; do not make it a release gate;
5. run Q002 on the same clean candidate with native Browser gestalt;
6. pack one fresh Glass artifact from the same commit and immutable registry Value 4 / Keyframes 6;
7. inspect the packed export map, declarations, CSS/assets, strict consumer, and native consumer;
8. if any check changes source, make a new bounded commit and restart the exact-candidate sequence;
9. tag/publish only the already inspected byte-identical artifact from the exact green commit and
   return observed tarball, integrity, shasum, gitHead, provenance, declarations, and export-map
   changes.

## 12. Coordination boundaries

- Value and Keyframes are separate owner sessions and immutable registry producers. Do not rebuild,
  refreeze, patch, or source-link them from Glass.
- The Value Picker's blank mount, Card-to-InstrumentChassis migration, composite Blob placement,
  and consumer Dock affordance decisions remain Value-owned after it installs immutable Glass 7.
  Its route should retain one route-identifying control; a redundant home mark should disappear if
  the Picker text routes, and eye/ellipsis controls require durable named state/purpose or removal.
  Glass owns only genuine producer defects.
- Keyframes waits for the immutable Glass 7 artifact. It must not consume local source, held
  rehearsals, or `package.json` intent.
- Atlas/SCI wait for the same immutable boundary. The DataTable seam is already implemented;
  future controlled Dock posture and lower-priority fixed left/right placement asks are queued,
  not active scope expansion. The controlled posture must suppress the internal FSM at both poles;
  it must not become consumer CSS or a second state writer.
- Q060 must return the settled break map and exact immutable coordinates; never announce branch
  bytes as consumed.

## 13. Direct continuation directive

> Resume the active Glass BI/P/Q tranche from the shared dirty worktree on
> `codex/bi-p-q-execution` at `c181f0a7`. Preserve every owner slice and the dirty `docs/precepts`
> submodule. Treat the historic 93-wave plan as ancestry, P000-P133 as the 134-row execution ledger,
> and the 20 Q waves as the governing continuation. Do not revive proof/gate/receipt machinery.
> Execute real product work through bounded subagents, with native in-app Browser visual truth and
> two fresh post-edit challenge passes per wave. First finish Springs/clipboard and
> HeaderRibbon/declarations while a separate research/harden/wave-update lane isolates Q003/V-A95
> from the honest 4-active/0-nested desktop and 3-active/0-nested narrow baselines. Continue
> Q031/Q032/Q041/Q042 at owner-safe boundaries.
> Do not pack or publish while Q003 or native/declaration debt is red. Consume only immutable
> registry Value 4 and Keyframes 6. Return control only after the full P/Q plan, Q051 rulings,
> Q060 outbounds, strict candidate, native close, and exact immutable Glass artifact are complete.

Hic et ubique: no workaround, no legacy path, no false terminal claim.
