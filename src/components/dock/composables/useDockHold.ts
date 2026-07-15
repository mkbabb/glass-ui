import { onBeforeUnmount, onMounted } from "vue";
import type { ComputedRef } from "vue";
import { useOptionalDockContext } from "./dockContext";

/**
 * AX.W03 — the host-native dock hold.
 *
 * `keepDockOpen` is a FIRST-CLASS, synchronous morph-state input to the dock's
 * one state machine: while a continuous pointer/touch gesture is live on a
 * descendant control, the dock holds open (idle-collapse suppressed) and the
 * dock's `held` edge lights `data-held` on the dock root AND the control for the
 * thumb-halo intensification.
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
 * always reaches the DOM node the user actually presses. This is the
 * device-proven fix (AX.W03 §Scope.1/2 — slice-2 F0/F2; ratified host-native
 * over a reka `dragging`-ref subscription, which reka does not publicly expose
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
 * (the `keepOpen`/`release` pair, O.W2 single-typed-key collapse). A control
 * rendered OUTSIDE a `<GlassDock>` gets the befitting-silent default (no dock) —
 * every hook is a no-op, a primitive may legitimately render outside a dock.
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
    /** `true` whenever the dock observes ≥1 held token (the `data-held` edge). */
    isHeld: ComputedRef<boolean> | undefined;
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
    // pointer-down then a stray touch (or vice versa) cannot double-acquire.
    let acquired = false;

    function acquire(): void {
        if (!armed() || acquired || !dock) return;
        dock.keepOpen();
        acquired = true;
    }

    function release(): void {
        if (!acquired || !dock) return;
        dock.release();
        acquired = false;
    }

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

    return { isHeld: dock?.held };
}
