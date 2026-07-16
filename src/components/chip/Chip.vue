<script setup lang="ts">
import {
    computed,
    type CSSProperties,
    type StyleValue,
    useAttrs,
    watchEffect,
} from "vue";
import { Toggle } from "reka-ui";
import { cn } from "../_shared/class-names";
import { useAccentTone } from "../../composables/color/useAccentTone";
import { chipVariants } from "./chipVariants";
import type { ChipMode, ChipProps } from "./types";

defineOptions({ name: "Chip", inheritAttrs: false });

const props: Readonly<ChipProps> = defineProps<ChipProps>();

const emit = defineEmits<{
    "update:modelValue": [value: boolean];
    remove: [event: MouseEvent];
}>();

const attrs = useAttrs();
const mode = computed<ChipMode>(() => props.mode ?? "static");
const shape = computed(() => props.shape ?? "pill");
const size = computed(() => props.size ?? "md");
const controlAttrs = computed(() =>
    Object.fromEntries(
        Object.entries(attrs).filter(
            ([key]) =>
                key !== "style" &&
                !/^(role|aria-pressed|data-state|name|required)$/i.test(key),
        ),
    ),
);
const staticAttrs = computed(() =>
    Object.fromEntries(
        Object.entries(attrs).filter(
            ([key]) =>
                key !== "style" &&
                !/^on/i.test(key) &&
                !/^(role|tabindex|aria-pressed|data-state|name|required)$/i.test(
                    key,
                ),
        ),
    ),
);
const { toneStyle } = useAccentTone(() => props.tone ?? "var(--primary)");
const chipClass = computed(() =>
    cn(
        chipVariants({
            interactive: mode.value === "selectable" || mode.value === "action",
            shape: shape.value,
            size: size.value,
        }),
        props.class,
    ),
);
const chipStyle = computed<CSSProperties | undefined>(() =>
    props.tone === undefined
        ? undefined
        : ({
              ...toneStyle.value,
              "--glass-fill-tint": props.tone,
              "--glass-fill-strength": "var(--chip-glass-strength, 12%)",
          } as CSSProperties),
);
const mergedStyle = computed<StyleValue>(() => [
    chipStyle.value,
    attrs.style as StyleValue,
]);

watchEffect(() => {
    if (props.mode === "removable" && !props.removeLabel?.trim()) {
        throw new TypeError(
            '[Chip] mode="removable" requires a non-empty removeLabel.',
        );
    }
});
</script>

<template>
    <Toggle
        v-if="mode === 'selectable'"
        v-bind="controlAttrs"
        :model-value="modelValue"
        :default-value="defaultValue"
        :disabled="disabled"
        :class="chipClass"
        :style="mergedStyle"
        :data-mode="mode"
        :data-shape="shape"
        :data-surface="surface"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <slot />
    </Toggle>
    <button
        v-else-if="mode === 'action'"
        v-bind="controlAttrs"
        type="button"
        :disabled="disabled"
        :class="chipClass"
        :style="mergedStyle"
        :data-mode="mode"
        :data-shape="shape"
        :data-surface="surface"
    >
        <slot />
    </button>
    <span
        v-else-if="mode === 'removable'"
        v-bind="staticAttrs"
        :class="chipClass"
        :style="mergedStyle"
        :data-mode="mode"
        :data-shape="shape"
        :data-surface="surface"
        :data-disabled="disabled || undefined"
    >
        <span class="glass-chip__content"><slot /></span>
        <button
            type="button"
            class="glass-chip__remove focus-ring"
            :aria-label="removeLabel"
            :disabled="disabled"
            @click="emit('remove', $event)"
        >
            <span aria-hidden="true">×</span>
        </button>
    </span>
    <span
        v-else
        v-bind="staticAttrs"
        :class="chipClass"
        :style="mergedStyle"
        :data-mode="mode"
        :data-shape="shape"
        :data-surface="surface"
    >
        <slot />
    </span>
</template>
