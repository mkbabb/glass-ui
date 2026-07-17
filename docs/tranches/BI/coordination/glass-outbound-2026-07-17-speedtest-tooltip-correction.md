# GLASS → SPEEDTEST — SEND-NOW: the `<Tooltip preset="icon">` correction

*2026-07-17. A knowingly-withheld correction, discharged before you book it. An earlier relay
named `<Tooltip preset="icon">` as the `IconTooltip` successor. That API does not exist —
`Tooltip` has no `preset` prop. This packet gives the real composition against the shipped
`/tooltip` surface. Adopt in speedtest's own tranche (the consumer-updates ruling).*

---

## The defect in the earlier relay

`IconTooltip` and `@mkbabb/glass-ui/icon-tooltip` are removed at 7.0.0. The successor is NOT a
prop on `Tooltip`.

- `Tooltip` (`src/components/tooltip/Tooltip.vue`) declares exactly four props: `open`,
  `defaultOpen`, `delayDuration`, `disabled`. There is **no `preset`**. It also sets
  `inheritAttrs: false`, so a stray `preset="icon"` is not even passed through as a DOM attr —
  it is dropped entirely. `<Tooltip preset="icon">` is a **silent no-op**: no error, no tooltip,
  nothing rendered. vue-tsc will not flag it as a hard failure at the call site the way a
  missing import would, which is exactly how it slipped in.

## The correct migration — compose the Tooltip family over the trigger

`IconTooltip` had no single-wrapper successor. Compose the canonical family directly: one
`TooltipProvider` around the nearest real control group, a named native trigger, and a terse
noninteractive `TooltipContent`. The real API:

- `TooltipProvider` — `delayDuration` (default 700), `skipDelayDuration` (default 300).
- `Tooltip` — `open` / `defaultOpen` / `delayDuration` / `disabled`.
- `TooltipTrigger` — `asChild` (merge behavior into your own interactive child), `class`.
- `TooltipContent` — `side` / `sideOffset` / `align` / `alignOffset`, `surface` (default
  `"glass"`), `ariaLabel`.

### Before (phantom — renders nothing)

```vue
<Tooltip preset="icon" label="Surface details">
  <IconButton icon="info" />
</Tooltip>
```

### After (the shipped `/tooltip` API)

```vue
<script setup lang="ts">
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@mkbabb/glass-ui/tooltip";
</script>

<template>
  <TooltipProvider :delay-duration="250">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button type="button" aria-label="Surface details">
          <!-- your icon glyph -->
        </Button>
      </TooltipTrigger>
      <TooltipContent>Surface details</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

Notes that carry from `IconTooltip`'s contract:
- The trigger stays a named native control — put the accessible name on it (`aria-label`),
  since `TooltipContent` is a terse description, not the control's name.
- One `TooltipProvider` around the nearest real control group is enough; do not wrap each
  icon in its own provider.
- Touch does not synthesize hover — keep any instruction that must always be visible in the
  layout, not only in the tooltip.

## Where this sits in your bump

This is one row of your 7.0.0 migration; the full roster (including your `/sheet`,
`/toggle-chip`, `/metric-*`, `/hover-card`, `/controls` sites) is in
`glass-outbound-2026-07-17-q060-glass7-live.md` §3. Booked separately here because it was a
withheld correction that should not wait on the roster.

---

## Provenance

- API: `src/components/tooltip/Tooltip.vue`, `TooltipProvider.vue`, `TooltipTrigger.vue`,
  `TooltipContent.vue` (`src/components/tooltip/index.ts`).
- Composition guidance: `MIGRATION.md` §7.0.0 (`IconTooltip` row) + the `icon-tooltip` clean-
  break example.
- Defect record: `docs/tranches/BJ/formation/round-1/cross-repo-asks-and-consumes.md`
  (the phantom `<Tooltip preset="icon">` speedtest booked into a consume).
