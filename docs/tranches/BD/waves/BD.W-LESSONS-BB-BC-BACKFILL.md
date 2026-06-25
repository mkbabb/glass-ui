# BD.W-LESSONS-BB-BC-BACKFILL

## (1) Band + goal

**Band 6 — Precept canon.**

Backfill `docs/precepts/instructions/LESSONS-LEARNED.md` with the BB+BC incident ledger (it stops at AY — zero BB/BC entries despite two tranches). Each lesson follows the established **Source/Failure/Rule/Check** format: (a) the BC all-green-cut gate-infrastructure class (recursion guard / submodule-skip / volatile-tracked-artefact / live-arm-CI-grace — cross-referenced to the band-6 canon waves); (b) the BB single-terminal-reflect deferral disease (canonized as the gestalt-first PRECEPT but absent from the LEDGER); (c) any BB-class lesson the precept doesn't cover.

## (2) Starting state — the exact on-disk reality

- **`LESSONS-LEARNED.md` stops at AY (VERIFIED):** 633 lines; the last dated entry is `## 2026-06-10 - Glass-First backdrop-filter Captures fixed-Position Descendants (glass-ui AY.W-ANIM1)` at `:628` (read in full — it carries the **Source/Failure/Rule/Check** shape with `- **Source**:`/`- **Failure**:`/`- **Rule**:`/`- **Check**:` bullets, `## YYYY-MM-DD - Title` headers, `---` separators between entries). `grep -c 'BC\.'` = 0. The BB tranche (the procedural-viz suite, the single-terminal-reflect disease) and the BC tranche (the cut bug-classes) have ZERO ledger rows.
- **The BB single-terminal-reflect disease is a PRECEPT but has NO LEDGER row (VERIFIED):** `docs/precepts/instructions/gestalt-first-capture.md:3-8` (read in full): "the disease that destroyed BB: 48 specs deferred their π to one `W-REFLECT3` wave the execution stop cut, 65 DELTAs on disk yet zero gestalt-verdict-flipped". The disease is canonized as a PRECEPT (the P1-P5 gestalt-first capture discipline + `proof:ba-gestalt` G7/G8) but there is NO **Source/Failure/Rule/Check** LEDGER entry — a planner opening the ledger reads a history that pretends nothing happened after AY, with the most destructive incident in project history absent from the incident ledger.
- **The BC cut bug-classes live ONLY in glass-ui commit bodies (VERIFIED):**
  - `ae3e64e5` (gate-manifest-sound close-time fixes — recursion guard / R6 CI-skip / volatile-tracked-artefact; body read in full, names all three).
  - `9c0e06e2` (6 doc gates skip-by-policy on the absent submodule; body read in full).
  - `a021439a` (27 live-π gates lacking the CI-grace-skip; body read in full).
  None of these has a LESSONS-LEARNED row — they are recorded in commit bodies and in the band-6 canon waves (BD.W-CLOSE-DISCIPLINE-CANON / BD.W-SUBMODULE-SKIP-POLICY / BD.W-LIVE-ARM-CI-GRACE-CANON) but the cross-tranche INCIDENT LEDGER (whose purpose is the at-tranche-open read of what bit before) is blind to them.

The decision: FOLD-LEDGER `→BD.W-LESSONS-BB-BC-BACKFILL` — "Backfill the BB deferral-disease + the BC cut-bug classes (Source/Failure/Rule/Check)."

## (3) The build — the LESSONS backfill (a submodule commit, orchestrator-owned)

**A precept-submodule doc edit. Orchestrator owns the commit + the pointer bump (named in the BD plan → ι expects it).**

Append new dated entries to `LESSONS-LEARNED.md` after the AY entry (`:628`), each in the established Source/Failure/Rule/Check format, `---`-separated:

### Entry 1 — `## 2026-06-19 - The Single-Terminal-Reflect Deferral Disease (glass-ui BB)`
- **Source:** glass-ui BB tranche post-mortem (canonized as the precept `instructions/gestalt-first-capture.md`). BB deferred the binding paint-π of 48 visual waves to one terminal `W-REFLECT3` reflect wave; the execution stop cut that wave. 65 DELTA artefacts landed on disk yet ZERO gestalt verdict flipped GREEN — every visual wave closed `complete` on source-green with its paint-π funneled forward to a wave that never ran.
- **Failure:** a per-wave visual surface closed on the gate's device-free arm alone (source-green) while its binding paint verification was deferred — the "is GREEN at this wave close; W-REFLECT re-confirms on the union tree" pattern. The deferral and the verification-event were temporally disjoint (the deferral lands at the wave's close, the verification is owed to a future terminal wave); a stop cut between them ships the unverified surfaces. The single-terminal-reflect funnel concentrates ALL the project's paint-risk into ONE wave whose removal silently un-verifies the entire visual band.
- **Rule:** every wave that paints a surface verifies its OWN paint at its OWN close — there is NO terminal reflect wave to funnel verification into (the gestalt-first capture precept, P1-P5). The moment a wave touches a painting source, the gestalt verdict for that surface auto-reverts to FAIL (`proof:ba-gestalt` G7) until the wave itself takes a FRESH capture + records the pixel readback + the gate derives the verdict from the pixels. A forward-deferral assertion ("this wave's π is GREEN at this wave close; W-REFLECT re-confirms on the union tree") is MECHANICALLY FORBIDDEN (`proof:ba-gestalt` G8 scans the wave-specs + PROGRESS and reds on it).
- **Check:** `instructions/gestalt-first-capture.md` (the precept) + `proof:ba-gestalt` G7 (source-hash auto-revoke) + G8 (the deferral-assertion ban). The close is the UNION of per-wave verdicts, each mechanically derived from fresh captured pixels — never a terminal funnel. (Cross-ref: the BC tranche CURED this — every BC visual wave is per-wave paint-verified; BD carries it as the binding law.)

### Entry 2 — `## 2026-06-20 - The All-Green-Cut Gate-Infrastructure Bug Classes (glass-ui BC)`
- **Source:** glass-ui BC.W-CUT — the `CI=true gates.mjs --run full` (release.yml-accurate) run surfaced a class of close-time bugs the mid-tranche battery NEVER reached (commits `ae3e64e5` / `9c0e06e2` / `a021439a`). An in-flight born-RED gate always stopped the inner battery early during the tranche, masking everything downstream of the first failure; only the all-green cut (no born-RED row) ran the battery to completion and surfaced the infrastructure bugs.
- **Failure:** four distinct gate-infrastructure failure modes, each invisible until the all-green cut: (1) **meta-gate self-recursion** — a close-completeness meta-gate (`proof:gate-manifest-sound`) is itself a `['local']` ROW in the `--run local` set its own clause spawns; at the all-green cut no born-RED row stops the inner battery, so it reaches itself → spawns another `--run local` → unbounded recursion (188 node procs, the `--run full` hangs forever). (2) **a doc gate reading a private submodule** — 6 gates read `docs/precepts/*`, which the CI runner cannot init (the default token has no cross-repo grant) → empty dir → hard-RED; the local pass passed ONLY because the submodule was synced (not CI-accurate). (3) **a volatile tracked artefact** — a write-only non-deterministic gate output (`new Date()` timestamp, read by nothing) yet TRACKED dirties the tree on every run → CLEAN-TREE false-RED. (4) **27 live-π gates lacking the CI-grace-skip** — they ran their real-browser arm under `CI=true` on a dev box carrying Playwright and read harness artefacts (route-transition DOM-detach, oversized-canvas element-screenshot, a born-RED library-default register) as release REDs.
- **Rule:** the close runs the FULL deduped battery (`gates.mjs --run full`) in the release-runner condition — siblings AND the private submodule ABSENT, `CI=true` — BEFORE the irreversible tag (never `--run local` alone: `ci ⊂ local`; never submodule-synced: not CI-accurate). Pre-empt the four classes from birth: (1) a close-meta-gate spawn carries a NESTED env guard (`GLASS_UI_GATE_MANIFEST_NESTED=1`), the nested invocation skips its own spawn — recursion bounded to one level; (2) a `docs/precepts`-reading clause gates behind `existsSync(dir) && readdirSync(dir).length > 0` → SKIP-BY-POLICY when absent, narrow-clause-only (every non-submodule clause keeps biting); (3) gitignore every volatile write-only gate output; (4) a `['local']` live-π gate's real-browser arm grace-skips under CI via the ONE single-source helper (`liveArmCiGraceSkip()`), narrow-arm (device-free + ci/release arms untouched), and still runs+hard-REDs locally.
- **Check:** `proof:close-battery-parity` (the `--run full` deduped-union close-path lock + the `--run local`-only self-test bite) + the CI-accurate verify (fresh worktree, submodule ABSENT, `CI=true`, exit 0). The four classes are canonized as gate-authoring rules: `tranche/SPEC.md §Close` (the CI-accurate close battery — BD.W-CLOSE-DISCIPLINE-CANON), `instructions/README.md §Gates` (the submodule skip-by-policy — BD.W-SUBMODULE-SKIP-POLICY), and `instructions/gestalt-first-capture.md §P5a` (the live-arm CI-grace mechanism — BD.W-LIVE-ARM-CI-GRACE-CANON). (Cross-ref Q-chron-3: codification without a gate is necessary-but-not-sufficient — each rule names its gate seam.)

Each lesson NAMES the gate/check that makes it load-bearing (cross-referenced to the band-6 canon waves) — the Q-chron-3 discipline (a prose lesson without a mechanical gate is necessary-but-not-sufficient).

Fences honored: the backfill is a precept-submodule doc edit (it appends to the existing ledger; it does NOT re-order or edit prior entries). Each entry follows the EXACT Source/Failure/Rule/Check format the ledger uses (the AY entry at `:628` is the template).

## (4) The gate — born-RED → GREEN (device-free verification)

**Doc-canon wave** — the product is the two LESSONS entries. Verification:

- **Each lesson NAMES the gate/check** (Q-chron-3) — Entry 1 names `proof:ba-gestalt` G7/G8 + the gestalt-first precept; Entry 2 names `proof:close-battery-parity` + the three canon waves' gate seams. A lesson without a named check is the necessary-but-not-sufficient anti-pattern the ledger itself records (the Q-chron-3 entry at `:592`).
- **Format conformance:** each entry carries `## YYYY-MM-DD - Title` + the four `- **Source/Failure/Rule/Check**:` bullets + `---` separators — matching the AY template (`:628`) byte-for-format.
- **No new build gate** is mandatory (a LESSONS backfill is a ledger append, not a code change). The verification is the format-conformance check + the cross-reference resolution (every named gate/wave exists: `proof:ba-gestalt`/`proof:close-battery-parity` in `package.json`; BD.W-CLOSE-DISCIPLINE-CANON/SUBMODULE-SKIP-POLICY/LIVE-ARM-CI-GRACE-CANON in `docs/tranches/BD/waves/`).

## (5) Paint verification

**Device-free — doc wave (no paint).** NO `proof:ba-gestalt`. The artefact is the two LESSONS-LEARNED entries (BB deferral-disease + BC cut-bug classes) in the Source/Failure/Rule/Check format, each cross-referenced to its band-6 canon wave + its gate seam. No painting surface is touched.

## (6) Fences + risks

- **SUBMODULE-COMMIT FENCE** (as BD.W-CLOSE-DISCIPLINE-CANON). The backfill lands in the `docs/precepts` submodule; the orchestrator owns the commit + the pointer bump; ι expects it.
- **APPEND-ONLY** — the backfill appends after the AY entry (`:628`); it does NOT re-order, edit, or delete prior ledger entries (the ledger is a chronological incident record).
- **FORMAT CONFORMANCE** — each entry carries the exact Source/Failure/Rule/Check format + the `## YYYY-MM-DD - Title` header + `---` separators (the AY template). A free-form note is not a ledger entry.
- **Each lesson NAMES its gate/check (Q-chron-3)** — a prose lesson without a mechanical gate is necessary-but-not-sufficient; the cross-references to the band-6 canon waves + their gate seams make each lesson load-bearing.
- **No re-derivation of the precept** — Entry 1 (the BB disease) is the LEDGER row for a lesson already canonized as the gestalt-first PRECEPT; the ledger row records the incident + cross-refs the precept, it does not duplicate or supersede the precept (the ledger and the precept are complementary — the precept is the RULE, the ledger is the cross-tranche incident record).
- **No glass-ui src/ touch** — this is a precept-submodule doc edit; the gates named (`proof:ba-gestalt`, `proof:close-battery-parity`) are byte-untouched (they already ship).
