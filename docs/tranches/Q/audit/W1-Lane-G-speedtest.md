# Q.W1 Lane G — speedtest resolver sweep + Q-misc-1 manualChunks cleanup

**Wave**: Q.W1, Lane G (Lanes D-G consumer resolver sweep).
**Repo**: `/Users/mkbabb/Programming/speedtest` (`speedtest@1.0.0`).
**Date**: 2026-05-18.
**Reference**: `docs/precepts/cross-repo-dev-resolution.md` §2.2 (consumer half),
`docs/tranches/Q/audit/Q11-consumer-resolver-sweep.md` §2 + §7 R-D.
**speedtest HEAD at write**: `f2030f9` (`docs(AG): A8 dev-resolution design …`).
**Mode**: surgical — Vite resolver config only; no source mutation; no mutating git.

---

## §1 Charter

Apply the cross-repo dev-resolution contract's consumer half to speedtest's
Vite config, and discharge Q-misc-1 — the dead `manualChunks` match branches
referencing post-AD.W4 `dist/`-resolution-era paths.

The keyframes.js `exports` keystone fix (Lane A) has landed: keyframes.js's
`package.json` `exports["."]` now carries the 4-key shape
(`development` / `types` / `import` / `default`) and `dist/keyframes.js` +
`dist/keyframes.d.ts` are rebuilt. Build verification can therefore succeed.

speedtest pre-state (per Q11 §2): **no hard `dist/` `resolve.alias`** to any
`@mkbabb/*` sibling — speedtest's `resolve.alias` carries only the local
`@src` / `@styles` / `@utils` / `@speedtest` / `@assets` entries.
`server.fs.allow` already extends to `../glass-ui` + `../keyframes.js` via
`FS_ALLOW_EXTRA`. The single contract gap was the **absent explicit
`resolve.conditions`** in the dev/serve config branch.

---

## §2 Resolver-config changes

### §2.1 — Explicit `resolve.conditions` in the dev/serve branch (the one gap)

`vite.config.ts` exports a `defineConfig((mode) => …)` factory that branches on
`mode.mode === "production"`. The `else` branch is the dev/serve config. Per
contract §2.2.1 + §6, `development` belongs in dev/serve configs only — the
production branch resolves siblings through their built `dist/` via the
`import` / `default` conditions and must omit `development`.

Added to the dev/serve branch return object:

```ts
resolve: {
    ...defaultOptions.resolve,
    conditions: ["development", "module", "browser", "default"],
},
```

`...defaultOptions.resolve` preserves the existing `alias` block (the local
`@src`/`@styles`/… aliases) and the `dedupe: ["vue", "reka-ui"]` entry — the
spread merges the explicit `conditions` array on top without disturbing them.
The production branch is left untouched: it inherits `defaultOptions.resolve`
verbatim and resolves siblings through `import`/`default` → `dist/`.

Vite auto-injects `development` in serve mode, but an implicit default is
precisely the half-wired fragility the contract closes (§2.2.1). The explicit
array is self-documenting and survives a Vite-default change.

### §2.2 — Hard `dist/` alias for `@mkbabb/*` siblings — none to remove

speedtest carries **zero** `resolve.alias` entry mapping any `@mkbabb/*`
package — verified at Q11 §2 and re-verified at this lane. The `resolve.alias`
block is local-path-only (`@src`, `@styles`, `@utils`, `@speedtest`,
`@assets`). Contract §2.2.2 / §2.3 prohibition: **already satisfied, no change**.

### §2.3 — `server.fs.allow` sibling-root widening — already present

`vite.config.ts:253-256` declares `FS_ALLOW_EXTRA`:

```ts
const FS_ALLOW_EXTRA = [
    path.resolve(__dirname, "..", "glass-ui"),
    path.resolve(__dirname, "..", "keyframes.js"),
];
```

`serverConfig.fs.allow` = `[searchForWorkspaceRoot(cwd), ...FS_ALLOW_EXTRA]`,
shared by both the production and dev branches. The two `file:`-linked
siblings' roots are inside the allow list. Contract §2.2.3: **already
satisfied, no change**. The dev probe (§4) confirms a sibling `src/` asset
serves over `/@fs/` with HTTP 200.

---

## §3 Q-misc-1 — manualChunks dead-branch cleanup

### §3.1 — The dead branches

`vite.config.ts` production `build.rollupOptions.output.manualChunks` is a
function-form matcher. Pre-cleanup it tested five `id.includes()` arms for the
`"keyframes"` chunk:

```ts
id.includes("/@mkbabb/keyframes.js/") ||   // A
id.includes("/keyframes.js/dist/")     ||  // B
id.includes("/@mkbabb/value.js/")      ||  // C
id.includes("/value.js/dist/")         ||  // D
id.includes("/@mkbabb/parse-that/")        // E
```

Q11 §2 (R-D) flagged the `dist/` arms (B, D) as the suspected dead branches —
written against the original framing where AD.W4 had deleted keyframes.js's
`dist/`. **Verify-first overturned that framing.** With the Lane A keystone fix
landed, keyframes.js's `dist/` is rebuilt and the production build resolves
`@mkbabb/keyframes.js` through the `import`/`default` export conditions
(`development` is dev/serve-only). Confirmed:

```
import-condition resolve of @mkbabb/keyframes.js
  → /Users/mkbabb/Programming/keyframes.js/dist/keyframes.js
```

So in the **production** build — the only context where `manualChunks` runs —
every sibling module ID lands under a `…/<pkg>/dist/…` path, never under a
`/@mkbabb/<pkg>/` segment. The genuinely dead arms are **A and C**, not B and D.

### §3.2 — Empirical proof (build sourcemap branch tally)

The `keyframes-*.js` chunk sourcemap (`dist/assets/keyframes-D8FBXegZ.js.map`)
was tallied per branch. Module sources and hit counts:

| Branch | Pattern | Hits | Status |
|---|---|---|---|
| A | `/@mkbabb/keyframes.js/` | 0 | **DEAD — removed** |
| B | `/keyframes.js/dist/` | 1 (`keyframes.js/dist/keyframes.js`) | live — kept |
| C | `/@mkbabb/value.js/` | 0 | **DEAD — removed** |
| D | `/value.js/dist/` | 1 (`value.js/dist/value.js`) | live — kept |
| E | `/@mkbabb/parse-that/` | 2 (`{keyframes.js,value.js}/node_modules/@mkbabb/parse-that/dist/parse.js`) | live — kept |

`parse-that` is consumed verbatim from a `node_modules/@mkbabb/parse-that/`
directory (real dir, not a `file:` link), so its `/@mkbabb/parse-that/` arm
genuinely matches and stays.

### §3.3 — The cleanup

Arms A and C deleted; the matcher now tests three live arms:

```ts
if (
    id.includes("/keyframes.js/dist/") ||
    id.includes("/value.js/dist/") ||
    id.includes("/@mkbabb/parse-that/")
) {
    return "keyframes";
}
```

A Q.W1-Lane-G comment paragraph documents why the `/@mkbabb/keyframes.js/` and
`/@mkbabb/value.js/` arms are gone (production resolves siblings through
`import`/`default` → `dist/`; `development` is dev/serve-only per the contract).

**Idempotence proof**: the `keyframes-*.js` chunk hash is byte-identical
across the pre- and post-cleanup builds (`keyframes-D8FBXegZ.js` both times),
and the post-cleanup chunk carves the exact same 4 modules. Removing the dead
arms changed nothing in the output — the definition of a genuinely dead branch.

---

## §4 Verification

| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` (`vite build --mode production`) | **GREEN** — `✓ built in 12.33s`; PWA `generateSW` precache 8 entries; `keyframes-D8FBXegZ.js` (102.32 kB) emitted |
| Client typecheck | `npm run check:client` (`vue-tsc --noEmit`) | **GREEN** — exit 0, zero diagnostics |
| keyframes chunk carve | sourcemap module tally | **STABLE** — same 4 modules (`keyframes.js/dist/keyframes.js`, `value.js/dist/value.js`, 2× `@mkbabb/parse-that/dist/parse.js`); chunk hash unchanged |
| Dev server boot | `npm run dev:vite` (`vite --port 8080 --mode development`) | **GREEN** — ready in 274 ms; `GET /` → 200 |
| Dev sibling `src/` resolution | `curl /@fs/…/keyframes.js/src/animation/index.ts` | **200** — explicit `development` condition + `fs.allow` widening serve live sibling source |

`check:client` is the keyframes-touching typecheck leg (Q11 §3 names the three
`@mkbabb/keyframes.js` import sites under `src/components/speedtest/composables/`).
The full `npm run check` additionally runs server/worker/boundary legs that do
not touch the resolver config and are out of this lane's surgical scope.

---

## §5 Verdict

**PASS.** speedtest's Vite config now satisfies the cross-repo dev-resolution
contract's consumer half:

- §2.2.1 — explicit `resolve.conditions: ["development", "module", "browser",
  "default"]` declared in the dev/serve branch; production branch correctly
  omits `development`.
- §2.2.2 / §2.3 — zero hard `dist/` `@mkbabb/*` alias (was already clean).
- §2.2.3 — `server.fs.allow` includes both `file:`-linked sibling roots (was
  already present); dev `/@fs/` sibling-source serve verified 200.

Q-misc-1 discharged: the two genuinely-dead `manualChunks` arms
(`/@mkbabb/keyframes.js/`, `/@mkbabb/value.js/`) removed after a sourcemap
branch-tally proved 0 hits; the three live arms (`/keyframes.js/dist/`,
`/value.js/dist/`, `/@mkbabb/parse-that/`) retained. The `keyframes` chunk is
byte-identical pre/post — confirming the removal is pure dead-code elimination.

Build GREEN, typecheck GREEN, dev server GREEN. The audit's R-D framing (B/D
`dist/` arms dead) was corrected by verify-first: post-Lane-A the `dist/` arms
are the **live** ones and the `/@mkbabb/<pkg>/` arms are dead.

**Touched files**: `speedtest/vite.config.ts` only. No source mutation, no
mutating git in any repo — the orchestrator owns the index + commit.
