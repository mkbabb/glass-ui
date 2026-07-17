<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { ToastClose as RekaToastClose } from "reka-ui";
import { X } from "@lucide/vue";
import { cn } from "../_shared/class-names";

export interface ToastCloseProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<ToastCloseProps>();

const attrs = useAttrs();

// The close button renders a bare decorative <X> glyph, so it
// owes a DEFAULT accessible name (a real consumer-facing defect: reka's
// ToastClose is a <button> with no discernible text). Ship
// a default `aria-label` "Dismiss", OVERRIDABLE — a consumer's own `aria-label`
// falls through via $attrs and this computed reads it, so the consumer value
// wins with zero conflict.
const ariaLabel = computed(
    () => (attrs["aria-label"] as string | undefined) ?? "Dismiss",
);
</script>

<template>
    <RekaToastClose
        :aria-label="ariaLabel"
        :class="
            cn(
                // The shadcn `group-[.destructive]:text-red-300/-red-50`
                // raw-tailwind-palette residual is DELETED (clean break, no legacy). The
                // destructive toast is a colored-GLASS surface whose body
                // ink stays `--foreground`; the close glyph reads the SAME warm ink on
                // every variant (the base `text-foreground/50 hover:text-foreground`),
                // never a palette-red slab-era override.
                'focus-ring absolute right-2 top-2 rounded-button p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 group-hover:opacity-100',
                props.class,
            )
        "
    >
        <X class="h-4 w-4" aria-hidden="true" />
    </RekaToastClose>
</template>
