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
import { ref, useTemplateRef } from "vue";
import StoryPage from "../StoryPage.vue";
import { Plus, Star, Compass, Shapes, Boxes } from "@lucide/vue";
import { GlassDock, DockIconButton } from "../../../src/components/custom/dock";
import { Button } from "../../../src/components/ui/button";
import { useDockCtaReceive } from "../../../src/composables/motion/useDockCtaReceive";
import DockStage from "./DockStage.vue";

// The external CTA element (the morph vehicle) + the target dock control (the
// destination). The CTA flies INTO the target on receive().
const ctaRef = useTemplateRef<HTMLElement>("ctaEl");
const targetRef = useTemplateRef<HTMLElement>("targetEl");

// The hand-off state — once the CTA lands, it is gone and the dock control owns the
// spot, flashed "received".
const received = ref(false);

const { receive, reset } = useDockCtaReceive(ctaRef, {
    dockControl: targetRef,
    preset: "snappy",
    onReceived: () => {
        received.value = true;
    },
});

function onCta() {
    if (received.value) return;
    // The morph vehicle is the CTA's own host element — the directive measures it +
    // the dock control fresh, drives the FORWARD spring 0→1.
    receive();
}

function replay() {
    received.value = false;
    reset();
}
</script>

<template>
    <StoryPage>
        <!-- BA.W-STAGE — the CTA-receive demo sits over the ONE shared offscreen-paused
             aurora field (DockStage); the dock + the CTA float over the live field so
             the morph reads as glass-into-glass. NO net-new GL context (one-GL-per-route). -->
        <DockStage>
            <section class="flex flex-col gap-4">
                <h2 class="text-subheading">External CTA morphs into the dock</h2>
                <p class="text-sm text-muted-foreground max-w-prose">
                    Click <strong>Add to dock</strong> — the external CTA button flies +
                    reshapes from its own rect ONTO the starred dock control, fades +
                    congests into the glass, then hands off (the dock control owns the
                    spot). The
                    <code class="rounded bg-muted px-1">useDockCtaReceive</code> seam — the
                    iOS bloom-from-source inverse, composing the SAME kf
                    <code class="rounded bg-muted px-1">ElementMorph</code> substrate, a
                    consuming seam beside the dock morph mechanism. Compositor-only;
                    reduced-motion snaps the CTA to gone + hands off.
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

                    <!-- The dock with the target control. -->
                    <GlassDock always-expanded class="relative z-10">
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
            </section>
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
