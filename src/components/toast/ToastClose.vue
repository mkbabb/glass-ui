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
                // The CORNER-STRADDLING form (IOS27-ARCHIVE §3, adjudicated by CWT
                // O-10): centre on the corner point, ~70% of the disc floating free,
                // flat and opaque, no ring and no glass. §3 keeps two grammars and never
                // mixes them — corner-straddling opaque for destructive removal, inset
                // and chromeless for a content-owned dismissal — and a toast's × is the
                // first. The always-visible mark replaces the hover-revealed ghost: an
                // affordance that only exists under a pointer has no existence at all on
                // touch, which is where notifications are dismissed.
                'glass-corner-affordance focus-ring',
                props.class,
            )
        "
    >
        <X class="h-3 w-3" aria-hidden="true" />
    </RekaToastClose>
</template>
