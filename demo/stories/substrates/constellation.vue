<script setup lang="ts">
// Constellation — the neutral proximity-graph lattice + a `drawOverlay` focal
// node. The overlay paints a glass-ui-toned (`--primary`) pulse ring; the
// `drawOverlay` seam carries arbitrary consumer content, so a branded skin stays
// a consumer concern.
import { computed, onMounted, ref, useTemplateRef } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    Constellation,
    type ConstellationField,
} from "../../../src/subpaths/constellation";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
import { useTokenColor } from "../../../src/composables/dom/useTokenColor";

const pointerReactive = ref(true);

// Resolve `--primary` to a concrete color so the canvas overlay paints it (a
// Canvas2D `fillStyle` cannot resolve a `var()`). Re-resolves on a dark flip.
const { value: primary } = useTokenColor("--primary", { fallback: "#1c1714" });

// The skin seam. Runs after the four neutral passes with the live field, so the
// focal mark pins to a real node and pulses a ring around it. node[0] is the
// static-focal demo (no warp).
const drawFocal = computed(
    () =>
        (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
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
    () =>
        (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
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

// ── Anomaly drawOverlay recipe + ?freeze section (AY.W-CON3) ────────────────
// The transposed slides `drawAnomaly` skin, neutralized of deck-domain wording —
// a copy-pasteable `drawOverlay` pinned to the W-CON1 auto-drift focal
// (`field.warp.{x,y}`): a pulse ring + soft halo + core dot + an optional
// resolved-check + a dashed monospace callout. The fractional anchor, the label,
// and the `resolved` flag are CONSUMER state closed over the fn (NOT library
// props) — the recipe shows the closure shape. Under `:freeze` the engine hands
// this a FROZEN `now`, so `(now % 2600) / 2600` resolves to a fixed phase: the
// ring radius is identical frame-over-frame (the deterministic-capture truth).
const ANOMALY_LABEL = "anomaly";
const ANOMALY_RESOLVED = false;
const freezeRef = useTemplateRef<InstanceType<typeof Constellation>>("freezeRef");

// AY.W-CON-FIX (F8.3) — the OBSERVED `now` the engine actually hands `drawAnomaly`,
// stamped inside the painter below. The freeze-gate's overlay-phase leg reads THIS
// (not the recomputed constant), so a regression of the frozen-`now` handoff
// (Constellation.vue handing a LIVE `now` under freeze) REDs the gate — the leg is
// no longer a tautology. -1 until the first paint stamps it.
let lastPaintedNow = -1;

const drawAnomaly = computed(
    () =>
        (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {
            // Record the `now` the engine handed this painter (F8.3). Under freeze
            // the engine clamps it to FROZEN_NOW (0); a live-`now` leak shows up
            // here as a non-zero, advancing value.
            lastPaintedNow = now;
            // Pin to the engine-owned focal (the W-CON1 auto-drift focal under
            // `warpOnClick`/`wander`); before the first warp it rides field-center.
            const x = field.warp.x;
            const y = field.warp.y;
            if (field.focalIndex < 0 && x === 0 && y === 0) return;
            const k = field.k;
            // The pulse phase — under `?freeze` `now` is a fixed sentinel, so this
            // resolves to ONE value (the determinism truth).
            const phase = (now % 2600) / 2600;

            // outer pulse ring
            ctx.strokeStyle = accent.value;
            ctx.globalAlpha = (1 - phase) * 0.55;
            ctx.lineWidth = 1.6 * k;
            ctx.beginPath();
            ctx.arc(x, y, (12 + phase * 24) * k, 0, Math.PI * 2);
            ctx.stroke();
            // inner steady ring
            ctx.globalAlpha = 0.85;
            ctx.lineWidth = 1.4 * k;
            ctx.beginPath();
            ctx.arc(x, y, 14 * k, 0, Math.PI * 2);
            ctx.stroke();
            // soft halo
            ctx.globalAlpha = 0.18;
            ctx.beginPath();
            ctx.arc(x, y, 26 * k, 0, Math.PI * 2);
            ctx.fillStyle = accent.value;
            ctx.fill();
            // core dot
            ctx.globalAlpha = 1;
            ctx.fillStyle = accent.value;
            ctx.beginPath();
            ctx.arc(x, y, 4.4 * k, 0, Math.PI * 2);
            ctx.fill();
            // optional resolved checkmark (consumer state, not a lib prop)
            if (ANOMALY_RESOLVED) {
                ctx.strokeStyle = accent.value;
                ctx.lineWidth = 1.8 * k;
                ctx.beginPath();
                ctx.moveTo(x - 2.4 * k, y + 0.2 * k);
                ctx.lineTo(x - 0.6 * k, y + 2.2 * k);
                ctx.lineTo(x + 2.6 * k, y - 2.0 * k);
                ctx.stroke();
            }
            // dashed monospace callout pinned to the focal
            const lx = x + 30 * k;
            const ly = y - 18 * k;
            ctx.globalAlpha = 0.5;
            ctx.setLineDash([3 * k, 3 * k]);
            ctx.beginPath();
            ctx.moveTo(x + 8 * k, y - 6 * k);
            ctx.lineTo(lx - 4 * k, ly + 4 * k);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = accent.value;
            ctx.font = `${11 * k}px ui-monospace, monospace`;
            ctx.textBaseline = "alphabetic";
            ctx.fillText(ANOMALY_LABEL, lx, ly);
        },
);

// ── Recession-envelope section (AY.W-COHERE E3) ─────────────────────────────
// Two <Constellation> instances over an IDENTICAL seed/count/link, differing ONLY
// in `opacityCeiling` (1.0 vs 0.4). The π substrate-cohesion spec screenshots both
// canvases (located via the wrapper `data-testid`) over the white card and asserts
// the 0.4 instance paints ~0.4× the ink coverage of the 1.0 — the recession prop
// BITES (the G-RECESSION π readback), not just declared. A neutral lattice (no
// focal overlay) so the comparison is the raw edge/node ink, the recession's target.

// ── Supernova section (DEMO-ONLY — NOT an engine prop, AY.W-CON2) ───────────
// Double-tap pushes a radial OUTWARD impulse onto the live field — implemented
// ENTIRELY here, calling the public `field` expose (no library code, no engine
// prop). Proves the public `field` seam carries arbitrary consumer content (the
// W-DOC1 README example). On a DIFFERENT canvas from the warp instance so the
// double-tap-vs-warp collision is structurally absent (no warp/ripple listener).
const novaRef = useTemplateRef<InstanceType<typeof Constellation>>("novaRef");
const novaHostRef = useTemplateRef<HTMLElement>("novaHostRef");

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
                refitHost.style.width = `${w}px`;
                refitHost.style.height = `${h}px`;
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

    // AY.W-CON3: the ?freeze deterministic-capture seam. `field` lets the π
    // freeze-live spec read the node-position hash + the warp/focal state per
    // mount; `overlayPulseRadius()` recomputes the recipe's outer-ring radius
    // off the frozen state (the FROZEN_NOW=0 phase → the inner radius), so the
    // spec can hash the OVERLAY phase across runs WITHOUT re-running the painter.
    // Two back-to-back mounts of `<Constellation :freeze :seed>` must hash
    // BYTE-IDENTICAL (cross-run determinism); one mount sampled at frame 1 vs a
    // later `now` must hash IDENTICAL (frame-stillness — the field + the frozen
    // overlay phase do not advance).
    const freezeInst = freezeRef.value as
        | (InstanceType<typeof Constellation> & { field?: ConstellationField })
        | null;
    if (freezeInst?.field && typeof window !== "undefined") {
        const freezeField = freezeInst.field;
        (window as unknown as Record<string, unknown>).__constellationFreeze = {
            field: freezeField,
            // The recipe's frozen-phase pulse radius. Under ?freeze the engine
            // hands drawOverlay `now = FROZEN_NOW` (0), so phase = 0 → the outer
            // ring sits at `(12 + 0 * 24) * k = 12 * k`. This recomputes that
            // SAME value off the live `k`, so the spec reads the overlay-phase
            // observable the static frame actually paints.
            overlayPulseRadius(): number {
                const phase = (0 % 2600) / 2600; // FROZEN_NOW = 0
                return (12 + phase * 24) * freezeField.k;
            },
            // AY.W-CON-FIX (F8.3) — the `now` the engine ACTUALLY handed the
            // painter on its last paint (stamped inside `drawAnomaly`). Under
            // freeze this is FROZEN_NOW (0); a live-`now` leak (a regression of
            // the Constellation.vue frozen-`now` handoff) shows up as a non-zero,
            // advancing value, so the freeze gate's overlay-phase leg is REAL (it
            // observes the frozen-`now` contract, not a recomputed constant).
            paintedNow(): number {
                return lastPaintedNow;
            },
        };
    }

    // AY.W-CON2 — the DEMO-ONLY supernova. A double-tap (two pointerdowns within
    // ~300ms near the same point) pushes a radial OUTWARD impulse onto the live
    // field.nodes[].{vx,vy}; the existing |v|→speed drift renormalises it back to
    // `speed`. NO library code — this calls the public `field` expose only. PRM-
    // checked here (it is not engine code). On a SEPARATE canvas with NO warp/ripple
    // listener so the double-tap-vs-warp collision is structurally absent.
    const nova = novaRef.value as
        | (InstanceType<typeof Constellation> & { field?: ConstellationField })
        | null;
    const novaHost = novaHostRef.value;
    if (nova?.field && novaHost && typeof window !== "undefined") {
        const novaField = nova.field;
        const prmReduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        let lastTap = 0;
        let lastX = 0;
        let lastY = 0;
        const supernova = (cx: number, cy: number) => {
            const r = novaHost.getBoundingClientRect();
            if (!r.width || !r.height) return;
            const lx = ((cx - r.left) / r.width) * novaField.w;
            const ly = ((cy - r.top) / r.height) * novaField.h;
            // a radial OUTWARD impulse: push each node away from the tap, decaying
            // with distance, directly onto its velocity (the drift cools it back).
            for (const p of novaField.nodes) {
                const dx = p.x - lx;
                const dy = p.y - ly;
                const d = Math.hypot(dx, dy) || 1;
                const impulse = Math.max(0, 1 - d / 360) * 6; // base-width px/frame
                p.vx += (dx / d) * impulse;
                p.vy += (dy / d) * impulse;
            }
        };
        if (!prmReduce) {
            novaHost.addEventListener("pointerdown", (e: PointerEvent) => {
                const t = performance.now();
                const near = Math.hypot(e.clientX - lastX, e.clientY - lastY) < 40;
                if (t - lastTap < 300 && near) {
                    supernova(e.clientX, e.clientY);
                    lastTap = 0; // consume the pair
                } else {
                    lastTap = t;
                    lastX = e.clientX;
                    lastY = e.clientY;
                }
            });
        }
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
                    <Switch v-model="pointerReactive" />
                    <span class="text-sm">pointer-reactive (steer-toward-cursor + tap ripples)</span>
                </Label>
            </div>

            <ShowcaseFrame pad="none">
                <!-- warm-cream full-bleed surface; the lattice tracks the
                     --constellation-* tokens for light/dark legibility. -->
                <div class="relative h-[420px] w-full overflow-hidden rounded-card bg-card">
                    <Constellation
                        seed="glass-ui"
                        :count="56"
                        :link="140"
                        :pointer-reactive="pointerReactive"
                        :draw-overlay="drawFocal"
                        class="absolute inset-0"
                    />
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Under <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate paints ONE static frame then parks — the lattice
                freezes in place and pointer reactivity is disabled (no drift, no
                ripples). Toggle reduced-motion in your OS to verify the freeze.
            </p>
        </StorySection>

        <StorySection
            label="click-to-warp focal node"
            blurb="Click anywhere — the focal mark warps to the NEAREST drifting node and springs there (critically damped, chasing the live drifting target so it arrives ON the node, then rides its drift). Click again to re-point. The warp is one engine-owned spring stepped inside the substrate's single rAF (no second rAF, no useSpring); it is disabled under prefers-reduced-motion. The --constellation-accent tint is the consumer-preset boundary (the library ships a neutral default; slides aliases it to --ncsu-red)."
        >
            <ShowcaseFrame pad="none">
                <div
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
                        click to warp the focal node
                    </span>
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Note <code class="font-mono text-xs">pointerReactive</code> is OFF here
                and <code class="font-mono text-xs">warpOnClick</code> still fires —
                the two axes are independent (warp works on a non-ripple lattice).
                The constellation is a DECORATIVE proximity graph, not a data-graph
                renderer.
            </p>
        </StorySection>

        <StorySection
            label="resize re-fit + auto-drift wander"
            blurb="The lattice re-fits proportionally on a real resize — the field fills the new canvas within a frame, with no drift-out lag — and the focal node wanders: a periodic auto-pick re-points it to a random node on a jittered cadence, riding the same spring as the click warp. Both are reduced-motion-gated: under reduce the field freezes and the cadence never advances."
        >
            <ShowcaseFrame pad="none">
                <!-- The wander cadence runs short here so the drift is observable. -->
                <div
                    ref="refitHostRef"
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
            blurb="Hold the pointer over the lattice and the nodes within reach are pulled toward it — an inverse-square force on the same engine; release and the field cools back to its drift speed. The well reuses the pointer the engine already tracks, with a no-singularity softening floor and a no-slingshot speed clamp. Reduced-motion-gated: under reduce the held timer never arms."
        >
            <ShowcaseFrame pad="none">
                <div
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
                        hold to pull the field in
                    </span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="recession envelope (opacityCeiling)"
            blurb="The per-instance opacityCeiling recession knob — the aurora/fourier sibling that lets a constellation hero recede behind content. Two identical lattices differ ONLY in opacityCeiling: 1.0 (full) vs 0.4 (recessed). The recessed field paints its edges/nodes/web at ~0.4× the alpha, so it yields to the prose a glass card would float over — the ONE recession contract the four live substrates share. Default 1 is byte-identical to a constellation with no opacityCeiling."
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
            label="double-tap supernova"
            blurb="Double-tap the field for a radial outward impulse that scatters the nodes, then the drift settles their speed back to rest. It is built entirely from the public field seam — a consumer's flourish over the same engine, no library code."
        >
            <ShowcaseFrame pad="none">
                <div
                    ref="novaHostRef"
                    class="relative h-[420px] w-full cursor-pointer overflow-hidden rounded-card bg-card"
                >
                    <Constellation
                        ref="novaRef"
                        seed="nova-demo"
                        :count="60"
                        :link="148"
                        :pointer-reactive="false"
                        :draw-overlay="drawWarpFocal"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        double-tap to detonate (demo-only)
                    </span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="anomaly drawOverlay recipe + ?freeze deterministic capture"
            blurb="The branded anomaly mark (a pulse ring + halo + core dot + an optional resolved-check + a dashed monospace callout) is a copy-pasteable consumer drawOverlay pinned to the engine-owned focal (field.warp.{x,y}) — NOT a library prop. There is NO anomaly/resolved/label prop on the component (the zero-deck-domain canon holds; the slides decl-model re-authors against THIS recipe). The freeze prop lays out ONE reproducible STATIC frame (seeded layout, no stepField, no advance) and hands drawOverlay a FROZEN now, so the pulse-ring radius is identical frame-over-frame — the determinism a pptx/print/screenshot capture needs. Omit freeze to auto-derive from a ?export|?print|?freeze URL. The π freeze-live spec mounts this twice and asserts the node-position + overlay-phase hashes are BYTE-IDENTICAL across runs (and frame-still within one run)."
        >
            <ShowcaseFrame pad="none">
                <div
                    class="relative h-[420px] w-full overflow-hidden rounded-card bg-card"
                >
                    <Constellation
                        ref="freezeRef"
                        seed="ay-w-con3"
                        :count="60"
                        :link="148"
                        :pointer-reactive="false"
                        warp-on-click
                        :freeze="true"
                        :draw-overlay="drawAnomaly"
                        class="absolute inset-0"
                    />
                    <span
                        class="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                        frozen static frame (?freeze) — the anomaly recipe overlay
                    </span>
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                This instance carries <code class="font-mono text-xs">:freeze="true"</code>
                — the lattice is a frozen, reproducible static frame (seeded layout,
                no drift, no warp advance) and the anomaly recipe's pulse phase is
                clamped, so two captures of this frame are byte-identical. Omit the
                prop to auto-derive freeze from a
                <code class="font-mono text-xs">?export</code> /
                <code class="font-mono text-xs">?print</code> /
                <code class="font-mono text-xs">?freeze</code> URL (the deploy
                capture contract).
            </p>
        </StorySection>
    </StoryPage>
</template>
