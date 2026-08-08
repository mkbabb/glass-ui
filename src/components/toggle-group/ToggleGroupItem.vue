<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import type { SelectionValue } from "../_shared/selection";
import { useOptionalToggleGroupContext, type ToggleItemEntry } from "./context";

/* A BOUNDED PILL, and nothing else. The item owns its own silhouette and composes
 * the control chassis for its material — `.control-surface` (fill + border + blur),
 * `.glass-control-edge` (the keyed two-stop warm rim), `.glass-capsule-hover` (the
 * specular catch-light lift + press-snap), `.tap-squish`, `.focus-ring`. It declares
 * ZERO of those values itself: the register owns them, and the item that used to
 * re-declare six of them drifted from the register the moment the register moved
 * (its copied hover rule was missing the `[data-disabled]` guard the real one has).
 *
 * The size and variant axes are GONE from this element. Size is the group's — a row
 * of mismatched pills is not a control — and `variant` painted a trackless `default`
 * that was a bare label wearing a transparent border, with no rest affordance at
 * all. Both had a zero-consumer exported type behind them. */

export interface ToggleGroupItemProps {
    /** Stable identity within the group. The library's ONE scalar. */
    value: SelectionValue;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "ToggleGroupItem" });

const props = defineProps<ToggleGroupItemProps>();

/* The consumer-painted indicator seat. The library supplies the STATE and the
 * MOTION — the slot renders inside the pill, so it inherits the hover lift and the
 * press squish for free — and the consumer supplies the paint. Zero motion authority
 * leaves the library through it, and no library-side indicator geometry comes back
 * in: this is a slot, not a travelling mark. */
defineSlots<{
    default?: () => unknown;
    indicator?: (props: { selected: boolean }) => unknown;
}>();

const el = ref<HTMLElement | null>(null);
const group = useOptionalToggleGroupContext();

/* EITHER disables — never `??`. Vue casts an ABSENT Boolean prop to `false`, not to
 * `undefined`, so a nullish chain (`props.disabled ?? group.disabled.value`) short-
 * circuits on the item's own `false` and a disabled GROUP never reaches its items.
 * Measured on live paint at this cut, not reasoned about: the demo's disabled group
 * rendered `button.disabled === false`, opacity 1, `pointer-events: auto`. It is also
 * the right law read forwards — a group's disabled is not something one item gets to
 * overrule — and the mirror image of D-18's `context?.x ?? props.x` inversion, where
 * the LESS specific declaration won. */
/* BOTH FIELDS READ LIVE. `value: props.value` captured the scalar at setup while the
 * template kept painting `props.value`, so an item whose value changed after mount
 * PAINTED the new identity and COMMITTED the old one — `select(entry.value)` is the
 * write path and it read the frozen copy. A getter satisfies the entry's `readonly
 * value` exactly, matches the shape `disabled` beside it already had, and restores the
 * derived `options` array's reactivity (a computed reading `entry.value` tracks the
 * prop again). */
const entry: ToggleItemEntry = {
    get value() {
        return props.value;
    },
    disabled: () => props.disabled === true || (group?.disabled.value ?? false),
    el: null,
};

onMounted(() => {
    entry.el = el.value;
    group?.register(entry);
});
onBeforeUnmount(() => group?.unregister(entry));

const selected = computed(() => group?.isSelected(props.value) ?? false);
const isDisabled = computed(() => entry.disabled());
</script>

<template>
    <button
        ref="el"
        type="button"
        data-slot="toggle-group-item"
        :class="
            cn(
                'toggle-group__item control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring',
                props.class,
            )
        "
        :data-state="selected ? 'on' : 'off'"
        :disabled="isDisabled || undefined"
        :tabindex="group?.tabindex(entry) ?? 0"
        v-bind="group?.itemAttrs(props.value)"
        @click="group?.select(entry)"
    >
        <slot name="indicator" :selected="selected" />
        <slot />
    </button>
</template>

<style src="./styles.css"></style>
