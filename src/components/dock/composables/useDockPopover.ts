// useDockPopover — the top-layer dock-anchored popover placement + interop seam
// (BI.W-DOCK-ESCAPE).
//
// The dock's satellite fans, the facet strip, dock-anchored menus, and the search
// dropdown render as native `popover` elements in the TOP LAYER — exempt from ancestor
// `overflow`/`clip`/`contain`/`transform`/`filter` BY SPEC. This REPLACES the hand-rolled
// `.glass-dock-frame` `display:contents` sibling + the `railProjection.ts` φ²-crossing
// ring math (PASS-4B ruling 4 — railProjection RETIRES; an anchored flex strip needs no
// tier math): "chips overlap the dock body" / "fan clips at the port end" are impossible
// once the surface is in the top layer.
//
// PLACEMENT = the JS ONE-SHOT, THE path (PASS-4B ruling 2 — decided, NOT dual). A single
// transform-safe `getBoundingClientRect` on open (+ a resize/scroll re-place) positions the
// popover — BYTE-IDENTICAL on both engines. Native CSS anchor positioning is BANKED: there
// is NO `anchor-name`/`position-anchor`/`@position-try`/`anchor()` arm anywhere. The SAF-1
// landmine (Safari 26 mis-resolves `anchor()` when the anchor chain carries a transform —
// the −208px dock-centering case) is fenced BY CONSTRUCTION: no native-anchor read, and the
// W-DOCK-SPINE transform-free dock centering keeps the chain clean.
//
// This is NOT a masking fallback — it is a one-shot placement of an already-working
// top-layer surface (a11y, top layer, light-dismiss, focus-return all functional without
// it). Placement only decides WHERE the working popover sits.
//
// HOVER-INTENT is honest JS (a dwell timer; `interestfor` is Chromium-only, never
// load-bearing). The light-dismiss × hover-close interop (sweep-past no-open /
// leave-closes / focus-stays / Esc-returns-focus) is wired here over `popover="manual"` +
// explicit close — the G5-CLOSED degrade arm the design tolerates when `popover=auto`
// fights the hover model (auto light-dismiss races the hover re-open + does not guarantee
// focus-return-to-invoker on a hover-opened surface).

import { onScopeDispose, ref, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { HOVER_INTENT_MS } from "../constants";

/** Which dock edge the popover fans from (the JS one-shot resolves the fixed coords). */
export type DockPopoverSide = "top" | "bottom" | "left" | "right";
/** How the popover aligns along the anchor's cross axis. */
export type DockPopoverAlign = "start" | "center" | "end";

export interface UseDockPopoverOptions {
    /** The trigger DOM element (a dock control) — resolved lazily (it mounts post-setup). */
    anchor: () => HTMLElement | null;
    /** The `popover`-attributed surface element (a plain `<div popover>`). */
    popover: Ref<HTMLElement | null>;
    /** The dock edge the surface fans from. Default `"top"`. */
    side?: MaybeRefOrGetter<DockPopoverSide>;
    /** The cross-axis alignment. Default `"center"`. */
    align?: MaybeRefOrGetter<DockPopoverAlign>;
    /** The gap (px) between the anchor edge and the surface. Default 8. */
    gap?: number;
    /** The min gap (px) the surface keeps from the viewport edge on clamp. Default 8. */
    viewportMargin?: number;
    /** The hover-open intent dwell (ms) — a sweep-past enter is canceled by a chasing
     *  leave inside it. Default `HOVER_INTENT_MS`. */
    hoverIntentMs?: number;
    /** The hover-close grace (ms) — bridges the anchor→surface pointer gap so the fan does
     *  not flash shut mid-cross. Default 120. */
    hoverGraceMs?: number;
}

export interface UseDockPopoverReturn {
    /** Reactive open state (a mirror of the top-layer show — bind styling to it). */
    open: Ref<boolean>;
    /** Show the popover (top-layer promote + the JS one-shot place). */
    show: () => void;
    /** Hide the popover (+ return focus to the anchor if focus was inside — Esc/blur). */
    hide: () => void;
    /** Toggle (the click-invoker path). */
    toggle: () => void;
    /** The JS one-shot placement — `getBoundingClientRect` on the anchor, viewport-clamped.
     *  Re-run on resize/scroll while open. The SAF-1 fence lives here: rect math ONLY, never
     *  a native `anchor()` read. */
    place: () => void;
    /** Pointer entered the anchor → start the intent dwell. */
    onAnchorEnter: () => void;
    /** Pointer left the anchor → schedule a graced hide. */
    onAnchorLeave: () => void;
    /** Pointer entered the surface → cancel the graced hide (the cross bridged). */
    onPopoverEnter: () => void;
    /** Pointer left the surface → schedule a graced hide. */
    onPopoverLeave: () => void;
    /** Focus entered the anchor → open immediately (keyboard). */
    onFocusIn: () => void;
    /** Focus left the anchor+surface subtree → hide (focus stays while traversing members). */
    onFocusOut: (event: FocusEvent) => void;
}

/**
 * Wire a dock-anchored top-layer popover: the native `popover` show/hide, the JS one-shot
 * `getBoundingClientRect` placement (viewport-clamped), the hover-intent × light-dismiss ×
 * focus-return interop. NO native anchor positioning (the SAF-1 fence — `anchor()` BANKED).
 *
 * @example
 * ```ts
 * const fanEl = useTemplateRef<HTMLElement>("fanEl");
 * const stackRoot = useTemplateRef<HTMLElement>("stackRoot");
 * const pop = useDockPopover({
 *   anchor: () => stackRoot.value?.querySelector<HTMLElement>(".dock-stack-core") ?? null,
 *   popover: fanEl,
 *   side: () => (orientation.value === "vertical" ? "right" : "top"),
 * });
 * ```
 */
export function useDockPopover(options: UseDockPopoverOptions): UseDockPopoverReturn {
    const open = ref(false);
    const gap = options.gap ?? 8;
    const margin = options.viewportMargin ?? 8;
    const intentMs = options.hoverIntentMs ?? HOVER_INTENT_MS;
    const graceMs = options.hoverGraceMs ?? 120;

    let intentTimer: ReturnType<typeof setTimeout> | null = null;
    let graceTimer: ReturnType<typeof setTimeout> | null = null;
    let listening = false;

    function clearIntent(): void {
        if (intentTimer != null) {
            clearTimeout(intentTimer);
            intentTimer = null;
        }
    }
    function clearGrace(): void {
        if (graceTimer != null) {
            clearTimeout(graceTimer);
            graceTimer = null;
        }
    }

    // ── The JS ONE-SHOT placement (PASS-4B ruling 2) ────────────────────────────────
    // The SAF-1 fence: the anchor position is read via `getBoundingClientRect` ONLY —
    // never a native `anchor()` / `anchor-name` / `position-anchor`. `getBoundingClientRect`
    // resolves correctly through a transform-free centered dock on BOTH engines; native
    // `anchor()` mis-resolves through a transformed ancestor chain on Safari 26 (banked).
    function place(): void {
        const anchorEl = options.anchor();
        const el = options.popover.value;
        if (!anchorEl || !el) return;

        const a = anchorEl.getBoundingClientRect();
        // The surface is already in the top layer (shown) when placed, so its box is real.
        const pw = el.offsetWidth;
        const ph = el.offsetHeight;
        const side = toValue(options.side) ?? "top";
        const align = toValue(options.align) ?? "center";

        // The main-axis anchor point + the cross-axis alignment origin.
        const alignMain = (start: number, size: number, own: number): number =>
            align === "start"
                ? start
                : align === "end"
                  ? start + size - own
                  : start + size / 2 - own / 2;

        let top = 0;
        let left = 0;
        switch (side) {
            case "bottom":
                top = a.bottom + gap;
                left = alignMain(a.left, a.width, pw);
                break;
            case "left":
                left = a.left - pw - gap;
                top = alignMain(a.top, a.height, ph);
                break;
            case "right":
                left = a.right + gap;
                top = alignMain(a.top, a.height, ph);
                break;
            case "top":
            default:
                top = a.top - ph - gap;
                left = alignMain(a.left, a.width, pw);
                break;
        }

        // Viewport clamp (the shrink-to-fit oracle): the fan re-places fully in-viewport —
        // no clipped/off-screen member (E3 viewport-edge behavior).
        const maxLeft = Math.max(margin, window.innerWidth - pw - margin);
        const maxTop = Math.max(margin, window.innerHeight - ph - margin);
        left = Math.min(Math.max(left, margin), maxLeft);
        top = Math.min(Math.max(top, margin), maxTop);

        el.style.position = "fixed";
        el.style.margin = "0";
        el.style.inset = "auto";
        el.style.top = `${Math.round(top)}px`;
        el.style.left = `${Math.round(left)}px`;
    }

    // ── The live re-place + light-dismiss listeners (armed only while open) ──────────
    function onReflow(): void {
        place();
    }
    function onDocPointerDown(event: PointerEvent): void {
        const target = event.target as Node | null;
        const el = options.popover.value;
        const anchorEl = options.anchor();
        if (target && ((el && el.contains(target)) || (anchorEl && anchorEl.contains(target)))) {
            return; // a press on the anchor/surface is not a dismiss
        }
        hide();
    }
    function addLiveListeners(): void {
        if (listening) return;
        listening = true;
        window.addEventListener("resize", onReflow);
        // capture-phase so an inner scroll container's scroll re-places the fan too.
        window.addEventListener("scroll", onReflow, true);
        document.addEventListener("pointerdown", onDocPointerDown, true);
    }
    function removeLiveListeners(): void {
        if (!listening) return;
        listening = false;
        window.removeEventListener("resize", onReflow);
        window.removeEventListener("scroll", onReflow, true);
        document.removeEventListener("pointerdown", onDocPointerDown, true);
    }

    // ── show / hide / toggle ─────────────────────────────────────────────────────────
    function show(): void {
        clearIntent();
        clearGrace();
        const el = options.popover.value;
        if (!el || open.value) return;
        try {
            el.showPopover();
        } catch {
            // A disconnected/unsupported surface cannot become the interaction owner.
            return;
        }
        open.value = true;
        // The one-shot AFTER show (the surface is now measurable in the top layer).
        place();
        addLiveListeners();
    }

    function hide(): void {
        clearIntent();
        clearGrace();
        const el = options.popover.value;
        if (!el || !open.value) return;
        const focusWasInside = el.contains(document.activeElement);
        try {
            el.hidePopover();
        } catch {
            /* not open */
        }
        open.value = false;
        removeLiveListeners();
        // Focus-return-to-invoker (Esc / focus-out inside the surface) — the native
        // `popovertarget` return, hand-wired for the imperative hover path.
        if (focusWasInside) options.anchor()?.focus();
    }

    function toggle(): void {
        if (open.value) hide();
        else show();
    }

    // ── The hover-intent × light-dismiss × focus interop matrix ─────────────────────
    function onAnchorEnter(): void {
        clearGrace();
        if (open.value) return;
        clearIntent();
        intentTimer = setTimeout(() => {
            intentTimer = null;
            show();
        }, intentMs);
    }
    function onAnchorLeave(): void {
        clearIntent();
        scheduleHide();
    }
    function onPopoverEnter(): void {
        clearIntent();
        clearGrace();
    }
    function onPopoverLeave(): void {
        scheduleHide();
    }
    function onFocusIn(): void {
        clearIntent();
        clearGrace();
        show();
    }
    function onFocusOut(event: FocusEvent): void {
        const next = event.relatedTarget as Node | null;
        const el = options.popover.value;
        const anchorEl = options.anchor();
        if (
            next &&
            ((el && el.contains(next)) || (anchorEl && anchorEl.contains(next)))
        ) {
            return; // focus is traversing the anchor/surface subtree — stay open
        }
        hide();
    }
    function scheduleHide(): void {
        clearGrace();
        graceTimer = setTimeout(() => {
            graceTimer = null;
            hide();
        }, graceMs);
    }

    onScopeDispose(() => {
        clearIntent();
        clearGrace();
        removeLiveListeners();
        const el = options.popover.value;
        if (el && open.value) {
            try {
                el.hidePopover();
            } catch {
                /* noop */
            }
        }
    });

    return {
        open,
        show,
        hide,
        toggle,
        place,
        onAnchorEnter,
        onAnchorLeave,
        onPopoverEnter,
        onPopoverLeave,
        onFocusIn,
        onFocusOut,
    };
}
