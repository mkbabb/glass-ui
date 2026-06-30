# P-SWEEP — The standing `closeDisease:true`-manifest per-band sweep (the COMPLETENESS clause) — PROTOTYPE-AUGMENTED SPEC, PASS 1

**Item:** The standing closeDisease-manifest per-band sweep — the completeness clause (re-spec `P-SWEEP`) · **Class:** spec
**Date:** 2026-06-30 · **HEAD:** `b716b5be` · **branch:** `tranche/BG` · **Fence:** read-mostly; this spec wrote ONLY
under `RESPEC/`. `verify-siblings-intact --quiet` exit 0 before + after. EVERY empirical claim below was RUN at HEAD
(exit codes, timings, JSON-status, `--run full` membership are MEASURED — not asserted).

**feasible: YES — high confidence.** The COMPLETENESS deliverable (a `closeDisease:true` manifest flag applied to ALL
such gates NOW + the membership clause `every closeDisease gate ∈ SWEEP_SET`) is the structural fix for the brittleness
the 12→4 re-mint proves. Mechanism reuses three proven idioms (the `gatesFor("full")` special-case at `gates.mjs:2305`,
the `proof:strict-freshness-armed` armed-subprocess differential, the `.githooks/commit-msg` active-tranche-gated bite).
Three re-spec must-resolves are now SETTLED with measured evidence: (1) the completeness floor flips from prose-OQ to a
manifest-derived gate fact; (2) the tier cost re-costed against the COMPLETE set — `gate-manifest-sound` (112s) is the
SOLE cost-driver, `storybook-complete`/`gate-script-parity`/ledger gates are all sub-0.5s, so G3's "ledger gates push
T0/T1 toward `--run full` cost" worry is empirically WRONG; (3) the honest ≥2-consumer accounting — the `automated` label
DROPS to **2 automated + 1 discipline**, OR (preferred) an engine env-export BUILDS a genuine 2nd automated consumer.

> **Supersedes `pass-1-proto-P3.md`** (the SAME item, renamed). P3 is sound; this pass promotes its OQ-1 (the C2
> completeness floor) to the deliverable, re-costs the tiers with measured timings, and settles the consumer accounting
> P3 over-claimed ("3 automated consumers" — two are human/orchestrator discipline).

---

## 0. THE DISEASE + WHY A FIXED LIST IS BRITTLE (re-verified live at `b716b5be`)

The recurring class is **a wave greens its OWN gate while leaving a SHARED close gate RED** — a wave that mints a gate or
re-points a CSS token greens its own deliverable but silently REDs a *registration / cascade-bookkeeping* sibling no
per-wave check looks at. It RE-MINTS WITH DIFFERENT ARTIFACTS EACH BATCH:

```
12 reds @ ff0933a3  →  SYNTH ea4682c0 cured all 12  →  WS3/WS4 re-seeded 4 NEW (R1–R4)  →  4 live-fix commits landed WITHOUT re-checking the close
```

**A hand-picked SWEEP_SET is therefore STRUCTURALLY BRITTLE** — the cure is not the current instances, it is the CLASS.
The 4 at HEAD (every gate RUN, exit + JSON-status + dual-signal behaviour captured):

| # | Gate | Verdict @ HEAD (measured) | JSON `status` | Writes JSON? | Re-seed wave |
|---|------|---------------------------|---------------|--------------|--------------|
| R1 | `proof:no-god-module` | `exit 1` — `ladder.css` 527L, `shell.css` 510L (>500, not ratchet-baselined) | `"fail"` | YES (`AV-no-god-module.json`) | 6ec81de (3.7) + cd9ce46 (3.6) |
| R2 | `proof:no-dead-token` | `exit 1` — `--glass-blur-dock` declared, ZERO `var()` readers (3-deep orphan) | `"fail"` | YES (`no-dead-token.json`) | cd9ce46 (3.6) |
| R3 | `proof:gen-ci-fresh` | `exit 1` — `glass-idiom-factor` ci-tagged, `ci.yml` not re-emitted | — | **NO** (`throw`/`console.error` only) | 6ec81de (3.7) |
| R4 | `proof:tag-parity` | `exit 1` — `proof:category-card-warm` `["local"]`-only (RED on master / green in CI) | `"fail"` | YES (`AY-tag-parity.json`) | 9e13965d (10.25) |

**Why no existing guard catches this mid-tranche.** `proof:close-battery-parity` is GREEN at HEAD (`exit 0`) — it proves
the close PATH runs `--run full`; it does NOT prove the battery PASSES. The full battery WOULD catch all four, but only
at the irreversible tag (`release.sh`/`release.yml`). Between tag and tag there is no standing discipline re-running the
close-disease subset as waves land. With ~110 PENDING waves, the MAJORITY minting a gate or touching the glass cascade,
every band re-seeds this absent a guard, and the debt compounds un-tracked until the close re-opens.

### The dual-signal hazard — GROUNDED, both legs proven necessary (NOT prose)

Measured at HEAD: **neither `$?` alone nor JSON alone is sufficient.**

- **The JSON-only leg MISSES `gen-ci-fresh`** — `grep -c "writeGateArtifact|.cache/gates" scripts/proof-gen-ci-fresh.mjs`
  → **0**. It `process.exit(1)` with `console.error` and writes NO `.cache/gates/*.json`. A sweep that reads only the
  JSON `status` field would NEVER see R3 fail (no JSON file to read). → the **execSync-throw / exit-code leg** is mandatory.
- **The exit-only leg MISSES a future exit-0-on-fail** — a gate that prints `status: FAIL` to its JSON but
  `process.exit(0)` (a refactor bug, or a "report-don't-block" gate) exits clean while its artifact says fail. The 6 close
  gates exit faithfully TODAY, but the discipline must survive a future gate that does not. → the **JSON-status leg** is
  mandatory.

A naive fix-agent running `node scripts/proof-X.mjs; echo $?` per-script is exactly the false-green this discipline
forbids. `$?` also cannot distinguish `pass` from `skipped` (a grace-skipped live-π gate exits 0 with `status:"skipped"`
— NOT a verified pass). **The sweep MUST read both signals and RED if EITHER shows a problem.**

---

## 1. THE DELIVERABLE — completeness as a manifest-derived gate fact (the P-SWEEP headline)

A fixed `SWEEP_SET` is brittle because the disease re-mints with new artifacts. The fix is to make membership a PROPERTY
OF THE GATE, declared in the manifest, asserted complete by a clause — so a future close-disease gate is enrolled by its
OWN registration, never a hand-edit a later batch forgets.

### 1.1 The `closeDisease: true` manifest flag — applied to ALL such gates NOW

Add `closeDisease: true` to the manifest row of every gate in the recurring CLASS. The class definition (the audited,
not-arbitrary boundary):

> A **closeDisease gate** is a DEVICE-FREE meta-gate that reads the SHARED registration / cascade-bookkeeping a single
> wave's diff can clobber while greening its own deliverable — the gate manifest (`gates.mjs`/`GATES`/`gatesFor`), the
> generated `ci.yml`, the CSS-cascade line-budget, the cross-file token graph, or the package.json tag set. It is NOT a
> per-surface paint/freshness gate (those are the PAINT class — the ledger / ba-gestalt net, a SEPARATE discipline).

The class members at HEAD (every one verified device-free — `grep` for `PW_BIN|page.goto` → none — and ∈ `--run full`):

| Gate | What shared bookkeeping it reads | Cost @ HEAD (measured) | Writes JSON? | Tier |
|------|----------------------------------|------------------------|--------------|------|
| `proof:no-god-module` | the CSS-cascade 500-line budget + ratchet | 0.2s | yes | FAST |
| `proof:no-dead-token` | the cross-file `--token` declare↔read graph | 0.2s | yes | FAST |
| `proof:tag-parity` | the manifest tag set vs ci aggregate | 0.1s | yes | FAST |
| `proof:gen-ci-fresh` | the generated `ci.yml` vs `--emit-ci` | 0.1s | **NO** | FAST |
| `proof:gate-script-parity` | the manifest key ↔ `scripts/proof-*.mjs` bijection | 0.4s | yes | FAST |
| `proof:storybook-complete` | the demo-story registration census | 0.4s | yes | FAST |
| `proof:close-battery-parity` | the close-path `--run full` invocation + union | 0.4s | yes | FAST |
| `proof:gate-manifest-sound` | the manifest well-formedness + `:5199` default + freshness | **112s** | yes | **CLOSE-ONLY (T2)** |

`gate-script-parity` + `storybook-complete` are ADDED to the class versus P3's 6-member list — both are device-free
manifest/registration-census meta-gates a wave-diff can clobber (a renamed script breaks the parity bijection; a new
story un-registered breaks the census), both ∈ `--run full`, both PASS at HEAD (so they do not change the born-RED
anchor — see §5). This is precisely the brittleness P-SWEEP cures: the manifest flag enrolls them WITHOUT a SWEEP_SET
hand-edit.

```js
// scripts/gates.mjs — the closeDisease rows gain the flag (EXAMPLES; apply to all 8)
{ id: "proof:no-god-module",   cmd: "proof:no-god-module",   tags: ["local","ci"], closeDisease: true, /* … */ },
{ id: "proof:no-dead-token",   cmd: "proof:no-dead-token",   tags: ["local","ci","release"], closeDisease: true, /* … */ },
{ id: "proof:tag-parity",      cmd: "proof:tag-parity",      tags: ["local","ci"], closeDisease: true, /* … */ },
{ id: "proof:gen-ci-fresh",    cmd: "proof:gen-ci-fresh",    tags: ["local","release"], closeDisease: true, /* … */ },
{ id: "proof:gate-script-parity",  cmd: "proof:gate-script-parity",  tags: ["local","ci"], closeDisease: true, /* … */ },
{ id: "proof:storybook-complete",  cmd: "proof:storybook-complete",  tags: ["local","ci"], closeDisease: true, /* … */ },
{ id: "proof:close-battery-parity",cmd: "proof:close-battery-parity",tags: ["local"], closeDisease: true, /* … */ },
// gate-manifest-sound carries the flag too BUT a second discriminator routes it CLOSE-ONLY (§3):
{ id: "proof:gate-manifest-sound", cmd: "proof:gate-manifest-sound", tags: ["local"], closeDisease: true, closeDiseaseTier: "close", /* … */ },
```

### 1.2 SWEEP_SET is DERIVED from the flag — not a hand-list

```js
// scripts/gates.mjs — beside GATES; the set is COMPUTED from the manifest flag.
// BG.W-CLOSE-SWEEP — the close-disease subset DERIVED from the manifest, never a
// hand-list (the 12→4 re-mint proves a fixed list is brittle). A gate enrolls itself
// by carrying `closeDisease: true`; proof:close-sweep asserts every flagged gate is
// reachable AND that no flagged gate is silently dropped. The FAST subset (T0/T1
// per-flip) excludes the close-only members (closeDiseaseTier === "close") whose cost
// or context (a clean tree + a fresh quiet-server π run) only holds at T2/the cut.
export const SWEEP_SET      = GATES.filter((g) => g.closeDisease).map((g) => g.id);
export const SWEEP_SET_FAST = GATES.filter((g) => g.closeDisease && g.closeDiseaseTier !== "close").map((g) => g.id);
```

`gatesFor` gains the two derived modes beside `"full"` (`gates.mjs:2305`):

```js
// scripts/gates.mjs — inside gatesFor(mode), beside `if (mode === "full")`
if (mode === "sweep" || mode === "sweep-fast") {
    const ids = new Set(mode === "sweep-fast" ? SWEEP_SET_FAST : SWEEP_SET);
    return GATES.filter((g) => ids.has(g.id));   // manifest order, deduped
}
```

`runMode` (`gates.mjs:2320`, unchanged) runs the set via `execSync(…{stdio:"inherit"})` — which THROWS on any nonzero
child exit → `process.exit(1)`. So `--run sweep` is faithful for the exit-code leg by construction. The JSON-status leg
is added as a post-pass (§2).

### 1.3 The completeness CLAUSE (the born-RED anchor)

`proof:close-sweep` C2 asserts `every closeDisease gate ∈ SWEEP_SET` AND `SWEEP_SET ⊆ --run full`. Because SWEEP_SET is
DERIVED from the flag, C2-membership cannot drift — the assertion that bites is the **inverse**: every gate the audit
NAMES as close-disease class must CARRY the flag. The anchor is the **4-at-HEAD reds** — `proof:close-sweep` is born-RED
because, run at HEAD, `gates:sweep` REDs naming R1–R4 (the on-disk proof the sweep BITES the exact class). It flips GREEN
only after the P-CLOSE atomic 6-gate fix clears R1–R4 AND the 8 flags + the runner + the canon all land. See §5.

---

## 2. THE DUAL-SIGNAL `sweepVerdict` (the load-bearing JSON-not-`$?` leg)

`runMode`'s execSync-throw catches a child that exits nonzero (gen-ci-fresh's `throw`). It CANNOT catch a child that
prints `status: FAIL` but `process.exit(0)`. The robust verdict reads BOTH and reds if EITHER shows a problem. A PURE
verdict core (the `close-battery-parity` `evaluate(input)` precedent — injectable so the self-test feeds synthetic
child-results without spawning):

```js
// scripts/gates.mjs — the sweep verdict core (PURE, injectable for the self-test).
// The cache filename each closeDisease gate writes (its gateArtifactPath cacheName);
// a gate that writes NO artifact is `null` (gen-ci-fresh throws/prints — caught by the
// exit leg). DERIVED-or-declared: a row may carry `artifact: "<cacheName>"` so the map
// stays manifest-sourced, never a second hand-list that drifts from the gate.
export const SWEEP_ARTIFACTS = {
    "proof:no-god-module":        "AV-no-god-module",
    "proof:no-dead-token":        "no-dead-token",
    "proof:tag-parity":           "AY-tag-parity",
    "proof:gen-ci-fresh":         null,                    // no JSON — exit-code is its only signal
    "proof:gate-script-parity":   "AX-gate-script-parity", // (cacheName verified on disk before wiring)
    "proof:storybook-complete":   "AW-storybook-complete",
    "proof:close-battery-parity": "BB-close-battery-parity",
    "proof:gate-manifest-sound":  "AZ-gate-manifest-sound",
};

/**
 * The DUAL-SIGNAL verdict. A sweep child is GREEN iff it exited 0 AND (if it wrote a
 * JSON artifact) that artifact's `status === "pass"`. Reds if EITHER fails — so a child
 * that prints status:FAIL but exits 0 (the exit-0-on-fail false-green) STILL reds, and a
 * child that throws/exits-nonzero without a JSON artifact (gen-ci-fresh) STILL reds.
 * Neither `$?` alone nor JSON alone is trusted.
 * @param {{id:string, exit:number, artifactStatus:string|null}[]} results
 * @returns {string[]} violations (empty = clean)
 */
export function sweepVerdict(results) {
    const v = [];
    for (const r of results) {
        if (r.exit !== 0)
            v.push(`${r.id}: exit ${r.exit} (the gate REDs — re-clear before the flip)`);
        else if (r.artifactStatus != null && r.artifactStatus !== "pass")
            v.push(`${r.id}: exit 0 but JSON status="${r.artifactStatus}" (the exit-0-on-fail false-green)`);
    }
    return v;
}
```

The real `--run sweep` spawns each gate (capturing its exit), reads `SWEEP_ARTIFACTS[id]`'s JSON `status` (when
non-null), then prints/exits on `sweepVerdict(results)`. It WRAPS `runMode` with the JSON-status assertion so a fix-agent
never relies on bare `$?`.

> **The standing RULE (record in the canon home + every fix-agent prompt):** a wave/band is GREEN only off
> `npm run gates:sweep` (or `proof:full`) — NEVER off a per-script `node scripts/proof-X.mjs; echo $?`.

### package.json keys

```json
"gates:sweep":      "node scripts/gates.mjs --run sweep",
"gates:sweep-fast": "node scripts/gates.mjs --run sweep-fast"
```

`gates:emit-ci` (`node scripts/gates.mjs --emit-ci`) already exists — the documented REMEDY when the sweep reds R3 (the
discipline names it; not new).

---

## 3. THE THREE TIERS — RE-COST against the COMPLETE set (G3 resolved with measured timings)

G3 asked: re-cost T0/T1 against the COMPLETE set, since "storybook-complete + ledger-JSON gates push it toward `--run
full` cost." **Measured at HEAD, this is FALSE** — every new closeDisease member is sub-0.5s; the SOLE cost-driver is
`gate-manifest-sound` (112s), which is routed CLOSE-ONLY for a SECOND, independent reason (the realDefect=FALSE finding,
below).

| Tier | Trigger | Set | Cost (MEASURED @ HEAD) | Trust model |
|------|---------|-----|------------------------|-------------|
| **T0 fast bite** | every commit touching a HOT file (`GLASS_UI_ACTIVE_TRANCHE` set) | `SWEEP_SET_FAST` (7 gates — all closeDisease minus gate-manifest-sound) | **~1.8s** (god 0.2 + dead 0.2 + tag-parity 0.1 + gen-ci 0.1 + gate-script-parity 0.4 + storybook-complete 0.4 + close-battery 0.4) | execSync-throw + JSON-status |
| **T1 wave pre-flip** | before any `PAINT-PENDING`/`DONE` flip on a gate-minting or CSS-touching wave | `SWEEP_SET_FAST` (same 7) | **~1.8s** | execSync-throw + JSON-status |
| **T2 band pre-close** | before a workstream's last DONE flip / before the cut | full `SWEEP_SET` (8, incl. gate-manifest-sound) → in practice the existing `proof:full` siblings-absent | gate-manifest-sound alone ≈ **112s**; `proof:full` ~10min+ (build + ~200 gates) | the existing faithful `runMode` (execSync-throw) |

**T0 and T1 are the SAME `SWEEP_SET_FAST`** — the original P3 split (T0=fast, T1=adds gate-manifest-sound) is RETIRED. The
re-cost reason is twofold:

1. **Cost.** gate-manifest-sound's 112s is a per-flip tax with ~110 waves; the 7 FAST gates at ~1.8s are negligible.
2. **G3's realDefect=FALSE finding — MEASURED.** `gate-manifest-sound` is RED at HEAD for TWO reasons, BOTH transient/
   environmental, NEITHER the wave-greens-own-gate disease:
   - **`[R6-PERSISTED]`** — it reads `.cache/gates/AX-dock-animation-live.json` status `"fail"` (a STALE persisted
     artifact from a server-down π run — the live-π gate writes `fail` when the demo server is down; gate-manifest-sound
     reads that persisted JSON). This is the "π runs overwrite the JSON/PNGs" class — it is GREEN only after a fresh
     quiet-server π run, which holds at T2/the cut, not mid-flip.
   - **`[CLEAN-TREE]`** — it reds on a dirty tracked tree (the in-flight `RESPEC/*.md` audit files trip it right now). A
     dirty working tree is the CI/mid-dev NORM; this clause is a release-context truth (the `proof:ay-final`/`ba-final`
     CLEAN-TREE precedent).

   So including gate-manifest-sound in the per-flip sweep would FALSE-RED every flip during the redress window. It carries
   `closeDisease: true` (it IS the class) but `closeDiseaseTier: "close"` routes it to T2 ONLY. `proof:close-sweep` C2
   asserts it is in SWEEP_SET (so it is never dropped) but the FAST runner excludes it (so it never false-reds a flip).

The ledger gates (`proof:live-verified-ledger:*`, `proof:bc-fold-ledger`, `proof:disposition-live`) are **NOT closeDisease
members** — they are the PAINT/freshness class (a different net), measured at 0.29s but a SEPARATE discipline (the
commit-msg ledger bite already guards them per-commit). They do not enter SWEEP_SET. This corrects G3's conflation.

---

## 4. THE LOCKING GATE — `proof:close-sweep` (the armed-witness)

A latent discipline nothing exercises is the L14 no-op class (`proof:strict-freshness-armed` was minted to kill exactly
this). `proof:close-sweep` is the load-bearing witness that the sweep is **complete + flag-derived + armed + faithful +
recorded**. Device-free; `["local"]` — a CI tag would RE-SEED R3 (the gate is `ci`-tagged → `ci.yml` must be re-emitted →
the very drift it guards). It is the structural twin of `proof:close-battery-parity` (which proves the close PATH), NOT a
fold of it (close-sweep proves the per-wave/per-band PRE-FLIP discipline + the manifest-flag completeness).

```js
// scripts/proof-close-sweep.mjs — BG.W-CLOSE-SWEEP (clause sketch; the close-battery-parity evaluate/—selftest shape)
import { GATES, gatesFor, SWEEP_SET, SWEEP_SET_FAST, SWEEP_ARTIFACTS, sweepVerdict } from "./gates.mjs";

function evaluate(input) {
    const v = [];

    // C1 — SWEEP_SET ⊆ --run full (every sweep gate is real + tagged so the close runs it too).
    const fullIds = new Set(input.fullIds);
    for (const id of input.sweepSet)
        if (!fullIds.has(id)) v.push(`[C1] sweep gate ${id} is not in --run full (untagged/typo'd/dropped)`);

    // C2 — THE COMPLETENESS FLOOR (the P-SWEEP headline). SWEEP_SET is DERIVED from the
    //      manifest flag, so the bite is the INVERSE: every gate the audit names as
    //      close-disease CLASS must CARRY closeDisease:true. The audited class registry is
    //      injected (the manifest flag is the runtime source; this is the human-named floor
    //      the flag must cover). A class gate missing the flag (a future agent mints a new
    //      registration/bookkeeping gate + forgets the flag) REDs here.
    for (const id of input.auditedClassGates)
        if (!input.flaggedGates.includes(id))
            v.push(`[C2] ${id} is an audited close-disease class gate but carries no closeDisease:true flag (it would silently fall out of SWEEP_SET)`);
    // and the symmetric guard: a flagged gate must be device-free (no Playwright spawn).
    for (const id of input.flaggedPlaywright)
        v.push(`[C2] ${id} carries closeDisease:true but spawns a browser — a paint/live gate is NOT a close-disease meta-gate (wrong class)`);

    // C3 — the runner is wired + the canon records the trust-JSON-not-$? rule + 3 cadences.
    if (!input.npmSweep)     v.push("[C3] package.json has no `gates:sweep`");
    if (!input.npmSweepFast) v.push("[C3] package.json has no `gates:sweep-fast`");
    if (!input.canonRule)    v.push("[C3] the canon home does not record the close-sweep discipline (trust-JSON-not-$?, the 3 cadences, the SWEEP_SET-derived-from-flag rule)");

    // C4 — the commit-msg bite carries the hot-file-gated FAST sweep arm (CONSUMER 1).
    if (!input.commitHookArm) v.push("[C4] .githooks/commit-msg has no hot-file-gated gates:sweep-fast arm");

    // C5 — the SWEEP_ARTIFACTS map covers every flagged gate (a flagged gate with no map
    //      entry is a JSON-leg blind spot; gen-ci-fresh's `null` is an EXPLICIT entry, not absence).
    for (const id of input.flaggedGates)
        if (!(id in SWEEP_ARTIFACTS))
            v.push(`[C5] ${id} carries closeDisease:true but has no SWEEP_ARTIFACTS entry (JSON-status blind spot — add the cacheName or explicit null)`);

    return v;
}
```

**Clause 6 — the structural subprocess self-test (the verifying π for a process gate).** The `evaluate`/`syntheticInput`/
`--selftest` differential of `proof:close-battery-parity` clause-5 + `proof:strict-freshness-armed`, applied to BOTH
`sweepVerdict` (the dual-signal) AND `evaluate` (the completeness clause). Injected fixtures, asserted as a subprocess
exit differential:

| fixture | injected | expected | proves |
|---------|----------|----------|--------|
| **sweepVerdict re-seeded** | `[{id:"proof:no-god-module", exit:1, artifactStatus:"fail"}]` | exit 1 | a WS3-class red is caught (R1–R4 reproduce) |
| **sweepVerdict exit-0-on-fail** | `[{id:"x", exit:0, artifactStatus:"fail"}]` | exit 1 | the JSON leg catches the false-green (the load-bearing bite; drop the JSON leg → this fixture wrongly greens → clause-6 reds) |
| **sweepVerdict gen-ci-fresh** | `[{id:"proof:gen-ci-fresh", exit:1, artifactStatus:null}]` | exit 1 | the exit leg catches a no-JSON gate (drop the exit leg → wrongly greens) |
| **sweepVerdict clean** | every `{exit:0, artifactStatus:"pass"}` | exit 0 | the differential is meaningful, not a flat always-red |
| **evaluate class-gate-no-flag** | `auditedClassGates:["proof:foo"], flaggedGates:[]` | C2 reds | a future class gate without the flag silently falling out of SWEEP_SET is caught (the COMPLETENESS bite) |
| **evaluate flagged-playwright** | `flaggedPlaywright:["proof:bar"]` | C2 reds | a paint/live gate wrongly flagged closeDisease is caught (the wrong-class bite) |

The **exit-0-on-fail** + **gen-ci-fresh** fixtures together prove BOTH dual-signal legs are load-bearing; the
**class-gate-no-flag** fixture proves the completeness floor cannot silently un-arm (the P3 OQ-1 promoted to a tested bite).

No `proof:ba-gestalt` row — a process/registration discipline changes ZERO pixels (the BB inv: the gestalt bar binds
VISUAL waves).

---

## 5. THE VERIFYING π (born-RED → GREEN demonstration)

A process gate's "π" is the armed self-test fixture demonstrated against the REAL recurrence:

1. **Born-RED anchor (the WS3 recurrence @ HEAD).** Run `gates:sweep-fast` at HEAD `b716b5be` → RED naming R1–R4
   (verified: god `exit 1`, dead `exit 1`, tag-parity `exit 1`, gen-ci `exit 1`; gate-script-parity + storybook-complete
   + close-battery PASS, so the FAST sweep reds ON THE 4 — the exact at-HEAD anchor the re-spec demands). `proof:close-
   sweep` is born-RED because its `--run sweep`-clean precondition fails at HEAD AND (if the flags/canon/hook are not yet
   wired) C2–C4 red.
2. **GREEN after the P-CLOSE atomic fix-wave** (the sibling prototype: the 6-gate atomic R2 delete + the ladder/shell
   carve + the `gates:emit-ci` + the tag promotion). After R1–R4 clear AND the 8 `closeDisease:true` flags + the runner +
   the commit-hook arm + the canon land, `gates:sweep` → clean, `proof:close-sweep` C1–C6 GREEN.
3. **The clause-6 differential** (every run, device-free): the six injected fixtures asserted as a subprocess exit
   differential (§4). The exit-0-on-fail + gen-ci-fresh + class-gate-no-flag legs are the binding witnesses that neither
   `$?` alone nor a fixed list is trusted.
4. **The commit-bite live proof** (in the P-CLOSE worktree): a synthetic commit growing a `src/styles/` file to 501L →
   the hot-file arm fires `gates:sweep-fast` → blocks the commit naming R1. (The bite is EXERCISED, not asserted.)

---

## 6. THE ≥2-CONSUMER ACCOUNTING — settled honestly (the re-spec demands it)

P3 claimed "≥2-consumer bar MET — three automated consumers." **That over-claims.** Audited honestly, only ONE of P3's
three is automated; the other two are human/orchestrator DISCIPLINE. The re-spec says: **BUILD the engine env-export OR
drop the "automated" label.** Both options are specced; the recommended one is named.

| P3 consumer | What it actually is | Automated? |
|-------------|---------------------|------------|
| #1 `.githooks/commit-msg` hot-file arm | a git-hook that FIRES `gates:sweep-fast` on a hot diff | **YES — automated** (a process executes it) |
| #2 per-wave PRE-FLIP discipline | a run-log stamp protocol an agent/human follows | NO — discipline (no process enforces the stamp) |
| #3 per-band PRE-CLOSE full sweep | the existing `proof:full` an agent runs at a band boundary | NO — discipline (no process triggers it) |

**OPTION A (PREFERRED) — build a genuine 2nd automated consumer via an engine env-export.** The execution engine
(`bg-bh-execute.wf.js`) is the natural 2nd automated trigger: at a wave's flip-to-PAINT-PENDING/DONE step, the engine
SPAWNS `npm run gates:sweep-fast` (exporting `GLASS_UI_ACTIVE_TRANCHE=BG`) and refuses the flip if it reds — the run-log
stamp `sweep:clean@<sha>` becomes a MACHINE-WRITTEN fact, not a human promise. This is ~6 LOC in the engine's flip step
+ the env-export. With this, the bar is **MET with TWO automated consumers** (the commit-hook bite + the engine flip-gate)
+ ONE discipline (the band-boundary `proof:full`). `proof:close-sweep` C4 already asserts the commit-hook arm; add a C4b
asserting the engine flip-step contains the `gates:sweep-fast` spawn (a source-grep over `bg-bh-execute.wf.js`).

> **Fence note:** the engine env-export must set `GLASS_UI_ACTIVE_TRANCHE` for the spawn ONLY (the commit-hook + the FAST
> tier read it); it never moves/touches a sibling tree (the foreign-tree fence). The spawn is `spawnSync(npm, ["run",
> "gates:sweep-fast"], {cwd: ROOT, env: {...process.env, GLASS_UI_ACTIVE_TRANCHE: "BG"}})` — entirely in-repo.

**OPTION B (fallback) — drop the "automated" label.** If the engine wiring is deferred, record honestly: ONE automated
consumer (the commit-hook bite) + TWO standing DISCIPLINES (the per-wave flip-gate + the band-boundary full sweep). The
≥2-consumer bar for a process discipline is then met by the **ONE automated guard + the recorded protocol**, with the
wording corrected (no "automated" claim on #2/#3). This is acceptable for a process gate (the bar is about real,
exercised guards, not a primitive's binary-consumer count), but it is WEAKER — Option A is preferred because it converts
the per-flip stamp from a promise to a machine fact, closing the "4 live-fix commits landed WITHOUT re-checking the
close" hole that re-seeded the disease in the first place.

### The three cadences (consumer mechanics)

**CONSUMER 1 — `.githooks/commit-msg` (the FAST hot-file bite), append after the existing ledger bite:**

```sh
# .githooks/commit-msg — append after the ledger bite (BG.W-CLOSE-SWEEP)
TRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"
if [ -n "$TRANCHE" ]; then
  HOT=$(git diff --cached --name-only | grep -E '^(scripts/gates\.mjs|scripts/proof-.*\.mjs|package\.json|\.github/workflows/ci\.yml|src/styles/)' || true)
  if [ -n "$HOT" ]; then
    npm run --silent gates:sweep-fast || {
      echo ""
      echo "commit blocked: the close-disease sweep (FAST) RED — this commit re-seeds a sibling close gate."
      echo "  R1 no-god-module: carve/ratchet-rebaseline the CSS file (>500L)."
      echo "  R2 no-dead-token: delete the WHOLE orphaned token sub-cascade atomically."
      echo "  R3 gen-ci-fresh : run \`npm run gates:emit-ci\` and commit ci.yml."
      echo "  R4 tag-parity   : add the \"ci\" tag or record JUSTIFIED_LOCAL_ONLY."
      echo "  (Run the full \`npm run gates:sweep\` + \`proof:full\` siblings-absent before the band closes.)"
      exit 1
    }
  fi
fi
```

The hook fires ONLY when `GLASS_UI_ACTIVE_TRANCHE` is exported AND the diff touches a HOT file — non-hot commits pay
zero; it NEVER bricks a commit on an unset env or a non-hot diff (the ledger bite's exact restraint).

**CONSUMER 2 — the engine flip-gate (Option A) / the per-wave PRE-FLIP discipline (Option B).** Under Option A the
engine spawns `gates:sweep-fast` at the flip step and writes `sweep:clean@<sha>` to the run-log. The
`EXECUTION-PROGRESS.md` Legend gains:

```
> FLIP GATE (BG.W-CLOSE-SWEEP): a flip to PAINT-PENDING/DONE on any gate-minting or CSS-cascade-touching wave
> requires `npm run gates:sweep-fast` clean, recorded `sweep:clean@<sha>` in the row (the engine writes it
> automatically under GLASS_UI_ACTIVE_TRANCHE). The sweep is the close-disease guard — it catches the
> wave-greens-own-gate/leaves-sibling-RED class BEFORE the band re-opens the close.
```

**CONSUMER 3 — the per-band PRE-CLOSE full sweep (siblings-absent, the CI-accurate run).** Before a workstream's LAST
wave flips DONE, run the CI-accurate `proof:full` siblings-absent in a FRESH `/tmp` throwaway worktree (NEVER touching
`~/Programming` — the foreign-tree fence is ABSOLUTE):

```sh
git worktree add /tmp/bg-sweep-$(date +%s) HEAD
cd /tmp/bg-sweep-*                                  # siblings-absent BY CONSTRUCTION (fresh checkout)
CI=true npm ci && CI=true npm run proof:full        # the deduped union, release.yml-accurate (incl. gate-manifest-sound)
node scripts/verify-siblings-intact.mjs --quiet     # BEFORE + AFTER (the park-not-restored tripwire)
git worktree remove /tmp/bg-sweep-*
```

This is the existing T2 (`proof:full`) — the discipline NAMES it as the band-boundary obligation; it is not a new
mechanism. The siblings-absent emulation is the sanctioned `/tmp`-worktree path, NEVER a sibling park/move.

---

## 7. FEASIBILITY VERDICT + RESOLVED MUST-RESOLVES

**feasible: YES — high confidence.** Every load-bearing precondition was MEASURED at HEAD `b716b5be`:

- the 4 WS3 reds reproduce (exit codes captured); the disease is real + current.
- the FAST sweep (7 gates) is **~1.8s** (negligible per-commit/per-flip cost); gate-manifest-sound is the SOLE cost
  driver at 112s → routed CLOSE-ONLY; `proof:full` is the existing band run.
- `gatesFor` special-cases `"full"` cleanly → `"sweep"`/`"sweep-fast"` are a one-block addition; `runMode` is already
  execSync-throw-faithful; the `--run`/`--list` dispatch is extensible.
- the locking-gate + cadence idioms exist verbatim (`proof:strict-freshness-armed` armed differential, the
  `close-battery-parity` pure-`evaluate`/`--selftest`, the `commit-msg` active-tranche-gated bite).
- the dual-signal hazard is precisely mechanizable — proven necessary in BOTH directions (gen-ci-fresh writes no JSON →
  exit leg mandatory; a future exit-0-on-fail → JSON leg mandatory).

**The three re-spec must-resolves, SETTLED:**

1. **Completeness clause (the headline).** RESOLVED — the `closeDisease:true` manifest flag applied to all 8 such gates
   NOW; SWEEP_SET DERIVED from the flag (never a hand-list); `proof:close-sweep` C2 asserts `every audited-class gate
   carries the flag` (the inverse-bite, born-RED anchored to the 4-at-HEAD set, `["local"]`-tagged so a ci tag does not
   re-seed R3). The P3 OQ-1 is promoted to a tested clause-6 bite.
2. **Tier re-cost against the COMPLETE set.** RESOLVED with MEASURED timings — the COMPLETE set adds gate-script-parity
   (0.4s) + storybook-complete (0.4s), NOT a cost blowup; gate-manifest-sound (112s) is the sole driver AND is
   realDefect=FALSE at HEAD (R6-PERSISTED stale-π JSON + CLEAN-TREE dirty-tree), so it is `closeDiseaseTier: "close"` →
   excluded from the FAST per-flip tier, included at T2. T0 == T1 == SWEEP_SET_FAST (the P3 T0/T1 split retired). Ledger
   gates are the PAINT class, NOT closeDisease — they do not enter SWEEP_SET.
3. **Honest ≥2-consumer accounting.** RESOLVED — Option A (BUILD the engine env-export `gates:sweep-fast` spawn at the
   flip step) gives TWO genuine automated consumers (commit-hook + engine flip-gate) + ONE discipline; Option B (drop the
   "automated" label) records ONE automated + TWO disciplines honestly. Option A is RECOMMENDED (it closes the
   landed-without-re-checking hole). P3's "3 automated" over-claim is corrected.

**Out of scope (named so the next audit does not re-flag).** The sweep is the REGISTRATION/CASCADE-bookkeeping net — it
catches R1–R4-class reds. It does NOT catch the field-composited-AA class (P-FIELD-AA's `proof:field-aurora`) nor the
silent semantic regression (the dock-saturate ±2% brightness phantom under a radius-only gate — P-CLOSE's paint sign-off).
The sweep is the close-disease net, not the paint net; the two are complementary, both standing.

---

## Appendix — measured evidence (RUN at HEAD `b716b5be`, 2026-06-30)

```
verify-siblings-intact --quiet             → exit 0 (before + after)
proof:no-god-module                         → exit 1   ~0.2s  JSON status:"fail"   (ladder.css 527L, shell.css 510L)
proof:no-dead-token                         → exit 1   ~0.2s  JSON status:"fail"   (--glass-blur-dock: zero readers)
proof:tag-parity                            → exit 1   ~0.1s  JSON status:"fail"   (category-card-warm ["local"]-only)
proof:gen-ci-fresh                          → exit 1   ~0.1s  NO JSON (throw/print) (glass-idiom-factor ci-tagged, ci.yml not re-emitted)
proof:gate-script-parity                    → exit 0    0.38s JSON                  (manifest↔script bijection PASS)
proof:storybook-complete                    → exit 0    0.41s JSON status:"PASS"    (story-registration census PASS)
proof:close-battery-parity                  → exit 0   ~0.4s  JSON                  (GREEN: proves the PATH, not the battery)
proof:gate-manifest-sound                   → exit 1  ~112s   JSON status:"FAIL"    (R6-PERSISTED stale-π JSON + CLEAN-TREE dirty tree — realDefect=FALSE)
proof:live-verified-ledger:bb               → exit 0    0.29s                       (PAINT class — NOT closeDisease)
FAST sweep (7 gates, no gate-manifest)      → ~1.8s total
gates:emit-ci npm key                       → present ✓        (the R3 remedy, already wired)
gen-ci-fresh writes JSON?                   → NO (grep writeGateArtifact|.cache/gates → 0) → JSON-only aggregate MISSES it ✓ (dual-signal needed)
all 8 closeDisease candidates device-free   → ✓ (no PW_BIN/page.goto spawn in any)
all 8 closeDisease candidates ∈ --run full  → ✓
```
