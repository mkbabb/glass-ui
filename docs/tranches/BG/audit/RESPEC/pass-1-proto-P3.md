# P3 — The standing per-band close-battery sweep discipline (PROTOTYPE-AUGMENTED SPEC, PASS 1)

**Item:** Standing per-band close-battery sweep discipline (process spec) · **Class:** spec · **Date:** 2026-06-30
**HEAD:** `9dfe285c` · **branch:** `tranche/BG` · **Fence:** read-mostly; this spec wrote ONLY under `RESPEC/`. All
empirical claims below were RUN at HEAD (exit codes + timings are measured, not asserted).

**feasible: YES.** The mechanism reuses three proven in-repo idioms (the `gatesFor("full")` special-case, the
`proof:strict-freshness-armed` armed-subprocess self-test, the `.githooks/commit-msg` active-tranche-gated bite).
Every empirical precondition checked out: the 4 WS3 reds reproduce at HEAD, the fast sweep runs in ~1s, the full
sweep in ~2min, and the "trust JSON not `$?`" hazard is real and precisely mechanizable (see §2.3).

---

## 0. The disease, prototyped against the WS3 recurrence (verified at HEAD)

The recurring/compounding class is **wave-greens-own-gate / leaves-sibling-RED**: a wave that mints a gate or
re-points a CSS token greens its OWN deliverable gate but silently REDs a *registration/cascade-bookkeeping*
sibling gate that no per-wave check looks at. The SYNTH fix-wave cured 9–12 of these once (≤`ff0933a3`); WS3
re-seeded **four** of the exact same class three commits later. Reproduced live (every gate RUN at HEAD):

| # | Gate | Verdict at HEAD (measured) | Re-seeding wave/commit | Class |
|---|------|----------------------------|------------------------|-------|
| R1 | `proof:no-god-module` | `exit=1` — `shell.css` 510L, `ladder.css` 527L (> 500, not ratchet-baselined) | 6ec81de (3.7) + cd9ce46 (3.6) | CSS line-growth |
| R2 | `proof:no-dead-token` | `exit=1` — `--glass-blur-dock` declared, **zero readers** (3-deep orphan chain) | cd9ce46 (3.6) | token re-point orphan |
| R3 | `proof:gen-ci-fresh` | `exit=1` — `glass-idiom-factor` ci-tagged but `ci.yml` not re-emitted | 6ec81de (3.7) | ci.yml drift |
| R4 | `proof:tag-parity` | `exit=1` — `proof:category-card-warm` `["local"]`-only (RED on master / green in CI) | 9e13965d (10.25) | tag mis-registration |

**Why no existing guard catches this mid-tranche.** `proof:close-battery-parity` is GREEN at HEAD (`exit=0`) — it
proves the close *path* runs `--run full`; it does **not** prove the battery *passes*. The full battery (`--run
full`) WOULD catch all four — but it only runs at the irreversible tag (release.sh / release.yml). Between tag and
tag there is **no standing discipline** that re-runs the close-disease subset as waves land. With ~110 PENDING waves
and the MAJORITY minting a gate or touching the glass cascade, every band re-seeds this absent a guard, and the debt
compounds un-tracked until the close re-opens.

**The exit-code-vs-JSON hazard (gap #7), grounded.** Two faithfulness facts measured at HEAD:
- The 6 close-disease gates **do** exit faithfully (5 exit `1` on FAIL; `close-battery-parity` exits `0` only
  because it is genuinely PASS). So an `execSync`-throws aggregate is faithful **for this set today**.
- BUT `proof:gen-ci-fresh` writes **no JSON artifact** (it `throw`s/prints), while the other five DO write
  `.cache/gates/<name>.json` with a `status: "pass"|"fail"` field. So a JSON-only aggregate would **miss
  gen-ci-fresh**, and an exit-only aggregate would miss a (hypothetical or future) gate that prints `status: FAIL`
  but `process.exit(0)`. **Neither signal alone is sufficient** — the sweep MUST read both (§2.3). A naive fix-agent
  running `node scripts/proof-X.mjs; echo $?` per-script is exactly the false-green this discipline forbids.

---

## 1. The shape: a named close-disease sweep, three cadences, one locking gate

```
SWEEP_SET (the close-disease subset of --run full)
   proof:no-god-module · proof:no-dead-token · proof:tag-parity
   proof:gen-ci-fresh   · proof:gate-manifest-sound · proof:close-battery-parity
        │
        ├── gates.mjs `--run sweep`  (the faithful aggregate: execSync-throws + JSON-status)
        │        ↑ npm `gates:sweep`
        │
        ├── CONSUMER 1 — .githooks/commit-msg  (FAST tier, hot-file+tranche gated, ~1s)
        ├── CONSUMER 2 — the per-wave PRE-FLIP discipline (orchestrator runs `gates:sweep` before
        │                any PAINT-PENDING→DONE flip; records `sweep:clean@<sha>` in the run-log)
        └── CONSUMER 3 — the per-band PRE-CLOSE full sweep (`proof:full` siblings-absent in a
                         /tmp throwaway worktree, before a workstream's last DONE flip)
        │
   LOCKED BY  proof:close-sweep  (the armed-witness meta-gate, local+ci tagged → rides --run full)
```

Three cadences, escalating cost, each catching the disease earlier than the tag:

| Tier | Trigger | Set | Cost (measured) | Trust model |
|------|---------|-----|-----------------|-------------|
| **T0 fast bite** | every commit touching a HOT file, `GLASS_UI_ACTIVE_TRANCHE` set | the 5 FAST gates (no gate-manifest-sound) | **~1s** (god 0.2 + dead 0.2 + tag-parity 0.1 + gen-ci 0.1 + close-battery 0.4) | execSync-throws + JSON-status |
| **T1 wave pre-flip** | before any `PAINT-PENDING`/`DONE` flip on a gate-minting or CSS-touching wave | full SWEEP_SET (incl. gate-manifest-sound) | **~2min** (gate-manifest-sound = 112s parity pre-pass) | execSync-throws + JSON-status |
| **T2 band pre-close** | before a workstream's last DONE flip / before the cut | `proof:full` siblings-absent in `/tmp` worktree | ~10min+ (build + ~200 gates) | the existing faithful `runMode` (execSync-throws) |

T0/T1 share ONE runner (`--run sweep`) differing only by an env-selected subset; T2 is the existing `proof:full`
unchanged. gate-manifest-sound's 112s parity pre-pass is the reason it is EXCLUDED from the per-commit bite (T0) and
INCLUDED at the per-wave flip (T1) — its class (cmd-less rows, unmanifested `proof:*` keys, non-`:5199` defaults) is
re-seeded by a gate-MINTING wave, which is exactly a PAINT-PENDING→DONE flip event, not every CSS tweak.

---

## 2. The mechanism (exact files, exact edits)

### 2.1 `scripts/gates.mjs` — the `--run sweep` mode (mirror the `full` special-case)

The SWEEP_SET is an explicit NAMED id list (auditable in one place, the `proof:close-sweep` source-of-truth), and
`gatesFor("sweep")` is special-cased beside `"full"` (line 2305). The FAST subset is selected by an env flag so T0
and T1 share the runner.

```js
// scripts/gates.mjs — beside GATES (line 62)

// BG.W-CLOSE-SWEEP — the close-disease subset: the registration/cascade-bookkeeping
// gates a single wave's diff can clobber while greening its own deliverable. The
// recurring `wave-greens-own-gate / leaves-sibling-RED` class (the WS3 recurrence
// re-seeded R1-R4 three commits after the SYNTH fix-wave cured it). This set is the
// SUBSET of `--run full` that a PAINT-PENDING→DONE flip MUST re-clear; `proof:close-
// sweep` asserts it is complete + the runner is faithful (JSON-status, not just $?).
export const SWEEP_SET = [
    "proof:no-god-module",        // CSS line-growth past 500 (R1)
    "proof:no-dead-token",        // token re-point orphan (R2)
    "proof:tag-parity",           // a new gate registered local-only (R4)
    "proof:gen-ci-fresh",         // ci.yml drift after a ci-tagged gate lands (R3)
    "proof:gate-manifest-sound",  // cmd-less row / unmanifested proof:* / non-:5199 default
    "proof:close-battery-parity", // the close path still runs --run full
];
// The FAST subset (T0 per-commit bite) drops the 112s parity pre-pass.
export const SWEEP_SET_FAST = SWEEP_SET.filter((id) => id !== "proof:gate-manifest-sound");
```

```js
// scripts/gates.mjs — inside gatesFor(mode), beside `if (mode === "full")` (line 2305)
    if (mode === "sweep" || mode === "sweep-fast") {
        // The close-disease subset, in manifest order, deduped. The FAST variant
        // (per-commit) drops gate-manifest-sound's parity pre-pass. proof:close-sweep
        // asserts SWEEP_SET ⊆ the full union (no sweep gate can be untagged/dropped).
        const ids = new Set(mode === "sweep-fast" ? SWEEP_SET_FAST : SWEEP_SET);
        return GATES.filter((g) => ids.has(g.id));
    }
```

`runMode` (line 2320, unchanged) already runs the set via `execSync(...{stdio:"inherit"})` which **throws on any
nonzero child exit** → `process.exit(1)`. So `--run sweep` is faithful for the exit-code leg by construction. The
JSON-status leg is added as a post-pass (§2.3).

### 2.2 `package.json` — the npm keys

```json
"gates:sweep":      "node scripts/gates.mjs --run sweep",
"gates:sweep-fast": "node scripts/gates.mjs --run sweep-fast"
```

`gates:emit-ci` (`node scripts/gates.mjs --emit-ci`) already exists — it is the documented REMEDY when T0/T1 reds R3
(the discipline names it, it is not new).

### 2.3 The JSON-status post-pass — "trust JSON not `$?`" mechanized (THE load-bearing leg)

`runMode`'s execSync-throws catches a child that exits nonzero (gen-ci-fresh, theme-style-style throws). It CANNOT
catch a child that prints `status: FAIL` but `process.exit(0)`. The robust verdict reads BOTH signals and reds if
EITHER shows a problem. Add a thin post-pass to `--run sweep` (a PURE verdict core, the `close-battery-parity`
`evaluate(input)` precedent, so the self-test injects synthetic child-results without spawning anything):

```js
// scripts/gates.mjs — the sweep verdict core (PURE, injectable for the self-test)

// The cache filename each sweep gate writes (gateArtifactPath cacheName); a gate that
// writes NO artifact is `null` (gen-ci-fresh throws/prints — caught by the exit leg).
export const SWEEP_ARTIFACTS = {
    "proof:no-god-module":        ".cache/gates/AV-no-god-module.json",
    "proof:no-dead-token":        ".cache/gates/no-dead-token.json",
    "proof:tag-parity":           ".cache/gates/AY-tag-parity.json",
    "proof:gen-ci-fresh":         null, // no JSON — exit-code is its only signal
    "proof:gate-manifest-sound":  ".cache/gates/AZ-gate-manifest-sound.json",
    "proof:close-battery-parity": ".cache/gates/BB-close-battery-parity.json",
};

/**
 * The DUAL-SIGNAL verdict. A sweep child is GREEN iff it exited 0 AND (if it wrote a
 * JSON artifact) that artifact's `status === "pass"`. Reds if EITHER signal fails —
 * so a child that prints status:FAIL but exits 0 (the gap-#7 false-green) STILL reds,
 * and a child that throws/exits-nonzero without a JSON artifact (gen-ci-fresh) STILL
 * reds. Neither `$?` alone nor JSON alone is trusted.
 * @param {{id:string, exit:number, artifactStatus:string|null}[]} results
 * @returns {string[]} violations (empty = clean)
 */
export function sweepVerdict(results) {
    const v = [];
    for (const r of results) {
        if (r.exit !== 0)
            v.push(`${r.id}: exit ${r.exit} (the gate REDs — re-clear before the flip)`);
        else if (r.artifactStatus != null && r.artifactStatus !== "pass")
            v.push(`${r.id}: exit 0 but JSON status="${r.artifactStatus}" (the exit-0-on-fail false-green — gap #7)`);
    }
    return v;
}
```

The real `--run sweep` populates `results` by spawning each gate (capturing `status`) THEN reading its
`SWEEP_ARTIFACTS[id]` JSON `status` (when non-null), and prints/exits on `sweepVerdict(results)`. The point is not
to replace `runMode` but to wrap it with the JSON-status assertion so a fix-agent never relies on bare `$?`.

> **The standing RULE (record in CLAUDE.md + every fix-agent prompt):** a wave/band is GREEN only off
> `npm run gates:sweep` (or `proof:full`) — **never** off a per-script `node scripts/proof-X.mjs; echo $?`. `$?`
> cannot distinguish `pass` from `skipped` (a grace-skipped live-π gate exits 0 with `status:"skipped"` — NOT a
> verified pass) and cannot catch an exit-0-on-fail. The aggregate runner + the JSON-status post-pass is the only
> trusted signal.

---

## 3. The locking gate — `proof:close-sweep` (the armed-witness)

A latent discipline that nothing exercises is the L14 no-op class (the very failure `proof:strict-freshness-armed`
was minted to kill). `proof:close-sweep` is the load-bearing witness that the sweep is **complete + armed + faithful
+ recorded**. Device-free; `["local","ci"]` (so it rides `--run full` itself — the sweep guards itself at the
close). It is the structural twin of `proof:close-battery-parity`, NOT a fold of it (close-battery-parity proves the
close PATH; close-sweep proves the per-wave/per-band PRE-FLIP discipline).

```js
// scripts/proof-close-sweep.mjs — BG.W-CLOSE-SWEEP (clause sketch)
import { GATES, gatesFor, SWEEP_SET, SWEEP_SET_FAST, sweepVerdict } from "./gates.mjs";

function evaluate(input) {
    const v = [];

    // C1 — SWEEP_SET ⊆ the full union (every sweep gate is real + tagged so --run full
    //      runs it too; a typo'd / dropped / untagged sweep id reds).
    const fullIds = new Set(gatesFor("full").map((g) => g.id));
    for (const id of SWEEP_SET)
        if (!fullIds.has(id)) v.push(`[C1] sweep gate ${id} is not in --run full (untagged/typo'd)`);

    // C2 — the COMPLETENESS floor: every gate whose CLASS a wave-diff can clobber while
    //      greening its own deliverable IS in SWEEP_SET. The recurring class registry
    //      (no-god-module/no-dead-token/tag-parity/gen-ci-fresh/gate-manifest-sound/
    //      close-battery-parity) is the audited set; a NEW registration/cascade-
    //      bookkeeping gate minted later must be ADDED here (a census assert against the
    //      `["local","ci","release"]`-tagged meta-gate cohort — see §6 open question).
    for (const id of input.requiredClassGates)
        if (!SWEEP_SET.includes(id)) v.push(`[C2] ${id} is a close-disease class gate absent from SWEEP_SET`);

    // C3 — the runner is wired (npm gates:sweep + gates:sweep-fast) and CLAUDE.md records
    //      the trust-JSON-not-$? rule + the three-cadence discipline.
    if (!input.npmSweep)      v.push("[C3] package.json has no `gates:sweep`");
    if (!input.npmSweepFast)  v.push("[C3] package.json has no `gates:sweep-fast`");
    if (!input.claudeCanon)   v.push("[C3] CLAUDE.md does not record the close-sweep discipline (trust JSON-not-$?, 3 cadences)");

    // C4 — the commit-msg bite carries the hot-file-gated sweep arm (CONSUMER 1).
    if (!input.commitHookArm) v.push("[C4] .githooks/commit-msg has no hot-file-gated gates:sweep-fast arm");

    return v;
}
```

**Clause 5 — the structural subprocess self-test (the verifying π for a process gate).** The `evaluate`/
`syntheticInput`/`--selftest` differential of `proof:close-battery-parity` clause-5 + `proof:strict-freshness-armed`,
applied to `sweepVerdict`. Three injected fixtures asserted as a subprocess differential:

| fixture | injected `results` | expected | proves |
|---------|---------------------|----------|--------|
| **re-seeded** | `[{id:"proof:no-god-module", exit:1, artifactStatus:"fail"}]` | exit 1 | a WS3-class red is caught (R1-R4 reproduce) |
| **exit-0-on-fail** | `[{id:"x", exit:0, artifactStatus:"fail"}]` | exit 1 | the gap-#7 false-green is caught by the JSON leg (the load-bearing bite) |
| **clean** | every child `{exit:0, artifactStatus:"pass"}` | exit 0 | the differential is meaningful, not a flat always-red |

The **exit-0-on-fail** fixture is the one that distinguishes this gate from a naive `$?` aggregate — if the JSON-leg
were dropped, that fixture would wrongly GREEN, and clause-5 reds. So the JSON-not-`$?` binding cannot silently
un-arm (the `proof:strict-freshness-armed` differential discipline, transposed).

---

## 4. The cadence binding — the consumers (≥2, automated)

### CONSUMER 1 — `.githooks/commit-msg` (the FAST hot-file bite), mirroring the ledger bite

Append a second arm to the existing hook (the `GLASS_UI_ACTIVE_TRANCHE`-gated, SKIP-when-unset pattern is reused
verbatim). It fires `gates:sweep-fast` (~1s) ONLY when the commit touches a HOT file — gates.mjs / package.json /
ci.yml / `src/styles/**` / the gate scripts — so non-hot commits pay zero, and CSS/registration commits cannot land
a re-seeded red:

```sh
# .githooks/commit-msg — append after the ledger bite (BG.W-CLOSE-SWEEP)
TRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"
if [ -n "$TRANCHE" ]; then
  HOT=$(git diff --cached --name-only | grep -E '^(scripts/gates\.mjs|scripts/proof-.*\.mjs|package\.json|\.github/workflows/ci\.yml|src/styles/)' || true)
  if [ -n "$HOT" ]; then
    npm run --silent gates:sweep-fast || {
      echo ""
      echo "commit blocked: the close-disease sweep (FAST) RED — this commit re-seeds a sibling close gate."
      echo "  R1 no-god-module: carve/ratchet-rebaseline the CSS file (> 500L)."
      echo "  R2 no-dead-token: delete the WHOLE orphaned token sub-cascade atomically."
      echo "  R3 gen-ci-fresh : run \`npm run gates:emit-ci\` and commit ci.yml."
      echo "  R4 tag-parity   : add the \"ci\" tag or record JUSTIFIED_LOCAL_ONLY."
      echo "  (Run the full \`npm run gates:sweep\` before flipping the wave to DONE/PAINT-PENDING.)"
      exit 1
    }
  fi
fi
```

> NOTE the fence: this hook runs only when `GLASS_UI_ACTIVE_TRANCHE` is exported (the dev/CI loop sets it; a casual
> `git commit` outside the build does not). It NEVER bricks a commit on an unset env or a non-hot diff — the ledger
> bite's exact restraint.

### CONSUMER 2 — the per-wave PRE-FLIP discipline (the orchestrator cadence + the run-log stamp)

The `EXECUTION-PROGRESS.md` flip protocol gains a recorded gate: a wave's status may flip `BUILDING →
PAINT-PENDING` (or `→ DONE`) **only** after `npm run gates:sweep` is clean, stamped in the `paint`/`gate` cell as
`sweep:clean@<sha>`. This is the human/agent-discipline half — recorded, auditable in the run-log, and reconcilable
against the commit (the `bg-bh-execute.wf.js` engine asserts the stamp at flip time). The Legend gains a line:

```
> FLIP GATE (BG.W-CLOSE-SWEEP): a flip to PAINT-PENDING/DONE on any gate-minting or CSS-cascade-touching wave
> requires `npm run gates:sweep` clean, recorded `sweep:clean@<sha>` in the row. The sweep is the close-disease
> guard — it catches the wave-greens-own-gate/leaves-sibling-RED class BEFORE the band re-opens the close.
```

### CONSUMER 3 — the per-band PRE-CLOSE full sweep (siblings-absent, the CI-accurate run)

Before a workstream's LAST wave flips DONE (a band boundary), run the CI-accurate `proof:full` siblings-absent in a
FRESH `/tmp` throwaway worktree (NEVER touching `~/Programming` — the foreign-tree fence is absolute):

```sh
git worktree add /tmp/bg-sweep-$(date +%s) HEAD
cd /tmp/bg-sweep-*          # siblings-absent BY CONSTRUCTION (fresh checkout, no siblings linked)
CI=true npm ci && CI=true npm run proof:full   # the deduped union, release.yml-accurate
node scripts/verify-siblings-intact.mjs --quiet   # BEFORE and AFTER (the park-not-restored tripwire)
git worktree remove /tmp/bg-sweep-*               # clean up the throwaway
```

This is the existing T2 (`proof:full`) — the discipline names it as the band-boundary obligation, it is not a new
mechanism. The siblings-absent emulation is the CLAUDE.md-sanctioned `/tmp`-worktree path, NEVER a sibling park/move.

**≥2-consumer bar: MET** — three automated consumers (the commit-msg bite, the orchestrator per-wave flip-gate, the
band-boundary full run), each a distinct cadence, each catching the disease strictly earlier than the irreversible
tag.

---

## 5. The verifying π (the born-RED → GREEN demonstration)

A process gate's "π" is the armed self-test fixture demonstrated against the real recurrence:

1. **Born-RED anchor (the WS3 recurrence at HEAD).** Run `gates:sweep` at HEAD `9dfe285c` → RED naming R1-R4
   (verified: god `exit=1`, dead `exit=1`, tag-parity `exit=1`, gen-ci `exit=1`). This is the on-disk proof the
   sweep BITES the exact class the SYNTH fix-wave cured and WS3 re-seeded.
2. **GREEN after the P2 atomic fix-wave** (the 4-red close-fix, the sibling prototype). After R1-R4 clear,
   `gates:sweep` → clean, `proof:close-sweep` C1-C5 GREEN.
3. **The clause-5 differential** (every run, device-free): the re-seeded + exit-0-on-fail + clean fixtures asserted
   as a subprocess exit differential (§3). The exit-0-on-fail leg is the binding witness that `$?` alone is not
   trusted.
4. **The commit-bite live proof** (in the P2 worktree): a synthetic commit that grows a `src/styles/` file to 501L
   → the hot-file arm fires `gates:sweep-fast` → blocks the commit naming R1. (The bite is exercised, not asserted.)

No `proof:ba-gestalt` row — this is a process/registration discipline, zero pixels (the BB inv: the gestalt bar
binds VISUAL waves; a meta-gate changes no paint).

---

## 6. Feasibility verdict + the two open questions

**feasible: YES — high confidence.** Every load-bearing precondition was MEASURED at HEAD, not assumed:
- the 4 WS3 reds reproduce (exit codes captured); the disease is real and current.
- the FAST sweep is ~1s (negligible per-commit cost); the full sweep ~2min (acceptable per-flip); the band run is
  the existing `proof:full`.
- `gatesFor` special-cases `"full"` cleanly → `"sweep"` is a one-block addition; `runMode` is already
  execSync-throws-faithful; `--list`/`--run` dispatch already extensible.
- the locking-gate + cadence idioms exist verbatim (`proof:strict-freshness-armed` armed self-test, the
  `close-battery-parity` pure-`evaluate`/`--selftest` differential, the `commit-msg` active-tranche-gated bite).
- the gap-#7 hazard is precisely mechanizable (the dual-signal `sweepVerdict` — execSync-throws catches gen-ci-fresh
  which writes no JSON; the JSON-status leg catches a future exit-0-on-fail; neither alone suffices, both together
  do).

**OQ-1 — the C2 completeness floor (how does SWEEP_SET stay complete as new gates land?).** The disease is endemic
precisely because new waves mint new registration/bookkeeping gates. SWEEP_SET must not go stale. Proposed: a
census arm in `proof:close-sweep` C2 that flags a known close-disease-CLASS gate absent from SWEEP_SET. The clean
heuristic: the `["local","ci","release"]`-or-`["ci"]`-tagged **device-free meta-gates that read the gate manifest /
the CSS cascade / package.json** (no-god-module/no-dead-token/tag-parity/gen-ci-fresh/gate-manifest-sound) are the
recurring class; a future such gate carries a `closeDisease: true` manifest flag and C2 asserts `every
closeDisease gate ∈ SWEEP_SET`. This converts SWEEP_SET-completeness from prose to a gate fact. (Recommended; ~15
LOC; resolves the "the sweep set itself silently falls behind" recurrence-of-the-recurrence.)

**OQ-2 — should the commit bite be `commit-msg` or `pre-push`?** `commit-msg` fires per-commit (the ~1s FAST tier
is cheap enough); `pre-push` would batch but lose the per-commit attribution. Recommend `commit-msg` (reuses the
existing hook + the active-tranche gate + per-commit blast-radius is the smaller, more-attributable unit). A team
preferring fewer interrupts can move the arm to a `pre-push` hook at the same ~1s cost amortized over the push.

**What this does NOT solve (out of scope, named so the next audit does not re-flag).** The sweep is a
REGISTRATION/CASCADE-bookkeeping guard — it catches R1-R4-class reds. It does NOT catch the field-composited-AA class
(the 2.2 FIELD-AURORA device-free-green-but-1.04:1 defect — that is P6's `proof:field-aurora`) nor the silent
semantic regression (the dock-saturate revert under a radius-only gate — that is P2's paint sign-off). The sweep is
the close-disease net, not the paint net; the two are complementary, both standing.

---

## Appendix — measured evidence (RUN at HEAD `9dfe285c`, 2026-06-30)

```
verify-siblings-intact --quiet            → exit 0
proof:no-god-module                        → exit 1   0.2s  (shell.css 510L > 500)
proof:no-dead-token                        → exit 1   0.2s  (--glass-blur-dock: zero readers)
proof:tag-parity                           → exit 1   0.1s  (category-card-warm ["local"]-only)
proof:gen-ci-fresh                         → exit 1   0.1s  (glass-idiom-factor ci-tagged, ci.yml not re-emitted)
proof:gate-manifest-sound                  → exit 1  112.8s (parity pre-pass — T1-only)
proof:close-battery-parity                 → exit 0   0.4s  (GREEN: proves the PATH, not the battery)
FAST sweep (5 gates, no gate-manifest)     → ~1.0s total
FULL sweep (6 gates)                       → ~1:57 total
--run full membership                      → all 6 sweep gates ∈ --run full ✓
gates:emit-ci npm key                      → present ✓     (the R3 remedy, already wired)
gen-ci-fresh writes JSON?                  → NO (throw/print) → JSON-only aggregate would MISS it ✓ (dual-signal needed)
.cache/gates/<name>.json carries status    → "pass"|"fail" field ✓
```
