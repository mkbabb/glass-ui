<!-- MEASURE-8 H7 (RU-83, C7-2): the wash-tier row, slides's case (slides npig, src/decks/parkway-lab/theme.css:38-44:
     `.deck-dock:not(.dark)` over a ridge band takes `--dock-plate-collapsed-tier: 0.86; --dock-plate-expanded-tier: 0.9`
     with its own ink). Here the two tier lines on one dock beside a default dock, both open, the same seats; slides's
     ink line (`--glass-veil-ink: light-dark(var(--pk-stock), var(--pk-night-plate))`) is its deck's colour and is not
     carried. In slides the rule reaches only a light dock (`:not(.dark)`); the row is shot in both schemes. -->
<script setup lang="ts">
import { ChevronLeft, ChevronRight, Home, Settings } from "@lucide/vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import DockScene from "./DockScene.vue";
</script>

<template>
    <DockScene place="bottom">
        <div style="display: flex; gap: 24px; align-items: center">
            <GlassDock :collapse="false" fit-content aria-label="Default tier">
                <DockControl aria-label="Home"><Home /></DockControl>
                <DockControl aria-label="Previous"><ChevronLeft /></DockControl>
                <DockControl aria-label="Next" aria-current="page"><ChevronRight /></DockControl>
                <DockControl aria-label="Settings"><Settings /></DockControl>
            </GlassDock>
            <GlassDock :collapse="false" fit-content aria-label="Wash tier" style="--dock-plate-collapsed-tier: 0.86; --dock-plate-expanded-tier: 0.9">
                <DockControl aria-label="Home"><Home /></DockControl>
                <DockControl aria-label="Previous"><ChevronLeft /></DockControl>
                <DockControl aria-label="Next" aria-current="page"><ChevronRight /></DockControl>
                <DockControl aria-label="Settings"><Settings /></DockControl>
            </GlassDock>
        </div>
    </DockScene>
</template>
