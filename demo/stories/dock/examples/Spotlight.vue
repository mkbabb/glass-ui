<script setup lang="ts">
import { ref } from "vue";
import { Search, Command, Box, FunctionSquare, FileCode, BookOpen } from "@lucide/vue";

const open = ref(false);

const results = [
    { icon: Box, title: "GlassDock", subtitle: "Component", hue: 255 },
    { icon: FunctionSquare, title: "useLiquidMorph", subtitle: "Composable", hue: 200 },
    { icon: FileCode, title: "liquid-morph.css", subtitle: "Style", hue: 150 },
    { icon: BookOpen, title: "Dock Gallery", subtitle: "Story", hue: 50 },
];
</script>

<template>
    <div class="spotlight-tile">
        <div class="spotlight-bg" aria-hidden="true" />
        <div class="spotlight-stage">
            <button
                type="button"
                class="spotlight-dock"
                :class="{ 'is-open': open }"
                :aria-pressed="open"
                aria-label="Toggle Spotlight search"
                @click="open = !open"
            >
                <div class="spotlight-field">
                    <Search class="spotlight-search-icon size-4" aria-hidden="true" />
                    <span v-if="!open" class="spotlight-placeholder">Spotlight Search</span>
                    <span v-else class="spotlight-query">
                        liquid g<span class="spotlight-caret" aria-hidden="true" />
                    </span>
                    <span v-if="!open" class="spotlight-cmd" aria-hidden="true">
                        <Command class="size-3" />K
                    </span>
                </div>

                <div class="spotlight-results">
                    <div
                        v-for="(r, i) in results"
                        :key="r.title"
                        class="spotlight-row"
                        :class="{ 'is-active': i === 0 }"
                    >
                        <span class="spotlight-glyph" :style="{ '--row-hue': r.hue }">
                            <component :is="r.icon" class="size-4" aria-hidden="true" />
                        </span>
                        <span class="spotlight-meta">
                            <span class="spotlight-row-title">{{ r.title }}</span>
                            <span class="spotlight-row-sub">{{ r.subtitle }}</span>
                        </span>
                    </div>
                </div>
            </button>
        </div>
        <p class="spotlight-caption">
            <span class="spotlight-label">Spotlight</span>
            <span class="spotlight-hint">search pill to results</span>
        </p>
    </div>
</template>

<style scoped>
.spotlight-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-card);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 8%, transparent);
}
.spotlight-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
        radial-gradient(120% 90% at 15% 10%, oklch(0.9 0.035 75 / 0.95), transparent 60%),
        radial-gradient(110% 100% at 90% 90%, oklch(0.82 0.045 55 / 0.9), transparent 65%),
        linear-gradient(150deg, oklch(0.87 0.04 70), oklch(0.83 0.045 60));
}
.spotlight-stage {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-block-size: 17rem;
    padding: 1.5rem;
    --ex-spring: cubic-bezier(0.34, 1.32, 0.5, 1);
    --ex-ease: cubic-bezier(0.16, 1, 0.3, 1);
}
.spotlight-caption {
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
.spotlight-label {
    font-size: 0.85rem;
    font-weight: 650;
    color: var(--foreground);
}
.spotlight-hint {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.68rem;
    color: var(--muted-foreground);
}

.spotlight-dock {
    position: relative;
    cursor: pointer;
    color: var(--foreground);
    text-align: start;
    inline-size: 16rem;
    padding: 0.4rem;
    border-radius: 1.4rem;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
    transition: inline-size 0.5s var(--ex-spring), border-radius 0.5s var(--ex-spring);
}
.spotlight-dock.is-open {
    inline-size: 18.5rem;
    border-radius: 1.1rem;
}

.spotlight-field {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.5rem 0.7rem;
    border-radius: 1rem;
}
.spotlight-search-icon {
    flex-shrink: 0;
    color: var(--muted-foreground);
}
.spotlight-placeholder {
    flex: 1;
    min-inline-size: 0;
    font-size: 0.85rem;
    color: var(--muted-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.spotlight-query {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: 550;
    color: var(--foreground);
    white-space: nowrap;
}
.spotlight-caret {
    display: inline-block;
    inline-size: 1.5px;
    block-size: 0.95rem;
    margin-inline-start: 1px;
    background: oklch(0.6 0.18 255);
    border-radius: 1px;
    animation: spotlight-blink 1.1s steps(1) infinite;
}
.spotlight-cmd {
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

.spotlight-results {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    padding-inline: 0.25rem;
    transition: max-block-size 0.5s var(--ex-spring), opacity 0.35s var(--ex-ease) 0.12s;
}
.spotlight-dock.is-open .spotlight-results {
    max-block-size: 14rem;
    opacity: 1;
    padding-block-end: 0.25rem;
}

.spotlight-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 0.5rem;
    border-radius: 0.7rem;
}
.spotlight-row.is-active {
    background: color-mix(in oklab, var(--foreground) 9%, transparent);
}
.spotlight-glyph {
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
.spotlight-meta {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
}
.spotlight-row-title {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.spotlight-row-sub {
    font-size: 0.68rem;
    color: var(--muted-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@keyframes spotlight-blink {
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
    .spotlight-dock,
    .spotlight-results {
        transition-duration: 0.01ms !important;
    }
    .spotlight-caret {
        animation: none !important;
    }
}
</style>
