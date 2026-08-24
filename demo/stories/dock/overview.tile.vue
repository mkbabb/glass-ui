<script setup lang="ts">
// dock/overview — authored landing-tile vignette.
// A mini live <GlassDock> — the HEAVIEST tile case (the headline primitive), a real
// glass dock with four icon controls at REST (one active). Inert + 0-GL by the
// fenced stage (SectionPreviewCard); no live substrate, no own rAF — the dock reads
// as the real component the /dock landing curates.
import { GlassDock, DockControl } from "@glass/components/dock";
import { Home, Search, Bell, Settings } from "@lucide/vue";
</script>

<template>
    <div class="dock-tile-wrap">
        <!-- [2026-08-10 · BK #47 W1 CURE] `:collapse="false"` is STATED, not defaulted.
             The tile is a REST vignette with no `#collapsed` face: under the restored
             `"closed"` default it would mount as an empty pill and the landing tile
             would show no controls at all. `false` is the force-pinned pole, which is
             what an inert tile wants. It read as expanded before only because an
             absent `collapse` was boolean-cast to `false` — same paint, by accident. -->
        <GlassDock :collapse="false" class="dock-tile">
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
