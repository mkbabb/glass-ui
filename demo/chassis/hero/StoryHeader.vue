<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@glass/components/_shared/class-names";

const props = defineProps<{
    /** Concise supporting text beneath the page title. */
    blurb?: string | null;
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div :class="cn('story-header-cluster', props.class)">
        <slot />
        <p
            v-if="blurb"
            class="story-header-blurb text-small max-w-prose text-muted-foreground"
        >
            {{ blurb }}
        </p>
    </div>
</template>
