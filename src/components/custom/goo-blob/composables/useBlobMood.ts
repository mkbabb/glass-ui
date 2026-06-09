import { ref, type Ref, readonly } from "vue";
import type { BlobMood, MoodParams } from "../types";
import { easeInOut } from "./easing";

// W11.c — the mood model reframed on a 2-axis {valence, arousal} core (the
// circumplex affect model). Each named mood is a POINT in that space; the
// per-mood MoodParams are DERIVED from valence/arousal by `paramsFor`, so the five
// moods are not hand-tuned in isolation — they read off one principled surface
// (excited = high arousal + high valence, sleepy = low arousal, etc.).
//
// AX.W46 D7 — the manual/auto precedence. `setMood(mood, { source })` records whether
// the retarget came from the autonomic arc (`update` → source "auto") or the public
// expose (source "manual"). A MANUAL setMood arms a `manualOverride` latch that sits
// ABOVE the auto-arc: `update` EARLY-RETURNS while the latch holds, so the autonomic
// `idle/curious/sleepy/excited` drift never clobbers a user-pinned mood. The latch
// RELEASES on a genuine FRESH interaction signal (a click or a pointer-over the live
// canvas), so hovering the live blob still hands control back to the auto-arc. ONE
// precedence rule — manual > auto until interrupted — generalizing the prior one-shot
// `excitedHoldMs` click latch; NOT a parallel mood path, NOT a flag soup. Before this
// `update` drove `setMood` UNCONDITIONALLY every frame, so an imperative `setMood` was
// clobbered back to idle within ~16ms (the shipped expose silently no-op'd — the
// binding-verification class).

interface AffectPoint {
    /** Pleasantness, -1 (unpleasant) .. +1 (pleasant). */
    valence: number;
    /** Activation, 0 (calm/sleepy) .. 1 (energized/excited). */
    arousal: number;
}

const MOOD_AVA: Record<BlobMood, AffectPoint> = {
    idle: { valence: 0.0, arousal: 0.35 },
    happy: { valence: 0.8, arousal: 0.6 },
    curious: { valence: 0.3, arousal: 0.5 },
    sleepy: { valence: -0.1, arousal: 0.1 },
    excited: { valence: 0.7, arousal: 1.0 },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Derive the full MoodParams from a {valence, arousal} point. Arousal drives the
 * motion energy (orbit speed, wobble, pulse rate/amp, noise, the iridescence/SSS
 * sheen); valence warms the palette (hue range, chroma, brightness) and the
 * pointer lean. ONE principled surface — the five named moods are samples of it.
 */
function paramsFor({ valence, arousal }: AffectPoint): MoodParams {
    return {
        orbitSpeedScale: lerp(0.4, 2.2, arousal),
        wobbleScale: lerp(0.5, 2.0, arousal),
        pulseFreq: lerp(0.15, 1.5, arousal),
        pulseAmp: lerp(0.008, 0.05, arousal),
        noiseAmp: lerp(0.015, 0.045, arousal),
        hueRange: lerp(3, 25, arousal * 0.6 + (valence * 0.5 + 0.5) * 0.4),
        satShift: lerp(-0.05, 0.1, valence * 0.5 + 0.5),
        brightnessShift: lerp(-0.03, 0.08, valence * 0.5 + 0.5),
        // `smoothK` is a unitless, 1.0-CENTRED MULTIPLIER on the config's absolute
        // smin band (NOT an absolute distance) — the config holds the one length
        // authority (`BLOB_CONFIG_DEFAULTS.smoothK`, POS_SCALE'd in the renderer),
        // mood only scales it. Excited (high arousal) merges gooier, sleepy (low
        // arousal) crisper; idle sits ≈ 1.0 (arousal 0.35 → ~1.03). The range is the
        // prior absolute 0.16–0.32 lerp re-expressed around 1.0 (~5× down) so the smin
        // band stays inside the contained-droplet seam-pull at BOTH arousal extremes.
        smoothK: lerp(0.85, 1.35, arousal),
        // Pleasant + activated leans IN; unpleasant shies AWAY.
        //
        // AX.W46 D5 — the arousal multiplier is FLATTENED (`0.4 + 0.6·arousal` →
        // `0.7 + 0.15·arousal`). The old multiplier reached 1.0 at full arousal, so a
        // plain hover (which auto-promotes to `curious`, arousal 0.5) scaled the pointer
        // attraction UP and COMPOUNDED with the config `pointerStrength` into the lunge
        // the live π-lane flagged. The flattened band (0.775 at curious, 0.85 at
        // excited) keeps the auto-`curious` hover lean CALM — the mood still warms the
        // attraction with arousal, but it no longer auto-jumps a hover toward the
        // excited-regime lean. The lean magnitude now lives in `config.pointerStrength`
        // (0.18), not a mood-compounded multiplier.
        pointerAttraction: lerp(-0.2, 0.6, valence * 0.5 + 0.5) * (0.7 + 0.15 * arousal),
        // Energized = faster merge cycling (lower stagger scale).
        mergeRate: lerp(2.0, 0.3, arousal),
        // The iridescence/SSS sheen intensity (excited shimmers, sleepy is calm —
        // NOT flat: sleepy stays ALIVE at ~0.55, an `arousal=0` blob reads asleep,
        // not dead). AX.W15: with lit/iridescence/SSS now DEFAULT-ON, this multiplier
        // is load-bearing for the FIRST time — the excited CEILING drops 1.8 → 1.35
        // so the excited extreme stays a WARM wet bead, never an over-saturated neon
        // thin-film on the now-default-lit warm body.
        iridScale: lerp(0.55, 1.35, arousal),
    };
}

const MOOD_TARGETS: Record<BlobMood, MoodParams> = {
    idle: paramsFor(MOOD_AVA.idle),
    happy: paramsFor(MOOD_AVA.happy),
    curious: paramsFor(MOOD_AVA.curious),
    sleepy: paramsFor(MOOD_AVA.sleepy),
    excited: paramsFor(MOOD_AVA.excited),
};

const TRANSITION_MS: Record<BlobMood, number> = {
    idle: 1500,
    happy: 1200,
    curious: 800,
    sleepy: 2500,
    excited: 600,
};

function lerpParams(a: MoodParams, b: MoodParams, t: number): MoodParams {
    const mix = (x: number, y: number) => x + (y - x) * t;
    return {
        orbitSpeedScale: mix(a.orbitSpeedScale, b.orbitSpeedScale),
        wobbleScale: mix(a.wobbleScale, b.wobbleScale),
        pulseFreq: mix(a.pulseFreq, b.pulseFreq),
        pulseAmp: mix(a.pulseAmp, b.pulseAmp),
        noiseAmp: mix(a.noiseAmp, b.noiseAmp),
        hueRange: mix(a.hueRange, b.hueRange),
        satShift: mix(a.satShift, b.satShift),
        brightnessShift: mix(a.brightnessShift, b.brightnessShift),
        smoothK: mix(a.smoothK, b.smoothK),
        pointerAttraction: mix(a.pointerAttraction, b.pointerAttraction),
        mergeRate: mix(a.mergeRate, b.mergeRate),
        iridScale: mix(a.iridScale, b.iridScale),
    };
}

/** Idle timeout (ms of no pointer) after which the blob drifts to `sleepy`. */
const IDLE_SLEEP_MS = 6000;

/** The interaction signals `update` reads to drive the auto-mood arc. */
export interface MoodInteraction {
    /** The pointer is over the blob (drives `curious`). */
    pointerActive: boolean;
    /** A click landed this frame (drives a one-shot `excited`). */
    clicked: boolean;
    /** ms since the last pointer activity (drives `sleepy` past IDLE_SLEEP_MS). */
    idleMs: number;
}

/**
 * Who is driving a `setMood` retarget (AX.W46 D7). `"auto"` — the autonomic arc
 * (`update` from the pointer/idle state); `"manual"` — the public expose (an imperative
 * `setMood` from a consumer / the demo mood pills). A manual retarget arms the
 * `manualOverride` latch the auto-arc respects.
 */
export type MoodSource = "auto" | "manual";

/** The options bag for `setMood` — the source discriminant (default `"manual"`). */
export interface SetMoodOptions {
    /** Who is driving the retarget. Defaults to `"manual"` (the public-expose default). */
    source?: MoodSource;
}

/**
 * Animates the blob's mood parameters — a cross-fade between named mood targets
 * driven per frame by `tick(dt)`. `setMood(mood, { source })` retargets (a `"manual"`
 * source — the default — pins the mood above the auto-arc, AX.W46 D7);
 * `update(interaction)` drives the AUTONOMIC arc from the AW.W10 pointer/idle state
 * (curious on approach, excited on click, sleepy after inactivity), always
 * `source: "auto"`, and early-returns while a manual mood is pinned; `params` is the
 * eased current value the renderer reads.
 */
export function useBlobMood() {
    const currentMood = ref<BlobMood>("idle");
    const params = ref<MoodParams>({ ...MOOD_TARGETS.idle });

    let fromParams: MoodParams = { ...MOOD_TARGETS.idle };
    let toParams: MoodParams = { ...MOOD_TARGETS.idle };
    let transitionElapsed = 0;
    let transitionDuration = 0;
    let transitioning = false;
    // A one-shot `excited` latch — a click holds excited briefly before it relaxes.
    let excitedHoldMs = 0;
    // AX.W46 D7 — the manual-mood latch (the generalization of `excitedHoldMs` from a
    // one-shot timed hold into a held override). `true` while a manual `setMood` is
    // pinned; `update` early-returns and does NOT auto-drive over it. Released on a
    // genuine fresh interaction signal (a fresh click or pointer-over the live canvas),
    // so hovering the live blob hands control back to the autonomic arc.
    let manualOverride = false;
    // The last-frame `pointerActive` — so `update` can detect a RISING-EDGE pointer-over
    // (a fresh entry releases the latch ONCE; a held hover does not keep re-releasing).
    let prevPointerActive = false;
    // AX.W16 (arm 2) — the last `idleMs` seen by `update`. A PENDING idle→sleepy
    // auto-mood arc (`idleMs` not yet past IDLE_SLEEP_MS while the current mood is not
    // already sleepy) must keep the quiescence loop ALIVE so the arc actually FIRES
    // (the "scheduled, not polled" hazard — a parked loop never re-evaluates `update`).
    // `isSettled` reads this; the renderer's wake scheduler reads `nextAutoMoodMs`.
    let lastIdleMs = 0;

    function setMood(mood: BlobMood, options: SetMoodOptions = {}) {
        // A MANUAL retarget arms the override latch ABOVE the auto-arc (AX.W46 D7) —
        // recorded BEFORE the no-op early-return so re-pinning the CURRENT mood still
        // (re-)arms the latch (a deliberate user pin must hold even if the mood matches).
        if ((options.source ?? "manual") === "manual") manualOverride = true;
        if (mood === currentMood.value && !transitioning) return;
        currentMood.value = mood;
        fromParams = { ...params.value };
        toParams = MOOD_TARGETS[mood];
        transitionDuration = TRANSITION_MS[mood];
        transitionElapsed = 0;
        transitioning = true;
    }

    /**
     * Wire the mood from the interaction/idle state (W11.c). Priority: a fresh
     * click → `excited` (held briefly); pointer over → `curious`; long idle →
     * `sleepy`; otherwise `idle`. The internal AUTONOMIC caller of `setMood` (always
     * `source: "auto"`).
     *
     * AX.W46 D7 — the manual-override precedence. A genuine FRESH interaction signal —
     * a fresh `clicked`, OR a RISING-EDGE `pointerActive` (the pointer just entered the
     * live canvas this frame) — RELEASES a pinned manual mood and hands control back to
     * the autonomic arc. While the latch holds (no fresh interaction), `update`
     * EARLY-RETURNS so it never auto-drives over a user-pinned mood. The rising-edge
     * test (not bare `pointerActive`) means a CONTINUOUSLY-held hover releases ONCE then
     * lets the auto-arc drive; an idle frame can never release the latch.
     */
    function update(interaction: MoodInteraction) {
        lastIdleMs = interaction.idleMs;

        const freshPointer = interaction.pointerActive && !prevPointerActive;
        prevPointerActive = interaction.pointerActive;
        if (manualOverride && (interaction.clicked || freshPointer)) {
            manualOverride = false; // a fresh live interaction reclaims the auto-arc
        }
        if (manualOverride) return; // a user-pinned mood holds; the arc does not drive

        if (interaction.clicked) {
            excitedHoldMs = 900; // hold excited ~0.9s after a click
            setMood("excited", { source: "auto" });
            return;
        }
        if (excitedHoldMs > 0) return; // stay excited until the latch decays
        if (interaction.pointerActive) {
            setMood("curious", { source: "auto" });
        } else if (interaction.idleMs > IDLE_SLEEP_MS) {
            setMood("sleepy", { source: "auto" });
        } else {
            setMood("idle", { source: "auto" });
        }
    }

    /**
     * AX.W16 (arm 2) — the mood is SETTLED (the quiescence loop may park) when it is
     * NOT mid-transition, NOT holding an excited latch, AND has no PENDING auto-mood
     * arc. The pending arc: the current mood is not yet `sleepy` and the last-seen
     * `idleMs` is below IDLE_SLEEP_MS — i.e. an idle→sleepy retarget is still due. The
     * renderer keeps the loop alive (or wakes it at `nextAutoMoodMs`) until the arc
     * fires, so the scheduled mood drift is never starved by a parked loop.
     *
     * AX.W46 D7 — a MANUAL override pinned to a NON-idle mood is NOT settled: its
     * distinct mood animation (a faster orbit on `excited`, a calmer one on `sleepy`,
     * the brighter sheen on `happy`) must keep rendering rather than the loop parking
     * the moment the cross-fade completes — and the latch suppresses the auto-arc's
     * idle→sleepy drift (`update` early-returns), so without this the pinned mood would
     * be silently dragged toward an idle-then-parked steady state. A pinned `idle` IS
     * settled (idle is the rest pose). When NOT overridden the auto-arc owns the verdict.
     */
    function isSettled(): boolean {
        if (transitioning || excitedHoldMs > 0) return false;
        if (manualOverride && currentMood.value !== "idle") return false;
        const sleepyArcPending =
            !manualOverride &&
            currentMood.value !== "sleepy" &&
            lastIdleMs < IDLE_SLEEP_MS;
        return !sleepyArcPending;
    }

    /**
     * The wall-ms until the next AUTO-MOOD retarget is due (the idle→sleepy arc), so
     * the renderer's wake scheduler re-arms the parked loop in time for it. Returns
     * `Infinity` when no arc is pending (already sleepy / transitioning / held / a
     * manual override pins the mood — AX.W46 D7: the auto-arc does not drive, so there
     * is no auto-mood retarget to wake for).
     */
    function nextAutoMoodMs(): number {
        if (transitioning || excitedHoldMs > 0 || manualOverride) return Infinity;
        if (currentMood.value === "sleepy") return Infinity;
        return Math.max(0, IDLE_SLEEP_MS - lastIdleMs);
    }

    function tick(dt: number) {
        if (excitedHoldMs > 0) excitedHoldMs = Math.max(0, excitedHoldMs - dt);
        if (!transitioning) return;
        transitionElapsed += dt;
        const raw = Math.min(transitionElapsed / transitionDuration, 1);
        const t = easeInOut(raw);
        params.value = lerpParams(fromParams, toParams, t);
        if (raw >= 1) transitioning = false;
    }

    return {
        currentMood: readonly(currentMood) as Readonly<Ref<BlobMood>>,
        params: readonly(params) as Readonly<Ref<MoodParams>>,
        setMood,
        update,
        tick,
        /** AX.W16 — the quiescence at-rest predicate the renderer's demand gate reads. */
        isSettled,
        /** AX.W16 — wall-ms to the next auto-mood retarget (the wake horizon). */
        nextAutoMoodMs,
    };
}

export type BlobMoodSystem = ReturnType<typeof useBlobMood>;
