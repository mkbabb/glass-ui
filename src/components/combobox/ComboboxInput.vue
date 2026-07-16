<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SearchIcon } from "@lucide/vue";
import { ComboboxInput as RekaComboboxInput } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxInputEmits, ComboboxInputProps } from "./types";

defineOptions({ name: "ComboboxInput", inheritAttrs: false });

const props = defineProps<ComboboxInputProps>();
const emit = defineEmits<ComboboxInputEmits>();
const attrs = useAttrs();

const forwardedAttrs = computed(() => ({
    ...fixedHostAttrs(attrs),
    placeholder: props.placeholder,
}));
</script>

<template>
  <!-- BB.W-INVALID-RING — the combobox input is a borderless `bg-transparent`
       box, so the shared --invalid-ring (a box-shadow) is ROUTED onto the
       ring-bearing WRAPPER ROW (it carries the `border-b`) via `:has()` reaching
       the descendant input's `aria-invalid`/`:user-invalid` — the destructive ring
       reads the SAME --invalid-ring token as an invalid Input, not a text-only
       fork. The text-destructive tint on the input STAYS as the supplementary
       non-color-redundant cue. -->
  <div
    data-slot="combobox-input-wrapper"
    class="flex h-9 items-center gap-2 border-b px-3 rounded-input has-[[aria-invalid='true']]:border-(--destructive) has-[:user-invalid]:border-(--destructive) has-[[aria-invalid='true']]:shadow-(--invalid-ring) has-[:user-invalid]:shadow-(--invalid-ring)"
  >
    <SearchIcon class="size-4 shrink-0 opacity-50" />
    <RekaComboboxInput
      data-slot="combobox-input"
      :class="cn(
        // AX.W51 D18 — the filter-input HEIGHT reads the shared `--dropdown-input-height`
        // register (= W51's `--control-h-md`, unifying the Combobox h-10 / Command h-11
        // split onto ONE comfort-scaled register).
        // AX.W50 D17 — the font reads the family PRIMARY rung (`text-dropdown`).
        'placeholder:text-muted-foreground flex h-(--dropdown-input-height) w-full rounded-input bg-transparent py-3 text-dropdown outline-hidden disabled:cursor-not-allowed disabled:opacity-disabled aria-invalid:text-destructive aria-invalid:placeholder:text-[color-mix(in_srgb,var(--destructive)_60%,transparent)]',
        props.class,
      )"
      v-bind="forwardedAttrs"
      :model-value="props.modelValue"
      :auto-focus="props.autoFocus"
      :disabled="props.disabled"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <slot />
    </RekaComboboxInput>
  </div>
</template>
