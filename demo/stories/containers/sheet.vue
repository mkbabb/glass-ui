<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import SheetStage from "./sheet.stage.vue";

type Side = "top" | "right" | "bottom" | "left";

const side = ref<Side>("right");
const detents = ref<"off" | "on">("off");

const SIDES: { value: Side; label: string }[] = [
    { value: "top", label: "Top" },
    { value: "right", label: "Right" },
    { value: "bottom", label: "Bottom" },
    { value: "left", label: "Left" },
];
const DETENTS: { value: "off" | "on"; label: string }[] = [
    { value: "off", label: "Off" },
    { value: "on", label: "On" },
];

const snippet = `<Dialog>
    <DialogTrigger as-child>
        <Button>Edit details</Button>
    </DialogTrigger>
    <SheetContent side="bottom" :detents="[0.4, 0.7, 1]" v-model:detent="rung">
        <DialogHeader>
            <DialogTitle>Details</DialogTitle>
        </DialogHeader>
    </SheetContent>
</Dialog>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <SheetStage :side="side" :detented="detents === 'on'" open-on-load />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="side" label="Edge" :options="SIDES" />
                <StoryVariantRow v-model="detents" label="Detents" :options="DETENTS" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
