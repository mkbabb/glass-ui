# LANE α — UNIT 8 (π-CURE · R1–R4) · RECORD

**A RESUMED SEAT.** The predecessor implement seat died mid-write (transcript silent
from 13:46); its partials were live on the tree at this seat's open. This record
CENSUSES those partials against the four orders and dispositions each one deliberately
before adding a byte of its own. Nothing here is inherited on a claim.

---

## §0 · SEAT, MODEL, BASELINE

**Model asserted first, and the assertion GATED the chain with `&&`** — a newline is a
sequencer, never a conditional:

```
$ echo "MODEL_ID_ASSERT=claude-opus-5[1m]" && test "claude-opus-5[1m]" = "claude-opus-5[1m]" && echo ASSERTION_GATE_PASS && git rev-parse HEAD && git status --porcelain | wc -l
MODEL_ID_ASSERT=claude-opus-5[1m]
ASSERTION_GATE_PASS
eb2e9428121d258d4c6cddd1121a32741fbcc4b1
      18
```

**Step-0 baseline, banked BEFORE any byte:**

```
$ BL=/tmp/bk-lanealpha-baseline-$(date +%s).diff && git diff -U0 > "$BL"
BASELINE=/tmp/bk-lanealpha-baseline-1787954112.diff
BASELINE_LINES=539
$ git status --porcelain | wc -l
      18
$ git status --porcelain --untracked-files=all | grep '^??'
?? docs/tranches/BK/execution/2026-08-10-lanealpha-unit8/born-red-R4.log
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit5/PASTE-BLOCKS.md
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit5/PI-QUEUE.md
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit5/RECORD.md
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit5/born-red-D1.log
?? tests/components/fourier-field/wgsl-splice-contract.test.ts
```

**THE DISPATCH'S TREE DESCRIPTION IS STALE IN TWO PLACES, and both are stated rather
than quietly enjoyed.** (1) HEAD is `eb2e9428`, not the `2cfc1124` floor — seven commits
past it, the last three being `ebb58a0f` (the π band), `739bf63d` (γ's four cures) and
`eb2e9428` (the π recovery seats). (2) Lane β's unit-β0 dirt — `MIGRATION.md`,
`darkModeSyncScript.ts`, its test, the `lanebeta-unit1` records — is **not on disk as
dirt**; it landed. A seat told to expect foreign dirt and finding none must say so, or a
later reader assumes it was swept.

---

## §1 · CENSUS OF THE PREDECESSOR'S PARTIALS — adopt-or-supersede, per file

Nine paths were live at open. Every one was read in full against the route it claims to
serve and against the coordinates on disk (the census's line anchors were re-derived
here, not trusted — the partials had already moved lines under them).

| # | path | route | disposition | grounds |
|---|---|---|---|---|
| 1 | `src/components/dock/styles/shell-regions.css` | R1 | **ADOPTED** | §2.1 |
| 2 | `src/components/dock/styles/index.css` | R2 | **ADOPTED** | §2.2 |
| 3 | `src/components/dock/styles/run.css` | R2 | **ADOPTED** | §2.2 |
| 4 | `src/styles/glass/overlay-plate.css` | R3 | **ADOPTED** | §2.3 |
| 5 | `src/components/dock/styles/layer-group.css` | R3 | **ADOPTED** | §2.3 |
| 6 | `src/styles/utilities/a11y-overrides.css` | R3 | **ADOPTED** | §2.3 |
| 7 | `…/2026-08-10-lanealpha-unit5/RECORD.md` | R3 | **ADOPTED** | the dated "two sites" strike the order told this seat to verify-or-re-land was already landed by the dead seat, correctly worded and correctly dated; re-landing it would have written the same bracket twice |
| 8 | `demo/stories/data/search.vue` | R4 | **ADOPTED + EXTENDED** | §2.4 — the cure is right; its one measured consequence was unrecorded, and is now pinned |
| 9 | `tests/composables/search/search-contracts.test.ts` | R4 | **ADOPTED + EXTENDED** | §2.4 |

**And the born-RED log.** `born-red-R4.log` was on disk with three real failures at
`13:41:49`. Its claim is credible on mtimes — `search-contracts.test.ts` was written at
`13:41:33` and `search.vue` not until `13:42:13`, so the run did precede the cure — but
**a mtime is an argument, not a proof, and the order forbids inheriting an unproven
RED.** It was therefore re-proved from scratch at this seat against a `git show`
extraction, and it is that run, not the inherited log, that this record stands on (§3).

**FOREIGN, UNTOUCHED — lane δ unit 5, mid-flight.** Six modifications
(`demo/chassis/hero/story-hero.css`, `demo/stories/navigation/toc-tracking.vue`,
`src/components/fourier-field/shaders/render.wgsl.ts`,
`src/components/fourier-field/useFourierField.ts`,
`tests/components/fourier-field/FourierField.smoke.test.ts`,
`tests/demo/page-chrome-shrink.test.ts`) plus
`docs/…/2026-08-10-lanedelta-unit5/` and
`tests/components/fourier-field/wgsl-splice-contract.test.ts`. Not read for adoption, not
edited, not reverted. They are in the battery figure below and are attributed there.

---

## §2 · THE FOUR CURES

### §2.1 · R1 — the vertical run gap (#47 W9, x-ref W3)

**THE DEFECT.** `.glass-dock.vertical .dock-layer` (`shell-regions.css:66`, specificity
**0,3,0**) declared `gap: var(--dock-layer-gap, 0.375rem)`. `.dock-run` rides the SAME
element as `.dock-layer--full` — verified on disk at `GlassDock.vue:464`,
`:class="['dock-layer dock-layer--full dock-run', …]"` — so that orientation rule matched
the run and out-ranked `.glass-dock .dock-run` (**0,2,0**, `run.css:219`). Every vertical
run painted **6px** while `--dock-pitch` computed on `--dock-run-gap` **8px**: 2px short
per seat, 24px cumulative over a 12-seat column
(`pi-PROPORTION-lattice-layout-overflow-1440-light.json` — painted step 46 against a
declared P of 48; the horizontal lattice exact at 48).

**THE CURE IS AT THE ROOT, and it is a DELETION.** The declaration is struck from the
orientation rule rather than out-specified. An arms-race rung
(`.glass-dock.vertical .dock-run`) would have left **three** rules owning one value; the
strike leaves exactly **two, disjoint by element**, which was re-verified by walking every
`--dock-layer-gap` site in `src/`:

| site | selector | matches the run? |
|---|---|---|
| `layers.css:210` | `:where(.glass-dock, .dock-layer-group) .dock-layer` (0,1,0) | yes — and it is the SAME declaration the struck rule carried, so every non-run layer's paint is byte-identical |
| `run.css:219` | `.glass-dock .dock-run` (0,2,0) | yes — and it is now the only gap statement the run matches |
| `shell-regions.css:33` | `.dock-persistent` | no |
| `shell-regions.css:50/54` | `.dock-persistent + .dock-layers` margin | no |
| `shell.css:375` | `.glass-dock.vertical` root | no |
| `crossfade.css:85` | `.dock-crossfade > .dock-face > .dock-face-content` | no |
| `layer-group.css:136` | `.dock-layer-group` track | no |

The run's own token is the law on the run — which is what `run.css:213-218` already said
it had bought.

### §2.2 · R2 — the focus ring clipped by the run port (#47 W8 + W3, jointly)

**THE DEFECT, re-read off the artifact rather than the prose.**
`pi-MATERIAL-ringclip-census-overview-1440-{light,dark}.json`: `total 67`,
`clippedCount 63`, identical in both arms. Every clipper in the 20 stored rows is the
same box — `dock-layer dock-layer--full dock-run` — and the clipped edges are the ring's
full `outline-offset + outline-width` = **4px**.

**THE CURE RESERVES REAL ROOM; it does not mask.** A scroll port clips to its **padding
box**, and this one had no padding to clip into, while the run's cross-axis extent equals
the seat's exactly. `overflow` on the cross axis is not removable — CSS coerces a
`visible` cross axis to `auto` beside a scrollable one — so the geometry has to move:

* `index.css` mints **`--dock-ring-reserve: calc(var(--dock-ring-width) + var(--dock-ring-offset))`**
  on the same `:where()` group that already carries `--dock-ring-{width,offset,color}`.
  It is DERIVED from the two terms, not restated as `4px`, so a retune of either moves the
  reservation with it. It is a dock-register token, not a new house token — **the receipt
  does not move** (§4).
* `run.css` base (inline scroller): `padding-block: var(--dock-ring-reserve)` +
  `margin-block: calc(-1 * var(--dock-ring-reserve))`. The padding grows the clip
  rectangle by exactly the ring's extent; the equal negative margin hands the growth back
  to the parent, so the run's **margin box, the seats' positions and the lattice are
  byte-unchanged** — only the clip rectangle moves.
  **~~True as written.~~ — [2026-08-29 · BK π-RERUN2-R2 · lane α unit 9] TRUE ONLY ON A
  RUN WHOSE CROSS SIZE IS AUTO, which this bullet did not say and did not check.** The
  re-capture measured the two runs whose cross size is authored elsewhere going the other
  way: the sidebar run's margin box SHRANK `40 → 32` with `crossOverflow +8` and the port
  cut 4px off the SEAT, and horizontal `i=5` lost 8px of DOCK height (`56 → 48`)
  (`PI-RERUN-BATTERY.md` §π-RERUN-R2, `dfe6971f`). On a border box someone else has
  already fixed — `.dock-layer--full { width: 100% }` and
  `.glass-dock:not(.vertical) .dock-layer { min-height: … }`, both in `layers.css` —
  padding eats the CONTENT box and the negative margin only shifts the box. Unit 9 adds
  the one declaration that makes this bullet true as it stands (`box-sizing: content-box`
  on the same rule) and lands the static half as a unit arm; see that unit's RECORD §2.
  **The §2.2 refusal below is UNCHANGED and is restated there** — the scroll-axis
  residual is still a scroller property and still not cured.
* `run.css` vertical (block scroller): the pair ROTATES onto the inline axis, and the base
  pair is **zeroed rather than left to cascade** — block padding there would join the
  scrollable length and shift the snap positions.

**Nothing above clips it back**, verified on disk: `.glass-dock { overflow: visible }`
(`shell.css:294-296`, aperture deleted), `.dock-layers` is a bare `display: grid` with no
overflow (`layers.css:44`). The census corroborates it independently — its `cleanSample`
holds `.dock-stage` and `.dock-persistent` seats with `clippedEdges: []`.

**THE RESIDUAL, STATED BECAUSE IT IS NOT CURED AND IS NOT MEANT TO BE.** Classifying the
20 stored rows by axis:

```
cross-axis clip only      12   → fully cured by this act
scroll-axis clip only      3   → UNCHANGED (right:57, right:105 are seats scrolled out of view)
both axes                  5   → cross edges cured, scroll edges unchanged
```

A scroller clips its scroll axis by definition: the leading seat at `scrollLeft: 0` is
flush with the port edge and its outward 4px has nowhere to go. That is a different fact
from R2, which names only the **hidden** axis — *"vertical `overflow-x:hidden` cuts
left+right, horizontal `overflow-y:hidden` cuts top+bottom"* — and curing it would mean
padding the SCROLL axis, which moves the snapport against `scroll-padding: P/2` and puts
the W3 modular correction at risk for a 4px edge. Not attempted; recorded; the re-capture
(π-RERUN-R2) reports the real post-cure count against the full 63, which the stored
20-row sample cannot.

### §2.3 · R3 — the triple ring on `.dock-dropdown-trigger.menu__trigger` (#47 W8)

**THE DEFECT.** `DropdownMenuTrigger.vue:72` puts `menu__trigger` on the same element
`DockTrigger.vue` gives `dock-dropdown-trigger`, and `overlay-plate.css:120` paired
`box-shadow: var(--focus-ring-shadow); outline: none;` there — the dock's `outline` ring
plus this shadow's two stops = **three concentric rings at one `:focus-visible`**, with a
resting `box-shadow` of `none`, so all three were focus paint and none was elevation
(`pi-MATERIAL-dropdown-doublering-1440-light.json`).

**CURED AS THE OTHER TWO W8 SITES WERE** — the ring moves to `outline`, the property
nothing else competes for, and the `outline: none` goes with the shadow it was pairing.
The cascade claims in the partial were verified on disk, not taken on faith:

| claim | verification |
|---|---|
| `overlay-plate.css` loads before the dock | `styles/glass.css:169` ← `styles/index.css:203`; dock at `:208` |
| the two selectors are equally specific | `.menu__trigger:focus-visible` and `.dock-dropdown-trigger:focus-visible` are both (0,2,0) → later wins → the DOCK ring takes the outline channel on a dock trigger |
| composing `.focus-ring` would be wrong | `utilities.css` is `:223`, LATER than the dock at `:208` at equal specificity — the utility would take the channel AWAY from the dock ring. The recipe is restated, and the reason is the cascade, not preference |
| the recipe matches its source of record | `utilities/base.css:144-153`, `--ink-perimeter` 0.48 (`tokens/color-radius.css:140`) |

`layer-group.css` and `a11y-overrides.css` carry the two consequent strikes: the W8
comment that called its site "the second of two" now says "the worse of the FIRST TWO",
and the forced-colors group's entry survives with its GROUND changed (an outline survives
WHC on its own, so the entry is a geometry normaliser now, not a restore).

**Only one site carries `menu__trigger`** (`grep -rn "menu__trigger" src/` → one Vue
binding, `DropdownMenuTrigger.vue:72`), so there is no fourth site hiding behind the
third.

### §2.4 · R4 — the combobox that was not a combobox (#42 W-SEARCH)

**THE DEFECT.** `aria-activedescendant` walked all five ArrowDown steps while
`aria-selected` and `role=option` counted **0 document-wide** and `[role=listbox]` had an
empty `id` with zero owned options (`pi-SEARCH-ROUTE-aria-wiring-1440-dark.json`).

**THE ROOT, verified on disk.** The route's template *read* correct — it authored
`role="option"` and `:aria-selected` on each `<Card>`. Both silently no-opped:
`Card.vue:50-62` binds `v-bind="$attrs"` **first** and then restates `:role` /
`:tabindex` / `:aria-selected` off its own `selected` prop, so the later explicit bindings
win and an unset `selected` **removes** what the consumer authored. This is the
glass-ui binding class that `vue-tsc` and units cannot see (a fallthrough attr clobbered
by an explicit binding type-checks perfectly), which is why the arm reads the rendered
DOM.

**THE CURE writes to the channel the component owns**: `:selected` replaces the three
authored attributes, the listbox gets a real `id` both ends read
(`RESULTS_LISTBOX_ID`), and the field gets the four attributes that make an
active-descendant field an actual combobox (`role`, `aria-autocomplete`,
`aria-controls`, `aria-expanded` off the same predicate the `v-if` reads, so announced
state cannot drift from rendered state). It also lights the library's own
`.card[role="option"][data-selected="true"]` paint (`card/styles.css:165`), which was
dead here for the same reason — before this cure the active row had **no visual state at
all**, the `:data-active` it carried being styled by nothing.

**THE ONE THING THIS SEAT ADDED, and why.** The cure has a measured consequence the
predecessor left unrecorded. Probed off the rendered route:

```
optionCount 12 · tabbable 12 · first option tabindex "0"
input: role=combobox · aria-autocomplete=list · aria-controls=search-results-listbox
       aria-expanded=true · aria-activedescendant=search-result-search-row-005
listbox: id=search-results-listbox · role=listbox · aria-label="Search results"
```

`selected` is Card's OPTION contract and that contract includes a tab stop **by design**
— *"`selected="false"` is an unselected OPTION, which owes a role and a tab stop"*
(`Card.vue:44-46`). So the route now has 12 focusable rows beside a field that walks them
with `aria-activedescendant`: two focus models on one widget.

**It is adopted rather than worked around, and the fact is PINNED rather than left to
drift.** The alternatives were measured, not assumed:

* The route **cannot** undo it — `$attrs` binds first, so a consumer `tabindex` loses to
  the component's own. That is the same clobber that caused R4.
* Wrapping each Card in a route-owned `role="option"` div would drop the tab stops and
  also drop the selected PAINT, since `.card[role="option"][data-selected="true"]` needs
  both on the card. That trades a verbose tab order for an active option with no
  non-ARIA indication — the worse of the two by some distance.
* Fixing `Card`'s blanket `tabindex: 0` (a listbox option owes `-1` under either the
  roving or the active-descendant pattern) is the real answer and is **outside this
  lane's fence**; it changes precedence for every Card consumer and belongs to a wave
  that owns the component.

So: adopt, and assert `tabindex === "0"` in the arm with the grounds written beside it,
so the day Card's contract is answered this line is the site that says so. Routed to the
Card owner, not swept.

---

## §3 · BORN-RED — re-proved at this seat, not inherited

`git archive`/`git show` extraction, per the house law. The pristine route was extracted
to a dotfile beside its original (same directory, so its `../../chassis/…` relative
imports resolve identically; dot-prefixed, so `demo/stories/manifest.ts:147`'s
`import.meta.glob("./*/*.vue")` does not pick it up), a scratch arm pointed at it, and
both deleted after the run.

```
$ git show HEAD:demo/stories/data/search.vue > demo/stories/data/.born-red-R4.vue
602 demo/stories/data/.born-red-R4.vue
$ npx vitest run tests/composables/search/born-red-R4.scratch.test.ts
REAL_EXIT=1
 Test Files  1 failed (1)
      Tests  3 failed (3)
```

Three failures, identical to the inherited log's three:
`expected 0 to be greater than 0` (no options) · `expected undefined to be truthy` (the
listbox has no id) · `expected null to be 'option'` (the active descendant is not an
option). Log: `born-red-R4-scratch.log`. Scratch files deleted; porcelain returned to 18
before the next byte.

**And GREEN against the cured route:**

```
$ npx vitest run tests/composables/search/search-contracts.test.ts
REAL_EXIT=0
 Test Files  1 passed (1)
      Tests  7 passed (7)
```

Log: `green-R4.log`. `search.vue` is byte-identical between `ebb58a0f` (the census
commit) and `eb2e9428` (HEAD), so the RED is against exactly the subject the census
measured.

**R1–R3 carry no born-RED arm and that is deliberate.** All three are paint routes whose
falsifier is a rendered clip rectangle, a painted gap and a count of concentric rings —
none of which jsdom has. Minting a unit arm that asserts the CSS text would be a gate
that passes on the source rather than the paint, which is the contrived class the
abrogation mandate names. Their proof is the re-capture, enqueued in `PI-QUEUE.md`.

---

## §4 · VERIFY — real exit codes, never a piped tail's

```
$ npx vue-tsc --noEmit ; $ npx vue-tsc --noEmit -p tsconfig.test.json
VUE_TSC_SRC_REAL_EXIT=0 VUE_TSC_TEST_REAL_EXIT=0
```

```
$ npx vitest run
BATTERY_REAL_EXIT=1
 Test Files  1 failed | 224 passed (225)
      Tests  1 failed | 2137 passed | 10 expected fail (2148)
```

**ZERO α-OWNED FAILURES.** The single RED, attributed:

| RED | owner | grounds |
|---|---|---|
| `tests/public-surface.spec.ts > Row 8 built-artifact acceptance > ships exactly the style closure plus the three generated members` — expects `components/dock/styles/run.css`, `dist/` ships `components/dock/styles/overflow.css` | **the close build**, not this unit | `dist/` is dated **2026-08-10 14:07**, eighteen days stale — it predates #47 W3, which deleted `overflow.css` and authored `run.css`. This unit wrote four CSS files, one demo SFC and one test; it neither adds nor removes a shipped file. The stale-dist class the dispatch names, measured |

**The standing figure MOVED with the batch and this is the line it moved to.** The
dispatch's last quiesced read was `2015 passed | 7 xf`; between it and this seat
`739bf63d` (γ unit 6) and `eb2e9428` (the π recovery seats) landed, and lane δ unit 5 is
mid-flight on the tree with six modifications and one new test file inside the run. This
unit's own +129 test lines are the R4 arm. The dispatch expected **two** stale-dist REDs;
**one** is on disk at this seat.

```
$ node scripts/gate-register.mjs
GATE_REGISTER_REAL_EXIT=0
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**RECEIPT UNMOVED — `seats:60 … violations:0`, nothing minted.** `--dock-ring-reserve`
is a dock-register custom property, not a gate seat and not a house token; the R4 arm
extends an existing test file rather than adding a gate.

**G-BUNDLE-RATCHET, stated and not papered.**

```
$ npm run verify:package
VERIFY_PACKAGE_REAL_EXIT=1
Error: Invalid package artifact:
components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil requires direct dependency ownership of @mkbabb/pencil-boil
```

The dispatch says the ratchet arm REDs lawfully by route — the batch-close rebind carries
β0's +1215 against the driver's −71. **The measured truth is narrower and is recorded as
measured: the run never REACHES the ratchet arm.** It throws earlier, on the same
eighteen-day-old `dist/` as the Row-8 RED — a `.d.ts` emitted before handmark's
dependency landed. Both cure at the same close build, and neither is evidence about the
ratchet one way or the other.

---

## §5 · WHAT THIS UNIT DID NOT DO

* **No browser.** Zero captures, zero `getContext()`, zero dev server. Every paint-changing
  cure ENQUEUES its cell in `PI-QUEUE.md` for the singleton seat; nothing here claims a
  pixel.
* **No commit, no stage, no stash, no checkout.** Shared tree; the driver commits.
* **No foreign byte.** Lane δ's seven paths were not read for adoption and not touched.
* **No scroll-axis ring reservation** (§2.2) and **no `Card` tabindex change** (§2.4) —
  both refused with grounds and routed, rather than reached for.
* **Nothing minted.** No gate seat, no house token, no addendum file.

---

## §6 · FENCE

Written: `src/components/dock/styles/{index,run,shell-regions,layer-group}.css` ·
`src/styles/glass/overlay-plate.css` · `src/styles/utilities/a11y-overrides.css` ·
`demo/stories/data/search.vue` · `tests/composables/search/search-contracts.test.ts` ·
`docs/tranches/BK/execution/2026-08-10-lanealpha-unit5/RECORD.md` (the dated R3 strike,
adopted from the predecessor) · this unit's three records and three logs.

Of those, the first eight plus the unit-5 strike were the predecessor's partials, adopted
per §1; this seat's own new bytes are the R4 residual pin in the test arm and the records.
`package.json`, `subpath-policy.mjs`, `public-surface.spec.ts`, `Card.vue`,
`DropdownMenuTrigger.vue` and every sibling repo: untouched.
