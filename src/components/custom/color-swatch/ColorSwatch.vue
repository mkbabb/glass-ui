<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

/**
 * <ColorSwatch> — the library's first-class color-input register
 * (BA.W-CONFIG-CHASSIS.2 / CFG-3).
 *
 * Replaces the raw full-width `<input type="color">` slab that three divergent
 * configurator color inputs hand-rolled (aurora Seed, aurora DERIVE seed, blob
 * Seed). A `<input type=color w-full>` paints one swatch's worth of information
 * at the visual weight of a full slider — an undifferentiated heavy block. This
 * is the PROPORTIONED chip: a bordered, radius'd swatch sized to a control
 * affordance (not the row width), with an optional hex affordance beside it.
 *
 * # Anatomy
 *
 * The native `<input type="color">` is the accessible carrier (it owns the OS
 * color picker + keyboard activation + the `aria-label`), rendered INVISIBLE and
 * stretched over the visible swatch chip so the whole chip is the click target.
 * The visible chip is a `<span>` painted with the current color over a bordered
 * radius'd plate; an optional hex `<code>` reads the value beside it.
 *
 * # Contract
 *
 * - `v-model` — the hex string (`"#3a7bd5"`). The native input round-trips it.
 * - `aria-label` (fall-through) — names the picker for a11y (the bare swatch is
 *   otherwise unlabeled). REQUIRED when the chip is not adjacent to a visible
 *   label; a configurator row's label names it otherwise.
 * - `showHex?: boolean` (default `false`) — render the uppercase hex code beside
 *   the swatch (the "hex affordance"). Off → the bare proportioned chip.
 * - `size?: "sm" | "md"` (default `"md"`) — the chip edge (28px / 32px), floored
 *   to a comfortable touch target by the row when coarse-pointer.
 *
 * Born ≥2 consumers by construction: the aurora Seed + the aurora DERIVE seed
 * (both this wave). The blob Seed is the third (re-pointed in W-GOO-REDRESS).
 */
defineOptions({ name: "ColorSwatch", inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        /** The chip edge size. `sm` = 28px, `md` = 32px (default). */
        size?: "sm" | "md";
        /** Render the uppercase hex code beside the swatch. Default `false`. */
        showHex?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { size: "md", showHex: false },
);

// Vue 3.5 defineModel — the hex string the native input round-trips.
const model = defineModel<string>({ default: "#000000" });

const swatchSizeClass = computed(() =>
    props.size === "sm" ? "h-7 w-7" : "h-8 w-8",
);

const hexLabel = computed(() => model.value.toUpperCase());

function onInput(e: Event): void {
    model.value = (e.target as HTMLInputElement).value;
}
</script>

<template>
    <span
        :class="
            cn(
                'color-swatch inline-flex items-center gap-2 align-middle',
                props.class,
            )
        "
    >
        <!-- The proportioned swatch chip. The native <input type=color> is the
             accessible carrier, rendered invisible + stretched over the chip so
             the whole chip is the click target; the visible plate paints the
             current color over a bordered radius'd surface. -->
        <span
            class="color-swatch__chip relative inline-flex shrink-0 cursor-pointer overflow-hidden rounded-control border border-(--configurator-divider-section)"
            :class="swatchSizeClass"
            :style="{ backgroundColor: model }"
        >
            <input
                type="color"
                :value="model"
                v-bind="$attrs"
                class="color-swatch__input absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-transparent p-0 opacity-0"
                @input="onInput"
            />
        </span>
        <code
            v-if="showHex"
            class="color-swatch__hex text-mono-caption tabular-nums uppercase text-muted-foreground"
        >
            {{ hexLabel }}
        </code>
    </span>
</template>
