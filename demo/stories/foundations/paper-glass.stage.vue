<script lang="ts">
export type PaperGlassGround = "colour" | "paper";
</script>

<script setup lang="ts">
// Paper & Glass's stage: the five glass tiers as five plates across the stage, over
// the stage's colour field or over paper, with or without grain. A change cross-fades.
import StageSwap from "../../chassis/variants/StageSwap.vue";

withDefaults(defineProps<{ ground?: PaperGlassGround; grain?: boolean }>(), {
    ground: "colour",
    grain: true,
});

const TIERS = [
    { cls: "glass-wash", label: "Wash" },
    { cls: "glass-quiet", label: "Quiet" },
    { cls: "glass-resting", label: "Resting" },
    { cls: "glass-floating", label: "Floating" },
    { cls: "glass-overlay", label: "Overlay" },
] as const;
</script>

<template>
    <StageSwap :swap-key="`${ground}-${grain}`" class="pg-swap">
        <div class="pg-stage">
            <div v-if="ground === 'paper'" class="pg-paper paper-grain-overlay" aria-hidden="true" />
            <div class="pg-plates">
                <div
                    v-for="t in TIERS"
                    :key="t.cls"
                    :class="[t.cls, { 'paper-grain-overlay': grain }]"
                    class="pg-plate"
                >
                    <span class="pg-caption">{{ t.label }}</span>
                </div>
            </div>
        </div>
    </StageSwap>
</template>

<style scoped>
.pg-swap,
.pg-swap > :deep(.stage-swap-pane) {
    block-size: 100%;
}

.pg-stage {
    position: relative;
    isolation: isolate;
    block-size: 100%;
    padding: var(--sp-5);
    display: grid;
    align-items: center;
}

.pg-paper {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: var(--background);
}

/* Five across where the stage is wide; one column of strips where it is narrow. */
.pg-plates {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--sp-4);
}

.pg-plate {
    display: flex;
    align-items: flex-end;
    min-block-size: 18rem;
    padding: var(--sp-4);
    border-radius: var(--radius-3xl);
    border: 1px solid var(--glass-border-quiet);
}

.pg-caption {
    font-size: var(--text-small, 0.875rem);
    color: var(--foreground);
    white-space: nowrap;
}

@container (inline-size < 44rem) {
    .pg-stage {
        padding: var(--sp-4);
    }
    .pg-plates {
        grid-template-columns: minmax(0, 1fr);
        gap: var(--sp-3);
    }
    .pg-plate {
        min-block-size: 4.5rem;
        align-items: center;
        padding-block: var(--sp-3);
        border-radius: var(--radius-2xl);
    }
}
</style>
