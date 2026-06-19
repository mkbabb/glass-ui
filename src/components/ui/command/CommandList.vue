<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui'
import { ComboboxContent, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis + the
// φ --overlay-pad-* ladder onto the Command list + token-back `max-h-[300px]` onto
// `--overlay-max-block`. The Command HOST is a Dialog (CommandDialog) — its
// `surface` flows through `<Dialog surface>`; the list carries the axis so the
// standalone `<Command>` (not Dialog-hosted) also reads the golden uniformity.
// Default `glass` is byte-identical to HEAD.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

const props = withDefaults(defineProps<ComboboxContentProps & { class?: HTMLAttributes['class']; surface?: Surface }>(), {
  disableOutsidePointerEvents: false,
  surface: 'glass',
})
const emits = defineEmits<ComboboxContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxContent
    v-bind="forwarded"
    :data-surface="props.surface"
    :class="cn(
      'max-h-(--overlay-max-block) overflow-y-auto overflow-x-hidden',
      // The glass PLATE is the Command/Dialog host's (the list is an inner
      // scrollable region — no second glass tier); the `:data-surface` binding
      // records the axis so a standalone `<Command surface=…>` reaches the
      // surface-axis.css decoration over its host plate. The φ --overlay-pad-*
      // ladder (tight menu anchor) gives the row gutter the golden sqrt-φ cadence,
      // `:root`-retunable in lockstep with every overlay.
      '[--overlay-pad-inline:--spacing(1)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)',
      props.class,
    )"
  >
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>
