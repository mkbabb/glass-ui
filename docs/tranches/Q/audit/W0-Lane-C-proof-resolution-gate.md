# Q.W0 Lane C — Proof Doc: `proof-resolution-contract.mjs` gate

**Lane**: Q.W0 Lane C — fail-closed gate for the cross-repo dev-resolution contract.
**Date**: 2026-05-18.
**Status**: COMPLETE — gate authored, W0-baseline run captured, CI wired.

---

## Charter

Per Q.W0 Lane C and Q12 §6.2: author `scripts/proof-resolution-contract.mjs` — a
fail-closed proof script that mechanically enforces the cross-repo dev-resolution
contract (Q12 §3) across the full `@mkbabb/*` constellation. Wire it into
`package.json` as `proof:resolution` and into `.github/workflows/ci.yml`.

The contract has a publisher half and a consumer half. A prose edict without a
gate does not hold — the K-invariant-3 recurrence is the proof of that. This gate
is the enforcement layer.

---

## Method

Read all required sources before authoring:

1. `docs/tranches/Q/waves/W0.md` — Lane C spec (lines 30-38).
2. `docs/tranches/Q/audit/Q12-cross-repo-dev-resolution-architecture.md` — contract
   design; §3.1 (the canonical two-halved contract), §3.3 (`default` terminal key),
   §6.2 (gate recommendation).
3. `docs/tranches/Q/audit/Q11-consumer-resolver-sweep.md` — fleet breakage evidence;
   all 5 consumers CURRENTLY BROKEN for production build + typecheck.
4. Existing gate scripts for style + conventions: `audit-stash-list.mjs`,
   `proof-package.mjs`, `proof-consumers-static.mjs`, `verify-export-types.mjs`.
5. `package.json` — scripts block; constellation repo paths.
6. `.github/workflows/ci.yml` — existing gate matrix.
7. Actual current state of all constellation `package.json` exports maps and
   Vite config files (live reads via Bash).

---

## The gate — what it checks

`scripts/proof-resolution-contract.mjs` runs two independent checks.

### Check 1 — Publisher exports shape

For every `@mkbabb/*` package in the `PUBLISHER_PACKAGES` const (glass-ui,
keyframes.js, value.js), reads `package.json` and asserts that `exports["."]`
declares all four required keys in this order:

```
development → types → import → default
```

The `default` key is the terminal fallback added in Q12 §3.3. It makes
`exports["."]` complete: any resolver that activates none of the three specific
conditions (e.g. a CJS `require`, a plain `node -e 'import(...)'` probe without
explicit `--conditions`) gets the built ESM artefact rather than a "Failed to
resolve entry" error. All three packages currently have `development`, `types`,
and `import` but are missing `default`.

The key order is also asserted: conditional-exports is first-match-wins, so
`development` must be first.

### Check 2 — Consumer Vite config: no hard `dist/` alias

For every repo in the `CONSUMER_REPOS` const (glass-ui, keyframes.js, value.js,
fourier-analysis/web, bbnf-buddy, words/frontend, speedtest), text-scans each
Vite config file. Any `resolve.alias` entry whose key matches `@mkbabb/*` AND
whose value string contains `dist/` is a violation.

A hard `dist/` alias defeats the conditional-exports mechanism entirely — Vite
skips the `exports` map and jumps straight to the literal path. The canonical
value.js B-1 P0 was caused by exactly this pattern
(`@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js` pointing at a
deleted artefact). Q11 confirmed that alias was later removed; no fleet consumer
currently carries a `dist/` alias at W0.

### Constellation const

Both `PUBLISHER_PACKAGES` and `CONSUMER_REPOS` are clearly-marked `const` arrays
at the top of the script. Repos join or leave by editing those arrays. All paths
are computed as siblings of glass-ui under the shared parent.

---

## W0 expected-fail baseline

Run at W0 (2026-05-18):

```
$ node scripts/proof-resolution-contract.mjs
[proof:resolution] FAIL — dev-resolution contract violations found:

  [publisher] glass-ui/package.json
              exports["."] missing required key "default" (found keys: development, types, import)
  [publisher] keyframes.js/package.json
              exports["."] missing required key "default" (found keys: development, types, import)
  [publisher] value.js/package.json
              exports["."] missing required key "default" (found keys: development, types, import)


Summary: 3 publisher violation(s), 0 consumer violation(s).

Publisher fix (Q12 §3.3): add "default": "./dist/<name>.js" as the terminal
  key in every @mkbabb/* package's exports["."] map.
Consumer fix (Q12 §3.1): remove hard dist/ aliases from resolve.alias —
  bare specifiers resolve through the exports map via the file: symlink.

See docs/precepts/cross-repo-dev-resolution.md for the full contract.
W1 makes this gate pass; W0 documents the expected-fail baseline.

exit code: 1
```

**This failure is correct.** All three publisher packages are missing the `default`
terminal key in their `exports["."]` map — the gap Q12 §3.3 identified. No consumer
is carrying a hard `dist/` alias at W0 (value.js's fossil alias was already removed
in a prior clean-up; keyframes.js's self-alias `@mkbabb/keyframes.js → src/animation`
is NOT a `dist/` alias so it does not trip check 2, even though Q12 §3.1 also names
it as an anti-pattern to address in W3).

The gate has teeth: it is currently red. W1's publisher-side hardening
(adding `"default"` to all three `exports["."]` maps) makes it pass.

---

## CI wiring

`.github/workflows/ci.yml` — new step added after `audit:stash`:

```yaml
- name: proof:resolution
  run: npm run proof:resolution
```

The gate runs on every PR and push to master. On the GH Actions runner, sibling
repos (keyframes.js, value.js, fourier-analysis, …) are absent — `existsSync`
guards in the script skip missing repos gracefully rather than erroring. The
glass-ui publisher check (the missing `default` key) DOES run on CI and will fail
there until Q.W1 adds the key. This is intentional: the CI failure is the
continuous-integration signal that W0's documented desync is real.

`package.json` script entry:

```json
"proof:resolution": "node scripts/proof-resolution-contract.mjs"
```

The entry sits alongside the other `proof:*` siblings in the `scripts` block, just
above `proof:all`. It is NOT yet included in `proof:all` because the fleet is
mid-desync and `proof:all` must remain green for the release gate; `proof:resolution`
is a standalone advisory gate at W0 that W1 promotes to `proof:all`.

---

## Verdict

Gate authored. W0 baseline documents 3 publisher violations (all three `@mkbabb/*`
packages missing `"default"` in `exports["."]`), 0 consumer violations. CI wired.
The contract has a machine enforcer; it will not re-rot silently.
