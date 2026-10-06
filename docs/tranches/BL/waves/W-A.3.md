# W-A.3 · W-VISUAL-CI: the visual suite is the wired set, run in CI on both engines, and the tag waits on it · 11.0.0

| field | value |
|---|---|
| seat | band-A wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fabc95e2` in a scratch worktree, `dist/` and `dist-demo/` built there, the demo served by `vite preview --config demo/vite.demo-dist.config.ts --port 5793` for the probes and stopped after |
| ships in | 11.0.0 |
| families | F-04 whole (`audit/REGISTRY.md:210-217`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L01a-09 | #9 sealed with "+C-13 wiring" in its title while 1 of 167 specs is wired |
| L01b-X3 | C-13 was reworded from "the visual suite enters CI" to "a seat gets bound" and marked discharged |
| L01b-66 | #66's C-13 BLOCKING gate discharged by one spec |
| L02-F11 | 166 of 167 specs unwired; 14 capture specs; 20 specs skip on absence |
| L05b-07 | the tag blocks on three pixel floors while the owner's paint and Safari asks sit in a comment |
| L14-05 | 1,989 instances, CI wires the blob floor only; capture scratch runs as specs |

C-13 is restored to its first wording: the visual suite enters CI. This wave is that act.

## 2 · The defect at HEAD

- **One spec is wired.** `.github/workflows/ci.yml:39-68`: the `pixel-floor` job runs `npm -w tests-visual run gate:pixel-floor:ci` (`:66`) and its planted twin (`:68`); both run `substrate-paints-color.spec.ts -g 'blob paints'` on `PI_ANGLE: swiftshader` (`:46`). `cd tests-visual && npx playwright test --list` gives `Total: 1989 tests in 167 files` (988 Chromium, 988 coarse-touch, 13 WebKit). No workflow names a WebKit project: `grep -c "project=webkit" .github/workflows/*.yml` gives 0 and 0.
- **The tag waits on nothing visual.** `release.yml:26` `jobs:` has one job, `publish`, with no `needs`; its steps are typecheck, build, `verify:package`, demo build, `npm test`, publish. `release.yml:3-11` states that "a tag pushed WITHOUT release.sh ships an un-floored aurora silently". `scripts/release.sh:23-31` is a comment: "Human pre-tag paint review — once per candidate, never automated here: … run the existing visual suite once, including its WebKit/Safari project; … inspect real-Safari var()-blur".
- **Capture tools run as specs.** `ls tests-visual/_*.spec.ts` gives 14 files. 7 specs contain no `expect(`: `_capture_css`, `_cohere-capture`, `_cohere-debug`, `_cohere-shadow-debug`, `_fix-glassui-dark-capture`, `_prim-polish-capture`, `_wdelta0-capture`.
- **The lane drives the dev server.** `tests-visual/playwright.config.ts:141` `command: "npm run dev -- …"`: CI measures Vite's dev server, not the built demo a consumer's build resembles (R2-07 harness fact).
- **The one hold line that would be wired is green, so it needs a plant.** Every manifest route at 390×844 and 1440×900, light, Chromium, measured against the built demo: `routes=80 cells=160 overflowing=0` (`documentElement.scrollWidth <= clientWidth` everywhere). G-49 NO-H-OVERFLOW is a hold line at HEAD, not a born-RED; it enters the wired set with a planted bite.

## 3 · The cure

1. **The wired set is the roster's visual entries.** Every spec under `tests-visual/` is the `run.file` of a W-A.2 roster entry, or it is deleted. At landing the bound wired entries are G-49 NO-H-OVERFLOW and the WebKit arm of the engine-lane entries that paint (G-15, G-19, G-22, G-26), as `tests-visual/wired/engine-cells.webkit.spec.ts`: the same computed-style checks W-A.2 runs in-process on Chromium, run in Playwright WebKit against the built demo. The owed visual entries (G-32 dock morph continuity, G-27's WebKit cell) have their specs on disk under `wired/` and are left out of the run list until their owner waves turn them `bound`. The GPU-leg entries (G-47, G-48, G-55) are W-A.4's.
2. **The run list comes from the roster.** `scripts/visual/wired-list.mjs` prints the `run.file` of every `bound` entry whose file is under `tests-visual/`. CI passes that list to Playwright. No spec runs in CI because of a glob, and no bound visual entry can be left out.
3. **Both engines where D-4 applies.** Each wired entry declares its engines in `roster.json` (`"engines": ["chromium", "webkit"]`). A `.webkit.spec.ts` runs on the `webkit` project only (W-A.1 step 4); an entry whose claim is engine-invariant by construction (G-49's box arithmetic still runs on both, because layout differs by engine) says so in its `invariant` text. Playwright WebKit cells are labelled Playwright WebKit in every report; real Safari is W-A.6.
4. **A planted twin for every wired spec.** Each wired spec reads `PI_PLANT=<entry id>` and applies its bite (the same mutation as the entry's `bite.patch`, injected at page level: a style tag, an init script). `tests-visual/_support/verdict.mjs` (the generalised `pi-gate-verify.mjs`, which it replaces) reads the Playwright JSON report and asserts: green leg, every test passed and none skipped; planted leg, every wired test failed on its own assertion text (`bite.red`), not on a timeout or a crash. G-49's plant is a `2000px`-wide block inserted into `#app` on each route.
5. **One reusable workflow.** `.github/workflows/visual.yml` (`on: workflow_call`) builds the library and the demo once, serves `dist-demo/` with `vite preview`, installs Chromium and WebKit, and runs the green and planted legs over the wired list on both projects. It uploads both JSON reports and every screenshot the specs write under `.cache/visual/` as one artefact, named for the commit. `ci.yml` calls it on push and pull request. `release.yml` calls it, and `publish` has `needs: [visual]`. The existing `pixel-floor` job leaves `ci.yml`; its blob floor moves to W-A.4's GPU leg (no software-rasteriser leg remains, R2-07-10).
6. **The config serves the built demo.** `playwright.config.ts` `webServer.command` is `npm run demo:dist:serve -- --port <DEMO_PORT>`, with `reuseExistingServer: false` in CI.
7. **Capture tools go.** The 14 `_*.spec.ts` files and every other spec that is no roster entry's executable are deleted. A later wave that needs a capture writes it as a π row with W-A.1's harness, under `.cache/visual/`. The per-spec decision (entry id, or deleted with a one-line reason) is recorded as a table in the wave record, generated by `scripts/visual/orphans.mjs`.
8. **The comment checklist goes.** `release.sh:23-31` is deleted with the script's aurora-floor legs (W-A.4 moves them to the GPU leg). The owner's real-paint and Safari asks are gates: the wired set here, the GPU leg (W-A.4), the Safari band (W-A.6).

No spec keeps a retry, a skip or a `test.fixme`; `retries: 0` stays (`playwright.config.ts:53`).

## 4 · Files it touches

- `.github/workflows/visual.yml` (new), `.github/workflows/ci.yml` (the `pixel-floor` job removed; a `visual` job calls `visual.yml`), `.github/workflows/release.yml` (`visual` job and `needs`; the `:3-11` comment rewritten to name the gate).
- `tests-visual/playwright.config.ts` (`webServer`), `tests-visual/package.json` (the six `gate:*` lines become `gate:wired` and `gate:wired:planted`), `tests-visual/pi-gate-verify.mjs` (deleted; `_support/verdict.mjs` new), `tests-visual/wired/` (new).
- `scripts/visual/wired-list.mjs`, `scripts/visual/orphans.mjs` (new).
- `scripts/release.sh` (`:23-31` and `:37-50`).
- Every `tests-visual/*.spec.ts` that is no roster entry's executable (deleted).
- `tests/gates/roster.json` (the `engines` field on visual entries; G-49 turns `bound`).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| A3-G1 · CI runs WebKit | `grep -lq -- "--project=webkit" .github/workflows/visual.yml` | exit 0 | **exit 2** (`visual.yml` absent); `grep -c "project=webkit"` over `ci.yml` and `release.yml` gives 0 and 0 |
| A3-G2 · CI runs the wired list | `grep -q "wired-list.mjs" .github/workflows/visual.yml && ! grep -q "gate:pixel-floor" .github/workflows/ci.yml` | exit 0 | **exit 2** (`visual.yml` absent); `ci.yml:66,68` run `gate:pixel-floor:ci` and its planted twin, 1 spec with `-g 'blob paints'` |
| A3-G3 · every spec is a gate | `node scripts/visual/orphans.mjs` (exit 1 when any `tests-visual/**/*.spec.ts` is no roster entry's `run.file`) | exit 0 | **exit 1**: no roster exists, so 167 of 167 spec files are unnamed |
| A3-G4 · no capture tool is a spec | `test "$(ls tests-visual/_*.spec.ts 2>/dev/null \| wc -l)" -eq 0` | exit 0 | **exit 1**: 14 files; 7 of them have no `expect(` |
| A3-G5 · the tag waits on the wired set | `node -e 'const y=require("fs").readFileSync(".github/workflows/release.yml","utf8");process.exit(/needs:\s*(\[[^\]]*(?<![\w-])visual(?![\w-])[^\]]*\]\|visual(?![\w-]))/.test(y)?0:1)'` | exit 0 | **exit 1**: `publish` has no `needs` (fix-8 re-ran it at `e64da115`). The form reads `visual` anywhere in a `needs` list, so it holds on W-D.2's `needs: [verify, visual]` (W-D.2 §3 item 6), where the earlier `needs:\s*\[?\s*visual` read exit 1 (fix-8, FG-01; run on a three-line fixture: `[verify, visual]` 0, `visual` 0, `[visual]` 0, `[verify]` 1, `[visual-ish]` 1) |
| A3-G6 · the checklist comment is gone | `! grep -q "run the existing visual suite" scripts/release.sh` | exit 0 | **exit 1** (`release.sh:25`) |
| A3-G7 · the lane measures the built demo | `grep -q "demo:dist:serve" tests-visual/playwright.config.ts` | exit 0 | **exit 1** (`:141` runs `npm run dev`) |
| A3-G8 · the green leg is green | `npm -w tests-visual run gate:wired` | exit 0, the verdict reader reading 0 failed and 0 skipped on both projects | the script is absent. Its first member's check measured here: 0 of 160 overflow cells |
| A3-G9 · the planted leg is red on every spec | `npm -w tests-visual run gate:wired:planted` | exit 0, the verdict reader confirming every wired test failed on its `bite.red` text | the script is absent |

A3-G8 alone could pass with an empty list; A3-G3 and the roster's `bound` visual entries (at least G-49 and the WebKit engine cells) prevent it, and A3-G9 fails if any listed spec cannot fail. A3-G9 alone could pass on a spec that times out under its plant; the verdict reader requires the entry's `bite.red` text in the failure.

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| G-49 on every manifest route at 390×844 and 1440×900 | light | Chromium; Playwright WebKit labelled | the green run and the planted run from the first `visual.yml` run on the landing commit | `scrollWidth - clientWidth` per cell: 0 on green, ≥ 1610 px on planted (2000 − 390) |
| the WebKit engine cells (G-15, G-19, G-22, G-26) on the built demo | light and dark | Playwright WebKit labelled; real Safari UNMEASURED (OW-3) | green and planted reports, and one screenshot per invariant of the same element in each leg | the computed value each entry reads (blur px per rung, outline width, box-shadow, animation state) |

The CI artefact is the DELTA: both reports and the screenshots, uploaded by `visual.yml` and cited by run id in the wave record. A later wave that adds a wired spec cites its own first run the same way.

## 7 · MIGRATION rows

None. CI and the private visual workspace are not published surfaces.

## 8 · Ledger rows

Closes C-13 as restated (BK FINAL §7 carries it through #66; `census-register-b.md:56` routes "C-13 is F-04's") and #85's unwired-visual item (`census-register-b.md:70`). P-2's enforcement for later waves is this wired set plus each wave's §6 (`CENSUS.md:215`); the close checklist (W-L.8) reads each wave's cited run.
