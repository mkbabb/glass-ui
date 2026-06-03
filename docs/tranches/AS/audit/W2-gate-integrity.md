# AS.W2 — the gate-integrity headline (inv-θ)

Tooling-only, no publish. Makes every proof gate a pure, sibling-portable
function of source + tooling — the dual of inv-η lifted from the component
binding to the verification fleet.

## What landed

- **`scripts/constellation.mjs` — the single membership source.** One
  `PUBLISHERS` table (glass-ui self + keyframes.js + value.js) + one `CONSUMERS`
  table (the canonical UNION) + one `resolveSibling(member)→{present,dir,self}`
  policy + `skipSibling()`. The five hardcoded constellation copies
  (proof-resolution, proof-consumers-static, proof-consumers-build,
  proof-phantom-classes, proof-package) and the three ad-hoc absent-sibling
  encodings (registry-fallback, logged-skip, existsSync-continue) collapse to
  this one module. The registry-default policy (G.W5 §8): an absent sibling is a
  graceful LOGGED skip (no silent cap), glass-ui's own `self` is REQUIRED.
  - **A real correctness fact surfaced:** `bbnf-lang/playground` and `bbnf-buddy`
    are DISTINCT repos — both consumers. The scattered lists each held a partial
    view (proof-consumers-static knew the playground; proof-phantom + resolution
    knew the buddy). The union is now canonical.
- **`scripts/gates.mjs` — the single gate manifest.** Every gate tagged
  `{local, ci, release}` (+ `sibling`). `proof:all` → `gates --run local`;
  `release.sh` → `gates --run release` (so a tagged release now runs the
  binding-correctness floor it previously skipped); `ci.yml` keeps explicit
  per-step visibility but `gates:verify-ci` fails closed on any drift between the
  YAML step set and the manifest (verified: matches, 13 ci gates). local == ci ==
  release is now structural, not coincidental.
- **`scripts/gate-output.mjs` — pure-function output.** Every proof/profile gate
  writes to a gitignored `.cache/gates/<name>.json` by default (the env override
  still points at a committed path for a deliberate `GATE_SNAPSHOT=1` snapshot);
  `generatedAt` + live measurements (durationMs, buildDurationMs) drop unless
  snapshotting, so the cache artefact is byte-stable. **Verified: after a full
  gate-fleet run, `git status` shows zero tracked audit-JSON churn** — the F/K/AR
  audit artefacts the gates used to re-dirty every run are now frozen. The
  `profile-bundle` JSON + the `W4-subpath-sizes.md` table (the biggest churn
  source) both route to `.cache`; byte-identical md5 across consecutive runs.
- **`scripts/proof-lockfile.mjs` — the #177 re-drift guard.** Asserts every
  `@mkbabb/*` lockfile entry resolves from the registry (no `file:`/`link:` dev-
  sibling adoption), so a stray `npm install ../keyframes.js` cannot silently
  re-break `npm ci` on a clean runner. Pure function of `package-lock.json` —
  identical on a dev machine and CI. Added to the manifest (local/ci/release) +
  ci.yml.
- **`proof:vt-names` hardened to its claim (the AS.W0 L1 over-claim closed).**
  The single-shape regex now covers the four mint forms that slipped SILENTLY —
  camelCase IDL (`.style.viewTransitionName=`), `setProperty` 2-arg,
  `setAttribute("style", …)`, and `.vue` `<template>` inline — and the file-level
  `fileHasUseId` boolean is replaced by a PER-MINT dataflow trace (the mint value
  must resolve to `useId()` through its own binding chain; a counter/`.length`/
  clock source is a violation; a file merely mentioning `useId()` no longer
  launders an unrelated counter-fed mint). Proven against six fixtures, each
  catching a violation the old gate missed silently; still PASS on HEAD (4 real
  mints), byte-stable.
- **`proof:consumers:static` carries the AR.W2 root-surface logic forward intact**
  (the VT-trio allow, the vueuse-bearing subtraction, the comment-strip
  collectExports) on top of the constellation membership.

## Gate fleet state

| Gate | Local | CI (siblings absent) |
|---|---|---|
| typecheck / test / build / verify-export-types / profile:budget | PASS | PASS |
| proof:package / proof:theme / proof:consumers:static / proof:phantom-classes | PASS | PASS |
| proof:vt-names (hardened) / proof:lockfile / gates:verify-ci | PASS | PASS |
| **proof:resolution** | **RED** — a real pre-existing `bbnf-lang/playground/vite.config.ts:24` hard dist-alias fossil (`@mkbabb/keyframes.js`) | **GREEN** — siblings absent → skip-by-policy; glass-ui self passes |

The `proof:resolution` local RED is inv-θ working as designed: collapsing the
drifted lists into the canonical union surfaced a violation the old blind spot
(its hardcoded list omitted `bbnf-lang/playground`) structurally could not see.
The gate's own header already declares sibling/leaf consumers EXPECTED-RED until
the AG-GU migration. The teeth were preserved and WIDENED — not weakened to force
a green. On CI (the binding publish gate) it is green.

## Cross-repo perimeter (NAME-FORWARD, inv-16)

- **`bbnf-lang/playground` dist-alias removal** — remove the hard
  `@mkbabb/keyframes.js` → `dist/` alias from `vite.config.ts:24-26` (contract-v2
  §2.4: the bare specifier resolves through the exports map). glass-ui writes only
  glass-ui; this is the playground maintainer's arm. Until then it is the
  documented contract-v1→v2 transient (local-RED, CI-green).

## inv-θ

Every proof gate is a pure, sibling-portable function of source + tooling.
Constellation membership is named once; absent-sibling handling is one policy;
the gate set is one manifest (local == ci == release as filters); gate output is
byte-stable in a gitignored cache (no tracked-state side effect). A gate may not
hardcode the constellation, re-encode absent-sibling handling, diverge from the
canonical set, or mutate committed history-artefacts. This is the substrate-level
closure of the gate-integrity class.
