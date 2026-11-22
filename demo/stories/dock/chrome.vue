<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ChromeStage from "./chrome.stage.vue";

const start = ref<"closed" | "open">("open");
const face = ref<"app" | "page">("app");

const snippet = `<GlassDock ref="dock" collapse="closed" fit-content>
    <template #collapsed><Hexagon /></template>
    <DropdownMenu
        @update:open="(o) => (o ? dock.keepOpen() : dock.release())"
    >
        <DockTrigger for="dropdown">File</DockTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>Export</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <DarkModeToggle size="dock" />
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <ChromeStage :starts-open="start === 'open'" :face="face" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="start"
                    label="On load"
                    :options="[
                        { value: 'open', label: 'Open' },
                        { value: 'closed', label: 'Folded' },
                    ]"
                />
                <StoryVariantRow
                    v-model="face"
                    label="Face"
                    :options="[
                        { value: 'app', label: 'App' },
                        { value: 'page', label: 'Page' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
