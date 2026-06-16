# BA.W-CARVE2 — DELTA: the three grandfathered god-modules drained

**Wave**: BA.W-CARVE2 (the god-module ratchet drained to ∅)
**Status**: COMPLETE — `proof:no-god-module` reaches its DECLARED CLOSE STATE (`RATCHET_BASELINES == {}`, `ratchetDrained: true`) for the first time since AY.
**Nature**: STRUCTURAL wave (zero paint change by construction). `proof:no-god-module` GREEN + the typography byte-isomorphism diff + typecheck/verify-export-types are the binding truth; there is NO `proof:ba-gestalt` requirement (BA invariant 4 binds VISUAL waves; this wave changes zero paint).

## (a) The three before→after line counts

| File | before | after | verdict |
|---|---|---|---|
| `src/styles/typography.css` | 530 | **46** (thin `@import` root) | CARVE → `typography/{scale,semantic,utilities}.css` |
| `src/styles/typography/scale.css` | — | 153 (new) | the OFL fallback `@font-face` + `:root` √φ `--type-*` ladder |
| `src/styles/typography/semantic.css` | — | 220 (new) | the `body{}` cascade + DISPLAY/HEADING/BODY/MICRO/ADMIN-LABEL `@utility` classes |
| `src/styles/typography/utilities.css` | — | 159 (new) | the MATH/MONO/FONT-FAMILY/ORNAMENTAL `@utility` set + the `@layer components` AUX hooks |
| `src/components/custom/constellation/constellationField.ts` | 586 | **220** | CARVE → the ~308-line `Constellation*` type set split off; the `seedField`/`refitField`/`stepField` step engine stays |
| `src/components/custom/constellation/constellationTypes.ts` | — | 391 (new) | the carved type interfaces (re-exported from `constellationField.ts` so the sibling import seam is untouched) |
| `src/components/custom/constellation/Constellation.vue` | 576 (gate baseline 577 — the 1-line drift) | **105** | CARVE → the render-loop + lifecycle orchestrator lifted to `composables/useConstellation.ts`; the SFC keeps template + `defineProps<ConstellationProps>` + the thin composable call |
| `src/components/custom/constellation/composables/useConstellation.ts` | — | 396 (new) | the orchestrator extraction |

Every carved file is **under the 500-line bound**. The single largest measured `src/` file is now `src/styles/tokens/offsets-sizing.css` at **500** (at bound, not over — a warn-band file, not a violation).

## (b) The dist byte-isomorphism witness (the typography carve)

The typography carve is **dist byte-isomorphic** — proven by an A/B build on the FINAL post-wave tree (constellation already carved in BOTH arms, so the constellation scope-ID is held constant and cannot confound the diff). Arm A swaps the HEAD 530-line monolith back in as the single `typography.css` (partials dir moved aside); Arm B is the carved thin `@import` root + 3 partials. Both arms run `npm run build`; the emitted `dist/glass-ui.css` is byte-identical:

```
Arm A (HEAD single 530-line typography.css):  916c5ea5340fa13112ccaa8a5f50abef55115b2b6134c2824d64f73e157d138e  dist/glass-ui.css
Arm B (thin @import root + 3 partials):        916c5ea5340fa13112ccaa8a5f50abef55115b2b6134c2824d64f73e157d138e  dist/glass-ui.css
diff dist/glass-ui.css Arm A vs Arm B:         EMPTY (byte-identical hashes)
```

The carve moves rules across files in the SAME cascade position (`index.css` still `@import`s `./typography.css`; the thin root `@import`s `scale → semantic → utilities` in the recorded order; the faces+tokens FIRST, the semantic classes that read them SECOND, the aux/mono utilities LAST). No paint changed by one byte. The Arm-A monolith swap was restored EXACTLY afterward (sha-verified against a pre-swap byte backup of all four carved files); the working tree is the carved state.

A source-level corroboration (independent of the build): the three partials concatenated in `@import` order, comments stripped, diff EMPTY against the comments-stripped HEAD monolith (334 rule-lines each — byte-identical rules, the only file-level delta being the per-partial comment headers, which the bundler drops).

### The constellation SFC scope-ID (held constant in the A/B)

The full post-wave `dist/glass-ui.css` carries the carved constellation SFC's scope-ID (`.constellation[data-v-2ada60ff]`). Because both byte-isomorphism arms run on the FINAL tree (the constellation carve already landed in both), this scope-ID is IDENTICAL in Arm A and Arm B — it is NOT a confound to the typography-isomorphism proof above. (The constellation carve's own correctness is bound by W4 — public-surface preservation + typecheck + verify-export-types — not by byte-isomorphism: a `<script setup>` carve deterministically rotates the Vue scoped-style `data-v-` hash, but the `data-v-` attribute on the rendered element rotates in LOCKSTEP so the rendered paint is unchanged; the three `.constellation*` CSS DECLARATIONS are byte-identical to HEAD, only the scope-ID hash differs from HEAD.)

## (c) The proof:no-god-module born-RED (pre-wave) vs GREEN (at close)

### Born-RED at HEAD (the ratchet at three rows — close state UNMET)
```
3 file(s) GRANDFATHERED by the ratchet (over bound, carve pending — NOT a violation):
  ▣ src/components/custom/constellation/constellationField.ts is 586 (baseline 586)
  ▣ src/components/custom/constellation/Constellation.vue is 576 (baseline 577)
  ▣ src/styles/typography.css is 530 (baseline 530)
artefact facts: ratchetBaselineCount: 3 | ratchetDrained: False
```
The gate reported `status: PASS` (the grandfathered rows are not violations) but the DECLARED CLOSE STATE (`RATCHET_BASELINES == {}`) was UNMET — `ratchetDrained: false`.

### GREEN at close (the ratchet drained to ∅)
```
scanned 617 files; hard limit 500, warn 300
largest files:
   500  • warn  src/styles/tokens/offsets-sizing.css   ← largest, AT bound
   ...
RATCHET_BASELINES drained to ∅ — every file is under bound.
status: PASS   artefact: .cache/gates/AV-no-god-module.json
artefact facts: ratchetBaselineCount: 0 | ratchetDrained: True | violations: []
```

### The four born-RED witnesses, GREEN at close
- **W1 — the ratchet is drained**: `facts.ratchetBaselineCount === 0` AND `facts.ratchetDrained === true`. ✓
- **W2 — no file over bound**: `facts.largest[0].lines === 500` (≤ 500) AND `violations == []`. ✓ (the anti-evasion bite holds: W1's `=== 0` count forbids a drain-by-re-booking.)
- **W3 — typography import-order-sound + byte-isomorphic**: `facts.cssMonoliths` includes `{ name: "typography", importOrderPreserved: true, missing: [] }` AND the empty `dist/glass-ui.css` diff (above). ✓
- **W4 — constellation public surface preserved**: `npm run typecheck` exit 0 + `npm run verify-export-types` exit 0 + the `constellation/index.ts` barrel export-name set unchanged (value exports `seedField`/`stepField`/`refitField`/`BASE_WIDTH` + `Constellation` default + the 12 `Constellation*` types). ✓ (38/38 `constellationField.test.ts` pass via the barrel.)

## (d) The assertMonolithImportOrder typography fact

```
all cssMonoliths: [
  (tokens, true, []), (glass, true, []), (utilities, true, []),
  (dock-controls, true, []), (theme, true, []),
  (typography, true, [])    ← NEW (BA.W-CARVE2)
]
```

The `typography` `CSS_MONOLITHS` manifest registered in `scripts/read-css-monoliths.mjs`: `root: "src/styles/typography.css"`, `dir: "src/styles/typography"`, `order: ["scale.css", "semantic.css", "utilities.css"]`. `importOrderPreserved: true`, `missing: []`.

## (e) The carve-vs-§5-keep verdict per constellation file

- **`constellationField.ts` → CARVE** (the recommended treatment). The ~308 lines of `ConstellationNode/Ripple/Pointer/Palette/Warp/Wander/PinnedDrift/WarpConfig/WellConfig/Well/Field/Props` type interfaces split into co-located `constellationTypes.ts`; the `seedField`/`refitField`/`stepField` step engine stays in `constellationField.ts` (220 lines). The engine `import type`s the 3 shapes it uses (`ConstellationNode`/`ConstellationField`/`ConstellationPointer`) and `export type * from "./constellationTypes"` so the sibling draw/interaction/constants modules + the composables keep importing types `from "./constellationField"` UNCHANGED (the carve moves declarations without touching the import seam). The `index.ts` type re-export block re-points to `./constellationTypes` (the canonical home). NO public-surface change.
- **`Constellation.vue` → CARVE** (NOT §5-keep). The 528-line `<script setup>` orchestrator lifted to `composables/useConstellation.ts` (396 lines) — the field setup, the `useCanvas2D` render-loop wiring, the four neutral draw passes + the consumer `drawOverlay` skin, and the imperative warp/well/pin expose. The SFC (105 lines) keeps the template + the `<style scoped>` + `withDefaults(defineProps<ConstellationProps>(), {...})` (referencing the canonical `ConstellationProps` type collapses the duplicated ~158-line inline prop literal) + the thin `useConstellation(props, hostRef, canvasRef)` call spread into `defineExpose`. The per-frame live-read props (`pointerReactive`/`opacityCeiling`/`accentEdges`/`drawOverlay`) are read off `props.x` INSIDE the render loop (preserving the Vue 3.5 reactive-prop live-read; the `freeze` raw-vnode read moved into the composable preserving the omitted-vs-explicit-false distinction). The render-loop cohesion is preserved — the extraction is the SFC↔composable colocation idiom (the dock/tabs/goo-blob precedent), not an artificial seam. NO triumvirate trigger fired.

## §0 RE-GROUND drift notes

- **Constellation.vue 1-line drift (anticipated by the spec)**: the gate ratchet baseline read `577`, disk was `576`. The file was still grandfathered (576 ≤ 577); the carve drops the row entirely, resolving the drift mechanically (the row is now DELETED, not held at a stale baseline).
- **`proof-storybook-ia.mjs` is NOT a typography.css reader (drift)**: the spec's re-point set named `proof-storybook-ia.mjs`, but the HEAD re-grep shows it references the `typography` STORY-PAGE NAME (a `foundations` route in its IA whitelist), NOT a `src/styles/typography.css` read. It was NOT re-pointed (no typography.css read to swap). Recorded as a no-op drop.
- **`proof-components-css.mjs` needed NO source edit (drift)**: it reads the BUILT `dist/styles/typography.css` and its `rungPropsWithPartials` ALREADY follows `@import "./<dir>/<partial>.css"` one level. The built thin root `@import`s `./typography/{scale,semantic,utilities}.css`, so the partial-follower unions the `--type-*` props automatically. No re-point needed; the gate passes post-carve unchanged.

## Reader re-points (the AZ.W-CARVE one-line read-swap)

| gate | swap |
|---|---|
| `proof-font-canon.mjs` | `readFileSync(P.TYPOGRAPHY)` → `readMonolith(P.ROOT, "typography")` (+ import) — the shipped-face derive reads the carved `scale.css` `@font-face` set |
| `proof-font-cascade-live.mjs` | `readFileSync(P.TYPOGRAPHY)` → `readMonolith(P.ROOT, "typography")` — the STRUCTURE-3 body/ladder/cm-serif asserts read the carved partials |
| `proof-suffuse.mjs` | `read("src/styles/typography.css")` → `readMonolith(ROOT, "typography")` (+ import) — the `.section-label--tinted` variant lives in `utilities.css` |
| `proof-ui-scale.mjs` | `read("src/styles/typography.css")` → `readMonolith(ROOT, "typography")` — the `--type-display-*` ladder lives in `scale.css` |
| `proof-reka-binding-idiom.mjs` | the typography text-shadow source → `readMonolith(ROOT, "typography")` (the `.text-engraved` text-shadow lives in `utilities.css`); the `utilities.css` arm unchanged |
| `proof-storybook-ia.mjs` | NO swap (drift — not a typography.css reader) |
| `proof-components-css.mjs` | NO source edit (the dist partial-follower handles it; drift) |

## Verification battery

- `npm run typecheck` (vue-tsc + tsconfig.test): **exit 0**
- `npm run build`: **exit 0** (the typography partials compile; `dist/constellation.js` 17.16 kB — unchanged size)
- `npm run verify-export-types`: **exit 0** — "All package export targets and type resolutions are valid."
- `node scripts/proof-no-god-module.mjs`: **exit 0** — `ratchetDrained: true`
- the FIVE re-pointed reader gates (`proof-font-canon`/`proof-font-cascade-live`/`proof-suffuse`/`proof-ui-scale`/`proof-reka-binding-idiom`) + `proof-no-god-module`: all **exit 0** (the six source-edited gates)
- the two spec-named-but-NOT-edited gates pass post-carve unchanged: `proof-components-css` **exit 0** (dist partial-follower) + `proof-storybook-ia` **exit 0** (`typography` story-page name, not a file read)
- `npx vitest run tests/components/custom/constellation/`: **38/38 pass**
- `git diff --check` (tracked changed files): **clean**

NOTE: `proof:gate-script-parity` reports ONE orphan script (`scripts/proof-claude-structure-sync.mjs`) — an UNTRACKED sibling-wave file (W-HYGIENE / the claude-structure-sync lane) awaiting the orchestrator's `package.json` registration; it is NOT introduced by this wave (out of W-CARVE2's File Bounds; in the `??` untracked set). The sibling `proof-shell-hold.mjs` is now registered (W-SHELL-HOLD committed). This wave registered NO new gate, touched no `package.json`/`gates.mjs` row, and orphaned nothing: all six gate scripts it edited (`proof-font-canon`/`proof-font-cascade-live`/`proof-suffuse`/`proof-ui-scale`/`proof-reka-binding-idiom`/`proof-no-god-module`) remain registered, and `read-css-monoliths.mjs` is a library module, not a `proof:*` script. The single parity violation is therefore owed to the orchestrator/sibling, not to this wave.
