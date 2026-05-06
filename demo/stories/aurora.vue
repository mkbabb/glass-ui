<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { cn } from "@/utils/cn";
import { Configurator } from "@/components/custom/configurator";
import { ExpandableContainer } from "@/components/custom/expandable-container";
import { registerShortcut } from "@/composables/useKeyboardShortcuts";
import { TooltipProvider } from "@/components/ui/tooltip";
import PresetPickerRow from "./aurora/PresetPickerRow.vue";
import AuroraStage from "./aurora/AuroraStage.vue";
import AuroraConfigDock from "./aurora/AuroraConfigDock.vue";
import { useAuroraStudio } from "./aurora/useAuroraStudio";
import { usePresetThumbnails } from "./aurora/usePresetThumbnails";

/**
 * Aurora playground — Claude Design bundle v4.1 implemented in Vue.
 *
 * Layout: a fixed-height frame splits the viewport into a flexing stage and
 * a fixed-width config dock. The frame's height is the authority for the
 * row, so the dock's content height (which varies per layer) cannot leak
 * into the stage size — eliminates the wave-1 "canvas grows on layer
 * switch" defect at the source.
 *
 * Chrome composes `<Configurator>` (J.W4.A) — the canonical studio shell
 * (`stage` / `controls` slots + `scrollMode="auto"` + glass-floating
 * substrate). The studio state stays in `useAuroraStudio` because aurora
 * needs per-preset live clones (preserving slider edits across preset
 * switches), which differs from `useConfiguratorState`'s single-config
 * baseline-restore semantics.
 *
 * Fullscreen is owned by `ExpandableContainer` (corner button + Esc + body
 * scroll-lock + Teleport-to-body); the slot re-mounts in fullscreen, so
 * `AuroraStage` spins up a fresh GL context but the studio state survives.
 */

const studio = useAuroraStudio("OPENAI_SKY");
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
</script>

<template>
    <TooltipProvider :delay-duration="300">
        <section class="flex flex-col gap-8">
            <!-- Preset picker — visible row of baked thumbnails. -->
            <PresetPickerRow
                :current="studio.current.value"
                :thumbs="thumbs.thumbs.value"
                @select="studio.selectPreset"
            />

            <!--
              Stage + config dock. ExpandableContainer owns the fullscreen
              affordance; the slot below renders the same flex layout in
              both inline and fullscreen modes, with the height authority
              swapping from a constrained `min(78vh,720px)` to `h-full`.
            -->
            <div class="relative">
                <!-- Pastel wash behind the inline frame, mirrors intro.vue. -->
                <div
                    aria-hidden="true"
                    class="absolute -inset-6 -z-10 rounded-card opacity-60 blur-2xl"
                    :style="{
                        background:
                            'radial-gradient(ellipse 70% 55% at 20% 20%, color-mix(in srgb, var(--rainbow-pastel-red) 35%, transparent), transparent 60%), radial-gradient(ellipse 65% 50% at 80% 30%, color-mix(in srgb, var(--rainbow-pastel-blue) 30%, transparent), transparent 55%), radial-gradient(ellipse 70% 55% at 50% 90%, color-mix(in srgb, var(--rainbow-pastel-yellow) 25%, transparent), transparent 60%)',
                    }"
                />
                <ExpandableContainer button-position="left">
                    <template #default="{ fullscreen }">
                        <Configurator
                            scroll-mode="never"
                            :class="cn(
                                'aurora-studio',
                                fullscreen
                                    ? 'h-screen w-screen rounded-none border-0'
                                    : 'h-[min(78vh,720px)] shadow-cartoon',
                            )"
                        >
                            <template #stage>
                                <AuroraStage :config="studio.currentConfig.value" />
                            </template>
                            <template #controls>
                                <AuroraConfigDock
                                    :config="studio.currentConfig.value"
                                    :active-layer="activeLayer"
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
    </TooltipProvider>
</template>

<style scoped>
/* `prefers-reduced-transparency` honor is canonical: the studio shell
 * composes `<Configurator>` which uses `glass-floating` substrate, and
 * `src/styles/glass.css`'s PRT @media block lifts every
 * `--glass-opacity-{tier}` to 1 (opaque) under reduced-transparency.
 * No demo-local override needed — the substrate carries the contract. */
</style>
