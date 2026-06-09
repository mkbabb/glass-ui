<script setup lang="ts">
// StoryHero — the page-redesign container. Wraps a story page's body in a GLASS
// CARD floating OVER a per-page background substrate. The glass card reads
// glass-first by default (the library's default register), so a page composing
// this DEMONSTRATES the glass it ships: a translucent card over a live aurora /
// constellation / fourier field, or a quiet paper / blueprint-grid wash.
//
// A page declares its background ONCE on its manifest row (`background:`); the
// page chassis (`StoryPage`) reads that descriptor and passes it here. Two
// registers:
//   - variant="page" (default) — a contained glass card over a calm background;
//     the universal shape every content page wears.
//   - variant="hero"           — a full-bleed glassy hero card floating over the
//     live substrate; the front-door demonstration.
import { computed } from "vue";
import { Card } from "../../src/components/ui/card";
import { Aurora } from "../../src/components/custom/aurora";
import { Constellation } from "../../src/components/custom/constellation";
import { FourierField } from "../../src/components/custom/fourier-field";
import { defaultBlobColorResolver } from "../../src/composables/color";
import { useTokenColor } from "../../src/composables/dom/useTokenColor";
import { cn } from "../../src/utils/cn";
import {
    heroAuroraConfig,
    type HeroPaletteKey,
    type StoryBackground,
} from "./aurora-hero";

interface StoryHeroProps {
    /** The declared background substrate (string shorthand or a tuned object). */
    background?: StoryBackground;
    /** "page" (default) contains the body in a glass card over a calm wash;
     *  "hero" goes full-bleed over the live substrate (the front-door read). */
    variant?: "hero" | "page";
    /** Forwarded class string for the glass card surface. */
    cardClass?: string;
}

const props = withDefaults(defineProps<StoryHeroProps>(), {
    variant: "page",
});

// Normalize the string-shorthand and the object form to one shape.
const descriptor = computed(() => {
    const b = props.background;
    if (!b) return null;
    if (typeof b === "string") return { kind: b } as const;
    return b;
});

const kind = computed(() => descriptor.value?.kind ?? null);

// The Aurora palette — a declared palette, or the brand default.
const auroraPalette = computed<HeroPaletteKey>(() => {
    const d = descriptor.value;
    const p = d && "palette" in d ? d.palette : undefined;
    return (p as HeroPaletteKey | undefined) ?? "rose-indigo-amber";
});

const auroraConfig = computed(() => heroAuroraConfig(auroraPalette.value));

// The per-page opacity ceiling — how far back the live substrate recedes behind
// the card content. A hero sits richer; a contained page sits quieter.
const opacityCeiling = computed(() => {
    const d = descriptor.value;
    if (d && "intensity" in d && typeof d.intensity === "number") {
        return d.intensity;
    }
    return props.variant === "hero" ? 0.6 : 0.4;
});

// Resolve --primary to a concrete color so the constellation overlay can paint
// it (a Canvas2D fill cannot resolve a var()). Re-resolves on a dark flip.
const { value: focalColor } = useTokenColor("--primary", { fallback: "#1c1714" });

// The constellation focal pulse — a glass-ui-toned ring on node[0].
function drawFocal(
    ctx: CanvasRenderingContext2D,
    field: { nodes: { x: number; y: number }[]; k: number },
    now: number,
): void {
    const focal = field.nodes[0];
    if (!focal) return;
    const k = field.k;
    const phase = (now % 2600) / 2600;
    ctx.strokeStyle = focalColor.value;
    ctx.globalAlpha = (1 - phase) * 0.5;
    ctx.lineWidth = 1.4 * k;
    ctx.beginPath();
    ctx.arc(focal.x, focal.y, (12 + phase * 22) * k, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(focal.x, focal.y, 15 * k, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = focalColor.value;
    ctx.beginPath();
    ctx.arc(focal.x, focal.y, 4.2 * k, 0, Math.PI * 2);
    ctx.fill();
}

const isHero = computed(() => props.variant === "hero");
</script>

<template>
    <div class="story-hero" :data-variant="variant">
        <!-- Per-page background substrate, painted BEHIND the glass card. -->
        <Aurora
            v-if="kind === 'aurora'"
            :config="auroraConfig"
            :opacity-ceiling="opacityCeiling"
            class="story-hero-bg"
            aria-hidden="true"
        />
        <Constellation
            v-else-if="kind === 'constellation'"
            seed="glass-ui"
            :count="56"
            :link="140"
            :draw-overlay="drawFocal"
            class="story-hero-bg"
        />
        <FourierField
            v-else-if="kind === 'fourier'"
            variant="hero"
            color="var(--viz-fourier, hsl(358 72% 52%))"
            :color-resolver="defaultBlobColorResolver"
            seed="glass-ui-hero"
            class="story-hero-bg"
            aria-hidden="true"
        />
        <div
            v-else-if="kind === 'grid'"
            class="story-hero-bg story-bg-grid"
            aria-hidden="true"
        />
        <div
            v-else-if="kind === 'paper'"
            class="story-hero-bg paper-grain-overlay"
            aria-hidden="true"
        />

        <!-- The glass card the body sits inside. Glass-first by default; the
             body slot carries the page's StorySection hierarchy. -->
        <Card
            :tier="isHero ? 'floating' : 'resting'"
            :class="
                cn(
                    'story-hero-card',
                    isHero ? 'story-hero-card--hero' : 'story-hero-card--page',
                    cardClass,
                )
            "
        >
            <slot />
        </Card>
    </div>
</template>
