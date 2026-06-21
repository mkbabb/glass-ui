<script setup lang="ts">
// BE.W-LIQUID-MORPH — the DOCK GALLERY. The companion to the liquid-playground LAB:
// where the lab is ONE configurable dock with the live spring engine + aurora, the
// gallery is the BREADTH — many distinct, recognizable iOS surfaces the dock MORPHS
// into, each a self-contained interactive tile (tap to morph). Each tile rides a STATIC
// warm-gradient backdrop (NOT a live GL context — the one-GL-per-route budget keeps the
// aurora in the lab); the glass still reads against the gradient.
//
// The morph here is the CSS-transition register (toggle `.is-open`, the morph props
// transition on a spring-bezier) — the lab proves the keyframes.js spring; the gallery
// proves the VOCABULARY of dock shapes. Compositor-friendly where it counts (transform
// + opacity for the reveals; the box grow is a brief small-card transition).
import { ref } from "vue";
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Phone,
    PhoneOff,
    Mic,
    MicOff,
    Video,
    Bell,
    MessageCircle,
    Star,
    ListMusic,
} from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import TabBar from "./examples/TabBar.vue";
import VolumeHUD from "./examples/VolumeHUD.vue";
import Spotlight from "./examples/Spotlight.vue";
import AppSwitcher from "./examples/AppSwitcher.vue";

// each example owns one open flag — tap the dock to morph it.
const playerOpen = ref(false);
const callOpen = ref(false);
const notifOpen = ref(false);

const queue = [
    { title: "The Beginning and the End", artist: "Shiro Sagisu" },
    { title: "Bloody Battle", artist: "Shiro Sagisu" },
    { title: "Thanatos", artist: "Loren & Mash" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Dock morphs — the shape-shifting protagonist"
            gap="md"
        >
            <p class="text-small text-muted-foreground">
                The companion to the <strong>liquid playground</strong> lab — the
                BREADTH of shapes the dock morphs into. Each tile is a distinct iOS
                surface; <strong>tap the dock</strong> to morph it. (The lab proves the
                live spring engine + aurora; this proves the vocabulary.)
            </p>

            <div class="dock-ex-grid">
                <!-- ═══ APPLE MUSIC — mini-player → player + a SEPARATE queue panel ═══ -->
                <div class="dock-ex-tile">
                    <div class="dock-ex-bg dock-ex-bg--violet" aria-hidden="true" />
                    <div class="dock-ex-stage">
                        <button
                            type="button"
                            class="ex-player"
                            :class="{ 'is-open': playerOpen }"
                            :aria-pressed="playerOpen"
                            aria-label="Toggle the music player"
                            @click="playerOpen = !playerOpen"
                        >
                            <!-- the PLAYER card (grows from the mini-pill) -->
                            <span class="ex-player-card">
                                <span class="ex-player-album" />
                                <span class="ex-player-meta">
                                    <span class="ex-player-title">You Are (Not) Alone</span>
                                    <span class="ex-player-artist">Shiro Sagisu</span>
                                </span>
                                <span class="ex-player-mini-play">
                                    <Pause v-if="playerOpen" class="size-4" />
                                    <Play v-else class="size-4" />
                                </span>
                                <!-- the full transport, revealed on open -->
                                <span class="ex-player-full">
                                    <span class="ex-player-scrub">
                                        <span class="ex-player-scrub-fill" />
                                    </span>
                                    <span class="ex-player-transport">
                                        <SkipBack class="size-5" />
                                        <span class="ex-player-play">
                                            <Pause class="size-5" />
                                        </span>
                                        <SkipForward class="size-5" />
                                    </span>
                                </span>
                            </span>
                            <!-- the SEPARATE queue panel — slides out below the player -->
                            <span class="ex-queue">
                                <span class="ex-queue-head">
                                    <ListMusic class="size-3.5" /> Up Next
                                </span>
                                <span
                                    v-for="q in queue"
                                    :key="q.title"
                                    class="ex-queue-row"
                                >
                                    <span class="ex-queue-dot" />
                                    <span class="ex-queue-text">
                                        <span class="ex-queue-title">{{ q.title }}</span>
                                        <span class="ex-queue-artist">{{ q.artist }}</span>
                                    </span>
                                </span>
                            </span>
                        </button>
                    </div>
                    <p class="dock-ex-caption">
                        <span class="dock-ex-label">Apple Music</span>
                        <span class="dock-ex-hint"
                            >mini-player → player + a separate queue</span
                        >
                    </p>
                </div>

                <!-- ═══ DYNAMIC ISLAND — call pill → full call UI ═══ -->
                <div class="dock-ex-tile">
                    <div class="dock-ex-bg dock-ex-bg--green" aria-hidden="true" />
                    <div class="dock-ex-stage">
                        <button
                            type="button"
                            class="ex-call"
                            :class="{ 'is-open': callOpen }"
                            :aria-pressed="callOpen"
                            aria-label="Toggle the call"
                            @click="callOpen = !callOpen"
                        >
                            <span class="ex-call-avatar">RZ</span>
                            <span class="ex-call-meta">
                                <span class="ex-call-name">Ray Zeisz</span>
                                <span class="ex-call-status">
                                    {{ callOpen ? "04:12" : "mobile" }}
                                </span>
                            </span>
                            <span class="ex-call-wave" aria-hidden="true">
                                <i /><i /><i /><i /><i />
                            </span>
                            <!-- the full controls, revealed on open -->
                            <span class="ex-call-controls">
                                <span class="ex-call-btn"><MicOff class="size-4" /></span>
                                <span class="ex-call-btn"><Video class="size-4" /></span>
                                <span class="ex-call-btn ex-call-btn--end">
                                    <PhoneOff class="size-4" />
                                </span>
                            </span>
                        </button>
                    </div>
                    <p class="dock-ex-caption">
                        <span class="dock-ex-label">Dynamic Island · Call</span>
                        <span class="dock-ex-hint">call pill → full call UI</span>
                    </p>
                </div>

                <!-- ═══ NOTIFICATION — compact pill → expanded card with actions ═══ -->
                <div class="dock-ex-tile">
                    <div class="dock-ex-bg dock-ex-bg--blue" aria-hidden="true" />
                    <div class="dock-ex-stage">
                        <button
                            type="button"
                            class="ex-notif"
                            :class="{ 'is-open': notifOpen }"
                            :aria-pressed="notifOpen"
                            aria-label="Toggle the notification"
                            @click="notifOpen = !notifOpen"
                        >
                            <span class="ex-notif-icon"><MessageCircle class="size-4" /></span>
                            <span class="ex-notif-body">
                                <span class="ex-notif-row">
                                    <span class="ex-notif-title">Mike Babb</span>
                                    <span class="ex-notif-time">now</span>
                                </span>
                                <span class="ex-notif-text">
                                    The liquid dock morph is shipping — want to see the
                                    Dynamic Island split?
                                </span>
                                <!-- the action row, revealed on open -->
                                <span class="ex-notif-actions">
                                    <span class="ex-notif-act">Reply</span>
                                    <span class="ex-notif-act ex-notif-act--primary">
                                        Open
                                    </span>
                                </span>
                            </span>
                        </button>
                    </div>
                    <p class="dock-ex-caption">
                        <span class="dock-ex-label">Notification</span>
                        <span class="dock-ex-hint">pill → expanded card + actions</span>
                    </p>
                </div>

                <!-- four more morphs (self-contained example components) -->
                <TabBar />
                <VolumeHUD />
                <Spotlight />
                <AppSwitcher />
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* ── the gallery grid + tile chassis ───────────────────────────────────────── */
.dock-ex-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: 1.25rem;
}
.dock-ex-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-card);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 8%, transparent);
}
/* the STATIC warm-gradient backdrop the glass reads against (no live GL) */
.dock-ex-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}
.dock-ex-bg--violet {
    background:
        radial-gradient(120% 90% at 20% 15%, oklch(0.72 0.16 320 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 90% 80%, oklch(0.78 0.13 28 / 0.85), transparent 55%),
        linear-gradient(150deg, oklch(0.86 0.06 60), oklch(0.8 0.09 350));
}
.dock-ex-bg--green {
    background:
        radial-gradient(120% 90% at 25% 20%, oklch(0.78 0.13 150 / 0.85), transparent 60%),
        radial-gradient(110% 100% at 85% 85%, oklch(0.82 0.1 120 / 0.8), transparent 55%),
        linear-gradient(150deg, oklch(0.88 0.05 130), oklch(0.82 0.08 160));
}
.dock-ex-bg--blue {
    background:
        radial-gradient(120% 90% at 22% 18%, oklch(0.76 0.13 250 / 0.85), transparent 60%),
        radial-gradient(110% 100% at 88% 82%, oklch(0.82 0.1 210 / 0.8), transparent 55%),
        linear-gradient(150deg, oklch(0.88 0.05 230), oklch(0.82 0.08 260));
}
.dock-ex-stage {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-block-size: 17rem;
    padding: 1.5rem;
}
.dock-ex-caption {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.85rem 1.1rem;
    background: color-mix(in oklab, var(--card), transparent 12%);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-block-start: 1px solid
        color-mix(in oklab, var(--foreground) 8%, transparent);
}
.dock-ex-label {
    font-size: 0.85rem;
    font-weight: 650;
    color: var(--foreground);
}
.dock-ex-hint {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.68rem;
    color: var(--muted-foreground);
}

/* the shared spring-bezier the gallery morphs ride (a gentle iOS overshoot) */
.dock-ex-stage {
    --ex-spring: cubic-bezier(0.34, 1.32, 0.5, 1);
    --ex-ease: cubic-bezier(0.16, 1, 0.3, 1);
}

/* the shared glass plate every morphing dock carries */
.ex-player,
.ex-call,
.ex-notif {
    position: relative;
    display: block;
    cursor: pointer;
    color: var(--foreground);
    text-align: start;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}

/* ═══════════════════════════ APPLE MUSIC ═══════════════════════════════════ */
.ex-player {
    inline-size: 15rem;
    border-radius: 1.6rem;
    overflow: hidden;
    transition: border-radius 0.5s var(--ex-spring);
}
.ex-player-card {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.7rem;
    block-size: 3.6rem;
    padding: 0 0.7rem;
    transition: block-size 0.55s var(--ex-spring);
}
.ex-player.is-open .ex-player-card {
    block-size: 12rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    justify-items: center;
    gap: 0.5rem;
    padding-block: 1.1rem 0.6rem;
}
.ex-player-album {
    inline-size: 2.4rem;
    block-size: 2.4rem;
    border-radius: 0.5rem;
    background: linear-gradient(135deg, oklch(0.62 0.2 320), oklch(0.55 0.18 28));
    box-shadow: inset 0 0 0 0.5px color-mix(in oklab, white, transparent 60%);
    transition:
        inline-size 0.55s var(--ex-spring),
        block-size 0.55s var(--ex-spring),
        border-radius 0.55s var(--ex-spring);
}
.ex-player.is-open .ex-player-album {
    inline-size: 5.5rem;
    block-size: 5.5rem;
    border-radius: 0.9rem;
}
.ex-player-meta {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    gap: 0.05rem;
    transition: text-align 0.4s;
}
.ex-player.is-open .ex-player-meta {
    align-items: center;
    text-align: center;
}
.ex-player-title {
    font-size: 0.82rem;
    font-weight: 650;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 9rem;
}
.ex-player-artist {
    font-size: 0.7rem;
    color: var(--muted-foreground);
    line-height: 1.1;
}
.ex-player-mini-play {
    display: grid;
    place-items: center;
    inline-size: 2.1rem;
    block-size: 2.1rem;
    border-radius: 50%;
    background: color-mix(in oklab, var(--foreground) 8%, transparent);
    transition: opacity 0.3s var(--ex-ease);
}
.ex-player.is-open .ex-player-mini-play {
    opacity: 0;
    pointer-events: none;
    position: absolute;
}
/* the full transport — hidden (collapsed height + faded) at rest, revealed on open */
.ex-player-full {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    inline-size: 100%;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.35s var(--ex-ease);
}
.ex-player.is-open .ex-player-full {
    max-block-size: 5rem;
    opacity: 1;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.4s var(--ex-ease) 0.12s;
}
.ex-player-scrub {
    inline-size: 80%;
    block-size: 4px;
    border-radius: 2px;
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
    overflow: hidden;
}
.ex-player-scrub-fill {
    display: block;
    inline-size: 38%;
    block-size: 100%;
    border-radius: 2px;
    background: var(--foreground);
}
.ex-player-transport {
    display: flex;
    align-items: center;
    gap: 1.3rem;
    color: var(--foreground);
}
.ex-player-play {
    display: grid;
    place-items: center;
    inline-size: 2.4rem;
    block-size: 2.4rem;
    border-radius: 50%;
    background: color-mix(in oklab, var(--foreground) 10%, transparent);
}
/* the SEPARATE queue panel — a distinct card that slides out below the player */
.ex-queue {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    padding-inline: 0.8rem;
    border-block-start: 1px solid transparent;
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.35s var(--ex-ease),
        padding-block 0.55s var(--ex-spring);
}
.ex-player.is-open .ex-queue {
    max-block-size: 9rem;
    opacity: 1;
    padding-block: 0.7rem 0.8rem;
    border-block-start-color: color-mix(in oklab, var(--foreground) 9%, transparent);
    transition:
        max-block-size 0.55s var(--ex-spring),
        opacity 0.4s var(--ex-ease) 0.18s,
        padding-block 0.55s var(--ex-spring);
}
.ex-queue-head {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted-foreground);
}
.ex-queue-row {
    display: flex;
    align-items: center;
    gap: 0.55rem;
}
.ex-queue-dot {
    flex: 0 0 auto;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    border-radius: 0.35rem;
    background: linear-gradient(135deg, oklch(0.66 0.16 320), oklch(0.6 0.15 350));
}
.ex-queue-text {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
}
.ex-queue-title {
    font-size: 0.74rem;
    font-weight: 550;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 10rem;
}
.ex-queue-artist {
    font-size: 0.64rem;
    color: var(--muted-foreground);
}

/* ═══════════════════════════ DYNAMIC ISLAND · CALL ═════════════════════════ */
.ex-call {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.7rem;
    inline-size: 15.5rem;
    block-size: 3.6rem;
    padding: 0 0.8rem;
    border-radius: 1.8rem;
    transition:
        inline-size 0.55s var(--ex-spring),
        block-size 0.55s var(--ex-spring),
        border-radius 0.55s var(--ex-spring);
}
.ex-call.is-open {
    inline-size: 16rem;
    block-size: 11rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    justify-items: center;
    gap: 0.55rem;
    padding: 1.3rem 1rem 1rem;
    border-radius: 1.8rem;
}
.ex-call-avatar {
    display: grid;
    place-items: center;
    inline-size: 2.4rem;
    block-size: 2.4rem;
    border-radius: 50%;
    background: linear-gradient(135deg, oklch(0.6 0.15 150), oklch(0.52 0.13 175));
    color: white;
    font-size: 0.78rem;
    font-weight: 650;
    transition:
        inline-size 0.55s var(--ex-spring),
        block-size 0.55s var(--ex-spring);
}
.ex-call.is-open .ex-call-avatar {
    inline-size: 3.4rem;
    block-size: 3.4rem;
    font-size: 1.05rem;
}
.ex-call-meta {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    gap: 0.05rem;
}
.ex-call.is-open .ex-call-meta {
    align-items: center;
}
.ex-call-name {
    font-size: 0.84rem;
    font-weight: 650;
    white-space: nowrap;
}
.ex-call-status {
    font-size: 0.7rem;
    color: var(--muted-foreground);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
}
/* the live call waveform — a tiny green equaliser, hidden when expanded */
.ex-call-wave {
    display: flex;
    align-items: center;
    gap: 0.13rem;
    block-size: 1.2rem;
    transition: opacity 0.3s;
}
.ex-call.is-open .ex-call-wave {
    opacity: 0;
    position: absolute;
    pointer-events: none;
}
.ex-call-wave i {
    inline-size: 0.16rem;
    block-size: 1.2rem;
    border-radius: 1px;
    background: oklch(0.6 0.15 150);
    transform: scaleY(0.4);
    transform-origin: bottom;
}
@media (prefers-reduced-motion: no-preference) {
    .ex-call-wave i {
        animation: ex-call-wave 0.85s ease-in-out infinite;
    }
    .ex-call-wave i:nth-child(2) {
        animation-delay: 0.12s;
    }
    .ex-call-wave i:nth-child(3) {
        animation-delay: 0.26s;
    }
    .ex-call-wave i:nth-child(4) {
        animation-delay: 0.4s;
    }
    .ex-call-wave i:nth-child(5) {
        animation-delay: 0.16s;
    }
}
@keyframes ex-call-wave {
    0%,
    100% {
        transform: scaleY(0.3);
    }
    50% {
        transform: scaleY(1);
    }
}
/* the full controls — revealed on open */
.ex-call-controls {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    transition:
        max-block-size 0.5s var(--ex-spring),
        opacity 0.3s var(--ex-ease);
}
.ex-call.is-open .ex-call-controls {
    max-block-size: 4rem;
    opacity: 1;
    transition:
        max-block-size 0.5s var(--ex-spring),
        opacity 0.4s var(--ex-ease) 0.14s;
}
.ex-call-btn {
    display: grid;
    place-items: center;
    inline-size: 2.6rem;
    block-size: 2.6rem;
    border-radius: 50%;
    background: color-mix(in oklab, var(--foreground) 10%, transparent);
    color: var(--foreground);
}
.ex-call-btn--end {
    background: oklch(0.58 0.21 22);
    color: white;
}

/* ═══════════════════════════ NOTIFICATION ══════════════════════════════════ */
.ex-notif {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.7rem;
    inline-size: 17rem;
    padding: 0.8rem;
    border-radius: 1.3rem;
    transition: border-radius 0.5s var(--ex-spring);
}
.ex-notif-icon {
    display: grid;
    place-items: center;
    inline-size: 2.4rem;
    block-size: 2.4rem;
    border-radius: 0.7rem;
    background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.55 0.15 220));
    color: white;
}
.ex-notif-body {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-inline-size: 0;
}
.ex-notif-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
}
.ex-notif-title {
    font-size: 0.82rem;
    font-weight: 650;
}
.ex-notif-time {
    font-size: 0.66rem;
    color: var(--muted-foreground);
}
.ex-notif-text {
    font-size: 0.76rem;
    line-height: 1.3;
    color: color-mix(in oklab, var(--foreground), transparent 12%);
    /* clamp to one line at rest, full on open */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    overflow: hidden;
    transition: -webkit-line-clamp 0.4s;
}
.ex-notif.is-open .ex-notif-text {
    -webkit-line-clamp: 4;
    line-clamp: 4;
}
.ex-notif-actions {
    display: flex;
    gap: 0.5rem;
    margin-block-start: 0.5rem;
    max-block-size: 0;
    opacity: 0;
    overflow: hidden;
    transition:
        max-block-size 0.5s var(--ex-spring),
        opacity 0.3s var(--ex-ease),
        margin-block 0.5s var(--ex-spring);
}
.ex-notif.is-open .ex-notif-actions {
    max-block-size: 3rem;
    opacity: 1;
    transition:
        max-block-size 0.5s var(--ex-spring),
        opacity 0.4s var(--ex-ease) 0.14s,
        margin-block 0.5s var(--ex-spring);
}
.ex-notif-act {
    flex: 1 1 0;
    padding: 0.4rem 0.7rem;
    border-radius: 0.7rem;
    text-align: center;
    font-size: 0.76rem;
    font-weight: 600;
    background: color-mix(in oklab, var(--foreground) 9%, transparent);
    color: var(--foreground);
}
.ex-notif-act--primary {
    background: oklch(0.62 0.16 250);
    color: white;
}

@media (prefers-reduced-motion: reduce) {
    .ex-player,
    .ex-player-card,
    .ex-player-album,
    .ex-player-full,
    .ex-queue,
    .ex-call,
    .ex-call-avatar,
    .ex-call-controls,
    .ex-notif,
    .ex-notif-actions {
        transition-duration: 0.01ms !important;
    }
}
</style>
