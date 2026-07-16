# R3 · Critic 2 of 3 — completeness vs the source asks (NON-AUTHOR)

**Charge:** find what the R2-corrected REGISTRY / ADDENDA-PLAN-DRAFT v2 MISSED or got WRONG, judged
against the source asks (the session's a–m orders, the TAIL promotion rows + disease clusters, the
open-questions/Baseline/judgment rosters, and band-edge coherence). Read-only; wrote only this file.

**Verified against:** `ADDENDA-PLAN-DRAFT.md` @ 239 lines (the plan is being actively edited — my
first read caught a 195-line in-progress cut without Band 9 / the 10-item inbox note; all verdicts
below are re-checked against the CURRENT 239-line file), `REGISTRY.md`, and the eight reports.

**Verdict: NOT CLEAN.** Four substantive completeness gaps + six minor/notes. One R2-style
self-refutation applied (relay-in-inbox — withdrawn). The plan is ~90% faithful to the corpus; the
gaps below are real orphans and under-enumerations, not nitpicks manufactured to avoid a clean pass.

---

## SUBSTANTIVE (ranked)

### C2-01 [major] The completion/border-progress-consumer open_question is ORPHANED — 1 of the 6 §6 open_questions is absent from the plan entirely
`ledger-verify.md §6` enumerates the **6 user-ruling-owed open_questions**: inline-edit ·
Baseline-book batch · aurora-lazy-split · **completion/border-progress consumer** · metrics-sextet
scope · hover-popover Kronecker fold. Q051's roster (plan:133-138) lists five of them —
inline-edit, 8 Baseline books, aurora-lazy, metrics-sextet, hover-popover — and **omits
"completion/border-progress consumer."** Grep of the whole plan for `completion`/`border-progress`
returns only Q033's empty-husk rmdir note (`border-progress/composables`), which is a different
thing (the retired dir's litter, not the P-11 "does CompletionSeal have a real 2nd consumer"
ruling). Even if border-progress's retirement (UF-J4) moots half of it, the plan neither enumerates
the question in Q051 nor marks it MOOT/RESOLVED anywhere — it is silently dropped. This is exactly
the failure Q051 claims to prevent ("Nothing user-gated rides silently again"). Attack-vector-3
direct hit.

### C2-02 [major] Q051's "consolidate EVERY ruling-owed item" roster omits items the plan itself routes INTO Q051
Q051 is billed as "ONE user-gated checklist consolidating every ruling-owed item." But three
user-gated items that the plan/registry explicitly send to Q051 are missing from its enumeration:
- **Q080 version-rebaseline** — the plan says (202-203) it is "presented in Q051's roster as the
  FIRST judgment row (it gates the producers' publish)." It is **time-critical** (inbox item 0
  holds the kf/value publishes on it) yet does not appear in the Q051 enumeration at 133-138.
- **I-5 dot-flow halftone revival** — REGISTRY I-5 + media-analysis §8 route it "→ Q051 (judgment
  roster), not a silent build." Absent from the Q051 enumeration.
- **H-2 fission ratify-or-rebuild** — REGISTRY H-2 routes it "→ Q051 + Band 3"; Q021 is the
  decision wave, but the promised Q051 user-gate row is not enumerated.
A consolidation checklist whose own list omits its four highest-stakes inputs (incl. the
publish-gating version ruling) is the "rides silently" disease re-enacted at the roster it was
built to be. Attack-vector-3.

### C2-03 [moderate] Q042 UI-MONOLITH-SPLITS silently drops 3 of the ~6 non-exempt >500L files
B-4 / prompt-recap H-4 census names 9 files >500L. Q042 addresses Slider.vue (641), PagerDots.vue
(580), EasingPicker.vue (541) and blanket-exempts "shader strings and CSS sheets" (covers the blob
shader-string literals 537/527 and shell.css 505). That leaves **three .ts logic files
unaddressed and un-exempt**: `aurora/composables/atoms.ts` (592 — the **second-largest file in
src**), `blob/composables/useMetaballRenderer.ts` (547), `aurora/composables/runtime.ts` (520).
None is a shader-string or CSS sheet, so the exemption clause does not reach them, and the wave
title ("UI-MONOLITH") + its named roster bias entirely toward `.vue`. runtime.ts is doubly salient
— it is the FAM-F F-4 masking-suspect (`runtime.ts:444-470`), touched by Q003 for the rework but
never dispositioned for its size/cohesion. The plan drops the 2nd/4th/8th-largest offenders.
Attack-vector-1(e)/B-4.

### C2-04 [moderate] Two media (b)-diverging calibration targets have no owning wave
media-analysis §5 gap-map marks two targets **shipped-DIVERGING** (state b) and assigns both to
"motion-band register calibration" — but Band 3 has no such wave, and neither was elevated to a
FAM-I registry row (I-1..I-7 don't carry them):
- **T10 liquid-entrance reveal register** — "`.glass-reveal` ships; the shape correction (blur-led,
  ~0.93–0.95 scale) … the 0.88 grammar **over-rotates scale**" — a concrete code divergence, not
  just a paint-confirm.
- **T14 notification-capsule register** — enter should be gentle-class center-seed bloom (t90
  300–375ms, 0% overshoot), exit 100–117ms "not ≤40ms."
Band 3 waves (Q020 eyeglass, Q021 fission, Q022 π-discharge, Q023 graded-edge plus the
then-proposed engage mint, later declined by V-A122 for want of a second eligible consumer) cover
neither. The media order (attack-vector-1(k)/(h)) surfaces these as calibration debt that falls
through. (Q003 could absorb T10/T14 as paint verdicts, but a scale-from grammar retune is a product
edit, not a verdict — it needs an owner.)

---

## MINOR / NOTES (dropped-or-partial, low stakes)

- **C2-05 [minor] Prompt-recap addendum is itself incomplete** — the recap (215-220), the
  deliverable for user ask (c) "prompt-recap completeness," lists 9 mappings and omits **Band 9
  (the version-rebaseline + history-rewrite user directive — a whole user order, plan:181-213)**,
  **Band 8 (process meta-lens)**, and **the media find-and-analyze order (FAM-I/Q063)**; the relay
  mark is only obliquely folded into "codex-communication → inbox note." The waves exist; the recap
  the user explicitly asked to be complete drops a first-class user directive. *(Withdrawn sibling:
  my first pass flagged the relay as missing from the inbox note — REFUTED by inbox item (9), which
  carries the triumvirate + process keep/fail relay. R2-style self-correction.)*
- **C2-06 [minor] RM-3 (unlabeled eyeglass demo story)** — in the G-5 REMOVE roster ("add the story
  or drop the naming") but carries no plan disposition; silently dropped (cosmetic, but not marked
  declined).
- **C2-07 [minor] D-4 optional `_shared`/`styles` subgrouping (~57 files)** — REGISTRY D-4 low-pri;
  Band 4 neither carries it nor explicitly declines it (Q030-Q034 close A/B/C/E; C2/C3 dropped
  without a "declined-optional" note).
- **C2-08 [minor] N-4 (durable-state-fence) not in Q072's proposal roster** — process-lessons §5b
  proposes N-1..N-6 to ~/Programming/precepts; Q072 adopt-first names N-1/N-2/N-3/N-6 (+N-5=Q071)
  and omits N-4 (only "embodied locally," not proposed as a precept amendment).
- **C2-09 [minor] AX 21-book disease cluster (ledger §E cluster 8) has no consolidated Q050 line**
  — its pieces scatter (8 Baseline books → Q051, re-stamp-ceiling gate → the wholesale gate ruling,
  FOLD arms → ledger-done) with no single ratifying bullet, unlike D1/D2/C1 which each get an
  explicit Q050 disposition. All 8 disease clusters' *paint* carriers (reg#7/13/14/16, dis:*,
  §4a D8/D24/D25/GOO-SPLIT/VIZ-PARITY-METAL) DO land in Q002's roster — that half is clean.
- **C2-10 [note] F1 + G1 TAIL promotion rows not explicitly ratified** — Q050 terminalizes
  A1/A2/D1/D2/E1/C1; F1 (record-DEAD) and G1 (SRC-restructure DONE-VERIFIED) are done and need no
  wave, but the plan never closes the loop on them the way it does the other six. (Registry
  governing-facts note them; the plan does not.)
- **C2-11 [note] H-5 shell.css (505L) routing tension** — H-5/MD-5 route it "→ Q042 roster," but
  Q042's own logic exempts CSS sheets, so it is effectively dispositioned EXEMPT without the plan
  saying so. Harmless, but the two rows contradict on their face.

---

## ATTACK-VECTOR RESULTS (what held under pressure)

**AV1 — session asks a–m each carry an owner?** Mostly YES. (a) audit → registry+reports · (b)
chronic-DECIDED → Q050/Q051+disposition-queue · (c) recap → recap section BUT **incomplete
(C2-05)** · (d) Fable-audit → FAM-F/G/H · (e) colocation → Band 4 **minus 3 monoliths (C2-03) and
D-4 (C2-07)** · (f) isolation/durability/crons → STATE.md fences+guardian (session-conduct, correct)
· (g) proportionality REMOVE/AFFORD → Band 2/Q010 + Q003 π **minus RM-3 (C2-06)** · (h) motion/dock
working-challenged-changed-broken-publishable → Band 3 + motion-dock-audit §3 **minus T10/T14
(C2-04)** · (i) kf/value → Q061 (+Q080 window) · (j) process meta-lens/triumvirate/precepts →
Band 8 **minus N-4 (C2-08)** · (k) media → FAM-I/Q063/Band-3 mints **minus T10/T14 (C2-04)** · (l)
relay → inbox note item 9 (HELD) · (m) gate ruling → Bands 1/5 + the ruling section (HELD, prominent).

**AV2 — TAIL promotion rows A1/A2/C1/D1/D2/E1/F1/G1 + 8 disease clusters each land in a Q-wave?**
A1/A2/D1/D2/E1/C1 → Q050 bullets (clean). Disease clusters 1–7 (paint carriers) → Q002 roster
(clean). Cluster 8 (AX) → scattered, no consolidated line (**C2-09**). F1/G1 done-verified, not
ratified (**C2-10**). No promotion-row orphan; the gaps are ratification-hygiene.

**AV3 — 6 open_questions + 8 Baseline + inline-edit + judgment a–g all in Q051?** NO —
completion/border-progress-consumer is **absent (C2-01)**; three routed-in items un-enumerated
(**C2-02**). judgment a–g ✓, 8 Baseline ✓, inline-edit ✓, aurora-lazy ✓, metrics-sextet ✓,
hover-popover ✓.

**AV4 — band edges / no dependence on an abrogated wave?** CLEAN. No reference to Q001 (folded into
Q002) anywhere. Q062's `P013→Q034` lands on Q034's RETIRED-TERMINAL disposition (coherent, not a
broken edge — Q034 still exists as the disposition owner). All cross-refs (Q003 ← Q010/Q020/Q022/
Q023/Q062; Q002 ← Q050/Q062; Q022 ← Q051; Q040 ← Q062; Q034 ← Q062) resolve to existing waves. The
gate ruling's reshape of Q040/Q041/Q042 is internally consistent. One stale echo: REGISTRY's
disposition-queue still says "P013/P014→minimal invariant wiring" while the plan (post gate-ruling)
correctly abrogates the wiring — the plan is right; the registry line is stale, not the plan.

---

## Bottom line
Two major orphans (completion/border-progress open_question dropped from the plan; Q051's
consolidation roster missing its four highest-stakes routed-in items incl. the publish-gating
version ruling) and two moderate drops (three .ts monoliths incl. the 2nd-largest src file;
T10/T14 media calibration registers). The rest are ratification-hygiene notes. Band edges are
sound; no abrogated-wave dependency. Fixable by amending Q051's enumeration, adding a Band-2/4/3
line each, and completing the recap — no structural rework.
