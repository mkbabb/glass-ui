<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "../../../utils";
import { useStalePropWarning } from "../_shared/useStalePropWarning";

/**
 * Scroll pane — sibling primitive replacing the retired `<Card variant="pane">`.
 *
 * Tuned for `overflow:auto` content: rests on the lightest tier (`glass-wash`),
 * suppresses the paper-grain `::after` overlay (which conflicts with scroll
 * repaint), and hides scrollbars by default. Consumers cap height with their
 * own `max-h-*` class.
 */
interface Props extends PrimitiveProps {
    /** Drop the `--shadow-card` surface shadow — for panes nested inside a
     *  parent card that already carries one. */
    shadow?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    shadow: true,
    as: "div",
});

// invariant 31 — dev-WARN on stale prop names. ScrollPane is the
// replacement primitive for the retired `<Card variant="pane" flush>`; a
// consumer mid-migration who keeps `variant=`/`flush` would have it
// silently swallowed. Production builds are silent.
useStalePropWarning("ScrollPane");
</script>

<template>
    <Primitive
        data-slot="scroll-pane"
        :as="as"
        :as-child="asChild"
        :class="
            cn(
                'glass-wash rounded-panel text-card-foreground scrollbar-hidden overflow-auto',
                '[&::after]:hidden transition-shadow',
                shadow && 'shadow-[var(--shadow-card)]',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
