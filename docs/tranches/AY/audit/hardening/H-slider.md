# H-slider — adversarial hardening: Slider consolidation (AY.W-SLD1/W-SLD2)

Verdict: **GAPS-FOUND** (the wave is UNDER-SPECCED and built on a STALE premise; the
headline collapse already shipped in AX.W59, and the live design CONTRADICTS the standing
request the wave re-states verbatim).

## TL;DR

The "slider zoo → glass-scrubber + spectrum" collapse the AY plan assigns to W-SLD1/W-SLD2
**already shipped in AX.W59** (commit `a730782`), is **machine-locked by a CI-promoted gate**
(`proof:slider-two-only`, `scripts/proof-slider-two-only.mjs`, `tags:["local","ci"]`), and the
single consumer that matters (speedtest) is **already on the two-only API** via the canonical
`@mkbabb/glass-ui/slider` subpath using the default variant. The AY plan does not acknowledge
ANY of this. Worse: the SHIPPED design **directly contradicts** the standing request the plan
restates word-for-word — the user asked for a "**FULLY ROUNDED iOS knob continuous with the
track, not pill/offset**" (PROMPT-CORPUS:51-52), but AX.W59 shipped (and the gate LOCKS) an
"integrated-cylinder leading CAP, **NOT a 50% circle**" — the gate literally REDDENS if the
thumb is a rounded circle (`proof-slider-two-only.mjs:127`). So either the user's request is
already satisfied by a re-interpretation (and the plan must SAY so), or it is NOT satisfied and
the gate is locking the WRONG design. The plan resolves neither.

---

## Finding 1 — STALE PREMISE: the collapse already shipped; the ledger row is factually wrong

- **AUDIT-LEDGER.md:28** row 9: *"slider zoo → glass-scrubber(rounded iOS knob)+spectrum;
  migrate consumers | **DEFERRED** | multiple slider variants; no consolidation |
  AY.W-slider-consolidate"*. This is **false at HEAD**. There is exactly ONE slider component
  (`src/components/ui/slider/Slider.vue`) with exactly TWO variants (`standard`, `spectrum`) —
  `src/components/ui/slider/index.ts:42-45`. The collapse landed in commit `a730782`
  *"feat(slider): integrated-cylinder glass standard + track-height squircle spectrum
  (AX.W59)"*.
- The historical zoo IS gone: there is **no `GlassScrubber` survivor** (the P.W3 `df0e7e7`
  component — grep across `src/` + `demo/` returns zero), **no `ColorSlider`/`SpectrumSlider`/
  `RangeSlider`/`GradientSlider`**, and **no orphan `[data-variant=X]`** block in the SFC
  (gate clause 2 passes). `range` (two-thumb) is the SAME `standard` variant with two reka
  thumbs (`demo/stories/forms/slider.vue:80`), not a third recipe.
- `proof:slider-two-only` is **already CI-promoted** (`scripts/gates.mjs:601-604`,
  `tags:["local","ci"]`; `.github/workflows/ci.yml:188-189`) and **passes green at HEAD**
  (ran it: KEYSET ok, ORPHAN none, CYLINDER-CAP `var(--radius-pill)` height 100%, range
  backdrop-filter true, SQUIRCLE @supports-gated height 100%).

**Impact:** AY W-SLD1 as written would have an agent re-do shipped work, and W-SLD2 would chase
a migration that is largely already done. The plan must be re-scoped to what ACTUALLY remains
(the design-intent reconcile + a real consumer sweep + the gate widening), not the collapse.

## Finding 2 — DESIGN CONTRADICTION (the load-bearing one): "FULLY ROUNDED iOS knob" vs the shipped "integrated cylinder, NOT a circle"

The standing request is unambiguous about the STANDARD thumb shape:

- **PROMPT-CORPUS.md:51-52**: *"collapse the slider zoo → `glass-scrubber` (standard, **a
  FULLY ROUNDED iOS knob continuous with the track, not pill/offset**) + `spectrum`"*
- **AUDIT-LEDGER.md:28** + **AY.md:32,73**: restate *"glass-scrubber(**rounded iOS knob**)"*.

AX.W59 shipped the OPPOSITE and **locked it against ever being a rounded knob**:

- `Slider.vue:218-246` — the standard thumb is *"a slim cap (not a full circle): ~46% of the
  size token wide, the full track height tall"* (`width: calc(...* 0.46)`, `height: 100%`,
  `border-radius: var(--radius-pill)`). It is a vertical capsule leading-edge cap, NOT a round
  knob.
- `proof-slider-two-only.mjs:124-128` — the CYLINDER-CAP clause **explicitly REDDENS a rounded
  circle**: `const isCircle = radius === "50%"; if (isCircle) violations.push("...is 50% — the
  AX.W59 integrated cylinder uses a pill cap ..., NOT a floating circle")`. The gate doctrine
  (file header L11-13) calls it *"the AX.W59 clean break off the prior ROUNDED-KNOB clause"*.

So the design was DELIBERATELY changed from a rounded knob to an integrated cap, and a CI gate
now FORBIDS the rounded knob the user keeps asking for. **This is exactly the kind of
divergence-from-stated-intent the AY tranche exists to catch.** It is unresolved in the plan:
W-SLD1 restates "rounded iOS knob" while the locked code+gate forbid it. One of three things is
true and the wave spec MUST decide which:

  (a) the user's "FULLY ROUNDED iOS knob" intent was SUPERSEDED by a later design call (the
      integrated cylinder) — then the corpus/ledger/plan must be CORRECTED to say so, and
      W-SLD1 becomes a no-op/doc-reconcile, not an impl wave; OR
  (b) the integrated-cylinder is a misread of "continuous with the track" and the user truly
      wants a round iOS knob that sits ON the continuous track — then W-SLD1 must REVERT the
      thumb to a circle AND the `isCircle` clause in the gate must INVERT (it currently locks
      the wrong shape); OR
  (c) the two readings can be reconciled (a knob that reads "fully rounded" yet "continuous,
      not offset") — then the wave must produce a CAPTURED visual that satisfies the literal
      words, judged by the user, before any gate re-lock.

Without this decision, W-SLD1 is UNDER-SPECCED — it has no unambiguous objective. **This is the
chronic-miss: the slider design intent has churned across P.W3 (GlassScrubber) → AV.W11
(unification) → AX.W23 (re-register) → AX.W59 (design-reconcile to cylinder), and the user's
original word "FULLY ROUNDED knob" was never reconciled against the shipped cap — it just keeps
getting re-stated in each tranche's corpus.**

## Finding 3 — the consumer-migration scope (W-SLD2) is near-empty and the plan overstates it

- **slides**: ZERO slider consumers (grep over `slides/src` for `Slider`/`slider`/`Scrubber`
  is empty; the only slides-local slider concern in the corpus is the dock progress bar, which
  is a `<Progress>`/`DeckProgress` matter, not a `<Slider>`). W-SLD2's slides arm is empty.
- **speedtest**: ONE real consumer — `speedtest/src/components/dashboard/DashboardMapControls.vue`
  (two `<Slider>` sites, L65 + L135, H3-resolution). It imports `import { Slider } from
  "@mkbabb/glass-ui/slider"` (L172) — the **canonical subpath**, default `standard` variant, no
  removed-variant prop. It is **already migrated** to the two-only API. It pins
  `"@mkbabb/glass-ui": "^3.9.0"` (package.json:88), so it resolves the SHIPPED two-only build;
  W-SLD2 has nothing to change there beyond a version bump after AY publishes.
- **glass-ui-local consumers**: `LabeledSlider.vue` (`custom/labeled-field/LabeledSlider.vue:10`)
  + the configurator/aurora/settings demo stories — all consume `<Slider>` (default or
  `variant="spectrum"`), all on the two-only API.

**Impact:** W-SLD2 *"Migrate ALL consumers (incl. speedtest) to the two; retire the rest"* is
mostly already true. The real remaining W-SLD2 work is narrow: (1) a publish-gated version bump
in speedtest + a build-green check; (2) a `proof:no-bespoke-slider`-style consumer sweep gate
asserting no consumer imports a removed-variant prop (the gate doesn't exist yet — see Finding
5). The plan should say "verify + bump", not "migrate".

## Finding 4 — `--corner-shape-thumb` is defined (good) but the spectrum squircle has a DRY/contract subtlety the gate doesn't check

- The token IS defined: `theme.css:108` `--corner-shape-thumb: superellipse(var(--corner-k-squircle))`.
  So the spectrum thumb squircle paints on Chrome 139+. Not a bug.
- But the spectrum thumb's ROUND fallback (`Slider.vue:302` `border-radius: var(--radius-lg)`)
  is hand-set to `--radius-lg`, while the squircle box it rounds is a near-square
  `1.1×` footprint (`Slider.vue:296`). On a partial-support engine (Safari/Firefox through
  2026, per `theme.css:74`) the thumb is a `--radius-lg`-rounded near-square — NOT visibly a
  "squircle". The gate (clause 4) checks the `@supports`-gated `corner-shape` decl exists and
  the round contract exists, but **does not verify the round fallback reads visually as a
  squircle-adjacent shape** (e.g. that `--radius-lg` is large enough relative to the box to
  read as superellipse-ish). This is a UNDER-SPECCED visual-fidelity hole: on ~35% of engines
  the "iOS color-picker squircle" is a rounded square the gate calls compliant.

## Finding 5 — the proof gate is SOURCE-ONLY; there is no consumer-import gate and no LIVE capture

- `proof:slider-two-only` reads ONLY `index.ts` + `Slider.vue` source strings
  (`proof-slider-two-only.mjs:48-49`). It freezes the CARDINALITY + the DESIGN-LOCK regex, but:
  - It does **NOT** assert no consumer (speedtest/demo) imports a removed variant — the
    "migrate ALL consumers" half of W-SLD2 has **no machine lock**. A consumer could pass
    `variant="rounded"` and the gate stays green (the prop would just be ignored at runtime —
    a silent no-op, the exact binding-verification class flagged in MEMORY.md
    `feedback_glass_ui_binding_verification`).
  - It is a **source-string** gate, not a live render. There is no captured DELTA proving the
    standard cylinder + spectrum squircle actually PAINT correctly cross-engine (the cardinal
    lesson: complete only on a captured live delta). The AX.W59 owed-DELTA was backfilled
    (`c72d2ac`/`4f18551`) but AY re-opening the design (Finding 2) invalidates that capture.
- **CLAUDE.md references a story that does not exist**: the Slider section says *"The
  cross-substrate proof story lives at `demo/stories/compositions/dock-with-slider.vue`"* —
  `find demo -name "*dock-with-slider*"` returns NOTHING. The dock+slider proof story is
  **missing**, yet CLAUDE.md cites it as the contract's home. This is doc-rot that W-SLD (or
  W-DOCK3, which the ledger folds dock-with-slider into) must fix: either author the story or
  correct the doc. (W-DOCK3 owns the dock-with-slider FIX; W-SLD owns the slider; the missing
  story straddles both — assign it explicitly.)

## Finding 6 — language / doc-currency

- The AY.md plan band B W-SLD1/2 (`AY.md:73-74`) and §0 fold (`AY.md:32`) carry NO reference to
  AX.W59 / the shipped two-only / the passing gate. A reader of the plan would believe the work
  is greenfield. Per the precept against stale/migration-language and for doc currency, the
  plan must be annotated with the prior-art it inherits.

---

## Fold-into routing

- **AY.W-SLD1** (re-scope): from "collapse the zoo" → "**reconcile the slider design intent**":
  resolve Finding 2 (the rounded-knob-vs-cylinder contradiction) with a user-judged captured
  delta; correct PROMPT-CORPUS/AUDIT-LEDGER to reflect the shipped two-only; fix the spectrum
  round-fallback fidelity (Finding 4); fix/author the missing dock-with-slider story (Finding
  5, coordinate with W-DOCK3).
- **AY.W-SLD2** (re-scope): from "migrate ALL consumers" → "**verify + lock the consumer
  boundary**": add a `proof:no-removed-slider-variant` consumer-import sweep + a binding-
  correctness check (Finding 5); speedtest version-bump + build-green is publish-gated (defer
  to W-PUB1).
- The **dock-with-slider fix + missing story** also folds into **AY.W-DOCK3** (the ledger row
  10 / corpus 10 home).
- The **ledger/corpus correction** is a W-CLOSE1 doc-currency item if not done in W-SLD1.

## Convergence criteria (the acceptance bar for this lane)

1. The slider design intent is RESOLVED on the record: either the corpus/ledger are corrected
   to state the integrated-cylinder supersedes "rounded knob" (with the AX.W59 rationale), OR
   the standard thumb is reverted to a round iOS knob AND the gate's `isCircle` clause is
   inverted — decided by a **user-judged CAPTURED visual delta**, not a doc edit alone.
2. `proof:slider-two-only` stays green AND is extended with a consumer-import clause (no
   consumer passes a non-`{standard,spectrum}` variant; no removed-variant prop survives).
3. The spectrum squircle reads as a squircle (or an acceptably-rounded box) on the round-
   fallback engines — verified by a cross-engine capture, not a source regex.
4. The dock-with-slider story exists at the path CLAUDE.md cites (or the doc is corrected) and a
   captured drag delta shows the keepDockOpen hold + the thumb-halo `data-held` register firing.
5. speedtest builds green against the AY-published glass-ui with its two `<Slider>` sites
   intact; the AUDIT-LEDGER row 9 reads DONE (not DEFERRED).

## waveSpecInputs (material for the fully-authored W-SLD spec)

- **Defect (Finding 2, the load-bearing one):** `PROMPT-CORPUS.md:51-52` demands a "FULLY
  ROUNDED iOS knob ... not pill/offset"; `Slider.vue:218-246` ships an integrated-cylinder slim
  CAP; `proof-slider-two-only.mjs:124-128` LOCKS the cap and REDDENS a rounded circle. The
  intent and the code+gate are in direct contradiction — unresolved by the plan.
- **Defect (Finding 1):** `AUDIT-LEDGER.md:28` row 9 says "DEFERRED — no consolidation"; HEAD
  has exactly two variants (`index.ts:42-45`), shipped `a730782` (AX.W59), gate green.
- **Objective:** reconcile the slider design intent against the shipped two-only (decide
  supersede-vs-revert with a captured user-judged delta); correct the stale ledger/corpus;
  extend the gate to lock the consumer boundary; fix the spectrum round-fallback fidelity;
  author/fix the dock-with-slider story.
- **Files / edit-sites:**
  - `src/components/ui/slider/Slider.vue` (standard thumb L218-259; spectrum thumb L292-322;
    round fallback L302) — only if Finding 2 resolves to "revert to knob" or "fix fallback".
  - `src/components/ui/slider/index.ts` (variant doc L18-30) — currency.
  - `scripts/proof-slider-two-only.mjs` (invert `isCircle` clause L124-128 ONLY if reverting;
    ADD a consumer-import sweep clause regardless).
  - `docs/tranches/AY/audit/PROMPT-CORPUS.md:51-52` + `docs/tranches/AY/audit/AUDIT-LEDGER.md:28`
    (correct the stale "DEFERRED" + reconcile the "rounded knob" wording).
  - `docs/tranches/AY/AY.md:32,73-74` (annotate prior-art AX.W59).
  - `CLAUDE.md` Slider section (the `demo/stories/compositions/dock-with-slider.vue` reference
    points at a non-existent file) + author that story or correct the path.
  - speedtest `src/components/dashboard/DashboardMapControls.vue:65,135,172` (verify-only;
    version bump is publish-gated).
- **HARD GATE (evidence-backed):** `proof:slider-two-only` stays green with its existing four
  clauses (KEYSET / ORPHAN / CYLINDER-CAP or its inverted form / SQUIRCLE) AND gains a fifth
  CONSUMER-BOUNDARY clause: scan all `<Slider … variant="X">` and `:variant="…"` bindings
  across `demo/` + (when present) the consumer repos for any `X ∉ {standard,spectrum}` →
  RED; plus a captured live DELTA artefact (standard + spectrum drag, cross-engine round
  fallback, dock-with-slider hold) attached to the wave close per the cardinal lesson. Bite:
  add a consumer `variant="rounded"` → new clause RED; revert/forward the thumb shape against
  the resolved decision → the (possibly inverted) CYLINDER/KNOB clause RED.
