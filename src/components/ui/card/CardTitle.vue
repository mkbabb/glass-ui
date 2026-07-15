<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from '../../_shared/class-names';

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <h3
        data-slot="card-title"
        :class="
            cn(
                'text-heading leading-none tracking-tight',
                props.class,
            )
        "
    >
        <slot />
    </h3>
</template>
