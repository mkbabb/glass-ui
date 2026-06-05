<script lang="ts">
// AQ.W4 §W4.2 — attr-passthrough contract (see Input.vue). `inheritAttrs:false`
// + explicit `v-bind="$attrs"` lands every native `<textarea>` attribute
// (`aria-*`, `required`, `maxlength`, `placeholder`, `name`, …) on the
// focusable element.
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import type { HTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '../../../utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    defaultValue?: string | number
    modelValue?: string | number
    // Element-specific <textarea> attributes typed on the wrapper surface (the
    // rest of the native attribute set still falls through via `v-bind="$attrs"`).
    placeholder?: TextareaHTMLAttributes['placeholder']
    disabled?: TextareaHTMLAttributes['disabled']
    /**
     * AQ.W4 §W4.3 — opt into `field-sizing: content` auto-grow. When `true`,
     * the textarea grows vertically with its content between a 3-line floor
     * and a `--textarea-autosize-max` ceiling (default `12lh`), then scrolls;
     * the manual resize handle stays. Default `false` keeps the fixed
     * `min-h-20` height (the unchanged no-op fallback).
     *
     * `field-sizing` is Baseline Newly (Chromium 2024) — on a non-supporting
     * engine the element degrades to the fixed `min-block-size: 3lh` floor
     * with standard scroll (no JS, no polyfill).
     *
     * Caveat: a grid/flex parent stretches children, defeating `field-sizing`.
     * Inside a flex column, add `align-self: start` on the `<Textarea>` so it
     * sizes to content rather than the track.
     */
    autosize?: boolean
  }>(),
  { autosize: false },
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

// Declared props are extracted from `$attrs`, so forward them explicitly.
const elementAttrs = computed(() => ({
  placeholder: props.placeholder,
  disabled: props.disabled,
}))
</script>

<template>
  <textarea
    v-model="modelValue"
    v-bind="{ ...$attrs, ...elementAttrs }"
    :data-autosize="autosize ? '' : undefined"
    :class="cn('input-pill py-2 text-sm', autosize ? '' : 'min-h-20', props.class)"
  />
</template>
