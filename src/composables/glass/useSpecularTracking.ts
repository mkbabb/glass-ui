import { onScopeDispose, ref, type CSSProperties } from "vue";

/**
 * `useSpecularTracking` — the pointer-anchored moving-specular write seam
 * (AX.W09). The single DRY home for the catch-light position write that was
 * hand-copied VERBATIM in `Card.vue` and `DockIconButton.vue`.
 *
 * On pointer-move it writes the cursor position (`--mouse-x`/`--mouse-y`, as
 * percentages of the host box) onto the host's inline style; the unified
 * `.glass-material::before` recipe (`glass.css`) MAPS that host write onto its
 * typed `--specular-x`/`--specular-y` channel and paints the travelling glow.
 *
 * VOCAB (HARDENING §G #28): `--mouse-x`/`--mouse-y` is the HOST WRITE this seam
 * owns; `--specular-x`/`--specular-y` is the CSS-internal MAPPED channel the
 * recipe reads. The host writes `--mouse-x/y`; the recipe maps it.
 *
 * The catch-light MAGNITUDE rides the `--glass-specular-intensity-{rest,hover,
 * active}` token cohort (tokens.css) the recipe reads — this seam only feeds the
 * position. The recipe's rest rung is `0` (dormant) so an UNWIRED surface is
 * clean; calling this seam is the wire-or-omit opt-in that wakes the lens on
 * hover/active.
 *
 * PRM-aware: under `prefers-reduced-motion: reduce` the seam DOES NOT write the
 * position (the CSS half pins the catch-light static at the centred `50%`
 * fallback). The PRM signal is read from a SINGLE cached `matchMedia` listener
 * minted once at composable setup (NOT a fresh `matchMedia` per pointer event) —
 * the AV.W7 `useWebGLCanvas` substrate pattern.
 *
 * AY.W-A11Y-PERF O-3 — the pointer write is rAF-COALESCED: `onPointerMove` only
 * stashes the raw event + schedules ONE `requestAnimationFrame`; the rAF callback
 * does the single `getBoundingClientRect()` + style write, so a 120–1000 Hz pointer
 * collapses to ONE batched layout read + ONE style write per animation frame (under
 * W54 maximal-glass every blurred-surface repaint is amortized to the frame, not the
 * event). The composable cancels the pending rAF + removes the matchMedia listener on
 * scope dispose (cleanup discipline).
 *
 * BB.W-LIQUIDHOVER — the rAF-coalesce + cached-PRM + cleanup LOGIC is extracted to
 * `createSpecularWriter()`, the SINGLE position-write core. The composable below wraps
 * it for the Vue `:style`-ref case (Card's prop-gated `specular` opt-in); the
 * tier-root auto-arm (`vSpecular`) wraps the SAME core to write directly on the
 * directive host's `el.style` (the zero-wiring delivery). ONE position-write source,
 * TWO deliveries — never a re-pasted handler.
 */
export interface UseSpecularTracking {
    /** Bind to the host element's `:style`. Carries the `--mouse-x/--mouse-y` write. */
    specularStyle: ReturnType<typeof ref<CSSProperties>>;
    /** Bind to the host's `@pointermove`. Schedules the rAF-coalesced position write (PRM-gated). */
    onPointerMove: (event: PointerEvent) => void;
}

/**
 * The SINGLE position-write core (BB.W-LIQUIDHOVER) — the rAF-coalesced,
 * PRM-aware `--mouse-x/y` write seam, sink-agnostic. `sink(x, y)` receives the
 * percentage position once per animation frame; the composable sinks into its
 * `specularStyle` ref, the `vSpecular` directive sinks into `el.style.setProperty`.
 * Returns the event handler + a `dispose` (cancel the pending rAF + drop the cached
 * PRM listener) so BOTH deliveries share ONE cleanup discipline.
 */
export interface SpecularWriter {
    onPointerMove: (event: PointerEvent) => void;
    dispose: () => void;
}

export function createSpecularWriter(
    sink: (xPct: number, yPct: number) => void,
): SpecularWriter {
    // ── The cached PRM ref (AV.W7 substrate pattern) — ONE matchMedia + change
    // listener minted once for the seam's lifetime, NOT a fresh matchMedia per event.
    const canMatch =
        typeof window !== "undefined" && typeof window.matchMedia === "function";
    const prmQuery = canMatch
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let reduced = prmQuery?.matches ?? false;
    const onPrmChange = (e: MediaQueryListEvent): void => {
        reduced = e.matches;
    };
    prmQuery?.addEventListener("change", onPrmChange);

    // ── The rAF-coalesce state — one pending frame coalesces a burst of events. We
    // capture the host element + the client coords AT EVENT TIME (NOT the event
    // object): `event.currentTarget` is reset to null once dispatch completes, so the
    // deferred rAF callback that runs on the NEXT frame would read a null target and
    // silently no-op. Snapshot the primitives instead.
    let pendingTarget: HTMLElement | null = null;
    let pendingClientX = 0;
    let pendingClientY = 0;
    let rafId = 0;

    function flush(): void {
        rafId = 0;
        const target = pendingTarget;
        pendingTarget = null;
        if (!target) return;
        // The SINGLE batched layout read per frame (was per pointermove).
        const rect = target.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const x = ((pendingClientX - rect.left) / rect.width) * 100;
        const y = ((pendingClientY - rect.top) / rect.height) * 100;
        sink(x, y);
    }

    function onPointerMove(event: PointerEvent): void {
        // PRM: leave the position at the centred CSS fallback (the recipe's
        // reduced-motion bracket pins `--specular-x/y` to 50%); skip the write.
        if (reduced) return;
        // Snapshot the host + coords AT EVENT TIME (currentTarget is valid only during
        // dispatch); schedule ONE rAF (a burst coalesces to one read).
        pendingTarget = event.currentTarget as HTMLElement | null;
        pendingClientX = event.clientX;
        pendingClientY = event.clientY;
        if (rafId !== 0) return;
        if (typeof requestAnimationFrame === "function") {
            rafId = requestAnimationFrame(flush);
        } else {
            // SSR / no-rAF host — write synchronously (degenerate, never the hot path).
            flush();
        }
    }

    function dispose(): void {
        if (rafId !== 0 && typeof cancelAnimationFrame === "function") {
            cancelAnimationFrame(rafId);
        }
        rafId = 0;
        pendingTarget = null;
        prmQuery?.removeEventListener("change", onPrmChange);
    }

    return { onPointerMove, dispose };
}

export function useSpecularTracking(): UseSpecularTracking {
    const specularStyle = ref<CSSProperties>({});

    const writer = createSpecularWriter((x, y) => {
        specularStyle.value = {
            "--mouse-x": `${x.toFixed(2)}%`,
            "--mouse-y": `${y.toFixed(2)}%`,
        } as CSSProperties;
    });

    onScopeDispose(writer.dispose);

    return { specularStyle, onPointerMove: writer.onPointerMove };
}
