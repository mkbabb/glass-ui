# BK Φ5 · Row #85 · W-EASING — the curve family

**modelId: `claude-opus-5[1m]`** (SCOUT + IMPLEMENT seat) · base HEAD **`53ddaa34`**
(⊕⁶¹ back-annotation; the brief's `4917a042` is 24 ledger entries stale and was
re-derived on disk, not trusted) · date **2026-08-08**.

**STEP-0 BASELINE, banked BEFORE the first byte** (⊕⁶⁰ item 7, protocol):
`git diff -U0 > /tmp/bk-row-baseline-1786199627.diff` — **6630 lines**, and
`git status --porcelain | wc -l` = **102**. Every fence stat in §9 is derived as
(final `git diff --stat`) **minus** that baseline, per file. The baseline contains
**zero** hits for `src/components/easing`, `curve-gallery`, `easing-primitive` or
`easing.contract` (detector: `grep -c` over the baseline diff → `0`), so this lane
was clean at step 0 and every byte under it is this row's.

**Record directory dated 2026-08-08, not the brief's literal `2026-08-05`** — every
row that landed today (#79 · #80 · #81 · #82 · #83 · #84) sits under its real date,
and a record that lies about its own day is the first thing a reader stops trusting.

---

## 0 · SELECTION AND ITS GROUNDS

**Row #85 W-EASING**, the canonical next unstarted Φ5 row in TR order.

| source | reading |
|---|---|
| `EXECUTION-PROGRESS.md:3062` | `\| 85 \| W-EASING \| Φ5 \| UNSTARTED \| TR#85 → CWT-3 §LANE easing \| lane gates; gates 11→≤7; owns `EasingPicker.vue` (C-4) \|` |
| ⊕⁶¹ (`:2836-2844`, the standing procession) | *"**#85 W-EASING and #87 W-MARKS remain unblocked and unentangled**"* — and #85 precedes #87 in TR order |
| `TERMINAL-ROSTER.md:235` | the TR cell, quoted verbatim below |

Every row below #85 in TR order is SEALED, LANDED, or gated **with its gate named**:
#21 on `#17` (hard, #17 Φ4-UNSTARTED) · #22 CURE-CUT · #25 on its rides-clause
(re-confirmed at ⊕⁶¹: two of its three authorities, #22's rung and #27's ladder, are
still open) · #42/#44/#45/#47/#48/#52 behind DAG edges · #49/#50/#51/#53 ASK-gated ·
#58/#73 on ASK g11 · #67 on the owner's R-7 footage · #74 inside #88's cut ·
#86/#88 joint on `track-well.css` (C-1) · #89 the overlay convergence row. No SEALED
or IN-FLIGHT row was selected.

**Precedence checked and clear.** TR#85's ⊕² rider — *"the `EasingCurve` extraction
lands with-or-before #26's table cut, so the demo never shows 8 rows against a 6-row
table"* — is **DISCHARGED, not deferred**: #26 W-SPRING-RETUNE landed at `d27ec5dc`
(⊕⁴¹) and `SPRING_PRESETS` is **6 rows on disk** (detector:
`grep -c 'name:' src/composables/motion/spring/springPresets.ts` → 8 lines, of which
6 are preset rows and 2 are the type/function signatures — the rows are `press`,
`present`, `dock`, `panel`, `bloom`, `world`). The demo's spring `<Select>` binds
`SPRING_PRESETS` directly, so it renders whatever the table holds and the 8-vs-6 skew
the rider fenced cannot occur.

**TR cell, verbatim** (`TERMINAL-ROSTER.md:235`):

> | **85** | **W-EASING** | CWT-3 §LANE easing | Φ5 | cited whole; `EasingCurve.vue`
> extracted, configurator deleted (0/7 repos), REDUCTION:90's DEMOTE STRUCK (11
> cross-repo consumer files); gates 11→≤7; owns `EasingPicker.vue` incl. its two
> `.glass-card` appliers (C-4). ⊕² + the X19 edge: the `EasingCurve` extraction lands
> with-or-before #26's table cut, so the demo never shows 8 rows against a 6-row table |

Spec of record read **in full**: `COMPONENT-WAVES-TERMINAL-3.md:1068-1162`
(§0 the five adjudicated splits, §1 DISPOSITION, §2 E1-E22, §3 THE DESIGN 3.1-3.5,
§4 STRIKE/ADD, §5 GATES G-E1…G-E11, §6 PAINT P1-P13, §7 REJECTED, §8 LOC + the order
of work, §9 ROUTED), plus the batch rulings **C-4** (`:1815`) and **C-10** (`:1826`)
and the tier-3 gate classification (`:1871`).

---

## 1 · THE PRE-STATE, RE-DERIVED — what the spec measured and what disk says now

The spec was authored at HEAD `5677ca43`. Fourteen Φ5 rows have landed since. **Four
of its measured cells no longer describe the disk**, and one of its own arithmetic
lines does not close. Each is stated with what replaced it.

| §-figure | spec says | measured at `53ddaa34` | disposition |
|---|---|---|---|
| §0 `container-type` census | 6 declarations, 4 in src (`card/styles.css:20`, `instrument-chassis:17`, `WatercolorDot.vue:253`, `ScrubberTimeline.vue:284`) | **`card/styles.css` and `instrument-chassis` are gone** (the card lane and the owner's DELETE-CONFIRMED ruling); live src declarations are `deck/styles/stage.css:42` + `dock/styles/shell.css` prose + `demo/chassis/…` | the shared CONCLUSION is unaffected and carried: **none is an ancestor of the picker**, so `38cqi` was inert. The census figure is restated, not inherited |
| §3.4 chrome type on "the −4 rung (11.50)" | 11.50px | `--type-micro` is **`0.6875rem` = 11px**, explicitly "fixed sub-control micro (NOT fluid)" (`typography/scale.css:86`) | the DIRECTION lands (axis type leaves SVG user space onto the ladder); the rung is the on-disk `text-micro`, and the 11.50 figure is a φ derivation the shipped ladder does not carry |
| §3.5 A1 focus = `outline 2px @ 0.48` **+ `0 0 8px @ 0.15`** | two legs | `.focus-ring:focus-visible` is **outline-only** on disk (`utilities/base.css:131`), and its own comment records the bloom as deliberately retired — *"the bloom is gone with the thing it was rescuing"* | the shared utility's form wins, which is **C-7's own ruling** (the glow is legal only where a lane owns its complete resting `box-shadow` list; this lane owns none). Every lane-authored focusable composes `.focus-ring` |
| §5 "easing's 11 **FOLDS to ≤7**" | ≤7 | §5's own enumeration names **three** merges over eleven gates (E2→E1, E3+E4, E7+E8) and lands at **eight** | see §3 — the count is reached by one further merge that is substantively one invariant, not by dropping a clause. Stated rather than silently rounded |

Everything else in §2 reproduced at HEAD, each with its detector:
`canvasViewBox` ×2 and `VIEWBOX_FIT_SAMPLES` ×3 (**E1**) · `EasingCurve` exported 0×
(**E2**) · `lg:grid-cols-[1fr_18rem]` + `38cqi` + `block-size: clamp` ×3 (**E3/E7**) ·
`EasingConfigurator.vue` present, 62 lines (**E10**) · `HANDLE_HIT_RADIUS = 0.1` /
`_TOUCH = 0.15` in user units (**E8**) · **nine** user-unit stroke widths
(`0.006`×3, `0.012`, `0.02`×3, `0.025`, `0.035`) with `vector-effect` **0** (**E9**) ·
`focus:outline-none` ×1 (**E12**) · `data-testid` ×8 (**E18**) · `ppmycota` /
`proof:a11y` / `R→S→T` ×3 (**E19**) · five transport phrases ×3 (**E15**).

---

## 2 · PER-ITEM LEDGER

Order of work per §8, non-negotiable and honoured: **the frame constant landed
FIRST**, `EasingCurve` second, the configurator delete third **with the page rewrite
in the same cut** so no commit leaves the story unmounted.

### 2.1 The frame is a constant — `constants.ts`, `usePicker.ts`

`VIEW_BOX = "-0.1 -0.1 1.2 1.2"`, square, both modes, every preset, every frame of a
drag. The fitted-`viewBox` computed, `canvasViewBox`, `VIEWBOX_FIT_SAMPLES` and the
17-solve bounds walk are **gone**. Six defects die in the declaration and the file
says which six.

One arithmetic disclosure: `FRAME_MAX - FRAME_MIN` is `1.2000000000000002` in binary
floating point, so the span is rounded (`+(…).toFixed(6)`) before it enters the
string. A viewBox compared **byte-for-byte** by the gate that exists to prove it never
changes cannot be built from raw float subtraction, and finding that out from a RED
gate rather than from a browser is the gate working.

`VIEW_PAD` became **module-private** at the same file. It has exactly one reader (the
two frame edges it derives), and `G-OVERFIT`'s EXPORT-REACH arm convicted it as an
unreachable export the moment `usePicker.ts` stopped importing it — see §5.

### 2.2 The excursion clause — solved, not sampled

`bezierExtrema(y1, y2)` solves `B′(t) = 0`, a quadratic, in closed form. Three of the
adjudicator's figures are reproduced as executable assertions rather than quoted:

| input | exact result | frame `[−0.1, 1.1]` |
|---|---|---|
| `y1 = y2 = 1.6` | max **1.3692** at `t = 0.6202` | **exits** |
| `y1 = 1.6, y2 = 0` | interior max **0.756**, endpoint max **1.0** | never exits |
| `y1 = y2 = 1.2` | max **1.099** | inside — the threshold is `y ≈ 1.2`, **not** the 1.15 §7 rejected |

When it exits, `data-curve-clipped` mounts on the root, `data-clipped` on the plot,
and the crossed frame edges take the accent. **No dimension moves.** The alternative —
growing the frame — is what made the plot a function of the curve, and §7 rejects it
with the −32% falsifier.

Handles authored past the frame **pin along their own leader** (`pinToFrame` walks the
segment from the anchor to the handle and stops at the crossed edge), while `points`
keeps the authored value and `aria-valuetext` reports it. The leader ends where the
handle paints, so it never draws a line to somewhere the handle is not.

### 2.3 The staircase is constructed — `stepPathD`

Each tread is constant across `[i/n, (i+1)/n)`, so its height is **one read of the
owner's callable at the tread midpoint**. The path is `M` + treads (`H`) + risers
(`V`), which costs at most `2n + 1` commands — **25 at `STEP_COUNT_MAX` of 12**, and
the risers sit at exactly `i/n`. `STEP_PLOT_SAMPLES` (241 commands) is deleted.

This re-implements no math: the callable is still `steppedEase(n, term)` and the
midpoint read asks it, rather than deciding, what the tread's height is. It is also
the only way §3.5's "exact riser x" can be true — sampling is precisely why the riser
could not read crisp, which is what the struck comment claimed it was for.

### 2.4 The split — `EasingCurve.vue` (NEW, 140 lines)

Display only: paths in, plot out. Zero state, zero composables, zero interactive
descendants, published on `./easing`. Two deviations from §3.2's stroke shape, both
load-bearing rather than convenient:

- **`d` (a path), not `fn` (a callable).** A display unit handed a callable can only
  SAMPLE it, and sampling a staircase is the defect §2 E17 names. The owner of a curve
  knows whether it is smooth or stepped; `usePicker` publishes both exact paths.
- **no `css` field.** A stroke that renders its own literal is a SECOND print of the
  thing G-E7 requires be printed exactly once — and the gate caught it: the first cut
  shipped `<title>{{ stroke.css }}</title>` and ONE-PRINT went RED at 2×. The plot
  takes a `label`; the literal has one home.

The accent chain moved **byte-for-byte** from the editor root to `EasingCurve`'s root
— the unit that actually strokes with it. The declaration text
(`--easing-curve-accent: var(--motion-accent, var(--viz-legendre))`) is identical, so
§0's "survives byte-for-byte" ruling holds and `emitted-utility-vars.test.ts`'s
runtime-set exemption still describes the truth.

### 2.5 The editor — `EasingPicker.vue` re-authored end to end

**One column, one plot, one print.** Both curves are always drawn: the active mode in
full ink, the other held back at 0.30. That IS the side-by-side comparison the two
panels advertised, minus the second frame that never agreed with the first — and with
the second panel goes the ~45% residue E3 measured, because there is no longer a place
for it to be.

The handle overlay is a second `<svg>` sharing `VIEW_BOX` and
`preserveAspectRatio` over the same box, so the two map pixel-for-pixel **by
construction** — no measured sync, no second coordinate system to keep honest.

Props **7 → 4**: `initial` · `playback` · `label` · `surface` (+`class`). `mode`,
`preset`, `steps` and `term` were initial state wearing a prop's name — only `mode`
was ever watched — and they fold into `initial`, which goes through the SAME clamp the
pointer and the keyboard go through (asserted: `initial: { points: [-2,10,2,-10] }`
renders `cubic-bezier(0, 1.6, 1, -0.6)`).

`surface?: "card" | "bare"` retires value.js's Law 2 and the `backdrop-filter: none` /
`-webkit-` pair it was forced to author. **C-4 executed as ruled**: both
`.glass-card` appliers are deleted outright, and the one surviving plate is the
ladder's `.glass-resting` rung — the class C-4 folds the material half onto.

Hit testing is in **CSS pixels against the painted pin** (`HANDLE_HIT_RADIUS_PX = 22`
→ the 44px diameter floor exactly; coarse gets 28). You grab what you see, and the
target no longer shrinks with the frame to 40.7px.

Deleted with the rest: the `#footer` slot. Zero consumers across the demo, the
configurator that used to seat this component, and the routed cross-repo census — the
overfitting-audit bar, applied inside a template being re-authored line for line.

### 2.6 The transport — one vocabulary, one source

`transport` is ONE computed returning `Preview` | `Cancel` | `Replay`. The control's
label reads it and the always-mounted status region reads it, so **a second verb
cannot be introduced on one side without the other**. Five phrases lived here for one
control with three states.

Restart-while-playing is gone deliberately: while playing, the available action is
Cancel, and the same control performs it. §2 E15 names `Restart` as one of the five
vocabularies to die.

**Two live regions, disclosed.** The transport's region speaks the three words. The
clipboard's outcome is a **different subject** and gets its own always-mounted
`role="status"` (empty at rest, `sr-only`, visible failure affordance beside it). G-E11
is armed against the transport region by `data-slot`, stated in the test. Folding a
clipboard failure into a transport vocabulary would be false consolidation, and
deleting the announcement outright would be an a11y regression one wave after #31
W-A11Y landed.

### 2.7 The page + the dead cites

`curve-gallery.vue`'s §Authoring boundary is one `<EasingPicker>` — **the library's
first in-repo mount of it.** Two `<EasingConfigurator>`s, the `lg:grid-cols-2` fork,
the `items-start` that §1 proved inert, and the two `:name="…css"` bindings (prints 2
and 3) all go.

A delete owes a sweep of every cite that named the deleted thing (⊕⁶¹ item 4, standing
form). Two survived the component's deletion and were reworded in place:
`src/composables/motion/README.md:31` and `src/components/configurator/styles.css:124`
(the comment's example only — **the F11 grouped-join RULE itself is untouched and
stays routed**, §7).

### 2.8 The π spec, repaired

`tests-visual/easing-primitive.spec.ts` threw at HEAD on the selector count §2 E21
names: it called `selectFamily("Custom")` against a page that has no chip rack.
Rewritten against the shipped `data-slot` seam, and **P2 gained the bite the old spec
could not give**: it asserts the staircase is `H`/`V` commands, `≤ 2n+1` of them, with
every riser on an exact `i/n` boundary. A sampled staircase fails all three.

**[CORRECTED 2026-08-08 · CURE-ORDER-85 CURE-85-6 — the PORT half of the sentence above
was false, and so was the header this seat wrote into the spec.]** :5199 is **this
suite's own** webServer default, not "a port belonging to a different repository's
demo": `tests-visual/playwright.config.ts:25-26` reads
`GLASS_UI_DEMO_PORT ?? 5199` and spawns `npm run dev` on it, and every sibling spec in
the directory names :5199 in the same LIVE_VERIFIED_LOCAL_ONLY line. The old spec never
hardcoded a port at all — it navigated `page.goto(ROUTE)` **relative to baseURL**, the
same call the rewrite makes (detector: `git show HEAD:tests-visual/easing-primitive.spec.ts
| grep -n "5199\|goto"` → four `page.goto(ROUTE, …)` and two PROSE mentions of :5199,
zero literal origins). :5400 is `demo:serve` (`package.json:464`), a different script.
The spec's header is corrected in place, and the contract clause that forbade the string
"5199" — a gate against the correct answer — is replaced by one that forbids a
hardcoded ORIGIN (`easing.contract.test.ts` G-E10).

Per §9 this wave repairs **this file only**. `tunable-anim.spec.ts:181-200` is the
visual-suite lane's — see §7.

---

## 3 · THE GATES — 11 → 7, and the one place the arithmetic did not close

Close-battery rows per CWT-3 §5's ruling (per-lane born-RED gates are acceptance rows,
not standing seats). **The 60-seat register is untouched — receipt byte-identical
pre and post, §6.** No new gate file: they live in the lane's own contract test.

§5's fold names three merges — G-E2→G-E1, G-E3+G-E4, G-E7+G-E8 — which over eleven
gates lands at **eight**, while both §5 and TR#85 assert **≤7**. The gap is stated
rather than papered over. It closes with one further merge that is genuinely one
invariant and not a cosmetic bundling: **G-E6/E7/E8 are the three halves of §1's ONE
disposition** ("KEEP + SPLIT ON ADDRESSABILITY") — the display unit is addressable,
the vacuous register is gone, and the duplicate prints go with it. No clause was
dropped to hit the number, and each still fails on its own `it`.

| gate | clauses | born-RED at HEAD (detector verbatim) |
|---|---|---|
| **G-E1 FRAME** | one viewBox across mode/value/full drag to 1.6; no fit machinery, no SVG-unit type; the excursion reported at 1.6/1.6, absent at 1.6/0 and at 1.2/1.2 | `git show HEAD:…/EasingPicker.vue \| grep -c canvasViewBox` → **2**; `…/composables/useEasingPicker.ts \| grep -c VIEWBOX_FIT_SAMPLES` → **3** |
| **G-E3 VOID+CEL** | one grid track, no `lg:` fork, no `38cqi`, no `block-size: clamp`, no inline `aspect-ratio`, no reader-less `container-type`; exactly one plot and one editor on the route | `grep -c 'lg:grid-cols-\[1fr_18rem\]\|38cqi\|block-size: clamp'` → **2**; `curve-gallery.vue \| grep -c '<EasingConfigurator'` → **3** |
| **G-E5 TOUCH** | both radii ≥ 44px diameter, in px; no user-unit radius; the test is in client pixels | `HANDLE_HIT_RADIUS = 0.1` / `_TOUCH = 0.15` at `constants.ts:36-37` |
| **G-E6 SPLIT** | `EasingCurve` on the subpath; mounts with zero interactive descendants and zero composables; configurator absent from disk, barrel and every importer; the literal printed exactly once; the preset control always has an entry to render | `index.ts \| grep -c EasingCurve` → **0**; `git cat-file -e HEAD:…/EasingConfigurator.vue` → **present** |
| **G-E9 STROKE+FOCUS** | every stroke ∈ {1,2,3} px with `vector-effect`; the lane authors no raw focusable and rings the two it does; no `focus:outline-none` | nine user-unit widths, `vector-effect` **0**, `focus:outline-none` **1** |
| **G-E10 SEAM+NO-META** | `data-testid` 0, seam is `data-slot`; the plot keeps `role="img"` **and the assertion cites the consumer addendum by path**; zero donor names / `C-3 fold` / `ppmycota` / `R→S→T` / `proof:`; the π spec's selectors and port resolve | `data-testid` **8**; meta strings **3**; the π spec's `selectFamily` throws |
| **G-E11 SPEAK** | exactly one of Preview/Replay/Cancel rendered, and the status region says the same word; the retired phrases stay out | five transport phrases, **3** matches |

**Mutations that bite** (each RED'd during this cut, not asserted): restoring a fitted
viewBox reddens G-E1 · re-adding `<title>{{ stroke.css }}</title>` reddens ONE-PRINT at
2× · deleting the Custom `SelectItem` reddens the preset clause · a user-unit radius
reddens G-E5 · quoting a retired phrase in a comment reddens G-E11 (it did, twice).

**Struck gate classes, per §5:** LOC/comment-ratio gates · unpaired grep-gates · any
`backdrop-filter` gate on a component authoring none · standalone CEL/excursion gates.

---

## 4 · PAINT — 13 π rows, and which halves this seat could bind

**OWED, unforged.** This seat took no browser. §6's thirteen rows stand as written and
the standing form from ⊕⁶¹(6) is honoured: *a claim whose only falsifier is owed to
another seat is not yet a claim this seat may write in the present tense.*

What this seat DID bind, in node, so the next reader can break it here rather than
only in a browser: **P1** (path control points vs the literal, through the flip) ·
~~**P2** the constructed-staircase form, command budget and exact riser x~~ · **P4** the
re-parseable literal in both modes · **P5** frame constancy across the mode switch ·
the excursion trio at 1.6/1.6, 1.6/0 and 1.2/1.2 · the stroke ladder · the seam · the
transport vocabulary. These are in `easing.contract.test.ts` (node) and re-asserted
against the live DOM in `easing-primitive.spec.ts`.

**[CORRECTED 2026-08-08 · CURE-ORDER-85 CURE-85-2 — the P2 clause above was FALSE at
the moment it was written.]** The staircase half was bound in `easing-primitive.spec.ts`
(π, unwired to any npm script) and in **nothing runnable**: `grep -c stepPathD
tests/components/easing.contract.test.ts` → **0**, and a 241-command sampled polyline
substituted for `stepPathD` survived the node battery 29/29 GREEN. The headline
mechanism of §2.3 was the one thing the close battery did not test. It is bound now —
`G-E6 SPLIT :: "constructs the staircase instead of sampling it, at every count"`, three
clauses (M/H/V only · ≤ 2n+1 commands · the tread edges ARE the sequence i/n at plot
precision), each of which kills the polyline on its own (§11).

What remains genuinely π: **P3** the violet hue in both engines and both modes ·
**P6** the F31 receipt (plate bottom minus last child ≤ 12px at 1440 AND 402) ·
**P7** the half-cards corner census · **P9** the 44px floor at 402 coarse (the
constant is right; the painted target is the claim) · **P10** the focus tab-walk
resolving to `outline` · **P11** the draw-on ≥ 2 rAF and its one-frame PRM arm ·
**P12** glass parity, both engine cells banked separately · **P13** the painted accent
edge. **Node-count law:** the banked 339/333 baseline WILL drift — the one-editor
collapse is exactly the kind of change §6 says must be re-baselined explicitly, never
silently.

---

## 5 · WHAT THE GATES CAUGHT THAT THE SPEC DID NOT PREDICT

**(1) An unreachable export the split created.** `G-OVERFIT`'s EXPORT-REACH arm went
RED on `constants.ts :: VIEW_PAD` the moment the frame edges took over its readers —
a standing library gate convicting a byte this row wrote, three minutes after it was
written. Cured by making it module-private, which is also the truer statement: the
EDGES are the published fact, the bleed is how they are derived. The arm's other two
offenders (`useLeadTrail.ts`) are the pager lane's, present in the step-0 baseline and
untouched here.

**(2) A live region announcing into a region that does not exist yet.** E13 named the
`v-if` on the idle live region. Fixing it surfaced the second half nobody wrote down:
the CLIPBOARD's region had the same defect, and folding the two would have violated
G-E11. Both are now always mounted, on separate subjects. See §2.6.

**(3) A container declaration with no reader — refused.** §3.5 rules
`container-type: inline-size` onto the picker root. It was written, and then removed:
with `38cqi` struck by §4 there is **no query against it anywhere in the lane**, and
`container-type` carries a real cost (`contain: inline-size` stops the root being
sized by its contents, which bites a consumer laying the editor out in a
`width: max-content` flex item). A declaration whose only justification is a future
query is the same dead-declaration class `38cqi` already was. §3.3 already routes any
future wide arm to `@container (inline-size >= var(--measure-wide))`, which declares
its container **at the point it is read**. The gate now asserts the absence, with the
grounds in the assertion.

**(4) A float that would have made a "constant" string non-constant.** See §2.1.

---

## 6 · VERIFY GATE — verbatim

```
$ npx vue-tsc --noEmit
(no output — exit 0)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 153 passed (160)
      Tests  12 failed | 1493 passed | 5 expected fail (1510)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
  VIOLATION active pager.tabs.panel-linkage: sourcePath missing — tests/components/pager-dots.contract.test.ts
```

**The register receipt is byte-identical pre and post** — the binding clause. It reads
`violations:1`, not the brief's `violations:0`, and that violation is **present at
step 0**: the in-flight pager lane relocated `tests/components/pager-dots.contract.test.ts`
to `tests/components/pager-dots/contract.test.ts` and the register's row still names
the old path. Detector: the identical line was captured before the first byte of this
row was written. It is the ⊕²⁵ per-file-clause-whose-subject-moved class, it belongs to
the lane that moved the file, and this row neither caused it nor cured it.

**THE TWELVE FAILURES ARE NOT THIS ROW'S, AND THAT IS MEASURED, NOT ASSERTED.** The
shared tree carries another lane's live work (102 dirty paths at step 0). A per-file
argument is weaker than a run, so the run was done: the working tree was cloned to
scratch, **this row's fence — and only this row's fence — was restored to its HEAD
state inside the clone** (`git show HEAD:<path>` for each of the 12 files, the
`composables/` directory recreated, the three new files removed), and the same command
was executed there.

```
FENCE-OFF (the same dirty tree, this row's 12 files at HEAD):
 Test Files  7 failed | 153 passed (160)
      Tests  12 failed | 1473 passed | 5 expected fail (1490)

FENCE-ON (this row landed):
 Test Files  7 failed | 153 passed (160)
      Tests  12 failed | 1493 passed | 5 expected fail (1510)
```

The failing set is **identical row for row** — carousel landmark · pager-dots ×5 ·
boot-graph build freshness · gate-register ×3 · G-OVERFIT EXPORT-REACH ·
stacked-url-filter. The delta is **+20 passing tests and zero new failures**, which is
this row's battery. (The clone was deleted after the run.)

The only movement inside a failing test is G-OVERFIT's offender list: **3 → 2**, the
row this cut created and cured (§5.1) leaving it, the pager lane's two remaining.

**One flake is disclosed rather than left for a reader to trip over.** Across five
full runs of the gate, four read `12 failed | 1493 passed` and one read `13 failed |
1492 passed`; the extra row was `dropdown-menu.contract.test.ts > keeps the click
branch to one portaled menu and restores focus on execute`, which **passes 3/3 in
isolation** and whose subject (a portaled menu's focus restore) shares no file, import
or selector with this fence. Three consecutive full runs at the final state read
`12 failed | 1493 passed` identically. It is a pre-existing intermittent, not a
result — and a run count quoted from one execution would have hidden that.

---

## 7 · ROUTED — named owners, nothing dropped

| what | owner | state |
|---|---|---|
| `EasingPicker.vue:327` keying — **this wave DELETED the line**, so LAYOUT kill #14's re-key list loses a cited site (bidirectional duty); kill #16's 2560 overflow verification stays owed | **LAYOUT** | routed, unpaid |
| the F11 grouped-join RULE itself (`configurator/styles.css:126-135` — still wrong for the next horizontal pair) · `ConfiguratorRow` 6/8px rungs · `--configurator-pad-inline` 20px · the concentric relay | **configurator lane / PROPORTION §4** | routed. This row touched only the comment at `:124` that named a deleted component |
| the `--motion-accent` → `--viz-legendre` **coupling note** (re-tuning the viz token for chart contrast silently moves the motion accent) — a NOTE, not a strike; §0 refuted both foremen's strikes | **ink/fill-ladder owner** | routed |
| `.glass-track-well` `backdrop-filter: none` · `--type-caption`/`--type-micro` vs φ rungs · `--surface-tint-8` vs the fill ladder · `--radius-panel` 12px (C5) · the route's 8 duration profiles + 5 corner grammars | **PROPORTION §5a / type / fill-ladder / radius** | routed |
| `manifest.ts` `background: "grid"` (BD R1 re-ruled, not adopted) | **page-background lane (F05)** | routed |
| the page's other two sections (hand-rolled `SpringProgress` driver; overlay-reveal duplicate) | **motion-page lane (F30)** | routed. This wave owns §Authoring boundary + the void receipt only |
| **`tunable-anim.spec.ts:181-200` + its dead port** — and it is now WORSE than §9 recorded: `:181` names `<EasingConfigurator>` by name and targets `[data-testid="easing-picker"]`, both of which this cut deletes, so the spec is **dead by subject**, not merely stale | **visual-suite lane** | **REFUSED as another row's**, per §9's *"this wave repairs `easing-primitive.spec.ts` only"*. Stated with the new fact rather than quietly fixed |
| **value.js · keyframes.js · fourier-analysis** — the three marked addenda, incl. the live `role` regression, the three seat-laws, the S1 undeclared dependency, and the fork deletion | the three tranches (consumer-updates ruling) | **AUTHORED, this cut**: `docs/tranches/BJ/coordination/glass-outbound-2026-08-08-easing-consumer-addenda.md` (G-E10 cites it by path, and asserts it exists) |
| PROPORTION §7a's stale safaridriver-refusal record | **PROPORTION owner** | routed, one-line correction |
| the 13 π rows (§4) + the 339/333 node-count re-baseline | **π seat** | OWED, unforged |
| `REDUCTION:90`'s DEMOTE — **STRUCK** on the 11-consumer-file census, per TR#85 | — | executed |

**Refused with grounds:** everything in §7's REJECTED table, unchanged — including the
two strikes §0 refuted (`demo.css:139` STAYS, 25+ consumer sites in ~14 demo files with
no fallback; the `--viz-legendre` fallback STAYS, a library token with a tuned dark arm).

---

## 8 · LOC — the number went the other way, and here is the honest figure

§8 projects **983 → ≈680** excluding README. Measured:

```
$ wc -l src/components/easing/*.vue src/components/easing/*.ts     # excl. README
HEAD 53ddaa34 : 993   (EasingPicker 528 · useEasingPicker 340 · EasingConfigurator 62 · constants 49 · index 14)
this cut      : 1244  (EasingPicker 560 · usePicker 459 · EasingCurve 140 · constants 67 · index 18)
```

**+251, not −311.** Three components, all stated rather than averaged away:

1. **`EasingCurve` is 140 NEW lines that did not exist in either count.** §8's ≈680 is
   computed against a design where the plot markup stays inline in the picker. This
   wave's whole disposition is that it should not — and those 140 lines delete a
   98-line fork plus a 41-line preview in ONE downstream repo, with two more to follow.
2. **`usePicker` grew +119** for the analytic extrema, the leader pinning, the
   constructed staircase and the seed normalization — geometry the old file did not do
   because it moved the frame instead.
3. **19% of the lane is comment** (236 of 1244 lines). **[CORRECTED 2026-08-08 ·
   CURE-ORDER-85 minor — "detector in this record's directory" cited a file that does
   not exist; `ls` the directory and there are three markdown files and no script.]**
   The figure is real and the rule is stated instead of pointed at: count a line as
   comment when it is a `//` line, or opens `/*` or `<!--`, or lies inside an unclosed
   block of either — over `easing/*.vue` + `easing/*.ts`, README excluded, the same
   five files `wc -l` totals to 1244. That rule returns **236 / 1244 = 19.0%**. The
   leading-glyph shortcut (`grep -cE '^[[:space:]]*(//|\*|/\*|<!--)'`) returns **219**;
   the 17-line gap is block-comment continuation lines that begin with prose, and a
   record that quotes one number owes the rule that produced it.
   §5 struck comment-ratio gates for this lane, and §8 itself records that
   "~90 of the ~371 struck lines are comments" — the count was never the criterion.
   **The criterion is addressability**, and §7 rejects the LOC frame for this split by
   name.

The SVG markup was compacted back to the multi-attribute lines the lane's own files
authored (this repo's formatting is authored, not generated — ⊕⁶¹ driver item 4);
before that pass the figure was 1333.

---

## 9 · FENCE — derived, never a whole-file stat

Baseline: `/tmp/bk-row-baseline-1786199627.diff` (6630 lines, 102 dirty paths),
**zero hits** for any path below. So (final − baseline) = final, per file.

**[CORRECTED 2026-08-08 · CURE-ORDER-85 CURE-85-7 — the sentence immediately above is
FALSE for one of the eleven files, and it is the whole-file-stat class this record was
supposed to be immune to.]** `src/components/configurator/styles.css` **IS** in the
baseline: `/tmp/bk-row-baseline-1786199627.diff:1872` opens its hunk and the baseline
carries its `:175` comment line (`select.css` → `glass/overlay-plate.css`), which is
another lane's. The file's whole-file numstat is **3+/3−**; **this row's share is the
`:124` hunk alone — 2+/2−** (`<EasingConfigurator>` → `<ConfiguratorLayer>` in the
F11 comment). Detector: `git diff -U0 -- src/components/configurator/styles.css` shows
exactly two hunks, `@@ -124,2 +124,2 @@` (this row's) and `@@ -175 +175 @@` (the
baseline's). **The true fence total is therefore `+939 / −931`, not the `+940 / −932`
printed below**, and the numstat line for that file reads `4 +-` of this row's, not
`6 +-`. The stat block below is left as-printed so the correction has something to
point at; the driver stages that file by HUNK, per PASTE-BLOCKS §C.2, which had it
right (verified this seat, byte-exact, untouched).

```
 demo/stories/motion/curve-gallery.vue              |  39 +-
 src/components/configurator/styles.css             |   6 +-
 src/components/easing/EasingConfigurator.vue       |  62 ---      (DELETED)
 src/components/easing/EasingPicker.vue             | 592 +++++++++++----------
 src/components/easing/README.md                    | 107 ++--
 src/components/easing/composables/useEasingPicker.ts | 340 ------   (MOVED → usePicker.ts)
 src/components/easing/constants.ts                 |  60 ++-
 src/components/easing/index.ts                     |  12 +-
 src/composables/motion/README.md                   |   6 +-
 tests-visual/easing-primitive.spec.ts              | 200 ++++---
 tests/components/easing.contract.test.ts           | 448 ++++++++++++++--
 11 files changed, 940 insertions(+), 932 deletions(-)

 NEW (untracked, not in the numstat above):
 src/components/easing/EasingCurve.vue                                        140
 src/components/easing/usePicker.ts                                           459
 docs/tranches/BJ/coordination/glass-outbound-2026-08-08-easing-consumer-addenda.md  116
```

**The move is a rewrite, not a rename**, so it appears as add + delete and a `D`-grep
finds it (the #72 class does not apply here — `useEasingPicker.ts` → `usePicker.ts`
changed substantially, so no `R100` collapse hides it). `src/components/easing/composables/`
is removed as a directory. The **exported symbol `useEasingPicker` is unchanged** — the
DAG ledger renames files, and the symbol anchors the `EasingPickerValue` type family
consumed in value.js.

The whole-tree `git diff --stat` reads 90 files / +3396 / −4312. **That is not this
row's stat** — it is the shared tree, and the eleven rows above plus the three new
files are the fence.

---

## 10 · STATE

`spec_state = sealed` (CWT-3 §LANE easing, cited whole) ·
`code_state = landed` (pending the driver's cut) ·
`evidence_state = owed` — the eight node-bindable π halves are captured in the suite;
the eight browser-only rows in §4 stay OWED, with the node-count re-baseline named.

---

## 11 · CURE ROUND (2026-08-08)

**modelId: `claude-opus-5[1m]`** (CURE seat) · order `CURE-ORDER-85.md`, adjudicated
Fable quartet `wf_df216373-7f1`, driver-ratified. All seven cures and both minors
EXECUTED; **one mechanism inside CURE-85-3 was substituted on a measured conflict and
the measurement is banked below** — the ADD itself is implemented, not refused.

### 11.1 · The ledger

| cure | file:line | detector | before → after |
|---|---|---|---|
| **85-1** | `src/components/easing/usePicker.ts:213` | `node` probe over `bezierPresets`, replicating `pinToFrame` + the `data-pinned` equality: **8 of 30** presets false-fire, all on handle 1, Δx = `5.551115123125783e-17` (ease-out-quad/-quart/-quint, ease-in-out-quart/-quint) or `2.7755575615628914e-17` (ease-out-expo/-circ, ease-in-out-circ) | an unpinned handle was RECONSTRUCTED as `anchor + (h − anchor) × 1` → **8 strictly-inside presets painted PINNED**. Now `if (travel === 1) return handle;` short-circuits before reconstruction → **0**. Live-confirmed on the shipped page: `ease-out-quad` reports `[unpinned, unpinned]` (§11.4) |
| **85-1 gate** | `tests/components/easing.contract.test.ts` · G-E1 FRAME · *"pins only the handles that genuinely cross the frame, across the whole catalogue"* | walks all **30** presets and asserts the pinned pair EQUALS the frame predicate per handle, plus a positive control at `[0.2, 1.6, 0.8, -0.6]` | BORN-RED on the pre-cure bytes (§11.3) |
| **85-2** | `tests/components/easing.contract.test.ts` · G-E6 SPLIT · *"constructs the staircase instead of sampling it, at every count"* | `grep -c stepPathD tests/components/easing.contract.test.ts` → **0** before | the headline mechanism of §2.3 was bound by **no runnable gate**. Now three clauses at n ∈ {1, 2, 5, 12}: M/H/V only · ≤ 2n+1 commands · tread edges EQUAL the `i/n` sequence at plot precision. Each kills the 241-command polyline on its own (§11.3). RECORD §4 struck |
| **85-3** | `EasingCurve.vue` (draw-on) · `EasingPicker.vue` (clock + press) | live readback + rasterized pixel counts (§11.2) | both ADD items were ABSENT with no refusal filed. Now IMPLEMENTED: a wipe-on sweep on preset/mode/step change, `.tap-squish` on the handles, both with a one-frame PRM arm. **P11 is now a true owed-π cell** and the π spec carries its falsifier |
| **85-4** | `src/components/easing/README.md:9` · `:122` | the `EasingStroke` interface has no `css` field; `grep -rn EasingCurve` in fourier-analysis → the fork is live | `{ d, css }` → `{ d, tone }`; present-tense *"fourier-analysis adopts"* → **routed, not done**, citing the marked addendum by path |
| **85-5** | `tests/components/easing.contract.test.ts:637` | `npx vue-tsc -p tsconfig.test.json --noEmit \| grep easing` → **1 error** (`TS2339: Property 'exists' does not exist on type 'Omit<DOMWrapper<Element>, "exists">'`) before, **0** after | `wrapper.get(…)` → `wrapper.find(…)`. `get` THROWS on absence, so the `.exists()` that followed could only ever read true — the release-gating typecheck said so before any reader did |
| **85-6** | `tests-visual/easing-primitive.spec.ts:21-24` · RECORD §2.8 · `easing.contract.test.ts:625` | `tests-visual/playwright.config.ts:25` → `GLASS_UI_DEMO_PORT ?? 5199`; `git show HEAD:tests-visual/easing-primitive.spec.ts \| grep -n "5199\|goto"` → four `page.goto(ROUTE, …)`, two PROSE mentions, **zero literal origins**; `package.json:464` → `demo:serve` is 5400 | the "foreign port" story was false in both places. Header rewritten, §2.8 bracketed, and the clause forbidding the string `"5199"` — a gate against the correct answer — replaced by a `not.toMatch` on `page.goto(` followed by an `http`/`https` literal, which forbids a hardcoded ORIGIN |
| **85-7** | RECORD §9 | `git diff -U0 -- src/components/configurator/styles.css` → exactly two hunks: `@@ -124,2 +124,2 @@` (this row's) and `@@ -175 +175 @@` (baseline `:1872`) | *"zero hits for any path below"* was false for one file. Dated bracket added: the row's share is **2+/2−**, the true pre-cure fence **+939/−931**. **PASTE-BLOCKS §C.2 verified byte-exact and NOT touched** — it already ruled the hunk split |
| **minor** | RECORD.md:434 | `ls docs/tranches/BK/execution/2026-08-08-row85-easing/` → three `.md` files, no script | *"detector in this record's directory"* cited nothing. The RULE is stated inline instead, with both readings disclosed (block-aware **236/1244 = 19.0%**; leading-glyph shortcut **219**) |
| **minor** | `easing.contract.test.ts:502` | the `EasingStroke` interface | `{ d, css: "x" }` → `{ d, tone: "ink" }` |

### 11.2 · CURE-85-3 — the branch taken, and the one substitution

**Branch: IMPLEMENT.** Both ADD items ship.

**The press.** The two bezier handles compose `.tap-squish` — the house register, not a
new one: `--scale-press` on the `--spring-press` clock with `.tap-squish`'s own
`transform-origin`. Two additions are this lane's, and both are forced by the medium
rather than chosen: `transform-box: fill-box`, because an SVG element transforms about
the VIEW BOX by default and the utility's `center center` would otherwise squish the
handle toward the middle of the plot; and the house's `data-press-armed` marker,
because a pointer-captured drag suppresses `:active` outright, so the CSS leg would be
a mechanism that never fires and the drag state IS the press truth here. Live readback,
real `PointerEvent` on the shipped page: `scale` walks
`1 → 0.998 → 0.974 → 0.971 → 0.961 → 0.96` and holds, `cursor` flips `grab` →
`grabbing`, `data-pressed` mounts, and release returns all three. `--scale-press` reads
`0.96` — the token, unforked. PRM: `motion-reduce:transition-none`, so the press
FUNCTIONS with the interpolation off (the `useLiquidPress` PRM-INSTANT doctrine), which
is the one-frame arm.

**The draw-on — and the substitution, measured.** CWT-3 §3.5 and the cure order both
name `stroke-dashoffset`. **It is dead in this lane, and the conflict is with a landed
law rather than with taste:** every stroke here carries
`vector-effect: non-scaling-stroke` (G-E9's binding clause, and the reason the ink is a
whole CSS pixel independent of the frame), and under it Chrome does not gate the paint
by `stroke-dashoffset` at all. Rasterized through the engine and pixel-counted at this
seat, same path, same stroke width, same viewBox:

| variant | painted px |
|---|---|
| untouched stroke | **2998** |
| `pathLength="1"` + `stroke-dashoffset: 1` (the letter of the spec) | **2827** |
| the same sweep in real user units, no `pathLength` | **2851** |
| `clip-path: inset(-60% 104% -60% -2%)` — closed | **0** |
| `clip-path: inset(-60% 50% -60% -2%)` — half | **2107** |
| `clip-path: inset(-60% -2% -60% -2%)` — open | **2998** |

The dashoffset arm reveals nothing; it would have shipped a mechanism that ran and did
nothing, which is the exact class this cure round exists to close. So the draw-on rides
the house's OTHER arm — `<HandMark>` ships both and a rule for choosing between them
(`stroke-dashoffset` for clean ink, a `clip-path` WIPE where the engine will not honour
a dash; there it is a filter, here it is `vector-effect`). This is a mechanism
substitution INSIDE the ratified ADD, not a refusal of it: the affordance, the clock,
the seam and the PRM arm are all as ordered. A wipe is also the truer reading for a
curve plot — it travels left to right, the axis the curve is a function of.

**A second defect, found by measuring rather than by reasoning.** The first cut flipped
`drawn` false and back on the NEXT rAF callback. rAF callbacks run BEFORE style
recalculation, so both states landed in one recalculation and the browser had nothing
to interpolate from: `data-drawing` flickered correctly for one frame while the paint
read a dead `0px → 0px`. The sweep now crosses **two** frames — the un-drawn state must
be committed and painted before the drawn one replaces it — and the un-draw carries
`duration-0` while only the draw carries `duration-slow`, so the curve is never wiped
AWAY on its way to being wiped on. Live readback after the fix, one mode switch:
`104% → 104% → 55.3 → 46.6 → 19.8 → 13.8 → 6.4 → 5.1 → 1.0 → 0.5 → −1.1 → … → −2%`,
`transition-duration` `0s` for the two held frames then `0.45s`, timing function
`cubic-bezier(0.16, 1, 0.3, 1)` = `--ease-out-expo`. **Seven** distinct in-between
frames, against P11's floor of two.

**What painted** (screenshots banked to the seat's scratch, the wipe held at 55% by a
disclosed capture aid that changes only the clock): the ink bezier rises from the
bottom-left and TERMINATES mid-plot, while the staircase ghost, the grid, the diagonal,
the frame, the endpoints and both handles paint in full. The wipe gates the ink and
nothing else.

**Scope, stated.** The sweep is armed on `[mode, preset, steps, term]` and deliberately
NOT during a drag: the first pointermove of every drag writes `custom` to `preset`, and
re-inking under the finger would fight the gesture it is supposed to answer. The
GHOST never sweeps — it is the other reading held back, and a ghost that announced
itself would be saying something the design deliberately does not.

**PRM, both legs.** The picker never arms the sweep under `reduce` (so no un-drawn
state is ever rendered — the finished plot arrives on the frame the curve changes), and
the stroke additionally carries `motion-reduce:transition-none`. Bound in node; the
painted arm is P11's, owed.

**Seam.** `data-drawing` mounts on the editor root for the length of the sweep.
No `data-testid`; the G-E10 clause is untouched.

### 11.3 · Born-RED transcripts

Both proven on a **scratch clone** of the working tree (code-only rsync + a symlinked
`node_modules`, at `…/scratchpad/rc`), never by a `git checkout` in the shared tree.
The clone reproduces the cured suite **33/33** before either mutation is applied.

**CURE-85-1** — pre-cure `usePicker.ts` restored into the clone, the new `it` left in
place:

```
 ❯ tests/components/easing.contract.test.ts (33 tests | 1 failed | 32 skipped)
     × pins only the handles that genuinely cross the frame, across the whole catalogue

AssertionError: ease-out-quad → cubic-bezier(0.25, 0.46, 0.45, 0.94):
  expected [ false, true ] to deeply equal [ false, false ]
```

The cured bytes restored, same command: `1 passed | 32 skipped`.

**CURE-85-2** — `stepPathD` replaced in the clone by the 241-command sampled polyline
(`STEP_PLOT_SAMPLES = 240`, `M` + 240 `L`), all three clauses run against it:

```
clause (1)  AssertionError: steps(1) draws "L" in "M 0 1 L 0.0042 1 L 0.0083 1 …":
              expected [ 'M', 'H', 'V' ] to include 'L'
clause (2)  AssertionError: budget 25, got 241: expected 241 to be less than or equal to 25
clause (3)  AssertionError: expected [] to deeply equal [ 0.0833, 0.1667, 0.25, 0.3333, …(8) ]
```

Each clause was run in isolation against the mutation; each kills it alone.

**CURE-85-5** — the whole lane at pre-cure bytes in the clone:

```
$ npx vue-tsc -p tsconfig.test.json --noEmit 2>&1 | grep easing
tests/components/easing.contract.test.ts(637,25): error TS2339: Property 'exists'
  does not exist on type 'Omit<DOMWrapper<Element>, "exists">'.

$ (cured) npx vue-tsc -p tsconfig.test.json --noEmit 2>&1 | grep -c easing
0
```

### 11.4 · Live readback — `http://localhost:5199/motion/curve-gallery`, Chrome

Shipped bytes, the lane's own port, no source patched for the run.

```
rest            pathLength/dash absent · clip-path inset(-60% -2%) · data-drawing absent
                transition-property clip-path · duration 0.45s · cubic-bezier(0.16, 1, 0.3, 1)
sweep           104% 104% 55.28 46.65 19.77 13.82 6.37 5.09 1.02 0.51 -1.08 … -2%
                (2 frames at duration 0s, then 0.45s; 7 distinct in-between frames)
handle rest     scale 1 · cursor grab · data-press-armed "" · transform-box fill-box
handle press    scale 1 → 0.998 → 0.974 → 0.971 → 0.961 → 0.96 · cursor grabbing · data-pressed ""
handle release  scale 1 · cursor grab · data-pressed absent
--scale-press   0.96
ease-out-back   handles [unpinned, pinned]  — y2 = 1.275 → SVG −0.275, genuinely out
ease-out-quad   handles [unpinned, unpinned] — the 5.55e-17 false positive, GONE
```

### 11.5 · Verify gate — verbatim, post-cure

```
$ npx vue-tsc --noEmit
(no output — exit 0)

$ npx vue-tsc -p tsconfig.test.json --noEmit 2>&1 | grep -c easing
0

$ npx vitest run tests/components/easing.contract.test.ts
 Test Files  1 passed (1)
      Tests  33 passed (33)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 154 passed (160)
      Tests  11 failed | 1498 passed | 5 expected fail (1514)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ npm run demo:dist:build
✓ built in 1.39s

$ node scripts/regen-exports.mjs
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

**ELEVEN failures, not twelve, and the delta is EXPLAINED rather than celebrated.**
`tests/gates/boot-graph.test.ts > the dist-demo it measures is NEWER than every source
it is built from` was in §6's twelve and is GREEN here because this seat rebuilt
`dist-demo` — it is a build-freshness row, not a code row, and it will re-red the
moment any lane edits a source without rebuilding. The remaining eleven are the SAME
rows §6 banked, minus that one: `stacked-url-filter` (row #7, by its own test title) ·
`gate-register` ×3 · `G-OVERFIT` EXPORT-REACH · `carousel` landmark · `pager-dots` ×5
(#40 W-PAGER). **Zero easing rows.** The register receipt is byte-identical to §6's,
including `violations:1`. G-OVERFIT's offender list is **unchanged at 2**, both
`src/composables/motion/morph/useLeadTrail.ts` — this cure round added no export.

Test count moved **1510 → 1514**: the four new `it`s (the catalogue pin walk, the
staircase, the sweep, the press). Passing moved **1493 → 1498** (+4 new, +1 boot-graph).

### 11.6 · Fence, post-cure

Same baseline, same derivation, with §9's correction applied.

```
 demo/stories/motion/curve-gallery.vue                 |  11 +   28 -
 src/components/configurator/styles.css                |   2 +    2 -   (the :124 hunk ONLY)
 src/components/easing/EasingConfigurator.vue          |   0 +   62 -   (DELETED)
 src/components/easing/EasingPicker.vue                | 378 +  280 -
 src/components/easing/README.md                       |  97 +   42 -
 src/components/easing/composables/useEasingPicker.ts  |   0 +  340 -   (MOVED → usePicker.ts)
 src/components/easing/constants.ts                    |  39 +   21 -
 src/components/easing/index.ts                        |   8 +    4 -
 src/composables/motion/README.md                      |   3 +    3 -
 tests-visual/easing-primitive.spec.ts                 | 161 +  105 -
 tests/components/easing.contract.test.ts              | 608 +   45 -
 11 files changed, 1307 insertions(+), 932 deletions(-)

 NEW (untracked, not in the numstat above):
 src/components/easing/EasingCurve.vue                                        189
 src/components/easing/usePicker.ts                                           468
 docs/tranches/BJ/coordination/glass-outbound-2026-08-08-easing-consumer-addenda.md  116
```

The whole-file numstat for `configurator/styles.css` still reads `3 +/ 3 -`; the row's
share is the `:124` hunk and the driver stages it BY HUNK (PASTE-BLOCKS §C.2). **No file
outside the eleven-plus-three fence was touched by this cure round**, and the record's
own directory is the only addition (§11.7).

§8's LOC figure moves with the cure: `wc -l src/components/easing/*.vue *.ts` (README
excluded) reads **1368**, and the block-aware comment rule of §8.3 returns
**315 / 1368 = 23.0%**. The +124 is the two implemented affordances and the measurement
that chose between their mechanisms — the disclosure IS the deliverable here, per §5's
struck comment-ratio gates.

### 11.7 · Files touched by this cure round

`src/components/easing/usePicker.ts` · `src/components/easing/EasingCurve.vue` ·
`src/components/easing/EasingPicker.vue` · `src/components/easing/README.md` ·
`tests/components/easing.contract.test.ts` · `tests-visual/easing-primitive.spec.ts` ·
`docs/tranches/BK/execution/2026-08-08-row85-easing/RECORD.md` ·
`docs/tranches/BK/execution/2026-08-08-row85-easing/PASTE-BLOCKS.md`.
`dist-demo/**` was regenerated by the verify gate and is `.gitignore`d (`:65`), so it
never enters the fence. Nothing else — confirmed by `git status --porcelain` over the
fence paths, which reports the same eleven tracked entries plus the two new lane files
and this record's directory, and no others.

### 11.8 · State, restated

`spec_state = sealed` · `code_state = landed` (pending the driver's cut) ·
`evidence_state = owed` — and **P11 is now a genuinely owed cell rather than a filed
one**: the draw-on exists, its node half is bound, and `easing-primitive.spec.ts`
carries its browser falsifier (≥ 2 distinct in-between wipe frames; no closed frame at
all under `reduce`). The other seven browser-only rows of §4 stand unchanged, with the
node-count re-baseline still named.
