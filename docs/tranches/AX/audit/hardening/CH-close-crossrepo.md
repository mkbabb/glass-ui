# CH-close-crossrepo — adversarial red-team of the close + cross-repo band (W33, W34, W35, W41)

**Verdict: WEAK** (close machinery is sound in spec but BLOCKED by a live RED-CI keystone that no wave currently sequences before the publish; W34's required artefact COLLIDES with an existing file; W41 + W35 wave docs are STALE on facts that already closed at the sibling source).

**Base:** `at-dock-convergence @ 89edffc` (HEAD); master @ `c6244e2` (3 docs-only commits behind HEAD); published `3.8.0` (tag `v3.8.0` IS on master). All measurements LIVE re-confirmed 2026-06-09.

---

## THE HEADLINE FINDING — CI IS RED RIGHT NOW (master AND branch), and the close cannot publish over it

This is the single most load-bearing thing the close band is missing. Every wave doc treats the close as "author the machinery, stage the changeset, ride `release.yml`" — but **the `gates` CI job is FAILING on every push to master and every PR**, and the failing gate (`profile:budget`) is ALSO in the `release` gate matrix (`scripts/gates.mjs:42`, tagged `["local","ci","release"]`). So a future `v3.9.0` tag push fails at `release.yml`'s `release gate matrix (gates.mjs --run release)` step. The publish keystone is BLOCKED, not staged-and-ready.

Live evidence:
- `gh run list --branch master`: last 3 master-push CI runs = **`failure` / `failure` / `failure`** (runs 27176067942, 27174081273, 27171994935).
- `gh run list --branch at-dock-convergence`: last 5 PR CI runs = all **`failure`**.
- The failing step is `gates → profile:budget` (`gh run view 27159920209`): `[FAIL] dist/styles/index.css — raw 555070 / 548000 (101.3%); gzip 144852 / 140000 (103.5%)`. The CSS bundle has grown PAST even the "SEVENTH conscious lift" (`scripts/profile-bundle.mjs:157-163`, gzip 140000 / raw 548000).
- The breach was present at the 3.8.0/master tip — the 3 commits HEAD-ahead-of-master are DOCS-only (W43/W54/W56 planning), so it did not arrive in this branch; **3.8.0 itself shipped over a breaching budget**, which means `release.yml` either did not enforce it at 3.8.0 OR the budget grew between the 3.8.0 cut and now. The `f2fc614 fix(release-gates): unblock the 3.8.0 publish` commit is the smoking gun — the 3.8.0 publish was MANUALLY unblocked past a gate failure.

**Why this matters for the close:** MASTER-PLAN Batch 8 sequences "W27a/b carves BEFORE the budget rebaseline," and Batch 9 (W33) does the publish. But the budget is breaching NOW, W27a/b are `planned`, and W54 (MAXIMAL glass-first, the ROOT) + W56 (squircle) + W55 (adaptive-glass) will ADD MORE CSS. The close band has NO wave that owns "rebaseline the CSS budget after the glass-first CSS lands AND before the 3.9.0 tag." The budget is going to grow further, and the publish gate will stay RED. This is the chronic **budget/gate drift** class the prompt named, live and unowned.

---

## CHALLENGE 1 (W33) — the close machinery is 100% UN-STARTED; the wave doc's own RED witnesses all HOLD, plus the publish is gate-BLOCKED, not staged

LIVE-confirmed ABSENT at HEAD: `scripts/proof-ax-final.mjs`, `docs/tranches/AX/FINAL.md`, `scripts/proof-carry-closure.mjs`, `scripts/proof-gate-fleet-registered.mjs`, `scripts/proof-prod-validation.mjs`, `docs/tranches/AX/archive/`. `PROGRESS.md` exists but is the live status table, NOT the W33-authored close artefact with per-wave green-run citations.

- **Orphan proof scripts: 11 (not 12).** Live sweep `for f in scripts/proof-*.mjs …` returns 11: `affordance-contrast, composable-return-types, consumers-static, datatable-split, dock-big-dock, dock-controls-split, frostshader-deleted, glass-panel-tiers, resolution-contract, supports-post-task-wired, theme-style`. The wave doc says 12 and the W-close-crossrepo inventory says 11 — the inventory is correct (`proof:deck-progress-rail` was registered by W24 since the spec was authored). W33's spec must be re-grounded to 11 or it births a false witness.
- **`proof:ax-final` PRIOR-CLOSE-META-ASSERT has a BROKEN lineage to assert against.** `gates.mjs` `proof:au-final` note says "AV is the successor (proof:av-final is its close gate)" — but `proof:av-final` ALSO does not exist. The AU→AV→AX close-gate chain is broken; W33's "assert the predecessor existed" assertion has no real predecessor close gate to point at (AU's `proof:au-final` exists; AV's never did). W33 must reconcile the dangling `av-final` reference, not just author `ax-final`.
- **The publish is BLOCKED, not "staged-and-ride."** `proof:ax-final`'s STAGED-NOT-PUBLISHED assertion (HardGate 6h) requires a `.changeset/*.md` — none exists (`.changeset/` has only README.md + config.json). More fundamentally, the §21 end-state gate (`proof:prod-validation`, HardGate 8) asserts `npm view == 3.8.0` + `slides.friday.institute` 200 — but W33's CommitPlan step 9 publishes **3.8.0**, which is ALREADY published. The whole publish leg of W33 is mis-versioned: the AX cut already shipped as 3.8.0 from `c075467` on master. The close's "cut 3.8.0" is a no-op; the real close needs a **3.9.0** cut (MASTER-PLAN line 40 correctly says 3.9.0; the W33 wave doc still says 3.8.0 throughout — a version-drift the close cannot pass its own `proof:ax-final` FINAL gate with).

---

## CHALLENGE 2 (W34) — the required §16 receiver COLLIDES with an existing file of the same name; W34's RED witness 1 is FALSE at HEAD

W34's RED witness 1 (`AX.W34:28`) asserts "`coordination/CONSTELLATION.md` does NOT exist." **It DOES exist** (`docs/tranches/AX/coordination/CONSTELLATION.md`, 3712 bytes) — but as the W17→W30/W31 band-E slides-adoption handoff, NOT the §16 per-consumer receiver W34 mandates. This is a real, unadjudicated **artefact-name collision**:

- The existing file opens `# Constellation cross-repo handoff — AX.W17 → AX.W30/W31 (slides adoption)` and is the W17 token/warp seam landing record.
- W34 wants the SAME path to be the §16 receiver: a per-consumer HEAD/branch/`git status --porcelain` table for the 10 named repos + the §16.3 idiom census.
- W33's `proof:carry-closure` reads "W34's `{receiver-wave, close-gate}` ledger" as its PRIMARY INPUT — but that ledger lives in a file W34 is told to "author" while it already exists with different contents.

The wave doc's disjointness note says "W28 OPENS this doc (band-K + gate-0); W34 authors the §16-receiver body" — but W28 is `planned`/NOT-STARTED, so the scaffold W34 appends to does not exist, and the file that DOES exist is W17's. **Nobody owns reconciling the W17 band-E artefact INTO the multi-section receiver.** If W34 blindly rewrites it, it clobbers the W17→W30 slides handoff (a real, live cross-repo seam record). If it appends, the file has a band-E preamble that contradicts its own title. This is an INCOHERENT seam that will silently drop either the W17 record or the §16 census.

**Worse — W34's census is STALE.** Per `R-deferred-crossrepo.md` (LIVE 2026-06-08), the W34 idiom census assumes facts that already closed at the sibling source:
- keyframes-4 `file:`-link `npm ci` breaker → CLOSED (kf declares glass-ui as `~3.5.1` optionalDep, 0 `file:` links).
- E2 value-0.11 cap → CLOSED (kf 4.1.0 deps value `^0.11.1`).
- `getTimingFunction` drop → MOOT (restored in kf 4.x).
- kf dock-spring leg → already green at `~3.5.1` (the W35 `^3.4.0` +16.3% baseline is stale; live is `~3.5.1` +4.5%).

W34's receiver, if authored from the charter as-written, will re-launder 3 already-closed handoffs as open born-RED carries — the exact "phantom-owner re-defer" anti-pattern W33 is supposed to NAME. The census MUST be re-grounded to the live sibling state first.

---

## CHALLENGE 3 (W35) — the keyframes prune DAG has a STALE baseline AND a precondition that has not landed

- **Stale dock-spring baseline.** `AX.W35:55-62` measures `proof:dock-morph-settled` at `+16.3%` against the `^3.4.0` pin. The LIVE pin (`R-deferred-crossrepo.md`, verified) is `~3.5.1` with the retune PUBLISHED — the gate is GREEN (+4.5% ≤ +6%). The W35 born-RED witness 3 is a SATISFIED witness; the leg is a clean `3.5.1→AX` bump, NOT a re-fix. W35 born-RED on a false RED is a self-defeating gate (it would "green" trivially because the predecessor already shipped).
- **The W19/W20 prune precondition is HALF-landed.** `header-ribbon/`, `glass-panel/`, `useTokenColor.ts` are STILL in the tree + subpath-exported (10 package.json hits). BUT: the R-deferred inventory's framing that "W19 over-claimed" is itself slightly wrong — commit `509aed8` (W19) excised glass-carousel + disco-glyph + glyph-face and EXPLICITLY says "keep useTokenColor (constellation consumer)." header-ribbon/glass-panel were never IN W19's scope; they're routed to **W20** (`AX.W35` dependsOn W19 AND W20; W20 owns the GlassPanel/EasingCurveCanvas migration). So the real gap is: **W20 is `planned`/NOT-STARTED**, and W35's publish-precondition (the prune lands + kf greens `proof:off-{headerribbon,glasspanel}`) cannot complete until W20 lands. The status-inflation is on W19's "DEVELOPED" tag (it pruned 3 of 5 named families), not a fabricated claim — but the SEQUENCING GAP (W20 unbuilt → W35 blocked → the prune cannot publish) is real and the close band does not flag it as a blocker on the publish path.

---

## CHALLENGE 4 (W41) — the wave is STALE on 3 of its 4 witnesses; only the dts-watch keystone + the parity gate survive

W41's 4 RED witnesses, LIVE re-diagnosed:
1. **`build:watch` dts-stale — HOLDS.** `package.json` `build:watch: "vite build --watch"` is JS-only (no `emit-types` arm; contrast `build: "vite build && npm run emit-types"`). This is real and is the value.js C-DTS root cause. KEEP.
2. **devDep↔peer parity — HOLDS.** devDeps `keyframes ^2.2.0` / `value ^0.10.0`; peers admit `^4.0.0` / `^0.11.0`. KEEP (bump value to `^0.11.0`).
3. **keyframes-4 `file:`-link republish handoff — STALE/CLOSED.** kf declares glass-ui `~3.5.1` optionalDep (registry range), 0 `file:../glass-ui`. The handoff W41 is told to "declare as born-RED" is ALREADY DONE at the publisher. DROP.
4. **E2 value-0.11 cap handoff — STALE/CLOSED.** kf 4.1.0 deps value `^0.11.1`; the cap is GONE. DROP.

PLUS the `proof:peer-conformance` orphan, LIVE-confirmed BROKEN two ways:
- **0 hits in `scripts/gates.mjs`** (untagged; the package.json `scripts` entry at :552 is real but the gate is NOT in ci OR release — `grep peer-conformance .github/workflows/ scripts/release.sh` = 0 hits, fully orphaned, runs NOWHERE).
- **STALE-pinned**: `scripts/proof-peer-conformance.mjs:32` pins `"@mkbabb/keyframes.js": "4.0.0"` while kf published is **4.1.0**, and the script header carries now-false "non-resolvable" / "dual-instance value-cap" prose. Registering it ci/release as-is would gate against a phantom 4.0.0.

So W41's real residue is ~half its charter: the dts-watch arm (keystone), the parity gate + value devDep bump, the `proof:peer-conformance` RE-PIN (4.0.0→4.1.0) + REGISTER, and the FORWARD-only export-stability gate. The two cross-repo handoffs are dead. W41 born-RED on 4 witnesses when 2 are already satisfied is the same self-defeating-gate class as W35.

---

## CHRONIC DEFERRALS (with slip-history)

1. **The close that never runs — the AW→AX recurrence.** AW's close renumbered W18→W21→W27→W33 across bands then died on the session-limit halt (`MEMORY project_aw_session_limit_halt`); the tranche shipped 3.4.0→3.6.0 WITHOUT a `proof:aw-final`, FINAL.md, or PROGRESS.md. AX W33 is the explicit antidote (enumerated dependsOn, born-RED close gate) — but at HEAD it is 100% un-started, and the publish version it targets (3.8.0) ALREADY SHIPPED, so the close as-specced cannot even cut a new version. The close is, again, the LAST thing and the thing most at risk of never running. **Slip count: 2 tranches (AW never ran; AX un-started + mis-versioned).**

2. **ci.yml / verify-ci drift — the gate that the gate's-own-header warns about.** `gates.mjs:4-8` literally documents the failure mode: "`ci.yml` ran 11, `release.sh` ran 4 … a local `proof:all` went GREEN while CI was RED (the aggregate lied)." That is happening NOW: 20 ci-tagged gates are MISSING from ci.yml (`gates:verify-ci` exits 1), AND ci.yml wires `gates:verify-ci` so the drift makes CI itself RED. The W-close inventory CLAIMED `verify-ci` is "fail-OPEN, exits 0" — **FALSE; it exits 1 and is wired into CI.** The drift recurs every band that adds a gate without a ci.yml row. **Slip count: every band since the gate manifest existed; the inventory's own measurement of it was wrong.**

3. **Budget/gate drift over the publish path.** The CSS budget breached at the 3.8.0 cut and was MANUALLY unblocked (`f2fc614`). The same breach is live now (103.5% gzip) and W54/W55/W56 will grow it further. No close-band wave owns "rebaseline the CSS budget after the glass-first CSS, before the 3.9.0 tag." MASTER-PLAN sequences the rebaseline in Batch 8 (W27 carves) but the publish-blocking breach is live in Batch 9's path. **Slip count: 2 (3.6.0 re-base, 3.8.0 manual-unblock); poised for a 3rd at 3.9.0.**

4. **Provenance / master-merge.** MASTER-PLAN line 51 says master "IS now FF'd to the branch, so resolved going forward" — but master is 3 commits BEHIND HEAD (the W43/W54/W56 docs commits). 3.8.0's `v3.8.0` tag IS on master (good), but the close's eventual 3.9.0 cut must re-merge `at-dock-convergence → master` and re-tag from master. The "resolved" claim is a PROGRESS-vs-reality inflation. **Slip: recurs every time HEAD advances past the last merge.**

---

## HARDENING ACTIONS (planning — no code)

1. **MINT a publish-readiness wave (or extend W33 step-0) that drives CI GREEN BEFORE the close.** Concretely: (a) rebaseline the CSS budget AFTER W54/W55/W56 land (the EIGHTH conscious lift, sized to carry glass-first + adaptive-glass + squircle CSS) — this must be the LAST act before the 3.9.0 tag, not Batch 8; (b) fix the 20-gate ci.yml drift (add the rows OR re-tag local-only per the π-gate-in-CI decision) so `gates:verify-ci` greens; (c) prove a GREEN `gates` job on master push before the changeset. The close cannot ride `release.yml` while `profile:budget` (release-tagged) is RED.

2. **RE-VERSION the entire W33 publish leg 3.8.0 → 3.9.0.** Every "cut 3.8.0 / npm view == 3.8.0" in W33 + the `proof:prod-validation` gate is wrong — 3.8.0 already shipped. Amend the wave doc, the `proof:ax-final` STAGED-NOT-PUBLISHED bump target, and `proof:prod-validation`'s registry assertion to 3.9.0. (PROGRESS/MASTER-PLAN already say 3.9.0; the W33 wave doc did not get the memo.)

3. **ADJUDICATE the CONSTELLATION.md artefact collision in writing (a W34 amendment).** Decide: rename the existing W17 band-E file to `coordination/CONSTELLATION-band-E.md` (or fold it as a §-section) and author the §16 receiver as the canonical `CONSTELLATION.md`, OR give the §16 receiver a distinct name and re-point W33's `proof:carry-closure` input path. Without this, the receiver authorship silently clobbers the W17→W30 slides seam record OR contradicts its own title. RATIFY before W34 drives.

4. **RE-SCOPE W41 + W35 + W34 to the live sibling state (a shared "re-ground" amendment).** Run a prototype: re-diagnose every cross-repo witness against the PUBLISHED siblings (kf 4.1.0, value 0.11.1) and DROP the 3 closed handoffs (kf `file:`-link, E2 cap, getTimingFunction symptom) + re-ground the W35 dock-spring baseline to `~3.5.1`/+4.5%-green. Author each wave born-RED only on the witnesses that ACTUALLY hold (dts-watch, parity, peer-conformance re-pin+register, forward export-stability). A gate born-RED on a satisfied witness greens trivially and certifies nothing — the precise gate-ORACLE failure W00 exists to prevent.

5. **Fix `proof:peer-conformance` BEFORE registering it (a W41 sub-step).** Re-pin `scripts/proof-peer-conformance.mjs:32` `4.0.0 → 4.1.0`, strike the false "non-resolvable" prose, THEN register ci/release. Registering the stale gate as-is gates the release against a phantom keyframes 4.0.0.

6. **Flag W20 as a HARD blocker on the W35 publish path in the close ledger.** W20 (header-ribbon/glass-panel prune) is un-built; W35's publish-precondition cannot complete until W20 lands + kf greens its off-gates. The close band must name W20 as the sequencing predecessor of the prune-publish, not bury it inside W35's dependsOn.

7. **Re-merge `at-dock-convergence → master` and re-tag from master for 3.9.0.** Correct the MASTER-PLAN "resolved going forward" claim — master is 3 commits behind; the provenance-clean 3.9.0 publish requires the merge + a master-sourced tag, per the constellation's main-sourced-publish rule.

---

## FILES GROUNDING THIS FINDING

- `scripts/profile-bundle.mjs:157-163` (the breaching CSS budget 548000/140000), `scripts/gates.mjs:4-8` (the aggregate-lies header), `:42` (profile:budget release-tagged).
- `.github/workflows/ci.yml:349-350` (verify-ci wired into the RED gates job), `:20` (push: master).
- `scripts/proof-peer-conformance.mjs:32` (stale 4.0.0 pin), `package.json:552` (orphan scripts entry), `package.json` build:watch (JS-only).
- `docs/tranches/AX/coordination/CONSTELLATION.md` (the W17 band-E file occupying W34's required §16-receiver path).
- `docs/tranches/AX/audit/inventory/R-deferred-crossrepo.md` (the live-re-diagnosis showing 3 of 4 W41 handoffs closed-at-publisher).
- CI evidence: `gh run list --branch master` (3× failure), `--branch at-dock-convergence` (5× failure); `gh run view 27159920209` (profile:budget FAIL).
- git: `v3.8.0` tag on master; master 3 commits behind HEAD (W43/W54/W56 docs); W19 commit `509aed8` (excised glass-carousel/disco-glyph/glyph-face, KEPT useTokenColor; header-ribbon/glass-panel → W20).
