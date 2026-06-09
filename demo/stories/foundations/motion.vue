<script setup lang="ts">
// Motion — the one page for the motion VOCABULARY: the named easing + spring
// curves (the timing tokens) AND the Vue <Transition> class-sets that compose
// them. The live motion PRIMITIVES (the spring orchestrator, count-up,
// typewriter, the reveal directive) each have their own page in the Motion
// category; this is the foundation tour of the grammar they all speak.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import { Button } from "../../../src/components/ui/button";
import { cn } from "../../../src/utils/cn";

// ── The named curve register ──────────────────────────────────────────────────
interface Curve {
    id: string;
    label: string;
    cssVar: string;
    kind: "cubic" | "spring";
}

const curves: Curve[] = [
    { id: "ease-standard", label: "ease-standard", cssVar: "--ease-standard", kind: "cubic" },
    { id: "ease-out", label: "ease-out", cssVar: "--ease-out", kind: "cubic" },
    { id: "ease-in", label: "ease-in", cssVar: "--ease-in", kind: "cubic" },
    { id: "ease-out-expo", label: "ease-out-expo", cssVar: "--ease-out-expo", kind: "cubic" },
    { id: "ease-apple", label: "ease-apple", cssVar: "--ease-apple", kind: "cubic" },
    // The spring tour is the --spring-* register vocabulary (incl. the dock register).
    { id: "spring-smooth", label: "spring-smooth", cssVar: "--spring-smooth", kind: "spring" },
    { id: "spring-snappy", label: "spring-snappy", cssVar: "--spring-snappy", kind: "spring" },
    { id: "spring-bouncy", label: "spring-bouncy", cssVar: "--spring-bouncy", kind: "spring" },
    { id: "spring-gentle", label: "spring-gentle", cssVar: "--spring-gentle", kind: "spring" },
    { id: "spring-dock", label: "spring-dock", cssVar: "--spring-dock", kind: "spring" },
];

const dotRefs = ref<Record<string, HTMLElement | null>>({});

// Drive a 500px translateX via WAAPI using the named timing function. Springs
// resolve to `linear(...)` stops; cubic-bezier curves to named cubics. WAAPI
// accepts raw CSS easing strings, so we pull the computed value from :root.
function play(curve: Curve): void {
    const el = dotRefs.value[curve.id];
    if (!el) return;
    const easing = getComputedStyle(document.documentElement)
        .getPropertyValue(curve.cssVar)
        .trim();
    if (!easing) return;
    el.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(500px)" }],
        { duration: 900, easing, fill: "none" },
    );
}

function setDotRef(id: string, el: Element | null): void {
    dotRefs.value[id] = el as HTMLElement | null;
}

// ── The Vue <Transition> class-sets ───────────────────────────────────────────
interface TransitionDemo {
    id: string;
    name: string;
    blurb: string;
    cssClass: string; // Transition name prop → matches .<name>-enter-active etc.
}

const transitionDemos: TransitionDemo[] = [
    {
        id: "fade",
        name: "fade",
        blurb: "Symmetric, fast opacity — the plainest tool in the box.",
        cssClass: "fade",
    },
    {
        id: "fade-slide",
        name: "fade-slide",
        blurb: "Spring-entered, accelerate-out translateY — menus, hints, floaters.",
        cssClass: "fade-slide",
    },
    {
        id: "pop",
        name: "pop",
        blurb: "Bouncy scale-up, brisk ease-out exit — popovers, badges.",
        cssClass: "pop",
    },
    {
        id: "dialog-scale",
        name: "dialog-scale",
        blurb: "Dialog-appropriate: slow bouncy entry, measured exit.",
        cssClass: "dialog-scale",
    },
    {
        id: "dropdown",
        name: "dropdown",
        blurb: "Instant opacity, snappy spring transform — menus.",
        cssClass: "dropdown",
    },
    {
        id: "tab-fade",
        name: "tab-fade",
        blurb: "Fast opacity-only swap — tab panels, pane crossfades.",
        cssClass: "tab-fade",
    },
];

const visible = ref<Record<string, boolean>>(
    Object.fromEntries(transitionDemos.map((d) => [d.id, true])),
);

function toggle(id: string): void {
    visible.value[id] = !visible.value[id];
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="Easing + spring curves"
            blurb="Click a row — the dot slides 500px with that curve. Springs are linear() stops
                generated from damped physics; cubics are classic bézier. These are the named
                timing tokens every transition and animation in the library reaches for."
        >
            <div class="flex flex-col gap-2">
                <div
                    v-for="c in curves"
                    :key="c.id"
                    :class="
                        cn(
                            'group grid grid-cols-[12rem_4rem_1fr] items-center gap-4 rounded-panel border border-border/60 bg-card/60 px-4 py-3',
                            'cursor-pointer transition-colors duration-fast hover:bg-card',
                        )
                    "
                    role="button"
                    tabindex="0"
                    @click="play(c)"
                    @keydown.enter.prevent="play(c)"
                    @keydown.space.prevent="play(c)"
                >
                    <div class="flex flex-col">
                        <span class="text-small text-foreground">{{ c.label }}</span>
                        <span class="text-mono-caption text-muted-foreground">{{ c.kind }}</span>
                    </div>

                    <!--
                       Tiny curve preview — for cubic curves we sketch an approximate
                       quarter-ellipse; springs just render a suggestive squiggle. The
                       intent is a visual hint, not a precise plot.
                    -->
                    <svg
                        viewBox="0 0 40 20"
                        class="h-5 w-10 text-muted-foreground"
                        aria-hidden="true"
                    >
                        <path
                            v-if="c.kind === 'cubic'"
                            d="M 0 18 C 8 18 14 10 20 6 S 38 2 40 2"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />
                        <path
                            v-else
                            d="M 0 18 Q 6 -2 14 6 T 26 8 T 40 4"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />
                    </svg>

                    <div class="relative h-4 w-full">
                        <span
                            :ref="(el) => setDotRef(c.id, el as Element | null)"
                            :class="
                                cn(
                                    'absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-pill',
                                    'bg-[var(--viz-fourier)] shadow-cartoon-sm',
                                )
                            "
                        />
                    </div>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="Transition class-sets"
            blurb="The Vue <Transition> class-sets shipped in the library — each composes the
                curves above into an enter/leave grammar for a kind of surface. Toggle a card to
                watch the sample enter and leave."
        >
            <section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="demo in transitionDemos"
                    :key="demo.id"
                    :class="
                        cn(
                            'flex flex-col gap-4 rounded-card border border-border bg-card p-5',
                            'shadow-cartoon',
                        )
                    "
                >
                    <div class="flex flex-col gap-1">
                        <code class="fira-code text-small text-foreground">{{ demo.name }}</code>
                        <p class="text-small text-muted-foreground">{{ demo.blurb }}</p>
                    </div>

                    <div
                        :class="
                            cn(
                                'relative flex h-28 items-center justify-center',
                                'rounded-panel border border-border/60 bg-background/40',
                                'overflow-hidden',
                            )
                        "
                    >
                        <Transition :name="demo.cssClass">
                            <div
                                v-if="visible[demo.id]"
                                :class="
                                    cn(
                                        'flex h-16 w-40 items-center justify-center rounded-panel',
                                        'bg-[var(--viz-fourier)] text-small font-medium text-white',
                                        'shadow-cartoon-sm',
                                    )
                                "
                            >
                                hello
                            </div>
                        </Transition>
                    </div>

                    <div class="flex items-center justify-between">
                        <span class="text-mono-caption text-muted-foreground">
                            v-if · {{ visible[demo.id] ? "true" : "false" }}
                        </span>
                        <Button size="sm" variant="secondary" @click="toggle(demo.id)">
                            Toggle
                        </Button>
                    </div>
                </div>
            </section>
        </StorySection>
    </StoryPage>
</template>
