<script lang="ts" setup>
import { computed } from 'vue'
import { DrawerContent, DrawerPortal } from 'vaul-vue'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import type { HtmlHTMLAttributes } from 'vue'
import DrawerOverlay from './DrawerOverlay.vue'
import { cn } from '../../../utils'
// BA.W-SURFACE-AXIS — Drawer gains the SHARED {glass·veil·opaque} surface axis.
// The `.glass-drawer` recipe is a parallel glass recipe (NOT on the 5-rung
// ladder); the `[data-surface]` decoration applies ON TOP of it — the veil rung
// strips the border/rim, the opaque rung sets `--glass-level:0` on the host —
// both ride the shared seam, NO `glass-drawer`-local fork.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

/**
 * `showOverlay` — render the scrim (AN.W3). Defaults `true` for the modal
 * sheet. The live-behind pattern (`<Drawer mode="live-behind">`) passes
 * `:show-overlay="false"` so the page-behind stays visible AND interactive;
 * vaul-vue's `modal:false` already drops `disableOutsidePointerEvents`, but a
 * painted scrim would still visually occlude the live verdict, so the overlay
 * is opt-out at the content level.
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

// Strip the glass-ui-local props (`class`/`showOverlay`/`surface`) before
// forwarding to vaul-vue's DrawerContent — an unknown `surface` attr would leak.
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
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay v-if="props.showOverlay" />
    <DrawerContent
      v-bind="forwarded" :data-surface="props.surface" :class="cn('glass-drawer', surfaceDecoration, props.class)"
    >
      <!-- Detent peek handle (AN.W3) — grips the sheet for drag-snap -->
      <div class="glass-drawer-handle" aria-hidden="true">
        <span class="glass-drawer-grip" />
      </div>
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
