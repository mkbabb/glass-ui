<script setup lang="ts">
// Spotlight — the search PILL BLOOMS into the results panel, on the REAL `useBloomUp`
// engine (audit §W10: "Spotlight→the search silhouette … as fits"). The search pill is
// the bloom SOURCE; the query field at the top of the results panel is the SAME FLIPping
// element (the search-silhouette idiom — the pill's magnifier flips into the panel's
// field, no orphan). The facsimile animated the pill's `inline-size` + the results'
// `max-block-size` (two layout properties); here the panel is a SEPARATE overlay laid out
// at its full settled rect that FLIPs from the pill (transform/opacity/filter only).
import { ref } from "vue";
import { Search, Command, Box, FunctionSquare, FileCode, BookOpen } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import { useBloomUp } from "@glass/composables/motion/useBloomUp";

const open = ref(false);
const pillRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);

const bloom = useBloomUp(pillRef, panelRef, { preset: "bouncy", blur: 5 });

function toggle(): void {
    if (open.value) {
        bloom.reset();
        open.value = false;
        return;
    }
    open.value = true;
    requestAnimationFrame(() => bloom.bloom());
}

const results = [
    { icon: Box, title: "GlassDock", subtitle: "Component", hue: 255 },
    { icon: FunctionSquare, title: "useBloomUp", subtitle: "Composable", hue: 200 },
    { icon: FileCode, title: "liquid-morph.css", subtitle: "Style", hue: 150 },
    { icon: BookOpen, title: "Dock Gallery", subtitle: "Story", hue: 50 },
];
</script>

<template>
    <DockExampleTile label="Spotlight" hint="search pill → results panel (useBloomUp)">
        <template #bg>
            <div class="sp-bg" />
        </template>

        <!-- the search PILL — the bloom SOURCE (its magnifier flips into the panel field). -->
        <button
            ref="pillRef"
            type="button"
            class="sp-pill"
            :class="{ 'sp-pill--hidden': open }"
            :aria-expanded="open"
            aria-label="Open Spotlight search"
            @click="toggle"
        >
            <Search class="sp-icon size-4" aria-hidden="true" />
            <span class="sp-placeholder">Spotlight Search</span>
            <span class="sp-cmd" aria-hidden="true"><Command class="size-3" />K</span>
        </button>

        <!-- the results panel — a SEPARATE overlay, rendered only while open. Lays out at
             its FULL settled rect; useBloomUp FLIPs it FROM the pill. -->
        <div
            v-if="open"
            ref="panelRef"
            class="sp-panel"
            role="dialog"
            aria-label="Spotlight results"
        >
            <button type="button" class="sp-field" @click="toggle">
                <Search class="sp-icon size-4" aria-hidden="true" />
                <span class="sp-query">liquid g<span class="sp-caret" aria-hidden="true" /></span>
            </button>
            <div class="sp-results">
                <div
                    v-for="(r, i) in results"
                    :key="r.title"
                    class="sp-row"
                    :class="{ 'is-active': i === 0 }"
                >
                    <span class="sp-glyph" :style="{ '--row-hue': r.hue }">
                        <component :is="r.icon" class="size-4" aria-hidden="true" />
                    </span>
                    <span class="sp-meta">
                        <span class="sp-row-title">{{ r.title }}</span>
                        <span class="sp-row-sub">{{ r.subtitle }}</span>
                    </span>
                </div>
            </div>
        </div>
    </DockExampleTile>
</template>

<style scoped>
.sp-bg {
    background:
        radial-gradient(120% 90% at 15% 10%, oklch(0.9 0.035 75 / 0.95), transparent 60%),
        radial-gradient(110% 100% at 90% 90%, oklch(0.82 0.045 55 / 0.9), transparent 65%),
        linear-gradient(150deg, oklch(0.87 0.04 70), oklch(0.83 0.045 60));
}

/* the shared glass plate. */
.sp-pill,
.sp-panel {
    color: var(--foreground);
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}

.sp-pill {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    inline-size: 16rem;
    padding: 0.7rem 0.9rem;
    border-radius: 1.4rem;
    cursor: pointer;
    text-align: start;
    opacity: 1;
    transition: opacity 0.2s var(--ex-ease);
}
.sp-pill--hidden {
    opacity: 0;
    pointer-events: none;
}
.sp-icon {
    flex-shrink: 0;
    color: var(--muted-foreground);
}
.sp-placeholder {
    flex: 1;
    min-inline-size: 0;
    font-size: 0.85rem;
    color: var(--muted-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.sp-cmd {
    display: inline-flex;
    align-items: center;
    gap: 0.1rem;
    flex-shrink: 0;
    padding: 0.15rem 0.35rem;
    border-radius: 0.4rem;
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--muted-foreground);
    background: color-mix(in oklab, var(--foreground) 7%, transparent);
}

/* the results panel — the bloom DEST. */
.sp-panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    inline-size: 18.5rem;
    padding: 0.4rem;
    border-radius: 1.4rem;
}
.sp-field {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.5rem 0.7rem;
    border-radius: 1rem;
    text-align: start;
    color: var(--foreground);
}
.sp-query {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: 550;
    color: var(--foreground);
    white-space: nowrap;
}
.sp-caret {
    display: inline-block;
    inline-size: 1.5px;
    block-size: 0.95rem;
    margin-inline-start: 1px;
    background: oklch(0.6 0.18 255);
    border-radius: 1px;
    animation: sp-blink 1.1s steps(1) infinite;
}
.sp-results {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.1rem 0.25rem 0.25rem;
}
.sp-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 0.5rem;
    border-radius: 0.7rem;
}
.sp-row.is-active {
    background: color-mix(in oklab, var(--foreground) 9%, transparent);
}
.sp-glyph {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    inline-size: 1.8rem;
    block-size: 1.8rem;
    border-radius: 0.55rem;
    color: oklch(0.99 0.01 var(--row-hue));
    background: linear-gradient(
        145deg,
        oklch(0.72 0.16 var(--row-hue)),
        oklch(0.55 0.18 var(--row-hue))
    );
    box-shadow: inset 0 0.5px 0 rgb(255 255 255 / 0.3);
}
.sp-meta {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
}
.sp-row-title {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.sp-row-sub {
    font-size: 0.68rem;
    color: var(--muted-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@keyframes sp-blink {
    0%,
    50% {
        opacity: 1;
    }
    50.01%,
    100% {
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .sp-caret {
        animation: none !important;
    }
}
</style>
