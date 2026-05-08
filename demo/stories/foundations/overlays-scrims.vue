<script setup lang="ts">
// Overlays & Scrims — the V.W3 ModalOverlay + scrim ladder + popover offset
// + motion offsets. Closes the foundations-deck drift named in C-d §4.1.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import TokenLadder from "../TokenLadder.vue";
import type { TokenLadderRow } from "../TokenLadder.vue";

const scrims: TokenLadderRow[] = [
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
            blurb="The V.W3 <ModalOverlay> primitive collapses 3 scrim declarations onto a shared SFC. The three weights below paint behind dialogs, sheets, and confirm flows respectively."
        >
            <ShowcaseFrame pad="lg">
                <TokenLadder
                    :rows="scrims"
                    sample-class="size-12 rounded-md border border-border"
                    sample-text=""
                    layout="stacked"
                />
            </ShowcaseFrame>
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
            blurb="V.W3 collapsed AlertDialogOverlay, DialogOverlay, and SheetOverlay onto a shared <ModalOverlay> SFC reading from --overlay-scrim. Consumers compose `<ModalOverlay tier='strong' />` for the destructive variant."
        />
    </StoryPage>
</template>
