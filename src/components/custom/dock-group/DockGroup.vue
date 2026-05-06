<template>
    <div class="dock-group" :data-density="density ?? null">
        <slot />
    </div>
</template>

<script setup lang="ts">
/**
 * DockGroup — pill-row shelf for dock-tier consumers.
 *
 * Wraps a horizontal cluster of dock primitives (pills, icon buttons, mixed)
 * inside a quieter glass shelf — a delta on top of the surrounding chassis
 * rather than a competing card. The speedtest `<MetricStrip>` pill row is
 * the first consumer; survey + inspector groupings line up behind it.
 *
 * Density is opt-in — `compact` (default) for tighter clusters, `audacious`
 * for chassis-strip rows where the audacious typographic register wants
 * matching shelf padding.
 */
defineProps<{
    density?: "compact" | "audacious";
}>();
</script>
