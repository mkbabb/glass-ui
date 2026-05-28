<script lang="ts" setup>
import { DrawerContent, DrawerPortal } from 'vaul-vue'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import type { HtmlHTMLAttributes } from 'vue'
import DrawerOverlay from './DrawerOverlay.vue'
import { cn } from '../../../utils'

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
    }
  >(),
  { showOverlay: true },
)
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay v-if="props.showOverlay" />
    <DrawerContent
      v-bind="forwarded" :class="cn('glass-drawer', props.class)"
    >
      <!-- Detent peek handle (AN.W3) — grips the sheet for drag-snap -->
      <div class="glass-drawer-handle" aria-hidden="true">
        <span class="glass-drawer-grip" />
      </div>
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
