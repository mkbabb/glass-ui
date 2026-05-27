<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { cn } from "../../../src/utils/cn";

// Core surface/semantic roles exposed as Tailwind utilities via @theme.
const core: { name: string; cssVar: string; utility: string }[] = [
    { name: "background", cssVar: "--background", utility: "bg-background" },
    { name: "foreground", cssVar: "--foreground", utility: "bg-foreground" },
    { name: "muted", cssVar: "--muted", utility: "bg-muted" },
    { name: "muted-foreground", cssVar: "--muted-foreground", utility: "bg-muted-foreground" },
    { name: "border", cssVar: "--border", utility: "bg-border" },
    { name: "card", cssVar: "--card", utility: "bg-card" },
    { name: "popover", cssVar: "--popover", utility: "bg-popover" },
    { name: "primary", cssVar: "--primary", utility: "bg-primary" },
    { name: "secondary", cssVar: "--secondary", utility: "bg-secondary" },
    { name: "accent", cssVar: "--accent", utility: "bg-accent" },
    { name: "destructive", cssVar: "--destructive", utility: "bg-destructive" },
    { name: "ring", cssVar: "--ring", utility: "bg-ring" },
];

// 13-stop chapter palette. W1-D ships --section-color-0..12 and bg-section-N.
const rainbow = Array.from({ length: 13 }, (_, i) => i);

// Viz basis palette — the three orthogonal-polynomial hues plus two
// companion neutrals (amber / green) used throughout math-paper work.
const viz: { id: string; glyph: string; label: string; sub: string }[] = [
    { id: "fourier", glyph: "ℱ", label: "Fourier", sub: "red basis" },
    { id: "chebyshev", glyph: "T", label: "Chebyshev", sub: "blue basis" },
    { id: "legendre", glyph: "P", label: "Legendre", sub: "purple basis" },
    { id: "amber", glyph: "A", label: "Amber", sub: "warm accent" },
    { id: "green", glyph: "G", label: "Green", sub: "cool accent" },
];
</script>

<template>
    <StoryPage>
        <!-- CORE -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Core</p>
            <div
                class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
                <div
                    v-for="c in core"
                    :key="c.name"
                    :class="
                        cn(
                            'flex flex-col gap-2 rounded-card border border-border bg-card p-3',
                            'shadow-cartoon'
                        )
                    "
                >
                    <div
                        class="h-14 w-full rounded-md border border-border/60"
                        :style="{ background: `var(${c.cssVar})` }"
                    />
                    <div class="flex flex-col">
                        <span class="text-small text-foreground">{{ c.name }}</span>
                        <span class="text-mono-caption text-muted-foreground">{{
                            c.utility
                        }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- RAINBOW 13-STOP -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Rainbow · section-color-0..12
            </p>
            <div
                class="grid grid-cols-4 gap-2 sm:grid-cols-7 md:grid-cols-13"
                style="grid-template-columns: repeat(13, minmax(0, 1fr));"
            >
                <div
                    v-for="i in rainbow"
                    :key="i"
                    class="flex flex-col items-center gap-1"
                >
                    <div
                        class="h-16 w-full rounded-md border border-border/40"
                        :style="{ background: `var(--section-color-${i})` }"
                    />
                    <span class="text-mono-caption text-muted-foreground"
                        >ch · {{ i }}</span
                    >
                </div>
            </div>
        </div>

        <!-- VIZ BASIS -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Viz basis</p>
            <div
                class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
            >
                <!--
                   Viz tile treatment: rounded card, top-only accent border traced
                   via ::before clip-path analogue (we emulate with a sibling div),
                   and a big ornamental glyph in the Plus Jakarta Sans display italic.
                -->
                <div
                    v-for="t in viz"
                    :key="t.id"
                    class="relative flex flex-col gap-3 overflow-hidden rounded-card border border-border bg-card p-5 shadow-cartoon"
                >
                    <div
                        class="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                        :style="{ background: `var(--viz-${t.id})` }"
                    />
                    <div
                        class="text-display-2 font-display italic leading-none"
                        :style="{
                            fontVariationSettings: `'WONK' 1, 'SOFT' 0`,
                            color: `var(--viz-${t.id})`,
                        }"
                    >
                        {{ t.glyph }}
                    </div>
                    <div class="flex flex-col">
                        <span class="text-subheading text-foreground">{{ t.label }}</span>
                        <span class="text-mono-caption text-muted-foreground">{{
                            t.sub
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </StoryPage>
</template>
