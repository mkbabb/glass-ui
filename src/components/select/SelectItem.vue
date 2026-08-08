<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { SelectionValue } from "../_shared/selection";

export interface SelectItemProps {
    value: SelectionValue;
    disabled?: boolean;
    textValue?: string;
    class?: HTMLAttributes["class"];
    hideIndicator?: boolean;
}

export type SelectItemSelectEvent = CustomEvent<{
    originalEvent: PointerEvent | KeyboardEvent;
    value: SelectionValue;
}>;

export interface SelectItemEmits {
    select: [event: SelectItemSelectEvent];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    SelectItem as RekaSelectItem,
    SelectItemIndicator as RekaSelectItemIndicator,
    SelectItemText as RekaSelectItemText,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { rowClass, type MenuRowIndicator } from "../_shared/menu/rowClass";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "SelectItem", inheritAttrs: false });

const props = defineProps<SelectItemProps>();
const emit = defineEmits<SelectItemEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

/* No scalar guard here. `value` is a declared `SelectionValue` prop and reka
 * echoes it straight back on `select` — the guard could only fire if reka handed
 * back something it was never given, which is a reka bug and not a state this
 * component can be in. A throw on an unreachable branch is a landmine, not
 * honesty; the reachable seam (`Select`'s own `update:modelValue`) keeps its. */
function selectItem(
    event: CustomEvent<{
        originalEvent: PointerEvent | KeyboardEvent;
        value?: unknown;
    }>,
): void {
    emit("select", event as SelectItemSelectEvent);
}

// One value owns both the selected mark and its gutter, so neither can exist alone.
const indicator = computed<MenuRowIndicator>(() =>
    props.hideIndicator ? "none" : "start",
);
</script>

<template>
    <RekaSelectItem
        v-bind="forwardedAttrs"
        :value="props.value"
        :disabled="props.disabled"
        :text-value="props.textValue"
        :class="cn(rowClass(indicator), props.class)"
        @select="selectItem"
    >
        <!-- Reka's aria-selected remains the semantic state; this mark is decorative.
             The mark sits on the LOGICAL start edge, inside the `ps-7` gutter the row
             class reserves — so it can never land on top of the label, and an RTL
             listbox mirrors both together. The ink is `currentColor`: the item's own
             `color` IS the consumer's tint handle, so a second name for it
             (`--select-dot-color`) only let two authorities disagree. -->
        <span
            v-if="indicator !== 'none'"
            aria-hidden="true"
            class="absolute start-2 flex h-3.5 w-3.5 items-center justify-center"
        >
            <RekaSelectItemIndicator>
                <span class="inline-block w-2 h-2 rounded-pill bg-current"></span>
            </RekaSelectItemIndicator>
        </span>

        <div class="flex flex-col gap-0.5 min-w-0">
            <RekaSelectItemText>
                <slot />
            </RekaSelectItemText>
            <slot name="description" />
        </div>
    </RekaSelectItem>
</template>
