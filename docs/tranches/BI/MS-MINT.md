# BI STRUCTURE-ADDENDA — MS WAVE-FILE MINT LIST

Two-consecutive-clean EARNED (registry-v3 §1). This is the exact mint list for the MOVE-STAGE band:
9 wave files, one per MS1-MS9, born-carrying the pass-3 amendments. The 5 NOW-DELETE waves (AD1-AD5)
already LANDED (f89e3a9d) — not minted here.

**Confirmation pin `f89e3a9d`.** MS1 recomputes all census figures on the actual execution HEAD.

**Naming:** files mint under the task-mandated `docs/tranches/BI/waves/BI.W-MS*.md`; each realizes the
ADDENDA §2 `BI.W-S-*` canonical label 1:1 (recorded per entry). PD-6↔ADDENDA map (R6, CONFIRMED):
PD-6 MS1-4 = MS1-4 · PD-6 MS5(subpaths)=MS6 · PD-6 MS6(css)=MS7 · PD-6 MS7(diff)=MS9 · ADDENDA
MS5(root-barrel)+MS8(demo) = the 2 insertions.

**GLOBAL PRECOND on all 9 (edge, do NOT author/execute here):**
- **MS0 · W-WORKTREE-GC** [USER-APPROVAL-GATED, REPO-CLEANUP-PLAN-owned] — 62 worktrees → ~51 prune;
  `QUIESCE-TREE → W-WORKTREE-GC → .git-rewrite` (REWRITE-AFTER-GC). Gates every MS below. Re-enumerate
  `git worktree list` at MS0 preflight. **Every MS1-MS9 carries the `← W-WORKTREE-GC` edge; the whole
  band is USER-GATED on it.** H8 ceiling RED@62 → GREEN post-prune.
- Common precond: `QUIESCE-TREE` (clean-at-rest HEAD; never land mid-B68/B-band commit) +
  `allDone(B0-CUT,B1-GEOMETRY,B2-GLASS,B3-DOCK,B4-PAGER,B5-VIZ,B6-STORY,B7-MOTION,B8-FACTOR+PRUNES)`
  by-name. Acceptance = durable invariants only (gates-abrogation mandate; no new snapshot gate).

---

## MS1 · `BI.W-MS1-CENSUS-RECOMPUTE.md`  (≡ ADDENDA BI.W-S-CENSUS-RECOMPUTE)
- **Spec:** First move-stage wave. Strip every hardcoded pre-repair count from the addenda acceptance
  surface and RECOMPUTE on the repaired snapshot: component families, export keys, `src/subpaths/`
  files, cn-deep specifiers, live-api imports, `@glass/subpaths/*` test lines, composables-published
  ratio. Confirmation baselines to reproduce/update at execution HEAD: **79 families / 82 keys / 67
  subpaths / 52 cn-deep / 0 live-api / 32 test-lines / 7-of-11 composables published**. Gates MS2+;
  every downstream count is an MS1 output, not a wave constant.
- **Born-RED gate:** `proof:structure-census` soundness (a drifted/hardcoded count REDs).
- **Edge:** `allDone(B0..B8)`; ← W-WORKTREE-GC (reads primary tree only, no move → no GC-rewrite dep).
- **π:** none (device-free).

## MS2 · `BI.W-MS2-UTILS-DISSOLVE-COMPLETE.md`  (≡ ADDENDA BI.W-S-UTILS-DISSOLVE-COMPLETE)
- **Spec:** Create `src/shared/`; re-home ALL of `src/utils/` ATOMICALLY in one wave —
  `cn.ts→shared/cn.ts`, `prng.ts→shared/prng.ts`, `composables/context/→shared/context/`, and
  `coalesceMetric.ts→components/custom/metric-badge/coalesceMetric.ts` (folded in so utils/ empties
  fully); drop `src/index.ts:343 export * from "./utils"` → explicit `{cn} from ./shared/cn` + prng
  re-export + `{coalesceMetric, type MetricValue} from ./components/custom/metric-badge/coalesceMetric`;
  `rmdir src/utils/` LAST (now empty — no non-empty-rmdir, no survivor-into-removed-dir). Codemod:
  ~190 one-spec cn repoints (54 deep + barrel), **3 hand splits** (MetricRow/MetricBadge/MetricCell:4
  each split `{cn}` from `{coalesceMetric, type MetricValue}`), the deep test **`zero-value.test.ts`
  (line :5 at f89e3a9d, was :6 — B68 −1 shift; specifier `@glass/utils/coalesceMetric`)**, delete 2
  dead demo cn imports (carousel.vue:25, layers.vue:7), 6 context repoints, 4 `src/utils/*` gate
  citers. Re-pin HEAD at codemod time (demo files volatile). Mints 2 intended component→component
  edges (metric-cell/-stack → metric-badge). *Cosmetic cleanup slice option: prune the vestigial
  `subpath-policy.mjs:65` metric-pill UI_CLASS row (regen stale=1, tolerated).*
- **Born-RED gate:** `proof:barrel-purity` — 0 `@glass/utils/*` specifiers survive; `src/utils/` gone.
- **Edge:** MS1, AD4 (reads post-pill count: FUNCTION 3 / MetricValue 3); ← W-WORKTREE-GC.
- **π:** none.

## MS3 · `BI.W-MS3-SORTABLE-COLOCATE.md`  (≡ ADDENDA BI.W-S-COMPOSABLE-COLOCATE)
- **Spec:** Move `src/composables/sortable/` (8 files: dragController, dropResolver, ghostRenderer,
  index, touchGate, transitionTiming, types, useSortable) → `src/components/custom/sortable-list/`
  (single owner; `sortable-list/index.ts:7` already re-exports `useSortableContext`). At MS3-time
  components are still ui/custom (flatten is MS4) → target `custom/sortable-list/`. sortable ONLY —
  coalesceMetric moved in MS2.
- **Born-RED gate:** build + 0 `@glass/composables/sortable` specifiers survive.
- **Edge:** MS1; ← W-WORKTREE-GC.
- **π:** none.

## MS4 · `BI.W-MS4-FLATTEN-MOVE.md`  (≡ ADDENDA BI.W-S-FLATTEN-MOVE) — **AMENDED (P3T2)**
- **Spec:** The terminal atomic flatten + the d.ts generator flip. `components/{ui,custom}/<name>/ →
  components/<name>/` over the ~79-family set (dropSegment, elide both sides). Flatten the entry-map
  SOURCE FIRST (`subpath-policy.mjs` TIERS relBase + CURATED/name≠leaf: `components/ui|custom →
  components`; **line-refs @f89e3a9d: `libraryEntryMap`:280, `CURATED`:135** — were :273/:129-150).
  **Flip `flatten-subpath-types.mjs` MOVER→GENERATOR** (~35 LOC; the `:29 if(!existsSync(dist/subpaths))
  exit 0` guard silently emits ZERO flat d.ts if forgotten — MANDATORY). name≠leaf targets:
  blob-config→components/blob/config, fourier-math→components/fourier-field/math. `tsconfig.build.json`
  NO change. REJECT F2 root-hoist (dist self-references). **★AMENDMENT (P3T2 MS4 enumeration):** the
  codemod scope MUST explicitly enumerate — beyond the generic dropSegment slice — (i) the **62
  `src/subpaths/*` mirror-barrel internal `../components/ui|custom/<name>` imports** (they are LIVE
  vite entries via `libraryEntries()` until MS6, so the flatten breaks them AT MS4, not MS6); (ii) the
  **4 `_shared` gate paths** `proof-encapsulation:644 (AXES) /645 (SURFACE_AXIS) /1076 (CONTROL_SIZE)
  /1276 (MOTION_AXIS_LEAF)` **+ `proof-variant-residual:45`** that hardcode `resolve(SRC,
  "components/ui/_shared/*")`.
- **Born-RED gate:** EXACT_REPRODUCTION (exports+typesVersions unchanged, **baseline 82 keys** — was
  85); flat `dist/<name>.d.ts` emits per entry (the GENERATOR flip); vue-tsc + consumer-typecheck
  exit 0; `proof:no-tier-literal` green. NOTE: `dist/subpaths/*.js` legitimately persists through MS4
  (vite swap is MS6) — NOT an MS4 assertion.
- **Edge:** MS1, MS2, MS3; ← W-WORKTREE-GC. Reads post-B8-prune tree (moves survivors only).
- **π:** none (device-free, zero pixels — STRUCT-RESEQUENCE §π).

## MS5 · `BI.W-MS5-ROOT-BARREL-DISSOLVE.md`  (≡ ADDENDA BI.W-S-ROOT-BARREL-DISSOLVE) — **AMENDED (P3C2/P3T2)**
- **Spec:** Dissolve the 8 pure-passthrough `src/<name>.ts` barrels → repoint CURATED to the impl dir
  index (axes, dark, keyboard, sidebar, infinite-scroll, carousel, motion, motion-core); `mv
  src/tokens.ts → src/styles/tokens.ts` (stays `/tokens`); `rm` the 8 barrels; axes →
  `components/_shared/axes` (name≠leaf); infinite-scroll +1-line dir-index add. **forms.ts STAYS**
  (genuine aggregation). **★AMENDMENT (api-lockstep VOID):** MS5 is **1 HARD gate repoint** —
  `proof-encapsulation G6 FLAT_AXES:648` `resolve(SRC,"axes.ts") → resolve(SRC,
  "components/_shared/axes.ts")` (flows to :850/:851). The addenda's "proof-api-lockstep AXES_BARREL:50
  / exportsStarFrom:132" sub-clause is STRUCK — AD2 atomic-deleted `scripts/proof-api-lockstep.mjs`
  (58ddaf21); note "the axes-barrel assertion retired with AD2; no successor gate re-asserts it."
  **`./axes` stays PUBLISHED** despite 0 external consumers (EXACT_REPRODUCTION; cut-window removal is
  a later ruling).
- **Born-RED gate:** EXACT_REPRODUCTION holds (every `/name` key stable — only entry SOURCE moves);
  fail-closed classification green; no external subpath break.
- **Edge:** MS4 (impl dirs moved); ← W-WORKTREE-GC. Collision-free with B-band.
- **π:** none.

## MS6 · `BI.W-MS6-SUBPATHS-DISSOLVE.md`  (≡ ADDENDA BI.W-S-SUBPATHS-DISSOLVE) — **AMBER→GREEN**
- **Spec:** `rm src/subpaths/` (~67 mirror barrels); swap vite→`libraryEntryMap`; repoint EVERY
  `@glass/subpaths/*` importer (@glass=src, vite.config.ts:22) BEFORE the rm (AY-REPOINT-FIRST). FULL
  consumer set: **5 demo** imports + **32 TEST lines / 3 files** — `public-surface.spec.ts` (**23**,
  the EXACT_REPRODUCTION guard, MUST repoint or MS6 strands its own guard), `components.smoke.spec.ts`
  (**8**), `composables.smoke.spec.ts` (**1**). Each repoints per-entry to the flat source
  (aurora→`@glass/components/aurora`, dom→`@glass/composables/dom`, …). `libraryEntryMap` regenerates
  exports/typesVersions — **it MUST read the FINAL 82-key set** (not 85; border-progress +
  scrolling-text + virtual already retired at f89e3a9d — **the MS6 HARD-BLOCK is CLEARED**) or it
  re-mints a retired subpath.
- **Born-RED gate:** CUT-WINDOW absence (9 folded + 4 Tabs* + border-progress/scrolling-text ABSENT);
  EXACT_REPRODUCTION; `differential resolves-on-disk`; NO `dist/subpaths/*.js`; 0 `@glass/subpaths/*`
  specifiers survive (src+demo+tests); build + `proof:consumers:static` green.
- **Edge:** MS4, MS5, ALL B8 export-mutating waves (BORDER-PROGRESS-RETIRE, SPEEDTEST-ONLY-PAIR,
  VIZ-DELETIONS — all LANDED @f89e3a9d); ← W-WORKTREE-GC.
- **π:** none.

## MS7 · `BI.W-MS7-CSS-COLOCATE.md`  (≡ ADDENDA BI.W-S-CSS-COLOCATE / Mechanism-B, PD-5)
- **Spec:** Component-owned sheets colocate to their component dir; ownerless substrate stays thinned
  `src/styles/`. Realization = **copy-to-slot** (gather each sheet to `dist/styles/<name>.css` keeping
  the @import chain), NOT literal-inline (inlining drops dock.css's 16 leading `@import "./dock/*"`).
  dock CSS is greenfield-owned (STRUCT-RESEQUENCE D5) → B2 re-scopes to the ~39 non-dock gates. Extend
  `read-css-monoliths.mjs CSS_MONOLITHS` with a component/slot field; repoint proof:dist-css DC3 /
  proof:components-css rungs / proof:theme probe on move. 163 `src/styles/*` substrate citers stay
  stable (one root).
- **Born-RED gate:** the 6 cascade couplings preserved (theme-after-tokens, menu-after-utilities,
  feedback-after-cards, glass-specular/refract-after-glass, segmented-tabs-drag adjacency, components
  layer); dock scoped-block-free (`proof:theme`).
- **Edge:** MS4; ← W-WORKTREE-GC. mechB dist === control dist proven 109/109 byte-identical.
- **π:** byte-stable CSS → paint-neutral; the one SFC-block-reorder risk backstopped by
  `W-BLOCK-DISJOINT` + `proof:ba-gestalt`.

## MS8 · `BI.W-MS8-DEMO-TERMINAL.md`  (≡ ADDENDA BI.W-S-DEMO-TERMINAL, PD-10)
- **Spec:** `demo/configurator/ → demo/shell/configurator/` (shell sole consumer; the 7 story
  importers hit the LIBRARY atom, not the demo dir); 7 phantom-routable helpers → L3 subdirs
  (`data/timeline/`, `motion/scroll/`, `motion/curve-gallery/`, `substrates/fourier-field/`;
  `dock/_frame/DockStage.vue`, `substrates/_frame/VizStudio.vue` glob-excluded); SUFFUSE def →
  `chassis/hero/suffuse-preset.ts` (presets.ts keeps WARM/BOLD/RIPPLE). 6 configurator gate repoints.
  **`manifest.ts` NO MOVE** (hoist rejected — glob anchor + 25 gate pins). `dock-layer-contexts.ts` NO
  MOVE (already home). MESS-5 RETIRED-BY-B68.
- **Born-RED gate:** manifest≡disk bijection green (SHRINKS — fewer L2 phantom special-cases); no dead
  route.
- **Edge:** `B6-STORY(#88) ∧ B8-PRUNES(#89)` close (both LANDED @f89e3a9d); gates-abrogation;
  ← W-WORKTREE-GC.
- **π:** none (demo-internal).

## MS9 · `BI.W-MS9-DIFFERENTIAL-CLOSE.md`  (≡ ADDENDA BI.W-S-DIFFERENTIAL-CLOSE)
- **Spec:** Born-RED differential over the ACTUAL post-repair cut HEAD; the RED→GREEN differential over
  the re-baselined tree IS the evidence.
- **Born-RED gate:** the differential itself (born-RED over post-repair HEAD).
- **Edge:** ALL MS (MS1-MS8); ← W-WORKTREE-GC.
- **π:** none.

---

## HANDOFF (unchanged, DP-F — REPO-CLEANUP-PLAN owns)
Gate classes ②DIE-with-subject / ③COLLAPSE(404 + 27 api gates) / ④KEEP-invariant → gates-abrogation;
each MOVE wave above carries only its class-① dropSegment slice (MS4's now explicitly enumerated per
the P3T2 amendment). The ONE sanctioned durable ADD is `proof:git-hygiene` H10 no-orphan-subject.
Mint NO other new gate.

## MINT PRECONDITIONS (registry-v3 §5)
1. Mint the 9 wave-FILES now (spec-ready); **HOLD execution on the W-WORKTREE-GC user gate** — the
   entire MS1-MS9 band is user-gated.
2. MS4 + MS5 wave files are born WITH the P3T2/P3C2 amendments (enumeration; api-lockstep strike).
3. MS1 re-pins the §3 census on the actual execution HEAD (82/79/67/52/0/32/7-11 are the confirmation
   baseline, not the mint constant).
