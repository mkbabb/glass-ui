# Lane C2 — B-7 (the sidebar ramp light stops) · C-1 cure half (the dead tone glyph)

**Seat** implement · **model** `claude-opus-5[1m]` (read from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_4cc3afc1-169/agent-ab4b5f1bee99e5f6a.jsonl`
— `"model":"claude-opus-5"`, `"modelId":"claude-opus-5[1m]"`; the file was located by
grepping the workflow subagent tree for a phrase unique to this lane's prompt, "sidebar
ramp light-stop retune") · **date** 2026-09-17 · **base** `master` @ `46ab4124` ·
**spec of record** `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`
§B-7 and §C-1 · **seat evidence** `investigate__asks-surface.json` /
`verify__asks-surface.json` (B-7), `investigate__question-alert.json` /
`verify__question-alert.json` (C-1), all four read in full.

The id assertion gates the chain with `&&`: `grep -q '"modelId":"claude-opus-5\[1m\]"'
<transcript> && echo "MODEL-GATE OK claude-opus-5[1m]" && cd <repo> && git status
--porcelain && git diff --stat && git rev-parse HEAD`. The step-0 baseline is the tail of
that one gated command.

## Step-0 baseline

`git status --porcelain` at first byte, before anything this lane wrote — **empty**, no
output at all. `git diff --stat` — **empty**. `git rev-parse HEAD` =
`46ab412403efaadfac9350a0e0f6bf35b82f23f6`.

Register receipt read at baseline, before the change:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Census

| file | + | − | note |
| --- | --- | --- | --- |
| `src/styles/tokens/color-radius.css` | 25 | 12 | the four light stops retuned + the ramp's headnote + one struck stale claim; CURE ROUND 1 scrubbed the twelve live per-rung figures back out |
| `src/styles/tokens/light-dark.css` | 13 | 5 | the same four values in the `light-dark()` light arm + the one-ramp-two-files note (figure-free after CURE ROUND 1) |
| `src/components/alert/index.ts` | 11 | 1 | `[&>svg]:text-current` deleted from BASE + the derivation above it |
| `tests/styles/contrast-computed.test.ts` | 96 | 2 | new §6 (13 rungs + the library's own reader + the two-file lockstep); the engine block renumbered §6 → §7; CURE ROUND 1 enrolled the lane's own strike in §5 |
| `tests/components/ui/alert/Alert.test.ts` | 28 | 1 | new `Alert tone channel` describe; the import line gains `alertVariants` |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/C2/` | new | — | this record, the two witness PNGs, the witness builder (its two ordering probes repaired under adjudication in CURE ROUND 1 — as first banked they matched nothing and printed `-1`) |

Alert's unit lives at `tests/components/ui/alert/Alert.test.ts`, not the
`tests/components/alert/` the fence named as a fallback; the fence said to prefer the
existing location and this one exists, so no new directory was made.

`glyph-witness.build.mjs` sits in this lane's directory beside the PNGs. The fence names
"RECORD + any screenshot evidence PNGs"; the builder is the method behind those PNGs and
the pages are otherwise unreproducible once the session scratchpad is gone, so it is
banked here rather than described. It is not wired to anything and nothing imports it.

Zero published bytes move for the docs: `package.json` `files: ["dist"]`, and neither
`docs/` nor `tests/` ships. The three `src/` files DO ship, and all three change paint on
purpose — that is the item.

## Act ledger

### B-7 · sidebar ramp headroom — LIVE → CURE-NOW. DONE.

**Re-derived before a value was touched.** Own script, written off the CSS Color 4 and
WCAG 2 formulas rather than imported from the gate (oklch → OKLab → LMS → linear sRGB,
per-channel gamut clamp, WCAG relative luminance), against `--card: hsl(30 85% 96%)` =
`rgb(253,245,236)`. All six figures the ledger names reproduce exactly to 2dp:

| stop | published L | measured |
| --- | --- | --- |
| 3 | 0.542 | 4.52 (thin, but over the floor) |
| 4 | 0.551 | **4.27** |
| 5 | 0.530 | 5.02 (the 4.1.0 retune, shipped) |
| 6 | 0.579 | **4.39** |
| 10 | 0.556 | **4.24** |
| 11 | 0.601 | **3.51** |

and the other seven clear it: 0 → 4.96 · 1 → 5.98 · 2 → 6.16 · 7 → 5.33 · 8 → 5.62 ·
9 → 5.71 · 12 → 5.62.

**The retune.** Hue and chroma untouched, dark arm untouched, the ledger's prescription
taken as written (~0.03 on 4/6/10, ~0.09 on 11):

| stop | L before → after | ratio before → after |
| --- | --- | --- |
| 4 forest | 0.551 → **0.521** | 4.27 → **4.85** |
| 6 tomato-red | 0.579 → **0.549** | 4.39 → **4.99** |
| 10 olive | 0.556 → **0.526** | 4.24 → **4.81** |
| 11 ocean | 0.601 → **0.511** | 3.51 → **5.06** |

The bare minimum would have been smaller — the same search says 4 clears at L 0.538
(4.51), 6 at 0.573 (4.50), 10 at 0.541 (4.51), 11 at 0.540 (4.51) — and every one of
those lands on the cliff edge, where a later `--card` nudge re-breaks the rung. The
ledger's figures put each retuned stop in the same band as the seven that already passed
and as stop 5's shipped 5.02, so the ladder reads as one calibration rather than four
patches. Stop 3 (4.52) is NOT touched: it is over the floor, the ledger does not order it
moved, and moving it would have made the born-RED count wrong.

**Both files, in lockstep.** `color-radius.css` §6 and `light-dark.css` §3's paired
spelling now declare the same thirteen light values. Verified after the edit by pulling
both lists and diffing them — all 13 rows identical, including the four that moved.

**One stale claim struck, not silently corrected.** `color-radius.css`'s stop-5 comment
read "5.11:1 vs the warm-cream card". The bytes compute 5.02. The 4.1.0 retune landed the
value and left the figure behind. Struck in place rather than overwritten:
`~~5.11:1~~ [2026-09-17 · O-20 B-7: 5.02:1 — the retune landed the value, the figure
beside it was never re-derived]`. It is not enrolled in §5's CLAIMS table (that would be
scope this item does not carry), but it is now true.

**Consumers, for the relay:** no sibling installs 9.0.0, so every effect is
prospective-on-bump. atlas aliases stop 4 (`--viz-program-rural-healthcare`) and
re-baselines `cream-law.gate.ts:374-380` as it already did for stop 5; sci-report's four
strand fills shift transitively through atlas; fourier pins stop 5 only; speedtest's two
hits are comments.

### C-1 cure half · the dead tone glyph — MOVED → CURE-NOW. DONE.

`src/components/alert/index.ts:46` verified first: BASE did end `[&>svg]:text-current`, as
the ledger says. Deleted. The derivation is written above the constant so the next reader
cannot re-add it: `joinClassValues` is a bucketed deduper, not twMerge, so both
arbitrary-variant tokens survived the join, and Tailwind emits the `--tone` rule BEFORE
the `currentcolor` rule at equal specificity in the same layer.

That ordering is not asserted from memory — it is read off the sheet the repo's own
tailwindcss 4.3.3 emits for these exact candidates:

```
  .\[\&\>svg\]\:text-\(--tone\) > svg {
    color: var(--tone);
  }
  .\[\&\>svg\]\:text-current > svg {
    color: currentcolor;
  }
```

[2026-09-17 · CURE ROUND 1 (D3): the block above was read by hand off the sheet, and the
builder's two ordering probes that were supposed to re-derive it matched nothing — they
looked for a `\]` Tailwind does not emit and for `>svg` with no space. Repaired and re-run
against the cured tree; the machine-read lines are in the CURE ROUND 1 section below and
they carry the same fact.]

Nothing else changed. The four toned arms already carried `[&>svg]:text-(--tone)`; the
neutral arm sets no glyph colour at all now, which is what `currentcolor` already resolved
to, so the neutral paint is identical.

## Born-RED proofs

### §6, the ramp — RED on exactly four, GREEN after

`npx vitest run tests/styles/contrast-computed.test.ts`, BEFORE the token edit:

```
AssertionError: --section-color-4 over --card [light] computed 4.27:1: expected 4.272139581120766 to be greater than or equal to 4.5
AssertionError: --section-color-6 over --card [light] computed 4.39:1: expected 4.392343389673333 to be greater than or equal to 4.5
AssertionError: --section-color-10 over --card [light] computed 4.24:1: expected 4.238588817661399 to be greater than or equal to 4.5
AssertionError: --section-color-11 over --card [light] computed 3.51:1: expected 3.506131787244619 to be greater than or equal to 4.5
      Tests  4 failed | 71 passed (75)
```

Four RED, and they are the four the ledger names. The other two rows of §6 were GREEN
before and after by design and are stated as such rather than dressed as born-RED:

- **§6b** — the library's own reader. `.section-label--tinted` is read out of
  `src/styles/typography/utilities.css` (not restated), asserted to be
  `var(--section-label-accent, var(--section-color-7))`, and measured: 5.33. glass-ui
  paints its own eyebrow from this ramp, so the rung is shipped text in our own sheet.
- **§6c** — the two-file lockstep. It passed before because both files carried the same
  wrong values, and it passes after because both carry the same right ones. It is the
  detector for the fork the cure could have caused, not evidence of the cure.

AFTER, with `tests/components/ui/alert/Alert.test.ts` in the same run:

```
 Test Files  2 passed (2)
      Tests  85 passed (85)
```

### The Alert glyph — RED at HEAD, GREEN after

`npx vitest run tests/components/ui/alert/Alert.test.ts`, BEFORE the edit:

```
 FAIL  tests/components/ui/alert/Alert.test.ts > Alert tone channel > BASE declares no text-current arbitrary variant — nothing overrides the tone glyph
AssertionError: expected 'glass-quiet liquid-enter [--glass-spe…' not to contain 'text-current'

 FAIL  … > the destructive arm ships exactly one glyph colour, and it is the tone
 FAIL  … > the success arm ships exactly one glyph colour, and it is the tone
 FAIL  … > the warning arm ships exactly one glyph colour, and it is the tone
 FAIL  … > the info arm ships exactly one glyph colour, and it is the tone
AssertionError: expected [ '[&>svg]:text-current', …(1) ] to deeply equal [ '[&>svg]:text-(--tone)' ]

- Expected
+ Received

  [
+   "[&>svg]:text-current",
    "[&>svg]:text-(--tone)",
  ]

      Tests  5 failed | 5 passed (10)
```

The row is on the class string, not on a mount, because the defect is a class the v4
scanner reads out of source text — it never depended on rendering, which is why every
mount-shaped test the component had passed straight through it.

## Paint witness (C-1) — required, captured

**Method.** A scratch page compiled with the repo's own `tailwindcss` 4.3.3 in memory,
over the consumer's own cascade verbatim from `src/styles/index.css:7-9` (`@import
"tailwindcss"` → `@import "tw-animate-css"` → `@import <repo>/src/styles/index.css`), with
the candidate list taken from the class string the LIVE `alertVariants()` returns — the
module is loaded through a Vite SSR server so the SFC re-exports resolve and the string
under test is the library's own, never a transcription. `<html style="color-scheme:
light">` pins the light arm. Builder and both pages: `glyph-witness.build.mjs` in this
directory; probes via chrome-devtools MCP, Chrome 151.0.0.0. No `dist/` build was needed,
so the build lock was never taken.

**BEFORE** (`glyph-witness-before.png`), library at HEAD `46ab4124`:

```json
{"neutralGlyph":"rgb(28, 25, 23)","successGlyph":"rgb(28, 25, 23)",
 "successPlateInk":"rgb(28, 25, 23)","successToneResolved":"oklch(0.72 0.192 149.5)"}
```

The toned glyph equals the plate ink, and equals the neutral glyph. `--tone` resolves to
the green the whole time and reaches nothing.

**AFTER** (`glyph-witness-after.png`), same page, library with the cure:

```json
{"neutralGlyph":"rgb(28, 25, 23)","successGlyph":"oklch(0.72 0.192 149.5)",
 "successPlateInk":"rgb(28, 25, 23)","successToneResolved":"oklch(0.72 0.192 149.5)",
 "glyphEqualsTone":true}
```

The toned glyph is now the tone — `oklch(0.72 0.192 149.5)` = `--success` = `rgb(33, 196,
93)`, which paints at **2.13:1** on `--card`, under WCAG 1.4.11's 3.0 non-text floor (all
four tone figures and what is owed on them: residue 5). Chrome reports an oklch token's computed colour in oklch, not sRGB, which is why the
two arms of the pair are not both `rgb(…)`; `glyphEqualsTone` compares the glyph against
`--tone` resolved through the same engine on the same page, so the identity is measured
rather than eyeballed. The neutral glyph and the plate ink are byte-identical across the
pair: the cure moves the four toned arms and nothing else. The screenshots show the same
delta by eye — a black checkmark before, a green one after.

## Verify

```
$ npx vue-tsc --noEmit -p tsconfig.json          → EXIT-tsconfig.json=0
$ npx vue-tsc --noEmit -p tsconfig.test.json     → EXIT-tsconfig.test.json=0
```

Both real exit codes, read from `$?`, not from a pipe.

Full battery, stated as its full line:

```
$ npx vitest run                                 → EXIT=0
 Test Files  228 passed (228)
      Tests  2198 passed | 10 expected fail (2208)
```

Zero RED. Two REDs did appear earlier in this lane's verify and both were foreign and both
cleared before the final run; they are recorded rather than dropped:

1. `npx vue-tsc --noEmit -p tsconfig.test.json` first returned
   `tests/composables/dark/darkModeSyncScript.test.ts(464,29): error TS2589: Type
   instantiation is excessively deep and possibly infinite.` — **Lane D's** file (CUT-6..8),
   dirty at the time with 134 insertions; line 464 does not exist at HEAD, where the file
   is 355 lines. Lane D cleared it; the re-run is the exit 0 above.
2. `tests/gates/boot-graph.test.ts > the dist-demo it measures is NEWER than every source
   it is built from` — a **wave-level** staleness every lane touching `src/` in this batch
   trips, not one lane's defect. It was GREEN at this lane's step-0: `dist-demo/index.html`
   was built 18:37:08 and no file under `src/` or `demo/` was newer until 18:59:53, when
   **Lane E2's** `src/components/chip/chipVariants.ts` landed — before this lane's first
   byte at 19:02:41. The gate's own message named **Lane D's**
   `src/composables/dark/darkModeSyncScript.ts` as the newest source at the moment it fired.
   A lane rebuilt `dist-demo` at 19:05:21 and the gate re-ran 14/14 GREEN; the final battery
   above is clean. This lane deliberately did NOT rebuild `dist-demo` when it was RED: a
   rebuild mid-batch bakes eight lanes' half-finished `src/` into the artifact that the same
   file's modulepreload and byte-ceiling rows measure, which would manufacture REDs under
   this lane's name. It clears with one `npm run demo:dist:build` at wave close.

Gate receipt, verbatim, after the change:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Byte-identical to the baseline receipt: `seats:60`, `violations:0`, `drift:0`,
`rosterSha256:282d05cf` unchanged. Nothing was minted. §6 is a new table inside the
existing `G-CONTRAST-COMPUTED` seat — the same seat §1-§5 already bind, the same file, the
same engine — and the Alert rows are an arm on an existing plain vitest file carrying no
G-id at all.

## Fence

Modified: `src/styles/tokens/color-radius.css` · `src/styles/tokens/light-dark.css` ·
`src/components/alert/index.ts` · `tests/styles/contrast-computed.test.ts` ·
`tests/components/ui/alert/Alert.test.ts`. Created:
`docs/tranches/BK/execution/2026-09-17-o20-cure/C2/{RECORD.md, glyph-witness-before.png,
glyph-witness-after.png, glyph-witness.build.mjs}`. Every one is inside the fence.

Nothing else was created, modified or deleted — no `git add`/`commit`/`stash`/`checkout`/
`reset`, no sibling repo read or written, no `dist/` or `dist-demo/` build (so the build
lock was neither taken nor needed), no `MIGRATION.md`, no `DESIGN.md`. The browser seat was
this lane's under the batch rule and it is released: the scratch server on 127.0.0.1:8731
is stopped and the tab is idle. The other dirty paths in `git status` are the concurrent
lanes' and were not touched.

## Residue

1. **A FOURTH copy of the ramp exists, outside every lane's fence.** The ledger and both
   seats say the values live in three files plus thirteen bridges.
   `demo/chassis/hero/aurora-hero.ts:62-77` is a fourth, as literals, under a comment that
   says outright "The literals are the light-mode library token values
   (tokens/color-radius.css §6) read AS DATA". After this retune, four of those thirteen
   rows no longer match the tokens they claim to be. The paint consequence is small —
   `sectionColorToHeroPalette` re-lifts L into a fixed pastel band and the hue degrees it
   derives are untouched, since the cure moved no hue — but the stated invariant is now
   false. Not this lane's file, not in the lane table at all; it is owed to whoever takes
   it, and the honest fix is to read the tokens rather than copy them.
2. **Stop 3 stays at 4.52.** Over the floor, so §6 holds it, but it is the thinnest rung
   and a later `--card` move takes it out first. Flagged, not touched — the ledger scoped
   this cure to the four that failed.
3. **Stop 6 and `--viz-fourier` have diverged.** They were byte-identical
   (`oklch(0.579 0.201 30.4)`); stop 6 is now `0.549`. `--viz-fourier` is its own brand-hue
   declaration for fills, not an alias of the rung, and the ledger scoped the retune to the
   ramp — so it was left alone deliberately. `--viz-green: var(--section-color-4)` IS an
   alias and tracks the new value, as its comment in `color-radius.css` now says.
4. **The doc half of both items is another lane's.** DESIGN.md:930's "index with `i mod
   13`" is Lane T1's; the MIGRATION §8.0.0 Alert paragraph and the :3500 bracket are Lane
   R's. Neither file was opened.
5. **The cure makes the glyph the only tone-dependent paint on Alert, and the tones are
   thin against the card.** Ink is `text-card-foreground` on every arm (TONED,
   `index.ts:71`), the plate is the same neutral quiet rung for all five arms, and the
   tinted wash is gone — so after this cure the glyph carries the whole tone. Measured on
   `--card` light, by this lane's own oklch→linear-sRGB→WCAG script (the same one that
   re-derived the ramp): `--success` `oklch(0.720 0.192 149.5)` **2.13:1** · `--warning`
   `oklch(0.770 0.165 70.6)` **1.98:1** · `--info` `oklch(0.626 0.186 259.6)` **3.36:1** ·
   `--destructive` `hsl(0 72% 50%)` **4.53:1**. WCAG 1.4.11 asks 3.0:1 of a graphical
   object that carries meaning: two of the four clear it, two do not.

   **No seat measured this and the ledger does not mention it** — the C-1 evidence pair
   is about whether the tone reaches the glyph at all, not about what the glyph then
   measures. **No gate row was added**: the tone tokens are outside this fence (they are
   `color-radius.css` §semantic and the `light-dark.css` pair, not the section ramp), so a
   3.0-floor row here would be born-RED with no cure available to turn it GREEN, and a RED
   battery is not a cure. **Routed to the owner**, two questions, in order: (a) is the
   glyph a REQUIRED graphical object, given `alert-title` and `alert-description` carry
   the content in `text-card-foreground` and the glyph is decorative reinforcement — if it
   is not required, 1.4.11 does not bind and nothing moves; (b) if it is, which of
   `--success` and `--warning` drops L, and by how much, on the same drop-L-keep-hue
   recipe B-7 just used on the ramp. `--info` at 3.36 and `--destructive` at 4.53 already
   clear the non-text floor. Both tokens are read far beyond Alert, so the blast radius is
   the thing the ruling is actually about.

## CURE ROUND 1 — 2026-09-17

**Seat** cure · **model** `claude-opus-5[1m]` (read from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_4cc3afc1-169/agent-a75635f47d1570dd8.jsonl`
— `"model":"claude-opus-5"`, `"modelId":"claude-opus-5[1m]"`; located by grepping the
workflow subagent tree for a phrase unique to this cure prompt, "offset 9513", then
narrowing to the file this seat is writing live) · **adjudicator** `claude-fable-5-1` ·
**base** `master` @ `46ab4124`, the lane's own edits still uncommitted in the shared tree.

The id assertion gates every command in this round with `&&`, the step-0 baseline
included: `grep -q '"model":"claude-opus-5' <transcript> && echo "MODEL-ASSERT OK …" && cd
<repo> && git status --porcelain && git diff --stat && git rev-parse --short HEAD`.

### Step-0 baseline (cure round)

`git rev-parse --short HEAD` = `46ab4124`, unchanged. `git status --porcelain` carried 18
modified paths and 4 untracked ones — this lane's five files and this lane's `C2/` among
them, the rest the concurrent lanes' (`demo/chassis/showcase/ShowcaseFrame.vue`,
`DESIGN-NOW.md`, the chip pair, `useDockHold.ts`, `Slider.vue`, the colour/dark
composables, `useResolveTokenColor.ts`, four test files, `vite.config.ts`, and the `D/`,
`E2/`, `attrs-pointerdown-channel.test.ts` additions). `git diff --stat` totalled 18 files,
471 insertions, 71 deletions. Nothing outside this lane's fence was touched in this round
either.

### What changed

**D2 (CONFIRMED) — thirteen unheld figures. Cured by removal, not by enrollment.**

The adjudicator's option A was taken: the token file stops restating derived data. The
twelve live per-rung figures are gone from `color-radius.css:310-322` — `4.96 on --card`,
`5.98`, `6.16`, `4.52`, `4.85`, `4.99`, `5.33`, `5.62`, `5.71`, `4.81`, `5.06`, `5.62`.
What stays: the hue names, the four L deltas (`L 0.551 → 0.521`), and the under-floor
figures each cured rung came FROM, now written `(was 4.27)` — history about bytes that no
longer exist, not a claim about the bytes that do. Stop 3 keeps its prose (`the thinnest
rung over the floor; untouched`) without the figure, and `--viz-green tracks it` is
untouched. The ramp headnote gains one paragraph saying why there are no figures below it:
§6 of `G-CONTRAST-COMPUTED` is the source of record for what each rung measures, and this
RECORD banks the values. The struck stop-5 bracket at :315 stays exactly as it was — it is
committed prose in the correct form, and it is now HELD (below).

`light-dark.css:158` loses the dark-arm range. `Dark is byte-untouched: it computes
4.76–7.85 across all thirteen` → `Dark is byte-untouched by the cure and is not held by
§6; the light pair is`. An unheld range across thirteen tokens is exactly what §5 exists
to catch, and it was the one figure in this lane's prose that no table could hold even in
principle (§5 harvests one figure per claim).

`tests/styles/contrast-computed.test.ts` §5 gains one row — the lane's own strike, which
by the §5 headnote's own rule ("STRUCK claims … are enrolled too") was owed from the
moment it was written:

```ts
{
    file: LIGHT_TOKENS,
    claim: "O-20 B-7: 5.02:1",
    ink: "var(--section-color-5)",
    surface: "var(--card)",
    arm: "light",
},
```

`O-20` and `B-7` carry no decimal, so the harvester's first `\d+\.\d+` is `5.02`, and it
states the two decimals §5 demands. The row asserts both halves: that the string is still
in `color-radius.css` (a silent un-strike REDs it) and that the bytes still compute 5.02.

**D3 (CONFIRMED) — the witness builder's probes were dead. Repaired and re-run.**

`glyph-witness.build.mjs:105` looked for `text-current\]` and `text-\(--tone\)\]`;
Tailwind emits no trailing `\]` on these selectors. `:108` matched `>svg` with no space;
Tailwind emits ` > svg`. Both `indexOf` calls returned `-1` and the rule loop printed
nothing, which is why the ordering block at RECORD.md:121-128 was hand-read — a true fact
banked with a method that could not re-derive it. Needles are now
`["text-current > svg", "text-\\(--tone\\) > svg"]` and the pattern is
`/[^\n{}]*>\s*svg\s*\{\s*color:[^}]*\}/g`. Re-run once against the cured tree,
`node docs/tranches/BK/execution/2026-09-17-o20-cure/C2/glyph-witness.build.mjs after`:

```
[after] emitted offset of svg rule text-current > svg: -1
[after] emitted offset of svg rule text-\(--tone\) > svg: 9513
[after] glyph rule @9497:  .\[\&\>svg\]\:text-\(--tone\) > svg { color: var(--tone); }
```

The tone rule is emitted and the `text-current` rule is not — the after state, machine-read
this time. The before state's ordering (tone rule first, `currentcolor` rule second at
equal specificity) stands on the hand-read block above plus both challengers' independent
reproductions; re-deriving it would mean reverting `index.ts` under a concurrent batch, and
the fact it supports — that the glyph painted the plate ink — is already measured in the
BEFORE probe. The builder's outputs (`witness-after.css`, `witness-after.html`) are
regenerated artifacts in this lane's directory, not sources.

**D1 (disclosure) — the tone figures, stated and routed.** Residue item 5, above. The
four ratios were re-derived by this seat before they were written down (own script,
`oklch → OKLab → LMS → linear sRGB → WCAG`, `--card` = `hsl(30 85% 96%)` =
`rgb(253,245,236)`): success 2.13 · warning 1.98 · info 3.36 · destructive 4.53. The same
script re-ran the whole ramp in the same pass and reproduces §6 exactly —
`0:4.96 1:5.98 2:6.16 3:4.52 4:4.85 5:5.02 6:4.99 7:5.33 8:5.62 9:5.71 10:4.81 11:5.06
12:5.62` — which is also the independent check that removing the comments changed no byte
of paint. No gate row was added, and the reason is stated in the residue rather than left
to inference. The paint-witness sentence now carries the figure the cured glyph paints at.

### Verify (cure round, verbatim)

```
$ npx vue-tsc --noEmit -p tsconfig.json          → EXIT-tsconfig.json=0
$ npx vue-tsc --noEmit -p tsconfig.test.json     → EXIT-tsconfig.test.json=0
```

Both real exit codes, read from `$?` with no pipe in the command.

```
$ npx vitest run tests/styles/contrast-computed.test.ts tests/components/ui/alert/Alert.test.ts
 Test Files  2 passed (2)
      Tests  86 passed (86)

$ npx vitest run tests/styles/contrast-computed.test.ts
 Test Files  1 passed (1)
      Tests  76 passed (76)
```

76 in the contrast file, the 75 the lane banked plus the one §5 row; 86 with Alert's ten.

Full battery, stated as its full line:

```
$ npx vitest run                                 → EXIT=1
 Test Files  1 failed | 227 passed (228)
      Tests  1 failed | 2198 passed | 10 expected fail (2209)
```

The one RED, attributed:

```
FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm >
  the dist-demo it measures is NEWER than every source it is built from
AssertionError: dist-demo/index.html is STALE (built 2026-09-17T23:05:21.508Z,
  newest source 2026-09-17T23:36:58.012Z) — run `npm run demo:dist:build`
```

**Wave-level staleness, not a defect of this cure** — the same class the first round
recorded, and the same posture. `dist-demo` was last built at 19:05:21 by another lane;
the newest source at the moment the gate fired is `src/composables/dark/darkModeSyncScript.ts`
at 19:36:58, **Lane D's** file (`stat` on the tree, sorted). This lane's two token files
(19:35:12, 19:35:16) are also newer than that build, so this round contributes to the same
staleness — it is stated, not shifted: the gate would be RED right now with or without this
lane, and it is RED for every lane in the batch at once. It is deliberately NOT cured here:
`npm run demo:dist:build` takes the shared build lock and bakes eight lanes' mid-flight
`src/` into the very artifact whose modulepreload and byte-ceiling rows are measured in the
same file, which manufactures REDs under other lanes' names. One rebuild at wave close, on
final bytes, clears it — as one did at 19:05:21 after the first round.

Everything else is GREEN: 2198 passed, 10 expected fail, zero RED attributable to this
lane's bytes. The 2209 total is one above the first round's 2208 — the §5 row, and nothing
else.

Gate receipt, verbatim, after the cure:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60`, `violations:0`, `drift:0`, `rosterSha256:282d05cf` — byte-identical to this
lane's baseline and post-change receipts across both rounds. Nothing was minted: the one
new row is an arm on `G-CONTRAST-COMPUTED`'s existing §5 table, in the file that seat
already binds.

### Fence (cure round)

Modified: `src/styles/tokens/color-radius.css` · `src/styles/tokens/light-dark.css` ·
`tests/styles/contrast-computed.test.ts` ·
`docs/tranches/BK/execution/2026-09-17-o20-cure/C2/{RECORD.md, glyph-witness.build.mjs}`.
The builder's own outputs (`witness-after.css`, 310 KB, and `witness-after.html`) were
written by the re-run and then deleted again: derived data the builder regenerates on
demand, banked nowhere, by the same rule that took the figures out of the token comments.
The directory holds what it held before — the RECORD, the two PNGs, the builder.
`src/components/alert/index.ts` and `tests/components/ui/alert/Alert.test.ts` were NOT
touched in this round — no cure named them. No `git add`/`commit`/`stash`/`checkout`/
`reset`; no `dist/` or `dist-demo/` build, so the build lock was neither taken nor needed;
no browser opened this round (the repaired probe is a node read of the emitted sheet, and
the PNG pair from round one is unchanged and still the paint witness); no sibling repo
read or written; `MIGRATION.md` and `DESIGN.md` untouched.

### Residue (cure round)

1. Residue 5 above is the live one: the owner's ruling on whether the Alert glyph is a
   required graphical object, and if so which tone token moves.
2. `tests/styles/contrast-computed.test.ts:824` — §6's own headnote still carries the dark
   range `4.76–7.85`, the same figure struck from `light-dark.css:158`. The cure named the
   token file only, and §5 holds token comments rather than test prose, so it was left
   exactly as adjudicated; it is flagged here rather than silently widened. It is true
   today by the same script that re-derived everything else.
3. Residue items 1-4 of the first round are unchanged and still owed:
   `demo/chassis/hero/aurora-hero.ts:62-77`'s fourth copy of the ramp (four rows now stale
   against the tokens they claim to read), stop 3 at 4.52 as the thinnest rung, stop 6's
   deliberate divergence from `--viz-fourier`, and the doc halves belonging to Lanes T1
   and R.
