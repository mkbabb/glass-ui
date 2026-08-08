# BK Row #57 — W-LABELED-FIELD

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`) · scout+implement seat ·
2026-08-07 · tree HEAD at open `62305f4a` (the prompt's `4917a042` was stale — #38/#39/#41/#46/#55
landed after it).

## §1 · SELECTION + GROUNDS

**Row #57 W-LABELED-FIELD**, re-derived from the DAG **and** `git status` (⊕⁴⁸ rules the cursor
alone cannot show an uncommitted lane), never from a prior block's "next".

Walking TR §A order past the last landing:

| row | disposition | ground |
|---|---|---|
| #18 #19 #23 #24 #26 #27 #28 #29 #30 #31 #38 #39 #41 #46 | LANDED | cursor ⊕³⁸-⊕⁵¹ |
| #55 | LANDED at `62305f4a` | on disk, back-annotation pending |
| #21 | gated | `#17` hard, and #17 is Φ4-UNSTARTED |
| #22 | IN-FLIGHT (cure cut) | never selectable |
| #25 | gated | its own rides-clause (#82's `field-control.css`, #27's ladder, #22's rung) |
| #32 #33 #34 #35 #40 #71 | IN-FLIGHT, UNCOMMITTED IN THIS TREE | `git status`: `tabs/`, `alert/`, `slider/`, `carousel/`+`deck/`+`pager-dots/`, `morph/eyeglass.ts`; #33 also hard-fenced on G-FROST-TRANSMISSION |
| #42 | gated | `#47` aperture seam |
| #43 | Φ6, gated | P7/P8 behind #31/#22 F-1 |
| #44 | gated | sequenced behind #43's cut |
| #45 | gated | after `#52` |
| #47 | gated | `#72` hard-precedes the first build commit; also after #6/#26/**#7**-fence (#7 UNSTARTED) and #89's sever |
| #48 | gated | after #47 W7 |
| #49 GF-AURORA | **SKIPPED, gate named** | ASK **g3** (DUSK/DAWN glance) + ASK **g7** (Kuwahara multipass) |
| #50 GF-BLOB | **SKIPPED, gate named** | ASK **g1** (cartoon-weight A/B at FIRST capture) |
| #51 GF-HANDMARK | **SKIPPED, gates named** | **atlas ACK** (external) before W2 closes + ASK **g12** |
| #52 | gated | after `#35` (C12) — #35 uncommitted, not landed |
| #53 GF-FOURIER | **SKIPPED, gates named** | `#54` seam · `#52` before W4 · C-13 · ASK **g4** |
| #54 | not Φ5 | sits in the cursor's **Φ4** table; and its named consumers (#50 W0, #53) are ASK-gated |
| #56 | receiver row | its σ≈50 admissibility is #10 π-SUITE's, unstarted |
| **#57** | **SELECTED** | `EXECUTION-DAG:68` — hard blockers **none** ("sufficiency RULED at the seal"); TR#57 gate cell **seats +0**; no file it owns carries a foreign uncommitted edit |

## §2 · THE WORK ORDER (TR#57 cell, verbatim)

> | 57 | W-LABELED-FIELD ⊕⁵ | PROCEDURAL §4 FFN-10 + tier-3 SPLIT (DAG 4.11) | Φ5 | **⊕⁵ SUFFICIENCY RULED AT THIS SEAL (SE-5 — CWT-3 §7.11's "verify sufficiency at BK rather than re-spec" was a live deferred-verify clause, the class SL-7 struck at #81; DISCHARGED here, not at BK):** the spec IS sufficient and is: the DAG 4.11 SPLIT executes as ruled · **the FFN-10 primitive gap is the one deliverable** — `LabeledSelect` renders raw values; label-items support lands (options carry `{value, label}`, the field renders labels, values stay the contract) · both members conform to #68's token law and #27's rest rung, zero bespoke material. Completion = FFN-10 closed + the split landed; acceptance rides the tier-3 close-battery class (CWT-3 §5), seats +0 |

Cited specs, read in full:
- `DAG-RULINGS.md:248` **4.11** — *"Three relays keep; `LabeledSelect` — whose `items: readonly
  string[]` is a preset living in the library — demotes to demo."*
- `DAG-RULINGS.md:188` §3c — *"`labeled-field→select` (1) | **SEVER** by demoting `LabeledSelect` |
  `./labeled-field` stops dragging the overlay chain"* — the split's PURPOSE, not a side effect.
- `PROCEDURAL-LEDGER.md:167` §4 — *"FFN-10's primitive (LabeledSelect renders raw values;
  label-items support) — fourier's dead label tables die inside GF-FOURIER once the primitive
  exists."*

## §3 · PER-ITEM LEDGER

**I-1 · THE SEVER (DAG 4.11).** `src/components/labeled-field/LabeledSelect.vue` **DELETED** (61
lines) with `LabeledSelectProps` (`types.ts`) and both `index.ts` exports. The subpath keeps its
`PUBLISH` policy (`scripts/lib/subpath-policy.mjs:86`, untouched) and its four remaining members.
The edge that mattered is gone: `../select` was the ONLY import in the family reaching outside the
control tree, so `./labeled-field` no longer pulls select → popover → portal → dismissable-layer
behind it. Trace: `grep -rn '"../select"' src/components/labeled-field/` → **0**.

**I-2 · THE RELOCATION.** `demo/chassis/field/LabeledSelect.vue` — demo-private, on the barrel's own
stated terms (*"the storybook's demo-private primitives … NOT a library export"*). Imported
deep-relative like every other chassis part (88× StoryPage / 74× StorySection / 27× ShowcaseFrame);
**not** added to `chassis/index.ts`, which has exactly ONE consumer — a barrel row nobody reads is
indirection, not API. Eight importers touched — **7 re-pointed + 1 deleted**, not "8 re-pointed":
re-pointed are `compositions/settings.vue` · `substrates/fourier-field.vue` · `substrates/blob.vue` ·
`containers/configurator.vue` ·
`substrates/aurora/sections/{AuroraColor,AuroraComposition,AuroraMotion}Section.vue`; the eighth,
`forms/labeled-field.vue`, has its import **dropped outright** because the specimen it fed is struck
(I-6), so nothing was re-pointed there.

**I-3 · FFN-10, THE ONE DELIVERABLE — born-RED, cured.** `items` is now
`readonly (T | { value: T; label: string })[]` over `<script setup generic="T extends string">`, and
one `options` computed normalises both forms (*a bare string is an option whose label is its own
value*). **The value never becomes the label**: `modelValue: T`, `update:modelValue: [value: T]`.

BORN-RED verbatim, against the relocated-but-unfixed bytes (`tests/demo/labeled-select.test.ts`,
case 1) — RED for exactly the right reason, the option rendering its own JSON:

```
 FAIL  tests/demo/labeled-select.test.ts > LabeledSelect — the demo's labelled-select preset > renders option LABELS while the VALUE stays the contract (FFN-10)
AssertionError: expected [ …(2) ] to deeply equal [ Array(2) ]
  [
-   "Fourier (warm)",
-   "Chebyshev (cool)",
+   "{
+   \"label\": \"Fourier (warm)\",
+   \"value\": \"var(--viz-fourier)\"
+ }",
+   "{
+   \"label\": \"Chebyshev (cool)\",
+   \"value\": \"var(--viz-chebyshev)\"
+ }",
  ]
```

Cases 2 (bare-string form) and 3 (re-homed anatomy) **passed at the same pre-cure bytes** — the
honest signature of a behaviour-preserving relocation with one real defect on top. Post-cure **3/3
GREEN**. The case asserts both halves in one place: the rendered text is the LABEL *and*
`[role="option"][aria-selected="true"]` is the option the VALUE keyed — a rendered label that
selected nothing would be the same defect wearing better clothes.

**I-4 · THE DEAD LABEL TABLES DIE (the reason FFN-10 exists).** `fourier-field.vue` held
`{label, value}` tables and threw the labels away at the boundary — `:items="SOURCE_OPTIONS.map((o)
=> o.value)"` and the same for `COLOR_OPTIONS` (2 sites). Both now pass the pairs. **9 call-site
simplifications in total**, all of them the erased value type paying itself back:

| site | before | after |
|---|---|---|
| `fourier-field.vue` ×2 | `:items="OPTS.map((o) => o.value)"` | `:items="OPTS"` — the label reaches the reader |
| `blob.vue` ×3 | `:items="MOODS as unknown as readonly string[]"` (+ HARMONIES, MERGES) | `:items="MOODS"` — `T = BlobMood` |
| `configurator.vue` ×1 | `:items="mediums as unknown as readonly string[]"` | `:items="mediums"` |
| `settings.vue` ×3 | `:model-value` + a 4-line `@update:model-value="(v: string) => (theme = v as (typeof themeOptions)[number])"` | `v-model="theme"` — the union survives the round trip |

Four `as unknown as` casts and three re-narrowing handlers are gone because the type stopped lying,
not because anyone silenced it.

**I-5 · THE TOKEN LAW (#68) ON THE SURVIVING MEMBER.** `LabeledField.vue` held **4 of the repo's 7**
bare `var(--spacing)` reads (`git grep -n 'var(--spacing)' HEAD -- src` → **7 hits in 3 files**:
`LabeledField.vue` ×4, `card/styles.css` ×2, `alert/index.ts:15` ×1). It is **not** the last such
file besides `card/styles.css` — `alert/index.ts:15` is a third site, inside #33's live lane and not
this row's to reach (routed, §6). This row moves **4** reads. Each of them hand-multiplied a Tailwind
bridge primitive, which forks the space series and, worse, **does not step down**: `sizing.css` §1.1
carries the ONE width-conditional spacing declaration in `src/styles` and its own comment states the
intent — *"a component reads `--space-family` once and steps down for free, instead of re-deciding
its own spacing at its own breakpoint."* Now on the rungs:

| declaration | was | is | arithmetic |
|---|---|---|---|
| `.labeled-field` gap | `calc(var(--spacing) * 2)` | `var(--space-atom)` | 8px → 8px above 768px · **8px → 4px at ≤768px** |
| `.labeled-field-copy/-control` gap | `var(--spacing)` | `var(--space-residue)` | 4px → 4px (floor absorbs, both bands) |
| `[data-layout="horizontal"]` gap | `calc(var(--spacing) * 4)` | `var(--space-body)` | **16px → 12px** above 768px · **16px → 8px** in 576–768px |
| collapsed horizontal gap (≤36rem) | `calc(var(--spacing) * 2)` | `var(--space-atom)` | **8px → 4px** — the whole ≤576px range sits inside the ≤768px floor |

**THE PAINTED DELTA IS FOUR CELLS, NOT ONE** — the record's earlier "one painted number moves" was an
understatement produced by reading the desktop column only. `sizing.css` §1.1's ≤768px block steps
every rung down one (`--space-family` 20→12, `--space-body` 12→8, `--space-atom` 8→4,
`--space-residue` 4→4, the floor), and the old `calc(var(--spacing) * n)` arms were width-invariant,
so every rung the row adopts moves paint twice. The full set: **16→12 desktop · 16→8 mid ·
8→4 stacked-mobile · 8→4 collapsed**. Getting the step-down is the POINT of the change (that is what
§1.1 sells), but it is a delta and it is owed a capture — every mobile cell is routed to #10 (§6).

The desktop delta is the one that also changes rank, and it is stated, not rounded away:
**16 is not on the series** (`4·8·12·20·32`), so it
had to move. It goes DOWN to `--space-body` (12), not up to `--space-family` (20), because
`color-radius.css` §1.2's own register says what those ranks mean — *"gap 20 (`--space-family`) →
seam"* separates sibling FIELDS, *"gap ≤ 12 (`--space-body`) → edge"* is within one object, and a
label beside its own control is one object. It stays one rung above the stacked 8px because a
horizontal seam needs more air than a vertical one. Paints only ≥36rem (the collapse arm owns
narrower).

**I-6 · THE STORY TELLS THE TRUTH.** `/forms/labeled-field` documents the library subpath, so a
demo-private preset shown in its "control adapters" row would advertise an API a consumer cannot
import. The `LabeledSelect` specimen + its `choice`/`choiceOpen`/`choices` state are struck (13
lines); the blurb now says there is no select adapter and points at the direct slot, which is how
every uncovered control is written. The preset is still exercised on **7** other routes.
`manifest.ts`'s "parent SFC + 4 wrappers over Input · Select · Slider · Switch" → 3 wrappers.

**I-7 · THE BREAK IS BOOKED BY LINE** (the #46 precedent — `CHANGELOG.md:3` bills `MIGRATION.md`
§8.0.0 "the complete break list", so an unbooked removal makes that line false). §8.0.0 gains the
classification table (2 removed / 12 retained), the **reason** the sever exists, and the ~30-line
worked composition that IS the replacement — *no drop-in is offered because there should not be
one*. `CHANGELOG.md` gains the matching Removed block.

**I-8 · G-RELAY, WALKED AT THE CUT.** Whole-repo grep for `LabeledSelect|LabeledSelectProps` across
`*.ts|*.vue|*.mjs|*.json|*.md|*.css` (excl. `node_modules`, `dist/`, `docs/tranches`): **0 dangling
importers**. Live hits are the relocated component + its 8 importers + the new test + the booking
prose. One stale COMMITTED record — `docs/consumer-evidence/labeled-field-action-slot.md:18`, which
listed the family membership — is **struck in place and dated**, not rewritten. Four `tests-visual/`
comments name `LabeledSelect`; they remain true (the trigger still IS the library Select) and that
estate is #10 π-SUITE's enrol-or-delete (C8) — **routed, not touched**.

**I-9 · #27 REST RUNG + ZERO BESPOKE MATERIAL — verified, not asserted.** `grep -rn
"backdrop-filter|box-shadow|glass-|--rung|filter:" src/components/labeled-field/
demo/chassis/field/` → **two hits, and neither is a declaration**: `src/components/labeled-field/
README.md:3` (prose naming the subpath) and `demo/chassis/field/LabeledSelect.vue:6` (a `//` comment
naming the overlay chain the sever kills). The family paints no material of its own in
either half: `LabeledField` is a grid plus two type colours, the relays forward to the controls that
own their own rungs, and the preset composes the library `Select`. There is nothing here to sit on
the wrong rung.

## §4 · VERIFY (verbatim)

```
$ npx vue-tsc --noEmit
vue-tsc exit: 0

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 147 passed (154)
      Tests  12 failed | 1385 passed | 2 expected fail (1399)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

**The register receipt is BYTE-IDENTICAL pre-cut and post-cut**, character for character. The house
target `violations:0` is **not reachable at this HEAD and is not this row's to reach**: the one
violation is #40 W-PAGER's uncommitted deletion of `tests/components/pager-dots.contract.test.ts`,
which the register's `sourcePath` still points at — recorded, not papered over (same finding, same
words, as #46's §4).

**The 12 failures are the SAME 12 as the pre-edit baseline** — captured before the first byte moved,
every one foreign:

| failure | owner |
|---|---|
| `pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `carousel/contract` ×1 | #40, uncommitted in this tree |
| `gate-register` ×3 | the `sourcePath` violation above (#40) |
| `overfit-structure` ×1 — `useLeadTrail.ts :: LEAD_TRAIL_TAU_E_S`, `:: trailOffset` | #40's untracked file |
| `stacked-url-filter` ×1 | born-RED on `PagerDots.vue:493`, #7/#40 own the flip |
| `boot-graph` ×1 | the dist-freshness arm — reds on any source edit; the driver runs `npm run demo:dist:build` immediately before commit and it greens |

Row-own suites, additionally: `tests/demo` + `tests/public-surface.spec.ts` → **145 passed, 2
failed**, both failures FOREIGN and both #46's named pair — the lock root carrying
`embla-carousel`/`embla-carousel-vue` against an on-disk `package.json` that deletes them with
`package-lock.json` unmodified, and `dist` lacking six source partials (`components/carousel/styles.css`,
`components/deck/styles/{index,stage,turn,reveal,capture}.css`). `tests/demo/labeled-select.test.ts`
**3/3 GREEN**; `tests/components/labeled-field.contract.test.ts` green at **6 cases — 6 at HEAD and 6
now, no case re-homed**. What the row removed is ONE `mount()` (the `LabeledSelect` arm, plus its
`[role="combobox"]` selector) from *inside* the multi-mount case *"keeps every earned adapter on the
same accessible anatomy"*, which still runs. Row-own totals are therefore **3/3 + 6/6 = 9 tests**,
which is what the run reports.

**GATES: zero minted, zero bound, zero moved.** The obligations ship as unit cases, per TR's
`seats +0`.

## §5 · DIVERGENCES, each with its ground

1. **Not added to `demo/chassis/index.ts`.** The barrel has one consumer; the deep-relative SFC
   import is the idiom at 190+ sites. A barrel row nobody imports is indirection.
2. **The generic (`T extends string`) is not spelled in the TR cell.** It is how *"values stay the
   contract"* becomes true in the type plane rather than in prose: without it the four
   `as unknown as readonly string[]` casts and three re-narrowing handlers survive the cure, and
   FFN-10 would be half closed.
3. **The field changes paint in FOUR cells (16→12 desktop · 16→8 mid · 8→4 stacked-mobile · 8→4
   collapsed).** Required by I-5. The desktop 16→12 is forced because 16 is off the series and the
   alternative was minting a sixth rung, which the token law forbids; the three mobile cells are
   `sizing.css` §1.1's step-down arriving, which is the stated PURPOSE of adopting the rungs and not
   a side effect — but it is still paint that moves.
4. **The `/forms/labeled-field` select specimen is struck rather than re-pointed at the demo
   preset.** Re-pointing would have kept the page teaching a library API that no longer exists.
5. **π/DELTA not claimed.** This cut moves paint in four cells (I-5) on routes the π-SUITE already
   owns cells for; the capture — desktop **and** the 390×844 mobile cell — is owed to **#10 π-SUITE**,
   not banked here on an unverified claim.

## §6 · ROUTED — nothing dropped silently

- The `/forms/labeled-field` + `/compositions/settings` **paint cells for the whole four-cell delta**
  → **#10 π-SUITE**: the desktop 16→12, and — because `sizing.css` §1.1's ≤768px floor moves three
  more cells — **every mobile cell at the estate's standard 390×844**, namely the 16→8 mid arm
  (576–768px), the 8→4 stacked gap and the 8→4 collapsed gap. Not one cell, four.
- `src/components/alert/index.ts:15` (line 46 in #33's uncommitted tree) — the **third** bare
  `var(--spacing)` site, a `calc(var(--spacing)*4)` grid-template inside an arm string → **#33's live
  alert lane**, whose uncommitted edit already owns that file. Not reachable from here without
  crossing a foreign lane; named so #68's token law does not lose it.
- Four `tests-visual/` comments naming `LabeledSelect` (`w38-w47-verify`, `w38-binding`,
  `aurora-painterly-statistics`, `aurora-atoms-render`) → **#10 π-SUITE's C8 enrol-or-delete**; they
  are not false today.
- `src/components/card/styles.css`'s remaining `calc(var(--spacing) * n)` reads — the last site of
  the idiom in the library → **#79 W-CARD-MATERIAL** (its lane, its file).
- Any external consumer importing `LabeledSelect` → **#76 W-CONSUMER-BAND**, one marked addendum per
  repo at ship-time (consumer-updates ruling); the 8.0.0 break list is already written.
- `docs/consumer-evidence/labeled-field-action-slot.md`'s `#action`-slot proposal is still unbuilt
  and its artefact path (`src/components/custom/labeled-field/`) is three restructures stale → **#14
  PHANTOM-REPAIR**; only the family-membership line was struck here.

## §7 · DIFF STAT (row-own)

```
 CHANGELOG.md                                              |  9 ++++
 MIGRATION.md                                              | 37 ++++++++++++
 demo/chassis/field/LabeledSelect.vue                      | 99 +++++++++++++++ (new)
 demo/stories/compositions/settings.vue                    | 29 +++-------
 demo/stories/containers/configurator.vue                  |  4 +-
 demo/stories/forms/labeled-field.vue                      | 13 +----
 demo/stories/manifest.ts                                  |  8 +--
 demo/stories/substrates/aurora/sections/AuroraColorSection.vue        |  2 +-
 demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue  |  6 +--
 demo/stories/substrates/aurora/sections/AuroraMotionSection.vue       |  2 +-
 docs/consumer-evidence/labeled-field-action-slot.md       |  4 +-
 src/components/labeled-field/LabeledField.vue             | 21 +++++--
 src/components/labeled-field/LabeledSelect.vue            | 61 ------------ (deleted)
 src/components/labeled-field/README.md                    | 11 ++--
 src/components/labeled-field/index.ts                     |  2 -
 src/components/labeled-field/types.ts                     | 10 ----
 tests/components/labeled-field.contract.test.ts           | 11 +---
 tests/demo/labeled-select.test.ts                         | 105 +++++++++++++ (new)
 tests/public-surface.spec.ts                              |  8 +-
```

`demo/stories/substrates/blob.vue` and `demo/stories/substrates/fourier-field.vue` also carry this
row's hunks (3 casts / 2 label tables + their import lines) **on top of foreign uncommitted
residue** — blob's is #55's watercolor strike, fourier's is #46's timeline→Slider swap, both from
rows already committed at `62305f4a`/`9bc8d25f` whose completion edits the driver has not committed
yet. Disjoint hunks, named here so the driver's `git add` sees them coming.

**THE PUBLIC-SURFACE FILE CARRIED A FOREIGN BYTE, AND IT IS NOT BOOKED ROW-OWN.**
`tests/public-surface.spec.ts:286`'s `GlassTimeline` → `Timeline` rename is **#46 GF-TIMELINE's
completion residue** — the runtime-export name renamed at `9bc8d25f` and missed by that row's scoped
`git add` — not this row's byte, even though it sat in the same working file. DRIVER RESOLUTION,
following the `ff7451d7` precedent (#46's manifest-description completion, landed the same way):
**that line lands as its own `#46 completion` commit BEFORE #57's commit.** It has: the driver landed
it at **`a53cf98d`** (*"test(public-surface): BK #46 completion — the timeline runtime-export name,
renamed at 9bc8d25f, missed by its scoped add"*, 1 file, +1/−1), which is now HEAD. #57's remaining
row-own share of that file is therefore the labeled-field surface list alone — **+1/−7 = 8 lines**,
which is the figure in the stat above; the earlier `10 +---` had the foreign pair folded in.

## §8 · RESIDUE BOOKED AT THE Φ5 QUARTET ADJUDICATION (2026-08-07)

The quartet's adjudicator ruled **CURE-REQUIRED**; the cures are documentary plus one code-comment
line and are applied above. What STANDS unchanged: the selection walk, the DAG 4.11 sever (barrel 4
members, `"../select"` grep exit 1, 0 dangling importers), FFN-10 closed and gated (M1–M4 mutations
bit, born-RED reproduces), the demo relocation, the suites byte-identical with all 12 failures
enumerated foreign, the register receipt with the one violation honestly #40's, row-own 9/9. The
cure order sits beside this record at `CURE-ORDER-57.md`. Three residue items are carried, not
cured:

1. **I-5 has no unit detector, by design** — the M5 negative control came back clean. That is
   legitimate under the row's `seats +0` mandate, but it means **the token adoption is unwitnessed
   until #10's π cells land**. The four painted cells are the evidence, and they are owed (§6).
2. **`tests/demo/labeled-select.test.ts` sits OUTSIDE the mandated 3-dir verify command**
   (`tests/styles tests/components tests/gates`). The row's own born-RED case therefore does not run
   in the battery every later row runs — a hazard, named: a regression in the relocated preset would
   surface only in `tests/demo`, which is a separately-invoked arm.
3. **`demo/chassis/field/LabeledSelect.vue:51-52`'s `String(next) as T`** coerces a reka `undefined`
   emit to the literal string `'undefined'`. It is behaviour-preserving carry-over — the pre-split
   component did the same — so it is not this row's to change, but it is flagged for the family's
   next touch.

**Standing lesson (C1).** The ⊕-index in a banked paste block is **derived at COMMIT TIME from the
cursor's tail**, never banked as a constant: this row banked ⊕⁵² while #55 was landing ⊕⁵² into
`EXECUTION-PROGRESS.md`, a collision that only a re-read of the cursor at paste time can catch.
