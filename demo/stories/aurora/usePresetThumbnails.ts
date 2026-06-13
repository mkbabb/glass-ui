import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import { createAurora, type AuroraConfig } from "../../../src/components/custom/aurora";
import { PRESET_KEYS, PRESETS, type PresetKey } from "./presets";

/**
 * Shared-offscreen thumbnail baking.
 *
 * Browsers cap WebGL contexts per page at ~8 (Chromium). The studio's live
 * stage needs one context; rendering live thumbnails for all 11 presets
 * would blow the budget and silently fail.
 *
 * Strategy: one offscreen canvas, one capture-mode createAurora call, iterate
 * `update` + `renderAt(1)` + `toDataURL` per preset, then `dispose` releasing
 * the context via WEBGL_lose_context. Thumbnails are cached as data URLs.
 */

function freezeCfg(src: AuroraConfig): AuroraConfig {
    return {
        ...src,
        palette: src.palette.map((s) => ({ ...s })),
        nuclei: src.nuclei.map((n) => ({ ...n })),
        flow: { ...src.flow },
        nucleiDrift: 0,
        paletteDrift: 0,
        warpDrift: 0,
        breathDepth: 0,
        // BA.W-CONFIG-CHASSIS.3 (PPD-1) — the capture-canonicalization ALSO clamps
        // alpha to 1. `alpha` is a LIVE-SUBSTRATE runtime axis (the aurora fragment
        // multiplies output-alpha by uAlpha; the Speedtest preset ships alpha: 0.26
        // so the deployed canvas reads at the speedtest backdrop tone). But a preset
        // PREVIEW swatch has no live substrate: the thumbnail bakes onto a transparent
        // clear (clearColor 0,0,0,0), so a sub-1 alpha rides into the webp and
        // composites over the opaque dark `bg-card` (0.26×aurora + 0.74×near-black) →
        // the lone DIM Speedtest swatch (every other preset preview mean-alpha 1.000,
        // Speedtest's 0.259). A preview shows the preset's COLOR, not its deployment-
        // time translucency, so alpha belongs in the SAME canonicalization the drift
        // channels already get. The `presets.ts` `alpha: 0.26` runtime baseline is
        // UNTOUCHED (the legitimate live-substrate value for the speedtest consumer).
        alpha: 1,
    };
}

export interface PresetThumbnails {
    thumbs: Ref<Record<PresetKey, string>>;
    ready: Ref<boolean>;
    rebake: () => Promise<void>;
}

export function usePresetThumbnails(options: {
    widthCss?: number;
    heightCss?: number;
} = {}): PresetThumbnails {
    const widthCss = options.widthCss ?? 320;
    const heightCss = options.heightCss ?? 200;

    const thumbs = ref<Record<PresetKey, string>>(
        Object.fromEntries(PRESET_KEYS.map((k) => [k, ""])) as Record<PresetKey, string>,
    );
    const ready = ref(false);

    async function bake() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = Math.round(widthCss * dpr);
        const h = Math.round(heightCss * dpr);

        const shared = document.createElement("canvas");
        shared.width = w;
        shared.height = h;
        shared.style.cssText = `width:${widthCss}px;height:${heightCss}px;position:fixed;left:-99999px;top:0`;
        document.body.appendChild(shared);

        let aurora;
        try {
            aurora = createAurora(shared, freezeCfg(PRESETS[PRESET_KEYS[0]!]), {
                mode: "capture",
            });
        } catch (err) {
            console.warn("[Aurora] thumbnail bake aborted:", err);
            shared.remove();
            return;
        }

        try {
            for (const key of PRESET_KEYS) {
                aurora.update(freezeCfg(PRESETS[key]));
                aurora.renderAt(1.0);
                thumbs.value[key] = shared.toDataURL("image/webp", 0.85);
                // Yield to the event loop so the DOM can reflect progress.
                await new Promise((r) => setTimeout(r, 0));
            }
            ready.value = true;
        } finally {
            aurora.dispose();
            shared.remove();
        }
    }

    async function rebake() {
        ready.value = false;
        await bake();
    }

    onMounted(() => {
        // Slight delay so the page has a chance to lay out before we grab a context.
        setTimeout(() => {
            bake().catch((err) => console.warn("[Aurora] thumbnail bake failed:", err));
        }, 200);
    });

    onBeforeUnmount(() => {
        // Thumbnails are data URLs; nothing to release. Any mid-bake disposal
        // is handled by the `finally` in bake() if we get there.
    });

    return { thumbs, ready, rebake };
}
