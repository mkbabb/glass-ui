<script lang="ts" setup>
import { computed, ref, type CSSProperties, type HtmlHTMLAttributes } from 'vue'
import {
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import DrawerOverlay from './DrawerOverlay.vue'
import { cn } from '../../../utils'
// BA.W-SURFACE-AXIS — Drawer carries the SHARED {glass·veil·opaque} surface axis.
// The `.glass-drawer` recipe is a parallel glass recipe (NOT on the 5-rung ladder);
// the `[data-surface]` decoration applies ON TOP of it — the veil rung strips the
// border/rim, the opaque rung sets `--glass-level:0` on the host — both ride the
// shared seam, NO `glass-drawer`-local fork. PRESERVED byte-for-byte through the
// abrogation (the public surface axis is inviolate).
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'
// BB.W-DRAWER-ABROGATE — the house snap engine (the snap math vaul-vue used to own,
// on the HOUSE `SpringProgress` clock). The content binds it against the snap seam
// `<Drawer>` provides; the engine drives `--glass-drawer-t` (the snap-fraction
// scalar) this content root reads as a translate.
import { useOptionalDrawerSnapContext } from './composables/drawerSnapContext'
import { useDrawerSnap } from './composables/useDrawerSnap'

/**
 * `showOverlay` — render the scrim (AN.W3). Defaults `true` for the modal sheet. The
 * live-behind pattern (`<Drawer mode="live-behind">`) passes `:show-overlay="false"`
 * so the page-behind stays visible AND interactive; reka's `:modal="false"` already
 * drops outside-pointer-capture + the focus trap, but a painted scrim would still
 * visually occlude the live surface, so the overlay is opt-out at the content level.
 */
const props = withDefaults(
  defineProps<
    DialogContentProps & {
      class?: HtmlHTMLAttributes['class']
      showOverlay?: boolean
      /** Surface decoration register (BA.W-SURFACE-AXIS) — the SHARED
       *  {glass·veil·opaque} axis on top of the `.glass-drawer` recipe. */
      surface?: Surface
    }
  >(),
  { showOverlay: true, surface: 'glass' },
)
const emits = defineEmits<DialogContentEmits>()

// Strip the glass-ui-local props (`class`/`showOverlay`/`surface`) before forwarding
// to reka's DialogContent — an unknown `surface` attr would leak.
const delegatedProps = computed(() => {
  const { class: _, showOverlay: __, surface: ___, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// BA.W-SURFACE-AXIS — the veil/opaque decoration on top of the `.glass-drawer`
// recipe (strip the resolver's base-tier prefix; the recipe owns the base). The
// `:data-surface` attr drives the CSS seam in lockstep.
const surfaceDecoration = computed(() =>
  surfaceClass(props.surface).replace(/^glass-\w+\s*/, ''),
)

// BB.W-DRAWER-ABROGATE — bind the house snap engine. The snap seam is OPTIONAL (a
// `<DrawerContent>` outside a `<Drawer>` renders bare); when present the engine owns
// the `--glass-drawer-t` scalar + the handle drag gesture. reka's `DialogContent` is
// a component (not a bare element), so the template ref resolves the component
// instance — `setContentEl` unwraps the forwarded root element (`$el`) the engine
// writes its scalar onto.
const contentEl = ref<HTMLElement | null>(null)
const handleEl = ref<HTMLElement | null>(null)
function setContentEl(instance: unknown): void {
  if (!instance) {
    contentEl.value = null
    return
  }
  const el = (instance as { $el?: unknown }).$el ?? instance
  contentEl.value = el instanceof HTMLElement ? el : null
}
const snapCtx = useOptionalDrawerSnapContext()
const snap = snapCtx
  ? useDrawerSnap({ contentEl, handleEl, ctx: snapCtx })
  : null

// Whether a real detent ladder is in play (the snap-fill-viewport CSS rule keys off
// `data-glass-drawer-snap-points`). A side-lens (empty ladder) or single-stop sheet
// is content-sized; a multi-detent bottom sheet fills viewport height.
const hasSnapPoints = computed(
  () => (snapCtx?.snapPoints.value.length ?? 0) > 1,
)
const direction = computed(() => snapCtx?.direction.value ?? 'bottom')

// The snap-translate transform — the `--glass-drawer-t` scalar (0 = closed/offscreen,
// 1 = fully open) maps to the sheet's translate along its drag axis. Token-driven
// inline transform (the tailwind-first law: NO raw pasted CSS — the scalar IS a
// custom property the engine writes). reka's mount transition handles the discrete
// open/close fade; the spring drives the detent interpolation between.
const snapStyle = computed<CSSProperties | undefined>(() => {
  if (!snapCtx) return undefined
  // `1 - t` of the sheet remains off the open edge; for a side lens it is the inline
  // axis. The CSS `--glass-drawer-t` default (1) keeps a no-snap sheet fully open.
  const dir = direction.value
  if (dir === 'bottom')
    return { transform: 'translateY(calc((1 - var(--glass-drawer-t, 1)) * 100%))' }
  if (dir === 'top')
    return { transform: 'translateY(calc((var(--glass-drawer-t, 1) - 1) * 100%))' }
  if (dir === 'left')
    return { transform: 'translateX(calc((var(--glass-drawer-t, 1) - 1) * 100%))' }
  return { transform: 'translateX(calc((1 - var(--glass-drawer-t, 1)) * 100%))' }
})
</script>

<template>
  <DialogPortal>
    <DrawerOverlay v-if="props.showOverlay" />
    <DialogContent
      :ref="setContentEl"
      v-bind="forwarded"
      data-glass-drawer
      :data-glass-drawer-snap-points="hasSnapPoints ? 'true' : undefined"
      :data-glass-drawer-direction="direction"
      :data-surface="props.surface"
      :class="cn('glass-drawer', surfaceDecoration, props.class)"
      :style="snapStyle"
    >
      <!-- Detent peek handle (AN.W3) — the grip the user drags to cycle the
           detents (the house snap engine binds its pointer gesture). -->
      <div
        ref="handleEl"
        class="glass-drawer-handle"
        data-glass-drawer-handle
        :data-dragging="snap?.dragging.value ? '' : undefined"
        aria-hidden="true"
      >
        <span class="glass-drawer-grip" />
      </div>
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
