# AY.W-PUB1 — The publish hinge: master-merge + the `v3.10.0` tag → release.yml gated provenance publish

**State:** OPEN · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** E (the AX close, finished under AY) · **Batch:** 5 (the terminal AY node)
**Type:** USER-DOMAIN hinge (no source edit by an agent; a version bump + a master-merge + a `git push` of a `v*` tag — every byte of which the orchestrator/user executes)
**Depends on:** `AY.W-CLOSE1` (the `proof:ay-final` STAGED-NOT-PUBLISHED readiness gate must be GREEN — it asserts the AY cut is coherent, the FINAL is written, the budget rebaselined, and `package.json` is STILL `3.9.0`; W-CLOSE1 §0 clause 8); transitively every AY impl wave landed green + DELTA-captured
**Blocks:** the slides re-pin (`L.W-ADOPT` — the caret `^3.9.0` becomes the EXACT published pin) → `L.W5` deploy. This is **HINGE 1** on the cross-repo critical path (EXECUTION-DAG E7 / E15).

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact. **This wave has NO agent-executable edit-site.**
> Per the hardened agent git clause (K W0) agents NEVER stage/commit/stash/checkout/reset/restore
> — and this wave is ENTIRELY git-index + remote-push work, so it is fully USER-DOMAIN. An agent's
> only role is the PRE-FLIGHT readiness assertion (run `proof:ay-final`, confirm the version
> arithmetic, print the exact command sequence the user runs) and the POST-PUBLISH verification
> (read `npm view`, read the Actions run conclusion). The agent NEVER cuts the tag, NEVER bumps
> the version on a branch it pushes, NEVER pushes master, NEVER pushes the tag. The publish is the
> gated provenance publish from `release.yml` (per MEMORY `project_glassui_340_published`: push the
> `v*` tag, release.yml does the gated provenance publish from master).

---

## §0 — Goal criterion + completion criterion (paired)

**Goal criterion.** The perfected AY line is PUBLISHED. The 31-commit `at-dock-convergence` lane
(every Band A/B/F component perfection + the close infrastructure) lands on `master`, and a single
minor-version cut (`v3.10.0`, the next minor over the live `3.9.0`) ships to npm with provenance
attestation. The published version becomes the exact re-pin target the slides repo consumes — the
caret `^3.9.0` in `slides/package.json` is replaced by the precise published pin in `L.W-ADOPT`, so
the constellation-consume (the engagement headline "exemplar to KILL") finally has a real, resolved
library version to swap onto. This is the leg that has slipped slides H→I→K→L (4 tranches) because
the publish it depends on was never sequenced; W-PUB1 IS that sequenced publish.

**Completion criterion.** The single hard gate below verifies by three artefacts read AFTER the
user-domain push: (1) `git merge-base --is-ancestor <AY-cut-sha> origin/master` exits 0 — master
CONTAINS the AY cut (not the stale `c6244e2` merge-base it sits at today); (2) `npm view
@mkbabb/glass-ui version` == `3.10.0` AND `npm view @mkbabb/glass-ui dist-tags.latest` == `3.10.0`
— the AY cut is the published `latest`; (3) the `release.yml` workflow run for the `refs/tags/v3.10.0`
ref concluded `success` AND its published artefact carries an npm provenance attestation (the
`gh run view` conclusion + the npm provenance badge / `npm view … --json` `dist.attestations`).
The pre-flight `proof:ay-final` is GREEN before any of this (the readiness precondition). Born state:
master is `c6244e2` (docs-only), `npm view … version` is `3.9.0` — the gate is RED until the
user-domain push lands and the CI publish completes.

---

## §1 — The verified defect (file:line / repo-state)

### D1 (master is the stale docs-only merge-base) — the 31-commit AY line is NOT on master.

```
$ git rev-parse master                      → c6244e2731ac49c2145a9098e07676a85dc7766d
$ git merge-base at-dock-convergence master → c6244e2731ac49c2145a9098e07676a85dc7766d   (IDENTICAL)
$ git rev-list --count master..at-dock-convergence → 31
$ git rev-list --count at-dock-convergence..master  → 0
```

`master` sits exactly at the merge-base `c6244e2` ("docs(AX): user-decided the 3 foundational
hinges …") — a DOCS-ONLY commit. The entire AY perfection line (the 31 commits of
`at-dock-convergence`, plus everything the AY impl waves add on top) is unmerged. The GOLDEN Batch 5
terminus ("provenance-clean master-merged" — EXECUTION-DAG:156) is unmet: master carries none of the
AY cut. **GREEN after:** master is an ancestor-superset of the AY cut (D1's `merge-base --is-ancestor`
exits 0).

### D2 (the published version is `3.9.0`; the slides pin is a caret that would silently auto-resolve).

```
$ node -p "require('./package.json').version"  → 3.9.0
$ npm view @mkbabb/glass-ui version            → 3.9.0
$ npm view @mkbabb/glass-ui dist-tags          → { latest: '3.9.0' }
$ grep '@mkbabb/glass-ui' /Users/mkbabb/Programming/slides/package.json
                                               → "@mkbabb/glass-ui": "^3.9.0"   (line 25)
```

The live published `latest` is `3.9.0`, the last tag is `v3.9.0` (`aa081e3`, dated 2026-06-09).
The AY perfection (perfected constellation + warp + the SOTA component body) is NOT published — so
slides has no library version to swap onto. Worse, the slides pin is the CARET `^3.9.0`, not an exact
pin (H-slides-adopt-deploy F7). A caret SILENTLY auto-resolves the next minor on `npm ci` — the
exact stale-dist / surprise-resolution hazard the cross-repo contract-v2 (CLAUDE.md invariant 30)
exists to prevent. The publish-version arithmetic — `3.9.0` → the next minor `3.10.0` — and the
re-pin step that consumes it are the load-bearing edge E7. **GREEN after:** `npm view … version`
== `3.10.0`; the slides re-pin (L.W-ADOPT) then replaces `^3.9.0` with `3.10.0`.

### D3 (the publish is USER-DOMAIN; no agent may execute it) — the index/push surface is forbidden to agents.

The hardened agent git clause (K W0 / `AGENT_DISPATCH_TEMPLATE.md`) forbids agents from staging,
committing, checking out, or pushing. This wave is ENTIRELY that surface — a version bump committed
on the AY line, a master-merge, and a `git push` of a `v*` tag. There is no agent edit-site. The
`release.sh` flow itself enforces a clean tree + tag==package.json version (`scripts/release.sh:54-71`),
and `release.yml` re-verifies tag==package.json before publishing (`.github/workflows/release.yml:39-43`).
**GREEN after:** the orchestrator/user (not an agent) runs the §3 command sequence; the agent records
the pre-flight + post-publish artefacts only.

---

## §2 — Objective

Publish the perfected AY line as `v3.10.0` with npm provenance, via the established gated path: bump
the version to `3.10.0`, merge the AY line to `master`, push the `v3.10.0` tag → `release.yml` runs
the `gates.mjs --run release` matrix and publishes with `--provenance` from CI. The published
`3.10.0` becomes the exact re-pin target slides consumes in `L.W-ADOPT`. NO `release.yml` edit is
expected (the workflow already does the right thing — §4 confirms it). The version cut is the next
MINOR (`3.10.0`) because the AY body is feature-bearing (perfected components + new export seams),
not a patch; this matches the DAG's stated arithmetic (EXECUTION-DAG:22, :162) and the precepts'
clean-break, greenfield-no-meta posture (no `-beta`/`-rc` ceremony, no migration-shim version).

This wave does NOT design or implement any component — it is the terminal publish hinge. Its entire
substance is the readiness gate (W-CLOSE1's `proof:ay-final` green), the version arithmetic, and the
two artefact reads that prove the publish landed.

---

## §3 — The command sequence (USER-DOMAIN; agent prints, user runs)

The agent's deliverable for the execution step is to PRINT this sequence with the exact AY-cut SHA
filled in, then HALT for the user. The agent runs NONE of steps 2–6.

```bash
# ── 0. PRE-FLIGHT (AGENT may run — read-only + the readiness gate) ──────────────
git rev-parse at-dock-convergence                 # the AY cut SHA (record it)
npm run proof:ay-final                             # MUST be GREEN (W-CLOSE1 readiness gate)
node -p "require('./package.json').version"        # MUST still read 3.9.0 (staged-not-published)
npm view @mkbabb/glass-ui version                  # confirm 3.9.0 is the live latest

# ── 1. VERSION BUMP (USER) — on the AY line, the only source mutation ───────────
#    Bump 3.9.0 → 3.10.0. A bare `npm version` writes package.json + cuts a commit;
#    --no-git-tag-version lets the user fold it into the merge commit if preferred.
npm version minor --no-git-tag-version             # package.json → 3.10.0
git commit -am "release: glass-ui 3.10.0 (AY cut)" # the version-bump commit on the AY line

# ── 2. MASTER-MERGE (USER) ──────────────────────────────────────────────────────
git checkout master
git merge --ff-only at-dock-convergence            # ff-only: master is the merge-base, no divergence
#    (master sits exactly at the merge-base c6244e2 — the merge is a fast-forward;
#     `rev-list --count at-dock-convergence..master` == 0 proves no master-only commits)

# ── 3. TAG + GATE (USER) — release.sh verifies clean-tree + version + gate matrix ─
bash scripts/release.sh v3.10.0                    # asserts pkg==v3.10.0, runs gates.mjs --run release,
                                                   #   smoke-checks dist/index.d.ts, cuts the annotated tag

# ── 4. PUSH (USER) — the publish trigger ─────────────────────────────────────────
git push origin master                             # land the AY cut on master
git push origin v3.10.0                            # the v* tag → release.yml gated provenance publish

# ── 5. POST-PUBLISH VERIFY (AGENT may run — read-only) ───────────────────────────
gh run list --workflow=release.yml --limit 1       # the run for refs/tags/v3.10.0
gh run view <run-id>                               # conclusion == success
npm view @mkbabb/glass-ui version                  # == 3.10.0
npm view @mkbabb/glass-ui dist-tags                # latest == 3.10.0
```

**HARD BOUNDARIES (never-agent-executed, named explicitly):** the `npm version` bump, the
`git commit`, the `git checkout master`, the `git merge`, the `bash scripts/release.sh` tag-cut, and
BOTH `git push` invocations are USER-DOMAIN. The `NPM_TOKEN` repository secret + the OIDC id-token
(`release.yml` provenance auth) are CI-domain and never touch a developer machine. An agent that
finds itself about to run any step 1–4 command has violated the K W0 clause and must HALT.

---

## §4 — release.yml is correct as-shipped (NO edit expected) — the verification

`.github/workflows/release.yml` already encodes the exact gated provenance publish this wave needs;
the agent VERIFIES it, does not edit it:

- **Trigger** (`release.yml:18-21`): `on: push: tags: ["v*.*.*"]` — a pushed `v3.10.0` tag fires it;
  push/PR never reach the publish step.
- **Version coherence** (`release.yml:39-43`): re-asserts `${GITHUB_REF_NAME#v}` == `package.json`
  version — `v3.10.0` requires `package.json` already at `3.10.0` (the §3 step-1 bump), so a stale
  package.json fails the tag BEFORE publish.
- **Gate matrix** (`release.yml:44-46`): `node scripts/gates.mjs --run release` — the SAME manifest
  filter `release.sh` runs (inv-θ: local==ci==release derive from ONE manifest); a stale unit test or
  a dropped proof:* gate fails the release before the publish attempt (`gates.mjs:52` note — the
  3.9.0 publish was blocked at the publish step by exactly this class; the matrix now runs it early).
- **Provenance publish** (`release.yml:47-50`): `npm publish --access public --provenance` with
  `permissions: id-token: write` (OIDC) + `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` — the
  attestation the completion criterion's clause 3 reads.

If `release.yml` is found to have DRIFTED from this shape (e.g. the provenance flag removed, the
trigger glob changed), that is a SCOPE-REVEAL — escalate; do not silently patch it inside this wave.

---

## §5 — File bounds

| Path | Mutation | Domain |
|---|---|---|
| `package.json` (`version`) | `3.9.0` → `3.10.0` | USER (§3 step 1) |
| `master` ref | fast-forward to the AY cut | USER (§3 step 2) |
| `refs/tags/v3.10.0` | annotated tag (`release.sh`) | USER (§3 step 3) |
| `.github/workflows/release.yml` | **NO EDIT** (verify-only, §4) | — |
| `docs/tranches/AY/PROGRESS.md` | the W-PUB1 close row (orchestrator at close) | orchestrator |

This wave touches NO `src/` file. The only source-tree byte that changes is `package.json.version`,
and that is a USER mutation on the AY line, not an agent edit.

---

## §6 — HARD GATE (evidence-backed)

`AY.W-PUB1` closes when ALL THREE artefacts verify AFTER the user-domain push (the pre-flight
`proof:ay-final` GREEN is the precondition, not the gate):

1. **master contains the AY cut** — `git fetch origin && git merge-base --is-ancestor <AY-cut-sha>
   origin/master` exits 0 (master is an ancestor-superset of the AY line; the stale `c6244e2`
   merge-base no longer equals master HEAD). Artefact: the `merge-base --is-ancestor` exit code +
   `git log origin/master --oneline -1` showing the `release: glass-ui 3.10.0` commit.
2. **npm `latest` == the AY cut** — `npm view @mkbabb/glass-ui version` == `3.10.0` AND `npm view
   @mkbabb/glass-ui dist-tags.latest` == `3.10.0`. Artefact: the `npm view` output (born `3.9.0`,
   GREEN at `3.10.0`).
3. **release.yml ran green with npm provenance** — the `release.yml` workflow run for the
   `refs/tags/v3.10.0` ref concluded `success` (`gh run view <run-id>` → `conclusion: success`) AND
   the published `3.10.0` carries a provenance attestation (`npm view @mkbabb/glass-ui@3.10.0 --json`
   → a non-empty `dist.attestations` / the npm provenance badge on the package page). Artefact: the
   `gh run view` conclusion + the attestation field.

**Bite (what makes the gate RED):** master left at `c6244e2` (the AY cut unmerged) → clause 1 RED;
`npm view … version` still `3.9.0` (the tag not pushed, or the CI publish failed) → clause 2 RED; the
`release.yml` run `conclusion != success` or the publish step ran WITHOUT `--provenance` (no
attestation) → clause 3 RED. An agent self-running any §3 step 1–4 command → the wave is INVALID
(K W0 violation). The slides re-pin (L.W-ADOPT) consuming `^3.9.0` instead of the exact `3.10.0`
after publish → that is L.W-ADOPT's gate, but it CANNOT pass until clause 2 here is GREEN (the E7
edge).

---

## §7 — Cross-references

- **EXECUTION-DAG.md** §BATCH 5 (`:156-162`) — W-PUB1 is the terminal AY node, HINGE 1; E7
  (publish → slides re-pin → L.W-ADOPT) + E15 (W-PUB1 ← W-CLOSE1 ← all AY waves green).
- **AY.W-CLOSE1.md** §0 clause 8 — `proof:ay-final` greens with `package.json` STILL `3.9.0`
  (STAGED-NOT-PUBLISHED); the `v3.10.0` cut is THIS wave. The handoff boundary is exact.
- **H-slides-adopt-deploy.md** F7 — the caret `^3.9.0` pin; the AY-publish → re-pin → adopt → deploy
  sequence; the version arithmetic stale before it ships.
- **H-execution-dag.md** §3 / E7 / §6 — the cross-repo publish→re-pin hinge that slips every tranche;
  the two user-domain hinges (W-PUB1 + L.W5) as the only manual edges.
- MEMORY `project_glassui_340_published` — the established gated path: push the `v*` tag, release.yml
  does the gated provenance publish (3.2.0 shipped via CI run 26964913257); the 3.7.0→3.9.0 churn is
  the chronic this wave's explicit version arithmetic closes.
- `.github/workflows/release.yml` + `scripts/release.sh` + `scripts/gates.mjs` (`--run release`) — the
  verified-correct machinery (§4); no edit expected.
