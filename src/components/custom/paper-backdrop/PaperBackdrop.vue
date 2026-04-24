<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

interface PaperBackdropProps {
    /** Override grain opacity (defaults to --glass-grain-opacity). */
    opacity?: number | string;
    /** Override turbulence frequency (advisory only — swaps the texture var). */
    frequency?: "clean" | "aged";
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
    <div
        :class="cn('paper-underpaint', props.class)"
        :style="inlineStyle"
        aria-hidden="true"
    />
</template>
