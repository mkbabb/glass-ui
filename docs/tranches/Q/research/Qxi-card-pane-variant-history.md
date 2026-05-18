# Qξ — Card `pane` variant: full git-history forensics + idiomatic-revival path

**Author**: Qξ (xi) — round-2 audit-augmentation pivot.
**Charter origin**: the user's pivot on Q.W2 — "Look to our past commits for that item. The pane variant should properly be folded back in, or an idiomatic solution derived."
**Scope**: `src/components/ui/card/` full reflog + tranche-J/I/G prose + CHANGELOG + the surviving sibling primitive.

---

## TL;DR

`pane` was a real `Card` variant from glass-ui's birth (`e8380d7`, 2026-03-25) through the v0.7→v0.8 redesign (retired at `3a43a8f`, 2026-05-06). It was NOT silently deleted — it was deliberately LIFTED to a sibling primitive `<ScrollPane>` in the immediately-following commit `e017d53` (same day, same author, same wave). The R1-card-api-spec the retiring commit cites called the move out by name — `pane` and `cartoon` are "orthogonal to the wash → overlay glass ladder" and therefore earn their own primitives rather than collapsing into a tier rung. `<ScrollPane>` is alive in `src/components/ui/scroll-pane/ScrollPane.vue` at HEAD and is the canonical successor. The Qα-round-1 advice (rewrite `variant="pane"` → `tier="wash" :shadow="false"`) is a PARTIAL rendering — it captures the visual tier but discards `<ScrollPane>`'s baked-in `overflow-auto` + `scrollbar-hidden` + grain-disabled contract, which is the substrate's whole reason for existence. **The properly-fold-back-in answer is Path D — `pane`'s successor primitive already exists; migrate consumers to `<ScrollPane>` rather than to `tier="wash" :shadow="false"`.**

---

## Section 1 — `pane` variant timeline (introduction → maturation)

### 1.1 Introducing commit

| field | value |
|---|---|
| **commit** | `e8380d7` |
| **date** | 2026-03-25 |
| **author** | Mike Babb |
| **subject** | `feat: glass-ui design system — components, composables, styles, presets` |
| **role** | initial library scaffold; `<Card>` shipped with `variant?: "default" \| "pane"` on day one |

Original `Card.vue` prop doc-comment (verbatim from `e8380d7`):

```ts
/** 'default' = glass bg + shadow; 'pane' = translucent bg + blur (scrollable content panes) */
variant?: "default" | "pane";
```

The intent was explicit from the start: `pane` was for **scrollable content panes**. The implementation rendered `bg-card/75 backdrop-blur-[var(--glass-blur-light)]` without `shadow-[var(--shadow-card)]`.

### 1.2 Maturation commits (chronological, all on `src/components/ui/card/Card.vue`)

| commit | date | change |
|---|---|---|
| `44882d4` | 2026-03-27 | pane variant momentarily uses `glass` class for "full glassmorphic treatment" — then reverted at `8ce172d` |
| `8ce172d` | 2026-03-30 | switches pane to `bg-[var(--glass-bg-subtle)] [backdrop-filter:var(--glass-blur-subtle)] border border-[var(--glass-border-subtle)]` — the canonical pane tokenisation; comment notes "Pane uses glass background + blur without the ::after grain overlay, which conflicts with overflow:auto scroll containers" |
| `bbdcd5f` | 2026-04-08 | pane gains `shadow-[var(--shadow-card)]` + `transition-shadow` so panes match the rest of the card system visually |
| `06a0309` | 2026-04-08 | sibling variant `cartoon` lands; `variant` widens to `"default" \| "pane" \| "cartoon"` |
| `5144106` | 2026-04-11 | `flush?: boolean` prop lands — lets a nested pane drop its shadow without changing variant (a NESTED `pane` would stack a second `--shadow-card` on the parent's cartoon card) |
| `c7ff69f` | 2026-05-05 | tranche-G honest-close lands the `subtle` variant and migrates the implementation to a `cardVariants` CVA; the doc-comment for pane now reads "translucent bg + blur, no grain (for scroll panes)" — note the comment has crystallised around **scroll panes**, not just "scrollable content" |

By the eve of retirement the API was:

```ts
variant?: "default" | "pane" | "cartoon" | "subtle";
flush?: boolean;
plain?: boolean;
```

`pane` carried three load-bearing contracts:
1. **glass-wash-ish tier** — `bg-[var(--glass-bg-subtle)] [backdrop-filter:var(--glass-blur-subtle)] border-[var(--glass-border-subtle)]`
2. **no grain overlay** — the `::after` paper-grain conflicts with `overflow:auto` repaint
3. **rounded-xl + scrollbar-hidden** — same as every Card variant

Crucially, `pane` did NOT bake in `overflow-auto` itself — the consumer was expected to apply `class="overflow-hidden"` / `overflow-auto` / `max-h-*` on the Card. The variant was a *register* (visual intent — "this is a scroll-pane"), not a *behavior* (the actual overflow rule).

---

## Section 2 — removal timeline

### 2.1 Retiring commit

| field | value |
|---|---|
| **commit** | `3a43a8f` |
| **date** | 2026-05-06 (one day after the G honest-close at `c7ff69f`) |
| **author** | Mike Babb |
| **subject** | `feat(card): retire variant enum, ship tier API per R1-spec + R3 ladder` |
| **stat** | `Card.vue 106 → 52 lines; Card.test.ts 27 → 63` |
| **wave** | between tranches I and J — pre-J reconciliation (per `J/PROGRESS.md`: "master had diverged via a separate v0.7.x → v0.8.0 release path that retired the `subtle/default/medium/elevated` glass-tier ladder in favor of `wash/quiet/resting/floating + overlay`, retired Card variant API…") |

Commit message verbatim, the load-bearing rationale:

> Card.vue: rewrite per R1-card-api-spec §"Final API surface" with the R3 ladder names locked at S.W0. The variant enum (default | pane | cartoon | subtle) and `plain`/`flush` props retire; the new surface is one tier prop naming a class on the wash → quiet → resting → floating → overlay ladder.

The redesign drove three orthogonal axes out of the conflated `variant` enum:
1. **`tier`** — `"wash" | "quiet" | "resting" | "floating" | "overlay"` (the R3 ladder)
2. **`shadow`** — boolean (separates "this surface lifts" from the tier)
3. **`grain`** — boolean (separates "this surface paints noise" from the tier)

### 2.2 The companion commit — `pane` was LIFTED, not deleted

`e017d53` lands **the same day, by the same author, with stat-aligned scope** — and its commit message names the architectural intent unambiguously:

> `feat(scroll-pane,cartoon-card): lift Card variants to sibling primitives`
>
> R1-spec calls out two of Card's prior variants — `pane` (overflow:auto host) and `cartoon` (Memphis-register surface) — as orthogonal to the wash → overlay glass ladder. They re-emerge as their own primitives:
>
> - ScrollPane.vue: glass-wash tier, grain disabled (the ::after overlay conflicts with overflow:auto repaint), scrollbar-hidden + overflow-auto baked in. Polymorphic via reka-ui Primitive. shadow toggle for nested panes that would otherwise stack a second --shadow-card.

The `pane` variant did not "die" — it was promoted to a primitive. The retirement is a **transposition**, not a deletion. The CHANGELOG codified this with an explicit migration map (excerpt from `CHANGELOG.md` around the v0.8.0 entry):

```vue
<!-- v0.7 -->                                      <!-- v0.8 -->
<Card variant="default">                          → <Card>
<Card variant="medium">                           → <Card tier="resting">
<Card variant="elevated">                         → <Card tier="floating">
<Card variant="subtle">                           → <Card tier="wash">
<Card variant="pane" class="overflow-hidden">    → <ScrollPane class="overflow-hidden">
<Card variant="cartoon">                          → <CartoonCard>
```

The canonical migration for `pane` is **`<ScrollPane>`**, not `tier="wash" :shadow="false"`. This is unambiguous in the v0.8.0 changelog. The Qα round-1 advice diverged from the documented canon.

---

## Section 3 — implementation snapshot (the eve-of-retirement Card source)

The eve-of-retirement Card source (state at `c7ff69f`, immediately before `3a43a8f`):

```vue
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@utils";
import { cardVariants, type CardProps } from "./index";

const props = defineProps<CardProps>();

const variantClass = computed(() => {
    if (props.plain) return "scrollbar-hidden rounded-xl";

    const variant = props.variant ?? "default";
    const base = cardVariants({ variant });

    if (props.flush) return base;

    if (variant === "default" || variant === "pane") {
        return cn(base, "shadow-[var(--shadow-card)]");
    }
    if (variant === "subtle") {
        return cn(base, "shadow-[var(--glass-shadow-subtle)]");
    }
    return base;
});
</script>
```

And the `cardVariants` CVA (`card/index.ts` at `c7ff69f`):

```ts
export const cardVariants = cva("scrollbar-hidden text-card-foreground", {
    variants: {
        variant: {
            default: "glass-default rounded-xl",
            pane: "bg-[var(--glass-bg-subtle)] [backdrop-filter:var(--glass-blur-subtle)] border border-[var(--glass-border-subtle)] rounded-xl transition-shadow",
            subtle: "glass-subtle rounded-xl",
            cartoon: "glass-cartoon rounded-xl",
            cream: "cream-surface",
            paper: "paper-card",
        },
    },
    defaultVariants: { variant: "default" },
});
```

So `pane` rendered, immediately before retirement:
- `scrollbar-hidden text-card-foreground` (chassis)
- `bg-[var(--glass-bg-subtle)]` — the `subtle`-tier translucent plate
- `[backdrop-filter:var(--glass-blur-subtle)]` — the `subtle`-tier 1px blur
- `border border-[var(--glass-border-subtle)]` — the `subtle`-tier 8% foreground border
- `rounded-xl transition-shadow`
- `shadow-[var(--shadow-card)]` (unless `flush`)
- NO `::after` grain overlay (only `.glass-{tier}` classes wired the grain — pane used raw tokens for exactly this reason)

The `subtle`-tier tokens were renamed to `wash` at `eb9c44c` (v0.8.0 rename — verified by direct grep of the rename diff: `--glass-bg-subtle` → `--glass-bg-wash`, etc.). So the tier identity is preserved across the rename — `glass-bg-subtle` IS what `glass-bg-wash` is today.

---

## Section 4 — `tier="wash"` equivalence vs `<ScrollPane>`

Three candidate renderings of the legacy `<Card variant="pane">` against today's surfaces:

| contract | legacy `pane` | today `<Card tier="wash" :shadow="false">` | today `<Card tier="wash">` (shadow on) | today `<ScrollPane>` |
|---|---|---|---|---|
| background | `bg-[var(--glass-bg-subtle)]` | `bg-[var(--glass-bg-wash)]` via `.glass-wash` | same | same (via `.glass-wash`) |
| blur | `[backdrop-filter:var(--glass-blur-subtle)]` | `var(--glass-blur-wash)` | same | same |
| border | `border-[var(--glass-border-subtle)]` | `border-[var(--glass-border-wash)]` | same | same |
| shadow | `shadow-[var(--shadow-card)]` *unless* `flush` | NONE (shadow off) | `shadow-[var(--shadow-card)]` | `shadow-[var(--shadow-card)]` *unless* `:shadow="false"` |
| grain `::after` | OFF (raw tokens — `.glass-*` never wrapped pane) | **ON** (`.glass-wash::after` paints grain unless `:grain="false"`) | ON | **OFF** (`[&::after]:hidden`) |
| `scrollbar-hidden` | YES | YES | YES | YES |
| `overflow-auto` | NO (consumer's job) | NO | NO | **YES** (baked in) |
| `rounded-{x}` | `rounded-xl` | `rounded-card` | `rounded-card` | `rounded-panel` |
| polymorphic root | NO | YES | YES | YES |

### 4.1 The Qα round-1 advice is PARTIAL

`tier="wash" :shadow="false"` is faithful on **three** axes (bg, blur, border) and is correct that the legacy `pane` was shadow-on with a `flush` escape hatch — so for value.js's call sites that did NOT pass `flush`, even the shadow dimension is wrong (legacy pane had a shadow). More importantly, the advice is **unfaithful on grain**: `.glass-wash::after` paints paper-grain over the wash plate today, whereas legacy `pane` deliberately had NO grain (the whole reason `pane` used raw tokens instead of `.glass-subtle`). So:

- `tier="wash" :shadow="false"` paints grain that legacy pane never painted.
- `tier="wash" :shadow="false" :grain="false"` is closer — but loses the `overflow-auto` + `rounded-panel` (vs `rounded-card`) bake-ins that `<ScrollPane>` carries.

### 4.2 `<ScrollPane>` is the canonical successor

`<ScrollPane>` matches the legacy `pane` register on EVERY visual axis (wash tier, no grain, scrollbar-hidden, shadow + transition) AND ships the two missing baseline behaviours (`overflow-auto` + polymorphic root) that the legacy `pane` consumer always had to remember. The shadow toggle is preserved as a boolean prop (`:shadow="false"`). The radius shifts `rounded-xl` → `rounded-panel`, which is a tokenised follow-on of the v0.8.x R3-spec radius canon. The `rounded-panel` token is the same physical pixel value at `:root` defaults.

**Verdict: `tier="wash" :shadow="false"` is PARTIAL — captures the tier, miscalls grain, drops baked-in overflow/scrollbar/shape. `<ScrollPane>` is FAITHFUL across every dimension legacy `pane` carried.**

---

## Section 5 — four revival paths

### Path A — re-introduce `variant="pane"` as a deprecated alias

**Mechanism**: `<Card>` re-accepts `variant?: "pane"` and aliases it internally to `tier="wash" :shadow="false" :grain="false" + overflow-auto`.

| dimension | verdict |
|---|---|
| user-charter fit | matches "folded back in" literally — `variant="pane"` works again |
| L-invariant 4 (no legacy aliases) | **VIOLATES** — explicit aliasing is the named L-violation pattern |
| user-memory `feedback_no_backwards_compat` | **VIOLATES** — "clean breaks, no migration shims" |
| user-memory `feedback_architectural_approach` | **VIOLATES** — patches over the real architecture rather than redesigning around it |
| substrate cohesion | adds a second authoring path for the same render — `variant="pane"` and `<ScrollPane>` would both work, indistinguishably; this is exactly the substrate-hierarchy violation Tranche I.W3 resolved for `cream` (the `<Card variant="cream">` retirement was DRIVEN by collapsing two-paths-for-one-render) |
| invariant 31 cohesion | weakens — `Card` re-accepts an undeclared-by-tier prop, which means the dev-warn gate (Qι R1) can't fire on it |

**Path A is structurally identical to the `<Card variant="cream">` mistake Tranche I retired.** Re-adopting it now would reverse I.W3's substrate-hierarchy resolution. Hard reject.

### Path B — re-introduce `variant` as a top-level orthogonal axis

**Mechanism**: bring back the `variant` prop, with `pane` as one of N values, fully independent of `tier`/`shadow`/`grain`.

| dimension | verdict |
|---|---|
| user-charter fit | matches "folded back in" |
| R1-card-api-spec | **VIOLATES** — the entire point of `3a43a8f` was to retire the conflated `variant` enum in favour of three orthogonal axes |
| substrate cohesion | re-conflates tier and register — `variant="pane"` would have to override `tier`, recreating the precedence ambiguity the redesign retired |
| user-memory `feedback_architectural_approach` | **VIOLATES** — incremental patch over a deliberate redesign |
| migration story | doubles down: consumers now have TWO valid expressions of `pane` (`<Card variant="pane">` AND `<ScrollPane>`), with no canon to point to |

**Path B reverses the 2026-05-06 redesign wholesale.** Hard reject.

### Path C — promote `pane` to a 6th tier on the glass ladder

**Mechanism**: extend `CardTier` to `"wash" | "quiet" | "resting" | "floating" | "overlay" | "pane"`; ship `.glass-pane` as a 6th rung.

| dimension | verdict |
|---|---|
| user-charter fit | "idiomatic solution derived" — does join the canonical ladder |
| ladder semantics | **MISMATCH** — the wash→overlay ladder is an *opacity/blur monotonic* scale. `pane` is not a heavier or lighter rung — it's the wash tier WITH a behavior switch (no grain) AND a behavior switch (no shadow). Adding it to the ladder makes the ladder non-monotonic and conceptually muddied |
| substrate cohesion | duplicates `.glass-wash` with two settings flipped — two paths for one logical tier |
| R1-card-api-spec | **VIOLATES** — R1 explicitly called `pane` "orthogonal to the wash → overlay glass ladder", not a member of it |
| `glass-ui` precedent | `<CartoonCard>` already declined exactly this path — cartoon "lives off the tier ladder by design" per `e017d53` |

**Path C breaks the ladder's monotonic-opacity meaning.** Reject.

### Path D — treat `pane` as a sibling primitive

**Mechanism**: do nothing new — `<ScrollPane>` already exists, is already published, and is already documented as the canonical successor in `CHANGELOG.md`. The user-facing fix is to point consumers at `<ScrollPane>`.

| dimension | verdict |
|---|---|
| user-charter fit | **STRONGEST** — `pane` is already folded back in, just as a different primitive. The user's intuition ("this has existed before") is satisfied by the surviving substrate, not by reverting the API |
| L-invariant 4 + L-invariant 8 + memory `no_backwards_compat` | aligned — `<ScrollPane>` is the canonical primitive; no aliases, no shims |
| memory `architectural_approach` (gestalt redesigns) | aligned — `<ScrollPane>` IS the gestalt redesign that retired the conflated enum |
| substrate cohesion | best of the four — one primitive, one canonical use-site grammar (`<ScrollPane class="max-h-...">`) |
| consumer migration | requires a real edit (`<Card variant="pane">` → `<ScrollPane>`) — but this is the canonical migration the CHANGELOG already documents |
| **the cohesion gap** (Card silently swallowing `variant="pane"`) | orthogonal — Path D doesn't fix the silent-swallow per se; that's still a separate invariant-31 dev-warn fix on `<Card>` (Qι R1). Path D + the dev-warn together close the loop |

**Path D requires zero substrate change.** It IS the architecturally-coherent answer, codified in the 2026-05-06 commit pair `3a43a8f` + `e017d53` and the v0.8.0 CHANGELOG entry.

---

## Section 6 — recommended path

**Path D. The `pane` variant was not erased — it was lifted to `<ScrollPane>` at `e017d53` (2026-05-06), is alive at HEAD in `src/components/ui/scroll-pane/ScrollPane.vue`, and is the canonical migration target documented in `CHANGELOG.md` v0.8.0.** The user's pivot — "fold it back in" — is satisfied by the surviving substrate; what needs revising is the Qα round-1 *migration target*, not the library.

### What Q.W2 should write at consumers

**Replace** Qα's `variant="pane"` → `tier="wash" :shadow="false"` migration plan with `variant="pane"` → `<ScrollPane>`. This is faithful on every visual axis legacy `pane` carried, ships the baked-in `overflow-auto` + `scrollbar-hidden` + grain-disabled contract value.js's pane sites depended on, and matches the canon CHANGELOG migration line `<Card variant="pane" class="overflow-hidden"> → <ScrollPane class="overflow-hidden">` exactly.

### What the substrate side should write

Nothing on `pane`'s revival — `<ScrollPane>` is the revival, already shipped. The orthogonal substrate fix (Qι R1 — `<Card>` should `console.warn` on unknown props in dev) remains independently warranted: a typed consumer (e.g. via `vue-tsc` against the demo) catches `variant="pane"` at build time; a non-typed consumer needs the runtime warn to discover it. The fail-explicit dev-warn is the cohesion-gap closer the silent-swallow analysis flagged. Path D does NOT replace that fix — they're orthogonal.

### Why this beats `tier="wash" :shadow="false"`

`tier="wash" :shadow="false"` would render — but it would paint paper-grain (which legacy pane suppressed) over the wash plate, miss the `overflow-auto` bake-in, and use `rounded-card` instead of `rounded-panel`. The consumer would then re-add `:grain="false"` and `class="overflow-auto"` site-by-site to recover the legacy behaviour, **arriving at exactly the props `<ScrollPane>` packages for free**. The canonical primitive exists; we don't re-derive its identity at every call site.

### One-sentence rationale

`pane` already came back — as `<ScrollPane>`, on the same day, in the same author's commit, for exactly the reasons the R1-spec called out — so migrate consumers to that primitive rather than to a multi-prop `<Card>` decomposition that approximates it on three axes and misses three more.
