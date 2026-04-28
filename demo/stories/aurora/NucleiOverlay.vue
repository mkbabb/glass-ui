<script setup lang="ts">
import { computed } from "vue";
import type { AuroraNucleus } from "@/components/custom/aurora";

/**
 * DOM overlay drawing nucleus rings over the stage canvas.
 *
 * Nuclei live in 0..1 CSS-top-origin space, so positioning is straight
 * percentage-based. The rings are the visible affordance for the CRUD model:
 * pointerdown on a ring → drag (handled by useCursorInteraction upstream);
 * shift-click / right-click → remove; alt-click empty → spawn.
 *
 * The overlay intentionally does NOT intercept pointermove on the ring —
 * that pattern would eat continuous-swirl updates while hovering a ring.
 * Instead, pointer-events stay on the parent stage wrap; rings are purely
 * visual. Hit-testing is CPU-side in useCursorInteraction.
 */

const props = defineProps<{
    nuclei: AuroraNucleus[];
    dimmed?: boolean;
}>();

// A nucleus "radius" is a Gaussian falloff sigma, not a hard circle. Visual
// ring shows a fraction so it doesn't dominate the composition it labels.
const VISUAL_RADIUS_FRAC = 0.35;

const items = computed(() =>
    props.nuclei.map((nu, i) => {
        const r = nu.radius * VISUAL_RADIUS_FRAC;
        return {
            i,
            left: `${nu.x * 100}%`,
            top: `${nu.y * 100}%`,
            size: `${r * 200}%`, // width = 2r as fraction of stage width
        };
    }),
);
</script>

<template>
    <div
        class="pointer-events-none absolute inset-0"
        :class="dimmed ? 'opacity-35' : 'opacity-70'"
        aria-hidden="true"
    >
        <div
            v-for="n in items"
            :key="n.i"
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40"
            :style="{
                left: n.left,
                top: n.top,
                width: n.size,
                aspectRatio: '1 / 1',
                background:
                    'radial-gradient(circle, transparent 60%, color-mix(in srgb, var(--foreground) 22%, transparent) 85%, transparent 100%)',
            }"
        >
            <span
                class="text-mono-caption absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/70 px-1.5 py-0.5 text-[10px] leading-none text-background"
            >
                {{ n.i + 1 }}
            </span>
        </div>
    </div>
</template>
