import { onBeforeUnmount, onMounted } from "vue";
import type { Ref } from "vue";
import { useHoldToken } from "../../_shared/overlay";
import { useOptionalDockContext } from "./dockContext";

/**
 * Host-native dock hold.
 *
 * `keepDockOpen` is a FIRST-CLASS, synchronous morph-state input to the dock's
 * one state machine: while a continuous pointer/touch gesture is live on a
 * descendant control, the dock holds open (idle-collapse suppressed) and the
 * dock's `held` edge lights `data-held` on the dock root AND the control for the
 * thumb-halo intensification.
 *
 * THIS ACQUIRE IS THE HAND. It is the only path in the library driven by an actual
 * pointer going down, so it is the one the GRASP register (glass/grasp.css) is
 * sourced from: the token it takes is `keepOpen("grasp")`, which lights the dock's
 * `held` edge as well as holding posture. The returned `isHeld` is this host's OWN
 * live-hold flag — it flips with the finger whether or not a dock is present, so a
 * STANDALONE control engages on its own drag and a control inside a dock does NOT
 * co-engage off a sibling's hold.
 *
 * Why NATIVE host listeners (not a Vue `@pointerdown` template binding):
 * reka-ui's `<SliderRoot>` is a FORWARDING component — it renders through a
 * `CollectionSlot` + `resolveDynamicComponent` (SliderHorizontal/Vertical) +
 * `forwardRef` chain and binds its OWN cached `onPointerdown`
 * (`SliderRoot.js → SliderImpl.js`, which calls `setPointerCapture`). A consumer
 * `@pointerdown` arrives as `$attrs.onPointerdown` and is DROPPED across that
 * Slot/forwardRef boundary — vue-tsc + units pass, only a real drag catches it
 * (the canonical binding-verification class, `feedback_glass_ui_binding_*`). A
 * native `addEventListener` on the RESOLVED host element is immune: the event
 * always reaches the DOM node the user actually presses. This host-native behavior is
 * preferable to a Reka `dragging`-ref subscription, which Reka does not publicly expose
 * and which would re-introduce the same forwarding fragility).
 *
 * The hold is INSTANT-ON (Apple "Building Fluid Interfaces", facet 5): the first
 * line `keepOpen()` is capture-independent and synchronous, so the halo +
 * substrate tier-shade light the instant the pointer goes down (under the ~100ms
 * perception threshold — reads as instant); the spring governs only the settle.
 *
 * The release window is window-scoped `pointerup`/`pointercancel`: reka
 * `setPointerCapture`-retargets the move/up to the captured element, which
 * bubbles to `window`, so a release anywhere ends the hold. The touch parity
 * folds onto the SAME single acquire — one owner, one acquire path (no second
 * hold path, no parallel `touchGate` watch).
 *
 * DI: consumes the EXISTING typed `DockContext` via `useOptionalDockContext()`
 * through the `keepOpen` and `release` pair. A control rendered OUTSIDE a
 * `<GlassDock>` gets the befitting-silent default (no dock) — the DOCK half is a
 * no-op, a primitive may legitimately render outside a dock. The HAND half is not
 * conditional on it: the returned edge tracks the pointer either way, which is what
 * lets a standalone `<Slider>` grasp.
 */

export interface UseDockHoldOptions {
    /**
     * Whether the hold is armed. A reactive getter so a consumer prop
     * (`keepDockOpen`) can disarm it without re-instantiating the composable.
     * Defaults to always-armed.
     */
    enabled?: () => boolean;
}

export interface UseDockHoldReturn {
    /**
     * `true` while THIS host's own pointer hold is live — from the native
     * `pointerdown`/`touchstart` acquire to the window-scoped release. Dock-free by
     * construction: a control outside a `<GlassDock>` still reports its own hand,
     * and a control inside one never reports a sibling's.
     */
    isHeld: Ref<boolean>;
}

/**
 * @param resolveHost A getter that resolves the REAL host element to attach the
 *   native listeners to. Called inside `onMounted` (template refs are populated
 *   before `onMounted` fires), so a reka forwardRef host (`SliderRoot.$el`) is
 *   live by then. A getter — not a `Ref` — sidesteps the cross-composable
 *   `onMounted`-ordering trap (a sibling `onMounted` that populates a ref runs
 *   AFTER this one).
 */
export function useDockHold(
    resolveHost: () => HTMLElement | null,
    options: UseDockHoldOptions = {},
): UseDockHoldReturn {
    const dock = useOptionalDockContext();
    const armed = options.enabled ?? (() => true);

    // ONE acquire flag — the single source of truth for whether THIS host holds a
    // token. The native pointer + touch listeners drive the same flag, so a
    // pointer-down then a stray touch (or vice versa) cannot double-acquire. The
    // flag IS the host's grasp edge, returned to the consumer: the dock token is a
    // side effect of the hand, not its definition, so it flips with no dock in
    // scope.
    // A pointer hold is a GRASP: it takes the posture count (no idle-collapse
    // mid-gesture) and the grasp count (the edge the material answers). The token
    // DISCIPLINE — acquire once, release once, release on teardown — is
    // `_shared/overlay`'s, shared with the other three holders; what stood here was
    // one of four hand-rolled copies of it.
    const token = useHoldToken(() => dock, "grasp");
    const held = token.isHeld;

    function acquire(): void {
        if (!armed()) return;
        token.acquire();
    }

    const release = token.release;

    // Window-scoped release: reka retargets the captured pointer's up/cancel to
    // the captured element, which bubbles to `window` — so a release wherever the
    // gesture ends still fires. Installed once on the first press, removed on the
    // matching release (kept off `window` at rest).
    function onWindowRelease(): void {
        release();
        if (typeof window === "undefined") return;
        window.removeEventListener("pointerup", onWindowRelease);
        window.removeEventListener("pointercancel", onWindowRelease);
        window.removeEventListener("blur", onWindowRelease);
    }

    function onPress(): void {
        acquire();
        if (typeof window === "undefined") return;
        // Idempotent re-add: removing first avoids a duplicate listener if a press
        // re-fires before a release (e.g. a touch then a synthesized pointer).
        window.removeEventListener("pointerup", onWindowRelease);
        window.removeEventListener("pointercancel", onWindowRelease);
        window.removeEventListener("blur", onWindowRelease);
        window.addEventListener("pointerup", onWindowRelease);
        window.addEventListener("pointercancel", onWindowRelease);
        window.addEventListener("blur", onWindowRelease);
    }

    let host: HTMLElement | null = null;

    onMounted(() => {
        host = resolveHost();
        if (!host) return;
        // Native listeners on the RESOLVED host element — immune to the reka
        // forwarding-drop. Both press kinds drive the SAME single acquire.
        host.addEventListener("pointerdown", onPress);
        host.addEventListener("touchstart", onPress, { passive: true });
    });

    onBeforeUnmount(() => {
        // Teardown safety net: if the gesture is mid-flight on unmount (the host
        // teleported into a dock portal, or the slider unmounted under a held
        // thumb), release the token so the dock's `keepOpenCount` can never leak.
        if (host) {
            host.removeEventListener("pointerdown", onPress);
            host.removeEventListener("touchstart", onPress);
        }
        if (typeof window !== "undefined") {
            window.removeEventListener("pointerup", onWindowRelease);
            window.removeEventListener("pointercancel", onWindowRelease);
            window.removeEventListener("blur", onWindowRelease);
        }
        release();
    });

    return { isHeld: held };
}
