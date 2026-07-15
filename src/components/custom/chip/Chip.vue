<script setup lang="ts">
/**
 * Chip — the ONE folded chip (BI.W-CHIP-FOLD). A reka-`Toggle` selectable lozenge
 * that unifies the retired ToggleChip + SelectableChip onto ONE surface:
 *
 *   · `shape: pill | cell`  — the silhouette (the retired ToggleChip `variant`, a
 *     pure name-synonym rename; the CVA merges compile-time). `pill` is the stadium
 *     capsule, `cell` the square icon+label tile.
 *   · `tone` (opt-in)       — the contrast-floored tonal-accent register (the
 *     retired SelectableChip): a faint idle FILL floored ≥3:1, a bolder active BAND
 *     + EDGE rim, and a contrast-safe INK label (auto-darkened/lightened so the text
 *     never drops below AA over the resolved band). UNSET ⇒ the plain warm-floor
 *     glass toggle (the ToggleChip register — no tint, `--glass-fill-strength: 0%`).
 *   · `surface` (opt-in)    — the shared {glass·veil·opaque} decoration axis.
 *
 * Usage:
 *   <Chip v-model="on">Grid</Chip>                          <!-- plain toggle -->
 *   <Chip v-model="on" :tone="'var(--section-color-7)'">React</Chip>  <!-- tonal -->
 *   <Chip v-model="on" shape="cell">…icon + label…</Chip>   <!-- square tile -->
 *
 * The toggle state is the reka-ui Toggle `modelValue` contract — bind via `v-model`
 * (or `:model-value` / `@update:model-value`). For an exclusive picker, wire the
 * chips via direct refs (deliberately unopinionated about ToggleGroup).
 *
 * VALUE.JS-QUARANTINED (BI.W-CHIP-FOLD): the tonal ink solve rides a dynamic
 * `import('./accent-tone-solve')` boundary INSIDE `useAccentTone` (the sync
 * value.js-free shell), so `<Chip>`'s eager `/chip` chunk is value.js-FREE — a
 * plain-boolean toggle (a `var()` / unset tone) never loads value.js (the measured
 * 26KB quarantine; the /border-progress BC.W-AX-BP-LAZY precedent). `<Chip>` ships
 * `/chip` ONLY, OFF the value.js-free root barrel.
 */
import type { CSSProperties } from "vue";
import { computed } from "vue";
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "../../_shared/class-names";
// The sync value.js-FREE shell — a `var()`/unset tone stays value.js-free; a
// concrete `#hex`/`oklch(…)` tone loads the value.js ink-solve behind a dynamic
// import() INSIDE the shell (never a static edge into this chunk).
import { useAccentTone } from "../../../composables/color/useAccentTone";
import { chipVariants } from "./chipVariants";
import type { ChipProps } from "./types";

// The ONE folded chip is a NAMED component (devtools / keep-alive / recursion; the
// self-identifying survivor of the ToggleChip + SelectableChip fold).
defineOptions({ name: "Chip" });

const props = defineProps<ToggleProps & ChipProps>();

const emits = defineEmits<ToggleEmits>();

// The contrast-safe ink (the JS half) — { --tone, --accent-ink-resolved }. A
// `var(--…)` tone passes through (the CSS fallback ink carries it); a concrete
// colour resolves a value.js-floored ink via the dynamic accent-tone-solve leaf.
const { toneStyle } = useAccentTone(() => props.tone ?? "var(--primary)");

const forwarded = useForwardPropsEmits(
    () => {
        const {
            class: _class,
            tone: _tone,
            size: _size,
            shape: _shape,
            surface: _surface,
            ...rest
        } = props;
        return rest;
    },
    emits,
);

const chipClass = computed(() =>
    cn(chipVariants({ size: props.size, shape: props.shape }), props.class),
);

// The tonal register engages ONLY when a `tone` is supplied (opt-in). With no
// tone the chip is the plain warm-floor glass toggle (the retired ToggleChip
// register — byte-identical: no tint vars, the `--glass-fill-tint` @property
// default `transparent` / strength `0%` paints the warm floor). With a tone the
// chip writes the SHARED `--glass-fill-tint`/`--glass-fill-strength` plate axis
// (BG.W-GLASS-CONSUMER-BAND — read through the ONE `--glass-fill-tinted` recipe)
// so the translucent `.glass-capsule` body tints toward the `:tone` hue, plus the
// contrast-safe `--accent-ink-resolved` label ink.
const chipStyle = computed<CSSProperties | undefined>(() => {
    if (props.tone === undefined) return undefined;
    return {
        ...toneStyle.value,
        "--glass-fill-tint": props.tone,
        "--glass-fill-strength": "var(--chip-glass-strength, 12%)",
    } as CSSProperties;
});
</script>

<template>
    <Toggle
        v-bind="forwarded"
        :class="chipClass"
        :style="chipStyle"
        :data-surface="props.surface"
    >
        <slot />
    </Toggle>
</template>
