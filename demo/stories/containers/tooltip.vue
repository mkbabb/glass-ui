<script setup lang="ts">
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@glass/components/tooltip";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TooltipStage from "./tooltip.stage.vue";

const SIDES = [
    { side: "top", label: "Top", icon: ArrowUp },
    { side: "right", label: "Right", icon: ArrowRight },
    { side: "bottom", label: "Bottom", icon: ArrowDown },
    { side: "left", label: "Left", icon: ArrowLeft },
] as const;

const snippet = `<TooltipProvider>
    <Tooltip>
        <TooltipTrigger as-child>
            <Button icon-only aria-label="Bold"><Bold /></Button>
        </TooltipTrigger>
        <TooltipContent>Bold ⌘B</TooltipContent>
    </Tooltip>
</TooltipProvider>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <TooltipStage open-on-load />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Sides">
                    <Tooltip v-for="s in SIDES" :key="s.side">
                        <TooltipTrigger as-child>
                            <Button emphasis="secondary" icon-only :aria-label="s.label">
                                <component :is="s.icon" aria-hidden="true" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent :side="s.side">{{ s.label }}</TooltipContent>
                    </Tooltip>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
