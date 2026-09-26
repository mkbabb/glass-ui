# D3 · pass 1 · D3-F · prototype (the yielding field)

| field | value |
|---|---|
| seat | D3 pass 1, PROTOTYPE for family D3-F. Test-implements `SPECS.md` §D3-F on the real source |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`. The worktree was cut at the checkout's HEAD, which read `a348aa88`. `git diff --stat 9aa2b7f9 a348aa88 -- src` touches only `src/components/configurator/*` and `src/index.ts` (117 insertions), none of the material, dock, aurora, blob or tokens, so every HEAD reading holds |
| verdict | **RUNS.** Typecheck green, the whole unit suite green, library and demo builds green, the battery ran on both engines, gestalt captured before and after. Parts of the spec that did not go in are listed in §2 as SPEC-ONLY |
| engines | Headless Chromium (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, WebGPU adapter present) and Playwright WebKit, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| patch | `pass-1/D3-F-proto.patch`: 62 file diffs, +318 −2099 (src +243 −1016). `git apply --check` passes against a clean `git archive a348aa88` tree |
| scratch | `…/scratchpad/D3/p1/D3-F-proto/`: `out/caps/f3` (battery, `results/*.log`), `gestalt/` (80 PNGs + `pairs/` side-by-sides), `vitest-all.log`, `typecheck.log`, `build-*.log`, `gestalt.mjs`, `probe-overflow.mjs`, `probe-bound.mjs` |
| load | load averages 9-28 during the runs |

## 0 · Result in one paragraph

The prototype starts from the research probe (`D3-F-research/probe/F-probe.patch`) and carries it to the spec's strongest form where that could be built in one seat: the well is one function in both shading languages (`composables/glass/fieldWell/shader.ts`), spliced into the aurora palette **and** image pipelines and the blob, on both GPU arms; the registry fails loud past 16 rects, tests paint order, reads a clipped plate's visible extent, and drops rects nested inside another; `--glass-veil-ink` is renamed `--glass-veil-pole`; the sampler, its tests, its demo mounts and its prose are gone. The battery reads exactly the research probe's verdicts: **W-F, M-5 and M-7 GREEN** in Chromium, W-F's Playwright WebKit leg green; M-1, M-2, M-3, M-4, M-6 and M-8 RED for the reasons the spec names. The gestalt read shows the light ladder turning into cream frost over paper and aurora, the Dialog losing its smoke-brown slab, and three costs the witnesses do not read: a light page's glass structure flattens into the paper, light active-state pills vanish, and in dark every plate becomes a dark pocket cut into a light aurora.

## 1 · What was built (worktree only)

| part | files | what it does |
|---|---|---|
| registry | `src/composables/glass/fieldWell/registry.ts` (289 lines, new) | The probe's registry plus the spec's items 2-6. **Visible extent:** an element whose computed `clip-path` is `inset(…)` is shrunk by it per frame (the dock plate). **Radius clamp** to half the short side of the visible rect. **Z-order:** a canvas inside the glass never yields to it; a canvas whose nearest z-indexed ancestor sits below zero is a backdrop under all glass; otherwise tree order decides. **Nesting:** a rect inside another's straight-edged interior is dropped (max composition makes it inert). **Bound:** past 16 kept rects, `onFieldWellOverflow(canvas, report)` fires once per episode. **Missing band:** glass over a substrate with `--field-well-*` undeclared throws |
| shader | `src/composables/glass/fieldWell/shader.ts` (133 lines, new) | `fieldWellWGSL(group, binding)` and `FIELD_WELL_GLSL`: the probe's function with its own `fw_` OKLab pair, so it depends on nothing in the host shader. `fieldWellPx()` flips `gl_FragCoord` to top-left |
| upload | `registry.ts` | `packFieldWell(canvas, scratch)` (the 352 B WebGPU block) and `uploadFieldWellGL(gl, loc)`, shared by every arm |
| aurora | `aurora.wgsl.ts`, `aurora.frag.ts`, `aurora-image.wgsl.ts`, `aurora-image.frag.ts`, `wgpuSetup.ts`, `frameLoop.ts`, `glSetup.ts`, `runtime.ts` | Palette and image pipelines on both arms (image WGSL at binding 3). The runtime reports an overflow as `rendererFailure(backend, "Field well", …)` plus `onInitError` |
| blob | `metaball.wgsl.ts`, `metaball.frag.ts`, `blob/composables/wgpuSetup.ts`, `useMetaballRenderer.ts` | Both arms, applied to the flat and the lit colour before the OETF. Wakes on glass change; overflow publishes an error status |
| tokens | `tokens/glass.css`, `tokens/dark-arm.css` | `--glass-veil-pole: var(--card)` (light), `oklch(0.45 0.03 60)` base 0.24 (dark); `--field-well-{pole,gain,feather,outset,ambient}` light 0.965/0.2/2px/2px/0, dark pole 0.18 gain 0.28. The ladder law prose rewritten to the family |
| rename (E-1) | 13 files in `src`, `demo`, `tests` | `--glass-veil-ink` → `--glass-veil-pole`, no alias. 28 code lines (the spec's "118 lines in 31 files" counts `docs/`, which the patch leaves alone) |
| deletion (E-1) | the 746 sampler lines, `backgroundCanvas`, the luma clamp, `@property --glass-backdrop-luma`, `--glass-backdrop-luma-knee`; `tests/composables/glass/backdropLuminanceSample.test.ts`, `tests-visual/adaptive-glass-live.spec.ts`, `tests-visual/dock-luma-share.spec.ts`, the live-sample leg of `tests-visual/glass-material-demo.spec.ts`, the `elementsFromPoint` stub in `tests/setup.ts`, `docs/consumer-evidence/use-glass-backdrop-luminance.md`, the README prop row | Nothing reads a backdrop. The `contrast-color()` dock block goes; the dock's muted register is `--on-glass-muted` |
| floor row 1 | `glass/material.css` | `contain: paint` dropped from wash, quiet, resting, card |
| demo | `DockStage.vue`, dock `layers/sections/dock-search/cta-receive/overview.vue`, `glass-material.vue`, `manifest.ts`, `AppShell.vue` | The shared observer, the slot's `backgroundCanvas`, every `:background-canvas`, `preserveDrawingBuffer: true` and `data-glass-field-canvas` go. The glass-material story's sampler section becomes "the yielding field": a bare `[data-field-well]` box beside a `glass-card` |
| tests rewritten to the family's law | `tests/styles/glass-subtlety.test.ts`, `tests/components/custom/dock/GlassDock.backdrop-mode.test.ts` | "content band ≤ 0.20 both modes" → light 0.20, dark 0.24; "dark arm = light base + one step" → dark re-declares no rung or step; "DIMS in both modes" → light pole is `var(--card)`, dark pole L > 0.3; grasp reads `--glass-veil-rest: var(--glass-veil-tier…)`. These four encoded HEAD's ink-veil law, which F replaces |
| stale prose | `veil.css`, `glass-fx.css`, `glass.css`, `surfaces.css`, `surface-axis.css`, `ladder-undershadow.css`, dock `shell/dock/search/adaptive-legibility.css`, `GlassDock.vue`, `button/styles.css`, `feedback-tone.css` | Every comment naming the observer, the luma, or the earned darken |
| MIGRATION | `MIGRATION.md` | An UNRELEASED entry for the breaks |

## 2 · SPEC-ONLY (not built), and why

| spec item | state | reason |
|---|---|---|
| constellation (Canvas2D), fourier-field | SPEC-ONLY | Canvas2D has no per-pixel OKLab stage; fourier-field's render WGSL could take the chunk, but its renderer is a separate package-shaped module and was not wired. Both substrates paint unwelled under glass |
| aurora placeholder ground and `"css"` mode | SPEC-ONLY | The spec's own "second implementation" (a CSS carve over a lightened copy of the ground). Measured consequence in §4: the loud overflow failure drops the aurora to exactly this unwelled ground |
| one library frame clock (write phase before paint phase) | SPEC-ONLY | Needs the dock morph, sheet detents and springs moved onto one clock; the one-frame trail of `D3-F Q2` stands. No motion was measured here |
| `outset = v_max / f` motion margin | SPEC-ONLY | Depends on the clock |
| ladder `contrast-color()` bright bucket (floor row 2, ladder half) | not done | Spec states it remains in the probe |
| field-well rung (floor row 5), perimeter rung (M-3) | not done | Spec: "not specified by the research"; "untouched" |
| M-4 inactive tab (`tab-button.css:47`) | not done | Spec: D2's register call |

## 3 · Checks run in the worktree

| check | command | result |
|---|---|---|
| typecheck | `npm run typecheck` | exit 0 |
| unit suite | `vitest run` (whole suite; cache pointed into scratch) | **238/238 files, 2316 passed**, 10 expected fail, 1 skipped. HEAD baseline in a `git archive` copy: 12 fail, all dist/dist-demo/git-absent, none material |
| library build | `vite build` (cacheDir in scratch) | exit 0, built in 956 ms |
| demo build | `vite build --config demo/vite.demo-dist.config.ts` | exit 0, before and after |
| bound, fail loud | `probe-bound.mjs`, `/display/badge`, 16 vs 17 fixed `[data-field-well]` boxes | 16: aurora settled, canvas opacity 1, no error. **17: `data-aurora-settled` drops, canvas opacity 0, console `[Aurora] 17 glass surfaces lie over this field; the field well holds 16`** |
| demo routes under the bound | `probe-overflow.mjs`, six routes at 1440 and 430 | visible registered surfaces 1-11 per viewport; no overflow, aurora settled on every one |

Breaks met and cured on the way:
1. The research probe deleted the sampler but left `demo/` importing it; the demo build would have failed. Cured by removing the demo mounts.
2. `contrast-computed.test.ts` A-1 could not parse `oklch(from var(--card) l c h)`. The pole is the identity of `--card`, so it is now `var(--card)`.
3. `overfit-structure.test.ts` flagged `FIELD_WELL_SELECTOR` as an unreached export; it is module-private now.
4. The first registry threw on a missing band inside happy-dom's rAF (an unhandled error in `runtime-failure.test.ts`). It now throws only when glass actually lies over a substrate with no band.
5. `tests/components/menu/contract.test.ts` focus-restore failed once under load and passed on the rerun; not material.

## 4 · The battery (`out/caps/f3`, Chromium gates, Playwright WebKit informational)

| witness | HEAD (`HARNESS §3`) | prototype | measured (Chromium) | Playwright WebKit (info) |
|---|---|---|---|---|
| **W-F** | FAIL 66/152 | **PASS 152** | light c1 L p05 0.893 (dock)-0.936 (popover), c0.5 0.934-0.962; dark c1 L p95 0.306-0.362, c0.5 0.220-0.300 (dock 0.300); 24 px out ΔE p95 0.0000 everywhere | GL arm yields: light c1 0.895-0.936, dark c1 0.306-0.362, c0.5 0.219-0.260, 24 px out 0.0000 |
| **M-5** | FAIL 6/16 | **PASS 16** | 0 `getImageData`, 0 `readPixels` in all 8 live windows; dock light c1 fg 4.83 / muted 4.86, c0.5 5.54 / 5.57; dark c1 5.52 / 5.39, c0.5 7.42 / 7.26 | UNMEASURED in Playwright WebKit (GlassDock crashes it) |
| **M-7** | FAIL 8/8 | **PASS 8** | reference and every host 18 px light, 17 px dark | PASS 8 (14 px) |
| M-1 | FAIL 11/11 | FAIL 2/11 | plates and dock L 0.981-0.985, ΔE 0.003-0.005. RED: opaque `#fdf5ec` L 0.974 (S-6); the real Dialog `#aba7a0` L 0.729 ΔE 0.256 (S-8) | same two rows |
| M-2 | FAIL 169/560 | FAIL 110/560 | green on light paper/c1/c0.5/white and dark paper/c1/c0.5/black ladders; light c1 muted min 4.64 (HEAD 1.47). RED: light Dialog muted 2.33 (c1)-2.74 (white), 2.67 over paper (HEAD 1.32); light black fg 1.01, muted 1.83, dock 2.65; light checker/stripes muted 1.74-1.83, dock 1.95-2.16; dark white fg 1.03, muted 1.15, dock 1.42; dark checker/stripes muted 1.25-2.27 | FAIL 126/532 |
| M-3 | FAIL 237/266 | FAIL 230/266 | light paper perimeter 2.79, ring 2.92-2.94; Dialog perimeter 1.47, ring 2.36; light c1 perimeter 2.52-2.79 | — |
| M-4 | FAIL 14/14 | FAIL 14/14 | poles gone: fg = muted = `#705942` light, `#c3b9ac` dark (S-9) | UNMEASURED (dock) |
| M-6 | FAIL 14/19 | FAIL 4/19 | dark adjacent 0.010-0.016, from the page wash 0.054 … Dialog 0.146 (green); light adjacent 0.001-0.003 ✗ (S-7) | 5 of 18 |
| M-8 | FAIL 8/8 | FAIL 8/8 | stripes light C floating 0.0866, overlay 0.0819, Dialog 0.0629; dark 0.0670-0.0832; bleed 1.01-1.07 | FAIL 8 |
| W-A / W-B / W-C / W-D / W-E | all FAIL | FAIL 47/197, 16/24, 288/304, 7/9, 196/360 | other families' centres; W-B fails because nothing publishes | — |

Every row matches the research probe's `f2` capture to the reported digit: the prototype's additions (image and blob arms, bound, z-order, clip extent, nesting cull) change nothing the specimen page exercises, which is the expected result and also means none of them is witnessed by the battery (§6).

**Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every row.

## 5 · Gestalt (Chromium; `gestalt/<scene>-<width>-<theme>-<ground>-{before,after}.png`, pairs in `gestalt/pairs/`)

Five scenes (the glass-material story, `/dock/overview`, the Dialog "free" opened, the Popover "Dimensions" opened, the sidebar and bottom dock on `/foundations/intro`) × 1440 and 430 × light and dark × aurora and paper (paper = `.aurora-root` hidden). 80 captures, no page errors. Playwright WebKit crashes on the demo shell before and after (it mounts `GlassDock`), so the demo gestalt has no WebKit leg.

- **Light, over the aurora.** HEAD's grey-beige plates become cream frost, and every label and caption reads cleanly on it. The Dialog loses the smoke-brown slab: it is a warm card with legible caption and Cancel over HEAD's grey scrim, which is still there. The glass-material story's "field only" box shows the carve alone: a pale rounded rectangle in the aurora.
- **Light, over paper.** The ladder nearly disappears into the page. The Popover story's glass-quiet showcase panel, a visible grey block at HEAD, is gone; the Popover itself separates only by rim and shadow. This is S-7 made visible: the light levels no longer separate from each other or from the page.
- **Light active states.** The bottom dock's active pill ("Intro", "Glass Material") and the sidebar's active glyph lose their fill: cream on cream. The engagement affordance is gone in light (D-2). The rim and shadow still show the plates; the selected item does not show.
- **Dark, over the aurora.** Every plate reads as a dark smoked pocket in a light rose aurora, and the "field only" box is a dark rounded hole. Legibility is high, and the result looks more like cut-outs than glass. The collapsed dock is a dark maroon disc in the DockStage field where HEAD painted a glowing pill. This is C-F5 in dark: the field visibly responds to glass.
- **Dark, over paper.** Nearly identical to HEAD; the lifted pole makes the plates slightly more distinct from the page, as M-6 reads.
- **430 wide.** The same reads. The Substrates card's preview aurora, a canvas inside a `.glass-card`, keeps its colour: the z-order rule (a canvas inside the glass does not yield to it) is working in paint.
- **Glass over page content.** The translucent bottom dock now shows the cards scrolling under it more clearly than HEAD's greyer plate. Nothing yields under page text (C-F1).

## 6 · Open gaps and breaks

1. **The loud failure falls to an unwelled ground.** At 17 surfaces the aurora drops to its placeholder, which has no well (the CSS arm is SPEC-ONLY). Loud, and legibility is lost with it until the CSS arm exists.
2. **The z-order rule is an approximation.** It knows three facts: canvas inside the glass, negative-z backdrop, tree order. It does not model full stacking contexts. A glass surface painted under a nested stage (`.dock-stage` is `isolation: isolate` with its field at `z-index: -1`) would still be welled. The rule is witnessed in paint once (the Substrates preview card, §5) and by no battery row.
3. **Unwitnessed additions.** Nothing in the battery covers the image pipeline, the blob, the clip-path extent or the nesting cull. They typecheck, build and run on the demo with no errors, but no witness measures them. The dock's collapse insets are 0 px at HEAD (`dock.css:86-92`), so the clip read is currently a no-op.
4. **`visibility: hidden` glass still wells.** W-F's raw capture depends on it (C-F5). The spec's "only glass painted" would break the witness as written.
5. **Constellation, fourier-field, the CSS mode, the frame clock, the motion margin, floor rows 2 (ladder half) and 5, M-3's rung, and M-4's tab** are not built (§2).
6. **Light active states lose their pill.** This is a gestalt break no witness reads (§5).
7. **Dark plates read as holes over a light aurora.** This is a gestalt break no witness reads (§5). `--field-well-ambient` is the named lever, and it is the aurora owner's call.
8. **Real Safari: UNMEASURED (owner's safaridriver checkbox).** Safari's backdrop edge (C-F4), WebGPU `fieldWell` on Safari 26, and the dock.
9. **Process notes.**
   - Beyond `worktree add` and `remove`, the seat made two git writes, all inside the scratch worktree:
     - a `git checkout -- src` to revert an earlier probe patch it had applied by mistake;
     - a `git rm --cached` of the consumer-evidence doc, whose index entry the patch carries as a deletion.
   - The checkout was never touched by git. The patch reached its named path by `cp`, not the Write tool, because of its size (211 KB).
