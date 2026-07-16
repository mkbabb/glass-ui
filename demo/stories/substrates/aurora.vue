<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
import { registerShortcut } from "@glass/composables/keyboard";
import type { AuroraConfig } from "@glass/components/aurora";
import VizStudio from "./_frame/VizStudio.vue";
import PresetPickerRow from "./aurora/PresetPickerRow.vue";
import AuroraStage from "./aurora/AuroraStage.vue";
import AuroraConfigDock from "./aurora/AuroraConfigDock.vue";
import { PRESETS, PRESET_KEYS, PRESET_META, type PresetKey } from "./aurora/presets";
import { mediumOptions } from "./aurora/config/options";
import { usePresetThumbnails } from "./aurora/usePresetThumbnails";

/**
 * Aurora studio — the FIRST exemplar of the shared VizStudio chassis
 * (BC.W-VIZ-CONFIGURATOR-SUITE). VizStudio owns the page and controls-right
 * frame; Aurora supplies three subject-specific slots:
 *   - #stage    — AuroraStage (pointer-movement shaping plus nucleus gestures).
 *   - #controls — AuroraConfigDock (the FULL config schema, every axis a live
 *                 <ConfiguratorRow> over <ConfiguratorLayer> sections, the
 *                 color-swatch palette editor — never a two-state Switch).
 *   - #presets  — PresetPickerRow (the baked-thumbnail preset row; the thumbnail
 *                 capture AWAITS armAsync on the WebGPU backend — no dead cards).
 *
 * State composes `useConfiguratorState<AuroraConfig>` with `cloneMode:"per-preset"`
 * — the named-editable-baseline semantic (slider edits survive a preset round-trip).
 */

// Build the canonical ConfiguratorPreset descriptors from the authored
// PRESETS + PRESET_META tables. Each descriptor's `config` is the immutable
// baseline; useConfiguratorState owns the per-preset live clones.
const AURORA_PRESETS: ConfiguratorPreset<AuroraConfig>[] = PRESET_KEYS.map((key) => ({
    key,
    label: PRESET_META[key].label,
    sub: PRESET_META[key].sub,
    config: PRESETS[key],
}));

// BI.W-AURORA-VIBRANCY (UF-E1) — the studio LEADS with the warm-vivid SETTING_SUN (the
// pink-note horizon), the setting-sun candidate-A default. It supersedes the prior warm
// Dawn lead (still a named, selectable preset); the blue OPENAI_SKY survives as a
// non-default theme (presets-in-consumers — a blue sky is a theme, never the lead).
// /substrates/aurora reads warm-vivid-sunset at rest. This is also the W-FIELD-CORE /
// W-E10 entrance verify surface (the T-38 aurora-pointer + the palette-honest entrance).
const studio = useConfiguratorState<AuroraConfig>({
    presets: AURORA_PRESETS,
    initialPreset: "SETTING_SUN",
    cloneMode: "per-preset",
});

const currentKey = computed<PresetKey>(
    () => (studio.activePreset.value ?? "SETTING_SUN") as PresetKey,
);

function selectPreset(key: PresetKey) {
    studio.selectPreset(key);
}

const thumbs = usePresetThumbnails({ widthCss: 320, heightCss: 200 });

const activeLayer = ref<string>("medium");
const route = useRoute();

onMounted(() => {
    // BG.W-AUR-METAL-FINISH — the deterministic capture-surfacing param. The C18
    // capture harness (?capture=/substrates/aurora&mode=X) renders the default smooth
    // Dawn lead; an &aurmedium=metal|metal-gradient|kuwahara override forces the opt-in
    // medium so BOTH engines (Chrome + off-screen Safari) render it with ZERO
    // interaction. The capture boot forwards the outer param onto the route query
    // (history-mode push drops the outer search string), so the story reads it here.
    const q = route.query.aurmedium;
    const forced = typeof q === "string" ? q : undefined;
    const forcedOpt = forced
        ? mediumOptions.find((o) => o.value === forced)
        : undefined;
    if (forcedOpt) {
        // The metal variants ride the warm-metal baseline (the folds catch the light);
        // kuwahara / any other medium forces on the current lead preset.
        if (forcedOpt.value === "metal" || forcedOpt.value === "metal-gradient")
            studio.selectPreset("METAL");
        studio.config.medium = forcedOpt.value;
    }

    const unregLeft = registerShortcut("ArrowLeft", () => studio.cyclePreset(-1), {
        label: "Previous preset",
        group: "Aurora",
        allowInInput: false,
    });
    const unregRight = registerShortcut("ArrowRight", () => studio.cyclePreset(1), {
        label: "Next preset",
        group: "Aurora",
        allowInInput: false,
    });
    const unregReset = registerShortcut("Mod+Shift+R", () => studio.resetCurrent(), {
        label: "Reset preset",
        group: "Aurora",
        preventDefault: true,
    });

    onBeforeUnmount(() => {
        unregLeft();
        unregRight();
        unregReset();
    });
});

const hintText = computed(() => [
    "Move inside the stage to shape the field.",
    "alt-click to spawn a nucleus · shift-click or right-click a ring to remove.",
    "Drag a nucleus ring to move it. Arrow keys cycle presets.",
]);
</script>

<template>
    <!-- The preset row's baked thumbnails ride
         the #presets slot; the live field rides #stage; the FULL config schema rides
         #controls. -->
    <VizStudio
        heading="Aurora"
        label="procedural painterly gradients · multi-nuclei · four mediums"
        blurb="A WebGPU-first procedural painterly gradient field — multi-nuclei composition, four mediums (smooth · oil · oil-pastel · van-Gogh) + the anisotropic-Kuwahara finish. Move inside the stage to shape the field; drag a nucleus ring to move it, or alt-click to add one. The configurator on the RIGHT drives EVERY axis: the OKLCh palette (the per-stop color editor), the composition (medium · zones · arrangement), the motion register, and the warp/noise. The warm-cream Dawn identity is the default lead; the blue Sky is a named non-default preset. Shipped /aurora."
        height-class="h-[min(86vh,880px)]"
        scroll-mode="never"
        gallery-placement="top"
    >
        <!-- BG.W-PRESET-RIBBON-TOP — the presets are a LARGE full-width TOP RIBBON.
             The `gallery-placement="top"` axis (threaded through VizStudio to the ONE
             library <Configurator>) lifts the gallery OUT of the 360px aside gutter and
             pins it spanning BOTH columns up-top; the stage + controls reclaim the full
             height in row 2 (configurator.css `[data-gallery="top"]`). The REAL baked-
             thumbnail preset row (the dead-card fix: usePresetThumbnails AWAITS armAsync
             before renderAt on the WebGPU backend) fills the ribbon, its φ-tall tiles
             LARGE (≥72px) and FadingScroll-overflow-clipped. -->
        <template #presets>
            <PresetPickerRow
                :current="currentKey"
                :thumbs="thumbs.thumbs.value"
                @select="selectPreset"
            />
        </template>

        <!-- Pointer movement shapes the live field and feeds its velocity-derived burst;
             dragging is reserved for moving a nucleus ring. AuroraStage owns the
             canvas-reaching rounded clip inside VizStudio's aperture. -->
        <template #stage>
            <AuroraStage :config="studio.config" :interactive="true" />
        </template>

        <!-- The FULL config schema — the layered Color → Composition → Motion →
             Warp&Noise → Nuclei stack (every axis a live ConfiguratorRow, the
             per-stop color editor) — never a two-state Switch. -->
        <template #controls>
            <AuroraConfigDock
                :config="studio.config"
                :active-layer="activeLayer"
                :preset-key="currentKey"
                @update:active-layer="(v: string) => (activeLayer = v)"
                @reset="studio.resetCurrent"
            />
        </template>

        <!-- Hint prose below the studio frame. -->
        <aside class="flex flex-col gap-1 text-small text-muted-foreground">
            <p v-for="(line, i) in hintText" :key="i">{{ line }}</p>
        </aside>
    </VizStudio>
</template>

<style scoped>
/* `prefers-reduced-transparency` honor is canonical: the studio shell composes
 * <Configurator> (via VizStudio) which uses the `glass-floating` substrate, and
 * `src/styles/glass.css`'s PRT @media block lifts every `--glass-opacity-{tier}` to
 * 1 (opaque) under reduced-transparency. No demo-local override needed — the
 * substrate carries the contract. */
</style>
