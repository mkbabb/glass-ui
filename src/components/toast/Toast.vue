<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { ToastRoot, useForwardPropsEmits } from "reka-ui";
import { cn } from "../_shared/class-names";
import type { Surface, Tone } from "../_shared/axes";
import { surfaceClass } from "../_shared/surface/resolve";

// Tone rides ON glass. The Toast `variant` no longer paints a
// SOLID `bg-<tone>` token plate over the `glass-floating` base (the opaque-slab
// map that occluded the backdrop). It now composes the ONE shared tinted-glass
// tone register (`feedback-tone.css`): `.feedback-tone .feedback-tone-<name>` tints the
// floating rung a BOUNDED % toward the house `--{success,warning,info,destructive}`
// token (the backdrop shows through — colored GLASS, not a colored slab) + a tone-keyed
// rim + a full-chroma glyph; the body text stays `--foreground` for legibility (the
// Alert discipline). The `tone` prop reads the shared `Tone` axis (axes.ts).
//
// Toast joins the shared {glass·veil·opaque} surface axis
// (the "toasts" close). `surface` (default `glass`) chooses the DECORATION of the
// floating rung via the private ladder resolver; the
// `:data-surface` binding reaches the `surface-axis.css` veil/opaque rules. It is
// ORTHOGONAL to the `tone` arm: the `feedback-tone` tint rides ON the resolved
// glass surface exactly as before (the tone mixes the rung token at the element). The
// `glass` default is the bare `glass-floating` plate.

// The status `type`/`variant` synonym is the ONE shared `tone`
// axis (neutral is the un-toned floating glass).
export type ToastSwipeEvent = CustomEvent<{
    originalEvent: PointerEvent;
    delta: { x: number; y: number };
}> & { currentTarget: EventTarget & HTMLElement };

export interface ToastProps {
    type?: "foreground" | "background";
    open?: boolean;
    defaultOpen?: boolean;
    duration?: number;
    forceMount?: boolean;
    class?: HTMLAttributes["class"];
    tone?: Tone;
    surface?: Surface;
}

export interface ToastEmits {
    escapeKeyDown: [event: KeyboardEvent];
    "update:open": [value: boolean];
    pause: [];
    resume: [];
    swipeStart: [event: ToastSwipeEvent];
    swipeMove: [event: ToastSwipeEvent];
    swipeCancel: [event: ToastSwipeEvent];
    swipeEnd: [event: ToastSwipeEvent];
}

const props = withDefaults(defineProps<ToastProps>(), {
    tone: "neutral",
    surface: "glass",
});

const emits = defineEmits<ToastEmits>();

// Idiomatic forward-emits. The manual six-event re-emit
// (`@update:open`/`@escapeKeyDown`/`@swipe*`) is replaced by
// `useForwardPropsEmits`, matching every other reka wrapper. The
// `<ToastProvider>`/`<ToastViewport>` are app-root singletons owned by
// `Toaster.vue`; per-toast nesting broke swipe/stacking/region semantics under
// N>1 toasts, so this is now a clean `<ToastRoot>` wrapper.
const delegatedProps = computed(() => {
    const { class: _, tone: __, surface: ___, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <ToastRoot
        data-slot="toast"
        :data-tone="tone"
        :data-surface="surface"
        data-reveal="overlay"
        data-corner="top-left"
        v-bind="forwarded"
        :class="
            cn(
                // The overlay-band material carve: Toast joins the shared
                // `glass-floating` substrate every overlay sibling (Dialog / Sheet /
                // Popover / DropdownMenu / Combobox) already uses, retiring the flat
                // `bg-background`/`shadow-modal`. This resolves the
                // base through the private floating-rung resolver — see the script block above
                // (no quotes/parens detail here: this comment lives inside the binding attr).
                surfaceClass('floating'),
                // The toast MATERIALIZES on the ONE overlay register
                // (`data-reveal=overlay`: scale-from 0.94 + decongest-blur + fade on the
                // `--enter-overlay-clock`) — the SAME spring/transition contract the
                // Dialog/Sheet/Popover ride (F20: the toast enters exactly like the refined
                // dialog, no bespoke transient fork). It blooms FROM its own centre (law 18: an
                // overlay GROWS from a seed, never slides in from a viewport edge), NOT the
                // retired slide-in-from-viewport-edge. The reka `tw-animate-css`
                // `data-[state=open]:animate-in` / `animate-out` / `slide-in-from-*-full` /
                // `fade-out-80` chain + the own `transition-[opacity, transform]` are RETIRED
                // (clean break, no alias) — `.glass-reveal` owns the data-state enter (via
                // @starting-style, transform-origin center) AND the exit (the `glass-reveal-out`
                // keyframe reka's usePresence awaits, on the tight overlay exit clock — fade-led
                // and asymmetric per law 8). The swipe-drag gesture keeps its reka-driven
                // `translate-x` (with `transition-none` during the active move); the reveal's own
                // `translate` leg springs the cancel/settle back.
                // The overlay-band golden padding ladder (inline anchor --spacing(6),
                // block axis sqrt-phi *1.272) is the ONLY inline padding: the close mark
                // straddles the corner rather than sitting inside the box, so the
                // right-hand clearance an inset × needed is struck with it (below).
                // Toast wears the CARD role (16px), not the panel rung (12px). A toast
                // is a presented plate floating ABOVE the card band; at `rounded-panel` it
                // sat on a 16px card at 0.75:1 — the more elevated surface the LESS
                // rounded, the exact inversion the radius canon exists to forbid. Both are
                // 16 now, and they move together off `--radius-card`.
                // The DISMISSAL is the vaporize (BK #30): the toast enters on the
                // overlay reveal register and leaves by releasing its backdrop in three
                // desynchronised channels while its ink drops first. WAVES:662 names
                // notification dismissal as that wave's own consumer, and this is the
                // library's notification. The two recipes compose — `.glass-reveal`
                // owns the bloom, `.glass-vaporize` owns the death.
                //
                // `overflow-hidden` is STRUCK, and `pr-8` with it. The close mark now
                // straddles the top-left corner (IOS27-ARCHIVE §3), so a clipping
                // parent would paint half a disc, and the right-hand clearance that
                // existed for an inset × is dead padding once the × is not inset.
                // The rung's own 1px rim, declared where it is known: the corner offset is
                // measured against the border box and an absolute child resolves against
                // the padding box, so the host states its border or the mark sits a pixel
                // too far in on both axes.
                'glass-reveal glass-vaporize glass-corner-host [--corner-affordance-host-border:1px] [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] group pointer-events-auto relative flex w-full items-center justify-between space-x-4 rounded-card px-(--overlay-pad-inline) py-(--overlay-pad-block) data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:transition-none',
                // The body text stays --foreground (legibility); the tinted-glass wash + the
                // tone-keyed rim + the full-chroma glyph carry the semantic. Toggling on the
                // tone register only for a NON-neutral tone keeps `neutral` the un-toned
                // floating glass.
                'text-foreground',
                {
                    'feedback-tone [&_svg]:text-(--tone)': tone !== 'neutral',
                    'feedback-tone-destructive': tone === 'destructive',
                    'feedback-tone-success': tone === 'success',
                    'feedback-tone-warning': tone === 'warning',
                    'feedback-tone-info': tone === 'info',
                },
                props.class,
            )
        "
    >
        <slot />
    </ToastRoot>
</template>
