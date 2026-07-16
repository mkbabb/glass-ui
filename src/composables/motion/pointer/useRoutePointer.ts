// Layer 0.5: the route pointer broadcaster.
//
// A full-bleed procedural background (Aurora / FourierField / Constellation) is a
// `pointer-events:none` canvas — often Teleport-to-body — so it CANNOT listen for its own
// pointer (it never receives the events). The ONLY structural answer to the
// "backgrounds should be interactive" mandate is a route-level broadcaster: ONE passive,
// CAPTURE-phase `pointermove` on `window`, viewport-normalized, shared to every background
// viz on the route via provide/inject. Capture-phase so it survives a foreground child's
// `stopPropagation` (SAF-1); PASSIVE so it can NEVER `preventDefault`; it NEVER focuses or
// steals a click — it only READS the pointer and broadcasts the normalized position.
//
// PRM + paused gated: under the shared reduced-motion authority OR while the route
// reports `paused` (the WCAG-2.2.2 pause
// control), the broadcaster HOLDS its last value + reports inactive — the backgrounds freeze.
//
// ONE listener per route: the first caller (the route chassis, `StoryHero`) provides the
// context; nested background vizzes inject-and-reuse it (no second window listener).

import {
    inject,
    onScopeDispose,
    provide,
    readonly,
    ref,
    toValue,
    watch,
    type InjectionKey,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import type { PointerVec2 } from "./usePointerVelocityField";
import { useReducedMotion } from "../core/useReducedMotion";

export type { PointerVec2 };

export interface RoutePointerContext {
    /** The viewport-normalized pointer (0..1 across the viewport). */
    readonly pointer: Readonly<Ref<PointerVec2>>;
    /** True while a live pointer is over the viewport (and not PRM/paused-silenced). */
    readonly active: Readonly<Ref<boolean>>;
    /** Tear down the window listeners (auto-run on scope dispose). */
    dispose(): void;
}

const ROUTE_POINTER_KEY: InjectionKey<RoutePointerContext> = Symbol(
    "glass-ui:route-pointer",
);

export interface UseRoutePointerOptions {
    /**
     * The route's paused signal (the WCAG-2.2.2 background pause). While truthy the
     * broadcaster holds its last value + reports inactive (the backgrounds freeze).
     */
    paused?: MaybeRefOrGetter<boolean>;
    /** Honor `prefers-reduced-motion: reduce` (default true). */
    respectReducedMotion?: boolean;
    /**
     * Force a FRESH provider even if an ancestor already provided one (default false —
     * the standard behaviour reuses an injected context so there is ONE window listener
     * per route). A test harness that wants an isolated instance passes `true`.
     */
    fresh?: boolean;
}

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * The route pointer broadcaster (FC4). The FIRST caller on a route installs the ONE
 * capture-phase window listener + provides the context; nested background vizzes reuse the
 * injected context (no second listener). Returns the shared `{ pointer, active }` a
 * background viz feeds into its own `usePointerVelocityField.setPointer`.
 *
 * @example
 * ```ts
 * const route = useRoutePointer({ paused })          // in the route chassis (provides)
 * // in each background viz (injects the same instance):
 * const route = useRoutePointer()
 * watchEffect(() => field.setPointer(route.pointer.value.x, route.pointer.value.y))
 * ```
 */
export function useRoutePointer(
    options: UseRoutePointerOptions = {},
): RoutePointerContext {
    // Reuse an injected context (ONE window listener per route) unless a fresh instance
    // is forced.
    if (!options.fresh) {
        const existing = inject(ROUTE_POINTER_KEY, null);
        if (existing) return existing;
    }

    const respectPRM = options.respectReducedMotion !== false;
    const canWindow = typeof window !== "undefined";

    const reduced = respectPRM ? useReducedMotion() : ref(false);

    const pointer = ref<PointerVec2>({ x: 0.5, y: 0.5 });
    const active = ref(false);

    function silenced(): boolean {
        return reduced.value || toValue(options.paused) === true;
    }

    function onMove(event: PointerEvent): void {
        // PRM/paused → hold the last value + report inactive (the freeze). NEVER
        // preventDefault / focus / capture — this is a passive read only.
        if (silenced()) {
            if (active.value) active.value = false;
            return;
        }
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        pointer.value = {
            x: clamp01(event.clientX / w),
            y: clamp01(event.clientY / h),
        };
        active.value = true;
    }

    function onLeaveOrBlur(): void {
        active.value = false;
    }

    const stopReducedMotionWatch = watch(
        reduced,
        (next) => {
            if (next) active.value = false;
        },
        { flush: "sync" },
    );

    if (canWindow) {
        // Capture-phase + passive: survives a foreground child stopPropagation (SAF-1),
        // can never preventDefault (passive), never steals a click.
        window.addEventListener("pointermove", onMove, { capture: true, passive: true });
        // The pointer leaving the viewport / the tab blurring drops active (no ghost well).
        document.addEventListener("pointerleave", onLeaveOrBlur);
        window.addEventListener("blur", onLeaveOrBlur);
    }

    function dispose(): void {
        if (!canWindow) return;
        window.removeEventListener("pointermove", onMove, { capture: true } as EventListenerOptions);
        document.removeEventListener("pointerleave", onLeaveOrBlur);
        window.removeEventListener("blur", onLeaveOrBlur);
        stopReducedMotionWatch();
    }

    onScopeDispose(dispose);

    const ctx: RoutePointerContext = {
        pointer: readonly(pointer) as Readonly<Ref<PointerVec2>>,
        active: readonly(active) as Readonly<Ref<boolean>>,
        dispose,
    };
    // Provide for nested consumers (the ONE-per-route sharing) unless a fresh isolated
    // instance was requested.
    if (!options.fresh) provide(ROUTE_POINTER_KEY, ctx);
    return ctx;
}
