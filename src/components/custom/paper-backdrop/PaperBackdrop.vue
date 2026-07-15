<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../_shared/class-names";

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
</script>

<template>
    <!-- BG.W-FIELD-AURORA — pure grain register (the `.paper-field` plane is
         retired; the warm field is the shell <Aurora>). -->
    <div
        :class="cn('paper-underpaint', props.class)"
        :style="inlineStyle"
        aria-hidden="true"
    />
</template>
