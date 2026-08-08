<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface SelectTriggerProps {
    disabled?: boolean;
    class?: HTMLAttributes["class"];
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

/* ONE trigger, one register. `variant="ghost"` and `size="sm"` are gone with no
 * alias: the ghost arm undid the control surface it had just composed (a picker
 * with no edge is not a picker), and the size arm was a second height authority
 * beside the `--control-h-*` comfort cohort every other control reads. A consumer
 * who genuinely wants a different height passes a class. */
defineOptions({ name: "SelectTrigger", inheritAttrs: false });

const props = defineProps<SelectTriggerProps>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { reference: _reference, ...forwarded } = fixedHostAttrs(attrs);
    return forwarded;
});
</script>

<template>
    <!-- The trigger composes the SHARED control register over the warm field:
       `.control-surface` (the bg/border REST register, control-surfaces.css) +
       `.glass-control-edge` (the keyed two-stop warm rim, _shared/field/
       field-surfaces.css — it fixes the `box-shadow: none` cream-on-cream melt, so
       the trigger reads as a lifted glass plate with a defined warm edge over the
       field) + `.glass-capsule-hover` (the shipped specular-lift hover/press step,
       glass-capsule.css — the "ready to open" lift a flat cream pill lacks).
       `cursor-pointer` because this is a `role="combobox"` BUTTON: the rows inside
       are `cursor-default`, the thing you click to open them is not. -->
    <RekaSelectTrigger
        data-slot="select-trigger"
        v-bind="forwardedAttrs"
        :disabled="props.disabled"
        :class="
            cn(
                'control-surface glass-control-edge glass-capsule-hover h-(--control-h-md)',
                // The at-rest destructive border reads before focus; the RING is
                // focus-gated (`focus-visible:aria-invalid:`) so a long form is not a
                // wall of always-on red. Both read the SHARED `--invalid-ring` token —
                // no inline re-spell. The FOCUS ring itself is `.focus-ring`'s
                // outline (base.css), which coexists with the rim rather than
                // replacing it the way a box-shadow ring did.
                'tap-squish focus-ring flex w-full cursor-pointer items-center justify-between rounded-pill px-3 py-2 text-dropdown placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled [&>span]:line-clamp-1 transition-control aria-invalid:border-(--destructive) user-invalid:border-(--destructive) focus-visible:aria-invalid:shadow-(--invalid-ring) focus-visible:user-invalid:shadow-(--invalid-ring)',
                props.class,
            )
        "
    >
        <slot />
        <RekaSelectIcon as-child>
            <!-- The chevron rides the ONE `transition-disclosure` register (btn.css):
               the `rotate` longhand on the spring's own settle clock
               `--spring-present-duration` + the weighty `--ease-cartoon-punch`
               arrival, PRM re-aliased to non-overshoot. One register, so the
               Accordion and Configurator carets settle on the SAME clock and curve. -->
            <ChevronDown
                class="transition-disclosure in-data-[state=open]:rotate-180 h-4 w-4 shrink-0 opacity-(--select-chevron-opacity)"
            />
        </RekaSelectIcon>
    </RekaSelectTrigger>
</template>
