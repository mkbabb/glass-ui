<template>
    <TooltipProvider :delay-duration="250">
        <Tooltip>
            <TooltipTrigger as-child>
                <!--
                    O.W6 Lane D — 44×44 minimum hit-area enforcement
                    (speedtest AC.W6 F2.AA-03 / WCAG 2.5.5 target size).

                    The icon visual stays its natural size (whatever the
                    slotted glyph renders at); this span expands the
                    trigger's hit-area to 44×44 minimum via inline-flex
                    centering + `--icon-tooltip-hit-area` (default 44px).
                    Consumers can shrink the hit-area locally by setting
                    `--icon-tooltip-hit-area: <smaller>` on the parent
                    element (e.g., dense table-row hosts).
                -->
                <span class="icon-tooltip-trigger">
                    <slot />
                </span>
            </TooltipTrigger>
            <TooltipContent class="font-display text-base">{{ text }}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../ui/tooltip";

defineProps<{
    text: string;
}>();
</script>

<style scoped>
.icon-tooltip-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--icon-tooltip-hit-area, 44px);
    min-height: var(--icon-tooltip-hit-area, 44px);
}
</style>
