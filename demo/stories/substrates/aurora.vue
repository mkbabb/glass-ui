<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/custom/configurator";
import { registerShortcut } from "@glass/composables/keyboard";
import type { AuroraConfig } from "@glass/components/custom/aurora";
import VizStudio from "./VizStudio.vue";
import PresetPickerRow from "./aurora/PresetPickerRow.vue";
import AuroraStage from "./aurora/AuroraStage.vue";
import AuroraConfigDock from "./aurora/AuroraConfigDock.vue";
import {
    PRESETS,
    PRESET_KEYS,
    PRESET_META,
    type PresetKey,
} from "./aurora/presets";
import { mediumOptions } from "./aurora/config/options";
import { usePresetThumbnails } from "./aurora/usePresetThumbnails";

/**
 * Aurora studio — the FIRST exemplar of the shared VizStudio chassis
 * (BC.W-VIZ-CONFIGURATOR-SUITE). The configurator-on-the-RIGHT + the rounded
 * studio frame + the audacious shrink-on-scroll hero + the explicit
 * @mkbabb/glass-ui/aurora Fira-Code subpath chip are the SHARED chassis's
 * (VizStudio composes StoryPage + <Configurator asideSide="right"> + the rounded
 * clip) — aurora no longer hand-rolls the studio frame (the single-writer chassis
 * discipline). The viz's OWN parts are the three slots:
 *   - #stage    — AuroraStage (the live GL field, interactive pointer swirl).
 *   - #controls — AuroraConfigDock (the FULL config schema, every axis a live
 *                 <ConfiguratorRow> over <ConfiguratorLayer> sections, the
 *                 <ColorSwatch> palette editor — never a two-state Switch).
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

// BC.W-TEAL-NAVY-PURGE — the studio LEADS with the warm-cream identity (the warm Dawn
// coral/amber preset), NOT the blue OPENAI_SKY sky theme. Sky survives as a named,
// selectable non-default preset (presets-in-consumers — a blue sky is a theme, never
// the lead); /substrates/aurora reads warm-cream at rest.
const studio = useConfiguratorState<AuroraConfig>({
    presets: AURORA_PRESETS,
    initialPreset: "OPENAI_DAWN",
    cloneMode: "per-preset",
});

const currentKey = computed<PresetKey>(
    () => (studio.activePreset.value ?? "OPENAI_DAWN") as PresetKey,
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

    const unregLeft = registerShortcut(
        "ArrowLeft",
        () => studio.cyclePreset(-1),
        { label: "Previous preset", group: "Aurora", allowInInput: false },
    );
    const unregRight = registerShortcut(
        "ArrowRight",
        () => studio.cyclePreset(1),
        { label: "Next preset", group: "Aurora", allowInInput: false },
    );
    const unregReset = registerShortcut(
        "Mod+Shift+R",
        () => studio.resetCurrent(),
        { label: "Reset preset", group: "Aurora", preventDefault: true },
    );

    onBeforeUnmount(() => {
        unregLeft();
        unregRight();
        unregReset();
    });
});

const hintText = computed(() => [
    "Drag inside the stage to swirl the field.",
    "alt-click to spawn a nucleus · shift-click or right-click a ring to remove.",
    "Drag a nucleus ring to move it. Arrow keys cycle presets.",
]);
</script>

<template>
    <!-- BC.W-VIZ-CONFIGURATOR-SUITE — aurora composes the SHARED VizStudio chassis
         (the configurator-RIGHT + rounded + hero-subpath shape every viz obeys),
         passing its own three slots. The preset row's REAL baked thumbnails ride
         the #presets slot; the live field rides #stage; the FULL config schema rides
         #controls. -->
    <VizStudio
        heading="Aurora"
        label="procedural painterly gradients · multi-nuclei · four mediums"
        blurb="A WebGPU-first procedural painterly gradient field — multi-nuclei composition, four mediums (smooth · oil · oil-pastel · van-Gogh) + the anisotropic-Kuwahara finish, cursor-driven swirl. Drag inside the stage to swirl the field; alt-click to spawn a nucleus. The configurator on the RIGHT drives EVERY axis: the OKLCh palette (the per-stop ColorSwatch editor), the composition (medium · zones · arrangement), the motion register, the warp/noise. The warm-cream Dawn identity is the default lead; the blue Sky is a named non-default preset. Shipped /aurora."
        height-class="h-[min(78vh,720px)]"
        scroll-mode="never"
    >
        <!-- BG.W-CHASSIS-ADOPT-OR-RETIRE — the studio identity is the ONE StoryHeader
             cluster the adopted VizStudio/StoryPage chassis renders (eyebrow → subpath
             → the audacious display <h1> "Aurora" → blurb, rendered ONCE). The prior
             inline #masthead <header> ("Aurora Studio" at text-display-3) restated the
             page identity a SECOND time at display scale — the forbidden double-header;
             it is EXCISED at the source AND the masthead slot is removed from the
             chassis root so no viz can re-author its identity. -->

        <!-- The REAL baked-thumbnail preset row (the dead-card fix: usePresetThumbnails
             AWAITS armAsync before renderAt on the WebGPU backend). -->
        <template #presets>
            <PresetPickerRow
                :current="currentKey"
                :thumbs="thumbs.thumbs.value"
                @select="selectPreset"
            />
        </template>

        <!-- The live GL field, interactive (drag-swirl + flick-burst + the accel
             gel snap-back); the field is FED tick() from the aurora frame loop. The
             #stage content carries its own rounded-card overflow-hidden reaching the
             canvas pixels (AuroraStage owns it). -->
        <template #stage>
            <AuroraStage :config="studio.config" :interactive="true" />
        </template>

        <!-- The FULL config schema — the layered Color → Composition → Motion →
             Warp&Noise → Nuclei stack (every axis a live ConfiguratorRow, the
             per-stop ColorSwatch palette editor) — never a two-state Switch. -->
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
