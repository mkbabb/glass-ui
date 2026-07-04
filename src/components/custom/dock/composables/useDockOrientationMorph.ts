// AZ.W-MORPH-SHOWCASE (move 2) — useDockOrientationMorph: the vertical↔horizontal
// dock morph driver, layered on the dock's ONE `--dock-morph-t` single-scalar clock.
//
// R3-13 asks for a vertical dock that flows — as an amorphous metaball teardrop —
// into a horizontal dock, fully bidirectional + deterministic. A V↔H orientation flip
// is a TOPOLOGY change (flex column→row + a simultaneous two-axis size change); the
// web platform CANNOT continuously interpolate mismatched-topology silhouettes
// (AX.W42 fold 7, the binding limit). So this driver does NOT attempt a continuous
// clip-path morph. Instead (the metaball-bridge, H4 arm a):
//   • TWO real DOM docks are rendered — a vertical one and a horizontal one;
//   • ONE `SpringProgress` (the `DOCK_SPRING` register, the SAME spring the dock
//     collapse/expand morph rides) writes a single normalized 0→1 scalar
//     `--dock-morph-t` once per frame to the host root. `t=0` is the vertical dock;
//     `t=1` is the horizontal dock;
//   • the vertical dock COLLAPSES its height (full→0) while the horizontal dock GROWS
//     its width (0→full), both off the ONE scalar — a `useLiquidFlex` size span each;
//   • the two docks CROSSFADE (opacity off the same scalar) UNDER a goo bridge, so the
//     topology jump-cut (column→row reflow) happens at the visually-OCCLUDED `t≈0.5`
//     midpoint where the bridge teardrop fully covers both plates.
// The driver is deterministic + interruptible: a mid-flight toggle re-bases the live
// spring from its current velocity (the iOS interruptible-physics contract), so the
// trajectory stays continuous and the captured frame-series is reproducible. Under
// PRM the spring's `respectReducedMotion` jumps the scalar 0→1 in one frame (the
// morph snaps to the target dock with zero motion frames).
//
// The teardrop ASPECT (the bridge's tall→wide capsule) is `f(--dock-morph-t)`: this
// driver exposes the scalar `t` + a `useLiquidFlex` squish bound to the scalar's
// DERIVATIVE (never a wall-clock nor a pointer speed — the M5 determinism clause). The
// bridge CSS reads the scalar to drive its two-plate teardrop aspect; the squish rides
// the derivative for the liquid swell. NO free-running clock anywhere on the morph path.

import { computed, onScopeDispose, ref, watch, type ComputedRef, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { useLiquidFlex } from "../../../../composables/motion/useLiquidFlex";
import {
    effectiveCap,
    writeVelocityWeight,
} from "../../../../composables/motion/core/writeVelocityWeight";
import { DOCK_MORPH_MAX_STRETCH, DOCK_SPRING } from "../constants";

export type DockMorphOrientation = "vertical" | "horizontal";

export interface UseDockOrientationMorphOptions {
    /**
     * The host root the scalar is written to (`--dock-morph-t`). Both docks + the
     * bridge live under it and read the inheriting scalar.
     */
    rootEl: Ref<HTMLElement | null>;
    /** The vertical dock's full (expanded) block size in px — the `t=0` height. */
    verticalSize: number | (() => number);
    /** The horizontal dock's full (expanded) inline size in px — the `t=1` width. */
    horizontalSize: number | (() => number);
}

export interface UseDockOrientationMorphReturn {
    /** The current target orientation. Set via `toggle()`/`morphTo()`. */
    orientation: Readonly<Ref<DockMorphOrientation>>;
    /**
     * BG.W-DOCK-INPLACE-MORPH (F-ARM-3) — the LOCAL discrete orientation the in-place
     * adapter reads: a pure `f(t)` at the 0.5 crossing (vertical below, horizontal at/
     * above). The topology flip (flex column→row) is hidden in the occluding goo neck,
     * and a mid-flight reversal just re-crosses 0.5 cleanly. DISTINCT from the eager
     * `orientation` target ref (which commits at press): `boundOrientation` is where the
     * box ACTUALLY is, so the in-place layout swaps under the goo.
     */
    boundOrientation: ComputedRef<DockMorphOrientation>;
    /** The live normalized scalar (0 = vertical, 1 = horizontal). */
    t: Readonly<Ref<number>>;
    /** True while the spring is in flight (the host arms `data-morphing`). */
    morphing: Readonly<Ref<boolean>>;
    /** The vertical dock's live height style (`{ height: "Npx" }`), collapsing 0. */
    verticalStyle: ComputedRef<Record<string, string>>;
    /** The horizontal dock's live width style (`{ width: "Npx" }`), growing 0→full. */
    horizontalStyle: ComputedRef<Record<string, string>>;
    /** The vertical dock's crossfade opacity (`{ opacity: "…" }`), 1→0 over the morph. */
    verticalOpacity: ComputedRef<Record<string, string>>;
    /** The horizontal dock's crossfade opacity (`{ opacity: "…" }`), 0→1 over the morph. */
    horizontalOpacity: ComputedRef<Record<string, string>>;
    /** The teardrop squish scalar (the bridge reads it for the liquid swell). */
    stretch: ComputedRef<number>;
    /**
     * BG.W-DOCK-INPLACE-MORPH (F-ARM-2) — the bridge opacity output, gated to the
     * OCCLUDED midpoint window (0 at both endpoints, smootherstep-ramped through
     * `t∈0.18..0.82`). The in-place consumer binds it onto the `.dock-morph-bridge`
     * `--dock-bridge-opacity` so the teardrop neck only paints where it covers the
     * reflow; the endpoint frames show the real dock alone. PRM zeros it via the CSS
     * carve (belt-and-suspenders — under reduce `runTo` pins with zero motion frames).
     */
    bridgeStyle: ComputedRef<Record<string, string>>;
    /** Morph to the explicit orientation (a no-op if already there). */
    morphTo(next: DockMorphOrientation): void;
    /** Toggle V↔H. The bidirectional driver — the SAME scalar both ways. */
    toggle(): void;
    /**
     * PIN the morph to an EXACT scalar value (0→1) with NO spring — the deterministic
     * capture seam (HG1). Disposes any live spring, writes the scalar + both flex
     * spans + the crossfade to exactly `value`, so a frame captured at a given `t` is
     * byte-reproducible (no wall-clock, no spring asynchrony). The orientation is set
     * to the side `value` lands on for the inert/a11y contract.
     */
    pin(value: number): void;
}

export function useDockOrientationMorph(
    options: UseDockOrientationMorphOptions,
): UseDockOrientationMorphReturn {
    const { rootEl } = options;

    const orientation = ref<DockMorphOrientation>("vertical");
    const t = ref(0); // 0 = vertical, 1 = horizontal — the ONE scalar
    const morphing = ref(false);

    // BC.W-DOCK-ARBITRARY (A4) — the shape-morph squish cap reads the
    // `--dock-morph-max-stretch` cascade token (the lifted iOS-27 register). Resolved
    // per-read off the live root so a consumer override re-resolves the cap without
    // reconstructing the primitive (the useLiquidFlex getter contract).
    //
    // BG.NF.1 W-FALLBACK-EXCISE — the cap default is the single-sourced
    // `DOCK_MORPH_MAX_STRETCH` (constants.ts, mirroring the token), NEVER a bare
    // drift-prone literal duplicated at the read (the 1.08→1.14 drift the prior literal
    // carried). An absent root is the honest not-mounted case → the constant; a MOUNTED
    // root whose token is unreadable is a real bug → fail loud (dev warn) then the
    // constant, no silent literal mask.
    //
    // BD.W-MOTION-WEIGHT — the cap is then derived SITE-LOCALLY off the live
    // `--motion-weight` read at the SAME root (the spike-corrected mechanism — NEVER
    // a :root calc token): `effectiveCap` returns `cap_token` at rest weight 0.618
    // (byte-identical feel) and 1.0 at weight 0 (the observer/PRM fence). The
    // (weight/0.618) factor reads the EXISTING cap token directly — zero new
    // `--*-stretch-k` coefficient cohort.
    const maxStretchOf = (): number => {
        const r = rootEl.value;
        if (!r) return DOCK_MORPH_MAX_STRETCH;
        const raw = getComputedStyle(r)
            .getPropertyValue("--dock-morph-max-stretch")
            .trim();
        const n = raw ? Number.parseFloat(raw) : NaN;
        let capToken: number;
        if (Number.isFinite(n) && n >= 1) {
            capToken = n;
        } else {
            if (import.meta.env?.DEV)
                console.warn(
                    "[glass-ui] dock: --dock-morph-max-stretch unreadable on a mounted dock root — the token cascade did not reach it (falling back to the single-sourced cap).",
                );
            capToken = DOCK_MORPH_MAX_STRETCH;
        }
        return effectiveCap(r, capToken);
    };

    // The vertical dock height-collapse span: full → 0 as t: 0 → 1. We interpolate the
    // SAME `--dock-morph-t` scalar through `useLiquidFlex` with the size flipped so the
    // vertical plate shrinks while the horizontal grows. The teardrop squish rides the
    // scalar's derivative (the M5 scalar-binding) — `verticalFlex` owns the squish. The
    // cap reads `--dock-morph-max-stretch` (A4 — the ONE squish source, no forked math).
    const verticalFlex = useLiquidFlex({
        from: options.verticalSize,
        to: 0,
        axis: "height",
        maxStretch: maxStretchOf,
    });
    const horizontalFlex = useLiquidFlex({
        from: 0,
        to: options.horizontalSize,
        axis: "width",
        maxStretch: maxStretchOf,
    });

    // ── F-ARM-1 · the analytic-velocity weight channel (12-laws squish) ──
    // The morph's liquid weight is the spring's OWN analytic velocity, not a
    // frame-rate-coupled `|Δt|` sample: `SpringProgress.play` passes `(value, velocity)`
    // per frame, so the squish + the `--motion-weight` boost read the closed-form
    // velocity (identical at 60/120Hz — the F-ARM-1 fence). `--dock-morph-v` is the
    // saturating term `clamp(0, |velocity|/V_NORM, 1)` the live-π reads (`--stretch`
    // tracks it — the weight signature). V_NORM is a build-time constant (the M5
    // no-wall-clock discipline — never a live max).
    const V_NORM = 4;

    // The live weight scalars (updated per frame in `writeScalar`, read by the bridge +
    // the showcase `stretch` output). Refs so the computed outputs re-evaluate.
    const morphV = ref(0);
    const stretchVal = ref(1);

    // ── The ONE spring — the dock's single-scalar morph clock (DOCK_SPRING) ──
    // BG.W-DOCK-INPLACE-MORPH keeps the driver's OWN raw `SpringProgress` (the sibling
    // drain of the four remaining morph springs onto the `useDockSpring` factory is
    // BOOKED to its own wave per proof:dock-engine-unify's census — migrating it HERE
    // would re-point proof:morph-showcase's M3 raw-spring idiom out of this wave's file
    // scope). The F-ARM-1 analytic-velocity channel rides the SAME
    // `play((value, velocity) => …)` callback the raw `SpringProgress` already emits, so
    // the 12-laws weight reads the closed-form velocity with no factory dependency.
    let spring: SpringProgress | null = null;

    function writeScalar(value: number, velocity: number): void {
        t.value = value;
        // Drive BOTH liquid-flex spans off the ONE scalar (the size endpoints for the
        // two-DOM-dock showcase; byte-identical `sizeStyle`). The squish + weight are
        // re-sourced off the ANALYTIC velocity below (no `|Δt|` channel survives —
        // F-ARM-1), so the flex `stretch`/`flexVel` are no longer read for `--stretch`.
        verticalFlex.drive(value);
        horizontalFlex.drive(value);
        // The saturating analytic-velocity term (the 12-laws weight signature).
        const v = Math.min(Math.abs(velocity) / V_NORM, 1);
        morphV.value = v;
        const r = rootEl.value;
        if (r) {
            // BD.W-MOTION-WEIGHT (§2c) — fold the analytic velocity into the transient
            // `--motion-weight` boost on the SAME dock root the cap getter reads, so a
            // fast V↔H morph deepens its own squish and self-extinguishes to rest as it
            // settles (write the weight FIRST so the site-local cap sees the boost).
            writeVelocityWeight(r, v);
            // BC.W-DOCK-ARBITRARY (A4) — the volume-preserving squish, capped at the
            // effective `--dock-morph-max-stretch` (read AFTER the weight write). The
            // ONE squish source, no forked deformation math; the plate deforms like
            // liquid as it changes shape (`scale: var(--stretch) calc(1/--stretch)`).
            const cap = maxStretchOf();
            const s = 1 + (cap - 1) * v;
            stretchVal.value = s;
            r.style.setProperty("--dock-morph-t", `${value}`);
            r.style.setProperty("--dock-morph-v", v.toFixed(4));
            r.style.setProperty("--stretch", `${s}`);
        } else {
            stretchVal.value = 1;
        }
    }

    function disposeSpring(): void {
        if (spring) {
            spring.dispose();
            spring = null;
        }
    }

    function prefersReducedMotion(): boolean {
        return (
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }

    function runTo(targetT: number): void {
        // PRM — snap to the target with ZERO motion frames (HG3). The deterministic
        // pin writes the scalar + both spans to the endpoint in one synchronous step;
        // no spring runs, so there are no in-between motion frames and the goo teardrop
        // never paints (the morph reads as an instant cut). The explicit PRM path —
        // robust regardless of the engine's own PRM seek.
        if (prefersReducedMotion()) {
            pin(targetT);
            return;
        }
        const r = rootEl.value;
        // The interruptible re-base — a mid-flight toggle re-seats the live spring from
        // its CURRENT velocity onto the new target so the trajectory stays continuous.
        const live = spring !== null && !spring.settled;
        const inheritedVelocity = live ? spring!.velocity : 0;
        if (!spring || spring.settled) {
            disposeSpring();
            spring = new SpringProgress({
                response: DOCK_SPRING.response,
                dampingFraction: DOCK_SPRING.dampingFraction,
                initial: t.value,
                respectReducedMotion: true,
            });
            const active = spring;
            active.reset(t.value, inheritedVelocity);
            active.target = targetT;
            morphing.value = true;
            if (r) r.setAttribute("data-morphing", "");
            // F-ARM-1 — the play callback carries the closed-form (value, velocity), so
            // `writeScalar` re-sources the squish + weight off the analytic velocity.
            active.play((value: number, velocity: number) => {
                writeScalar(value, velocity);
                if (active.settled) {
                    morphing.value = false;
                    const rr = rootEl.value;
                    if (rr) rr.removeAttribute("data-morphing");
                }
            });
        } else {
            // A live spring mid-flight — re-seat onto the new target from its velocity.
            spring.reset(t.value, inheritedVelocity);
            spring.target = targetT;
        }
    }

    function morphTo(next: DockMorphOrientation): void {
        if (next === orientation.value && !morphing.value) return;
        orientation.value = next;
        runTo(next === "horizontal" ? 1 : 0);
    }

    function toggle(): void {
        morphTo(orientation.value === "vertical" ? "horizontal" : "vertical");
    }

    function pin(value: number): void {
        const v = value < 0 ? 0 : value > 1 ? 1 : value;
        disposeSpring(); // no spring — an exact, reproducible pin
        morphing.value = false;
        orientation.value = v >= 0.5 ? "horizontal" : "vertical";
        // Write the scalar + both flex spans to exactly `v` with ZERO velocity — the
        // endpoint is squish-free (`--stretch` → 1, `--dock-morph-v` → 0). Drive twice
        // so the flex spans settle to the at-rest silhouette for that t.
        writeScalar(v, 0);
        writeScalar(v, 0);
        const r = rootEl.value;
        if (r) r.removeAttribute("data-morphing");
    }

    // The crossfade opacities — both off the same scalar. The vertical plate fades out
    // over the FIRST half, the horizontal fades in over the SECOND, so at t≈0.5 both
    // are at their dimmest (the bridge teardrop occludes the topology jump-cut). A
    // smootherstep ramp keeps the crossfade gentle at the endpoints.
    function fadeOut(x: number): number {
        // 1 at t=0, 0 by t≈0.5 — the vertical plate dims into the bridge.
        const u = Math.min(Math.max(x / 0.5, 0), 1);
        return 1 - u * u * (3 - 2 * u);
    }
    function fadeIn(x: number): number {
        // 0 until t≈0.5, 1 at t=1 — the horizontal plate emerges from the bridge.
        const u = Math.min(Math.max((x - 0.5) / 0.5, 0), 1);
        return u * u * (3 - 2 * u);
    }

    // BG.W-DOCK-INPLACE-MORPH (F-ARM-2) — the bridge-opacity gate: 0 at both endpoints,
    // smootherstep-ramped up to 1 across the OCCLUDED midpoint window `t∈0.18..0.82`, so
    // the teardrop neck paints ONLY where it covers the topology reflow (the endpoint
    // frames show the real dock alone). A pure `f(t)` — no clock (the M5 scalar-binding).
    function bridgeGate(x: number): number {
        const LO = 0.18;
        const HI = 0.82;
        const MID = 0.5;
        if (x <= LO || x >= HI) return 0;
        if (x < MID) {
            const u = (x - LO) / (MID - LO);
            return u * u * (3 - 2 * u);
        }
        const u = (HI - x) / (HI - MID);
        return u * u * (3 - 2 * u);
    }

    const verticalStyle = computed(() => verticalFlex.sizeStyle.value);
    const horizontalStyle = computed(() => horizontalFlex.sizeStyle.value);
    const verticalOpacity = computed<Record<string, string>>(() => ({
        opacity: String(fadeOut(t.value)),
    }));
    const horizontalOpacity = computed<Record<string, string>>(() => ({
        opacity: String(fadeIn(t.value)),
    }));
    // The teardrop squish — the analytic-velocity 12-laws stretch written per frame
    // (F-ARM-1), re-sourced off the spring's own velocity (the `|Δt|` channel retired).
    const stretch = computed(() => stretchVal.value);
    // The LOCAL discrete orientation the in-place adapter reads (F-ARM-3).
    const boundOrientation = computed<DockMorphOrientation>(() =>
        t.value >= 0.5 ? "horizontal" : "vertical",
    );
    // The bridge opacity output — the consumer binds it onto `--dock-bridge-opacity`.
    const bridgeStyle = computed<Record<string, string>>(() => ({
        "--dock-bridge-opacity": bridgeGate(t.value).toFixed(4),
    }));

    // Seat the scalar on the root when it mounts (so a static t=0 paints correctly).
    watch(
        rootEl,
        (r) => {
            if (r) r.style.setProperty("--dock-morph-t", `${t.value}`);
        },
        { immediate: true },
    );

    onScopeDispose(disposeSpring);

    return {
        orientation,
        boundOrientation,
        t,
        morphing,
        verticalStyle,
        horizontalStyle,
        verticalOpacity,
        horizontalOpacity,
        stretch,
        bridgeStyle,
        morphTo,
        toggle,
        pin,
    };
}
