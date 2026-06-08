import { ref, type CSSProperties } from "vue";

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
 * fallback). The write is style-only — no reflow, no re-render — and inert until
 * the user actually moves the pointer over a wired host.
 */
export interface UseSpecularTracking {
    /** Bind to the host element's `:style`. Carries the `--mouse-x/--mouse-y` write. */
    specularStyle: ReturnType<typeof ref<CSSProperties>>;
    /** Bind to the host's `@pointermove`. Writes the cursor position (PRM-gated). */
    onPointerMove: (event: PointerEvent) => void;
}

function prefersReducedMotion(): boolean {
    if (
        typeof window === "undefined" ||
        typeof window.matchMedia !== "function"
    ) {
        return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSpecularTracking(): UseSpecularTracking {
    const specularStyle = ref<CSSProperties>({});

    function onPointerMove(event: PointerEvent): void {
        // PRM: leave the position at the centred CSS fallback (the recipe's
        // reduced-motion bracket pins `--specular-x/y` to 50%); skip the write.
        if (prefersReducedMotion()) return;
        const target = event.currentTarget as HTMLElement | null;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        specularStyle.value = {
            "--mouse-x": `${x.toFixed(2)}%`,
            "--mouse-y": `${y.toFixed(2)}%`,
        } as CSSProperties;
    }

    return { specularStyle, onPointerMove };
}
