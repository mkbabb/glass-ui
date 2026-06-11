# AZ.W-CLOSE — the terminal close: the audit, the FINAL, proof:az-final, the 3.12.0 cut

**Track:** Z (close) · **Type:** close ceremony · **Repo:** glass-ui
**Depends on:** every other AZ wave (Batch 6 — the terminal node; nothing follows it but the cut).
**Parent:** `docs/tranches/AY/waves/AY.W-CLOSE1.md` (the shipped close pattern) + `scripts/proof-ay-final.mjs` (the inherited machine).
**STATUS: SPEC**

The close is a GATE, not a narrative: `proof:az-final` aggregates the close clauses so "is AZ
done?" is one born-RED→GREEN command — the AY.W-CLOSE1 pattern inherited whole, with the AY close's
two hard-won lessons folded in: (1) the cut clause is a TWO-STATE machine from birth
(staged-or-cut — the AY gate was authored staged-only and had to be re-stated mid-cut), and (2) the
release battery's CI arms must be RUNNER-TRUTHFUL from birth (the AY close spent a day reconciling
device-absence/sibling-absence false reds — every AZ-minted gate carries its skip-by-policy
discipline at authoring time, asserted by clause 6 below).

## §0 — RE-GROUND (step-0, mandatory)

```
cat docs/tranches/AZ/PROGRESS.md                     # every wave row terminal (no live-pending)
npm run -s proof:live-verified-ledger -- --tranche=AZ # the cardinal arm (wired per §3.1)
grep -n "RATCHET_BASELINES" -A 10 scripts/proof-no-god-module.mjs
node -p "require('./package.json').version"           # 3.10.1 pre-cut
ls .changeset/                                        # the AZ changeset staged
```

## §1 — Deliverables

1. **The overfitting audit** — per `docs/audits/overfitting-audit.md` over the AZ-touched surface:
   every new artifact (the rail facility, the morph substrate, the motion-demo chassis, the luma
   observer, the Metric core) has ≥2 sites / is exported-with-consumers / is demo-private; the
   orphan scan recorded as a verdict table at
   `docs/tranches/AZ/audit/W-CLOSE-overfitting-audit.md` (the `proof:az-final` clause-7 read).
2. **FINAL.md** — the close report: the per-wave disposition table (every roster wave + its close
   state, the §2-format of the AY FINAL), the R3 closure map (all 15 items → their discharging
   waves — MIRRORED from the machine-read source `docs/tranches/AZ/audit/R3-CLOSURE-MATRIX.md`, the
   single matrix `proof:az-final` clause (2) reads; FINAL prose must not diverge from the matrix
   rows), the hinge-decision record (H1–H5 as answered), the chronic-defer roll-up (zero silent
   carries — the disposition register is the proof), greenfield voice.
   **The disposition-register completeness back-fill (B3-3):** enroll the 6 omitted AX `planned`
   rows — `W25a`/`W25b`/`W26`/`W27a`/`W27b`/`W33` — into `residual-disposition.json` as ADDRESSED
   with their discharging AY wave (`W-CSS1`=W25a/W25b, `W-GOD1`=W26, `W-LEG1`=W27a/W27b, all
   `complete`; `W33`=the AX terminal close folded into the AY close machinery). The register
   dispositioned only 14 of AX's 20 `planned` rows (W-TRIAGE.md §1 itself miscounts them as
   "fourteen"); the 6 ride forward UNRECORDED in the very register built so "no residual rides
   forward as a one-line PROGRESS cell no machine reads," and the phantom-owner gate cannot see them
   because they were never enrolled as rows. The clause-5 `proof:disposition-live` read (below)
   asserts the back-fill so the register is genuinely complete across AX→AY→AZ, not just "the AZ
   books."
3. **`proof:az-final`** — authored born-RED-able, the clause set:
   (1) per-wave green citations for the full `waves/AZ.W-*.md` roster;
   (2) the R3 closure map complete — the gate READS `docs/tranches/AZ/audit/R3-CLOSURE-MATRIX.md`
       (the binding artefact, not FINAL prose) and asserts all 15 R3 items each name a discharging
       wave AND that wave's BINDING gate ran green, AND — for every item the matrix flags
       `headless-trap: yes` (a defect whose source/structure clause could pass while the user still
       sees it) — that the wave's named π/live re-verify clause is the cited green run, never the
       source arm alone (the matrix's re-verify column is the gate's read; a source-green-only
       citation for a headless-trap item is the clause-2 RED);
   (3) budget rebaselined + `profile:budget --enforce` green;
   (4) no open `live-pending`/`(DEVELOPED)` token on the AZ PROGRESS board;
   (5) the cardinal arms green — `proof:live-verified-ledger --tranche=AZ` + the AY/AX tracker arms
       + `proof:disposition-live` (register completeness over the AZ books AND the B3-3 back-fill —
       the 6 omitted AX rows `W25a`/`W25b`/`W26`/`W27a`/`W27b`/`W33` now enrolled ADDRESSED with
       their AY discharging wave, so the register is complete across AX→AY→AZ, not just the AZ books);
   (6) RUNNER-TRUTH — every AZ-minted gate row carries either a device/sibling skip-by-policy path
       or a device-free arm, **proved by EXECUTION, not a static grep**. The grep-only form is
       EVADABLE (a comment containing `SKIP-BY-POLICY` with NO `process.exit(0)` branch in the
       control flow matches the grep while the gate still hard-REDs on a clean runner — the exact
       "trivial mutation evades the bite" trap, and grep-only is insufficient per the hard-gate
       doctrine). Clause 6 therefore RUNS each AZ-minted device/sibling-dependent gate in a
       synthesized device-absent + sibling-absent shell (the env the `proof-component-orphan`
       `siblingsPresent.length === 0` branch already models) and ASSERTS exit 0 WITH its
       SKIP-BY-POLICY line printed to stdout (an executed runner-truth, the AY lesson made
       structural). A device-free gate (no cross-repo/device dependency) is exempt by a one-line
       manifest tag, not by the grep. The static grep MAY accompany as a fast pre-filter, but the
       BINDING witness is the executed exit-0-with-skip-line, never the grep alone;
   (7) zero orphans (the audit doc's verdict);
   (8) STAGED-OR-CUT from birth — staged: version `3.10.1` + the AZ changeset present; at-cut:
       version `3.12.x` + changeset consumed + a CHANGELOG `## 3.12.0` entry; anything else (a bump
       with the changeset still staged, a cut with no CHANGELOG) is the silent-bump RED;
   (9) CLEAN-TREE (allowlisted) on the close commit.
   Self-proving: a synthetic violation per clause REDs (the born-RED witness recorded in the gate
   header).
4. **The budget rebaseline** — `profile:budget` re-baselined post-AZ (the motion demo + the morph
   substrate are demo-side; the library deltas are the rail facility + the luma observer + the
   Metric core — the per-subpath table regenerated).
5. **The release battery** — typecheck · build · verify-export-types · gen-ci-fresh ·
   `gates.mjs --run local` with every red either fixed or dispositioned IN FINAL §3 with its owner
   (the honest-triage format) · the full unit suite.
6. **The 3.11.0 cut [USER-DOMAIN]** — master merge + the `v3.12.0` tag → release.yml provenance
   publish (the 3.9.0/3.10.1 precedent); MIGRATION.md carries the AZ breaking set (the dock
   taxonomy rename table from W-DOCK-TAXONOMY + any W-PRUNE2 retires), each claim joining
   `proof:no-retired-survivor`'s `RETIRED_CLAIMS` (machine-checked).

## §2 — The cardinal arm (wired at Batch 0, consumed here)

`proof:live-verified-ledger` is tranche-parameterized (`--tranche=AY/AX` ship today). The AZ arm
(`proof:live-verified-ledger:az` → `--tranche=AZ`) + `docs/tranches/AZ/VISUAL-ALLOWLIST.json` are
wired by AZ.W-GATES at Batch 0 — every AZ visual wave closes under the capture discipline from its
FIRST batch, on the W-GATES content-hash freshness model (no treadmill). This wave only ASSERTS the
arm green; it does not wire it.

## §3 — Completion criterion + the hard gate

`proof:az-final` GREEN on the close commit (8 substantive clauses + clean-tree), the release
battery green-or-dispositioned, the cut executed at the user's word. **Gate:** `proof:az-final`,
tags `["release"]`, registered in package.json + gates.mjs + the tag-parity
`JUSTIFIED_LOCAL_ONLY` disposition (release-only, the AY precedent) at AUTHORING time — never an
orphan script (the gate-script-parity lesson).

## §4 — Scope fence

The close ceremony only — no feature work hides in the close (the AY close's gate-reconcile sprawl
is W-GATES' job THIS tranche, done at Batch 0 where it belongs). The cut is USER-DOMAIN: the
version bump, tag push, and publish run only on the user's explicit word.

## §5 — Named successor

The post-cut consumer re-pins (slides→3.11.0 if W-ADOPT ran early against 3.10.1; keyframes per
W-KF-CONSUMER) are the next tranche's W0 re-ground — recorded here, not silently carried.


## §X — Release coupling + the moved cut number (orchestrator, 2026-06-11)

- **The cut is `3.12.0`** — `3.11.0/.1/.2` were published OUT-OF-BAND by the slides-M session
  (2026-06-10 20:58–22:41Z, the deck-ship support releases; registry latest `3.11.2`). The
  staged-or-cut clause reads staged: `3.10.1` (the repo manifest, unchanged) OR at-cut: `3.12.x`.
- **The slides coupling (R5)**: slides carries ANNOTATED interim arms for R5-1..R5-4 that RETIRE on
  the first release carrying the root fixes. AT THE CUT: flag the slides session/user — slides bumps
  its lockfile (`^3.9.0` admits it) and deletes the arms the same day.
- **HOLD the cut until after the 2026-06-11 morning til-briefing session** (the user's timing
  constraint via the slides session) unless urgent.
