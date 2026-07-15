<script setup lang="ts">
// BG.W-DEMO-DUP-MERGE (F7.3) — the Scroll READER register body, extracted from the
// retired routed `scroll-system.vue` wrapper (the StoryPage chrome stripped; composed
// as one <StorySection> register inside motion/scroll.vue). The live exerciser for the
// ONE scroll reader, `useScrollTrigger`. Point it at a scroll source and it gives back
// two things off the SAME rAF-coalesced read (the shared `createScrollReader` core):
//   · a continuous `progress` ref (0..1) for ramps,
//   · discrete crossing events — onCross / onEnter / onLeave — that fire ONCE when the
//     scroll position passes a declared trigger-point in a given direction (a flip-delta
//     debounce so a 1px jitter never re-fires).
// Plus `direction` (committed past the 8px flip-delta) and `velocity` (px/s,
// framerate-independent). This is the trigger-point reader BC.W-SCROLL-CHROME consumes
// for the dock + page-header collapse — the §3.2 gap #1 closed.
//
// It CONSUMES the reader — no new substrate, no second listener. PascalCase composed-by
// helper.
import StorySection from "../../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
import {
    useScrollChrome,
    useScrollTrigger,
} from "@glass/composables/motion/core";
import type { TriggerPoint } from "@glass/composables/motion/core";

// The bounded scroll-port — the reader's source (an element with its own scroll).
const port = ref<HTMLElement | null>(null);

// The trigger-points the chrome would declare: a pixel shrink threshold (down-only),
// a mid-scroll fraction (both directions), and an element trigger (the marker's top).
const marker = ref<HTMLElement | null>(null);
const triggers: TriggerPoint[] = [
    { at: 120, id: "shrink", direction: "down" },
    { at: { fraction: 0.5 }, id: "midpoint", direction: "both" },
    { at: { element: marker }, id: "marker", direction: "both" },
];

// The live event log (most-recent-first; each crossing appends ONE entry).
const log = ref<{ id: string; dir: "down" | "up"; pos: number }[]>([]);
function push(id: string, dir: "down" | "up", pos: number) {
    log.value = [{ id, dir, pos: Math.round(pos) }, ...log.value].slice(0, 8);
}

const { progress, direction, velocity, recalculate } = useScrollTrigger(port, {
    triggers,
    onCross(id, dir, pos) {
        push(id, dir, pos);
    },
});

const progressPct = computed(() => `${Math.round(progress.value * 100)}%`);
const velocityRead = computed(() => `${Math.round(velocity.value)} px/s`);

function clear() {
    log.value = [];
}

// ── BC.W-SCROLL-CHROME — the floating-chrome COLLAPSE demonstration. A bounded scroll
// port with a FLOATING header that SHRINKS on scroll-down, EXPANDS on scroll-up, FLICKS
// to the endpoint on a fast scroll, and SNAPS to the nearest state on scroll-stop. The
// header is `.scroll-chrome`; the `useScrollChrome` machine writes `--chrome-collapse-t`
// onto it (the chromeRef seam) so the recipe paints the compositor shrink/quiet. This is
// the binary consumer #2 of useScrollChrome. collapseOnScroll: TRUE (the explicit opt-in —
// the default is PERSISTENT, the iOS-27 lesson).
const collapsePort = ref<HTMLElement | null>(null);
const collapseHeader = ref<HTMLElement | null>(null);
const { collapseT, collapsed, direction: collapseDir } = useScrollChrome(collapsePort, {
    collapseOnScroll: true,
    chromeRef: collapseHeader,
    velocityGate: 1400,
    collapseRangePx: 116,
});
const collapsePct = computed(() => `${Math.round(collapseT.value * 100)}%`);
</script>

<template>
        <StorySection heading="The one scroll reader">
            <p class="text-prose text-muted-foreground max-w-prose">
                <code class="fira-code">useScrollTrigger</code> gives a continuous
                <code class="fira-code">progress</code> ramp AND discrete
                <code class="fira-code">onCross</code> /
                <code class="fira-code">onEnter</code> /
                <code class="fira-code">onLeave</code> trigger-point events off the
                SAME rAF-coalesced read — the dual-path single-writer. Scroll the
                bounded port below: the readout updates live, and each trigger
                crossing logs ONCE (a jitter at a boundary fires nothing — the
                <code class="fira-code">flipDeltaPx = 8</code> anti-thrash).
            </p>

            <!-- The live readout off the reader. -->
            <div class="flex flex-wrap gap-3">
                <span class="text-admin-label rounded-pill border border-border/60 px-3 py-1">
                    progress {{ progressPct }}
                </span>
                <span class="text-admin-label rounded-pill border border-border/60 px-3 py-1">
                    direction {{ direction ?? "—" }}
                </span>
                <span class="text-admin-label rounded-pill border border-border/60 px-3 py-1">
                    velocity {{ velocityRead }}
                </span>
            </div>
        </StorySection>

        <StorySection heading="Scroll the port">
            <div class="grid gap-4 sm:grid-cols-[1fr_auto]">
                <!-- The bounded scroll-PORT — the reader's source. The tall inner column
                     overflows it, so its own scroll drives the trigger crossings. -->
                <div
                    ref="port"
                    class="glass-card rounded-card h-[24rem] overflow-y-auto p-5"
                >
                    <div class="flex flex-col gap-4">
                        <p class="text-heading text-foreground flex items-center gap-2">
                            <span class="size-2 rounded-pill bg-[var(--motion-accent)]" />
                            Scroll me
                        </p>
                        <div
                            v-for="n in 14"
                            :key="n"
                            class="glass-quiet rounded-card p-4"
                        >
                            <p class="text-small text-foreground">Row {{ n }}</p>
                            <p class="text-small text-muted-foreground">
                                Crossing the 120px / 50% / marker trigger-points fires
                                onCross once each.
                            </p>
                            <!-- The element trigger marker sits at ~row 7. -->
                            <span v-if="n === 7" ref="marker" class="block h-px" />
                        </div>
                    </div>
                </div>

                <!-- The live crossing-event log. -->
                <div class="glass-quiet rounded-card flex min-w-[14rem] flex-col gap-2 p-4">
                    <div class="flex items-center justify-between">
                        <span class="text-admin-label text-muted-foreground">
                            onCross log
                        </span>
                        <button
                            class="text-admin-label text-muted-foreground hover:text-foreground"
                            type="button"
                            @click="clear"
                        >
                            clear
                        </button>
                    </div>
                    <p
                        v-if="log.length === 0"
                        class="text-small text-muted-foreground"
                    >
                        Scroll the port to log crossings.
                    </p>
                    <ul v-else class="flex flex-col gap-1">
                        <li
                            v-for="(e, i) in log"
                            :key="i"
                            class="text-small fira-code text-foreground"
                        >
                            <span class="text-[var(--motion-accent)]">{{ e.id }}</span>
                            {{ e.dir }} @ {{ e.pos }}px
                        </li>
                    </ul>
                    <button
                        class="text-admin-label rounded-pill border border-border/60 px-3 py-1 text-muted-foreground hover:text-foreground"
                        type="button"
                        @click="recalculate"
                    >
                        recalculate
                    </button>
                </div>
            </div>
        </StorySection>

        <StorySection heading="Shrink the floating chrome on scroll">
            <p class="text-prose text-muted-foreground max-w-prose">
                <code class="fira-code">useScrollChrome</code> is a thin collapse-state
                machine over the ONE reader: scroll the port DOWN and the floating header
                shrinks; scroll UP and it expands back; flick fast and it toggles
                immediately; STOP and it SNAPS to the nearest fully-collapsed-or-expanded
                state (never frozen half-collapsed). The shrink is a compositor
                <code class="fira-code">transform: scale/translateY</code> + an
                <code class="fira-code">opacity</code> quiet (bounded — the bar reads at
                every fraction); the box never reflows. PERSISTENT by default —
                <code class="fira-code">collapseOnScroll: true</code> is the explicit opt-in.
            </p>

            <!-- The collapse readout off the machine. -->
            <div class="flex flex-wrap gap-3">
                <span class="text-admin-label rounded-pill border border-border/60 px-3 py-1">
                    collapse {{ collapsePct }}
                </span>
                <span class="text-admin-label rounded-pill border border-border/60 px-3 py-1">
                    state {{ collapsed ? "collapsed" : "expanded" }}
                </span>
                <span class="text-admin-label rounded-pill border border-border/60 px-3 py-1">
                    direction {{ collapseDir ?? "—" }}
                </span>
            </div>

            <!-- The scroll port with a FLOATING .scroll-chrome header over it. The port
                 scrolls under the header; the machine writes --chrome-collapse-t onto the
                 header, the recipe paints the shrink/quiet. -->
            <div class="relative h-[26rem] overflow-hidden rounded-card">
                <!-- The floating header — .scroll-chrome reads --chrome-collapse-t. -->
                <header
                    ref="collapseHeader"
                    class="scroll-chrome glass-floating rounded-card absolute inset-x-3 top-3 z-10 flex items-center gap-3 px-5 py-3"
                >
                    <span class="size-2.5 rounded-pill bg-[var(--motion-accent)]" />
                    <span class="text-subheading text-foreground">Floating header</span>
                    <span class="text-admin-label text-muted-foreground ml-auto">
                        shrinks as you scroll
                    </span>
                </header>

                <!-- The bounded scroll port — the machine's source. The header floats over
                     it; the tall content scrolls under. -->
                <div
                    ref="collapsePort"
                    class="h-full overflow-y-auto px-3 pb-3 pt-[5.5rem]"
                >
                    <div class="flex flex-col gap-4">
                        <div
                            v-for="n in 20"
                            :key="n"
                            class="glass-quiet rounded-card p-4"
                        >
                            <p class="text-small text-foreground">Content row {{ n }}</p>
                            <p class="text-small text-muted-foreground">
                                Scroll down to shrink the header; scroll up to expand it;
                                stop to snap to the nearest state.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StorySection>
</template>
