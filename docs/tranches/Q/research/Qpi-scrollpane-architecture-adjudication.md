# Qπ — `<ScrollPane>` vs Card-variant architecture adjudication

Q audit-augmentation round-4. Charter: the user wants the speedtest items migrated
to a scroll-pane surface, but is skeptical that a 3-property surface earns a whole
standalone component rather than a Card configuration. Genuinely open adjudication.

**Verdict up front: DEMOTE-TO-VARIANT.** `<ScrollPane>` is a styling-only wrapper
that owns no behaviour and is already 100% expressible as `<Card>` props. It has
zero load-bearing consumers. The Q.W2 migration target re-pivots to a Card
configuration; `<ScrollPane>` retires.

---

## Section 1 — ScrollPane substance inventory

`src/components/ui/scroll-pane/ScrollPane.vue` is **43 lines total**, of which the
licence/doc comment is 8 lines. Substance breakdown:

| Segment | Lines | Content |
|---|---|---|
| `<script setup>` | 11 (L14–24) | `interface Props extends PrimitiveProps` with two own fields (`shadow`, `class`); one `withDefaults`. |
| `<template>` | 16 (L27–42) | A single `<Primitive>` with one `cn()` class-merge and a default `<slot/>`. |
| `<style>` | 0 | No scoped style block. |

Surface contract:

- **Props**: `shadow?: boolean` (own), `class?` (own), plus inherited `as` / `asChild`
  from `PrimitiveProps`. So **one** behaviourally meaningful own prop: `shadow`.
- **Slots**: one default slot. No named slots.
- **Emits**: none.
- **Refs / lifecycle / watchers**: none. No `onMounted`, no observer, no event
  listener, no `ref`.

Class string emitted:

```
glass-wash rounded-panel text-card-foreground scrollbar-hidden overflow-auto
[&::after]:hidden transition-shadow  (+ shadow ? shadow-[var(--shadow-card)])
```

**Behaviour-owned vs styling-only verdict: 100% styling-only.** Every line of the
SFC is either a prop declaration or a static class. There is no scroll handling, no
overflow measurement, no resize observer, no scroll-position state, no keyboard
affordance, no ARIA. `overflow-auto` is a Tailwind utility — the browser owns the
scrolling; ScrollPane contributes a class string, nothing more. It is a Tier-1
"simple wrapper" in CLAUDE.md's taxonomy, and a thin one even by that bar (Card,
the canonical Tier-1, has strictly more surface than it).

---

## Section 2 — Card-variant comparand

Card already exposes the exact axes ScrollPane needs. From `Card.vue`:

```ts
tier?:   "wash" | "quiet" | "resting" | "floating" | "overlay"   // default "resting"
shadow?: boolean                                                  // default true
grain?:  boolean                                                  // default true → !grain emits [&::after]:hidden
class?:  HTMLAttributes["class"]
+ PrimitiveProps (as / asChild)
```

Card's emitted class already includes `scrollbar-hidden` **unconditionally**, on
every tier. So a literal field-by-field diff of ScrollPane against `<Card>`:

| ScrollPane emits | Card equivalent | Delta |
|---|---|---|
| `glass-wash` | `tier="wash"` → `glass-wash` | none — exact |
| `[&::after]:hidden` | `:grain="false"` → `[&::after]:hidden` | none — exact |
| `scrollbar-hidden` | always emitted by Card | none — Card already does this |
| `shadow-[var(--shadow-card)]` | `shadow` prop (default true) | none — exact |
| `text-card-foreground` | `text-card-foreground` | none — exact |
| `transition-shadow` | Card omits it | +1 utility |
| `overflow-auto` | Card omits it | +1 utility |
| `rounded-panel` (xl) | `rounded-card` (2xl) | 1-token radius delta |

The functional surface of `<ScrollPane class="max-h-80 p-4">` is **identically**
`<Card tier="wash" :grain="false" class="max-h-80 p-4 overflow-auto rounded-panel">`.
The only ScrollPane behaviour not already in Card is two static utility classes
(`overflow-auto`, `transition-shadow`) and a non-default radius — and the demo
already requires the consumer to pass `max-h-*` and `p-*` by hand, so the consumer
is already in the class-passing business.

**CVA-delta to express ScrollPane as a first-class Card config: zero CVA.** Card
has no `cva` at all (the commit `3a43a8f` body confirms "No cardVariants cva
existed"). Card resolves `glass-${tier}` by template interpolation. There is no
variant table to extend. The "pane" surface is reachable **today, with no library
change**, via `<Card tier="wash" :grain="false">`. ScrollPane's 43 lines buy two
utility classes and one radius token over a configuration that already ships.

Comparand check — CartoonCard. `cartoon-card/CartoonCard.vue` (37 lines) is also a
styling-only wrapper, but it resolves through `.glass-cartoon`, a utility that owns
its **own surface tokens** (`--glass-{bg,blur,border}-cartoon`), a 2px border, the
`--shadow-cartoon` offset stamp, and a hover-lift transition (`glass.css` L105–123).
Cartoon is explicitly **off** the wash→overlay ladder — Card's `tier` enum cannot
name it without polluting the ladder's semantics. CartoonCard's componenthood
rests on "the type system enforces an off-ladder register". ScrollPane has no such
defence: `wash` **is** a ladder rung, and Card already exposes it.

Comparand check — GlassPanel. `glass-panel/GlassPanel.vue` (117 lines) owns real
behaviour: a `useGlassRenderer` tier negotiation, `createGlassFilter` /
`destroyGlassFilter` lifecycle across `onMounted` / `onBeforeUnmount`, an SVG-filter
branch, a no-backdrop fallback branch, and a scoped `<style>` block. That is a
component that earns its name. ScrollPane sits at the opposite pole.

---

## Section 3 — The scroll-region question

This is the load-bearing test. If ScrollPane were a genuine *scroll-region
primitive* — owning overflow management, scroll state, scroll-into-view, keyboard
scroll affordance, ARIA `role`/`tabindex`, edge-fade masks driven by scroll
position — then the name would justify the component and the only bug would be
positioning. It is not.

What a scroll-region primitive would own, and what ScrollPane actually owns:

| Scroll-region responsibility | ScrollPane |
|---|---|
| Overflow management | a static `overflow-auto` class — browser does it |
| Scroll-position state / events | none — no `ref`, no listener, no emit |
| `scrollIntoView` / programmatic scroll | none |
| Keyboard scroll affordance (`tabindex`, focusable region) | none |
| ARIA `role="region"` / `aria-label` plumbing | none |
| Scroll-edge fade mask reacting to position | none — the demo blurb mentions a "scroll mask" but the SFC emits no mask; `scrollbar-hidden` only hides the native bar |
| Resize/intersection observation | none |

ScrollPane's name promises a scroll *region*; the implementation delivers a
scroll *appearance* — a flat pane with the native scrollbar hidden. The "scroll"
in the name is aspirational, not load-bearing. There is no behavioural core to
preserve, so KEEP-BUT-REFRAME (which presumes such a core) is off the table.

Note the accessibility cost of the status quo: a `scrollbar-hidden` + `overflow-auto`
div with no `tabindex` is a scroll container that **cannot be scrolled by keyboard**
and exposes no scrollbar — a genuine a11y regression that a real scroll-region
primitive would have to fix. ScrollPane ships the regression without the primitive.
If anything, the "scroll pane" framing should be a future *real* component if and
when keyboard/ARIA scroll semantics are actually built; the current artefact must
not occupy that name in the meantime.

---

## Section 4 — Architecture-precedent fit

CLAUDE.md §"Component architecture" defines three tiers: simple wrappers,
primitive wrappers, compound wrappers. And invariant J: **"interactive elements
bundle the four-state contract; static patterns are CSS classes."**

Where does a flat scrollable pane fall? Scrolling is browser-native behaviour on
any `overflow:auto` element — it is not the library's four-state interaction
contract (standard / hover / active / disabled). ScrollPane has no hover state, no
active state, no disabled state, no focus ring. It is **not an interactive element**
in the J sense; it is a static surface. By J, a static surface is a CSS class or a
configuration of an existing surface component — not a new component.

The substrate-without-consumer invariant (L invariant 8, "Visual-load-bearing-ness"):
a primitive ships only with **≥ 2 consumers** or is formally retired with rationale.

**ScrollPane consumer count at HEAD: one — its own demo story** (`demo/stories/
primitives/scroll-pane.vue`). The grep across `src/` and `demo/` for `<ScrollPane`
returns exactly that single file. Zero library consumers, zero composition
consumers, zero speedtest consumers (the speedtest migration the user describes has
not happened — it is the *prospective* W2 work). ScrollPane therefore **fails L
invariant 8 outright today**: it is substrate without a consumer binary.

There is also a direct precedent contradiction in the tranche record. `docs/
tranches/I/audit/W3-substrate-hierarchy.md:53` explicitly **retained**
`<Card variant="pane">` at the I-tranche, with the rationale that pane carries
"distinct shadow + flush-prop contracts" inside Card chrome. Commit `3a43a8f`
(S.W0, R3-spec) then retired Card's whole variant enum and `e017d53` re-emerged
`pane` as the standalone `<ScrollPane>` — but the `e017d53` rationale ("R1-spec
calls out `pane` as orthogonal to the glass ladder") does not survive inspection:
`pane` resolves through `glass-wash`, which **is** a ladder rung. `cartoon` is
genuinely orthogonal (off-ladder tokens); `pane` was bundled into the same lift by
association, not by an independent orthogonality argument. The lift was correct for
CartoonCard and incorrect for ScrollPane.

---

## Section 5 — VERDICT

**DEMOTE-TO-VARIANT.** Zero hedging.

`<ScrollPane>` is a 43-line styling-only wrapper that:

1. owns no behaviour — no scroll state, no observer, no ARIA, no four-state contract;
2. is field-for-field already expressible as `<Card tier="wash" :grain="false">`
   plus two static utility classes the consumer is already passing siblings of;
3. fails L invariant 8 — one consumer (its own demo) at HEAD, zero load-bearing;
4. mis-names itself — "scroll pane" promises a scroll-region primitive it is not,
   and ships a keyboard-scroll a11y regression in the bargain;
5. was lifted by association with the genuinely-orthogonal CartoonCard, not on its
   own merit.

It does not earn componenthood. The "Component over CSS class" invariant cuts
against it: a static surface is a configuration, not a component.

**Downstream consequence for Q.W2.** The migration target re-pivots. The speedtest
result lists do **not** migrate to `<ScrollPane>`. They migrate to:

```vue
<Card tier="wash" :grain="false" class="overflow-auto max-h-80">
  ...
</Card>
```

`<ScrollPane>` retires in the same wave: delete `src/components/ui/scroll-pane/`,
drop its barrel line from `src/components/ui/index.ts` (L28) and the propagated
`export * from "./components/ui/scroll-pane"` in `src/index.ts` (L108), and either
delete or re-point `demo/stories/primitives/scroll-pane.vue`. No deprecation alias
(user memory: clean breaks, no backwards-compat shims) — ScrollPane has no external
consumers, so a hard break costs nothing. CLAUDE.md's `scroll-pane/` line and the
`.glass-wash` description ("glass-wash + scrollbar-hidden + grain disabled") get
struck.

---

## Section 6 — DEMOTE execution: the exact Card API + retirement plan

### 6a. Is a new Card prop needed?

No. The pane surface is reachable **today** with the shipped Card API:
`<Card tier="wash" :grain="false">`. The only ScrollPane extras are `overflow-auto`
and `transition-shadow` (static utilities) and the `rounded-panel` radius — all
consumer-side `class` content, consistent with the demo already requiring
`max-h-*` + `p-*` from the consumer.

Recommendation: ship the pane as a **documented Card recipe**, not a new prop. This
keeps Card's API minimal (it has no CVA; do not add one) and matches the J invariant
— static pattern, expressed by configuration.

Canonical recipe (to land in CLAUDE.md and the demo):

```vue
<!-- Scroll-pane surface: wash tier, grain off (grain ::after conflicts with
     overflow:auto repaint), native scrollbar hidden by Card already. Consumer
     caps height and pads. -->
<Card tier="wash" :grain="false" class="overflow-auto max-h-80 p-4">
  <slot/>
</Card>

<!-- Nested inside a card that already carries a shadow: drop the inner one. -->
<Card tier="wash" :grain="false" :shadow="false" class="overflow-auto max-h-64 p-4">
  ...
</Card>
```

Card already emits `scrollbar-hidden` unconditionally, so no extra class is needed
for that. If a future consumer wants the visible-but-thin bar, `scrollbar-thin`
exists in `utilities.css` and is opt-in via `class`.

### 6b. Optional: if a named handle is wanted

If Q.W2 finds the recipe is repeated ≥ 2 times and wants a named entry point
without a component, the lightweight option is a **CSS utility**, not a component:

```css
/* utilities.css — scroll-pane surface recipe, J-invariant "static pattern" */
@utility scroll-pane-surface {
    overflow: auto;
    transition: box-shadow var(--duration-quick) var(--ease-out);
}
```

paired with `<Card tier="wash" :grain="false" class="scroll-pane-surface ...">`.
But this is only justified at ≥ 2 real consumers (L invariant 8). At one consumer,
the inline recipe is correct and the utility is premature. **Default recommendation:
inline recipe, no utility, no component.**

### 6c. `<ScrollPane>` retirement steps

1. Delete `src/components/ui/scroll-pane/` (`ScrollPane.vue` + `index.ts`).
2. Remove `export * from "./scroll-pane";` — `src/components/ui/index.ts:28`.
3. Remove `export * from "./components/ui/scroll-pane";` — `src/index.ts:108`.
4. Rewrite `demo/stories/primitives/scroll-pane.vue` to demonstrate the Card recipe,
   or fold it into `demo/stories/primitives/card.vue` as a "wash tier / scroll host"
   section and drop the standalone story + its `manifest.ts:103` entry.
5. CLAUDE.md edits: strike the `scroll-pane/` line from the `ui/` tree listing;
   amend the `.glass-wash` ladder note that currently flags scroll-pane as a host;
   correct the "43 shadcn-vue base component packages … 44 dirs" count to 42 / 43.
6. No migration alias — ScrollPane has zero external consumers; clean break per
   user memory `feedback_no_backwards_compat`.

### 6d. What stays

`<CartoonCard>` stays a component — it owns off-ladder tokens the `tier` enum
cannot name (Section 2). This verdict applies to ScrollPane **only**; the
`e017d53` lift was right for CartoonCard and wrong for ScrollPane.

---

## Summary

- ScrollPane: 43 lines, styling-only, one own prop (`shadow`), zero behaviour.
- Identically expressible today as `<Card tier="wash" :grain="false">` + two static
  utilities — zero CVA delta, zero library change needed.
- Consumer count at HEAD: 1 (its own demo). Fails L invariant 8.
- Mis-named: promises a scroll-region primitive, delivers a flat pane (and a
  keyboard-scroll a11y regression).
- VERDICT: **DEMOTE-TO-VARIANT** — retire `<ScrollPane>`; Q.W2 migrates the
  speedtest lists to the `<Card tier="wash" :grain="false" class="overflow-auto
  max-h-*">` recipe.
