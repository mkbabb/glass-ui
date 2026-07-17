// The GlassDock CLICK-INTEGRITY guard. The architectural fix for
// the two manifestations of the collapsed-tap / hover-approach MORPH-RACE a
// consumer reproduced with real input:
//
//   (a) TOUCH pass-through. A tap on a COLLAPSED dock expands it AND lets the
//       browser's native tap→click compatibility event flow to the control under
//       the finger (the iOS Now-Playing single-tap contract — useDockState shape
//       B′). But the expand swaps the summary layer out for the full layer
//       SYNCHRONOUSLY, so the compat click lands at the SAME COORDINATES on a
//       DIFFERENT element (in a consumer deck: a Home link under a gear tap →
//       navigate-away).
//   (b) FINE-POINTER morph-race. An approach-then-click DURING the hover-expand
//       FLIP lands the click on the EXPANDED layer's control at the old
//       coordinates (the deck's gear click ADVANCED THE SLIDE; the gear's own
//       popover never opened).
//
// Both reduce to ONE root cause: a click whose target's IDENTITY changed under the
// pointer between pointerdown and click, because the layer swap moved a different
// control under the (stationary) pointer. The fix is therefore ONE mechanism, not
// two: scope the pass-through to the TAPPED ELEMENT'S IDENTITY.
//
// THE GUARD. A capture-phase `pointerdown` on the dock root records the element
// under the pointer at press time (`pressTarget`) and whether the dock was
// collapsed then (`pressedWhileCollapsed`). The subsequent capture-phase `click`:
//   • if the dock is mid-morph (`[data-morphing]` armed) OR within the settle
//     ENVELOPE after a collapsed→expanded flip (`MORPH_SETTLE_MS` floor), AND
//   • the click's target identity DIFFERS from `pressTarget` (and pressTarget is
//     not an ancestor/descendant of it — the swap put a different control there),
//   → the click is SWALLOWED (`stopPropagation` + `preventDefault`).
// A click whose target MATCHES the pressed element (the same control survived the
// morph, or a settled click on a stable control) passes through untouched — the
// pass-through is scoped to identity, NEVER to post-swap coordinates.
//
// This makes the consumer's interim arms (the `@touchend.prevent` +
// 320ms capture-phase guard keyed off the exposed `expanded` ref) UNNECESSARY: the
// guard lives inside GlassDock. The exposed `expanded` ref STAYS exposed (a
// protected binary-consumer surface) — the consumer simply no longer needs a guard
// keyed off it. A dock that never morphs (always-expanded) never arms the guard, so
// its clicks are byte-identical to before.

import { onBeforeUnmount, readonly, ref, watch, type Ref } from "vue";
import { MORPH_SETTLE_MS } from "../constants";

export interface DockClickIntegrity {
    /** Capture-phase `pointerdown` handler — records the press-time element + state. */
    onPointerDownCapture: (event: PointerEvent) => void;
    /** Capture-phase `pointercancel` handler — clears an abandoned press identity. */
    onPointerCancelCapture: () => void;
    /** Capture-phase `click` handler — swallows an identity-changed post-swap click. */
    onClickCapture: (event: MouseEvent) => void;
    /** Mark the collapsed→expanded flip so the settle window opens (call on expand). */
    markExpandFlip: () => void;
    /** The outer pane retained for the witnessed press, or null. */
    pressKeepaliveLayer: Readonly<Ref<"full" | null>>;
}

export interface UseDockClickIntegrityOptions {
    /** The dock root element ref — the morph-state owner (`[data-morphing]`). */
    rootEl: Ref<HTMLElement | null>;
    /** `true` whenever the dock is visually expanded (collapsed = !this). */
    visualExpanded: Ref<boolean>;
}

/**
 * The dock click-integrity guard. Returns the three capture-phase handlers
 * the GlassDock SFC wires onto its root. The guard is a pure DOM-timing concern: it
 * holds the press-time element identity + the settle-window deadline and decides, on
 * the click, whether the click landed on the SAME control it was aimed at. Owns its
 * own unmount cleanup.
 */
export function useDockClickIntegrity(
    options: UseDockClickIntegrityOptions,
): DockClickIntegrity {
    const { rootEl, visualExpanded } = options;

    // The element under the pointer at the most recent pointerdown — the identity the
    // pass-through is scoped to. Null when no press is in flight.
    let pressTarget: EventTarget | null = null;
    // Was the dock collapsed at press time? A press-while-collapsed is the tap-to-
    // expand case (the touch manifestation); a press-while-expanded that still races a
    // morph is the fine-pointer manifestation — both are guarded, this only records
    // the provenance for the settle-window arming.
    let pressedWhileCollapsed = false;
    // Was the box ACTIVELY morphing at the most recent pointerdown? A press that
    // begins mid-morph is a race by construction (the approach-hover already swapped
    // the layer, but the layout is still moving), so its click defers even when the
    // pressed/clicked element identity matches. Reset on every click.
    let pressedDuringMorph = false;
    // The settle-window deadline (performance.now() ms). A collapsed→expanded flip
    // opens the window; a click after it (and after the morph settles) is genuine.
    let settleDeadline = 0;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    const pressKeepaliveLayer = ref<"full" | null>(null);
    let pressControl: HTMLElement | null = null;
    const inertedBranches: Array<{ element: HTMLElement; wasInert: boolean }> = [];

    function clearPressKeepalive(): void {
        pressControl?.removeAttribute("data-dock-press-origin");
        pressControl = null;
        for (const { element, wasInert } of inertedBranches.splice(0)) {
            element.toggleAttribute("inert", wasInert);
        }
        pressKeepaliveLayer.value = null;
    }

    function armPressKeepalive(target: EventTarget | null): void {
        const element = target instanceof Element ? target : null;
        const control = element?.closest<HTMLElement>(
            "button, a[href], input, select, textarea, [role='button'], [tabindex]",
        );
        const pane = control?.closest<HTMLElement>(".dock-layer--full");
        if (!control || !pane || !rootEl.value?.contains(pane)) return;

        pressControl = control;
        control.setAttribute("data-dock-press-origin", "");
        pressKeepaliveLayer.value = "full";

        for (let branch: HTMLElement = control; branch !== pane;) {
            const parent = branch.parentElement;
            if (!parent) break;
            for (const sibling of parent.children) {
                if (sibling === branch || !(sibling instanceof HTMLElement)) continue;
                inertedBranches.push({ element: sibling, wasInert: sibling.inert });
                sibling.inert = true;
            }
            branch = parent;
        }
    }

    function clearSettleTimer() {
        if (settleTimer !== null) {
            clearTimeout(settleTimer);
            settleTimer = null;
        }
    }

    /** The collapsed→expanded flip opens the settle window (called from the SFC's
        expand path — a tap-expand or a hover/focus expand). The window is the floor
        backstop; `[data-morphing]` is the live primary. */
    function markExpandFlip(): void {
        settleDeadline = now() + MORPH_SETTLE_MS;
        clearSettleTimer();
        // A timer is NOT strictly needed for the decision (the click handler reads the
        // deadline + the live attribute), but parking it on unmount keeps the closure
        // honest; the timer simply lets the deadline lapse cleanly.
        settleTimer = setTimeout(() => {
            settleTimer = null;
        }, MORPH_SETTLE_MS);
    }

    function now(): number {
        return typeof performance !== "undefined" && typeof performance.now === "function"
            ? performance.now()
            : Date.now();
    }

    /** Is the dock currently in a settle window — a morph in flight, or within the
        post-flip envelope? Either is the "a swap may have moved a control under the
        pointer" condition. */
    function inSettleWindow(): boolean {
        const root = rootEl.value;
        if (root && root.hasAttribute("data-morphing")) return true;
        return now() < settleDeadline;
    }

    /** Is a morph ACTIVELY in flight right now (the box geometry is still moving)? */
    function morphInFlight(): boolean {
        const root = rootEl.value;
        return !!root && root.hasAttribute("data-morphing");
    }

    function onPointerDownCapture(event: PointerEvent): void {
        clearPressKeepalive();
        pressTarget = event.target;
        pressedWhileCollapsed = !visualExpanded.value;
        // A press that BEGINS while the box is still morphing is a race by
        // construction (the approach-hover already swapped the layer, but the layout
        // is unstable — the control under the finger is mid-flight). Recorded so the
        // click decision can DEFER it regardless of identity.
        pressedDuringMorph = morphInFlight();
    }

    watch(visualExpanded, (expanded, wasExpanded) => {
        if (wasExpanded && !expanded && pressTarget) armPressKeepalive(pressTarget);
    });

    function onPointerCancelCapture(): void {
        clearPressKeepalive();
        pressTarget = null;
        pressedWhileCollapsed = false;
        pressedDuringMorph = false;
    }

    /** Identity match: is `clicked` the SAME element pressed, or in the same
        control lineage (an icon inside the button the user pressed, or the button
        around the icon)? A lineage match means the SAME control survived the morph —
        the press genuinely landed on it. */
    function sameControlIdentity(clicked: EventTarget | null): boolean {
        if (!pressTarget || !clicked) return false;
        if (clicked === pressTarget) return true;
        const a = pressTarget instanceof Node ? pressTarget : null;
        const b = clicked instanceof Node ? clicked : null;
        if (!a || !b) return false;
        // Same lineage: one contains the other (icon↔button, label↔control). The
        // closest interactive ancestor is the real control; a glyph swap inside the
        // same button is NOT a different control.
        return a.contains(b) || b.contains(a);
    }

    function onClickCapture(event: MouseEvent): void {
        clearPressKeepalive();
        const pressedDuringMorphSnapshot = pressedDuringMorph;
        pressedDuringMorph = false;
        // Only guard while a swap could have moved a control under the pointer — a
        // morph in flight or the post-flip settle envelope. At rest every click is
        // genuine (the steady-state path is untouched).
        if (!inSettleWindow()) {
            pressTarget = null;
            return;
        }
        // NO WITNESSED PRESS → NEVER SWALLOW. A click with no preceding pointerdown
        // we observed (assistive-tech activation, keyboard-synthesized click, a
        // touch stack that emitted only Touch events) carries no race context — the
        // guard judges only gestures it saw begin. Swallowing here would break AT
        // activation and the iOS one-tap contract.
        if (!pressTarget && !pressedDuringMorphSnapshot) {
            return;
        }
        // THE iOS ONE-TAP CONTRACT comes FIRST: a press that began AT
        // REST (not mid-morph) on a control that SURVIVED into the click — the
        // collapsed pill's live Play button, the Now-Playing mini-bar tap — is a
        // genuine activation even while the expand it triggered is still in flight.
        // The user aimed at a real, stationary control; the morph is the RESULT of
        // their tap, not a race that preceded it. Pass it through.
        if (!pressedDuringMorphSnapshot && sameControlIdentity(event.target)) {
            pressTarget = null;
            return;
        }
        void pressedWhileCollapsed;
        // (b) THE FINE-POINTER RACE. A press that BEGAN mid-morph is a race even when
        // identity matches: the approach-hover swapped the layer under the stationary
        // pointer BEFORE the press, so identity "matches" a control the user never
        // aimed at. And any identity-MISMATCHED click inside the window is the swap
        // putting a different control under the point (gear-tap → Home/Next/Play).
        // Both DEFER/swallow (the audit's "resolve against the pre-morph target or
        // defer until settle") — the user's next click on the settled dock works.
        event.stopPropagation();
        event.preventDefault();
        pressTarget = null;
    }

    onBeforeUnmount(() => {
        clearSettleTimer();
        clearPressKeepalive();
    });

    return {
        onPointerDownCapture,
        onPointerCancelCapture,
        onClickCapture,
        markExpandFlip,
        pressKeepaliveLayer: readonly(pressKeepaliveLayer),
    };
}
