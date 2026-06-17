<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { ChevronDown } from "@lucide/vue"
import { cn } from '../../../utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & {
    class?: HTMLAttributes['class']
    /** 'default' = the shared control REST surface (BA.W-SURFACE-AXIS scope 7 —
     *  the `.control-surface` register every form control reads at rest, off the
     *  prior `glass-wash` gray fork); 'ghost' = transparent, no border/shadow */
    variant?: 'default' | 'ghost'
    /**
     * The trigger register — a TWO-RANGE axis (BA.W-MENU-GLASS / BA-VJS-4 WO-3):
     *  • HEIGHT tiers (`sm` | `default`) ride the `--control-h-*` comfort cohort
     *    (h-9 / h-10), byte-identical to today.
     *  • FONT-RUNG tiers (`display` | `audacious`) WRITE the shared picker-family
     *    `--dropdown-text` token on the Select SCOPE (inline style), so the
     *    trigger, the SelectValue, AND the item rows re-resolve at ONE scale off
     *    the ONE documented lever (`offsets-sizing.css` — the items read
     *    `--dropdown-text` via `menuItemVariants`' `text-dropdown` base). This is
     *    the fix for the value.js trigger-only `text-display` desync (a 1.59×
     *    trigger/items break): a consumer scaling the picker font reaches for the
     *    PROP, which sets the FAMILY token, NOT a trigger-local `text-*` class that
     *    leaves the items behind. The font rung carries a height too so the box
     *    grows with the type. The height tiers stay; the font rung is ADDITIVE
     *    (a consumer who never sets it keeps today's resolved sizes).
     *
     *  NOTE on the portal: `<SelectContent>` PORTALS to body, so the inline
     *  `--dropdown-text` on the trigger reaches the trigger/value/chevron directly;
     *  the items re-resolve when the consumer also threads the rung on the shared
     *  Select scope (the documented family lever). For a single self-scaling
     *  trigger the rung scales the visible trigger silhouette.
     */
    size?: 'sm' | 'default' | 'display' | 'audacious'
  }>(),
  { variant: 'default', size: 'default' },
)

const delegatedProps = computed(() => {
  const { class: _, variant: __, size: ___, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const variantClass = computed(() =>
  props.variant === 'ghost'
    ? 'bg-transparent border-none shadow-none'
    : 'control-surface',
)

// AX.W51 D18 — the trigger HEIGHT rides the `--control-h-*` comfort cohort (the
// scaled h-9/h-10 register). The font-rung tiers (BA-VJS-4) also bind a height so
// the box grows with the type; the height-only tiers keep `text-dropdown`.
const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-(--control-h-sm)'
    case 'display':
    case 'audacious':
      // The font rung wants room — the trigger box grows to the larger comfort
      // height so the up-scaled type is not clipped; the FONT scale itself comes
      // from the `--dropdown-text` write below (re-resolving `text-dropdown`).
      return 'h-(--control-h-lg)'
    default:
      return 'h-(--control-h-md)'
  }
})

// BA-VJS-4 / WO-3 — the FONT-RUNG write. When `size` is a font-rung value the
// trigger sets the picker-family scale on its OWN scope (inline style) to the
// matching √φ display rung. It writes BOTH `--dropdown-text` (the DOCUMENTED family
// lever — the token a consumer threads on the Select wrapper to scale items too) AND
// `--text-dropdown` (the var the `text-dropdown` @theme utility ACTUALLY reads at the
// element). The two-write is the substitution-vs-inheritance discipline: the
// `@theme inline` `--text-dropdown: var(--dropdown-text)` bridge bakes at :root, so a
// descendant overriding ONLY `--dropdown-text` would NOT re-resolve the :root-baked
// `--text-dropdown` (the trap the live π caught) — writing `--text-dropdown` directly
// re-resolves the utility for the trigger + value + any non-portalled descendant in
// lockstep. This is NOT a trigger-local `text-display` class that desyncs the items
// (the value.js 1.59× break); it is the FAMILY token, so a consumer threading
// `--dropdown-text` on the Select scope scales the portalled items too. The
// height-only tiers leave both unset (today's resolved scale).
const fontRungStyle = computed(() => {
  // `display` — the √φ heading rung (25.9px), a deliberate larger-picker scale
  // (the value.js break wanted a ~33px trigger; the family-token write keeps the
  // items in lockstep where the hand-applied trigger `text-display` desynced).
  // `audacious` — the φ² audacious-but-bounded display rung (the U30a color-space
  // dropdown register), still a CONTROL scale, not a page-hero rung.
  const rung =
    props.size === 'display'
      ? 'var(--type-heading)'
      : props.size === 'audacious'
        ? 'var(--type-display-1)'
        : undefined
  if (!rung) return undefined
  return { '--dropdown-text': rung, '--text-dropdown': rung }
})
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="forwardedProps"
    :style="fontRungStyle"
    :class="cn(
      variantClass,
      sizeClass,
      // BB.W-INVALID-RING — the aria-invalid ring reads the SHARED --invalid-ring
      // token (the --focus-ring-shadow sibling), no inline 35% re-spell. Per the
      // §Divergence-decisions table: the ring is UNIFIED onto the .input-pill
      // FOCUS-GATE (`focus-visible:aria-invalid:`) so a long form is not a wall of
      // always-on red rings, and the trigger group widens to the three-member set
      // (`:user-invalid`/fallback/`[aria-invalid]`) wherever the styleable node
      // supports it. The at-rest destructive border stays so an invalid select
      // reads before focus (the non-ring supplementary cue, off the SAME token).
      'tap-squish focus-ring flex w-full items-center justify-between rounded-pill px-3 py-2 text-dropdown placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled [&>span]:line-clamp-1 transition-control aria-invalid:border-(--destructive) user-invalid:border-(--destructive) focus-visible:aria-invalid:shadow-(--invalid-ring) focus-visible:user-invalid:shadow-(--invalid-ring)',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="transition-transform duration-200 ease-standard [&[data-state=open]]:rotate-180 h-4 w-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
