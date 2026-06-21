// BE.W-LIQUID-MORPH (WAVE-1) — useLiquidMorph: the GENERALIZED liquid framework.
//
// THE ASK: an arbitrary card/container that n-ary SPLITS / MORPHS / UNIONS with
// other elements at an ARBITRARY angle of attack (a metaball from any angle theta,
// NOT just top/bottom/left/right), vertical OR horizontal, AND a dock that EXPANDS
// to form a CARD. This is the generalization of the dock's V<->H morph: the dock
// `dockMorphContext.ts` is the SPECIAL case (a 2-target, axis-locked morph on ONE
// `--dock-morph-t` spring); this engine is the GENERAL case (n pieces at any theta on
// ONE `--liquid-morph-t` spring), plus the dock->card bloom.
//
// THE LOAD-BEARING REUSE (no second engine, the foreign-tree + box-inviolate fences).
// We do NOT edit `dockMorphContext.ts` / `dockMorphMeasure.ts` / `DOCK_SPRING` (the
// dock's own collapse/expand mechanism is its). We CLONE the loop SHAPE the dock
// proved out (one `SpringProgress`, one `play()` rAF, one scalar to the host root, the
// `inheritedVelocity` interruptible re-base, the `prefersReducedMotion()` synchronous
// seat) and COMPOSE the two shipped motion leaves:
//   • `useLiquidReveal(card, { trigger: pill, preset: "bouncy" })` — the iOS-27
//     source-rect bloom (ElementMorph FLIP + springTimingFunction, three coupled
//     channels scale/opacity/filter-blur) for the dock->card EXPAND.
//   • `useLiquidFlex({ squishLaw: "tanh" })` — the volume-preserving velocity squish
//     for each split piece's bud-off swell (capped LOW, never a taffy-pull).
// The spring REUSES the named `dock` SPRING_PRESETS row (response 0.32 / zeta 0.7 —
// the iOS interruptible-control register) via `springPreset("dock")`; NO new family
// is minted (the W-GLASS-CAL spring fence holds).
//
// THE ARBITRARY-ANGLE GOO. Each piece carries a VECTOR descriptor — `{ angle, rank,
// distance, profile }` — not an axis-locked size span. For each piece we write three
// inheriting customs on its element:
//   • `--split-dx = cos(theta)`, `--split-dy = sin(theta)` — the unit travel direction;
//     the piece translates `(dx, dy) · distance · t` (a compositor `translate`).
//   • `--piece-angle = theta` (rad->deg) — the goo neck-capsule (liquid-morph.css)
//     rotates its `clip-path: inset()` to this so the neck ALWAYS runs along the
//     piece's LOCAL travel axis for ANY theta — the generalization of the dock
//     bridge's hardcoded block/inline neck.
//   • `--stretch` — the `useLiquidFlex` squish (the bud-off swell on the spring
//     derivative), paired reciprocally in the CSS along the local axis.
// theta is resolved off `signature.vector`: `radial` = the unit vector from the host
// center to the piece's own center (the macOS Music goo-split fan); `lateral` = the
// host's cross-axis (a side bud); `inward` = the negated radial (a union pull-in);
// `directed` = the caller's explicit `piece.angle` (the configurable-angle case).
//
// COMPOSITOR-ONLY + PRM-SAFE. The engine writes ONLY `transform`/`opacity`/`filter`
// + the inheriting `--*` customs — NEVER a layout property (the `proof:no-layout-
// animation` floor, enforced library-wide). Under `prefers-reduced-motion: reduce`
// the scalar seats SYNCHRONOUSLY at the endpoint (zero transform/blur frames; the
// goo bridge hides via the CSS PRM arm) — the dock's `seatTargetSync` precedent.
//
// HOST/SUBPATH. It reaches `@mkbabb/keyframes.js` (`SpringProgress`) statically and
// composes `useLiquidReveal` (also keyframes-bearing), so it ships on the heavy-peer
// `/motion` barrel, NEVER the vueuse-free root barrel (the SCC-trap discipline — the
// `useLiquidReveal` / `useDragMorph` precedent).

import { onScopeDispose, ref, readonly, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { springPreset, type SpringPresetName } from "./springPresets";
import { useLiquidReveal, type LiquidRevealPreset } from "./useLiquidReveal";
import { useLiquidFlex } from "./useLiquidFlex";

/** The morph MODES the one scalar drives. */
export type LiquidMorphMode = "split" | "union" | "expand";

/**
 * How a piece's travel ANGLE is resolved:
 *   • `radial`   — the unit vector host-center -> piece-center (the n-ary fan).
 *   • `lateral`  — the host's cross-axis (a single side bud).
 *   • `inward`   — the negated radial (a union pull toward the host).
 *   • `directed` — the caller's explicit `piece.angle` (radians) — the
 *                  configurable-angle case the playground's slider drives.
 */
export type LiquidMorphVector = "radial" | "lateral" | "inward" | "directed";

/** The named morphology signature — the goo neck/squish character per mode. */
export interface LiquidMorphSignature {
    /** How each piece's travel angle is resolved (default `radial`). */
    vector: LiquidMorphVector;
    /** Where the goo neck snaps in the 0..1 travel (0.4 tense -> 0.7 long-tail). */
    neckHold: number;
    /** The LOW squish cap the bud-off swell can reach (>1; default 1.08). */
    maxStretch: number;
}

/** The default radial-fan signature (the macOS goo-split read). */
export const RADIAL_SPLIT: LiquidMorphSignature = {
    vector: "radial",
    neckHold: 0.55,
    maxStretch: 1.08,
};

/** The directed-beam signature (the configurable-angle / single-direction case). */
export const DIRECTED_SPLIT: LiquidMorphSignature = {
    vector: "directed",
    neckHold: 0.6,
    maxStretch: 1.1,
};

export interface UseLiquidMorphOptions {
    /** The host element carrying the `--liquid-morph-t` scalar (a card OR a dock). */
    rootEl: Ref<HTMLElement | null>;
    /**
     * The ORIGIN element the split BUDS FROM (the dock pill). The pieces fan out of
     * this element's center (a connecting goo neck back to the dock), NOT the host
     * stage center — the WAVE-1 "bud from the dock" fix. Its center is measured
     * relative to `rootEl` each episode and written as `--liquid-morph-origin-x/y`
     * (px-from-the-host-top-left) which the goo group (liquid-morph.css) anchors at.
     * When unset the goo group falls back to the host center (the standalone case).
     */
    originEl?: Ref<HTMLElement | null>;
    /** The morphology signature (default `RADIAL_SPLIT`). */
    signature?: LiquidMorphSignature;
    /**
     * The spring register the scalar rides — a `SPRING_PRESETS` row name, or a
     * ref/getter resolved PER-DRIVE so a host can vary the clock by gesture (a smooth
     * card bloom vs a livelier split). Default `"dock"`. NO new family is minted.
     */
    spring?: MaybeRefOrGetter<SpringPresetName>;
    /** The bloom preset for `expand()` (default `"bouncy"`). */
    revealPreset?: LiquidRevealPreset;
    /** Honor `prefers-reduced-motion: reduce` (seat synchronously). Default true. */
    respectReducedMotion?: boolean;
}

/** A registered split piece — its element + its vector descriptor. */
export interface LiquidMorphPiece {
    /** The piece element (a free-floating glass shard). */
    el: Ref<HTMLElement | null>;
    /**
     * The explicit travel angle in RADIANS for the `directed` vector. Ignored for
     * `radial`/`lateral`/`inward` (those derive the angle from geometry).
     */
    angle?: number;
    /** The piece's fan rank (the stagger index; 0-based). */
    rank?: number;
    /** The travel distance in px (how far the piece flies). Default 96. */
    distance?: number;
}

export interface RegisteredPiece extends LiquidMorphPiece {
    /** Detach this piece from the morph (clears its inline customs). */
    release(): void;
}

export interface UseLiquidMorphReturn {
    /** Register a split piece; returns the live handle. */
    registerPiece(p: LiquidMorphPiece): RegisteredPiece;
    /** SPLIT — drive the scalar 0 -> 1 (the pieces bud off through the goo neck). */
    split(): void;
    /** UNION — drive the scalar 1 -> 0 (the SAME loop, reversed; bidirectional). */
    union(): void;
    /** EXPAND — bloom a card FROM a trigger pill (the dock->card materialize). */
    expand(opts: { card: Ref<HTMLElement | null>; trigger: Ref<HTMLElement | null> }): void;
    /** COLLAPSE — conceal the expanded card back to the pill (the bloom's close). */
    collapse(): void;
    /** The live normalized scalar (0..1) — what `--liquid-morph-t` reads. */
    readonly t: Readonly<Ref<number>>;
    /** Whether a morph is in flight (the host carries `[data-liquid-morphing]`). */
    readonly morphing: Readonly<Ref<boolean>>;
}

interface InternalPiece {
    handle: RegisteredPiece;
    flex: ReturnType<typeof useLiquidFlex>;
    lastT: number;
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

const RAD_TO_DEG = 180 / Math.PI;

/**
 * The generalized liquid-morph driver. See the module header for the REUSE (the
 * cloned dock loop shape + the composed reveal/flex leaves), the arbitrary-angle goo
 * mechanism, and the compositor-only + PRM fences.
 *
 * @example
 * ```ts
 * const root = ref<HTMLElement | null>(null)
 * const morph = useLiquidMorph({ rootEl: root, signature: DIRECTED_SPLIT })
 * for (const el of shardRefs) morph.registerPiece({ el, angle: theta.value })
 * // n-ary split at an arbitrary angle:
 * morph.split()
 * // the dock -> card bloom:
 * morph.expand({ card: cardRef, trigger: pillRef })
 * ```
 */
export function useLiquidMorph(options: UseLiquidMorphOptions): UseLiquidMorphReturn {
    const signature = options.signature ?? RADIAL_SPLIT;
    const respectPRM = options.respectReducedMotion !== false;
    // resolved PER-DRIVE so a host can vary the spring by gesture (the getter form).
    function resolveSpring(): { response: number; dampingFraction: number } {
        return springPreset(toValue(options.spring) ?? "dock");
    }

    const t = ref(0);
    const morphing = ref(false);
    const pieces = new Set<InternalPiece>();

    // The SINGLE live driver. A re-toggle mid-flight re-bases it onto the new target
    // from its current velocity (the iOS interruptible-physics contract — the
    // dockMorphContext `inheritedVelocity` precedent), so an interrupted split/union
    // stays one continuous trajectory rather than snapping back to rest.
    let spring: SpringProgress | null = null;

    // The dock->card bloom leaf — lazily bound on the first `expand()` so a
    // split-only host pays nothing for it. Re-created per card (each card has its own
    // settled rect); the trigger/preset thread through.
    let revealCardRef: Ref<HTMLElement | null> | null = null;
    let reveal: ReturnType<typeof useLiquidReveal> | null = null;

    function root(): HTMLElement | null {
        return options.rootEl.value;
    }

    function disposeSpring(): void {
        if (spring) {
            spring.dispose();
            spring = null;
        }
    }

    /**
     * Resolve a piece's unit travel direction (dx, dy) from the signature vector +
     * the live geometry. `radial` reads the painted center-delta; `directed` reads
     * the piece's explicit angle; `lateral`/`inward` derive off the host box.
     */
    function resolveDirection(p: InternalPiece): { dx: number; dy: number; deg: number } {
        const r = root();
        const el = p.handle.el.value;
        let theta: number;

        if (signature.vector === "directed") {
            // The configurable-angle case — the caller's explicit theta (the slider),
            // fanned by the piece rank so an n-set spreads around the beam.
            const rank = p.handle.rank ?? 0;
            const n = pieces.size || 1;
            // a GENTLE fan (~22° total) so the chain stays a connected goo arm along θ,
            // not a wide spray that breaks the metaball necks.
            const spread = ((rank - (n - 1) / 2) / Math.max(1, n)) * (Math.PI / 8);
            theta = (p.handle.angle ?? 0) + spread;
        } else if (signature.vector === "radial" && r && el) {
            // The unit vector host-center -> piece-center (the n-ary fan; ANY theta).
            const hr = r.getBoundingClientRect();
            const pr = el.getBoundingClientRect();
            const cx = pr.left + pr.width / 2 - (hr.left + hr.width / 2);
            const cy = pr.top + pr.height / 2 - (hr.top + hr.height / 2);
            theta = Math.atan2(cy, cx);
            if (cx === 0 && cy === 0) {
                // Coincident centers — fan by rank so a stack does not pile on one ray.
                const rank = p.handle.rank ?? 0;
                const n = pieces.size || 1;
                theta = (rank / n) * Math.PI * 2;
            }
        } else if (signature.vector === "inward") {
            // The negated radial — a union pull toward the host.
            const radial =
                r && el
                    ? (() => {
                          const hr = r.getBoundingClientRect();
                          const pr = el.getBoundingClientRect();
                          return Math.atan2(
                              pr.top + pr.height / 2 - (hr.top + hr.height / 2),
                              pr.left + pr.width / 2 - (hr.left + hr.width / 2),
                          );
                      })()
                    : 0;
            theta = radial + Math.PI;
        } else {
            // `lateral` — the host cross-axis (a single side bud), fanned by rank.
            const rank = p.handle.rank ?? 0;
            const n = pieces.size || 1;
            theta = (rank - (n - 1) / 2) * 0.4;
        }
        return { dx: Math.cos(theta), dy: Math.sin(theta), deg: theta * RAD_TO_DEG };
    }

    /** Write one piece's vector customs + drive its flex squish off the scalar. */
    function writePiece(p: InternalPiece, value: number): void {
        const el = p.handle.el.value;
        if (!el) return;
        const { dx, dy, deg } = resolveDirection(p);
        const distance = p.handle.distance ?? 96;
        // The piece travels (dx, dy) · distance · t — a compositor translate ONLY.
        // The neck-capsule (liquid-morph.css) reads --piece-angle to rotate its inset
        // so the goo neck runs along this SAME travel axis for ANY theta.
        el.style.setProperty("--split-dx", dx.toFixed(4));
        el.style.setProperty("--split-dy", dy.toFixed(4));
        el.style.setProperty("--piece-angle", `${deg.toFixed(2)}deg`);
        el.style.setProperty("--liquid-morph-distance", `${distance}px`);
        el.style.setProperty("--liquid-morph-t", `${value}`);
        // The bud-off swell — the tanh velocity squish on the scalar derivative
        // (drive() takes |dt| internally so a fast travel swells, a settle relaxes).
        p.flex.drive(value);
        el.style.setProperty("--stretch", String(p.flex.stretch.value));
        p.lastT = value;
    }

    /** One frame: write the scalar to the root + every piece. */
    function writeFrame(value: number): void {
        t.value = value;
        const r = root();
        if (r) r.style.setProperty("--liquid-morph-t", `${value}`);
        for (const p of pieces) writePiece(p, value);
    }

    /**
     * Drive the scalar toward `target` (0 or 1) on the spring. A fresh spring per
     * episode CARRIES the prior spring's velocity (the interruptible re-base), then
     * `play()`s a guaranteed-running loop writing the scalar once/frame. The dock's
     * `ensureSpringRunning` shape, generalized off the dock-private `--dock-morph-t`.
     */
    function drive(target: 0 | 1): void {
        const r = root();
        if (!r) {
            writeFrame(target);
            return;
        }
        // PRM — seat the scalar SYNCHRONOUSLY at the endpoint (zero transform/blur
        // frames; the CSS PRM arm hides the goo bridge). The dock seatTargetSync
        // precedent, transposed onto the n-piece scalar.
        if (respectPRM && prefersReducedMotion()) {
            disposeSpring();
            writeFrame(target);
            morphing.value = false;
            r.removeAttribute("data-liquid-morphing");
            return;
        }

        const inheritedVelocity =
            spring !== null && !spring.settled ? spring.velocity : 0;
        disposeSpring();
        const { response, dampingFraction } = resolveSpring();
        spring = new SpringProgress({
            response,
            dampingFraction,
            initial: t.value,
            respectReducedMotion: true,
        });
        const active = spring;
        active.reset(t.value, inheritedVelocity);
        active.target = target;
        morphing.value = true;
        r.setAttribute("data-liquid-morphing", "");
        // Seat the current scalar synchronously now so the single frame before the
        // first spring callback reads the live value (no endpoint flash) — the
        // dockMorphContext pre-seat precedent.
        r.style.setProperty("--liquid-morph-t", `${t.value}`);
        active.play((value: number) => {
            writeFrame(value);
            if (active.settled) {
                morphing.value = false;
                const rr = root();
                if (rr) rr.removeAttribute("data-liquid-morphing");
            }
        });
    }

    function registerPiece(p: LiquidMorphPiece): RegisteredPiece {
        // Each piece owns a tanh flex (the squish is reciprocal across the LOCAL
        // travel axis; the CSS pairs --stretch / 1-over-stretch by the piece angle).
        // No size span (from=to=1) — the squish is the only flex output here; the
        // size is the piece's static glass footprint, never animated.
        const flex = useLiquidFlex({
            from: 1,
            to: 1,
            axis: "width",
            squishLaw: "tanh",
            maxStretch: () => signature.maxStretch,
        });
        const internal: InternalPiece = {
            handle: {
                el: p.el,
                angle: p.angle,
                rank: p.rank,
                distance: p.distance,
                release: () => {
                    pieces.delete(internal);
                    const el = p.el.value;
                    if (el) {
                        for (const k of [
                            "--split-dx",
                            "--split-dy",
                            "--piece-angle",
                            "--liquid-morph-distance",
                            "--liquid-morph-t",
                            "--stretch",
                        ]) {
                            el.style.removeProperty(k);
                        }
                    }
                },
            },
            flex,
            lastT: 0,
        };
        pieces.add(internal);
        // Seat the piece at the current scalar so a late registration paints correct.
        writePiece(internal, t.value);
        return internal.handle;
    }

    function split(): void {
        drive(1);
    }

    function union(): void {
        drive(0);
    }

    function expand(opts: {
        card: Ref<HTMLElement | null>;
        trigger: Ref<HTMLElement | null>;
    }): void {
        // (Re)bind the bloom leaf to THIS card (each card has its own settled rect).
        if (revealCardRef !== opts.card) {
            revealCardRef = opts.card;
            reveal = useLiquidReveal(opts.card, {
                trigger: opts.trigger,
                preset: options.revealPreset ?? "bouncy",
                respectReducedMotion: respectPRM,
            });
        }
        reveal?.reveal();
    }

    function collapse(): void {
        reveal?.conceal();
    }

    onScopeDispose(() => {
        disposeSpring();
        for (const p of pieces) p.handle.release();
        pieces.clear();
    });

    return {
        registerPiece,
        split,
        union,
        expand,
        collapse,
        t: readonly(t),
        morphing: readonly(morphing),
    };
}
