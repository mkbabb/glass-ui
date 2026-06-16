<script setup lang="ts">
// Overlays & Scrims — the ModalOverlay + scrim ladder + popover offset
// + motion offsets.
//
// BA.W-STAGE scope 7 (FD-FS-1/FD-FS-3) — the scrim tour reads against a VIVID
// reference field. A scrim is a translucent DIM; over a same-tone `bg-card` plate
// the dim has nothing to dim and reads as nothing. The three scrim weights now
// paint over a vivid gradient field (`.scrim-stage`) so each weight's dim reads as
// the backdrop-darkening it IS.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import TokenLadder from "../TokenLadder.vue";
import type { TokenLadderRow } from "../TokenLadder.vue";

const scrims: { cls: string; label: string; hint: string }[] = [
    {
        cls: "bg-[var(--overlay-scrim-subtle)]",
        label: "--overlay-scrim-subtle",
        hint: "lightest dim — popover hosts",
    },
    {
        cls: "bg-[var(--overlay-scrim)]",
        label: "--overlay-scrim",
        hint: "default modal scrim",
    },
    {
        cls: "bg-[var(--overlay-scrim-strong)]",
        label: "--overlay-scrim-strong",
        hint: "destructive / confirm flows",
    },
];

const motionOffsets: TokenLadderRow[] = [
    { cls: "", label: "--motion-slide-sm", hint: "subtle slide-in distance" },
    { cls: "", label: "--motion-slide-md", hint: "default slide-in distance" },
    { cls: "", label: "--motion-slide-lg", hint: "broad slide-in distance" },
    { cls: "", label: "--lift-sm", hint: "card hover lift" },
    { cls: "", label: "--lift-md", hint: "elevated hover lift" },
    { cls: "", label: "--lift-lg", hint: "modal-rise lift" },
    { cls: "", label: "--popover-offset", hint: "popover gap from anchor" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="three scrim weights"
            blurb="The <ModalOverlay> primitive is one shared scrim surface. The three weights below paint OVER a vivid reference stage so each dim reads as the backdrop-darkening it is — not over a same-tone plate where the dim has nothing to dim."
        >
            <div class="scrim-grid">
                <div v-for="row in scrims" :key="row.label" class="scrim-cell">
                    <div class="scrim-stage">
                        <div class="scrim-overlay" :class="row.cls" />
                    </div>
                    <code class="fira-code text-mono-caption text-foreground break-all">
                        {{ row.label }}
                    </code>
                    <span class="text-mono-caption text-muted-foreground">
                        {{ row.hint }}
                    </span>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="motion + lift offsets"
            blurb="Slide-in distances and hover-lift offsets — the canonical numeric rungs that drive the popover/dialog/dropdown enter/exit transitions."
        >
            <ShowcaseFrame pad="lg">
                <TokenLadder
                    :rows="motionOffsets"
                    sample-class="size-3 rounded-full bg-primary"
                    sample-text=""
                    layout="stacked"
                />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="ModalOverlay primitive"
            blurb="One <ModalOverlay> SFC backs the dialog, sheet, and confirm scrims, reading from --overlay-scrim. Compose `<ModalOverlay tier='strong' />` for the destructive variant."
        />
    </StoryPage>
</template>

<style scoped>
/* The dense scrim grid (BA.W-STAGE scope 7). */
.scrim-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
    gap: 1rem;
}

.scrim-cell {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    min-width: 0;
}

/* The vivid reference stage — a bright multi-hue gradient so a translucent scrim
   dim reads as the darkening it is (the FD-FS-1 contrast field). The section-color
   stops are demo-local references, not a brand mint. */
.scrim-stage {
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--border);
    background:
        radial-gradient(ellipse 80% 90% at 20% 25%, var(--section-color-0) 0%, transparent 60%),
        radial-gradient(ellipse 80% 90% at 80% 70%, var(--section-color-7) 0%, transparent 60%),
        linear-gradient(135deg, var(--section-color-3), var(--section-color-10));
}

/* The scrim painted OVER the vivid stage — the dim reads. */
.scrim-overlay {
    position: absolute;
    inset: 0;
}
</style>
