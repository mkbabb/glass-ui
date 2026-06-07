# AW.W26 - reka/shadcn/Tailwind-v4.3 idiom + binding-correctness guard

## State

**Name**: W26 - reka/shadcn/Tailwind-v4.3 idiom + binding-correctness guard
**Opens after**: W25 (cross-atom motion + a11y + overlay-band + tone parity); it SHARES three modify paths with W25 — `badge/index.ts`, `toggle/index.ts`, `toast/Toast.vue` — and so runs strictly SERIAL on those three after W25 lands (NOT in parallel); its remaining paths are disjoint from W22-W25 and W13/W18
**Agents**: 3 parallel (a reka-idiom, b shadcn-CVA + data-slot, c Tailwind-v4.3/mwg) + 1 serial close-fold (d binding guard) — see §4b
**Hard gate** (`proof:reka-binding-idiom`): every `ui/` family root carries a `data-slot`; the three modernized CVA bases (Button/Badge/Toggle) resolve the icon-sizing + gap idiom without a `cn()` false-merge; each of the five `useUserInvalidAria`-wired form atoms paints on `[aria-invalid]`; `text-shadow-sm` resolves a non-empty `@theme` value and no raw multi-stop `text-shadow:` literal survives outside the token defs; `Toast` forwards via `useForwardPropsEmits` (no manual six-event re-emit) and mounts N>1 toasts under ONE provider; and a vitest+happy-dom render-effect spec asserts the RENDERED effect of the at-risk reka model bindings (Toggle/Combobox/TagsInput/Switch/Checkbox) — the born-RED canary the memory note demands.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, glass-ui's `ui/` surface reads as canonical 2026 reka-ui ^2.9 + shadcn-vue (CVA ^0.7) + Tailwind-v4.3 WITHOUT a stale or non-idiomatic binding surviving: every family root carries the shadcn-2025 `data-slot` (+ `:data-variant`/`:data-size` on CVA roots), the three legacy CVA bases (Button/Badge/Toggle) carry the modern icon-sizing/gap idiom overlaid onto glass-ui's existing `btn-pill`/`focus-ring` recipe (the badge/toggle `transition-control` migration is W25's, not W26's), the five form controls paint the announced `aria-invalid` state, the lone hand-rolled `text-shadow` literals compose v4.1 `--text-shadow-*` `@theme` tokens, type/label atoms carry `text-wrap` balance/pretty/wrap-anywhere, Toast is refactored to `useForwardPropsEmits` + a single-provider hoist, and the binding-correctness class is locked by a render-effect spec that only e2e/render catches (vue-tsc + units miss it per the memory note). Every change is pure-additive idiom or a DRY consolidation — NO new primitive, NO new CVA variant key, NO new reka 2.9 component wrap (the speculative `Color*`/`Autocomplete`/`MonthPicker` wraps fail the ≥2-consumer invariant and are explicitly out of scope), NO Tailwind v5.

## 3. Scope

1. **Toast idiomatic refactor** (`src/components/ui/toast/Toast.vue`) — SHARED FILE with W25 (W25 carves the material→`glass-floating`+tone rows). W26's Toast.vue edits sequence STRICTLY AFTER W25's material carve has landed (W26.a writes onto the post-W25 `Toast.vue`); the two edits are line-disjoint (W25 the surface class, W26 the emit-forwarding + provider topology) but co-resident, so serial. Replace the manual six-event re-emit (`@update:open`/`@escapeKeyDown`/`@swipeStart`/`@swipeMove`/`@swipeEnd`/`@swipeCancel`, lines 24/46-51) with `useForwardPropsEmits` matching every other wrapper; remove the per-toast `<ToastProvider>`+`<ToastViewport>` nesting (lines 33/55) so `<ToastRoot>` composes the app-root singleton provider that `Toaster.vue` already owns. Provider/viewport are app-root singletons; per-toast nesting breaks swipe/stacking/region semantics with multiple toasts. `Toaster.vue` already hoists one provider+viewport — Toast.vue stops re-nesting and becomes a clean `<ToastRoot>` wrapper.
2. **SelectContent transform-origin parity** (`src/components/ui/select/SelectContent.vue`) — add `origin-(--reka-select-content-transform-origin)` so the scale-in animates from the trigger edge, matching `ComboboxList`'s `origin-(--reka-combobox-content-transform-origin)`. Popover-family animation-anchor consistency (Select vs Combobox vs Popover vs DropdownMenu vs HoverCard).
3. **`data-slot` blanket sweep** — add `data-slot="<name>"` to every `ui/` family root that lacks one (36 of 37 roots ship none; the 29 that carry it are alert/card/carousel/combobox/number-field sub-components only). Add `:data-variant` + `:data-size` to every CVA-bearing root (Button binds only `:data-size` today — add `data-slot="button"` + `:data-variant`; Badge/Toggle/Avatar/Sheet/Slider/Alert per canon). Pure-additive, zero visual delta; the canonical shadcn-vue Tailwind-v4 styling target.
4. **CVA base-string modernization (Button/Badge/Toggle only)** — bake `[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none` icon-sizing + `gap` into each base (`button/index.ts`, `badge/index.ts`, `toggle/index.ts`); add `has-[>svg]:px-3` to the Button size rungs. Overlay onto glass-ui's `btn-pill`/`focus-ring`/token bindings — do NOT replace the existing recipe. Alert/Card already carry this idiom (proving the team knows it); this brings the three frozen-at-older-idiom bases up. The `transition-colors`→`transition-control` migration on badge AND toggle is W25's (it owns the transition-discipline sweep) — W26 composes its icon-sizing/gap ONTO W25's `transition-control` and does NOT touch the transition token.
5. **`cn()` false-merge verification** (no `src/utils/cn.ts` edit) — the new `[&_svg:not([class*='size-'])]:size-4` arbitrary-selector tokens and `has-[>svg]:px-3` pass through `cn()`'s hand-rolled deduplicator untouched (they match no conflict bucket — correct). VERIFY the icon `size-4` does NOT false-merge against a host `size-9`/`size-10` on the same element through the `/^size-/` bucket; the gate asserts a rendered Button-with-icon retains both the host size and the icon size. `cn()` is a deliberate keep — this is a verification, not a change.
6. **`aria-invalid` error-paint** — add an `aria-invalid:` border+ring tint (token-first via `--destructive` `color-mix`, the house pattern) to the five form controls wired to `useUserInvalidAria`: Input, Textarea, NumberFieldInput, SelectTrigger, ComboboxInput. The `useUserInvalidAria` bridge announces invalid but no CVA/CSS paints it — close the announced-but-not-seen gap. Complements W18's `[aria-invalid]` ring-selector widening (W18 widens the selector; W26 supplies the paint) — disjoint declarations.
7. **text-shadow `@theme` token bridge** — add `--text-shadow-{2xs,xs,sm,md,lg}` to `theme.css` `@theme` (warm `--shadow-color`-derived, dark-adaptive via the existing `color-mix` pattern, per the cartoon-shadow precept's one-source chain); re-express `.depth-text` (`utilities.css`) + `.text-engraved` (`typography.css`) to compose the tokens. text-shadow is the lone shadow family with no `@theme` bridge (v4.1 shipped `text-shadow-*`); deletes the hand-rolled multi-stop literals (net-neutral-or-deletion holds).
8. **`text-wrap` on type/label atoms** — `text-wrap: balance` on the `--type-display-*` ladder + section/heading classes; `text-wrap: pretty` on body/prose classes; `wrap-anywhere` on `.metric-badge`/`.badge` value slots (replacing the bare `overflow: hidden`+truncate clip). NOT on a universal selector (mwg perf caveat). v4.1 `wrap-anywhere` + mwg `css §7`/`accessibility §9`.
9. **oklab-tint rationale (doc + decision)** — the surface-tint generation uses `color-mix(in srgb, …)` where mwg `css §8` prefers `in oklab` for tint generation. EITHER migrate the surface-tint recipe to `color-mix(in oklab, …)` OR add a one-line in-source rationale for the deliberate `in srgb` brand hand-tuning. No silent `in srgb` — the decision is recorded, not implicit.
10. **Binding-regression render spec** (`tests/components/ui/reka-binding-idiom.test.ts`) — one vitest+happy-dom render-effect spec that mounts Toggle/Combobox/TagsInput/Switch/Checkbox and asserts the RENDERED effect of each model binding (the `data-state`/`aria-pressed`/rendered-value the binding drives), NOT the types. The memory note: stale reka prop/emit bindings (`:pressed`, `v-model:search-term`, `tag=`) silently no-op; vue-tsc + units miss them, only e2e/render catches them. This is the canary that fails on a future reka bump that moves a binding (e.g. Combobox `searchTerm`→`ComboboxInput v-model`). Repo idiom is vitest+happy-dom render probes (`proof:dock-a11y-contract` precedent), NOT a Playwright dep — the spec uses the in-repo `@vue/test-utils` + `happy-dom` to read the rendered DOM effect.
11. **MIGRATION.md + CLAUDE.md notes** — add a `MIGRATION.md` note on the reka 2.x Combobox `searchTerm`→`ComboboxInput v-model` move (external-consumer guidance; glass-ui's wrapper is already clean, the note is for downstreams still on `v-model:search-term`); document the deliberate `cn()` hand-rolled-deduplicator keep and the CSS-utility-`focus-ring`-over-Tailwind-`focus-visible:ring` token-first divergence in CLAUDE.md as intentional (not drift to "fix").

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- the `data-slot` sweep reveals a root whose `data-slot` collides with an existing reka-emitted `data-*` state attribute or a consumer's attribute-selector override, so the additive sweep is NOT zero-delta — the file bounds expand into the affected consumer/override surface;
- the CVA base modernization regresses a `cn()` merge (the icon `size-4` DOES false-merge against a host size token, or the new `has-[>svg]` padding collides a `px-*` bucket) — a non-local-recoverable change because the fix is in `cn.ts`'s bucket table, which is a declared do-NOT-touch and a deliberate keep;
- the `aria-invalid` paint cannot be expressed token-first via a `--destructive` `color-mix` without minting a NEW token in `tokens.css` (the do-NOT-touch boundary) — escalate rather than add a token;
- the Toast `useForwardPropsEmits` refactor changes the swipe/stacking behaviour under N>1 toasts (the provider-hoist alters reka's region semantics in a way the render spec catches) — a third diagnostic iteration on the multi-toast render must halt and re-derive the provider topology with `Toaster.vue`, not patch Toast.vue alone;
- the binding render spec's third red iteration is RED for a reason OTHER than the asserted binding (a happy-dom limitation mounting a reka portal/popper surface, not a stale binding) — escalate to re-derive the mount strategy rather than weaken the assertion to grep-only (a grep-only runtime gate is prohibited).

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/ui/toast/Toast.vue` | modify (forward-emits refactor + drop per-toast provider/viewport nesting) — SHARED with W25 (material carve); W26 sequences serial AFTER W25 |
| `src/components/ui/select/SelectContent.vue` | modify-carve (the transform-origin class only) |
| `src/components/ui/*/` (37 family roots + CVA index.ts) | modify-carve (the `data-slot`/`:data-variant`/`:data-size` additions only) |
| `src/components/ui/button/index.ts` | modify-carve (the base icon-sizing/gap + size `has-[>svg]` only — NOT the variant color strings) |
| `src/components/ui/badge/index.ts` | modify-carve (base icon-sizing + gap ONLY — NOT the transition token; W25 owns `transition-colors`→`transition-control`; SHARED with W25, sequence serial AFTER) |
| `src/components/ui/toggle/index.ts` | modify-carve (base icon-sizing + gap ONLY — NOT the transition token; W25 owns `transition-colors`→`transition-control`; SHARED with W25, sequence serial AFTER) |
| `src/components/ui/input/Input.vue` | modify-carve (`aria-invalid:` paint class only) |
| `src/components/ui/textarea/Textarea.vue` | modify-carve (`aria-invalid:` paint class only) |
| `src/components/ui/number-field/NumberFieldInput.vue` | modify-carve (`aria-invalid:` paint class only) |
| `src/components/ui/select/SelectTrigger.vue` | modify-carve (`aria-invalid:` paint class only) |
| `src/components/ui/combobox/ComboboxInput.vue` | modify-carve (`aria-invalid:` paint class only) |
| `src/styles/theme.css` | modify-carve (the `--text-shadow-*` `@theme` block only) |
| `src/styles/utilities.css` | modify-carve (`.depth-text` re-express + `wrap-anywhere` on `.metric-badge`/`.badge` + oklab-tint rationale only) |
| `src/styles/typography.css` | modify-carve (`.text-engraved` re-express + `text-wrap` balance/pretty on type/prose only) |
| `tests/components/ui/reka-binding-idiom.test.ts` | create |
| `scripts/proof-reka-binding-idiom.mjs` | create (the structural half of the gate) |
| `package.json` | modify-carve (the `proof:reka-binding-idiom` script entry only) |
| `MIGRATION.md` | modify (Combobox searchTerm note) |
| `CLAUDE.md` | modify (cn()/focus-ring divergence documentation) |

Do NOT touch: `src/utils/cn.ts` (deliberate hand-rolled deduplicator — VERIFY no false-merge, do not edit; a needed edit is a triumvirate trigger §3a), `src/styles/tokens.css` (no new token — the `aria-invalid` paint reuses `--destructive` via `color-mix`; a needed token is a §3a trigger), `scripts/gates.mjs` (the gate-set registration is W27/close, not W26), the `button/index.ts` variant COLOR strings (W13 owns gold-audacious/primary-audacious foreground — W26 touches only the base icon/gap/size lines, disjoint lines), the `.input-pill` border/radius rules (W13 owns border alpha, W24 owns radius — W26 adds only the `aria-invalid:` paint via the component class, not the `.input-pill` CSS), any reka 2.9 NEW-component wrap (Color*/Autocomplete/MonthPicker — out of scope, ≥2-consumer invariant), Tailwind v5 (NO).

## 4a. Disjointness

Three parallel agent units write disjoint paths; the serial close-fold (d) writes only the test + proof script + package.json entry after a-c land.

- **a (reka-idiom)** owns `toast/Toast.vue` + `select/SelectContent.vue`. No other unit writes these.
- **b (shadcn-CVA + data-slot)** owns the `data-slot` sweep across the 37 roots, the three CVA base index.ts files, the five `aria-invalid:` component classes, and `CLAUDE.md`. It is the only unit touching `*/index.ts` CVA bases and the form-control SFC classes.
- **c (Tailwind-v4.3/mwg)** owns `theme.css` + `utilities.css` + `typography.css` + `MIGRATION.md`. CSS/doc only.
- **d (binding guard)** creates `tests/.../reka-binding-idiom.test.ts` + `scripts/proof-reka-binding-idiom.mjs` + the `package.json` script line; runs serial AFTER a-c so the spec asserts the landed state.

Boundary with sibling waves (realized band roles: W22=glass-material-unify, W23=glass-material-sota, W24=glass-cards, W25=primitives-perfection): W26 shares NO `modify` path with W22 (glass.css/tokens.css material ladder), W23 (refraction/squircle/tint material-sota folds), or W24 (`card/` package + cards.css). W26 DOES share three `modify` paths with W25 (primitives-perfection): `badge/index.ts`, `toggle/index.ts`, `toast/Toast.vue`. These are reconciled by ownership + sequencing — W25 OWNS the `transition-colors`→`transition-control` migration on badge + toggle (its transition-discipline sweep), so W26 drops the transition token entirely and adds ONLY icon-sizing/gap composing onto W25's `transition-control`; W25 OWNS the Toast material→`glass-floating`+tone carve, so W26's Toast forward-emits/provider-topology edit sequences serial AFTER. W26 opens after W25 per §State, so unit b/a write onto the post-W25 SFCs — no same-file write race. The `data-slot` sweep touches the same SFC roots W24/W25 touch, but a DIFFERENT line (the root-tag `data-slot` attr vs the class string), and sequences after them likewise. The CVA base lines b touches in `button/index.ts` are disjoint from W13's variant color lines but are the SAME FILE — sequence after W13 (W13 already landed before W26 opens).

## 4b. Worktree Plan

Four units write; the orchestrator runs `git worktree list` + `git worktree add` before dispatch. Units a-c are disjoint-path parallel; d is serial after a-c integrate.

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AW.W26.a | `/Users/mkbabb/Programming/glass-ui-aw-w26-a` | n/a (JS/Vue — no cargo) |
| AW.W26.b | `/Users/mkbabb/Programming/glass-ui-aw-w26-b` | n/a |
| AW.W26.c | `/Users/mkbabb/Programming/glass-ui-aw-w26-c` | n/a |
| AW.W26.d | `/Users/mkbabb/Programming/glass-ui-aw-w26-d` | n/a (runs after a-c merge to main) |

## 5. Agent Units

### AW.W26.a reka-ui ^2.9 idiom hardening

- Goal: `Toast` and `SelectContent` read as canonical reka-ui ^2.9 — forward-emits over manual re-fire, single app-root provider over per-toast nesting, and trigger-edge scale-in anchoring across the popover family.
- Mechanism: replace Toast's six manual `@event` re-emits with `useForwardPropsEmits`; drop the per-`<ToastRoot>` `<ToastProvider>`+`<ToastViewport>` wrap so the singleton in `Toaster.vue` owns the region; add `origin-(--reka-select-content-transform-origin)` to SelectContent matching `ComboboxList`.
- Files: `src/components/ui/toast/Toast.vue`, `src/components/ui/select/SelectContent.vue`.
- Sub-gate: a render spec mounts N>1 toasts and finds exactly ONE `ToastProvider`/`ToastViewport` in the tree (pre-fix: one per toast — born RED); `grep` confirms `useForwardPropsEmits` in Toast.vue and zero manual `@swipe*`/`@escapeKeyDown` re-emit; `grep` confirms `origin-(--reka-select-content-transform-origin)` on SelectContent; `vue-tsc --noEmit` green.

### AW.W26.b shadcn-vue data-slot + CVA modernization + aria-invalid paint

- Goal: every `ui/` family root carries the shadcn-2025 `data-slot` (+ `:data-variant`/`:data-size` on CVA roots), the three frozen CVA bases carry the modern icon-sizing/gap idiom overlaid onto glass-ui's recipe, and the five `useUserInvalidAria` form controls paint the announced invalid state — all without a `cn()` false-merge.
- Mechanism: add `data-slot="<name>"` to the 36 root SFCs lacking it + `:data-variant`/`:data-size` to the CVA roots; bake `[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none` + `gap` into `button`/`badge`/`toggle` bases (the badge/toggle `transition` token is W25's `transition-control` — W26 does NOT touch it), `has-[>svg]:px-3` on button sizes; add `aria-invalid:` border+ring `color-mix(--destructive …)` to the five form controls; document the `cn()` + focus-ring divergences in CLAUDE.md.
- Files: `src/components/ui/*/` roots (data-slot), `button/index.ts`, `badge/index.ts`, `toggle/index.ts`, `input/Input.vue`, `textarea/Textarea.vue`, `number-field/NumberFieldInput.vue`, `select/SelectTrigger.vue`, `combobox/ComboboxInput.vue`, `CLAUDE.md`.
- Sub-gate: a structural probe asserts every `ui/` root resolves a `data-slot` (pre-fix: 36 missing — born RED); a render probe mounts a Button with a `<svg size-9>` host and asserts BOTH the host size and the base icon `size-4` survive `cn()` (no false-merge); a render probe sets `aria-invalid` on each of the five form controls and asserts a computed border/ring delta vs the valid state (pre-fix: no paint — born RED); `vue-tsc --noEmit` green.

### AW.W26.c Tailwind-v4.3 + mwg-Baseline idiom folds

- Goal: the lone hand-rolled `text-shadow` literals compose v4.1 `@theme` tokens, type/label atoms carry `text-wrap` balance/pretty/wrap-anywhere, and the surface-tint `in srgb` choice is recorded — closing glass-ui's three narrow Tailwind-v4.1+ / mwg gaps without a v5 dependency.
- Mechanism: add `--text-shadow-{2xs,xs,sm,md,lg}` to `theme.css @theme` (warm `--shadow-color`-derived, dark-adaptive) and re-express `.depth-text`/`.text-engraved` to compose them; add `text-wrap: balance` to the display/heading ladder, `pretty` to body/prose, `wrap-anywhere` to `.metric-badge`/`.badge` value slots; migrate the surface-tint to `color-mix(in oklab …)` OR add the in-source `in srgb` rationale; add the Combobox searchTerm MIGRATION.md note.
- Files: `src/styles/theme.css`, `src/styles/utilities.css`, `src/styles/typography.css`, `MIGRATION.md`.
- Sub-gate: `text-shadow-sm` resolves a non-empty value AND no raw multi-stop `text-shadow:` literal survives outside the `@theme` defs (grep — pre-fix `--text-shadow-sm` is `(none)`, born RED); the display ladder carries `balance`, prose carries `pretty`, and `text-wrap` lands on NO universal selector; every `in srgb` surface-tint is either migrated or carries a documented rationale; `npm run build` green (the `/styles` SFC-CSS fold still emits).

### AW.W26.d binding-correctness render guard + gate wiring

- Goal: the binding-correctness class (the memory note's silently-no-op reka bindings) is locked by a render-effect spec that vue-tsc + units cannot catch, and `proof:reka-binding-idiom` is the falsifiable gate over the whole wave's landed state.
- Mechanism: write `tests/components/ui/reka-binding-idiom.test.ts` mounting Toggle/Combobox/TagsInput/Switch/Checkbox via `@vue/test-utils`+`happy-dom`, asserting each model binding's RENDERED effect (the `data-state`/`aria-pressed`/rendered value), not its type; write `scripts/proof-reka-binding-idiom.mjs` for the structural half (data-slot coverage, the Toast forward-emits/single-provider invariant, the text-shadow-token + no-literal assertion, the no-new-CVA-variant/no-new-token diff); wire `proof:reka-binding-idiom` into `package.json` running both halves.
- Files: `tests/components/ui/reka-binding-idiom.test.ts` (create), `scripts/proof-reka-binding-idiom.mjs` (create), `package.json` (the one script line).
- Sub-gate: `npm run proof:reka-binding-idiom` runs green on the landed a-c state and RED on a synthetic revert of any one sub-fix (a removed `data-slot`, a re-added manual Toast emit, a stripped `aria-invalid` paint, a deleted text-shadow token, a Combobox binding moved back to the stale form) — the falsifiability check; the render spec passes asserting each of the five bindings' rendered effect.

## 6. Hard Gate

`proof:reka-binding-idiom` (a node structural script + a vitest+happy-dom render spec, both wired under the one `package.json` entry):

1. **data-slot coverage.** The structural script asserts every `src/components/ui/*` family root resolves a `data-slot` attribute, and every CVA-bearing root binds `:data-variant` + `:data-size`. Born RED: 36 of 37 roots ship none and Button binds only `:data-size` at HEAD; the diff (36→0 missing) is the proof.
2. **CVA modernization without false-merge.** A render probe mounts `<Button>` with an icon host carrying `size-9` and asserts the rendered class set retains BOTH the host `size-9` and the base-derived icon `size-4` (the `cn()` `/^size-/` bucket does NOT collide them); `grep` confirms `[&_svg:not([class*='size-'])]:size-4` in all three of button/badge/toggle bases. The badge/toggle `transition` token is NOT asserted here — W25 owns the `transition-control` migration; W26 composes its icon-sizing onto it. Pre-fix the three bases carry no `[&_svg]` icon-sizing — born RED.
3. **aria-invalid paint.** A render probe sets `aria-invalid="true"` on each of Input/Textarea/NumberFieldInput/SelectTrigger/ComboboxInput and asserts a computed border-color/ring delta vs the valid state, resolving from `--destructive` (token-first). Pre-fix none paint the announced state — born RED.
4. **text-shadow token bridge.** `text-shadow-sm` (and the 2xs..lg rungs) resolves a non-empty `@theme` value; `grep` asserts NO raw multi-stop `text-shadow:` literal survives outside the `@theme` token defs (`.depth-text`/`.text-engraved` compose the tokens). Pre-fix `--text-shadow-sm` resolves `(none)` and the two utilities hand-roll literals — born RED.
5. **Toast idiom + multi-toast topology.** `grep` confirms `useForwardPropsEmits` in Toast.vue and zero manual `@swipe*`/`@escapeKeyDown`/`@update:open` re-emit; the render spec mounts N>1 toasts and finds exactly ONE `ToastProvider` + ONE `ToastViewport` in the tree. Pre-fix Toast.vue re-emits six events and nests a provider+viewport per toast — born RED on the N>1 single-provider assertion.
6. **Binding render-effect spec.** The vitest+happy-dom spec mounts Toggle/Combobox/TagsInput/Switch/Checkbox and asserts each model binding's RENDERED effect (Toggle `aria-pressed`/`data-state` reflects `modelValue`; Combobox filter rides `ComboboxInput` v-model; TagsInputItem `data-[state=active]`; Switch/Checkbox `data-state` reflects the checked model). The spec is the canary the memory note demands (only render catches a stale `:pressed`/`v-model:search-term`); a synthetic stale-binding revert turns it RED.
7. **No new primitive / variant / token / reka-wrap.** `git diff` shows no new CVA variant key in button/badge/toggle, no `src/styles/tokens.css` change, no `src/utils/cn.ts` change, and no new `src/components/ui/<dir>/` for a reka 2.9 Color*/Autocomplete/MonthPicker wrap. Idiom-only, additive-or-deletion.
8. **Build + types green.** `npm run build` and `npm run typecheck` pass; `git diff --check` clean.

## 7. Format And Lint Cadence

- `npm run typecheck` after the unit-b CVA base edits and the unit-a Toast refactor, and again before close.
- `npm run build` after unit-c's `theme.css`/`utilities.css`/`typography.css` edits (confirms the `/styles` SFC-CSS + `@theme` token bridge emits) and before close.
- `npm run proof:reka-binding-idiom` (the wave's own gate) + `npm run proof:theme` + `npm run proof:tailwind-v4-idiom` before close (the new `--text-shadow-*` `@theme` rungs must clear the existing scale-completeness assert).
- `git diff --check` for whitespace; assert `git diff src/styles/tokens.css` and `git diff src/utils/cn.ts` empty (gate 7).
- No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W26-idiom-sweep.md` — the data-slot coverage count (pre: 36 missing / post: 0), the three CVA base diffs (icon-sizing/gap; the badge/toggle `transition-control` token is W25-owned, not in W26's diff), the `cn()` false-merge probe result (host `size-9` + icon `size-4` both retained), the five `aria-invalid` computed border/ring deltas, the `--text-shadow-*` resolved-value table + the no-literal grep, the Toast N>1 single-provider render result, and the binding render-effect spec results (the five bindings' asserted rendered effect).
- The `tests/components/ui/reka-binding-idiom.test.ts` spec file and the `scripts/proof-reka-binding-idiom.mjs` structural script (the gate's two halves).
- The synthetic-revert falsifiability log: the gate RED on each of the six reverted sub-fixes.
- Playwright/vitest render screenshots are NOT required (no Playwright dep — the repo idiom is vitest+happy-dom render probes); the render-effect assertions are the load-bearing evidence.
- The integration commit hashes (one per unit + the close).

## 9. Commit Plan

- `refactor(toast): forward emits + single app-root provider (reka 2.9 idiom)` — unit a; body cites the per-toast provider-nesting defect + the N>1 single-provider gate.
- `feat(select): SelectContent transform-origin anchor (popover-family parity)` — unit a.
- `feat(ui): blanket data-slot + :data-variant/:data-size (shadcn-2025)` — unit b; body cites the 36→0 coverage gate.
- `refactor(cva): Button/Badge/Toggle base icon-sizing + gap` — unit b; body cites the `cn()` no-false-merge verification + notes the badge/toggle `transition-control` token is W25-owned (W26 composes onto it).
- `feat(forms): aria-invalid error-paint on the five useUserInvalidAria controls` — unit b; body cites the announced-but-not-seen gap + W18 complement.
- `feat(theme): --text-shadow-* @theme bridge; .depth-text/.text-engraved compose tokens` — unit c; body cites the v4.1 token surface + the literal deletion.
- `feat(type): text-wrap balance/pretty/wrap-anywhere on type+label atoms` — unit c.
- `docs(migration): Combobox searchTerm→ComboboxInput v-model note; oklab-tint rationale` — unit c + the CLAUDE.md cn()/focus-ring divergence note (may fold into the unit-b CLAUDE.md commit).
- `test(reka): binding-correctness render guard + proof:reka-binding-idiom` — unit d; body cites the memory-note class (only render catches stale bindings) + the synthetic-revert falsifiability.
- `docs(AW): W26 close — idiom-sweep + binding-guard artefacts` — the artefact + status commit.

## 10. Dependencies

- **Depends on**: W25 (opens after; SHARES three `modify` paths — `badge/index.ts`, `toggle/index.ts`, `toast/Toast.vue` — and so runs SERIAL on those three after W25 lands: W25 owns the badge/toggle `transition-control` migration + the Toast material carve, W26 composes icon-sizing/gap + the forward-emits/provider-topology edit onto W25's landed state; the `data-slot` sweep also writes onto the post-W25 SFCs). W13 (the `button/index.ts` variant color lines landed; W26's base lines are disjoint but same-file). The `useUserInvalidAria` bridge (already shipped) for the aria-invalid paint. The `Toaster.vue` single-provider hoist (already shipped) for the Toast refactor.
- **Blocks**: W27 (close) — `proof:reka-binding-idiom` is registered in `scripts/gates.mjs` with `{local,ci,release,sibling}` tags at the close, run green across the matrix, and cited with a run-id in `FINAL.md`. W26 itself does NOT touch `scripts/gates.mjs` (that registration is the close's job).

## 11. Archaeology

Not a revisit — first execution. Context for the reader: the binding-correctness class is the standing `feedback_glass_ui_binding_verification` memory note (stale reka prop/emit bindings like `:pressed`/`v-model:search-term`/`tag=` silently no-op; vue-tsc + units miss them, only e2e/render catches them; sweep on version bumps). The reka-idiom lane re-confirmed at HEAD (against reka-ui 2.9.7 source) that glass-ui's bindings are CLEAN — `Toggle` uses `modelValue` not `:pressed`, `Combobox` forwards `ComboboxRootProps` (searchTerm correctly on `ComboboxInput`), `TagsInputItem` uses `data-[state=active]`. The residual exposure is therefore (a) external consumers still on the stale forms and (b) the ABSENCE of a render-effect test that would catch a future regression on a reka bump. W26 closes (b) with the render spec (the canary) and (a) with the MIGRATION.md note. The Toast per-toast provider nesting is the one genuinely non-idiomatic primitive (architectural, not cosmetic) — the only behavioural fix in an otherwise additive-idiom wave.
