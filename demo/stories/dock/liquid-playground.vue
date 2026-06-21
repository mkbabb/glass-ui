<script setup lang="ts">
// BE.W-LIQUID-MORPH (WAVE-2) — the liquid-morph PLAYGROUND, re-architected so the
// CORE DOCK ITSELF morphs (the wave-1 side-element approach was wrong).
//
// ONE glass dock element is the morph SUBJECT. It carries `--liquid-morph-t` (0 rest
// → 1 morphed) written by `useLiquidMorph`'s single dock-spring scalar:
//   • EXPAND — the dock box GROWS pill → container card IN PLACE (its own footprint,
//     anchored at its own centre; the controls cross-fade out, the pane reveals).
//     This is the iOS-27 V3 search-pill → sheet bloom — the dock IS the sheet.
//   • SPLIT — the dock's OWN control buttons DETACH and fly out as free-floating
//     glass pieces at the configurable angle (the dock disintegrates into its
//     controls, goo-necked). The dock is the body the pieces bud from.
// No separate card, no FLIP-from-a-hidden-trigger. One element, one scalar.
//
// WAVE-2 — THE RAIL. A second section adds the carousel-stack rail: a vertical glass
// dock with `useLiquidRail` projecting a carousel-WRAP stack on its right edge — the
// chosen chip at the dock line, items fanning above (golden ~2x) + below, collapsed
// by default, EXPANDING on hover (or the Expand-rail button), the far ones fading
// toward 0 opacity (the ↑z fade). NOT the macOS 3D fan — a STRAIGHT carousel-wrap.
import { computed, onMounted, ref, watch } from "vue";
import {
    Layers,
    Search,
    Maximize2,
    Split as SplitIcon,
    Star,
    Clock,
    Image,
    Music,
    Film,
    Folder,
    Heart,
    Tag,
} from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Button } from "../../../src/components/ui/button";
import { Slider } from "../../../src/components/ui/slider";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import { Aurora, DEFAULT_AURORA_CONFIG } from "../../../src/components/custom/aurora";
import {
    useLiquidMorph,
    DIRECTED_SPLIT,
    type LiquidMorphMode,
} from "../../../src/composables/motion/useLiquidMorph";
import { useLiquidRail } from "../../../src/components/custom/dock/composables/useLiquidRail";

// ── controls ──────────────────────────────────────────────────────────────────
const mode = ref<LiquidMorphMode>("expand");
const modeTabs = [
    { value: "expand", label: "Expand → card" },
    { value: "split", label: "Split" },
    { value: "union", label: "Union" },
];
const angleDeg = ref(35);
const splitCount = ref(4);
const angleRad = computed(() => (angleDeg.value * Math.PI) / 180);
const open = ref(false);
// the dock's resting axis — horizontal pill (row) or vertical pill (column). The morph
// works on BOTH ("function in a vertical or horizontal state").
const orientation = ref<"horizontal" | "vertical">("horizontal");
function toggleOrientation(): void {
    orientation.value = orientation.value === "horizontal" ? "vertical" : "horizontal";
}

// ── the dock element IS the morph root ──────────────────────────────────────────
const dockRef = ref<HTMLElement | null>(null);
const ctlEls = ref<(HTMLElement | null)[]>([]);
const ctlIndices = computed(() =>
    Array.from({ length: splitCount.value }, (_, i) => i),
);
const ctlIcons = [Layers, Search, Star, Clock, SplitIcon, Maximize2];
function setCtlEl(i: number, el: Element | null): void {
    ctlEls.value[i] = (el as HTMLElement | null) ?? null;
}

// the ONE engine — DIRECTED so the angle slider drives each control's escape beam.
// The spring varies BY GESTURE (resolved per-drive): EXPAND rides SMOOTH (a deliberate,
// luxuriant pill→card bloom, no overshoot — the iOS-27 V3 register), while SPLIT/UNION
// ride SNAPPY (a livelier clock with a slight overshoot — the pieces bud with LIFE, the
// creed's jubilance). One engine, two registers.
const morph = useLiquidMorph({
    rootEl: dockRef,
    signature: DIRECTED_SPLIT,
    spring: () => (mode.value === "expand" ? "smooth" : "snappy"),
});

// the dock's controls ARE the split pieces — register them with the engine so a
// split flies them out along --split-dx/dy · distance · t.
let handles: ReturnType<typeof morph.registerPiece>[] = [];
function registerControls(): void {
    for (const h of handles) h.release();
    handles = ctlIndices.value.map((i) =>
        morph.registerPiece({
            el: computed(() => ctlEls.value[i] ?? null),
            angle: angleRad.value,
            rank: i,
            // a CONNECTED goo arm budding from the core: rank 0 at centre, each next
            // ~30px further along θ — close enough that the metaball necks stay bridged
            // (a wider gap separates the blobs; the reference is ONE connected arm).
            distance: i * 30,
        }),
    );
}
watch([splitCount, angleRad], () => requestAnimationFrame(registerControls));
onMounted(() => requestAnimationFrame(registerControls));

// ── the actions — ONE scalar; the mode gates what reads it ───────────────────────
function play(): void {
    // open = "spread/apart" (t→1), closed = "merged/rest" (t→0). Split SPREADS the
    // dock's controls; union MERGES them back into one — same scalar, inverse framing.
    open.value = !open.value;
    if (open.value) morph.split();
    else morph.union();
}
function reset(): void {
    open.value = mode.value === "union";
    if (open.value) morph.split();
    else morph.union();
}
// a mode change re-seats: union STARTS spread (N separate pieces to merge); the others
// start at rest. (so union demonstrably collapses N elements into one.)
watch(mode, (m) => {
    if (m === "union") {
        open.value = true;
        morph.split();
    } else {
        open.value = false;
        morph.union();
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// THE RAIL — the carousel-stack on a vertical dock's right edge.
// ═══════════════════════════════════════════════════════════════════════════════

// the rail's item set — glass disc facets (one per "place"). The chosen sits at the
// dock line; the rest carousel-WRAP above + below.
const railIcons = [Folder, Image, Music, Film, Star, Heart, Tag, Clock];
const railLabels = ["Files", "Photos", "Music", "Video", "Starred", "Loved", "Tags", "Recent"];

// the configurable above/below counts — the sketch's asymmetric window (golden 2x
// above, partial below). For the prototype the projection's fadeRange owns the visible
// span; these knobs retune the golden asymmetry + the fade span so the verification is
// reachable headless.
const itemsAbove = ref(2);
const itemsBelow = ref(1);
const railOpen = ref(false);

// ONE registry — the consumer owns `chosenIdx`; the rail keeps no internal shadow.
const chosenIdx = ref(0);
const railCount = computed(() => railIcons.length);
const railRoot = ref<HTMLElement | null>(null);

const rail = useLiquidRail({
    count: railCount,
    chosen: chosenIdx,
    edge: "right",
    spring: "dock",
    rootEl: railRoot,
    geometry: {
        // LIVE getters — the projection resolves them per-read, so the sliders re-fan
        // the carousel without reconstructing the composable.
        // the golden asymmetry the knobs drive: the above side fans ~φ² (≈2.618×, the
        // pinned "golden ~2x above") the below span, scaled by the above/below ratio so
        // the sliders retune it (the "partial peek below").
        // the golden 2x ABOVE — now a FADE asymmetry (the below side fades ~2.2x
        // faster, a "partial peek"), at UNIFORM tight spacing. More items read above
        // the chosen than below, the sketch's golden register.
        goldenAbove: 2.2,
        fadeStart: 0.6,
        fadeRange: () => itemsAbove.value + 0.7,
        slotSpacing: 38,
        tierRatio: 1.0,
        scaleStep: 0.08,
    },
});

function toggleRail(): void {
    railOpen.value = !railOpen.value;
    rail.expandTo(railOpen.value);
}
function stepChosen(delta: number): void {
    const n = railCount.value;
    chosenIdx.value = ((chosenIdx.value + delta) % n + n) % n;
}
function onRailEnter(): void {
    railOpen.value = true;
    rail.onPointerEnter();
}
function onRailLeave(): void {
    railOpen.value = false;
    rail.onPointerLeave();
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Liquid playground — the dock is the control interface"
            gap="md"
        >
            <p class="text-small text-muted-foreground">
                The dock ITSELF morphs. ONE engine —
                <code class="rounded bg-muted px-1">useLiquidMorph</code> — writes one
                dock-spring scalar onto the dock element:
                <strong>EXPAND</strong> grows the pill into a container card in place
                (the iOS-27 search-pill <span aria-hidden="true">→</span> sheet bloom),
                and <strong>SPLIT</strong> detaches the dock's own controls as
                free-floating glass pieces at an arbitrary
                <code class="rounded bg-muted px-1">θ</code>.
            </p>

            <!-- controls -->
            <div
                class="flex flex-wrap items-end gap-6 rounded-[var(--radius-card)] glass-resting p-5"
            >
                <div class="flex min-w-[14rem] flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">Mode</label>
                    <SegmentedTabs v-model="mode" :options="modeTabs" />
                </div>
                <div
                    v-show="mode !== 'expand'"
                    class="flex min-w-[14rem] flex-1 flex-col gap-2"
                >
                    <label class="text-mono-caption text-muted-foreground">
                        Angle of attack — {{ angleDeg }}°
                    </label>
                    <Slider
                        :model-value="[angleDeg]"
                        :min="0"
                        :max="360"
                        :step="1"
                        @update:model-value="(v) => (angleDeg = v?.[0] ?? 0)"
                    />
                </div>
                <div
                    v-show="mode !== 'expand'"
                    class="flex min-w-[10rem] flex-1 flex-col gap-2"
                >
                    <label class="text-mono-caption text-muted-foreground">
                        Controls — {{ splitCount }}
                    </label>
                    <Slider
                        :model-value="[splitCount]"
                        :min="2"
                        :max="6"
                        :step="1"
                        @update:model-value="(v) => (splitCount = v?.[0] ?? 2)"
                    />
                </div>
                <div class="flex gap-2">
                    <Button variant="primary-audacious" @click="play">
                        {{
                            mode === "union"
                                ? open
                                    ? "Merge"
                                    : "Spread"
                                : open
                                  ? "Collapse"
                                  : mode === "expand"
                                    ? "Expand"
                                    : "Split"
                        }}
                    </Button>
                    <Button variant="outline" @click="reset">Reset</Button>
                    <Button variant="outline" @click="toggleOrientation">
                        {{ orientation === "horizontal" ? "↕ Vertical" : "↔ Horizontal" }}
                    </Button>
                </div>
            </div>

            <!-- the stage — the dock sits centred; it grows / splits IN PLACE -->
            <div
                class="relative flex min-h-[28rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] p-10"
                data-testid="liquid-stage"
            >
                <!-- the live aurora field — the dock's glass reads AGAINST it (the
                     reference always has rich content behind the glass). Offscreen-
                     paused by construction; ONE GL context for this route. -->
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    class="pointer-events-none absolute inset-0 size-full"
                    aria-hidden="true"
                />
                <!-- the goo <filter> — feGaussianBlur + threshold (Safari-safe,
                     filter:url() inline). Referenced by .liquid-dock[data-mode=split]
                     when the controls detach so they read as ONE metaball body. -->
                <svg aria-hidden="true" width="0" height="0" style="position: absolute">
                    <defs>
                        <filter id="liquid-morph-goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
                            <feColorMatrix
                                in="b"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                                result="g"
                            />
                            <feComposite in="SourceGraphic" in2="g" operator="atop" />
                        </filter>
                    </defs>
                </svg>

                <!-- THE DOCK — the single morph subject. data-mode/data-open gate the
                     CSS; --split-count sizes the control row; the engine writes
                     --liquid-morph-t here (box grow) and onto each control (fly). -->
                <div
                    ref="dockRef"
                    class="liquid-dock"
                    :data-mode="mode"
                    :data-open="open"
                    :data-orientation="orientation"
                    :style="{ '--liquid-dock-controls': splitCount }"
                    data-testid="liquid-dock"
                >
                    <!-- the controls (also the split pieces) -->
                    <div class="liquid-dock-controls">
                        <button
                            v-for="i in ctlIndices"
                            :key="i"
                            :ref="(el) => setCtlEl(i, el as Element | null)"
                            type="button"
                            class="liquid-dock-control liquid-morph-piece"
                            data-testid="liquid-control"
                            :aria-label="`control ${i + 1}`"
                        >
                            <component :is="ctlIcons[i % ctlIcons.length]" class="size-5" />
                        </button>
                    </div>

                    <!-- the container pane the dock grows into (expand) -->
                    <div class="liquid-dock-pane" aria-hidden="true">
                        <div class="liquid-dock-pane-header">
                            <span class="liquid-dock-pane-chip"><Layers class="size-5" /></span>
                            <div>
                                <h3 class="text-subheading">Container</h3>
                                <p class="text-mono-caption text-muted-foreground">
                                    the dock grew into this card
                                </p>
                            </div>
                        </div>
                        <div class="liquid-dock-pane-chips">
                            <span
                                v-for="chip in ['Recents', 'Shared', 'Favorites', 'Tags']"
                                :key="chip"
                                class="rounded-pill glass-resting px-3 py-1 text-small"
                            >
                                {{ chip }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="liquid-readout"
            >
                mode = {{ mode }} · θ = {{ angleDeg }}° · controls = {{ splitCount }} ·
                t = {{ morph.t.value.toFixed(2) }} ·
                {{ morph.morphing.value ? "morphing" : open ? "open" : "rest" }}
            </p>
        </StorySection>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- THE RAIL — the carousel-stack on a vertical dock's right edge.       -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <StorySection heading="The rail — a carousel-stack on the dock edge" gap="md">
            <p class="text-small text-muted-foreground">
                A vertical glass dock with a carousel-stack rail on its right edge —
                <code class="rounded bg-muted px-1">useLiquidRail</code> projects the
                <strong>chosen</strong> chip AT the dock line, items fanning
                <strong>above</strong> (golden ~2x span) and <strong>below</strong> (a
                partial peek). Collapsed by default; <strong>hover</strong> (or
                <em>Expand rail</em>) fans the stack open, the far items fading toward 0
                opacity (the <code class="rounded bg-muted px-1">↑z</code> fade). The
                list CAROUSEL-WRAPS — step the chosen past the last item and it loops to
                the first. NOT the macOS 3D fan — a STRAIGHT carousel-wrap, the depth
                read from opacity + scale tiers.
            </p>

            <!-- rail controls -->
            <div
                class="flex flex-wrap items-end gap-6 rounded-[var(--radius-card)] glass-resting p-5"
            >
                <div class="flex min-w-[10rem] flex-1 flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">
                        Items above — {{ itemsAbove }}
                    </label>
                    <Slider
                        :model-value="[itemsAbove]"
                        :min="1"
                        :max="4"
                        :step="1"
                        @update:model-value="(v) => (itemsAbove = v?.[0] ?? 1)"
                    />
                </div>
                <div class="flex min-w-[10rem] flex-1 flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">
                        Items below — {{ itemsBelow }}
                    </label>
                    <Slider
                        :model-value="[itemsBelow]"
                        :min="1"
                        :max="3"
                        :step="1"
                        @update:model-value="(v) => (itemsBelow = v?.[0] ?? 1)"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">
                        Chosen — {{ railLabels[chosenIdx] }}
                    </label>
                    <div class="flex gap-2">
                        <Button variant="outline" size="sm" @click="stepChosen(-1)">
                            ↑ Prev
                        </Button>
                        <Button variant="outline" size="sm" @click="stepChosen(1)">
                            ↓ Next
                        </Button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Button variant="primary-audacious" @click="toggleRail">
                        {{ railOpen ? "Collapse rail" : "Expand rail" }}
                    </Button>
                </div>
            </div>

            <!-- the rail stage — a vertical glass dock + the carousel rail on its right.
                 hover the dock to expand; the chosen chip sits ON the dock edge line. -->
            <div
                class="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] p-10"
                data-testid="liquid-rail-stage"
            >
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    class="pointer-events-none absolute inset-0 size-full"
                    aria-hidden="true"
                />

                <!-- the host: a sized, positioned spine. The rail centres in it; the
                     chosen chip sits AT the centre line, items fan above + below. -->
                <div
                    class="liquid-rail-host"
                    @pointerenter="onRailEnter"
                    @pointerleave="onRailLeave"
                    data-testid="liquid-rail-host"
                >
                    <!-- THE RAIL — the carousel-stack. Each item seats at the centre
                         line, then the projection's transform fans it vertically. The
                         chosen IS the dock-line item (no separate competing chip). -->
                    <div
                        ref="railRoot"
                        class="liquid-rail liquid-rail--centred"
                        data-edge="right"
                        data-testid="liquid-rail"
                    >
                        <button
                            v-for="item in rail.items.value"
                            :key="item.index"
                            type="button"
                            class="liquid-rail-item"
                            :data-chosen="item.chosen"
                            :style="item.style"
                            :aria-label="railLabels[item.index]"
                            :title="railLabels[item.index]"
                            @click="chosenIdx = item.index"
                            data-testid="liquid-rail-item"
                        >
                            <span class="liquid-rail-chip">
                                <component :is="railIcons[item.index]" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="liquid-rail-readout"
            >
                chosen = {{ railLabels[chosenIdx] }} ({{ chosenIdx }}) · above =
                {{ itemsAbove }} · below = {{ itemsBelow }} · expand =
                {{ rail.expand.value.toFixed(2) }} ·
                {{ rail.expanding.value ? "fanning" : railOpen ? "open" : "collapsed" }}
                · rendered = {{ rail.items.value.length }} items
            </p>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* the rail-section host chrome — a small vertical glass dock pill the rail clings to.
   The carousel rail itself (.liquid-rail / .liquid-rail-item / .liquid-rail-chip) is
   the LIBRARY recipe in src/styles/dock/liquid-rail.css (loaded via /styles). */
.liquid-rail-host {
    position: relative;
    display: grid;
    place-items: center;
    /* the dock pill the rail anchors to */
}

.liquid-rail-dock {
    display: grid;
    place-items: center;
    inline-size: 3.25rem;
    block-size: 3.25rem;
    border-radius: 2rem;
    color: var(--foreground);
    box-shadow:
        inset 0 0 0 1px var(--glass-edge-light, rgb(255 255 255 / 0.18)),
        0 8px 24px -8px color-mix(in srgb, var(--foreground) 40%, transparent);
}
</style>
