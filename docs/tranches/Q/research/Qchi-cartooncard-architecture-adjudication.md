# Qχ — `<CartoonCard>` vs Card-variant architecture adjudication

Q audit-augmentation round-5. Charter: the user, having watched Qπ retire `<ScrollPane>`,
asks "CartoonCard should likely just be a variant, too, no?". Qπ's round-4 write-up
asserted in passing that the `e017d53` lift "was correct for `CartoonCard` (genuinely
off-ladder tokens)" — but that is a CLAIM, never adjudicated. This document adjudicates
`<CartoonCard>` from first principles, exactly as Qπ adjudicated ScrollPane. Qπ's aside
is not inherited as a verdict; the user's lean is not assumed correct either.

**Verdict up front: DEMOTE-TO-VARIANT.** `<CartoonCard>` is a 36-line styling-only
wrapper that owns no behaviour, resolves through a `.glass-cartoon` recipe whose
"own surface tokens" are *never defined* (they fall through to the quiet-tier glass
tokens at every call site), and is field-for-field expressible as a Card configuration.
It clears none of the bars that would have saved ScrollPane. The genuine cartoon
register — the 2px border, the offset-stamp shadow, the hover-lift — is an **orthogonal
surface axis**, not a glass-ladder rung, so it folds into Card as a new orthogonal
prop (`surface="cartoon"`), not as a `tier` value. `<CartoonCard>` retires.

---

## Section 1 — CartoonCard substance inventory

`src/components/ui/cartoon-card/CartoonCard.vue` is **36 lines total**. (Charter
pointer said `src/components/custom/cartoon-card/` — that directory does not exist;
CartoonCard lives under `ui/`, the shadcn-vue base tier, alongside `card/`.) Substance
breakdown:

| Segment | Lines | Content |
|---|---|---|
| Import block | 4 (L1–4) | `HTMLAttributes`, reka-ui `Primitive` + `PrimitiveProps`, `cn`. |
| Doc-comment | 9 (L6–14) | JSDoc describing the surface intent. |
| `<script setup>` body | 3 (L15–19) | `interface Props extends PrimitiveProps` with **one own field** (`class?`); a bare `defineProps` — note **no `withDefaults`**. |
| `<template>` | 14 (L22–35) | A single `<Primitive>` with one `cn()` class-merge, an inline `as ?? 'div'` fallback, and a default `<slot/>`. |
| `<style>` | 0 | No scoped style block. |

Surface contract:

- **Props**: `class?` (own) plus inherited `as` / `asChild` from `PrimitiveProps`.
  **Zero behaviourally meaningful own props.** ScrollPane at least had `shadow?`.
  CartoonCard has *less* surface than ScrollPane — and ScrollPane was demoted.
- **Slots**: one default slot. No named slots.
- **Emits**: none.
- **Refs / lifecycle / watchers / observers**: none. No `onMounted`, no `ref`, no
  event listener, no `watch`, no provide/inject.

Class string emitted (static, unconditional):

```
glass-cartoon rounded-card text-card-foreground scrollbar-hidden transition-shadow
```

That string never branches. There is not a single conditional class — CartoonCard
has no prop to branch on. The component is a constant function: `(slot) => <div
class="<constant>">{slot}</div>`, polymorphic via `as`.

**Behaviour-owned vs styling-only verdict: 100% styling-only.** It is a Tier-1
"simple wrapper" in CLAUDE.md's taxonomy, and the thinnest one in the library — Card
(the canonical Tier-1) has three own props and a `withDefaults`; ScrollPane (demoted)
had one own prop; CartoonCard has zero. The four-state contract (standard / hover /
active / disabled) that CLAUDE.md's J-invariant requires of a *component* is not
owned by the SFC at all — the hover-lift is declared in `.glass-cartoon:hover` in
CSS, exactly where a *static pattern* belongs.

---

## Section 2 — The off-ladder claim — test it

Qπ's aside: cartoon owns "genuinely off-ladder tokens" — a distinct surface system,
not a rung of wash→quiet→resting→floating→overlay. Two halves to test: (a) is cartoon
*off* the ladder? (b) does cartoon own *its own tokens*?

### 2a. The `.glass-cartoon` recipe — what it actually consumes

From `glass.css` L105–121 (HEAD; W3 Lane B will relocate this block to `cards.css`
but not change its content):

```css
.glass-cartoon {
    background:       var(--glass-bg-cartoon,     var(--glass-bg-quiet));
    backdrop-filter:  var(--glass-blur-cartoon,   var(--glass-blur-quiet));
    border: 2px solid var(--glass-border-cartoon, var(--glass-border-quiet));
    border-radius:    var(--radius-card);
    box-shadow:       var(--shadow-cartoon-md);
    contain: layout style;
    transition: transform <dur> <ease>, box-shadow <dur> <ease>;
}
.glass-cartoon:hover:not(:disabled) {
    transform: translate(var(--lift-sm), var(--lift-sm));
    box-shadow: var(--shadow-cartoon-lg);
}
```

### 2b. The "own surface tokens" claim is FALSE

CartoonCard's own doc-comment (L9–11) says `.glass-cartoon` "owns its own surface
tokens (`--glass-{bg,blur,border}-cartoon` with fall-through to default-tier)". A
grep across all of `src/` for `--glass-bg-cartoon`, `--glass-blur-cartoon`,
`--glass-border-cartoon` returns **only the three consumption sites in `glass.css`
above — zero definition sites.** `tokens.css` defines `--glass-bg-{wash,quiet,
resting,floating,overlay}` and the cartoon *shadow* family, but **never** a cartoon
bg / blur / border token.

Consequence: at every call site, in light and dark, today and at every prior commit,
`.glass-cartoon` resolves its background, blur, and border-*color* to **the exact
quiet-tier glass tokens** (`--glass-bg-quiet`, `--glass-blur-quiet`,
`--glass-border-quiet`). The `var(--glass-bg-cartoon, …)` fallback is dead code — the
first argument never resolves. "Owns its own surface tokens" describes an
*aspiration* the codebase never implemented. The cartoon surface is, on three of its
four surface axes (bg / blur / border-color), **literally `tier="quiet"`**.

### 2c. What cartoon genuinely owns

Stripping the dead fall-through, cartoon's *real* delta over `Card tier="quiet"` is
exactly three things, all genuinely distinct from the glass ladder:

| Property | `Card tier="quiet"` | `.glass-cartoon` | Genuinely distinct? |
|---|---|---|---|
| background | `--glass-bg-quiet` | `--glass-bg-quiet` (fall-through) | No — identical |
| backdrop-filter | `--glass-blur-quiet` | `--glass-blur-quiet` (fall-through) | No — identical |
| border-color | `--glass-border-quiet` | `--glass-border-quiet` (fall-through) | No — identical |
| **border-width** | `1px` | **`2px`** | **Yes** |
| **box-shadow** | `--shadow-card` (= `--shadow-md`, soft drop) | **`--shadow-cartoon-md`** (offset stamp) | **Yes** |
| **hover transform** | none (Card has no hover) | **`translate(--lift-sm,--lift-sm)`** | **Yes** |
| hover shadow | none | `--shadow-cartoon-lg` | Yes (pairs with above) |
| radius | `--radius-card` | `--radius-card` | No — identical |
| grain `::after` | painted (`.glass-quiet::after`) | **not painted** (`.glass-cartoon` has no `::after`) | Yes — minor |

So the off-ladder claim is **half true, in a way that changes the verdict**:

- **TRUE** that cartoon is *not a rung of the opacity-monotonic glass ladder.* The
  2px border + offset-stamp shadow + hover-lift is a "Memphis sticker" register that
  cannot be named as a wash↔overlay tier without making the ladder non-monotonic.
  Promoting it to a 6th `tier` value (`tier="cartoon"`) is wrong for exactly the
  reason Qξ rejected the same move for `pane` (Path C — "breaks the ladder's
  monotonic-opacity meaning").
- **FALSE** that cartoon is a *distinct token system*. It owns **no surface tokens**.
  Its bg/blur/border-color *are* the quiet rung. What it owns is a **2px border
  weight, an offset-stamp shadow, and a hover-lift** — three properties that are
  *orthogonal* to the tier axis (any tier could in principle carry them) and that
  Card *already* models orthogonally for two of the three: `shadow` is already a
  Card prop, and `grain` is already a Card prop.

The accurate framing: cartoon is **not a different surface system**, it is **the
quiet glass rung plus an orthogonal "cartoon" decoration** (heavier border + stamp
shadow + lift). That is precisely the shape Card's `tier` / `shadow` / `grain`
decomposition was built to absorb. Qπ's aside conflated "off the *ladder*" (true)
with "off Card's *API*" (false). Card's API is wider than the ladder.

---

## Section 3 — The Card-config comparand — three fold-in shapes

Card exposes `tier` / `shadow` / `grain`, has **no CVA** (template interpolation
`glass-${tier}`), and emits `scrollbar-hidden` unconditionally. Three ways cartoon
folds in:

### Shape A — a `tier` rung (`tier="cartoon"`)

Add `"cartoon"` to `CardTier`; ship `.glass-cartoon` as a 6th ladder class.

**Reject.** Section 2 establishes cartoon is off the *ladder* — the wash→overlay
scale is opacity/blur-monotonic, and "cartoon" is not a heavier or lighter rung, it
is the quiet rung with a non-tier decoration bolted on. A `tier="cartoon"` value
would also have to silently *force* `shadow` to the stamp shadow and *suppress*
`grain`, overriding two sibling props — recreating exactly the precedence ambiguity
the `3a43a8f` redesign retired. This is Qξ's Path C, rejected there, rejected here.

### Shape B — a new orthogonal prop (`surface="cartoon"`) — RECOMMENDED

Card gains one orthogonal prop, independent of `tier`/`shadow`/`grain`:

```ts
/** Surface decoration register. `glass` (default) = the tier's glass rung.
 *  `cartoon` = Memphis sticker register: 2px border + offset-stamp shadow + hover-lift. */
surface?: "glass" | "cartoon";
```

This is correct because cartoon **is** orthogonal: it is the quiet glass surface
(Section 2b) carrying an extra decoration. The decoration composes onto the chosen
tier rather than replacing it. Cost: one prop, one `withDefaults` entry, one
conditional class (`surface === 'cartoon' && 'cartoon-decoration'`), zero CVA — Card
has no variant table to extend. The `.glass-cartoon` block is renamed to a
decoration-only `@utility cartoon-surface` (or kept as a class) carrying *only* the
three real deltas — 2px border, stamp shadow, hover-lift — and is layered on top of
the tier class. When `surface="cartoon"`, Card emits `glass-quiet cartoon-decoration`
instead of inventing a parallel surface.

Note `I.W3` already shipped an `@utility cartoon-surface` in `utilities.css` for the
Button/Select/Input/NumberField cartoon CVAs (`docs/tranches/I/audit/W3-cartoon-hoist.md`).
A second, divergent cartoon recipe (`.glass-cartoon` in `glass.css`) is itself a
substrate-cohesion smell — two cartoon recipes for one register. Shape B can
*converge* on the existing `cartoon-surface` utility, closing that drift.

### Shape C — stay a component

Valid only if cartoon owns behaviour or structure a prop cannot express. Section 1
establishes it owns **neither** — zero own props, zero behaviour, zero structure
beyond a `<div>` + slot. There is nothing for componenthood to defend.

### Cost table

| Shape | Card-side cost | CartoonCard-side | Net |
|---|---|---|---|
| A — `tier` rung | +1 enum value, forced shadow/grain override logic | −36 LOC | rejected (corrupts ladder) |
| **B — `surface` prop** | **+1 prop, +1 `withDefaults`, +1 conditional class, 0 CVA** | **−36 LOC + −1 dir + −1 barrel line + −1 subpath** | **net negative LOC; API stays orthogonal** |
| C — stay component | 0 | 0 | rejected (nothing to defend) |

Shape B costs Card roughly **4 lines** (prop decl, default, conditional class entry,
doc-comment) and deletes the entire `cartoon-card/` package. The cartoon *recipe*
CSS does not vanish — it relocates to a decoration utility — but the *component*
shell, its index barrel, its `ui/index.ts` line, its `src/index.ts` re-export, and
its public-API footprint all retire. This is strictly less surface than the status quo.

---

## Section 4 — The ScrollPane contrast — does CartoonCard clear the bar?

Qπ demoted ScrollPane on five findings. CartoonCard scored against the same five:

| Qπ's ScrollPane finding | ScrollPane | CartoonCard |
|---|---|---|
| 1. Owns no behaviour (no state/observer/ARIA/four-state) | true | **true** — *more* so: ScrollPane had a `shadow` prop, CartoonCard has zero own props |
| 2. Field-for-field expressible as a Card config | true (`tier="wash" :grain="false"`) | **true** — `tier="quiet"` + the cartoon decoration; the bg/blur/border are *literally* quiet (Section 2b) |
| 3. Fails L invariant 8 (< 2 consumers at HEAD) | true (1 — its own demo) | **true** (1 — its own demo; Section 5) |
| 4. Mis-named / a11y regression | true (promised scroll-region) | partially — "CartoonCard" is honestly named; no a11y regression. This is the *only* axis where CartoonCard scores better |
| 5. Lifted by association, not on own merit | true | **true** — Section 2b shows the `e017d53` "owns its own tokens" rationale was never implemented; cartoon was lifted on a token system that does not exist |

Charter's crux test: CartoonCard differs from ScrollPane and earns componenthood
**IF** (a) it owns behaviour, **OR** (b) cartoon is so genuinely off-ladder that
folding it into Card would *bloat Card's prop surface with a non-orthogonal special
case*.

- **(a) — fails.** Section 1: zero behaviour, zero own props, zero four-state
  contract in the SFC. Less behaviour than ScrollPane.
- **(b) — fails.** This is the subtle one and the heart of the charter. Cartoon *is*
  off the *ladder* — but folding it in as **Shape B (`surface` prop)** does **not**
  corrupt Card's API, because cartoon **is** orthogonal: it is a decoration that
  composes onto a tier, exactly like `shadow` and `grain` already do. A
  non-orthogonal special case would be Shape A (`tier="cartoon"` forcing other
  props) — and Shape A is rejected. The orthogonal fold-in (Shape B) is *clean*. The
  charter's escape hatch — "a component that exists because folding it in would
  corrupt the host's API is legitimately a component" — does not apply, because the
  correct fold-in (orthogonal prop) does not corrupt anything. CartoonCard is the
  charter's other case: "a component that exists only because nobody folded it in."

The `3a43a8f`/`e017d53` lift bundled `pane` and `cartoon` together on a shared
rationale ("orthogonal to the glass ladder → own primitives"). Qπ found that
rationale was *false for pane* (pane = `wash`, a ladder rung). This adjudication
finds it is *half-false for cartoon*: cartoon **is** off the ladder, but "off the
ladder" was never sufficient grounds for a *component* — `shadow` and `grain` are
also off the ladder and they are *props*. The lift's real error, for both siblings,
was treating "not a tier" as "must be a component", skipping the orthogonal-prop
middle option Card's own architecture already demonstrates.

**CartoonCard clears no bar ScrollPane failed.** It is marginally better named. That
is not componenthood.

---

## Section 5 — Consumer count at HEAD

`<CartoonCard>` consumers across `src/` and `demo/` at HEAD:

```
$ grep -rln 'CartoonCard' src/ demo/ --include='*.vue' --include='*.ts'
src/components/ui/cartoon-card/CartoonCard.vue   ← the SFC itself
src/components/ui/cartoon-card/index.ts          ← its barrel
src/components/ui/index.ts                       ← ui/ barrel re-export
src/index.ts                                     ← root barrel re-export
demo/stories/primitives/cartoon-card.vue         ← its own demo story
demo/stories/manifest.ts                         ← its story manifest entry
```

**Rendering consumers: exactly one — `demo/stories/primitives/cartoon-card.vue`,
its own demo story.** The other five hits are the package's own files and barrel
plumbing. Zero composition consumers, zero library-internal consumers, zero
speedtest/value.js consumers.

Fleet side (coordinate with Qψ): the bbnf-buddy consumer has **zero** `<CartoonCard>`
sites today — `AnimationWorkspace.vue:157` is a *prospective* Q.W2 migration target
that currently passes the dead `<Card :variant="… ? 'default' : 'cartoon'">` (the
`variant` attr falls through inert; the card renders default `tier:resting`). value.js
carries no `<CartoonCard>` either. So fleet-wide rendering consumers at HEAD: **1**
(the glass-ui demo story).

CartoonCard **fails L invariant 8** (the substrate-without-consumer-binary rule:
≥ 2 consumers or formal retirement) at HEAD — identically to ScrollPane. One
self-demo is not a consumer binary.

---

## Section 6 — VERDICT

**DEMOTE-TO-VARIANT.** Zero hedging.

`<CartoonCard>` is a 36-line styling-only wrapper that:

1. owns **no behaviour and zero own props** — thinner than ScrollPane, which was demoted;
2. resolves through `.glass-cartoon`, whose advertised "own surface tokens"
   (`--glass-{bg,blur,border}-cartoon`) are **never defined anywhere in `src/`** — the
   surface is the quiet glass rung on all three of bg/blur/border (Section 2b). The
   `e017d53` "owns its own tokens" rationale describes code that does not exist;
3. has a genuine delta over `tier="quiet"` of exactly **three orthogonal decorations**
   — 2px border, offset-stamp shadow, hover-lift — and Card *already* models
   orthogonal surface axes (`shadow`, `grain`) as props;
4. fails L invariant 8 — **one rendering consumer** at HEAD (its own demo story);
5. clears **none** of the five bars ScrollPane failed; it is only marginally
   better-named.

Cartoon is off the *ladder* (true) but not off Card's *API* (false) — it folds in
cleanly as a new **orthogonal prop**, `surface="glass" | "cartoon"`, not as a `tier`
value. The "Component over CSS class" J-invariant cuts decisively against it: a
static surface decoration with no four-state contract is a configuration, not a
component. Qπ's round-4 aside ("the lift was correct for CartoonCard") is **overturned**
— it was correct that cartoon is off the ladder, wrong that off-the-ladder implies
componenthood.

### Downstream consequence for Q.W2 + W3

**Q.W2 — `AnimationWorkspace.vue:157`.** The current migration plan (Q.md row
Q-cos-10; W2.md L43) redirects the `'default' | 'cartoon'` switch to a `v-if`-binary
of `<CartoonCard>` / `<Card>`. **This plan changes.** Once Shape B lands, the
migration target is a single `<Card>` with a bound `surface` prop — no `v-if` split,
no `<CartoonCard>` import:

```vue
<Card :surface="props.inline ? 'glass' : 'cartoon'"
      :tier="props.inline ? 'wash' : 'quiet'"
      :shadow="!props.inline">
```

This is *simpler* than the planned binary split — one element, props bound to the
same `inline` flag the component already has. W2's hard gate (b) updates accordingly:
"1 `default|cartoon` site → `<Card surface=…>`" replaces "→ `<CartoonCard>`/`<Card>`".

If Q.W2 must ship *before* the Card `surface` prop exists, the W2 migration uses the
interim `<Card>` recipe and a follow-up tightens it — but the cleaner sequencing is to
land Shape B as a **W3 lane** (next to the already-planned W3 Lane B cartoon-CSS
relocation and W3 Lane H ScrollPane retirement) and have W2 consume it.

**Q.W3 — Lane B and a new lane.** W3 Lane B already plans to relocate `.glass-cartoon`
from `glass.css` → `cards.css`. That lane should be **superseded**: instead of
relocating a component-backing recipe, W3 should (i) add Card's `surface` prop
(Shape B), (ii) converge the cartoon decoration onto the existing
`@utility cartoon-surface` from `I.W3` (or a sibling decoration utility) — closing
the two-cartoon-recipes drift — and (iii) **retire the `cartoon-card/` package** in
the same wave as Lane H retires `scroll-pane/`. Cartoon and ScrollPane were lifted
together at `e017d53`; they retire together at Q.W3. This is the gestalt redesign the
user's memory (`feedback_architectural_approach`) calls for — not a relocation patch.

---

## Section 7 — DEMOTE execution: exact Card API + retirement plan

### 7a. Card API change (Shape B)

`src/components/ui/card/Card.vue` — add one prop:

```ts
export type CardSurface = "glass" | "cartoon";

interface Props extends PrimitiveProps {
    tier?: CardTier;
    /** Surface decoration register. `glass` (default) renders the tier's glass rung.
     *  `cartoon` overlays the Memphis sticker decoration: 2px border, offset-stamp
     *  shadow (`--shadow-cartoon-md` → `-lg` on hover), hover-lift. Composes onto
     *  any `tier`; the legacy `<CartoonCard>` was `tier="quiet" surface="cartoon"`. */
    surface?: CardSurface;
    shadow?: boolean;
    grain?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    tier: "resting",
    surface: "glass",
    shadow: true,
    grain: true,
    as: "div",
});
```

Template class-merge gains one conditional and one suppression (cartoon brings its
own stamp shadow + 2px border, so the default `--shadow-card` drop and the 1px tier
border are overridden by the decoration utility):

```ts
cn(
    'rounded-card text-card-foreground scrollbar-hidden',
    `glass-${tier}`,
    surface === 'cartoon' && 'cartoon-surface',          // decoration utility
    shadow && surface === 'glass' && 'shadow-[var(--shadow-card)]',
    !grain && '[&::after]:hidden',
    props.class,
)
```

`:data-surface="surface"` joins `:data-tier` / `:data-grain` on the root for
consumer/test targeting. Export `CardSurface` from `card/index.ts` next to `CardTier`.

### 7b. The cartoon decoration utility

Do **not** keep `.glass-cartoon` as a parallel surface class — that is the dead-token
recipe Section 2b exposed. Instead, the cartoon decoration is a **decoration-only**
utility carrying *only* the three real deltas, layered over whatever `glass-${tier}`
Card already emitted:

```css
/* cards.css (W3 Lane B's relocation target) — cartoon decoration, composes onto a tier */
@layer components {
    .cartoon-surface {
        border-width: 2px;
        box-shadow: var(--shadow-cartoon-md);
        transition:
            transform var(--duration-normal) var(--ease-apple-spring),
            box-shadow var(--duration-normal) var(--ease-apple);
    }
    .cartoon-surface:hover:not(:disabled) {
        transform: translate(var(--lift-sm), var(--lift-sm));
        box-shadow: var(--shadow-cartoon-lg);
    }
}
```

It does **not** redeclare `background` / `backdrop-filter` / `border-color` /
`border-radius` — those come from the `glass-${tier}` class Card already applies
(the dead `var(--glass-bg-cartoon, …)` fall-throughs are dropped, not ported).
Border-*color* stays the tier's. If a future consumer wants a distinct cartoon
border tone they override `border-color` via `class` or a token — but no consumer
demands it today (overfitting-audit invariant), so it is not added.

Converge with the `I.W3` `@utility cartoon-surface` already in `utilities.css`: that
one is tuned for Button/Select/Input chrome (cream-warm bg + border + shadow for
pill/field shapes). The Card decoration is shape-distinct enough (no bg override,
composes onto glass tiers) that it may stay a separate `.cartoon-surface` *or* the
two can be reconciled into a parameterised recipe — that reconciliation is a W3 sub-task,
flagged here, decided in the W3 lane. The non-negotiable: **one cartoon recipe per
distinct shape, zero dead fall-through tokens.**

### 7c. `<CartoonCard>` retirement steps

1. Delete `src/components/ui/cartoon-card/` (`CartoonCard.vue` + `index.ts`).
2. Remove `export * from "./cartoon-card";` — `src/components/ui/index.ts:7`.
3. Remove `export * from "./components/ui/cartoon-card";` — `src/index.ts:90`.
4. Relocate the cartoon recipe per 7b — into `cards.css` as the `.cartoon-surface`
   decoration; delete the `.glass-cartoon` block from `glass.css` L101–121 (this
   *is* W3 Lane B, re-scoped from "relocate component recipe" to "convert component
   recipe into Card-decoration utility").
5. Rewrite `demo/stories/primitives/cartoon-card.vue` to demonstrate
   `<Card surface="cartoon">`, or fold it into `demo/stories/primitives/card.vue`
   as a "cartoon surface" section and drop the standalone story + its
   `manifest.ts:104` entry.
6. CLAUDE.md edits: strike the `cartoon-card/` line from the `ui/` tree listing;
   correct the package count ("43 shadcn-vue base component packages … 44 dirs" →
   42 / 43, jointly with the ScrollPane retirement which also decrements it); amend
   the `cards.css` / `glass.css` descriptions; update the `tokens.css` L353–356
   comment that points consumers at `<CartoonCard>`.
7. **No migration alias.** `<CartoonCard>` has zero external rendering consumers
   (Section 5); a hard break costs nothing. Per user memory `feedback_no_backwards_compat`
   — clean break, no deprecation shim. The `Slider` `glass-cartoon` *variant* and the
   `data-variant="glass-cartoon"` Slider CSS are a **separate** artefact (Slider-local
   cartoon styling, not the CartoonCard component) and are untouched by this retirement.
8. The `Card.test.ts` suite gains `surface` coverage; if a `CartoonCard` smoke test
   exists it migrates to a `<Card surface="cartoon">` assertion.

### 7d. Migration recipe (for consumers + the bbnf-buddy fold-in)

```vue
<!-- before -->
<CartoonCard class="p-6">…</CartoonCard>

<!-- after — cartoon is tier="quiet" + the cartoon decoration (Section 2b proved
     CartoonCard's bg/blur/border were always the quiet rung) -->
<Card tier="quiet" surface="cartoon" class="p-6">…</Card>

<!-- bbnf-buddy AnimationWorkspace.vue:157 — the dynamic switch collapses to one element -->
<Card :tier="props.inline ? 'wash' : 'quiet'"
      :surface="props.inline ? 'glass' : 'cartoon'"
      :shadow="!props.inline"
      class="…">
```

`<Card tier="quiet">` is the faithful tier for legacy CartoonCard (its surface was
the quiet rung — Section 2b). `surface="cartoon"` reattaches the 2px border + stamp
shadow + hover-lift. The polymorphic `as` prop carries over unchanged (Card extends
the same `PrimitiveProps`). Grain: legacy `.glass-cartoon` painted no `::after`;
`<Card surface="cartoon">` will paint the tier's grain unless `:grain="false"` is
passed — recommend `:grain="false"` in the migration recipe to match legacy exactly,
or accept the (minor, arguably-improvement) grain. Flag for the W3 lane: either the
`cartoon-surface` utility suppresses `::after`, or the recipe carries `:grain="false"`.

---

## Summary

- File: `/Users/mkbabb/Programming/glass-ui/docs/tranches/Q/research/Qchi-cartooncard-architecture-adjudication.md`
- CartoonCard: **36 LOC, zero own props, zero behaviour** — styling-only; thinner
  than the demoted ScrollPane.
- Off-ladder claim: **half true** — cartoon is off the *opacity-monotonic ladder*
  (true) but its advertised "own surface tokens" `--glass-{bg,blur,border}-cartoon`
  are **never defined** — it falls through to the quiet glass rung on every axis
  (FALSE). Real delta = 3 orthogonal decorations (2px border, stamp shadow, hover-lift).
- Consumer count at HEAD: **1** (its own demo story) — fails L invariant 8.
- VERDICT: **DEMOTE-TO-VARIANT.** Fold into Card as a new **orthogonal prop**
  `surface="glass" | "cartoon"` (Shape B) — NOT a `tier` rung. Retire the
  `cartoon-card/` package; convert `.glass-cartoon` into a decoration-only
  `.cartoon-surface` utility. Qπ's "lift was correct for CartoonCard" aside is
  overturned.
- W2/W3 consequence: **Q.W2** `AnimationWorkspace.vue:157` retargets from a
  `<CartoonCard>`/`<Card>` `v-if`-binary to a single `<Card :surface=…>` with the
  prop bound to `inline`. **Q.W3 Lane B** is re-scoped from "relocate `.glass-cartoon`"
  to "add Card `surface` prop + convert the recipe to a decoration utility + retire
  `cartoon-card/`" — cartoon retires in the same wave as ScrollPane (Lane H), as the
  two were lifted together at `e017d53`.
