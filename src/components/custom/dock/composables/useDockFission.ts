// BE.W-DOCK-FISSION — useDockFission: the n-ary detach orchestrator.
//
// THE DEFECT THIS FIXES (the user's #1 — the island WAIST). The prototype rested as
// two abutting stadium blobs (zero overlap) so the always-on goo could only fuse the
// OVERLAPPING alpha — two tangent caps leave a concave waist by construction. The
// gestalt correction (audit §W2): the rest state is ONE glass pill, goo OFF; the split
// CARVES it — the surviving controls DETACH along a context-specific signature, each
// bridged to the body by a stretching goo neck that visibly RESISTS the pointer pull.
//
// THE LOAD-BEARING REUSE (no second engine, no new spring family — the HONESTY
// correction the spec folds in). This orchestrator CLONES the
// `dockMorphContext.ts:258-289` one-spring/one-scalar loop shape:
//   • ONE `SpringProgress` on `DOCK_SPRING` (the `--spring-dock` register reused; NO
//     bespoke spring constant minted — F1), `play()`ing ONE rAF loop that writes
//     `--dock-split-t` to the dock root once/frame (the single-property-write idiom).
//   • A re-toggle mid-flight RE-BASES the live solver from its current velocity (the
//     `dockMorphContext.ts:255-256` `inheritedVelocity` interruptible contract) — a
//     mid-flight re-grab joins the same trajectory (iOS interruptible).
//   • F2 bidirectional: the scalar runs 0→1 to split AND 1→0 to re-merge on the SAME
//     loop (the target flips; the same spring drives both directions).
//   • The squish recoil rides `useLiquidFlex` (the `"tanh"` law, capped LOW ≤1.08 — the
//     anti-taffy fence); the seam-tension rides `usePointerVelocityField`, FED from
//     INSIDE this loop's frame callback (`tick(delta)` — NO second rAF, F4).
//   • PRM seats every piece SYNCHRONOUSLY at its `to` (the `dockMorphContext.ts:179-185,
//     202-212` `prefersReducedMotion()`/`settleTarget` sync-seat precedent — F5) and
//     `field.tick(0)` zeroes the tension → an instant cut, vestibular-safe.
//
// THE PER-CONTEXT goo-SIGNATURE is DATA, not three code paths (F3, the FLOOR). The
// orchestrator reads a `DockSplitSignature` descriptor (search=radial / media=lateral /
// nav=inward-merge) and computes each piece's `--split-dx`/`--split-dy`/`--i`/`--neck-t`
// off it — ONE recipe (`fission-bridge.css`) paints whatever vector the pieces carry,
// never three hardcoded silhouettes.
//
// A CONSUMING SEAM BESIDE THE MORPH ENGINE (the box-inviolate fence — the
// `useDockSearch.ts:16-20` precedent). It does NOT import/edit `dockMorphContext`/
// `dockMorphMeasure`/`DOCK_SPRING` (the dock's own collapse/expand+V↔H morph mechanism
// is W-DOCK-MORPH-FAMILY's); it morphs surviving controls off a dock body BESIDE it.
//
// VUE + keyframes.js (the heavy peer) — it statically reaches `SpringProgress`, so the
// SFC composing it rides the keyframes-bearing `/dock` chunk (the `useDockSearch`
// precedent), NEVER the vueuse-free root barrel.

import { onScopeDispose, ref, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { DOCK_SPRING } from "../constants";
import {
    useLiquidFlex,
    type UseLiquidFlexReturn,
} from "../../../../composables/motion/useLiquidFlex";
import {
    usePointerVelocityField,
    type UsePointerVelocityField,
} from "../../../../composables/motion/usePointerVelocityField";
// BD.W-MORPH-FIELD-WELD — useDockFission is the `radialBurst`/`lateralPeel`/`inwardMerge`
// RECIPE over the unified WELD. Its public API is box-INVIOLATE (the `--neck-t`/`--island-t`
// drives, the `DockSplitSignature` descriptor, the orchestrator loop all UNCHANGED); the
// goo `<filter>` it bridges through is the ONE shell-root `<GooFilter>` mount's
// `#dock-fission-goo`. The per-context gooey magnitude (`neckHold`) now SOURCES from the
// SHARED `MORPH_SIGNATURES` rows — ONE waist DATA source library-wide (search→radialBurst,
// media→lateralPeel, nav→inwardMerge), not a per-fork literal cohort.
import { MORPH_SIGNATURES } from "../../../../composables/motion/useMorphField";

/** The three named fission CONTEXTS — each maps to a goo signature (F3). */
export type DockSplitContext = "search" | "media" | "nav";

/** The detach vector family a context selects. */
export type DockSplitVector = "radial" | "lateral" | "inward-merge";

/**
 * BD.W-DOCK-CORE (II.2 — F-1 the headline fix). The placement axis the detached
 * pieces TRAVEL ALONG to form the sibling island dock. The prior build let each
 * piece scatter on its own radial center → it read as inline jitter inside the one
 * pill, NOT a detach. A single COHERENT placement vector flies the whole piece
 * cluster off the source plate so a second dock visibly materializes beside/above/
 * below (the iOS-27 split read).
 */
export type DockSplitPlacement = "beside" | "above" | "below";

/** The unit placement vector each `splitPlacement` flies the cluster along. */
export const PLACEMENT_VECTOR: Readonly<
    Record<DockSplitPlacement, { dx: number; dy: number }>
> = {
    beside: { dx: 1, dy: 0 }, // the cluster flies to the right → island lands beside
    above: { dx: 0, dy: -1 }, // up → island above
    below: { dx: 0, dy: 1 }, // down → island below
};

/** The squish-peak register — WHEN the `useLiquidFlex` swell peaks in the travel. */
export type DockSplitSquishPeak = "late" | "long" | "coalesce";

/**
 * The per-context goo-SIGNATURE descriptor (F3 — the FLOOR, DATA not three code paths).
 * The orchestrator reads this to compute each piece's vector + stagger + neck phase; the
 * ONE `fission-bridge.css` recipe paints whatever the pieces carry.
 */
export interface DockSplitSignature {
    /** The context this signature serves. */
    context: DockSplitContext;
    /** The detach-vector family. */
    vector: DockSplitVector;
    /**
     * How long the goo neck HOLDS before it snaps (0..1 of `--split-t`). High = the
     * tense radial pop (neck holds to ~0.55 then snaps); the neck-break offset.
     */
    neckHold: number;
    /**
     * The per-piece stagger-rank resolver — returns piece `i`'s ordinal in the break
     * SEQUENCE (innermost-first for radial, outside-in for lateral). The orchestrator
     * phase-shifts each piece's `--neck-t` by `staggerStep * rank` so the N necks break
     * in sequence, never simultaneously (the `--split-stagger * rank(i)` idiom).
     */
    staggerRank: (i: number, count: number) => number;
    /** WHEN the `useLiquidFlex` squish swell peaks across the travel. */
    squishPeak: DockSplitSquishPeak;
}

/** The canonical per-context signature MAP (F3 — search/media/nav, descriptor-driven). */
export const DOCK_SPLIT_SIGNATURES: Readonly<
    Record<DockSplitContext, DockSplitSignature>
> = {
    // search = RADIAL BURST — controls fly outward like a bloom; neck NECKS LATE (the
    // tense radial pop); innermost-first (an outward ripple, not a simultaneous scatter).
    search: {
        context: "search",
        vector: "radial",
        // BD.W-MORPH-FIELD-WELD — the gooey neck-hold SOURCES from the shared weld row
        // (radialBurst — the tense radial pop). ONE waist-DATA source, not a fork literal.
        neckHold: MORPH_SIGNATURES.radialBurst.neckHold,
        staggerRank: (i, count) => {
            // innermost-first: rank by distance from the center index.
            const mid = (count - 1) / 2;
            return Math.round(Math.abs(i - mid));
        },
        squishPeak: "late",
    },
    // media = LATERAL PEEL — the now-playing center piece stays (the anchor); flanking
    // transport peels along the cross axis; LONG tapering neck tail; outside-in.
    media: {
        context: "media",
        vector: "lateral",
        // the lateral peel — the gooey neck-hold off the shared `lateralPeel` weld row.
        neckHold: MORPH_SIGNATURES.lateralPeel.neckHold,
        staggerRank: (i, count) => {
            // outside-in: the outermost piece breaks first.
            const mid = (count - 1) / 2;
            return Math.round(mid - Math.abs(i - mid));
        },
        squishPeak: "long",
    },
    // nav = INWARD MERGE — the NEGATIVE radial (inward); the bridge runs BACKWARD (the
    // merge-to-ONE generalized to N collapsing inward); `--stretch` PEAKS at coalescence.
    nav: {
        context: "nav",
        vector: "inward-merge",
        // the inward merge-to-ONE — the gooey neck-hold off the shared `inwardMerge` row.
        neckHold: MORPH_SIGNATURES.inwardMerge.neckHold,
        staggerRank: (i, count) => {
            // simultaneous-ish inward coalesce: a gentle outside-in so the rim folds in.
            const mid = (count - 1) / 2;
            return Math.round(mid - Math.abs(i - mid));
        },
        squishPeak: "coalesce",
    },
};

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

    // ONE spring, the dock's single clock for the split. Created per episode carrying the
    // prior episode's velocity (the iOS interruptible re-base). Disposed on settle/teardown.
    let spring: SpringProgress | null = null;

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

    function disposeSpring(): void {
        if (spring) {
            spring.dispose();
            spring = null;
        }
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

        const pv = placementVector();
        const mid = (count - 1) / 2;
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

            // BD.W-DOCK-CORE (II.2 — F-1, THE FIX). The detach vector is the COHERENT
            // placement vector (the whole cluster flies as ONE toward the island) PLUS a
            // small per-piece cross-axis FAN so they spread into a row inside the island
            // (not a stacked pile). The dominant motion is the placement travel — this is
            // what reads as "the pieces detach into a sibling dock", not the prior
            // per-piece radial scatter that stayed inside the source pill.
            const fan = p.rank - mid; // -1, 0, +1 … the row spread
            // cross-axis unit (perpendicular to the placement vector)
            const crossX = -pv.dy;
            const crossY = pv.dx;
            const dx = pv.dx + crossX * fan * 0.42;
            const dy = pv.dy + crossY * fan * 0.42;

            el.style.setProperty("--split-dx", String(dx));
            el.style.setProperty("--split-dy", String(dy));
            el.style.setProperty("--i", String(p.rank));
            el.style.setProperty("--neck-t", String(neckT));
            // The NECK SPECULAR-SWEEP angle (BE.W-METABALL-BRIDGE2 B3 / BE.W-DOCK-JUBILANCE
            // §3a) — the catch-light bends ALONG the filament as it stretches: the conic
            // angle advances with neck-t (the light grazes the throat as it thins) and the
            // pointer tension biases it (a fast pull skews the grazing angle — the light
            // bends under tension). A function of the SAME scalar (no second clock); the
            // fission-bridge.css ::after sweep reads it (falls back to a neck-t-derived
            // angle un-wired). ONE write off the SAME loop. The full sweep is 0..1 → 0..360°
            // + a small tension skew so the refractive read tracks the pull.
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
        const mid = (count() - 1) / 2;
        for (const p of pieces) {
            const el = p.el.value;
            if (!el) continue;
            const fan = p.rank - mid;
            const crossX = -pv.dy;
            const crossY = pv.dx;
            const dx = pv.dx + crossX * fan * 0.42;
            const dy = pv.dy + crossY * fan * 0.42;
            p.flex.drive(target);
            el.style.setProperty("--split-dx", String(dx));
            el.style.setProperty("--split-dy", String(dy));
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
            disposeSpring();
            seatSync();
            return;
        }

        const inheritedVelocity =
            spring !== null && !spring.settled ? spring.velocity : 0;
        disposeSpring();
        spring = new SpringProgress({
            response: DOCK_SPRING.response,
            dampingFraction: DOCK_SPRING.dampingFraction,
            initial: t.value,
            respectReducedMotion: true,
        });
        const activeSpring = spring;
        activeSpring.reset(t.value, inheritedVelocity);
        activeSpring.target = target;
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
        activeSpring.play((tValue: number) => {
            const rr = root();
            if (!rr) return;
            t.value = tValue;
            rr.style.setProperty("--dock-split-t", String(tValue));

            // Feed the velocity field ONE renderer frame from INSIDE this callback — NO
            // second rAF (F4). The delta is derived from the spring's own frame cadence.
            const now =
                typeof performance !== "undefined" ? performance.now() : Date.now();
            const delta = lastFrameTs === 0 ? 16 : now - lastFrameTs;
            lastFrameTs = now;
            field.tick(delta);

            writePieces(tValue);

            if (activeSpring.settled) {
                fissioned.value = target >= SPLIT_THRESHOLD;
                if (target < SPLIT_THRESHOLD) {
                    rr.removeAttribute("data-fissioning");
                    rr.removeAttribute("data-fissioned");
                    rr.style.removeProperty("--seam-tension");
                }
                // The merge-splash one-shot is spent once the merge settles — clear the
                // gate so the flash does not re-paint at rest (the §6 calm one-shot).
                rr.removeAttribute("data-merging");
                disposeSpring();
            }
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
        disposeSpring();
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
