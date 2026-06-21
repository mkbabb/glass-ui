<script setup lang="ts">
import { ref } from "vue";
import { Volume2, VolumeX } from "@lucide/vue";
const open = ref(false);
</script>
<template>
    <div class="volhud-tile">
        <div class="volhud-bg" aria-hidden="true" />
        <div class="volhud-stage">
            <button
                type="button"
                class="volhud-dock"
                :class="{ 'is-open': open }"
                :aria-pressed="open"
                aria-label="Toggle the volume HUD"
                @click="open = !open"
            >
                <!-- REST: the wide horizontal pill (icon + level bar) -->
                <span class="volhud-pill">
                    <span class="volhud-pill-icon"><Volume2 class="size-5" /></span>
                    <span class="volhud-pill-track">
                        <span class="volhud-pill-fill" />
                    </span>
                </span>
                <!-- OPEN: the tall vertical HUD column -->
                <span class="volhud-column" aria-hidden="true">
                    <span class="volhud-col-icon volhud-col-icon--top">
                        <Volume2 class="size-5" />
                    </span>
                    <span class="volhud-col-track">
                        <span class="volhud-col-fill">
                            <span class="volhud-col-value">60</span>
                        </span>
                    </span>
                    <span class="volhud-col-icon volhud-col-icon--bottom">
                        <VolumeX class="size-4" />
                    </span>
                </span>
            </button>
        </div>
        <p class="volhud-caption">
            <span class="volhud-label">Volume HUD</span>
            <span class="volhud-hint">pill to vertical HUD</span>
        </p>
    </div>
</template>
<style scoped>
.volhud-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-card);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 8%, transparent);
}
/* warm ROSE backdrop */
.volhud-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
        radial-gradient(120% 90% at 22% 18%, oklch(0.82 0.1 20 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 88% 84%, oklch(0.8 0.11 8 / 0.82), transparent 55%),
        linear-gradient(150deg, oklch(0.88 0.05 30), oklch(0.81 0.09 12));
}
.volhud-stage {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-block-size: 17rem;
    padding: 1.5rem;
    --ex-spring: cubic-bezier(0.34, 1.32, 0.5, 1);
    --ex-ease: cubic-bezier(0.16, 1, 0.3, 1);
}
.volhud-caption {
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
.volhud-label {
    font-size: 0.85rem;
    font-weight: 650;
    color: var(--foreground);
}
.volhud-hint {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.68rem;
    color: var(--muted-foreground);
}

/* ── the morphing dock plate: wide pill → tall column ──────────────────────── */
.volhud-dock {
    position: relative;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: var(--foreground);
    text-align: start;
    inline-size: 12rem;
    block-size: 3.4rem;
    padding: 0 1rem;
    border-radius: 1.7rem;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
    transition:
        inline-size 0.55s var(--ex-spring),
        block-size 0.55s var(--ex-spring),
        border-radius 0.55s var(--ex-spring),
        padding 0.5s var(--ex-spring);
}
.volhud-dock.is-open {
    inline-size: 4.5rem;
    block-size: 15rem;
    padding: 0.9rem 0;
    border-radius: 2.1rem;
}

/* REST layout — the horizontal pill */
.volhud-pill {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    inline-size: 100%;
    opacity: 1;
    transition: opacity 0.28s var(--ex-ease) 0.1s;
}
.volhud-dock.is-open .volhud-pill {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 0.2s var(--ex-ease);
}
.volhud-pill-icon {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    color: var(--foreground);
}
.volhud-pill-track {
    flex: 1 1 auto;
    block-size: 0.45rem;
    border-radius: 0.3rem;
    overflow: hidden;
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
}
.volhud-pill-fill {
    display: block;
    inline-size: 60%;
    block-size: 100%;
    border-radius: 0.3rem;
    background: linear-gradient(90deg, oklch(0.72 0.16 18), oklch(0.78 0.13 30));
}

/* OPEN layout — the vertical column */
.volhud-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    block-size: 100%;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.28s var(--ex-ease);
}
.volhud-dock.is-open .volhud-column {
    max-block-size: 14rem;
    opacity: 1;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.4s var(--ex-ease) 0.14s;
}
.volhud-col-icon {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    color: var(--foreground);
}
.volhud-col-icon--bottom {
    color: var(--muted-foreground);
}
.volhud-col-track {
    position: relative;
    flex: 1 1 auto;
    inline-size: 1.6rem;
    border-radius: 0.8rem;
    overflow: hidden;
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
}
.volhud-col-fill {
    position: absolute;
    inset-inline: 0;
    inset-block-end: 0;
    block-size: 60%;
    border-radius: 0.8rem;
    background: linear-gradient(0deg, oklch(0.72 0.16 18), oklch(0.79 0.13 32));
    display: grid;
    place-items: start center;
    padding-block-start: 0.5rem;
}
.volhud-col-value {
    font-size: 0.78rem;
    font-weight: 650;
    color: white;
    font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
    .volhud-dock,
    .volhud-pill,
    .volhud-column {
        transition-duration: 0.01ms !important;
    }
}
</style>
