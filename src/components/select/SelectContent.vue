<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { Surface } from "../_shared/axes";
import type { FloatingPlacementProps } from "../_shared/floating";
import type { PointerDownOutsideEvent } from "../_shared/interaction";

export interface SelectContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
    surface?: Surface;
    /** Hue re-emitted onto the portalled field, in CSS degrees. */
    fieldHue?: number;
}

export interface SelectContentEmits {
    closeAutoFocus: [event: Event];
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    SelectContent as RekaSelectContent,
    SelectPortal as RekaSelectPortal,
    SelectViewport as RekaSelectViewport,
} from "reka-ui";
import SelectScrollDownButton from "./SelectScrollDownButton.vue";
import SelectScrollUpButton from "./SelectScrollUpButton.vue";
import { cn } from "../_shared/class-names";
import { useOptionalDockContext } from "../dock/composables/dockContext";
// Thread the SHARED {glass·veil·opaque} surface axis + the
// φ --overlay-pad-* ladder onto the Select listbox (the overlay golden uniformity).
// Default `glass` is the bare `glass-floating` plate.
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";

defineOptions({
    name: "SelectContent",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<SelectContentProps>(), {
    side: "bottom",
    sideOffset: 0,
    align: "start",
    alignOffset: 0,
    surface: "glass",
});
const emit = defineEmits<SelectContentEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        bodyLock: _bodyLock,
        "body-lock": _bodyLockKebab,
        position: _position,
        ...forwarded
    } = attrs;
    return forwarded;
});
const placementProps = computed(() => ({
    position: "popper" as const,
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: true,
    collisionPadding: 16,
}));
const dockContext = useOptionalDockContext();

// Re-emit the route's warm-field hue onto the portalled menu.
// Only writes `--field-h` when the consumer supplies it (a bare Select inherits the
// select.css `--field-h: 48` floor); `data-field-palette` is a paint-inert marker.
const fieldStyle = computed(() =>
    props.fieldHue != null ? { "--field-h": String(props.fieldHue) } : undefined,
);
</script>

<template>
    <RekaSelectPortal>
        <!--
      The collision-bound moved OUT of the dead
      arbitrary-bracket class `[max-height:var(--reka-popper-available-height,60dvh)]`
      (which compiled only into a dist/*.js chunk no consumer content-scan reaches)
      into the PRECOMPILED `[data-slot="select-content"]` rule in src/styles/select.css
      — it now SHIPS in dist/glass-ui.css regardless of consumer JIT reach, so a 16-item
      dropdown bounds inside the viewport with SelectViewport owning scroll in EVERY
      consumer. The `origin-(--reka-select-content-transform-origin)` STAYS:
      once the box is
      bounded the `.glass-reveal` spring-clocked scale-in (off the
      retired `popover-animate` bezier zoom-95) no longer sweeps an unbounded column,
      and the scale origin tracks reka's measured anchor edge for non-center triggers
      (the panel blooms from the trigger edge with no lateral settle).
    -->
        <RekaSelectContent
            v-bind="{ ...placementProps, ...forwardedAttrs }"
            :data-glass-dock-portal="dockContext?.id ? '' : undefined"
            :data-glass-dock-owner="dockContext?.id"
            :data-surface="props.surface"
            data-material="overlay"
            data-reveal="menu"
            data-slot="select-content"
            :class="
                cn(
                    'relative z-popover min-w-(--overlay-min-width) overflow-hidden rounded-panel border text-popover-foreground glass-reveal origin-(--reka-select-content-transform-origin)',
                    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                    resolveSurfaceClass('floating'),
                    // The portal escapes the route's field to <body>, so the
                    // menu carries its OWN clipped warm field. `.glass-field-portal` (select.css)
                    // paints a 3-stop warm spine keyed to `--field-h` BEHIND the plate so the
                    // floating `backdrop-filter` finally has warm chroma to bend (the un-gray
                    // amplifier — the floor in select.css is the guarantee). The route re-emits
                    // its own `--field-h` via the `:style` below; absent that it floors to 48
                    // (forms terracotta) so a bare Select still reads warm.
                    'glass-field-portal',
                    '[--overlay-pad-inline:--spacing(1)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)]',
                    props.class,
                )
            "
            :style="fieldStyle"
            @close-auto-focus="emit('closeAutoFocus', $event)"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
        >
            <SelectScrollUpButton />
            <RekaSelectViewport
                data-slot="select-viewport"
                :class="
                    cn(
                        'max-h-[inherit] overflow-y-auto px-(--overlay-pad-inline) py-(--overlay-pad-block) h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)',
                    )
                "
            >
                <slot />
            </RekaSelectViewport>
            <SelectScrollDownButton />
        </RekaSelectContent>
    </RekaSelectPortal>
</template>
