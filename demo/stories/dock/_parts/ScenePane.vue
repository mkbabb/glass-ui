<script setup lang="ts">
// A plain block standing in for what a dock sits beside in its app: a page column, or
// a figure at 16:9. It carries no copy; it only gives the dock its proportion.
withDefaults(defineProps<{ shape?: "column" | "figure" }>(), { shape: "column" });
</script>

<template>
    <div class="scene-pane" :data-shape="shape" />
</template>

<style scoped>
.scene-pane {
    border-radius: var(--radius-2xl);
    border: 1px solid var(--glass-border-quiet);
    background-color: color-mix(in srgb, var(--card) 72%, transparent);
}

.dark .scene-pane {
    background-color: color-mix(in srgb, var(--foreground) 8%, transparent);
}

.scene-pane[data-shape="column"] {
    inline-size: min(100%, 44rem);
    block-size: 100%;
}

.scene-pane[data-shape="figure"] {
    inline-size: min(100%, 40rem);
    max-block-size: 100%;
    aspect-ratio: 16 / 9;
}
</style>
