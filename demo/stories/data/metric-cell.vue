<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { MetricCell } from "@glass/components/metric-cell";
import { useCountup } from "@glass/composables/motion/useCountup";
import { Download, Upload, Gauge, Activity } from "@lucide/vue";

// BA.W-ANIMATE Tier C — the audacious display numbers count up on first
// scroll-into-view. The fast.com peg: the result number IS the page, so the
// arrival of the figure earns a moment. ONE motion event on the VALUE glyph (the
// unit/label stay still — the motion twin of the one-color-event restraint).
//
// The tween rides `useCountup` (the [data-countup] DOM-walking editorial engine
// on the keyframes NumericAnimation runtime) on the SETTLE register: an
// `easeOutCubic` — smooth + monotone, NEVER exceeding 1, so the number does NOT
// overshoot past its target (a bounced number reads wrong). PRM-snap is the
// engine's own (useCountup.ts: prefersReducedMotion → textContent = target, no
// tween).
//
// The intersection GATE: `useCountup.runActive()` walks the host's
// [data-state="active"] region, so the figures count up only when the host
// scrolls into view — `useIntersectionPause` flips `resume()` when the host
// intersects the viewport, which fires the one-shot count-up (and never on
// mount-offscreen). The runtime is a one-shot latch: the count-up plays once on
// first reveal, the pause/resume thereafter is inert.
const countupHost = ref<HTMLElement | null>(null);

// SETTLE: ease-out cubic — patient, monotone, no overshoot (§6 "a number arrives
// with gravity, not bounce").
const easeOutCubic = (p: number): number => 1 - Math.pow(1 - p, 3);

const { runActive } = useCountup(countupHost, { easeFn: easeOutCubic });

// The intersection GATE — the count-up is a ONE-SHOT REVEAL moment, so it wants a
// "fire once when first revealed" trigger, NOT a pause-a-running-loop signal.
// `useIntersectionPause` is the latter (it gates a continuous runtime, and its
// `isIntersecting` seeds `true` and only emits its resume() edge on a paused→
// running TRANSITION — a host that mounts in view never produces that edge, so it
// would never trigger). The correct primitive here is a minimal one-shot
// IntersectionObserver that fires `runActive()` the first time the host crosses
// into view (on mount-in-view AND on scroll-into-view alike), then disconnects —
// so the tween never runs on a mount-OFFSCREEN host and never re-fires. PRM-snap
// is the engine's own (useCountup.ts: prefersReducedMotion → textContent = target,
// no tween), so the count-up is correct under reduce by construction.
let observer: IntersectionObserver | null = null;
watch(
    countupHost,
    (host) => {
        if (!host || observer) return;
        if (typeof IntersectionObserver === "undefined") {
            // SSR / no-IO fallback: the figures keep their static seed (the truth
            // when motion can't run) — no degraded blank.
            return;
        }
        observer = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting || e.intersectionRatio > 0) {
                        runActive();
                        observer?.disconnect();
                        observer = null;
                        break;
                    }
                }
            },
            { threshold: 0.2 },
        );
        observer.observe(host);
    },
    { immediate: true, flush: "post" },
);

onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="dashboard register · semantic glyph tint"
            blurb="The compact metric card — icon + label row over a value/unit pair on a wash-tier surface. The leading glyph tints to its semantic --chart-* viz color (the ONE color event per cell); the value + unit stay neutral ink (the one-color-event proportion rule)."
        >
            <div class="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                <MetricCell
                    :icon="Download"
                    icon-color="var(--chart-download)"
                    label="download"
                    :value="248.6"
                    unit="Mbps"
                />
                <MetricCell
                    :icon="Upload"
                    icon-color="var(--chart-upload)"
                    label="upload"
                    :value="42.1"
                    unit="Mbps"
                />
                <MetricCell
                    :icon="Gauge"
                    icon-color="var(--chart-ping)"
                    label="latency"
                    :value="14"
                    unit="ms"
                />
                <MetricCell
                    :icon="Activity"
                    icon-color="var(--chart-jitter)"
                    label="jitter"
                    :value="2"
                    unit="ms"
                />
            </div>
        </StorySection>

        <StorySection
            label="compact register + placeholder"
            blurb="The compact appearance tightens padding to p-2 with the mono-small value; a null value reads the placeholder glyph."
        >
            <div class="grid max-w-xl grid-cols-3 gap-2">
                <MetricCell
                    appearance="compact"
                    label="peak"
                    :value="912"
                    unit="Mbps"
                />
                <MetricCell
                    appearance="compact"
                    label="mean"
                    :value="486"
                    unit="Mbps"
                />
                <MetricCell
                    appearance="compact"
                    label="pending"
                    :value="null"
                    unit="Mbps"
                />
            </div>
        </StorySection>

        <StorySection
            label="hero metric · the audacious display tier"
            blurb="The fast.com peg — the result number IS the page. The mega/audacious display tiers (mega 177px / audacious 352px) activate on the metric surface, their natural home. The leading glyph tints to its semantic --chart-* viz color; the number stays warm ink (the one-color-event rule)."
        >
            <!-- BA.W-ANIMATE Tier C — the count-up host. `countupHost` is the OUTER
                 wrapper the IntersectionObserver watches; the inner grid carries
                 [data-state="active"], the region useCountup.runActive() walks
                 (runActive queries a [data-state="active"] DESCENDANT of the host,
                 so the marker must be on a CHILD, not the host itself). The value
                 figures carry [data-countup], gated by the observer so the tween
                 fires on scroll-into-view (never on mount-offscreen). The number is
                 its OWN [data-countup] element (the engine writes its whole
                 textContent); the unit span is a SIBLING so it stays static ink —
                 ONE motion event on the value glyph alone. -->
            <div ref="countupHost">
            <div
                data-state="active"
                class="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2"
            >
                <div
                    class="flex flex-col items-start gap-1 rounded-card border border-border/60 bg-card/50 px-6 py-5"
                >
                    <div
                        class="text-micro text-muted-foreground flex items-center gap-1.5"
                    >
                        <Download
                            :size="14"
                            :stroke-width="2"
                            :style="{ color: 'var(--chart-download)' }"
                            aria-hidden="true"
                        />
                        <span>download</span>
                    </div>
                    <p
                        class="text-display-mega tabular-nums leading-none text-foreground"
                    >
                        <span class="tabular-nums" data-countup="912" data-countup-dur="1100"
                            >912</span
                        ><span class="text-display-3 text-muted-foreground"
                            >Mbps</span
                        >
                    </p>
                </div>
                <div
                    class="flex flex-col items-start gap-1 rounded-card border border-border/60 bg-card/50 px-6 py-5"
                >
                    <div
                        class="text-micro text-muted-foreground flex items-center gap-1.5"
                    >
                        <Gauge
                            :size="14"
                            :stroke-width="2"
                            :style="{ color: 'var(--chart-ping)' }"
                            aria-hidden="true"
                        />
                        <span>latency</span>
                    </div>
                    <p
                        class="text-display-audacious tabular-nums leading-none text-foreground"
                    >
                        <span data-countup="14" data-countup-dur="900">14</span
                        ><span class="text-display-3 text-muted-foreground">ms</span>
                    </p>
                </div>
            </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
