<script setup lang="ts">
// A bottom TAB BAR dock for the dock-morph gallery. REST: a compact horizontal glass
// pill with 4 tab icons + a sliding glass-tint highlight (the morphing iOS tab
// indicator). OPEN: tapping the trailing "+" grows the bar UPWARD into a compose sheet
// revealing 3 quick-action rows above the pinned tab row.
import { ref } from "vue";
import { House, Search, Compass, User, Plus, FileText, ListChecks, Image } from "@lucide/vue";

const open = ref(false);
const selectedIndex = ref(0);

const tabs = [
    { icon: House, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Compass, label: "Explore" },
    { icon: User, label: "Profile" },
];

const actions = [
    { icon: FileText, label: "New Note" },
    { icon: ListChecks, label: "New List" },
    { icon: Image, label: "New Photo" },
];
</script>

<template>
    <div class="tabbar-tile">
        <div class="tabbar-bg" aria-hidden="true" />
        <div class="tabbar-stage">
            <button
                type="button"
                class="tabbar-dock"
                :class="{ 'is-open': open }"
                :aria-pressed="open"
                aria-label="Toggle the compose sheet"
                @click="open = !open"
            >
                <!-- the compose sheet — quick-action rows revealed above the tab row -->
                <span class="tabbar-sheet">
                    <span
                        v-for="a in actions"
                        :key="a.label"
                        class="tabbar-action"
                    >
                        <span class="tabbar-action-icon"><component :is="a.icon" class="size-4" /></span>
                        <span class="tabbar-action-label">{{ a.label }}</span>
                    </span>
                </span>
                <!-- the pinned tab row -->
                <span class="tabbar-row">
                    <span
                        class="tabbar-indicator"
                        :style="{ '--i': selectedIndex }"
                        aria-hidden="true"
                    />
                    <span
                        v-for="(t, i) in tabs"
                        :key="t.label"
                        class="tabbar-tab"
                        :class="{ 'is-active': i === selectedIndex }"
                        @click.stop="selectedIndex = i"
                    >
                        <component :is="t.icon" class="size-5" />
                    </span>
                    <span class="tabbar-add" :class="{ 'is-open': open }" aria-hidden="true">
                        <Plus class="size-5" />
                    </span>
                </span>
            </button>
        </div>
        <p class="tabbar-caption">
            <span class="tabbar-label">Tab bar</span>
            <span class="tabbar-hint">tabs slide · + to compose</span>
        </p>
    </div>
</template>

<style scoped>
.tabbar-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-card);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 8%, transparent);
}
/* warm AMBER gradient backdrop the glass reads against */
.tabbar-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
        radial-gradient(120% 90% at 22% 18%, oklch(0.85 0.08 70 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 88% 84%, oklch(0.8 0.1 45 / 0.82), transparent 55%),
        linear-gradient(150deg, oklch(0.89 0.05 80), oklch(0.83 0.08 55));
}
.tabbar-stage {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-block-size: 17rem;
    padding: 1.5rem;
    --ex-spring: cubic-bezier(0.34, 1.32, 0.5, 1);
    --ex-ease: cubic-bezier(0.16, 1, 0.3, 1);
}
.tabbar-caption {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.85rem 1.1rem;
    background: color-mix(in oklab, var(--card), transparent 12%);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-block-start: 1px solid color-mix(in oklab, var(--foreground) 8%, transparent);
}
.tabbar-label {
    font-size: 0.85rem;
    font-weight: 650;
    color: var(--foreground);
}
.tabbar-hint {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.68rem;
    color: var(--muted-foreground);
}

/* the glass plate — the bar grows UPWARD (block-end anchored) on open */
.tabbar-dock {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    color: var(--foreground);
    text-align: start;
    inline-size: 17rem;
    padding: 0.4rem;
    border-radius: 1.6rem;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
    transition: border-radius 0.55s var(--ex-spring);
}
.tabbar-dock.is-open {
    border-radius: 1.9rem;
}

/* the compose sheet — collapsed (zero height + faded) at rest, revealed on open */
.tabbar-sheet {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    padding-inline: 0.35rem;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.35s var(--ex-ease),
        padding-block 0.55s var(--ex-spring);
}
.tabbar-dock.is-open .tabbar-sheet {
    max-block-size: 11rem;
    opacity: 1;
    padding-block: 0.55rem 0.45rem;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.4s var(--ex-ease) 0.12s,
        padding-block 0.55s var(--ex-spring);
}
.tabbar-action {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.5rem 0.55rem;
    border-radius: 0.85rem;
    transition: background 0.3s var(--ex-ease);
}
.tabbar-action:hover {
    background: color-mix(in oklab, var(--foreground) 6%, transparent);
}
.tabbar-action-icon {
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
.tabbar-action-label {
    font-size: 0.82rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* the pinned tab row — 4 tabs + the sliding indicator + the trailing add */
.tabbar-row {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr) auto;
    align-items: center;
    gap: 0.15rem;
}
.tabbar-indicator {
    position: absolute;
    z-index: 0;
    inset-block: 0;
    inset-inline-start: 0;
    /* one tab column = (100% of the four-tab span) / 4; the add button is auto-sized
       and sits outside this track, so the indicator walks the four equal columns */
    inline-size: calc((100% - 2.6rem) / 4);
    border-radius: 0.85rem;
    background: var(--dock-control-active-bg, color-mix(in oklab, var(--foreground) 10%, transparent));
    box-shadow: inset 0 0 0 0.5px color-mix(in oklab, white, transparent 70%);
    transform: translateX(calc(var(--i, 0) * 100%));
    transition: transform 0.5s var(--ex-spring);
}
.tabbar-tab {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    block-size: 2.9rem;
    border-radius: 0.85rem;
    color: color-mix(in oklab, var(--foreground), transparent 42%);
    transition: color 0.3s var(--ex-ease);
}
.tabbar-tab.is-active {
    color: var(--foreground);
}
.tabbar-add {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    inline-size: 2.6rem;
    block-size: 2.9rem;
    border-radius: 0.85rem;
    margin-inline-start: 0.15rem;
    color: var(--foreground);
    background: color-mix(in oklab, var(--foreground) 8%, transparent);
    transition: transform 0.5s var(--ex-spring), background 0.3s var(--ex-ease);
}
.tabbar-add.is-open {
    transform: rotate(45deg);
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
}

@media (prefers-reduced-motion: reduce) {
    .tabbar-dock,
    .tabbar-sheet,
    .tabbar-indicator,
    .tabbar-tab,
    .tabbar-add {
        transition-duration: 0.01ms !important;
    }
}
</style>
