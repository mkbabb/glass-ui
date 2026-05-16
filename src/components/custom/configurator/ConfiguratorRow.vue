<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { RotateCcw } from "lucide-vue-next";
import { Label } from "../../ui/label";
import { cn } from "../../../utils/cn";
import {
    useOptionalConfiguratorDensity,
    type ConfiguratorDensity,
} from "./density";

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
        :class="cn('configurator-row flex flex-col gap-1.5 py-2', props.class)"
        :data-density="resolvedDensity"
    >
        <div class="flex items-baseline justify-between gap-3">
            <div class="flex min-w-0 items-baseline gap-2">
                <Label class="truncate text-sm font-medium text-foreground">
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
                class="focus-ring inline-flex h-6 w-6 items-center justify-center rounded-pill text-muted-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground active:scale-[var(--scale-press,0.97)]"
                :aria-label="`Reset ${label}`"
                @click="emit('reset')"
            >
                <RotateCcw class="h-3 w-3" aria-hidden="true" />
            </button>
        </div>
        <div class="flex items-center">
            <slot />
        </div>
        <p
            v-if="description"
            class="text-micro leading-snug text-muted-foreground/80"
        >
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
</style>
