<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DialogTitle as RekaDialogTitle } from "reka-ui";
import { cn } from "../_shared/class-names";

export interface DialogTitleProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<DialogTitleProps>();
</script>

<template>
    <RekaDialogTitle
        :class="cn('text-subheading leading-none tracking-tight', props.class)"
    >
        <slot />
    </RekaDialogTitle>
</template>
