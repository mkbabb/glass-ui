# STAB3 — stability critique, pass 3, BOTH lenses merged (fresh Fable seat, wrote none of it)

Scope: the consolidated STAB2 cure at commit `aaf0de74` ("STAB2 fix round + the handmark USER RULING
encoded"), held against disk at HEAD `aaf0de74` (`codex/bi-p-q-execution`). This is the consecutive-clean
check: (1) verify every STAB2 fix landed; (2) verify the fresh USER RULING ("handmark is keep. But
greenfield and perfect from first principles. Fable.") reads ONE way everywhere handmark surfaces;
(3) a fresh spot-scan neither prior pass ran. I assumed residual faults and hunted them.
TRANCHE-DEVELOPMENT: this is the only file written; no source, no commits.

Method: read the `aaf0de74` diff in full; re-read the four handmark surfaces (GF-HANDMARK-PASS3 W6 row +
G-PROPS + the foot rider, BAND-REDUCTION handmark row, PLAN §1/§2 handmark sites, ASK-18/19 + routing note
+ roll-up + §4); walked all eight STAB2 fixes on disk; ran the fresh scan (BI carry-over files, COLOCATION
Move C, ASK-25/ASK-1/ASK-12 owners, GATES W4↔MATERIAL W6 coupling, PERF W4↔F07); grepped the whole tranche
for `ASK-27`.

---

## VERDICT: AMEND(2) — 1 MAJOR + 1 MINOR (+ 3 NOTE)

Finding counts: **BLOCKER 0 · MAJOR 1 · MINOR 1 · NOTE 3.** Not two-consecutive-clean. Both residues are
localized cleanups of the `aaf0de74` diff itself — the ruling's *intent* landed correctly in five of six
handmark surfaces; one surface (the greenfield's own W6/G-PROPS) was left carrying the superseded ladder,
and one band header was bumped without its table.

---

## STAB2 fix-verification (all eight, on disk)

| STAB2 fix | landed? | evidence |
|-----------|---------|----------|
| GATES `:251` names `BJ.W-CSS-CLOSURE-RESTORE` (MATERIAL W7) | **YES** | `BAND-GATES.md:251` "**`BJ.W-CSS-CLOSURE-RESTORE` (MATERIAL W7)**" |
| GATES `:410` roll-up names it | **YES** | `BAND-GATES.md:410` "(`BJ.W-CSS-CLOSURE-RESTORE`, MATERIAL W7)" |
| BAND-REDUCTION chip-orphan excl. names W7 | **YES** | `BAND-REDUCTION.md:71-72` "owned by `BJ.W-CSS-CLOSURE-RESTORE` (MATERIAL W7), not a reduction. Out." |
| BAND-MATERIAL "Seven waves" + W7 section w/ real gates | **PARTIAL** | header `:31` "Seven waves:"; W7 section `:700-721` gates (a)-(d) real; but the intro table `:33-40` still lists W1-W6 only (MINOR-1) |
| PLAN §2 FAMILY F W7 bullet + roster/DAG say 7 | **YES** | `PLAN.md:202` W7 bullet; `:184` "7 waves"; `:42` DAG "MATERIAL (7) … css-closure-restore" |
| PERF W2 addendum = forced-reflow only; CLS → W4 | **YES** | `BAND-PERF.md:515-516` "gate: the ForcedReflow insight absent … The route-swap CLS 0.04 is W4's … no double gate here." |
| slider role-node rider in BAND-GATES | **YES** | `BAND-GATES.md:435-439` "slider interaction tests target the track … never the role node." |
| goo-blob rider in BAND-STORY | **YES** | `BAND-STORY.md:595-597` "W5 … the yellow goo-blob floating detached … confirm intended-vs-regression." |
| breath-of-life law in PLAN §3 | **YES** | `PLAN.md:275-279` a standing §3 law beside liquid-weight; the PRM/compositor guardrails named |

Seven of eight fixes are clean and match STAB2's required text. The eighth (BAND-MATERIAL) is header-only —
MINOR-1.

---

## USER-RULING coherence (every handmark surface)

The ruling must read ONE way: HandMark KEEP; the greenfield owns the surface from first principles;
Q-HM-1/2 resolve inside the design loop (not the ASK); Fable seats; consumers adapt. Five surfaces read
exactly that way. One does not.

| surface | reads the ruling ONE way? | evidence |
|---------|--------------------------|----------|
| GF-HANDMARK foot rider | YES | `GF-HANDMARK-PASS3.md:377-386` "≈8 floor is SUPERSEDED … Q-HM-1/Q-HM-2 … resolve inside the design loop, not the ASK … the ≤8 conditional ladder collapses back to the first-principles target." |
| GF-HANDMARK W6 row | **NO** | `:251` "19→~8 props (the BAND-REDUCTION adopted floor); the box prop rides Q-HM-2, appear/drawMs ride ASK-27" (MAJOR-1) |
| GF-HANDMARK G-PROPS gate | **NO** | `:278-281` "≤8 (the BAND-REDUCTION adopted floor: appear/box/drawMs LAND) … tightens to ≤7 if the user rules Q-HM-2 … and further only per ASK-27" (MAJOR-1) |
| BAND-REDUCTION handmark row | YES | `:156-164` "19 → the first-principles surface (USER-RULED) … supersedes the ≈8 floor … target ≈5 … not a fixed prop list." |
| PLAN §1 handmark site | YES | `:85-89` "per the USER RULING … FULL first-principles surface authority, the census floor superseded." |
| PLAN §2 handmark roster | YES | `:237-241` "~5-prop target, census floor superseded … Q-HM-1/2 resolve INSIDE the design loop." |
| ASK-18/19 + routing + roll-up + §4 | YES | `:158-167` RESOLVED-BY-RULING; `:243` "RESOLVED by your … ruling … no answer owed"; `:280-281` roll-up marks RESOLVED-BY-RULING; §4 `:254` scope intact |

---

## Findings

### MAJOR-1 — GF-HANDMARK's own W6 row + G-PROPS still encode the SUPERSEDED ASK-gated ≤8 ladder (and a ghost ASK-27), contradicting the rider, PLAN §2, and the re-cut BAND-REDUCTION row

The `aaf0de74` commit did two opposite things to `GF-HANDMARK-PASS3.md` in one cut. It **freshly edited**
the W6 row and G-PROPS *toward* the (now-superseded) BAND-REDUCTION ≈8 floor — W6 `:251` went `~5 props` →
"19→~8 props (**the BAND-REDUCTION adopted floor**); the box prop rides **Q-HM-2**, appear/drawMs ride
**ASK-27**"; G-PROPS `:278-281` went `≤5` → "≤8 … appear/box/drawMs **LAND** … tightens to ≤7 if the user
rules **Q-HM-2** … further only per **ASK-27**." And it **appended** the foot rider `:377-386` that
nullifies exactly that: "the ≈8 floor is SUPERSEDED … Q-HM-1/Q-HM-2 … resolve inside the design loop, **not
the ASK** … the ≤8 conditional ladder **collapses** back to the first-principles target."

The rider's "read with this ruling governing" instruction papers over an unrewritten contradiction rather
than removing it. A reader hits W6/G-PROPS (above the rider) FIRST and builds an ASK-gated ≤8 ladder before
ever reaching the sentence that voids it. Three concrete breaks:

- **Stale floor citation.** W6/G-PROPS cite "**the BAND-REDUCTION adopted floor**." BAND-REDUCTION no
  longer adopts one — `:159-163` states "supersedes the ≈8 floor this row previously fixed … not a fixed
  prop list." The citation is dangling.
- **Count contradiction.** W6/G-PROPS say **≤8** ("appear/box/drawMs LAND"); the rider, PLAN §2 `:239`,
  and BAND-REDUCTION `:161` all say **≈5 / first-principles**. Same doc, two targets.
- **Ghost + voided gating.** `ASK-27` **does not exist** — ASK.md tops out at ASK-26; `grep ASK-27` across
  the whole tranche returns only these two GF-HANDMARK lines. And the ruling says appear/drawMs "resolve
  inside the design loop, not the ASK," so gating them on any ASK row (real or phantom) is itself against
  the ruling. Q-HM-2 gating of `box` is voided the same way.

This is the STAB2 MAJOR (HandMark surface contradiction) relabeled by a rider, not resolved — the
executor-divergence survives inside the authoritative design doc.

**Required fix:** rewrite `GF-HANDMARK-PASS3.md:251` (W6 row) and `:278-281` (G-PROPS) to the
first-principles target the ruling grants — drop "the BAND-REDUCTION adopted floor," drop the Q-HM-2/ASK-27
conditional ladder, drop the phantom `ASK-27`, and state the surface as design-loop-derived (≈5 working
target, "no dead prop survives") to match the rider, PLAN §2, and BAND-REDUCTION. After the rewrite the
foot rider becomes confirmation, not a correction of the lines above it.

### MINOR-1 — BAND-MATERIAL header says "Seven waves:" but the intro table enumerates only six; W7 is a detached one-row table after the band roll-up

`BAND-MATERIAL.md:31` was bumped to "**Seven waves:**", but the roster table directly beneath it
(`:33-40`) still lists **W1-W6** only. The W7 row lives as a lone one-row table at `:723` — *below* the
`§Band-level obligations & OPEN roll-up` heading (`:642`) and the whole roll-up. Before the fix the block
was internally consistent (undercounted vs PLAN); the header-only bump made it self-contradictory: a
reader scanning the primary roster builds six waves — the exact miss-risk W7 was minted to prevent.
STAB2-COHERENCE MAJOR-2's required fix ("update `:31` to 'Seven waves:' **and add the W7 row to the intro
table**") plus STAB2-COMPLETENESS MINOR-1 ("move W7 above the roll-up") were both only half-applied.

**Required fix:** add the W7 row to the intro table (`:33-40`) and move the `## Wave 7` section (`:700-723`)
above the `§Band-level obligations` roll-up.

---

## Fresh spot-scan (neither prior pass's exact checks)

**5 PLAN citations — all hold.** §1 handmark site `:85-89` (coherent with ruling); §2 W7 bullet `:202`
(exists); DAG `:42` "MATERIAL (7)"; §2 "PERF W4 OWNS the F07 story-transition choreography (Family D
consulted)" `:83-84` (consistent — not co-owned); breath-of-life law `:275-279` (standing §3 law, guardrails
named). No fault.

**4 ASK rows — all ground to an owner.** ASK-25 → `BJ.W-ALERT-IDIOM` exists (`BAND-FEEDBACK-MOTION.md:30,86`);
ASK-1/ASK-12 (WatercolorDot) land in `BAND-REDUCTION.md:53,144`; ASK-18/19 RESOLVED-BY-RULING consistent
across row/routing/roll-up. No fault.

**3 band cross-references — all hold.** COLOCATION Move C "cascade position ≠ file location"
(`BAND-COLOCATION.md:110,432`) is the exact principle MATERIAL W7 `:713-714` invokes; GATES W4 type-hygiene
→ MATERIAL W6 `BJ.W-TYPE-CODEMOD` coupling is consistent (`BAND-GATES.md:383,399,413,429`); both BI
carry-over files exist on disk (`BI/waves/BI.W-ENGAGE-AFFORD.md`, `BI.W-SLIDER-ENGAGE.md`). No fault.

---

## Notes (corpus-hygiene; not counted)

- **NOTE-1** — the W7 section header still reads "(STAB1 MAJOR-1 cure)" (`BAND-MATERIAL.md:700`) while its
  body says "Minted at STAB1-COMPLETENESS" (`:702`). STAB2-COHERENCE NOTE-2 asked to disambiguate
  (STAB1-COHERENCE also has a MAJOR-1); not applied. Add "-COMPLETENESS" to the header label.
- **NOTE-2 (pre-existing)** — ASK §4 `:254` "the four greenfield identity calls." Reads fine as the four
  greenfield families (dock/handmark/aurora/blob); recorded per STAB2 NOTE-4, not introduced by the fix.
- **NOTE-3** — GF-HANDMARK §14 `:368-371` still frames Q-HM-1/Q-HM-2 as open confirm-questions
  ("Confirm …", "Default proposed …"). Consistent with the rider's "resolve inside the design loop" (§14 IS
  the design-loop question list), but a reader reaching §14 before the foot rider may read them as still-open
  ASKs. Optional: prefix §14 with "resolved in-loop per the ruling below."

---

## Register (evidence anchors)

| # | sev | site | disk truth |
|---|-----|------|-----------|
| MAJOR-1 | MAJOR | GF-HANDMARK-PASS3.md:251 + :278-281 vs :377-386 / PLAN:239 / REDUCTION:159-163 | W6 row + G-PROPS keep the superseded ≤8 "BAND-REDUCTION adopted floor" ladder; cite phantom ASK-27 (×2) + Q-HM-2 gating the ruling voids |
| MINOR-1 | MINOR | BAND-MATERIAL.md:31 vs :33-40; W7 at :700-723 (after :642 roll-up) | header "Seven waves:" over a six-row intro table; W7 detached below the roll-up |
| NOTE-1 | NOTE | BAND-MATERIAL.md:700 | W7 header "STAB1 MAJOR-1" unqualified (STAB2 NOTE-2 undisambiguated) |
| NOTE-2 | NOTE | ASK.md:254 | "four greenfield identity calls" (pre-existing) |
| NOTE-3 | NOTE | GF-HANDMARK-PASS3.md:368-371 | §14 still poses Q-HM-1/2 as open confirm-questions |

**Single worst finding: MAJOR-1** — the USER RULING landed correctly in five of six handmark surfaces, but
the greenfield's own W6 row and G-PROPS gate were edited in the *same* commit toward the superseded ASK-gated
≤8 ladder (with a ghost ASK-27), so the authoritative design doc reads two ways; the foot rider's "read with
this ruling governing" defers the contradiction instead of removing it.
