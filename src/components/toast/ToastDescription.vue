<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ToastDescription as RekaToastDescription } from "reka-ui";
import { cn } from "../_shared/class-names";

export interface ToastDescriptionProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<ToastDescriptionProps>();
</script>

<template>
    <RekaToastDescription :class="cn('text-small opacity-90', props.class)">
        <slot />
    </RekaToastDescription>
</template>
