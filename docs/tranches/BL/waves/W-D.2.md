# W-D.2 · W-PERIPHERY: config, workflows, harness and demo on the shape W-D.1 fixes · 11.0.0

| field | value |
|---|---|
| seat | band-D wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8141658d` (the task named `f3ad78d0`; `git diff --stat f3ad78d0 HEAD -- . ':!docs'` prints nothing). Measured in scratch worktree `wt` at HEAD, in `wt2` (HEAD with route B's committed pass-4 chain replayed, digest `472cf49336969d4f…`, `chain final MATCH`), and in a fixture repository built for the pass case |
| ships in | 11.0.0 |
| families | F-60 whole (`audit/REGISTRY.md:1326-1336`); L14-01's execution (its decision is W-D.1's, F-55) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

Short cites: `REG:n` is `audit/REGISTRY.md`; `D1:n` is `design/structure/REGISTRY.md`; `RUL` is `design/structure/RULINGS.md`; `LAW §n` is `design/structure/pass-4/B-kit/LAW.md`.

## 1 · What it closes

| id | what | here, or where |
|---|---|---|
| L14-01 | the periphery settlement (BJ STRUCTURE-ZONES §5-§6) rode two closes unstarted | executed here; W-D.1 decides the disease row |
| L14-07 | 86 of 256 test files mirror no `src` path; two vitest files launch Chromium; `vitest.config.ts` carries dead globs | the mirror is decided by R-3 and executed by W-D.1 (tests move to `<unit>/__tests__/`); here: browser work out of vitest, the dead `development` condition and `.vue` test glob |
| L14-08 | `scripts/`: long files, dead modules, duplicated helpers, naive comment lexers | dead modules and placement: W-D.1 (R-8; the chain deletes `canon-doc.mjs` and moves `paint-arm.mjs` and `reflect-capture-verify.mjs` to `tests-visual/paint/`); files over 500 lines: W-D.1's B6; here: one comment lexer |
| L14-06 (the `tests/` half) | `read`, `walk`, `ROOT` and a naive comment strip redeclared per file | here (the `tests-visual/` half is W-A.1's) |
| L14-10 | tooling inputs in closed-record dirs | closed by W-C.1 step 5, W-A.2 (`gate-register.mjs` goes) and W-A.5 (`profile-bundle.mjs` goes); this wave adds nothing |
| L14-11 | ci and release duplicate the verify job; `npm ci` builds twice through `prepare` | here; the tag path and the INC-2 receipt are W-A.3 and W-A.4 |
| L14-12 | 9 root `vite*.ts` (1,330 lines), 4 tsconfigs, one config serving demo and library, `iter*` duplicate, `@glass` defined 4 times, hand-listed externals, the dead `development` condition | here |
| L14-13 | demo colocation gaps: `Code.vue` and `shell/configurator/index.ts` with no code reader, 10 glob-loaded stories with no manifest row, a façade relay, single-consumer helpers in shared chassis | here |
| L13-07 | the `@glass` alias defined four times and a false "one-line move" claim (`vite.config.ts:15-21`) | here (one declaration); the move mechanics are W-D.1's engine |
| L13-11 | tests mirror `src`; N-1's reach over tests undecided | decided by R-3 (RUL R-3), executed by W-D.1; here the harness keeps no path literals and no redeclared helpers |
| R10-02-11 | `ENGINE_HOMES` hard-codes three `src` paths in a gate (`tests/gates/overfit-structure.test.ts:425-429`); config duplication; `@glass` ×4 | here: gate homes come from the entry record or the graph |

## 2 · The defect at HEAD

Appendix A (`d2-probe.mjs`) at HEAD, exit 1:

```
FAIL ROOT-CONFIG 7 :: 9 root vite/vitest modules: vite.config.ts vite.dark-stamp.ts vite.iter.config.ts vite.library.ts vite.style-assets.ts vite.style-fold.ts vite.targets.ts vite.utility-emit.ts vitest.config.ts
FAIL TSCONFIG 2 :: tsconfig.build.json tsconfig.json tsconfig.src.json tsconfig.test.json
FAIL ALIAS 3 :: demo/vite.demo-dist.config.ts:56 vite.config.ts:24 vitest.config.ts:22
FAIL DEAD-CONDITION 1 :: vitest.config.ts resolve.conditions
FAIL PREPARE 1 :: scripts.prepare = "npm run build"
FAIL ONE-VERIFY 7 :: .github/workflows/ci.yml:22 typecheck | ci.yml:30 build | ci.yml:31 test | release.yml:48 typecheck | release.yml:50 build | release.yml:58 test (and no verify.yml)
FAIL GATE-LITERALS 24 :: 5 files: tests/gates/orphan-css-partial.test.ts:337 … tests/gates/overfit-structure.test.ts:426 427 428 …
FAIL BROWSER-IN-VITEST 2 :: tests/components/custom/dock/GlassDock.stagger.test.ts tests/components/slider.size-tokens.test.ts
FAIL DEMO-UNROUTED 10 :: demo/stories/data/avatar.vue demo/stories/display/dark-mode-toggle.vue …/separator.vue …/status-dot.vue demo/stories/feedback/toaster.vue demo/stories/forms/label.vue …/select.vue demo/stories/foundations/paper-texture.vue demo/stories/motion/countup.vue …/typewriter.vue
FAIL RELAY 1 :: demo/shell/configurator/usePresetEditor.ts
FAIL ONE-LEXER 68 :: 50 files
FAIL HELPERS 51 :: 51 files
```

Detail behind the arms:

- **Root config.** The 8 `vite.*.ts` and `vitest.config.ts` hold 1,330 lines; `vite.style-fold.ts` alone is 586. `vite.iter.config.ts` repeats `vite.config.ts`'s library build (`vite.iter.config.ts:13-31`) and is reachable only from `package.json:482-483` (`iter-build`, `iter-check`, the latter through `tsconfig.src.json`, whose whole body is `extends` plus `include: ["src/"]`). `demo/vite.demo-dist.config.ts:5-7` imports three root build modules. The demo's HTML entry is the root `index.html` (`demo/vite.demo-dist.config.ts:21`), and `vite.config.ts` serves the demo dev server and the library build at once (`package.json:480` `"dev": "vite"`).
- **The alias.** `@glass` is declared in `tsconfig.json:18`, `vite.config.ts:24`, `vitest.config.ts:22` and `demo/vite.demo-dist.config.ts:56`.
- **The dead condition.** `vitest.config.ts:20` resolves `development` first; no installed `@mkbabb/*` package declares that condition (`grep '"development"' node_modules/@mkbabb/*/package.json` prints nothing). No tracked `*.test.vue`/`*.spec.vue` file exists for `vitest.config.ts:33`'s glob.
- **Two builds, twice.** `package.json:486` `"prepare": "npm run build"` runs inside every `npm ci`, and both workflows then run `npm run build` again (`ci.yml:20,30`, `release.yml:40,50`). `ci.yml:13-31` and `release.yml:33-58` are the same steps (checkout, node 24, `npm ci`, Chromium, typecheck, demo build, build, test).
- **Externals by hand.** `vite.library.ts:29-38` lists 8 peer strings; `package.json` `peerDependencies` holds the same packages as data.
- **Gate literals.** `tests/gates/overfit-structure.test.ts:425-429` `ENGINE_HOMES` names three files, two of which are the ends of the `motion → tabs` back-edge that W-D.1 re-homes (REG:1332); 24 such lines in 5 gate files.
- **Demo.** The floor's placement over the `demo` zone proposes 40 moves at HEAD (`placement.mjs --zone demo`: `"move": 40`), among them `demo/examples/{Card,Configurator,Toaster}Example.vue` → beside their one story, chassis helpers with one reader, and the 10 unrouted stories read only by a family page. `demo/chassis/code/Code.vue` and `demo/shell/configurator/index.ts` have no code reader; their only edges are `demo/demo.css`'s `@source` scans (appendix B: `CSS-SOURCE-ONLY 2`). `demo/shell/configurator/usePresetEditor.ts` is a relay whose code is two `export … from "./preset-editor/store"` statements.
- **Lexers and helpers.** 68 code lines in 50 files strip comments with `/\/\*[\s\S]*?\*\//`, the strip `scripts/verify-export-types.mjs:374` names as wrong (it eats from a `/*` inside `@source "../*.js"`), while `verify-export-types.mjs:377` already has a string-aware `stripCssComments`. 51 test files declare their own `ROOT`, `read`, `walk` or `readSource`.

**None of this moves on the loop's tree.** The same probe on `wt2` (route B's pass-4 chain) is RED on every arm: `ROOT-CONFIG 7`, `TSCONFIG 1` (the floor's `fd7` deleted `tsconfig.build.json`), `ALIAS 3`, `DEAD-CONDITION 1`, `PREPARE 1`, `ONE-VERIFY 7`, `GATE-LITERALS 24`, `BROWSER-IN-VITEST 2` (now `src/components/dock/__tests__/GlassDock.stagger.test.ts` and `src/components/slider/__tests__/slider.size-tokens.test.ts`), `DEMO-UNROUTED 10`, `RELAY 1`, `ONE-LEXER 67`, `HELPERS 53`; the demo placement still proposes 40 moves. The loop's law seals `src` and `scripts` only (LAW §1), so this band is W-D.2's.

## 3 · The cure

1. **Build modules move under the seal.** The root keeps `vite.config.ts` (the library build) and `vitest.config.ts`, which the tools discover by name. `vite.dark-stamp.ts`, `vite.library.ts`, `vite.style-assets.ts`, `vite.style-fold.ts`, `vite.targets.ts` and `vite.utility-emit.ts` move into one scripts module, `scripts/build/`, with a door (`index.ts`, TypeScript, LAW §1). Once there, W-D.1's seal judges them: doors (B1, B7), purity (B14), and R-5's bound (B6), so `vite.style-fold.ts` (586 lines) is split into named modules. `vite.iter.config.ts`, `tsconfig.src.json` and the `iter-build`/`iter-check` scripts are deleted.
2. **The demo owns its build.** `demo/vite.config.ts` (the renamed `demo/vite.demo-dist.config.ts`) serves the dev server and the demo dist, with `root: "demo"`; `index.html` moves to `demo/index.html`. `package.json` `dev` and `demo:dist:build` point at it. Root `vite.config.ts` builds the library only. Readers of the old paths are re-pointed by the floor's move engine (`tests/styles/layout-canon.test.ts:81`, `tests/gates/boot-graph.test.ts`, `tests-visual/served-app-sentinel.ts:22`).
3. **One alias declaration.** `tsconfig.json` `compilerOptions.paths` is the one declaration. `scripts/build` exports `aliasFromTsconfig(root)`, which reads it, and `vite.config.ts`, `vitest.config.ts` and `demo/vite.config.ts` call it. No config spells `"@glass"` (the landed ALIAS arm also scans `scripts/build/`). The false comment at `vite.config.ts:15-21` goes with the literal.
4. **Externals from the manifest.** The library build externalizes by predicate: an import is external when it is a `peerDependencies` key or a subpath of one. The 8-line list goes. `dist/` stays byte-identical (§5 D2-G6), because every externalized id today is a peer or a peer's subpath (`vite.library.ts:25-28`).
5. **vitest.** `resolve.conditions` loses `development` (no package declares it) and the `.vue` test glob goes. The two browser-launching files (`GlassDock.stagger`, `slider.size-tokens`) become Playwright specs in their unit's slot as `*.visual.ts` (RUL R-3), run by `tests-visual`'s projects; the vitest suite launches no browser.
6. **One verify build.** `.github/workflows/verify.yml` (`on: workflow_call`): checkout, node 24 with the npm cache, `npm ci`, Chromium, `npm run typecheck`, `npm run build`, `npm run demo:dist:build`, `npm test`, `npm run verify:package`, then one artifact holding `dist/` and `dist-demo/`. `package.json` drops `prepare`, so `npm ci` installs without building. `ci.yml` is `jobs.verify: uses: ./.github/workflows/verify.yml`, and W-A.3's `visual.yml` downloads the artifact instead of building its own. `release.yml` runs `verify` the same way; `publish` has `needs: [verify, visual]`, downloads `dist/`, checks the tag against `package.json`, and publishes with `--ignore-scripts`. No other workflow line runs a build, a typecheck or the test suite.
7. **Gate homes from the graph.** A gate that needs a file's home asks the landed floor: the entry record (`scripts/structure/index.mjs` `recordEntries`, `recordCssTargets`) for published files, `buildGraph` for the rest, both read through `tests/harness/`. `ENGINE_HOMES` becomes the origins of `useSelectionGroup`, `useSelectionIndicator` and `useTabRovingFocus` resolved through the entry record's symbol origins. No `tests/gates/` or `tests/harness/` line names a `src/{components,composables,styles}` path.
8. **One lexer, one set of test helpers.** `scripts/lex/` (a scripts module with its door) exports `stripComments(source, lang)` for `css`, `js`/`ts` and `vue`: string-aware, the generalisation of `verify-export-types.mjs:377`. `scripts/`, `scripts/build/` and `tests/harness/` import it; `tests/harness/` also exports the repo root, `read` and the F-1 file walk (`tests/harness/source.ts` already reads F-1's file set). The 68 naive strips and the 51 redeclared helpers go.
9. **The demo by the same placement law.** The seal's placement clause B10 takes `demo` as a third zone (`["src","scripts","demo"]`; B-05 made it two, D1:1010), using the demo's own authored names for targets, as `src` uses `names.json`. Its 40 moves land: the three `examples/` beside their one story; single-reader chassis helpers beside their reader; the 10 unrouted stories under the family page that reads them (each gets a manifest row or lives in its family page's directory, so the glob loads no page without a route). `Code.vue` and `shell/configurator/index.ts` are deleted (E-7: a Tailwind `@source` scan is not a reader, and neither is exported). `usePresetEditor.ts` is deleted and its readers import the store module. Demo directories and files meet R-5 already through B6 (it judges all five zones).

## 4 · Files it touches

New: `scripts/build/**` (door, the six moved modules and `vite.style-fold.ts`'s split), `scripts/lex/**`, `.github/workflows/verify.yml`, `demo/vite.config.ts`, `demo/index.html` (moved). Edited: `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `package.json` (`dev`, `demo:dist:build`, `prepare` and `iter-*` removed), `.github/workflows/{ci,release,visual}.yml`, `scripts/structure/seal/law.mjs` (B10's zone list), the placement names record for `demo`, `tests/harness/*`, `tests/gates/*.test.ts` (literals), the 50 files with a naive strip, the 51 with redeclared helpers, the two browser-launching tests (moved to `*.visual.ts`), `demo/stories/manifest.ts`, and the demo files the placement moves. Deleted: `vite.iter.config.ts`, `tsconfig.src.json`, `demo/vite.demo-dist.config.ts` (renamed), `index.html` at the root (moved), `demo/chassis/code/Code.vue`, `demo/shell/configurator/index.ts`, `demo/shell/configurator/usePresetEditor.ts`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading | pass shown |
|---|---|---|---|---|
| D2-G1 · the periphery arms | `node <appendix A> .` (lands as `tests/gates/periphery.test.ts`, one `it` per arm, reading through `tests/harness/`) | all 12 arms 0, exit 0 | **RED** exit 1 on all 12 arms (§2) | a fixture repository with the cured shape (root `vite.config.ts` and `vitest.config.ts` only, `tsconfig.json` and `tsconfig.test.json`, `verify.yml` called by `ci.yml`, no `prepare`, a gate reading `entrySource("./tabs")`, one routed story) prints 12 PASS, exit 0; planting a literal `"src/components/tabs/composables/useTabRovingFocus.ts"` in its gate and a `run: npm run build` in `ci.yml` gives `FAIL ONE-VERIFY 1` and `FAIL GATE-LITERALS 1`; planting `export { a } from "./b";` as `demo/shim.ts` gives `FAIL RELAY 1` |
| D2-G2 · demo placement | the seal's B10 with `demo` in its zones: `npx vitest run tests/gates/seal.test.ts` | B10 0 | **RED**: the floor's F-7 over `demo` (`placement.mjs --zone demo`) proposes 40 moves; B10 does not judge `demo` at HEAD | route B's `src`/`scripts` B10 is 0 on `wt2`, so the clause can pass; the demo half is this wave's |
| D2-G3 · no demo file without a code reader | `node <appendix B> . <floor-lib>` | `ORPHAN 0`, `CSS-SOURCE-ONLY 0` | **RED**: `CSS-SOURCE-ONLY 2 :: demo/chassis/code/Code.vue demo/shell/configurator/index.ts` | `ORPHAN 0` and `GLOB-ONLY 0` at HEAD show the arms pass on a clean file |
| D2-G4 · externals derived | `test "$(git grep -cE '^ +"(vue\|reka-ui\|@vueuse/core\|@mkbabb/keyframes\.js\|@mkbabb/value\.js/[a-z]+\|@lucide/vue)",$' -- 'vite*.ts' 'scripts/build/**' \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **RED**: 8 lines in `vite.library.ts` | the cure deletes the list; re-adding one line re-reds it |
| D2-G5 · the library dist does not move (hold line) | build at `<D2-base>` and at the wave; `diff <(cd a/dist && find . -type f \| sort \| xargs shasum) <(cd b/dist && find . -type f \| sort \| xargs shasum)` | empty | hold line, not a born-RED: the config move, the alias helper and the externals predicate change no emitted byte | its bite, stated not run: changing `glassCssTarget` in the moved `targets` module changes every CSS sha |
| D2-G6 · the verify workflow is exercised | the first push after the wave: `ci` run green with exactly one `npm run build` in its logs (`gh run view <id> --log \| grep -c "> vite build"` over the verify job is 1; `prepare` is gone) | 1 | **RED** at HEAD by construction: `npm ci` runs `prepare` (`package.json:486`), then `ci.yml:30` builds again: 2 library builds per verify job (L14-11, run 35810620398's log) | — |

Can each fail? D2-G1's arms fail on HEAD and on the loop's tree and pass on the fixture, run here. D2-G2's clause is B10 itself, GREEN over `src` and `scripts` on the loop's tree. D2-G5 is a hold line with a stated bite. D2-G6 reads a CI log, so its RED is the HEAD log L14-11 cites.

## 6 · π and DELTA obligations

The wave claims no visual change. Two surfaces:

- **The library.** D2-G5's sha lists: `dist/` byte-identical between `<D2-base>` and the wave. No capture is needed when no byte moves; the wave record holds both lists.
- **The demo.** The placement moves 40 demo files and deletes three. For every route whose files move (the F-10 seat selects them by the graph, P4-F4): a screenshot at `<D2-base>` and at the wave, same viewport, DPR 1 and 2, `reducedMotion: reduce`, light and dark, Chromium and Playwright WebKit, with the pixel diff image; the diff must be empty. The boot-graph gate's modulepreload count for `dist-demo/index.html` is recorded at both (it reads the moved `index.html`). Real Safari is **UNMEASURED** (the owner's `safaridriver` checkbox).

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| installing `@mkbabb/glass-ui` from a git URL built `dist/` through `prepare` | no install-time build; install from the registry | the package on npm ships `dist/`; nothing a registry consumer does changes |

The rest is repository-internal (config paths, workflows, demo, harness).

## 8 · Dependencies

W-D.1 lands first: it puts the floor, the seal, the entry record and `tests/harness/` in the tree, and this wave extends them. W-A.3 first, so `visual.yml` exists to consume the verify artifact; W-B.13 and W-A.4 first, so the release workflow is edited once more, not three times in parallel. W-A.1 owns `tests-visual/_support/`; this wave's lexer is the one `tests-visual/_support` imports for comment stripping, if it needs one.

## 9 · Ledger rows

Closes the F-60 census row (`ledger/CENSUS.md:132`, BUILD W-PERIPHERY) and N-1's backend and periphery half (`ledger/census-carries-recap.md:76`: "The backend half maps to `scripts/` and periphery (F-60)"), with its enforcement as D2-G1 and B10 over `demo`. Records L14-10 as closed by W-C.1, W-A.2 and W-A.5, and L14-07's mirror and L13-11 as decided by R-3 and executed by W-D.1.

## 10 · Gestalt passes (P-1)

Tranche fit: the periphery reads through the same floor, entry record and seal as `src`; one build, one alias, one lexer. Wave: D2-G5's sha lists and the demo pairs show nothing painted moved. Feature: a contributor finds two config files at the root, the build's code under `scripts/build/`, one workflow that builds and tests, and each demo helper beside the story that uses it.

## Appendix A · the periphery probe (`d2-probe.mjs`, run at this seat)

When it lands as `tests/gates/periphery.test.ts`, its own comment handling goes through `scripts/lex` (the RELAY arm strips comments with a local regex here).

```js
// W-D.2 probe: the periphery arms of F-60 that W-D.1's seal does not judge (root config, workflows,
// the harness's own literals, the demo's dead and unrouted files). One line per arm, exit 1 on any miss.
//   node d2-probe.mjs <root>
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const root = process.argv[2] ?? ".";
const read = (f) => readFileSync(join(root, f), "utf8");
const tracked = [...new Set(execFileSync("git", ["ls-files", "-co", "--exclude-standard"], { cwd: root, encoding: "utf8" }).split("\n").filter(Boolean))].filter((f) => existsSync(join(root, f)));
const arms = [];
const arm = (id, bad, detail) => arms.push([id, bad, detail]);

// ROOT-CONFIG: at the root, only vite.config.ts and vitest.config.ts (tool discovery); build modules live in scripts/build/
const rootTs = tracked.filter((f) => !f.includes("/") && /^vite.*\.ts$|^vitest.*\.ts$/.test(f));
const extra = rootTs.filter((f) => !["vite.config.ts", "vitest.config.ts"].includes(f));
arm("ROOT-CONFIG", extra.length, `${rootTs.length} root vite/vitest modules: ${rootTs.join(" ")}`);

// TSCONFIG: tsconfig.json (library program) and tsconfig.test.json (test program) at the root; no other
const tsc = tracked.filter((f) => !f.includes("/") && /^tsconfig.*\.json$/.test(f));
arm("TSCONFIG", tsc.filter((f) => !["tsconfig.json", "tsconfig.test.json"].includes(f)).length, tsc.join(" "));

// ALIAS: the @glass key is declared once (tsconfig.json paths); no bundler config spells its own
const cfgs = tracked.filter((f) => /(^|\/)(vite|vitest)[^/]*\.ts$/.test(f) && !f.startsWith("docs/"));
const aliasSites = cfgs.flatMap((f) => read(f).split("\n").map((l, i) => [f, i + 1, l]).filter(([, , l]) => /["']@glass["']\s*:/.test(l) || /find:\s*["']@glass["']/.test(l)));
arm("ALIAS", aliasSites.length, aliasSites.map(([f, i]) => `${f}:${i}`).join(" "));

// DEAD-CONDITION: vitest resolves no export condition that no installed package declares (the `development` arm)
const vc = existsSync(join(root, "vitest.config.ts")) ? read("vitest.config.ts") : "";
arm("DEAD-CONDITION", /["']development["']/.test(vc) ? 1 : 0, "vitest.config.ts resolve.conditions");

// PREPARE: no install-time build (npm ci runs `prepare`, so CI builds twice)
const pkg = JSON.parse(read("package.json"));
arm("PREPARE", pkg.scripts?.prepare ? 1 : 0, `scripts.prepare = ${JSON.stringify(pkg.scripts?.prepare ?? null)}`);

// ONE-VERIFY: the library is built, typechecked and tested in one reusable workflow; no other workflow repeats it
const wf = tracked.filter((f) => /^\.github\/workflows\/.*\.ya?ml$/.test(f));
const steps = wf.flatMap((f) => read(f).split("\n").map((l, i) => [f, i + 1, l]).filter(([, , l]) => /run:\s*npm (run (build|typecheck)|test)\b/.test(l)));
const outside = steps.filter(([f]) => !f.endsWith("/verify.yml"));
arm("ONE-VERIFY", outside.length + (wf.some((f) => f.endsWith("/verify.yml")) ? 0 : 1), steps.map(([f, i, l]) => `${f}:${i}:${l.trim()}`).join(" | "));

// GATE-LITERALS: harness gates name no src home by path literal (homes come from the entry record or the graph)
const gates = tracked.filter((f) => /^tests\/(gates|harness)\/.*\.ts$/.test(f));
const LIT = /["'`](\.\.\/)*src\/(components|composables|styles)\/[A-Za-z0-9_./-]+["'`]|join\([^)]*["']src["'][^)]*["'](components|composables|styles)["']/;
const lits = gates.flatMap((f) => read(f).split("\n").map((l, i) => [f, i + 1, l]).filter(([, , l]) => LIT.test(l) && !/^\s*(\/\/|\*)/.test(l)));
arm("GATE-LITERALS", lits.length, `${new Set(lits.map(([f]) => f)).size} files: ${lits.slice(0, 12).map(([f, i]) => `${f}:${i}`).join(" ")}`);

// BROWSER-IN-VITEST: no unit-suite file launches a browser; browser work is tests-visual's
const unit = tracked.filter((f) => /\.(test|spec)\.ts$/.test(f) && !f.startsWith("tests-visual/") && !f.startsWith("docs/"));
const browser = unit.filter((f) => /from\s+["'](playwright|@playwright\/test)["']|chromium\.launch/.test(read(f)));
arm("BROWSER-IN-VITEST", browser.length, browser.join(" "));

// DEMO-UNROUTED: every glob-loaded story SFC (demo/stories/<cat>/<id>.vue) has a manifest row
const man = ["demo/stories/manifest.ts", ...tracked.filter((f) => f.startsWith("demo/stories/manifest/"))].filter((f) => existsSync(join(root, f))).map(read).join("\n");
const stories = tracked.filter((f) => /^demo\/stories\/[^/]+\/[^/]+\.vue$/.test(f) && !f.endsWith(".tile.vue"));
const unrouted = stories.filter((f) => { const id = f.split("/").pop().replace(/\.vue$/, ""); return !new RegExp(`["'\`/]${id.replace(/[-]/g, "\\-")}(\\.vue)?["'\`]`).test(man); });
arm("DEMO-UNROUTED", unrouted.length, unrouted.join(" "));

// RELAY: no demo module other than an index.ts door whose code is only `export … from` (a relay kept to
// preserve an import path is a shim)
const code = (t) => t.replace(/\/\*[^]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "").trim();
const relays = tracked.filter((f) => f.startsWith("demo/") && /\.ts$/.test(f) && !/(^|\/)index\.ts$/.test(f)).filter((f) => {
  const c = code(read(f)); if (!c) return false;
  return c.split(/;\s*/).map((x) => x.trim()).filter(Boolean).every((st) => /^export\s+(type\s+)?(\*|\{[^}]*\})\s+from\s+["'][^"']+["']$/.test(st)); });
arm("RELAY", relays.length, relays.join(" "));

// ONE-LEXER: no hand-rolled naive block-comment strip in tooling (it eats `/*` inside strings, e.g. `@source "../*.js"`);
// comment stripping goes through the one string-aware lexer
const NAIVE = "/\\*[\\s\\S]*?\\*\\/";
const tooling = tracked.filter((f) => /^(scripts|tests|tests-visual|src)\//.test(f) || /^vite[^/]*\.ts$/.test(f)).filter((f) => /\.(ts|mts|mjs|js|vue)$/.test(f));
const naive = tooling.flatMap((f) => read(f).split("\n").map((l, i) => [f, i + 1, l]).filter(([, , l]) => l.includes(NAIVE) && !/^\s*(\/\/|\*)/.test(l)));
arm("ONE-LEXER", naive.length, `${new Set(naive.map(([f]) => f)).size} files`);

// HELPERS: no test file declares its own repo root, file reader or walker; they come from tests/harness
const testCode = tracked.filter((f) => /\.ts$/.test(f) && (/^tests\//.test(f) || /\/__tests__\//.test(f)) && !/^tests\/harness\//.test(f));
const helpers = testCode.filter((f) => /^\s*(const|function)\s+(ROOT|REPO_ROOT|read|walk|readSource)\b/m.test(read(f)));
arm("HELPERS", helpers.length, `${helpers.length} files`);

for (const [id, n, d] of arms) console.log(`${n ? "FAIL" : "PASS"} ${id} ${n} :: ${d}`);
process.exitCode = arms.some(([, n]) => n) ? 1 : 0;
```

## Appendix B · demo files without a code reader (`demo-orphans.mjs`)

```js
// W-D.2 probe: demo files no demo/src/test code reads (the floor's F-1 graph, every edge kind),
// and demo files whose only reader is a glob (reached by the manifest's import.meta.glob, not routed).
//   node demo-orphans.mjs <root> <floor lib/graph.mjs>
import { resolve } from "node:path"; import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]); const { buildGraph } = await import(pathToFileURL(resolve(process.argv[3])).href);
const g = buildGraph(root);
const files = g.tree.files.filter((f) => f.startsWith("demo/") && /\.(ts|vue|css|mjs)$/.test(f));
const kinds = {}; for (const e of g.edges) kinds[e.kind] = (kinds[e.kind] ?? 0) + 1;
const readers = (f) => g.edges.filter((e) => e.to === f && e.from !== f);
const orphan = files.filter((f) => !/^demo\/main\.ts$/.test(f) && readers(f).length === 0);
const cssOnly = files.filter((f) => { const r = readers(f); return r.length && r.every((e) => /css-source/.test(e.kind)); });
const globOnly = files.filter((f) => { const r = readers(f); return r.length && r.every((e) => /glob/.test(e.kind)); });
console.log(JSON.stringify(kinds));
console.log(`ORPHAN ${orphan.length} :: ${orphan.join(" ")}`);
console.log(`CSS-SOURCE-ONLY ${cssOnly.length} :: ${cssOnly.join(" ")}`);
console.log(`GLOB-ONLY ${globOnly.length} :: ${globOnly.join(" ")}`);
process.exitCode = orphan.length + cssOnly.length ? 1 : 0;
```

HEAD (`wt`, graph from `docs/tranches/BL/design/structure/floor/lib/graph.mjs`), exit 1: `ORPHAN 0 ::` / `CSS-SOURCE-ONLY 2 :: demo/chassis/code/Code.vue demo/shell/configurator/index.ts` / `GLOB-ONLY 0 ::`.
