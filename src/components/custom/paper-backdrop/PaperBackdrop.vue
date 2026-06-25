<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

/**
 * Turbulence-texture register on `<PaperBackdrop>`. `"clean"` is the default
 * 0.65-baseFrequency / 4-octave grain; `"aged"` swaps to the 0.5-baseFrequency
 * / 5-octave variant via the `--paper-aged-texture` CSS custom property.
 * Consumers extend the register by adding their own `--paper-*-texture` vars
 * at `:root` and applying via raw `class="paper-grain-overlay"` plus an inline
 * `style` override — the texture-system canonical cascade per DESIGN.md.
 */
export type PaperBackdropFrequency = "clean" | "aged";

export interface PaperBackdropProps {
    /** Override grain opacity (defaults to --glass-grain-opacity). */
    opacity?: number | string;
    /** Override turbulence frequency (advisory only — swaps the texture var). */
    frequency?: PaperBackdropFrequency;
    /**
     * BD.W-PAGE-FIELD — mount the WARM COLORFUL FIELD plane beneath the grain.
     * When set, a `.paper-field` cel plane (amber→terracotta→sand at FIELD
     * lightness, drifting on the compositor) paints UNDER the grain, so every
     * glass surface over it reads transmissive/warm instead of gray. The grain
     * rides ON TOP at its multiply opacity — one backdrop, two stacked planes.
     * Opt-in (presets-in-consumers demo-chassis contract); the library glass
     * primitive is UNCHANGED.
     */
    field?: boolean;
    /**
     * The warm route hue request (any degree). The field CLAMPS it to the warm
     * band [25,95] IN THE CSS, so a cool/teal value cannot paint cool. Wire
     * `warmFieldHue(category)` here per route.
     */
    fieldHue?: number | string;
    /** The field rung intensity (0.85 ground / 1.0 vivid hero / 0 = neutral). */
    fieldIntensity?: number | string;
    /** Additional class names. */
    class?: HTMLAttributes["class"];
}

const props = defineProps<PaperBackdropProps>();

const inlineStyle = computed(() => {
    const s: Record<string, string> = {};
    if (props.opacity !== undefined) {
        s.opacity = String(props.opacity);
    }
    if (props.frequency === "aged") {
        s.backgroundImage = "var(--paper-aged-texture)";
    }
    return s;
});

/** The warm-field plane's inline drive props (`--field-h-raw` / intensity). */
const fieldStyle = computed(() => {
    const s: Record<string, string> = {};
    if (props.fieldHue !== undefined) {
        s["--field-h-raw"] = String(props.fieldHue);
    }
    if (props.fieldIntensity !== undefined) {
        s["--field-intensity"] = String(props.fieldIntensity);
    }
    return s;
});
</script>

<template>
    <!-- BD.W-PAGE-FIELD — the warm cel field plane UNDER the grain (opt-in). -->
    <div
        v-if="props.field"
        class="paper-field"
        :style="fieldStyle"
        aria-hidden="true"
    />
    <div
        :class="cn('paper-underpaint', props.class)"
        :style="inlineStyle"
        aria-hidden="true"
    />
</template>
