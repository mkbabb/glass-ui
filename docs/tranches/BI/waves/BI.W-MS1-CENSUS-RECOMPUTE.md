# BI.W-MS1-CENSUS-RECOMPUTE — recompute every structure census figure on the repaired snapshot

Band B9 MOVE-STAGE, wave MS1. Realizes ADDENDA §2 `BI.W-S-CENSUS-RECOMPUTE` 1:1. Device-free (`H`),
paint-neutral. The FIRST move-stage wave; gates MS2+.

## §Provenance

- STRUCTURE-ADDENDA §2 MOVE-STAGE `MS1 · BI.W-S-CENSUS-RECOMPUTE` (docs/tranches/BI/STRUCTURE-ADDENDA.md).
- Pass-3 convergence: registry-v3 §3 (SETTLED CENSUS — the MS1 re-pin baselines) + §5.4. Two-consecutive-
  clean EARNED (registry-v3 §1); MINT AUTHORIZED, execution held on the W-WORKTREE-GC user gate.
- The §3 baselines are recompute OUTPUTS at the confirmation pin `f89e3a9d`, **not spec constants**.
  MS1 re-derives every figure on the ACTUAL execution HEAD and hardcodes NOTHING.

## §Scope

Strip every hardcoded pre-repair count from the addenda acceptance surface and RECOMPUTE on the
repaired snapshot. The recomputed figures:
- component families (flat, `components/{ui,custom}/<name>` count),
- export keys (package.json exports / typesVersions),
- `src/subpaths/` files,
- cn deep specifiers,
- live-api imports (src),
- `@glass/subpaths/*` test lines,
- composables-published ratio.

Every downstream count (MS2's cn-repoint total, MS4's family set + key baseline, MS6's test-import list)
is an MS1 OUTPUT, not a wave constant. §1/§2 of the ADDENDA hardcode nothing; this wave supplies them.

## §Repair manifest

- Recompute on the post-repair, post-B8, post-GC cut snapshot at execution HEAD.
- CONFIRMATION BASELINE (registry-v3 §3, @f89e3a9d — reproduce/update, do NOT hardcode into acceptance):

  | figure | confirmation baseline @f89e3a9d |
  |---|---|
  | export keys | 82 (`./border-progress` `./scrolling-text` `./virtual` retired by B8) |
  | component families | 79 (38 ui + 41 custom) |
  | `src/subpaths/` files | 67 (flat, 0 subdirs) |
  | cn deep specifiers | 52 (10 src + 41 demo `@glass/utils/cn` + 1 test) |
  | live api imports (src) | 0 (src/api GONE) |
  | `@glass/subpaths/*` test lines | 32 (public-surface 23 + comp.smoke 8 + composables.smoke 1) |
  | composables published | 7/11 (PUBLISH 3: color/dom/reactive + CURATED 4: dark/keyboard/motion/sidebar; virtual→INTERNAL) |

- The 7-of-11 composables-published ratio is the USER-FLAG #2 impossibility figure (8 published entries
  cannot colocate into a consumer without deleting the public surface; virtual→INTERNAL dropped it to
  7/11). It is a recompute output like the rest.

## §Acceptance

Durable invariant: **no structure acceptance surface hardcodes a pre-repair count** — every figure
derives from the MS1 recompute on the repaired snapshot. `proof:structure-census` soundness is born-RED
against a drifted/hardcoded count (a re-inserted stale figure REDs).

## §Edges

- `← W-WORKTREE-GC completion` (MS0, USER-APPROVAL-GATED, REPO-CLEANUP-PLAN-owned) — reads the primary
  tree only, no move → no GC-rewrite dependency, but the whole MOVE-band is user-gated on it.
- `allDone(B0-CUT, B1-GEOMETRY, B2-GLASS, B3-DOCK, B4-PAGER, B5-VIZ, B6-STORY, B7-MOTION, B8-FACTOR+PRUNES)`
  by-name (never a band-range).
- QUIESCE-TREE (clean-at-rest HEAD).

## §π

None (device-free).
