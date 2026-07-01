# A8 — ALL-PROMPTS coverage (RESPEC-GESTALT pass-1)

**Lens:** the "Recap ALL of our prompts and requests hitherto and ensure they've been addressed" sweep —
VERIFY + EXTEND the existing coverage corpus, going deeper on *standing mandates given ONCE and never
operationalized*. **Not** a re-derivation. HEAD `976dc890`, tree clean, verified on disk 2026-07-01.

## Verdict

The prompt-coverage question is, at the ROW level, already answered well. `docs/tranches/BG/DIRECTIVE-LEDGER.md`
deduplicates ~1517 raw utterances into **94 canonical directives**, each mapped to exactly one of 7 workstreams
or an explicit RETIRE, each status judged against the live-broken 4.2.0 reality (not a planning doc's self-report).
`P-historical-coverage.md` and `P-design-adherence.md` corroborate it with `file:line` evidence. That machinery is
sound and I do not re-litigate it.

The gap A8 exists to find is at a DIFFERENT altitude: **the mandates that post-date or sit OUTSIDE the archaeology
corpus — the standing memory-edicts and the freshest process directive — are not woven into the developed plan.**
The single highest-severity finding: **the 2026-07-01 Fable/DesignSync design-routing mandate — the freshest
standing directive, given AFTER the entire directive archaeology closed (ledger last-seen 06-25), and made BINDING
by this audit's own SEED-CONTEXT ("the AMENDED plan must encode this per-wave: every VISUAL wave names its Fable
design arm + its DesignSync review surface") — appears ZERO times across all four developed plan documents.** The
plan as folded will re-run the exact pattern the mandate was created to stop: opus-fanout-built visuals, which the
user judged "disastrous." Two lower-severity findings compound it (the Band-0 aesthetic edicts have no gestalt
acceptance path; the anti-amnesia ledger has gone stale by one mandate). Three verifications come back POSITIVE
(binding-sweep scheduled, goo-morph dots built, liquid-weight thoughtfully scoped) and are recorded for fairness.

Net: the coverage MATRIX is ~complete; the coverage ENFORCEMENT of the newest and the most-aesthetic mandates is
missing. Every gap below is a bounded plan-doc/wave-structure edit, not new mechanism.

---

## FINDINGS (ranked by severity)

### F1 (CRITICAL) — The Fable/DesignSync mandate (2026-07-01) is unencoded in the entire developed plan

The freshest standing directive (`~/.claude/.../memory/feedback_frontend_design_mcp_fable.md`, 2026-07-01, given
DURING BG+BH): *"Any and all frontend work should be using the frontend design plugin MCP with a Fable instance
set… This tranche set should be the perfection of the last set."* The rationale is verbatim the reason this whole
audit exists: *"The last several tranches' feature work was judged 'disastrous'… largely opus-fanout-built visuals.
Design judgment must sit with the strongest model; the DesignSync card review gives a gestalt surface the gate
machine lacks."* SEED-CONTEXT.md §"Standing directives" makes it BINDING on the output: *"every VISUAL wave names
its Fable design arm + its DesignSync review surface."*

Verified on disk — the mandate is absent everywhere it must live:
- `grep -c Fable|DesignSync` in the three folded AMENDED plans (`RESPEC/AMENDED-WAVE-PLAN.md`,
  `RESPEC-COHERENCE/AMENDED-COHERENCE-PLAN.md`, `BH/…/AMENDED-BH-COHERENCE-PLAN.md`) → **0 / 0 / 0**.
- `grep -ic fable|designsync|design-sync` in `docs/tranches/BG/FINAL.md` (the 184-`W-`-reference build map) → **0**.
- The only two files under `docs/tranches/BG|BH` naming Fable are `audit/archaeology/chunk-05.md` (a raw historical
  slice) and `SEED-CONTEXT.md` (this audit's own brief). **The plan itself is silent.**

Why this is CRITICAL and not cosmetic: the overwhelming majority of BG/BH waves are VISUAL (WS1 shell/field, WS2
dock, WS3 glass, WS4 components/demo, WS5 viz, WS6 Siri — six of seven workstreams). Every one of those waves, per
the binding rule, needs a named Fable design arm and a DesignSync review surface — and none has one. The
`DIRECTIVE-LEDGER` closes with *"No new workstream needed. Every distinct directive maps cleanly"* — but it was
built 06-25 and cannot have mapped a 07-01 directive. The mandate is a silent drop by omission, which violates the
ledger's own anti-amnesia bar (*"EVERY distinct directive maps to exactly ONE workstream OR an explicit RETIRE. No
silent drop"*).

There is a second-order fact: the `/design-sync` skill named in the seed is not visible in the running skill
roster, and DesignSync appears on disk only inside session task/project jsonl, not as a wired capability under
`~/.claude`. So the mandate is not only unplanned — its mechanism may be unprovisioned. The plan must at minimum
NAME the Fable arm per visual wave and gate on the DesignSync review even if the tooling is stood up in-flight.

### F2 (MAJOR) — The Band-0 greenfield EDICTS have prose + per-mechanism gates but no GESTALT acceptance path

The greenfield wave (`memory/project_bd_greenfield_wave.md`) encoded standing aesthetic edicts: *"the 8/12 laws of
animation applied UNIVERSALLY… CARTOON shadowing + 1940s-technicolor flow & punch; ARISTOTELIAN golden-ratio
proportion in all things."* These ARE documented as prose — `DESIGN.md:17` (aristotelian √φ proportion + iOS-27
canon), `:82` + `:310` (the `--ease-cartoon-punch` register), `:115` (`--motion-weight`), and the 12-laws table at
`:121–136`. And a handful of per-MECHANISM gates exist (`proof-liquid-{reveal,tab,morph}.mjs`,
`proof-liquid-glass-{material,tokens}.mjs`, `proof-card-cartoon-consumers.mjs`).

What is MISSING is a GESTALT-level acceptance bar for the edicts as edicts. `ls scripts/` for
`aristotel|technicolor|proportion|anticipat|follow-through` → only `proof-card-cartoon-consumers.mjs` (a narrow
cartoon-shadow *consumer* census). There is no gate — and no plan wave — that asks, per surface: *is the proportion
√φ-consistent? does this driver carry the anticipation/follow-through/secondary-action laws? does it read as
technicolor cartoon-punch, or flat?* The intended gestalt-enforcers for exactly these judgments are (a)
`proof:ba-gestalt` — which the historical audit (`P-historical-coverage.md §RC1`) shows is `[local]`-tagged and
structurally excluded from the release tag — and (b) the Fable DesignSync review — which F1 shows is unencoded. So
the standing aesthetic edicts have NO binding acceptance path: prose that no gate reads, judged by a review that no
wave schedules. This is precisely how "gestalt cohesion" and "lacking elegance" (two of the user's five named
critique axes) went unmeasured across three ships.

### F3 (MAJOR) — The jubilance/dead-engine DECIDE is mis-stated as "delete per overfitting law"; the real disposition is finer

`P-historical-coverage.md §2.7 R18` and the DIRECTIVE-LEDGER `WS7-03b`/`WS2-17` carry the dead-engine cleanup as
*"wire ≥2 or delete per the overfitting law."* On disk the disposition splits three ways, and conflating them will
produce the wrong fold:

- **`useHaptic` / `useCelebrationBurst` — EXPORTED, so overfitting does NOT force deletion.** Both are re-exported
  in `src/index.ts:285` and `src/api/index.ts:370` / `types-extra.ts:71`. Per the overfitting law's own criteria
  (`memory/feedback_overfitting_audit.md`: *"≥2 sites OR exported in src/index.ts OR a documented demo helper"*),
  an exported symbol is spec-LEGAL with zero call sites. The violation here is NOT the overfitting law — it is the
  user's WIRING intent (BF R18 "jubilance wiring": ripple/splash/recoil/haptics/breathing must be LIVE). An
  exported-but-unwired "jubilance" feature is a shipped-as-live capability with no live consumer — a gestalt lie,
  not a lint failure. The correct DECIDE is: **wire ≥2 real live consumers, OR demote from the public export**
  (making it honestly "not shipped yet") — never a bare "delete."
- **`useDockContextSilhouette` (551L) — a TRUE overfitting delete-or-wire.** Its only reference in `src`/`demo` is
  a COMMENT in `demo/stories/dock/examples/AppSwitcher.vue:3` ("AppSwitcher→useDockContextSilhouette as fits") — no
  import, no call. Not exported as a headline. This one IS the overfitting law's target: earn ≥2 real consumers or
  delete the 551 lines.

The fold must carry all three with their DISTINCT verdicts, or the "≥2-or-delete" shorthand will either delete a
public export (a clean-break the user did not ask for) or leave the 551-line dead engine (the overfitting the user
did ask to kill).

### F4 (MODERATE) — The DIRECTIVE-LEDGER is HEAD-current but frozen at 06-25; its own no-silent-drop rule now bites it

`DIRECTIVE-LEDGER.md:6` sources the archaeology corpus with a first→last span ending `2026-06-25`. It is an
excellent operationalization of the anti-amnesia mandate (WS7-03) — but it predates the 07-01 Fable directive (F1)
and the audit's own standing-directives block. Its binding rule (line 15: *"No silent drop… This ledger is a
binding input to every workstream's convergence brief"*) is self-violated the moment a post-06-25 mandate exists
with no row. The ledger needs a `§Process-Edicts` section (or new rows in WS7) for the Fable/DesignSync routing +
the gestalt-enforcement of the Band-0 edicts, and a re-stamp to 07-01 — otherwise every downstream convergence
brief inherits the omission.

### F5 (MINOR) — The `goo-blob → blob` clean-break rename is a named no-legacy debt, still unhonored

`DIRECTIVE-LEDGER WS5-02` flags *"rename goo-blob → just 'blob' — UNADDRESSED."* Verified: `src/components/custom/`
still has `goo-blob/`, no `blob/`. This is a small clean-break the no-legacy law owes (`feedback_no_backwards_compat`
"clean breaks when refactoring… no legacy aliases"). It rides the BH restructure (which already plans clean-break
export reshapes — `src/api` still present at HEAD, slated to drop). Low severity, but it's an explicitly-named
rename the discipline has carried unaddressed since 06-22; a 5.0.0 major is the correct moment (renames are free at
a major, expensive later).

---

## POSITIVE VERIFICATIONS (recorded for fairness — these mandates ARE covered)

- **Binding-verification sweep IS scheduled.** The standing mandate (`feedback_glass_ui_binding_verification`:
  *"sweep on version bumps"*) is exactly triggered by the 5.0.0 kf-`^5` peer bump + `/api` export reshape.
  `docs/tranches/BG/FINAL.md:633` MINTs `proof:binding-sweep` (→ G7) and FINAL.md:305 names the 480-capture
  dual-engine both-modes sweep. Covered — not a gap.
- **The goo-morph pager/deck DOTS (the "remember this always" specific callout) ARE built.**
  `src/components/custom/pager-dots/composables/usePagerWorm.ts` + `carousel/composables/useCarouselWorm.ts` + the
  `morph-field.css` worm land the metaball-merge indicator the mandate named. The specific ask is addressed.
- **Liquid-weight-universal was operationalized WITH nuance, not blindly.** `DESIGN.md:115` refines the "remember
  this always" law to *"Liquid weight is universal on DRIVERS, not on every pixel that moves"* (the driver-vs-observer
  rule — an over-springy observer carousel reads cheap). This is a thoughtful scoping, not a miss; the DIRECTIVE-LEDGER
  C-LIQUID `PARTIAL` (entrance generalization owed, routing-dead kills the most-visible motion) is the honest residual.

---

## FOLD CANDIDATES (for the AMENDED-GESTALT-PLAN + DIRECTIVE-LEDGER)

### FC1 (plan-doc-edit + new-wave) — encode the Fable/DesignSync mandate per visual wave [from F1]
The gestalt transposition, not a checkbox: introduce a **standing per-wave PRECONDITION** in the plan schema — every
VISUAL wave (all of WS1-WS6) declares two fields: `fableArm` (the Fable instance owning the design authoring / gestalt
decision) and `designSyncSurface` (the claude.ai/design card the wave's surface syncs to for review). Add a WS7
process wave **`BG.W-FABLE-DESIGN-ARM`** that (a) stands up the `/design-sync` skill + DesignSync surface if
unprovisioned, (b) makes "the DesignSync review returned a PASS gestalt verdict from Fable, not the building agent"
a close precondition for every visual wave — the human-strongest-model review the gate machine structurally lacks.
This is the seed's literal instruction and the direct cure for "opus-fanout-built visuals judged disastrous."

### FC2 (amend-wave) — give the Band-0 aesthetic edicts a binding acceptance path [from F2]
Do NOT mint N new mechanical gates (that is the ceremony disease). Instead, transpose the edicts INTO the gestalt
review: amend the `proof:ba-gestalt` roster (and the Fable DesignSync review of FC1) so each enrolled surface owes an
explicit per-surface VERDICT on three edict axes — **proportion is √φ-consistent · the driver carries the animation
laws (anticipation/follow-through/secondary-action) · reads as technicolor cartoon-punch, not flat.** The edicts stop
being unread `DESIGN.md` prose and become the acceptance language of the one gestalt gate. This also resolves the
`proof:ba-gestalt`-excluded-from-release problem (RC1) at the same seam it's already slated to fix.

### FC3 (amend-wave) — restate the jubilance/dead-engine DECIDE with its three distinct verdicts [from F3]
Amend `WS7-03b`/`WS2-17`: **`useHaptic` + `useCelebrationBurst` → wire ≥2 LIVE consumers OR demote from the public
export** (an exported-but-dead "jubilance" is a gestalt lie; deleting an export is a clean-break the user didn't
request — demotion is the honest middle). **`useDockContextSilhouette` (551L) → wire ≥2 OR delete** (a true
overfitting target, comment-only reference at `AppSwitcher.vue:3`). Strike the flat "delete per overfitting law"
shorthand — it mis-classifies the exported pair.

### FC4 (plan-doc-edit) — re-stamp the DIRECTIVE-LEDGER to 07-01 with a §Process-Edicts section [from F4]
Add a `§Process-Edicts` block carrying the Fable/DesignSync routing (FC1) + the edict-gestalt-enforcement (FC2) as
explicit rows, and advance the ledger's source-span stamp to 07-01. Restores the anti-amnesia invariant the ledger's
own binding rule requires; keeps it the single accountability artifact through the close.

### FC5 (plan-doc-edit) — schedule the `goo-blob → blob` rename as a WS5 clean-break at 5.0.0 [from F5]
Fold the rename into the BH restructure's clean-break export reshape (where `/api`-drop already lives) so the no-legacy
discipline discharges a named debt at the one moment renames are free — the major cut.
