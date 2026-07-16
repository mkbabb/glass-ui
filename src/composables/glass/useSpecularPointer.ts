import {
    computed,
    onScopeDispose,
    ref,
    toValue,
    type ComputedRef,
    type CSSProperties,
    type MaybeRefOrGetter,
} from "vue";
import { createSpecularWriter } from "./useSpecularTracking";

/**
 * `useSpecularPointer` — the EVOLUTION of `useSpecularTracking`. It
 * writes the catch-light POSITION (`--mouse-x`/`--mouse-y`, as today) PLUS the
 * `--specular-angle` channel — the pointer's angle-from-center the EDGE-glint conic
 * sweep reads (the `.glass-material::before` recipe, material.css). The angle feed is
 * what turns the centered disc into a motion-reactive RIM glint (the glass-THICKNESS
 * read); the leaf is the ONE shared specular source the hover/button waves consume.
 *
 * SINGLE-SOURCE (the reconcile, EXTENDED here — NOT a fork). There is
 * exactly ONE position-write core: `createSpecularWriter` (useSpecularTracking.ts) —
 * the rAF-coalesced, cached-PRM, scope-dispose seam. This composable WRAPS that core;
 * the angle is DERIVED in the sink from the SAME `(x, y)` percentage the core already
 * computes (`angle = atan2(y - 50, x - 50)`), so there is NO duplicate
 * `getBoundingClientRect`, `--mouse-x` write — the core owns the layout read + the
 * coordinate math, this leaf only adds the angle derivation onto the existing sink.
 * `useSpecularTracking` (the position-only delivery) STAYS for the bare-position call
 * sites; `useSpecularPointer` is the angle-adding delivery for an edge-glint consumer.
 * Both wrap the ONE core — never two copies of the rAF/PRM/coordinate logic.
 *
 * PRM-aware by construction (the wrapped core skips the write under
 * `prefers-reduced-motion: reduce` — the CSS bracket pins `--specular-x/y` to the
 * centred 50% and `--specular-angle` to its `0deg` static rest). The composable
 * disposes the core (cancel the pending rAF + drop the cached PRM listener) on scope
 * teardown.
 *
 * The optional press coupling.
 * A consumer may pass `press` (a 0..1 press scalar — a `useLiquidPress` `.value`, or
 * any press signal); it is folded reactively into the emitted style as the ONE
 * `--glass-btn-press-t` channel the `.glass-material::before` specular magnitude reads
 * (material.css). Reusing the SINGLE press channel (never a forked `--*-press-t`) keeps
 * ONE drive, two legs — the gleam SWELLS + SETTLES with the press spring. The merge is
 * a `computed` so the press tracks the spring INDEPENDENTLY of pointer moves (a press
 * settles while the pointer is still). SOFT-GATED: when `press` is OMITTED the emitted
 * style carries NO press channel (the CSS `--glass-btn-press-t` default 0 holds — no
 * hard press dependency), and the position/angle write is unchanged.
 */
export interface UseSpecularPointerOptions {
    /** Optional 0..1 press scalar (soft-gated) folded into `--glass-btn-press-t`. */
    press?: MaybeRefOrGetter<number>;
}

export interface UseSpecularPointer {
    /**
     * Bind to the host element's `:style`. Carries `--mouse-x/--mouse-y` +
     * `--specular-angle` (+ the press-coupled `--glass-btn-press-t` when `press` is
     * supplied).
     */
    specularStyle: ComputedRef<CSSProperties>;
    /** Bind to the host's `@pointermove`. Schedules the rAF-coalesced position+angle write (PRM-gated). */
    onPointerMove: (event: PointerEvent) => void;
}

export function useSpecularPointer(options: UseSpecularPointerOptions = {}): UseSpecularPointer {
    // The pointer-driven leg (position + angle) — the ONE rAF-coalesced write.
    const pointerStyle = ref<CSSProperties>({});

    const writer = createSpecularWriter((x, y) => {
        // The angle-from-center, derived from the SAME percentage the core computed
        // (no second layout read). `atan2` over (y - 50, x - 50) → the CSS `deg`
        // measured clockwise from the top (the conic `from` reference): a pointer at
        // the top edge → ~0deg, right edge → ~90deg. The glint arc seats where the
        // pointer grazes the rim.
        const angle = (Math.atan2(y - 50, x - 50) * 180) / Math.PI + 90;
        pointerStyle.value = {
            "--mouse-x": `${x.toFixed(2)}%`,
            "--mouse-y": `${y.toFixed(2)}%`,
            "--specular-angle": `${angle.toFixed(1)}deg`,
        } as CSSProperties;
    });

    // Merge the OPTIONAL press scalar onto the SAME `--glass-btn-press-t` channel the
    // CSS specular reads. Reactive so the press settles independently of pointer moves;
    // soft-gated so an omitted `press` emits NO press key (the CSS default 0 wins).
    const specularStyle = computed<CSSProperties>(() => {
        if (options.press == null) return pointerStyle.value;
        const t = toValue(options.press);
        return {
            ...pointerStyle.value,
            "--glass-btn-press-t": (Number.isFinite(t) ? t : 0).toFixed(4),
        } as CSSProperties;
    });

    onScopeDispose(writer.dispose);

    return { specularStyle, onPointerMove: writer.onPointerMove };
}
