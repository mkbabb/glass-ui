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
import { Card, type CardTier } from "../../src/components/ui/card";
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

// A GooBlob is a CONTAINED creature (aspect-ratio:1), NOT a full-bleed page-field
// like the aurora/constellation/fourier drift surfaces — so it is NOT a story
// background kind (W-BLOB-REBUILD: the prior `blob` page-background was a category
// error that blew the contained creature out to the full article width and buried
// the page). The blob's home is its contained studio + the empty-states mascot.
const liveBackdrop = computed(() =>
    kind.value === "aurora" ||
    kind.value === "constellation" ||
    kind.value === "fourier",
);

// ── Full-bleed hero (W-SB-REVERIFY — B16/B22) ────────────────────────────────
// A HERO page over a LIVE substrate paints the field FULL-BLEED behind the WHOLE
// page (the substrate IS the page background — the user's bar: "no sub-container
// on pages like this"). The boxed-card model trapped the substrate inside a glass
// plate that double-washed it to invisible; here the substrate escapes to
// `position: fixed; inset: 0` (the KonamiAurora full-bleed idiom) so it fills the
// viewport behind the page header AND the content, and the content sits DIRECTLY
// over the live field on a thin readability plate — no boxing, no wash-out.
const fullBleed = computed(() => isHero.value && liveBackdrop.value);

// ── The read-through seam (W-SB-STAGE §2.1a) ─────────────────────────────────
// Over a LIVE substrate the card drops to a THINNER glass rung so the field reads
// THROUGH it. Over grid / paper / none the tier is BYTE-IDENTICAL to HEAD
// (`floating` hero / `resting` page) — the default-path canary. A full-bleed hero
// has no card box (the content floats free over the field); a contained page over
// a live field takes the `wash` (0.3α) thin plate.
const cardTier = computed<CardTier>(() => {
    if (liveBackdrop.value) return isHero.value ? "quiet" : "wash";
    return isHero.value ? "floating" : "resting";
});
</script>

<template>
    <div
        class="story-hero"
        :data-variant="variant"
        :data-full-bleed="fullBleed ? 'true' : null"
    >
        <!-- Per-page background substrate. A full-bleed hero pins it
             `position: fixed; inset: 0` (the `.story-hero-bg--bleed` modifier) so
             the live field IS the page background behind the header AND content;
             a contained page keeps it boxed behind the card (`-z-10` inset). -->
        <Aurora
            v-if="kind === 'aurora'"
            :config="auroraConfig"
            :opacity-ceiling="opacityCeiling"
            :class="cn('story-hero-bg', fullBleed && 'story-hero-bg--bleed')"
            aria-hidden="true"
        />
        <Constellation
            v-else-if="kind === 'constellation'"
            seed="glass-ui"
            :count="56"
            :link="140"
            :draw-overlay="drawFocal"
            :class="cn('story-hero-bg', fullBleed && 'story-hero-bg--bleed')"
        />
        <FourierField
            v-else-if="kind === 'fourier'"
            variant="hero"
            color="var(--viz-fourier, hsl(358 72% 52%))"
            :color-resolver="defaultBlobColorResolver"
            :intensity="opacityCeiling"
            seed="glass-ui-hero"
            :class="cn('story-hero-bg', fullBleed && 'story-hero-bg--bleed')"
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

        <!-- Full-bleed hero — the content floats DIRECTLY over the live field on a
             thin readability plate (no card box, no double-wash). The W55
             `--glass-backdrop: light` bucket keeps the prose AA over the bright
             drift. -->
        <div
            v-if="fullBleed"
            :style="{ '--glass-backdrop': 'light' }"
            :class="cn('story-hero-bleed-content', cardClass)"
        >
            <slot />
        </div>

        <!-- Contained page / non-live hero — the body sits inside a glass card.
             Glass-first by default; over a LIVE substrate the card takes a THINNER
             rung + the W55 bucket so the field reads through and prose stays AA. -->
        <Card
            v-else
            :tier="cardTier"
            :style="liveBackdrop ? { '--glass-backdrop': 'light' } : undefined"
            :class="
                cn(
                    'story-hero-card',
                    isHero ? 'story-hero-card--hero' : 'story-hero-card--page',
                    liveBackdrop && 'story-hero-card--live',
                    cardClass,
                )
            "
        >
            <slot />
        </Card>
    </div>
</template>
