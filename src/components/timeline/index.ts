export { default as Timeline } from "./Timeline.vue";
export type {
    TimelineProps,
    TimelineSegment,
    TimelineSegmentState,
} from "./types";
// The hue-wrap law, published under the overfitting triage's limb (c) — shipped for a
// NAMED consumer need, not on spec. `accentFor(i)` walks the 13-stop section ramp as
// `(HUE_OFFSET + HUE_STRIDE·i) % HUE_STOPS`; gcd(4, 13) = 1, so it visits all thirteen
// before repeating. Two consumers need exactly that law and no more of the module:
// value.js B-7's L-10 (fourier index-interpolates the ramp with no wrap, so it walks off
// the end) and keyframes.js KF-W7 C-15 (the axis legend painting in hue-parity with the
// Timeline beside it). The three constants ride with the function because a legend that
// re-derives the modulus by hand is the duplication this door exists to end.
// `layout`, `fillFor` and `aggregate` stay INTERNAL — no consumer has asked, and
// `layout()` maps segments onto the unit interval rather than pointer→percent, so
// publishing it would answer a question nobody put.
export { accentFor, HUE_OFFSET, HUE_STRIDE, HUE_STOPS } from "./geometry";
export type { TimelineSpan } from "./geometry";
