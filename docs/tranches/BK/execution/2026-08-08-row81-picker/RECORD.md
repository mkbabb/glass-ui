# BK #81 — W-PICKER (select · combobox) · EXECUTION RECORD

**Date** 2026-08-08 · **Base HEAD** `73ab63b4` · **Seat model** `claude-opus-5[1m]` (Opus 5, 1M)
**Spec of record** `docs/tranches/BJ/addenda/2026-07-24-refinement/COMPONENT-WAVES-TERMINAL-3.md`
§LANE select-combobox (`:327-433`), cited whole · **TR** `TERMINAL-ROSTER.md:231` (wins on
divergence) · **priors** `CURES.md` C-11/C-12/K-10/K-11.

---

## §0 · SELECTION + GROUNDS

Cursor `EXECUTION-PROGRESS.md` ⊕⁵⁷ (`:2056`): *"the rest of the tier-3 band (#81 · #83 · #84 ·
#85 · #86 · #87 · #88 · #89) keeps the single satisfied precondition #68 and is selectable in TR
order."* **#81 is first of that band in TR order.** Its own gates cell records the one edge that
could have held it — `#89's contract BANKED (CURES.md §2) — UNBLOCKED` — and S-9 states the same
from the other side (*"the four blocked terminals (#81/#86/#82/#47-sever) UNBLOCK"*). Not
ASK-gated, not owner-gated, and the lane is **clean in the working tree**: `git status --porcelain`
matched nothing under `select|combobox|picker|overlay|field-surface`, so no seat was mid-flight in
it. Every earlier-numbered row was re-derived and is gated: #21 (#17, Φ4-UNSTARTED) · #25
(rides-clause) · #22 (CURE-CUT) · #32/#33/#35/#40/#71 (uncommitted in this tree) · #34 (after #33)
· #42/#44/#45/#47/#48/#52 (DAG edges) · #49/#50/#51/#53 (ASK) · #58/#73 (ASK g11) · #67 (R-7
footage) · #74 (inside #88).

> **Base drift, stated.** The task named HEAD `4917a042`; the tree was at `73ab63b4` (⊕⁵⁵/⊕⁵⁶/⊕⁵⁷
> landed #72 · #79 · #80 in between). Selection was re-derived against the live cursor, not the
> named base.

---

## §1 · WHAT THIS WAVE IS

The gutter had never existed. Not "regressed", not "wrong value" — the class token that reserves
the indicator's 28px in every Select option and every Command row **had no rule in any stylesheet
the library or the demo ever produced**, so the selected-state dot painted on top of its own
label. The value was right in source the whole time; the *shape* of the source was the defect. That
is this lane's subject, and everything else follows from taking it seriously: if one register can
be invisible for this long, the lane's other five registers are worth checking too, and they were
each carrying a second authority — two divider inks, two bounds, two pads, two plates, two
dismissal paths, two names for one tint.

---

## §2 · §DEFECTS — every mechanism reproduced on disk at this seat

| id | defect | mechanism, verified | sev |
|---|---|---|---|
| **F1** | **the indicator gutter has never painted** | `rowClass` returned `` `${BASE} ${ind === "start" ? "pl-7 pr-2" : "px-2"}` ``. **Root A (demo):** `demo/demo.css:96` scanned `_shared/*.ts`, single level — the module lives at `_shared/menu/`. **Root B (library):** `vite.utility-emit.ts:105`'s candidate tokenizer walks quoted runs with ONE character class for `"`, `'` and backtick, so a template literal desynchronizes every pair after it. (Line corrected at the cure round from the banked `:87`; detector `grep -n strRe vite.utility-emit.ts` → **105**, the `const strRe = /["'\`]([^"'\`\n]*?)["'\`]/g` declaration. `:87` is `classish`, a different regex.) Falsifier, measured in the built sheet **before** the cut: `.pl-7` → **0 rules**. After: `.ps-7{padding-inline-start:calc(var(--spacing) * 7)}` → **1 rule**. | **CRIT** |
| F3/F4 | dead `origin-` spelling; shadcn residue | the bloom anchor was a utility that never emitted; it is now a precompiled `transform-origin` beside the plate | HIGH |
| **F29** | **the attribute sink** | `Command` declared `inheritAttrs: false` with **no attrs bind**. Twelve reka `ComboboxRoot` props were accepted by Vue and dropped. Falsifier: the repo's own contract test passed `multiple` and asserted a SCALAR emission — and passed, because the prop never arrived | HIGH |
| **F26+N2** | **three-surface false record** | `src/index.ts:224`, `src/components/index.ts:17` and `MIGRATION.md:1286` all named `<Combobox>` (+ `ComboboxAnchor`/`List`/`Item`) as the MultiSelect survivor. Detector: `rg -n "export .*\bCombobox\b" src/index.ts src/forms.ts` → **0 matches**, at every version. **CAVEAT, stated at the cure round: that detector is LINE-SHAPED and cannot see a multi-line `export { … }` block** — `src/index.ts:146-154` lists nine `type Combobox*` names one per line, and the regex returns 0 whether they are there or not. It is corroboration, not proof. The substantive claim is verified by the shape-free read instead: `grep -n Combobox src/index.ts` → only `type` entries (`:146-154`) plus one prose line (`:234`), **zero component exports** — no `<Combobox>`, `ComboboxAnchor`, `ComboboxList` or `ComboboxItem` VALUE is exported at any version | **MED-HIGH** |
| F31 | `--select-dot-color` overfit | a second name for what the item's own `color` already is | LOW |
| F33 | selected option's heavy stroke | loudest mark on the panel; the 0.12 fill carries state | MED |
| — | **`select.css` phantom, ×7 on disk** | cited at `SelectContent.vue` ×4, `SelectTrigger.vue` ×1, `offsets.css:75`, `configurator/styles.css:175`. The file has never existed (spec said ×8; **7 is the disk figure**) | MED |
| — | `[data-slot="combobox-list"]` | styled a slot **nothing emits** — `CommandList` writes `command-list`. Spec said 2 selector lines; **1 on disk** | MED |
| — | two divider inks | Select spelled `12%`, Command read `var(--border)` — same line, same plate | MED |
| — | two bounds | `--select-content-max-h` (`min(24rem,60dvh)`) beside `--overlay-max-block` (`60vh`) | MED |
| — | **`.command__item` re-declared 8 of its 10 declarations against `rowClass`'s own** | figure corrected at the cure round (banked: "9"). Detector: `git show HEAD:src/components/command/styles.css` `:89-100` holds **10** declarations — `position` · `display` · `width` · `align-items` · `padding` · `cursor` · `outline` · `color` · `font-size` · `user-select`; **8** of them restate row-register tokens (`relative` · `flex` · `w-full` · `items-center` · `py/px` · `cursor-default` · `select-none` · `text-dropdown`). The other **two** are not re-declarations and are worth naming separately: the bare `outline: none` (no register counterpart — it KILLED the focus ring, #80's routed defect (2)) and `color: inherit`. All ten shipped **UNLAYERED** via `<style src>`, which is what let them beat the class list outright | MED |
| — | K8 plate-in-a-plate | `<Command>` composed `glass-floating` unconditionally, so inside `CommandDialog` one blur read the blur beneath it | MED |

---

## §3 · §THE DESIGN — what landed

**3.1 The gutter, cured at the CLASS level, not the instance.**
`_shared/menu/menuRowClass.ts` → **`_shared/menu/rowClass.ts`**, renamed in place (A6 — zero
relocation LOC; a `select/`-homed register consumed by `command` would mint the sibling-internals
edge the boundary law forbids). The module is now a **frozen record of two COMPLETE literal
strings** keyed by indicator. No template literal, no `+`, no `.join(` — the two rows share a
prefix *on purpose*, and `rowClass.test.ts` pins that neither is assembled. Logical `ps-7 pe-2` /
`px-2`, so an RTL listbox reserves the gutter on the correct side. `demo/demo.css` widens to
`_shared/**/*.ts` — **that glob only** (A5: blanket-widening trips the extractor on
`components/blob/shaders/*.wgsl.ts`; `_shared` contains no shader, asserted).
**`CommandItem` calls `rowClass()`** — consumer #2 lands in the same cut, so the ≥2 bar is met at
landing without moving a byte.

**3.2 One authority per question.** Divider → `.glass-menu-divider` in `_shared/menu/menu.css`,
one ink, `--ink-seam` 0.08, composed by both separators (`var(--border)` retires in-lane; the
recipe deliberately keeps only the bleed, because `command/styles.css` ships **unlayered** and
re-declaring `background` there would beat the shared class outright). Bound →
`--overlay-max-block: min(24rem, 60dvh)`, `--select-content-max-h` retired, `60vh`'s
largest-viewport dishonesty with it. Pad → `:root --overlay-pad: 12px`; `--panel-padding`'s in-lane
read retires; **`×1.272` dies in-lane**. Plate → **`styles/glass/overlay-plate.css`** (C-11/K-10),
the **203**-line `field-surfaces.css` payload relocated whole; that file keeps `.glass-control-edge`
alone (28 lines) for **#82**, whose byte it is (C-5). (203, not the banked 202 — detector:
`git show HEAD:src/components/_shared/field/field-surfaces.css | wc -l` → **203**;
`wc -l` on the two live files → **28** + **186**.)

**3.3 The option radius is the LAW, not a literal (C-12/K-11).**
`--overlay-viewport-inset: 4px` and
`--overlay-option-radius: calc(var(--radius-card) - var(--overlay-viewport-inset))`, declared on
the plate and read by the viewport and its rows. Resolves **12** at the ruled 4/4 — the banked 10
implied an inset of 6 the same listbox never had — and written as the subtraction so retuning
either end keeps the corners concentric instead of silently breaking them.

**3.4 Public surface.** `variant` / `size` / `fieldHue` **deleted, no aliases**. `hideIndicator`
**KEPT** (7 sites / 2 repos — TR). `SelectScrollUp/DownButton` → one **`SelectScrollButton
direction`**, published, `min-h-11` = 44px (they were two SFCs reachable from neither barrel, so
the affordance could not be restyled at all). `SelectValue`'s slot is **conditional** — that is the
whole repair: it used to hand reka a default slot unconditionally, shadowing reka's own label
rendering, which is why it then needed a fallback re-implementing it and a validator throwing on a
value only reka could produce. `SelectItem`'s dead guard struck for the same reason.
`Combobox*` prop types re-exported from `./command`. Retirement notes rewritten honest at all three
surfaces.

**3.5 `Command`.** `defaultOpen: true` replaces the `open: true` **latch** (a literal on every
render means reka can never own the axis); `v-bind` forwards attrs; the scalar guard **widens for
the array arm** and still refuses a genuine non-scalar (both bites asserted). K8: the root is a
**chassis**, the host owns the material — and the demo's four hand-rolled halves of a plate
(`rounded-[var(--radius-card)] border-border/50 bg-card/70 backdrop-blur`) become `glass-floating`.

---

## §4 · TWO FINDINGS THE ORDER DID NOT PREDICT — both live, both fixed here

**(1) The `open` axis was latched in BOTH directions, and the second latch was the cure's own.**
Removing `open: true` did not free the axis: `open?: boolean` with no default compiles to
`{ type: Boolean }`, and **Vue casts an ABSENT Boolean prop to `false`**. Measured at the seat —
`ComboboxRoot` received `{"open": false, "defaultOpen": true}` and reka's
`passive: props.open === void 0` therefore read *controlled*, pinning the palette **shut**. Two
edits, both stated: `withDefaults(..., { open: undefined, disabled: undefined })` and `open`
**omitted from the bind** rather than passed as `undefined`. Post-fix: `{"defaultOpen": true}`,
list renders, Escape reports.

> **THE DISCHARGE CLAIM, RESTATED — the cut found the class and cured HALF of it.** As banked,
> this paragraph called the `Collapsible.vue:51` + `Command.vue:11` non-undefined-default class
> (`PROPORTION §7b row 6`, routed to a correctness seat) **"discharged here, second site"**. That
> was FALSE at the cut and is corrected rather than quietly restated: `CommandDialog.vue` carried
> the identical class, uncured, in the same fence — `CommandDialogProps extends DialogProps`, so
> `open` · `defaultOpen` · `modal` · `unmountOnHide` are four bare optional booleans, and the
> component spread its whole props object into `<Dialog>`. Measured at the **cure seat**
> (2026-08-08, `claude-opus-5[1m]`), an uncontrolled `<CommandDialog default-open>` handed
> `DialogRoot` `{open: false, modal: false, unmountOnHide: false}` and `ComboboxRoot`
> `open: false`, and rendered **0 options** — the same latch as `Command.vue`'s, one level up and
> louder, since it also inverted two reka defaults that are `true`. **`C1` cures it** with the
> same two edits (`open`/`defaultOpen`/`modal`/`unmountOnHide` defaulted `undefined`, each
> **omitted from the spread when unset**, and the palette's `open` omitted from the `<Command>`
> bind). Post-C1, measured the same way: `DialogRoot` `{open: undefined, modal: true,
> unmountOnHide: true}`, `ComboboxRoot` `{open: undefined, defaultOpen: true}`, **2 options**. So
> the honest statement is: **§7b row 6 is discharged in this lane at TWO sites — `Command.vue`
> at the cut, `CommandDialog.vue` at C1** — and the class stays open elsewhere in the library
> (`Collapsible.vue:51` is the correctness seat's own row).
>
> `<Dialog>` itself is NOT a third site, and the ground is recorded so nobody "fixes" it into
> one: reka's `useForwardProps` forwards only the keys ASSIGNED on the vnode plus non-undefined
> defaults, so a prop absent from `<Dialog>`'s tag never reaches `DialogRoot` — measured, three
> mount shapes (absent · explicit `undefined` · `v-bind` of a bag without the key) all yield
> `open: undefined` with reka's own `modal`/`unmountOnHide` defaults intact. The fault needs a
> wrapper that SPREADS its resolved props, because a spread cannot tell an absent prop from a
> false one. Both cured sites do exactly that; `<Dialog>` does not.

**(2) CWT-3 §3.5's "reka's dismissable layer owns Escape" is FALSE for a nested layer.**
Deleting `dialogContext.ts` on that clause's authority left Escape closing the palette's list and
**leaving the dialog standing open around an empty plate** — reka mounts a dismissable layer for
the combobox content *inside* the one the dialog mounts, and the inner one handles the key first.
The clause is refused with grounds. The structural answer replaces the side channel rather than
restoring it: inside a dialog the palette is **controlled by the dialog** (`:open` +
`@update:open`), so the inner layer's dismissal *request* is routed to the single owner through the
component's own declared emit. One axis, one dismissal path, no provide/inject.

---

## §5 · §GATES — SEATS +0

Six lane gates (A10's Opus consolidation). The **node-readable halves of G1 · G3 · G4 · G6** land
as `tests/components/select/picker-lane.test.ts` (10 cases) + `tests/components/_shared/menu/
rowClass.test.ts` (8 cases). **G2 GUTTER and G5 PAINT-FLOOR are not written here** — they are
computed geometry and colour, they belong at a browser seat, and a jsdom stand-in for them would be
a green light with nothing behind it. They are **owed to #10** (§7).

Nothing claims a §B.5 seat name; the lane rides the tier-3 acceptance class exactly as #79 and #80
did. **Register receipt byte-identical pre→post** (§6).

**BORN-RED, measured on a pristine `git archive HEAD` tree** (`73ab63b4`, node_modules symlinked):

```
     × G1 — no spacing token is authored inside a template literal
     × G1 — the demo's _shared source glob is recursive
     × G3 — no lane comment cites a stylesheet that does not exist
     × G3 — every [data-slot] selector in src CSS has at least one emitter
     × G4 — the row register has ≥2 consumers and no lane recipe re-declares it
     × G4 — one divider ink, one plate bound, no φ multiplier or vh in the lane
     × G4 — the option radius is the LAW, not a literal
     × G6 — no wrapper declares a bare optional boolean without an undefined default
     × G6 — Command forwards attrs rather than sinking them
     × G6 — every public type the lane's components declare ships on its subpath
      Tests  10 failed (10)
```
**10/10 RED at HEAD, 10/10 green here.** `rowClass.test.ts` is born-RED at HEAD by
non-resolution (its subject module did not exist).

> **Two of those case names changed at the cure round (C2), and the list above is the CUT's.** The
> attrs case is now *"G6 — the lane's roots omit an unset axis rather than binding it false"* (it
> asserts the omit-when-unset shape on `Command` **and** on all four `CommandDialog` axes), and the
> boolean-default case keeps its name but replaces its two `Command.vue` greps with a detector that
> resolves each wrapper's props interface through its `extends` chain. The battery is still **10
> cases**; §13 carries their born-RED on the pre-C1 bytes.

> **The first G1 detector was WRONG and is recorded rather than quietly fixed.** It looked for a
> token *after* a `${…}` hole and passed at HEAD — but the real defect spells the tokens *inside*
> the ternary (`${ind === "start" ? "pl-7 pr-2" : "px-2"}`). A gate that goes green against the
> defect it was written for is worse than no gate. Rewritten to convict any interpolated literal
> containing a spacing token; it then reds at HEAD as it must.

**MUTATION BITES.** Pre-cure body restored to `rowClass.ts` on the pristine tree → **4 RED**,
including both explicit BITE cases. In-tree, each reverted byte-exact:

| mutation | result |
|---|---|
| option radius re-minted as the literal `12px` | 1 failed \| 9 passed |
| a second divider authority (`var(--border)`) re-added | 1 failed \| 9 passed |
| the attrs forward deleted (back to the sink) | 1 failed \| 9 passed |
| — all three reverted — | **10 passed (10)** |

**LANDED-GATE COLLISION, ruled.** `tests/styles/glass-subtlety.test.ts`'s template-nesting arm
pinned `componentPlate.get("Command") === true`, naming `<Command>` inside `<DialogContent>` as
*"the library's one real depth-2 nest"*. K8 deleted that nest, so the pin is **inverted into an
assertion of the cure** (`.toBe(false)`) and its two live anchors re-pointed to `DialogContent` +
`SelectContent`. Measured at the cut: **no file under `src/` reaches depth 2 through the hop at
all.**

---

## §6 · VERIFY GATE — verbatim

> **SUPERSEDED IN PART by §13.6.** The figures below are the CUT's, taken before the cure round.
> Post-C1/C2/C3 the row-own suites read **34/34** and the battery `11 failed | 1461 passed |
> 5 expected fail (1477)`; the 11 foreign failures and the receipt line are unchanged.

```
$ npx vue-tsc --noEmit
exit 0                                        (no output)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 152 passed (158)
      Tests  11 failed | 1460 passed | 5 expected fail (1476)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

**The receipt is BYTE-IDENTICAL pre→post**, re-run at this seat before the first edit and after the
last. The `violations:1` is **#40 W-PAGER's** (`pager.tabs.panel-linkage: sourcePath missing —
tests/components/pager-dots.contract.test.ts`), live at HEAD and not this row's; `drift:1` is #65's
routed tags-input row. The task's stated `violations:0` is unattainable while #40 sits uncommitted,
and is **not** claimed.

> **One near-miss, corrected rather than carried.** Moving `command.contract.test.ts` into
> `tests/components/command/` orphaned the seat `behavior.command.active-identity-executes-once`
> and took the receipt to `violations:2`. The move was **mine, not the spec's** — CWT-3 §5 names
> only `tests/components/ui/command/` → `tests/components/command/`, which is the CommandDialog
> re-home and is done. Reverted; receipt back to byte-identity. Re-pointing the roster instead
> would have moved `rosterSha256` and broken the same invariant from the other side.

**All 11 failures are FOREIGN**, matching ⊕⁵⁷'s recorded baseline exactly: #40 W-PAGER ×9
(`pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `gate-register` ×3 · `carousel/contract` ×1),
#7's `stacked-url-filter` ×1, and #40's untracked `useLeadTrail` export leak in `overfit-structure`
×1. `boot-graph` was RED on staleness and is **green after `npm run demo:dist:build`** (exit 0).

**Row-own suites: 33/33 green** (`tests/components/select` · `tests/components/command` ·
`select.contract` · `_shared/menu`), 5 files.

**Build paths.** `npm run demo:dist:build` **exit 0** — and the built sheet is the F1 falsifier
(§2). `npm run build` compiles everything and dies at the last step on
`package.json/package-lock.json root metadata mismatch: devDependencies, peerDependencies,
peerDependenciesMeta` — **#40's uncommitted embla removal**, the identical blocker ⊕⁵⁶/⊕⁵⁷
recorded; `package.json`'s only working-tree diff is that removal, and nothing in this fence
touches it. `public-surface.spec.ts` 81/83 — the 2 failures are that mismatch and the stale
`dist/styles` closure downstream of it (`card/scroll.css`→`card-scroll.css`, `carousel/styles.css`,
and this row's `glass/overlay-plate.css`, none of which can enter `dist/` until the build passes).
`node scripts/regen-exports.mjs` → **exportKeys 66/66, EXACT REPRODUCTION: YES**, exit 0, zero
bytes added to `package.json`.

**One CSS trap, found and stated.** The demo build died on
`CssSyntaxError: Invalid declaration` because a comment I wrote contained `_shared/*.ts` — the two
characters `*` `/` **close a CSS comment**, and Tailwind then read the rest of the paragraph as a
declaration. Rewritten without the sequence, and every CSS file in the fence scanned for it (all
clean). The ground is now in the comment itself.

---

## §7 · π — OWED, NOT CLAIMED

**No paint is claimed by this row.** Owed to **#10**'s serialized browser seat, Chromium 150 **and**
real `safari-app` 26.4 banked separately and never cross-inferred:

- **G2 GUTTER** — every indicator-bearing `[role=option]` `padding-inline-start ≥ 28`;
  `indicator.right ≤ label.left`; `SelectLabel` inset **=** option inset. RED half banked (0px,
  dot over label, label 32 vs 0).
- **G5 PAINT-FLOOR** — plate edge α ≥ 0.16 and ≥ 3:1 vs own fill; focus = the C-7 outline
  coexisting with four intact rim legs; overflow ⇒ computed `mask-image` present, **both engines**.
- π2–π10, π12 GREEN halves · **π1 diagnostic only** (A3) · **π11 DROPPED** (A8) · light-arm
  `safari-app` for the lane + `/containers/command` in Safari · **post-F4 origin verification, both
  engines** · post-cut re-measure of the 7 `hide-indicator` sites against built `dist` (the
  consumer-addenda precondition) · the DAG §6 command-dialog paired capture before either padding
  remedy lands.
- **NEW cells this cut owes**, because paint moved where the spec did not predict: the option
  corner **10 → 12** — the cure order directed this cell be restated **"none → 12"** and that
  correction is **REFUSED with grounds**, because the pre-state is a PAINT figure and 10px is what
  painted. Detector, three hops, all on disk: `src/styles/utilities/base.css:191` declares
  `.interactive-item { border-radius: var(--radius-lg) }` as PLAIN CSS inside `@layer components`
  (not an `@utility`, so it is present in every build regardless of the token scan that lost
  `ps-7`); `theme/radius.css:116` `--radius-lg: var(--radius)`; `:101` `--radius: 0.625rem` =
  **10px**. HEAD's row composed `interactive-item` (`menuRowClass.ts`) and nothing in the lane
  overrode it — `git show HEAD` on `menu.css` · `command/styles.css` · `field-surfaces.css` finds
  **no** row-level `border-radius`. "none" would have been true of the DECLARATION and false of
  the paint; the π row measures paint. The new value stands as ruled: `overlay-plate.css:100-102`
  gives `[data-slot="select-viewport"] [role="option"]` the C-12 law, `16 − 4` = **12**. (This
  derivation is a cascade READ, not a live measurement — the cell is still #10's to bank.); the
  row block pad **6 → 4**; `SelectLabel` **`pl-8` 32 → `ps-7` 28**; the
  scroll button **24 → 44px**; `.command__empty` **24 → 20**; the command plate corner **12 → 16**;
  the `fading-scroll` feather at both scroll ports; and the **CommandDialog with no inner plate**
  (the whole point of K8, and the one cell a screenshot settles instantly).

---

## §8 · §LOC

Lane code (comment- and blank-stripped, `select/` + `command/` + the row register): **900 → 820,
−80 (−8.9%)**. `field-surfaces.css` **203 → 28** (corrected from the banked 202; detector in §3.2);
its payload lands as
`styles/glass/overlay-plate.css` (186). Tracked fence **+573 / −613**; six new files (719 lines, of
which 442 are the two test batteries). Zero relocation LOC for the row register (A6). The
one-character glob and the de-interpolated class list carry none of it and are worth more than all
of it.

---

## §9 · §ROUTED — named owners, none of them this row's

1. **The four `DropdownMenu` rows' unlayered `outline: none`** (`dropdown-menu/styles.css:21,54`)
   — #80's routed defect (2). **CommandItem's half is DISCHARGED here** (the `.command__item`
   recipe carrying it is struck, so the row now takes `.interactive-item:focus-visible`'s C-7
   outline). The four menu rows are untouched: not this fence. → **#89 W-OVERLAY**, consistency
   home **#31 BAND-A11Y**.
2. **`--panel-padding`'s last reader** — `_shared/menu/menu.css:121`, the dropdown plate pad. The
   token cannot retire until it moves to `--overlay-pad`. → **#89**.
3. **`resolveSurfaceClass`'s six remaining consumers** (tooltip · toast · dropdown-menu · surface ·
   dialog · sheet). Select stopped calling it; the file's deletion is DAG §4.1. → **#89**.
4. **`.glass-control-edge`** — left alone in `field-surfaces.css`, 28 lines, so the move up to
   `styles/glass/` is that row's byte. → **#82 W-FIELD** (C-5).
5. **The `*Variants.ts` glob edit** — a blocking note on the DAG §5 rename wave, not this cut.
6. **The emitter's quote-pair tokenizer** (`vite.utility-emit.ts:105`, corrected from `:87`) — this row removed the
   *class* of source that trips it; the parser itself is still wrong for any consumer who writes a
   template literal. Hardening + a no-token-in-interpolation lint → **the build wave** (R20).
7. **The dialog padding axis** — K8's plate is struck; the padding remedy is DAG §6's Rule-6
   paired-capture paint choice and stays routed.
8. **`hide-indicator` consumer addenda** — keyframes.js ×4 (`ChromeDock.vue:248,260,297`,
   `TransportDock.vue:124`), value.js ×3 (`shell/dock/DockViewSelect.vue` ×2,
   `color-session/ColorSpaceSelector.vue` ×1, reaching glass-ui through the verified re-export at
   `demo/ui/select/index.ts:1`). **PR-07 is unblocked by F1's cure** — the gutter it presupposed
   now exists. → **#76 W-CONSUMER-BAND**, one marked addendum per repo.
9. **A05 command-reduction question** → owner mark per F04.
10. **`MIGRATION.md`'s BI.W-MULTISELECT-FOLD survivor column** — struck in place, dated, with its
    detector. The whole section's `proof:fold-delete` clause ("survivor Combobox `multiple`
    capability present") could never have held. → **#61 W-DOC-TRUTH** for the sweep of its kind.

---

## §10 · SHARED-DIRTY FILES — SPLIT AT `-U0`, NOT `-U3`

Two files in this fence carry foreign hunks and **must be split by index surgery at the cut**:

| file | mine | foreign |
|---|---|---|
| `src/styles/index.css` | 1 hunk — `@@ -154,6 +154,6 @@`, the `field-surfaces.css` doc-block re-point | 3 hunks — the slider (`#35`) and deck/carousel (`#40`) imports |
| `tests/styles/glass-subtlety.test.ts` | 2 hunks — `@@ -602,4 +602,4 @@` and `@@ -608 +608,14 @@`, the nesting-arm pins | 2 hunks — `@@ -841` and `@@ -1039` |

Every other file in §11 is wholly this row's. This landing carries **no completion riders**.

---

## §11 · THE FENCE

**NEW (6)** `src/components/_shared/menu/rowClass.ts` (34) ·
`src/components/select/SelectScrollButton.vue` (57) · `src/styles/glass/overlay-plate.css` (186) ·
`tests/components/_shared/menu/rowClass.test.ts` (100) ·
`tests/components/select/picker-lane.test.ts` (291) ·
`tests/components/command/CommandDialog.test.ts` (51, re-homed from `tests/components/ui/command/`).

**DELETED (6)** `_shared/menu/menuRowClass.ts` · `select/SelectScrollUpButton.vue` ·
`select/SelectScrollDownButton.vue` · `command/dialogContext.ts` · `tests/menuRowClass.spec.ts` ·
**`tests/components/ui/command/CommandDialog.test.ts`**. Six, not the banked five — the sixth is
the CWT-3 §5 re-home's SOURCE half, counted under NEW as *"re-homed from"* and never counted as
the deletion it also is. Detector: `git status --porcelain | grep '^ D'` filtered to the lane →
**6 paths**, exactly the six above.

**MODIFIED (33)** select ×7 (`SelectContent` · `SelectItem` · `SelectLabel` · `SelectSeparator` ·
`SelectTrigger` · `SelectValue` · `index.ts`) · command ×9 (`Command` · `CommandDialog` ·
`CommandItem` · `CommandList` · `CommandSeparator` · `CommandShortcut` · `index.ts` · `types.ts` ·
`styles.css`) · `_shared/menu/menu.css` · `_shared/field/field-surfaces.css` ·
`configurator/styles.css` · `src/components/index.ts` · `src/index.ts` · `src/styles/glass.css` ·
`src/styles/index.css`◆ · `src/styles/tokens/offsets.css` · `demo/demo.css` ·
`demo/stories/forms/select.vue` · `demo/stories/containers/command.vue` ·
`tests/components/select.contract.test.ts` · `tests/components/command.contract.test.ts` ·
`tests/public-surface.spec.ts` · `tests/styles/glass-subtlety.test.ts`◆ ·
`tests/styles/engage-ladder.test.ts` · `MIGRATION.md`.  ◆ = shared-dirty (§10).

`git diff --stat` over the fence: **39 files, +573 / −613** (tracked only; the six new files above
are untracked at this seat and are the driver's to add).

---

## §12 · §REJECTED — carried forward with falsifiers intact

RJ-1…RJ-9 stand as adjudicated. **One new refusal, on evidence:** CWT-3 §3.5's *"reka's
dismissable layer owns Escape"* — falsified at this seat by a nested-layer reproduction (§4.2); the
substance (no provide/inject side channel) ships, the stated mechanism did not.
**One clause superseded:** §3.2's focus recipe (`outline 2px @ 0.48` **+ `0 0 8px @ 0.15`**) — #80's
C-7 landed the shared `.focus-ring` as `outline: var(--focus-ring-width) solid ink×--ink-perimeter`
with `outline-offset: 2px`, which is §3.2's figure exactly (`--focus-ring-width: 2px`,
`--ink-perimeter: 0.48`, both read on disk) **minus the 8px bloom, which C-7 retired with the thing
it was rescuing**. The trigger composes it; nothing re-mints a ring.

---

## §13 · CURE ROUND — 2026-08-08, `CURE-ORDER-81.md`

**Cure seat model** `claude-opus-5[1m]` (Opus 5, 1M). Shared tree, five foreign lanes live
(#32 · #33 · #35 · #40 · #71); no git command run at this seat, files edited in place, the driver
commits. The adjudicator (Fable, `wf_7eda1899-6e3`) ruled CURE-REQUIRED and the driver ratified
five cures; all five are executed below, with the one figure the order got wrong recorded rather
than obeyed (§7, the π corner cell).

| cure | status | what landed |
|---|---|---|
| **C1** code, BLOCKING | **DONE** | `CommandDialog.vue` — `open`/`defaultOpen`/`modal`/`unmountOnHide` defaulted `undefined`, each omitted from the `<Dialog>` spread when unset, and the palette's `open` omitted from the `<Command>` bind (`commandProps`). §4(1) carries the measured before/after. |
| **C2** gate | **DONE** | G6 widened from a two-line `Command.vue` grep to a DERIVED detector: it resolves each disclosure wrapper's props interface (including the `extends DialogProps` chain), collects every optional `boolean`, and convicts any that lacks an own `default` key — `open`'s must be `undefined` specifically. The second G6 case now asserts the omit-when-unset shape on all four `CommandDialog` axes and that the bare `:open="props.open"` bind is gone. |
| **C3** test | **DONE** | `CommandDialog.test.ts` gains *"opens uncontrolled and hands reka no `open: false`"* — mounts with `default-open` and no `open`, asserts **2** rendered options, `DialogRoot.open === undefined` with `modal`/`unmountOnHide` back at reka's `true`, and `ComboboxRoot.open === undefined` / `defaultOpen === true`. |
| **C4** record truth | **DONE** | (a) §4(1) restated with C1 named · (b) RT-24C adjudicated below · (c) five figures corrected, each with its detector (§2 ×3, §3.2/§8, §11, §7) · (d) CWT-3 §3.2's `--dropdown-text-secondary` re-point adjudicated below · (e) the Command-row corner adjudicated below. |
| **C5** environment | **DONE** | Stale vite RE-DERIVED, never trusted: `ps aux \| grep vite` found the banked **61360** still live and serving a **scratch `precut/` tree** (port 5612) — killed with its `npm exec` parent 61321, absence confirmed by `ps -p`. The two dev servers on **5611** and **5439** serve THIS repo and were LEFT RUNNING on purpose: five foreign lanes are mid-flight in this tree and a browser seat may own either port. `npm run demo:dist:build` → **exit 0**, and the F1 falsifier re-measured in the fresh sheet: `.ps-7{padding-inline-start:calc(var(--spacing) * 7)}`, **1 rule**, `dist-demo/assets/index-Cisba_p8.css`. |

**BORN-RED, on the pre-C1 bytes.** A scratch copy of the pre-cure `CommandDialog.vue` was written
to the seat scratchpad, copied over the file, the two suites run, and the cured bytes restored from
their own scratch copy (`shasum` equal before and after, `bc4a853c…`). On the pre-C1 bytes:

```
     × G6 — no wrapper declares a bare optional boolean without an undefined default
     × G6 — the lane's roots omit an unset axis rather than binding it false
     × opens uncontrolled and hands reka no `open: false`
      Tests  3 failed | 9 passed (12)
```
The boolean-default case convicted **5** offenders (`open`/`defaultOpen`/`modal`/`unmountOnHide`
undefaulted, plus `open`'s default not being `undefined`); C3 reds on the product fact —
`expected  to have a length of 2 but got +0`, the palette pinned shut. Post-restore: **12 passed
(12)**.

### §13.1 · RT-24C — adjudicated (the order's (b))

**The route, read from the cursor** (`EXECUTION-PROGRESS.md` ⊕⁴⁰, row 24): *"RT-24C consumers 3/4
ROUTED not skipped — popover/menu/tooltip → #89, select/combobox → #81, dock → #47, each
inheriting the portal precondition (met by construction; the Slider was the case that had to
teleport explicitly)."* #24 built `styles/glass/focus-veil.css` (`.glass-focus-veil`, 173 lines)
and landed two consumers, the graded Dialog and the engaged Slider. The picker record carried no
adjudication of it at all — the one disposition TR forbids.

**Disposition: REFUSED for the in-dialog arm, ROUTED to #89 W-OVERLAY for the rest. Grounds:**

1. **The `CommandDialog` arm is refused outright, on this row's own K8 ground.** The veil is a
   `position: fixed` plate carrying `backdrop-filter`. Mounting one *inside* a dialog whose
   `DialogContent` IS the plate re-mints precisely the plate-in-a-plate defect this cut spent a
   register removing (§2 K8: one blur reading the blur beneath it). #24's own CURE-1 is the same
   lesson from the other side — its veil collapsed to 13.5% of the viewport because a
   `backdrop-filter` ancestor stole the containing block. A palette inside a dialog is that
   ancestor by construction.
2. **Adoption needs a second `data-engaged` writer, and that is not this row's to authorize.**
   ⊕⁴⁰ routes *"MOTION-CANON §4 G6 → #27"* — at-most-one-`data-engaged`-per-document is #27's
   subject, and an open select inside an engaged dialog is exactly the second writer. A picker row
   cannot adjudicate an invariant another row owns.
3. **The remaining arm goes where its family already is.** Popover · menu · tooltip are #89's
   half of the same RT-24C route, and after C-11/K-10 the select and command overlays read the
   SAME plate file those surfaces will read (`styles/glass/overlay-plate.css`), with
   `--panel-padding`'s last reader, `resolveSurfaceClass`'s six consumers and the four
   `DropdownMenu` rows already routed to #89 (§9/1–3). Splitting the veil verdict between #81 and
   #89 would give one family two answers on one plate — the exact fault §3.2 exists to prevent.
   → **#89 W-OVERLAY**, inheriting the portal precondition, which the select/command overlays meet
   by construction (both portal; neither needs the Slider's explicit teleport).
4. Not a deferral dressed as a route: nothing in this fence is left half-done by it. The veil is
   an ADDITIVE affordance with no consumer on these surfaces today, so the lane ships complete
   either way, and the verdict lands with the row that can take it for the whole family.

### §13.2 · CWT-3 §3.2's `--dropdown-text-secondary` re-point — REFUSED with grounds (the order's (d))

**The clause:** *"group label `--dropdown-text-secondary` re-pointed to the φ^(1/4) rung
(1.140→1.127838)"* (`COMPONENT-WAVES-TERMINAL-3.md:379`). **Refused. Four grounds, all from
disk:**

1. **The φ ladder is the identity register and is explicitly excluded from controls.**
   `styles/typography/scale.css:96-99`, in the token file's own words: *"The φ-identity rungs below
   (`--type-subheading`/`-heading`/`-title` + the `--type-display-*` ladder) are EXCLUDED — a
   hero/title is a typographic identity, not a control."* A group label is a control caption.
2. **The token is a SPECIALIZATION, and the specialization is the point.**
   `tokens/sizing.css:140` `--dropdown-text-secondary: var(--control-text-sm)` and `:86`
   `--control-text-sm: calc(var(--type-caption) * var(--ui-scale))` — the picker family rides the
   one `--ui-scale` comfort axis every other control rides. Pointing it at a bare φ rung severs
   that axis and re-mints a second authority for one question, which is the law this row's §3.2 is
   built on.
3. **The figures have no referent on disk.** `grep -rn "1.127838\|1.140" src/styles` → **0**. The
   clause asks for a literal to be minted, not a rung to be read.
4. **It is not this fence's byte.** `tokens/sizing.css` is not in §11, and the token has four
   readers — two of them `dropdown-menu/styles.css:102,118`, which are **#89**'s rows. A picker-row
   edit would move type on rows this row does not own. Should the re-point ever be wanted, its home
   is the token canon (**#68**) with **#89** in the room, never here.

### §13.3 · The Command-row corner under the C-12 law — they KEEP their own (the order's (e))

**The law, in its own terms** (`overlay-plate.css:38-44`): `--overlay-option-radius:
calc(var(--radius-card) - var(--overlay-viewport-inset))`, with `--overlay-viewport-inset: 4px` —
*outer minus the inset that actually obtains*, written as the subtraction so retuning either end
keeps the corners concentric. The selector that applies it is scoped
`[data-slot="select-viewport"] [role="option"]`, not bare `[role="option"]`.

**Disposition: command rows do NOT take `--overlay-option-radius`; they keep their own corner at
this cut.** Grounds, entirely from the law's own terms:

- The law's second term is **the select viewport's** pad (`overlay-plate.css:97-99`,
  `padding: var(--overlay-viewport-inset)` = 4). The command list's inset is a different number on
  the same plate: `command/styles.css` `.command__list { padding: var(--overlay-pad) }` = **12**,
  inside a `.command` whose corner is `--radius-card` = **16**.
- Apply the law honestly at that port and it yields `16 − 12` = **4**, not 12. Handing a command
  row the select's 12 would import an inset term the port does not have and break concentricity in
  exactly the way the hand-set 10 did in the listbox (§3.3) — the law would be violated *by* being
  copied. One law, two ports, two insets: that is why the selector is scoped.
- The derived 4 is a PAINT change with no capture behind it, and this row claims no π. It is
  **stated, not minted** → **#89 W-OVERLAY** to land with the family's plate work, **#10** to
  measure. Until then command rows keep the corner they have (`.interactive-item`'s
  `--radius-lg` = 10, detector in §7).

### §13.4 · Residue folded while the files were open

- **A-D2** — `CommandItem.vue`'s *"survives ONLY as the dialog scale-up hook"* undercounted the
  disabled arm. Corrected to name **two** rules (`styles.css` `.command-dialog__content
  .command__item > svg` and `.command__item[data-disabled]`), which is what `styles.css`'s own
  comment already said.
- **A-D8** — the same-value duplicate `overflow-y: auto` on `.command__list` is **struck**.
  `CommandList.vue:35` composes `fading-scroll--y`, and `utilities/base-misc.css:74` declares
  `overflow-y: auto` on that class; the local copy was a second authority for one axis. The inline
  axis (`overflow-x: hidden`), which the component does own, stays and now says why.
- **F26** — the line-shaped-detector caveat is folded into §2 beside the figure, with the
  shape-free re-derivation that carries the claim.

### §13.5 · DEFECTS THE ORDER MISSED — recorded, not silently fixed

1. **The order's own C4(c) π figure is wrong.** "none → 12" is refused with the three-hop detector
   in §7: the option corner painted **10** at HEAD from `.interactive-item`, plain CSS in
   `@layer components`. Writing "none" would have minted a false paint figure in the row that
   exists to kill false paint figures.
2. **`PASTE-BLOCKS.md` was never banked for this row.** C4(a) says to correct *"both banked paste
   blocks"*; the row directory held only `RECORD.md` and `CURE-ORDER-81.md` (every comparable row
   — #79, #80, #72, #59 — banks a `PASTE-BLOCKS.md`). The cure seat **authored** the missing bank
   at `PASTE-BLOCKS.md`, post-cure figures folded in and `<SHA>`/`⊕ⁿ` kept literal for the driver.
   The gap itself is the record: the paste blocks did not exist to be corrected.
3. **The uncontrolled `CommandDialog` cannot be dismissed by Escape, and C1 does not change that.**
   With no `v-model:open`, the inner combobox layer still handles the key first (§4.2) and the
   emit has no listener, so the plate stays standing. C1 makes the uncontrolled arm OPEN, which it
   never did; it does not give it an owner. `v-model:open` is the shape that has one, and the
   template now says so. A real fix is an internal passive `open` seeded from `defaultOpen` —
   machinery this cure was not ordered to add and which needs a paint cell to accept. → **#89**
   with the family's dismissal work, **#10** for the capture.
4. **#22's skip-list description still says CURE-CUT where the cursor says SEALED ⊕³⁵** (booked in
   the order as harmless; nothing in this fence touches it, noted here for the sweep).

### §13.6 · VERIFY at the cure seat — verbatim

```
$ npx vue-tsc --noEmit
exit 0                                        (no output)

$ npx vitest run tests/components/select tests/components/command tests/components/_shared/menu
 Test Files  5 passed (5)
      Tests  34 passed (34)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 152 passed (158)
      Tests  11 failed | 1461 passed | 5 expected fail (1477)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ npm run demo:dist:build
exit 0
```

**Deltas against §6, all accounted:** row-own **33 → 34** (C3's one new case; C2 rewrote two
existing G6 cases rather than adding a third), battery passed **1460 → 1461** and total
**1476 → 1477** for the same case. The **11 foreign failures are unchanged and identically
traced** — #40 W-PAGER ×9 (`pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `gate-register` ×3 ·
`carousel/contract` ×1), #7's `stacked-url-filter` ×1, #40's untracked `useLeadTrail` export leak
in `overfit-structure` ×1. The receipt line is **byte-identical** to §6's.

**ONE INTERMITTENCY, recorded rather than laundered.** Four full-battery runs were taken at this
seat: three gave `11 failed | 1461 passed`, one gave **12 failed | 1460 passed**, the extra being
`tests/components/dropdown-menu.contract.test.ts > keeps the click branch to one portaled menu and
restores focus on execute` (`expected <body> to be <button>` — `document.activeElement` never
returned). That file is **5/5 green in isolation**, sits in no file this row or this cure touches,
and the failure is a focus-ownership race between `attachTo: document.body` mounts under a full
battery — the ⊕⁴⁰ RT-19G intermittency class, not a regression. Stated here because a figure that
moves between runs must be reported with its spread, not with its best run.

> **B-D6 applies to every figure above.** Receipts taken in this tree are racy while any seat runs
> in-tree bites; five foreign lanes are uncommitted beside this one. These are the CURE SEAT's
> informational figures. **The driver takes the final receipt after all seats return.**

### §13.7 · What the cure round moved, and what it did not

**Files touched at this seat, all inside the §11 fence:** `src/components/command/CommandDialog.vue`
(C1) · `src/components/command/CommandItem.vue` (A-D2, comment only) ·
`src/components/command/styles.css` (A-D8, the duplicate `overflow-y` struck) ·
`tests/components/select/picker-lane.test.ts` (C2) ·
`tests/components/command/CommandDialog.test.ts` (C3) · this `RECORD.md` and the newly authored
`PASTE-BLOCKS.md` (C4). **No git command was run at this seat** — no `add`, `commit`, `stash`,
`checkout`, `restore`, `mv`. The born-RED revert was a file copy out of and back into the seat
scratchpad, `shasum`-verified equal on restore. Nothing outside the fence was opened for writing,
and the five foreign lanes (#32 · #33 · #35 · #40 · #71) were not touched.

**§8's and §11's diff figures are the CUT's and are now short by the cure's lines** (three code
files, two test files). They are deliberately NOT re-guessed here: the driver derives
`git diff --numstat` at the landing commit, which is the only figure that can be right while five
lanes sit uncommitted in the same tree (B-D6). The FILE COUNTS in §11 stand — the cure added no
file to the fence and removed none, except the `PASTE-BLOCKS.md` this round authored, which is a
record, not a fence byte.
