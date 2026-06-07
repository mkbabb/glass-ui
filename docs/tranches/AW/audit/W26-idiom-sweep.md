# AW.W26 — reka/shadcn/Tailwind-v4.3 idiom + binding-correctness guard audit

Gate: `proof:reka-binding-idiom` — **PASS** (structural half + the vitest+happy-dom render spec; falsifiable on a synthetic revert of any sub-fix).

## data-slot coverage

- 41 `ui/` family roots; **0 missing** post-sweep (Progress is a variant dispatcher — its three variant sub-roots carry `data-slot="progress"`).
- Pre-fix: only the 4-5 roots carrying sub-component slots had any; the family roots were bare.
- CVA roots additionally bind `:data-variant` + `:data-size`: Button (`data-slot="button"` + both), Badge, Toggle.

## CVA base icon-sizing/gap (Button/Badge/Toggle)

Each base bakes the shadcn-2025 idiom: `[&_svg:not([class*=size-])]:size-N`, `[&_svg]:shrink-0`, `[&_svg]:pointer-events-none`, plus `gap`. Button adds `has-[>svg]:px-3` (default) / `has-[>svg]:px-5` (lg). The badge/toggle `transition-control` token is W25-owned (W26 composes icon-sizing onto it; the transition is NOT in W26's diff).

## cn() no-false-merge probe

The render spec mounts a Button with a host-sized icon (`<svg class="size-9">`) and asserts BOTH survive: the host `size-9` on the svg AND the base guarded `[&_svg:not([class*=size-])]:size-4` token on the button (the `:not([class*=size-])` guard scopes the base rule to un-sized icons, so `cn()`'s `/^size-/` deduplicator never collides them). `cn()` is unchanged (a deliberate hand-rolled-deduplicator keep, documented in CLAUDE.md).

## aria-invalid paint (the five useUserInvalidAria controls)

| Control | paint source |
|---|---|
| Input | `.input-pill` `[aria-invalid="true"]` ring (`--destructive`) |
| Textarea | `.input-pill` ring |
| NumberFieldInput | `.input-pill` ring (now composes `.input-pill`) |
| SelectTrigger | component `aria-invalid:border-[var(--destructive)]` + ring `color-mix(--destructive 35%)` |
| ComboboxInput | component `aria-invalid:text-[var(--destructive)]` + placeholder tint |

All token-first via `--destructive` (no new token). Complements W18's selector widening (W18 widens; W26 supplies the SelectTrigger/Combobox paint).

## text-shadow `@theme` token bridge

`--text-shadow-{2xs,xs,sm,md,lg}` minted in `theme.css` `@theme` (warm `--shadow-color`-derived, dark-adaptive). Two IDENTITY tokens hold the multi-stop literals inside the `@theme` defs: `--text-shadow-depth` (the offset stamp) + `--text-shadow-engraved` (the two-stop emboss). `.depth-text` (utilities.css) + `.text-engraved` (typography.css) now compose `var(--text-shadow-*)`; **no raw multi-stop `text-shadow:` literal survives** in either utility file.

## text-wrap on type/label atoms

- `text-wrap: balance` already on the display/heading ladder + `pretty` on body/prose (AQ.W3.W3.3 — landed; verified present).
- `wrap-anywhere` added to the `.badge` value slot (`badgeVariants` base) + the `.metric-badge > span` value slot (`overflow-wrap: anywhere`), replacing the bare clip. Scoped, NOT on a universal selector (mwg perf caveat).

## Toast idiom + multi-toast topology

`Toast.vue` refactored: `useForwardPropsEmits` replaces the manual six-event re-emit; the per-toast `<ToastProvider>`/`<ToastViewport>` nesting is dropped — `<ToastRoot>` is now a clean wrapper. `Toaster.vue` hoists exactly ONE provider + ONE viewport (asserted: `providerCount===1`, `viewportCount===1`). Pre-fix: six manual emits + a provider/viewport per toast (broke swipe/stacking under N>1).

## SelectContent transform-origin parity

`origin-(--reka-select-content-transform-origin)` added so the scale-in animates from the trigger edge, matching `ComboboxList`'s `origin-(--reka-combobox-content-transform-origin)`.

## Binding render-effect spec (the canary)

`tests/components/ui/reka-binding-idiom.test.ts` (6 tests, all GREEN) asserts each model binding's RENDERED effect:
- Toggle `modelValue` → `aria-pressed`/`data-state` (not the stale `:pressed`)
- Switch model → root `data-state`
- Checkbox model → `data-state` + the indeterminate `<Minus>` dash
- TagsInput `value=` items render their text (not the stale `tag=`)
- Combobox filter rides `ComboboxInput` v-model (not the stale `ComboboxRoot v-model:search-term`)
- Button cn() no-false-merge (host `size-9` + base `size-4` both survive)

## oklab-tint decision + cn()/focus-ring divergence

Recorded in CLAUDE.md (Conventions): the surface-tint `color-mix(in srgb …)` over `in oklab` is a deliberate brand-calibrated keep (tokens.css is do-NOT-touch; the rationale is documented, not silent); the `cn()` hand-rolled deduplicator + the `.focus-ring`-over-inline-`focus-visible:ring` token-first divergence are intentional, not drift. The Combobox `searchTerm` → `ComboboxInput` v-model reka-2.x move is documented in `MIGRATION.md` (downstream-consumer guidance; glass-ui's wrappers are already clean).

## Browser-verify notes (Playwright, orchestrator-run)

data-slot/data-variant are invisible (DOM attrs) — verify via DOM inspection. Visible checks at 1440×900: (1) icon+label Button padding tightens (`has-[>svg]:px-3`); (2) an invalid SelectTrigger/Combobox paints the destructive ring; (3) `.depth-text`/`.text-engraved` render identically to pre-W26 (token compose, zero visual delta); (4) N>1 toasts stack + swipe cleanly under the single provider; (5) Select content scales in from the trigger edge.
