<script setup lang="ts">
// GlassPanel — five-rung glass tier ladder over a renderer-tier detection
// cascade (svg-filter → css → fallback). The renderer is the headline
// differentiator from <Card>; the variants paint the tier semantically.
import { computed, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GlassPanel, type GlassPanelProps } from "../../../src/subpaths/glass-panel";
// The renderer cluster is component-local (AZ.W-PRUNE2 — off the root barrel, the
// GlassPanel-internal dependency); the story exercises it via the source path.
import {
    useGlassRenderer,
    type GlassTier,
} from "../../../src/composables/glass/useGlassRenderer";
// W12 — stage the five-rung ladder over a shipped high-frequency backdrop so
// the translucency + per-rung tier-alpha reads against busy color (glass does
// not read on flat cream). Aurora is the canonical busy-color substrate.
import { Aurora, DEFAULT_AURORA_CONFIG } from "../../../src/subpaths/aurora";
import { ToggleGroup, ToggleGroupItem } from "../../../src/components/ui/toggle-group";

const variants: GlassPanelProps["variant"][] = [
    "wash",
    "quiet",
    "resting",
    "floating",
    "overlay",
];

const tiers: GlassTier[] = ["svg-filter", "css", "fallback"];

// The tier-force control is a single-select ToggleGroup (W20) — one surface
// (the ladder) mutated, no panel swap, the canonical ToggleGroup case. The
// `"auto"` sentinel maps to `forcedTier = undefined` (renderer auto-detect).
const forcedTierKey = ref<string>("auto");
const forcedTier = computed<GlassTier | undefined>(() =>
    forcedTierKey.value === "auto" ? undefined : (forcedTierKey.value as GlassTier),
);

const { tier: detectedTier } = useGlassRenderer();
</script>

<template>
    <StoryPage>
        <StorySection
            label="renderer-tier detection"
            blurb="useGlassRenderer probes the host: Chromium SVG-filter → CSS backdrop-filter → fallback. Manual override via the `tier` prop."
        >
            <ShowcaseFrame pad="md">
                <div class="flex flex-wrap items-center gap-4">
                    <code class="fira-code text-mono-caption">
                        detected: {{ detectedTier }}
                    </code>
                    <span class="text-mono-caption text-muted-foreground">force:</span>
                    <!-- W20 — the tier-force control is a single-select
                         ToggleGroup (one surface mutated, no panel swap). -->
                    <ToggleGroup v-model="forcedTierKey" type="single" class="flex-wrap">
                        <ToggleGroupItem value="auto">auto</ToggleGroupItem>
                        <ToggleGroupItem
                            v-for="tier in tiers"
                            :key="tier"
                            :value="tier"
                        >
                            {{ tier }}
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="five-rung ladder"
            blurb="wash · quiet · resting · floating · overlay — the v0.8 5-rung canon. Each variant honours the tier-detection cascade above."
        >
            <!-- W12 — the ladder stages over a shipped Aurora backdrop (busy,
                 high-frequency color) so the per-rung tier-alpha steps read.
                 Aurora paints into the relatively-positioned frame; the grid
                 sits above it. -->
            <div class="relative overflow-hidden rounded-card">
                <Aurora :config="DEFAULT_AURORA_CONFIG" class="absolute inset-0" />
                <div
                    class="relative z-10 grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-5"
                >
                    <GlassPanel
                        v-for="v in variants"
                        :key="v"
                        :variant="v"
                        :tier="forcedTier"
                        class="rounded-card border border-border/40 p-6"
                    >
                        <div class="flex flex-col gap-2">
                            <code class="fira-code text-mono-caption text-foreground">{{ v }}</code>
                            <p class="text-prose text-muted-foreground">tier sample</p>
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
