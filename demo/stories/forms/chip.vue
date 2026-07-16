<script setup lang="ts">
import { ref } from "vue";
import { Circle, Sparkles } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Chip } from "@glass/components/chip";

const selected = ref(false);
const removed = ref(false);
const actions = ref(0);
</script>

<template>
    <StoryPage>
        <StorySection
            label="semantics"
            blurb="Mode states the root contract explicitly; shape changes only geometry."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-center gap-3">
                    <Chip>Static</Chip>
                    <Chip shape="icon" tone="var(--section-color-5)">
                        <Sparkles class="size-4" aria-hidden="true" />
                    </Chip>
                    <Chip v-model="selected" mode="selectable" tone="var(--section-color-7)">
                        Selectable
                    </Chip>
                    <Chip mode="selectable" disabled>Disabled</Chip>
                    <Chip mode="action" @click="actions++">Run · {{ actions }}</Chip>
                    <Chip
                        v-if="!removed"
                        mode="removable"
                        remove-label="Remove Fourier filter"
                        @remove="removed = true"
                    >
                        Fourier
                    </Chip>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="geometry"
            blurb="Pill, cell, and icon silhouettes retain the same declared semantics."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-center gap-3">
                    <Chip shape="pill">Pill</Chip>
                    <Chip shape="cell">
                        <Circle class="size-5" aria-hidden="true" />
                        <span>Cell</span>
                    </Chip>
                    <Chip shape="icon">
                        <Circle class="size-4" aria-hidden="true" />
                    </Chip>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
