<script setup lang="ts">
// BD.W-DOCK-CORE (A10 / II.5) — the tab bar is now ONE `<GlassDock>` whose content IS the
// library `<SegmentedTabs>` tabs facility + an in-dock "+" `<DockIconButton>` that SPLITS
// (the SHIPPED fission engine, WIRED). The hand-rolled `.tb-dock` + `.tb-sheet` two-plate
// facsimile ("two docks in one") is DELETED — clean break, no alias. The compose surface is
// the dock MORPHING/SPLITTING (a real fission), not a second plate. All names are GENERIC
// (Tab 1–4 / Action A–C) — no real product names.
import { ref, useTemplateRef } from "vue";
import { Plus, Star, Bookmark, Bell } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import { SegmentedTabs } from "@glass/components/custom/tabs";
import {
    GlassDock,
    DockIconButton,
    DockSeparator,
} from "@glass/components/custom/dock";

import type { Component } from "vue";

const tab = ref("t1");
const tabOptions = [
    { value: "t1", label: "Tab 1" },
    { value: "t2", label: "Tab 2" },
    { value: "t3", label: "Tab 3" },
    { value: "t4", label: "Tab 4" },
];
// value → glyph (the tab bar is icon-first; SegmentedTabs renders labels by default, so the
// #option slot swaps in a glyph while the accessible label stays the source).
const tabGlyph: Record<string, Component> = {
    t1: Star,
    t2: Bookmark,
    t3: Bell,
    t4: Plus,
};

// The compose actions DETACH from the dock as fission pieces (the "+" splits the dock into
// these action chips, gooing apart, then merges back).
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>("dockRef");
const isSplit = ref(false);

function toggleCompose(): void {
    dockRef.value?.toggleSplit();
    isSplit.value = !isSplit.value;
}
</script>

<template>
    <DockExampleTile
        label="Tab bar"
        hint="ONE GlassDock · SegmentedTabs · + SPLITS the dock"
        style="--dock-island-reach-override: 5rem"
    >
        <template #bg>
            <div class="tb-bg" />
        </template>

        <!-- ONE GlassDock — the tabs facility lives INSIDE it; the "+" SPLITS it (fission).
             The compose actions DETACH DOWNWARD into a sibling island dock (below the source
             pill, inside the tile) — a real fission: the chips fly off + goo-neck + land in a
             SECOND dock plate. `split-placement="below"` + a tile-local reach keep the island
             on-screen inside the gallery tile. -->
        <GlassDock
            ref="dockRef"
            always-expanded
            splittable
            split-context="search"
            split-placement="below"
            density="comfortable"
            class="tb-glass-dock"
        >
            <div class="tb-row">
                <SegmentedTabs
                    v-model="tab"
                    :options="tabOptions"
                    aria-label="Sections"
                    class="tb-tabs"
                >
                    <template #option="{ option }">
                        <component
                            :is="tabGlyph[option.value]"
                            class="size-5"
                            :aria-label="option.label"
                        />
                    </template>
                </SegmentedTabs>

                <DockSeparator />

                <!-- the "+" SPLITS the dock: the three compose actions DETACH from the
                     source pill (they retract into the goo neck) and MIGRATE into the
                     sibling island dock below (the #split slot). Click toggles split↔merge;
                     the rotate marks the open state. -->
                <DockIconButton
                    :aria-expanded="isSplit"
                    aria-label="Compose"
                    :class="{ 'tb-add--open': isSplit }"
                    @click="toggleCompose"
                >
                    <Plus class="size-5" />
                </DockIconButton>

                <!-- the three compose actions live in the source pill at rest; on split
                     they retract (the SHIPPED fission — they fade into the goo neck). -->
                <DockIconButton
                    data-dock-splittable
                    aria-label="Action A"
                    class="tb-action-chip"
                >
                    <span class="tb-action-glyph">A</span>
                </DockIconButton>
                <DockIconButton
                    data-dock-splittable
                    aria-label="Action B"
                    class="tb-action-chip"
                >
                    <span class="tb-action-glyph">B</span>
                </DockIconButton>
                <DockIconButton
                    data-dock-splittable
                    aria-label="Action C"
                    class="tb-action-chip"
                >
                    <span class="tb-action-glyph">C</span>
                </DockIconButton>
            </div>

            <!-- the SIBLING ISLAND dock content — the detached compose actions land here
                 (a SECOND dock below the source pill, goo-necked to it). The source pieces
                 retract as these arrive — the content MIGRATES into the new dock. -->
            <template #split>
                <div class="tb-island-row">
                    <button type="button" class="tb-island-chip" aria-label="Action A">A</button>
                    <button type="button" class="tb-island-chip" aria-label="Action B">B</button>
                    <button type="button" class="tb-island-chip" aria-label="Action C">C</button>
                </div>
            </template>
        </GlassDock>
    </DockExampleTile>
</template>

<style scoped>
.tb-bg {
    background:
        radial-gradient(120% 90% at 22% 18%, oklch(0.85 0.08 70 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 88% 84%, oklch(0.8 0.1 45 / 0.82), transparent 55%),
        linear-gradient(150deg, oklch(0.89 0.05 80), oklch(0.83 0.08 55));
}

.tb-glass-dock {
    position: relative;
}

.tb-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}
.tb-tabs {
    flex: 0 1 auto;
    min-inline-size: 0;
}
.tb-add--open {
    rotate: 45deg;
}

/* the compose action chips — a soft warm-cream tinted plate so they read as discrete
   chips when they detach (the fission goo bridges them back to the dock body). */
.tb-action-chip {
    background: color-mix(in oklab, var(--foreground) 8%, transparent);
}
.tb-action-glyph {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--foreground);
}

/* the detached island dock's content — the migrated compose actions as a row of chips. */
.tb-island-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.tb-island-chip {
    display: grid;
    place-items: center;
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: 999px;
    border: none;
    background: color-mix(in oklab, var(--foreground) 10%, transparent);
    color: var(--foreground);
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
}
.tb-island-chip:hover {
    background: color-mix(in oklab, var(--foreground) 16%, transparent);
}
</style>
