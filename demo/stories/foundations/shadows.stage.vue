<script setup lang="ts">
// Shadows' stage: three real cards, one at each elevation.
import { Card, CardHeader, CardTitle } from "@glass/components/card";

const LEVELS = [
    { tier: "resting", title: "Resting" },
    { tier: "floating", title: "Floating" },
    { tier: "overlay", title: "Overlay" },
] as const;
</script>

<template>
    <div class="shadows-stage">
        <Card v-for="l in LEVELS" :key="l.tier" :tier="l.tier" size="sm" class="shadows-card">
            <CardHeader>
                <CardTitle as="h3">{{ l.title }}</CardTitle>
            </CardHeader>
        </Card>
    </div>
</template>

<style scoped>
.shadows-stage {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    gap: var(--sp-6);
    padding: var(--sp-4);
}

.shadows-card {
    inline-size: 15rem;
    min-block-size: 9rem;
}

@container (inline-size < 52rem) {
    .shadows-stage {
        grid-template-columns: auto;
        gap: var(--sp-5);
    }
}

@container (inline-size < 26rem) {
    .shadows-card {
        inline-size: 17rem;
        min-block-size: 6rem;
    }
}
</style>
