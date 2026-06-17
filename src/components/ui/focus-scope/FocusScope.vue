<script setup lang="ts">
import { computed } from 'vue'
import {
  FocusScope,
  type FocusScopeEmits,
  type FocusScopeProps,
  useForwardPropsEmits,
} from 'reka-ui'

/**
 * FocusScope — the published focus-trap host (BB.W-CONTROL-TOKENS, the a11y
 * pair). A thin pass-through over reka's `FocusScope` primitive so a consumer's
 * modal / survey / dialog-shaped focus-trap need reaches the platform primitive
 * WITHOUT importing reka directly (the substrate-single discipline — glass-ui's
 * focus-trap IS reka's, never a hand-rolled trap).
 *
 * Props forwarded verbatim:
 *  - `trapped` — keep focus inside the scope (default false).
 *  - `loop`    — wrap Tab from last → first (default false).
 *  - `as` / `asChild` — the render-element contract.
 * Emits forwarded: `mountAutoFocus` / `unmountAutoFocus`.
 *
 * Adds NO style/class register — focus trapping is structural, not visual; a
 * consumer composes it around its own surface. Published on `/focus-scope` +
 * the `ui` barrel.
 */
const props = defineProps<FocusScopeProps>()
const emits = defineEmits<FocusScopeEmits>()

const forwarded = useForwardPropsEmits(computed(() => props), emits)
</script>

<template>
  <FocusScope data-slot="focus-scope" v-bind="forwarded">
    <slot />
  </FocusScope>
</template>
