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
// BD.W-SUBSTRATE-SIZE-UNIFY — the ONE backing-store sizer's types, so a consumer that
// adopts the leaf sizer types its `resize(s: BackingSize)` + its `dprPolicy`.
export {
    sizeBacking,
    type BackingSize,
    type DprPolicy,
} from "../webgl/createCanvasLifecycle";
