<script setup lang="ts">
// dock/overview — the landing-tile vignette (BI.W-LIVE-TILES, the AUTHORED rung).
// A mini live <GlassDock> — the HEAVIEST tile case (the headline primitive), a real
// glass dock with four icon controls at REST (one active). Inert + 0-GL by the
// fenced stage (SectionPreviewCard); no live substrate, no own rAF — the dock reads
// as the real component the /dock landing curates.
import { GlassDock, DockControl } from "@glass/components/dock";
import { Home, Search, Bell, Settings } from "@lucide/vue";
</script>

<template>
    <div class="dock-tile-wrap">
        <GlassDock class="dock-tile">
            <DockControl aria-label="Home"><Home :size="16" /></DockControl>
            <DockControl active aria-label="Search"><Search :size="16" /></DockControl>
            <DockControl aria-label="Notifications"><Bell :size="16" /></DockControl>
            <DockControl aria-label="Settings"><Settings :size="16" /></DockControl>
        </GlassDock>
    </div>
</template>

<style scoped>
.dock-tile-wrap {
    display: grid;
    place-items: center;
    padding: clamp(0.5rem, 8cqmin, 1.25rem);
}
/* let the dock scale to the tile — cqmin keeps it proportional at every card width
   without transform-scale text blur (the fit-crisp fence). */
.dock-tile {
    font-size: clamp(0.7rem, 7cqmin, 1rem);
}
</style>
