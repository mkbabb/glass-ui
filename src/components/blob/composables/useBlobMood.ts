import { ref, type Ref, readonly } from "vue";
import type { BlobMood, MoodParams } from "../types";
import { IDLE_SLEEP_MS, MOOD_TARGETS, TRANSITION_MS } from "../constants";
import { easeInOut } from "./easing";

// The mood model reframed on a 2-axis {valence, arousal} core (the
// circumplex affect model). Each named mood is a POINT in that space; the
// per-mood MoodParams are DERIVED from valence/arousal by `paramsFor`, so the five
// moods are not hand-tuned in isolation — they read off one principled surface
// (excited = high arousal + high valence, sleepy = low arousal, etc.).
//
// Manual/auto precedence. `setMood(mood, { source })` records whether
// the retarget came from the autonomic arc (`update` → source "auto") or the public
// expose (source "manual"). A MANUAL setMood arms a `manualOverride` latch that sits
// ABOVE the auto-arc: `update` EARLY-RETURNS while the latch holds, so the autonomic
// `idle/curious/sleepy/excited` drift never clobbers a user-pinned mood. The latch
// RELEASES on a genuine FRESH interaction signal (a click or a pointer-over the live
// canvas), so hovering the live blob still hands control back to the auto-arc. ONE
// precedence rule — manual > auto until interrupted — NOT a parallel mood path, NOT a
// flag soup. Without the latch, `update` driving `setMood` UNCONDITIONALLY every frame
// would clobber an imperative `setMood` back to idle within ~16ms (the
// binding-verification class).

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
 * Who is driving a `setMood` retarget. `"auto"` — the autonomic arc
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
 * source — the default — pins the mood above the auto arc;
 * `update(interaction)` drives the autonomic arc from pointer and idle state
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
    // Manual-mood latch (the generalization of `excitedHoldMs` from a
    // one-shot timed hold into a held override). `true` while a manual `setMood` is
    // pinned; `update` early-returns and does NOT auto-drive over it. Released on a
    // genuine fresh interaction signal (a fresh click or pointer-over the live canvas),
    // so hovering the live blob hands control back to the autonomic arc.
    let manualOverride = false;
    // The last-frame `pointerActive` — so `update` can detect a RISING-EDGE pointer-over
    // (a fresh entry releases the latch ONCE; a held hover does not keep re-releasing).
    let prevPointerActive = false;
    // Last `idleMs` seen by `update`. A pending idle→sleepy
    // auto-mood arc (`idleMs` not yet past IDLE_SLEEP_MS while the current mood is not
    // already sleepy) must keep the quiescence loop ALIVE so the arc actually FIRES
    // (the "scheduled, not polled" hazard — a parked loop never re-evaluates `update`).
    // `isSettled` reads this; the renderer's wake scheduler reads `nextAutoMoodMs`.
    let lastIdleMs = 0;

    function setMood(mood: BlobMood, options: SetMoodOptions = {}) {
        // A manual retarget arms the override latch above the auto arc;
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
     * Wire the mood from the interaction/idle state. Priority: a fresh
     * click → `excited` (held briefly); pointer over → `curious`; long idle →
     * `sleepy`; otherwise `idle`. The internal AUTONOMIC caller of `setMood` (always
     * `source: "auto"`).
     *
     * Manual-override precedence. A fresh interaction signal
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
     * The mood is settled (and the quiescence loop may park) when it is
     * NOT mid-transition, NOT holding an excited latch, AND has no PENDING auto-mood
     * arc. The pending arc: the current mood is not yet `sleepy` and the last-seen
     * `idleMs` is below IDLE_SLEEP_MS — i.e. an idle→sleepy retarget is still due. The
     * renderer keeps the loop alive (or wakes it at `nextAutoMoodMs`) until the arc
     * fires, so the scheduled mood drift is never starved by a parked loop.
     *
     * A manual override pinned to a non-idle mood is not settled: its
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
     * manual override pins the mood: the auto arc does not drive, so there
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
        /** Quiescence predicate read by the renderer's demand gate. */
        isSettled,
        /** Milliseconds to the next automatic mood retarget. */
        nextAutoMoodMs,
    };
}

export type BlobMoodSystem = ReturnType<typeof useBlobMood>;
