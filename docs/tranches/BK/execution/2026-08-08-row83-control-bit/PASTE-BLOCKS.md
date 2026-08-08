# Banked paste blocks — BK Φ5 Row #83 W-CONTROL-BIT

The driver applies these; this seat writes no committed record in place.
Full detail: `docs/tranches/BK/execution/2026-08-08-row83-control-bit/RECORD.md`.

---

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — Φ5 table, row 83 state cell

Replace `UNSTARTED` in the `| 83 | W-CONTROL-BIT | Φ5 |` row with:

```
**LANDED** (⊕⁵⁹ 2026-08-08, `155aa2f1`) — the C-6 rename executed and the triad re-seated on ONE register: `styles/glass/control-bit.css` (@import'ed once, after `control-surfaces.css` — the C-5 sibling) + `_shared/control-size.ts` → `_shared/control.ts` (+`ControlProps`+`controlStateAttrs`, 6 importers re-pointed, no alias) + three ≤50-line shells. Lane CSS **39 rules/138 decls → 27/88** (**28/91** after the cure round's `.dark` arm), per-shell paint **39/138 → 10/26**. `--control-ring` DELETED (both readers were the two faces). Five born-RED gates at `tests/components/control-bit/binary-triad.test.ts`, **SEATS +0** (tier-3 acceptance class, #79/#80/#81 precedent) — receipt byte-identical `seats:60 … bound:8 … unbound:50 … violations:1`. **CURE ROUND 2026-08-08, all six of CURE-ORDER-83 executed** (RECORD §11): the disabled rung softens the EDGE (CWT-3:728's full-alpha-border clause refused on measurement — an unchecked disabled bit had painted identically to an enabled one), the A10 recess gains a plain `.dark .control-bit` arm (dark card ΔL\* **+0.0302 → −0.0265**, matching light's −0.0268), the `--control-bit-radius` source-order collision is killed by the register's `var()` fallback, and the switch's 0px pairing gap is restored to `gap-3`/`gap-6`. π P1-P12 owed to #10, P2 decisive. ROUTED: R83-1/2/4/11 → #68 · R83-3 → C-10 batch · R83-5 → #82/#61 · R83-6 → #84 · R83-7 → MOTION-CANON · R83-8 → consumers · R83-9 → surface-material · **R83-10 (source-order custom-property collision, family level) → the card/surface-material owner**
```

---

## B · `docs/tranches/BK/EXECUTION-PROGRESS.md` — new ledger entry, appended after ⊕⁵⁸

```
⊕⁵⁹ **#83 W-CONTROL-BIT LANDS (2026-08-08, `155aa2f1`) — the tier-3 band's fourth lane, and
the one where the spec's own adjudication was refuted by the compiler.** [body as
recorded in the row cell above; seat-level detail at
`docs/tranches/BK/execution/2026-08-08-row83-control-bit/RECORD.md`.]

**THE HEADLINE, and it is a ruling not a defect.** ADJ-5 struck RadioGroup's runtime
throw and ordered `useForwardPropsEmits` "like its siblings" on the falsifier that
Checkbox and Switch narrow reka's emit *by declaration alone through the identical
seam*. They do not narrow anything — their reka emits are ALREADY
`boolean | 'indeterminate'` and `boolean`. `RadioGroupRoot` emits `AcceptableValue`,
strictly wider, and under `strictFunctionTypes` the forward is a compile error:
`Type '(value: SelectionValue) => void' is not assignable to type '(payload:
AcceptableValue) => any'. … Type 'null' is not assignable to type 'SelectionValue'.`
So the LOSING arm (R6, "removing it needs an unchecked cast") was right on the
mechanism and wrong on the conclusion. **Executed: throw struck, one documented cast**,
sound because `RadioGroupItemProps.value: SelectionValue` is the only entry point — and
the resulting shape is not the "emit-doctrine fork" D13 named, it is byte-for-byte the
library's ONE grammar for the `SelectionValue`-over-`AcceptableValue` seam, live at
`select/Select.vue`, landed by **#81 nine hours earlier**. The general form is worth
carrying: **an adjudication is only as good as its falsifier, and a falsifier that was
never run against the type-checker is a claim.**

**THE SECOND LESSON: a material cut can delete the byte its own geometry rests on.**
ADJ-1 keeps the switch silhouette byte-for-byte, and the arithmetic that makes 44×24
pad-1 symmetric depends on `.glass-wash`'s `border: 1px solid` (`ladder.css:49`) — which
D7 orders struck. Dropping the class without replacing that byte moves the checked
far-inset 2 → 3 and breaks ADJ-1 **while curing D7**. The register's own 1px perimeter
lands on the same edge, so rest inset = 2 and checked far = 44−1−1−20−20 = 2 survive
the cut untouched. A defect row and a keep row can share a byte; strike lists do not
say so.

**THREE §2 FIGURES CORRECTED FROM DISK, none carried.** (1) G-BIT-ONE's mutation column
says "2 host shorthands"; the measured count is **1** — only `.checkbox` targets its
host. ADJ-4's own prose was already right (*one dead press, one FORKED press on
`.radio-group__face`, one correct*) and the mutation column had counted the fork as a
host rule. (2) D2's headline "1.277:1 / 1.278:1" is **stale**: #31 W-A11Y re-derived
that alpha 12% → 50% on 2026-08-05, so the contrast half was already over the bar at
HEAD; what this row cures is the FORK (a colour-valued ink beside a bare-scalar
register), not the ratio. (3) §8's `502 → ≈335` did not ship and is **reported, not
massaged** — `wc -l` goes 495 → 693 because the register carries its derivation like
every sibling in `styles/glass/`, while the measure §8's own closing sentence names goes
the right way: lane CSS **39 rules/138 decls → 27/88**, per-shell paint **−74%/−81%**,
answers **28 → 9**.

**THE HEADROOM DELTA, MEASURED AND PAID.** Deleting `--control-ring` for the perimeter
rung trades #31's even-rung cushion for the floor itself. Ten cells re-composited with
G-CONTRAST-COMPUTED's own resolver: light `--secondary` **3.184 → 3.011**, dark
`--card`/`--popover` 3.984 → 3.791, all ten still over 3.0, the worst by **0.011**. Paid
deliberately: a component lane does not keep a private stronger ink because it likes the
margin — if 0.48 is short, the RUNG moves and every control moves with it (**#68**). The
gate's §3 cases now READ the composition off `control-bit.css` rather than restating a
literal, so gate and paint cannot drift; its `resolveColour` was taught the
`calc(var(--ink-*) * 100%)` idiom `color-radius.css` §1.2 declares verbatim and that it
could not previously parse at all.

**BORN-RED, against `git show HEAD:` bytes in a scratch tree** (register absent → empty
`@layer components {}` so each gate fails on its own clause, not on ENOENT): **5 failed
(5)**, with G-BIT-SEAT convicting the real byte — `expected '@layer components {\n
.checkbox {\…' not to match /position:\s*absolute/`. Post-cut **5 passed (5)**.

**THE CURE ROUND (2026-08-08) — CURE-ORDER-83 ratified six cures and all six landed;
full record at the row's `RECORD.md` §11.** Four of them are worth carrying up, because
each is a general form and not a checkbox's local mess.

**(1) A DISABLED STATE THAT ONLY THE POINTER COULD FEEL.** The register retired
`opacity` for ink — correct — and then softened only `--control-bit-mark-ink`. But the
mark is force-mounted at `opacity: 0` until `[data-state]` says otherwise, so on an
UNCHECKED bit that declaration changes no painted pixel and the entire disabled arm
reduced to `cursor: not-allowed`. A strict regression from the `opacity: 0.5` it
replaced — and **invisible on the row's own π route**, because all four `/forms/checks`
disabled specimens are unchecked, so the one arm the rung did paint was the one arm
nothing displayed. Spec **CWT-3:728's "geometry and border at full alpha" clause is
REFUSED** on that measurement (the #80/#81 refuse-with-grounds precedent), narrowly:
GEOMETRY stays at full alpha (dim ≠ shrink), the BORDER softens with the ink at the same
45%. A disabled+checked specimen now exists on the route. The general form: **a state
whose whole delivery is a property that resolves to nothing in the state's own common
case has not been implemented, it has been declared.**

**(2) A RECESS THAT INVERTED IN DARK, because the pole was a mode-inverting token.** The
A10 fill was `color-mix(in oklab, var(--foreground) 4%, transparent)` — right in light,
where `--foreground` IS the warm near-black. In dark `--foreground` is `hsl(30 14% 90%)`,
a cream, so the 4% step that recesses in light **raises** in dark: measured oklab
L\* 0.1456 → **0.1875** on the page (**+0.0419**) and 0.2949 → **0.3251** on the card
(+0.0302). The recess painted as a LIFT — A10's own defect wearing the cure's name — and
the seam comment claimed it "composes correctly on card, glass and page alike", which is
now struck. Cured with a **plain `.dark .control-bit` ancestor arm** (never `:global()`,
never `light-dark()` — the class is stamped at parse time and tracks the OS preference)
re-pointing the pole to `oklch(0 0 0 / 0.14)`: the veil recipe's own ink taken to its
limit, because the dark veil ink `oklch(0.17 0.03 70)` sits ABOVE the L\* 0.1456 page
floor and cannot recess against it. Post-cure dark card L\* 0.2949 → **0.2683**,
**ΔL\* −0.0265 against the light arm's −0.0268** — the same recess in both arms. The dark
PAGE cell is floor-bounded at −0.0050 and reported rather than massaged. **R83-1 is
amended: `--control-recess` must land at #68 as a PER-ARM PAIR** — no single ink recesses
over both an L\* 0.99 page and an L\* 0.15 page, and the token that tries re-mints this
defect at library scale.

**(3) D1's HEADLINE RODE BUNDLER ORDER.** `.control-bit { --control-bit-radius }` and
`.checkbox { --control-bit-radius }` are **both (0,1,0), same host, same
`@layer components`** — so which corner a checkbox wears was decided by stylesheet source
order alone, and "a checkbox is a TICK, silhouette-distinct from a radio's disc" was a
fact about the bundler. The host default is DELETED and the face adopts the register's
own fallback idiom, `border-radius: var(--control-bit-radius, var(--radius-pill))`: the
ROLE speaks or it inherits, and there is no tie to break. Verified on the BUILT sheets —
one occurrence in the register (the fallback read), one in `Checkbox-*.css` (the role),
zero in the switch's; resolved corners **6px tick / 9999px pill**. **The same collision
class is live outside this fence** (`--glass-border-rung` at `glass/surfaces.css:31`
`.glass-card` vs `card/styles.css:59` `.card`) and is routed as **R83-10** with the
general cure named.

**(4) A PAIRING GAP OF ZERO, defended by arithmetic that was zero.** §2.5 justified
`gap 0` on the demo route as "the bit↔label pairing rides the seat's own 12px residue" —
true for a 1:1 bit (`max(44, 20)` = 44, face centres, 12px falls out each side), and
**exactly false for the switch**, whose `--control-bit-face-inline` IS 2.75rem = 44px, so
`max(44, 44)` = 44 and the residue is **0**. The track and its label touched on all four
clusters. Restored `gap-3` on the clusters and `gap-6` on the wrapper (separation twice
pairing); the rationale is struck in place, dated. The checkbox/radio `gap-8`/`gap-6`
removals stand — there the arithmetic was real.

**VERIFY** (post-cure) — `npx vue-tsc --noEmit` clean · `npx vitest run tests/styles tests/components
tests/gates` → **11 failed | 1466 passed | 5 expected fail (1482)**, **every failure
FOREIGN** and reproducing ⊕⁵⁸'s banked set exactly (#40 W-PAGER ×10 incl. `carousel/
contract` ×1 and the `useLeadTrail` export leak, #7's `stacked-url-filter` ×1) · register
receipt **byte-identical pre+post**: `seats:60 active:48 reserved:5 worstCase:53
remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91
violations:1` · `regen-exports.mjs` **exportKeys 66/66 EXACT, exit 0** (no subpath mint —
C-10 holds) · `npm run demo:dist:build` ✓ (boot-graph's staleness arm is satisfied by
BUILDING, never by editing — the cure round reproduced this exactly: the suite read
**12 failed** after the `src/` writes, the twelfth being boot-graph's own
`the dist-demo it measures is NEWER than every source it is built from`, and the rebuild
put it back to the banked 11 with boot-graph **14/14**) · and the **#81 falsifier re-run
on the BUILT sheets**: `control-bit{` **6** (5 at the cut + the cure round's
`.dark .control-bit` arm) · `control-bit__face{` 12 · `control-bit__mark{` 4 ·
`control-bit:focus-visible` 4, against `checkbox__seat` · `switch__track` ·
`radio-group__item` · `control-ring` → **0 each**; and CURE-4's own falsifier —
`control-bit-radius` occurrences **1** in the register sheet (the `var()` fallback on the
face, no host default) and **1** in `Checkbox-*.css` (the role re-point), **0** in the
switch's, resolving to a **6px** tick and a **9999px** pill.

**THE FENCE STAT IS CORRECTED, and it is not this row's error alone to carry.** §10's
`src/styles/glass.css | 16 ++++` is **7 lines #83's** (the `control-bit.css` @import
block) **+ 9 lines #81 W-PICKER's UNCOMMITTED RESIDUE** (the `overlay-plate.css` @import
block). Evidence: `git show HEAD:src/styles/glass.css | grep -c overlay-plate` → **0**;
`git show --stat 49c38506 | grep -c glass.css` → **0** — #81's landed commit never
touched this file; `overlay-plate.css` IS tracked at HEAD but **nothing `@import`s it
there**, its three HEAD citations being prose only (`styles/index.css:159`,
`_shared/field/field-surfaces.css:21`, `select/SelectContent.vue:70,102`), so at HEAD it
is a **dead sheet** whose rules reach no emitted stylesheet. **DRIVER DISPOSITION:** the
9-line hunk lands FIRST as a **"#81 completion" rider commit** by index surgery, signed
to #81 (the `ff7451d7`/`48368ad2` precedent class); #83's commit then stages the
remaining 7-line hunk alone. The cure seat performed no index surgery and did not touch
those 9 lines. The general form, and it is the third time this tranche has paid for it:
**a shared working tree makes `git diff --stat` a claim about the TREE, not about the
ROW, and a fence stat read off it without a per-hunk attribution will silently annex a
neighbour's work.**

**Φ5 procession: next = re-scout.** #83 **DISCHARGES #82 W-FIELD's `_shared/control.ts`
precondition** (C-6) — #82's remaining gate is **ASK g6** alone
(`docs/tranches/BK/ASK.md:37`, number-field KEEP, ruled but owner-facing; the path is
tranche-qualified deliberately — BJ's `ASK.md:37` exists and reads entirely differently,
so an unqualified cite resolves to the wrong row in one hop), so it is selectable the moment that reads
as satisfied; and **#84 W-TOGGLE-ROW** takes `ControlProps` from the same file (C-16),
though #84 also keeps **#19's W-SELECTION-ONE** hard precedence (landed ⊕³⁹). #85 · #87
are unblocked and unentangled. **#86 and #88 still cut `track-well.css` JOINTLY** (C-1);
**#89** remains the overlay family's convergence row carrying #81's four routes plus
this row's none. **C-10 stands** — this row minted no subpath and did not touch the pin.
#21 stays gated on #17 (Φ4-UNSTARTED), #25 on its rides-clause (and #82's
`field-control.css` cut is now one gate closer), #22 is CURE-CUT,
#42/#44/#45/#47/#48/#52 behind their DAG edges, #49/#50/#51/#53 ASK-gated, #58/#73 on
ASK g11, #67 on the owner's R-7 footage, #74 inside #88's cut. **#32 · #33 · #35 · #40 ·
#71 STILL SIT UNCOMMITTED IN THIS WORKING TREE** — `scale-paper.css` in particular holds
#71 W-EYEGLASS hunks that are NOT this row's, and every one of this cut's foreign
failures traces to #40 and #7. The cursor alone cannot show a lane that has not committed
(⊕⁴⁸); the census is re-taken at each cut. The procession still opens on a **re-scout**,
never on an assumed next.
```

---

## C · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:233` — row 83

Append to the cell, after `After #68`:

```
 ⊕⁵⁹ **LANDED 2026-08-08** (`155aa2f1`) — one register + one contract + three shells; `--control-ring` deleted (headroom 3.184→3.011 light worst, paid to #68); ADJ-5's outcome upheld with its stated ground REFUTED by `vue-tsc` (R6 right on the mechanism); §8's `502→≈335` did not ship and is reported not massaged (rules 39→27, decls 138→88, answers 28→9); SEATS +0; π P1-P12 → #10. **CURE-ORDER-83 (2026-08-08) executed in full, six cures**: disabled softens the EDGE (CWT-3:728's full-alpha-border clause refused on measurement — an unchecked disabled bit painted identically to an enabled one); the A10 recess gains a plain `.dark` arm (dark card ΔL\* +0.0302 → −0.0265 vs light's −0.0268; R83-1 amended to a per-arm pair); the `--control-bit-radius` (0,1,0)-vs-(0,1,0) source-order collision killed by the register's `var()` fallback (D1's headline had ridden bundler order); the switch's 0px pairing gap restored. +R83-10 (the same collision class at `glass/surfaces.css:31` vs `card/styles.css:59`) · +R83-11 (the focus glow's ink, dark-asymmetric) → #68
```
