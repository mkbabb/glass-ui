# J.W5.B — NumberField rounded + Button-as-child proof

**Lane**: B (Form Primitives — NumberField).
**Wave**: J.W5.
**Status**: complete.
**Hard gate reference**: J/waves/W5.md §"Lane B" + §"Hard gate" (a)–(e), (i), (j).
**Pre-state**: HEAD `c5f196c`, working-tree pre-W5 baseline; typecheck + tests green.

---

## Scope summary

Lane B refines the NumberField primitive on two axes per R3 §B + §F:

1. **Default-radius alignment.** The input chrome migrates from `rounded-md` (6px) to `rounded-input` (10px via `--radius-input`), activating the previously-unused semantic input radius token.
2. **Button-as-child composition for +/-.** The increment/decrement buttons stop being bare `<button>` elements and compose `<Button asChild variant="ghost" size="icon">`, inheriting the canonical four-state Button contract (focus-visible, hover, active-press, disabled).

The provide/inject contract from I.W3.β (NumberField → NumberFieldInput/Increment/Decrement via reka-ui's `injectNumberFieldRootContext`) is preserved — verified by runtime increment click reaching `handleIncrease()`.

---

## Step 1 — Default radius alignment

**File**: `src/components/ui/number-field/NumberFieldInput.vue`

The W5.B prompt and J/waves/W5.md §Lane B item 1 call for `rounded-md` → `rounded-input`. The R3 §B.1 decision matrix offered three options; the wave spec selected **option B (`--radius-input` = 10px)**, activating the previously-unused semantic alias rather than going to `--radius-pill` (option A, full pill). The user's "refined and rounded" reading at this gate is "10px soft-rounded," not "9999px pill."

**Diff** (one-line class replacement):

```diff
- <NumberFieldInput data-slot="input" :class="cn('focus-ring flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm text-center placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50')" />
+ <NumberFieldInput data-slot="input" :class="cn('focus-ring flex h-10 w-full rounded-input border border-input bg-background py-2 text-sm text-center placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50')" />
```

**Token resolution chain** (`tokens.css:131` + `theme.css:205`):

```
.rounded-input  →  --radius-input  →  --radius  →  0.625rem  →  10px
```

**Cartoon variant note.** At HEAD there is **no cartoon variant CVA in `number-field/index.ts`** — the file is a plain re-export barrel; the input chrome is a single inline class string in `NumberFieldInput.vue`. The W5.B prompt's clause "Cartoon recipe radius: KEEP as `--radius-md`" is non-applicable at HEAD. This is a scope reveal: R3's §B.1 sub-decision discussed a future cartoon variant; that variant does not exist on master, so there is nothing to preserve. If a cartoon variant lands later (e.g., K-tranche), the radius decision is independent of this gate.

---

## Step 2 — Button-as-child composition

**Files**: `src/components/ui/number-field/NumberFieldIncrement.vue`, `src/components/ui/number-field/NumberFieldDecrement.vue`.

### reka-ui primitive composition pattern

The reka-ui `NumberFieldIncrement` / `NumberFieldDecrement` primitives accept an `asChild?: boolean` prop (verified at `node_modules/reka-ui/dist/NumberField/NumberFieldIncrement.js:15-18`). When `as-child` is set, the primitive merges its props (`tabindex`, `aria-label`, `type`, `disabled`, `data-disabled`, `data-pressed`, `onContextmenu`, the synthetic `pointerdown`/`pointerup` from `usePressedHold`) onto the slot child via `mergeProps`. The child becomes the rendered DOM element; the primitive's `injectNumberFieldRootContext` connection drives the press handler.

The canonical pattern places `<Button>` as the slot child:

```vue
<NumberFieldIncrement data-slot="increment" v-bind="forwarded" as-child>
  <Button variant="ghost" size="icon" :class="cn('absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20', props.class)">
    <slot>
      <Plus class="size-[var(--icon-sm)]" />
    </slot>
  </Button>
</NumberFieldIncrement>
```

The `<Button>` component itself is a reka-ui `Primitive` (`src/components/ui/button/Button.vue:19-25`) with `as: 'button'` default. The composition stack is therefore:

```
NumberFieldIncrement (asChild=true)
  └─ mergeProps onto child →
       Button (rendered as <button>)
         ├─ buttonVariants base (btn-pill, focus-ring, active:scale-[--scale-press-btn], …)
         ├─ ghost variant (bg-transparent, hover:bg-foreground/8, active:bg-foreground/12, …)
         ├─ size="icon" (h-10 w-10 p-0)
         └─ injected reka-ui props (aria-label="Increase", tabindex="-1", type="button",
                                    pointer handlers from usePressedHold,
                                    disabled state from rootContext.isIncreaseDisabled)
```

### Decrement diff (mirrored for increment)

```diff
- <NumberFieldDecrement data-slot="decrement" v-bind="forwarded" :class="cn('absolute top-1/2 -translate-y-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20', props.class)">
-   <slot>
-     <Minus class="h-4 w-4" />
-   </slot>
- </NumberFieldDecrement>
+ <NumberFieldDecrement data-slot="decrement" v-bind="forwarded" as-child>
+   <Button variant="ghost" size="icon" :class="cn('absolute top-1/2 -translate-y-1/2 left-0 disabled:cursor-not-allowed disabled:opacity-20', props.class)">
+     <slot>
+       <Minus class="size-[var(--icon-sm)]" />
+     </slot>
+   </Button>
+ </NumberFieldDecrement>
```

**Sizing change.** `p-3` (12px padding on a content-sized button) → `size="icon"` resolves to `h-10 w-10 p-0` (40×40px). The increase in click target is intentional — matches the input height (`h-10`) so the buttons sit flush with the input edges.

---

## Step 3 — Glyph rendering via `--icon-sm`

The bespoke `class="h-4 w-4"` (16px) on `<Plus>` / `<Minus>` migrates to `class="size-[var(--icon-sm)]"`. Per R3 axis-3 finding 9 + R3 §F.3, this consumes the canonical icon-size token (`--icon-sm: 0.875rem` = 14px) instead of hardcoding the Tailwind utility. Runtime probe confirms the SVG renders at `width: 14px; height: 14px`.

(Note: `--icon-sm` is 14px, not 16px. The previous `h-4 w-4` was actually 16px = `--icon-md`. The token migration intentionally drops one rung — the 14px glyph reads better inside a 40px ghost button than the 16px glyph would, leaving more visual breathing room around the icon.)

---

## Step 4 — Story verification

**Story**: `demo/stories/primitives/number-field.vue` (read-only verification, no edits required — the story consumes the public NumberField API and renders correctly post-change).

### Runtime probe (Playwright @ http://localhost:5173/primitives/number-field, viewport 1200×750)

```js
{
  input: {
    tag: "INPUT",
    borderRadius: "10px",                 // (a) PASS — --radius-input resolved
    height: "40px",
    classes: "focus-ring flex h-10 w-full rounded-input border border-input ..."
  },
  increment: {
    tag: "BUTTON",
    borderRadius: "9999px",               // btn-pill from buttonVariants base
    height: "40px",
    width: "40px",
    backgroundColor: "rgba(0, 0, 0, 0)",  // ghost variant rest
    hasFocusRing: true,                   // (c) PASS — focus-ring from buttonVariants base
    hasBtnPill: true,
    ariaLabel: "Increase"                 // (i) PASS — reka-ui aria forwarded via asChild
  },
  decrement: { /* mirrored */ },
  incIcon: { width: "14px", height: "14px" },  // (d) PASS — --icon-sm resolved
  radiusInputResolved: "0.625rem",
  iconSmResolved: "0.875rem"
}
```

### Interactive states

| State | Verified | Evidence |
|---|---|---|
| Click → increment value | ✓ | `nf-qty` 3 → 4 after Playwright click on `#nf-qty ~ [data-slot="increment"]`. Provide/inject contract intact: `injectNumberFieldRootContext().handleIncrease()` reached. |
| Hover | ✓ | Computed `background-color: oklab(0.216 0.0035 0.0052 / 0.08)` (= `bg-foreground/8` from ghost variant); `color: rgb(28 25 23)` (full `text-foreground`). |
| Disabled | ✓ | The `Disabled` field's increment/decrement render with `disabled` attr + `data-disabled=""` forwarded from reka-ui (computed `opacity: 0.2` from `disabled:opacity-20`). |
| Focus-visible | ✓ | `focus-ring` utility applied via buttonVariants base — token chain `--focus-ring-shadow`. |
| Active-press | ✓ | `active:scale-[var(--scale-press-btn)]` from buttonVariants base. |
| Console errors | 0 | `mcp__playwright__browser_console_messages` returned 0 errors. |

### Visual inspection

Screenshot at `number-field-w5-b.png` (viewport 1200×750): four NumberField instances (Quantity, Tip rate, Step by 5, Disabled) render with softly-rounded 10px input chassis, circular pill +/- buttons sitting flush at the input edges, no clip artifacts, no overflow, disabled field correctly opacified.

---

## Provide/inject preservation

The I.W3.β refactor (per `docs/tranches/I/audit/W3-cartoon-hoist.md`) moved NumberField context from local-scope to provide/inject (Tabs precedent). The W5.B changes preserve this contract:

1. **NumberField.vue (root)** is unchanged — it still wraps `NumberFieldRoot` and emits `useForwardPropsEmits(delegatedProps, emits)`. The `NumberFieldRoot` provides context via `provideNumberFieldRootContext` (reka-ui internal) — untouched.
2. **NumberFieldIncrement/Decrement** still consume `injectNumberFieldRootContext()` internally inside reka-ui's primitive setup (line 27 of the unpacked primitive). The child `<Button>` is rendered via `<Primitive>` with merged props; the primitive's setup function still runs, so the inject still binds.
3. **Runtime evidence**: the click test (Step 4 row 1) increments the value through the primitive's `handleIncrease()` — proving the inject path is live end-to-end after the asChild swap.

No NumberField source touches `provide`/`inject` directly — the contract is owned by reka-ui's root primitive. The asChild composition is purely additive at the rendered DOM layer; the context graph is unaffected.

---

## Hard-gate verification

| Gate | Status | Evidence |
|---|---|---|
| (a) NumberField default `border-radius` resolves to `var(--radius-input)` | PASS | Runtime probe: `borderRadius: "10px"`, classes include `rounded-input`. `--radius-input: 0.625rem` = 10px. |
| (b) NumberField cartoon variant retains `--radius-md` (no regression) | N/A | No cartoon variant exists in `number-field/index.ts` at HEAD (scope reveal — see Step 1). |
| (c) Increment + Decrement consume `<Button asChild variant="ghost" size="icon">` | PASS | Both components' templates rewritten; Button rendered with `btn-pill focus-ring` + ghost-variant classes + `h-10 w-10 p-0`. |
| (d) `<Plus>` + `<Minus>` icons render with canonical size | PASS | `size-[var(--icon-sm)]` resolves to 14×14px at runtime. |
| (e) `npm run typecheck` green AFTER each step | PASS for Lane B files | typecheck output references zero errors in `number-field/`. (Sibling-lane WIP errors in `CarouselPager.vue` are W6 territory, outside this lane's bounds.) |
| (f) `npm run build` green at end | PASS | `✓ built in 18.41s`, declaration files emitted. |
| (g) `npm run test` green at end | PASS for non-W6 | 268/269 passed; 1 failure is in W6 lane carousel/FuzzySearch territory, not number-field. |
| (h) Per-story consumption: number-field story renders + interactive states canonical | PASS | Playwright probe (Step 4): all 4 fields render; click increments value; hover/disabled states verified. |
| (i) Provide/inject contract from I.W3.β preserved | PASS | Click → handleIncrease() round-trip reaches the input value (3 → 4). |
| (j) Proof doc with citations | PASS | This document. |

---

## File list (LOC delta, Lane B only)

| File | LOC before | LOC after | Δ |
|---|---:|---:|---:|
| `src/components/ui/number-field/NumberFieldInput.vue` | 8 | 8 | 0 (one-class swap inside the existing single-line template) |
| `src/components/ui/number-field/NumberFieldIncrement.vue` | 25 | 28 | +3 |
| `src/components/ui/number-field/NumberFieldDecrement.vue` | 25 | 28 | +3 |
| **Total** | **58** | **64** | **+6** |

`src/components/ui/number-field/index.ts`, `NumberField.vue`, `NumberFieldContent.vue`, and `demo/stories/primitives/number-field.vue` are unchanged.

---

## Scope reveals

1. **No cartoon variant CVA on master.** Hard gate (b) is non-applicable at HEAD — `number-field/index.ts` is a plain re-export barrel; there is no cartoon variant to preserve. The W5.B prompt's clause referenced a CVA shape that R3 §B.1 sub-decision discussed but which does not exist post-I close. Documenting here for post-wave review; no remediation needed.

2. **`size-[var(--icon-sm)]` = 14px, not 16px.** The previous bare `h-4 w-4` was 16px (= `--icon-md`). The R3 §F.3 prescription said "`--icon-sm` is also `1rem`/16px" but at HEAD `--icon-sm: 0.875rem` (14px) and `--icon-md: 1rem` (16px). I followed the R3 prescription's *token name* (`--icon-sm`) rather than its parenthetical size claim — this drops the glyph by 2px, which reads cleaner inside the 40px ghost button. Flagging for orchestrator review; if 16px is preferred, swap to `--icon-md` (one-character change in both files).

3. **Lane-isolated typecheck only.** Sibling lanes (W6.C carousel) introduced typecheck errors in `CarouselPager.vue` during their parallel WIP. My typecheck assertion is "no errors in `src/components/ui/number-field/`" — confirmed by grep. The wave-level typecheck/build/test gates are orchestrator-owned.

---

## Citations

- **Radius migration**: `src/components/ui/number-field/NumberFieldInput.vue:7` (was `rounded-md`, now `rounded-input`); `src/styles/tokens.css:131` (`--radius-input: var(--radius)`); `src/styles/theme.css:205` (Tailwind alias).
- **Button asChild migration**: `src/components/ui/number-field/NumberFieldIncrement.vue:20-29`; `src/components/ui/number-field/NumberFieldDecrement.vue:20-29`. reka-ui primitive composition: `node_modules/reka-ui/dist/NumberField/NumberFieldIncrement.js:15` (`asChild` prop), `:38-58` (`mergeProps` onto child).
- **Provide/inject preservation**: reka-ui's `injectNumberFieldRootContext` in primitive setup (`NumberFieldIncrement.js:27`); runtime click test → value increment confirms inject still binds after asChild swap.
- **Token resolution**: `--radius-input` → `--radius` → `0.625rem` → `10px`; `--icon-sm` → `0.875rem` → `14px`.
