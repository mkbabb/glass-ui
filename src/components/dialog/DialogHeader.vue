<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
    <!-- Layout is authored in `dialog/styles.css` off the named space rungs; the
         `sm:`-gated alignment flip is gone (a per-viewport alignment flip is on no
         series) and so is the `gap-y-1.5` literal. -->
    <div data-slot="dialog-header" :class="cn(props.class)">
        <slot />
    </div>
</template>
