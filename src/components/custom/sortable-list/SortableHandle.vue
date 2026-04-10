<script setup lang="ts">
/**
 * SortableHandle — marks an element as a drag grip.
 *
 * Inside a <SortableItem>, any `[data-sortable-handle]`
 * descendant is the only pointerdown surface that starts a
 * drag. Consumers can either use this component or add the
 * data attribute directly on their own element. Using this
 * wrapper gives you sensible default cursor + touch-action CSS.
 *
 * The default slot renders inside the handle — typically a
 * grip glyph like `⋮⋮`.
 */
import type { Component } from "vue";

withDefaults(
    defineProps<{
        /** Root element tag. Default `"span"`. */
        as?: string | Component;
    }>(),
    { as: "span" },
);
</script>

<template>
    <component :is="as" class="sortable-handle" data-sortable-handle>
        <slot />
    </component>
</template>

<style scoped>
.sortable-handle {
    cursor: grab;
    /* Disable native touch gestures on the grip so pointer
       capture can claim the drag immediately on touch devices
       without the browser intercepting for scroll. */
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.sortable-handle:active {
    cursor: grabbing;
}
</style>
