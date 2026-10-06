# W-L.8 · the 11.0.0 cut and the close: a checklist whose every item is a command, then FINAL.md · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b3d7fa28`; `package.json:3` `"version": "10.1.0"`; `npm view @mkbabb/glass-ui version dist.unpackedSize` → `10.1.0`, `2919057`; `cat .bundle-ratchet` → `2919057` |
| ships in | 11.0.0: this wave is the cut, and BL's close |
| families | F-12 whole (`audit/REGISTRY.md:301-310`): L04-F01, L04-F05, L04-F16, L04-F22, L04-F24, L04-F25, L04-F26, L01a-07, L01a-11, L01b-49b, L01b-55, L01b-66b, L01b-70, L01b-90, L05a-09, L05b-17, L06-11, L08-26, L09-14, R2-06-13 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| owner acts | the in-session confirmation before the tag, quoted verbatim in the wave record; OW-1 (Trusted Publisher) and OW-3 (Safari automation) are recorded at their state on the tag day, never re-booked (PLAN §1) |

## 1 · What it closes

| id | defect |
|---|---|
| L04-F01, L01b-49b, L01b-55 | the remainder re-booked by class list under a "no deferring" order |
| L04-F05, L04-F16, L04-F22, L01a-07, L01a-11, L05a-09, L05b-17 | SEALED and OWNER-GATED words over substance that had not landed |
| L04-F24, L04-F25, L04-F26 | close duties that never fired: #70 archaeology, the P-6 audit at 10.0.0, #15 provenance hooks, Q063 |
| L08-26, L09-14, L01b-66b, L01b-70, L01b-90 | close and wave records cite lines the tree no longer has (`DialogContent.vue:404` in a 237-line file) |
| R2-06-13 | the 09-17 census's PARTIAL word stale on #30 and #89 (both LANDED), 5 of 49 misread |
| L06-11 | the consumer census of record by memory (its roster half is W-L.6's; its record half is here) |
| P-4 (`CENSUS.md:187`) | the tranche format's close checklist has no gate |
| P-6 (`CENSUS.md:189`) | the overfitting audit at close has no enforcement |

## 2 · The state at HEAD

| reading | command | value |
|---|---|---|
| version | `node -p "require('./package.json').version"` | `10.1.0` |
| the 11.0.0 records | `grep -c '^## 11.0.0' CHANGELOG.md MIGRATION.md` | 0 and 0 |
| the registry | `npm view @mkbabb/glass-ui@11.0.0 dist.attestations.provenance.predicateType` | `npm error 404`. On `@10.1.0` the same read prints `https://slsa.dev/provenance/v1`, so the gate can pass |
| the release runs | `gh run list --workflow release.yml --limit 3 --json headBranch,conclusion` | `v10.1.0`, `v10.0.1`, `v10.0.0`, all `success`; no `v11.0.0` |
| FINAL.md | `test -f docs/tranches/BL/FINAL.md` | exit 1 |
| the ledger | `ls docs/tranches/BL/LEDGER.md` | absent (W-B.1 writes it) |
| the P-6 census | W-L.6 G-L6-1 | 227 published names with no reader |
| the hooks path (#15) | `git config --get core.hooksPath` | `/Users/mkbabb/Programming/glass-ui/.githooks`; `ls .githooks` → absent. The config points at a directory `d17153ec` deleted (L04-F26) |
| cites in records | `node tests/_bandL/cite-check.mjs <record> <commit>` (appendix A) | `BK/FINAL.md` at its own HEAD `d856e136`: 8 cites, 0 unresolved (BK's close used full paths; the checker passes a record that is right). `BL/ledger/census-register-b.md` at HEAD: 45 cites, **1 unresolved** (`src/components/equation/ConvergencePlot.vue:136`, a fourier-analysis file cited without its repo). `census-carries-recap.md`: 44, **1 unresolved** (`demo/scenes/amiga/utils.ts:2`, a keyframes.js file, same class). `census-register-a.md`: 47, 0 |
| the stale L08-26 cite | `grep -n 'DialogContent.vue:404' docs/tranches/BK/execution/2026-08-05-row31-a11y/RECORD.md` | `:36`, written as a bare filename, which appendix A's path rule does not match; the rule in §3.4 makes a bare filename cite a failure |

Three BK close duties are in no census file: #15 (provenance hooks), #70 (archaeology per close) and Q063 (07-27 exemplar recording preservation) (`audit/round-1/L04.md:72-74`, table rows 22-24; `grep -n 'Q063\|#70\b\|#15\b' ledger/*.md` → nothing). `verify-ledger.mjs` reads its expected set from the census files, so it would not see them. §3.3 decides them; the formation LEDGER carries their rows at LEDGER:414-416 (§6.2).

## 3 · The cure: the close checklist, each item a command with an artefact

The checklist is `scripts/tranche/close-check.mjs docs/tranches/BL --tag v11.0.0`. Each item prints its command, its output and pass or fail; the script exits 1 if any item fails. Its output is committed as the close's receipt and FINAL.md cites it. The items:

### 3.1 No inherited status word

`verify-ledger.mjs docs/tranches/BL --close` exits 0 (W-B.1): every ledger row terminal, every route real, owner-docket rows named. In addition, every row whose terminal is LANDED cites the evidence it was measured by (a gate id, a command with its output, or a `file:line` at the release commit). A status word copied from BK's census without that cite fails (L04-F05, R2-06-13).

### 3.2 P-6 with its artefact

W-L.6's census runs on the release commit's pack, on the owner's machine where the siblings are, and writes `P6-CENSUS.tsv` into the evidence path W-C.1 fixes. The item passes when the census exits 0 and the file's sha256 is in FINAL.md.

### 3.3 The three duties no census holds

| duty | terminal | rationale |
|---|---|---|
| #70 archaeology regeneration per close | RETIRE | it never fired and its script is not at the cited path (L04 row 23). What it was for, a reproducible record of what the tranche changed, is FINAL.md §1 and §2 here: each commit ledger and tag chain is printed by the `git log` command written beside it, so a reader can re-run it. One record, no second generator |
| #15 provenance hooks (Z-4, X-4a, X-4e, X-4f) | RETIRE; the stale `core.hooksPath` is unset | BI deleted the hook farm (`d17153ec`); provenance is the registry's SLSA attestation (§3.6). `core.hooksPath` still names the deleted `.githooks`, so a hook added under it would silently not run: the close unsets it (`git config --unset core.hooksPath`, a local-config act the owner confirms with the tag) |
| Q063 the 07-27 exemplar recording preservation | RETIRE, shown to the owner in the close confirmation | unverified since 07-28, and #4 sealed without it (L04 row 24). The owner may overrule in the same reply; the reply is quoted either way |

### 3.4 Every cite in the close records resolves

`cite-check.mjs` runs over FINAL.md and every wave record at the tag commit. A cite passes when it is a repo-relative path whose file exists at that commit with at least the cited line, or a sibling path qualified by its repo (`value.js/demo/…`), resolved read only in that repo at the commit the record names. A bare filename cite (`DialogContent.vue:404`) fails. FINAL.md cites symbols or gate ids where a line would drift (L08-26's own recommendation).

### 3.5 The cut

In order, each step's exit code read from its own run, never through a pipe:

1. **Entry.** W-L.7 closed; every gate of bands A to L green on the release commit, its π pairs on disk and cited (P-1, P-2). Band 0's gates are the 10.2.0 cut's: W-0.7 step 1 read them at `v10.2.0`, and they are not re-run here, since two of them read files later waves delete (W-0.1 G5 runs `scripts/verify-export-types.mjs`, which W-L.3 deletes; W-0.7's datum is `.bundle-ratchet`, which W-A.5 deletes) (fix-8, FG-01).
2. **Records.** `CHANGELOG.md` `## 11.0.0 — <date>` and `MIGRATION.md` `## 11.0.0`, with no wave ids, tranche ids or dated brackets (E-10), and G-L7-3's closure check green over the new section.
3. **Version.** `npm version 11.0.0 --no-git-tag-version`, committed as the release commit.
4. **Datum.** On the committed, clean release commit, after `npm run build`, run W-A.5's payload invariant (`node scripts/payload.mjs --enforce`, W-A.5 §3 item 3) and record each entry's reading in the wave record. It is the one datum: W-A.5 deletes `.bundle-ratchet` and W-L.3 deletes `scripts/verify-export-types.mjs`, and both land before this wave (PLAN §5). A dirty tree never binds a reading. The step is a record, not a gate of this wave: A5-G1 is the gate, and `verify.yml` runs the same command inside the release run G-L8-5 reads. That the registry tarball is this commit's build is G-L8-3 (fix-8, FG-03).
5. **The release run, not a local subset.** On the release commit: `release.yml`'s jobs as W-D.2, W-A.5, W-L.2 and W-L.3 leave them: `verify` (W-D.2's `verify.yml`: `npm ci`, `typecheck`, `build`, `payload.mjs --enforce`, `check:consumer`, `demo:dist:build`, `test`), the consumer-matrix job, `visual`, and `publish` with its receipt checks; then `scripts/release.sh v11.0.0`'s real-GPU arms (`gate:pixel-floor`, `:planted`, `:planted:flood`) and W-A.3's wired visual suite and W-A.4's GPU leg. An earlier close that ran a local subset shipped gate drift that only the release set would have caught (`docs/tranches/AX/audit/hardening/CHRONIC-miss-release.md:6-8`, `:192-196`); this step runs the release set.
6. **The owner's confirmation.** The owner sees the close glance (the band captures W-B.4 rules, the CHANGELOG entry, §3.3's three retirements, W-L.7's orphan list for L06-12, OW-1 and OW-3 at their state) and confirms in-session. The reply is quoted verbatim with its time, before the tag.
7. **Tag and publish.** `git tag -a v11.0.0` on the release commit, pushed; `release.yml` publishes with provenance. It authenticates with OIDC if W-B.13's Trusted Publisher step is done, otherwise with `NPM_TOKEN`; FINAL.md states which, and OW-1's state is its terminal record.
8. **The artefact check.** The registry tarball is packed back and read for each band's cure markers, as W-0.7's G5 did for 10.2.0: a marker list is collected from each wave record's "artefact marker" line.
9. **The relay.** W-L.7's letters go out after the registry serves 11.0.0.

### 3.6 FINAL.md

`docs/tranches/BL/FINAL.md` lands after the tag, in BK's form (BK FINAL §1-§12): the commit ledger by command, the tag chain, the per-wave landing summary with each wave's gate readings at the release commit, the close receipt (§3), the consumer relay, the owner acts, the close-honesty checklist, and the disposition. Its carry-forward section lists no row: every family is placed in BL (PLAN §1), an owner act not done by the tag day is its wave's terminal state with the act named, and a successor tranche starts from a fresh census, not from a carry list.

## 4 · Files it touches

`CHANGELOG.md`, `MIGRATION.md`, `package.json`, `package-lock.json`; new `scripts/tranche/close-check.mjs`, `scripts/tranche/cite-check.mjs` (appendix A promoted) and `scripts/tranche/artefact-origin.mjs` (appendix B); `docs/tranches/BL/FINAL.md`; the close receipt in the evidence path.

## 5 · Acceptance gates

Each gate's exit code is read on its own.

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L8-1 · version | `test "$(node -p "require('./package.json').version")" = 11.0.0` | exit 0 | **exit 1** (`10.1.0`) |
| G-L8-2 · records | `grep -q '^## 11.0.0' CHANGELOG.md && grep -q '^## 11.0.0' MIGRATION.md && ! sed -n '/^## 11.0.0/,/^## 10\./p' CHANGELOG.md MIGRATION.md \| grep -qE '\bW-[0-9A-L]\.[0-9]\|\[20[0-9]{2}-[0-9]{2}-[0-9]{2}'` | exit 0 | **exit 1** (no section) |
| G-L8-3 · the registry tarball is the tag's build, with provenance | `node scripts/tranche/artefact-origin.mjs @mkbabb/glass-ui 11.0.0 v11.0.0` (appendix B): the SLSA provenance names the tag's commit and `release.yml` at the tag, and its subject sha512 is the tarball the registry serves | exit 0 | **exit 1** (fix-8, appendix B run from scratch at `e64da115`: `FAIL no tag v11.0.0`; there is no 11.0.0 on the registry either). It passes on `10.1.0 v10.1.0` and `10.0.1 v10.0.1` (3 PASS each) and bites on `10.1.0 v10.0.1` (source commit `d8bda2a9…` against `3f9ea884…`, workflow ref `v10.1.0` against `v10.0.1`: exit 1). It replaces the predicate-type read, which passed on any provenance whatever tree it named |
| ~~G-L8-4~~ | struck (fix-8, FG-03) | | It restated A5-G1 (`npm run build && node scripts/payload.mjs --enforce`) behind `git diff --quiet HEAD`, so it entered this wave green on any clean commit after W-A.5, and its recorded RED was W-A.5's absent script. The payload reading is step 4's record; A5-G1 and the release run (G-L8-5) gate it; G-L8-3 holds the shipped bytes to the tag's tree |
| G-L8-5 · the release run | `gh run list --workflow release.yml --json headBranch,conclusion --jq '.[] \| select(.headBranch=="v11.0.0") \| .conclusion'` prints `success` | `success` | **fails**: latest runs are `v10.1.0`, `v10.0.1`, `v10.0.0` |
| G-L8-6 · the close checklist | `node scripts/tranche/close-check.mjs docs/tranches/BL --tag v11.0.0` | exit 0 | **fails**: the script does not exist; its items fail today (G-L8-7 to G-L8-10) |
| G-L8-7 · the ledger | `node scripts/tranche/verify-ledger.mjs docs/tranches/BL --close` | exit 0 | **fails** on this wave's own act: `--close` exits 1 while any owner-docket row reads `pending` (W-B.1 §3 item 2), and this wave is the one that records each still-open owner act as its wave's terminal (§3.1, step 6). At `e64da115`, 11 docket rows read `pending` (`grep -cE '^\| OW-[0-9a-z]+ \|.*\| pending \|' docs/tranches/BL/LEDGER.md`, fix-8); OW-1 and OW-3 have no act at HEAD. The checker itself is W-B.1's and exists at this wave's base, so its absence is not the reading (fix-8, FG-03) |
| G-L8-8 · P-6 | W-L.6's census on the release pack, exit 0, sha256 in FINAL.md | both | **exit 1**: 227 names with no reader |
| G-L8-9 · cites resolve | `node scripts/tranche/cite-check.mjs docs/tranches/BL/FINAL.md v11.0.0`, and over `waves/*.md` | exit 0 | **fails**: FINAL.md absent. The checker bites today on BL's own census at HEAD (2 unqualified sibling cites) and passes BK's FINAL at its HEAD (8/8), so it can do both |
| G-L8-10 · the hooks path | `d=$(git config --get core.hooksPath); test -z "$d" -o -d "$d"` | exit 0 | **exit 1**: points at the deleted `.githooks` |
| G-L8-14 · no loop tooling is tracked at the close | `test "$(git ls-files docs/tranches/BL/design scripts/loops \| grep -cE '\.(mjs\|js\|ts\|cjs\|sh\|py)$')" -eq 0` | exit 0 | **exit 1**: 414 at `be1969ea` (fix-3: `design/structure` 329, `design/dock` 33, `design/tile` 29, `design/material` 23; `scripts/loops` absent). W-C.1 moves them to `scripts/loops/`, each loop's last wave deletes its dir; the gate reads both roots, so a move alone does not pass it. Replaces W-C.1's struck C1-G7 |
| G-L8-12 · the owner's words | the wave record quotes the confirmation with its time, earlier than `git log -1 --format=%cI v11.0.0` | present and earlier | **absent** |
| G-L8-13 · nothing carries | FINAL.md's carry-forward section has no row whose terminal is not one of LEDGER §0's four (BUILD, FOLD, BANKED with its re-trigger, RETIRE with its class), or an owner act named at its wave | holds | **absent** |

## 6 · π and DELTA obligations

This wave makes no visual claim of its own. It carries the tranche's to the artefact:

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| every band's glance set (each wave's before and after pair) | as each wave states | Chromium; Playwright WebKit labelled; real Safari UNMEASURED unless W-A.6's step 0 passed | re-captured on the release commit through each wave's promoted spec in W-A.3's wired suite | every wired spec green on the release commit, with its report file cited in FINAL.md |
| the same set built from the registry tarball | light | Chromium | a scratch install of `@mkbabb/glass-ui@11.0.0` driving the same specs | equal to the release-commit captures, or each difference named |

## 7 · MIGRATION rows

This wave writes the `## 11.0.0` section heading and its introduction; the rows are the source waves' (W-L.1 §7, W-L.4 §7, W-L.5 §7, W-L.6 §7 and every band's). G-L7-3 closes them.

## 8 · Ledger rows

Closes F-12 (all twenty members), P-4 (the close checklist has an executable), P-6 (its close item, with W-L.6's artefact), L06-11's record half, R2-06-13 (no inherited word, §3.1), census #66's `FINAL.md` gate for BL, and #15, #70 and Q063 (RETIRE, §3.3; their rows are LEDGER:414-416). G-L8-11 is struck: it read the three rows, which exist; G-L8-7's whole-file run covers them. OW-1 and OW-3 are recorded at their tag-day state as the terminals of W-B.13 and W-A.6.

## Appendix A · `cite-check.mjs` as run here

```js
// every `path:line` or `path:a-b` in a record resolves at <commit>: the file exists and has ≥ that many lines
const RE = /`?((?:src|tests|tests-visual|scripts|demo|docs|\.github)\/[\w./@-]+\.(?:ts|vue|css|mjs|js|md|json|yml|wgsl)|package\.json|MIGRATION\.md|CHANGELOG\.md|README\.md|release\.yml):(\d+)(?:-(\d+))?/g;
// length via `git show <commit>:<path>`; absent → unresolved; line > length → unresolved
```

Output: `BK/FINAL.md d856e136` → `cites 8, unresolved 0`, exit 0. `census-register-a.md HEAD` → `cites 47, unresolved 0`. `census-register-b.md HEAD` → `src/components/equation/ConvergencePlot.vue:136 … absent at HEAD`, `cites 45, unresolved 1`, exit 1. `census-carries-recap.md HEAD` → `demo/scenes/amiga/utils.ts:2 … absent at HEAD`, `cites 44, unresolved 1`, exit 1. The wave adds the repo-qualified sibling form and the bare-filename failure (§3.4).

## Appendix B · `artefact-origin.mjs` (G-L8-3; run by fix-8 from its scratchpad at `e64da115`)

```js
// artefact-origin.mjs <package> <version> <tag> — the registry tarball is the tag's tree, built by the release workflow:
// its SLSA provenance names the tag's commit and release.yml, and its subject digest is the tarball the registry serves.
import { execFileSync } from "node:child_process";
const [pkg, ver, tag] = process.argv.slice(2);
const sh = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const fail = (m) => { console.log(`FAIL ${m}`); process.exit(1); };
let commit, meta;
try { commit = sh("git", ["rev-parse", `${tag}^{commit}`]); } catch { fail(`no tag ${tag}`); }
try { meta = JSON.parse(sh("npm", ["view", `${pkg}@${ver}`, "dist", "--json"])); } catch { fail(`${pkg}@${ver} not on the registry`); }
if (!meta.attestations?.url) fail(`${pkg}@${ver} has no attestations`);
const res = await fetch(meta.attestations.url); if (!res.ok) fail(`attestations ${res.status}`);
const slsa = (await res.json()).attestations.find((a) => a.predicateType === "https://slsa.dev/provenance/v1");
if (!slsa) fail("no SLSA provenance");
const st = JSON.parse(Buffer.from(slsa.bundle.dsseEnvelope.payload, "base64"));
const src = st.predicate.buildDefinition.resolvedDependencies.find((d) => d.digest?.gitCommit)?.digest.gitCommit;
const wf = st.predicate.buildDefinition.externalParameters.workflow;
const sha512 = Buffer.from(meta.integrity.replace(/^sha512-/, ""), "base64").toString("hex");
const subj = st.subject.find((s) => s.digest?.sha512)?.digest.sha512;
const rows = [["source commit", src, commit], ["workflow", `${wf.path}@${wf.ref}`, `.github/workflows/release.yml@refs/tags/${tag}`], ["subject sha512", subj, sha512]];
for (const [k, got, want] of rows) console.log(`${got === want ? "PASS" : "FAIL"} ${k} :: ${got} ${got === want ? "==" : "!="} ${want}`);
process.exit(rows.every(([, g, w]) => g === w) ? 0 : 1);
```

Readings (`node artefact-origin.mjs @mkbabb/glass-ui <version> <tag>` in a worktree at `e64da115`):

| version, tag | exit | rows |
|---|---|---|
| `11.0.0`, `v11.0.0` | 1 | `FAIL no tag v11.0.0` |
| `10.1.0`, `v10.1.0` | 0 | source commit `d8bda2a99e06…` = `git rev-parse v10.1.0^{commit}`; workflow `.github/workflows/release.yml@refs/tags/v10.1.0`; subject sha512 `d027721107…` = `dist.integrity` |
| `10.1.0`, `v10.0.1` | 1 | source commit and workflow ref FAIL; subject sha512 PASS |
| `10.0.1`, `v10.0.1` | 0 | 3 PASS (source commit `3f9ea884dccf…`) |

