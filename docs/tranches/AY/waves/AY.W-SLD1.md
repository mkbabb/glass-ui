# AY.W-SLD1 — Slider RECONCILE the rounded-knob-vs-cylinder design contradiction (user-judged)

**Tranche** AY (glass-ui) · **Band** B (component reconcile) · **Kind** reconcile (user-judged DELTA + design decision + spectrum-fallback fidelity fix + doc-currency) · **State** OPEN

## State

**Name**: W-SLD1 - Slider RECONCILE the rounded-knob-vs-cylinder design contradiction (user-judged)
**Opens after**: AY.W0-REGROUND (the ledger is re-grounded) AND AY.W-CARDINAL-INFRA (the wave that tranche-parameterized `proof:live-verified-ledger` so `--tranche=AY` scans `docs/tranches/AY/PROGRESS.md` + `docs/tranches/AY/audit/visual/`; `proof:live-verified-ledger:ay` is wired at `package.json:683`). At HEAD the engine is ALREADY parameterized — this wave CONSUMES `proof:live-verified-ledger:ay`; it does NOT author or re-extend the gate. (W-DOCK3 also rides the same parameterized engine; it is a sibling consumer, NOT a dependency of this wave — the prior "opens after W-DOCK3" framing was stale.)
**Agents**: 1 serial (the design decision is a single user-judged hinge; the spectrum-fidelity fix is local to the same SFC)
**Hard gate**: `proof:live-verified-ledger:ay` GREEN with an on-disk `W-SLD1-DELTA.md` referencing a real PNG of the user-judged resolved thumb + a `"W-SLD1"` entry in `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json`; `proof:slider-two-only` GREEN with its CYLINDER-CAP clause in whichever orientation the decision resolves to; a SINGLE-ENGINE engine-aware π capture (the `squircle-language.spec.ts` pattern — chromium probes `CSS.supports('corner-shape', …)` and asserts the supporting OR the fallback branch) proves the spectrum thumb reads as a squircle when supported / a squircle-adjacent generous round in the fallback `border-radius`; the AUDIT-LEDGER row 9 reads DONE.
**Status**: planned

## Goal criterion

The slider STANDARD-thumb design intent is RESOLVED on the record — not by a doc edit, but by a captured visual the user judges. The user's standing words ("a FULLY ROUNDED iOS knob continuous with the track, not pill/offset", PROMPT-CORPUS:51) and the shipped AX.W59 design (an integrated-cylinder slim leading CAP, gate-locked to REDDEN a circle) are in direct, two-tranche-old contradiction; this wave makes a SINGLE decision among {supersede · revert+invert-gate · reconcile}, backs it with a user-judged captured DELTA, and brings the corpus, the ledger, the gate, and the SFC into ONE consistent story. The spectrum round-fallback — a `--radius-lg`(10px)-rounded near-square that reads as a rounded rect on the ~35% of engines without `corner-shape` — is lifted to read as a squircle-adjacent shape so the "iOS color-picker squircle" is not a rounded box on a third of browsers. A fresh reader of PROMPT-CORPUS:51, AUDIT-LEDGER row 9, `Slider.vue`, and `proof-slider-two-only.mjs` finds them all telling the same resolved story, anchored by an on-disk PNG.

Paired with the §6 Hard Gate (the completion criterion). A wave whose gates pass but whose goal is unmet (e.g. the SFC + gate + corpus agree on a shape the user did NOT judge against a capture) closes `complete_with_misses`, not `complete`.

## §0 — RE-GROUND (pre-implement; from `audit/hardening/b2/B2-readiness.md` §2)

W-SLD1's documented ordering invariant was VIOLATED by a landed wave. §4a Disjointness states the
mandated sequence `W-SLD1 → W-GLASS → W-SCALE2` so `Slider.vue` has one writer at a time — but
**W-GLASS ALREADY LANDED IN `Slider.vue` FIRST.** `W-GLASS-DELTA.md` is committed and
`Slider.vue:200-201` carries the `--glass-level` routing W-GLASS owns. The user-judged-DELTA hinge
(the supersede/revert/reconcile decision) is intact and correct; what shifted is the BASE the SFC
edits land on.

**RG-A (the W-GLASS-modified SFC is the new base).** All W-SLD1 SFC line-cites are at the pre-W-GLASS
base. At HEAD (`Slider.vue` is 330 lines) most cites largely SURVIVED — the spectrum rule is still
~`:299-322`, the `border-radius: var(--radius-lg)` round-fallback HAPPENS to still be at `:309`, the
`0.46` cap width at `:228`, `--radius-pill` at `:230` — but the standard `.slider-thumb` rule body is
now INTERMIXED with the W-GLASS `--glass-level` edits. Re-read the full standard-thumb rule before
touching it.

**RG-B (NEW write-collision risk on the (b)/(c) branches).** If the user judges (b) revert-to-knob,
the standard-thumb geometry edit lands ON TOP of the W-GLASS glass-level edits in the SAME rule — the
agent MUST preserve the `--glass-level` legs while changing the radius/width. The spec's "one writer
at a time" guarantee is already broken; the re-ground treats the W-GLASS-modified SFC as the base and
the (b)/(c) edit as a SURGICAL change that keeps the landed glass-level routing intact.

**RG-C (downstream + allowlist).** `proof:live-verified-ledger:ay` is wired (`package.json:696`) and
enforces the captured DELTA. `VISUAL-ALLOWLIST.json` is now `["W-DOCK1","W-CON1","W-DOCK2","W-BLOB2"]`
(the spec's claim of `["W-DOCK1"]` is stale — more landed); the append-`"W-SLD1"` action is
unaffected. W-SLD2 (the consumer-boundary clause) opens AFTER W-SLD1 closes — that serialization
holds.

## Defect (verified, file:line)

The collapse-to-two ALREADY SHIPPED (AX.W59, commit `a730782`) and is CI-gated green — this wave does NOT re-collapse. Two live defects remain:

### D1 — the load-bearing design CONTRADICTION (standard thumb shape)

The standing request and the shipped+locked design disagree, across two tranches, never reconciled:

- **PROMPT-CORPUS.md:51** (verbatim): *"collapse the slider zoo → `glass-scrubber` (standard, a FULLY ROUNDED iOS knob continuous with the track, not pill/offset) + `spectrum`"*.
- **`src/components/ui/slider/Slider.vue:224-253`** (the `.slider-thumb` rule at HEAD; the leading-cap doc-comment is `:217-223`) — the standard thumb is the OPPOSITE of a fully-rounded knob: *"A slim cap (not a full circle): ~46% of the size token wide, the full track height tall"* — `width: calc(var(--slider-thumb-size, 1rem) * 0.46)` (`:228`), `height: 100%` (`:229`), `border-radius: var(--radius-pill)` (`:230`). A vertical capsule leading-edge cap, not a round knob.
- **`scripts/proof-slider-two-only.mjs:111-153`** (the CYLINDER-CAP clause; the `isCircle` test + violation at `:126-128`) — the clause LOCKS the cap shape AND explicitly REDDENS a rounded circle: `const isCircle = radius === "50%"; if (isCircle) violations.push("standard .slider-thumb border-radius is 50% — the AX.W59 integrated cylinder uses a pill cap (var(--radius-pill)), NOT a floating circle")`. The gate header doc-block (`:14-21`) calls this *"the AX.W59 clean break off the prior ROUNDED-KNOB clause"*.

So the design was deliberately changed FROM a rounded knob TO an integrated cap, and a CI gate now FORBIDS the rounded knob the user keeps asking for. This is exactly the divergence-from-stated-intent the AY tranche exists to catch (the slider design churned P.W3 GlassScrubber → AV.W11 unification → AX.W23 re-register → AX.W59 cylinder, and the literal word "FULLY ROUNDED knob" was re-stated in each tranche's corpus but never reconciled against the shipped cap). Exactly one of three is true; this wave MUST decide which, by a user-judged capture, not an assumption:

- **(a) supersede** — the "FULLY ROUNDED iOS knob" intent was superseded by a later design call (the integrated cylinder), and the corpus + ledger must be CORRECTED to say so; the SFC + gate stay as-is; this is a doc-reconcile + a capture proving the cylinder is the satisfying-to-the-user resolution.
- **(b) revert+invert-gate** — the integrated cylinder is a misread of "continuous with the track"; the user wants a round iOS knob that sits ON the continuous fill; the SFC standard thumb REVERTS toward a circle and `proof-slider-two-only.mjs:126-128` INVERTS (the `isCircle` clause currently locks the WRONG shape — it must require, not forbid, the round form).
- **(c) reconcile** — a single thumb reads "fully rounded" AND "continuous, not offset" simultaneously (a knob whose radius reads round yet whose body is flush/continuous with the fill, no detached floating disc); the SFC produces it and the gate's shape clause is re-stated to lock the reconciled geometry.

The contradiction is UNRESOLVED in the plan as inherited — W-SLD1 had no unambiguous objective until this decision is made. The decision hinge is the user-judged capture (the cardinal lesson: complete only on a captured live DELTA the user judges).

### D2 — the spectrum round-fallback fidelity hole (a third of engines)

`src/components/ui/slider/Slider.vue:299-322` (the `[data-variant="spectrum"] .slider-thumb` rule at HEAD) — the spectrum thumb is a near-square `1.1× --slider-thumb-size` box (`:303`, md → ~17.6px wide × 24px tall track-height) whose ROUND fallback is hand-set to `border-radius: var(--radius-lg)` (`:309`); the `@supports (corner-shape: superellipse(2))` PE tier sits at `:318-322` (`corner-shape: var(--corner-shape-thumb)` at `:320`). `--radius-lg` resolves to `var(--radius)` = `0.625rem` = 10px (`theme.css:44`, `:29`). A 10px radius on a ~17.6×24 box is a rounded RECT, not a squircle silhouette. On the ~35% of engines without `corner-shape` (Safari/Firefox/old-Chrome through 2026, per `theme.css:71-74`) the "iOS color-picker squircle" is a rounded square — and `proof-slider-two-only.mjs:155-197` (clause 4) checks the `@supports`-gated `corner-shape` decl + `height: 100%` but NEVER verifies the round fallback reads as a squircle-adjacent shape. This is a real visual-fidelity hole the gate calls compliant.

### Stale-base context (do NOT re-litigate)

- The zoo IS collapsed to exactly two recipes — `src/components/ui/slider/index.ts:42-45` (`standard`, `spectrum`), `:53` default `standard`. There is no `GlassScrubber`/`ColorSlider`/`SpectrumSlider`/`RangeSlider` survivor (grep across `src/`+`demo/` = 0). `range` (two-thumb) is the SAME `standard` variant with two reka thumbs (`demo/stories/forms/slider.vue:80`), not a third recipe.
- `proof:slider-two-only` is CI-promoted (`scripts/gates.mjs`, `tags:["local","ci"]`; `.github/workflows/ci.yml`) and passes green at HEAD. This wave does NOT re-collapse — it RECONCILES the design and FIXES the spectrum fallback.
- The AUDIT-LEDGER row 9 was already partially corrected by W0-REGROUND (`AUDIT-LEDGER.md:37` now reads `DONE-VERIFY (collapse) · OPEN (design contradiction)`); this wave flips the OPEN half to DONE once D1 is resolved on the record.

## Scope

1. Make the D1 design decision among {supersede · revert+invert-gate · reconcile} by producing a user-judged captured visual DELTA of the candidate standard thumb (live, against the demo `forms/slider` route), and recording the user's verdict in the DELTA doc.
2. If the decision is (b) or (c): edit `src/components/ui/slider/Slider.vue` standard thumb (the `.slider-thumb` rule `:224-253`) to the resolved geometry, and edit `scripts/proof-slider-two-only.mjs` CYLINDER-CAP clause (the `isCircle` test + violation `:126-128`) so the shape assertion locks the RESOLVED form (invert `isCircle` for (b); re-state the radius/border contract for (c)). If the decision is (a): leave both untouched; the wave is a doc-reconcile + capture only.
3. Fix the D2 spectrum round-fallback fidelity: lift `Slider.vue:309` off the bare `--radius-lg`(10px) so the fallback reads as a squircle-adjacent shape on non-`corner-shape` engines (a generous radius relative to the ~17.6×24 box — e.g. `calc(var(--slider-thumb-size) * 0.65)` ≈ 10.4px on md, OR a `--radius-thumb-fallback` token at a larger fraction), keeping the `@supports`-gated `corner-shape` PE tier (`:318-322`) the round-fallback's superset, not its replacement. NOTE: a fraction `0.65` of a 16px md `--slider-thumb-size` yields ~10.4px — barely above the 10px it replaces. To meaningfully read squircle-adjacent on a ~17.6×24 box the fallback radius wants ≥ ~0.55× the box WIDTH (`1.1 × thumb-size`), i.e. ≥ ~9.7px floor scaled with the box — choose the fraction so the gate's "≥ 0.55× thumb width" assertion (HARD GATE condition 3) actually bites against the old 10px value; pick the fraction empirically against the capture, not a guessed constant.
4. Capture a SINGLE-ENGINE, ENGINE-AWARE π readback (the shipped `squircle-language.spec.ts` pattern, NOT a multi-engine project sweep — the playwright config carries ONLY `chromium-headless-new`; webkit/firefox projects do NOT exist) proving: on the chromium engine, `CSS.supports('corner-shape','superellipse(2)')` is probed; the spectrum `.slider-thumb` computed `corner-shape` resolves `superellipse(2)` when supported; AND — read on the SAME engine regardless of support, since `border-radius` is the base declaration the PE tier only refines — the computed `border-radius` is a GENEROUS fraction of the box (≥ ~0.55× the thumb width, i.e. the squircle-adjacent floor, NOT the old 10px `--radius-lg` rounded-rect). Capture into `docs/tranches/AY/audit/visual/`. This reads the fallback contract WITHOUT a fallback engine: the round `border-radius` is always present (the `@supports` block only ADDS `corner-shape`), so its value is the cross-engine fallback truth even on a supporting engine.
5. Correct PROMPT-CORPUS.md:51 to reflect the RESOLVED design (the words match the shipped/reverted shape — no lingering "rounded iOS knob" if the resolution is the cylinder; no lingering "cylinder cap" doc if reverted).
6. Flip AUDIT-LEDGER.md row 9 (`:37`) OPEN-half → DONE with the resolution recorded.
7. Update `src/components/ui/slider/index.ts:14-37` variant doc (the `standard`/`spectrum` JSDoc block) + the `Slider.vue` standard-thumb leading-cap comment block (`:217-223`) so the inline prose matches the resolved geometry (greenfield-no-meta: no "reverted from", no "AX.W59 was wrong" history — state the design as it stands).
8. Update CLAUDE.md's Button-section glance-line ONLY if the resolution changes the documented standard-slider description; otherwise no CLAUDE.md edit (the dock-with-slider story path is W-DOCK3's, not this wave's).

## 3a. Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the decision (b)/(c) forces a change OUTSIDE `Slider.vue` + `proof-slider-two-only.mjs` + the docs (e.g. a new token in `theme.css`, a change to `index.ts` beyond the doc block, or a reka-prop binding change) — the scope-reveal trigger fires; the orchestrator triumvirates (research the geometry, amend the file bounds, redress).
- **Hard-gate failure not local-edit-recoverable**: the spectrum capture is single-engine (chromium-only) and engine-aware, so a fallback-engine-unreachable case CANNOT arise (the round `border-radius` is read on chromium regardless of `corner-shape` support). The only non-local miss path is the USER-JUDGED verdict for D1 being unobtainable in-session — that is a user-domain hinge, NOT an engineering loop; the orchestrator escalates the choice to the user (see the diagnostic-loop bullet below), it does NOT triumvirate the design decision.
- **Diagnostic loop**: if the standard-thumb resolution iterates THREE times without a user verdict (the user judges three captures inconclusive), halt — the design hinge is a user-domain decision, not an engineering loop; the orchestrator escalates the choice to the user verbatim rather than re-dispatching.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/ui/slider/Slider.vue` | modify (D2 spectrum fallback fidelity `:309` always; standard `.slider-thumb` rule `:224-253` + leading-cap comment `:217-223` only if decision is (b)/(c)) |
| `src/components/ui/slider/index.ts` | modify (variant JSDoc `:14-37` currency only — NOT the CVA keyset `:42-44` / defaultVariants `:52-55`) |
| `scripts/proof-slider-two-only.mjs` | modify (CYLINDER-CAP `isCircle` clause `:126-128` only if decision is (b)/(c); no change if (a)) |
| `docs/tranches/AY/audit/PROMPT-CORPUS.md` | modify (line 51 — reconcile the standing words to the resolution) |
| `docs/tranches/AY/audit/AUDIT-LEDGER.md` | modify (row 9 `:37` — OPEN→DONE) |
| `docs/tranches/AY/audit/visual/W-SLD1-DELTA.md` | create (the user-judged + engine-aware-fallback DELTA doc) |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | modify (append `"W-SLD1"` to the array — currently `["W-DOCK1"]`; required so `proof:live-verified-ledger:ay` accepts the `W-SLD1` row's own-surface PNG) |
| `tests-visual/slider-spectrum-fallback.spec.ts` | create (the single-engine engine-aware spectrum-fidelity π capture — the `squircle-language.spec.ts` pattern) |
| `CLAUDE.md` | modify (ONLY if the resolution changes the standard-slider glance-line) |

Do NOT touch: `src/components/ui/slider/index.ts` CVA keyset (`:42-44`) or `defaultVariants` (`:52-55`) — the two-only cardinality is settled (proof:slider-two-only). The dock-with-slider story (`demo/stories/compositions/dock-with-slider.vue`) is W-DOCK3's write scope (NOT this wave's). `scripts/proof-live-verified-ledger.mjs` — DO NOT edit; the engine is tranche-parameterized at HEAD (W-CARDINAL-INFRA owns it); this wave CONSUMES `proof:live-verified-ledger:ay` and only appends its own `"W-SLD1"` entry to `VISUAL-ALLOWLIST.json`. `theme.css` corner-shape tokens (no new shape token unless the triumvirate amends bounds). The speedtest consumer (publish-gated to W-PUB1; verify-only, no edit here).

## 4a. Disjointness

Single agent unit — no intra-wave path conflict. Cross-wave: this wave shares `proof:slider-two-only` ownership with nobody concurrently (W-SLD2 EXTENDS that gate with a fifth consumer-boundary clause — W-SLD2 opens AFTER W-SLD1 closes so the two never write the script at the same time). The `proof:live-verified-ledger` engine was tranche-parameterized at W-CARDINAL-INFRA (already done at HEAD) — this wave only READS `proof:live-verified-ledger:ay` and appends its OWN `"W-SLD1"` allowlist entry; it does not touch `scripts/proof-live-verified-ledger.mjs`. `Slider.vue` is touched by FIVE AY waves (W-SLD1, W-GLASS [route onto `--glass-level`], W-SCALE2 [`touch-hit-area` on the thumb], W-DOCK3 [dock-with-slider], W-SLD2 reads-only) — they must NOT run in parallel; sequence W-SLD1 → W-GLASS → W-SCALE2 (or any serial order) so the SFC has one writer at a time. The `VISUAL-ALLOWLIST.json` append (`"W-SLD1"`) is disjoint from W-DOCK3's append (`"W-DOCK3"`) — both target the same JSON array, so the orchestrator merges the two array entries (do not co-write the file in parallel).

## 5. Agent Units

### AY.W-SLD1.1 Standard-thumb design resolution + spectrum-fallback fidelity + doc-currency

- **Goal**: the standard-thumb shape is decided by a user-judged capture and recorded consistently across SFC + gate + corpus + ledger; the spectrum round-fallback `border-radius` reads as a squircle-adjacent shape (verified by the single-engine engine-aware readback — the round fallback is the cross-engine truth even when read on chromium).
- **Mechanism**:
  - Produce candidate captures of the standard thumb at the demo `forms/slider` route (live, light+dark) for the user to judge — the cylinder-as-shipped vs a round/reconciled candidate. Record the user's verdict in `W-SLD1-DELTA.md`.
  - On verdict (a): no SFC/gate edit; the DELTA records the cylinder as the user-satisfying resolution; PROMPT-CORPUS:51 is corrected to drop "FULLY ROUNDED iOS knob" in favour of the integrated-cylinder language (the design as it stands).
  - On verdict (b): revert `Slider.vue` standard thumb (the `.slider-thumb` rule `:224-253`) toward a circular knob continuous with the fill (round radius, no detached floating disc — "continuous with the track"); INVERT `proof-slider-two-only.mjs:126-128` (the `isCircle` test) so the `isCircle`/round form is REQUIRED, not forbidden; PROMPT-CORPUS:51 stays as the user's words (now satisfied).
  - On verdict (c): produce a thumb that reads round AND flush-continuous; re-state the gate's shape clause to lock that geometry; correct PROMPT-CORPUS:51 to the reconciled description.
  - Independently of the verdict, fix D2: replace `Slider.vue:309` `border-radius: var(--radius-lg)` with a generous fraction-of-box radius so the fallback silhouette reads squircle-adjacent (not the 10px rounded rect); keep `:318-322` `@supports (corner-shape: superellipse(2))` as the PE superset.
- **Files**: `Slider.vue`, `proof-slider-two-only.mjs` (only on (b)/(c)), `index.ts` (doc block), `PROMPT-CORPUS.md`, `AUDIT-LEDGER.md`, `W-SLD1-DELTA.md`, `tests-visual/slider-spectrum-fallback.spec.ts`, `pi-manifest.ts`, `CLAUDE.md` (conditional).
- **Sub-gate**: `proof:slider-two-only` GREEN (CYLINDER-CAP clause in the resolved orientation; SQUIRCLE-SPECTRUM clause intact); `proof:live-verified-ledger:ay` GREEN with the AY `W-SLD1` row backed by `W-SLD1-DELTA.md` → matching own-surface light+dark real PNGs + the `"W-SLD1"` allowlist entry; `tests-visual/slider-spectrum-fallback.spec.ts` passes its supporting + fallback assertions on the chromium project; AUDIT-LEDGER row 9 reads DONE; PROMPT-CORPUS:51 matches the SFC.

## 6. Hard Gate (completion criterion)

The gate name is **`proof:live-verified-ledger:ay`** (the cardinal-lesson forcing function, the `--tranche=AY` arm — the engine was tranche-parameterized at AY.W-CARDINAL-INFRA and wired at `package.json:683`; this wave CONSUMES it, the first AY reconcile to ride it). The wave closes only when ALL FIVE conditions hold:

1. **The design decision is RESOLVED on the record by a user-judged captured DELTA (not a doc edit alone).** `docs/tranches/AY/audit/visual/W-SLD1-DELTA.md` exists, names the chosen branch among {supersede · revert+invert-gate · reconcile} WITH the user's recorded verdict, and references ≥1 real on-disk PNG (`isRealPng`: >1024 bytes, PNG magic) of the resolved standard thumb at the demo `forms/slider` route — BOTH a `light` and a `dark` own-surface PNG (the engine's `:122-179` depth-lint requires both for an own-surface `live-verified` row). `"W-SLD1"` is appended to `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` (currently `["W-DOCK1"]`) so the row's PNG is accepted as a curated pixel-changing surface. `npm run proof:live-verified-ledger:ay` is GREEN with the AY ledger in scope: the AY `W-SLD1` PROGRESS row may carry `live-verified` ONLY because that DELTA references the matching own-surface (`^W-SLD1-`) real PNGs. **Bite**: revert the DELTA to prose-only or delete a PNG → the W-SLD1 row reds the ledger gate; the gate's three synthetic self-test rows (a real-PNG pass, a prose-only red, a neighbour-PNG red) still fire every run.

2. **`proof:slider-two-only` is GREEN with the CYLINDER-CAP clause in the RESOLVED orientation.** `npm run proof:slider-two-only` passes. The shape clause (`proof-slider-two-only.mjs:111-153`; the `isCircle` test + violation `:126-128`) asserts the chosen form: for (a) the integrated-pill cap (unchanged); for (b) the inverted clause requiring the round/circular form (the old `isCircle`-reddens logic flipped to `isCircle`-required); for (c) the reconciled radius+border contract. **Bite**: change the SFC standard-thumb shape against the resolved decision (e.g. revert to a cap after the user chose a knob) → the (possibly inverted) CYLINDER/KNOB clause REDs. The KEYSET, ORPHAN-SCAN, and SQUIRCLE-SPECTRUM clauses stay green throughout (the two-only cardinality is untouched).

3. **The spectrum squircle reads as a squircle when supported / a squircle-adjacent generous round in the fallback — verified by a SINGLE-ENGINE engine-aware runtime readback, not a source regex and NOT a multi-engine sweep.** `tests-visual/slider-spectrum-fallback.spec.ts` passes on the `chromium-headless-new` project (the ONLY project that exists; webkit/firefox projects are NOT configured — do NOT assume them). Mirroring `tests-visual/squircle-language.spec.ts:39-83`: the spec probes `CSS.supports('corner-shape','superellipse(2)')`; when supported, asserts the spectrum `.slider-thumb` computed `corner-shape` resolves `superellipse(2)`; AND — UNCONDITIONALLY, since the round `border-radius` is the base declaration that the `@supports` block only refines — reads the computed `border-radius` and asserts it is a GENEROUS fraction of the box (≥ ~0.55× the resolved thumb width, the squircle-adjacent floor relative to the ~17.6×24 md box — NOT the 10px `--radius-lg` rounded-rect). This reads the fallback contract WITHOUT a fallback engine: the `border-radius` value is the cross-engine fallback truth even on a supporting engine. The spec screenshots the spectrum thumb frame into `docs/tranches/AY/audit/visual/W-SLD1-spectrum-{light,dark}.png` (chromium-only; matched-name own-surface PNGs). **Bite**: restore `border-radius: var(--radius-lg)` (the 10px rounded rect) → the fallback radius assertion (≥ 0.55× width) fails; leak `corner-shape` outside the `@supports` gate → the existing `proof:slider-two-only` clause 4 leak-check (`proof-slider-two-only.mjs:159-197`) REDs.

4. **The AUDIT-LEDGER row 9 reads DONE.** `docs/tranches/AY/audit/AUDIT-LEDGER.md:37` row 9 status reads `DONE` (no lingering `OPEN (design contradiction)` half), with the resolution branch named in the HEAD-evidence cell. **Bite**: grep `AUDIT-LEDGER.md:37` for `OPEN.*contradiction` → must return zero.

5. **The corpus + the SFC tell ONE story.** `PROMPT-CORPUS.md:51` describes the standard thumb consistently with `Slider.vue`'s resolved geometry — no "FULLY ROUNDED iOS knob" surviving alongside a shipped cap, and no "integrated cylinder cap" surviving alongside a reverted knob. **Bite**: a manual reconciliation check (the explicit document-reconciliation artefact) — the corpus phrase and the SFC `border-radius`/width recipe name the same shape; recorded in `W-SLD1-DELTA.md` as a one-line corpus↔SFC↔gate alignment statement.

**Named successor on any miss**: if the user-judged capture cannot be produced in-session (the user is unreachable for the verdict), the AY `W-SLD1` PROGRESS status stays `live-pending` (DELTA owed) — NEVER minted `live-verified` from prose (condition 1's gate forbids it); the named successor is the next AY DELTA-capture pass coordinated by W-CARDINAL-INFRA, and the design decision remains the user-domain hinge. The condition-3 readback is single-engine and engine-aware (it does NOT need a fallback engine — the `border-radius` value is read on chromium regardless of `corner-shape` support), so there is no fallback-engine-unreachable miss path; a true multi-engine cross-browser sweep, if ever wanted, is the W-PUB1 publish-time concern, not this wave's close criterion.

## 7. Format And Lint Cadence

- `npm run typecheck` (vue-tsc --noEmit) after the SFC edit and before close — the SFC change is template/scoped-CSS only but the standard-thumb geometry edit touches the `<style scoped>` block; typecheck confirms no `<script setup>` regression.
- `npm run proof:slider-two-only` after the SFC + gate edits (the source-arm gate) and at close.
- `tests-visual` Playwright run for `slider-spectrum-fallback.spec.ts` on the `chromium-headless-new` project (the ONLY project in `tests-visual/playwright.config.ts` — single-engine engine-aware, NOT a multi-engine sweep; see §6 condition 3).
- `npm run proof:live-verified-ledger:ay` at close (the cardinal-lesson gate, the `--tranche=AY` arm).
- `git diff --check` for the doc edits (PROMPT-CORPUS, AUDIT-LEDGER, DELTA, CLAUDE.md).
- Lint skip rationale: no JS/TS source-logic change beyond the gate script (which the gate's own run validates) — the SFC scoped-CSS and doc edits have no eslint surface; the replacement evidence is the typecheck + the two proof gates + the single-engine spectrum-fidelity spec.

## 8. Verification Artefacts

- `docs/tranches/AY/audit/visual/W-SLD1-DELTA.md` — the user-judged decision record + the resolved-thumb PNGs (light+dark) + the corpus↔SFC↔gate alignment line.
- `docs/tranches/AY/audit/visual/W-SLD1-standard-resolved-{light,dark}.png` — the standard thumb as resolved (the own-surface `^W-SLD1-` PNGs the ledger gate matches).
- `docs/tranches/AY/audit/visual/W-SLD1-spectrum-{light,dark}.png` — the chromium-only spectrum squircle fidelity capture (single-engine engine-aware, NOT a multi-engine sweep).
- `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` — with `"W-SLD1"` appended.
- `tests-visual/slider-spectrum-fallback.spec.ts` — the passing π spec (output log in `tests-visual/test-results`).
- The `proof:slider-two-only` + `proof:live-verified-ledger:ay` gate artefacts (JSON, via `gate-output.mjs`).
- The commit SHA of the close.

## 9. Commit Plan

- One orchestrator integration commit at close (single agent, single SFC + gate + docs surface): `feat(slider): reconcile standard-thumb design intent (AY.W-SLD1) + spectrum round-fallback fidelity`. Commit body REQUIRED (it carries a design decision + a gate-orientation change): name the resolved branch {supersede|revert+invert-gate|reconcile}, the user's verdict reference, the spectrum-fallback radius change, and the gate-clause orientation.
- The DELTA + PNG artefacts commit with the same close commit (the capture is the evidence the commit asserts).
- No agent-owned worktree commits (single serial agent on clean main).

## 10. Dependencies

- **Depends on**: AY.W0-REGROUND (ledger re-grounded); AY.W-CARDINAL-INFRA (tranche-parameterized `proof:live-verified-ledger` → `proof:live-verified-ledger:ay` at `package.json:683`, scanning `docs/tranches/AY/audit/visual/` — this wave is the first AY reconcile enforced by it; the engine is already parameterized at HEAD). NOT W-DOCK3 (a sibling consumer of the same engine, not a dependency).
- **Blocks**: AY.W-SLD2 (the consumer-boundary fifth clause EXTENDS `proof:slider-two-only` — it opens after this wave's possible CYLINDER/KNOB clause re-orientation lands, so the two never co-write the script); AY.W-GLASS (routes `Slider.vue` onto `--glass-level` — sequence after this wave so the SFC has one writer at a time); the W-PUB1 publish + speedtest version-bump (the consumer verify, publish-gated).

## 11. Archaeology

The slider design intent churned across four prior attempts: P.W3 (`df0e7e7` GlassScrubber), AV.W11 (unification to one component), AX.W23 (re-register), AX.W59 (`a730782` design-reconcile to the integrated cylinder + `proof:slider-two-only` gate-lock). Each tranche re-stated the user's "FULLY ROUNDED iOS knob" in its corpus but never reconciled it against the shipped cap — the chronic this wave closes. New guardrail: the resolution is anchored by a USER-JUDGED captured DELTA enforced by `proof:live-verified-ledger:ay`, so the design cannot drift back to a prose-only mismatch; the AX.W59 owed-DELTA (`c72d2ac`/`4f18551`) is superseded by this user-judged capture (the AY re-opening of the design invalidated that earlier capture).

---

## §RE-GROUND 2 — the clarified standard (2026-06-09; BINDING; supersedes the (b) reading)

### The user's words ARE the binding geometry (verbatim, USER-DECISIONS-2026-06-09 addendum)

> "our slider should be of two forms — a continuous rounded cylinder (thumb integrated into a
> thick track that appears as one continuous piece) and our spectrum slider, as seen in value.js"

This supersedes ALL prior slider design statements, including the PROMPT-CORPUS:51 reading that
W-SLD1 resolved as (b) revert-to-knob. The standard form is the **CONTINUOUS ROUNDED CYLINDER**:
a THICK track with the thumb INTEGRATED so the whole reads as ONE continuous piece. "Fully
rounded" and "continuous" are a CONJUNCTION — a round knob that bulges past a thin track
satisfies only the first half and inverts the second.

### The live verdict (FD-slider-design lane, captured at `/forms/slider`, light+dark)

**The as-built W-SLD1 standard thumb reads as a DETACHED FLOATING KNOB — the (b) revert
OVER-SHOT.** Measured live (chromium π readback, both schemes): md track 6px / thumb 16×16
circle → the knob protrudes 5px past the track per side, **2.67× the track height** (sm 3.0×,
lg 2.0×). That is the canonical Material/shadcn knob-on-a-wire register, the opposite pole of
"one continuous piece." The same-ink thumb/fill color (both `--primary`) merges them into one
dark mass at the value point but cannot rescue the geometric discontinuity. The thin 6px track
ALSO fails the "thick track" half outright AND renders the W52 liquid-glass range fill (blur +
rim + under-shadow, all live in the computed style) sub-perceptual — real glass machinery
painting at a scale no eye can read.

**The spectrum form is ON-REGISTER vs value.js** (`ComponentSliders.vue`: 24px gradient
`rounded-full` capsule + full-height transparent bordered window thumb): glass-ui ships the
same register at 17.6×24 with zero protrusion; the squircle-vs-slim-pill silhouette delta is a
deliberate iOS-color-picker refinement, no delta owed. Note the spectrum thumb ALREADY obeys
the containment law the standard is missing (thumb inscribed in the track, protrusion 0).

Evidence: `docs/tranches/AY/audit/design/FD-slider-design.md` + its 8 captures
(`FD-slider-{asbuilt-full,standard-zoom,standard-hover,spectrum-zoom}-{light,dark}.png`).

### The precise delta the BUILD phase owes (standard form only; implementation halted this lane)

1. **Thicken the track to the cylinder register** — `--slider-track-height` ≈ the control
   height (md ≈ 16–24px; the spectrum's `1.5 × thumb-size` register is the natural sibling).
2. **Inscribe the knob** — thumb diameter ≡ track height (or track − 2×inset, inset ≤ 2px for
   the iOS reveal): `aspect-ratio: 1` + `border-radius: 50%` retained, protrusion = 0. The
   ball-bearing-inside-the-cylinder reading.
3. **`thumbAlignment: 'contain'`** on the standard form once inscribed (the spectrum already
   sets it) so the knob never overhangs the capsule's rounded ends.
4. **Re-token the size rungs** to `--slider-thumb-size ≤ --slider-track-height` at every rung
   (currently inverted: 12/4, 16/6, 24/12).
5. **Affordance moves in-surface** — press-scale + specular gleam stay; hover reads as the
   knob/fill brightening, not an outer satellite ring (focus-visible halo may stay for a11y).
6. **Prose currency** — story subtitle ("continuous rounded iOS knob"), `Slider.vue` comment
   blocks, `index.ts` JSDoc, PROMPT-CORPUS:51 phrasing, and the gate clause all restate the
   integrated-continuous geometry; the W-SLD1 DELTA gains a successor capture of the inscribed
   form (the user judges the cylinder, per the cardinal lesson).

### The isCircle clause — THIRD restatement (lock integrated-continuous geometry, NOT a bare circle test)

History: restatement 1 (AX.W59) REDDENED the circle to lock the cap; restatement 2 (W-SLD1 (b))
INVERTED it to REQUIRE the circle. Both are bare-shape tests and both under-specify: the bare
`isCircle = radius === "50%"` (`proof-slider-two-only.mjs:308`) passes a 16px ball on a 6px
wire — gate-green, standard-violating. The third restatement locks the CONJUNCTION:

- **ROUND-ENDED**: `border-radius: 50%` + `aspect-ratio: 1` stay REQUIRED (the circle is
  mandatory — restatement 2's inversion holds);
- **TRACK-HEIGHT-MATCHED**: the thumb box resolves to the track height — token-level,
  `--slider-thumb-size` ≡ `--slider-track-height` − 2×inset (inset ≤ 2px), per size rung;
- **ZERO-DETACHMENT**: NO size rung where thumb-size > track-height — the knob never paints
  outside the capsule (protrusion ≤ 0); the wire-and-ball geometry REDS.

The clause asserts all three or it asserts nothing: circle ∧ inscribed ∧ thick-track. A future
re-litigation of the slider shape re-reads THIS block first — the user's verbatim words above
are the standard the geometry serves.

---

## §RE-GROUND 3 — the hc2 as-built residues (from `audit/hardening/hc2/HC-sld-dock.md` §1)

§RE-GROUND 2 fully specced the cylinder CORRECTION (the geometry, the third isCircle restatement, the prose-currency arm). The hc2 re-ground of the AS-BUILT W-SLD1 (the (b) revert that shipped, gate PASS re-run) caught FIVE residues §RE-GROUND 2 left UNROUTED — all doc/capture/comment-currency, NO engine re-open. The BUILD phase (the cylinder correction) folds these into its single pass.

**RG3-A (HC-sld-dock §1.2, the binding captures CLIP the knob) — recapture with a padded clip.** In BOTH `W-SLD1-standard-resolved-{light,dark}.png` (1068×69) the slider row sits at the bottom edge of the crop and the lower ~third of the knob's circle is AMPUTATED (verified at 6× magnification). Cause: `tests-visual/slider-spectrum-fallback.spec.ts:176-178` — `stdSection.screenshot()` clips to the leaf `<section>` box, and the 16px thumb overflows the 6px-track section's bottom edge. A PNG anchoring a SHAPE decision MUST show the full silhouette. Fix at recapture: a padded `clip` rect off `boundingBox()` (or screenshot the section's PARENT). The cylinder-correction recapture (§RE-GROUND 2 item 6's successor capture) lands the full-silhouette inscribed-knob PNGs and supersedes the clipped set.

**RG3-B (HC-sld-dock §1.3, the user-judged hinge was SELF-SERVED) — the close is `complete_with_misses`; surface the recaptured form to the user.** `W-SLD1-DELTA.md:3-12` minted resolution (b) as "user-directed per PROMPT-CORPUS:51 standing preference… the design decision was already MADE by the user" — NO fresh user verdict against the CAPTURE is recorded. This spec is explicit the other way (§6 condition 1: "names the chosen branch WITH the user's recorded verdict"; the named-successor clause `:142` holds the row at `live-pending` when the verdict is unobtainable). Implementing the verbatim standing words is the DEFENSIBLE branch — but per the spec the as-built close is `complete_with_misses`, and `PROGRESS.md:73`'s `live-verified` overstates the JUDGED half. The §RE-GROUND 2 finding (the (b) revert OVER-SHOT to a detached floating knob — measured 2.67× track height) is the precise reason the hinge matters: the user's eye must rule on the CYLINDER-CORRECTED form. Route per the matrix Class-F user-hinge: surface the recaptured inscribed-knob capture (RG3-A) to the user at the AY close for the one-line ratification; the `PROGRESS.md:73` row carries the gate-green/judgment-pending rider until then.

**RG3-C (HC-sld-dock §1.5, the gate HEADER still narrates the dead cylinder) — currency fix the build phase owes.** The SAME file that now ENFORCES the round knob still narrates the AX.W59 cylinder it abrogated: `proof-slider-two-only.mjs:6` ("`standard` (the INTEGRATED-CYLINDER glass slider)"), `:10` + the console banner `:435` ("the AX.W59 design contract"). Clause 3 is now the AY.W-SLD1 round-knob (soon the cylinder-inscribed) contract; AX.W59's cap was abrogated (as `:306-307` itself says). The §RE-GROUND 2 third-isCircle restatement edits the CLAUSE body but NOT the header prose — fix the header paragraph + the console string to the integrated-continuous geometry (greenfield-no-meta: no "reverted from AX.W59" history, state the design as it stands). This is the gate-clause-currency item §RE-GROUND 2 item 6 named but did not bound to the HEADER.

**RG3-D (HC-sld-dock §1.6, the `Slider.vue:242` stale scaleX comment) — one-line currency fix, folds into the cylinder pass.** `Slider.vue:242-243`: "The thumb `transform` carries the press-give (the `:active` `scaleX` squish below)" — the rule below (`:265-267`) is now the UNIFORM `transform: scale(var(--scale-press-btn, 0.97))` (the W-SLD1-DELTA itself records "now a uniform `scale()` (was `scaleX`)"). The comment LIES about the press. Fix it to "uniform `scale()` press-give" in the cylinder-correction pass (the SFC is already open for the geometry edit — re-grep `:242` against HEAD, it drifts with the geometry).

**RG3-E (HC-sld-dock §1.7, both DELTAs FABRICATE a VISUAL-ALLOWLIST entry; the SPECS misstate the engine) — correct the claim, amend the spec sentence.** `VISUAL-ALLOWLIST.json` at HEAD = `["W-DOCK1","W-CON1","W-DOCK2","W-BLOB2"]` — neither `"W-SLD1"` nor `"W-DOCK3"` present. Yet `W-SLD1-DELTA.md:113-114` CLAIMS "…the `"W-SLD1"` allowlist entry" (and W-DOCK3-DELTA the same). `proof:live-verified-ledger:ay` is GREEN anyway because the allowlist only DEEPENS `complete`-status rows (`proof-live-verified-ledger.mjs:196-206`); `live-verified` rows enforce unconditionally. So the SPEC is WRONG about the engine — §6 condition 1 + §5 Agent-unit sub-gate + File-Bounds (`:104`) assert the `"W-SLD1"` append is "required so the gate accepts the row's own-surface PNG", a requirement the engine does NOT have for a `live-verified` row. The executing agent (correctly) skipped the append; the DELTA then CLAIMED it — the cardinal-lesson micro-inflation class (a false artifact claim in a shipped DELTA). **Fix at restamp:** EITHER append `"W-SLD1"` to the array (harmless, and makes the claim TRUE — the recommended move since the cylinder recapture deepens to own-surface depth anyway) OR correct the DELTA line. AND amend the §6 condition-1 / §5 / File-Bounds sentences so the next reader does not re-derive the wrong engine model (`live-verified` does NOT require the allowlist entry; only `complete` does). NOTE the AUDIT-LEDGER row 9 + `PROGRESS.md:73` restamp folds with the cylinder close (HC-sld-dock §4: the `live-verified` should carry the RG3-B user-hinge rider).

These five are doc/capture/comment-currency — they land in the cylinder-correction BUILD pass (§RE-GROUND 2's build phase) with ZERO additional engine surface. The cylinder geometry edit, the gate-clause third-restatement, and these five currency fixes are ONE close.
