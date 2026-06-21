<script setup lang="ts">
// Apple Music — the mini-player PILL blooms into the full player + a queue, on the REAL
// `useBloomUp` engine (audit §W10: "the Apple Music tile → useBloomUp (pill→player+
// queue)"). The dock is a small PILL (the bloom SOURCE, stays pill-sized); the player +
// queue card is a SEPARATE overlay that lays out at its FULL settled rect ONCE and BLOOMs
// from the pill's rect — transform/opacity/filter, NEVER a box-scale that crushes content
// (the WF-1 transient-crush fix). The pill's now-playing row and the player's own album
// row are the SAME FLIPping element (no orphan). The 4th color channel warms the tile
// FIELD toward the album's hue — "the whole world takes on the album's color."
import { ref } from "vue";
import { Play, Pause, SkipForward, SkipBack, ListMusic } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import { useBloomUp } from "../../../../src/composables/motion/useBloomUp";

const open = ref(false);
const pillRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);

// the album's dominant hue — the 4th color channel the bloom warms the FIELD toward.
// A complete <color>, demo-local (presets-in-consumers — never a library token).
const albumHue = "oklch(0.6 0.2 320)";

const queue = [
    { title: "The Beginning and the End", artist: "Shiro Sagisu" },
    { title: "Bloody Battle", artist: "Shiro Sagisu" },
    { title: "Thanatos", artist: "Loren & Mash" },
];

const bloom = useBloomUp(pillRef, cardRef, {
    preset: "bouncy", // the emphatic large-surface bloom (iOS-27 player register)
    blur: 5,
    fieldHue: albumHue, // warm the tile field toward the album's color
    fieldStrength: 8, // the bounded sub-perceptual ceiling
});

function toggle(): void {
    if (open.value) {
        bloom.reset();
        open.value = false;
        return;
    }
    open.value = true;
    // the card must be in the DOM + laid out at its full rect before we measure it, so we
    // bloom on the next frame (after v-if mounts the dest).
    requestAnimationFrame(() => bloom.bloom());
}
</script>

<template>
    <DockExampleTile label="Apple Music" hint="mini-player → player + queue (useBloomUp)">
        <template #bg>
            <div class="am-bg" />
        </template>

        <!-- the mini-player PILL — the bloom SOURCE (stays pill-sized). -->
        <button
            ref="pillRef"
            type="button"
            class="am-pill"
            :class="{ 'am-pill--hidden': open }"
            :aria-expanded="open"
            aria-label="Open the music player"
            @click="toggle"
        >
            <span class="am-album" />
            <span class="am-meta">
                <span class="am-title">You Are (Not) Alone</span>
                <span class="am-artist">Shiro Sagisu</span>
            </span>
            <span class="am-mini-play"><Play class="size-4" /></span>
        </button>

        <!-- the PLAYER + QUEUE card — a SEPARATE overlay, rendered only while open. Lays
             out at its FULL settled rect; useBloomUp FLIPs it FROM the pill's rect. -->
        <div
            v-if="open"
            ref="cardRef"
            class="am-card"
            role="dialog"
            aria-label="Now playing"
        >
            <div class="am-card-head">
                <span class="am-card-album" />
                <span class="am-card-meta">
                    <span class="am-card-title">You Are (Not) Alone</span>
                    <span class="am-card-artist">Shiro Sagisu</span>
                </span>
                <button
                    type="button"
                    class="am-card-play"
                    aria-label="Pause"
                    @click="toggle"
                >
                    <Pause class="size-5" />
                </button>
            </div>
            <div class="am-scrub"><span class="am-scrub-fill" /></div>
            <div class="am-transport">
                <button type="button" aria-label="Previous"><SkipBack class="size-5" /></button>
                <button type="button" aria-label="Next"><SkipForward class="size-5" /></button>
            </div>
            <div class="am-queue">
                <p class="am-queue-head"><ListMusic class="size-3.5" /> Up Next</p>
                <span v-for="q in queue" :key="q.title" class="am-queue-row">
                    <span class="am-queue-dot" />
                    <span class="am-queue-text">
                        <span class="am-queue-title">{{ q.title }}</span>
                        <span class="am-queue-artist">{{ q.artist }}</span>
                    </span>
                </span>
            </div>
        </div>
    </DockExampleTile>
</template>

<style scoped>
.am-bg {
    background:
        radial-gradient(120% 90% at 20% 15%, oklch(0.72 0.16 320 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 90% 80%, oklch(0.78 0.13 28 / 0.85), transparent 55%),
        linear-gradient(150deg, oklch(0.86 0.06 60), oklch(0.8 0.09 350));
}

/* the shared glass plate (the warm-cream floating tier — real backdrop-filter + rim). */
.am-pill,
.am-card {
    color: var(--foreground);
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}

/* the mini-player PILL — the bloom SOURCE. */
.am-pill {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.7rem;
    inline-size: 15rem;
    block-size: 3.6rem;
    padding: 0 0.7rem;
    border-radius: 1.6rem;
    cursor: pointer;
    text-align: start;
    /* the pill fades as the card blooms over it (they share the visual identity). The fade
       rides the SHIPPED --ex-ease (no overshoot). */
    opacity: 1;
    transition: opacity 0.22s var(--ex-ease);
}
.am-pill--hidden {
    opacity: 0;
    pointer-events: none;
}
.am-album {
    inline-size: 2.4rem;
    block-size: 2.4rem;
    border-radius: 0.5rem;
    background: linear-gradient(135deg, oklch(0.62 0.2 320), oklch(0.55 0.18 28));
    box-shadow: inset 0 0 0 0.5px color-mix(in oklab, white, transparent 60%);
}
.am-meta {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    gap: 0.05rem;
}
.am-title {
    font-size: 0.82rem;
    font-weight: 650;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 9rem;
}
.am-artist {
    font-size: 0.7rem;
    color: var(--muted-foreground);
}
.am-mini-play {
    display: grid;
    place-items: center;
    inline-size: 2.1rem;
    block-size: 2.1rem;
    border-radius: 50%;
    background: color-mix(in oklab, var(--foreground) 8%, transparent);
}

/* the PLAYER + QUEUE card — the bloom DEST (lays out at full rect; the bloom FLIPs it). */
.am-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    inline-size: 16rem;
    padding: 1.1rem 1rem 0.9rem;
    border-radius: 1.6rem;
}
.am-card-head {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.7rem;
}
.am-card-album {
    inline-size: 3.2rem;
    block-size: 3.2rem;
    border-radius: 0.7rem;
    background: linear-gradient(135deg, oklch(0.62 0.2 320), oklch(0.55 0.18 28));
    box-shadow: inset 0 0 0 0.5px color-mix(in oklab, white, transparent 60%);
}
.am-card-meta {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
}
.am-card-title {
    font-size: 0.86rem;
    font-weight: 650;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.am-card-artist {
    font-size: 0.72rem;
    color: var(--muted-foreground);
}
.am-card-play {
    display: grid;
    place-items: center;
    inline-size: 2.4rem;
    block-size: 2.4rem;
    border-radius: 50%;
    color: var(--foreground);
    background: color-mix(in oklab, var(--foreground) 10%, transparent);
}
.am-scrub {
    block-size: 4px;
    border-radius: 2px;
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
    overflow: hidden;
}
.am-scrub-fill {
    display: block;
    inline-size: 38%;
    block-size: 100%;
    border-radius: 2px;
    background: var(--foreground);
}
.am-transport {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    color: var(--foreground);
}
.am-queue {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding-block-start: 0.7rem;
    border-block-start: 1px solid color-mix(in oklab, var(--foreground) 9%, transparent);
}
.am-queue-head {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted-foreground);
}
.am-queue-row {
    display: flex;
    align-items: center;
    gap: 0.55rem;
}
.am-queue-dot {
    flex: 0 0 auto;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    border-radius: 0.35rem;
    background: linear-gradient(135deg, oklch(0.66 0.16 320), oklch(0.6 0.15 350));
}
.am-queue-text {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
}
.am-queue-title {
    font-size: 0.74rem;
    font-weight: 550;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 11rem;
}
.am-queue-artist {
    font-size: 0.64rem;
    color: var(--muted-foreground);
}
</style>
