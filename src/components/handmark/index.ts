/**
 * HandMark public barrel. The component is the surface; the pure functions ship with
 * it so a caller who owns its own path can ink it with the same pen — `strokeRibbon`
 * takes any polyline.
 */
export { default as HandMark } from "./HandMark.vue";

export {
    SHAPES,
    handBand,
    handLine,
    handRing,
    markDuration,
    minJerk,
    serialize,
    strokeRibbon,
    type Frame,
    type HandShape,
    type Point,
} from "./stroke";
