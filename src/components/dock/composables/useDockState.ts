import { computed, ref, watch, onUnmounted } from "vue";
import type { ComputedRef, Ref } from "vue";
import { isTeleportedTarget } from "./isTeleportedTarget";
import { HOVER_INTENT_MS } from "../constants";

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
 * Canonical return shape for `useDockState`. Named per the O.W6 Lane A
 * `UseClipboardReturn` precedent + P.W2 Lane D (Pγ.3 "useDockState inline
 * return"); freezes today's surface so consumers wrapping `<GlassDock>` (or
 * authoring a custom dock chassis) can type the composable handle from `/api`
 * or the `/dock` subpath without reaching for `ReturnType<typeof useDockState>`.
 */
export interface UseDockStateReturn {
    /** Three-state machine: `"collapsed" | "hover" | "pinned"`. */
    state: Ref<DockState>;
    /** `true` whenever `state !== "collapsed"` — derived ref. */
    expanded: Ref<boolean>;
    /** `true` whenever `state === "pinned"` — derived ref. */
    isPinned: Ref<boolean>;
    /** `true` whenever at least one child token holds the dock open via `keepOpen`. */
    isHeld: ComputedRef<boolean>;
    /** Mouseenter handler — transitions `collapsed → hover`. */
    onMouseEnter: () => void;
    /** Mouseleave handler — schedules `hover → collapsed` after `collapseDelay`. */
    onMouseLeave: (e?: MouseEvent) => void;
    /** Focusin handler — transitions `collapsed → hover` (keyboard parity with mouse). */
    onFocusIn: () => void;
    /** Focusout handler — schedules `hover → collapsed` when focus leaves the dock. */
    onFocusOut: (e: FocusEvent) => void;
    /** Click handler on the collapsed layer — transitions to `pinned`. */
    onClickCollapsed: () => void;
    /** Increment hold ref-count; suppresses timer-based collapse. */
    keepOpen: () => void;
    /** Decrement hold ref-count; allows timer-based collapse when count reaches 0. */
    release: () => void;
    /** Imperative open — forces `state = "hover"` (no-op when `alwaysExpanded`). */
    expand: () => void;
    /** Imperative close — forces `state = "collapsed"` (no-op when `alwaysExpanded`). */
    collapse: () => void;
}

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
 * keepOpen/release ref-counting prevents both timer-based collapse and
 * click-away dismissal while a descendant owns an active hold.
 *
 * Teleported targets (reka-ui portals, floating panels, dock popovers)
 * are treated as "inside the dock" for mouse/focus/click-away purposes.
 * ```
 */
export function useDockState(options: UseDockStateOptions): UseDockStateReturn {
    // BD.W-DOCK-CORE (A2) — the patient-dwell collapse delay (2500 → 3600ms): a more
    // forgiving hover/interaction window before auto-collapse. The ~60ms HOVER_INTENT_MS
    // enter-dwell (a genuine UX sweep-past guard) is KEPT; BI.W-DOCK-RETIRES deleted the
    // AZ.W-DOCK-FLICKER moving-edge-sweep recheck (`EDGE_BAND_PX`), dead once W-DOCK-SPINE
    // moved the hit frame onto a stationary, state-sized box that never sweeps the cursor.
    const { collapseDelay = 3600, rootEl, alwaysExpanded = false, isTransitioning, dockId, onStateChange } = options;

    const getAlwaysExpanded = () =>
        typeof alwaysExpanded === "boolean" ? alwaysExpanded : alwaysExpanded.value;

    const initiallyExpanded = getAlwaysExpanded();
    const state = ref<DockState>(initiallyExpanded ? "pinned" : "collapsed");
    const expanded = ref(initiallyExpanded);
    const isPinned = ref(initiallyExpanded);

    let collapseTimer: ReturnType<typeof setTimeout> | null = null;
    /* J.W5.C — `keepOpenCount` lifted to a reactive ref so descendants
       can derive `isHeld` from it. The semantics (≥ 1 token alive
       suppresses timer-based collapse) are unchanged; reactivity is
       additive. */
    const keepOpenCount = ref(0);
    const isHeld: ComputedRef<boolean> = computed(() => keepOpenCount.value > 0);
    let removeClickAway: (() => void) | null = null;
    let installClickAwayFrame: number | null = null;
    let isCollapsing = false;

    /* The hover INTENT-DWELL (HOVER_INTENT_MS, a genuine UX sweep-past guard KEPT by
       W-DOCK-SPINE). A collapsed→hover expand from `onMouseEnter` is DEFERRED a few ms;
       a spurious enter from a fast cursor sweep is canceled by the immediately-following
       leave (which clears the pending dwell via `clearHoverIntent`) before it commits. A
       genuine human hover dwells past the window and expands. The dwell is bypassed for
       focus parity (`onFocusIn` stays instant — a keyboard focus is never a sweep artefact).

       BI.W-DOCK-RETIRES deleted the AZ.W-DOCK-FLICKER moving-edge-sweep recheck
       (`isMorphingEdgeSweep` + `EDGE_BAND_PX` + the `onMouseLeave` geometry recheck, ~120L):
       W-DOCK-SPINE (G7) moved the enter/leave listeners onto a STATIONARY, state-sized hit
       frame that never sweeps under the cursor, so a hit frame that does not move cannot
       re-fire enter↔leave — there is nothing to guard. Clean break, no alias. */
    let hoverIntentTimer: ReturnType<typeof setTimeout> | null = null;

    function clearHoverIntent() {
        if (hoverIntentTimer) {
            clearTimeout(hoverIntentTimer);
            hoverIntentTimer = null;
        }
    }

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
        if (keepOpenCount.value > 0) return;
        clearTimer();
        collapseTimer = setTimeout(() => {
            state.value = "collapsed";
            syncDerived();
        }, collapseDelay);
    }

    /* BG.W-DOCK-CONSUMER-FENCE — the synthetic `document.body.dispatchEvent(new
       PointerEvent("pointerdown", …))` that `scheduleCollapse`/`collapse` used to
       fire ("let open portals run their normal outside dismissal") is DELETED (clean
       break, no shim). It was a forbidden GLOBAL FAKE GESTURE: reka-ui's
       `DismissableLayer` reads ANY `document` pointerdown as an OUTSIDE interaction,
       so a body-target synthetic event dismissed EVERY open dismissable layer —
       including a Dialog / Select / Popover whose TRIGGER is a dock CHILD (a verified
       dns-analysis repro: a Select opened inside a dock-anchored Dialog dismissed the
       whole Dialog on first click). The real cases are already covered WITHOUT a fake
       gesture: (1) a genuine click-away is dismissed by reka's own outside-pointerdown
       detection on the SAME real event — the `onPointerDownOutside` collapse below runs
       beside it, so the synthetic re-dispatch was pure redundancy; (2) the timer path
       is gated by `keepOpenCount` — a dock-anchored overlay that must hold its dock
       open takes a `keepOpen` token (the Slider / DockLayerGroup seam; a consumer wires
       its overlay's `@update:open` → `keepOpen`/`release`), so the dock never
       times-out-collapses while a held overlay is open. The dock owns ITS OWN state; it
       never reaches into a third-party layer with a synthesized DOM gesture. The
       `keepOpen`/`release`/`isHeld` (`keepDockOpen`/`dockHeld`) contract is untouched. */

    function collapse() {
        if (getAlwaysExpanded()) {
            state.value = "pinned";
            syncDerived();
            return;
        }
        if (isCollapsing) return;
        isCollapsing = true;
        clearTimer();
        clearHoverIntent();
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
        clearHoverIntent();
        state.value = "hover";
        syncDerived();
    }

    // --- Mouse handlers ---

    function onMouseEnter() {
        if (getAlwaysExpanded()) return;
        clearTimer();
        if (state.value === "collapsed") {
            // AZ.W-DOCK-FLICKER — DEFER the collapsed→hover expand by the intent
            // dwell. A spurious enter from the morphing edge sweeping back over a
            // stationary cursor is canceled by the immediately-following leave
            // (`onMouseLeave` clears the pending dwell) before the expand commits,
            // breaking the enter↔leave oscillation. A genuine human hover dwells
            // past the window. The dwell re-checks `state === "collapsed"` at fire
            // time so a pin/expand mid-dwell is honoured.
            clearHoverIntent();
            hoverIntentTimer = setTimeout(() => {
                hoverIntentTimer = null;
                if (getAlwaysExpanded()) return;
                if (state.value === "collapsed") {
                    state.value = "hover";
                    syncDerived();
                }
            }, HOVER_INTENT_MS);
        }
        // If pinned, no-op (stays pinned)
    }

    function onMouseLeave(e?: MouseEvent) {
        if (getAlwaysExpanded()) return;
        // AZ.W-DOCK-FLICKER — a leave cancels any pending hover-intent dwell: a
        // sweeping-edge enter immediately chased by a leave never commits the expand.
        clearHoverIntent();
        if (state.value === "hover") {
            // Something is explicitly holding the dock open (dropdown, edit, etc.)
            if (keepOpenCount.value > 0) return;
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
        if (keepOpenCount.value > 0) return;
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
        clearHoverIntent();
        state.value = "pinned";
        syncDerived();
    }

    // --- keepOpen / release (ref-counted child holds) ---

    function keepOpen() {
        keepOpenCount.value++;
        clearTimer();
    }

    function release() {
        keepOpenCount.value = Math.max(0, keepOpenCount.value - 1);
        if (keepOpenCount.value === 0 && state.value === "hover") {
            // Grace period: don't collapse immediately after a child releases
            // (e.g., dialog dismissed via Escape). Give the user time to re-engage.
            clearTimer();
            collapseTimer = setTimeout(() => {
                if (keepOpenCount.value === 0 && state.value === "hover") {
                    scheduleCollapse();
                }
            }, Math.min(collapseDelay, 800));
        }
    }

    /* O.W2 — descendant DI moved up-stack to `<GlassDock>` so the
       canonical typed `DOCK_CONTEXT_KEY` provide composes `keepOpen` +
       `release` + `isHeld` + `id` + `orientation` in one site.
       `dockExpanded` is permanently retired (zero downstream consumers
       per Rδ). */

    // --- Click-away listener ---

    function onPointerDownOutside(e: PointerEvent) {
        if (getAlwaysExpanded()) return;
        if (keepOpenCount.value > 0) return;
        // During transitions, pointer-events:none on dock-layers causes clicks
        // to target the parent element — suppress click-away entirely.
        if (isTransitioning?.value) return;
        const root = rootEl.value;
        if (!root || root.contains(e.target as Node)) return;
        if (isTeleportedTarget(e.target, dockId)) return;

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
        clearHoverIntent();
        removeClickAwayListener();
    });

    return {
        state,
        expanded,
        isPinned,
        isHeld,
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
