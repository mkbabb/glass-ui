<template>
    <Tooltip>
        <TooltipTrigger as-child>
            <slot />
        </TooltipTrigger>
        <TooltipContent class="font-display text-base">{{ text }}</TooltipContent>
    </Tooltip>
</template>

<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../ui/tooltip";

defineProps<{
    text: string;
}>();
</script>
