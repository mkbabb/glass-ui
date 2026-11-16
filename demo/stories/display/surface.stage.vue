<script setup lang="ts">
// Surface's stage: one plate at a prominence and a decoration. A change of either
// cross-fades the plate, since its blur has no tween of its own.
import { Surface, type SurfaceDecoration, type SurfaceTier } from "@glass/components/surface";
import StageSwap from "../../chassis/variants/StageSwap.vue";

withDefaults(defineProps<{ tier?: SurfaceTier; decoration?: SurfaceDecoration }>(), {
    tier: "resting",
    decoration: "glass",
});
</script>

<template>
    <div class="surface-stage">
        <StageSwap :swap-key="`${tier}-${decoration}`" class="surface-stage-swap">
            <Surface :tier="tier" :surface="decoration" class="surface-stage-plate" />
        </StageSwap>
    </div>
</template>

<style scoped>
.surface-stage {
    display: flex;
    align-items: center;
    justify-content: center;
    block-size: 100%;
    padding: var(--sp-4);
}
.surface-stage-swap {
    inline-size: min(100%, 30rem);
    padding: var(--sp-3);
}
.surface-stage-plate {
    block-size: 16rem;
}
@container (inline-size < 30rem) {
    .surface-stage-plate {
        block-size: 12rem;
    }
}
</style>
