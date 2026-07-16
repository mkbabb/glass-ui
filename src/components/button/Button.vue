<script setup lang="ts">
import {
    computed,
    type ButtonHTMLAttributes,
    type CSSProperties,
    type HTMLAttributes,
} from "vue";
import { Primitive } from "reka-ui";
import type { Size, Tone } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import type { PrimitiveProps } from "../_shared/primitive";
import { vSpecular } from "../../composables/glass";
import { useLiquidPress } from "../../composables/motion/useLiquidPress";

export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;

export interface ButtonProps extends PrimitiveProps {
    /** Visual priority. It does not change the command's semantics. */
    emphasis?: ButtonEmphasis;
    /** Semantic intent, orthogonal to emphasis. */
    tone?: Tone;
    size?: ButtonSize;
    /** Square geometry for an accessibly named icon command. */
    iconOnly?: boolean;
    /** Marks an in-flight command and suppresses activation until it settles. */
    loading?: boolean;
    type?: ButtonHTMLAttributes["type"];
    disabled?: ButtonHTMLAttributes["disabled"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ButtonProps>(), {
    as: "button",
    emphasis: "secondary",
    tone: "neutral",
    size: "md",
    iconOnly: false,
    loading: false,
});

const interactionDisabled = computed(
    () => props.loading || props.disabled === true || props.disabled === "true",
);
const nativeButton = computed(() => !props.asChild && props.as === "button");
const glassMaterial = computed(
    () =>
        props.tone === "neutral" &&
        (props.emphasis === "primary" || props.emphasis === "secondary"),
);
const interactiveGlass = computed(
    () => glassMaterial.value && !interactionDisabled.value,
);
const hostAttrs = computed(() => ({
    type: nativeButton.value ? (props.type ?? "button") : undefined,
    disabled: nativeButton.value ? interactionDisabled.value : undefined,
    "aria-disabled":
        !nativeButton.value && interactionDisabled.value ? "true" : undefined,
}));

const press = useLiquidPress({
    disabled: () => interactionDisabled.value,
    pressVar: "--glass-btn-press-t",
});
const hostStyle = computed<CSSProperties>(() => press.pressStyle.value);
const hostClass = computed(() =>
    cn(
        "button tap-squish focus-ring",
        glassMaterial.value && "glass-wash glass-capsule",
        interactiveGlass.value && "glass-capsule-hover",
        props.class,
    ),
);

function guardDisabledActivation(event: MouseEvent): void {
    if (nativeButton.value || !interactionDisabled.value) return;
    event.preventDefault();
    event.stopImmediatePropagation();
}
</script>

<template>
    <Primitive
        v-specular="interactiveGlass"
        :as="as"
        :as-child="asChild"
        data-slot="button"
        :data-emphasis="emphasis"
        :data-tone="tone"
        :data-size="size"
        :data-icon-only="iconOnly || undefined"
        :data-control-target="iconOnly ? '' : undefined"
        :data-loading="loading || undefined"
        :data-press-armed="press.armed ? '' : undefined"
        :aria-busy="loading || undefined"
        v-bind="hostAttrs"
        :class="hostClass"
        :style="hostStyle"
        @click="guardDisabledActivation"
        @pointerdown="press.handlers.onPointerdown"
        @pointerup="press.handlers.onPointerup"
        @pointercancel="press.handlers.onPointercancel"
        @pointerleave="press.handlers.onPointerleave"
        @pointerenter="press.handlers.onPointerenter"
        @keydown="press.handlers.onKeydown"
        @keyup="press.handlers.onKeyup"
        @blur="press.handlers.onBlur"
    >
        <slot />
    </Primitive>
</template>
