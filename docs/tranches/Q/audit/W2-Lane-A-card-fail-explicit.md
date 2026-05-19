# Q.W2 Lane A — glass-ui `Card` props fail-explicit (invariant 31)

**Lane**: Q.W2 Lane A — glass-ui substrate.
**Date**: 2026-05-18.
**Mode**: source mutation in glass-ui only. No mutating git. Verified with `npm run typecheck` + `npx vitest run`.
**Verdict**: invariant 31 dev-WARN posture shipped on `Card` + the 2 worst sibling offenders. Typecheck + 377-test suite GREEN.

---

## §1 Charter

Per Q-card-2 + Qα R3. glass-ui's `Card` is driven entirely by its declared
props — `tier` / `shadow` / `grain`. In Vue 3.5, an *undeclared* attribute
falls through to the component's root element by default. A consumer passing
`variant="pane"` (a prop the glass-ui `Card` never had — it is the stale
pre-glass-ui API value.js + bbnf-buddy authored against) gets it silently
swallowed as an inert DOM attribute. `Card` then renders its defaults —
`tier:"resting"` + `shadow:true` — and the consumer sees the hard black
`--shadow-card` drop-shadow the user reported in the Qα forensics, with **no
diagnostic**.

Invariant 31 (component props fail-explicit) closes this: component primitives
do not silently swallow unknown props.

**Posture = dev-WARN, NOT typed-reject.** The 1 remaining bbnf-buddy cartoon
`<Card variant=>` site stays on the stale API until W4 Lane G. A hard
`vue-tsc` reject at W2 would red-break bbnf-buddy's build for the W2→W4
window. The runtime dev-warning surfaces the staleness without breaking any
build. The typed-reject hardening lands at W6 once the fleet is verified
`variant=`-free — the `STALE_PROP_RECIPES` const (below) is the extensible
seam W6 promotes into the typed `defineProps` unions.

Scope: fix `Card` definitively; audit the OTHER `ui/` primitives for the same
silent-swallow class; fix the ≥2 worst siblings with the same mechanism.

## §2 The dev-WARN mechanism

A shared composable: `src/components/ui/_shared/useStalePropWarning.ts`.

`_shared/` is the sub-internal boundary inside `ui/` (leading underscore =
private-to-`ui/` at runtime, not re-exported by `ui/index.ts`). The composable
is consumed by direct relative import; it is not on any public surface.

**Shape**:

- `STALE_PROP_RECIPES` — a clearly-named, extensible const mapping each stale
  prop name to its canonical replacement recipe (quoted verbatim in the
  warning):
  - `variant` → `tier="wash" :grain="false"` (and `variant="cartoon"` →
    `<CartoonCard>`).
  - `flush` → `class="p-0"` (padding is a consumer utility, never a Card prop;
    per the bbnf-buddy `<Card variant="pane" flush>` audit).
- `StalePropName` — the union type over those keys. This is the **W6
  typed-reject seam**: W6's hardening promotes these names into the
  primitives' `defineProps` unions. New stale names are added in ONE place.
- `useStalePropWarning(componentName, staleNames?)` — calls `useAttrs()` and
  installs a `watchEffect` that, for each watched stale name present in
  `$attrs`, emits a `console.warn` naming **the prop**, **the component**, and
  **the canonical replacement**. `name in attrs` catches both `variant="x"`
  and the bare `flush` attr (`flush: ""`).

**Production-silent**: the entire body is gated behind `if
(!import.meta.env.DEV) return;` — production builds tree-shake it; zero
runtime cost. `import.meta.env.DEV` is `true` under Vitest (test mode is
non-production), so the suite exercises the live warning path.

**Reactive**: `watchEffect` over `useAttrs()` means the warning fires on the
initial render and re-fires if a stale attr is added dynamically — not a
one-shot mounted-hook check.

## §3 Sibling-primitive audit

Scope: every `ui/` primitive that resolves a CVA/variant or a variant-keyed
class map from props. The silent-swallow class splits into two distinct
sub-classes — they are NOT equally severe:

### §3.1 Class A — silent-swallow of the stale prop NAME (the invariant-31 bug)

A primitive whose entire surface is driven by declared props, and which never
declared `variant` at all. A consumer passing `variant=` (or `flush`) has the
**prop name itself** swallowed → falls through inert → defaults render. This
is the exact Qα R3 regression. **Highest severity** — the consumer's intent is
completely dropped with no signal.

| Component | File | Declares `variant`? | In W2 migration blast radius? | Fixed |
|---|---|---|---|---|
| **Card** | `ui/card/Card.vue` | No (`tier`/`shadow`/`grain`) | YES — the canonical bug site | **YES (definitive)** |
| **ScrollPane** | `ui/scroll-pane/ScrollPane.vue` | No (`shadow` only) | YES — replacement primitive for retired `<Card variant="pane" flush>`; a consumer mid-migration naturally keeps `variant=`/`flush` | **YES (worst sibling #1)** |
| **CartoonCard** | `ui/cartoon-card/CartoonCard.vue` | No (none) | YES — replacement primitive for retired `<Card variant="cartoon">`; same mid-migration risk | **YES (worst sibling #2)** |

The two worst siblings are **ScrollPane** and **CartoonCard**: they are the
*direct replacement primitives* for the two retired `<Card variant=>` forms.
A consumer migrating off `variant=` who lands on the new primitive but forgets
to drop the stale prop hits the exact same silent-swallow — and these are the
only two `ui/` primitives whose existence is *defined by* that migration. They
are field-for-field in the W2 blast radius.

### §3.2 Class B — bad VALUE to a declared `variant` prop (a lesser, separate class)

These primitives DO declare `variant` and resolve a CVA/class-map from it.
Passing an *undefined value* (e.g. `variant="pane"` to `Button`) is not a
swallowed-prop-name bug — the prop name is declared and bound; CVA simply
resolves the unknown value to its `defaultVariants` fallback. This is a
CVA-default-fallback class, not the invariant-31 silent-swallow class. It is
**lower severity** (the consumer at least sees a declared, typed prop; the
typed `defineProps` union already constrains valid values for them at the
`vue-tsc` boundary in TS consumers) and is **out of scope** for the W2
dev-WARN — recorded here for completeness.

| Component | File | `variant` source |
|---|---|---|
| Button | `ui/button/Button.vue` | `buttonVariants` CVA (typed `ButtonVariants['variant']`) |
| Badge | `ui/badge/Badge.vue` | `badgeVariants` CVA (typed) |
| Alert | `ui/alert/Alert.vue` | `alertVariants` CVA (typed) |
| Toggle | `ui/toggle/Toggle.vue` | `toggleVariants` CVA (typed) |
| ToggleGroup / ToggleGroupItem | `ui/toggle-group/*` | `toggleGroupContext` variants (typed) |
| SelectTrigger | `ui/select/SelectTrigger.vue` | inline `'default' | 'ghost'` union (typed) |
| DialogContent | `ui/dialog/DialogContent.vue` | inline `'glass' | 'opaque'` union (typed) |
| Toast | `ui/toast/Toast.vue` | inline `'default' | 'destructive'` union (typed) |
| Progress | `ui/progress/Progress.vue` | inline `ProgressVariant` union (typed) |
| Skeleton | `ui/skeleton/Skeleton.vue` | inline `SkeletonVariant` union (typed) |
| Section | `ui/section/Section.vue` | `tone` prop, typed union |

**Audit conclusion**: the invariant-31 silent-swallow-of-the-prop-NAME class
has exactly **3 occurrences** — `Card`, `ScrollPane`, `CartoonCard` — and all
3 are fixed in this lane. The 11 Class-B primitives are a separate, lesser
class (typed-prop bad-value → CVA fallback), out of W2 scope; their typed
`defineProps` unions already give TS consumers a `vue-tsc` error on a bad
value, so the silent-degrade only affects untyped/template-literal call sites.

## §4 What was fixed

| File | Change |
|---|---|
| `src/components/ui/_shared/useStalePropWarning.ts` | **NEW** — `STALE_PROP_RECIPES` const, `StalePropName` type (W6 seam), `useStalePropWarning()` composable. Dev-gated, production-silent. |
| `src/components/ui/card/Card.vue` | `useStalePropWarning("Card")` call added after `defineProps`. |
| `src/components/ui/cartoon-card/CartoonCard.vue` | `useStalePropWarning("CartoonCard")` — worst sibling #2. |
| `src/components/ui/scroll-pane/ScrollPane.vue` | `useStalePropWarning("ScrollPane")` — worst sibling #1. |
| `src/components/ui/card/__tests__/Card.test.ts` | **+5 tests** — see §5. |

No public-surface change (`_shared/` stays private-to-`ui/`); no typed-prop
change (dev-WARN posture, not typed-reject); no backwards-compat shim.

## §5 Test added

`src/components/ui/card/__tests__/Card.test.ts` — new `describe("Card —
stale-prop dev-warning")` block, 5 tests, each spying on `console.warn`:

1. **warns on stale `variant`** — `<Card variant="pane">` fires exactly 1
   warning; the message contains `variant`, `<Card>`, `tier="wash"`,
   `:grain="false"`.
2. **warns on bare `flush`** — `<Card flush>` fires 1 warning containing
   `flush`.
3. **silent for declared props** — `<Card tier="wash" :shadow="false"
   :grain="false" class="ok">` fires zero warnings.
4. **siblings warn** — `<ScrollPane variant="pane" flush>` fires 2 warnings
   (both stale names) including `<ScrollPane>`; `<CartoonCard
   variant="cartoon">` fires 1 including `<CartoonCard>`.
5. **siblings silent for declared props** — `<ScrollPane :shadow="false">` +
   `<CartoonCard class="ok">` fire zero warnings.

The pre-existing 5 Card tests are unchanged and still pass.

## §6 Verification

| Gate | Result |
|---|---|
| `npm run typecheck` (`vue-tsc --noEmit`) | **GREEN** — 0 errors |
| `npx vitest run` (full suite) | **GREEN** — 32 files, 377 tests passed |
| `npx vitest run` (Card file) | **GREEN** — 10/10 (5 pre-existing + 5 new) |

`npm run build` not run per lane constraint (typecheck + vitest are the
verification gates).

## §7 Verdict

Invariant 31 dev-WARN posture is shipped. `Card` fails-explicit on the stale
`variant` / `flush` prop names; the 2 worst sibling offenders — `ScrollPane`
and `CartoonCard`, the direct replacement primitives for the retired
`<Card variant=>` forms — carry the same mechanism via the shared
`useStalePropWarning` composable. The `STALE_PROP_RECIPES` const is the
extensible, clearly-named seam W6 hardens into a typed-reject once the fleet
is `variant=`-free. The 11 Class-B variant-CVA primitives are a separate,
lower-severity class (typed bad-value → CVA fallback) and are documented in
§3.2 as out of W2 scope. Hard gate (a) is met: `Card` dev-warns on unknown
props; sibling occurrences reported (3 in-class, 11 lesser-class); worst-2
fixed. Typecheck + 377-test suite GREEN.
