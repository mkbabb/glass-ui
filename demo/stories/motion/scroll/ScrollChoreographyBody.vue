<script setup lang="ts">
// BG.W-DEMO-DUP-MERGE (F7.3) — the Scroll CHOREOGRAPHY register body, extracted from
// the retired routed `scroll-choreography.vue` wrapper (the StoryPage chrome stripped;
// composed as one <StorySection> register inside motion/scroll.vue). The canonical
// demonstration of the SOTA scroll-driven CHOREOGRAPHY register: the page-load BUILD,
// the section CASCADE, the scroll-PINNED fixed-stage-advances-time reveals + the native
// smooth-scroll opt-in, all on the native scroll()/view()/timeline-scope substrate (NO
// Lenis/GSAP dep).
//
// It CONSUMES the registers — no new substrate. Reduced-motion is the outer gate on
// every recipe. PascalCase composed-by helper.
import StorySection from "../../../chassis/section/StorySection.vue";
import { onMounted, ref } from "vue";
import {
    supportsScrollTimeline,
    supportsViewTimeline,
} from "@glass/composables/motion/supportsCssTimeline";
import { useScrollPin } from "@glass/composables/motion/useScrollPin";

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

// ── The scroll-PIN — the keyframes.js liquid spine (BD.W-SCROLL-LIQUID-ENGINE) ───
// The prior `.scroll-pin` named `scroll-timeline` was structurally DEAD (its
// `currentTime` was `null` on every engine — `.scroll-pin` is not a scroll port).
// `useScrollPin` drives a spring-damped `--pin-t` onto the sticky stage off the REAL
// scroll port (`main.demo-main-scroller`, the AppShell route scroller) via
// `SpringProgress` over the ONE `createScrollReader` — so the reveal arrives with
// inertia, overshoots, then settles, on EVERY engine.
const pinContainer = ref<HTMLElement | null>(null);
useScrollPin({
    container: pinContainer,
    // The route scroller the AppShell owns (px-scrolled, NOT the window). Resolved at
    // mount — `useScrollScene` reads it inside its own `onMounted` attach.
    source: () =>
        (typeof document !== "undefined"
            ? document.querySelector<HTMLElement>("main.demo-main-scroller")
            : null),
});
</script>

<template>
        <StorySection heading="The register">
            <p class="text-prose text-muted-foreground max-w-prose">
                Two scroll recipes on the native substrate, both compositor-only and
                reduced-motion-safe:
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
                past; the stage's internal phases (reveal → settle) advance against a
                spring-damped <code class="fira-code">--pin-t</code> the keyframes.js
                scroll spine writes off the real scroll port — so the reveal arrives
                with inertia, overshoots, then settles, on every engine (no
                <code class="fira-code">animation-timeline</code>, no Safari degrade).
            </p>

            <!-- The .scroll-pin tall temporal container holds the sticky stage. The
                 ref feeds useScrollPin, which writes --pin-t onto it per scroll tick. -->
            <div
                ref="pinContainer"
                class="scroll-pin rounded-card border border-border/40"
            >
                <div
                    class="scroll-pin-stage flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8"
                >
                    <!-- The colorful field behind the reveal (the NO-GRAY repair —
                         a coherent violet wash so the pin glass reads warm, not
                         near-neutral; aria-hidden, purely decorative). -->
                    <div
                        aria-hidden="true"
                        class="pointer-events-none absolute inset-x-8 inset-y-12 rounded-card bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--motion-accent)_38%,transparent),transparent_70%)] blur-2xl"
                    />
                    <!-- The reveal card: glass-card warm-cream + cartoon-surface (the
                         2px defined edge + offset cel stamp) + the shipped .cartoon-cast
                         inert child (the moving cel cast on --shadow-cartoon-md). -->
                    <div
                        class="scroll-pin-phase-reveal cartoon-surface glass-card rounded-card relative flex flex-col items-center gap-3 p-10"
                    >
                        <span aria-hidden="true" class="cartoon-cast" />
                        <span class="size-2 rounded-pill bg-[var(--motion-accent)]" />
                        <p class="text-display-4 text-foreground">Pinned</p>
                        <p class="text-small text-muted-foreground">
                            Phase 1 — the spring reveal (slam → overshoot → settle).
                        </p>
                    </div>
                    <p
                        class="scroll-pin-phase-settle text-prose text-muted-foreground max-w-prose text-center"
                    >
                        Phase 2 — the stage settles and drifts as you continue past.
                        The scene is fixed; scroll advances its time, with weight.
                    </p>
                </div>
            </div>
        </StorySection>
</template>
