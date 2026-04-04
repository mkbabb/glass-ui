import {
    onBeforeUnmount,
    onMounted,
    reactive,
    isReactive,
    watch,
    toValue,
    type Ref,
    type MaybeRef,
} from "vue";
import { clamp, cssToRgb, rgbToOklch, oklchToRgb } from "./color";

// ── Config ──────────────────────────────────────────────────────────────────

export interface AuroraConfig {
    /** "explicit" uses the `colors` array. "derived" generates palette from baseColor via OKLCH. */
    colorMode: "explicit" | "derived";
    /** Explicit color array (CSS strings). Used when colorMode === "explicit". */
    colors: string[];

    /** OKLCH lightness shift for large blobs (first half). Used when colorMode === "derived". */
    lShiftLarge: number;
    /** OKLCH lightness shift for small blobs (second half). */
    lShiftSmall: number;
    /** OKLCH hue rotation for large blobs (degrees). */
    hueShiftLarge: number;
    /** OKLCH hue rotation for small blobs (degrees). */
    hueShiftSmall: number;

    blobCount: number;
    baseRadius: number;
    radiusVariance: number;
    /** Fraction of blobs anchored to viewport vs page (0 = all page, 1 = all viewport). */
    viewportAnchorRatio: number;

    blur: number;
    speed: number;
    orbitAmplitude: number;
    blendMode: GlobalCompositeOperation;

    /** Gradient stop positions (fraction of blob radius). */
    gradStop2: number;
    gradStop3: number;
    gradStop4: number;

    alphaLight: number;
    alphaDark: number;

    /** "none" = transparent clear, "theme" = white/black based on dark mode, "color" = baseColor tint. */
    surfaceMode: "none" | "theme" | "color";
    surfaceAlpha: number;
}

export const DEFAULT_AURORA_CONFIG: AuroraConfig = {
    colorMode: "explicit",
    colors: ["#c084fc", "#60a5fa", "#f472b6", "#34d399", "#fbbf24", "#fb923c", "#a78bfa", "#38bdf8"],
    lShiftLarge: 0.15,
    lShiftSmall: 0.10,
    hueShiftLarge: 25,
    hueShiftSmall: 55,
    blobCount: 8,
    baseRadius: 0.32,
    radiusVariance: 0.08,
    viewportAnchorRatio: 0.5,
    blur: 80,
    speed: 0.4,
    orbitAmplitude: 0.12,
    blendMode: "source-over",
    gradStop2: 0.35,
    gradStop3: 0.65,
    gradStop4: 1.0,
    alphaLight: 0.35,
    alphaDark: 0.18,
    surfaceMode: "none",
    surfaceAlpha: 0,
};

/** Preset: atmosphere-style (single base color, OKLCH-derived palette, surface fill). */
export const ATMOSPHERE_PRESET: Partial<AuroraConfig> = {
    colorMode: "derived",
    blobCount: 10,
    baseRadius: 0.10,
    radiusVariance: 0.015,
    viewportAnchorRatio: 1.0,
    blur: 8,
    speed: 0.10,
    orbitAmplitude: 0.45,
    gradStop2: 0.30,
    gradStop3: 0.60,
    gradStop4: 1.00,
    alphaLight: 0.33,
    alphaDark: 0.09,
    surfaceMode: "theme",
    surfaceAlpha: 0.97,
    lShiftLarge: 0.15,
    lShiftSmall: 0.10,
    hueShiftLarge: 25,
    hueShiftSmall: 55,
};

// ── Internals ───────────────────────────────────────────────────────────────

interface Blob {
    anchorX: number;
    anchorY: number;
    mode: "viewport" | "page";
    radius: number;
    color: [number, number, number];
    phaseX: number;
    phaseY: number;
    freqX: number;
    freqY: number;
}

const PHI = 1.618033988749895;
const SQRT2 = 1.4142135623730951;

function isDarkMode(): boolean {
    return document.documentElement.classList.contains("dark");
}

function rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${clamp(Math.round(r), 0, 255)},${clamp(Math.round(g), 0, 255)},${clamp(Math.round(b), 0, 255)},${a})`;
}

// ── Composable ──────────────────────────────────────────────────────────────

/**
 * Unified aurora/atmosphere background composable.
 *
 * Two color modes:
 * - **explicit**: Uses the `colors` array directly (aurora default)
 * - **derived**: Generates palette from a single `baseColor` via OKLCH shifts (atmosphere style)
 *
 * @param canvasRef  — template ref to the `<canvas>` element
 * @param userConfig — reactive config object (mutations propagate live) or partial overrides
 * @param baseColor  — reactive CSS color for "derived" mode
 */
export function useAurora(
    canvasRef: Ref<HTMLCanvasElement | null>,
    userConfig?: Partial<AuroraConfig> | AuroraConfig,
    baseColor?: MaybeRef<string>,
) {
    const cfg: AuroraConfig = isReactive(userConfig)
        ? (userConfig as AuroraConfig)
        : reactive<AuroraConfig>({ ...DEFAULT_AURORA_CONFIG, ...userConfig });

    let blobs: Blob[] = [];
    let animId = 0;
    let dark = false;
    let dpr = 1;
    let observer: MutationObserver | null = null;
    let mediaQuery: MediaQueryList | null = null;

    /** Derive palette from a single base color via OKLCH lightness/hue shifts. */
    function deriveColors(count: number): Array<[number, number, number]> {
        const cssColor = toValue(baseColor) ?? "#c084fc";
        const [r, g, b] = cssToRgb(cssColor);
        const [L, C, H] = rgbToOklch(r, g, b);

        const colors: Array<[number, number, number]> = [];
        for (let i = 0; i < count; i++) {
            const isSmall = i >= Math.ceil(count / 2);
            const lShift = isSmall ? cfg.lShiftSmall : cfg.lShiftLarge;
            const hShift = isSmall ? cfg.hueShiftSmall : cfg.hueShiftLarge;
            const sign = i % 2 === 0 ? 1 : -1;
            const lAmount = lShift * (0.5 + (i / count) * 0.5) * sign;
            const hAmount = hShift * ((i + 1) / count) * (i % 3 === 0 ? -1 : 1);
            colors.push(oklchToRgb(clamp(L + lAmount, 0, 1), C, (H + hAmount + 360) % 360));
        }
        return colors;
    }

    function getSurface(): { rgb: [number, number, number]; alpha: number } {
        if (cfg.surfaceMode === "none") return { rgb: [0, 0, 0], alpha: 0 };
        if (cfg.surfaceMode === "color") {
            const cssColor = toValue(baseColor) ?? "#c084fc";
            return { rgb: cssToRgb(cssColor), alpha: cfg.surfaceAlpha };
        }
        return { rgb: dark ? [10, 10, 15] : [255, 255, 255], alpha: cfg.surfaceAlpha };
    }

    function buildBlobs() {
        const canvas = canvasRef.value;
        if (!canvas) return;

        const vw = canvas.width / dpr;
        const vh = canvas.height / dpr;
        const diagonal = Math.sqrt(vw * vw + vh * vh);
        const pageHeight = Math.max(document.documentElement.scrollHeight, vh);

        const vpCount = Math.round(cfg.blobCount * cfg.viewportAnchorRatio);
        const pageCount = cfg.blobCount - vpCount;
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        const colorList: Array<[number, number, number]> =
            cfg.colorMode === "derived"
                ? deriveColors(cfg.blobCount)
                : cfg.colors.map(c => cssToRgb(c));

        blobs = [];

        for (let i = 0; i < vpCount; i++) {
            const ci = i % colorList.length;
            const radiusFrac = cfg.baseRadius + ((i / Math.max(vpCount, 1)) - 0.5) * cfg.radiusVariance * 2;
            const angle = i * goldenAngle;
            blobs.push({
                anchorX: 0.5 + Math.cos(angle) * 0.3,
                anchorY: 0.5 + Math.sin(angle) * 0.35,
                mode: "viewport" as const,
                radius: diagonal * Math.max(radiusFrac, 0.12),
                color: colorList[ci],
                phaseX: (i * PHI * Math.PI * 2) % (Math.PI * 2),
                phaseY: (i * SQRT2 * Math.PI * 2) % (Math.PI * 2),
                freqX: 0.0002 + i * 0.00005,
                freqY: 0.00018 + i * 0.00006,
            });
        }

        for (let i = 0; i < pageCount; i++) {
            const ci = (vpCount + i) % colorList.length;
            const radiusFrac = cfg.baseRadius + ((i / Math.max(pageCount, 1)) - 0.5) * cfg.radiusVariance * 2;
            const angle = (vpCount + i) * goldenAngle;
            const yPage = ((i + 0.5) / pageCount) * pageHeight;
            blobs.push({
                anchorX: 0.5 + Math.cos(angle) * 0.35,
                anchorY: yPage,
                mode: "page" as const,
                radius: diagonal * Math.max(radiusFrac, 0.12),
                color: colorList[ci],
                phaseX: ((vpCount + i) * PHI * Math.PI * 2) % (Math.PI * 2),
                phaseY: ((vpCount + i) * SQRT2 * Math.PI * 2) % (Math.PI * 2),
                freqX: 0.00025 + i * 0.00006,
                freqY: 0.0002 + i * 0.00007,
            });
        }
    }

    function resize() {
        const canvas = canvasRef.value;
        if (!canvas) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        if (vw === 0 || vh === 0) return;
        dpr = Math.min(window.devicePixelRatio, 1.5);
        canvas.width = Math.ceil(vw * dpr);
        canvas.height = Math.ceil(vh * dpr);
        buildBlobs();
    }

    function draw(time: number) {
        const canvas = canvasRef.value;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const vw = canvas.width / dpr;
        const vh = canvas.height / dpr;
        if (vw === 0 || vh === 0) { animId = requestAnimationFrame(draw); return; }

        const scrollY = window.scrollY;
        ctx.save();
        ctx.scale(dpr, dpr);

        // Surface fill
        const surface = getSurface();
        if (surface.alpha > 0) {
            ctx.globalAlpha = surface.alpha;
            ctx.globalCompositeOperation = "source-over";
            ctx.filter = "none";
            ctx.fillStyle = rgba(surface.rgb[0], surface.rgb[1], surface.rgb[2], 1);
            ctx.fillRect(0, 0, vw, vh);
            ctx.globalAlpha = 1;
        } else {
            ctx.clearRect(0, 0, vw, vh);
        }

        ctx.filter = `blur(${cfg.blur}px) saturate(140%)`;
        ctx.globalCompositeOperation = cfg.blendMode;

        const alpha = dark ? cfg.alphaDark : cfg.alphaLight;
        const alphaScale = cfg.surfaceMode === "theme" ? (dark ? 0.6 : 2.2) : 1.0;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const speedMul = reducedMotion ? 0.05 : cfg.speed;

        for (const blob of blobs) {
            let cx: number, cy: number;
            if (blob.mode === "viewport") {
                cx = blob.anchorX * vw;
                cy = blob.anchorY * vh;
            } else {
                cx = blob.anchorX * vw;
                cy = blob.anchorY - scrollY;
            }

            cx += Math.sin(time * blob.freqX * speedMul + blob.phaseX) * vw * cfg.orbitAmplitude;
            cy += Math.cos(time * blob.freqY * speedMul + blob.phaseY) * vh * cfg.orbitAmplitude;

            if (cy + blob.radius < -blob.radius * 0.5 || cy - blob.radius > vh + blob.radius * 0.5) continue;

            const [r, g, b] = blob.color;
            const desat = dark ? 0.7 : 1.0;
            const dr = Math.round(r * desat + 128 * (1 - desat));
            const dg = Math.round(g * desat + 128 * (1 - desat));
            const db = Math.round(b * desat + 128 * (1 - desat));

            const peakAlpha = alpha * alphaScale;

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.radius);
            grad.addColorStop(0, rgba(dr, dg, db, peakAlpha));
            grad.addColorStop(cfg.gradStop2, rgba(dr, dg, db, peakAlpha * 0.6));
            grad.addColorStop(cfg.gradStop3, rgba(dr, dg, db, peakAlpha * 0.2));
            grad.addColorStop(cfg.gradStop4, rgba(dr, dg, db, 0));

            ctx.fillStyle = grad;
            ctx.fillRect(cx - blob.radius, cy - blob.radius, blob.radius * 2, blob.radius * 2);
        }

        ctx.restore();
        animId = requestAnimationFrame(draw);
    }

    function onThemeChange() { dark = isDarkMode(); }

    onMounted(() => {
        dark = isDarkMode();
        observer = new MutationObserver(onThemeChange);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", onThemeChange);
        resize();
        window.addEventListener("resize", resize);
        animId = requestAnimationFrame(draw);
    });

    onBeforeUnmount(() => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        observer?.disconnect();
        mediaQuery?.removeEventListener("change", onThemeChange);
    });

    watch(
        () => [cfg.colors, cfg.blobCount, cfg.baseRadius, cfg.radiusVariance,
               cfg.viewportAnchorRatio, cfg.colorMode, cfg.lShiftLarge, cfg.lShiftSmall,
               cfg.hueShiftLarge, cfg.hueShiftSmall, toValue(baseColor)],
        () => buildBlobs(),
        { deep: true },
    );

    return { config: cfg };
}
