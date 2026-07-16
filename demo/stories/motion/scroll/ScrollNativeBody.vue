<script setup lang="ts">
// BG.W-DEMO-DUP-MERGE (F7.3) — the Scroll NATIVE register body, extracted from the
// retired routed `scroll-vt.vue` wrapper (the StoryPage chrome stripped; composed as
// one <StorySection> register inside motion/scroll.vue). The first live demonstration
// of the SHIPPED native scroll-driven + view-transition facilities:
//   · scroll-driven.css `.scroll-progress` (a scroll() timeline scaleX bar)
//   · scroll-driven.css `[data-scroll-reveal]` (a per-child view() timeline fade+lift)
//   · `startViewTransition` (the useViewTransition substrate) reordering a
//     `.gl-list-item` group (view-transition.css)
//   · a `supportsScrollTimeline`/`supportsViewTimeline` capability badge
// These CONSUME the facilities — no new substrate. Reduced-motion is the outer gate
// on the CSS recipes (they never bind under PRM). PascalCase composed-by helper.
import StorySection from "../../../chassis/section/StorySection.vue";
import { onMounted, ref } from "vue";
import { startViewTransition } from "@glass/composables/motion/useViewTransition";
import {
    supportsScrollTimeline,
    supportsViewTimeline,
} from "@glass/composables/motion/supportsCssTimeline";
import { Button } from "@glass/components/button";
import { cn } from "@glass/components/_shared/class-names";

// ── Capability badges ───────────────────────────────────────────────────────────
const scrollOk = ref(false);
const viewOk = ref(false);
onMounted(() => {
    scrollOk.value = supportsScrollTimeline();
    viewOk.value = supportsViewTimeline();
});

// ── View-transition reorder (the .gl-list-item group recipe) ─────────────────────
const rows = ref([
    { id: "alpha", label: "Alpha" },
    { id: "bravo", label: "Bravo" },
    { id: "charlie", label: "Charlie" },
    { id: "delta", label: "Delta" },
    { id: "echo", label: "Echo" },
]);

function shuffle(): void {
    startViewTransition(() => {
        const next = [...rows.value];
        // rotate by one — every row animates to its new slot via the VT group.
        const first = next.shift();
        if (first) next.push(first);
        rows.value = next;
    });
}

// reveal scroller content
const REVEAL_ITEMS = Array.from({ length: 8 }, (_, i) => `Reveal card ${i + 1}`);
</script>

<template>
        <StorySection
            label="Capability"
            blurb="The native scroll-driven + view-transition primitives the library reaches for, with a live capability probe. Where the engine lacks animation-timeline, the JS composables are the ≤20-LOC fallback (single writer, no double-run)."
        >
            <div class="flex flex-wrap gap-3">
                <span
                    :class="cn(
                        'inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-sm font-medium',
                        scrollOk ? 'bg-[var(--surface-tint-2)] text-foreground' : 'bg-[var(--surface-tint-1)] text-muted-foreground',
                    )"
                >
                    <span :class="cn('size-2 rounded-pill', scrollOk ? 'bg-[var(--motion-accent)]' : 'bg-muted-foreground')" />
                    scroll() timeline {{ scrollOk ? "supported" : "fallback" }}
                </span>
                <span
                    :class="cn(
                        'inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-sm font-medium',
                        viewOk ? 'bg-[var(--surface-tint-2)] text-foreground' : 'bg-[var(--surface-tint-1)] text-muted-foreground',
                    )"
                >
                    <span :class="cn('size-2 rounded-pill', viewOk ? 'bg-[var(--motion-accent)]' : 'bg-muted-foreground')" />
                    view() timeline {{ viewOk ? "supported" : "fallback" }}
                </span>
            </div>
        </StorySection>

        <StorySection
            label="Scroll progress (scroll() timeline)"
            blurb="A .scroll-progress bar driven entirely on the compositor by a native scroll() timeline — no rAF, no scroll listener. Scroll the panel; the bar tracks 0→1 off the main thread."
        >
            <!-- BG.W-SCROLL-PROGRESS-RAIL — the genuine NAMED-timeline cross-element
                 case: the bar is a SIBLING of the scroller, so it cannot reach the
                 scroller's `--sp` scroll-timeline by ancestry. `timeline-scope: --sp`
                 on the common wrapper hoists the name so the sibling bar can read it;
                 the bar sets the FULL-value `--scroll-progress-timeline: --sp` (a bare
                 named timeline, NEVER a `scroll(var(...))` fragment). -->
            <div
                class="relative overflow-hidden rounded-card border border-border/60"
                style="timeline-scope: --sp"
            >
                <!-- the compositor-driven progress bar, driven by the sibling
                     scroller's named `--sp` timeline -->
                <div
                    class="scroll-progress absolute inset-x-0 top-0 z-10 h-1 bg-[var(--motion-accent)]"
                    style="--scroll-progress-timeline: --sp"
                />
                <div class="h-64 overflow-y-auto p-4" style="scroll-timeline: --sp block" tabindex="0">
                    <p v-for="n in 14" :key="n" class="mb-4 text-small text-muted-foreground">
                        Paragraph {{ n }} — scroll this panel to drive the progress bar above. The bar's
                        scaleX is animated by the native scroll() timeline, so it costs the main thread
                        nothing.
                    </p>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="View-driven reveal (view() timeline)"
            blurb="Each card fades + lifts on entry via its OWN per-element view() timeline — the stagger is implicit (no setTimeout cascade). Scroll the row into view to watch each card resolve."
        >
            <div
                data-scroll-reveal
                class="grid h-72 grid-cols-1 gap-3 overflow-y-auto rounded-card border border-border/60 p-4 sm:grid-cols-2"
                tabindex="0"
            >
                <div
                    v-for="item in REVEAL_ITEMS"
                    :key="item"
                    class="glass-card flex h-24 items-center justify-center rounded-card text-small font-medium text-foreground"
                >
                    {{ item }}
                </div>
            </div>
        </StorySection>

        <StorySection
            label="View Transitions (.gl-list-item group)"
            blurb="Reorder the list — each row animates from its old slot to its new one through the startViewTransition substrate + the .gl-list-item group recipe. On an engine without View Transitions the swap is instant (functional, just unanimated)."
        >
            <div class="flex flex-col gap-3">
                <Button class="self-start" @click="shuffle">Rotate order</Button>
                <ul class="flex flex-col gap-2">
                    <li
                        v-for="row in rows"
                        :key="row.id"
                        class="glass-card flex items-center gap-3 rounded-card px-4 py-3 text-small text-foreground"
                        :style="{ viewTransitionName: `vt-${row.id}`, viewTransitionClass: 'gl-list-item' }"
                    >
                        <span class="size-2 rounded-pill bg-[var(--motion-accent)]" />
                        {{ row.label }}
                    </li>
                </ul>
            </div>
        </StorySection>
</template>
