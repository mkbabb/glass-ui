<script setup lang="ts">
// display/buttons — the landing-tile vignette (BI.W-LIVE-TILES, the AUTHORED rung).
// A real Button variant cluster (primary-audacious · glass · ghost) at REST — the
// live component the /display landing curates, never a silhouette. Inert + 0-GL by
// the fenced stage (SectionPreviewCard); no own rAF.
import { Button } from "@glass/components/ui/button";
</script>

<template>
    <div class="buttons-tile">
        <Button variant="primary-audacious" size="sm" tabindex="-1">Launch</Button>
        <div class="buttons-tile-row">
            <Button variant="glass" size="sm" tabindex="-1">Glass</Button>
            <Button variant="ghost" size="sm" tabindex="-1">Ghost</Button>
        </div>
    </div>
</template>

<style scoped>
.buttons-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(0.4rem, 6cqh, 0.85rem);
    padding: clamp(0.5rem, 10cqmin, 1.25rem);
}
.buttons-tile-row {
    display: flex;
    gap: clamp(0.4rem, 5cqw, 0.75rem);
}
</style>
