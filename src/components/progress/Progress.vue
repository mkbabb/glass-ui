<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { ProgressIndicator, ProgressRoot } from "reka-ui";
import { resolveValueFraction, resolveValueMarks } from "../_shared/field/valueDomain";
import type { ProgressProps } from "./types";

const props = withDefaults(defineProps<ProgressProps>(), {
    modelValue: 0,
    variant: "default",
    status: "default",
    orientation: "horizontal",
    size: "md",
    marks: () => [],
});

/* `modelValue` is delegated EXPLICITLY (rounded), never forwarded raw — reka
   passes the value straight into `aria-valuenow`, and a float domain landed
   14 digits in the AT's ear. */
const delegatedProps = computed(() => {
    const {
        class: _class,
        modelValue: _modelValue,
        variant: _variant,
        status: _status,
        orientation: _orientation,
        size: _size,
        valueText: _valueText,
        marks: _marks,
        ...delegated
    } = props;
    return delegated;
});

/* ONE door into indeterminate: reka's own. `ProgressRoot` types
   `modelValue: number | null`, derives its `progressState` from nullish and
   corrects invalid input TO null — so an explicit `null` IS the contract. The
   boolean prop that used to sit in front of it translated itself into null
   before reka ever saw it; it was a costume over the substrate's own door. */
const isIndeterminate = computed(() => props.modelValue == null);
const max = computed(() => props.max ?? 100);
const fraction = computed(() =>
    isIndeterminate.value ? 0 : resolveValueFraction(props.modelValue, 0, max.value),
);
/* Marks under indeterminate are emptied SILENTLY. The library's only prop-shape
   `throw` used to fire here — a decorative checkpoint is not a crash. */
const marks = computed(() =>
    isIndeterminate.value ? [] : resolveValueMarks(props.marks, 0, max.value),
);

/* ≤2dp before reka. The domain is the consumer's; the ANNOUNCEMENT is ours. */
const announcedValue = computed(() =>
    props.modelValue == null ? null : Math.round(props.modelValue * 100) / 100,
);
const percentText = computed(() => `${Math.round(fraction.value * 100)}%`);
const valueText = computed(() => {
    if (isIndeterminate.value) return props.valueText ?? "in progress";
    if (props.status === "error") return `failed at ${percentText.value}`;
    return props.valueText ?? percentText.value;
});
/* The NAME channel carries a name, never the value. reka's `getValueLabel`
   defaults to `"N%"` — the value wearing the name's cargo, announced twice. A
   consumer names its bar; an unnamed bar stays honestly unnamed. */
const noValueLabel = () => undefined;
const readValueText = () => valueText.value;

const rootStyle = computed(
    () => ({ "--progress-value-percent": `${fraction.value * 100}%` }) as CSSProperties,
);
const railClass = computed(() => ({
    "track-flow": isIndeterminate.value,
}));
const indicatorClass = computed(() => ({
    "glass-liquid-fill": props.variant === "liquid",
    "progress-liquid-fill": props.variant === "liquid",
}));
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :model-value="announcedValue"
        :get-value-text="readValueText"
        :get-value-label="noValueLabel"
        class="progress-rail track-well"
        :class="[railClass, props.class]"
        :data-variant="props.variant"
        :data-status="props.status"
        :data-size="props.size"
        :data-orientation="props.orientation"
        :data-indeterminate="isIndeterminate || undefined"
        :aria-invalid="props.status === 'error' || undefined"
        :style="rootStyle"
    >
        <span
            v-if="marks.length"
            class="glass-value-marks"
            aria-hidden="true"
            :data-orientation="props.orientation === 'vertical' ? 'vertical' : undefined"
        >
            <span
                v-for="mark in marks"
                :key="mark.value"
                class="glass-value-mark"
                :data-consumed="mark.position <= fraction || undefined"
                :style="{ '--value-mark-position': `${mark.position * 100}%` }"
            />
        </span>
        <ProgressIndicator class="progress-value-fill" :class="indicatorClass" />
    </ProgressRoot>
</template>

<style scoped>
/* The recessed GROOVE (position/overflow/pill-radius/recess ink) is COMPOSED
   from the shared `.track-well` register (template class); the rail owns only
   its SIZING (block meter) + its OWN typed background here.

   The consumer knob is `--glass-progress-track-background` — a BACKGROUND
   grammar, the sibling's name shape, still a distinct property so a Slider
   background image and a Progress ground never collide on one inheriting knob.
   Its predecessor `--glass-progress-track-color` was a `<color>`-only grammar
   enforced by a source grep that cannot see a consumer; it shipped with 0
   writers in 7 repos and died at birth, no alias. The knob is READ here (never
   assigned onto `.progress-rail`, which would mask an inherited ancestor
   override); the fallback is the ONE host-relative groove derivation. */
.progress-rail {
    display: block;
    inline-size: 100%;
    block-size: var(--progress-rung);
    background: var(--glass-progress-track-background, var(--track-well-recess));
}

/* The size axis. Three rungs off the shared generator (4·8·12·20·32·52); md is
   the family's shared 12. The axis was inert for two majors: three undeclared
   knobs behind literal fallbacks painted 16/16/16 under a `SIZES` heading. */
.progress-rail[data-size="sm"] {
    --progress-rung: 0.5rem;
}
.progress-rail[data-size="md"] {
    --progress-rung: 0.75rem;
}
.progress-rail[data-size="lg"] {
    --progress-rung: 1.25rem;
}

/* Coarse pointers transpose one rung down — a meter is a reporting substrate,
   not a target, so the small viewport spends its block on content. */
@media (max-width: 768px) {
    .progress-rail[data-size="md"] {
        --progress-rung: 0.5rem;
    }
    .progress-rail[data-size="lg"] {
        --progress-rung: 0.75rem;
    }
}

.progress-rail[data-orientation="vertical"] {
    inline-size: var(--progress-rung);
    /* A bare vertical mount with a container-driven length collapses to zero.
       The default length is stated; a consumer overrides it with a class. */
    block-size: 12rem;
}

.progress-rail[data-status="error"] {
    --progress-fill: var(--destructive);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--destructive) 48%, transparent);
}

/* The value MARKS (`.glass-value-marks`/`.glass-value-mark`) are COMPOSED from the
   shared value-marks register — the horizontal/vertical/RTL dot geometry lives ONCE
   there, and so does the family's one `[data-consumed]` swallow law. */

.progress-value-fill {
    position: relative;
    z-index: 1;
    display: block;
    inline-size: 100%;
    block-size: 100%;
    border-radius: inherit;
    background: var(--progress-fill, var(--primary));
    transform: translateX(calc(-100% + var(--progress-value-percent)));
    /* TRAVEL rides the dock spring — the coordinated-travel row every indicator
       in the library shares. `dock` peaks 0.97712 and is MONOTONE: an
       overshooting fill would paint >100% of an asserted quantity, which is why
       `snappy` (peak 1.03153) is refused on a meter. A continuously-fed bar
       therefore trails its announced value by ≤ the 0.22s settle. */
    transition: transform var(--spring-dock-duration) var(--spring-dock);
}

.progress-rail:dir(rtl) .progress-value-fill {
    transform: translateX(calc(100% - var(--progress-value-percent)));
}

.progress-rail[data-orientation="vertical"] .progress-value-fill {
    transform: translateY(calc(100% - var(--progress-value-percent)));
}

.progress-liquid-fill {
    --liquid-fill-tint: var(--progress-fill, var(--primary));
}

/* COMPLETION is variant-independent — one discharge glow when the quantity
   lands, whatever paint the meter wears. It is a light-channel EFFECT, so it
   rides `--ease-standard` (canon: `--spring-press` on the SPATIAL leg,
   `--ease-standard` on EFFECTS) and it is capped at the 0.12 specular ceiling;
   the retired crescendo reached 95-100% white. */
.progress-rail[data-state="complete"] .progress-value-fill {
    animation: progress-discharge var(--duration-normal) var(--ease-standard) 1;
}

@keyframes progress-discharge {
    from {
        box-shadow: inset 0 0 0.5rem 0 oklch(1 0 0 / 0);
    }
    50% {
        box-shadow: inset 0 0 0.75rem 0 oklch(1 0 0 / 0.12);
    }
    to {
        box-shadow: inset 0 0 0.5rem 0 oklch(1 0 0 / 0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .progress-value-fill {
        transition: none;
    }

    /* The end state carries the fact; the glow is pure decoration on top of it. */
    .progress-rail[data-state="complete"] .progress-value-fill {
        animation: none;
    }
}
</style>
