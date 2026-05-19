# Q.W6 — fix: speedtest `<ScrollPane>` dangling-import remediation

## Charter

Q.W3 Lane H retired `<ScrollPane>` from glass-ui — a 43-line styling-only wrapper,
demoted to a Card recipe (clean break, no alias; per the Qπ adjudication). The W6
consumer re-audit found speedtest still imported `<ScrollPane>` from
`@mkbabb/glass-ui` in 6 dashboard SFCs. Those imports DANGLED — speedtest's
production build failed with `"ScrollPane" is not exported by glass-ui`. The
original Q speedtest audit (Qν/Qυ) scoped only `<Card variant=>` and missed the
standalone `<ScrollPane>` component usage.

This wave migrates every `<ScrollPane>` usage to the canonical Card recipe and
restores speedtest's build.

## Canonical recipe (Qπ §6a, W3 Lane H H.1)

`<ScrollPane>` is field-for-field `<Card tier="wash" :grain="false">` plus two
static utility classes the consumer already owns:

- `glass-wash` ← `tier="wash"`
- `[&::after]:hidden` ← `:grain="false"`
- `scrollbar-hidden` ← Card emits unconditionally on every tier
- `shadow-[var(--shadow-card)]` ← Card's `shadow` prop (default `true`)
- `text-card-foreground` ← Card emits unconditionally
- `overflow-auto` ← consumer-side `class` (ScrollPane emitted it unconditionally)
- `transition-shadow` ← consumer-side `class` (ScrollPane emitted it unconditionally)

The replacement is `<Card tier="wash" :grain="false" class="overflow-auto transition-shadow …">`.
Where the migrated pane is a genuine keyboard-scroll region, `tabindex="0"` is
added — ScrollPane shipped a latent a11y bug (`scrollbar-hidden` + `overflow-auto`
with no `tabindex` ⇒ a scroll container unreachable by keyboard); the Card recipe
fixes it (Qπ §3).

Where a site explicitly passes its own `overflow-*` class (`overflow-hidden`), that
consumer class is authoritative and the recipe's `overflow-auto` is omitted — it
would be a contradictory no-op. `transition-shadow` is always carried (faithful to
ScrollPane's unconditional emission).

speedtest imports glass-ui components directly from `@mkbabb/glass-ui` — there is
no local `@/components/ui/` re-export barrel. Each migration swaps the
`ScrollPane` import symbol for `Card` in place.

## Per-site migration table

| File | Before | After | Scroll-region / tabindex decision |
|---|---|---|---|
| `StatsCards.vue` | `<ScrollPane class="stat-card p-4" :style=…>` (×4, `v-for`) | `<Card tier="wash" :grain="false" class="stat-card overflow-auto p-4 transition-shadow" :style=…>` | NOT a scroll region — a fixed-size stat-card grid cell with a 3-line label/value/unit stack that never overflows. No `tabindex`. `overflow-auto` carried for recipe fidelity (inert here). |
| `DashboardMapControls.vue` | `<ScrollPane class="absolute right-3 top-3 z-controls w-44 overflow-hidden p-0 sm:w-56">` | `<Card tier="wash" :grain="false" class="absolute right-3 top-3 z-controls w-44 overflow-hidden p-0 transition-shadow sm:w-56">` | NOT a scroll region — site explicitly sets `overflow-hidden`; content is a Collapsible. Recipe `overflow-auto` omitted (consumer `overflow-hidden` is authoritative). No `tabindex`. |
| `ResultsFilters.vue` | `<ScrollPane class="sticky top-16 space-y-3 p-4">` | `<Card tier="wash" :grain="false" tabindex="0" class="sticky top-16 space-y-3 overflow-auto p-4 transition-shadow">` | GENUINE scroll region — a sticky filter sidebar whose stacked sections can exceed viewport height. `overflow-auto` + `tabindex="0"` (the a11y fix Qπ §3 mandates). |
| `ResultsTable.vue` | `<ScrollPane class="overflow-hidden">` | `<Card tier="wash" :grain="false" class="overflow-hidden transition-shadow">` | NOT itself a scroll region — site sets `overflow-hidden`; the inner `<InfiniteScroll>`/`<DataTable>` own scrolling. Recipe `overflow-auto` omitted. No `tabindex` on the outer card. |
| `IPLookupManager.vue` | `<ScrollPane class="overflow-hidden">` | `<Card tier="wash" :grain="false" class="overflow-hidden transition-shadow">` | NOT itself a scroll region — site sets `overflow-hidden`; the inner `<DataTable>` owns scrolling. Recipe `overflow-auto` omitted. No `tabindex` on the outer card. |
| `charts/TimeSeriesChart.vue` | code-comment reference only — `// flush to the ScrollPane expand control …` | `// flush to the map-controls card expand control …` | No import, no usage — a stale prose reference in a `legend` config comment. Comment retargeted to the post-migration component name. |

Import-line edits (symbol swap, no barrel — direct `@mkbabb/glass-ui` imports):

- `StatsCards.vue` — `import { ScrollPane }` → `import { Card }`.
- `DashboardMapControls.vue` — `ScrollPane` dropped from the multi-symbol import; `Card` added (alphabetical, after `Button`).
- `ResultsFilters.vue` — `ScrollPane` (first symbol) → `Card`.
- `ResultsTable.vue` — `ScrollPane` dropped; `Card` added (after `Button`).
- `IPLookupManager.vue` — `ScrollPane` dropped; `Card` added (after `Button`).
- `TimeSeriesChart.vue` — no import touched.

5 SFCs carry a live `<ScrollPane>` element + import; the 6th (`TimeSeriesChart.vue`)
held only a stale code-comment mention. All 6 are now `ScrollPane`-free.

## Verification

| Gate | Result |
|---|---|
| `grep -rn 'ScrollPane' speedtest/src` | ZERO matches (exit 1) |
| `npm run check:client` (`vue-tsc --noEmit`) | GREEN |
| `npm run build` (`vite build --mode production`) | GREEN — `built in 12.13s`; the `"ScrollPane" is not exported by glass-ui` failure is gone; PWA precache regenerated |

## Verdict

LANDED. All 6 speedtest dashboard SFCs are `<ScrollPane>`-free. The 5 live usages
migrated to the canonical `<Card tier="wash" :grain="false">` recipe; the 6th
(`TimeSeriesChart.vue`) had only a stale comment, retargeted. `ResultsFilters.vue`
— the one genuine keyboard-scroll region — gains `tabindex="0"`, closing the latent
a11y gap ScrollPane shipped. speedtest's production build is restored. No
backwards-compat alias was introduced (per `feedback_no_backwards_compat`); the
clean break Q.W3 Lane H made stands, and the consumer is now in step with it.
