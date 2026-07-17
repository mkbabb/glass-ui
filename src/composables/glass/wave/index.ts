// The shared wave-field leaf barrel (INTERNAL — off the public glass
// barrel, the substrate-leaf posture the flow.* chunks share). paper-grid + concentric
// splice the GLSL/WGSL chunks via a direct relative import; the JS twin is the round-trip
// source-of-truth.

export type { Vec2, CellDriver } from "./waveField";
export {
    travelingEnvelope,
    curlScalar,
    cellTwist,
    cellDriver,
    cellHeight,
    faceRelief,
    facePlateau,
    waveFlow,
    cursorSwirl,
    heightField,
    waveSwell,
    cellWarpBeforeHeight,
} from "./waveField";
export { WAVE_FIELD_GLSL } from "./waveField.glsl";
export { WAVE_FIELD_WGSL } from "./waveField.wgsl";
