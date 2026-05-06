# J Post-close Audit — δ — Idiomatic Gestalt + Per-story Consumption Sweep

**Authored**: 2026-05-06.
**Lane**: δ (idiomatic gestalt + per-story consumption sweep).
**Mode**: READ-ONLY.
**Bar**: per W0 precept update binding for J — "for every CVA / utility / token introduced or migrated, grep the demo/ tree to confirm canonical consumption (no story bypassing the canonical primitive)".

This is the audit pattern that R6 named structurally absent in I.W7: I.W7 δ verified library-tier authorities but never sampled per-story consumption; clearSearchCache used `btn-pill` while its evidence doc cited `danger-subtle`. The strengthened δ probes both sides — library + every consumer.

## Scope

J introduces / migrates these vocabulary atoms (W1) + transpositions (W3..W6); δ walks each one against `src/` (canon owners + intra-library consumers) AND `demo/` (every story that should consume the canon).

## 2. Per-token consumption sweep — W1

### `--space-phi-{5,6}`

- **Canon**: `src/styles/tokens.css:524-525` (light) + `:97 spacing-phi-{5,6}` theme bridge.
- **Consumers at HEAD**: 0 (preemptive substrate, per W0 amendment §F item 6).
- **demo/ bypasses**: 0.
- **Status**: PASS. Substrate-without-consumer guard absorbs as preemptive (W2 vocab.γ deliberate).

### `--surface-tint-{4..25}`

- **Canon**: `src/styles/tokens.css:189-197` (9 tints) + `theme.css:97-106`.
- **Library consumers** (8): `Slider.vue:122,171,177,182,190,193,199,200,207,214,224,230,241`; `GlassTimeline.vue:123,135,147,159`; `BouncyToggle.vue:350`; `GlassCarouselItem.vue:67,77,82`; `ProgressiveSidebar.vue:122`; Button outline hover at `button/index.ts:28`.
- **demo/ bypasses (3)** — raw `color-mix(--foreground) N%` instead of `var(--surface-tint-N)`:
  - `demo/stories/aurora/NucleiOverlay.vue:68` — `color-mix(in srgb, var(--foreground) 22%, transparent)` → should be `var(--surface-tint-22)`.
  - `demo/stories/foundations/paper-glass.vue:184` — two `color-mix(--foreground) 8%` literals → should be `var(--surface-tint-8)`.
  - `demo/stories/primitives/glyph-face.vue:97` and `demo/stories/compositions/instrument-chassis.vue:176` use `color-mix(--muted-foreground) 18%` (separate tint family — `--muted-foreground` not in W1 surface-tint scope; documented in research/vocab.γ as out-of-scope at HEAD).
- **Status**: 3 demo bypasses (low severity — visual only, all `--foreground`-based).

### `--overlay-scrim{,-strong,-subtle}`

- **Canon**: `src/styles/tokens.css:466-468` + `theme.css:108-111` + `utilities.css:419-433` (`@utility overlay-scrim`).
- **Library consumers** (5): `SheetContent.vue:41`, `DialogContent.vue:45` (scrim), `DialogScrollContent.vue:34` (subtle), `DrawerOverlay.vue:17` (strong), `ConfirmDialog.vue:5`.
- **demo/ bypasses**: 0 raw `bg-black/{40,50,60,70,80}` survivors.
- **Status**: PASS. Five sites consumed, zero raw bypass.

### `--duration-sparkle`

- **Canon**: `src/styles/tokens.css:60` + `theme.css:286`.
- **Consumer**: `src/styles/dock.css:763` `animation: sparkle-sweep 600ms` — **HARDCODED 600ms LITERAL**, not consuming the token. (Comment at `animations.css:147` "~600ms per pass" is a doc reference.)
- **demo/ bypasses**: 0.
- **Status**: SUB-BAR — the W1 token defines `600ms` but the dock.css consumer uses the literal. **Recommendation**: replace `dock.css:763` with `var(--duration-sparkle)`. This is the same token-without-consumer pattern that motivated W1.

### `--{success,warning,info}-foreground`

- **Canon**: `src/styles/tokens.css:254-256, 662-664` + `theme.css:89-91`.
- **Library consumers**: 0 explicit references in src/ (Notification.vue uses `bg-card`/`text-foreground`; no `bg-success-foreground` etc. found).
- **demo/ bypasses**: 0.
- **Status**: SUB-BAR — token defined but unconsumed at HEAD. Was it actually wired to Notification per pre-close ledger line "Notification.vue consumer"? `rg -n "(success|warning|info)-foreground" src/components/` returns zero. **Recommendation**: either wire the variant pairing to `<Notification>` or formally defer per `feedback_overfitting_audit` ≥ 2 bar.

### `--radius-tooltip`

- **Canon**: `src/styles/tokens.css:137` + `theme.css:209`.
- **Consumer**: `TooltipContent.vue:27` (`rounded-tooltip`).
- **demo/ bypasses**: 0 (rounded-lg appearances elsewhere are non-tooltip surfaces — Notification, Alert, DropdownMenu — distinct semantics).
- **Status**: PASS but SINGLE CONSUMER. Per `feedback_overfitting_audit` ≥ 2 bar, one tooltip consumer is below bar — but only one tooltip primitive exists, so the canon is the consumer cohort.

### `--muted-{soft,medium}`

- **Canon**: `src/styles/tokens.css:203-204` + `theme.css:94-95`.
- **Library consumers** (5): `CarouselDots.vue:71-72`, `BouncyToggle.vue:281`, `Slider.vue:113`, `ProgressiveSidebar.vue:165,198`.
- **demo/ bypasses (3 raw `color-mix(--muted) N%`)** — all in compositions/foundations:
  - `demo/stories/compositions/auth-shell.vue:82` — `color-mix(--section-color-${badge.section}, var(--muted)) 25%`.
  - `demo/stories/compositions/empty-states.vue:107` — same pattern.
  - `ProgressiveSidebar.vue:209` (lib) — `color-mix(--muted) 40%` (one library survivor).
- **Status**: 3 raw bypasses. The compositions sites mix section-color with muted (different vocabulary — section-color blend, not pure muted-medium); arguably out-of-scope. The library survivor at `ProgressiveSidebar.vue:209` (40% — between soft/medium) is in-scope.

### `.sheet-animate`

- **Canon**: `src/styles/utilities.css:419` `@utility sheet-animate`.
- **Library consumers** (3): `SheetContent.vue:41`, `DialogContent.vue:45`, `DialogScrollContent.vue:34`.
- **demo/ bypasses**: 0.
- **Status**: PASS.

### `cssVar()` composable

- **Canon**: `src/composables/utils/cssVar.ts:21`.
- **Consumers**: 1 — `BouncyToggle.vue:130-132`.
- **Status**: SUB-BAR. Per `feedback_overfitting_audit` ≥ 2 bar, one consumer is overfitting risk. Pre-close ledger flagged this is the "drag-keep-open API extensibility" subset; current state shows BouncyToggle is the lone consumer. **Recommendation**: extend or formally document as "WAAPI-only — single substrate".

## 3. Per-vocabulary consumption sweep — W2

### `popover-animate slide-in-from-side` bundle

- **Library consumers** (9): PopoverContent (×2), HoverCardContent, ComboboxList, ContextMenuContent, ContextMenuSubContent, DropdownMenuContent, DropdownMenuSubContent, TooltipContent. SelectContent uses `popover-animate` (no `slide-in-from-side`); DialogContent uses `popover-animate` only.
- **demo/ bypasses**: 0 raw `slide-in-from-{top,right,bottom,left}` matches.
- **Status**: PASS at 9 sites (matches plan target).

### `.focus-ring`

- **Library consumers** (16): Badge, DropdownMenuItem, Sheet (close), TabsTrigger, ToastClose, ToastAction, NumberFieldInput, ToggleChip, RadioGroupItem, Switch, Slider (cva), CarouselDots, Checkbox, SelectTrigger, Toggle, Button (cva). Configurator family adds 3 more (Configurator, ConfiguratorLayer, ConfiguratorRow).
- **demo/ bypasses (5)** — raw `focus-visible:shadow-[var(--focus-ring-shadow)]`:
  - `demo/configurator/PresetEditor.vue:118` — `'hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]'`.
  - `demo/configurator/PresetEditorField.vue:35` — even more raw: `focus-visible:shadow-[0_0_0_2px_color-mix(...)]` (assembling the shadow inline).
  - `demo/layout/CategoryRail.vue:33` — raw shadow.
  - `demo/stories/foundations/intro.vue:69` — raw shadow.
  - `demo/stories/navigation/dock-layers.vue:49` — raw shadow.
  - `demo/stories/primitives/combobox.vue:48` — raw shadow.
  - (`demo/stories/foundations/shadows.vue:61` is a foundations DEMO of focus-ring-shadow — acceptable as the canon demonstration.)
- **Status**: 5 demo bypasses + 1 foundations-demo. **Material concern**: `demo/configurator/PresetEditorField.vue:35` re-implements the shadow recipe inline rather than consuming `--focus-ring-shadow`.

### `--scale-press*`

- **Canon**: `src/styles/tokens.css:540-542` (`--scale-press`, `--scale-press-dock`, `--scale-press-btn`).
- **Library consumers** (≥6): `glass.css:149`, `dock.css:525,654,838`, Slider.vue:142, GlassCarouselItem.vue:73, ConfirmDialog.vue:86, Button cva, ConfiguratorRow.vue:52.
- **demo/ bypasses (2)** — raw `active:scale-[0.97]` literals:
  - `demo/configurator/PresetEditor.vue:118`.
  - `demo/configurator/PresetEditorField.vue:35`.
- **Status**: 2 demo bypasses. PresetEditor file is the duplicate-canon-bypass cluster.

### `--ease-apple-spring`

- **Canon**: `src/styles/tokens.css:86,89` + `theme.css:271`.
- **Consumers** (3): `glass.css:113`, `UnderlineTabs.vue:90-91`, `BouncyToggle.vue:130` (via cssVar).
- **demo/ bypasses**: 0 raw cubic-bezier in demo (`demo/stories/foundations/motion.vue:19` references the var by name as foundations doc).
- **Status**: PASS at 3 sites.

### `--surface-tint-N`

See §2 — 13 sites canonical, 3 demo bypasses (out-of-scope for `--muted-foreground` family but in-scope for `--foreground` family).

### Glass ladder rename

- **Stale `glass-{subtle,default,medium,elevated}`**: `rg "glass-(subtle|default|medium|elevated)"` returns 0 hits in src/ + demo/. v0.8.0 cleanup miss absorbed.
- **Status**: PASS. Clean break per `feedback_no_backwards_compat`.

## 4. W3 substrate verification

### `<DockPopover>` retire

- **Hits**: 0 in src/ + demo/.
- **Status**: PASS — fully retired per J invariant 2.

### `<HoverPopover keepDockOpen>` extension

- **Canon**: `src/components/custom/hover-popover/HoverPopover.vue:74,82,105,121` (prop typed + threaded).
- **demo consumers** (3): `demo/stories/navigation/dock.vue:183, 199, 217` — three render sites of `<HoverPopover keep-dock-open>`.
- **Status**: PASS.

### `--dock-max-{inline,block}-size`

- **Canon**: `src/styles/tokens.css:492-493`.
- **Consumers**: `dock.css:42, 139` (inline + block respectively).
- **Status**: PASS.

### `--glass-blur-dock-radius` reduced to 0px

- **Canon**: `src/styles/tokens.css:360`.
- **Status**: PASS — verified `0px`.

## 5. W4 substrate verification

### `<Configurator>` family

- **Imports** (2): `demo/stories/aurora.vue:4`, `demo/stories/motion/metaballs.vue:10-14`.
- **Render sites**: aurora.vue (3 `<Configurator` matches incl. comment, 1 actual render at :99), metaballs.vue (18 matches; consumes `<Configurator>` + `<ConfiguratorLayer>` + `<ConfiguratorRow>` + `useConfiguratorState`).
- **Status**: PASS — 2 consumer stories, exceeds ≥ 2 bar.

### `<BouncyToggle overflow>` prop

- **Canon**: `BouncyToggle.vue:43` default `"none"`; `BouncyTabs.vue:16` doc.
- **Consumer**: `demo/stories/aurora/AuroraConfigDock.vue:60` `overflow="scroll"`.
- **Status**: PASS — single demo consumer (also extends to library `<BouncyTabs>` indirectly).

### `auroraPresets.SPEEDTEST`

- **Canon**: `demo/stories/aurora/presets.ts:383-480` plus metadata at `:503`.
- **Status**: PASS — 12th preset shipped per consumer-territory invariant 9.

## 6. W5 substrate verification

### `sliderVariants` 5×3 matrix

- **Canon**: `src/components/ui/slider/index.ts:26-50` (5 variants × 3 sizes).
- **demo render**: `demo/stories/primitives/slider.vue:152-164` — `<template v-for="variant in variants">` × `<Slider v-for="size in sizes">` = full 15-cell matrix.
- **Status**: PASS — every cell rendered.

### `<Slider keepDockOpen>` prop

- **Canon**: `src/components/ui/slider/Slider.vue:20-29` (typed + delegated, default `true`).
- **Consumer at runtime**: implicit — every demo `<Slider>` inherits `keepDockOpen=true`. No explicit demo override.
- **Status**: PASS.

### `useDockState.isHeld`

- **Canon**: `useDockState.ts:57, 237, 310` (computed + provided + exposed).
- **Library consumers**: GlassDock.vue:81,215,232; Slider.vue:80,88 (via inject `dockHeld`); HoverPopover.vue:102,106,108-111 (local `isHeld` var — DIFFERENT semantic, internal to HoverPopover lifecycle).
- **Status**: PASS — exposed + consumed by Slider per drag-keep-open contract.

### NumberField `rounded-input` + `<Button asChild>`

- **`rounded-input`**: `NumberFieldInput.vue:7` consumes; `demo/stories/foundations/radii.vue:19` documents.
- **`<Button asChild>`**: NumberFieldDecrement.vue:21-30, NumberFieldIncrement.vue:21-30 — Reka `as-child` slots a `<Button variant="ghost" size="icon">` with `<Minus>`/`<Plus>`.
- **Status**: PASS.

## 7. W6 substrate verification

### `badgeVariants` size axis

- **demo render**: `demo/stories/primitives/badge.vue:77-79, 92-94, 105` — 3-size hero row + per-variant 3-size grid + outline+md.
- **Status**: PASS.

### FuzzySearch ≤ 200 LOC

- **Count**: `wc -l FuzzySearch.vue` = **158 LOC** (cap 200).
- **Status**: PASS.

### clearCache UI

- **Canon**: `demo/stories/data/search.vue:319-328` — `variant="destructive" size="sm"` + `<Trash2 class="mr-2 h-4 w-4" />` + `Clear cache` label.
- **Status**: PASS.

### `danger-subtle` Button variant retired

- **Hits**: 0 in src/ + demo/.
- **Status**: PASS — clean break.

### `<CarouselPager>` + `<CarouselDots>` + `<GlassCarouselPager>`

- `demo/stories/navigation/carousel.vue`: imports + renders `<CarouselDots>` + `<CarouselPager>` (lines 7-9, 69-70, 111-115).
- `demo/stories/containers/glass-carousel.vue`: imports + renders `<GlassCarouselPager>` (lines 6, 120-136).
- **Status**: PASS.

## 8. Idiomatic-gestalt review per transposition

### W3 — DockPopover → HoverPopover keepDockOpen

- **Original primitive GONE**: yes (0 hits).
- **Sole owner of hover-popover semantic**: yes — `<HoverPopover>` ships hover trigger + adaptive side/align + `keepDockOpen`.
- **No wrap-and-rename**: yes — direct collapse onto canon. `keepDockOpen` is a `withDefaults` prop with default `false`; type `boolean`; default sensible (per dock-substrate semantics).
- **Provide/inject contracts preserved**: yes — `dockKeepOpenSink` / `dockId` injection unchanged.
- **Verdict**: CLEAN.

### W4 — Configurator unification

- **Original primitives**: pre-J configurators (aurora studio chrome, metaballs panel) — both replaced by `<Configurator>` + `useConfiguratorState`.
- **Sole owner**: yes; demo's existing `Configurator` (token editor) renamed to `PresetEditor` per W0 amendment §F item 2.
- **No wrap-and-rename**: yes; new primitive composes Reka primitives; consumers adapt.
- **API extension surface**: `scrollMode`, `presets`, `useConfiguratorState<T>` typed.
- **Verdict**: CLEAN.

### W5 — Slider variants + drag-keep-open + NumberField rounded

- **Original primitive**: pre-J slider had 1 variant/no-size — extension-in-place, not collapse.
- **Sole owner**: yes — `sliderVariants` CVA consolidates.
- **No wrap-and-rename**: yes; new variants are CSS recipes via `[data-variant]` selectors.
- **Provide/inject contracts preserved**: dockHeld inject reads from useDockState provider.
- **Verdict**: CLEAN.

### W6 — Badge size + FuzzySearch rewrite + clearCache + Carousel pager

- **FuzzySearch**: 600 → 158 LOC; previous monolith retired (replaced atomically with composition rewrite).
- **danger-subtle retire** + **destructive variant subsumes**: clean break, zero hits.
- **CarouselPager substrate**: new public primitive ship.
- **Verdict**: CLEAN — no shadow APIs, no aliases.

## 9. Bypass findings

| # | Site | Severity | Kind |
|---|---|---|---|
| 1 | `dock.css:763` `animation: sparkle-sweep 600ms` | LOW | hardcoded duration; should be `var(--duration-sparkle)` |
| 2 | `--{success,warning,info}-foreground` no consumer | LOW | unconsumed substrate (≥ 2 bar fails; pre-close ledger says Notification consumer but rg disagrees) |
| 3 | `cssVar()` 1 consumer | LOW | overfitting risk per ≥ 2 bar |
| 4 | `--radius-tooltip` 1 consumer | LOW | only one tooltip primitive exists (acceptable) |
| 5 | `aurora/NucleiOverlay.vue:68` raw `--foreground 22%` | LOW | should use `var(--surface-tint-22)` |
| 6 | `foundations/paper-glass.vue:184` raw `--foreground 8%` (×2) | LOW | should use `var(--surface-tint-8)` |
| 7 | `ProgressiveSidebar.vue:209` raw `color-mix(--muted) 40%` | LOW | between soft/medium; library survivor |
| 8 | `demo/configurator/PresetEditor.vue:118` raw scale + focus shadow | MEDIUM | bypasses `--scale-press` + `--focus-ring-shadow` |
| 9 | `demo/configurator/PresetEditorField.vue:35` raw scale + raw shadow recipe | MEDIUM | reassembles `--focus-ring-shadow` inline |
| 10 | `demo/layout/CategoryRail.vue:33` raw focus shadow | LOW | should consume `.focus-ring` |
| 11 | `demo/stories/foundations/intro.vue:69` raw focus shadow | LOW | could use `.focus-ring` (foundations layer; arguable demo of var) |
| 12 | `demo/stories/navigation/dock-layers.vue:49` raw focus shadow | LOW | should consume `.focus-ring` |
| 13 | `demo/stories/primitives/combobox.vue:48` raw focus shadow | LOW | combobox demo bypassing `.focus-ring` |
| 14 | `demo/stories/motion/stagger.vue:59` `transition-all` | LOW | W2 vocab decomposition miss |

**Total**: 14 findings. 2 MEDIUM, 12 LOW. Zero HIGH (no functional regressions).

## 10. Recommendations per finding

| # | Recommendation |
|---|---|
| 1 | One-line fix: `dock.css:763` → `animation: sparkle-sweep var(--duration-sparkle, 600ms) var(--ease-out-expo)`. Absorb in W7 close. |
| 2 | Verify Notification.vue actually consumes `--{success,warning,info}-foreground`. If not, either wire (≥ 1 status variant) or formally defer the foreground tokens to next-tranche. |
| 3 | `cssVar()` — extend or document as "WAAPI-only single substrate" with named restoration trigger if a 2nd consumer arises. |
| 4 | `--radius-tooltip` — accept single consumer (canon for one primitive). |
| 5–7 | Surface-tint demo bypasses — sweep-fix in next vocab pass; LOW because all are visual-only and the canon is correctly available. |
| 8–9 | `demo/configurator/PresetEditor*.vue` — refit to `.focus-ring` + `active:scale-[var(--scale-press)]`. PresetEditorField.vue:35's inline shadow recipe is the most egregious bypass (R6-shaped); fix priority HIGH within demo-tier. |
| 10–13 | Demo focus-ring bypasses — add `.focus-ring` utility class; trivial sweep. |
| 14 | `demo/stories/motion/stagger.vue:59` — decompose `transition-all` per W2 vocab. |

**Verdict**: Per-story consumption sweep finds no canon-owner gaps that block J close. All 14 findings are absorption-class. Recommend filing a single "vocab.γ residue" follow-up (or absorbing in J.W7 close commit) covering findings 1, 8, 9 (the MEDIUM cluster + the dock.css token-bypass).

The three architectural transpositions (DockPopover→HoverPopover, Configurator unification, Slider variants/dock-keep-open) all pass idiomatic-gestalt: original GONE, new SOLE owner, no wrap-and-rename, provide/inject preserved.
