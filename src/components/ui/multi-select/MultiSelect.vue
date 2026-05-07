<script setup lang="ts">
import { computed, ref, toRaw } from 'vue'
import type { Component } from 'vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../popover'
import { Button } from '../button'
import { Badge } from '../badge'
import { Check, ChevronDown, X } from 'lucide-vue-next'
import { cn } from '../../../utils'

export interface MultiSelectOption {
  value: string
  label: string
  icon?: string | Component
}

interface Props {
  options: MultiSelectOption[]
  modelValue: string[]
  placeholder?: string
  disabled?: boolean
  maxDisplay?: number
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select items...',
  disabled: false,
  maxDisplay: 3,
})

const emit = defineEmits<Emits>()

const open = ref(false)

const selectedOptions = computed(() =>
  props.options.filter(option => props.modelValue.includes(option.value))
)

const displayText = computed(() => {
  if (selectedOptions.value.length === 0) {
    return props.placeholder
  }

  if (selectedOptions.value.length <= props.maxDisplay) {
    return selectedOptions.value.map(option => option.label).join(', ')
  }

  return `${selectedOptions.value.slice(0, props.maxDisplay).map(option => option.label).join(', ')}... (+${selectedOptions.value.length - props.maxDisplay})`
})

function isTextIcon(icon: MultiSelectOption['icon']): icon is string {
  return typeof icon === 'string' && icon.length > 0
}

function componentIcon(icon: MultiSelectOption['icon']): Component | null {
  if (!icon || isTextIcon(icon)) return null
  return toRaw(icon) as Component
}

function toggleOption(value: string) {
  const newValue = props.modelValue.includes(value)
    ? props.modelValue.filter(v => v !== value)
    : [...props.modelValue, value]

  emit('update:modelValue', newValue)
}

function removeOption(value: string) {
  const newValue = props.modelValue.filter(v => v !== value)
  emit('update:modelValue', newValue)
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        :disabled="disabled"
        class="w-full justify-between text-left font-normal"
      >
        <span class="truncate">{{ displayText }}</span>
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0" align="start">
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandEmpty>No options found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="toggleOption(option.value)"
              class="cursor-pointer"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  modelValue.includes(option.value) ? 'opacity-100' : 'opacity-0'
                )"
              />
              <span v-if="isTextIcon(option.icon)" class="mr-2">{{ option.icon }}</span>
              <component
                v-else-if="componentIcon(option.icon)"
                :is="componentIcon(option.icon)"
                class="mr-2 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              {{ option.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

  <!-- Selected items display (compact badges) -->
  <div v-if="selectedOptions.length > 0" class="flex flex-wrap gap-1 mt-2">
    <Badge
      v-for="option in selectedOptions"
      :key="option.value"
      variant="secondary"
      class="text-xs px-2 py-1"
    >
      <span v-if="isTextIcon(option.icon)" class="mr-1">{{ option.icon }}</span>
      <component
        v-else-if="componentIcon(option.icon)"
        :is="componentIcon(option.icon)"
        class="mr-1 h-3 w-3 shrink-0"
        aria-hidden="true"
      />
      {{ option.label }}
      <Button
        variant="ghost"
        size="sm"
        class="ml-1 h-3 w-3 p-0 hover:bg-destructive hover:text-destructive-foreground"
        @click.stop="removeOption(option.value)"
      >
        <X class="h-2 w-2" />
      </Button>
    </Badge>
  </div>
</template>
