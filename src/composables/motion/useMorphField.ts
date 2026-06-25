// BD.W-MORPH-FIELD-WELD — useMorphField: the ONE blend/morph WELD primitive every
// morph animation in the library consumes.
//
// THE TWO ATOMS (the KISS read the delta-assay proved). Strip the coats off the dozen
// morph forks and each is a composition of exactly two atoms:
//   (A) a SCALAR DRIVE — a 0→1 progress on a spring written to a registered @property
//       (--goo-t / --dock-morph-t / --neck-t — the consumer ALREADY owns it);
//   (B) a FIELD WELD — given N convex masses + a concave neck, a blur→threshold (Tier-S
//       SVG filter) / a clip-path hourglass (Tier-C) / an analytic smin (Tier-G) fuses
//       them into ONE continuous liquid silhouette with a real LOCAL-MINIMUM waist.
// This file is atom (B) — the WELD layer ONLY. It does NOT mint a spring, does NOT
// rename a drive scalar, does NOT own the travel. It READS whatever drive scalar the
// consumer passes (`driveVar`), projects the N bodies + the welling neck per frame, and
// resolves a render TIER from caps. The consumer's existing rAF/spring stays the DRIVE.
//
// THE GAP-FRACTION k (the scale-blind-threshold fix — the user's "carousel goo is awful"
// + the 296px→dot defect). The Tier-S threshold band is NOT a px literal; it is a
// FRACTION of the live centre-to-centre gap: `k(t) = lerp(kRest, kPeak, bell(t)) ·
// gap(t)`. So the weld bridges at the neck peak at ANY scale — a dot-pip and a 332px
// dock arm both neck correctly off the SAME signature. The neck girth wells (bell) then
// pinches; the masses LOB on a parabola through the midpoint (arc) so the merge never
// slides flat. The silhouette holds a true concave waist BEFORE any filter (Tier-C
// insurance, both engines).
//
// THE SIGNATURE is DATA, not code paths. MORPH_SIGNATURES is a motion-named map
// (lateralNeck / lateralPeel / radialBurst / inwardMerge / axialNeck / directed) — never
// an app name (the dock-hub law). One weld reads the row; one recipe (morph-field.css)
// paints whatever the masses carry.
//
// THE DRIVE COMPOSE (the keystone reconcile — no eighth fork, no phantom). The dock
// signatures (collapse / axialNeck) COMPOSE the SHIPPED --dock-morph-t drive; the goo
// (lateralNeck) composes --goo-t; the fission (lateralPeel / radialBurst) composes
// --neck-t. The ONLY case needing arbitrary-rect element→element travel is
// `silhouette:'capture'` (inwardMerge of two captured outlines) — it composes the FLIP
// runner `useElementBloom`. That runner is NOT YET in src/ this tranche, so the capture
// path is HARD-GUARDED OUT: a `silhouette:'capture'` body throws unless the runner
// exists. The engine is fully buildable for ~95% of morphs (every non-capture body)
// without it — the assert is `exists(useElementBloom) || !usesCapture`.
//
// ROOT-BARREL SAFE — this leaf underlies the root-exported `useGooMorph`, so it composes
// `vue` + `useLiquidFlex` ONLY (no keyframes.js, no vueuse). The DRIVE that DOES bear
// keyframes.js stays in the consumer (the spring lives there); the weld only projects.
//
// PRM (motion-canon P6): a `seat(t)` call writes the endpoint silhouette with ZERO neck
// frames + --stretch 1; the consumer's PRM branch calls it. The squish/arc/overshoot all
// scale by `--motion-weight` (read live off the host) so a single weight→0 zeroes them.

import { onScopeDispose, unref, type MaybeRef, type Ref } from "vue";
import { useLiquidFlex } from "./useLiquidFlex";

/** The golden ratio — the body diameter is the golden-minor of the slot pitch; the
 *  overshoot share is 1/φ; the arc is 1/φ². Aristotelian proportion throughout. */
const PHI = 1.618033988749895;

/** The five motion VECTORS a signature selects (geometry/motion, never an app name). */
export type MorphVector = "lateral" | "radial" | "inward" | "axial" | "directed";

/** The render TIER a morph resolves to (the caps ladder). */
export type MorphTier = "css" | "svg-goo" | "gpu";

/** The silhouette a body presents. `capture` = sample its clip-path → SDF (Tier-G, the
 *  arbitrary-outline element→element morph — HARD-gated on useElementBloom). */
export type MorphSilhouette = "circle" | "squircle" | "capture";

/** A measured rectangle (the body endpoints; left/top/width/height in host-local px). */
export interface MorphFieldRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * The motion SIGNATURE — DATA, the only thing that distinguishes the morphs. `vector`
 * picks the geometry; `kRest`/`kPeak` are gap-FRACTIONS (not px) the threshold band
 * scales by; `neckHold` is how long the neck holds before it pinches; `maxStretch` the
 * LOW squish cap (the anti-taffy fence).
 */
export interface MorphSignature {
    vector: MorphVector;
    /** The neck-gap fraction at REST (bodies apart) — the threshold band floor. */
    kRest: number;
    /** The neck-gap fraction at the PEAK (bodies near, the gooey waist) — the band ceiling. */
    kPeak: number;
    /** How long (0..1 of t) the neck HOLDS its girth before it pinches (the tense pop). */
    neckHold: number;
    /** The LOW on-axis squish cap (≤~1.14 — the loud register lives in NECK girth, not body taffy). */
    maxStretch: number;
}

/**
 * The canonical, motion-named SIGNATURE map (DATA — F3, the FLOOR). Every consumer
 * passes a `MorphSignatureName`; one weld reads the row; one recipe paints it. NO app
 * names, NO three code paths.
 */
export const MORPH_SIGNATURES = {
    /** carousel / deck / pager goo: two equal beads bud apart, a concave neck wells, the
     *  filter merges them into one barbell with a thin pinched waist, then they coalesce. */
    lateralNeck: {
        vector: "lateral",
        kRest: 0.92,
        kPeak: 0.34,
        neckHold: 0.5,
        maxStretch: 1.12,
    },
    /** dock fission media: the now-playing anchor stays; flanking transport PEELS along
     *  the cross axis with a long tapering neck tail. */
    lateralPeel: {
        vector: "lateral",
        kRest: 0.88,
        kPeak: 0.4,
        neckHold: 0.4,
        maxStretch: 1.08,
    },
    /** dock fission search: controls fly outward like a bloom; the neck NECKS LATE (the
     *  tense radial pop), innermost-first — an outward ripple, not a simultaneous scatter. */
    radialBurst: {
        vector: "radial",
        kRest: 0.85,
        kPeak: 0.3,
        neckHold: 0.55,
        maxStretch: 1.08,
    },
    /** dock fission nav: the negative radial — N masses collapse INWARD to ONE; the bridge
     *  runs backward; --stretch peaks at coalescence. */
    inwardMerge: {
        vector: "inward",
        kRest: 0.8,
        kPeak: 0.28,
        neckHold: 0.35,
        maxStretch: 1.1,
    },
    /** dock V↔H: column-mass + row-mass are two distributions in ONE topology-free field;
     *  a gooey teardrop LOBS column→row through the midpoint (no crossfade dodge). */
    axialNeck: {
        vector: "axial",
        kRest: 0.9,
        kPeak: 0.36,
        neckHold: 0.5,
        maxStretch: 1.14,
    },
    /** dock collapse: the DEGENERATE 1-body field — a single mass squishes between two
     *  footprints (no waist, Tier-C). The ratio-free convex blend. */
    collapse: {
        vector: "axial",
        kRest: 1,
        kPeak: 1,
        neckHold: 0,
        maxStretch: 1.14,
    },
    /** drag morph: a grabbed rect → drop rect, an optional directed neck. */
    directed: {
        vector: "directed",
        kRest: 0.9,
        kPeak: 0.42,
        neckHold: 0.45,
        maxStretch: 1.1,
    },
} as const satisfies Record<string, MorphSignature>;

export type MorphSignatureName = keyof typeof MORPH_SIGNATURES;

/** A warm "body" the field welds — a measured endpoint pair + an optional silhouette. */
export interface BodySpec {
    /** The DOM node this body IS (the weld writes its transform). */
    el: Ref<HTMLElement | null>;
    /** The body's REST rect (t=0), measured ONCE (dock-core: no per-frame measure). */
    at0: () => MorphFieldRect;
    /** The body's TARGET rect (t=1), measured ONCE. */
    at1: () => MorphFieldRect;
    /** The body diameter (px). Default `min(width,height)/φ` — a golden-minor BLOB. */
    radius?: () => number;
    /** circle (default) / squircle / capture (arbitrary outline → Tier-G, HARD-gated). */
    silhouette?: MorphSilhouette;
}

export interface MorphFieldOptions {
    /** 1..N warm masses. 1 body = collapse (no weld); 2 = a neck; (1+N) = fission. */
    bodies: MaybeRef<BodySpec[]>;
    /** The motion signature NAME (DATA). The weld reads its row from MORPH_SIGNATURES. */
    signature: MorphSignatureName;
    /**
     * The EXISTING drive scalar this weld READS off the host (NO rename). Default
     * `--goo-t`; dock passes `--dock-morph-t`, fission `--neck-t`. The consumer's
     * spring/rAF writes it; the weld only samples + projects.
     */
    driveVar?: string;
    /** The host the drive scalar + the dedicated squish channel are read/written on. */
    hostRef: Ref<HTMLElement | null>;
    /** The cartoon-weight scalar source. Read live off the host `--motion-weight` if absent. */
    weight?: MaybeRef<number>;
    /** The render tier. `auto` (default) resolves from caps + body count + signature. */
    tier?: MorphTier | "auto";
    /** Travel axis for the neck span. `false` (default) horizontal, `true` vertical. */
    vertical?: MaybeRef<boolean>;
}

export interface MorphFieldHandle {
    /** Mirror of the consumer's drive scalar (last sampled). Read-only. */
    readonly t: Readonly<Ref<number>>;
    /** The neck waist FRACTION (waist/body) at the current frame — for π readback. */
    readonly waist: Readonly<Ref<number>>;
    /** The resolved render tier. */
    readonly tier: Readonly<Ref<MorphTier>>;
    /**
     * PROJECT the field for an explicit drive value `t` (0..1). Reads the masses'
     * measured endpoints + the signature, writes each body's transform + the welling
     * neck + the dedicated squish channel + the live waist. The consumer calls this from
     * its OWN rAF/spring callback (the weld owns no clock).
     */
    project(t: number): void;
    /**
     * SEAT the endpoint silhouette at `t` with ZERO neck frames (the PRM cut / first
     * paint). One resting mass at the endpoint, neck hidden, --stretch 1. The consumer's
     * PRM branch calls this.
     */
    seat(t: number): void;
}

import { ref, computed } from "vue";

const PRM = (): boolean =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SUPPORTS_FILTER =
    typeof window === "undefined" ||
    typeof CSS === "undefined" ||
    typeof CSS.supports !== "function" ||
    CSS.supports("filter", "url(#x)");

/** sin(π·t)^k — 0 at the ends, peak at the midpoint. The well shape. */
function bell(t: number, k: number): number {
    const s = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
    return Math.pow(s, k);
}

/** lerp a→b by u. */
function lerp(a: number, b: number, u: number): number {
    return a + (b - a) * u;
}

/**
 * Resolve the render TIER from caps + signature + body count (the §2 ladder selector —
 * geometry + caps, never an app name).
 */
function resolveTier(
    requested: MorphTier | "auto",
    signature: MorphSignature,
    bodyCount: number,
    usesCapture: boolean,
): MorphTier {
    if (requested !== "auto") return requested;
    if (PRM()) return "css"; // snaps 0→1, zero neck frames
    if (!SUPPORTS_FILTER) return "css"; // clip-path waist floor
    if (bodyCount <= 1) return "css"; // collapse — no weld needed
    // capture (arbitrary outline) or n>3 → the GPU SDF tier; else the SVG-goo default.
    if (usesCapture || bodyCount > 3) return "gpu";
    return "svg-goo";
}

/** Whether the runner the capture path composes is present in this build. The capture
 *  silhouette needs `useElementBloom` (the FLIP rect→rect runner) for arbitrary-rect
 *  travel; it is not in src/ this tranche, so capture is guard-scoped out. */
function elementBloomExists(): boolean {
    // Static-import-free presence probe — the runner ships from
    // `composables/motion/useElementBloom` when authored. Absent this tranche.
    return false;
}

export function useMorphField(opts: MorphFieldOptions): MorphFieldHandle {
    const {
        signature: signatureName,
        driveVar = "--goo-t",
        hostRef,
        tier: requestedTier = "auto",
    } = opts;

    const signature = MORPH_SIGNATURES[signatureName];

    const t = ref(0);
    const waist = ref(1);

    const bodiesNow = (): BodySpec[] => unref(opts.bodies) ?? [];
    const isVertical = (): boolean => Boolean(unref(opts.vertical));

    const usesCapture = bodiesNow().some((b) => b.silhouette === "capture");
    // The HARD scoped guard (§L7 cross-engine fence) — capture composes a FLIP runner
    // that is not in this build. assert(exists(useElementBloom) || !usesCapture).
    if (usesCapture && !elementBloomExists()) {
        throw new Error(
            "useMorphField: silhouette:'capture' needs useElementBloom (the FLIP rect→rect " +
                "runner), absent in this build. Use a non-capture silhouette, or compose " +
                "useElementBloom for the arbitrary-rect element→element travel.",
        );
    }

    const tier = ref<MorphTier>(
        resolveTier(requestedTier, signature, bodiesNow().length, usesCapture),
    );

    // The dedicated squish channel — the weld writes its OWN --morph-squish (NEVER
    // --stretch: the 6-JS-owner clobber the dock-core hardening forbids). The volume-
    // preserving recoil rides useLiquidFlex (the FEEL leaf), capped at the signature's
    // LOW maxStretch.
    const squish = useLiquidFlex({
        from: 0,
        to: 0,
        axis: "width",
        squishLaw: "tanh",
        maxStretch: () => signature.maxStretch,
    });

    /** Read the cartoon weight live off the host (--motion-weight), clamped 0..1. PRM /
     *  observer subtrees pin it to 0, zeroing squish/arc/overshoot in ONE read. */
    function readWeight(host: HTMLElement): number {
        const w = unref(opts.weight);
        if (typeof w === "number") return Math.min(1, Math.max(0, w));
        const raw = getComputedStyle(host).getPropertyValue("--motion-weight").trim();
        const n = Number.parseFloat(raw);
        return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.618;
    }

    /** The on-axis centre of a rect at travel value `v` (interpolated at0→at1). */
    function centerAt(b: BodySpec, v: number, vertical: boolean): number {
        const a = b.at0();
        const z = b.at1();
        const ca = vertical ? a.y + a.height / 2 : a.x + a.width / 2;
        const cz = vertical ? z.y + z.height / 2 : z.x + z.width / 2;
        return lerp(ca, cz, v);
    }

    /** The body diameter (px) — the golden-minor BLOB default. */
    function diameter(b: BodySpec): number {
        if (b.radius) return Math.max(1, b.radius() * 2);
        const r = b.at0();
        return Math.max(1, Math.min(r.width, r.height) / PHI);
    }

    /** Write a body transform: translate(centre on axis) → centre-anchor → on-axis squash
     *  + reciprocal cross squash (volume-preserving) + a cross-axis arc (the LOB). */
    function writeBody(
        el: HTMLElement,
        center: number,
        arc: number,
        stretchOn: number,
        vertical: boolean,
    ): void {
        const stretchCross = 1 / stretchOn;
        if (vertical) {
            el.style.transform =
                `translateY(${center.toFixed(2)}px) translateX(${arc.toFixed(2)}px) ` +
                `translate(-50%, -50%) ` +
                `scaleY(${stretchOn.toFixed(4)}) scaleX(${stretchCross.toFixed(4)})`;
        } else {
            el.style.transform =
                `translateX(${center.toFixed(2)}px) translateY(${arc.toFixed(2)}px) ` +
                `translate(-50%, -50%) ` +
                `scaleX(${stretchOn.toFixed(4)}) scaleY(${stretchCross.toFixed(4)})`;
        }
    }

    function project(driveT: number): void {
        const host = hostRef.value;
        const bodies = bodiesNow();
        if (!host || bodies.length === 0) return;
        t.value = driveT;
        const vertical = isVertical();
        const weight = readWeight(host);

        // ── The 1-body DEGENERATE field (collapse) — no neck, just a squish blend ──
        if (bodies.length === 1) {
            const b = bodies[0];
            const c = centerAt(b, driveT, vertical);
            squish.drive(driveT);
            const stretchOn = 1 + (squish.stretch.value - 1) * weight;
            if (b.el.value) writeBody(b.el.value, c, 0, stretchOn, vertical);
            host.style.setProperty("--morph-squish", String(stretchOn));
            waist.value = 1; // a single mass has no waist
            return;
        }

        // ── The 2-body (or 1+N) WELD — the barbell with a real welling neck ──
        // Drive the squish off the scalar derivative (the swell on a fast frame).
        squish.drive(driveT);
        const stretchOn = 1 + (squish.stretch.value - 1) * weight;
        host.style.setProperty("--morph-squish", String(stretchOn));

        // The gap-FRACTION k — the threshold band as a fraction of the live gap, welling
        // from kRest (apart) to kPeak (the gooey waist) on the bell. This is what scales
        // the Tier-S filter threshold so a dot-pip and a 332px arm both neck correctly.
        const bellHold = bell(driveT, 1 + signature.neckHold);
        const k = lerp(signature.kRest, signature.kPeak, bellHold);

        // The two outermost bodies define the primary neck (the rest fan around them).
        const cFirst = centerAt(bodies[0], driveT, vertical);
        const cLast = centerAt(bodies[bodies.length - 1], driveT, vertical);
        // sep pulls the masses together at the neck peak (1 apart → k near the waist).
        const sep = 1 - bell(driveT, 1) * (1 - k);
        const mid = (cFirst + cLast) / 2;
        const halfSpan = ((cLast - cFirst) / 2) * sep;

        const D = diameter(bodies[0]);
        // The arc (overlapping action) — centres lob a cross-axis parabola through the
        // peak so the merge LOBS, not slides flat. 1/φ² share, weight-scaled, PRM→0.
        const arcMag = (D / (PHI * PHI)) * bell(driveT, 1) * weight;

        bodies.forEach((b, i) => {
            const own = centerAt(b, driveT, vertical);
            // pull each body toward the mid by sep (the masses converge at the neck).
            const c = lerp(own, mid, 1 - sep);
            const arc = i % 2 === 0 ? -arcMag : arcMag;
            if (b.el.value) writeBody(b.el.value, c, arc, stretchOn, vertical);
        });

        // The neck girth WELLS then PINCHES (~0 at the ends → no ghost throat at rest).
        const neckGirth = bell(driveT, 1 + signature.neckHold);
        const liveGap = Math.abs((cLast - cFirst) * sep);
        // The waist FRACTION — the throat thickness over the body diameter. The neck is
        // thinnest (smallest waist) when girth is high but the gap is still open; once the
        // bodies fully overlap it is one blob (waist→1). The local minimum is the metaball
        // waist the M2 gate reads. We expose the GEOMETRIC waist; the rendered Tier-S
        // pixels confirm it.
        const throat = D * lerp(1, k, neckGirth);
        waist.value = D > 0 ? Math.min(1, throat / D) : 1;

        // Publish the neck drive so morph-field.css paints the welling throat: girth,
        // gap, the threshold band k (the Tier-S filter consumer reads it), specular sweep.
        host.style.setProperty("--morph-neck-girth", neckGirth.toFixed(4));
        host.style.setProperty("--morph-neck-gap", liveGap.toFixed(2));
        host.style.setProperty("--morph-k", k.toFixed(4));
        host.style.setProperty("--morph-waist", waist.value.toFixed(4));
        // the specular sweep advances with the morph + lags ~follow-through (60° trail).
        const sweep = (driveT * 360 + 60 * neckGirth) % 360;
        host.style.setProperty("--morph-specular-angle", `${sweep.toFixed(1)}deg`);
    }

    function seat(driveT: number): void {
        const host = hostRef.value;
        const bodies = bodiesNow();
        if (!host) return;
        t.value = driveT;
        const vertical = isVertical();
        // one resting mass per body at its endpoint, no neck, no squish.
        bodies.forEach((b) => {
            if (b.el.value)
                writeBody(b.el.value, centerAt(b, driveT, vertical), 0, 1, vertical);
        });
        host.style.setProperty("--morph-squish", "1");
        host.style.setProperty("--morph-neck-girth", "0");
        host.style.setProperty("--morph-waist", "1");
        waist.value = 1;
    }

    onScopeDispose(() => {
        /* the weld owns no rAF/spring — nothing to tear down beyond the squish leaf,
           which disposes on its own scope. */
    });

    return {
        t: t as Readonly<Ref<number>>,
        waist: waist as Readonly<Ref<number>>,
        tier: tier as Readonly<Ref<MorphTier>>,
        project,
        seat,
    };
}
