<script setup lang="ts">
import { computed } from "vue";
import { Pause, Play } from "@lucide/vue";
import DockIconButton from "./DockIconButton.vue";

/**
 * <DockBackgroundToggle> — the WCAG 2.2.2 (Pause, Stop, Hide), Level A pause/play
 * control for a continuously-running AV background (Aurora / GooBlob).
 *
 * WCAG 2.2.2 is OBLIGATORY for any auto-starting, >5s, non-essential motion and
 * the control must be available to ALL users — it is NOT gated behind
 * `prefers-reduced-motion` (which the substrate handles separately via the G1
 * freeze). This is the USER-driven stop control any user can reach.
 *
 * Binding contract (KISS — it binds an EXISTING renderer seam, adds no parallel
 * pause path): the consumer holds the paused state and wires it to the renderer's
 * `pause()`/`resume()`. The toggle is a thin `v-model:paused` control over a
 * `<DockIconButton>` host (the dock is the natural home for a background control):
 *
 * ```vue
 * <script setup>
 * const blob = ref<InstanceType<typeof GooBlob>>();
 * const paused = ref(false);
 * watch(paused, (p) => (p ? blob.value?.pause() : blob.value?.resume()));
 * <\/script>
 * <DockBackgroundToggle v-model:paused="paused" />
 * ```
 *
 * The control reflects state via `aria-pressed` (pressed ⇒ paused) and swaps the
 * Pause↔Play glyph + the accessible label, so a screen reader announces both the
 * action and the current state.
 */
const props = withDefaults(
    defineProps<{
        /** Whether the background is currently paused (the controlled state). */
        paused?: boolean;
        /** Accessible label when RUNNING (the action: pause). */
        pauseLabel?: string;
        /** Accessible label when PAUSED (the action: play/resume). */
        playLabel?: string;
    }>(),
    {
        paused: false,
        pauseLabel: "Pause background animation",
        playLabel: "Resume background animation",
    },
);

const emit = defineEmits<{ "update:paused": [value: boolean] }>();

const label = computed(() => (props.paused ? props.playLabel : props.pauseLabel));

function toggle() {
    emit("update:paused", !props.paused);
}
</script>

<template>
    <DockIconButton
        type="button"
        :aria-pressed="paused"
        :aria-label="label"
        :title="label"
        @click="toggle"
    >
        <!-- Pressed ⇒ paused ⇒ show the Play affordance (the action it offers). -->
        <Play v-if="paused" :size="18" aria-hidden="true" />
        <Pause v-else :size="18" aria-hidden="true" />
    </DockIconButton>
</template>
