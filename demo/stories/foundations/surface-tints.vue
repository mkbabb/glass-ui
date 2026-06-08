<script setup lang="ts">
// Surface Tints — the 9-rung tint scale (--surface-tint-{4..25}) + tier
// aliases (--surface-tint-quiet/floating/modal).
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import TokenLadder from "../TokenLadder.vue";
import type { TokenLadderRow } from "../TokenLadder.vue";

const tints: TokenLadderRow[] = [
    { cls: "border-[var(--surface-tint-4)]", label: "--surface-tint-4", hint: "lightest tint" },
    { cls: "border-[var(--surface-tint-6)]", label: "--surface-tint-6" },
    { cls: "border-[var(--surface-tint-8)]", label: "--surface-tint-8" },
    { cls: "border-[var(--surface-tint-10)]", label: "--surface-tint-10" },
    { cls: "border-[var(--surface-tint-12)]", label: "--surface-tint-12" },
    { cls: "border-[var(--surface-tint-15)]", label: "--surface-tint-15" },
    { cls: "border-[var(--surface-tint-18)]", label: "--surface-tint-18" },
    { cls: "border-[var(--surface-tint-22)]", label: "--surface-tint-22" },
    { cls: "border-[var(--surface-tint-25)]", label: "--surface-tint-25", hint: "strongest tint" },
];

const aliases: TokenLadderRow[] = [
    { cls: "border-[var(--surface-tint-quiet)]", label: "--surface-tint-quiet", hint: "→ tint-6" },
    { cls: "border-[var(--surface-tint-floating)]", label: "--surface-tint-floating", hint: "→ tint-12" },
    { cls: "border-[var(--surface-tint-modal)]", label: "--surface-tint-modal", hint: "→ tint-18" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="9-rung tint scale"
            blurb="Surface tints sit between the surface and its border. Each rung is a stop on the warm-cream → cooler-blue saturation curve. Use the canonical `border-[var(--surface-tint-N)]` recipe for the chassis-style hairline accents."
        >
            <ShowcaseFrame pad="lg">
                <TokenLadder
                    :rows="tints"
                    sample-class="size-12 rounded-md border-2 bg-card"
                    sample-text=""
                    layout="stacked"
                />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="tier aliases"
            blurb="Semantic tier aliases name the numeric tint rungs. Use these in component-level styles where the rung is implicit (e.g., `<Card tier='quiet'>` paints with --surface-tint-quiet)."
        >
            <ShowcaseFrame pad="lg">
                <TokenLadder
                    :rows="aliases"
                    sample-class="size-12 rounded-md border-2 bg-card"
                    sample-text=""
                    layout="stacked"
                />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="dark-mode parity"
            blurb="Each tint rung resolves to a different value in dark mode (cooler, denser). Toggle the theme with the Dark Mode Toggle in the demo header — the ladder rungs above shift with it."
        />
    </StoryPage>
</template>
