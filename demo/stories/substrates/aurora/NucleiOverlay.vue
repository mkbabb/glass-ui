<script setup lang="ts">
import { computed } from "vue";
import type { AuroraNucleus } from "@glass/components/aurora";

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
        const elong = nu.elongation ?? 1;
        const angle = nu.angle ?? 0;
        return {
            i,
            left: `${nu.x * 100}%`,
            top: `${nu.y * 100}%`,
            // Width = 2r * elongation along the major axis; height = 2r across.
            // The shader stretches `along` by 1/elong; visually the contour
            // moves outward by `elong`, so the ring widens by the same factor.
            width: `${r * 2 * elong * 100}%`,
            height: `${r * 2 * 100}%`,
            // Rotate around the nucleus centre. We pre-translate by -50% on
            // both axes (Tailwind utility), so the rotation pivot is correct.
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            labelTransform: `translate(-50%, -50%) rotate(${-angle}deg)`,
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
            class="absolute rounded-full border border-foreground/40"
            :style="{
                left: n.left,
                top: n.top,
                width: n.width,
                height: n.height,
                transform: n.transform,
                background:
                    'radial-gradient(ellipse, transparent 60%, var(--surface-tint-22) 85%, transparent 100%)',
            }"
        >
            <!-- Counter-rotate so the index reads upright regardless of nucleus angle. -->
            <span
                class="text-mono-caption absolute left-1/2 top-1/2 rounded-full bg-foreground/70 px-1.5 py-0.5 text-[10px] leading-none text-background"
                :style="{ transform: n.labelTransform }"
            >
                {{ n.i + 1 }}
            </span>
        </div>
    </div>
</template>
