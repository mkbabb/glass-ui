# O.W5 Lane A — `proof:all` cohort runner proof

**Lane**: O.W5 Lane A
**Worktree**: `agent-a15798c44775597b1`
**Branch**: `worktree-agent-a15798c44775597b1`
**Source**: `docs/tranches/O/waves/W5.md` §Lane A; `docs/tranches/O/research/Repsilon-pipeline-orchestration.md` §"orchestration improvement 1" / §"Layer B — `proof:all` cohort runner".

## Disposition

**Option A — Inline npm-script chain.**

Rationale:

- The 5 `proof:*` scripts compose mechanically: each is an isolated, self-contained gate (synthetic-probe, static scan, build, runtime). No cross-script state to thread; no logging-shape contract worth standardizing in a bash wrapper.
- npm's `&&` chain delivers the canonical fail-fast semantic: the first non-zero exit halts the cohort, and stdout/stderr already stream from the child process for free.
- W5.md §Lane A guidance: "if orchestration logic is non-trivial, add `scripts/proof-all.sh`". The orchestration logic here is one operator (`&&`) repeated 4 times. Below the non-triviality threshold.
- Rε §Layer B literal recommendation matches: `"proof:all": "npm run proof:package && npm run proof:theme && npm run proof:consumers:static && npm run proof:consumers:build && npm run proof:runtime"`.

Order rationale (cheap → expensive, structural → behavioral):

1. `proof:package` — packs the tarball, install probe; structural shape gate.
2. `proof:theme` — synthetic vite build with a probe entry; in-process, no external repos.
3. `proof:consumers:static` — static AST scan of sibling consumer imports; reads files only.
4. `proof:consumers:build` — runs `npm run build` in 4 sibling consumer repos; expensive but isolated.
5. `proof:runtime` — spawns `npm run dev` + headless Chrome over 137 routes; most expensive, last so it never runs when earlier gates have already failed.

This is identical to the Rε literal except `proof:theme` is reordered ahead of `proof:consumers:static` to keep "synthetic before sibling-dependent" — both are cheap, the swap doesn't change asymptotic cost but tightens the failure-locality argument (theme failures are library-local; consumers failures are environment-local). Adopting Rε's literal order verbatim would also be defensible; I went with package → theme → consumers:static → consumers:build → runtime per Rε's own write-up.

## File changes summary

Single 1-line addition to `package.json` scripts block:

```diff
@@ -339,6 +339,7 @@
         "proof:consumers:build": "bash scripts/proof-consumers-build.sh",
         "proof:runtime": "node scripts/proof-runtime.mjs",
         "proof:theme": "node scripts/proof-theme-style.mjs",
+        "proof:all": "npm run proof:package && npm run proof:theme && npm run proof:consumers:static && npm run proof:consumers:build && npm run proof:runtime",
```

No wrapper script; no other files touched in this lane's bounds.

## Verification

### Structural verification

`npm run` lists the new script:

```
proof:package
proof:consumers:static
proof:consumers:build
proof:runtime
proof:theme
proof:all
    npm run proof:package && npm run proof:theme && npm run proof:consumers:static && npm run proof:consumers:build && npm run proof:runtime
```

JSON validity confirmed via `node -e "require('./package.json').scripts['proof:all']"` — script string round-trips intact.

### Behavioral verification

`npm run proof:all` invokes the cohort. In this worktree the chain halts at step 1 (`proof:package`) due to a pre-existing environmental issue: `proof-package.mjs` packs the lib into a temp fixture and runs `npm install --ignore-scripts`, which fails ERESOLVE because the worktree's `@mkbabb/keyframes.js` peer-dep points at `file:/Users/mkbabb/Programming/glass-ui/.claude/worktrees/keyframes.js` — a path not present from the temp fixture's resolution root.

This is NOT a `proof:all` defect — it is environmental drift in this specific worktree's `package-lock.json` keyframes.js path. The same `npm run proof:package` invocation fails identically outside `proof:all`. The `&&` chain behaved correctly: the first non-zero exit halted the cohort before `proof:theme` ran. Verified fail-fast semantics.

A separate quick run of `npm run proof:consumers:static` exited 1 with an L.W2-era export-surface drift in `docs/tranches/F/audit/W1-consumers-static.json` (an F.W1 snapshot is stale vs the current root barrel — unrelated to Lane A scope; a separate snapshot-refresh chore).

These failures both predate this lane and would surface under any orchestration shape (manual sequential invocation, `proof:all`, or `release.sh`). The lane deliverable — wiring the chain so a single command invokes all 5 — is complete and provably fail-fast.

### Worktree diff verification

`git diff --stat` at lane close:

```
docs/tranches/F/audit/W1-consumers-static.json | 362 +++++++++++++++++++++++--
docs/tranches/F/audit/W1-package-proof.json    |  36 +--
package.json                                   |   1 +
```

- `package.json`: the intentional 1-line Lane A change.
- The two `docs/tranches/F/audit/*.json` files: snapshot side-effects from running `proof:consumers:static` and `proof:package` during verification. These auto-write on each invocation per their own design. They are out of Lane A bounds and the orchestrator can revert them at integration time (read-only-git clause prevents this agent from staging/discarding).

No other files touched.

## Open questions for orchestrator

1. **F.W1 snapshot drift**: `docs/tranches/F/audit/W1-consumers-static.json` and `W1-package-proof.json` are stale at HEAD vs current export surface (L.W2 promotions). Likely a separate snapshot-refresh chore — out of W5 scope. Should it land as a W5 cleanup lane or a separate one-off commit?

2. **CI invocation**: per Rε §"Layer E — CI gate expansion" (= Lane E), CI will need to decide whether to invoke `proof:all` directly or cherry-pick a fast subset (`proof:package` + `proof:theme` + `proof:consumers:static`) that doesn't require sibling consumer repos. Recommendation: Lane E uses the cherry-picked CI-safe subset and leaves `proof:all` for local + release-path invocation only. Confirmed in Rε §R3 + §R6.

3. **`release.sh` integration**: should `release.sh` (Lane B + D) call `npm run proof:all` directly, or keep its current per-step invocation? `proof:all` was authored as a consumer-facing single entry point; integrating it into `release.sh` is a Lane B/D decision, not Lane A's.

4. **Order locked-in?**: I picked package → theme → consumers:static → consumers:build → runtime. Rε's literal order is package → theme → consumers:static → consumers:build → runtime (same). No deviation; flagging for the record.

## Bounds compliance

- Touched: `package.json` (1 script entry); this proof doc.
- Did NOT touch: `scripts/release.sh`, `scripts/freshness-gate.mjs`, `scripts/freshness-walk.mjs` (n/a — doesn't exist yet), `src/freshness.ts`, `.github/workflows/`.
- No git mutations (read-only git clause honored).
- No wrapper script created (Option A; Option B not warranted per dispatch + W5.md guidance).

## Status

**Complete.** `proof:all` ships as a single-line npm-script chain in `package.json`; fail-fast verified; pre-existing per-script failures are out of Lane A scope and documented for the orchestrator.
