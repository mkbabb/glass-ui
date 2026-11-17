<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import MenuStage from "./dropdown-menu.stage.vue";

type Mode = "dropdown" | "context";

const mode = ref<Mode>("dropdown");

const MODES: { value: Mode; label: string }[] = [
    { value: "dropdown", label: "Dropdown" },
    { value: "context", label: "Context" },
];

const snippet = `<DropdownMenu>
    <DropdownMenuTrigger as-child>
        <Button>Options</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="text-destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>

<ContextMenu>
    <DropdownMenuTrigger as-child><div class="canvas" /></DropdownMenuTrigger>
    <DropdownMenuContent>…</DropdownMenuContent>
</ContextMenu>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <MenuStage :mode="mode" open-on-load />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="mode" label="Opens by" :options="MODES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
