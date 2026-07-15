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
import { cn } from '../_shared/class-names'
// BA.W-SURFACE-AXIS — Drawer carries the SHARED {glass·veil·opaque} surface axis.
// The `.glass-drawer` recipe is a parallel glass recipe (NOT on the 5-rung ladder);
// the `[data-surface]` decoration applies ON TOP of it — the veil rung strips the
// border/rim, the opaque rung sets `--glass-level:0` on the host — both ride the
// shared seam, NO `glass-drawer`-local fork. PRESERVED byte-for-byte through the
// abrogation (the public surface axis is inviolate).
import { decorationClass, type Surface } from '../_shared/useSurfaceAxis'
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
// BG.W-SHEET-INSET-ROOT (portal-attrs) — reka DialogPortal roots a Teleport, which
// cannot carry Vue's default attr-fallthrough, so a consumer's aria-label/aria-labelledby/
// data-testid on <DrawerContent> would be DROPPED. Turn off auto-inherit and spread
// `...$attrs` explicitly onto the forwarded content node (the SheetContent discipline), so
// the a11y name reaches the teleported drawer content. Locked by proof:emission (W7).
defineOptions({
  inheritAttrs: false,
})

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
// recipe (the recipe owns the base). BI.W-SURFACE-EXTRACT — decoration-only, no
// `.replace` tier-strip wart. The `:data-surface` attr drives the CSS seam.
const surfaceDecoration = computed(() =>
  decorationClass(props.surface),
)

// BB.W-DRAWER-ABROGATE — bind the house snap engine. The snap seam is OPTIONAL (a
// `<DrawerContent>` outside a `<Drawer>` renders bare); when present the engine owns
// the `--glass-drawer-t` scalar + the handle drag gesture.
//
// BG.W-DRAWER-PAINT-BIND (F5.R2) — the content element is resolved LIVE from the
// proven-live `handleEl` string-ref, NOT snapshotted off reka's `DialogContent.$el`.
// reka forwards its root through a `<Presence>` swap, so a `$el` captured when the
// function-ref first fires is a stale comment placeholder that never refreshes when
// `<Presence>` mounts the real element — the writer wrote to a dead ref forever (the
// model↔paint SEVER: `--glass-drawer-t` stayed unwritten, the sheet never moved). The
// A hidden anchor mounts with every sheet; a real detent handle supersedes it when
// present. Either resolves the live content root without relying on Presence's
// transient component ref.
const handleEl = ref<HTMLElement | null>(null)
const contentAnchorEl = ref<HTMLElement | null>(null)
const resolveContentEl = (): HTMLElement | null =>
  ((handleEl.value ?? contentAnchorEl.value)?.closest(
    '[data-glass-drawer]',
  ) as HTMLElement | null) ?? null
const snapCtx = useOptionalDrawerSnapContext()
const snap = snapCtx
  ? useDrawerSnap({ contentEl: resolveContentEl, handleEl, ctx: snapCtx })
  : null

// Whether a real detent ladder is in play (the snap-fill-viewport CSS rule keys off
// `data-glass-drawer-snap-points`). A side-lens (empty ladder) or single-stop sheet
// is content-sized; a multi-detent bottom sheet fills viewport height.
const hasSnapPoints = computed(
  () => (snapCtx?.snapPoints.value.length ?? 0) > 1,
)
const detents = computed(() =>
  [...(snapCtx?.snapPoints.value ?? [])].sort((a, b) => a - b),
)
const activeDetentIndex = computed(() => {
  const raw = snapCtx?.activeSnapPoint.value
  const value = typeof raw === 'number' ? raw : Number.parseFloat(String(raw))
  if (Number.isNaN(value)) return Math.max(0, detents.value.length - 1)
  return detents.value.reduce(
    (best, point, index) =>
      Math.abs(point - value) < Math.abs(detents.value[best]! - value) ? index : best,
    0,
  )
})
const activeDetent = computed(() => detents.value[activeDetentIndex.value] ?? 1)
const detentValueText = computed(
  () =>
    `${Math.round(activeDetent.value * 100)}%, position ${activeDetentIndex.value + 1} of ${detents.value.length}`,
)
const direction = computed(() => snapCtx?.direction.value ?? 'bottom')
const mode = computed(() => snapCtx?.mode.value ?? 'modal')

function onHandleKeydown(event: KeyboardEvent) {
  if (!snap || !hasSnapPoints.value) return
  const last = detents.value.length - 1
  let index = activeDetentIndex.value
  if (event.key === 'Home') index = 0
  else if (event.key === 'End') index = last
  else if (event.key === 'ArrowUp' || event.key === 'ArrowRight')
    index = Math.min(last, index + 1)
  else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft')
    index = Math.max(0, index - 1)
  else return
  event.preventDefault()
  snap.snapTo(detents.value[index]!)
}

// The snap-translate transform — the `--glass-drawer-t` scalar (0 = closed/offscreen,
// 1 = fully open) maps to the sheet's translate along its drag axis. Token-driven
// inline transform (the tailwind-first law: NO raw pasted CSS — the scalar IS a
// custom property the engine writes). reka's mount transition handles the discrete
// open/close fade; the spring drives the detent interpolation between.
const snapStyle = computed<CSSProperties | undefined>(() => {
  if (!snapCtx) return undefined
  // `1 - t` of the sheet remains off the open edge; for a side lens it is the inline
  // axis. BG.W-DRAWER-PAINT-BIND (NO-MASKING-FALLBACK edict) — the un-written fallback
  // is `0` (the CSS CLOSED state, the design), NEVER `1`: a `1` fallback seated the
  // sheet FULL-OPEN whenever the writer was dead, silently masking the sever. At `0`
  // an un-written sheet reads offscreen (fail LOUD); the live writer seats + slides it.
  const dir = direction.value
  if (dir === 'bottom')
    return { transform: 'translateY(calc((1 - var(--glass-drawer-t, 0)) * 100%))' }
  if (dir === 'top')
    return { transform: 'translateY(calc((var(--glass-drawer-t, 0) - 1) * 100%))' }
  if (dir === 'left')
    return { transform: 'translateX(calc((var(--glass-drawer-t, 0) - 1) * 100%))' }
  return { transform: 'translateX(calc((1 - var(--glass-drawer-t, 0)) * 100%))' }
})
</script>

<template>
  <DialogPortal>
    <DrawerOverlay v-if="props.showOverlay" />
    <DialogContent
      v-bind="{ ...forwarded, ...$attrs }"
      data-glass-drawer
      :data-mode="mode"
      :data-glass-drawer-snap-points="hasSnapPoints ? 'true' : undefined"
      :data-glass-drawer-direction="direction"
      :data-surface="props.surface"
      :class="cn('glass-drawer glass-overlay', surfaceDecoration, props.class)"
      data-material="transient-overlay"
      :style="snapStyle"
    >
      <span ref="contentAnchorEl" hidden />
      <!-- The detent grip is present only for a real ladder. Pointer, touch, and
           keyboard all settle through useDrawerSnap.snapTo's active model writer. -->
      <div
        v-if="hasSnapPoints"
        ref="handleEl"
        class="glass-drawer-handle"
        data-glass-drawer-handle
        :data-dragging="snap?.dragging.value ? '' : undefined"
        role="slider"
        tabindex="0"
        aria-label="Drawer position"
        :aria-orientation="direction === 'left' || direction === 'right' ? 'horizontal' : 'vertical'"
        :aria-valuemin="detents[0]"
        :aria-valuemax="detents[detents.length - 1]"
        :aria-valuenow="activeDetent"
        :aria-valuetext="detentValueText"
        @keydown="onHandleKeydown"
      >
        <span class="glass-drawer-grip" aria-hidden="true" />
      </div>
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
