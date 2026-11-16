<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StageSwap from "../../chassis/variants/StageSwap.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ScrollStage from "./scroll.stage.vue";

const mode = ref<"bar" | "rim" | "reveal">("rim");

const snippet = `<script setup>
import { ref } from "vue";
import { ScrollProgressRim } from "@mkbabb/glass-ui/scroll-progress-rim";

const progress = ref(0);
const onScroll = ({ target: el }) =>
    (progress.value = el.scrollTop / (el.scrollHeight - el.clientHeight));
<\/script>

<template>
    <div class="relative">
        <div class="h-80 overflow-y-auto" @scroll="onScroll"><slot /></div>
        <ScrollProgressRim :value="progress" />
    </div>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <StageSwap :swap-key="mode">
                    <ScrollStage :mode="mode" />
                </StageSwap>
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="mode"
                    label="Progress"
                    :options="[
                        { value: 'bar', label: 'Bar' },
                        { value: 'rim', label: 'Rim' },
                        { value: 'reveal', label: 'Reveal' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
