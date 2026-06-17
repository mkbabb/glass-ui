<script setup lang="ts">
// Scroll Choreography (BB.W-SCROLL-MOTION) — the canonical demonstration of the SOTA
// scroll-driven CHOREOGRAPHY register: the page-load BUILD, the section CASCADE, the
// scroll-PINNED fixed-stage-advances-time reveals + the native smooth-scroll opt-in,
// all on the native scroll()/view()/timeline-scope substrate (NO Lenis/GSAP dep — the
// platform now ships these natively, off the compositor at 60fps).
//
// This story CONSUMES the registers — no new substrate:
//   · the PAGE-BUILD rides this route's own StoryPage <article> mount (the chrome →
//     hero → body coordinated entrance, scroll-choreography.css `.scroll-build`).
//   · the SECTION-CASCADE rides this StoryPage's section wrap (each StorySection
//     builds in on its own view() timeline — the implicit stagger, `.scroll-cascade`).
//   · the SCROLL-PINNED showcase below is the `.scroll-pin`/`.scroll-pin-stage`
//     register — a position: sticky stage whose internal phases advance with scroll
//     (the fixed-stage-advances-time read).
// Reduced-motion is the outer gate on every recipe (they never bind under PRM — the
// terminal static layout).
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { onMounted, ref } from "vue";
import {
    supportsScrollTimeline,
    supportsViewTimeline,
} from "../../../src/composables/motion/supportsCssTimeline";

// ── Capability badges ───────────────────────────────────────────────────────────
const scrollOk = ref(false);
const viewOk = ref(false);
const timelineScopeOk = ref(false);
onMounted(() => {
    scrollOk.value = supportsScrollTimeline();
    viewOk.value = supportsViewTimeline();
    // The scroll-pin's newest primitive — timeline-scope. The harden's negative-probe
    // pattern: a real engine supports a valid value AND rejects garbage.
    timelineScopeOk.value =
        typeof CSS !== "undefined" &&
        typeof CSS.supports === "function" &&
        CSS.supports("timeline-scope", "--x") &&
        !CSS.supports("timeline-scope", "gl-not-real");
});
</script>

<template>
    <StoryPage>
        <StorySection heading="The register">
            <p class="text-prose text-muted-foreground max-w-prose">
                Three recipes on the native substrate, all compositor-only and
                reduced-motion-safe:
                <code class="fira-code">.scroll-build</code> (the route-enter
                page-build — this page just assembled chrome → hero → body),
                <code class="fira-code">.scroll-cascade</code> (the section cascade —
                each block below builds in on its own
                <code class="fira-code">view()</code> timeline), and
                <code class="fira-code">.scroll-pin</code> (the
                fixed-stage-advances-time scroll-pinned showcase further down).
            </p>

            <div class="flex flex-wrap gap-3">
                <span
                    class="text-admin-label rounded-pill border px-3 py-1"
                    :class="
                        scrollOk
                            ? 'border-success/40 text-success'
                            : 'border-border/60 text-muted-foreground'
                    "
                >
                    scroll() {{ scrollOk ? "supported" : "fallback" }}
                </span>
                <span
                    class="text-admin-label rounded-pill border px-3 py-1"
                    :class="
                        viewOk
                            ? 'border-success/40 text-success'
                            : 'border-border/60 text-muted-foreground'
                    "
                >
                    view() {{ viewOk ? "supported" : "fallback" }}
                </span>
                <span
                    class="text-admin-label rounded-pill border px-3 py-1"
                    :class="
                        timelineScopeOk
                            ? 'border-success/40 text-success'
                            : 'border-border/60 text-muted-foreground'
                    "
                >
                    timeline-scope
                    {{ timelineScopeOk ? "supported" : "static fallback" }}
                </span>
            </div>
        </StorySection>

        <StorySection heading="Section cascade">
            <p class="text-prose text-muted-foreground max-w-prose">
                Each of these blocks builds in on entry, keyed off its OWN
                <code class="fira-code">view()</code> timeline — the implicit
                stagger, NO setTimeout cascade. The entrance is the spring-clocked
                coupled transform + opacity build (not a flat fade).
            </p>
            <div class="grid gap-3 sm:grid-cols-2">
                <div
                    v-for="n in 6"
                    :key="n"
                    class="glass-card rounded-card p-5"
                >
                    <!-- The motion-band ONE color event: the demo-local --motion-accent
                         violet (the --viz-legendre twin at demo/demo.css), the SAME
                         coherent violet the springs/reveal/scroll-vt band reads. -->
                    <p class="text-heading text-foreground flex items-center gap-2">
                        <span class="size-2 rounded-pill bg-[var(--motion-accent)]" />
                        Cascade {{ n }}
                    </p>
                    <p class="text-small text-muted-foreground">
                        Builds in on its own view() timeline.
                    </p>
                </div>
            </div>
        </StorySection>

        <StorySection heading="Scroll-pinned showcase">
            <p class="text-prose text-muted-foreground max-w-prose">
                Scrolling does not move the scene — it advances time inside it. The
                stage below pins to the viewport while its tall container scrolls
                past; the stage's internal phases (reveal → settle) advance against
                the container's named scroll-timeline (linked via
                <code class="fira-code">timeline-scope</code>). On a non-supporting
                engine it is a correct static read (no broken silent stage).
            </p>

            <!-- The .scroll-pin tall temporal container holds the sticky stage. -->
            <div class="scroll-pin rounded-card border border-border/40">
                <div
                    class="scroll-pin-stage flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8"
                >
                    <div
                        class="scroll-pin-phase-reveal glass-card rounded-card flex flex-col items-center gap-3 p-10"
                    >
                        <span class="size-2 rounded-pill bg-[var(--motion-accent)]" />
                        <p class="text-display-4 text-foreground">Pinned</p>
                        <p class="text-small text-muted-foreground">
                            Phase 1 — the reveal (0–45% of the container scroll).
                        </p>
                    </div>
                    <p
                        class="scroll-pin-phase-settle text-prose text-muted-foreground max-w-prose text-center"
                    >
                        Phase 2 — the stage settles and drifts as you continue past
                        (45–90%). The scene is fixed; scroll advances its time.
                    </p>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
