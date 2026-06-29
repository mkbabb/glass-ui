// BC.W-VIZ-CHOREOGRAPHY — useVizChoreography: the procedural-viz family's ONE
// start · transition · end · restart choreography clock.
//
// THE GESTALT (USER-DEFECTS §D — "liquid fade-in for opening apps / the control
// centre; the coupled fade in+out"). Navigate INTO a substrate page and the viz does
// not snap on — it MATERIALIZES: a coupled fade + a settle-from-scatter (the dots
// spring out from a collapsed point, the aurora blooms in, the constellation settles
// from a scatter into its drift) on the iOS-26 liquid-build-in feel. Switch a preset /
// variant and the surface MORPHS with a spring glide, never a hard cut. Navigate AWAY
// and it fades + parks cleanly. Hit restart mid-build and it re-seats velocity-
// continuously (the iOS interruptible contract). EVERY beat — start/transition/end/
// restart — runs off the SAME keyframes.js clock the whole library speaks, so the viz
// feel is coherent with the dock morph, the dialog bloom, the tab squish.
//
// THE ONE-LOOP / proof:offscreen-pause DISCIPLINE (load-bearing, the inverse rule for
// viz, kf-vjs §1.6). The viz renderer ALREADY owns the frame loop — the canvas
// lifecycle (`createCanvasLifecycle`, the AU.W6 carve the WebGL2/Canvas2D/WebGPU
// backends all compose) delivers `(timeSec)` per frame. This composable owns NO second
// rAF: it is a PUSH-API the renderer FEEDS via `tick(dtMs)` from INSIDE its existing
// frame callback (the usePointerVelocityField precedent — interaction = the per-frame
// pointer push, choreography = the enter/transition/restart clock; disjoint legs, ONE
// loop). Forking a kf rAF here (a `SpringProgress.play()` / a `Sequence.play()`) would
// break the one-loop discipline (an offscreen-parked renderer would still run that
// loop), so the leaf drives the spring with `tickDt(dt)` and steps a Sequence with
// `seek(masterClock)` — the renderer steps both, never kf's own driver.
//
// THE LOAD-BEARING REUSE (no second clock — the MOTION-ONE-CLOCK fence). The leaf
// composes the PUBLISHED kf 5.1.0 clock — `SpringProgress` (the `revealT` scalar,
// velocity-continuous re-seat) + `springTimingFunction` (the transition cross-fade
// timing, the typed {fn,css} pair from the SAME SPRING_PRESETS row the --spring-*
// tokens generate from) + `SmoothProgress` (the config-transition lerp). It owns NO
// hand-rolled rAF spring integrator and NO second timing vocabulary — the reveal reads
// a SPRING_PRESETS register, never a hand (response, ζ) or a generic --duration-* wall
// clock (the W-GLASS-CAL per-spring-clock fence).
//
// THE COUPLED FADE (W-MOTION-CANON P3 — "same-drive-both-legs"). ONE `revealT ∈ [0,1]`
// scalar drives BOTH legs: (1) the canvas OPACITY ramps 0→1, AND (2) the viz's build-in
// uniform — a "settle-from-scatter" (the dots spring from a collapsed point / a seeded
// scatter out to their lattice; the aurora nuclei bloom in; the fourier curve
// assembles). ONE drive, both legs, on the spring's OWN settle clock. The viz reads
// `revealT` for its build-in uniform AND `opacity` for the canvas fade (this leaf
// produces the SCALARS — the viz writes the uniform/opacity; this leaf NEVER writes a
// layout property, so proof:no-layout-animation stays GREEN by construction).
//
// THE FOUR BEATS:
//   A START  — enter(): the SpringProgress drives revealT 0→1 on the page-enter
//              (bouncy = the playful bloom / smooth = the calm settle — the per-viz
//              wave picks the register).
//   B TRANSITION — transitionTo(t): a config/variant morph glides on a SmoothProgress
//              lerp 0→1 (the spring-timed cross-fade) — never a hard cut.
//   C END    — leave(): the SAME revealT scalar settles 1→0 (opacity + the uniform
//              settle-out) then parks — no flash, no abrupt black. The exit rides the
//              no-overshoot register (a closing surface must not overshoot past gone,
//              W-MOTION-CANON P2 — leave() re-seats to a critically-damped settle).
//   D RESTART — restart(): SpringProgress `set target` re-seats the closed form from
//              the CURRENT (value, velocity) so a restart mid-build inherits the live
//              trajectory — never a CSS-transition jump-to-zero (the iOS interruptible
//              contract, the useSpringPress / W-PRESS-UNIFY precedent).
//
// PRM-SAFE (W-MOTION-CANON P6 — keeps-fade-drops-transform). Under
// `prefers-reduced-motion: reduce` the build-in collapses to a one-frame fade: revealT
// snaps to its target (zero spring frames), the canvas opacity still resolves (the fade
// survives), the scatter/transform leg is the viz's to drop (it reads `transformActive`
// — false under PRM — and skips the settle-from-scatter). The PRM signal is the
// SpringProgress `respectReducedMotion` snap (the K.W11 PHYS-E gate) — no second
// matchMedia engine.
//
// THE PERF FENCE (BC.W-WEBGPU-EVERYWHERE W8 steady-state floor). Because the
// choreography rides the existing loop it adds ZERO frame-loop cost — the per-frame
// added work is one `SpringProgress.tickDt(dt)` analytic field-step (the closed form,
// O(1), zero allocation per frame — kf-vjs §1.1) + the build-in/opacity field read. The
// register resolution is cached ONCE at construction (never re-resolved per tick), and
// the spring trajectory is read analytically (never integrates a per-frame ODE).
//
// THE Oscillator is NOT imported here, BY DESIGN (kf-vjs §3.1, §F). A breathing/
// pulsing/rotating idle LOOP wants a continuous looping phase clock — the kf
// `Oscillator` (shipped on kf 5.1.0; the booked republish HAS LANDED — ZERO upstream
// ask remains). This leaf owns the four ENTER/TRANSITION/EXIT/RESTART beats, NOT the
// idle loop, so it deliberately does not import it: the idle loop is the viz's own
// de-synced sine / `uTime` (KEEP). A future idle-loop wave composes the kf `Oscillator`
// directly AT the viz (the ≥2-binary-consumer bar), never through this choreography leaf.
//
// INTERNAL (off the public /glass barrel — the substrate-picker precedent). Every
// canvas viz composes it via a direct relative import; the ≥2-binary-consumer bar is the
// per-viz waves, recorded in docs/consumer-evidence/use-viz-choreography.md.

import {
    SpringProgress,
    SmoothProgress,
    springTimingFunction,
    type Easing,
} from "@mkbabb/keyframes.js";
import { onScopeDispose, readonly, ref, type Ref } from "vue";
import {
    springPreset,
    type SpringPresetName,
} from "../motion/springPresets";

/**
 * The reveal spring register. `bouncy` is the playful bloom (the dots spring out, the
 * aurora blooms — the largest overshoot), `smooth` the calm settle, `snappy` the crisp
 * control build, `gentle`/`dock` the patient/control ends. A named SPRING_PRESETS row —
 * never a hand (response, ζ).
 */
export type VizChoreographyPreset = SpringPresetName;

export interface UseVizChoreographyOptions {
    /**
     * The ENTER spring register (default `bouncy` — the playful liquid bloom the user
     * named). The per-viz wave picks: `smooth` for a calm field settle, `bouncy` for the
     * dot-scatter bloom.
     */
    preset?: VizChoreographyPreset;
    /**
     * The config-TRANSITION lerp duration in seconds. Default the ENTER preset's response
     * (the spring-timed glide — never a hand wall clock). The cross-fade timing is the
     * `springTimingFunction` of the SAME preset row.
     */
    transitionResponse?: number;
    /**
     * Honor `prefers-reduced-motion: reduce` → snap the reveal (zero spring frames, the
     * fade survives, the scatter/transform leg is the viz's to drop). Default true. (A
     * deterministic viz capture that ACCEPTS the live build-in opts out.)
     */
    respectReducedMotion?: boolean;
    /**
     * Start ALREADY revealed (revealT = 1) — for a viz mounted on a route that is already
     * the active page (no enter beat owed). Default false (the page-enter starts collapsed
     * and blooms). `enter()` always re-seats from the current value, so this is only the
     * INITIAL seed.
     */
    initiallyRevealed?: boolean;
}

export interface UseVizChoreographyReturn {
    /**
     * The coupled reveal scalar ∈ [0,1] (may briefly overshoot >1 on a bouncy enter — the
     * iOS bloom). The viz reads this for BOTH legs: the build-in uniform (settle-from-
     * scatter) AND the canvas opacity (clamped via `opacity`). 0 = collapsed/scattered,
     * 1 = fully materialized.
     */
    readonly revealT: Readonly<Ref<number>>;
    /**
     * The canvas opacity ∈ [0,1] — the coupled fade leg, `revealT` clamped to [0,1] (the
     * fade does not overshoot; only the spatial build-in overshoots). The viz binds this
     * to its canvas `style.opacity`.
     */
    readonly opacity: Readonly<Ref<number>>;
    /**
     * The config-transition progress ∈ [0,1] — the SmoothProgress glide a preset/variant
     * morph reads to lerp its config uniforms (0 = the outgoing config, 1 = the incoming).
     * Idle (settled at 1) when no transition is in flight.
     */
    readonly transitionT: Readonly<Ref<number>>;
    /**
     * True while the spatial build-in (the settle-from-scatter / the bloom transform) is
     * ACTIVE — false under PRM (the viz drops the scatter, keeps the fade) and false once
     * settled. The viz gates its scatter/transform leg on this (the P6 keeps-fade-drops-
     * transform split).
     */
    readonly transformActive: Readonly<Ref<boolean>>;
    /** True once the reveal has fully settled at its target (the loop can quiesce). */
    readonly settled: Readonly<Ref<boolean>>;
    /**
     * A — START: bloom the viz in (revealT → 1) on the page-enter, on the ENTER spring
     * register. Idempotent; a re-call mid-build re-seats velocity-continuously (the
     * restart contract). PRM snaps to revealed (the fade survives, the scatter drops).
     */
    enter: () => void;
    /**
     * C — END: settle the viz out (revealT → 0) on the no-overshoot exit register, then
     * the loop parks (the viz reads `settled`/`revealT === 0` to stop). PRM snaps to
     * collapsed. A closing surface must not overshoot past gone (P2).
     */
    leave: () => void;
    /**
     * B — TRANSITION: glide a config/variant morph. Re-seats `transitionT` 0→1 on the
     * SmoothProgress lerp; the viz reads `transitionT` to lerp its config uniforms each
     * frame. `onComplete` (optional) fires once the glide settles. PRM snaps the glide.
     */
    transitionTo: (onComplete?: () => void) => void;
    /**
     * D — RESTART: re-seat the reveal from the CURRENT (value, velocity) so a restart mid-
     * build inherits the live trajectory (the iOS interruptible contract — never a jump-
     * to-zero). Snaps revealT back to 0 then blooms 1 velocity-continuously.
     */
    restart: () => void;
    /**
     * Advance the choreography ONE renderer frame. The viz calls this from INSIDE its
     * existing `createCanvasLifecycle` frame callback with the frame `dtMs` (milliseconds).
     * NO own rAF — the renderer owns the loop. Steps the reveal spring + the transition
     * lerp analytically (O(1), zero allocation). Returns the live `revealT` (so a renderer
     * can read inline). A zero/negative `dtMs` is a no-op step (a paused/first frame).
     */
    tick: (dtMs: number) => number;
    /** The transition cross-fade easing (the typed {fn,css} pair) — for a viz that wants
     *  the spring curve directly (e.g. to time a CSS-side companion). */
    readonly transitionEasing: Easing;
}

/**
 * The procedural-viz choreography clock. Composes the published kf 5.1.0
 * `SpringProgress` (the reveal scalar) + `SmoothProgress` (the config lerp) +
 * `springTimingFunction` (the cross-fade timing), FED `tick(dt)` from the consuming
 * viz's frame callback. Owns NO rAF (the one-loop discipline; the viz feed it). See the
 * module header for the four beats, the coupled-fade drive, the one-loop fence, and the
 * Oscillator book.
 *
 * @example
 * ```ts
 * const choreo = useVizChoreography({ preset: "bouncy" });
 * // inside createCanvasLifecycle's frame(timeSec):
 * const dtMs = (timeSec - lastSec) * 1000;
 * choreo.tick(dtMs);
 * canvas.style.opacity = String(choreo.opacity.value);
 * gl.uniform1f(uReveal, choreo.revealT.value); // the settle-from-scatter build-in
 * // page-enter / route-leave:
 * watch(active, (on) => (on ? choreo.enter() : choreo.leave()));
 * ```
 */
export function useVizChoreography(
    options: UseVizChoreographyOptions = {},
): UseVizChoreographyReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const presetName: VizChoreographyPreset = options.preset ?? "bouncy";

    // The register resolution is cached ONCE at construction (the perf fence — never
    // re-resolved per tick). The ENTER spring reads its (response, ζ) row; the EXIT
    // re-seats this SAME spring to the critically-damped `gentle` row (no overshoot past
    // gone, P2) at leave() time.
    const enterRow = springPreset(presetName);
    const exitRow = springPreset("gentle"); // critically-damped — the no-overshoot exit

    // The transition cross-fade easing — the typed {fn,css} pair from the SAME
    // SPRING_PRESETS row the --spring-<name> CSS tokens generate from (never a hand
    // (response, ζ); the W-GLASS-CAL fence). Cached once.
    const transitionEasing: Easing = springTimingFunction({
        response: enterRow.response,
        dampingFraction: enterRow.dampingFraction,
    });

    const initial = options.initiallyRevealed ? 1 : 0;

    // The ONE reveal spring — the velocity-continuous closed form. We START at the enter
    // register; leave() re-seats to the exit register at exit time. The spring owns NO
    // rAF (we never call .play()); the renderer steps it via tickDt(dt) in `tick`. It is
    // `let` (not const) so a register swap (enter↔exit) re-binds it velocity-continuously
    // — every closure reads the live `reveal` via this binding, so a re-seat is seen by
    // syncFromReveal/tick with no indirection.
    let reveal = new SpringProgress({
        response: enterRow.response,
        dampingFraction: enterRow.dampingFraction,
        initial,
        respectReducedMotion: respectPRM,
    });
    reveal.target = initial; // seat the target (the initial is the resting value)
    // Which (response, ζ) register the live `reveal` spring currently rides — so a same-
    // register re-seat is a no-op (a rapid enter/enter keeps the live trajectory).
    let currentResponse = enterRow.response;
    let currentDamping = enterRow.dampingFraction;

    // The config-transition lerp — a monotone SmoothProgress (the cross-fade glide is
    // monotone 0→1, no overshoot — never a hard cut). Idle at 1 (settled — no transition
    // in flight). The `damping` is derived off the transition response (a faster response
    // = a higher damping toward target); clamp to [0,1] (the glide never overshoots).
    const transitionResponse =
        options.transitionResponse ?? enterRow.response;
    // damping ∈ (0,1] per frame-second; map the response (seconds) onto it (a 0.42s
    // response ≈ 0.18 damping — the snappy glide; clamped to the kf-sane (0,1] band).
    const transitionDamping = Math.min(
        1,
        Math.max(0.02, 0.075 / Math.max(0.01, transitionResponse)),
    );
    const transition = new SmoothProgress({
        damping: transitionDamping,
        initial: 1,
        clamp: true,
        respectReducedMotion: respectPRM,
    });
    let transitionDone: (() => void) | null = null;

    // The reactive field the viz reads. revealT may briefly exceed 1 (the bouncy
    // overshoot); opacity clamps to [0,1] (the fade does not overshoot).
    const revealT = ref(initial);
    const opacity = ref(initial);
    const transitionT = ref(1);
    const transformActive = ref(false);
    const settled = ref(true);

    function syncFromReveal(): void {
        const v = reveal.value;
        revealT.value = v;
        opacity.value = Math.min(1, Math.max(0, v));
        settled.value = reveal.settled;
        // The spatial build-in is active while the spring is in-flight AND PRM is off.
        // Under PRM the spring snaps (settled immediately) so transformActive stays false
        // — the viz drops the scatter, keeps the fade (P6).
        transformActive.value = !reveal.settled;
    }

    // ── A — START ─────────────────────────────────────────────────────────────────
    function enter(): void {
        // Velocity-continuous re-seat to the enter register, then target 1. Re-seating
        // the (response, ζ) is a fresh spring construction — kf SpringProgress has no
        // setter, so we re-target the existing spring (it re-seats from the live value+
        // velocity by construction). A mid-leave enter inherits the live trajectory (the
        // interruptible contract). The enter register is the one we constructed with; if
        // a prior leave() swapped to the exit register, restore the enter (response, ζ)
        // by re-seating velocity-continuously into a fresh enter spring.
        reseatRegister(enterRow.response, enterRow.dampingFraction);
        reveal.target = 1;
        syncFromReveal();
    }

    // ── C — END ───────────────────────────────────────────────────────────────────
    function leave(): void {
        // Re-seat to the critically-damped exit register (no overshoot past gone, P2),
        // then target 0. Velocity-continuous (a mid-build leave inherits the live value).
        reseatRegister(exitRow.response, exitRow.dampingFraction);
        reveal.target = 0;
        syncFromReveal();
    }

    // ── D — RESTART ───────────────────────────────────────────────────────────────
    function restart(): void {
        // The iOS interruptible restart: re-seat from the CURRENT (value, velocity) to 0
        // then bloom 1 — the second build inherits the first's live momentum (never a
        // jump-to-zero). We snap the value to 0 ONLY when already settled (a fresh
        // restart); a mid-build restart keeps the live value+velocity and just re-targets
        // (the velocity-continuous re-seat the SpringProgress `set target` performs).
        reseatRegister(enterRow.response, enterRow.dampingFraction);
        if (reveal.settled) {
            // Fully settled — restart from collapsed (a deliberate replay).
            reveal.reset(0, 0);
        }
        // else: mid-build — KEEP the live (value, velocity); the re-target below inherits
        // it (the interruptible inheritance).
        reveal.target = 1;
        syncFromReveal();
    }

    // ── B — TRANSITION ────────────────────────────────────────────────────────────
    function transitionTo(onComplete?: () => void): void {
        // Glide the config-transition lerp 0→1 (the viz reads transitionT to lerp its
        // config uniforms each frame — 0 = the outgoing config, 1 = the incoming). Reset
        // to 0 (the start) then target 1 (the fresh glide). PRM snaps the glide (the
        // SmoothProgress respectReducedMotion snap — the glide lands in one frame, the
        // viz config still swaps, the vestibular floor).
        transition.reset(0); // seat the start (the outgoing config)
        transition.setTarget(1); // begin the glide toward the incoming config
        transitionT.value = transition.current;
        transitionDone = onComplete ?? null;
    }

    // ── tick(dt) — the renderer-fed advance (NO own rAF) ──────────────────────────
    function tick(dtMs: number): number {
        if (dtMs > 0) {
            reveal.tickDt(dtMs);
            if (!transition.settled) transition.tickDt(dtMs);
        }
        // A zero/negative dt is a no-op step (a paused/first frame) — we still SYNC the
        // reactive field from the spring's current value (so a PRM snap that happened on
        // a target re-seat is reflected even on a dt=0 frame).
        syncFromReveal();
        transitionT.value = transition.current;
        if (transition.settled && transitionDone) {
            const cb = transitionDone;
            transitionDone = null;
            cb();
        }
        return revealT.value;
    }

    // Re-seat the reveal spring to a (response, ζ) register velocity-continuously. kf
    // SpringProgress carries no register setter, so we construct a fresh spring at the
    // new register seeded with the live (value, velocity) — the trajectory is continuous
    // (the iOS interruptible contract: the new register's solver starts at the live
    // point). The closures read the live `reveal` (a `let` binding), so the re-assignment
    // below is seen everywhere with no indirection.
    function reseatRegister(response: number, dampingFraction: number): void {
        // The no-op fence: a same-register re-seat keeps the live spring untouched (a
        // rapid enter/enter does not reset the trajectory — the velocity-continuous
        // re-target the caller does next inherits it).
        if (response === currentResponse && dampingFraction === currentDamping) return;
        const v = reveal.value;
        const vel = reveal.velocity;
        const target = reveal.target;
        const next = new SpringProgress({
            response,
            dampingFraction,
            initial: v,
            initialVelocity: vel,
            respectReducedMotion: respectPRM,
        });
        next.target = target; // preserve the in-flight target (the trajectory is continuous)
        reveal.dispose();
        reveal = next;
        currentResponse = response;
        currentDamping = dampingFraction;
    }

    onScopeDispose(() => {
        // The reveal spring owns a kf rAF ONLY if .play() were called — we never call it
        // (the one-loop discipline), so dispose() just clears subscribers. The transition
        // SmoothProgress likewise owns no loop (we tickDt it from the viz frame), so stop()
        // is the symmetric teardown (no rAF to cancel, idempotent).
        reveal.dispose();
        transition.stop();
        transitionDone = null;
    });

    return {
        revealT: readonly(revealT),
        opacity: readonly(opacity),
        transitionT: readonly(transitionT),
        transformActive: readonly(transformActive),
        settled: readonly(settled),
        enter,
        leave,
        transitionTo,
        restart,
        tick,
        transitionEasing,
    };
}
