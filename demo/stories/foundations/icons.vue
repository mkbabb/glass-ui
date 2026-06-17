<script setup lang="ts">
// BB.W-DEMO-DESIGN — the icons pane as a DESIGNED specimen. The Pops row (the
// user-cited "colorful audacious pops, like in our icons") LEADS the pane — the
// icons-as-color-event IS the story; the monochrome grid is the supporting
// reference. Each chip blooms in on the W-SUFFUSE3 IconChip `:reveal` spring-clock
// entrance (scale 0.85→1, the snappy ~+7% overshoot, PRM-gated by vReveal — NOT a
// demo-local @keyframes) with a staggered `--d` step. The icon grid gains the calm
// wash read-through (ShowcaseFrame quiet tier) + the glass-tier hover lift; its
// glyphs stay ink (the monochrome proportion held). The library `--section-color`
// tokens are NOT demo color (D6 fence).
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    Bell,
    BookOpen,
    Command,
    Compass,
    LayoutTemplate,
    Layers,
    Library,
    Moon,
    Package,
    Palette,
    Search,
    Settings,
    Shapes,
    SquareStack,
    Star,
    Sun,
    Table,
    Type,
    Wand2,
    Waves,
    Zap,
} from "@lucide/vue";
import type { Component } from "vue";
import { IconChip } from "../../../src/components/custom/icon-chip";

interface IconRow {
    name: string;
    component: Component;
}

const icons: IconRow[] = [
    { name: "Compass", component: Compass },
    { name: "Shapes", component: Shapes },
    { name: "SquareStack", component: SquareStack },
    { name: "Table", component: Table },
    { name: "Bell", component: Bell },
    { name: "Waves", component: Waves },
    { name: "LayoutTemplate", component: LayoutTemplate },
    { name: "Settings", component: Settings },
    { name: "Sun", component: Sun },
    { name: "Moon", component: Moon },
    { name: "Command", component: Command },
    { name: "Search", component: Search },
    { name: "Star", component: Star },
    { name: "Zap", component: Zap },
    { name: "Wand2", component: Wand2 },
    { name: "Palette", component: Palette },
    { name: "Type", component: Type },
    { name: "Layers", component: Layers },
    { name: "Library", component: Library },
    { name: "Package", component: Package },
    { name: "BookOpen", component: BookOpen },
];

const sizes: { label: string; px: number }[] = [
    { label: "sm · 16", px: 16 },
    { label: "md · 20", px: 20 },
    { label: "lg · 24", px: 24 },
];

const strokes: number[] = [1, 1.5, 2];

// The pops register — the shipped empty-states chip recipe (a 25% color-mix circle
// backplate + a full-chroma glyph) walked across the 13-stop `--section-color-*`
// ramp. ONE chip per stop, 1:1 onto the section ramp. The proportion rule rides in
// the section blurb: one color event per surface, chips never exceed icon scale,
// body ink stays untinted.
const pops: { icon: Component; section: number }[] = [
    { icon: Compass, section: 0 },
    { icon: Shapes, section: 1 },
    { icon: Waves, section: 2 },
    { icon: Star, section: 3 },
    { icon: Zap, section: 4 },
    { icon: Wand2, section: 5 },
    { icon: Palette, section: 6 },
    { icon: Command, section: 7 },
    { icon: Search, section: 8 },
    { icon: Layers, section: 9 },
    { icon: Library, section: 10 },
    { icon: Package, section: 11 },
    { icon: BookOpen, section: 12 },
];
</script>

<template>
    <StoryPage>
        <!-- POPS — PROMOTED to LEAD the pane. The icon chip is the brand's color
             event, walked across the 13-stop ramp; each chip blooms in on the
             IconChip `:reveal` spring-clock entrance (the `:saturated` + `:bloom`
             axes deepen the chroma + the hover register). The monochrome grid below
             is the supporting reference. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">Foundations · Icons</p>
            <h2 class="text-subheading">Pops · the color event</h2>
            <p class="text-small max-w-2xl text-muted-foreground">
                The icon chip is the brand's color event: a
                <span class="font-mono text-xs">color-mix(… 25%, transparent)</span>
                backplate under a full-chroma glyph, walked across the 13-stop
                <span class="font-mono text-xs">--section-color-*</span> ramp.
                <span class="text-foreground">The proportion rule:</span> a surface
                gets ONE color event — either a field behind glass or a chip cluster
                like this, never both at full volume; a chip never exceeds icon
                scale, and body ink is never tinted.
            </p>
            <ShowcaseFrame tier="field" pad="lg">
                <div class="grid grid-cols-5 gap-4 sm:grid-cols-7 md:grid-cols-13">
                    <div
                        v-for="(pop, i) in pops"
                        :key="pop.section"
                        class="flex flex-col items-center gap-2"
                    >
                        <IconChip
                            :icon="pop.icon"
                            :section="pop.section"
                            saturated
                            bloom
                            :reveal="i + 1"
                        />
                        <span class="text-mono-caption text-muted-foreground">{{
                            pop.section
                        }}</span>
                    </div>
                </div>
            </ShowcaseFrame>
        </section>

        <!-- THE MONOCHROME GRID — the supporting reference. The grid cells gain the
             calm wash read-through + the glass-tier hover lift; the glyphs stay ink
             (the monochrome proportion held — no color event here). -->
        <StorySection heading="Lucide reference">
            <div
                class="scroll-cascade grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            >
                <ShowcaseFrame
                    v-for="icon in icons"
                    :key="icon.name"
                    tier="quiet"
                    pad="sm"
                    class="transition-transform duration-fast ease-out hover:-translate-x-px hover:-translate-y-px"
                >
                    <div class="flex flex-col items-center gap-2">
                        <component
                            :is="icon.component"
                            :size="22"
                            :stroke-width="1.75"
                            class="text-foreground"
                        />
                        <span
                            class="text-mono-caption text-center text-muted-foreground"
                            >{{ icon.name }}</span
                        >
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <!-- Sizing demo -->
        <StorySection heading="Sizing">
            <div class="flex items-end gap-8">
                <div
                    v-for="s in sizes"
                    :key="s.label"
                    class="flex flex-col items-center gap-2"
                >
                    <Compass
                        :size="s.px"
                        :stroke-width="1.75"
                        class="text-foreground"
                    />
                    <span class="text-mono-caption text-muted-foreground">{{
                        s.label
                    }}</span>
                </div>
            </div>
        </StorySection>

        <!-- Stroke-width demo -->
        <StorySection heading="Stroke width">
            <div class="flex items-end gap-8">
                <div
                    v-for="w in strokes"
                    :key="w"
                    class="flex flex-col items-center gap-2"
                >
                    <Compass :size="28" :stroke-width="w" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground"
                        >{{ w.toFixed(1) }}px</span
                    >
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
