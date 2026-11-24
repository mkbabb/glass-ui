<script setup lang="ts">
// A run whose direct child is a box holding several seats, as color's dock (a
// DockLayerGroup) and glass's bottom dock (a tool group) author it. Centred, closed.
import { GlassDock, DockControl, DockSeparator } from "@glass/components/dock";
import { Home, Search, Bell, Settings, Star } from "@lucide/vue";
</script>

<template>
    <div class="gd-page">
        <GlassDock data-testid="group-dock" aria-label="group" collapse="closed">
            <DockControl aria-label="Home"><Home /></DockControl>
            <DockSeparator />
            <div class="gd-group" role="group" aria-label="Tools">
                <DockControl aria-label="Search"><Search /></DockControl>
                <DockControl aria-label="Notifications"><Bell /></DockControl>
                <DockControl aria-label="Favourite"><Star /></DockControl>
                <DockControl aria-label="Settings"><Settings /></DockControl>
            </div>
            <template #collapsed>
                <!-- fourier's FourierMark: a glyph sized off the dock's height
                     (FourierMark.vue:18-19 at fourier main), 40.69 px at the house scale -->
                <svg class="gd-mark" data-testid="group-seal" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
                    <circle cx="50" cy="50" r="37.92" fill="none" stroke="currentColor" stroke-width="6.16" />
                </svg>
            </template>
        </GlassDock>
    </div>
</template>

<style scoped>
.gd-page {
    display: flex;
    justify-content: center;
    padding-top: 24px;
}
.gd-mark {
    inline-size: calc(var(--dock-h) * 0.74);
    block-size: calc(var(--dock-h) * 0.74);
}
.gd-group {
    display: flex;
    align-items: center;
    gap: var(--dock-layer-gap, 0.375rem);
}
</style>
