<script setup lang="ts">
// THE ONE SCROLL REGISTER — the specimen page (BK #19, discharging RT-18B's
// demo-coverage debt and RT-18H(b)'s "one scroll register" fold).
//
// #18 deleted `/motion/scroll` whole and with it `ScrollNativeBody.vue`, the repo's
// only markup writer of `.scroll-progress` and `[data-scroll-reveal]`. Both registers
// are LIVE — fourier-analysis `PaperView.vue:314` and speedtest `SurveyWizard.vue:88`
// write them today — so the library shipped two published recipes with nothing in-repo
// mounting them. That is the debt this page pays, and it pays it ONCE: the two CSS
// registers and the JS spine that carries their weight all appear here together, so a
// reader sees the whole axis in one place rather than three pages naming each other.
//
// The three writers, deliberately side by side:
//   • `.scroll-progress`      — the compositor bar, a `scroll()` timeline, zero JS.
//   • `[data-scroll-reveal]`  — per-child `view()` timelines; the stagger is implicit.
//   • `useScrollScene`        — the liquid-weight JS spine: a rAF-coalesced read fed
//                               through keyframes.js `SmoothProgress`, so the damped
//                               value LAGS the finger and settles after it lifts. The
//                               CSS registers are 1:1 with the scroll by construction;
//                               the spine is what gives an axis WEIGHT.
import { onBeforeUnmount, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import { useScrollScene } from "@glass/composables/motion/scroll/useScrollScene";

const port = ref<HTMLElement | null>(null);
const weighted = ref<HTMLElement | null>(null);

// The scene reads the story's OWN scroll port (never auto-discovered) and writes the
// damped 0..1 onto `--scene-t` on the readout, so the paint is a pure CSS consequence
// of one JS-owned number.
const scene = useScrollScene({
    source: port,
    bindEl: weighted,
    property: "--scene-t",
    // The golden liquid-weight rest. Lower it and the bar snaps; raise it and it drifts.
    scrub: 0.618,
});
onBeforeUnmount(() => scene.dispose());

const beats = [
    "The compositor bar above is a `scroll()` timeline. No listener, no rAF, no JS.",
    "Each of these rows carries its own `view()` timeline — the cascade is implicit.",
    "Reduced motion is the OUTER gate: under `reduce` nothing binds and every row rests.",
    "The weighted readout below is the JS spine, and it lags this scroll on purpose.",
    "Let go mid-scroll and watch it keep travelling, then settle. That is the weight.",
    "One axis, three writers, one page — the register is read off the tree, not a doc.",
];
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                The scroll axis has three writers and this page mounts all of them.
                <code class="fira-code">.scroll-progress</code> and
                <code class="fira-code">[data-scroll-reveal]</code> are
                token-first CSS recipes that run on the compositor;
                <code class="fira-code">useScrollScene</code> is the liquid-weight JS
                spine that damps the same 0..1 through
                <code class="fira-code">SmoothProgress</code> so the value carries
                inertia the native timelines cannot.
            </p>

            <div
                ref="port"
                class="glass-card relative h-80 overflow-y-auto overscroll-contain p-0"
            >
                <!-- `.scroll-progress` — the 0..1 scaleX bar, sticky over its own
                     scroll port so `scroll(nearest block)` resolves to THIS scroller. -->
                <div
                    class="sticky top-0 z-10 h-1 w-full bg-[var(--motion-accent)] scroll-progress"
                />

                <!-- `[data-scroll-reveal]` — one `view()` timeline per child. -->
                <div data-scroll-reveal class="flex flex-col gap-4 p-6">
                    <p
                        v-for="(beat, i) in beats"
                        :key="i"
                        class="glass-quiet text-prose rounded-card p-4"
                    >
                        {{ beat }}
                    </p>
                    <div class="h-64 shrink-0" aria-hidden="true" />
                </div>
            </div>

            <!-- The JS spine's readout: a bar whose width is a pure function of the
                 damped `--scene-t` the scene writes onto this element. -->
            <div
                ref="weighted"
                class="glass-card flex flex-col gap-2 p-6"
                style="--scene-t: 0"
            >
                <span class="text-small text-muted-foreground">
                    <code class="fira-code">useScrollScene</code> — damped progress
                    (scrub 0.618)
                </span>
                <div class="bg-muted h-2 w-full overflow-hidden rounded-pill">
                    <div
                        class="h-full rounded-pill bg-[var(--motion-accent)]"
                        style="width: calc(var(--scene-t) * 100%)"
                    />
                </div>
            </div>
        </section>
    </StoryPage>
</template>
