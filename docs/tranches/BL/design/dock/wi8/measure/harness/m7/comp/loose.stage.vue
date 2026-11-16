<script setup lang="ts">
// MEASURE-7, G-15's loose cell (RU-56 as amended for C-7): DockControl outside any dock, as value.js's workbenches,
// daraksha's popovers and atlas use it. One current (active) control between two resting ones, on the stage's field.
// The `:root` fills reach it; the ink-derived fills declared on `.glass-dock` must not.
import { Grid3x3, Layers, Download } from "@lucide/vue";
import { DockControl } from "@glass/components/dock";
import DockScene from "./DockScene.vue";
</script>

<template>
    <DockScene place="center">
        <div class="loose-row" data-testid="loose-row" role="group" aria-label="Loose controls">
            <DockControl aria-label="Grid"><Grid3x3 aria-hidden="true" /></DockControl>
            <DockControl aria-label="Layers" :active="true" aria-current="true"><Layers aria-hidden="true" /></DockControl>
            <DockControl aria-label="Export"><Download aria-hidden="true" /></DockControl>
        </div>
    </DockScene>
</template>

<style scoped>
.loose-row {
    display: flex;
    gap: 0.5rem;
}
</style>
