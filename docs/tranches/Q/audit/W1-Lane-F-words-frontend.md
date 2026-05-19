# Q.W1 Lane F — words/frontend resolver sweep

**Lane**: Q.W1 Lanes D-G — consumer resolver sweep, the `words/frontend` slice.
**Date**: 2026-05-18.
**Repo modified**: `/Users/mkbabb/Programming/words/frontend` (git repo rooted at
`/Users/mkbabb/Programming/words`, confirmed via `git rev-parse --show-toplevel`).
**Mode**: single-file write to `frontend/vite.config.ts`. No mutating git in any
repo — the orchestrator owns the index + commits.

---

## §1 Charter

Apply the consumer half of the cross-repo dev-resolution contract
(`docs/precepts/cross-repo-dev-resolution.md` §2.2; Q invariant 30) to
words/frontend's Vite config:

1. Declare explicit `resolve.conditions` (including `development`) in the
   dev/serve branch.
2. Remove any hard `dist/`-path `resolve.alias` to a sibling `@mkbabb/*`
   package.
3. Widen `server.fs.allow` to include the sibling `src/` roots.

The keyframes.js `exports` keystone fix (Lane A+H) has already landed
(`keyframes.js@6af80ad`); `dist/keyframes.js` + `dist/keyframes.d.ts` are
present, so the production build + typecheck can resolve `@mkbabb/keyframes.js`.

---

## §2 Pre-state (Q.R11 §2 finding)

`frontend/vite.config.ts` carried:

- **No hard `dist/` alias for any `@mkbabb/*` sibling.** The only `@mkbabb/*`
  aliases were `@mkbabb/latex-paper` (+ `/theme`, `/vue`) → local
  `./latex-paper/src/...`. Those are correct per Q.R11 §2 — `latex-paper` is a
  vendored sub-package whose `src/` paths exist; Tailwind v4 cannot resolve its
  `exports` map, so explicit aliases are load-bearing. They were left intact.
- **No `resolve.conditions`** — the `development` branch resolved only by Vite's
  serve-mode auto-injection accident (the half-wired fragility the contract
  closes).
- **No `server.fs.allow`** — Vite defaulted to the project root only.

`@mkbabb/keyframes.js` resolves through the parent `words/node_modules/@mkbabb/`
symlink (npm hoisted the `file:`-linked sibling to the workspace root;
`frontend/node_modules/@mkbabb` carries only `parse-that`).

---

## §3 Resolver-config changes

Single file: `frontend/vite.config.ts`. The config is shared between `vite`
(dev) and `vite build` (production), so `defineConfig` was converted to the
function form `defineConfig(({ command }) => ({ ... }))` to make `conditions`
mode-aware — `development` belongs in dev/serve configs only (contract §6).

**1. Mode-aware `resolve.conditions`:**

```ts
conditions:
  command === 'serve'
    ? ['development', 'module', 'browser', 'default']
    : ['module', 'browser', 'default'],
```

- `serve` (dev): `development` first → workspace-linked `@mkbabb/*` siblings
  resolve to live `src/`.
- `build` (production): `development` omitted → siblings resolve via `import`
  → their published `dist/`. This satisfies contract §6 (library/production
  builds must not resolve siblings to `src/`).

**2. Hard `dist/` alias removal:** none required — the config carried no
`dist/`-path alias to any `@mkbabb/*` sibling. The `@mkbabb/latex-paper`
`src/`-path aliases were preserved (correct per Q.R11 §2; not a desync).

**3. `server.fs.allow` widening:**

```ts
server: {
  fs: {
    allow: ['..', '../..'],
  },
  ...
}
```

`../..` reaches the `words/` repo root and the `@mkbabb/*` siblings one level
above it (`glass-ui`, `keyframes.js`); `..` covers the `words/` root itself.
Closes the `/@fs/` 403 class for `src/`-relative sibling assets (contract §2.2
item 3).

`defineConfig`'s closing was updated from `});` to `}));` for the arrow-function
form.

---

## §4 Verification

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run type-check` (`vue-tsc --noEmit`) | **GREEN** — no errors. |
| Build | `npm run build` (`vue-tsc --noEmit && vite build`) | **GREEN** — `✓ built in 3.61s`; all chunks emitted (`index-pQwHoXO0.js` 453 kB, `vendor` 374 kB, `dock`, `carousel`, etc.). |

Both legs were red pre-Lane (Q.R11 §3: `TS2307: Cannot find module
'@mkbabb/keyframes.js'` at `FancyF.vue:57` + `utils/animations.ts:3`;
production build `Failed to resolve entry for package "@mkbabb/keyframes.js"`).
With the keyframes.js keystone fix landed and the consumer-half resolver config
applied, both legs are now GREEN.

---

## §5 Verdict

**PASS.** words/frontend's `vite.config.ts` now carries the full consumer half
of the cross-repo dev-resolution contract: explicit mode-aware
`resolve.conditions` (dev includes `development`; production omits it),
zero hard `dist/` aliases to `@mkbabb/*` siblings (none existed; none added),
and a widened `server.fs.allow` covering the sibling `src/` roots. `npm run
build` and `npm run type-check` are both GREEN.

No mutating git performed. The `vite.config.ts` write awaits the orchestrator's
commit (git repo root `/Users/mkbabb/Programming/words`).
