<script setup lang="ts">
// Constellation (consumer #1) — the neutral proximity-graph lattice + a
// `drawOverlay` focal node. The overlay paints a glass-ui-toned (`--primary`)
// pulse ring, NOT the slides NC-red anomaly: the demo proves the skin seam
// carries ARBITRARY consumer content, so the branded skin stays a consumer
// concern. The second consumer — the slides anomaly-ring deck — adopts at
// AX.W30 (gated on the AX publish): it deletes its 510-line constellation.ts
// and re-points onto this seam + the focal-node click-to-warp interaction.
import { computed, onMounted, ref, useTemplateRef } from "vue";
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
// focal mark pins to a real node and pulses a ring around it. node[0] is the
// static-focal demo (no warp).
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

// ── Click-to-warp section (AX.W17) ──────────────────────────────────────────
// The focal mark rides the ENGINE-OWNED warp spring position (`field.warp`), not
// a static node. A click warps it to the nearest drifting node + springs it
// there (critically damped, chasing a live target). The overlay paints at
// `field.warp.{x,y}` — the spring-eased position the library owns.
const { value: accent } = useTokenColor("--constellation-accent", {
    fallback: "#b35030",
});
const warpRef = useTemplateRef<InstanceType<typeof Constellation>>("warpRef");

const drawWarpFocal = computed(
    () =>
        (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
            // Paint the focal mark at the spring-eased warp position. Before the
            // first warp the focal rides field-center (seeded on layout).
            const wx = field.warp.x;
            const wy = field.warp.y;
            if (field.focalIndex < 0 && wx === 0 && wy === 0) return;
            const k = field.k;
            const phase = (now % 2200) / 2200;
            ctx.strokeStyle = accent.value;
            ctx.globalAlpha = (1 - phase) * 0.55;
            ctx.lineWidth = 1.6 * k;
            ctx.beginPath();
            ctx.arc(wx, wy, (10 + phase * 20) * k, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.arc(wx, wy, 13 * k, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.fillStyle = accent.value;
            ctx.beginPath();
            ctx.arc(wx, wy, 4.6 * k, 0, Math.PI * 2);
            ctx.fill();
        },
);

// DEMO-PRIVATE π-lane hook: expose the live warp field + the imperative warpTo
// on `window` so the W00 visual-runtime lane can read `field.warp`/`field.nodes`
// per frame and dispatch a synthetic warp (a runtime-observation probe, NOT a
// grep). Never shipped — this is a demo-story test seam only.
onMounted(() => {
    const inst = warpRef.value as
        | (InstanceType<typeof Constellation> & {
              field?: ConstellationField;
              warpTo?: (a: { x: number; y: number } | number, b?: number) => number;
          })
        | null;
    if (inst && typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).__constellationWarp = {
            field: inst.field,
            warpTo: inst.warpTo?.bind(inst),
        };
    }
});
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
                     --constellation-* tokens (the library light/dark legibility
                     block — AX.W17). -->
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

        <StorySection
            label="click-to-warp focal node (AX.W17)"
            blurb="Click anywhere — the focal mark warps to the NEAREST drifting node and springs there (critically damped, chasing the live drifting target so it arrives ON the node, then rides its drift). Click again to re-point. The warp is one engine-owned spring stepped inside the substrate's single rAF (no second rAF, no useSpring); it is disabled under prefers-reduced-motion. The --constellation-accent tint is the consumer-preset boundary (the library ships a neutral default; slides aliases it to --ncsu-red)."
        >
            <ShowcaseFrame pad="none">
                <div
                    class="relative h-[420px] w-full cursor-pointer overflow-hidden rounded-card bg-card"
                >
                    <Constellation
                        ref="warpRef"
                        seed="warp-demo"
                        :count="60"
                        :link="148"
                        :pointer-reactive="false"
                        warp-on-click
                        :draw-overlay="drawWarpFocal"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        click to warp the focal node
                    </span>
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Note <code class="font-mono text-xs">pointerReactive</code> is OFF here
                and <code class="font-mono text-xs">warpOnClick</code> still fires —
                the two axes are independent (warp works on a non-ripple lattice).
                The constellation is a DECORATIVE proximity graph, not a data-graph
                renderer.
            </p>
        </StorySection>
    </StoryPage>
</template>
