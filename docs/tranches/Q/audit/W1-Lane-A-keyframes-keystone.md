# Q.W1 Lane A + H — keyframes.js Resolution Keystone

**Wave**: Q.W1 — Fleet-wide consumer un-break.
**Lanes**: A (publisher `exports` fix) + H (consumer-half resolver config) — both land in the
same keyframes.js commit per W1.md line 32.
**Repo modified**: `/Users/mkbabb/Programming/keyframes.js` (`@mkbabb/keyframes.js@2.1.0`).
**Date**: 2026-05-18.
**Contract**: `docs/precepts/cross-repo-dev-resolution.md` — Q invariant 30.

---

## Charter

keyframes.js's `package.json` `exports["."]` advertised only three of the
contract's four mandatory keys (`development`, `types`, `import`) — the terminal
`default` fallback was absent. Per Q.R11 (`Q11-consumer-resolver-sweep.md`) the
missing terminal key, combined with the AD.W4 `dist/`-freshness retire, broke
`npm run build` + `vue-tsc` typecheck across **all 5 downstream consumers**
(`value.js`, `fourier-analysis`, `bbnf-buddy`, `words/frontend`, `speedtest`) —
uniform `Failed to resolve entry for package "@mkbabb/keyframes.js"`.

This lane is the **fleet keystone**: one `package.json` change unblocks 5
consumers. It lands FIRST and is verified before any per-consumer sweep
proceeds (Q.md §6 risk 1).

Lane H folds in alongside — keyframes.js's own consumer half (it consumes
glass-ui via `file:../glass-ui`): explicit `resolve.conditions`, widened
`server.fs.allow`, and removal of the self-alias the contract §2.3 prohibits.

---

## The exports fix (Lane A)

### Before

```json
"exports": {
    ".": {
        "development": "./src/animation/index.ts",
        "types": "./dist/keyframes.d.ts",
        "import": "./dist/keyframes.js"
    }
}
```

### After

```json
"exports": {
    ".": {
        "development": "./src/animation/index.ts",
        "types": "./dist/keyframes.d.ts",
        "import": "./dist/keyframes.js",
        "default": "./dist/keyframes.js"
    }
}
```

The single added line is the `default` terminal key. Key order matches the
contract §2.1 exactly: `development → types → import → default`. Conditional
exports resolves first-match-wins; `development` leads so a workspace-linked
dev consumer resolves live `src/`; `default` is the terminal fallback that
closes the gap for resolvers activating none of `development`/`types`/`import`
— plain `node -e 'import(...)'` probes (no `--conditions`), CJS bundler paths,
and the `scripts/release.sh` subpath-publication probe.

**Top-level fields** — `main: ./dist/keyframes.js` and `types: ./dist/keyframes.d.ts`
are consistent with the contract (they point at the same built artefacts as the
`import`/`types` conditions). No `module` field exists, and the contract does
not require one — the `exports` map's `import` condition is the canonical ESM
entry. No top-level field change was required.

---

## The consumer-half fix (Lane H)

keyframes.js's `vite.config.ts` is itself a consumer (it consumes glass-ui via
`file:../glass-ui`). Three contract §2.2/§2.3 obligations applied:

1. **Self-alias deleted.** `defaultOptions.resolve.alias` carried
   `"@mkbabb/keyframes.js": path.resolve(import.meta.dirname, "src/animation")`
   — a self-alias of the package's own published name, which shadows its own
   `exports` map (contract §2.3 prohibition). Removed. The package reaches its
   own source via the `@src` alias and relative paths; no self-alias is needed.
   No hard `dist/` alias for any `@mkbabb/*` sibling existed (glass-ui +
   value.js were already bare specifiers) — nothing else to remove.

2. **`resolve.conditions` declared explicitly.** A new `devConditions` constant
   — `["development", "module", "browser", "default"]` — is wired into all
   three dev/serve config branches (`gh-pages`, `playground`, default `dev`).
   `development` leads so workspace-linked siblings resolve `src/`. The
   production library branch deliberately OMITS it (contract §6) — it
   externalises `@mkbabb/value.js` via `rollupOptions.external` instead.

3. **`server.fs.allow` widened.** A new `devFsAllow` constant —
   `[path.resolve(import.meta.dirname, "..")]`, the workspace root — is wired
   into the three dev/serve branches' `server.fs`. The `development` branch
   resolves a sibling's `src/`, and `src/`-relative assets (CSS, fonts) are
   served over Vite's `/@fs/` channel, which requires the sibling root inside
   `server.fs.allow`. The workspace root covers glass-ui + value.js.

`vite.config.ts` diff: 49 insertions, 2 deletions (the self-alias line removed,
two shared constants + per-branch `resolve`/`server` blocks added).

---

## Verification

### `npm run build` — GREEN

```
> @mkbabb/keyframes.js@2.1.0 build
> vite build --mode production

vite v7.3.1 building client environment for production...
transforming...
✓ 12 modules transformed.
rendering chunks...
[vite:dts] Start generate declaration files...
dist/keyframes.js  50.19 kB │ gzip: 14.51 kB
[vite:dts] Declaration files built in 1308ms.
✓ built in 1.42s
```

Both `dist/keyframes.js` and `dist/keyframes.d.ts` regenerate cleanly.

### `npm run check` (typecheck — `tsc --noEmit`) — GREEN

```
> @mkbabb/keyframes.js@2.1.0 check
> tsc --noEmit
```

Exit 0, no diagnostics.

### Consumer-context resolution probe — GREEN

Run from the `speedtest` consumer (no `--conditions` flag — exercises the new
`default` terminal key):

```
$ node -e 'import("@mkbabb/keyframes.js").then(m=>console.log("resolved:",Object.keys(m).length,"exports"))'
resolved from speedtest: 16 exports
```

The bare specifier now resolves the `exports` map terminal `default` key
without a `--conditions` gamble.

### `npm run proof:resolution` (glass-ui gate) — keyframes.js CLEAN

```
[proof:resolution] FAIL — dev-resolution contract violations found:

  [publisher] glass-ui/package.json
              exports["."] missing required key "default" (...)
  [publisher] value.js/package.json
              exports["."] missing required key "default" (...)

Summary: 2 publisher violation(s), 0 consumer violation(s).
```

The gate lists **zero keyframes.js violations** — both the keyframes.js
publisher half and consumer half pass. The 2 remaining publisher violations are
other lanes' scope: glass-ui itself (Q.W1 Lane B) and value.js (value.js
Tranche A). The 0 consumer violations confirms the keyframes.js self-alias
removal registered.

---

## Verdict

**KEYSTONE LANDED — keyframes.js resolution un-broken.**

- Lane A: `exports["."]` is the canonical 4-key shape; `default` terminal key
  added; key order matches the contract.
- Lane H: self-alias removed, explicit `resolve.conditions` in all 3 dev/serve
  branches, `server.fs.allow` widened to the workspace root; production lib
  branch correctly omits `development`.
- `npm run build` GREEN, `npm run check` (typecheck) GREEN, consumer-context
  resolution probe GREEN, `proof:resolution` gate reports keyframes.js CLEAN.

The fleet keystone is proven. The per-consumer resolver sweeps (Q.W1 Lanes D-G)
may now proceed against a keyframes.js that resolves without a `dist/` gamble.
