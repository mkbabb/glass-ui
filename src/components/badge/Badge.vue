<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type BadgeVariants, badgeVariants } from './'
import { cn } from '../_shared/class-names'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  /**
   * BI.W-SYNONYM-RENAMES — the semantic status register (the shared `tone` axis:
   * neutral/destructive/success/warning/info). Orthogonal to the `variant` STYLE
   * plate; a set tone overrides the plate colour. Replaces the former
   * `variant="destructive|success|warning|info"` (a tone is not a style).
   */
  tone?: BadgeVariants['tone']
  size?: BadgeVariants['size']
  /**
   * BD.W-GLASS-ATOM-REGISTER — the register split. `loud` (default) is the opaque
   * saturated identity pill; `glass` is the quiet transmissive `.glass-atom`
   * capsule tinted via `--glass-fill-tint`. A status badge stays loud (information,
   * not a sticker); `secondary`/`outline` placements may route quiet.
   */
  surface?: BadgeVariants['surface']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="badge"
    :data-variant="variant"
    :data-tone="tone"
    :data-size="size"
    :data-surface="surface === 'glass' ? 'glass' : undefined"
    :class="cn(badgeVariants({ variant, tone, size, surface }), props.class)"
  >
    <slot />
  </div>
</template>
