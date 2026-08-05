<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
    <!-- Layout is authored in `dialog/styles.css`. The `sm:`-gated row/gap put the
         destructive action topmost, full-width and flush at ≤640px — a real 0.00 gap on
         the most dangerous target in the plate. It is a row at EVERY viewport now. -->
    <div data-slot="dialog-footer" :class="cn(props.class)">
        <slot />
    </div>
</template>
