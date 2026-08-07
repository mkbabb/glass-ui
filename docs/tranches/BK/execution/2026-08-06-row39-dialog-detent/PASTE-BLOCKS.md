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

---
---

# CURE II (π-39 escalation) — 2026-08-07 · banked blocks

**SHA placeholder — RESOLVED at ⊕⁵⁰ to `c29574cb`.** This seat did not commit (SHARED-TREE
LAW), so ~~the commit hash is written as the literal `<SHA>` below and the driver substitutes
it~~ — the driver landed **rounds I and II as ONE commit**, `c29574cb`, and the blocks below
carry that hash. Stated here so no reader takes the substitution for a re-draft, and so no
reader looks for a separate round-I commit that never existed.

Commit target: `fix(sheet): cure π-39's two REDs — the region is the remainder, the sampler's
box is constant`. **Landed as** `fix(sheet): BK #39 π-cure rounds I+II — the rung floors at
the chrome, the frost is real`.

**SCOPE THE COMMIT — narrower than the landing's.** This cure touches **two source-tree files
only**: `src/components/sheet/styles.css` and `tests/components/sheet/sheet-reach.test.ts`,
plus this row's own `docs/tranches/BK/execution/2026-08-06-row39-dialog-detent/**`. **Take
nothing else.** The tree now holds at least FOUR foreign uncommitted lanes — #32 (`tabs/*`,
`morph/*`), #33 (`alert/*`), #35 (`slider/*`), and **#40 W-PAGER** (`pager-dots/*`,
`carousel/*`, `deck/*`, `sortable-list/*`, `useLeadTrail.ts`, and a `package.json` with
`embla-carousel` struck from three sections and **no lockfile regeneration**, which BLOCKS
`npm run build` — see RT-39D). `package.json` and `package-lock.json` are **NOT** this row's.

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — append to the row-39 cell

```
 · **CURE II (π-39 escalation) `c29574cb` 2026-08-07 — P1 DISCHARGED, P7 NOT.** π-39 returned two outcome-changing REDs and the wave's own §3.1 rules that a P7 miss ESCALATES it. **P1 is cured and re-measured green at all four cells.** Its cause was one line: the detented region claimed `block-size: 100%` — the WHOLE content box — while sitting BELOW the 44px grip handle in the root's normal flow, so the flow ended exactly one handle past the sheet's own edge and took the footer with it (footer `bottom` **923** against a 900 viewport at every rung, **1018.42** at the live-behind peek, 875 vs 844 at 390, with `contain: paint` destroying 24 of the footer's 53px). The root is a **two-row grid** now (`auto minmax(0,1fr)`) and the region is the REMAINDER, which is what it always meant; inside it the three-row grammar becomes `minmax(0, auto) minmax(0, 1fr) auto` with `align-content: end`, so a rung too short for the sheet's intrinsic chrome loses **the CROWN and never the action** — the header yields first and clips its own overflow, the footer's end stays on the region's end, and the footer's `rect.bottom` is the sheet's inner edge by construction. **Re-measured on the BUILT demo, Chrome 150, own port :5677:** footer `bottom` **879** vs 900 at all four rungs of `[0.25,0.4,0.7,1]` AND at all three of `[0.12,0.5,1]` (the peek **1018.42 → 879**), **831** vs 844 at all four rungs of 390×844, and `elementFromPoint` identity **`false` → `true`** at every rung of both ladders and both viewports; region `bottom` = content-box bottom = footer `bottom` = 879, `OVERFLOW_PAST_CONTENT_BOX` **0**. **The apparatus is controlled**: π-39's own geometry, re-injected at a specificity that beats the shipped `:where()` rules, reproduced **923** to the digit in the same session. **P7 IS NOT CLEARED AND IS NOT STRUCK.** Its baseline **does not reproduce at the cure seat**: the identical gesture on the identical PRE-cure bytes reads **98.04 fps median, 0% under 55** — and π-39's decisive halo `display:none` differential (**59.88 vs 30.49**) collapses to **98.04 vs 98.04**. Controls: a full-viewport `blur(200px)` invalidated every frame also reads 98.04, while a deliberate 25 ms main-thread block reads **45.05 fps / 100% under 55** — the probe is live, the cell has no headroom. π-39 ran a **60 Hz** session with three lanes live in the tree; this one is **~98 Hz** with a second page open in the same browser, which is the house's own **browser-seat singleton** hazard in one figure. The cure is applied **on the named mechanism only**: the graded halo was `inset: 0` inside a box whose extent IS `--detent-t`, so a drag re-derived a `1438 × N` `backdrop-filter: blur(34px) saturate(1.5)` region every frame; each side now pins the sampler to the **viewport-facing edge its ramp is anchored at** and gives it the largest extent it can need (`100dvh`/`100dvw`), releasing the opposite inset — the box's geometry is invariant across the whole rung range, only the root's paint clip moves, and the surplus always runs **away from the viewport**, off-screen behind the anchored edge where `contain: paint` cuts it. **Identity is proved, not assumed**: the stops are absolute pixels from that same edge and the trailing `100%` resolves at or beyond the `120px` full-depth stop either way, so the mask is the identical function of distance-from-edge over the visible interval — measured at the peek, halo `top` **793** before and after, painted **RMSE 0.00422** against a **0.00357** noise floor from two consecutive frames of the animating page. Four sides read at both ends of the ladder, box **constant** (`1438×900` block, `1440×898` inline). A `translate`-driven reveal was **refused**: it would put a `translate:` declaration inside a `[data-detents]` rule, which `G-SHEET-REACH`'s "never translates a detented sheet" clause forbids and is right to. Suppressing the blur during a drag is a masking fallback, refused outright. **Second instrument, since fps has no signal here**: an A/B/A/B trace of the same gesture puts every per-frame counter's shipped↔cured difference INSIDE its own repeat-to-repeat spread (Paint 0.102/0.099 vs 0.097/0.095 ms, RasterTask 0.038/0.035 vs 0.035/0.035, GPUTask 0.930/0.907 vs 0.874/0.940) — **no cost and no benefit measurable at this seat**, longest `RunTask` 4.70 ms against π-39's 25.73. **P7's verdict is OWED to a session that first reproduces π-39's own differential** — if halo-off does not separate from halo-on, the cell is not the cell (**RT-39C**). **Gate clauses `G-SHEET-REACH` 9 → 11, seats +0**, both arms of the existing executable: the root's two rows + no `block-size: 100%` on the region, and the sampler's box constant with **no `--detent-t` in it at all**. **Battery 10 → 13 mutations, 13 BITE** — Y1 (the π39-R2 defect re-applied whole), Y2 (`align-content: end` → `stretch`), Y3 (the π39-R1 mechanism re-applied to the sampler), each killing exactly its own clause; M2/X5/X1 re-run and still biting; every restore from a scratch copy, `shasum -a 256 -c` byte-identical. **One clause AMENDED rather than left stale**: the three-row clause asserted the very grammar π-39 measured RED, and now asserts the shipped one, with the mechanism it guarded vacuously picked up by the new root clause. **Verify**: vue-tsc 0 · sheet+dialog+styles **425 passed | 2 expected fail**, the single failure `stacked-url-filter`'s own header naming **#40 W-PAGER** as its owner · gates+narrow **523 passed**, all 5 failures FOREIGN and each named (`pager-dots.contract.test.ts` absent ×3, `overfit-structure`'s three unreachable exports, the flipped BORN-RED) · `boot-graph` **14/14, ceiling 60 held** · `demo:dist:build` exit 0. **`npm run build` is BLOCKED at HEAD's own bytes** by #40's uncommitted `package.json`/lockfile mismatch — **RT-39D** — so the library build could not be run and the paint re-take is on `demo:dist:build`'s bytes. **Files: TWO in the source tree** (`sheet/styles.css` +36 this seat, `sheet-reach.test.ts`); no shared file touched. **The P1 geometry hunks were found ALREADY UNCOMMITTED in the shared tree at open** (mtime 2026-08-06 20:13) **and RED against their own gate** — adopted, verified in paint, gate cured; `SheetContent.vue` unchanged from `336dacf9`. Record: `RECORD.md` §10
```

### Ledger entry to append

```
**⊕ 2026-08-07 · #39 W-DIALOG-DETENT · CURE II (π-39 escalation) `c29574cb`.** π-39 came back
with two outcome-changing REDs. One is cured. **The other could not be measured, and saying
so is the entry.**

**P1 — cured, and its cause was smaller than its symptom.** The detented region took
`block-size: 100%` while sitting below the 44px grip handle in the root's flow, so the
percentage resolved against the WHOLE content box and the flow ran exactly one handle past
the sheet's own edge — footer `bottom` **923** against a 900 viewport at every rung, and
`contain: paint` destroyed 24 of its 53px so the evidence was clipped along with the button.
The root is two rows now and the region is the remainder; the three-row grammar inside it
puts the header on `minmax(0, auto)` against the footer's bare `auto`, with
`align-content: end`, so **what a short rung loses is the crown, never the action.**
Re-measured: **879** vs 900 at every rung of both ladders (the peek **1018.42 → 879**),
**831** vs 844 at 390, identity `false → true` throughout. π-39's own geometry re-injected
into the same session reproduced **923** to the digit, so the delta is the cut's.

**P7 — NOT REPRODUCED, and therefore not cured and not struck.** The identical gesture on the
identical PRE-cure bytes reads **98.04 fps median, 0% under 55** at this seat, and π-39's
decisive halo-`display:none` differential — **59.88 vs 30.49**, the figure its whole cost
attribution rests on — collapses to **98.04 vs 98.04**. A full-viewport `blur(200px)`
invalidated every frame also reads 98.04; a 25 ms main-thread block reads **45.05 fps**, so
the probe is live and the cell simply has no headroom. π-39 measured a **60 Hz** session with
three lanes live in the tree; this is a **~98 Hz** one with a second page open in the same
browser. **That is the house's browser-seat singleton law showing up as a verdict**, and it
is the reason a π cell needs an EXCLUSIVE browser and not merely a distinct port.

**The cure ships anyway, on the mechanism, and says exactly that much.** The graded halo was
`inset: 0` inside a box whose extent IS the rung, so a drag re-derived a viewport-wide
`backdrop-filter` region every frame; it is now pinned to the viewport-facing edge its ramp is
anchored at, given the largest extent it can need, with the surplus running off-screen behind
the anchored edge where `contain: paint` cuts it. **Identity is proved before it is claimed** —
absolute-pixel stops from an unmoved edge, the trailing `100%` at or beyond the `120px` stop
either way, RMSE **0.00422** against a **0.00357** noise floor at the peek. A `translate`
reveal was refused because `G-SHEET-REACH` forbids a `translate:` on this arm and is right to;
suppressing the blur mid-drag is a masking fallback. An A/B/A/B trace puts every per-frame
counter's difference inside its own repeat spread: **no cost and no benefit measurable here.**

**The discipline this entry is really about.** Every P7 cell came back green — both bands, the
rest residual, all of it — and every one of them is green on the PRE-cure bytes too. Striking
the row on those numbers would have been the vacuous-verdict class this tranche keeps
catching, one round after π-39 itself condemned three byte-identical Safari screenshots for
the same reason. **P7 stays RED with its cure attached and its precondition written down:
reproduce the differential first, or the cell is not the cell (RT-39C).**

Gates **9 → 11 clauses on `G-SHEET-REACH`, seats +0**. Battery **10 → 13 mutations, 13 BITE**
(Y1/Y2/Y3, each re-applying a cured defect; M2/X5/X1 re-run). One clause **amended rather than
left stale**: the three-row clause was asserting the exact grammar π-39 measured RED. Two
source files touched, no shared file. **`npm run build` is BLOCKED at HEAD by #40 W-PAGER's
uncommitted `package.json`/lockfile mismatch (RT-39D)**, and five gate failures in this tree
are that lane's — each named at `RECORD.md` §10.4 so nobody attributes them here.
```

## B · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:189` — append to the row-39 cell

```
 · **CURE II 2026-08-07 (`c29574cb`)** — π-39's two REDs dispositioned honestly and differently.
**P1 DISCHARGED**: the region claimed the whole content box from below the 44px handle, so the
flow ended one handle past the sheet's edge (footer `bottom` 923 vs 900 at every rung, 1018.42
at the peek, 24px of it destroyed by `contain: paint`); the root is a two-row grid now and the
region is the remainder, with `minmax(0, auto)` on the header and `align-content: end` so a
short rung loses the crown and never the action — re-measured **879 vs 900** at every rung of
both ladders, **831 vs 844** at 390, `elementFromPoint` identity **true** throughout, with
π-39's own geometry re-injected in the same session reproducing 923 as the control.
**P7 NOT CLEARED, NOT STRUCK**: its baseline does not reproduce at the cure seat (98.04 fps
median on the PRE-cure bytes; the halo `display:none` differential collapses from 59.88-vs-30.49
to 98.04-vs-98.04; a 25 ms main-thread block still reads 45.05 fps, so the probe is live and the
cell has no headroom) — a ~98 Hz session against π-39's 60 Hz one, with a second page open in the
same browser, i.e. the browser-seat singleton hazard as a verdict. The cure ships on mechanism
only: the graded sampler's box no longer re-derives from the rung — pinned to the viewport-facing
edge its ramp is anchored at, given the largest extent it can need, surplus off-screen behind the
anchored edge under `contain: paint` — proved identity-preserving by absolute-pixel stop
arithmetic and measured at RMSE 0.00422 against a 0.00357 noise floor. **RT-39C** carries the
owed verdict with its precondition (reproduce the differential first). `G-SHEET-REACH` 9 → 11
clauses, seats +0; battery 10 → 13 mutations, 13 BITE; two source files touched, none shared;
`npm run build` BLOCKED at HEAD by a foreign `package.json`/lockfile mismatch (**RT-39D**), and
five gate failures in this tree belong to #40 W-PAGER (**RT-39E**).
```

---
---

# CURE II · ROUND II (the driver's `CURE-MORE`) — 2026-08-07 · banked blocks

**SHA placeholder — RESOLVED at ⊕⁵⁰ to `c29574cb`.** This seat did not commit (SHARED-TREE
LAW), so ~~the commit hash is written as the literal `<SHA>` below and the driver substitutes
it~~ — the driver landed rounds I and II as ONE commit, `c29574cb`, and the blocks below carry
that hash. **These blocks SUPERSEDE the cure-II blocks above** — take these, not those: two of
that round's claims are struck by measurement. **⊕⁵⁰ took these**, with a bridging preamble
naming what round I still stands on, because ONE commit carries both rounds and the cursor
cell has to read as one landing.

Commit target: `fix(sheet): cure π-39 round II — the rung is floored, the sampler leaves the
surface and the frost is real in paint`.

**SCOPE THE COMMIT — two source files and this row's docs.**
`src/components/sheet/styles.css`, `src/components/sheet/SheetContent.vue`,
`tests/components/sheet/{sheet-reach,sheet-graded-edge}.test.ts`, and
`docs/tranches/BK/execution/2026-08-06-row39-dialog-detent/**`. **Take nothing else.** The tree
holds at least FIVE foreign uncommitted lanes — #32 (`tabs/*`, `morph/*`), #33 (`alert/*`),
#35 (`slider/*`), #40 (`pager-dots/*`, `carousel/*`, `deck/*`, and a `package.json` with
`embla-carousel` struck from three sections and no lockfile regeneration — RT-39D), #41
(`sortable-list/*`). `package.json` and `package-lock.json` are **NOT** this row's.

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — append to the row-39 cell

```
 · **CURE II ROUND II `c29574cb` 2026-08-07 — the driver ruled cure-I `CURE-MORE`, and two of its own claims do not survive contact with a bar that can fail.** **R2-1: THE CLAMP WAS A MASK.** Round I's P1 strike rested on `rect.bottom`, which `overflow: hidden` + `align-content: end` pin to the region's end whether or not one pixel of the action paints — measured on those very bytes, the action is **45% clipped at a 900 viewport and 81% clipped at a real 780 one** while the figure reads green. The rung is FLOORED now: *a resting rung can never be smaller than the smallest honest sheet*, spelled in the tokens the chrome is built from (plate padding + its inner edge + the grip's row + the region's two gutters + the crown's SEAM + the body's last line + the footer's seam + an action at least `--touch-target`), so it transposes one rung down at mobile for free; `0` stays legal as the dismissal endpoint and the exit is the unmount. **`min-content` was tried FIRST and is struck with its figure**: under an intrinsic constraint a `1fr` row resolves to its item's MAX-content contribution, so `min-content` reads the sheet's NATURAL height — **447.23** on a 780 viewport, which floors rungs 0.25 AND 0.4 onto one box and destroys the ladder it was meant to protect. **The crown is in the floor for its SEAM only** — a header yields its content to zero but still draws its rule; without that term the tracks out-summed the region by **9px** and the seam painted back across the grip. Re-measured on the PROMISE (the action's visible fraction + 5-point identity inside its own radius + every ancestor clip + the region's start-overflow): action `visible` **1.0000**, identity **true**, start-overflow **0** at every rung of BOTH ladders at **1440×780, 1440×768, 1440×900** and on the **390×844** detented ladder; floor measures **206.9** desktop / **171** at 390, and only sub-chrome rungs move. **R2-2: THE YIELD ORDER RAN BACKWARDS AGAINST ITS OWN COMMENT** — `minmax(0, 1fr)` gives the body a base of ZERO and grid feeds intrinsic tracks before flexible ones, so the header grew to its full 84.42 while the body was **0px** and no content row rendered at t=0.25. The body row is `minmax(1lh, 1fr)`: **27.9px of body at every floored rung**, header 16 against an intrinsic 84.42 — the crown yields, as the grammar always claimed. **R2-3: the `scroll` prop was silently DEAD on the detented arm** (the cure's `overflow: hidden`, same (0,0,0), later in source, beat `[data-scroll]`'s own `overflow-y`); the floor makes the clip unnecessary and it is struck, so the arm resolves again with no unreachable start overflow. **R2-4:** eight sampler rules computed **(0,1,0)** against a file header promising (0,0,0) — every compound is fully inside `:where()` now — and the released insets were LOGICAL on a PHYSICAL box (±865px off its own edge under `direction: rtl`), so they are `top/right/bottom/left` + `height/width`. **R2-5 IS THE HEADLINE AND IT IS BIGGER THAN THE ROW: THE MATERIAL WAS DEAD IN PAINT ON BOTH ARMS.** Measured with a 24px-period field behind the sheet, amplitude = the 24px bin of each row's luminance: bare field **162.45**, plate alone **120.41**, and the sampler as shipped **86.64 → 81.55 FLAT** across the ramp's whole 120px depth. With the plate made transparent the sampler reads **162.45** — its `backdrop-filter` lands **NOTHING AT ALL**; the 89.19 it did paint is the plate's own α 0.26 applied twice, i.e. the "nested second plate" its comment claimed it avoided. **THE CAUSE IS NAMED AND ISOLATED**: not the mask, not `contain`, not `isolation`, not `z-index` (each released, each changed nothing — `isolation:auto` + `contain:none` together still read 162.45), but **the plate's OWN recipe** — `.glass-floating` carries a `plus-lighter` specular pseudo and a `soft-light` grain pseudo, and a descendant with a blend mode makes its parent an ISOLATED GROUP, so no child can ever sample the page. The decisive control: set those two pseudos to `mix-blend-mode: normal`, change nothing else, and the shipped child's blur springs to life at **0.16 → 0.14**. **The cure moves the sampler OUT of the surface** — a portal-level SIBLING taking the surface's own box by anchor positioning, one box law for both arms and all four sides, tracking the plate at every rung and through the slide with no second size law and no geometry read in JS — and the designed ramp is real for the first time: **79.57 → 66.26 → 0.00** at the mask's 120px stop, monotone, flat 0.00 beyond. **The plain sheet had the identical disease** (57.97 → 44.60) and takes the identical cure. Two consequences carried: the sampler needs the content's own present-condition (a portal sibling is outside reka's `<Presence>` and rendered unguarded painted one sampler per MOUNTED sheet, each anchoring to whichever surface preceded it), and it is authored AFTER the surface because anchor positioning only looks backward. **π39-R3 falls out DISCHARGED at rest**: the floor plus the constant box put the 120px stop inside every resting rung — re-measured at the same peek, **82.89 → 0.01**. **R2-6: "the cell has no headroom signal at all" is FALSE and struck.** The probe was GPU-blind because the session was unloaded; the knee sits between **N=4 (91.74 fps)** and **N=8 (25.13)**. Biased at N=5, **π-39's own attribution REPRODUCES** — sampler-off **48.54/48.78** vs sampler-on **34.60/34.25** — so RT-39C's precondition is MET at a biased cell. Two corrections follow: **CURE-P7's constant box measures NOTHING** (33.78/33.56 with the box back on the rung, inside the repeat spread) and is kept only for being harmless and identity-preserving; and **`backdrop-filter: none` recovers the same ~14 fps as deleting the sampler entirely**, i.e. **the pre-cure bytes paid a full backdrop-filter and got no material for it** — this cure buys the material at a price the library was already paying. The source comment claiming the sampler's "geometry is invariant" is struck: only the SIZE is constant, the box translates with the anchored edge, and the record now carries that. **P7 stays RED and OWED unbiased — RT-39C.** **R2-7: the record is corrected at its sites** — §10.5's "the action and the ✕ both whole and hit-testable" STRUCK (the ✕ was; the action was not), PI-39 §0's "identity true at every rung of both ladders and both viewports" STRUCK, P3 RE-WORDED to measure PAINT by the stripe method because as worded it could never see this defect, and the congeal's arm named (0.18→0.22 is LIGHT; the dark arm measured is 0.22→0.26). **THE 390×844 LIVE-BEHIND LADDER, MEASURED FOR THE FIRST TIME, FAILS — and it is not this cure's**: the action is 100% painted and hit-testable at NONE of its three rungs, occluded by the demo's own bottom dock (y **766.5–832** against an action at **771–831**). The live-behind band is working as designed (the sheet bands UNDER dock chrome by law); what nobody had measured is that on a short viewport the chrome it defers to lands ON its primary action. The modal ladder is clear at the same viewport. **RT-39F**, no identity claim made, no strike taken. **Gates: `G-SHEET-REACH` 11 → 15 clauses and `SheetContent graded edge` 4 → 5, seats +0**, all arms of existing executables; **10 born-RED against the round-I bytes** (scratch-copy revert, `shasum -a 256` byte-identical on restore), 42 green after. Two clauses AMENDED rather than left stale — the constant-box clause to the physical grammar, and two graded-edge clauses off a parent-child relationship paint has now disproved. **Verify**: vue-tsc **0** · sheet suites **42 passed** · gates+narrow **528 passed**, **5 failures ALL FOREIGN and each named** (`gate-register` ×3 on #40's absent `pager-dots.contract`, `overfit-structure` on the morph lane's `LEAD_TRAIL_TAU_E_S`/`trailOffset`, `stacked-url-filter`'s flipped BORN-RED which its own header assigns to #40) · `boot-graph` **14/14, ceiling 60 held** · `demo:dist:build` exit 0. `npm run build` still BLOCKED at HEAD by #40's `package.json`/lockfile mismatch (**RT-39D**), so the paint re-take is on `demo:dist:build`'s bytes, served from a port this seat owns (**:5822**, never :5400/:5731/:5911/:5677) and killed on exit. **THE BROWSER-SEAT SINGLETON BREACHED THIS SEAT TWICE MID-RUN** — a foreign agent navigated this seat's own tab to `:5411/data/timeline` and later opened an isolated context on this seat's port; every figure above survived only because each probe self-guards on `location.port`. **NEW ROUTE RT-39G, LIBRARY-WIDE**: any `backdrop-filter` on a CHILD of a `.glass-*` plate is dead in paint for the same reason this one was — the specular and grain pseudos isolate every glass surface. Record: `RECORD.md` §11
```

### Ledger entry to append

```
**⊕ 2026-08-07 · #39 W-DIALOG-DETENT · CURE II ROUND II `c29574cb`.** The driver ruled cure-I
`CURE-MORE` and was right twice over. **A green figure is not a green promise, and a computed
style is not a material.**

**P1's cure had made its own bar unfalsifiable.** `overflow: hidden` + `align-content: end`
pin the footer's `rect.bottom` to the region's end whether or not one pixel of the action
paints — so the round-I strike was taken while the action was **45% clipped at 900 and 81%
clipped at a real 780**. The rung is floored at the chrome now, in the chrome's own tokens,
and the re-take measures the PROMISE instead of the proxy: the action's visible fraction
**1.0000** and five hit-test points **true** at every rung of both ladders on 780, 768, 900 and
the 390 detented ladder, start-overflow **0**. Two arithmetic findings came out of building it
and both are banked, because both are the kind of thing that looks right and is not:
`min-content` reads the sheet's NATURAL height (447.23 at 780) and would have floored two rungs
onto one box; and the crown, which yields its content to zero, still draws a seam — forget it
and the tracks out-sum the region by 9px and paint back across the grip.

**THE MATERIAL WAS NEVER THERE.** The graded halo's `backdrop-filter` landed **nothing at
all** — with the plate made transparent the stripe field reads **162.45**, the bare-field
figure, through a `blur(34px) saturate(1.5)` that computed style reported faithfully the whole
time. What painted was a masked gradient tint plus a second copy of the plate. The cause is not
the mask, not `contain`, not `isolation`, not `z-index` — each was released and each changed
nothing. **It is the plate's own material**: the glass recipe carries a `plus-lighter` specular
pseudo and a `soft-light` grain pseudo, and a descendant with a blend mode makes its parent an
isolated group, so no child of any glass surface in this library can sample the page. Set those
two pseudos to `normal` and the shipped child's blur springs to life; that is the whole
diagnosis in one control. The sampler is a portal SIBLING now, anchored to the surface's own
box, and the designed crown → deep-frost ramp is real in paint for the first time: **79.57 →
0.00** at the mask's 120px stop. The plain sheet had the same disease and takes the same cure.
**RT-39G** carries the sweep, because this row's sampler is one instance of a library-wide law.

**P7's cell was blind, not quiet.** "No headroom signal at all" was measured on an unloaded
session; the knee sits between N=4 and N=8 halo-equivalents. Loaded to N=5, **π-39's own
attribution reproduces** (sampler-off 48.5 vs sampler-on 34.3) — and the same probe convicts
the round-I cure it motivated: the constant box measures **nothing** against the rung box.
Worse and better at once, `backdrop-filter: none` recovers the same ~14 fps as deleting the
sampler outright, which means **the pre-cure bytes were paying the full price of a backdrop
filter and getting no material for it.** This cure buys the material at a price already paid.
P7 stays RED and OWED unbiased (**RT-39C**), with its precondition now demonstrably satisfiable.

**And the cell nobody had measured, measured.** The 390×844 live-behind ladder — the one PI-39
§0 claimed was green — fails: the action is 100% painted and hit-testable at none of its rungs,
under the demo's own bottom dock. The band law is right (a live-behind sheet must never cover
dock chrome); what it never accounted for is that on a short viewport the chrome it defers to
lands on its own primary action. Pre-existing, not this cure's, **RT-39F**, and no strike taken.

Gates **11 → 15** on `G-SHEET-REACH` and **4 → 5** on the graded-edge suite, seats **+0**;
**10 born-RED** against the round-I bytes, 42 green after; two clauses amended rather than left
stale, including two that asserted a parent-child relationship paint has now disproved. Verify:
vue-tsc 0 · 528 passed with **five FOREIGN failures each named** · `boot-graph` 14/14 ·
`demo:dist:build` green; `npm run build` still blocked at HEAD by #40's lockfile mismatch
(RT-39D). **The browser-seat singleton breached this seat twice mid-run** — a foreign agent
navigated this seat's own tab away, and later opened an isolated context on its port. Every
figure here survived only because each probe self-guards on `location.port`. That guard is not
paranoia; it is the difference between a measurement and a story.
```

## B · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:189` — append to the row-39 cell

```
 · **CURE II ROUND II 2026-08-07 (`c29574cb`)** — the driver's `CURE-MORE`, discharged, and two
cure-I claims struck by measurement. **P1's bar could not fail**: `align-content: end` pins the
footer's `rect.bottom` with the action 45% clipped at 900 and 81% at a real 780, so the rung is
FLOORED at the chrome in the chrome's own tokens (`min-content` tried first and struck — it
reads the sheet's NATURAL height, 447.23 at 780, and floors two rungs onto one box; the crown
is in the sum for its SEAM, whose omission cost a 9px overflow across the grip). Re-measured on
the promise: action `visible` **1.0000**, 5-point identity **true**, start-overflow **0** at
every rung of both ladders on 780/768/900 and the 390 detented ladder. **THE MATERIAL WAS DEAD
IN PAINT ON BOTH ARMS** — the sampler's `backdrop-filter` landed NOTHING (86.64 → 81.55 flat;
**162.45**, the bare-field figure, once the plate is made transparent), because the plate's own
`plus-lighter`/`soft-light` pseudos make every glass surface an isolated group and no child can
sample the page. Isolated by control (pseudos → `normal` revives it); cured by moving the
sampler OUT to a portal sibling anchored to the surface's box, and the designed ramp is real:
**79.57 → 0.00** at the mask's 120px stop. π39-R3's truncation falls out DISCHARGED at rest.
**P7's "no headroom" struck** — the knee is between N=4 and N=8; biased to N=5 π-39's own
differential REPRODUCES (48.5 vs 34.3) while the round-I constant-box cure measures NOTHING,
and removing the filter recovers as much as removing the sampler, i.e. the pre-cure bytes paid
for a material they never got. P7 stays RED and OWED (**RT-39C**). Also cured: the `scroll`
prop was dead on the detented arm (R2-3), the yield order ran backwards against its own comment
(R2-2 — body 0px at t=0.25, now 27.9), eight sampler rules computed (0,1,0) and released
logical insets on a physical box (R2-4). **NEW: RT-39F** (at 390 the demo's dock occludes the
live-behind action at every rung — the ladder PI-39 claimed green and nobody had measured;
pre-existing, not this cure's) and **RT-39G** (library-wide: no child of a `.glass-*` plate can
carry a working `backdrop-filter`). Gates 11 → 15 and 4 → 5, seats +0, **10 born-RED**; verify
vue-tsc 0 · 528 passed with five FOREIGN failures each named · boot-graph 14/14 ·
`demo:dist:build` green · `npm run build` still blocked by #40 (RT-39D). Record: `RECORD.md` §11.
```
