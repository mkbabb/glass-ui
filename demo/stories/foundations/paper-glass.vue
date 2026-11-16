<script setup lang="ts">
import { ref } from "vue";
import { Badge } from "@glass/components/badge";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { GlassDock } from "@glass/components/dock";
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
                <StoryVariantRow label="Bare plate">
                    <GlassDock :collapse="false" fit-content aria-label="Theme">
                        <DarkModeToggle size="dock" />
                    </GlassDock>
                    <GlassDock :collapse="false" fit-content aria-label="Result">
                        <Badge variant="secondary">Step 2 of 4</Badge>
                        <Badge>Ready</Badge>
                    </GlassDock>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
