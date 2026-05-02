# E — Publication Contract Cutover

E replaces the prior “Subpath Publication + Tailwind Plugin” plan. D closed the substrate-with-consumer thesis, but current `HEAD` has drifted past `d-close`: `useInterval` and `@utils` resolution were restored after D-II, while D close documents still say they were removed. E therefore starts with contract reconciliation before any package publication edit. The tranche completes one path: publish the current consumed surface through explicit package contracts, migrate the three known consumers, and prove build/runtime/type compatibility.

## Thesis

The package boundary should match real use. A consumer importing a core button should not load dock, search, sidebar, or shader surfaces; a consumer using dock should import dock through one dock subpath; styles should enter through one public CSS path. The cutover is not a compatibility-shim exercise and not a broad design-system refactor. It is a contract normalization: every public symbol has exactly one intended import path, every exported subpath has emitted JS and declaration targets, and every known consumer builds after migration.

## Invariants

1. C and D invariants still bind: KISS, no quick fixes, no legacy, no silent deferrals, consumed substrate, evidence over claims.
2. One public import path per public symbol at E close.
3. No permanent deprecation barrel, warning shim, fallback plugin, or parallel old/new style path.
4. Top-level `@mkbabb/glass-ui` exports only the W0-defined core allowlist.
5. Non-core public packages export from explicit subpaths only.
6. `@mkbabb/glass-ui/styles` is the single public CSS entry for E; `./styles/*` wildcard publication is retired unless W0 proves a current consumer that cannot migrate in E.
7. `@utils`, `useInterval`, dock internals, sidebar legacy helpers, and component-package composables are contract decisions in W0, not assumptions.
8. Consumer builds are hard gates, not follow-up work.
9. Bundle and CSS deltas are recorded as measurements. They become hard gates only in a later tranche if E’s baseline proves stable floors.
10. Scope reveal uses the shared SPEC protocol; no shadow APIs or unconsumed scaffolding.

## Tranche Artifacts

- Research synthesis: `docs/tranches/E/research/00-six-lane-audit-synthesis.md`
- Initial plan challenge: `docs/tranches/E/audit/W0-challenge.md`
- Wave specifications: `docs/tranches/E/waves/W0.md` through `docs/tranches/E/waves/W4.md`
- Agent dispatch template: `docs/tranches/E/dispatch/AGENT.md`
- Progress log: `docs/tranches/E/PROGRESS.md`

W0 is the only dispatchable wave at tranche open. W1 is blocked until W0 produces the contract, consumer, style, package-export, build-parity, velocity, and challenge ledgers named in `waves/W0.md`.

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Contract audit + drift reconciliation | 6 | parallel research + orchestrator synthesis | export/import/style ledger names one destination for every public symbol and resolves post-D drift | complete_with_misses |
| W1 | Package contract cutover | 3-4 | parallel on disjoint files, orchestrator on shared config | build, emitted declarations, export verification, pack dry-run, and package import probe pass | complete |
| W2 | Three consumer migrations | 3 | parallel, one consumer each | all consumers build with new subpaths and one style path; removed paths absent | complete |
| W3 | Runtime + bundle proof | orchestrator | sequential | local routes and consumer smoke routes pass; JS/CSS deltas recorded | complete |
| W4 | Re-audit + close ceremony | 4 + orchestrator | parallel audit + direct close | overfitting/export audit clean or named residual; FINAL, retro, `e-close` | complete |

## W0 — Contract Audit + Drift Reconciliation

Mechanism:

1. Audit current root exports, subpackage barrels, package exports, emitted declaration targets, public CSS exports, and all current consumer imports.
2. Reconcile current `HEAD` against D close claims:
   - `useInterval` is currently exported again after D said it was deleted.
   - `@utils` is currently a source/config alias again after D said package-local alias leakage was removed.
   - `vite.iter.config.ts` must be checked against the real build shape and current aliases.
3. Produce a ledger with one row per public symbol: `symbol | current path | current consumer evidence | E destination | action`.
4. Produce a style ledger: `current import | consumer | E path | migration`.
5. Produce a package-export ledger: every planned `package.json#exports` key, JS target, declaration target, and owning source barrel.

Agent lanes:

- W0.A original-plan recap: D/D-II/E plan-vs-actual and precepts.
- W0.B dead/legacy surface: public exports, aliases, shims, legacy helpers, under-consumed code.
- W0.C process lessons: C and D/D-II tranche process, gate hardening, scope reveal.
- W0.D future fold-in: rewrite old E/F ideas into one path and retire speculation.
- W0.E velocity substrate: iter/build/test/profile/consumer scripts and proof gaps.
- W0.F tranche-spec challenge: challenge W0 findings before W1 dispatch.

Hard gate:

- `docs/tranches/E/audit/W0-contract-ledger.md` exists and classifies every current root export.
- `docs/tranches/E/audit/W0-consumer-imports.md` lists imports from `fourier-analysis/web`, `words/frontend`, and `bbnf-lang/playground`.
- `docs/tranches/E/audit/W0-style-ledger.md` lists all current glass-ui style imports and the one E migration path.
- `docs/tranches/E/audit/W0-package-exports.md` lists every planned package export key, JS target, type target, and source owner.
- `docs/tranches/E/audit/W0-build-parity.md` reconciles `vite.config.ts`, `vite.iter.config.ts`, `vitest.config.ts`, and `tsconfig.json`.
- `docs/tranches/E/audit/W0-velocity-ledger.md` defines the fast, proof, profiling, and close command tiers with write behavior.
- `docs/tranches/E/audit/W0-challenge.md` records accepted/rejected research claims.
- W1 file bounds are amended from those ledgers before implementation.

## W1 — Package Contract Cutover

Mechanism:

1. Create the W0-defined core entry.
2. Populate explicit package subpaths for non-core packages that remain public.
3. Remove broad wildcard style publication unless W0 names a current same-tranche migration blocker.
4. Keep one CSS entry: `@mkbabb/glass-ui/styles`.
5. Make Vite build every exported JS entry and emit matching declarations.
6. Extend export verification so it checks object and string exports, declaration targets, import targets, and a packed-package import probe.

Hard gate:

- `npm run iter` exits 0.
- `npm run build` exits 0 from a clean `dist`.
- `npm run verify-export-types` exits 0 and covers every export form.
- `npm pack --dry-run` shows only intended package files.
- A local fixture imports the packed package root, `./tokens`, `./styles`, and every new subpath through package exports and typechecks.

## W2 — Three Consumer Migrations

Mechanism:

1. In each consumer, rewrite non-core imports from `@mkbabb/glass-ui` to the E subpath ledger.
2. Rewrite glass-ui style imports to the single E style path.
3. Remove imports from retired paths rather than leaving compatibility aliases.
4. Build each consumer and record the result.

Consumer lanes:

- W2.A `../fourier-analysis/web`
- W2.B `../words/frontend`
- W2.C `../bbnf-lang/playground`

Hard gate:

- `scripts/validate-consumers.sh` exits 0.
- `rg 'from ["'\"']@mkbabb/glass-ui["'\"']'` in each consumer returns only W0-approved core imports.
- Retired style paths are absent from all three consumers.

## W3 — Runtime + Bundle Proof

Mechanism:

1. Walk representative local story routes in the in-app browser: current route, dock, rail, search, sidebar, carousel, aurora, and one primitive route.
2. Capture console-error counts and no-fallback route evidence.
3. Record package dist sizes and consumer JS/CSS deltas against W0 baselines.
4. Record results in `docs/tranches/E/audit/W3-runtime-bundle-proof.md`.

Hard gate:

- Local story route proof has zero console errors and no fallback render.
- Consumer builds remain green after W3 measurement.
- Bundle/CSS deltas are recorded; no percentage/byte target blocks E close.

## W4 — Re-Audit + Close Ceremony

Mechanism:

1. Re-run the hardened overfitting/export audit on the post-migration package surface.
2. Run `scripts/ay-close.sh`.
3. Write `docs/tranches/E/FINAL.md`.
4. Write `docs/tranches/E/audit/E-retro.md`.
5. Tag `e-close`.

Hard gate:

- Re-audit actionable count is <= 5, or a named residual tranche is opened before close.
- `scripts/ay-close.sh` exits 0.
- `FINAL.md` and retro cite commands, consumer evidence, and commits.
- `e-close` resolves to the close commit.

## Critical Files

| File | Access | Reason |
|---|---|---|
| `docs/tranches/E/**` | create/modify | tranche plan, research, challenge, proof, close |
| `package.json` | modify | package exports, scripts, files/types metadata |
| `vite.config.ts` | modify | multi-entry build and declaration output |
| `vite.iter.config.ts` | modify | no-dts build parity with package entries |
| `vitest.config.ts` | modify if W0 requires | fast test parity |
| `tsconfig.json` | modify if W0 requires | alias/type path contract |
| `scripts/verify-export-types.mjs` | modify | export and packed-package verification |
| `scripts/validate-consumers.sh` | modify if W0 requires | consumer proof |
| `src/index.ts` | modify | W0-defined core root entry |
| `src/**/index.ts` | modify | explicit public subpaths |
| `src/styles/**` | modify | one public style entry |
| `tests/**` | modify/create | package contract probes and public-surface checks |
| `../fourier-analysis/web/**` | modify in W2.A | consumer migration |
| `../words/frontend/**` | modify in W2.B | consumer migration |
| `../bbnf-lang/playground/**` | modify in W2.C | consumer migration |

## Explicit Retirements From Old E

- Retired: permanent top-level deprecation shim for non-core symbols.
- Retired: Tailwind plugin extraction as an E hard deliverable.
- Retired: static plugin fallback path.
- Retired: hard JS 30% and CSS 12 kB close gates.
- Retired: F escape ledger for prop unification, broad a11y expansion, and consumer adoption expansion.
- Retired: `useClipboard` in the core allowlist unless W0 finds current source.

## Brittleness Window

E may temporarily break package imports during W1 before W2 migrations. The window closes before W3:

```yaml
breaking_changes_during_wave: yes
suspended_gates:
  - scripts/validate-consumers.sh may fail after package exports are changed in W1 and before all three consumers are migrated in W2
  - consumer source imports may temporarily reference retired root or style paths only inside the W1 -> W2 migration window
restoration_wave: W2
reason: one-path publication is cleaner than a compatibility shim
```

No close command may run while this window is open.
