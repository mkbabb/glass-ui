// BB.W-EASING-PRIMITIVE — the SVG-geometry + sampling magic-number home for the
// <EasingPicker> family (the colocation `constants.ts` clause — the editors carried
// these inline as module-scope consts; homed here so the composable + SFCs stay
// magic-number-free).
//
// Curve math belongs to value.js. These are chassis constants only: SVG geometry,
// sample density, drag hit-radii, and the bounded editor-local preview clock.

/** The bezier-mode catalogue key used for the live-edited custom curve. */
export const CUSTOM_PRESET = "custom" as const;

/** The default bezier-mode preset (a back-overshoot curve reads expressive). */
export const DEFAULT_BEZIER_PRESET = "ease-out-back" as const;

/** The default steps-mode jump count + term. */
export const DEFAULT_STEP_COUNT = 4;
export const DEFAULT_STEP_TERM = "end" as const;

/** The steps-mode slider bounds. */
export const STEP_COUNT_MIN = 1;
export const STEP_COUNT_MAX = 12;

/** Dense staircase sampling so the riser/tread reads crisp (a sampled staircase,
 *  not a smoothed curve). */
export const STEP_PLOT_SAMPLES = 240;

/** bezier-Y (0 bottom, 1 top) → SVG-Y (0 top, grows down). */
export const SVG_FLIP = (y: number): number => 1 - y;

/** The bezier-canvas viewBox overshoot clamp + pad (a back-curve must not blow up
 *  the canvas). */
export const VIEW_PAD = 0.1;
export const MAX_OVERSHOOT = 0.6;

/** The pointer hit-radius for grabbing a handle (touch is forgiving). */
export const HANDLE_HIT_RADIUS = 0.1;
export const HANDLE_HIT_RADIUS_TOUCH = 0.15;

/** The number of curve samples the viewBox bounds-fit walks. */
export const VIEWBOX_FIT_SAMPLES = 16;

/** The one-shot rAF travel clock (ms) for the playback dot. */
export const TRAVEL_DURATION_MS = 1200;

/** The copy-feedback dwell (ms). */
export const COPY_FEEDBACK_MS = 1400;
