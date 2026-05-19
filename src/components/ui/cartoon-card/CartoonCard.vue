<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "../../../utils";
import { useStalePropWarning } from "../_shared/useStalePropWarning";

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

// invariant 31 — dev-WARN on stale prop names. CartoonCard is the
// replacement primitive for the retired `<Card variant="cartoon">`; a
// consumer mid-migration who keeps `variant=`/`flush` would have it
// silently swallowed. Production builds are silent.
useStalePropWarning("CartoonCard");
</script>

<template>
    <Primitive
        data-slot="cartoon-card"
        :as="as ?? 'div'"
        :as-child="asChild"
        :class="
            cn(
                'glass-cartoon rounded-card text-card-foreground scrollbar-hidden transition-shadow',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
