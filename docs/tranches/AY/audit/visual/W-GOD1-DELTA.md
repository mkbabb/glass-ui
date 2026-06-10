# W-GOD1-CARVE — DELTA

Structure-only carve: every target's PUBLIC return/export surface is byte-identical,
so NO pixels change (no screenshots warranted — the DELTA is the structural proof +
the green behaviour gates). Captured at branch `tranche/AY`.

## §0 recount at HEAD (the binding target table — the tree moved past the spec's 6)

The spec graded SIX violators; at HEAD `proof:no-god-module` found EIGHT (the
constellation pair grew further, two NEW `.vue`/`.ts` violators appeared since the
spec's last regrade):

| file | @HEAD | @close | carve |
|---|---|---|---|
| `constellation/constellationField.ts` | 977 | 447 | → `constellationInteraction.ts` (393) + `constellationDraw.ts` (177) |
| `aurora/constants/shaders/mediums.glsl.ts` | 737 | 492 | → `vangogh-medium.glsl.ts` (258); POST_BRUSH recomposed as a template join, STRING byte-identical |
| `goo-blob/composables/useMetaballRenderer.ts` | 729 | 387 | → `uploadBlobUniforms.ts` (360) + `buildMetaballProgram.ts` (101); named `UseMetaballRendererReturn` |
| `tabs/SegmentedTabs.vue` | 689 | 419 | `<style scoped>` → co-located `segmented-tabs.css` (272), `@import`-ed into styles/index.css |
| `dock/GlassDock.vue` | 624 | 334 | → `composables/useDockShellProps.ts` (271) + `composables/useDockMorphWindow.ts` (118) |
| `constellation/Constellation.vue` | 616 | 481 | → `composables/useConstellationPointer.ts` (179) + `composables/createConstellationField.ts` (93) |
| `fourier-field/FourierField.vue` (NEW) | 570 | 475 | → `presets.ts` (101, the VariantPreset + PRESETS) |
| `goo-blob/shaders/metaball.frag.ts` (NEW) | 510 | 417 | → `metaball-uniforms.glsl.ts` (102); FRAGMENT_SRC spliced, STRING byte-identical |

Every target is now < 500. The new siblings are all package-INTERNAL (zero new
public symbols).

## §4.R RATCHET landed FIRST (the growth-stop)

`scripts/proof-no-god-module.mjs` gained `RATCHET_BASELINES` (per-violator
grandfathering: ≤500 PASS, 500<lines≤baseline GRANDFATHERED, else RED; a stale row
whose file shrank under bound is itself RED — monotonic-drain). `gates.mjs` flipped
`proof:no-god-module` to `tags:["local","ci"]`. The 8 baselines seeded at the HEAD
counts, then DRAINED to ∅ as each carve landed. Bite-checked: appending a line past a
baseline → RED; a fresh >500 file → RED.

Coordinated WITH W-CSS1 (which added the `.css` collector arm + the `styles/`
dock-controls.css/theme.css baseline rows with a `// BOOK(AY.W-CSS1):` marker, OUT of
W-GOD1's carve scope — atomic per-wave, disjoint regions of the same gate per §4.R.4).
At close `RATCHET_BASELINES` holds only W-CSS1's 2 `.css` rows.

## §3 return-shape + barrel-parity, MACHINE-proven

The orphan `proof-composable-return-types.mjs` is RE-SCOPED + WIRED
(`package.json` script + `gates.mjs` `tags:["local","ci"]`):
- `UseMetaballRendererReturn` named interface added + asserted.
- `doNotSplitTargets` narrowed to ContinuousMarkers alone (SegmentedTabs/GlassDock are
  CARVED — their banners removed, §5).
- NEW barrel-parity snapshot: goo-blob / constellation / dock-composables barrels each
  re-export the EXACT expected symbol set. Bite-checked: drop a re-export → RED.
- NEW aurora GLSL string-parity: the composed `AURORA_MEDIUMS_{PRE,POST}_BRUSH_GLSL`
  hashes to the carve-commit snapshot (`a77f39e2ab2143…`); machine-verified the join
  introduces ZERO byte drift (39047 bytes, identical to HEAD).
- Stale-path fixes (cross-wave tree-move follow): the twin-line `@utility` read now
  scans the `utilities/*.css` partial tree (W-CSS1 moved it into the btn partial).

## Byte-identity proofs

- mediums POST_BRUSH composed string === HEAD (39047 bytes, node-diff verified).
- metaball FRAGMENT_SRC splice (3765-byte uniforms slice moved verbatim) — witnessed
  by `proof:blob-color-equivalence` (11/11) + `proof:blob-render` (6/0).
- constellation barrel re-export-only diff (path re-wiring only; symbol set unchanged).
- goo-blob / dock-composables / fourier-field barrels UNCHANGED (new siblings internal).

## Green gates at close

- `proof:no-god-module` — PASS (ci-tagged; all 6+2 `.ts`/`.vue` carved; bite-checked).
- `proof:composable-return-types` — PASS (ci-tagged + wired; return-types + barrel-parity
  + GLSL string-parity; both bites RED-confirmed).
- `proof:blob-render` (6/0), `proof:blob-color-equivalence` (11/11) — PASS.
- `proof:constellation-field` (25/25) — PASS.
- `proof:tabs-unified` — PASS (static arm GREEN after re-pointing the CSS-side asserts
  to `segmented-tabs.css` + the tokens read to the `tokens/*.css` partials; live arm
  glided=true/squished=true against the demo on :5199).
- `proof:dock-hold-contract` — PASS.
- `proof:aurora-stroke-composite`, `proof:aurora-vangogh-preset` (after re-pointing its
  dab-body read to the vangogh sibling), `proof:aurora-painterly-statistics` (4/0),
  `proof:aurora-tensor-field` (painterly.test 8/8) — PASS.
- `proof:gen-ci-fresh` — byte-identical; `gates:verify-ci` — 112 gates matched.
- `npm run typecheck` (src `vue-tsc --noEmit`) — clean; `npm run build` — green
  (vite + dts, 59 subpaths flattened).

## Out-of-scope / pre-existing (NOT W-GOD1 regressions)

- **constellation `-live` set** (warp/egg/freeze/refit) — RED on this runner, but RED
  IDENTICALLY at HEAD (verified by stashing the carve, restoring the monolithic
  constellationField.ts on a fresh server: same "warpTo returned no target node"). The
  constellation story does not seed its field in this headless env — pre-existing,
  proven NOT carve-caused. Binding witness is `proof:constellation-field` (25/25).
- **`proof:dock-animation-live`** — RED: the `/dock/overview` route it navigates does
  NOT exist in the demo router (0 refs at HEAD AND now). The route is W-DOCK2's
  deliverable (§6: "W-DOCK2 lands BEFORE 2c"); it has not shipped. The dock carve's
  behaviour is witnessed by the 21 GlassDock vitest units (touch-gate / motion-parity /
  scroll-overflow / instrument-strip / vt-names) + `proof:dock-hold-contract`.
- **`proof:aurora-oilpastel-medium`** — RED on the `dist/aurora.js` gzip budget
  (38753/38000). A byte-identical GLSL recompose does NOT change the bundle; this is
  W-AUR-PAINTERLY's shader-growth overage (the file went 528→737), pre-existing.
- **`proof:tabs-unified` token asserts** had read the thin `tokens.css` root — re-pointed
  to the `tokens/*.css` partials (W-CSS1's tokens carve moved `--tab-indicator-max-stretch`).
- **3 `mediums-extraction.test.ts` exact-value asserts** — RED, but RED IDENTICALLY at
  HEAD (W-AUR-PAINTERLY changed the oil `profileFor` values without updating the test);
  the 7 structural asserts pass. NOT carve-caused.
- **`proof:gate-script-parity`** — its `proof-colocation.mjs` NEW-orphan violation is
  another lane's unregistered gate (untracked, created mid-fleet). W-GOD1 cleared its
  OWN allowlist rows (removed the now-registered composable-return-types + the dead
  glass-panel-tiers entry).
- **`proof:tag-parity`** — flags `proof:no-legacy-commentary` as local-only (a different
  gate's promotion, not W-GOD1's). `proof:composable-return-types` IS ci-tagged.
- **One test-typecheck error** in `tests/components/custom/underline/GlassUnderline.test.ts`
  (a reka-ui `DOMWrapper.exists` binding) — another wave's file; the `src` typecheck is
  clean.
