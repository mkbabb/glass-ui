<script setup lang="ts">
// Chart & Chassis Palette — chart aliases (--chart-{ping,download,upload,jitter})
// + chassis-tier opacities. Resolves the --viz-topology / --viz-recursion
// non-existent token references named in C-d §4.1.
//
// L.W3 Lane B — second-consumer wiring for `<InstrumentChassis>`: the
// chassis-tier ladder sits alongside a live mini-chassis so consumers see the
// tokens composed. The chart-palette ladder sits alongside a row of plain
// token-color tiles so each chart hue reads at swatch scale.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import TokenLadder from "../TokenLadder.vue";
import type { TokenLadderRow } from "../TokenLadder.vue";
import { InstrumentChassis } from "../../../src/components/custom/instrument-chassis";

const chartAliases: TokenLadderRow[] = [
    { cls: "bg-[var(--chart-ping)]", label: "--chart-ping", hint: "viz-fourier basis" },
    { cls: "bg-[var(--chart-download)]", label: "--chart-download", hint: "viz-chebyshev basis" },
    { cls: "bg-[var(--chart-upload)]", label: "--chart-upload", hint: "viz-legendre basis" },
    { cls: "bg-[var(--chart-jitter)]", label: "--chart-jitter", hint: "viz-bessel basis" },
];

const chassisOpacities: TokenLadderRow[] = [
    { cls: "bg-[var(--glass-bg-dock)]", label: "--glass-bg-dock", hint: "GlassDock substrate" },
    { cls: "bg-[var(--glass-bg-chassis)]", label: "--glass-bg-chassis", hint: "InstrumentChassis frame" },
    { cls: "bg-[var(--glass-curvature-overlay)]", label: "--glass-curvature-overlay", hint: "specular curve" },
    { cls: "bg-[var(--glass-specular)]", label: "--glass-specular", hint: "highlight pinch" },
];

const chartTileSwatches: { id: string; hint: string; cssVar: string }[] = [
    { id: "ping", hint: "--chart-ping", cssVar: "var(--chart-ping)" },
    { id: "download", hint: "--chart-download", cssVar: "var(--chart-download)" },
    { id: "upload", hint: "--chart-upload", cssVar: "var(--chart-upload)" },
    { id: "jitter", hint: "--chart-jitter", cssVar: "var(--chart-jitter)" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="chart palette aliases"
            blurb="Speedtest-shaped semantic chart palette: ping / download / upload / jitter mapped onto the underlying viz-fourier / viz-chebyshev / viz-legendre / viz-bessel basis colours. Consumers paint with the semantic alias; the basis can shift without touching call sites."
        >
            <ShowcaseFrame pad="lg">
                <TokenLadder
                    :rows="chartAliases"
                    sample-class="size-12 rounded-md border border-border"
                    sample-text=""
                    layout="stacked"
                />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="chart palette · token-color tiles"
            blurb="Each chart-palette hue painted as a plain token-color tile. The tile reads the chart token directly as its background — one place to verify the chart palette reads at swatch scale."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-center gap-8">
                    <div
                        v-for="swatch in chartTileSwatches"
                        :key="swatch.id"
                        class="flex flex-col items-center gap-2"
                    >
                        <div
                            class="size-12 rounded-md border border-border"
                            :style="{ background: swatch.cssVar }"
                        />
                        <span class="text-mono-caption text-muted-foreground">{{ swatch.hint }}</span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="chassis-tier opacities + specular"
            blurb="The InstrumentChassis composition layers four tier-specific tokens. Dock substrate is subtle; chassis frame is denser; the specular tokens drive the curved highlight band that reads as 'glass under angled light'."
        >
            <ShowcaseFrame pad="lg">
                <TokenLadder
                    :rows="chassisOpacities"
                    sample-class="size-12 rounded-md border border-border"
                    sample-text=""
                    layout="stacked"
                />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="chassis-tier tokens · composed surface"
            blurb="Live mini-chassis showing the four chassis tokens in composition. The engraved-bezel ::before stroke, twin-line region dividers, and radial-gradient curvature overlay all read at rest — chassis character that persists at every phase. Slot content is intentionally minimal so the chrome reads."
        >
            <ShowcaseFrame pad="lg">
                <InstrumentChassis phase="ready" class="w-full max-w-2xl mx-auto">
                    <template #strip>
                        <span class="text-mono-caption text-muted-foreground">strip region</span>
                    </template>
                    <template #dial>
                        <span class="text-mono-caption text-muted-foreground">dial region</span>
                    </template>
                    <template #control>
                        <span class="text-mono-caption text-muted-foreground">control region</span>
                    </template>
                </InstrumentChassis>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="resolved drift"
            blurb="Pre-V the storybook referenced --viz-topology and --viz-recursion — neither token exists in the canon. This page replaces those references with the canonical chart aliases above. See `foundations/colors.vue` for the full viz-basis set."
        />
    </StoryPage>
</template>
