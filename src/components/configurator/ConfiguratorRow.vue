<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { RotateCcw } from "@lucide/vue";
import { Label } from "../label";
import { cn } from "../_shared/class-names";
import { useOptionalConfiguratorSize, type ConfiguratorSize } from "./size";

/**
 * <ConfiguratorRow> — labeled control row for a single field inside a
 * <ConfiguratorLayer>. Mirrors the demo's PresetEditorField surface
 * (label + token-name + optional reset + description) but ships from
 * the library so consumers can compose configurators without re-rolling
 * the row layout.
 *
 * Slot consumes the actual control (Slider, Select, Switch, NumberField,
 * etc.). The reset button is opt-in via `canReset`; emits a `reset`
 * event the consumer wires to its own field-clear path.
 *
 * # The double-label API (value.js L14)
 *
 * The label header is a first-class triple: `label` (primary sans medium), the optional
 * `sub` (secondary descriptive text paired inline), and the optional `name` (a mono token,
 * specification reference, or live numeric readout). All three are declarative props,
 * so a consumer expresses a "double-label" row (primary + secondary) WITHOUT a
 * `:deep()` reach into the slot or a hand-rolled in-slot sans+mono pair. Use
 * `sub` for a descriptive secondary label and `name` for a mono token/value.
 *
 * # Size axis
 *
 * The row honors a three-rung size axis (`sm` | `md` | `lg`).
 * Resolution order:
 *
 * 1. Local `size` prop (highest priority).
 * 2. `<Configurator>` inject (`CONFIGURATOR_SIZE_KEY`).
 * 3. `undefined` — the row keeps its baked-in `gap-1.5 py-2` recipe and
 *    emits no `data-size` attribute (bare-row visual preserved).
 *
 * When size resolves to a value, the root gets `data-size="…"`
 * and the token-driven CSS rule overrides the Tailwind gap. The
 * `"md"` rung is functionally identical to the no-size
 * fallback; it exists so consumers can be explicit.
 *
 * # ConfiguratorRow vs LabeledField
 *
 * Both are "label (+ meta) above/beside a slotted control", but they are NOT
 * interchangeable — they emphasize DIFFERENT features:
 *  - **ConfiguratorRow** (this) — for TOKEN, PRESET controls. Carries the
 *    token-`name` reference, the opt-in `reset` affordance (`canReset`), and the
 *    three-rung `size` axis (local-prop-over-inject). No a11y for/id wiring.
 *  - **LabeledField** — for form controls. Carries stable label, description,
 *    error, requirement, state, and layout associations without styling the control.
 *
 * Reach for ConfiguratorRow only when token metadata or reset is the content;
 * use LabeledField directly for an accessible form control, including inside a
 * Configurator. Never nest both solely to repeat a label.
 */
const props = defineProps<{
    /** Display label (top-left, primary). */
    label: string;
    /**
     * Optional SECONDARY label (value.js L14 — the double-label API). A
     * descriptive secondary rung paired inline with the primary `label` (sans,
     * muted), distinct from the mono `name` token/value. Lets a consumer express
     * a two-part label declaratively — no `:deep()` reach, no in-slot label pair.
     */
    sub?: string;
    /** Optional token name, spec reference (right of label, monospaced). */
    name?: string;
    /** Optional helper, value description (below the control). */
    description?: string;
    /** Show the reset affordance (top-right). */
    canReset?: boolean;
    /**
     * Size rung. Overrides the value injected by an ancestor
     * `<Configurator>` when set. Omit to follow the inject (or to fall
     * back to the `gap-1.5 py-2` recipe when there is no
     * ancestor configurator).
     */
    size?: ConfiguratorSize;
    class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
    (e: "reset"): void;
}>();

// Prop wins over inject. Inject is a ComputedRef so reactive size
// swaps (e.g., viewport-driven host) propagate without remount. The
// optional helper returns `null` when no ancestor `<Configurator>`;
// the trailing `?? undefined` keeps the `:data-size` binding from
// emitting an attribute in the bare-row case.
const injectedSize = useOptionalConfiguratorSize();
const resolvedSize = computed<ConfiguratorSize | undefined>(
    () => props.size ?? injectedSize?.value ?? undefined,
);
</script>

<template>
    <div
        data-slot="configurator-row"
        :class="cn('configurator-row flex flex-col gap-1.5 py-2', props.class)"
        :data-size="resolvedSize"
    >
        <div class="flex items-baseline justify-between gap-3">
            <div class="flex min-w-0 items-baseline gap-2">
                <!-- Secondary label register: the row label
                     is the SECONDARY rung — the body size (text-small / 500),
                     deliberately BELOW the .configurator-section-label section
                     register on the parent <ConfiguratorLayer>. The token-name
                     sub-label below (the mono `name` span) is the tertiary
                     mono-caption rung — the three-rung label hierarchy reads
                     section → row → token. -->
                <Label class="truncate text-small font-medium text-foreground">
                    {{ label }}
                </Label>
                <!-- The SECONDARY label (L14 double-label) — a descriptive sans rung
                     paired inline with the primary, distinct from the mono `name`. -->
                <span
                    v-if="sub"
                    class="truncate text-small font-normal text-muted-foreground"
                >
                    {{ sub }}
                </span>
                <span
                    v-if="name"
                    class="truncate text-micro font-mono text-muted-foreground/70"
                >
                    {{ name }}
                </span>
            </div>
            <button
                v-if="canReset"
                type="button"
                data-slot="configurator-reset"
                class="tap-squish transition-control focus-ring inline-flex h-6 w-6 items-center justify-center rounded-pill text-muted-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                :aria-label="`Reset ${label}`"
                @click="emit('reset')"
            >
                <RotateCcw class="h-3 w-3" aria-hidden="true" />
            </button>
        </div>
        <!-- Establish a definite, shrinkable inline size for the slotted token control. -->
        <div class="flex w-full min-w-0 items-center [&>*]:min-w-0 [&>*]:w-full [&>*]:flex-1">
            <slot />
        </div>
        <p v-if="description" class="text-micro leading-snug text-muted-foreground/80">
            {{ description }}
        </p>
    </div>
</template>

<style scoped>
/*
 * Density-axis gap overrides. `comfortable` matches the base Tailwind
 * `gap-1.5` (0.375rem) exactly, so its rule is a no-op restatement for
 * explicit-size consumers; the bare row (no data-size attribute)
 * picks up its gap from the `gap-1.5` Tailwind utility above.
 *
 * Block padding follows the same density ladder so the row breathes the
 * same way the gap does. `comfortable` keeps the base `py-2` (0.5rem).
 */
.configurator-row[data-size="sm"] {
    gap: var(--configurator-row-gap-compact);
    padding-block: var(--configurator-row-py-compact);
}

.configurator-row[data-size="md"] {
    gap: var(--configurator-row-gap-comfortable);
    padding-block: var(--configurator-row-py-comfortable);
}

.configurator-row[data-size="lg"] {
    gap: var(--configurator-row-gap-spacious);
    padding-block: var(--configurator-row-py-spacious);
}

/*
 * Container-style-query companion using `@container style(--density)`.
 * Lets a row react to an ANCESTOR's `--configurator-size` custom property with no
 * `data-size` markup contract — a host that sets `--configurator-size: sm`
 * on any wrapping element retunes every descendant row's gap/padding.
 * In Tailwind v4 every element is a custom-property style-query container
 * by default, so `style(--configurator-size: X)` matches the nearest ancestor that
 * declares `--configurator-size` (no explicit container-name needed).
 *
 * Specificity: the inner `.configurator-row` selector (scoped to
 * `[data-v]`, so 0,2,0) sits just BELOW the `[data-size]` attribute
 * rules above (0,3,0) and just ABOVE the baked-in `gap-1.5`/`py-2` Tailwind
 * utilities (0,1,0) — so the container path overrides the bare recipe, yet
 * a row carrying BOTH the attribute and a `--configurator-size` ancestor lands on the
 * attribute rule (identical token, identical paint). `[data-size]` stays
 * the SOLE fallback (not a dead mirror).
 *
 * No `@supports` wrapper: unlike the sibling scroll-state recipe (which probes
 * `@supports (container-type: scroll-state)` — a probeable container-type
 * VALUE), style queries introduce no new `container-type` value (every element
 * is a style container by default), so there is no clean declaration test for
 * style-query support. Instead this relies on `@container style()`'s own
 * graceful degradation: an engine without style-query support parses the
 * unknown `@container style(--configurator-size: …)` as an invalid at-rule, drops the
 * whole block, and keeps the `[data-size]` attribute base. (The earlier
 * `@supports (container-type: inline-size)` wrapper was wrong — it probed
 * SIZE-query support, a distinct feature with a distinct support timeline.)
 */
@container style(--configurator-size: sm) {
    .configurator-row {
        gap: var(--configurator-row-gap-compact);
        padding-block: var(--configurator-row-py-compact);
    }
}
@container style(--configurator-size: md) {
    .configurator-row {
        gap: var(--configurator-row-gap-comfortable);
        padding-block: var(--configurator-row-py-comfortable);
    }
}
@container style(--configurator-size: lg) {
    .configurator-row {
        gap: var(--configurator-row-gap-spacious);
        padding-block: var(--configurator-row-py-spacious);
    }
}
</style>
