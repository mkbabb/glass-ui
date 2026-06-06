# AV.W8 — the constellation procedural primitive + the useCanvas2D substrate (D1 + E1; ADOPT-gated)

## 2. State

**Name**: W8 — constellation primitive (proximity-graph + spatial binning [+ optional Verlet settle]) on a NEW `useCanvas2D` substrate — the SOTA D1+E1 headline procedural deliverable
**Opens after**: nothing in-tranche structurally — the substrate + primitive are Canvas2D, disjoint from the WebGL shader waves (W1/W2). **BUT the ≥2-consumer gate governs whether it LANDS at all** (see §3 — the wave is CONDITIONAL on the 2nd consumer mustering; if UNMET at authoring, the substrate + primitive are authored conditionally with the trigger named, per the visual-load-bearing precept). Non-publish-blocking.
**Agents**: 2 lanes — **(A) substrate** (`useCanvas2D` — composing `useRAFLoop` + `useIntersectionPause`), **(B) primitive** (the constellation built on the substrate + the draw-discipline). B depends on A (the primitive composes the substrate); serial A→B in one worktree OR A lands first.
**Hard gate**: `proof:canvas2d-substrate-consumer` GREEN (the `useCanvas2D` substrate + the constellation primitive each map to ≥2 DISTINCT resolving-at-HEAD consumer contexts) — OR the wave is formally GATED-NOT-LANDED with the 2nd-consumer trigger named in `PROGRESS.md`; the existing gate matrix + `typecheck` + `build` stay green.
**Status**: planned (CONDITIONAL — see §3 muster)

**Type:** IMPL (procedural-anim primitive + a new substrate — the SOTA-resolves-the-BOOK headline). Non-publish-blocking; ADOPT-gated on the ≥2-consumer muster.
**Scope source:** `docs/tranches/AV/audit/SOTA-crosswalk.md` §2.D D1+D2 (the constellation primitive + its draw discipline) + §2.E E1 (Canvas2D, NOT WebGL — below the crossover). The SOTA RESOLVES the prior AV.md §3.3 `useCanvas2D` KEEP-BOOK ("a 2nd Canvas2D consumer") into an ADOPT: D1 names the constellation as "the missing named sibling to aurora/blob … ADOPT as the AV headline deliverable", E1 names the substrate as "Canvas2D, sibling to (not folded into) `useWebGLCanvas`." This file is the FULLY-formed, execute-without-re-deriving spec for W8.

**Precepts in force.** No legacy / no back-compat aliases (clean break — the constellation ships as a glass-ui primitive on its subpath; no slides-local alias). Gestalt transposition, not patch — `useCanvas2D` is a SIBLING substrate composing the EXISTING `useRAFLoop` + `useIntersectionPause` (it does not re-invent the RAF loop or the visibility-park; it reuses the AU.W6-era motion primitives). KISS — Canvas2D, NOT WebGL (below the crossover — hundreds of nodes; faster startup, no GPU-init tax; SOTA E1). Visual-load-bearing-ness (J inv 10) — the substrate + primitive ship ONLY when ≥2 DISTINCT consumers muster; UNMET → GATED-NOT-LANDED with the trigger named. value.js-FREE + vueuse-FREE substrate (Canvas2D + `useRAFLoop`/`useIntersectionPause`, both dependency-free). Presets-in-consumers — the constellation's color/count/link tokens are consumer-overridable; the slides ANOMALY skin stays slides-local.

## 2a. Goal criterion

This wave succeeds if (1) a new `useCanvas2D` substrate — a SIBLING to `useWebGLCanvas`, composing `useRAFLoop` (the shared RAF clock) + `useIntersectionPause` (the offscreen/tab-visibility park) — provides the canvas lifecycle (acquire 2D context, DPR-aware sizing, resize-observe, the RAF arm, the reduced-motion one-static-frame) for any Canvas2D animation; (2) the constellation is a glass-ui primitive (proximity-graph node lattice + spatial binning for the O(n) neighbor query + an OPTIONAL Verlet settle) built ON the substrate, with the SOTA D2 draw discipline (polyline batching, NO `shadowBlur`, a pre-rendered radial-gradient glow sprite `drawImage`'d per node, floored coords, never `getImageData` per-frame); (3) the ≥2-consumer bar is met — the slides til-briefing constellation (which G.W2 swaps onto `useRAFLoop`/`useIntersectionPause` as the PREP) + a 2nd consumer (a glass-ui demo story); (4) IFF the 2nd consumer is UNMET at authoring, the wave is GATED — the substrate + primitive are specified but NOT landed, with the trigger named. The reader's test: dropping either consumer reddens `proof:canvas2d-substrate-consumer`; the constellation never calls `shadowBlur` or `getImageData` in its draw loop; the substrate reuses `useRAFLoop`/`useIntersectionPause`, it does not re-roll the RAF.

## 3. Scope

1. **`useCanvas2D` substrate (the SOTA E1 ADOPT — the BOOK resolution).** Create `src/composables/glass/canvas2d/useCanvas2D.ts` — a Canvas2D lifecycle substrate SIBLING to `useWebGLCanvas`: acquires the 2D context (`willReadFrequently:false` — the E4 guardrail: never `getImageData` on the animation canvas), DPR-aware sizing (reuse the `--av-dpr-max`/DPR≤2 clamp idiom from AV.W7 F6), a `ResizeObserver`, and the RAF arm COMPOSED FROM `useRAFLoop` (the shared clock) + `useIntersectionPause` (the offscreen/tab park — so the Canvas2D substrate inherits the SAME visibility-park discipline AV.W7 lands on the WebGL substrate) + the reduced-motion one-static-frame seam (G1 floor — a Canvas2D animation must also freeze to one frame under `reduce`). The substrate is shader-agnostic; it hands the consumer the `ctx` + the per-frame `timing`.
2. **The constellation primitive (the SOTA D1 headline).** Build the constellation as a glass-ui primitive (`src/components/custom/constellation/` — `Constellation.vue` + a `useConstellation` composable) on `useCanvas2D`: a proximity-graph node lattice (nodes drift on constant velocities, bounce off bounds; any two within `link` px joined by a distance-falloff hairline), with **spatial binning** (a uniform grid / spatial-hash bin so the neighbor query is O(n) not O(n²) — the SOTA D1 named technique) and an **OPTIONAL Verlet settle** (a relaxation pass for a settled lattice; opt-in, off by default — KISS). The node-drift uses the cheap-in-2D fbm/domain-warp pattern (SOTA D3) IFF the AV.W2 shared-noise leaf is available (else constant-velocity drift — the slides default). Tokens (count/link/speed/colors) are consumer-overridable.
3. **D2 draw discipline (ADOPT with D1).** The draw loop: **polyline batching** (batch the hairlines into one `beginPath`/`stroke` per opacity bucket, not a path per edge — state-change minimization); **NO `shadowBlur`** (a per-node `shadowBlur` is a per-pixel blur cost — instead pre-render ONE radial-gradient glow SPRITE to an offscreen canvas at mount and `drawImage` it per node); **floored coords** (`Math.floor(x)`/`Math.floor(y)` to hit the integer-pixel fast path); **never `getImageData` per-frame** (Chrome flips the canvas to CPU after 2 un-flagged reads — the E4 guardrail; any pixel readback is isolated to a dedicated `willReadFrequently` canvas off the animation path). [SOTA §2.D D2, cit. B9 §2]
4. **The ≥2-consumer muster (the GATE — governs whether the wave LANDS).** The substrate + the primitive each need ≥2 DISTINCT resolving-at-HEAD consumers (J inv 10):
   - **Consumer 1 — the slides til-briefing constellation.** `/Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts` (488 lines, Canvas2D, proximity-graph + drift + reduced-motion one-frame, single shared RAF over `.is-active` slides). It runs its OWN `requestAnimationFrame` (`:457,460`) today, NOT `useRAFLoop`/`useIntersectionPause`. The slides **G.W2 swap** (constellation RAF-park → `useRAFLoop`/`useIntersectionPause` — a FOLD-G ledger item in `AV.md §3.4`) is the PREP that makes the slides constellation a glass-ui-substrate consumer. **This is a cross-repo (slides G-tranche) deliverable — it resolves at HEAD only after the slides fork lands.**
   - **Consumer 2 — a glass-ui demo story.** `demo/stories/.../constellation.vue` (or a named trigger). This is the IN-REPO consumer that resolves at HEAD on authoring.
   - **The muster verdict (taken at HEAD):** the slides consumer is a CROSS-REPO PENDING adoption (G.W2 swap not yet landed) — it does NOT count toward ≥2 until it resolves (mirrors `proof:au-w9-consumers`'s "every cited consumer resolves at HEAD" rule). So the in-repo ≥2 must be met by TWO resolving-at-HEAD glass-ui consumers (the demo story + a SECOND in-repo surface), OR the wave is GATED-NOT-LANDED pending the slides G.W2 swap.

### §3.5 — the GATED-vs-LANDED decision (CONDITIONAL authoring)

The wave's land/gate disposition is taken at authoring:

- **IF two resolving-at-HEAD consumers exist** (the demo story + a second in-repo surface — e.g. a paper-backdrop-adjacent decorative background story, or a confirmed second glass-ui demo route) → **LAND.** Author the substrate + the primitive + the demo consumers; `proof:canvas2d-substrate-consumer` greens at ≥2.
- **IF only one resolving-at-HEAD consumer exists** (the demo story alone; the slides constellation is the PENDING cross-repo 2nd) → **GATED-NOT-LANDED.** Author the substrate + primitive SPEC (this file) but DO NOT create the `src/` artefacts; record the KEEP-BOOK in `PROGRESS.md`: "useCanvas2D + Constellation GATED — trigger: the slides G.W2 constellation-RAF-park swap lands (making the slides til-briefing constellation a resolving glass-ui-substrate consumer) OR a second in-repo glass-ui Canvas2D surface musters. At HEAD the demo story is the sole resolving consumer; the substrate is substrate-without-2nd-consumer (J inv 10). The SOTA D1/E1 RESOLVES the prior `useCanvas2D` BOOK to ADOPT-gated — the gate is the muster, not the technique." Do NOT create any `src/` file.
- **The SOTA resolution of the prior BOOK:** AV.md §3.3 carried `useCanvas2D` as KEEP-BOOK ("a 2nd Canvas2D consumer"). The SOTA D1/E1 marks the TECHNIQUE as ADOPT (the constellation IS the named headline procedural deliverable; Canvas2D IS the correct substrate) — so the BOOK moves from "technique unproven" to **ADOPT-gated-on-muster**. The gate is now the 2nd-consumer count, not the architectural question. This is the §3.3 ledger line's promotion: KEEP-BOOK → FOLD-AV-IFF-muster.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The 2nd resolving-at-HEAD consumer cannot be mustered in-repo.** If the demo story is the SOLE resolving consumer (the slides G.W2 swap is the pending cross-repo 2nd), forcing a second SPECULATIVE demo route to clear the count is overfitting (a demo built only to satisfy the gate is not a genuine consumer context). The redress is to GATE-NOT-LAND (per §3.5), a scope decision, not a local edit.
- **`useCanvas2D` cannot cleanly compose `useRAFLoop` + `useIntersectionPause`.** If the Canvas2D lifecycle needs a RAF shape `useRAFLoop` cannot express (a per-canvas clock vs the shared loop the slides constellation uses for `.is-active`-only animation), the redress is the composition boundary (does `useCanvas2D` own a `useRAFLoop` instance per canvas, or share one?), an architectural decision about the substrate, not a local fix.
- **The constellation primitive over-couples to the slides ANOMALY skin.** The slides constellation has a red ANOMALY node (pinned, pulsing, tethered to a label, resolves on `data-resolved`). That skin is SLIDES-EDITORIAL (the `drawAnomaly` skin extract is a FOLD-G item). If the glass-ui primitive bakes in the anomaly, it over-fits — the primitive ships the generic lattice; the anomaly is a consumer SLOT/overlay, not a baked feature. If the extraction cannot cleanly separate them → triumvirate.
- **Any diagnostic loop reaches its third iteration** on the spatial-binning O(n) neighbor-query verify — halt, do not iterate a fourth time.

## 4. File Bounds (CONDITIONAL — only if §3.5 LANDS)

| File | Access | Lane |
|---|---|---|
| `src/composables/glass/canvas2d/useCanvas2D.ts` | create | A |
| `src/composables/glass/canvas2d/index.ts` | create | A |
| `src/composables/glass/index.ts` | modify (re-export the canvas2d sub-tree) | A |
| `src/components/custom/constellation/Constellation.vue` | create | B |
| `src/components/custom/constellation/composables/useConstellation.ts` | create | B |
| `src/components/custom/constellation/index.ts` | create | B |
| `src/constellation.ts` (the subpath barrel) | create | B |
| `vite.library.ts` | modify (the `constellation` entry) | B |
| `package.json` | modify (the `./constellation` export + the gate script) | A/B |
| `src/components/custom/index.ts` | modify (IF root-barrel-cherry-picked — likely subpath-only) | B |
| `demo/stories/.../constellation.vue` | create (the in-repo demo consumer) | B |
| `demo/stories/manifest.ts` | modify (register the demo route) | B |
| `scripts/proof-canvas2d-substrate-consumer.mjs` | create | A |
| `docs/tranches/AV/audit/W8-canvas2d-consumers.json` | create (the consumer tally) | A |
| `scripts/gates.mjs` | modify (register, orchestrator-merged) | A |
| `CLAUDE.md` | modify (Structure block — the `canvas2d/` sub-tree + the `constellation/` custom dir + the `/constellation` subpath) | A/B |
| `docs/tranches/AV/PROGRESS.md` | modify (the muster verdict, the draw-discipline confirmations, the slides-G.W2 cross-repo note) | all |

Do NOT touch: `src/composables/glass/webgl/useWebGLCanvas.ts` (the WebGL substrate is UNCHANGED — `useCanvas2D` is a SIBLING, not a fork; the SOTA E1 explicitly says "sibling to, not folded into") · `src/composables/motion/useRAFLoop.ts` + `src/composables/motion/useIntersectionPause.ts` (CONSUMED, not edited — the substrate composes them) · `/Users/mkbabb/Programming/slides/**` (the slides G.W2 constellation-RAF-park swap is a SLIDES G-tranche deliverable — this wave ships the LIBRARY substrate the slides fork consumes; it does NOT edit slides) · `docs/precepts/`.

## 4a. Disjointness

- **Lane A (substrate)** owns `useCanvas2D.ts` + the `canvas2d/` barrel + the `glass/index.ts` re-export + the gate (`proof-canvas2d-substrate-consumer.mjs`/`gates.mjs`/`package.json`/the `W8-canvas2d-consumers.json` tally). Disjoint.
- **Lane B (primitive)** owns the `constellation/` custom dir + `src/constellation.ts` subpath barrel + the `vite.library.ts` entry + the `package.json` export + the demo story + `manifest.ts`. Lane B DEPENDS on Lane A (the primitive composes the substrate) — serial A→B in one worktree, OR A lands its substrate on the branch first.
- `scripts/gates.mjs` + `package.json` (scripts + exports) are touched by both — append-only to disjoint regions; orchestrator-integrated. `CLAUDE.md`/`PROGRESS.md` orchestrator-merged.

Net: two lanes — **(A) substrate**, **(B) primitive** (depends on A). One worktree (serial A→B) given the dependency.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A+B — canvas2d-substrate + constellation | `/Users/mkbabb/Programming/glass-ui-w8-canvas2d` | serial A→B: substrate first (composing useRAFLoop/useIntersectionPause), then the constellation primitive + the demo consumer + the gate. CONDITIONAL on §3.5 LAND. |

No `CARGO_TARGET_DIR` (Node/Vite repo). The lane runs `npm run typecheck`/`npm run build`/the gate against its own checkout. The orchestrator runs `git worktree add` before dispatch and owns the `gates.mjs`/`package.json`/`CLAUDE.md`/`PROGRESS.md` integration at close. Branches from clean main. IF §3.5 GATES (no land), the lane writes ONLY the `PROGRESS.md` KEEP-BOOK record + the (RED-asserting) consumer tally — no `src/` file.

## 5. Agent Units

### AV.W8.A useCanvas2D substrate (composing useRAFLoop + useIntersectionPause)

- **Goal**: a Canvas2D lifecycle substrate sibling to `useWebGLCanvas`, reusing `useRAFLoop` (the shared clock) + `useIntersectionPause` (the offscreen/tab park) + the reduced-motion one-static-frame seam, with the E4 `getImageData` guardrail.
- **Mechanism**:
  - **`src/composables/glass/canvas2d/useCanvas2D.ts` (create)** — `export function useCanvas2D(canvasRef, { onFrame, reduceMotionStatic, dpr })`: acquire `canvas.getContext("2d", { willReadFrequently: false })` (the E4 guardrail — the animation canvas is GPU-accelerated; any readback is on a SEPARATE `willReadFrequently` canvas); DPR-aware sizing via a `ResizeObserver` (clamp DPR≤2 reusing the AV.W7 F6 `--av-dpr-max` idiom); the RAF arm COMPOSED from `useRAFLoop({ onFrame })` (the shared clock — the substrate does NOT re-roll `requestAnimationFrame`) gated by `useIntersectionPause({ rootMargin: "200px" })` (offscreen + tab-visibility park — the SAME discipline AV.W7 lands on the WebGL substrate); the reduced-motion seam (read `matchMedia('(prefers-reduced-motion: reduce)')` → render ONE static frame, freeze the loop — the G1 floor for Canvas2D too).
  - **`canvas2d/index.ts` + `glass/index.ts`** — export the substrate; re-export the `canvas2d/` sub-tree from the `glass/` barrel (the substrate ships on the `/glass` motion-core-adjacent surface OR its own seam — confirm against the existing `glass/` export shape).
- **Files**: `useCanvas2D.ts` + `canvas2d/index.ts` (create), `glass/index.ts` (modify), the gate (create), `gates.mjs`/`package.json` (register).
- **Sub-gate**: `proof:canvas2d-substrate-consumer` tallies `useCanvas2D` at ≥2 (the constellation primitive + the demo story — OR GATED-NOT-LANDED); `typecheck` green; the substrate composes `useRAFLoop`/`useIntersectionPause` (a grep confirms it does not re-roll `requestAnimationFrame`).

### AV.W8.B Constellation primitive + the D2 draw discipline + the demo consumer

- **Goal**: the constellation is a glass-ui primitive on `useCanvas2D` — proximity-graph + spatial binning + optional Verlet — with the SOTA D2 draw discipline, the generic lattice (no baked anomaly), and the in-repo demo consumer.
- **Mechanism**:
  - **`useConstellation.ts` + `Constellation.vue` (create)** — the node lattice: nodes with `(x,y,vx,vy,r)`; drift on constant velocity (or fbm/domain-warp drift IFF the AV.W2 shared-noise leaf is available); bounce off bounds; a SPATIAL-BIN grid (uniform-grid / spatial-hash) so the within-`link`-px neighbor query is O(n) not O(n²); an OPTIONAL Verlet relaxation pass (opt-in `settle` prop, off by default). Consumer tokens: `count`/`link`/`speed`/node-color/line-color (overridable; read from CSS vars per the slides `readVar` idiom).
  - **D2 draw discipline** — pre-render ONE radial-gradient glow sprite to an offscreen canvas at mount; per frame: batch the hairlines into `beginPath`/`stroke` per opacity bucket (polyline batching), `drawImage` the glow sprite per node at `Math.floor(x)`/`Math.floor(y)`; NO `shadowBlur`; NO `getImageData`. The generic lattice ships WITHOUT the slides ANOMALY skin (the anomaly is a consumer overlay/slot, not a baked feature — §3a over-coupling caveat).
  - **The demo consumer** — `demo/stories/.../constellation.vue` (the in-repo resolving consumer #1) + register in `manifest.ts`.
  - **Subpath** — `src/constellation.ts` barrel + the `vite.library.ts` entry + the `./constellation` export (the primitive ships subpath-only — a Canvas2D background is not a root-barrel cherry-pick; mirrors `/aurora`/`/goo-blob`).
- **Files**: `constellation/` dir (create), `src/constellation.ts` (create), `vite.library.ts` + `package.json` (modify), the demo story + `manifest.ts` (create/modify), `CLAUDE.md` (modify).
- **Sub-gate**: `proof:canvas2d-substrate-consumer` tallies `Constellation` at ≥2 (the demo story + a 2nd resolving in-repo surface — OR GATED); a draw-discipline grep confirms NO `shadowBlur`/`getImageData` in the draw loop; `npm run build` emits `dist/constellation.js`; `typecheck` green.

## 6. Hard Gate

W8 closes when every condition below is evidence-backed:

1. **AV.W8.A** — `useCanvas2D` composes `useRAFLoop` + `useIntersectionPause` (no re-rolled RAF; the offscreen/tab park inherited) + the reduced-motion one-static-frame + the E4 `willReadFrequently:false` guardrail; `typecheck` green. **(LANDED case)**
2. **AV.W8.B** — the constellation primitive (proximity-graph + spatial binning + optional Verlet) ships on `useCanvas2D` with the D2 draw discipline (polyline batching, NO `shadowBlur`, pre-rendered glow sprite, floored coords, no `getImageData`); the generic lattice ships without the baked anomaly; `dist/constellation.js` emits; the `/constellation` subpath resolves. **(LANDED case)**
3. **`proof:canvas2d-substrate-consumer` (NEW, born-RED)** — GREEN: `useCanvas2D` + `Constellation` each map to ≥2 DISTINCT resolving-at-HEAD consumer contexts; every cited path RESOLVES (a pending cross-repo slides consumer is recorded but does NOT count until it resolves); bite: drop the demo story → RED. **OR — the GATED case (§3.5):** the wave is GATED-NOT-LANDED — NO `src/` artefact created, the KEEP-BOOK + the 2nd-consumer trigger (the slides G.W2 swap OR a 2nd in-repo surface) recorded in `PROGRESS.md`, NO gate registered (a born-RED gate against an un-landed substrate violates manifest==ci).
4. **The SOTA BOOK resolution recorded** — the prior AV.md §3.3 `useCanvas2D` KEEP-BOOK is updated to FOLD-AV-IFF-muster (the SOTA D1/E1 ADOPT-gates it); the slides til-briefing constellation (G.W2 swap) is named as the cross-repo 2nd consumer prep.
5. **No regression.** The existing gate matrix stays GREEN: `proof:webgl-substrate-single` (the WebGL substrate is UNCHANGED — `useCanvas2D` is a sibling), `proof:vueuse-free-root`, `proof:package`, `proof:resolution`, `npm run typecheck`, `npm run build`. `PROGRESS.md` records the wave with a green run id.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:canvas2d-substrate-consumer` (LANDED case only) | `scripts/proof-canvas2d-substrate-consumer.mjs` | `["local","ci"]` | drop the demo story (or a resolving consumer) → RED. **NOT registered if §3.5 GATES (no land).** |

Follows the house template (`scripts/proof-au-w9-consumers.mjs` — the consumer-tally form: an injected path-resolver, BOOK-exclusion, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a pure exported `detectConsumers` detector, `process.exit(1)` on any <2 or unresolved). Register in `package.json` + `gates.mjs` ONLY if the wave LANDS (manifest==ci — no born-RED gate against an un-landed substrate).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after AV.W8.A (the substrate) + AV.W8.B (the primitive), and at close. (LANDED case.)
- `npm run build` — after the subpath/`vite.library.ts` edits (confirm `dist/constellation.js` emits), and at close.
- `proof:canvas2d-substrate-consumer` + the no-regression matrix (`proof:webgl-substrate-single`, `proof:vueuse-free-root`, `proof:package`, `proof:resolution`) after the fold and at close.
- The draw-discipline grep (no `shadowBlur`/`getImageData`) + the O(n) spatial-bin verify recorded in `PROGRESS.md`.
- `git diff --check` on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`) at close.

(GATED case: only the `PROGRESS.md` KEEP-BOOK record + the RED-asserting consumer tally; no build/typecheck delta.)

## 8. Verification Artefacts

- `proof:canvas2d-substrate-consumer` JSON artefact (`docs/tranches/AV/audit/W8-canvas2d-consumers.json`, byte-stable via `scripts/gate-output.mjs`) — the ≥2-consumer tally OR the RED muster record.
- The draw-discipline grep result (NO `shadowBlur`/`getImageData` in the draw loop) — `PROGRESS.md`.
- The O(n) spatial-binning neighbor-query verify — `PROGRESS.md`.
- The §3.5 LAND-or-GATE verdict + (if GATED) the 2nd-consumer trigger (the slides G.W2 swap OR a 2nd in-repo surface) — `PROGRESS.md`.
- The SOTA §3.3-BOOK-resolution record (KEEP-BOOK → ADOPT-gated) — `PROGRESS.md`.
- The green CI run id for the wave + the integration commit hashes (per §9).

## 9. Commit Plan

- **Lane A (substrate) commit (LANDED)** — `feat(tranche-AV): W8 — useCanvas2D substrate (sibling to useWebGLCanvas; composes useRAFLoop + useIntersectionPause) + born-RED proof:canvas2d-substrate-consumer`. (Body required — names the sibling-not-fork architecture, the reused RAF/park primitives, the E4 guardrail.)
- **Lane B (primitive) commit (LANDED)** — `feat(tranche-AV): W8 — Constellation procedural primitive (proximity-graph + spatial binning + D2 draw discipline) on useCanvas2D + /constellation subpath`. (Body required — names the spatial-bin O(n) query, the no-shadowBlur/glow-sprite discipline, the generic-lattice-no-baked-anomaly, the demo consumer.)
- **Orchestrator gate-registration commit (LANDED)** — `chore(tranche-AV): W8 — register proof:canvas2d-substrate-consumer (born-RED, manifest==ci)`.
- **Orchestrator integration + docs commit** — `docs(tranche-AV): W8 close — PROGRESS green run id + CLAUDE.md canvas2d/constellation lines + draw-discipline verify` (LANDED) OR `docs(tranche-AV): W8 — GATE useCanvas2D+Constellation (1 resolving consumer; slides G.W2 swap the 2nd-consumer trigger)` (GATED).

## 10. Dependencies

- **Depends on**: `useRAFLoop` + `useIntersectionPause` (`src/composables/motion/` — both at HEAD; the substrate COMPOSES them). The AV.W7 F6 `--av-dpr-max` DPR-clamp idiom (the substrate reuses it; W7 SHOULD land first so the token exists, but the substrate can inline the clamp if W7 is not yet committed). The AV.W2 shared-noise leaf (OPTIONAL — IFF available, the constellation node-drift uses fbm/domain-warp per SOTA D3; else constant-velocity drift). NO dependency on W1 (WebGL — Canvas2D is disjoint).
- **Cross-repo (the slides 2nd consumer)**: the slides til-briefing constellation's **G.W2 RAF-park swap** (`constellation.ts` → `useRAFLoop`/`useIntersectionPause` — the FOLD-G ledger item in `AV.md §3.4`) is a SLIDES G-tranche deliverable gated on the glass-ui 3.3.0 publish hinge E1. It is the cross-repo 2nd consumer PREP — it resolves at HEAD only AFTER the slides fork lands, so it does NOT count toward the in-repo ≥2 muster (per `proof:au-w9-consumers`'s resolve-at-HEAD rule). The in-repo ≥2 (the demo story + a 2nd in-repo surface) governs the LAND/GATE verdict.
- **Blocks**: nothing publish-blocking (non-publish-blocking IMPL). The AV tranche FINAL/close (AV.W6) depends on W8's gate matrix being green (LANDED) OR its GATE record (GATED). The slides G.W2 constellation adoption depends on this substrate shipping in 3.3.0 (IF landed) — else the slides constellation stays slides-local until the muster clears.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The constellation has a HISTORY: it ships TODAY as a 488-line slides-local Canvas2D primitive (`/Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts`) — proximity-graph + drift + bounce + a distance-falloff lattice + a red ANOMALY skin + reduced-motion one-static-frame + a seeded mulberry32 PRNG for reproducible capture. glass-ui carried `useCanvas2D` as a KEEP-BOOK (AV.md §3.3: "a 2nd Canvas2D consumer; Canvas2D ≠ the WebGL substrate; single-consumer slides-local") — the architectural question (is Canvas2D the right substrate? is the constellation a generalizable primitive?) was UNANSWERED, so the lift was BOOKed on the ≥2-consumer bar. The SOTA crosswalk RESOLVES exactly that question: D1 names the constellation "the missing named sibling to aurora/blob … ADOPT as the AV headline deliverable", E1 names the substrate "Canvas2D, sibling to (not folded into) `useWebGLCanvas` … below the crossover; pays no GPU init/complexity tax", and D2 supplies the draw discipline. So the BOOK moves from "technique unproven" to **ADOPT-gated-on-muster** — the only open question is now the 2nd CONSUMER (the slides G.W2 swap makes the slides constellation a substrate consumer; a glass-ui demo story is the 2nd). The gestalt transposition: the slides constellation re-expressed as a glass-ui primitive on a substrate that COMPOSES the existing `useRAFLoop`/`useIntersectionPause` (not a re-rolled RAF), with the slides ANOMALY skin staying a consumer overlay (the `drawAnomaly` skin extract is the slides-side FOLD-G). The wave is CONDITIONAL — it lands at ≥2 resolving consumers, else GATED with the trigger named, per the visual-load-bearing precept.
