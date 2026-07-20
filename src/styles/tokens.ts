/**
 * Runtime design tokens — the JS/TS projection of glass-ui's CSS custom properties.
 *
 * CSS tokens in `src/styles/tokens.css` drive the rendered UI. Some contexts
 * (echarts configs, Canvas 2D, WebGL, canvas-rendered charts) cannot resolve
 * CSS variables at render time — they need literal numbers and strings.
 *
 * This module provides literal runtime values and the public semantic manifest.
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

/** Default form-select minimum width (px). Matches `--input-min-width-sm`. */
export const minWidthInputSm = 80;

/**
 * Stagger increments (ms) for animation cascades driven from JS
 * (e.g. echarts `animationDelay: (idx) => idx * motionStagger.default`,
 * Vue inline-style binding) so the JS-driven cascade and CSS-driven
 * while CSS keeps only the default shared rung:
 *
 *   - `tight` (40ms)    — dense row cascades (StatsCards row strip,
 *                         results-table `:nth-child` delays)
 *   - `default` (80ms)  — canonical row stagger (ResultStack, bar
 *                         entrance, the default row cascade)
 *   - `relaxed` (120ms) — wider series cascades (TimeSeriesChart)
 *
 */
export const motionStagger = {
    tight: 40,
    default: 80,
    relaxed: 120,
} as const;

export * from "./tokens/manifest";
