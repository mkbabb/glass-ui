# Pass-E · substrates/concentric — COMPONENT deep audit

**Page:** `demo/stories/substrates/concentric.vue` (`import @mkbabb/glass-ui/concentric`)
**Real component(s) audited:** `src/components/custom/concentric/Concentric.vue` (95L) + the composable/shader seam — `composables/useConcentric.ts` (210L), `concentricWGPUSetup.ts` (180L), `concentricGLSetup.ts` (205L), `uniformBridgeWGPU.ts` (220L), `ringField.ts` (260L, the SINGLE math source) — and the shaders `shaders/concentric.wgsl.ts` (WebGPU primary) + `concentric.glsl.ts` (WebGL2 fallback), both splicing the shared `procedural-color.{wgsl,glsl}.ts` color chunk. Constants: `constants.ts` (shape budget + WARM_IDENTITY default).

Lens: ANIMATION affordance · procedural-viz spec (PROCEDURAL-SUITE) · performance · Safari · idiomatic/no-legacy · the glass six-layer composite. Mapped to FOLD/MODIFY/AUGMENT/PRUNE on the existing BD tranche.

Suite rank: **member 4 — NEW, BORN WebGPU-first** (a pure fullscreen fragment pass, the aurora shape-class; the GLSL fallback is the SAME pure fragment field → parity `verified`).

---

## 1 · ANIMATION — four-state + spring + entrance/exit (per motion-canon)

Concentric is a **non-interactive procedural BACKGROUND** (`aria-hidden="true"` canvas, `pointer-events: none`), so the four-state interactive contract (rest/hover/active/disabled) is N/A by design — its animation axis is *procedural drift + entrance + pointer-reactivity*. That axis is mostly strong, with ONE genuine entrance gap:

- **Procedural drift is alive + cited.** The ring travel rides `ω = √(g·k)·speed` (Tessendorf deep-water dispersion — the suite's ONE shared dispersion law), the two detuned families beat into a low-frequency moiré envelope. The drift is the field; no dead/janky motion in the steady field.
- **Pointer-reactivity is idiomatic + one-loop-correct.** `config.interactive` composes the SHARED `usePointerVelocityField` (NO own rAF — `tick(deltaMs)` is FED from inside the renderer's `onFrame` hook, the one-loop discipline) and injects a TRANSIENT ring-family center about the cursor (position→center, velocity→`rotAlpha` tilt, burst→weight ripple) into an INTERNAL `renderCenters` array — never mutating the consumer's reactive config (no reactive feedback churn). The GooBlob pointer-wake precedent is honored: `onEnter`/`onMove` call `handle.wake()` so a first hover over a parked loop repaints same-frame.
- **GAP — NO entrance cross-fade (the one missing animation).** Aurora paints a frame-0 placeholder and cross-fades the GPU canvas in over it via a pure CSS `opacity` transition (`Aurora.vue:276`, `--duration-slow var(--ease-standard)`, PRM-collapsed). Concentric has **ZERO entrance** — `Concentric.vue` has no opacity transition, no placeholder, no `@keyframes`; the canvas paints transparent until the first armed frame, then pops. On a slow WebGPU `armAsync` device-acquisition there is a visible blank→pop with no graceful fade. This is the motion-canon P3 (fade-coupled) entrance the sibling backgrounds carry and concentric lacks. → **AUGMENT (new arm on W-LIQUID-ENTRANCE-GENERAL / the W-PAGE-BACKGROUND viz-entrance facility): add the aurora-class CSS opacity cross-fade on arm, PRM-collapsed.**

**Finding A (AUGMENT).** Missing entrance cross-fade — the lone animation gap.

## 2 · PROCEDURAL VIZ — adherence to PROCEDURAL-SUITE + GPU/Safari bar

Concentric is the **cleanest spec-compliant member of the suite** — it has none of aurora's WGSL parity gaps (it is a pure field with no stroke/medium cascade and no curl branch):

- **Shared discipline: PASS.** ONE lifecycle leaf (`createGpuSubstrate` → `createCanvasLifecycle`, ZERO scheduling re-fork in either setup); offscreen-pause via `content-visibility: auto` + `contain: content` (the substrate's `contentvisibilityautostatechange` park); live-PRM one-static-frame-then-park (substrate-owned `matchMedia`); consumer-owned DPR (`resolveBudgetDpr()` in both setups); cited-SOTA math (Tessendorf dispersion + IQ gradient-normalized distance-estimation, gradient closed-form since the field is a sum of sinusoids).
- **Single-math-source: EXEMPLARY.** `ringField.ts` is the ONE evaluator; the WGSL `fs_main` and the GLSL fragment transcribe it line-for-line (`ellipsoidalRadiusRot`/`ellipsoidalGradMag`/`sampleRingField`/`ringIsolineInk`/`contourInk`/`samplePaletteLin` all byte-faithful across the three paths, verified by reading both shaders). The typed-struct `uniformBridgeWGPU.ts` is the SoT for the WGSL struct↔JS-offset layout (std140-vs-WGSL mismatch structurally impossible). Both backends pack `getCenters()` (incl. the transient pointer center) for centers and `config.ringComponents` for rings — center/ring parity is consistent across backends (no GL/WGPU drift).
- **Shared color chunk: PASS.** Both shaders splice `procedural-color.{wgsl,glsl}.ts` — the OETF + Ottosson OKLCh matrices are ONE source per backend, so color cannot drift WGSL↔GLSL.
- **Warm-identity default: PASS.** `WARM_IDENTITY_PALETTE` is the warm-cream library identity; the teal-on-navy `CONCENTRIC_PRESET_THEME` is a demo preset (presets-in-consumers), `proof:concentric` clause 5 fences a themed literal in `constants.ts`.
- **The alias-fade is a genuine quality device.** Both shaders carry the IQ filterwidth `aliasFade` (`1 - smoothstep(PI*0.6, PI*1.2, fwidth(phase))`) so the field stays thin LINES instead of flooding to a bright slab where rings pack tighter than a pixel — this is the fix for the "retired 5-octave Phillips turbulence blur" the constants warn against. Spec-faithful.
- **Booked redesign (not a gap NOW).** `W-CONCENTRIC-LEVELSET` (union Band 13, ← W-FIELD-ENGINE) is the planned redesign to level-sets of a curl-warped fbm terrain KEEPING the IQ `contourInk`. W-FIELD-ENGINE explicitly DEFERS the `wave` field-chunk layer because concentric is mid-redesign. So the current sum-of-sines field is the SHIPPED register; the levelset is the successor — recorded, not a silent miss.

**No NEW procedural-viz finding** beyond the booked W-CONCENTRIC-LEVELSET redesign. The GPU-only/Safari twin bar is MET (both backends pure fragment, `fwidth` not `fwidthFine` — Compatibility-Mode safe, see §4).

## 3 · PERFORMANCE — compositor-only? offscreen-pause? layout-thrash?

**Strong.** No layout-thrash.

- **Compositor-only chrome.** The canvas paints; the ONLY CSS axis is the wrapper `background` (a static themed ground, default transparent). `contain: content` + `content-visibility: auto` + `contain-intrinsic-size: auto none` isolate it as a layout/paint root and let the browser content-skip + park the rAF offscreen.
- **No-op resize guard** in both setups (`if (canvas.width !== w ...)`) skips the buffer realloc when dimensions match — avoids clearing the drawing buffer on every ResizeObserver tick.
- **`contain-intrinsic-size: auto none` — MINOR finding.** Aurora uses `auto 600px` (an explicit block fallback) precisely to dodge the content-visibility zero-height-skip → 1px-sliver-black-band trap. Concentric's `auto none` gives NO block fallback, so on the FIRST content-skip before any real size is cached the element can collapse to a sliver. Aurora's source documents this as a real bug. → **MODIFY (W-VIZ-PERF-BUDGET / a one-line chassis fix): match aurora's `contain-intrinsic-size: auto <reserve>` so the offscreen skip reserves a real block extent.**
- **`pointermove` listener without `{ passive: true }`** (`useConcentric.ts:bindPointer`) — the handler never `preventDefault`s, so passive is safe + idiomatic and keeps Safari/Chromium off the input-blocking path. Same low-severity finding as aurora. → **AUGMENT (perf hygiene).**
- **Frame-1 delta-time seed is honest** (`deltaMs = lastFrameSec > 0 ? ... : 16.7`) — no NaN/Infinity velocity on the first tick.

**Findings B (MODIFY — intrinsic-size reserve) + C (AUGMENT — passive pointer).**

## 4 · SAFARI compatibility

**Good — the cleanest member on Safari.**

- Safari-26 is a WebGPU host → it hits the WGSL primary, which is a pure fragment field with NO stroke/medium cascade and NO curl branch, so it has NONE of aurora's Safari WGSL gaps (curl-degrades / Kuwahara-stand-in). The field renders identically to spec.
- `fwidth` (NOT `fwidthFine`) on both the line composite and `contourInk` — explicitly Compatibility-Mode-safe on Metal/WebKit (the source notes it).
- Premultiplied-alpha output (`rgb * alpha, alpha`) with `srcFactor: "one", dstFactor: "one-minus-src-alpha"` blend in both backends — consistent, Safari-safe.
- **The binding real-Metal-GPU parity readback is the deferred `BD.W-VIZ-PARITY-METAL`** — the device-free structural-proxy parity (`proof:gpu-substrate-single`) is GREEN, but the actual Safari-26 Metal WGSL compile/derivative divergence (the goo-blob `var target` reserved-keyword / non-uniform `fwidth` class) is only caught by the deferred live-Metal capture. Concentric ENROLLS in that sequencing gate — not a new finding, the existing wave covers it. → **FOLD into BD.W-VIZ-PARITY-METAL (concentric row).**

## 5 · IDIOMATIC / no-legacy

**Clean at the COMPONENT — one DEMO-side DRY miss (not a component defect).**

- The runtime is a well-factored seam composition (useConcentric / WGPU-setup / GL-setup / uniformBridge / ringField) over the shared substrate; the WebGPU-first/WebGL2-fallback dual is the SANCTIONED graceful-tail dual-path, gate-locked by `proof:gpu-substrate-single` (no-deleted-fallback). No workaround / dead-code / dual-writer to transpose at the component.
- **DEMO-side DRY miss (W-CONFIG-GALLERY-DOCK):** `concentric.vue` RE-FORKS its own `<Configurator>` + hand-rolled ref-sync (`familyCount`/`baseWavelength`/`renderMode` watchers) instead of routing through the shipped `<VizStudio>` (`demo/stories/substrates/VizStudio.vue` exists; only aurora uses it). The Pass-D ADDENDUM names this exactly ("blob/concentric/fourier-field/paper-grid each RE-FORK their configurator — the DRY miss"). This is a DEMO concern (the component is clean), recorded for the demo-side Pass-E (`substrates-concentric-demo.md`) and FOLDED into the existing W-CONFIG-GALLERY-DOCK. → **FOLD into W-CONFIG-GALLERY-DOCK.**
- **Preset-thumbnail bug (W-PRESET-RENDER) — shared root, not concentric-specific.** Concentric's WebGPU `mode:"capture"` readback rides the same `usePresetThumbnails.ts:96` blank-preview race (WebGPU swap-chain gone across the `setTimeout(0)` yield). Not a new finding — the existing W-PRESET-RENDER owns the fix (read back within the frame). → **FOLD into W-PRESET-RENDER.**
- **NO `useVizKeyboard` / DATA keymap** (union W-VIZ-KEYBOARD) — concentric has no keyboard affordance for its DATA axes (families/wavelength/render-mode). This is the suite-wide framework wave, not a concentric-specific gap. → **FOLD into W-VIZ-KEYBOARD (concentric DATA keymap) + W-CONCENTRIC-INTERACT (the shipped-pointer-field + keyboard compose, the AUR/FOURIER/CONSTELLATION-INTERACT sibling).**

## 6 · The glass SIX-LAYER composite

**N/A at the component — correct.** Concentric is the COLORFUL procedural BACKDROP the glass six-layer composite reads THROUGH (glass-cannot-sample-glass: concentric is the non-glass substrate). Its job is to BE the rich colorful field; the six-layer composite is the dock/card/panel surfaces floating over it (audited per their own pages). The user's "glass demos over colorful aurora backgrounds" is the DEMO-page concern (promote the field card→full-bleed + float glass specimens over it — W-PAGE-BACKGROUND), recorded for `substrates-concentric-demo.md`, not a component gap.

---

## Tranche action map (FOLD/MODIFY/AUGMENT/PRUNE)

| # | Finding | Verdict | Wave |
|---|---|---|---|
| A | No entrance cross-fade (canvas pops in; aurora cross-fades) | **AUGMENT** | W-LIQUID-ENTRANCE-GENERAL (viz-entrance arm) / W-PAGE-BACKGROUND |
| B | `contain-intrinsic-size: auto none` (no block reserve; aurora uses `auto 600px`) | **MODIFY** | W-VIZ-PERF-BUDGET (one-line chassis) |
| C | `pointermove` without `{ passive: true }` | **AUGMENT** | W-VIZ-PERF-BUDGET (perf hygiene) |
| D | Demo re-forks `<Configurator>` instead of `<VizStudio>` (DRY) | **FOLD** (demo-side) | W-CONFIG-GALLERY-DOCK |
| E | Blank preset thumbnail (shared WebGPU-readback race) | **FOLD** | W-PRESET-RENDER |
| F | No keyboard DATA keymap | **FOLD** | W-VIZ-KEYBOARD + W-CONCENTRIC-INTERACT |
| G | Real-Metal-GPU WGSL parity not yet captured | **FOLD** | W-VIZ-PARITY-METAL (concentric row) |
| — | Sum-of-sines field → level-set redesign | (booked successor) | W-CONCENTRIC-LEVELSET ← W-FIELD-ENGINE |

**PRUNE:** none — no dead code / legacy / dual-writer at the component.

---

## 5-line verdict

1. The concentric COMPONENT is the cleanest, most spec-faithful member of the suite: ONE math source (`ringField.ts`) transcribed byte-for-byte into the WGSL primary + GLSL fallback, shared color chunk, warm-identity default, IQ alias-fade, `fwidth`-not-`fwidthFine` Safari-safe — zero WGSL parity gaps (unlike aurora's curl/stroke gaps) and zero legacy/dual-writer to transpose.
2. The ONE genuine animation gap is the MISSING entrance cross-fade — the canvas pops in transparent→painted where aurora cross-fades a frame-0 placeholder; AUGMENT onto the viz-entrance facility, PRM-collapsed.
3. Two perf nits: `contain-intrinsic-size: auto none` should reserve a block extent (aurora's `auto 600px` documents the sliver-skip trap) — MODIFY; and the `pointermove` listener wants `{ passive: true }` — AUGMENT.
4. The remaining items are SHARED suite-wave folds, NOT concentric-specific defects: the demo configurator re-fork → W-CONFIG-GALLERY-DOCK, the blank preset thumbnail → W-PRESET-RENDER, the keyboard keymap → W-VIZ-KEYBOARD, the Metal parity → W-VIZ-PARITY-METAL, and the booked level-set redesign → W-CONCENTRIC-LEVELSET.
5. Convergence HIGH — the component needs only the entrance cross-fade + the two perf nits as net-new component work; everything else is already-scoped suite waves. No new wave required; one AUGMENT arm (entrance) is the only addition.
