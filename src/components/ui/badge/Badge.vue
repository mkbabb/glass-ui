<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type BadgeVariants, badgeVariants } from '.'
import { cn } from '../../../utils'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  /**
   * BD.W-GLASS-ATOM-REGISTER — the register split. `loud` (default) is the opaque
   * saturated identity pill; `glass` is the quiet transmissive `.glass-atom`
   * capsule tinted via `--glass-fill-tint`. A status badge stays loud (information,
   * not a sticker); `secondary`/`outline` placements may route quiet.
   */
  surface?: BadgeVariants['surface']
  /**
   * The LOUD cel cast opt-in (BD.W-CARTOON-CASTER). Every badge carries the
   * family floor (the press-squish + a hairline rim-cast); `cast` INTENSIFIES the
   * loud layered-offset stamp + mounts the inert `.cartoon-cast` child. A status
   * pill is information, so the loud stamp is opt-in (not the default).
   */
  cast?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="badge"
    :data-variant="variant"
    :data-size="size"
    :data-surface="surface === 'glass' ? 'glass' : undefined"
    :data-cast="cast ? '' : undefined"
    :class="cn(badgeVariants({ variant, size, surface }), props.class)"
  >
    <!-- The inert moving cel cast (BD.W-CARTOON-CASTER) — an aria-hidden child the
         loud register floats above, NEVER a ::before/::after (both are occupied on
         the glass carrier). Mounted only when the loud stamp is asked for. -->
    <span v-if="cast" class="cartoon-cast" aria-hidden="true" />
    <slot />
  </div>
</template>
