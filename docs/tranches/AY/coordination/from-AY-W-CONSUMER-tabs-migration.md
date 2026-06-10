# Coordination: AY.W-CONSUMER → consumer tabs-migration (W53 clean break)

**From:** glass-ui AY.W-CONSUMER · **To:** fourier-analysis/web (tranche I), words/frontend (tranche A)
· **Canonical surface SHA:** `d4c2910` (the W53 tabs-unification — `SegmentedTabs` is the canonical receiver)

glass-ui's W53 tabs-unification DELETED `BouncyToggle` / `BouncyTabs` / `UnderlineTabs` / `ResponsiveTabs` +
the `/responsive-tabs` subpath, subsuming all four into ONE `SegmentedTabs` (a `variant` axis). Two consumers
still import the deleted family — on the next glass-ui bump these are a HARD module-resolution failure. The
glass-ui surface is FIXED; the consumers move to it. glass-ui does NOT re-introduce a back-compat alias (the
no-backwards-compat invariant — the clean break is the canon).

## The 5 stale sites (live-verified 2026-06-09 at HEAD, dist d.ts present)

| repo | file:line | stale import |
|---|---|---|
| fourier-analysis/web | `src/components/equation/EquationView.vue:13` | `import { UnderlineTabs } from "@mkbabb/glass-ui/tabs"` |
| fourier-analysis/web | `src/components/visualization/GalleryView.vue:13` | `import { UnderlineTabs } from "@mkbabb/glass-ui/tabs"` |
| fourier-analysis/web | `src/components/visualization/VisualizationView.vue:27` | `import { UnderlineTabs } from "@mkbabb/glass-ui/tabs"` |
| words/frontend | `src/components/custom/search/components/controls/LookupControlsPanel.vue:119` | `import { BouncyToggle } from '@mkbabb/glass-ui/tabs'` |
| words/frontend | `src/components/custom/search/components/controls/WordlistControlsPanel.vue:156` | `import { BouncyToggle } from '@mkbabb/glass-ui/tabs'` |

## The drop-in mapping (verified — no prop reshape, no emit rename)

`SegmentedTabs` keeps the EXACT `UnderlineTabs`/`BouncyToggle` API — `:options` (`SegmentedTabOption[]`) +
`:model-value`/`@update:model-value`. Per the W53 ARIA-role-per-variant contract:

- **`UnderlineTabs` → `<SegmentedTabs variant="underline">`** — panel-nav, `role="tablist"`/`role="tab"` +
  `aria-selected`. The import: `import { SegmentedTabs } from "@mkbabb/glass-ui/tabs"`. The tag:
  `<UnderlineTabs :options="…" v-model="…" />` → `<SegmentedTabs variant="underline" :options="…" v-model="…" />`.
- **`BouncyToggle` → `<SegmentedTabs>`** — segmented DEFAULT, `role="group"` + `aria-pressed`. The import:
  `import { SegmentedTabs } from '@mkbabb/glass-ui/tabs'`. The tag: `<BouncyToggle :options="…" v-model="…" />`
  → `<SegmentedTabs :options="…" v-model="…" />` (no `variant` needed — segmented is the default).

## Binding-verification note (MANDATORY — MEMORY `feedback_glass_ui_binding_verification`)

A stale reka-ui prop/emit binding silently NO-OPs — `vue-tsc` + unit tests miss it, only an e2e/live render
catches it. The receiver-wave MUST e2e-VERIFY the migrated tab actually RENDERS + switches (not just typechecks):
the `:options` render the right segments, `v-model` round-trips on click, and for `variant="underline"` the panel
swaps. A green typecheck is NOT sufficient evidence of a working migration.

## Disposition (the W-CONSUMER ledger)

All 5 are recorded **DEFERRED** in `docs/tranches/AY/audit/W-CONSUMER-ledger.md` with a
`{receiver-wave, close-gate}` terminal naming the migration wave in the CONSUMER's OWN tranche
(`fourier-analysis/web I.W-TABS-MIGRATE`, `words/frontend A.W-TABS-MIGRATE`) + `proof:consumer-staleness GREEN
over this site` as the close-gate. When a receiver-wave lands the drop-in swap + the binding e2e-verify, its
ledger row flips MIGRATED (landed-SHA recorded) and `proof:consumer-staleness` sees zero violation for that site.
glass-ui owns the forcing-function gate; the consumer owns the fix (inv-16).
