# Pass-E deep audit — substrates/constellation COMPONENT

Page: `substrates/constellation` · import `@mkbabb/glass-ui/constellation`
Component(s) audited (the REAL src, not the demo):
- `src/components/custom/constellation/Constellation.vue` (thin SFC)
- `composables/useConstellation.ts` (orchestrator + per-frame resolve)
- `constellationField.ts` (the ONE JS math source — seed/step/refit/buildEdges/parallax)
- `constellationInteraction.ts` + `constellationWell.ts` (warp spring + gravity-well + wander)
- `constellationRender.ts` (palette read + `parseColorRGBA` + `kVisOf`)
- `composables/constellationWGPUSetup.ts` (WebGPU primary) + `constellationGLSetup.ts` (WebGL2 fallback)
- shaders `shaders/constellation-{points,lines}.{wgsl,glsl}`

## Headline — the doc/code drift is the gestalt finding

PROCEDURAL-SUITE.md still records constellation as **Canvas2D, "DO NOT MIGRATE (now)", booked to W-CONSTELLATION-GPU**. The CODE has ALREADY been migrated (BC.W-VIZ-CONSTELLATION): the four Canvas2D draw passes RETIRED; the lattice now renders on `createGpuSubstrate` (WebGPU instanced-points+lines primary, WebGL2 instanced-arrays fallback). The suite index is STALE — the verdict table, the "Canvas2D" substrate cell, and the booked-successor row all describe a pre-BC reality. **First action: re-sync PROCEDURAL-SUITE.md (and the demo blurb at line 469, which still says "A Canvas2D field…").** This is the GPU-only/Safari bar being MET in code but UNRECORDED in the spec.

---

## (1) ANIMATION — high affordance, but the interaction surface is half-dead

POSITIVE: the engine is rich and idiomatic — drift+wall-bounce, distance-falloff edges, a critically-damped warp spring (`WARP_RESPONSE`/`WARP_ZETA`, the keyframes.js `(response,ζ)` model stepped INSIDE the substrate's ONE rAF — no second rAF, no `useSpring`), velocity-aware lean off the shared `usePointerVelocityField`, flick-burst, gravity-well, wander cadence, pinned-drift, parallax depth. Spring physics + the one-loop discipline are correct and match motion-canon (compositor-driven, PRM-gated).

DEAD/BROKEN (FOLD): **`drawOverlay` is a declared-but-never-invoked prop.** `grep 'props.drawOverlay\|.drawOverlay('` over the whole tree = ZERO call sites. The SFC docstring admits it: "the Canvas2D `drawOverlay` seam is inert post-migration." Yet:
- `ConstellationProps.drawOverlay` keeps its full `(ctx, field, now) => void` TS contract + ~10 doc-comment paragraphs (`constellationTypes.ts:240-425`).
- The DEMO PAGE is BUILT AROUND IT — five painter closures (`drawFocal`, `drawWarpFocal`, `drawAnomaly`, `drawPinnedAnomaly`, plus the warp/nova reuse) feeding `:draw-overlay`. Every focal node / pulse ring / anomaly callout / monospace label the demo "shows" **silently paints nothing** — there is no 2D context to receive them. The signature focal mark, the click-to-warp ring, the pinned-anomaly callout, the freeze-determinism overlay: all visually absent on the live GPU page.

This is a dual-path zombie: the migration removed the consumer but kept the prop + the entire demo theatre around it. The component exposes `field.warp.{x,y}` for a consumer overlay LAYER (a real HTML/SVG sibling), but nothing demonstrates that, and the dead prop invites the exact mis-use the demo commits.

## (2) PROCEDURAL VIZ — adheres to the GPU-only bar, spec is stale

The viz itself now MEETS the suite's GPU-only/no-canvas mandate: instanced billboard discs with crisp `fwidth`-SDF (resolution-independent — the prior Canvas2D `arc()` upscale blur is gone), instanced segment-quad lines with cross-line AA, 2× DPR cap for sharp discs, shared-field one-math-source transcribed by both WGSL + GLSL. The `buildEdges` O(N²)/2 scan is fine at count=64 (the GPU spatial-hash neighbor-bin is correctly BOOKED as the dense-register successor, not over-built). Parity is the suite's ΔE-bar discipline. **Adheres** — the only gap is the spec record (headline) + the booked `W-CONSTELLATION-GPU` row being moot (already done).

## (3) PERFORMANCE — two real per-frame hot-loop defects

- **`getComputedStyle(canvas).getPropertyValue("--constellation-k-floor")` runs EVERY frame** (`useConstellation.ts:227`). A forced style flush per animation frame — the layout-thrash the rest of the code carefully avoids (`readPalette` + `readInteractionConfig` are correctly gated behind size-change/mount-once). The k-floor read must move into the same size-change/mount-once block.
- **`parseColorRGBA` runs 4× per frame** (`:324-327`) re-parsing the SAME static `palette.{node,nodeDim,line,accent}` hsl strings with regex + allocating 4 fresh `[r,g,b,a]` arrays/frame — defeating the file's own "no per-frame alloc" claim (`nodeRows`/`edgeUniforms` are pre-allocated, then this allocs anyway). Parse-once into the pre-allocated uniform record at the same point `readPalette` is gated.
- **`edgeRows: PackedEdge[] = []` is re-allocated every frame** (`:356`) + `.push` per edge — the node path uses a pre-sized `nodeRows` (good); edges should mirror it (a pre-sized scratch + a count).

Offscreen-pause, tab-hidden park, and live-PRM one-static-frame-then-park are all INHERITED for free from the leaf (`createGpuSubstrate` → `createCanvasLifecycle`) — correct, the suite discipline holds. `content-visibility:auto` + `contain: layout style` on the host are present.

## (4) SAFARI — compatible by construction

WebGPU primary with the WebGL2 instanced-arrays fallback covers Safari 26+ (WebGPU) AND the pre-26 tail (WebGL2). No `getContext("2d")`, no Canvas2D `light-dark()` leak (the palette is plain-hsl per arm, JS-resolved into uniforms). `instanced_arrays`/VAO are WebGL2 core. No Safari-specific concern in the render path. The DEMO's dead `drawOverlay` closures use Canvas2D APIs but never execute, so they don't break Safari — they just do nothing everywhere.

## (5) IDIOMATIC / no-legacy — strong core, three transpositions owed

- The 6-file carve (field/interaction/well/render/types/setup) is clean colocation, one-math-source, no god-module — idiomatic.
- FOLD: the dead `drawOverlay` prop + its TS contract + doc paragraphs (architectural transposition: the consumer overlay is now a sibling DOM/SVG LAYER reading `field.warp`, not an injected 2D painter — RETIRE the prop clean-break, no alias; re-author the demo's focal marks as real glass-ui overlay nodes positioned off `field.warp`).
- The `field.canvas` + `getComputedStyle`-in-overlay doc references (`constellationTypes.ts:253`) are vestigial Canvas2D-era surface.

## (6) GLASS six-layer composite — NOT a glass surface (correctly), but the PAGE owes glass cards

The constellation is a transmissive BACKGROUND field (decorative chrome), not a glass tier — it does NOT and should not carry the six-layer composite itself (glass-cannot-sample-glass; it is the thing BEHIND the glass). The DESIGN.md relevance is the PAGE COMPOSITION the user asked for, and the demo FAILS it:
- Every section host is an OPAQUE `bg-card` plate (lines 481/508/550/573/600/618/645/698/725) — the constellation paints on a flat card, NOT under a glass surface over a colorful field.
- The user's asks land squarely here: **each sub-section in its OWN glassy card** (the demo uses 17 `StorySection`s but raw `bg-card` divs, not glass tiers); **the main card BIGGER**; **glass demos over COLORFUL aurora** (there is ZERO `<Aurora>` here — the constellation is its own neutral field on `bg-card`, the BG-2 black-plate anti-pattern W-STAGE's `tier="field"` was minted to kill); **leverage dock APIs for contextual switching** (the 7 manual `StorySection` variants — warp/refit/well/recession/pinned/nova/freeze — are the canonical case for a `<DockLayerGroup>`/`<DockStack>` facet switch over ONE bigger stage, not 7 stacked 420px cards); **standardize the import label** (demo imports the raw `../../../src/subpaths/constellation` path — the README + every other surface use `@mkbabb/glass-ui/constellation`); **tighten language** (the blurbs are 3-4 sentences each, the "NOT the slides red anomaly" / "the zero-deck-domain canon holds" meta-commentary is superfluous).

---

## Map to the BD tranche

| Finding | Action | Wave |
|---|---|---|
| PROCEDURAL-SUITE.md records constellation as Canvas2D/booked-GPU — already migrated | **MODIFY** (re-sync the suite index + verdict row + the moot `W-CONSTELLATION-GPU` booking) | `BD.W-DOC-COUNT-SYNC` / `BD.W-HOMEMAP-RESYNC` |
| `drawOverlay` prop dead post-migration (0 call sites) + full TS contract + demo built on it | **PRUNE** (clean-break retire the inert prop; re-author overlay as a sibling DOM/SVG layer off `field.warp`) — add to the dead-mechanism floor | `BD.W-MISSED-SLAB-CENSUS` + lock under `proof:no-dual-path` (BB.W-PRUNE-CONSOLIDATE precedent) |
| per-frame `getComputedStyle` (k-floor) · per-frame `parseColorRGBA` ×4 + `edgeRows` realloc | **MODIFY** (gate the k-floor + color parse into the mount-once/size-change block; pre-size the edge scratch) | `BD.W-VIZ-PERF-BUDGET` (the net-new V-row; the compositor-only/no-thrash bar) |
| Demo: opaque `bg-card` hosts, no aurora, 7 stacked cards, raw import path, verbose blurbs | **AUGMENT** (glass cards over a COLORFUL `<Aurora>` `tier="field"` stage; ONE bigger stage; dock-facet contextual switch across the 7 modes; `@mkbabb/glass-ui/constellation` label; tighten copy) | `BD.W-CONSTELLATION-STUDIO` (VIZ-FINAL-ROSTER) composing `W-VIZ-CONFIGURATOR` + `W-DOCK-CONSTELLATION` + the `W-STAGE tier="field"` aurora-backdrop register |
| The interactive feature set (warp/well/wander/pinned/nova) is the dock-facet contextual-switch case | **FOLD** the 7 manual sections onto `<DockStack mode="facets">` / `<DockLayerGroup>` over ONE stage | `BD.W-CONSTELLATION-STUDIO` + `W-DOCK-WIRE` |

## 5-line verdict
1. Component is sound + idiomatic at the ENGINE level (rich spring/well/warp/parallax animation, one-math-source GPU render, offscreen-pause + PRM + Safari fallback all inherited for free) — high animation affordance where it's actually wired.
2. The gestalt defect is a MIGRATION ZOMBIE: `drawOverlay` is a declared-but-never-invoked dead prop, and the entire demo's focal/anomaly/warp marks paint into a Canvas2D context that no longer exists — they are silently invisible (PRUNE the prop, re-author overlays off `field.warp` as DOM/SVG layers).
3. PROCEDURAL-SUITE.md is STALE — records Canvas2D + a booked `W-CONSTELLATION-GPU` that BC already shipped (MODIFY/re-sync).
4. Two real per-frame hot-loop defects: `getComputedStyle` for `--constellation-k-floor` every frame (forced style flush) + `parseColorRGBA`×4 re-parsing static strings with regex + per-frame array allocs (MODIFY — gate both into the size-change block).
5. The demo fails the user's DESIGN.md asks wholesale (opaque `bg-card` not glass, no colorful aurora, 7 stacked cards not a bigger dock-facet-switched stage, raw `src/subpaths` import label, verbose meta-blurbs) — AUGMENT onto `BD.W-CONSTELLATION-STUDIO` with a glass-cards-over-aurora `tier="field"` stage + dock contextual switching.
