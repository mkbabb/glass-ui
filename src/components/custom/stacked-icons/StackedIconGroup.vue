<template>
    <component
        :is="as"
        class="stacked-icon-group group/stack relative isolate flex"
        :class="[
            direction === 'vertical' ? 'flex-col' : 'items-center',
            reversed ? (direction === 'vertical' ? 'flex-col-reverse' : 'flex-row-reverse') : '',
        ]"
        :data-direction="direction"
        :style="{ '--n': stackCount }"
    >
        <!-- Visible icons (up to maxVisible) -->
        <template v-for="(item, i) in visibleItems" :key="keyFn?.(item, i) ?? i">
            <div
                :class="[
                    sizeClass,
                    'stacked-icon-puck relative flex items-center justify-center rounded-pill transform-gpu',
                    i > 0 ? overlapClass : '',
                    expandOnHover && i > 0 ? 'stacked-icon-puck--fan' : '',
                ]"
                :style="{ zIndex: visibleItems.length + 1 - i, '--i': i }"
            >
                <slot name="icon" :item="item" :index="i" />
            </div>
        </template>

        <!-- Overflow indicator (+N) when items exceed maxVisible — the QUIET
             `.glass-atom` capsule (the hardcoded `bg-[color-mix(…background…)]` +
             `shadow-cartoon-sm` plate is EXCISED, no-legacy). A real focusable
             summary; it casts the K5-fixed warm cel via its inert child. -->
        <div
            v-if="overflowCount > 0"
            :class="[
                sizeClass,
                'stacked-icon-puck stacked-icon-overflow glass-capsule glass-atom',
                'relative flex items-center justify-center rounded-pill text-xs font-semibold text-muted-foreground',
                'transform-gpu',
                overlapClass,
                expandOnHover ? 'stacked-icon-puck--fan' : '',
            ]"
            :style="{ zIndex: 1, '--i': visibleItems.length }"
            data-cast
        >
            <span class="cartoon-cast" aria-hidden="true" />
            <slot name="overflow" :count="overflowCount">
                +{{ overflowCount }}
            </slot>
        </div>

        <!-- Info/detail trigger — shown when items fit within maxVisible (no overflow) -->
        <div
            v-if="overflowCount === 0 && $slots.info"
            :style="{ zIndex: 0 }"
        >
            <slot name="info" />
        </div>
    </component>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { StackedIconGroupProps } from './types';

const props = withDefaults(defineProps<StackedIconGroupProps<T>>(), {
    maxVisible: 3,
    direction: 'horizontal',
    reversed: false,
    size: 'md',
    expandOnHover: true,
    as: 'div',
});

const sizeClass = computed(() => {
    switch (props.size) {
        case 'sm': return 'h-6 w-6';
        case 'md': return 'h-8 w-8';
        case 'lg': return 'h-10 w-10';
    }
});

const overlapClass = computed(() => {
    if (props.direction === 'vertical') {
        switch (props.size) {
            case 'sm': return '-mt-(--stack-overlap-sm)';
            case 'md': return '-mt-(--stack-overlap-md)';
            case 'lg': return '-mt-(--stack-overlap-lg)';
        }
    }
    switch (props.size) {
        case 'sm': return '-ml-(--stack-overlap-sm)';
        case 'md': return '-ml-(--stack-overlap-md)';
        case 'lg': return '-ml-(--stack-overlap-lg)';
    }
});

const visibleItems = computed(() =>
    props.items.slice(0, props.maxVisible),
);

const overflowCount = computed(() =>
    Math.max(0, props.items.length - props.maxVisible),
);

// BD.W-GLASS-ATOM-REGISTER — the puck COUNT threaded to the consumer so the arc's
// total sweep stays FIXED ≤18° regardless of N (challenge #3 R4): each puck rotates
// `--i / --n × 18deg`, NOT a per-puck `* 2.4deg` that crooks at N>4. `--n` is the
// span denominator (max(1, lastIndex)) so the outermost puck lands the full sweep.
const stackCount = computed(() => {
    const visible = visibleItems.value.length;
    const total = visible + (overflowCount.value > 0 ? 1 : 0);
    return Math.max(1, total - 1);
});
</script>

<style>
/* BD.W-GLASS-ATOM-REGISTER — the BOUNDED ARC fan-out (RE-INVENT, challenge #3 R4).
   The cluster breathes apart like a DEALT HAND: per-index `transition-delay` stagger
   (overlapping action — the back pucks FOLLOW the front), a fixed TOTAL sweep ≤18°
   across the cluster INDEPENDENT of N, and a bounded lift, each puck casting its own
   cel — on `--motion-weight × --ease-cartoon-punch`. The live flat
   `translate-x-1.5 scale-105` slide is RETIRED.

   The MOTION rides `translate`/`rotate`/`scale` longhands only (compositor-safe);
   the cel cast box-shadow is set per state-flip, never per-frame (the §L7
   paint-fence). NOT scoped — the classes are bound dynamically; this block is the
   component's own un-scoped CSS, the recipe lives ONCE. */
.stacked-icon-puck {
    /* the per-index choreography — the stagger step + the sweep fraction. */
    --stack-i: var(--i, 0);
    --stack-n: var(--n, 1);
    --stack-sweep: 18deg;
    --stack-delay-step: 28ms;
    transition:
        translate var(--duration-normal) var(--ease-cartoon-punch),
        rotate var(--duration-normal) var(--ease-cartoon-punch),
        scale var(--duration-normal) var(--ease-cartoon-punch),
        box-shadow var(--duration-fast) var(--ease-standard);
    transition-delay: calc(var(--stack-i) * var(--stack-delay-step));
}

/* The fan — on group hover the pucks ARC apart. The rotate is the FIXED-total
   fraction (`--i / --n × sweep`, ≤18° at the outermost regardless of N); the lift
   is a bounded translate along the stack axis; the scale a hair of grow. The whole
   amplitude couples `--motion-weight` (PRM → 0 → no fan). The default-direction
   (horizontal) lifts up-right toward the upper-right `--glass-key`. */
@media (hover: hover) {
    .group\/stack:hover .stacked-icon-puck--fan {
        --fan: var(--motion-weight, 0.618);
        rotate: calc(
            var(--stack-i) / var(--stack-n) * var(--stack-sweep) * var(--fan)
        );
        scale: calc(1 + 0.06 * var(--fan));
    }
    .group\/stack[data-direction='horizontal']:hover .stacked-icon-puck--fan {
        translate: calc(6px * var(--fan)) calc(-3px * var(--fan));
    }
    .group\/stack[data-direction='vertical']:hover .stacked-icon-puck--fan {
        translate: calc(3px * var(--fan)) calc(6px * var(--fan));
    }
    /* each puck casts its own cel as it lifts off — the inert child / the puck's
       own shadow deepens. The `+N` overflow rides the `.glass-atom[data-cast]` cast. */
    .group\/stack:hover .stacked-icon-overflow .cartoon-cast {
        box-shadow: var(--shadow-cartoon-md);
    }
}

/* The disc DROPS backdrop-filter during the fan (the WebKit rotated-backdrop
   re-raster cliff, challenge #2 R4) — static tint while in motion, restored at rest
   by the absence of `:hover`. Only the glass overflow puck carries a backdrop. */
@media (hover: hover) {
    .group\/stack:hover .stacked-icon-overflow {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    .stacked-icon-puck--fan {
        --motion-weight: 0;
        rotate: 0deg;
        translate: 0 0;
        scale: 1;
        transition: none;
    }
}
</style>
