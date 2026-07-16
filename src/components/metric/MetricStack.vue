<script setup lang="ts">
import { cn } from "../_shared/class-names";
import type { MetricStackProps } from "./types";

defineOptions({ name: "MetricStack" });

withDefaults(defineProps<MetricStackProps>(), { density: "default" });
</script>

<template>
    <div :class="cn('metric-stack', $props.class)" :data-density="density">
        <slot />
    </div>
</template>
