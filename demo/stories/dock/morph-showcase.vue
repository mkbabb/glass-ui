<script setup lang="ts">
// AZ.W-MORPH-SHOWCASE — the R3-13 vertical↔horizontal liquid-glass dock morph
// showcase. A button presses and the VERTICAL dock flows into the HORIZONTAL dock,
// fully bidirectional + deterministic, with the topology reflow (flex column→row)
// invisible (occluded at the midpoint).
//
// THE H4 PERF FORK RESOLVED (§7, mechanical): the metaball-bridge (arm a — two real
// DOM docks driven off the ONE --dock-morph-t scalar + an SVG-goo teardrop bridge) is
// the highest-fidelity path, but its per-frame `feGaussianBlur` repaint + the live
// dock-resize layout do NOT clear the strict HG5 budget under the 4× CPU-throttle
// (measured median p50 ~13.7-15.1ms, never 0% over the 16.7ms cap — the trace is in
// ground/W-MORPH-SHOWCASE-gperf-{v2h,h2v}.json). So per §H4/§7 the NUMBER falls to
// arm (c): the SHIPPED DEFAULT is the View-Transitions crossfade (startViewTransition —
// the library view-transition substrate, a compositor-snapshot crossfade that clears the budget,
// deterministic + bidirectional). The amorphous metaball-teardrop fidelity is BOOKED
// to a successor and demonstrable here as the perf-gated "Liquid teardrop (preview)"
// mode — the deterministic scalar-driven two-dock morph + the goo bridge.
//
// The W-LIQUID substrate (useLiquidFlex) + the deterministic V↔H driver
// (useDockOrientationMorph) STILL SHIP as the substrate (HG2: useLiquidFlex ≥2
// consumers) and drive the preview; the showcase is bidirectional + deterministic on
// the ONE scalar in BOTH modes (HG1, arm-c marker on the shipped default).
import { computed, nextTick, onMounted, ref, useTemplateRef } from "vue";
import StoryPage from "../StoryPage.vue";
import { Compass, Shapes, Boxes, Database, Bell, ArrowLeftRight } from "@lucide/vue";
import {
    DockIconButton,
    GlassDock,
    useDockOrientationMorph,
} from "../../../src/components/custom/dock";
import { startViewTransition } from "../../../src/composables/motion/useViewTransition";
import { Button } from "../../../src/components/ui/button";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";

const entries = [
    { id: "foundations", label: "Foundations", icon: Compass },
    { id: "primitives", label: "Primitives", icon: Shapes },
    { id: "containers", label: "Containers", icon: Boxes },
    { id: "data", label: "Data", icon: Database },
    { id: "feedback", label: "Feedback", icon: Bell },
];

// The stage root the ONE --dock-morph-t scalar is written to (the preview mode); the
// two docks + the bridge live under it and read the inheriting scalar.
const stageEl = useTemplateRef<HTMLElement>("stageEl");

// The dock footprints (px) — the morph spans for the preview's liquid size morph.
const V_FULL_H = 296;
const H_FULL_W = 332;

// The deterministic V↔H driver (the W-LIQUID substrate consumer #1) — drives the
// preview's two-dock scalar morph + the teardrop squish.
const morph = useDockOrientationMorph({
    rootEl: stageEl,
    verticalSize: V_FULL_H,
    horizontalSize: H_FULL_W,
});

// ── The SHIPPED default — the arm-c View-Transitions crossfade ──────────────────
// The orientation state the VT crossfade swaps. The `<GlassDock>` swap (vertical ↔
// horizontal) is wrapped in `startViewTransition`, so the compositor crossfades the
// before/after snapshots — budget-clearing, deterministic (a state flip), bidirectional.
const vtOrientation = ref<"vertical" | "horizontal">("vertical");

// The preview toggle — when ON, the perf-gated liquid-teardrop (arm-a) morph is shown
// instead of the VT crossfade. OFF (default) ships the budget-clearing VT crossfade.
const liquidPreview = ref(false);

const facing = computed(() => {
    const cur = liquidPreview.value ? morph.orientation.value : vtOrientation.value;
    return cur === "vertical" ? "horizontal" : "vertical";
});

// The goo filter is gated to the occluded MIDPOINT window (t∈(0.18,0.82)) where the
// plates merge — a pure f(--dock-morph-t), no clock (the M5 scalar-binding holds).
const gooFilter = computed(() =>
    morph.t.value > 0.18 && morph.t.value < 0.82 ? "url(#dock-morph-goo)" : "none",
);

function toggleMorph(): void {
    if (liquidPreview.value) {
        // The preview — the deterministic scalar-driven liquid teardrop morph.
        morph.toggle();
    } else {
        // The shipped default — the VT crossfade, wrapped in startViewTransition.
        startViewTransition(() => {
            vtOrientation.value =
                vtOrientation.value === "vertical" ? "horizontal" : "vertical";
        });
    }
}

// DETERMINISTIC CAPTURE SEAM (HG1) — the π/Playwright arm drives EXACT t values
// (0/.25/.5/.75/1, both directions) to capture the preview's frame-series. The scalar
// is the ONE source; pinning it yields a frame-reproducible silhouette (no wall-clock —
// the bridge has no free-running uTime). The seam forces the preview ON so the
// teardrop morph is the captured surface.
function setMorphT(value: number): void {
    if (!liquidPreview.value) liquidPreview.value = true;
    void nextTick(() => {
        morph.pin(value);
    });
    (window as unknown as { __morphT?: number }).__morphT = value;
}

onMounted(() => {
    (
        window as unknown as {
            __dockMorphShowcase?: {
                setMorphT: (t: number) => void;
                toggle: () => void;
                morphTo: (o: "vertical" | "horizontal") => void;
                setPreview: (on: boolean) => void;
            };
        }
    ).__dockMorphShowcase = {
        setMorphT,
        toggle: () => {
            if (!liquidPreview.value) liquidPreview.value = true;
            void nextTick(() => morph.toggle());
        },
        morphTo: (o) => {
            if (!liquidPreview.value) liquidPreview.value = true;
            void nextTick(() => morph.morphTo(o));
        },
        setPreview: (on) => {
            liquidPreview.value = on;
        },
    };
});
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Vertical ↔ horizontal liquid-glass morph</h2>
            <p class="text-small text-muted-foreground">
                Press the button and watch the dock flow from <strong>vertical</strong> to
                <strong>horizontal</strong> and back, fully bidirectional and deterministic. The
                <strong>shipped</strong> morph is a View-Transitions crossfade — the compositor
                crossfades the two dock states, so it stays smooth and stable under load (it
                clears the 60fps frame budget under a 4× CPU throttle). The topology reflow
                (column → row) is hidden inside the crossfade — the platform cannot continuously
                interpolate a mismatched-topology silhouette (a binding platform limit); the showcase
                respects that limit rather than fighting it.
            </p>
            <p class="text-small text-muted-foreground">
                Flip <strong>Liquid teardrop</strong> on to preview the higher-fidelity
                metaball-bridge morph: the two real docks ride the ONE
                <code class="rounded bg-muted px-1">--dock-morph-t</code> spring (the vertical
                collapses its height while the horizontal grows its width), and an SVG-goo
                metaball bridge merges them into one amorphous teardrop. It is the amorphous
                register the user named — but its per-frame goo blur does not clear the strict
                frame budget under throttle, so it is the perf-gated preview, not the shipped
                default (the teardrop fidelity is booked to a successor).
            </p>

            <div class="flex flex-wrap items-center gap-4">
                <Button type="button" data-testid="morph-toggle" @click="toggleMorph">
                    <ArrowLeftRight class="size-4" />
                    Morph to {{ facing }}
                </Button>
                <div class="flex items-center gap-2">
                    <Switch
                        id="liquid-preview"
                        v-model="liquidPreview"
                        data-testid="liquid-preview-toggle"
                    />
                    <Label for="liquid-preview" class="text-small">Liquid teardrop (preview)</Label>
                </div>
                <span class="text-mono-caption text-muted-foreground" data-testid="morph-readout">
                    mode = {{ liquidPreview ? "liquid" : "view-transition" }} · t =
                    {{ morph.t.value.toFixed(3) }}
                </span>
            </div>

            <!-- The morph stage — the ONE root the scalar inherits from. A static themed
                 wash backdrop gives the glass something to read against (the rich live
                 substrate that makes glass POP is the page-redesign's job — W60; this
                 showcase proves the MORPH, not the backdrop). -->
            <div
                ref="stageEl"
                class="dock-morph-stage relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] p-10"
                data-testid="dock-morph-stage"
            >
                <!-- ── The SHIPPED arm-c View-Transitions crossfade ── -->
                <template v-if="!liquidPreview">
                    <GlassDock
                        v-if="vtOrientation === 'vertical'"
                        orientation="vertical"
                        always-expanded
                        class="dock-morph-pane relative z-10"
                        aria-label="Vertical dock"
                        data-testid="dock-morph-vt-vertical"
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
                        v-else
                        orientation="horizontal"
                        always-expanded
                        class="dock-morph-pane relative z-10"
                        aria-label="Horizontal dock"
                        data-testid="dock-morph-vt-horizontal"
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
                </template>

                <!-- ── The perf-gated LIQUID-TEARDROP preview (arm-a) ── -->
                <template v-else>
                    <!-- The goo SVG filter — the classic gooey trick: blur the plates so
                         their alpha bleeds together, then threshold the blurred alpha back
                         to a sharp metaball edge. Deterministic: no animation, no clock —
                         a static filter the plates pass through. -->
                    <svg class="absolute size-0" aria-hidden="true">
                        <defs>
                            <filter
                                id="dock-morph-goo"
                                x="-10%"
                                y="-10%"
                                width="120%"
                                height="120%"
                            >
                                <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                                <feColorMatrix
                                    in="blur"
                                    mode="matrix"
                                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                                    result="goo"
                                />
                                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                            </filter>
                        </defs>
                    </svg>

                    <!-- The metaball-teardrop BRIDGE — behind both docks. The two plates
                         (vertical tall capsule + horizontal wide capsule) merge under the
                         goo filter at the midpoint. Aspect is f(--dock-morph-t); squish
                         reads --stretch (the scalar derivative). -->
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
                </template>
            </div>
        </section>
    </StoryPage>
</template>

<style scoped>
/* The stage backdrop — a static themed wash (a warm aurora-bleed gradient) so the
   glass docks + the goo teardrop read against a non-flat surface. Static (no WebGL,
   no animation) — capture-stable and the morph is the message. Adaptive under .dark
   via the token gradient stops. */
.dock-morph-stage {
    background:
        radial-gradient(
            70% 55% at 28% 22%,
            color-mix(in oklab, var(--primary), transparent 82%),
            transparent 70%
        ),
        radial-gradient(
            60% 60% at 78% 80%,
            color-mix(in oklab, var(--accent, var(--primary)), transparent 84%),
            transparent 72%
        ),
        linear-gradient(
            140deg,
            color-mix(in oklab, var(--card), var(--foreground) 4%),
            var(--card)
        );
    /* The arm-c crossfade names the two dock states so the View-Transition group
       crossfades them (the view-transition substrate's CSS half). */
    view-transition-name: dock-morph-stage;
}

/* The liquid-preview panes are size-driven by the morph composable (the inline
   width/height style); centered so they share the bridge's center as the teardrop
   pivot. The crossfade opacity rides the inline style. */
.dock-morph-pane--liquid {
    overflow: hidden;
    transform-origin: center;
}
</style>
