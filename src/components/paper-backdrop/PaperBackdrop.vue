<script setup lang="ts">
import type { HTMLAttributes } from "vue";

export interface PaperBackdropProps {
    /** Additional class names. */
    class?: HTMLAttributes["class"];
}

const props = defineProps<PaperBackdropProps>();
</script>

<template>
    <div
        :class="['paper-underpaint', props.class]"
        data-slot="paper-backdrop"
        aria-hidden="true"
    />
</template>
