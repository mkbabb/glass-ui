<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

export interface RailProps {
    /**
     * Pill = fully rounded (default). Rounded = radius-xl corners for a
     * squarer tool-palette look.
     */
    shape?: "pill" | "rounded";
    /**
     * Stick to the top of the viewport so the rail stays in place while the
     * main column scrolls. Default `false` — caller decides layout.
     */
    sticky?: boolean;
    /** Additional classes merged onto the root. */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<RailProps>(), {
    shape: "pill",
    sticky: false,
});

const shapeClass = computed(() =>
    props.shape === "pill"
        ? "rounded-[var(--radius-pill)]"
        : "rounded-[var(--radius-xl)]",
);
</script>

<template>
    <aside
        :class="
            cn(
                // Layout wrapper around the pill so sticky + padding don't fight the glass surface.
                'flex shrink-0 items-start justify-center px-3 py-4',
                sticky && 'sticky top-0 h-screen',
                props.class,
            )
        "
    >
        <div
            :class="
                cn(
                    'glass-subtle flex w-fit flex-col items-center gap-1 p-2',
                    'max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hidden',
                    shapeClass,
                )
            "
        >
            <slot />
        </div>
    </aside>
</template>
