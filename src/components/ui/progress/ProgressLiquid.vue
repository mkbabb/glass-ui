<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../../../utils";

/**
 * Liquid progress variant (BG.W-LIQUID-FILL) — the meter's fill is the ONE shared
 * `.glass-liquid-fill` register, the glass-cylinder fill EXTRACTED from Slider. The
 * rail is the recessed `--progress-track` channel; the indicator is a warm glass
 * cylinder that grows with `modelValue` via `translateX`.
 *
 * PHASE-COLOUR COMPOSABLE, ZERO PER-SITE GLASS KNOWLEDGE. The tint rides the ONE
 * `--liquid-fill-tint` knob, which this variant seeds from the EXISTING
 * `--progress-fill` token (the progress family's colour contract) in the scoped
 * block below — so a consumer re-tints the liquid meter by setting `--progress-fill`
 * (or `--liquid-fill-tint`) with NO knowledge of the blur / rim / under-shadow the
 * register owns. The thin `Progress` dispatcher routes here for `variant="liquid"`.
 */
const props = defineProps<ProgressRootProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :class="
            cn(
                'relative h-4 w-full overflow-hidden rounded-pill bg-[var(--progress-track,var(--progress-track-on-glass))]',
                props.class,
            )
        "
    >
        <ProgressIndicator
            class="glass-liquid-fill progress-liquid-fill h-full w-full flex-1 transition-transform"
            :style="{ transform: `translateX(-${100 - (props.modelValue ?? 0)}%)` }"
        />
    </ProgressRoot>
</template>

<style scoped>
/* The phase/tint colour is the ONLY per-site knowledge — the surface reads the
   existing `--progress-fill` token (the family colour contract) into the shared
   register's `--liquid-fill-tint` knob; the `.glass-liquid-fill` register owns
   every glass mechanic (blur / rim / under-shadow / warm floor). A consumer re-tints
   the liquid meter by setting `--progress-fill` (or `--liquid-fill-tint`) — no glass
   knowledge needed (BG.W-LIQUID-FILL). */
.progress-liquid-fill {
    --liquid-fill-tint: var(--progress-fill, var(--primary));
}
</style>
