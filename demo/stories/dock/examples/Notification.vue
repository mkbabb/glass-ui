<script setup lang="ts">
// Notification — the compact pill BLOOMS into the expanded card + actions, on the REAL
// `useBloomUp` engine (audit §W10: "the Notification → useBloomUp as fits"). At REST a
// one-line pill (sender + a clamped preview); tapping BLOOMs a SEPARATE expanded card
// laid out at its FULL settled rect (the full message + a Reply/Open action row) FROM the
// pill's rect — transform/opacity/filter, NEVER an animated `-webkit-line-clamp`/
// `max-block-size` (the facsimile's layout-property defect). The expanded card lays out
// ONCE at its full footprint; the bloom is the compositor FLIP over it.
import { ref } from "vue";
import { MessageCircle } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import { useBloomUp } from "../../../../src/composables/motion/useBloomUp";

const open = ref(false);
const pillRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);

const bloom = useBloomUp(pillRef, cardRef, { preset: "snappy", blur: 4 });

function toggle(): void {
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
    <DockExampleTile
        label="Notification"
        hint="pill → expanded card + actions (useBloomUp)"
    >
        <template #bg>
            <div class="nt-bg" />
        </template>

        <!-- the compact pill — the bloom SOURCE. -->
        <button
            ref="pillRef"
            type="button"
            class="nt-pill"
            :class="{ 'nt-pill--hidden': open }"
            :aria-expanded="open"
            aria-label="Expand the notification"
            @click="toggle"
        >
            <span class="nt-icon"><MessageCircle class="size-4" /></span>
            <span class="nt-body">
                <span class="nt-row">
                    <span class="nt-title">New message</span>
                    <span class="nt-time">now</span>
                </span>
                <span class="nt-preview">The liquid dock morph is shipping…</span>
            </span>
        </button>

        <!-- the expanded card — a SEPARATE overlay, rendered only while open. Lays out at
             its FULL settled rect; useBloomUp FLIPs it FROM the pill's rect. -->
        <div
            v-if="open"
            ref="cardRef"
            class="nt-card"
            role="dialog"
            aria-label="Notification from New message"
        >
            <div class="nt-card-head">
                <span class="nt-icon"><MessageCircle class="size-4" /></span>
                <span class="nt-row nt-card-row">
                    <span class="nt-title">New message</span>
                    <span class="nt-time">now</span>
                </span>
            </div>
            <p class="nt-text">
                The liquid dock morph is shipping — want to see the Dynamic Island split?
                The pill carves into two activity islands, goo-necked as they part.
            </p>
            <div class="nt-actions">
                <button type="button" class="nt-act" @click="toggle">Reply</button>
                <button type="button" class="nt-act nt-act--primary" @click="toggle">
                    Open
                </button>
            </div>
        </div>
    </DockExampleTile>
</template>

<style scoped>
.nt-bg {
    background:
        radial-gradient(120% 90% at 22% 18%, oklch(0.76 0.13 250 / 0.85), transparent 60%),
        radial-gradient(110% 100% at 88% 82%, oklch(0.82 0.1 210 / 0.8), transparent 55%),
        linear-gradient(150deg, oklch(0.88 0.05 230), oklch(0.82 0.08 260));
}

/* the shared glass plate. */
.nt-pill,
.nt-card {
    color: var(--foreground);
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}

.nt-pill {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.7rem;
    align-items: center;
    inline-size: 17rem;
    padding: 0.7rem 0.8rem;
    border-radius: 1.2rem;
    cursor: pointer;
    text-align: start;
    opacity: 1;
    transition: opacity 0.2s var(--ex-ease);
}
.nt-pill--hidden {
    opacity: 0;
    pointer-events: none;
}
.nt-icon {
    display: grid;
    place-items: center;
    inline-size: 2.3rem;
    block-size: 2.3rem;
    border-radius: 0.7rem;
    background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.55 0.15 220));
    color: white;
}
.nt-body {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-inline-size: 0;
}
.nt-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
}
.nt-title {
    font-size: 0.82rem;
    font-weight: 650;
}
.nt-time {
    font-size: 0.66rem;
    color: var(--muted-foreground);
}
.nt-preview {
    font-size: 0.74rem;
    color: var(--muted-foreground);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 13rem;
}

/* the expanded card — the bloom DEST (lays out at full rect). */
.nt-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    inline-size: 18rem;
    padding: 0.85rem 0.9rem;
    border-radius: 1.3rem;
}
.nt-card-head {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}
.nt-card-row {
    flex: 1;
}
.nt-text {
    font-size: 0.78rem;
    line-height: 1.4;
    color: color-mix(in oklab, var(--foreground), transparent 10%);
}
.nt-actions {
    display: flex;
    gap: 0.5rem;
}
.nt-act {
    flex: 1 1 0;
    padding: 0.45rem 0.7rem;
    border-radius: 0.7rem;
    text-align: center;
    font-size: 0.76rem;
    font-weight: 600;
    background: color-mix(in oklab, var(--foreground) 9%, transparent);
    color: var(--foreground);
}
.nt-act--primary {
    background: oklch(0.62 0.16 250);
    color: white;
}
</style>
