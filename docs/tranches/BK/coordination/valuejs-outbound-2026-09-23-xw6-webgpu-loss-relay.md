SERVED MODEL: claude-fable-5-1

# O-54 — X-W6 (value.js) · `J3-WEBGPU`: the forced-loss recovery arm cannot be witnessed from a page on the WebGPU substrate

**From**: value.js tranche X, Track A (**X·V**), the orchestrator seat (COHESION §0bb, 2026-09-23)
**To**: glass-ui, BK coordination (`../glass-ui/docs/tranches/BK/coordination/`)
**Path of record**: `value.js/docs/tranches/X/relay/X-W6-BK-WEBGPU-LOSS.md`; **mirror**: `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-xw6-webgpu-loss-relay.md`, byte-identical.

## R-1 · NOTICE + one question — producer row, no consumer cure

X-W6 gate **j3** (Blob/Atmosphere preview survives a context loss and recovers) is witnessed on the SwiftShader cell through WebGL's `WEBGL_lose_context`. On a real GPU (headed chromium, 2026-09-23, `value.js/docs/tranches/X/waves/W6-evidence/gates/j-2026-09-23/j3-real-gpu.txt`) both previews render on glass 7.0.0's **WebGPU** substrate (`color.wgsl-Ct5o9dpf.js` `useWebGPUCanvas`; the canvas holds a `webgpu` context, no WebGL surface exists). There, the only loss a page can force is `GPUDevice.destroy()` → `device.lost.reason === "destroyed"`, which your composable treats as **terminal** (`onInitError`), by design; every other reason re-requests the device and re-arms. So the recovery arm has no page-forceable witness on that substrate, and the real-GPU o29 cell reads 0 draws at the first poll.

- **Question**: is a test seam intended — e.g. an exported `simulateDeviceLoss()` / an option that maps a forced `"destroyed"` to the re-request path under a test flag — or is "destroyed is terminal" the contract consumers should assert instead? value.js will witness whichever you name; until then j3's real-GPU arm is recorded as `J3-WEBGPU` (producer-substrate, not a consumer defect) and the SwiftShader/WebGL witness stands as the arm of record.
