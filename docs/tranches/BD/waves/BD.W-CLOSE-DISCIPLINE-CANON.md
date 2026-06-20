# BD.W-CLOSE-DISCIPLINE-CANON

## (1) Band + goal

**Band 6 — Precept canon.**

Canonize the CI-accurate close discipline as a precept edict in `docs/precepts/instructions/tranche/SPEC.md §Close` (+ a LESSONS-LEARNED entry, threaded by BD.W-LESSONS-BB-BC-BACKFILL): the close runs `gates.mjs --run full` in a CLEAN CHECKOUT with siblings AND the `docs/precepts` submodule ABSENT (the real `release.yml`-runner condition) BEFORE the irreversible tag — never `--run local` (`ci ⊂ local` masks reds), never submodule-synced (not CI-accurate). Records the three close-time bug CLASSES the all-green cut surfaces that the mid-tranche battery never reaches.

## (2) Starting state — the exact on-disk reality

- **`docs/precepts/instructions/tranche/SPEC.md:188-312 §Close` (VERIFIED, read in full):** §Close carries the close-criteria list (`:190-214`), the ι integrity-sweep (`:199-214` — walks `git reflog` for agent-attributed mutations + `git log -- docs/precepts/` for unexpected submodule changes + `audit-stash-list.mjs`), the `### The π visual-runtime lane` (`:216-269`), the `### Close-Honesty Checklist` (`:271-285`), and the `### Audit-verdict spot-verification gate` (`:287-312`). There is **NO** subsection naming the CI-accurate full-battery-clean-checkout-with-siblings-AND-submodule-absent discipline. The §Close that exists is about audit lanes + honesty checks; it does NOT say "the close runs `--run full` siblings-and-submodule-absent before the tag".
- **`docs/precepts/instructions/LESSONS-LEARNED.md` (VERIFIED):** 633 lines; the last dated entry is `## 2026-06-10 - Glass-First backdrop-filter Captures fixed-Position Descendants (glass-ui AY.W-ANIM1)` at `:628`. `grep -c 'BC\.'` = 0. The close-time lessons live ONLY in glass-ui commit bodies (below), nowhere in the precept ledger.
- **The three close-time bug classes live ONLY in glass-ui commit bodies (VERIFIED, read in full):**
  - `ae3e64e5` ("BC.W-CUT — gate-manifest-sound close-time fixes (recursion guard + R6 CI-skip + untrack volatile smoke)"): the body names exactly the three classes — **(1) RECURSION GUARD** (`proof:gate-manifest-sound` is `tags:['local']`, so it is a ROW in the `--run local` set its own PROOF-ALL-RUNS clause spawns; at the all-green cut no born-RED gate stops the inner battery, so it reaches itself → spawns ANOTHER `--run local` → unbounded recursion / 188 node procs; fix: the spawn carries `GLASS_UI_GATE_MANIFEST_NESTED=1`, the nested invocation SKIPS its own spawn, bounding recursion to one level); **(2) R6-PERSISTED accepts `skipped` under CI** (the clause demanded the dock-animation-live cache read `pass`, but a CI run befittingly SKIPS the real-GPU live-π → `skipped`, unachievable-as-`pass` in CI; fix: require `pass` locally, accept `skipped` under CI, reject `fail` in both — the cardinal-lesson split); **(3) UNTRACK the volatile runtime-smoke output** (`docs/tranches/F/audit/W1-runtime-smoke.json` is WRITE-ONLY by `proof:runtime` — a non-deterministic `new Date()` timestamp read by nothing — yet TRACKED, so every run dirtied the tree → CLEAN-TREE false-RED; gitignored).
  - `9c0e06e2` ("BC.W-CUT — 6 doc gates skip-by-policy on the absent docs/precepts submodule (the v4.1.0 CI fix)"): the body names the submodule-absent class — the `v4.1.0 release.yml` FAILED at `proof:phase-palette W4` because it reads `docs/precepts/design-idioms.md`, but `docs/precepts` is a private git SUBMODULE the CI runner cannot init (the default `GITHUB_TOKEN` has no cross-repo grant) → empty dir → hard-RED; the local `--run full` passed ONLY because the submodule was synced (NOT CI-accurate). "The CI-accurate verify (submodule absent) is now the standing close discipline."
  - `a021439a` ("BC.W-CUT — the π-gate CI-skip consistency (single-source) + 8 device-free reconciles + ba-gestalt re-shot"): the body names the live-arm-CI-grace class (canonized separately by BD.W-LIVE-ARM-CI-GRACE-CANON; the close-discipline canon cross-references it).
- **CLAUDE.md `BB.W-CLOSE-BATTERY` is glass-ui-LOCAL, not a precept (VERIFIED):** the `--run full` deduped-union close-battery discipline + `proof:close-battery-parity` (`scripts/proof-close-battery-parity.mjs`, `package.json:691`) + `proof:full` (`package.json:942`, `node scripts/gates.mjs --run full`) ship in glass-ui (the `gates.mjs:405` note documents C1-C4 + the self-test). But this is glass-ui-LOCAL canon — it is NOT in the cross-tranche precept SPEC, so the NEXT repo / tranche opens without the discipline.

The decision: FOLD-LEDGER `→BD.W-CLOSE-DISCIPLINE-CANON` — "Canonize in SPEC.md §Close + LESSONS; names the gate/ceremony seam (Q-chron-3)."

## (3) The build — the canon edit (a submodule commit, orchestrator-owned)

**This is a precept-submodule doc edit. Agents are read-only on git; the orchestrator owns the submodule commit + the pointer bump (named in the BD plan, so the ι integrity-sweep EXPECTS it, not HALTS on it).**

Insert a new subsection into `docs/precepts/instructions/tranche/SPEC.md §Close`, placed AFTER the `### The π visual-runtime lane` (`:269`) and BEFORE `### Close-Honesty Checklist` (`:271`) — it belongs beside the lanes, ahead of the honesty check:

```
### The CI-accurate close battery — siblings AND submodule absent

The close runs the FULL deduped gate battery — `gates.mjs --run full`
(the deduped union of the `local`, `ci`, and `release` tag sets) — in a
CLEAN CHECKOUT in the **release-runner condition** (sibling repos absent
AND every private submodule absent — the real condition the
release.yml CI runner sees) BEFORE the irreversible tag. The close NEVER
runs `--run local` alone (`ci ⊂ local`: a local-only close greens while
the ci-tagged subset carries reds the local battery never reached) and
NEVER runs the battery with the submodule synced (a synced local pass is
not CI-accurate — it masks the absent-submodule hard-REDs the runner hits).

A tranche that ships its own gates ships them PROVEN under this condition:
verify on a fresh worktree with `CI=true` and the private submodule
ABSENT, exit 0. A synced local pass is the false-green this kills.

The all-green cut surfaces a class of close-time bugs the mid-tranche
battery NEVER reaches (an in-flight born-RED gate always stops the inner
battery early, masking everything downstream of the first failure). Three
recorded classes the close discipline must pre-empt:

1. **Meta-gate self-recursion.** A close-completeness meta-gate that is
   itself a ROW in the set it spawns (`gates.mjs --run local`) recurses
   unboundedly at the all-green cut (no born-RED row stops the inner
   battery). The spawn carries a NESTED env guard (`GLASS_UI_GATE_MANIFEST_
   NESTED=1`); the nested invocation skips its own spawn — recursion
   bounded to exactly one level. Author every close-meta-gate with the
   nested guard from birth.

2. **A doc gate reading a private submodule the CI runner cannot init.**
   A gate clause reading `docs/precepts/*` hard-REDs on the empty
   submodule dir under CI. Gate ONLY that clause behind
   `existsSync(submoduleDir) && readdirSync(submoduleDir).length > 0` →
   SKIP-BY-POLICY when absent (CI), bite when present (local). Every
   NON-submodule clause keeps biting in BOTH (see the submodule
   skip-by-policy gate-authoring rule).

3. **A volatile tracked artefact dirties the tree → CLEAN-TREE false-RED.**
   A write-only, non-deterministic gate output (a `new Date()` timestamp, a
   per-run measurement) read by nothing yet TRACKED dirties the working tree
   on every run, so the clean-tree close check false-REDs. Gitignore it.

The seam that makes this LOAD-BEARING (not prose): the close ceremony
INVOKES the full-battery run as a binding step, and a close-battery-parity
meta-gate asserts the close/release path runs `--run full` (the deduped
union) — not `--run local`/`--run release` alone — with a self-test bite
(a synthetic `--run local`-only close path MUST flag). Codification
without a gate is necessary-but-not-sufficient (Q-chron-3); this names the
gate seam.
```

The canon NAMES the existing seam without inventing one — glass-ui's `proof:close-battery-parity` (`scripts/proof-close-battery-parity.mjs`) + `proof:full` ARE the load-bearing gate; the precept records the DISCIPLINE so the next tranche/repo authors the seam from the SPEC. The three close-time bug classes are recorded with their mechanism (the nested env guard, the narrow-clause submodule skip, the gitignore) so a future agent pre-empts them.

Fences honored: the canon is generic-precept prose (it names the env-var name as the recorded MECHANISM, not a glass-ui-only edict). It cross-references the submodule skip-by-policy rule (BD.W-SUBMODULE-SKIP-POLICY) and the live-arm CI-grace mechanism (BD.W-LIVE-ARM-CI-GRACE-CANON) — the three band-6 canon waves form one coherent close-discipline cluster, each owning its own facet.

## (4) The gate — born-RED → GREEN (verification, not a new build gate)

This is a **doc-canon wave** — its product is the SPEC.md edit + the cross-references, not a code change. The verification is device-free + CI-accurate:

- **The canon must NAME the gate/ceremony seam** that makes it load-bearing (the close-battery-parity meta-gate + the `--run full` ceremony step) — Q-chron-3's rule that codification without a gate is insufficient. The seam already SHIPS (glass-ui `proof:close-battery-parity` + `proof:full`); the canon points at it.
- **CI-accurate verify of the canon itself:** the §Close subsection is verified under `CI=true` + a fresh worktree + the `docs/precepts` submodule ABSENT — exit 0 (a synced local pass is the false-green this kills). The `ι` integrity-sweep confirms the submodule pointer bump is ATTRIBUTED to BD.W-CLOSE-DISCIPLINE-CANON (it is named in the BD plan), not an unattributed change that HALTS the close.
- **No new born-RED build gate is minted** — the existing `proof:close-battery-parity` (the C4 clause asserts the CLAUDE.md close-battery canon + the `proof:full` script exist) is the standing machine-lock; the precept canon adds the cross-repo precept layer the gate already enforces glass-ui-locally. (Optionally a thin precept-side assertion that SPEC.md §Close NAMES the full-battery discipline could be added, but the binding lock is the already-shipped `proof:close-battery-parity`.)

## (5) Paint verification

**Device-free — doc/canon wave (no paint, BB inv-4 no-op-on-paint: a precept edit changes ZERO pixels).** NO `proof:ba-gestalt` verdict (this is a SPEC.md subsection, not a painting surface). The artefact is the §Close subsection + the verified-under-CI=true/submodule-absent exit-0 + the cross-references to the two sibling canon waves. The BC anti-disease law is trivially satisfied (no source-green close on a visual surface — there is no visual surface).

## (6) Fences + risks

- **SUBMODULE-COMMIT FENCE (load-bearing).** `docs/precepts` is a SEPARATE git submodule (clean at `c9950089`). This wave is a COMMIT IN THE SUBMODULE + a pointer bump in the glass-ui superproject, BOTH EXPECTED (named in the BD plan). The ι integrity-sweep HALTS on an UNATTRIBUTED submodule change — this change IS attributed to BD.W-CLOSE-DISCIPLINE-CANON, so it is expected, not a halt. Agents are read-only on git; the orchestrator owns the submodule commit + the bump.
- **The canon must NAME the gate/ceremony seam** (Q-chron-3) — a prose edict without a mechanical gate is necessary-but-not-sufficient. The seam (`proof:close-battery-parity` + the `--run full` ceremony step) already ships; the canon points at it, never re-derives it.
- **CI-accurate verification of the canon itself** — the discipline is verified under the SAME condition it documents (CI=true, fresh worktree, submodule ABSENT). A synced-local pass would be the exact false-green the canon kills — do not verify it with the submodule synced.
- **Do NOT weaken the existing §Close** — the ι integrity-sweep + the π lane + the Close-Honesty Checklist + the Audit-verdict gate are PRESERVED; the new subsection is ADDITIVE, inserted between the π lane and the Close-Honesty Checklist.
- **No glass-ui src/ touch** — the canon is a precept-submodule doc edit; `proof:close-battery-parity` (the glass-ui-local lock) is byte-untouched.
