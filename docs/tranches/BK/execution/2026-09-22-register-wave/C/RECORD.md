# Lane C — 10-6, N-1, N-4, N-5 (manifest in the tarball, the CI pixel-floor red, prettier, trusted-publishing readiness)

**Seat** implement · **model** `claude-opus-5-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a4668a47-faa/agent-a8a489c655a2552d1.jsonl`,
the `"model"` field; the file was found by grepping the workflows tree for a phrase unique to
this lane's prompt, `LANE C · rows 10-6 (MIGRATION joins files)`, so the datum is this seat's
own and not the parent session's; it matches `claude-opus-5*`) · **date** 2026-09-22 ·
**base** `master` @ `695d4925` · **ruling of record**
`docs/tranches/BK/execution/2026-09-22-register-wave/RULINGS.md` §1 10-6, §2 N-1/N-4/N-5, §3
lane C fence.

## Step-0 baseline

`git status --short` at first byte: empty — the tree was clean before this lane wrote.
`git rev-parse HEAD` = `695d4925f1945060005c717537fea97b9c61781b`.

Register receipt at baseline (`node scripts/gate-register.mjs`):

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## 10-6 · `MIGRATION.md` joins `files`

**Ruling** (RULINGS §1 10-6): "`package.json` `files: ["dist", "MIGRATION.md"]`; `verify:package`
sees the new entry; the ratchet moves and is rebound by the driver on the committed tree."
RULINGS and the O-26 register agree. The O-20 LEDGER (`:28-31`, "MIGRATION.md and DESIGN.md
do not ship … Every doc cure that routes through MIGRATION/DESIGN lives on GitHub only") records
the opposite state as a fact; RULINGS is the later ruling and wins for `MIGRATION.md`.
`DESIGN.md` is not in the ruling and stays out of `files`.

**Edit** `package.json:470-473` — `"files": ["dist", "MIGRATION.md"]` (the only byte of
`package.json` this lane touched).

**Witness** (no test file is named by the ruling; the witness is the packed tarball itself):
- RED on the old bytes — the published 9.0.0 tarball (`npm pack @mkbabb/glass-ui@9.0.0`,
  `tar tzf | grep -v '^package/dist/'`): `package/LICENSE`, `package/package.json`,
  `package/README.md` — no `MIGRATION.md`.
- GREEN after — `npm pack --ignore-scripts --json` on the working tree: non-dist entries
  `LICENSE 1066`, `MIGRATION.md 288389`, `README.md 15453`, `package.json 16184`.
- `verify:package` (log `scratchpad/regwave/C-verify-package.log`): packs, the claims and CSS
  checks pass, then `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2850979 > 2562566`
  — the expected RED the driver rebinds. The delta is exactly accounted: 2850979 − 2562566 =
  288413 = `MIGRATION.md` 288389 + the 24 bytes the new `files` line adds to `package.json`;
  `dist/` is byte-for-byte the datum's.

**Residue**: the figures are provisional — Lane R edits `MIGRATION.md` after this lane, so the
driver's rebind on the committed tree is the one that counts. `.bundle-ratchet` untouched.

## N-5 · Trusted Publishing readiness (`release.yml`)

**Ruling** (RULINGS §2 N-5): "`npm i -g npm@latest` (OIDC trusted publishing needs npm ≥
11.5.1) before the publish step; the `NODE_AUTH_TOKEN` line STAYS …; the header comment gains
the exact npmjs.com steps."

**Measured first**: `npm view npm@latest version` = `12.0.2`; the nodejs.org dist index gives
node `v24.21.0` (2026-09-07, what `setup-node` `node-version: 24` resolves) bundling npm
`11.19.0` — already above the 11.5.1 floor. `@latest` would therefore swap a satisfying npm 11
for npm 12, a major the publish path has never run, at the cut itself. The lane prompt allows
"the exact minimum, npm ≥ 11.5.1", so the step is `npm install -g npm@^11.5.1`: it states the
floor, holds it if the node pin ever drops below, and takes no unmeasured major. This is the
one place the lane reads the ruling's example (`@latest`) through its stated reason (≥ 11.5.1)
— flagged for the adjudicator; swapping the range for `@latest` is a one-token edit.

**Edit** `.github/workflows/release.yml`:
- `:12-21` — header gains the dated paragraph `[2026-09-22 · BK register wave N-5]`: npm ≥
  11.5.1 and `id-token: write` (already granted); npmjs.com → @mkbabb/glass-ui → Settings →
  Trusted Publisher → GitHub Actions, organization or user `mkbabb`, repository `glass-ui`,
  workflow filename `release.yml`, environment blank → Set up connection; `NODE_AUTH_TOKEN`
  stays until the first OIDC publish succeeds, then the `NPM_TOKEN` secret and the `env:` line
  go; removing the token first breaks the next cut.
- `:58-61` — new step `npm with OIDC trusted publishing`: `npm install -g npm@^11.5.1 && npm
  --version`, immediately before `publish`; `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`
  unchanged at `:65`.

**Witness**: RED — `grep -c 'npm install -g npm'` on `HEAD:.github/workflows/release.yml` = 0;
GREEN — 1 on the working tree, the step list's tail reads `test`, `npm with OIDC trusted
publishing`, `publish` (PyYAML parse); `actionlint .github/workflows/release.yml` exit 0.
The live proof is the next tag's `release.yml` run (the driver's).

**Residue**: owner-only §4 — enable the publisher on npmjs.com, then delete the secret.

## N-4 · prettier config

**Ruling** (RULINGS §2 N-4): "A repo-local `.prettierrc.json` IDENTICAL to the resolving
`~/.prettierrc.json` (`printWidth 88, useTabs false, tabWidth 4`), so nothing reformats; NO
sweep — the lane reports `--check`'s file count as a datum only."

**Edit** `.prettierrc.json` (new) — copied from `~/.prettierrc.json`; `cmp` reports the two
byte-identical (`{"printWidth": 88, "useTabs": false, "tabWidth": 4}`, 4-space indent, trailing
LF). `npx prettier --find-config-path src/index.ts` now resolves `.prettierrc.json` (the repo's,
not `~`'s). No parent `~/Programming` config exists to shadow it.

**Witness / datum** (prettier 3.6.2, `npx prettier --check .`, log
`scratchpad/regwave/C-prettier-check.log`, exit 2): **6631** files flagged — 5954 under `docs/`,
677 outside it (`src` 236, `tests-visual` 157, `tests` 150, `demo` 113, `scripts` 13, root
configs 6 incl. `MIGRATION.md`) — and 3 files that do not parse (two under `docs/tranches/BD/`
+ `docs/tranches/BG/`, JSON-lines and a stray `</content>`). The count was taken on the shared
tree with other lanes' edits live, so it is a datum for the wave, not a pin. Because the config
is identical to the one that resolved before, the count is the same with or without the file.
Nothing was swept.

**Residue**: none in the lane. Whether to sweep is not ruled.

## N-1 · the master pixel-floor CI red

**Ruling** (RULINGS §2 N-1): "the ceiling is a renderer artefact, the floor is not. The blob
FLOOR arm … stays in CI; the CEILING arm is GPU-gated exactly as the aurora floor is — it runs
in `scripts/release.sh` on real hardware … and NOT on the SwiftShader runner … the 0.7 datum
NEVER loosens; the `ci.yml` comment block gains the blob-ceiling sentence in the aurora idiom."

**Measured first.**
- The ruled measurement source is empty: `gh run download 35399022659 -n
  pixel-floor-pi-reports` → `no valid artifacts found`. The run's upload step logged
  `No files were found with the provided path: tests-visual/.cache/pi-report-*.json …` —
  `upload-artifact@v4` defaults `include-hidden-files: false` and `.cache/` is a hidden
  directory, so the "bank the machine reports" step has never uploaded a report. Measured from
  the job log instead (`gh run view 35399022659 --log --job <pixel-floor>`, saved
  `scratchpad/regwave/ci-35399022659-pixel-floor.log`), which prints the same figures.
- Run 35399022659 (`e3587ec8`, `PI_ANGLE: swiftshader`): the failing step is `pixel floor (real
  render must be GREEN)` = `gate:pixel-floor:ci`; the two planted steps were skipped. Its line:
  `PI blob coverage=0.578 floor=0.1 · paintedShare=0.997 ceil=0.7`; the error is the CEILING,
  `blob coverage 0.997 of the PAINTABLE interior … exceeds the non-flood ceil 0.7`
  (`expect(received).toBeLessThanOrEqual(0.7)`, received 0.9974811083123426, spec `:758`). The
  FLOOR in the same run held — 0.578 ≥ 0.1, and the floor `expect` precedes the ceiling's, so it
  evaluated and passed before the ceiling threw. The ruling's expectation is confirmed.
- How `--floors=blob` evaluated the ceiling: `pi-gate-verify.mjs` reads per-TEST status from the
  JSON report and the floor and ceiling were two `expect`s in ONE Playwright test ("blob paints a
  contained non-flood droplet …"). No verifier flag could take the floor without the ceiling, so
  the cure needed the spec split the fence allows. The aurora floor is gated by test selection
  (CI's `-g 'blob paints'` + `--floors=blob`); the split gives the ceiling the same gate.
- Did the ceiling ride the planted arms? `gate:pixel-floor:ci:planted` (`PI_PLANT=all` →
  `blob-blank`) bites the floor only — no. `gate:pixel-floor:planted:flood` IS the ceiling's
  planted arm and ran in CI (`ci.yml:66-67` at HEAD) — yes; it leaves CI with the ceiling.
- The SwiftShader read is the flood signature exactly: `PI_PLANT=blob-flood` on Metal reads
  `coverage=0.580 · paintedShare=0.997`, the CI runner's un-planted render `0.578 · 0.997`
  (Metal's un-planted render: `0.165 · 0.295`). The runner paints the canvas opaque.

**Edits.**
- `tests-visual/substrate-paints-color.spec.ts:664-775` — the body of the one blob test becomes
  `readBlobBounds(page)` (`:671`, unchanged but for the return of `{ coverage, paintedShare,
  paintableShare }`), called by two tests: `"blob paints a non-blank droplet on
  BLOB_CONFIG_DEFAULTS"` (`:758`, the MIN `expect`, message unchanged) and `"blob keeps a
  transparent margin (non-flood ceiling) on BLOB_CONFIG_DEFAULTS"` (`:766`, the MAX `expect`,
  message unchanged). Dated bracket at `:664-670`. `BLOB_COVERAGE_MIN 0.1` / `MAX 0.7`
  untouched.
- `tests-visual/pi-gate-verify.mjs:36-40` — `FLOORS` gains `"blob-ceiling"`; `blob` is the
  floor title; dated bracket `:47-50`; `FLOOR_BITE` (`:120-130`) keyed off `FLOORS` rather than
  repeating the titles, one plant per blob test (`blob-blank` → floor, `blob-flood` → ceiling),
  dated bracket `:124-125`.
- `tests-visual/package.json:11-12` — `gate:pixel-floor:planted` names `--floors=aurora,blob`
  (under `--plant=all` the ceiling test has no plant and would read "has NO plant" RED);
  `gate:pixel-floor:planted:flood` selects `-g 'blob keeps'` and `--floors=blob-ceiling`.
  `gate:pixel-floor` (all floors, now incl. the ceiling), `gate:pixel-floor:ci` and
  `gate:pixel-floor:ci:planted` are byte-unchanged — the CI invocations are the same strings;
  `-g 'blob paints'` now selects the floor alone.
- `.github/workflows/ci.yml:58-62` — the blob-ceiling sentence under the aurora sentence, dated
  bracket; the `planted FLOOD must RED the ceiling` step and its 4-line comment are removed.
- Cure round 1 (comment-only, dated brackets): `ci.yml:57-58` (the `pixel-floor-gpu` pointer),
  `ci.yml:73` (`include-hidden-files: true`), `pi-gate-verify.mjs:23-24` (`--plant` help:
  the ceiling is its own floor) and `:38` (three floors, not two),
  `substrate-paints-color.spec.ts:112-113` (`all` plants one per PLANTABLE floor).
- `scripts/release.sh` (outside the fence) is untouched and still asserts the ceiling on real
  hardware twice: `:45 gate:pixel-floor` (no `--floors` → all three floors required, the
  ceiling's green arm) and `:50 gate:pixel-floor:planted:flood` (its planted arm).

**Witness** (born-RED; logs under `scratchpad/regwave/`).
- Local SwiftShader is selectable (`PI_ANGLE=swiftshader`, `playwright.config.ts:35`) but not
  usable as the witness: the CI invocation on the old bytes TIMED OUT at 180 s in
  `locator.scrollIntoViewIfNeeded` (log `C-n1-RED-ci.log`, verdict `(timedOut)`), before either
  bound evaluated — the mac-arm64 headless shell under SwiftShader is far slower than the
  ubuntu runner, and concurrent lanes' edits hot-reloaded the page mid-run. Recorded, not used.
- The witness is the CI runner's own read reproduced on Metal: `PI_PLANT=blob-flood` gives
  `0.580 · 0.997`, the runner's `0.578 · 0.997` (`C-n1-born-red.log`).
  - RED, old bytes (`HEAD:` spec copied to a temporary `tests-visual/_c-old-substrate.spec.ts`,
    deleted after; `HEAD:` verifier from the scratchpad), the CI invocation `-g 'blob paints'` +
    `--expect=green --floors=blob`: `✘ … blob paints a contained non-flood droplet …` →
    `pixel-floor gate: RED (--expect=green) · … exceeds the non-flood ceil 0.7`, exit 1.
  - GREEN, new bytes, the same invocation and plant: `✓ … blob paints a non-blank droplet …` →
    `pixel-floor gate: GREEN — 1 floors ran on the live paint path and passed.`, exit 0.
- The five npm arms on the new bytes, Metal:
  - `gate:pixel-floor:ci` → `0.165 · 0.295`, 1 passed, `GREEN — 1 floors`, exit 0.
  - `gate:pixel-floor:ci:planted` → `blob-blank` `0.000`, 1 failed, `GREEN (self-test,
    --plant=all) — 1 floors RED-ed … each on its own assertion`, exit 0.
  - `gate:pixel-floor:planted:flood` → `0.580 · 0.997`, the ceiling test failed, `GREEN
    (self-test, --plant=blob-flood) — 1 floors RED-ed …`, exit 0.
  - `gate:pixel-floor` (release.sh `:45`) → aurora ✓ 21.7 s, floor ✓, ceiling ✓ (`0.156 ·
    0.280`), `GREEN — 3 floors`, exit 0.
  - `gate:pixel-floor:planted` (release.sh `:46`) → aurora ✘, floor ✘ on `blob-blank`, ceiling ✓
    (not required), `GREEN (self-test, --plant=all) — 2 floors RED-ed …`, exit 0.
- The ruling's proof is a green `ci.yml` on the wave's first push — the driver watches it.

**Residue** (for the adjudicator; none of it acted on).
1. `ci.yml` `bank the machine reports`: `upload-artifact@v4` skips the hidden `.cache/`
   directory (`include-hidden-files` defaults false; run log
   `ci-35399022659-pixel-floor.log:725` `include-hidden-files: false`, `:732-733` `No files
   were found … No artifacts will be uploaded`), so `pixel-floor-pi-reports` has never held a
   file. Taken in cure round 1 (adjudication CA-3a): `ci.yml:73` `include-hidden-files: true`.
   The upload cannot run locally — the witness is the wave's first CI push, whose
   `pixel-floor-pi-reports` artefact must hold `pi-report-green.json` +
   `pi-report-planted.json`.
2. `ci.yml:57` (committed, above the new bracket) pointed at "release.yml `pixel-floor-gpu`", a
   job `release.yml` never carried (`git log -S`). Taken in cure round 1 (CA-3b): `:57-58` now
   read "see `scripts/release.sh` [2026-09-22 · was "release.yml `pixel-floor-gpu`", a job
   release.yml never carried]".
3. `tests-visual/package.json` `gate:pixel-floor:planted` still runs the ceiling test under
   `blob-blank` (it passes, 5.4 s, and is not required). Narrowing it with `--grep-invert`
   was left out as extra surface.

## Battery

`timeout 900 npx vitest run` (log `scratchpad/regwave/C-C-vitest.log`): **233 files — 231
passed, 2 failed; 2252 tests — 2240 passed, 2 failed, 10 expected-fail.** Both reds are outside
this fence: `tests/gates/boot-graph.test.ts` (`dist-demo/index.html is STALE` — built
2026-09-18, sources edited today by the live lanes; the close battery rebuilds the demo) and
`tests/gates/orphan-css-partial.test.ts` (Lane L's gate test, mid-edit). `tests/gates/gate-register.test.ts`
(which reads `ci.yml` and `release.sh`, incl. the gut-every-pixel-floor-step bite) ran alone
after the `ci.yml` edit: 21/21 passed.

## Gate receipt

`node scripts/gate-register.mjs` after all edits — unchanged from baseline:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Files touched (driver's pathspec)

```
.github/workflows/ci.yml
.github/workflows/release.yml
.prettierrc.json
package.json
tests-visual/package.json
tests-visual/pi-gate-verify.mjs
tests-visual/substrate-paints-color.spec.ts
docs/tranches/BK/execution/2026-09-22-register-wave/C/RECORD.md
```

Cure round 1 touches no file beyond this list (`ci.yml`, `pi-gate-verify.mjs`,
`substrate-paints-color.spec.ts`, this RECORD).

`package.json`: the `files` array only (`git diff package.json` is the one hunk at `:470-473`).

## FOR THE DRIVER

- Bracket RULINGS §2 N-1 at commit: `[2026-09-22 · the artefact was empty — upload-artifact@v4
  skips the hidden `.cache/` (include-hidden-files defaults false); the lane measured from the
  run log instead; the upload step gains `include-hidden-files: true` so the first push banks
  the pair]`.

## FOR LANE R

- **MIGRATION §10.0.0 note**: `MIGRATION.md` now ships in the npm tarball (`package.json`
  `"files": ["dist", "MIGRATION.md"]`), so the manifest is readable at any consumer's pin under
  `node_modules/@mkbabb/glass-ui/MIGRATION.md`. Additive.
- **verify:package figures** (working tree, before Lane R's `MIGRATION.md` edits and before the
  driver's rebind): unpacked content **2850979** bytes vs `.bundle-ratchet` **2562566** → the
  expected `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2850979 > 2562566`; delta
  **288413** = `MIGRATION.md` 288389 + 24 bytes of `package.json`. `npm pack` of the same tree:
  840 entries, tarball 1006214 bytes, shasum `005426b3094694aa81e83860a35c31e612d7fb2d`,
  sha256 `55d770e440e212d4be89e29256735ed33995352a1fc7e5358ff3872183a0cfb5`, integrity
  `sha512-aTQJuW6iQpnEAe1q2riM2z0YGJvHXbKn9FQaV/MUJ6eWc6Jau3pv+UBER51aqxn3lgwncOgibV7k2e1hYevORQ==`.
  All provisional — the committed-tree rebind is the datum.
- **ci.yml in one sentence**: the blob pixel floor's non-flood CEILING (0.997 on the runner's
  SwiftShader vs 0.288 on Metal — the ruling's CLOSE-TESTS datum (EXECUTION-PROGRESS.md:7252);
  this wave measured 0.295 on the `ci` arm and 0.280–0.281 on the release arm,
  `C-n1-GREEN-metal-ci.log` / `C-n1-metal-release.log`) is now its own test and runs only on
  real hardware in `scripts/release.sh`, so CI runs the blob floor and its planted bite and no
  longer runs the planted-flood step; the reports-upload step gains `include-hidden-files: true`
  so the pair is banked.
- **release.yml**: an `npm install -g npm@^11.5.1` step before `publish` and the dated
  trusted-publisher paragraph; `NODE_AUTH_TOKEN` unchanged.
- **Prettier datum**: repo-local `.prettierrc.json` identical to `~/.prettierrc.json`;
  `--check .` flags 6631 files (677 outside `docs/`), 3 unparseable; no sweep.


## Cure round 1

Seat: C cure (Opus), model id `claude-opus-5-5` (own transcript
`wf_a4668a47-faa/agent-a214053f1facad61e.jsonl`). Source: `scratchpad/regwave/C-adjudication-1.json`
(CA-2, CA-3, CB-1 accepted/amended; CA-1, CA-4, CB-2 rejected — nothing applied for them).

1. `ci.yml:73` — `include-hidden-files: true` under `name: pixel-floor-pi-reports`. Applied.
2. `ci.yml:57-58` — the `pixel-floor-gpu` pointer now reads "see `scripts/release.sh` [2026-09-22
   · was "release.yml `pixel-floor-gpu`", a job release.yml never carried]". Applied.
3. `tests-visual/pi-gate-verify.mjs:23-24` — the `--plant` help gains "[2026-09-22 · N-1: the
   ceiling is its own floor, `blob-ceiling` — see FLOORS]". Deviated in form only: wrapped onto
   two continuation lines at the same column, since one line would run to 107 columns against
   the file's 88.
4. `tests-visual/pi-gate-verify.mjs:38` — "[2026-09-22 · N-1] Three since the blob ceiling split
   out as `blob-ceiling`." Applied.
5. `tests-visual/substrate-paints-color.spec.ts:112-113` — "[2026-09-22 · N-1: one per PLANTABLE
   floor — `blob-ceiling` has no plant under `all`.]" after "one per floor.", the rest of the
   paragraph's wrap unchanged. Applied.
6. FOR LANE R `ci.yml` bullet — 0.288 cited as the ruling's CLOSE-TESTS datum, with this wave's
   0.295 / 0.280–0.281 and their logs; the three code comments stay at 0.288. Applied.
7. N-1 edits + residue 1-2 — the taken cures, their run-log grounds and the first-push witness
   for item 1. Files-touched list unchanged (every cured file was already on it). Applied.
8. FOR THE DRIVER — the RULINGS N-1 bracket text from CA-3. Applied.
9. Re-run (logs `scratchpad/regwave/C-cure1-*.log`):
   - gate receipt `node scripts/gate-register.mjs` → `seats:60 active:46 reserved:5 worstCase:51
     remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf
     violations:0`, exit 0 — unchanged.
   - `pi-gate-verify.mjs` on the banked reports, verdicts unchanged: `--expect=green
     --floors=blob` on `pi-report-green.json` → `GREEN — 1 floors`; `--expect=green` (all) →
     `GREEN — 3 floors`; `--expect=planted-red --plant=all --floors=aurora,blob` on
     `pi-report-planted.json` → `GREEN (self-test) — 2 floors RED-ed`; `--plant=blob-flood
     --floors=blob-ceiling` on `pi-report-flood.json` → `GREEN (self-test) — 1 floors RED-ed`.
     All exit 0.
   - `tests/gates/gate-register.test.ts` (reads `ci.yml`) → 21/21 passed
     (`C-cure1-vitest.log`).
