import {
    onBeforeUnmount,
    onMounted,
    reactive,
    watch,
    type Ref,
    type ShallowRef,
} from "vue";
import { clamp, srgbToOKLab, oklabToOklch, oklchToOklab, oklabToRgb255 } from "./color";
import { cssToRgb, DEFAULT_ATMOSPHERE_CONFIG } from "./atmosphereConfig";
import type { AtmosphereConfig } from "./atmosphereConfig";

// ── Color conversion helpers ──────────────────────────────────────────────────
//
// Pipeline: sRGB [0–255] → OKLab → OKLCh (polar) for perceptually uniform
// lightness/hue manipulation, then OKLCh → OKLab → sRGB [0–255] for canvas.
// OKLCH chosen because lightness shifts (L) and hue rotations (H) produce
// visually even color spreads — unlike HSL where "equal" L shifts are not
// perceptually equal.
//
// IMPORTANT: Canvas 2D API only accepts named colors, hex (#rrggbb), rgb(),
// rgba(), hsl(), hsla(). It does NOT accept oklch(), oklab(), lab(), lch(),
// color-mix(), or any CSS Color Level 4 functions. All colors passed to
// addColorStop() or fillStyle must use one of the supported formats.

/**
 * Format an RGBA string for canvas fillStyle / addColorStop.
 * Uses clamped integer values to ensure Canvas 2D compatibility.
 */
function rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${clamp(Math.round(r), 0, 255)},${clamp(Math.round(g), 0, 255)},${clamp(Math.round(b), 0, 255)},${a})`;
}

/** sRGB [0–255] → OKLCh [L:0–1, C:0–~0.4, H:0–360°]. */
function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
    const [L, a, b_] = srgbToOKLab(r / 255, g / 255, b / 255);
    return oklabToOklch(L, a, b_);
}

/** OKLCh → sRGB [0–255] (clamped & rounded). */
function oklchToRgb(L: number, C: number, H: number): [number, number, number] {
    const [la, a, b] = oklchToOklab(L, C, H);
    return oklabToRgb255(la, a, b);
}

/**
 * Animated atmosphere canvas — renders soft OKLCH-derived blobs behind
 * content for a glassmorphism background effect.
 *
 * ## Rendering Pipeline (per frame)
 *
 * 1. **Surface fill** — solid bg at `cfg.bgAlpha` opacity. Color is theme-aware:
 *    `[10,10,15]` in dark mode, `[255,255,255]` in light mode.
 *
 * 2. **Blur filter** — `blur(Xpx) saturate(140%)` applied as a canvas filter
 *    so all blob gradients share a single compositor pass (cheaper than
 *    per-blob blur).
 *
 * 3. **Per-blob radial gradients** — each blob is a `createRadialGradient`
 *    with 4 color stops fading from `peakAlpha` at center to 0 at edge.
 *    Blobs orbit the canvas center via sinusoidal motion with per-blob
 *    phase offsets to avoid synchronization.
 *
 * ## Color Generation (OKLCH)
 *
 * The base CSS color is converted to OKLCh. Each blob receives a derived
 * color with:
 * - **Lightness shift** — alternating ±lShift, scaled by blob index
 * - **Hue rotation** — spread evenly across hueShift range, with every
 *   3rd blob rotating in the opposite direction for variety
 * - Large blobs (first half) use `lShiftLarge`/`hueShiftLarge`
 * - Small blobs (second half) use `lShiftSmall`/`hueShiftSmall`
 *
 * ## Dark Mode Adaptation
 *
 * - Surface color: near-black `[10,10,15]` vs white `[255,255,255]`
 * - Alpha scaling: 0.6× in dark (blobs appear more transparent to avoid
 *   muddying the dark background) vs 2.2× in light (blobs need more
 *   opacity to be visible against white)
 * - Responds to both `.dark` class changes (MutationObserver) and
 *   `prefers-color-scheme` media query changes
 *
 * ## Performance Fallbacks
 *
 * - **Safari / ≤4-core devices** — DPR capped to 1.6 (vs 2.0), canvas
 *   blur scaled to 82% of configured value. Reduces GPU fill rate.
 * - **prefers-reduced-motion** — animation speed multiplied by 0.22
 * - **Zero-size canvas** — render loop continues (no frame skip) but
 *   skips draw calls; resumes when canvas gains size
 *
 * @param canvasRef  — template ref to the `<canvas>` element
 * @param cssColor   — reactive CSS color string (drives blob palette)
 * @param config     — optional reactive config (defaults to DEFAULT_ATMOSPHERE_CONFIG)
 * @param options.surfaceMode — `'theme'` uses white/black based on dark mode (default);
 *                               `'color'` uses the CSS input color as the surface fill
 * @returns          — the reactive config object (for binding to AtmospherePane)
 */
export function useAtmosphereCanvas(
    canvasRef: Ref<HTMLCanvasElement | null> | ShallowRef<HTMLCanvasElement | null>,
    cssColor: Ref<string>,
    config?: AtmosphereConfig,
    options?: { surfaceMode?: "theme" | "color" },
) {
    const cfg = config ?? reactive({ ...DEFAULT_ATMOSPHERE_CONFIG });
    const surfaceMode = options?.surfaceMode ?? "theme";

    let frame = 0;
    let observer: ResizeObserver | null = null;
    let surfaceRgb: [number, number, number] = [255, 255, 255];
    let baseOklch: [number, number, number] = [0.5, 0.1, 0];
    let running = false;

    // ── Reduced-motion & device capability detection ──────────────────────
    const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionScale = reducedMotion ? 0.22 : 1;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isSafari = /Safari/i.test(ua) && !/Chrom(e|ium)|Android/i.test(ua);
    const isLowPower = (navigator?.hardwareConcurrency ?? 8) <= 4;
    const dprMax = isSafari || isLowPower ? 1.6 : 2;
    const blurScale = isSafari || isLowPower ? 0.82 : 1;

    // ── Dark/light mode surface color & alpha adaptation ──────────────────
    let alphaScale = 1.0;

    function updateSurface(rgb?: [number, number, number]) {
        if (surfaceMode === "color" && rgb) {
            // Use the input CSS color as the surface fill
            surfaceRgb = rgb;
            alphaScale = 1.0;
        } else {
            // Theme-aware: white in light mode, near-black in dark mode
            const isDark = document.documentElement.classList.contains("dark");
            surfaceRgb = isDark ? [10, 10, 15] : [255, 255, 255];
            alphaScale = isDark ? 0.6 : 2.2;
        }
    }

    /** Re-derive blob palette from current CSS color + theme. */
    function updatePalette(css: string) {
        const rgb = cssToRgb(css);
        updateSurface(rgb);
        baseOklch = rgbToOklch(rgb[0], rgb[1], rgb[2]);
    }

    // ── Blob color generation ─────────────────────────────────────────────

    /**
     * Build per-blob RGB colors from the base OKLCh color.
     * First half = "large" blobs (higher alpha, wider radius),
     * second half = "small" blobs (lower alpha, tighter radius).
     */
    function buildBlobColors(): Array<[number, number, number]> {
        const [L, C, H] = baseOklch;
        const count = cfg.blobCount;
        const colors: Array<[number, number, number]> = [];
        for (let i = 0; i < count; i++) {
            const isSmall = i >= Math.ceil(count / 2);
            const lShift = isSmall ? cfg.lShiftSmall : cfg.lShiftLarge;
            const hShift = isSmall ? cfg.hueShiftSmall : cfg.hueShiftLarge;
            // Alternate +/- for lightness, spread hue evenly with occasional reversal
            const sign = i % 2 === 0 ? 1 : -1;
            const lAmount = lShift * (0.5 + (i / count) * 0.5) * sign;
            const hAmount = hShift * ((i + 1) / count) * (i % 3 === 0 ? -1 : 1);
            colors.push(oklchToRgb(clamp(L + lAmount, 0, 1), C, (H + hAmount + 360) % 360));
        }
        return colors;
    }

    // ── Canvas lifecycle ──────────────────────────────────────────────────

    function stop() {
        running = false;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        observer = null;
    }

    function start() {
        stop();
        const canvas = canvasRef.value;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        running = true;

        // DPR-aware canvas sizing via ResizeObserver
        const resize = () => {
            const w = canvas.clientWidth, h = canvas.clientHeight;
            if (w === 0 || h === 0) return;
            const dpr = Math.min(window.devicePixelRatio || 1, dprMax);
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        observer = new ResizeObserver(resize);
        observer.observe(canvas);
        updatePalette(cssColor.value);

        // ── Render loop ───────────────────────────────────────────────────
        const render = (now: number) => {
            if (!running) return;
            const w = canvas.clientWidth, h = canvas.clientHeight;
            if (w === 0 || h === 0) { frame = requestAnimationFrame(render); return; }

            const t = now * 0.001 * motionScale * cfg.speed;
            const dim = Math.max(w, h);
            const blobColors = buildBlobColors();
            const count = blobColors.length;
            const blur = cfg.blur * blurScale;

            // Phase 1: opaque surface fill (theme-adapted color)
            ctx.globalAlpha = cfg.bgAlpha;
            ctx.globalCompositeOperation = "source-over";
            ctx.filter = "none";
            ctx.fillStyle = rgba(surfaceRgb[0], surfaceRgb[1], surfaceRgb[2], 1);
            ctx.fillRect(0, 0, w, h);

            // Phase 2: blob layer (single blur filter for all blobs)
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = cfg.blendMode ?? "source-over";
            ctx.save();
            ctx.filter = `blur(${blur}px) saturate(140%)`;

            for (let i = 0; i < count; i++) {
                const c = blobColors[i]!;
                const isSmall = i >= Math.ceil(count / 2);

                // Radius: large blobs grow linearly, small blobs grow at half rate
                const r = dim * (isSmall
                    ? cfg.blobBaseRadius * cfg.smallRadiusScale + i * cfg.blobRadiusStep * 0.5
                    : cfg.blobBaseRadius + i * cfg.blobRadiusStep);

                // Orbital motion: sinusoidal with per-blob frequency & phase offset
                const phase = i * ((Math.PI * 2) / count);
                const ox = w * cfg.orbitX, oy = h * cfg.orbitY;
                const x = w * 0.5 + Math.sin(t * (0.4 + i * 0.15) + phase) * ox + Math.cos(t * 0.2 + i) * ox * 0.5;
                const y = h * 0.5 + Math.cos(t * (0.35 + i * 0.12) + phase) * oy + Math.sin(t * 0.18 + i) * oy * 0.6;

                // 4-stop radial gradient: center → 60% → 20% → transparent
                const peakAlpha = (isSmall ? cfg.peakAlphaSmall : cfg.peakAlphaLarge) * alphaScale;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, rgba(c[0], c[1], c[2], peakAlpha));
                grad.addColorStop(cfg.gradStop2, rgba(c[0], c[1], c[2], peakAlpha * 0.6));
                grad.addColorStop(cfg.gradStop3, rgba(c[0], c[1], c[2], peakAlpha * 0.2));
                grad.addColorStop(cfg.gradStop4, rgba(c[0], c[1], c[2], 0));
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            frame = requestAnimationFrame(render);
        };
        frame = requestAnimationFrame(render);
    }

    // ── Reactivity: re-derive palette on color change or theme switch ─────
    watch(cssColor, (css) => updatePalette(css));

    if (typeof window !== "undefined") {
        // Watch .dark class changes on <html> (class-based dark mode)
        const mo = new MutationObserver(() => updatePalette(cssColor.value));
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        // Watch system color-scheme preference changes
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onSchemeChange = () => updatePalette(cssColor.value);
        mq.addEventListener("change", onSchemeChange);

        onBeforeUnmount(() => {
            mo.disconnect();
            mq.removeEventListener("change", onSchemeChange);
        });
    }

    onMounted(() => start());
    watch(canvasRef, (el) => { if (el && !running) start(); });
    onBeforeUnmount(() => stop());

    return cfg;
}
