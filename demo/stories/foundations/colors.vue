<script setup lang="ts">
// The vibrant 13-stop color tour leads the pane as a designed specimen.
// `--section-color` rainbow leads the pane (the focal moment, FIRST in source
// order); it enters on the `.scroll-cascade--columns` motion register (no
// demo-local @keyframes), the viz-basis glyphs use the shared reveal register
// `:reveal` axis, and the core swatch grid stays correct-monochrome (the warm-cream/
// role tokens are documentary — adding color violates the one-color-event
// proportion) but gains the calm wash read-through (the StoryHero `cardTier` drop)
// + the glass-tier hover the icons grid has. The library `--section-color` tokens
// are NOT demo color (they ARE library tokens — D6 fence).
//
// The section-ramp stops render as the living WatercolorDot voice: each stop is a
// seeded organic pastel blob (the shipped
// `<WatercolorDot>` primitive, REUSED not re-forked — no demo-local blob), sized well
// above the retired 96px flat chip, laid out with a HAND-LAID vertical stagger (a
// fixed per-stop block-offset — the irregular read the user named, never a flat
// aligned row), animating LIVE on the rebuilt useRAFLoop (`animate`) and entering ON
// SCROLL via the EXISTING `.scroll-cascade--columns` register (KISS — no demo-local
// @keyframes). The 13-stop ramp IS the content (the reference-class one-color-event
// exemption, the progress phase-bus precedent), so every stop carries its full
// `--section-color-N` chroma; the mono-caption labels stay ink.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { WatercolorDot } from "@glass/components/watercolor-dot";
import { cn } from "@glass/components/_shared/class-names";

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
    // the shadcn `--ring`/`bg-ring` token retired onto the house
    // `--focus-ring-color`, the `.focus-ring` box-shadow utility.
    { name: "focus-ring-color", cssVar: "--focus-ring-color", utility: "focus-ring" },
];

// The 13-stop chapter palette maps --section-color-0..12 to bg-section-N.
const rainbow = Array.from({ length: 13 }, (_, i) => i);

// The 120px WatercolorDot reads as a hand-painted mark rather than a token cell.
const SWATCH_SIZE = "7.5rem"; // 120px

// Hand-laid block-offset per stop (rem), fixed for capture determinism. Adjacent
// stops carry DISTINCT offsets — the irregular hand-laid zigzag the user named, not
// a flat aligned row. Applied as a STATIC margin-block-start (a layout offset, never
// animated) so it composes with the compositor-only.scroll-cascade--columns
// entrance transform without clobbering it.
const STAGGER_REM = [0, 1.6, 0.5, 1.3, 0, 1.7, 0.6, 1.4, 0.3, 1.5, 0.4, 1.2, 0];

// Viz basis palette — the three orthogonal-polynomial hues plus two
// companion neutrals (amber, green) used throughout math-paper work. The
// ornamental glyphs are display-register letters (not lucide icons), so each tile
// reads its hue as the ONE tile event (the glyph color); the tiles pop in on the
//  `.scroll-cascade` register.
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
        <!-- THE RAINBOW — PROMOTED to the focal moment, leading the pane. Each of the
             13 stops is a living WatercolorDot seeded blob (≥112px, the watercolor
             voice the user asked back), laid out with a hand-laid vertical stagger and
             popping in on the `.scroll-cascade--columns` register (the
             column-stagger spring-clocked build — the focal pop-entrance, no
             demo-local @keyframes). The blobs are LARGER than the buried HEAD chip. -->
        <StorySection label="Foundations · Color" heading="Section ramp · 13 stops">
            <p class="text-small max-w-prose text-muted-foreground">
                The chapter palette — <code class="fira-code">--section-color-0..12</code>,
                exposed as <code class="fira-code">bg-section-N</code>. The brand's
                vibrant register; the role tokens below stay documentary-monochrome.
            </p>
            <div
                class="scroll-cascade scroll-cascade--columns flex flex-wrap items-start gap-x-5 gap-y-3"
            >
                <div
                    v-for="i in rainbow"
                    :key="i"
                    class="flex flex-col items-center gap-2"
                    :style="{ '--col': i, marginBlockStart: `${STAGGER_REM[i]}rem` }"
                >
                    <WatercolorDot
                        :color="`var(--section-color-${i})`"
                        :seed="`section-ramp-${i}`"
                        animate
                        :style="{ width: SWATCH_SIZE, height: SWATCH_SIZE }"
                    />
                    <span class="text-mono-caption text-muted-foreground">{{ i }}</span>
                </div>
            </div>
        </StorySection>

        <!-- VIZ BASIS — the math-paper hues. The hue is the ONE event per tile (the
             ornamental glyph carries it; the label stays ink). The tiles pop in on
             the `.scroll-cascade` register (its own host so each
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
