<script setup lang="ts">
import { computed } from 'vue'
import type { ComboboxRootEmits, ComboboxRootProps, DialogRootEmits, DialogRootProps } from 'reka-ui'
import Command from './Command.vue'
import { Dialog, DialogContent } from '../dialog'
// BC.W-OVERLAY-UNIFORM — the Command-is-a-Dialog-host case: `surface` flows
// THROUGH the Dialog host's shared {glass·veil·opaque} axis (no second surface
// axis on a Dialog-hosted overlay — the census on-the-line row). Default `glass`.
import type { Surface } from '../_shared/useSurfaceAxis'

type CommandDialogProps = DialogRootProps & {
  surface?: Surface
  modelValue?: ComboboxRootProps['modelValue']
}

type CommandDialogEmits = DialogRootEmits & Pick<ComboboxRootEmits, 'update:modelValue'>

const props = withDefaults(defineProps<CommandDialogProps>(), {
  surface: 'glass',
})
const emit = defineEmits<CommandDialogEmits>()

const dialogProps = computed(() => {
  const { surface: _, modelValue: __, ...delegated } = props
  return delegated
})
</script>

<template>
  <Dialog
    v-bind="dialogProps"
    @update:open="emit('update:open', $event)"
  >
    <DialogContent :surface="props.surface" class="overflow-hidden p-0">
      <Command
        :model-value="props.modelValue"
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[data-cmdk-input-wrapper]_svg]:h-5 [&_[data-cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
        @update:model-value="emit('update:modelValue', $event)"
      >
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
