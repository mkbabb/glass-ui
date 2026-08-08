// The chassis constants for the `<EasingCurve>` / `<EasingPicker>` family: the
// CONSTANT frame, the overshoot clamp, the pointer hit floor, and the two clocks.
//
// Curve math belongs to value.js. Nothing here samples, fits, or evaluates a curve.
//
// THE FRAME IS A CONSTANT, AND THAT IS THE POINT. It used to be a function of the
// curve — a `viewBox` re-fitted on every edit — so px-per-unit moved under a
// dragging finger and two plots side by side were 9% apart while the page invited
// you to compare them. Six defects died in one declaration: the letterbox is zero by
// aspect identity, comparability holds by construction, the CTM is drag-invariant,
// the fit machinery is gone, SVG-unit type is gone, and `aspect-ratio: 1` became
// true. Anything below that reads as a function of the curve is a regression.

/** The bezier-mode catalogue key used for the live-edited custom curve. */
export const CUSTOM_PRESET = "custom" as const;

/** The default bezier-mode preset (a back-overshoot curve reads expressive). */
export const DEFAULT_BEZIER_PRESET = "ease-out-back" as const;

/** The default steps-mode jump count + term. */
export const DEFAULT_STEP_COUNT = 4;
export const DEFAULT_STEP_TERM = "jump-end" as const;

/** The steps-mode bounds. */
export const STEP_COUNT_MIN = 1;
export const STEP_COUNT_MAX = 12;

/** bezier-Y (0 bottom, 1 top) → SVG-Y (0 top, grows down). Its own inverse. */
export const SVG_FLIP = (y: number): number => 1 - y;

/** The frame bleed, module-private: the frame EDGES are the published fact and the
 *  bleed is how they are derived. The 30-preset catalogue spans y ∈ [−0.0969,
 *  +1.0927], so 0.1 is the TIGHT bound on the shipped curve family — not a mint. */
const VIEW_PAD = 0.1;

/** The frame edges in both axes, in curve space AND in SVG space (the frame is
 *  square and the flip is an involution, so one pair serves both). */
export const FRAME_MIN = -VIEW_PAD;
export const FRAME_MAX = 1 + VIEW_PAD;

/** The frame's edge-to-edge span. Rounded because `1.1 - -0.1` is 1.2000000000000002
 *  in binary floating point, and a viewBox string is compared byte-for-byte by the
 *  gate that exists to prove it never changes. */
const FRAME_SPAN = +(FRAME_MAX - FRAME_MIN).toFixed(6);

/** THE constant viewBox — square, both modes, every preset, every frame of a drag. */
export const VIEW_BOX =
    `${FRAME_MIN} ${FRAME_MIN} ${FRAME_SPAN} ${FRAME_SPAN}` as const;

/** How far a control point may be authored past the unit box. Handles beyond the
 *  frame PIN to its edge along their own leader; the authored value keeps going. */
export const MAX_OVERSHOOT = 0.6;

/** Pointer hit radii in CSS PIXELS, never user units — a user-unit radius is a
 *  function of the frame and shrank to a 40.7px target at the small clamp, under
 *  the 44px coarse floor. 22px radius = the 44px diameter floor exactly. */
export const HANDLE_HIT_RADIUS_PX = 22;
export const HANDLE_HIT_RADIUS_TOUCH_PX = 28;

/** The one-shot rAF travel clock (ms) for the playback dot. */
export const TRAVEL_DURATION_MS = 1200;

/** The copy-feedback dwell (ms). */
export const COPY_FEEDBACK_MS = 1400;

/** Maximum wait for a Clipboard write before offering manual selection (ms). */
export const COPY_ATTEMPT_TIMEOUT_MS = 2000;
