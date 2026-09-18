# Lane R — MIGRATION, the `cn()` ghost rung, and the published-name ratchet

**Seat** implement (the THIRD R seat; see "Inheritance" below) · **model**
`claude-opus-5` — asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a0880ff6-f7d/agent-a6c2440abd377d5a3.jsonl`,
the `"model"` field. The file was found by grepping the workflows tree for a phrase
unique to this lane's prompt ("the roster datum binds LAST so it binds GREEN"), which
returned three files; two are the walled predecessors' and the third is the one this
seat is writing live (identified by its growing mtime and its tail carrying this seat's
own turns). The parent session file is the wrong datum and was not used.

**date** 2026-09-17 · **base** `master` @ `c645c393` · **spec of record**
`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` (A-4-RIDER, B-3, C-1,
CUT-4/5, CUT-6..8, HK-vite-comment, the three head facts, the Lane R row), plus
`D/RECORD.md` (read whole) and `C2/RECORD.md`'s residue.

The id assertion gates the chain with `&&`: the step-0 baseline command begins
`MID=$(grep -o '"model":"claude-opus-5[^"]*"' <transcript> …) && echo "MODEL_ID=$MID" &&
case "$MID" in claude-opus-5*) echo GATE_OK;; *) exit 1;; esac && cd <repo> && git
rev-parse HEAD && …`. Read-only measurement after that point (vitest, vue-tsc,
gate-register, npm pack against dists) ran ungated once the id was established —
stated, not implied.

## Step-0 baseline

`git rev-parse HEAD` = **`c645c39303bdd988101c590af08ef64bded98dda`**. HEAD did not move
during this lane; the closing `rev-parse` reads the same sha.

`git status --porcelain` at first byte — 23 modified, 7 untracked. Of those,
**thirteen paths inside this lane's fence were already dirty, inherited from the walled
predecessor** (MIGRATION.md · src/components/\_shared/class-names.ts ·
tests/components/\_shared/classNames.test.ts · .published-roster · scripts/verify-export-types.mjs ·
tests/public-surface.spec.ts · vite.dark-stamp.ts · vite.config.ts ·
demo/vite.demo-dist.config.ts · tests/composables/dark/darkModeSyncScript.test.ts ·
demo/chassis/hero/aurora-hero.ts · tests/styles/contrast-computed.test.ts ·
src/styles/tokens/color-radius.css). The rest are Lanes T1 and T2's and were never
opened: DESIGN.md · README.md · docs/design/{tunable-anim,affordance-map}.md ·
src/styles/glass/veil.css · src/styles/theme/bridges.css · tests/design/ (T1);
vite.library.ts · docs/canon/{dependencies,deps-currency}.md ·
docs/audits/overfitting-audit.md · docs/instructions/README.md · docs/archive/README.md ·
src/styles/tokens/scale-paper.css · tests/docs/ (T2); plus both lanes' record
directories.

`git diff --stat c645c393` at step 0: `23 files changed, 724 insertions(+), 114
deletions(-)`.

Gate receipt read at baseline, before this seat wrote a byte:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

### Inheritance — two predecessors, one of them a no-op

A first R seat ran ~1 hour and was killed by a session wall at 20:26 ET with its edits
on disk and no RECORD. A SECOND seat started at 21:31 and was interrupted 36 seconds
later; its transcript
(`…/workflows/wf_abf37dd9-d5f/agent-a28cf9b4525735b26.jsonl`) shows five tool calls,
all read-only inspection of the workflows tree, and **no repo write** — checked rather
than assumed, by listing every `tool_use` in that file. So the inherited dirt is the
FIRST seat's alone.

This seat did not revert any of it and did not re-apply any of it blind. Every hunk was
read (`git diff c645c393 -- <file>`), every claim in it was re-measured here from the
bytes, and every born-RED was re-run at this seat. What follows reads as one seat's
work because it was verified as one seat's work; where this seat CHANGED what it
inherited, the act ledger says so and why.

## Census

| file | + | − | note |
| --- | --- | --- | --- |
| `MIGRATION.md` | 256 | 4 | the 13-token table, the 3-utility table, `.paper-texture`, the Alert paragraph + the `:3750` strike, the CUT-4/5 rows + 3 census rows, the §8.1.0 amendments, the pencil-boil strike |
| `scripts/verify-export-types.mjs` | 170 | 0 | the roster parser + the ratchet, as an ARM of the seated `G-NO-ORPHAN-EXPORT` |
| `tests/public-surface.spec.ts` | 89 | 0 | two arms: the hostile both-directions probe, and the committed-pair equality |
| `tests/styles/contrast-computed.test.ts` | 55 | 4 | the §5 dark row, the §6 headnote, the §6d demo-hero LOCKSTEP arm |
| `tests/composables/dark/darkModeSyncScript.test.ts` | 38 | 0 | the demo-dist config arm |
| `demo/chassis/hero/aurora-hero.ts` | 9 | 4 | four retuned rungs + the comment that says why they are held |
| `demo/vite.demo-dist.config.ts` | 6 | 1 | `darkModeStamp()` in the plugin list |
| `vite.config.ts` | 2 | 24 | the plugin moves OUT to its own module; the import stays |
| `src/components/_shared/class-names.ts` | 1 | 1 | `admin-label\|` struck from the font-size regex |
| `src/styles/tokens/color-radius.css` | 1 | 1 | the `:320` dark-half strike, comment only |
| `.published-roster` | 289 | new | the datum |
| `vite.dark-stamp.ts` | 35 | new | the ONE module both vite configs import the stamp from |
| `tests/components/_shared/classNames.test.ts` | 27 | new | the born-RED unit + its inverse arm |
| `docs/.../o20-cure/R/RECORD.md` | new | — | this record |

Nothing published moves. `package.json` `files: ["dist"]`, so `MIGRATION.md`,
`vite.config.ts`, `vite.dark-stamp.ts`, `demo/` and `tests/` never ship; `.published-roster`
sits beside `.bundle-ratchet` and ships with neither. `src/components/_shared/class-names.ts`
DOES ship — one character class leaves a regex, and no export name is added, removed or
renamed. `src/styles/tokens/color-radius.css` ships and moves one comment.

## Act ledger

### 1 · A-4-RIDER — the thirteen removed tokens

**The diff was reproduced here first, with this seat's own parser, before a row was
written.** Definition of "emitted roster": the `@theme` custom-property names and
`@utility` names declared anywhere in the CSS CLOSURE reachable from the package's CSS
export entries — the same closure `validateCss()` walks, entered from `package.json`
`exports` and followed through relative `@import`s. Comments are stripped
string-aware (a naive regex eats from the `/*` inside `@source "../*.js"`, which is the
shape A-1 measured). Tarballs: `npm pack @mkbabb/glass-ui@7.0.0` and `@8.0.0` into the
scratchpad; 9.0.0 from the seat's `publish-900/dist`.

```
7.0.0  closure 109 files   @theme 246   @utility 49
8.0.0  closure 124 files   @theme 242   @utility 47
9.0.0  closure 124 files   @theme 242   @utility 47
```

246 → 242, thirteen OUT and nine IN, and the thirteen are exactly the ledger's thirteen:

```
--color-surface-tint-35 · --corner-k-sharp · --corner-k-soft · --ease-spring ·
--ease-spring-bouncy · --ease-spring-gentle · --ease-spring-press ·
--ease-spring-smooth · --ease-spring-snappy · --radius-input · --radius-tooltip ·
--text-admin-label · --z-index-hovercard
```

The bytes agree with the verifier; there is no delta to record. **8.0.0 → 9.0.0 moves
NOTHING** in either name set, so all thirteen rows belong in §8.0.0 and §9.0.0 gets a
pointer paragraph instead of a table. Each row is dated by `git log -S'<name>' -- src/styles`:
`31c01d2a` (2026-07-22, radius canon) for `--radius-input` / `--corner-k-soft` /
`--corner-k-sharp`; `35a30fbb` (2026-07-22) for `--color-surface-tint-35`; `6b450f22`
(2026-08-04) for `--text-admin-label`; `d27ec5dc` (2026-08-05, W-SPRING-RETUNE) for the
six springs; `bca22bd9` (2026-08-08, W-OVERLAY) for `--radius-tooltip` and
`--z-index-hovercard`. Every one of those commits sits between `v7.0.0` and `v8.0.0`,
which is the same fact the roster diff states independently.

Every successor claim in the table was measured on the dists, not recalled:
`--radius-input: var(--radius)` → `--radius-media: var(--radius)` (byte-for-byte the
same value) · `--corner-k-soft` 1.7 / `--corner-k-sharp` 2.4 → `--corner-k-squircle: 2`,
and both had **zero `var()` readers** in the 7.0.0 dist · `--color-surface-tint-35`'s
underlying `--surface-tint-35` is gone and the ladder keeps 4·6·8·10·12·15·18·22·25·40·70,
with `.input-pill::placeholder` repointed `var(--surface-tint-35)` → `var(--muted-foreground)` ·
`--text-admin-label` → `--text-micro`, `--type-admin-label: 0.625rem` → `--type-micro: 0.6875rem` ·
`--z-hovercard: 120` gone, `--z-popover: 130` survives · `--radius-tooltip: var(--radius-lg)`
and the 9.0.0 tooltip arm now reads `--radius-ctx: var(--radius-panel)`, its only 7.0.0
reader having been `@utility rounded-tooltip{border-radius:var(--radius-tooltip)}` on
`TooltipContent`. The spring mapping is read off `d27ec5dc`'s own repointings
(`--spring-snappy`→`--spring-present`/`--spring-dock`, `--spring-smooth`→`--spring-present`,
`--spring-bouncy`→`--spring-present`, `--spring-gentle`→`--spring-world`,
`--spring-press` unchanged), not inferred from the names.

**CHANGED from what was inherited — the emission distinction, which was wrong and is
now measured.** The inherited note said the six springs were "`@theme` declarations …
minting six dead Tailwind utilities into every consumer's sheet". Measured, that is
two errors in one sentence. Five of the six live in `theme/bridges.css`'s `@theme
inline` block, and a bridge name mints a UTILITY SPELLING and emits no custom property
at all (A-14's finding, applied to its own family); `--ease-spring` is declared twice,
as a bridge AND as a plain `:root` property in `tokens/scheme-spring.css`, so
`var(--ease-spring)` was the one that RESOLVED on the `./styles` surface — 0
`var(--ease-spring…)` readers ship anywhere in the 7.0.0 package; the difference is
resolvability, not a reader. The full block census, measured across both dists:

| block | names | a `var()` read resolved? |
| --- | --- | --- |
| `theme/radius.css`, plain `@theme` | `--radius-input` · `--radius-tooltip` · `--corner-k-soft` · `--corner-k-sharp` | YES (`--radius-input` is emitted in the 7.0.0 compiled `glass-ui.css`) |
| `theme/bridges.css`, `@theme inline` | the five springs · `--ease-spring` · `--color-surface-tint-35` · `--text-admin-label` · `--z-index-hovercard` | NO — 0 `--ease-spring*` in the 7.0.0 compiled bundle |
| `tokens/scheme-spring.css`, plain `:root` | `--ease-spring` (its second site) | YES, on the `./styles` surface |

That distinction is now the table's headnote, because it decides what any given row
costs a reader: four rows take away a value, nine take away a utility spelling. All
thirteen are gone from EVERY block at 9.0.0 (measured: zero declaration sites).

### 2 · B-3 (1) — `admin-label` out of the font-size regex

`src/components/_shared/class-names.ts:84` no longer lists `admin-label` in the
font-size bucket. `cn()` is a bucketed last-write-wins deduper, so a dead name in a
bucket EVICTS the live name that shares it.

**The census the ledger asked for, run here.** All 24 names in that regex, against the
9.0.0 roster:

```
text-micro · text-small · text-caption · text-body · text-prose · text-heading ·
text-subheading · text-title · text-display · text-display-hero · text-display-mega ·
text-display-audacious · text-display-2..5 · text-hero · text-math · text-math-body ·
text-mono-caption · text-mono-small · text-mono-prose · text-mono-micro
    → every one has a live @utility at 9.0.0
text-admin-label
    → no @utility AND no @theme bridge
```

`admin-label` is the only one of the twenty-four with neither. The ledger is right and
the strike is exactly one name wide. (Thirteen of the 23 live names have a `@theme`
bridge as well; ten are `@utility`-only. Neither shape is a defect — both paint.)

### 3 · B-3 (2) — the classes-and-utilities table, and `.paper-texture`

The `@utility` diff, measured the same way: **49 → 47** at 8.0.0, three out and one in,
unchanged at 9.0.0. Out: `glass-fill` (`4b1a9733`, 2026-08-04) · `text-admin-label`
(`6b450f22`, same cut as its token) · `touch-hit-area` (`bd93c22b`, 2026-08-05). In:
`glass-plate` (`4b1a9733`, 2026-08-04, first tag `v8.0.0`) — the SAME commit that
removed `glass-fill`, which is why the table names it as that row's successor rather
than as a bystander. (`dc4267fc` is tagged `v9.0.0` only and edits comments; the
inherited date was wrong on both counts.) Successors measured, not asserted:
`@utility glass-plate` paints `background: var(--glass-veil)` and takes its rung from
`--glass-veil-tier`, where `--glass-fill-rung` used to go. **[2026-09-17 · cure round 1]**
The row first named `--glass-fill-tinted` as the successor and that was wrong on the
bytes: the token shipped ALONGSIDE `@utility glass-fill` at 7.0.0 (`216e1d54`) as a tint
OVERLAY whose `@property` initials are `transparent` and `0%`, so reading it as a
`background` paints nothing; and the old tint mix cannot be rebuilt by hand either, since
`--glass-bg-resting`, `--glass-tint-source` and `--glass-tint-strength` all measure 0
declarations across the 9.0.0 closure. `@utility text-mono-micro{font-family: var(--font-mono);
font-size: var(--type-micro); line-height: 1.25; letter-spacing: 0.025em}` is the
`text-admin-label` drop-in, 11px against the old 10px and lh 1.25 against 1, so the row
tells you to add `uppercase font-medium` where those carried meaning; `touch-hit-area`
has no drop-in and `--touch-target: 2.75rem` still ships, so the row gives the compose
recipe.

**`.paper-texture` is back-filled under §7.0.0, not §9.0.0.** It is not an `@utility`
and never was, so the roster diff does not carry it; `git log -S'.paper-texture {'`
dates its removal to `490cc46e` (2026-07-16), whose first tag is `v7.0.0` —
so 6.0.0 is its last shipping version and §7.0.0 is its section, with the one-line
pointer from §9.0.0 the work order allows. The recipe printed in the row is the real
one, recovered with `git show 490cc46e^:src/components/card/styles.css`:

```css
.paper-texture { background-image: var(--paper-grain-tooth); background-repeat: repeat;
                 background-size: var(--paper-grain-tile); background-blend-mode: multiply; }
:where(.dark) .paper-texture { background-blend-mode: screen; }
```

and the v4.0.0 spelling (`git show v4.0.0:src/styles/cards.css`) read
`var(--paper-clean-texture)` / `var(--paper-texture-size)` instead. **Both pairs still
ship at 9.0.0** — `--paper-grain-tooth`, `--paper-grain-tile: 140px`,
`--paper-clean-texture`, `--paper-texture-size: 200px 200px`, all four measured in the
9.0.0 dist — so the row can honestly offer either.

### 4 · C-1 doc — the Alert paragraph and the tone-on-glass strike

§8.0.0 gains the recompose paragraph: five tones on ONE `.glass-quiet` rung, no tone
wash, no per-tone ink rung coming, ink `text-card-foreground` = `--foreground`. **The
two ratios were re-derived here** through `G-CONTRAST-COMPUTED`'s own engine against
HEAD's tokens rather than copied from the ledger: light **16.19:1**
(`hsl(24 10% 10%)` on `hsl(30 85% 96%)`), dark **11.17:1** (`hsl(30 14% 90%)` on
`hsl(26 22% 17%)`). The paragraph says what to do (adopt, delete the
`bg-success/10 text-success` fork whole, set `announce` explicitly — it defaults `off`)
and carries the dead-glyph history with the C2 RECORD cited for the evidence pair.

Two deliberate wordings. The dated bracket names the filer's row — "O-20 C-1 (the ask
is value.js's AF-7)" — so the provenance sits in the provenance channel and the body
stays readable to a consumer who has never heard of AF-7. And the glyph paragraph now
says outright that the cure wave is **not on the registry yet, so at 9.0.0 the glyph is
still neutral**: without that clause a §8.0.0 paragraph reads as a shipped fact.

The `### The tone-on-glass recompose` line (its struck body at `:3750` in the
working tree, `:3500` before
this lane's insertions) is struck in place, not rewritten:
`Toast / Notification / ~~Alert~~ [2026-09-17 · Alert left the tint at 8.0.0 (W-ALERT);
see §8.0.0. Toast and Notification are not measured by this strike and stand.]`.

### 5 · CUT-4/5 — the `colorResolver` rows

§9.0.0 gains the prop-removal row. Every cite verified here:

- `git tag --contains 4a86570b` → `v9.0.0` and nothing else, so 9.0.0 is its first
  carrier.
- `FourierFieldProps` → **0 hits in the whole 9.0.0 dist**. The census row at `:1270`
  is struck with `~~/fourier-field~~ [2026-09-17 · … the name was never exported from
  anywhere. The row was wrong when it was written, not overtaken.]`.
- The prop's arc, read off the published `__VLS_Props` blocks: **required** at 3.13.0
  (`git show v3.13.0:src/components/custom/fourier-field/FourierField.vue` — the
  docblock says "The prop is REQUIRED" and the type is `colorResolver: ColorResolver`),
  `colorResolver?: ColorResolver` at 7.0.0 and 8.0.0, absent at 9.0.0.
- The live consumer, read read-only from `../slides` (pin `3.13.0`, never written):
  `Slide01.vue:11` imports `defaultBlobColorResolver`, `:35` binds `:color-resolver`,
  `:33` carries `variant="hero"`; `Slide05.vue:24` and `:43` do the same with
  `variant="final"`. `variant` left the component at **v5.0.0** (`git show
  v5.0.0:…/FourierField.vue` → 0 `variant?`), so both attributes are inert today. Both
  files already pass `color=` (`var(--viz-fourier)`, `var(--viz-chebyshev)`), so the
  repair really is "drop the binding, keep the `color` you already pass" — and HEAD's
  component does resolve `props.color` itself (`resolveColorString` at
  `FourierField.vue:108-111`).
- Three census rows added after verifying each ships in
  `dist/composables/color/index.d.ts`: `ColorResolver` (`:15`), `ColorHarmony` (`:81`),
  `DeriveBlobPaletteOptions` (`:94`).

**CHANGED from what was inherited.** The inherited `ColorHarmony` row said it was
"ruled CURE-NEXT-MAJOR". It is not: the ledger's CUT-4/5 ruling names `ColorResolver`
and `defaultBlobColorResolver` only, and `ColorHarmony` is `deriveHue`'s second
argument and `DeriveBlobPaletteOptions.harmony` — both of which stay. The row now says
nothing is ruled against it. The `ColorResolver` row says the ruling is a ruling and
not an execution, so nothing has moved, which is what the work order asked for.

### 6 · CUT-6..8 — the §8.1.0 recipe, and one CSP hash

D's four amendments (a)–(d) are applied under a heading that quarantines them from the
committed 9.0.0 record:

> _Amended after 9.0.0_
> [2026-09-17 · O-20 cure wave, UNRELEASED on the registry: everything from here to the
> end of this section describes the cured source, not the 9.0.0 bytes. The three rows
> above are a true record of what 9.0.0 shipped and are left standing.]

so (a) the widened `defaultDark` and (b) the normalize ordering are NEW rows and
paragraphs below that line rather than edits to the shipped table — §8.1.0's own
heading bracket already says it shipped inside 9.0.0, and rewriting the rows in place
would have made a shipped record describe unshipped bytes.

**(c) — all six figures recomputed at this seat**, `npx tsx` against
`src/composables/dark/darkModeSyncScript.ts` on this HEAD:

```
darkModeSyncScript()                            300 B  sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=
{ defaultDark: false }                          229 B  sha256-qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw=
{ defaultDark: true }                           228 B  sha256-manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54=
{ queryOverride: true }                         402 B  sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=
{ normalize: true }                             361 B  sha256-BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw=
{ defaultDark: { absent: false, auto: "os" } }  309 B  sha256-viDl5kPSBmJC9frsYXBK0PtoTtTWq4SnpZnkpC5cv4k=
```

and the 9.0.0 column read by importing the published emitter directly
(`publish-900/dist/dark.js`):

```
default                   300 B sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=
{defaultDark:false}       229 B sha256-qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw=
{defaultDark:true}        228 B sha256-manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54=
{queryOverride:true}      402 B sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=
{normalize:true}          361 B sha256-Xtel8uEYWeIEsJMO4TZWEump78fncLVrH4/fe166vIw=
```

The default is byte-identical, three opt-in hashes are unmoved, all five byte COUNTS
are unmoved, and exactly one hash moves — `{normalize:true}`,
`Xtel8uEY…` → `BxbpMykp…`, on the SHIPPED emission, not an intermediate. Every figure
D banked reproduces here independently, including the new 309 B object form.

**(d)** is the wire-it-with-a-plugin recipe, lifted from D with one paragraph added
that D could not write: *put it in every config that builds an HTML shell, not just the
one*, with our own miss named — because that is the residue this lane just discharged.

### 7 · HK-vite `:864` — the pencil-boil install line

Verified before striking: `package.json` `peerDependencies` declares **nine** names
(`@lucide/vue`, `@mkbabb/keyframes.js`, `@mkbabb/value.js`, `@vueuse/core`, `reka-ui`,
`tailwindcss`, `tw-animate-css`, `vue`, `vue-component-type-helpers`) and none is
`@mkbabb/pencil-boil`; `grep -rn 'pencil-boil' src demo` → **0**. The bullet is struck
in place with `~~…~~ [2026-09-17 · O-20 HK-vite · … HandMark needs no install:
/handmark is self-contained.]`.

### 8 · Residue, batch 2

**(i) `color-radius.css:320`.** The amber comment's dark half claimed `8.07:1`. Struck
in place beside the already-struck light half:
`the dark arm already clears ~~8.07:1~~ [2026-09-17 · O-20 residue: 7.72:1 — the figure
was never derived; §5 holds it now]`. The figure is the one the test prints, measured
through the gate's own engine on the dark scope (`--section-color-5`
`oklch(0.813 0.109 78.2)` over `--card` `hsl(26 22% 17%)`) = **7.72:1**.

The §5 enrolment is stronger than the work order's "≥ the text floor" framing, and
deliberately so: §5's contract is EXACT equality between the claimed figure and the
computed one (`expect(round(measured)).toBe(figure)`), plus an assertion that the claim
string is still present in the file, so a silent un-strike REDs too. 7.72 ≥ 4.5 holds
as well. This row is GREEN BY CONSTRUCTION and is not dressed as a born-RED: it was
written after the figure was measured, which is the only honest order for a row whose
job is to pin a figure to the bytes that produce it.

**(ii) the §6 headnote range.** Measured on HEAD across all thirteen dark rungs, through
this file's own `ratio()` and `darkScope`:

```
0:5.26 · 1:5.65 · 2:5.52 · 3:6.83 · 4:7.19 · 5:7.72 · 6:4.76 · 7:5.70 · 8:5.04 ·
9:6.60 · 10:7.54 · 11:7.85 · 12:5.41          MIN 4.76   MAX 7.85
```

The committed range **4.76–7.85 is true on HEAD** and stays.

**CHANGED from what was inherited.** The inherited headnote pasted all thirteen figures
into the comment. That is the exact defect C2's own cure round had just removed from
`color-radius.css` — derived data restated in prose that nothing holds — so the
thirteen figures are banked HERE, in this RECORD, and the headnote carries the range
plus a pointer to this file. One source of record, not two.

**(iii) the built demo.** `darkModeStamp()` moved OUT of `vite.config.ts` into a new
root module, `vite.dark-stamp.ts`, which BOTH configs now import; the plugin name stays
`"glass-ui:dark-mode-stamp"`, so D's arm at `darkModeSyncScript.test.ts` is untouched
and green. `demo/vite.demo-dist.config.ts` lists it. A sibling arm loads that config
through vite's own `loadConfigFromFile` and asserts the plugin, the `head-prepend`
placement and the exact `darkModeSyncScript()` bytes.

Then, under the shared build lock (`mkdir …/scratchpad/build.lock`, `npm run
demo:dist:build` exit **0** in 1.21s, `rmdir`), the paint-side witness — the first
bytes of the BUILT `dist-demo/index.html`:

```html
<html lang="en">
    <head>
      <script>(function(){try{var m=localStorage.getItem("vueuse-color-scheme");var d=m==="dark"||((m===null||m==="auto")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();</script>

        <meta charset="UTF-8" />
```

`grep -c vueuse-color-scheme dist-demo/index.html` → **1**, against 0 before. The stamp
serializes at byte 368 and is pure ASCII; `<meta charset>` lands at byte **695**, inside
the 1024-byte window the HTML standard requires — checked rather than assumed, because
`head-prepend` puts bytes ahead of it. CUT-8 is now delivered on both shells, and D's
residue 1 is discharged.

**(iv) the third ramp copy.** `demo/chassis/hero/aurora-hero.ts`'s
`SECTION_COLOR_OKLCH` rungs 4, 6, 10 and 11 are retuned to the tokens
(0.551→0.521 · 0.579→0.549 · 0.556→0.526 · 0.601→0.511), verified row-by-row against
`color-radius.css` §6. The literal stays — the hero needs a value at module time and
the demo parses no CSS — and §6c's LOCKSTEP family gains §6d, which holds the demo copy
against the token file, so three files now declare one ramp and the next retune REDs
here instead of drifting.

**CHANGED from what was inherited**, twice. The inherited comment had the new sentences
spliced into the middle of an existing one, leaving `…instead of drifting (four rungs
had already drifted when that arm landed) — `sectionColorToHeroPalette` parses`; it is
rewritten as two whole paragraphs. And the inherited §6d arm asserted row-by-row inside
a loop, so it died on stop 4 and never reported 6, 10 or 11 — a ramp retune moves
several rungs in one edit, and an arm that names one of them hides the rest. It now
collects every fork and asserts the empty list; the born-RED below shows all four.

### 9 · B-3 (4) — the published-roster ratchet

`.published-roster`, at the repo root beside `.bundle-ratchet`: 289 lines, plain text,
one name per line, `theme <name>` or `utility <name>`, sorted, LF-terminated, no
duplicates — and the datum reader enforces every one of those properties rather than
assuming them. It is the `@theme` + `@utility` roster of the CSS closure defined in act
1, parsed by the same code (`publishedRoster()` in `scripts/verify-export-types.mjs`,
which this seat's independent parser reproduces name-for-name across all three dists).

**It rides `G-NO-ORPHAN-EXPORT`, which `SEAT-BINDING.json:68-74` already binds to
`scripts/verify-export-types.mjs`.** No G-id, no seat, no binding row; the receipt is
byte-identical before and after. The arm runs inside `verifyExportTypes()` over the
closure `validateCss()` just produced, so it costs one pass over files already read
(measured: **26 ms** per call over 124 files) and cannot drift from what the verifier
considers published.

Both directions bite, and for different reasons. A SHRINK is excused by exactly one
thing — a `MIGRATION.md` REMOVAL ROW whose first cell is the departed name; the removal
is fine, the silence is the defect. A GROWTH is excused by nothing, which is the byte
ratchet's posture: a new published name is deliberate, so the datum moves deliberately
with it. An ABSENT datum throws, for the same reason `ratchetEvidence` does.

**[2026-09-17 · cure round 1 · the excuse predicate, corrected.]** As first written, the
shrink excuse was a whole-file substring test — `migration.includes(name)`. It reproduced
the sixteen and it satisfied the born-RED, and it was still wrong: 27 of the 289 live
names were already pre-excused by prose elsewhere in the document, 11 of them by a
SUCCESSOR cell in a row about some other name, so the arm would have gone silent on
their removal. The predicate is now a first-cell match — `^\|\s*`NAME`\s*\|`,
multiline — and a mention excuses nothing. The replayed born-RED is unchanged (16 against
`c645c393`'s MIGRATION, 0 against the working tree), 0 of the 289 committed names carry a
first-cell row, and the survivor mutation probe that was SILENT now fires. The same round
made a missing datum throw instead of returning `ABSENT` quietly, because
`release.yml:42` runs `verify:package` BEFORE `npm test` at `:48` — an armless ratchet
would have passed the release path on its way to a green battery. Both proofs are in the
cure-round section at the end of this record.

#### REFUSED WITH GROUNDS — `@layer components` class names are OUT of the roster

The ledger scopes this ratchet over `@theme` names AND `@utility` / `@layer components`
CLASS names. The class half is not carried, and the grounds are measured:

- Scoped to classes in `@layer components` blocks, the 7.0.0 → 9.0.0 interval fires
  three removals and **two of the three are false** — `.accent-tone` and
  `.glass-drag-lift` still ship; they moved out of a layer block into an unlayered
  rule, which is exactly the class A-3-CLASS counts 351 of and rules CURE-NEXT-MAJOR.
  A ratchet whose removals are two-thirds artefacts of the very defect another row is
  open on is not a detector.
- Widened to every class in a hand-authored selector in the closure, the same interval
  moves 134 names out and 107 in, almost all component-internal BEM parts
  (`.completion-seal__disc`, `.timeline-popover-body`, `.checkbox__seat`). A MIGRATION
  row per BEM leaf is not a migration guide, and a ratchet nobody can satisfy is one
  somebody turns off.
- A token and a utility are reached BY NAME by a consumer, through `var(--x)` and a
  class attribute. Those are precisely the two sets A-4-RIDER (246→242) and B-3 (49→47)
  measured, and pinning exactly them makes the born-RED below name exactly the sixteen
  the ledger predicted and nothing else.
- `.dropdown-menu__*` → `.menu__*` is the counter-example that proves the line: it IS a
  published rename and it HAS a MIGRATION row, because someone judged it
  consumer-facing. That judgement is not mechanisable from a selector.

The grounds are written into the code as a header comment so the next reader does not
re-derive them. **Everything else the ledger asked of this item landed**, including the
wiring — this is a narrowing of the datum's scope, not the "cannot ride an existing
seat" escape hatch, which was not needed.

## Born-RED proofs

All three source-side proofs were replayed at THIS seat, in a scratch mirror
(`…/scratchpad/laneR/red/` — `src demo tests scripts` copied, root configs copied,
`node_modules`/`dist`/`docs` symlinked), so the shared working tree was never reverted
under the concurrent lanes.

### 1 · `cn()` — the dead rung evicts a live one

`git show c645c393:src/components/_shared/class-names.ts` into the mirror:

```
 FAIL  tests/components/_shared/classNames.test.ts > cn — the font-size bucket > does not let the dead `text-admin-label` evict a live typography rung
AssertionError: expected 'text-admin-label' to be 'text-caption text-admin-label' // Object.is equality

Expected: "text-caption text-admin-label"
Received: "text-admin-label"

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
```

The inverse arm — `cn("text-caption","text-body")` → `"text-body"` — is GREEN in the
same run, before and after, which is the point: the deduper still dedupes, it just no
longer counts a name that paints nothing.

### 2 · the BUILT demo carries no stamp

`git show c645c393:demo/vite.demo-dist.config.ts` into the mirror:

```
 FAIL  tests/composables/dark/darkModeSyncScript.test.ts > G-NO-FLASH · the BUILT demo stamps too — demo/vite.demo-dist.config.ts carries it
AssertionError: demo/vite.demo-dist.config.ts carries the dark-mode stamp plugin: expected undefined to be truthy

 Test Files  1 failed (1)
      Tests  1 failed | 21 passed (22)
```

### 3 · §6d — the demo hero's ramp has forked

`git show c645c393:demo/chassis/hero/aurora-hero.ts` into the mirror, with the arm as
this seat rewrote it:

```
 FAIL  tests/styles/contrast-computed.test.ts > … > LOCKSTEP — the demo hero's literal ramp declares the SAME 13 values as the base
AssertionError: the demo hero's literal ramp forked from the tokens it says it copies:
--section-color-4: hero oklch(0.551 0.088 171.1) vs tokens oklch(0.521 0.088 171.1)
--section-color-6: hero oklch(0.579 0.201 30.4) vs tokens oklch(0.549 0.201 30.4)
--section-color-10: hero oklch(0.556 0.103 128.8) vs tokens oklch(0.526 0.103 128.8)
--section-color-11: hero oklch(0.601 0.092 208.0) vs tokens oklch(0.511 0.092 208.0)
: expected [ …(4) ] to deeply equal []
```

Four forks, named at once — exactly the four C2 retuned.

### GREEN — the three arms on the working tree

```
$ npx vitest run tests/styles/contrast-computed.test.ts tests/components/_shared/classNames.test.ts tests/composables/dark/darkModeSyncScript.test.ts
 Test Files  3 passed (3)
      Tests  102 passed (102)
```

### 4 · the roster ratchet, exactly as the work order specifies it

A scratch root carrying a datum built from the **7.0.0 dist roster** (295 names), the
HEAD emitted roster (289 names), and `MIGRATION.md` as of `c645c393`:

```
### RED — datum = 7.0.0 roster, MIGRATION.md as of c645c393
status PRESENT datum 295 emitted 289 failures 2

  .published-roster: 16 published name(s) left the emitted roster with no MIGRATION.md row:
  theme --color-surface-tint-35, theme --corner-k-sharp, theme --corner-k-soft, theme --ease-spring,
  theme --ease-spring-bouncy, theme --ease-spring-gentle, theme --ease-spring-press,
  theme --ease-spring-smooth, theme --ease-spring-snappy, theme --radius-input,
  theme --radius-tooltip, theme --text-admin-label, theme --z-index-hovercard,
  utility glass-fill, utility text-admin-label, utility touch-hit-area

  .published-roster: 10 name(s) in the emitted roster are not in the datum — rebind deliberately:
  theme --radius-media, theme --spacing-atom, theme --spacing-body, theme --spacing-family,
  theme --spacing-page, theme --spacing-residue, theme --spacing-section, theme --text-sm,
  theme --text-xs, utility glass-plate
```

The thirteen tokens and the three utilities, and nothing else. Then the SAME datum
against the working-tree `MIGRATION.md`, after acts 1 and 3:

```
### GREEN(shrink) — the SAME datum, working-tree MIGRATION.md
status PRESENT failures 1

  .published-roster: 10 name(s) in the emitted roster are not in the datum — rebind deliberately: …
```

The shrink arm is silent: every removed name now has a row. The growth arm still fires
against a 7.0.0 datum and SHOULD — ten names arrived across two majors, and the loud
growth is what a deliberate rebind answers. The committed datum IS that rebind, and the
forward ratchet is clean:

```
$ node -e 'verifyExportTypes({}).roster'
ROSTER {"status":"PRESENT","datum":289,"emitted":289}
```

### 5 · the arm is load-bearing where it runs

Driven through `verifyExportTypes({repositoryRoot: <mirror>})` — the same entry
`npm run verify:package` calls — with the datum planted in the mirror, never in the
shared tree:

```
0 · the committed pair, staged path → CLEAN  roster = {"status":"PRESENT","datum":289,"emitted":289}
1 · a datum name HEAD no longer emits, unnamed in MIGRATION → THREW:
  Invalid package artifact:
  .published-roster: 1 published name(s) left the emitted roster with no MIGRATION.md row: theme --zzz-phantom-rung
2 · an emitted name missing from the datum → THREW:
  Invalid package artifact:
  .published-roster: 1 name(s) in the emitted roster are not in the datum — rebind deliberately: utility glass-plate
3 · restored → CLEAN  roster = {"status":"PRESENT","datum":289,"emitted":289}
```

**And on the real release path**, `npm run verify:package` (= `scripts/release.sh:35`,
`release.yml:42`):

```
$ npm run verify:package
VERIFY_PACKAGE_EXIT=1
Error: G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2551808 > 2549378
    at ratchetEvidence (scripts/verify-export-types.mjs:937:52)
    at verifyExportTypes (scripts/verify-export-types.mjs:1017:23)
```

That RED is the wave-level bundle ratchet, **not this arm and not this lane** — D's
residue 2 predicted it and the rebind is a batch-close act. It is also the proof the
arm runs there: `ratchetEvidence` is called at `:1034`, strictly AFTER the roster
failures are pushed at `:1016` and the `if (failures.length) throw` at `:1017` (line
numbers on the post-cure file; the quoted run above predates cure round 1). The run
reached `:1017`, so the roster arm ran and contributed nothing.

### Datum freshness — why no library build was taken

The datum is bound to `dist/`, built at 18:05 from the batch-1 tree, and `src/` has
moved since. The roster is NAME-only, so the question is whether any name moved. It did
not, measured directly: the roster of all 133 CSS files under `src/` on the working
tree is **242 `@theme` + 47 `@utility`**, and set-differenced against the committed
datum in both directions the answer is `(none)` four times over. A fresh library build
would reproduce the same 289 lines, so the shared `dist/` lock was not spent proving a
measured identity.

## Verify — verbatim, real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
EXIT-tsconfig.json=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
EXIT-tsconfig.test.json=0
```

Both read from `$?` with no pipe in the command.

```
$ npx vitest run tests/public-surface.spec.ts
 Test Files  1 passed (1)
      Tests  94 passed (94)
PS_EXIT=0

$ npx vitest run tests/styles/contrast-computed.test.ts tests/components/_shared/classNames.test.ts tests/composables/dark/darkModeSyncScript.test.ts
 Test Files  3 passed (3)
      Tests  102 passed (102)
```

Full battery, stated as its full summary line:

```
$ npx vitest run
 Test Files  233 passed (233)
      Tests  2218 passed | 10 expected fail (2228)
BATTERY_EXIT=0
```

**Whole-green. Zero REDs to attribute, this lane's or anyone's.** The `10 expected fail`
is the standing xfail count, unmoved.

That is the third battery run, and the two before it are worth stating rather than
hiding, because they are one story:

- Run 1 — `13 failed | 2205 passed | 10 expected fail (2228)`, wall 113s.
  **Every one of the thirteen was `Error: Test timed out in 5000ms`**, across seven
  files, most of them nowhere near this fence (`menu/contract`, `aurora/atoms`,
  `demo/*`, `glass-subtlety`, `comment-ratio`) and two of them pre-existing subprocess
  probes in `public-surface.spec.ts` (`:648`, `:956`). It is machine contention, not a
  defect: vitest's default timeout is 5s and `vitest.config.ts` sets no override.
- One of the thirteen WAS this lane's — the committed-pair roster arm. Both roster arms
  spawn a node subprocess that imports the verifier, which loads `typescript` and
  `lightningcss` before a line of the arm's own work runs. The arm's own cost is 26 ms;
  the rest is module load. So both were given an explicit `30_000`, which is the house
  idiom for exactly this shape (`darkModeSyncScript.test.ts`'s config-loading arms carry
  the same). The pre-existing probes at `:648` and `:956` were NOT touched — they are
  not this fence, and re-timing another lane's arms is not this lane's call.
- Run 2 — `1 failed | 2217 passed | 10 expected fail (2228)`, wall 26s. Both roster arms
  green. The one RED was
  `tests/demo/router-field-ownership.test.ts > keeps one story-owned field across
  DockStage route navigation`, again a 5s timeout, in a file wholly outside this fence;
  it passes alone in 2.21s, and Lane E2 hit the same arm (its scratch carries a
  `router-30s` log).
- Run 3, above — whole-green.
- Run 4, taken after this RECORD was written, to make sure the green was not the
  accident: `1 failed | 2217 passed | 10 expected fail (2228)`, wall 25s — the SAME
  foreign router arm, the same 5s timeout. It passes isolated in 1.5s, twice in a row.

**So the honest statement is not "the battery is green" but this**: 2218 of 2218 live
tests pass, and one foreign arm in `tests/demo/router-field-ownership.test.ts` flakes on
the 5s default under a loaded battery — it failed in runs 1, 2 and 4 and passed in run
3, and it passes every time it is run alone. Nothing in this lane's fence has REDded
since the timeouts were stated on the two roster arms; run 3's `BATTERY_EXIT=0` is
quoted above because it is the run in which that arm won its race, not because it is
the only run that counts. The flake is named in Residue and belongs to whoever owns
`tests/demo/`.

Gate receipt, verbatim, after the change:

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
REGISTER_EXIT=0
```

`seats:60`, `violations:0`, `drift:0`, `rosterSha256:282d05cf` — **byte-identical to the
step-0 receipt**. Nothing minted: no G-id, no seat, no `SEAT-BINDING.json` row. The
roster ratchet is an ARM of `G-NO-ORPHAN-EXPORT` in the file that seat already binds,
and the three new test arms file as close-battery rows under seats that already exist
(`G-NO-ORPHAN-EXPORT`, `G-CONTRAST-COMPUTED`, `G-NO-FLASH`); the `cn()` unit is a plain
vitest file with no G-id at all.

### Prettier — stated honestly

```
$ npx prettier --check tests/components/_shared/classNames.test.ts vite.dark-stamp.ts demo/vite.demo-dist.config.ts
Checking formatting...
All matched files use Prettier code style!
EXIT=0
```

The three files whose bytes are entirely new or entirely this lane's pass.
`.published-roster` has no parser (`[error] No parser could be inferred`) — expected, it
is a plain-text datum like `.bundle-ratchet`.

The other eight files in the fence FAIL `prettier --check`, **and they fail identically
on their `c645c393` bytes** — verified by checking out those bytes into a scratch tree
and running the same command: the same eight warn. The repo carries **no prettier
configuration at all** (no `.prettierrc*`, nothing under `prettier` in `package.json`,
no `format`/`lint` script), so `--check` measures against prettier's defaults — 80
columns, 2-space indent — while the repo is authored at 4-space and ~90. "Fixing" them
would rewrite eight files wholesale, against the house style, in the middle of a
three-lane wave. **So no formatting was changed**, and the state is recorded rather
than laundered.

## Fence

Created or modified by this lane, and nothing else:

- `MIGRATION.md`
- `src/components/_shared/class-names.ts`
- `tests/components/_shared/classNames.test.ts` (new)
- `scripts/verify-export-types.mjs`
- `tests/public-surface.spec.ts`
- `.published-roster` (new, repo root — the datum)
- `src/styles/tokens/color-radius.css` (the `:320` comment only)
- `tests/styles/contrast-computed.test.ts`
- `demo/chassis/hero/aurora-hero.ts`
- `demo/vite.demo-dist.config.ts`
- `vite.config.ts`
- `vite.dark-stamp.ts` (new, repo root — the one module both configs import)
- `tests/composables/dark/darkModeSyncScript.test.ts`
- `docs/tranches/BK/execution/2026-09-17-o20-cure/R/RECORD.md`

`vite.library.ts` was NOT touched — it is T2's, and it is the precedent this lane
followed for a root-level vite helper module, nothing more. `DESIGN.md`, `README.md`,
`src/styles/glass/veil.css`, `src/styles/theme/bridges.css`,
`src/styles/tokens/scale-paper.css`, `docs/canon/*`, `docs/audits/*`,
`docs/instructions/*`, `docs/archive/*`, `tests/design/`, `tests/docs/` are T1's and
T2's, are dirty in the porcelain, and were neither opened nor edited. `index.html`,
`src/styles/tokens/light-dark.css`, `src/components/alert/index.ts` and
`.bundle-ratchet` were read and not written.

No `git add` / `commit` / `stash` / `checkout` / `reset` at any point — the only git
verbs used were `status`, `diff`, `rev-parse`, `log`, `show`, `tag`, `ls-tree`,
`grep`, all read-only. **No sibling repo was written**: `../slides` was read to verify
four cites and nothing else; the 7.0.0 and 8.0.0 tarballs were fetched with `npm pack`
into the scratchpad, never into the repo. `dist-demo/` was rebuilt once under the shared
`build.lock`, which was released immediately (`rmdir`); no library build ran and `dist/`
was not touched. No browser was opened. All scratch lives in `…/scratchpad/laneR/`,
outside the repo.

## Residue

1. **The bundle ratchet needs its batch-close rebind.** `npm run verify:package` is RED
   at `2551808 > 2549378` on the wave's `dist/`. D's residue 2 already owed this and
   measured its own `+896 B` floor; this lane adds nothing to `dist/` (its only shipping
   bytes are one regex character out of `class-names.ts` and one comment in
   `color-radius.css`). The rebind is the wave's, on a committed-tree build — which the
   `.bundle-ratchet` header comment says in as many words.
2. **`defaultBlobColorResolver` has no census row.** The `/color` census rows added here
   are the three the work order names, all types. The const is named throughout the new
   §9.0.0 prose but the alphabetical type/const census carries no lowercase entry
   anywhere, so adding one would be minting a convention. Flagged, not done.
3. **Three pre-existing arms have no timeout and flake on the 5s default under a loaded
   battery**: `public-surface.spec.ts:648` and `:956` (subprocess probes, same shape as
   the two this lane re-timed) and
   `tests/demo/router-field-ownership.test.ts > keeps one story-owned field across
   DockStage route navigation`, which RED'd in three of this lane's four full-battery
   runs and passes isolated in 1.5s. Same one-line cure in each case, none of them this
   fence. Worth doing in one pass rather than lane by lane — a battery that REDs at
   random on machine load teaches everyone to read past its REDs, which is how a real
   one gets missed.
4. **The repo has no prettier configuration.** Every `--check` in every lane's record is
   measuring against prettier's defaults rather than against the house style, which
   makes it a gate that always fails and therefore says nothing. Either commit a
   `.prettierrc` that matches how the repo is actually written, or stop citing
   `prettier --check` as verification. Owner's call; named here because three lanes ran
   it this wave.
5. **C2's residue 5 is still the live one** — the owner's ruling on whether the Alert
   glyph is a REQUIRED graphical object under WCAG 1.4.11, and if so which tone token
   drops L. This lane's §8.0.0 Alert paragraph tells consumers the glyph will paint its
   tone from the cure wave on; if the ruling moves `--success` or `--warning`, that
   paragraph's last sentence is unaffected but the tone values change under it.
6. **`.published-roster` is bound to `dist/` as built at 18:05.** Proven equal to what
   `src/` declares today, so it binds GREEN on the next build — but if a later wave
   mints an `@theme` or `@utility` name, that build REDs the growth arm and the datum
   must move with it, deliberately. That is the design, not a defect; it is written
   here so the first person to see the RED knows it is the ratchet working.

## FOR THE DRIVER

1. **Commit pathspec for this lane** (13 paths + this record):
   `MIGRATION.md src/components/_shared/class-names.ts tests/components/_shared/classNames.test.ts
   scripts/verify-export-types.mjs tests/public-surface.spec.ts .published-roster
   src/styles/tokens/color-radius.css tests/styles/contrast-computed.test.ts
   demo/chassis/hero/aurora-hero.ts demo/vite.demo-dist.config.ts vite.config.ts
   vite.dark-stamp.ts tests/composables/dark/darkModeSyncScript.test.ts
   docs/tranches/BK/execution/2026-09-17-o20-cure/R/`.
   **`.published-roster` and `vite.dark-stamp.ts` are new files at the repo root** and
   must be `git add`ed explicitly. Since cure round 1 an absent datum is loud, not
   silent: `rosterRatchetFailures` THROWS on it (`verify:package` dies with
   `G-NO-ORPHAN-EXPORT: .published-roster is missing`) and `tests/public-surface.spec.ts`
   REDs the battery. The `git add` reminder stands; the "would not be loud" does not.
2. **`dist-demo/` was rebuilt** and is now newer than every source, which also clears
   the `tests/gates/boot-graph.test.ts` staleness RED that C2's round recorded. If any
   lane writes `src/` after this, that gate goes stale again and the wave-close rebuild
   is still owed.
3. **The bundle ratchet rebind is owed before release** — residue 1. `verify:package`
   cannot pass until it lands, and the roster arm sits upstream of it, so a driver
   reading that RED should not mistake it for this lane's.
4. **One refuse-with-grounds needs a ruling**: the roster pins `@theme` + `@utility`
   names and NOT `@layer components` class names, against the ledger's literal scope.
   The grounds are measured and written in act 9 and in the code. If the adjudicator
   wants the class half anyway, it needs a decision about BEM leaves first, because the
   measurement says the widened form moves 241 names in one interval.
5. **Two inherited claims were corrected, not carried** — the `ColorHarmony` row's
   "ruled CURE-NEXT-MAJOR" (it is not ruled at all) and the spring family's "minting six
   dead Tailwind utilities" (they are bridges; five never emitted a custom property).
   Both are stated in the act ledger with the measurement behind them, in case a
   challenger reads the predecessor's diff rather than the tree.
6. **No owner decision is embedded anywhere in this lane's bytes.** Every CURE-NEXT-MAJOR
   item named in MIGRATION says, in the row itself, that it is a ruling and not an
   execution.

---

## CURE ROUND 1 — 2026-09-17

**Seat** cure · **model** `claude-opus-5` — asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a0880ff6-f7d/agent-ab976802864c4f694.jsonl`,
the `"model"` field, found by grepping the workflows tree for a phrase unique to this
seat's prompt ("ADJUDICATION SUMMARY: ADJUDICATOR, lane R") and confirmed by its live
mtime. **base** `master` @ `43c72339` (batch 5a landed under the implement seat; this
lane's fence diff vs `c645c393` was unchanged at launch: 10 files, +627/−39, plus 3 new).

Seven adjudicated cures, applied and nothing else. The three points of attention were
re-measured here before any byte and all three hold (the arm rides
`G-NO-ORPHAN-EXPORT` at a real path, every MIGRATION deletion is a dated strike-in-place,
and the successor claims reproduce) — one successor was wrong and is cure 4.

### What changed

**1 · `scripts/verify-export-types.mjs` — the shrink excuse is a ROW, not a mention.**
`migration.includes(name)` is gone. A departed name is excused only by a MIGRATION.md
table row whose FIRST cell is the backticked bare name:
`new RegExp("^\\|\\s*`" + escapeRegExp(name) + "`\\s*\\|", "m")`, with a one-line local
`escapeRegExp`. Deliberately not widened to a word boundary — a successor cell or a
sentence must not excuse. The docblock now says removal-table row and carries the
measurement that makes the distinction load-bearing.

**2 · same file — a missing datum fails loud, in the `.bundle-ratchet` idiom.**
`rosterRatchetFailures(repositoryRoot, roster, { allowMissingRatchet = false } = {})`
throws `G-NO-ORPHAN-EXPORT: .published-roster is missing; bind the emitted roster
deliberately` unless the caller opts out, mirroring `ratchetEvidence` at `:941-945`. The
call site at `:1015` passes `{ allowMissingRatchet }` — already an option of
`verifyExportTypes` at `:985` and a CLI flag at `:1070`. No new option, no mint. The
grounds: `release.yml` runs `verify:package` at `:42` and `npm test` only at `:48`, so an
armless ratchet passed the RELEASE path however loudly the battery complained afterward.

**3 · `tests/public-surface.spec.ts` — the hostile probe no longer codifies the weak
rule.** Case 0 expects the throw and a second call with `{ allowMissingRatchet: true }`
returning `"ABSENT"`. The old case 2, which excused the shrink with the bare sentence
`The token --gone was removed at 8.0.0.`, is split: a REAL removal row
``| `--gone` | removed 8.0.0 |`` still excuses (`[]`), and a NEW case carrying only that
bare sentence plus a successor-cell mention ``| `--other` | use `--gone` instead |``
expects the shrink to fire anyway. Indices shift 0..6 → 0..8; the 30 000 ms budgets are
untouched; the headnote is reworded to the first-cell rule.

**3b · one consequence, declared.** Cure 2 broke a sibling arm in the same file: "Row 8
package falsifiers > rejects published CSS that does not parse" (`:685`) drives
`verifyExportTypes` over a SYNTHETIC fixture root that has no `.published-roster` and is
not owed one — it plants a CSS parse defect, not a name removal. It now passes
`allowMissingRatchet: true`, the same opt-out the byte ratchet takes for the same reason
(that arm does not `pack`, which is why it never needed the option before). This is a
consequence of an adjudicated cure, not an eighth cure; without it cure 2 cannot land.

**4 · `MIGRATION.md:332` — the `glass-fill` successor was wrong on the bytes.** The row
named `--glass-fill-tinted`. Measured: that token shipped ALONGSIDE `@utility glass-fill`
at 7.0.0 (`216e1d54`) as a tint OVERLAY whose `@property` initials are `transparent` and
`0%`, so reading it as a `background` paints nothing. The measured successor is
`@utility glass-plate`, introduced in the SAME commit `4b1a9733` that removed
`glass-fill` — `.glass-card` moved from `@apply glass-fill` to `@apply glass-plate`
there. It paints `background: var(--glass-veil)` and takes its rung from
`--glass-veil-tier`, where `--glass-fill-rung` used to go. The row also says the old tint
mix cannot be composed by hand: `--glass-bg-resting`, `--glass-tint-source`,
`--glass-tint-strength` all measure 0 declarations across the 9.0.0 closure. `:336-337`
folded into "that gain is the successor named above". Uncommitted prose — plain rewrite,
no bracket.

**5 · `MIGRATION.md:69` — `variant` dating.** `dead since **5.0.0** (`1c2cda3a`,
2026-07-14)` → `dead since **4.1.0** (`cb1e09fd`, 2026-06-19)`. Measured: the prop is
declared at `v4.0.1:src/components/custom/fourier-field/FourierField.vue:36`
(`variant?: "hero" | "final"`), retired at `cb1e09fd`, whose first tag is `v4.1.0`;
`git log -S'"hero" | "final"'` shows `1c2cda3a` touching only
`scripts/proof-fourier-{decides,field}.mjs` and `scripts/proof-viz-fourier-ribbon.mjs`.

**6 · `MIGRATION.md:59` — the published prop list.** `declares `color?`, `seed` and
`freeze`` → the seven props `publish-900/dist/components/fourier-field/FourierField.vue.d.ts:20-37`
actually declares: `config?`, `spectrum?`, `getPalette?`, `color?`, `seed?`, `freeze?`,
`interactive?`.

**7 · `tests/styles/contrast-computed.test.ts` — the §6d splice.** The §6d comment and
its `it("LOCKSTEP — the demo hero's literal ramp …")` sat BETWEEN the §6c headnote and
§6c's own `it()`. §6d now follows §6c's test. A pure move, asserted as one: the edit is
gated on seven exact line anchors and on `sorted(new) == sorted(old)` — the same bytes,
reordered, no assertion touched.

**8 · this record, trued to the bytes.** `:194` `dc4267fc` (2026-08-12) → `4b1a9733`
(2026-08-04, first tag `v8.0.0`; `dc4267fc` is tagged `v9.0.0` only and edits comments) ·
`:186-187` "Ten … fourteen" → "Thirteen of the 23 live names have a `@theme` bridge as
well; ten are `@utility`-only" (measured here: 13 / 10 / 0, `admin-label` the only one
with neither) · `:153-154` "so it alone had a live `var()` reader" → the resolvability
wording (0 `var(--ease-spring…)` readers ship anywhere in the 7.0.0 package) · `:493`
"21 skipped" → "21 passed" · the `:996`/`:997` citations → `:1016`/`:1017`, with
`ratchetEvidence` at `:1034`, all on the post-cure file · `:800-802` reworded (a missing
datum now THROWS on `verify:package` and REDs the battery; the `git add` reminder stands,
"not loud" does not) · an act-9 paragraph for the excuse predicate · the `glass-fill`
successor correction in act 3.

### Born-RED, on bytes

The pre-cure verifier was copied to
`scratchpad/o20-cure/verify-pre.mjs` (md5 `396fe9b11d33af6fcc7b3575c61f3767`) and the
AMENDED probe body was run against it and then against the cured tree — same probe, same
`node --input-type=module -e` shape the spec uses, only the imported module differs.

```
$ sh run.sh file://…/o20-cure/verify-pre.mjs          # RED
[
 { "status": "ABSENT", "datumPath": "…/fixture-jU1A/.published-roster", "failures": [] },
 "ABSENT",
 [".published-roster: 1 published name(s) left the emitted roster with no MIGRATION.md row: theme --gone"],
 [],
 [],                                       ← case 4, the bare sentence + successor cell: EXCUSED
 [".published-roster: 1 name(s) in the emitted roster are not in the datum — rebind deliberately: utility brand-new"],
 "G-NO-ORPHAN-EXPORT: .published-roster is not sorted",
 "G-NO-ORPHAN-EXPORT: .published-roster carries a duplicate",
 "G-NO-ORPHAN-EXPORT: .published-roster must end in exactly one LF"
]
```

Case 0 returns an OBJECT where the amended probe expects `/\.published-roster is
missing/`, and case 4 returns `[]` where it expects one failure. Two REDs, the two the
cures target.

```
$ sh run.sh file:///Users/mkbabb/Programming/glass-ui/scripts/verify-export-types.mjs   # GREEN
[
 "G-NO-ORPHAN-EXPORT: .published-roster is missing; bind the emitted roster deliberately",
 "ABSENT",
 [".published-roster: 1 published name(s) left the emitted roster with no MIGRATION.md row: theme --gone"],
 [],
 [".published-roster: 1 published name(s) left the emitted roster with no MIGRATION.md row: theme --gone"],
 [".published-roster: 1 name(s) in the emitted roster are not in the datum — rebind deliberately: utility brand-new"],
 "G-NO-ORPHAN-EXPORT: .published-roster is not sorted",
 "G-NO-ORPHAN-EXPORT: .published-roster carries a duplicate",
 "G-NO-ORPHAN-EXPORT: .published-roster must end in exactly one LF"
]
```

**(a) The 7.0.0-datum replay, re-run through the CURED predicate.** Datum = the 7.0.0
roster parsed with the shipped `publishedRoster()`; emitted = the committed
`.published-roster`; MIGRATION swapped between `git show c645c393:MIGRATION.md` and the
working tree.

```
7.0.0 roster: 295 theme 246 utility 49
HEAD roster : 289 theme 242 utility 47
shrink (7.0.0 → HEAD): 16
    theme --color-surface-tint-35 · theme --corner-k-sharp · theme --corner-k-soft ·
    theme --ease-spring · theme --ease-spring-bouncy · theme --ease-spring-gentle ·
    theme --ease-spring-press · theme --ease-spring-smooth · theme --ease-spring-snappy ·
    theme --radius-input · theme --radius-tooltip · theme --text-admin-label ·
    theme --z-index-hovercard · utility glass-fill · utility text-admin-label ·
    utility touch-hit-area

replay vs c645c393 MIGRATION: 16 unnamed
replay vs working-tree MIGRATION: 0 unnamed
```

Exactly the 13 tokens + 3 utilities, and silent on the shrink arm against the cured
MIGRATION. The cure does not weaken the arm it was written for.

**(b) The survivor mutation probe.** Drop two names the library still ships from the
emitted roster and ask whether the arm notices.

```
PRE-CURE   dropped: theme --radius-media + utility glass-plate → failures: []
CURED      dropped: theme --radius-media + utility glass-plate → failures: [
  ".published-roster: 2 published name(s) left the emitted roster with no MIGRATION.md row: theme --radius-media, utility glass-plate"
]
```

Silent before, loud now. That is the whole defect: both names are mentioned in MIGRATION
as SUCCESSORS, and the substring rule read a successor cell as a removal row.

**(c) The census behind it.** Of the 289 committed datum names, **0** carry a first-cell
removal row today — the cured predicate pre-excuses nothing. The old substring rule
pre-excused **27 of 289**.

### Verify — verbatim, real exit codes

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
GATE_EXIT=0
```

Byte-identical to this lane's baseline receipt. Nothing minted.

```
$ npx vitest run tests/public-surface.spec.ts tests/styles/contrast-computed.test.ts tests/components/_shared/classNames.test.ts tests/composables/dark/darkModeSyncScript.test.ts
 Test Files  4 passed (4)
      Tests  196 passed (196)
LANE_EXIT=0

$ npx vitest run tests/styles/contrast-computed.test.ts tests/components/_shared/classNames.test.ts tests/composables/dark/darkModeSyncScript.test.ts
 Test Files  3 passed (3)
      Tests  102 passed (102)
THREE_EXIT=0

$ npx vitest run tests/public-surface.spec.ts
 Test Files  1 passed (1)
      Tests  94 passed (94)
PS_EXIT=0
```

The 3-file 102 holds across cure 7 — the move changed no assertion, and `public-surface`
stays at 94 because the amended probe adds cases, not `it`s.

```
$ npx vue-tsc --noEmit -p tsconfig.json        → TSC_MAIN_EXIT=0 (no output)
$ npx vue-tsc --noEmit -p tsconfig.test.json   → TSC_TEST_EXIT=0 (no output)
```

```
$ npx vitest run
 Test Files  1 failed | 232 passed (233)
      Tests  1 failed | 2218 passed | 10 expected fail (2229)
BATTERY_EXIT=1
```

The one RED is FOREIGN and is the wave-close residue the adjudicator predicted:

```
 FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the dist-demo it measures is NEWER than every source it is built from
AssertionError: dist-demo/index.html is STALE (built 2026-09-18T01:49:07.692Z, newest source 2026-09-18T02:11:49.130Z)
```

The newest source is `src/components/card/Card.vue` at `02:11:49.130Z` — the driver's
batch-5a commit, landed after this lane built `dist-demo/` at `01:49`. No file in R's
fence is in that comparison (R touched nothing under `src/` or `demo/` this round, and
its own edits are timestamped later still without moving the number). The rebuild is a
batch-close act, as residue 2 and FOR THE DRIVER #2 already say.

```
$ npm run verify:package
VERIFY_PACKAGE_EXIT=1
Error: G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2551967 > 2549378
    at ratchetEvidence (…/verify-export-types.mjs:954:52)
    at verifyExportTypes (…/verify-export-types.mjs:1034:23)

$ node -e 'verifyExportTypes({}).roster'
{ "status": "PRESENT", "datum": 289, "emitted": 289 }
ROSTER_EXIT=0
```

The roster is PRESENT 289/289 and contributes no failure; the run REDs only at the
foreign byte ratchet, which sits strictly downstream (`:1034` vs the roster's `:1015`).
That the run REACHES `:1034` is the proof the arm ran on the release path.

```
$ npx prettier --check scripts/verify-export-types.mjs tests/public-surface.spec.ts MIGRATION.md tests/styles/contrast-computed.test.ts docs/…/R/RECORD.md
[warn] all five                                         PRETTIER_EXIT=1

$ git show c645c393:<file> | npx prettier --check --stdin-filepath <file>
scripts/verify-export-types.mjs          WARN
tests/public-surface.spec.ts             WARN
MIGRATION.md                             WARN
tests/styles/contrast-computed.test.ts   WARN
```

Status UNCHANGED vs `c645c393` on every file — all four were already outside prettier's
shape, and the sibling lane records (`D`, `C2`, `P`) are `WARN` too. Nothing reformatted.

### Fence

Files touched this round: `scripts/verify-export-types.mjs` · `tests/public-surface.spec.ts`
· `MIGRATION.md` · `tests/styles/contrast-computed.test.ts` ·
`docs/tranches/BK/execution/2026-09-17-o20-cure/R/RECORD.md`. All five are in R's fence.
Nothing else in the tree was written, no sibling repo was written (slides and the three
published dists were read only), and no `git add`/`commit`/`stash`/`checkout`/`reset` was
run. Scratch lives under
`scratchpad/o20-cure/` (`verify-pre.mjs`, `probe.mjs`, `run.sh`, `replay.mjs`,
`mutate.mjs`, `MIGRATION-c645c393.md`) and nothing was copied into the repo.

### FOR THE DRIVER — cure round 1 additions

7. **The commit pathspec is unchanged** — cure round 1 modified only files already on
   this lane's list.
8. **`tests/public-surface.spec.ts:709` now passes `allowMissingRatchet: true`.** It is a
   required consequence of cure 2, not a loosening: that arm drives `verifyExportTypes`
   over a synthetic fixture root. The REAL repo path (`:924`, `verifyExportTypes({})`)
   passes no such flag and is where the datum is held.
9. **FOR THE DRIVER #1's warning is now the other way round.** Forgetting to `git add
   .published-roster` no longer passes quietly — `verify:package` dies with
   `G-NO-ORPHAN-EXPORT: .published-roster is missing` and the battery REDs at
   `tests/public-surface.spec.ts`. The `git add` is still owed; the silent-failure risk
   is gone.
10. **The battery's only RED is `tests/gates/boot-graph.test.ts` and it is the wave's,
    not a lane's.** `dist-demo/` must be rebuilt after the last `src/`-writing lane
    commits, before any close claims a green battery.
