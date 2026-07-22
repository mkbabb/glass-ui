<script setup lang="ts">
// Chart Palette — visualization aliases at token and swatch scale.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import TokenLadder from "../../chassis/showcase/TokenLadder.vue";
import type { TokenLadderRow } from "../../chassis/showcase/TokenLadder.vue";

const chartAliases: TokenLadderRow[] = [
    { cls: "bg-[var(--chart-ping)]", label: "--chart-ping", hint: "viz-fourier basis" },
    { cls: "bg-[var(--chart-download)]", label: "--chart-download", hint: "viz-chebyshev basis" },
    { cls: "bg-[var(--chart-upload)]", label: "--chart-upload", hint: "viz-legendre basis" },
    { cls: "bg-[var(--chart-jitter)]", label: "--chart-jitter", hint: "viz-bessel basis" },
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
                        <span class="text-mono-small text-muted-foreground">{{ swatch.hint }}</span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="resolved drift"
            blurb="These chart aliases form the supported palette for topology and recursive views. See Colors for the full visualization basis."
        />
    </StoryPage>
</template>
