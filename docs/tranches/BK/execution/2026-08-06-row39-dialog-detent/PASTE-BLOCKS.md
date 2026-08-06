# BK #39 — banked paste blocks

Both blocks are OUT of this seat's fence. The driver applies them; nothing here edits
`EXECUTION-PROGRESS.md` or `TERMINAL-ROSTER.md`.

Commit target: `feat(sheet): land BK #39 W-DIALOG-DETENT — the detent is a size, the
drawer folds in whole`.

**SCOPE THE COMMIT.** Three other lanes hold uncommitted work in this shared tree and two of
this row's 47 files carry their bytes. Commit this row's paths only — `src/components/sheet/**`,
the `src/components/drawer/**` deletion set, `src/components/dialog/{DialogContent,ModalOverlay}.vue`,
`src/components/index.ts`, `src/index.ts`, `package.json`, `scripts/lib/subpath-policy.mjs`,
`src/composables/motion/dissolve/dissolveGrammar.ts`, the sweep sites named in §2.8,
`tests/components/sheet/**`, `tests/components/custom/drawer/**` (deleted),
`tests/styles/color-mix-endpoints.test.ts`, `tests/public-surface.spec.ts`,
`tests/components/dialog/ModalOverlay.test.ts`, `demo/stories/containers/{drawer,sheet}.vue`,
`demo/stories/manifest.ts`, `demo/shell/dock-layer-contexts.ts`, `demo/stories/data/search.vue`
— and take **only this row's hunks** in `src/styles/index.css` and
`tests/styles/glass-subtlety.test.ts` (≈20 insertions in those two are **#35 W-SLIDER's**).
Leave `tabs/*`, `morph/*`, `alert/*`, `slider/*`, `tests/gates/{tabs-seam,feedback-tint-seam}.test.ts`
and `tests/components/a11y/*` untouched — they are #32/#33/#35's.

**CURE ROUND applied 2026-08-06** (adjudication `CURE-REQUIRED`, ten residues + a banked π
watch item, all discharged). The figures below are POST-cure; where the first cut's numbers
differ they are struck at the site in `RECORD.md` and the cure ledger is that record's §9.

---

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — Φ5 table, replace the row-39 cell

Current: `| 39 | W-DIALOG-DETENT (cut 2) | Φ5 | UNSTARTED | TR#39 → CWT-2 :26-161 | —(after #38; carries the drawer MERGE-INTO) |`

Replace with:

```
| 39 | W-DIALOG-DETENT (cut 2) | Φ5 | ⊕⁴⁸ **LANDED 2026-08-06** ~~UNSTARTED~~ — **`drawer/` DELETED WHOLE** (12 files, 1,640 ln measured at `51cfdfaf`) and the family that was *"a placement plus a scalar"* becomes two props on the surface it duplicated: `<SheetContent :detents v-model:detent>`. **The gestalt fix is one sentence — a detent is a SIZE, not a translate** — and F1 + F2 dissolve into it rather than being separately cured: sizing the anchored axis off `--detent-t` (`block-size: calc(clamp(0,--detent-t,1) * 100dvh)`, `width` on a side edge, `contain: layout paint`) puts the footer on the visible edge at every rung, makes **`0` a legal rung** so a drag-to-dismiss has somewhere to land, leaves the frost sampling a stationary box, and makes the drag span the VIEWPORT — a constant, so the gesture carries **no `getBoundingClientRect` on any path**. The size rules are authored AFTER the resting side geometry they supersede: at `:where()` (0,0,0) the plain sheet's `width:75%` would otherwise win on source order and pin the box while the scalar moved under it. **The `<Presence>` sever class is dissolved, not carried** — the retired engine re-resolved its host every frame because reka forwards content through a Presence swap; the scalar is a ref bound through the render now, so there is no element to lose. **Velocity is INTEGRATED**: `detents/projection.ts` rules that *the throw coasts for exactly as long as the spring that catches it takes to settle* — `t_settle = −ln(b)/(ζω)`, closed-form from the row's own three numbers — and `resolveRelease` resolves against the ladder **extended with `0`**, so nothing tests a threshold and `DRAWER_FLING_VELOCITY`/`steppedDetent` die with the file. **A figure was wrong twice mid-cut and is corrected at the site both times**: the first authoring projected the spring's exact PEAK EXCURSION, which is the right physics for the wrong question (it carries a 1493 px/s fling **0.041 of a viewport** and FAILED the spec's own 1493-vs-625 acceptance pair); and the prose that replaced it claimed the horizon reproduces the emitted `--spring-*-settle` tokens, which it does not — measured **`dock` 0.212 vs a published 0.21, `bloom` 0.394 vs 0.37**, because the generator's solve also requires the velocity inside the band. The source now states both figures with the reason they differ and the gate asserts AGREEMENT WITHIN 10%, never identity. **The grip IS the ladder** (`role=slider`, Home/End/arrows, orientation turning with the axis): its `inline-size` lerps `--space-section → +--space-family` across the rung range on `--spring-dock` AND its idle α lerps `0.45 → 0.65` with the same scalar, so where the sheet sits is legible without reading anything — **and that mechanism was DEAD IN PAINT in the first cut and is cured here**: `--detent-t` is registered `inherits: false` (correct, and kept — a nested sheet must never take its parent's rung), so a scalar published only on the content root computed `0` on the grandchild grip forever and the mark sat at a constant 32px at every rung, while the gate asserted the lerp's SOURCE TEXT and passed. The **writer** moved, not the registration: the grip element carries the scalar itself, because the two rules that dereference it are its own. **Measured live at `:5400`, idle: 34.40/0.474 · 37/0.50 · 40/0.53 · 46/0.59 · 52/0.65 px/α at `t` = 0.12/0.25/0.40/0.70/1.00** — `32 + 20t` and `0.45 + 0.2t` exactly — and its proximity is answered by the HANDLE's own region under `@media (hover:hover)`, against a shipped plate-wide rule that moved the mark **from 456px away**. Drag runs from the grip, the header, and a body already at its leading edge; the region is `auto minmax(0,1fr) auto` with the body the only scroller, `overscroll-behavior: contain`. **The congeal rides the ONE seam** — `--glass-veil-tier` takes a live CROWN→SHEET lerp (**0.18 at `t = 0` → 0.22 at full**, one veil step end to end, so P2's ≤0.10 holds by construction; the anchor is `t = 0` rather than CWT-2 §3.5's `ladder[0]` **because this cut MAKES `0` a legal rung**, and a four-rung `[0.25,0.4,0.7,1]` ladder therefore PAINTS 0.19 → 0.22) against a shipped shape that was most opaque at peek, minimum at 0.85, then a **0.26-α slam to opaque**. **`ModalOverlay` now holds NO law**: one `opacity` prop painted as given, with `scrimOpacity` (slide) and `scrimDetentOpacity` (rung, the shipped `0.28 + 0.44·t` **relocated verbatim**) living beside the geometries they describe. The live-behind arm is **reka's own** — `DialogOverlay` renders a comment node when the root is non-modal, verified in source — so **no `mode` enum is re-minted**; the one thing owed is the band, `[data-modal=false] { z-index: calc(--z-dock − 1) }`. **THREE CWT-2 INSTRUCTIONS RE-DERIVED, each with its ground**: home is `sheet/` not `dialog/detents/` (§3.3's receiver was `<DialogContent placement>`, which #38 split; §7's `components/sheet/` rejection rested on three retirement records #38 overturned by a senior committed act) · **no `detents/context.ts`** (half its merge — `dialogStageContext.ts` — was deleted by #38, and the other half plumbed root→content across a boundary that no longer exists: a provide/inject whose two ends are one component talks to itself) · **no `src/styles/overlay.css`** (F15's defect was a zero-consumer stylesheet over a global `@import` lane; minting a new one for a rule whose live home is a pure function beside its sibling law re-opens the lane this wave closes). §3.4's chrome gaps yield to #38's landed sibling — the sheet composes the SAME `Dialog*` leaves, and a second ladder for the same elements IS F13. **The dead selectors the deletion left are swept in the same cut**: `a11y-fallback.css` ×3 · the `scheme-motion.css` fixed-tempo pin (**and the sheet is deliberately NOT re-added — its engine reads `motionTempo()` at construction, so the one surface pinned there was pinning itself against its own engine's read**) · the 4-clause `immersive stage scrim` describe **DELETED, not re-pointed** (subject file gone = ABSENT, not green; it also guarded **the last `backdrop-filter` on any scrim in the library**, which #38's brightening measurement condemns identically at a fixed 14px) · false prose at ten further sites, incl. **`DRAWER_SNAP` DISCHARGED BY SUBTRACTION** from the per-primitive census (RT-26F loses one of three rows; the engine names `bloom` and `dock` from the table rather than forking a seventh register). Exports **68 → 67** (`./drawer` the one key that leaves), `EXACT REPRODUCTION: YES`, `drops=0 adds=0`; PUBLISH tally 21→20; `public-surface.spec.ts` −1 import −8 rows. Demo: **one merged route** — `/containers/drawer` (376 ln) dies, `/containers/sheet` absorbs it with a Detents section and a live-behind section; the search index re-pointed (a row naming a dead route is a dead link, not prose). Tests isomorphic: `tests/components/custom/drawer/` (653 ln) → `tests/components/sheet/sheet-detents.test.ts`, with **what did not survive named in the file's own header** rather than dropped. **2 gates, seats +0, both ARMS of existing seats** (`G-SHEET-REACH` → LAYOUT G1's occlusion arm; `G-SHEET-GESTURE` → MOTION G-SPRING-HONEST), **14/16 clauses born-RED** at a pristine `git archive HEAD`, the 2 green named as standing locks. **THE C1 TRAP, HIT AND CURED**: a lazy `await import()` inside each clause STILL fails at collection, because vite's static analysis resolves literal specifiers at TRANSFORM time — one load error and "no tests" is ABSENT, not RED; cured by importing the BARREL (which resolves at every tree) and asserting each symbol inside its own clause. **10 mutations, 10 BITE** (4 engine + 6 from the cure round), restores byte-exact. **Verify FULL** (the row deletes a demo story and touches the root barrel — #38's C1 standing rule): vue-tsc 0 · **219 files / 1751 passed + 3 expected fail, twice consecutive** · narrow battery 158 / 1342 + 3 · build + demo:dist:build green, **59** modulepreloads (hard ceiling 60) · receipt **byte-identical** (`seats:60 … bound:8 … unbound:50 … violations:0`, `rosterSha256:dc05df91`). **THE BASELINE WAS NOT CLEAN AND THE CUT MASKS PART OF IT**: `boot-graph` was RED at **61 vs a hard 60** BEFORE this row opened, proven NOT this row's by a pristine `git archive HEAD` build that reads **60**; post-cut it reads 60 again — **that is arithmetic, not a repair**, this deletion's −1 offsetting the uncommitted tabs/slider/alert lane's +1, routed **RT-39A** so no one later reads the green ceiling as evidence. π-39 **OWED, not claimed** — the browser MCP seat is a global singleton and three lanes were live in the shared tree; **P7 (drag+settle ≥55fps) is the size-geometry's falsifier and a miss escalates the wave, no second path** → RT-39B. **BANKED FOR THAT SEAT**: the graded halo's gradient AND mask stops are fixed `40px`/`120px`, and A1 made the box the RUNG — at a peek rung under 120px tall the ramp never completes and the plate reads near-crown throughout (measured: a **94.72px** halo box at the live-behind peek `t = 0.12`); **P3 as worded cannot catch it**, since a fully-crown ramp still resolves `≠ none`. **RT-30C RECEIVED AND RULED, SPLIT** — the flicked dialect's MOTION ships (`projection.ts` integrates the release velocity over the catching spring's settle horizon: a short throw is carried back to its anchor, a long one resolves onto `0`), its INK `blur = k·|v|` is **REFUSED** on three grounds — a per-frame `filter` over the plate spends P7's fps budget a second time in the very window that budget bought, a velocity-coupled blur over a spring already reversing to `0` is two exits on one clock, and `k` has no mechanism of record — with `dissolveGrammar.ts`'s `flicked` row reconciled at the site · **RT-30D REFUSED with its ground** (the detented exit is the same spring reversed to `t=0`; a dissolve composed onto a surface whose extent is already collapsing is two exits on one clock) · **RT-30G discharged as not-applicable** (`.glass-reveal` on the sheet: grep → 0, before and after). **THE CURE ROUND (2026-08-06) also**: put the seam ink at the spec's own α **0.08** via `calc(var(--glass-veil-step) * 2)` (a bare step was 0.04 — a silent halving that parsimony never required, since the doubling mints nothing either) · armed the **live-behind band on the RULE** (`z-index: calc(--z-dock − 1)`, read back at 39 in paint) where only the data attribute had been checked · **gated `useSpringMount` off the detented arm**, so the file's own "ONE spring mount" is true and no second clock runs per-frame against nothing · **shipped A7's fifth affordance**, the ✕, as the SIBLING's control (one unscoped `[data-slot="dialog-close"]` recipe in `dialog/styles.css`) with a sheet-scoped gutter reservation held off the detented arm, unconditional because the sheet carries no `dismiss` axis to gate it against · **struck the deleted `drawer/styles.css` from `color-mix-endpoints.test.ts`'s per-file fence** — a deleted subject filters to `[]` and passes VACUOUSLY, the identical class this cut deleted the immersive-scrim describe over. LOC **2,722 → 1,842 = −880** library-side; 47 tracked files **+612 / −2,823** plus 861 untracked lines. Record: `docs/tranches/BK/execution/2026-08-06-row39-dialog-detent/RECORD.md` | TR#39 → CWT-2 :26-161 | G-SHEET-REACH (LAYOUT G1 occlusion arm) · G-SHEET-GESTURE (MOTION G-SPRING-HONEST arm); seats +0; G-NO-DEAD-REGISTER stays routed to W-GATE-COLLAPSE per §5 |
```

### Ledger entry to append (⊕⁴⁸)

```
**⊕⁴⁸ 2026-08-06 · #39 W-DIALOG-DETENT LANDED.** The drawer folds in whole and the fold is
one sentence: **a detent is a size, not a translate.** F1 (the primary action off-screen at
three rungs of four) and F2 (a drag-to-dismiss whose branch was unreachable for both
shipped ladders, with the comment above it asserting the opposite) are not two cures — they
are two symptoms of one geometry, and sizing the anchored axis off `--detent-t` dissolves
both, plus the frost's moving sample, plus the per-frame `getBoundingClientRect`, plus the
`<Presence>` sever class the old engine existed downstream of.

**THE SELECTION IS THE FIRST FINDING.** The prompt's HEAD was ten entries stale and the
cursor marks NO row in flight — but the shared working tree held three: #32/#33/#35, in new
gate executables naming those rows' own seats (`tabs-seam.test.ts`, `feedback-tint-seam.test.ts`,
`slider/styles.css` written twelve minutes before this cut opened). **IN-FLIGHT must be read
off the tree, not the ledger**; the cursor could not have told anyone, and selecting one of
them would have been a collision.

**THREE CWT-2 INSTRUCTIONS HAD NO SUBJECT AT HEAD** and each was re-derived with its ground
rather than followed into a tree that no longer exists — home `sheet/` (not `dialog/detents/`),
no `detents/context.ts`, no `src/styles/overlay.css`. CWT-2 was authored at `0371836d`, before
#38 split the surface; TR#39 names no home, so the home is derived. **The spec's own §7
rejection of `components/sheet/` fell with its falsifier** when #38 re-seeded it by senior
committed act.

**A FIGURE WAS WRONG TWICE MID-CUT AND WAS CORRECTED AT THE SITE BOTH TIMES.** The projection
first used the spring's exact peak excursion — right physics, wrong question: it carries a
1493 px/s fling **0.041 of a viewport** and FAILS the spec's own 1493-vs-625 acceptance pair.
Replaced by the settle horizon `−ln(b)/(ζω)`. Then the prose claiming that horizon reproduces
the emitted `--spring-*-settle` tokens was ALSO wrong — measured `dock` 0.212 vs 0.21 and
`bloom` 0.394 vs 0.37, because the generator's solve also requires the velocity inside the
band — and the source now states both figures with the reason they differ, while the gate
asserts agreement within 10% rather than identity. A gate that had asserted identity would
have been a false claim wearing a green tick.

**THE C1 TRAP HAS A SECOND HALF NOBODY HAD RECORDED.** #38 ruled reads must be lazy and
inside their clause. That is necessary and NOT sufficient: a lazy `await import()` with a
literal specifier still fails at COLLECTION, because vite resolves it at transform time — one
load error and "no tests", ABSENT rather than RED. The cure is to import a specifier that
resolves at EVERY tree (the barrel) and assert each symbol's presence inside its own clause.

**THE BASELINE WAS NOT CLEAN, AND THIS CUT MASKS PART OF IT.** `boot-graph` read **61 against
a hard 60** before this row touched anything; a pristine `git archive HEAD` build reads 60, so
the +1 is the uncommitted tabs/slider/alert lane's. Post-cut it reads 60 — **arithmetic, not a
repair**: this deletion's module removal offsets their addition, and the regression is now
invisible to the ceiling. Routed **RT-39A**, stated so no one later reads the green as evidence.

**THE CUT WAS ADJUDICATED `CURE-REQUIRED`, AND THE DEFECT IS THE ROW'S BEST LESSON.** A3 —
the living grip, a named ADD under the breath-of-life edict — was **dead in paint**.
`--detent-t` is registered `inherits: false`, which is CORRECT and is kept (a nested sheet
must never take its parent's rung); the scalar was published on the content root alone, and
the rule that reads it is the **grandchild grip's**, where a non-inheriting registered
property computes its `initial-value` forever. The mark sat at a constant 32px at every rung
of every ladder. **The congeal was unaffected — and that is why nobody saw it**: its
`--glass-veil-tier` is DECLARED on the writer element, so `var()` substitutes before
inheritance is ever consulted. One consumer of the scalar was a declaration on the writer,
the other a rule on a reader, and only the second kind dies.

**AND THE GATE LOCKED IT IN.** `sheet-reach.test.ts` asserted the lerp's SOURCE TEXT and the
registration; it never bound the two together. A mutation freezing the lerp to `* 0` — making
explicit what paint already did — passed all 60 gates, and the naive repair
(`inherits: true`) FAILED one. **A prose-vs-paint gate is worse than no gate**: it converts
the defect into a green tick and the fix into a breach. The cure moves the WRITER (the grip
element carries the scalar, because the rules that dereference it are its own), authors the
α leg the spec's P5 always demanded, and adds a clause that asserts writer and reader
together so the freeze bites. Nine further items came in with it — the α leg, the seam ink at
the spec's 0.08 rather than a silently halved 0.04, the live-behind band armed on the rule
instead of the attribute, an idle panel spring silenced on the detented arm, A7's fifth
affordance shipped, a vacuously-green per-file clause pinned to the deleted
`drawer/styles.css` struck, RT-30C ruled, and the record's figure errors struck in place.

Two received routes disposed rather than absorbed by default: **RT-30D REFUSED with its
ground** (a dissolve composed onto a surface whose extent is already collapsing is two exits
on one clock) and **RT-30G discharged as not-applicable** (grep → 0 `.glass-reveal` on this
surface, at HEAD and after). **RT-30C is the third, and it is SPLIT**: the flicked dialect's
motion ships as physics — the projection carries a short throw back to its anchor and a long
one onto `0` — while its ink (`blur = k·|v|`) is refused, because a per-frame `filter` over
the plate spends P7's fps budget a second time in the very window that budget bought, because
a velocity-coupled blur over a spring already reversing to `0` is two exits on one clock, and
because `k` has no mechanism of record. **RT-26F loses a row** — `DRAWER_SNAP` discharged by
subtraction.

π-39 is **OWED and named, not claimed**: the browser seat is a global singleton with three
lanes live in the tree. **P7 is the size-geometry's falsifier — a miss escalates the wave,
there is no second path** → RT-39B. The cure round's own live pass took the seat for the grip
cells only, on its own server, and banked one further item for π verbatim: **the graded
halo's gradient and mask stops are fixed `40px`/`120px` and A1 made the box the RUNG**, so at
a peek rung under 120px tall the ramp never completes and the plate reads near-crown
throughout — measured at a **94.72px** halo box on the live-behind peek. **P3 as worded
cannot catch it**: a fully-crown ramp still resolves `≠ none`.

Verify FULL (the row's own standing rule, #38's C1): vue-tsc 0 · **219 files / 1751 + 3
expected fail, twice consecutive** · **59** modulepreloads (ceiling 60) · receipt byte-identical · exports
68 → 67, `EXACT REPRODUCTION: YES` · 2 gates, **seats +0**, 14/16 born-RED, 10 mutations 10
bite (4 engine + 6 cure). LOC **−880** library-side. Record:
`docs/tranches/BK/execution/2026-08-06-row39-dialog-detent/RECORD.md`.

**Φ5 procession: next = re-scout.** #39 unblocks nothing new — no DAG row deps it — so the
frontier moves only by its own removal. #21 stays gated on `#17` (hard, and #17 is
Φ4-UNSTARTED); #25 stays parked on its rides-clause; **#32 · #33 · #35 were IN-FLIGHT IN THE
WORKING TREE at this cut and #34 sequences behind #33** — the next scout re-reads `git status`
as well as the cursor, because this row's own §0 is the proof that the cursor alone cannot
show a lane that has not committed yet.
```

---

## B · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:189` — append to the row-39 cell

Current: `| 39 | W-DIALOG-DETENT (cut 2) | CWT-2 :26-161 | Φ5 | after #38; carries the drawer MERGE-INTO |`

Append to the last column, after `carries the drawer MERGE-INTO`:

```
 ⊕⁴⁸ **LANDED 2026-08-06** (record `docs/tranches/BK/execution/2026-08-06-row39-dialog-detent/RECORD.md`): **`drawer/` DELETED WHOLE** — 12 files, **1,640 ln** measured at `51cfdfaf` (§8's tokenized 1,613 was taken at `0371836d`; the tree moved, the figure is restated, the verdict does not) — and the family becomes two props on the surface it duplicated: `<SheetContent :detents v-model:detent>`. **A detent is a SIZE**, and F1 + F2 dissolve into that one change rather than being separately cured. **THREE §3.3/§7 INSTRUCTIONS RE-DERIVED with grounds**, all three because CWT-2 predates #38's split of `<DialogContent placement>`: home is **`sheet/`** (§7's `components/sheet/` rejection rested on three retirement records #38 overturned by a senior committed act) · **no `detents/context.ts`** (half its merge was deleted by #38; the other half plumbed a boundary that no longer exists) · **no `src/styles/overlay.css`** (F15's defect was the zero-consumer stylesheet + global `@import` lane, which this cut CLOSES; the scrim law lands as `scrimDetentOpacity` beside its sibling in `motion.ts`). §3.4's `4/20/12` chrome gaps **yield to #38's landed sibling** — the sheet composes the same `Dialog*` leaves, and a second ladder for the same elements IS F13. §3.6's registers ride `springPreset("bloom")` / `springPreset("dock")` from the canon, never a literal. **§3.6's velocity projection, with a figure corrected TWICE at the site**: the exact peak-excursion form is right physics for the wrong question (a 1493 px/s fling carries **0.041 of a viewport**, failing the spec's own 1493-vs-625 pair), replaced by the settle horizon `−ln(b)/(ζω)`; and the horizon does **NOT** reproduce the emitted settle tokens — `dock` 0.212 vs 0.21, `bloom` 0.394 vs 0.37 — so the source states both and the gate asserts agreement within 10%, not identity. §3.5's congeal is a CROWN→SHEET lerp on the ONE `--glass-veil-tier` seam, **0.18 at `t = 0` → 0.22**, monotone, no terminal opaque arm, P2's ≤0.10 true by construction; the `t = 0` anchor is RULED, not conceded — this cut makes `0` a legal rung, and a `[0.25,0.4,0.7,1]` ladder paints 0.19 → 0.22. §3.7's grip carries the ladder in its width on `--spring-dock`; its hover is scoped to the handle region against a shipped rule that moved the mark **from 456px away**. §3.2's `modal:false` is **reka's own** (its `DialogOverlay` renders a comment node when non-modal — verified in source), so no `mode` enum returns; the band is `[data-modal=false] { z-index: calc(--z-dock − 1) }`. **§5's two gates AUTHORED AS ARMS, seats +0** — G-SHEET-REACH → LAYOUT `G1`'s occlusion arm, G-SHEET-GESTURE → MOTION `G-SPRING-HONEST` — **14/16 born-RED** at a pristine `git archive HEAD`, the 2 green named as standing locks, **10 mutations 10 BITE** (4 engine + 6 cure). §5's G-NO-DEAD-REGISTER stays routed to W-GATE-COLLAPSE; this cut's dead-selector sweep is what it would have caught (`a11y-fallback.css` ×3 · the `scheme-motion.css` tempo pin · the 4-clause immersive-scrim describe **DELETED not re-pointed**, which also retires **the last `backdrop-filter` on any scrim in the library**). §STRIKE's K22 executed as **one merged route** (`/containers/drawer` 376 ln → `/containers/sheet`). Exports **68 → 67**, `EXACT REPRODUCTION: YES`. **π-39 OWED, not claimed** (browser seat is a global singleton; three lanes live in the tree) — **P7 is §3.1's stated falsifier and a miss escalates the wave** → RT-39B. **RT-30D REFUSED with its ground** · **RT-30G discharged not-applicable** (grep → 0) · **RT-26F loses `DRAWER_SNAP` by subtraction** · **RT-39A**: `boot-graph` was RED at 61 vs a hard 60 BEFORE this row opened (pristine HEAD reads 60 — the +1 is the tabs/slider/alert lane's) and post-cut reads 60 again, which is **this deletion's arithmetic offsetting their addition, not a repair**. Verify **FULL** (#38's C1 rule — a deleted demo story + the root barrel): vue-tsc 0 · **219 / 1751 + 3 expected fail, twice consecutive** · narrow 158 / 1342 + 3 · **59** modulepreloads (hard ceiling 60) · receipt byte-identical (`seats:60 … bound:8 … unbound:50 … violations:0`). LOC **2,722 → 1,842 = −880**.
```
