# AY.W-LIVE1 — the live-gate CI decision + the cardinal-gate complete-coverage / freshness finalization

**Tranche** AY (glass-ui) · **Batch** 4 (AX-close arm) · **State** OPEN · **Repo** glass-ui ·
**Type** decision-doc + gate-script (NO src/ risk) · **HEAD** `at-dock-convergence`

This wave answers the one open architectural question the cardinal-lesson infrastructure left:
**should CI re-run the 11 π/Playwright live gates server-side, or stay local-hook + static-ledger?**
— and FINALIZES the cardinal gate's depth (the W-CARDINAL-INFRA core, hardened here). The
predecessor `AY.W-CARDINAL-INFRA` minted the AY/L homes + tranche-parameterized the gate + added
`complete`-coverage / filename-match / light+dark depth. This wave (a) records the CI decision as a
precept, (b) closes the one residual `W-CARDINAL-INFRA` could NOT close — **a regression breaking a
painting surface ships CI-green if a STALE DELTA `.png` sits on disk** (the ledger checks PNG
*presence*, never PNG *freshness vs the current build*) — and (c) if Branch B is chosen, lands the
headless-GPU CI lane that re-runs the two load-bearing live gates server-side.

---

## §0 — the verified defect (file:line, source-grounded)

### D1 — the live gates are local-only; CI relies on a presence-only static ledger
`scripts/gates.mjs` tags every gate `{local, ci, release}`. At HEAD the manifest carries
**19 `local`-only gates** (`node scripts/gates.mjs --list local` minus `--list ci`); the
load-bearing subset is the **11 π/Playwright live gates** the header comment names (`gates.mjs:36-40`):

```
proof:aurora-painterly-statistics  proof:font-cascade-live  proof:substrate-paints-color
proof:tabs-unified  proof:dock-animation-live  proof:dock-orchestrator-single
proof:dock-wrap-content-driven  proof:deck-progress-rail  proof:squircle-language
proof:glass-material-demo  proof:blob-live-truth
```

Each `spawnSync(PW_BIN, …)` a Playwright run against `tests-visual/*.spec.ts`, needing a real
browser binary + a running demo dev server + (for GPU readbacks) a device backend — none of which
a clean `ubuntu-latest` runner has. So they carry `local` only (`gates.mjs:30-44` records the
rationale). CI's compensating control is the STATIC `proof:live-verified-ledger` (ci-tagged): it
asserts every `live-verified`/allowlisted-`complete` PROGRESS row references a real on-disk PNG
DELTA. **That is the only CI-side proof the live-verification HAPPENED.**

### D2 — the stale-DELTA-over-broken-surface residual (the load-bearing hole this wave closes)
`scripts/proof-live-verified-ledger.mjs` `deltaSatisfied(wave)` (LANDED at `:160-181`, with the
`W-CARDINAL-INFRA` own-surface filename-match + light/dark clauses in `ownSurfaceVerdict` at
`:132-148`) proves only that a `W<NN>-…-(light|dark).png` of the right name **exists and is a real
PNG** (magic-byte + >1024 B, `isRealPng` at `:105-113`). It NEVER asserts the PNG is a capture of
the CURRENT build. Concretely: a wave captures
its DELTA, the row flips `live-verified`, the gate goes green; a LATER commit then regresses that
painting surface (blacks the aurora clearColor, desyncs the dock clock, re-blooms the specular).
The π live gate that would catch it is `local`-only, so CI never re-runs it; the static ledger
still sees the SAME stale `.png` on disk and stays GREEN. **The exact founding chronic survives at
one further remove — the inflation moved from the `(DEVELOPED)` modifier (gate-rejected) to the
`complete` token (`W-CARDINAL-INFRA`-covered) to a stale-but-present PNG (uncovered today).**

### D3 — Branch B is technically feasible TODAY; the decision is wiring, not invention
`tests-visual/playwright.config.ts` ALREADY carries the GPU-less path: `PI_ANGLE` resolves to
`swiftshader` off-darwin (`:30-31`) and the launch args (`:34-40`) are
`--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --enable-features=Vulkan`
(the deterministic ANGLE→SwiftShader software rasterizer) plus `--enable-unsafe-webgpu` (Dawn,
`:74`); the `webServer` block (`:84-92`) self-spawns `npm run dev` and (when `CI` is set) does NOT
reuse an existing server. So a headless-GPU CI lane needs NO new harness — it needs a CI job that
installs the `tests-visual` workspace + the Chromium binary and runs the two named drivers with
`PI_ANGLE=swiftshader`. Both drivers are fail-CLOSED-when-the-workspace-is-present already
(`proof-substrate-paints-color.mjs:11-16`, `proof-dock-animation-live.mjs` AX.W00 promotion), so
they RED a broken surface and SKIP only when the workspace is genuinely absent.

---

## §1 — Goal criterion

The live-gate CI architecture is a RECORDED, defended decision (not an unexamined default), and the
stale-DELTA residual is closed: a regression that breaks a painting surface AFTER its DELTA was
captured can no longer ship CI-green. The cardinal gate's depth is finalized — it asserts the DELTA
PNG is FRESH relative to the surface it depicts, so `live-verified` means "captured AND not since
regressed," not merely "a PNG of the right name is on disk." If the decision is Branch B, a green CI
job re-runs `proof:substrate-paints-color` + `proof:dock-animation-live` server-side under
SwiftShader, and the two gates are re-tagged to reflect the new CI reachability.

## §2 — Completion criterion

The hard-gate set (§5) verifies: the DECISION doc exists and picks one branch with a defended
rationale; the freshness clause is landed in `proof-live-verified-ledger.mjs` and is born-RED
against a synthetic stale-DELTA row (and against a real flip-probe — touch a painting-surface source
after its DELTA's capture commit → the row reds); the extended self-test flags the stale-DELTA
synthetic row; and (Branch B only) the CI job runs the two named gates green under SwiftShader and
the two gates' tags + the regenerated `ci.yml` reflect it (`gates:verify-ci` + `proof:gen-ci-fresh`
stay green). Branch A's completion is the precept-record + the freshness clause (no CI job).

---

## §3 — Objective (the decision + the residual closure)

ONE decision, ONE gestalt extension of the existing engine — NOT a parallel gate, NOT a CI rewrite.

### 3.1 — DECIDE: Branch A (keep-local + ledger, recorded as a precept) vs Branch B (headless-GPU lane)

Author `docs/tranches/AY/audit/W-LIVE1-decision.md` weighing the two branches on the recorded axes,
and PICK one (the orchestrator/user ratifies; the doc records the choice + the residual that each
branch leaves OR closes):

| axis | Branch A (local-hook + static ledger) | Branch B (SwiftShader/Dawn CI lane) |
|---|---|---|
| CI cost | ~0 (the static ledger is a 30 ms FS scan) | + Chromium install + a `tests-visual` `npm ci` + 2 Playwright drivers (~2-4 min) |
| fidelity | reads the SAME software-GL SwiftShader CI would — a CI π run would NOT exercise the real-Metal path the dev box does; the SOTA artistic bar (aurora painterly) explicitly needs real-GPU (`proof:aurora-painterly-statistics` note: "real-GPU readback"), so a CI lane can only re-run the DEVICE-INDEPENDENT live gates, not the artistic ones | catches a structural regression (black substrate, desynced dock clock) server-side WITHOUT a dev box; does NOT close the artistic-fidelity bar (real-GPU still owed locally) |
| residual left | the stale-DELTA residual (D2) — closed by §3.2 regardless of branch | §3.2 still required (SwiftShader cannot judge artistic fidelity); CI re-run narrows D2 to the artistic gates only |
| precedent | the `release.sh` set + 3.9.0 publish shipped green with the live gates local-only; CI never re-ran them | NET-NEW CI surface; first π gate in CI |

**The decision is NOT pre-judged here** — the doc weighs both and the close records the picked
branch. The two candidates Branch B would re-run server-side are FIXED by the seed:
`proof:substrate-paints-color` (the shared substrate-paints-non-black floor) + `proof:dock-animation-live`
(the single-clock dock morph) — both device-INDEPENDENT (a structural-truth readback, not an
artistic-fidelity one), so SwiftShader is a faithful re-run for them. The artistic gates
(`aurora-painterly-statistics`, `font-cascade-live` width-fingerprint) stay local — SwiftShader
cannot judge pigment-true van-Gogh; the doc records this as the explicit Branch-B scope-bound.

### 3.2 — CLOSE the stale-DELTA residual (the freshness depth-header — REQUIRED on BOTH branches)

The presence-only `deltaSatisfied` bar (D2) is deepened with a FRESHNESS clause that holds on every
runner (git is present in CI — `ci.yml` does `fetch-depth: 0`). For a `live-verified`/allowlisted-`complete`
row, after the own-surface + light/dark PNGs are confirmed present, assert the DELTA is NOT STALE
relative to the surface it captures:

- The DELTA doc declares a `<!-- capture-commit: <SHA> -->` header (the commit the capture was taken
  against — the wave writes it at capture time; the `CAPTURE-PROTOCOL.md` mandates it going forward).
- The DELTA doc declares a `<!-- surface-paths: <glob,glob> -->` header naming the source files that
  PAINT the captured surface (e.g. `src/styles/glass.css, src/components/custom/dock/**`).
- The gate runs `git log -1 --format=%H -- <surface-paths>` (the last commit that touched the
  painting surface) and `git log -1 --format=%H -- <DELTA.md + its PNGs>` (the capture commit). If
  the surface's last-touch commit is NOT an ancestor of the capture commit (i.e. the surface changed
  AFTER the capture), the row REDS with reason
  `DELTA stale: surface <path> changed at <SHA> after the capture commit <SHA> — re-capture`.
- A DELTA missing the `capture-commit`/`surface-paths` headers REDS with
  `DELTA lacks the freshness headers (capture-commit + surface-paths) the protocol mandates` — so
  the freshness clause is structurally un-skippable (no header ⇒ no green).

This is the depth-header the seed names ("depth-header"): the headers are a STRUCTURED, machine-read
contract, not free prose, and the git-ancestry check is the binding freshness truth. It closes D2 on
the static-ledger path regardless of the CI branch — even Branch A's CI catches a stale DELTA.

### 3.3 — (Branch B ONLY) the headless-GPU CI lane + gate re-tags

If Branch B is chosen:
1. Add a SECOND CI job `gates-pi` to the gate manifest's CI render path: a job that runs
   `actions/setup-node`, `npm ci`, `npx playwright install --with-deps chromium` (the
   `tests-visual` workspace), then the two named drivers with `PI_ANGLE=swiftshader CI=1`.
2. Re-tag `proof:substrate-paints-color` + `proof:dock-animation-live` in `gates.mjs` with a NEW
   `ci-pi` tag (NOT the existing `ci` tag — they must NOT join the GPU-less `gates` job that would
   SKIP them). The `renderCiYaml` generator emits the `gates-pi` job from the `ci-pi`-tagged set;
   `verifyCi` + `proof:gen-ci-fresh` are extended to validate the second job's step set too (so the
   second job cannot drift either).
3. Regenerate `ci.yml` (`npm run gates:emit-ci`); `proof:gen-ci-fresh` stays green (byte-match).

If Branch A is chosen: §3.3 is NOT executed; the precept doc records WHY the local-hook + static
ledger (now freshness-deepened) is the sufficient floor, and the named successor for a future CI-π
lane is recorded (re-open AY.W-LIVE1's Branch B if the real-GPU dev-box bottleneck recurs).

---

## §4 — Files + exact edit-sites

| file | edit |
|---|---|
| NEW `docs/tranches/AY/audit/W-LIVE1-decision.md` | the DECISION doc: the §3.1 axes table, the PICKED branch, the defended rationale, the residual each branch leaves/closes, and the named successor for the un-picked branch. |
| `scripts/proof-live-verified-ledger.mjs` `deltaSatisfied` `:160-181` (+ `ownSurfaceVerdict` `:132-148`) | after the own-surface + light/dark clauses (LANDED by `W-CARDINAL-INFRA`), append the FRESHNESS clause (§3.2): parse the `<!-- capture-commit: -->` + `<!-- surface-paths: -->` headers from the DELTA; RED if absent; run the two `git log -1 --format=%H` queries (via `execSync`, `{cwd: ROOT}`); RED with the distinct `DELTA stale: …` reason when the surface's last-touch commit is not an ancestor of the capture commit (`git merge-base --is-ancestor <surface-sha> <capture-sha>` → non-zero = stale). |
| same self-test block `:237-266` | extend with a 4th synthetic evaluation beside the existing three: a `live-verified` row whose DELTA carries the freshness headers but whose `surface-paths` last-touch SHA post-dates the `capture-commit` SHA MUST flag. If unflagged, the gate exits 1 (`SELF-TEST FAILED`). The synthetic uses two known repo SHAs (a recent commit + an older ancestor) so the ancestry check is exercised deterministically. |
| `docs/tranches/AY/audit/visual/CAPTURE-PROTOCOL.md` (minted by `W-CARDINAL-INFRA`) | add the freshness-header mandate to the per-DELTA artefact list: `<!-- capture-commit: <SHA> -->` + `<!-- surface-paths: <glob,…> -->` are REQUIRED (the gate reds without them). |
| `scripts/gates.mjs` (Branch B ONLY) | add a `ci-pi` tag to the `proof:substrate-paints-color` + `proof:dock-animation-live` rows; extend `gatesFor`/`renderCiYaml`/`verifyCi`/`emitCi` to emit + validate a second `gates-pi` job from the `ci-pi` set. |
| `.github/workflows/ci.yml` (Branch B ONLY) | REGENERATED by `npm run gates:emit-ci` (never hand-edited — `proof:gen-ci-fresh` byte-matches it). |

NOT in scope (named successors): the actual re-capture of any row the freshness clause newly reds
(→ **AY.W-DELTA0**, the owed-DELTA sweep — this wave makes the staleness MACHINE-VISIBLE, it does
not back-fill); the real-GPU artistic-fidelity bar (`proof:aurora-painterly-statistics` on a Metal
dev box → **AY.W-AUR-PAINTERLY**); the slides-side analog freshness clause (the
`W-CARDINAL-INFRA` slides port inherits this extension when L.W4 re-syncs the engine — recorded as
the L.W4 successor).

---

## §5 — HARD GATE (evidence-backed)

All clauses verify by an ARTEFACT: the decision doc's presence + branch-pick, the gate's exit code +
stdout, a git-ancestry flip-probe, and (Branch B) a green CI job. No grep-only, no "API exists".

**G1 — the DECISION doc exists and picks a branch.** `docs/tranches/AY/audit/W-LIVE1-decision.md`
exists (`ls`), carries the §3.1 axes table, NAMES the picked branch in a `## Decision` heading, and
records the residual + the named successor for the un-picked branch. (Document-presence +
explicit-reconciliation artefact.)

**G2 — the freshness clause is born-RED against a synthetic stale DELTA (self-test).** The script's
self-test block (`:112+`) evaluates a 4th synthetic row: a `live-verified` row whose DELTA carries
freshness headers but whose `surface-paths` last-touch SHA post-dates the `capture-commit` SHA. The
script exits 1 with `SELF-TEST FAILED` if that row is NOT flagged. Proven every invocation (the
self-test runs unconditionally) AND by the negative-probe: comment out the freshness clause → the
script's own self-test reds (the RED-witness inverse, the AX.W62 pattern). Captured: the self-test
stdout line showing the stale synthetic row flagged.

**G3 — the freshness clause reds a REAL regressed surface (the flip-probe — the binding bite).**
Pick any green `live-verified` AX row with an own-surface DELTA (e.g. W45 dock). Write a transient
`<!-- capture-commit: <an-OLD-ancestor-SHA> -->` + `<!-- surface-paths: src/styles/dock/** -->` into
its DELTA, where a LATER commit demonstrably touched `src/styles/dock/**`. Run
`npm run proof:live-verified-ledger:ax` (the W-CARDINAL-INFRA §4a non-blocking AX backlog tracker):
the gate REDS and the violation list CONTAINS that row's
`DELTA stale: src/styles/dock/** changed at <SHA> after the capture commit <SHA> — re-capture`
reason (alongside the 6 born-RED backlog rows — the freshness reason is the one this probe asserts).
Revert the probe. Captured to `docs/tranches/AY/audit/visual/W-LIVE1-DELTA.md` as the stale-DELTA
bite proof (the gate-output JSON `status:fail` naming the stale row). This is the direct artefact
that the D2 residual is CLOSED — a regressed surface over a present-but-stale PNG now REDS where it
shipped green before.

**G4 — no false-RED on a FRESH own-surface DELTA (no regression).** A `live-verified` AX row whose
DELTA carries the correct `capture-commit` (the commit the PNG was actually captured against) and
`surface-paths` (and whose surface has NOT changed since) stays GREEN. Captured: a diff of the AX
violation list pre/post the freshness clause — it grows ONLY by genuinely-stale rows + the G3 probe,
never by a fresh own-surface DELTA. (For the AX backfill window where existing DELTAs predate the
header mandate, the doc records the grace boundary: rows whose DELTA lacks the headers are the
AY.W-DELTA0 re-capture set — the gate reds them, which is the correct born-RED signal, mirroring
`W-CARDINAL-INFRA`'s 6-row born-RED close-state.)

**G5 (Branch B ONLY) — a green CI job re-runs the two named gates server-side under SwiftShader.**
The regenerated `ci.yml` carries a `gates-pi` job that installs Chromium + the `tests-visual`
workspace and runs `PI_ANGLE=swiftshader CI=1 npm run proof:substrate-paints-color` +
`… proof:dock-animation-live`, both exiting 0 on the current (good) surface. Proven by a green
Actions run (the artefact = the run URL + the two step logs showing the fail-CLOSED arm executed,
NOT skipped — `workspacePresent() === true`). `npm run gates:verify-ci` + `npm run proof:gen-ci-fresh`
both green (the second job is in the manifest's `ci-pi` set; the YAML byte-matches the generator).
Captured in `W-LIVE1-DELTA.md`: the run URL + the two non-skip step logs.

**The single binding condition:** the DECISION doc picks a branch with a defended rationale (G1);
the freshness clause is self-test-proven (G2) and reds a real regressed-surface-over-stale-PNG case
(G3 — the D2 residual EXPLICITLY closed) while not false-redding a fresh DELTA (G4); and IF Branch B,
a green CI job re-runs `proof:substrate-paints-color` + `proof:dock-animation-live` server-side under
SwiftShader with the fail-CLOSED arm executing, not skipping (G5). The `W-LIVE1-DELTA.md` carries
the stale-DELTA bite JSON + the negative-probe self-test proof + (Branch B) the CI run URL.

**Born-RED is the correct signal for the freshness clause at this wave's close.** Closing the gate
SEES any stale/header-less DELTA (a RED on a stale AX row is CORRECT — the staleness is now
machine-visible); re-capturing those rows green is **AY.W-DELTA0**'s job. A gate that stays green
over a stale DELTA at this wave's close would be the WRONG signal — it would mean the residual is
still open.

---

## §6 — Named successors / out-of-scope edges

- Any row the freshness clause newly reds (stale or header-less DELTA) → **AY.W-DELTA0** (the owed-DELTA
  re-capture sweep, Batch 4). This wave makes staleness machine-visible; it does not back-fill.
- The real-GPU artistic-fidelity bar (`proof:aurora-painterly-statistics` on Metal) → **AY.W-AUR-PAINTERLY**.
- The slides-side freshness clause (the `W-CARDINAL-INFRA` port inherits this when L.W4 re-syncs the
  engine) → **L.W4** (the slides gate-architecture wave).
- `proof:ay-final` (Batch 5, **AY.W-CLOSE1**) requires `proof:live-verified-ledger:ay` GREEN against
  the AY paths (the freshness clause included) as a close clause.

## §7 — Cross-references

- `docs/tranches/AY/audit/hardening/H-cardinal.md` (the four holes; §7 convergence criterion #5 —
  the depth deepening; §9 waveSpecInputs).
- `docs/tranches/AY/audit/hardening/H-convergence.md §1 F7` (the dual-arm obligation: a green source
  gate over a still-broken live render is NOT done — the freshness clause operationalizes it on the
  static path).
- `docs/tranches/AY/waves/AY.W-CARDINAL-INFRA.md` (the predecessor: parameterize + complete-coverage
  + filename-match + light/dark depth; THIS wave adds the freshness depth-header + the CI decision).
- `scripts/proof-live-verified-ledger.mjs` `:160-181` (`deltaSatisfied`) / `:237-266` (the self-test
  block) — the engine extended with the freshness clause.
- `scripts/gates.mjs:30-44` (the local-only live-gate rationale) + the `gatesFor`/`verifyCi`/
  `renderCiYaml`/`emitCi` Branch-B render path.
- `tests-visual/playwright.config.ts:30-40,84-92` (the SwiftShader/Dawn backend + the self-spawning
  `webServer` — Branch B's already-present harness).
