# BK · Lane β · unit β1 — #17 W-COMMENT-DIET

**modelId: `claude-opus-5[1m]`** (IMPLEMENT seat; the assertion gates the chain) · base
HEAD `c4dbf53b` · date **2026-08-10** · SHARED TREE, three other lanes concurrent.

**CURED 2026-08-12 at HEAD `4a86570b`**, modelId `claude-opus-5[1m]`, after the
adjudicator returned **CURE-REQUIRED** on this unit's central deliverable: the figure and
its instrument disagreed with the instrument's own printed rule by 1,517 lines of shader.
**Every figure below is re-measured at `4a86570b` under the cured instrument and none is
carried across from the first run.** The five cures, their found-state and the mutant
transcript are §7; the strike history is kept in place rather than overwritten, here and
in `TERMINAL-ROSTER.md`.

**This seat never staged, committed, stashed or checked out.** The driver commits.

---

## 0 · STEP-0 CENSUS, banked before a byte moved

Baseline diff: `/tmp/bk-lanebeta-baseline-1786383360.diff` — **0 bytes**, `git diff -U0`.

| figure | at step 0 |
|---|---|
| HEAD | `c4dbf53b` (β0's landing, `feat(dark): darkModeSyncScript gains defaultDark · queryOverride · normalize`) |
| porcelain | **1** |
| tracked-modified | **none** — the tree was clean |
| untracked (enumerated) | `tests/components/custom/aurora/harness.test.ts` — the ONE untracked path, lane γ's |

The formerly-fenced pair landed attributed at `2cfc1124` and is **ordinary tracked text,
still not a lane surface**: `src/styles/glass/material.css` was never opened by this seat
(re-hash §5), and `tests/styles/material-css-syntax.test.ts` is now tracked and untouched.

---

## 1 · WHAT THIS UNIT DID — five acts

### ACT 1 · The ONE comment counter — `scripts/comment-census.mjs`

J-10 is the whole reason it exists. Three seats once quoted three suite counts from
three regexes, and the ruling was that no bare figure is ever quoted again: **one
committed figure, one committed detector, and the figure is what the detector emits.**
`WAVES.md:847`'s 39.4% had no committed instrument behind it — it could be re-typed, never
re-derived. Now it can.

**THE DETECTOR, stated verbatim as the command prints it:**

```
detector: tracked .ts/.vue/.css/.mjs; COMMENT = a non-blank line whose every
non-whitespace character lies inside //, /* */ or <!-- --> (continuations counted);
CODE = non-blank minus comment; share = comment / non-blank.
```

Four properties earn their keep, and each is a way the figure could otherwise have lied:

1. **The lexer is STATEFUL, not line-local — and EXACTLY TWO kinds of state cross a
   newline.** A block comment, and a JS **template literal**. Nothing else does: `"…"` and
   `'…'` cannot span a newline in either grammar, so they are line-local *by the grammar*
   rather than by approximation, and a backtick is a delimiter in JS only (in CSS it is an
   ordinary character, so carrying one there would swallow a stylesheet on a stray tick).
   `.vue` is lexed per top-level block — `<template>` as HTML, `<script>` as JS/TS,
   `<style>` as CSS — and a block boundary resets the carried template state.
   **THE TEMPLATE CARRY IS THE WHOLE BALLGAME AND IT WAS MISSING ON THE FIRST RUN** (§7,
   CURE-1): this repo keeps its GLSL and WGSL shaders in multi-line template literals, and
   those shaders are full of `//`. A shader line is inside a STRING, so the printed rule
   scores it CODE — and only cross-line state can see that. Without the carry the
   instrument contradicted its own printed rule by **1,517 lines at `c4dbf53b`** and by
   **1,489 at `4a86570b`**, and it contradicted it in the flattering direction.
2. **A line carrying code AND a trailing comment scores as CODE.** The line is
   load-bearing; scoring it as prose would flatter the ratio in the direction this wave is
   cutting.
3. **The corpus is TRACKED files only**, so untracked lane dirt cannot move the figure.
4. **`--rev <sha>` reads committed blobs through one `git cat-file --batch`.** ⊕⁷⁴'s L-1
   is the lesson: a figure measured on a four-lane shared working tree belongs to whichever
   lane last saved. The committed figure names its tree and is re-derivable by anyone,
   forever. The working-tree read stays, because the *gate* has to judge the bytes a build
   would ship.

**CROSS-VALIDATED, not asserted.** An independent Python scanner written against the same
rule, run over `src/styles/tokens/scheme-motion.css`, returns **282 non-blank / 196
comment** — byte-identical to the instrument's row for that file. The stronger validation
is the adversarial one: the adjudicator's independently written counterfactual reads
**32,849 comment / 52,856 code / 38.3%** at `c4dbf53b`, and the cured instrument in this
tree reproduces that triple **exactly**, to the line, at the same rev (§7 CURE-1).

**THREE APPROXIMATIONS ARE DECLARED IN THE FILE'S OWN HEADER**, and each is bounded rather
than merely admitted: **regex literals** are not lexed (the class is empty in practice — a
regex cannot contain a bare unescaped `//`, which is an empty regex followed by junk);
**`${…}` interpolation interiors** are read as string content, so a line lying wholly
inside one and carrying only a comment scores CODE — *measured*, not assumed, by
`--audit-interp`: the class is **0 lines** at `4a86570b`; **HTML attribute strings** are
not lexed as strings. An undocumented approximation in a detector is how a figure becomes
a lie — and an approximation that is documented in the header but *not* in the record is
the same lie with an extra step, which is what the first run shipped (§7 CURE-5).

**A DEFECT THE SHARED TREE FOUND, and the cure is a REPORTED figure, never a silent
skip.** Mid-run, lane γ deleted eight tracked `fourier-field` paths from the working tree;
`git ls-files` still listed them and the instrument crashed. Skipping them quietly would
let the denominator drift without a word, so the census now **counts them and prints
them**:

```
tracked-but-absent from the working tree, EXCLUDED from every figure above: 8
  src/components/fourier-field/composables/fourierFieldGLSetup.ts
  … 7 more
```

It is not an allowlist — the paths return the moment they are on disk, and a `--rev` read
cannot produce the class at all (a blob in the tree listing is a blob in the tree), which
is the second reason the committed figure is the one to quote.

### ACT 2 · The denominator, RE-DERIVED — and the two committed sites struck in place

`node scripts/comment-census.mjs --rev HEAD` at **`4a86570b`**, cured instrument, verbatim:

```
directory                    files  non-blank  comment    code   share
src/                           638      85144    32717   52427   38.4%
src/components/                451      55076    17619   37457   32.0%
src/components/dock/            43       7550     3929    3621   52.0%
src/styles/                     81      13848     8594    5254   62.1%
src/styles/tokens/              20       4211     3114    1097   73.9%

src @ HEAD: 638 files · 92412 raw · 85144 non-blank · 32717 comment · 52427 code · 38.4%
prose-class hits (tranche/wave/round/rule-obeyed/obituary): 276
commented-out declarations (G-DETECTOR-BLIND fuel): 0
```

**THE FIGURE MOVED TWICE AND THE TWO CAUSES ARE SEPARATED, because a single "re-measured"
would hide the one that matters.** The instrument was wrong (CURE-1) *and* the tree moved
(#53's fourier landing deleted 8 shader-bearing files; #49's aurora harness landed).
Holding one variable at a time:

| reading | files | raw | non-blank | comment | code | share |
|---|---|---|---|---|---|---|
| `TERMINAL-ROSTER`'s, 2026-07-28, no committed instrument | 660 | 86,899 | 80,117 | — | — | (39.4%) |
| ~~this unit's first run — `c4dbf53b`, UNCURED~~ | 639 | 93,002 | 85,705 | ~~34,366~~ | ~~51,339~~ | ~~40.1%~~ |
| the same tree `c4dbf53b`, CURED instrument | 639 | 93,002 | 85,705 | **32,849** | **52,856** | **38.3%** |
| `4a86570b`, CURED — the tree this cure was derived on | 638 | 92,412 | 85,144 | 32,717 | 52,427 | 38.4% |
| **`558c3fa3`, CURED — THE NEWEST COMMITTED READING** | **638** | **92,453** | **85,175** | **32,764** | **52,411** | **38.5%** |

The instrument alone accounts for **1,517 lines** at `c4dbf53b` (1,489 at both `4a86570b`
and `558c3fa3`) — every one of them a line of GLSL or WGSL inside a template literal, scored
as prose by a lexer whose own printed rule calls it code. The tree accounts for the rest,
and it moved twice more during the cure itself (§3's closing note).

**The file count fell because the detector is honest about its corpus**, not because 21
files were deleted: at `4a86570b` `git ls-tree -r HEAD -- src` returns exactly 357 `.ts` +
148 `.vue` + 133 `.css` + 0 `.mjs` = **638** of the declared extensions (639 at
`c4dbf53b`). 660 counted something the declared corpus does not.

Both committed sites carry **dated strike-in-place brackets, now TWO deep**, never a silent
overwrite: `TERMINAL-ROSTER.md:167` (row #17's own denominator + the `RED 39.4%` headline)
and `TERMINAL-ROSTER.md:372` (the `src` scale row). The 2026-08-10 bracket struck the
2026-07-28 figures; the **2026-08-12 CURE bracket strikes the 2026-08-10 numerator inside
it**, names the instrument defect as the cause, and separates it from the tree move. Every
struck figure stays legible with the command that re-derives its replacement.

**A DISTINCTION THIS UNIT HAD TO DRAW, stated rather than assumed.** Strike-in-place binds
*committed tranche text* — the two `TERMINAL-ROSTER.md` sites above, and this record.
It does **not** bind source comments: `WAVES.md:847` rules the opposite for them outright
— *"A comment states the contract, the invariant, or the trap. It does not state what the
code used to be, which tranche changed it, or that a rule was followed. History lives in
git."* A struck bracket inside a `.css` comment would be the very artefact the wave
deletes. Source prose is therefore re-authored, and the record is where the history goes.

### ACT 3 · The gate, bound under EXISTING seats — SEATS +0

`tests/gates/comment-ratio.test.ts`, **fifteen cases** (14 green + 1 `it.fails`) under two
already-seated names:

```
describe("G-COMMENT-RATIO — source is not a tranche document (BK #17)")
describe("G-MUTATION-BITE · DETECTOR-BLIND arm — prose cannot defeat a detector")
```

`G-COMMENT-RATIO` is a **§B.5 STRUCTURE seat**; `G-DETECTOR-BLIND` is a **declared ARM of
the HYGIENE seat `G-MUTATION-BITE`** (§B.5: `G-MUTATION-BITE (+DETECTOR-BLIND arm)`).
These file as close-battery rows under those names, exactly as #23's `G-RADIUS-ROLE`
executable, #28's dot-ring battery, #29's 27 route-grammar arms and β0's eight
`G-NO-FLASH` arms did. **Nothing minted, no `SEAT-BINDING.json` row moved, register
receipt byte-identical — §4.**

> **Routed, not taken.** `SEAT-BINDING.json` still declares `G-COMMENT-RATIO`
> `binding: "none"`. Promoting it to `seat-detector` would move `bound:13 → 14` and re-pin
> `gate-register.test.ts`. That is **#65's act**, and §B.5's own law is that *no seat is
> bound on the scan alone*. **RT-β1-A** carries it, joining RT-29A and RT-β0-A.

**NOTHING IN THE FILE HARD-CODES A RATIO.** A gate carrying its own copy of the number is
the third-regex disease J-10 was ruled against; the counter is the one detector and the
gate reads it.

**EVERY ARM'S NAMED MECHANISM BITES, PROVEN BY MUTANT AND NOT BY TITLE (§7 CURE-2).** The
adjudicator's finding was that an arm whose mechanism cannot fail is itself the
DETECTOR-BLIND class — so each row below names the mutant that kills it, and the
five-mutant transcript is §7. One title was *false* and is re-authored: the
`//`-inside-a-string arm passes with the string branch deleted (both its lines carry code
before the quote), so it never tested what it claimed. It now names the detector it truly
kills — the naive line-local `//` matcher — and the string branch gets the arm it actually
decides.

| arm | holds | killed by |
|---|---|---|
| `` a line-local `//` regex is defeated — `https://…` is CODE `` | the trap that defeats the naive "line contains `//`" matcher | (by construction; NOT the string branch — stated in the arm) |
| `` a `/*` inside a string does NOT open a block over the lines beneath it `` | the string branch's real job: no phantom block swallowing live code | **M3** — cut the `"…"`/`'…'` opener |
| `the interior of a multi-line template literal is CODE, ``//`` lines and all` | the cross-line carry, and 1,489 lines of the corpus figure | **M1 · M2** — cut the apparatus or the carry |
| `a phase id in a comment convicts` | `Φ\d`, the class that had a `\b` hole | **M5** — restore `\bΦ\d` |
| `a TOKEN obituary convicts in either order, and a live contract does not` | the obituary form + its false-positive fence | **M4** — cut the two token alternations |
| `block continuation lines are counted, and the closer with them` | `WAVES.md:847`'s own "block continuations counted" | |
| `a "…" string does NOT carry across a newline — only a template can` | the carry is bounded by the grammar it models | |
| `a line carrying code AND a trailing comment scores as CODE` | the flattering-classification refusal, executable | |
| `CSS has no // comment form — a bare url(//host/x) is CODE` | the per-language fence | |
| `an SFC is lexed per block` | template/script/style modes, and the tag lines as code | |
| `the census is internally consistent` | comment + code = non-blank; raw ≥ non-blank | |
| `the COMMITTED figure is derivable at a named revision` | two reads of `HEAD` agree exactly, `missing` empty — ⊕⁷⁴ L-1 made executable | |
| `REPO-WIDE ≤20% AND zero tranche/wave/round names` | **`it.fails`** — the routed residue, §3 | |
| `the convicting detector actually fires` | the kill-check: a synthetic `/* --dead-token: 3px; */` IS found, so the zero below cannot be a broken detector | |
| `src carries ZERO commented-out declarations` | the `G-DETECTOR-BLIND` fuel lock | |

**BORN-RED, on a scratch tree materialised by `git archive HEAD`** (`git init` + commit so
the instrument's `git ls-files` resolves). The gate's ceiling clause is **RED at HEAD**,
and the tree emits its figures itself — re-measured at `4a86570b` with the cured
instrument, not carried:

```
src @ 4a86570b: 638 files · 92412 raw · 85144 non-blank · 32717 comment · 52427 code · 38.4%
prose-class hits: 276        commented-out declarations: 0
→ share 38.4% > 20.0% ceiling · proseHits 276 ≠ 0        RED
```

**THE CURE MOVED THE RED IN BOTH DIRECTIONS, and neither direction is spun.** The share
fell (1,489 lines of shader stopped being counted as prose) and the prose-hit count ROSE:
at `4a86570b` the pre-cure pattern set reads **246** and the cured set reads **276**,
because the obituary class learned the token-obituary form it could not previously
convict (**+30**, measured by deleting the two alternations — mutant M4). Same instrument,
honest in both directions, RED either way.

**THE `G-DETECTOR-BLIND` FUEL LOCK IS *NOT* BORN-RED, and saying otherwise would be the
inflation this tranche keeps striking.** The class already reads **0** at HEAD.
`WAVES.md:847` convicted `G-3`/`G-4` on the 2026-07-28 tree; the bytes that convicted them
were landed out by the rows between. It is a **KEEP-DEAD regression lock on a corpus
property** — exactly the class #28 declared for its ripple/splash lock — and it ships with
the kill-check above so the zero is a measurement, not an absence of measurement.

### ACT 4 · A LIVE DETECTOR-BLIND DEFECT, found by this unit's own diet and CURED

The diet's first battery run turned `tests/styles/feedback-motion.test.ts` RED:

```
FAIL  #28's two refusals, made standing locks > REFUSES ripple/splash
AssertionError: expected '/* tokens/property-regs.css — §18 Hou…' to match
                /--ripple-radius — gone with the disco recipe/
```

**A gate was pinning an OBITUARY as evidence.** Its third assertion asserted that a
*sentence* existed in `property-regs.css`'s prose. That is the precise inverse of
`G-DETECTOR-BLIND`: a detector that reads a comment as a fact greens on prose and REDs when
prose is edited — which is exactly what happened. It is **re-homed onto the code fact it
was standing in for**, and the replacement is strictly stronger: `--ripple-radius\s*:`
cannot see a `@property --ripple-radius {` registration, which is the form the token would
actually return in.

The re-home then convicted the corpus — and was **itself** detector-blind:

```
expect(grepSrc(/@property\s+--ripple-radius\b/)).toEqual([])
  → [ "src/styles/tokens/scheme-motion.css" ]
```

The hit is an obituary in a comment. So both halves landed, which is the wave's actual
shape:

- **the detector** — `grepSrc` is now **comment-blind**, stripping `/* */`, `<!-- -->` and
  non-URL `//` before the verdict. `grep` names the candidates cheaply; the verdict is taken
  on live bytes. Every case in that file asks *"is this thing DECLARED"*, so every case must
  read declarations only. This is `G-DETECTOR-BLIND` applied to a real detector rather than
  asserted about someone else's.
- **the corpus** — the obituary is gone from `scheme-motion.css`, and what survives states
  the live contract: *ONE indeterminate clock in the library, shared with the Timeline. A
  press is the §6 scale beat, never an expanding ink circle.*

Both `it`s green, `22 passed (22)`.

**THE SAME CURE, TAKEN FURTHER AT THE ADJUDICATION (§7 CURE-4).** The obituary was cut from
the *detector's* path but survived in the corpus at `scheme-motion.css:114-116` — the
`--duration-sparkle` token obituary, in a file this very unit had dieted, in the exact
class the diet's own stated rule sends to git. It is now deleted (**−3 comment lines**),
and the census's `obituary` pattern — which convicted 31 *file* obituaries and could not
see a *token* one — was extended to convict the `--token … DELETED` form in either word
order. The rule and the corpus now agree, and the pattern is pinned by a fixture in both
directions (a live contract naming a token must NOT convict).

### ACT 5 · The diet — five files, −598 comment lines, ZERO declaration bytes moved

The band chosen is `src/styles/tokens/`: **`WAVES.md:847` names it the worst case by
name** ("the tokens are outnumbered three-to-one by commentary about the tokens", 73.9%),
it is wholly **unfenced**, and it was **clean in porcelain** at the moment of the edit —
checked, because `scheme-motion.css`'s mtime had moved under a concurrent lane even though
its content had not.

Re-measured at `4a86570b` (these five files are untouched between `c4dbf53b` and
`4a86570b` — `git log c4dbf53b..HEAD -- src/styles/tokens/` is empty — so the HEAD column
is stable across the tree move; only the scheme-motion row moved, by CURE-4's −3):

| file | HEAD comment/non-blank | now | Δ comment | code |
|---|---|---|---|---|
| `tokens/sizing.css` | 480/569 | 204/293 | **−276** | 89 → **89** |
| `tokens/glass.css` | 274/349 | 183/258 | **−91** | 75 → **75** |
| `tokens/property-regs.css` | 265/390 | 157/282 | **−108** | 125 → **125** |
| `tokens/glass-fx.css` | 254/308 | 142/196 | **−112** | 54 → **54** |
| `tokens/scheme-motion.css` | 196/282 | 185/271 | ~~**−8**~~ **−11** | 86 → **86** |
| **total** | **1,469/1,898** | **871/1,300** | ~~**−595**~~ **−598** | **429 → 429, unchanged** |

`src/styles/tokens/` moves **3,114/4,211 = 73.9% → 2,516/3,613 = 69.6%**.
**Prose-class hits in the band: 40 → 26** — 15 convicting lines cut, 1 re-authored line
still convicting (`sizing.css:3`, `byte-isomorphic`), net **−14**, of which the
`--duration-sparkle` obituary is CURE-4's one.

**EVERY FILE'S DECLARATIONS ARE BYTE-IDENTICAL TO HEAD, verified per file, not claimed:**

```
diff <(git show HEAD:$f | perl -0pe 's{/\*.*?\*/}{}gs' | grep -v '^\s*$' | sed 's/^[ \t]*//;s/[ \t]*$//') \
     <(perl -0pe 's{/\*.*?\*/}{}gs' $f      | grep -v '^\s*$' | sed 's/^[ \t]*//;s/[ \t]*$//')
→ PARITY OK ×5
```

A comment diet that silently drops a declaration is its catastrophic failure mode, so the
check is mechanical and runs on every file. **Re-run at `4a86570b` after CURE-4's deletion:
PARITY OK ×5 again** — the sparkle obituary was comment bytes, so no declaration moved.

**THE RULE APPLIED, stated so the remaining lanes can apply the same one.** KEEP the
contract, the invariant, the trap, and any derivation the value cannot recover (`φ^(−1/4) =
0.886653`; `1.272 / 2.5 = 0.5088`; the space-series pairing law; the `light-dark()` inset
trap; the substitution-vs-inheritance trap; the WebKit black-premultiply trap; the
no-double-vw reconcile). CUT rationale narration, "the old X is struck", audit-round ids,
"byte-identical to today", "the user's finding", and every obituary for a token that no
longer exists.

**ONE COMMENT WAS A LIE AND THE DIET REPAIRED IT** rather than shortening it:
`glass-fx.css` described `--paper-grain-opacity` as "~3× the glass grain". On disk it is
`0.21` against `0.025` — **8.4×** exactly, not approximately. The prose had drifted from
its own token and now states the measured ratio. That is the class `WAVES.md:847` predicted
("the prose is where the lies live"), found by re-reading rather than by grep. **Verified
on disk at the adjudication (§7 CURE-5), because a record and a comment quoting the same
ratio in two different roundings is the same defect in miniature:** `glass-fx.css:11` reads
`(8.4× the glass grain)` and `git show HEAD:` reads `(~3× the glass grain)` — record and
source agree on **8.4×**, and `0.21 / 0.025 = 8.4` closes it.

---

## 2 · WHAT THIS UNIT REFUSED, with grounds

1. **Driving the repo-wide ratio to ≤20% in this unit — REFUSED AS ARITHMETICALLY
   IMPOSSIBLE FOR ONE LANE, and the arithmetic is §3.** It is not a scheduling excuse; the
   number is derived and it is the most useful thing this row hands the batch.
2. **Mass-stripping comments to hit the number.** `WAVES.md:847` protects load-bearing
   fence/provenance comments explicitly, and the traps enumerated in ACT 5 are precisely
   what a mechanical strip destroys. A ratio bought by deleting the `light-dark()` inset
   trap is a worse library with a better metric.
3. **The `SEAT-BINDING.json` promotion** — #65's act. RT-β1-A.
4. **Auditing all 65 source-scanning gate files for `G-DETECTOR-BLIND`.** Measured: **29
   carry no block-comment strip**, and most read text where the question does not arise. A
   65-file register is the apparatus `gate-register.mjs`'s own header warns against. The
   arm removes the FUEL instead, and ACT 4 cured the one live instance the diet actually
   surfaced — which is worth more than a register nobody re-runs.
5. **#21 / β2.** Out of this run's scope by the driver's order; not started, not touched.
6. **Any file under another lane's fence**, and `src/styles/glass/material.css` — landed
   attributed but still not a lane surface. §5.

---

## 3 · THE ≤20% CEILING IS A WHOLE-CORPUS OUTCOME — the budget, derived

> **RE-DERIVED 2026-08-12 UNDER THE CURED INSTRUMENT AT `4a86570b`. THE STRUCK TABLE BELOW
> IS THE ONE OTHER LANES WERE ABOUT TO EXECUTE, AND IT OVERSTATED LANE γ's CUT BY 2×.**
> The first run's numerator counted 1,392 lines of γ's GLSL/WGSL shader text as prose, so
> γ read `5,853 / 37.8%` and owed `3,450`. Under the instrument's own printed rule those
> lines are CODE. **γ owes 1,826 at `4a86570b`** — and, at the tree the struck table was
> taken on, `c4dbf53b`, it owed **1,710** (the adjudicator's independently derived figure,
> reproduced exactly). The difference between 1,826 and 1,710 is #49's aurora-harness
> landing, not the instrument. **No lane executes the struck row.**

| ~~band~~ | ~~comment / non-blank~~ | ~~share~~ | ~~budget @20%~~ | ~~cut owed~~ |
|---|---|---|---|---|
| ~~lane α — `dock/` + `search/`~~ | ~~4,005 / 8,031~~ | ~~49.9%~~ | ~~1,006~~ | ~~2,999~~ |
| ~~lane γ — `aurora/` `blob/` `handmark/`~~ | ~~5,853 / 15,466~~ | ~~37.8%~~ | ~~2,403~~ | ~~3,450~~ |
| ~~lane δ — `configurator/`~~ | ~~860 / 1,630~~ | ~~52.8%~~ | ~~192~~ | ~~668~~ |
| ~~lane β — `composables/dark/` + `_shared/feedback/`~~ | ~~465 / 742~~ | ~~62.7%~~ | ~~69~~ | ~~396~~ |
| ~~UNFENCED — β1 + batch close~~ | ~~23,183 / 59,836~~ | ~~38.7%~~ | ~~9,163~~ | ~~14,020~~ |
| ~~**`src` TOTAL**~~ | ~~**34,366 / 85,705**~~ | ~~**40.1%**~~ | ~~**12,834**~~ | ~~**21,532**~~ |

The gate reads `comment / non-blank` over **all of `src`**, so no lane can green it alone.
Removing comments shrinks the denominator too, so the budget is not `20% × non-blank`: with
a band's CODE held fixed, `c / (c + code) ≤ 0.2` gives **`budget = ⌊code / 4⌋`**. With code
at 52,411 the ceiling permits **13,102** comment lines against **32,764** today — a
**19,662-line cut, 60.0% of every comment in `src`.**

**THE LIVE TABLE — `558c3fa3`, cured instrument. This is the row a lane executes:**

| band | comment / non-blank | share | budget @20% | cut owed | that band's own % |
|---|---|---|---|---|---|
| lane α — `dock/` + `search/` | 4,052 / 8,062 | 50.3% | 1,002 | **3,050** | 75.3% |
| lane γ — `aurora/` `blob/` `handmark/` | 4,588 / 15,638 | 29.3% | 2,762 | **1,826** | 39.8% |
| `fourier-field/` (landed at `4a86570b`, #53) | 472 / 2,032 | 23.2% | 390 | **82** | 17.4% |
| lane δ — `configurator/` | 860 / 1,630 | 52.8% | 192 | **668** | 77.7% |
| lane β — `composables/dark/` + `_shared/feedback/` | 465 / 742 | 62.7% | 69 | **396** | 85.2% |
| UNFENCED — β1 + batch close | 22,327 / 57,071 | 39.1% | 8,686 | **13,641** | 61.1% |
| **`src` TOTAL** | **32,764 / 85,175** | **38.5%** | **13,102** | **19,662** | **60.0%** |

It cross-foots exactly on the two measured columns — comment `4,052 + 4,588 + 472 + 860 +
465 + 22,327 = 32,764`, non-blank `8,062 + 15,638 + 2,032 + 1,630 + 742 + 57,071 = 85,175`.
The per-band budgets sum to **13,101** against the corpus budget **13,102**: flooring six
bands loses one line, and it is stated rather than smoothed.

**THE TREE MOVED AGAIN WHILE THIS CURE WAS BEING WRITTEN — and the table is honest about
which rows that touched.** `HEAD` went `4a86570b → 558c3fa3` (lane α's #47 W1 dock strike)
between the re-derivation and the verify pass. Re-measured at both: **every row is
byte-identical except lane α's own** (`4,005 / 8,031`, cut `2,999` at `4a86570b` →
`4,052 / 8,062`, cut `3,050` at `558c3fa3`) and the totals that carry it. **γ's cut owed is
`1,826` at both revs**, and at `c4dbf53b` it was `1,710` — so the load-bearing correction
is the instrument's, not the tree's, exactly as CURE-1 claims. This is also §3's own point
made a fourth time: the close reading is taken ONCE, at the close SHA.

Three things follow, and all three are load-bearing for the close:

1. **The per-band cut is NOT uniform, and the first run's "every lane cuts ~63%" was an
   artefact of the miscount.** The real instruction is the column above: α **75.3%**, δ
   **77.7%**, β **85.2%**, unfenced **61.1%** — and γ only **39.8%**, because a third of
   what looked like γ's prose is shader source. The 1,392 flipped lines are still
   *dietable*, but only by editing GLSL/WGSL comment text inside the template literals,
   which is a different act from cutting CSS narration and should be scheduled as one.
2. **A total strip of the unfenced corpus would clear the ceiling with room** — 32,764 −
   22,327 = **10,437** against a 13,102 budget, share **16.6%** — but that is not a plan,
   it is the arithmetic's way of saying the unfenced band is where the cut has to land.
   §2.2 refuses the strip: the traps and derivations there are exactly what a mechanical
   strip destroys. The per-band rows are the instruction; this line is only the bound.
3. **The reading is taken once, at batch close, on the committed tree** —
   `node scripts/comment-census.mjs --rev <close-sha>`. A working-tree reading during a
   four-lane batch is ⊕⁷⁴'s L-1 all over again, and this unit already caught the tree
   moving under it twice — then a third time, between its own run and its adjudication.

Re-derive any row: `node scripts/comment-census.mjs --per-file` (share-ranked),
`--prose` (the hit list with file, line and class), `--dead`, `--json`.

---

## 4 · VERIFY — real exit codes, never a piped tail's

**RE-RUN IN FULL AFTER THE CURES, on 2026-08-12 in the window `12:14–12:18-0400` at HEAD
`558c3fa3`. No row is carried from the first run; every exit below is `$?` taken directly,
never a pipeline's tail.**

> **THE WINDOW IS PART OF THE READING, and a later one is already contaminated.** A
> re-verify at **12:20** — minutes after the table below — returns `vue-tsc 2` and
> `72 failed | 1756 passed`, and **none of it is β1's**: every failure names a dock surface
> (`GlassDock.*`, `DockLayerSwitcher`, `dock-hold-contract`, `boot-graph`) and every
> `vue-tsc` error resolves to `src/components/dock/**` or `demo/stories/dock/**`, against
> `src/components/dock/composables/useDockState.ts` and `constants.ts` whose mtimes are
> **12:19:58** and **12:20:24** — lane α's #47 edits, live in the shared tree, mid-write.
> **Zero failures name a β1 surface**, checked by grep rather than by eye. β1's own suites
> re-run clean inside the contaminated window: `comment-ratio` exit 0 (`14 | 1 xf`) and
> `feedback-motion` exit 0 (`22`). This is ⊕⁷⁴'s L-1 in its live form — a battery figure
> taken on a four-lane working tree belongs to whichever lane is typing, which is exactly
> why the census reads `--rev` and why the close reading is taken once, on a commit.

| command | real exit | figure |
|---|---|---|
| `npx vue-tsc --noEmit` | **0** | clean |
| `npx vue-tsc --noEmit -p tsconfig.test.json` | **0** | clean (both `npm run typecheck` arms) |
| `npx vitest run tests/gates/comment-ratio.test.ts` | **0** | `14 passed \| 1 expected fail (15)` — was `9 \| 1`; +5 arms, four of them the cure's |
| `npx vitest run tests/styles/feedback-motion.test.ts` | **0** | `22 passed (22)` — ACT 4, unchanged by the cure |
| `npx vitest run tests/styles tests/components tests/gates tests/composables` | **0** | `206 files passed · 1828 passed \| 7 expected fail (1835)` — **fully green**; the one failure of the run before it was `boot-graph`, and a foreign lane's rebuild cleared it between the two runs. Both readings are recorded below rather than only the green one |
| `npx vitest run tests/public-surface.spec.ts` | **0** | **87 passed (87)** — unchanged |
| `node scripts/gate-register.mjs` | **0** | the receipt below |
| the five-mutant kill battery (scratch tree) | **1 ×5, 0 control** | §7 CURE-2 — every mutant killed by the arm that names it |

**RECEIPT — BYTE-IDENTICAL to the standing line, re-taken after the cures, stated in full:**

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**SEATS +0.** No figure moved, so no act is owed against one. The four cure arms are cases
inside an existing file under two already-seated names; a case is not a seat.

**TWO BATTERY FIGURES MOVED, and each is named with its act.**

- **`6 expected fail` → `7`.** **Not β1's.** β1's one `it.fails` is ACT 3's routed residue
  (`REPO-WIDE ≤20% AND zero tranche/wave/round names — OWED AT BATCH CLOSE`) and it was
  already inside the standing 6 at the adjudication. The seventh arrived with a concurrent
  lane's untracked `tests/components/custom/blob/gl-excise.test.ts`. β1's own residue keeps
  the `layout-canon.test.ts` form verbatim: *"they are RED right now, on purpose, and each
  names the row that owns the bytes. When that row lands, the case goes GREEN and the
  `.fails` must come off in the same commit — a residue list that cannot shrink is a
  permission slip."* Both of `G-COMMENT-RATIO`'s clauses ride ONE case deliberately, so the
  standing figure moves by one and not by two.
- **`1816 passed` → `1828`.** **+3 are β1's** — the phantom-block arm, the phase-id arm and
  the token-obituary arm, all added by the cure. The other **+9** arrived with #53's fourier
  landing and #47 W1's dock strike between the adjudication and this run, one of them
  `boot-graph` itself flipping green.

**`boot-graph` IS BATCH-LEVEL, IT WENT GREEN WITHOUT β1 TOUCHING IT, AND ~~THIS TIME THE
TRIP IS β1's~~ WAS WRONG — the correction is stated rather than left standing.** At the
first verify pass of this cure it was still RED, on a foreign edit:**

```
FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm
     dist-demo/index.html is STALE (built 2026-08-10T18:30:39.541Z,
                                    newest source 2026-08-12T16:03:52.867Z)
newest source at measurement: demo/chassis/hero/story-hero.css   ← a foreign lane's demo/ edit
```

Verified rather than assumed: `find src demo -newermt "2026-08-12 11:53"` returned exactly
two paths, `demo/chassis/hero/story-hero.css` and `demo/chassis/page/StoryPage.vue`, and β1
has never opened a `demo/` file. **At the final verify pass minutes later the same arm is
GREEN**, because a foreign lane ran the rebuild — β1 changed nothing between the two runs.
The gate walks all of `src/` and `demo/` and takes `max(mtime)`
(`boot-graph.test.ts:545-553`), so **any** lane's edit trips it and any lane's rebuild
clears it: RED at step 0 on lane γ's bytes, RED on β1's `scheme-motion.css` at the first
run, RED on a foreign `demo/` edit at this cure's first pass, GREEN at its last. **A gate
whose colour is a race between four lanes is a batch-close reading, and that is the point —
its remedy, `npm run demo:dist:build`, belongs to batch close, and a rebuild from this lane
would be obsolete at the next lane's save.** Stated, not papered over, in both colours.

**`G-BUNDLE-RATCHET` STANDS RED BY ROUTE, LAWFULLY.** `npm run verify:package`'s ratchet
arm REDs because the single batch-close rebind carries β0's `+1,215` and the driver's
`−71`. β1 adds **zero** to it: this unit touched no `src/` declaration byte and no
`.d.ts` surface — the five CSS files are comment-only (ACT 5's parity check) and the two
new files are `scripts/` and `tests/`, neither of which the bundle contains. **RT-β0-B is
unchanged by this unit.**

---

## 5 · FENCE — re-hashed, not asserted

| surface | verdict |
|---|---|
| `src/styles/glass/material.css` (landed attributed, still not a lane surface) | `d383ab0166db9398…` · **clean in porcelain**, never opened |
| `tests/styles/material-css-syntax.test.ts` (tracked since `2cfc1124`) | **clean in porcelain**, never opened |
| lane α — `src/components/dock/`, `search/` | **UNTOUCHED** |
| lane γ — `aurora/`, `blob/`, `handmark/`, `fourier-field/` | **UNTOUCHED** (γ's own edits + 8 deletes are foreign dirt, reported by the census, §1 ACT 1) |
| lane δ — `src/components/configurator/`, story SFCs | **UNTOUCHED** |

β1's paths, and only these:

```
scripts/comment-census.mjs                                          (new)
tests/gates/comment-ratio.test.ts                                   (new)
tests/styles/feedback-motion.test.ts                                (ACT 4)
src/styles/tokens/{sizing,glass,property-regs,glass-fx,scheme-motion}.css   (ACT 5)
docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md    (ACT 2, struck in place)
docs/tranches/BK/execution/2026-08-10-lanebeta-unit2/                (this record)
```

Digests **re-taken 2026-08-12T12:17:49-0400, after the last cure byte** (the first run's
`aee855399c6657a7…` / `a52a5bafe9866681…` / `46bd1ac6f1787305…` are superseded — the cure
edited the census, the gate, `scheme-motion.css` and `TERMINAL-ROSTER.md`):

```
restricted diff -U3 over β1's tracked paths   cd02c9655f97038c46243bab63b920869f01bcf7…
scripts/comment-census.mjs                    cdef15cfe25bae9c275ba1f98e10404a761e4e01…
tests/gates/comment-ratio.test.ts             6c951c8f4c7b34741f17c0816d6674be81f6c778…
src/styles/glass/material.css (fence)         d383ab0166db9398022fb7f2470b38d31683bdef…  ← unchanged
```

**PORCELAIN IS A SAMPLE AT AN INSTANT, NEVER A PROPERTY — and this is the run that proves
it.** ~~1 → 54~~ at the first run's instant; **22 at 2026-08-12T12:06:48-0400** and **18 at
2026-08-12T12:17:49-0400**, eleven minutes later — falling, because concurrent lanes' work
is being COMMITTED (#53's fourier landing, #49's aurora harness, #47 W1's dock strike), not
because anything was reverted. Any porcelain count in this record is timestamped or it is
meaningless. Of the 18, **ten are β1's** — the nine paths above plus this record's
directory — and the rest are foreign. **The index carries no staged entry at this instant**
(the `RM` below has landed).

**THE INDEX WAS TOUCHED — NOT BY THIS SEAT.** At the first run `git status` reported
`RM tests/components/custom/fourier-field/FourierField.smoke.test.ts -> tests/components/fourier-field/FourierField.smoke.test.ts`,
an `R` in the index column. **This seat ran no `git add`, `commit`, `stash` or `checkout` at
any point**; the staged rename was lane γ's and has since landed in `4a86570b`. It is
recorded here because a driver reading a dirty index at commit time must know whose it is.

---

## 6 · ROUTED OUT OF THIS UNIT

- **RT-β1-A** — the `G-COMMENT-RATIO` register bind (`bound:13 → 14`) → **#65**, joining
  the unspent RT-29A and RT-β0-A. A third live-name file now stands behind that route
  (`tests/gates/comment-ratio.test.ts`).
- **RT-β1-B** — **the remaining diet, with its budget**: §3's per-band table, **as
  re-derived at `4a86570b` under the cured instrument**. Each lane cuts its own band; the
  UNFENCED remainder (**13,641** lines owed after β1's −598) is the batch's. ~~14,020 after
  −595~~ — struck with the instrument that produced it. → **the four lanes + batch close.**
- **RT-β1-C** — the **repo-wide ≤20% + zero-prose-hits reading** → **BATCH CLOSE**, taken
  once on the committed tree (`--rev <close-sha>`), and the `it.fails` comes off in the same
  commit that greens it.
- **RT-β1-D** — the **29 source-scanning gate files with no comment strip** (§2.4). Not a
  register and not an allowlist: the class is closed by ACT 4's pattern — cure a detector
  when the diet actually convicts it. → **unclaimed, evidence banked here.**
- **RT-β1-E** — `boot-graph`'s `npm run demo:dist:build` → **batch close** (unchanged from
  β0's finding; re-confirmed as batch-level — it went RED on a *foreign* `demo/` edit and
  GREEN again on a *foreign* rebuild inside this cure's own verify window, β1 touching
  neither. §4's correction).
- **RT-β1-F** — **ACT 4's comment-blind `grepSrc` is itself approximate, in two opposite
  directions, and neither is fuel today.** Routed by the adjudicator as NOT-BLOCKING, banked
  here rather than left to be re-discovered. **(a)** `feedback-motion.test.ts:386`'s block
  strip is *string-blind*: `/\/\*[\s\S]*?\*\//g` deletes from the first `/*` in a file to
  the first `*/`, wherever they lie, so a live declaration containing `/*` inside a string
  could be stripped and a KEEP-DEAD lock could false-GREEN. That is the **masking**
  direction, and it is the dangerous one. **Bounded, not waved off:** an over-approximate
  probe at `4a86570b` — every `/*…*/` span whose opener sits after an odd number of unescaped
  quotes on its line — returns **4 sites**, all of them the literal marker text `` `/* glsl
  */` `` / `` `/* wgsl */` `` inside a `//` line comment in the four shader-module headers,
  each self-closing on its own line. So the strip removes comment bytes only: **fuel 0,
  latent 1**. It is the same defect class the census cured in
  itself (§7 CURE-2's M3 arm), one level down. **(b)** `:348` reads `PROPERTY_REGS` raw, so
  a future *prose* mention of `@property --ripple-radius` in `property-regs.css` would
  false-RED — the **safe** direction, but doctrine-inconsistent with the file's own stated
  rule that every case reads declarations only. → **unclaimed; whoever next opens that file
  makes both reads go through one comment-blind seam.**

---

## 7 · THE ADJUDICATION AND THE CURES — found-state → act, per cure

The adjudicator returned **CURE-REQUIRED** on 2026-08-10 with acts 2-5 sustained
(parity-verified diet, exact fence, SEATS +0 honest, dated strikes) and the unit's
**central deliverable failing its own stated law**: the instrument's printed rule says a
line inside a string is CODE, and the instrument did not implement it. What follows is the
cure ledger — what was found on disk at the completion seat's open, and what it did.

**THE FIRST SEAT DIED AT A SESSION WALL MID-CURE.** Its partial writes were in the working
tree and are this unit's own prior work, not foreign dirt. Everything below was re-verified
against the bytes on disk rather than against its report, and every figure was re-measured
at the CURRENT `HEAD` (`4a86570b`) rather than carried from a run taken at `c4dbf53b`.

### CURE-1 · the cross-line template state — **found LANDED, verified, figures re-derived**

**Found:** `classify` threads a `quote` through `scanLine` and back
(`comment-census.mjs:112`, `:142-146`), with the exit clause
`quote: quote === "`" ? "`" : null` — only a backtick survives a newline, which is the
grammar. The header states the mechanism at `:28-49`.

**Verified, not accepted:** the cured instrument reproduces the adjudicator's independently
written counterfactual **exactly** at the tree he ran it on —
`32,849 comment / 52,856 code / 38.3%` at `c4dbf53b`, and his γ row `4,461 / 15,466` to the
line. Two instruments written from the same printed rule by two seats that never shared
code agreeing to the unit is the strongest evidence available here that the rule is now
what the figure measures.

**Completed:** every downstream figure re-derived — §1 ACT 2's denominator, §3's budget
table, both `TERMINAL-ROSTER` strikes. **The γ cut-owed figure other lanes execute at batch
close is `1,826`, identical at `4a86570b` and at `558c3fa3`** (`1,710` at `c4dbf53b`, the
adjudicator's number, reproduced) — **not the recorded `3,450`**, which double-counted
1,392 lines of shader as prose. The shader flip is `1,392` for γ at every one of the three
revs, which is what a real corpus property looks like next to an instrument artefact.

### CURE-2 · the gate arm must bite — **found HALF-LANDED, extended, mutant-verified**

**Found:** the template-interior fixture existed (`comment-ratio.test.ts:44-65`). **Not
found:** any arm the *per-line quote branch* decides — and the adjudicator's charge was
precisely that an arm whose named mechanism cannot fail is itself the DETECTOR-BLIND class.

**Two defects the completion seat found by mutating rather than by reading.** (i) The
arm titled *"a `//` inside a string literal is CODE"* **passes with the entire string
apparatus deleted** — both its lines carry code before the quote, so they score CODE either
way. The title was false; it is re-authored to name what it truly kills (the naive
line-local `//` matcher) and says so in the arm. (ii) The `"…"`/`'…'` opener decides **no
verdict on this corpus** (deleting it moves the figure by 0), but it is *not* dead code: it
stops a `/*` inside a string from opening a phantom block that swallows the live lines
beneath it. That is now an arm.

**THE FIVE-MUTANT BATTERY — run in a scratch tree, transcript verbatim.** The tree is
`git archive HEAD` + β1's working-tree files + `git init`/commit (so the instrument's
`git ls-files` resolves), `node_modules` symlinked, census script byte-identical to the
shared tree's (`cmp` verified). **The shared tree was never mutated.**

```
══════ CONTROL (cured instrument, unmutated) ══════
      Tests  14 passed | 1 expected fail (15)
REAL EXIT: 0
══════ MUTANT M1 · whole string apparatus deleted ══════
     × a `/*` inside a string does NOT open a block over the lines beneath it
     × the interior of a multi-line template literal is CODE, `//` lines and all
AssertionError: expected 1 to be +0 // Object.is equality
AssertionError: expected 3 to be 5 // Object.is equality
      Tests  2 failed | 12 passed | 1 expected fail (15)          REAL EXIT: 1
══════ MUTANT M2 · cross-line template carry cut ══════
     × the interior of a multi-line template literal is CODE, `//` lines and all
      Tests  1 failed | 13 passed | 1 expected fail (15)          REAL EXIT: 1
══════ MUTANT M3 · per-line "…"/'…' opener cut ══════
     × a `/*` inside a string does NOT open a block over the lines beneath it
      Tests  1 failed | 13 passed | 1 expected fail (15)          REAL EXIT: 1
══════ MUTANT M4 · token-obituary alternations cut ══════
     × a TOKEN obituary convicts in either order, and a live contract does not
AssertionError: expected [] to deeply equal [ 'obituary' ]
      Tests  1 failed | 13 passed | 1 expected fail (15)          REAL EXIT: 1
══════ MUTANT M5 · \bΦ\d word-boundary restored ══════
     × a phase id in a comment convicts — the class that had a hole
AssertionError: expected [] to deeply equal [ 'wave-id' ]
      Tests  1 failed | 13 passed | 1 expected fail (15)          REAL EXIT: 1
```

**5/5 killed, each by the arm whose title names the mechanism, none by a bystander.** The
corpus figure moves with the lexer mutants and not with the pattern mutants, which is the
right shape: `32,717 → 34,206` comment (`38.4% → 40.2%`) under M1 and M2 identically —
identical because the per-line branch is verdict-inert and the CARRY is what does the work,
the adjudicator's finding confirmed from the other side.

### CURE-3 · the `Φ\d` detector — **found LANDED, and honestly bounded**

**Found:** `comment-census.mjs:364` reads `Φ\d`; `/\bΦ\d/.test("Φ4")` is `false` and
`/Φ\d/.test("Φ4")` is `true`, verified at the node prompt. **Completed:** the movement is
stated rather than implied — **0 lines** at `4a86570b` (`grep -rn "Φ[0-9]" src` returns
nothing), so this is a **KEEP-DEAD lock inside the batch-close `proseHits === 0` clause**,
not a cut. A pattern that convicts nothing is indistinguishable from a pattern that cannot
fire, so it now carries a fixture that separates them (killed by M5).

### CURE-4 · the sparkle obituary and the obituary pattern — **found LANDED, measured**

**Found:** `scheme-motion.css:114-116`'s `--duration-sparkle` obituary is gone from the
working tree; `PROSE_CLASSES`' obituary row carries the two token alternations. **Completed
— the figures, which the dead seat never banked:** the deletion is **−3 comment lines** in
`scheme-motion.css` (−8 → **−11** for that file, −595 → **−598** for the diet) and
**−1 prose hit**; the pattern extension is **+30 prose hits at `4a86570b`** (276 with the
alternations, 246 without — mutant M4). **Prose in the β1 band: 40 → 26**, being 15
convicting lines cut and 1 re-authored line still convicting. Declaration parity re-run
after the deletion: **PARITY OK ×5**.

### CURE-5 · the record's own arithmetic and mechanism — **found NOT DONE, completed**

| defect | found | act |
|---|---|---|
| §3 `34,366 − 23,183 = "11,261"` | on disk, wrong (true 11,183 — it cross-foots the fenced-band sum) | the whole §3 re-derived, and the sentence it served with it — a total unfenced strip reads **10,390 / 13,106 budget / 16.5%** at `4a86570b` and **10,437 / 13,102 / 16.6%** at `558c3fa3`. The budget column's formula is corrected too: `⌊code/4⌋`, not `20% × non-blank`, because a cut shrinks the denominator |
| property-1 "carries string, template and block state across lines" | on disk, false | re-authored to the true mechanism: **exactly two** states cross a newline (block, template); `"…"`/`'…'` are line-local **by the grammar** |
| "ONE APPROXIMATION IS DECLARED" | on disk, false — the header declares three | re-authored to all three, each bounded (`--audit-interp` reads **0** at `4a86570b`) |
| `8.4×` vs on-disk `~8×` at `glass-fx.css:11` | on disk it reads **`8.4×`** — the first seat had already moved the CSS | verified rather than assumed: `0.21 / 0.025 = 8.4`, record and source agree, closed |
| foreign-dirt enumeration stated as a property | on disk, untimestamped | §5 now states porcelain as a **sample at an instant**, with two instants eleven minutes apart — **22 at 12:06:48-0400, 18 at 12:17:49-0400** — falling because concurrent lanes are landing, not because anything reverted |
| the `boot-graph` trip attributed to β1 | on disk, no longer true | §4 re-attributes it to a foreign `demo/` edit, verified by `find -newermt`; it then went GREEN on a foreign rebuild inside the verify window. Both colours recorded, old claim struck in place |
| `HEAD` moved twice mid-cure (`4a86570b` → `558c3fa3`) | — | every figure re-measured at both; §3 states which rows moved (only lane α's own) and which did not (γ's `1,826`, the load-bearing one) |

### What the batch takes from this

**The reading at batch close is taken with the CURED instrument, and the budget rows other
lanes execute are §3's live table — not the struck one.** A figure and its detector are one
artefact: when the detector moves, every quotation of the figure moves with it, in place,
with the cause named. That is J-10's rule applied to J-10's own instrument, which is the
only way it was ever going to be tested.

**Adjudicator instruments** (`census-fixed.mjs`, `census-noquote.mjs`, orig/fixed per-file
JSON) and this seat's five mutants + `rollup` scripts are preserved in the session
scratchpad, re-runnable by anyone against `c4dbf53b` and `4a86570b` respectively. They are
scratch by design: the committed instrument is `scripts/comment-census.mjs` and the
committed proof is `tests/gates/comment-ratio.test.ts`.
