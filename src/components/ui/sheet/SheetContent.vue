<script setup lang="ts">
import { type HTMLAttributes, type CSSProperties, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  injectDialogRootContext,
  useForwardPropsEmits,
} from 'reka-ui'
import { X } from "@lucide/vue"
import { type SheetVariants, sheetVariants } from '.'
import { cn } from '../../../utils'
import { useSpringMount, type SpringPreset } from '../../../composables/motion/useSpringMount'
import ModalOverlay from '../_shared/ModalOverlay.vue'
// BA.W-SURFACE-AXIS — Sheet (the modal-chrome sibling of Dialog) gains the SHARED
// {glass·veil·opaque} surface axis (IG-B3 — sheetVariants varied on `side` only).
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: SheetVariants['side']
  /** Surface decoration register (BA.W-SURFACE-AXIS) — the SHARED
   *  {glass·veil·opaque} axis. `glass` (default) renders the floating glass tier
   *  sheetVariants already bakes; `veil` overlays the borderless text-legibility
   *  plate; `opaque` sets `--glass-level:0` (the solid-card escape). */
  surface?: Surface
  /**
   * Opt into iOS spring-physics entrance via `useSpringMount` (W13). When
   * truthy, the sheet slides from off-edge via a `useSpring`-driven
   * transform instead of the default `sheet-animate` slide. Pass `true`
   * for the canonical `smooth` preset, or one of
   * `'smooth' | 'snappy' | 'bouncy' | 'gentle'` to pick a (response, ζ).
   * PRM: `useSpring` snaps the spring to target — entry is instant.
   */
  spring?: boolean | SpringPreset
  /**
   * Enable pointer drag-dismiss (Sheet only; requires `spring`). The pointer
   * y-delta drives `useSpringMount`'s target mid-drag; on release the
   * `dragThreshold` (default 0.3 of sheet height) decides bounce-back vs.
   * dismiss. Mid-flight re-target preserves spring continuity (no jump).
   */
  dragDismiss?: boolean
  /** Fraction of sheet travel that crosses dismiss (default 0.3). */
  dragThreshold?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, side, surface: _su, spring: _sp, dragDismiss: _dd, dragThreshold: _dt, ...delegated } = props

  return delegated
})

// BA.W-SURFACE-AXIS — the veil/opaque decoration on top of sheetVariants' baked
// `glass-floating` tier (strip the resolver's base-tier prefix; the variant owns
// the base). `:data-surface` (template) drives the CSS seam in lockstep.
const surfaceDecoration = computed(() =>
  surfaceClass(props.surface ?? 'glass').replace(/^glass-\w+\s*/, ''),
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// W13 spring entrance + optional drag-dismiss. Inject reka-ui's open ref
// and onOpenChange so the drag-dismiss release can close the sheet. The
// spring position 0→1 maps to a translate along the sheet's edge axis;
// `bottom` is the canonical drag-dismiss side (downward swipe).
const rootContext = props.spring ? injectDialogRootContext() : null
const springMount = props.spring && rootContext
  ? useSpringMount({
      open: rootContext.open,
      preset: typeof props.spring === 'string' ? props.spring : 'smooth',
      dismissThreshold: props.dragThreshold ?? 0.3,
      onDismiss: () => rootContext.onOpenChange(false),
    })
  : null

const side = computed(() => props.side ?? 'right')

function translateForPosition(p: number, axisSide: string): string {
  // p: 0 = mounted (in-frame), 1 = fully dismissed (off-edge)
  const pct = `${p * 100}%`
  switch (axisSide) {
    case 'top':    return `translateY(-${pct})`
    case 'bottom': return `translateY(${pct})`
    case 'left':   return `translateX(-${pct})`
    case 'right':
    default:       return `translateX(${pct})`
  }
}

const springStyle = computed<CSSProperties | undefined>(() => {
  if (!springMount) return undefined
  return {
    transform: translateForPosition(springMount.position.value, side.value),
    // `animation: none` overrides tw-animate-css's `animate-in` + `slide-in-from-*`
    // keyframe-driven transform (which would race the spring's inline transform).
    // `transition: none` neutralizes the cubic transition for completeness.
    animation: 'none',
    transition: 'none',
  }
})

// Drag handlers — only spread when both `spring` AND `dragDismiss` engaged.
// `side="bottom"` is the canonical drag-dismiss-down case; other sides are
// supported but the gesture remains a y-delta (the threshold is consistent).
const dragHandlers = computed(() =>
  props.spring && props.dragDismiss && springMount ? springMount.dragHandlers : {},
)
</script>

<template>
  <DialogPortal>
    <ModalOverlay scrim="glass" animate="fade" layout="centered" />
    <DialogContent
      :class="cn(sheetVariants({ side }), surfaceDecoration, props.spring ? 'transition-none' : '', props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
      :style="springStyle"
      data-slot="sheet-content"
      :data-side="side"
      :data-surface="props.surface ?? 'glass'"
      :data-spring="props.spring ? (typeof props.spring === 'string' ? props.spring : 'smooth') : undefined"
      :data-drag-dismiss="props.spring && props.dragDismiss ? '' : undefined"
      v-on="dragHandlers"
    >
      <slot />

      <DialogClose
        class="focus-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <X class="w-4 h-4 text-muted-foreground" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
