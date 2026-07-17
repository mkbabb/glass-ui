<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface SelectTriggerProps {
    disabled?: boolean;
    class?: HTMLAttributes["class"];
    /** Shared control surface or paint-free trigger. */
    variant?: "default" | "ghost";
    /** Trigger height register. */
    size?: "sm" | "default";
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    SelectIcon as RekaSelectIcon,
    SelectTrigger as RekaSelectTrigger,
} from "reka-ui";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "SelectTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<SelectTriggerProps>(), {
    variant: "default",
    size: "default",
});

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { reference: _reference, ...forwarded } = fixedHostAttrs(attrs);
    return forwarded;
});

// The trigger composes the SHARED control register over the warm
// field: `.control-surface` (the bg/border REST register, control-surfaces.css) +
// `.glass-control-edge` (the keyed two-stop warm rim, select.css — fixes the
// box-shadow:none cream-on-cream melt so the trigger reads as a lifted glass plate
// with a defined warm edge over the field) + `.glass-capsule-hover` (the SHIPPED
// specular-lift hover/press step, glass-capsule.css — the "ready to open" lift the
// flat cream pill lacked). The ghost variant stays transparent/no-edge.
const variantClass = computed(() =>
    props.variant === "ghost"
        ? "bg-transparent border-none shadow-none"
        : "control-surface glass-control-edge glass-capsule-hover",
);

// The trigger height rides the `--control-h-*` comfort cohort.
const sizeClass = computed(() => {
    switch (props.size) {
        case "sm":
            return "h-(--control-h-sm)";
        default:
            return "h-(--control-h-md)";
    }
});
</script>

<template>
    <RekaSelectTrigger
        data-slot="select-trigger"
        v-bind="forwardedAttrs"
        :disabled="props.disabled"
        :class="
            cn(
                variantClass,
                sizeClass,
                // The aria-invalid ring reads the SHARED --invalid-ring
                // token (the --focus-ring-shadow sibling), no inline 35% re-spell. Per the
                // §Divergence-decisions table: the ring is UNIFIED onto the .input-pill
                // FOCUS-GATE (`focus-visible:aria-invalid:`) so a long form is not a wall of
                // always-on red rings, and the trigger group widens to the three-member set
                // (`:user-invalid`/fallback/`[aria-invalid]`) wherever the styleable node
                // supports it. The at-rest destructive border stays so an invalid select
                // reads before focus (the non-ring supplementary cue, off the SAME token).
                'tap-squish focus-ring flex w-full items-center justify-between rounded-pill px-3 py-2 text-dropdown placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled [&>span]:line-clamp-1 transition-control aria-invalid:border-(--destructive) user-invalid:border-(--destructive) focus-visible:aria-invalid:shadow-(--invalid-ring) focus-visible:user-invalid:shadow-(--invalid-ring)',
                props.class,
            )
        "
    >
        <slot />
        <RekaSelectIcon as-child>
            <!-- The chevron rides the ONE `transition-disclosure`
           register (btn.css): the `rotate` longhand on the spring's own settle clock
           `--spring-snappy-duration` + the weighty `--ease-cartoon-punch` arrival, PRM
           re-aliased to non-overshoot. Folded onto the shared register so the
           Accordion + Configurator
           carets settle on the SAME clock+curve (one register, no re-declaration). -->
            <ChevronDown
                class="transition-disclosure in-data-[state=open]:rotate-180 h-4 w-4 shrink-0 opacity-(--select-chevron-opacity)"
            />
        </RekaSelectIcon>
    </RekaSelectTrigger>
</template>
