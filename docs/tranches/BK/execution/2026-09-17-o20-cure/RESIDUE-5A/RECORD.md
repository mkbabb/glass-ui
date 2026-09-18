# O-20 cure wave—RESIDUE lane 5A

**Seat** implement · **model** `claude-opus-5`, read from THIS seat's own transcript at
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a1ce4977-dcc/agent-ae8d489026aad8e92.jsonl`
(found by grepping the workflow transcript tree for `RESIDUE-5A`, a phrase unique to this
seat's prompt; the parent session file was not used, `CLAUDE_MODEL_ID` is unset). The id is
re-read from that file and matched against `claude-opus-5` with `&&`, never a newline, at
the head of every command that wrote a repo byte or measured a result. Read-only `grep`,
`sed`, `ls` and `git show` ran after the id was established.

**Subject** the five residues the T1/T2 re-adjudicators left at
`docs/tranches/BK/execution/2026-09-17-o20-cure/{T1,T2}/RECORD.md`.

## Step-0 baseline

```
$ git rev-parse HEAD
a314533a2032e661d4a4153827e2c9f528657594

$ git status --porcelain
 M MIGRATION.md
 M demo/chassis/hero/aurora-hero.ts
 M demo/vite.demo-dist.config.ts
 M scripts/verify-export-types.mjs
 M src/components/_shared/class-names.ts
 M src/styles/tokens/color-radius.css
 M tests/composables/dark/darkModeSyncScript.test.ts
 M tests/public-surface.spec.ts
 M tests/styles/contrast-computed.test.ts
 M vite.config.ts
?? .published-roster
?? docs/tranches/BK/execution/2026-09-17-o20-cure/R/
?? tests/components/_shared/classNames.test.ts
?? vite.dark-stamp.ts
```

Ten modified paths and four untracked ones, every one of them **Lane R's**. None was
opened for writing by this lane. No `git add`, `commit`, `stash`, `checkout` or `reset` ran
at any point; the only git verbs used were `status`, `diff`, `rev-parse`, `log`, `show` and
`diff-tree`.

## Act ledger

| #   | site                                      | what changed                                                                                                                                          | numstat |
| --- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | `src/components/card/Card.vue:19-20`      | "`grain` and `specular` are gone from the whole library" replaced with the measured truth: gone as PROPS, not as capacities                           | 8/2     |
| 2   | `docs/audits/style-audit.md:57`           | `.paper-texture` struck from the canonical-class list; the compose-your-own token recipe named in its place. Ruled a LIVING INSTRUMENT, grounds below | 1/1     |
| 3   | `tests/design/plate-register.test.ts`     | the capture narrowed to `[A-Za-z0-9_-]+`, the interpolation escaped, and one arm added proving a hostile name cannot widen the match                  | 34/5    |
| 4   | `docs/tranches/…/T1/RECORD.md:577` region | dated bracket carrying the re-measured figure (8 regions / 5 hunks, not 4) and the attribution (521-533 is the cure round's own table)                | 13/0    |
| 5   | `CHANGELOG.md:150`, `:288`                | a dated bracket after each: the vendored `freehand.ts` left at `5a69ed9f`; pencil-boil is not a peer at 9.0.0, with the nine-name peer set listed     | 13/0    |

Nothing else was touched. Every anchor was re-read on disk before its edit, and every
replacement was applied through a uniqueness-asserted single-occurrence substitution.

### 1 · `Card.vue:19-20`—specular is a prop that left, not a capacity

The comment claimed a library-wide deletion. Measured before the rewrite:

```
$ grep -n -i specular src/index.ts
475:    createSpecularWriter,
478:    useSpecularTracking,
479:    vSpecular,
490:    type SpecularWriter,
491:    type UseSpecularTracking,

$ grep -n -i specular src/styles/index.css
205:@import "./glass-specular-track.css";

$ grep -rln -i specular src/ | wc -l
64
```

`grain` is the same shape: `--glass-grain-opacity` is declared at
`src/styles/tokens/glass-fx.css:10` and `@utility paper-grain-overlay` at
`src/styles/paper.css:125`. Both survive as material; only the two Card/Surface PROPS died.
The rewritten comment says exactly that, names the five sites, and keeps the surrounding
sentences byte-identical. This is the same correction the T1 cure round made at
`docs/design/affordance-map.md:85`; `Card.vue` is where that cell had copied it from, and
the copy is now cured at its source.

### 2 · `docs/audits/style-audit.md:57`—LIVING INSTRUMENT, so rewritten plainly

**The ruling, from the file's own header.** `:1` names it _"Style Audit — Sub-Agent
Prompt"_, `:9` heads the body _"Prompt body (copy verbatim into sub-agent dispatch, after
substitutions)"_, `:83` supplies `{GLASS_UI_DIR}` as a substitution, and the closing
§"When to run" schedules the thing for onboarding, pre-tranche and quarterly runs. It is a
prompt that gets copied into a dispatch, not a record of a past audit. A dated bracket in
it would be shipped verbatim to the next sub-agent as part of the instruction, which is the
opposite of what a bracket is for. Rewritten plainly.

The row cannot simply lose the name, because the axis exists to catch hand-rolled grain.
`.paper-texture` is gone as a class and the canonical form is now a recipe, so the row says
so and names the recipe:

```
$ grep -rn "\.paper-texture" src/ demo/                        → 0
$ git show 490cc46e | grep -c "^-    \.paper-texture {"        → 1  (deleted there)
$ grep -rn -- "--paper-clean-texture" src/styles/tokens/scale-paper.css  → :118, :124
$ grep -rn -- "--paper-texture-size"  src/styles/tokens/offsets.css      → :106
$ grep -rn -- "--paper-clean-texture" src/components/dock/styles/dock.css → :168
```

Both tokens ship; `.dock-plate::after` is the in-house recipe and `scale-paper.css` §12 is
the compose-your-own docblock. The row now points an auditor at those two tokens and at the
`490cc46e` removal, so a consumer's hand-rolled noise URI still reds and no sweep goes
hunting a class that does not exist. This is the disposition T2 §Residue item 6 asked for.

### 3 · `tests/design/plate-register.test.ts`—the capture and the interpolation

Two defects in one line. `/^@utility\s+([A-Za-z0-9_*-]+)/` admits `*` into the captured
name, and the backtick-wrapped `${name}` interpolation drops that name into regex
SYNTAX. A utility named `glass-plate*` therefore reads as "glass-plat" followed by any
number of "e", which the string `` `glass-plate` `` satisfies: the assertion would call
an undocumented utility documented.

**Born-RED, on the current predicate.** An ephemeral probe carrying the pre-cure capture and
the pre-cure predicate, with the arm this lane adds, was copied into `tests/design/`, run,
and removed in the same command:

```
$ npx vitest run tests/design/__redprobe-plate.test.ts
     × captures only name characters 3ms
     × treats a metacharacter in the name as a literal 1ms

 FAIL  …__redprobe-plate.test.ts > … > captures only name characters
AssertionError: expected 'glass-plate*' to be 'glass-plate' // Object.is equality

 FAIL  …__redprobe-plate.test.ts > … > treats a metacharacter in the name as a literal
AssertionError: expected true to be false // Object.is equality

 Test Files  1 failed (1)
      Tests  2 failed | 1 passed (3)
REDPROBE_EXIT=1
```

Both halves RED, the honest-name arm GREEN. `ls tests/design/` after the command listed
`drive-tokens.test.ts`, `plate-register.test.ts`, `token-bridges.test.ts` and nothing else,
and `git status --porcelain tests/design/` was empty of the probe.

**The cure.** `UTILITY_DECL` hoisted with the narrowed class; `escapeRegExp`; `namedInDesign`
carrying the boundary-anchoring comment that used to sit inline; the filter reduced to a
call. The third arm is the probe's three assertions, now GREEN on the cured bytes.

**On narrowing rather than handling `*`.** Measured: `grep -rn "^@utility.*\*" src/styles/`
returns zero, so the narrowing drops nothing today, and `src/styles/glass/` declares exactly
one utility (`glass-plate`, `veil.css`). If a functional `@utility foo-* {` is ever added,
the narrowed capture yields `foo-`, no doc names `` `foo-` ``, and the register REDs
LOUDLY with the file and line. That is the right failure: a trailing anchor (`\s*\{`) would
have made the same declaration vanish from the register silently, which is the defect class
this wave keeps finding. Recorded in the docblock so the next reader does not "fix" it into
silence.

### 4 · `T1/RECORD.md:577`—re-measured, not inherited

The claim under strike: `docs/tranches/…/T1/RECORD.md  FAIL  (pre-existing, 4 hunks)`.
Measured at this seat before any byte of this lane touched the file:

```
$ npx prettier --find-config-path docs/tranches/…/T1/RECORD.md
../../.prettierrc.json                    → /Users/mkbabb/.prettierrc.json (printWidth 88)

$ npx prettier --check  docs/tranches/…/T1/RECORD.md   → [warn]   CHECK_EXIT=1
$ npx prettier --list-different …/T1/RECORD.md         → the path  LIST_EXIT=1

$ npx prettier …/T1/RECORD.md > /tmp/T1-formatted.md
$ diff -U0 …/T1/RECORD.md /tmp/T1-formatted.md | grep -c '^@@'   → 8
  @@ -35,12  @@ -82  @@ -85,8  @@ -233,4  @@ -238  @@ -243  @@ -334,8  @@ -521,13
$ diff -u  …/T1/RECORD.md /tmp/T1-formatted.md | grep -c '^@@'   → 5
```

**Eight change regions at zero context, five hunks at prettier's default three lines.**
Neither number is 4, and the re-adjudicator's eight line groups reproduce exactly. The
attribution fails too: region **521-533 is the cure round's own act-ledger table**—the
eleven-row `| # | file · anchor | what changed |` table written IN that round—so
"pre-existing" and §Prettier's "none of them is in the cure round's own prose" are both
false. What survives is the KIND claim: six regions are markdown-table realignment
(35-46, 85-92, 233-236, 238, 334-341, 521-533) and two are `*x*` → `_x_` (82, 243), and
nothing pre-existing was reformatted. The bracket says exactly that and strikes the
`:564-566` sentence by reference.

**Refuse-with-grounds, partial.** The same overstatement also sits in prose at
`:564-566`. The fence caps this lane at the `:577` region, so those bytes were NOT edited;
the bracket names and strikes them instead of silently leaving them. Routed as residue 1.

### 5 · `CHANGELOG.md:150` and `:288`—history stays, the brackets say what changed

Line numbers verified first, as ordered:

```
$ sed -n '150p' CHANGELOG.md
`@mkbabb/pencil-boil@^0.9.2`); `perfect-freehand` is no longer a peer (vendored into
$ sed -n '288p' CHANGELOG.md
- The optional `@mkbabb/pencil-boil` peer is now `^0.9.2`; development pins immutable
$ git status --porcelain CHANGELOG.md
(empty—clean at a314533a, untouched since c645c393)
```

Both anchors sit where the cure round measured them. `:150` is under `## 7.0.0
(2026-07-17)`, `:288` under `## 6.0.0` §"Added and changed"—a changelog, so both entries
stay and take a bracket.

The facts in the brackets, each measured here:

```
$ git log -1 --format='%H %ad %s' 5a69ed9f
5a69ed9f… Tue Aug 25 10:49:41 2026 -0400  feat(handmark): land BK #51 γ4 — GF-HANDMARK W0-W5…
$ git diff-tree --no-commit-id --name-status -r 5a69ed9f | grep freehand
D  src/components/handmark/freehand.ts
$ git show 5a69ed9f^:src/components/handmark/freehand.ts | head -2
/**
 * freehand.ts — the VENDORED perfect-freehand geometry core (MIT, tldraw).
$ grep -n "pencil-boil\|perfect-freehand" package.json          → no match (exit 1)
$ grep -rc "perfect-freehand\|pencil-boil" src/ demo/           → zero hits
$ node -e "…Object.keys(peerDependencies)…"                     → 9
  @lucide/vue · @mkbabb/keyframes.js · @mkbabb/value.js · @vueuse/core · reka-ui ·
  tailwindcss · tw-animate-css · vue · vue-component-type-helpers
  peerDependenciesMeta optional: @vueuse/core · @mkbabb/value.js · tw-animate-css
$ node -e "…version…"                                           → 9.0.0
```

The deleted file was the vendored copy by its own header, so the 7.0.0 sentence is true as
history and dead as a description of today on BOTH halves: the peer went, and then the
vendored file went too. The `:150` bracket carries the freehand fact and points at `:288`
for the peer set; the `:288` bracket carries the nine names and the three optional marks.

## Verify—verbatim, real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSCONFIG_EXIT=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
TSCONFIG_TEST_EXIT=0
```

```
$ npx vitest run tests/design
 Test Files  3 passed (3)
      Tests  11 passed (11)
VITEST_DESIGN_EXIT=0
```

Eleven, up from the ten the cure round banked: the one added arm.

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
REGISTER_EXIT=0
```

`seats:60`, `violations:0`, `rosterSha256:282d05cf`—byte-identical to the T1 and T2 cure
receipts and to the wave baseline. Nothing minted. The one test arm added here joins an
existing seat's file; it is not a seat.

```
$ npx prettier --check src/components/card/Card.vue tests/design/plate-register.test.ts
Checking formatting...
All matched files use Prettier code style!
PRETTIER_CLEAN_EXIT=0

$ npx prettier --check docs/audits/style-audit.md CHANGELOG.md docs/tranches/…/T1/RECORD.md
Checking formatting...
[warn] docs/audits/style-audit.md
[warn] CHANGELOG.md
[warn] docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md
[warn] Code style issues found in 3 files. Run Prettier with --write to fix.
PRETTIER_INHERITED_EXIT=1
```

**The three warns are pre-existing and none is on a line this lane wrote—proved, not
claimed.** Each file was checked in the working tree AND at HEAD through
`git show HEAD:<f> | npx prettier --stdin-filepath <f> --check`:

```
src/components/card/Card.vue                      working=PASS  HEAD=PASS
docs/audits/style-audit.md                        working=FAIL  HEAD=FAIL
tests/design/plate-register.test.ts               working=PASS  HEAD=PASS
CHANGELOG.md                                      working=FAIL  HEAD=FAIL
docs/tranches/…/T1/RECORD.md                      working=FAIL  HEAD=FAIL
```

and the change regions were located, so the disjointness is a fact rather than an assertion:

```
style-audit.md   regions 11, 35, 37-51, 78, 87-88, 94, 98-103, 107-112, 114   (edit: :57)
CHANGELOG.md     regions 44, 133-142, 144-146, 335-356, …                     (edits: 153-159, 299-304)
T1/RECORD.md     regions 35-46, 82, 85-92, 233-236, 238, 243, 334-341, 521-533 (edit: 579-590)
```

No region overlaps an edited line, and the T1 region set is byte-identical before and after
this lane's write. Nothing pre-existing was reformatted.

```
$ git status --porcelain
 M CHANGELOG.md
 M MIGRATION.md                                    ← Lane R
 M demo/chassis/hero/aurora-hero.ts                ← Lane R
 M demo/vite.demo-dist.config.ts                   ← Lane R
 M docs/audits/style-audit.md
 M docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md
 M scripts/verify-export-types.mjs                 ← Lane R
 M src/components/_shared/class-names.ts           ← Lane R
 M src/components/card/Card.vue
 M src/styles/tokens/color-radius.css              ← Lane R
 M tests/composables/dark/darkModeSyncScript.test.ts  ← Lane R
 M tests/design/plate-register.test.ts
 M tests/public-surface.spec.ts                    ← Lane R
 M tests/styles/contrast-computed.test.ts          ← Lane R
 M vite.config.ts                                  ← Lane R
?? .published-roster                               ← Lane R
?? docs/tranches/BK/execution/2026-09-17-o20-cure/R/  ← Lane R
?? tests/components/_shared/classNames.test.ts     ← Lane R
?? vite.dark-stamp.ts                              ← Lane R
```

The baseline plus this lane's five paths, and nothing else. The probe file left no trace.

## Fence statement

Modified: `src/components/card/Card.vue` · `docs/audits/style-audit.md` ·
`tests/design/plate-register.test.ts` · `CHANGELOG.md` ·
`docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md`. Created: this RECORD at
`docs/tranches/BK/execution/2026-09-17-o20-cure/RESIDUE-5A/RECORD.md`. Six paths, all
inside the fence.

Lane R's fourteen dirty paths were read for nothing and written never: `MIGRATION.md`,
`src/components/_shared/class-names.ts`, `tests/components/_shared/classNames.test.ts`,
`.published-roster`, `scripts/verify-export-types.mjs`, `tests/public-surface.spec.ts`,
`vite.dark-stamp.ts`, `vite.config.ts`, `demo/vite.demo-dist.config.ts`,
`tests/composables/dark/darkModeSyncScript.test.ts`, `demo/chassis/hero/aurora-hero.ts`,
`tests/styles/contrast-computed.test.ts`, `src/styles/tokens/color-radius.css`, and
`docs/tranches/BK/execution/2026-09-17-o20-cure/R/`. `R/RECORD.md` was read once, read-only,
while grepping the tree for `.paper-texture`.

No sibling repo was read for write or written; `docs/precepts` was not opened. No build ran
and the `build.lock` was never taken. No browser. One ephemeral probe file lived under
`tests/design/` for the duration of one command and was removed inside it; its source and
every measurement artefact live under
`…/scratchpad/{edit1_card_style.py, edit3_plate.py, edit45_brackets.py, edit6_emdash.py,
__redprobe-plate.test.ts, T1-*.diff, fmt-*, re-*, *.log}`, outside the repo.

## Residue

1. **`T1/RECORD.md:564-566` still carries the struck claim in prose.** "Every hunk prettier
   still wants … and all four in this RECORD … none of them is in the cure round's own
   prose" is false on the count and on the last clause. Struck by reference from the `:577`
   bracket; the bytes were left because the fence names the `:577` region alone. One
   sentence, one pass, whoever holds that file next.
2. **`tests/design/drive-tokens.test.ts:69-71` is the same shape, uncured.** Three
   `new RegExp(…${token}…)` interpolations with no escape. It is LATENT, not live: the
   interpolated values are `--custom-property` names, whose character set carries no
   regex metacharacter, so nothing widens today. It is one `escapeRegExp` away from
   being safe by construction rather than by luck, and the helper now exists next door.
   Outside this fence.
3. **`CHANGELOG.md` has no 9.0.0 entry at all.** `grep -n '^## ' CHANGELOG.md` heads the
   file at `## 8.0.0 — 2026-08-09` while `package.json` reads `9.0.0`. A published major
   with no changelog section is a bigger hole than either sentence bracketed here, and it is
   nobody's in this wave.
4. **`.paper-texture` survives in two more places, both correct as history.**
   `docs/archive/constellation/next/design/bbnf/WC-design-layout.md:28` is an archive, and
   the `docs/tranches/…` rows that name it are tranche records. Neither was touched. The
   `docs/precepts` submodule was not inspected.
5. **The em-dash law versus the file conventions, still unsettled.** T2 §Residue 7 routed
   this for a house ruling. [2026-09-17 · cure round 1] This lane's first draft claimed
   here that it had written its own prose with unspaced em dashes; its own bytes said
   otherwise, fourteen times. STRUCK. The fourteen are now closed to the unspaced house
   form and the six verbatim quotes are left as quoted. What stays unsettled is everyone
   else's prose: `style-audit.md:1` reads "Style Audit — Sub-Agent Prompt" and the T1
   RECORD is spaced throughout, and normalizing either would reflow prose two other lanes
   are holding. Owed one sweep, not five lanes each guessing.
6. **`Card.vue`'s comment is long and now longer.** The five-site citation is the honest
   form, but a component docblock that carries library-wide facts is a copy by
   construction—`affordance-map.md:85` proved it by drifting from exactly this text. The
   durable shape is a falsifier (a test asserting that no src comment claims a symbol
   `src/index.ts` exports is gone), not a better comment. Not minted here: the gates are
   exactly 60 and this lane mints nothing.

---

## CURE ROUND 1—2026-09-17

**Seat** cure · **model** `claude-opus-5`, read from THIS seat's own transcript at
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a1ce4977-dcc/agent-aacbea35dd288468d.jsonl`
(found by grepping the workflow transcript tree for `no scoping reproduces 21`, a phrase
unique to this seat's prompt; `CLAUDE_MODEL_ID` is unset and the parent session file was
not used). A DIFFERENT agent file from the implement round above, which ran at
`agent-ae8d489026aad8e92.jsonl`; the sibling file `agent-a1e69cab21f1f6057.jsonl` in the
same workflow directory carries `claude-fable-5-1` and is the adjudicator's, not this
seat's. The id is re-read from the file and matched against `claude-opus-5` with `&&` at
the head of every command below, never a newline.

**Subject** the six cures the adjudicator raised against this RECORD. Every one of them is
a defect in THIS file's own prose. No repo source, test or doc outside
`RESIDUE-5A/RECORD.md` was opened for writing in this round.

### Step-0 baseline, re-banked at this seat

```
$ git rev-parse HEAD
a314533a2032e661d4a4153827e2c9f528657594

$ git status --porcelain
 M CHANGELOG.md
 M MIGRATION.md
 M demo/chassis/hero/aurora-hero.ts
 M demo/vite.demo-dist.config.ts
 M docs/audits/style-audit.md
 M docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md
 M scripts/verify-export-types.mjs
 M src/components/_shared/class-names.ts
 M src/components/card/Card.vue
 M src/styles/tokens/color-radius.css
 M tests/composables/dark/darkModeSyncScript.test.ts
 M tests/design/plate-register.test.ts
 M tests/public-surface.spec.ts
 M tests/styles/contrast-computed.test.ts
 M vite.config.ts
?? .published-roster
?? docs/tranches/BK/execution/2026-09-17-o20-cure/R/
?? docs/tranches/BK/execution/2026-09-17-o20-cure/RESIDUE-5A/
?? tests/components/_shared/classNames.test.ts
?? vite.dark-stamp.ts
```

Twenty entries: Lane R's fourteen, plus this lane's five modified paths and this RECORD's
directory. Unchanged from the implement round's close. No `git add`, `commit`, `stash`,
`checkout` or `reset` ran at any point; the only git verbs used this round were
`rev-parse`, `status` and `diff`.

### Act ledger

Every substitution ran through one script with a per-edit occurrence assertion, so a
silent multi-hit or a silent zero-hit was impossible: `sub()` aborts unless the literal
appears EXACTLY once. Twenty assertions, twenty single hits, exit 0. The script lives
outside the repo at `…/scratchpad/cure1.py`.

**1 · `:70-71`—the specular count was false, replaced with the measured one.** Re-measured
at this seat before the byte:

```
$ grep -rln -i specular src/ | wc -l
      64
$ grep -rln -i specular src/ | sed 's/.*\.//' | sort | uniq -c
  28 css
   3 md
  20 ts
  13 vue
```

Sixty-four, not twenty-one, and 28+3+20+13 = 64 accounts for all of it. `21` replaced with
`64` rather than struck: the line is a true measurement once the number is true, and the
Card comment it supports cites five NAMED sites, not a count, so nothing downstream moves.

**2 · `:288`—the CHANGELOG edit region, off by one line.** The implement round wrote
`(edits: 152-158, 299-304)`. Measured:

```
$ git diff -U0 CHANGELOG.md | grep '^@@'
@@ -152,0 +153,7 @@ HandMark). See `MIGRATION.md` §7.0.0 for the per-prop rows.
@@ -291,0 +299,6 @@ delta from 5.0.0 is one removal, `./stacked-icons`; no key is added or renamed.
```

`+153,7` is new lines 153-159, so the first bracket sits at 153-159 and the second at
299-304. Corrected. The conclusion the line serves is untouched, and re-proved here rather
than inherited:

```
$ npx prettier CHANGELOG.md > …/CHANGELOG-fmt.md
$ diff -U0 CHANGELOG.md …/CHANGELOG-fmt.md | grep '^@@' | … | awk '$1>147 && $1<334'
(no output)
```

The nearest prettier change regions are `@@ -144,3` below and `@@ -335,22` above. Nothing
lands between 147 and 334, so both brackets remain disjoint from every region prettier
wants, at the corrected numbers as at the wrong ones.

**3 · `:111-115`—the plate-register code spans, rewritten legibly.** The draft read
``new RegExp(\`\`\`${name}\`\`\`)`interpolates`` with the span unterminated, the following
space eaten, and a stray backslash inside `` `glass-plate\*` ``. The nested backticks were
never going to survive a code span, so the span is dropped for the description the
adjudicator offered: "the backtick-wrapped `${name}` interpolation". Verified against the
cured source, `tests/design/plate-register.test.ts:41-42`, which reads
``new RegExp(`\`${escapeRegExp(name)}\``)``—a backtick-wrapped, escaped name. Five lines
in, five lines out.

**4 · `:351-356`—the residue-2 spans, and the indent that fell to column 0.** Same defect
class plus a structural one: `:353` and `:354` sat at column 0, which reads as a new
paragraph rather than as numbered item 2's continuation. Spans repaired
(`` `new RegExp(…${token}…)` `` then a space before "interpolations",
`` `--custom-property` `` and `` `escapeRegExp` `` with their spaces), all continuation
lines re-indented to three. Six lines in, six lines out.

**5 · `:328`—thirteen became fourteen.** The sentence said "thirteen dirty paths" and then
named fourteen. Counted on the bytes that follow it: `MIGRATION.md`, `class-names.ts`,
`classNames.test.ts`, `.published-roster`, `verify-export-types.mjs`,
`public-surface.spec.ts`, `vite.dark-stamp.ts`, `vite.config.ts`,
`vite.demo-dist.config.ts`, `darkModeSyncScript.test.ts`, `aurora-hero.ts`,
`contrast-computed.test.ts`, `color-radius.css`, `R/`—fourteen, which is also ten modified
plus four untracked, which is also `:37`, which is also the driver's roster. Corrected.

**6 · the em-dash house law, and the residue that denied it.** Fourteen lane-authored
spaced em dashes closed to the unspaced house form—`:1`, `:55`, `:82`, `:109`, `:154`,
`:174`, `:175`, `:186`, `:196`, `:200`, `:227`, `:253`, `:272`, `:372`—and the six verbatim
quotes left exactly as quoted. Before and after:

```
(before this round, whole file)  grep -c ' — '                    →  20
(after  this round, body 1-378)  sed -n '1,378p' … | grep -c ' — ' →   6
(after  this round, body 1-378)  sed -n '1,378p' … | grep -n ' — '
 84:  _"Style Audit — Sub-Agent Prompt"_          ← quoting style-audit.md:1
207:  … BK #51 γ4 — GF-HANDMARK W0-W5…            ← quoting a commit subject
212:  freehand.ts — the VENDORED perfect-freehand ← quoting a deleted file's header
249:  … the ABSENT count — seat names with no …   ← quoting gate-register.mjs stdout
358:  `## 8.0.0 — 2026-08-09`                     ← quoting CHANGELOG.md
370:  "Style Audit — Sub-Agent Prompt"            ← quoting style-audit.md:1
```

14 + 6 = 20, which is the whole before-set: no site was missed and no quote was touched.

The counts are SCOPED TO THE BODY, lines 1-378, because the same count run over the whole
finished file returns **16**, not 6. The extra ten all live in THIS section: six quote the
surviving sites, one quotes the `gate-register.mjs` banner, and three are the search
pattern spelled out inside the block above. Every one is a quotation or a command, none is
lane prose. Stated here rather than left for a reader to trip over—the defect this cure
round exists to fix is a RECORD asserting what its own bytes deny, and an unscoped `6`
would have been a fresh instance of it. (The first draft of this paragraph WAS a fresh
instance: it spelled the pattern out a fourth time while claiming 16, which made the true
answer 17. Measured, caught, rewritten to describe the search instead of spelling it.)

Residue 5 then had to be made honest, because it asserted the opposite of the file it sat
in—"This lane wrote its own new prose with unspaced em dashes or none" while fourteen of
its own lines were spaced. The deferral itself is KEPT, because it is still real and still
not this seat's to rule: the OTHER files' spaced em dashes would reflow prose two lanes are
holding. What is struck, in a dated bracket, is only the false self-description. The
alternative branch the adjudicator offered (hold the deferral, declare the RECORD spaced
throughout) was declined: the house law in this seat's own charter says em dashes without
spaces, so closing this lane's own prose obeys it at zero cost to anyone else, and only the
cross-lane sweep needs a ruling.

### Verify—verbatim, real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSCONFIG_EXIT=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
TSCONFIG_TEST_EXIT=0
```

```
$ npx vitest run tests/design
 Test Files  3 passed (3)
      Tests  11 passed (11)
VITEST_DESIGN_EXIT=0
```

Run to a log file, not a pipe, and the exit code read from the runner itself: under `zsh`,
`${PIPESTATUS[0]}` after a pipe is empty and `$?` is `tail`'s. The first attempt at this
command printed `VITEST_DESIGN_EXIT=` and was re-run unpiped rather than reported.

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
REGISTER_EXIT=0
```

`seats:60` … `violations:0`, `rosterSha256:282d05cf`—byte-identical to the implement
round's receipt, to T1's and to T2's. This round wrote prose only; nothing could have been
minted and nothing was.

```
$ npx prettier --check src/components/card/Card.vue tests/design/plate-register.test.ts \
    docs/tranches/BK/execution/2026-09-17-o20-cure/RESIDUE-5A/RECORD.md
Checking formatting...
All matched files use Prettier code style!
PRETTIER_MINE_EXIT=0

$ npx prettier --check docs/audits/style-audit.md CHANGELOG.md docs/tranches/…/T1/RECORD.md
[warn] docs/audits/style-audit.md
[warn] CHANGELOG.md
[warn] docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md
PRETTIER_INHERITED_EXIT=1
```

The three warns are the same three, unchanged: this round touched none of those files. The
disjointness proof above stands, and for `CHANGELOG.md` it was re-run at this seat rather
than inherited.

### Fence statement

One file written this round:
`docs/tranches/BK/execution/2026-09-17-o20-cure/RESIDUE-5A/RECORD.md`, which is this
lane's own RECORD and inside the fence. The five paths the implement round modified were
re-read but not re-written; `git status --porcelain` is byte-identical to the step-0 bank
above. Lane R's fourteen paths were never opened. No sibling repo was read for write or
written and `docs/precepts` was not opened. No build, no `build.lock`, no browser, no
probe file. The one script this round used lives outside the repo at `…/scratchpad/`.

### Residue after cure round 1

1. **Residues 1 through 4 and 6 above stand unchanged.** Nothing in this round touched
   `T1/RECORD.md:564-566`, `drive-tokens.test.ts:69-71`, the missing 9.0.0 changelog
   section, the two historical `.paper-texture` mentions, or the falsifier `Card.vue` wants
   instead of a longer comment. They are re-affirmed as written, not re-opened.
2. **The em-dash sweep is still owed, now narrower.** This RECORD is closed; the T1 and T2
   RECORDs and `style-audit.md` are not. T2 §Residue 7 routed that for a house ruling and
   it has not come. The scope is now exactly "everything this wave wrote EXCEPT
   `RESIDUE-5A/RECORD.md`", which is a smaller and more tractable sweep than it was.
3. **`agent-a1e69cab21f1f6057.jsonl` carries `claude-fable-5-1`.** Recorded as an
   observation, not a complaint: the adjudicator seat that raised these six ran on Fable,
   the implement and cure seats on `claude-opus-5`, and the workflow directory holds all
   three. If a later reader greps that directory for a model id they will find two, and
   this note says which is whose.
