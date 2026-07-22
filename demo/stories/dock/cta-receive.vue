<script setup lang="ts">
// An external CTA flies and reshapes from its own rect onto a dock control, fades into
// the glass, then hands off. The story composes `useDockCtaReceive`; it does not add a
// second dock morph. Motion is compositor-only, while reduced motion snaps directly to
// the handoff.
import { onMounted, ref, useTemplateRef } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Plus, Star, Compass, Shapes, Boxes } from "@lucide/vue";
import { GlassDock, DockControl } from "@glass/components/dock";
import { Button } from "@glass/components/button";
import { useDockCtaReceive } from "@glass/composables/motion/morph/useDockCtaReceive";
import DockStage from "./_frame/DockStage.vue";

// The external CTA element (the morph vehicle) + the target dock control (the
// destination). The CTA flies INTO the target on receive().
const ctaRef = useTemplateRef<HTMLElement>("ctaEl");
const targetRef = useTemplateRef<HTMLElement>("targetEl");

// The hand-off state — once the CTA lands, it is gone and the dock control owns the
// spot, flashed "received".
const received = ref(false);

const {
    receive,
    reset,
    setPending,
    clearPending,
    pending,
    playing,
    progress,
    observables,
} = useDockCtaReceive(ctaRef, {
    dockControl: targetRef,
    preset: "snappy",
    onReceived: () => {
        received.value = true;
    },
});

// ARM the landing seat as soon as the target dock control is
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

function sinceStart(value: number | null) {
    const start = observables.value.startedAtMs;
    return value === null || start === null ? "—" : `${Math.round(value - start)} ms`;
}

// Manually clear the seat (the consumer-drives-it-manually path) — demonstrates that
// clearPending() reveals the seated content without the morph having to land.
function revealNow() {
    clearPending();
}
</script>

<template>
    <StoryPage>
        <!-- the CTA-receive demo sits over the ONE shared offscreen-paused
             aurora field (DockStage); the dock + the CTA float over the live field so
             the morph reads as glass-into-glass. NO net-new GL context (one-GL-per-route). -->
        <DockStage #default="{ backgroundCanvas }">
            <StorySection heading="External CTA morphs into the dock" gap="lg">
                <p class="text-sm text-muted-foreground max-w-prose">
                    Add to dock flies the external action into its reserved star seat,
                    then hands ownership to the Dock without moving its layout. The same
                    morph owner measures the run below; reduced motion completes without
                    travel.
                    <span v-if="pending" class="text-caption">(seat armed)</span>
                </p>

                <div
                    class="dock-stage-tile relative flex flex-col items-center gap-8 rounded-[var(--radius-card)] border border-border/30 p-10"
                >
                    <!-- The external CTA (the morph vehicle) — OUTSIDE the dock. -->
                    <Button
                        v-if="!received"
                        ref="ctaEl"
                        emphasis="primary"
                        class="cta-receive-vehicle"
                        @click="onCta"
                    >
                        <Plus class="size-4" />
                        Add to dock
                    </Button>
                    <Button v-else @click="replay">Replay</Button>

                    <div v-if="!received" class="flex flex-wrap justify-center gap-2">
                        <Button v-if="playing" emphasis="quiet" @click="onCta">
                            Restart receive
                        </Button>
                        <Button
                            v-if="
                                observables.phase !== 'idle' &&
                                observables.phase !== 'reset'
                            "
                            emphasis="quiet"
                            @click="replay"
                        >
                            Reset
                        </Button>
                        <Button
                            v-if="pending"
                            emphasis="quiet"
                            class="text-mono-small"
                            @click="revealNow"
                        >
                            Reveal seat
                        </Button>
                    </div>

                    <!-- The dock with the target control. -->
                    <GlassDock
                        :background-canvas="backgroundCanvas"
                        always-expanded
                        class="relative z-10"
                    >
                        <DockControl aria-label="Foundations"><Compass /></DockControl>
                        <DockControl aria-label="Primitives"><Shapes /></DockControl>
                        <DockControl aria-label="Containers"><Boxes /></DockControl>
                        <!-- The receive TARGET — the CTA lands here. -->
                        <DockControl
                            ref="targetEl"
                            aria-label="Favorites"
                            :class="{ 'cta-receive-target--lit': received }"
                            class="cta-receive-target"
                        >
                            <Star />
                        </DockControl>
                    </GlassDock>

                    <dl
                        class="grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-3 border-t border-border/30 pt-5 text-mono-small sm:grid-cols-4"
                        aria-label="CTA receive measurements"
                    >
                        <div>
                            <dt class="text-muted-foreground">State</dt>
                            <dd>
                                {{ observables.phase }} · {{ observables.path ?? "—" }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-muted-foreground">Progress</dt>
                            <dd>{{ Math.round(progress * 100) }}%</dd>
                        </div>
                        <div>
                            <dt class="text-muted-foreground">Travel</dt>
                            <dd>
                                {{ Math.round(observables.travelPx) }} px
                                <span v-if="observables.travelBandPx">
                                    · {{ observables.travelBandPx[0] }}–{{
                                        observables.travelBandPx[1]
                                    }}
                                </span>
                            </dd>
                        </div>
                        <div>
                            <dt class="text-muted-foreground">Latency</dt>
                            <dd>
                                {{
                                    observables.latencyMs === null
                                        ? "—"
                                        : `${Math.round(observables.latencyMs)} ms`
                                }}
                                <span v-if="observables.withinBand !== null">
                                    ·
                                    {{
                                        observables.withinBand
                                            ? "in band"
                                            : "out of band"
                                    }}
                                </span>
                                <span v-if="observables.latencyBandMs">
                                    · {{ Math.round(observables.latencyBandMs[0]) }}–{{
                                        Math.round(observables.latencyBandMs[1])
                                    }}
                                </span>
                            </dd>
                        </div>
                    </dl>
                    <p
                        class="text-mono-small text-muted-foreground"
                        aria-live="polite"
                    >
                        start {{ observables.startedAtMs === null ? "—" : "0 ms" }} ·
                        settle {{ sinceStart(observables.settledAtMs) }} · handoff
                        {{ sinceStart(observables.handedOffAtMs) }} · complete
                        {{ sinceStart(observables.completedAtMs) }} · runs
                        {{ observables.run }} · interruptions
                        {{ observables.interruptions }} · resets
                        {{ observables.resets }} · scale
                        {{ observables.scaleRatio.toFixed(2) }}×
                        <span v-if="observables.scaleBand">
                            ({{ observables.scaleBand[0] }}–{{
                                observables.scaleBand[1]
                            }})
                        </span>
                    </p>
                </div>

                <p class="text-small text-muted-foreground">
                    Fine and coarse runs are checked against the selected spring
                    horizon, travel, and scale bands. Reset is an explicit snap; reverse
                    travel is not supported.
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
