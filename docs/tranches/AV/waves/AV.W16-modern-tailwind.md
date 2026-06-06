# AV.W16 — modern-Tailwind v4 cohesion

## 2. State

**Name**: W16 — modern-Tailwind v4 cohesion
**Opens after**: AV.W5 (the transposition/idiom folds — the W5 lifts land first so W16 inherits a current idiom surface) and AV.W15 (the iOS-26 token surface — W16 reads the W15 tokens for the `@theme` completeness assert). File-disjoint with W15.
**Agents**: 3 parallel — three file-disjoint lanes (§4a): (A) the `@theme inline` migration + the oklch palette ramps (the largest correctness-of-shape win) on `theme.css`/`tokens.css`, (B) the registered-token lifts + the `theme()`-function kills + the bare-`[--var]`→paren shorthand across the ~14 SFC sites, (C) the container-query adoption (the dock/chassis read their own box) + the `proof:tailwind-v4-idiom` gate (born RED). No two lanes share a `modify` path.
**Hard gate**: a NEW born-RED gate green (`proof:tailwind-v4-idiom`) asserting (a) zero `theme(colors.…)` function-syntax sites under `src/`, (b) no `<utility>-[var(--x)]` arbitrary wrap where a `--color-x`/`--z`/`--radius`/`--duration`/`--ease` bridge resolves the named utility, (c) the dock/chassis container-query context exists (the `@container` declarations + the `@sm`/`@lg`/`@max-*` reads), (d) `@theme` completeness — every color/shadow/radius/blur/duration/ease primitive in `tokens.css` has a bridge OR is on a listed raw-var holdout allowlist; cross-refs `proof:design-idiom-localization` (the W8b gate this extends). The existing gate matrix + `typecheck` + `build` stay green with no regression.
**Status**: planned

**Type:** IMPL + gate (idiom cohesion; born-RED where non-idiomatic). The user ask: "idiomatic MODERN tailwind."
**Scope source:** `docs/tranches/AV/audit/reinvent/ios26-tailwind-font-digest.md` §(2) (the Tailwind fold ledger TW1–TW8 + the DEFER list) + `ios26-partial-digest.md` §(2) (the four confirmed lifts T1–T4 + the non-folds). This file is the FULLY-formed, execute-without-re-deriving spec.

**Precepts in force.** Tailwind-first (design references re-expressed via `@theme` + `@utility`, never pasted raw). Token-first — every visual axis stays a `var(--…)`; the `@theme inline` migration keeps the `tokens.css` token as the SINGLE override point. No backwards-compat aliases (clean breaks). KISS — credit-first: glass-ui is already v4-idiomatic in the main (`@layer components`, `@utility` recipes, `@container style(--density)` with the documented `[data-density]` `:where()` fallback `utilities.css:485-517`, `color-mix()` shadows, `light-dark()`+oklch, the correctly-authored dark variant `@variant dark (&:where(.dark, .dark *))` `theme.css:381`). The remaining work is idiom *cohesion*, not invention. Visual-load-bearing-ness (J inv 10) — a Tier-3 fixed-px lift ships only when ≥2 sites OR a token is authored first; single-site `!`-important geometry is KEEP+record.

## 2a. Goal criterion

This wave succeeds if the remaining non-idiomatic v4 lifts close and the cohesion is machine-enforced by an extended gate. Concretely: (1) the `@theme inline` migration substitutes the referenced value into the generated utilities so each `tokens.css` token mints ONE global variable, not two (the ~86 `--color-x: var(--token)` var-references + the radius/shadow/blur/ease/duration bridges stop doubling the override surface); (2) the section/rainbow/viz/semantic-accent ramps move `hsl()` → `oklch()` with even-lightness rungs (shared with the AV.W15/color lane — one conversion serves both); (3) container queries replace viewport `@media` where a component should read its OWN box (the dock label/density, the overflow rail, typography, instrument-chassis) so they are portable into sidebars; (4) the ~14 registered-token lift sites drop the bare-`var()` wrap for the named utility, the 2 `theme(colors.…)` function sites die, and the bare-`[--var]` sites adopt the v4 paren shorthand; (5) `proof:tailwind-v4-idiom` is born RED (it reddens on the current non-idiomatic sites) then green (after the lifts), extending `proof:design-idiom-localization`. The reader's test: a `grep` for `theme(colors.` under `src/` returns zero; a dock dropped into a 320px sidebar collapses its label/density off its own box width, not the viewport; every `tokens.css` color/shadow/radius/blur primitive resolves through exactly one bridged variable.

## 3. Scope

1. **`@theme inline` migration (TW1; largest win).** `theme.css:9` opens a plain `@theme`; the ~86 `--color-x: var(--token)` var-references + the radius/shadow/blur/ease/duration bridges each mint a *second* global variable (`--color-primary` AND `--primary`), doubling the override surface. `@theme inline` substitutes the referenced value into the generated utilities and mints no second variable — the `tokens.css` token stays the single override point. Migrate the `@theme` block to `@theme inline` for the var-reference bridges; KEEP plain `@theme` for any primitive literal authored directly in the block (the inline form is only for the `var(--token)`-referencing bridges). **Guardrail:** color tokens registered with `@property` snapshot the resolved value and break `light-dark()` re-resolution (already documented at `theme.css:76-79`) — do NOT `@property`-register color tokens as part of this; the inline migration is orthogonal to `@property`.
2. **oklch palette ramps (TW2; shared with the color lane).** Move the section (13-stop), rainbow, viz, and semantic-accent ramps from `hsl()` → `oklch()` with even-lightness rungs; keep `hsl()` only where hand-tuned + gamut-irrelevant. HSL's L is perceptually uneven; v4's default is oklch (the v4 launch post, 2025-01-22). This is ONE conversion serving both the Tailwind lane and the iOS-26 color lane — sequence it once. Verify the `.dark`/`light-dark()` mirrors convert in lockstep (oklch pairs are cleanest authored together).
3. **Container queries for components (TW3).** The dock label/density (`dock.css:154-164`), the overflow rail (`dock.css:887`), typography (`typography.css:447`), and instrument-chassis (`instrument-chassis.css:292`) key off viewport `@media` where they should read their OWN box. Add a `@container` context (`container-type`/`container-name`) on the dock/chassis root and swap the `@media` brackets → `@sm`/`@lg`/`@max-*` container variants. This makes them portable into sidebars — exactly what the dock convergence needs. Container queries are built into v4 (the launch post, 2025-01-22). KEEP the existing `@container style(--density)` `[data-density]` `:where()` Firefox fallback (`utilities.css:485-517`) — style queries are still not in Firefox; the SIZE container queries here are cross-browser.
4. **Tier-1 registered-token lifts (TW4).** ~14 SFC sites wrap a raw `var()` where the named utility already resolves: `TabsIndicator.vue:18` (`duration-[var(--duration-normal)]`→`duration-normal`, `ease-[var(--spring-snappy)]`→`ease-spring-snappy`); `DialogContent.vue:80`; `CarouselDots.vue:62,71,72` (`bg-[var(--muted-medium)]`→`bg-muted-medium`, the `--color-muted-medium` bridge exists); `HeaderRibbon.vue:4` (`z-[var(--z-dock)]`→`z-dock`); `DarkModeToggle.vue:40,84` (`rounded-pill`, `fill-foreground`); `NumberFieldDecrement/Increment.vue:28` (`size-[var(--icon-sm)]`→`size-icon-sm`, intent documented at `theme.css:264`); `ComboboxAnchor.vue:19` (`w-[200px]`→`w-popover` — a literal W8b miss, the sibling `ComboboxList` was lifted, the Anchor left behind). Only possible new bridge: `--ease-standard`, one line. Lift each to the named utility.
5. **bare `[--var]` → paren shorthand (TW5).** v3's `bg-[--brand]` → v4's `bg-(--brand)` (auto-wraps `var()`): `TabsIndicator.vue:18` (`h-[--reka-tabs-indicator-size]`→`h-(--reka-…)`), plus `ComboboxList.vue:24`, `SelectContent.vue:55`. The paren shorthand is the v4 idiom (the upgrade guide).
6. **`theme()`-function deprecation kill (TW6).** The only two deprecated-function sites in the whole tree: `Progress.vue:181` (`bg-[var(--progress-track,theme(colors.secondary.DEFAULT))]`) + `:194` (`[background:var(--progress-fill,theme(colors.primary.DEFAULT))]`). Replace `theme(colors.x)` → `var(--color-x)` (the bridges exist — `var(--secondary)`/`var(--primary)`), OR author a `--progress-track`/`--progress-fill` token defaulting to the semantic. `theme()` is "not considered idiomatic usage of v4.0" (tailwindlabs #16116).
7. **single-source masks (TW7).** Drop the manual `-webkit-mask-image` lines (`utilities.css:262-280`), mirroring the glass-ladder's single-source + Lightning-CSS-prefix approach (`glass.css:11-19`). NOTE: this is the *consistency* cut; it does NOT conflict with W15's `@supports`-gated older-Safari mask fallback — that fallback is the case where the `-webkit-` companion is actually needed, W15 gates it; here the dock scroll-fade + paper-grain ride the build-pipeline prefixing like the glass ladder.
8. **extend `proof:design-idiom-localization` → `proof:tailwind-v4-idiom` (TW8; born RED then green).** The W8b gate flags only `text-[var]`/`shadow-[var]`. Add: (a) a `theme(colors.…)` detector (TW6, zero false positives, 2 sites); (b) a `\b[a-z-]+-\[var\(--(z|radius|duration|ease)\b` detector for registered-namespace vars with a bridge (catches TW4); (c) the container-query-context assert (the dock/chassis carry `@container` context); (d) the `@theme` completeness assert (every color/shadow/radius/blur/duration/ease primitive in `tokens.css` has a bridge OR is on the listed raw-var holdout allowlist). **KEEP OFF the flag list:** compound `transition-[…]` lists (sanctioned single-site per the v4 transition-property docs), the slider `[--slider-track-height:…]` *declarations* (the only way to set a `--var` in a class — the declare-vs-consume distinction), and the state-axis choreography constants (`--scale-press`, `--scale-hover`, `--lift`, `--max-width-input`) consumed as raw `var()` inside recipes (correct — no per-element utility use case; the partial digest §(2) non-folds).

**DEFER (Tailwind; trigger-named).** Tier-3 fixed-px → token lifts (Notification/Toaster widths, the `max-h-[300px]` pair across `ComboboxViewport.vue:19`+`CommandList.vue:22`, FuzzySearch dialog geometry, Separator hairline) — these need token authoring FIRST; trigger = a token is authored (the `max-h-[300px]` pair clears the ≥2-site bar so `--popover-max-h` is the safest entry; the FuzzySearch `!`-important geometry is single-site → KEEP+record per J inv 10). Generalize `light-dark()` across the whole palette (the `.dark{}` block, `tokens.css:1420`) — trigger = AFTER the oklch migration lands (the pairs are cleanest as oklch pairs; sequencing before forces a double rewrite). Broader `@container style()` density adoption — trigger = a 2nd density consumer (KEEP the Firefox `[data-*]` `:where()` fallback mandatory). `@property`-typed token registration beyond `--ripple-radius` — stays narrow (registering color tokens breaks `light-dark()` re-resolution). Invoker Commands API (`command`/`commandfor`, Baseline 2025-12-12) — too new, reka-ui owns these primitives' JS. Anchor positioning — status held by web-features; KEEP-BOOK.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The `@theme inline` migration shifts a resolved utility off its HEAD paint.** If substituting the referenced value inline changes any `--color-*`/`--radius-*`/`--shadow-*` utility's resolved value (a visual regression the snapshot catches), the migration is not value-preserving — halt and triumvirate; the inline form must be paint-identical.
- **The oklch ramp conversion drifts a hand-tuned hue.** If converting a hand-tuned `hsl()` rung to `oklch()` with even-lightness shifts the perceived hue off the brand cadence (the L-uniformity replaces the hand-tuned L-cadence comments — but a hue drift is a defect), halt — the conversion preserves hue, only evens L.
- **The container-query swap breaks a viewport-coupled bracket that is correctly viewport-keyed.** If a `@media` bracket is genuinely viewport-semantic (not box-semantic), swapping it to `@container` is wrong — halt and triumvirate to keep the viewport `@media` (not every `@media` is a container-query candidate; only the ones that should read the component's own box).
- **`proof:tailwind-v4-idiom` cannot be authored manifest==ci without false-RED-ing a sanctioned site** (the compound `transition-[…]` lists, the slider `[--var:…]` declarations, the choreography constants) — that is a plan defect, not a local fix; halt and triumvirate to encode the allowlist.
- **Any diagnostic loop reaches its third iteration** on the `@theme inline` build verify — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access | Lane |
|---|---|---|
| `src/styles/theme.css` | modify (`@theme` → `@theme inline` for the var-reference bridges; the `--ease-standard` bridge IF authored) | A |
| `src/styles/tokens.css` | modify (the oklch palette ramps — section/rainbow/viz/semantic-accent + the `.dark`/`light-dark()` mirrors) | A |
| `src/components/ui/progress/Progress.vue` | modify (TW6 — `theme(colors.x)` → `var(--color-x)`) | B |
| `src/components/ui/tabs/TabsIndicator.vue` | modify (TW4 + TW5 — `duration-normal`/`ease-spring-snappy` + `h-(--reka-…)`) | B |
| `src/components/ui/dialog/DialogContent.vue` | modify (TW4) | B |
| `src/components/ui/carousel/CarouselDots.vue` | modify (TW4 — `bg-muted-medium`) | B |
| `src/components/custom/header-ribbon/HeaderRibbon.vue` | modify (TW4 — `z-dock`) | B |
| `src/components/custom/controls/DarkModeToggle.vue` | modify (TW4 — `rounded-pill`/`fill-foreground`) | B |
| `src/components/ui/number-field/NumberFieldDecrement.vue` | modify (TW4 — `size-icon-sm`) | B |
| `src/components/ui/number-field/NumberFieldIncrement.vue` | modify (TW4 — `size-icon-sm`) | B |
| `src/components/ui/combobox/ComboboxAnchor.vue` | modify (TW4 — `w-popover`) | B |
| `src/components/ui/combobox/ComboboxList.vue` | modify (TW5 — paren shorthand) | B |
| `src/components/ui/select/SelectContent.vue` | modify (TW5 — paren shorthand) | B |
| `src/styles/utilities.css` | modify (TW7 — drop the manual `-webkit-mask-image` lines `:262-280`) | B |
| `src/styles/dock.css` | modify (TW3 — `@container` context + `@sm`/`@lg`/`@max-*` swap on the label/density/rail) | C |
| `src/styles/instrument-chassis.css` | modify (TW3 — `@container` context) | C |
| `src/styles/typography.css` | modify (TW3 — the `:447` container-query swap) | C |
| `scripts/proof-tailwind-v4-idiom.mjs` | create | C |
| `scripts/gates.mjs` | modify (register, orchestrator-merged) | C |
| `package.json` | modify (the `proof:tailwind-v4-idiom` script row) | C |
| `docs/tranches/AV/PROGRESS.md` | modify | all |
| `docs/tranches/AV/audit/W16-tailwind-idiom.json` | create (the lift + container-query tally) | C |

Do NOT touch: `src/styles/glass.css` (the glass-ladder single-source masks are CANONICAL — the model TW7 mirrors, read-only) · the `@variant dark` declaration (`theme.css:381` — correctly authored, untouched) · the state-axis choreography constants in `utilities.css` recipes (`--scale-press`/`--scale-hover`/`--lift`/`--max-width-input` — correctly unbridged, not lifted) · `docs/precepts/` (NEVER).

## 4a. Disjointness

No two agent units share a `modify` or `create` path:

- **Lane A (`@theme inline` + oklch)** owns `theme.css` + `tokens.css` (the `@theme inline` migration + the oklch palette ramps). It is the only lane that edits the two styles sources of truth. Disjoint from B/C.
- **Lane B (SFC lifts)** owns the ~12 SFC sites (`Progress.vue`, `TabsIndicator.vue`, `DialogContent.vue`, `CarouselDots.vue`, `HeaderRibbon.vue`, `DarkModeToggle.vue`, the two `NumberField*` files, `ComboboxAnchor.vue`, `ComboboxList.vue`, `SelectContent.vue`) + `utilities.css` (the TW7 mask single-source). Lane A edits `theme.css`/`tokens.css`, not `utilities.css`; Lane C edits `dock.css`/`instrument-chassis.css`/`typography.css`, not `utilities.css`. Disjoint.
- **Lane C (container queries + gate)** owns `dock.css` + `instrument-chassis.css` + `typography.css` (the container-query swaps) + the `proof-tailwind-v4-idiom.mjs` gate + the `W16-tailwind-idiom.json` tally. Disjoint from A/B.
- `scripts/gates.mjs` + `package.json` + `PROGRESS.md` are orchestrator-integrated at close (append-only to disjoint regions).

Net: three parallel lanes — **(A) `@theme inline` + oklch**, **(B) SFC registered-token lifts + the `theme()` kill + the mask single-source**, **(C) container queries + the idiom gate**.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — `@theme inline` + oklch | `/Users/mkbabb/Programming/glass-ui-w16-a` | owns `theme.css` + `tokens.css` |
| Lane B — SFC lifts | `/Users/mkbabb/Programming/glass-ui-w16-b` | owns the ~12 SFC sites + `utilities.css` masks |
| Lane C — container queries + gate | `/Users/mkbabb/Programming/glass-ui-w16-c` | owns `dock.css`/`instrument-chassis.css`/`typography.css` + the gate |

No `CARGO_TARGET_DIR` (Node/Vite repo). Each lane runs `npm run typecheck` / `npm run build` / its gates against its own worktree checkout. The orchestrator runs `git worktree add` for the siblings before dispatch and owns the `gates.mjs`/`package.json`/`PROGRESS.md` integration at close. All three lanes branch from the same clean main with AV.W5/W15 committed.

## 5. Agent Units

### AV.W16.A `@theme inline` migration + oklch palette ramps

- **Goal:** each `tokens.css` token mints exactly one global variable (the inline form kills the doubled override surface), and the section/rainbow/viz/semantic-accent ramps read perceptually-even oklch — the single conversion serving both the Tailwind and the iOS-26 color lanes.
- **Mechanism:** migrate the `@theme` var-reference bridges (`theme.css:57-202` colors + `:227-377` radius/shadow/blur/ease/duration) to `@theme inline` so the referenced value substitutes into the generated utilities and no second variable is minted; keep plain `@theme` for any directly-authored literal. Convert the section/rainbow/viz/semantic-accent ramps `hsl()` → `oklch()` with even-lightness rungs (`tokens.css`), converting the `.dark`/`light-dark()` mirrors in lockstep. Do NOT `@property`-register color tokens (breaks `light-dark()` re-resolution — `theme.css:76-79`).
- **Files:** `src/styles/theme.css`, `src/styles/tokens.css`.
- **Sub-gate:** the `@theme completeness` assert in `proof:tailwind-v4-idiom` passes (one bridge per primitive); a `grep` confirms the var-reference bridges are `@theme inline`; the oklch ramps resolve perceptually-even (an L-monotonic assert across each ramp); `typecheck` + `build` green; the visual-regression snapshot is paint-identical.

### AV.W16.B SFC registered-token lifts + the `theme()` kill + mask single-source

- **Goal:** the ~14 bare-`var()`-wrap sites adopt the named utility, the 2 `theme(colors.…)` function sites die, the bare-`[--var]` sites adopt the v4 paren shorthand, and the dock/paper masks single-source like the glass ladder.
- **Mechanism:** lift each TW4 site to its named utility (`duration-normal`, `ease-spring-snappy`, `bg-muted-medium`, `z-dock`, `rounded-pill`, `fill-foreground`, `size-icon-sm`, `w-popover`); author the one new `--ease-standard` bridge if a site needs it. Replace the 2 `theme(colors.x)` → `var(--color-x)` in `Progress.vue`. Convert the bare `[--var]` → paren `( --var )` in `TabsIndicator.vue`/`ComboboxList.vue`/`SelectContent.vue`. Drop the manual `-webkit-mask-image` lines in `utilities.css:262-280`.
- **Files:** the ~12 SFC sites + `src/styles/utilities.css` (per §4 File Bounds, Lane B rows).
- **Sub-gate:** `proof:tailwind-v4-idiom` flags zero `theme(colors.…)` sites and zero registered-namespace bare-`var()` wraps with a bridge; the paren shorthand resolves; the masks single-source; `typecheck` + `build` green; the SFC unit tests stay green (the binding-verification sweep — stale reka prop bindings silently no-op).

### AV.W16.C Container queries + the idiom gate

- **Goal:** the dock/chassis/typography read their OWN box (portable into a 320px sidebar), and the cohesion is machine-enforced by an extended gate born RED then green.
- **Mechanism:** add a `@container` context (`container-type`/`container-name`) on the dock/chassis root, swap the viewport `@media` brackets → `@sm`/`@lg`/`@max-*` container variants on the dock label/density (`dock.css:154-164`), the overflow rail (`dock.css:887`), typography (`typography.css:447`), and instrument-chassis (`instrument-chassis.css:292`); KEEP the `@container style(--density)` Firefox `:where()` fallback. Author `proof:tailwind-v4-idiom` extending `proof:design-idiom-localization` with the four asserts (no-`theme()`, no-registered-bare-var, container-context, `@theme` completeness) and the allowlist for the sanctioned sites.
- **Files:** `src/styles/dock.css`, `src/styles/instrument-chassis.css`, `src/styles/typography.css`, `scripts/proof-tailwind-v4-idiom.mjs`, `scripts/gates.mjs`, `package.json`, `docs/tranches/AV/audit/W16-tailwind-idiom.json`.
- **Sub-gate:** a dock dropped into a narrow host collapses its label/density off its own box width (a narrow-host render assert); `proof:tailwind-v4-idiom` is born RED on the pre-lift tree, green after; `typecheck` + `build` green.

## 6. Hard Gate

1. **`proof:tailwind-v4-idiom` born RED then green.** Asserts: (a) zero `theme(colors.…)` function-syntax sites under `src/` (TW6); (b) no `<utility>-[var(--x)]` arbitrary wrap where a `--color-x`/`--z`/`--radius`/`--duration`/`--ease` bridge resolves the named utility (TW4); (c) the dock/chassis carry a `@container` context (`container-type` declared) and the swapped brackets read container variants (TW3); (d) `@theme` completeness — every color/shadow/radius/blur/duration/ease primitive in `tokens.css` has a bridge OR is on the listed raw-var holdout allowlist (TW1 corollary); (e) the allowlist correctly EXEMPTS the compound `transition-[…]` lists, the slider `[--var:…]` declarations, and the choreography constants. Cross-refs `proof:design-idiom-localization` (the W8b gate this extends).
2. **`@theme inline` is value-preserving** — the visual-regression snapshot is paint-identical pre/post the migration; one global variable resolves per token (the override-point assert).
3. **The oklch ramps are perceptually-even** — an L-monotonic assert across each converted ramp; the `.dark`/`light-dark()` mirrors convert in lockstep.
4. **The container-query swap is portable** — a dock rendered in a narrow host collapses off its own box, not the viewport (the narrow-host render assert).
5. **`typecheck` + `build` + the SFC unit tests stay green** with no regression across the existing gate matrix; the binding-verification sweep confirms no stale reka prop/emit binding was introduced by the SFC lifts.

## 7. Format And Lint Cadence

CSS-and-SFC wave. Run `npm run typecheck` + `npm run build` after each lane's integration batch and before close; `npx prettier --check` on the touched `.css`/`.vue`/`.ts`; `git diff --check`; the new `proof:tailwind-v4-idiom` + `proof:design-idiom-localization` + the existing gate matrix at close. The idiom gate is the lint (it asserts no `theme()`, no registered-bare-var, the container context, the `@theme` completeness); there is no separate stylelint pass in-repo.

## 8. Verification Artefacts

- `docs/tranches/AV/audit/W16-tailwind-idiom.json` — the lift tally (the TW4/TW5/TW6 sites closed, the container-query swaps, the `@theme inline` bridge count, the oklch ramp conversions).
- The pre/post `@theme inline` paint-identical snapshot + the narrow-host dock render under `docs/tranches/AV/audit/`.
- The `proof:tailwind-v4-idiom` born-RED-then-green run logs.
- Integration commit hashes at close.

## 9. Commit Plan

- **Lane A** — `refactor(tranche-AV): W16 (theme) — @theme inline migration (kills the doubled override surface) + the oklch palette ramps`. Body: the inline migration scope + the value-preservation proof + the oklch L-uniformity.
- **Lane B** — `refactor(tranche-AV): W16 (lifts) — the ~14 registered-token lifts + the 2 theme() kills + the paren shorthand + the mask single-source`.
- **Lane C** — `feat(tranche-AV): W16 (idiom) — container queries on the dock/chassis + proof:tailwind-v4-idiom (born RED → green)`. Body: the container-query portability + the gate's four asserts + the allowlist.
- **Orchestrator** — gate registration + `PROGRESS.md` status at close.

## 10. Dependencies

- **Depends on**: AV.W5 (the transposition/idiom folds — a current idiom surface), AV.W15 (the iOS-26 token surface — the `@theme` completeness assert reads the W15 tokens). The oklch ramp conversion is SHARED with the AV color lane — sequence it once (this wave owns it; the color lane reads the result).
- **Blocks**: the next minor publish (the idiom cohesion is a release-quality gate, non-publish-blocking but release-desirable). The DEFER'd `light-dark()` generalization triggers AFTER this wave's oklch migration lands.

## 11. Archaeology

Extends the W8b `proof:design-idiom-localization` gate (the `text-[var]`/`shadow-[var]` flag) — the prior attempt closed the first arbitrary-wrap class; W16 closes the registered-namespace + `theme()`-function + container-query classes the W8b sweep left (the `ComboboxAnchor.vue:19` `w-[200px]` is a literal W8b miss — the sibling `ComboboxList` was lifted, the Anchor left behind). New guardrail: the allowlist (compound `transition-[…]`, slider `[--var:…]` declarations, choreography constants) so the extended gate does not false-RED the sanctioned sites.
