# Q.R12 — Cross-Repo Dev-Resolution Architecture

**Lane**: Q.R12 — round-2 architectural deep-dive. The gestalt remediation design.
**Mode**: READ-ONLY audit. No source mutations. No mutating git. Planning-phase — design only.
**Date**: 2026-05-18.
**Inputs**: Qζ (B-1 P0 desync), Qα (value.js root causes), Qδ (phantom-devDep workaround-debt), Qβ/Qγ, `findings.md`.

---

## §1 Scope

Round-1 surfaced ~4 separate consumer-side band-aid-candidates that share ONE root:

1. value.js hard-aliases `@mkbabb/keyframes.js` → `keyframes.js/dist/keyframes.js` — a file deleted from keyframes.js's working tree.
2. value.js's `gh-pages` demo build clobbers its own library `dist/value.js` (`emptyOutDir:true` over a shared `dist/`).
3. glass-ui carries a phantom `@mkbabb/value.js` devDep (`file:../value.js`) — the P.W5 band-aid for a transitive-resolution gap.
4. consumer Vite configs were never re-swept after the AD.W4 `"development"`-conditional-exports flip.

These are not four bugs. They are four symptoms of **one missing artefact**: the `@mkbabb/*` family has a `"development"` conditional-export branch in every `package.json`, but **no repo declares the resolver-side half of the contract**, and **no document owns it**. The flip was applied to the *publisher* side (exports map) and never to the *consumer* side (resolver conditions). This lane designs the canonical contract, the per-consumer migration, the disposition of the phantom devDep + dist-clobber, and the ownership/enforcement model.

This is a **cross-repo dev-resolution contract desync** — Qζ's B-1 attribution, taken to its architectural root.

---

## §2 Current dev-resolution model — the as-is map

### §2.1 Per-package `exports["."]` — the publisher side (CONSISTENT)

All three `@mkbabb/*` packages declare the **identical** three-key conditional-exports shape:

| Package | `development` | `types` | `import` | `main`/`module` |
|---|---|---|---|---|
| glass-ui `1.8.5` | `./src/index.ts` | `./dist/index.d.ts` | `./dist/glass-ui.js` | `module` absent; `main` absent (root has no `main`) |
| keyframes.js `2.1.0` | `./src/animation/index.ts` | `./dist/keyframes.d.ts` | `./dist/keyframes.js` | `main: ./dist/keyframes.js` |
| value.js `0.5.1` | `./src/index.ts` | `./dist/index.d.ts` | `./dist/value.js` | `main: ./dist/value.js` |

The publisher side is **uniform and correct**. Each package declares: "a resolver that activates the `development` condition gets my live `src/` TypeScript; everyone else gets my built `dist/`." This is the AD.W4 canonical shape (CLAUDE.md §Subpath surface: "dev consumers resolve to `src/` directly, so a stale `dist/` cannot mislead them"). The `freshness` runtime gate retired (`949474a`) *because* this branch subsumed it.

**The defect is not in the exports maps. It is everywhere else.**

### §2.2 Per-repo Vite config — the resolver side (DESYNCED)

Vite activates the `development` condition **automatically in dev mode (`vite serve`/`vite dev`)** and **NOT in `vite build`** — it adds `development` to `resolve.conditions` only when `mode !== 'production'` is implied by the dev server. This is the load-bearing fact. With it, the as-is map:

| Repo | `resolve.conditions` set? | Hard `dist/` alias for an `@mkbabb/*` sibling? | dev-mode resolution of siblings |
|---|---|---|---|
| **glass-ui** | NO (config has no `resolve` block at all) | NO | Demo dev server resolves `@mkbabb/keyframes.js` → keyframes.js's `development` branch → `keyframes.js/src/animation/index.ts`. WORKS — because Vite auto-adds `development` in serve mode and keyframes.js's `node_modules` entry is the `file:` symlink. |
| **keyframes.js** | NO | `@mkbabb/keyframes.js` → `src/animation` (SELF-alias, line 146) | Self-aliases its own bare specifier so its demo imports its own source. Resolves `@mkbabb/value.js` + `@mkbabb/glass-ui` via auto-`development`. WORKS. No `server.fs.allow` widening → B-2 font 403. |
| **value.js** | NO | **`@mkbabb/keyframes.js` → `../keyframes.js/dist/keyframes.js` (line 30)** | The hard alias OVERRIDES conditional-exports entirely. Vite never consults keyframes.js's `exports` map — it jumps straight to the literal path. That path is **deleted**. → B-1 P0. |

**The desync, stated precisely**: glass-ui and keyframes.js *accidentally* work because Vite's serve-mode auto-`development` does the right thing and they have no hostile alias. value.js *fails* because it carries a pre-AD.W4 hard alias that **shadows** the conditional-exports mechanism. The hard alias is a fossil from the era *before* the `development` branch existed — when the only way to get a sibling's source in dev was to point at its build output. AD.W4 made that alias not just redundant but actively harmful: it pins a `dist/` path that the `development`-era cleanup is actively deleting.

Note keyframes.js's self-alias (`@mkbabb/keyframes.js → src/animation`) is the *same anti-pattern* in benign form — it works only because it happens to point at source. It still shadows the package's own `exports` map and would break the instant the entry path moves.

### §2.3 The phantom devDep — glass-ui's `@mkbabb/value.js`

glass-ui declares `@mkbabb/value.js: file:../value.js` in `devDependencies` (P.W5). glass-ui's `src/` imports `@mkbabb/value.js` **zero times** — it is not a glass-ui dependency at any layer. It exists because: glass-ui's test runner loads keyframes.js via the `development` condition → keyframes.js's `src/` imports `@mkbabb/value.js` → the runner must resolve that *transitive grand-child*. Declaring it as a glass-ui direct devDep makes the runner find it. Qδ R4 classified this correctly: **a phantom-dependency workaround** — the grandparent hoisting its grandchild's dependency into its own manifest. It papers the same desync from a third angle.

### §2.4 The value.js dist-clobber

`value.js/vite.config.ts`: `production` mode emits the **library** `dist/value.js` (`build.lib.entry = src/index.ts`). `gh-pages` mode emits the **demo app** into the same `outDir: ./dist/` with `emptyOutDir:true`. The two modes are mutually destructive — `npm run gh-pages` wipes `dist/value.js`. Any downstream consumer (keyframes.js) resolving `@mkbabb/value.js` via the `import` branch afterward fails ("Failed to resolve entry"). The `hero-lab` mode already does the right thing — `outDir: ./dist/hero-lab/` (line 71). `gh-pages` is the lone offender.

### §2.5 As-is verdict

The `"development"` conditional-exports model is **half-wired**: publisher side uniform and correct; resolver side has zero explicit declaration and one hostile fossil alias. The model *works by accident* in 2 of 3 repos and *fails outright* in the 3rd. An accident is not an architecture.

---

## §3 The canonical cross-repo dev-resolution contract — the to-be design

### §3.1 The contract, stated explicitly

> **The `@mkbabb/*` workspace dev-resolution contract.** Every `@mkbabb/*` package is BOTH a publisher and a consumer of its siblings. The contract has a publisher half and a consumer half; both are mandatory.

**Publisher half — every `@mkbabb/*` `package.json` `exports` entry MUST declare, in this key order:**

```jsonc
"exports": {
  ".": {
    "development": "./src/<entry>.ts",   // live source — for workspace-linked dev consumers
    "types":       "./dist/<name>.d.ts",  // built declarations
    "import":      "./dist/<name>.js",    // built ESM — the published default
    "default":     "./dist/<name>.js"     // belt-and-braces terminal fallback (NEW — see §3.3)
  }
}
```

The `development` key must come **first** (conditional-exports is first-match-wins; `development` is the most specific). All three packages already satisfy keys 1-3; only `default` is missing (Qα R1 flagged this for value.js — generalise it to all three).

**Consumer half — every `@mkbabb/*` repo's `vite.config.ts` MUST:**

1. **Declare `resolve.conditions` explicitly** rather than rely on Vite's serve-mode auto-injection:
   ```ts
   resolve: {
     conditions: ["development", ...],   // dev/serve configs
   }
   ```
   Vite *does* auto-add `development` in serve mode, but relying on an implicit default is exactly the half-wired fragility this contract closes. An explicit `conditions` array is self-documenting and survives a Vite-default change. Library `build` configs **omit** `development` (they must consume siblings' built `dist/`, or `external` them — see §3.4).

2. **Carry ZERO hard `dist/` alias for any `@mkbabb/*` sibling.** A bare specifier (`@mkbabb/keyframes.js`) resolves through the sibling's `exports` map via the `file:` symlink in `node_modules`. That IS the mechanism. A `resolve.alias` entry **shadows and defeats** it. This includes self-aliases (keyframes.js's `@mkbabb/keyframes.js → src/animation`): a package reaches its own source via `@/` or relative paths, never by aliasing its own published name.

3. **Widen `server.fs.allow`** to include every workspace-linked `@mkbabb/*` sibling root, because the `development` branch serves that sibling's `src/` (and its `src/`-relative assets — fonts, CSS) over Vite's `/@fs/` channel. This is the §3.5 fix for B-2.

**The prohibition — what MUST NOT be done:**

- ❌ No hard `dist/` alias for any workspace sibling (defeats conditional-exports; pins a build artefact the dev model deletes).
- ❌ No self-alias of a package's own published name.
- ❌ No hoisting a transitive sibling's dependency into a grandparent's `devDependencies` (the phantom-devDep anti-pattern — §5.1).
- ❌ No checked-in `dist/` artefact as a resolution target. `dist/` is `.gitignore`d in all three repos; relying on its presence is relying on a non-tracked, non-reproducible artefact.

### §3.2 Why this is the gestalt fix, not a band-aid

The conditional-exports mechanism is the **single source of truth** for "how does a consumer reach this package." A hard alias is a *parallel, divergent* truth that silently wins. The desync (B-1) is precisely the two truths disagreeing. The remediation is not "fix the alias target" (a band-aid — it would re-rot the instant an entry path moves) — it is **delete the parallel truth entirely** so the `exports` map is the *only* resolution authority. Every repo then resolves siblings the same way, by the same mechanism, with no per-repo special-casing. That is the architectural transposition: one mechanism, zero fossils.

### §3.3 The `default` terminal condition

`development`/`types`/`import` leave a gap: a resolver that activates *none* of those conditions (a CJS `require`, an exotic bundler, a plain `node -e 'import(...)'` probe without `--conditions`) gets no match → "Failed to resolve entry." Adding `"default"` as the terminal key (pointing at the same built ESM as `import`) closes the gap. This is idiomatic — `default` is the conditional-exports spec's designated fallback. It is *not* a workaround; it is completing the map.

### §3.4 Library-build resolution (the `vite build` path)

When a `@mkbabb/*` package builds its **library** (`vite build --mode production`), it must NOT resolve siblings to their `src/` — it must either (a) `external` them (keyframes.js already does: `external: [..., "@mkbabb/value.js"]`) so the consumer supplies them, or (b) consume their built `dist/`. The contract therefore says: `development` belongs in **dev/serve** configs only; **build** configs either externalise siblings or omit the condition. This is already keyframes.js's posture for its library build and should be the documented norm.

### §3.5 `server.fs.allow` (closes B-2)

The `development` branch resolves a sibling's `src/` — and glass-ui's `src/`-relative CSS references `src/fonts/fira-code/*.woff2`. Vite serves those over `/@fs/` only if the path is inside `server.fs.allow`. The contract: every dev config widens `server.fs.allow` to the workspace root (or each linked sibling root). One line, and it is the *same* class as B-1 — a resolver assumption the `development` flip invalidated.

---

## §4 Per-desynced-consumer migration

| # | Repo | Current defect | Migration (gestalt; zero band-aid) |
|---|---|---|---|
| M1 | **value.js** | Hard alias `@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js` (line 30) — points at a deleted file → B-1 P0. | **Delete the alias line.** value.js already declares `@mkbabb/keyframes.js: file:../keyframes.js` in devDeps; the bare specifier then resolves through keyframes.js's `exports` map. Add `resolve.conditions: ["development"]` to the dev/serve config branch. Add `server.fs.allow` widening. |
| M2 | **value.js** | `gh-pages` mode shares `outDir: ./dist/` + `emptyOutDir:true` with the `production` library build → library clobber (Qα R1). | **Route the demo to `dist/gh-pages/`** — mirror the existing `hero-lab → dist/hero-lab/` precedent (line 71). The library `dist/value.js` and the demo build then never collide. |
| M3 | **value.js** | `exports["."]` lacks a `default` terminal condition. | Add `"default": "./dist/value.js"` as the terminal key (§3.3). |
| M4 | **keyframes.js** | Self-alias `@mkbabb/keyframes.js → src/animation` (line 146) — benign today, shadows its own `exports` map. | **Delete the self-alias.** keyframes.js's demo reaches its own source via `@src` (already aliased, line 140) or relative imports — never via its own published name. Add explicit `resolve.conditions: ["development"]` to the dev config. |
| M5 | **keyframes.js** | No `server.fs.allow` widening — glass-ui `src/` fonts 403 over `/@fs/` → B-2. | Widen `server.fs.allow` to the workspace root / linked sibling roots (§3.5). |
| M6 | **keyframes.js** | `exports["."]` lacks `default`. | Add `"default": "./dist/keyframes.js"`. |
| M7 | **glass-ui** | No explicit `resolve.conditions` (works by Vite serve-mode accident); root `exports` lacks `default`. | Add an explicit `resolve.conditions: ["development"]` to the demo dev config and `"default": "./dist/glass-ui.js"` to root `exports`. glass-ui has no hostile alias — this is the cheapest migration, pure hardening. |

Each migration is a **deletion or a one-line addition** — there is no new mechanism to build, because the mechanism (conditional-exports) already exists and is correct. The migration is *removing the things that fight it*.

---

## §5 Phantom devDep disposition + value.js dist-clobber fix

### §5.1 Phantom devDep — `@mkbabb/value.js` in glass-ui — RETIRE

**Disposition: delete it from glass-ui's `devDependencies`.** It papers the same desync. The correct architecture:

- glass-ui's test runner loads keyframes.js via the `development` condition; keyframes.js's `src/` imports `@mkbabb/value.js`; the runner must resolve that transitive sibling.
- The canonical fix is **not** for glass-ui (the grandparent) to hoist value.js into its own manifest. It is for the resolution to **walk the real dependency graph**: keyframes.js declares `@mkbabb/value.js` in its own `dependencies` (it already does — `value.js: file:../value.js` in keyframes.js's `dependencies`). A `file:` link installs a symlink in `keyframes.js/node_modules/@mkbabb/value.js`; Node/Vite's nested resolution finds it from keyframes.js's `src/` *without* glass-ui declaring anything.
- The phantom devDep exists because the test runner's resolution was not walking the nested `node_modules`. Once M1/M4 land (no hostile aliases) and glass-ui's test config declares `resolve.conditions: ["development"]` + `server.fs.allow` widening, the transitive `value.js` resolves through keyframes.js's own node_modules symlink. The grandparent declaration becomes dead weight — **retire it** (Q6 no-legacy; Qδ R4).
- Verification gate: after retiral, `npm test` in glass-ui must still pass 364/364. If it does not, the *real* defect (nested resolution / `fs.allow` scope) is exposed and fixed at root — which is the point. The phantom devDep was hiding that defect.

### §5.2 value.js dist-clobber — idiomatic fix

**The fix is M2: separate output directories.** But the *gestalt* framing is broader — the root cause is that value.js's `dist/` is overloaded as **both** the library publish target **and** the gh-pages deploy target. Those are two unrelated artefacts sharing one directory with `emptyOutDir:true`.

Idiomatic resolution, in order of preference:

1. **Demo builds go to a demo-scoped subdir** — `dist/gh-pages/`, mirroring the existing `dist/hero-lab/`. The library `dist/value.js` is then never in the blast radius of `emptyOutDir`. This is the minimal, precedent-aligned fix and is M2.
2. **(Stronger, optional)** The library build target and demo build target are conceptually distinct enough that the demo could emit to a sibling like `gh-pages-dist/` entirely outside `dist/`. But (1) already fully closes the clobber class and matches the in-repo `hero-lab` precedent — no need to invent a new convention.

The dist-clobber is *not* a dev-resolution-contract item per se (it bites the `import`/published path, not the `development` path) — but it is the **same cohesion gap**: value.js's build config treats `dist/` as a scratch directory with no owner. The fix belongs in the same Q wave because it is the same class of "build artefact with no contract."

---

## §6 Contract ownership + enforcement recommendation

The cross-repo dev-resolution contract is a **cohesion surface that currently has no owner** — exactly the Q9 "ensure proper co-location, cohesion" gap. Round-1 (Qζ §6.4) named it; this lane assigns it a home and an enforcer.

### §6.1 Ownership — glass-ui is the canonical home

glass-ui is the **hub** of the `@mkbabb/*` constellation (both siblings devDep it; it is the design-system substrate). The contract should be owned by glass-ui and published as a precept-level document:

- **Primary home**: a new section in glass-ui's `docs/precepts/` — e.g. `docs/precepts/cross-repo-dev-resolution.md` — stating the §3 contract verbatim as a **binding edict** across the `@mkbabb/*` workspace. This is precept-level because it spans repos and is a *cohesion invariant*, not a glass-ui-internal convention.
- **CLAUDE.md cross-reference**: glass-ui's CLAUDE.md `## Subpath surface` already documents the `development` branch one-sidedly ("dev consumers resolve to `src/` directly"). Add the *consumer half* — a short paragraph + link to the precept doc — so the publisher and consumer halves are documented together. The current one-sided documentation is itself part of why the flip was half-applied.
- **CONSTELLATION.md**: if the Q tranche authors a `coordination/CONSTELLATION.md` (per `findings.md` §7), the cross-repo resolution contract is a natural CONSTELLATION section — it is *the* inter-repo wiring contract. Recommend: the precept doc is the normative text; CONSTELLATION.md references it as the constellation's resolution-layer spec.

### §6.2 Enforcement — a proof script, not vigilance

Documentation alone re-rots (the `development` flip was documented and still half-applied). The contract needs a **mechanical gate**. Recommend a new proof script in glass-ui's `scripts/` — `proof-resolution-contract.mjs` — folded into `npm run proof:all` and CI, asserting, for glass-ui **and each linked `@mkbabb/*` sibling**:

1. `exports["."]` declares `development` + `types` + `import` + `default`, in that key order.
2. No `vite.config.*` `resolve.alias` entry whose key matches `@mkbabb/*` (catches B-1's hostile alias + keyframes.js's self-alias class).
3. Each dev/serve config branch declares `resolve.conditions` including `development` explicitly.
4. `server.fs.allow` (when set) includes the linked sibling roots.
5. No `@mkbabb/*` package appears in a `devDependencies` block while being imported **zero** times in that package's own `src/` (catches the phantom-devDep class — §5.1).

This generalises the existing `verify-export-types` / `proof-consumers-*` family. It is the §6 "stays enforced" answer: the contract is binary and machine-checkable, so make a machine check it. The K-invariant-3 recurrence pattern (codified-but-not-prevented) is the cautionary precedent — an edict without a gate does not hold.

---

## §7 Recommended Q-wave architecture

A clean, band-aid-free decomposition. Each wave is self-contained; lanes within a wave are parallelisable. **Planning artefact only — no implementation this round (Q10).**

### Wave QW-DR1 — Contract codification (glass-ui-side; foundation)

- **Lane A** — Author `docs/precepts/cross-repo-dev-resolution.md` with the §3 contract verbatim as a binding cross-repo edict.
- **Lane B** — Amend glass-ui CLAUDE.md `## Subpath surface` with the consumer-half paragraph + precept cross-link.
- **Lane C** — Author `scripts/proof-resolution-contract.mjs` (§6.2 checks 1-5); wire into `proof:all` + `ci.yml`.
- **Gate**: the proof script runs and *reports* the current desync (it should FAIL pre-remediation — that failure is the wave's proof the gate has teeth).

### Wave QW-DR2 — glass-ui-side hardening (the cheapest migration)

- **Lane A** — Add `"default"` terminal condition to glass-ui root `exports` (M7).
- **Lane B** — Add explicit `resolve.conditions: ["development"]` + `server.fs.allow` widening to glass-ui's demo dev config (M7).
- **Lane C** — Retire the phantom `@mkbabb/value.js` devDep (§5.1); run `npm test`, must hold 364/364. If it breaks, root-cause the nested-resolution defect here.
- **Gate**: `proof-resolution-contract.mjs` passes for glass-ui; test suite green.

### Wave QW-DR3 — keyframes.js cross-repo write

- **Lane A** — Delete the self-alias `@mkbabb/keyframes.js → src/animation`; add explicit `resolve.conditions` (M4).
- **Lane B** — Widen `server.fs.allow` to the workspace root (M5, closes B-2).
- **Lane C** — Add `"default"` to keyframes.js `exports` (M6).
- **Gate**: keyframes.js demo dev server boots clean; glass-ui font 403 gone; `proof-resolution-contract.mjs` passes for keyframes.js.

### Wave QW-DR4 — value.js cross-repo write (the B-1 P0 fix)

- **Lane A** — Delete the hostile `@mkbabb/keyframes.js → dist/` alias; add explicit `resolve.conditions` + `server.fs.allow` (M1). **This is the headline P0 remediation.**
- **Lane B** — Route `gh-pages` mode to `outDir: ./dist/gh-pages/` (M2 — dist-clobber fix).
- **Lane C** — Add `"default"` to value.js `exports` (M3).
- **Gate**: value.js dev server boots and the color-picker renders (Qζ B-1 reproduction reversed); `npm run gh-pages` no longer wipes `dist/value.js`; keyframes.js's `gh-pages` build (which resolves `@mkbabb/value.js`) passes; `proof-resolution-contract.mjs` passes for value.js.

### Wave ordering + rationale

DR1 first (the gate must exist to verify DR2-4). DR2 next (glass-ui-internal, lowest risk, proves the contract on the hub). DR3 + DR4 are independent cross-repo writes and may run in parallel — but DR4's Lane-A gate (value.js boots) transitively depends on keyframes.js's `exports` being well-formed, which it already is, so no hard ordering between DR3/DR4 is required. The full Q-wave closes B-1 (P0), B-2 (cosmetic), the phantom devDep, and the dist-clobber — **zero band-aids; each fix removes a fossil rather than adding a patch.**

### Note on the value.js Card-API migration (Qα R2)

The 11-SFC `<Card variant="pane">` migration (Qα R2) is a *separate* cohesion item — un-migrated consumer API debt, not a resolution-contract item. It belongs in its own Q wave alongside Qα R2/R3/R4. It is named here only to scope it OUT of QW-DR* — the dev-resolution waves must not absorb it.

---

## §8 Status

**Lane status**: COMPLETE — Q.R12 round-2 architectural deep-dive deliverable.

**Headline**: the four round-1 band-aid-candidates (value.js hard alias / dist-clobber / glass-ui phantom devDep / un-swept consumer Vite configs) are **one architectural defect** — the `"development"` conditional-exports model was applied to the publisher side (every `exports` map) and **never to the resolver side**. The model works by accident in 2 of 3 repos and fails outright in value.js because of a pre-AD.W4 fossil alias that *shadows* conditional-exports.

**The gestalt remediation** (§3): codify a two-halved cross-repo dev-resolution contract — publisher half (4-key `exports`: `development`/`types`/`import`/`default`) + consumer half (explicit `resolve.conditions`, ZERO hard `dist/` aliases, widened `server.fs.allow`). The migration (§4) is *deletion* of the fossils that fight the existing mechanism, not new machinery — 7 one-line changes across 3 repos.

**Phantom devDep** (§5.1): RETIRE — it hoists a transitive grandchild's dependency into the grandparent's manifest; the canonical fix is real nested-graph resolution, which the contract enables.

**Dist-clobber** (§5.2): route value.js's `gh-pages` demo build to `dist/gh-pages/`, mirroring the existing `dist/hero-lab/` precedent — `dist/` stops being an unowned scratch directory.

**Ownership + enforcement** (§6): the contract is a precept-level edict owned by glass-ui (`docs/precepts/cross-repo-dev-resolution.md`), cross-referenced from CLAUDE.md + CONSTELLATION.md, and **mechanically gated** by a new `proof-resolution-contract.mjs` in `proof:all` + CI. An edict without a gate does not hold — the K-invariant-3 recurrence is the proof of that.

**Recommended Q architecture** (§7): 4 waves — QW-DR1 (contract codification + proof gate), QW-DR2 (glass-ui hardening + phantom-devDep retiral), QW-DR3 (keyframes.js write), QW-DR4 (value.js write — the B-1 P0 fix). Each wave gated; zero band-aid; every fix removes a fossil.

Read-only; no source mutated; no git mutated. Handoff to the Q orchestrator for synthesis into `Q.md` + `waves/`.
