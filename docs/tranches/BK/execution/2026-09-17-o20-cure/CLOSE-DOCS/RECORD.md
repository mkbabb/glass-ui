# Lane CLOSE-DOCS—the pencil-boil sweep, the glass-fill precision, the ledger ratifications, the 9.0.0 changelog

**Seat** implement · **model** `claude-opus-5`—asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_b83419d1-a4d/agent-aeb6c1bb0188fd737.jsonl`,
the `"model"` field. The file was found by grepping the workflows tree for `CLOSE-DOCS`,
which returned two agent files in one dir; the sibling's `.meta.json` reads
`"description":"CLOSE-TESTS:implement"` and this one's reads `"description":"CLOSE-DOCS:implement"`,
which is the disambiguator. The parent session file is the wrong datum and was not used.

The id assertion GATES the chain with `&&` on one line, never a newline:

```
MID=$(grep -o '"model":"claude-opus-5[^"]*"' <transcript> | sort -u | head -1 | sed 's/"model":"//;s/"$//') && echo "MODEL_ID=$MID" && case "$MID" in claude-opus-5*) echo "GATE PASS";; *) echo "GATE FAIL"; exit 1;; esac && cd /Users/mkbabb/Programming/glass-ui && node scripts/gate-register.mjs
```

```
MODEL_ID=claude-opus-5
GATE PASS
```

Read-only measurement after that point (git, npm pack, vitest, vue-tsc, prettier) ran
ungated once the id was established—stated, not implied.

**date** 2026-09-17 · **base** `master` @ `dd8a5fe5` · **spec of record** the CLOSE-DOCS
work order (items 1-4), `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`,
and `execution/2026-09-17-o20-cure/R/RECORD.md` §9 (read whole for the refusal).

## Step-0 baseline

```
$ git rev-parse HEAD
dd8a5fe5e0b981fd4b2fe9e582c36d65495c28ba

$ git status --porcelain
(empty)
```

The tree was CLEAN at my first byte. `dist/` is present and gitignored; it was built by
an earlier lane (Lane R, 18:05) and I neither built nor touched it—no build lock was
taken, because this lane writes no code.

## Gate receipt—quoted, unmoved

Run at step 0 and again after the last byte; byte-identical:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 rosterSha256:282d05cf violations:0`. Nothing minted; this lane
touches no gate, no seat and no binding.

## Act ledger

### 1 · MIGRATION.md—every `pencil-boil` / `perfect-freehand` hit re-anchored and classified

`R` had placed its bracket at the former `:864`; on `dd8a5fe5` that line is `:1109` (R's
own §9.0.0 tables pushed everything ~245 lines down). The full census on HEAD:

```
$ grep -n "pencil-boil\|perfect-freehand" MIGRATION.md
1018:`@mkbabb/pencil-boil@^0.9.2`; its Keyframes range is finalized from the immutable
1021:`perfect-freehand` is no longer a peer because its stroke core is vendored in
1109:- ~~Install `@mkbabb/pencil-boil@^0.9.2` when using HandMark. Glass development and the
1114:  `@mkbabb/pencil-boil` is no longer a peer of any kind — it was retired at BK #51 and
2383:   `<HandMark shape="underline" animation="draw-on">`; the natural pencil-boil
2388:   `@mkbabb/pencil-boil ^0.4.1` (the L1 wobble geometry — imported only when a wobble
2389:   paints) and `perfect-freehand ^1.2.3` (the variable-width hull body — VENDORED into
```

Five live hits plus R's own two bracket lines. Section owners, measured with
`grep -n "^## " MIGRATION.md`: `:1018` and `:1021` fall under **`## 7.0.0 (2026-07-17)`**
(`:841`), not under 6.0.0—the work order's ":773 … in the 6.0.0 peer-range paragraph"
was written against `c645c393` line numbers and names the wrong section; the paragraph is
7.0.0's. `:1109` is under **`## 6.0.0`** (`:1052`) and is R's, already bracketed, left
untouched. `:2383` and `:2388-2389` are under **`## 4.0.0`** (`:2251`), the BA
`W-HANDMARK` row.

Classification and act, one per hit:

| hit                                                                 | kind                                                                                                | act                                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `:1018` 7.0.0 peer-range paragraph                                  | HISTORICAL and TRUE at its release, but reads as an install instruction to anyone standing at 9.0.0 | kept, dated bracket appended naming the nine peers 9.0.0 actually declares                                  |
| `:1021` "vendored in HandMark"                                      | HISTORICAL half TRUE (not a peer at 7.0.0), file-naming half DEAD                                   | kept, short dated bracket: the vendored core left at `5a69ed9f`                                             |
| `:1109` R's bracket                                                 | already cured                                                                                       | untouched                                                                                                   |
| `:2383` `brush="boil"` / `animation="draw-on"`                      | INSTRUCTION, false today                                                                            | kept as 4.0.0 record, dated bracket naming the five props HandMark declares at 9.0.0                        |
| `:2388-2389` "New optional peers" + `freehand.ts` + `ribbon:"hull"` | INSTRUCTION, false today, and names a deleted file                                                  | kept as 4.0.0 record, dated bracket: neither is a peer, the file is gone, a 9.0.0 consumer installs nothing |

Verification behind each bracket:

```
$ node -e "…Object.keys(require('./package.json').peerDependencies)"
peerDeps count: 9
@lucide/vue @mkbabb/keyframes.js @mkbabb/value.js @vueuse/core reka-ui tailwindcss tw-animate-css vue vue-component-type-helpers

$ grep -rn "pencil-boil\|perfect-freehand" src/ demo/ > /dev/null 2>&1; echo $?
1                      # 1 = zero matches, in src/ AND demo/

$ git log -1 --format='%h %ad' --date=short 5a69ed9f
5a69ed9f 2026-08-25    # feat(handmark): land BK #51 γ4 … twelve files to three
$ git show --stat --format='' 5a69ed9f | grep -i freehand
 src/components/handmark/freehand.ts                | 379 -------------
```

The peer history was measured at the tags rather than recalled, which is what licenses
"true at its release, false as an instruction":

```
v4.0.0  peers 13, incl. @mkbabb/pencil-boil ^0.4.1 (optional) AND perfect-freehand ^1.2.3 (optional)
v6.0.0  peers 13, incl. @mkbabb/pencil-boil ^0.9.2 (optional) AND perfect-freehand ^1.2.3 (optional)
v7.0.0  peers 11, incl. @mkbabb/pencil-boil ^0.9.2 (optional); perfect-freehand GONE
v8.0.0  peers 10, incl. @mkbabb/pencil-boil ^0.11.2 (optional)
v9.0.0  peers  9; @mkbabb/pencil-boil GONE
```

and `freehand.ts` was present at `v4.0.0` (`src/components/custom/handmark/`), `v6.0.0`,
`v7.0.0` and `v8.0.0` (`src/components/handmark/`), absent at `v9.0.0` and at HEAD
(`git ls-tree -r --name-only <tag> | grep -i freehand`).

The `:2383` bracket makes one claim beyond the work order's scope, and it is measured:
`<HandMark>` at HEAD declares **five** props—`shape` · `color` · `weight` · `seed` ·
`draw` (`src/components/handmark/HandMark.vue:33-41`)—with no `brush`, no `animation`,
no `ribbon` and no `BRUSHES`. `src/components/handmark/` is three files
(`HandMark.vue`, `index.ts`, `stroke.ts`) and the barrel publishes `SHAPES`, `handBand`,
`handLine`, `handRing`, `markDuration`, `minJerk`, `serialize`, `strokeRibbon`. Saying
only "pencil-boil is not a peer" while leaving `brush="boil"` reading as live guidance
would have cured the dependency lie and left the API lie standing.

### 2 · MIGRATION.md—the glass-fill parenthetical, plainly rewritten

The row is the wave's OWN prose, committed today:

```
$ git log --oneline -S "shipped alongside \`glass-fill\` at 7.0.0" -- MIGRATION.md
dd8a5fe5 feat(o20-cure): batch 4 — the MIGRATION manifest, the published-roster ratchet, …
```

so this is a precision correction the re-adjudicator already ordered on prose committed
at `dd8a5fe5`, and it is rewritten plainly rather than struck—no bracket, per the house
law's stated exception. Was:

> `--glass-fill-tinted` is **not** the successor—it shipped alongside `glass-fill` at 7.0.0 (`216e1d54`) as a tint OVERLAY …

now:

> `--glass-fill-tinted` is **not** the successor—it has shipped beside `glass-fill` since 5.0.0 (`216e1d54`), and still beside it in the 7.0.0 package, as a tint OVERLAY …

the re-adjudicator's own wording. Measured:

```
$ git tag --contains 216e1d54 | head -1
v5.0.0
$ git log -1 --format='%h %ad' --date=short 216e1d54
216e1d54 2026-07-03
$ git grep -n "@utility glass-fill" v5.0.0 -- 'src/**' | head -1
v5.0.0:src/styles/glass/ladder.css:65 …  (declaration at v5.0.0:src/styles/glass/surfaces.css:32)
$ git grep -n "@utility glass-fill" v7.0.0 -- 'src/**' | head -1
v7.0.0:src/styles/glass/ladder.css:65 …  (declaration at v7.0.0:src/styles/glass/surfaces.css:32)
```

`--glass-fill-tinted` is likewise present at both tags (`v5.0.0:src/components/badge/index.ts:91`,
`v7.0.0:src/styles/glass/glass-atom.css:52`). Both halves of the new sentence are true
and the old one named the wrong major.

### 3 · LEDGER.md—three dated ratifications

**(a) B-3 (4), the manifest gate's scope.** Bracket appended to the item, recording that
the shipped ratchet pins `@theme` + `@utility` names only and that the
`@layer components` class half was REFUSED WITH GROUNDS by Lane R act 9 and ruled SOUND.
The grounds are quoted from `R/RECORD.md` §9 ("REFUSED WITH GROUNDS—`@layer components`
class names are OUT of the roster"): two of the three 7.0.0→9.0.0 class removals are
A-3-CLASS artefacts (`.accent-tone`, `.glass-drag-lift` still ship as unlayered rules),
and the widened form moves 134 out / 107 in, almost all BEM leaves. The datum cited is
`.published-roster`, **289 = 242 `@theme` + 47 `@utility`**, which is arithmetic
(242+47=289) and is R's own figure at `R/RECORD.md:83` and `:109-110`. The bracket ends by
saying everything else in item (4) landed—this is a narrowing, not the escape hatch.

**(b) the lane table's R row.** The bracket is written INLINE in the row's last cell,
which is this repo's established idiom for a table-row correction
(`MIGRATION.md:1070`, `:1077`, `:1079` all carry `[CORRECTION …]` inside a cell). It
records two things. First, R's fence grew beyond the row: the batch-2 residue sweep—
`src/styles/tokens/color-radius.css:320` (8.07:1 → 7.72:1),
`tests/styles/contrast-computed.test.ts` (the §6 headnote and the new §6d demo-hero
LOCKSTEP arm), `demo/vite.demo-dist.config.ts` + the new root `vite.dark-stamp.ts`, and
`demo/chassis/hero/aurora-hero.ts` (four retuned rungs)—every one of them named in
`R/RECORD.md:76-84` and `:347-403`. Second, "runs LAST" was honoured by LAUNCH ORDER and
the three lanes overlapped in time. Measured from the workflow seat metadata rather than
asserted:

```
wf_abf37dd9-d5f  laneR:implement   19:56:43   (the first R seat)
wf_a3cf7fcb-9c4  laneT1:implement  19:49:01
wf_a3cf7fcb-9c4  laneT2:implement  19:49:03
wf_a3cf7fcb-9c4  laneT1:readjudicate 22:01:04 · laneT2:readjudicate 22:01:40
wf_a0880ff6-f7d  laneR:implement   21:31:55   (the third R seat) … laneR:readjudicate 23:03:17
```

R launched last (19:56 vs 19:49) and ran past T1/T2's close. The overlap is also written
into R's own step-0: it found T1's and T2's files already dirty and recorded that it never
opened them. Nothing T1 or T2 produced fed R's inputs—R's spec of record is the LEDGER,
`D/RECORD.md` and `C2/RECORD.md`'s residue, none of them T1's or T2's output.

**(c) the extra lanes.** One dated line added under `## The cure wave—lanes`, before the
table, naming **RESIDUE-5A** (the T1/T2 re-adjudicator residues, committed `43c72339`) and
**CLOSE-DOCS / CLOSE-TESTS** (the close), and saying why: twelve lanes ran, the nine in
the table are the cure proper. The Tally's `CURE-NOW … (24)` line is untouched, as ordered.

[2026-09-17 · CURE ROUND 1 · two corrections ordered at adjudication and applied below:
the extra lanes are **three**, not two (RESIDUE-5A, CLOSE-DOCS, CLOSE-TESTS—
`ls execution/2026-09-17-o20-cure/` = 12 dirs), so the ledger line now reads *three* and
*twelve* where it read *two* and *eleven*; and (a)'s SOUND claim now cites the seat that
ruled it (`laneR:adjudicate`) instead of resting on `R/RECORD.md`, which records only the
cure round that followed.]

### 4 · CHANGELOG.md—the missing 9.0.0 section, authored

```
$ grep -n "^## " CHANGELOG.md | head -2      # BEFORE
3:## 8.0.0 — 2026-08-09
127:## 7.0.0 (2026-07-17)
```

The head was 8.0.0; 9.0.0 had no section at all. The new `## 9.0.0 — 2026-08-29` is
written in the file's own 8.0.0 form—the one-line `MIGRATION.md` §9.0.0 pointer, then
`### Removed` / `### Added` / `### Changed` paragraphs in that voice, no bullet lists, no
marketing—and opens with the plain dated note the order asked for: the entry was written
at the O-20 cure wave, 2026-09-17, after the publish. Tag and publish facts:

```
$ git log -1 --format='%h %ad' --date=short v9.0.0
d4f7b24f 2026-08-29
```

published 2026-09-17 by `release.yml` run 33273556530 with provenance (MIGRATION.md:8).

**Every figure was measured against the published bytes, not read off MIGRATION.** The
8.0.0 tarball was packed OUTSIDE the repo, and the 9.0.0 scratchpad copy was first proven
to be the registry's:

```
$ cd <scratchpad>/publish-800 && npm pack @mkbabb/glass-ui@8.0.0        # 854 files
$ cd <scratchpad>/publish-900-registry && npm pack @mkbabb/glass-ui@9.0.0  # 837 files
    shasum a4446ab0d0ff20b5049508682ad5e94024f0989c
$ (compare dist file sets)
scratch dist files: 834  registry dist files: 834
only in scratch: 0
only in registry: 0
```

so `<scratchpad>/publish-900/dist` IS the published 9.0.0 dist, file-for-file. The
per-family measurements:

```
PUBLISHED 8.0.0 exports keys: 70
PUBLISHED 9.0.0 exports keys: 68
REMOVED: ./canvas · ./search
ADDED: (none)
peer 8.0.0 (10): @lucide/vue @mkbabb/keyframes.js @mkbabb/pencil-boil @mkbabb/value.js @vueuse/core reka-ui tailwindcss tw-animate-css vue vue-component-type-helpers
peer 9.0.0  (9): @lucide/vue @mkbabb/keyframes.js @mkbabb/value.js @vueuse/core reka-ui tailwindcss tw-animate-css vue vue-component-type-helpers
```

identical to the same diff taken at the tags (`git show v8.0.0:package.json` /
`git show v9.0.0:package.json`: 70 → 68, same two keys out), and matching MIGRATION's
"68 keys". `dist/` file count 851 → 834.

```
# dist/composables/dark/darkModeSyncScript.d.ts
8.0.0:  storageKey?: string;                                  (that field ALONE)
9.0.0:  storageKey?: string; defaultDark?: boolean | "os"; queryOverride?: boolean; normalize?: boolean;

# dist/…/FourierField.vue.d.ts  — props
8.0.0:  config? spectrum? getPalette? color? colorResolver? seed? freeze?
9.0.0:  config? spectrum? getPalette? color? seed? freeze? interactive?
# expose
8.0.0:  backend pause resume wake renderAt setHeadT rendererStatus
9.0.0:  backend pause resume wake setHeadT headT flick rendererStatus
```

so `colorResolver` out, `interactive` in, `renderAt` out, `headT` + `flick` in—the
changelog states all four, because a `ref`-holding consumer breaks on the expose delta
exactly as a prop-binding one breaks on `colorResolver`.

#### REFUSED WITH GROUNDS—`variant` is not a 9.0.0 removal

The work order names "the FourierField `colorResolver`/`variant` prop removals". The
`variant` half is not this cut's, and the tree says so:

```
$ grep -c "variant" <published 8.0.0>/…/FourierField.vue.d.ts   → 0
$ grep -c "variant" <published 9.0.0>/…/FourierField.vue.d.ts   → 0
$ git grep -h "variant" v4.1.0 -- '**/FourierField.vue'
 * The `variant: "hero"|"final"` prop is RETIRED (BC.W-VIZ-FOURIER — the bundles fold into …
$ git log -1 --format='%h %ad' --date=short cb1e09fd
cb1e09fd 2026-06-19
```

`variant` was retired at **4.1.0**, four majors earlier, and is absent from the 8.0.0
published types. Writing it into the 9.0.0 section as a removal would have put a false
break in the changelog. MIGRATION §9.0.0 already has this right ("dead since **4.1.0**"),
so the changelog says the same thing in the same place: a consumer still writing the
attribute is writing an inert one, and that removal is not this cut's.

The remaining families, each derived from MIGRATION §9.0.0 `:16-87` plus the measurement
above: `./canvas` (six names, all already on the root barrel, zero importers across the
fifteen generated sibling roots); `./search` (`SearchBar` + `searchVariants` deleted, the
fuzzy engine engine-internal, `.input-bar` the surviving recipe, landed `76b594c8`, five
consumer edges—four in value.js's demo tree and a fifth in `bbnf-lang`'s playground);
`darkModeSyncScript`'s three options with the byte-identical 300-byte default and its
CSP hash; the peer delta; and the CSS closure, whose `@theme` and `@utility` name sets are
identical between 8.0.0 and 9.0.0 (242 and 47 on both) with the back-filled 8.0.0/7.0.0
rows attributed to the cure wave rather than to the cut.

#### 4a · [2026-09-17 · CURE ROUND 1] the CVA's name, in both files

The changelog's `./search` paragraph and MIGRATION's `SearchBar` row both wrote
"`searchVariants` CVA". The exported function was `searchFieldVariants`; `searchVariants`
was the MODULE and `SearchVariants` its options type:

```
$ sed -n 2p <published 8.0.0>/dist/components/search/index.d.ts
export { searchFieldVariants } from "./searchVariants.js";
$ git show v8.0.0:src/components/search/searchVariants.ts | sed -n '21p;28p'
export interface SearchVariants {
export function searchFieldVariants(options: SearchVariants = {}): string {
```

No `searchVariants` VALUE export exists in the published 8.0.0 types—only the module
specifier. `CHANGELOG.md:25` is this lane's own uncommitted prose, so it was rewritten
plainly. `MIGRATION.md:35` was committed at `49673cb8` (2026-08-29, verified by
`git blame -L 35,35`), so it takes a dated strike-in-place in that file's own spaced-dash
convention. The row's FIRST cell (`SearchBar`) is untouched, so the removal-table /
`.published-roster` arm—which matches on a row's first cell—is unaffected by this edit.
The act-4 sentence at `:298` ("`SearchBar` + `searchVariants` deleted") reads at MODULE
granularity, where it is true, and stays.

## Verify—verbatim

```
$ npx vue-tsc --noEmit -p tsconfig.json
EXIT tsconfig.json: 0

$ npx vue-tsc --noEmit -p tsconfig.test.json
EXIT tsconfig.test.json: 0
```

This lane writes no code and touches no test, so there is no born-RED to prove: the
"born-RED on bytes where a test changes" law is vacuous here and is stated rather than
skipped. What I did run is the two live consumers of the bytes I DID change.

**The published-roster ratchet read my MIGRATION.md and passed.**

```
$ node scripts/verify-export-types.mjs
Error: G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2551967 > 2549378
    at ratchetEvidence (…/scripts/verify-export-types.mjs:954:52)
    at verifyExportTypes (…/scripts/verify-export-types.mjs:1034:23)
```

The throw is at `:1034`. The roster arm runs at `:1015` and its failures are raised at
`:1017` (`Invalid package artifact`), which did NOT fire—so
`rosterRatchetFailures(repositoryRoot, publishedRoster(…))` returned zero failures with my
edited `MIGRATION.md` on disk. Independently: the arm's only MIGRATION input is the set of
first-cell backticked table tokens (`^\|\s*`NAME`\s*\|`, multiline), and that set is
unchanged by this lane—

```
first-cell backticked tokens — baseline dd8a5fe5: 312   after my edits: 312
lost: (none)   gained: (none)   IDENTICAL: true
```

**The `G-BUNDLE-RATCHET` RED is FOREIGN and pre-existing.** It compares the unpacked
content bytes of a fresh pack against `.bundle-ratchet`. The packed artifact is
`dist/` + `README.md` + `LICENSE` + `package.json` (verified on the published tarball:
its root holds exactly those), and **`MIGRATION.md` and `CHANGELOG.md` do not ship**, so
three edited `.md` files outside the tarball cannot move the figure. None of the four
packed inputs appears in this lane's diff. The +2589 bytes are the cure wave's own source
growth, already in the shared `dist/` that Lane R built at 18:05, and they were there at
my step-0.

```
$ npx vitest run tests/components/status-dot.contract.test.ts
 Test Files  1 passed (1)
      Tests  7 passed (7)
```

(the one test that reads the real `MIGRATION.md` and asserts a property of its prose).

```
$ npx prettier --check MIGRATION.md CHANGELOG.md docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
Checking formatting...
[warn] MIGRATION.md
[warn] CHANGELOG.md
[warn] docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
[warn] Code style issues found in 3 files. Run Prettier with --write to fix.
EXIT prettier: 1
```

**Stated, not fixed, and the reason is measured.** All three fail at the committed
baseline too—`git show dd8a5fe5:<file>` into the scratchpad and `--check` there warns on
all three—and the repo carries no prettier config, so `--check` measures defaults these
long-form documents have never satisfied. My bytes add no new complaint:

```
                prettier-would-change lines — baseline dd8a5fe5 → after my edits
MIGRATION.md    1514 → 1514
CHANGELOG.md    2721 → 2721
LEDGER.md         61 →   61
```

(`prettier --write` on a copy of each, diffed against its unformatted twin.) Reformatting
them would rewrite thousands of committed lines outside this cure's intent, in two files
another lane's history runs through; not done.

The one file that IS wholly mine—this RECORD—was fixed rather than excused, because a new
file has no committed history to disturb:

```
$ npx prettier --write docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/RECORD.md
$ npx prettier --check docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/RECORD.md
Checking formatting...
All matched files use Prettier code style!
EXIT: 0
```

(one table's pipe alignment, 14 lines; no prose moved). The sibling lane records
(`R/RECORD.md`, `T1/RECORD.md`) are RED under the same default and were not touched.

## Fence statement

I created or modified exactly four files, all inside my fence:

- `MIGRATION.md`
- `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`
- `CHANGELOG.md`
- `docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/RECORD.md` (new, this file)

```
$ git status --porcelain
 M CHANGELOG.md
 M MIGRATION.md
 M docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
 M tests/demo/router-field-ownership.test.ts
 M tests/design/drive-tokens.test.ts
 M tests/public-surface.spec.ts
```

The three `tests/` paths are the CONCURRENT CLOSE-TESTS lane's and were never opened by
me. No `git add`, `commit`, `stash`, `checkout` or `reset` was run. No sibling repo was
written—`docs/precepts` is a submodule and was not touched. No build was run and no build
lock was taken; `dist/` is as I found it. No gate threshold was loosened, no gate minted,
no seat rebound. Scratch work (the two npm packs, the prettier baselines) lives under
`<scratchpad>/publish-800`, `publish-900-registry`, `pretty-base`, `pretty-now`,
`pretty-fmt-base`, `pretty-fmt-now`—never inside the repo.

Em-dash convention, measured per file and matched rather than assumed:

```
MIGRATION.md                spaced 627 : tight 64   → spaced (matched)
CHANGELOG.md                spaced 547 : tight 287  → spaced (the 8.0.0 neighbour is spaced; matched)
LEDGER.md                   spaced   0 : tight 130  → tight (matched)
this RECORD.md              NEW                      → tight
```

## Residue

1. **`.bundle-ratchet` is RED against the cure wave's own `dist/`** (2551967 > 2549378,
   +2589 bytes). Foreign to this lane and to CLOSE-TESTS; it is a release-path item—
   `release.yml` runs `verify:package` before `npm test`, so this throws before the
   battery. The datum needs a deliberate rebind at the next publish, and until then any
   seat running `verify:package` end-to-end will see this throw and should not read it as
   its own.
2. **The `FourierField` expose delta has no MIGRATION row.** `renderAt(timeSec)` left at
   9.0.0 and `headT` / `flick(turnsPerSec)` arrived; MIGRATION §9.0.0 documents only the
   `colorResolver` prop. The new CHANGELOG paragraph states the expose delta because I
   measured it in the published `.d.ts`, but a consumer holding a template ref reads
   MIGRATION, not the changelog. A one-row MIGRATION addendum is owed; `MIGRATION.md` is
   inside this lane's fence, but the row is outside its work order.
3. **The work order's line anchors were stale by ~245 lines and one section name was
   wrong** (":773 … in the 6.0.0 peer-range paragraph" is 7.0.0's paragraph at `:1018`).
   Re-anchored by grep, as ordered. Noted so the next close does not re-derive it.
4. **No `## 9.0.0` heading existed in CHANGELOG.md until this lane.** Worth a standing
   close-battery arm: a tag whose version has no changelog section is a silent omission
   that survived a publish. Not minted here—gates are exactly 60.

## FOR THE DRIVER

- Commit pathspec for this lane, and nothing else:
    ```
    MIGRATION.md CHANGELOG.md docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/RECORD.md
    ```
    The three `tests/` paths in the porcelain are CLOSE-TESTS's.
- `docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/` is a **new directory**; the
  RECORD is untracked until you add it.
- Gate receipt unmoved: `seats:60 … drift:0 rosterSha256:282d05cf violations:0`.
- Both `vue-tsc` arms exit 0. Prettier is RED on all three edited files and was RED on all
  three at `dd8a5fe5`; the line counts prove this lane added nothing to it. Do not let a
  later seat "fix" it by reformatting MIGRATION.md or CHANGELOG.md.
- One refusal with grounds is on the record: the FourierField **`variant`** prop is not a
  9.0.0 removal (absent from the 8.0.0 published types; retired at 4.1.0, `cb1e09fd`), so
  the changelog names it as long-dead rather than as this cut's break.
- Two items for whoever cuts the next release, neither actionable inside this fence: the
  `.bundle-ratchet` rebind (residue 1) and the FourierField expose row in MIGRATION
  (residue 2).

## CURE ROUND 1—2026-09-17

**Seat** cure · **model** `claude-opus-5`—asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_b83419d1-a4d/agent-ac4b9b55ab63bee9f.jsonl`,
the `"model"` field. Found by grepping the workflows tree for a phrase unique to THIS
prompt ("the driver added three lanes beyond the nine below"), which returned two agent
files in one dir; the sibling is the Fable adjudicator
(`agent-ac0cb81797d7ad0b0.jsonl`, `"model":"claude-fable-5-1"`,
`"description":"CLOSE-DOCS:adjudicate"`) and mine reads
`"description":"CLOSE-DOCS:cure"`. `CLAUDE_MODEL_ID` is unset and the parent session file
was not used. The assertion GATES the chain with `&&` on one line:

```
MID=$(grep -o '"model":"claude-opus-5[^"]*"' <transcript> | sort -u | head -1 | sed 's/"model":"//;s/"$//') && echo "MODEL_ID=$MID" && case "$MID" in claude-opus-5*) echo "GATE PASS";; *) echo "GATE FAIL"; exit 1;; esac && cd /Users/mkbabb/Programming/glass-ui && node scripts/gate-register.mjs && git rev-parse HEAD && git status --porcelain
```

```
MODEL_ID=claude-opus-5
GATE PASS
```

**base** `master` @ `dd8a5fe5`, unmoved. Seven adjudicated cures, applied and nothing else.

### Baseline, cure round

```
$ git rev-parse HEAD
dd8a5fe5e0b981fd4b2fe9e582c36d65495c28ba

$ git status --porcelain
 M CHANGELOG.md
 M MIGRATION.md
 M docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
 M tests/demo/router-field-ownership.test.ts
 M tests/design/drive-tokens.test.ts
 M tests/public-surface.spec.ts
?? docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/
?? docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/
```

The three dirty files in my fence are this lane's own implement round; the three `tests/`
paths and `CLOSE-TESTS/` are the concurrent lane's and were never opened.

### The seven cures

**1 · `LEDGER.md:807`—"two lanes" → "three lanes".** RESIDUE-5A, CLOSE-DOCS and
CLOSE-TESTS are three. `ls docs/tranches/BK/execution/2026-09-17-o20-cure/` = 12 dirs
(C1 C2 CLOSE-DOCS CLOSE-TESTS D E1 E2 P R RESIDUE-5A T1 T2); nine of them are the table's.

**2 · `LEDGER.md:812`—"Eleven lanes ran;" → "Twelve lanes ran;".** Nine table rows plus
the three above.

**3 · `LEDGER.md:464-466`—the quote made verbatim and the SOUND claim sourced.** The
inner quote now carries R's own spaced dash, "REFUSED WITH GROUNDS — `@layer components`
class names are OUT of the roster", which is `R/RECORD.md:455` byte for byte; the bracket's
own dashes stay tight. "and the refusal was ruled SOUND at that lane's adjudication" is
replaced by the seat that actually ruled it: `laneR:adjudicate`,
`wf_a0880ff6-f7d/agent-a69aaf1849b9aab43.jsonl`, "SOUND: `@layer components` class names
stay OUT of the roster", with the note that `R/RECORD.md` records only the cure round that
followed—`## CURE ROUND 1` at `R/RECORD.md:855`, "Seven adjudicated cures", no class half.

```
$ grep -n "" docs/.../R/RECORD.md | sed -n 455p
455:#### REFUSED WITH GROUNDS — `@layer components` class names are OUT of the roster
$ grep -c "SOUND: \`@layer components\` class names stay OUT of the roster" \
    ~/.claude/…/wf_a0880ff6-f7d/agent-a69aaf1849b9aab43.jsonl
2
$ grep -n "^## CURE ROUND\|Seven adjudicated cures" docs/.../R/RECORD.md
855:## CURE ROUND 1 — 2026-09-17
864:Seven adjudicated cures, applied and nothing else. The three points of attention were
```

**4 · `CHANGELOG.md:25`—the CVA's real name.** "deleted with its `searchVariants` CVA" →
"deleted with its `searchFieldVariants` CVA (the `searchVariants` module; `SearchVariants`
was its options type)". This lane's own uncommitted prose, so a plain rewrite, no bracket.
Grounds measured in the published bytes—see act 4a above for the two commands.

**5 · `MIGRATION.md:35`—the same error, struck in place.** Committed at `49673cb8`
(2026-08-29), not today, so it takes a dated strike with that file's spaced-dash
convention, exactly as ordered. Recorded as act-4 sub-item **4a**. The row's first cell
(`` `SearchBar` ``) is untouched, so the removal-table predicate that matches on first
cells—and with it the `.published-roster` arm—is unaffected.

```
$ git blame -L 35,35 --date=short -- MIGRATION.md | cut -c1-40
49673cb8a (Mike Babb 2026-08-29 35)
```

**6 · `RECORD.md:205`—"eleven lanes ran" → "twelve lanes ran"**, plus one dated line under
act 3(c) recording that the count (two→three, eleven→twelve) and the SOUND citation were
corrected at adjudication.

**7 · `RECORD.md:446-447`—the residue-2 fence sentence made true.** "it is outside this
lane's four-file fence and outside its work order" → "`MIGRATION.md` is inside this lane's
fence, but the row is outside its work order". MIGRATION.md is fence file #1; only the
FourierField expose ROW is out of scope, and the distinction matters to whoever picks the
residue up.

### Verify—cure round, verbatim, real exit codes

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
```

`seats:60 … drift:0 rosterSha256:282d05cf violations:0`—byte-identical to step 0 and to
the implement round. Nothing minted; no gate, seat or binding touched.

```
$ npx vue-tsc --noEmit -p tsconfig.json
EXIT tsconfig.json: 0

$ npx vue-tsc --noEmit -p tsconfig.test.json
EXIT tsconfig.test.json: 0
```

No test file is in this fence, so no test was touched and none needed re-running; the
`tests/` REDs and GREENs in the porcelain belong to CLOSE-TESTS.

```
$ npx prettier --check docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/RECORD.md
Checking formatting...
All matched files use Prettier code style!
EXIT RECORD: 0

$ npx prettier --check MIGRATION.md CHANGELOG.md docs/…/LEDGER.md
[warn] MIGRATION.md
[warn] CHANGELOG.md
[warn] docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
EXIT three: 1
```

The RECORD is still clean, as ordered. The three committed files are RED under prettier's
defaults (the repo carries no prettier config) and were RED at `dd8a5fe5` before any byte
of this round—measured, not asserted, by checking HEAD's own copies outside the repo:

```
$ git show dd8a5fe5:MIGRATION.md > <scratchpad>/MIGRATION.md   (same for CHANGELOG, LEDGER)
$ npx prettier --check <scratchpad>/{MIGRATION,CHANGELOG,LEDGER}.md
[warn] MIGRATION.md · [warn] CHANGELOG.md · [warn] LEDGER.md
EXIT at-HEAD: 1
```

```
$ git rev-parse HEAD
dd8a5fe5e0b981fd4b2fe9e582c36d65495c28ba
```

### Fence, cure round

The same four files, no fifth: `MIGRATION.md`, `CHANGELOG.md`,
`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`, and this RECORD. No
`git add`, `commit`, `stash`, `checkout` or `reset` was run in this round or the last; no
sibling tree was written; no build lock was needed because this lane writes no code and
took no build. HEAD is `dd8a5fe5`, unmoved.

### Residue, cure round

Both prior residues stand unchanged (the `.bundle-ratchet` datum rebind at the next
publish; the FourierField expose row owed to MIGRATION §9.0.0). One new observation, not
acted on: `CHANGELOG.md:25-26` and `LEDGER.md:466-467` now wrap a little short where the
cure lengthened a sentence mid-paragraph. Prose was not reflowed around them, so the diff
stays the cure and nothing else.

### FOR THE DRIVER—cure round 1 additions

- Same commit pathspec as the implement round; nothing new entered the fence.
- The gate receipt and HEAD are unmoved; the RECORD is prettier-clean, the three committed
  files are prettier-RED exactly as they were at `dd8a5fe5`.
- The MIGRATION strike at `:35` is the only byte this round put into committed prose; it
  is dated, in that file's spaced-dash convention, and leaves the row's first cell alone.
