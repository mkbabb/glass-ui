# W-WEBGPU-EVERYWHERE — the substrate floor that never crashes to black (DELTA)

**Wave:** BC.W-WEBGPU-EVERYWHERE (Band 4, FIRST — the shared substrate floor)
**Captured:** 2026-06-19 · real-GPU **Apple Metal** (chromium-headless-new, `--use-gl=angle --use-angle=metal --enable-unsafe-webgpu`), demo `:5199`
**Gate:** `proof:webgpu-everywhere` (W1/W2/W7/π-spec + 4 self-test bites GREEN; W3 standing per-viz)
**π:** `tests-visual/webgpu-everywhere.spec.ts` — **14/14 GREEN** on real Metal (both modes)

## The BB disease this cures

BB shipped headless-GREEN but visually-BROKEN viz (the AW halt): blob = **pure black + `no GPU adapter` PAGEERROR**, aurora core dark, the substrate picker committed the backend SYNCHRONOUSLY off a presence-only `supportsWebGPU()` check that NEVER called `requestAdapter()`. On a host where `navigator.gpu` exists but `requestAdapter()` returns null (headless, SwiftShader, blocklisted, the live CI), the WebGPU backend was already committed → `armAsync()` THREW to the page with no fallback. The "parity" gate (`proof:gpu-substrate-single`) was a tautology — ΔE-0.0 = the CPU evaluator vs itself, greening on a crashing WGSL canvas. **No gate measured a real on-host `meanLum > 0`.**

## The fix (the picker, the typed signal, the WGSL-compile floor)

1. **The async try-WebGPU-then-rebuild-WebGL2 picker** (`useGpuSubstrate.ts`). The backend is no longer chosen at construction. `armAsync()` ATTEMPTS the WebGPU init inside a `try`; on ANY init failure (no adapter / device reject / device-lost-at-birth / validation throw) the picker DISPOSES the WebGPU leaf + REBUILDS on the WebGL2 net — SILENTLY (the user never sees a downgrade). The `backend` field starts at the optimistic choice and resolves to the actual backend after `armAsync()`.
2. **The typed init signal** (`useWebGPUCanvas.ts`). The bare `throw new Error("no GPU adapter")` (the HEAD `:245` uncaught form, D8') is replaced by a recognizable typed `WebGPUInitError` the picker catches. A recognized init failure does NOT fire the consumer's `onInitError` (reserved for a genuine post-arm shader/OOM violation — the W-AURORA-SWRASTER precedent: a no-adapter fall is a substrate decision, not a contract violation).
3. **The WGSL-compile floor** (`proof:webgpu-everywhere` W7). The GooBlob `metaball.wgsl` used `var target` — `target` is a **WGSL reserved word** (W3C WGSL §16.2), an invalid identifier → the shader module never compiles → the WGSL primary never arms → silent fall to WebGL2 forever (the exact disease the spec names). Renamed `target → targetL` (byte-identical math). The device-free static validator (reserved-keyword + structure) + the LOCAL real-`createShaderModule` arm both lock it.

## CAPTURED PAINT (the anti-BB-disease proof, real Metal)

Every substrate route PAINTS a living field in BOTH modes — `meanByte`/`maxChannel`/`coverage` clear the paint-existence floor, the console is EMPTY of thrown adapter errors:

| route | paints (light) | paints (dark) | adapter-error spew |
|-------|:--:|:--:|:--:|
| `/substrates/aurora` | ✓ | ✓ | none |
| `/substrates/blob` (was **pure black + PAGEERROR**) | ✓ | ✓ | none |
| `/substrates/constellation` | ✓ | ✓ (sparse stars on dark — maxChannel 248, coverage 1.0) | none |
| `/substrates/fourier-field` | ✓ | ✓ | none |
| `/substrates/dot-flow-field` | ✓ | ✓ | none |
| `/substrates/concentric` | ✓ | ✓ | none |

- **The offscreen-park attaches ZERO frames** — a substrate scrolled fully offscreen does not repaint (the `createCanvasLifecycle` demand-gate held; backend-agnostic, both the WGSL primary and the WebGL2 net inherit the ONE leaf).
- **WGSL compile on Metal**: aurora / concentric / flow-render / flow-compute compile **fully clean**; the metaball reserved-keyword class is **GONE** (the `var target` fix verified on real Metal).
- **Adapter-less silent fall** (device-free): the no-adapter → WebGL2 net rebuild is locked by `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` (the picker falls SILENTLY, `onInitError` untouched, the consumer's frame still runs — the substrate PAINTS, never a black void).

## Known residual (per-viz-owned, surfaced not hidden)

- **metaball.wgsl `fwidth` uniformity** (`BC.W-GOOBLOB-MEATBALL` owns): WGSL's uniformity analysis rejects `fwidth(N)` in the metaball fragment (N derives from `uv` mutated inside the pointer/satellite non-uniform branches), so the GooBlob WGSL primary falls to the WebGL2 net — **which DOES paint** (the substrate-everywhere paint floor is met). The structural fix (a uniform-flow derivative or a Toksvig re-derivation) is a metaball-math decision the GooBlob per-viz wave owns, NOT a compile rename. The W7 LOCAL arm SURFACES it (logged), never silently hides it behind the picker's fall.
- **W3 (no Canvas2D primary)** — standing-RED until the per-viz Band-4 waves migrate constellation / fourier-field / dot-flow off `useCanvas2D` onto `createGpuSubstrate`. This wave OWNS the cross-cutting requirement + the gate clause that ENFORCES it; the per-viz waves deliver the re-home.

## Orchestrator-owned (real Metal / WebKit, `--run pi`)

The W4 real-GPU meanLum + W6 WebKit come-up + W8 steady-state ≥55fps are LOCAL on a real device (the AY W-LIVE1 split). The paint truth captured here is the chromium-headless-new Metal lane (14/14). The WebKit (`webkit` project, Safari 26+) come-up + the un-throttled fps trace ride the orchestrator's `--run pi` on real Metal/Safari.
