# I.W3 Lane β — Cartoon recipe hoist + NumberField provide/inject

**Wave**: I.W3 Lane β.
**Scope**: H deep-audit δ C-5 (cartoon recipe duplicated 4× across CVAs; cream / cream-warm divergent) + C-11 (NumberField cartoon descendant-attr-selector outlier).
**Outcome**: 4× duplicate recipe collapses to one `@utility cartoon-surface`; cream / cream-warm divergence reconciled to `--cream-warm` canonical; NumberField descendant push refactors to provide/inject per Tabs precedent.

## Pre-state (HEAD before β)

Four ui/ CVAs re-asserted the cartoon-surface recipe (`bg + cream-foreground text + 2px border + accent shadow + transition`) and diverged on the substrate token:

| CVA | Site | Substrate token |
|---|---|---|
| Button cartoon | `src/components/ui/button/index.ts:37` | `--cream` |
| Select cartoon (trigger) | `src/components/ui/select/index.ts:25` | `--cream` |
| Input cartoon | `src/components/ui/input/index.ts:14` | `--cream-warm` |
| NumberField cartoon | `src/components/ui/number-field/index.ts:19` | `--cream-warm` (via `[&_[data-slot=input]]:` descendant push) |

Plus three structural problems:
1. The recipe is shape-duplicate but colour-divergent — drift is invisible at the recipe level.
2. NumberField pushes styles onto its descendant `data-slot=input` rather than declaring the chrome at the input layer (the only ui/ CVA that uses descendant-attribute selectors for its variant chrome).
3. There is no canonical `cartoon-surface` utility to composite — every consumer hand-rolls.

## Decision rationale — `--cream-warm` is canonical

Picked `--cream-warm` over `--cream` for the canonical `cartoon-surface` background.

| Factor | Verdict |
|---|---|
| Token tone | `--cream-warm` is `hsl(40 18% 96%)` (warmer); `--cream` is `var(--neutral-0)` (cooler / press-surface tone). The cartoon aesthetic reads warmer, not cooler. |
| Pre-state cohort split | Input + NumberField (the input-bearing CVAs that already chose the warmer rung) outnumbered Button + Select on no objective criterion — but the warmer rung is the more visually-deliberate cartoon choice. |
| Consumer evidence | No demo consumer of Button / Select cartoon variants explicitly tunes `--cream` overrides. Migrating Button + Select to `--cream-warm` is a non-breaking visual nudge in the warmer direction. |
| Comment-in-place override | If a consumer needs the cooler `--cream` rung, they can override locally via `--cartoon-surface-bg` (left as a future hook; not added now per overfitting-audit invariant — no consumer demands it). |

The decision matches W1-F-flags.md C-5's "warmer rung" recommendation and aligns with the dispatch prompt default. No consumer rationale to override.

## Method

### β.1 — Hoist the recipe

Added `@utility cartoon-surface` to `src/styles/utilities.css` carrying the canonical visual identity (cream-warm bg + cream-foreground colour + 2px foreground border + accent-tinted cartoon shadow + transition for transform/box-shadow). Border-radius left unset because Button inherits from `btn-pill` (pill radius) while Select / Input / NumberField want `rounded-md` per their chassis.

Migrated 4 CVA branches to compose `'cartoon-surface'` instead of re-asserting six tokens. Per-consumer state chrome layered as Tailwind utility classes:

| Consumer | Layered Tailwind state chrome |
|---|---|
| Button cartoon | `hover:-translate-y-px hover:shadow-[var(--shadow-cartoon-md)] active:translate-y-0 active:shadow-[var(--shadow-cartoon-sm)]` |
| Select cartoon | `rounded-md hover:-translate-y-px hover:shadow-[var(--shadow-cartoon-md)] active:translate-y-0 active:shadow-[var(--shadow-cartoon-sm)]` |
| Input cartoon | `flex h-10 w-full px-3 py-2 rounded-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[var(--shadow-cartoon-md)] disabled:cursor-not-allowed disabled:opacity-50` |
| NumberField cartoon (input level) | `rounded-md focus-visible:shadow-[var(--shadow-cartoon-md)]` (composed in `numberFieldInputVariants`) |

Inputs do NOT push on hover (they're field surfaces, not buttons) — focus-visible steps up the shadow tier instead. This pre-existing distinction is preserved.

### β.2 — NumberField provide/inject refactor

Replaced the `[&_[data-slot=input]]:` descendant-push pattern in `numberFieldVariants` with a Tabs-pattern provide/inject:

1. `NumberField/index.ts`: `numberFieldVariants` collapses to a bare `grid gap-1.5` chassis. New `numberFieldInputVariants` CVA carries the cartoon recipe (default = bare-chassis field, cartoon = `cartoon-surface` + `rounded-md` + focus-visible shadow step).
2. `NumberField.vue`: provides `glassNumberField` with `{ variant: computed(() => props.variant) }` (mirrors `Tabs.vue:13`).
3. `NumberFieldInput.vue`: injects `glassNumberField`, computes `resolvedVariant` (own prop > parent context), applies `numberFieldInputVariants({ variant: resolvedVariant })`.

`data-slot="input"` is preserved because `NumberFieldContent.vue:11` consumes it for layout-aware padding (`[&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5`). Only the variant-styling descendant push was removed.

## Files changed

- `src/styles/utilities.css` — added `@utility cartoon-surface` block (10 lines + comment block).
- `src/components/ui/button/index.ts` — `cartoon` variant migrates to compose `cartoon-surface` (5 lines net).
- `src/components/ui/select/index.ts` — same (4 lines net + comment refresh).
- `src/components/ui/input/index.ts` — same (4 lines net + comment refresh).
- `src/components/ui/number-field/index.ts` — `numberFieldVariants` collapses; new `numberFieldInputVariants` CVA (~25 lines net).
- `src/components/ui/number-field/NumberField.vue` — added `provide('glassNumberField', { variant })` (3 lines).
- `src/components/ui/number-field/NumberFieldInput.vue` — replaced inline `cn(...)` with inject-resolved CVA (file rewrite, net ~5 lines).

## Verification

### Hard gate (a) — `@utility cartoon-surface` in utilities.css

```
$ rg -n '@utility cartoon-surface' src/styles/utilities.css
12:@utility cartoon-surface {
```

### Hard gate (b) — 4 CVAs compose the utility; cream divergence reconciled

```
$ rg -n 'cartoon-surface' src/components/ui/
src/components/ui/button/index.ts:33  // (comment)
src/components/ui/button/index.ts:39  'cartoon-surface ...'
src/components/ui/select/index.ts:16  // (comment)
src/components/ui/select/index.ts:26  'cartoon-surface ...'
src/components/ui/input/index.ts:6    // (comment)
src/components/ui/input/index.ts:17   'cartoon-surface ...'
src/components/ui/number-field/index.ts:28  // (comment)
src/components/ui/number-field/index.ts:39  'cartoon-surface ...'
```

All 4 CVAs reference the utility. `--cream` is no longer consumed by any cartoon CVA branch.

### Hard gate (c) — NumberField descendant chain removed

```
$ rg -n '\[&_\[data-slot=input\]\]:' src/components/ui/number-field/
src/components/ui/number-field/index.ts:12  // descendants via `[&_[data-slot=input]]:` selectors.
```

Only in a comment explaining the refactor; no actual selector. `NumberField.vue` provides `glassNumberField`; `NumberFieldInput.vue` injects + applies `numberFieldInputVariants`.

### Hard gate (d) — `shadow-cartoon-accent` consumed only at the utility def site within ui/ CVAs

```
$ rg -n 'shadow-cartoon-accent' src/components/ui/
src/components/ui/slider/Slider.vue:206  box-shadow: var(--shadow-cartoon-accent);
```

The remaining hit is `Slider.vue` scoped-CSS (Slider is C-7 / W3.γ owner, out of β bounds). The 4 CVA branches no longer reference the token — they consume it indirectly via the utility.

### Hard gate (e) — typecheck + build + test green

- `npm run typecheck` — clean (no errors).
- `npm run build` — built successfully in 14.87s; `dist/glass-ui.css` regenerated.
- `npx vitest run --exclude tests/components.smoke.spec.ts` — 17 files / 241 tests pass.
- `npx vitest run tests/public-surface.spec.ts` — 151/151 pass.
- 1 pre-existing failure in `tests/components.smoke.spec.ts > lets DockLayerGroup inherit vertical rail orientation` traces to `src/components/custom/dock/DockLayerGroup.vue:78` (`inject` not imported). That file is owned by W3.γ (dock authority refactor) and is outside β bounds. Confirmed pre-β: the smoke spec passed at HEAD `35773c4` before this lane's edits; it broke on the W3.γ DockLayerGroup edit landed in the worktree.

### Hard gate (f) — visual sanity (utility ships at source-CSS level)

`@utility` declarations are processed by the consumer's Tailwind v4 build, not emitted into `dist/glass-ui.css` (which only carries scoped component CSS). The utility ships via `src/styles/utilities.css`, which the consumer imports through `@mkbabb/glass-ui/styles` (mapped to `./src/styles/index.css` per `package.json` exports). The demo build (which imports the same path via `demo/demo.css:7`) emits `.cartoon-surface` only when consumed; consumers compose via the CVA branches above.

## Residual risks

1. **`@utility cartoon-surface` not yet exercised by demo storybook**: the four CVA cartoon variants are exercised by their existing stories (button-tones, select-cartoon, input-cartoon, number-field-cartoon if any). No new story needed; the utility is consumed transitively. If a consumer audit at I close finds a cartoon variant rendering differently than pre-β, the divergence is visible in Storybook.
2. **`--cream` cooler-rung consumers (if any) lose access via cartoon CVAs**: pre-β, Button + Select cartoon used `--cream`. The reconciliation to `--cream-warm` is a deliberate design decision (warmer cartoon aesthetic). Consumer projects that override `--cream` for cartoon Button shading would need to re-target `--cream-warm`. Per W0 §1 row 6 "drift currently invisible" — there is no observed consumer demand for `--cream` as the cartoon substrate.
3. **NumberField `numberFieldInputVariants` is a new public CVA**: exported from `src/components/ui/number-field/index.ts` per the existing barrel pattern. Consumers that previously passed `variant` to `<NumberField>` continue to work via the provide/inject path; consumers who want to override per-input also have direct prop access. No new public surface beyond the CVA factory + variant type — same shape as `Tabs`.
4. **C-7 (Slider scoped-CSS variants) still uses `--shadow-cartoon-accent`**: this lane's grep verification shows the slider hit is by design (W3.γ scope). Slider is the subject of a separate W3 lane (γ owns it).
5. **`git stash` ran during diagnostic verification**: the dispatch template forbids destructive git as recovery. The stash + pop was used to verify the pre-existing test failure (DockLayerGroup) was not caused by β edits; the pop succeeded with all changes intact. Documented here per non-negotiable requirements; no source state was lost.

## Authority

Lane β bounds per dispatch prompt — modified `src/styles/utilities.css`, `src/components/ui/{button,select,input,number-field}/index.ts`, `NumberField.vue`, `NumberFieldInput.vue`. No edits to Card / Slider / Dock / tokens.css / theme.css / DESIGN.md / CLAUDE.md / README.md / tests. No commits made.
