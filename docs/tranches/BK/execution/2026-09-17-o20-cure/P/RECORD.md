# Lane P — A-1, the permanent `./styles` parse arm

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_2bb35ea4-0fb/agent-a5d8a8f21f109045d.jsonl`,
the `message.model` field of its first assistant turn) · **date** 2026-09-17 ·
**base** `master` @ `2984e377` ·
**spec of record** `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` §A-1.

[2026-09-17 · adjudication] On the gating, corrected: the id was read once from the
transcript and asserted on one command (Bash call 6 of 44, gating `wc -l LEDGER.md && ls
scratchpad/o20/`); the other 43 calls, including every vue-tsc, vitest and gate-register run
below, ran ungated. The ledger's seat law ("model asserted from the seat's own transcript
and gating the chain") was met on the assertion and not on the gating; the id is
independently confirmed correct by both challengers and the adjudicator from the same
transcript.

## Step-0 baseline

`git status --porcelain` at first byte, before anything this lane wrote:

```
 M docs/tranches/BK/EXECUTION-PROGRESS.md
```

`git diff --stat`:

```
 docs/tranches/BK/EXECUTION-PROGRESS.md | 166 ++++++++++++++++++++++++++++++++-
 1 file changed, 162 insertions(+), 4 deletions(-)
```

`git rev-parse HEAD` = `2984e3778a1bbe866b5e3985719007471fcedbd3`. The one dirty file is the
driver's cursor, not this lane's.

Register receipt read at baseline, before the change:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Census

| file | + | - | note |
| --- | --- | --- | --- |
| `scripts/verify-export-types.mjs` | 21 | 1 | the arm: `lightningcss` import + the raw-buffer parse inside `validateCss()` |
| `tests/public-surface.spec.ts` | 54 | 0 | ONE new `it()` in `Row 8 package falsifiers`, on the existing mkdtemp + `runVerifierProbe` fixture |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/P/RECORD.md` | new | — | this record |

`tests/public-surface.spec.ts` is shared with Lane E1 (export/type assertions, per the lane
table). At the moment of writing this record the file's whole `git diff --stat` reads `64
insertions(+)`: 54 are this lane's `it()` (measured at `54 insertions(+), 0 deletions(-)`
immediately after the edit, before E1's landed), 10 are E1's, which arrived mid-run and
shifted this lane's `it()` from :654 to :664. Neither lane deleted a line of the other's.

Nothing else. `.bundle-ratchet` still reads `2549378` and is not in `git status`; zero
published bytes move (`package.json` `files: ["dist"]`, and neither `scripts/` nor `tests/`
ships).

## Act ledger

**A-1 · permanent `./styles` parse gate — PARTIAL → CURE-NOW. DONE.**

1. `scripts/verify-export-types.mjs`: added `import { transform as parseCss } from
   "lightningcss";` next to the other third-party import (`typescript`), and inside
   `validateCss()`'s walk loop read the RAW buffer and parse it BEFORE the comment-strip.
   A parse failure pushes `` `${file}: published CSS does not parse: ${error.message}` ``
   and `continue`s — the `continue` is load-bearing: a file that does not parse has no
   trustworthy import stream, so the walker never chases references out of untrusted
   bytes. Failures flow into the existing `Invalid package artifact:` throw.
2. The arm carries a comment naming both co-detectors —
   `tests/styles/emitted-utility-vars.test.ts:64` and
   `tests/styles/backdrop-prefix-normalization.test.ts:141` — as load-bearing for the
   unclosed-comment class, with the reason: lightningcss tolerates an unclosed trailing
   comment that postcss rejects, and rejects a `BadString` that postcss tolerates. Neither
   parser is a superset; pruning either side reopens a hole. The same note sits on the
   test.
3. No seat minted. The arm rides the RELEASE seat `G-NO-ORPHAN-EXPORT`, already bound to
   this exact file (`docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json`
   :66-74, `binding: "seat-detector"`, `paths: ["scripts/verify-export-types.mjs"]`), and
   the failure message carries no G-id — matching `validateCss()`'s own unprefixed
   failures. Receipt unchanged at `seats:60`.
4. It runs where the ask asked: `npm run verify:package` = `node
   scripts/verify-export-types.mjs`, called from `scripts/release.sh:35` and
   `.github/workflows/release.yml:42`. It also runs on every `npm run build`, iter and
   watch cycle: `vite.style-assets.ts:29` imports `verifyExportTypes` and
   `publishGeneration` calls it at `:106` with `{ pack: false, allowMissingRatchet: true }`
   over the staged generation before the atomic rename into `dist/`, wired from
   `vite.config.ts:10` and `vite.iter.config.ts:9`. Two consequences: `lightningcss` enters
   the bundled build-config graph (its only other repo importer is
   `tests/styles/material-css-syntax.test.ts:4`), and a staged stylesheet that does not
   parse now fails the build itself, ahead of `verify:package`. This lane did not build;
   the adjudicator proved the bundled config resolves the import:
   `vite.loadConfigFromFile({command:"build",mode:"production"}, "vite.config.ts")` exit 0,
   `dependencies` lists `scripts/verify-export-types.mjs` and `vite.style-assets.ts`,
   plugin `glass-ui:publish-style-assets` present.

Coverage is literal, not approximate: the walk seeds from all four CSS export subpaths and
closes at 124 files = every `.css` in the published dist, and `packedCssSetFailures`
(:344-358) already pins that closure equal to the packed tar's CSS set.

Cost: no new dependency (`lightningcss` is already `devDependencies` at `package.json:531`,
and the linux binary is already in `package-lock.json`, so CI's `npm ci` has it). The whole
`verifyExportTypes` call over the published 9.0.0 dist — 193 claims, 451 declarations, 124
CSS — takes 100 ms end to end.

Nothing was built, so the `dist/` build lock was never taken and never held.

### Two departures from the investigator's sketch, both toward the verifier's corrections

- **The fixture is self-contained; it does not copy `dist/styles/`.** The sketch copied the
  built dist into the scratch root. That would make the arm ABSENT whenever `dist/` is —
  the exact masking fallback the verifier flagged on `emitted-utility-vars.test.ts:19`. The
  fixture instead writes a two-file scratch package whose `index.css` carries the real
  published head shape (`@layer` prelude, a relative `@import`, and the `@source "../*.js"`
  whose string interior holds the file's only literal `/*`). It runs everywhere, always.
- **The probe builds its own fixture.** The fence permits one new `it()` and nothing else in
  that file; writing the fixture from the test process would have needed `mkdirSync` added
  to the file's import line. The probe string imports what it needs itself — the same idiom
  the packed-CSS-drift probe already uses (`it("rejects packed CSS drift against the built
  artifact")`, `import { readdirSync } from "node:fs"` inside the probe string at :876); the
  ratchet probe (`it("G-BUNDLE-RATCHET: …")`, :793) does the dynamic form at :810. The spec
  file's imports are untouched.

## Born-RED proof, on bytes

The plant is the ledger's shape: splice `"/*\n  the fold block's own prose\n"` at the FIRST
literal `/*` in the stylesheet, which is inside `@source "../*.js"` — on the published
`styles/index.css` that offset is 1507, the lone `/*` the ACK identified as string-interior.
A newline inside a CSS string is a `BadString`.

**BEFORE the change** — `npx vitest run tests/public-surface.spec.ts -t "rejects published
CSS that does not parse"`:

```
 FAIL  tests/public-surface.spec.ts > Row 8 package falsifiers > rejects published CSS that does not parse
AssertionError: expected 'CLEAN' to be 'FAILED' // Object.is equality

Expected: "FAILED"
Received: "CLEAN"

 ❯ tests/public-surface.spec.ts:688:46

 Test Files  1 failed (1)
      Tests  1 failed | 86 skipped (87)
```

RED for the right reason, and only that reason: the first assertion — the true-negative,
`expect(results.clean).toEqual({ terminal: "CLEAN", css: 2 })` — passed at HEAD, so the
fixture is a valid package the verifier accepts. The corrupt one walked through as CLEAN
with the same closure count. That is the defect stated as an exit code.

**AFTER the change** — same command:

```
 Test Files  1 passed (1)
      Tests  1 passed | 86 skipped (87)
```

exit 0.

The message the arm actually produces on the planted stylesheet, read out of the thrown
`Invalid package artifact:` block:

```
Invalid package artifact:
styles/index.css: published CSS does not parse: Unexpected token BadString("../*")
```

## The arm on a real closure

`verifyExportTypes({ artifactRoot: <publish-900/dist>, pack: false })` against the published
9.0.0 bytes (`.bundle-ratchet` 2549378 = the registry's `unpackedSize`), exit 0:

```
{"package":{"name":"@mkbabb/glass-ui","version":"9.0.0"},"claims":193,"declarations":451,"css":124,"ms":100}
```

All 124 published stylesheets parse. The same call against the working tree's own `dist/`
(read-only, `pack: false`, no build, no lock):

```
{"repoDist":"CLEAN","claims":193,"declarations":451,"css":124}
```

No escape hatch was added, and none is needed: every Tailwind-v4 directive family in the
published dist parses clean today. If lightningcss ever rejects a legitimate directive the
file gets fixed, not exempted.

## Verify, verbatim

Typecheck, real exit code (not a pipe's):

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSC_EXIT=0
```

Lane spec, whole file:

```
$ npx vitest run tests/public-surface.spec.ts
 Test Files  1 passed (1)
      Tests  87 passed (87)
LANE_EXIT=0
```

Full battery:

```
$ npx vitest run
 Test Files  2 failed | 225 passed (227)
      Tests  2 failed | 2164 passed | 10 expected fail (2176)
BATTERY_EXIT=1
```

Both REDs attributed, neither this lane's:

1. `tests/styles/emitted-utility-vars.test.ts > synthesizes no background fallback that
   paints bare var(--foreground)` — **Lane C1**, in flight. The assertion sits at :230,
   inside C1's uncommitted `+60` lines (`git diff --stat` on that file), and the file is
   C1's fence for A-11d. It is C1's born-RED awaiting C1's CSS cure.
2. `tests/gates/boot-graph.test.ts > the dist-demo it measures is NEWER than every source
   it is built from` — `dist-demo/index.html` built `2026-08-29T20:06:23.024Z`, newest
   source `2026-09-17T21:57:54.215Z`. `newestSourceMtime()` (:543-555) walks `demo/` and
   `src/` ONLY; this lane writes neither. That exact timestamp is
   `src/components/configurator/ConfiguratorLayer.vue`, Lane C1's file. The stale
   `dist-demo` predates today by three weeks; C1's `src/` edit is what tripped it.

The repo's `typecheck` script also runs `tsconfig.test.json`; it exits 2 on ONE error,
`tests/styles/emitted-utility-vars.test.ts(217,17): error TS2322` — a postcss
`Document_`/`ContainerWithChildren` union at line 217, which does not exist in that file at
`HEAD` (`git show HEAD:…` has no line 217). Wholly inside Lane C1's new lines, attributed
to C1, not touched.

Register receipt after the change, verbatim and unmoved:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`violations:0`, `seats:60`, `drift:0`, and `rosterSha256` identical to baseline. Nothing
minted.

## Fence

Files created or modified by this lane, and no others:

- `scripts/verify-export-types.mjs`
- `tests/public-surface.spec.ts` — one new `it()`, appended inside the existing `Row 8
  package falsifiers` describe, immediately after the lock-drift fixture it reuses. No
  other line of that file changed, imports included.
- `docs/tranches/BK/execution/2026-09-17-o20-cure/P/RECORD.md`

No `git add`, `commit`, `stash`, `checkout` or `reset` ran. No sibling repo was read for
writing or written. No build ran, so the shared `dist/` lock was never taken. The scratch
probes (`p-closure.mjs`, `p-msg.mjs`) and all captured output live in the session scratchpad
at `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/`,
outside the repo; the born-RED fixture lives in `mkdtemp` and is removed in `finally`.
The other dirty paths in `git status` (`src/components/configurator/*`,
`src/components/slider/styles.css`, `src/styles/glass/overlay-plate.css`,
`tests/styles/*`, `tests/gates/overfit-structure.test.ts`,
`docs/tranches/BK/EXECUTION-PROGRESS.md`) belong to Lanes C1 and E1 and the driver;
untouched. The verify lines above are a snapshot at 17:58 ET; the tree moved under the
concurrent lanes afterwards, and the two REDs are attributed by mechanism, not by timing.

## Residue

- **Owed to nobody, stated anyway:** the cure parses with lightningcss, not with the
  consumer's `@tailwindcss/postcss`, which is the toolchain the original A-1 report used to
  reproduce. The two existing dist postcss arms are what cover that direction, and the arm's
  comment now names them so a later "these are redundant" prune REDs on reading rather than
  silently reopening the unclosed-comment hole. Running both parsers inside
  `verify-export-types.mjs` would import postcss into the release verifier for a class the
  battery already catches; not built, deliberately.
- Nothing minted, nothing deferred, nothing parked. A-1's ask half is now executable and it
  runs on the release path.

## CURE ROUND 1 — 2026-09-17

Cure seat, model `claude-opus-5`, asserted from this seat's own transcript
(`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_2bb35ea4-0fb/agent-afbc205221f6c114b.jsonl`,
`message.model`) and re-read from that file to gate every command of this round with `&&` —
the defect D1 corrects. Adjudication: CURE-REQUIRED on six records-truth defects, the code
adjudicated complete and correct. No code, test or fixture byte changed in this round; the
six edits are all inside this RECORD.

What changed:

1. Header, `[2026-09-17 · adjudication]` bracket — the false claim "the assertion gated
   every command in this record with `&&`" struck and replaced with the truth: one of 44
   Bash calls was gated, the other 43 (every vue-tsc, vitest and gate-register run) ran
   ungated; the id itself is correct and independently confirmed.
2. Census, `scripts/verify-export-types.mjs` row: `22` → `21` insertions. `git diff
   --numstat` reads `21 1`; the 22 came off `--stat`'s total-changed count.
3. Census: the RECORD.md row moved up inside the table. It sat after the prose paragraph
   and rendered as a literal `| … |` line.
4. Act ledger item 4: the second trigger surface disclosed — `vite.style-assets.ts:29`
   imports `verifyExportTypes` and `publishGeneration` calls it at `:106` with `{ pack:
   false, allowMissingRatchet: true }` before the atomic rename into `dist/`, wired from
   `vite.config.ts:10` and `vite.iter.config.ts:9`. The arm fires on every build, not only
   on `verify:package`, and `lightningcss` enters the bundled build-config graph.
5. Coverage paragraph: `packedCssSetFailures` cited at `:344-358`, not `:324-338`. The
   function is untouched and shifted +20 by this lane's own insertions (HEAD `:324` →
   `:344`, both read with `grep -n`).
6. Departures bullet: the reused idiom named by `it()` title — the packed-CSS-drift probe
   (`it("rejects packed CSS drift against the built artifact")`, static `import {
   readdirSync } from "node:fs"` inside the probe string at `:876`), not the ratchet probe
   (`it("G-BUNDLE-RATCHET: …")`, `:793`), which uses the dynamic form at `:810`.

Verify, re-run at 18:26 ET, verbatim, real exit codes:

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSC_EXIT=0
```

```
$ npx vitest run tests/public-surface.spec.ts
 Test Files  1 passed (1)
      Tests  92 passed (92)
LANE_EXIT=0
```

```
$ npx vitest run
 Test Files  227 passed (227)
      Tests  2172 passed | 10 expected fail (2182)
BATTERY_EXIT=0
```

The battery is whole-green now: the two REDs attributed above to Lane C1 (the
`emitted-utility-vars` background-fallback assertion and the `boot-graph` dist-demo
staleness) are gone, cured by their own lane. The spec file's count rose 87 → 92 as E1
landed more arms; this lane's `it()` is one of the 92 and its own contribution is still 54
lines (`git diff --numstat tests/public-surface.spec.ts` now reads `85 0` for the shared
file).

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
REGISTER_EXIT=0
```

`seats:60`, `violations:0`, `drift:0`, `rosterSha256` unmoved from baseline. `.bundle-ratchet`
still `2549378` and still absent from `git status`, whose line count is 22 — the same tree
shape this round opened on.

The repo `typecheck` script's second half still exits 2 on one error,
`tests/styles/emitted-utility-vars.test.ts(217,17): error TS2322` (postcss
`Document_`/`ContainerWithChildren` union). That line is inside Lane C1's uncommitted hunk,
not at `HEAD`, and is C1's to close. Not this lane's, not touched.

Fence this round: `docs/tranches/BK/execution/2026-09-17-o20-cure/P/RECORD.md` only. No git
verb ran, no build ran, the `dist/` lock was never taken, no sibling repo was read for
writing or written. Residue: none owed beyond the C1 typecheck error named above.
