<script setup lang="ts">
// Constellation (consumer #1) — the neutral proximity-graph lattice + a
// `drawOverlay` focal node. The overlay paints a glass-ui-toned (`--primary`)
// pulse ring, NOT the slides NC-red anomaly: the demo proves the skin seam
// carries ARBITRARY consumer content, so the branded skin stays a consumer
// concern. The second consumer is the slides anomaly-ring deck (H.W10).
import { computed, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    Constellation,
    type ConstellationField,
} from "../../../src/subpaths/constellation";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
import { useTokenColor } from "../../../src/composables/dom/useTokenColor";

const pointerReactive = ref(true);

// Resolve `--primary` to a concrete color so the canvas overlay paints it (a
// Canvas2D `fillStyle` cannot resolve a `var()`). Re-resolves on a dark flip.
const { value: primary } = useTokenColor("--primary", { fallback: "#1c1714" });

// The skin seam. Runs after the four neutral passes with the live field, so the
// focal mark pins to a real node and pulses a ring around it.
const drawFocal = computed(
    () =>
        (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
            const focal = field.nodes[0];
            if (!focal) return;
            const k = field.k;
            const phase = (now % 2600) / 2600;
            // pulse ring
            ctx.strokeStyle = primary.value;
            ctx.globalAlpha = (1 - phase) * 0.5;
            ctx.lineWidth = 1.4 * k;
            ctx.beginPath();
            ctx.arc(focal.x, focal.y, (12 + phase * 22) * k, 0, Math.PI * 2);
            ctx.stroke();
            // steady halo
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(focal.x, focal.y, 15 * k, 0, Math.PI * 2);
            ctx.stroke();
            // core dot
            ctx.globalAlpha = 1;
            ctx.fillStyle = primary.value;
            ctx.beginPath();
            ctx.arc(focal.x, focal.y, 4.2 * k, 0, Math.PI * 2);
            ctx.fill();
        },
);
</script>

<template>
    <StoryPage>
        <StorySection
            label="proximity-graph lattice"
            blurb="A Canvas2D field of drifting nodes joined by distance-falloff hairlines. Composes the useCanvas2D substrate — it inherits the offscreen / tab-hidden / reduced-motion freeze for free. The lattice ships neutral; the --primary focal node is a consumer drawOverlay pass, proving the skin seam carries arbitrary content (NOT the slides red anomaly)."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch v-model="pointerReactive" />
                    <span class="text-sm">pointer-reactive (steer-toward-cursor + tap ripples)</span>
                </Label>
            </div>

            <ShowcaseFrame pad="none">
                <!-- warm-cream full-bleed surface; the lattice tracks the
                     --constellation-* tokens (neutral fallbacks here). -->
                <div class="relative h-[420px] w-full overflow-hidden rounded-card bg-card">
                    <Constellation
                        seed="glass-ui"
                        :count="56"
                        :link="140"
                        :pointer-reactive="pointerReactive"
                        :draw-overlay="drawFocal"
                        class="absolute inset-0"
                    />
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Under <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate paints ONE static frame then parks — the lattice
                freezes in place and pointer reactivity is disabled (no drift, no
                ripples). Toggle reduced-motion in your OS to verify the freeze.
            </p>
        </StorySection>
    </StoryPage>
</template>
