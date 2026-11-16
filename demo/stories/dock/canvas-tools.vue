<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import CanvasToolsStage from "./canvas-tools.stage.vue";

const snippet = `<GlassDock fit-content collapsed-label="Canvas tools">
    <template #collapsed>
        <PenTool />
        <StatusDot state="online" size="sm" label="Saved" />
    </template>
    <Tooltip v-for="t in tools" :key="t.id">
        <TooltipTrigger as-child>
            <DockControl :aria-label="t.label"><component :is="t.icon" /></DockControl>
        </TooltipTrigger>
        <TooltipContent>{{ t.label }}</TooltipContent>
    </Tooltip>
    <template #persistent-end>
        <DockControl aria-label="Draw" :active="drawing"><Pencil /></DockControl>
    </template>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <CanvasToolsStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
