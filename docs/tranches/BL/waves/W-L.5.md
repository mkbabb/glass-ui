# W-L.5 · the value.js colour boundary: every malformed colour throws the published `GlassColorError` · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b3d7fa28` in a scratch worktree; `src` and `package.json` identical to v10.1.0. `dist/` built there. The lockfile resolves `@mkbabb/value.js` `4.0.0` (`package-lock.json`, `"node_modules/@mkbabb/value.js"`) |
| ships in | 11.0.0 |
| families | F-72 whole (`audit/REGISTRY.md:1528-1538`): L15a-F9, R2-04-18. Inbound O-36 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| engines | none: Node only. No visual claim |

## 1 · What it closes

| id | defect |
|---|---|
| L15a-F9, R2-04-18, O-36 | through glass's `./color` door, `cssToOklch("oklch()")`, `("rgb()")` and `("constructor")` throw value.js 4.0.0's raw `TypeError`; only `("not-a-color")` throws `GlassColorError` |
| this seat | `GlassColorError` is thrown at the boundary but published from no entry, so a consumer cannot test `instanceof GlassColorError` |

The registry's disposition is "FOLD (re-trigger: value.js ≥ 4.1.0 on npm)". The charter forbids re-booking (CH:23), so this spec decides it: BUILD, with the cut waiting on the publish (§3.3).

## 2 · The defect at HEAD

- `src/composables/color/value.ts:41-43`: `opaqueCssColor` calls value.js's `parseCssColor` and maps a `!parsed.ok` result to `GlassColorError`. A throw from inside `parseCssColor` passes through unmapped.
- `src/composables/color/value.ts:20` declares `GlassColorError`; `src/composables/color/index.ts:107` documents "throw one `GlassColorError`". `grep -ln GlassColorError dist/*.d.ts` prints nothing, and `import { GlassColorError } from "dist/color.js"` fails with `SyntaxError: … does not provide an export named 'GlassColorError'`.
- `package.json` `peerDependencies["@mkbabb/value.js"]` `^4.0.0` (optional), `devDependencies` `^4.0.0`. value.js is external to the build: `dist/color.js`, `dist/aurora.js`, `dist/easing.js` and two chunks import `@mkbabb/value.js/{color,css,easing}`, so the consumer's installed value.js is the one that runs. A dev-lock bump alone does not reach a consumer; the peer floor has to move.

Readings (commands run here):

| reading | command | value |
|---|---|---|
| the built door | `node tests/_bandL/f72.mjs` (appendix A) | `GlassColorError exported: false`; `oklch()` → `TypeError: Cannot read properties of undefined (reading 'replace')`; `rgb()` → same; `constructor` → `TypeError: e.trim is not a function`; `not-a-color` → `GlassColorError: cssToOklch: css_syntax`; **exit 1** |
| the source | `npx vitest run tests/_bandL/color-boundary.test.ts` (appendix B) | **4 failed, 1 passed**: three `expected error to be instance of GlassColorError` (`TypeError`), and `expected undefined to be [Function GlassColorError]` |
| the registry | `npm view @mkbabb/value.js dist-tags` | `{ latest: '4.0.0' }`; versions end `3.1.0, 4.0.0` |
| the sibling tag | `git -C ../value.js tag -l 'v4*'` (read only) | `v4.0.0`, `v4.1.0`; `v4.1.0` → `f3fccfb7`, 2026-09-19 23:30:56 −0400. Its tag message: "Publication to the registry is X-W11's act, not this tag's." `../value.js/package.json:3` reads `4.1.0` |
| does 4.1.0 cure it | `git archive v4.0.0` and `v4.1.0` of value.js's `src` into this seat's scratch, each `src/subpaths/css.ts` bundled with `rolldown`, then `parseCssColor` called on the four inputs (appendix C) | 4.0.0: three `TypeError` throws, `not-a-color` → diagnostics `css_syntax`. 4.1.0: all four → diagnostics `css_syntax`, no throw |

So the cure is upstream and already written: value.js 4.1.0 returns diagnostics where 4.0.0 throws (`src/css/grammar.ts:285-317` at `v4.1.0`, the `typeof named === "string"` guard and the destructured call match). What is missing is its publication, glass's peer floor, and glass's export of its own error class.

## 3 · The cure

### 3.1 The publish ask

The wave's first act is a letter to value.js (`docs/tranches/BL/outbox/glassui-outbound-<date>-valuejs-4.1.0-publish.md`, through W-B.2's outbox) asking for value.js 4.1.0 on npm, citing its own tag message (X-W11 owns the publication) and appendix C's reading. glass writes nothing into value.js's tree; value.js has a live session and runs its own release.

### 3.2 The glass side

- `peerDependencies["@mkbabb/value.js"]` `^4.0.0` → `^4.1.0`; `devDependencies` the same, and the lockfile resolves 4.1.0 or later.
- `GlassColorError` is exported from `./color` (the door `src/composables/color/index.ts` builds), with its type. One door: no other entry re-exports it (W-D.1's one-symbol-one-door rule).
- No `try`/`catch` is added around `parseCssColor`. A catch that re-types value.js's throws would be a second path that goes dead the day 4.1.0 is the floor, and a masking fallback while it lives (E-1, E-2). The floor carries the cure.
- `optional: true` on the value.js peer is W-L.3's question (the static imports make it required in practice); this wave changes the range only.

### 3.3 If value.js 4.1.0 is not on npm when W-L.7 opens

The 11.0.0 cut does not ship with the boundary leaking. W-L.7 depends on this wave (PLAN §5). If the publish has not happened when W-L.7 is ready, the orchestrator asks the owner in-session, since the owner runs both repos: publish value.js 4.1.0 first, or rule otherwise. The owner's answer is quoted in the wave record. This is an owner act named at the wave, not a re-trigger.

## 4 · Files it touches

`package.json`, `package-lock.json`; `src/composables/color/index.ts` (the export); `MIGRATION.md`, `CHANGELOG.md`; `README.md` (the peer table). New: `tests/composables/color/boundary.test.ts` (appendix B promoted). The outbound letter under `docs/tranches/BL/outbox/`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L5-1 · the built door | `node tests/_bandL/f72.mjs` against `dist/color.js` after `npm run build` | exit 0: `GlassColorError` exported, all four inputs throw it | **exit 1** (§2) |
| G-L5-2 · the source | `npx vitest run tests/composables/color/boundary.test.ts` | 5 passed | **4 failed, 1 passed** |
| G-L5-3 · the floor | `node -e 'const s=require("semver"),p=require("./package.json");process.exit(s.gte(s.minVersion(p.peerDependencies["@mkbabb/value.js"]),"4.1.0")&&s.gte(s.minVersion(p.devDependencies["@mkbabb/value.js"]),"4.1.0")?0:1)'` | exit 0 | **exit 1** (both floors 4.0.0) |
| G-L5-4 · the lock | `node -p "require('./package-lock.json').packages['node_modules/@mkbabb/value.js'].version"` ≥ 4.1.0 | 4.1.0 or later | `4.0.0` |
| G-L5-5 · on the registry | `npm view @mkbabb/value.js@4.1.0 version` | prints `4.1.0` | **`npm error 404`** (latest `4.0.0`) |
| G-L5-6 · the consumer path | a packed consumer fixture (the tarball plus `@mkbabb/value.js@$(semver.minVersion(peer))`) runs G-L5-1's four calls through `node_modules/@mkbabb/glass-ui/dist/color.js` | exit 0 | **exit 1** by the same readings: the fixture's floor is 4.0.0 and the built door leaks |

G-L5-1 and G-L5-2 join W-A.2's roster. Appendix C shows the cure exists at value.js's tag, so G-L5-1 is not a gate that can only fail.

## 6 · π and DELTA obligations

None: the wave makes no visual claim.

## 7 · MIGRATION rows (11.0.0)

| removed or changed | successor |
|---|---|
| peer `@mkbabb/value.js` `^4.0.0` | `^4.1.0`: malformed colours now throw `GlassColorError` at every glass colour entry, never value.js's `TypeError` |
| `GlassColorError` not importable | `import { GlassColorError } from "@mkbabb/glass-ui/color"`; catch sites that matched `e.name === "GlassColorError"` can use `instanceof` |

## 8 · Ledger rows

Closes F-72 (L15a-F9, R2-04-18) and inbound O-36. The census holds no row for F-72 (`ledger/CENSUS.md:57`); the LEDGER seat writes one row from this spec with terminal BUILD, and the publish ask as the named sibling act. W-B.2's reply letter states "11.0.0, with value.js 4.1.0 as the peer floor".

## Appendix A · `tests/_bandL/f72.mjs`

```js
const C = await import(process.env.COLOR ?? "../../dist/color.js");
const E = C.GlassColorError;
const rows = ["oklch()", "rgb()", "constructor", "not-a-color"].map((s) => {
  try { C.cssToOklch(s); return [s, "NO THROW"]; }
  catch (e) { return [s, E && e instanceof E ? "GlassColorError" : `${e.name}: ${e.message}`]; }
});
process.exit(typeof E === "function" && rows.every((r) => r[1] === "GlassColorError") ? 0 : 1);
```

## Appendix B · `tests/_bandL/color-boundary.test.ts`

```ts
import * as Color from "@glass/composables/color";
import { GlassColorError } from "@glass/composables/color/value";
it.each(["oklch()", "rgb()", "constructor", "not-a-color"])("cssToOklch(%j) throws GlassColorError", (s) =>
  expect(() => Color.cssToOklch(s)).toThrow(GlassColorError));
it("GlassColorError is published from ./color", () =>
  expect((Color as Record<string, unknown>).GlassColorError).toBe(GlassColorError));
```

At HEAD: `oklch()`, `rgb()`, `constructor` fail (`TypeError`); `not-a-color` passes; the export case fails.

## Appendix C · value.js at its two tags (read from git objects; nothing built or run in value.js's tree)

```
git -C ../value.js archive v4.0.0 src package.json | tar -x -C <scratch>/vjs/v4.0.0     (and v4.1.0)
rolldown <tag>/src/subpaths/css.ts --format esm --platform neutral -o <tag>-css.mjs
== v4.0.0
oklch() -> THROW TypeError Cannot read properties of undefined (reading 'replace')
rgb() -> THROW TypeError Cannot read properties of undefined (reading 'replace')
constructor -> THROW TypeError source.trim is not a function
not-a-color -> diagnostics css_syntax
== v4.1.0
oklch() -> diagnostics css_syntax
rgb() -> diagnostics css_syntax
constructor -> diagnostics css_syntax
not-a-color -> diagnostics css_syntax
```
