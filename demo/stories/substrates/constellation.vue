<script setup lang="ts">
// Constellation — the neutral proximity-graph lattice + a `drawOverlay` focal
// node. The overlay paints a glass-ui-toned (`--primary`) pulse ring; the
// `drawOverlay` seam carries arbitrary consumer content, so a branded skin stays
// a consumer concern.
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Constellation, type ConstellationField } from "@glass/components/constellation";
import { Switch } from "@glass/components/switch";
import { Label } from "@glass/components/label";
import { useTokenColor } from "@glass/composables/dom/useTokenColor";
import RendererStatusView from "./_frame/RendererStatus.vue";
import { pendingRenderer, type RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";

// The primary hero lattice's pointer interactivity toggle. The name surfaces the
// suite-wide `interactive` enable token (aurora/dot-flow-field/concentric/fourier all
// use it; constellation's gating prop is `pointerReactive`, which this drives) so the
// shared pointer-velocity field is reachable on the live route.
const interactive = ref(true);
const rendererStatus = ref<RendererStatus>(pendingRenderer("canvas2d"));

// Resolve `--primary` to a concrete color so the canvas overlay paints it (a
// Canvas2D `fillStyle` cannot resolve a `var()`). Re-resolves on a dark flip.
const { value: primary } = useTokenColor("--primary", { fallback: "#1c1714" });

// The skin seam. Runs after the four neutral passes with the live field, so the
// focal mark pins to a real node and pulses a ring around it. node[0] is the
// static-focal demo (no warp).
const drawFocal = computed(
    () => (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
        const focal = field.nodes[0];
        if (!focal) return;
        const k = field.k;
        const phase = (now % 2600) / 2600;
        // pulse ring
        ctx.strokeStyle = primary.value;
        ctx.globalAlpha = (1 - phase) * 0.5;
        ctx.lineWidth = 1.4 * k;
        ctx.beginPath();
        ctx.arc(focal.x, focal.y, (12 + phase * 22) * k, 0, Math.PI * 2);
        ctx.stroke();
        // steady halo
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(focal.x, focal.y, 15 * k, 0, Math.PI * 2);
        ctx.stroke();
        // core dot
        ctx.globalAlpha = 1;
        ctx.fillStyle = primary.value;
        ctx.beginPath();
        ctx.arc(focal.x, focal.y, 4.2 * k, 0, Math.PI * 2);
        ctx.fill();
    },
);

// ── Click-to-warp section ───────────────────────────────────────────────────
// The focal mark rides the ENGINE-OWNED warp spring position (`field.warp`), not
// a static node. A click warps it to the nearest drifting node + springs it
// there (critically damped, chasing a live target). The overlay paints at
// `field.warp.{x,y}` — the spring-eased position the library owns.
const { value: accent } = useTokenColor("--constellation-accent", {
    fallback: "#b35030",
});
const warpRef = useTemplateRef<InstanceType<typeof Constellation>>("warpRef");

const drawWarpFocal = computed(
    () => (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
        // Paint the focal mark at the spring-eased warp position. Before the
        // first warp the focal rides field-center (seeded on layout).
        const wx = field.warp.x;
        const wy = field.warp.y;
        if (field.focalIndex < 0 && wx === 0 && wy === 0) return;
        const k = field.k;
        const phase = (now % 2200) / 2200;
        ctx.strokeStyle = accent.value;
        ctx.globalAlpha = (1 - phase) * 0.55;
        ctx.lineWidth = 1.6 * k;
        ctx.beginPath();
        ctx.arc(wx, wy, (10 + phase * 20) * k, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(wx, wy, 13 * k, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = accent.value;
        ctx.beginPath();
        ctx.arc(wx, wy, 4.6 * k, 0, Math.PI * 2);
        ctx.fill();
    },
);

// ── Re-fit + auto-drift section (AY.W-CON1) ─────────────────────────────────
// A dedicated <Constellation> whose container the π spec resizes (the re-fit
// readback) AND a wander-on focal (the auto-drift cadence readback). The overlay
// reuses the warp focal painter so the wander focal is visible.
const refitHostRef = useTemplateRef<HTMLElement>("refitHostRef");
const refitRef = useTemplateRef<InstanceType<typeof Constellation>>("refitRef");

// ── Gravity-well section (AY.W-CON2) ────────────────────────────────────────
// A dedicated <Constellation gravityWell> — hold the pointer and the lattice is
// pulled toward it (the engine egg); release and the field cools. The π egg-live
// spec drives the well via the exposed holdWellAt/releaseWell (no real held-pointer
// race) and reads back mean |v| per frame off __constellationEgg.field.
const wellRef = useTemplateRef<InstanceType<typeof Constellation>>("wellRef");

// ── Recession-envelope section (AY.W-COHERE E3) ─────────────────────────────
// Two <Constellation> instances over an IDENTICAL seed/count/link, differing ONLY
// in `opacityCeiling` (1.0 vs 0.4). The π substrate-cohesion spec screenshots both
// canvases (located via the wrapper `data-testid`) over the white card and asserts
// the 0.4 instance paints ~0.4× the ink coverage of the 1.0 — the recession prop
// BITES (the G-RECESSION π readback), not just declared. A neutral lattice (no
// focal overlay) so the comparison is the raw edge/node ink, the recession's target.

// ── Pinned anomaly (generalized) section (AZ.W-CON-GEN G1/G2/G5/G6) ─────────
// The six-item generalization made first-class: a PINNED node the engine HOLDS
// (G1), its incident edges tinted accent (G2 accentEdges), the autonomous gentle
// anchor-drift (G5 pinnedDrift), and the exposed warpSettled() signal (G6). The
// drawOverlay is a neutralized anomaly recipe (a pulse ring + halo + core dot + dashed
// monospace callout) pinned to field.nodes[field.pinnedIndex] (the engine-held pin),
// NOT a hand-frozen node. This is the slides anomaly skin re-expressed over library
// surface: ≈30 lines of consumer recipe over the engine, not a ≈250-line bespoke class.
const genRef = useTemplateRef<InstanceType<typeof Constellation>>("genRef");
const genSettled = ref(true);
let genSettledTimer = 0;
onUnmounted(() => {
    if (genSettledTimer) window.clearInterval(genSettledTimer);
});

const drawPinnedAnomaly = computed(
    () => (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
        // Pin to the ENGINE-HELD pinned node (G1) — its position is owned by the
        // engine (held still, or gently drifting under pinnedDrift), so the mark
        // travels with the pin without a hand-rolled freeze.
        const idx = field.pinnedIndex;
        const an = idx >= 0 ? field.nodes[idx] : undefined;
        if (!an) return;
        const k = field.k;
        const phase = (now % 2600) / 2600;
        // outer pulse ring
        ctx.strokeStyle = accent.value;
        ctx.globalAlpha = (1 - phase) * 0.55;
        ctx.lineWidth = 1.6 * k;
        ctx.beginPath();
        ctx.arc(an.x, an.y, (12 + phase * 24) * k, 0, Math.PI * 2);
        ctx.stroke();
        // inner steady ring
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = 1.4 * k;
        ctx.beginPath();
        ctx.arc(an.x, an.y, 14 * k, 0, Math.PI * 2);
        ctx.stroke();
        // soft halo + core
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(an.x, an.y, 26 * k, 0, Math.PI * 2);
        ctx.fillStyle = accent.value;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = accent.value;
        ctx.beginPath();
        ctx.arc(an.x, an.y, 5 * k, 0, Math.PI * 2);
        ctx.fill();
        // dashed monospace callout (consumer state — NOT a lib prop; the G4 book)
        const lx = an.x + 30 * k;
        const ly = an.y - 18 * k;
        ctx.globalAlpha = 0.5;
        ctx.setLineDash([3 * k, 3 * k]);
        ctx.beginPath();
        ctx.moveTo(an.x + 8 * k, an.y - 6 * k);
        ctx.lineTo(lx - 4 * k, ly + 4 * k);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = accent.value;
        ctx.font = `${11 * k}px ui-monospace, monospace`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText("anomaly", lx, ly);
    },
);

// DEMO-PRIVATE π-lane hook: expose the live warp field + the imperative warpTo
// on `window` so the W00 visual-runtime lane can read `field.warp`/`field.nodes`
// per frame and dispatch a synthetic warp (a runtime-observation probe, NOT a
// grep). Never shipped — this is a demo-story test seam only.
onMounted(() => {
    const inst = warpRef.value as
        | (InstanceType<typeof Constellation> & {
              field?: ConstellationField;
              warpTo?: (a: { x: number; y: number } | number, b?: number) => number;
          })
        | null;
    if (inst && typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).__constellationWarp = {
            field: inst.field,
            warpTo: inst.warpTo?.bind(inst),
        };
    }

    // AY.W-CON1: the refit + auto-drift seam. `field` lets the π spec read the
    // node bbox + warp + focalIndex per frame; `resizeTo(w, h)` drives a
    // PROGRAMMATIC RO size-change (it sets the host's inline extent + forces a
    // layout flush so the substrate's ResizeObserver fires synchronously) so the
    // spec can assert the post-RO frame WITHOUT racing a real responsive-scale.
    const refit = refitRef.value as
        | (InstanceType<typeof Constellation> & { field?: ConstellationField })
        | null;
    const refitHost = refitHostRef.value;
    if (refit && refitHost && typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).__constellationRefit = {
            field: refit.field,
            resizeTo(w: number, h: number) {
                // The refit host sits in a flex parent (ShowcaseFrame's `flex` body),
                // which stretches it so a plain inline `width` no longer shrinks the
                // box. Force the box with `important` priority + `flex: none` so the
                // host actually takes the driven extent
                // and the substrate's ResizeObserver re-fits the field to it. Test-only
                // seam (never shipped — demo-private π-lane hook).
                refitHost.style.setProperty("width", `${w}px`, "important");
                refitHost.style.setProperty("height", `${h}px`, "important");
                refitHost.style.setProperty("flex", "none", "important");
                // force a synchronous layout flush so the ResizeObserver fires.
                void refitHost.offsetWidth;
            },
        };
    }

    // AY.W-CON2: the gravity-well egg seam. `field` lets the π egg-live spec read
    // mean node |v| + every node's bbox per frame; `holdWellAt(x, y)` /
    // `releaseWell()` drive the well WITHOUT racing a real held-pointer gesture +
    // the held-timer (the test hook on the public expose).
    const wellInst = wellRef.value as
        | (InstanceType<typeof Constellation> & {
              field?: ConstellationField;
              holdWellAt?: (x: number, y: number) => boolean;
              releaseWell?: () => void;
          })
        | null;
    if (wellInst && typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).__constellationEgg = {
            field: wellInst.field,
            holdWellAt: wellInst.holdWellAt?.bind(wellInst),
            releaseWell: wellInst.releaseWell?.bind(wellInst),
        };
    }

    // AZ.W-CON-GEN — the generalization egg seam. `field` lets a π/proof spec read
    // the pinned node's bbox + the warp-settled signal per frame; the imperative
    // `pinNode`/`warpSettled` are the test hooks on the public expose. A live poll of
    // `warpSettled()` drives the on-screen `settled` badge (the G6 isSettled read).
    const genInst = genRef.value as
        | (InstanceType<typeof Constellation> & {
              field?: ConstellationField;
              warpSettled?: () => boolean;
              pinNode?: (idx: number) => void;
          })
        | null;
    if (genInst && typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).__constellationGen = {
            field: genInst.field,
            warpSettled: genInst.warpSettled?.bind(genInst),
            pinNode: genInst.pinNode?.bind(genInst),
        };
        // Poll the exposed settled signal for the badge (the G6 read a consumer drives
        // its own UI off). A light interval — the badge is a demo affordance, not hot.
        // Cleared in onUnmounted (genSettledTimer above).
        genSettledTimer = window.setInterval(() => {
            genSettled.value = genInst.warpSettled?.() ?? true;
        }, 250);
    }
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="proximity-graph lattice"
            blurb="A Canvas2D field of drifting nodes joined by distance-falloff hairlines. Composes the useCanvas2D substrate — it inherits the offscreen / tab-hidden / reduced-motion freeze for free. The lattice ships neutral; the --primary focal node is a consumer drawOverlay pass, proving the skin seam carries arbitrary content (NOT the slides red anomaly)."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch v-model="interactive" />
                    <span class="text-sm"
                        >interactive (steer-toward-cursor + tap ripples)</span
                    >
                </Label>
            </div>

            <ShowcaseFrame pad="none">
                <!-- warm-cream full-bleed surface; the lattice tracks the
                     --constellation-* tokens for light/dark legibility. -->
                <div
                    class="relative h-[420px] w-full overflow-hidden rounded-card bg-card"
                >
                    <Constellation
                        seed="glass-ui"
                        :count="56"
                        :link="140"
                        :pointer-reactive="interactive"
                        :draw-overlay="drawFocal"
                        class="absolute inset-0"
                        @renderer-status="rendererStatus = $event"
                    />
                    <RendererStatusView :status="rendererStatus" class="pointer-events-none absolute top-3 left-3" />
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Under
                <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate paints ONE static frame then parks — the lattice freezes
                in place and pointer reactivity is disabled (no drift, no ripples).
                Toggle reduced-motion in your OS to verify the freeze.
            </p>
        </StorySection>

        <StorySection
            label="click-to-warp focal node"
            blurb="Click anywhere, or focus the field and press Enter/Space — the focal mark warps through the same engine-owned spring to a drifting node. The drawOverlay mark is the final Canvas2D pass, so visible state and field readback stay causal. The action is disabled under prefers-reduced-motion."
        >
            <ShowcaseFrame pad="none">
                <div
                    data-testid="constellation-warp-host"
                    class="relative h-[420px] w-full cursor-pointer overflow-hidden rounded-card bg-card"
                >
                    <Constellation
                        ref="warpRef"
                        seed="warp-demo"
                        :count="60"
                        :link="148"
                        :pointer-reactive="false"
                        warp-on-click
                        :draw-overlay="drawWarpFocal"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        click or press Enter/Space to warp
                    </span>
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Note <code class="font-mono text-xs">pointerReactive</code> is OFF here
                and <code class="font-mono text-xs">warpOnClick</code> still fires — the
                two axes are independent. The pixels remain decorative; enabling the
                warp promotes the host to a named keyboard/pointer control.
            </p>
        </StorySection>

        <StorySection
            label="resize re-fit + auto-drift wander"
            blurb="The lattice re-fits proportionally on a real resize — the field fills the new canvas within a frame, with no drift-out lag — and the focal node wanders: a periodic auto-pick re-points it to a random node on a jittered cadence, riding the same spring as the click warp. Both are reduced-motion-gated: under reduce the field freezes and the cadence never advances."
        >
            <ShowcaseFrame pad="none">
                <!-- The wander cadence runs short here so the drift is observable.
                     `data-testid` lets the π refit-live spec target THIS host
                     deterministically — the StoryHero now mounts a constellation
                     background canvas at index 0 for this hero route, so the prior
                     `.constellation-canvas` nth() index is fragile (AY.W-DOCK-CHROME §4). -->
                <div
                    ref="refitHostRef"
                    data-testid="constellation-refit-host"
                    class="relative h-[420px] w-full overflow-hidden rounded-card bg-card"
                >
                    <Constellation
                        ref="refitRef"
                        seed="refit-demo"
                        :count="56"
                        :link="140"
                        :pointer-reactive="false"
                        :wander="{ minIdle: 1400, jitter: 600 }"
                        :draw-overlay="drawWarpFocal"
                        class="absolute inset-0"
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="pointer-held gravity-well"
            blurb="Hold the pointer, or focus the field and hold Enter/Space, to pull nearby nodes through the same inverse-square well target; release and the field cools. Pointer and keyboard paths share one owner and are disabled under reduced motion."
        >
            <ShowcaseFrame pad="none">
                <div
                    data-testid="constellation-well-host"
                    class="relative h-[420px] w-full cursor-grab overflow-hidden rounded-card bg-card active:cursor-grabbing"
                >
                    <Constellation
                        ref="wellRef"
                        seed="well-demo"
                        :count="64"
                        :link="148"
                        :pointer-reactive="false"
                        gravity-well
                        :draw-overlay="drawWarpFocal"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        hold pointer or Enter/Space to pull
                    </span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="recession envelope (opacityCeiling)"
            blurb="The per-instance opacityCeiling recession knob — the aurora/fourier sibling that lets a constellation hero recede behind content. Two identical lattices differ ONLY in opacityCeiling: 1.0 (full) vs 0.4 (recessed). The recessed field paints its edges/nodes/web at ~0.4× the alpha, so it yields to the prose a glass card would float over — the ONE recession contract the four live substrates share. Default 1 leaves a constellation with no opacityCeiling unchanged."
        >
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                    class="relative h-[300px] w-full overflow-hidden rounded-card bg-card"
                    data-testid="constellation-recession-full"
                >
                    <Constellation
                        seed="recession-demo"
                        :count="56"
                        :link="140"
                        :pointer-reactive="false"
                        :opacity-ceiling="1"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        opacityCeiling 1.0 (full)
                    </span>
                </div>
                <div
                    class="relative h-[300px] w-full overflow-hidden rounded-card bg-card"
                    data-testid="constellation-recession-dim"
                >
                    <Constellation
                        seed="recession-demo"
                        :count="56"
                        :link="140"
                        :pointer-reactive="false"
                        :opacity-ceiling="0.4"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        opacityCeiling 0.4 (recessed)
                    </span>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="pinned anomaly (generalized)"
            blurb="A pinned anomaly node: the engine holds it in place while the field drifts around it (pinned), tints its incident edges accent (accentEdges), gives it a gentle autonomous anchor-drift distinct from the click-warp (pinnedDrift), and exposes a warpSettled() signal a consumer reads to drive its own UI (the settled badge). The drawOverlay is the same anomaly recipe — a pulse ring, halo, core, dashed callout, and monospace label — pinned to the held node. The label is consumer drawOverlay content; there is no label prop on the component."
        >
            <ShowcaseFrame pad="none">
                <div
                    data-testid="constellation-gen-host"
                    class="relative h-[420px] w-full overflow-hidden rounded-card bg-card"
                >
                    <Constellation
                        ref="genRef"
                        seed="con-gen"
                        :count="60"
                        :link="148"
                        :pointer-reactive="false"
                        pinned
                        accent-edges
                        :pinned-drift="{
                            wanderFrac: 0.16,
                            durMs: 2400,
                            minIdle: 1200,
                            jitter: 800,
                        }"
                        warp-on-click
                        warp-auto-release
                        :draw-overlay="drawPinnedAnomaly"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        pinned anomaly — accent edges + autonomous drift
                    </span>
                    <span
                        class="pointer-events-none absolute right-3 top-3 rounded-pill bg-card/80 px-2.5 py-1 font-mono text-xs"
                        :class="genSettled ? 'text-muted-foreground' : 'text-primary'"
                    >
                        {{ genSettled ? "settled" : "warping…" }}
                    </span>
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                The pinned node holds its position while the rest of the field drifts;
                its incident edges read in the
                <code class="font-mono text-xs">--constellation-accent</code> tint; and
                the autonomous <code class="font-mono text-xs">pinnedDrift</code> gently
                breathes it around its anchor (distinct from the click-warp re-target).
                Click to warp the focal node — the
                <code class="font-mono text-xs">settled</code> badge flips while the
                spring is in flight, then
                <code class="font-mono text-xs">warpAutoRelease</code> frees it on
                arrival (the identity-ride).
            </p>
        </StorySection>
    </StoryPage>
</template>
