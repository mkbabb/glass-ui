# FIXLOG-STAB12 — the round-12 fixer pass (mechanical, zero judgment)

- **Seat:** STAB round 12 FIXER. **Model:** `claude-opus-4-8[1m]` (read verbatim from this seat's
  system context: "The exact model ID is claude-opus-4-8[1m]").
- **Applied:** 2026-07-20, working tree over HEAD `97843257` + the uncommitted STAB9/10/11 cure set.
- **Inputs:** the 13 charter cures, sourced from `STAB12-COHERENCE.md` (M-1…M-8) and
  `STAB12-COMPLETENESS.md` (M-1…M-5).
- **Tally: 25 legs APPLIED · 14 legs ESCALATED.** At the charter-cure grain: 8 COHERENCE cures
  applied in full; 1 COMPLETENESS cure applied in full (M-5); 3 applied in part (COMP M-1, M-2,
  M-4); 1 escalated in full (COMP M-3).
- **HARD FREEZE honored.** No cure in this round touched `ASK.md` or `ASK-REDUCTION.md`. No ASK row
  was renumbered, reworded, merged, or re-scoped. No pending-ruling row was treated as a finding.
  The atlas-Q / G-CLOSE framings were not edited in either direction.

---

## The governing collision (read this before the ledger)

The two lenses independently diagnosed the same root — STAB11 minted `BJ.W-REFRACT-LATCH` as
`BAND-MATERIAL` Wave 8 and swept it into two files out of seven — and then prescribed **two
different, mutually exclusive repairs** at nine shared anchors. They differ on the load-bearing
question of how the new standing gate enters the ≤60 census:

| | COHERENCE model | COMPLETENESS model |
|---|---|---|
| `refract-lens-never-sharper` counts | **inside** the vitest count base, as W3's third static gate | **outside** the vitest count base, Playwright, beside W2's two CI-wired pixel floors |
| keep pin | re-based **52 → 51** (51 → 50 under COLOCATION Form B) | unchanged at ≤ 52 (≤ 51 under Form B) |
| APOTHEOSIS §2 arithmetic | `GATES W3 (3)` with the keep pin absorbing the lock | `GATES W3 (2 vitest + 1 Playwright)`, guard declared unaffected |

Both cannot land. **The tie-break applied was mechanical, not judgmental: charter order.** The
COHERENCE cures are listed first in the charter, so they took the shared anchors; every
COMPLETENESS leg that collided was SKIPPED and is recorded below. **The landed corpus is therefore
on the COHERENCE model throughout** (BAND-GATES `:101-104` / `:492` / `:514`, APOTHEOSIS `:56-61`,
BAND-MATERIAL W8's count-guard sentence). This is a substantive accounting choice that a fixer has
no standing to make on the merits — see ESCALATION NOTE 1, which the lead should rule on.

---

## APPLIED — COHERENCE lens (19 legs, 8/8 cures in full)

### COH M-1 — `waves/BAND-GATES.md` — author the missing gate (7 edits) · **APPLIED**
1. `:47` wave-table row 3 → "THREE NEW static gates: token-hygiene · orphan-CSS-partial
   (both-channel walk) · refract-lens-never-sharper (…)". Applied verbatim.
2. `:272` §Design heading → "three gates, one wave (vitest-fs per the RULED OPEN-1; the refract arm
   is the one Playwright exception)". Applied verbatim.
3. The full **(D) `gate:refract-lens-never-sharper`** clause inserted after `:326`/before `### §Work`
   — verbatim from `STAB12-COHERENCE.md` §M-1 edit (3). Now `BAND-GATES.md:330-356`.
4. `tests-visual/refract-lens-never-sharper.spec.ts` §Work bullet inserted after the
   `orphan-css-partial.test.ts` bullet — verbatim from §M-1 edit (4). Now `:365-368`.
5. The `refract-lens-never-sharper RED at HEAD on WebKit 26.5` §Acceptance bullet inserted after the
   orphan-CSS-partial acceptance bullet — verbatim from §M-1 edit (5). Now `:377-379`.
6. `:101` `W3 (2)` → `W3 (**3** — token-hygiene · orphan-CSS-partial · refract-lens-never-sharper)`;
   `:103-104` `**keeps ≤ 52**, ≤ 51 under Form B` → `**keeps ≤ 51**, ≤ 50 under Form B — re-based
   2026-07-20, STAB12 to absorb W3's refract lock`. Applied verbatim.
7. `:492` → `keeps (**pinned ≤51**; ≤50 under COLOCATION Form B) + 3 static gates (W3)`; `:514` →
   `keeps pinned ≤51 so the ≤60 guard holds by`. Applied verbatim.

**Post-state:** `grep -c refract waves/BAND-GATES.md` = 11 (was **0**). The gate now has an author;
MATERIAL W8 has a born-RED half to flip.

### COH M-2 — `waves/APOTHEOSIS.md` count ledger (3 edits) · **APPLIED**
`:50` → `| BAND-MATERIAL | 8 | … W8 \`BJ.W-REFRACT-LATCH\` minted 2026-07-20 (STAB11) … |` ·
`:54` → `| **Total** | **48** | … |` · `:25` → `**48 waves across nine bands …**`. All verbatim.

### COH M-3 — `waves/APOTHEOSIS.md:56-58` standing-gate arithmetic · **APPLIED**
Replaced with the six-line re-based paragraph (keeps ≤ 51 · GATES W3 (3) · the dated STAB12
explanation of the both-branch saturation at exactly 60). Verbatim. Now `:56-61`.

### COH M-4 — `waves/APOTHEOSIS.md:96-97` phase 2 · **APPLIED**
Replaced with the six-line block seating **MATERIAL W8** in phase 2 with its dated bracket.
Verbatim. Now `:96-101`.

### COH M-5 — `waves/BAND-MATERIAL.md` roster self-contradiction (4 edits) · **APPLIED**
`:9-10` → "Waves 7-8 precede the roll-up …; Wave 8 (`BJ.W-REFRACT-LATCH`) was minted 2026-07-20,
STAB11." · `:48` → "EIGHT waves (W8 minted 2026-07-20, STAB11 — the second shipped 7.0.0 defect):" ·
the Wave-8 roster row inserted after the W7 row (now `:59`) · `:879` in-scope summary extended with
the W8 clause. All verbatim. Roster row count is now **8**.

### COH M-6 — `waves/BAND-MATERIAL.md:820-822` double-counted count-guard · **APPLIED**
Replaced with the six-line corrected arithmetic (`keeps ≤51 + W3 3 (token-hygiene ·
orphan-CSS-partial · THIS) + W4 1 + A11Y W3-C 1 + PERF 4 [+ fence 1] ≤ 60`) plus the dated STAB12
bracket recording the prior 62/63-under-a-"≤ 60"-claim defect. Verbatim.

### COH M-7 — `EXECUTION-PROGRESS.md:61` P-EX2 · **APPLIED**
`MATERIAL W1–W7 (…)` → `MATERIAL W1–W8 (… **W8 \`BJ.W-REFRACT-LATCH\`** … ) [W8 added 2026-07-20,
STAB12 — minted at STAB11 and left in no phase]`. Verbatim substring replacement.

### COH M-8 — `PLAN.md:178` FAMILY D · **APPLIED**
The 11-line **W7 `BJ.W-STORY-TRANSITIONS`** roster bullet inserted after the W6 bullet, carrying its
dated STAB12 bracket. Verbatim. `grep -c 'BJ.W-STORY-TRANSITIONS' PLAN.md` = 2 (was **0**); the
family header's "7 waves" and §1's "BAND-STORY (7)" now match an enumerated roster of seven.

---

## APPLIED — COMPLETENESS lens (6 legs)

These are the COMPLETENESS legs that touch sites the COHERENCE set does **not**, and whose content
does not contradict what landed.

- **COMP M-1 leg 1** — `BAND-GATES.md:261` wave heading `two NEW born-RED static gates` → `three NEW
  born-RED static gates`. Verbatim. (COHERENCE cured the wave-*table* row at `:47`; this is the
  §Wave-3 heading, a distinct site.)
- **COMP M-1 leg 2** — `BAND-GATES.md:267` §Mandate clause → the version naming
  **refract-lens-never-sharper** with the dated STAB12 bracket. Verbatim. *Observation, no action
  taken:* the cure's replacement re-states "against shipped" and the following on-disk line still
  begins "violations;", so the sentence now reads "…against shipped violations, joined by
  **refract-lens-never-sharper** [ … ] against shipped / violations; **prop-granularity…**". This is
  exactly what the cure specified; it was applied byte-exact and NOT improved.
- **COMP M-1 leg 7** — `BAND-GATES.md:462` band-level Coordination handoffs: the
  `refract-lens-never-sharper (W3) → the runtime refract latch (…MATERIAL W8)` bullet inserted as the
  list's first entry. Verbatim. Now `:499`.
- **COMP M-2 leg 3** — `BAND-MATERIAL.md:849`: the `The runtime refract latch (W8) → flips
  \`BAND-GATES\` W3(D) …` handoff bullet prepended to the W1-corner-k bullet. Verbatim.
- **COMP M-4 leg 2** — `EXECUTION-PROGRESS.md:105-106` early-unambiguous row 2 → the five-line version
  naming three GATES W3 gates and both flips (MATERIAL W7 orphan · MATERIAL W8 refract) with the
  dated STAB12 correction of "the one real shipped defect". Verbatim.
- **COMP M-5** — `EXECUTION-PROGRESS.md:99`: the full **LEDGER ANNOTATIONS OWED AT BAND-OPEN** bullet
  inserted immediately before the `- **Conditional:** ASK-24 …` line. Verbatim, including the K4/K6/K5
  destination pins, the J1+J3 and J5+K1 MINT instructions, the explicit "J2 does NOT land in
  BAND-STORY" carve-out, the silent-drop closing rule, and the C7 (RU-01 capstone seat) / G1 (P-EX5)
  firing events.

---

## ESCALATED — 14 legs, none applied, none improvised

### Class A — anchor consumed by an earlier charter cure (byte-exact application impossible) — 8 legs

Each find-string was re-greped after the COHERENCE set landed and returns **0**.

| leg | site | consumed by |
|---|---|---|
| COMP M-1 leg 3 | `BAND-GATES.md:272` §Design heading (`### §Design — two gates, one wave (vitest-fs per the RULED OPEN-1)`) | COH M-1 edit (2) |
| COMP M-1 leg 8 | `BAND-GATES.md:492` (`…pinned ≤52…+ 2 static gates (W3)…`) | COH M-1 edit (7) |
| COMP M-2 leg 1 | `BAND-MATERIAL.md:48` (`Seven waves:`) | COH M-5 edit (2) |
| COMP M-2 leg 4 | `BAND-MATERIAL.md:879` (`…live accent-paint re-verify (W7).`) | COH M-5 edit (4) |
| COMP M-3 leg 1 | `APOTHEOSIS.md:50` (`\| BAND-MATERIAL \| 7 \| W6 same-cut with GATES W4 \|`) | COH M-2 |
| COMP M-3 leg 2 | `APOTHEOSIS.md:54` (`\| **Total** \| **47** \| …`) | COH M-2 |
| COMP M-3 leg 3 | `APOTHEOSIS.md:56-58` (`Standing-gate arithmetic (binding): keeps ≤ 52 …`) | COH M-3 |
| COMP M-4 leg 1 | `EXECUTION-PROGRESS.md:61` (`MATERIAL W1–W7 (W3 = the DesignSync judgment; …)`) | COH M-7 |

Each of these sites **is** cured on disk — by the COHERENCE text rather than the COMPLETENESS text.
The defect is discharged; only the wording differs. Except at `:492`/`:56-58`, where the difference
is substantive (ESCALATION NOTE 1).

### Class B — anchor survives, but the cure would duplicate or contradict already-landed text — 6 legs

Applying these byte-exactly is mechanically possible and was **deliberately not done**: each would
land a second, differently-worded copy of a defect-repair that already landed this round. Curing one
defect twice is not a verbatim application, and choosing which copy to keep is judgment.

| leg | site | what a byte-exact application would produce |
|---|---|---|
| COMP M-1 leg 4 | `BAND-GATES.md` before the third `### §Work` | a **second** `**(D) gate:refract-lens-never-sharper**` clause. The cure's own disambiguator is also broken: it says to anchor on the `### §Work` "preceded by the `(C) prop-granularity dead-config` paragraph" — after COH M-1 edit (3) that `### §Work` is preceded by the (D) clause, so the stated identifying condition no longer holds. |
| COMP M-1 leg 5 | `BAND-GATES.md:335` | a **second** refract test-file §Work bullet, naming a *different* path (`tests/gates/refract-lens-never-sharper`) than the landed one (`tests-visual/refract-lens-never-sharper.spec.ts`) — two contradictory instrument locations in one bullet list. |
| COMP M-1 leg 6 | `BAND-GATES.md:343` | a **second** refract §Acceptance born-RED bullet restating the same 0.0748 / 0.0018 pair. |
| COMP M-1 leg 9 | `BAND-GATES.md:494` | would place the refract gate "outside the vitest base" while the landed `:492` counts it **inside** as W3's third static gate — and its coupled half (leg 8) is dead, so the accounting would be half-migrated. See ESCALATION NOTE 1. |
| COMP M-2 leg 2 | `BAND-MATERIAL.md:58` | a **second** Wave-8 roster row (the roster already reads 8 rows). |
| COMP M-3 leg 4 | `APOTHEOSIS.md:96` | a **second** MATERIAL W8 clause in phase 2 (COH M-4 kept the leg-4 find-string's first line intact and appended after `KEEP-CENTRAL)`, so the anchor survived). |

---

## ESCALATION NOTE 1 (lead ruling owed) — the landed corpus counts a Playwright gate inside a base defined as vitest

This is the one residual the fixer cannot close, and it is the direct consequence of the tie-break.

The COHERENCE model landed. Under it, `BAND-GATES.md:101-104` and `:492` now count
`refract-lens-never-sharper` as W3's **third static gate inside the count base**, with the keep pin
re-based 52 → 51 to hold ≤ 60 — while:

- the landed **(D)** clause at `:330-337` states the arm "is **NOT** vitest-fs — it is a
  Playwright/WebKit paint probe on the video/screencast path", and
- `:494` (untouched — its cure, COMP leg 9, is escalated) still reads "the 2 CI-wired pixel floors
  (W2) are Playwright, **outside the vitest base** but inside the enforced surface", and
- `:100` defines the census base as `BAND-PERF`'s and the band's own **vitest** gates.

So a Playwright gate is now counted inside a base the same paragraph defines as vitest-only. The
COMPLETENESS lens's legs 8/9 + M-3 leg 3 existed precisely to resolve this the other way (leave keeps
at ≤ 52, put the gate outside the base with the pixel floors, guard unaffected). **Two coherent
options; the fixer took neither on the merits, only on charter order.** The lead should rule:

- **Option A (landed, COHERENCE):** keep the gate inside the base; then `:494` and the base-definition
  sentence at `:100` need a one-line widening from "vitest" to "vitest + the CI-wired Playwright
  locks", and the ≤ 51 keep pin stands everywhere (BAND-GATES `:103`/`:492`/`:514`, APOTHEOSIS `:56`,
  BAND-MATERIAL `:820`).
- **Option B (COMPLETENESS):** revert the keep pin to ≤ 52 at those five sites and apply COMP M-1
  legs 8/9 + COMP M-3 leg 3 as written; the gate then sits outside the base like W2's pixel floors and
  APOTHEOSIS invariant 3 is satisfied at authorship rather than at the W1 collapse.

Either way the substance now exists in the corpus and no wave is unwitnessed — this is a
reconciliation of accounting method, not a re-opened defect.

## ESCALATION NOTE 2 (informational, no action taken)

`BAND-GATES.md:269`'s applied leg-2 text cites `BAND-MATERIAL.md:812-822`; that pin shifted by the
edits this round (the W8 gate-half paragraph now sits at `:814-825`). Cure text is applied verbatim
by charter, so the citation was not silently re-pinned. Same class: the COMPLETENESS report's own
`:812-822` / `:762` citations throughout. Re-pin at the capstone seat if the lead wants line-exact
cross-references.

---

## Post-application state (mechanical verification, this seat)

- `grep -c refract waves/BAND-GATES.md` = **11** (pre-round: 0) — the gate has an author.
- `waves/BAND-MATERIAL.md` roster rows `| N | \`BJ.W-…\`` = **8**; `## Wave 8` at `:763`.
- `BJ.W-REFRACT-LATCH` now named in: `APOTHEOSIS.md` (`:50` count ledger, `:100` phase 2) ·
  `BAND-MATERIAL.md` (`:10`, `:59` roster, `:763` body) · `BAND-GATES.md` (`:269`, `:351`, `:499`) ·
  `EXECUTION-PROGRESS.md:61` (P-EX2) · `PLAN.md:17`. Seven registers, was two.
- `grep -c 'BJ.W-STORY-TRANSITIONS' PLAN.md` = **2** (pre-round: 0).
- `ASK.md` / `ASK-REDUCTION.md`: **untouched** (no cure targeted either).
- Files modified this round: `waves/BAND-GATES.md`, `waves/APOTHEOSIS.md`, `waves/BAND-MATERIAL.md`,
  `EXECUTION-PROGRESS.md`, `PLAN.md`. Nothing outside `docs/tranches/BJ/`. No source file touched.

## Round 13 hand-off

The eight COHERENCE findings and COMPLETENESS M-5 are discharged; COMPLETENESS M-1/M-2/M-3/M-4 are
discharged **in substance** by the COHERENCE text at every site they named. A round-13
COHERENCE + COMPLETENESS pair should re-read the amended corpus fresh, and should treat ESCALATION
NOTE 1 as the one open reconciliation — it is a live accounting fork awaiting a lead ruling, not a
defect a fixer left behind.
