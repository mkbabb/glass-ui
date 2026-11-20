<script setup lang="ts">
// The stage's one pause control, in its lower corner. The icon cross-fades.
import { Pause, Play } from "@lucide/vue";
import { Button } from "@glass/components/button";

const paused = defineModel<boolean>("paused", { default: false });
</script>

<template>
    <Button
        emphasis="secondary"
        size="sm"
        icon-only
        class="substrate-pause"
        aria-label="Pause"
        :aria-pressed="paused"
        @click="paused = !paused"
    >
        <Transition name="substrate-pause-icon" mode="out-in">
            <Play v-if="paused" class="size-4" aria-hidden="true" />
            <Pause v-else class="size-4" aria-hidden="true" />
        </Transition>
    </Button>
</template>

<style scoped>
.substrate-pause {
    position: absolute;
    inset-block-end: var(--sp-3);
    inset-inline-start: var(--sp-3);
    z-index: 1;
}

.substrate-pause-icon-enter-active,
.substrate-pause-icon-leave-active {
    transition: opacity var(--duration-fast, 150ms) var(--ease-out);
}

.substrate-pause-icon-enter-from,
.substrate-pause-icon-leave-to {
    opacity: 0;
}
</style>
