<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
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
import { cn } from "../../../src/utils/cn";

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

// The pops register — the shipped empty-states chip recipe (a 25% color-mix
// circle backplate + a full-chroma glyph) walked across the 13-stop
// `--section-color-*` ramp. ONE chip per stop, 1:1 onto the section ramp, the
// same recipe the auth-shell trust badges + the empty-states cards already use
// (FD-R2 §2 — the single highest-leverage pops edit). The proportion rule rides
// in the section blurb below: one color event per surface, chips never exceed
// icon scale, body ink stays untinted.
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
        <!-- Icon grid -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Lucide · {{ icons.length }} icons
            </p>
            <div
                class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            >
                <div
                    v-for="icon in icons"
                    :key="icon.name"
                    :class="
                        cn(
                            'flex flex-col items-center gap-2 rounded-panel border border-border bg-card px-3 py-4',
                            'shadow-cartoon-sm transition-transform duration-fast ease-out',
                            'hover:-translate-x-px hover:-translate-y-px'
                        )
                    "
                >
                    <component
                        :is="icon.component"
                        :size="22"
                        :stroke-width="1.75"
                        class="text-foreground"
                    />
                    <span class="text-mono-caption text-center text-muted-foreground">{{
                        icon.name
                    }}</span>
                </div>
            </div>
        </div>

        <!-- Pops — the section-color chip recipe across the 13-stop ramp -->
        <div>
            <p class="text-admin-label mb-1 text-muted-foreground">Pops</p>
            <p class="text-small mb-4 max-w-2xl text-muted-foreground">
                The icon chip is the brand's color event: a
                <span class="font-mono text-xs">color-mix(… 25%, transparent)</span>
                backplate under a full-chroma glyph, walked across the 13-stop
                <span class="font-mono text-xs">--section-color-*</span> ramp.
                <span class="text-foreground">The proportion rule:</span> a surface
                gets ONE color event — either a field behind glass or a chip
                cluster like this, never both at full volume; a chip never exceeds
                icon scale, and body ink is never tinted.
            </p>
            <div
                class="grid grid-cols-5 gap-3 sm:grid-cols-7 md:grid-cols-13"
            >
                <div
                    v-for="pop in pops"
                    :key="pop.section"
                    class="flex flex-col items-center gap-2"
                >
                    <span
                        class="flex size-12 items-center justify-center rounded-full"
                        :style="{
                            backgroundColor: `color-mix(in srgb, var(--section-color-${pop.section}) 25%, transparent)`,
                            color: `var(--section-color-${pop.section})`,
                        }"
                    >
                        <component
                            :is="pop.icon"
                            :size="22"
                            :stroke-width="1.75"
                            aria-hidden="true"
                        />
                    </span>
                    <span class="text-mono-caption text-muted-foreground"
                        >{{ pop.section }}</span
                    >
                </div>
            </div>
        </div>

        <!-- Sizing demo -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Sizing</p>
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
        </div>

        <!-- Stroke-width demo -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Stroke width</p>
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
        </div>
    </StoryPage>
</template>
