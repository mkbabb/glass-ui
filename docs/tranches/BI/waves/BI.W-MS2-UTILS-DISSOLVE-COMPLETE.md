# BI.W-MS2-UTILS-DISSOLVE-COMPLETE — re-home all of src/utils/ atomically, then rmdir

Band B9 MOVE-STAGE, wave MS2. Realizes ADDENDA §2 `BI.W-S-UTILS-DISSOLVE-COMPLETE` 1:1. Completes AD3's
utils dissolution in one atomic wave (the S2C2-hit1 strand fix). Device-free (`H`), paint-neutral.

## §Provenance

- STRUCTURE-ADDENDA §2 MOVE-STAGE `MS2 · BI.W-S-UTILS-DISSOLVE-COMPLETE` (DP-B: `shared/` EXISTS, 3
  members) + §4 supersession row (utils DISSOLVE, zero survivors).
- Pass-3 convergence: registry-v3 §1 (S2C2 fold-fix `MS2 atomic rmdir` re-checked STILL CLOSED, P3T1
  ZERO reversals) + §3 (coalesceMetric FUNCTION=3 STABLE, MetricValue TYPE=3) + §4.B (line-ref
  `zero-value.test.ts :6 → :5`). One-owner de-dup: AD3 dead-drops; MS2 re-homes + rmdir.

## §Scope

Create `src/shared/`; re-home ALL of `src/utils/` ATOMICALLY:
- `cn.ts → shared/cn.ts`,
- `prng.ts → shared/prng.ts`,
- `composables/context/ → shared/context/`,
- `coalesceMetric.ts → components/custom/metric-badge/coalesceMetric.ts` (folded IN so utils/ empties
  FULLY in one wave — no survivor into a removed dir, no non-empty-rmdir failure).

Drop `src/index.ts:343 export * from "./utils"` → explicit `export {cn} from "./shared/cn"` + the prng
survivor re-export + `export {coalesceMetric, type MetricValue} from "./components/custom/metric-badge/
coalesceMetric"`. `rmdir src/utils/` LAST — empty by construction (rmdir is the last utils-emptier).

**Strand fix (S2C2-hit1):** the draft split cn/prng/context (MS2) from coalesceMetric (MS3) then rmdir'd
utils/ while coalesceMetric.ts + index.ts still lived there. FIXED: MS2 re-homes ALL of utils/ and
rmdir's in one wave; MS3 keeps only sortable.

## §Repair manifest

~194 files — the BH dropSegment codemod:
- **~190 one-spec cn repoints** — src-relative-deep cn (12) + barrel-cn (~135) + demo-deep
  `@glass/utils/cn` (42) + 1 test (54 deep total + barrel). All `→ shared/cn`.
- **3 hand SPLITS** — MetricCell / MetricBadge / MetricRow each co-import `{cn, coalesceMetric, type
  MetricValue} from "../../../utils"` verbatim; split `{cn} → "../../../shared/cn"` from
  `{coalesceMetric, type MetricValue} → "../metric-badge/coalesceMetric"`, directly, no transient.
- **deep test** `tests/components/custom/metric-badge/zero-value.test.ts` — specifier
  `@glass/utils/coalesceMetric → the metric-badge home. **Line `:5` at f89e3a9d** (was `:6`; B68 −1
  shift — re-locate by symbol at codemod time).
- **2 dead demo imports DELETE** — carousel.vue:25, layers.vue:7 (0 call sites).
- **6 context family repoints**.
- **4 `src/utils/*` gate citers repoint** (PD-7).
- Re-pin `git rev-parse HEAD` at codemod time — the 42 demo-deep cn repoints + the 3 metric splits + the
  deep coalesceMetric test read B68-volatile files.
- Mints 2 intended component→component edges (metric-cell → metric-badge, metric-stack → metric-badge)
  beyond the §2a "only 3" floor — the metric-cluster anchor (PD-2 §3), recorded not hidden.
- *Cosmetic cleanup slice (optional, tolerated):* prune the vestigial `subpath-policy.mjs:65` metric-pill
  `UI_CLASS` row (regen reports `stale=1`, NOT a hard error; metric-pill was never a subpath key). May
  ride this wave or an abrogation slice.
- AD4 overrule note (R7): AD4 already LANDED (f89e3a9d); overruling DP-A means RE-ADD metric-pill (a
  forward action), not a held-wave drop. The post-pill count MS2 reads (function 3, MetricValue 3) stands
  unless that forward RE-ADD happens.

## §Acceptance

Durable invariants:
- `proof:barrel-purity` — 0 `@glass/utils/*` specifiers survive (src + demo + tests).
- `src/utils/` gone.
- build green.

## §Edges

- `← W-WORKTREE-GC completion` (MS0, user-gated).
- MS1 (reads the recomputed cn-deep count).
- AD4 (reads the post-pill count: coalesceMetric FUNCTION 3 / MetricValue TYPE 3).
- QUIESCE-TREE.

## §π

None.
