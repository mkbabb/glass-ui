import { inject, provide, useId } from 'vue'

interface DisclosureIds {
  content: string
  trigger: string
}

const disclosureIdsKey = Symbol('glass-disclosure-ids')

export function provideDisclosureIds(): DisclosureIds {
  const id = useId()
  const ids = {
    content: `glass-disclosure-content-${id}`,
    trigger: `glass-disclosure-trigger-${id}`,
  }

  provide(disclosureIdsKey, ids)

  return ids
}

export function useDisclosureIds(): DisclosureIds {
  const ids = inject<DisclosureIds>(disclosureIdsKey)

  if (!ids)
    throw new Error('Disclosure trigger and content must be nested in their root or item')

  return ids
}
