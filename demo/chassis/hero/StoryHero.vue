<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Aurora } from "@glass/components/aurora";
import { Card, CardContent } from "@glass/components/card";
import { Constellation } from "@glass/components/constellation";
import { cn } from "@glass/components/_shared/class-names";
import { useTokenColor } from "@glass/composables/dom/useTokenColor";
import { useRoutePointer } from "@glass/composables/motion/pointer/useRoutePointer";
import StoryHeader from "./StoryHeader.vue";
import {
    heroAuroraConfig,
    type HeroPaletteKey,
    type StoryBackground,
} from "./aurora-hero";

interface StoryHeroProps {
    background?: StoryBackground;
    title?: string;
    displayTitle?: string;
    heroTitle?: boolean;
    blurb?: string | null;
    heroScale?: "audacious" | "mega" | "hero" | "5" | "4";
    depth?: "D0" | "D1" | "D2" | "D3";
    cardClass?: string;
}

const props = withDefaults(defineProps<StoryHeroProps>(), {
    heroTitle: true,
    heroScale: "4",
});

const descriptor = computed(() => {
    if (!props.background) return null;
    return typeof props.background === "string"
        ? ({ kind: props.background } as const)
        : props.background;
});
const kind = computed(() => descriptor.value?.kind ?? null);
const liveBackdrop = computed(
    () => kind.value === "aurora" || kind.value === "constellation",
);
const hasBackdrop = computed(() => Boolean(kind.value));
const heroDisplayTitle = computed(() => props.displayTitle ?? props.title);
const showHeroTitle = computed(
    () => props.heroTitle && Boolean(heroDisplayTitle.value),
);
const showCluster = computed(
    () => props.heroTitle && Boolean(heroDisplayTitle.value || props.blurb),
);
// [BK #58 W-STORY-PROPORTION] `heroClass` is STRUCK — it read
// `text-display-${props.heroScale}` and put a SECOND font-size on the same <h1>
// the `[data-hero-scale]` fit-cap already sized. The utility never won (unlayered
// sheet vs `@layer utilities`), so the rung it named was decoration on every page.
// One attribute now decides the rung and the sheet reads it; see story-hero.css.

const auroraPalette = computed<HeroPaletteKey>(() => {
    const d = descriptor.value;
    const palette = d && "palette" in d ? d.palette : undefined;
    return (palette as HeroPaletteKey | undefined) ?? "rose-indigo-amber";
});
const auroraConfig = computed(() => heroAuroraConfig(auroraPalette.value));
const opacityCeiling = computed(() => {
    const d = descriptor.value;
    return d && "intensity" in d && typeof d.intensity === "number" ? d.intensity : 0.6;
});

// Static and absent fields keep the shared broadcaster parked; live fields still
// share its single listener across every nested procedural surface on the route.
const route = useRoutePointer({ paused: () => !liveBackdrop.value });
const auroraRef = ref<InstanceType<typeof Aurora> | null>(null);
watch([() => route.pointer.value, () => route.active.value], ([pointer, active]) => {
    if (kind.value === "aurora") {
        auroraRef.value?.setCursor(pointer.x, pointer.y, active ? 0.6 : 0);
    }
});

const { value: focalColor } = useTokenColor("--primary", { fallback: "#1c1714" });

function drawFocal(
    ctx: CanvasRenderingContext2D,
    field: { nodes: { x: number; y: number }[]; k: number },
    now: number,
): void {
    const focal = field.nodes[0];
    if (!focal) return;
    const phase = (now % 2600) / 2600;
    const { k } = field;

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
</script>

<template>
    <div class="story-hero" :data-full-bleed="hasBackdrop ? 'true' : null">
        <!-- Backgrounds are page fields, never card fill. Teleporting prevents a
             transformed route ancestor from trapping their fixed viewport box. -->
        <Teleport to="body">
            <Aurora
                v-if="kind === 'aurora'"
                ref="auroraRef"
                :config="auroraConfig"
                :opacity-ceiling="opacityCeiling"
                class="story-hero-bg story-hero-bg--bleed"
                aria-hidden="true"
            />
            <Constellation
                v-else-if="kind === 'constellation'"
                seed="glass-ui"
                :count="56"
                :link="140"
                :opacity-ceiling="opacityCeiling"
                :draw-overlay="drawFocal"
                background-interactive
                class="story-hero-bg story-hero-bg--bleed"
            />
            <div
                v-else-if="kind === 'grid'"
                class="story-hero-bg story-hero-bg--bleed grid-bg"
                aria-hidden="true"
            />
            <div
                v-else-if="kind === 'paper'"
                class="story-hero-bg story-hero-bg--bleed story-bg-paper paper-grain-overlay"
                aria-hidden="true"
            />
        </Teleport>

        <!-- A declared field owns the atmosphere, so content floats directly over
             it. The fallback card exists only for a hero with no field. -->
        <div
            v-if="hasBackdrop"
            :data-live="liveBackdrop ? 'true' : null"
            :style="liveBackdrop ? { '--glass-backdrop': 'light' } : undefined"
            :class="cn('story-hero-bleed-content', cardClass)"
        >
            <StoryHeader
                v-if="showCluster"
                :blurb="blurb"
                class="story-hero-cluster"
                :data-depth="depth"
            >
                <h1
                    v-if="showHeroTitle"
                    :data-hero-scale="heroScale"
                    class="story-hero-title"
                >
                    <slot name="title-ornament" />{{ heroDisplayTitle }}
                </h1>
            </StoryHeader>
            <slot />
        </div>

        <Card
            v-else
            tier="floating"
            size="md"
            :class="cn('story-hero-card', cardClass)"
        >
            <CardContent class="story-hero-card-content">
                <StoryHeader
                    v-if="showCluster"
                    :blurb="blurb"
                    class="story-hero-cluster"
                    :data-depth="depth"
                >
                    <h1
                        v-if="showHeroTitle"
                        :data-hero-scale="heroScale"
                        class="story-hero-title"
                    >
                        <slot name="title-ornament" />{{ heroDisplayTitle }}
                    </h1>
                </StoryHeader>
                <slot />
            </CardContent>
        </Card>
    </div>
</template>
