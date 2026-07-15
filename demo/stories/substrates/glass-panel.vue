<script setup lang="ts">
// BC.W-GLASS-PRUNE — the MATERIALS gallery. The glass system consolidates to TWO
// registers: Glass MATERIALS (this route) + Glass CARDS (/display/card). This story
// teaches the MATERIALS register — the ONE iOS liquid-glass material expressed as the
// five-rung `.glass-{wash,quiet,resting,floating,overlay}` ladder, shown BARE (composing
// the library CLASSES directly, not a `<GlassPanel>` component) over a LIVE aurora field
// (glass on craft — apple.com's web has no glass-materials gallery; ours floats over a
// breathing field, research/apple-glass.md §3.1). Two modifier AXES toggle live: the
// `.glass-deep` DEPTH axis (the apple-home-nav 16-20px register) and the `.glass-lens`
// REFRACTION axis (the OS-grade squircle feDisplacementMap the web SOTA never shipped).
//
// A developer reading this beside /display/card sees the binary answer to "which glass
// do I reach for?": a bare surface → a `.glass-{rung}` MATERIAL; a content container →
// a `<Card>`. There is no third "panel" thing — the `<GlassPanel>` component is GONE.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Aurora, DEFAULT_AURORA_CONFIG } from "@glass/subpaths/aurora";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";

// The five-rung ladder — the canonical MATERIAL (BC.W-GLASS-IDENTITY owns the values).
// Each rung is visibly more present than the last (alpha-monotonic by design).
const rungs = [
    { cls: "glass-wash", label: "wash", blurb: "~0.30α — sub-perceptual veil" },
    { cls: "glass-quiet", label: "quiet", blurb: "~0.50α — the calm body rung" },
    { cls: "glass-resting", label: "resting", blurb: "~0.65α — the canonical plate" },
    { cls: "glass-floating", label: "floating", blurb: "~0.80α — the lifted overlay" },
    { cls: "glass-overlay", label: "overlay", blurb: "~0.95α — modal-over-modal" },
] as const;

// The two modifier AXES, toggled live (multi-select chips — each is an orthogonal
// decoration ON the rungs, not a register of its own). `.glass-deep` re-points the blur
// to the deep family (the maximal-iOS depth tier); `.glass-lens` adds the squircle
// feDisplacementMap refraction (Chromium-only — WebKit degrades to the blur base, the
// correct cross-engine degrade per research/apple-ios27.md §6).
const axes = ref<string[]>([]);
const deepOn = () => axes.value.includes("deep");
const lensOn = () => axes.value.includes("lens");
</script>

<template>
    <StoryPage>
        <StorySection
            label="Glass MATERIALS — the five-rung ladder"
            blurb="The ONE iOS liquid-glass material, expressed bare as the .glass-{wash·quiet·resting·floating·overlay} ladder over a LIVE aurora. Each rung is visibly more present than the last. Toggle the .glass-deep DEPTH axis (the apple-home-nav register) and the .glass-lens REFRACTION axis (the OS-grade squircle, Chromium; WebKit degrades to blur). For a content container, reach for <Card> (the CARDS register, /display/card) — not a panel."
        >
            <div class="flex flex-wrap items-center gap-4 mb-6">
                <span class="text-mono-caption text-muted-foreground">axes:</span>
                <!-- The two modifier axes — multi-select chips (orthogonal
                     decorations ON the ladder, composed live onto every rung). -->
                <ToggleGroup v-model="axes" type="multiple" class="flex-wrap">
                    <ToggleGroupItem value="deep">.glass-deep</ToggleGroupItem>
                    <ToggleGroupItem value="lens">.glass-lens</ToggleGroupItem>
                </ToggleGroup>
            </div>

            <!-- ONE GL context per route (the one-GL-per-route budget): a SINGLE
                 <Aurora> behind all five rung specimens, never one-per-rung. -->
            <div class="relative overflow-hidden rounded-card">
                <Aurora :config="DEFAULT_AURORA_CONFIG" class="absolute inset-0" />
                <div
                    class="relative z-10 grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-5"
                >
                    <!-- Each specimen is a BARE glass material — the rung CLASS
                         composed with the live-toggled .glass-deep / .glass-lens
                         axes. No <GlassPanel> component; this IS the material. -->
                    <div
                        v-for="rung in rungs"
                        :key="rung.cls"
                        :class="[
                            rung.cls,
                            { 'glass-deep': deepOn(), 'glass-lens': lensOn() },
                            'rounded-card p-6',
                        ]"
                    >
                        <div class="flex flex-col gap-2">
                            <code class="fira-code text-mono-caption text-foreground">
                                .{{ rung.cls }}
                            </code>
                            <p class="text-prose text-muted-foreground">{{ rung.blurb }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
