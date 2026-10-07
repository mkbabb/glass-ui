# W-L.4 · W-DRAG-MORPH-SETTLE: a press on the active pill stays put, and the fork's fixes land upstream · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b3d7fa28` in a scratch worktree. `git diff --stat v10.1.0 HEAD -- src package.json tests scripts .github` prints nothing, so every reading measures the published 10.1.0 bytes. `npm run build` exit 0; `npm run demo:dist:build` exit 0; the built demo served by `vite preview` on :6411 |
| ships in | 11.0.0 |
| families | F-69 whole (`audit/REGISTRY.md:1467-1476`): L06-02, R2-04-05 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| engines | Chromium (Playwright's bundled build) is the gate engine. Playwright WebKit crashed the page on `/navigation/tabs` at HEAD (`page.goto: Page crashed`, appendix A), so its cells are recorded as a crash, not as a reading. Real-Safari cells are UNMEASURED until W-A.6's step 0 (OW-3) |

## 1 · What it closes

| id | defect |
|---|---|
| L06-02 | scaena runs a vendored 8.0.3 (`scaena/apps/web/package.json:13`, `file:../../vendor/npm/mkbabb-glass-ui-8.0.3.tgz`) whose drag-morph fixes exist only as uncommitted edits in a detached worktree (`/Users/mkbabb/Programming/.worktrees/glass-ui-segmented-tabs-8.0.2` at `e73ec80c`: 25 status entries, `git diff --stat` 23 files, 376+/45−, re-read here) |
| R2-04-05 | the first press on the active pill throws the indicator by the pointer's `clientX` for as long as it is held |

Each leg of the fork diff gets a terminal here (§3.5), so nothing in the fork is left undecided when scaena drops it.

## 2 · The defect at HEAD

Source, `src/composables/motion/morph/useDragMorph.ts`:

- `:335-339` `onPointerDownCapture` seeds `dragOrigin.value = ensureSpring().value`. On the first gesture the spring's value is 0. kf's `Draggable.handleDown` then resets the spring to the pointer coordinate (R2-04-05's read of `keyframes.js:559-567`), and the subscriber at `:196-203` offsets the indicator by `v − dragOrigin`, which is the pointer's `clientX`.
- `:207-218` the commit fires only from the spring's subscriber when it reports `settled`. A zero-distance press whose spring is already at its target emits no further frame, so the gesture channel is never closed and the next press starts from a stale origin.
- `useDragMorph` returns no `interrupt` (the return object at `:404-413`), and `tabs/SegmentedTabs.vue:136` `onSelect` does not stop a live fling before the model write.

The HEAD probe (appendix A, `f69-first-press.mjs`, Chromium, 1280×800, the first draggable pill strip on `/navigation/tabs`, "Grid · List · Kanban · Timeline", Grid selected):

| arm | light | dark |
|---|---|---|
| press 1 on the active pill, held 350 ms, no movement | indicator moved **182.87 px** while held, still **182.87 px** off 1.5 s after release; selection unchanged (0 → 0); indicator not over the selected tab | same |
| press 2, same | held 0 px, then **192.5 px** after release, and the selection changed **Grid → Timeline** with no pointer movement | same |
| press 3 | selection stays Timeline; the indicator is not over it | same |
| drag toward the last tab, release, click tab 1 | the selection ends on tab 1, but the indicator is not over it (x = 602-603 against tab 1 at 211-266, separate timing probe) | same |

The check that fails in every arm is "the indicator's centre lies inside the selected tab's box". It passes at rest on a fresh load (cx 182.87 inside 155-210.73) and after an ordinary click on tab 2 (cx 306.55 inside 265.61-347.5), so it can pass. Capture: `<scratch>/formation/band-L/out/f69-head-chromium-light-press1-held.png` (sha256 `5cd9c670e08389098ddf66d9355469b66192334ab36b2b4bb73ae59e4243e3e7`): the lozenge sits on Timeline while the caption reads "selected: grid".

R2-04-05 measured 633.95 px at its viewport; the figure is the pointer's `clientX`, so it moves with the layout. The second-press selection change was not in R2-04-05's reading (it reported 0.0 px for the second press); this seat's probe reads the selection, not only the displacement.

## 3 · The cure

### 3.1 The origin is the pointer coordinate

`onPointerDownCapture(event)` seeds `dragOrigin` from the pointer coordinate on the drag axis (`event.clientX`, or `clientY` for a vertical strip). kf's `Draggable` resets the spring to that same coordinate immediately after, so a press starts at delta 0 and a drag stays 1:1. This is the fork's line (`useDragMorph.ts` in the fork, the `onPointerDownCapture(event: PointerEvent)` hunk), taken as is. The alternative the registry named, passing kf a transform, adds a second coordinate system to kf's API for one caller; it is not taken.

### 3.2 One closer, through the end-of-gesture helper

The gesture closes through W-F.2's `useGestureEnd` release path, not through the spring's frame stream. On release (and on each of the helper's cancel signals), the closer runs once after kf's own pointerup has re-seated the spring: if the spring is settled or already at its snap target, it resolves the nearest target and commits. The commit writes the model only when the resolved value differs from the current model value, so a press with no movement writes nothing. The frame-stream commit at `:207-218` is deleted; one closer remains. The fork's `settleGesture` (`value === activeSpring.target` as "arrived") is the rule this closer applies.

### 3.3 A newer choice interrupts the fling

`useDragMorph` returns `interrupt()`: it clears the gesture state, stops the spring and releases the morph offset. `SegmentedTabs` calls it in `onSelect` before the model write, so an ordinary click or key selection made while a fling is in flight owns the result, and the indicator re-targets from its painted position (W-F.2's re-target rule). The fork's `interruptDrag` shim (`let interruptDrag = (): void => {}`, re-bound after the drag owner is built) is not copied: `useTabDragMorph` is assembled before `useSelectionGroup` so `onSelect` reads `drag.interrupt` directly, with no late-bound function variable.

### 3.4 The paint agrees with the model

One invariant covers all three: after any press, drag, fling or interrupt, once motion has settled, the indicator's centre lies inside the selected tab's box. It is the gate G-L4-1, and it is the born-RED e2e the registry asks for.

### 3.5 Every leg of the fork, decided

| fork leg (file in `e73ec80c`'s diff) | terminal | rationale |
|---|---|---|
| `useDragMorph.ts`: pointer origin, `settleGesture` closer, `interrupt()` | BUILD here (§3.1-§3.3) | the defect is live at HEAD (§2) |
| `SegmentedTabs.vue`: interrupt on non-drag select | BUILD here (§3.3), without the late-bound shim | same |
| `collapsible/Collapsible.vue`: `open: undefined` default | LANDED at HEAD | `collapsible/Collapsible.vue:22-29` carries `open: undefined` with its reason |
| `input/types.ts` and `html-attributes.d.ts`: `enterkeyhint` as a hand-written enum | RETIRED; replaced by a peer-floor fix (§3.6) | the fork copies Vue's union into glass, a second source for one platform type. The defect it answers is real: `InputHTMLAttributes["enterkeyhint"]` does not exist before Vue 3.5.25 (measured: `@vue/runtime-dom` 3.5.0, 3.5.13, 3.5.18, 3.5.22, 3.5.23, 3.5.24 declare 0 `enterkeyhint?:`; 3.5.25, 3.5.26, 3.5.30, 3.5.34 declare 1). The cure is to state the floor |
| `package.json` `dependencies: @types/web-bluetooth`, `flatten-subpath-types.mjs` prepending `/// <reference types="web-bluetooth" />` | RETIRED | reka-ui and `@vueuse/core` alone reproduce it: a fixture importing only `reka-ui` and `@vueuse/core` under `types: []` reports the same four `TS2304` (`BluetoothRemoteGATTServer`, `BluetoothDevice`, `BluetoothServiceUUID`, `BluetoothLEScanFilter` in `@vueuse/core/dist/index.d.ts`). It is vueuse's declaration, not glass's |
| `verify-export-types.mjs`: compile the declaration entries with `types: []`; type-reference directives owned by their `@types/*` package | BUILD here as the declaration-floor fixture (§3.6), not in `verify-export-types.mjs`, which W-L.3 deletes | glass's own entries must close every ambient type they name. At HEAD they do not under TypeScript 5.9 (§3.6) |
| `tabs/styles/segmented.css`: `min-block-size: var(--touch-target)` on `.segmented-tab` | RETIRED in favour of W-E.7 §6 | W-E.7 gives coarse hit areas through a `::after` of `max(100%, var(--touch-target))` without changing the box; a taller tab box would move the indicator geometry this wave pins |
| `styles/glass/material.css`: one comment line | RETIRED | comment prose; W-C.2 governs comments |
| `tests-visual/tabs-std.spec.ts` (+133), `disclosure-rotate.spec.ts`, the contract tests | harvested | the tabs spec's first-press and interrupt arms fold into G-L4-1's spec; the Collapsible and Input contract arms are covered by HEAD's contract tests or by §3.6's fixture |
| `.bundle-ratchet`, `package.json` version 8.0.3, the BA/BB PNGs | RETIRED | fork bookkeeping |

Step 0, before scaena prunes anything (L06-02's order): the fork's full diff is written to `.cache/evidence/W-L.4/fork-e73ec80c.patch` with its sha256 in the wave record. The fork is a sibling tree: glass reads it and never writes it.

### 3.6 The declarations close at their stated floors

Measured with a packed consumer fixture (`npm pack` of the worktree, installed with `vue`, `reka-ui@2`, `@vueuse/core@14`, `vue-component-type-helpers@3`; `tsconfig` strict, `skipLibCheck: false`, `types: []`), counting errors in files under `@mkbabb/glass-ui/`:

| vue | typescript | glass-owned errors |
|---|---|---|
| 3.5.24 (inside the `^3.5` peer) | 6.0.3 | 1: `dist/components/input/types.d.ts(22,40) TS2339 'enterkeyhint' does not exist on type 'InputHTMLAttributes'` |
| 3.5.25 | 5.9.3 | 0 for `./input` |
| 3.5.24 | 5.9.3, root import | 8: `GPUDevice` ×2, `GPUTextureFormat`, `GPURequestAdapterOptions`, `GPUDeviceDescriptor`, `GPUCanvasContext`, `GPUCanvasAlphaMode` (`dist/composables/glass/webgpu/webgpuCanvasTypes.d.ts`), `GPUAdapterInfo` (`rendererStatus.d.ts`) |
| 3.5.24 | 6.0.3, root import | 0 |

TypeScript 6.0's `lib.dom.d.ts` declares the WebGPU interfaces (`typescript/lib/lib.dom.d.ts:15601 interface GPUDevice`); 5.9 does not. Three consumers run 5.9.3 (atlas, slides, scaena, read from their `node_modules/typescript/package.json`). The cure states both floors and adds no second source:

- `peerDependencies.vue` `^3.5` → `^3.5.25`.
- `peerDependencies.typescript` `>=6.0`, marked optional in `peerDependenciesMeta` (a consumer that does not type-check is unaffected). `@webgpu/types` is not added: it declares the same globals as TypeScript 6's `lib.dom` and would collide with it.
- The fixture `tests/_support/declaration-floor/` compiles every declaration entry with `types: []` and `skipLibCheck: false` at the floor versions: the fork's check upstreamed, in one place (G-L4-4). W-L.3's consumer matrix runs it as its types leg and deletes `scripts/verify-export-types.mjs` with `verify:package`, so this wave edits neither; W-L.3 lands after this wave (PLAN §5).

## 4 · Files it touches

`src/composables/motion/morph/useDragMorph.ts`; `src/components/tabs/SegmentedTabs.vue`, `src/components/tabs/composables/useTabDragMorph.ts`; `package.json` (the two peer floors); `README.md` (the peer table); `MIGRATION.md`, `CHANGELOG.md`. New: `tests-visual/wired/drag-morph-settle.spec.ts` (appendix A promoted), `tests/_support/declaration-floor/` (the fixture of §3.6).

## 5 · Acceptance gates

Each gate's exit code is read on its own.

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L4-1 · the press and the interrupt | `node tests/_bandL/f69-first-press.mjs` (appendix A) against the built demo, Chromium | exit 0: for each of three presses on the active pill, \|Δx\| < 1 px held and 1.5 s after release, the selection unchanged, the indicator over the selected tab; after drag-release-click, the selection is tab 1 and the indicator is over it; light and dark | **exit 1**: press 1 held 182.87 / after 182.87 px; press 2 after 192.5 px with selection 0 → 3; every arm `seated: false`, both themes |
| G-L4-2 · the gate can pass | the same probe's `seated` read at rest on a fresh load and after an ordinary click on tab 2 | true both times | holds at HEAD: cx 182.87 in [155, 210.73]; cx 306.55 in [265.61, 347.5]. A control, not counted as born RED |
| G-L4-3 · one closer | `test "$(grep -cE 'onSnap\??\.?\(' src/composables/motion/morph/useDragMorph.ts)" = 1 && grep -q 'useGestureEnd' src/composables/motion/morph/useDragMorph.ts` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 1 file, first `useDragMorph.ts:44`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: `onSnap` has one call site today, inside the frame subscriber, and `useGestureEnd` does not exist (W-F.2 creates it). The count clause holds at HEAD; the helper clause fails |
| G-L4-4 · the declarations close at the floors | `node tests/_support/declaration-floor/run.mjs`: installs `vue@$(semver.minVersion(peer vue))` and `typescript@$(semver.minVersion(peer typescript))` into the fixture, compiles the root and every subpath's declarations with `types: []`, `skipLibCheck: false`; counts errors in files under `@mkbabb/glass-ui/` | exit 0 with 0 glass-owned errors, and `peerDependencies.typescript` present | **fails**: no `typescript` peer; at vue 3.5.24 (inside `^3.5`) 1 glass-owned error, at TypeScript 5.9.3 8 (§3.6). The same fixture at vue 3.5.25 + TypeScript 6.0.3 reads 0, so it can pass |
| G-L4-6 · the fork banked | `shasum -a 256 .cache/evidence/W-L.4/fork-e73ec80c.patch` equals the sha256 in the wave record, and the patch's `diff --stat` tail reads `23 files changed, 376 insertions(+), 45 deletions(-)` | both | **fails**: no patch banked |

G-L4-1 lands in the wired visual suite (W-A.3) and in W-A.2's roster. Real-Safari: UNMEASURED.

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| `/navigation/tabs`, the first draggable pill strip, press 1 held at 350 ms | light, dark | Chromium; Playwright WebKit (crashed at HEAD, recorded as a crash) | before: `f69-head-chromium-{light,dark}-press1-held.png` (this seat; the wave re-takes them on its base); after: the same frame on the wave's last commit | G-L4-1's JSON beside each PNG (`held`, `after`, `selected`, `seated`) |
| the same strip after drag, release and a click on tab 1 | light, dark | Chromium | before and after at +1.5 s | the `interrupt` object of G-L4-1 |

Every PNG and JSON goes under `.cache/evidence/W-L.4/` (the one scratch root, F-61), with sha256 in the wave record. The DELTA is the pair; a claim without the pair is not a close.

## 7 · MIGRATION rows (11.0.0)

| removed or changed | successor |
|---|---|
| peer `vue` `^3.5` | `^3.5.25`: the declarations read Vue's `InputHTMLAttributes["enterkeyhint"]`, which Vue declares from 3.5.25 |
| no declared TypeScript floor | optional peer `typescript` `>=6.0`: the declarations name WebGPU interfaces that TypeScript's `lib.dom` declares from 6.0. A consumer on 5.x with `skipLibCheck: false` upgrades TypeScript; `@webgpu/types` beside TypeScript 6 collides with `lib.dom` and is not the successor |

`useDragMorph`'s `interrupt` is additive (CHANGELOG line). W-L.6 decides whether `useDragMorph` stays published (it has no reader outside `src`, appendix B of W-L.6).

## 8 · Ledger rows

Closes F-69 (L06-02, R2-04-05) with each fork leg's terminal in §3.5. The census holds no row for F-69 (`ledger/CENSUS.md:57`), so the LEDGER seat writes one row from this spec. W-L.7's scaena packet carries "drop `vendor/npm/mkbabb-glass-ui-8.0.3.tgz` and its README at the 11.0.0 repin"; the repin is scaena's own act (E-6).

## Appendix A · the probe (`tests/_bandL/f69-first-press.mjs` in the scratch worktree)

```js
// three presses on the active pill (350 ms hold, no movement), then drag → release → click tab 1
const seated = () => page.evaluate((sel) => {
  const ind = document.querySelector(sel);
  const tab = ind.closest(".segmented-tabs").querySelector('.segmented-tab[aria-pressed="true"]');
  const a = ind.getBoundingClientRect(), b = tab.getBoundingClientRect();
  const cx = a.x + a.width / 2; return cx >= b.x - 1 && cx <= b.right + 1;
}, IND);
// per press: held = x(350 ms) − x(rest); after = x(release + 1.5 s) − x(rest); selected [before, after]; seated
// fail if |held| ≥ 1 || |after| ≥ 1 || selection changed || !seated; interrupt arm fails if end ≠ 1 || !seated
```

`IND` is `.segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical) .segmented-indicator.glass-drag-grabbable` (the selector of `tests-visual/drag-morph.spec.ts:62`).

Output at HEAD (Chromium):

```
{"light":{"presses":[{"held":182.87,"after":182.87,"selected":[0,0],"seated":false},
                     {"held":0,"after":192.5,"selected":[0,3],"seated":false},
                     {"held":0,"after":0,"selected":[3,3],"seated":false}],
          "interrupt":{"start":0,"clicked":1,"end":1,"seated":false}},
 "dark": { …identical… }}
EXIT 1
```

`ENGINE=webkit`: `page.goto: Page crashed` on the first navigation (Playwright WebKit, exit 1).
