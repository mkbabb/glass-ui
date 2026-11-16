<script setup lang="ts">
// Radii's stage: each corner rung on a real glass surface, at natural size.
import { Surface } from "@glass/components/surface";

const RUNGS = [
    { cls: "rounded-sm", label: "4" },
    { cls: "rounded-md", label: "6" },
    { cls: "rounded-lg", label: "10" },
    { cls: "rounded-xl", label: "12" },
    { cls: "rounded-2xl", label: "16" },
    { cls: "rounded-3xl", label: "24" },
    { cls: "rounded-full", label: "Full", wide: true },
] as const;
</script>

<template>
    <div class="radii-stage">
        <figure v-for="r in RUNGS" :key="r.cls" class="radii-cell">
            <Surface
                tier="floating"
                :class="[r.cls, 'radii-plate', { 'radii-plate--wide': 'wide' in r }]"
            />
            <figcaption>{{ r.label }}</figcaption>
        </figure>
    </div>
</template>

<style scoped>
.radii-stage {
    display: grid;
    grid-template-columns: repeat(7, auto);
    justify-content: center;
    align-items: end;
    gap: var(--sp-5);
}

.radii-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2);
    margin: 0;
}

.radii-cell figcaption {
    font-size: var(--text-small, 0.875rem);
    color: var(--foreground);
}

.radii-plate {
    inline-size: 6rem;
    block-size: 6rem;
    border: 1px solid var(--glass-border-floating);
}

.radii-plate--wide {
    inline-size: 9rem;
    block-size: 4rem;
}

@container (inline-size < 60rem) {
    .radii-stage {
        grid-template-columns: repeat(4, auto);
    }
}

@container (inline-size < 26rem) {
    .radii-stage {
        grid-template-columns: repeat(3, auto);
        gap: var(--sp-4);
    }
    .radii-plate {
        inline-size: 4.5rem;
        block-size: 4.5rem;
    }
    .radii-plate--wide {
        inline-size: 7rem;
        block-size: 3rem;
    }
}
</style>
