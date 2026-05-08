<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RotateCcw } from "lucide-vue-next";
import { Label } from "../../ui/label";
import { cn } from "../../../utils/cn";

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
    class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
    (e: "reset"): void;
}>();
</script>

<template>
    <div :class="cn('configurator-row flex flex-col gap-1.5 py-2', props.class)">
        <div class="flex items-baseline justify-between gap-3">
            <div class="flex min-w-0 items-baseline gap-2">
                <Label class="truncate text-sm font-medium text-foreground">
                    {{ label }}
                </Label>
                <span
                    v-if="name"
                    class="truncate text-[0.6875rem] font-mono text-muted-foreground/70"
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
            class="text-[0.6875rem] leading-snug text-muted-foreground/80"
        >
            {{ description }}
        </p>
    </div>
</template>
