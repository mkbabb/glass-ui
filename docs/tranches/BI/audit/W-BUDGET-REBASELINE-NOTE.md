# BI.W-BUDGET-REBASELINE — the anti-phantom ceiling trail

`profile:budget --enforce` (`scripts/profile-bundle.mjs`, tagged `local/ci/release`) is
the standing bundle-weight floor. This note records every lifted ceiling + its
**capability** rationale (never a leak, never a phantom "will-shrink-later"), and the
**INTERIM** status + the **B10 re-run obligation** the planner cross-band-flagged.

## Status: INTERIM PIN (B0-adjacent). The FINAL pin is a B10 re-run.

The pin here is against the **post-blob-rename, PRE-B5-viz-deletion, PRE-B3-dock-drain**
tree. `profile:budget --enforce` is GREEN at this tree (exit 0, every chunk under its
ceiling, D5 drift baseline self-consistent). But this is NOT the cut baseline — three
deferred chunk-set changes will re-open the pin (see §B10 re-run obligation).

## Adjudication — every over-ceiling / over-drift chunk (leak vs capability)

| chunk | HEAD state | verdict | action |
|---|---|---|---|
| `dist/blob.js` | raw 103_906 / gzip 36_095; over the old goo-blob ceiling (122% raw / 129% gzip) | **CAPABILITY** | ceiling lift (BUDGETS) — see §1 |
| `dist/goo-blob.js` | MISSING (renamed → blob) | rename | BUDGETS key re-point + D5 baseline drop |
| `dist/aurora.js` | raw 199_917 / gzip 63_527 (96.1% / 96.3%) | PASS | none — the ceiling was already lifted to gzip 66_000 at BG.W-AUR-IMAGE-SOURCE (the 12th lift); the spec's cited "50 KB ceiling" is STALE prose |
| `dist/paper-grid.js` | MISSING in D5 (renamed → liquid-grid) | rename | D5 baseline drop + `liquid-grid.js` (gzip 10_214) adopt |
| `dist/api.js` | MISSING in D5 (/api retired at BH) | retire | D5 baseline drop |
| `dist/concentric.js` | D5 drift +19.6% | CAPABILITY (viz), **B5-transient** | interim D5 absorb — DELETED in B5, so B10 re-pin drops it |
| `dist/completion-seal.js` | D5 drift +12.7% (+153 B) | CAPABILITY (minor component growth) | interim D5 absorb |
| `dist/dot-flow-field.js` | D5 drift −52.6% (BG.W-DOTFLOW-REBUILD shrank it) | shrink, **B5-transient** | interim D5 absorb — DELETED in B5 |
| `dist/dot-matrix.js` | D5 drift +1.9% (under ceiling), **B5-transient** | PASS | interim D5 absorb — DELETED in B5 |
| `dist/axes.js` | NEW (gzip 225) | new subpath | D5 baseline adopt |
| `dist/constellation.js` / `dist/fourier-field.js` | 92–97% of ceiling | PASS | none |

No chunk is a **leak**. The B3 critical-path-weight arm is GREEN (W1 SOURCE: root-barrel
heavy-leaf reach `none`; W1 DIST: `dist/glass-ui.js` heavy hits `0`) — the root-barrel
eager graph reaches none of {WebGL substrate, GL shader strings, value.js color-math}.

## §1 — The 13th lift: `dist/goo-blob.js` → `dist/blob.js` (key rename + ceiling lift)

BI.W-BLOB-RENAME-LAND renamed the metaball subpath goo-blob→blob (clean break, no alias),
so the emitted entry chunk is now `dist/blob.js`; the old `dist/goo-blob.js` BUDGETS key
pointed at a vanished chunk (MISSING → fail-closed). The key is re-pointed.

The ceiling is **LIFTED** — the blob chunk carries the DUAL-BACKEND metaball capability,
not a leak:

- `metaball.wgsl.ts` (25.9 KB) — the WebGPU-first WGSL primary.
- `metaball.frag.ts` (30.2 KB) — the WebGL2 fallback (the GL-shader fence: the two are the
  dual-port cost, not bloat).
- `metaball-noise.wgsl.ts` / `metaball-palette.wgsl.ts` / `sdf-body.glsl.ts` /
  `watercolor-edges.glsl.ts` / `oklch-perturb.glsl.ts` / `metaball-uniforms.glsl.ts` — the
  shared shader chunks (1622 shader lines total) + the BG blob-config / BLOB-SEAMS growth.

**Single-sourced** — the `smoothK`/metaball body appears in NO other chunk (verified: only
`dist/blob.js` matches `smoothK`/`uSmoothK`). **value.js + keyframes stay EXTERNAL peers**
(0 bundled into blob.js). A shipped capability, not a leak.

| | old (`goo-blob`) ceiling | measured (`blob`) | new ceiling | headroom |
|---|---|---|---|---|
| raw  | 85_000  | 103_906 | 115_000 | 10.7% |
| gzip | 28_000  | 36_095  | 40_000  | 10.8% |

The ~10% close headroom matches the aurora/CSS rebase convention. An overrun still HALTS
(the W4 §3a field-bake-hoist triumvirate). The lineage (BB.W-PAYLOAD-DEFER goo-blob rows,
BB.W-GOOBLOB-WGPU) is preserved as provenance in the `scripts/profile-bundle.mjs` comment
trail.

## B10 re-run obligation (the FINAL pin)

This interim pin will RE-OPEN when the following LATER waves land — the B10 close MUST
re-run `node scripts/profile-bundle.mjs --enforce --rebaseline` against the settled tree:

1. **B5 D-VIZ deletions** — `concentric` / `dot-flow-field` / `dot-matrix` chunks are
   dropped. Their D5 baseline entries then become MISSING (a published-subpath-vanished
   FAIL); the B10 re-baseline drops them.
2. **B3 dock drains** — the dock chunk weight changes; re-measure at B10.
3. **BLOB package.json `./blob` export completion** — package.json exports still names
   `./goo-blob` (BLOB-RENAME-LAND has renamed the src dirs + subpath barrel in the working
   tree but not yet completed the package.json export re-point), so `dist/blob.js` is
   currently classified **`shared`** in the D5 subpathTable (not `entry`) and is therefore
   budget-gated (via the BUDGETS disk-scan key, GREEN) but NOT drift-gated. Once BLOB
   completes the `./blob` export, blob.js re-classes shared→entry and the B10 re-baseline
   captures it as a drift-gated entry.

**Cut-precondition (H-9 discharge):** at B10, `profile:budget --enforce` GREEN in
`--run full` with every ceiling either MET or lifted-with-recorded-rationale, against the
final (post-B5, post-B3, post-BLOB-export) tree.

## Evidence (born-RED → GREEN)

- Born-RED at HEAD: `[FAIL] dist/goo-blob.js — raw 103970 / 85000 (122.3%); gzip 36084 /
  28000 (128.9%)` → `enforce exit 1`.
- After key-rename + capability lift: all six BUDGETS chunks PASS, D5 drift clean →
  `enforce exit 0`.
- Self-test bite: a synthetic blob gzip ceiling of 35_000 (< the measured 36_087) reds —
  `[FAIL] dist/blob.js gzip 36087 / 35000 (103.1%)` → `enforce exit 1`; restored to
  40_000 → `enforce exit 0` (the native enforce contract bites an over-ceiling chunk).
