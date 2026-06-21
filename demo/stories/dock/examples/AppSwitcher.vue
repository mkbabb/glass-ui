<script setup lang="ts">
// App switcher — the compact dot PILL BLOOMS into the 2×3 app-card grid, on the REAL
// `useBloomUp` engine (audit §W10: "AppSwitcher→useDockContextSilhouette as fits"; the
// silhouette engine is the context-SWITCH state machine — overkill for a single pill→grid
// morph, so the honest reuse is the bloom, which IS the shared-element FLIP this morph is).
// The facsimile animated the pill's `inline-size`/`padding` + the grid's `max-block-size`
// (layout properties); here the grid is a SEPARATE overlay laid out at its full settled
// rect that FLIPs from the pill (transform/opacity/filter only). Each card pops in on a
// compositor transform+opacity stagger that runs while the panel blooms.
import { ref } from "vue";
import { Folder, Image, Music, FileText, Map, Mail } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import { useBloomUp } from "../../../../src/composables/motion/useBloomUp";

const open = ref(false);
const pillRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

// each app card — its own oklch hue, warm-cream-compatible (no raw brand hex).
const apps = [
    { icon: Folder, label: "Files", hue: 250 },
    { icon: Image, label: "Photos", hue: 320 },
    { icon: Music, label: "Music", hue: 28 },
    { icon: FileText, label: "Notes", hue: 80 },
    { icon: Map, label: "Maps", hue: 150 },
    { icon: Mail, label: "Mail", hue: 210 },
];

// drives the per-card stagger: false at rest (cards collapsed), true once the panel is
// mounted+bloomed (the cards pop in sequence on a compositor transform).
const cardsIn = ref(false);

const bloom = useBloomUp(pillRef, gridRef, {
    preset: "bouncy",
    blur: 5,
    onBloomed: () => (cardsIn.value = true),
});

function toggle(): void {
    if (open.value) {
        cardsIn.value = false;
        bloom.reset();
        open.value = false;
        return;
    }
    open.value = true;
    requestAnimationFrame(() => bloom.bloom());
}
</script>

<template>
    <DockExampleTile label="App switcher" hint="dot pill → app grid (useBloomUp)">
        <template #bg>
            <div class="as-bg" />
        </template>

        <!-- the compact dot PILL — the bloom SOURCE. -->
        <button
            ref="pillRef"
            type="button"
            class="as-pill"
            :class="{ 'as-pill--hidden': open }"
            :aria-expanded="open"
            aria-label="Open the app switcher"
            @click="toggle"
        >
            <span class="as-dots" aria-hidden="true">
                <i v-for="a in apps.slice(0, 4)" :key="a.label" :style="{ '--h': a.hue }" />
            </span>
            <span class="as-pill-label">Apps</span>
        </button>

        <!-- the app-card grid — a SEPARATE overlay, rendered only while open. Lays out at
             its FULL settled rect; useBloomUp FLIPs it FROM the pill. -->
        <div
            v-if="open"
            ref="gridRef"
            class="as-grid"
            :class="{ 'as-grid--in': cardsIn }"
            role="dialog"
            aria-label="Apps"
        >
            <button
                v-for="(a, i) in apps"
                :key="a.label"
                type="button"
                class="as-card"
                :style="{ '--i': i }"
                @click="toggle"
            >
                <span class="as-icon" :style="{ '--h': a.hue }">
                    <component :is="a.icon" class="size-5" />
                </span>
                <span class="as-card-label">{{ a.label }}</span>
            </button>
        </div>
    </DockExampleTile>
</template>

<style scoped>
.as-bg {
    background:
        radial-gradient(120% 90% at 18% 14%, oklch(0.8 0.1 320 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 88% 84%, oklch(0.76 0.13 290 / 0.85), transparent 55%),
        linear-gradient(150deg, oklch(0.87 0.06 340), oklch(0.8 0.09 310));
}

/* the shared glass plate. */
.as-pill,
.as-grid {
    color: var(--foreground);
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}

.as-pill {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    inline-size: 9rem;
    padding: 0.55rem 0.7rem;
    border-radius: 1.5rem;
    cursor: pointer;
    text-align: start;
    opacity: 1;
    transition: opacity 0.2s var(--ex-ease);
}
.as-pill--hidden {
    opacity: 0;
    pointer-events: none;
}
.as-dots {
    display: grid;
    grid-template-columns: repeat(2, 0.85rem);
    grid-template-rows: repeat(2, 0.85rem);
    gap: 0.25rem;
    flex: 0 0 auto;
}
.as-dots i {
    border-radius: 0.28rem;
    background: linear-gradient(
        135deg,
        oklch(0.68 0.16 var(--h)),
        oklch(0.6 0.14 calc(var(--h) + 24))
    );
    box-shadow: inset 0 0 0 0.5px color-mix(in oklab, white, transparent 65%);
}
.as-pill-label {
    font-size: 0.82rem;
    font-weight: 650;
    white-space: nowrap;
}

/* the app-card grid — the bloom DEST. */
.as-grid {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem 0.55rem;
    inline-size: 20rem;
    padding: 1rem;
    border-radius: 1.9rem;
}
.as-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    /* each card pops in sequence — compositor transform/opacity, staggered by --i. At
       rest (panel not yet bloomed) the cards are collapsed; --in releases them. The
       stagger rides the SHIPPED --ex-snappy (the dock register), NOT a bespoke bezier. */
    transform: translateY(0.6rem) scale(0.85);
    opacity: 0;
    transition:
        transform var(--ex-snappy-duration, 0.34s) var(--ex-snappy),
        opacity 0.25s var(--ex-ease);
}
.as-grid--in .as-card {
    transform: translateY(0) scale(1);
    opacity: 1;
    transition:
        transform var(--ex-snappy-duration, 0.34s) var(--ex-snappy) calc(var(--i) * 0.04s),
        opacity 0.25s var(--ex-ease) calc(var(--i) * 0.04s);
}
.as-icon {
    display: grid;
    place-items: center;
    inline-size: 3rem;
    block-size: 3rem;
    border-radius: 0.85rem;
    color: white;
    background: linear-gradient(
        135deg,
        oklch(0.66 0.17 var(--h)),
        oklch(0.56 0.15 calc(var(--h) + 26))
    );
    box-shadow:
        inset 0 0 0 0.5px color-mix(in oklab, white, transparent 60%),
        0 2px 6px color-mix(in oklab, oklch(0.4 0.12 var(--h)), transparent 70%);
}
.as-card-label {
    font-size: 0.7rem;
    font-weight: 550;
    color: color-mix(in oklab, var(--foreground), transparent 8%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 5rem;
}
</style>
