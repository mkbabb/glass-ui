<script setup lang="ts">
// Chart & Chassis Palette — chart aliases (--chart-{ping,download,upload,jitter})
// + chassis-tier opacities. Resolves the --viz-topology / --viz-recursion
// non-existent token references named in C-d §4.1.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import TokenLadder from "../TokenLadder.vue";
import type { TokenLadderRow } from "../TokenLadder.vue";

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
            label="resolved drift"
            blurb="Pre-V the storybook referenced --viz-topology and --viz-recursion — neither token exists in the canon. This page replaces those references with the canonical chart aliases above. See `foundations/colors.vue` for the full viz-basis set."
        />
    </StoryPage>
</template>
