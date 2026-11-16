<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import CommandStage from "./command.stage.vue";

type Mode = "inline" | "dialog";

const mode = ref<Mode>("inline");

const MODES: { value: Mode; label: string }[] = [
    { value: "inline", label: "Inline" },
    { value: "dialog", label: "In a dialog" },
];

const snippet = `<Command class="glass-floating">
    <CommandInput v-model="query" placeholder="Type a command" />
    <CommandList>
        <CommandEmpty>No commands match.</CommandEmpty>
        <CommandItem value="new" text-value="New file" @select="run">
            New file
            <CommandShortcut>⌘N</CommandShortcut>
        </CommandItem>
    </CommandList>
</Command>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <CommandStage :mode="mode" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="mode" label="Shown" :options="MODES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
