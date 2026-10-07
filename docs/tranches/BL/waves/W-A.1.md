# W-A.1 · The visual harness repaired: typechecked, routed through the manifest, engines routed by name, one colour source, one output root · 11.0.0

| field | value |
|---|---|
| seat | band-A wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fabc95e2` in a scratch worktree (the task named `f3ad78d0`; every commit between is docs-only). `git diff --stat v10.1.0 HEAD -- src tests tests-visual scripts .github package.json` prints nothing |
| ships in | 11.0.0 (band A, PLAN §2) |
| families | F-05 whole (`audit/REGISTRY.md:219-226`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L14-02 | the two `*.webkit.spec.ts` files run under the Chromium projects and never under `webkit`; one claims a `webkit-2dppx` project that does not exist |
| L14-03 | `tests-visual/` sits outside every tsconfig and hides a runtime crash (`PI_TARGETS.substrate` is undefined) |
| L14-04 | specs navigate to route literals the manifest no longer has, and skip-on-absence turns the loss into a skip |
| L14-06 | helpers and the OKLab matrix are redeclared per file |
| L09-17 | specs write screenshots into closed tranche record directories |
| L01b-53 | `viz-fourier-ribbon.spec.ts` asserts the retired two-backend ribbon (`:1-10`) |
| WEBKIT-ACCORDION-CRASH (handed from W-I.3 §8) | Playwright WebKit crashes when a tap opens an Accordion; a minimal reproduction lands here, born RED, and its cause is cured here |

Not closed here: the wired CI set (W-A.3, F-04), the capture tools' move to `scripts/` (W-A.3), the repo-wide scratch root and the `docs/` tooling invariant (W-C.1, F-61), and the test-tree mirror decision (W-D.2, F-60).

## 2 · The defect at HEAD

Each line was measured in the scratch worktree at `fabc95e2`.

- **No typecheck.** `tsconfig.json:24` includes `src/` and `demo/`; `tsconfig.test.json:17` includes `tests/` and `src/`. `package.json:491` `typecheck` runs those two projects only. A scratch tsconfig that extends the root one over `tests-visual/**/*.ts` gives exit 2 with **93 errors in 55 files**: TS7016 44 (`pngjs` has no types), TS2307 20, TS2339 10, TS2578 5, TS2345 4, TS2352 3, TS18048 3, and one each of TS2769, TS2683, TS2488, TS18049. Among the TS2339: `tests-visual/glass-accent.spec.ts(168,44): Property 'substrate' does not exist on type '{ readonly aurora: Scene; readonly blob: Scene; …'`. `pi-manifest.ts:70-106` defines `aurora`, `blob`, `dock`, `constellation`, `fourier` and `feedbackAlert` and no `substrate`, so `page.goto(PI_TARGETS.substrate.path)` throws a `TypeError` at runtime.
- **Routes by literal.** `pi-manifest.ts:59-68` has `resolveScene`, which throws on a renamed story. Specs bypass it: `git grep -nE "goto\(\s*[\"'\`]/" -- tests-visual` gives **168 literal `goto` calls in 55 files**. A route audit (appendix A) over every route-shaped literal in `tests-visual/` finds **44 literals, 17 distinct routes, in 25 files** that are not in the manifest's 81 routes; for example `/forms/select` (`no-gray.spec.ts:310`, `disclosure-rotate.spec.ts:48`), `/dock/rail`, `/data/metric-cell`, `/data/tags-input`. `demo/router.ts:92-94` sends an unknown path to `NotFound.vue`.
- **Absence reads as a skip.** `git grep -nE 'test\.skip\(|test\.fixme\(|describe\.skip\(' -- tests-visual` gives **62 sites in 20 files**. Run against the built demo (`vite preview` of `dist-demo/` on :5793, `playwright test disclosure-rotate.spec.ts no-gray.spec.ts --project=chromium-headless-new`): `disclosure-rotate` reports **2 skipped** (both schemes: `test.skip(true, "no … disclosure caret on /forms/select at HEAD")`, `:121`), and `no-gray` (f) reports **4 failed**, each `locator.click: Test timeout of 60000ms exceeded … waiting for locator('[data-slot="select-trigger"], [role="combobox"]')`, because `/forms/select` is the not-found page. Run total: 14 passed, 2 skipped, 4 failed in 5.2 min.
- **Engines routed by nothing.** `playwright.config.ts:49` `testMatch: "*.spec.ts"` applies to `chromium-headless-new` (`:75`) and `coarse-touch` (`:100`); `webkit` (`:130-131`) lists `safari-webgl.spec.ts` and `aurora-swraster.spec.ts` only. `npx playwright test --list` gives `Total: 1989 tests in 167 files`: 988 `[chromium-headless-new]`, 988 `[coarse-touch]`, 13 `[webkit]`. `w1-radius-redress.webkit.spec.ts` and `w2-blur-redress.webkit.spec.ts` are listed twice each, under `chromium-headless-new` and `coarse-touch`, and never under `webkit`. `coarse-touch` has no `testMatch`, so it re-runs all 988.
- **Colour math per file.** The OKLab M1 row (`0.4122214708`) appears in **16 files**: 15 specs and `scripts/reflect-capture-verify.mjs`. `scripts/lib/paint-arm.mjs:30-36` calls itself "the ONE colour-math home".
- **Output into records.** `git grep -nE 'docs/tranches/' -- tests-visual` gives **147 lines in 108 files**. The run above wrote two untracked PNGs into `docs/tranches/BG/audit/visual/` (`disclosure-rotate.spec.ts:34`) and four ignored PNGs into `docs/tranches/BA/audit/` with a missing path separator (`visualW-NO-GRAY-after-dark-desktop.png`, from `no-gray.spec.ts:31`).
- **A spec for a retired engine.** `viz-fourier-ribbon.spec.ts:1-10` asserts "the instanced ribbon on BOTH backends"; the fourier field is WebGPU-only (`useFourierField.ts:204`, L01b-53).

## 3 · The cure

1. **A typechecked island.** `tests-visual/tsconfig.json` extends the root config (its own `include`, `types: ["node", "@playwright/test"]`, `allowImportingTsExtensions`), and `package.json` `typecheck` runs it as a third project: `vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json && tsc --noEmit -p tests-visual/tsconfig.json`. `@types/pngjs` joins `tests-visual/package.json` devDependencies. The `page.evaluate` dynamic imports of `/src/...` and `/demo/...` (the 20 TS2307) are typed through one ambient module declaration in `tests-visual/_support/vite-modules.d.ts`, not a `@ts-expect-error` per site. The five unused `@ts-expect-error` lines go. Every remaining error is fixed in its spec or the spec is retired (step 6); none is suppressed.
2. **Every navigation through the manifest.** `tests-visual/_support/scene.ts` owns `sourceScenes`, `resolveScene` and `PI_TARGETS` (moved from `pi-manifest.ts`, which is deleted). A spec calls `gotoScene(page, "forms", "select-family-member")` or `gotoScene(page, PI_TARGETS.aurora)`; `gotoScene` resolves through the manifest and throws on a miss. No spec passes a string path to `page.goto`. A spec whose subject no longer has a route is re-pointed at the route that now holds it, or retired in step 6 with its reason in the commit body.
3. **Absence fails.** Every skip-on-absence becomes an assertion that the subject is present (`expect(locator).toHaveCount(n)` before the measurement). Engine scoping moves from runtime skips to project routing (step 4). After the wave `tests-visual/` holds no `test.skip`, `test.fixme` or `describe.skip`.
4. **Engines routed by filename.** `playwright.config.ts` gives each project an explicit `testMatch` and `testIgnore`: `*.webkit.spec.ts` runs only on `webkit`; `*.coarse.spec.ts` only on `coarse-touch`; the Chromium project ignores both. The `webkit-2dppx` claim in `w2-blur-redress.webkit.spec.ts:18-20` is struck: the DPR cells are one parameterised `webkit` project run at `deviceScaleFactor` 1 and 2, declared in the config. The hidden order dependency on `_capture_css.spec.ts` goes: the WebKit specs compute the cascade they read in their own `beforeAll` (W-A.3 retires `_capture_css`).
5. **One colour source.** `tests-visual/_support/color.ts` exports sRGB↔linear, OKLab, OKLCH, relative luminance and contrast ratio, plus a string form of the same functions injected into the page with `page.addInitScript` so `page.evaluate` bodies call `window.__glassColor` instead of inlining a matrix. `scripts/lib/paint-arm.mjs` and `scripts/reflect-capture-verify.mjs` import the one module (Node 24, the CI version at `ci.yml`, strips the types of an erasable-syntax `.ts` file on import, so `color.ts` uses no enums or parameter properties). The 15 inline copies go. `setDark`, `setScheme`, `grab`, `parseColor` and the other redeclared helpers (L14-06's table) move to `tests-visual/_support/page.ts` and `pixel.ts`.
6. **One output root.** `tests-visual/_support/paths.ts` exports `PI_OUT`, which is `<repo>/.cache/visual/<spec-basename>/`. `.cache/` is already the repo's git-ignored gate-output root (`.gitignore:29-32`). No spec names a `docs/` path. The stale `tests-visual/docs/` directory is deleted. W-C.1 extends the same root to every other probe; this wave does not choose a second one.
7. **Retire the dead spec.** `viz-fourier-ribbon.spec.ts` is deleted; the fourier field's paint gate is W-A.4's GPU leg.

The harness keeps no fallback path: a spec that cannot find its route, its element or its engine fails.

## 4 · Files it touches

- `tests-visual/tsconfig.json` (new), `tests-visual/_support/{scene,color,page,pixel,paths}.ts` and `vite-modules.d.ts` (new), `tests-visual/pi-manifest.ts` (deleted), `tests-visual/playwright.config.ts`, `tests-visual/package.json`.
- Every `tests-visual/*.spec.ts` that calls `page.goto` with a literal (55 files), that skips on absence (20 files), that inlines colour math (15 files) or that writes under `docs/` (108 files). Most files are in more than one set.
- `tests-visual/viz-fourier-ribbon.spec.ts` (deleted); `tests-visual/docs/` (deleted, untracked).
- `scripts/lib/paint-arm.mjs`, `scripts/reflect-capture-verify.mjs` (import the one colour module).
- `package.json:491` (`typecheck`).

## 5 · Acceptance gates

Every command runs from the repo root. "HEAD reading" is what the command gave in the scratch worktree at `fabc95e2`.

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| A1-G1 · the island typechecks | `npx tsc --noEmit -p tests-visual/tsconfig.json` | exit 0 | **exit 1**: `error TS5058: The specified path does not exist`. With a scratch tsconfig over the same files: **exit 2, 93 errors in 55 files**, including `glass-accent.spec.ts(168,44) … 'substrate' does not exist` |
| A1-G2 · typecheck runs it | `node -e 'process.exit(/tests-visual\/tsconfig\.json/.test(require("./package.json").scripts.typecheck)?0:1)'` | exit 0 | **exit 1** (`package.json:491` names two projects) |
| A1-G3 · no literal navigation | `test "$(rg -n "goto\(\s*[\"'\x60]/" tests-visual \| wc -l)" -eq 0` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 168 lines in 55 files, first `motion-one-clock.spec.ts:142`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: 168 lines in 55 files |
| A1-G4 · no route outside the manifest | `node tests-visual/_support/route-audit.mjs .` (appendix A) | exit 0 | **exit 1**: `manifest routes: 81; dead route literals: 44; files: 25` |
| A1-G5 · absence fails | `test "$(git grep -nE '(^\|[^A-Za-z0-9_.])(test\|it\|describe)(\.describe)?\.(skip\|fixme)\(' -- tests-visual \| wc -l)" -eq 0` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 62 lines in 20 files, first `a11y-slider.spec.ts:66`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: 62 sites in 20 files |
| A1-G6 · the dead-route specs reach their subject | `npx playwright test disclosure-rotate.spec.ts no-gray.spec.ts --project=chromium-headless-new` against the built demo, reading the JSON reporter's `stats` | `skipped` 0 and `unexpected` 0 | **2 skipped, 4 failed** (the four `(f)` cells time out on `/forms/select`) |
| A1-G7 · WebKit specs run on WebKit only | `cd tests-visual && npx playwright test --list \| node -e 'const l=require("fs").readFileSync(0,"utf8").split("\n").filter(s=>/\.webkit\.spec\.ts/.test(s));process.exit(l.length>0&&l.every(s=>/\[webkit\]/.test(s))?0:1)'` | exit 0 | **exit 1**: the 4 `.webkit.spec.ts` lines are `[chromium-headless-new]` ×2 and `[coarse-touch]` ×2; 0 under `[webkit]` |
| A1-G8 · coarse-touch runs its own specs | `cd tests-visual && npx playwright test --list --project=coarse-touch \| tail -1` | the count equals the number of `*.coarse.spec.ts` tests | **988 tests**, the whole Chromium set |
| A1-G9 · one OKLab | `test "$(git grep -l '\.412221470' -- tests-visual scripts \| wc -l)" -eq 1` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 17 lines in 16 files, first `reflect-capture-verify.mjs:148`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: 16 files |
| A1-G10 · no output into records | `test "$(git grep -nE "docs/(tranches\|archive)/\|[\"']docs[\"'] *, *[\"'](tranches\|archive)[\"']" -- tests-visual \| wc -l)" -eq 0` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 148 lines in 109 files, first `_capture_css.spec.ts:14`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: 147 lines in 108 files |
| A1-G11 · a run leaves `docs/` untouched | after any `npx playwright test <spec>`, `git status --porcelain --ignored -- docs \| wc -l` is 0 | exit 0 | **exit 1**: the A1-G6 run left 2 untracked PNGs under `docs/tranches/BG/audit/visual/` and 4 ignored PNGs under `docs/tranches/BA/audit/` |
| A1-G12 · the dead ribbon spec is gone | `test ! -e tests-visual/viz-fourier-ribbon.spec.ts` | exit 0 | **exit 1** |
| A1-G13 · the Accordion opens in WebKit | `tests-visual/accordion-open.webkit.spec.ts` (new): one `Accordion type="single" collapsible` with one item, 390×844 with touch; tap the trigger, then (fresh page) click it; each reads `data-state="open"` within 1.2 s, three runs each, `--project=webkit` | 6 of 6 open | **FAIL 6 of 6** (fix-2's probe, `183e021a`): tap → `Page crashed` 3 of 3; click → `page.click: Timeout 30000ms exceeded` 3 of 3. Chromium on the same page opens 6 of 6. Real Safari UNMEASURED (OW-3) |

A1-G1 and A1-G3 alone could pass with the checks weakened (a tsconfig with `include: []`, specs deleted wholesale). A1-G4, A1-G6 and A1-G7 hold the other side: the audit reads every route-shaped literal, A1-G6 needs the two named specs to run and pass, and A1-G7 needs at least one WebKit spec listed. A1-G1's tsconfig must include `tests-visual/**/*.ts`; the wave record prints `tsc --listFilesOnly -p tests-visual/tsconfig.json | grep -c tests-visual/` and it must equal the tracked `.ts` count under `tests-visual/`.

## 6 · π and DELTA obligations

The wave makes one visual claim: specs that were blind now reach and paint their subject.

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the `disclosure-rotate` surfaces (accordion, the select family member, the configurator) | light and dark | Chromium; Playwright WebKit labelled | HEAD: the skip line and the not-found page screenshot at `/forms/select`; wave: the caret's rotation frames | the sampled `transform` angle series per surface, HEAD empty, wave non-empty |
| `no-gray` (f), the live Select panel | light and dark, mobile and desktop | Chromium | HEAD: the timeout trace; wave: the open panel | the panel's composite OKLCH chroma against the spec's floor, read through `_support/color.ts` |
| the two `*.webkit.spec.ts` specs | light | Playwright WebKit labelled at DPR 1 and 2; real Safari UNMEASURED until W-A.6 step 0 (OW-3) | the `--list` output before and after, and each spec's first run on WebKit | each spec's own assertion, recorded pass or fail. A fail is a born-RED routed to its family (F-21 radius, F-31 blur), not suppressed |

Captures land under `.cache/visual/` (step 6) and the wave record cites each by path and sha256.

## 7 · MIGRATION rows

None. `tests-visual/` is a private workspace (`tests-visual/package.json` `"private": true`); no published surface changes.

## 8 · Ledger rows

Closes F-05's six members (L14-02, L14-03, L14-04, L14-06, L09-17, L01b-53). Closes WEBKIT-ACCORDION-CRASH on A1-G13 (BUILD: the reproduction and its cure). F-05 holds no census row (`ledger/CENSUS.md:81`, route column empty), so no `#n` row closes here. The census's L14-05 remainder (capture specs, zero-`expect` specs, `coarse-touch` scope) is split: `coarse-touch` scope here (A1-G8), the capture specs in W-A.3.

## Appendix A · the route audit

`tests-visual/_support/route-audit.mjs` (run at HEAD from the scratch probe directory as `node route-audit.mjs <root>`):

```js
// Every route literal a visual spec navigates to must be a manifest route.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const root = process.argv[2] ?? ".";
const man = readFileSync(join(root, "demo/stories/manifest.ts"), "utf8");
const routes = new Set([...man.matchAll(/\bs\(\s*"([a-z0-9-]+)"\s*,\s*"([a-z0-9-]+)"/g)].map((m) => `/${m[1]}/${m[2]}`));
routes.add("/");
const cats = new Set([...routes].map((r) => "/" + r.split("/")[1]));
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); if (f === "node_modules" || f.startsWith(".")) return []; return statSync(p).isDirectory() ? walk(p) : p.endsWith(".ts") ? [p] : []; });
const dead = [];
for (const f of walk(join(root, "tests-visual"))) {
  const src = readFileSync(f, "utf8");
  for (const m of src.matchAll(/["'`](\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)?)(?:[?#][^"'`]*)?["'`]/g)) {
    const r = m[1];
    if (/^\/(src|demo|docs|tmp|node_modules|dist|private|Users|@)/.test(r)) continue;
    if (!cats.has("/" + r.split("/")[1])) continue;
    if (!routes.has(r) && !cats.has(r)) dead.push(`${f.slice(root.length + 1)}: ${r}`);
  }
}
console.log(`manifest routes: ${routes.size}; dead route literals: ${dead.length}; files: ${new Set(dead.map((d) => d.split(":")[0])).size}`);
for (const d of dead) console.log("  " + d);
process.exit(dead.length ? 1 : 0);
```

Once step 2 lands, A1-G3 makes this audit a second line of defence: a route can only enter a spec through `gotoScene`, and the audit catches a literal that slips into a helper.
