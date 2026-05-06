# I.W2 Phase C — Tabs `provide`/`inject` re-verification

**Date**: 2026-05-05
**Lane**: I.W2
**HEAD**: `c3bf0a2`
**Method**: read-only walk; no source modifications.
**Settles**: Σ-1 from `W0-reconciliation.md` §6 (H FINAL §δ vs H deep-audit δ §8 dispute).

## Verdict

**`provide('glassTabs', { variant })` is delivered at HEAD.** The pattern is clean: `Tabs.vue` provides; `TabsList.vue` and `TabsTrigger.vue` inject with per-leaf prop override.

H FINAL §δ was correct. H deep-audit δ first-pass was a false positive; H deep-audit δ §8 already corrected itself at audit-reconciliation time. **No source change required for W2.**

## File:line citations at HEAD `c3bf0a2`

### Provider — `src/components/ui/tabs/Tabs.vue`

```ts
// line 1-21
<script setup lang="ts">
import { computed, provide } from 'vue'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { TabsListVariants } from '.'

const props = defineProps<TabsRootProps & {
  /** Default variant for descendant TabsList + TabsTrigger; overridable per-leaf. */
  variant?: TabsListVariants['variant']
}>()
const emits = defineEmits<TabsRootEmits>()

provide('glassTabs', { variant: computed(() => props.variant) })   // ← line 13

const delegated = computed(() => {
  const { variant: _, ...rest } = props
  return rest
})

const forwarded = useForwardPropsEmits(delegated, emits)
</script>
```

- **Line 13**: `provide('glassTabs', { variant: computed(() => props.variant) })`
- The `variant` prop is `computed(() => props.variant)` — a reactive ref; descendants re-resolve when the parent prop changes.

### Consumer A — `src/components/ui/tabs/TabsList.vue`

```ts
// line 1-20
<script setup lang="ts">
import { type HTMLAttributes, type ComputedRef, computed, inject } from 'vue'
import { TabsList, type TabsListProps } from 'reka-ui'
import { type TabsListVariants, tabsListVariants } from '.'
import { cn } from '@utils'

const props = defineProps<TabsListProps & {
  class?: HTMLAttributes['class']
  variant?: TabsListVariants['variant']
}>()

const tabsCtx = inject<{ variant: ComputedRef<TabsListVariants['variant']> } | null>('glassTabs', null)   // ← line 12
const resolvedVariant = computed(() => props.variant ?? tabsCtx?.variant.value)                            // ← line 13

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props
  return delegated
})
</script>
```

- **Line 12**: `inject<{ variant: ComputedRef<TabsListVariants['variant']> } | null>('glassTabs', null)`
- **Line 13**: `computed(() => props.variant ?? tabsCtx?.variant.value)` — per-leaf override falls through to provided context.

### Consumer B — `src/components/ui/tabs/TabsTrigger.vue`

```ts
// line 1-22
<script setup lang="ts">
import { type HTMLAttributes, type ComputedRef, computed, inject } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "reka-ui";
import { type TabsTriggerVariants, tabsTriggerVariants } from ".";
import { cn } from '@utils';

const props = defineProps<TabsTriggerProps & {
    class?: HTMLAttributes["class"];
    variant?: TabsTriggerVariants["variant"];
}>();

const tabsCtx = inject<{ variant: ComputedRef<TabsTriggerVariants["variant"]> } | null>("glassTabs", null);   // ← line 12
const resolvedVariant = computed(() => props.variant ?? tabsCtx?.variant.value);                              // ← line 13
```

- **Line 12**: same `inject` shape as TabsList.
- **Line 13**: same per-leaf override fall-through.

## Σ-1 reconciliation

Per `W0-reconciliation.md` §6 row Σ-1:

> **Tabs `provide('glassTabs')` delivered?** H FINAL §δ + H deep-audit δ §8: YES, delivered at G pass-2; W6.δ first-pass false positive. H W6.δ first-pass: NOT delivered, named CRITICAL-2.

**At HEAD `c3bf0a2`**: `provide('glassTabs', { variant })` is delivered at `Tabs.vue:13`; injects land at `TabsList.vue:12` and `TabsTrigger.vue:12`. Re-verified by direct read.

**Resolution recorded**:

> Tabs `provide('glassTabs')` is delivered at HEAD `c3bf0a2`. H FINAL §δ was correct; H deep-audit δ §8 first-pass false positive corrected at audit reconciliation. Tranche I §1 ledger row 5 RESOLVED stands. No source change required.

Chronic-deferral row 5 (`Tabs provide/inject refactor (disputed)`) closes here as **RESOLVED** for tranche I forward planning.

## Pattern completeness audit

The W2 dispatch asks whether the pattern is complete (e.g., size/density inheritable from `<Tabs>`).

### Current scope of provided context

`Tabs.vue:13` provides only `{ variant: computed(...) }`. No size, density, or other style props are context-passed.

### Tabs CVA surface (per `src/components/ui/tabs/index.ts`)

```ts
export const tabsListVariants = cva(
  'inline-flex items-center justify-center text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'h-10 rounded-md p-1',
        pill: 'h-10 rounded-full bg-[var(--glass-bg-subtle)] border border-[var(--glass-border-default)] p-1 gap-1',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export const tabsTriggerVariants = cva(
  '... (transition / focus / disabled / hover scaffolding) ...',
  {
    variants: {
      variant: {
        default: 'rounded-sm p-1 px-3 data-[state=active]:text-[var(--active-tab-color,var(--foreground))]',
        pill:    'rounded-full px-3 py-1 data-[state=active]:bg-[var(--glass-bg-medium)] ...',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)
```

The CVA surface ships **only one variant axis (`default | pill`)**. No `size`, `density`, or `tone` axes exist for either `tabsListVariants` or `tabsTriggerVariants`. Therefore the provided context (variant only) is **shape-complete for what the component actually offers**.

### Gap analysis

- **Size**: not a prop on the Tabs CVA surface. Consumers wrap their own size in the `class` slot. No context gap.
- **Density**: not a prop. No context gap.
- **Custom class slots**: `TabsList` and `TabsTrigger` accept a per-leaf `class` prop and merge it via `cn(tabsListVariants(...), props.class)`. No context plumbing for class — by design (consumers explicitly target one leaf).

### Decision

**Pattern is complete for the surface that exists.** No extension needed. If a future tranche adds size/density variants to the Tabs CVA, the provider should be extended to pass those too — the precedent is clean and the inject sites are 2-line additions per consumer.

## Files touched

None. This is a verification-only audit; no source modifications.

## Authority

Read-only walk at HEAD `c3bf0a2`. Three file:line citations confirm the provide/inject pair. Pattern is shape-complete for the current Tabs surface (variant-only). Σ-1 dispute settles in favour of H FINAL §δ. Chronic ledger row 5 = RESOLVED stands.
