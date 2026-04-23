<script setup lang="ts">
import { cn } from "@/utils/cn";

defineProps<{
    /** Additional classes merged onto the root element. */
    class?: string;
}>();
</script>

<template>
    <span
        :class="
            cn(
                'inline-flex items-baseline gap-[0.2em] leading-none tracking-tight select-none',
                $props.class,
            )
        "
        aria-label="glass-ui"
    >
        <span
            aria-hidden="true"
            class="font-display italic text-[1.35em] leading-none text-viz-fourier"
            style="font-variation-settings: 'WONK' 1, 'SOFT' 0; font-optical-sizing: auto"
        >
            &#x2131;
        </span>
        <span class="font-serif text-[1em] tracking-tight text-foreground/90">glass-ui</span>
    </span>
</template>
