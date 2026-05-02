import { ref, watch, onUnmounted, provide, inject } from "vue";
import type { Ref } from "vue";
import { isTeleportedTarget } from "./isTeleportedTarget";

export interface UseDockStateOptions {
    /** Delay before auto-collapse after mouse leaves (ms) */
    collapseDelay?: number;
    /** Root element ref — used for contains() checks */
    rootEl: Ref<HTMLElement | null>;
    /** Disable collapse behavior and keep the dock expanded. */
    alwaysExpanded?: Ref<boolean> | boolean;
    /** Ref that suppresses click-away during an active dock animation. */
    isTransitioning?: Ref<boolean>;
    /** Owner id for dock-owned teleported targets. */
    dockId?: string;
    /** Called on every state transition */
    onStateChange?: (newState: DockState, oldState: DockState) => void;
}

export type DockState = "collapsed" | "hover" | "pinned";

/**
 * Dock state machine with three states and ref-counted child holds.
 *
 * ```
 * State Machine:
 *   COLLAPSED ──(mouseenter/focusin)──→ HOVER
 *   HOVER ──(mouseleave + timeout)──→ COLLAPSED
 *   HOVER ──(clickCollapsed)──→ PINNED
 *   PINNED ──(clickOutside)──→ COLLAPSED
 *   Any ──(alwaysExpanded=true)──→ PINNED
 *
 * keepOpen/release ref-counting prevents TIMER-BASED collapse
 * but NOT explicit click-away dismissal (onPointerDownOutside).
 *
 * Teleported targets (reka-ui portals, floating panels, dock popovers)
 * are treated as "inside the dock" for mouse/focus/click-away purposes.
 * ```
 */
export function useDockState(options: UseDockStateOptions) {
    const { collapseDelay = 2500, rootEl, alwaysExpanded = false, isTransitioning, dockId, onStateChange } = options;

    const getAlwaysExpanded = () =>
        typeof alwaysExpanded === "boolean" ? alwaysExpanded : alwaysExpanded.value;

    const initiallyExpanded = getAlwaysExpanded();
    const state = ref<DockState>(initiallyExpanded ? "pinned" : "collapsed");
    const expanded = ref(initiallyExpanded);
    const isPinned = ref(initiallyExpanded);

    let collapseTimer: ReturnType<typeof setTimeout> | null = null;
    let keepOpenCount = 0;
    let removeClickAway: (() => void) | null = null;
    let installClickAwayFrame: number | null = null;
    let isCollapsing = false;

    let prevState: DockState = state.value;
    function syncDerived() {
        if (getAlwaysExpanded()) {
            state.value = "pinned";
        }
        expanded.value = state.value !== "collapsed";
        isPinned.value = state.value === "pinned";
        if (onStateChange && prevState !== state.value) {
            onStateChange(state.value, prevState);
        }
        prevState = state.value;
    }

    function clearTimer() {
        if (collapseTimer) {
            clearTimeout(collapseTimer);
            collapseTimer = null;
        }
    }

    function cancelDeferredClickAwayInstall() {
        if (installClickAwayFrame !== null) {
            cancelAnimationFrame(installClickAwayFrame);
            installClickAwayFrame = null;
        }
    }

    function removeClickAwayListener() {
        cancelDeferredClickAwayInstall();
        removeClickAway?.();
    }

    function scheduleCollapse() {
        if (getAlwaysExpanded()) return;
        if (keepOpenCount > 0) return;
        clearTimer();
        collapseTimer = setTimeout(() => {
            dismissOpenOverlays();
            state.value = "collapsed";
            syncDerived();
        }, collapseDelay);
    }

    function dismissOpenOverlays() {
        // Pointerdown on the body lets open portals run their normal outside
        // dismissal without the dock querying library-internal portal selectors.
        if (typeof document === "undefined" || typeof PointerEvent === "undefined") return;
        document.body.dispatchEvent(
            new PointerEvent("pointerdown", { bubbles: true, composed: true }),
        );
    }

    function collapse() {
        if (getAlwaysExpanded()) {
            state.value = "pinned";
            syncDerived();
            return;
        }
        if (isCollapsing) return;
        isCollapsing = true;
        clearTimer();
        dismissOpenOverlays();
        state.value = "collapsed";
        syncDerived();
        isCollapsing = false;
    }

    function expand() {
        if (getAlwaysExpanded()) {
            state.value = "pinned";
            syncDerived();
            return;
        }
        clearTimer();
        state.value = "hover";
        syncDerived();
    }

    // --- Mouse handlers ---

    function onMouseEnter() {
        if (getAlwaysExpanded()) return;
        clearTimer();
        if (state.value === "collapsed") {
            state.value = "hover";
            syncDerived();
        }
        // If pinned, no-op (stays pinned)
    }

    function onMouseLeave(e?: MouseEvent) {
        if (getAlwaysExpanded()) return;
        if (state.value === "hover") {
            // Something is explicitly holding the dock open (dropdown, edit, etc.)
            if (keepOpenCount > 0) return;
            // Mouse moved to a descendant or teleported child (dropdown, popover)
            if (e) {
                const root = rootEl.value;
                if (
                    root &&
                    e.relatedTarget instanceof Node &&
                    root.contains(e.relatedTarget)
                )
                    return;
                if (isTeleportedTarget(e.relatedTarget, dockId)) return;
            }
            scheduleCollapse();
        }
        // If pinned, no-op (stays pinned)
    }

    // --- Focus handlers ---

    function onFocusIn() {
        if (getAlwaysExpanded()) return;
        clearTimer();
        if (state.value === "collapsed") {
            state.value = "hover";
            syncDerived();
        }
    }

    function onFocusOut(e: FocusEvent) {
        if (getAlwaysExpanded()) return;
        if (state.value !== "hover") return;
        if (keepOpenCount > 0) return;
        const root = e.currentTarget as HTMLElement;
        if (e.relatedTarget && root.contains(e.relatedTarget as Node)) return;
        // Focus moved to a teleported element (dropdown content, select, popover)
        if (isTeleportedTarget(e.relatedTarget, dockId)) return;
        scheduleCollapse();
    }

    // --- Click on collapsed layer → PINNED ---

    function onClickCollapsed() {
        if (getAlwaysExpanded()) {
            state.value = "pinned";
            syncDerived();
            return;
        }
        clearTimer();
        state.value = "pinned";
        syncDerived();
    }

    // --- keepOpen / release (ref-counted child holds) ---

    function keepOpen() {
        keepOpenCount++;
        clearTimer();
    }

    function release() {
        keepOpenCount = Math.max(0, keepOpenCount - 1);
        if (keepOpenCount === 0 && state.value === "hover") {
            // Grace period: don't collapse immediately after a child releases
            // (e.g., dialog dismissed via Escape). Give the user time to re-engage.
            clearTimer();
            collapseTimer = setTimeout(() => {
                if (keepOpenCount === 0 && state.value === "hover") {
                    scheduleCollapse();
                }
            }, Math.min(collapseDelay, 800));
        }
    }

    // Provide for descendant components
    provide("dockKeepOpen", keepOpen);
    provide("dockRelease", release);
    provide("dockExpanded", expanded);

    // --- Click-away listener ---

    function onPointerDownOutside(e: PointerEvent) {
        if (getAlwaysExpanded()) return;
        // During transitions, pointer-events:none on dock-layers causes clicks
        // to target the parent element — suppress click-away entirely.
        if (isTransitioning?.value) return;
        const root = rootEl.value;
        if (!root || root.contains(e.target as Node)) return;
        if (isTeleportedTarget(e.target, dockId)) return;

        // Click outside → always collapse, even if keepOpenCount > 0
        // (keepOpenCount prevents timer-based collapse, not explicit dismissal)
        collapse();
    }

    watch(expanded, (isExpanded) => {
        if (isExpanded) {
            removeClickAwayListener();
            // Defer attachment past the current event's propagation.
            // nextTick alone isn't enough — the opening pointerdown can still
            // reach a capture-phase listener attached in the same microtask.
            // requestAnimationFrame ensures we wait until the next frame.
            installClickAwayFrame = requestAnimationFrame(() => {
                installClickAwayFrame = null;
                if (!expanded.value) return;
                document.addEventListener(
                    "pointerdown",
                    onPointerDownOutside,
                    true,
                );
                removeClickAway = () => {
                    document.removeEventListener(
                        "pointerdown",
                        onPointerDownOutside,
                        true,
                    );
                    removeClickAway = null;
                };
            });
        } else {
            removeClickAwayListener();
        }
    });

    if (typeof alwaysExpanded !== "boolean") {
        watch(alwaysExpanded, (forceOpen) => {
            if (forceOpen) {
                clearTimer();
                state.value = "pinned";
                syncDerived();
                return;
            }
            state.value = "collapsed";
            syncDerived();
        }, { immediate: true });
    } else if (alwaysExpanded) {
        state.value = "pinned";
        syncDerived();
    }

    // Cleanup
    onUnmounted(() => {
        clearTimer();
        removeClickAwayListener();
    });

    return {
        state,
        expanded,
        isPinned,
        onMouseEnter,
        onMouseLeave,
        onFocusIn,
        onFocusOut,
        onClickCollapsed,
        keepOpen,
        release,
        expand,
        collapse,
    };
}
