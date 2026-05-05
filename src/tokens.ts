/**
 * Runtime design tokens — the JS/TS projection of glass-ui's CSS custom properties.
 *
 * CSS tokens in `src/styles/tokens.css` drive the rendered UI. Some contexts
 * (echarts configs, Canvas 2D, WebGL, canvas-rendered charts) cannot resolve
 * CSS variables at render time — they need literal numbers and strings.
 *
 * This module mirrors the CSS tokens for those consumers. Keep in sync.
 */

/** Chart container heights (px). Match `--chart-height-*` in tokens.css. */
export const chartHeights = {
    compact: 240,
    default: 360,
    large: 400,
} as const;

/** Echarts grid margin (px). Matches `--chart-margin` in tokens.css. */
export const chartMargin = 20;

/**
 * Neutral divider colors for chart gridlines, axis ticks, overlays.
 * rgba literals — echarts / Canvas 2D can't parse CSS vars in color options.
 * Match `--color-divider-*` in tokens.css.
 */
export const chartColors = {
    dividerSubtle: "rgba(128, 128, 128, 0.05)",
    dividerMedium: "rgba(128, 128, 128, 0.4)",
    dividerStrong: "rgba(128, 128, 128, 0.7)",
} as const;

/** Default form-select minimum width (px). Matches `--min-width-input-sm`. */
export const minWidthInputSm = 80;

/**
 * Named cubic-bezier curves — runtime projections of canon `--ease-*`
 * tokens for consumers (echarts, Canvas 2D, motion engines) that cannot
 * resolve CSS variables. Keep in sync with tokens.css §2.
 */
export const NAMED_EASING_BEZIER: Record<string, readonly [number, number, number, number]> = {
    standard:    [0.4,   0,    0.2,  1],
    out:         [0,     0,    0.2,  1],
    in:          [0.4,   0,    1,    1],
    "out-expo":  [0.16,  1,    0.3,  1],
    apple:       [0.25,  0.1,  0.25, 1],
    "apple-spring": [0.175, 0.885, 0.32, 1.275],
} as const;
