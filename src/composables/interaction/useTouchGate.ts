import { ref, onUnmounted } from "vue";

/**
 * Shared global touchstart listener registry.
 * Instead of each useTouchGate() instance adding its own global listener,
 * all instances register a proxy with a single shared listener.
 */
interface GateProxy {
    isActive: () => boolean;
    controlEl: () => HTMLElement | null;
    deactivate: () => void;
}

const gateRegistry = new Set<GateProxy>();
let sharedListenerInstalled = false;

function onGlobalTouchStartShared(e: TouchEvent) {
    for (const proxy of gateRegistry) {
        if (!proxy.isActive()) continue;
        const el = proxy.controlEl();
        if (el && !el.contains(e.target as Node)) {
            proxy.deactivate();
        }
    }
}

function installSharedListener() {
    if (sharedListenerInstalled) return;
    document.addEventListener("touchstart", onGlobalTouchStartShared, { passive: true });
    sharedListenerInstalled = true;
}

function uninstallSharedListener() {
    if (gateRegistry.size > 0 || !sharedListenerInstalled) return;
    document.removeEventListener("touchstart", onGlobalTouchStartShared);
    sharedListenerInstalled = false;
}

/**
 * Per-control tap-to-activate pattern for mobile touch.
 *
 * - Desktop (no `ontouchstart`): always active — no gating.
 * - Mobile first touch: starts a 150ms pending window. If the user scrolls
 *   (vertical delta > 10px) during that window, activation is cancelled.
 *   If no scroll is detected, activates after 150ms.
 * - Mobile subsequent touch while active: interaction passes through.
 * - After `deactivateDelayMs` of no touch, deactivates.
 * - Tapping outside the control deactivates (shared global `touchstart` listener).
 */
export function useTouchGate(deactivateDelayMs = 3000) {
    const isActive = ref(false);
    const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

    let deactivateTimer: ReturnType<typeof setTimeout> | null = null;
    let pendingTimer: ReturnType<typeof setTimeout> | null = null;
    let controlEl: HTMLElement | null = null;
    let initialTouchY: number | null = null;
    let isPending = false;
    let suppressDeactivation = false;

    function clearDeactivateTimer() {
        if (deactivateTimer !== null) {
            clearTimeout(deactivateTimer);
            deactivateTimer = null;
        }
    }

    function clearPendingTimer() {
        if (pendingTimer !== null) {
            clearTimeout(pendingTimer);
            pendingTimer = null;
        }
        isPending = false;
        initialTouchY = null;
    }

    function resetTimer() {
        clearDeactivateTimer();
        deactivateTimer = setTimeout(() => {
            deactivate();
        }, deactivateDelayMs);
    }

    function activate(el: HTMLElement) {
        isActive.value = true;
        el.style.touchAction = "none";
        resetTimer();
    }

    function suppressDeactivate(suppress: boolean) {
        suppressDeactivation = suppress;
        if (suppress) {
            clearDeactivateTimer();
        } else {
            resetTimer();
        }
    }

    function deactivate() {
        if (suppressDeactivation) return;
        clearDeactivateTimer();
        clearPendingTimer();
        isActive.value = false;
        if (controlEl) {
            controlEl.style.touchAction = "";
            controlEl = null;
        }
    }

    /**
     * Call on touchstart / pointerdown of the gated control.
     * On mobile, the first touch starts a 150ms pending window.
     * Returns `true` if the control is already active and interaction should proceed.
     */
    function handleTouchStart(el: HTMLElement, clientY: number): boolean {
        if (!isTouchDevice) return true;

        controlEl = el;

        if (isActive.value) {
            resetTimer();
            return true; // already active — process the interaction
        }

        // Clear any previous pending timer, then start new pending window
        clearPendingTimer();
        isPending = true;
        initialTouchY = clientY;

        pendingTimer = setTimeout(() => {
            // No scroll detected within the window — activate
            if (isPending) {
                isPending = false;
                initialTouchY = null;
                activate(el);
            }
        }, 150);

        return false; // activation pending — don't process yet
    }

    /**
     * Call on touchmove. If still in the pending window and vertical delta
     * exceeds 10px, cancel activation (user is scrolling).
     */
    function handleScrollCheck(event: TouchEvent): void {
        if (!isTouchDevice || !isPending || initialTouchY === null) return;

        const currentY = event.touches[0]?.clientY ?? 0;
        const delta = Math.abs(currentY - initialTouchY);

        if (delta > 10) {
            // User is scrolling — cancel activation
            clearPendingTimer();
        }
    }

    function handleTouchEnd(): void {
        if (!isTouchDevice) return;
        if (isPending && controlEl) {
            // Finger lifted during pending window without scrolling —
            // this is a genuine tap. Activate immediately.
            clearPendingTimer();
            activate(controlEl);
            return;
        }
        if (isActive.value) {
            resetTimer();
        }
    }

    // Register with shared global listener instead of adding our own
    const proxy: GateProxy = {
        isActive: () => isActive.value,
        controlEl: () => controlEl,
        deactivate,
    };

    if (isTouchDevice) {
        gateRegistry.add(proxy);
        installSharedListener();
    }

    onUnmounted(() => {
        clearDeactivateTimer();
        clearPendingTimer();
        if (isTouchDevice) {
            gateRegistry.delete(proxy);
            uninstallSharedListener();
        }
        if (controlEl) {
            controlEl.style.touchAction = "";
            controlEl = null;
        }
    });

    return {
        isActive,
        isTouchDevice,
        handleTouchStart,
        handleScrollCheck,
        handleTouchEnd,
        resetTimer,
        deactivate,
        suppressDeactivate,
    };
}
