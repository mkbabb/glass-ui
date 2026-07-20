# STAB12 — COHERENCE lens (BJ formation-close gate, round 12)

- **Verified model:** `claude-fable-5` (read verbatim from this seat's system context: "The exact
  model ID is claude-fable-5"). Read-only seat — this document proposes; the fixer applies.
- **Read at:** working tree over HEAD `0b4c5840` ("lead adjudication — the G-CLOSE gate falls, the
  Q mailbox resumes, and the four STAB escalations close"). NOTE: the charter named `97843257` as
  HEAD; two commits have landed since (`1d0c17c6`, `0b4c5840`) plus the uncommitted STAB9/10/11
  cure set, so several charter premises are already superseded on disk — recorded under §Charter
  reconciliation rather than filed as findings.
- **Posture:** the corpus was assumed incoherent until proven otherwise. Every band file, the
  capstone, PLAN, ASK, ASK-REDUCTION, the lead ledger (incl. §J1-J5 / §K1-K8), the three fresh
  REFABLE sidecars, JUDGE, the atlas disposition, and the IOS27-MICRO FINAL pair were read in
  full; ledger anchors, ledger greps, and cross-band pins were re-proven mechanically on disk.

## VERDICT: **NOT CLEAN — 8 material findings.**

All eight are apply-ready. **Seven of the eight share ONE root cause:** `BJ.W-REFRACT-LATCH` was
minted as `BAND-MATERIAL` **Wave 8** by STAB11 (FIXLOG-STAB11 cure 9) and cited from `PLAN.md:17`
(cure 10) — and nothing else was swept. The wave's gate has no author, its standing lock is
outside the binding ≤60 census, its own file still says "Seven waves", and it appears in no phase
of the capstone map or the execution cursor. This is the half-applied-amendment class the STAB
chain has been curing all week, recurring at the largest grain yet: a whole wave.

---

## Material findings

| # | file:line | defect |
|---|-----------|--------|
| M-1 | `waves/BAND-GATES.md:47` | `gate:refract-lens-never-sharper` has NO author — the gate `PLAN.md:17` and `BAND-MATERIAL` W8 both assign to GATES W3 does not exist in `BAND-GATES.md` (grep `refract` = 0) |
| M-2 | `waves/APOTHEOSIS.md:50` | the §2 count ledger reads BAND-MATERIAL 7 / Total 47 while MATERIAL W8 is on disk |
| M-3 | `waves/APOTHEOSIS.md:56` | the binding standing-gate arithmetic is saturated at exactly 60 in BOTH branches and omits W8's standing lock — the ceiling breaks on landing |
| M-4 | `waves/APOTHEOSIS.md:96` | §3 phase 2 (the landable sequence "a build engine reads FIRST") schedules MATERIAL W1-W7 only; W8 is in no phase |
| M-5 | `waves/BAND-MATERIAL.md:48` | the file contradicts itself: "Seven waves:" + a 7-row wave table + a W1-W7 in-scope summary, with W8 authored at `:762` |
| M-6 | `waves/BAND-MATERIAL.md:820` | W8's own ≤60 claim double-counts its gate and exceeds the ceiling by 2-3 |
| M-7 | `EXECUTION-PROGRESS.md:61` | P-EX2 schedules "MATERIAL W1–W7" — W8 belongs to no execution phase |
| M-8 | `PLAN.md:178` | FAMILY D's roster enumerates W1-W6 under a "7 waves" header; `BJ.W-STORY-TRANSITIONS` is named NOWHERE in the plan of record |

### M-1 — `waves/BAND-GATES.md:47` (+ 6 companion sites in the same file)

**Defect.** `PLAN.md:17` states "`BAND-GATES` W3 authors `refract-lens-never-sharper` born-RED"
and `BAND-MATERIAL.md:813-822` states the same ("authored born-RED in `BAND-GATES` W3 … the
standing 'authored born-RED there, GREEN by the MATERIAL sibling' idiom"), but `grep -c refract
waves/BAND-GATES.md` = **0**: W3's wave-table row, §Design, §Work and §Acceptance all carry
exactly two gates. A GATES W3 seat executing to its own band file never authors the gate, and
MATERIAL W8 then has nothing to flip GREEN — the second of the two named shipped 7.0.0 defects
ships into BJ with a fix wave and no witness.

**CURE (seven verbatim edits, one file):**

**(1)** `:47` — replace the wave-table row 3 with:

```
| 3 | `BJ.W-STATIC-HYGIENE` | THREE NEW static gates: token-hygiene · orphan-CSS-partial (both-channel walk) · refract-lens-never-sharper (the WebKit `@supports` gate-lie, Playwright arm; prop-granularity FOLDED to Family C per OPEN-8) | Yes — shipped violations red each at HEAD |
```

**(2)** `:272` — replace the §Design heading with:

```
### §Design — three gates, one wave (vitest-fs per the RULED OPEN-1; the refract arm is the one Playwright exception)
```

**(3)** insert immediately AFTER `:326` (the line ending `the collapse mandate cuts the other way).`) and BEFORE the blank line preceding `### §Work`:

```

**(D) `gate:refract-lens-never-sharper` — the WebKit `@supports` gate-lie (added 2026-07-20,
STAB12; `PLAN.md:17` and `BAND-MATERIAL` W8 both assign the authorship here, and it was missing).**
On WebKit, `.glass-lens` over a striped scene must paint gradient energy within tolerance of its
blur-only twin; **the lens may NEVER paint sharper than its own blur base, on any engine.** Unlike
(A)/(B) this arm is NOT vitest-fs — it is a Playwright/WebKit paint probe on the **video/screencast
path** (`page.screenshot()` is backdrop-filter-BLIND on WebKit and false-FAILS the GREEN side —
`safari-arm.md` §0, harness law 1). It is the second Playwright exception in this band, alongside
wave 2's pixel floor.

Born-RED violation shipped at HEAD (WebKit 26.5, Playwright webkit-2311):
`src/styles/glass-refract.css:98` gates the refraction composite on
`@supports (backdrop-filter: url("#glass-refract"))`. WebKit returns **true** for every form —
fragment, gate, and the shipped data-URI — and computed style retains the composite, but **paint
drops the WHOLE value including the blur leg**. Probe chips over a striped scene (background
baseline 0.0756): blur-only **0.0018** (frosted) vs `blur+url(#)` **0.0749** and the verbatim
shipped value **0.0748** — every `url()`-bearing chip stone sharp. The gated declaration overrides
the un-gated blur base, so `.glass-lens` ships with NO backdrop filter on the Safari floor — worse
than the intended blur-only degrade. Chrome 150 unaffected. Evidence:
`../../IOS27-MICRO/passes/PASS-2/safari-arm.md` §F5 (U1 RED) +
`../../IOS27-MICRO/prototypes/f5-optical-medium/PROBE-NOTES.md` "PASS-2 SAFARI ARM"; WebKit bug 245510.

The fix flip (the runtime latch that replaces the lying `@supports`) is **`BJ.W-REFRACT-LATCH`
(MATERIAL W8)** — this wave authors the GATE born-RED; the latch flips it GREEN on the video-path
WebKit capture. It is a **STANDING regression lock** (it also catches the day WebKit ships `url()`
for real — the functional arm goes true, the gate stays green), so it enters W1's census as ONE
additional standing gate and the keep pin drops to **≤51** (≤50 under COLOCATION Form B) to absorb
it inside the ≤60 ceiling.
```

**(4)** `:334` — insert after the `orphan-css-partial.test.ts` bullet and before the
`(No tests/gates/prop-granularity.test.ts …)` line:

```
- `tests-visual/refract-lens-never-sharper.spec.ts` — Playwright, Chromium + WebKit, **video-path**
  capture over the striped scene; assert the `.glass-lens` chip's gradient energy is within
  tolerance of its blur-only twin and never sharper, on either engine. Self-test bite: a planted
  `backdrop-filter: none` on the lens reds. (Playwright, not vitest — the same exception wave 2 carries.)
```

**(5)** `:342` — insert after the `orphan-CSS-partial RED at HEAD:` bullet:

```
- refract-lens-never-sharper RED at HEAD on WebKit 26.5: `glass-refract.css:98`'s `@supports`
  engages and `.glass-lens` paints **0.0748-sharp** against its **0.0018-frosted** blur-only twin.
  GREEN when MATERIAL W8's runtime latch lands (video-path WebKit capture + the latch-OFF degrade proof).
```

**(6)** `:101` and `:103-104` — replace

```
  its OPEN-P0 ruling)**, and this band's own W3 (2) + W4 (1) gates. W2's two pixel floors are
```
```
  keep-list is pinned so keeps + the enumerated newcomers ≤ 60 by arithmetic (**keeps ≤ 52**, ≤ 51
  under Form B), stated IN the count-guard test. STORY/FM/REDUCTION declare ZERO standing gates
```

with

```
  its OPEN-P0 ruling)**, and this band's own W3 (**3** — token-hygiene · orphan-CSS-partial ·
  refract-lens-never-sharper) + W4 (1) gates. W2's two pixel floors are
```
```
  keep-list is pinned so keeps + the enumerated newcomers ≤ 60 by arithmetic (**keeps ≤ 51**, ≤ 50
  under Form B — re-based 2026-07-20, STAB12 to absorb W3's refract lock), stated IN the
  count-guard test. STORY/FM/REDUCTION declare ZERO standing gates
```

**(7)** `:492` and `:514-515` — replace

```
= keeps (**pinned ≤52**; ≤51 under COLOCATION Form B) + 2 static gates (W3) + 1 type-hygiene gate (W4)
```
```
  + A11Y W3-C + own W3/W4 + COLOCATION-if-Form-B); keeps pinned ≤52 so the ≤60 guard holds by
```

with

```
= keeps (**pinned ≤51**; ≤50 under COLOCATION Form B) + 3 static gates (W3) + 1 type-hygiene gate (W4)
```
```
  + A11Y W3-C + own W3/W4 + COLOCATION-if-Form-B); keeps pinned ≤51 so the ≤60 guard holds by
```

### M-2 — `waves/APOTHEOSIS.md:50`

**Defect.** The §2 count ledger — the capstone's authoritative per-band count — reads
`| BAND-MATERIAL | 7 |` and `| **Total** | **47** |`, and §1's headline reads "47 waves across
nine bands", while `BAND-MATERIAL.md:762` charters Wave 8 and `PLAN.md:17` cites it by name. A
seat reconciling the corpus against the capstone count concludes W8 is spurious.

**CURE (three verbatim edits):**

`:50` → `| BAND-MATERIAL | 8 | W6 same-cut with GATES W4; W8 `BJ.W-REFRACT-LATCH` minted 2026-07-20 (STAB11) for the second shipped 7.0.0 defect |`

`:54` → `| **Total** | **48** | + the external GF-DOCK/GF-HANDMARK/GF-AURORA/GF-BLOB campaigns |`

`:25` → `**48 waves across nine bands reform glass-ui from the evidence outward:** the gate surface`

### M-3 — `waves/APOTHEOSIS.md:56`

**Defect.** §4 invariant 3 makes this arithmetic binding ("Every standing vitest gate is
enumerated in GATES W1's inbound roster and count-guard arithmetic (§2)"), and as written it is
**saturated at exactly 60 in both branches** — 52+2+1+1+4 = 60 without the fence; 51+2+1+1+4+1 = 60
with it. MATERIAL W8's `refract-lens-never-sharper` is a declared STANDING lock, so it lands at
**61** and breaks the user-mandated ceiling; the arithmetic also never names it.

**CURE — replace `:56-58` with:**

```
Standing-gate arithmetic (binding; re-based 2026-07-20, STAB12): keeps ≤ 51 (≤ 50 if COLOCATION
Form B) + GATES W3 (3 — token-hygiene · orphan-CSS-partial · refract-lens-never-sharper) + GATES
W4 (1) + A11Y W3-C (1) + PERF (4) [+ COLOCATION fence (1)] ≤ 60. The prior line pinned keeps ≤ 52
with GATES W3 at 2 and was saturated at exactly 60 in BOTH branches, so MATERIAL W8's standing
refract lock broke the ceiling until the keep pin absorbed it. All other bands: ZERO standing
gates, declared in each band.
```

### M-4 — `waves/APOTHEOSIS.md:96`

**Defect.** §3's phase 2 enumerates MATERIAL W1/W2/W3/W4/W5/W7 and stops; W8 appears in no phase
of the landable sequence. This is the exact class STAB11 cured at `:78-83` for GATES W3 and A11Y
W4 — and the carve-out sentence it added applies verbatim here ("a map that omits a road conflicts
with nothing", so the "band file wins on conflict" clause does not reach it).

**CURE — replace `:96-97` with:**

```
MATERIAL W5 · MATERIAL W7 (closure restore; flips GATES W3's orphan gate; consumes CL-3
KEEP-CENTRAL) · **MATERIAL W8** (`BJ.W-REFRACT-LATCH` — the WebKit `@supports` gate-lie repair;
flips GATES W3's `refract-lens-never-sharper` GREEN on the video-path WebKit capture; shares no
file with any other wave, so it runs any time after GATES W3 authors the gate) [phase seat added
2026-07-20, STAB12 — W8 was minted at STAB11 and appeared in NO phase of this section] ·
DOC-TRUTH triggered rows fire as their triggers land (T6←MATERIAL W1,
```

### M-5 — `waves/BAND-MATERIAL.md:48`

**Defect.** The band file contradicts itself in four places: `:9-10` "Wave 7 now precedes the
roll-up", `:48` "Seven waves:", the wave table `:50-58` (seven rows), and the `:874-879` in-scope
summary (ends at W7) — all while W8 is authored at `:762-834`. Any seat scoping the band from its
header ships seven waves and drops the second known 7.0.0 defect.

**CURE (four verbatim edits):**

`:9-10` → replace `Wave 7 now precedes the\nroll-up (structural tidy only).` with
`Waves 7-8 precede the\nroll-up (structural tidy only); Wave 8 (`BJ.W-REFRACT-LATCH`) was minted 2026-07-20, STAB11.`

`:48` → `EIGHT waves (W8 minted 2026-07-20, STAB11 — the second shipped 7.0.0 defect):`

insert after `:58` (the W7 table row):

```
| 8 | `BJ.W-REFRACT-LATCH` | Replace the lying `@supports (backdrop-filter: url(…))` gate with a runtime latch; restore the intended blur degrade on the WebKit floor | Yes — WebKit 26.5 accepts the gate at parse and drops the paint: `.glass-lens` reads 0.0748-sharp vs its 0.0018-frosted blur-only twin, shipped in 7.0.0 |
```

`:879` → replace `paint π (W6); the chip + glass-atom @import closure restore with the live accent-paint re-verify (W7).`
with `paint π (W6); the chip + glass-atom @import closure restore with the live accent-paint re-verify (W7); the WebKit `@supports` gate-lie replaced by a runtime latch, with the born-RED `refract-lens-never-sharper` lock flipped GREEN on the video-path capture (W8).`

### M-6 — `waves/BAND-MATERIAL.md:820`

**Defect.** W8's own count-guard sentence reads `keeps ≤52 + W3's 2+1 + W4 1 + A11Y W3-C 1 +
PERF 4 [+ COLOCATION fence 1] + THIS 1 ≤ 60`. It counts the refract gate **twice** ("W3's 2+1"
already includes it, then "+ THIS 1" adds it again) and the sum is 62 without the fence / 63 with
it — the stated "≤ 60" is false either way, and even de-duplicated it is 61/62 against the
capstone's saturated base. An execution seat authoring the count-guard to this line lands a guard
that cannot pass.

**CURE — replace `:820-822` with:**

```
up), so `BAND-GATES` W1's ≤60 count-guard arithmetic absorbs it as ONE additional standing gate
inside W3's set: keeps ≤51 + W3 3 (token-hygiene · orphan-CSS-partial · THIS) + W4 1 + A11Y W3-C 1
+ PERF 4 [+ COLOCATION fence 1] ≤ 60 — the keep pin drops 52→51 (51→50 under Form B) to make room,
per invariant 3; reconcile at the W1 collapse. [Arithmetic corrected 2026-07-20, STAB12: the prior
line wrote "W3's 2+1 … + THIS 1", double-counting this gate and summing to 62-63 under a "≤ 60"
claim, against a capstone base already saturated at exactly 60.]
```

### M-7 — `EXECUTION-PROGRESS.md:61`

**Defect.** P-EX2 schedules `MATERIAL W1–W7 (W3 = the DesignSync judgment; W6⇄GATES-W4 coupled
cut)`. W8 carries no ASK gate and no veto, so it is parked by nothing — it simply belongs to no
phase and launches under no seat. This is the identical silent-drop STAB11 cured in this same row
for STORY W7 / A11Y W3-W5 / FM W7.

**CURE — replace the substring `MATERIAL W1–W7 (W3 = the DesignSync judgment; W6⇄GATES-W4 coupled cut)` at `:61` with:**

```
MATERIAL W1–W8 (W3 = the DesignSync judgment; W6⇄GATES-W4 coupled cut; **W8 `BJ.W-REFRACT-LATCH`** — the WebKit `@supports` gate-lie repair, free-standing after GATES W3 authors `refract-lens-never-sharper`, video-path WebKit capture owed) [W8 added 2026-07-20, STAB12 — minted at STAB11 and left in no phase]
```

### M-8 — `PLAN.md:178`

**Defect.** FAMILY D's header reads "(7 waves at union…)" and §1's DAG reads "BAND-STORY (7)", but
the roster bullets enumerate W1-W6 only and `BJ.W-STORY-TRANSITIONS` — a chartered wave with four
born-RED gates, an APOTHEOSIS D-18 seam, and a PERF W4 co-design contract — appears **nowhere in
`PLAN.md`** (grep = 0). Unlike FM W7, which its own family header names, STORY W7 is invisible to
the plan of record; a seat reading PLAN §2 for the family's scope ships six waves. The §2
SUPERSESSION LAW does not reach it: it resolves *conflicts* in favour of the band file, and an
omission conflicts with nothing (the capstone's own STAB11 carve-out at `APOTHEOSIS.md:82-83`).

**CURE — insert after `:195` (the `W6 BJ.W-RESPONSIVE-AUDIT` bullet, ending `(per-page breakage@viewport→fix→DELTA)`):**

```
- **W7 `BJ.W-STORY-TRANSITIONS`** — the typed transition GRAMMAR: four semantic VT types
  (`route-lateral` (+`-back`) · `route-descend`/`route-ascend` shared-element tile→hero ·
  `route-jump`) over `demo/chassis/routeTransition.ts` + the route section of
  `src/styles/view-transition.css`, plus the compositor-only entrance register. **Born-RED =
  G-TRANS-1..4** (ONE type at `routeTransition.ts:12`, ONE recipe at `view-transition.css:47-55`;
  no `view-transition-name` on any tile). Choreography FEEL stays `BAND-PERF` W4's (senior on
  F07); PERF's `OPEN-P10` CONSUMES this four-type set — one mechanism per nav class (APOTHEOSIS
  D-18). GF-DOCK W6 owns the dock band.
  [Added 2026-07-20, STAB12 — this family's header and §1 DAG both counted SEVEN waves while the
  roster enumerated six; `BJ.W-STORY-TRANSITIONS` was named nowhere in this file.]
```

---

## Charter reconciliation — the two flagged items, both PRE-CURED on disk

Recorded as clean, not filed as findings; both were cured after the commit the charter names.

- **The OPEN-FM-1 label collision — CLOSED, no cure owed.** `BAND-FEEDBACK-MOTION.md:342-346`
  carries the dated CLOSED bracket (landed FIXLOG-STAB7 cure 1); `DOSSIER-F11-F20.md:412-414`
  reads `OPEN-FM-3a` per RU-14 R5 (`dcb2832a`); ledger C3 is REFUTED-as-pre-satisfied with a
  lead-verified refutation. Re-proven this seat: a corpus-wide `grep -rn 'OPEN-FM-1' docs/`
  returns only (a) the band's own W2 loop/indeterminate question at `:328-330`, (b) records that
  explicitly disambiguate it, and (c) ring-history read-point records. One label, one question.
- **The CRIT8B-1 RESIDUE — OWNED, no cure owed.** Ledger `C6` now ends "RESIDUE DISPOSED
  2026-07-20 — it is OWNED as ledger row **C7** below", and `C7` exists at `:94` with a named
  owner (the RU-01 capstone seat), named anchors (`DOSSIER-A01-A17.md:79-91` +
  `REFABLE-RU-13-A01-A17.md:40`/`:229-241`), a stated 8−1=7 reconciliation, and an explicit
  no-verdict-movement fence. The terminal-order clause at `:160-163` names its firing event.

**Charter premises superseded by HEAD (not defects).** The charter's HARD FREEZE states "the atlas
Q mailbox is MARKED-HELD and the G-CLOSE veto STANDS." On disk both have **ended**: disposition
Addendum 3 (terminal, 2026-07-20, banked in HEAD `0b4c5840`) lifts the hold and un-gates G-CLOSE,
verified against `.p-totality/sci` `6c4bbc06` + `109f5573`. `FINAL.md:66-74`/`:100`, ledger `I1`,
and `EXECUTION-PROGRESS.md:46-53`/`:78-86` are consistent with the terminal ruling; **no** file in
the corpus still asserts the pre-lift state without a dated superseding bracket. Nothing filed.

## What was checked and found sound (the negative record)

- **The browser trio's facts are absorbed everywhere they bind.** `PLAN.md:387-398` carries V-A95
  at RETIRE-OR-CONFIRM with all four non-reproductions cited (round-3-live 3/3 · RU-20 R3A-4 ·
  RU-29 A2) and explicitly "NOT a born-RED row" at `:17`; no band asserts it as an active RED.
  chip-CSS remains a CONFIRMED-DEFECT with one owner (MATERIAL W7) and one gate (GATES W3
  orphan-CSS-partial) — RU-20 N3's `@import` mechanism is already W7's fix text (ledger K3
  VERIFIED-PRESENT, re-proven). RU-26's LIVE-DEFER lift and the `224024c3` engage-bank pin ride
  ledger H4, `PLAN.md:318-322` and the cursor's early-rows list consistently.
- **Every ledger grep assertion re-ran clean this seat.** `BAND-STORY.md` returns 0 for
  `dock-controls`/`demo-coverage`/`controls.vue`/`ScrollProgressRim` (J1/J3 mint a section);
  `BAND-A11Y.md` 0 for `icon-btn`/`40px`/`fine-pointer` (G-1 files a new clause beside W2 (F),
  which exists); `BAND-MATERIAL.md` 0 for `attenuat` (G-3 mints); `BAND-PERF.md` 0 for `DataTable`
  (G-4 annotates); `waves/` 0 for `adornment`/`option-slot` (G-5's alternate arm rightly struck);
  `BAND-GATES` W1's subheads are exactly the seven the ledger lists (J5/K1 mint §Method notes).
- **Ledger anchor pins hold at HEAD.** J2→`BAND-FEEDBACK-MOTION` W7(d) `:315-319`;
  K5→`BAND-STORY` W5 STAB2 rider `:470-471`; K6→`BAND-PERF` `:40` + `:171-172`;
  ASK-25→`BAND-A11Y.md:237-238` and FM OPEN-FM-2 `:331-335`; ASK-27→FM `:336-346`, PERF `:598`/
  `:637`, STORY `:442`/`:696`; ASK-13→STORY OPEN-D9 `:645-649`.
- **The W-1 ⇄ DOC-TRUTH spring seam is coherent in both directions.** `FINAL.md:32` and
  `BAND-DOC-TRUTH.md:52-61` state the same law (W-1 first, W-1's values the source, never the
  pre-W-1 0.30), and the on-disk premise re-proves exactly: `springPresets.ts:95-99` = dock
  {response 0.3, ζ 0.82}, while `scheme-spring.css:29` still mirrors the refuted `(0.68s, ζ=0.64)`
  — the stale mirror W-1 regenerates and T1/T9 truth up. No band edits `scheme-spring.css:31` in
  another's cut.
- **The W0 paint ledger's 6 PASS / 1 DEFER roll-up is reflected without inflation.**
  `EXECUTION-PROGRESS.md:13-14` states it exactly; `FINAL.md:88-93` names both row-7 sub-parts the
  FINAL cut predated so the DEFER closes against owners, not silence.
- **PARKED-UNROUTABLE (REDUCTION W6/W7) is correctly pending, not a finding.** Both rows demand a
  lead/owner mint into `ASK.md` — squarely inside the HARD FREEZE — and the STAB9 escalation is
  mirrored in the band file (`:577`, `:614`), the still-OPEN register (`:767`), and the cursor
  (`:87-98`). The lead adjudication that landed in HEAD closed a different four (STAB7 #12/#17,
  STAB8 E-1/E-2); these two remain owner-owed by design.

---

## Cosmetic (wording only — these do NOT bear on the verdict)

1. **`ASK.md:313` roll-up cell** reads "prune whole section (scene: 6-vs-7)" while the row body's
   dated STAB9 bracket at `:130` re-anchors the pair to **FIVE / SIX**. Freeze-compliant cure if
   desired: append ` [integers re-anchored FIVE-vs-SIX per the row's own 2026-07-20 bracket]` to
   the cell. Substance and stake are declared unchanged by the bracket itself, and
   `BAND-STORY` OPEN-D9 is the governing record — no ruling moves either way.
2. **`ASK-REDUCTION.md:332` roll-up cell** carries the same stale "6-vs-7" against its own
   `:313` bracket. Same optional bracket-only cure.
3. **`ASK.md:304` vs `ASK-REDUCTION.md:330`** describe the same C3 table as "2 deletes" and
   "3 deletes" respectively — a counting-basis difference (two delete *entries*,
   `useBloomUp`+`bloomUpField` and `useStaggerReveal`, spanning three *symbols*). The per-symbol
   table both rows point to is identical and governs; nothing misroutes.
4. **`PLAN.md:267`** names FM W7 in the family header but omits its roster bullet (unlike STORY
   W7 at M-8, which is unnamed anywhere in the file). Discoverable as written; a bullet would
   simply be tidier.
5. **`BAND-MATERIAL.md:9-10`'s** "Wave 7 now precedes the roll-up (structural tidy only)" is
   folded into M-5's cure; on its own it is only a stale ordering note.

---

## Two-consecutive-clean status

**Round 12 is NOT clean.** The chain does not reach two-consecutive-clean at this round: eight
material findings stand, seven of them one root (the STAB11 W8 mint swept into two files out of
seven). A fixer round is owed, then a fresh COHERENCE + COMPLETENESS pair over the amended corpus.
