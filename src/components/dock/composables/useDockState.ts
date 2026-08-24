import { computed, ref, watch, onUnmounted } from "vue";
import type { ComputedRef, Ref } from "vue";
import { isTeleportedTarget } from "../../_shared/overlay/isTeleportedTarget";
import type { DockHoldKind } from "./dockContext";
import { DOCK_COLLAPSE_DELAY_MS, HOVER_INTENT_MS } from "../constants";

export interface UseDockStateOptions {
    /** Delay before auto-collapse after mouse leaves (ms). Defaults to
     * `DOCK_COLLAPSE_DELAY_MS`, the one idle window every GlassDock reads. */
    collapseDelay?: number;
    /** Root element ref — used for contains() checks */
    rootEl: Ref<HTMLElement | null>;
    /** Disable collapse behavior and keep the dock expanded. */
    alwaysExpanded?: Ref<boolean> | boolean;
    /* ~~`interaction`: `"manual"` suppresses every environmental writer at BOTH
       poles, leaving only `expand()`/`collapse()` — the consumer owns posture~~ —
       [2026-08-12 · BK #47 W1 SURFACE] STRUCK with the `interaction` dock prop. The
       pole turned this state machine off wholesale; `expand()`/`collapse()` are
       exposed regardless, so a consumer that drives posture still drives it. */
    /** Mount-only posture for a collapsible dock. */
    initialExpanded?: boolean;
    /** Ref that suppresses click-away during an active dock animation. */
    isTransitioning?: Ref<boolean>;
    /** Owner id for dock-owned teleported targets. */
    dockId?: string;
    /** Called on every state transition */
    onStateChange?: (newState: DockState, oldState: DockState) => void;
}

export type DockState = "collapsed" | "hover" | "pinned";

/**
 * Canonical return shape for `useDockState`, paralleling other named composable return
 * types. It lets consumers wrapping `<GlassDock>` (or
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
    /**
     * `true` whenever at least one child token holds the dock open via `keepOpen`
     * — the MORPH hold (posture). An armed search field or an open popover is one;
     * a hand is not implied. It governs the collapse timer and the click-away, and
     * it drives NO paint.
     */
    isHeld: ComputedRef<boolean>;
    /**
     * `true` while at least one `keepOpen("grasp")` token is live — an actual
     * POINTER hold on a descendant control. The dock's `data-held` edge and the
     * grasp register (glass/grasp.css) read THIS, never `isHeld`: the material
     * answers a hand, and "a popover is open" is not one.
     */
    graspHeld: ComputedRef<boolean>;
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
    keepOpen: (kind?: DockHoldKind) => void;
    /** Decrement hold ref-count; allows timer-based collapse when count reaches 0. */
    release: (kind?: DockHoldKind) => void;
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
    // Patient-dwell collapse delay (2500 → 3600ms): a more
    // forgiving hover/interaction window before auto-collapse. The ~60ms HOVER_INTENT_MS
    // enter dwell is kept as a sweep-past guard. The stationary, state-sized hit frame
    // removes the moving-edge recheck because it never sweeps the cursor.
    const {
        collapseDelay = DOCK_COLLAPSE_DELAY_MS,
        rootEl,
        alwaysExpanded = false,
        initialExpanded = false,
        isTransitioning,
        dockId,
        onStateChange,
    } = options;

    const getAlwaysExpanded = () =>
        typeof alwaysExpanded === "boolean" ? alwaysExpanded : alwaysExpanded.value;
    /* The ONE predicate every environmental posture writer early-returns under: the
       force-pinned pole. The imperative `expand()`/`collapse()` pair crosses it. */
    const isQuiet = () => getAlwaysExpanded();

    const state = ref<DockState>(
        getAlwaysExpanded() ? "pinned" : initialExpanded ? "hover" : "collapsed",
    );
    const expanded = computed(() => state.value !== "collapsed");
    const isPinned = computed(() => state.value === "pinned");

    let collapseTimer: ReturnType<typeof setTimeout> | null = null;
    /* TWO COUNTS, TWO FACTS. `keepOpenCount` is POSTURE — every token, of either
       kind, suppresses timer-based collapse and click-away. `graspCount` is the
       HAND — only a live pointer hold takes one (`keepOpen("grasp")`, acquired by
       `useDockHold` off a native `pointerdown`/`touchstart` on the resolved host).
       The split exists because the grasp register (glass/grasp.css) is a
       direct-manipulation answer to a finger: sourced from the posture count it
       engaged the held optic — 0.6× ink, 1.625× blur, the plate's clip and grain
       stood down — for the entire time a search field or a popover was open, which
       is a state, not a touch. A grasp is also a posture hold (a finger down must
       hold the dock open), so it takes both counts and releases both. */
    const keepOpenCount = ref(0);
    const graspCount = ref(0);
    const isHeld: ComputedRef<boolean> = computed(() => keepOpenCount.value > 0);
    const graspHeld: ComputedRef<boolean> = computed(() => graspCount.value > 0);
    let removeClickAway: (() => void) | null = null;
    let installClickAwayFrame: number | null = null;
    let isCollapsing = false;

    /* The hover intent dwell is a genuine sweep-past guard. A collapsed→hover expansion
       from `onMouseEnter` is deferred briefly;
       a spurious enter from a fast cursor sweep is canceled by the immediately-following
       leave (which clears the pending dwell via `clearHoverIntent`) before it commits. A
       genuine human hover dwells past the window and expands. The dwell is bypassed for
       focus parity (`onFocusIn` stays instant — a keyboard focus is never a sweep artefact).

       The moving-edge-sweep recheck is absent
       (`isMorphingEdgeSweep` + `EDGE_BAND_PX` + the `onMouseLeave` geometry recheck, ~120L):
       because enter/leave listeners live on a stationary, state-sized hit
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
        if (isQuiet()) return;
        if (keepOpenCount.value > 0) return;
        clearTimer();
        collapseTimer = setTimeout(() => {
            state.value = "collapsed";
            syncDerived();
        }, collapseDelay);
    }

    /* `scheduleCollapse`/`collapse` must NOT fire a synthetic
       `document.body.dispatchEvent(new PointerEvent("pointerdown", …))` (to "let
       open portals run their normal outside dismissal"): it is a forbidden GLOBAL
       FAKE GESTURE. reka-ui's `DismissableLayer` reads ANY `document` pointerdown as
       an OUTSIDE interaction, so a body-target synthetic event dismisses EVERY open
       dismissable layer — including a Dialog / Select / Popover whose TRIGGER is a
       dock CHILD (repro: a Select opened inside a dock-anchored Dialog dismisses the
       whole Dialog on first click). The real cases are covered WITHOUT a fake
       gesture: (1) a genuine click-away is dismissed by reka's own outside-pointerdown
       detection on the SAME real event — the `onPointerDownOutside` collapse below runs
       beside it, so a synthetic re-dispatch is pure redundancy; (2) the timer path
       is gated by `keepOpenCount` — a dock-anchored overlay that must hold its dock
       open takes a `keepOpen` token (the Slider / DockLayerGroup seam; a consumer wires
       its overlay's `@update:open` → `keepOpen`/`release`), so the dock never
       times-out-collapses while a held overlay is open. The dock owns ITS OWN state; it
       never reaches into a third-party layer with a synthesized DOM gesture. The
       `keepOpen`/`release`/`isHeld` (`keepDockOpen`/`dockHeld`) contract stands. */

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
        if (isQuiet()) return;
        clearTimer();
        if (state.value === "collapsed") {
            // Defer collapsed→hover expansion by the intent
            // dwell. A spurious enter from the morphing edge sweeping back over a
            // stationary cursor is canceled by the immediately-following leave
            // (`onMouseLeave` clears the pending dwell) before the expand commits,
            // breaking the enter↔leave oscillation. A genuine human hover dwells
            // past the window. The dwell re-checks `state === "collapsed"` at fire
            // time so a pin/expand mid-dwell is honoured.
            clearHoverIntent();
            hoverIntentTimer = setTimeout(() => {
                hoverIntentTimer = null;
                if (isQuiet()) return;
                if (state.value === "collapsed") {
                    state.value = "hover";
                    syncDerived();
                }
            }, HOVER_INTENT_MS);
        }
        // If pinned, no-op (stays pinned)
    }

    function onMouseLeave(e?: MouseEvent) {
        if (isQuiet()) return;
        // A leave cancels any pending hover-intent dwell: a
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
        if (isQuiet()) return;
        clearTimer();
        if (state.value === "collapsed") {
            state.value = "hover";
            syncDerived();
        }
    }

    function onFocusOut(e: FocusEvent) {
        if (isQuiet()) return;
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
        // Environmental collapsed-tap → PINNED. Suppressed when quiet: an
        // always-expanded dock is already pinned, and a manual dock reserves
        // posture for the consumer's imperative `expand()`/`collapse()`.
        if (isQuiet()) return;
        clearTimer();
        clearHoverIntent();
        state.value = "pinned";
        syncDerived();
    }

    // --- keepOpen / release (ref-counted child holds) ---

    function keepOpen(kind: DockHoldKind = "morph") {
        keepOpenCount.value++;
        if (kind === "grasp") graspCount.value++;
        clearTimer();
    }

    function release(kind: DockHoldKind = "morph") {
        if (kind === "grasp") graspCount.value = Math.max(0, graspCount.value - 1);
        keepOpenCount.value = Math.max(0, keepOpenCount.value - 1);
        if (keepOpenCount.value === 0 && state.value === "hover") {
            // Grace period: don't collapse immediately after a child releases
            // (e.g., dialog dismissed via Escape). Give the user time to re-engage.
            clearTimer();
            collapseTimer = setTimeout(
                () => {
                    if (keepOpenCount.value === 0 && state.value === "hover") {
                        scheduleCollapse();
                    }
                },
                Math.min(collapseDelay, 800),
            );
        }
    }

    /* Descendant DI lives at `<GlassDock>` so the
       canonical typed `DOCK_CONTEXT_KEY` provide composes `keepOpen` +
       `release` + `isHeld` + `id` + `orientation` in one site.
       `dockExpanded` is permanently retired (zero downstream consumers
       per Rδ). */

    // --- Click-away listener ---

    function onPointerDownOutside(e: PointerEvent) {
        if (isQuiet()) return;
        if (keepOpenCount.value > 0) return;
        // During transitions, pointer-events:none on dock-layers causes clicks
        // to target the parent element — suppress click-away entirely.
        if (isTransitioning?.value) return;
        const root = rootEl.value;
        if (!root || root.contains(e.target as Node)) return;
        if (isTeleportedTarget(e.target, dockId)) return;

        collapse();
    }

    watch(
        expanded,
        (isExpanded) => {
            if (isExpanded) {
                if (typeof document === "undefined") return;
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
        },
        { immediate: true },
    );

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
        });
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
        graspHeld,
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
