<script setup lang="ts">
// BB.W-DEMO-DESIGN — the color tour as a DESIGNED specimen. The vibrant 13-stop
// `--section-color` rainbow leads the pane (the focal moment, FIRST in source
// order — it was buried below a dull flat core grid); it pops in on the W-SCROLL-
// MOTION `.scroll-cascade--columns` register (the spring-clocked coupled build, no
// demo-local @keyframes), the viz-basis glyphs pop in on the W-SUFFUSE3 IconChip
// `:reveal` axis, and the core swatch grid stays correct-monochrome (the warm-cream/
// role tokens are documentary — adding color violates the one-color-event
// proportion) but gains the calm wash read-through (the StoryHero `cardTier` drop)
// + the glass-tier hover the icons grid has. The library `--section-color` tokens
// are NOT demo color (they ARE library tokens — D6 fence).
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
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
// companion neutrals (amber / green) used throughout math-paper work. The
// ornamental glyphs are display-register letters (not lucide icons), so each tile
// reads its hue as the ONE tile event (the glyph color); the tiles pop in on the
// W-SCROLL-MOTION `.scroll-cascade` register.
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
        <!-- THE RAINBOW — PROMOTED to the focal moment, leading the pane. The 13
             stops pop in on the W-SCROLL-MOTION `.scroll-cascade--columns` register
             (the column-stagger spring-clocked build — the focal pop-entrance, no
             demo-local @keyframes). The stops are LARGER than the buried HEAD row. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">Foundations · Color</p>
            <h2 class="text-subheading">Section ramp · 13 stops</h2>
            <p class="text-small max-w-prose text-muted-foreground">
                The chapter palette — <code class="fira-code">--section-color-0..12</code>,
                exposed as <code class="fira-code">bg-section-N</code>. The brand's
                vibrant register; the role tokens below stay documentary-monochrome.
            </p>
            <div
                class="scroll-cascade scroll-cascade--columns grid gap-2"
                style="grid-template-columns: repeat(13, minmax(0, 1fr))"
            >
                <div
                    v-for="i in rainbow"
                    :key="i"
                    class="flex flex-col items-center gap-1.5"
                    :style="{ '--col': i }"
                >
                    <div
                        class="h-24 w-full rounded-lg border border-border/40 shadow-cartoon-sm"
                        :style="{ background: `var(--section-color-${i})` }"
                    />
                    <span class="text-mono-caption text-muted-foreground">{{ i }}</span>
                </div>
            </div>
        </section>

        <!-- VIZ BASIS — the math-paper hues. The hue is the ONE event per tile (the
             ornamental glyph carries it; the label stays ink). The tiles pop in on
             the W-SCROLL-MOTION `.scroll-cascade` register (its own host so each
             tile builds in on its view() timeline). -->
        <StorySection heading="Viz basis">
            <div class="scroll-cascade grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                <ShowcaseFrame
                    v-for="(t, i) in viz"
                    :key="t.id"
                    tier="quiet"
                    pad="lg"
                    class="relative overflow-hidden"
                >
                    <div
                        class="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                        :style="{ background: `var(--viz-${t.id})` }"
                    />
                    <div class="flex flex-col gap-3">
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
                </ShowcaseFrame>
            </div>
        </StorySection>

        <!-- CORE ROLES — the documentary-monochrome role tokens. They stay flat
             (the warm-cream/role tokens are the identity, not a color event — adding
             color violates proportion); the grid gains the calm wash read-through
             (the ShowcaseFrame quiet tier) + the glass-tier hover lift the icons
             grid carries. -->
        <StorySection heading="Core roles">
            <div
                class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
                <ShowcaseFrame
                    v-for="c in core"
                    :key="c.name"
                    tier="quiet"
                    pad="sm"
                    :class="
                        cn(
                            'transition-transform duration-fast ease-out',
                            'hover:-translate-x-px hover:-translate-y-px',
                        )
                    "
                >
                    <div class="flex flex-col gap-2">
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
                </ShowcaseFrame>
            </div>
        </StorySection>
    </StoryPage>
</template>
