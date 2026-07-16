<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ToastTitle as RekaToastTitle } from "reka-ui";
import { cn } from "../_shared/class-names";

export interface ToastTitleProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<ToastTitleProps>();
</script>

<template>
    <RekaToastTitle :class="cn('text-sm font-semibold', props.class)">
        <slot />
    </RekaToastTitle>
</template>
