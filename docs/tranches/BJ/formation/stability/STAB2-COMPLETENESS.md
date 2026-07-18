# STAB2 — COMPLETENESS lens (Fable stability critic, pass 2)

Fresh critic, wrote none of the corpus. Charter bar: NOTHING may be dropped — every carried defect,
every judged delta, every standing edict must trace to a terminal owner that EXISTS and whose text
covers it, reachable from `PLAN.md`/`ASK.md`. Lens = COMPLETENESS. Pass 1
(`STAB1-COMPLETENESS.md`) verified the 67-row / 26-ruling / 11-verdict traces COMPLETE and filed
2 MAJOR + 2 MINOR; the lead applied fixes at `43895cfe`. My job: verify those fixes LANDED, re-sweep
the carry lane fresh, re-check the eight edicts. TRANCHE-DEVELOPMENT ONLY; this is the only file written.

Register: plain, evidence-cited. Every claim walked on disk at HEAD `43895cfe` (`codex/bi-p-q-execution`).

---

## VERDICT: AMEND(2) — two applied fixes are INCOMPLETE (both half-reconciled), plus 4 MINOR / 2 NOTE

The completeness SPINE still holds: the 67/26/11 traces pass-1 verified all still reach existing owners
(the fix commit touched PLAN/ASK/MATERIAL/PERF only, adding surface, breaking no trace). Pass-1's two
MAJORs each got a wave minted — **but both cures are HALF-APPLIED**: the fix reconciled the plan-of-record
but left the *source* specs carrying the pre-fix (now-wrong) attribution/number. Two carried R3b riders
remain un-owned, and one edict is left asymmetric against the very law pass-1 elevated.

**Findings by severity:** 0 BLOCKER · **2 MAJOR** · 4 MINOR · 2 NOTE.

---

## Fix-verification (the three pass-1 cures)

| pass-1 cure | landed? | evidence |
|-------------|---------|----------|
| (a) `BJ.W-CSS-CLOSURE-RESTORE` = MATERIAL W7, real gates | **PARTIAL** | wave EXISTS `BAND-MATERIAL.md:700-723` (gates a-d real); PLAN DAG `:42` + §5 `:305-310` name it — BUT PLAN §2 roster enumeration + the two source specs are un-reconciled (MAJOR-1, MINOR-1) |
| (b) blob forced-reflow = BAND-PERF W2 deliverable + gate; W1/W2 PENDING-R3 seeded | **YES** | `BAND-PERF.md:510-520` deliverable (b) + gate (ForcedReflow-absent + swap CLS ≤0.01); R3b baselines seeded in the addendum. The rAF-budget/idle-frame headline gate is W2's live-trace idle-rAF gate (`:219-226`). MAJOR-2-of-pass1 CURED. (see NOTE-1/NOTE-2) |
| (c) liquid-weight = PLAN-level law | **YES** | `PLAN.md:265-269` — a standing §3 law binding EVERY motion-touching wave. Pass-1 MINOR-2 CURED |

---

## MAJOR findings

### MAJOR-1 — the orphan-CSS FIX owner exists, but GATES + REDUCTION still misattribute it (pass-1 MAJOR-1 half-cured)

Pass-1 MAJOR-1's required fix had TWO halves: "draft the orphan-partial fix wave with ONE terminal owner"
AND "Reconcile the family attribution (it cannot be both C/H-inert and G-visual)." The lead did the first
(minted MATERIAL W7) and fixed PLAN §5 — **but the second half was not applied to the two source specs that
CREATED the contradiction:**

- `BAND-GATES.md:251` (W3, where the gate is authored born-RED): "The fix flip (re-home the two `@import`s
  into `glass.css`) is a **Family C/H coordination obligation**." Still C/H.
- `BAND-GATES.md:410` (roll-up): "orphan-CSS-partial (W3) → the CSS re-home of glass-chip/glass-atom
  (**Family C/H**)." Still C/H.
- `BAND-REDUCTION.md:71-72`: "The chip/glass-atom orphan … a **family-G** born-RED fix wave, not a
  reduction. **Out.**" Still G.

Where the chain breaks: the actual owner is **Family F / MATERIAL W7** (`BAND-MATERIAL.md:700-723`), so BOTH
surviving attributions are now WRONG. The authoritative born-RED gate spec (GATES W3) directs its own flip to
a family (C/H) that pass-1 proved is structurally barred — COLOCATION is the declared byte-identity/null-DELTA
band and cannot resurrect dead CSS. An executor implementing `orphan-CSS-partial` and reading GATES W3 for its
flip-owner is sent to a dead end; only PLAN §5 carries the truth. The completeness SPINE survives (W7 is
reachable from PLAN §5 + the DAG line), so this is not a silent drop — but the pass-1 cure is demonstrably
incomplete and the fix commit's "all MAJORs cured" claim overstates it.

**Required fix:** repoint `BAND-GATES.md:251,410` and `BAND-REDUCTION.md:71-72` to name `BJ.W-CSS-CLOSURE-RESTORE`
(MATERIAL W7) as the single flip-owner (drop "Family C/H" / "family-G"). The reconcile pass-1 mandated, finished.

### MAJOR-2 — the HandMark surface reconcile missed the greenfield source (a NEW contradiction the fix introduced)

The fix commit message claims: "HandMark surface reconciled to BAND-REDUCTION's 19→~8 floor with the further
cut conditional on ASK Q-HM-2 (**both sites**)." The "both sites" were the two PLAN sites — the greenfield
spec, the authoritative HandMark design doc, was NOT updated and now contradicts the plan of record:

- `PLAN.md:85-87` + `:235-236`: "HandMark **19→~8** surface per BAND-REDUCTION's binding floor —
  **appear/box/drawMs land** — with the greenfield's further cut **CONDITIONAL on ASK Q-HM-2**."
- `BAND-REDUCTION.md:156,159`: "19 → **~8** … `brush, shape, color, seed, animation, appear, box, drawMs` (≈8)."
- `GF-HANDMARK-PASS3.md:251` (W6 deliverable + gate G-PROPS): "SURFACE + DEMO-DE-JARGON | **19→~5 props**".

Where the chain breaks: PLAN/REDUCTION set the floor at **~8 with `appear/box/drawMs` explicitly LANDING**;
the greenfield's W6 deliverable and its `G-PROPS` gate hard-target **~5** — a count that cuts the very props
PLAN says land. Worse, PLAN cites **Q-HM-2** as the gate on the further cut, but `GF-HANDMARK-PASS3.md:367`
defines Q-HM-2 as a *shape*-retirement scope ("box/bracket shapes retire entirely"), not a prop-floor
decision — so the plan-of-record mis-cites the ASK it hangs the cut on. At execution `G-PROPS` (≤5) and PLAN
(~8 floor) cannot both be satisfied; the HandMark surface deliverable (F34-F40 lineage) is contradicted, not
owned coherently.

**Required fix:** align `GF-HANDMARK-PASS3.md:251` (and its `G-PROPS` gate) with the PLAN/REDUCTION ~8 floor +
conditional-further-cut framing, OR correct PLAN/REDUCTION back to ~5 if that is the real target; and repair
PLAN's Q-HM-2 citation so the "further cut" hangs on an ASK row whose scope is actually the prop count.

---

## MINOR findings

### MINOR-1 — PLAN §2 FAMILY F roster omits the W7 bullet; BAND-MATERIAL header is stale

`PLAN.md:183` bumps the FAMILY F header to "(**7 waves**; … + the css-closure restore)" and the DAG line
`:42` lists `css-closure-restore` — but the §2 per-wave enumeration `:184-200` stops at **W6**; there is no
W7 bullet. A reader walking the §2 roster for the W7 owner finds a count/enumeration mismatch (the owner is
recoverable only via the DAG line + §5). Inside the band file the same staleness: `BAND-MATERIAL.md:31` still
reads "**Six waves:**", the wave table `:33-40` lists six rows, the title `:1` omits css-closure, and W7 is
bolted on at `:700-723` — AFTER the §Band-level obligations roll-up (`:642-698`). **Fix:** add the W7 roster
bullet to PLAN §2; update the BAND-MATERIAL "Six waves"/table/title and move W7 above the roll-up.

### MINOR-2 — the R3b interaction-robustness rider (slider role-node not hittable) is owned by NO wave

`R3B-DIGEST.md:83-89` + the REGISTRY R3b fold (`REGISTRY.md`, "Two riders" (1)): the slider's `role=slider`
node is not the hittable pointer target (zero-width thumb span; synthetic pointer no-ops; only trusted CDP
keyboard moved it) → "slider tests must target the track or use keyboard, not the role node." The fold routes
it to "the binding-verification lesson class" — but the existing binding-verification gate
(`BAND-GATES.md:62-63`, the `:pressed`/`v-model:search-term`/`tag=` reka prop/emit canary) covers a
**different** failure mode (prop/emit silently no-op), NOT pointer-hittability. BAND-A11Y W1 fixes slider a11y
attributes but says nothing about the role-node not being the hit target; `BAND-MATERIAL.md:450`'s canary is
TRACK-DRY regression-safety. So the specific test-discipline rider is un-propagated to any wave that authors
slider interaction tests (BAND-A11Y, TRACK-DRY, IDLE-BREATH slider-at-rest, `BI.W-ENGAGE-AFFORD` slider
exemplar/modal) — each will silently no-op if it targets the role node. **Fix:** land the discipline in
PLAN §3 (live-π/test discipline) or the slider-touching waves' acceptance.

### MINOR-3 — the R3b visual-landing rider (detached hero goo-blob) is routed to a family that never picks it up

`R3B-DIGEST.md:91-97` + REGISTRY R3b fold "Two riders" (2): root bento preview cards render empty dark panels
**and** a stray yellow goo-blob floats detached right of the hero — "routed to family C for
intended-vs-regression confirmation." The bento half IS owned (`BAND-STORY.md:375,:394`, G-PRV-3, F02). The
detached goo-blob is not: `grep -rn 'goo-blob|detached|stray.*blob|specimen' docs/tranches/BJ/waves/ PLAN.md`
= **0**. The routing target ("family C") carries no line naming it — the exact "recognized-family-but-no-owner
→ silent drop at execution" class. Pass-1 flagged this as NOTE-1; the fix commit did not address it, so it
carries forward un-owned. **Fix:** name the hero goo-blob in a wave (BAND-STORY hero scope or the MATERIAL W5
proportion roster as a "distracting element" mark) with an intended-vs-regression verdict.

### MINOR-4 — breath-of-life stays wave-only while its sibling liquid-weight was elevated to a PLAN law

Pass-1 MINOR-2 elevated liquid-weight to a PLAN §3 law precisely because "story-page/dock/greenfield
transitions are not held to it at the PLAN grain." The identical argument applies to its sibling universal
edict, breath-of-life ("every component always displays engagement", "remember this always"): it is encoded
only as waves — `PLAN.md:10-11` framing + `:221-223` FEEDBACK-MOTION W5 IDLE-BREATH + `BI.W-ENGAGE-AFFORD` —
never as a PLAN §3 law binding every component-touching wave. So the greenfields (dock/handmark/aurora/blob)
and the story components are not held to "always displays engagement" at the PLAN grain the way motion now is.
The MINOR-2 cure created an asymmetry between two edicts of the same universal register. **Fix:** state
breath-of-life as a §3 law beside liquid-weight (or explicitly scope it wave-only by design, closing the gap).

---

## NOTE findings

- **NOTE-1** — the blob forced-reflow cure is placed in **BAND-PERF W2 (`SHELL-FIELD-GOVERN`)**, whose theme
  is the always-on SHELL aurora field, not the blob component's own mount path (`/substrates/blob`). GF-BLOB
  rewrites the blob wholesale (10 waves); no coordination seam is stated between W2 deliverable (b) and the
  greenfield, so the cure could be built on soon-to-be-replaced code. Not elevated: W2's gate ("ForcedReflow
  insight absent from a fresh mount trace") would RE-red if GF-BLOB reintroduces the reflow, so correctness is
  gate-protected — but flag the seam so it lands once.
- **NOTE-2** — the PERF W1/W2 inline bodies were NOT back-edited: `BAND-PERF.md:40,:143-148` (W1) and
  `:41,:220-227` (W2) still read "PENDING-R3" with no numbers; the R3b seeds live ONLY in the bottom addendum
  (`:510-520`). Pass-1 MINOR-1 is substantively cured (the baselines are now stated as RED numbers), but a
  reader of the W1/W2 acceptance sections still meets bare "PENDING-R3". A doc-locality snag, not a drop.

---

## Carry re-sweep (fresh — every carry named anywhere in the corpus → named existing owner)

| carry | owner (existing?) | OK |
|-------|-------------------|----|
| V-A95 re-repro-or-close + the GF-AURORA W6 arm | GF-AURORA W6 (`GF-AURORA-PASS3.md:250`, §3.7 `:226-235`, G-REVERSE-DRAG-NOSLAB `:304`, π-REVERSE-DRAG `:320`) + PLAN §5 `:300-304` | OK |
| Q060 outbound obligations (incl. the speedtest §3 protagonist answer) | PLAN §5 `:311-317` + MATERIAL inbound mark `:684-694` | OK |
| speedtest `ASK-GU-CARD-TIER-ALPHA-PIN` consumer-truth input | BAND-MATERIAL W2 inbound mark `:684-694` (weighed in W2's ruling) | OK |
| INFER truth-up T1 (overlay role-split) | REGISTRY §Truth-up ("no factoring owed" — terminal) | OK |
| INFER truth-up T2 (scene-staging) | MATERIAL W3 Deliverable (b) `:342-346` (C-F/T2, unconditional) | OK |
| chip + glass-atom @import orphan — GATE | BAND-GATES W3 `orphan-CSS-partial` born-RED `:241-289` | OK |
| chip + glass-atom @import orphan — FIX | MATERIAL W7 exists `:700-723` — but GATES/REDUCTION still misattribute to C/H·G | **BREAK (MAJOR-1)** |
| R3b interaction-robustness rider (slider role-node) | **none** (digest/REGISTRY only; not propagated) | **BREAK (MINOR-2)** |
| R3b visual-landing — bento previews | BAND-STORY W5 G-PRV-3 `:375,:394` | OK |
| R3b visual-landing — detached hero goo-blob | **none** (routed to "family C", no wave names it) | **BREAK (MINOR-3)** |
| HandMark 19→~N surface floor | GF-HANDMARK W6 (~5) contradicts PLAN/REDUCTION (~8) | **BREAK (MAJOR-2)** |
| BI carry-over `BI.W-ENGAGE-AFFORD` (Tier-1/Tier-2 status) | PLAN §2 `:249-254` + file `docs/tranches/BI/waves/BI.W-ENGAGE-AFFORD.md` exists | OK |
| BI carry-over `BI.W-SLIDER-ENGAGE` (SUPERSEDED) | PLAN §2 `:255-256` + redirect stub file exists | OK |
| guardian / EXEC-STATE durability | PLAN §4 `:293-296` | OK |

---

## Edict re-check (did the two pass-1 MINOR cures leave any edict implicit?)

| edict | PLAN encoding | OK |
|-------|---------------|----|
| liquid-weight universal | §3 `:265-269` — PLAN-level LAW (pass-1 MINOR-2 cured) | OK |
| breath-of-life | §1 `:10-11` + W5 `:221-223` wave-only — NOT a §3 law (asymmetric to liquid-weight) | MINOR-4 |
| aristotelian proportion | MATERIAL W5 `:197-198` (A10 review) | OK |
| colocation grand edict | Family H BAND-COLOCATION (§1 `:38`, §2 `:117-130`) | OK |
| story meta-framework | Family D BAND-STORY (§1 `:40`, §2 `:150`) | OK |
| KISS / no-legacy | §7 `:342` + per-band KISS sections | OK |
| Fable model split | §4 `:289-292` "Model split, always declared" | OK |
| maximal parallelization | §4 `:287` ≤3 seats + §1 A16 | OK |

Seven of eight remain explicitly encoded; the liquid-weight cure (MINOR-2) did not obscure any other edict —
but it left breath-of-life, its universal-register sibling, at the lower (wave-only) grain it explicitly
raised liquid-weight above (MINOR-4).

---

## Bottom line

The completeness spine holds — the 67/26/11 traces still reach existing owners, and pass-1's cure (c)
(liquid-weight law) and cure (b) (blob forced-reflow + R3b seeds) landed. But the two headline cures are
**half-applied**: the orphan-CSS fix minted W7 yet left GATES W3 + REDUCTION pointing at the wrong flip-owner
(**MAJOR-1**), and the HandMark reconcile updated PLAN's two sites but left the greenfield spec + its G-PROPS
gate at a contradicting ~5 with a mis-cited Q-HM-2 (**MAJOR-2**, a contradiction the fix commit introduced).
Two R3b riders — the slider role-node discipline (MINOR-2) and the detached hero goo-blob (MINOR-3) — remain
un-owned; breath-of-life is left asymmetric to the law pass-1 elevated (MINOR-4); the W7 roster/band-header is
stale (MINOR-1). **AMEND(2)** on the two incomplete cures, plus the four MINORs. Not two-consecutive-clean.
