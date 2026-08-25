# LANE γ — UNIT 5 · #51 GF-HANDMARK W0–W5

**Seat:** IMPLEMENT, `claude-opus-5[1m]` (asserted at open; the assertion gated the chain).
**Tree at open:** `8a96868d`, shared, 64 porcelain entries. Baseline banked at
`/tmp/bk-lanegamma-baseline-1787666794.diff` (5,866 lines) before any byte.
**Fence:** `src/components/handmark/**` · `demo/stories/motion/handmark.vue` ·
`tests/components/custom/handmark/**` · `tests-visual/handmark.spec.ts` ·
`tests-visual/substrate-paints-color.spec.ts` (the clip-predicate ride) · the four
peer-retirement surfaces · this record dir. **α6 (dock) and δ3 (demo/chassis + stories)
ran concurrently throughout** — `demo/stories/manifest.ts` and every `demo/chassis/` file
are theirs and were not touched.

---

## 1 · THE CENSUS AT STEP 0 — the unit was NOT empty

The adjudication that ordered this unit (`wf_aa4d5bcc-5b9`) found γ4 **entirely
unexecuted** at `407de2d3`. **That is no longer the tree.** Between that adjudication and
this seat's open, an implement pass ran and **died mid-W2**, leaving deep partials. The
first act was therefore a census, not a build — the ordered work was largely *already on
disk* and the honest question was **adopt-or-supersede per file**, not author-from-zero.

| surface | state at open | disposition |
|---|---|---|
| `handmark/{README,brush,constants,freehand,geometry,ink,noise,texture,types}.ts` + `composables/useHandMark.ts` | DELETED (10 files, **1,857** lines — `git diff --numstat` over the ten paths: `files=10 added=0 deleted=1857`) | **ADOPT** — exactly the `GREENFIELD-TERMINAL:832` deletion list |
| 7 old test files under `tests/components/custom/handmark/` | DELETED | **ADOPT** — the 934→~150 cut |
| `stroke.ts` (278) | NEW, complete | **ADOPT** — five laws, ribbon, ring, band, `markDuration`, `strokeRibbon`, `SHAPES` |
| `HandMark.vue` (367) | REWRITTEN | **ADOPT WITH TWO CURES** — see §2 |
| `index.ts` (20) | REWRITTEN | **ADOPT** — the ratified pure-export list exactly |
| `g-hm-mark.test.ts` (300) · `g-hm-layer.test.ts` (240) | NEW | **ADOPT** — 47 cases, ordinary vitest, zero seats |
| `demo/stories/motion/handmark.vue` | REWRITTEN 9→5 sections | **ADOPT** — three rungs via `--type-body × {1, 1.618, 2.618}` |
| `tests-visual/handmark.spec.ts` | REWRITTEN | **ADOPT** |
| `tests-visual/substrate-paints-color.spec.ts` | clip-predicate widened | **ADOPT** — the in-fence F2 carry |
| `package.json` · `package-lock.json` · `verify-export-types.mjs` · `public-surface.spec.ts` | pencil-boil retired | **ADOPT + RECEIPT** — see §4 |
| `EasingCurve.vue` · `stacked-url-filter.test.ts` | stale HandMark citations corrected | **ADOPT** |

Adopting a partial is not waving it through: every file above was read in full and checked
against W0–W5 and the six orders. Two cures fell out, and they were not cosmetic.

### 1.1 · THE CEILING OVERAGE — declared, then RATIFIED (2026-08-25)

**The cut measures 675 lines against a declared ceiling of 500. That is +175, +35%, and it
is stated here rather than smuggled.** Detector verbatim:
`wc -l src/components/handmark/{HandMark.vue,stroke.ts,index.ts}` → **375 + 280 + 20 = 675**.

The charter clause it runs against, quoted from `GREENFIELD-TERMINAL:912`:

> Expected: `HandMark.vue` ~240 (calibrated against `WatercolorDot.vue` = 315 carrying
> strictly less) + `stroke.ts` ~185 + `index.ts` ~12 = **~435, declared ceiling 500** — vs
> the terminal's ~425 […] **Exceeding 500 is a signal to re-cut scope, not to widen the
> budget.**

**435 is an ESTIMATE, not a reading**, and this record previously let the estimate stand in
for a measurement — the exact remembered-literal class §6.1 condemns. The measurement is
675 and the overage is real.

**RATIFIED 2026-08-25 by the DRIVER under delegated owner authority: 675 stands against the
500 estimate-ceiling.** Grounds, as ruled: the cut is **landed, twice-challenged, and
gate-verified** at **3 files** against the old family's **2,306 across 12** (10 deleted +
the two rewritten), a 3.4× reduction on the measured figure; and **a re-cut to shave 175
lines is scope-churn against a proven surface** — the clause's "re-cut scope" remedy buys
nothing here that the 47-case gate battery has not already secured. **The ASK is therefore
ANSWERED, not open**; no owner decision is outstanding on this row.

---

## 2 · THE TWO DEFECTS THE PARTIALS STILL CARRIED

Both are cases of the fold having *already named the defect* while the implementation
shipped the thing it condemned.

### 2.1 · The 60 ms stagger — a minted clock, cured to the FRAME-RANK LAW

`GREENFIELD-TERMINAL:1013` rules on this in as many words: *"HANDMARK | stagger **60 ms** |
**DEFECT — a minted clock.** Unify on the FRAME-RANK LAW: 4 frames/line (66.7 ms)."*
`HandMark.vue` shipped `let clock = line * 60`.

Cured to `line * 4 * FRAME_MS`, reading the shared token at
`src/composables/motion/core/constants.ts:27`, whose own doc says *"Anything that means
'one frame' reads this."* The import is free: `constants.ts` has **zero imports**, so the
`/handmark` static closure gains a leaf and no edge to any peer (§4 measures it).

This is the difference between two numbers that happen to be close and **one law with two
ranks**. 60 ms is a number someone chose; `4 × FRAME_MS` is the display's own beat counted
four times, and it is the same grammar the timeline reads at ranks 0/+3/+6.

### 2.2 · `hm-settle` paired a spring curve with a literal — a RED gate, not a nit

```css
/* before */ animation: hm-settle 200ms var(--spring-present) both;
/* after  */ animation: hm-settle var(--spring-present-duration) var(--spring-present) both;
```

This **failed `G-SPRING-ONE-JOB`'s clock-fence arm** at step 0 —
`tests/styles/spring-authority.test.ts:291`, verbatim:

```
src/components/handmark/HandMark.vue  hm-settle 200ms var(--spring-present) both: expected [ Array(1) ] to deeply equal []
```

Worth stating plainly: **the fold "admitted" the 200 ms micro-duration**, and it was still
a gate failure. Admission was about the *magnitude*; the fence is about *ownership* — a
spring curve carries the duration it was solved for, or the first retune of the preset
silently desynchronises the pair. `--duration-fast` is exactly `0.2s` and would have been
the wrong fix for the same reason.

**The JS `220` literals were left.** The re-ink replay reads `--spring-press` for its
easing but keeps a literal clock. Reading `--spring-press-duration` through
`getComputedStyle` returns an unresolved `calc()` under jsdom, so it would need a
fallback — and a fallback that silently substitutes for a dead primary is precisely what
the no-masking-fallback edict forbids. The fence does not reach JS; the fold admitted the
value; it stands, named here rather than hidden.

**GATE-BLINDING, CURED IN THIS FILE — and the arm-side defect it exposed, ROUTED (2026-08-25).**
The cure comment written above the fixed declaration read *"A spring owns its own
clock**:** the settle rides…"*, and that colon made the comment a **pseudo-declaration
named `clock`** under the fence's own matcher at `tests/styles/spring-authority.test.ts:267`
(`/([a-z-]+|--[a-z0-9-]+)\s*:\s*([^;{}]+);/g`, which **never strips comments**): the
`[^;{}]+` value ran straight through `*/` and swallowed the entire `animation:` line to its
`;`, whereupon `:268`'s name filter dropped the whole match because `clock` is not
`transition|animation|--`. **The comment celebrating the fix had blinded the gate that
caught it.** Replicated mechanically, both arms, on the real detector: with the colon in
place a reverted bare `200ms` at `:354` returned **EXIT=0, 14 passed — INVISIBLE**; with
the colon changed to an em-dash (zero colons left in the comment) the identical mutation
returns **EXIT=1, `1 failed | 13 passed`**, naming
`src/components/handmark/HandMark.vue  hm-settle 200ms var(--spring-present) both`. The
mutation was restored byte-identical (`cmp` EXIT=0) and only the one comment line differs
from the pre-cure file.

**ROUTED DEFECT — NOT γ's to fix, and not fixed here.** The one-byte cure restores *this*
site's visibility; it does not repair the arm. `spring-authority.test.ts:267` must
**strip comments before running the decl-regex**, or the next comment anywhere in `src/`
that contains a colon will blind it again at a site nobody is watching. The in-repo
precedent is exact and three directories away —
`tests/components/custom/handmark/g-hm-layer.test.ts:36-42` strips `/*…*/` and `<!--…-->`
before matching and states the DETECTOR-BLIND law in as many words. **Owner: the
`spring-authority` arm — BK #26 `W-SPRING-RETUNE`, whose file header routes its own
hardening to `#65 / RT-26A`.** Filed as a defect note, not touched by this seat.

**BLAST RADIUS, MEASURED for the owner — and its honest limit.** Re-running the `:267`
matcher over `src/` twice, once as-shipped and once comment-stripped, the strip recovers
**120 `transition`/`animation`/`--` declarations across 43 files** that the fence never
sees at this tree — the hole is real and it is not confined to handmark
(`styles/tokens/**`, `styles/glass/**`, `components/dock/**`, `PagerDots.vue`,
`Timeline.vue` all lose declarations to it). **But it is a LATENT hole, not a live
cover-up, and the distinction is stated rather than blurred: running the full fence both
ways returns 0 violations as-shipped and 0 violations comment-stripped — the blindness
hides ZERO actual violations on this tree.** So the repair is owed on detector-integrity
grounds alone, and no RED is being deferred behind it. Neither figure is a gate claim; both
are this seat's measurements on the arm's own predicate, banked so the owner does not have
to re-derive them.

---

## 3 · g12 — DECLINED AT THE CUT, AND LOGGED (silence was not lawful)

`ASK.md:43` ratified **CONSUME** `perfect-freehand` via the measurably-live `freehand.ts`,
with its own escape: *"declining takes one word at the cut, and the decline re-derives the
brush path in-house."*

**The decline is taken.** The dated bracket lands at the venue the row itself names.
Grounds, in order of force:

1. **The two documents cannot both be honoured.** Consuming the core requires *keeping*
   `freehand.ts` 379. `GREENFIELD-TERMINAL:832` — the later, adjudicated PASS-4 spec of
   record for #51 — deletes that file by name and rules that *"barrel republication of
   perfect-freehand dies."* The terminal is the successor document.
2. **The ratified gates want what a simulated hull cannot state.** G-HM-MARK 3 asserts
   entry taper ≤5% / exit ≤8% and G-HM-MARK 2 a median minor axis ≥60% of the declared
   nib. Both read `profile(u)` directly. Under a pressure-simulated hull they become
   emergent properties measurable only after the fact.
3. **The decline is what the peer retirement is made of** (§4).

`strokeRibbon(points, w)` is a genuinely different mechanism — the outline of a
variable-width stroke over any polyline from a closed form — not a re-wrapping of the
vendored core.

---

## 4 · THE PENCIL-BOIL RETIREMENT — the CT-1 probe re-run as a real delta

`ROUND-1-FINDINGS.md:567` (CT-1) measured `/handmark` as one of 19 subpaths that hard-fail
a README-conformant install, naming `@mkbabb/pencil-boil` as its cause. The receipt owed
was a re-run, so the probe was re-run **as a before/after pair** — the before-arm from a
`git archive HEAD` scratch copy, per the born-RED law.

```
BEFORE (git-archive scratch copy of HEAD 8a96868d)
  entry: src/components/handmark/index.ts
  modules in static closure: 12
  declared optional peers: @vueuse/core · @mkbabb/pencil-boil · @mkbabb/value.js · tw-animate-css
  bare specifiers reached: @mkbabb/pencil-boil · vue
  OPTIONAL-PEER HARD-FAILS: 1
    @mkbabb/pencil-boil <- geometry.ts, ink.ts, composables/useHandMark.ts

AFTER (working tree)
  modules in static closure: 5
  declared optional peers: @vueuse/core · @mkbabb/value.js · tw-animate-css
  bare specifiers reached: vue
  OPTIONAL-PEER HARD-FAILS: 0
```

**The probe is control-armed.** Pointed at `/button` it reports
`@mkbabb/keyframes.js · reka-ui` — so a green on `/handmark` is a measurement, not an
instrument that cannot see. The probe's first draft anchored its regex at the `import`
keyword and forbade newlines, which silently missed every multi-line import and
under-reported the closure at 3 modules; it was corrected before any figure was banked.
Instrument at `scratchpad/hidden-peer-probe.mjs` — **not added to the repo**, since a
one-use receipt tool with a single site is the overfit class this tranche audits for.

**The dist-level arm was deliberately NOT run.** It requires a build, and a build would
regenerate the shared `dist/` whose staleness is currently REDding α6's Row 8 — clearing
another lane's failure as a side effect of my own receipt is papering. §6 states the cost.

---

## 5 · THE FALSE CENSUS — struck, not footnoted

`consumer-evidence/handmark.md` claimed **"External consumers — 0 at HEAD."** The grep it
rests on searches `demo/ src/` — two directories *inside this repository* — and reports
its empty result under the word "External". **Any consumer outside the repo is outside the
search path by construction**, so the instrument returns 0 for every component it is ever
pointed at. It is vacuous, and vacuity is why it read as reassuring for three tranches.

True count at the census of record: **3**, all in atlas — `AnimatedRule.vue:34`,
`charts/glyph/HandMark.vue:26`, `useMarkMorphology.ts:40` (type-only). Banked twice
in-repo and independently (`GREENFIELD-TERMINAL:715`; the outbound ACK at
`BJ/coordination/glass-outbound-2026-08-10-atlas-handmark-ack.md`). **Not re-walked here**
— atlas is a foreign tree and this unit writes nothing into it.

**2026-08-25 — atlas ACK NOT RECEIVED at seal; per the outbound's silence law the W2
sub-close is HELD as a disclosed cross-repo hold; the wave is not deferred.** The only
handmark coordination artifact on disk is the OUTBOUND itself — despite its filename, no
inbound reply exists in any tree this seat can read, and none is asserted.

This is load-bearing, not bookkeeping. "0 external consumers" is the premise a clean break
is licensed by, and #51 took **four** of them: the `path` member cut, `weight` retyped
px→dimensionless (a silent semantic break `vue-tsc` cannot see), `strikethrough`→`strike`,
and the `HandShape` union narrowing. Had the census been believed, those would have
shipped as unannounced breakage into a live consumer. The
**`strokeRibbon`-publishes-at-W1-before-`path`-is-cut-at-W2** law exists precisely because
the real count is not zero — and it is satisfied here: `strokeRibbon` is exported from
`index.ts` in the same cut that retires `path`, over an arbitrary caller-supplied polyline.

`REDUCTION.md:88` carried the same error in softer form — its two columns are honestly
labelled (`src` and `demo` are in-repo by definition) but the verdict prose turned them
into *"2,231 LOC for one story."* Struck with its reasoning intact: the reduction stands on
merit, but it stood on a ground that was **incomplete rather than wrong**.

---

## 6 · VERIFY — real exit codes, foreign REDs attributed

```
vue-tsc --noEmit                        VTSC_APP_EXIT=0    (0 errors)
vue-tsc --noEmit -p tsconfig.test.json  VTSC_TEST_EXIT=0   (0 errors)

npx vitest run                          BATTERY_FINAL_EXIT=1
  Test Files  2 failed | 222 passed (224)
  Tests       2 failed | 2105 passed | 10 expected fail (2117)

node scripts/gate-register.mjs          RECEIPT_EXIT=0
  seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
  armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  → BYTE-IDENTICAL to the adjudicator's read. ZERO GATES MINTED.

handmark suites alone                   EXIT=0   47 passed (2 files)
+ spring-authority                      EXIT=0   61 passed (3 files)
```

**ZERO γ-OWNED FAILURES.** Both battery REDs attributed:

| failure | owner | why |
|---|---|---|
| `public-surface.spec.ts` Row 8 — *ships exactly the style closure* | **α6, stale-dist** | expects `components/dock/styles/run.css`, receives `overflow.css`. α6 renamed the file in source this session; gitignored `dist/` predates it. |
| `boot-graph.test.ts` — *dist-demo is NEWER than every source* | **RED-BY-ROUTE** | `dist-demo/index.html` built `14:00:21.977Z`, newest source `14:15:38.644Z`. An mtime arm over gitignored build output — **any** source write by **any** of the three concurrent lanes flips it. Already RED at unit 4's step 0. |

The standing figure moved, and the movement is stated rather than smoothed. Unit 4
recorded `2014 passed | 7 xf (2022)`; the brief carried `2015 | 7 xf`. **This seat took
three readings and got three different totals** — `2100` collected at step 0, `2101` after
its own cures, `2117` at close — with `8 → 10` expected-fails appearing between the second
and third. Only the 47 handmark cases are this unit's, and they replaced seven deleted
files' worth. The rest is α6 and δ3 landing `g-dock-lattice.test.ts`,
`story-preview-card.test.ts` and more *while this seat worked*: porcelain grew **64 → 68**
mid-run.

That is the honest shape of the figure, and it is why no single number should be treated
as the tranche's constant: **a battery total taken on a tree three lanes are writing is a
snapshot with a timestamp, not an invariant.** What is invariant here is the *attribution*
— across all three readings the failure set never changed, and **zero of it was ever
γ's**.

### 6.1 · `verify:package` — and an honest refusal to state the ratchet

```
npm run verify:package                  VERIFY_PACKAGE_EXIT=1

Error: Invalid package artifact:
components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
  requires direct dependency ownership of @mkbabb/pencil-boil
```

**This is stale-dist, proven, not a live leak.** `dist/components/handmark/` was built
**Aug 10 14:07** and contains the entire pre-cut family (`brush` `freehand` `geometry`
`ink` `noise` `texture` `types` `constants` `composables/`) and **no `stroke.d.ts` at
all** — it predates the greenfield by fifteen days. Every source-side probe agrees the
closure reaches `vue` alone (§4).

**G-BUNDLE-RATCHET was NOT OBSERVED this run, and no figure for it is stated here.** The
run aborts at the declaration-reference check *before* reaching the ratchet arm. The brief
supplies the expected reading (`2607399 < 2633353`) and it would have been easy to repeat
— but repeating a number this seat could not read is exactly the remembered-literal class
this repo's own verifier comments condemn. It REDs lawfully by route, as ratified; **its
value is owed to whoever runs it on a fresh build.**

---

## 7 · π — ALL OWED, NONE CLAIMED

**Nothing in this unit was painted.** No browser was opened; every π cell below is
ENQUEUED to the singleton seat and **the two-arm band's colour windows have never run
live**:

`π-BAND` (both arms, both themes, ≥3 hues, cap+ascender+descender specimen) ·
`π-RING` (the `padding-inline` reservation pushing a real neighbour) · `π-MOBILE` ·
`π-DRAW` · `π-PEN` · `π-HOVER` · `π-TOUCH` · `π-SCROLL` (kill criterion: if ink-lag reads
as detachment the resolution is **DELETION, not tuning**) · `π-GALLERY` · `π-LADDER`.

Also owed and **not** this unit's: `π-CEILING`, `π-W1` (still fencing #50 W1–W8 — zero
GLSL deletable), `π-BLOB`.

The record the terminal asked W5 to make, made here because BK has no `FINAL.md`:
**isolation and blend are foreclosed together.** `isolation: isolate` fixes paint order and
**does not clip**; extent is fixed by geometry alone, which is why G-HM-LAYER 1 and 2 are
separate arms with separate mutations. `mix-blend-mode` is absent from the family and
gated absent — the shipped `z-index:-1; mix-blend-mode:multiply` pairing is what let the
old band composite against page text it did not own.

---

## 8 · WHAT THIS UNIT DID NOT DO

```
· demo/stories/manifest.ts — NOT TOUCHED (δ3's surface, concurrent). Its handmark blurb
  already carries the four-gesture vocabulary; nothing was owed. [2026-08-25 · driver —
  commit-truth, the reciprocal bracket: that blurb is γ-AUTHORED (the +967 hunk this
  lane's implement partial left mid-W2) and it LANDED via δ3's commit `9f6d0ec9`,
  disclosed in that commit's message per the `96f0f257` sweep-with-bracket precedent.]
· demo/chassis/** — NOT TOUCHED (δ3's).
· src/components/dock/** — NOT TOUCHED (α6's). Its two battery REDs left standing.
· dist/ and dist-demo/ — NOT REBUILT. A rebuild would clear α6's Row 8 and boot-graph as
  a side effect and would bake two lanes' mid-write source into a shared artifact.
· G-BUNDLE-RATCHET — NOT STATED (§6.1). Unobservable this run; no remembered figure.
· atlas — NOT WRITTEN, NOT RE-WALKED. Foreign tree; the banked census is cited instead.
· the JS 220 ms re-ink literals — LEFT, with grounds (§2.2), not silently kept.
· any π claim · any browser · any gate seat · any export-key motion · any commit.
· tests/styles/spring-authority.test.ts — NOT TOUCHED. The comment-strip repair its :267
  decl-regex needs is ROUTED to its owner (§2.2), not taken here; γ's fence stops at the
  one comment byte on the source side.
```

---

## 9 · FENCE — files this seat wrote

```
src/components/handmark/HandMark.vue          FRAME-RANK stagger · spring clock fence · FRAME_MS import
                                              + CURE PASS 2026-08-25: :351 comment colon → em-dash (gate-blinding, one byte-class)
src/components/handmark/stroke.ts             six zero-importer exports demoted to module-private
docs/tranches/BK/ASK.md                       g12 DECLINE, dated bracket at :43
docs/consumer-evidence/handmark.md            false census struck · retired shape vocabulary corrected
docs/tranches/BJ/addenda/.../REDUCTION.md     row 88 verdict prose struck
docs/tranches/BK/EXECUTION-PROGRESS.md        roster :5329 UNSTARTED → LANDED
docs/tranches/BK/execution/2026-08-10-lanegamma-unit5/{RECORD,PASTE-BLOCKS}.md
```

Adopted from the mid-W2 partials, verified but not authored this run: `stroke.ts` body,
`index.ts`, the two gate files, the story, `tests-visual/handmark.spec.ts`, the
clip-predicate ride, the four peer-retirement surfaces, the two citation corrections, and
the 17 deletions.

**No `git add`/`commit`/`stash`/`checkout` was run. The driver commits.**
