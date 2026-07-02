// BE.W-DOCK-FISSION / BG.W-DOCK-FISSION-WIRE — useDockFission: the n-ary detach orchestrator.
//
// THE DEFECT (the user's #1 — the island WAIST). The rest state is ONE glass pill, goo
// OFF; the split CARVES it — the surviving controls DETACH along a context signature, each
// bridged to the body by a stretching goo neck that visibly RESISTS the pointer pull.
//
// THE LOAD-BEARING REUSE (no second engine, no new spring family):
//   • ONE spring on `DOCK_SPRING`, routed through the band's SOLE `new SpringProgress`
//     factory `useDockSpring` (BG.W-DOCK-ENGINE-UNIFY) — no bespoke spring constant (F1).
//     `playTo` writes `--dock-split-t` once/frame + owns the velocity-continuous re-base,
//     so a mid-flight toggle joins the SAME trajectory (iOS interruptible).
//   • F2 bidirectional: the scalar runs 0→1 to split AND 1→0 to re-merge on the SAME loop.
//   • The squish recoil rides `useLiquidFlex` (`"tanh"`, capped LOW ≤1.08 — anti-taffy);
//     the seam-tension rides `usePointerVelocityField`, FED from INSIDE this loop's frame
//     callback (`tick(delta)` — NO second rAF, F4).
//   • PRM seats every piece SYNCHRONOUSLY at its `to` + `field.tick(0)` zeroes the tension
//     → an instant cut, vestibular-safe (F5).
//
// THE PER-CONTEXT goo-SIGNATURE is DATA, not three code paths (F3, the FLOOR): the
// orchestrator reads a `DockSplitSignature` descriptor (search=radial / media=lateral /
// nav=inward-merge, in `dockFissionSignatures.ts`); ONE `fission-bridge.css` recipe paints
// whatever vector the pieces carry, never three hardcoded silhouettes.
//
// A CONSUMING SEAM BESIDE THE MORPH ENGINE (box-inviolate): it does NOT edit
// `dockMorphContext`/`dockMorphMeasure` — it shares only the `useDockSpring` factory + the
// `DOCK_SPRING` clock, morphing surviving controls off a dock body BESIDE it. It reaches
// keyframes.js via the factory, so a composing SFC rides the keyframes-bearing `/dock`
// chunk (the `useDockSearch` precedent), NEVER the vueuse-free root barrel.

import { onScopeDispose, ref, type Ref } from "vue";
import { DOCK_SPRING } from "../constants";
// BG.W-DOCK-FISSION-WIRE — the DECIDE: the fission spring is ROUTED through the ONE
// `useDockSpring` factory (the band's sole `new SpringProgress` site). The orchestrator
// no longer hand-rolls the create/re-base/dispose dance — it hands the factory the
// byte-fenced `DOCK_SPRING` clock + its per-frame writer (no bespoke spring family, no
// second `new SpringProgress`; the interruptible velocity-continuous re-base lives once
// in the factory).
import { useDockSpring, type DockSpring } from "./useDockSpring";
import {
    useLiquidFlex,
    type UseLiquidFlexReturn,
} from "../../../../composables/motion/useLiquidFlex";
import {
    usePointerVelocityField,
    type UsePointerVelocityField,
} from "../../../../composables/motion/usePointerVelocityField";
// BG.W-DOCK-FISSION-WIRE — the fission SIGNATURE data (the `radialBurst`/`lateralPeel`/
// `inwardMerge` goo-signature MAP + the placement vectors + their types) lives in the
// colocated `dockFissionSignatures` leaf (the no-god-module drain). The orchestrator
// READS the descriptor (box-INVIOLATE — the `--neck-t`/`--island-t` drives + the loop
// UNCHANGED); the leaf's symbols are re-exported below so the public `/dock` surface is
// byte-identical.
import { PLACEMENT_VECTOR } from "./dockFissionSignatures";
import type {
    DockSplitContext,
    DockSplitPlacement,
    DockSplitSignature,
} from "./dockFissionSignatures";

export { PLACEMENT_VECTOR, DOCK_SPLIT_SIGNATURES } from "./dockFissionSignatures";
export type {
    DockSplitContext,
    DockSplitVector,
    DockSplitPlacement,
    DockSplitSquishPeak,
    DockSplitSignature,
} from "./dockFissionSignatures";

/** The per-piece DIRECTION-VECTOR + rank a control registers (the MorphTarget twin). */
export interface DockFissionPieceRegistration {
    /** The detaching control element (its `--split-*`/`--neck-t` vars are written here). */
    el: Ref<HTMLElement | null>;
    /**
     * The detach DIRECTION as a unit-ish vector in dock-local space (the bloom/peel
     * direction). `radial` blooms `(cx_i − cx_dock)`-ward; `lateral` peels cross-axis;
     * `inward-merge` is the negative radial. May be a getter so a live re-measure
     * (the FLIP-measured center) re-resolves per read.
     */
    vector: { dx: number; dy: number } | (() => { dx: number; dy: number });
    /**
     * The piece's ordinal in the registration order (the `--i` the bridge reads + the
     * input to the signature's `staggerRank`). Stable per piece.
     */
    rank: number;
}

/** The handle a registered piece holds (detach on unmount). */
export interface DockFissionPieceHandle {
    /** Detach this piece from the orchestrator (on the control's unmount). */
    release(): void;
}

export interface UseDockFissionOptions {
    /** The `.glass-dock` root (or the fission scope) the shared `--dock-split-t` writes to. */
    rootEl: Ref<HTMLElement | null>;
    /**
     * The active signature (the context the dock is fissioning under). A `Ref` so a
     * consumer can swap contexts; the orchestrator reads `.value` at split time.
     */
    signature: Ref<DockSplitSignature>;
    /**
     * BD.W-DOCK-CORE (II.2 — F-1). The placement the detached pieces fly to form the
     * sibling island. A `Ref` so a consumer can swap placement. The orchestrator writes
     * the per-piece travel along this ONE coherent vector (not per-piece radial scatter)
     * so the cluster reads as a real detach into a second dock beside/above/below.
     * Defaults to `"beside"`.
     */
    placement?: Ref<DockSplitPlacement>;
    /**
     * The LOW squish cap the `useLiquidFlex` recoil saturates at (≤1.08 — the anti-taffy
     * fence). May be a getter so a live `--*-max-stretch` cascade override re-resolves.
     * Defaults to 1.08 (the `useLiquidFlex` register).
     */
    maxStretch?: number | (() => number);
    /**
     * The seam-tension cap (F4 — kept LOW ≈0.12, the `useLiquidFlex` maxStretch
     * register). A fast pull THINS the neck via the existing `clip-path` channel up to
     * this cap, saturating — never a taffy-pull.
     */
    seamTensionCap?: number;
    /**
     * The seam-tension velocity gain `k` — `--seam-tension = clamp(0, speed·k, cap)`.
     * Defaults to 0.6 (a calm gain over the normalized-host velocity).
     */
    seamTensionGain?: number;
    /**
     * The per-rank stagger STEP — the `--neck-t` phase shift per stagger-rank so the N
     * necks break in sequence (the `--split-stagger * rank` idiom). Defaults to 0.08.
     */
    staggerStep?: number;
    /** Honor `prefers-reduced-motion: reduce` → instant sync-seat (F5). Default true. */
    respectReducedMotion?: boolean;
}

export interface UseDockFissionReturn {
    /** The live split scalar (0 rest → 1 fissioned), the last value the spring wrote. */
    readonly t: Readonly<Ref<number>>;
    /** True while the dock is fissioned (or mid-fission past the threshold). */
    readonly fissioned: Readonly<Ref<boolean>>;
    /**
     * Register a surviving control as a fission PIECE (the `Set<MorphTarget>` pattern).
     * The piece carries its DIRECTION-VECTOR + rank; the orchestrator writes its
     * `--split-dx`/`--split-dy`/`--i`/`--neck-t` off the active signature.
     */
    registerPiece(reg: DockFissionPieceRegistration): DockFissionPieceHandle;
    /** SPLIT — run the scalar 0→1 (carve the pill into the N pieces). */
    split(): void;
    /** RE-MERGE — run the scalar 1→0 (the SAME loop, target flipped — F2 bidirectional). */
    merge(): void;
    /** Toggle split↔merge from the current state. */
    toggle(): void;
    /**
     * The `@pointermove` handler the consumer binds on the dock host — feeds the raw
     * pointer to the velocity field (the field is ticked from INSIDE the driver loop).
     * PRM-gated by the field itself.
     */
    onPointerMove(event: PointerEvent): void;
    /** Tear down the spring + the field listener (auto-run on scope dispose). */
    dispose(): void;
}

const SPLIT_THRESHOLD = 0.02; // the sub-perceptual carve threshold (goo OFF below it).

interface FissionPiece {
    el: Ref<HTMLElement | null>;
    vectorOf: () => { dx: number; dy: number };
    rank: number;
    flex: UseLiquidFlexReturn;
    stop: () => void;
}

/**
 * The n-ary detach orchestrator. ONE `SpringProgress` on `DOCK_SPRING` writing
 * `--dock-split-t` + per-piece `--split-dx`/`--split-dy`/`--i`/`--neck-t` off the active
 * `DockSplitSignature`, the snap-recoil on `useLiquidFlex`, the seam-tension on
 * `usePointerVelocityField` (fed from inside the ONE loop), PRM sync-seated. See the
 * module header for the load-bearing-reuse + box-inviolate rationale.
 *
 * @example
 * ```ts
 * const fission = useDockFission({ rootEl, signature })
 * const h = fission.registerPiece({ el: searchIconRef, vector: { dx: -1, dy: 0 }, rank: 0 })
 * fission.split()    // the pill carves into the pieces along the signature
 * ```
 */
export function useDockFission(options: UseDockFissionOptions): UseDockFissionReturn {
    const {
        rootEl,
        signature,
        placement,
        maxStretch,
        seamTensionCap = 0.12,
        seamTensionGain = 0.6,
        staggerStep = 0.08,
    } = options;
    const respectPRM = options.respectReducedMotion !== false;

    /** The coherent placement vector — the SAME direction the whole cluster + island fly. */
    function placementVector(): { dx: number; dy: number } {
        return PLACEMENT_VECTOR[placement?.value ?? "beside"];
    }

    const t = ref(0);
    const fissioned = ref(false);
    /** The spring's TARGET (0 merged, 1 split) — the direction lives in the target. */
    let target = 0;

    // ONE spring, the dock's single clock for the split — routed through the band's sole
    // `new SpringProgress` factory (`useDockSpring`, BG.W-DOCK-ENGINE-UNIFY). It reads the
    // byte-fenced `DOCK_SPRING` clock (no bespoke spring family); `playTo` owns the
    // create-carrying-prior-velocity / self-dispose dance (the iOS interruptible re-base),
    // so the orchestrator never hand-rolls a `new SpringProgress`.
    const dockSpring: DockSpring = useDockSpring({
        response: DOCK_SPRING.response,
        dampingFraction: DOCK_SPRING.dampingFraction,
    });

    // The seam-tension field — fed from INSIDE this driver's loop via `tick(delta)` (the
    // no-own-rAF discipline, F4). It owns the cached-PRM gate + the velocity derivation.
    const field: UsePointerVelocityField = usePointerVelocityField({
        respectReducedMotion: respectPRM,
    });

    const pieces = new Set<FissionPiece>();
    let lastFrameTs = 0;

    function count(): number {
        return pieces.size;
    }

    function root(): HTMLElement | null {
        return rootEl.value;
    }

    function prefersReducedMotion(): boolean {
        return (
            respectPRM &&
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }

    /**
     * Write the per-piece vectors + the phase-shifted `--neck-t` off the active signature
     * at the current scalar `tValue`. ONE property-write per piece (the single-write
     * idiom) — the bridge recipe reads `--split-dx`/`--split-dy`/`--i`/`--neck-t`/
     * `--stretch`.
     */
    function writePieces(tValue: number): void {
        const sig = signature.value;
        const count = pieces.size;
        // The seam-tension scalar — clamp(0, speed·gain, cap). The neck-inset reads it as
        // `--dock-split-t MINUS --seam-tension` so a fast pull THINS the neck (resist),
        // and the spring re-bases from velocity on release (stretch-then-snap). ONE write.
        const tension = Math.min(
            seamTensionCap,
            Math.max(0, field.speed.value * seamTensionGain),
        );
        const r = root();
        if (r) {
            r.style.setProperty("--seam-tension", String(tension));
            // BD.W-DOCK-CORE (II.2 — F-1). The ISLAND geometry the second-dock plate +
            // the goo neck read. `--island-t` is the live split scalar (the island scales
            // up + the neck stretches off it); `--island-dx`/`--island-dy` are the
            // COHERENT placement vector the cluster + island fly along (beside/above/
            // below). ONE write on the root — every island/neck element inherits it. */
            const pv = placementVector();
            r.style.setProperty("--island-t", String(tValue));
            r.style.setProperty("--island-dx", String(pv.dx));
            r.style.setProperty("--island-dy", String(pv.dy));
        }

        for (const p of pieces) {
            const el = p.el.value;
            if (!el) continue;
            // The neck PHASE shift: each piece's `--neck-t` is `--dock-split-t` shifted by
            // its stagger rank × the step (so the N necks break in SEQUENCE). The neck is a
            // derivative of the split scalar — never a second clock (B5).
            const rank = sig.staggerRank(p.rank, count);
            const shift = rank * staggerStep;
            // neck-t maps the staggered window of split-t onto 0..1 — the piece's neck
            // opens only after its stagger delay, then runs to 1 by the end of the travel.
            const span = Math.max(0.0001, 1 - shift);
            const neckT = Math.min(1, Math.max(0, (tValue - shift) / span));
            // The squish recoil: drive the piece's liquid-flex off the live neck-t so the
            // |Δt| derivative IS the squish travel (the swell on a fast pull, capped LOW).
            p.flex.drive(neckT);

            // The per-piece DETACH VECTOR is the piece's OWN registered vector (the
            // box-INVIOLATE `registerPiece({ vector })` contract). A getter RE-RESOLVES per
            // write off the live FLIP-measured center; the COHERENT cluster read (F-1) is
            // carried by the ROOT's `--island-dx`/`--island-dy` placement vector above.
            const v = p.vectorOf();

            el.style.setProperty("--split-dx", String(v.dx));
            el.style.setProperty("--split-dy", String(v.dy));
            el.style.setProperty("--i", String(p.rank));
            el.style.setProperty("--neck-t", String(neckT));
            // The NECK SPECULAR-SWEEP angle (BE.W-METABALL-BRIDGE2 B3) — the catch-light
            // bends ALONG the filament as it stretches: the conic angle advances with neck-t
            // (the fission-bridge.css ::after sweep reads it) + a small pointer-tension skew.
            // A function of the SAME scalar (no second clock); ONE write off the SAME loop.
            const sweepAngle = (neckT * 360 + tension * 60) % 360;
            el.style.setProperty("--neck-specular-angle", `${sweepAngle.toFixed(1)}deg`);
            // The piece's own --stretch (the volume-preserving squish — read reciprocally
            // by fission-bridge.css's piece scale). One write off the SAME loop.
            el.style.setProperty("--stretch", String(p.flex.stretch.value));
        }
    }

    /** Seat every piece + the scalar at the target SYNCHRONOUSLY (the PRM cut — F5). */
    function seatSync(): void {
        t.value = target;
        const r = root();
        const pv = placementVector();
        if (r) {
            r.style.setProperty("--dock-split-t", String(target));
            r.style.setProperty("--island-t", String(target));
            r.style.setProperty("--island-dx", String(pv.dx));
            r.style.setProperty("--island-dy", String(pv.dy));
            // PRM: the bridge opacity is zeroed by the @media block; tension is zeroed.
            r.style.setProperty("--seam-tension", "0");
            if (target < SPLIT_THRESHOLD) {
                r.removeAttribute("data-fissioning");
                r.removeAttribute("data-fissioned");
            } else {
                r.setAttribute("data-fissioning", "");
                r.setAttribute("data-fissioned", "");
            }
            // PRM cut — no merge-splash paints (the §6 PRM-static jubilance fence).
            r.removeAttribute("data-merging");
        }
        field.tick(0); // zero the field (no live velocity under the cut).
        // Seat each piece at its endpoint vector, neck-t at the target, stretch at rest.
        // The PRM sync-seat honors the SAME box-INVIOLATE `vector` contract as the live
        // loop — the piece's own (possibly getter) detach vector, re-resolved here so the
        // instant cut lands at the live FLIP-measured endpoint.
        for (const p of pieces) {
            const el = p.el.value;
            if (!el) continue;
            const v = p.vectorOf();
            p.flex.drive(target);
            el.style.setProperty("--split-dx", String(v.dx));
            el.style.setProperty("--split-dy", String(v.dy));
            el.style.setProperty("--i", String(p.rank));
            el.style.setProperty("--neck-t", String(target));
            // PRM seat — the specular-sweep is static-OFF (the @media block hides the
            // neck ::after); seat the angle at the endpoint for a deterministic frame.
            el.style.setProperty(
                "--neck-specular-angle",
                `${(target * 360).toFixed(1)}deg`,
            );
            el.style.setProperty("--stretch", "1");
        }
        fissioned.value = target >= SPLIT_THRESHOLD;
    }

    /**
     * Ensure the ONE shared spring is running toward `target`, writing `--dock-split-t` +
     * the per-piece vars once/frame. A fresh spring carries the prior velocity (the iOS
     * interruptible re-base). The field is ticked from INSIDE this callback (one-loop, F4).
     */
    function ensureSpringRunning(): void {
        const r = root();
        if (!r) return;

        // PRM — there is NO morph to play; seat synchronously at the target (F5).
        if (prefersReducedMotion()) {
            dockSpring.dispose();
            seatSync();
            return;
        }

        r.setAttribute("data-fissioning", "");
        // BD.W-DOCK-CORE (F-1) — the persistent split STATE hook (the island/neck CSS
        // engages off `[data-fissioned]`). Set the instant a split begins (so the island
        // materializes through the whole travel); cleared only when a merge fully settles.
        if (target >= SPLIT_THRESHOLD) r.setAttribute("data-fissioned", "");
        // BE.W-DOCK-JUBILANCE §2 — the MERGE-DIRECTION signal. The merge-splash
        // gold-coalesce fires ONLY on the reverse fission (1→0, the pieces merging back
        // into ONE liquid surface — a completion event). `[data-merging]` gates the
        // fission-bridge.css splash so a SPLIT (0→1) that also passes near split-t≈0 at
        // its onset never false-flashes the gold. A re-merge while already split sets it;
        // a split clears it. The splash itself is `f(--dock-split-t)` (no second clock).
        if (target < SPLIT_THRESHOLD) r.setAttribute("data-merging", "");
        else r.removeAttribute("data-merging");
        lastFrameTs = 0;
        // The interruptible re-base lives in `useDockSpring.playTo` — a still-live prior
        // episode seeds the fresh spring from its current (value, velocity), so a
        // mid-flight toggle joins the SAME trajectory (the iOS interruptible contract).
        // ONE `--dock-split-t` write per frame; the field is ticked from INSIDE this
        // callback (one-loop, F4); the settle cleanup runs in `onSettle`.
        dockSpring.playTo(t.value, target, {
            onFrame: (tValue: number) => {
                const rr = root();
                if (!rr) return;
                t.value = tValue;
                rr.style.setProperty("--dock-split-t", String(tValue));

                // Feed the velocity field ONE renderer frame from INSIDE this callback —
                // NO second rAF (F4). The delta is derived from the spring's frame cadence.
                const now =
                    typeof performance !== "undefined"
                        ? performance.now()
                        : Date.now();
                const delta = lastFrameTs === 0 ? 16 : now - lastFrameTs;
                lastFrameTs = now;
                field.tick(delta);

                writePieces(tValue);
            },
            onSettle: () => {
                const rr = root();
                fissioned.value = target >= SPLIT_THRESHOLD;
                if (rr) {
                    if (target < SPLIT_THRESHOLD) {
                        rr.removeAttribute("data-fissioning");
                        rr.removeAttribute("data-fissioned");
                        rr.style.removeProperty("--seam-tension");
                    }
                    // The merge-splash one-shot is spent once the merge settles — clear the
                    // gate so the flash does not re-paint at rest (the §6 calm one-shot).
                    rr.removeAttribute("data-merging");
                }
            },
        });
    }

    function split(): void {
        target = 1;
        ensureSpringRunning();
    }

    function merge(): void {
        target = 0;
        ensureSpringRunning();
    }

    function toggle(): void {
        if (target >= SPLIT_THRESHOLD) merge();
        else split();
    }

    function onPointerMove(event: PointerEvent): void {
        field.onPointerMove(event);
    }

    function registerPiece(
        reg: DockFissionPieceRegistration,
    ): DockFissionPieceHandle {
        const vectorOf =
            typeof reg.vector === "function" ? reg.vector : () => reg.vector as { dx: number; dy: number };
        // Each piece gets its OWN liquid-flex squish (the recoil) — no size span (the
        // squish-only path: from=to=0 so `size` is inert; the `drive(neckT)` derivative
        // is the squish travel). The `"tanh"` law, capped LOW at `maxStretch` (≤1.08).
        const flex = useLiquidFlex({
            from: 0,
            to: 0,
            axis: "width",
            squishLaw: "tanh",
            maxStretch: maxStretch ?? 1.08,
        });
        const piece: FissionPiece = {
            el: reg.el,
            vectorOf,
            rank: reg.rank,
            flex,
            stop: () => {},
        };
        pieces.add(piece);
        return {
            release: () => {
                pieces.delete(piece);
            },
        };
    }

    function dispose(): void {
        dockSpring.dispose();
        field.dispose();
    }

    onScopeDispose(dispose);

    return {
        t: t as Readonly<Ref<number>>,
        fissioned: fissioned as Readonly<Ref<boolean>>,
        registerPiece,
        split,
        merge,
        toggle,
        onPointerMove,
        dispose,
    };
}
