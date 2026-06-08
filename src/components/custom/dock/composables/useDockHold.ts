import {
    computed,
    onBeforeUnmount,
    onMounted,
    watch,
    type ComputedRef,
    type Ref,
} from "vue";
import { useTouchGate } from "../../../../composables/dom/useTouchGate";
import { useOptionalDockContext } from "./dockContext";

/**
 * AX.W03 — the host-native dock hold. ONE owner, ONE acquire path.
 *
 * The keepDockOpen contract had NEVER worked through a real reka-ui drag: the
 * `@pointerdown`/`@touchstart` template bindings on `<SliderRoot>` land in
 * `$attrs` (SliderRoot is `inheritAttrs:false`) and are DROPPED across the reka
 * Slot/forwardRef boundary — reka's own `onPointerdown` shadows them on the
 * resolved `data-slider-impl` host. vue-tsc + units PASS; only a real event on
 * the resolved host catches it (the canonical binding-verification class,
 * `feedback_glass_ui_binding_verification.md`).
 *
 * The fix is the device-proven root: in `onMounted`, resolve the host element
 * (the consumer's `getRootEl()` seam — live-proven to receive the event) and
 * attach NATIVE `addEventListener('pointerdown' | 'touchstart' | …)` on THAT
 * element. The hold is a SYNCHRONOUS reactive edge into the dock's ONE state
 * machine (AX.W01/W02 `useDockState.keepOpenCount`): `keepOpen()` bumps the
 * count, the state machine consults it synchronously (idle-collapse suppressed),
 * and `useDockState.isHeld` is the SOLE `data-held` writer — no token race, no
 * orphan-able async listener, no parallel attribute write.
 *
 * Touch parity folds into the SAME single owner: the `useTouchGate` scroll-vs-
 * drag arbitration FEEDS this one hold (it decides whether a touch IS a drag);
 * the acquire is idempotent (an `acquired` latch) so pointer + touch never
 * double-increment `keepOpenCount`.
 *
 * DI: consumes the EXISTING typed `DockContext` (`useOptionalDockContext` —
 * `keepOpen`/`release`/`held`); a slider rendered outside any `<GlassDock>` is a
 * befitting-silent no-op (the optional context returns `null`). It mints no new
 * injection key and preserves the `keepOpen`/portal DI contract.
 */
export interface UseDockHoldOptions {
    /**
     * Whether the hold is armed. When `false`, native listeners stay attached
     * but acquire/release are no-ops (the consumer's `keepDockOpen` prop off).
     */
    enabled?: Ref<boolean> | (() => boolean);
}

export interface UseDockHoldReturn {
    /** Reactive — the dock's `held` flag (the SOLE `data-held` writer source). */
    isHeld: ComputedRef<boolean>;
    /** Reactive — the touch-gate active flag (mirrors `data-touch-active`). */
    isTouchActive: ComputedRef<boolean>;
}

export function useDockHold(
    rootRef: Ref<HTMLElement | { $el?: unknown } | null>,
    options: UseDockHoldOptions = {},
): UseDockHoldReturn {
    const { enabled } = options;
    const isEnabled = (): boolean =>
        enabled === undefined
            ? true
            : typeof enabled === "function"
              ? enabled()
              : enabled.value;

    const dock = useOptionalDockContext();
    const touchGate = useTouchGate();

    // The ONE acquire latch — pointer AND touch share it, so a touch that
    // follows a pointer (or vice versa) never double-increments keepOpenCount.
    let acquired = false;
    function acquire(): void {
        if (!isEnabled() || acquired || !dock) return;
        dock.keepOpen();
        acquired = true;
    }
    function release(): void {
        if (!acquired || !dock) return;
        dock.release();
        acquired = false;
    }

    function resolveHost(): HTMLElement | null {
        const ref = rootRef.value;
        if (!ref) return null;
        if (ref instanceof HTMLElement) return ref;
        const el = (ref as { $el?: unknown }).$el;
        return el instanceof HTMLElement ? el : null;
    }

    // --- pointer: window-scoped release (pointer-capture retargets to the
    //     captured element and bubbles to window — already proven to fire). ---
    let removeWindowRelease: (() => void) | null = null;
    function onPointerDown(): void {
        acquire();
        if (typeof window === "undefined") return;
        const onUp = (): void => {
            release();
            removeWindowReleaseListeners();
        };
        function removeWindowReleaseListeners(): void {
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
            removeWindowRelease = null;
        }
        // Re-arm cleanly if a prior gesture's listeners are still live.
        removeWindowRelease?.();
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
        removeWindowRelease = removeWindowReleaseListeners;
    }

    // --- touch: the gate arbitrates scroll-vs-drag; an ACTIVE gate FEEDS the
    //     same single acquire. ---
    function onTouchStart(event: TouchEvent): void {
        const host = resolveHost();
        const touch = event.touches[0];
        if (!host || !touch) return;
        if (!touchGate.handleTouchStart(host, touch.clientY)) {
            // Gate is pending — swallow the initial tap so the SliderRoot does
            // not treat it as a drag while the gate decides (canonical pattern).
            event.preventDefault();
            event.stopPropagation();
        }
    }
    function onTouchMove(event: TouchEvent): void {
        touchGate.handleScrollCheck(event);
    }
    function onTouchEnd(): void {
        touchGate.handleTouchEnd();
    }

    // The gate flipping active/inactive drives the SAME single acquire/release.
    watch(touchGate.isActive, (active) => {
        if (active) acquire();
        else release();
    });

    // --- native binding on the resolved host (the reka forwarding-drop fix) ---
    let detach: (() => void) | null = null;
    onMounted(() => {
        const host = resolveHost();
        if (!host) return;
        host.addEventListener("pointerdown", onPointerDown);
        host.addEventListener("touchstart", onTouchStart, { passive: false });
        host.addEventListener("touchmove", onTouchMove, { passive: true });
        host.addEventListener("touchend", onTouchEnd);
        detach = () => {
            host.removeEventListener("pointerdown", onPointerDown);
            host.removeEventListener("touchstart", onTouchStart);
            host.removeEventListener("touchmove", onTouchMove);
            host.removeEventListener("touchend", onTouchEnd);
        };
    });

    onBeforeUnmount(() => {
        // The window-release safety net + the host detach + a final release so
        // an unmount-during-drag never leaks a keepOpenCount token.
        removeWindowRelease?.();
        detach?.();
        release();
    });

    const isHeld = computed(() => dock?.held.value === true);
    const isTouchActive = computed(() => touchGate.isActive.value);

    return { isHeld, isTouchActive };
}
