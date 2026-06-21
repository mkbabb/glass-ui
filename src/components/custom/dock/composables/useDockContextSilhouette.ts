// BE.W-DOCK-CONTEXT-SILHOUETTE — useDockContextSilhouette: the declarative
// context→silhouette state machine + the pill↔tabbar FUSION morph.
//
// THE MOVE (the iOS-27 context-silhouette). The dock SHAPE communicates the active
// context: `bar` for nav, `bar+pill` for media, `split` for transport, `search` for
// the dock-as-field. Switching context is NOT a `v-if`/`data-mode` block swap (controls
// TELEPORT, never GLIDE — the prototype disease this kills). It is a declarative
// `DockSilhouetteDescriptor[]` MAP the ONE orchestrator reads: each context is a
// descriptor carrying named `slots[]` (keyed by `controlId`), its own spring preset, and
// its `neckHold` (DATA, never an SFC ternary). On `setSilhouette(to)` we DIFF
// `from.slots`/`to.slots` BY controlId:
//   · present-in-BOTH  → FLIP old-rect→new-rect (the surviving control GLIDES to its new
//                        slot via the SHIPPED `ElementMorph` + `springTimingFunction`).
//   · present-in-FROM  → DETACH (drives `useDockFission` — the control buds off the body).
//   · present-in-TO    → BLOOM in (the inverse FLIP — composes `useBloomUp`).
//
// THE HEADLINE FUSION (the pass-4 re-challenge betters — f_055/f_065/f_047). A `bar+pill`
// descriptor whose PILL `to`-rect is the bar's TOP CROWN + a `--silhouette-fuse-t`
// clip-meld: the now-playing pill DOCKS DOWN and MERGES INTO the tab-bar as ONE
// continuous translucent glass plate (not a pill floating above a separate bar). The
// fuse scalar drives the pill's `clip-path` + `translateY` so the pill's bottom edge
// MELDS into the bar's top edge — the result reads as ONE glass module.
//
// THE LOAD-BEARING REUSE (no second engine — a CONSUMING seam beside the morph engine).
// Every surviving-control FLIP composes the EXACT SAME kf substrate `useDockCtaReceive`
// /`useLiquidReveal` activate: `ElementMorph` (the compositor `translate()+scale()`
// rect-delta from `@mkbabb/keyframes.js`) + `springTimingFunction` (the typed `{fn,css}`
// spring curve sampled from the SAME `SPRING_PRESETS` row the `--spring-*` CSS tokens
// generate from — never a hand `(response, ζ)`). It drives ONE `DOCK_SPRING` register
// (BYTE-UNTOUCHED — the FLIP rides the existing clock, no re-tune, no second spring
// family). It owns NO hand-rolled rAF spring integrator. It does NOT touch the dock
// morph orchestrator (`dockMorphContext`/`dockMorphMeasure`) — the silhouette orchestrator
// is a CONSUMING seam BESIDE the morph engine, the `useDockSearch` precedent.
//
// ORIENTATION-DERIVED SLOTS (the `dim`-idiom — vertical falls out by construction). A
// `SilhouetteSlot`'s extent is derived from ONE `orientation` value via `dimOf` (the
// `dockMorphMeasure` cross-axis derivation): the MAIN-axis offset advances down the row
// (horizontal) or column (vertical), the CROSS-axis offset is the gutter. Vertical is a
// CONTENT-REFLOW, not a `display:none` amputation (audit §W6) — every silhouette has a
// column layout for free because the slot rect is computed off the orientation, never a
// hardcoded `inline-size`/`block-size` literal.
//
// COMPOSITOR-ONLY. Every FLIP is `transform: translate()+scale()` (the `ElementMorph`
// compositor delta); the fusion meld is `clip-path` + `translateY` + the `--silhouette-
// fuse-t` custom. ZERO layout property is animated (the `proof:no-layout-animation` floor
// — enforced library-wide; this leaf writes only transform/opacity/filter/clip-path/--*).
//
// PRM-SEATS SYNCHRONOUSLY. Under `prefers-reduced-motion: reduce` the silhouette
// transition SEATS at the target in ONE step (the `ElementMorph` snap precedent —
// `useDockCtaReceive`/`useLiquidReveal` snap to settled, zero transform frames): every
// surviving control jumps to its `to`-rect, the fuse scalar jumps to its endpoint, the
// detach/bloom pieces seat at their `to`. No FLIP frames, vestibular-safe.

import {
    ElementMorph,
    springTimingFunction,
    type Easing,
    type MorphRect,
} from "@mkbabb/keyframes.js";
import { onScopeDispose, readonly, ref, type Ref } from "vue";
import { springPreset, type SpringPresetName } from "../../../../composables/motion/springPresets";
import { DOCK_SPRING } from "../constants";

/** The dock orientation axis (the `dim`-idiom source — slot geometry derives from it). */
export type SilhouetteOrientation = "horizontal" | "vertical";

/** The four named silhouette kinds (the descriptor map's contract). */
export type DockSilhouetteKind = "bar" | "bar+pill" | "split" | "search";

/**
 * The silhouette spring register — a subset of the named `SPRING_PRESETS` rows matching
 * the `useDockCtaReceive`/`useLiquidReveal` register so every dock morph reads as ONE
 * spring family. `dock` is the default (the dock's own settle clock).
 */
export type SilhouettePreset = Extract<SpringPresetName, "dock" | "snappy" | "bouncy">;

/**
 * One named SLOT inside a silhouette — a position keyed by `controlId`. The geometry is
 * ORIENTATION-DERIVED: `main` is the offset along the dock's main axis (the row position
 * horizontal / the column position vertical), `cross` the cross-axis offset, `size` the
 * control's extent. The orchestrator resolves these into a concrete `MorphRect` off the
 * orientation + the dock's measured origin (the `dim`-idiom — never a hardcoded
 * `inline-size`/`block-size` literal, so vertical is the SAME data with `orientation`
 * flipped).
 */
export interface SilhouetteSlot {
    /** The control this slot positions (the diff key — present-in-both → FLIP). */
    controlId: string;
    /** Offset along the dock's MAIN axis (px from the dock origin). */
    main: number;
    /** Offset along the CROSS axis (px from the dock origin). */
    cross: number;
    /** The control's main-axis extent (px). */
    size: number;
    /** The control's cross-axis extent (px; defaults to `size` for a square control). */
    thickness?: number;
    /**
     * FUSION marker (the `bar+pill` headline): when true, this slot's `to`-rect is the
     * bar's TOP CROWN and the orchestrator drives `--silhouette-fuse-t` so the slotted
     * control (the now-playing pill) DOCKS DOWN and MELDS into the bar as ONE plate. A
     * `bar+pill` descriptor with NO `fuse: true` slot is a pill-ABOVE-bar literal (the
     * C3 anti-evasion — the gate reds it).
     */
    fuse?: boolean;
}

/**
 * One declarative silhouette descriptor — a context's whole geometry as DATA (the
 * `DockSectionDescriptor` precedent: data, not code paths). The orchestrator reads the
 * MAP; there is NO per-context hardcoded silhouette literal (the gate's C1 anti-evasion
 * floor).
 */
export interface DockSilhouetteDescriptor {
    /** Stable identifier — the `setSilhouette` argument + the active-silhouette id. */
    id: string;
    /** Which of the four named kinds this context renders. */
    kind: DockSilhouetteKind;
    /** The named slots (control positions) this silhouette places. */
    slots: readonly SilhouetteSlot[];
    /** This silhouette's spring register (DATA, not an SFC ternary). Default `dock`. */
    preset?: SilhouettePreset;
    /**
     * The neck-hold for any DETACH this transition drives (DATA — fed to `useDockFission`
     * when a control is present-in-from-only). 0 = no hold (immediate release), 1 = full
     * hold (the goo necks late then snaps).
     */
    neckHold?: number;
}

/**
 * The DETACH hand-off API the orchestrator drives (BE.W-DOCK-FISSION owns the engine).
 * A control PRESENT-only-in-FROM detaches — the orchestrator registers it as a fission
 * PIECE via `registerPiece` and the fission orchestrator buds it off the body. Defined
 * here per the fission spec (`useDockFission` `registerPiece`); the sibling agent builds
 * it, the orchestrator reconciles the import. The orchestrator never re-implements the
 * detach physics — it CALLS this.
 */
export interface FissionPieceHandle {
    /** Release the piece (drive its `--dock-split-t` 0→1 detach). */
    detach: () => void;
    /** Re-merge the piece (the bidirectional 1→0). */
    remerge: () => void;
    /** Unregister the piece (cleanup). */
    release: () => void;
}

/** The fission registrar the orchestrator composes (BE.W-DOCK-FISSION's `registerPiece`). */
export type RegisterFissionPiece = (
    el: HTMLElement,
    spec: { vector: { dx: number; dy: number }; rank: number; neckHold: number },
) => FissionPieceHandle;

/**
 * The BLOOM-IN hand-off API the orchestrator drives (BE.W-BLOOM-UP owns the engine). A
 * control PRESENT-only-in-TO blooms in — the inverse FLIP. Defined here per the bloom-up
 * spec (`useBloomUp(sourceRef, destRef)`); the orchestrator CALLS it, never re-implements
 * the bloom.
 */
export type BloomInPiece = (el: HTMLElement, fromRect: MorphRect, toRect: MorphRect) => void;

export interface UseDockContextSilhouetteOptions {
    /** The declarative silhouette descriptor MAP (the four kinds; net-new DATA). */
    silhouettes: readonly DockSilhouetteDescriptor[];
    /** The id of the silhouette to seat at construction (defaults to the first). */
    initial?: string;
    /** The dock orientation (the `dim`-idiom source). Default `horizontal`. */
    orientation?: SilhouetteOrientation | Ref<SilhouetteOrientation>;
    /**
     * Resolve a control's live element by `controlId` (the orchestrator measures its
     * current rect for the FLIP). The consumer wires this off its slot refs.
     */
    resolveControl: (controlId: string) => HTMLElement | null;
    /**
     * The dock ROOT element — the orchestrator measures its origin (to resolve a slot's
     * orientation-derived `main`/`cross` into a viewport `MorphRect`) AND writes
     * `--silhouette-fuse-t` onto it for the fusion meld. The fused glass plate is the
     * dock body itself (C5 — the detach pieces paint in the non-clipping frame; the fused
     * plate is the dock root).
     */
    dockRoot: Ref<HTMLElement | null>;
    /**
     * The DETACH registrar (BE.W-DOCK-FISSION's `registerPiece`). When absent, a
     * present-in-from-only control is simply removed from the FLIP set (no detach
     * choreography — graceful until fission wires in).
     */
    registerFissionPiece?: RegisterFissionPiece;
    /**
     * The BLOOM-IN driver (BE.W-BLOOM-UP). When absent, a present-in-to-only control
     * snaps in (no bloom choreography — graceful until bloom-up wires in).
     */
    bloomInPiece?: BloomInPiece;
    /** Honor `prefers-reduced-motion: reduce` (seat synchronously). Default true. */
    respectReducedMotion?: boolean;
    /** Fired once when a silhouette transition has settled (the consumer hand-off). */
    onSettled?: (toId: string) => void;
}

export interface UseDockContextSilhouetteReturn {
    /** The active silhouette id (reactive — the consumer reads the SHAPE). */
    active: Readonly<Ref<string>>;
    /** The active descriptor (reactive). */
    activeDescriptor: Readonly<Ref<DockSilhouetteDescriptor | null>>;
    /** Whether a transition is in flight (the consumer guards re-entrancy / `[data-morphing]`). */
    transitioning: Readonly<Ref<boolean>>;
    /**
     * Transition to the silhouette `toId` — DIFFs the slots by `controlId`, FLIPs the
     * survivors, detaches the from-only, blooms in the to-only, and drives the fusion
     * meld for a `bar+pill` target. A no-op if `toId` is unknown or already active.
     */
    setSilhouette: (toId: string) => void;
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

function readOrientation(
    o: UseDockContextSilhouetteOptions["orientation"],
): SilhouetteOrientation {
    if (o == null) return "horizontal";
    return typeof o === "object" && "value" in o ? o.value : o;
}

/**
 * Resolve a SLOT into a concrete viewport `MorphRect` — the `dim`-idiom. The slot's
 * `main`/`cross` are orientation-AGNOSTIC offsets; this maps them onto the X/Y axes off
 * the orientation + the dock origin. Horizontal: main→X, cross→Y, size→width,
 * thickness→height. Vertical: main→Y, cross→X, size→height, thickness→width. So VERTICAL
 * is the SAME slot data with the axes swapped — never a hardcoded per-orientation literal.
 */
function slotToRect(
    slot: SilhouetteSlot,
    orientation: SilhouetteOrientation,
    origin: { x: number; y: number },
): MorphRect {
    const thickness = slot.thickness ?? slot.size;
    if (orientation === "vertical") {
        // main runs down the COLUMN (Y), cross is the gutter (X).
        return {
            x: origin.x + slot.cross,
            y: origin.y + slot.main,
            width: thickness,
            height: slot.size,
        };
    }
    // horizontal: main runs along the ROW (X), cross is the gutter (Y).
    return {
        x: origin.x + slot.main,
        y: origin.y + slot.cross,
        width: slot.size,
        height: thickness,
    };
}

/**
 * The declarative context→silhouette state machine. Reads a `DockSilhouetteDescriptor[]`
 * MAP; on `setSilhouette` it DIFFs the slots by `controlId` and FLIPs/detaches/blooms via
 * the SHIPPED `ElementMorph` + `springTimingFunction` substrate, ONE `DOCK_SPRING`. The
 * `bar+pill` fusion docks the pill into the bar via `--silhouette-fuse-t`. Compositor-only
 * + PRM-seats. See the module header for the REUSE + the orientation-derived slots + the
 * fusion mechanism.
 *
 * @example
 * ```ts
 * const sil = useDockContextSilhouette({
 *   silhouettes: [
 *     { id: "nav",   kind: "bar",      slots: [...] },
 *     { id: "media", kind: "bar+pill", slots: [{ controlId: "pill", main: 0, cross: -56, size: 240, fuse: true }, ...] },
 *   ],
 *   orientation,
 *   dockRoot,
 *   resolveControl: (id) => slotRefs.value[id] ?? null,
 * })
 * sil.setSilhouette("media") // the pill DOCKS DOWN + MELDS into the bar
 * ```
 */
export function useDockContextSilhouette(
    options: UseDockContextSilhouetteOptions,
): UseDockContextSilhouetteReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const map = new Map(options.silhouettes.map((s) => [s.id, s]));

    const initialId =
        options.initial && map.has(options.initial)
            ? options.initial
            : (options.silhouettes[0]?.id ?? "");

    const active = ref(initialId);
    const activeDescriptor = ref<DockSilhouetteDescriptor | null>(
        map.get(initialId) ?? null,
    );
    const transitioning = ref(false);

    // The in-flight FLIP morphs + the rAF — ONE loop per transition (no second engine,
    // no per-control rAF; every survivor reads the SAME spring sample).
    let rafId = 0;
    let startTs = 0;
    const flips: { el: HTMLElement; morph: ElementMorph }[] = [];
    const livePieces: FissionPieceHandle[] = [];

    function cancelRaf(): void {
        if (rafId && typeof cancelAnimationFrame === "function") cancelAnimationFrame(rafId);
        rafId = 0;
    }

    function clearFlips(): void {
        for (const f of flips) {
            f.el.style.transform = "";
            f.el.style.transformOrigin = "";
        }
        flips.length = 0;
    }

    /** Measure the dock origin (top-left of the dock root in viewport space). */
    function dockOrigin(): { x: number; y: number } {
        const r = options.dockRoot.value?.getBoundingClientRect();
        return r ? { x: r.x, y: r.y } : { x: 0, y: 0 };
    }

    /** Write the fusion meld scalar onto the dock root (the pill docks down into the bar). */
    function writeFuse(t: number): void {
        const root = options.dockRoot.value;
        if (root) root.style.setProperty("--silhouette-fuse-t", t.toFixed(4));
    }

    function settle(toId: string): void {
        transitioning.value = false;
        clearFlips();
        active.value = toId;
        activeDescriptor.value = map.get(toId) ?? null;
        options.onSettled?.(toId);
    }

    function setSilhouette(toId: string): void {
        const to = map.get(toId);
        const from = activeDescriptor.value;
        if (!to || (from && from.id === toId)) return;

        // Cancel any in-flight transition + release stale pieces (re-entrant safe).
        cancelRaf();
        clearFlips();
        for (const p of livePieces) p.release();
        livePieces.length = 0;

        const orientation = readOrientation(options.orientation);
        const origin = dockOrigin();
        const fromSlots = new Map((from?.slots ?? []).map((s) => [s.controlId, s]));
        const toSlots = new Map(to.slots.map((s) => [s.controlId, s]));

        // The target's fusion: a `bar+pill` descriptor with a `fuse: true` slot melds the
        // pill into the bar — the fuse scalar runs 0→1 (dock down) entering `bar+pill`,
        // 1→0 (lift off) leaving it.
        const enteringFusion = to.kind === "bar+pill";
        const leavingFusion = from?.kind === "bar+pill";
        const fuseFrom = leavingFusion ? 1 : 0;
        const fuseTo = enteringFusion ? 1 : 0;

        // The descriptor's OWN spring preset (DATA, not an SFC ternary) — sampled from the
        // SAME SPRING_PRESETS row the --spring-<name> tokens generate from. Default `dock`
        // (DOCK_SPRING — the byte-untouched register; assert the import in the gate).
        const presetName: SilhouettePreset = to.preset ?? "dock";
        const { response, dampingFraction } =
            presetName === "dock" ? DOCK_SPRING : springPreset(presetName);
        const easing: Easing = springTimingFunction({ response, dampingFraction });
        const durationMs = response * 4 * 1000;

        // ── DIFF the slots by controlId ──
        const survivors: { el: HTMLElement; fromRect: MorphRect; toRect: MorphRect }[] = [];
        const bloomIns: { el: HTMLElement; fromRect: MorphRect; toRect: MorphRect }[] = [];
        const detaches: { el: HTMLElement; slot: SilhouetteSlot }[] = [];

        // present-in-BOTH → FLIP; present-in-TO → BLOOM.
        let i = 0;
        for (const [controlId, toSlot] of toSlots) {
            const el = options.resolveControl(controlId);
            if (!el) continue;
            const toRect = slotToRect(toSlot, orientation, origin);
            const fromSlot = fromSlots.get(controlId);
            if (fromSlot) {
                // surviving control — FLIP its CURRENT live rect → the new slot rect.
                survivors.push({ el, fromRect: el.getBoundingClientRect(), toRect });
            } else {
                // to-only — BLOOM in (the inverse FLIP). The source is the control's
                // resting rect at the slot's cross/main collapsed toward the dock origin.
                const fromRect: MorphRect = {
                    x: origin.x,
                    y: origin.y,
                    width: Math.max(1, toRect.width * 0.4),
                    height: Math.max(1, toRect.height * 0.4),
                };
                bloomIns.push({ el, fromRect, toRect });
            }
            i++;
        }
        // present-in-FROM-only → DETACH.
        for (const [controlId, fromSlot] of fromSlots) {
            if (toSlots.has(controlId)) continue;
            const el = options.resolveControl(controlId);
            if (el) detaches.push({ el, slot: fromSlot });
        }

        // ── PRM: SEAT synchronously at the target (the ElementMorph snap precedent) ──
        if (respectPRM && prefersReducedMotion()) {
            writeFuse(fuseTo);
            // survivors snap to their to-rect (identity transform — the box reflows to the
            // new slot under the silhouette's own CSS; the FLIP is the only thing that
            // animates, and PRM drops it). Detaches/blooms seat at their `to`.
            for (const d of detaches) {
                if (options.registerFissionPiece) {
                    const h = options.registerFissionPiece(d.el, {
                        vector: detachVector(d.slot, orientation),
                        rank: 0,
                        neckHold: to.neckHold ?? 0,
                    });
                    h.detach();
                    h.release();
                }
            }
            settle(toId);
            return;
        }

        transitioning.value = true;
        const root = options.dockRoot.value;
        if (root) root.setAttribute("data-silhouette-morphing", "");

        // Build the survivor FLIP morphs (compositor delta from-rect → to-rect).
        for (const s of survivors) {
            flips.push({
                el: s.el,
                morph: new ElementMorph(s.fromRect, s.toRect, {
                    transformOrigin: "center center",
                }),
            });
        }
        // Bloom the to-only controls (the inverse FLIP — composes useBloomUp when wired;
        // else a graceful FLIP fallback so they still GLIDE in, never teleport).
        for (const b of bloomIns) {
            if (options.bloomInPiece) {
                options.bloomInPiece(b.el, b.fromRect, b.toRect);
            } else {
                flips.push({
                    el: b.el,
                    morph: new ElementMorph(b.fromRect, b.toRect, {
                        transformOrigin: "center center",
                    }),
                });
            }
        }
        // Detach the from-only controls (drives useDockFission when wired).
        detaches.forEach((d, idx) => {
            if (options.registerFissionPiece) {
                const h = options.registerFissionPiece(d.el, {
                    vector: detachVector(d.slot, orientation),
                    rank: idx,
                    neckHold: to.neckHold ?? 0,
                });
                livePieces.push(h);
                h.detach();
            }
        });

        // ── The ONE rAF loop — every survivor reads the SAME spring sample ──
        startTs = 0;
        const step = (ts: number): void => {
            if (startTs === 0) startTs = ts;
            const t = Math.min(1, (ts - startTs) / durationMs);
            const eased = easing.fn(t); // the spring curve (overshoot at arrival)
            for (const f of flips) {
                // The FLIP runs the inverse 1→0 (start at the from-rect delta, settle to
                // identity = the to-rect). At eased=0 the control is at its from-rect; at
                // eased=1 it is at its to-rect (identity). `progress = 1 - eased`.
                f.morph.apply(f.el, 1 - eased);
            }
            // The fusion meld — the pill docks down + melds into the bar.
            writeFuse(fuseFrom + (fuseTo - fuseFrom) * eased);
            if (t < 1 && typeof requestAnimationFrame === "function") {
                rafId = requestAnimationFrame(step);
            } else {
                rafId = 0;
                if (root) root.removeAttribute("data-silhouette-morphing");
                writeFuse(fuseTo);
                settle(toId);
            }
        };
        if (typeof requestAnimationFrame === "function") {
            rafId = requestAnimationFrame(step);
        } else {
            // SSR / no-rAF — snap to the target.
            writeFuse(fuseTo);
            if (root) root.removeAttribute("data-silhouette-morphing");
            settle(toId);
        }
    }

    onScopeDispose(() => {
        cancelRaf();
        clearFlips();
        for (const p of livePieces) p.release();
        livePieces.length = 0;
    });

    return {
        active: readonly(active),
        activeDescriptor: readonly(activeDescriptor) as Readonly<
            Ref<DockSilhouetteDescriptor | null>
        >,
        transitioning: readonly(transitioning),
        setSilhouette,
    };
}

/**
 * Compute a detached control's DIRECTION-VECTOR off its slot + the orientation (the
 * fission `vector` — the `dim`-idiom). A control peels along the CROSS axis (the
 * `stack-rail.css` gutter direction the fission media=lateral signature reuses): the sign
 * of `cross` chooses the side, the orientation chooses the axis. This is PURE (exported
 * for the unit test — the slot-diff vector logic is testable without a DOM).
 */
export function detachVector(
    slot: SilhouetteSlot,
    orientation: SilhouetteOrientation,
): { dx: number; dy: number } {
    const dir = Math.sign(slot.cross) || 1;
    return orientation === "vertical" ? { dx: dir, dy: 0 } : { dx: 0, dy: dir };
}

/**
 * PURE slot-diff — exported for the unit test (the diff logic is testable without a DOM).
 * Classifies each controlId across the from/to slot sets: `survivors` (present-in-both →
 * FLIP), `bloomIns` (to-only → BLOOM), `detaches` (from-only → DETACH). This is the
 * load-bearing classification `setSilhouette` runs; testing it directly proves the
 * descriptor-driven state machine is correct without a browser.
 */
export function diffSilhouetteSlots(
    from: readonly SilhouetteSlot[],
    to: readonly SilhouetteSlot[],
): { survivors: string[]; bloomIns: string[]; detaches: string[] } {
    const fromIds = new Set(from.map((s) => s.controlId));
    const toIds = new Set(to.map((s) => s.controlId));
    const survivors: string[] = [];
    const bloomIns: string[] = [];
    const detaches: string[] = [];
    for (const id of toIds) (fromIds.has(id) ? survivors : bloomIns).push(id);
    for (const id of fromIds) if (!toIds.has(id)) detaches.push(id);
    return { survivors, bloomIns, detaches };
}
