<script setup lang="ts">
// display/buttons — the landing-tile vignette (BI.W-LIVE-TILES, the AUTHORED rung).
// A real Button emphasis cluster at rest — the
// live component the /display landing curates, never a silhouette. Inert + 0-GL by
// the fenced stage (SectionPreviewCard); no own rAF.
import { Button } from "@glass/components/button";
</script>

<template>
    <div class="buttons-tile">
        <Button emphasis="primary" size="sm" tabindex="-1">Primary</Button>
        <div class="buttons-tile-row">
            <Button size="sm" tabindex="-1">Default</Button>
            <Button emphasis="quiet" size="sm" tabindex="-1">Quiet</Button>
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
