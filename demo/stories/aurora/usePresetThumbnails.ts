import { onMounted, ref, type Ref } from "vue";
import {
    auroraFallbackGround,
    type AuroraConfig,
} from "../../../src/components/custom/aurora";
import { PRESET_KEYS, PRESETS, type PresetKey } from "./presets";

/**
 * Device-free preset thumbnails (BD.W-PRESET-RENDER, re-rooted).
 *
 * THE PRIOR DEFECT (DELTA-ASSAY §2): the thumbnails baked an OFFSCREEN
 * `createAurora(…, {mode:"capture"})` WebGPU field, then `toDataURL`-d each
 * preset. On every host where the WebGPU device could not be acquired (the
 * validation-probe / SwiftShader / no-device class) the `createAurora` call
 * THREW `[useWebGPUCanvas] device not acquired` and the `catch` aborted the
 * WHOLE bake — all 13 cards stayed eternal skeletons. No init-reorder and no
 * readback fix makes a device appear. The root cause is a GL DEPENDENCY the
 * preview never needed.
 *
 * THE FIX (the clean break, no-backwards-compat): the thumbnail does NOT touch
 * a GL device at all. The shipped device-free `auroraFallbackGround(config)`
 * paints each preset's STATIC composite from the SAME palette + nuclei field the
 * shader uploads (the math mirrored CPU-side) into a tiny 2D-canvas raster →
 * `data:` URI, CSS-upscaled bilinear. It is per-preset distinct, ≥2-hue,
 * deterministic, needs ZERO WebGL/WebGPU, never blows the 8-context budget, and
 * is visually-equivalent + never-blank in BOTH Chrome and WebKit. The eager
 * `mode:"capture"` offscreen bake + the `left:-99999px` capture canvas are GONE.
 *
 * The bake is synchronous + cheap (an 8×8 field sample per preset), so the whole
 * set resolves in one idle chunk on mount — no async device-acquire, no abort.
 */

export interface PresetThumbnails {
    thumbs: Ref<Record<PresetKey, string>>;
    /** The measured field-mean luminance per preset (the certify-band metric). */
    means: Ref<Record<PresetKey, number>>;
    ready: Ref<boolean>;
    rebake: () => Promise<void>;
}

function bakeKey(key: PresetKey): { image: string; mean: number } {
    const config = PRESETS[key] as AuroraConfig;
    // grid 10 → a 100-sample field; the bilinear CSS upscale reads as a smooth
    // atmosphere, not a hard grid, and the per-quadrant mean luminance is preserved.
    const ground = auroraFallbackGround(config, { grid: 10 });
    // The raster path returns a `url("data:image/png…")`; the SSR fallback returns
    // a layered radial-gradient stack. Both are valid `background-image` values, so
    // the consumer reads `thumbs[key]` as a background-image, NOT an <img src>.
    return { image: ground.backgroundImage, mean: ground.metrics.mean };
}

export function usePresetThumbnails(
    _options: {
        widthCss?: number;
        heightCss?: number;
    } = {},
): PresetThumbnails {
    const thumbs = ref<Record<PresetKey, string>>(
        Object.fromEntries(PRESET_KEYS.map((k) => [k, ""])) as Record<
            PresetKey,
            string
        >,
    );
    const means = ref<Record<PresetKey, number>>(
        Object.fromEntries(PRESET_KEYS.map((k) => [k, 0])) as Record<
            PresetKey,
            number
        >,
    );
    const ready = ref(false);

    async function bake() {
        // Idle-chunked so a 13-preset bake never blocks first paint, but each
        // chunk is a pure CPU field sample (no device, no rAF, no GL).
        for (const key of PRESET_KEYS) {
            const { image, mean } = bakeKey(key);
            thumbs.value[key] = image;
            means.value[key] = mean;
            // Yield so the DOM reflects each card as it lands (the progressive fill).
            await new Promise((r) => setTimeout(r, 0));
        }
        ready.value = true;
    }

    async function rebake() {
        ready.value = false;
        await bake();
    }

    onMounted(() => {
        bake().catch((err) =>
            console.warn("[Aurora] thumbnail field build failed:", err),
        );
    });

    return { thumbs, means, ready, rebake };
}
