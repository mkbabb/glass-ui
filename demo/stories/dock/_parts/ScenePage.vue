<script setup lang="ts">
// What a dock acts on in its app: a page (a column) or a figure (16:9). A library Card,
// with an optional title over a body. The dock's state reaches it; the dock's box never
// does, so a fold or a new size of the dock leaves it where it is. A new title
// cross-fades.
import { Card, CardTitle } from "@glass/components/card";

withDefaults(defineProps<{ shape?: "column" | "figure"; title?: string }>(), {
    shape: "column",
    title: undefined,
});
</script>

<template>
    <Card class="scene-page" :data-shape="shape">
        <div v-if="title" class="scene-page-head">
            <Transition name="fade" mode="out-in">
                <CardTitle :key="title">{{ title }}</CardTitle>
            </Transition>
        </div>
        <div class="scene-page-body">
            <slot />
        </div>
    </Card>
</template>

<style scoped>
.scene-page {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: clip;
}

.scene-page[data-shape="column"] {
    inline-size: min(100%, 44rem);
    block-size: 100%;
}

.scene-page[data-shape="figure"] {
    inline-size: min(100%, 40rem);
    max-block-size: 100%;
    aspect-ratio: 16 / 9;
}

.scene-page-head {
    padding: var(--card-pad) var(--card-pad) 0;
}

.scene-page-body {
    flex: 1 1 auto;
    min-block-size: 0;
    padding: var(--card-pad);
}
</style>
