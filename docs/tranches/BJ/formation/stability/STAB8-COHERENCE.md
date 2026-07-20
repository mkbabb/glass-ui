# STAB8 — COHERENCE lens (BJ formation-close gate, round 8)

- **Verified model:** `claude-fable-5` — read verbatim from this seat's system context ("The exact
  model ID is claude-fable-5").
- **Date:** 2026-07-20. **Read at committed HEAD `c870d344`** *with the working tree's uncommitted
  STAB7 fix set applied* (8 modified files + 3 untracked stability/coordination drops; `git status`
  recorded below). The STAB7 cures are the corpus an opus fixer would edit next, so they are judged
  as corpus, not as HEAD-history. **This is stated because it matters:** six of STAB7's ten findings
  are cured on disk but not in any commit — a reader at bare `c870d344` sees the pre-cure text.
- **Posture:** the corpus was assumed incoherent/incomplete until proven otherwise. All nine
  `waves/BAND-*.md` + `APOTHEOSIS.md`, `PLAN.md`, `ASK.md`, `ASK-REDUCTION.md`,
  `LEAD-AMENDMENT-LEDGER.md` (incl. §J1-J5 and the new §K1-K8), the freshest REFABLE sidecars
  (RU-20 / RU-29 / RU-26-DESIGNSYNC), `redress/JUDGE.md`,
  `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md`, and the IOS27-MICRO `FINAL/` pair were read in
  full before judging. Every anchor cited in a finding was re-proven on disk **and in `src/` /
  `scripts/` where the claim is about shipped code** this seat.
- **Fences honored:** `ASK.md` row IDs, questions, and recommendations are UNTOUCHED by every cure
  below — **no cure edits `ASK.md` at all.** A pending USER ruling is never a finding. Routings
  that reference the atlas Q mailbox as MARKED-HELD or G-CLOSE as veto-gated are treated as
  CORRECT, and the cures below narrow only a refuted *ground*, never the status.
- **Read-only:** this seat edited nothing. Every cure is apply-ready verbatim for an opus fixer.

## VERDICT: **NOT CLEAN — 5 material findings**

The corpus is in materially better shape than at round 7. The 47-wave arithmetic reconciles
(5+3+1+7+4+7+4+9+7 across `APOTHEOSIS.md` §2 and the nine band rosters); the stamped cross-band
edit orders (`DialogContent.vue`, `Slider.vue`, `PagerDots`, `subpath-policy.mjs`, the CSS closure)
appear in every participating band; the ASK's evidence pins all still resolve after the STAB7 line
shifts (`BAND-FEEDBACK-MOTION.md:331-335` OPEN-FM-2 · `:336` OPEN-FM-3 · `:189-249` W5 ·
`BAND-PERF.md:598`/`:637` · `BAND-STORY.md:442`/`:696`); and — checked specifically because the
charter asks — **both items the charter flagged as open are already cured on disk**: the OPEN-FM-1
label collision is stamped CLOSED at `BAND-FEEDBACK-MOTION.md:342-346`, and the CRIT8B-1 residue is
owned as ledger row **C7** at `LEAD-AMENDMENT-LEDGER.md:94`. Neither is re-reported as a defect;
C7 appears below only for its *status word*, not its ownership.

What fails is **three seams and two ledger rows**. One seam (M-1) is a genuine execution hazard
that no document in the corpus names: a REDUCTION roster row would move a file out of `src/` that
the build's own token generator imports and that `BAND-GATES` W1 keep-lists as an invariant gate.
One seam (M-4) is STAB7's own M-9 cure applied to only one of its two sides. The two ledger rows
are the H4 class STAB7 cured, un-swept: a WAITING row on discharged work, and a refuted leg still
carried forward.

---

## Material findings

| # | file:line | class | defect |
|---|-----------|-------|--------|
| M-1 | `waves/BAND-REDUCTION.md:328-333` (+ `ASK-REDUCTION.md:248`) | contradiction — cross-band, unnamed seam | the `springProjection` demo-local move breaks the token generator and strands a GATES W1 keep |
| M-2 | `waves/BAND-DOC-TRUTH.md:50` (+ `:185-191`) | half-applied amendment | the IOS27 W-1 spring seam was stamped on FINAL.md only; DOC-TRUTH still pins the superseded 0.30 |
| M-3 | `formation/refable/LEAD-AMENDMENT-LEDGER.md:87` (I1) | contradiction — refuted leg carried | I1 still says G-CLOSE is "doubly gated"; the terminal ATLAS ruling says single-ground |
| M-4 | `formation/refable/LEAD-AMENDMENT-LEDGER.md:80` (H3) | stale — WAITING on discharged work | H3 waits on a pass-2 dependency that pass-3 consumed and pass-4 closed |
| M-5 | `formation/refable/LEAD-AMENDMENT-LEDGER.md:94` (C7) | contradiction — close-gate precondition | a PENDING ledger row makes the terminal order's "Ledger applied" literally false at the close |

---

### M-1 · `waves/BAND-REDUCTION.md:328-333` (and `ASK-REDUCTION.md:248`)

**Defect.** W3's A12 row moves `springProjection` demo-local "AS A PAIR" with `useScrollPin` on a
census of "2 demo stories". That census is incomplete and the pairing is wrong at the file level.
Re-proven on disk this seat: `springProjection` lives at
`src/composables/motion/spring/springProjection.ts` — the **spring** subtree, not the scroll
subtree — and it has two `src`-side non-story consumers the roster misses:
(1) `scripts/regen-spring-tokens.mjs:23-27` imports `SPRING_PRESETS` **and** `springProjection`
from `src/` to emit the `scheme-spring.css` block (`:51` `const { stops } = springProjection(preset)`);
(2) `tests/composables/motion/springProjection.test.ts:5` imports it via
`@glass/composables/motion/spring/springProjection` — and that test is a **named KEEP in
`BAND-GATES` W1's ≤52 invariant keep-list** (`BAND-GATES.md:88-94`), described there as "the repo's
ONLY spring regen-drift protection", the subject of the RF-1 A3 overturn (`BAND-GATES.md:7`) and of
the D-10 repair-or-retire rider. Executing A12 as written moves the generator's source out of
`src/` and strands a keep-listed gate; no band, ASK row, or ledger row names this seam anywhere in
the corpus (`grep springProjection` over `docs/tranches/BJ/` returns only the two recommendation
sites, the GATES keep, and the sidecars that authored them).

**CURE (a)** — replace lines 328-329 of `waves/BAND-REDUCTION.md` (from `**NEW — scroll/spring
demo-locals AS A PAIR (RU-12 A12 + RU-09 R6 guard).** \`useScrollPin\`` through
`+ \`springProjection\` (2 demo stories) move demo-local;`) with exactly:

```
**NEW — the scroll demo-local (RU-12 A12 + RU-09 R6 guard) — `springProjection` FENCED OUT
2026-07-20, STAB8.** `useScrollPin` (sole consumer: ScrollChoreographyBody) moves demo-local;
```

**CURE (b)** — insert immediately after line 333 (after ``otherwise it follows pin out.``) exactly:

```

**`springProjection` does NOT move (STAB8 2026-07-20, verified on disk).** RU-12 A12's
"2 demo stories" census missed two `src`-side consumers: `scripts/regen-spring-tokens.mjs:23-27`
imports it to emit the `scheme-spring.css` block (`:51`), and
`tests/composables/motion/springProjection.test.ts:5` imports it via
`@glass/composables/motion/spring/springProjection` — a **named KEEP in `BAND-GATES` W1's
invariant keep-list** (`BAND-GATES.md:88-94`, "the repo's ONLY spring regen-drift protection";
the RF-1 A3 overturn) and the subject of GATES W1's D-10 repair-or-retire rider. It is a
`motion/spring/` leaf, not a scroll-pin sibling. `springProjection` STAYS in `src/`; only
`useScrollPin` and its `.scroll-pin*` register move. If a later wave still wants it demoted, that
is a new row that must first discharge the generator + the GATES W1 keep, never this pair-move.
```

**CURE (c)** — replace lines 248-249 of `ASK-REDUCTION.md` (from `- **DEMO-LOCAL \`useScrollPin\`**
(+ \`springProjection\` as a pair; the \`.scroll-pin*\` CSS register` through `moves WITH its
writers).`) with exactly:

```
- **DEMO-LOCAL `useScrollPin`** (the `.scroll-pin*` CSS register moves WITH its writers).
  **[STAB8 truth-up 2026-07-20 — `springProjection` is FENCED OUT of this pairing and STAYS in
  `src/`:** the "as a pair" census missed `scripts/regen-spring-tokens.mjs:23-27` (the token
  generator imports it) and `tests/composables/motion/springProjection.test.ts:5`, a named KEEP in
  `BAND-GATES` W1's invariant keep-list. Ratifying this row does NOT demote `springProjection`;
  `waves/BAND-REDUCTION.md` W3 carries the same fence.**]**
```

### M-2 · `waves/BAND-DOC-TRUTH.md:50` (and `:185-191`)

**Defect.** STAB7's M-9 cure stamped the one-owner-per-file seam on `IOS27-MICRO/FINAL/FINAL.md:32`
("W-1 lands FIRST and is the value source… DOC-TRUTH's T1/T9 then either RETIRE or hand-true to
W-1's shipped values — never the pre-W-1 0.30") and added `BAND-DOC-TRUTH` to FINAL's seam-to-BJ
list (`:92`). **The DOC-TRUTH side was never stamped.** At HEAD, T1's corrected statement
(`:54`) still reads `dock: (0.30s, ζ=0.82)`, T9's (`:56`) still enumerates `dock (0.30, 0.82)`,
and `### Dependencies` (`:185-191`) names no IOS27-MICRO input at all — the exact gap FINAL's own
cure text calls out ("DOC-TRUTH's §Dependencies names no IOS27-MICRO input, so nothing sequences
them"). An executor working from `BAND-DOC-TRUTH` alone writes 0.30 into `scheme-spring.css:31`
and `tunable-anim.md:60-65` after W-1 has shipped 0.35, re-staling the mirror the row exists to
cure — and the G-T1/G-T9 probes would pass against the wrong value. A one-sided seam stamp is not
a seam.

**CURE (a)** — insert immediately after line 50 (`Class A — spring/motion constant mirrors:`)
exactly:

```

**SEAM — sequenced AFTER `IOS27-MICRO` W-1 (added 2026-07-20, STAB8; APOTHEOSIS §4 invariant 1).**
`IOS27-MICRO/FINAL/FINAL.md` W-1 (`:26-32`) ships `springPreset` dock **0.30→0.35** (ζ0.82 held)
and regenerates the `scheme-spring.css` mirror — the SAME rows this class owns as **T1**
(`scheme-spring.css:31`) and **T9** (`docs/design/tunable-anim.md:60-65`), adjacent to **T5**
(`tunable-anim.md:121`). **W-1 lands FIRST and is the value source.** T1/T9's corrected statements
below pin **0.30/ζ0.82**, which is true ONLY against HEAD `springPresets.ts:95-99` and is
SUPERSEDED on W-1's landing: after W-1, T1/T9 either RETIRE (if the regen emits the prose mirror)
or hand-true to **W-1's shipped values — never the pre-W-1 0.30**. The G-T1/G-T9 probes assert
"equals `springPresets`", so they self-correct; the literal `0.30` in the corrected-statement
cells does not. Neither wave edits `scheme-spring.css:31` in the other's cut.
```

**CURE (b)** — replace line 191 of `waves/BAND-DOC-TRUTH.md` (the line reading `outbound.`) with
exactly:

```
outbound · **`IOS27-MICRO` W-1 (T1/T9/T5 spring-mirror rows — this band is sequenced AFTER W-1 and
takes its shipped dock values, per the Class A seam clause and `IOS27-MICRO/FINAL/FINAL.md:32`).**
```

### M-3 · `formation/refable/LEAD-AMENDMENT-LEDGER.md:87` (row I1)

**Defect.** I1's status cell ends `G-CLOSE doubly gated (failed-verification ruling + deferral)`.
The terminal owner-ruling section of the disposition it cites now reads the opposite and says so
by name: `ATLAS-Q-G-BATCH-DISPOSITION.md:72` — "G-CLOSE remains veto-gated on THIS deferral
(**single ground** — addendum 1's failed-verification leg was re-ruled by addendum 2 on the
corrected checkout and is NOT a live basis; **downstream records citing it must be re-grounded on
the deferral**)". The ledger is a downstream record citing it. The **status is not in question**
— MARKED-HELD stands, the veto STANDS, no G-row executes — only the refuted second ground is,
and leaving it live re-propagates exactly the leg STAB7's cure went to the trouble of killing.

**CURE** — replace the trailing text `G-CLOSE doubly gated (failed-verification ruling + deferral)`
in the I1 status cell with exactly:

```
G-CLOSE veto-gated on the owner's execution deferral (SINGLE ground, re-grounded 2026-07-20 per `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md:72` — addendum 1's failed-verification leg was re-ruled by addendum 2 on the corrected `/Users/mkbabb/Programming/.p-totality/sci` checkout and is NOT a live basis; the veto and the MARKED-HELD status are unchanged)
```

### M-4 · `formation/refable/LEAD-AMENDMENT-LEDGER.md:80` (row H3)

**Defect.** H3 reads `WAITING` with dependency `pass-2 agglomeration`, for "IOS27-MICRO X2
§8.1/8.2 register rulings + pass-3 charters". That dependency discharged: pass-2 agglomerated
(`IOS27-MICRO/passes/PASS-2/AGGLOMERATION.md` §5 "The pass-3 charter"), **pass 3 chartered**
(`passes/PASS-3/CHARTER.md` — which consumes the X2 research by name at `:12-13`, "the PASS-1 X2
research (`../PASS-1/research/X2-codebase-motion.md` §8)"), pass 4 ran terminal
(`passes/PASS-4/LEAD-ADJUDICATION.md` + `OWNER-RULING-TERMINAL-PASS.md`), and the tranche's
`FINAL/FINAL.md` was cut 2026-07-20. This is precisely the H4 class STAB7 cured: the ledger's
terminal order gates the whole STAB chain on "Ledger applied", so a WAITING row over landed work
holds the close on a phantom dependency.

**CURE** — replace the H3 status cell text `WAITING` with exactly:

```
DISCHARGED 2026-07-20 — the dependency landed: PASS-2 agglomerated (`IOS27-MICRO/passes/PASS-2/AGGLOMERATION.md` §5, the pass-3 charter), **pass 3 chartered** (`passes/PASS-3/CHARTER.md`, which consumes the X2 §8 register/law collisions by name at `:12-13`), pass 4 closed terminal (`passes/PASS-4/LEAD-ADJUDICATION.md` + `OWNER-RULING-TERMINAL-PASS.md`), and `IOS27-MICRO/FINAL/FINAL.md` was cut 2026-07-20 with the register rulings distributed across W-1 (springPreset/token shipping), W-5 (the novelty adoptions) and W-6 (engagement/breath). No lead amendment is owed; the BJ-facing remainder is the FINAL "seam to BJ" list (`FINAL.md:89-94`), not this row
```

### M-5 · `formation/refable/LEAD-AMENDMENT-LEDGER.md:94` (row C7)

**Defect.** C7 — minted by the STAB7 fix pass to give the CRIT8B-1 residue an owner (correctly) —
carries status `PENDING`. The ledger's `## Terminal order (unchanged)` (`:128-131`) sequences
`Ledger applied → RU-02 fresh STAB chain (two-consecutive-clean) → RU-01 capstone → G1 → CLOSE
banked`. With a PENDING row on the board, "Ledger applied" is literally false while the STAB chain
that is supposed to *follow* it is running, and the close would bank over an un-discharged owned
obligation. The ledger already defines the status word for exactly this case — `PROPOSED-ROUTED`,
"adjudicated and assigned to a named destination; it lands as an annotation when that
destination's amendment batch runs — it is NOT awaiting adjudication and **does not block the
terminal order**" (`:7-10`) — and C7 is by its own text a doc-truth bracket with no verdict
movement, which is precisely that shape.

**CURE** — replace the C7 status cell text `PENDING` with exactly:

```
PROPOSED-ROUTED → the A02/A17 dossier annotation batch (`redress/DOSSIER-A01-A17.md:79-91` + `refable/REFABLE-RU-13-A01-A17.md:40`, `:229-241`). Doc-truth bracket only, no verdict movement — per the status vocabulary above it does NOT block the terminal order, so "Ledger applied" is satisfied at the close with this row outstanding
```

---

## Cosmetic (wording/formatting only — these do NOT count toward the verdict)

1. `PLAN.md:131-133` — FAMILY H W1 states `Born-RED = G-BARREL-REACH (four zero-importer barrels
   … per the FABLE-COLOCATION fold Purge D = exactly four barrels)`, while `BAND-COLOCATION.md:27-28`
   and `:428-431` carry **five** at HEAD (1e greens four, 1a greens the fifth behind REDUCTION W3
   — the STAB1 NOTE-1 cure). Explicitly fenced by the §2 SUPERSESSION LAW ("where a count … here
   conflicts with the band file, the band file wins"), so non-material — but it is a *born-RED
   count*, the one class APOTHEOSIS §4 invariant 2 polices, so it is the strongest candidate in
   this list for a one-line `[four→five; band file governs]` bracket.
2. `PLAN.md:141-157`, `:159-176`, `:241-255` — the §2 rosters for FAMILY C (W1-W5 of 9), FAMILY D
   (W1-W6 of 7) and FAMILY G/FM (W1-W6 of 7, though the section header correctly names W7
   `BJ.W-SHEET-MOTION-DEBT`) remain truncated against their band files. Same fence as above; STAB7
   raised this and the fixer cured only FAMILY K (cure 15) because that one carried a *phantom wave
   name*, not mere truncation. A one-line "roster excerpt, not exhaustive" note under the
   SUPERSESSION LAW paragraph would close all three at once.
3. `PLAN.md:398` (§7 close definition) — still phrases the V-A95 obligation as
   "V-A95 re-repro-or-close", the pre-trio framing. Compatible with the cured §5
   RETIRE-OR-CONFIRM disposition (a confirm-then-retire *is* a close), so not a contradiction;
   "V-A95 retire-or-confirm at GF-AURORA W6" would read consistently with `:353-364`.
4. `ASK-REDUCTION.md:317` (roll-up) says the §C3 re-issue carries "**3 deletes**" while
   `ASK.md:303` (roll-up) says "**2 deletes**". Both resolve against the identical enumerated body
   (`ASK-REDUCTION.md:246-247`: `useBloomUp`+`bloomUpField`, and `useStaggerReveal` — 3 symbols in
   2 delete decisions), so neither misstates the scope. **No `ASK.md` edit is proposed** (the row
   is frozen); if anything moves, it is `ASK-REDUCTION.md:317` → "2 delete decisions (3 symbols)".
5. `waves/BAND-DOC-TRUTH.md:67` — T14 still pins `useDockShellProps.ts:117`; at HEAD `:117` is
   `viewTransitionName?: string;` and the "default 2000" JSDoc is at `:118`. Carried unchanged
   from STAB7's cosmetic list (the fixer did not take it); the row's acceptance is
   grep-per-stale-string, so the sweep is unaffected. Re-pin `:117` → `:118`.

---

## Method note

Every anchor in a material finding was re-proven on disk this seat, including the `src/`- and
`scripts/`-side facts M-1 turns on: `src/composables/motion/spring/springProjection.ts` exists;
`scripts/regen-spring-tokens.mjs:23-27` imports `SPRING_PRESETS` + `springProjection` from `src/`
and calls it at `:51`; `tests/composables/motion/springProjection.test.ts:5` imports it via the
`@glass` alias; `grep -rln springProjection src/` returns the definition only (zero `src`
component consumers), `demo/` returns `motion/springs.vue` + `motion/reveal.vue`. Also re-proven:
`IOS27-MICRO/passes/PASS-3/CHARTER.md:12-13` (the X2 §8 consumption), `PASS-4/LEAD-ADJUDICATION.md`
and `OWNER-RULING-TERMINAL-PASS.md` present, `ATLAS-Q-G-BATCH-DISPOSITION.md:65` (the STAB7
supersession stamp live) and `:72` (the single-ground re-grounding), `FINAL.md:32` (the W-1 seam
clause live) and `:92` (BAND-DOC-TRUTH in the seam list),
`BAND-FEEDBACK-MOTION.md:342-346` (the OPEN-FM-1 collision stamped CLOSED),
`LEAD-AMENDMENT-LEDGER.md:94` (C7 minted, the C6 residue owned). No file was modified.

`git status` at read time: modified — `ASK.md`, `PLAN.md`,
`coordination/ATLAS-Q-G-BATCH-DISPOSITION.md`, `formation/refable/LEAD-AMENDMENT-LEDGER.md`,
`waves/APOTHEOSIS.md`, `waves/BAND-FEEDBACK-MOTION.md`, `waves/BAND-MATERIAL.md`,
`../IOS27-MICRO/FINAL/FINAL.md`; untracked —
`coordination/atlas-outbound-2026-07-20-q-execution-resumed.md`,
`formation/stability/FIXLOG-STAB7.md`, `STAB7-COHERENCE.md`, `STAB7-COMPLETENESS.md`.
