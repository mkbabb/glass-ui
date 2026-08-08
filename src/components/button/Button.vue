<script setup lang="ts">
// BK #80 W-BUTTON — the command. KEEP + RE-SEAT (CWT-3 §LANE button §1).
//
// ONE MATERIAL OWNER. The host composes `.glass-capsule` (the ONE backdrop owner)
// and `.glass-specular-track` (the ONE `::before` gleam seat). It never composed a
// ladder rung and a capsule at once again: two plate classes on one element is two
// materials arguing, and the loser's border/shadow/backdrop die on the cascade with
// nobody able to read which one paints. The gleam seat is `.glass-specular-track`
// rather than a ladder rung because material.css transitions the track's `::before`
// UNQUALIFIED while every ladder rung's is `:hover`/`:active`-scoped — a scoped
// transition ceases to exist the instant the pointer leaves, so a rung-seated gleam
// fades in over 240ms and snaps out in 0.
//
// THREE STATES THAT DIFFER. `loading` and `disabled` are not the same fact and no
// longer paint the same: a loading command is FOCUSABLE, reports `aria-busy`, shows
// the library's ONE work-in-flight mark, and blocks activation through the guard —
// it does not write native `disabled`, which would take it out of the tab order and
// make `cursor: progress` unreachable behind `pointer-events: none`.

import {
    computed,
    ref,
    useAttrs,
    watchEffect,
    type ButtonHTMLAttributes,
    type CSSProperties,
    type ComponentPublicInstance,
    type HTMLAttributes,
} from "vue";
import { Primitive } from "reka-ui";
import type { Size, Tone } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import type { PrimitiveProps } from "../_shared/primitive";
import DotRing from "../_shared/feedback/DotRing.vue";
import { vSpecular } from "../../composables/glass";
import { asElement } from "../../composables/motion/core/asElement";
import { useLiquidPress } from "../../composables/motion/spring/useLiquidPress";

export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
/**
 * The command's intent axis, a RESTRICTION of the one `Tone` union (the sub-range
 * law). A command is neutral or it is destructive; `success`/`warning`/`info` are
 * message tones and live on Alert/Toast, where a surface reports rather than acts.
 */
export type ButtonTone = Extract<Tone, "neutral" | "destructive">;

export interface ButtonProps extends PrimitiveProps {
    /** Visual priority. It does not change the command's semantics. */
    emphasis?: ButtonEmphasis;
    /** Semantic intent, orthogonal to emphasis. Tone tints; it never replaces. */
    tone?: ButtonTone;
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

const attrs = useAttrs();

/** Activation is blocked by BOTH states; only `disabled` writes the native attribute. */
const activationBlocked = computed(
    () => props.loading || props.disabled === true || props.disabled === "true",
);
const nativelyDisabled = computed(
    () => props.disabled === true || props.disabled === "true",
);
const nativeButton = computed(() => !props.asChild && props.as === "button");
/**
 * Emphasis alone decides the material. Tone tints the SAME plate (glass stays glass
 * under a destructive command), so the class gate no longer disagrees with the paint:
 * the HEAD form declared a blur on a secondary-destructive whose opaque tone slab made
 * it unseeable by construction.
 */
const glassMaterial = computed(
    () => props.emphasis === "primary" || props.emphasis === "secondary",
);
const interactiveGlass = computed(
    () => glassMaterial.value && !activationBlocked.value,
);
const hostAttrs = computed(() => ({
    type: nativeButton.value ? (props.type ?? "button") : undefined,
    disabled: nativeButton.value ? nativelyDisabled.value : undefined,
    "aria-disabled":
        !nativeButton.value && activationBlocked.value ? "true" : undefined,
}));

// The pressed element itself, so `useLiquidPress` derives its cap off the LIVE
// `--motion-weight` at this host rather than off the static default. The half-wire —
// an option the primitive documents and the one consumer never passed — is gone; a
// silent static path is a fallback masking an unthreaded primitive.
const hostEl = ref<HTMLElement | null>(null);
function captureHost(value: Element | ComponentPublicInstance | null): void {
    hostEl.value = asElement(value as HTMLElement | ComponentPublicInstance | null);
}

const press = useLiquidPress({
    el: hostEl,
    disabled: () => activationBlocked.value,
    pressVar: "--glass-btn-press-t",
});
const hostStyle = computed<CSSProperties>(() => press.pressStyle.value);
const hostClass = computed(() =>
    cn(
        "button tap-squish focus-ring",
        glassMaterial.value && "glass-capsule glass-specular-track",
        props.emphasis === "primary" && "glass-deep",
        interactiveGlass.value && "glass-capsule-hover",
        props.class,
    ),
);

// THE SILENT BREAK GETS A VOICE. Vue hands an unknown prop to the DOM: no error, no
// warning, no paint — so a consumer pinned two majors back reads `variant="glass"` as
// working until the day it adopts. This is a cosmetic failure, so it is LOUD and
// non-fatal (a throw would crash every consumer dev page on adopt) and it is stripped
// from the production bundle with the branch.
if (import.meta.env.DEV) {
    watchEffect(() => {
        const retired: string[] = [];
        if ("variant" in attrs) retired.push(`variant="${String(attrs.variant)}"`);
        const size: string = props.size;
        if (size === "icon" || size === "default") retired.push(`size="${size}"`);
        if (retired.length === 0) return;
        console.error(
            `[glass-ui] <Button> was given ${retired.join(" and ")}, which no longer ` +
                `exists and paints nothing. \`variant\` split into \`emphasis\` ` +
                `("primary" | "secondary" | "quiet" | "text") and \`tone\` ` +
                `("neutral" | "destructive"); \`size="icon"\` is \`icon-only\`; ` +
                `\`size="default"\` is \`size="md"\`.`,
        );
    });
}

/**
 * The guard covers EVERY host, not only the non-native ones. A loading native button
 * carries no `disabled` attribute now, so the browser will happily submit its form;
 * this is what stops it.
 */
function guardDisabledActivation(event: MouseEvent): void {
    if (!activationBlocked.value) return;
    event.preventDefault();
    event.stopImmediatePropagation();
}
</script>

<template>
    <Primitive
        :ref="captureHost"
        v-specular="interactiveGlass"
        :as="as"
        :as-child="asChild"
        data-slot="button"
        :data-emphasis="emphasis"
        :data-tone="tone"
        :data-size="size"
        :data-icon-only="iconOnly || undefined"
        data-control-target=""
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
        <!-- The library's ONE work-in-flight mark (#28 W-FEEDBACK-MOTION). No
             <Transition>: the ring hands off to the label the moment the work ends,
             which is the hand-off the register names, and a <Transition> here would
             schedule a rAF shim this component's contract asserts it leaves none of
             (the EasingPicker precedent). -->
        <DotRing v-if="loading" class="button-mark" />
        <slot />
    </Primitive>
</template>
