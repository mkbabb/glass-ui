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
import { computed, type Component } from "vue";

const props = withDefaults(
    defineProps<{
        /** Root element tag. Default `"span"`. */
        as?: string | Component;
    }>(),
    { as: "span" },
);

// A bare <span> grip is presentational to AT. When the default span tag is
// used, expose an interactive role + tab stop so the consumer's
// `:aria-label="'Reorder ' + name"` lands on a role that allows the
// accessible-name attr (closes axe `aria-prohibited-attr` — AN.W4.B). When the
// consumer overrides `as` with a natively-interactive element (e.g. `button`),
// the host tag already carries the role, so we emit neither.
const interactive = computed(() => props.as === "span");
</script>

<template>
    <component
        :is="as"
        class="sortable-handle"
        data-sortable-handle
        :role="interactive ? 'button' : undefined"
        :tabindex="interactive ? 0 : undefined"
    >
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
