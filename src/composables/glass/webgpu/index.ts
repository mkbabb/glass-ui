// BB.W-VIZ-SUITE (W-GPU-SUBSTRATE) — the WebGPU backend subtree barrel.
//
// INTERNAL (not on the public `src/composables/glass/index.ts` barrel — the WebGL2
// substrate is likewise internal; aurora/blob/the new viz compose it via a direct
// relative import). The picker + the backend + the feature-detect ship here; a viz
// reaches `createGpuSubstrate` from this barrel.

export {
    createWebGPUCanvas,
    supportsWebGPU,
    WebGPUInitError,
    type WebGPUCanvasFrame,
    type WebGPUCanvasHandle,
    type WebGPUCanvasOptions,
    type WebGPUSuspendReason,
} from "./useWebGPUCanvas";
export {
    createGpuSubstrate,
    type GpuBackend,
    type GpuSubstrateHandle,
    type GpuSubstrateOptions,
} from "./useGpuSubstrate";
