<script setup lang="ts">
// Dynamic Island · Call — an ACTUAL fission split on the REAL `useDockFission` engine
// (audit §W10: "the Dynamic Island Call → useDockFission (an actual split, not a downward
// grow)"; the prototype facsimile GREW DOWNWARD — the opposite of the reference). At REST
// the island is ONE crisp `.glass-floating` pill (goo OFF). On split it CARVES: the two
// halves DETACH along opposite vectors (the call-status anchor peels left, the controls
// peel right — the `DOCK_SPLIT_SIGNATURES.media` lateral-peel signature), each bridged to
// the body by a stretching goo NECK that thins then snaps (the library `fission-bridge.css`
// recipe + the ONE `<GooFilter>` mount the shell hoists ONCE).
//
// THE TWO-LAYER discipline (the morph-showcase goo-blob precedent): a goo BLOB layer
// (solid metaball plates the `filter: url()` merges into ONE body that necks + snaps) +
// a crisp CONTENT layer on top (un-filtered, so the avatar/text/controls stay sharp — a
// translucent content layer would be thresholded away by the goo's feColorMatrix). Both
// read the SAME inheriting `--dock-split-t` scalar the fission spring writes, so they
// track in lockstep. The goo neck stretches→snaps in ~150ms at the fast DOCK_SPRING.
import { onMounted, ref } from "vue";
import { Phone, MicOff, Video, PhoneOff } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import {
    useDockFission,
    DOCK_SPLIT_SIGNATURES,
} from "../../../../src/components/custom/dock/composables";

const hostRef = ref<HTMLElement | null>(null);
const leftPieceRef = ref<HTMLElement | null>(null);
const rightPieceRef = ref<HTMLElement | null>(null);
// media = LATERAL PEEL (the call anchor stays, the controls peel — descriptor-driven).
const signature = ref(DOCK_SPLIT_SIGNATURES.media);

const fission = useDockFission({ rootEl: hostRef, signature });

// register the two halves as fission PIECES with OPPOSITE lateral vectors (the
// call-status half peels left, the controls half peels right). rank orders the stagger.
onMounted(() => {
    fission.registerPiece({ el: leftPieceRef, vector: { dx: -1, dy: 0 }, rank: 0 });
    fission.registerPiece({ el: rightPieceRef, vector: { dx: 1, dy: 0 }, rank: 1 });
});

function toggle(): void {
    fission.toggle();
}
</script>

<template>
    <DockExampleTile
        label="Dynamic Island · Call"
        hint="ONE pill FISSIONS into two (useDockFission)"
    >
        <template #bg>
            <div class="ci-bg" />
        </template>

        <div
            ref="hostRef"
            class="ci-host"
            role="button"
            tabindex="0"
            :aria-expanded="fission.fissioned.value"
            :aria-label="
                fission.fissioned.value
                    ? 'Merge the call island'
                    : 'Split the call island'
            "
            @click="toggle"
            @keydown.enter.prevent="toggle"
            @keydown.space.prevent="toggle"
            @pointermove="fission.onPointerMove"
        >
            <!-- the goo BLOB layer — the library `.dock-fission-bridge` recipe. Holds the
                 two SOLID blob pieces + their goo necks; the goo `filter:url()` applies
                 ONLY while [data-fissioning] (crisp glass at rest). The blobs carry NO
                 text (the goo threshold mangles it) — the content rides the layer below. -->
            <div class="dock-fission-bridge ci-bridge" aria-hidden="true">
                <div ref="leftPieceRef" class="dock-fission-piece ci-blob ci-blob--left" />
                <div ref="rightPieceRef" class="dock-fission-piece ci-blob ci-blob--right" />
            </div>

            <!-- the crisp CONTENT layer — un-filtered, tracking the blobs via the SAME
                 inheriting --dock-split-t scalar + per-half CSS vectors. -->
            <div class="ci-content" aria-hidden="true">
                <div class="ci-half ci-half--left">
                    <span class="ci-avatar">●</span>
                    <span class="ci-meta">
                        <span class="ci-name">Incoming call</span>
                        <span class="ci-status">04:12</span>
                    </span>
                </div>
                <div class="ci-half ci-half--right">
                    <span class="ci-btn"><MicOff class="size-4" /></span>
                    <span class="ci-btn"><Video class="size-4" /></span>
                    <span class="ci-btn ci-btn--end"><PhoneOff class="size-4" /></span>
                </div>
            </div>

            <!-- the REST badge — a small call glyph shown only at rest (the merged pill
                 reads as ONE call surface; fades out as the pieces carve). -->
            <span class="ci-rest" aria-hidden="true"><Phone class="size-4" /></span>
        </div>
    </DockExampleTile>
</template>

<style scoped>
.ci-bg {
    background:
        radial-gradient(120% 90% at 25% 20%, oklch(0.78 0.13 150 / 0.85), transparent 60%),
        radial-gradient(110% 100% at 85% 85%, oklch(0.82 0.1 120 / 0.8), transparent 55%),
        linear-gradient(150deg, oklch(0.88 0.05 130), oklch(0.82 0.08 160));
}

/* the fission HOST — ONE crisp glass pill at rest (the .dock-fission-bridge host). The
   --dock-fission-reach knob sets how far each half peels. */
.ci-host {
    position: relative;
    display: grid;
    place-items: center;
    inline-size: 16rem;
    block-size: 3.8rem;
    cursor: pointer;
    --dock-fission-reach: 4rem;
}

/* the goo blob layer fills the host; each blob is a SOLID warm-cream plate the goo fuses. */
.ci-bridge {
    border-radius: 1.9rem;
}
.ci-blob {
    position: absolute;
    inset-block: 0.4rem;
    inline-size: 6.4rem;
    border-radius: 1.4rem;
    background: var(--glass-bg-floating);
    box-shadow: inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22));
}
.ci-blob--left {
    inset-inline-start: 1.2rem;
}
.ci-blob--right {
    inset-inline-end: 1.2rem;
}

/* the crisp content layer — the two halves track the SAME --dock-split-t the fission
   spring writes. Each half translates with its blob (the same per-half vector × the
   resist-aware progress). NO layout property — translate is the compositor channel. */
.ci-content {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    z-index: 1;
    /* the crisp pill plate at rest (the un-filtered glass the goo blobs sit beneath). */
    border-radius: 1.9rem;
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
    /* the content plate dissolves to transparent as the blobs carve it (the goo layer
       owns the fissioned silhouette); a function of --dock-split-t (no second clock). */
    opacity: calc(1 - clamp(0, var(--dock-split-t, 0), 1) * 0.85);
    --piece-reach: var(--dock-fission-reach, 4rem);
}
.ci-half {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    color: var(--foreground);
    /* each half peels with its blob — translate off its vector × the split scalar. */
    translate: calc(var(--half-dir, 0) * var(--piece-reach) * clamp(0, var(--dock-split-t, 0), 1)) 0;
}
.ci-half--left {
    justify-content: flex-start;
    padding-inline-start: 0.7rem;
    --half-dir: -1;
}
.ci-half--right {
    justify-content: flex-end;
    padding-inline-end: 0.7rem;
    --half-dir: 1;
}
.ci-avatar {
    display: grid;
    place-items: center;
    inline-size: 2.4rem;
    block-size: 2.4rem;
    border-radius: 50%;
    background: linear-gradient(135deg, oklch(0.6 0.15 150), oklch(0.52 0.13 175));
    color: white;
    font-size: 0.78rem;
    font-weight: 650;
}
.ci-meta {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
}
.ci-name {
    font-size: 0.82rem;
    font-weight: 650;
    white-space: nowrap;
}
.ci-status {
    font-size: 0.7rem;
    color: var(--muted-foreground);
    font-variant-numeric: tabular-nums;
}
.ci-btn {
    display: grid;
    place-items: center;
    inline-size: 2.3rem;
    block-size: 2.3rem;
    border-radius: 50%;
    background: color-mix(in oklab, var(--foreground) 10%, transparent);
    color: var(--foreground);
}
.ci-btn--end {
    background: oklch(0.58 0.21 22);
    color: white;
}

/* the rest badge — a centred call glyph at rest, gone as the carve begins. */
.ci-rest {
    position: absolute;
    z-index: 2;
    display: grid;
    place-items: center;
    inline-size: 2.2rem;
    block-size: 2.2rem;
    color: var(--foreground);
    opacity: calc(1 - clamp(0, var(--dock-split-t, 0), 1) * 6);
}
</style>
