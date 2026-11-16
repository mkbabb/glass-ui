<script setup lang="ts">
import { ref } from "vue";
import { Circle, Sparkles } from "@lucide/vue";
import { Chip } from "@glass/components/chip";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ChipStage from "./chip.stage.vue";

// A removed chip fades out in place, then fades back after a pause; its seat is kept so
// nothing beside it moves.
const removed = ref(false);
let timer = 0;
function remove(): void {
    removed.value = true;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (removed.value = false), 1600);
}

const snippet = `<Chip v-model="fourier" mode="selectable" tone="var(--viz-fourier)">
    Fourier
</Chip>
<Chip mode="removable" remove-label="Remove filter" @remove="remove">
    Draft
</Chip>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ChipStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Kinds">
                    <Chip>Static</Chip>
                    <Chip mode="action">Run</Chip>
                    <Chip mode="selectable" disabled>Disabled</Chip>
                    <span class="chip-seat" :data-removed="removed || undefined" :inert="removed">
                        <Chip mode="removable" remove-label="Remove the draft filter" @remove="remove">
                            Draft
                        </Chip>
                    </span>
                </StoryVariantRow>
                <StoryVariantRow label="Shapes">
                    <Chip shape="pill">Pill</Chip>
                    <Chip shape="cell">
                        <Circle class="size-5" aria-hidden="true" />
                        <span>Cell</span>
                    </Chip>
                    <Chip shape="icon" aria-label="Icon">
                        <Sparkles class="size-4" aria-hidden="true" />
                    </Chip>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.chip-seat {
    display: inline-flex;
    transition:
        opacity var(--duration-fast, 160ms) var(--ease-out),
        scale var(--duration-fast, 160ms) var(--ease-out);
}
.chip-seat[data-removed] {
    opacity: 0;
    scale: 0.92;
}
</style>
