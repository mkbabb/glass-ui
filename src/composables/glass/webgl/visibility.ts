// BG.W-COLOCATE — the canvas VISIBILITY / park / reveal observers, carved into this
// colocated leaf (the WS4 canvas-lifecycle carve; ratchet-drain #3). `createCanvasLifecycle`
// (the SCHEDULER — the suspend Set + rAF tick/wake gate + the live reduced-motion
// re-monitor + the context-loss circuit-breaker) COMPOSES this leaf: the observers OWN
// only the DOM-observer plumbing (the tab-visibility owner, the content-visibility
// offscreen-park, the leaf ResizeObserver + presize, the IntersectionObserver park, and
// the one-shot first-visible reveal bloom) and drive the scheduler ONLY through the
// injected `suspend`/`resume`/`resize`/`wake` callbacks — the schedule lives ONCE in the
// scheduler, the DOM observers ONCE here. Both proof:offscreen-pause + the substrate
// single-source gates read the union (the "asserts follow the composition" precedent).

import type { CanvasSuspendReason } from "./createCanvasLifecycle";

interface ContentVisibilityAutoStateChangeEvent extends Event {
    readonly skipped: boolean;
}

/**
 * The scheduler seam the observers drive. Each observer writes a DISTINCT suspend
 * reason (`tab-hidden` / `off-screen` / `off-screen-io`) — the one-writer-per-reason
 * invariant — and reads the scheduler's live `armed`/`hooks`/`disposed`/`reducedMotion`
 * state through the getters (never a shared closure var, so the two files stay decoupled).
 */
export interface CanvasVisibilityDeps {
    canvas: HTMLCanvasElement;
    suspend: (reason: CanvasSuspendReason) => void;
    resume: (reason: CanvasSuspendReason) => void;
    resize: () => void;
    wake: () => void;
    isArmed: () => boolean;
    hasHooks: () => boolean;
    isDisposed: () => boolean;
    isReducedMotion: () => boolean;
    composeIntersectionPark: boolean;
    intersectionRootMargin?: string;
    revealBloom: boolean;
}

export interface CanvasVisibility {
    /**
     * BD.W-SUBSTRATE-SIZE-UNIFY (G2) — size the backing store + start the leaf RO
     * SYNCHRONOUSLY, decoupled from the (async) context acquire. Idempotent: a no-op
     * once it has run. The WebGPU backend calls this BEFORE its async device request so
     * the canvas is sharp from frame 0 while the device resolves.
     */
    presize(): void;
    /** Bind the content-visibility + intersection park observers (called at arm). */
    bindPark(): void;
    /** Arm the one-shot first-visible entrance bloom (called at arm, after armed=true). */
    armRevealBloom(): void;
    /** Detach every observer/listener owned here. */
    dispose(): void;
}

/**
 * The canvas visibility observers. Constructing this binds the tab-visibility owner +
 * seeds the initial `document.hidden` suspend (the pre-arm seed), matching the prior
 * inline behaviour byte-for-byte.
 */
export function createCanvasVisibility(
    deps: CanvasVisibilityDeps,
): CanvasVisibility {
    const { canvas } = deps;

    // ── tab-visibility owner (ONE writer of `tab-hidden`) ────────────────────
    const hasDocument = typeof document !== "undefined";
    function onVisibilityChange(): void {
        if (document.hidden) deps.suspend("tab-hidden");
        else deps.resume("tab-hidden");
    }
    if (hasDocument)
        document.addEventListener("visibilitychange", onVisibilityChange);
    if (hasDocument && document.hidden) deps.suspend("tab-hidden");

    // ── content-visibility offscreen-park (the headline lever) ────────────────
    let cvHost: HTMLElement | null = null;
    function onContentVisibilityAutoStateChange(e: Event): void {
        const skipped = (e as ContentVisibilityAutoStateChangeEvent).skipped;
        if (skipped) {
            deps.suspend("off-screen");
            return;
        }
        // skipped → VISIBLE. The subtree was just laid out + painted; its backing
        // store must re-track the now-real box. Two failure classes this closes:
        //
        //   (1) the BORN-SKIPPED arm. A canvas that mounts offscreen (in a
        //       `content-visibility: auto` ancestor below the fold) is content-
        //       skipped from frame 0 — it never fires a `skipped:true` event (it was
        //       never NOT-skipped to transition FROM), so "off-screen" was never in
        //       the suspend set. `resume("off-screen")` then deletes a reason that
        //       was never there → its `wasSuspended` guard is false → it never calls
        //       `resize()`. Meanwhile the arm-time `resize()` ran while the box was
        //       un-laid-out (clientWidth/Height 0 for a skipped subtree), so the
        //       backing froze at the un-measured default (the 300×150 HTML default /
        //       a 1px sliver) and stayed there forever — the reveal never re-sized it.
        //   (2) the ResizeObserver-blind reveal. A content-visibility reveal is NOT a
        //       border-box size change (the box was always laid out at its real size;
        //       only the PAINT was skipped), so the ResizeObserver does not fire on
        //       the skipped→visible transition. Only this listener sees it.
        //
        // So the reveal ALWAYS re-measures — unconditionally, not gated on a matching
        // prior suspend. `resize()` is idempotent (a no-op when the buffer already
        // matches the box, the per-backend `if (canvas.width !== w)` guard), so a
        // reveal that did pair with a suspend (the scrolled-offscreen case) costs at
        // most one redundant measure. The `resume("off-screen")` still runs to lift a
        // genuinely-recorded suspend; the unconditional resize handles the born-
        // skipped class the resume's guard structurally cannot.
        deps.resume("off-screen");
        if (deps.isArmed() && deps.hasHooks()) deps.resize();
        deps.wake();
    }
    /**
     * BD.W-SUBSTRATE-SIZE-UNIFY (G2) — bind the CV listener to the NEAREST
     * `content-visibility:auto` ancestor, not blindly to `canvas.parentElement`. The
     * `content-visibility:auto` is often on a HIGHER ancestor (a card / section host),
     * so binding the parent meant the `contentvisibilityautostatechange` event fired on
     * the wrong element and the reveal never re-measured (the born-skipped 2nd-canvas-
     * forever trap). Walk up (bounded, same depth-cap discipline as `sizeBacking`) to
     * the first `content-visibility:auto` ancestor; fall back to the parent if none
     * (the IO-park G3 is the belt-and-braces for a non-CV host).
     */
    function findCvHost(): HTMLElement | null {
        const parent = canvas.parentElement;
        if (!parent) return null;
        if (typeof getComputedStyle === "undefined") return parent;
        let el: HTMLElement | null = parent;
        let depth = 0;
        while (el && depth < 6) {
            const cv = getComputedStyle(el).contentVisibility;
            if (cv === "auto") return el;
            el = el.parentElement;
            depth++;
        }
        return parent;
    }
    function bindContentVisibility(): void {
        if (cvHost) return;
        const host = findCvHost();
        if (!host) return;
        cvHost = host;
        host.addEventListener(
            "contentvisibilityautostatechange",
            onContentVisibilityAutoStateChange as EventListener,
        );
    }
    function unbindContentVisibility(): void {
        cvHost?.removeEventListener(
            "contentvisibilityautostatechange",
            onContentVisibilityAutoStateChange as EventListener,
        );
        cvHost = null;
    }

    // ── BD.W-SUBSTRATE-SIZE-UNIFY (G2) — the leaf ResizeObserver ───────────────
    // ONE engine-agnostic RO, owned HERE, observing the canvas. It REPLACES the two
    // per-backend ROs (`useWebGLCanvas`/`useWebGPUCanvas`) — else a leaf RO + two
    // backend ROs = a triple-observe parallel path (the BINDING LAW forbids it). Routes
    // through the scheduler's `resize` (= `sizeAndUpload`), so every RO tick re-measures
    // via the ONE sizer. Built in `presize()` BEFORE the async device acquire so the
    // backing is sharp from frame 0 even while no GPU device exists yet.
    let ro: ResizeObserver | null = null;
    let presized = false;
    function presize(): void {
        if (presized) return;
        presized = true;
        // Size synchronously the instant the canvas has a box (G2) — decoupled from the
        // GPU acquire. The buffer is correct BEFORE the WebGPU device resolves; the
        // ≤6s blurry-flash window closes (the acquire-timeout becomes pure-cosmetic).
        deps.resize();
        // The aurora-proven rAF-double-resize defense (runtime.ts:352), PROMOTED to the
        // leaf for ALL consumers: the first arm can race the SPA-route layout settle, so
        // a same-box reveal fires no RO tick — the double-rAF re-measures after layout.
        // This is the cure for the live intermittent arm-time stuck-300×150 race (the
        // DELTA-ASSAY §1 concentric+blob defect) that today only aurora survives.
        if (typeof requestAnimationFrame !== "undefined") {
            requestAnimationFrame(() => {
                if (deps.isDisposed()) return;
                deps.resize();
                requestAnimationFrame(() => {
                    if (!deps.isDisposed()) deps.resize();
                });
            });
        }
        if (typeof ResizeObserver !== "undefined" && !ro) {
            ro = new ResizeObserver(() => {
                if (!deps.isDisposed()) deps.resize();
            });
            ro.observe(canvas);
        }
    }

    // ── BD.W-SUBSTRATE-SIZE-UNIFY (G3) — the leaf-composed IO park ─────────────
    // A plain (scope-free, reactivity-free) IntersectionObserver — NOT the vue
    // `useIntersectionPause` composable (that needs a reactive scope the imperative leaf
    // does not have). Writes the DISTINCT `"off-screen-io"` reason so every consumer
    // inherits the off-screen park ORed with CV, with NO per-viz wiring. On reveal
    // (`isIntersecting → true`) it re-measures via the ONE sizer (the WebKit-weak-CV
    // belt-and-braces).
    let io: IntersectionObserver | null = null;
    let ioWasOffscreen = false;
    function bindIntersectionPark(): void {
        if (!deps.composeIntersectionPark || io) return;
        if (typeof IntersectionObserver === "undefined") return;
        io = new IntersectionObserver(
            (entries) => {
                const entry = entries[entries.length - 1];
                if (!entry) return;
                const visible =
                    entry.isIntersecting || entry.intersectionRatio > 0;
                if (visible) {
                    if (ioWasOffscreen) {
                        ioWasOffscreen = false;
                        deps.resume("off-screen-io");
                        if (deps.isArmed() && deps.hasHooks()) deps.resize();
                        deps.wake();
                    }
                } else {
                    ioWasOffscreen = true;
                    deps.suspend("off-screen-io");
                }
            },
            {
                rootMargin: deps.intersectionRootMargin ?? "256px",
                threshold: 0,
            },
        );
        io.observe(canvas);
    }
    function unbindIntersectionPark(): void {
        io?.disconnect();
        io = null;
    }

    function bindPark(): void {
        bindContentVisibility();
        // G3 — compose the IO park at the leaf (every consumer inherits it, no per-viz wiring).
        bindIntersectionPark();
    }

    // ── BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom ──
    // A ONE-SHOT `data-substrate-reveal` ATTRIBUTE the CANVAS-targeted CSS
    // `@keyframes substrate-reveal-bloom` (viz-reveal.css) reads to ramp
    // `filter: brightness()/saturate()` from a dim floor, OVERSHOOT past 1.0 on the
    // `--ease-cartoon-punch` linear() curve (opacity clamps at 1.0 — only filter:
    // brightness CAN overshoot), then settle to the canvas's own no-resting-filter
    // rest (FIELD bloom, the canvas rect stays scale(1) — no box-zoom gutter).
    // Compositor-only (EFFECTS-channel, W-MOTION-CANON P1). Fires at FIRST-VISIBLE (a
    // dedicated one-shot IntersectionObserver), NEVER at arm() — a viz arming while
    // content-skipped / below-fold would burn its one-shot on an invisible paint and
    // never materialize on scroll-in. The `revealFired` guard keeps it ONE-SHOT: an
    // IO/CV re-reveal of an already-seen viz is a silent re-attach → ZERO second bloom
    // on scroll-off-and-back. PRM → the leaf skips the attr entirely (the CSS animation
    // also sits inside `@media (prefers-reduced-motion: no-preference)`) → instant
    // settled field, zero ramp.
    let revealFired = false;
    let revealIo: IntersectionObserver | null = null;
    function fireRevealBloom(): void {
        if (revealFired) return;
        revealFired = true;
        revealIo?.disconnect();
        revealIo = null;
        if (deps.isDisposed() || typeof canvas.setAttribute !== "function")
            return;
        canvas.setAttribute("data-substrate-reveal", "");
    }
    function armRevealBloom(): void {
        if (!deps.revealBloom || revealFired || deps.isReducedMotion()) return;
        if (typeof canvas.setAttribute !== "function") return;
        // Gate the bloom on the FIRST-VISIBLE transition. A dedicated one-shot IO at the
        // real viewport edge (threshold 0, no pre-warm margin) — distinct from the G3
        // park IO (which pre-warms at 256px). On the first intersection it fires + self-
        // disconnects; an env with no IntersectionObserver best-effort fires next paint.
        if (typeof IntersectionObserver === "undefined") {
            if (typeof requestAnimationFrame !== "undefined")
                requestAnimationFrame(() => {
                    if (!deps.isDisposed()) fireRevealBloom();
                });
            else fireRevealBloom();
            return;
        }
        revealIo = new IntersectionObserver(
            (entries) => {
                const entry = entries[entries.length - 1];
                if (!entry) return;
                if (entry.isIntersecting || entry.intersectionRatio > 0)
                    fireRevealBloom();
            },
            { threshold: 0 },
        );
        revealIo.observe(canvas);
    }

    function dispose(): void {
        if (hasDocument)
            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange,
            );
        unbindContentVisibility();
        unbindIntersectionPark();
        revealIo?.disconnect();
        revealIo = null;
        ro?.disconnect();
        ro = null;
    }

    return { presize, bindPark, armRevealBloom, dispose };
}
