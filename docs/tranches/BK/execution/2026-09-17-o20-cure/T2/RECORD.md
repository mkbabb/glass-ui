# Lane T2 — HK-vite (build config + canon) · HK-audit · HK-keep-current · B-3 (3)

**Seat** implement · **model** `claude-opus-5[1m]` (asserted from THIS seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a3cf7fcb-9c4/agent-a765aef49c5e066d2.jsonl`,
the `"modelId"` field; found by grepping the workflows tree for `YOUR LANE: T2`, a phrase
unique to this lane's prompt — the parent session file is the wrong datum. The sibling
`agent-a46f7ccbc2cef468f.jsonl` in the same workflow dir is Lane T1's and was not read. The
meta file beside it reads `"description":"laneT2:implement"`.) · **date** 2026-09-17 ·
**base** `master` @ `c645c393` · **spec of record**
`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` §HK-vite-comment,
§HK-audit-path, §HK-keep-current, §B-3, plus the seat JSONs `investigate__housekeeping.json`
+ `verify__housekeeping.json` and `investigate__asks-surface.json` + `verify__asks-surface.json`.

The assertion gates the chain: the id is re-read from the transcript and matched against
`claude-opus-5*` with `&&` — never a newline — at the head of the step-0 baseline command and
of every command that wrote a repo byte or measured the result (the born-RED run, the GREEN
re-run, prettier, `vue-tsc`, the battery, the register). Read-only greps and `ls` ran ungated
after the id was established; stated, not implied.

## Step-0 baseline

`git status --porcelain` at first byte, before anything this lane wrote:

```
(empty)
```

`git diff --stat`:

```
(empty)
```

`git rev-parse --short HEAD` = `c645c393`, `git log --oneline -1` = `c645c393 feat(o20-cure):
batch 2 — the ramp retune, the alert glyph, chip xs, the slider docblock truth, dark-sync
hardening`. The tree was CLEAN at step 0 — batch 2 had landed and Lane T1 had not yet written.
At close the porcelain carries 7 foreign paths (`DESIGN.md`, `README.md`,
`docs/design/affordance-map.md`, `docs/design/tunable-anim.md`, `src/styles/glass/veil.css`,
`src/styles/theme/bridges.css`, `tests/design/`) — every one in Lane T1's fence, none opened,
none edited.

Register receipt read at baseline, before the change:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Census

Figures are `git diff --numstat` against `c645c393` AFTER cure round 1; the four rows the cure
re-touched carry their round-1 note.

| file | + | - | note |
| --- | --- | --- | --- |
| `vite.library.ts` | 5 | 5 | the dead `perfect-freehand` clause; the dead `@mkbabb/pencil-boil` external and its two-line comment; **cure 1**: the closing clause replaced with the measured peer/array relation (2/5 → 5/5) |
| `docs/canon/dependencies.md` | 13 | 10 | peer table trued to the manifest; the HandMark-geometry note rewritten |
| `docs/canon/deps-currency.md` | 3 | 5 | same table, same truing |
| `docs/audits/overfitting-audit.md` | 15 | 10 | the phantom-gate premise ×2, the muster path ×2, four omitted consumers, the dead fan-out scopes, the keep-current clause; **cure 1**: two sentences rewritten inside lines this lane had already changed, so the numstat is unmoved |
| `docs/instructions/README.md` | 14 | 12 | the proof bullet and the no-overfitting bullet, both rewritten to what exists; **cure 1**: the `(#65)` gloss and the aphorism at the bullet's end (13/12 → 14/12) |
| `docs/archive/README.md` | 7 | 3 | one dated strike-in-place |
| `src/styles/tokens/scale-paper.css` | 12 | 6 | the `.paper-texture` comment → the tokens + the compose-your-own recipe |
| `tests/docs/consumer-paths-exist.test.ts` | new (76 lines) | — | the born-RED path-existence arm; **cure 1**: the visible-skip path (68 → 76 lines) |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/T2/RECORD.md` | new | — | this record |

Nothing published moves. `package.json` `files: ["dist"]`; `vite.library.ts`, `docs/**` and
`tests/**` never enter the tarball, and `src/styles/tokens/scale-paper.css` changes only a
CSS comment — no declaration, no token value, no selector. No export, class, token or subpath
is added, removed or renamed. `package.json` was READ and not edited.

**Form used where** (house law, stated per file): REWRITTEN plainly —
`docs/audits/overfitting-audit.md`, `docs/canon/dependencies.md`, `docs/canon/deps-currency.md`,
`docs/instructions/README.md` (all living references), `vite.library.ts` and
`src/styles/tokens/scale-paper.css` (code comments). DATED STRIKE-IN-PLACE —
`docs/archive/README.md:32` alone, on the ledger's own clause that an archive may take one; it
is a frozen provenance index, so the struck sentence stays visible under
`[2026-09-17 · O-20 HK-audit — …]`.

## Act ledger

### HK-vite (1) — `vite.library.ts:24-25`, the `perfect-freehand` clause

Both halves false, re-measured at this seat rather than inherited:

```
$ git cat-file -e v9.0.0:src/components/handmark/freehand.ts
fatal: path 'src/components/handmark/freehand.ts' does not exist in 'v9.0.0'
$ grep -rn perfect-freehand src/ demo/ package.json
(no output)
```

There is no vendored file (gone at `5a69ed9f`) and no such dependency to be "intentionally
absent". Deleted, not updated. The paragraph now closes on the invariant that is true and
load-bearing: every JS runtime peer the source imports is externalized here, and every entry
here is a declared peer or a subpath of one. (The closing clause first written here — "the
array and `peerDependencies` say the same thing" — was itself false in both directions and was
replaced in CURE ROUND 1, act 1; the measurement is there.)

### HK-vite (2) — `vite.library.ts:36`, the dead `@mkbabb/pencil-boil` external

The ledger's corrected anchor holds: the entry is at `:36`, not `:30`.

```
$ python3 -c "import json;print(sorted(json.load(open('package.json'))['peerDependencies']))"
['@lucide/vue', '@mkbabb/keyframes.js', '@mkbabb/value.js', '@vueuse/core', 'reka-ui', 'tailwindcss', 'tw-animate-css', 'vue', 'vue-component-type-helpers']
$ grep -rn pencil-boil src/ demo/            → 0
$ grep -rl pencil-boil <publish-900/dist>    → 0
```

Nine peers, pencil-boil not among them — the exact class the comment three lines above brags
about having removed (`lucide-vue-next`, `vaul-vue`). The entry AND its two-line
`BA.W-HANDMARK` comment go together: the comment exists only to explain that entry, and
leaving it would leave a live-sounding sentence about an optional peer that does not exist.

**The ledger's first check, run and answered.** No test asserts `libraryExternal` against
`peerDependencies`:

```
$ grep -rn "libraryExternal\|vite\.library" tests/ scripts/ package.json
scripts/profile-bundle.mjs:655,659,701   (comments + one violation message)
```

`scripts/profile-bundle.mjs` names the E1/E2 invariant in prose and enforces only its
BUILD-side mirror, over a hard-coded `BUNDLED_PEER_MARKERS` list whose single entry is
`@lucide/vue`; it never reads `libraryExternal`. The array's only importers are
`vite.config.ts:83` and `vite.iter.config.ts:28`, which pass it to rollup — dropping a member
removes an externalization rule for a package no source file imports, so no build output can
move. The one test that names pencil-boil is `tests/public-surface.spec.ts:613-616`, which
asserts it is NOT in `peerDependencies`/`peerDependenciesMeta`/`devDependencies`/the lock —
it agrees with this cure and is untouched (it is Lane P's file and was read, not edited).

No gate for a comment or a build-config array (gates-abrogation), and none minted.

### HK-vite (3) — the two canon docs

`docs/canon/dependencies.md:35-36` carried the same falsehood in the doc a reader is likelier
to consult ("`@mkbabb/pencil-boil` remains optional. The perfect-freehand stroke core is
vendored in HandMark and is not a package peer"). Rewritten: HandMark geometry has no peer —
the stroke laws are in-house and closed-form at `src/components/handmark/stroke.ts`, and no
freehand or brush-geometry package is imported, externalized or declared.

Both peer tables are re-derived from the manifest, because a table I re-bank must be true in
every row, not only in the row the ledger named. Measured against `package.json` (identical
to the published 9.0.0 manifest, checked byte-for-byte against
`publish-900/package.json`):

| row | before | measured | action |
| --- | --- | --- | --- |
| `@mkbabb/pencil-boil` ^0.9.2 | listed (optional) | not a peer; 0 src/demo imports; 0 dist files | **removed** — ledger-named |
| `embla-carousel` ^8.0 | listed (optional) | not a peer; `grep -rn embla src/ demo/ package.json` → 0; 0 dist files | **removed** — same class, same table |
| `embla-carousel-vue` ^8.0 | listed (optional) | same; and the ledger rules its README twin dead at README:182 (Lane T1's) | **removed** |
| `vue-component-type-helpers` ^3.0.3 | absent | a declared peer since 8.0.0 (`CHANGELOG.md:31-38`, `MIGRATION.md:150-169`) | **added** |
| `@mkbabb/keyframes.js` | "(optional)" | NOT in `peerDependenciesMeta` — a required peer | **optionality corrected** |
| `@mkbabb/value.js` | "color and easing" | `/color` ×5, `/css` ×3, `/easing` ×1 in `src/` | **`/css` added** |

The doc's own definition of "optional" is `peerDependenciesMeta[…].optional = true`
(`dependencies.md:32`), so the keyframes row was false by the file's own rule. A header line
now says the table mirrors the manifest and that a row the manifest does not carry is a bug
in the file. "The removed Value root is neither imported nor externalized" was re-measured
(the only two bare `@mkbabb/value.js` strings in `src/` are prose, at
`composables/color/useAccentTone.ts:5` and `components/blob/README.md:16`) — TRUE, so it
stays.

### HK-audit (1) — the muster path, `:58` and `:79`

```
$ ls -d ../muster/src/            → No such file or directory
$ ls -d ../muster/frontend/src/   → exists
$ muster/frontend/package.json    → "@mkbabb/glass-ui": "^3.1.0"
```

Both occurrences now read `../muster/frontend/src/`.

### HK-audit (2) — the four omitted consumers, with their REAL roots

The ledger asks for the real source roots, measured rather than assumed — and the measurement
changes two of the four. Where each repo's glass-ui edges actually live, counted as distinct
`.ts` / `.vue` / `.css` files holding `@mkbabb/glass-ui` (node_modules and dist excluded):

| repo | root added | edge files | pin (measured) |
| --- | --- | --- | --- |
| value.js | `../value.js/demo/` | demo 81 · docs 8 · e2e 3 — **`src/` 0** | `^7.0.0` (dependencies) |
| keyframes.js | `../keyframes.js/demo/` | demo 42 · test 3 — **`src/` 0** | `7.0.0` (devDependencies) |
| atlas | `../atlas/src/` | src 51 · tests 2 | `6.0.0` (devDependencies; `^6.0.0` peer) |
| sci-report | `../sci-report/dashboards/` | 19 files across `home/ usf/ ecf/ demand/ vft-germination/ …`; **no `src/` dir exists** | `7.0.0` (dependencies) |

Listing `../value.js/src/` or `../keyframes.js/src/` would have re-minted the very defect this
item cures — a path that resolves to nothing and greps zero. The roster is now twelve entries
long — `src/`, `demo/` and ten sibling stems — and the prompt says in as many words why the
roots differ. Every pin in the new census line was read from the sibling's own `package.json`
at this seat; `words` is `^3.0.0`, not the `3.0.0` the ledger's fact 1 prints, and the file
carries the measured form.

### HK-audit (3) — the phantom-gate sentences, all four places

Measured once, quoted everywhere:

```
$ for t in v7.0.0 v8.0.0 v9.0.0; do git show $t:package.json | python3 -c "…startswith('proof')…"; done
v7.0.0 proof-scripts=0 · v8.0.0 proof-scripts=0 · v9.0.0 proof-scripts=0
$ git log --oneline -1 1c2cda3a
1c2cda3a feat(bi-p000): replace the legacy gate mesh with one fail-closed verifier
$ grep -rn "proof:component-orphan\|proof:consumer-evidence-live" . (node_modules, .git excluded)
→ every hit is under docs/
```

- `docs/audits/overfitting-audit.md:5` — rewritten: this sweep is the only instrument, nothing
  enforces the bar between runs, the namespace collapsed at `1c2cda3a` (#65), zero `proof:*`
  scripts at all three tags. The consequence is stated plainly: dispose of every row in the
  same pass, because nothing holds a found candidate.
- `docs/audits/overfitting-audit.md:88` (the "When to run" bullet) — the "gates run
  continuously, so the close sweep is a re-confirm" clause was the same claim 83 lines later.
  Rewritten: no gate holds the bar between closes, so this sweep is the check.
- `docs/instructions/README.md:27-32` — rewritten to the same measured state.
- `docs/archive/README.md:32` — dated strike-in-place (an archive, per the ledger's clause).

**Refusal-with-grounds, and a fourth rewrite inside the same file.**
`docs/instructions/README.md:17-23` carried the identical falsehood one bullet earlier —
"Proof is the `scripts/gates.mjs` register … every wave authors or extends a `proof:*` gate
(`npm run gates -- --run local|ci|release|full` … `npm run gates -- --list`) … run via
`npm run gates -- --run pi`". Measured: `scripts/gates.mjs` does not exist (the register is
`scripts/gate-register.mjs`), there is no `gates` npm script, and there are zero `proof:*`
scripts. The ledger names `:29-32` only; leaving `:17-23` would re-bank the file a future
agent reads FIRST with four dead commands in its proof paragraph, which is the ledger's own
"a corrected file reads as verified" trap. Rewritten to what exists: the 60-seat register and
its `violations:0` receipt, mint nothing, born-RED ordinary vitest under `tests/`,
`npm run typecheck` / `npm run build` / `npm test`, and the π readback via
`npx playwright test --config tests-visual/playwright.config.ts` (the config is on disk; there
is no npm script for it). Recorded here as an extension of the item, not smuggled.

### HK-audit (4) — the dead fan-out scopes

```
$ ls -d src/components/ui src/components/custom     → No such file or directory (both)
$ git rev-parse v9.0.0:src/components/ui            → fatal: path does not exist in 'v9.0.0'
$ git log --oneline -1 -- src/components/ui
9a8761f0 refactor(structure/ms4): flatten component families into one semantic home
```

Rows 0a and 0b of the "Standard glass-ui invocation" table named two directories that have not
existed since the flatten, in the same two cells whose `{CONSUMER_PATHS}` column this item
rewrites. Merged into one `src/components/` row (55 families, `ls -d src/components/*/` = 56
minus `_shared`), the fan-out is three agents, the deliverable glob is `{0a..0c}`, and the
table says what happened and offers the split-further escape without minting a convention for
it. No new instrument, no new naming scheme.

### HK-keep-current — the one-line clause amendment

`docs/audits/overfitting-audit.md`, the `keep-current` verdict, now reads:

> Current-consumer keeps require a matching `docs/consumer-evidence/<artefact>.md` file and a
> fresh rerun of that file's cited proof grep — or a named gate that asserts against the
> artefact by name, cited file:line; a gate-anchor constant needs no prose doc.

The ledger's words, placed at the end of the sentence so both halves of the original
requirement survive and the gate is the ALTERNATIVE to the pair, not an insertion between
them.

**The grouping correction does not fire, and the reason is on the bytes.** The ledger asks me
to correct the audit's grouping note "if it lists `AURORA_DRIFT_FLOOR` under keep-current".
`grep -rn AURORA_DRIFT_FLOOR docs/audits/overfitting-audit.md docs/instructions/README.md
docs/archive/README.md` → zero hits. The mis-grouping lives in the O-20 letter and in
`docs/tranches/BK/execution/2026-08-29-batch-close/OVERFITTING-AUDIT.md`, whose `:193` row
already grades it `keep` ("0 (4 same-file reads)") — the file is correct where it stands, and
it is outside this fence. Nothing to amend; see Residue 3 for the one sentence in that file
that the verifier falsified.

### B-3 (3) — `src/styles/tokens/scale-paper.css:114`

The comment sold a class the library does not ship:

```
$ grep -rn "\.paper-texture\b" src/ demo/
src/styles/tokens/scale-paper.css:114   (the comment itself — the only hit in src/ and demo/)
$ grep -rc "\.paper-texture" <publish-900/dist/styles/**.css>   → 0 files
$ git show 490cc46e | grep -n "^-    \.paper-texture {"          → present (deleted there)
```

Rewritten to name what ships and how to compose it: `--paper-clean-texture` painted as a
repeating background at `--paper-texture-size`, blend chosen at the call site, with the
in-house recipe cited — `.dock-plate::after` in `components/dock/styles/dock.css`
(`background`, `background-repeat: repeat`, `background-size`, `opacity`, `mix-blend-mode`).
Both tokens verified live: `--paper-clean-texture` is defined here and read at
`dock/styles/dock.css:168`; `--paper-texture-size` is defined at `styles/tokens/offsets.css:106`
and read at `dock/styles/dock.css:170`; both emit in the published
`dist/styles/tokens/{scale-paper,offsets}.css`. The calibration sentence the comment exists for
(the baked SVG `opacity` cannot read a CSS var) is unchanged in substance.

## Born-RED proof

`tests/docs/consumer-paths-exist.test.ts`, written BEFORE any cure byte and run against the
`c645c393` tree:

```
$ npx vitest run tests/docs/consumer-paths-exist.test.ts
 ❯ tests/docs/consumer-paths-exist.test.ts (2 tests | 1 failed) 4ms
     × every listed sibling path exists (absent repos skipped with their reason) 3ms

 FAIL  tests/docs/consumer-paths-exist.test.ts > docs/audits/overfitting-audit.md — {CONSUMER_PATHS} resolve on disk > every listed sibling path exists (absent repos skipped with their reason)
AssertionError: consumer paths that do not resolve (a sweep over these greps zero and reads it as "no consumers"): ../muster/src/: expected [ '../muster/src/' ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "../muster/src/",
+ ]

 ❯ tests/docs/consumer-paths-exist.test.ts:60:11

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
```

RED on exactly the ledger's named hole and nothing else — `../muster/src/` alone, with the
other seven HEAD stems resolving. After the cure:

```
$ npx vitest run tests/docs/consumer-paths-exist.test.ts
 Test Files  1 passed (1)
      Tests  2 passed (2)
LANE_EXIT=0
```

Non-vacuous: the arm walks ten stems after the cure (`../atlas/src/`,
`../bbnf-lang/playground/src/`, `../fourier-analysis/web/src/`, `../keyframes.js/demo/`,
`../muster/frontend/src/`, `../sci-report/dashboards/`, `../slides/src/`, `../speedtest/src/`,
`../value.js/demo/`, `../words/frontend/src/`) and a second `it` asserts the extracted list is
non-empty, so an extraction that silently matched nothing cannot pass.

**Scope, stated because the file says so too.** The arm asserts EXISTENCE of the listed stems,
not that a stem is where a given repo's edges are (that is the sweep's job, and it is why the
four new roots were measured by hand). A sibling that is not cloned on this machine is skipped
with its reason printed, not failed; a sibling that IS present whose listed subdirectory is
absent fails — the muster class. All ten siblings are present here, so nothing skipped in this
run.

An ordinary vitest file: no `G-` id, no seat, no `SEAT-BINDING.json` row.

## Verify — verbatim, real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
tsconfig.json exit=0
```

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
tsconfig.test.json exit=0
```

Lane test:

```
$ npx vitest run tests/docs/consumer-paths-exist.test.ts
 Test Files  1 passed (1)
      Tests  2 passed (2)
LANE_EXIT=0
```

Full battery:

```
$ npx vitest run
 Test Files  3 failed | 229 passed (232)
      Tests  4 failed | 2207 passed | 10 expected fail (2221)
BATTERY_EXIT=1
```

Four REDs, every one attributed, none this lane's:

| RED | owner |
| --- | --- |
| `tests/design/drive-tokens.test.ts` — "has the twelve drive rows the register documents" (7 ≠ 12) | Lane T1 (`tests/design/` is untracked and in T1's fence; its target `docs/design/tunable-anim.md` is dirty in T1's hand) |
| `tests/design/token-bridges.test.ts` ×2 — the two README §Design Tokens arms | Lane T1 (same file, its target `README.md` is T1's alone) |
| `tests/gates/boot-graph.test.ts` — "the dist-demo it measures is NEWER than every source it is built from" | ambient. The message names its newest source: `dist-demo/index.html` built `23:37:07.427Z`, newest source `23:58:39.199Z` = `src/styles/glass/veil.css`, Lane T1's. This lane's `src/styles/tokens/scale-paper.css` (`23:57:02.884Z`) also postdates the build, so the arm would flip on this lane's write alone — it flips on ANY source write without a rebuild. No build ran; `dist/` is shared and the lock was never taken. |

The same three test files are the only REDs, and `tests/docs/consumer-paths-exist.test.ts` is
among the 229 green files. The `10 expected fail` is the standing xfail count, unmoved.

Gate receipt:

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
REGISTER_EXIT=0
```

`seats:60`, `violations:0`, `rosterSha256:282d05cf` — byte-identical to the baseline receipt.
Nothing minted.

Prettier, on every file this lane touched:

```
$ npx prettier --check vite.library.ts docs/canon/dependencies.md docs/canon/deps-currency.md docs/audits/overfitting-audit.md docs/instructions/README.md docs/archive/README.md src/styles/tokens/scale-paper.css tests/docs/consumer-paths-exist.test.ts
[warn] docs/canon/dependencies.md
[warn] docs/canon/deps-currency.md
[warn] docs/audits/overfitting-audit.md
[warn] src/styles/tokens/scale-paper.css
[warn] Code style issues found in 5 files.   ← before the fix below
```

The one file this lane CREATED was formatted and re-checked:

```
$ npx prettier --write tests/docs/consumer-paths-exist.test.ts && npx prettier --check tests/docs/consumer-paths-exist.test.ts
All matched files use Prettier code style!
MY_FILE_PRETTIER_EXIT=0
```

The other four warns are INHERITED, not introduced, and the claim is proved rather than
asserted — each file's HEAD bytes were piped through the repo's own resolution and compared:

```
$ git show HEAD:<f> | npx prettier --stdin-filepath <f> | md5   vs   git show HEAD:<f> | md5
HEAD-DIRTY   docs/canon/dependencies.md
HEAD-DIRTY   docs/canon/deps-currency.md
HEAD-DIRTY   docs/audits/overfitting-audit.md
HEAD-DIRTY   src/styles/tokens/scale-paper.css
NEW-IN-LANE  tests/docs/consumer-paths-exist.test.ts
```

All four were already unformatted before this lane opened them, and the repo has no prettier
config and no prettier devDependency (`package.json` has no `prettier` key; `ls -a | grep -i
prettier` → nothing), so `npx` pulls a transient copy and the default settings govern.
Reformatting them wholesale would reflow 23 / 39 / 34 lines of prose and comment that this
cure never touched, into a commit the driver takes by pathspec. Left as found, deliberately;
if the wave wants the four normalized, that is a separate sweep over the whole tree, not a
side effect of six sentences.

This RECORD also warns, and so do all six already banked —
`npx prettier --check docs/tranches/BK/execution/2026-09-17-o20-cure/*/RECORD.md` warns on
C1, C2, D, E1, E2, P and T2 alike. Prettier pads every census table to a fixed column width;
the wave's records are not prettier-formatted, and this one matches them rather than becoming
the odd one out.

## Fence

Files this lane created or modified, and no others:

- `vite.library.ts`
- `docs/canon/dependencies.md`
- `docs/canon/deps-currency.md`
- `docs/audits/overfitting-audit.md`
- `docs/instructions/README.md`
- `docs/archive/README.md`
- `src/styles/tokens/scale-paper.css` (the `:114` comment only — no declaration moved)
- `tests/docs/consumer-paths-exist.test.ts` (new; `tests/docs/` created by this lane, and Lane
  T1's `tests/design/` is a different directory, untouched)
- `docs/tranches/BK/execution/2026-09-17-o20-cure/T2/RECORD.md`

`MIGRATION.md`, `README.md` and `DESIGN.md` were READ and not edited — T1's and R's. `package.json`
and `tests/public-surface.spec.ts` were read and not edited. No sibling repo was written; the
sibling trees were read only with `ls`, `grep` and `python3 -c` over their `package.json`
files, to measure the roots and pins this cure writes down. No git verb but `status`, `diff`,
`rev-parse`, `log`, `show`, `cat-file` (all reads) ran. No build; the `dist/` build lock was
never taken. No browser opened. Scratch lives in
`…/scratchpad/{laneT2-green.txt,laneT2-battery.txt,laneT2-head/}`, outside the repo.

## FOR LANE R

Every `MIGRATION.md` and `CHANGELOG.md` line number below is measured against committed HEAD
`c645c393` and read with `git show HEAD:MIGRATION.md` — not against the file on disk. Lane R's
edit is in flight: at this seat's re-read the working copy is 4048 lines to HEAD's 3796, so
every anchor here is off by a few hundred lines in the dirty tree. Re-check against HEAD.

1. **`MIGRATION.md:864`** — "Install `@mkbabb/pencil-boil@^0.9.2` when using HandMark" is the
   ledger's named R edit and is still standing. Four more hits in the same file share the
   class and were measured while verifying this lane's: `:773` (the same install instruction
   in the peer-range paragraph), `:2132` ("the natural pencil-boil …") and `:2137-2138`
   (`@mkbabb/pencil-boil ^0.4.1` at `:2137`; "`perfect-freehand ^1.2.3` … VENDORED into" at
   `:2138`), plus `:776` "`perfect-freehand` is no longer a peer because its stroke core is
   vendored in". The vendored file has not existed since `5a69ed9f` and neither package is a
   peer at 9.0.0 (nine peers, listed in the act ledger above). Whether the historical sections
   take a dated bracket rather than a rewrite is R's call; `:864` is an instruction to a
   consumer and should not survive as one.
2. **`CHANGELOG.md:150` and `:288`** say the same thing ("`perfect-freehand` is no longer a
   peer (vendored into …)"; "The optional `@mkbabb/pencil-boil` peer is now `^0.9.2`"). A
   changelog records what was true at a release, so this is plausibly correct-as-history — but
   it is the last live file in the repo still calling pencil-boil a peer, and nobody owns it in
   this wave. Outside every lane's fence; flagged, not touched.

## Residue

1. **`vue-component-type-helpers` is a declared peer with zero readers.** It is now in both
   canon tables because the manifest declares it, and the reason is real and upstream
   (`CHANGELOG.md:31-38`, `MIGRATION.md:150-169`: reka-ui's emitted `.d.ts` imports it and
   declares it nowhere). But `grep -rn vue-component-type-helpers src/` → 0 and no published
   `dist/` file names it, so our own bytes never reach it — the contract is entirely about a
   consumer's `skipLibCheck: false` closure. Worth a ruling at the next peer-set pass: keep it
   as insurance against reka-ui's omission, or drop it when reka-ui declares its own. Not
   touched here — `package.json` is nobody's in this wave and a peer removal is a manifest
   change.
2. **The audit prompt's method still greps token NAMES, not the bridge-minted utility
   spellings.** Both housekeeping seats banked this as the instrument miss that made
   `--icon-2xl` read consumerless while five live speedtest markup sites wrote
   `class="size-icon-2xl"`. The ledger's HK-audit cure does not carry it and this lane did not
   mint it; §2's "Count usage sites" bullets are where it would go (`size-*`, `h-*`, `w-*`
   forms beside `var(--token)`). Owed to whoever runs the next sweep.
3. **`docs/tranches/BK/execution/2026-08-29-batch-close/OVERFITTING-AUDIT.md:299`** says
   `AURORA_DRIFT_FLOOR` "has four production reads inside" — the verifier falsified exactly
   this ("`presets.ts:348-351` are SAME-FILE reads"), and the file's own row at `:193` grades
   it `0 (4 same-file reads)` / `keep`. The row is right and the prose is wrong, in a file
   outside this fence. One sentence, someone's.
4. **The fan-out is three agents now, and nothing measures whether that is the right split.**
   55 component families under one scope is a judgement, not a measurement; the doc says so
   and tells a future runner to split further and declare the split. If a tranche finds the
   scope unworkable, the honest fix is a named split in the table, not a silent one in a
   dispatch.
5. **`tests/docs/` is a new test directory with one file in it.** `vitest.config.ts`'s
   `tests/**/*.{test,spec}.{ts,tsx}` glob already covers it, so nothing was configured. If
   Lane T1's `tests/design/` and this land together, the tree gains two doc-assertion homes;
   whether they merge is a shape question for the wave's close, not this lane's to decide.
6. **`docs/audits/style-audit.md:57`** — a living audit prompt, outside this fence, still lists
   `.paper-texture` among glass-ui's canonical classes. Same class as B-3 (3), and it hands a
   sweep a class the library has not shipped since `490cc46e`; needs its own disposition.
   (`docs/archive/constellation/next/design/bbnf/WC-design-layout.md:28` names it too, but that
   is an archive and reads as history.) `MIGRATION.md` mentions it only as REMOVED — at this
   seat's read of the dirty tree, `:84` and the removed-class section at `:852-875`, none of it
   at HEAD `c645c393` — which is correct as history and is Lane R's.
7. **The house writing law says em dashes without spaces; every file this lane touched writes
   them WITH spaces.** Measured at HEAD across the seven: 0 tight (`word—word`) against 73
   spaced — `vite.library.ts` 6, `dependencies.md` 1, `deps-currency.md` 0,
   `overfitting-audit.md` 24, `instructions/README.md` 1, `archive/README.md` 5,
   `scale-paper.css` 36. The lane matched the file convention, which is the right call inside
   six sentences and the wrong one to settle by fiat: normalizing would reflow prose this cure
   never touched, in files other lanes are holding. Owed a house ruling — convention or law —
   and then one sweep, not seven lanes each guessing.

## CURE ROUND 1 — 2026-09-17

**Seat** cure · **model** `claude-opus-5` (asserted from THIS seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a3cf7fcb-9c4/agent-a9d3d9b9b76ee1a5f.jsonl`,
the `message.model` field; found by grepping the workflows tree for `twelve entries (src/ demo/
+ ten sibling stems)`, a phrase unique to this cure prompt. The sibling
`agent-ac94a43bb396e0d92.jsonl` in the same workflow dir carries that phrase too and is the
ADJUDICATOR's — `claude-fable-5-1` — and was not read for the id.) · **base** `master` @
`c645c393`, unmoved.

The assertion gates the chain: the id is re-read from the transcript and matched against
`claude-opus-5*` with `&&` — never a newline — at the head of the step-0 re-read and of every
command that wrote a repo byte or measured the result. Read-only greps, `ls` and `git show` ran
ungated after the id was established.

### Step-0 for this round

`git rev-parse --short HEAD` = `c645c393`, unchanged. The tree is no longer clean: round 1's own
writes, Lane T1's and Lane R's are in it. `git status --porcelain` at this round's first byte
listed 23 modified paths and 7 untracked ones (`DESIGN.md`, `MIGRATION.md`, `README.md`,
`demo/chassis/hero/aurora-hero.ts`, `demo/vite.demo-dist.config.ts`, `docs/archive/README.md`,
`docs/audits/overfitting-audit.md`, `docs/canon/dependencies.md`, `docs/canon/deps-currency.md`,
`docs/design/affordance-map.md`, `docs/design/tunable-anim.md`, `docs/instructions/README.md`,
`scripts/verify-export-types.mjs`, `src/components/_shared/class-names.ts`,
`src/styles/glass/veil.css`, `src/styles/theme/bridges.css`, `src/styles/tokens/color-radius.css`,
`src/styles/tokens/scale-paper.css`, `tests/composables/dark/darkModeSyncScript.test.ts`,
`tests/public-surface.spec.ts`, `tests/styles/contrast-computed.test.ts`, `vite.config.ts`,
`vite.library.ts`; `?? .published-roster`, `?? docs/tranches/BK/execution/2026-09-17-o20-cure/T1/`,
`?? …/T2/`, `?? tests/components/_shared/classNames.test.ts`, `?? tests/design/`,
`?? tests/docs/`, `?? vite.dark-stamp.ts`), totalling `23 files changed, 743 insertions(+), 113
deletions(-)`. Seven of those paths are this lane's; the rest are other lanes' and were not
opened for writing. The same porcelain re-read at the end of the round is byte-identical.

### Acts

| # | site | what changed |
| --- | --- | --- |
| 1 | `vite.library.ts:24-28` | the closing clause "the array and `peerDependencies` say the same thing" was false in both directions. Replaced with the measured relation: every entry is a declared peer **or a subpath of one**, and the peer set is larger — `tailwindcss` / `tw-animate-css` are CSS-plane peers, `vue-component-type-helpers` is type-only, and the bare `@mkbabb/value.js` root is neither imported nor externalized |
| 2 | `docs/audits/overfitting-audit.md:62` | "add a repo here and add it there in the same edit" was false — the test regex-extracts the stems from this file (test `:30-34`); there is no test-side list. Now: "it reads the list from this file, so a repo added here is checked on the next run with no test edit" |
| 3 | `tests/docs/consumer-paths-exist.test.ts:46-74` | the skip path was invisible: under the default reporter a passing test's `console.info` prints nothing, so a sibling-less checkout read `passed` having checked nothing. The `it` callback now takes `(ctx)`, and when every stem skipped it calls `ctx.skip(…)` — a visible `1 skipped` in the default summary. The expect message names the skipped list too, so a MIXED run states both |
| 4 | `docs/instructions/README.md:31` | `(#65)` → `(#65, the gates-abrogation mandate)`, matching the audit's own `:5` gloss |
| 5 | `docs/instructions/README.md:33` | the aphorism "a row it finds is nobody's until someone disposes of it" → "Dispose of every row in the same pass — nothing holds a found row between runs." The preceding `;` became `.`, because the replacement is a sentence |
| 6 | `docs/audits/overfitting-audit.md:5` | the same confused clause → "So nothing holds a found row between runs: run the prompt, then dispose of every row in the same pass." |
| 7 | RECORD §Census | the four re-touched rows carry their post-cure numstat and a **cure 1** note |
| 8 | RECORD §HK-audit (2) | the method restated as distinct `.ts` / `.vue` / `.css` files |
| 9 | RECORD §HK-audit (2) | "eleven entries" → "twelve entries — `src/`, `demo/` and ten sibling stems" |
| 10 | RECORD §B-3 (3) | "the only hit in the repo" → "the only hit in `src/` and `demo/`", which is what the grep above it measured |
| 11 | RECORD §FOR LANE R | a HEAD-relative preamble, and `:2137` → `:2137-2138` (two lines, two packages) |
| 12 | RECORD §Residue | item 6 — `docs/audits/style-audit.md:57` still lists `.paper-texture` as canonical; item 7 — the em-dash convention, routed for a house ruling |
| 13 | RECORD §HK-vite (1) | its closing sentence described the clause act 1 has now replaced. Trued to the bytes, with the correction named — a RECORD that describes a file it no longer matches is this cure's own defect class |

**Act 1's facts, each re-measured at this seat rather than inherited:**

```
$ grep -rn --include='*.ts' --include='*.vue' "from ['\"]tailwindcss"          src/ demo/ → 0
$ grep -rn --include='*.ts' --include='*.vue' "from ['\"]tw-animate-css"       src/ demo/ → 0
$ grep -rn --include='*.css' '@import "tailwindcss\|@import "tw-animate-css'   src/ demo/
  src/styles/index.css:7,8 (inside the usage docblock) · demo/demo.css:83,121 (live @imports)
$ grep -rn vue-component-type-helpers src/ demo/                                        → 0
$ grep -rn "from ['\"]@mkbabb/value\.js['\"]" src/ demo/                                → 0
$ value.js subpath imports in src/: /color ×5 · /css ×3 · /easing ×1
$ peerDependencies (9): @lucide/vue @mkbabb/keyframes.js @mkbabb/value.js @vueuse/core
  reka-ui tailwindcss tw-animate-css vue vue-component-type-helpers
```

Peers not in the array: `@mkbabb/value.js` (root), `tailwindcss`, `tw-animate-css`,
`vue-component-type-helpers`. Array entries that are not a peer KEY: the three `value.js`
subpaths. Both directions fail, so the old sentence was false both ways; the new one states the
subpath relation and names why the peer set is larger. `scripts/profile-bundle.mjs:655-656` is
the file that names E1/E2 in prose, and is cited for that.

**Why act 8 took the method arm and not the figures.** The cure allowed either. Measured here,
`node_modules` and `dist` excluded:

```
$ grep -rl "@mkbabb/glass-ui" ../value.js/demo     | wc -l                  → 82  (all files)
$ …                                                | grep -E '\.(ts|vue|css)$' | wc -l → 81
  the 82nd is ../value.js/demo/DESIGN.md
$ grep -rl "@mkbabb/glass-ui" ../keyframes.js/demo | wc -l                  → 43  (all files)
$ …                                                | grep -E '\.(ts|vue|css)$' | wc -l → 42
  the 43rd is ../keyframes.js/demo/app/index.html
```

Changing 81/42 to 82/43 would have made one row true and the REST of the table false: under the
all-files method `../value.js/docs` is 1399, not 8 (its built output carries the string), and
`../sci-report/dashboards` is 20, not 19 (`package.json`). Under the `.ts`/`.vue`/`.css` filter
every other figure re-measures identical — docs 8, e2e 3, test 3, atlas/src 51, atlas/tests 2,
dashboards 19. The sentence was wrong, not the numbers.

### Born-RED, re-proved on the CURED test bytes

The cure edits the test, so born-RED is re-earned rather than inherited. Same file, `repoRoot`
left as the real repo (so `../muster` IS cloned and the skip branch cannot fire), only
`auditPath` pointed at `git show c645c393:docs/audits/overfitting-audit.md`:

```
$ npx vitest run tests/docs/__redprobe.test.ts
 ❯ tests/docs/__redprobe.test.ts (2 tests | 1 failed) 8ms
     × every listed sibling path exists (absent repos skipped with their reason) 5ms

 FAIL  tests/docs/__redprobe.test.ts > docs/audits/overfitting-audit.md — {CONSUMER_PATHS} resolve on disk > every listed sibling path exists (absent repos skipped with their reason)
AssertionError: consumer paths that do not resolve (a sweep over these greps zero and reads it as "no consumers"): ../muster/src/: expected [ '../muster/src/' ] to deeply equal []

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
REDPROBE_EXIT=1
```

RED on the ledger's named hole alone, with the cured skip branch NOT masking it. The live file,
unchanged in behaviour:

```
$ npx vitest run tests/docs/consumer-paths-exist.test.ts
 Test Files  1 passed (1)
      Tests  2 passed (2)
LANE_EXIT=0
```

**The skip path, probed rather than asserted.** Act 3's branch cannot execute on this machine
(all ten siblings are cloned), so it was exercised with the same technique in reverse — the
identical file with `repoRoot` pointed at a scratch dir holding only a copy of the audit
markdown and no siblings:

```
$ npx vitest run tests/docs/__skipprobe.test.ts
 Test Files  1 passed (1)
      Tests  1 passed | 1 skipped (2)
PROBE_EXIT=0
```

`1 skipped` in the DEFAULT summary — the defect is gone: a checkout with no siblings can no
longer read `passed` having checked nothing. Both probe files were deleted immediately after
their runs; `ls tests/docs/` → `consumer-paths-exist.test.ts` alone.

### Verify — verbatim, real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
tsconfig.json exit=0
```

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
tsconfig.test.json exit=0
```

Lane test:

```
$ npx vitest run tests/docs/consumer-paths-exist.test.ts
 Test Files  1 passed (1)
      Tests  2 passed (2)
LANE_EXIT=0
```

Full battery:

```
$ npx vitest run
 Test Files  7 failed | 226 passed (233)
      Tests  15 failed | 2203 passed | 10 expected fail (2228)
BATTERY_EXIT=1
```

**Fifteen REDs, every one attributed, none this lane's — and the attribution is proved, not
claimed.** Fourteen of the fifteen failed with `Error: Test timed out in 5000ms` (one with
`Hook timed out in 10000ms`); the fifteenth is a mount race
(`expected <body><div data-v-app>…</div></body> to be <button …>`). The machine was
oversubscribed by work outside this repo and outside this lane — `uptime` read
`load averages: 171.39 124.80 76.88` during the run, with a foreign vitest battery from
`~/Programming/csc411/…/web/frontend`, a Playwright WebKit pair at 138% and 94% CPU, and Lane
T1's own concurrent `vitest run tests/demo/router-field-ownership.test.ts
tests/public-surface.spec.ts` (pid 73686) on the same cores.

Two re-runs separate clock from defect:

```
$ npx vitest run <the 7 RED files>
 Test Files  3 failed | 4 passed (7)
      Tests  3 failed | 182 passed | 1 expected fail (186)
REDS_RERUN_EXIT=1
```

`tests/public-surface.spec.ts`, `tests/gates/comment-ratio.test.ts`,
`tests/styles/glass-subtlety.test.ts` and `tests/components/custom/aurora/derive-color.test.ts`
went GREEN the moment they were not starved. The three survivors, given time:

```
$ npx vitest run tests/components/custom/aurora/atoms.test.ts tests/components/menu/contract.test.ts tests/demo/router-field-ownership.test.ts --testTimeout=60000 --hookTimeout=60000
 Test Files  3 passed (3)
      Tests  38 passed (38)
SLOW_EXIT=0
```

38/38 GREEN in 8.88s wall. Every RED in this round's battery is a clock. No file among them
imports anything this lane wrote: this round's only executable byte is
`tests/docs/consumer-paths-exist.test.ts`, and the rest are comments and prose.

Round 1's three REDs (`tests/design/drive-tokens.test.ts`, `tests/design/token-bridges.test.ts`,
`tests/gates/boot-graph.test.ts`) are all GREEN in this battery — Lane T1 landed its targets and
the boot-graph clock re-settled. `tests/docs/consumer-paths-exist.test.ts` is among the 226 green
files, and the `10 expected fail` xfail count is unmoved.

Gate receipt:

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
REGISTER_EXIT=0
```

`seats:60`, `violations:0`, `rosterSha256:282d05cf` — byte-identical to round 1's receipt and to
the baseline's. Nothing minted.

Prettier, on the three files that were clean before this round:

```
$ npx prettier --check vite.library.ts docs/instructions/README.md tests/docs/consumer-paths-exist.test.ts
Checking formatting...
All matched files use Prettier code style!
PRETTIER_THREE_EXIT=0
```

The test file was `prettier --write`-formatted after the edit (this lane's own file) and then
checked. The two that warn are the two that warned before, for the reasons round 1 proved:

```
$ npx prettier --check docs/audits/overfitting-audit.md docs/tranches/BK/execution/2026-09-17-o20-cure/T2/RECORD.md
[warn] docs/audits/overfitting-audit.md
[warn] docs/tranches/BK/execution/2026-09-17-o20-cure/T2/RECORD.md
[warn] Code style issues found in 2 files. Run Prettier with --write to fix.
PRETTIER_INHERITED_EXIT=1
```

`docs/audits/overfitting-audit.md` was already unformatted at HEAD (round 1 proved it by piping
the HEAD bytes through the same resolution), and every RECORD in this wave warns alike.

### Fence, this round

`vite.library.ts`, `docs/audits/overfitting-audit.md`, `docs/instructions/README.md`,
`tests/docs/consumer-paths-exist.test.ts` and this RECORD — five files, all inside the lane
fence, four of them re-touched from round 1. `docs/canon/dependencies.md`,
`docs/canon/deps-currency.md`, `docs/archive/README.md` and `src/styles/tokens/scale-paper.css`
were NOT re-opened. Two probe files were created under `tests/docs/` and deleted in the same
command as their run. No sibling repo was written; `../value.js`, `../keyframes.js`,
`../atlas` and `../sci-report` were counted with `grep -rl` only. No git verb but `status`,
`diff`, `rev-parse`, `log` and `show` ran. No build, no `dist/` lock, no browser. Scratch lives
under `…/scratchpad/{laneT2-*,cure-round-1.md,skipprobe/,head-overfitting-audit.md}`, outside
the repo.
