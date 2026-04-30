import { getCurrentScope, onScopeDispose, ref, type Ref } from "vue";
import { useTimer } from "./useTimer";

interface GateProxy {
    isActive: () => boolean;
    controlEl: () => HTMLElement | null;
    deactivate: () => void;
}

export interface TouchGateReturn {
    isActive: Ref<boolean>;
    isTouchDevice: boolean;
    handleTouchStart: (el: HTMLElement, clientY: number) => boolean;
    handleScrollCheck: (event: TouchEvent) => void;
    handleTouchEnd: () => void;
    resetTimer: () => void;
    deactivate: () => void;
    suppressDeactivate: (suppress: boolean) => void;
}

const gateRegistry = new Set<GateProxy>();
let sharedListenerInstalled = false;

function onGlobalTouchStartShared(event: TouchEvent): void {
    for (const proxy of gateRegistry) {
        if (!proxy.isActive()) continue;
        const el = proxy.controlEl();
        if (el && !el.contains(event.target as Node)) {
            proxy.deactivate();
        }
    }
}

function installSharedListener(): void {
    if (sharedListenerInstalled || typeof document === "undefined") return;
    document.addEventListener("touchstart", onGlobalTouchStartShared, {
        passive: true,
    });
    sharedListenerInstalled = true;
}

function uninstallSharedListener(): void {
    if (
        gateRegistry.size > 0 ||
        !sharedListenerInstalled ||
        typeof document === "undefined"
    ) {
        return;
    }
    document.removeEventListener("touchstart", onGlobalTouchStartShared);
    sharedListenerInstalled = false;
}

/**
 * Per-control tap-to-activate guard for mobile touch controls.
 *
 * Desktop pointers pass through immediately. On touch devices, the first tap
 * activates the control unless it turns into a vertical scroll gesture.
 */
export function useTouchGate(deactivateDelayMs = 3000): TouchGateReturn {
    const isActive = ref(false);
    const isTouchDevice =
        typeof window !== "undefined" && "ontouchstart" in window;

    let controlEl: HTMLElement | null = null;
    let initialTouchY: number | null = null;
    let isPending = false;
    let suppressDeactivation = false;

    const deactivateTimer = useTimer(() => {
        deactivate();
    }, deactivateDelayMs, { immediate: false });

    const pendingTimer = useTimer(() => {
        if (isPending && controlEl) {
            isPending = false;
            initialTouchY = null;
            activate(controlEl);
        }
    }, 150, { immediate: false });

    function clearDeactivateTimer(): void {
        deactivateTimer.stop();
    }

    function clearPendingTimer(): void {
        pendingTimer.stop();
        isPending = false;
        initialTouchY = null;
    }

    function resetTimer(): void {
        clearDeactivateTimer();
        deactivateTimer.start(deactivateDelayMs);
    }

    function activate(el: HTMLElement): void {
        isActive.value = true;
        el.style.touchAction = "none";
        resetTimer();
    }

    function suppressDeactivate(suppress: boolean): void {
        suppressDeactivation = suppress;
        if (suppress) {
            clearDeactivateTimer();
            return;
        }
        resetTimer();
    }

    function deactivate(): void {
        if (suppressDeactivation) return;
        clearDeactivateTimer();
        clearPendingTimer();
        isActive.value = false;
        if (controlEl) {
            controlEl.style.touchAction = "";
            controlEl = null;
        }
    }

    function handleTouchStart(el: HTMLElement, clientY: number): boolean {
        if (!isTouchDevice) return true;

        controlEl = el;

        if (isActive.value) {
            resetTimer();
            return true;
        }

        clearPendingTimer();
        isPending = true;
        initialTouchY = clientY;
        pendingTimer.start(150);

        return false;
    }

    function handleScrollCheck(event: TouchEvent): void {
        if (!isTouchDevice || !isPending || initialTouchY === null) return;

        const currentY = event.touches[0]?.clientY ?? 0;
        const delta = Math.abs(currentY - initialTouchY);

        if (delta > 10) {
            clearPendingTimer();
        }
    }

    function handleTouchEnd(): void {
        if (!isTouchDevice) return;
        if (isPending && controlEl) {
            clearPendingTimer();
            activate(controlEl);
            return;
        }
        if (isActive.value) {
            resetTimer();
        }
    }

    const proxy: GateProxy = {
        isActive: () => isActive.value,
        controlEl: () => controlEl,
        deactivate,
    };

    if (isTouchDevice) {
        gateRegistry.add(proxy);
        installSharedListener();
    }

    function dispose(): void {
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
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

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
