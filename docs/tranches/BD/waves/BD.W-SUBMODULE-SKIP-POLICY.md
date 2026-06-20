# BD.W-SUBMODULE-SKIP-POLICY

## (1) Band + goal

**Band 6 — Precept canon.**

Canonize the absent-private-submodule **skip-by-policy** CONVENTION as a binding gate-authoring rule (in `docs/precepts/instructions/README.md §Gates` — the gate-validity home): a gate clause reading `docs/precepts/*` MUST gate ONLY that clause behind `existsSync(submoduleDir) && readdirSync(submoduleDir).length > 0` → SKIP-BY-POLICY when absent (CI), bite when present (local); every NON-submodule clause keeps biting in BOTH. Record the rule so the NEXT precept-reading gate is authored with the skip FROM BIRTH, not retrofitted at the irreversible-tag cut.

## (2) Starting state — the exact on-disk reality

- **The convention SHIPS in 6 glass-ui gates but is named in ZERO precept (VERIFIED):**
  - `scripts/proof-precept-current.mjs:336-360` (read in full) carries the canonical implementation: a comment block (`:336-341`) — "docs/precepts is a git SUBMODULE (a sibling private repo). On a CI runner the checkout does not initialize it (and cannot — the default token has no cross-repo grant), so the dir is empty. Absent-submodule → skip-by-policy (the sibling-gate convention) — the LIVE-doc detector (W1/W2/W3 read design-idioms.md) skips; the SYNTHETIC-doc self-test (which supplies its own inline §3 fixtures, NOT the submodule) keeps biting. Locally the clause BITES." — followed by `const submodulePresent = existsSync(preceptsDir) && readdirSync(preceptsDir).length > 0;` (`:343-344`) and the `if (!submodulePresent) { console.log("… SKIP-BY-POLICY …"); facts = {…submoduleSkipped: true}; violations = []; }` branch (`:347-360`).
  - The same skip threaded across the other 5 doc gates at glass-ui commit `9c0e06e2` (VERIFIED — the body: "6 gates lacked the established absent-submodule skip-by-policy convention (proof:colocation / proof:no-layout-animation already have it): phase-palette (W4 design-idioms row), precept-current (live-doc detector), motion-one-clock (P7 motion-canon), tunable-anim (tunable-anim.md registry), affordance-map (affordance-map.md), easing-primitive (W5 design-idioms). Each gates ONLY its docs/precepts-reading clause behind existsSync(preceptsDir)&&readdirSync.length>0 → SKIP-BY-POLICY on absent (CI), the existing check when present (local bites). Every NON-submodule clause keeps biting in BOTH. … No weakening."). The gates exist in `package.json` (VERIFIED): `proof:precept-current:750`, `proof:colocation:783`, `proof:no-layout-animation:692`, `proof:easing-primitive:906`, `proof:motion-one-clock:965`, `proof:affordance-map:967`, `proof:tunable-anim:968`.
- **NO precept names the convention (VERIFIED):** `docs/precepts/instructions/README.md §Gates` (`:171-186`, read in full) lists the gate-validity criteria (artefact-backed, grep-supplementary) but says NOTHING about how to author a gate that reads a private submodule absent on CI. `docs/precepts/instructions/ORCHESTRATION.md` (headings read) has no gate-authoring-rule section. The convention is implemented 6 times in glass-ui and canonized 0 times — exactly the failure class (codification-without-a-gate's inverse: a convention-without-codification) that recurs for EVERY future precept-reading gate.

The decision: FOLD-LEDGER `→BD.W-SUBMODULE-SKIP-POLICY` — "Canonize as a gate-authoring rule; narrow-clause-only (every non-submodule clause keeps biting)."

## (3) The build — the canon edit (a submodule commit, orchestrator-owned)

**A precept-submodule doc edit. Orchestrator owns the commit + the pointer bump (named in the BD plan → ι expects it).**

Add a gate-authoring rule to `docs/precepts/instructions/README.md §Gates` (`:171-186`), appended after the "Grep-only checks are supplementary…" close (`:186`):

```
### Gates that read a private submodule

A gate clause that reads a file under a private git submodule (e.g.
`docs/precepts/*`) MUST gate ONLY that clause behind a presence check —

    const submoduleDir = resolve(ROOT, "docs/precepts");
    const present = existsSync(submoduleDir)
        && readdirSync(submoduleDir).length > 0;
    if (!present) { /* SKIP-BY-POLICY: the clause cannot read the absent
        submodule on a CI runner that cannot init it */ }

— and bite when the submodule is PRESENT (local). The CI runner's default
token has no cross-repo grant, so it cannot initialize a private submodule;
the dir is empty and any clause reading through it hard-REDs unless it
skips by policy.

The skip is NARROW-CLAUSE-ONLY. It governs ONLY the submodule-reading
clause; every NON-submodule clause in the same gate KEEPS biting under CI
(no early gate-wide return that masks a real `src/` red). A gate's
SYNTHETIC self-test fixtures (which supply their own inline content, not
the submodule) keep biting in BOTH conditions — the bite is proven on the
fixture even when the live-doc arm skips. "No weakening": the skip is for
the un-readable submodule path, never a convenience that loosens a
threshold.

Author the skip FROM BIRTH on any new submodule-reading gate — the
retrofit at the irreversible-tag cut (six gates hard-REDing on the first
release-runner run) is the failure this rule pre-empts.
```

The canon records the EXACT mechanism (`existsSync && readdirSync(dir).length > 0`, the narrow-clause-only fence, the synthetic-self-test-keeps-biting note) so a future precept-reading gate is authored correctly the first time. It cross-references BD.W-CLOSE-DISCIPLINE-CANON's bug-class #2 (the same submodule-skip class, recorded there as a close-time bug; here as the authoring rule).

Fences honored: the rule is NARROW-CLAUSE-ONLY (the cardinal fence — the skip never becomes a gate-wide return masking real `src/` reds). It is a precept-generic rule (it names `docs/precepts` as the canonical example but the rule is "any private submodule").

## (4) The gate — born-RED → GREEN (verification + optional self-test)

**Doc-canon wave** — the product is the §Gates rule. Verification:

- **The convention already SHIPS as the machine-enforcement** (6 gates carry the skip; their own inline self-tests prove the synthetic-fixture arm keeps biting). The canon records the AUTHORING RULE so the next gate is born with it.
- **NARROW-CLAUSE-ONLY FENCE (the binding correctness):** the canon must state — and the 6 existing implementations demonstrate — that the guard gates ONLY the submodule-reading clause; every non-submodule clause keeps biting under CI. The proof is the existing gates: each skips its `docs/precepts`-reading clause but keeps its `src/`-reading clauses + its synthetic self-test biting (e.g. `proof:precept-current`'s `selfTest()` at `:291-327` supplies inline §3 fixtures NOT the submodule, so it bites regardless of submodule presence — VERIFIED).
- **Optional self-test (a thin precept-side assertion):** a synthetic gate that does a gate-wide-skip (early-return on absent submodule, masking a real `src/` clause) is FORBIDDEN — but the binding machine-enforcement is the per-gate self-test the 6 gates already carry. No new build gate is mandatory; the canon points at the existing pattern.
- **CI-accurate verify of the canon's claim:** confirm on a fresh worktree with the submodule ABSENT + `CI=true` that each of the 6 gates exits 0 with `SKIP-BY-POLICY` printed for its submodule arm AND still REDs a planted `src/` violation (the narrow-clause proof) — exactly what `9c0e06e2`'s body recorded ("Verified ABSENT(fresh worktree,CI=true) exit 0 + SKIP-BY-POLICY; PRESENT-violating exit 1. No weakening.").

## (5) Paint verification

**Device-free — doc/canon wave (no paint).** NO `proof:ba-gestalt`. The artefact is the §Gates authoring rule + the CI-accurate verification that the 6 gates skip-by-policy on the absent submodule while keeping every non-submodule clause biting. No painting surface is touched.

## (6) Fences + risks

- **NARROW-CLAUSE-ONLY FENCE (the cardinal fence).** The guard gates ONLY the submodule-reading clause; every NON-submodule clause KEEPS biting under CI. A gate-wide early-return on absent submodule (masking a real `src/` red) is the forbidden weakening — "No weakening" (the `9c0e06e2` invariant). The canon must state this explicitly so a future agent does not "simplify" the per-clause skip into a gate-wide return.
- **SUBMODULE-COMMIT FENCE** (as BD.W-CLOSE-DISCIPLINE-CANON). The §Gates rule lands in the `docs/precepts` submodule; the orchestrator owns the commit + the pointer bump; ι expects it (named in the BD plan).
- **The synthetic self-test keeps biting** — the canon must record that a gate's inline self-test (inline fixtures, NOT the submodule) bites in BOTH conditions, so the skip never hides a real detector regression.
- **No glass-ui src/ touch** — this is a precept-submodule doc edit; the 6 glass-ui gates are byte-untouched (they already carry the skip).
- **Author FROM BIRTH** — the rule's purpose is pre-emption: the next precept-reading gate is authored with the skip, not retrofitted at the cut (the six-gate retrofit at `9c0e06e2` is the incident the rule prevents).
