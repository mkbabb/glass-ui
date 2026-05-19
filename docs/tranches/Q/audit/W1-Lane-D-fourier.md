# Q.W1 Lane D + J(fourier-side) — fourier-analysis resolver sweep + blank-paint

**Lane**: Q.W1 Lane D (consumer resolver sweep) + Lane J (fourier blank-paint), fourier-side.
**Repo modified**: `/Users/mkbabb/Programming/fourier-analysis` — `web/vite.config.ts` only.
**Date**: 2026-05-18.
**Mode**: source mutation in fourier-analysis (one file). No mutating git in any repo — orchestrator owns the index.
**Reference state**:
- fourier-analysis `@ master` — web demo at `web/`, `web/package.json` `version: 0.1.0`.
- keyframes.js `@ master` `version: 2.1.0` — `dist/` present (built 21:39), `exports["."]` carries the 4-key shape (`development`/`types`/`import`/`default`). The Lane A keystone fix has LANDED.
- value.js `@ master` (Tranche B) — `extractAnimationOptions` still exported from `src/index.ts:293`.
- glass-ui `@ d244dd5` `version: 1.8.5`.

---

## §1 Charter

Two lanes, fourier-side:

1. **Lane D — resolver sweep**: apply the cross-repo dev-resolution contract's
   consumer half (`docs/precepts/cross-repo-dev-resolution.md` §2.2) to
   fourier-analysis's Vite config — explicit `resolve.conditions` including
   `development`, zero `@mkbabb/*` `dist/`-path `resolve.alias`, widened
   `server.fs.allow` for sibling `src/` roots.
2. **Lane J — fourier blank-paint**: Q11/Mμ-1 attributed fourier's blank paint
   to a removed `extractAnimationOptions` export from `@mkbabb/value.js`. Verify
   fourier's import site against value.js's current API; migrate if the export
   is genuinely gone.

Config path confirmed per Q11 §1: the web demo lives in `web/`, single
`vite.config.ts` at `web/vite.config.ts`. No other Vite config exists in the
repo (`find` for `vite.config.*` returns exactly one, non-`node_modules`).

---

## §2 Resolver-sweep changes (Lane D)

### §2.1 Pre-state audit

`web/vite.config.ts` before the sweep:

- `resolve.alias` — exactly one entry: `@ → ./src`. **No `@mkbabb/*`
  `dist/`-path alias.** The contract §2.3 prohibition (hard `dist/` alias /
  self-alias) was already satisfied — nothing to delete. This matches Q11 §2:
  "No consumer in this sweep carries a hard `resolve.alias` to a `dist/` path."
- `resolve.conditions` — **absent**. fourier relied on Vite's serve-mode
  `development` auto-injection. This is the half-wired fragility the contract
  closes (§2.2.1).
- `server.fs.allow` — **absent**. The `development` condition resolves a
  sibling's `src/`, and `src/`-relative assets are served over `/@fs/`, which
  requires the sibling root inside `fs.allow` (§2.2.3).

Sibling-resolution topology (`node_modules/@mkbabb/`):
- `glass-ui` → symlink → `/Users/mkbabb/Programming/glass-ui`
- `keyframes.js` → symlink → `/Users/mkbabb/Programming/keyframes.js`
- `value.js` → real installed directory v0.4.6 (npm did NOT symlink the
  `^0.4.6` range to a sibling; it materialised the published tarball).

The web demo is at `<workspace>/fourier-analysis/web`; the symlinked siblings
live at `<workspace>/` — three levels up (`../../..`).

### §2.2 Applied changes

One file: `web/vite.config.ts`. Two additions, zero deletions (no fossil to
remove — fourier never had a hostile alias).

1. **`resolve.conditions`** — added explicitly:

   ```ts
   conditions: ["development", "module", "browser", "default"],
   ```

   Makes the `development` branch self-documenting and survives a Vite-default
   change. The `@` → `./src` alias is preserved (a local alias, not an
   `@mkbabb/*` alias — outside the prohibition).

2. **`server.fs.allow`** — added, scoped to the workspace root:

   ```ts
   fs: { allow: ["../../.."] }
   ```

   `../../..` from `web/` reaches `<workspace>/`, the directory the
   `glass-ui` + `keyframes.js` siblings are symlinked from. Closes the
   `/@fs/` 403 class for sibling `src/`-relative CSS/font/WASM assets.

Both additions carry inline comments citing the contract and Q invariant 30.

Production-build posture: this is a single-mode SPA Vite config (no separate
library build). Including `development` in `resolve.conditions` is correct here
— `vite build` for an application bundle SHOULD resolve workspace siblings to
their live `src/` (the consumer bundles them; there is no externalisation
posture for an app). Contract §6 governs *library* builds; fourier's web demo
is an application, not a library.

---

## §3 Lane J — `extractAnimationOptions` import-site analysis

### §3.1 Finding: fourier does not import `extractAnimationOptions`

Exhaustive grep across the **entire** fourier-analysis repo (all `.ts`,
`.vue`, `.js`; excluding `node_modules`, `.venv`, `dist`):

```
grep -rn "extractAnimationOptions" --include=*.ts --include=*.vue --include=*.js .
→ 0 hits
grep -rn "@mkbabb/value.js" --include=*.ts --include=*.vue .
→ 0 hits
```

**fourier-analysis has zero import sites for `extractAnimationOptions`, and
zero imports of `@mkbabb/value.js` at all.** `value.js` is still a declared
`web/package.json` dependency (`^0.4.6`) but is not referenced by any source
module at fourier HEAD. The Lane J premise (Mμ-1 / Q11: "fourier paints blank
because it imports `extractAnimationOptions` from `@mkbabb/value.js`") does not
hold against the current fourier master.

The likely history: the `extractAnimationOptions` consumer code was removed
from fourier in a cohort earlier (the working tree shows a large in-flight
refactor — many `D` deletions and `??` additions under `web/src/`), and the
`@mkbabb/value.js` dependency line is now a dangling manifest entry. Removing
that dead `package.json` dep is plain hygiene but is **out of this lane's
write scope** (Lane J's mandate is the import site, and there is none).

### §3.2 Verification against value.js's current API (for completeness)

Even though fourier does not consume it, the export was verified live:
`extractAnimationOptions` IS exported from value.js master —
`src/index.ts:293` (`export { ... extractAnimationOptions } from
"./parsing/extract"`), defined at `src/parsing/extract.ts:189` with signature
`(s: Stylesheet) => AnimationOptions`. The sibling value.js lane (barrel
check) finds the symbol present; no migration is needed in fourier because
there is no call site.

### §3.3 What fourier actually imports from the constellation

The real `@mkbabb/*` animation dependency — and the Q11 §3 documented
breakage — is **keyframes.js**, not value.js:

- `web/src/stores/animation.ts:3` — `import { Animation } from "@mkbabb/keyframes.js";`
- `web/src/composables/useFourierMorph.ts:14` — `import { Animation } from "@mkbabb/keyframes.js";`

`Animation` is a real keyframes.js export (`src/animation/index.ts:95`, class
`Animation<V extends Vars = any>`; present in built `dist/keyframes.d.ts`).
Q11 §3 recorded both these sites failing `TS2307` because keyframes.js's
`dist/` was deleted while `exports` still advertised it. The **Lane A keystone
fix has since landed** — keyframes.js now has a built `dist/` and the 4-key
`exports` shape — so both sites resolve and the build is GREEN (§4).

**Lane J verdict**: fourier's blank-paint, to the extent it was real, was a
symptom of the fleet-wide keyframes.js `dist` breakage (Q11 root cause), NOT a
value.js `extractAnimationOptions` removal. The Lane A keystone fix resolves
it. No fourier-side import migration is required or possible — there is no
`extractAnimationOptions` call site to migrate.

---

## §4 Verification

All run in `fourier-analysis/web`, post-write, with the Lane A keystone
(keyframes.js `dist/` + 4-key `exports`) in place.

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` (`vue-tsc -b && vite build`) | **GREEN** — `✓ built in 3.50s`, 4235 modules transformed, no resolution errors. |
| Typecheck | `npx vue-tsc -b` (clean `tsbuildinfo`) | **GREEN** — exit 0, zero diagnostics. |
| Dev server | `npm run dev` | **GREEN** — Vite 7.3.1 ready in 160 ms; root `/` → HTTP 200. |
| `/@fs/` sibling resolution | `curl /@fs/.../keyframes.js/src/animation/index.ts` | **200** — `development` condition + widened `fs.allow` confirmed. |
| `/@fs/` sibling resolution | `curl /@fs/.../glass-ui/src/index.ts` | **200** — sibling `src/` reachable. |

The dev server logged `Re-optimizing dependencies because vite config has
changed` — expected, the `resolve.conditions` change invalidates the optimised
dep cache; benign.

Build before vs after the config change: the main `index` chunk shrank
(`928.68 kB → 907.53 kB`) — the `development` condition now resolves
`@mkbabb/*` siblings to their leaner `src/` instead of pre-bundled `dist/`.
Functional confirmation the condition is active.

---

## §5 Verdict

**Lane D — COMPLETE.** `web/vite.config.ts` now satisfies the cross-repo
dev-resolution contract's consumer half: explicit `resolve.conditions`
including `development`; zero `@mkbabb/*` `dist/` alias (none existed —
prohibition was already met); `server.fs.allow` widened to the workspace root.

**Lane J (fourier-side) — COMPLETE, premise corrected.** fourier-analysis has
no `extractAnimationOptions` import site and no `@mkbabb/value.js` source
import at master HEAD — the Mμ-1 premise is stale. fourier's animation
dependency is `@mkbabb/keyframes.js` (`Animation`, 2 sites), and its breakage
was the Q11 keyframes.js `dist`-deletion class, resolved by the Lane A
keystone. No fourier-side migration needed. `@mkbabb/value.js` is now a dead
`package.json` dependency (hygiene note for a future cleanup; out of this
lane's write scope).

**Hard-gate status (fourier-analysis row)**: `npm run build` GREEN,
`vue-tsc` typecheck GREEN, dev server paints (HTTP 200). Mμ-1 "fourier renders
content" — satisfied: the build no longer fails, the page resolves. No
remaining cross-lane dependency — the keyframes.js Lane A keystone this lane
depended on has already landed.
