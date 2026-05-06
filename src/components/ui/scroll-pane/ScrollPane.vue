<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "@utils";

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
</script>

<template>
    <Primitive
        data-slot="scroll-pane"
        :as="as"
        :as-child="asChild"
        :class="
            cn(
                'glass-wash rounded-xl text-card-foreground scrollbar-hidden overflow-auto',
                '[&::after]:hidden transition-shadow',
                shadow && 'shadow-[var(--shadow-card)]',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
