# BK Φ5 · Row #82 · W-FIELD — input · textarea · number-field

**modelId: `claude-opus-5[1m]`** (SCOUT + IMPLEMENT seat) · base HEAD `f5565208` (⊕⁶⁰
back-annotation; the brief's `4917a042` is 23 ledger entries stale and was re-derived,
not trusted) · date **2026-08-08**.

**STEP-0 BASELINE, banked BEFORE the first byte** (⊕⁶⁰ item 7, now protocol):
`git diff -U0 > /tmp/bk-row-baseline-1786193773.diff` — **6646 lines**, and
`git status --porcelain | wc -l` = **103**. Every fence stat in §10 is derived as
(final `git diff --numstat`) **minus** that baseline, per file. No whole-file stat
wears this row's name.

---

## 0 · SELECTION AND ITS GROUNDS

**Row #82 W-FIELD**, the canonical next unstarted Φ5 row.

Derived at this seat from three sources, not assumed:

| source | reading |
|---|---|
| `EXECUTION-PROGRESS.md:2862` | `\| 82 \| W-FIELD \| Φ5 \| UNSTARTED \| TR#82 → CWT-3 §LANE forms-seam \| lane gates; owns `.glass-control-edge` (C-5); after #68/#83 \|` |
| ⊕⁶⁰ (`:2615-2629`, and restated in force at `:2685-2690`) | *"**#82 W-FIELD is the CANONICAL NEXT ROW.** … Both of #82's code preconditions are discharged (#83's `_shared/control.ts`, and this row's proof that `ControlProps` composes cleanly at a second consumer) … the re-scout has a named destination it does not have to re-derive."* |
| `EXECUTION-DAG-2026-08-03.md` | `W-FIELD \| Φ5 \| unstarted \| #68; #83; ASK g6 (number-field KEEP default)` |

Both hard preconditions verified **on disk** rather than inherited: **#68 W-TOKEN-CANON**
is landed (`--ink-seam` 0.08 / `--ink-edge` 0.16 / `--ink-perimeter` 0.48 at
`tokens/color-radius.css:138-140`, `--control-label` at `sizing.css:104`), and **#83
W-CONTROL-BIT** is landed (`src/components/_shared/control.ts` exists and exports
`ControlSize`). No SEALED or IN-FLIGHT row was selected; rows below #82 in TR order are
SEALED, LANDED, or gated with their gate named (#21 on #17 · #25 on its rides-clause ·
#22 CURE-CUT · #42/#44/#45/#47/#48/#52 on DAG edges · #49-#53 ASK-gated · #58/#73 on
g11 · #67 on R-7 footage · #74 inside #88).

**ASK g6 fires AT this cut** with a ratified default of **KEEP** (`docs/tranches/BK/ASK.md`
row g6, tranche-qualified per ⊕⁵⁹ §11.6 item 2 — *"number-field — lane ships it … KEEP in
the W-FIELD lane (#82)"*). Silence advances: number-field ships, and this record IS the
firing. One owner word cuts it with the muster relay note at #76.

**TR cell, verbatim** (`TERMINAL-ROSTER.md:232`):

> | **82** | **W-FIELD** (input · textarea · number-field) | CWT-3 §LANE forms-seam | Φ5 | cited whole; owns the `.glass-control-edge` relocation (C-5) and corrects its file's false "≥8 consumers" (2 real); `./forms` retires only BEHIND the `./input`+`./textarea` mint. After #68/#83. ⊕⁴ U-28 (lane C): the BE `<GlassControl>` + SEARCH-WELL rider — **explicitly RETIRED** (BK's "glass-control" hits are a different register — the `.glass-control-edge` token law; the BE component never shipped and this lane's field register supersedes it). ⊕⁴ number-field's disposition rides ASK g6 (default KEEP in this lane) |

Spec of record read **in full**: `COMPONENT-WAVES-TERMINAL-3.md:436-638` (§0 T-1…T-9,
§1 THESIS, §2 F1-F21, §3 THE DESIGN, §4 STRIKE/ADD, §5 GATES G-F1…G-F6, §6 PAINT P1-P11,
§7 REJECTED, §8 LOC, §9 ROUTED) plus the batch rulings **C-5 · C-6 · C-7 · C-10**
(`:1816-1826`) and the tier-3 gate classification (`:1871`).

---

## 1 · THE PRE-STATE, RE-DERIVED — where the spec's figures had gone stale

The spec was authored at HEAD `5677ca43`. Twelve Φ5 rows have landed since, and
**five of its measured cells no longer describe the disk.** Each is stated with what
replaced it rather than executed against a subject that had already moved.

| §2/§3 figure | spec says | measured at `f5565208` | disposition |
|---|---|---|---|
| `field-surfaces.css` is 217/220 lines, "not a field file" (F20) | 217 misfiled lines EXIT | **37 lines** — #81 W-PICKER already moved the listbox plate, its collision bound and the warm portal field to `glass/overlay-plate.css` | the EXIT is discharged; what remains for this row is **only** the C-5 relocation of the 3-line `.glass-control-edge` rule, which is what TR#82 actually names |
| `.glass-control-edge` membership: "2 real, →6" | correct the false "≥8 consumers" | the file's own docstring had been corrected to **1** by #83 on 2026-08-08 — and #84 landed `glass-control-edge` on ToggleGroupItem hours later, making it **2** | corrected AGAIN, to the post-cut **6** (4 field shells + SelectTrigger + ToggleGroupItem), in the relocated file |
| the dialog-ancestry radius fork + its 9-line apologia (F12) | STRIKE | **already deleted** by #23 W-RADIUS-ROLE, which left the strike's own reasoning in place as a comment | not re-claimed; the comment is carried into the new register |
| radius: "`--radius-control` = 10 everywhere" (§3.2) | one rung, all three shells | #23's landed 7-role spine rules the opposite and says so at source: *"single-line controls (Input, SelectTrigger) keep the pill"* (`theme/radius.css:136`), `--radius-field` = `--radius-2xl` for the multi-line box | **the spine wins** — §9 routes "`--radius-field` fate" to W-RADIUS-ROLE, so this is that row's call, not this one's. Input keeps `--radius-pill`, textarea keeps `--radius-field`. See §4.1 |
| top rim α "0.30 → 0.12" (§3.2) | dial the top light down | `--glass-rim-top` already resolves **0.1 × `--glass-level`** (`tokens/glass-fx.css:169`) — below the ruled 0.12 | the ruled DIRECTION is already exceeded from the shared handle; declaring a local 0.12 would be a second mechanism tracking one value. Not done, stated |
| `material.css:66` cell-inherit kill (F4, routed to W-FROST) | one of two kills | **already landed** — `glass/material.css:51` reads *"The nested-cell blanket is GONE"* | half of the two-part kill is discharged; the other half (`--input-on-glass` α) is still opaque at `on-glass-fg.css:37`, so G-F2 stays fenced |

Everything else in §2 reproduced: `border:`/`background:` shorthands at `:12-13`,
`box-shadow` hand-copied at `:15`, `outline: none` at `:63`, three invalid grammars,
the 2px width arm, pad-inline 16, the 5lh floor, `--textarea-content-max` with **1
fallback read and 0 declarations**, `nativeProps` ×2, the vacuous `NumberFieldContent`,
the byte-twin steppers, ARIA on the role-less root div, and **zero** `transition` /
`:hover` / `@media` / `animation` anywhere in the lane's two sheets.

---

## 2 · PER-ITEM LEDGER

### 2.1 The C-5 relocation — `src/styles/glass/control-edge.css` (NEW, 56 lines)

TR#82's named ownership. `.glass-control-edge` left `_shared/field/` — a private field
folder is not the home of a register **six components across three families** compose —
for the `styles/glass/` C-5 cluster, `@import`-ed from `glass.css` immediately after
`control-bit.css` (text surfaces · bits · the shared edge, one place, one
`@layer components`). The vacated sheet is **DELETED**; `styles/index.css`'s §16
docstring row and its `@import` go with it.

**The source-order move is safe by CENSUS, and the census is in the file.** The only
other `(0,1,0)` `box-shadow` rule downstream is `.glass-capsule`, and **no element
composes both**; the three that compose `.glass-capsule-hover` collide only at
`:hover`, which outranks both. Stated so a later reader does not have to re-derive it.

**And the register gained two slots** — this is the substantive half, not the move:

```css
.glass-control-edge {
    box-shadow:
        var(--glass-rim-top), var(--glass-rim-bottom),
        var(--control-edge-inner, 0 0 #0000),
        var(--control-edge-ring,  0 0 #0000);
}
```

CWT-3 §2 **C-7** rules that a shared utility can only REPLACE a `box-shadow` list, so a
consumer wanting to APPEND must re-list the rim in its own rule — *and a consumer that
re-lists can forget to*, which is exactly how this lane's focus rule came to delete the
rim it was meant to sit on (legs 2 → 2 → 1, F6). With the slots, the rim is declared
**exactly once, library-wide**, and a consumer re-points a slot from any rule at any
specificity without touching it. C-7's law survives; its failure mode does not. This is
#83's CURE-4 idiom generalised: the register states the value, the role speaks into a
slot or inherits, and there is no equal-specificity tie for bundler source order to break.

### 2.2 The register — `_shared/field/control.css` (297 lines; `field-control.css` deleted)

Module-name strip per §3.5 (`_shared/field/{control.css, control.ts}`). Three laws, each
closing a defect **by construction** rather than by discipline:

| law | delivery | closes |
|---|---|---|
| **longhands only** | `border-width`/`border-style`/`border-color` + `background-color`; zero `border:`/`background:` shorthands | F1 — the shorthands reset exactly the channels `.glass-defined` composed, so a plate register rode ~57 fields and painted nothing |
| **box-shadow appends, never replaces** | **no rule in this file declares `box-shadow`**; the rim is §2.1's single declaration and focus/invalid/hover re-point a slot | F6 · G-F3's leg clause |
| **the ring lives on `outline`** | `outline: var(--focus-ring-width) solid <perimeter ink>` + `outline-offset: 2px`, halo in the ring slot; `outline: none` struck | F6 — a `box-shadow` ring on this register was defeated by every surface that painted its own |

Everything else the register now states, each exactly once:

- **ONE ink.** `--field-control-ink` = the perimeter rung (`--ink-perimeter` 0.48) at
  **1px**. HEAD: 1.5px × 0.05 = a composited mass of **0.075** against the ladder's 0.48.
  Minus half a pixel of stroke, times 6.4 of mass.
- **The well.** `--control-edge-inner` is an inset leg riding `--ink-seam` (0.08) at rest
  and `--ink-edge` (0.16) on hover. **The spec's 0.06 → 0.10 pair is substituted, with
  grounds:** neither value is on the ink ladder #68 landed after the spec was written,
  and CWT-3 §3 (canonical-series compliance) binds this batch to that ladder. The
  direction and the "deepens by one step" semantics are preserved exactly; the values are
  named rungs instead of literals.
- **The clock the lane never had.** `--field-control-duration` = `--duration-control`
  (0.12s) on `--field-control-ease` = `--spring-press` — the house press spring, a
  `linear()` curve, so the field carries liquid weight on every channel it can change.
  The invalid rung re-points BOTH to `--duration-fast` (0.20s) / `--ease-out`: an error
  arrives on a bezier because **an error must not bounce**. PRM arm paired with the live
  arm, so a reduce arm cannot pass on a dead tree.
- **HOVER**, guarded on `@media (hover: hover)` and fenced off disabled/readonly: the
  well deepens one ink rung and the backdrop one radius rung
  (`--glass-blur-quiet` → `--glass-blur-floating`).
- **ONE invalid grammar**, `:is(:user-invalid, [data-state="invalid"])` — one selector
  serving all three trigger paths (native constraint validation, the `invalid` prop, and
  a bare `aria-invalid`, the last two arriving through the chassis). The lane shipped
  **three**. The 2px width bump is struck: a boundary that changes WIDTH on validity
  reflows the text inside it.
- **Geometry on the series:** pad-inline 12 (`0.75rem`), **8 below 768px** — the file's
  first media query, ever — and textarea's block padding equal to its inline padding.
- **Growth** (T-2): `field-sizing: content` unconditional on `[data-kind="textarea"]`,
  floor = `rows`, ceiling = `--textarea-content-max` **declared at `:root`**
  (`tokens/sizing.css`, `12lh`). It previously had 1 fallback read and 0 declarations —
  a fallback wearing a token's name — and the 5lh blanket floor made `rows` dead on every
  textarea in the library.
  **[2026-08-08 · CURE ROUND · "floor = `rows`" WAS FALSE AS FIRST SHIPPED.** Under
  `field-sizing: content` the engine sizes to the content box and never consults the
  `rows` attribute — measured, `rows` 1/3/8 all rendered one line. The cut deleted
  HEAD's real floor and shipped none. CURED at §10 CURE-82-1: `Textarea.vue` stamps
  `--field-rows` and the register computes `min-block-size` from it. Read the clause as
  *floor = `rows`, delivered through the `--field-rows` stamp*.]
- **DISABLED is dim, not shrunk** (A4): the geometry, the border WIDTH and the corner stay
  at full alpha; only the two inks soften (45%) and the fill loses chroma. `opacity: 0.5`
  took the boundary down with the authority, so a disabled field stopped reading as a
  field.
- **READONLY kills the caret.** `caret-color: transparent`. HEAD left a blinking insertion
  point in a control that refuses every keystroke — the clearest false affordance a text
  control can paint.

### 2.3 The type rung, and the invariant it can only half-close in-lane

`font-size: var(--type-small)` — the fluid clamp **alone**. `--control-text` is
`--type-small × --ui-scale`, and the second factor escapes the clamp the first exists to
impose: 16.40px at 1440 fine becomes **24.60px** at coarse, past the clamp's own 20px
ceiling and off every rung (F8). The field reads the bounded rung, so its type is
invariant across `sm`/`md`/`lg` **and** across `--ui-scale` — comfort scales the BOX.

**The honest half.** G-F4 also asks for `label:value = 0.887 ± 0.02` at 1440 fine AND at
393 coarse. `--control-label` is `--control-text × 0.886653` (`sizing.css:104`, #68's), so
it still rides `--ui-scale`: the ratio is **exact at `--ui-scale` 1 and breaks at 1.5**
until the shared token is cured. §9 routes precisely that — *"`--control-text{,-sm}` ×
`--ui-scale` global cure (lane re-points locally now) | PROPORTION adoption wave"* — so
the coarse half of that clause is **owed there, not green here**, and it is named in the
battery rather than quietly measured at fine only.

### 2.4 The shells — `nativeProps` die by undeclaration, and how

`Input.vue` 57 → **48**, `Textarea.vue` 56 → **46**. Both lose their `nativeProps`
computed (15 + 13 lines) and their `useVModel` + `defaultValue` pair; both gain
`defineModel`.

**The mechanism, because the naive form of this cure is a large regression and this seat
hit it.** Simply deleting the native rows from `InputProps` makes every
`<Input placeholder="…">` in the repo a **type error** — `vue-tsc` allows no attribute a
component's props type does not name (measured: 30 errors across 12 demo files). The
props are therefore moved to a `/* @vue-ignore */` extends base:

```ts
export interface InputProps extends /* @vue-ignore */ InputNativeAttrs { … }
```

`vue-tsc` sees them; `defineProps` does not. Every native attribute is typed for the
caller AND rides `$attrs` to the element, and the component re-binds nothing. **The whole
`InputHTMLAttributes` is deliberately not the base**: its 225 members push the props union
past `tsc`'s complexity bound (TS2590, reproduced twice at this seat — once from the
member count, once from `autocomplete`'s ~50-member literal union) and drag in
`hidden`/`width`/`height` overloads that collide with `ComponentCustomProps`.
`autocomplete` is typed `string`, which is also *more* correct: the HTML grammar is a
space-separated token list (`"shipping address-line1"`), never an enum.

`type` gains the five temporal members (T-6) with the fence stated in the type's own
comment. `TextareaResize` loses `"content"` (T-2).

**ONE cross-row consequence, found by its gate and repaired in-lane rather than left.**
`LabeledInputProps = Omit<InputProps, "class"> & …` (#57's file): with the natives out of
`InputProps`' runtime surface, `Omit` no longer carried them, so **LabeledInput stopped
declaring `required`** — and a wrapper cannot forward what it never received.
`labeled-field.contract.test.ts:108` caught it (`data-requirement` undefined), and Vue's
own warning named it: *"Property `required` was accessed during render but is not defined
on instance."* Repaired by re-stating `InputNativeAttrs` in the wrapper's own type with
the reason written there. The narrower alternatives were worse: `inheritAttrs: false` on
LabeledInput would have moved a consumer's `class` from the labeled-field root onto the
input, a silent behaviour change in a foreign row's component.

### 2.5 NumberField — the fold, and the ARIA that was announced on nothing

```
NumberField (.number-field IS the grid; size?: ControlSize = "md")
  ├ NumberFieldStep direction="decrement"
  ├ NumberFieldInput          ← aria-invalid / aria-required HERE only
  └ NumberFieldStep direction="increment"
```

- **`NumberFieldContent` retired** with the node it rendered: sole child at **5/5** mounts,
  so the root's `gap` separated nothing. The root takes the grid.
- **`NumberFieldIncrement`/`NumberFieldDecrement` → ONE `NumberFieldStep direction=`**
  (T-4). They were byte-twins modulo four tokens. Clean break, no alias — six-repo census
  reproduced at this seat: the only readers anywhere are `src/index.ts`,
  `tests/public-surface.spec.ts`, `demo/stories/forms/number-field.vue` and one a11y
  sweep. The public name diverges from Reka's pair, as T-4 accepts and records.
- **ARIA leaves the root.** `aria-invalid`/`aria-required` were stamped on a `div` with no
  role (F17) — announced on nothing, and duplicated on the spinbutton that did carry the
  role. They now live on the spinbutton only, and `number-field.contract.test.ts` asserts
  their **absence** from the root where it used to assert their presence.
- **The size axis it never had** (F9). It hard-pinned `--control-h-lg` (44) while calling
  itself the family's "md", one route away from a 40px Input. `size` threads from ONE prop
  through context to the spinbutton **and** both steppers.
- **The clearance is self-syncing and the mint is refused** (T-5). `calc(var(--field-control-height)
  + 0.25rem)` — `--field-control-height` is declared by `.field-control` on the *same
  element* and re-pointed there by `data-size`, and an `iconOnly` Button is square on the
  same `--control-h-*` cohort, so the room made for a stepper **is** the room the stepper
  occupies. `--number-field-step-h` stays refused: it would re-publish per rung what one
  element already resolves.
- **The steppers get a resting material.** `emphasis="quiet"` painted nothing at rest on a
  44×44 target (F11). `emphasis="secondary"` — the first of the two options §3.5 offers.
  The FOCUS half of F11 was **already cured upstream** and is not re-claimed: #80 moved
  `.focus-ring` to `outline` (`utilities/base.css:132`), so a `box-shadow: none` emphasis
  can no longer erase an indicator, which is what discharges G-F5's tab-walk clause.

### 2.6 Demo — the route that never existed, and the specimen that lied

- **`/forms/textarea` is now a route.** `demo/stories/forms/textarea.vue` has existed on
  disk **unrouted**: the one shell whose growth, floor, ceiling and handle are all its own
  had no page, so nothing about it could be measured on either engine. One manifest row.
  The story's `resize` grid drops `content` and gains a **rows-floor section** — `rows="3"`
  empty beside `rows="3"` grown past the floor — which is P7's specimen.
  **[2026-08-08 · CURE ROUND · GROUNDS CORRECTED (D5).** "unrouted … could not be measured
  on either engine" is FALSE. At HEAD `demo/stories/forms/inputs.vue:10-15` already
  rendered the SFC as a **FamilyTabs member** inside `/forms/inputs`, so it painted and was
  measurable there. The true grounds are narrower and stand on their own: it had **no
  DEDICATED route**, so it could not be addressed, deep-linked or shot as its own page —
  which is what a π cell needs. It remains a family member at `/forms/inputs`; this row
  ADDS the route, it does not move the story. `manifest.ts`'s comment is restated to match
  (§10 CURE-82-5).]
- **`/forms/number-field` rebuilt on the new API**, plus the `size` ×3 cel and **F19's
  cure**: the required-numeric specimen is **populated**. It used to render EMPTY wearing a
  full destructive border at rest with no asterisk — a field that had never been touched,
  telling the user it was wrong. It is now `required` and answered (no destructive paint),
  with a *separate* invalid specimen that is actually out of range and says why.
- **`/forms/inputs` gains a temporal-types section** — date · time · datetime-local — so
  T-6's five new members are visible rather than only type-checked.
- Four `default-value` call sites (dialog ×1, popover ×2, label ×1) move to `model-value`;
  two `resize="content"` sites drop the member. §3.5 said "3 demo sites"; the census at
  this seat is **4** for `defaultValue` and **4** for `"content"` — corrected, not copied.

---

## 3 · WHAT THIS SEAT REFUSED OR ROUTED, WITH GROUNDS

1. **Subpath mints `./input` + `./textarea`, the root-barrel `ControlSize` re-home, and
   the `./forms` retirement — NOT DONE HERE.** CWT-3 §2 **C-10** rules DAG:289 wins: *ONE
   batched export-surface cut* carrying all four tier-3 mints plus avatar/skeleton plus
   the `./forms` retirement in §3.5's order, and *ONE* `public-surface.spec.ts` re-pin —
   *"No lane bumps the pin solo."* §9 routes the same row to W-DAG-REDUCE / LIB-SEAM. The
   #83 precedent (§4 item 2) is followed exactly. `regen-exports.mjs` reproduces
   **exportKeys 66/66 EXACT**, unchanged.
   **What this row DID re-pin is narrower and is not the same act**: three components
   this lane retired and one it minted. Leaving that RED would leave a committed gate
   asserting exports that no longer exist — a false record, not a fence.
2. **The `.input-pill` + `.glass-wash[role=combobox]` strike — REFUSED, it is
   `control-surfaces.css`'s owner's** (§9 row 1; the file is still 154 lines with 124 dead
   ones and **0** element consumers). **G-F1's `rg -c "input-pill" src == 0` clause ships
   KNOWN-RED**, asserted in the direction this lane can own: no field shell, sheet or
   register mentions the class.
3. **`--input-on-glass`'s α and the recess it blocks — REFUSED, W-FROST's** (§9 row 2,
   *"both or nothing paints"*). The other half of that two-part kill has landed, so the
   remaining blocker is one token. **G-F2's `bg α < 1.0` and `field L* ≤ page L* − 3`
   clauses ship KNOWN-RED with #22 named.** This lane does **not** re-derive a transmissive
   fill locally: that is two mechanisms tracking one value — the exact class T-5 refuses —
   and it would green a gate the library's paint would not honour.
4. **`defined.css:43-44,79-80`'s list members — REFUSED, W-GLASS-DEDUP's** (§9 row 3;
   `.control-surface` is live on SelectTrigger and ToggleGroupItem, so striking it there is
   a two-lane paint change). What this row owns and did: `glass-defined` off the **four SFC
   class lists**, which is §4's own STRIKE line.
5. **Radius — REFUSED as drafted.** §3.2's "`--radius-control` = 10 everywhere" is
   superseded on disk by #23 W-RADIUS-ROLE's landed 7-role spine, which §9 names as this
   question's owner and which states the opposite at source. Nothing here re-litigates it;
   the register reads `--radius-pill` for the single-line box and `--radius-field` for the
   multi-line one, and the reasoning #23 left behind is carried into the new file.
6. **The top-rim 0.12 re-point — NOT DONE, and stated.** `--glass-rim-top` already
   resolves 0.1: the ruled direction is exceeded from the shared handle, and a local 0.12
   would be a second mechanism.
7. **`Label.vue:84`'s pristine-required destructive arm** (the family's fourth grammar) —
   **W-LABEL / #87 W-MARKS**'s (§9 row 9). G-F4's *"no pristine required field paints
   `--destructive`"* clause is green **in this lane's three routes**; the fourth grammar
   lives in another lane's file.
8. **`controlSizeClass` / `--control-pill-h`, the third size mechanism** — W-CONTROL-CHASSIS's
   (§9 row 10). Its sole live reader is `.input-bar`, outside this fence.
9. **`useAnimatedNumber` on STEP (T-8) — NOT BUILT, and this is a deviation, not an
   oversight.** The composable survives on disk (`composables/motion/number/useAnimatedNumber.ts`,
   root-exported), so T-8's survival condition holds. But the value it would animate is
   **Reka's own formatted string** (`Intl.NumberFormat`, locale-parsed, `de-DE` "1,5"), not
   a number this lane owns — reeling it means intercepting and re-formatting reka's
   display value on every step, which is a second formatting path beside the one the
   §2 clean bills tell this row not to re-open (*"reka locale parse/format/FormData"*). The
   held-repeat half — `data-pressed` sustained on reka's auto-repeat ramp — is Button's
   press register and already paints. **Routed as R82-4** with the mechanism question
   stated, rather than shipped as a lossy reel.

---

## 4 · GATES — six, born-RED, SEATS +0

`tests/components/field/forms-seam.test.ts` (270 lines). Nothing claims a §B.5 seat name;
this rides the tier-3 acceptance class exactly as #79/#80/#81/#83/#84's batteries do
(CWT-3 `:1871`; TERMINAL-ROSTER E-7 extended to tier-3). The halves that are resolved
pixels and composited colour — perimeter mass, field L\* against page, a rest→hover paint
delta, three distinct block-sizes, a 44×44 stepper's focus delta — are **§6's browser-seat
probes owed to #10** and are deliberately not faked: jsdom returns the unresolved `var()`
chain for every one of them.

**BORN-RED RECEIPT.** Run against `git show HEAD:` bytes materialised to a scratch tree,
with `ROOT` re-pointed and the `mount()` halves removed (HEAD's SFCs are not importable
without a checkout — their born-RED is HEAD's own committed assertions, e.g.
`number-field.contract.test.ts:128` asserting `aria-invalid` **on the root div**, which is
the exact byte G-F6 now convicts). Each of the six fails on its own substantive clause
against the REAL HEAD register, not on ENOENT:

```
× G-F1 · ONE REGISTER            expected '@layer components {\n    .field-contr…' not to match /(?:^|[\s;{])border:\s/
× G-F2 · PERIMETER + RECESS      expected '@layer components {\n    .field-contr…' to match /--ink-perimeter/
× G-F3 · ENGAGED                 expected '@layer components {\n    .field-contr…' to match /transition:/
× G-F4 · ONE INVALID/SIZE/RUNG   expected '@layer components {\n    .number-fiel…' not to contain 'invalid'
× G-F5 · TAB-WALK                expected '@layer components {\n    .field-contr…' to match /:focus-visible\s*\{[^}]*outline:\s*va…/
× G-F6 · GEOMETRY + HYGIENE      expected '@layer components {\n    .field-contr…' to match /padding-inline:\s*calc\(0\.75rem \* v…/
  Tests  6 failed (6)
```

Post-cut: **6 passed (6)**.

**Struck tautologies, all three §5 names, each replaced by the fact it was pretending to
check:**
- `input.contract.test.ts:16-20` and its `textarea` twin — class-equality certifying
  `glass-defined`, a class whose every channel the field's own shorthands reset. Asserting
  a class list is not asserting a material; the register's composition is now G-F1's, read
  off the sheet. What survives is the CONSUMER contract (a caller's class is merged).
- `number-field.contract.test.ts:133` — `not.toContain("input-pill")`, certifying the
  absence of a class no element carries.
- `number-field.contract.test.ts:128` — ARIA on the role-less div, **inverted** rather
  than deleted: it now asserts the root does NOT carry it and the spinbutton does.

**Nine adjacent gates re-keyed, because this cut moved their subject** — every one a
pointer, none a weakening:
`contrast-computed.test.ts:331` · `radius-role-canon.test.ts:275` · `radius-dialog-bind.test.ts:53` ·
`orphan-css-partial.test.ts:319,332` (the register's path) ·
`picker-lane.test.ts:69` and `color-mix-endpoints.test.ts:135` (both pinned to the deleted
sheet — re-pointed to `glass/control-edge.css` **so the clause follows its subject rather
than filtering to `[]` and passing vacuously**, ⊕²⁵) ·
`decorative-icon-sweep.test.ts` and `number-field.contract.test.ts` (the folded API) ·
`public-surface.spec.ts:167-170` (the three retirements + one mint).

**One gate convicted this row's own new file and was right.** #81's
`picker-lane` G3 (*"no lane comment cites a stylesheet that does not exist"*) fired on
`control-edge.css`'s HOME paragraph, which named the sheet this row had just deleted. The
prose is reworded to describe the move without naming the absent file — the cite is dead
the moment the file is, and a record that has to name it is not worth a false one.

---

## 5 · VERIFY GATE, VERBATIM

```
$ npx vue-tsc --noEmit
(no output — clean; exit 0)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 154 passed (160)
      Tests  11 failed | 1474 passed | 5 expected fail (1490)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ npm run demo:dist:build
✓ built in 1.58s

$ node scripts/regen-exports.mjs
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0
  >>> EXACT REPRODUCTION: YES
```

The gate-register receipt is **byte-identical** to ⊕⁶⁰'s banked line, `violations:1`
(#40's `pager.tabs.panel-linkage` `sourcePath`) and `drift:1` (#65's routed tags-input row)
included. **SEATS +0.** The brief's expected `violations:0` is superseded by ⊕⁶⁰'s own
record and by #40's still-uncommitted lane, exactly as ⊕⁵⁹ recorded.

**All 11 failures are FOREIGN and pre-existing**, reproducing ⊕⁶⁰'s banked set exactly:
**#40 W-PAGER ×10** (`pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `gate-register`
×3 · `carousel/contract` ×1 · `overfit-structure` ×1) and **#7's `stacked-url-filter` ×1**.
Zero lane files appear in any of them. The suite grew 1484 → 1490 (this row's six) and
passes grew 1468 → 1474.

**Outside the verify gate, and named so it is not discovered later.**
`tests/public-surface.spec.ts` has **2 remaining failures, both foreign staleness**, and
both were RED before this cut: `dist/` was last built **2026-08-06**, before #79/#81/#83
landed, so the style-closure clause is missing `card/card-scroll.css`,
`carousel/styles.css`, five `deck/styles/*`, `control-bit.css` and `overlay-plate.css`
(and now `control-edge.css`) — and the package/lock clause is another lane's uncommitted
`embla-carousel` pair. Both are the ⊕⁵⁹ item-3 class: **satisfied by BUILDING, never by
editing**, at the driver's `npm run build`. This row's own clause in that file — the root
runtime surface — is **green**.

**THE #81 LESSON APPLIED.** A class right in source and absent from every emitted sheet is
invisible to both the type plane and the unit suite. Read off the BUILT sheets
(`dist-demo/assets/*.css`) by fixed string, after the rebuild:

```
.glass-control-edge{box-shadow:var(--glass-rim-top), var(--glass-rim-bottom),
                    var(--control-edge-inner,0 0 #0000), var(--control-edge-ring,0 0 #0000)}

field-control{        3    control-edge-inner    2    field-sizing:content  1
glass-control-edge{   1    control-edge-ring     4    textarea-content-max  2
number-field{         1    --textarea-content-max:12lh                     ✓
--- struck (expect 0) ---
number-field__content 0
```

and the register's own resolved head, emitted whole: `border-style:solid;border-width:1px;
border-color:var(--field-control-ink);background-color:var(--control-surface-bg)` — the
longhand law reaching a consumer, which is the only place F1 could ever have been cured.
(`lightningcss` adds its own `-webkit-backdrop-filter` twin, as it does library-wide; this
row authored none, per §4's NOT-added list.)

---

## 6 · LOC — the SFC target hit exactly, the CSS honestly up

| measure | HEAD | post | Δ |
|---|---|---|---|
| lane **SFCs** | 7 | **5** | **−2** (§8's exact target) |
| lane files, in-lane | 18 | **15** | −3, plus one register relocated OUT to `styles/glass/` |
| lane CSS **rules** | 27 | 27 | 0 |
| lane CSS **declarations** | 69 | **83** | **+14** |
| `wc -l`, lane + the relocated register | 602 | 908 | +51% |

**§8 projected 571 → ≈465 and that is not what shipped; the number is reported rather than
massaged.** Two reasons, both structural and both stated in the spec's own frame:

1. **This lane's cure is ADDITIVE in CSS by construction.** §1's own diagnosis is that *"a
   de-animation shipped as a refactor"* — the register had **zero** transitions, hovers,
   media queries and animations. Putting a motion register, a guarded hover rung, a PRM
   arm, an outline focus, a real disabled treatment and a media query back costs
   declarations. The rule COUNT is flat (27 → 27) while the answers collapsed: three
   invalid grammars → **1**, three size mechanisms → **1**, three registers → **1**, two
   growth mechanisms → **1**.
2. **The register carries its derivation**, as every register in `src/styles/glass/` does,
   and multi-line `color-mix()` under this repo's prettier costs ~5 lines per expression —
   the identical accounting #83 recorded at §7.

The deliverable that IS in the diffstat: 3 SFCs deleted, 2 sheets deleted, `nativeProps`
×2 gone, `useVModel` ×2 + `defaultValue` gone, a wrapper node gone, a size axis and a
route gained.

---

## 7 · ROUTED — what this row opened and did not close

| # | obligation | owner |
|---|---|---|
| R82-1 | `.input-pill` + `.glass-wash[role=combobox]` strike (124 dead lines, 0 element consumers). **G-F1 clause 1 stays KNOWN-RED without it** | **W-CONTROL-REGISTER** / `control-surfaces.css`'s owner |
| R82-2 | `--input-on-glass` α → transmissive, and with it the A10 recess. **G-F2's two clauses + P2 are fenced on it.** The sibling half (`material.css`'s nested-cell blanket) has ALREADY landed, so this is now a **one-token** blocker, not two | **#22 W-FROST** |
| R82-3 | `--control-text{,-sm}` × `--ui-scale` global cure. **G-F4's `label:value = 0.887` clause is exact at `--ui-scale` 1 and BREAKS at 1.5** until `--control-label`'s source stops riding the scalar; the lane re-pointed locally and cannot close the coarse half alone | **PROPORTION adoption wave** (+ #68 for `--control-label`) |
| R82-4 | STEP value motion (T-8). NOT built, with grounds: the value on screen is Reka's `Intl.NumberFormat` output, so reeling it means a second formatting path beside the one §2's clean bills forbid re-opening. The question is *whether the reel belongs above or below the locale formatter* | **MOTION-CANON**, with #10's measured cells |
| R82-5 | `defined.css:43-44,79-80` list members (`.input-pill`, `.control-surface`) + the plate-vs-control register split. `.control-surface` is live on SelectTrigger and ToggleGroupItem, so the strike is a two-lane paint change | **W-GLASS-DEDUP** |
| R82-6 | subpaths `./input` + `./textarea`, root-barrel `Input`/`Textarea`/`ControlSize` parity, `./forms` + `src/forms.ts` retirement, and the ONE `public-surface.spec.ts` re-pin | **the C-10 batch** (DAG:289) |
| R82-7 | `Label.vue:84`'s pristine-required destructive arm — the family's FOURTH invalid grammar, and the only one left after this cut | **#87 W-MARKS** / W-LABEL |
| R82-8 | `controlSizeClass` / `--control-pill-h`, the third size mechanism; sole live reader `.input-bar` | **W-CONTROL-CHASSIS** (DAG §4.12) |
| R82-9 | consumer relay addenda. Type deltas: `defaultValue` ×2 removed · `TextareaResize` loses `"content"` · `type` gains 5 · `NumberFieldContent`/`Increment`/`Decrement` retire for `NumberFieldStep`. Visual deltas: field perimeter 1.5px@0.05 → 1px@0.48, pad-inline 16 → 12 (8 ≤768), font stops scaling with `--ui-scale`, focus moves to `outline`, disabled stops dimming the box. Plus keyframes.js's **UNDECLARED dependency** (7.0.0 in `node_modules`, absent from `package.json`/lock) and its `h-6 w-32` 24px Input | their tranches, per the consumer-updates ruling; aggregated at **#76 / LIB-SEAM** |
| R82-10 | dist `_shared/field/` orphans (the deleted sheets' `copyStyleAssets` residue) | **CT-7** |
| R82-11 | `gate-pattern.vue:6,170` cites an `[aria-invalid="true"]` selector that does not exist (doc-truth; the behaviour works through the chassis — T-7), and the `field-sizing` engine-truth line the P9 cell will produce | **W-STORY-COPY-CANON** |
| R82-12 | `DIRECTORY-SHAPE:277` corrections — the `field-surfaces` row is **moot** (deleted), and the number-field row is now `{NumberField, NumberFieldInput, NumberFieldStep}.vue` | **DIRECTORY-SHAPE** |
| **R82-13** | **THE `field/control.ts` HOMOGRAPH, disclosed not hidden.** §3.5's module-name strip is executed as written, so the repo now has `_shared/control.ts` (#83's — `ControlSize`, `ControlProps`, `controlStateAttrs`) **and** `_shared/field/control.ts` (this lane's chassis state) one directory apart. Every call site disambiguates on the `field/` segment and `vue-tsc` is clean, but the two names are one hop from each other in a grep. If the sweep wants one of them renamed, the field one is the cheaper move (4 importers) | **#61**, at the docstring/name sweep |
| **R82-14** | **THE `--control-edge-inner` / `--control-edge-ring` SLOTS ARE OFFERED, NOT IMPOSED.** SelectTrigger (#81) and ToggleGroupItem (#84) compose `.glass-control-edge` and can now append a well or a ring without re-listing the rim — which is what C-7 wanted and could not give them. Neither uses them yet; both currently declare their own focus/press lists. Named so the next lane to touch either does not re-derive C-7's workaround | **#81 / #84's owners; sweep at #61** |

---

## 8 · π OWED TO #10 — eleven cells, both engines, both modes

§6's P1-P11 at `/forms/inputs`, `/forms/textarea` (**new route, and P7's precondition**),
`/forms/number-field` and `/forms/labeled-field`; Chromium 150 on port 5400 **and** real
`safari-app` 26.4 (`scripts/safari-probe.mjs`, `pkill -f safaridriver` first;
Playwright-WebKit is never labelled Safari; no `getContext()` on a live canvas); paired
same-frame RED/GREEN artefacts.

**P2 is fenced, not owed-and-forgotten** — it cannot go GREEN until R82-2 lands, and it
must be re-shot after. **P4 is the one no seat has ever taken**: nothing in this library
has previously painted an `outline` on this register, on either engine, so the r10/pill
box's outline geometry at a 2px offset is unmeasured. **P5's coarse arm carries R82-3's
half-open invariant** and must record the label:value ratio at both `--ui-scale` values
rather than at 1 alone. **P9** (styles before AND after the JS entry) is the only cell that
proves F1 cured *for a consumer* rather than for this repo.

---

## 9 · FILES

```
NEW      src/styles/glass/control-edge.css                     56
NEW      src/components/_shared/field/control.css             297   (was field-control.css, 112)
NEW      src/components/_shared/field/control.ts               47   (was fieldControl.ts, 47 — byte-identical, renamed)
NEW      src/components/number-field/NumberFieldStep.vue       68
NEW      tests/components/field/forms-seam.test.ts            270
DELETED  src/components/_shared/field/field-control.css      (112)
DELETED  src/components/_shared/field/field-surfaces.css      (37)
DELETED  src/components/_shared/field/fieldControl.ts         (47)
DELETED  src/components/number-field/NumberFieldContent.vue   (14)
DELETED  src/components/number-field/NumberFieldIncrement.vue (29)
DELETED  src/components/number-field/NumberFieldDecrement.vue (29)
```

**[2026-08-08 · CURE ROUND · THE FENCE MOVED — every figure below this line is
SUPERSEDED by §10.7, which is the fence of record for the driver.** Two new-file line
counts changed (`control.css` 297 → **325**, `forms-seam.test.ts` 270 → **317**;
`control-edge.css` stays 56, byte-untouched), seven tracked per-file deltas changed, and
**one file joined the fence** — `src/components/tags-input/styles.css`, clean at the §0
baseline and therefore wholly this row's. Totals: **44 → 45 tracked files, +482/−527 →
+517/−528**, untracked new **738 → 813 lines**. No file LEFT the fence.]

`git diff --numstat`, **derived as final minus the §0 baseline**, per file — 44 tracked
files, **+482 / −527**:

```
 demo/stories/compositions/form-validation.vue        +1 /   -2
 demo/stories/containers/dialog.vue                   +1 /   -1
 demo/stories/containers/popover.vue                  +2 /   -2
 demo/stories/forms/inputs.vue                       +33 /    0
 demo/stories/forms/label.vue                         +1 /   -1
 demo/stories/forms/labeled-field.vue                 +1 /   -2
 demo/stories/forms/number-field.vue                 +77 /  -39
 demo/stories/forms/textarea.vue                     +26 /   -7
 demo/stories/manifest.ts                            +10 /    0
 src/components/_shared/field/field-control.css        0 / -112
 src/components/_shared/field/field-surfaces.css       0 /  -37
 src/components/_shared/field/fieldControl.ts          0 /  -47
 src/components/input/Input.vue                      +21 /  -30
 src/components/input/index.ts                        +1 /   -1
 src/components/input/types.ts                       +64 /   -8
 src/components/labeled-field/types.ts               +11 /   -2
 src/components/number-field/NumberField.vue         +14 /  -10
 src/components/number-field/NumberFieldContent.vue    0 /  -14
 src/components/number-field/NumberFieldDecrement.vue  0 /  -29
 src/components/number-field/NumberFieldIncrement.vue  0 /  -29
 src/components/number-field/NumberFieldInput.vue    +11 /   -7
 src/components/number-field/context.ts               +4 /    0
 src/components/number-field/index.ts                 +3 /   -8
 src/components/number-field/styles.css              +24 /  -16
 src/components/select/SelectTrigger.vue              +1 /   -1
 src/components/tags-input/TagsInput.vue              +3 /   -3
 src/components/textarea/Textarea.vue                +18 /  -28
 src/components/textarea/types.ts                    +30 /  -10
 src/index.ts                                         +7 /   -5   ← shared-dirty, see below
 src/styles/glass.css                                 +7 /    0
 src/styles/index.css                                 +6 /   -7   ← shared-dirty, see below
 src/styles/theme/radius.css                          +2 /   -2
 src/styles/tokens/sizing.css                        +11 /    0
 tests/components/a11y/decorative-icon-sweep.test.ts  +5 /  -11
 tests/components/input.contract.test.ts             +15 /   -8
 tests/components/number-field.contract.test.ts      +25 /  -29
 tests/components/select/picker-lane.test.ts          +8 /   -1
 tests/components/textarea.contract.test.ts          +21 /   -8
 tests/gates/orphan-css-partial.test.ts               +3 /   -3
 tests/public-surface.spec.ts                         +8 /   -3   ← shared-dirty, see below
 tests/styles/color-mix-endpoints.test.ts             +4 /   -1
 tests/styles/contrast-computed.test.ts               +1 /   -1
 tests/styles/radius-dialog-bind.test.ts              +1 /   -1
 tests/styles/radius-role-canon.test.ts               +1 /   -1   ← shared-dirty, see below
 44 files changed, +482 / -527   (final minus baseline)
 + 5 UNTRACKED new files (738 lines), listed above
```

**THE SHARED-DIRTY FENCE, stated per file rather than left to the driver.** The working
tree carried **103** dirty paths before this seat wrote a byte. Exactly **four** of them
intersect this row's fence, and this row's share of each is the delta above and nothing
else:

| file | this row's hunk | the file's OTHER hunks |
|---|---|---|
| `src/index.ts` | the `number-field` export block (−3 components, +1, +2 type rows) | #40 / #39 / others' uncommitted barrel work |
| `src/styles/index.css` | the §16 docstring row + the `field-surfaces.css` `@import` strike | other lanes' cascade-order edits |
| `tests/public-surface.spec.ts` | the four `NumberField*` runtime-surface lines | other lanes' pins |
| `tests/styles/radius-role-canon.test.ts` | **one line** — the register's path | #84's hunk 1 (24+/14−) and #35's slider-path re-point (⊕⁶⁰ item 4) |

The other 40 tracked files in the table were **clean at baseline** and are wholly this
row's. No `git add / commit / stash / checkout / restore / mv` was run at this seat;
files were edited in place only, and the two file MOVES were performed as
create-then-`rm` on the working tree, never `git mv`.

---

## 10 · CURE ROUND (2026-08-08)

**modelId: `claude-opus-5[1m]`** (CURE seat) · charter
`execution/2026-08-08-row82-field/CURE-ORDER-82.md`, the driver's ratification of the
Fable quartet adjudication (wf_c6359ba6-468). Five cures plus two ratified folds. Same
shared-tree law: **no `git add / commit / stash / checkout / restore / mv` at this seat
either** — every file edited in place, the born-RED mutations performed on a `cp -R`
COPY of `src/` in the scratchpad and never on the tree.

What the adjudication left STANDING is not re-litigated here: the selection, the C-5
execution, the 297-line register, the NumberField fold, the six born-RED gates at
SEATS +0, and the verify receipt — all reproduced at this seat and unchanged except
where a cure names them.

### 10.1 · CURE-82-1 (D1) — the floor was a fiction, and now it is a mechanism

**The finding, reproduced before the first byte.** Under `field-sizing: content` the
`rows` attribute is **wholly ignored**. Reproduced twice: once on the adjudicator's bare
repro (`fs-rows-test.html`, kept in the scratchpad — `rows` 1/3/8 all one line at 26px,
the non-`field-sizing` control honouring `rows="3"` at 74px), and once **on this row's
own shipped register**, live at `/forms/textarea`, by building three `.field-control`
textareas that carry the `rows` attribute and nothing else:

```
rows=1 → 75.19px   rows=3 → 75.19px   rows=8 → 75.19px      (attribute alone: ONE height)
```

Six sites asserted "rows is the floor" over that. The falsifier had been deferred to π
while the claim shipped as fact.

**The cure, and its two halves.** Neither half sizes anything alone.

| half | file:line | what it does |
|---|---|---|
| the stamp | `src/components/textarea/Textarea.vue:36-40` (`rowsStyle`) + `:55` (`:style="rowsStyle"`) | reads `attrs.rows`, writes `--field-rows` as an inline custom property, and **omits the style entirely when `rows` is absent** so the register's own default rules |
| the floor | `src/components/_shared/field/control.css:180-182` | `min-block-size: calc(var(--field-rows, 2) * 1lh + 2 * (0.75rem * var(--ui-scale)) + 2px)` |

Every term of that calc is read off the file it lives in, none is a remembered literal:
`0.75rem * var(--ui-scale)` is the rule's own `padding-block` (`:185`), doubled for two
sides; `2px` is the register's own `border-width: 1px` (`:100`), doubled, **because the
box is `border-box`** — measured. The default `2` is the HTML default `rows` a bare
`<textarea>` carries.

**Typed `attr()` REFUSED**, as ordered: it would read the attribute with no stamp at
all and fails on Safari, and a floor that exists on one engine is not a floor.

**The border term is the one place this seat went past the charter's literal formula,
and it is stated rather than buried.** With padding only, the floor lands exactly 2px
under the N-line content box: an empty `rows="3"` would paint 97.78px and step to
99.78px the instant its third line arrived — a 2px discontinuity at the precise boundary
the cure exists to make honest. Measured both ways; the border term removes it.

**AFTER, measured live on the shipped register** (Chromium 143, `/forms/textarea`,
port 5401, dark). Empty vs holding exactly N lines — **identical at every rung**, which
is the floor being exact rather than approximate:

```
                rows=1     rows=2     rows=3     rows=8
  empty         50.59px    75.19px    99.78px    222.75px
  N lines       50.59px    75.19px    99.78px    222.75px      Δ = 0 at every rung
  no stamp      75.19px    75.19px    75.19px    75.19px       ← the falsifier
```

The last row is the cure's own falsifier held in place: strip the stamp and the ladder
collapses to the default-2 height, which is exactly the defect. Rung spacing is
24.59px = `1lh`. On the page itself: `rows="4"` → 124.38 · `rows="5"` → 148.97 ·
no `rows` → 75.19. Screenshot `row82-D1-rows-floor-CURED.png` (scratchpad).

**Emitted, off the BUILT sheet** (`dist-demo/assets/*.css`, after
`npm run demo:dist:build` — the #81 lesson): `min-block-size:calc(var(--field-rows,2) *
1lh + 2 * (.75rem * var(--ui-scale)) + 2px)`, intact through `lightningcss`.

**The six asserting sites, rewritten to the shipped truth** (re-derived by content, not
by the charter's line numbers, which had drifted). Each now names the stamp as the
mechanism instead of implying the attribute is:

| site | line at this cut | what it now says |
|---|---|---|
| `src/components/_shared/field/control.css` | `:157-178` (the GROWTH comment) | the engine never consults `rows`; the stamp is the mechanism; every calc term derived; `attr()` refused with its reason |
| `src/components/textarea/Textarea.vue` | `:26-35` | the attribute rides `$attrs` for the platform AND is stamped for the sheet — "the CSS half of the same fact, not a second source for it" |
| `src/components/textarea/types.ts` | `:7-13` (`TextareaResize` doc) | "floored at `rows` line boxes via the `--field-rows` stamp (the attribute itself is ignored under `field-sizing: content`)" |
| `src/components/textarea/types.ts` | `:19-22` (`TextareaNativeAttrs` doc) | drops "reaches the element unmediated"; states both destinations |
| `src/styles/tokens/sizing.css` | `:113-115` | "floored at `rows` line boxes — via the `--field-rows` stamp, since `field-sizing` ignores the attribute itself" |
| `demo/stories/forms/textarea.vue` | `:22-27` + the §"rows is the floor" blurb + the §"resize contract" blurb | the two frames are named as the stamp's own falsifier |
| `demo/stories/manifest.ts` | `:529` (the story description) | "floored at rows line boxes" |

**The node-readable half is bound in G-F6** (`tests/components/field/forms-seam.test.ts:217-230`)
— the `min-block-size` calc AND the shell's stamp, both, because either alone is inert.
**P7's paint half stays with the π seat**; the measurements above are this seat's
evidence for the cure, not a claim on P7's cell.

### 10.2 · CURE-82-2 (D2) — the gate that could not see a deleted slot

G-F6 counted `box-shadow:` occurrences in `control-edge.css` and asserted `=== 1`. That
count is 1 whether the list ends in two slots, one, or none — so deleting either C-7 leg
stayed green, and the entire substance of §2.1 was unguarded.

**Extended** at `tests/components/field/forms-seam.test.ts:237-245`: the single
declaration is extracted and **both** `var(--control-edge-inner` and
`var(--control-edge-ring` are asserted **inside it**. The occurrence count is kept — it
still forbids a second declaration — and the legs are what it could not see.

**BORN-RED, per leg, on a scratch COPY** (`cp -R src` → scratchpad; the real file never
opened for write, verified byte-identical to the copy at every restore):

```
0 · pristine copy                                   Tests  3 passed (3)

A · delete `var(--control-edge-inner, 0 0 #0000),`
    × CURE-82-2 · the rim list still ends in BOTH consumer slots
      AssertionError: expected 'var(--glass-rim-top),\n            va…'
                      to contain 'var(--control-edge-inner'
                                                    Tests  1 failed | 2 passed (3)

B · delete `var(--control-edge-ring, 0 0 #0000)`
    × CURE-82-2 · the rim list still ends in BOTH consumer slots
      AssertionError: expected 'var(--glass-rim-top),\n            va…'
                      to contain 'var(--control-edge-ring'
                                                    Tests  1 failed | 2 passed (3)

restored · byte-identical to pristine AND to the real file
                                                    Tests  3 passed (3)
```

**The proof that the OLD clause was blind is in the transcript itself**: under both
mutations the occurrence-count assertion — which runs first — PASSED, and only the new
leg clause fired.

### 10.3 · CURE-82-3 (D3) — PRIMARY branch taken; the law now holds on the fourth shell

**Branch: the PRIMARY (slot) cure, not the fallback.** The slot fix does not regress
tags-input's paint — it strictly ADDS legs — so the exception-with-route was never
reached.

`TagsInput.vue:58` composes `.glass-control-edge`, and `tags-input/styles.css:19,24`
REPLACED the whole `box-shadow` list at invalid and focus. "Declared exactly once /
append by construction" was false there, and the consequence is a paint defect, not a
style-guide point.

**BEFORE — measured live** (`/data/tags-input`, port 5401, dark; states driven the way
the component drives them, read after the transition settles):

```
rest      5 legs   rim-top · rim-bottom ×2 · well(inset 0 1px 2px α.08) · ring(0 0 #0000)
invalid   1 leg    the invalid ring ONLY            ← rim GONE, well GONE
focus     2 legs   the focus ring's two legs ONLY   ← rim GONE, well GONE
```

The register's own `--control-edge-ring` was already correctly re-pointed underneath;
the shell's whole-list declaration simply overwrote the composed list.

**THE CURE** (`src/components/tags-input/styles.css:17-35`): both rules speak into the
slot — `--control-edge-ring: var(--invalid-ring)` and
`--control-edge-ring: var(--focus-ring-shadow)` — and the two whole-list declarations
die. Their `border-color` legs are untouched.

**AFTER — same probe, same page:**

```
rest      5 legs   unchanged
invalid   5 legs   rim ×3 · well · the invalid ring (0 0 0 2px destructive/0.35)
                   border-color = --destructive                    RING **and** RIM
focus     6 legs   rim ×3 · well · focus ring 0 0 0 2px + 0 0 8px  RING **and** RIM
```

Paired screenshots `row82-D3-tagsinput-BEFORE.png` / `-AFTER.png` (scratchpad).

**The guard extends to the shell** (`forms-seam.test.ts:247-266`): every rule in
`tags-input/styles.css` whose SUBJECT compound is `.tags-input` (not `.tags-input__*`)
is forbidden a `box-shadow`, and both slot re-points are asserted positively. The
CHIP's own active ring is a different element that does not compose the register and is
deliberately **not** covered — verified as a control.

**BORN-RED, per rule, on the scratch copy:**

```
E · invalid rule re-declares the whole list (the pre-cure bytes)
    × CURE-82-3 · no rule whose subject is the tags-input shell declares box-shadow
      AssertionError: expected '\n        border-color: var(--destruc…'
                      not to match /box-shadow:/          Tests  1 failed | 2 passed (3)

F · focus rule re-declares the whole list
    × CURE-82-3 · no rule whose subject is the tags-input shell declares box-shadow
      AssertionError: expected '\n        border-color: var(--color-a…'
                      not to match /box-shadow:/          Tests  1 failed | 2 passed (3)

control · the CHIP's box-shadow left in place, untouched
                                                          Tests  3 passed (3)
```

**tags-input is therefore the FIRST consumer of the slots R82-14 offers.** That route
is unchanged — it names #81's SelectTrigger and #84's ToggleGroupItem, both of which
still hand-list — but it is no longer a hypothetical: the idiom now has a live consumer
outside the register that minted it.

### 10.4 · CURE-82-4 (D4) — the stale composite path

`src/components/select/SelectTrigger.vue:39-40`'s comment named
`_shared/field/ glass/control-edge.css` — a path fused from the sheet's old home and its
new one, pointing at neither. The `_shared/field/` fragment is deleted; the cite now
reads `glass/control-edge.css`, which is where the file is.

### 10.5 · CURE-82-5 (D5) — the record's grounds, restated truthfully

`demo/stories/manifest.ts:518-524` claimed the textarea story was unrouted and
"could not be measured on either engine". **Verified false on disk**:
`git show HEAD:demo/stories/forms/inputs.vue` renders it as a **FamilyTabs member** at
`/forms/inputs` (`:10-15` + `:197`), and still does at this cut.

Restated at both sites — the manifest comment (`:518-524`) and RECORD §2.6's dated
bracket — to the narrower claim that is TRUE and sufficient: **no DEDICATED route**, so
the story could not be addressed, deep-linked or shot as its own page, which is what a π
cell needs. It stays a family member; the row adds the route.

### 10.6 · The two ratified folds

**FOLD 1 — the focus ring's resting alpha** (`control.css:124-130`). `outline-color`'s
initial value is `currentColor`, so the register's `outline-color` transition ran the
ring from **fully opaque `--foreground`** down to the 0.48 ink — Challenger A caught it
mid-flight at 0.571, above its own destination. One declaration:
`outline-color: transparent`, so the ring fades IN. Interpolation is premultiplied, so
zero alpha does not drag the ring through a colour.

Measured on `/forms/inputs`:

| | resting `outline-color` | at focus +40ms | settled |
|---|---|---|---|
| before | `rgb(233, 230, 226)` (α **1.0**) | flashes above target | α 0.48 |
| after | `rgba(0, 0, 0, 0)` (α **0**) | α **0.070**, rising | α 0.48 |

Emitted as `outline-color:#0000` on the built sheet.

**FOLD 2 — the "ships KNOWN-RED" wording** (`forms-seam.test.ts:19-31`). The header said
two clauses "SHIP KNOWN-RED", which reads as if the checks below were failing. They are
not: G-F1 and G-F2 are **green as written**, because each asserts only the direction this
lane owns. What stays open is the SPEC gate, until W-CONTROL-REGISTER and #22 W-FROST
cut. The header now says exactly that and keeps the owners named.

### 10.7 · The fence, corrected — THIS is the driver's list

Every path this cure seat touched, docs included. Nothing else was written.

**Code + demo + gate (9):**

| file | §9 said | now | why |
|---|---|---|---|
| `src/components/_shared/field/control.css` | NEW, 297 lines | NEW, **325** | the floor + its comment · FOLD 1 |
| `src/components/textarea/Textarea.vue` | +18 / −28 | **+30 / −26** | the `--field-rows` stamp · prose |
| `src/components/textarea/types.ts` | +30 / −10 | **+33 / −10** | two docstrings |
| `src/styles/tokens/sizing.css` | +11 / 0 | **+12 / 0** | the ceiling's comment |
| `src/components/tags-input/styles.css` | *(absent — not in the fence)* | **+12 / −2**, NEW ROW | CURE-82-3; clean at the §0 baseline, so wholly this row's |
| `src/components/select/SelectTrigger.vue` | +1 / −1 | **+2 / −2** | CURE-82-4 |
| `demo/stories/forms/textarea.vue` | +26 / −7 | **+29 / −7** | prose |
| `demo/stories/manifest.ts` | +10 / 0 | **+13 / 0** | CURE-82-5 + prose |
| `tests/components/field/forms-seam.test.ts` | NEW, 270 lines | NEW, **317** | CURE-82-2 · D1's half · D3's guard · FOLD 2 |

`src/styles/glass/control-edge.css` is **byte-untouched** at 56 lines — verified by
`diff` against the scratch copy after every mutation.

**Totals, superseding §9's:** **45 tracked files, +517 / −528** (final minus the §0
baseline) · **5 untracked new files, 813 lines**.

**Docs (2), both pre-commit:** this `RECORD.md` and `PASTE-BLOCKS.md`.

**Nothing else.** No `src/index.ts`, no `src/styles/index.css`, no
`tests/public-surface.spec.ts`, no `tests/styles/radius-role-canon.test.ts` — the four
shared-dirty files are untouched by this seat, so §9's split still describes them exactly.

**One self-inflicted event, disclosed.** A `prettier --write` run at this seat resolved
a config OUTSIDE the repo (`~/.prettierrc.json`, printWidth 88 — this repo carries no
prettier config, and HEAD's `sizing.css` is not prettier-clean, so formatting is not
enforced here). It collapsed deliberate column alignment across `sizing.css` and
re-wrapped hand-formatted blocks in three other files. **Every byte of that collateral
was reverted** — `sizing.css` reconstructed from `git show HEAD:` plus the row's own
token block, the rest restored by hand — and the per-file deltas above are the state
AFTER the revert. Read it as the standing lesson: this repo's formatting is authored,
not generated; run no formatter across it.

### 10.8 · VERIFY, verbatim (post-cure)

```
$ npx vue-tsc --noEmit
(no output; EXIT=0)

$ npx vitest run tests/components/field/forms-seam.test.ts
 Test Files  1 passed (1)
      Tests  6 passed (6)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 154 passed (160)
      Tests  11 failed | 1474 passed | 5 expected fail (1490)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ npm run demo:dist:build
✓ built in 1.41s

$ node scripts/regen-exports.mjs
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
```

**The 11 failures are the banked foreign set, unchanged and unclaimed** — **#40 W-PAGER
×10** (`pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `gate-register` ×3 ·
`carousel/contract` ×1 · `overfit-structure` ×1) and **#7's `stacked-url-filter` ×1**.
The gate-register receipt is byte-identical to ⊕⁶⁰'s banked line, `violations:1` (#40's)
and `drift:1` (#65's) included. **SEATS +0** — G-F6 gained clauses, not a seat.

**The boot-graph lesson fired again, exactly as the charter predicted.** The first
post-cure run showed **13** failures: `boot-graph`'s "dist-demo is NEWER than every
source" arm (the standing mtime class — cured by `npm run demo:dist:build`, never by
editing) and **one transient** `dropdown-menu.contract` portal-focus flake, which passes
in isolation (12/12) and did not reproduce on the next full run. After the rebuild:
exactly 11, and the set above.

`npm run build` was **not** run — #40's uncommitted lockfile keeps it RED, and
`demo:dist:build` is the honest arm.
