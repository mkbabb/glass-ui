<script setup lang="ts">
// Tab bar — the tab strip rides the REAL `<SegmentedTabs>` engine (audit §W10:
// "TabBar→<SegmentedTabs>"), and the trailing "+" BLOOMS a compose sheet on the REAL
// `useBloomUp` engine. The facsimile hand-rolled the sliding indicator (a `--i` translateX
// off a bespoke spring-bezier) AND animated the sheet's `max-block-size` (a layout
// property). Both die here: the indicator is `<SegmentedTabs>`'s own elastic spring-clocked
// glass plate (the W-TABS engine — squish-on-travel, the calibrated --tab-indicator-
// duration), and the compose sheet is a SEPARATE overlay laid out at its full rect that
// FLIPs from the "+" button (transform/opacity/filter, no layout animation).
import { ref } from "vue";
import { House, Search, Compass, User, Plus, FileText, ListChecks, Image } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import { SegmentedTabs } from "../../../../src/components/custom/tabs";
import { useBloomUp } from "../../../../src/composables/motion/useBloomUp";

import type { Component } from "vue";

const tab = ref("home");
const tabOptions = [
    { value: "home", label: "Home" },
    { value: "search", label: "Search" },
    { value: "explore", label: "Explore" },
    { value: "profile", label: "Profile" },
];
// value → glyph (the tab bar is icon-first; SegmentedTabs renders labels by default, so
// the #option slot swaps in the lucide glyph while the accessible label stays the source).
const tabGlyph: Record<string, Component> = {
    home: House,
    search: Search,
    explore: Compass,
    profile: User,
};

const actions = [
    { icon: FileText, label: "New Note" },
    { icon: ListChecks, label: "New List" },
    { icon: Image, label: "New Photo" },
];

const open = ref(false);
const addRef = ref<HTMLElement | null>(null);
const sheetRef = ref<HTMLElement | null>(null);

// the compose sheet blooms FROM the "+" button (the bloom SOURCE).
const bloom = useBloomUp(addRef, sheetRef, { preset: "bouncy", blur: 5 });

function toggleCompose(): void {
    if (open.value) {
        bloom.reset();
        open.value = false;
        return;
    }
    open.value = true;
    requestAnimationFrame(() => bloom.bloom());
}
</script>

<template>
    <DockExampleTile label="Tab bar" hint="SegmentedTabs strip · + blooms a compose sheet">
        <template #bg>
            <div class="tb-bg" />
        </template>

        <div class="tb-dock">
            <!-- the pinned tab row — the REAL SegmentedTabs engine (its own spring-clocked
                 elastic glass indicator; NO facsimile --i translateX). -->
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
                <button
                    ref="addRef"
                    type="button"
                    class="tb-add"
                    :class="{ 'tb-add--open': open }"
                    :aria-expanded="open"
                    aria-label="Compose"
                    @click="toggleCompose"
                >
                    <Plus class="size-5" />
                </button>
            </div>
        </div>

        <!-- the compose sheet — a SEPARATE overlay, rendered only while open. Lays out at
             its FULL settled rect; useBloomUp FLIPs it FROM the "+" button. -->
        <div
            v-if="open"
            ref="sheetRef"
            class="tb-sheet"
            role="dialog"
            aria-label="Compose"
        >
            <button
                v-for="a in actions"
                :key="a.label"
                type="button"
                class="tb-action"
                @click="toggleCompose"
            >
                <span class="tb-action-icon"><component :is="a.icon" class="size-4" /></span>
                <span class="tb-action-label">{{ a.label }}</span>
            </button>
        </div>
    </DockExampleTile>
</template>

<style scoped>
.tb-bg {
    background:
        radial-gradient(120% 90% at 22% 18%, oklch(0.85 0.08 70 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 88% 84%, oklch(0.8 0.1 45 / 0.82), transparent 55%),
        linear-gradient(150deg, oklch(0.89 0.05 80), oklch(0.83 0.08 55));
}

/* the glass dock plate. */
.tb-dock {
    inline-size: 18rem;
    padding: 0.4rem;
    border-radius: 1.6rem;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}
.tb-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}
.tb-tabs {
    flex: 1 1 auto;
    min-inline-size: 0;
}
.tb-add {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    inline-size: 2.6rem;
    block-size: 2.6rem;
    border-radius: 0.85rem;
    color: var(--foreground);
    background: color-mix(in oklab, var(--foreground) 8%, transparent);
    /* the "+" rotates to "×" on open — the SHIPPED --ex-snappy (the dock register), NOT a
       bespoke spring-bezier. The bloom owns the sheet; this is the trigger affordance. */
    transition:
        rotate var(--ex-snappy-duration, 0.34s) var(--ex-snappy),
        background 0.2s var(--ex-ease);
}
.tb-add--open {
    rotate: 45deg;
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
}

/* the compose sheet — the bloom DEST. */
.tb-sheet {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    inline-size: 16rem;
    padding: 0.5rem;
    border-radius: 1.6rem;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}
.tb-action {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.5rem 0.55rem;
    border-radius: 0.85rem;
    text-align: start;
    color: var(--foreground);
    transition: background 0.2s var(--ex-ease);
}
.tb-action:hover {
    background: color-mix(in oklab, var(--foreground) 6%, transparent);
}
.tb-action-icon {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    inline-size: 2.1rem;
    block-size: 2.1rem;
    border-radius: 0.65rem;
    color: white;
    background: linear-gradient(135deg, oklch(0.72 0.14 70), oklch(0.65 0.13 45));
    box-shadow: inset 0 0 0 0.5px color-mix(in oklab, white, transparent 60%);
}
.tb-action-label {
    font-size: 0.82rem;
    font-weight: 600;
    white-space: nowrap;
}
</style>
