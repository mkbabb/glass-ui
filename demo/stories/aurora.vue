<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { cn } from "@/utils/cn";
import { Aurora, useCursorInteraction } from "@/components/custom/aurora";
import { registerShortcut } from "@/composables/useKeyboardShortcuts";
import PresetPickerRow from "./aurora/PresetPickerRow.vue";
import NucleiOverlay from "./aurora/NucleiOverlay.vue";
import AuroraConfigDock from "./aurora/AuroraConfigDock.vue";
import { useAuroraStudio } from "./aurora/useAuroraStudio";
import { usePresetThumbnails } from "./aurora/usePresetThumbnails";

/**
 * Aurora playground — Claude Design bundle v4.1 implemented in Vue.
 *
 * Layout is storybook-native: contained to the StoryPage `max-w-6xl` shell,
 * framed stage in a rounded-card with cartoon shadow so the shader reads as
 * art on paper rather than a screen floating in void.
 */

const studio = useAuroraStudio("OPENAI_SKY");
const thumbs = usePresetThumbnails({ widthCss: 320, heightCss: 200 });

const stageRef = ref<HTMLDivElement | null>(null);
const auroraRef = ref<InstanceType<typeof Aurora> | null>(null);

const activeLayer = ref<string>("medium");

// Cursor interaction: continuous swirl + nucleus CRUD via pointer events.
useCursorInteraction(stageRef, studio.currentConfig.value, {
    setCursor: (x, y, strength) => auroraRef.value?.setCursor(x, y, strength),
    clearCursor: () => auroraRef.value?.clearCursor(),
});

// Keyboard shortcuts.
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

const hintText = computed(() => {
    const lines = [
        "Drag inside the stage to swirl the field.",
        "alt-click to spawn a nucleus · shift-click or right-click a ring to remove.",
        "Drag a nucleus ring to move it. Arrow keys cycle presets.",
    ];
    return lines;
});
</script>

<template>
    <section class="flex flex-col gap-8">
        <!-- Preset picker — visible row of baked thumbnails. -->
        <PresetPickerRow
            :current="studio.current.value"
            :thumbs="thumbs.thumbs.value"
            @select="studio.selectPreset"
        />

        <!-- Stage + config dock. Pastel wash behind the card mirrors intro.vue. -->
        <div class="relative">
            <div
                aria-hidden="true"
                class="absolute -inset-6 -z-10 rounded-card opacity-60 blur-2xl"
                :style="{
                    background:
                        'radial-gradient(ellipse 70% 55% at 20% 20%, color-mix(in srgb, var(--rainbow-pastel-red) 35%, transparent), transparent 60%), radial-gradient(ellipse 65% 50% at 80% 30%, color-mix(in srgb, var(--rainbow-pastel-blue) 30%, transparent), transparent 55%), radial-gradient(ellipse 70% 55% at 50% 90%, color-mix(in srgb, var(--rainbow-pastel-yellow) 25%, transparent), transparent 60%)',
                }"
            />
            <div
                :class="cn(
                    'relative overflow-hidden rounded-card border border-border bg-card shadow-cartoon',
                    'grid grid-cols-1 gap-0 md:grid-cols-[1fr_auto]',
                )"
            >
                <div
                    ref="stageRef"
                    class="relative aspect-[16/10] cursor-crosshair touch-none select-none"
                >
                    <Aurora ref="auroraRef" :config="studio.currentConfig.value" />
                    <NucleiOverlay
                        :nuclei="studio.currentConfig.value.nuclei"
                        :dimmed="studio.currentConfig.value.medium === 'smooth'"
                    />
                    <div
                        class="pointer-events-none absolute bottom-3 right-3 text-mono-caption uppercase tracking-widest text-foreground/50 mix-blend-difference"
                    >
                        drag to swirl
                    </div>
                </div>
                <aside class="w-full border-t border-border/60 bg-background/20 md:w-[340px] md:border-l md:border-t-0">
                    <AuroraConfigDock
                        :config="studio.currentConfig.value"
                        :active-layer="activeLayer"
                        @update:active-layer="(v: string) => (activeLayer = v)"
                        @reset="studio.resetCurrent"
                    />
                </aside>
            </div>
        </div>

        <!-- Hint prose, same pattern as the dock.vue story's notes footer. -->
        <aside class="flex flex-col gap-1 text-small text-muted-foreground">
            <p v-for="(line, i) in hintText" :key="i">{{ line }}</p>
        </aside>
    </section>
</template>
