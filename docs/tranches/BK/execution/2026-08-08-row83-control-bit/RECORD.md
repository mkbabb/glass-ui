# BK Φ5 · Row #83 · W-CONTROL-BIT — checkbox · switch · radio-group

**modelId: `claude-opus-5[1m]`** (SCOUT + IMPLEMENT seat) · base HEAD `4025bef6` (⊕⁵⁸;
the brief's `4917a042` is three ledger entries stale and was re-derived, not trusted) ·
date **2026-08-08** (the brief's `2026-08-05` directory stamp is refused: every landed
row in `execution/` is stamped with its own landing date — `2026-08-08-row79/80/81` —
and a record dated three days before it was written is the exact class of false figure
this tranche polices).

---

## 0 · SELECTION AND ITS GROUNDS

**Row #83 W-CONTROL-BIT**, the next canonical unstarted Φ5 row in TR order.

Derived, never assumed, from three sources read at this seat:

| source | reading |
|---|---|
| `EXECUTION-PROGRESS.md` Φ5 table | #82 · **#83** · #84 · #85 · #86 · #87 · #88 · #89 all `UNSTARTED`; everything below #81 in TR order is SEALED, LANDED or gated |
| ⊕⁵⁸ (`:2258-2276`) | *"The rest of the tier-3 band (#83 · #84 · #85 · #86 · #87 · #88 · #89) keeps the single satisfied precondition #68 and is selectable in TR order … **#82** stays behind **#83** (C-6 `_shared/control.ts`) and ASK g6"* |
| `EXECUTION-DAG-2026-08-03.md:94` | `#83 \| W-CONTROL-BIT \| Φ5 \| unstarted \| #68; before/with #82/#84` |

So the numerically-first unstarted row (#82) is **skipped with its gate named** — it
sits behind this row's `_shared/control.ts` cut *and* behind ASK g6
(`docs/tranches/BK/ASK.md:37`, number-field KEEP — tranche-qualified at the cure round;
BJ's `ASK.md:37` exists and reads differently, §11.6 item 2) — and #83's own single
precondition, **#68 W-TOKEN-CANON**, is
SEALED (⊕³¹). No SEALED or IN-FLIGHT row was selected. Precedence honoured: #18's
completion-seal delete landed at ⊕³⁸, long since.

**TR cell, verbatim** (`TERMINAL-ROSTER.md:233`):

> | **83** | **W-CONTROL-BIT** (checkbox · switch · radio-group) | CWT-3 §LANE binary-triad | Φ5 | cited whole; **owns `_shared/control-size.ts` → `_shared/control.ts`** (C-6); lands before or with #82/#84. After #68 |

Spec of record read **in full**: `COMPONENT-WAVES-TERMINAL-3.md:639-800` (§0 ADJ-1…6,
§1 DISPOSITION, §2 DEFECTS D1-D16, §3 THE DESIGN, §4 STRIKE/ADD, §5 GATES, §6 PAINT,
§7 REJECTED R1-R19, §8 LOC, §9 ROUTED) plus the batch rulings C-5 · C-6 · C-7 · C-10
(`:1816-1826`) and the tier-3 gate classification (`:1871`).

---

## 1 · THE PRE-STATE, MEASURED — every §2 figure re-derived from `git show HEAD:` bytes

Materialised at `scratchpad/head-bytes/`, censused by script (not read off the spec):

| figure | spec says | measured at HEAD | verdict |
|---|---|---|---|
| host-targeting `transition` shorthands | "2 host shorthands" (G-BIT-ONE mutation col.) | **1** — `.checkbox` only | **SPEC FIGURE CORRECTED.** ADJ-4's own prose is the right one: *one dead press (checkbox, clobbered), one FORKED press (radio, on `.radio-group__face` — an element, not the host), one correct press (switch)*. The mutation column's "2" counted the fork as a host rule; it is not. |
| focus rule heads across the triad | "3 of 3 box-shadow focus deliveries" | **8 rules / 3 mechanisms** | consistent — 3 delivery mechanisms, 8 rules |
| invalid grammars | 4 | **5 rule heads / 4 grammars** | consistent |
| forced-colors blocks | 3 | **3** | ✓ |
| `opacity: var(--opacity-disabled)` arms | 3 | **3** | ✓ |
| `border-radius: 50%` | 3 | **3** | ✓ |
| `--control-ring` readers | 2, both in-lane | **2** (`checkbox/styles.css:10`, `radio-group/styles.css:39`) | ✓ |
| `:hover` rules in the lane | 0 | **0** | ✓ |
| `force-mount` in the lane's SFCs | 0 | **0** | ✓ |
| negative-margin seat / absolute seat span | both live | **both true** | ✓ |
| lane LOC | 502 (`wc -l`, incl. 3 `index.ts`) | **495** over the 7 non-barrel files; **432** code-only | ✓ (502 reproduces with the barrels) |

**One §2 defect had already been half-cured and this is recorded rather than
re-claimed.** D2's headline "`--control-ring` composites 1.277:1 / 1.278:1" is **stale**:
#31 W-A11Y re-derived that alpha 12% → **50%** on 2026-08-05 (`scale-paper.css`, its own
dated strike-in-place bracket). The contrast half of D2 was therefore already over the
bar at HEAD. What was NOT cured, and is what this row cures, is the FORK: a
colour-valued ink at a hand-set alpha sitting beside the bare-scalar one-ink register.

---

## 2 · PER-ITEM LEDGER

### 2.1 The register — `src/styles/glass/control-bit.css` (NEW, ~~327 lines / 147 code~~ → **400 lines / 154 code** after the cure round; 17 rules / 62 decls → **18 / 63**, the one added rule being the `.dark` recess arm)

`@import`-ed once from `styles/glass.css`, immediately after `control-surfaces.css`
(the C-5 sibling: two registers, one token law). Declares, each exactly once:

| law | delivery | closes |
|---|---|---|
| object | `--control-bit-size: 1.25rem` (20) — face Ø and thumb Ø, one token | ADJ-2 |
| seat | `display:inline-grid`, `inline/block-size: max(--touch-target, face axis)`, `margin: 0`, in flow | ADJ-3 · D6 · G-BIT-SEAT |
| material | 1px perimeter border + the A10 recess fill + the shared `--glass-rim-top/bottom` pair; **zero `backdrop-filter`** | D7 · K9 · G-BIT-FINDABLE |
| engagement | `@media (hover: hover)` fill rung + `:active` fill rung, both mixing ON TOP of the current fill | D8 · G-BIT-ALIVE |
| focus | A1 verbatim on the FACE — `outline: 2px solid` perimeter ink, offset 2, plus the `0 0 8px @15%` glow; rim legs byte-identical to rest | D10 · G-BIT-FINDABLE |
| invalid | ONE grammar, `:is(.control-bit[data-invalid], [data-invalid] .control-bit) .control-bit__face` — the ancestor arm serves RadioGroup's root with zero threading | D9 · K26 |
| disabled | ~~ink at 45%, geometry and perimeter at full alpha~~ → **inks at 45% (mark AND perimeter), GEOMETRY at full alpha**; `opacity` retires as the channel | D12 · A4 |
| mark | force-mounted, `scale .6/opacity 0 → 1/1`, scale on `--transition-liquid-spatial` (the spring vocabulary) | D4 · G-BIT-ALIVE |
| PRM / forced-colors | one arm each | D11 · D12 |

**The hover/checked cascade trap, found and closed at construction.** The naive form
(`:hover .face { background: --fill-hover }`) computes (0,4,0) against the checked
rule's (0,3,0), so hovering a CHECKED bit would have wiped its state fill. Cured
structurally: the fill and edge are inherited custom properties re-pointed on the
checked arm, and both engagement rungs mix over `var(--control-bit-fill)` — one hover
rule and one active rule serving both arms.

**Two SEAMS marked in place, routed, not minted** (the batch's TF-1 unlanded-token
ruling: *write the literal with a marked seam; the token wave re-points*):
1. the A10 recess fill — written as the host-relative `color-mix(in oklab,
   var(--foreground) 4%, transparent)`; the NAME (`--control-recess`) → **#68**.
   **[2026-08-08, cure round — CURE-3] ~~ONE literal serves both arms~~ is STRUCK.**
   `--foreground` inverts with the mode (dark it is `hsl(30 14% 90%)`, a cream), so
   the 4% step that recesses in light *raises* in dark: measured oklab L\* 0.1456 →
   **0.1875** on the dark page (+0.0419) and 0.2949 → **0.3251** on the dark card
   (+0.0302) — A10's own defect wearing the cure's name. A plain `.dark .control-bit`
   ancestor arm re-points the pole to `oklch(0 0 0 / 0.14)` (the veil recipe's ink
   taken to its limit; the dark veil ink `oklch(0.17 0.03 70)` sits ABOVE the L\* 0.1456
   page floor and cannot recess against it). Post-cure dark: card L\* 0.2949 → **0.2683**
   (ΔL\* **−0.0265**, against the light arm's **−0.0268**), page L\* 0.1456 → **0.1406**
   (ΔL\* −0.0050, floor-bounded — oklab's near-black slope, stated not massaged).
2. `--radius-md` → `--radius-tick` (PROPORTION §8:329 books it as a value-unchanged
   RENAME) — the rung is READ, the rename → **#68**. `--radius-md` has readers outside
   this lane; renaming it here would be a library-wide cut wearing a component fence.

### 2.2 `_shared/control-size.ts` → `_shared/control.ts` (C-6, this row's named ownership)

Renamed (old file **deleted**, no alias — [[no backwards compat]]), gaining
`ControlProps` and the 3-line `controlStateAttrs`. Six importers re-pointed:
`input/types.ts` · `textarea/types.ts` · `search/SearchBar.vue` ·
`search/searchVariants.ts` · `_shared/index.ts` · (`switch/Switch.vue` drops the import
entirely with the `size` axis). Two CSS prose citations of the old path corrected
(`glass/control-surfaces.css:24`, `utilities/components.css:29`) — a citation to a file
that no longer exists is a dead cite.

### 2.3 The three shells — 39 CSS rules / 138 declarations → **10 / 26**

| shell | residue, entire | lines (code) |
|---|---|---|
| checkbox | `--control-bit-radius: var(--radius-md)` — the tick corner (**the register's competing host default DELETED at the cure round, CURE-4 — see §11**) | 5 |
| switch | three face axes (44 · 24 · pad 1), `justify-content: start` on the track, the thumb + its travel + RTL + PRM | 32 |
| radio-group | the group's flex axis at **gap 0**, and the 8px dot | 17 |

`.checkbox__seat` (node + 9 lines), `--radio-seat-offset` + the derived tiling gap,
`.control-surface`/`.glass-control-edge` off the checkbox, `.glass-wash` off the track,
`--spring-snappy` off the thumb, `--glass-highlight` off the thumb, `50%` ×3,
`--radius-control` off the checkbox, 3 focus deliveries, 3 of 4 invalid grammars, 3
disabled opacity arms, 2 of 3 forced-colors blocks, the indicator state-mount, the
`size` axis, `checkedState`, `| null` ×3 — **all struck**.

**The switch silhouette survives the material cut BECAUSE the register keeps the
border.** `.glass-wash` carried `border: 1px solid` (`ladder.css:49`); dropping the
class without replacing that byte would have moved the checked far-inset from 2 to 3
and broken ADJ-1's symmetry on the way to "curing" D7. The register's 1px perimeter
lands on the same edge: rest inset = 1 + 1 = 2, checked far = 44 − 1 − 1 − 20 − 20 = 2,
travel = 44 − 24 = 20 = thumb Ø.

### 2.4 `--control-ring` DELETED, and the honest cost

Its two readers became one register reading `--ink-perimeter` (0.48). Both inks
re-composited over all five surfaces a checks atom sits on, in both arms, using
G-CONTRAST-COMPUTED's own resolver:

| arm · surface | retired `--control-ring` (50%) | perimeter rung (0.48) |
|---|---|---|
| light `--background` | 3.322 | 3.132 |
| light `--card` / `--popover` | 3.291 | 3.105 |
| light **`--secondary`** | 3.184 | **3.011** ← worst cell |
| light `--muted` | 3.272 | 3.089 |
| dark `--background` | 4.486 | 4.213 |
| dark `--card` / `--popover` | 3.984 | 3.791 |
| dark `--secondary` | 4.063 | 3.862 |
| dark `--muted` | 4.367 | 4.131 |

Ten cells, ten over the WCAG 1.4.11 3.0 floor, worst clearing by **0.011**. That margin
is thin and it is deliberate: #31's 50% was the floor (48%) plus an even-rung cushion,
and a component lane does not get to keep a private stronger ink because it likes the
cushion. If 0.48 is short of what a control perimeter wants, the RUNG moves and every
control moves with it — **#68's cut**. Stated with its measurement, not absorbed.

### 2.5 Demo route `/forms/checks` — the §4 ADD specimens

`opacity-60` wrappers ×3 **out** (they multiplied the component's own disabled opacity
to an effective ~0.30, so the disabled arm had literally never been visible on its own
page), `gap-8`/`gap-6` overrides **out** (the radio's `gap-6` was the 2px hit-rect
overlap), invalid specimens for Checkbox **and** RadioGroup **in** (none existed on any
of 7 forms routes — discharges PROPORTION §7b-2 for the triad), a 4-bit vertical stack
at gap 0 **in** (G-BIT-SEAT's bite), `size="sm"`/`size="lg"` **out** with the axis.

**[2026-08-08, cure round — CURE-2] THE RATIONALE ABOVE IS STRUCK FOR THE SWITCH, and
the strike is arithmetic, not taste.** ~~"The bit↔label pairing now rides the seat's own
12px residue at gap 0"~~ holds only for a 1:1 bit. The seat is
`max(--touch-target, --control-bit-face-inline)`; for the checkbox and the radio that is
`max(44, 20)` = 44 and the 20px face centres with **12px** falling out on each side for
free. For the switch `--control-bit-face-inline` is **2.75rem = 44px**, so `max(44, 44)`
= 44 and **the residue is exactly ZERO** — the track and its label touched, on all four
clusters, and the "gap 0 is honest" clause papered over a 0px pairing gap the same way
the struck `gap-8` papered over a missing seat. Restored: `gap-3` (12px) on each of the
four switch clusters — the identical pairing the other two members get for nothing — and
`gap-6` (24px) on the wrapper, so SEPARATION is twice PAIRING and a cluster reads as a
cluster. Nothing about the checkbox/radio residue changes; the removal of `gap-8`/`gap-6`
from THOSE sections stands, because there the arithmetic was real.

---

## 3 · TWO RULINGS EXECUTED AGAINST A DEAD FALSIFIER, RECORDED NOT LAUNDERED

### 3.1 ADJ-5 — outcome UPHELD, stated ground REFUTED by the compiler

ADJ-5 struck RadioGroup's runtime throw and ordered `useForwardPropsEmits` "like its
siblings", on the falsifier that *"Checkbox narrows reka's emit to `CheckedState` and
Switch to `boolean` by emit-type declaration alone, through the identical seam, no
guard, no visible cast"*. **That falsifier does not transfer, and the falsifier of the
falsifier is `vue-tsc`.** The siblings narrow nothing — their reka emits are already
`boolean | 'indeterminate'` and `boolean`. `RadioGroupRoot` emits `AcceptableValue`,
strictly wider (`null`, objects). Verbatim:

```
src/components/radio-group/RadioGroup.vue(54,6): error TS2345:
  Types of property '"onUpdate:modelValue"' are incompatible.
    Type '(value: SelectionValue) => void' is not assignable to type
    '(payload: AcceptableValue) => any'.
      Type 'null' is not assignable to type 'SelectionValue'.
```

So R6 (the losing arm) was **right on the mechanism** — striking the throw needs an
unchecked cast — and wrong on the conclusion. **Executed: throw struck, one documented
cast at the seam**, sound because `RadioGroupItemProps.value: SelectionValue` is the
only entry point. And the shape is not the "emit-doctrine fork" D13 called it: it is
byte-for-byte the library's ONE grammar for this seam, live at `select/Select.vue`,
landed by **#81 nine hours before this cut**. Minting a third answer would have
re-committed D13 one level up.

### 3.2 §3.4's `value → SelectionValue` — executed by COERCION, not by cast

Reka's `SwitchRoot` takes `value?: string`. The public surface publishes
`SelectionValue` (D13's one-type law) and the seam does `String(value)` — not a
concession but what the platform does: the value lands in a hidden form input and
`FormData` stringifies it either way.

## 4 · THREE ADJUDICATIONS THIS SEAT REFUSES OR ROUTES

1. **`--radius-tick` MINT — REFUSED, ROUTED to #68.** §4 says "Tokens minted: none" and
   §9 item 1 routes the rename; PROPORTION §8:329 books it as a library-wide
   value-unchanged rename with readers outside this fence. The rung is read
   (`--radius-md` = 6 = 0.30 × 20 exactly); the name is owed.
2. **Subpaths `./checkbox` + `./radio-group` — NOT MINTED HERE.** C-10 (`:1826`) rules
   DAG:289 wins: ONE batched export-surface cut, ONE `public-surface.spec.ts` re-pin,
   *"no lane bumps the pin solo"* — and ⊕⁵⁸ re-affirms it for the whole tier-3 band.
   `regen-exports.mjs` reproduces **exportKeys 66/66 EXACT**, unchanged.
3. **`.glass-control-edge` relocation — REFUSED, it is #82's (C-5).** What this row DID
   correct is the sentence its own cut falsified: the docstring's *"shared by the Select
   trigger and its sibling form controls"* is struck in place with a dated bracket —
   on-disk readers are now **1**.

## 5 · GATES — five, born-RED, SEATS +0

`tests/components/control-bit/binary-triad.test.ts` (268 lines). Nothing claims a §B.5
seat name; these ride the tier-3 acceptance class exactly as #79/#80/#81's batteries do
(CWT-3 `:1871`; TERMINAL-ROSTER E-7 extended to tier-3). The geometry-and-colour halves
(a computed 20×20 face, a measured ≥3:1 border, an `elementFromPoint` hit map, the
8-frame entrance strip) are **not faked in jsdom** — they are §6's browser-seat probes,
owed to #10.

**BORN-RED RECEIPT.** Run against `git show HEAD:` bytes materialised to a scratch tree
(the register absent → given an empty `@layer components {}` shell, so each gate fails
on its own substantive clause rather than on ENOENT):

```
× declares each control law exactly once, and no transition targets a host
× carries one object size, one corner spelling, and the kept switch geometry
× reads the perimeter rung and keeps the resting rim under focus
× force-mounts the mark at every state and answers a guarded pointer
× seats every member on the host with no overhanging span and no negative margin
  Tests  5 failed (5)
```

with G-BIT-SEAT convicting the real HEAD byte verbatim:
`expected '@layer components {\n    .checkbox {\…' not to match /position:\s*absolute/`.

Post-cut: **5 passed (5)**.

**Two adjacent gates re-keyed, because this cut moved their subject:**
- `tests/styles/contrast-computed.test.ts` §3 ×3 — pinned to the deleted
  `--control-ring`. Re-keyed to measure the composition **read off the register file**,
  so gate and paint cannot drift. Its `resolveColour` was taught the one-ink idiom
  (`calc(var(--ink-*) * 100%)` inside a `color-mix`) that `color-radius.css` §1.2
  declares verbatim and that the resolver could not previously parse at all — a
  capability gap, not a workaround. **61 passed (61)**.
- `tests/components/checkbox.contract.test.ts` ×2 and `switch.contract.test.ts` ×1 —
  `.checkbox__seat` (routed at §9 item 5), the glyph-presence assertion (which was the
  same fact as "the mark can never animate in"), and `data-size`.

## 6 · VERIFY GATE, VERBATIM

*The figures below are the CUT's, taken before the 2026-08-08 cure round. **The
post-cure verify is §11.5** and the register receipt is byte-identical across both.*

```
$ npx vue-tsc --noEmit
(no output — clean)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 153 passed (159)
      Tests  11 failed | 1466 passed | 5 expected fail (1482)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

The receipt is **byte-identical pre- and post-cut** (taken at this seat before the first
edit and after the last). It matches ⊕⁵⁸'s banked line exactly, including `violations:1`
(#40's `pager.tabs.panel-linkage`) and `drift:1` (#65's routed tags-input row) — the
brief's expected `violations:0` is superseded by ⊕⁵⁸'s own record and by #40's
still-uncommitted lane.

**All 11 failures are FOREIGN and pre-existing**, reproducing ⊕⁵⁸'s banked set exactly:
#40 W-PAGER ×10 (`pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `gate-register` ×3 ·
`carousel/contract` ×1 · `overfit-structure`'s `useLeadTrail` export leak ×1) and #7's
`stacked-url-filter` ×1. Zero lane files appear in any of them.

**One gate this cut had to satisfy by BUILDING, not by editing**: `boot-graph`'s
dist-demo staleness arm ("a stale build greens a regressed graph"). `npm run
demo:dist:build` → `✓ built in 1.90s`.

**And the #81 lesson applied**, because a class that is right in source and absent from
every emitted stylesheet is invisible to both the type plane and the unit suite. Read
off the BUILT sheets (`dist-demo/assets/*.css`), by fixed string:

```
control-bit{               5      control-bit__mark{        4
control-bit__face{        12      control-bit:focus-visible 4
checkbox{                  1      switch__thumb{            4
radio-group{               1      radio-group__dot{         1
--- struck (expect 0) ---
checkbox__seat 0 · switch__track 0 · radio-group__item 0 · control-ring 0
```

## 7 · LOC — §8's target missed on `wc -l`, beaten on the measure that means something

| measure | HEAD | post | Δ |
|---|---|---|---|
| lane CSS **rules** | 39 | **27** (10 shell + 17 register) → **28** at the cure round (+ the `.dark` recess arm) | **−31%** → −28% |
| lane CSS **declarations** | 138 | **88** (26 shell + 62 register) → **91** at the cure round (+1 dark fill, +1 disabled edge, +1 face radius fallback net of the deleted host default) | **−36%** → −34% |
| per-shell paint (rules / decls) | 39 / 138 | **10 / 26** | **−74% / −81%** |
| code-only lines, 7 shell files | 432 | 222 | −49% |
| code-only lines, incl. the register | 432 | 369 → **376** at the cure round | −15% → −13% |
| `wc -l`, incl. derivation prose | 495 | 693 → **766** at the cure round | +40% → +55% |

§8 projected 502 → ≈335 on `wc -l`. **That is not what shipped and the number is
reported rather than massaged**: the register carries its derivation the way every
other register in `src/styles/glass/` does, and multi-line `color-mix()` under this
repo's prettier costs ~5 lines per expression. §8's own closing sentence is the honest
frame and it holds exactly: *"the deliverable is twenty-eight answers → nine; D1 / D2 /
D3 / D4 / D6 / D8 are invisible in a diffstat and every one is a gate above."* Post-cut
answer census: press mechanisms **3 composed, 0 declared** · focus **1 recipe + 1 host
suppression + 1 forced-colors arm** · invalid **1** · forced-colors **1** · hover **1** ·
disabled **2 rules + 2 guards** · `50%` **0** · `backdrop-filter` **0**.

## 8 · ROUTED — what this row opened and did not close

| # | obligation | owner |
|---|---|---|
| R83-1 | `--control-recess` NAME for the A10 recess fill (value ruled: host − 4% L, shipped as the 4% ink veil with its seam marked). **[2026-08-08, cure round] AMENDED: it must be a PER-ARM PAIR, not one value.** No single ink recesses over both an L\* 0.99 page and an L\* 0.15 page — a `--foreground`-relative literal *inverts* in dark (measured +0.0419 L\* on the dark page), which is the defect CURE-3 cured at lane scale with a plain `.dark` arm. A one-value `--control-recess` re-mints that defect at library scale. #68 lands `light`/`dark` arms; the lane's `.dark .control-bit` arm retires into it | **#68** |
| R83-2 | `--radius-md` → `--radius-tick` rename (PROPORTION §8:329, value unchanged) + PROPORTION §4's tick row `h=18` → `h=20` at source | **#68** |
| R83-3 | subpaths `./checkbox` + `./radio-group` + the ONE `public-surface.spec.ts` re-pin | **the C-10 batch** (DAG:289) |
| R83-4 | the perimeter-rung headroom question — 0.48 clears the worst light surface by 0.011; if a control perimeter wants a cushion the RUNG moves | **#68**, with #10's measured cells |
| R83-5 | `.glass-control-edge` relocation into `styles/glass/` (C-5); its docstring count corrected here to 1, its home is not this row's | **#82**, sweep at **#61** |
| R83-6 | `ControlProps` consumption; `size` question is its own | **#84** |
| R83-7 | MOTION-CANON LAW-0c — stretch amplitude as a function of the job's amplitude. Until ruled, no manufactured thumb weight (`--lq-stretch-x` on a 20px thumb is 1.2px). Corollary handed back: the same arithmetic is why the press answers on FILL | **MOTION-CANON** |
| R83-8 | consumer relay addenda — atlas ×3 · fourier-analysis ×3 · value.js shims. Type delta: `size` and `\| null` removals (0 external passers, re-verified). Visual delta: checkbox circle → tick square 16→20, radio face 18→20, **switch silhouette UNCHANGED**; layout delta: checkbox/radio hosts become in-flow 44×44 | their tranches |
| R83-9 | the §0e four-cell in-mode glass-ladder re-measure (owed to all ten lanes) | **surface-material lane** |
| **R83-10** ⊕ cure round | **THE SOURCE-ORDER CUSTOM-PROPERTY COLLISION, at FAMILY level.** CURE-4 cured one instance inside this fence; the same failure mode is live outside it and is not a checkbox's to fix. `--glass-border-rung` is declared at `src/styles/glass/surfaces.css:31` (head `.glass-card`, `:15`) and again at `src/components/card/styles.css:59` (head `.card`) and `:63` (`.card[data-shadow]`, which at least discriminates by attribute). `.glass-card` and `.card` are the two halves of the C-4 split and co-occur on a Card root, so the first pair is **(0,1,0) vs (0,1,0), same `@layer components`, decided by stylesheet source order alone** — the register is @import-ed from `styles/glass.css`, the shell sheet arrives with its SFC, and which boundary ink a card wears is a bundler-ordering fact. THE GENERAL CURE IS CURE-4'S: the register states the value as the CONSUMING declaration's `var()` fallback and declares no host default, so the ROLE either speaks or inherits and there is no tie to break. Handed over with its anchors, not fixed here | **the card/surface-material owner (#79's family; sweep at #61)** |
| **R83-11** ⊕ cure round | **THE FOCUS GLOW'S INK, not its colour space.** This register's glow leg is `0 0 8px color-mix(in oklab, var(--foreground) 15%, transparent)` (`control-bit.css:326`); the library's A1 glow of record is `0 0 8px color-mix(in srgb, var(--focus-ring-color) 15%, transparent)` (`tokens/scale-paper.css:63`). The **space** deviation is INERT and is recorded so nobody "fixes" it twice: for the form `<color> N%, transparent` the mix is premultiplied against a zero-alpha operand, so oklab and srgb both resolve to the same colour at 0.15 alpha. The **ink** deviation is REAL and mode-asymmetric: light `--focus-ring-color` and `--foreground` are the same `hsl(24 10% 10%)`, but dark they are `hsl(48 10% 70%)` vs `hsl(30 14% 90%)` — so in dark this lane's glow is brighter and warmer than every other focus glow in the library. One ink or the other, library-wide | **#68**, beside R83-4 |

## 9 · π OWED TO #10 — twelve rows, both engines, both modes

§6's P1-P12 at `/forms/checks`, Chromium port 5400 **and** real `safari-app` 26.4
(`safari-probe.mjs`, `pkill -f safaridriver` first; Playwright-WebKit is never labelled
Safari; no `getContext()` on live canvases), 1440×900 + 402×874, paired RED/GREEN
artifacts. **P2 is the decisive one** — the perimeter's worst light cell is computed at
3.011, and a computed figure is not a painted one. **P3** asserts the KEPT switch
symmetry in LTR and RTL (the cell that would catch a well-meaning "fix" of the refuted
D4). **P12** is the ADJ-3 cost capture that must accompany R83-8's relay addenda.

## 10 · FILES

```
NEW     src/styles/glass/control-bit.css                   327 → 400  (cure round)
NEW     src/components/_shared/control.ts                    38
NEW     tests/components/control-bit/binary-triad.test.ts   268 → 308  (cure round)
DELETED src/components/_shared/control-size.ts             (10)
FMT     src/components/radio-group/index.ts                   4  (CURE-6, prettier;
                                                                  NOT in the diffstat
                                                                  below — see §11.7)
```

`git diff --stat`, scoped to this row's fence (the working tree also carries #32 · #33 ·
#35 · #40 · #71's uncommitted work — `scale-paper.css` in particular holds #71
W-EYEGLASS hunks that are **not this row's**; this row's share of that file is the
`--control-ring` block strike alone):

```
 demo/stories/forms/checks.vue                   | 113 ++++++++++++++--------
 src/components/_shared/control-size.ts          |  10 --
 src/components/_shared/field/field-surfaces.css |   9 ++
 src/components/_shared/index.ts                 |   4 +-
 src/components/checkbox/Checkbox.vue            |  40 ++++----
 src/components/checkbox/styles.css              |  79 ++++------------
 src/components/input/types.ts                   |   2 +-
 src/components/radio-group/RadioGroup.vue       |  48 +++++++---
 src/components/radio-group/RadioGroupItem.vue   |  17 +++-
 src/components/radio-group/styles.css           | 117 ++++-------------------
 src/components/search/SearchBar.vue             |   2 +-
 src/components/search/index.ts                  |   2 +-
 src/components/search/searchVariants.ts         |   2 +-
 src/components/switch/Switch.vue                |  48 ++++++----
 src/components/switch/styles.css                | 120 ++++++++----------------
 src/components/textarea/types.ts                |   2 +-
 src/forms.ts                                    |   6 +-
 src/styles/glass.css                            |  16 ++++   ← SEE THE STRIKE BELOW
 src/styles/glass/control-surfaces.css           |   2 +-
 src/styles/utilities/components.css             |   2 +-
 tests/components/checkbox.contract.test.ts      |  43 +++++----
 tests/components/switch.contract.test.ts        |  11 ++-
 tests/styles/contrast-computed.test.ts          |  84 ++++++++++++++---
 23 files changed, 385 insertions(+), 394 deletions(-)
 + src/styles/tokens/scale-paper.css              (this row: 29 ins / 38 del, the
                                                   --control-ring block; the file's
                                                   other hunks are #71's)
```

**[2026-08-08, cure round — CURE-5] THE `glass.css` "16 ++++" IS NOT THIS ROW'S, AND
THE MIS-ATTRIBUTION IS DISCLOSED RATHER THAN LEFT TO THE DRIVER TO DISCOVER.** The file
carries **two** uncommitted `@import` blocks and this row wrote only one:

| hunk | lines | owner | evidence |
|---|---|---|---|
| the `control-bit.css` block (6-line doc-comment + 1 `@import`) | **7** | **#83, this row** | the register it imports is this row's NEW file |
| the `overlay-plate.css` block (8-line doc-comment + 1 `@import`) | **9** | **#81 W-PICKER, uncommitted residue** | `git show HEAD:src/styles/glass.css \| grep -c overlay-plate` → **0**; `git show --stat 49c38506 \| grep -c glass.css` → **0** (#81's landed commit never touched this file); `overlay-plate.css` IS tracked at HEAD but **no file `@import`s it** there — its three HEAD citations (`styles/index.css:159`, `_shared/field/field-surfaces.css:21`, `select/SelectContent.vue:70,102`) are all PROSE, so at HEAD it is a **dead sheet** whose rules reach no emitted stylesheet. With the working-tree hunk live it does paint (`glass-field-portal` present in `dist-demo/assets/index-*.css`) |

So the honest stat is `src/styles/glass.css | 7 +++` for #83 and `| 9 +++` for #81.
**DRIVER DISPOSITION (per CURE-ORDER-83 §"Driver duties"):** the 9-line overlay-plate
hunk lands FIRST as a **"#81 completion" rider commit** by index surgery, signed to #81
(the `ff7451d7`/`48368ad2` precedent class); #83's commit then stages the remaining
7-line hunk alone. This seat performed **no** index surgery and **did not touch** those
9 lines — shared-tree law.

---

## 11 · CURE ROUND — 2026-08-08 (driver-ratified CURE-ORDER-83, all six executed)

**modelId: `claude-opus-5[1m]`** (CURE seat). Shared-tree law observed: no `git add /
commit / stash / checkout / restore / mv` was run at this seat; files were edited in
place only. The five uncommitted foreign lanes (#32 · #33 · #35 · #40 · #71) and the
9-line `#81` overlay-plate residue in `src/styles/glass.css` were **not touched**.

| cure | S | status | what landed |
|---|---|---|---|
| CURE-1 | S1 | **DONE** | `control-bit.css` base disabled rung re-points `--control-bit-edge` to the 45% mix; CWT-3:728's full-alpha-border clause REFUSED with grounds recorded in the sheet; gate clause added born-RED; `/forms/checks` gains a disabled+checked specimen |
| CURE-2 | S2 | **DONE** | `checks.vue` — `gap-3` on the four switch clusters, `gap-6` on the wrapper; §2.5's residue rationale struck in place, dated |
| CURE-3 | S2 | **DONE** | plain `.dark .control-bit` arm re-points `--control-bit-fill` to `oklch(0 0 0 / 0.14)`; the seam comment's false "composes on card, glass and page alike" struck; R83-1 amended to a per-arm pair for #68 |
| CURE-4 | S2 | **DONE** | host default at `control-bit.css:76` DELETED; face reads `border-radius: var(--control-bit-radius, var(--radius-pill))`; built-sheet falsifier re-run |
| CURE-5 | S3 | **DONE** | §10 fence stat disclosed as 7 (#83) + 9 (#81 residue), with the evidence and the driver-rider disposition |
| CURE-6 | S3 | **DONE** | `prettier --write src/components/radio-group/index.ts` (was the sole `--check` warn named by D13) |

### 11.1 · CURE-1 — the refusal, and its grounds

> **REFUSED: spec `COMPONENT-WAVES-TERMINAL-3.md:728`'s "geometry and border at full
> alpha" clause, on the measurement that holding the border at full alpha made an
> UNCHECKED disabled bit paint byte-identically to an enabled one — the mark is
> force-mounted at `opacity: 0` until `[data-state]` says otherwise, so softening
> `--control-bit-mark-ink` alone changed no painted pixel and the whole disabled arm
> reduced to `cursor: not-allowed`; that is a strict regression from the `opacity: 0.5`
> this register retired, and it was invisible on the row's own π route because all four
> `/forms/checks` disabled specimens are unchecked, so the one arm the rung did paint
> was the one arm nothing displayed.**

The refusal is partial and stays inside A4's actual law: **dim ≠ shrink.** GEOMETRY —
the 44px seat, the face box, the corner, the 1px perimeter's WIDTH — is untouched at
full alpha. Only the two INKS soften, both at the same 45% the register already used:
`--control-bit-mark-ink` (unchanged) and now `--control-bit-edge`
(`color-mix(in oklab, var(--control-bit-ink) 45%, transparent)` = 0.48 × 0.45 = **0.216**
effective ink). `opacity` stays retired — the gate asserts its absence from the rung.
The checked arm's rung is (0,3,0) against this (0,2,0) and still re-points both
properties to the state colour, so a disabled+checked bit is unchanged by this cure.
This follows the #80/#81 refuse-with-grounds precedent: the spec clause is named, the
measurement that beats it is stated, and the narrowest possible deviation is taken.

### 11.2 · CURE-3 — the computed L pair

All figures oklab L\*, sRGB-composited at 8-bit, tokens read from
`tokens/light-dark.css` / `tokens/dark-arm.css` (page `--neutral-0`, card `--card`):

| arm · host | host L\* | face L\* | ΔL\* |
|---|---|---|---|
| light · page `hsl(40 30% 98%)` | 0.9853 | 0.9584 | **−0.0270** |
| light · card `hsl(30 85% 96%)` | 0.9739 | 0.9471 | **−0.0268** |
| dark · page `hsl(24 9% 4%)` — **PRE-CURE** | 0.1456 | **0.1875** | **+0.0419** ← inverted |
| dark · card `hsl(26 22% 17%)` — **PRE-CURE** | 0.2949 | **0.3251** | **+0.0302** ← inverted |
| dark · page — **POST-CURE** | 0.1456 | **0.1406** | **−0.0050** |
| dark · card — **POST-CURE** | 0.2949 | **0.2683** | **−0.0265** |

**The decisive pair is `0.2949 → 0.2683` against light's `0.9739 → 0.9471`:
ΔL\* −0.0265 vs −0.0268, the same recess in both arms on the surface a checks atom
actually sits on.** The dark PAGE cell is smaller and the arithmetic says why rather
than the number being massaged: at L\* 0.1456 the page is near oklab's steep
black slope, so a 14% black veil buys only −0.0050 there. **No pole can do better**:
the dark veil ink `oklch(0.17 0.03 70)` sits ABOVE the page floor and *raises* it at
every alpha, which is precisely why the pole is that ink's own limit `oklch(0 0 0)` and
why R83-1 goes to #68 as a **per-arm pair**. Darkening toward black scales the host's
channels and leaves its HUE untouched, so the warm identity survives the recess.

Mechanism: a **plain `.dark .control-bit` ancestor override** — the shape
`glass/grain-overlay.css`, `glass/glass-chip.css`, `glass/overlay-plate.css:144` and
`glass/surfaces-pager.css:61` already carry. **Never `:global()`** (a `:global(.dark) .x`
inside a scoped block drops silently from the emitted sheet — the house's
thrice-recurring trap) and no `light-dark()` here: `darkModeSyncScript()` stamps the
class at parse time and it tracks `prefers-color-scheme`, so the class IS the mode.
Placement is load-bearing and deliberate: the arm sits at (0,2,0) **before** the checked
rule, so `[data-state="checked"]` (also (0,2,0), later) still wins the fill in dark.

### 11.3 · CURE-4 — the collision, and the built-sheet falsifier

`.control-bit { --control-bit-radius: var(--radius-pill) }` and
`.checkbox { --control-bit-radius: var(--radius-md) }` were **both (0,1,0) on the same
host in the same `@layer components`** — the register @import-ed from `styles/glass.css`,
the shell sheet arriving with its SFC — so D1's entire headline (a checkbox is a TICK,
silhouette-distinct from a radio's disc) rode **stylesheet source order**, not the
cascade. The host default is deleted and the face adopts the register's own fallback
idiom. Re-run on the BUILT sheets after `npm run demo:dist:build`:

```
dist-demo/assets/index-DUiBqRzq.css   (the register)
  .control-bit__face{ … border-radius:var(--control-bit-radius,var(--radius-pill)); … }
  control-bit-radius occurrences: 1   ← the fallback READ, no host default

dist-demo/assets/Checkbox-C2ykYivE.css   (the role)
  --control-bit-radius:var(--radius-md)
  control-bit-radius occurrences: 1

Switch-CtRA8-E2.css · (radio-group ships no own sheet chunk)  → 0 occurrences
```

Resolved corners, emitted: **checkbox `--radius-md` = 6px** on a 20px face (the tick,
square-ish, `r = 0.30 × h` exactly) · **switch and radio `--radius-pill` = 9999px** via
the fallback (`theme/radius.css:104,110`). Also verified emitted at the same build:
`.dark .control-bit{--control-bit-fill:oklch(0% 0 0/.14)}` and the disabled rung's
`--control-bit-edge:color-mix(in oklab, var(--control-bit-ink) 45%, transparent)`.

### 11.4 · Gates — born-RED, then green

Both new clauses were written BEFORE the bytes that satisfy them and run against the
pre-cure register (banked at
`scratchpad/control-bit.PRE-CURE.css`):

```
× declares each control law exactly once, and no transition targets a host
× carries one object size, one corner spelling, and the kept switch geometry
  Tests  2 failed | 3 passed (5)

AssertionError: expected '\n        --control-bit-mark-ink: col…' to contain '--control-bit-edge:'
AssertionError: expected '\n\n@layer components {\n    .control…' to contain 'border-radius: var(--control-bit-radi…'
```

Post-cure: **5 passed (5)**. The G-BIT-GEO clause was RE-KEYED rather than added —
`expect(register).toContain("--control-bit-radius: var(--radius-pill)")` asserted the
very host default CURE-4 deletes, so it now asserts the fallback form plus
`expect(register).not.toMatch(/^\s*--control-bit-radius:/m)`: the register may not
re-grow a host default. SEATS **+0** (unchanged; tier-3 acceptance class).

### 11.5 · VERIFY, post-cure (verbatim)

```
$ npx vue-tsc --noEmit
(no output — clean)

$ npx vitest run tests/components/control-bit tests/components/checkbox tests/components/switch
 Test Files  3 passed (3)
      Tests  14 passed (14)

$ npx vitest run tests/components/control-bit tests/components/checkbox tests/components/switch tests/components/radio-group
 Test Files  4 passed (4)
      Tests  17 passed (17)

$ npx vitest run tests/styles tests/components tests/gates
      Tests  11 failed | 1466 passed | 5 expected fail (1482)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ npm run demo:dist:build
✓ built in 1.44s
```

The register receipt is **byte-identical** to §6's pre-cure line, `violations:1` (#40's
`pager.tabs.panel-linkage`) and `drift:1` (#65's routed tags-input row) included. The
11 failures are the same FOREIGN set §6 banked, unchanged and unmoved: #40 W-PAGER ×10
(`pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `gate-register` ×3 ·
`carousel/contract` ×1 · `overfit-structure`'s `useLeadTrail` export leak ×1) and #7's
`stacked-url-filter` ×1. **Zero lane files appear in any of them, and the cure round
added no failure and fixed no foreign one.**

### 11.6 · Fold-notes (the four the order names, plus what this seat found)

1. **The focus-glow oklab-vs-srgb deviation.** Stated, and half of it is a non-issue:
   for the form `<color> N%, transparent` the mix is premultiplied against a zero-alpha
   operand, so `in oklab` and `in srgb` resolve to the identical colour at 0.15 alpha —
   **the space deviation is inert.** What is NOT inert is the INK: this lane's glow
   reads `--foreground`, the library's A1 glow (`tokens/scale-paper.css:63`) reads
   `--focus-ring-color`. Light they are the same `hsl(24 10% 10%)`; dark they are
   `hsl(30 14% 90%)` vs `hsl(48 10% 70%)`, so this lane's dark glow is brighter and
   warmer than every other. Routed as **R83-11 → #68**.
2. **The ASK g6 cite is TRANCHE-QUALIFIED.** The line number was right and the path was
   implicit: g6 is `docs/tranches/**BK**/ASK.md:37` (*"number-field — lane ships it vs
   zero-consumer-ex-muster | #82's cut | KEEP in the W-FIELD lane (#82)"*). BJ's
   `ASK.md:37` also exists and reads entirely differently (a public-export KEEP argued
   from a sci-report ×2 + atlas ×2 census), so an unqualified `ASK.md:37` in a BK record
   resolves to the wrong row in one hop. Every §0 and §8 cite of it now carries the
   tranche letter.
3. **The boot-graph 12th failure, attributed and reproduced.** The full suite ran
   **12 failed** at this seat before the rebuild; the extra one was
   `tests/gates/boot-graph.test.ts > the dist-demo it measures is NEWER than every
   source it is built from`. It is **edit-induced mtime staleness, not a defect**: any
   `src/` write makes a source newer than the standing `dist-demo`, and the arm exists
   precisely to catch a stale build greening a regressed graph. `npm run
   demo:dist:build` cures it — boot-graph **14/14 green**, suite back to the banked 11.
   The general form: **this gate must be satisfied by BUILDING, never by editing**, and
   any seat that writes `src/` owes a rebuild before it reads a suite count.
4. **The radius-collision family precedent, routed at family level.** Same class as
   CURE-4, live outside this fence: `--glass-border-rung` at
   `src/styles/glass/surfaces.css:31` (head `.glass-card`, `:15`) vs
   `src/components/card/styles.css:59` (head `.card`) — two (0,1,0) declarations, one
   `@layer components`, resolved by source order. Routed as **R83-10 → the
   card/surface-material owner (#79's family; sweep at #61)** with the general cure
   named (register states the value as the consuming declaration's `var()` fallback,
   declares no host default).

### 11.7 · Defects the order did NOT name — recorded, not fixed

1. **The row's own new files are `prettier --check` DIRTY, and CURE-6 named only one of
   them.** D13's census was taken at HEAD, before these files existed. Measured at this
   seat against the **pre-cure** bytes (so the attribution is not this round's):
   `demo/stories/forms/checks.vue` and
   `tests/components/control-bit/binary-triad.test.ts` both warn. Every delta is
   cosmetic line-wrapping on **pre-existing** lines — the cure round's own additions are
   prettier-clean, verified hunk by hunk — so nothing was reformatted, because a
   whole-file rewrite would put the driver's diff outside the cures it ratified. The
   repo has **no** prettier gate and **no** `format`/`lint` npm script, so this binds
   nothing mechanically; it is the same hygiene class as CURE-6 and it wants the same
   one-line answer at the driver's discretion.
2. **`src/components/radio-group/index.ts` is a NEW file in the fence.** §10's
   `git diff --stat` does not list it (it was byte-unchanged at the cut and became
   dirty only at CURE-6). The driver's fence for #83 is §10's list **+ this file**.
3. **The bundler emits an un-mixed fallback for the softened edge.** `lightningcss`
   splits `--control-bit-edge: color-mix(…)` into a plain
   `--control-bit-edge:var(--control-bit-ink)` fallback plus the mixed declaration, so
   on an engine without `color-mix()` a disabled bit's perimeter returns to full alpha —
   i.e. exactly the pre-cure defect, on that engine only. This is the bundler's standing
   progressive-enhancement split and it already applies to the sibling
   `--control-bit-mark-ink` line, so it is a house-wide property of the emit, not
   something this cure introduced. Recorded so the π seat is not surprised by it.
