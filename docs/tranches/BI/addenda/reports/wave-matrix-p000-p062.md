# Perfected-BI wave-status matrix — BI.W-P000 .. BI.W-P062

Execution-archaeology audit. READ-ONLY on the working tree (an in-flight uncommitted
transaction of 695 M / 155 D / 105 untracked).

- Repo: `/Users/mkbabb/Programming/glass-ui`
- Formation base: `26c5ae686fd0f1181083aebda1215b00524555f1` (branch `tranche/BI`)
- HEAD: `e5b3a2095b6c3e330b5d82ca3330f1eac4e3c895` (branch `master`), package.json `6.0.0`
- Commits base..HEAD: 65 (P000 `1c2cda3a` + P001 `b5eee380` + `f20a2aa9` formation + `99009e2a` lockfile + ~61 conventional)
- npm published in-window: 5.0.0 (2026-07-15T15:02Z), 6.0.0 (2026-07-15T21:37Z). CHANGELOG top section = `7.0.0 (unreleased)`; package.json still `6.0.0`.

## Governing facts established by evidence

1. **The protocol was abandoned after P001.** Only P000 (`1c2cda3a`) and P001 (`b5eee380`)
   carry a receipt/commit tuple. The ~61 subsequent commits are ordinary Conventional
   Commits with no `BI-Wave`/`BI-Receipt-SHA256` trailers and no per-wave receipts.
2. **The protocol substrate is being REVERSED in the working tree.** The uncommitted
   transaction deletes `scripts/verify.mjs`, `scripts/verification/*` (discover, invariants,
   mutation-fixtures, schemas), `scripts/tranche/*` (cursor, transaction-envelope,
   bootstrap-receipt, all schemas), `docs/tranches/BI/BOOTSTRAP.json`,
   `docs/tranches/BI/EXECUTION-PROGRESS.md`, `docs/tranches/BI/FORMATION/execution-cursor.seed.json`,
   and `docs/tranches/BI/evidence/BI.W-P001/receipt.json`. The verifier and cursor that
   P000/P001 built are being torn out.
3. **All 134 wave specs were rewritten in-flight.** Each `waves/BI.W-P0XX.md` now carries a
   terse retrospective `Status:` line (DONE/IMPLEMENTED/DECLINED/SUPERSEDED/ABROGATED) that
   REPLACES the original formation spec. These on-disk dispositions are the in-flight agent's
   self-report; they are treated here as hints and corroborated against code. Several rescope
   the wave (e.g. index P032 "Pointer velocity, drag, coarse-input motion" → on-disk
   "Dock pointer and gesture ownership").
4. **No per-wave π evidence exists on disk.** `docs/tranches/BI/evidence/` contains only
   `BI.W-P001/receipt.json` (itself deleted in the working tree) — zero `BI.W-P0XX` π captures
   for any wave. Committed PNGs under `docs/tranches/BI/audit/` (`user-findings-2026-07-11`,
   `W-CONFIG-IN-SHEET`, `W-E10-AURORA-ENTRANCE`, `W-PAGER-WORM`, `fourier-ribbon-delta`) are
   earlier ad-hoc audit captures, NOT keyed to any P0XX wave. π obligations live only as
   `tests-visual/*.spec.ts` harnesses (present, timestamped Jul 15) with no committed capture
   artifacts; they were not run in this audit (read-only fence). Therefore **every browser-π
   wave in range has an UNMET π/native-acceptance obligation.**
5. **Every P015..P062 family's final source is in the uncommitted transaction**, layered over
   partial pre-6.0.0 commits (working-tree change counts: demo/stories 116, src/styles 61,
   src/composables/motion 33, src/components/dock 26, demo/chassis 25, aurora 20, glass 14,
   blob 14). Committed = shipped in ≤6.0.0; uncommitted = the unreleased 7.0.0 work.

Status vocabulary: **DONE-PROTOCOL** (receipt+commit tuple) · **LANDED-CONVENTIONAL**
(conventional commit executes the subject) · **PARTIAL** (part committed, remainder in the
transaction or missing) · **IN-FLIGHT** (deliverable only in the uncommitted transaction) ·
**ABSENT** (declined/superseded/no evidence).

## Matrix

| id | π | status | evidence SHAs / paths | skipped obligations | notes |
| --- | --- | --- | --- | --- | --- |
| P000 | device-free | DONE-PROTOCOL | `1c2cda3a` created `scripts/verify.mjs`, `scripts/verification/*`, `docs/tranches/BI/BOOTSTRAP.json` | — | **REVERSED in-flight**: all of the above are `D` in the working tree. On-disk spec: "SUPERSEDED — REPLACEMENT ENGINE ABROGATED". Product built then being deleted. |
| P001 | device-free | DONE-PROTOCOL | `b5eee380` created `scripts/tranche/*`, `docs/.../evidence/BI.W-P001/receipt.json`, `EXECUTION-PROGRESS.md` | — | **REVERSED in-flight**: cursor/transaction-envelope/receipt all `D`. On-disk: "ABROGATED — LANDED META ONLY". Protocol abandoned immediately after. |
| P002 | device-free | ABSENT | no `scripts/tranche/release-projection.mjs`, no `FINAL.md`/`RELEASE-ATTESTATION.json` ever committed | continuous-FINAL/attestation generator | On-disk "DECLINED — NOT LANDED". EXECUTION-READINESS made P002 activation a precondition for P005+; it never landed. |
| P003 | device-free | ABSENT | no root-object snapshot / model-routing registry in tree | ROOT-canon lineage + routing conformance | On-disk "DECLINED — NOT LANDED". |
| P004 | device-free | ABSENT | no constellation registry/scanner; only untracked `docs/.../coordination/valuejs-inbox-2026-07-15-v-formation.md` | read-only constellation scan + owner handshake protocol | On-disk "SUPERSEDED — DIRECT OWNER HANDOFFS". |
| P005 | device-free | ABSENT | no generated structure authority; `scripts/regen-structure.mjs` is `D` in-flight; `scripts/lib/subpath-policy.mjs` predates | MS1 generated whole-tree structure authority | On-disk "DECLINED — CURRENT ENTRY GRAPH SUFFICIENT". |
| P006 | device-free | LANDED-CONVENTIONAL | `ea3c002c` refactor(structure/ms2), 207 files | — | Utility colocation. Subject confirmed by commit + on-disk SHA agree. |
| P007 | browser | LANDED-CONVENTIONAL | `9f165717` feat(sortable-list), 32 files | browser-π (evidence/BI.W-P007 empty) | MS3 SortableList colocation. |
| P008 | device-free | LANDED-CONVENTIONAL | `9a8761f0` refactor(structure/ms4), 869 files | — | MS4 flatten component families. |
| P009 | device-free | LANDED-CONVENTIONAL | `bba7b51d` refactor(structure/ms5), 19 files | — | MS5 dissolve root barrels. |
| P010 | device-free | LANDED-CONVENTIONAL | `bb5c1e5c` refactor(structure/ms6), 79 files | — | MS6 semantic public entries. On-disk adds a Value-4 `/color`//`css`//`easing` projection still blocked on Value V.W17 (unbuilt). |
| P011 | browser | LANDED-CONVENTIONAL | `4bf29831` refactor(styles/ms7), 42 files | browser-π (evidence/BI.W-P011 empty) | MS7 colocate component CSS. |
| P012 | browser | LANDED-CONVENTIONAL | `f1acf31f` refactor(demo/ms8), 43 files | browser-π (evidence/BI.W-P012 empty) | MS8 demo/private-chassis re-home. |
| P013 | browser | ABSENT | no live structure differential guard in tree | MS9 live differential guard; browser-π | On-disk "SUPERSEDED — ORDINARY CHECKS OWN THE CONTRACT". |
| P014 | browser | ABSENT | no distinct commit; `scripts/verification/*` (its substrate, created at `1c2cda3a`) is `D` in-flight | 40 declared invariants; browser-π | On-disk "ABROGATED — REPLACEMENT VERIFIER REMOVED". Verifier-tail folded into P000 then deleted. |
| P015 | device-free | PARTIAL | `b7b25f51` refactor(tokens) excises aliases (9 files); typed graph `src/styles/tokens/manifest.ts` + `tests/styles/token-graph.test.ts` are UNTRACKED (in-flight) | — | Dead-alias excision landed; typed semantic-graph deliverable uncommitted. On-disk "IMPLEMENTED — SOURCE CONTRACT GREEN". |
| P016 | browser | LANDED-CONVENTIONAL | `aa34d832` feat(material) 13 files, `b65a5d93` feat(material) 1 file | browser-π (evidence/BI.W-P016 empty) | Warm content-field / material hierarchy. src/styles still reworked in-flight. On-disk "NATIVE MATERIAL ACCEPTANCE PENDING". |
| P017 | browser | IN-FLIGHT | no dedicated commit; partly folded into `aa34d832`; src/styles material reworked in working tree | browser-π; distinct landing UNVERIFIED | On-disk "IMPLEMENTED — NATIVE FUNCTIONAL-PLANE ACCEPTANCE PENDING". |
| P018 | browser | PARTIAL | shadow tokens trimmed in `b7b25f51` (`src/styles/tokens/shadow.css` -32); depth/radius rework in-flight (src/styles) | browser-π (evidence/BI.W-P018 empty) | On-disk "P109 OWNS RETAINED STATIC CARTOON DECORATION" — decoration deferred out of range. |
| P019 | browser | LANDED-CONVENTIONAL | `4dc3bcca` refactor(typography), 4 files | browser-π (evidence/BI.W-P019 empty) | Index title "Audacious display type"; on-disk rescoped "Proportional editorial type pair". |
| P020 | browser | IN-FLIGHT | no dedicated commit; src/styles color core reworked in working tree; specs `no-gray.spec.ts`,`teal-navy-purge.spec.ts`,`glass-accent.spec.ts` | browser-π; Value-4 cut deferred to P127 | On-disk "IMPLEMENTED ON THE CURRENT COLOR CORE — NATIVE ACCEPTANCE AND P127 VALUE 4 CUT PENDING". |
| P021 | browser | IN-FLIGHT | `src/styles/utilities/responsive.css` UNTRACKED | browser-π (evidence/BI.W-P021 empty) | On-disk "IMPLEMENTED — NATIVE INPUT/ZOOM ACCEPTANCE PENDING". |
| P022 | browser | LANDED-CONVENTIONAL | `bed0a122` feat(interaction) honor live motion prefs, 19 files | browser-π (evidence/BI.W-P022 empty) | Accessibility material/interaction modes. Overlaps P031. |
| P023 | browser | IN-FLIGHT | no dedicated commit; src/composables/motion reworked (33 files); keyframes-6 cut deferred | browser-π; immutable Keyframes-6 cut deferred to P127 | On-disk "IMPLEMENTED — IMMUTABLE KEYFRAMES 6 CUT DEFERRED TO P127". |
| P024 | device-free | LANDED-CONVENTIONAL | `80654800` refactor(motion-api) remove two deprecated return-shape aliases, 3 files | — | On-disk "DONE — PRODUCT COMPLETE". Motion source further reworked in-flight. |
| P025 | browser | PARTIAL | `b803de39` fix(motion) sheet scrims on global tempo clock, 6 files; lifecycle rework in-flight | browser-π (evidence/BI.W-P025 empty) | On-disk "IMPLEMENTED — NATIVE LIFECYCLE ACCEPTANCE PENDING". |
| P026 | browser | LANDED-CONVENTIONAL | `8765d77f` refactor(motion) share generated spring horizon, 5 files (+392/-193) | browser-π (evidence/BI.W-P026 empty) | Spring families as semantic motion tokens. |
| P027 | browser | LANDED-CONVENTIONAL | `8fec6dd2` refactor(motion) pressables one interaction owner, 10 files | browser-π (evidence/BI.W-P027 empty) | Press language / tactile glass. |
| P028 | browser | IN-FLIGHT | `src/composables/motion/useGooMorph.ts` + `morphSignatures.ts` are `D`; `tests/composables/motion/useElementMorph.test.ts` UNTRACKED | browser-π (evidence/BI.W-P028 empty) | On-disk "IMPLEMENTED — NATIVE MORPH ACCEPTANCE PENDING". Single FLIP/morph engine reworked in transaction. |
| P029 | browser | LANDED-CONVENTIONAL | `94fb7b13` fix(view-transition) typed navigation, 2 files (+82) | browser-π (evidence/BI.W-P029 empty) | Enter/exit + View Transition continuity. |
| P030 | browser | PARTIAL | `698c2b1d` feat(scroll-progress-rim) extract primitive, `d87d0bd1` fix(scroll-progress-rim) keep band visible; `demo/shell/useShellScrollProgress.ts` `D`, `scroll-reveal-once.test.ts` `D` | browser-π (evidence/BI.W-P030 empty) | Native scroll timelines / single-owner scroll state; rim landed, scroll-state ownership reworked in-flight. |
| P031 | browser | PARTIAL | `bed0a122` (motion prefs) + `src/composables/motion/useReducedMotion.ts` & test UNTRACKED | browser-π (evidence/BI.W-P031 empty) | On-disk "IMPLEMENTED — NATIVE ACCEPTANCE PENDING". |
| P032 | browser | IN-FLIGHT | `src/components/dock/composables/useDockFisheye.ts` `D` (unconsumed pointer writer removed); dock reworked (26 files) | browser-π (evidence/BI.W-P032 empty) | Index = motion "Pointer velocity/drag"; on-disk rescoped "Dock pointer and gesture ownership — done, simplified". |
| P033 | device-free | IN-FLIGHT | `useDockState` present; dock reworked in-flight; `e3a10ab8` seeds collapsed morph | — (device-free) | On-disk "SUPERSEDED BY SMALLER OWNERS" — no monolithic dock state machine built. |
| P034 | browser | IN-FLIGHT | `src/components/dock/DockSection.vue`, `DockStack.vue` `D`; dock reworked | browser-π (evidence/BI.W-P034 empty) | On-disk "done, pruned". |
| P035 | browser | IN-FLIGHT | `dock/styles/section.css` `D`; dock plate reworked | browser-π (evidence/BI.W-P035 empty) | On-disk "implemented; native static-backdrop acceptance pending". |
| P036 | browser | IN-FLIGHT | dock crossfade/selection reworked in transaction | browser-π (evidence/BI.W-P036 empty) | On-disk "done". |
| P037 | browser | IN-FLIGHT | `useDockPopover.ts`, `dock/styles/popover.css` `D`; `95b0d20f` fix(dock) close active fans | browser-π (evidence/BI.W-P037 empty) | On-disk "SUPERSEDED BY EXISTING OVERLAY PRIMITIVES". |
| P038 | browser | IN-FLIGHT | `useDockOverflowFit` present; dock reworked | browser-π (evidence/BI.W-P038 empty) | On-disk "done, simplified". |
| P039 | browser | IN-FLIGHT | dock rail/bottom geometry reworked in transaction | browser-π (evidence/BI.W-P039 empty) | On-disk "done". |
| P040 | browser | IN-FLIGHT | `DockControl`/`DockTrigger` folding reworked in transaction | browser-π (evidence/BI.W-P040 empty) | On-disk "done". |
| P041 | browser | PARTIAL | `70a7be9a` feat(dock) morph geometry + CTA receipt measurable; `e3a10ab8`; dock motion reworked in-flight | browser-π; GCF-01 native acceptance pending | On-disk "implemented; GCF-01 native acceptance pending". |
| P042 | browser | IN-FLIGHT | `demo/shell/DockFacetMenu.vue` UNTRACKED; dock demo reworked | browser-π (evidence/BI.W-P042 empty) | On-disk "source complete; native visual review pending the major batch". |
| P043 | browser | LANDED-CONVENTIONAL | `693b58b7` fix(webgl) cancel pending visibility frames on disposal, 2 files (+102) | browser-π (evidence/BI.W-P043 empty) | On-disk "DONE — PRODUCT COMPLETE". |
| P044 | browser | IN-FLIGHT | `src/composables/glass/procedural/color.glsl.ts` + `color.wgsl.ts` UNTRACKED; old `webgl/shaders/procedural-color.glsl.ts` + `webgpu/glassShader.wgsl` `D` | browser-π (evidence/BI.W-P044 empty) | **CONTRADICTION**: on-disk "DONE — PRODUCT COMPLETE" but deliverable is uncommitted. |
| P045 | browser | LANDED-CONVENTIONAL | `558349c6` feat(renderers) expose substrate + attributed failure, 22 files | browser-π (evidence/BI.W-P045 empty) | On-disk "DONE — PRODUCT COMPLETE". |
| P046 | browser | IN-FLIGHT | aurora reworked (20 files); `aurora/RESEARCH.md` + `procedural-color.wgsl.ts` `D`; `tests/.../aurora/uniform-packing.test.ts` UNTRACKED | browser-π (evidence/BI.W-P046 empty) | On-disk "IMPLEMENTED — NATIVE DUAL-ENGINE ACCEPTANCE PENDING". No dedicated commit. |
| P047 | browser | PARTIAL | `0720009e` feat(blob) press surface, 4 files; blob reworked (14 files); `resolveBlobSurface.ts` + `blob-surface.test.ts` UNTRACKED; `blob/RESEARCH.md` `D` | browser-π; immutable cut pending | On-disk "IMPLEMENTED — NATIVE PAINTED-COMPONENT MEASUREMENT AND IMMUTABLE CUT PENDING". |
| P048 | browser | LANDED-CONVENTIONAL | `7edb2f97` refactor(constellation) Canvas2D convergence, 20 files (-1765); `efae1ea6` name switch | browser-π (evidence/BI.W-P048 empty) | On-disk "DONE — PRODUCT COMPLETE". |
| P049 | browser | IN-FLIGHT | no dedicated commit; `src/components/fourier-field` reworked (3 files) | browser-π (evidence/BI.W-P049 empty) | On-disk "DONE". Committed `audit/visual/fourier-ribbon-delta/*.png` are older ad-hoc captures, not P049 evidence. |
| P050 | browser | IN-FLIGHT | no dedicated commit; `src/components/liquid-grid` reworked (3 files) | browser-π (evidence/BI.W-P050 empty) | On-disk "DONE". WebGPU-first equivalent field. |
| P051 | browser | PARTIAL | `d1191cf3` refactor(handmark) one public name, 6 files; `tests/components/watercolor-dot.contract.test.ts` UNTRACKED | browser-π (evidence/BI.W-P051 empty) | On-disk "IMPLEMENTED — NATIVE VISUAL REVIEW PENDING". |
| P052 | browser | ABSENT | no formation procedural-config schema; demo configurator + `viz-configurator-suite.spec.ts` predate | browser-π; config schema + live-control roundtrip | On-disk "DECLINED". |
| P053 | browser | ABSENT | no cross-engine perceptual parity matrix in tree | browser-π; parity matrix | On-disk "DECLINED". |
| P054 | browser | IN-FLIGHT | no dedicated commit; profiling scripts `profile-aurora.mjs`, `aurora-profile/harness-browser.mjs` `D`; `perf-producer.spec.ts` present | browser-π (evidence/BI.W-P054 empty) | On-disk "DONE" (procedural resource ownership); source only in transaction. |
| P055 | browser | IN-FLIGHT | no dedicated commit; demo/chassis reworked (25 files); `PermutationGrid.vue`, `SpecimenFrame.vue`, `useSectionReveal.ts` `D` | browser-π (evidence/BI.W-P055 empty) | On-disk "SOURCE COMPLETE — NATIVE VISUAL REVIEW PENDING". |
| P056 | browser | PARTIAL | `d97e2a05` refactor(demo-hierarchy) 28 files; `b8ba6036` delete route compat; demo reworked in-flight | browser-π (evidence/BI.W-P056 empty) | On-disk "SOURCE COMPLETE — NATIVE VISUAL REVIEW PENDING". |
| P057 | device-free | IN-FLIGHT | `demo/stories/manifest.ts` + `manifest/lazy.ts` MODIFIED (uncommitted) | — (device-free) | On-disk "DONE — PRODUCT COMPLETE" but manifest reworked uncommitted. |
| P058 | browser | PARTIAL | `b66a5f28` fix(demo) size hero titles, 1 file; hero/type rework in-flight (demo/chassis/hero) | browser-π (evidence/BI.W-P058 empty) | On-disk "SOURCE COMPLETE — NATIVE VISUAL REVIEW PENDING". |
| P059 | browser | IN-FLIGHT | `demo/chassis/showcase/SpecimenFrame.vue` `D`; specimen surface reworked in transaction | browser-π (evidence/BI.W-P059 empty) | **CONTRADICTION**: on-disk "DONE — native accepted" but no π evidence on disk and deliverable in-flight. |
| P060 | browser | IN-FLIGHT | `demo/examples/` UNTRACKED (new); `tests/demo/code-block.test.ts` UNTRACKED | browser-π (evidence/BI.W-P060 empty) | On-disk "SOURCE COMPLETE — native review pending". |
| P061 | browser | ABSENT | formation π scenario runner declined; `tests-visual/pi-runner-manifest.mjs` + `pi-manifest.ts` exist but are the standalone harness, not the wave deliverable | browser-π; source-bound evidence runner | On-disk "DECLINED / SUPERSEDED". |
| P062 | browser | PARTIAL | `0badde9f` feat(accessibility) resolve product modes, 6 files; `ce48a727` name live demo controls, 23 files | browser-π; matrix superseded | On-disk "SOURCE COMPLETE — NATIVE ACCESSIBILITY REVIEW PENDING; MATRIX SUPERSEDED". |

## Roll-up

| status | count | waves |
| --- | --- | --- |
| DONE-PROTOCOL | 2 | P000, P001 (both being reversed in-flight) |
| LANDED-CONVENTIONAL | 17 | P006, P007, P008, P009, P010, P011, P012, P016, P019, P022, P024, P026, P027, P029, P043, P045, P048 |
| PARTIAL | 11 | P015, P018, P025, P030, P031, P041, P047, P051, P056, P058, P062 |
| IN-FLIGHT | 24 | P017, P020, P021, P023, P028, P032, P033, P034, P035, P036, P037, P038, P039, P040, P042, P044, P046, P049, P050, P054, P055, P057, P059, P060 |
| ABSENT | 9 | P002, P003, P004, P005, P013, P014, P052, P053, P061 |

Total = 63 waves (P000..P062). Zero waves are DONE per the original receipt protocol beyond
the first two; the tranche runs entirely on conventional commits and an unfinished
uncommitted transaction thereafter.

### Skipped-obligation summary
- **~45 browser-π waves in range carry an UNMET π obligation** — no capture under
  `docs/tranches/BI/evidence/BI.W-P0XX` for any of them. The only wave-keyed evidence artifact
  ever committed is `evidence/BI.W-P001/receipt.json`, and it is deleted in the working tree.
- **Device-free waves** P000-P006, P008-P010, P015, P024, P033, P057 carry no π obligation, but
  the execution-substrate device-free waves P002/P003/P004/P005/P013/P014 were never built.

### Contradictions / flags
1. P000 & P001 are DONE-PROTOCOL yet their entire product (verifier, cursor, receipts,
   BOOTSTRAP.json, EXECUTION-PROGRESS.md) is deleted in the uncommitted transaction.
2. P044 & P059 carry on-disk "DONE"/"native accepted" dispositions while their deliverables are
   uncommitted (P044 shaders untracked; P059 SpecimenFrame deleted) with zero π evidence.
3. The launch contract (EXECUTION-READINESS.md) required P002 to activate continuous
   FINAL/attestation before P005+, and forbade release "until all 134 cursor rows are
   terminal" with π evidence — yet P002/P003/P004/P013/P014 never landed, the cursor is being
   deleted, and 5.0.0 + 6.0.0 already published.
4. The on-disk specs were rewritten wholesale, several rescoping the wave away from its
   formation subject (e.g. P032 motion→dock), so title-based attribution alone is unsafe.
