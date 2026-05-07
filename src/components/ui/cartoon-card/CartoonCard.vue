<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "../../../utils";

/**
 * Cartoon card — sibling primitive replacing the retired `<Card variant="cartoon">`.
 *
 * Resolves through the `.glass-cartoon` utility, which owns its own surface
 * tokens (`--glass-{bg,blur,border}-cartoon` with fall-through to default-tier),
 * border weight (2px), shadow (`--shadow-cartoon`), and hover-lift transition.
 * Cartoon-register surface for the Memphis-leaning compositions; not a glass-tier
 * rung on the wash → overlay ladder.
 */
interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <Primitive
        data-slot="cartoon-card"
        :as="as ?? 'div'"
        :as-child="asChild"
        :class="
            cn(
                'glass-cartoon rounded-xl text-card-foreground scrollbar-hidden transition-shadow',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
