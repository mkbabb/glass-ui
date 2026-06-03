# AS.W0 — Lens 5: Precepts + Architecture (gestalt / elegance / no-legacy / no-workaround)

Read-only audit. Hunt: systemic architectural debt, non-gestalt patterns, legacy,
workarounds, and the architectural transpositions that retire them. Ranked by
elegance/simplicity/performance leverage.

The src/ tree is clean on the legacy axis — the "legacy/shim/polyfill" grep hits
in `src/` are all progressive-enhancement feature-detection (`moveBefore.ts`:
"No alias, no polyfill"; `supportsCssTimeline.ts`; `useBreakpoint.ts`) or historical
prose. `cn()`'s hand-rolled deduplicator is a documented 22 KB→0.5 KB perf swap with
≥2 consumers across every CVA component — it CLEARS the bar, not debt. The debt is
entirely in `scripts/` + the gate-artifact layout. Three findings, ranked.

---

## FINDING 1 (HEADLINE) — The constellation is hardcoded FIVE times, already drifting; the session's two "CI-portability" fixes are one-off re-inventions of one missing substrate

**Severity: high. Leverage: high (elegance + correctness + de-dup). Clears the bar: yes (5 consumer scripts).**

### The smell

The `@mkbabb/*` constellation — the sibling publishers + downstream consumers under
the shared PARENT — is encoded independently in FIVE scripts, each re-deriving
`PARENT = dirname(ROOT)` and hardcoding sibling names:

| Script | What it lists | Membership |
|---|---|---|
| `proof-resolution-contract.mjs:73-124` | `PUBLISHER_PACKAGES` + `CONSUMER_REPOS` | glass-ui, keyframes.js, value.js + fourier-analysis/web, **bbnf-buddy**, words/frontend, speedtest |
| `proof-consumers-static.mjs:20-25` | `consumers` | fourier-analysis/web, words/frontend, **bbnf-lang/playground**, speedtest |
| `proof-consumers-build.sh:7-12` | `CONSUMERS` | fourier-analysis/web, words/frontend, **bbnf-lang/playground**, speedtest |
| `proof-phantom-classes.mjs:82-115` | `consumerRepos` | keyframes.js, value.js, fourier-analysis, **bbnf-buddy**, words/frontend, speedtest |
| `proof-package.mjs:9` | `keyframes` sibling | keyframes.js |

The membership has **ALREADY DRIFTED**: the bbnf consumer is `bbnf-buddy` in
`proof-resolution-contract` + `proof-phantom-classes`, but `bbnf-lang/playground` in
`proof-consumers-static` + `proof-consumers-build`. Same constellation, two names,
depending on which gate you read. There is no single source of truth, so the gates
verify partially-disjoint fleets and nobody notices the divergence.

### The session evidence — N one-off patches for one missing abstraction

This session shipped two "CI portability" commits, each independently re-discovering
"a sibling is absent on a clean Actions runner" and solving it a *different* way:

- `8515034` (`proof-package.mjs:108`) — `existsSync(keyframes) ? file:... : registry-range`. The absent-sibling case becomes a **registry fallback**.
- `53a0fb3` (`proof-resolution-contract.mjs:211-224`) — `if (pkg.dir !== ROOT) { log; continue }`. The absent-sibling case becomes a **logged skip**.

And `proof-phantom-classes.mjs:317` ALREADY had the idiomatic form of the SAME
predicate a third way: `if (!existsSync(root)) continue;`. So as of HEAD there are
THREE different ad-hoc encodings of "absent sibling → skip-or-fallback" across the
gate fleet, two of them landed this session as separate fixes. `proof-consumers-static`
+ `proof-consumers-build` carry a fourth and fifth (`if (!existsSync(dir))` /
`[[ ! -d ... ]]`). This is the textbook N-one-off-patches-for-one-abstraction smell
the precepts forbid (gestalt over incremental).

The G.W5 amendment to `cross-repo-dev-resolution.md` §8 (2026-05-28, inv 53) already
states the architectural truth: publishers now ship to npm/crates, consumers resolve
through the **registry by default**, and the `file:`-sibling seam is demoted to a
dev-iteration-only tool. The proof scripts never absorbed that — they still treat the
local sibling layout as the primary world and the clean runner as the exception to be
patched. The reality is inverted: the clean-runner / registry path is now the default,
and the sibling checkout is the local-dev special case.

### The gestalt fix — a single `scripts/constellation.mjs` substrate

One shared module owns the constellation and the sibling-resolution policy:

```js
// scripts/constellation.mjs
export const PUBLISHERS = [
  { id: "glass-ui",     dir: ROOT,             pkg: "@mkbabb/glass-ui" },
  { id: "keyframes.js", siblingOf: "..",       pkg: "@mkbabb/keyframes.js" },
  { id: "value.js",     siblingOf: "..",       pkg: "@mkbabb/value.js" },
];
export const CONSUMERS = [ /* ONE list — fourier-analysis/web, words/frontend, bbnf-…, speedtest */ ];

// the one resolution policy every gate composes — encodes the §8 registry-default world:
export function resolveSibling({ id, dir, pkg, registryRange }) {
  if (existsSync(dir)) return { kind: "sibling", dir };        // local dev
  if (registryRange)   return { kind: "registry", registryRange }; // clean runner (default)
  return { kind: "absent" };                                   // skip (logged, not silent)
}
```

Every `proof:*` script imports `CONSUMERS`/`PUBLISHERS` + `resolveSibling` instead of
re-listing. The bbnf name-drift is structurally impossible after this (one list). The
session's two fixes collapse into one call site of `resolveSibling`. New sibling joins
the fleet → one edit, not five. This is a pure elegance + correctness win and is the
single highest-leverage transposition in the repo.

**Bonus (the lockfile-drift chore):** the #177 lockfile repair that "let CI reach
proof:package for the first time" is the same root cause one layer down — `file:`
sibling deps poison the committed lockfile on a registry-default world. With the
constellation module encoding registry-default resolution, the fixture manifests stop
emitting `file:../keyframes.js` into the lockfile on clean runs, so the recurring
lockfile-restoration chore is retired at the source rather than re-repaired per release.

---

## FINDING 2 — Gate artifacts are timestamped + measurement-bearing AND git-tracked under CLOSED tranche dirs; every gate run re-dirties a committed file

**Severity: high. Leverage: high (determinism + hygiene + CI-cleanliness). Clears the bar: yes (every gate writes one).**

### The smell

22 of 36 git-tracked `docs/tranches/**/audit/*.json` carry `generatedAt:
new Date().toISOString()`, and `profile-bundle.mjs:366` writes `Generated <ISO>` into
the git-tracked `docs/tranches/K/audit/W4-subpath-sizes.md`. Every gate writes its
output to a path PARKED UNDER A CLOSED TRANCHE:

- `proof-package.mjs:10` → `docs/tranches/F/audit/W1-package-proof.json`
- `proof-consumers-static.mjs:16` → `docs/tranches/F/audit/W1-consumers-static.json`
- `proof-runtime.mjs:13` → `docs/tranches/F/audit/W1-runtime-smoke.json`
- `proof-theme-style.mjs:16` → `docs/tranches/F/audit/W4-theme-style-proof.md`
- `profile-bundle.mjs:15-16` → `docs/tranches/K/audit/W4-subpath-sizes.md`
- `proof-vt-names.mjs:33` → `docs/tranches/AR/audit/W2-vt-names.json`

Tranches F and K are CLOSED. The session-start git status shows exactly the two files
this produces dirtied:
`M docs/tranches/F/audit/W4-tailwind-theme-proof.json` and
`M docs/tranches/K/audit/W4-subpath-sizes.md` — re-dirtied by a local gate run and
needing hand-restore. CI runs `profile:budget` (which rewrites the K markdown) and the
`proof:*` set (which rewrite the F/AR JSONs), so the gate fleet has a structural habit
of mutating committed history-artifacts. Two churn axes compound it: the `generatedAt`
timestamp (changes every run by construction) and the live measurements (gzip bytes,
`durationMs`, RSS) that drift run-to-run on the same source.

This is a genuine architectural smell: a gate is a PURE FUNCTION of source + tooling,
but these gates have a side effect on tracked state, and the artifact is parked in a
tranche-letter grave that has no business mutating after its FINAL.

### The gestalt fix — gate output is ephemeral, deterministic, or both

Two clean transpositions (compose them):

1. **Route gate artifacts out of tracked tranche dirs into a gitignored cache.**
   Default `artifactPath` → `.cache/gates/<gate>.json` (env-overridable, as today, so a
   tranche author can still capture a snapshot deliberately). `.gitignore` gains
   `.cache/`. A gate run can never dirty committed history. The tranche-snapshot
   workflow becomes an explicit `GLASS_UI_*_ARTIFACT=docs/tranches/AS/audit/... npm run
   proof:x` at close time — opt-IN, not the default side effect.

2. **Make the captured snapshots deterministic.** Drop `generatedAt` (the git commit
   already timestamps the artifact) and round/bucket the measurement fields, or move raw
   measurements behind a `--verbose` flag so the committed snapshot is byte-stable for
   identical source. A re-run on unchanged source then produces a byte-identical
   artifact — no spurious diff, nothing to hand-restore.

Either alone fixes the dirtying; together they make gate artifacts both ephemeral by
default and reproducible when deliberately captured. This is the same "gate output is a
pure function" discipline the repo already applies to `dist/` (gitignored) and the
`.tmp`/`tmpdir` scratch the proof scripts already use for fixtures — extend it to the
audit JSONs.

---

## FINDING 3 — Three divergent gate-list "sources of truth"; the aggregates have drifted apart and gates fall through the cracks

**Severity: medium. Leverage: medium (correctness + maintainability). Clears the bar: yes (3 aggregates).**

### The smell

Three places enumerate "the gates," and all three disagree:

- `package.json` `proof:all` = package · theme · consumers:static · consumers:build · runtime · vt-names **(6)**
- `.github/workflows/ci.yml:50-76` = (build chain) · package · theme · consumers:static · **audit:stash · resolution · phantom-classes** · vt-names **(8 proof-ish + build chain)**
- `scripts/release.sh:72-88` = typecheck · build · verify-export-types · profile:budget **(4 — no proof:* at all)**

Concrete drift symptoms:

- `proof:resolution`, `proof:phantom-classes`, `audit:stash` run in CI but are **absent
  from `proof:all`** — so a developer running `npm run proof:all` locally gets a GREEN
  that CI can still turn RED. `proof:all` is a lying aggregate.
- `proof:consumers:build` + `proof:runtime` are in `proof:all` but **deliberately excluded
  from CI** (sibling-walking) — so `proof:all` can't be the CI command either.
- `release.sh` runs ZERO `proof:*` gates — the binding-correctness floor those gates
  defend (subpath surface, VT-name uniqueness, phantom classes) is NOT re-checked at
  publish time, only the build/budget/dts trio. A surface-drift that landed between the
  last CI run and the tag ships unguarded.

There is no single declared gate manifest; each consumer of "the gate set" curated its
own subset by hand, and they have predictably skewed.

### The gestalt fix — one gate manifest, two views derived from it

Declare the gate set once with a portability tag, and derive every aggregate from it:

```js
// scripts/gates.mjs
export const GATES = [
  { id: "typecheck",          local: true,  ci: true,  release: true,  sibling: false },
  { id: "proof:package",      local: true,  ci: true,  release: true,  sibling: false },
  { id: "proof:resolution",   local: true,  ci: true,  release: true,  sibling: "skip" },
  { id: "proof:consumers:build", local: true, ci: false, release: false, sibling: "required" },
  // ...
];
```

`proof:all` runs `GATES.filter(g => g.local)`; CI's matrix is `GATES.filter(g => g.ci)`;
`release.sh` runs `GATES.filter(g => g.release)`. The `sibling` tag composes with the
Finding-1 `resolveSibling` policy so "skip on a clean runner" is declarative, not a
hand-maintained CI comment block (`ci.yml:44-49,58-72` is currently three prose
paragraphs explaining which gates are sibling-dependent — exactly the knowledge that
belongs in the manifest). A new gate is added in one place and automatically lands in
the right aggregates. The "developer's local green == CI green == release green"
property becomes structural rather than a coincidence three lists happen to maintain.

---

## Non-findings (verified clean — recorded so the next lens doesn't re-walk them)

- **`cn()` hand-rolled deduplicator** (`src/utils/cn.ts`) — documented 22 KB→0.5 KB perf
  transposition, ≥2 consumers via every CVA component, conflict table is enumerable and
  commented. This is the GOOD shape, not debt. Keep.
- **`moveBefore.ts` / `supportsCssTimeline.ts` / `useBreakpoint.ts`** — progressive
  enhancement with documented fallbacks and explicit "no alias, no polyfill" discipline.
  Exported (clears bar). Not shims.
- **src/ legacy axis** — zero actionable back-compat/shim/dead code. The library honors
  the no-legacy precept cleanly; the debt is entirely in the gate/CI tooling layer.
- **`stripComments` state machine** (proof-consumers-static + proof-vt-names) — a real
  hand-rolled JS lexer duplicated across two scripts. Worth noting it is duplicated (it
  could live in a shared `scripts/strip-comments.mjs`), but it is correct, tested by the
  1577-file consumer differential cited inline, and lower-leverage than F1-F3. Fold only
  if a gates-substrate wave is already touching these files.
