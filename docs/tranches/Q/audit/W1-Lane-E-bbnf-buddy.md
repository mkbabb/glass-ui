# Q.W1 Lane E — bbnf-buddy Resolver-Config Sweep

**Lane**: Q.W1 Lane E — resolver sweep, consumer `bbnf-buddy`.
**Date**: 2026-05-18.
**Repo modified**: `/Users/mkbabb/Programming/bbnf-buddy` (sibling of glass-ui).
**Contract**: `docs/precepts/cross-repo-dev-resolution.md` §2.2 (consumer half).
**Mode**: source-config write (`vite.config.ts` only). No mutating git in any repo — the orchestrator owns the index.

---

## §1 Charter

Apply the cross-repo dev-resolution contract's consumer half (§2.2) to
bbnf-buddy's Vite config:

1. Add explicit `resolve.conditions` (including `development`).
2. Remove any hard `dist/`-path `resolve.alias` to sibling `@mkbabb/*` packages.
3. Widen `server.fs.allow` to include workspace-linked sibling `src/` roots.

Per Q11 §7 (Lanes D-G resolver sweep), bbnf-buddy is one of four consumers
swept. Q11 §2 established that bbnf-buddy carries **no** hard `dist/`
`resolve.alias` to any `@mkbabb/*` sibling — the value.js B-1 hostile-alias
mechanism is value.js-specific. So item 2 is a no-op verification for
bbnf-buddy; items 1 and 3 are the substantive writes.

The keystone fix (keyframes.js `package.json` `exports` `default` key) already
LANDED upstream, so build verification can now succeed.

**Scope boundary**: bbnf-buddy also carries stale `<Card variant="pane" flush>`
sites (6, per Q11 §4) and a `preset.css` with retired tokens. Those are W2/W4
lanes — explicitly NOT touched here. This lane is resolver-config only.

---

## §2 Resolver-config changes

Single file modified: `bbnf-buddy/vite.config.ts`.

### §2.1 Pre-sweep state

`vite.config.ts` `resolve` block carried only the `@ → ./src` self-alias —
**zero `@mkbabb/*` `dist/` aliases**. `server.fs.allow` was
`[".", "../csc411/.../csp-solver"]` — the csp-solver WASM workspace, but not
the `@mkbabb/*` sibling roots one level up.

`@mkbabb/*` siblings in `node_modules/@mkbabb/` are all `file:`-link symlinks
to `../../../{glass-ui,keyframes.js,value.js,pencil-boil}`.

### §2.2 Change 1 — explicit `resolve.conditions`

Added `conditions: ["development", "module", "browser", "default"]` to the
`resolve` block. Vite auto-injects `development` in serve mode; the explicit
array is self-documenting, survives a Vite-default change, and makes the
`development` export branch (live sibling `src/`) authoritative for
workspace-linked `@mkbabb/*` resolution. `bbnf-buddy` uses a single
`defineConfig` object for both `dev` and `build` — the `development` condition
is harmless in `build` because the linked siblings' `exports` maps order
`development` ahead of `import`/`default`, and the keystone `default` key
guarantees terminal resolution either way.

### §2.3 Change 2 — `dist/` alias removal

No-op. Verified: bbnf-buddy's `vite.config.ts` has no `resolve.alias` entry
mapping any `@mkbabb/*` specifier to a `dist/` path (only the `@ → ./src`
self-alias, which is bbnf-buddy's own source and unrelated to the contract).
Nothing to remove — confirms Q11 §2's finding for this consumer.

### §2.4 Change 3 — `server.fs.allow` widening

Added `".."` (the workspace parent) to `server.fs.allow`. The three
`file:`-linked `@mkbabb/*` siblings (glass-ui, keyframes.js, value.js) all
live one level up from bbnf-buddy; the parent entry covers all of them in a
single clause. This lets the `development` export branch serve each sibling's
`src/`-relative assets (CSS, fonts, WASM) over Vite's `/@fs/` channel,
closing the font/CSS 403 class (contract §2.2.3). The pre-existing `"."` and
csp-solver entries are preserved.

---

## §3 Verification output

Verification commands run in `bbnf-buddy` (`package.json` scripts:
`build = vite build`, `typecheck = vue-tsc --noEmit`).

### §3.1 `npm run build` — GREEN

```
> @mkbabb/bbnf-buddy@0.1.0 build
> vite build
...
dist/assets/JsonPanel-BLCMniHP.js   3,287.75 kB │ gzip: 847.59 kB
✓ built in 5.59s
```

Production build succeeds. The Q11 §3 failure
(`[commonjs--resolver] Failed to resolve entry for package
"@mkbabb/keyframes.js"`) is gone — the keystone `exports` `default` key plus
the explicit `resolve.conditions` resolve `@mkbabb/keyframes.js` cleanly.
(The >500 kB chunk-size warning is pre-existing Monaco/JsonPanel bundle
debt, unrelated to this lane.)

### §3.2 `npm run typecheck` — GREEN for lane scope

```
> @mkbabb/bbnf-buddy@0.1.0 typecheck
> vue-tsc --noEmit

src/composables/wasm/morph.ts(177,9): error TS2322: ... 'SegmentId' is not assignable to type 'number'.
```

All three `TS2307: Cannot find module '@mkbabb/keyframes.js'` errors
(Q11 §3: `animation/easing.ts:26`, `animation/runtime.ts:43`,
`poses/css.ts:20`) are **RESOLVED**.

The two further `TS2322` errors Q11 §3 listed (`runtime.ts:191`,
`css.ts:228`) are **also resolved** — they were `unknown → number`
cascades downstream of the failed keyframes.js module resolution; once the
module's real types flow through, the casts type-check.

One pre-existing, keyframes-unrelated error remains:
`src/composables/wasm/morph.ts(177,9) TS2322` — a `SegmentId` branded-type
vs `number` mismatch in the WASM morph alignment mapper. Q11 §3 documented
this as a pre-existing, keyframes-independent error; it is out of this
lane's scope (a WASM-types lane, not a resolver lane). No regression: the
error count attributable to the resolver desync went 3 → 0.

---

## §4 Verdict

**PASS** — resolver-config sweep complete for bbnf-buddy.

- `resolve.conditions` declared explicitly with `development` first (§2.2).
- No `@mkbabb/*` `dist/` alias existed; nothing to remove (§2.3) — confirms
  Q11 §2.
- `server.fs.allow` widened to the workspace parent, covering all three
  `file:`-linked `@mkbabb/*` siblings (§2.4).
- `npm run build` GREEN; `npm run typecheck` clears all 3 keyframes.js
  `TS2307` errors plus 2 cascade `TS2322` errors. The single residual
  `morph.ts` `TS2322` is a pre-existing WASM-types defect, explicitly
  out of scope (W2/W4 lanes).

bbnf-buddy now satisfies the cross-repo dev-resolution contract §2.2
consumer half. The stale `<Card variant="pane">` sites and retired-token
`preset.css` remain for their assigned W2/W4 lanes — not touched here.

One file modified: `bbnf-buddy/vite.config.ts`. No mutating git in any repo.
