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
