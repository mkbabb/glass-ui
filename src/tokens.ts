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
 * Neutral palette literals — light + dark hex pairs of `{foreground,
 * background, muted, border}`. Echarts / Canvas 2D / WebGL chart consumers
 * read these because CSS-var resolution at render time is unavailable.
 *
 * Per G.W3 lane F: matches `--foreground` / `--background` / `--muted-foreground` /
 * `--border` in tokens.css §5.
 */
export const chartNeutrals = {
    light: {
        foreground: "#1a1715",
        background: "#fbf9f7",
        muted: "#766f66",
        border: "#bdb6ad",
    },
    dark: {
        foreground: "#e8e3d9",
        background: "#100e0c",
        muted: "#a09b91",
        border: "#56524d",
    },
} as const;

/**
 * Visualization basis hues — light + dark hex pairs of
 * `--viz-{fourier,chebyshev,legendre,amber,green}`.
 */
export const vizColorsHex = {
    light: {
        fourier:   "#cf3a25",
        chebyshev: "#324fa6",
        legendre:  "#a04ab2",
        amber:     "#bb6f1d",
        green:     "#3a7e62",
    },
    dark: {
        fourier:   "#ec7e6f",
        chebyshev: "#82a3e3",
        legendre:  "#c39ad8",
        amber:     "#dbac63",
        green:     "#7aba9c",
    },
} as const;

/**
 * Hue-stepping helper for categorical color encoding. Returns an HSL string
 * stepping through the spectrum at evenly-spaced positions. Closes the
 * fourier-analysis/web `spectrumColor` 5-copy drift (synthesis #11).
 */
export function spectrumColor(i: number, total: number, alpha?: number): string {
    const hue = total > 0 ? Math.round((i / total) * 360) : 0;
    if (alpha !== undefined) {
        return `hsla(${hue}, 65%, 55%, ${alpha})`;
    }
    return `hsl(${hue}, 65%, 55%)`;
}

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

/**
 * Gold shimmer canvas helper — paints a horizontally-tiled gradient onto a
 * 2D canvas context for use in canvas-rendered headlines + admin glyphs.
 */
export function goldenShimmer(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    position: number = 0,
): CanvasGradient {
    void height;
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    const stops = ["#a87913", "#ffd400", "#dba318", "#ffd400", "#a87913"];
    const offset = ((position % 1) + 1) % 1;
    for (let i = 0; i < stops.length; i++) {
        const t = (i / (stops.length - 1) + offset) % 1;
        gradient.addColorStop(t, stops[i]!);
    }
    return gradient;
}
