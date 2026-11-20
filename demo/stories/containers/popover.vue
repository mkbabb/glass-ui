<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import PopoverStage from "./popover.stage.vue";

type Mode = "press" | "hover" | "card";

const mode = ref<Mode>("press");

const MODES: { value: Mode; label: string }[] = [
    { value: "press", label: "Press" },
    { value: "hover", label: "Hover" },
    { value: "card", label: "Hover card" },
];

const snippet = `<Popover>
    <PopoverTrigger as-child>
        <Button>Dimensions</Button>
    </PopoverTrigger>
    <PopoverContent class="w-72">
        <Label for="w">Width</Label>
        <Input id="w" model-value="8" />
    </PopoverContent>
</Popover>

<Popover trigger="hover">…</Popover>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <PopoverStage :mode="mode" open-on-load />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="mode" label="Opens on" :options="MODES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
