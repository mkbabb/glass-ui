<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../../ui/hover-card";

export type MathSurfaceMode = "inline" | "display" | "popover";

export interface MathSurfaceProps {
    /** Surface mode. `inline` wraps in `.math-inline-pill`, `display` wraps in
     *  `.math-display`, `popover` wraps content in a `<HoverCard>` with the
     *  `.math-display` content surface. Defaults to `display`. */
    mode?: MathSurfaceMode;
    /** Optional class override forwarded to the surface root. */
    class?: HTMLAttributes["class"];
}

/**
 * <MathSurface> — host pre-rendered KaTeX HTML or any math content.
 *
 * Composes the W2 math typography utilities (`.math-display`,
 * `.math-inline-pill`) with reka-ui-backed `<HoverCard>` for a popover mode.
 * The default slot carries the math content (typically pre-rendered KaTeX,
 * a `<MathFormula>`, or raw math characters); in `popover` mode an optional
 * `#trigger` slot supplies the trigger element, defaulting to a `?` chip.
 */
const props = withDefaults(defineProps<MathSurfaceProps>(), {
    mode: "display",
});

const inlineClasses = computed(() =>
    cn("math-inline-pill", props.class),
);
const displayClasses = computed(() => cn("math-display", props.class));
const popoverContentClasses = computed(() =>
    cn("math-display", props.class),
);
</script>

<template>
    <span v-if="mode === 'inline'" :class="inlineClasses">
        <slot />
    </span>
    <HoverCard v-else-if="mode === 'popover'">
        <HoverCardTrigger as-child>
            <slot name="trigger">
                <button
                    type="button"
                    class="math-surface-trigger"
                    aria-label="Show formula"
                >
                    ?
                </button>
            </slot>
        </HoverCardTrigger>
        <HoverCardContent :class="popoverContentClasses">
            <slot />
        </HoverCardContent>
    </HoverCard>
    <div v-else :class="displayClasses">
        <slot />
    </div>
</template>

<style scoped>
.math-surface-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    padding: 0;
    border-radius: 9999px;
    border: 1px solid color-mix(in srgb, var(--foreground) 16%, transparent);
    background: color-mix(in srgb, var(--cream-warm) 70%, transparent);
    color: var(--muted-foreground);
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.85em;
    line-height: 1;
    cursor: help;
}

.math-surface-trigger:hover {
    color: var(--foreground);
    border-color: color-mix(in srgb, var(--foreground) 28%, transparent);
}
</style>
