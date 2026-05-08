<script setup lang="ts">
// GlassPanel — five-rung glass tier ladder over a renderer-tier detection
// cascade (svg-filter → css → fallback). The renderer is the headline
// differentiator from <Card>; the variants paint the tier semantically.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GlassPanel, type GlassPanelProps } from "../../../src/glass-panel";
import { useGlassRenderer, type GlassTier } from "../../../src/index";

const variants: GlassPanelProps["variant"][] = [
    "wash",
    "quiet",
    "resting",
    "floating",
    "overlay",
];

const tiers: GlassTier[] = ["svg-filter", "css", "fallback"];
const forcedTier = ref<GlassTier | undefined>(undefined);

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
                    <button
                        :class="['rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent', !forcedTier && 'bg-primary text-primary-foreground']"
                        @click="forcedTier = undefined"
                    >
                        auto
                    </button>
                    <button
                        v-for="tier in tiers"
                        :key="tier"
                        :class="['rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent', forcedTier === tier && 'bg-primary text-primary-foreground']"
                        @click="forcedTier = tier"
                    >
                        {{ tier }}
                    </button>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="five-rung ladder"
            blurb="wash · quiet · resting · floating · overlay — the v0.8 5-rung canon. Each variant honours the tier-detection cascade above."
        >
            <div
                class="relative grid grid-cols-1 gap-4 overflow-hidden rounded-card p-8 sm:grid-cols-2 lg:grid-cols-5"
                style="background: radial-gradient(ellipse 80% 70% at 30% 20%, var(--rainbow-pastel-blue, #cce0ff) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 70% 80%, var(--rainbow-pastel-yellow, #ffe9b3) 0%, transparent 55%);"
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
        </StorySection>
    </StoryPage>
</template>
