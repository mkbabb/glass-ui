<script setup lang="ts">
import { inject, useTemplateRef, watch, toRef } from "vue";
import type { ColorResolver } from "../../../composables/color";
import type { BlobMood, BlobConfig } from "./types";
import { BLOB_CONFIG_KEY } from "./types";
import { useBlobMood } from "./composables/useBlobMood";
import { useBlobPointer } from "./composables/useBlobPointer";
import { useBlobSatellites } from "./composables/useBlobSatellites";
import { useMetaballRenderer } from "./composables/useMetaballRenderer";

/**
 * GooBlob — a gooey metaball creature on a WebGL2 canvas.
 *
 * Renders a pulsing SDF body with orbiting satellites that periodically merge in,
 * get absorbed, then re-emerge. Mood, pointer-attraction and a deterministic
 * satellite system drive the motion. The renderer composes the `useWebGLCanvas`
 * substrate — it never bootstraps its own context.
 *
 * Color is resolved through an INJECTED `colorResolver` seam (DEC-AT-2): the blob
 * paints the GAMMA-sRGB triple it returns. The prop is REQUIRED — pass
 * `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` (or your own) so a
 * `lab()`/`oklch()`/`hsl()`/hex string resolves correctly. A missing resolver
 * throws (the loud failure, not a silent gray).
 *
 * Config is resolved with the SAME loud discipline as the resolver: either
 * `provide(BLOB_CONFIG_KEY, cfg)` from an ancestor OR pass an explicit `config`
 * prop. A mount with NEITHER throws — there is no silent reactive-defaults
 * synthesis. A consumer that genuinely wants the stock tuning passes
 * `BLOB_CONFIG_DEFAULTS` explicitly.
 */
const { color, colorResolver, config, seed = "" } = defineProps<{
    /** Base CSS color string (any form the `colorResolver` understands). */
    color: string;
    /** REQUIRED color seam — resolves `color` to a gamma-sRGB [r,g,b] triple in [0,1]. */
    colorResolver: ColorResolver;
    /**
     * REQUIRED unless an ancestor `provide(BLOB_CONFIG_KEY, …)` supplies it.
     * The metaball tuning. Pass `BLOB_CONFIG_DEFAULTS` for the stock look.
     */
    config?: BlobConfig;
    /** Extra seed string mixed into the satellite PRNG for a unique-but-reproducible system. */
    seed?: string;
}>();

const emit = defineEmits<{ click: [] }>();

const injectedConfig = inject(BLOB_CONFIG_KEY, null);
const cfg = config ?? injectedConfig;
if (!cfg) {
    throw new Error(
        "[glass-ui] GooBlob: no blob config. Pass an explicit `config` prop " +
            "(e.g. BLOB_CONFIG_DEFAULTS) or provide(BLOB_CONFIG_KEY, cfg) from an " +
            "ancestor. There is no silent defaults synthesis.",
    );
}

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const wrapperRef = useTemplateRef<HTMLElement>("wrapperRef");

const mood = useBlobMood();
const pointer = useBlobPointer(wrapperRef);
const satelliteSystem = useBlobSatellites(cfg, color + seed);

const colorRef = toRef(() => color);

useMetaballRenderer({
    canvasRef,
    color: colorRef,
    mood,
    pointer,
    satellites: satelliteSystem,
    config: cfg,
    colorResolver,
});

watch(colorRef, (c) => {
    satelliteSystem.reseed(c + seed);
});

function nudge() {
    satelliteSystem.nudge();
}

function setMood(m: BlobMood) {
    mood.setMood(m);
}

defineExpose({ nudge, setMood, currentMood: mood.currentMood });
</script>

<template>
    <div
        ref="wrapperRef"
        class="goo-blob-wrapper"
        :style="{ '--blob-color': color }"
        @click="emit('click')"
    >
        <canvas
            ref="canvasRef"
            class="goo-blob-canvas"
            aria-hidden="true"
            data-testid="goo-blob-canvas"
        />
    </div>
</template>

<style scoped>
.goo-blob-wrapper {
    /* Layout footprint = width passed by parent (e.g. w-[7rem]) */
    aspect-ratio: 1;
    position: relative;
    z-index: var(--z-content);
    overflow: visible;
    cursor: pointer;
    filter: drop-shadow(
        5px 5px 2.5px
            color-mix(in srgb, var(--blob-color, transparent) 20%, var(--foreground))
    );
    transition: filter var(--duration-slow, 0.45s) var(--ease-standard, ease);
}

.goo-blob-wrapper:hover {
    filter: drop-shadow(
        7px 7px 3px
            color-mix(in srgb, var(--blob-color, transparent) 25%, var(--foreground))
    );
}

/* Canvas is 160% of wrapper — overflows so satellites at wide orbits render
   beyond the layout footprint. */
.goo-blob-canvas {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 160%;
    height: 160%;
    transform: translate(-50%, -50%);
    will-change: transform;
    pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
    .goo-blob-wrapper {
        filter: drop-shadow(
            5px 5px 2.5px
                color-mix(in srgb, var(--blob-color, transparent) 20%, var(--foreground))
        ) !important;
        transition: none !important;
    }
}
</style>
