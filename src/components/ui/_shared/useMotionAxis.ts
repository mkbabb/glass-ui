// _shared/useMotionAxis.ts — the ONE shared motion-weight resolver (BH.W-MOTION-AXIS).
//
// The `Motion` union is minted in `_shared/axes.ts` (the ONE grammar home); this is
// the resolver every carrier threads — the motion twin of `useSurfaceAxis`'s
// `surfaceClass`. It collapses the seven-boolean motion scatter
// (`draggable`/`pressable`/`spring`/`liquidDrag`) onto the single `motion` axis: the
// liquid-weight-universal law means physics is the DEFAULT, so the axis is an
// opt-DOWN (`full` → `reduced` → `off`), never an opt-in matrix.
//
// THE §GQ-4 CONTRACT (verbatim from KS-API-COLOCATION), the three rungs:
//   full     (default) — the FULL register. `armed === true` (gesture enrichments
//              on). Writes NOTHING (the token/CSS defaults ARE the full register —
//              zero-delta at default, the no-op floor: no `data-motion` attr, no
//              `--motion-weight` write).
//   reduced  — `armed === false` (JS gesture physics degrade to their CSS floor:
//              press = the `.tap-squish` `:active` carve; drag = discrete snap, no
//              squish — the SAME visual state PRM produces, no second degrade path).
//              Binds `data-motion="reduced"` (the F5.2 two-door calm selector hooks
//              it; the attr is this wave's half, the CSS recipe is F5.2's).
//   off      — `armed === false` AND `--motion-weight: 0` inline on the host (the
//              live scalar useLiquidPress/useMorphField/useLiquidFlex already read —
//              a weight→0 zeroes the cartoon channels, ZERO new plumbing). The
//              FUNCTIONAL interaction stays (click selects, a drag-handle still
//              dismisses if `dragDismiss`) — motion off, meaning never off.
//
// PRECEDENCE — PRM > prop-down > default. `prefers-reduced-motion: reduce` forces
// `full → reduced` at the CSS layer regardless of the prop (the OS setting is
// involuntary; a11y is absolute — the `[data-allow-motion]` carve stays the ONLY
// PRM-visible escape, and the `motion` prop is NOT one). The prop may go BELOW PRM
// (`off`), never above — `resolveMotion` clamps a prop `full`/`reduced` down to
// `reduced` under live PRM, so no code path lets the prop escalate past PRM.
//
// The JS enrichment gate is `armed` (true iff the RESOLVED motion is `full`). PRM
// itself is honoured a SECOND time inside every enrichment composable
// (`useSpring`/`useSpringMount`'s `respectReducedMotion`, `useDragVelocity`'s PRM
// pin) — this resolver's `armed` is the PROP door, the composable's own PRM handling
// is the OS door; belt-and-suspenders, both close to the same CSS floor.

import { type MaybeRefOrGetter, computed, toValue } from "vue";
import type { Motion } from "./axes";

/** A live `prefers-reduced-motion: reduce` read (SSR-safe; false off-DOM). */
function prmActive(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * Resolve a prop `Motion` value (default `full`) DOWN under live PRM. The prop may
 * only clamp DOWN — PRM forces `full`/`reduced` → `reduced` (never an escalation),
 * `off` is preserved (the prop went below PRM, which is legal).
 */
export function resolveMotion(motion: Motion | undefined): Motion {
    const requested: Motion = motion ?? "full";
    if (requested === "off") return "off";
    // PRM forces the involuntary floor: full → reduced (reduced stays reduced).
    return prmActive() ? "reduced" : requested;
}

/**
 * The resolved-motion state a carrier reads. `armed` gates the JS gesture
 * enrichment (drag/press/spring-mount/liquid-drag); `dataMotion`/`hostStyle` are the
 * `:data-motion`/`:style` binds the carrier spreads onto its root (both undefined at
 * the `full` default — the zero-delta no-op floor).
 */
export interface MotionAxis {
    /** The PRM-clamped resolved rung (`full`/`reduced`/`off`). */
    readonly resolved: Motion;
    /** True iff resolved `full` — the JS gesture enrichment is armed. */
    readonly armed: boolean;
    /** `undefined` at `full` (no attr); the rung string otherwise. */
    readonly dataMotion: "reduced" | "off" | undefined;
    /** `undefined` unless `off` (then `{ "--motion-weight": "0" }`). */
    readonly hostStyle: Record<string, string> | undefined;
}

/**
 * The reactive motion resolver — the ONE seam every carrier threads. Pass the
 * component's `motion` prop (a ref/getter/value); read `.armed` to gate JS
 * enrichments, bind `.dataMotion` to `:data-motion`, spread `.hostStyle` into the
 * root `:style`. All four derive from the ONE `resolveMotion` clamp so PRM
 * precedence + the zero-delta default are single-sourced.
 *
 *   const motion = useMotionAxis(() => props.motion)
 *   // <Root :data-motion="motion.dataMotion.value" :style="motion.hostStyle.value">
 *   // if (motion.armed.value) { …arm the drag/press/spring enrichment… }
 */
export function useMotionAxis(motion: MaybeRefOrGetter<Motion | undefined>) {
    const resolved = computed<Motion>(() => resolveMotion(toValue(motion)));
    const armed = computed(() => resolved.value === "full");
    const dataMotion = computed<"reduced" | "off" | undefined>(() =>
        resolved.value === "full" ? undefined : resolved.value,
    );
    const hostStyle = computed<Record<string, string> | undefined>(() =>
        resolved.value === "off" ? { "--motion-weight": "0" } : undefined,
    );
    return { resolved, armed, dataMotion, hostStyle };
}
