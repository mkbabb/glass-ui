# LANE α — UNIT 7 (α5 · #76 REMAINING PAYLOAD) · RECORD

**THE TERMINAL α UNIT.** The lane closes here.

---

## §0 · SEAT, MODEL, BASELINE

**Model asserted first, and the assertion GATED the chain with `&&`** (the ⊕⁷⁵ law,
sharpened after the fourth claimed-but-absent occurrence — a newline is a sequencer,
never a conditional):

```
MODEL_ID_ASSERT: claude-opus-5[1m]
gate: opus-5 confirmed
```

**Step-0 baseline, banked BEFORE any byte:**

```
$ git diff -U0 > /tmp/bk-lanealpha-baseline-1787671831.diff
BASELINE_BYTES=0
$ git status --porcelain | wc -l
0
$ git status --porcelain | grep '^??'
(none)
```

**THE TREE WAS CLEAN AT OPEN — and that CONTRADICTS the dispatch, so it is stated
rather than quietly enjoyed.** The dispatch describes two live dirt sets: the
formerly-fenced `material.css` + `material-css-syntax.test.ts` pair, and Lane β's
unit-β0 dirt (`MIGRATION.md` + `darkModeSyncScript.ts` + its test + the
`lanebeta-unit1` records) *"awaiting its cure+commit"*. Neither is on disk as dirt.
Both LANDED: `2cfc1124` (material) and `c4dbf53b` (`feat(dark): darkModeSyncScript
gains defaultDark · queryOverride · normalize (BK β0)`). HEAD at open is `76b594c8`,
six commits past the dispatch's `2cfc1124` floor.

**Nothing turns on this** — a clean tree is strictly easier to fence than a dirty one
— but a seat that is told to expect foreign dirt and finds none should say so, because
the alternative is a later reader assuming this seat swept something.

---

## §1 · THE CHARTER, ITEM BY ITEM — MEASURED, NOT REMEMBERED

The charter's seven items, each re-derived on disk this seat (S-10: the universe is
generated, never remembered). Unit 4 banked a read-only half of this census on
2026-08-24; **every row below was re-measured rather than carried**, and two rows moved.

### 1.1 `clampLabel` — DISCHARGED BY FOLD. Zero bytes owed.

```
$ grep -rn "clampLabel" src demo tests
src/components/dock/DockTrigger.vue:27: * greenfield trigger clamps its own label (the retired `clampLabel` prop's
```

**One hit, and it is prose recording the retirement.** Zero prop declarations, zero
bindings. The chronic register's terminal disposition is
`CHRONIC-DISPOSITIONS.md:82` — *`ax:dock-select-clamp-label` → **FOLD →
BI.W-DOCK-CONTROLS**, "the control-family greenfield establishes label policy natively
(UF-C1)"*, with the liveness probe *"dock greenfield establishes label policy
natively."*

**The probe passes on its own terms.** `DockTrigger.vue:25-28` states label policy as
native and names the disposition *decided-terminal*. The item that rode **five
bookings against a 42-line file** is closed by the file ceasing to need the prop.

**One honest wrinkle, stated because the row's whole disease is silent
overstatement.** The native clamp is not a `line-clamp` on the trigger. `run.css:323-331`
records the opposite decision explicitly: the obvious authoring (`overflow: hidden;
text-overflow: ellipsis` on `.dock-run > *`) *"buys the ellipsis by breaking a contract
the seat already asserted"*, so seats stay unclipped and **the ellipsis is the
consumer's, on the consumer's own label element**. That is a real policy and a defensible
one, but a consumer who read "the greenfield trigger clamps its own label" and expected
a truncating trigger will find a growing one. Named here; no byte changed, because
changing it is a dock-paint decision and not a census.

### 1.2 dock first-tap — DISCHARGED BY BUILD. The item unowned since 06-04 has an owner.

The order-bound row: unit 4 could not bank it because the surface lived inside the #47
rewrite. The rewrite landed (`ac471032` W1, `964535cb` W2-W9), so it is measurable now.

```
$ find src -iname "*ClickIntegrity*" -o -iname "*TouchGate*"
src/composables/dom/useTouchGate.ts
src/components/dock/composables/useDockClickIntegrity.ts
```

`useDockClickIntegrity.ts` is 256 lines and is the architectural fix, not a guard
patch. It resolves **both** reported manifestations to one root cause — *"a click whose
target's IDENTITY changed under the pointer between pointerdown and click"* — and scopes
the pass-through to **the tapped element's identity**, never to post-swap coordinates.

Wired live, not merely present:

```
GlassDock.vue:38   import { useDockClickIntegrity } from "./composables/useDockClickIntegrity";
GlassDock.vue:289  } = useDockClickIntegrity({
GlassDock.vue:301  if (isExpanded) markExpandFlip();
GlassDock.vue:351  @pointerdown.capture="onPointerDownCapture"
GlassDock.vue:353  @click.capture="onClickCapture"
```

**The consumer-facing half is the reason this is a #76 row at all, and the composable
says it in its own comment (`:34-39`)**: the consumer's interim arms — the
`@touchend.prevent` plus the 320ms capture-phase guard keyed off the exposed `expanded`
ref — are **UNNECESSARY**; the guard lives inside `GlassDock`. The `expanded` ref
**stays exposed** (a protected binary-consumer surface); the consumer simply stops
needing a guard keyed off it.

Two properties worth a consumer's attention, both read off the source:

- **A dock that never morphs never arms the guard**, so an always-expanded dock's
  clicks are byte-identical to before (`:38-39`).
- **No witnessed press → never swallow** (`:214-221`). A click with no `pointerdown`
  this guard saw — AT activation, a keyboard-synthesised click, a touch stack emitting
  only `Touch` events — carries no race context and passes. Swallowing there would have
  broken AT activation and the iOS one-tap contract, and the iOS contract is handled
  first and explicitly (`:222-231`).

**No addendum minted for this.** The interim-retirement is already carried to slides
(the standing note that `useDockClickIntegrity` replaces the guards); minting a second
outbound doc for a consumer that already adopted it is the ad-hoc addendum the laws
forbid.

### 1.3 LabeledField association — DISCHARGED BY BUILD **and** by a live probe.

`CHRONIC-DISPOSITIONS.md:67` — *`ax:labeled-field-for-id` → **FOLD** … "a real
a11y-correctness concern, decide against a concrete failing site"*, liveness probe
**"axe `label` assert on LabeledField'd inputs."**

Landed at `a025d99f` (`feat(labeled-field): land BK #57 W-LABELED-FIELD — the select
leaves the library, the label reaches the field`). The mechanism on disk:

```
LabeledField.vue:2   import { computed, useId } from "vue";
LabeledField.vue:20  const id = useId();
LabeledField.vue:44  :for="controlLabelable ? controlId : undefined"
```

and the binders consume it — `LabeledInput.vue:38`, `LabeledSlider.vue:40`,
`LabeledSwitch.vue:40` all bind `:id="controlId"` off the slot.

**The probe is LIVE, which is the part that makes this a discharge and not a claim.**
`tests/components/labeled-field.contract.test.ts` is six tests, and `:37` is literally
the axe `label` invariant: `expect(label.attributes("for")).toBe(ids.control)`. `:194`
re-asserts it per-adapter.

**And the design is correct on the detail that usually goes wrong here**, which is
worth recording because "it has a `for`" is not the same as "it is right":
`LabeledSlider.vue:35` sets `:control-labelable="false"`. A reka slider root is not an
HTML *labelable* element, so a `<label for>` aimed at it would be an axe violation, and
the slider takes `aria-labelledby` instead (`:195` asserts exactly that split).
`LabeledSwitch` correctly does **not** opt out — its control is a `<button role="switch">`,
and `<button>` **is** labelable. Somebody thought about this.

### 1.4 `TooltipContent variant="mono"` — DISCHARGED BY RETIRE. The retirement already executed.

```
$ grep -rn "mono" src/components/tooltip/
(zero)
```

`CHRONIC-DISPOSITIONS.md:64` — *`ax:tooltip-mono-variant` → **RETIRE** — 0 consumers,
8-close; a CVA variant nobody binds*, probe *"re-stamp-count ceiling."* First booked at
AT, re-stamped across ~10 closes, never built.

**Zero hits is the retirement being complete, not the retirement being pending.**
There is nothing to strike: the variant was never written, so RETIRE costs no byte.
`TooltipContent.vue` at HEAD carries a placement/portal/dock-participation contract and
no `variant` axis at all.

**This row is DECIDED, and the decision is "no".** It is recorded here so the eleventh
re-stamp does not happen — the whole point of a terminal disposition is that the next
reader finds the answer instead of the question.

### 1.5 `/deck` seventh-carry — DECIDED. `./deck` ships.

The E44 charge is *"/deck at 7 carries"* with the binding clause **"must not advance to
an eighth on faith alone"** (`ARCHAEOLOGY.md:216`), and TR#76 routes the decision under
**#40's re-hearing**.

Both halves are satisfied on disk:

- **#40 is CLOSED.** `W-PAGER` COMPLETED 2026-08-08 at `85c322dd` (cursor `:5811`),
  build EXIT 0, battery 12 RED → 2, `gate-register violations:0`.
- **The adjudication is banked**: `DECK-RELOCATION.md`, run `wf_8ea3a20f-669`, **CLOSED
  7/7 seats, 0 errors** — the 51-row three-way split, the shared-substrate ruling (deck
  is the home, carousel a register over it), the atlas prior-art dispositions.
- **`./deck` is a live published subpath** — `package.json.exports["./deck"]` PRESENT,
  over `src/components/deck/` (`DeckStage.vue`, `DeckSlide.vue`, `composables/`,
  `slideContext.ts`, `window.ts`).

**So the eighth carry does not happen, and it does not happen on evidence rather than on
faith** — which is the exact thing the clause asks for. No byte owed.

**One residue, routed not swept:** `docs/consumer-evidence/use-deck.md:18` cites
`src/stage/useStageDeck.ts`. My path-existence census flagged it, and **the census was
wrong** — that is *atlas's* path inside an atlas sentence (*"atlas imports `useDeck`
from `@mkbabb/glass-ui/deck` in `src/stage/useStageDeck.ts`"*), correctly cited. It is
the one confirmed false positive in §4 and it is disclosed there.

### 1.6 BEAD census — **THE ONE ROW THAT MOVED. A BOOK's premise is falsified.**

`docs/consumer-evidence/canvas-anchored-overlay.md` carried **DISPOSITION: BOOK** on the
premise *"exactly ONE named binary consumer — the ≥2-consumer bar is UNMET."*

`docs/tranches/BJ/coordination/SCI-BEAD-INBOUND.md` §1 (sci-report, 2026-07-24) is a
census **correction**, filed by the consumer in BJ's own stated currency, and it names
binary #2 with six plates across three routes: `RankedStrip.vue`,
`BreakEvenScatter.vue`, `SciScatter.vue`, `ProviderRankedStrip.vue`,
`ServiceMixPlate.vue`, `BuilderClassPlate.vue`.

**The bar was met before the BOOK was written.** The doc's own flip condition — *"A
SECOND canvas-/SVG-point-anchored top-layer consumer flips it to BUILD"* — is not a
prediction any more, and has not been for as long as the register has existed.

Truthed in place at ACT 2 (§2). **The BUILD is ROUTED, not taken**: exposing
`:reference` on `<Popover>`/`<HoverCard>` is a popover-surface act and α's fence is
dock · IOS27-MICRO · search · docs-relay.

**The prior art is carried into the doc rather than left in the register**, because it
is the part that saves the builder a wave: the projection is
`chart.convertToPixel({gridIndex: 0}, [x, y])` plus viewport origin; it is valid **only
after the first `finished` paint** and returns garbage rather than throwing if called
early (six hand-rolled `chartReady` gates exist for this reason); and re-projecting
per-hover costs a frame and re-fires the warnings, so the landed idiom **caches and
re-anchors on a clock**, never on pointer movement.

**One stale cite corrected while there:** `src/components/ui/popover/` →
`src/components/popover/` (the BI flatten). Re-measured: `grep -rn
"virtual\|getBoundingClientRect" src/components/popover/` → **still zero**, so the
substance of the claim survived its own bad path. `src/components/hover-card/` **does
not exist at this HEAD** — the `<HoverCard>` half of the promised flip needs its home
re-derived before it is promised again, and that is now written down.

### 1.7 consumer-evidence truth-up — three of four named artefacts have docs; one does not.

TR#76 names four: **SplitChars · BorderProgress · SelectableChip · DockIconButton.**

| artefact | doc | measured at HEAD | class |
|---|---|---|---|
| SplitChars | `split-chars.md` | `grep` → **0**; all 3 cited paths ABSENT; **the `.char-stagger` CSS recipe is gone too** (`grep -rn "char-stagger" src/styles/` → 0) | DELETED, doc says "BUILT" |
| BorderProgress | `border-progress.md` | `grep` → **0**; `src/components/custom/border-progress/` ABSENT | DELETED, doc says "banked dormant, component STAYS" |
| SelectableChip | `selectable-chip.md` | subpath **ABSENT**; folded onto `<Chip mode="selectable">`, `chip/types.ts:28`; `SelectableChipProps` still exported `:27`/`:61` | **FOLDED**, doc says `keep-current` |
| DockIconButton | **none** | retired onto `DockControl`'s `shape` axis (`dock/index.ts:25`, `DockControl.vue:156`) | no doc to truth |

**The four are not one class, and flattening them would have been the easy lie.**
Three are absent; **SelectableChip's mechanism is entirely alive** and only its face and
door changed, so its brackets carry a migration rather than an obituary. **DockIconButton
has no consumer-evidence doc at all** — `ls docs/consumer-evidence/` is 25 files and none
is its. It is discharged by measurement here and owes no file: `DockControl.vue:156`
records that attribute fall-through and VTU `.attributes()` *"behave exactly as the
retired DockIconButton did"*, which is the substantive promise a relay would have made.

---

## §2 · ACT LEDGER — 6 files written, all in fence

| # | act | file | class |
|---|---|---|---|
| 1 | forcing-rule truth-up | `docs/consumer-evidence/README.md` | dated bracket |
| 2 | BEAD census — BOOK → BUILD-OWED | `docs/consumer-evidence/canvas-anchored-overlay.md` | dated bracket + strike |
| 3 | deleted-artefact truth-up | `docs/consumer-evidence/split-chars.md` | dated bracket |
| 4 | deleted-artefact truth-up | `docs/consumer-evidence/border-progress.md` | dated bracket |
| 5 | folded-artefact truth-up + migration | `docs/consumer-evidence/selectable-chip.md` | dated bracket + strike |
| 6 | **THE LEDGER WRITE** | `docs/tranches/BJ/coordination/glass-outbound-2026-08-09-value.js-8.0.0-addendum.md` | §2 verbatim |

Plus this unit's own three records. **Zero source bytes. Zero test bytes. Zero
`package.json` bytes.**

### ACT 1 — the root cause, and it is not a typo class

`docs/consumer-evidence/README.md` declares a forcing rule: *"every doc is gate-read OR
deleted (BH.B4d) … Every file here is **LIVE** or it is **deleted** — no third state,"*
enforced by `proof:consumer-evidence-live`.

**All seven gates the README names are ABSENT, and so is the entire namespace:**

```
$ node -e '…check the seven names against package.json.scripts…'
ABSENT  proof:consumer-evidence-live
ABSENT  proof:spa-view
ABSENT  proof:haptic
ABSENT  proof:virtual-window
ABSENT  proof:component-orphan
ABSENT  proof:consumers:static
ABSENT  proof:consumers:build
--- all proof:* scripts on disk ---
(none)

$ ls scripts/ | grep -i "consumer\|evidence\|orphan"
(none matching)
$ grep -rn "consumer-evidence" scripts/ tests/
(zero readers)
```

The `proof:*` namespace was collapsed at **#65 W-GATE-COLLAPSE** under the
user-mandated gates abrogation. That collapse was correct. **What was missed is that
this README was one of the collapse's dependents**, and it has been asserting a
falsifier that has not existed since.

**This is the mechanism behind every other row in §4.** A corpus whose stated law is
"LIVE or deleted, no third state" drifted into the third state precisely because the
thing that would have caught it was unplugged. The four artefacts TR#76 names are not
four unlucky pages; they are the four somebody happened to notice.

**Re-grounding the gate is ROUTED, not taken.** Minting a gate would move `seats:60`,
and the house law is *mint nothing*.

### ACTS 3-5 — why every one is a bracket and none is a strike

The three artefact docs are marked FALSE and **kept whole**. No page is deleted and no
disposition is rewritten, for one reason stated once and applied three times: **a
disposition belongs to the wave that executed it.** This seat can measure that
`SplitChars` is absent; it cannot rule *why*, and inventing a tidy verdict to clean the
page would mint exactly the unsourced ruling the row exists to stop. Unit 5's
`--dock-morph-max-stretch` precedent is the same lesson from the other side:
**struck-by-adjacency is how scope leaks.**

---

## §3 · THE LEDGER WRITE — ONE write, verbatim, gated

The charter: *#42's relay addendum is ALREADY AUTHORED at unit-6 `PASTE-BLOCKS.md` §2 …
land the addendum text there in the SAME single write … copy the §2 text verbatim, never
paraphrase it.*

**Target, and the reasoning, because "the ledger" is singular and the batch is nine
docs.** ⊕⁷⁵ locates the ledger as the nine outbound 8.0.0 addenda at `fbae3b8a`, under
TR#76 → TR§C's law **"three sources, ONE batch per repo."** The §2 addendum is titled
*"`SearchBar` DELETE-with-relay — **value.js**"* and every one of its four edges is a
value.js file. The per-repo ledger is therefore
`glass-outbound-2026-08-09-value.js-8.0.0-addendum.md`, appended as **§5, a new dated
section**, leaving the 2026-08-09 batch text untouched above it.

**And it really is a single write**, which needed checking rather than asserting: this
unit's own acts generate **zero** outbound consumer addenda. The BEAD row produces a
routed library BUILD, not a consumer migration; the first-tap row's consumer note is
already carried; the truth-ups are glass-ui's own docs. So one file, one write.

**Verbatim proven by an assertion that GATED the chain with `&&`:**

```
$ sed -n '53,115p' …/lanealpha-unit6/PASTE-BLOCKS.md > /tmp/bk-a5-sec2.txt
lines=63  bytes=3930
sha256 73970689c0e1d8ccd5441641e5006b03c97adf38a3dad5b0a204482ce90a4c3a

$ … >> "$LEDGER" && python3 -c "assert want in got, 'VERBATIM CHECK FAILED'" && echo GATE PASSED
VERBATIM OK: section-2 bytes present byte-identical
sha256(section2)= 73970689c0e1d8ccd5441641e5006b03c97adf38a3dad5b0a204482ce90a4c3a
GATE PASSED
```

The assertion is a **substring check on the landed file's own bytes**, not on the
buffer that was written — so it would catch a truncated or re-encoded append, which is
the failure the four claimed-but-absent occurrences all shared.

**NOT claimed by this seat:** the §2 addendum opens *"THE WALK — re-verified on disk at
the cut."* That walk is **α4's**, dated at α4's cut. This seat re-walked no value.js
file and opened no sibling tree. Zero sibling writes.

---

## §4 · THE GENERATED CENSUS — the truth-up's real extent, banked whole

Per S-10 the universe is generated. The detector, stated verbatim so it can be re-run
and disagreed with:

> for every `docs/consumer-evidence/*.md`: extract each backticked path matching
> `` `(src|scripts|demo|tests)/[A-Za-z0-9_\-./]+` ``, take the pre-`:` stem, and test
> `os.path.exists`.

**23 of 25 docs carry 52 unique dead path cites** [2026-08-25 · adjudication cure —
the banked 22/49/1 was a hybrid no consistent detector policy reproduces; count-all
gives 23/52/4, exclude-foreign gives 21/48/0]. Clean: `diff-rows.md`,
`use-virtual-section-window.md` (`useStagger.md` is FP-only — its `:13-14` cites are
speedtest's paths, counted under the 4 foreign-repo FPs below).

Classified by whether a successor exists on disk:

**CLASS A — RESTRUCTURE DRIFT (10). The artefact lives; the cite predates the BI
`custom/` flatten.**

```
canvas-anchored-overlay.md   src/components/ui/popover      -> src/components/popover      [FIXED, ACT 2]
labeled-field-action-slot.md src/components/custom/labeled-field/LabeledField.vue -> src/components/labeled-field/…
use-glass-backdrop-luminance src/components/custom/dock/GlassDock.vue -> src/components/dock/GlassDock.vue
goo-blob-seams.md            src/components/custom/blob     -> src/components/blob
use-pointer-velocity-field   src/components/custom/aurora   -> src/components/aurora
use-pointer-velocity-field   src/components/custom/constellation -> src/components/constellation
use-pointer-velocity-field   src/components/custom/fourier-field -> src/components/fourier-field
header-ribbon.md             src/components/_shared/disclosure-context.ts -> …/_shared/disclosure/…
color-swatch.md              src/components/custom/color-swatch/ColorSwatch.vue -> demo/stories/… [WEAK]
handmark.md                  src/components/handmark/README.md -> src/composables/motion/README.md [WEAK]
```

**Two of those ten are WEAK matches and are labelled as such** — the "successor" is a
best-match by basename, not a verified relocation. Reporting them as clean re-points
would be the overstatement this row exists to cure.

**CLASS B — NO SUCCESSOR ON DISK (38, after one correction).** Named in full:

```
README.md                   scripts/proof-consumer-evidence-live.mjs        [ACT 1]
border-progress.md          src/components/custom/border-progress            [ACT 4]
selectable-chip.md          src/components/custom/selectable-chip            [ACT 5]
split-chars.md              src/components/custom/split-chars                [ACT 3]
split-chars.md              src/composables/motion/useCharStagger.ts         [ACT 3]
split-chars.md              demo/stories/motion/split-chars.vue              [ACT 3]
color-swatch.md             src/components/custom/color-swatch
color-swatch.md             demo/stories/substrates/aurora/config/PaletteLayer.vue
completion-seal.md          src/components/custom/completion-seal
consumer-tier-class-lint.md scripts/proof-tier-class-staleness.mjs
curl-fbm.md                 src/components/liquid-grid/shaders/liquid-grid.glsl.ts
curl-fbm.md                 src/components/liquid-grid/shaders/liquid-grid.wgsl.ts
glass-panel.md              scripts/proof-glass-panel-tiers.mjs
glass-panel.md              scripts/proof-glass-prune.mjs
glass-panel.md              src/components/custom/glass-panel
glass-panel.md              src/components/custom/glass-panel/GlassPanel.vue
glass-panel.md              src/composables/glass/useGlassRenderer.ts
glass-panel.md              src/subpaths/glass-panel.ts
goo-blob-seams.md           scripts/gates.manifest.mjs
goo-blob-seams.md           src/subpaths/blob-config.ts
handmark.md                 src/subpaths/handmark.ts
handmark.md                 src/subpaths/underline.ts
header-ribbon.md            src/components/header-ribbon
header-ribbon.md            demo/stories/navigation/header-ribbon.vue
metal-glow.md               scripts/proof-metal-shimmer.mjs
metal-glow.md               src/styles/completion-seal.css
metrics.md                  src/components/custom/instrument-chassis
metrics.md                  src/components/custom/metric-badge
metrics.md                  src/components/custom/metric-cell
metrics.md                  src/components/custom/metric-stack
metrics.md                  src/components/custom/pulse
metrics.md                  src/components/ui/metric-pill
spa-view.md                 src/components/custom/spa-view/SpaView.vue
spa-view.md                 demo/stories/containers/spa-view.vue
use-lead-trail.md           src/components/custom/pager-dots/composables/usePagerWorm.ts
use-pointer-velocity-field  src/components/custom
use-pointer-velocity-field  src/components/custom/liquid-grid
use-scroll-trigger.md       demo/stories/motion/scroll-system.vue
```

**FOUR FOREIGN-REPO FALSE-POSITIVE CITES, disclosed rather than buried** [2026-08-25 ·
adjudication cure — the banked ONE missed three of its own class]:

```
use-deck.md:18       src/stage/useStageDeck.ts                              (atlas)
useStagger.md:13     src/features/speedtest/ui/ResultStack.vue              (speedtest)
useStagger.md:14     src/features/speedtest/composables/useResultReveal.ts  (speedtest)
header-ribbon.md:22  demo/components/instrument/shell/EditorShell.vue       (keyframes)
                 — all foreign repos' paths in sentences about those repos, correctly
                   cited. The detector cannot see repo boundaries. Not defects.
```

**Two sibling-owned files inside the census are NOT touched by this seat.**
`handmark.md` was written by **Lane γ** at `5a69ed9f` (γ4, today) and
`metrics.md`/`glass-panel.md` belong to their deleting waves. Unit 6's ruling stands
verbatim: *editing a sibling lane's proof is not a courtesy.*

**Routed, whole**: the 18 untouched docs, the 10 Class-A re-points, and the
re-grounding of the forcing gate. **Not deferred for convenience** — deferred because
each needs a disposition this seat has no standing to mint, and because the alternative
is 18 confident guesses.

---

## §5 · VERIFY — verbatim, REAL exit codes off the process, never a piped tail's

```
$ npx vue-tsc --noEmit > /tmp/bk-a5-tsc.txt 2>&1; echo $?
0                                        (output file: 0 bytes — zero diagnostics)

$ npx vitest run > /tmp/bk-a5-battery.txt 2>&1; echo $?
1
 Test Files  2 failed | 222 passed (224)
      Tests  2 failed | 2108 passed | 10 expected fail (2120)
 FAIL tests/public-surface.spec.ts > Row 8 built-artifact acceptance >
      ships exactly the style closure plus the three generated members   [α-caused, driver]
 FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm >
      the dist-demo it measures is NEWER than every source it is built from  [α-caused, driver]
 α5-OWNED FAILURES: ZERO

$ node scripts/gate-register.mjs; echo $?
0
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2
unbound:45 drift:0 rosterSha256:282d05cf violations:0
  → BYTE-IDENTICAL to unit 6's receipt. Nothing minted.

$ node scripts/regen-exports.mjs; echo $?
0
[component]  disk=56  PUBLISH=48 INTERNAL=8 CURATED=0  unclassified=0 stale=0
[composable] disk=10  PUBLISH=3  INTERNAL=3 CURATED=4  unclassified=0 stale=0
FAIL-CLOSED CHECK: PASS — every dir classified
SYMBOL-FIDELITY EXISTENCE: 63 sources checked, 0 failed
REGEN: exportKeys 68/68  jsSubpaths=62  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0
  >>> EXACT REPRODUCTION: YES

$ node scripts/import-dag.mjs; echo $?
0

G-BUNDLE-RATCHET   RED BY ROUTE — the single batch-close rebind carries β0's +1215 and
                   the driver's −71. verify:package's ratchet arm REDs LAWFULLY.
                   STATED, NOT PAPERED; NOT re-measured this seat, per dispatch.
```

**THE BATTERY LINE IS IDENTICAL TO THE DISPATCH BASELINE — `2f | 2108p | 10xf (2120)`
— and that is the correct result, not a suspicious one.** This unit wrote zero source
and zero test bytes, so it moves the standing figure by **+0**. Both REDs are the two
**pre-named α-caused stale-gitignored-dist** artifacts (`public-surface` style-closure
`run.css`/`overflow.css`, and `boot-graph` dist-demo mtime). They discharge at the
batch close via the driver's rebuild. **A mid-batch rebuild is FORBIDDEN and none was
run.** Zero foreign REDs to attribute to another owner.

---

## §6 · FENCE COMPLIANCE

**Written (9 files, all in fence):**

```
docs/consumer-evidence/README.md
docs/consumer-evidence/canvas-anchored-overlay.md
docs/consumer-evidence/split-chars.md
docs/consumer-evidence/border-progress.md
docs/consumer-evidence/selectable-chip.md
docs/tranches/BJ/coordination/glass-outbound-2026-08-09-value.js-8.0.0-addendum.md
docs/tranches/BK/execution/2026-08-10-lanealpha-unit7/RECORD.md
docs/tranches/BK/execution/2026-08-10-lanealpha-unit7/PASTE-BLOCKS.md
docs/tranches/BK/execution/2026-08-10-lanealpha-unit7/PI-QUEUE.md
```

All are **docs relay/canon files**, which is α's fence third clause, and all sit on
#76's own named payload surface.

**Not touched, as fenced:** every `src/**` and `tests/**` file · `package.json` ·
`subpath-policy.mjs` · `public-surface.spec.ts` (α4's seam, closed) ·
`EXECUTION-PROGRESS.md` (the driver's) · `docs/consumer-evidence/handmark.md` (γ4's,
`5a69ed9f`) · the other 17 stale evidence docs (§4, routed) ·
`docs/tranches/BJ/coordination/` — the eight non-value.js outbound addenda.

**Zero sibling writes.** No foreign tree was opened, read, built, installed into or
cleaned. No browser was opened. Zero `git add` / `commit` / `stash` / `checkout`.
No index acts. No transient files inside the repo (scratch lives in `/tmp`).

---

## §7 · π — ZERO CELLS ADDED, AND THAT IS NOT A DODGE

This unit changed **no paint**. Six docs and one ledger; zero source bytes; the
computed styles, the DOM and the bundle are byte-identical to `76b594c8`.

**A π cell exists to catch what a unit test cannot see about a rendered surface.**
There is no rendered surface here to see. Enqueuing a cell anyway would be minting
work to look thorough — the inverse of the cardinal-lesson inflation.

**One cell becomes owed the moment the routed BEAD BUILD lands** — a virtual-anchored
`<Popover>` over a `<canvas>` is exactly the "does it actually track the datum through
resize and settle" question no unit test answers. It is **named for the builder, not
enqueued here**, because enqueuing a cell for unwritten code is the same mint from the
other direction.

The α queue carries forward unchanged: unit 5's ten cells (π-RUN · π-CUT · π-REACH ·
π-MATERIAL · π-PROPORTION · π-MORPH · π-HOVER-HANDOFF · π-DEFAULT-POSTURE · π-SEAT ·
π-TAP) and unit 6's **π-SEARCH-ROUTE**. **Eleven cells owed, zero claimed, by any α
seat.** Detail in `PI-QUEUE.md`.

---

## §8 · THE LANE-TAIL CENSUS — α CLOSES HERE

The driver's batch close inherits a **finite list**, not a re-derivation.

### 8.1 Every α unit landed, with its SHA (derived, not remembered)

Derived by `git log --format=%h -1 -- <unit dir>` per unit:

| unit | SHA | act | charter position |
|---|---|---|---|
| 1 | `ba9b3304` | #78 acceptance REFUSED on the DAG:89 regen throw; #67 W-2 kernel falsified on the four-gate mutation (176→0 rest-crossing at ζ0.88); OWED-3 widened | α0 + α1 open |
| 2 | `612717e5` | #67 W-2 OWED-3 DISCHARGED — C2 corpus re-derived on the LANDED dock pair, measured corpus-TRUER than CHARTER R-1's | α1 close |
| 3 | `558c3fa3` | #47 W1 — four dead-by-construction dock surfaces struck (`@container` consumers with no producer; drag rules with no emitter) | α3 open |
| 4 | `ac471032` | #47 W1 atomic act whole — the collapse-prop default Vue's boolean casting was eating | α3 |
| 5 | `964535cb` | #47 **W2-W9** — four dock seats born-RED→green, arbitrary-shape register struck, zero live `box-shadow:none` in the band | α3 close |
| 6 | `76b594c8` | #42 W-SEARCH — chrome deleted with relay, engine interned to `src/composables/search/`, `./search` CUT at its own commit | α4 |
| **7** | **this unit** | **#76 remaining payload — 7 charter items dispositioned, 5 evidence docs truthed, the #42 relay landed verbatim** | **α5 — TERMINAL** |

**α2 has no unit of its own by design** — its rows were absorbed into units 1-2 (the
#67 near-totality band) and fence-refused where they reached foreign surfaces, each
recorded in those units' §3.

### 8.2 Every α-owed route and refusal, carried forward whole

**REFUSALS (grounds banked at the cited unit; none is a deferral of convenience):**

| # | item | unit | ground |
|---|---|---|---|
| R1 | #78 filing act | 1 §2.3 | UNEXECUTABLE at HEAD — the DAG:89 regen throw |
| R2 | #67 W-2 kernel commit | 1 §4.5 | falsified on the four-gate mutation; port unblocked on physics, REFUSED-ON-FENCE at 2 §3 |
| R3 | #67 W-3/W-4/W-5/W-6 src landings | 2 §3 | FENCE — evidence bases re-verified GREEN, the landings sit outside α |
| R4 | #47 W2-W9 at unit 3 | 3 §6 | fence at that seat; **DISCHARGED** — landed at unit 5 `964535cb` |
| R5 | #22 cure-cut | 4 §6 | out-of-fence + IN-FLIGHT elsewhere; **the dispatch ADDED it to α's tail** and it is re-refused here on the same unchanged grounds — see R5′ below |
| R6 | the four plan refusals | driver | footage · device-matrix · Safari-GUI · physical classes — ratified as scoped, untouched |

**R5′ — #22, re-stated at the lane tail because the dispatch added it and honesty
costs less than a silent drop.** The dispatch's scope line for THIS unit is explicit
and exclusive: *"YOUR SCOPE THIS RUN — THIS COMMIT-UNIT ONLY: (α5) #76 REMAINING
PAYLOAD"*, closing *"Other lane acts belong to other runs; do NOT start them."* #22 is
not in the α5 charter's seven items. Unit 4's grounds (`EXECUTION-PROGRESS.md:1663,1781`
— *#22 is IN-FLIGHT at its cure*) were not re-measured this seat and are **carried, not
re-asserted**. It returns to the driver as the one α-tail item this lane never
executed.

**ROUTES (open, each with a named owner-class):**

| # | routed item | owner-class |
|---|---|---|
| T1 | `:reference` virtual-anchor on `<Popover>`/`<HoverCard>` — BEAD BUILD-OWED, bar measured MET | popover surface |
| T2 | `<HoverCard>` has no home at HEAD — re-derive before re-promising the flip | popover surface |
| T3 | re-ground the consumer-evidence forcing gate (all 7 named gates absent; `proof:*` = none) | gates, post-#65 |
| T4 | 18 untouched stale evidence docs + 10 Class-A re-points (§4) | the deleting waves |
| T5 | unit 6 §3 — 5 false `controlSizeClass` comment sites | `src/styles/**` + `demo/demo.css` |
| T6 | unit 6 §4 — `public-surface.spec.ts:509-527` missing the `canvas` retired-subpath row (β2's `96f0f257` cut it and never proved it) | Lane β |
| T7 | unit 6 §3 — `sizing.css:70-73`, four `--search-*` tokens measured dead, deliberately NOT struck by adjacency | tokens |
| T8 | the 11 π cells (§7) | singleton browser seat |
| T9 | #22 cure-cut (R5′) | driver |

### 8.3 What α leaves GREEN

`vue-tsc` **0** · receipt `seats:60 … violations:0` **byte-identical across units 4-7**,
`rosterSha256:282d05cf` unmoved, **nothing minted at any α seat** · `regen-exports`
**EXACT 68/68** · `import-dag` **0** · battery **zero α-owned failures** at every unit
close, the two standing REDs pre-named and driver-owned.

---

## §9 · WHAT THE DRIVER SHOULD KNOW IN ONE PARAGRAPH

The α5 tail is docs-only and lands whole: **seven charter items dispositioned on
measured disk state — four DISCHARGED (clampLabel by fold, dock first-tap by build,
LabeledField by build plus a live `label[for]` probe, TooltipContent mono by a
retirement that was already complete), one DECIDED (`/deck` does not advance to an
eighth carry — #40 closed at `85c322dd`, the adjudication banked 7/7, the subpath
ships), and two that moved.** The BEAD census **falsifies a BOOK's premise**:
`canvas-anchored-overlay` claimed one binary consumer, sci-report is demonstrably the
second with six plates, and the doc's own promotion trigger fired before it was written
— truthed to **BUILD-OWED** with the prior art and its two named traps carried across,
the build itself ROUTED because Popover is outside α's fence. The consumer-evidence
truth-up found the four named artefacts are **not one class** (SelectableChip is a live
fold with a migration, not a corpse) and, underneath them, **the root cause**: the
forcing gate this corpus runs on has not existed since #65 collapsed the `proof:*`
namespace, all seven named gates absent, zero readers — which is why **23 of 25 docs
carry 52 dead cites** (10 restructure-drift, 38 successorless, 4 foreign-repo FP
cites disclosed) [2026-08-25 · adjudication cure]. Five docs are truthed; **18 are routed rather than swept**, because a
disposition belongs to the wave that executed it. The #42 relay addendum is landed in
the value.js ledger **byte-verbatim under an assertion that gated the chain with `&&`**
(sha256 `73970689…`), one file, one write, zero sibling bytes. **`vue-tsc` 0 · battery
`2f | 2108p | 10xf (2120)`, identical to the dispatch baseline because zero source bytes
moved, α5-owned failures ZERO · receipt `seats:60 … violations:0` byte-identical ·
regen EXACT 68/68 · G-BUNDLE-RATCHET RED BY ROUTE, stated not re-measured.** **The α
lane closes with §8's finite census: seven units with SHAs, six refusals, nine routes.**
