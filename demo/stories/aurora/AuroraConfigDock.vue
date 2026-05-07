<script setup lang="ts">
import { RefreshCw } from "lucide-vue-next";
import { Button } from "../../../src/components/ui/button";
import { BouncyTabs } from "../../../src/components/custom/tabs";
import { DockLayerGroup, DockLayer } from "../../../src/components/custom/dock";
import type { AuroraConfig } from "../../../src/components/custom/aurora";
import CompositionLayer from "./config/CompositionLayer.vue";
import FlowLayer from "./config/FlowLayer.vue";
import MediumLayer from "./config/MediumLayer.vue";
import NucleiLayer from "./config/NucleiLayer.vue";
import PaletteLayer from "./config/PaletteLayer.vue";
import TextureLayer from "./config/TextureLayer.vue";
import { layerOptions } from "./config/options";

defineProps<{
    config: AuroraConfig;
    activeLayer: string;
}>();

const emit = defineEmits<{
    (e: "update:activeLayer", v: string): void;
    (e: "reset"): void;
}>();

function activeLayerProxy(next: string) {
    emit("update:activeLayer", next);
}
</script>

<template>
    <div class="flex h-full flex-col">
        <!-- Header with reset -->
        <div class="flex items-center justify-between gap-2 border-b border-border/40 px-3 py-2">
            <p class="text-admin-label text-muted-foreground">Configurator</p>
            <Button
                variant="ghost"
                size="sm"
                class="h-7 gap-1.5 px-2 text-caption"
                :aria-label="'Reset current preset'"
                @click="emit('reset')"
            >
                <RefreshCw :size="12" />
                Reset
            </Button>
        </div>

        <!--
          Pill-tab switcher above the layer stack. DockLayerGroup keeps its
          crossfade transition but its built-in icon rail is hidden via
          `:show-rail="false"` — full labels in a pill row are clearer than
          a column of single-letter glyphs. `overflow="scroll"` swaps the
          inline-grid for an intrinsic-width flex row so 6 tabs in a 300px
          parent don't truncate (R2 §A — was clipping "Nuclei").
        -->
        <div class="border-b border-border/40 px-3 py-2">
            <BouncyTabs
                :options="[...layerOptions]"
                :model-value="activeLayer"
                variant="pill"
                overflow="scroll"
                @update:model-value="activeLayerProxy"
            />
        </div>
        <!--
          Layer content scrolls vertically + clips horizontally so a wide
          layer body (e.g. PaletteLayer's 344px min-w) does not bleed
          through the Configurator aside's translucent edge into the
          aurora canvas (R2 §A). `scroll-fade-y` indicates scroll
          affordance. The outer `<Configurator scroll-mode="never">`
          (aurora.vue) cedes scroll ownership to this host so the
          BouncyTabs row can stick at the top while the layer body
          scrolls beneath.
        -->
        <div class="flex-1 min-h-0 overflow-y-auto overflow-x-clip scroll-fade-y scrollbar-hidden">
            <DockLayerGroup
                :active="activeLayer"
                @update:active="activeLayerProxy"
                orientation="vertical"
                :show-rail="false"
            >
                <!-- ── Medium ─────────────────────────────────────────────── -->
                <DockLayer id="medium" label="Medium">
                    <MediumLayer :config="config" />
                </DockLayer>

                <!-- ── Palette ───────────────────────────────────────────── -->
                <DockLayer id="palette" label="Palette">
                    <PaletteLayer :config="config" />
                </DockLayer>

                <!-- ── Flow ──────────────────────────────────────────────── -->
                <DockLayer id="flow" label="Flow">
                    <FlowLayer :config="config" />
                </DockLayer>

                <!-- ── Texture ───────────────────────────────────────────── -->
                <DockLayer id="texture" label="Texture">
                    <TextureLayer :config="config" />
                </DockLayer>

                <!-- ── Composition ───────────────────────────────────────── -->
                <DockLayer id="composition" label="Comp">
                    <CompositionLayer :config="config" />
                </DockLayer>

                <!-- ── Nuclei ────────────────────────────────────────────── -->
                <DockLayer id="nuclei" label="Nuclei">
                    <NucleiLayer :config="config" />
                </DockLayer>
            </DockLayerGroup>
        </div>
    </div>
</template>
