<script setup lang="ts">
// BB.B2 W-DOCKMORPH-CTA — the external-CTA-MORPHS-INTO-dock seam (the iOS bloom-from-
// source INVERSE). An EXTERNAL CTA button (OUTSIDE the dock) flies + reshapes from its
// own rect ONTO a target dock control's rect, fades + congests into the glass, then
// hands off — the dock control lights up "received". Composes the shipped
// `useDockCtaReceive` leaf (which reuses the SAME kf ElementMorph + springTiming
// Function substrate useLiquidReveal activates — NO demo-local re-implementation), a
// CONSUMING seam BESIDE W-DOCK-MORPH-FAMILY (no dockMorphContext/DOCK_SPRING edit).
// Compositor-only (transform/opacity/filter) + PRM-seats (a deterministic snap-to-gone
// + hand-off under reduced-motion).
import { onMounted, ref, useTemplateRef } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Plus, Star, Compass, Shapes, Boxes } from "@lucide/vue";
import { GlassDock, DockIconButton } from "@glass/components/custom/dock";
import { Button } from "@glass/components/ui/button";
import { useDockCtaReceive } from "@glass/composables/motion/useDockCtaReceive";
import DockStage from "./DockStage.vue";

// The external CTA element (the morph vehicle) + the target dock control (the
// destination). The CTA flies INTO the target on receive().
const ctaRef = useTemplateRef<HTMLElement>("ctaEl");
const targetRef = useTemplateRef<HTMLElement>("targetEl");

// The hand-off state — once the CTA lands, it is gone and the dock control owns the
// spot, flashed "received".
const received = ref(false);

const { receive, reset, setPending, clearPending, pending } = useDockCtaReceive(
    ctaRef,
    {
        dockControl: targetRef,
        preset: "snappy",
        onReceived: () => {
            received.value = true;
        },
    },
);

// BC.W-AX-DOCK-CTA-SEAT — ARM the landing seat as soon as the target dock control is
// mounted: the control shows the dim [data-cta-pending] ghost (sized for its arrival
// from frame 0, so the dock box does NOT jump when the CTA lands). The default
// onReceived hand-off calls clearPending() — the seat reveals its real content with the
// plain transition:opacity FLIP as the CTA lands.
onMounted(() => {
    setPending();
});

function onCta() {
    if (received.value) return;
    // The morph vehicle is the CTA's own host element — the directive measures it +
    // the dock control fresh, drives the FORWARD spring 0→1. The seat reveals on
    // hand-off (clearPending fires inside the default onReceived flow).
    receive();
}

function replay() {
    received.value = false;
    reset();
    // Re-arm the seat for the next run (the ghost shows again, the box stays sized).
    setPending();
}

// Manually clear the seat (the consumer-drives-it-manually path) — demonstrates that
// clearPending() reveals the seated content without the morph having to land.
function revealNow() {
    clearPending();
}
</script>

<template>
    <StoryPage>
        <!-- BA.W-STAGE — the CTA-receive demo sits over the ONE shared offscreen-paused
             aurora field (DockStage); the dock + the CTA float over the live field so
             the morph reads as glass-into-glass. NO net-new GL context (one-GL-per-route). -->
        <DockStage #default="{ backgroundCanvas }">
            <StorySection heading="External CTA morphs into the dock" gap="lg">
                <p class="text-sm text-muted-foreground max-w-prose">
                    The starred dock control is a <strong>landing SEAT</strong>, RESERVED
                    for the CTA from the moment the page mounts (<code
                        class="rounded bg-muted px-1"
                        >setPending()</code
                    >): it shows a dim <code class="rounded bg-muted px-1"
                        >[data-cta-pending]</code
                    >
                    ghost, sized for its arrival so the dock box does NOT jump. Click
                    <strong>Add to dock</strong> — the external CTA button flies + reshapes
                    from its own rect ONTO that seat, fades + congests into the glass, then
                    hands off; the seat REVEALS its real content with a calm
                    <code class="rounded bg-muted px-1">transition: opacity</code> FLIP (NOT
                    the dock morph-stagger). The
                    <code class="rounded bg-muted px-1">useDockCtaReceive</code> seam — the
                    iOS bloom-from-source inverse, composing the SAME kf
                    <code class="rounded bg-muted px-1">ElementMorph</code> substrate, a
                    consuming seam beside the dock morph mechanism. Compositor-only;
                    reduced-motion snaps the CTA to gone + instant-swaps the reveal.
                    <span v-if="pending" class="text-mono-caption">(seat armed)</span>
                </p>

                <div
                    class="dock-stage-tile relative flex flex-col items-center gap-8 rounded-[var(--radius-card)] border border-border/30 p-10"
                >
                    <!-- The external CTA (the morph vehicle) — OUTSIDE the dock. -->
                    <Button
                        v-if="!received"
                        ref="ctaEl"
                        variant="primary-audacious"
                        class="cta-receive-vehicle"
                        @click="onCta"
                    >
                        <Plus class="size-4" />
                        Add to dock
                    </Button>
                    <Button v-else variant="default" @click="replay">Replay</Button>

                    <!-- The consumer-drives-the-seat-manually path: clearPending() reveals
                         the seated content without the CTA having to land (the seat is a
                         CSS state the consumer owns). -->
                    <Button
                        v-if="pending && !received"
                        variant="ghost"
                        class="text-mono-caption"
                        @click="revealNow"
                    >
                        Reveal seat now
                    </Button>

                    <!-- The dock with the target control. -->
                    <GlassDock :background-canvas="backgroundCanvas" always-expanded class="relative z-10">
                        <DockIconButton aria-label="Foundations"><Compass /></DockIconButton>
                        <DockIconButton aria-label="Primitives"><Shapes /></DockIconButton>
                        <DockIconButton aria-label="Containers"><Boxes /></DockIconButton>
                        <!-- The receive TARGET — the CTA lands here. -->
                        <DockIconButton
                            ref="targetEl"
                            aria-label="Favorites"
                            :class="{ 'cta-receive-target--lit': received }"
                            class="cta-receive-target"
                        >
                            <Star />
                        </DockIconButton>
                    </GlassDock>
                </div>

                <p class="text-mono-caption text-muted-foreground">
                    The CTA is the morph vehicle (transform/opacity/filter only); the dock
                    control is the destination. ONE kf spring substrate, ONE family with
                    <code class="rounded bg-muted px-1">useLiquidReveal</code>.
                </p>
            </StorySection>
        </DockStage>
    </StoryPage>
</template>

<style scoped>
/* The CTA vehicle declares will-change for the compositor morph (the leaf writes only
   transform/opacity/filter — no layout property). */
.cta-receive-vehicle {
    will-change: transform, opacity, filter;
}

/* The target dock control flashes a glass luminance-lift the moment the CTA lands —
   the "received" hand-off acknowledgement. Compositor-safe (opacity/transform on a
   pseudo, NOT a layout property); rides the snappy spring clock. */
.cta-receive-target {
    position: relative;
}

.cta-receive-target--lit {
    transition:
        transform var(--spring-snappy-duration) var(--spring-snappy),
        box-shadow var(--spring-snappy-duration) var(--ease-out);
    transform: scale(1.06);
    box-shadow: 0 0 0 2px var(--dock-selected-accent, transparent);
}

@media (prefers-reduced-motion: reduce) {
    .cta-receive-target--lit {
        transition: none;
        transform: none;
    }
}
</style>
