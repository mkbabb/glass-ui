# Lane T1 — A-5 · A-14 · B-2 · B-7 doc · HK-vite (README peer rows)

**Date** 2026-09-17 · **seat** implement · **model** `claude-opus-5`, read from this seat's
own transcript at
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a3cf7fcb-9c4/agent-a46f7ccbc2cef468f.jsonl`
(found by grepping the workflow transcript tree for a phrase unique to this lane's prompt,
`HK-vite README rows`; `CLAUDE_MODEL_ID` unset, parent session file not used). The
assertion gated every command in the chain with `&&`, the step-0 baseline included ·
**spec of record** `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`
§A-5, §A-14, §B-2, §B-7, §HK-vite-comment + the three cross-cutting facts at its head +
the lane table at its tail · **seat evidence** `investigate__tokens` / `verify__tokens`,
`investigate__asks-surface` / `verify__asks-surface`, `investigate__housekeeping` /
`verify__housekeeping` · **published datum** `scratchpad/publish-900/dist` (read-only).

## Step-0 baseline

Banked before a byte was written, in the same `&&` chain as the model assertion.

```
$ git -C /Users/mkbabb/Programming/glass-ui rev-parse HEAD
c645c39303bdd988101c590af08ef64bded98dda
$ git status --porcelain
(empty)
$ git diff --stat
(empty)
```

The tree was clean at HEAD `c645c393`. Foreign dirt appearing later in `git status`
(`docs/archive/README.md`, `docs/audits/overfitting-audit.md`, `docs/canon/*`,
`docs/instructions/README.md`, `src/styles/tokens/scale-paper.css`, `vite.library.ts`,
`tests/docs/`) is Lane T2's and was not read for content, not edited, and not staged.

## Census

| file | + | − | act |
| --- | --- | --- | --- |
| `docs/design/tunable-anim.md` | 6 | 6 | A-5 — Kind-5 row retargeted to `--cartoon-press-t`; five ghost rows struck; the cast-driver note added |
| `docs/design/affordance-map.md` | 1 | 1 | A-5 — the Card row rewritten to the measured affordance set |
| `DESIGN.md` | 12 | 2 | A-5 §cast recipe (both shipped paths) · B-2 "### Plate register" · B-7 the `i mod 13` wrap |
| `README.md` | 33 | 13 | A-14 §Design Tokens correction + bridge paragraph + easing seam · B-5 clipboard contract · fact-2 GitHub pointer · HK-vite peer-table strike |
| `src/styles/glass/veil.css` | 10 | 0 | B-2 — the plate register as a header block in the file that ships (comment only) |
| `src/styles/theme/bridges.css` | 4 | 1 | A-14 — the pointer comment to README §Design Tokens (comment only) |
| `tests/design/drive-tokens.test.ts` | 90 | new | A-5 born-RED |
| `tests/design/token-bridges.test.ts` | 105 | new | A-14 born-RED (+ the anti-regression arm) |
| `tests/design/plate-register.test.ts` | 63 | new | B-2 born-RED |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md` | this file | new | the record |

Ten files, all inside the fence. No build was run; the shared `build.lock` was never taken
and `dist/` was not touched.

**Form used.** `DESIGN.md`, `README.md`, `docs/design/*` are living references, so every
false sentence was REWRITTEN plainly — no dated brackets anywhere in this lane. Nothing in
the lane's surface is a ledger or a tranche record, so no bracket form was needed.

## Fence note — `tests/design/`, not `tests/docs/`

The prompt's fence named `tests/docs/ (create)`. The ledger's lane table at its tail assigns
T1 `tests/design/*` and assigns **T2** `tests/docs/*`. The tree confirms the ledger:
`tests/docs/consumer-paths-exist.test.ts` was created at 19:53 by the concurrent lane
(HK-audit-path's existence assertion). Writing into `tests/docs/` would have been a fence
collision, so the lane took the ledger's spelling, `tests/design/`. The repo had no
docs-test location before this pass — neither `tests/design/` nor `tests/docs/` existed at
HEAD. `vitest.config.ts` globs `tests/**/*.{test,spec}.{ts,tsx}`, so both are picked up
with no config change.

## Act ledger

### A-5 · `--cartoon-press-t` is canonical — LANDED, and wider than the ledger's one row

The ledger's answer is upheld on the bytes: `--card-press-t` has **zero** registrations,
declarations and `var()` reads in `src/`; `--cartoon-press-t` is registered at
`tokens/property-regs.css` and read twice in `.cartoon-cast`
(`glass/glass-atom.css:38-39`).

**`docs/design/tunable-anim.md`** — the Kind-5 table. Row 133 retargeted:

```
| cartoon cast press | `--cartoon-press-t` | 0 | [0,1] | the consumer's own driver — `useLiquidPress({ pressVar: "--cartoon-press-t" })` |
```

**Five further rows were struck, and this is the one place the lane went past the ledger's
letter.** The born-RED assertion was written first, and it measured *six* ghosts in that
table, not one:

| row | token | registrations | declarations | `var()` reads |
| --- | --- | --- | --- | --- |
| card press | `--card-press-t` | 0 | 0 | 0 |
| border-progress | `--border-progress-fill` | 0 | 0 | 0 |
| progress crescendo | `--progress-crescendo` | 0 | 0 | 0 |
| phase tint | `--phase-tint-amount` | 0 | 0 | 0 |
| scroll-pin lift | `--scroll-pin-lift` | 0 | 0 | 0 |
| scroll-pin stage | `--scroll-pin-stage-height` | 0 | 0 | 0 |

Their features are gone with them: `grep -rln` over `src/ demo/` returns zero files for
`scroll-pin`, `border-progress`, `useBorderSpectrum` and `phase-tint`, and
`utilities/base.css:23` names the crescendo registration as retired in its own prose ("the
retired `--progress-crescendo` / `--ripple-radius` registrations followed the same rule").
Leaving five lies in a living reference while curing the sixth, and then scoping the
falsifier down so it could not see them, is the failure mode the house law names. They were
struck. The seven surviving rows are the seven that measure live.

One note was added under the table, because the cast is the only drive in it the library
reads and never writes: no component emits the `.cartoon-cast` child, so the consumer
authors the child and drives the scalar.

**`docs/design/affordance-map.md:85`** — the Card row. The ledger says "press is gone". On
the bytes that is half right and the row was written to what is actually there: the JS press
is gone (`useLiquidPress` is not imported anywhere under `src/components/card/`,
`.glass-press` → 0 hits, `cards.css` does not exist, `Card.vue` has no `pressable` and no
`cartoon`/`specular` prop), but `card/styles.css:197` still ships
`.card[role="option"]:active { scale: var(--scale-press-sm) }` — a CSS press on the
selectable arm only. The rewritten row names that, the `--fill-hover` hover bracketed in
`@media (hover: hover)`, the `:focus-visible` outline plus glow leg, and the fact that
`@utility cartoon-surface` is decoration with no interaction engine. The row's `dir` cell
was corrected from `ui/card` to `card`.

**`DESIGN.md` §cast** (the paragraph formerly at :478) — rewritten to give the recipe and to
name **both** shipped paths, which is the verifier's correction to the investigator:

1. the press path — author `<span class="cartoon-cast" aria-hidden="true" />` in the
   surface's own box and drive `--cartoon-press-t` from
   `useLiquidPress({ pressVar: "--cartoon-press-t" })` on `./motion` (`pressVar` verified at
   `composables/motion/spring/useLiquidPress.ts:64`, written at `:257`, barrelled at
   `composables/motion/index.ts:26`);
2. the entry path — `.liquid-enter.is-cel > .cartoon-cast` (`glass/liquid-enter.css:163`)
   carries the entry lag on the cel register's own clock, with no press scalar at all.

The old sentence's clause about "Card's `cartoon` decoration" was struck: the `cartoon` prop
is gone from `Card.vue` (its own docblock records the strike).

**Not cured, relayed.** The identical stale rows live in the `mkbabb/precepts` repo, which
this tree carries as the `docs/precepts` submodule (`tunable-anim.md:115`,
`affordance-map.md:85`). Outside the fence and outside the repo; no sibling was written.

### A-14 · the bridge names are not an override point — LANDED

Holds exactly as filed, re-measured here: `bridges.css` is one `@theme inline{}` block,
`:root` count 0; each `--shadow-glass-*` name occurs once, inside it; the real declarations
are `--glass-shadow-*` in `tokens/glass-fx.css`. **Five of six**: bridged are
`floating`/`overlay`/`quiet`/`resting`/`wash`; `--glass-shadow-capsule` has no bridge.

**Correction to the ledger's wording, substance held.** The ledger says bridge names "never
emit a custom property". Measured, the rule is narrower and the narrower rule is what was
written: an `@theme inline` key reaches the built CSS **only when something in that build
reads it with `var()`**. In glass-ui's own built demo bundle
(`dist-demo/assets/index-B0FtjKoc.css`) `--font-text`, `--text-micro`, `--text-caption`,
`--color-accent` and the `--color-gold*` family ARE emitted — precisely the bridge keys our
own CSS reads — while `--shadow-glass-quiet`, `--blur-glass-wash`, `--spacing-icon-md` and
`--text-body` emit zero times. "Never emits" would have been a new false sentence in the one
doc that ships. README now states the conditional rule, and the conclusion the consumer
needs is unchanged and still true: nothing reads the shadow, blur or icon bridges, so
`var(--shadow-glass-quiet)` resolves to nothing, in this build and in the four consumer
bundles the verifier measured.

`README.md` §Design Tokens: the sentence "Consumers override any token locally per project"
was **corrected, not appended to** — it is a positive falsehood for every bridge name. It
now says the `:root` tokens are unlayered and re-declarable, then states the bridge rule with
a worked override block on the `--glass-shadow-*` spelling, then the five-of-six fact.

Two adjacent items fold in here because README is the only prose that ships (fact 2):

- **the easing seam (B-4's live half)** — `<EasingCurve>` writes
  `--easing-curve-accent: var(--motion-accent, var(--viz-legendre))` on its own wrapper
  (verified at `components/easing/EasingCurve.vue:106`), so the component-local name is
  already bound on that subtree and an ancestor's is shadowed. ONE free arm:
  `--motion-accent`. The letter's "both arms free" is not carried.
- **the `useClipboard` contract (B-5's answer)** — placed in §Subpath imports, where a
  consumer looks for a door: there is no `/clipboard`; `useClipboard` and `writeClipboard`
  ship on `/dom` and the root; `useClipboard` returns `{ status, copy, invalidate }`
  (`composables/dom/useClipboard.ts:129`), `status` is a `ComputedRef<ClipboardStatus>`
  (`:26`, union at `:6`), and `copied` was removed at 7.0.0 with
  `status.value === "success"` as the equivalent (MIGRATION.md:670, read only).

**Fact 2's pointer** landed in §Documentation: `files: ["dist"]`, so an install carries
`dist/`, README and LICENCE and nothing else; MIGRATION.md, DESIGN.md and `docs/` are GitHub
only.

`src/styles/theme/bridges.css` gained the one-line pointer comment the fence allows, and
nothing else.

### B-2 · the plate register — LANDED (the reshaped half; the filed half stays DECLINED)

Declined-as-filed is upheld on the bytes and no layout geometry was published: `--pane-max`,
`.pane-container`, `.dock-band` and the `absolute inset-0` atmosphere canvas are the
consumer's own demo shell, and the stacking half was already published
(`--z-behind`/`--z-background`/`--z-content` at `tokens/scheme-motion.css:197-199`, mirrored
in DESIGN.md's Z-Index Stack).

What was ours and undocumented: `@utility glass-plate` (`glass/veil.css:47`), the one
addition in the 7.0.0 → 9.0.0 `@utility` roster diff, with zero hits in DESIGN.md,
MIGRATION.md and README.md. `DESIGN.md` gained **"### Plate register"** immediately after
the five-tier table, stating

- what it paints — `--glass-veil-tier` (unset → `resting`) → the luminance clamp
  `--glass-veil-rest` → `--glass-veil-rung` → `--glass-veil`, landing exactly one
  declaration, `background: var(--glass-veil)`;
- what it deliberately does not supply — position, z-index, radius, size, with `.dock-plate`
  as the worked example (it composes the utility and declares
  `position: absolute; inset: 0; z-index: -1` itself, `dock/styles/dock.css:53-62`);
- the one stacking sentence — a plate sharing a box with an `absolute inset-0` decorative
  layer takes its own positioning **plus** a `--z-content` rung, because a positioned
  `z-auto` sibling paints at CSS 2.1 Appendix E step 8 and static in-flow content at step 7.

The same prose is a header block in `src/styles/glass/veil.css`, which ships as emitted CSS.
The anchor correction in the ledger is confirmed: the DESIGN-mirror precedent sentence
("checked against it by `tests/styles/radius-role-canon.test.ts`") is at DESIGN.md:360, not
:425.

### B-7 (doc half) · the `i mod 13` wrap — LANDED

`DESIGN.md` §"Section-tone recipe" now states the bound before the recipe: the ladder is
exactly thirteen stops with no fallback, so index with `i mod 13` — ~~`--section-color-13`
resolves to nothing and takes the whole `color` declaration down at computed-value time~~
[2026-09-17 · CURE ROUND 1: the mechanism was misapplied to the Tailwind recipe on the next
line. `theme/bridges.css:187-199` defines `--color-section-0..12` only, so `text-section-13`
generates no utility at all; the computed-value invalidation is what a hand-written
`var(--section-color-13)` does. DESIGN.md:940 now says both] —
and cites the ordinal hue law already stated in Timeline Primitive § Paint,
`(2 + 4i) mod 13` with `gcd(4, 13) = 1`. Doc half only; the light-stop retune is Lane C2's.

### HK-vite · the README peer rows — LANDED, and the whole table was checked

`package.json` `peerDependencies` at HEAD is **9 names**: `@lucide/vue`,
`@mkbabb/keyframes.js`, `@mkbabb/value.js`, `@vueuse/core`, `reka-ui`, `tailwindcss`,
`tw-animate-css`, `vue`, `vue-component-type-helpers`. `peerDependenciesMeta` marks exactly
three optional: `@vueuse/core`, `@mkbabb/value.js`, `tw-animate-css`.

The ledger's pre-commit anchor correction is confirmed on disk before anything was struck:
:180 is the **live** `@vueuse/core` row; the dead rows are :182 and :186.

Every one of the ten rows was checked against that datum, and four were wrong:

| row | defect | act |
| --- | --- | --- |
| :182 `embla-carousel-vue` ^8.0 (optional peer) | not in `peerDependencies` | struck |
| :186 `@mkbabb/pencil-boil` ^0.9.2 (optional peer) | not in `peerDependencies` | struck |
| :184 `@mkbabb/keyframes.js` ^6.0.0 (optional peer) | IS a peer, but not in `peerDependenciesMeta` — it is required | "(optional peer)" removed |
| — `vue-component-type-helpers` ^3.0.3 | a required peer with no row at all | row added |

The keyframes.js and `vue-component-type-helpers` rows are the same class the ledger named
("check EVERY row of that peer table against it") reached from the other direction: the
datum is `package.json`, and a table that mis-marks a required peer as optional or omits it
outright misleads a consumer exactly as a phantom row does. If the *intent* is that
keyframes.js be optional, the fix is `peerDependenciesMeta` in `package.json`, which is
outside this fence — recorded, not touched. The table now has nine rows and is a bijection
with `peerDependencies`. Required rows are listed first, optional rows last, and the column
padding was re-aligned to the widest cell.

`vite.library.ts:24-25`, `:36` and the two canon docs are Lane T2's and were not touched.

## Born-RED proof

Three test files, plain vitest, no `G-` id, no seat, no gate register entry.

**Pass 1 — written before any cure byte, run against the tree at HEAD:**

```
$ npx vitest run tests/design
 FAIL  tests/design/drive-tokens.test.ts > … > names only tokens that exist in src/ …
AssertionError: Kind-5 rows naming a token absent from src/: expected [ 'card press → --card-press-t', …(4) ] to deeply equal []
 FAIL  tests/design/drive-tokens.test.ts > … > names --cartoon-press-t, the one press scalar the cast register reads
AssertionError: expected [ '--glass-btn-press-t', …(11) ] to include '--cartoon-press-t'
 FAIL  tests/design/plate-register.test.ts > … > names every glass @utility in DESIGN.md
AssertionError: glass utilities absent from DESIGN.md: expected [ 'glass-plate (veil.css:47)' ] to deeply equal []
 FAIL  tests/design/plate-register.test.ts > … > documents what glass-plate does NOT supply …
AssertionError: expected '' to contain 'glass-plate'
 FAIL  tests/design/token-bridges.test.ts > README §Design Tokens > does not claim every token is overridable …
AssertionError: expected '# glass-ui\n\nGlassmorphic design sys…' not to contain 'Consumers override any token locally …'
 FAIL  tests/design/token-bridges.test.ts > README §Design Tokens > states the bridge rule and names the real override point
AssertionError: expected '\n\n`src/styles/tokens/` defines the …' to contain '@theme inline'

 Test Files  3 failed (3)
      Tests  6 failed | 4 passed (10)
```

The drive-token predicate was then TIGHTENED (a bare substring search let
`--progress-crescendo` pass on the strength of a comment that says its registration was
retired; the committed predicate requires an `@property` registration, a `--token:`
declaration, or a `var(--token` read). Because the tree had already moved, the tightened
predicate was replayed against HEAD's committed bytes with `git show`, using the same
expressions the committed tests use
(`scratchpad/born-red-replay.mjs`, outside the repo, no tree mutation):

```
$ node …/scratchpad/born-red-replay.mjs
[A-5] Kind-5 rows at HEAD: 12
[A-5] "names only tokens that exist in src/" → RED
        ghost: card press → --card-press-t
        ghost: border-progress → --border-progress-fill
        ghost: progress crescendo → --progress-crescendo
        ghost: phase tint → --phase-tint-amount
        ghost: scroll-pin lift → --scroll-pin-lift
        ghost: scroll-pin stage → --scroll-pin-stage-height
[A-5] "names --cartoon-press-t" → RED

[A-14] "does not claim every token is overridable" → RED
[A-14] "states the bridge rule" → RED

[B-2] glass @utility roster: glass-plate
[B-2] "names every glass @utility in DESIGN.md" → RED
        missing: glass-plate (veil.css:57)
[B-2] "documents what glass-plate does NOT supply" → RED
```

The replay takes the DOCS from HEAD (`git show`) and `src/` from the working tree, because
this lane's only `src/` edits are comment blocks that move no token and no `@utility`. That
is why it prints `veil.css:57` where pass 1 printed `veil.css:47` — the same declaration,
ten comment lines lower.

**Pass 2 — after the cure:**

```
$ npx vitest run tests/design
 Test Files  3 passed (3)
      Tests  10 passed (10)
```

### Scoping, measured first, per the house law

**A-5.** The ledger's proposed assertion — every Kind-5 drive token carries an `@property`
registration under `src/styles/tokens/property-regs*.css` — is RED on **eleven of twelve**
rows, not on `--card-press-t` alone. Measured: only `--glass-btn-press-t` is registered
there (`property-regs-specular.css:56`); `--dock-morph-t` is registered elsewhere
(`components/dock/styles/index.css:105`); the other ten carry no registration anywhere, and
the table's own preamble distinguishes "the `@property`-registered 0..1 scalars" from "the
choreography knobs" — `--scroll-cascade-rise` is a length and registering it would be a
fiction. The assertion was scoped to the defect that is actually there, EXISTENCE, and the
registration gap is recorded here instead.

**A-14 arm (a).** The ledger predicted the anti-regression arm would be GREEN today across
all bridge LHS names. It is **not**: 175 of the 194 LHS names in `bridges.css` are declared
nowhere else in `src/`, and 50 `var()` read sites reach them. Broken out by family:

| family | LHS names | `var()` read sites in `src/`+`demo/` |
| --- | --- | --- |
| `--shadow-glass-*` | 5 | **0** |
| `--blur-glass-*` | 5 | **0** |
| `--spacing-icon-*` | 8 | **0** |
| `--text-*` | 18 | 3 (`sortable-list/styles.css:95`, `demo/stories/display/surface.vue:201,:279`) |
| `--color-*` | 81 bridge-only | 1 (`glass/control-surfaces.css:98`, fallback-guarded) |
| `--font-*`, `--tracking-*`, `--leading-*` | — | 46 |

Arm (a) was scoped to the three families measured at zero, which are exactly the families
A-14 is about and exactly the families README's new paragraph asserts. The other 50 sites
are residue, below.

**B-2.** Measured first, as the ledger instructed. The whole-roster form — every `@utility`
in `src/styles` named in DESIGN.md — is RED on **21 of 46** names today
(`cm-serif`, `fourier-f`, `ghost-slot`, `glass-plate`, `rainbow-vivid`, `scale-on-hover`,
`shadow-cartoon-hover`, `shadow-modal`, `shadow-soft`, `sheet-animate`, `table-cell`,
`table-head`, `text-hero`, `text-math`, `text-math-body`, `text-mono-micro`,
`text-mono-prose`, `text-proportional-headline`, `text-proportional-kicker`,
`transition-control`, `transition-disclosure`), so `glass-plate` was **not** the only hole
and the whole-roster assertion was not landed. It landed on the measured set: every
`@utility` declared under `src/styles/glass/`, the register DESIGN.md's "## Glass Surfaces"
section governs. That set is `glass-plate` alone today and it was the one hole in it; the
scope is self-maintaining, since a new glass utility joins the assertion by existing. The
other 20 are recorded below. (Roster note: a naive `@utility` grep returns 49 — `classes`,
`recipes` and `button` are prose inside comments. The measurement and the test both anchor
the pattern to line start.)

## Verify — real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
EXIT(tsconfig.json)=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
EXIT(tsconfig.test.json)=0

$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
EXIT=0

$ npx vitest run tests/design
 Test Files  3 passed (3)
      Tests  10 passed (10)

$ npx vitest run            # the full battery
 Test Files  1 failed | 231 passed (232)
      Tests  1 failed | 2210 passed | 10 expected fail (2221)
```

`seats:60`, `violations:0`, `drift:0` — nothing minted.

### The one RED, attributed

```
 FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the dist-demo it measures is NEWER than every source it is built from
AssertionError: dist-demo/index.html is STALE (built 2026-09-17T23:37:07.427Z, newest source 2026-09-18T00:00:06.170Z) — run `npm run demo:dist:build`
```

A build-freshness gate against the shared, gitignored `dist-demo/`, and it is **both
concurrent lanes'**, not a content failure:

- it was GREEN at HEAD — excluding the three files the two lanes have modified, the newest
  source in `src/`+`demo/` is `src/composables/dark/darkModeSyncScript.ts` at 19:36:58,
  which precedes the `dist-demo/index.html` build at 19:37:07;
- the three modified sources are, newest first, this lane's `src/styles/theme/bridges.css`
  (20:00:06) and `src/styles/glass/veil.css` (19:58:39), and Lane T2's
  `src/styles/tokens/scale-paper.css` (19:57:02). Any one of them reds it;
- this lane's two `src/` diffs are **entirely inside `/* … */` comment blocks** (+10/−0 and
  +4/−1; the full diffs are in the git history of this pass). No selector, declaration or
  at-rule moved, so the eager graph the gate measures cannot have changed.

Not rebuilt on purpose: `dist-demo/` is a shared output, the batch's lane law says no lane in
this batch should need a build, and a rebuild here would race Lane T2's in-flight `src/`
edits and go stale again on their next touch. It clears on the close's demo build.
(`npm test` is bare `vitest run` — it does not build the demo first, despite the gate
message's hint. Worth a line in the close.)

### Prettier

```
$ npx prettier --check tests/design/*.ts
Checking formatting...
All matched files use Prettier code style!
EXIT=0
```

[2026-09-17 · CURE ROUND 1 — this paragraph was wrong on its measurements; rewritten to
what `prettier` actually reports from the repo root.] `npx prettier --check` run from the
repo root fails **4 of the 6** committed files this lane edited — `DESIGN.md`,
`docs/design/tunable-anim.md`, `docs/design/affordance-map.md`,
`src/styles/theme/bridges.css` — and **passes** `README.md` and `src/styles/glass/veil.css`.
At HEAD, checked with `git show HEAD:<f> | npx prettier --check --stdin-filepath <f>`,
`src/styles/glass/veil.css` PASSES and `README.md` FAILS: the lane's realignment of the peer
table is what cleaned README. The other four fail at HEAD as they do in the working tree.
The config in force is `~/.prettierrc.json` (`{ printWidth: 88, useTabs: false, tabWidth: 4 }`),
resolved upward from the repo path — the repo itself ships none, and
`npx prettier --find-config-path DESIGN.md` prints it. The earlier scratch-tree comparison
ran outside that tree, on prettier's defaults, which is why it redded everything it touched.
The decision stands: nothing pre-existing was reformatted, because reformatting DESIGN.md or
README.md would rewrite thousands of lines this lane did not touch; every remaining hunk is
house-style reflow off the lane's own added lines. The three files this lane authored were
formatted and pass.

## Fence statement

Created or modified, all inside the fence:
`docs/design/tunable-anim.md` · `docs/design/affordance-map.md` · `DESIGN.md` · `README.md` ·
`src/styles/glass/veil.css` (header comment block only) · `src/styles/theme/bridges.css`
(pointer comment only) · `tests/design/{drive-tokens,token-bridges,plate-register}.test.ts` ·
`docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md`.

Not touched: `MIGRATION.md` (Lane R's) · `vite.library.ts`, `docs/canon/*`,
`docs/audits/*`, `docs/instructions/README.md`, `docs/archive/README.md`,
`src/styles/tokens/scale-paper.css`, `tests/docs/*` (Lane T2's) · `dist/`, `dist-demo/` ·
`package.json` · every sibling repo (none was read for write, none was written) · the
`docs/precepts` submodule. No `git add`, `commit`, `stash`, `checkout` or `reset` was run;
the only git commands used were `status`, `diff`, `rev-parse`, `show` and `log`. The
`build.lock` was never taken because no build was run. Scratch artefacts live outside the
repo, in the session scratchpad.

## FOR LANE R

Nothing this lane did requires a MIGRATION.md row, and MIGRATION.md was not opened for
writing. Two items R may want, both non-blocking:

1. **README now carries the fact-2 pointer** ("None of that ships… read MIGRATION.md,
   DESIGN.md and `docs/` on GitHub"), so R's manifest does not need to repeat it.
2. **`MIGRATION.md:864`** still instructs "Install `@mkbabb/pencil-boil@^0.9.2` when using
   HandMark". The README rows that said the same were struck this pass against the 9-name
   `peerDependencies`; the MIGRATION line is the ledger's HK-vite bracket and is R's.

## Residue

1. **20 undocumented `@utility` names.** DESIGN.md names none of `cm-serif`, `fourier-f`,
   `ghost-slot`, `rainbow-vivid`, `scale-on-hover`, `shadow-cartoon-hover`, `shadow-modal`,
   `shadow-soft`, `sheet-animate`, `table-cell`, `table-head`, `text-hero`, `text-math`,
   `text-math-body`, `text-mono-micro`, `text-mono-prose`, `text-proportional-headline`,
   `text-proportional-kicker`, `transition-control`, `transition-disclosure`.
   `text-mono-micro` matters most: B-3 names it as the `text-admin-label` drop-in, and a
   consumer sent to it finds it documented nowhere.
2. **50 `var()` reads of non-emitting bridge names.** `--font-text` ×~14, `--font-display`,
   `--font-mono`, `--tracking-tight`, `--leading-small`, `--text-body`, `--text-caption`,
   `--text-micro`, `--color-accent`. These resolve **only** because the same build's scan
   sees the read and keeps the key — confirmed in `dist-demo/assets/index-B0FtjKoc.css`,
   which emits `--font-text: var(--font-stack-text)` and not `--shadow-glass-quiet`. Whether
   that survives per-chunk CSS splitting was NOT established: `--text-body` is read in
   `sortable-list/styles.css:95` and is emitted in no demo chunk. Worth a measured pass; it
   is a live-paint question, not a doc one, and it is outside this fence.
3. **`affordance-map.md`'s `dir` column is stale table-wide.** Every row but the one this
   lane rewrote still says `ui/*` or `custom/*`; neither directory exists after the BI
   flatten (`src/components/` is 58 flat entries). One codemod, one wave.
4. **The peer table has no falsifier.** The four wrong rows cured above would have been
   caught by a five-line assertion that the README peer table is a bijection with
   `package.json` `peerDependencies` and that its "(optional peer)" marks agree with
   `peerDependenciesMeta`. Not minted here: the ledger declined a gate for HK-vite and the
   fence caps this lane at three test files. Recommended for the close.
5. **`peerDependenciesMeta` vs the keyframes.js row.** README now says keyframes.js is
   required, because `package.json` says so. If optionality was the intent, `package.json`
   is the file to change and it is outside this fence.
6. **The `docs/precepts` submodule** carries A-5's stale rows at `tunable-anim.md:115` and
   `affordance-map.md:85`. Separate repo, pointed at by this tree. Relay, not a cure.
7. **`npm test` does not build the demo** although `boot-graph`'s own failure hint says it
   does. Either wire a `pretest` or correct the hint.

---

## CURE ROUND 1 — 2026-09-17

**Seat** cure · **model** `claude-opus-5`, read from this seat's own transcript at
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a3cf7fcb-9c4/agent-a188e9ec998733767.jsonl`
(found by grepping the workflow transcript tree for a phrase unique to this seat's prompt,
`boundary-anchored match`; the sibling file in the same workflow directory is the
adjudicating seat and reads `claude-fable-5-1`; `CLAUDE_MODEL_ID` unset, parent session file
not used). The assertion gated every command in the chain with `&&`, the step-0 baseline
included.

### Step-0 baseline (cure round)

`HEAD` `c645c393`. `git status --porcelain` — 23 ` M` paths and 7 `??` paths, unchanged from
the implement seat's banked baseline; `git diff --stat` — 23 files, 753 insertions,
113 deletions. No `git add`, `commit`, `stash`, `checkout` or `reset` was run in this round
either.

### Act ledger

| # | file · anchor | what changed |
| --- | --- | --- |
| 1 | `docs/design/affordance-map.md:85` | the Card gleam cell said `specular` is gone from the whole library. It is not: `src/index.ts:475,478,479` export `createSpecularWriter` / `useSpecularTracking` / `vSpecular`, `src/styles/index.css:205` `@import`s `glass-specular-track.css`, and rows :77/:79/:80/:81/:86 of the same table mark `v-specular` live. The cell now reads "the Card primitive dropped its `specular` prop; `v-specular` still ships for a surface that arms it" |
| 2 | `docs/design/tunable-anim.md:147` | cited `DESIGN.md §"The cast is a MOVING cast on explicit controls"` — a heading this same lane replaced. `grep -n "MOVING cast" DESIGN.md` → `478:` only, and `"on explicit controls"` → zero hits repo-wide. Retargeted to §"The cast is a MOVING cast, and the consumer drives it" |
| 3 | `README.md:165` | "nothing reads the shadow, blur or icon bridges, so they emit zero times (measured … in four independently compiled consumer bundles)" is false for the icon family: `speedtest/dist/assets/index-Btq1YCFA.css` emits `--spacing-icon-xs`/`-lg`/`-hero`. Narrowed to "nothing in this library's own build reads the shadow, blur or icon bridges, so none of them emits here; the shadow family also measures zero in four independently compiled consumer bundles" |
| 4 | `tests/design/token-bridges.test.ts:12-14` | the same overstatement in the header comment, narrowed the same way, with the icon-family exception named |
| 5 | `README.md:165` | the five bridge families read as exhaustive. `bridges.css` carries **194 LHS names in 14 families** (`--color` 93, `--text` 18, `--spacing` 17, `--z` 16, `--transition` 8, `--leading` 7, `--tracking` 7, `--ease` 7, `--shadow` 6, `--font` 5, `--blur` 5, `--height` 3, `--min` 1, `--width` 1). Added "and nine more families (`--z-*`, `--font-*`, `--leading-*`, `--tracking-*`, `--transition-*`, `--ease-*` among them)" so the bold rule visibly covers all 194 |
| 6 | `DESIGN.md:940` | the IACVT mechanism was pinned to a recipe that is Tailwind utilities. `theme/bridges.css:187-199` defines `--color-section-0..12` only, so `text-section-13` generates no utility at all; the computed-value invalidation is what a hand-written `var(--section-color-13)` does. Both are now stated |
| 7 | `RECORD.md:100` | "The six surviving rows" → "The seven surviving rows". The Kind-5 table at `tunable-anim.md:132-138` has seven rows (12 − 5 struck) |
| 8 | `RECORD.md:199` | `dock/styles/dock.css:53-55` → `:53-62`. `position` is :54, `inset` :55, and `z-index: -1` sits at :62 behind a nine-line comment |
| 9 | `RECORD.md` §Prettier | rewritten to the measured facts (below) |
| 10 | `RECORD.md:212` | the B-7 paragraph restated the mechanism act 6 corrected; struck in place with a dated bracket |
| 11 | `tests/design/plate-register.test.ts:50` | hardening, taken: `design.includes(name)` → a `RegExp` that requires the name wrapped in backticks (the code-span spelling DESIGN.md uses), so a longer token spelling that merely contains a utility name cannot satisfy the assertion. `--glass-plate-floating` is live at `dock/styles/layer-group.css:353`; DESIGN.md carries zero `glass-plate-` substrings, so no verdict moved |

Nothing else was touched. Every anchor was re-read on disk before the edit.

### On act 6's punctuation

The adjudicated string began "there is no thirteenth stop:" and lands after a colon already
in the sentence. The inner colon became an unspaced em dash — every word kept, the
double-colon avoided, and the file's prevailing style matched.

### Prettier — measured, not assumed

```
$ npx prettier --find-config-path DESIGN.md
../../.prettierrc.json          → /Users/mkbabb/.prettierrc.json
                                  { "printWidth": 88, "useTabs": false, "tabWidth": 4 }

working tree                              HEAD (git show HEAD:<f> | --stdin-filepath <f>)
DESIGN.md                        FAIL     FAIL
README.md                        PASS     FAIL
docs/design/tunable-anim.md      FAIL     FAIL
docs/design/affordance-map.md    FAIL     FAIL
src/styles/glass/veil.css        PASS     PASS
src/styles/theme/bridges.css     FAIL     FAIL
```

Four of the six committed files fail, two pass. README passes in the working tree and fails
at HEAD — the lane's realignment of the peer table is what cleaned it. The repo ships no
prettier config; `~/.prettierrc.json` resolves upward from the repo path, and the implement
seat's scratch-tree comparison ran outside that tree on prettier's defaults, which is why it
redded everything it touched. The decision stands: nothing pre-existing was reformatted.
Every hunk prettier still wants in the four RED files, and all four in this RECORD, is
markdown-table realignment or `*x*` → `_x_`, off lines the lane added — none of them is in
the cure round's own prose.

Cure-round files:

```
docs/design/affordance-map.md                                  FAIL   (pre-existing, table)
docs/design/tunable-anim.md                                    FAIL   (pre-existing, table)
README.md                                                      PASS
DESIGN.md                                                      FAIL   (pre-existing, table)
tests/design/token-bridges.test.ts                             PASS
tests/design/plate-register.test.ts                            PASS
docs/tranches/…/T1/RECORD.md                                   FAIL   (pre-existing, 4 hunks)
```

### Verify — cure round, real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
tsconfig.json EXIT=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
tsconfig.test.json EXIT=0

$ npx vitest run tests/design
 Test Files  3 passed (3)
      Tests  10 passed (10)
EXIT=0

$ npx vitest run
 Test Files  2 failed | 231 passed (233)
      Tests  2 failed | 2216 passed | 10 expected fail (2228)
EXIT=1

$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
EXIT=0
```

Both REDs attributed, neither inside this fence:

1. `tests/public-surface.spec.ts > G-NO-ORPHAN-EXPORT` — `Error: Test timed out in 5000ms`
   at :899. Re-run on its own it is **GREEN** (`95 passed`); it is a starvation artefact of
   the full battery running beside the concurrent lane. The file is another lane's ` M`.
2. `tests/demo/router-field-ownership.test.ts` — `router.push` timeouts. Alone the file is
   `1 failed | 2 passed`, in the pair run `2 failed`; the failing test rotates, which is the
   signature of a slow first import, not a broken assertion. The file is committed and
   unmodified in `git status`; this lane touched no `demo/` file and no router. The one
   concurrent `demo/` diff in the tree (`aurora-hero.ts`) is a table of oklch literals and
   cannot hang a route resolution.

### Fence statement (cure round)

Modified: `docs/design/affordance-map.md` · `docs/design/tunable-anim.md` · `README.md` ·
`DESIGN.md` · `tests/design/token-bridges.test.ts` · `tests/design/plate-register.test.ts` ·
`docs/tranches/BK/execution/2026-09-17-o20-cure/T1/RECORD.md`. All inside the fence.
`MIGRATION.md` was not opened. No sibling repo was read for write or written. No build was
run and the `build.lock` was never taken. Created: nothing.

### Residue (cure round)

1. **`Card.vue:19-20` carries the same falsehood the cure struck** — the component's own
   comment says `specular` is gone from the whole library. That is where
   `affordance-map.md:85` copied it from. `src/components/card/Card.vue` is outside this
   fence; one line, worth the close.
2. **`docs/tranches/BK/execution/2026-08-09-row66-close/CURE-ORDER-66.md:37`** quotes the
   same sentence as a finding of its own. A tranche record, correct as history; left.
3. **The seven residue items of the implement round stand unchanged**, including the
   `docs/precepts` submodule copy of `affordance-map.md:85`, which still carries the struck
   sentence.
