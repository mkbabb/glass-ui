# D4 — The component API from first principles (the unified prop grammar + the post-reshape surface)

**Lens.** The whole-library prop grammar: is there ONE grammar every component speaks for the
surface/material axis, the size/density axis, the orientation axis, the motion opt-ins, and the a11y
contract — or N locally-correct dialects? Then the import story after BH B2 (drop `/api`, clean-break
export reshape): what is the IDEAL post-reshape consumer surface, exactly. Verified on disk against
`tranche/BG` HEAD `976dc890`.

---

## Verdict

The library has ONE genuinely-unified axis — **surface** (`Surface = glass|veil|opaque|clear`, factored
in `ui/_shared/useSurfaceAxis.ts`, threaded by 21 components through the same resolver + `[data-surface]`
attr). That axis is the PROOF the grammar CAN be unified and the MODEL the rest should copy. Everything
else is a dialect pile. The **size/compactness axis is the headline failure**: the identical conceptual
rung is spelled **three incompatible ways** — the canonical middle rung is `default` on Button and the
input register, `md` on Slider and the chip family, and `comfortable` on dock and configurator — and the
two 4-rung "density" unions are *different sets* (dock has `audacious`, configurator has `mobile`). A
consumer who sizes a Slider (`size="md"`), an Input (`size="default"`), and a Configurator
(`density="comfortable"`) writes three words for one idea; there is no `Size` type to import, no token
vocabulary they share as a name. **Orientation** is consistent in VALUES (`"horizontal"|"vertical"`
everywhere) but is re-declared inline in ≥5 components with no shared `Orientation` type — value-cohesion
without a factored home. The **motion opt-ins** are an unnamed scatter (`draggable`, `pressable`,
`spring`, `liquidDrag`, `dragDismiss`, `specular`, `punch`) with no grammar for "opt into physics." This
is precisely the user's "poor encapsulation / lacking elegance" critique made concrete at the API layer:
the system was built family-by-family, each wave minting its own local axis vocabulary, and no wave ever
factored the cross-family grammar the way `useSurfaceAxis` factored surface.

The fix is not a patch — it is **one grammar, minted once in `_shared/`, adopted by clean break** (no
aliases, per the no-legacy law), sequenced to ride on BH B2's already-planned single-writer export
reshape so the two structural breaks land as ONE 5.0.0 cut rather than two. Below: the exact grammar
(names/types/defaults/token-inheritance), an 8-component migration audit sizing the break, the ideal
post-reshape import surface, and the fold candidates.

---

## Findings (ranked by severity)

### D4-1 (CRITICAL) — The size/compactness axis is three incompatible vocabularies for one concept

The single most-used axis in any design system — "how big / how tight" — has no shared name, type, or
default-rung vocabulary. Verified unions:

| Component(s) | prop | union | middle-rung name | default | source |
|---|---|---|---|---|---|
| Button | `size` | `xs · sm · default · lg · icon · icon-sm` | **default** | `default` | `ui/button/index.ts:182-201` |
| Input · Switch · Textarea · NumberFieldInput | `size` (`ControlSize`) | `sm · default · lg` | **default** | `default` | `ui/_shared/useControlSize.ts` (`ControlSize`) |
| Slider | `size` | `sm · md · lg` | **md** | `md` | `ui/slider/index.ts:53-74` |
| SelectableChip · ToggleChip | `size` | `sm · md · lg · cell` | **md** | `md` | `custom/selectable-chip/chipVariants.ts:54-67` |
| GlassDock | `density` | `compact · comfortable · spacious · audacious` | **comfortable** | `comfortable` | `custom/dock/composables/useDockShellProps.ts:21` |
| Configurator | `density` | `mobile · compact · comfortable · spacious` | **comfortable** | `comfortable` | `custom/configurator/density.ts:19`, `Configurator.vue:123` |

Two distinct defects stack here:

1. **Naming collision on the canonical rung.** `default`, `md`, and `comfortable` are the SAME physical
   rung (the workhorse control height). Nothing in the type system, the token layer, or the docs ties
   them together. A consumer cannot write a helper that sizes a mixed control cluster uniformly.

2. **The two "density" unions are different SETS.** Dock `{compact, comfortable, spacious, audacious}`
   (`useDockShellProps.ts:21`) vs configurator `{mobile, compact, comfortable, spacious}`
   (`density.ts:19`) overlap on three rungs and each mints a *unique fourth* (`audacious` vs `mobile`).
   There is no shared `Density` type; the divergence is silent and un-gated.

Note the deeper truth the `useControlSize.ts` header already states: the size prop is *not a magnitude
register* — it **selects a rung of the existing `--control-h-{xs,sm,md,lg}` token cohort** (`useControlSize.ts`
header comment). So the ground truth ALREADY has a canonical vocabulary — the token cohort's rung names
(`xs/sm/md/lg`). The prop layer just refuses to speak it: Button/inputs say `default` where the token says
`md`. The elegant transposition is to make the prop vocabulary EQUAL the token vocabulary the props already
resolve.

### D4-2 (MAJOR) — `size` and `density` are the same axis wearing two prop names

Dock and Configurator call the compactness axis `density`; every atom calls it `size`. They are not
different concepts — both select padding/gap/height rungs off a scale multiplier (dock resolves
`--dock-scale`; inputs resolve `--control-h-*`). The split exists only because container-family waves
(dock, configurator) and atom-family waves (button, input, slider) were authored independently and each
picked a word. A designer reading the API sees two axes and must learn which components speak which. The
gestalt answer: ONE axis name. `size` is the shadcn/house-idiomatic term for atoms and is already the
majority; `density` should fold onto it (a container's `density` IS its content `size` rung). Clean break,
no alias.

### D4-3 (MAJOR) — Orientation is value-cohesive but not factored (no shared `Orientation` type)

`orientation?: "horizontal" | "vertical"` is re-declared inline in GlassDock (`useDockShellProps.ts:72`),
SegmentedTabs (`SegmentedTabs.vue`), ToggleGroup (reka passthrough), DockLayerGroup, Separator, and the
timeline/slider families — verified 5+ inline copies of the literal union. The VALUES are consistent (a
real positive vs the size axis), but there is no `export type Orientation` in `_shared/` the way `Surface`
lives there. This is low-harm today but it is the same root cause: a cross-family axis with no factored
home. It becomes a real bug the day one component adds a third value (`"both"`, a grid) and the others
can't see it. Factor it into `_shared/axes.ts` alongside the size and surface types.

### D4-4 (MAJOR) — The motion/interaction opt-ins have no grammar

The "opt into physics-based / liquid-weight motion" intent is expressed by an unnamed scatter of ad-hoc
prop names, mixing booleans and enums with no shared shape:

| Prop | component | shape | source |
|---|---|---|---|
| `draggable` | SegmentedTabs, DockLayerGroup | boolean | `SegmentedTabs.vue:121`, `DockLayerGroup.vue:59` |
| `pressable` | Card | boolean | `ui/card/Card.vue:181` |
| `spring` | Dialog, Sheet | boolean | `DialogContent.vue:85`, `SheetContent.vue:58` |
| `liquidDrag` | Slider | boolean | `ui/slider/Slider.vue:40` |
| `dragDismiss` | Sheet | boolean | `SheetContent.vue:58` |
| `keepDockOpen` | Slider | boolean | `ui/slider/Slider.vue:39` |
| `specular` | Card, Button | enum `off·subtle·full` | `ui/card/Card.vue:180` |
| `punch` / `liquid` | Button | boolean | `ui/button/Button.vue` |

Some of these are genuinely component-specific and should stay (`keepDockOpen` is a dock-slider contract;
`dragDismiss` is a sheet gesture). But `draggable`/`pressable`/`spring`/`liquidDrag` all mean the same
thing — "wire the interruptible spring-press/drag physics" — and the design language mandates
liquid-weight is UNIVERSAL, so this should not even be an opt-out matrix of differently-named booleans.
The grammar answer (below): a single `motion` axis with a defined default, not seven boolean synonyms.

### D4-5 (MINOR) — `Surface` doc-vs-disk drift (stale "three-rung" comment)

`useSurfaceAxis.ts` line ~15 still reads "A consumer wave forking its own **three-rung** surface recipe is
forbidden," but the union is FOUR rungs (`glass|veil|opaque|clear` — `clear` added at BE.W-CLEAR-VARIANT).
The CLAUDE.md "factored ONCE" prose (§Shared surface-decoration axis) likewise says
`surface="glass|veil|opaque"` — three rungs. Per the audit's own rule (a doc contradicting disk is a
finding), the canon text trails the disk. Trivial, but it is exactly the kind of "missing obvious issue"
the mandate names; fold the fix into the grammar-canon wave.

### D4-6 (MINOR, positive — do not touch) — `Surface` is the model the rest must copy

`useSurfaceAxis.ts` is the ONE axis done right: a single union + a single `surfaceClass(surface, tier)`
resolver + a `[data-surface]` CSS seam, adopted by 21 components (`ui/{button,card,dialog,sheet,popover,
command,drawer,dropdown-menu,context-menu,hover-card,select,toast,tooltip}`, `custom/{glass-panel,
expandable-container,search}`), machine-locked so a second surface axis is a gate failure
(`proof:surface-axis` W1). This is the encapsulation the size/motion axes lack. **Keep verbatim** — it is
the template, not a target. (`cartoon` correctly lives on Card's local `CardSurface` superset, not the
shared union — a genuine Card-local decoration, not a fork.)

---

## The unified grammar (precise: names · types · defaults · inheritance)

Minted ONCE in a new `src/components/ui/_shared/axes.ts` (the `useSurfaceAxis` neighborhood), imported by
every component, published on the discovery surface. **Token-first inheritance is the spine: a prop
SELECTS a rung; the absolute magnitude stays a token so a consumer retunes from `:root` without touching
a prop** (the `useControlSize` discipline, generalized).

### Axis 1 — SURFACE (already done; formalize the canon text)
```ts
export type Surface = "glass" | "veil" | "opaque" | "clear";  // default "glass"
```
Inheritance: `[data-surface]` attr + `surfaceClass()` over the `--glass-*` ladder. **No change** except
the doc-drift fix (D4-5). `cartoon` stays Card-local.

### Axis 2 — SIZE (the unification — clean break)
ONE union, its rung names EQUAL to the `--control-h-*` token cohort the props already resolve:
```ts
export type Size = "xs" | "sm" | "md" | "lg";              // default "md"
```
- `default` → `md`, `comfortable` → `md` everywhere. Kills the three-way collision by making the prop
  vocabulary identical to the token vocabulary (D4-1's ground truth).
- Component sub-ranges are LEGAL restrictions of the ONE union, not new unions: inputs expose `sm|md|lg`
  (no `xs`), chips expose `sm|md|lg` + the orthogonal `cell` shape flag (NOT a size rung — `cell` is a
  silhouette, split it off as `shape="cell"` or a `tile` boolean), Button keeps `xs|sm|md|lg` and moves
  its `icon`/`icon-sm` off the size axis onto an orthogonal `iconOnly` boolean (icon-only is a SHAPE, not
  a size — the shadcn conflation is the smell).
- Inheritance: unchanged — `size` re-points `--control-pill-h`/`--control-pill-text` (inputs) or the
  `--dock-scale`/`--dock-control-size` rung (containers). The token is the magnitude; the prop is the
  selector.

### Axis 3 — DENSITY folds onto SIZE for atoms; containers keep a `density` that IS a size rung
Dock/Configurator `density` becomes `size` on the SAME `Size` union (`compact`→`sm`, `comfortable`→`md`,
`spacious`→`lg`, and the unique fourths: dock `audacious`→`xl` extension, configurator `mobile`→a
`@media(pointer:coarse)` token concern, NOT a rung — mobile is a RESPONSIVE state, not a chosen density,
which is why it never belonged in the enum). If a container genuinely needs a 5-rung range, extend the
ONE union to `xs|sm|md|lg|xl` — never a parallel set.

### Axis 4 — ORIENTATION (factor the existing consistent values)
```ts
export type Orientation = "horizontal" | "vertical";      // default "horizontal"
```
Move the inline literal into `_shared/axes.ts`; every component imports it. Zero value change (D4-3), pure
factoring — so this rides as a mechanical sub-move, not a break.

### Axis 5 — MOTION (replace the seven-boolean scatter)
The liquid-weight-universal law means interactive surfaces animate by DEFAULT; the axis is an opt-DOWN,
not an opt-in matrix:
```ts
export type Motion = "full" | "reduced" | "off";          // default "full"
```
- `full` — the interruptible spring-press/drag physics (the universal default).
- `reduced` — compositor fades only, no transform physics (the manual PRM-equivalent a consumer can force
  regardless of the OS setting).
- `off` — no motion (SSR/print/test).
- The GENUINELY component-specific gestures stay as their own named props (`keepDockOpen`, `dragDismiss`,
  `responsive`) — these are contracts, not motion-intensity. But `draggable`/`pressable`/`spring`/
  `liquidDrag` all collapse: an interactive Card/Tab/Slider is `motion="full"` by default and the physics
  is on; a static plate is a Card without the interactive role, not `pressable=false`. `prefers-reduced-
  motion` still overrides `full`→`reduced` at the CSS layer (the axis is the consumer's manual override,
  the OS setting is the involuntary one).

### The a11y contract (already correct — canonize, don't rebuild)
The role-per-variant discipline is real and correct: SegmentedTabs `pill`→`role=group`/`underline`→`role=
tablist`; ToggleGroup `single`→`radiogroup`/`multiple`→`group`; StatusDot emits `role=img` only when
`aria-label` bound. These are NOT prop-grammar — they are derived from the semantic variant. The ONE
canon to record: **a11y role is DERIVED from the variant/type prop, never a separate `role` prop the
consumer sets.** No new axis; a design-idiom line + the existing per-component gates.

---

## Migration audit (8 components sized against the grammar)

| Component | surface | size/density | orientation | motion | break size |
|---|---|---|---|---|---|
| Button | ✓ `Surface` | rename `default`→`md`; split `icon*`→`iconOnly` | n/a | fold `punch`/`liquid`→`motion` | **medium** (CVA key rename + call sites) |
| Card | ✓ `CardSurface` | add `size` (currently none) | n/a | fold `pressable`→`motion` | small |
| Input/Switch/Textarea | ✓ `Surface` | rename `default`→`md` (`ControlSize`→`Size`) | n/a | — | small (type rename) |
| Slider | ✓ | already `sm/md/lg` ✓ (default already `md`) | n/a | fold `liquidDrag`→`motion` (keep `keepDockOpen`) | small |
| SelectableChip/ToggleChip | ✓ | `sm/md/lg` ✓; split `cell`→`shape` | n/a | — | small (cell reclassify) |
| SegmentedTabs | ✓ (via items) | add `size` (none today) | ✓ import `Orientation` | fold `draggable`→`motion` | small |
| GlassDock | n/a (always glass) | `density`→`size` (`comfortable`→`md`, `audacious`→`xl`) | ✓ import `Orientation` | keep gestures | **medium** (density rename, many tokens) |
| Configurator | n/a | `density`→`size` (drop `mobile`→responsive) | n/a | — | small |

**Total break surface: 2 medium (Button, Dock) + 6 small.** This is a smaller migration than the D4-1
prose suggests, because the token layer is ALREADY unified — most of the break is a prop-key rename +
type-name swap, not a mechanism rewrite. That is exactly why it must ride the 5.0.0 clean-break cut and
never be an alias-bridged incremental (which would double the surface).

---

## The import story (post-BH-B2 reshape — take the drop-`/api` decision as given, go further)

BH B2 already decided: delete `src/subpaths/` (79 mirror barrels), fold-delete `src/api/` (drop the
`./api` key, re-home its 203 symbols onto owning subpaths, 3 orphans absorb an export), relocate the 11
curated flat barrels `src/*.ts`→`src/entries/`, all key-preserving except the one `./api` drop
(`BH/PLAN.md:29,68-70`). `package.json` has 277 `"./` entry lines today (~76 published subpaths + CSS/font
entries). **Take that as the floor and specify the IDEAL end state:**

1. **Three tiers, named honestly.** (a) The **root barrel** `@mkbabb/glass-ui` — the vueuse-free curated
   surface (37 ui families + cherry-picks) for the "just give me Button/Card" consumer. (b) The **flat
   per-family subpaths** `@mkbabb/glass-ui/{dock,aurora,configurator,...}` — the substrate-isolation tier,
   one dist chunk per family, the payload-conscious import. (c) The **types-discovery surface** —
   `/api` DIES, but its VALUE (a consumer typing `import type { ... }` from one place) must survive.
   Post-reshape, every published subpath re-exports its own types (the 200 path-swaps), so the discovery
   is `import type { CardTier } from "@mkbabb/glass-ui/card"` — types co-located with their family. This
   is STRICTLY better than `/api`: no aggregator to drift, the type lives where the component lives.

2. **The grammar types get ONE home.** `Surface`, `Size`, `Orientation`, `Motion` (the `axes.ts` union
   set) are the ONE thing that legitimately wants a cross-family import location — a consumer authoring a
   design-system wrapper imports the axis vocabulary once. Publish them on the root barrel AND on a thin
   `@mkbabb/glass-ui/axes` subpath (types-only, zero runtime — the honest successor to `/api`'s discovery
   role, scoped to the 4 grammar unions instead of 203 grab-bag symbols).

3. **Kill the naming asymmetry.** Post-reshape the subpath set should be pure `kebab-family` names with NO
   exceptions: `/dark`, `/keyboard`, `/carousel` (the vueuse-bearing flat barrels) sit beside `/dock`,
   `/aurora` — same tier, same shape. The `src/entries/` relocation (B2.3) makes this true on disk; the
   IDEAL is that a consumer cannot tell from the import path whether a subpath was "curated flat" or
   "mirror-generated" — they're all just `@mkbabb/glass-ui/<family>`.

4. **The ONE regen source of truth.** BH's `regen-exports.mjs` (B2.1-mech) generates the entry map from
   the real colocated barrels. The IDEAL is that `package.json` exports, the vite entry map, AND the
   grammar-type re-exports are ALL emitted from that ONE generator — so adding a family is a directory,
   never a hand-edit in three files (the current 3-plane duplication BH §1 names). The grammar unification
   should register its `axes.ts` in that generator so `/axes` is generated, not hand-listed.

---

## Fold candidates (for the BG/BH plan — sequenced against BH B2 without collision)

### FC-1 (new-wave) — `BH.W-AXIS-GRAMMAR` — mint the ONE axis vocabulary in `_shared/axes.ts`
- **kind:** new-wave (BH band, rides B2's export reshape).
- **gestalt approach:** Mint `src/components/ui/_shared/axes.ts` exporting `Size` (`xs|sm|md|lg`),
  `Orientation` (`horizontal|vertical`), `Motion` (`full|reduced|off`), re-exporting `Surface` from
  `useSurfaceAxis` so ALL four grammar types have one import. Rung names EQUAL the `--control-h-*` token
  cohort (the props already resolve those tokens — the transposition is making the prop word equal the
  token word, not inventing a register). Publish on the root barrel + a types-only `/axes` subpath (the
  honest `/api` discovery successor). This is the foundation the migration waves import; it lands FIRST,
  concurrent-safe (pure new file, no consumer break until FC-2/3 adopt).
- **sequence:** before B2.1-swap (so `/axes` is in the regen'd entry set); after B2.1-mech (needs the
  generator). No collision with B2's write-set (new file).

### FC-2 (new-wave) — `BH.W-SIZE-UNIFY` — clean-break the size/density collision onto `Size`
- **kind:** new-wave (clean break, no aliases — the no-legacy law).
- **gestalt approach:** Rename every `size` middle rung `default`→`md` (Button `index.ts:201`,
  `ControlSize`→`Size` in `useControlSize.ts`); fold dock `density`→`size` (`comfortable`→`md`,
  `spacious`→`lg`, `compact`→`sm`, `audacious`→`xl`) and configurator `density`→`size` (drop `mobile` —
  it is a responsive `@media(pointer:coarse)` token state, never a chosen rung). Split the two axis
  conflations off `size`: Button `icon`/`icon-sm`→an orthogonal `iconOnly` boolean; chip `cell`→a `shape`
  flag. `ConfiguratorDensity`/`DockDensity` types DELETED (clean break). This is the D4-1/D4-2 headline
  fix — one word for the compactness axis, library-wide.
- **π/bar:** a new `proof:size-grammar` — asserts NO component exports a `density` prop, NO `size` union
  contains `default`/`comfortable`/`md`-synonyms, every `size` rung ∈ `Size`; born-RED on HEAD (6
  divergent unions), GREEN post-fix. The migration-map arm (BH B2.2's 203-row precedent) records the
  key-renames for the by-name consumer asks.
- **sequence:** after FC-1; coordinate the Dock density rename with any BG dock-token wave (same
  `--dock-scale` neighborhood) to avoid a double-touch.

### FC-3 (new-wave) — `BH.W-MOTION-AXIS` — collapse the seven-boolean motion scatter onto `Motion`
- **kind:** new-wave (clean break).
- **gestalt approach:** Replace `draggable`/`pressable`/`spring`/`liquidDrag` with the single `motion`
  axis (`full` default per liquid-weight-universal). An interactive Card/Tab/Slider animates by default;
  a static plate is a non-interactive Card, not `pressable=false`. Keep the genuinely-distinct gesture
  CONTRACTS as their own props (`keepDockOpen`, `dragDismiss`, `responsive`). `prefers-reduced-motion`
  still forces `full`→`reduced` at the CSS layer; the prop is the consumer's manual override. This is the
  D4-4 fix and it directly serves the "liquid-weight on ALL motion" directive by making physics the
  default instead of an opt-in matrix.
- **π/bar:** `proof:motion-axis` — no component exposes `draggable`/`pressable`/`spring`/`liquidDrag`; the
  `motion` axis resolves the same physics the booleans did. Design-arm: a Fable/DesignSync review of the
  press/drag gestalt across Card/Tab/Slider/Dialog (this is a VISUAL wave per the standing directive —
  name its Fable design arm).
- **sequence:** after FC-1; independent of FC-2 (different props), can run concurrent.

### FC-4 (plan-doc-edit) — fix the `Surface` "three-rung"→"four-rung" doc drift
- **kind:** plan-doc-edit (fold into FC-1's touch of `useSurfaceAxis.ts` + the CLAUDE.md §Shared
  surface-decoration axis text).
- **gestalt approach:** Update `useSurfaceAxis.ts:~15` and the CLAUDE.md canon from `glass|veil|opaque`
  (three) to `glass|veil|opaque|clear` (four, `clear` landed BE.W-CLEAR-VARIANT). Trivial, zero behavior;
  it is a "missing obvious issue" (D4-5) and costs one edit riding FC-1.

### FC-5 (amend-wave) — extend BH B2.2's `/api` fold to publish the grammar types on `/axes`
- **kind:** amend-wave (amends BH B2.2 — the `/api` fold + regen).
- **gestalt approach:** BH B2.2 already re-homes 203 types onto owning subpaths (types co-located,
  strictly better than the `/api` aggregator — D4 import-story §1). AMEND it to ALSO register the FC-1
  `axes.ts` as a generated `/axes` types-only subpath in `regen-exports.mjs`, so the 4 grammar unions have
  the ONE cross-family discovery home `/api` used to fake for 203 symbols. This makes the discovery
  surface HONEST (4 axis types you'd want centrally, not 203 grab-bag) rather than merely dropping `/api`.
- **sequence:** rides B2.2 (WS12); depends on FC-1 having minted `axes.ts`.

### FC-6 (defer-honest) — the a11y-role-derivation canon
- **kind:** defer-honest (record, do not build a wave).
- **gestalt approach:** The role-per-variant discipline (SegmentedTabs, ToggleGroup, StatusDot) is
  already correct and gated per-component. The only owed artifact is a one-line design-idiom canon: "a11y
  role is DERIVED from variant/type, never a separate `role` prop." No mechanism, no new gate — fold the
  sentence into the FC-1 grammar-canon doc. Honest defer: there is nothing to BUILD, only to record, so it
  does not warrant its own wave.

---

## What NOT to touch (elegance-preserving fences)

- `useSurfaceAxis.ts` — the model; keep verbatim (D4-6). `cartoon` on `CardSurface` is correct locality.
- The `--control-h-*` / `--dock-scale` token cohorts — the grammar RESOLVES them; do not re-mint a size
  register (`useControlSize.ts`'s "prop selects a rung, token holds the magnitude" discipline is exactly
  right and is the whole reason the migration is small).
- The genuinely component-specific gesture contracts (`keepDockOpen`, `dragDismiss`, `responsive`) — these
  are contracts, not axes; folding them into `Motion` would be over-unification (the inverse smell).
