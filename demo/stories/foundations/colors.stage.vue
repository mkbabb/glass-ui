<script lang="ts">
export type ColorSet = "palette" | "tints" | "chart";
</script>

<script setup lang="ts">
// Colors' stage: the role colours and the thirteen section colours, the tint scale,
// or the chart palette, as swatches. A change cross-fades and its height travels.
import StageSwap from "../../chassis/variants/StageSwap.vue";

withDefaults(defineProps<{ set?: ColorSet }>(), { set: "palette" });

const ROLES = [
    { name: "Background", v: "--background" },
    { name: "Foreground", v: "--foreground" },
    { name: "Card", v: "--card" },
    { name: "Primary", v: "--primary" },
    { name: "Secondary", v: "--secondary" },
    { name: "Accent", v: "--accent" },
    { name: "Destructive", v: "--destructive" },
    { name: "Border", v: "--border" },
] as const;

const SECTIONS = Array.from({ length: 13 }, (_, i) => `--section-color-${i}`);

const TINTS = [4, 6, 8, 10, 12, 15, 18, 22, 25] as const;

const CHART = [
    { name: "Ping", v: "--chart-ping" },
    { name: "Download", v: "--chart-download" },
    { name: "Upload", v: "--chart-upload" },
    { name: "Jitter", v: "--chart-jitter" },
] as const;
</script>

<template>
    <StageSwap :swap-key="set" class="colors-swap">
        <div v-if="set === 'palette'" class="colors-palette">
            <div class="colors-ramp">
                <span
                    v-for="v in SECTIONS"
                    :key="v"
                    class="colors-dot"
                    :style="{ backgroundColor: `var(${v})` }"
                />
            </div>
            <div class="colors-grid">
                <figure v-for="r in ROLES" :key="r.v" class="colors-cell">
                    <span class="colors-swatch" :style="{ backgroundColor: `var(${r.v})` }" />
                    <figcaption>{{ r.name }}</figcaption>
                </figure>
            </div>
        </div>

        <div v-else-if="set === 'tints'" class="colors-grid colors-grid--tints">
            <figure v-for="t in TINTS" :key="t" class="colors-cell">
                <span
                    class="colors-swatch"
                    :style="{ backgroundColor: `var(--surface-tint-${t})` }"
                />
                <figcaption>{{ t }}%</figcaption>
            </figure>
        </div>

        <div v-else class="colors-grid colors-grid--chart">
            <figure v-for="c in CHART" :key="c.v" class="colors-cell">
                <span
                    class="colors-swatch colors-swatch--lg"
                    :style="{ backgroundColor: `var(${c.v})` }"
                />
                <figcaption>{{ c.name }}</figcaption>
            </figure>
        </div>
    </StageSwap>
</template>

<style scoped>
.colors-palette {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-5);
}

.colors-ramp {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sp-2);
    max-inline-size: min(40rem, calc(100cqi - 3rem));
}

.colors-dot {
    inline-size: 2.25rem;
    block-size: 2.25rem;
    border-radius: var(--radius-stadium);
}

/* Swatches wrap as one centred flow, keyed to the stage's width by their own size. */
.colors-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sp-4);
    max-inline-size: min(48rem, calc(100cqi - 3rem));
}

.colors-grid--tints {
    max-inline-size: min(44rem, calc(100cqi - 3rem));
}

.colors-grid--chart {
    gap: var(--sp-5);
}

.colors-cell {
    min-inline-size: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2);
    margin: 0;
}

.colors-cell figcaption {
    font-size: var(--text-small, 0.875rem);
    color: var(--foreground);
    white-space: nowrap;
}

.colors-swatch {
    inline-size: 4.5rem;
    block-size: 4.5rem;
    border-radius: var(--radius-2xl);
    border: 1px solid var(--border);
}

.colors-swatch--lg {
    inline-size: 7rem;
    block-size: 7rem;
}

@container (inline-size < 26rem) {
    .colors-dot {
        inline-size: 1.75rem;
        block-size: 1.75rem;
    }
    .colors-swatch {
        inline-size: 3.5rem;
        block-size: 3.5rem;
    }
    .colors-swatch--lg {
        inline-size: 6rem;
        block-size: 6rem;
    }
    .colors-grid {
        gap: var(--sp-3);
    }
}
</style>
