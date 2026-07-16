<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DialogDescription as RekaDialogDescription } from "reka-ui";
import { cn } from "../_shared/class-names";

export interface DialogDescriptionProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<DialogDescriptionProps>();
</script>

<template>
    <RekaDialogDescription :class="cn('text-sm text-muted-foreground', props.class)">
        <slot />
    </RekaDialogDescription>
</template>
