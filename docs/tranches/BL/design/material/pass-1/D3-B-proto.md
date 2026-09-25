# D3 · pass 1 · D3-B · the field signal (prototype)

| field | value |
|---|---|
| seat | D3 pass 1, PROTOTYPE for family D3-B (`SPECS.md` §D3-B). Test-implements the spec on the real source |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **RUNS.** Typecheck green, library build green, every style/glass/dock/card/dialog/popover unit test green, full battery run in Chromium and Playwright WebKit |
| HEAD | tasked at `9aa2b7f9`; the worktree was cut at `3026cfc7`, and the checkout later read `bac96ae2`. `git diff --stat 9aa2b7f9 3026cfc7 -- src` touches only `components/configurator/*` and `src/index.ts`, and `git diff --stat 3026cfc7 bac96ae2 -- src demo` is empty, so the material is the tasked bytes |
| patch | `pass-1/D3-B-proto.patch` (git diff of the worktree plus the two new files as `/dev/null` diffs; 40 file diffs, 2913 lines; `git apply --check` clean on a fresh HEAD worktree). Tracked files: 38 changed, +288 −1270; new: `src/composables/glass/field/{fieldBus,reduceFrame}.ts` (332 + 257 lines) |
| engines | Chromium (Playwright build, `--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, WebGPU adapter present) and Playwright WebKit, headless, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load averages 43-64 during the runs (other seats live) |
| scratch | `S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-B-proto/`. Battery: `S/out/caps/d3b-proto/results/<id>.log`. Gestalt: `S/gestalt/` (`{head,proto}-chromium-<theme>-<width>-<scene>.png`, side-by-side pairs in `S/gestalt/pairs/`, probe readings in `S/gestalt/{head,proto}-chromium-log.json`). The worktrees `S/wt` (prototype) and `S/base` (HEAD, for the before captures) are removed |

## 0 · Findings

1. **M-2 goes fully GREEN: 560 of 560 Chromium rows, and 532 of 532 Playwright WebKit informational rows.** The research probe's only two failures (the real Dialog's muted caption, 4.20 and 3.23 over the aurora) are gone. The occluder breaker holds the Dialog unpublished while the scrim is up, so it paints the bound: Dialog muted 5.53 (light c1), 5.61 (light c0.5), 6.74 (dark c1). Lowest gated muted rows: light popover over c1 4.82, light dock over c1 4.73, dark popover over c1 4.61, dark dock over white 4.61.
2. **Registration changes what publishes.** Only `GlassDock` (live), `PopoverContent`, `DialogContent` and a glass `Card` register. The harness ladder plates are plain `.glass-*` markup, so in this prototype they are unpublished everywhere, including over the aurora: every rung paints the bound (α 0.898 light, 0.859 dark, read as painted α by W-A). In the research probe, selector discovery thinned them over the aurora. That is the spec's intended consequence, and it shows in the gestalt: the demo's plain rungs, the alert plates and the "Inspect Fourier profile" panel all read as near-opaque cream in light.
3. **The publication is exact; the harness reference leaks.** Clean-raw re-read (`node S/wb-clean.mjs S/out/builds/d3b-proto/dist`): published against painted mean under the dock, Δ 0.001 / 0.001 / 0.001 / −0.000 (light c1, light c0.5, dark c1, dark c0.5). The harness `raw` leak (S-10) is larger for this prototype than for the research probe, at −0.055 (light c1), because the dock's own contents now paint a lighter pill into `raw`. W-B's 10 FAIL rows are the leak (4 light), the 4 Playwright WebKit "no dock" rows, and 2 light step rows that are the same leak.
4. **`declareField(el)` on a media element runs in Chromium.** On the glass-material story, a `<canvas>` alternating navy `rgb(26 61 91)` and sand `rgb(245 204 132)` is declared, and a `Card` sits over it. The bus publishes lo/hi 0.0391/0.0469 on the navy phase and 0.6406/0.6484 on the sand phase. The card's plate α is 0.860 on navy and 0.273 on sand in light, and 0.52 (the floor) on navy and 0.823 on sand in dark. The veil moves to meet the static ink, as specified.
5. **At 430 wide the same card is unpublished, and correctly so.** The canvas shrinks to 310 px, so the card's 3σ-padded rect (224 + 2·48) no longer fits inside the declared medium. The two-owner rule then withholds the publication. A declared medium must exceed the surface by 3σ of its blur on every side; that is a real layout constraint on consumers.
6. **Two regressions the spec did not foresee.**
   - **The modal focus veil turns from a dim into a frost halo in light.** `--glass-focus-veil-dim` mixes `--glass-plate-overlay`, which D3-B turns from ink at 0.22 into the `--card` pole at the bound. Sampled on the light Dialog capture at (700, 680) in the veil core: HEAD `rgb(133 119 113)`, prototype `rgb(182 170 163)`, against the far scrim `rgb(137 128 124)` in both. The veil now brightens around the dialog: the sign-wrong mechanism the scrim component comments warn against. Dark moves only `rgb(28 19 16)` → `rgb(35 26 22)`.
   - **The sheet seam doubles.** It is drawn at `--glass-veil-step * 2` of the ink, and the step went 0.04 → 0.08.
7. **P-3 for the pole costs `--card` its `light-dark()` fold.** A numeric L cannot ride `light-dark()`. So `--card` and `--popover` leave the fold and become a plain per-mode pair, `oklch(var(--card-l) …)`, in `color-radius.css` and `dark-arm.css`. A color-scheme-only island (a scheme flip with no `.dark` class) no longer re-resolves `--card`. `--on-glass-muted` was already a per-mode pair and took its `-l` token cleanly. The solve derives Y = L³ (light pole 0.9238 against the exact 0.9222; light muted 0.1121 against 0.1105; dark muted 0.4944 against 0.4934, all within 0.002).

## 1 · What was built

Every item of `SPECS.md` §B.1 and §B.2, as far as it goes. The base is the research probe's diff (`D3-B-research/probe/d3b-probe.diff`, applied clean). On top of it:

| spec item | done here | where |
|---|---|---|
| Floors: light base 0.26, step 0.08; dark base 0.52 | from the probe; dark step shared | `tokens/glass.css`, `tokens/dark-arm.css` |
| The solve in `@utility glass-plate`, per theme, in encoded tone, sign term | yes. The theme constants (`--glass-ink-y`, `--glass-pole-y`, `--glass-need-{y,e}`, `--glass-pole-e`, `--glass-field-sign`, `--glass-veil-bound`) are derived once per `:root, .dark` scope from the tokens, not restated as numbers (the probe's P-3 debt is retired) | `tokens/glass.css` (new `:root, .dark` block), `glass/veil.css` |
| `--card`, `--on-glass-muted` authored as `oklch(L …)` with L its own token | yes: `--card-l` 0.9739 / 0.2949, `--on-glass-muted-l` 0.4822 / 0.7907, bytes unchanged (`#fdf5ec`, `#352a22`, `#705942`, `#c3b9ac`) | `color-radius.css`, `dark-arm.css`, `on-glass-fg.css`, `light-dark.css` (fold removed for `--card`/`--popover`) |
| Unpublished = the bound | yes, via the registered initials lo 0 / hi 1. The `:root` value-form plates `--glass-plate-{rung}` are now the pole at `--glass-veil-bound`, since a `:root` colour cannot read the field under its painter | `tokens/glass.css` |
| The luma owner: the substrate reduces its own frame | from the probe, refactored: one `createReduction(device)` shared by the aurora's `createFrameReducer` and `declareField`; a `straight` flag so a declared medium's alpha composites over the page ground while the opaque swap chain's alpha is ignored | `field/reduceFrame.ts`, `aurora/composables/wgpuSetup.ts`, `webgpu/useWebGPUCanvas.ts` (`TEXTURE_BINDING`) |
| 32×18 tiles, p05/p95 from a 128-bin histogram, mean; 3-deep `MAP_READ` ring; validity predicate | from the probe | `field/reduceFrame.ts` |
| **Component registration** (`GlassDock`, `PopoverContent`, `DialogContent`, `Card`) with `ResizeObserver`; plain `.glass-*` stays unpublished | **new.** `useFieldSurface(() => el)`: dock root when `backdropMode: "live"`, the popover content via a hidden anchor, the dialog content via its existing anchor, a card whose `surface` is glass. Pad = 3σ of the surface's own `blur()` (the dock reads `.dock-plate`'s) | `field/fieldBus.ts`, the four components |
| Registered `<number>`, `inherits: false`, initials 0/0/1; write only past ε 0.004; `data-field="published"` | from the probe | `tokens/property-regs.css`, `field/fieldBus.ts` |
| A surface no single valid publisher covers is unpublished | yes, plus a two-owner rule: another publisher reaching into the padded rect without covering it unpublishes the surface. Where several cover, a declared medium (layer 1) owns over a substrate (layer 0), and the later one in document order breaks a tie (**synthesis choice**, see §4) | `field/fieldBus.ts` |
| **The occluder breaker** (`.bg-overlay-scrim`, `.glass-focus-veil`, `[data-glass-occluder]`) | **new, with a deviation:** checked at every apply by rect intersection, not once at registration by `elementsFromPoint` (see §4) | `field/fieldBus.ts` |
| **`declareField(el)` on an `<img>`, `<video>` or `<canvas>`**; the library reduces it; cross-origin fails loud | **new.** `copyExternalImageToTexture` into an `rgba8unorm` texture, the same reduction. It re-reduces on decode and on `load` for an image, per `requestVideoFrameCallback` for a video, and per animation frame for a canvas. It resolves the withdraw function and rejects on no WebGPU or a tainted source | `field/fieldBus.ts`, exported on `/glass` with `FieldMedium` |
| No page publication by default | yes (none written) | — |
| E-1 removals: `backgroundCanvas`, the live observer, `--glass-backdrop`, `--glass-backdrop-luma-knee`, the sampler's 746 lines | **all deleted**: `useGlassBackdropLuminance.ts` (413), `backdropLuminanceSample.ts` (279), `backdropSampleMath.ts` (54), their test, `docs/consumer-evidence/use-glass-backdrop-luminance.md`, the prop and its README row, the bucket and knee tokens, the `contrast-color()` inks and bright bucket (probe), the demo's shared stage observer, `preserveDrawingBuffer` and `data-glass-field-canvas` on DockStage, every `:background-canvas` binding in 5 stories, `StoryHero`'s bucket write | as listed |
| Floor row 1: `contain: paint` goes | from the probe | `glass/material.css` |
| Floor row 4: `backdropMode: "static"` stays the level-0 escape | yes; a static dock never registers | `GlassDock.vue` |
| Floor row 5: the well is an unpublished rung, `--card` toned 8% toward ink | **not changed.** `.glass-well` already paints `--card` toned 8% toward `--foreground`, opaque, with no backdrop filter. It is never registered, so it is already "unpublished"; making it a `glass-plate` at the bound would only let 10% of the host plate through. Left as is, and marked unmeasured, as the spec says | — |
| D-1: the thick→thin step dressed by weight | rides the rungs' existing `background-color var(--spring-press-duration) var(--spring-press)` transition (`glass/ladder.css:65-67, 91-92`); not separately measured | — |
| The demo's glass-material story | the live-sampler section becomes the declared-field section (§0 item 4) | `demo/stories/substrates/glass-material.vue` |

Tests changed with the mechanism:
- `GlassDock.backdrop-mode.test.ts` now asserts that the live dock registers its root and the static dock registers nothing.
- `glass-subtlety.test.ts`: the two retired ink-veil laws (the 0.20 content-band ceiling, and dark = light base + one step) are replaced by the D3-B floor table and "dark re-declares no step".
- `contrast-computed.test.ts`'s resolver substitutes a numeric channel token inside `oklch()`.
- `tests/setup.ts`: a comment only.

## 2 · Build, typecheck, unit tests (commands run in `S/wt`)

| command | result |
|---|---|
| `npm run typecheck` (both projects) | exit 0 (final tree). The test project needs `dist/` for the `@mkbabb/glass-ui/fourier-math` self-import; before the first build it reported 2 TS2307, which is environmental |
| `npx vite build --config vite.wrap.config.mts` (the repo config with `cacheDir` inside the worktree) | exit 0, "✓ built", `glass-ui:ready` tuple complete (`S/build.log`, `S/build2.log`) |
| `npx vitest run tests/styles tests/composables/glass tests/components/custom/dock tests/components/card tests/components/dialog tests/components/popover tests/public-surface.spec.ts` | 58 files, 781 passed, 6 expected-fail, 0 failed |
| `npx vitest run` (the whole suite) | 17 failed of 2327, below |

The whole-suite failures, sorted:

| failure | count | cause |
|---|---|---|
| `use-accent-tone.test.ts` | 5 | **real break.** The test reads `--card` out of the token file with a regex, and `accent-tone-solve.ts:29` keeps `DEFAULT_SURFACE = "hsl(30 85% 96%)"` as a literal twin of `--card`. The new form `oklch(var(--card-l) …)` is not a colour the solver parses (`GlassColorError: solveAccentInk:surface: css_syntax`). It is a second restatement of `--card` (P-3) that D3-B's pole authoring now falsifies. The cure derives the default from the token, not a literal |
| `wgsl-splice-contract.test.ts` | 1 | **real.** The WGSL census does not list the new `[field] reduce.wgsl` module |
| `orphan-css-partial.test.ts` | 1 | real, **cured**: the solve-constant block was `:where(:root, .dark)`, which the gate reads as unlayered; it is now `:root, .dark` (the gate's token-root pair) |
| `overfit-structure.test.ts` | 1 | real, **cured**: `TX`, `TY`, `registerFieldSurface` were exported with no outside site; made module-private |
| `boot-graph.test.ts` | 3 | environmental: `dist-demo/` was built outside the worktree (`S/demo-wt`) |
| `glass-subtlety` grasp (4), `aurora/atoms` fuzz (1), `menu/contract` (1) | 6 | load timeouts (5000 ms at load 43-64). HEAD (`S/base`) times out on the same grasp and atoms tests; all three files pass with `--testTimeout=60000` in the prototype (72 of 72) |

## 3 · The battery (`D3_OUT=S/out node harness/run.mjs S/wt --label d3b-proto`)

Chromium is the gate. Playwright WebKit rows are informational and paint-only, and they run `nodock=1`. Real Safari is UNMEASURED (owner's safaridriver checkbox) in every row. HEAD figures are `HARNESS.md` §3; research-probe figures are `SPECS.md` §B.3.

| witness | HEAD | research probe | **prototype, Chromium** | **prototype, Playwright WebKit** |
|---|---|---|---|---|
| M-1 no grey | FAIL 11/11 | FAIL 11/11 by 0.001 | **FAIL 11/11.** Every plate `#fdf5ed` L 0.974 ΔE 0.016 (floor 0.975); opaque `#fdf5ec`; dock `#fcf5ed`. **The real Dialog `#f7efe6` L 0.956 ΔE 0.032**: the bound α over the scrim-dimmed paper | FAIL 10/10, same bytes; Dialog `#f6efe6` L 0.955 |
| M-2 text | FAIL 169/560 | FAIL 2/560 | **PASS 560/560.** Light: paper muted ≥ 6.08, c1 muted ≥ 4.82 (popover), c0.5 ≥ 5.26, black ≥ 4.83, checker ≥ 5.46, stripes ≥ 5.37; Dialog ≥ 5.32 on every ground. Dark: c1 muted ≥ 4.61 (popover), c0.5 ≥ 4.98, white ≥ 4.61, Dialog ≥ 6.27 | PASS 532/532 |
| M-3 non-text | FAIL 237/266 | FAIL 209/266 | FAIL 203/266. Well perimeter 2.79 light paper (2.62 over black); rings 2.84-2.94; Dialog Close ring 2.84-2.91 (HEAD 1.80). Static ink by design | informational FAIL |
| M-4 dock register | FAIL 14/14 | FAIL 14/14 | FAIL 14/14: fg = muted = `#705942` light (S-9) | dock UNMEASURED in Playwright WebKit |
| M-5 live dock | FAIL 6/16 | PASS 16/16 | **PASS 16/16.** 0 `getImageData`, 0 `readPixels` in all 8 windows of 9 s; dock fg/muted 4.70/4.73 (light c1), 4.83/4.87 (light c0.5), 5.18/4.95 (dark c1), 5.15/4.87 (dark c0.5) | dock UNMEASURED |
| M-6 separable ladder | FAIL 14/19 | FAIL 8/19 | FAIL 8/19: adjacent ΔE 0.000 over paper in both themes (every rung unpublished, at the bound); dark plates `#2f251e` 0.129 from the page, Dialog `#322820` 0.141 (green) | FAIL 8/18 informational, same shape |
| M-7 halos whole | FAIL 8/8 | PASS 8/8 | **PASS 8/8** | PASS 8/8 |
| M-8 chrome calm | FAIL 8/8 | PASS 8/8 | **PASS 8/8.** C 0.0200-0.0205 light, 0.0325-0.0331 dark; Dialog 0.0169 / 0.0270; bleed 1.01-1.04 | FAIL 3/8 informational: dark stripes bleed 1.29 (no backdrop blur in Playwright WebKit) |
| **W-B** (this family) | FAIL 20/24 | FAIL 7/24 | FAIL 10/24 as the harness reads; **GREEN on a clean raw** (§0 item 3). Readbacks 0 in all 8 windows. Latency 2 frames on all 4 dark steps; the 4 light steps settle 0.490 / 0.237 against the leaky 0.519 / 0.292. Clean re-read Δ ≤ 0.001 on all four cells | 4 rows "no dock" (no `navigator.gpu`, dock crashes the page) |
| W-A | FAIL 68/197 | FAIL 11/197 | FAIL 10/197: painted α 0.898 (light) / 0.859 (dark) exceeds W-A's thin bound 0.745-0.760 / 0.610-0.655; Dialog 0.972 / 0.953. Another family's witness | same |
| W-C, W-D, W-E, W-F | FAIL | FAIL | FAIL 257/304, 6/9, 152/360, 75/152. Other families' witnesses | — |

## 4 · Deviations from the spec, each a synthesis choice

1. **The occluder breaker checks rect intersection at every apply**, not `elementsFromPoint` at registration. Hit testing skips `pointer-events: none` layers (the focus veil is a hidden `<span>`), and a popover is positioned by floating-ui after mount, so a registration-time hit test reads the wrong point. The cost is one `querySelectorAll` per frame while a publisher lives. It is conservative: a dock under an open Dialog is also unpublished.
2. **Ownership between publishers** is by layer (a declared medium over a substrate), then by document order, with no hit test. The same `pointer-events: none` problem made the hit test pick no owner on the demo, where both the aurora and the declared canvas are `pointer-events-none`. A `z-index` can invert document order; that is a named gap.
3. **`declareField` resolves a Promise** of the withdraw function, and "fails loud" by rejecting (no WebGPU, no adapter, a tainted source). A synchronous call cannot throw for an asynchronous taint.
4. **A declared canvas re-reduces every animation frame**, because the library cannot see when a consumer repaints it. The cost is unmeasured.
5. **The `:root` value-form plates** (`--glass-plate-{rung}`, consumed by about 20 sites: menus, sheets, control surfaces, the capsule, the focus veil) are set to the bound. The spec does not mention them; leaving them as ink-at-floor would have darkened every consumer to a 0.26-0.42 ink.

## 5 · Gestalt (Chromium, `node S/gestalt.mjs {head,proto} S/demo-{base,wt} S/gestalt chromium`)

24 captures per build: light and dark × 1440 and 430 × six scenes. Each theme runs over paper (Dialog, Popover) and over the aurora (glass-material, dock stage, carousel with the shell sidebar or bottom dock). Zero page errors in either build. HEAD is on the left of each pair in `S/gestalt/pairs/`.

- **Glass-material, light 1440** (`pair-light-1440-glass-material.png`).
  - HEAD: tan and pink tinted plates, grey-brown alert plates, a grey stadium dock.
  - Prototype: the plain rungs (wash, quiet) and the five alerts are near-opaque cream cards, the ladder visibly collapsed. The bottom dock is cream; the sidebar is a cream frost at its 0.18 floor (published lo 0.555 / hi 0.664, painted α 0.463 on the page's hero field).
  - The declared-field card reads as a thin sand frost on the sand phase.
  - The page reads cleaner and more legible, and less like glass.
- **Glass-material, dark 1440**. HEAD's plates are brown-black smoke; the prototype's are warm dark-brown cards at the bound. The published sidebar sits at α 0.597, and the declared card's frost over sand is 0.82.
- **Dock stage, light 1440** (`pair-light-1440-dock.png`). HEAD's docks are grey stadiums with a darker grey active pill. The prototype's are cream frosts over the pink-amber field; the collapsed pill reads as a cream coin. Legibility holds (M-5 4.70-4.87).
- **Dialog over paper, light 1440** (`pair-light-1440-dialog.png`).
  - HEAD: the smoke-brown slab, caption and Cancel near invisible (S-8).
  - Prototype: a warm card, and every text run legible (M-2 Dialog muted 5.72 over paper).
  - It also shows **a bright frost halo** around the plate: the focus veil regression (§0 item 6).
  - Dark: nearly unchanged, a slightly lighter brown card.
- **Popover over the pale aurora, light 1440** (`pair-light-1440-popover.png`). HEAD's panel is a grey-brown tint; the prototype's is a cream frost at its 0.34 floor (published lo 0.797). Page text under it shows through blurred. That text was not reduced by the aurora, so it is exactly the undeclared-content case the publication cannot see (`D3-B §5` item 1): here harmless under a 20 px blur, not measured in general.
- **Carousel with the bottom dock, dark 430** (`pair-dark-430-sidebar-aurora.png`). The prototype's bottom dock is published (α 0.44 floor) with a visible lighter active pill ("Carous"). HEAD's active tab had no pill contrast. The peek-scroller's unregistered panel is a lighter brown card at the bound.
- **At 430 the gestalt probe's dock readings** show "unpublished" only because the probe picked the hidden sidebar dock (0×0). A direct check (`node S/diag430.mjs S/demo-wt`) shows the visible bottom dock `data-field="published"` at 430 on both aurora routes.

**Playwright WebKit gestalt: UNMEASURED.** `node S/gestalt.mjs proto S/demo-wt S/gestalt webkit` produced no capture in about 25 minutes and was stopped (exit 144). Every demo route mounts the shell `GlassDock`, which crashes Playwright WebKit (S-11). The WebKit paint numbers above come from the harness, which runs WebKit with `nodock=1`. Real Safari: UNMEASURED (owner's safaridriver checkbox).

## 6 · Every break, in one list

1. M-1 RED: the `--card` pole at the bound is L 0.974 against a 0.975 floor (S-6). The real Dialog at the bound over its scrim is L 0.956 (new reading).
2. M-6 RED: every unpublished rung is one α, so adjacency is 0.000 over paper in both themes. Light is infeasible for any pole (S-7).
3. M-3 and M-4 RED: static ink, by design (S-9).
4. W-B RED as the harness reads, GREEN on a clean raw: the harness `raw` leak (S-10), now −0.055 in light c1.
5. The focus-veil dim becomes a frost halo in light (`--glass-focus-veil-dim` reads `--glass-plate-overlay`).
6. The sheet seam doubles (`--glass-veil-step * 2`).
7. `--card` and `--popover` leave the `light-dark()` fold: no re-resolution in a color-scheme-only island.
8. `useAccentTone`'s literal `DEFAULT_SURFACE` twin of `--card` and its token-file regex break (5 tests).
9. The WGSL census does not list `[field] reduce.wgsl` (1 test).
10. The ladder look collapses on every unregistered `.glass-*` plate: in light, near-opaque cream cards, even over the aurora.
11. A declared medium must exceed its surfaces by 3σ on every side, or they fall to the bound (seen at 430).
12. The Playwright WebKit dock crash (pre-existing) blocks every WebKit dock row and the WebKit gestalt.
13. Prose debt, not paint: stale comments that still name the bucket in `ladder.css:2,172`, `deep.css:28`, `surfaces-pager.css:34`, `shell.css:136`, `adaptive-legibility.css:21,51`, `glass.css` (`--dock-fg-on-aurora` note), `dock.css:106`, the glass-material story's alert-section comment and blurb, and the manifest description ("observer-driven earned darken").

## 7 · Open gaps

- Real Safari: WebGPU reduction, `mapAsync` latency, `TEXTURE_BINDING` swap-chain alpha, `copyExternalImageToTexture`, `pow()` in the solve: UNMEASURED (owner's safaridriver checkbox).
- Integrated GPUs: no hardware here.
- The WebGL2 arm and the aurora image arm, `useAurora` (value.js), blob and constellation: no reduction written; they stay at the bound.
- `declareField` on `<img>` and `<video>` is written but not exercised; only `<canvas>` was measured. The canvas path's per-frame cost is unmeasured. Cross-origin rejection is not re-measured here (research `Q4` measured the `SecurityError`).
- `object-fit`, `transform` and `z-index` on a declared medium are not modelled: tiles map to the element's box.
- The undeclared-content falsification under registered surfaces (a Card or Popover over page text over an aurora) is unmeasured.
- The unpublished well is unmeasured (spec's own addition).
- The thick→thin step at cold start (about 347 ms pipeline compile, research) is dressed only by the rungs' existing press-spring transition; no capture of it.
- A pointer-driven field (the gel pulse) against the 2-frame window: unmeasured.
- The M-4 register (S-9) and the light-ladder battery conflict (S-7) are decisions outside this family.
