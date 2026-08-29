# Overfitting Audit — BK batch close (`074a3d0e..d4f7b24f`)

**Asserted model:** `claude-opus-5` — read from this seat's own transcript
`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/agent-a53cee81932a733ae.jsonl`
(first user message = this prompt; `.message.model` = `claude-opus-5`), pattern-gated
`[[ "$MID" == claude-opus-5* ]] && echo PASS` → **PASS**.

**Fence honoured:** zero writes into `/Users/mkbabb/Programming/glass-ui`. No git mutation.
Only `git diff`/`git grep`/`grep`/`rg -l`/`Read`. This file is the sole artefact written.

**Source of record:** `docs/audits/overfitting-audit.md`, read in full. Its verdict vocabulary
(`keep` · `keep-current` · `inline-and-remove` · `library-orphan` · `delete-unused` ·
`demo-only-private`) and its precedence rule are used verbatim. The parent's KEEP /
CUT-CANDIDATE binary maps as: `keep`/`keep-current`/`demo-only-private` → **KEEP**;
`library-orphan`/`delete-unused`/`inline-and-remove` → **CUT-CANDIDATE**.

---

## Scope and method

`git diff --name-status 074a3d0e..d4f7b24f -- src/` → **12 A · 25 D · 59 M · 3 R**,
99 files, `+6024 / −7856`. `git diff --name-status --diff-filter=A 074a3d0e..d4f7b24f -- demo/`
→ **zero demo additions** (all 36 demo touches are `M`), so the audit's `demo-only-private`
category has no batch-new candidate to grade. 13 test files were added; tests are consumers,
not artefacts, and `tests/` is not in `{CONSUMER_PATHS}` — test reach is reported in its own
column and never counts toward the ≥2 bar.

`{SCOPE_PATHS}` = every `src/` artefact the range **added** (`A`/`R`) plus every export or CSS
class the range **minted inside a modified file** (extracted mechanically:
`git diff … | grep -E '^\+export (type|interface|function|const|class) '` and the CSS
`^\+\s*(\.[a-z…]|@utility …|--[a-z0-9-]+:)` sweep, each row then checked for newness with
`git grep -l -w <sym> 074a3d0e -- src/ demo/`). No new `@utility` block was minted this batch.

`{CONSUMER_PATHS}` = `src/ demo/` + the six sibling consumers that exist on disk:
`../speedtest/src ../slides/src ../words/frontend/src ../bbnf-lang/playground/src
../fourier-analysis/web/src ../muster/frontend/src`. (The audit's canonical list writes
`../muster/src/`; the real layout is `../muster/frontend/src` — used, and noted.)
`../atlas/src` was additionally walked read-only because `docs/consumer-evidence/handmark.md`
cites it as the census of record.

**Counting rule.** A *usage site* is a distinct file in `{CONSUMER_PATHS}` that references the
artefact, **excluding its defining file**. A barrel re-export is recorded as `public-surface`,
not as a usage site — otherwise every published symbol auto-passes, which is exactly the false
negative the audit's precedence note forbids. Same-file references are reported separately
because they distinguish *dead* from *merely over-exported*.

**Two collision classes were disqualified after checking the import source, not the name.**
`Point` / `Frame` / `serialize` / `SearchResult` / `searchIndex` / `fuzzyMatch` return hits in
`../words/frontend` and `../fourier-analysis/web` that are **local homonyms**:
`../fourier-analysis/web/src/components/paper/search/searchHelpers.ts:5` imports `fuzzyMatch`
from `./paperSearchIndex`, not from glass-ui. Those hits are excluded from every count below.

---

## Table

### A · Dock lattice — new `useDockRun.ts` (332 lines) + `run.css` (599 lines)

| artefact | kind | def-site | public | src | demo | ext | tests | total | verdict | rationale (rg/grep invocation) |
|---|---|---|---|---|---|---|---|---|---|---|
| `useDockRun` | fn | `src/components/dock/composables/useDockRun.ts:100` | no | 1 | 0 | 0 | 0 | **1** | keep | `grep -n useDockRun src/components/dock/GlassDock.vue` → `:48` import, `:109` call. Not on the `/dock` barrel (`grep -n useDockRun src/components/dock/index.ts` → none) and not on `dock/composables/index.ts`, so it is component-private by construction. Not `inline-and-remove`: the audit reserves that for "helper-shaped … abstractions that don't earn" it — this is a 332-line lattice engine holding a token contract with `run.css` (`--dock-pitch`, `--dock-open-pitches`, 3 files each). Out of `proof:component-orphan` scope (not a published package, flat subpath, or root-barrel composable). |
| `UseDockRunOptions` | interface | `useDockRun.ts:37` | no | 0 | 0 | 0 | 0 | 0 | keep | `grep -rlw UseDockRunOptions src/ demo/ tests/` → def file only. Signature type of the same-file exported function; declaration emit names it. |
| `UseDockRunReturn` | interface | `useDockRun.ts:46` | no | 0 | 0 | 0 | 0 | 0 | keep | same invocation, same grounds. |
| `.dock-run` | class | `dock/styles/run.css:159` | n/a | 6 | 0 | 0 | 1 | **6** | keep | `grep -rlw dock-run src/ demo/` → `GlassDock.vue` (markup `:464`), `useDockShellProps.ts`, `useDockRun.ts`, `styles/index.css`, `styles/shell-regions.css`, `styles/shell.css`. |
| `.dock-run-status` | class | `run.css:531` | n/a | 1 | 0 | 0 | 0 | **1** | keep | `grep -n dock-run-status src/components/dock/GlassDock.vue` → `:541` (`role="status" aria-live="polite"`). A component-private live region with exactly one markup site is the healthy shape of a scoped class, not an orphan. |
| `--dock-pitch` | token | `run.css` | n/a | 4 | 0 | 0 | 0 | 4 | keep | `grep -rl -- --dock-pitch src/ demo/` → `shell-regions.css`, `index.css`, `useDockRun.ts`, `run.css`. New at base (`git grep -l -- --dock-pitch 074a3d0e` → 0). |
| `--dock-open-pitches` | token | `run.css` | n/a | 3 | 0 | 0 | 0 | 3 | keep | same sweep → `useDockRun.ts`, `run.css`, `index.css`. |
| `--dock-run-gap` | token | `run.css` | n/a | 3 | 0 | 0 | 0 | 3 | keep | → `shell-regions.css`, `index.css`, `run.css`. |
| `--dock-seat` | token | `index.css` | n/a | 2 | 0 | 0 | 0 | 2 | keep | → `index.css`, `run.css`. |
| `--dock-ring-reserve` | token | `index.css` | n/a | 2 | 0 | 0 | 0 | 2 | keep | → `run.css`, `index.css`. |
| `--dock-ring-color` | token | `index.css` | n/a | 2 | 0 | 0 | 0 | 2 | keep | → `index.css`, `layer-group.css`. |
| `--dock-ring-offset` | token | `index.css` | n/a | 2 | 0 | 0 | 0 | 2 | keep | → `index.css`, `layer-group.css`. |
| `--dock-ring-width` | token | `index.css` | n/a | 2 | 0 | 0 | 0 | 2 | keep | → `index.css`, `layer-group.css`. |
| `--dock-cap-rest` | token | `run.css:468` | n/a | 0 | 0 | 0 | 0 | 0 (8 same-file reads) | keep | `grep -n -- --dock-cap-rest src/components/dock/styles/run.css` → 3 declarations (`:468,473,478`) + 8 reads (`:559,560,570,571,581,582,592,593`). A file-local computed var by design. |
| `--dock-cap-cut` | token | `run.css:469` | n/a | 0 | 0 | 0 | 0 | 0 (8 same-file reads) | keep | same invocation → `:469,474,479` decl + `:563,564,574,575,585,586,596,597` reads. |
| `--dock-open-seat` | token | `run.css:124` | n/a | 0 | 0 | 0 | 0 | 0 (2 same-file reads) | keep | `grep -n -- --dock-open-seat run.css` → `:124` decl, `:355`/`:375` reads. (`run.css:319` records that W3 first authored this token with zero consumers; the batch supplied them.) |
| `DOCK_COLLAPSE_DELAY_MS` | const | `dock/constants.ts` | no | 2 | 1 | 0 | 0 | **3** | keep | `grep -rlw DOCK_COLLAPSE_DELAY_MS src/ demo/` → `useDockState.ts`, `useDockShellProps.ts`, `demo/stories/dock/overview.vue`. |
| `DockCollapse` | type | `useDockShellProps.ts` | yes (`./dock`) | 2 | 0 | 0 | 0 | 2 | keep | → `GlassDock.vue`, `index.ts`. Replaces the struck `DockInteraction`. |
| `DockProps` | type | `useDockShellProps.ts` | yes (`./dock`) | 4 | 1 | 0 | 1 | **5** | keep | `grep -rlw DockProps src/ demo/` → `GlassDock.vue`, `index.ts`, `density.css`, `shell.css`, `demo/stories/dock/overview.vue`. |

### B · Fourier-field — the greenfield renderer split (7 new files)

| artefact | kind | def-site | public | src | demo | ext | tests | total | verdict | rationale |
|---|---|---|---|---|---|---|---|---|---|---|
| `useFourierField` | fn | `fourier-field/useFourierField.ts:82` | no | 1 | 0 | 0 | 0 | **1** | keep | `grep -n useFourierField src/components/fourier-field/FourierField.vue` → `:21` import, `:148` call. 248-line renderer decomposition of the `.vue`; not helper-shaped. |
| `UseFourierFieldOptions` | interface | `:37` | no | 0 | | | 0 | 0 | keep | `grep -rlw UseFourierFieldOptions src/ demo/ tests/` → def only. Signature type. |
| `FourierFieldHandle` | interface | `:55` | no | 0 | | | 0 | 0 | keep | same; return type of `useFourierField`. |
| `createFourierClock` | fn | `clock.ts:59` | no | 1 | 0 | 0 | 1 | **1** | keep | `grep -n createFourierClock src/components/fourier-field/useFourierField.ts` → `:33` import, `:91` call. |
| `FourierClock` | interface | `clock.ts:46` | no | 0 | | | 0 | 0 | keep | `grep -rlw FourierClock src/ demo/ tests/` → `clock.ts` only. Return type of `createFourierClock`. |
| `FourierClockInput` | interface | `clock.ts:31` | no | 0 | | | 0 | 0 | keep | same invocation, same grounds (tick input shape). |
| `FOURIER_TRAVEL_SPRING` | const | `clock.ts:16` | no | 0 | 0 | 0 | 1 | 0 (2 same-file reads) | keep | `grep -rn FOURIER_TRAVEL_SPRING src/ demo/ tests/` → `clock.ts:21,22` derive `OMEGA`/`ZETA`; `tests/…/FourierField.smoke.test.ts:225,226` asserts the preset identity. |
| `FOURIER_SETTLE_ZETA_FLOOR` | const | `clock.ts:19` | no | 0 | 0 | 0 | 1 | **0** | keep-current | same invocation → zero production reads; the sole reader is `FourierField.smoke.test.ts:227`, which asserts `FOURIER_TRAVEL_SPRING.dampingFraction ≥` it. A named invariant floor consumed by a gate; the alternative (a bare literal in the test) is strictly worse. **No `docs/consumer-evidence/` doc exists** — the audit's `keep-current` clause asks for one. |
| `mintSpectrum` | fn | `renderer/mint.ts:88` | yes (`./fourier-field`, `index.ts:12`) | 1 | 1 | 0 | 1 | **2** | keep | `grep -rn mintSpectrum src/ demo/` → `FourierField.vue:14,78,88,91`; `demo/stories/substrates/fourier-field.vue:15,81,86`. |
| `MintedSpectrum` | type | `mint.ts:40` | yes (`index.ts:12`) | 4 | 1 | 0 | — | **5** | keep | `rg -l -w MintedSpectrum src demo` → `FourierField.vue`, `renderer/uniforms.ts`, `renderer/wgpu.ts`, `useFourierField.ts`, `demo/stories/substrates/fourier-field.vue`. |
| **`ringsAt`** | fn | `mint.ts:150` | **yes (`index.ts:12`)** | **0** | **0** | **0** | 1 | **0** | **library-orphan** | `grep -rn ringsAt src/ demo/ tests/` → `README.md:31` (prose), `index.ts:12` (the barrel re-export itself), `mint.ts:150` (def), and `tests/components/fourier-field/FourierField.smoke.test.ts:26,196,207,218`. **Zero sites in `{CONSUMER_PATHS}`** — the library publishes it on `@mkbabb/glass-ui/fourier-field` and neither `FourierField.vue` nor the demo story calls it. Triage per §3: (a) drop from the barrel (keep the function — the smoke test is real), or (b) wire the demo story to it. |
| `FOURIER_REFERENCE_DIAGONAL_PX` | const | `mint.ts:27` | no | 0 | 0 | 0 | 1 | 0 (1 same-file read) | keep-current | `grep -rn FOURIER_REFERENCE_DIAGONAL_PX src/ tests/` → `mint.ts:111` internal; `smoke.test.ts:30,120,149`. Gate anchor. |
| `FOURIER_PAINT_FLOOR_PX` | const | `mint.ts:30` | no | 0 | 0 | 0 | 1 | 0 (1 same-file read) | keep-current | same → `mint.ts:114` internal; `smoke.test.ts:31,121,154`. |
| `createFourierWGPUSetup` | fn | `renderer/wgpu.ts:77` | no | 1 | 0 | 0 | 0 | **1** | keep | `grep -n createFourierWGPUSetup useFourierField.ts` → `:34` import, `:193` call. |
| `createFourierUnsupportedSetup` | fn | `wgpu.ts:387` | no | 1 | 0 | 0 | 0 | **1** | keep | same file → `:34` import, `:204` call. The loud-failure arm; deleting it re-introduces a masking fallback. |
| `FourierRendererDeps` | interface | `wgpu.ts:61` | no | 0 | | | 0 | 0 | keep | `grep -rlw FourierRendererDeps src/ demo/ tests/` → def only. Parameter type of `createFourierWGPUSetup`. |
| `FOURIER_FIELD_COMPUTE_WGSL` | const | `shaders/compute.wgsl.ts:15` | no | 1 | 0 | 0 | 1 | **1** | keep | `rg -l -w FOURIER_FIELD_COMPUTE_WGSL src demo` → `renderer/wgpu.ts`. Also read by `wgsl-splice-contract.test.ts`. |
| `FOURIER_FIELD_RENDER_WGSL` | const | `shaders/render.wgsl.ts:30` | no | 1 | 0 | 0 | 1 | **1** | keep | same → `renderer/wgpu.ts`. |
| `FOURIER_PHASOR_BYTES` | const | `renderer/uniforms.ts:26` | no | 1 | 0 | 0 | 0 | **1** | keep | `grep -rn FOURIER_PHASOR_BYTES src/` → `wgpu.ts:30` import, `:209` buffer sizing. |
| `FourierUniformScratch` | interface | `uniforms.ts:28` | no | 0 | | | 0 | 0 | keep | `grep -rlw FourierUniformScratch src/ demo/ tests/` → def only. Return type of the two `create*Scratch` fns. |
| `createFourierComputeScratch` | fn | `uniforms.ts:40` | no | 1 | | | 0 | **1** | keep | cohort: `rg -l -w <sym> src demo` → `renderer/wgpu.ts` for every row in this block. `uniforms.ts` is the pure pack-and-fit module `wgpu.ts` (393 lines) is factored against; the module boundary is the artefact, not each name. |
| `packFourierComputeUniforms` | fn | `uniforms.ts:45` | no | 1 | | | 0 | **1** | keep | ″ |
| `createFourierRenderScratch` | fn | `uniforms.ts:86` | no | 1 | | | 0 | **1** | keep | ″ |
| `FourierFit` | interface | `uniforms.ts:92` | no | 1 | | | 0 | **1** | keep | ″ |
| `computeFourierFit` | fn | `uniforms.ts:108` | no | 1 | | | 0 | **1** | keep | ″ |
| `strokeToModel` | fn | `uniforms.ts:126` | no | 1 | | | 0 | **1** | keep | ″ |
| `FourierRamp` | interface | `uniforms.ts:139` | no | 1 | | | 0 | **1** | keep | ″ |
| `resolveFourierRamp` | fn | `uniforms.ts:162` | no | 1 | | | 0 | **1** | keep | ″ |
| `FourierRenderPack` | interface | `uniforms.ts:202` | no | 0 | | | 0 | 0 | keep | `rg -l -w FourierRenderPack src demo` → def only. Parameter type of `packFourierRenderUniforms`. |
| `packFourierRenderUniforms` | fn | `uniforms.ts:229` | no | 1 | | | 0 | **1** | keep | → `wgpu.ts`. |
| `packPhasorTable` | fn | `uniforms.ts:280` | no | 1 | | | 0 | **1** | keep | → `wgpu.ts`. |
| `FOURIER_CHAIN_HUE_SWEEP` · `FOURIER_CURVE_SAMPLES` · `FOURIER_SCAFFOLD_STROKE_FRAC` | const ×3 | `fourier-field/constants.ts` | no | 1 each | 0 | 0 | 0 | **1** each | keep | `for s in …; do grep -rlw "$s" src/ demo/; done` → each resolves to `renderer/wgpu.ts`. All three are new (`git grep -l -w … 074a3d0e` → 0). |
| `FOURIER_DPR_CAP` · `FOURIER_LUT_SIZE` | const ×2 | `constants.ts` | no | 2 each | 0 | 0 | 0 | **2** each | keep | → `useFourierField.ts` + `wgpu.ts`; `render.wgsl.ts` + `uniforms.ts`. |
| `FOURIER_FLICK_TURNS` | const | `constants.ts` | no | 2 | 0 | 0 | 0 | **2** | keep | → `clock.ts`, `useFourierField.ts`. |
| `FOURIER_HEAD_DELTA_L` · `FOURIER_INK_DELTA_L` · `FOURIER_TAIL_CHROMA_FLOOR` | const ×3 | `constants.ts` | no | 1 each | 0 | 0 | 0 | **1** each | keep | → `renderer/uniforms.ts`. |
| `FOURIER_PERIOD_S` · `FOURIER_SCRUB_GAIN` | const ×2 | `constants.ts` | no | 1 each | 0 | 0 | 0 | **1** each | keep | → `clock.ts`. |
| `FOURIER_QUANTUM_COARSE` · `FOURIER_QUANTUM_FINE` | const ×2 | `constants.ts` | no | 1 each | 0 | 0 | 0 | **1** each | keep | → `FourierField.vue`. |
| `MAX_FOURIER_STOPS` | const | `constants.ts:14` | no | 1 | 0 | 0 | 0 | **1** | keep | `grep -rnw MAX_FOURIER_STOPS src/ demo/` → `uniforms.ts:20,163`. (Pre-existing; base=4 files, HEAD=2 — narrowed by the batch, still live.) |
| **`FOURIER_STROKE_RUNGS`** | const | `constants.ts:55` | **no** | **0** | **0** | **0** | **0** | **0** | **delete-unused** | `grep -rnw FOURIER_STROKE_RUNGS src/ demo/` → exactly two lines, both in `constants.ts`: `:55` the definition and `:111` a JSDoc `{@link FOURIER_STROKE_RUNGS}` on `FourierFieldConfig.stroke`. **A doc reference is not a usage site.** Nothing validates, clamps to, or iterates the rungs. Not on the `./fourier-field` barrel (`cat src/components/fourier-field/index.ts` — 13 lines, absent). New this batch (base=0). |
| **`FOURIER_TANGENT_EPS`** | const | `constants.ts:88` | **no** | **0** | **0** | **0** | **0** | **0** | **delete-unused** | `grep -rnw FOURIER_TANGENT_EPS src/ demo/` → **one line, the definition itself.** Zero references anywhere including its own file. `git grep -l -w FOURIER_TANGENT_EPS 074a3d0e -- src/ demo/` → **3 files** at the batch base: the greenfield renderer rewrite orphaned it and left the constant standing. Pure dead code. |
| `FourierSource` | type | `constants.ts:91` | no (structurally reachable) | 0 | 0 | 0 | 0 | 0 (1 same-file read) | keep | `grep -rnw FourierSource src/ demo/` → `:91` def, `:99` the `source:` field of `FourierFieldConfig`. `FourierFieldConfig` **is** published (`index.ts:13`), so the union is nameable in the emitted `.d.ts` but not importable by name. Keep the type; **barrel gap noted** — a consumer typing a `source` variable has no door to it. |

### C · HandMark — the 8-file → 1-file `stroke.ts` consolidation

Package-level verdict is set by `docs/consumer-evidence/handmark.md`, whose proof greps were
**re-run at HEAD** per the audit's precedence rule:

- In-repo mounts: `rg -rln '@glass/components/handmark' demo/ src/` → **two** —
  `demo/stories/motion/handmark.vue:7` and `demo/stories/foundations/colors.vue:37`. The doc
  claims one (own-story only); a **second, non-own-story demo mount arrived** and the doc has
  not caught up. The correction runs in the artefact's favour.
- External: `grep -rn 'glass-ui/handmark' ~/Programming/atlas/src` → **three live import sites**,
  exactly the three the doc names — `editorial/AnimatedRule.vue:34`,
  `charts/glyph/HandMark.vue:26`, `motion/useMarkMorphology.ts:40`. **Fresh, holds.**
- slides: `rg -rln 'glass-ui/handmark|HandMark' ~/Programming/slides/src` → **NONE**, as the doc states.

⇒ `handmark` clears `keep-current` on a **verified-fresh** doc. Two notes: the doc's stated
re-audit date is **2026-09-01** (three days out), and atlas imports `BRUSHES` / `BrushName`
(`charts/glyph/HandMark.vue:22-25`) which the HEAD barrel no longer exports — an outbound-break
belonging to the #76 consumer band, not to this audit.

| artefact | kind | def-site | public | src | demo | ext | tests | total | verdict | rationale |
|---|---|---|---|---|---|---|---|---|---|---|
| `SHAPES` | const | `stroke.ts:13` | yes (`handmark/index.ts:9`) | 0 | 0 | 0 | 0 | **0** | keep | `grep -rnw SHAPES src/ demo/ tests/` → only `index.ts:9` (the barrel line) and a prose mention in a test `describe` string. **Not an orphan**: `HandShape = (typeof SHAPES)[number]` (`stroke.ts:14`) is the published union and cannot exist without it; the const is also the runtime enumeration a consumer iterates. |
| `HandShape` | type | `stroke.ts:14` | yes | 2 | 0 | 1 | 0 | **2** | keep | `grep -rlw HandShape src/ demo/` → `HandMark.vue:17`, `index.ts:18`; external `atlas/src/motion/useMarkMorphology.ts:40`. |
| `Point` | interface | `stroke.ts:16` | yes | 2 | 0 | 0 | 0 | **2** | keep | `rg -B24 'from "./stroke"' HandMark.vue` → `:18`; `index.ts:19`. The `constellationInteraction.ts` / `useScrollTrigger.ts` hits are local homonyms — neither imports `./stroke`. |
| `Frame` | interface | `stroke.ts:22` | yes | 2 | 0 | 0 | 1 | **2** | keep | same import block `:16`; `index.ts:17`. `webgl/`, `webgpu/` and `demo/shell/dock-layer-contexts.ts` hits are homonyms. |
| `CAP_HEIGHT` | const | `stroke.ts:33` | no | 0 | 0 | 0 | 1 | **0** (3 same-file reads) | keep-current | `grep -rnw CAP_HEIGHT src/ demo/ tests/` → `stroke.ts:56,158,172` internal; `tests/…/g-hm-layer.test.ts:23,265` asserts the ring-axis identity against it. Gate anchor. |
| `BAND_HEIGHT` | const | `stroke.ts:40` | no | 1 | 0 | 0 | 1 | **1** | keep | → `HandMark.vue:15,193`; `g-hm-layer.test.ts:22,250`. |
| `RING_ENVELOPE` | const | `stroke.ts:56` | no | 0 | 0 | 0 | 1 | **0** | keep-current | `grep -rnw RING_ENVELOPE src/ demo/ tests/` → definition + `g-hm-layer.test.ts:24,272` only. Zero production reads; the sole consumer is the G-HM-LAYER envelope gate. Same shape as `FOURIER_SETTLE_ZETA_FLOOR`: an invariant ceiling that exists to be asserted. **No evidence doc.** |
| `nib` | fn | `stroke.ts:71` | no | 1 | 0 | 0 | 1 | **1** | keep | → `HandMark.vue:26,202`; `g-hm-mark.test.ts:18,143,215`. |
| `markDuration` | fn | `stroke.ts:76` | yes | 2 | 0 | 0 | 0 | **2** | keep | → `HandMark.vue:23`, `index.ts:13`. |
| `minJerk` | fn | `stroke.ts:91` | yes | 2 | 0 | 0 | 1 | **2** | keep | → `HandMark.vue:25`, `index.ts:14`; `g-hm-mark.test.ts:18`. |
| `LineOpts` | interface | `stroke.ts:108` | no | 0 | 0 | 0 | 0 | 0 (1 same-file read) | keep | `grep -rnw LineOpts src/ demo/ tests/` → `:108` def, `:121` the `handLine` parameter. Signature type of a published function. |
| `handLine` | fn | `stroke.ts:121` | yes | 2 | 0 | 0 | 1 | **2** | keep | → `HandMark.vue:21`, `index.ts:11`; `g-hm-mark.test.ts:18`. |
| `ringAxes` | fn | `stroke.ts:155` | no | 0 | 0 | 0 | 1 | **0** (2 same-file reads) | keep-current | `grep -rnw ringAxes src/ demo/ tests/` → `:164`, `:170` internal; `g-hm-layer.test.ts:25,263`. Gate anchor. |
| `ringReserve` | fn | `stroke.ts:163` | no | 1 | 0 | 0 | 0 | **1** | keep | → `HandMark.vue:27,255`. |
| `handRing` | fn | `stroke.ts:168` | yes | 2 | 0 | 0 | 0 | **2** | keep | → `HandMark.vue:22`, `index.ts:12`. |
| `handBand` | fn | `stroke.ts:203` | yes | 2 | 0 | 0 | 0 | **2** | keep | → `HandMark.vue:20`, `index.ts:10`. |
| `serialize` | fn | `stroke.ts:250` | yes | 2 | 0 | 0 | 0 | **2** | keep | → `HandMark.vue:28`, `index.ts:15`. `accent-tone-solve.ts` is a homonym. |
| `strokeRibbon` | fn | `stroke.ts:262` | yes | 2 | 0 | 0 | 0 | **2** | keep | → `HandMark.vue:29`, `index.ts:16`. The evidence doc names it the successor of the retired `path` capability. |
| `fillPolygon` | fn | `stroke.ts:283` | no | 1 | 0 | 0 | 0 | **1** | keep | → `HandMark.vue:19,195`. |
| `markSeed` | fn | `stroke.ts:288` | no | 1 | 0 | 0 | 0 | **1** | keep | → `HandMark.vue:24,224`. |

### D · Search — relocated `src/components/search/` → `src/composables/search/` (INTERNAL)

`scripts/lib/subpath-policy.mjs:145` classifies `search: "INTERNAL"`; the `./search` key is cut
from `package.json` `exports` (verified: `python3 -c "json…exports.keys()"` — 66 keys, no `./search`).
So nothing in this cohort is on a public surface, and `library-orphan` cannot apply.

| artefact | kind | def-site | public | src | demo | ext | total | verdict | rationale |
|---|---|---|---|---|---|---|---|---|---|
| `src/composables/search/index.ts` | barrel | new | no | 1 | 2 | 0 | **3** | keep | `grep -n "composables/search" …` → `useDockSearch.ts:58` (`from "../../../composables/search"`), `demo/stories/data/search.vue:14`, `demo/stories/dock/dock-search.vue:24` (`@glass/composables/search`). |
| `useFuzzySearch` | fn | `useFuzzySearch.ts:20` | no | 1 | 2 | 0 | **3** | keep | `rg -l -w useFuzzySearch src demo …` → `useDockSearch.ts`, both demo stories (+ the two barrels). |
| `UseFuzzySearchOptions` | interface | `useFuzzySearch.ts:9` | no | 0 | 0 | 0 | 0 | keep | barrel-only (`search/index.ts:16`). Options type of a live composable. |
| `buildIndex` | fn | `match.ts:180` | no | 1 | 0 | 0 | **1** | keep | → `useFuzzySearch.ts` (+ barrel). |
| `searchIndex` | fn | `match.ts:212` | no | 1 | 0 | 0 | **1** | keep | → `useFuzzySearch.ts` (+ barrel). The three `../fourier-analysis` hits are a local module (`searchHelpers.ts:5` imports from `./paperSearchIndex`). |
| `fuzzyMatch` | fn | `match.ts:44` | no | 0 | 1 | 0 | **1** | keep | → `demo/stories/data/search.vue` (+ barrel). fourier-analysis hits disqualified as above. |
| `clearSearchCache` | fn | `match.ts:263` | no | 1 | 0 | 0 | **1** | keep | → `useFuzzySearch.ts` (+ barrel). |
| `SearchIndex` | type | `match.ts:26` | no | 0 | 0 | 0 | 0 | keep | barrel-only; return type of `buildIndex`. |
| `SearchableItem` | interface | `types.ts:4` | no | 1 | 2 | 0 | **3** | keep | → `useDockSearch.ts`, both demo stories. |
| `SearchResult` | interface | `types.ts:15` | no | 1 | 1 | 0 | **2** | keep | → `useDockSearch.ts`, `demo/stories/data/search.vue`. All `../words/frontend` hits are that app's own `SearchResult` (`src/types/api/responses.ts`). |
| `FuzzySearchState` | interface | `types.ts:23` | no | 1 | 0 | 0 | **1** | keep | → `useDockSearch.ts`. |

### E · Aurora / Configurator / dark (reshaped in-place)

| artefact | kind | def-site | public | src | demo | ext | tests | total | verdict | rationale |
|---|---|---|---|---|---|---|---|---|---|---|
| `AURORA_DRIFT_FLOOR` | const | `aurora/constants/presets.ts:327` | no | 0 | 0 | 0 | 1 | 0 (4 same-file reads) | keep | `grep -rn AURORA_DRIFT_FLOOR src/ demo/ tests/` → `presets.ts:348-351` internal; `tests/…/aurora/harness.test.ts:94,142`. `aurora/index.ts:22` states it is **deliberately** not re-exported. |
| `AURORA_SETTLE_MS` | const | `presets.ts` | no | 1 | 0 | 0 | 0 | **1** | keep | `grep -rlw AURORA_SETTLE_MS src/ demo/` → `composables/useAurora.ts`. |
| `isAuroraDriftLive` | fn | `presets.ts:344` | no | 2 | 0 | 0 | 0 | **2** | keep | → `composables/wgpuSetup.ts`, `composables/frameLoop.ts`. |
| `.configurator-shell` | class | `configurator/styles.css` | n/a | 1 | 0 | 0 | 0 | **1** | keep | `grep -n configurator-shell src/components/configurator/Configurator.vue` → `:199`. Component-scoped class, sole markup site by design. |
| `.configurator-expand-host` | class | `configurator/styles.css` | n/a | 1 | 0 | 0 | 0 | **1** | keep | same file → `:255` (the `expandable ? … : "contents"` branch). |
| **`darkModeSyncScript({ defaultDark })`** | option | `composables/dark/darkModeSyncScript.ts` | **yes (`./dark`)** | **0** | **0** | **0** | 1 | **0** | **library-orphan** | `grep -rlw defaultDark src/ demo/ tests/` → def file + `tests/composables/dark/darkModeSyncScript.test.ts` only. Minted this batch (`git grep -l -w defaultDark 074a3d0e` → 0). |
| **`darkModeSyncScript({ queryOverride })`** | option | same file | **yes** | **0** | **0** | **0** | 1 | **0** | **library-orphan** | same invocation → def + test only. Its stated purpose is a capture pipeline that reads `?dark`/`?light`; `grep -rn '?dark\|?light' demo/ scripts/` finds **no such caller** — every hit is inside the test. |
| **`darkModeSyncScript({ normalize })`** | option | same file | **yes** | **0** | **0** | **0** | 1 | **0** | **library-orphan** | `grep -rlw normalize …` returns 16 files, all unrelated homonyms (GLSL/WGSL `normalize`, `springPresets.ts`, `vite.demo-dist.config.ts`); the only `options.normalize` reader is the def file, the only caller the test. |

### F · The two named precedents, re-verified at HEAD (not assumed)

| precedent | status at HEAD | verdict | evidence |
|---|---|---|---|
| **α4 `controlSizeClass`** | **GONE — deleted by this batch** | n/a (precedent superseded) | `src/components/_shared/control.ts:13-30` records the deletion (`[2026-08-25 · BK #42 W-SEARCH]`); `src/components/_shared/index.ts` struck the re-export, keeping only `export type { ControlSize }`. Grounds on record: `SearchBar.vue` was its only call site and `SearchBar` was deleted, taking it from one caller to zero. The earlier KEEP was correct then and correctly lapsed; the two `--control-pill-h` / `--control-pill-text` CSS seams it emitted are live and untouched (`styles/utilities/components.css:33,60`, `glass/control-surfaces.css:28,56`). **Nothing to cut.** |
| **δ A4 `colorResolver`** | **NO LONGER HOLDS** | see the two rows below | `git grep -n colorResolver 074a3d0e` → the prop existed at `FourierField.vue:51` and `fourier-field/index.ts:48`. `grep -rn colorResolver src/ demo/ tests/` at HEAD → **two prose lines only** (`src/composables/color/index.ts:40,152`); `grep -n colorResolver src/components/fourier-field/README.md` → **none**. The batch's fourier-field greenfield removed the prop and with it the second site the KEEP rested on. |
| **`ColorResolver`** | type · `src/composables/color/index.ts:44` · **public `./color`** | **library-orphan** | `grep -rn ColorResolver src/ demo/ tests/ \| grep -v composables/color/index.ts` → every remaining hit is the distinct symbol `TokenColorResolver` (`composables/dom/useTokenColor.ts:37`) or prose. **Zero real sites.** `./color` maps to this barrel via `scripts/lib/subpath-policy.mjs` `COMPOSABLE_SUBPATHS.color`. |
| **`defaultBlobColorResolver`** | const · `src/composables/color/index.ts:156` · **public `./color`** | **library-orphan** | `grep -rln defaultBlobColorResolver src/ demo/ tests/` → def file + `tests/components/custom/blob/resolveColor.test.ts` only. Its own JSDoc says Blob "uses the same body internally **without** a DI seam" — i.e. the library's own substrate deliberately does not call it, and the one consumer that did (`<FourierField colorResolver>`) is gone. |

### G · Scoped out, with reasons

- `src/components/_shared/feedback/README.md` (new, +41) — a doc, not a code artefact. Its
  neighbours are live: `src/styles/index.css:211,212` import `feedback-tone.css` + `dot-ring.css`.
- 13 added `tests/` files incl. `tests/components/custom/handmark/measure-frame.ts` — consumers,
  not artefacts; `tests/` is not in `{CONSUMER_PATHS}`.
- `.expandable-container` — appears in the added-selector sweep but is **not new**
  (`git grep -c expandable-container 074a3d0e -- src/ demo/` → 7 files). Reshaped, not minted.
- `.dock-seat-label` — a false positive of the class-token sweep. `grep -n -B4 dock-seat-label run.css`
  → `:396`, inside a prose comment explaining why the class was **deliberately not minted**
  ("both would ship as a rule and a token nobody writes"). No such selector exists.
- `--icon-2xl` / `--icon-hero` (`styles/tokens/sizing.css:81,85`) — pre-existing (base=2, HEAD=2),
  survived the batch's `−481`-line `sizing.css` prune with zero in-repo consumers beyond the
  Tailwind bridge (`styles/theme/bridges.css:311,313`). **Out of batch-added scope**, and defensible
  as rungs of a complete named ladder (`--icon-xs` … `--icon-hero`) that consumers reach as
  `size-icon-2xl`. Flagged so the next full-scope sweep does not miss them.

---

## Verdict distribution

| verdict | count |
|---|---|
| `keep` | 94 |
| `keep-current` | 6 |
| `library-orphan` | **6** |
| `delete-unused` | **2** |
| `inline-and-remove` | 0 |
| `demo-only-private` | 0 |
| **total artefacts graded** | **108** |

Per-cohort: A dock 19 · B fourier-field 48 · C handmark 20 · D search 11 ·
E aurora/configurator/dark 8 · F precedents 2 (`controlSizeClass` is n/a — the artefact no
longer exists — and is not counted).

Mapped to the parent's binary: **KEEP 100 · CUT-CANDIDATE 8.**

### CUT-CANDIDATE list

| # | artefact | verdict | the exact evidence |
|---|---|---|---|
| 1 | `FOURIER_TANGENT_EPS` — `src/components/fourier-field/constants.ts:88` | delete-unused | `grep -rnw FOURIER_TANGENT_EPS src/ demo/` returns **one line, the definition**. Zero references anywhere, its own file included. Base had 3 files; the greenfield renderer orphaned it. |
| 2 | `FOURIER_STROKE_RUNGS` — `constants.ts:55` | delete-unused | Two lines, both in `constants.ts`: `:55` def, `:111` a JSDoc `{@link}`. Not on the `./fourier-field` barrel. No code validates or iterates the rungs. |
| 3 | `ringsAt` — `src/components/fourier-field/renderer/mint.ts:150` | library-orphan | Published at `index.ts:12` on `@mkbabb/glass-ui/fourier-field`; **zero** sites in `src/`, `demo/`, or any of the six siblings. Sole reader is `tests/…/FourierField.smoke.test.ts`. |
| 4 | `ColorResolver` — `src/composables/color/index.ts:44` | library-orphan | Published on `./color`; zero code sites at HEAD. Its one consumer, `<FourierField colorResolver>` (`FourierField.vue:51` at `074a3d0e`), was removed by this batch. **This retires the δ A4 KEEP precedent.** |
| 5 | `defaultBlobColorResolver` — `src/composables/color/index.ts:156` | library-orphan | Published on `./color`; zero sites in `src/`/`demo/`/siblings, one test. Its own doc states Blob does not use the DI seam. |
| 6 | `darkModeSyncScript` option `defaultDark` | library-orphan | New this batch on the published `./dark` subpath; `grep -rlw defaultDark src/ demo/ tests/` → def file + one test. |
| 7 | `darkModeSyncScript` option `queryOverride` | library-orphan | Same; the `?dark`/`?light` capture caller it exists for does not exist — `grep -rn '?dark\|?light' demo/ scripts/` finds only the test. |
| 8 | `darkModeSyncScript` option `normalize` | library-orphan | Same; every other `normalize` hit in the tree is an unrelated homonym (GLSL/WGSL, `springPresets.ts`). |

Rows 6–8 are one decision, not three: they are the three arms of a single new option object.
Triage per §3 is (b) or (c) — wire the demo/capture path that motivated them, or book a named
consumer roadmap entry. Nothing here was cut; this seat reports only.

---

## Gestalt

**The batch is strongly net-de-overfitting, and the instrument says so without being asked.**
25 deletions against 12 additions in `src/`, `−7856 / +6024` lines, the `./search` subpath cut
whole, `SearchBar.vue` gone, the 8-file handmark split folded into one `stroke.ts`, the 4-file
fourier composable layer replaced by a clock/mint/uniforms/wgpu decomposition that is smaller
than what it replaced. Eight cut-candidates out of 108 graded artefacts is a **7.4% flag rate**
on a surface that was almost entirely rewritten — the healthiest ratio in this ledger's memory.

**The flags cluster into exactly two failure modes, and both are recognisable.** The first is
*orphaning by rewrite*: `FOURIER_TANGENT_EPS` had three consumer files at `074a3d0e` and has
none at HEAD; `ColorResolver` had a prop and no longer does. Nobody minted these badly — a
greenfield reshape removed the callers and the exports stayed standing, which is what always
happens when the rewrite lands file-by-file rather than symbol-by-symbol. The second is
*minting ahead of the consumer*: the three `darkModeSyncScript` options and `ringsAt` are new,
well-designed, well-tested, and used by nothing that ships. That is the classic public-surface
overfit the audit exists to catch, and it is worth noting that all four are **fully gated** —
the tests are real and would keep passing forever over a surface nobody imports. A gate is not
a consumer, and the tests are precisely what makes this class invisible without a sweep.

**Two structural observations the mechanical rule would have gotten wrong.** First, roughly a
third of the graded rows are single-site by design: signature interfaces beside their function
(`UseDockRunOptions`, `FourierRendererDeps`, `LineOpts`), file-local CSS custom properties
(`--dock-cap-cut` and its eight reads inside `run.css`), and component-scoped classes with one
markup site (`.dock-run-status` at `GlassDock.vue:541`). Applying "1 site + not exported ⇒
inline-and-remove" literally would have produced ~30 false cuts and destroyed the very
decomposition this batch was built to achieve. The audit anticipates this — it asks for
"idiomatic gestalt judgement" and reserves `inline-and-remove` for abstractions "that don't earn"
their file. Second, a distinct and legitimate pattern appeared seven times: constants exported
**only so a gate can assert against them** — `RING_ENVELOPE`, `CAP_HEIGHT`, `ringAxes`,
`FOURIER_SETTLE_ZETA_FLOOR`, `FOURIER_PAINT_FLOOR_PX`, `FOURIER_REFERENCE_DIAGONAL_PX`,
`AURORA_DRIFT_FLOOR`. Six are graded `keep-current` on the strength of a real invariant consumer
(the seventh, `AURORA_DRIFT_FLOOR`, clears as plain `keep` — it has four production reads inside
`presets.ts` and `aurora/index.ts:22` deliberately declines to publish it). But the audit's
`keep-current` clause asks for a `docs/consumer-evidence/<artefact>.md` and **none of the six has
one**. Either the clause should recognise a named gate as evidence, or six small docs are owed.
That is a rule question for the orchestrator, not a cut.

**The precedent re-verification earned its place in the instructions.** Both named precedents
moved. `controlSizeClass` was deleted *by this batch*, on grounds the batch reached independently
via `G-OVERFIT`'s EXPORT-REACH arm — the audit converged with itself from two directions, and the
CSS seams the function emitted survived intact, so nothing was lost. `colorResolver` went the
other way: a KEEP that quietly stopped holding when the rewrite removed its only consumer, and
would have sailed through on the assumption the prompt forbade. One of two named precedents
silently lapsing inside a single batch is the argument for re-measuring rather than citing.

**One cross-cutting note outside this audit's remit.** `docs/consumer-evidence/handmark.md`
re-verified clean — atlas's three import sites are live at HEAD — but atlas imports `BRUSHES` and
`BrushName` (`atlas/src/charts/glyph/HandMark.vue:22-25`), which the HEAD `handmark/index.ts` no
longer exports, and `../bbnf-lang/playground/src/components/docs/DocsSidebar.vue` still imports
`useFuzzySearch` from the now-cut `@mkbabb/glass-ui/search`. Both are outbound breaks belonging to
the #76 consumer band, both presumably already addenda'd. Recorded here only because the greps
that measure overfitting are the same greps that see them. Separately, `vite.library.ts:25` still
states "`perfect-freehand` is vendored into `handmark/freehand.ts`" — a file this batch deleted;
the comment is stale, the `libraryExternal` list itself is unaffected.

---

## DRIVER VERIFICATION OF THE OUT-OF-REMIT CLAIMS [2026-08-29 · batch-close seat]

The seat's two sibling-edge claims were re-read on bytes before banking; one survived,
one did not:

- **bbnf-lang `useFuzzySearch`: CONFIRMED, with its pin** —
  `bbnf-lang/playground/src/components/docs/DocsSidebar.vue:4-5` imports `FuzzySearch` /
  `useFuzzySearch` / `SearchableItem` from `@mkbabb/glass-ui/search`, at playground pin
  `^3.0.0`. A FIFTH `./search` consumer edge outside value.js — MIGRATION §9.0.0's
  four-edge census takes a dated bracket, and the edge routes to the #76 band for its
  own relay addendum.
- **atlas `BRUSHES`/`BrushName`: REFUTED as an import** — both hits are prose comments
  in `atlas/src/charts/glyph/HandMark.vue:12,102` citing glass-ui's `BRUSHES` by name;
  `grep -rn "glass-ui/search" atlas/src` is empty; atlas pins `^6.0.0`. No edge, no
  route.

The `vite.library.ts:25` stale-comment finding is accepted (a deleted file cited in a
comment; `libraryExternal` unaffected) and rides the O-20 disposition wave's
housekeeping.
