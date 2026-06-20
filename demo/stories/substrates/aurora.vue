<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { cn } from "../../../src/utils/cn";
import StoryPage from "../StoryPage.vue";
import {
    Configurator,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "../../../src/components/custom/configurator";
import { ExpandableContainer } from "../../../src/components/custom/expandable-container";
import { registerShortcut } from "../../../src/composables/keyboard";
import type { AuroraConfig } from "../../../src/components/custom/aurora";
import PresetPickerRow from "../aurora/PresetPickerRow.vue";
import AuroraStage from "../aurora/AuroraStage.vue";
import AuroraConfigDock from "../aurora/AuroraConfigDock.vue";
import {
    PRESETS,
    PRESET_KEYS,
    PRESET_META,
    type PresetKey,
} from "../aurora/presets";
import { usePresetThumbnails } from "../aurora/usePresetThumbnails";

/**
 * Aurora playground — Claude Design bundle v4.1 implemented in Vue.
 *
 * Layout: a fixed-height frame splits the viewport into a flexing stage and
 * a fixed-width config dock. The frame's height is the authority for the
 * row, so the dock's content height (which varies per layer) cannot leak
 * into the stage size — eliminates the wave-1 "canvas grows on layer
 * switch" defect at the source.
 *
 * Chrome composes `<Configurator>` — the studio shell (`stage` / `controls`
 * slots + `scrollMode="auto"` + glass-floating substrate).
 *
 * State composes `useConfiguratorState<AuroraConfig>` with
 * `cloneMode: "per-preset"`. Per-preset clone semantics preserve slider edits
 * when the user switches presets and returns.
 *
 * Fullscreen is owned by `ExpandableContainer` (corner button + Esc + body
 * scroll-lock + Teleport-to-body); the slot re-mounts in fullscreen, so
 * `AuroraStage` spins up a fresh GL context but the studio state survives.
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
// selectable non-default preset (presets-in-consumers — a blue sky is a theme, never the
// lead); /substrates/aurora reads warm-cream at rest.
const studio = useConfiguratorState<AuroraConfig>({
    presets: AURORA_PRESETS,
    initialPreset: "OPENAI_DAWN",
    cloneMode: "per-preset",
});

const currentKey = computed<PresetKey>(
    () => (studio.activePreset.value ?? "OPENAI_DAWN") as PresetKey,
);
const currentMeta = computed(() => PRESET_META[currentKey.value]);

function selectPreset(key: PresetKey) {
    studio.selectPreset(key);
}

const thumbs = usePresetThumbnails({ widthCss: 320, heightCss: 200 });

const activeLayer = ref<string>("medium");

onMounted(() => {
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
    "Drag a nucleus ring to move it. Arrow keys cycle presets · expand for fullscreen.",
]);

// Silence the unused-binding warning if currentMeta isn't referenced in
// the template below — kept for parity with the prior parallel state-machine
// surface in case consumer-side debug overlays read it.
void currentMeta;
</script>

<template>
    <!-- BC.W-PAGE-CHASSIS — routed through the ONE StoryPage chassis (the prior
         hand-rolled <header> + the <span class="text-display-3"> a11y defect are
         GONE). The audacious "Aurora" <h1> + the @mkbabb/glass-ui/aurora subpath chip
         + the scroll-shrink + the ONE glass card over the live aurora field are the
         chassis's; this page hosts the studio body. -->
    <StoryPage>
        <section class="flex flex-col gap-8">
            <!-- Preset picker — visible row of baked thumbnails. -->
            <PresetPickerRow
                :current="currentKey"
                :thumbs="thumbs.thumbs.value"
                @select="selectPreset"
            />

            <!--
              Stage + config dock. ExpandableContainer owns the fullscreen
              affordance; the slot below renders the same flex layout in
              both inline and fullscreen modes, with the height authority
              swapping from a constrained `min(78vh,720px)` to `h-full`.
            -->
            <div class="relative overflow-clip">
                <!-- The page declares its own live Aurora hero backdrop on its
                     manifest row (W-SB-STAGE) — the page's OWN substrate is the
                     bleed, so the prior hand-rolled pastel-radial wash behind the
                     studio frame retired (FD-substrate-pages §1). -->
                <ExpandableContainer button-position="left">
                    <template #default="{ fullscreen }">
                        <!-- BC.W-VIZ-AURORA (T3) — the inspector idiom made EXPLICIT:
                             stage left, controls RIGHT on desktop (`asideSide="right"`
                             is the Configurator default, pinned here so the studio's
                             right-side placement is a recorded contract the π asserts).
                             Below `lg` the layout falls to a single column (controls
                             stacked below the stage), Configurator-owned. -->
                        <Configurator
                            scroll-mode="never"
                            aside-side="right"
                            :class="cn(
                                'aurora-studio',
                                fullscreen
                                    ? 'h-screen w-screen rounded-none border-0'
                                    : 'h-[min(78vh,720px)] shadow-cartoon',
                            )"
                        >
                            <template #stage>
                                <!-- BC.W-VIZ-AURORA (T5) — :interactive enables the live
                                     pointer field (drag-swirl + flick-burst + the accel
                                     gel snap-back); the field is FED tick() from the
                                     aurora frame loop (proof:viz-interaction V4). -->
                                <AuroraStage :config="studio.config" :interactive="true" />
                            </template>
                            <template #controls>
                                <AuroraConfigDock
                                    :config="studio.config"
                                    :active-layer="activeLayer"
                                    :preset-key="currentKey"
                                    @update:active-layer="(v: string) => (activeLayer = v)"
                                    @reset="studio.resetCurrent"
                                />
                            </template>
                        </Configurator>
                    </template>
                </ExpandableContainer>
            </div>

            <!-- Hint prose, same pattern as the dock.vue story's notes footer. -->
            <aside class="flex flex-col gap-1 text-small text-muted-foreground">
                <p v-for="(line, i) in hintText" :key="i">{{ line }}</p>
            </aside>
        </section>
    </StoryPage>
</template>

<style scoped>
/* `prefers-reduced-transparency` honor is canonical: the studio shell
 * composes `<Configurator>` which uses `glass-floating` substrate, and
 * `src/styles/glass.css`'s PRT @media block lifts every
 * `--glass-opacity-{tier}` to 1 (opaque) under reduced-transparency.
 * No demo-local override needed — the substrate carries the contract. */
</style>
