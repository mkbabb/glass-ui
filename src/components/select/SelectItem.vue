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
import { menuRowClass, type MenuRowIndicator } from "../_shared/menuRowClass";
import { fixedHostAttrs } from "../_shared/primitive";
import { isSelectionValue } from "../_shared/selection";

defineOptions({ name: "SelectItem", inheritAttrs: false });

const props = defineProps<SelectItemProps>();
const emit = defineEmits<SelectItemEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

function selectItem(
    event: CustomEvent<{
        originalEvent: PointerEvent | KeyboardEvent;
        value?: unknown;
    }>,
): void {
    if (!isSelectionValue(event.detail.value)) {
        throw new TypeError("[glass-ui] SelectItem received a non-scalar value.");
    }
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
        :class="cn(menuRowClass(indicator), props.class)"
        @select="selectItem"
    >
        <!-- Reka's aria-selected remains the semantic state; this mark is decorative. -->
        <span
            v-if="indicator !== 'none'"
            aria-hidden="true"
            class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
        >
            <RekaSelectItemIndicator>
                <span
                    class="inline-block w-2 h-2 rounded-pill"
                    style="
                        background-color: var(
                            --select-dot-color,
                            var(--glass-accent, currentColor)
                        );
                    "
                ></span>
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
