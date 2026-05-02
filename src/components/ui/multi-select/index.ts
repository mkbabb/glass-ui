import type { Component } from 'vue'

export { default as MultiSelect } from './MultiSelect.vue'

export interface MultiSelectOption {
  value: string
  label: string
  icon?: string | Component
}
