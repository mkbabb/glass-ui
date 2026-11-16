<script setup lang="ts">
import { ref } from "vue";
import type { DialogDismiss } from "@glass/components/dialog";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import DialogStage from "./dialog.stage.vue";

type ScrimWeight = "subtle" | "default" | "strong";

const dismiss = ref<DialogDismiss>("free");
const scrim = ref<ScrimWeight>("default");

const DISMISS: { value: DialogDismiss; label: string }[] = [
    { value: "free", label: "Free" },
    { value: "deliberate", label: "Deliberate" },
    { value: "locked", label: "Locked" },
];
const SCRIMS: { value: ScrimWeight; label: string }[] = [
    { value: "subtle", label: "Subtle" },
    { value: "default", label: "Default" },
    { value: "strong", label: "Strong" },
];

const snippet = `<Dialog>
    <DialogTrigger as-child>
        <Button tone="destructive">Delete project</Button>
    </DialogTrigger>
    <DialogContent dismiss="deliberate">
        <DialogHeader>
            <DialogTitle>Delete this project?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
            <DialogClose as-child>
                <Button tone="destructive">Delete</Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <DialogStage :dismiss="dismiss" :scrim="scrim" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="dismiss" label="Dismissal" :options="DISMISS" />
                <StoryVariantRow v-model="scrim" label="Scrim" :options="SCRIMS" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
