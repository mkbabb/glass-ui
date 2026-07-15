<script setup lang="ts" generic="T">
import { toRef, useAttrs, type Ref } from "vue";
import { useSortable, type SortableId } from "./composables/useSortable";
import { provideSortableContext } from "./context";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        /** The reactive list being reordered. */
        items: readonly T[];
        getId: (item: T) => SortableId;
        getLabel?: (item: T) => string;
        label?: string;
        group?: string;
        handleSelector?: string | null;
        axis?: "x" | "y";
    }>(),
    {
        label: "Sortable list",
        handleSelector: "[data-sortable-handle]",
        axis: "y",
    },
);

const attrs = useAttrs();

const emit = defineEmits<{
    reorder: [next: T[]];
    insert: [index: number, item: unknown];
}>();

const itemsRef = toRef(props, "items") as unknown as Ref<readonly T[]>;

const sortable = useSortable<T>({
    items: itemsRef,
    getId: props.getId,
    getLabel: props.getLabel,
    label: props.label,
    group: props.group,
    handleSelector: props.handleSelector,
    axis: props.axis,
    onReorder: (next) => emit("reorder", next),
    onInsert: (index, item) => emit("insert", index, item),
});

provideSortableContext(sortable);

defineExpose({
    isDragging: sortable.isDragging,
    dragId: sortable.dragId,
});
</script>

<template>
    <ul
        :ref="sortable.container.ref"
        v-bind="{ ...attrs, ...sortable.container.dataAttrs }"
        :aria-label="label"
    >
        <slot
            :is-dragging="sortable.isDragging.value"
            :drag-id="sortable.dragId.value"
        />
    </ul>
    <span class="sr-only" aria-live="polite" aria-atomic="true">
        {{ sortable.announcement.value }}
    </span>
</template>

<style>
/* Unscoped so the body-appended drag ghost + the drop-zone
   pseudo-elements (which the row's scoped styles can't reach
   at the ::before / ::after level) pick up these rules. */
.sortable-drag-ghost {
    /* Make the floating clone read as semi-lifted without
       obscuring what's underneath. Rotation adds the same
       "picked up" affordance macOS + Figma use.

       The golden outline + halo match the drop-zone shimmer
       bar's palette so the whole drag reads as a single
       visual system: "this golden thing is moving to this
       golden line." A solid 2px gold ring wraps the clone
       (tight affordance), a soft ~16px gold glow bleeds out
       around it (warmth), then the usual charcoal drop
       shadows sit underneath to lift it off the page. */
    opacity: 0.92;
    box-shadow:
        0 0 0 2px var(--color-gold),
        0 0 18px 2px color-mix(in srgb, var(--color-gold) 55%, transparent),
        0 0 4px 0 color-mix(in srgb, var(--color-gold-light) 70%, transparent),
        0 12px 32px -4px color-mix(in srgb, black 35%, transparent),
        0 4px 12px -2px color-mix(in srgb, black 20%, transparent);
    transform: rotate(1.5deg);
    transition: none !important;
    /* The clone inherits the source's background / border /
       radius via its cloned classes. Don't override them. */
}
.sortable-drag-ghost * {
    /* Kill nested animations inside the clone so it doesn't
       fight with the live rAF loops on the original (e.g.
       sliders, spinners). */
    animation: none !important;
    transition: none !important;
}

.is-sortable-dragging {
    /* The original row during drag: faded but still occupying
       its slot so the list layout doesn't collapse. */
    opacity: 0.35;
}

/* ── Drop-zone indicator ─────────────────────────────────
   A muted golden-shimmer bar at the exact insertion edge.
   Uses the glass-ui `shimmer` keyframe + gold palette (the
   same one that powers `.gold-shimmer` text), dialed down to
   an opacity/blur that reads as a glow rather than a loud
   chrome marquee. The insertion bar renders as a pseudo-
   element on the row carrying the drop-target class so
   consumers don't need to mark up any extra DOM.

   `is-sortable-drop-above` → bar above the row (top edge).
   `is-sortable-drop-below` → bar below the row (bottom edge).
   These are mutually exclusive per the useSortable class
   computation, so only one bar shows at a time.

   The row becomes `position: relative` while carrying either
   class so the absolute pseudo-element anchors to it. The
   SortableItem component's user-select: none rule already
   ensures the bar doesn't interfere with text selection on
   rows that re-enable selection on inner content.
*/
.is-sortable-drop-above,
.is-sortable-drop-below {
    position: relative;
}
.is-sortable-drop-above::before,
.is-sortable-drop-below::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 5px;
    border-radius: 999px;
    /* Muted gold gradient. Same token set as .gold-shimmer
       but with a lower-saturation stop in the middle so the
       sweep reads as a warm glow instead of a metallic
       marquee. Background-size 250% 100% lets the shimmer
       keyframe slide the gradient cleanly. */
    background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--color-gold-dark) 55%, transparent),
        color-mix(in srgb, var(--color-gold-light) 80%, transparent),
        color-mix(in srgb, var(--color-gold) 90%, transparent),
        color-mix(in srgb, var(--color-gold-light) 80%, transparent),
        color-mix(in srgb, var(--color-gold-dark) 55%, transparent)
    );
    background-size: 250% 100%;
    animation: shimmer var(--duration-shimmer, 5s) linear infinite;
    /* Soft halo without resorting to SVG filters. */
    box-shadow:
        0 0 10px color-mix(in srgb, var(--color-gold) 45%, transparent),
        0 0 2px color-mix(in srgb, var(--color-gold-light) 60%, transparent);
    pointer-events: none;
    z-index: 1;
}
.is-sortable-drop-above::before {
    top: -2.5px;
}
.is-sortable-drop-below::after {
    bottom: -2.5px;
}
</style>
