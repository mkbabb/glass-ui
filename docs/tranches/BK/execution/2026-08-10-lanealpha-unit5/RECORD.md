# LANE α — UNIT 5 (α6 · #47 W2-W9) · RECORD

**SCOPE AS DISPATCHED:** α6 — #47 GF-DOCK **W2-W9** per the ratified lane text
(`wf_8139c708-c24`); W1 whole at `ac471032`.
**SEAT:** IMPLEMENT · `modelId: claude-opus-5[1m]`.
**TREE:** SHARED. Zero `git add` / `commit` / `stash` / `checkout` by this seat.
**BASE:** `8a96868d` (the dispatch named `2cfc1124 or later`; the driver had advanced).
**DATE:** 2026-08-25.

**THIS RECORD HAS TWO IMPLEMENT SEATS, AND THE SECOND SUPERSEDES THE FIRST ON MEASURED
FIGURES.** Seat 1 (09:40–10:01) authored §0-§10 below. Seat 2 (10:05–10:20, this text)
re-verified every claim against disk rather than inheriting it, found the charter's D4 /
H-1c strike UNLANDED and landed it (**§5b**), and re-measured every gate line — all of
which had MOVED, because γ4 cured its broken SFC between the two seats. §6 and §10 are
seat 2's; where seat 1's figures are superseded they are struck in place, never edited
away. **One of seat 1's stated grounds was FALSE on the bytes and is corrected at §6.**

**MODEL ASSERTION — fallback-free, and it GATED the chain.** Unit-4 §1 recorded the
`${CLAUDE_MODEL_ID:-…}` tautology and the measured fact that `CLAUDE_MODEL_ID` is not set
in this harness at all. This seat asserts the id the system prompt states directly and
gates on a PATTERN, never on non-emptiness:

```sh
echo "MODEL_ID_ASSERT: claude-opus-5[1m]" && [[ "claude-opus-5[1m]" == claude-opus-5* ]] \
  && echo "GATE_PASS: implement-seat model law satisfied"
→ MODEL_ID_ASSERT: claude-opus-5[1m]
→ GATE_PASS: implement-seat model law satisfied
```

The `&&` is load-bearing: the first repo act sat behind it and a non-matching id exits
non-zero before any byte. No `:-` substitution appears anywhere in the chain.

**The #7 fence, cited as the lane requires in every wave record:**
`src/components/dock/styles/morph.css:67-76` — *"NO FILTER ON AN ANCESTOR OF A LENS — the
#47 (GF-DOCK) fence… makes that ancestor a BACKDROP ROOT: the lens beneath samples IT
instead of the page and the glass goes flat."* Re-read on disk. **Measured on this seat's
own bytes: `git diff -- src/components/dock | grep -c '^+.*filter:'` → `0`, and
`run.css` contains zero `filter:` declarations.** The one surface this unit newly paints
(the focus ring) moved ONTO `outline` — a property that is not a filter and creates no
containing block, which is the fence's concern.

---

## §0 · STEP-0 BASELINE — banked before a byte

```
$ git diff -U0 > /tmp/bk-lanealpha-baseline-1787665152.diff   (1,221 lines)
$ git status --porcelain | wc -l                              → 20
$ git rev-parse --short HEAD                                  → 8a96868d
```

Untracked at open, enumerated (5 paths, exactly):

```
docs/tranches/BK/execution/2026-08-10-lanealpha-unit5/PASTE-BLOCKS.md   α (challengers')
docs/tranches/BK/execution/2026-08-10-lanealpha-unit5/RECORD.md         α (challengers')
src/components/dock/composables/useDockRun.ts                           α
src/components/dock/styles/run.css                                      α
tests/components/custom/handmark/g-hm-mark.test.ts                      γ4 — FOREIGN
```

Tracked-dirty at open, 16 rows: **11 α** (`src/components/dock/**` ×9 incl. 3 deletions —
`useDockOverflowFit.ts`, `useDockTouchGate.ts`, `styles/overflow.css` — plus
`tests/components/custom/dock/**` ×2) and **5 δ** (`demo/chassis/**`). Lane β's unit-β0
dirt (MIGRATION.md, `darkModeSyncScript.ts`) had already landed and was absent; the
formerly-fenced `material.css` / `material-css-syntax.test.ts` were clean.

---

## §1 · CENSUS OF THE LIVE PARTIALS — verified against the W2-W9 charter, file by file

Three prior attempts died at walls mid-implement and the tree had **grown** since the
unit-5 challenge record (§7 of the prior RECORD, now superseded by this one at §1-§8).
The dispatch required each file be censused and deliberately **ADOPTED or SUPERSEDED**.
Everything below was re-measured on disk at open, not inherited from the challenge:

| surface | charter wave | census at open | disposition |
|---|---|---|---|
| `styles/run.css` (NEW, 492→516) | W3 · W4 · W5 | lattice + budget law + snap grammar + **W4 open seat** + **W5 cut cap** all present and internally consistent | **ADOPT**, extended at W9 |
| `composables/useDockRun.ts` (NEW, 332) | W3 · W6 | anchor with `openExtra` + `−P/2`, roving tabindex, arrow travel, capture-phase reach, live region | **ADOPT** |
| `composables/dockMorphMeasure.ts` | W7 | pre-measure guard present via a `CaptureSource` discriminant | **ADOPT**, falsified here |
| `overflow.css` · `useDockOverflowFit.ts` · `useDockTouchGate.ts` (DELETED) | W3 | no live reference anywhere outside dated strike prose | **ADOPT** |
| `density.css` | W2 | coarse `--dock-scale` re-declared; ×1.17 dead; coarse seat = `max(40px×1, 44px)` = 44px exactly | **ADOPT** |
| `GlassDock.vue` · `useDockShellProps.ts` · `index.css` · `shell.css` | W1 · W3 · W6 | run rides the full face, `role="toolbar"`, K-7 disclosure present, status node outside the run | **ADOPT**, cured here |
| `GlassDock.scroll-overflow.test.ts` · `GlassDock.touch-gate.test.ts` | W3 | already re-pointed; **all 87 dock tests green at open** | **ADOPT** |

**Three of the challenge record's thirteen defects were already cured in the tree at this
seat's open** and are re-measured green rather than re-litigated: the rail-vocabulary
census (`rg -w rail src/components/dock/styles` → **0**), `scroll-overflow.test.ts:25`,
`touch-gate.test.ts:244`. The two scratch probes are gone and `tests/demo/__census_tmp.test.ts`
is absent. **W4 SEAT and W5 CUT had LANDED** since the challenge — the record's "ABSENT:
W4 · W5" line is instant-dated and is struck by this census.

**What was genuinely still absent at open, and is this unit's work:** the four DOCK gate
seats (§2), the W7 guard's falsifier (§2), W8 (§4), W9 (§5), and five prose/source
defects on committed text (§3).

---

## §2 · THE FOUR DOCK SEATS — authored, born-RED, green

`tests/components/custom/dock/g-dock-lattice.test.ts` (NEW, 32 arms). This is the lane's
own verify term and until now it **could not be run at all**: no `G-DOCK-*` name existed
in any test, in `scripts/gate-register.mjs`, or in the C20 roster, while `run.css:125`
and `useDockRun.ts:24` cited `G-DOCK-BUDGET` / `G-DOCK-REACH` by name as if they were
live. Figures naming absent detectors is exactly what the register's own status
vocabulary (⊕²⁵) refuses: *"an unwired gate is ABSENT, never GREEN."*

**SEATS +0 — MINTED NOTHING, and the mechanism is checked, not asserted.** These are
ORDINARY tests under `ordinaryTestLaw.ordinaryTestsConsumeBudget: false`
(GATE-SEMANTIC-ROSTER-C20.json), the same standing `G-ONE-NAME`'s rail arm and `G-HM-MARK`
already hold. `gate-register.mjs` validates **roster → executable**, never executable →
roster (verified by reading its violation paths), so a G-named ordinary seat cannot move
a count. `SEAT-BINDING.json` untouched. **Receipt byte-identical across the cut** (§6).

### §2a · BORN-RED — measured against `git archive`d pre-wave bytes

Two scratch bases, neither of them the working tree:

```
git archive HEAD          src/components/dock → …/born-red-HEAD     (pre-W2..W9)
git archive ac471032^     src/components/dock → …/born-red-preW1    (pre-W1)
```

A transient probe applied the seats' own detectors to those bytes and was **deleted in
the same seat** (verified absent). Output, verbatim:

```
──── BORN-RED BASE A — git archive HEAD (pre-W2..W9)
  RED   G-DOCK-BUDGET · exactly one flex:1 member, on the run  — found 0 (law unstated)
  RED   G-DOCK-BUDGET · no rule consumes the inline consumer cap  — consumed in shell.css
  RED   G-DOCK-RUN · pitch pair @property-registered  — neither registered
  RED   G-DOCK-RUN · snap grammar on the run (5 declarations, both axes)  — missing 6/6
  RED   G-DOCK-RUN · cap rides a NAMED scoped timeline  — no named timeline anywhere
  RED   G-DOCK-RUN · no edge fade on either axis  — fade declared in overflow.css, shell.css
  RED   G-DOCK-RUN · useDockTouchGate has no live reference  — the file is on disk
  RED   G-DOCK-REACH · openExtra term ⟺ open-seat rule  — useDockRun.ts does not exist — no anchor at all
  GREEN G-DOCK-REACH · run never returns the gesture to the page
  RED   G-DOCK-MORPH · only post-layout events move an endpoint  — capture() is unconditional
  RED   G-DOCK-MORPH · no collapsed hover pre-scale  — pre-scale live in morph.css
  RED   G-DOCK-STATE · geometric carrier (--dock-open-pitches ≥ 2)  — no open-seat geometry declared

──── BORN-RED BASE B — git archive ac471032^ (pre-W1)
  RED   G-DOCK-BUDGET · DockProps ≤ 6  — DockProps carries 14

WORKING TREE (for contrast): DockProps = 6 · flex:1 members = 1
```

**12 of 13 RED. The ONE GREEN is reported as green and not dressed up:** `touch-action:
auto` was never *declared* in the pre-wave dock band — the audit's "`touch-action: auto`
universal" was the COMPUTED default, not an authored rule. That arm is therefore an
anti-regression guard, not a cure, and calling it born-RED would be the figure inflation
this tranche keeps catching.

### §2b · The seats, and the two live defects they caught on their first run

| seat | arms | what it holds |
|---|---|---|
| **G-DOCK-BUDGET** | 4 | `DockProps` ≤ 6 · exactly one `flex: 1` member and it is the run · persistent regions counted · **no rule consumes the inline consumer cap** |
| **G-DOCK-RUN** | 8 | pitch pair `@property`-registered · P = `calc(seat + gap)` · the five snap declarations on both axes · no `proximity` · named scoped timeline and **no anonymous `scroll(...)`** · cap keyframes only through the rest/cut token pair and no `9999px` · no edge fade · the three deleted owners stay deleted |
| **G-DOCK-REACH** | 7 | **the pairing law** · the `−P/2` term and the clamp · never `touch-action: auto` · one tab stop · the stop follows `aria-current` · arrow/Home/End travel with no wrap · vertical takes the block-axis pair · the live region exists |
| **G-DOCK-MORPH** | 3 | **the flip falsifier** · only post-layout events move an endpoint · no collapsed hover pre-scale |
| **G-DOCK-STATE** | 3 | geometric carrier real on both orientations (m ≥ 2, block < inline) · one `aria-current` predicate read identically in CSS and JS · *(one arm KNOWN RED — §7)* |
| **G-DOCK-MATERIAL** | 2 | the ring is an `outline`; exactly one licensed `outline: none` in the band; the yield names the property the ring is on |
| **G-DOCK-PROPORTION** | 1 | the run's gap is authored, not aliased, and is the same token P is computed from |

**THE PAIRING LAW is the arm this file exists for.** The challenge record's §2.5 found the
`openExtra` term shipping while `--dock-open-seat` had zero consumers — arithmetic for a
geometry no rule produced, so reach overshot by exactly `(m−1)·P` past any `aria-current`
seat. W4 has since landed the geometry, but *nothing stopped the pair coming apart
again*. The invariant is therefore stated as a **biconditional**: the term and the rule
ship together or neither ships. Delete either half and it REDs.

**THE W7 FALSIFIER.** The challenger measured that reverting the guard survived **29/29**
of the dock's existing motion seats — the cure for "the component's largest motion
defect" shipped with no test that could tell it from the defect. The new arm reproduces
the mechanism exactly: a root pinned at its collapsed span (64), a `collapsed→expanded`
flip with no intervening layout, then read `--dock-expanded-px`. With the guard it
publishes **≥220** (the full pane's own rendered span, via the honest fallback). Delete
the `if (source === "layout")` arm and it publishes **64** — identical to
`--dock-collapsed-px`, i.e. the traced defect: expand runs to 186 of 311, holds ~350ms,
jumps +125px in one frame at t≈657.

**TWO LIVE DEFECTS the seats caught on their first run, both cured here:**

1. **The collapsed hover pre-scale was still live** (`morph.css:299`, token at
   `shell.css:76`) — GF-DOCK strikes it and no prior wave had. §4.
2. **A SECOND `outline: none`** in `layer-group.css:305` on the switcher tab, which the
   W8 ring move would have left as a silent half-state. §4.

*(A third finding was mine, not the tree's: my first `9999px` detector read raw text and
REDded `run.css` for **naming** the rejected keyframe in its own docblock. Fixed to read
declarations — a detector that cannot tell a strike from a declaration would RED this
wave for doing exactly what the wave was asked to do. The same trap bit once more: my new
morph.css prose used the word "safety rail" and G-ONE-NAME's D2 identifier detector
caught it. Both are recorded because both are the class of self-inflicted RED that
otherwise gets quietly edited away.)*

---

## §3 · CURES ON COMMITTED TEXT — five, all in fence, all dated strike-in-place

| # | site | act |
|---|---|---|
| 1 | `shell.css:179` | **`max-inline-size: var(--dock-max-inline-size)` DELETED** — W3's charged "delete … the consumer cap". Ground recorded on the bytes: the cap was `overflow.css`'s *precondition* (that file needed a box that could be too small for its content for "does the row fit?" to have a false branch), and at 393px `80vw` = **314px**, NARROWER than the measured 377px plate — it was clamping the dock below the width the viewport offered while chrome and lattice fought over the remainder. `--dock-max-block-size` survives: a column cap hands the vertical run its scrollable extent. |
| 2 | `shell.css:59-65` | the prose promising a max-inline cap **and** a "mask-fade" on both axes — both false after W3. Truthed under a dated bracket. |
| 3 | `constants.ts:52` | *"`useDockState` and `useDockTouchGate` both default to it"* — the second owner is deleted. Bracketed: there is now exactly one consumer, so the drift the sentence guarded against has no second party left to occur between. |
| 4 | `layers.css:12,14` | routed readers to `dock/overflow.css` (deleted) and taught the `layout="grid"` arrangement (struck at W1). Both bracketed. The block at `:20` that explained the cap was truthed to keep the half that is still load-bearing — the `min-*: 0` floor release, which is what lets an `overflow: auto` box shrink below its content at all. |
| 5 | `GlassDock.vue:209` | **`outerLayerAxis` DELETED** — orphaned by the `axis: orientation` swap; its only remaining reader was a comment. An identity `computed` over one ref is a second name for that ref, and a second name is how "which axis does the morph run on" acquires two answers. Prose at `:423` re-pointed. |

### [2026-08-25 · BK #47 W2-W9 CURE] THE BRACKET-DATE CONVENTION, AND THE FIVE SURFACES THAT WERE LOST AND RE-DERIVED

**A strike bracket carries the date of the WAVE ACT it records — the day the reasoning
was first derived — not the day the characters were last typed.** So `[2026-08-24 · BK
#47 W8 MATERIAL]` on a line in `layers.css` means "this is W8's act, reasoned on the
24th", and it stays 2026-08-24 even though the bytes on disk were authored on the 25th.
§5b's brackets read `[2026-08-25 · BK #47 W5 CUT]` because that act was BOTH derived and
typed on the 25th, and the cure brackets added today read 2026-08-25 for the same reason.
The convention is stated here because without it the dates look like a forgery: they
disagree with the file mtimes and with the banked baselines, and a reader is owed the
rule rather than left to reconstruct it.

**Why the disagreement exists at all — five surfaces were LOST after the dispatch census
and re-derived from scratch this unit.** The dispatch enumerated them as already-dirty;
they were not, because the prior attempt died at a wall before its edits were banked and
the tree was later reset over them. Re-derived here:

| surface | tracked? |
|---|---|
| `src/components/dock/constants.ts` | ` M` |
| `src/components/dock/styles/layers.css` | ` M` |
| `src/components/dock/styles/morph.css` | ` M` |
| `src/components/dock/styles/layer-group.css` | ` M` |
| `tests/components/custom/dock/g-dock-lattice.test.ts` | `??` untracked |

**The proof is negative and it is checkable.** None of the five appears in seat 1's
step-0 capture `/tmp/bk-lanealpha-baseline-1787665152.diff` (16 `diff --git` rows), nor in
any of the five Aug-24 baselines (`…-1787585936` · `…-1787586323` · `…-1787587673` ·
`…-1787587680` · `…-1787588433`, 14/14/9/9/9 rows). Verified by
`grep '^diff --git' <baseline> | grep -c <surface>` → **0 for all five surfaces across all
six baselines.** Their present dirt is therefore this unit's own work, and the 2026-08-12
/ 2026-08-24 brackets they carry are wave-act dates under the rule above, not evidence
that the bytes predate the baselines — which is exactly the inference the convention
exists to forestall.

## §4 · W8 MATERIAL — the half that is inside the fence

**LANDED: the focus ring leaves `box-shadow` for `outline`** (`index.css`, and the
switcher tab in `layer-group.css`), with the `--dock-ring-{width,offset,color}` trio
declared on the same `:where()` group that already carries the motion register.

The ground is a **collision**, not a preference. `box-shadow` is ONE property and the dock
was asking it to carry two independent facts — this focus ring, and every control's own
hover/press/selected elevation. A single property cannot hold two states, so whichever
rule wins the cascade erases the other. The file's own comment documented the workaround:
the group deliberately keeps class specificity *"NOT `:where()`, which would … let a
per-control `:hover` box-shadow override the focus ring."* **That paragraph is the defect
describing its own workaround** — a specificity ladder holding up a keyboard user's focus
ring until the next control ships a more specific hover.

`outline` is a different property: it composes with any elevation instead of competing
with it, `outline-offset` seats it outside the box so it never overlaps the glyph, and it
is what **forced-colors** mode honours — a `box-shadow` ring vanishes there entirely, a
total loss of focus visibility rather than a degraded one. The old `outline: none` was not
a tidy-up beside the shadow; it was the line that removed the only channel a
high-contrast user had. Width and offset READ `--focus-ring-width` rather than restating
GF-DOCK's 2px/2px, so a house retune moves the dock with it. Colour is the accent at
**48%** against the house 30%, because the ring now paints over the dock's own frosted,
saturated, mid-luminance plate rather than over the page.

Two consequences followed through rather than left dangling: `[data-ring-yield]` was
re-pointed to `outline: none` (as written it would have suppressed nothing while still
deleting the control's elevation), and the switcher tab was moved onto the same trio —
which also makes *"paints the shared dock ring"* in its own comment true for the first
time, since it had been reaching past the dock's register to the house token.

**ALSO LANDED (caught by G-DOCK-MORPH): the collapsed hover pre-scale is DELETED**
(`morph.css:299` + its token at `shell.css:76`, its only consumer). Traced: hover ran the
box 56 → 61.6 on `scale`; the approach became an expand, `[data-morphing]` landed, the
rule was guarded `:not([data-morphing])` and **stopped matching**, so the factor reverted
in a single un-tweened frame 54ms before the aperture morph began. Three events for one
intention, the middle one uncommanded. The `:not(...)` guard that reads as a safeguard is
the mechanism of the defect. No retune exists: a pre-scale on the box the morph is about
to re-size is a second owner of one geometry.

**ROUTED OUT OF FENCE — a marked consumer addendum, per the consumer-updates ruling.**
Specular 0.30/0.18 light and 0.40/0.24 dark → 0.12 with the side struck and dark ≤ light;
`static` = the glass class not applied; the uniform 0.97 press replacing 0.9884/0.9317;
the hover well at 0.05 under `(hover:hover)`; the ~8s idle traverse. **Every one of these
values lives in `src/styles/tokens/*` — outside Lane α's fence** (`property-regs-specular.css`,
`scale-paper.css`, `sizing.css`). Also routed: `--dock-ring` itself (`sizing.css:255`),
left standing because `dark-mode-toggle.css:31` still reads it as a fallback.

---

## §5 · W9 PROPORTION — one act landed, the rest measured dead or refused

**The charter's W9 list was written against a 2026-07 snapshot and the tree has moved
past most of it.** Re-derived on disk this seat rather than assumed:

| W9 item | measured on disk | disposition |
|---|---|---|
| rail gap 6 → 8 | `--dock-run-gap` bound to the family's `--dock-layer-gap` (0.375rem) | **LANDED** — see below |
| tabs 4 → 8 | no `tab-gap` / dock tab gap token exists | dead — nothing to retune |
| big-dock 100 → 84 + 12/12 | the grid/big-dock arrangement is STRUCK (`layer-group.css:60`, W1) | dead by construction |
| separator by the gap law | no off-series `0.15` separator survives in the band | already discharged |
| partials 19 → 12 | **15** `.css` partials on disk (the "19" counted the pre-carve band); W3 net −1 (`overflow.css` out, `run.css` in) | reported, not fudged — the consolidation is not reached by W2-W9's remaining budget and is not claimed |
| **rounded 12 → 16** | live | **REFUSED — owner ruling.** GF-DOCK §4 states it *"contests π-SHAPE-HOLD's off-series literal … needs the owner's explicit ruling, never a silent landing"*, and §9 ROUTED sends it to **owner ruling**. Three prior seats concurring is not a mandate. |
| seat rung 2.5rem → 44px (fine pointer) | live | **REFUSED — π.** Growing every control in every dock in the library by 4px is a photometered act owing owner-paint acceptance and this unit captured none. Enqueued as π-PROPORTION. The lattice does not need it: P is exact at whatever `--dock-control-size` resolves to. |

**LANDED — the run's gap takes the proportion target, on the run's own token.**
`--dock-run-gap` 0.375rem → **0.5rem**. This is precisely what W3 built the second name
for: `--dock-layer-gap` is the *family's* gap (persistent regions, layer group, switcher,
stack), and retuning it to hit the lattice's proportion would move all four to serve a
number only the run's pitch cares about. The seam lets the two diverge exactly once, in
the one place a divergence is meaningful. It moves the pitch with it by construction —
`--dock-run-gap` is P's second term AND the value the run paints — so at the coarse seat
W2 fixed at exactly 44px this lands **P = 52px**, GF-DOCK's stated pitch, now computed
rather than asserted. π-PROPORTION is enqueued for it.

---

## §5b · W5 CUT — THE ARBITRARY-SHAPE REGISTER STRUCK (seat 2; charter D4 / H-1c)

**Seat 1 closed W2-W9 without this act, and the act was in the charter the whole time.**
Seat 2 re-walked GREENFIELD-TERMINAL:341's STRIKE list line by line against disk instead
of against seat 1's census, and one entry had no landing anywhere in the tree:

> `shape.css:72-110` + the four `--dock-shape-*` vars — from≡to≡`--radius-dock` and
> clip≡none on disk: the lerp computes `r+(r−r)·t`; striking them clears `border-radius`
> for the cut cap

Two further adjudications name the same act with the same evidence, so this is a
three-times-ratified strike that simply never got built:
`COMPONENT-WAVES.md:459` (**D4**, with the exact prescription — "Delete `shape.css:73-110`
… collapse `:61-71` to `border-radius: var(--radius-dock)`. Delete `density.css:53-54`
and `:61-62` … **Leave the size-morph block alone — it is live**") and
`COMPONENT-WAVES-TERMINAL.md:711` (**H-1c**, "4 tokens, **ZERO setters**, a no-op lerp").
Line numbers had drifted (the vars now sat at `density.css:61-62,69-70`); the bytes had
not.

**RE-DERIVED ON DISK BEFORE TOUCHING IT — the diagnosis is reproduced, not inherited:**

```
$ rg -n -- '--dock-shape-(from|to|clip-from|clip-to)\s*:' --glob '!**/shape.css' src/ demo/ tests/
  src/components/dock/styles/density.css:61  --dock-shape-from: var(--radius-dock, 9999px);
  src/components/dock/styles/density.css:62  --dock-shape-to:   var(--radius-dock, 9999px);
  src/components/dock/styles/density.css:69  --dock-shape-clip-from: none;
  src/components/dock/styles/density.css:70  --dock-shape-clip-to:   none;
```

Those four lines were the definitions AND the only setters in the repo, and each assigned
**precisely the fallback the reading rule already carried**. So `shape.css`'s corner LERP
computed `r + (r − r)·t` — the identity, at every `t`, for every consumer, since the
register shipped — and the clip LERP plus both its `[data-morphing]` forks resolved
`clip-path: none`, the property's initial value, reached by way of a custom property and a
state fork.

**WHY IT IS WORSE THAN DEAD CODE, which is the ground the charter states in six words.**
A parameter with one reachable value is a static declaration wearing the costume of a
knob — and here the costume mattered, because the thing it was dressed as is *an animated
authority over the dock's corner*. W5's cut cap is the real animated corner: `.dock-plate`
drops two rungs down the 4 · 10 · 16 · 24 · stadium series on whichever edge still hides
content, and that only *means* "there is more that way" if nothing else in the band is
moving a radius. A live-looking second claimant on the shell is indistinguishable from a
working parameter until someone sets a token and discovers the design.

**LANDED (all in fence, all dated strike-in-place on committed text):**

| site | act |
|---|---|
| `shape.css` docblock | truthed — the file is the box-size morph partial now; the arbitrary-silhouette thesis struck with the measurement that killed it |
| `shape.css` corner rule | the `calc()` LERP **collapsed to `border-radius: var(--radius-dock)`** — the value it always computed. Zero rendered pixels move; what moves is who may claim the corner |
| `shape.css` clip register | **three rules DELETED** (the `--dock-shape-clip` resolve + both `[data-morphing]` forks) |
| `density.css` | **all four tokens DELETED** under one bracket carrying the zero-setters measurement and the no-migration note |
| `density.css` squish-cap prose | **TRUTHED, NOT STRUCK** — see the refusal below |

**LEFT LIVE, DELIBERATELY, AND THE DISTINCTION IS THE POINT.** `--dock-morph-max-stretch`
sits in the same `:root` block, has **ZERO readers in `src/`** (measured: the only
occurrences in the tree were its declaration and the sentence describing it), and the
`--stretch` squish it caps is DEFINITION-ABSENT — `shape.css` records that retirement
itself. It is dead by exactly the same test as the four. **It is not struck**, because the
#47 STRIKE list names the four `--dock-shape-*` vars specifically and does not name this
one, and minting an extra deletion because it sits in the same block is how a wave's scope
quietly becomes whatever the seat happened to notice. What *was* fixed is the falsehood:
its comment promised a live deformation register the engine cannot produce. **ROUTED** as
a measured-dead sibling. The size-morph block (`--dock-size-scale`) is untouched, as D4
explicitly requires — it is live.

### §5b.1 · The arm that makes it un-reintroducible — born-RED 3/3

A strike with no invariant behind it is a strike that comes back. `G-DOCK-MATERIAL` gains
a **biconditional** arm, the same shape as the pairing law: *the shell's corner is static
**and** the cut cap is the band's only keyframed radius.* Re-introduce either half — a
token-driven lerp on the shell, or a second animated radius anywhere in the band — and it
REDs. Its first sub-assertion greps `--dock-shape-` over `declarations()` (comment-stripped)
rather than raw text, because the strike prose naming the struck tokens is exactly the
tombstone a raw grep would report as a corpse still walking.

Born-RED measured against `git archive HEAD` (pre-strike bytes), by a probe **deleted in
the same seat** along with its scratch tree (both verified absent; they appear in no commit):

```
──── BORN-RED BASE — git archive HEAD (pre-strike bytes)
  RED   no --dock-shape-* token survives in the band  — live in styles/density.css, styles/shape.css
  RED   shell corner is a static var(--radius-dock)   — border-radius is a calc() lerp over the struck pair
  RED   cut cap is the band's only keyframed radius   — found []

──── WORKING TREE (post-strike, for contrast)
  GREEN · GREEN · GREEN
```

**3 of 3 RED, and the third one's RED is reported for what it actually is:** on committed
HEAD the cap keyframes are absent because `run.css` is this unit's own untracked new file
— so that arm reads "no cut cap existed yet", not "a competing cap was struck". Stating it
the other way would inflate a born-RED, which is the class of figure this tranche keeps
catching.

Seat count **+0**: this is one `it()` added to an existing ordinary test file under
`ordinaryTestLaw.ordinaryTestsConsumeBudget: false`. Receipt re-measured **byte-identical**
(§6).

**THE #7 FENCE, re-cited on §5b's own bytes as the lane requires of every wave record**
(`morph.css:67-76` — *"NO FILTER ON AN ANCESTOR OF A LENS … makes that ancestor a BACKDROP
ROOT: the lens beneath samples IT instead of the page and the glass goes flat"*). §5b is
the one act in this unit that touches the dock's SILHOUETTE, so the fence is live for it
rather than incidental — and it is honored by construction: the strike **removes** a
`clip-path` claimant and **removes** a `calc()` from `border-radius`, adding no property
of any kind to `.glass-dock`. Measured across the lane's entire diff:
`git diff -- src/components/dock | grep -c '^+.*filter:'` → **0**. Neither `border-radius`
nor `clip-path` creates a backdrop root, so `.dock-plate`'s lens still samples the page.

---

## §6 · GATE LINES — REAL exit codes, this seat's own runs, never a piped tail's

**SEAT 2's LINES ARE THE RECORD'S LINES.** Seat 1's are struck below rather than deleted,
because the delta between them is itself the finding: **γ4 cured its unparseable SFC
between the two seats**, so every figure seat 1 attributed to γ4 has since evaporated. A
record that quietly swapped in the better numbers would erase the evidence that the worse
ones were correctly attributed at the time.

```
vue-tsc   $ npx vue-tsc --noEmit                                  → EXIT=0, ZERO diagnostics
          Re-run by seat 2 after the §5b bytes landed: EXIT=0, zero. Not a tail's code —
          the exit was captured directly off the process.
          ~~seat 1: EXIT=2 with 15 diagnostics, all foreign (handmark.vue 14,
          colors.vue 1) from γ4's unparseable src/components/handmark/HandMark.vue~~ —
          [2026-08-25 · seat 2] SUPERSEDED: γ4's SFC parses now; the 15 are gone. Seat 1's
          attribution was right and is now moot.

battery   $ npx vitest run
          → EXIT=1 · Test Files 2 failed | 222 passed (224)
                     Tests 2 failed | 2091 passed | 8 expected fail (2101)
          α-OWNED SOURCE FAILURES: **ZERO**. Both failures are STALE LOCAL BUILD
          ARTIFACTS, and both are α-CAUSED — stated that way rather than laundered
          through a foreign owner:

            tests/public-surface.spec.ts:766   ONE row pair, measured verbatim:
                                 -   "components/dock/styles/run.css"
                                 +   "components/dock/styles/overflow.css"
                               Source ships run.css (α's W3 lattice); dist/ still ships
                               the overflow.css α deleted. Cure: one `npm run build`.

            tests/gates/boot-graph.test.ts:576  "dist-demo/index.html is STALE (built
                               14:00:21.977Z, newest source 14:13:19.210Z)". The newest
                               source is α's own §5b edit. This gate was GREEN in seat 2's
                               pre-strike run and α's next byte re-RED-ed it — which is
                               the gate working exactly as designed. Cure: one
                               `npm run demo:dist:build`.

          ~~seat 1: 9 failed files; γ4 owned 7 (handmark specs + token-hygiene +
          trap-gates + overfit-structure)~~ — [2026-08-25 · seat 2] SUPERSEDED: γ4's cure
          landed and all 7 are GREEN. spring-authority REDed briefly mid-seat-2 on γ4's
          HandMark.vue and was green by close — a live tree, measured twice.

          α FENCE SLICE  $ npx vitest run tests/components/custom/dock/ tests/styles/
                         → EXIT=0 · Test Files 38 passed (38)
                                    Tests 521 passed | 6 expected fail (527)
                                    [2026-08-25 CURE] was ~~520 | 6 (526)~~ — off by one
                                    against the tree it claimed to measure
          DOCK ALONE     → EXIT=0 · 13 files · 111 passed | 1 expected fail (112)
                                    → 112 passed | 1 xf after §5b's arm

receipt   $ node scripts/gate-register.mjs                                    → EXIT=0
          seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
          armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
          — `diff` against seat 2's own step-0 capture: **BYTE-IDENTICAL**. NOTHING MINTED,
          across both seats and the §5b arm.

G-BUNDLE-RATCHET  **RED BY ROUTE** — the single batch-close rebind carries β0's +1215 and
          the driver's −71. `verify:package`'s ratchet arm REDs LAWFULLY. Stated, not
          papered; not re-measured this seat. No lane can discharge it alone.
```

### §6.1 · A CORRECTION ON SEAT 1's OWN GROUND — the artifacts are not committed

Seat 1 justified leaving the stale build with: *"rebuilding it mid-batch would bake four
lanes' in-flight source into a **committed artifact**."* **That ground is false on the
bytes, and the conclusion needs a real one.** Measured:

```
$ git check-ignore -v dist dist-demo
  .gitignore:2    dist/        dist
  .gitignore:65   dist-demo/   dist-demo
```

Both are **gitignored**. A rebuild commits nothing and could not bake anything into any
artifact under version control. The honest reasons not to rebuild here are different, and
both are about a SHARED tree with three other lanes live in it: (1) `dist/` and
`dist-demo/` are **outside α's fence**, and a build writes them wholesale; (2) a rebuild
mid-batch is a **race α cannot win** — it would bake γ4's and δ3's in-flight source into
the artifact those lanes are measuring against, and the very next source byte from any
lane re-STALES it, which is precisely what happened to `boot-graph` between seat 2's two
battery runs. The act stands (do not rebuild); the reasoning is now true.

### §6.2 · THE STANDING BATTERY FIGURE, and the acts that moved it

The dispatch's last quiesced read was `2015 passed | 7 xf`. Seat 1 measured exactly that
at step-0. **The close figure is `2091 passed | 8 xf` of 2101, and the direction is UP:**

```
  step-0 (seat 1, 09:40)   2015 passed |  7 xf  (2054)
  close  (seat 2, 10:15)   2091 passed |  8 xf  (2101)

  +32 tests   α   g-dock-lattice.test.ts (31 pass + 1 declared xfail, §7)
  +1  test    α   §5b's corner-authority arm  → α's total: +33
  net +44     γ4  the handmark restructure, through its own delete-and-replace trough
                  (seat 1 correctly measured it at −107 mid-flight; γ4 has since landed
                  its replacement specs, and the trough was never α's to carry)
  ─────────
  α's contribution to the FAILURE count: ZERO.   α's contribution to xfail: +1 (§7).
```

---

## §7 · THE ONE EXPECTED FAIL THIS UNIT ADDS — declared, with its owner

`G-DOCK-STATE › no state class survives in the dock band` is authored **`it.fails`**, and
the RED belongs to **W1 SURFACE**, not to this unit.

GF-DOCK §4 charges W1 with replacing the four state classes and their 47 selectors with
`data-dock-state="collapsed|hover|pinned"`. W1 landed the PROP half — 14 → 6, asserted
green in G-DOCK-BUDGET — and did **not** land the ATTRIBUTE half. Measured on disk:
`data-dock-state` appears **nowhere in `src/`**, and **20 state-class selectors** remain
live across three partials (`dock.css` 3 · `layers.css` 4 · `morph.css` 13 — `shape.css`
and `shell.css` are ZERO), with one root still emitting `expanded pinned always-expanded`
together. By class: `.collapsed` 10 · `.expanded` 6 · `.always-expanded` 4 · `.pinned` 0.

> **[2026-08-25 · BK #47 W2-W9 CURE] The figure was ~~30 across five partials
> (`layers.css` 8 · `morph.css` 16 · `shape.css` 1 · `shell.css` 2)~~ and it was wrong in
> all three artifacts that carried it.** The struck count was taken by a RAW-TEXT read.
> The arm it describes measures on `declarations()` — comments stripped first — because
> this band strikes retired code IN PLACE inside `~~…~~` brackets. The raw read was
> therefore counting TOMBSTONES as live selectors: precisely the error `declarations()`
> was written to prevent, committed in the prose describing it. Re-measured by the arm's
> own method: 20 across three, and the two partials that fell out had no live state
> selector at all. Corrected here, at §GATES (`:651`), in `PASTE-BLOCKS.md:36`, and in the
> `it.fails` docblock at `g-dock-lattice.test.ts`.

The three alternatives were all worse than declaring it. Omitting the arm leaves the seat
ABSENT on its central invariant while the file above it reads green — the exact "unwired
gate is ABSENT, never GREEN" defect. Weakening it to what the tree does today ratifies the
co-emission as the design. Landing the attribute is a W1 act on 20 selectors across three
partials, outside this unit's W2-W9 charter. **When W1's attribute half lands, this test
starts passing and vitest REDs on the `it.fails` — that is the intended trigger:** the
wave that cures it flips the line to `it` in the same commit and the seat closes green.

---

## §8 · OWED, CARRIED, AND REFUSED

**DISCHARGED by this unit, of the challenge record's carried list:** the four DOCK gate
seats · the W7 guard falsifier · the pairing law made un-reintroducible · `constants.ts:52`
· `layers.css:12,14` · `outerLayerAxis` · the consumer cap · the hover pre-scale · the
scratch probes (already gone at open, verified) · the rail vocabulary and both test cures
(already green at open, re-measured).

**OWED-1 / OWED-2 (α0 canon + emitter rulings) and OWED-4 (the #67 fence word): none is
dischargeable by a #47 wave. All three CARRY**, concurring with unit-4 §5 and unit-5 §5.

**ROUTED to a marked consumer addendum** (consumer-updates ruling — out of α's fence):
W8's tokens-file half (`property-regs-specular.css`, `scale-paper.css`, `sizing.css:255`)
· `src/styles/tokens/offsets.css:33,40` (the `--dock-max-inline-size` declaration, now
consumed by no dock rule) · `demo/stories/dock/overflow.vue:67`, which forces its overflow
*through* the deleted cap and owes a real width constraint · `src/styles/tokens/sizing.css:146,174,194`,
three committed prose sites teaching `overflow.css`'s grammar · `demo/shell/BottomDock.vue`
(FadingScroll, the 672 cap, chevron bodies, the command-aperture strip).

**REFUSED, with grounds, not deferred for convenience:** `shape=rounded` 12→16 (**owner
ruling**, GF-DOCK's own words) · the fine-pointer seat rung 40→44px (**π**, no capture
this seat) · the partials consolidation 19→12 (**not reached**; reported at 15, not
fudged) · **`--dock-morph-max-stretch`** (measured dead, **not named** by the STRIKE list —
§5b; struck-by-adjacency is scope creep) · **W7's member-set-diff leg** — see below.
Standing refusals hold: R-7 footage · device-matrix hardware · Safari-GUI checkbox · the
physical classes.

**W7's THIRD LEG, REFUSED ON A CONTRADICTION THE TREE STATES IN ITS OWN PROSE.** W7 is
charged with three things — *member-set diff, pre-measure guard, collapsed body + `+N`*.
The guard LANDED with a falsifier (§2). The collapsed body is CONSUMER content through the
`#collapsed` slot (`GlassDock.vue:492`) and MARK is already gone from the band (measured:
zero `DockMark`/`dock-mark` hits in `src/components/dock/`). The **member-set diff's
"unshed from layout" half is REFUSED**, because landing it would break the W7 cure sitting
beside it in the same wave:

- The charter wants non-survivors **unshed from layout** (today `visibility: hidden` at
  `grid-area: 1/1`, so they still occupy the stacked cell).
- But `dockMorphMeasure.ts:19-23` derives BOTH morph endpoints from the inactive pane
  precisely because it stays laid out — *"the inactive pane remains laid out (visibility,
  never display, hides it), so the first morph can derive both endpoints from real
  content"* — and `layers.css:114` states the same dependency from the CSS side: *"The
  `.dock-layers` content lays out at its natural size behind the clip — that natural span
  is the `--dock-expanded-px` the ResizeObserver reads."*
- `getSize()` reads `offsetWidth`/`offsetHeight`. Unshedding via `display: none` or
  `content-visibility` zeroes exactly that read, so the honest fallback
  (`chrome + fullSize`) — the thing §2's falsifier proves the guard depends on — returns 0
  and the pre-measure guard's cure evaporates.

Shedding the boxes therefore needs the measurement re-architected off rendered spans
first, which is a design act with a paint acceptance behind it, not a CSS line. **Refused
with grounds and routed**, rather than landed as a one-line `display: none` that would
green nothing and silently re-open the +125px jump.

**ORDERING, unchanged:** the **#76-tail stays terminal** behind this unit and #42; **#42**
is hard-ordered behind #47 and gated on β's export motion; **#22** is outside this batch's
row scope and in flight elsewhere.

**π: ZERO CELLS CAPTURED, TEN ENQUEUED.** No browser was opened by this seat. See
`PI-QUEUE.md`; three cells are NEW and owed by this unit's own acts (π-MATERIAL for the
ring move, π-PROPORTION for the gap retune, π-HOVER-HANDOFF for the pre-scale deletion),
and π-DEFAULT-POSTURE carries from unit 4 still owed.

---

## §9 · FENCE COMPLIANCE — this seat

**Written — 12 source/test files, all inside `src/components/dock/**` and
`tests/components/custom/dock/**`, plus 3 docs files in this unit's own directory:**

```
src/components/dock/GlassDock.vue                       outerLayerAxis cut + prose
src/components/dock/constants.ts                        deleted-owner bracket
src/components/dock/styles/shell.css                    consumer cap + fade prose + hover-scale token
src/components/dock/styles/layers.css                   two routed-to-deleted-file brackets
src/components/dock/styles/morph.css                    hover pre-scale struck
src/components/dock/styles/index.css                    the ring register + outline + yield
src/components/dock/styles/layer-group.css              switcher tab ring
src/components/dock/styles/run.css              (new)   W9 gap
src/components/dock/styles/shape.css            (§5b)   docblock truthed · corner LERP → static · clip register struck
src/components/dock/styles/density.css          (§5b)   the four --dock-shape-* struck · squish-cap prose truthed
tests/components/custom/dock/g-dock-lattice.test.ts (new) the four seats + §5b's corner-authority arm
docs/tranches/BK/execution/2026-08-10-lanealpha-unit5/{RECORD,PASTE-BLOCKS,PI-QUEUE}.md
```

**Not touched, as fenced:** every `demo/**` surface (δ3 is live on `demo/chassis/**`;
`demo/stories/dock/overflow.vue` is routed, not edited) · every `src/components/handmark/**`
and `tests/components/custom/handmark/**` byte (γ4 is live there — its broken SFC was
diagnosed read-only and left exactly as found) · `src/styles/tokens/**` · `package.json` ·
`scripts/subpath-policy.mjs` · `tests/public-surface.spec.ts` · `scripts/gate-register.mjs`
· `SEAT-BINDING.json` · the C20 roster · `dist/**`.

**Transient:** seat 1's born-RED probe (`…/scratchpad/born-red-probe.mjs`) plus two
`git archive` scratch trees; seat 2's `born-red-shape.mjs` plus its own archive tree.
All outside the repo; **both probes deleted in their own seats** (verified absent). None
appears in any commit. Seat 1's two archive TREES (`born-red-HEAD`, `born-red-preW1`) do
persist in the scratchpad — outside the repo, in no commit, and left alone because other
lanes are actively writing that directory.

**Zero index acts. Zero `git add`/`commit`/`stash`/`checkout`. No browser opened — π
ENQUEUE only.**

---

## §10 · WHAT THE DRIVER SHOULD KNOW (seat 2's close)

**W2-W9 is CLOSED and the tree is greener than either seat found it.** Seat 2 re-verified
seat 1's whole close against disk rather than inheriting it — the strikes are real dated
brackets, the deleted rules are gone, `rail` vocabulary is 0, the ring is on `outline`, the
run's gap is `0.5rem` — and then found the one charter act nobody had built: the
**arbitrary-shape register**, three-times adjudicated (STRIKE list · D4 · H-1c) and still
fully live. Four tokens with **zero setters**, a corner LERP computing `r + (r − r)·t`, and
a `clip-path` fork resolving `none` on every branch — a second, inert claimant on the one
thing W5's cut cap needs to own alone. It is struck, its docblock is truthed, and a
**biconditional** arm now holds *shell corner static ⟺ cut cap is the band's only keyframed
radius*, born-RED 3/3 against `git archive`d bytes. `--dock-morph-max-stretch` is equally
dead and is deliberately **left standing and routed**, because it is not on the list and
struck-by-adjacency is how scope leaks.

**Three things the driver owns, not a lane.** (1) Both battery REDs are **stale gitignored
build artifacts** and both are **α-caused** — `dist/` still ships the `overflow.css` α
deleted, and `dist-demo` went stale on α's own last byte. One `npm run build` and one
`npm run demo:dist:build` at the batch close discharge them; α did not run either, because
those trees are outside its fence and a mid-batch rebuild is a race it cannot win with
three lanes live. (2) **Seat 1's stated ground for leaving them was false** — it called
them "a committed artifact"; `.gitignore:2` and `:65` say otherwise. Corrected at §6.1, act
unchanged. (3) **G-BUNDLE-RATCHET stays RED BY ROUTE** and is stated, not papered.

**Carried, with owners named:** the `G-DOCK-STATE` xfail is **W1 SURFACE's** (`data-dock-state`
absent, 20 state-class selectors live across 3 partials) and flips to `it()` in the wave
that lands the attribute. **W7's member-set-diff leg is REFUSED on a contradiction the tree
states in its own prose** (`dockMorphMeasure.ts:19-23` + `layers.css:114`): unshedding the
inactive pane zeroes the very `offsetWidth` read the pre-measure guard's honest fallback
depends on, so shedding needs the measurement re-architected first — a design act with
paint behind it, not a CSS line. OWED-1 / OWED-2 / OWED-4 carry, undischargeable by any #47
wave. Receipt `seats:60 … violations:0`, byte-identical; **π ZERO captured, ten enqueued.**

---

## §10-bis · SEAT 1's ORIGINAL PARAGRAPH, preserved

W2-W9 is now closable on the dock's own terms: the four DOCK seats exist, were born-RED
against `git archive`d pre-wave bytes (12 of 13 arms, with the thirteenth reported GREEN
rather than dressed up), and are green — including a falsifier for the pre-measure guard
that previously survived reverting the cure 29/29, and a **biconditional** pairing law
that makes the "arithmetic without geometry" defect un-reintroducible. Authoring them
immediately caught two live defects no prior wave had struck: the collapsed hover
pre-scale and a second `outline: none` on the switcher tab. W8 landed its in-fence half
(the ring leaves `box-shadow`, which was one property carrying two states, for `outline`,
which forced-colors mode actually honours) and routed its tokens-file half; W9 landed the
one act its seam was built for (the run's gap 6→8, giving P = 52 computed rather than
asserted) and refused two items on **owner-ruling** and **π** grounds with the spec's own
words. Two things need the driver rather than a lane: **γ4's `src/components/handmark/HandMark.vue`
is unparseable on disk right now** and is single-handedly REDding four handmark specs plus
`token-hygiene` and `trap-gates` (which parse every SFC and fail closed, correctly) and
producing all 15 vue-tsc diagnostics — α measured `vue-tsc EXIT=0` before that landed; and
`public-surface.spec.ts:761` REDs on exactly one row, `dist/` still shipping `overflow.css`
where source now expects `run.css`, which the batch-close dist rebuild cures. Receipt is
byte-identical at `seats:60 … violations:0`; nothing was minted. G-BUNDLE-RATCHET stays
**RED BY ROUTE** and is stated, not papered.
