# Q.W1 Lane B — glass-ui phantom-devDep retiral + resolver config

**Lane**: Q.W1 Lane B.
**Mode**: implementation. Source mutations in glass-ui only; no mutating git.
**Date**: 2026-05-18.
**Inputs**: `docs/precepts/cross-repo-dev-resolution.md` (the contract), Q.W1 §Lane B,
Q.R12 §5.1 (phantom-devDep disposition).

---

## §1 Charter

Three glass-ui-side closures of the cross-repo dev-resolution contract:

1. **Retire the phantom devDep** — `@mkbabb/value.js` was hoisted into glass-ui's
   `devDependencies` at P.W5 as a band-aid for the transitive-resolution gap
   (Q-break-4). The contract makes real nested-graph resolution work; the
   hoist is now fossil.
2. **Publisher half** — add the canonical 4-key `default` terminal to
   glass-ui's `package.json` `exports["."]` (contract §2.1).
3. **Consumer half** — add explicit `resolve.conditions` (incl. `development`)
   to glass-ui's Vite config(s), confirm zero hard `dist/` sibling aliases,
   widen `server.fs.allow` for sibling `src/` roots (contract §2.2).

Scope is glass-ui only. value.js's own publisher `default` key is a sibling
lane (value.js Tranche A.W0 / B).

---

## §2 Phantom devDep retiral

`@mkbabb/value.js: file:../value.js` removed from `package.json`
`devDependencies`.

### Grep evidence — value.js is imported zero times in glass-ui

```
$ grep -rn "@mkbabb/value" src/      → (no matches)
$ grep -rn "@mkbabb/value" demo/     → (no matches)
$ grep -rn "@mkbabb/value" tests/    → (no matches)
$ grep -rn "@mkbabb/value" . --include="*.ts" --include="*.vue" \
    --include="*.js" --include="*.mjs" --include="*.json" \
    | grep -v node_modules | grep -v "/dist/"
  package.json:401:        "@mkbabb/value.js": "file:../value.js"
  package-lock.json:13,60,110  (lockfile only)
```

The sole reference was the `devDependencies` declaration itself (and its
lockfile echoes). No glass-ui source, demo, test, or script imports
`@mkbabb/value.js` at any layer — confirming Q.R12 §2.3's diagnosis: glass-ui
is not a value.js consumer; the devDep existed only so the test runner could
resolve value.js as a *transitive grandchild* of keyframes.js.

### Why retiral is safe — real nested-graph resolution

glass-ui's test runner loads `@mkbabb/keyframes.js` via the `development`
condition → keyframes.js's live `src/`. keyframes.js's `src/animation/*`
imports `@mkbabb/value.js` (confirmed: `waapi.ts`, `numeric.ts`, `smooth.ts`,
`utils.ts`, `constants.ts`). That transitive import resolves through
keyframes.js's **own** `node_modules` symlink:

```
$ ls -la ../keyframes.js/node_modules/@mkbabb/
  value.js -> ../../../value.js
  glass-ui -> ../../../glass-ui
```

keyframes.js declares `@mkbabb/value.js` in its own `dependencies`; the
`file:` link installs the symlink above. Node/Vite nested resolution walks
to it from keyframes.js's `src/` without glass-ui declaring anything. The
grandparent hoist was dead weight papering a resolution path that already
exists one level down.

---

## §3 Publisher `default` fix

`package.json` `exports["."]` — `default` added as the terminal key in the
canonical contract order:

```jsonc
".": {
  "development": "./src/index.ts",
  "types":       "./dist/index.d.ts",
  "import":      "./dist/glass-ui.js",
  "default":     "./dist/glass-ui.js"   // NEW — terminal fallback
}
```

`default` (same target as `import`) closes the resolution gap for resolvers
that activate none of `development`/`types`/`import` — plain `node -e`
probes without `--conditions`, CJS bundler paths, the `scripts/release.sh`
subpath-publication probe. Scope is `exports["."]` only, per the gate's
mandate (`proof-resolution-contract.mjs` checks the root entry; subpaths are
out of scope this lane).

---

## §4 Consumer `resolve.conditions`

glass-ui has two relevant Vite config files; both are consumers of
`@mkbabb/keyframes.js` and both now declare explicit `resolve.conditions`.

### `vite.config.ts` — demo dev server + library build

The `npm run dev` script serves the demo (`index.html`) through this config;
the same file carries the library `build.lib` block. Added:

```ts
resolve: {
  conditions: ["development", "module", "browser", "default"],
},
server: {
  fs: { allow: [".."] },
},
```

`development` resolves the workspace-linked keyframes.js sibling to its live
`src/` in dev/serve mode. For the library `build`, keyframes.js is already
`external` (`vite.library.ts` `libraryExternal`), so the condition governs
dev/serve resolution only and never bundles a sibling's `src/` — consistent
with contract §6 (build configs externalise siblings).

`server.fs.allow: [".."]` widens the dev server's `/@fs/` channel to the
workspace parent so keyframes.js's `src/`-relative assets resolve without a
403 (contract §2.2 clause 3).

### `vitest.config.ts` — test runner

Added the identical `resolve.conditions` block. This is the load-bearing
change for the phantom-devDep retiral: the test runner now resolves
keyframes.js via `development` → `src/`, and keyframes.js's transitive
`@mkbabb/value.js` resolves through keyframes.js's own nested `node_modules`.

### Zero hard `dist/` aliases

Neither `vite.config.ts` nor `vitest.config.ts` (nor `vite.iter.config.ts` /
`vite.library.ts`) carries any `resolve.alias` entry for an `@mkbabb/*`
sibling — no hostile alias, no self-alias. The bare specifier
`@mkbabb/keyframes.js` resolves purely through the sibling's `exports` map
via the `file:` symlink. `proof-resolution-contract.mjs`'s consumer check
confirms 0 consumer violations for glass-ui.

---

## §5 Verification

### `npm run typecheck` — GREEN

```
> vue-tsc --noEmit
(no errors)
```

### `npx vitest run` — GREEN

```
Test Files  32 passed (32)
     Tests  372 passed (372)
  Duration  3.49s
```

All 372 tests pass with `@mkbabb/value.js` removed from glass-ui's manifest.
The motion-composable tests (`useAnimatedNumber.test.ts`,
`useAnimatedNumberMap.test.ts`, `AnimatedDigit.test.ts`) exercise the
keyframes.js import chain — `useSpringOrchestrator` / `useAnimatedNumber`
import `@mkbabb/keyframes.js`, whose `src/` pulls in `@mkbabb/value.js`.
Their passing is the proof that the transitive sibling resolves via
nested-graph resolution, not the retired phantom hoist.

### `node scripts/proof-resolution-contract.mjs` — glass-ui violation cleared

```
[proof:resolution] FAIL — dev-resolution contract violations found:

  [publisher] value.js/package.json
              exports["."] missing required key "default"

Summary: 1 publisher violation(s), 0 consumer violation(s).
```

glass-ui's publisher violation (missing `default`) is **resolved** — the gate
fell from 2 publisher violations to 1. The single remaining violation is
value.js's own `default` key, owned by a sibling lane (value.js Tranche A.W0 /
B), not Q.W1 Lane B. glass-ui shows 0 consumer violations.

---

## §6 Verdict

PASS for glass-ui's W1 Lane B scope.

- Phantom `@mkbabb/value.js` devDep retired — grep-confirmed unused; 372/372
  tests green prove nested-graph resolution carries the transitive sibling.
- Publisher `default` terminal key added to `exports["."]` in canonical
  4-key order.
- Consumer `resolve.conditions` (incl. `development`) declared explicitly in
  both `vite.config.ts` and `vitest.config.ts`; `server.fs.allow` widened;
  zero hard `dist/` sibling aliases.
- `proof:resolution` glass-ui publisher violation cleared (2 → 1; the residual
  is value.js's sibling-lane item).

Files changed: `package.json`, `vite.config.ts`, `vitest.config.ts`.
