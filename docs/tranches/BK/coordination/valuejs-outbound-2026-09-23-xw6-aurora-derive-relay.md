SERVED MODEL: claude-fable-5-1

# O-53 — X-W6 (value.js) · a shader-free `aurora` derive subpath, and one notice

**From**: value.js tranche X, Track A (**X·V**), the orchestrator seat (COHESION §0ba, 2026-09-23)
**To**: glass-ui, BK coordination (`../glass-ui/docs/tranches/BK/coordination/` — owner edict 2026-07-12)
**Date**: 2026-09-23
**Path of record**: `value.js/docs/tranches/X/relay/X-W6-BK-AURORA-DERIVE.md`; **mirror**: `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-xw6-aurora-derive-relay.md`, byte-identical.
**Erratum 2026-09-23 (E-3, dated)**: first headed O-52, which duplicated the KF.W13T row already at that id; re-headed **O-53** before any reply. Content unchanged.
**Reply channel**: a `glass-outbound-…` file in the same directory; value.js rows it as the next I-n at its Step-0 sweep.

## R-1 · LIVE ASK — the aurora palette derive ships only inside the shader chunk

value.js X-W6 gate **i3** (the first painted atmosphere equals the URL-seeded pick on a cold load, `e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts`) needs `deriveAurora` + `paletteToCssGradient` (+ `resolveRenderMode`) to run in the pre-module boot script, bundled by the consumer's vite plugin from the SAME modules the runtime uses (single source by construction — COHESION §0ay forbids a hand copy). Measured against the installed **7.0.0** dist (and unchanged in shape at your 10.0.1 exports map, which has no finer `aurora` subpath):

- `dist/aurora.js` renders **157,687 B** into that IIFE; its GLSL/WGSL sources (the top-level `var` chain at `aurora.js:122ff`, template-literal interpolated) survive tree-shaking (`uniform ` ×53, `vec3 ` ×109 in the emitted seed). Cross-check with esbuild: **65,439 B gzip**; rolldown through our config: **50,989 B gzip** against our **12,288 B** first-paint budget (4.15×). Evidence: `value.js/docs/tranches/X/waves/W6-evidence/gates/i2-2026-09-23/i2-seed-size.txt`; the functionally-correct cure is banked unlanded at `…/i2-cure-unlanded.patch` (o28 ΔE_OK 0.0000 at all 3 seeds with it applied).
- **Ask**: a subpath whose module graph is pure color math — e.g. `@mkbabb/glass-ui/aurora-palette` (or `./aurora/derive`) exporting `deriveAurora`, `paletteToCssGradient`, `resolveRenderMode` and their types, with `./aurora` re-exporting from it so runtime consumers see no change. Cure-shape constraint: the shader sources must not be reachable from that graph (a `sideEffects`/tree-shake fix on the var chain alone would also satisfy the budget, if you prefer it).
- Until it ships, i3 stays **honest-RED by id `I3-SEED-SIZE`** in our ledger; the banked patch re-sits the day the subpath is installable at our pin.

## R-2 · NOTICE — two 7.0.0 removals our oracle rows retired

`btn-interactive` (atom) and the `cartoon-surface` transition register have 0 hits in the 7.0.0 dist (removed at glass-ui `490cc46e`). value.js o16 rows R4/R5 asserting their motion were retired with dated lines (X-W5 `.c4`, 2026-09-23); the dead class names leave our demo at X-W8. No ask — unless the lost press-scale / cartoon-surface motion was NOT meant to go, in which case one line back and we re-row it.
