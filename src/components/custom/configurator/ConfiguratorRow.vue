<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { RotateCcw } from "@lucide/vue";
import { Label } from "../../ui/label";
import { cn } from "../../../utils/cn";
import { useOptionalConfiguratorDensity, type ConfiguratorDensity } from "./density";

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
 * # Density axis (N.W2 Lane A)
 *
 * The row honors a four-rung density axis (`mobile` | `compact` |
 * `comfortable` | `spacious`). Resolution order:
 *
 * 1. Local `density` prop (highest priority).
 * 2. `<Configurator>` inject (`CONFIGURATOR_DENSITY_KEY`).
 * 3. `undefined` — the row keeps its baked-in `gap-1.5 py-2` recipe and
 *    emits no `data-density` attribute (pre-N.W2 visual preserved).
 *
 * When density resolves to a value, the root gets `data-density="…"`
 * and the token-driven CSS rule overrides the Tailwind gap. The
 * `"comfortable"` rung is functionally identical to the no-density
 * fallback; it exists so consumers can be explicit.
 *
 * # ConfiguratorRow vs LabeledField — recorded divergence (AZ.W-METRIC-UNIFY §B)
 *
 * Both are "label (+ meta) above/beside a slotted control", but they are NOT
 * interchangeable — they emphasize DIFFERENT features:
 *  - **ConfiguratorRow** (this) — for TOKEN / PRESET controls. Carries the
 *    token-`name` reference, the opt-in `reset` affordance (`canReset`), and the
 *    four-rung `density` axis (local-prop-over-inject). No a11y for/id wiring.
 *  - **LabeledField** — for FORM fields. Carries the `for`/`id` label↔control
 *    a11y wiring (`controlId`/`labelId`/`errorId`), the `tooltip`, the `required`
 *    asterisk, and the `aria-live` `error` region.
 *
 * Reach for ConfiguratorRow inside a `<Configurator>` for token sliders/selects;
 * reach for LabeledField for accessible form inputs. The divergence is recorded
 * (NOT a forced merge — no ≥2-consumer shared-chassis need surfaced) in
 * `docs/precepts/design-idioms.md §9`, alongside the `cn`/`focus-ring` keeps.
 */
const props = defineProps<{
    /** Display label (top-left, primary). */
    label: string;
    /** Optional token name / spec reference (right of label, monospaced). */
    name?: string;
    /** Optional helper / value description (below the control). */
    description?: string;
    /** Show the reset affordance (top-right). */
    canReset?: boolean;
    /**
     * Density rung. Overrides the value injected by an ancestor
     * `<Configurator>` when set. Omit to follow the inject (or to fall
     * back to the pre-N.W2 `gap-1.5 py-2` recipe when there is no
     * ancestor configurator).
     */
    density?: ConfiguratorDensity;
    class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
    (e: "reset"): void;
}>();

// Prop wins over inject. Inject is a ComputedRef so reactive density
// swaps (e.g., viewport-driven host) propagate without remount. The
// optional helper returns `null` when no ancestor `<Configurator>`;
// the trailing `?? undefined` keeps the `:data-density` binding from
// emitting an attribute in the bare-row case (pre-N.W2 visual).
const injectedDensity = useOptionalConfiguratorDensity();
const resolvedDensity = computed<ConfiguratorDensity | undefined>(
    () => props.density ?? injectedDensity?.value ?? undefined,
);
</script>

<template>
    <div
        data-slot="configurator-row"
        :class="cn('configurator-row flex flex-col gap-1.5 py-2', props.class)"
        :data-density="resolvedDensity"
    >
        <div class="flex items-baseline justify-between gap-3">
            <div class="flex min-w-0 items-baseline gap-2">
                <!-- SECONDARY label register (AZ.W-HIERARCHY D6-3): the row label
                     is the SECONDARY rung — the body size (text-small / 500),
                     deliberately BELOW the .configurator-section-label section
                     register on the parent <ConfiguratorLayer>. The token-name
                     sub-label below (the mono `name` span) is the tertiary
                     mono-caption rung — the three-rung label hierarchy reads
                     section → row → token. -->
                <Label class="truncate text-small font-medium text-foreground">
                    {{ label }}
                </Label>
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
        <!-- THE WIDTH CONTRACT (BA.W-CONFIG-CHASSIS.1, S1 / CFG-1). The control
             slot establishes a DEFINITE-WIDTH block context so a slotted control
             fills the row's free inline axis regardless of its intrinsic content
             width — the 0px-slider class (a percentage track resolving against a
             content-sized flex item → circular → 0) dies here at the chassis,
             library-wide, not per-consumer. `w-full` makes the wrapper fill the
             column; `min-w-0` lets it shrink below content min; the immediate
             child gets `flex-1 min-w-0 w-full` (via `[&>*]`) so a `LabeledField`
             root / a bare slider claims the full inline span (the `.labeled-field`
             root also claims `width:100%` in base.css — belt and suspenders for
             the `hide-label` regression where the label was the only width
             contributor). Width-bearing controls (Select trigger, the swatch
             chip) are unaffected — `flex-1` on an already-sized child is a no-op
             on its intrinsic width but lets it fill the row when it would not. -->
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
 * Density-axis gap overrides. `comfortable` matches the pre-N.W2 Tailwind
 * `gap-1.5` (0.375rem) exactly, so its rule is a no-op restatement for
 * explicit-density consumers; the bare row (no data-density attribute)
 * picks up its gap from the `gap-1.5` Tailwind utility above.
 *
 * Block padding follows the same density ladder so the row breathes the
 * same way the gap does. `comfortable` keeps the prior `py-2` (0.5rem).
 */
.configurator-row[data-density="mobile"] {
    gap: var(--configurator-row-gap-mobile);
    padding-block: var(--configurator-row-py-mobile);
}

.configurator-row[data-density="compact"] {
    gap: var(--configurator-row-gap-compact);
    padding-block: var(--configurator-row-py-compact);
}

.configurator-row[data-density="comfortable"] {
    gap: var(--configurator-row-gap-comfortable);
    padding-block: var(--configurator-row-py-comfortable);
}

.configurator-row[data-density="spacious"] {
    gap: var(--configurator-row-gap-spacious);
    padding-block: var(--configurator-row-py-spacious);
}

/*
 * Container-style-query companion (AS.W4 — @container style(--density)).
 * Lets a row react to an ANCESTOR's `--density` custom property with no
 * `data-density` markup contract — a host that sets `--density: compact`
 * on any wrapping element retunes every descendant row's gap/padding.
 * In Tailwind v4 every element is a custom-property style-query container
 * by default, so `style(--density: X)` matches the nearest ancestor that
 * declares `--density` (no explicit container-name needed).
 *
 * Specificity: the inner `.configurator-row` selector (scoped to
 * `[data-v]`, so 0,2,0) sits just BELOW the `[data-density]` attribute
 * rules above (0,3,0) and just ABOVE the baked-in `gap-1.5`/`py-2` Tailwind
 * utilities (0,1,0) — so the container path overrides the bare recipe, yet
 * a row carrying BOTH the attribute and a `--density` ancestor lands on the
 * attribute rule (identical token, identical paint). `[data-density]` stays
 * the SOLE fallback (inv 47 — not a dead mirror).
 *
 * No `@supports` wrapper: unlike the sibling scroll-state recipe (which probes
 * `@supports (container-type: scroll-state)` — a probeable container-type
 * VALUE), style queries introduce no new `container-type` value (every element
 * is a style container by default), so there is no clean declaration test for
 * style-query support. Instead this relies on `@container style()`'s own
 * graceful degradation: an engine without style-query support parses the
 * unknown `@container style(--density: …)` as an invalid at-rule, drops the
 * whole block, and keeps the `[data-density]` attribute base. (The earlier
 * `@supports (container-type: inline-size)` wrapper was wrong — it probed
 * SIZE-query support, a distinct feature with a distinct support timeline.)
 */
@container style(--density: mobile) {
    .configurator-row {
        gap: var(--configurator-row-gap-mobile);
        padding-block: var(--configurator-row-py-mobile);
    }
}
@container style(--density: compact) {
    .configurator-row {
        gap: var(--configurator-row-gap-compact);
        padding-block: var(--configurator-row-py-compact);
    }
}
@container style(--density: comfortable) {
    .configurator-row {
        gap: var(--configurator-row-gap-comfortable);
        padding-block: var(--configurator-row-py-comfortable);
    }
}
@container style(--density: spacious) {
    .configurator-row {
        gap: var(--configurator-row-gap-spacious);
        padding-block: var(--configurator-row-py-spacious);
    }
}
</style>
