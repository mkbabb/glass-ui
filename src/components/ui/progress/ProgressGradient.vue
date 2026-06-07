<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../../../utils";

/**
 * Gradient progress variant — the rail respects `--progress-track`, the indicator
 * respects `--progress-fill` (free-form CSS, including gradients), and the W4
 * lifecycle motion grammar layers on top: an intake pulse on the rising edge, a
 * leading-edge crescendo past 85%, a discharge glow at 100%, and an optional
 * indeterminate sweep. The thin `Progress` dispatcher routes here for
 * `variant="gradient"`.
 */
const props = defineProps<
    ProgressRootProps & {
        class?: HTMLAttributes["class"];
        /**
         * AI.W4-M.1 — indeterminate sweep. When true, the rail runs a slow
         * left-to-right gradient pan (`--motion-duration-progress-indeterminate`, 4s
         * default) and the indicator hides. Reka's ProgressRoot already supports the
         * indeterminate shape via a null modelValue; the prop here is an explicit
         * opt-in for consumers that want the sweep without managing the modelValue
         * lifecycle. PRM retires the sweep to a static rail.
         */
        indeterminate?: boolean;
    }
>();

const delegatedProps = computed(() => {
    const { class: _, indeterminate: _i, ...delegated } = props;
    return delegated;
});

// ── AI.W4-M.1 lifecycle state attr ────────────────────────────────
// `data-lifecycle` is glass-ui's W4 lifecycle hook. reka-ui already emits its own
// `data-state` (`'loading' | 'indeterminate' | 'complete'`) on both the root and
// the indicator — we layer a distinct attribute so the two read paths don't
// collide. The W4 gestalt cares about FOUR phases (idle / loading / progressing /
// complete) rather than reka's three. Indeterminate opts out (its motion story is
// the sweep).
const lifecycleState = computed<"idle" | "loading" | "progressing" | "complete">(() => {
    if (props.indeterminate) return "idle";
    const value = props.modelValue ?? 0;
    if (value <= 0) return "idle";
    if (value >= 100) return "complete";
    if (value < 5) return "loading";
    return "progressing";
});

// `--progress-crescendo` typed CSS variable — typed at the tokens.css §18
// @property registration. Past 85% the leading-edge gradient stop brightens
// proportionally; below 85% the typed variable stays at 0%.
const crescendoStyle = computed(() => {
    if (props.indeterminate) return undefined;
    const value = props.modelValue ?? 0;
    if (value < 85) return { "--progress-crescendo": "0%" };
    const ramp = ((value - 85) / 15) * 100;
    return { "--progress-crescendo": `${Math.min(100, Math.max(0, ramp))}%` };
});
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :class="
            cn(
                'relative h-4 w-full overflow-hidden rounded-pill bg-[var(--progress-track,var(--secondary))] progress-gradient-rail',
                props.class,
            )
        "
        :data-lifecycle="lifecycleState"
        :data-indeterminate="indeterminate || undefined"
    >
        <ProgressIndicator
            class="h-full w-full flex-1 rounded-pill [background:var(--progress-fill,var(--primary))] transition-transform"
            :style="{
                transform: `translateX(-${100 - (props.modelValue ?? 0)}%)`,
                ...(crescendoStyle ?? {}),
            }"
        />
    </ProgressRoot>
</template>

<style scoped>
/* ─────────────────────── AI.W4-M.1 — Progress lifecycle gestalt ───────────────────────

   Three rules layer on the gradient variant to ship the mandate-explicit progress
   motion grammar:

   • Intake pulse — the rail background opacity ramps 0.6 → 1.0 → 0.85 over 220ms
     on the rising-edge of `[data-state="loading"]`. Reads as "the bar woke up".

   • Crescendo — the indicator's leading-edge gradient stop brightens past 85%
     modelValue via the typed `--progress-crescendo` percentage.

   • Discharge glow — at 100% the indicator's leading edge brightens toward 95%
     white via a localized inset box-shadow that decays back to rest.

   • Indeterminate sweep — when `[data-indeterminate]` is set, the rail hosts a 4s
     left-to-right gradient pan; the indicator hides. PRM retires the sweep.
─────────────────────────────────────────────────────────────────────────────── */
.progress-gradient-rail[data-lifecycle="loading"] {
    animation: progress-intake-pulse var(--motion-duration-progress-intake, 220ms)
        var(--motion-ease-standard, ease-out) 1;
}

.progress-gradient-rail[data-lifecycle="complete"] [data-state="complete"] {
    /* Discharge glow targets the indicator. The indicator carries reka's
       `data-state="complete"` when modelValue hits max; the parent rail's
       `data-lifecycle="complete"` gates the rule so a sibling indeterminate sweep
       cannot accidentally trigger the glow. */
    animation: progress-discharge-glow var(--motion-duration-progress-crescendo, 240ms)
        var(--motion-ease-standard, ease-out) 1;
}

.progress-gradient-rail[data-indeterminate] {
    background: linear-gradient(
        90deg,
        var(--progress-track, var(--secondary)) 0%,
        color-mix(
                in srgb,
                var(--progress-fill, var(--primary)) 60%,
                var(--progress-track, var(--secondary))
            )
            50%,
        var(--progress-track, var(--secondary)) 100%
    );
    background-size: 200% 100%;
    animation: progress-indeterminate-sweep
        var(--motion-duration-progress-indeterminate, 4s) linear infinite;
}

.progress-gradient-rail[data-indeterminate] > * {
    /* Hide the indicator while the rail itself paints the sweep. */
    display: none;
}

/* Crescendo — the leading-edge gradient stop brightens past 85%. The indicator
   paints a `linear-gradient` overlay on top of its `--progress-fill` background: a
   transparent body with a white leading-edge cap whose alpha equals
   `--progress-crescendo` (typed `<percentage>`, registered at tokens.css §18).
   Below 85% the typed variable sits at 0% so the overlay is transparent and the
   fill reads at its consumer-declared colour. */
.progress-gradient-rail[data-lifecycle="progressing"] [data-state],
.progress-gradient-rail[data-lifecycle="complete"] [data-state="complete"] {
    background-image: linear-gradient(
        to right,
        transparent 0%,
        transparent 80%,
        color-mix(in srgb, hsl(0 0% 100%) var(--progress-crescendo, 0%), transparent)
            100%
    );
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-blend-mode: screen;
}

@keyframes progress-intake-pulse {
    0% {
        opacity: 0.6;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.85;
    }
}

@keyframes progress-discharge-glow {
    0% {
        box-shadow: inset -0.25rem 0 0.5rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 0%, transparent);
    }
    40% {
        box-shadow: inset -0.25rem 0 0.75rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 95%, transparent);
    }
    100% {
        box-shadow: inset -0.25rem 0 0.5rem -0.125rem
            color-mix(in srgb, hsl(0 0% 100%) 0%, transparent);
    }
}

@keyframes progress-indeterminate-sweep {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .progress-gradient-rail[data-lifecycle="loading"],
    .progress-gradient-rail[data-lifecycle="complete"] [data-state="complete"] {
        animation: none;
    }
    .progress-gradient-rail[data-indeterminate] {
        animation: none;
        background-size: 100% 100%;
        background-position: 0 0;
    }
}
</style>
