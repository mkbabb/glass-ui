import { ref, onMounted } from "vue";

export type GlassTier = "svg-filter" | "css" | "fallback";

export interface GlassRendererOptions {
    preferredTier?: GlassTier;
}

/**
 * Detect best glass rendering tier.
 *
 * - svg-filter: Chromium — uses SVG feDisplacementMap inside backdrop-filter
 * - css: All browsers — plain backdrop-filter blur
 * - fallback: No backdrop-filter support
 */
function detectTier(): GlassTier {
    // SVG filter in backdrop-filter only works in Chromium
    const isChromium = !!(window as any).chrome;
    if (isChromium && CSS.supports("backdrop-filter", "url(#x) blur(1px)")) {
        return "svg-filter";
    }
    if (
        CSS.supports("backdrop-filter", "blur(1px)") ||
        CSS.supports("-webkit-backdrop-filter", "blur(1px)")
    ) {
        return "css";
    }
    return "fallback";
}

/**
 * Generate a refraction displacement map on a canvas.
 *
 * The displacement map encodes Snell's law refraction as RGB:
 * - R channel = X displacement (128 = neutral)
 * - G channel = Y displacement (128 = neutral)
 * - B channel = unused (128)
 *
 * Content behind the glass is displaced toward the center,
 * simulating light bending through a convex glass surface.
 */
function generateDisplacementMap(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    refractionStrength: number,
): void {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const cx = width / 2;
    const cy = height / 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = (x - cx) / cx; // -1 to 1
            const dy = (y - cy) / cy; // -1 to 1
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Snell's law: displacement increases toward edges
            // Uses a smooth lens profile (parabolic with edge falloff)
            const profile = dist * (1 - dist * 0.3) * refractionStrength;

            // Displacement direction: toward center
            const dispX = -dx * profile;
            const dispY = -dy * profile;

            // Encode as 0-255 where 128 = no displacement
            const i = (y * width + x) * 4;
            data[i] = Math.round(128 + dispX * 127); // R = X displacement
            data[i + 1] = Math.round(128 + dispY * 127); // G = Y displacement
            data[i + 2] = 128; // B = unused
            data[i + 3] = 255; // A = full
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

/**
 * Generate a specular highlight map for Fresnel-based edge lighting.
 */
function generateSpecularMap(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
): void {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // Radial gradient: bright at edges (Fresnel), dim at center
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.max(cx, cy);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.02)");
    grad.addColorStop(0.8, "rgba(255,255,255,0.06)");
    grad.addColorStop(1, "rgba(255,255,255,0.12)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Top-edge specular line (light catch)
    const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
    lineGrad.addColorStop(0, "rgba(255,255,255,0)");
    lineGrad.addColorStop(0.3, "rgba(255,255,255,0.15)");
    lineGrad.addColorStop(0.5, "rgba(255,255,255,0.25)");
    lineGrad.addColorStop(0.7, "rgba(255,255,255,0.15)");
    lineGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = lineGrad;
    ctx.fillRect(0, 0, width, 2);
}

let filterCounter = 0;

export interface GlassFilterState {
    filterId: string;
    svgEl: SVGSVGElement;
    dispCanvas: HTMLCanvasElement;
    specCanvas: HTMLCanvasElement;
    observer: ResizeObserver | null;
}

/**
 * Create an SVG filter for glass refraction + frost.
 *
 * Architecture (Chromium SVG displacement approach):
 * 1. Hidden canvas generates Snell's law displacement map
 * 2. Inline SVG <filter> references the canvas via <feImage>
 * 3. <feDisplacementMap> warps the backdrop using R/G channels
 * 4. CSS `backdrop-filter: url(#filterId) blur(Xpx) saturate(Y)` applies it
 *
 * This naturally composites with whatever is behind the element —
 * no texture capture, no WebGL context, no scroll sync needed.
 */
export function createGlassFilter(
    el: HTMLElement,
    opts: {
        blur?: number;
        refraction?: number;
        chromaticAberration?: number;
    } = {},
): GlassFilterState {
    const id = `glass-refract-${filterCounter++}`;
    const blur = opts.blur ?? 16;
    const refraction = opts.refraction ?? 0.3;

    // Create displacement map canvas
    const dispCanvas = document.createElement("canvas");
    dispCanvas.style.display = "none";
    document.body.appendChild(dispCanvas);

    // Create specular map canvas
    const specCanvas = document.createElement("canvas");
    specCanvas.style.display = "none";
    document.body.appendChild(specCanvas);

    // Generate maps at element size
    const rect = el.getBoundingClientRect();
    const mapW = Math.max(Math.ceil(rect.width / 4), 32); // Low-res is fine for displacement
    const mapH = Math.max(Math.ceil(rect.height / 4), 32);
    generateDisplacementMap(dispCanvas, mapW, mapH, refraction);
    generateSpecularMap(specCanvas, mapW, mapH);

    // Create inline SVG filter
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.pointerEvents = "none";

    // Displacement scale maps to pixel displacement
    const dispScale = refraction * 30;

    svg.innerHTML = `
        <filter id="${id}" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feImage href="${dispCanvas.toDataURL()}" result="dispMap"
                preserveAspectRatio="none" x="0%" y="0%" width="100%" height="100%" />
            <feDisplacementMap in="SourceGraphic" in2="dispMap" result="refracted"
                scale="${dispScale}" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur in="refracted" stdDeviation="${blur * 0.3}" result="blurred" />
            <feImage href="${specCanvas.toDataURL()}" result="specular"
                preserveAspectRatio="none" x="0%" y="0%" width="100%" height="100%" />
            <feBlend in="blurred" in2="specular" mode="screen" result="final" />
        </filter>
    `;

    document.body.appendChild(svg);

    // Apply the filter + additional CSS frost
    el.style.backdropFilter = `url(#${id}) blur(${blur * 0.15}px) saturate(1.6) brightness(1.05)`;
    el.style.setProperty("-webkit-backdrop-filter", el.style.backdropFilter);

    // Add visible glass border
    el.style.border = "1px solid rgba(255,255,255,0.25)";
    el.style.boxShadow = `
        inset 0 0.5px 0 0 rgba(255,255,255,0.3),
        inset 0 -0.5px 0 0 rgba(0,0,0,0.05),
        0 4px 16px rgba(0,0,0,0.08)
    `;

    // Resize handler
    const observer = new ResizeObserver(() => {
        const r = el.getBoundingClientRect();
        const w = Math.max(Math.ceil(r.width / 4), 32);
        const h = Math.max(Math.ceil(r.height / 4), 32);
        generateDisplacementMap(dispCanvas, w, h, refraction);
        generateSpecularMap(specCanvas, w, h);

        // Update SVG feImage hrefs
        const feImages = svg.querySelectorAll("feImage");
        if (feImages[0]) feImages[0].setAttribute("href", dispCanvas.toDataURL());
        if (feImages[1]) feImages[1].setAttribute("href", specCanvas.toDataURL());
    });
    observer.observe(el);

    return { filterId: id, svgEl: svg, dispCanvas, specCanvas, observer };
}

/**
 * Remove a glass filter and clean up DOM elements.
 */
export function destroyGlassFilter(state: GlassFilterState) {
    state.observer?.disconnect();
    state.svgEl.remove();
    state.dispCanvas.remove();
    state.specCanvas.remove();
}

/**
 * Composable for tiered glass rendering.
 */
export function useGlassRenderer(options?: GlassRendererOptions) {
    const tier = ref<GlassTier>(options?.preferredTier ?? "css");

    onMounted(() => {
        if (!options?.preferredTier) {
            tier.value = detectTier();
        }
    });

    return { tier };
}
