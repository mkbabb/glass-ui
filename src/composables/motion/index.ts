// Barrel for motion composables backed by @mkbabb/keyframes.js.
export { DAMPING, SNAP_THRESHOLD } from "./constants";
export {
    useSpringOrchestrator,
    type SpringSnapshot,
} from "./useSpringOrchestrator";
export { useStaggerReveal } from "./useStaggerReveal";
export { useScrollProgress } from "./useScrollProgress";
export {
    useAnimatedNumber,
    type AnimatedNumberMode,
    type AnimatedNumber,
    type UseAnimatedNumberOptions,
} from "./useAnimatedNumber";
export {
    useAnimatedNumberMap,
    type UseAnimatedNumberMapOptions,
} from "./useAnimatedNumberMap";
export { useDarkModeSync } from "./useDarkModeSync";
export {
    useRAFLoop,
    type RAFLoopCallback,
    type RAFLoopControls,
    type RAFLoopTiming,
    type UseRAFLoopOptions,
} from "./useRAFLoop";
export {
    useIntersectionPause,
    type IntersectionPauseControls,
    type PausableRuntime,
    type UseIntersectionPauseOptions,
} from "./useIntersectionPause";
export {
    useStagger,
    type UseStaggerOptions,
    type UseStaggerControls,
} from "./useStagger";
