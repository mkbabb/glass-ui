// BD.W-GOO-BARBELL-NECK — useGooMorph: the ONE goo-morph engine, RE-INVENTED from the
// single-worm projection to the BARBELL. A metaball merge is, definitionally, TWO round
// bodies and the bridge between them; the prior single full-height plate stretching on
// scaleX could only fatten into a rounded rectangle (a warm TRAY with one scalloped edge
// — no geometry that can produce a WAIST). This engine projects THREE coordinated
// transforms per frame: two round warm-cream BODIES (`D = restSize/φ`) travelling
// apart-then-together + a SEPARATE NECK whose girth WELLS on `--goo-t` and whose
// `clip-path` carves a smooth concave waist — welded by the static `#glass-goo` filter
// into one warm silhouette WITH A REAL LOCAL-MINIMUM WAIST.
//
// THE BINDING BAR (the user, "remember this always" / the carousel feedback): the
// transition GOO-MORPHS blob↔meatball — two bodies bud apart, a concave NECK wells up
// across the gap, the filter merges them into one liquid silhouette with a thin pinched
// waist, then the bodies coalesce + SNAP. A decisive blob↔meatball, NOT a tray.
//
// THE MECHANISM (the barbell projection, compositor-only). Three child elements reserve a
// resting footprint ONCE; every per-frame paint is `transform: translate/scale` +
// `clip-path` (the neck) — NEVER an animated width/height (motion-canon P5 /
// proof:no-layout-animation). `p` = normalized progress over the FULL A→B travel:
//   sep(p)      = 1 − bell(p,1)·(1 − NECK_GAP)   // 1 at the slots → NECK_GAP at mid
//   mid         = (A + B) / 2 ; half = (B − A)/2 · sep(p)
//   cA = mid − half ; cB = mid + half             // bodies travel apart-then-together
//   bell(p,k)   = sin(π·p)^k                       // 0 at ends, peak mid (the well)
//   neckGirth(p)= bell(p,1.5)                       // wells, peaks mid, ~0 at the ends
// The neck `scaleX(gap/D) scaleY(neckGirth)` + the concave `--neck-waist` throat read as a
// structural hourglass on BOTH engines BEFORE the filter even fuses it (the Safari
// insurance — the waist is geometry, not a filter nuance reading identically).
//
// THE SPRING DRIVE (no heavy peer — root-barrel-safe). `--goo-t` is a Houdini
// `@property <number>` (tokens/property-regs.css, ONE shared registration) transitioned on
// a `--{tokenPrefix}-flow` `linear()` dwell curve (the overshoot IS the bounce; the
// duration IS the weight). A short rAF READS the interpolated `--goo-t` each frame +
// writes the derived three-element barbell — so the neck genuinely WELLS at the midpoint
// (the local-minimum waist) then PINCHES. The transition owns the physics; rAF only
// samples + projects. NO SpringProgress, NO keyframes import.
//
// PRM (motion-canon P6): the barbell coalesces to ONE resting body at the target center;
// bodyB + the neck hide (display:none on the layer in CSS), zero squish, no rAF, no
// overshoot. The terminal `placeStatic(to)` is the resting authority (one body, no neck).

import { onScopeDispose, type Ref } from "vue";
import { useLiquidFlex } from "./useLiquidFlex";

/**
 * The three barbell silhouette elements the engine projects per frame. NOT
 * `morph.children[i]` index-reaching (the fragile KISS-violating path) — three EXPLICIT
 * refs the consumer renders + binds.
 */
export interface GooBarbellRefs {
    /** The trailing round body (the OUTGOING droplet). */
    bodyARef: Ref<HTMLElement | null>;
    /** The leading round body (the INCOMING droplet). */
    bodyBRef: Ref<HTMLElement | null>;
    /** The welling concave-throat neck between the two bodies. */
    neckRef: Ref<HTMLElement | null>;
}

export interface UseGooMorphParams {
    /**
     * The barbell silhouette refs — two round bodies + a welling concave neck. The engine
     * writes their three transforms each frame (the merge needs ≥2 masses; the neck is the
     * bridge). NO single-element `morphRef` — the barbell IS the morph.
     */
    barbellRefs: GooBarbellRefs;
    /** The geometry origin + the `--goo-t` transition host (the rail/track root). */
    hostRef: Ref<HTMLElement | null>;
    /** Travel axis. `false` → horizontal (translateX), `true` → vertical (translateY). */
    vertical: Ref<boolean>;
    /**
     * Live center reader: the on-axis center (px, relative to the host content box)
     * of slot `i`, on the travel axis. MEASURED off the live DOM (windowFit-correct,
     * both axes) — never a hardcoded pitch.
     */
    centerOf: (i: number) => number | null;
    /**
     * The resting slot pitch (px) on the travel axis. The barbell body diameter is the
     * golden-minor `D = restSize()/φ` (a BLOB, not a plate) — so the consumer passes the
     * slot STEP, not a pre-shrunk body size.
     */
    restSize: () => number;
    /**
     * The token prefix for the flow/duration/max-stretch reads. Default `"pager-worm"`
     * (the dot-pip register). The carousel passes `"carousel-goo"`; the deck `"deck-goo"`
     * — each reads its OWN `--{prefix}-flow`/`-duration`/`-max-stretch` so a card-scale
     * barbell dwells/swells at its own scale, the dot at its own. ONE engine, per-consumer
     * tokens (the no-new-spring fence — they all resolve `--spring-*`-derived `linear()`).
     */
    tokenPrefix?: string;
    /**
     * The neck-gap fraction — how near the two bodies draw at the midpoint (sep's floor:
     * 1 at the slots → `neckGap` at mid). Lower = the bodies near closer → a tighter,
     * gooier waist. Default 0.78 (carousel). Pager 0.7, deck 0.85. (= `--{prefix}-neck-gap`
     * if the consumer prefers a token; the param is the engine default.)
     */
    neckGap?: number;
}

export interface UseGooMorphReturn {
    /**
     * Travel the barbell from `from` to `to` (slot indices). Sets the `--goo-t`
     * transition target (the spring glides it) and runs a short rAF that projects the
     * interpolated scalar onto the three-element barbell each frame. PRM → instant snap to
     * ONE resting body, no squish.
     */
    travel(from: number, to: number): void;
    /** Snap the barbell to ONE resting body on `index` immediately (first paint / resize / PRM). */
    snap(index: number): void;
    /**
     * Drag-driven continuous drive: set `--goo-t` DIRECTLY to a fractional slot position
     * (the live drag scrollProgress, e.g. embla's `scrollProgress()*lastIndex`) with NO
     * transition, and project the barbell for it. The neck wells with the live drag; call
     * `travel()` on the snap to glide the release. PRM → snap.
     */
    drive(fractionalIndex: number): void;
}

/** The golden ratio — the body diameter is the golden-minor of the slot pitch. */
const PHI = 1.618033988749895;

const PRM = (): boolean =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Read a `--{prefix}-duration` token (s/ms) off an element → ms. */
function clockMs(el: HTMLElement, prop: string, fallback: number): number {
    const raw = getComputedStyle(el).getPropertyValue(prop).trim();
    if (!raw) return fallback;
    if (raw.endsWith("ms")) return Number.parseFloat(raw) || fallback;
    if (raw.endsWith("s")) return (Number.parseFloat(raw) || fallback / 1000) * 1000;
    return Number.parseFloat(raw) || fallback;
}

/** sin(π·p)^k — 0 at the ends, peak at the midpoint. The well shape. */
function bell(p: number, k: number): number {
    const s = Math.sin(Math.PI * Math.min(1, Math.max(0, p)));
    return Math.pow(s, k);
}

export function useGooMorph(params: UseGooMorphParams): UseGooMorphReturn {
    const {
        barbellRefs,
        hostRef,
        vertical,
        centerOf,
        restSize,
        tokenPrefix = "pager-worm",
        neckGap = 0.78,
    } = params;
    const { bodyARef, bodyBRef, neckRef } = barbellRefs;

    const flowVar = `--${tokenPrefix}-flow`;
    const durVar = `--${tokenPrefix}-duration`;
    const stretchVar = `--${tokenPrefix}-max-stretch`;

    // The squish is the ONE shared engine (useLiquidFlex, "linear" law, LOW cap read
    // live off the per-consumer max-stretch token) — the SegmentedTabs indicator
    // register. We own NO second tanh/reciprocal write. The bodies squash-&-stretch
    // on-axis toward the neck via this `--stretch`.
    const liquidSquish = useLiquidFlex({
        from: 0,
        to: 0,
        axis: "width", // squish-only; the bodies travel via transform, not a size span
        squishLaw: "linear",
        maxStretch: () => {
            const el = hostRef.value;
            if (!el) return 1.4;
            const raw = getComputedStyle(el).getPropertyValue(stretchVar).trim();
            return Number(raw) || 1.4;
        },
    });

    let rafId = 0;
    let releaseTimer: ReturnType<typeof setTimeout> | null = null;

    function stop(): void {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
        if (releaseTimer) {
            clearTimeout(releaseTimer);
            releaseTimer = null;
        }
    }

    /** Read the live interpolated `--goo-t` off the host (the transitioned scalar). */
    function readGooT(host: HTMLElement): number {
        const raw = getComputedStyle(host).getPropertyValue("--goo-t").trim();
        return Number.parseFloat(raw) || 0;
    }

    /** Read the neck-gap (the consumer may override `--{prefix}-neck-gap`; else the param). */
    function readNeckGap(host: HTMLElement): number {
        const raw = getComputedStyle(host)
            .getPropertyValue(`--${tokenPrefix}-neck-gap`)
            .trim();
        const v = Number.parseFloat(raw);
        return Number.isFinite(v) && v > 0 ? v : neckGap;
    }

    /** Compose a body transform on the travel axis: translate(center) → -50% → scale + the
     *  on-axis squash-&-stretch reciprocal (volume-preserving). `el` is sized to the body
     *  diameter D, so no scale-to-fit is needed; the squash is the `--stretch` taffy. The
     *  `arc` lobs the body centre on the CROSS axis (overlapping action). */
    function writeBody(
        el: HTMLElement,
        center: number,
        arc: number,
        stretchOn: number,
        stretchCross: number,
    ): void {
        if (vertical.value) {
            el.style.transform =
                `translateY(${center.toFixed(2)}px) translateX(${arc.toFixed(2)}px) ` +
                `translateY(-50%) translateX(-50%) ` +
                `scaleY(${stretchOn.toFixed(4)}) scaleX(${stretchCross.toFixed(4)})`;
        } else {
            el.style.transform =
                `translateX(${center.toFixed(2)}px) translateY(${arc.toFixed(2)}px) ` +
                `translateX(-50%) translateY(-50%) ` +
                `scaleX(${stretchOn.toFixed(4)}) scaleY(${stretchCross.toFixed(4)})`;
        }
    }

    /**
     * Project the BARBELL for the in-flight scalar `gooT` ∈ [from,to]. `A`/`B` are the
     * measured slot centers; `restSize()` the slot pitch. Writes bodyA, bodyB, and the
     * welling concave neck. `p` is the NORMALIZED progress over the WHOLE from→to travel
     * (a multi-gap morph spans p∈[0,1] over the full span, so the barbell necks across the
     * BIG gap on the SAME slow flow curve).
     */
    function paint(
        A: number,
        B: number,
        fromIdx: number,
        toIdx: number,
        gooT: number,
    ): void {
        const bodyA = bodyARef.value;
        const bodyB = bodyBRef.value;
        const neck = neckRef.value;
        const host = hostRef.value;
        if (!bodyA || !bodyB || !neck || !host) return;

        const step = Math.max(1, restSize());
        const D = step / PHI; // the body diameter — the golden-minor of the slot pitch
        const span = B - A;

        const idxSpan = toIdx - fromIdx;
        const p =
            idxSpan === 0
                ? 1
                : Math.min(1, Math.max(0, (gooT - fromIdx) / idxSpan));

        const NECK_GAP = readNeckGap(host);
        const sep = 1 - bell(p, 1) * (1 - NECK_GAP); // 1 at slots → NECK_GAP at mid
        const mid = (A + B) / 2;
        const half = (span / 2) * sep;
        const cA = mid - half; // bodyA travels toward mid then on
        const cB = mid + half;

        const neckGirth = bell(p, 1.5); // wells → pinches, ~0 at the ends
        const gap = Math.abs(cB - cA); // the live centre-to-centre gap

        // the cartoon-weight lever (0 under PRM/auto — CSS owns the carve; here we read it
        // so the arc + the body squash scale with the consumer weight).
        const weightRaw = getComputedStyle(host)
            .getPropertyValue("--goo-weight")
            .trim();
        const weight = Math.min(1, Math.max(0, Number.parseFloat(weightRaw) || 0));

        // the on-axis squash-&-stretch toward the neck (the `--stretch` velocity swell
        // lives in CSS; here the bodies elongate on-axis as they neck — necking taffy).
        const stretchOn = 1 + bell(p, 1) * 0.12 * weight;
        const stretchCross = 1 / stretchOn; // volume-preserving

        // the arc (overlapping action) — the body centres lob a subtle cross-axis parabola
        // so the merge LOBS, not a flat slide. ±D·0.06·sin(πp), weight-scaled, PRM→0.
        const arc = -D * 0.06 * bell(p, 1) * weight;

        writeBody(bodyA, cA, arc, stretchOn, stretchCross);
        writeBody(bodyB, cB, arc, stretchOn, stretchCross);

        // the NECK — translate(mid), scaleX(gap/D) on-axis so it spans the live gap,
        // scaleY(neckGirth) cross-axis so it WELLS then PINCHES (~0 at the ends → the neck
        // vanishes at rest, no ghost throat). The concave `--neck-waist` clip-path (set in
        // CSS) carves the structural hourglass; the filter softens + welds it. transform
        // composes the on-axis span + the cross-axis well.
        const neckSpanScale = D > 0 ? gap / D : 1;
        if (vertical.value) {
            neck.style.transform =
                `translateY(${mid.toFixed(2)}px) translateY(-50%) ` +
                `scaleY(${neckSpanScale.toFixed(4)}) scaleX(${neckGirth.toFixed(4)})`;
        } else {
            neck.style.transform =
                `translateX(${mid.toFixed(2)}px) translateX(-50%) ` +
                `scaleX(${neckSpanScale.toFixed(4)}) scaleY(${neckGirth.toFixed(4)})`;
        }
        // the dwell-follows-the-neck opacity gate: the neck is visible EXACTLY while it
        // wells (fades in as neckGirth crosses ~0, out as it returns). The consumer's layer
        // [data-traveling] gate fades the whole layer; this gates the NECK alpha within it.
        neck.style.opacity = neckGirth.toFixed(4);
        host.style.setProperty("--goo-neck-girth", neckGirth.toFixed(4));
    }

    /** Coalesce the barbell to ONE resting body at the target center; hide the neck (no
     *  ghost throat) + park bodyB ON bodyA so a stray frame never shows a second mass. */
    function placeStatic(index: number): void {
        const bodyA = bodyARef.value;
        const bodyB = bodyBRef.value;
        const neck = neckRef.value;
        const host = hostRef.value;
        const c = centerOf(index);
        if (!bodyA || !bodyB || !neck || c == null) return;
        writeBody(bodyA, c, 0, 1, 1);
        writeBody(bodyB, c, 0, 1, 1); // coalesced ON bodyA — ONE resting mass
        neck.style.opacity = "0"; // no ghost throat at rest
        if (vertical.value) {
            neck.style.transform = `translateY(${c.toFixed(2)}px) translateY(-50%) scaleY(0.0001) scaleX(0)`;
        } else {
            neck.style.transform = `translateX(${c.toFixed(2)}px) translateX(-50%) scaleX(0.0001) scaleY(0)`;
        }
        if (host) {
            host.style.setProperty("--goo-neck-girth", "0");
            host.style.setProperty("--stretch", "1");
        }
    }

    function snap(index: number): void {
        stop();
        const host = hostRef.value;
        if (host) {
            // park the scalar on the index with NO transition (instant)
            const prev = host.style.transition;
            host.style.transition = "none";
            host.style.setProperty("--goo-t", String(index));
            // force a reflow so the no-transition write commits before re-enabling
            void host.offsetWidth;
            host.style.transition = prev;
        }
        placeStatic(index);
    }

    /**
     * Drag-driven continuous drive — set `--goo-t` directly (no transition) to a
     * fractional slot position + project the barbell, so the neck wells with the live
     * drag. The release glide is `travel()`. PRM → instant snap.
     */
    function drive(fractionalIndex: number): void {
        const host = hostRef.value;
        if (!host || !bodyARef.value) return;
        if (PRM()) return;
        stop();
        const prev = host.style.transition;
        host.style.transition = "none";
        host.style.setProperty("--goo-t", String(fractionalIndex));
        void host.offsetWidth;
        host.style.transition = prev;
        const from = Math.floor(fractionalIndex);
        const to = Math.ceil(fractionalIndex);
        const A = centerOf(from);
        const B = centerOf(to);
        if (A == null || B == null) return;
        paint(A, B, from, to, fractionalIndex);
    }

    function travel(from: number, to: number): void {
        const host = hostRef.value;
        if (!bodyARef.value || !host || from === to) {
            if (host) snap(to);
            return;
        }

        if (PRM()) {
            // P6 — coalesce to one body, no squish, no rAF, no neck frames.
            snap(to);
            return;
        }

        const A = centerOf(from);
        const B = centerOf(to);
        if (A == null || B == null) {
            snap(to);
            return;
        }

        stop();

        // ── the squish (release-at-arrival, the useTabIndicator shape) ──
        // travel FRACTION = |B−A| / host extent (geometry-relative, the tab law),
        // FLOORED so even a SINGLE step swells visibly.
        const hostExtent = vertical.value
            ? host.offsetHeight || 1
            : host.offsetWidth || 1;
        const SQUISH_FLOOR = 0.5;
        const rawFrac = Math.min(Math.abs(B - A) / Math.max(1, hostExtent), 1);
        const frac = Math.max(SQUISH_FLOOR, rawFrac);
        liquidSquish.squish(frac);
        host.style.setProperty("--stretch", String(liquidSquish.stretch.value));

        // ── the FLOW drive: glide --goo-t from→to on the SLOW {prefix}-flow linear() ──
        const durMs = clockMs(host, durVar, 1800);
        const spring =
            getComputedStyle(host).getPropertyValue(flowVar).trim() || "ease-in-out";
        // 1. commit the FROM value with NO transition + force a reflow (the no-race seam).
        host.style.transition = "none";
        host.style.setProperty("--goo-t", String(from));
        void host.offsetWidth; // commit the FROM
        // 2. arm the transition + set TO in the SAME synchronous write — the engine now
        //    interpolates --goo-t from→to on the linear() flow curve.
        host.style.transition = `--goo-t ${durMs}ms ${spring}`;
        host.style.setProperty("--goo-t", String(to));

        // release the stretch AT arrival (the peak reads DURING travel, the shrink
        // punctuates land).
        const RELEASE_AT_ARRIVAL = 0.82;
        releaseTimer = setTimeout(() => {
            liquidSquish.squish(0);
            host.style.setProperty("--stretch", String(liquidSquish.stretch.value));
            releaseTimer = null;
        }, durMs * RELEASE_AT_ARRIVAL);

        // ── the rAF projection: read the live --goo-t, paint the barbell ──
        const start = performance.now();
        const tick = (): void => {
            const gooT = readGooT(host);
            paint(A, B, from, to, gooT);
            const elapsed = performance.now() - start;
            // run a hair past the clock so the spring's overshoot tail settles, then
            // coalesce dead-on the target center (kills any sub-px residual + the neck).
            if (elapsed < durMs + 80) {
                rafId = requestAnimationFrame(tick);
            } else {
                rafId = 0;
                placeStatic(to);
            }
        };
        rafId = requestAnimationFrame(tick);
    }

    onScopeDispose(stop);

    return { travel, snap, drive };
}
