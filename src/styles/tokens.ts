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

/** Default form-select minimum width (px). Matches `--input-min-width-sm`. */
export const minWidthInputSm = 80;

/**
 * Stagger increments (ms) — TS mirror of the `--motion-stagger-*` canon
 * promoted at AJ-W4-κ. Use these for animation cascades driven from JS
 * (e.g. echarts `animationDelay: (idx) => idx * motionStagger.default`,
 * Vue inline-style binding) so the JS-driven cascade and CSS-driven
 * cascade resolve to the same value. The three named tiers correspond
 * to `--motion-stagger-tight | --motion-stagger-default | --motion-stagger-relaxed`
 * in `styles/tokens.css`:
 *
 *   - `tight` (40ms)    — dense row cascades (StatsCards row strip,
 *                         results-table `:nth-child` delays)
 *   - `default` (80ms)  — canonical row stagger (ResultStack, bar
 *                         entrance, useStaggerReveal default)
 *   - `relaxed` (120ms) — wider series cascades (TimeSeriesChart)
 *
 * Retires per-consumer constants (SERIES_STAGGER_MS, BAR_STAGGER_MS,
 * STATS_CARD_STAGGER_MS) into single-source token reads. Per A5 §8.9 +
 * AJ-W4-κ.
 */
export const motionStagger = {
    tight: 40,
    default: 80,
    relaxed: 120,
} as const;
