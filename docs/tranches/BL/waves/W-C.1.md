# W-C.1 · One scratch root; no tooling and no media under `docs/` · 11.0.0

| field | value |
|---|---|
| seat | band-C wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `26d193b7` in a scratch worktree (the task named `f3ad78d0`; every commit between is under `docs/tranches/BL/`). `git diff --stat v10.1.0 HEAD -- src` prints nothing |
| ships in | 11.0.0 (band C, PLAN §2) |
| families | F-61 whole (`audit/REGISTRY.md:1338-1345`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L01b-63 | #63 W-REPO-WEIGHT never started; the tracked evidence grew by 438 PNG in BK |
| L09-16 | `docs/` holds 8.2 GB; 2.4 GB of tracked media is never cited; 815 MB of duplicate blobs; CI clones full history |
| L14-15 | root clutter: 49 ignored images, tool profile dirs, `.gitignore` growing one line per tranche incident |
| L14-16 | 503 executable scripts (now 752, §2) tracked inside `docs/`; RETIRE with an invariant against new ones |
| R2-06-06 (tooling half) | BD's `recap.mjs`, executable tooling in `docs/` (W-A.2 §1 routes it here) |
| B11-G3 | W-B.11's born-RED "no tooling under `docs/`" (`waves/W-B.11.md:40`), bound here |

Not closed here: the `tests-visual/` output paths (W-A.1, A1-G10 and A1-G11), the capture tools' move to `scripts/` (W-A.3), and the provenance comments that cite `docs/tranches/` paths (W-C.2's E-10 grammar, class `record-cite`).

## 2 · The defect at HEAD

Measured in the scratch worktree at `26d193b7`, and for untracked files in the main checkout (read only).

- **Executable tooling under `docs/`.** `git ls-files docs | grep -cE '\.(mjs|js|ts|cjs|sh|py)$'` → **752**. By tree: BG 307, **BL 249**, BJ 62, AZ 30, BH 23, BI 22, IOS27-MICRO 18, BD 18, BK 14, AY 6, E 2, BA 1. Of the 752, **347** name `chromium`, `playwright` or `puppeteer`. BL's own 249 are formation tooling: `design/structure/` 193 (pass-3 123, pass-2 36, floor 34), `design/material/harness` 23, `design/tile/harness` 21, `design/dock/harness` 12. So the frozen-record class is still growing, and this tranche is growing it. (W-B.11 read 724 with a narrower extension set, `.mjs|js|ts|py`.)
- **Media under `docs/`.** `git ls-files docs | grep -ciE '\.(png|jpe?g|gif|webp|webm|mp4|mov|ndjson)$'` → **4,262**, `xargs du -ck` → **5,175,960 KB** (4.94 GiB). By tree: BG 2,397, BK 505, AY 376, AZ 328, BA 160, BJ 129, AX 123, BC 90, BI 49, BB 48, BD 30, BE 16, E 8, AS 2, AW 1. BL tracks none. L09-16's census stands: 2,015 of these (2.40 GB) are never named by any tracked text file, and 255 blobs are duplicated across 432 extra paths (814.7 MB).
- **The ignore file keeps records trackable and grows per incident.** `.gitignore` carries 8 negations that force-track evidence under `docs/` (`:13`, `:16-18`, `:24`, `:46-48`, e.g. `!docs/tranches/*/evidence/*/*.png`) and 31 lines that name a tranche or a `docs/` path (`grep -cE "docs/|\b(A[A-Z]|B[A-L])\.W|BK |AP\.|AS\.|AX\.|BH\." .gitignore`), such as `docs/tranches/BG/audit/.wkshot-bin` and `docs/tranches/BJ/formation/round-3-live/perf-trace-*.json`.
- **Live code reads tranche records.** `rg -n --glob '!*.md' "[\"'\`](\.\./)*docs/(tranches|archive)/" scripts tests src package.json .github | grep -vE ':[0-9]+:\s*(//|\*|/\*)'` → **6** lines: `scripts/profile-bundle.mjs:66` (the bundle baseline), `scripts/gate-register.mjs:79,81,86` (three roster inputs), `scripts/import-dag.mjs:523` (a `supersedes:` field naming a BJ record), `tests/components/easing.contract.test.ts:793` (asserts a BJ coordination letter exists on disk). The 9 comment lines the same `rg` finds are W-C.2's.
- **Root clutter (main checkout, untracked, ignored).** `git status --porcelain --ignored -- . ':!docs' | grep '^!!'` lists 49 root images (`*.png`, `*.jpeg`) and the tool dirs `.judge-chrome-profile/` (132 MB), `.chrome-profile-blob/` (87 MB), `.playwright-mcp/` (16 MB), `.playwright/` (4.2 MB), `.tmp/`, `.ruff_cache/`, plus `tests-visual/.cache`, `tests-visual/test-results`, `tests-visual/docs`. No tracked script writes the two profile dirs (`rg -l "judge-chrome-profile|chrome-profile-blob" scripts tests tests-visual demo src package.json` → nothing): they are agent scratch with no owning root. `git status --porcelain --ignored -- docs | grep -c '^!!'` → **4,047** ignored paths under `docs/`.
- **CI clones every blob ever committed.** `ci.yml:15` and `release.yml:35` check out with `fetch-depth: 0`. Neither job reads history: the only `git` call in `scripts/` and `tests/` is `comment-census.mjs:454,475`, which reads `HEAD`'s tree. `git count-objects -vH` → `size-pack: 4.07 GiB` (L01b-63).
- **A run of the suite stays clean.** After `npm run build` and `npx vitest run` (2,316 passed, 3 failed: `tests/gates/boot-graph.test.ts`, whose build arm needs `dist-demo/`), `git status --porcelain --ignored` in the worktree lists only `dist/`, `node_modules`, `tests-visual/node_modules`. The unit suite is not the source of the clutter; probes and agents are.

## 3 · The cure

1. **One scratch root: `.cache/`.** It is already git-ignored (`.gitignore:29-32`) and W-A.1 puts `tests-visual/` output under `.cache/visual/`. Every other writer uses it: `scripts/*` write under `.cache/<script-name>/`; Playwright's `outputDir` is `.cache/playwright/`; a wave's π and DELTA captures go under `.cache/evidence/<wave-id>/` and the wave record cites each file by path and sha256. Nothing deletes `.cache/evidence/` automatically. The dirs `tests-visual/.cache`, `tests-visual/test-results`, `tests-visual/docs` and the root tool dirs are deleted from the checkout.
2. **Evidence media leaves the tree; history keeps it.** `git rm` every media file under `docs/` (the 4,262 of §2). BK ratified this reading of "tranche history stands": it binds the prose, not the pixels; the working-tree reclaim is taken and the history rewrite stays declined (`docs/tranches/BK/ASK.md:39`, g8). A record that cites an image keeps its words; the image is `git show <C1-base>:<path>`, where `<C1-base>` is the commit before this wave, named in the wave record and in BL's `FINAL.md`. The 8 force-track negations go from `.gitignore`, so the ignore file no longer makes records trackable.
3. **Tooling under `docs/` retires; history keeps it.** `git rm` every executable file under `docs/` (the 752 of §2). They are records of how a past measurement was taken; kept in the tree they rot silently (they import `src/` paths that W-D.1 moves, and no typecheck reads them). A record that names a script keeps its words; the script is `git show <C1-base>:<path>`. The invariant G1 then forbids new ones. This is the RETIRE the registry names (`REGISTRY.md:1344`); keeping 752 dead files behind an allowlist would be a pinned literal list that every new record has to amend.
4. **The design loops' tooling moves out, and goes with its loop.** A loop still open when this wave lands (D1-D5; D1 replays committed kits, `FORMATION-PROGRESS.md:56`) moves its live harness and replay kits from `docs/tranches/BL/design/<loop>/` to `scripts/loops/<loop>/`, and its `REGISTRY.md` and `HARNESS.md` cite the new path. A loop that has converged has no live tooling to move; its files go with step 3. Each loop wave (W-D.1, W-H.1/W-H.2, W-I.1, W-J.1, W-J.2) promotes the witnesses it keeps into `tests/` or `tests-visual/` (bound in W-A.2's roster, wired by W-A.3) and deletes `scripts/loops/<loop>/`. W-L.8 checks `scripts/loops/` is gone at the close.
5. **Code never reads a record.** `scripts/gate-register.mjs` goes in W-A.2 and `scripts/profile-bundle.mjs` in W-A.5 (`waves/W-A.5.md:40`); if either lands after this wave, this wave deletes the read. `scripts/import-dag.mjs:523` drops its `supersedes:` field. `tests/components/easing.contract.test.ts:789-797` drops the `existsSync` arm: the test asserts `role="img"`, and the consumer relay is W-L.7's packet, not a file the unit suite checks.
6. **The ignore file is structural.** `.gitignore` keeps only lines that name a class of build or tool output: `node_modules/`, `dist/`, `dist-demo/`, `.cache/`, `.claude/`, `.DS_Store`, `.glass-generation-*/`, `*.previous`, the root media ignores (`*.png`, `*.jpeg`, `*.jpg`) and the one fixture negation `!tests-visual/fixtures/*.png`. No line names `docs/` or a tranche, and no comment carries a tranche id (W-C.2's E-10 invariant reads `.gitignore`).
7. **The root is clean.** The 49 root images and the ignored tool dirs are deleted from the checkout that runs the wave (their list goes in the wave record; 27 are cited by BC/AX records, whose citations were never version-controlled evidence, L14-15). Agents that run probes write to `.cache/` (the probe templates and the formation seat prompts say so; the Playwright MCP server is started with `--output-dir .cache/playwright-mcp`).
8. **CI clones one commit.** `ci.yml` and `release.yml` drop `fetch-depth: 0`, so `actions/checkout` fetches depth 1. After steps 2 and 3 the checkout carries the tree only.

The wave keeps no fallback: no second output root, no allowlist of grandfathered scripts, and no "archive" dir inside the tree.

## 4 · Files it touches

- Deleted: the 752 executable files and 4,262 media files under `docs/` (§2 lists the per-tranche counts; the wave record lists every path); `tests-visual/.cache/`, `tests-visual/test-results/`, `tests-visual/docs/` (untracked); the root images and tool dirs (untracked).
- Moved: each open loop's harness and kits to `scripts/loops/<loop>/`; the loop's `REGISTRY.md` and `HARNESS.md` path cites.
- Edited: `.gitignore`; `.github/workflows/ci.yml:15`, `release.yml:35`; `scripts/import-dag.mjs:523`; `tests/components/easing.contract.test.ts:789-797`; `tests-visual/playwright.config.ts` (`outputDir`); `docs/instructions/README.md` (the scratch-root rule, one line).
- New: `tests/gates/repo-hygiene.test.ts` (G1, G2, G3, G4 as one file, bound in W-A.2's roster as G-56 REPO-HYGIENE with a bite patch per arm).

## 5 · Acceptance gates

Every command runs from the repo root. "HEAD reading" is what the command gave in the scratch worktree at `26d193b7` (G6 in the main checkout).

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| C1-G1 · no tooling under `docs/` | `test "$(git ls-files docs \| grep -cE '\.(mjs\|js\|ts\|cjs\|sh\|py)$')" -eq 0` | exit 0 | **exit 1**: 752 |
| C1-G2 · no media under `docs/` | `test "$(git ls-files docs \| grep -ciE '\.(png\|jpe?g\|gif\|webp\|webm\|mp4\|mov\|ndjson)$')" -eq 0` | exit 0 | **exit 1**: 4,262 (5,175,960 KB) |
| C1-G3 · the ignore file is structural | `! grep -nE '^!docs\|docs/' .gitignore` | exit 0 | **exit 1**: 25 lines (8 negations, 17 more that name a `docs/` path) |
| C1-G4 · no code reads a record | `test "$(rg -n --glob '!*.md' "[\"'\`](\.\./)*docs/(tranches\|archive)/" scripts tests src package.json .github \| grep -vE ':[0-9]+:\s*(//\|\*\|/\*)' \| wc -l)" -eq 0` | exit 0 | **exit 1**: 6 |
| C1-G5 · one-commit clones | `! grep -n 'fetch-depth: 0' .github/workflows/*.yml` | exit 0 | **exit 1**: `ci.yml:15`, `release.yml:35` |
| C1-G6 · a probe battery leaves only the scratch root | in a fresh worktree: `npm run build && npx vitest run && npx playwright test --config tests-visual/playwright.config.ts <one wired spec> && node scripts/import-dag.mjs --out .cache/import-dag.json`, then `git status --porcelain --ignored \| grep -vE '^!! (node_modules\|dist\|dist-demo\|\.cache\|tests-visual/node_modules)/?$'` | empty | the unit half is clean at HEAD (§2, last bullet); the Playwright half writes into `docs/tranches/*/audit/` (W-A.1's A1-G11 reading: 2 untracked PNGs under `docs/tranches/BG/audit/visual/`, 4 ignored under `docs/tranches/BA/audit/`) |
| C1-G7 · the loops' tooling is gone at the close | `test ! -e scripts/loops` | exit 0 at W-L.8 | passes at HEAD vacuously (the dir does not exist yet); it is a close-time line, and it bites in the window between this wave and the last loop wave. Not counted as born RED |

G1 and G2 could pass by moving the files somewhere else in the tree. G6 holds that side: a record dir that receives new output reddens it, and W-C.2's E-10 invariant rejects a new tranche-named dir under `scripts/` or `tests/`. G4 could pass by encoding a path so the string does not match; the E-10 `record-cite` class reads the same strings in every tracked file, comments included. G3 could pass by moving the negations into a nested `.gitignore`: G2 still fails on any tracked media. The bite patch for each of G1-G4 re-adds one line of the defect (one `.mjs` under `docs/tranches/BL/`, one PNG, one negation, one `readFileSync("docs/tranches/…")`) and records the red.

## 6 · π and DELTA obligations

None. The wave changes no painted surface: it deletes files under `docs/` that no build reads (the tarball carries `dist/` and `MIGRATION.md` only, `package.json` `files`), moves tooling, and edits CI checkout depth and one unit test's file-existence arm. The evidence is the counts in §5 and the wave record's path lists. A later wave's own π captures land under `.cache/evidence/<wave-id>/` from here on.

## 7 · MIGRATION rows

None. No published surface changes.

## 8 · Ledger rows

Closes #63 W-REPO-WEIGHT (`ledger/census-register-b.md:53`), the F-61 row of `ledger/CENSUS.md:133`, and B11-G3. The history rewrite stays declined (BK g8, `docs/tranches/BK/ASK.md:39`); BK's g9 (BG not relocated, `:40`) is overtaken, because its grounds were the nine gates that read BG's scripts, which W-A.2 deletes with the register.

## 9 · Gestalt passes (P-1)

The wave record carries the three passes: tranche fit (the scratch root is the one W-A.1 picked; no second root), wave (every deleted path is listed and recoverable at `<C1-base>`), feature (a fresh clone at depth 1 builds, tests and publishes with no reference to a deleted file: `npm run build && npx vitest run && npm pack --dry-run`).
