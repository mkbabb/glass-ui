# BI.W-P045 — Remove the dead canvas replacement path

**Status:** DONE — PRODUCT COMPLETE
**Topological stratum:** BI.S16
**Terminal owner:** glass-ui

## Authority

Renderer capability, actual engine identity, and typed failure are already implemented.
This wave removes the remaining arbitrary DOM replacement path and keeps failure
explicit. It does not create a capability registry or enroll unrelated components.

## Live state

- `RendererStatus` reports `initializing | ready | error`, the actual engine,
  adapter/context identity, and an attributed error.
- Aurora, Blob, Constellation, FourierField, and LiquidGrid emit runtime status.
- Their substrate demos render that live status, including errors.
- `createGpuSubstrate` uses WebGPU when it can honor the scene and the declared
  WebGL2 path for recognized pre-context acquisition failures.
- Pipeline validation failure is already an explicit typed error rather than an
  unrelated renderer success.
- Clone-and-replace behavior and its same-canvas probe are absent.

## Shipped product work

In `src/composables/glass/webgpu/useGpuSubstrate.ts`:

1. Deleted `freshCanvasForFallback`.
2. Deleted `liveCanvas` and the `canvasCanHostWebGL2` dependency used only by that
   replacement path.
3. Builds the recognized WebGL2 fallback on the original canvas.
4. Keeps fallback limited to typed failures that occur before WebGPU owns the canvas
   context.
5. Keeps pipeline/setup/validation failures explicit through `RendererStatus` and the
   installed error channel.
6. Removed comments that promise canvas swapping or silent pipeline-validation fallback.

Add or adjust only focused substrate tests necessary to hold that distinction.

## Protected behavior

- Preserve actual-engine reporting and the current WebGPU-preferred/WebGL2-supported
  selection.
- Preserve Aurora's intentional CSS static mode; it is a declared product mode, not a
  masked GPU failure.
- Do not introduce Canvas2D/CSS substitutes for scenes that require GPU rendering.
- Do not add retries, warning-only failure, DOM replacement, or unhandled rejection.

## Acceptance

- No substrate code clones or replaces a consumer canvas.
- Recognized pre-context WebGPU acquisition failure can still select WebGL2.
- A pipeline/setup failure remains visibly attributed as an error.
- Focused tests assert same-canvas pre-context fallback and explicit WebGPU setup
  failure. This behavior-preserving deletion requires no browser pass and adds no
  Playwright, receipt, or attestation surface.

## Dependencies

Runs after P043. P046, P047, P049, and P050 consume this established status/failure
contract without reopening it.

## Q042 structural follow-up (POST, nonterminal)

Q042 may replace Aurora's narrower local canvas-handle type with the complete
`GpuSubstrateHandle`, including on the explicit unavailable path. This is a type/ownership
correction only: backend choice, same-canvas fallback, typed setup failure, lifecycle, and status
remain this wave's protected behavior. An optional `armAsync` or partial dummy handle is not an
acceptable substitute for the total substrate contract.
