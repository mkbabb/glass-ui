# BI STRUCTURE-ADDENDA — SPECIFICATION (Pass 2 FOLDED, wave-terminal)

Pinned SHA **eafc0a69** (tranche/BI; B68 building live under the reads — every count re-validated at
this SHA). This document LANDS the DP-A..G rulings (baked, not re-litigated) and closes PD-1..10 as
concrete waves. It supersedes the v1 registry §4 menu + §5 open-probe list — no Decision-Point
carry-forward. Evidence is file:line at eafc0a69; the pass-2 executability + fresh-sample critics
(S2C2/S2C3) are folded — the three CONFIRMED strand hits and every ±1 census drift are corrected in
place. The four registry merges are REALIZED here: **M1** F2 flat `src/<entry>/` LOCATION ∪ the F4
`libraryEntryMap()` MECHANISM · **M2** F3 frame placed by F1 colocation-default + ≥2-unrelated-family
bar · **M3** the F4 generator applied to CSS (Mechanism-B copy-to-slot) · **M4** the F5
reverse-reachability filter supplies the delete-ledger + demo bipartition.

**★ USER-FLAG #1 (DP-A inversion — prominent, inverts the user's named example):** the user named
metric-badge as the speedtest overfit to remove; the consumer census says metric-badge is the
MOST-shared component (3 apps: speedtest×2, muster×2, sci-report×2) and only **metric-pill** is a
clean in-repo delete. §3 executes DP-A option (A) — pill-only delete + SHARED-KEEP the rest. If the
user overrules, DROP AD4; the costed break (speedtest becomes a UI lib, 4 apps break, foreign writes)
rides a later ruling. The addenda builds on (A).

**★ USER-FLAG #2 (R5 near-inversion — new, honesty-parity with #1):** ruling-5 said "colocate
composables," but 8 of 11 `src/composables/` subdirs are PUBLISHED public-API subpaths (color, dom,
motion+core+curves, dark, keyboard, reactive, virtual, sidebar — subpath-policy.mjs:101-108). You
cannot colocate a published entry into a consumer without deleting the public surface. So R5 lands as:
`composables/` SURVIVES whole as the published-hooks grouping; only the 2 INTERNAL, no-owner subdirs
move (`context/`→shared/, `sortable/`→its single owner). This is a genuine impossibility, flagged
here rather than softened by framing. If the user wants the published surface itself thinned, that is
a sibling-consumer census + cut-window ruling, not this addenda.

---

## §1 TERMINAL TREE

One shape. `ui/custom` split DEAD (M1); `composables/` SURVIVES as the published-hooks grouping
(PD-2 §1, correcting the pass-1 "collapse to shared/" — USER-FLAG #2); `shared/` earns exactly 3
members (DP-B); `styles/` thins to ownerless substrate (DP-C); the surface is generator-derived
(DP-D). Family/key/subpath counts below are **MS1-recompute OUTPUTS, never spec constants** — the
honest live figures at eafc0a69 are annotated, not hardcoded into acceptance.

```
src/
  components/                      # FLAT atoms (M1); ~81 families live @eafc0a69 (39 ui + 42 custom),
                                   #   trending DOWN as B8/AD4 land → MS1 recomputes the terminal count
    button/ card/ dialog/ drawer/ select/ popover/ combobox/ slider/ toast/ …   # ex-ui/, segment dropped
    aurora/ blob/ constellation/ fourier-field/ liquid-grid/ dock/ deck/ …      # ex-custom/, segment dropped
    data-table/  goo-filter/                                                     # protected own-atoms (2b)
    metric-badge/  { …, coalesceMetric.ts }   metric-cell/ metric-stack/         # coalesceMetric COLOCATES here (MS2)
    instrument-chassis/ status-dot/ timeline/ animated-digit/                    # SHARED-KEEP (DP-A)
    sortable-list/  { …, sortable/ composable folded in }                        # sortable COLOCATES here (MS3)
    border-progress/                                                             # STAYS internal; NO ./border-progress subpath
    blob/config.ts   fourier-field/math.ts                                       # name≠leaf → ./blob-config ./fourier-math
    _shared/  { axes.ts, ModalOverlay.vue, useControlSize/MotionAxis/SurfaceAxis, menuItemVariants } # 27-dir substrate; ./axes sourced here
    # metric-pill/  DELETED (DP-A, AD4)
  composables/                     # SURVIVES whole (PD-2/USER-FLAG #2); the published-primitives grouping
    color/ dom/ motion/(core,curves) dark/ keyboard/ reactive/ virtual/ sidebar/  # PUBLISHED-ENTRY dirs (8 of 11)
    glass/  { webgl,webgpu,canvas2d,wave; +supportsPostTask folded from platformSupport }  # STANDALONE substrate; ./canvas
    # context/ → shared/context/ (MS2)     sortable/ → components/…/sortable-list/ (MS3)
  shared/                          # NEWLY EARNED — 3 genuine members (DP-B; cn+context clear ≥2, prng confirms)
    cn.ts   prng.ts   context/
  styles/                          # THINNED to ownerless substrate (DP-C); component sheets colocated out (MS7)
    tokens.ts  tokens/ tokens.css  theme/ theme.css  typography/ typography.css  utilities/ utilities.css
    animations.css transitions.css view-transition.css draw-in.css  glass/ glass.css  feedback-tone.css menu.css  index.css
    # dock CSS is dock-greenfield-owned (STRUCT-RESEQUENCE D5) — not a colocate row here
  fonts/                           # font assets (substrate-adjacent, unchanged)
  html-attributes.d.ts             # ex src/types/ (DP-12; stays in tsconfig include)
  forms.ts                         # the ONE curated aggregating barrel that STAYS (genuine 3-dir+2-symbol, PD-9)
  index.ts                         # HAND-AUTHORED curated root barrel (DP-D; no manifest machinery)
  # DELETED: types/ · api/ · utils/ · subpaths/ · {axes,dark,keyboard,sidebar,infinite-scroll,carousel,motion,motion-core}.ts (8 barrels → dir index) · tokens.ts→styles/
```

Surface mechanism (M1/DP-D, unchanged authorities, re-pointed): `scripts/lib/subpath-policy.mjs`
(`libraryEntryMap()`**:273** fail-closed; `CURATED`**:129-150**) · `vite.library` (`libraryEntryMap`,
dormant→live) · `scripts/flatten-subpath-types.mjs` (MOVER→**GENERATOR**, PD-4) · `vite.style-fold.ts`
(extended → Mechanism-B, PD-5). NO wildcard `"./*"`; the root barrel stays hand-authored.

demo/ terminal (PD-10 §7, post-B68): `chassis/` (frame; +`hero/suffuse-preset.ts`), `shell/`
(app frame; +`configurator/` folded in), `stories/` (content; `manifest.ts` STAYS — hoist rejected;
`import.meta.glob("./*/*.vue")` TERMINAL; 7 phantom-routable helpers → L3 `<story>/` or `_frame/`
subdirs). `dock-layer-contexts.ts` already home. Full old→new manifest = PD-10 §8.

---

## §2 WAVES (DAG order per PD-6, strand-corrected)

Namespace **BI.W-S-\***. NOW-DELETE-CLASS lands immediately in a quiesced window (no B0..B8 dep);
MOVE-STAGE lands after `allDone(B0-CUT,B1-GEOMETRY,B2-GLASS,B3-DOCK,B4-PAGER,B5-VIZ,B6-STORY,
B7-MOTION,B8-FACTOR+PRUNES)` (by-name, never band-range), each carrying the W-WORKTREE-GC precond
(DP-G — record the edge; GC itself is user-approval-gated, owned by REPO-CLEANUP-PLAN). Acceptance is
**durable invariants only** — no new snapshot gate (gates-abrogation mandate). Common precond on all:
QUIESCE-TREE (clean-at-rest HEAD; do not land mid-B68-commit).

**Count:** 14 addenda-authored waves (5 NOW-DELETE + 9 MOVE-STAGE), + MS0 W-WORKTREE-GC cited as a
REPO-CLEANUP-owned preflight edge (not authored/executed here), + gate-triage handed to
gates-abrogation (DP-F). Wave-numbering cross-ref to PD-6's MS0–MS7 roster is in §5.6.

### NOW-DELETE-CLASS (quiesced, green-to-green, census-independent)

**BI.W-S-TYPES-DISSOLVE** (AD1)
- Scope: `mv src/types/html-attributes.d.ts → src/html-attributes.d.ts`; fix
  `scripts/fixtures/tsconfig.strict-fixture.json:9`; `rmdir src/types/`. A move-of-one-ambient.
- Repair: 0 import consumers (LOAD-BEARING ambient — checkUnknownProps data-*/aria-*); stays in
  tsconfig `include:["src/"]` (0 build edit); **0 gate citers** (PD-7). Edges: none.
- Acceptance: vue-tsc + build green (ambient still resolved). π: none (device-free).

**BI.W-S-API-DELETE** (AD2)
- Scope: `rm src/api/{index.ts,types-extra.ts}` + `rmdir`; drop the `@glass/api` arm of
  `tests/**/public-surface.spec.ts:4`; 3 prose edits (src/index.ts:12, constellation/README:185,
  paper-texture.vue:95); ATOMIC-drop `proof:api-lockstep` (.mjs+pkg+manifest, one commit) + repoint
  the api clause out of `proof:no-god-module`.
- Repair: 0 import consumers; `./api` ALREADY unpublished (85 keys, PD-1) → 0 export/cut-window
  dependency. **The other 27 contrived api gates → gates-abrogation** (DP-F), NOT here (the full
  api-referencing script set = **30 live @eafc0a69**: 1 test + 1 no-god-module clause + the coupled
  lockstep + 27 contrived; the bulk 27 abrogation-owned). The `/api` break asks (speedtest→/timeline,
  muster→/aurora) already ride `crossrepo-asks:bi`; the file delete adds no new ask. Edges: none.
- Acceptance: `proof:gate-script-parity` green (ATOMIC-DELETION) + build green. π: none.

**BI.W-S-UTILS-DEADDROP** (AD3 — the census-independent half of the utils dissolution)
- Scope: `rm src/utils/moveBefore.ts` + its sole consumer `rm tests/utils/moveBefore.test.ts`
  (dead-with-subject — the ONLY importer of `@glass/utils/moveBefore`); fold
  `platformSupport.supportsPostTask` → `src/composables/motion/usePrioritizedTask.ts` (its sole
  consumer), `rm src/utils/platformSupport.ts`; prune the dead moveBefore/platformSupport passthroughs
  from `src/utils/index.ts`. **cn/prng/coalesceMetric STAY** in utils/ (barrel still exports them) —
  the `rmdir` completes in MS2.
- Export-surface note (S2C3-H6/S2C2-minor, CORRECTED): `platformSupport.ts` exports **only**
  `supportsPostTask` (the `supportsScrollTimeline/supportsViewTimeline` symbols live in
  `composables/motion/supportsCssTimeline.ts`, well-consumed, UNTOUCHED — the "3 timeline symbols
  dropped" reading was overstated). AD3 removes from the root splat (`src/index.ts:343 export * from
  "./utils"`): `moveBeforeSafe` (utils/index.ts:2) + `supportsPostTask` (now an internal of
  usePrioritizedTask). `supportsMoveBefore` was deep-only (`@glass/utils/moveBefore`, test-reachable,
  not root-splatted) and dies with its test. These are ROOT-BARREL splat symbols, NOT subpath export
  keys → package.json exports/typesVersions (85 keys) UNAFFECTED, EXACT_REPRODUCTION holds; only
  root `index.d.ts` shrinks by {moveBeforeSafe, supportsMoveBefore, supportsPostTask}. Sanctioned
  under no-backwards-compat.
- Repair: moveBefore 0 runtime (both remaining src hits are barrel re-exports, PD-1); touches only
  composables/motion (non-volatile). `src/index.ts:343 export * from "./utils"` still resolves
  cn/prng/coalesceMetric. 4 `src/utils/*` gate citers repoint at MS2, not here. Edges: none.
- Acceptance: build + vue-tsc green (no dangling `@glass/utils/moveBefore`). π: none.

**BI.W-S-METRIC-PILL-DELETE** (AD4 — ★USER-FLAG #1, B8-gated by the clash it inverts)
- Scope: `rm src/components/ui/metric-pill/` + 2 re-exports (`src/index.ts:103`,
  `src/components/ui/index.ts:21`) + demo story + the metric-pill ref in `demo/stories/data/
  metrics.vue` + manifest rows; DROP the "+metric-pill STAY" arm from `proof:consumer-evidence-true`
  M1 (gate-repoint, atomic); FILE the speedtest ask-row (offer the mechanism).
- Repair: 0 live src consumers (only the dead ui/index.ts barrel orphan#3 +1 demo +1 smoke, PD-1);
  NOT a subpath (`grep metric-pill package.json → ∅`) → CUT-WINDOW/EXACT_REPRODUCTION unaffected;
  muster invariant-9 BANS it. **coalesceMetric-count (CORRECTED, S2C2-hit3):** MetricPill imports
  ONLY `type MetricValue` — it does NOT call the `coalesceMetric` function (its lone mention is a
  code-comment). So the `coalesceMetric` FUNCTION has **3** consumers (MetricCell/MetricRow/
  MetricBadge) — STABLE across this delete; the `MetricValue` TYPE has 4 consumers → **3** post-pill.
  The MS2 metric re-home reads this corrected count.
- Edges (HARD): **METRICS-DEMO(B8) landed ∧ W-AFFORDANCE-REDESIGN(B6) landed** — landing AFTER
  keeps green-to-green (M1's metric-SUBPATH KEEP-guard for cell/stack/badge is untouched; only the
  non-subpath pill arm drops). ★**FLAG-TO-USER #1:** AD4 inverts METRICS-DEMO's incidental pill KEEP
  (DP-A). If the user overrules DP-A, DROP AD4; the costed break rides a later ruling.
- Acceptance: build green + M1 green post-repoint. π: none (component removal, no live pixels).

**BI.W-S-DEMO-DELETE-CLASS** (PD-10 W-DELETE-CLASS)
- Scope: `rm demo/.DS_Store` + gitignore. One line; touches no in-flight dir. Edges: none.

### MOVE-STAGE (← allDone(B0..B8); each ← W-WORKTREE-GC executed; DP-G edge, user-gated)

**MS0 · W-WORKTREE-GC** [PREFLIGHT, USER-APPROVAL-GATED — edge only, NOT authored/executed here]
- Owner: REPO-CLEANUP-PLAN. harvest-3 (`wf_9252eaa6-1c8-5`, `wf_821d41f7-0eb-30`, `wf_9252eaa6-1c8-8`)
  ≺ prune-37. **Gates every MS below** — the on-disk lanes pin pre-move `ui/custom` paths a
  flatten orphans (PD-8 HIT-6). Edges the addenda CITES (does not execute): `QUIESCE-TREE →
  W-WORKTREE-GC` (LOCKED live-agent lanes + HELD bi-* quiesce first); inherit
  `W-WORKTREE-GC → .git-rewrite` (REWRITE-AFTER-GC). H8 ceiling RED@62 → GREEN post-prune. Re-enumerate
  `git worktree list` at MS0 (the 62→51 count drifts as B68 completes — §5.4).

**MS1 · BI.W-S-CENSUS-RECOMPUTE**
- Scope: FIRST move-stage wave; strip every hardcoded pre-repair count; recompute the family tree
  (~81 live), export set (~85 keys), subpaths (~69 live → post-prune) on the REPAIRED snapshot. Gates
  MS2+. All §1/§2 counts are recompute outputs, not acceptance constants.
- Edges: `allDone(B0..B8)`. No move → no GC edge (reads primary tree only).
- Acceptance: `proof:structure-census` soundness (a drifted count REDs). π: none.

**MS2 · BI.W-S-UTILS-DISSOLVE-COMPLETE** (DP-B: shared/ EXISTS, 3 members; completes AD3's utils
dissolution ATOMICALLY — the S2C2-hit1 strand fix)
- Scope: create `src/shared/`; `mv utils/cn.ts→shared/cn.ts`, `utils/prng.ts→shared/prng.ts`,
  `composables/context/→shared/context/`, **and `utils/coalesceMetric.ts→components/custom/
  metric-badge/coalesceMetric.ts`** (folded IN from the draft-MS3 so utils/ empties FULLY in one wave
  — see strand note); drop `src/index.ts:343 export * from "./utils"` → explicit
  `export {cn} from "./shared/cn"` + prng survivor re-export + `export {coalesceMetric, type
  MetricValue} from "./components/custom/metric-badge/coalesceMetric"`; `rmdir src/utils/` (now EMPTY —
  every file re-homed in THIS wave, no orphan barrel, no non-empty-rmdir failure).
- **Strand fix (S2C2-hit1):** the draft split cn/prng/context (MS2) from coalesceMetric (MS3) as
  siblings off MS1, then `rmdir`'d utils/ in MS2 while coalesceMetric.ts + index.ts still lived there
  → non-empty rmdir FAILS + a survivor re-export pointing into the just-removed dir. FIX: MS2 now
  re-homes ALL of utils/ (cn, prng, context, coalesceMetric) and rmdir's in one atomic wave; MS3 keeps
  only sortable. `rmdir` is the last utils-emptier, by construction.
- Repair (~194 files): the BH dropSegment codemod — src-relative-deep cn (12) + barrel-cn (~135) +
  demo-deep `@glass/utils/cn` (42) + 1 test = **~190 one-spec cn repoints** (54 deep total + barrel);
  **3 hand SPLITS** (MetricCell/MetricBadge/MetricRow each co-import `{cn, coalesceMetric, type
  MetricValue} from "../../../utils"` verbatim — split `{cn}`→`../../../shared/cn` from
  `{coalesceMetric, type MetricValue}`→`../metric-badge/coalesceMetric`, directly, no transient);
  the deep test **`tests/components/custom/metric-badge/zero-value.test.ts:6`** (`@glass/utils/
  coalesceMetric` → the metric-badge home — S2C2-hit3, previously unlisted); 2 dead demo imports
  DELETE (carousel.vue:25, layers.vue:7 — 0 call sites); 6 context families repoint; 4 `src/utils/*`
  gate citers repoint (PD-7). Re-pin HEAD at codemod time (demo files B68-volatile).
- New-edge note (S2C2-minor): re-homing coalesceMetric to metric-badge mints **2 new component→
  component edges** (metric-cell→metric-badge, metric-stack→metric-badge) beyond the §2a "only 3"
  floor — an intended consequence of the metric-cluster anchor (PD-2 §3), recorded not hidden.
- Edges: MS1, W-WORKTREE-GC, **AD4** (coalesceMetric re-home reads the post-pill count: function 3,
  MetricValue 3). De-dup: completes AD3 (one owner: AD3 dead-drops, MS2 re-homes + rmdir).
- Acceptance: build + `proof:barrel-purity` green; 0 `@glass/utils/*` specifiers survive; `src/utils/`
  gone. π: none.

**MS3 · BI.W-S-COMPOSABLE-COLOCATE** (sortable ONLY — coalesceMetric moved to MS2)
- Scope: **`src/composables/sortable/` (8 files) → `src/components/custom/sortable-list/`** (colocate;
  single owner; `sortable-list/index.ts:7` already re-exports `useSortableContext`). Source path
  CORRECTED (S2C3-H1): the folded composable lives at `src/composables/sortable/`, not
  `components/custom` — the draft's MS3 source tree was garbled. At MS3-time components are still
  ui/custom (flatten = MS4) → target is `custom/sortable-list/`.
- Edges: MS1, W-WORKTREE-GC. (AD4 edge removed — MS3 no longer touches coalesceMetric.)
- Acceptance: build green; 0 `@glass/composables/sortable` specifiers survive. π: none.

**MS4 · BI.W-S-FLATTEN-MOVE** (the terminal atomic move + the d.ts generator flip, PD-4)
- Scope: `components/{ui,custom}/<name>/ → components/<name>/` over the ~81-family set (dropSegment,
  elide-both-sides for moves); flatten the entry-map SOURCE FIRST (`subpath-policy.mjs` TIERS relBase
  + CURATED/name≠leaf: `components/ui|custom→components`); **flip `flatten-subpath-types.mjs`
  MOVER→GENERATOR** (~35 LOC, `probes/dts/generate-flat-dts.mjs`) so one `libraryEntryMap()` feeds
  vite JS + d.ts. NOTE (reconcile PD-4↔PD-2): composables do NOT flatten into shared/ (PD-2 keeps
  `composables/`); only `context` moved (MS2), `sortable` moved (MS3). `./color` etc. source stays
  `composables/<x>` — the generator's `emittedRel` is byte-identical regardless.
- Repair: **MANDATORY** flip — the mover's `flatten-subpath-types.mjs:29-33
  if(!existsSync(dist/subpaths)) exit 0` guard silently emits ZERO flat d.ts if forgotten (every
  `./<name>` `types` 404s, no build error, PD-4). Each MOVE carries its class-① dropSegment slice +
  the enumerated citer repoint list (PD-7). name≠leaf bare-file targets: blob-config→components/blob/
  config, fourier-math→components/fourier-field/math. `tsconfig.build.json` NO change (rootDir:src
  covers flat dirs — PD-4 Part B). REJECT F2 root-hoist (self-references at the dist layer, 75/79
  entries — PD-4).
- Edges: MS1, MS2, MS3, W-WORKTREE-GC. Reads POST-B8-prune tree (glass-panel/hover-popover/
  selectable-chip/toggle-chip/multi-select already `D`; pill via AD4; scrolling-text via
  SPEEDTEST-ONLY-PAIR). MOVES survivors only — never double-owns a B8 delete.
- Acceptance: EXACT_REPRODUCTION (exports+typesVersions unchanged); **flat `dist/<name>.d.ts` emits
  per entry** (the GENERATOR flip); `dist/components/**`+`dist/composables/**`+`dist/shared/**`
  covered by the existing `dist/**` glob; vue-tsc + consumer-typecheck exit 0; `proof:no-tier-literal`
  green. **NOTE (S2C2-minor):** the "no `dist/subpaths/`" assertion is NOT an MS4 acceptance — vite
  `libraryEntries` is not swapped until MS6, so `dist/subpaths/*.js` legitimately persists through MS4
  and is cleared in MS6. π: none (device-free, zero pixels — STRUCT-RESEQUENCE §π).

**MS5 · BI.W-S-ROOT-BARREL-DISSOLVE** (PD-9; the 10 curated `src/<name>.ts` barrels)
- Scope: dissolve 8 pure-passthrough barrels → repoint CURATED to the impl dir index (axes, dark,
  keyboard, sidebar, infinite-scroll, carousel, motion, motion-core); `mv src/tokens.ts →
  src/styles/tokens.ts` (JS projection of CSS tokens; stays `/tokens`); `rm` the 8 barrels; axes→
  `components/_shared/axes` (name≠leaf; impl already colocated per DP-C); infinite-scroll +1-line
  dir-index add. **forms.ts STAYS** (genuine aggregation, 12 ext consumers).
- ★**Residual flag (S2C1-HIT2):** `./axes` is retained as a PUBLISHED subpath despite **0 external
  consumers** (PD-9). The IMPL colocates to `_shared/axes` (satisfies ruling-4 "colocate"), but the
  dead public entry is KEPT for EXACT_REPRODUCTION — its cut-window removal is a costed later ruling,
  NOT this addenda. Recorded in §5.5, not silently dropped.
- Repair (~22-25 edits): ~9 deletes + 1 mv + ~10 CURATED map value edits + 1 dir-index add + **2
  HARD gate repoints (axes only: proof-api-lockstep AXES_BARREL:50/exportsStarFrom:132 +
  proof-encapsulation G6 FLAT_AXES:648)** + 2-3 soft subpath-string checks. `fileFidelity()` is
  map-driven (:331) → repointing a map value auto-updates the fidelity gate.
- Edges: MS4 (impl dirs moved), W-WORKTREE-GC. Collision-free with B68 (none of the 10 in the
  volatile set).
- Acceptance: EXACT_REPRODUCTION holds (every `/name` key stable — only the entry SOURCE moves);
  fail-closed classification green; no external subpath break. π: none.

**MS6 · BI.W-S-SUBPATHS-DISSOLVE** (F4-surgical)
- Scope: `rm src/subpaths/` (~67 remaining one-line mirror barrels after B8 retires); swap
  vite→`libraryEntryMap`; repoint EVERY `@glass/subpaths/*` importer (@glass=src, vite.config.ts:22).
  (The MOVER→GENERATOR flip landed in MS4; this wave removes the now-dead source dir + repoints all
  consumers + clears `dist/subpaths/`.)
- Repair — the FULL consumer set (S2C2-hit2 CORRECTED; the draft enumerated only the 5 demo imports
  and STRANDED the tests):
  - **5 demo** `@glass/subpaths/*` imports (repoint per-entry to the flat source).
  - **32 TEST import lines across 3 files** (measured @eafc0a69): `tests/public-surface.spec.ts`
    (**23** — this file IS the EXACT_REPRODUCTION / cut-window guard, so it MUST repoint or MS6
    strands the guard itself), `tests/components.smoke.spec.ts` (**8**),
    `tests/composables.smoke.spec.ts` (**1**). Each repoints per-entry to the flat source target
    (aurora→`@glass/components/aurora`, dom→`@glass/composables/dom`, …). No wave previously owned
    these; MS6 owns them. (±drift is B68/B8-volatile → MS1 recompute pins the final list.)
- Edges: MS4, MS5, W-WORKTREE-GC, **ALL B8 export-mutating waves** (BORDER-PROGRESS-RETIRE,
  SPEEDTEST-ONLY-PAIR, VIZ-DELETIONS; GLASS-DEDUP LANDED). **HARD:** `libraryEntryMap` regenerates
  exports/typesVersions — it must read the FINAL export set (85 − border-progress − scrolling-text −
  3 viz) or it RE-MINTS a retired subpath, breaking CUT-WINDOW + EXACT_REPRODUCTION. AMBER (see §5.1):
  `border-progress.ts` + `scrolling-text.ts` subpaths STILL PRESENT at eafc0a69 → MS6 HARD-BLOCKED
  until both B8 retires land.
- Acceptance: CUT-WINDOW absence (9 folded + 4 Tabs* + border-progress ABSENT); EXACT_REPRODUCTION;
  `differential resolves-on-disk`; **NO `dist/subpaths/*.js`** (the vite swap lands here); 0
  `@glass/subpaths/*` specifiers survive (src+demo+tests); build + `proof:consumers:static` green.
  π: none.

**MS7 · BI.W-S-CSS-COLOCATE** (M3 / Mechanism-B, PD-5)
- Scope: component-owned sheets COLOCATE to their component dir (DP-C); ownerless substrate stays
  thinned `src/styles/`. Realization = **copy-to-slot** (gather each sheet to `dist/styles/<name>.css`
  keeping the @import chain), NOT literal-inline — inlining dock.css's bytes mid-index.css drops its
  16 leading `@import "./dock/*"` (PD-5). dock CSS is greenfield-owned (STRUCT-RESEQUENCE D5) →
  B2 re-scopes to the ~39 non-dock gates.
- Repair: extend `read-css-monoliths.mjs CSS_MONOLITHS` with a component/slot field; repoint
  proof:dist-css DC3 / proof:components-css rungs / proof:theme probe on move. 163 `src/styles/*`
  substrate citers stay stable (DP-C keeps ONE root). Trap law: 0 real `:global(`/light-dark()-inset
  (Mechanism-B keeps plain .css, never SFC scoped blocks — structurally N/A).
- Edges: MS4, W-WORKTREE-GC. mechB dist === control dist proven 109/109 byte-identical (PD-5).
- Acceptance: the 6 §2f cascade couplings preserved (theme-after-tokens, menu-after-utilities,
  feedback-after-cards, glass-specular/refract-after-glass, segmented-tabs-drag adjacency, components
  layer); dock scoped-block-free (`proof:theme`). π: byte-stable CSS → paint-neutral (PD-5); the one
  paint-adjacent risk (SFC-block reorder) is `W-BLOCK-DISJOINT` + `proof:ba-gestalt` backstop.

**MS8 · BI.W-S-DEMO-TERMINAL** (PD-10 §7-8, M1-M8)
- Scope: `demo/configurator/ → demo/shell/configurator/` (M1; shell sole consumer, 0 story imports —
  the 7 story importers hit the LIBRARY atom `@glass/components/custom/configurator`, not the demo
  dir); 7 phantom-routable helpers → L3 subdirs (M2-M7: `data/timeline/`, `motion/scroll/`,
  `motion/curve-gallery/`, `substrates/fourier-field/`; `dock/_frame/DockStage.vue`,
  `substrates/_frame/VizStudio.vue` — glob-excluded at L3, no glob edit, no blank-render); SUFFUSE def
  → `chassis/hero/suffuse-preset.ts` (M8; presets.ts keeps WARM/BOLD/RIPPLE).
- Repair: 6 configurator gate repoints (config/font) + the small file-PATH-pin subset (most refs are
  path-invariant TAG/route/FOLDED_STORY_IDS). **manifest.ts NO MOVE** (hoist rejected — glob anchor +
  25 gate pins + BG.W-MANIFEST-COLOCATE); `dock-layer-contexts.ts` NO MOVE (already home). MESS-5 (5
  Demo* KINDs) NOT OWNED — RETIRED-BY-B68.
- Edges: `B6-STORY(#88) ∧ B8-PRUNES(#89)` close (don't race the live tree), gates-abrogation, GC.
- Acceptance: manifest≡disk bijection green (SHRINKS — fewer L2 phantom special-cases); no dead
  route. π: none (demo-internal).

**MS9 · BI.W-S-DIFFERENTIAL-CLOSE**
- Scope: born-RED differential over the ACTUAL post-repair cut HEAD. Edges: all MS.
- Acceptance: the RED→GREEN differential over the re-baselined tree IS the evidence. π: none.

**Handoff to gates-abrogation (DP-F, owner = REPO-CLEANUP-PLAN):** classes ②DIE-with-subject /
③COLLAPSE(404→40-60 + 27 api gates) / ④KEEP-invariant are abrogation-owned; each MOVE wave above
carries only its class-① dropSegment slice. The ONE sanctioned durable ADD is `proof:git-hygiene`
H10 no-orphan-subject (backstops ②). Mint NO other new gate.

---

## §3 SPEEDTEST-OVERFIT DISPOSITION (DP-A, RULED)

The overfit test is the **consumer census**, not the example list. metric-pill is the SOLE clean
OVERFIT-EXTRACT (delete-here + speedtest ask-row); everything else is SHARED-KEEP with evidence.

| component | verdict | evidence | owner |
|---|---|---|---|
| **metric-pill** | **DELETE** (in-repo, ask-row) | 0 consumers anywhere; muster invariant-9 BANS it; root-barrel-only, not a subpath | **BI.W-S-METRIC-PILL-DELETE (AD4)** |
| **metric-badge** (the user's NAMED "overfit" example) | **SHARED-KEEP (3 apps)** | speedtest×2, muster×2, sci-report×2 — the named example is the MOST shared | KEEP |
| metric-cell | SHARED-KEEP (2) | speedtest×2, muster TravelMatrix:27 | KEEP |
| metric-stack | SHARED-KEEP (2) | speedtest ResultStack:172, muster×2 | KEEP |
| instrument-chassis | SHARED-KEEP (2) | speedtest×4, muster×5 | KEEP |
| status-dot | SHARED-KEEP (3) | atlas×4, muster×6, slides×1 — ZERO speedtest | KEEP |
| data-table | KEEP (protected) | speedtest×3 live + atlas INBOUND-PENDING | KEEP |
| timeline / animated-digit | **SHARED-KEEP** (canonical-primitive sub-case) | speedtest sole-external but canonical general primitives — extraction on a single-consumer technicality strips a standard atom; disposition = DP-A SHARED-KEEP (S2C1-HIT3: "KEEP-canonical" was the same verdict under a friendlier label — aligned) | KEEP |
| border-progress | KEEP component / **RETIRE subpath** | demo-shell live + speedtest WV2 + atlas O-D2 pending; `/border-progress` un-published by B8 | component MS4, subpath BORDER-PROGRESS-RETIRE |
| completion-seal / color-swatch | KEEP-PENDING / CLEARED | seal 0-live BG-gated; swatch library-native config-chassis | KEEP |

**★ USER-FLAG #1 (prominent — inverts the user's named example):** the user named metric-badge as the
overfit to remove; the census says metric-badge is the MOST-shared component (3 apps) and only
metric-pill is a clean delete. AD4 executes DP-A option (A) — pill-only delete, SHARED-KEEP the rest.
If the user overrules, DROP AD4 (METRICS-DEMO's M1 stands) and the costed break (speedtest becomes a
UI lib, 4 apps break, foreign writes) rides a later ruling. The addenda builds on (A).

---

## §4 SUPERSESSION

**BH `spec-structure/STRUCTURE-TRANCHE-PLAN.md` S0-S6 (20-wave roster)** — the mechanism spine
survives; these ADDENDA carry the DP-ruled concretization BH left as open decisions (R1 d table):
| BH row | BH state | superseded by |
|---|---|---|
| S0 census recompute | `published(5.0.0)` precond | MS1 (`allDone(B0..B8)` precond, DP-E) |
| S1 flatten (generator swap + move + codemod) | Decision-2 KEPT the ui/custom split | MS4 (split DEAD, M1; +the mandatory MOVER→GENERATOR flip, PD-4) |
| S1 barrel un-mix | kept the tree | MS5 (8 curated barrels dissolve → dir index; forms stays, PD-9) |
| S2 CSS colocation | kept central registers | MS7 (Mechanism-B copy-to-slot; thinned substrate root, DP-C/PD-5) |
| S3 PROMOTE-CONTEXT | separate wave | FOLDED — context→shared/ in MS2 (DP-B); dock-greenfield owns dockContext |
| — utils | BH silent | AD3 (dead-drop) + MS2 (cn/prng/coalesceMetric re-home + rmdir, DP-B) — DISSOLVE, zero survivors |
| — types/api | BH relocated/folded | AD1 (move) / AD2 (delete) — TERMINALIZED |
| — subpaths §8-7 | BH KEPT | MS6 (F4-surgical dissolve; full test+demo consumer repoint) |
| XR-3 metric family | BH KEPT the family | DP-A: family SHARED-KEEP; metric-pill the sole delete (AD4) |
| S6 demo "done" | declared done | MS8 (configurator-fold + L3 hygiene + SUFFUSE, PD-10) |

**BI.W-STRUCTURE-RESEQUENCE (B9, `docs/tranches/BI/waves/`)** — re-baselined the 20→~13 roster but
did NOT author the DP specifics. These addenda ABSORB its move-stage roster and supersede these rows:
- `W-CENSUS-RECOMPUTE` → **MS1** (unchanged intent; edge pinned).
- `W-FLATTEN-PREP`/`W-FLATTEN-MOVE` → **MS4** (+ dts generator flip + name≠leaf + F2-reject, PD-4).
- `W-CSS-COLOCATE-B1/B2` → **MS7** (Mechanism-B named; B2 ~39 non-dock gates confirmed, D5).
- `W-PROMOTE-CONTEXT` (already DROPPED by D4) → context re-home lands in **MS2** (shared/), ratified.
- `W-DIFFERENTIAL-CLOSE` → **MS9**.
- Rows STAYING with STRUCTURE-RESEQUENCE (not addenda-owned): `W-PROOF-STRUCTURE`, `W-G9-HARVEST`,
  `W-PROMOTE-PRIMITIVES`, `W-FOLD-CENSUS`, `W-README-REMEDIATE`, `W-GUTS-RESIDUAL`, `W-BLOCK-DISJOINT`,
  the S5 sibling ASKs, S6 close. Mark the superseded rows; keep D1-D9's re-scopes as the frame.

The 5 NOW-DELETE waves (AD1-AD4 + demo) + MS2/MS3/MS5/MS6 are NET-NEW addenda specs with no BH/
STRUCTURE-RESEQUENCE predecessor row (the DP-A/B/C/D concretization). Gate-triage (PD-7) and
W-WORKTREE-GC (PD-8) are cited as REPO-CLEANUP-PLAN-owned, not re-authored (DP-F/DP-G).

---

## §5 OPEN (pass-3 confirmation lane — DRIFT RISK ONLY; no unresolved design)

1. **border-progress + scrolling-text subpaths NOT yet retired at eafc0a69** — `./border-progress`
   + `src/subpaths/border-progress.ts` + `scrolling-text.ts` still present (VERIFIED live);
   BORDER-PROGRESS-RETIRE + SPEEDTEST-ONLY-PAIR (B8) have not reached HEAD. **MS6 is HARD-BLOCKED
   until both land.** Re-verify both retired before pinning the MS6 ledger (PD-1 AMBER, PD-6 AMBER-2).
2. **B68 live-tree volatility** — demo/stories/manifest.ts, MIGRATION.md, the metric family,
   `data/metrics.vue`, `dock-layer-contexts.ts` are dirty/committing. Re-pin `git rev-parse HEAD` at
   AD4 + MS2 codemod time (the 42 demo-deep cn repoints + the 3 metric splits + the deep coalesceMetric
   test read B68-volatile files). AD4 waits on METRICS-DEMO ∧ AFFORDANCE-REDESIGN; MS8 waits on
   B6-STORY ∧ B8-PRUNES close.
3. **census recompute at MS1** — the ~81-family / ~85-key / ~69-subpath figures + the cn deep count
   (**54** at eafc0a69: 12 src-relative + 42 demo-alias `@glass/utils/cn` + 1 test; the draft's 54
   holds live, S2C3's 53 was a −1 B68 blip) + the api-script count (**30**) + the MS6 test-import list
   (**32** lines) are recompute OUTPUTS, not spec constants; re-derive on the post-repair snapshot (do
   not hardcode into acceptance).
4. **Worktree fleet churn** — the 62→51 count + the LOCKED live-agent lanes + HELD bi-p4b-* drift as
   B68 completes; re-enumerate `git worktree list` at MS0 preflight (H8 ceiling flips GREEN only
   post-prune).
5. **`./axes` dead-public-subpath residual (S2C1-HIT2)** — MS5 colocates the axes IMPL to
   `_shared/axes` but KEEPS the `./axes` public subpath despite 0 external consumers (PD-9), for
   EXACT_REPRODUCTION. Its cut-window removal is a costed LATER ruling, not this addenda — confirm the
   0-external-consumer census still holds at pass-3, then leave it published (no design change here).
6. **Wave-numbering cross-ref (S2C2-minor)** — PD-6's DAG numbers the move stage MS0–MS7; this ADDENDA
   inserts MS5 ROOT-BARREL-DISSOLVE and MS8 DEMO-TERMINAL, so it runs MS0–MS9. Map:
   PD-6 MS1=MS1, MS2=MS2 (+coalesceMetric folded in per the strand fix), MS3=MS3 (sortable-only),
   MS4=MS4, MS5(subpaths)=MS6, MS6(css)=MS7, MS7(differential)=MS9; ADDENDA MS5(root-barrel) +
   MS8(demo) are the two insertions. Pass-3 confirms the map, no design open.
7. **DP-A user-overrule hinge (USER-FLAG #1)** — if the user reverses DP-A (their named metric-badge
   example), DROP AD4 and re-home the metric-family break to a later ruling. The one design decision
   held open by user gate, not by evidence.
