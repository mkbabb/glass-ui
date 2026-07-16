# R3 Critic 1 — close-class lies + evidence discipline

Posture: non-author adversarial critic. Fences honored — glass-ui + siblings READ-ONLY,
read-only git/grep only, one file written (this one). Every verdict below is grounded in a
grep/read against the live working tree at `/Users/mkbabb/Programming/glass-ui` (HEAD
`e5b3a209`, uncommitted 7.0.0-in-flight transaction) this session.

**Bottom line: NOT clean.** The registry's R2 corrections and the plan's gate-ruling
discipline are largely sound — I verified the whole H-1 "never-relitigate" motion roster,
the P019 pair, the eyeglass default, the card-pad ladder, and the meta-leak counts, and
they hold. But one MAJOR registry finding (C-2) has no plan home at all, and two registry
rows still assert the opposite of what the authoritative correction block and the tree say.

---

## H1 (moderate) — C-2 is undispositioned: a MAJOR finding with no wave, no verify-row, no queue entry

C-2 (registry FAM-C, severity **major**): "~20 component waves flatten-only PARTIAL; 9
consolidation waves in-flight only (P074/P081/P082/P091/P100/P104/P113/P117 + P083) — 6.0.0
still ships the duplicates they were to remove."

Search of the entire plan (`ADDENDA-PLAN-DRAFT.md`) and the disposition queue
(`REGISTRY.md:176-184`): **C-2 appears nowhere.** No wave owns it, no ratify/verify row
carries it, the disposition queue omits it. It is silently absorbed into the plan header's
one-word exclusion "consolidations" (`ADDENDA-PLAN-DRAFT.md:6`).

This is dishonest-by-omission relative to how the plan treats its two sibling in-flight
findings, which it explicitly fences with a verify obligation:
- C-1 value bundle → "addenda must verify-not-duplicate" (C-1 row) / Q003 fences it.
- G-4 metric quad → "addenda **VERIFIES only**" (G-4 row).

C-2 gets neither. A major finding routed to codex with the owner named only implicitly and
**no verification obligation** is exactly the "chronic silently re-booked" pattern the
disposition discipline is supposed to catch.

Severity mitigant (why moderate, not major): the working tree shows the consolidations
largely LANDED already — `src/components/metric-badge`, `metric-cell`, `metric-stack` are
now empty husks, and `metric/` holds the coalesced `Metric.vue/MetricCell.vue/MetricRow.vue/
MetricStack.vue` (P117 done in-tree). So the "6.0.0 ships duplicates" concern is mostly
mitigated by the in-flight tree. But that is *more* reason to give C-2 a one-line
"verify-largely-landed" disposition like G-4, not to drop it. As written, nothing in the
addenda confirms all 9 consolidations + ~20 flatten-partials actually cleared before the
7.0.0 tag.

Evidence: `ADDENDA-PLAN-DRAFT.md` (full read, no C-2 / P074 / P081 / P083 hit);
`REGISTRY.md:89` (C-2), `:88` (C-1 verify fence), `:140` (G-4 verify fence);
tree: `ls src/components/metric*` → metric populated, metric-badge/cell/stack empty.

---

## H2 (minor) — FAM-F row F-6 asserts P019 "still absent"; the authoritative block and the tree say DONE

Registry F-6 (FAM-F): "P019 paired-1/√φ pair **still absent** (matches value.js census;
active codex work)." (`REGISTRY.md:125`)

The tree contradicts it — the pair is fully present:
- `src/styles/typography/scale.css:129` `--type-proportional-ratio: 0.7861513777574233; /* 1/√φ */`,
  `:130` `--type-proportional-headline-size: var(--type-display-2)`, `:131-133`
  `--type-proportional-kicker-size = headline * ratio`.
- `src/styles/typography/semantic.css:22-29` `@utility text-proportional-headline` +
  `text-proportional-kicker`.

The registry's own authoritative correction block C-1 (`REGISTRY.md:27-31`) states P019 is
"ALL implemented in the codex tree" / "IN-FLIGHT-DONE", and r2-consumer-verify Claim 4
independently found "Full pair present." So F-6 directly contradicts C-1 within the same
document.

Nuance (why minor): F-6's source is the design-audit, which read the *published 6.0.0*
surface ("`1/√φ` ratio does not exist at 6.0.0", design-audit.md:78-80) — literally true for
6.0.0, since codex added the pair in the uncommitted 7.0.0 transaction. So it is a stale
6.0.0-snapshot row, not fabricated. But it carries no snapshot caveat, and C-1 (authoritative)
supersedes it. A reader consulting FAM-F alone would conclude a delivered feature is missing
and could re-book it. The "R2-corrected" registry should have reconciled the row.

No *plan* wave rests on F-6 (P019 is correctly excluded as codex work), so the blast radius
is registry hygiene only.

---

## H3 (minor/cosmetic) — un-reconciled stale table rows still assert refuted claims (superseded, but left standing)

The registry title claims "R2-verified", and the top corrections block fixes these by ID,
yet the family tables still carry the pre-correction wording:
- **F-3** (`REGISTRY.md:122`): "Eyeglass tabs **CONFIRMED absent** in working tree ... UF-H1
  orphan stands." The corrections block (`:5-8`) explicitly REFUTES this by ID ("UF-H1 is
  DELIVERED"). Tree confirms delivered: `SegmentedTabs.vue:385` carries `glass-lens` on the
  pill indicator; `scheme-spring.css:107` `--spring-eyeglass`. Row is the opposite of the truth.
- **C-4** (`:91`): "left zero trace in shipped Tabs (pill/underline only)" — same refuted claim.
- **D-3** (`:101`): "43 direct files → ~6 ... submodules." Corrected to 42 files / 7 buckets
  at `:36-38` and used correctly by plan Q032. Tree confirms 42.
- **A-5** (`:70`): "5 stale consumers (muster/slides/speedtest/words/bbnf-buddy)." muster+words
  refuted as non-consumers at `:17-20`; plan Q061 handles it correctly.

All four are superseded by the corrections block / plan and are therefore not load-bearing —
but a "corrected" registry that leaves four rows asserting the negation of its own findings is
an evidence-discipline smell. Delete or strike the stale rows.

---

## H4 (minor) — Q022 double-owns the dock/motion π discharge with Q003

Q022 MOTION-PI-DISCHARGE (`ADDENDA-PLAN-DRAFT.md:75-76`) is defined as "rides Q003: the
retuned feel confirmed in paint (dual-engine, both modes, real Safari; DOCK-LADDER
overshoot/settle/interruption numbers traced)." Q003 PAINT-BATCH-AT-HEAL (`:37-43`) already
enumerates "the retuned dock/motion feel traced (DOCK-LADDER overshoot/settle/interruption
numbers)." Q022 adds no work Q003 doesn't already own — it is a pointer wave. Fold it into
Q003 or state explicitly that Q022 is a cross-reference, not an independent deliverable, so it
is not counted twice at close.

---

## H5 (minor) — I-6 media-preservation is tagged CRITICAL but the addenda takes no mitigating action

I-6 ("PROVENANCE ALARM ... the entire motion/dock/glass calibration is one cleanup away from
unre-derivable", severity **critical**, `REGISTRY.md:165`) maps to Q063, whose own text
concedes "the copy itself is a **codex-or-user act** (our fence: no repo writes)"
(`ADDENDA-PLAN-DRAFT.md:154-155`). So the plan's response to a *critical preservation* risk is
a flag in the inbox note — no owner has committed to actually copying the source media out of
`~/Downloads/New Folder With Items 4/`. This is honest given the read-only fence, but the
critical risk is left unmitigated and un-owned. The addenda should name a concrete owner + a
deadline for the copy, not leave "codex-or-user" as the assignee, or the alarm rides silently
exactly like the chronics the tranche exists to terminalize.

---

## Verifications that HELD (do-not-relitigate claims I tried to break and could not)

Spot-checked more than the required three; all confirmed in-tree:
- **H-1 motion roster (the whole "never re-litigate" list):** DOCK_SPRING = springPreset("dock")
  = **0.30/ζ0.82** (`springPresets.ts:99`, `dock/constants.ts:16-20`) — the memory note's
  0.68/0.64 is the stale value, the retune landed; DRAWER_SNAP = **{0.32,0.80}**
  (`drawer/constants.ts:30`); `transient` bloom register present (`springPresets.ts:109-113`);
  DOCK_MORPH_MAX_STRETCH = **1.14** (`dock/constants.ts:25`); `--motion-tempo: 1`
  (`scheme-motion.css:262`). Every claim true.
- **H-3 eyeglass spring UNCONSUMED:** confirmed — `--spring-eyeglass` (`scheme-spring.css:107`)
  has zero `var()` consumers except its own `-duration` self-reference (`:162`); the tab
  travel uses `--spring-snappy` (`SegmentedTabs.vue:246,258`). Q020's "wire-or-retire /
  ships static-only" premise is well-founded; `--eyeglass-live-t` grep is empty (two-rest-state
  machine genuinely unbuilt).
- **Eyeglass-as-default (F-1/G-8):** `glass-lens` on the pill default confirmed
  (`SegmentedTabs.vue:385`).
- **P019 pair present** (see H2) — the *tree* claim in C-1 is correct.
- **--card-pad √φ ladder (G-1/G-8):** confirmed (`card/styles.css:4-8`: 24px anchor →
  ×1.272 → /1.618 → /2.618).
- **F-6 audacious display register (φ^(11/2)≈352px):** TRUE — `--type-display-hero` peaks at
  17.942rem/352px (`scale.css:156`, `semantic.css:48`). (display-mega is the 177px φ^(9/2)
  rung; the 352px register is display-hero. My first grep missed it; it exists.)
- **Meta-leak counts (B-3/Q041):** demo `B[A-Z]\.W-|tranche` = **259 across 97 files**
  (matches plan); dist leak = **105 .d.ts + 4 .js** (matches). Plan uses the corrected numbers.
- **B-2 no-masking:** `scripts/no-masking-manifest.mjs` exists (unreferenced);
  `scripts/proof-no-masking-fallback.mjs` absent — CONFIRMED.
- **F-4 aurora wedge-catch:** the software-raster placeholder path is real
  (`aurora/composables/runtime.ts:444-470`), the "dead-preview/BLANK-frame" class is named in
  code; honestly carried as π-owed, not a lie.
- **Plan honors the gate ruling:** no wave mints a standing gate; Q034 abrogated, Q040 is a
  doc, Q041/Q042 mint no script, Q061's single line is a release.sh checklist entry (permitted).

---

## Note on H6 not raised as a hit
Q010 PAD-LADDER-UNIVERSAL edits `metric/styles.css` padding while codex's P117 metric
consolidation just landed in that same directory (siblings emptied this transaction). This is
a same-surface coordination hazard the plan does not flag (it fences G-4 as verify-only but
doesn't note Q010 writes files codex is actively editing). Flagging for the author to add a
one-line coordination caveat; not elevated to a hit because it is a sequencing nicety, not a
lie or a missed defect.
