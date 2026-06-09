# CHRONIC-miss-release — red-team finding

**Lane:** CHRONIC MISS #3 — the release-path debt that recurs every cut.
**Question:** Is the release path hardened, or does each publish re-fight the same gates?
**Verdict:** WEAK (trending DEFERRED-CHRONIC). The release path is NOT hardened. Each cut
re-fights the SAME three gate classes — budget rebaseline, ci.yml↔manifest drift, and the
allowlist/exemption patch — and the one meta-gate built to stop the drift (`gates:verify-ci`)
is itself NOT in the release set, so the drift it detects ships unguarded.

HEAD audited: `89edffc` (branch `at-dock-convergence`), package `3.8.0`.

---

## The headline: the 3.8.0 cut re-fought THREE gates at once — on record

The tag commit `f2fc614` is literally titled **"fix(release-gates): unblock the 3.8.0
publish"** and its body is the confession:

> "The release gate matrix had not been cut since 3.7.0, so two real drifts blocked it"
> — restored 3 `proof:consumers:static` root-export allows, exempted the in-repo
> workspace from `proof:lockfile`, and (separately) "`profile:budget` re-baselined separately."

That is THREE gate-fights to ship ONE patch release:
1. `proof:consumers:static` allowlist drift (W37 re-home moved a symbol off the contract file).
2. `proof:lockfile` false-positive on the in-repo `tests-visual` workspace.
3. `profile:budget` rebaseline.

This is the definition of "each publish re-fights the same gates." The gates are doing
their job catching real drift — the failure is that NOTHING runs them at AUTHORING time, so
the drift accumulates silently and detonates at the cut, where it must be hand-patched under
release pressure.

---

## Challenge 1 — `gates:verify-ci` fails RED on master HEAD; ci.yml is 20 gates behind the manifest

Run `npm run gates:verify-ci` at HEAD: it exits **1** (correctly fails closed) and reports
**20 ci-tagged gates MISSING from `.github/workflows/ci.yml`**:

```
proof:dock-region-model, proof:aurora-painterly-statistics,
proof:aurora-noise-hash-equivalence, proof:demo-radial-calm,
proof:constellation-substrate-single, proof:canvas2d-substrate,
proof:resolve-canvas-color, proof:text-highlight, proof:constellation-field,
proof:input-invalid-aria, proof:styling-hygiene, proof:liquid-glass-material,
proof:tabs-unified, proof:dock-orchestrator-single, proof:dock-hold-contract,
proof:dock-wrap-content-driven, proof:slider-two-only, proof:carousel-glass-atoms,
proof:deck-progress-rail, proof:squircle-language
```

`gates:verify-ci` IS the last step in `ci.yml` (line 349-350). So **CI on master is RED on
its own self-check right now.** `scripts/gates.mjs --list ci` = 90 gates; `ci.yml` runs 71.
The manifest grew 19 ci-tagged gates (AX waves W23/W37/W45/W52/W53/W59 etc.) and NONE were
added to `ci.yml`. `gates.mjs` was last touched `56db9e0` 2026-06-08 19:40 (W45); `ci.yml`
last touched `926cf9e` 2026-06-08 14:21 (W22) — the gates kept being added to the manifest,
never mirrored into the YAML.

**Why this recurs (the structural defect):** the docstring claims "local == ci == release is
STRUCTURAL, not coincidental" (gates.mjs line 15), but `ci.yml` is a HAND-MAINTAINED mirror
of the manifest with per-step `note:` comments. Every wave that adds a ci-tagged gate must
ALSO hand-edit ~5 lines into ci.yml or the mirror drifts. `gates:verify-ci` only CATCHES the
drift — it doesn't PREVENT it, and it runs only inside the very job it's checking. The "single
source of truth" is a fiction: there are two sources (the manifest + the YAML mirror) and they
diverge by 20 every cut.

## Challenge 2 — the release path does NOT run `gates:verify-ci`; the drift ships unguarded

`node scripts/gates.mjs --list release` does NOT include `gates:verify-ci` (it's not in
`CI_META_STEPS` of any release filter — it's a YAML-only step). So `release.sh` (`--run
release`) and `release.yml` (`--run release`) both publish WITHOUT ever checking ci.yml↔manifest
parity. A 20-gate-drifted ci.yml has zero bearing on whether a tag publishes. The "single
source of truth" claim in `release.yml` line 5-11 is therefore unbacked at the one moment it
matters: **the release path trusts a manifest whose CI mirror it never verifies.** A gate the
manifest believes runs every PR may in fact run on NO PR (the 20 missing ones).

## Challenge 3 — `proof:styling-hygiene` is a ci-tagged gate whose script does not exist, AND it is AMNESTY-listed so the parity meta-gate stays green

- `package.json` registers `"proof:styling-hygiene": "node scripts/proof-styling-hygiene.mjs"`
  (line 642) and `gates.mjs` tags it `["local","ci"]` (line 476).
- `scripts/proof-styling-hygiene.mjs` **does not exist on disk** — `npm run proof:styling-hygiene`
  CRASHES with `MODULE_NOT_FOUND`.
- `proof:gate-script-parity` — the bijection meta-gate built to catch exactly this — **PASSES
  green** because the breach is hard-coded onto the `KNOWN_DANGLING` baseline
  (`proof-gate-script-parity.mjs` lines 61-64):
  ```js
  const KNOWN_DANGLING = new Map([
      ["proof:styling-hygiene", "AW.W20 — missing proof-styling-hygiene.mjs (CI-tagged, crashes)"],
      ["proof:glass-card-tiers", "AW.W12 — missing proof-glass-card-tiers.mjs"],
  ]);
  ```
  The parity script's OWN comment (lines 51-55) names the danger: *"a dangling CI-tagged gate
  (proof:styling-hygiene is a gates.mjs ci row) crashes CI."* It then suppresses that exact
  finding to a baseline and exits 0.

This is a chronic-deferral two ways: (a) the gate script has been MIA since AW.W20 / AW.W12 —
two prior tranches — "owner-owed," never authored; (b) the meta-gate that should force the fix
instead amnesties it. The ONLY thing keeping CI green is that `proof:styling-hygiene` was never
added to `ci.yml` as a step (Challenge 1's drift) — i.e. two bugs cancel. The day someone
"fixes" the ci.yml drift by mirroring all 20 missing gates into the YAML, `proof:styling-hygiene`
becomes a CI step and CI crashes hard. The deadlock is baked in.

## Challenge 4 — `profile:budget` is rebaselined EVERY tranche cut (12+ commits, ~3% ratchet, never down)

`scripts/profile-bundle.mjs` carries the full ratchet ledger in its comments — the CSS gzip
ceiling has been consciously lifted at least 8 times (the comments name a "FIFTH conscious
lift", a "SEVENTH conscious lift", etc.; `grep -ciE "re-?bas|conscious lift|lifted to"` = 40
mentions). The ceiling marched `dist/styles/index.css` gzip **74,928 → 140,000** (+87%) and
raw → 548,000, always rounded up ~3% "to carry the new growth," never tightened.

`git log` shows a budget rebaseline commit in essentially EVERY tranche: I, K, P, Q, AM, AO,
AU, AV, AW, AX (`d21babb`, `693bf3b`, `08974c7`, `bea3f99`, `3a2cf98`, `d76caf0`, `bd7842f`,
`e2e4b0d`, `1bfe8d0`, `5d27ea2`, `fb6941a` …). The current `BUDGETS` (lines 161-164):
```
dist/glass-ui.js     raw 190_000  gzip 33_700
dist/styles/index.css raw 548_000 gzip 140_000
dist/aurora.js       raw 130_000  gzip 38_000
```
A budget that only ever moves UP, at the convenience of whoever is cutting, is not a budget —
it is a logbook of growth wearing a gate's clothing. It has never once forced a size decision;
it forces a rebaseline commit. This is "chased N times" by construction.

## Challenge 5 — provenance: nothing enforces the tag sits on master

`release.sh` and `release.yml` fire on any `v*.*.*` ref. Neither asserts the tagged commit is
an ancestor of (or equal to) `master`. `release.sh`'s only mention of master is the closing
echo `"Push branch: git push origin master"` — advice, not a guard. The MASTER-PLAN itself
records the consequence: *"3.8.0 published from the branch-tip not master — the merge+re-tag
is a hard predecessor of the slides close"* (line 51). v3.8.0's tag commit (`f2fc614`) IS now
an ancestor of master (FF'd after the fact), so it resolved THIS time — but the path still has
zero structural guarantee, so the next branch-tip cut re-opens it. `release.yml` verifies
`tag == package.json.version` but never `tag ∈ master`.

---

## CHRONIC slip-history (the recurrence count)

| Class | Recurs every | Evidence | Slip |
|---|---|---|---|
| **budget rebaseline** | tranche cut | 12+ rebaseline commits I→AX; 40 ledger mentions; gzip ceiling +87% never-down | chronic since tranche I |
| **ci.yml↔manifest drift** | tranche band | 20-gate drift at HEAD; PROGRESS.md "14+ AX-band gates ci-tagged but absent from ci.yml" (W05+W13+W22 band note); W00-pi-lane.json "5 ci.yml/manifest drifts"; routed to W33 "needing the π-gate-in-CI infra decision" — deferred 3× (W00 → band-close → W33) | chronic, currently 20 deep |
| **dangling proof script (styling-hygiene / glass-card-tiers)** | — | MIA since AW.W20 + AW.W12; amnestied on KNOWN_DANGLING; "owner-owed" 2 tranches | deferred AW → AX, unfixed |
| **release-gate-unblock patch** | cut after a quiet period | `f2fc614` (3.8.0), `e903c73` (AM.W3 "release-gate hygiene"), `bb4e79b` (AP.W4 false-witness coda) | recurs at every cut that lapsed |
| **provenance branch-tip vs master** | branch-cut release | MASTER-PLAN line 51; no master-ancestor guard in release.sh/.yml | latent, fires on branch-tip cuts |

The W00 π-lane ALREADY enumerated this debt ("6 orphan proof scripts + 2 dangling proof:*
registrations + 5 ci.yml/manifest drifts … owed to their owner waves, not absorbed by W00")
and the AX PROGRESS routes the `verify-ci` drift to "W33 / band-close … needing the π-gate-in-CI
infra decision." That decision has been deferred from W00 → the band-close → W33 — it is the
textbook chronic-deferral: named, owed, and pushed to the terminal wave every time.

---

## Gestalt hardening actions (PLANNING — no code here)

These PERFECT the release path so a cut never re-fights a gate. They belong in **W33 (close)**
plus a small net-new **W41 supplier-edge** amendment.

1. **Kill the ci.yml mirror — GENERATE it, or run the manifest directly.** The drift is
   structural because ci.yml is a hand-curated second source. Two clean-break options (no
   workaround): (a) a `gates.mjs --emit-ci` codegen that WRITES the YAML step block from the
   ci-tagged set, with `proof:gen-ci-fresh` asserting the committed YAML byte-matches the
   regen (drift becomes impossible, not merely detected); or (b) collapse ci.yml to ONE step
   `node scripts/gates.mjs --run ci` and surface per-gate visibility via the runner's own
   grouping output. (a) preserves the Actions-UI per-step view the team wanted. Either ends
   the 20-gate-drift class permanently.

2. **Put `gates:verify-ci` (or the codegen-fresh check) in the RELEASE set.** Add it to the
   `release` tag in the manifest so `release.sh` + `release.yml` refuse to publish while ci.yml
   has drifted. The release path must never trust a manifest whose CI mirror it didn't verify.

3. **Author the two MIA scripts or RETIRE the gates — clean break, no amnesty.** Either write
   `proof-styling-hygiene.mjs` + `proof-glass-card-tiers.mjs` (the AW.W20/W12 owners), or
   delete the `package.json` registration + `gates.mjs` row + the `KNOWN_DANGLING` baseline
   entry. A "known-dangling baseline" that has survived two tranches is a fail-open in
   disguise; the precept is fail-EXPLICIT, which means FIX or DELETE, not perpetually allowlist.

4. **Convert `profile:budget` from a ratchet to a real budget.** Two-part: (a) make the
   committed baseline the ONLY mover and require the diff comment to state WHAT bytes grew and
   WHY (the ledger already does this informally — make it a gate field), and (b) add a
   DOWN-ratchet obligation at each band close: after a prune wave (W19/W25/W27 carve the CSS),
   re-tighten the ceiling to the new real draw + headroom, so the budget can fall, not only
   rise. A budget that only ever rises has never forced a decision — prove it can bite by
   tightening it once.

5. **Enforce master-ancestry at release.** Add to `release.yml` (and `release.sh`) a guard:
   `git merge-base --is-ancestor $GITHUB_SHA origin/master` (or fetch master and assert the
   tag is reachable). A branch-tip tag must fail the publish, forcing the merge-then-tag order
   the MASTER-PLAN already calls a "hard predecessor." This closes the provenance class
   structurally, not "resolved going forward" by FF luck.

6. **Run a dry-cut PROTOTYPE before W33 ships.** Execute `bash scripts/release.sh v3.9.0-rc`
   (or `gates.mjs --run release`) on a clean tree NOW and capture which gates drift. The 3.8.0
   evidence says a cut after a quiet period ALWAYS surfaces ≥2 drifts; running the release set
   today — before the real 3.9.0 cut — converts the inevitable release-pressure scramble into a
   calm pre-fix. The cardinal-lesson analogue for the release path: a release is "ready" only
   on a captured green `--run release` against a clean tree, not on a passing `proof:all`.
