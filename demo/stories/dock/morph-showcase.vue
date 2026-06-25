<script setup lang="ts">
// BD.W-MORPH-FIELD-WELD (M3 — the crossfade DIES) — the vertical↔horizontal liquid-glass
// dock morph showcase, RE-POINTED onto the unified WELD.
//
// THE DEFECT THIS FIXES (the user's #2 — "/dock/morph-showcase does not work at all, only
// the teardrop preview works"). HEAD shipped the V↔H as a `startViewTransition` crossfade
// DEFAULT — pressing the button flipped `dock-morph-vt-vertical`→`-horizontal` in ONE
// frame while `--dock-morph-t` stayed 0.000 the whole transition (the topology dodge: the
// surface confessed "the platform cannot continuously interpolate a mismatched-topology
// silhouette"). The morph never drove a field — it snapped. The ONLY thing that worked was
// the opt-in "Liquid teardrop" preview, because that path actually drove the scalar.
//
// THE FIX (the amendment §4b/M3): the crossfade DIES. A scalar FIELD has no topology — two
// masses becoming one bar is a single weld over `--dock-morph-t`, no discrete reflow to
// dodge. The continuous metaball teardrop is now the SHIPPED DEFAULT: pressing the button
// drives `useDockOrientationMorph`'s `--dock-morph-t` spring (the SAME shipped scalar), the
// two real docks ride it (the vertical collapses height while the horizontal grows width),
// and the SVG-goo bridge (the ONE `<GooFilter>` mount's `#dock-morph-goo`) merges them into
// one amorphous LOBBING teardrop through the midpoint. The `liquidPreview` gate evaporates
// — there is ONE mode, the weld. PRM snaps (the morph still confirms, zero neck frames).
//
// CROSS-ENGINE (§L7). The goo filter is the REGULAR `filter:url(#dock-morph-goo)` off the
// shell-root `<GooFilter>` mount (sRGB, generous region — NEVER backdrop-filter, bug
// 245510), applied on the bridge SIBLING layer (never an ancestor of the glass docks — an
// ancestor filter kills backdrop-filter on descendants). Gated to the occluded midpoint
// window so it never steady-state re-blurs. The Tier-C clip-path teardrop under it is the
// WebKit-Metal floor.
import { computed, nextTick, onMounted, ref, useTemplateRef } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Compass, Shapes, Boxes, Database, Bell, ArrowLeftRight } from "@lucide/vue";
import {
    DockIconButton,
    GlassDock,
    useDockOrientationMorph,
} from "../../../src/components/custom/dock";
import { Button } from "../../../src/components/ui/button";
import DockStage from "./DockStage.vue";

const entries = [
    { id: "foundations", label: "Foundations", icon: Compass },
    { id: "primitives", label: "Primitives", icon: Shapes },
    { id: "containers", label: "Containers", icon: Boxes },
    { id: "data", label: "Data", icon: Database },
    { id: "feedback", label: "Feedback", icon: Bell },
];

// The stage root the ONE --dock-morph-t scalar is written to; the two docks + the bridge
// live under it and read the inheriting scalar.
const stageEl = useTemplateRef<HTMLElement>("stageEl");

// The dock footprints (px) — the morph spans for the liquid size morph.
const V_FULL_H = 296;
const H_FULL_W = 332;

// The deterministic V↔H driver — drives the two-dock scalar morph + the teardrop squish
// off the ONE --dock-morph-t spring. THIS is the shipped default now (no VT crossfade arm).
const morph = useDockOrientationMorph({
    rootEl: stageEl,
    verticalSize: V_FULL_H,
    horizontalSize: H_FULL_W,
});

const facing = computed(() =>
    morph.orientation.value === "vertical" ? "horizontal" : "vertical",
);

// The goo filter is gated to the occluded MIDPOINT window (t∈(0.18,0.82)) where the plates
// merge — a pure f(--dock-morph-t), no clock. The id resolves off the ONE shell-root
// <GooFilter> mount (`#dock-morph-goo`), NOT an inline per-route <filter> (the M1 dedup).
const gooFilter = computed(() =>
    morph.t.value > 0.18 && morph.t.value < 0.82 ? "url(#dock-morph-goo)" : "none",
);

function toggleMorph(): void {
    // The continuous WELD — the SAME scalar both ways (bidirectional, interruptible). No
    // crossfade, no topology dodge. PRM snaps inside the driver.
    morph.toggle();
}

// DETERMINISTIC CAPTURE SEAM — the π/Playwright arm drives EXACT t values (0/.25/.5/.75/1,
// both directions) to capture the weld's frame-series. The scalar is the ONE source;
// pinning it yields a frame-reproducible silhouette (no wall-clock).
function setMorphT(value: number): void {
    void nextTick(() => morph.pin(value));
    (window as unknown as { __morphT?: number }).__morphT = value;
}

onMounted(() => {
    (
        window as unknown as {
            __dockMorphShowcase?: {
                setMorphT: (t: number) => void;
                toggle: () => void;
                morphTo: (o: "vertical" | "horizontal") => void;
            };
        }
    ).__dockMorphShowcase = {
        setMorphT,
        toggle: () => void nextTick(() => morph.toggle()),
        morphTo: (o) => void nextTick(() => morph.morphTo(o)),
    };
});
</script>

<template>
    <StoryPage>
        <!-- The morph showcase money-shot: the teardrop of glass morphing over a LIVE
             aurora. The stage sits over the shared, offscreen-paused DockStage field. ONE
             GL context for the route. -->
        <DockStage #default="{ backgroundCanvas }">
            <StorySection heading="Vertical ↔ horizontal liquid-glass morph" gap="md">
                <p class="text-small text-muted-foreground">
                    Press the button and watch the dock flow — as one amorphous metaball
                    teardrop — from <strong>vertical</strong> to <strong>horizontal</strong>
                    and back, fully bidirectional and deterministic. The two real docks ride
                    the ONE
                    <code class="rounded bg-muted px-1">--dock-morph-t</code> spring (the
                    vertical collapses its height while the horizontal grows its width), and
                    the SVG-goo bridge merges them into one liquid silhouette that LOBS
                    column→row through the midpoint. A scalar field has no topology — there
                    is nothing to crossfade, no reflow to dodge.
                </p>

                <div class="flex flex-wrap items-center gap-4">
                    <Button type="button" data-testid="morph-toggle" @click="toggleMorph">
                        <ArrowLeftRight class="size-4" />
                        Morph to {{ facing }}
                    </Button>
                    <span
                        class="text-mono-caption text-muted-foreground"
                        data-testid="morph-readout"
                    >
                        t = {{ morph.t.value.toFixed(3) }}
                    </span>
                </div>

                <!-- The morph stage — the ONE root the scalar inherits from, over the live
                     DockStage aurora field. -->
                <div
                    ref="stageEl"
                    class="dock-morph-stage relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] p-10"
                    data-testid="dock-morph-stage"
                >
                    <!-- The metaball-teardrop BRIDGE — behind both docks. The two plates
                         (vertical tall capsule + horizontal wide capsule) merge under the
                         goo filter at the midpoint. The goo `<filter>` is the ONE shell-root
                         <GooFilter> mount's `#dock-morph-goo` (no inline per-route filter —
                         the M1 dedup). The bridge is a SIBLING layer to the glass docks, so
                         its filter never kills their backdrop-filter (§L7). Aspect is
                         f(--dock-morph-t); squish reads the morph stretch. -->
                    <div
                        class="dock-morph-bridge"
                        :style="{
                            '--stretch': String(morph.stretch.value),
                            '--dock-bridge-v-h': `${V_FULL_H}px`,
                            '--dock-bridge-h-w': `${H_FULL_W}px`,
                        }"
                        aria-hidden="true"
                        data-testid="dock-morph-bridge"
                    >
                        <div
                            class="dock-morph-bridge-goo"
                            :style="{ '--dock-bridge-goo-filter': gooFilter }"
                        >
                            <div class="dock-morph-bridge-plate dock-morph-bridge-plate--vertical" />
                            <div class="dock-morph-bridge-plate dock-morph-bridge-plate--horizontal" />
                        </div>
                    </div>

                    <!-- The two REAL DOM docks, crossfading under the goo veneer. The
                         vertical collapses its height while the horizontal grows its width,
                         both off the ONE scalar. -->
                    <GlassDock
                        :background-canvas="backgroundCanvas"
                        orientation="vertical"
                        always-expanded
                        class="dock-morph-pane dock-morph-pane--liquid relative z-10"
                        :style="{ ...morph.verticalStyle.value, ...morph.verticalOpacity.value }"
                        v-bind="{ inert: morph.t.value > 0.5 || undefined }"
                        aria-label="Vertical dock (morph source)"
                        data-testid="dock-morph-vertical"
                    >
                        <DockIconButton
                            v-for="e in entries"
                            :key="e.id"
                            type="button"
                            class="text-muted-foreground"
                            :aria-label="e.label"
                        >
                            <component :is="e.icon" />
                        </DockIconButton>
                    </GlassDock>

                    <GlassDock
                        :background-canvas="backgroundCanvas"
                        orientation="horizontal"
                        always-expanded
                        class="dock-morph-pane dock-morph-pane--liquid absolute z-10"
                        :style="{ ...morph.horizontalStyle.value, ...morph.horizontalOpacity.value }"
                        v-bind="{ inert: morph.t.value <= 0.5 || undefined }"
                        aria-label="Horizontal dock (morph target)"
                        data-testid="dock-morph-horizontal"
                    >
                        <DockIconButton
                            v-for="e in entries"
                            :key="e.id"
                            type="button"
                            class="text-muted-foreground"
                            :aria-label="e.label"
                        >
                            <component :is="e.icon" />
                        </DockIconButton>
                    </GlassDock>
                </div>
            </StorySection>
        </DockStage>
    </StoryPage>
</template>

<style scoped>
/* The stage is TRANSPARENT: the live DockStage aurora field IS the backdrop (the teardrop-
   of-glass-morphing-over-a-live-aurora money-shot). The glass docks + the goo teardrop read
   against the moving painterly field. */
.dock-morph-stage {
    background: transparent;
}

/* The liquid panes are size-driven by the morph composable (the inline width/height style);
   centered so they share the bridge's center as the teardrop pivot. The crossfade opacity
   rides the inline style. */
.dock-morph-pane--liquid {
    overflow: hidden;
    transform-origin: center;
}
</style>
