<script setup lang="ts">
// BE.W-LIQUID-MORPH gallery — APP SWITCHER. REST: a compact glass pill showing a 2x2
// grid of 4 tiny app dots + an "Apps" label. OPEN: morphs into a wider app-switcher
// card revealing a 2x3 grid of 6 gradient app cards (each a distinct oklch hue + a
// lucide glyph + a label beneath), the dots cross-fading into the full grid with a
// per-card stagger. Self-contained, demo-only — tap to morph.
import { ref } from "vue";
import { Folder, Image, Music, FileText, Map, Mail } from "@lucide/vue";

const open = ref(false);

// the 6 app cards — each its own oklch hue, warm-cream-compatible (no raw brand hex)
const apps = [
    { icon: Folder, label: "Files", hue: 250 },
    { icon: Image, label: "Photos", hue: 320 },
    { icon: Music, label: "Music", hue: 28 },
    { icon: FileText, label: "Notes", hue: 80 },
    { icon: Map, label: "Maps", hue: 150 },
    { icon: Mail, label: "Mail", hue: 210 },
];
</script>

<template>
    <div class="appsw-tile">
        <div class="appsw-bg" aria-hidden="true" />
        <div class="appsw-stage">
            <button
                type="button"
                class="appsw-dock"
                :class="{ 'is-open': open }"
                :aria-pressed="open"
                aria-label="Toggle the app switcher"
                @click="open = !open"
            >
                <!-- REST: a 2x2 grid of tiny app dots + the "Apps" label -->
                <span class="appsw-rest">
                    <span class="appsw-dots" aria-hidden="true">
                        <i v-for="a in apps.slice(0, 4)" :key="a.label"
                           :style="{ '--h': a.hue }" />
                    </span>
                    <span class="appsw-rest-label">Apps</span>
                </span>

                <!-- OPEN: the full 2x3 app-card grid, revealed with a per-card stagger -->
                <span class="appsw-grid">
                    <span
                        v-for="(a, i) in apps"
                        :key="a.label"
                        class="appsw-card"
                        :style="{ '--i': i }"
                    >
                        <span class="appsw-icon" :style="{ '--h': a.hue }">
                            <component :is="a.icon" class="size-5" />
                        </span>
                        <span class="appsw-card-label">{{ a.label }}</span>
                    </span>
                </span>
            </button>
        </div>
        <p class="appsw-caption">
            <span class="appsw-label">App switcher</span>
            <span class="appsw-hint">pill to app grid</span>
        </p>
    </div>
</template>

<style scoped>
.appsw-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-card);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 8%, transparent);
}
/* warm VIOLET static backdrop the glass reads against */
.appsw-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
        radial-gradient(120% 90% at 18% 14%, oklch(0.8 0.1 320 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 88% 84%, oklch(0.76 0.13 290 / 0.85), transparent 55%),
        linear-gradient(150deg, oklch(0.87 0.06 340), oklch(0.8 0.09 310));
}
.appsw-stage {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-block-size: 17rem;
    padding: 1.5rem;
    --ex-spring: cubic-bezier(0.34, 1.32, 0.5, 1);
    --ex-ease: cubic-bezier(0.16, 1, 0.3, 1);
}
.appsw-caption {
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
.appsw-label {
    font-size: 0.85rem;
    font-weight: 650;
    color: var(--foreground);
}
.appsw-hint {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.68rem;
    color: var(--muted-foreground);
}

/* the glass plate — the dock itself; grows from rest pill to switcher card */
.appsw-dock {
    position: relative;
    cursor: pointer;
    color: var(--foreground);
    text-align: start;
    inline-size: 9rem;
    padding: 0.55rem 0.7rem;
    border-radius: 1.5rem;
    overflow: hidden;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
    transition:
        inline-size 0.55s var(--ex-spring),
        padding 0.55s var(--ex-spring),
        border-radius 0.55s var(--ex-spring);
}
.appsw-dock.is-open {
    inline-size: 20rem;
    padding: 1rem;
    border-radius: 1.9rem;
}

/* ── REST: the compact 2x2 dot pill ──────────────────────────────────────── */
.appsw-rest {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    opacity: 1;
    transition: opacity 0.3s var(--ex-ease);
}
.appsw-dock.is-open .appsw-rest {
    opacity: 0;
    pointer-events: none;
    position: absolute;
}
.appsw-dots {
    display: grid;
    grid-template-columns: repeat(2, 0.85rem);
    grid-template-rows: repeat(2, 0.85rem);
    gap: 0.25rem;
    flex: 0 0 auto;
}
.appsw-dots i {
    border-radius: 0.28rem;
    background: linear-gradient(
        135deg,
        oklch(0.68 0.16 var(--h)),
        oklch(0.6 0.14 calc(var(--h) + 24))
    );
    box-shadow: inset 0 0 0 0.5px color-mix(in oklab, white, transparent 65%);
}
.appsw-rest-label {
    font-size: 0.82rem;
    font-weight: 650;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ── OPEN: the 2x3 app-card grid, hidden + collapsed at rest ──────────────── */
.appsw-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem 0.5rem;
    inline-size: 100%;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.35s var(--ex-ease);
}
.appsw-dock.is-open .appsw-grid {
    max-block-size: 13rem;
    opacity: 1;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.4s var(--ex-ease) 0.1s;
}
.appsw-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    /* each card pops in sequence — transform/opacity, staggered by --i */
    transform: translateY(0.6rem) scale(0.85);
    opacity: 0;
    transition:
        transform 0.45s var(--ex-spring),
        opacity 0.3s var(--ex-ease);
}
.appsw-dock.is-open .appsw-card {
    transform: translateY(0) scale(1);
    opacity: 1;
    transition:
        transform 0.45s var(--ex-spring) calc(0.12s + var(--i) * 0.05s),
        opacity 0.3s var(--ex-ease) calc(0.12s + var(--i) * 0.05s);
}
.appsw-icon {
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
.appsw-card-label {
    font-size: 0.7rem;
    font-weight: 550;
    color: color-mix(in oklab, var(--foreground), transparent 8%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 5rem;
}

@media (prefers-reduced-motion: reduce) {
    .appsw-dock,
    .appsw-rest,
    .appsw-grid,
    .appsw-card {
        transition-duration: 0.01ms !important;
    }
}
</style>
