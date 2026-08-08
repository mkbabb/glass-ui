<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { BADGE_AXIS_DEFAULTS, type BadgeVariants, badgeVariants } from './'
import { cn } from '../_shared/class-names'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  /**
   * the semantic status register (the shared `tone` axis:
   * neutral/destructive/success/warning/info). Orthogonal to the `variant` STYLE
   * plate; a set tone overrides the plate colour. Replaces the former
   * `variant="destructive|success|warning|info"` (a tone is not a style).
   */
  tone?: BadgeVariants['tone']
  size?: BadgeVariants['size']
  class?: HTMLAttributes['class']
}>()

// TRUTH IN DOM. The stamps carry the RESOLVED axis, from the SAME defaulting the
// class map applies — not the raw prop. `:data-variant="variant"` wrote nothing at
// all on 22 of 39 shipped badges (an unset prop stamps `undefined`, which Vue
// omits), so an attribute-keyed rule for the default variant was structurally
// unreachable while a reader of the DOM saw a badge with no variant. One source
// (`BADGE_AXIS_DEFAULTS`), two consumers (the class map and these stamps), so the
// two can never disagree again.
const resolved = computed(() => ({
  variant: props.variant ?? BADGE_AXIS_DEFAULTS.variant,
  tone: props.tone ?? BADGE_AXIS_DEFAULTS.tone,
  size: props.size ?? BADGE_AXIS_DEFAULTS.size,
}))
</script>

<template>
  <div
    data-slot="badge"
    :data-variant="resolved.variant"
    :data-tone="resolved.tone"
    :data-size="resolved.size"
    :class="cn(badgeVariants({ variant, tone, size }), props.class)"
  >
    <slot />
  </div>
</template>
