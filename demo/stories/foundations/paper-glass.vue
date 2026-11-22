<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import PaperGlassStage, { type PaperGlassGround } from "./paper-glass.stage.vue";

const ground = ref<PaperGlassGround>("colour");
const grain = ref<"on" | "off">("on");

const GROUNDS: { value: PaperGlassGround; label: string }[] = [
    { value: "paper", label: "Over paper" },
    { value: "colour", label: "Over colour" },
];
const GRAIN: { value: "on" | "off"; label: string }[] = [
    { value: "on", label: "On" },
    { value: "off", label: "Off" },
];

const snippet = `<template>
    <div class="glass-resting paper-grain-overlay rounded-3xl">
        <slot />
    </div>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <PaperGlassStage :ground="ground" :grain="grain === 'on'" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="ground" label="Ground" :options="GROUNDS" />
                <StoryVariantRow v-model="grain" label="Grain" :options="GRAIN" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
