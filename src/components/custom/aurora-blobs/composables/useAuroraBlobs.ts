import {
    onBeforeUnmount,
    onMounted,
    reactive,
    watch,
    type Ref,
} from "vue";

export interface AuroraBlobsConfig {
    /** Colors to derive blobs from (CSS color strings). Cycles if fewer than blobCount. */
    colors: string[];
    /** Number of blobs (default: 5) */
    blobCount: number;
    /** Base blob radius as fraction of min(width, height) (default: 0.4) */
    baseRadius: number;
    /** Radius variance between blobs (default: 0.1) */
    radiusVariance: number;
    /** Canvas blur radius in px (default: 80) */
    blur: number;
    /** Animation speed multiplier (default: 0.4) */
    speed: number;
    /** Blob alpha in light mode (default: 0.4) */
    alphaLight: number;
    /** Blob alpha in dark mode (default: 0.22) */
    alphaDark: number;
    /** Orbital drift amplitude as fraction of canvas (default: 0.25) */
    orbitAmplitude: number;
    /** Canvas composite blend mode (default: "lighter") */
    blendMode: GlobalCompositeOperation;
}

export const DEFAULT_AURORA_CONFIG: AuroraBlobsConfig = {
    colors: ["#c084fc", "#60a5fa", "#f472b6", "#34d399", "#fbbf24"],
    blobCount: 5,
    baseRadius: 0.4,
    radiusVariance: 0.1,
    blur: 80,
    speed: 0.4,
    alphaLight: 0.4,
    alphaDark: 0.22,
    orbitAmplitude: 0.25,
    blendMode: "lighter",
};

interface Blob {
    x: number;
    y: number;
    radius: number;
    color: [number, number, number];
    phaseX: number;
    phaseY: number;
    freqX: number;
    freqY: number;
}

const PHI = 1.618033988749895;
const SQRT2 = 1.4142135623730951;

/**
 * Parse a CSS color string to [r, g, b] (0-255).
 */
function parseColor(css: string): [number, number, number] {
    const ctx = document.createElement("canvas").getContext("2d")!;
    ctx.fillStyle = css;
    const hex = ctx.fillStyle; // browser normalizes to #rrggbb
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

/**
 * Detect dark mode via .dark class or prefers-color-scheme.
 */
function isDarkMode(): boolean {
    return (
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
}

/**
 * Animated aurora blob background — renders soft, large, slowly-drifting
 * color blobs on a Canvas 2D element. Designed as a glassmorphism background
 * layer that glass panels can `backdrop-filter` through.
 *
 * Follows the useAtmosphereCanvas pattern:
 * - Canvas 2D with radial gradients + global blur filter
 * - Per-blob sinusoidal orbital motion with irrational frequency ratios
 * - Dark mode awareness (reduced alpha, desaturated)
 * - prefers-reduced-motion support
 */
export function useAuroraBlobs(
    canvasRef: Ref<HTMLCanvasElement | null>,
    userConfig?: Partial<AuroraBlobsConfig>,
) {
    const cfg = reactive<AuroraBlobsConfig>({
        ...DEFAULT_AURORA_CONFIG,
        ...userConfig,
    });

    let blobs: Blob[] = [];
    let animId = 0;
    let dark = false;
    let dpr = 1;
    let observer: MutationObserver | null = null;
    let mediaQuery: MediaQueryList | null = null;

    function buildBlobs() {
        const canvas = canvasRef.value;
        if (!canvas) return;

        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        const minDim = Math.min(w, h);

        blobs = [];
        for (let i = 0; i < cfg.blobCount; i++) {
            const colorIdx = i % cfg.colors.length;
            const color = parseColor(cfg.colors[colorIdx]);

            // Vary radius per blob
            const radiusFrac =
                cfg.baseRadius + (i / cfg.blobCount - 0.5) * cfg.radiusVariance * 2;
            const radius = minDim * Math.max(radiusFrac, 0.1);

            // Distribute initial positions across canvas
            const angle = (i / cfg.blobCount) * Math.PI * 2;
            const spread = Math.min(w, h) * 0.2;

            blobs.push({
                x: w * 0.5 + Math.cos(angle) * spread,
                y: h * 0.5 + Math.sin(angle) * spread,
                radius,
                color,
                phaseX: (i * PHI * Math.PI * 2) % (Math.PI * 2),
                phaseY: (i * SQRT2 * Math.PI * 2) % (Math.PI * 2),
                freqX: 0.0003 + i * 0.00007,
                freqY: 0.00025 + i * 0.00009,
            });
        }
    }

    function resize() {
        const canvas = canvasRef.value;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        dpr = Math.min(window.devicePixelRatio, 1.5); // cap for perf
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        buildBlobs();
    }

    function draw(time: number) {
        const canvas = canvasRef.value;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        if (w === 0 || h === 0) return;

        ctx.save();
        ctx.scale(dpr, dpr);

        // Clear to transparent — let page background show through
        ctx.clearRect(0, 0, w, h);

        // Apply blur
        ctx.filter = `blur(${cfg.blur}px) saturate(140%)`;
        ctx.globalCompositeOperation = "source-over";

        const alpha = dark ? cfg.alphaDark : cfg.alphaLight;
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const speedMul = reducedMotion ? 0.05 : cfg.speed;

        for (const blob of blobs) {
            // Sinusoidal orbit
            const ox =
                Math.sin(time * blob.freqX * speedMul + blob.phaseX) *
                w *
                cfg.orbitAmplitude;
            const oy =
                Math.cos(time * blob.freqY * speedMul + blob.phaseY) *
                h *
                cfg.orbitAmplitude;

            const cx = blob.x + ox;
            const cy = blob.y + oy;

            // Desaturate slightly in dark mode
            const [r, g, b] = blob.color;
            const desat = dark ? 0.7 : 1.0;
            const dr = Math.round(r * desat + 128 * (1 - desat));
            const dg = Math.round(g * desat + 128 * (1 - desat));
            const db = Math.round(b * desat + 128 * (1 - desat));

            const grad = ctx.createRadialGradient(
                cx,
                cy,
                0,
                cx,
                cy,
                blob.radius,
            );
            grad.addColorStop(0, `rgba(${dr},${dg},${db},${alpha})`);
            grad.addColorStop(0.4, `rgba(${dr},${dg},${db},${alpha * 0.7})`);
            grad.addColorStop(0.7, `rgba(${dr},${dg},${db},${alpha * 0.3})`);
            grad.addColorStop(1, `rgba(${dr},${dg},${db},0)`);

            ctx.fillStyle = grad;
            ctx.fillRect(cx - blob.radius, cy - blob.radius, blob.radius * 2, blob.radius * 2);
        }

        ctx.restore();

        animId = requestAnimationFrame(draw);
    }

    function onThemeChange() {
        dark = isDarkMode();
    }

    onMounted(() => {
        dark = isDarkMode();

        // Watch for .dark class changes
        observer = new MutationObserver(onThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        // Watch prefers-color-scheme
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

    // Rebuild blobs when config changes
    watch(
        () => [cfg.colors, cfg.blobCount, cfg.baseRadius, cfg.radiusVariance],
        () => buildBlobs(),
        { deep: true },
    );

    return { config: cfg };
}
