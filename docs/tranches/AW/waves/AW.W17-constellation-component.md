# AW.W17 - Constellation component (useCanvas2D + the proximity-graph lattice)

## State

**Name**: W17 - Constellation component (useCanvas2D + the proximity-graph lattice)
**Opens after**: AW tranche open (independent of the dock/aurora/blob arcs; consumes the shipped `prng`/`useRAFLoop`/`useIntersectionPause`/`useResizeObserver` leaves)
**Agents**: 3 parallel
**Hard gate**: `proof:constellation-substrate-single` green — the `useCanvas2D` Canvas2D substrate exists, the `Constellation` component composes it, the engine consumes glass-ui's `prng` (`mulberry32`/`hashString`) NOT a private copy, and the anomaly skin is a consumer-supplied draw-pass (the neutral lattice ships; the red anomaly ring does NOT live in `src/`).
**Status**: planned

## Goal criterion

This wave succeeds if, when work ends, glass-ui ships a `useCanvas2D` substrate (the Canvas2D parallel to `useWebGLCanvas` — shared dpr-resize, RAF-park, offscreen/hidden/reduced-motion freeze, dispose) and a `Constellation` proximity-graph lattice primitive that composes it, with exactly the *mechanical* skeleton lifted from the 488-LoC slides `constellation.ts` (the drifting nodes, the distance-falloff edges, the pointer-web, the ripples) and the *branded* content (the NC State red anomaly ring + the dashed Fira-Code callout) left to the consumer as an injected `drawOverlay` pass; two real consumers drive it — a glass-ui demo Constellation story and the slides anomaly-ring deck (H.W10) — so the gate the AV.W8 work was held behind (≥2 consumers) now clears.

The AV.W8 disposition is binding: the `useCanvas2D` + `Constellation` primitive was **GATED-NOT-LANDED** at AV.W8 because it had only 1 consumer (the slides deck). The slides constellation refactor — H.W10, which swaps SlideXray + Slide01 onto the glass-ui primitive — is consumer #2 that unblocks it. The convergence digest (Lane 2 AW-H5; Lane 3 F11) is the discipline: the engine mechanism ports; `drawAnomaly` (`constellation.ts:278-331`) is the deck skin and stays a consumer pass.

**Confirmed (AW/H harden, Cluster G).** This wave LANDS the AV.W8-gated pair as designed — three invariants hold: (1) it ships the `useCanvas2D` Canvas2D substrate (the park/freeze/dispose parallel to `useWebGLCanvas`) + the `Constellation` proximity-graph lattice that composes it; (2) the slides deck (H.W10) is the in-repo-cleared ≥2nd consumer that unblocks the AV.W8 gate, with the demo story as consumer #1; (3) the NC-red anomaly ring + dashed Fira-Code callout are a **consumer overlay** injected via the `drawOverlay(ctx, field, now)` seam — they do NOT live in `src/` (gate `proof:constellation-substrate-single` asserts zero `ncsu`/`anomaly`/`Fira Code`/`accentColor` literal in the constellation dir). The slides H.W10 ≥2-consumer count is cross-repo-PENDING; if H.W10 has not landed at ship time the wave carries GATED-NOT-LANDED pending the slides swap, mirroring AV.W8's own rule (a cross-repo consumer does not auto-count toward the in-repo bar until it lands).

## Scope

1. Create `src/composables/glass/canvas2d/useCanvas2D.ts` — the Canvas2D substrate, a `createCanvas2D(options)` factory mirroring `createWebGLCanvas` (`src/composables/glass/webgl/useWebGLCanvas.ts`): the same `arm`/`resume`/`dispose` lifecycle, the same `WebGLSuspendReason`-shaped suspend set (`"tab-hidden" | "off-screen" | "manual"`) gating one `isRunning()`, dpr-clamped resize (`Math.min(dpr, 2)`, `ctx.setTransform(dpr,0,0,dpr,0,0)`), and the offscreen-park + `document.hidden` + live `prefers-reduced-motion` freeze the substrate already owns. The `setup` hook returns a `Canvas2DFrame` (`{ render(ctx, now), teardown() }`) instead of the WebGL frame. ONE static frame painted then parked under reduce, mirroring the WebGL substrate contract.
2. Create `src/composables/glass/canvas2d/index.ts` (barrel) — `export { createCanvas2D }`, `export type { Canvas2DFrame, Canvas2DHandle, Canvas2DOptions }`.
3. Create `src/components/custom/constellation/Constellation.vue` — the proximity-graph lattice component. Props: `count`, `link`, `speed`, `seed?` (→ `prng`), `pointerReactive?`, `class?`, and a `drawOverlay?: (ctx, field, now) => void` injection seam (the anomaly skin slot). It composes `useCanvas2D`, seeds the node field via glass-ui `prng` (`mulberry32` + `hashString` from `src/utils/prng.ts`), runs the four NEUTRAL passes (edges, nodes, pointer-web, ripples), and calls `drawOverlay` after them so a consumer paints its own anomaly/skin. Pointer reactivity (steer-toward-cursor + tap ripples) is built in, gated off under reduced-motion.
4. Create `src/components/custom/constellation/constellationField.ts` — the pure field engine: the `Node` type, `seedField(rng, count, w, h, speed)`, `stepField(field, k, now, pointer)` (drift + bounce + pointer-steer), and the four neutral draw passes (`drawEdges`, `drawNodes`, `drawPointerWeb`, `drawRipples`) as free functions over `(ctx, field, k)`. NO anomaly pass — that is the consumer's `drawOverlay`.
5. Create `src/components/custom/constellation/index.ts` (barrel) + `src/components/custom/constellation/README.md` (the research-backed primitive README; authored under the constellation README brief, NOT this wave's diff).
6. Create `src/subpaths/constellation.ts` — the one-line subpath mirror (`export * from "../components/custom/constellation"`), resolved by the `vite.library.ts` `src/subpaths/*.ts` glob. Register `./constellation` in `package.json` `exports` + `typesVersions`.
7. Add the `Constellation` types to `src/api/index.ts` (the `ConstellationProps` + `ConstellationField` public types; the component ships via subpath).
8. Author `demo/stories/substrates/constellation.vue` (consumer #1) — the neutral lattice on cream + a `drawOverlay` that paints a glass-ui-toned focal node (NOT the slides NC-red anomaly — the demo proves the skin seam with a neutral/`--primary` overlay, so the branded content stays a consumer concern).
9. Add the `proof:constellation-substrate-single` gate, born RED on HEAD (no `useCanvas2D`, no `Constellation`, the slides `mulberry32` is a private copy), green after the substrate + component + `prng` consumption land.

## Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) if:

- the file bounds expand beyond `src/composables/glass/canvas2d/*`, `src/components/custom/constellation/*`, `src/subpaths/constellation.ts`, `src/api/index.ts`, `package.json`, the named demo story, and the gate script — e.g. lifting the substrate suspend/park machinery out of `useWebGLCanvas.ts` into a shared backend-agnostic core (the AW.W8 aurora wave's `createGPUCanvas` lift) forces `useWebGLCanvas.ts` into scope (a scope reveal — this wave PARALLELS the WebGL substrate's park contract, it does NOT yet refactor a shared core; if the orchestrator wants the shared-core lift, that is a coordinated cross-wave decision with the aurora WebGPU wave, not a solo expansion);
- the slides anomaly skin (H.W10's consumer #2) cannot be expressed through the `drawOverlay(ctx, field, now)` seam without the component exposing more field internals than `{ nodes, w, h, k, dpr }` (the injected-pass contract was assumed sufficient; a forced wider seam is a scope reveal that invalidates the "anomaly is a pure overlay" thesis);
- the `useCanvas2D` reduced-motion / offscreen-park behavior fails the `proof:constellation-substrate-single` freeze assertion for a reason not fixable by a local edit (the third diagnostic iteration halts).

## File Bounds

| File | Access |
|---|---|
| `src/composables/glass/canvas2d/useCanvas2D.ts` | create |
| `src/composables/glass/canvas2d/index.ts` | create |
| `src/composables/glass/index.ts` | modify (re-export the canvas2d barrel from the glass sub-tree) |
| `src/components/custom/constellation/Constellation.vue` | create |
| `src/components/custom/constellation/constellationField.ts` | create |
| `src/components/custom/constellation/index.ts` | create |
| `src/components/custom/constellation/README.md` | create (authored under the constellation-README brief; named here so the dir is complete) |
| `src/subpaths/constellation.ts` | create |
| `src/api/index.ts` | modify (add `ConstellationProps` + `ConstellationField` public types) |
| `package.json` | modify (register the `./constellation` export + the `proof:constellation-substrate-single` script) |
| `demo/stories/substrates/constellation.vue` | create |
| `demo/stories/manifest.ts` | modify (register the constellation story route) |
| `scripts/proof-constellation-substrate-single.mjs` | create |

Do NOT touch: `docs/precepts/`, `src/composables/glass/webgl/useWebGLCanvas.ts` (the WebGL substrate is PARALLELED, not refactored, this wave — the shared-core lift is a coordinated aurora-wave decision), `src/utils/prng.ts` (consumed verbatim — NO new PRNG; the constellation imports `mulberry32`/`hashString` as-is), `~/Programming/slides/*` (the slides swap onto the primitive is H.W10's port; AW only ships the library surface + retires the slides private `mulberry32` as a documented downstream consequence, not an in-this-repo edit).

### Disjointness

Three parallel units, disjoint write sets:

- **AW.W17.a** owns the substrate — `composables/glass/canvas2d/*`, `composables/glass/index.ts`, the gate script (the substrate half of the gate).
- **AW.W17.b** owns the component + field engine — `components/custom/constellation/{Constellation.vue,constellationField.ts,index.ts}`, `subpaths/constellation.ts`, `api/index.ts`, `package.json` (the export entry).
- **AW.W17.c** owns the demo consumer — `demo/stories/substrates/constellation.vue`, `manifest.ts`.

No two units share a `modify` path EXCEPT the gate script (`a` creates it) and `package.json` (`b` owns the export + script registration — sequence so `b` registers the script `a` authored, OR `a` registers a stub script name and `b` wires the export; commit `a` before `b` so the keyset is clean). The README is created under the constellation-README brief (a separate deliverable), so it is NOT a write-conflict in this wave's agent set. Sequence: a (substrate) + b (component, depends on a's `createCanvas2D` signature) staged — a lands first (sub-wave 1), b + c parallel (sub-wave 2).

### Worktree Plan

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AW.W17.a | `/Users/mkbabb/Programming/glass-ui-w17a` | n/a (JS repo) |
| AW.W17.b | `/Users/mkbabb/Programming/glass-ui-w17b` | n/a |
| AW.W17.c | `/Users/mkbabb/Programming/glass-ui-w17c` | n/a |

Or commit a's substrate + b's component-surface before parallelizing c so all share clean main. The orchestrator runs `git worktree list` / `git worktree add` before dispatch.

## Agent Units

### AW.W17.a The Canvas2D substrate

- Goal: glass-ui ships `useCanvas2D` — a Canvas2D lifecycle substrate paralleling `useWebGLCanvas`'s park/freeze/dispose contract, so any Canvas2D field inherits the offscreen + tab-hidden + reduced-motion freeze for free.
- Mechanism:
  - `createCanvas2D(options: Canvas2DOptions): Canvas2DHandle`. `Canvas2DOptions` = `{ canvas: Ref<HTMLCanvasElement | null>, setup: (ctx: CanvasRenderingContext2D) => Canvas2DFrame, autoStart?, respectReducedMotion? }`. `Canvas2DFrame` = `{ render: (ctx, now: number) => void, teardown?: () => void }`. `Canvas2DHandle` = `{ arm(), pause(reason?), resume(reason?), dispose(), isRunning() }`.
  - Lift the suspend/park/freeze MACHINERY pattern from `useWebGLCanvas.ts` (NOT the file — re-author the Canvas2D equivalent): a `suspended: Set<WebGLSuspendReason>` (reuse the union name from the webgl barrel or twin it locally as `Canvas2DSuspendReason`), `isRunning() = suspended.size === 0`, a `requestAnimationFrame(tick)` loop that re-arms only when `armed && isRunning()`. Wire the THREE auto-park seams the webgl substrate already owns: `document.hidden` (`visibilitychange` → suspend/resume `"tab-hidden"`), the offscreen seam (an `IntersectionObserver` with `rootMargin: 200px`, or compose `useIntersectionPause` from `src/composables/motion/` — prefer composing the existing leaf), and the live `prefers-reduced-motion: reduce` `matchMedia` `change` listener (paint ONE static frame via a single `render(ctx, performance.now())` then park; re-monitor so a runtime PRM flip re-freezes/re-arms).
  - dpr-clamped resize: compose `useResizeObserver` (`src/composables/dom/`) → on resize set `canvas.width = round(w*dpr)`, `canvas.height = round(h*dpr)`, `ctx.setTransform(dpr,0,0,dpr,0,0)` with `dpr = Math.min(devicePixelRatio||1, 2)`, then repaint a static frame if parked.
  - `dispose()` idempotent + no-op post-dispose; disconnects the observers + the matchMedia listener + cancels the RAF; calls `frame.teardown?.()`.
- Files: `src/composables/glass/canvas2d/{useCanvas2D.ts,index.ts}`, `src/composables/glass/index.ts`, `scripts/proof-constellation-substrate-single.mjs` (the substrate-existence + park-contract half).
- Sub-gate: a `tests/composables/glass/canvas2d/useCanvas2D.test.ts` asserts the suspend set gates `isRunning()`, a reduced-motion mock parks after one frame, and `dispose()` is idempotent; `npm run typecheck` green.

### AW.W17.b The Constellation lattice + field engine

- Goal: glass-ui ships `Constellation` — the proximity-graph lattice composing `useCanvas2D`, seeded by glass-ui `prng`, with the anomaly skin injected as a consumer `drawOverlay` pass (NOT shipped in `src/`).
- Mechanism:
  - `constellationField.ts` (pure): port the MECHANICAL halves of the slides engine. `interface Node { x; y; vx; vy; r; dim }` (drop `anomaly` — that is skin). `seedField(rng, count, w, h, speed)`: the slides `seed()` minus the `n[0]` anomaly pinning. `stepField(field, k, now, pointer)`: the slides `step()` (drift + wall-bounce + the pointer steer-toward-cursor) minus the anomaly `drift()`. The four neutral passes as free fns: `drawEdges(ctx, field, k, palette)` (distance-falloff hairlines, the `0.17*t` neutral alpha — NO red `a.anomaly || b.anomaly` branch), `drawNodes(ctx, field, k, palette)` (ambient dots), `drawPointerWeb(ctx, field, k, palette, pointer)`, `drawRipples(ctx, field, k, now, ripples)`. Palette read from CSS vars (`--constellation-node` / `--constellation-line` with neutral fallbacks) so the consumer/dark-flip re-tints.
  - `Constellation.vue`: props `count?`, `link?`, `speed?`, `seed?: number | string` (→ `seed === undefined ? Math.random : mulberry32(typeof seed === 'string' ? hashString(seed) : seed)` from glass-ui `prng`), `pointerReactive?` (default true), `class?`, `drawOverlay?: (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => void`. Compose `createCanvas2D`: the `setup` hook seeds the field, the `render(ctx, now)` calls `stepField` (skipped under the substrate's reduced-motion park), then the four neutral passes, then `props.drawOverlay?.(ctx, field, now)` LAST. Expose `ConstellationField` ( `{ nodes, w, h, k, dpr }`) to the overlay so the consumer can pin its own anomaly to a field node. Pointer listeners (move/leave/down → ripple) on the host, gated off under reduced-motion.
  - Subpath + barrel + api: `subpaths/constellation.ts` the mirror; `index.ts` the barrel; `api/index.ts` adds `ConstellationProps` + `ConstellationField`; `package.json` registers `"./constellation"`.
- Files: `src/components/custom/constellation/{Constellation.vue,constellationField.ts,index.ts}`, `src/subpaths/constellation.ts`, `src/api/index.ts`, `package.json`.
- Sub-gate: `npm run typecheck` green; a `tests/components/custom/constellation/constellationField.test.ts` asserts `seedField` produces `count` nodes within bounds + `stepField` bounces a node off a wall (velocity sign flips); `grep "mulberry32\|hashString" src/components/custom/constellation/Constellation.vue` shows the imports come from `../../../utils/prng` (NOT a local copy).

### AW.W17.c The neutral-lattice demo consumer

- Goal: a demo story renders the neutral lattice + a `drawOverlay` focal node, proving the anomaly-skin seam with glass-ui-toned (NOT NC-red) content — so the branded anomaly stays a consumer concern (consumer #1).
- Mechanism:
  - `demo/stories/substrates/constellation.vue` — a full-bleed `<Constellation :seed="'glass-ui'" :count="56" pointer-reactive>` on a warm-cream `<ShowcaseFrame>`, plus a `:draw-overlay` that paints ONE focal node in `--primary` with a soft pulse ring (the demo's own skin — deliberately NOT the slides red anomaly, to prove the seam carries arbitrary consumer content). A toggle flips `pointer-reactive` to show the steer-toward-cursor + ripple behavior. A reduced-motion note documents the substrate's static-frame freeze.
  - `demo/stories/manifest.ts` — register the `substrates/constellation` route.
- Files: `demo/stories/substrates/constellation.vue`, `demo/stories/manifest.ts`.
- Sub-gate: the demo dev server renders the constellation route without console error; the lattice animates (nodes drift, edges re-triangulate); the `--primary` overlay node paints; reduced-motion renders one static frame.

## Hard Gate

1. **`proof:constellation-substrate-single` green.** `npm run proof:constellation-substrate-single` exits 0: `src/composables/glass/canvas2d/useCanvas2D.ts` exists and exports `createCanvas2D`; `Constellation.vue` imports `mulberry32`/`hashString` from `src/utils/prng` (the single-source PRNG — NO private `mulberry32` re-roll in the constellation dir); `constellationField.ts` contains NO `anomaly`/red-skin draw pass (the anomaly is a consumer `drawOverlay`, asserted by grep — no `accentColor`/`--ncsu-red`/`Fira Code` literal in `src/components/custom/constellation/*`). Born RED on HEAD (no substrate, no component). JSON artifact emitted.
2. **Substrate park contract.** The `useCanvas2D` test (unit a) green: the suspend set gates `isRunning()`; a reduced-motion mock paints one frame then parks; `document.hidden` suspends; `dispose()` is idempotent. The Canvas2D substrate inherits the SAME freeze contract as `useWebGLCanvas` (offscreen + tab-hidden + reduced-motion).
3. **Anomaly skin is consumer-supplied.** `grep -rn "ncsu\|anomaly\|Fira Code\|accentColor" src/components/custom/constellation/` returns zero (the branded NC-red anomaly + dashed Fira-Code callout do NOT live in the library; they reach the canvas only via the `drawOverlay` injection). The demo consumer (unit c) proves the seam with a NEUTRAL `--primary` overlay, not the slides skin.
4. **Subpath publishes.** `npm run verify-export-types` resolves `@mkbabb/glass-ui/constellation`; `dist/constellation.js` + `dist/constellation.d.ts` emit flat.
5. **Two-consumer justification recorded.** The wave file's §Two-consumer ledger names consumer #1 (the demo story, this wave) and consumer #2 (the slides anomaly-ring deck, H.W10) — the AV.W8 gate (≥2 consumers) that held the primitive now clears; H.W10's swap RETIRES the slides private `mulberry32` + the hand-rolled RAF-park + the MutationObserver active-gating, consuming `prng`/`useCanvas2D` instead.
6. **Typecheck + build.** `npm run typecheck` green; `npm run build` green (the `ConstellationProps`/`ConstellationField` types typecheck; the `./constellation` chunk emits, ≈ standalone Canvas2D size).

## Format And Lint Cadence

- After unit a lands: the `useCanvas2D` unit test + `npm run typecheck`.
- After unit b lands: the `constellationField` unit test + `npm run typecheck` + `npm run proof:constellation-substrate-single` + `npm run verify-export-types`.
- After unit c lands: `npm run build` + the demo dev-server smoke of the constellation route.
- Tests live under `tests/` mirroring `src/` (AV.W14 — NO test files in `src/`; `proof:no-test-in-src` enforces it).
- Docs-only artifacts in this wave file: `git diff --check` for whitespace.
- No formatter skipped; the repo `proof:*` ESM gates are the generated-format check for the new `.mjs`.

## Verification Artefacts

- `scripts/proof-constellation-substrate-single.mjs` JSON artifact (the substrate-existence + prng-source + anomaly-absence scan) saved at wave close.
- The `useCanvas2D` + `constellationField` test logs (suspend-set gating, reduced-motion park, wall-bounce).
- A screenshot of the demo constellation story (the neutral lattice + the `--primary` focal overlay) on warm cream, plus a reduced-motion static-frame capture.
- The `git diff` of `package.json` showing the new `./constellation` export.
- Commit hashes for the three units.

## Commit Plan

- `feat(tranche-AW): W17 (substrate) — useCanvas2D Canvas2D lifecycle (park/freeze/dispose parallel to useWebGLCanvas)` (unit a; commit body required — names the three auto-park seams + the reduced-motion static-frame contract).
- `feat(tranche-AW): W17 (component) — Constellation proximity-graph lattice + constellation subpath + prng consumption` (unit b; commit body required — names the neutral-passes/anomaly-overlay split + the `prng` single-source consumption + the born-RED-then-green gate).
- `feat(tranche-AW): W17 (demo) — neutral-lattice constellation story (consumer #1)` (unit c).
- `docs(tranche-AW): W17 close — constellation status + two-consumer ledger + AV.W8 unblock note` (orchestrator close).

## Dependencies

- **Depends on**: `src/utils/prng.ts` (`mulberry32`/`hashString`, shipped AV.W14), `src/composables/motion/useIntersectionPause.ts` + `src/composables/dom/useResizeObserver.ts` (composed by `useCanvas2D`) — all live at HEAD.
- **Blocks**: H.W10 (the slides SlideXray + Slide01 swap onto `@mkbabb/glass-ui/constellation` `Constellation` — consumer #2; the slides private `mulberry32`/RAF-park/MutationObserver cannot retire until this ships).

## Archaeology

This wave LANDS what AV.W8 deliberately did not. AV.W8 authored the `useCanvas2D` + `Constellation` design but GATED-NOT-LANDED it because the primitive had exactly ONE consumer (the slides til-briefing deck) — shipping it then would have violated the visual-load-bearing-ness invariant (substrate-without-≥2-consumers is binary at close; L invariant 8). The new guardrail that makes this wave legitimate: H.W10 is consumer #2 (the slides deck swaps onto the library primitive), and the demo story is consumer #1 — the ≥2-consumer bar is cleared BEFORE ship, not after. The lift is mechanical (the 5 draw passes split into 4 neutral + 1 injected; the `mulberry32` re-roll collapses onto the shipped `prng`; the hand-rolled RAF-park collapses onto the `useCanvas2D` substrate), and the branded content (the NC-red anomaly ring, the dashed Fira-Code callout) stays a consumer skin — so the library surface carries zero deck-domain content.

## Two-consumer ledger (canonical)

| Consumer | Surface consumed | Ships in | Disposition |
|---|---|---|---|
| Demo constellation story | `<Constellation :seed :count pointer-reactive :draw-overlay>` with a `--primary` neutral overlay | AW.W17 (consumer #1) | **KEEP** — proves the anomaly-skin seam carries arbitrary consumer content, NOT the slides red skin |
| Slides anomaly-ring deck | `@mkbabb/glass-ui/constellation` `Constellation` + a `drawOverlay` that paints the NC-red anomaly ring + dashed Fira-Code callout | H.W10 (consumer #2) | **PORT** — retires the slides private `mulberry32` (→ `prng`), the hand-rolled RAF-park (→ `useCanvas2D`), the MutationObserver active-gating; keeps the anomaly `drawOverlay` verbatim (the strongest design element, the digest names it preserve-as-is) |

The ≥2-consumer rule clears: the demo story + the slides deck both compose the SAME `useCanvas2D` substrate + the SAME neutral lattice; the slides skin reaches the canvas only via the shared `drawOverlay` seam. No duplication is created — the slides swap DELETES three hand-rolled concerns (PRNG, RAF-park, active-gating) and the library ships zero deck-domain content (no NC-red, no anomaly, no Fira-Code callout in `src/`).
