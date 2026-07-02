// The backend-AGNOSTIC canvas lifecycle core.
//
// Carved out of `useWebGLCanvas` (AU.W6) so a thin context wrapper shares the EXACT
// same demand-driven scheduling + offscreen-park + PRM-freeze machinery without a
// forked second copy (the AV.W1 two-copy class). The ONLY backend-specific concern is
// acquiring the drawing context + building the per-frame hooks; everything else — the
// three-reason suspend Set, the rAF tick/wake gate, the document-visibility owner, the
// content-visibility offscreen-park, and the live `prefers-reduced-motion` re-monitor
// — is API-shaped and lives HERE once.
//
// `useWebGLCanvas` (WebGL2) is the thin wrapper: it builds its own context in
// `buildContext()` and hands the lifecycle core the frame hooks; the core owns the
// schedule. A parked rAF (offscreen / tab-hidden / PRM-reduce / paused) attaches ZERO
// frames (proof:offscreen-pause).
//
// The suspend reasons are a `Set<reason>`: the loop runs IFF the set is empty, each
// reason cleared ONLY by its owner (so a tab-show can never lift an off-screen
// suspension). Under reduced-motion the loop draws ONE static frame then parks (the
// reschedule is gated, never the suspend set, so the on-screen reduced surface never
// blanks). This is the JS gate a CSS reset cannot reach.

// AX.W16 F6 — the offscreen-park is ORed across TWO independent detectors writing
// DISTINCT reason keys, so the "one writer per reason" invariant is literally true:
//   - "off-screen"    — the substrate's `contentvisibilityautostatechange` path
//                       (content-visibility:auto, the headline lever).
//   - "off-screen-io" — the consumer's IntersectionObserver `rootMargin` fallback
//                       (the engine-without-content-visibility path).
// Both gate the same empty-`Set` `isRunning()` check, so the loop runs ONLY when BOTH
// agree the surface is visible. Before this split both wrote "off-screen", so an IO
// `resume` could lift a legitimately-skipped CV suspend (the latent F6 breach).
export type CanvasSuspendReason =
    | "tab-hidden"
    | "off-screen"
    | "off-screen-io"
    | "manual";

// ── BD.W-SUBSTRATE-SIZE-UNIFY (G1) — the ONE backing-store sizer ──────────────
//
// The freshly-measured backing geometry the leaf hands the consumer's `resize`. The
// consumer no longer MEASURES (the leaf owns the gBCR + the bounded ancestor walk +
// the DPR clamp + the NEVER-300×150 floor, ONE implementation); it only UPLOADS these
// dims to its viewport/uniforms. `changed` is `false` when the buffer already matched
// (an idempotent same-box tick — the consumer can skip a redundant uniform upload).
export interface BackingSize {
    w: number;
    h: number;
    dpr: number;
    changed: boolean;
}

/**
 * The consumer's DPR policy — either a flat multiplier or a box-aware resolver (e.g.
 * aurora's 1.5× wash ceiling vs goo-blob's 2× focal `resolveBudgetDpr`). The leaf owns
 * the MEASUREMENT + the floor; the consumer owns ONLY the DPR number.
 */
export type DprPolicy = number | ((box: { w: number; h: number }) => number);

/**
 * BD.W-SUBSTRATE-SIZE-UNIFY (G1) — the ONE canonical backing-store sizer.
 *
 * Aurora's PROVEN gBCR-ancestor sizer, lifted into the agnostic leaf so it lives ONCE
 * (DRY) instead of in N drifted consumer `resize()` closures (the three incompatible
 * `clientWidth || 320` / `clientWidth || canvasSize` / one-parent-gBCR conventions the
 * DELTA-ASSAY reproduced as the live 300×150 stuck-canvas).
 *
 * Measures the LAID-OUT border-box via `getBoundingClientRect` — NOT `clientWidth`,
 * which reads 0 under a `content-visibility:auto` skip (the born-skipped trap). Walks
 * ancestors ONLY when our own rect is still zero (truly un-laid-out), and the walk is
 * BOUNDED (H-B): cap depth at 3 AND stop at the first sized / contained / container /
 * positioned ancestor — never an unbounded gBCR storm to `<body>` (O(depth) reflow per
 * tick), never an over-recovered wide flex/grid grandparent that sizes the backing to
 * the viewport. Idempotent: the realloc (which CLEARS the drawing buffer) is skipped
 * when the buffer already matches the box.
 *
 * Pure CSS-geometry — ZERO dependency on which GPU API is live, so it runs SYNCHRONOUSLY
 * at mount before the async WebGPU device resolves (G2). Engine-identical in Chromium +
 * WebKit (gBCR reflects the real box across a CV skip in both).
 */
export function sizeBacking(
    canvas: HTMLCanvasElement,
    dprPolicy: DprPolicy,
): BackingSize {
    const rect = canvas.getBoundingClientRect();
    let cw = rect.width;
    let ch = rect.height;
    let el = canvas.parentElement;
    let depth = 0;
    const hasCS = typeof getComputedStyle !== "undefined";
    while ((cw === 0 || ch === 0) && el && depth < 3) {
        const pr = el.getBoundingClientRect();
        cw = cw || pr.width;
        ch = ch || pr.height;
        // Stop at the first ancestor that DEFINES a box — its size is the real
        // containing block; walking past it risks the viewport over-recovery (H-B).
        if (hasCS) {
            const cs = getComputedStyle(el);
            if (
                cs.contain.includes("size") ||
                cs.containerType !== "normal" ||
                cs.position !== "static"
            ) {
                break;
            }
        }
        el = el.parentElement;
        depth++;
    }
    const box = { w: Math.max(1, cw), h: Math.max(1, ch) };
    const dpr = Math.max(
        1,
        typeof dprPolicy === "function" ? dprPolicy(box) : dprPolicy,
    );
    const w = Math.max(1, Math.round(box.w * dpr));
    const h = Math.max(1, Math.round(box.h * dpr));
    const changed = canvas.width !== w || canvas.height !== h;
    if (changed) {
        // Idempotent: skip the realloc (which would CLEAR the drawing buffer) when the
        // buffer already matches — a same-box RO/wake tick costs nothing.
        canvas.width = w;
        canvas.height = h;
    }
    return { w, h, dpr, changed };
}

/** The per-frame hooks a backend's `buildContext` returns to the lifecycle core. */
export interface CanvasFrameHooks {
    /** Draw one frame at `timeSec`. */
    frame: (timeSec: number) => void;
    /** Demand-gate: is there live motion to render next frame? `false` → park. */
    shouldContinue: () => boolean;
    /** Frame time from elapsed seconds — the consumer owns frozen/reduced-motion. */
    time?: (elapsedSec: number) => number;
    /** Release backend resources (program/buffers/pipelines). */
    teardown?: () => void;
}

export interface CanvasLifecycleOptions {
    canvas: HTMLCanvasElement;
    mode?: "live" | "capture";
    respectReducedMotion?: boolean;
    /**
     * Acquire the backend context + build the per-frame hooks. Called on `arm()` AND
     * on a backend context-restore. Throws on backend-unavailable / setup failure.
     */
    buildContext: () => CanvasFrameHooks;
    /**
     * Upload the backing geometry to the viewport/uniforms.
     *
     * BD.W-SUBSTRATE-SIZE-UNIFY (G1): the leaf MEASURES + sizes the backing store (via
     * `sizeBacking`, the ONE sizer) and passes the freshly-computed `BackingSize` here so
     * the consumer can never re-derive a wrong one. When the leaf owns sizing (`dprPolicy`
     * provided) the buffer is already correct on entry — the consumer body is UPLOAD-ONLY,
     * shrinking to `gl.viewport(0,0,s.w,s.h)` / `uploadResolution` (a WGPU swap-chain leg
     * is a no-op — it auto-resizes to the backing the leaf set).
     *
     * BG.W-VIZ-RESIZE-ADOPT: every GL/WGPU procedural viz has HARD-ADOPTED the leaf sizer
     * (all 9 pass `dprPolicy` + read `s` upload-only; ZERO viz self-measures the backing —
     * `proof:viz` enforces `backing == round(gBCR × dpr)` with no surviving `canvas.width =`
     * self-size). The arg stays optional ONLY for the un-migrated `useCanvas2D` leg + the
     * substrate contract tests; dropping the `?` (the flag-day) is booked to their adopt.
     */
    resize: (s?: BackingSize) => void;
    /**
     * The consumer's DPR policy, handed to the leaf's `sizeBacking`. When PRESENT the
     * leaf owns the backing-store MEASUREMENT + sizing (the G1 inversion) and the live
     * `BackingSize` rides every `resize` call. When ABSENT the leaf falls back to the
     * legacy behaviour (the consumer's `resize()` self-measures) — the migration seam.
     *
     * BG.W-VIZ-RESIZE-ADOPT: the GL/WGPU substrate (the `createGpuSubstrate` picker + both
     * legs) is UNIVERSALLY on this seam now — every one of the 9 procedural viz threads its
     * budget DPR here (`resolveBudgetDpr` / `resolveAuroraWashDpr`), so the STANDARD is
     * `dprPolicy`-present; the ABSENT branch survives only for `useCanvas2D`.
     */
    dprPolicy?: DprPolicy;
    /**
     * Bind/unbind backend-specific context-loss/restore listeners. `rebuild` re-runs
     * `buildContext` on a fresh context + resumes the loop (the self-heal); the backend
     * calls `markContextLost` on loss so the lifecycle NULLS its hooks + cancels the
     * rAF (the loop parks while the surface is blank — no frame attaches to a dead gl).
     */
    bindContextEvents?: (rebuild: () => void, markContextLost: () => void) => void;
    unbindContextEvents?: () => void;
    /**
     * BD.W-SUBSTRATE-SIZE-UNIFY (G3) — compose the IntersectionObserver park detector
     * at the leaf (DRY) so a consumer inherits the off-screen IO-park ORed with the
     * content-visibility park, with NO per-viz `useIntersectionPause` wiring. The leaf
     * wires a plain (scope-free, reactivity-free) IO observing the canvas, writing the
     * DISTINCT `"off-screen-io"` reason. On `isIntersecting → true` it ALSO re-measures
     * via `sizeBacking` (the reveal belt-and-braces, the load-bearing path on WebKit
     * where `contentvisibilityautostatechange` support is weaker).
     *
     * Default `false` — OPT-IN. Today several consumers (goo-blob, goo-dot-matrix)
     * already write `"off-screen-io"` from their OWN `useIntersectionPause`; a leaf IO
     * defaulting on would DOUBLE-WRITE that reason and breach the one-writer invariant.
     * The atomic retirement of those per-consumer calls (so the leaf IO becomes the sole
     * writer, default-on) lands in the viz lanes. Until then a viz with NO IO wiring
     * (concentric / fourier / dot-flow — the live PARK gap) opts IN to inherit the park.
     */
    composeIntersectionPark?: boolean;
    /** `rootMargin` for the leaf-composed IO park (G3). Default `"256px"` (pre-warm). */
    intersectionRootMargin?: string;
    /**
     * BD.W-SUBSTRATE-REVEAL-BLOOM (G6) — the cold-first-paint reveal seam. When set, the
     * leaf toggles a `--substrate-reveal-t` 0→1 scalar on the canvas at the cold-arm
     * paint (ONCE, never on an IO/CV re-reveal of an already-seen viz). The shader reads
     * it to ramp luminance/saturation/drift — a FIELD bloom (the canvas rect stays
     * `scale(1)`, no box-zoom gutter). Gated on the Band-0 `--ease-cartoon-punch` +
     * `--motion-weight` tokens (NOT shipped today); absent, this is a no-op so the
     * substrate paints exactly as before. PRM → the scalar is set to its settled `1`
     * immediately (zero ramp).
     */
    revealBloom?: boolean;
}

export interface CanvasLifecycleHandle {
    arm: () => void;
    /**
     * BD.W-SUBSTRATE-SIZE-UNIFY (G2) — size the backing store + start the leaf RO
     * SYNCHRONOUSLY, decoupled from the (async) context acquire. The WebGPU backend
     * calls this BEFORE `armAsync`'s device request so the canvas is sharp from frame 0
     * while the device resolves behind it (the ≤6s blurry-flash close). Idempotent: a
     * no-op once `arm()` has run it. A no-op when no `dprPolicy` was supplied (legacy).
     */
    presize: () => void;
    suspend: (reason?: CanvasSuspendReason) => void;
    resume: (reason?: CanvasSuspendReason) => void;
    wake: () => void;
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    readonly armed: boolean;
    readonly disposed: boolean;
    readonly running: boolean;
    readonly reducedMotion: boolean;
    /**
     * BC.W-SAFARI-WEBGL — the circuit-breaker has tripped: the surface lost-and-restored
     * its context more than N times within T ms (a real eviction storm), so the lifecycle
     * is HOLDING the parked state without re-arming (no throw). Resets once the loss window
     * passes quiet; a healthy single loss never trips it.
     */
    readonly contextHeld: boolean;
}

interface ContentVisibilityAutoStateChangeEvent extends Event {
    readonly skipped: boolean;
}

// ── BC.W-SAFARI-WEBGL — the context-loss circuit-breaker (the §H Safari flash kill).
//
// The WebGL self-heal (re-run buildContext on `webglcontextrestored`) is correct for a
// single GPU-TDR loss but STORMS on WebKit when the per-page context cap is overrun: an
// eviction fires `webglcontextlost` → the heal re-creates a context → the new context
// evicts another → its loss fires → re-heal → … = the rapidly-flashing re-arm loop the
// user reports ("rapidly FLASHES the screen"). The breaker lives ONCE here (the shared
// leaf — W-CANVAS-UNIFY single-source) so all THREE backends inherit it: WebGL2 + Canvas2D
// + the WebGPU `device.lost` self-heal (a Metal TDR storm is bounded too).
//
// Two coordinated bounds:
//   - DEBOUNCE the restore: a `restored` does NOT rebuild synchronously inside the event;
//     it schedules ONE rebuild on a short window, coalescing a burst of lost/restored
//     cycles into a SINGLE rebuild per settle. A loss arriving inside the window CANCELS
//     the pending rebuild (the context is gone again — don't waste it).
//   - CIRCUIT-BREAK the retries: a sliding window counts lost→restored cycles; once the
//     surface loses-and-restores more than N=3 times within T=2000ms (a real eviction
//     storm, not a one-off TDR) the substrate STOPS re-arming and HOLDS the parked state
//     WITHOUT throwing (the aurora-swraster inert-handle precedent — a recognized
//     "this host can't hold a live context right now" decision, not a contract violation).
//     The breaker RESETS once the window passes quiet, so a later genuine single loss
//     self-heals normally.
//
// A genuine single loss STILL self-heals (the present correct behavior, KEPT) — the
// breaker fires ONLY on the pathological storm. These pinned numbers are SAFETY floors:
// a healthy single GPU-TDR loss re-heals on the first cycle and never trips the breaker.
export const N_RESTORE_STORM = 3;
export const T_RESTORE_STORM_MS = 2000;
export const RESTORE_DEBOUNCE_MS = 100;

export function createCanvasLifecycle(
    options: CanvasLifecycleOptions,
): CanvasLifecycleHandle {
    const { canvas, buildContext } = options;
    const respectReducedMotion =
        options.respectReducedMotion ?? options.mode !== "capture";
    const dprPolicy = options.dprPolicy;
    const composeIntersectionPark = options.composeIntersectionPark ?? false;

    // BD.W-SUBSTRATE-SIZE-UNIFY (G1/G2) — the leaf-owned size step. When `dprPolicy` is
    // present the leaf MEASURES + sizes the backing (the ONE sizer) and hands the live
    // `BackingSize` to the consumer's upload-only `resize(s)`. When absent, the legacy
    // path runs (the consumer self-measures in its own `resize()`). ONE function, every
    // call-site (presize / RO / CV-reveal / IO-reveal / wake) routes through it so the
    // backing can NEVER drift to the 300×150 default behind a stuck consumer closure.
    function sizeAndUpload(): void {
        if (dprPolicy !== undefined) {
            const s = sizeBacking(canvas, dprPolicy);
            options.resize(s);
        } else {
            options.resize();
        }
    }
    const resize = sizeAndUpload;

    // ── demand-driven scheduling ────────────────────────────────────────────
    const suspended = new Set<CanvasSuspendReason>();
    if (options.mode === "capture") suspended.add("manual");
    const isRunning = (): boolean => suspended.size === 0;

    let raf = 0;
    let startTime = typeof performance !== "undefined" ? performance.now() : 0;
    let hooks: CanvasFrameHooks | null = null;
    let armed = false;
    let disposed = false;

    // ── reduced-motion (live-monitored — gates the RESCHEDULE not the suspend set).
    const hasWindow = typeof window !== "undefined";
    const reducedMq =
        respectReducedMotion && hasWindow && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)")
            : null;
    let reducedMotion = reducedMq?.matches ?? false;

    function tick(): void {
        if (!isRunning() || !hooks) return;
        const elapsed = (performance.now() - startTime) / 1000;
        const t = hooks.time ? hooks.time(elapsed) : elapsed;
        hooks.frame(t);
        raf =
            !reducedMotion && hooks.shouldContinue()
                ? requestAnimationFrame(tick)
                : 0;
    }

    function wake(): void {
        if (armed && isRunning() && !raf && hooks) raf = requestAnimationFrame(tick);
    }

    function onReducedMotionChange(): void {
        const next = reducedMq?.matches ?? false;
        if (next === reducedMotion) return;
        reducedMotion = next;
        if (!next) startTime = performance.now();
        wake();
    }
    reducedMq?.addEventListener("change", onReducedMotionChange);

    function suspend(reason: CanvasSuspendReason = "manual"): void {
        const wasRunning = isRunning();
        suspended.add(reason);
        if (wasRunning && !isRunning()) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
    }

    function resume(reason: CanvasSuspendReason = "manual"): void {
        const wasSuspended = !isRunning();
        suspended.delete(reason);
        if (wasSuspended && isRunning() && armed && hooks) {
            startTime = performance.now() - 1000;
            // Re-measure on wake: a surface that was content-skipped (or scrolled
            // offscreen) may have changed box while parked, and the ResizeObserver
            // does not fire for a skipped subtree. Without this the buffer keeps the
            // size it last had — a stale/zero buffer paints as a black band over the
            // re-shown box. resize() is idempotent (no-op when the buffer already
            // matches), so a same-size wake costs nothing.
            resize();
            tick();
        }
    }

    // ── tab-visibility owner (ONE writer of `tab-hidden`) ────────────────────
    const hasDocument = typeof document !== "undefined";
    function onVisibilityChange(): void {
        if (document.hidden) suspend("tab-hidden");
        else resume("tab-hidden");
    }
    if (hasDocument) document.addEventListener("visibilitychange", onVisibilityChange);
    if (hasDocument && document.hidden) suspended.add("tab-hidden");

    // ── content-visibility offscreen-park (the headline lever) ────────────────
    let cvHost: HTMLElement | null = null;
    function onContentVisibilityAutoStateChange(e: Event): void {
        const skipped = (e as ContentVisibilityAutoStateChangeEvent).skipped;
        if (skipped) {
            suspend("off-screen");
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
        resume("off-screen");
        if (armed && hooks) resize();
        wake();
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
    // through `resize` (= `sizeAndUpload`), so every RO tick re-measures via the ONE
    // sizer. Built in `presize()` BEFORE the async device acquire so the backing is
    // sharp from frame 0 even while no GPU device exists yet.
    let ro: ResizeObserver | null = null;
    let presized = false;
    function presize(): void {
        if (presized) return;
        presized = true;
        // Size synchronously the instant the canvas has a box (G2) — decoupled from the
        // GPU acquire. The buffer is correct BEFORE the WebGPU device resolves; the
        // ≤6s blurry-flash window closes (the acquire-timeout becomes pure-cosmetic).
        resize();
        // The aurora-proven rAF-double-resize defense (runtime.ts:352), PROMOTED to the
        // leaf for ALL consumers: the first arm can race the SPA-route layout settle, so
        // a same-box reveal fires no RO tick — the double-rAF re-measures after layout.
        // This is the cure for the live intermittent arm-time stuck-300×150 race (the
        // DELTA-ASSAY §1 concentric+blob defect) that today only aurora survives.
        if (typeof requestAnimationFrame !== "undefined") {
            requestAnimationFrame(() => {
                if (disposed) return;
                resize();
                requestAnimationFrame(() => {
                    if (!disposed) resize();
                });
            });
        }
        if (typeof ResizeObserver !== "undefined" && !ro) {
            ro = new ResizeObserver(() => {
                if (!disposed) resize();
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
        if (!composeIntersectionPark || io) return;
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
                        resume("off-screen-io");
                        if (armed && hooks) resize();
                        wake();
                    }
                } else {
                    ioWasOffscreen = true;
                    suspend("off-screen-io");
                }
            },
            { rootMargin: options.intersectionRootMargin ?? "256px", threshold: 0 },
        );
        io.observe(canvas);
    }
    function unbindIntersectionPark(): void {
        io?.disconnect();
        io = null;
    }

    // ── BD.W-SUBSTRATE-REVEAL-BLOOM (G6) — the cold-first-paint reveal seam ─────
    // A ONE-SHOT `--substrate-reveal-t` 0→1 scalar the shader reads to ramp the field
    // from within (FIELD bloom, the canvas rect stays scale(1) — no box-zoom gutter).
    // Fires ONCE at the cold arm; an IO/CV re-reveal of an already-seen viz is a silent
    // re-attach (zero second bloom). Gated on Band-0 tokens — when `revealBloom` is off
    // (today) it is a no-op. PRM → set to the settled 1 immediately (zero ramp).
    let revealFired = false;
    function fireRevealBloom(): void {
        if (!options.revealBloom || revealFired) return;
        revealFired = true;
        if (typeof canvas.style === "undefined") return;
        if (reducedMotion) {
            canvas.style.setProperty("--substrate-reveal-t", "1");
            return;
        }
        // The shader catches up from t=0; the leaf only flips the scalar at the seam.
        // The actual 0→1.12→1.0 keyframe + the --ease-cartoon-punch curve live in the
        // recipe the Band-0 wave lands; here the leaf seeds the start + lets the
        // transition (declared in CSS on the canvas) drive the settle.
        canvas.style.setProperty("--substrate-reveal-t", "0");
        if (typeof requestAnimationFrame !== "undefined") {
            requestAnimationFrame(() => {
                if (!disposed) canvas.style.setProperty("--substrate-reveal-t", "1");
            });
        } else {
            canvas.style.setProperty("--substrate-reveal-t", "1");
        }
    }

    function build(): void {
        hooks = buildContext();
        resize();
    }

    // ── BC.W-SAFARI-WEBGL — the circuit-breaker state (the §H storm bound). The sliding
    // window of loss timestamps + the debounce timer + the tripped flag. A `markContextLost`
    // records a loss; a `rebuild` (the restore) is debounced + breaker-gated. Once tripped
    // the surface holds parked (no throw) until the window passes quiet.
    let lossTimestamps: number[] = [];
    let restoreTimer: ReturnType<typeof setTimeout> | 0 = 0;
    let breakerTripped = false;
    const nowMs = (): number =>
        typeof performance !== "undefined" ? performance.now() : Date.now();

    function clearRestoreTimer(): void {
        if (restoreTimer) {
            clearTimeout(restoreTimer);
            restoreTimer = 0;
        }
    }

    function arm(): void {
        if (armed || disposed) return;
        options.bindContextEvents?.(
            // rebuild (the self-heal on context restore): DEBOUNCED + breaker-gated. A
            // `restored` schedules ONE rebuild on a short window (coalescing a burst into a
            // single rebuild per settle); a loss arriving inside the window cancels it. Once
            // the breaker has tripped (N losses in T) the rebuild is SUPPRESSED — the surface
            // holds the parked state WITHOUT throwing (a recognized "can't hold a live
            // context" hold, not a contract violation).
            () => {
                if (disposed || breakerTripped) return;
                clearRestoreTimer();
                restoreTimer = setTimeout(() => {
                    restoreTimer = 0;
                    if (disposed || breakerTripped) return;
                    build();
                    if (isRunning()) wake();
                }, RESTORE_DEBOUNCE_MS);
            },
            // markContextLost: the surface is blank — NULL the hooks + cancel the rAF so the
            // loop parks (no frame attaches to a dead context) until the restore rebuilds. The
            // backend has already released its gl. The loss is COUNTED in the sliding window:
            // if more than N losses land within T ms, the breaker trips (stop re-arming, hold
            // parked, no throw); a pending debounced rebuild is cancelled (the context is gone
            // again — don't waste it). The window self-prunes, so a later quiet single loss
            // re-heals normally.
            () => {
                hooks = null;
                cancelAnimationFrame(raf);
                raf = 0;
                clearRestoreTimer();
                const t = nowMs();
                lossTimestamps.push(t);
                lossTimestamps = lossTimestamps.filter(
                    (ts) => t - ts <= T_RESTORE_STORM_MS,
                );
                // The window passed quiet (every prior loss aged past T — only this fresh
                // loss survives the prune): a later genuine single loss must self-heal, so
                // the breaker RESETS. A real storm keeps the window full and re-trips.
                if (lossTimestamps.length <= 1) breakerTripped = false;
                if (lossTimestamps.length > N_RESTORE_STORM) breakerTripped = true;
            },
        );
        // G2 — size synchronously BEFORE building the context (idempotent if presize
        // already ran on the WebGPU pre-acquire path). The leaf RO is live from here.
        presize();
        build();
        bindContentVisibility();
        // G3 — compose the IO park at the leaf (every consumer inherits it, no per-viz wiring).
        bindIntersectionPark();
        armed = true;
        startTime = performance.now();
        // G6 — the cold-first-paint reveal bloom (ONCE; gated on Band-0 tokens, no-op until then).
        fireRevealBloom();
        // Under reduced-motion paint ONE static frame SYNCHRONOUSLY at arm (call
        // `tick()` in-line: it paints once and parks because `!reducedMotion` gates
        // the reschedule), so an arm under `reduce` never schedules a deferred tick
        // that flashes one frame later. The full-motion path schedules the live loop.
        // BB.W-CANVAS-UNIFY: this is the one symmetric leaf refinement the Canvas2D
        // de-fork needs — the WebGL backend is byte-behaviour-identical (a static
        // frame under `reduce` is a static frame either way; the WebGL contract test
        // + the aurora PRM suite assert the interaction math, never the arm-tick
        // timing), and the Canvas2D substrate's one-static-frame-at-arm contract is
        // preserved exactly through the shared lifecycle.
        if (isRunning()) {
            if (reducedMotion) tick();
            else raf = requestAnimationFrame(tick);
        }
    }

    function renderAt(timeSec: number): void {
        if (!armed) arm();
        hooks?.frame(timeSec);
    }

    function dispose(): void {
        disposed = true;
        cancelAnimationFrame(raf);
        raf = 0;
        clearRestoreTimer();
        if (hasDocument) document.removeEventListener("visibilitychange", onVisibilityChange);
        reducedMq?.removeEventListener("change", onReducedMotionChange);
        unbindContentVisibility();
        unbindIntersectionPark();
        ro?.disconnect();
        ro = null;
        options.unbindContextEvents?.();
        hooks?.teardown?.();
        hooks = null;
        suspended.clear();
    }

    if (options.mode === "capture") arm();

    return {
        arm,
        presize,
        suspend,
        resume,
        wake,
        renderAt,
        dispose,
        get armed() {
            return armed;
        },
        get disposed() {
            return disposed;
        },
        get running() {
            return isRunning();
        },
        get reducedMotion() {
            return reducedMotion;
        },
        get contextHeld() {
            return breakerTripped;
        },
    };
}
