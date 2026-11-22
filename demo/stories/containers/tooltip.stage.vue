<script setup lang="ts">
// Tooltip's stage: an icon toolbar whose buttons name themselves in tooltips. The page
// opens the first on load; a tooltip never takes focus.
import { Bold, Italic, Underline } from "@lucide/vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { Button } from "@glass/components/button";

withDefaults(defineProps<{ openOnLoad?: boolean }>(), { openOnLoad: false });

const TOOLS = [
    { label: "Bold", keys: "⌘B", icon: Bold },
    { label: "Italic", keys: "⌘I", icon: Italic },
    { label: "Underline", keys: "⌘U", icon: Underline },
];
</script>

<template>
    <TooltipProvider :delay-duration="150">
        <div class="tooltip-stage" role="toolbar" aria-label="Text style">
            <Tooltip
                v-for="(tool, i) in TOOLS"
                :key="tool.label"
                :default-open="openOnLoad && i === 0"
            >
                <TooltipTrigger as-child>
                    <Button emphasis="quiet" size="lg" icon-only :aria-label="tool.label">
                        <component :is="tool.icon" aria-hidden="true" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{{ tool.label }} {{ tool.keys }}</TooltipContent>
            </Tooltip>
        </div>
    </TooltipProvider>
</template>

<style scoped>
.tooltip-stage {
    display: flex;
    gap: var(--sp-2);
}
</style>
