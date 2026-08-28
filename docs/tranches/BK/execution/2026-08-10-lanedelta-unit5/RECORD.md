# LANE δ — COMMIT-UNIT 5 (δ π-CURE · D1 · D2 · D3) · 2026-08-28

**Seat:** `claude-opus-5[1m]`, asserted first and `&&`-gating the chain
(`echo MODEL_ID_ASSERT=claude-opus-5[1m] && test … && echo GATE_OPEN` → `GATE_OPEN`).
`CLAUDE_MODEL_ID` is unset in this environment; the assertion is the model id this seat
reports for itself, gated as ordered.

**Order of record:** the driver's unit-5 brief — the three δ-owned π defect routes D1/D2/D3
from
`docs/tranches/BK/execution/2026-08-25-pi-band/delta-config-fourier-scroll-story/PI-BATTERY-delta-config-fourier-scroll-story.md`
(~~1035~~ [2026-08-28 · driver C5: 1179 lines on disk — the browser seat's §8 δ3-π-5 append landed at the seam] lines, read in full before any byte), with the four riders D1a–D1d each dispositioned
rather than dropped.

**Every coordinate in that battery was re-verified on disk before it was cut.** Where the
tree contradicted the order, the record says so and refuses with grounds: **D1b** (§3.2)
and **D1c** (§3.3).

---

## §0 · CENSUS — banked before any byte

```
$ git rev-parse HEAD
ebb58a0f981b88c0cbdfa1ee79e2f907d776a86b
$ git status --porcelain | wc -l
102        (~~89 untracked · 13 tracked-modified~~ [2026-08-28 · driver C3: 88 untracked · 14 tracked-modified — the banked baseline diffs 14 '^diff --git' rows and the RECORD's own enumeration lists 14])
$ git diff -U0 > /tmp/bk-lanedelta-baseline-1787939605.diff
906 lines
```

The 89 untracked were the π band's banked artifacts (`pi-d3p5-*` × 44 from the browser
seat, `gamma-aurora-blob/pi-FIELD-*`, the δ battery itself), plus `lanealpha-unit8/`,
`lanegamma-unit6/`, and `tests/components/custom/handmark/measure-frame.ts`. The 13
tracked-modified were α's (dock styles · `demo/stories/data/search.vue` ·
`search-contracts.test.ts`), γ's (`HandMark.vue` · `stroke.ts` · the two handmark tests ·
`overlay-plate.css` · `a11y-overrides.css`), and two lane RECORDs. **None of it is this
seat's, and this seat wrote none of it.** Lane β's unit-β0 dirt (`MIGRATION.md`,
`darkModeSyncScript.ts`) was already off the tree at this seat's open.

**THE BASE MOVED UNDER THIS SEAT, and it does not touch this unit.** At 14:05 and 14:07 the
driver landed `739bf63d` (γ's handmark cures) and `eb2e9428` (the π recovery seats); HEAD is
now `eb2e9428`. Every one of this unit's six surfaces is **byte-identical at `ebb58a0f` and
`eb2e9428`** — verified by sha, not assumed:

```
SAME  60042828f941  src/components/fourier-field/shaders/render.wgsl.ts
SAME  6a52c7a0f5ce  src/components/fourier-field/useFourierField.ts
SAME  dff3b7f47350  demo/chassis/hero/story-hero.css
SAME  a2540762e3a4  demo/stories/navigation/toc-tracking.vue
SAME  ac1b37877614  tests/demo/page-chrome-shrink.test.ts
SAME  f4d448672d3a  tests/components/fourier-field/FourierField.smoke.test.ts
```

So the born-RED mirror at `ebb58a0f` (§4) measures the exact bytes this unit cuts from, and
did not need rebuilding at the new base. The one file the driver's commits moved inside this
unit's fence directory is `demo/chassis/hero/aurora-hero.ts` — γ's aurora work, not touched
here.

---

## §1 · D1 — THE FOURIER STAGE PAINTED NOTHING, AND THE REASON WAS ONE MISSING LINE

**PAINT-CRITICAL. Six of the eight δ2 cells, one root cause.**

### 1.1 · The defect, re-derived on disk rather than taken from the message

The banked validation error, verbatim from `pi-d2p1-FOURIER-boot-1440-light.json`:

```
Error while parsing WGSL: :100:32 error: unresolved value 'PI'
  if (H < 0.0) { H = H + 2.0 * PI; }
```

Four coordinates, each opened:

| coordinate | what is there |
|---|---|
| `color.wgsl.ts:52-53` | the chunk's own contract: *"PI must be in scope (the consumer defines it first, as the GLSL chunk requires)"* |
| `color.wgsl.ts:105` | `if (H < 0.0) { H = H + 2.0 * PI; }` — the statement that spends it |
| `render.wgsl.ts:24-27` | imports `OETF_WGSL` + `OKLCH_MATRICES_WGSL`; `grep -c "const PI" → 0` |
| `aurora.wgsl.ts:49` · `metaball.wgsl.ts:53` | both `const PI: f32 = 3.141592653589793;` — the two consumers that honour it |

A whole-tree census of the idiom, taken rather than sampled:

```
aurora-image.wgsl.ts   defines=1 uses=2      metaball.wgsl.ts        defines=1 uses=3
aurora-mediums.wgsl.ts defines=0 uses=1      color.wgsl.ts           defines=0 uses=4
aurora.wgsl.ts         defines=1 uses=1      compute.wgsl.ts         defines=0 uses=0
metaball-noise.wgsl.ts defines=0 uses=0      render.wgsl.ts          defines=0 uses=0
metaball-palette.wgsl  defines=0 uses=2      flow.wgsl.ts            defines=0 uses=0
```

Every `defines=0 uses>0` row is a CHUNK, spliced into a module that defines it — except
that `render.wgsl.ts` spliced a `uses=4` chunk and defined nothing.

### 1.2 · The cure — the house idiom, not a local patch

`src/components/fourier-field/shaders/render.wgsl.ts`, with the other module constants,
before the splice, exactly where `aurora.wgsl.ts:49` and `metaball.wgsl.ts:53` put theirs:

```wgsl
const PI: f32 = 3.141592653589793;
```

The comment above it names the contract, the line it is spent on, the two consumers that
already honour it, and the arm that now gates the class. **No backtick may appear inside a
`/* wgsl */` template literal** — the first draft carried one and the transform failed with
`[PARSE_ERROR] Expected a semicolon`; that is banked here so the next author does not
rediscover it.

### 1.3 · The class arm — `tests/components/fourier-field/wgsl-splice-contract.test.ts`

The order asks for an arm that **validates the assembled WGSL module text**, so that the
whole class dies and not this instance. Twelve cases, three sections:

- **§1 · the census.** Scans `src/**/*.ts` for `createShaderModule({ label, code })` sites,
  extracts the `code:` identifier, and reconciles the set against the file's own registry
  **in both directions** — a sixth module spliced tomorrow REDs until it is registered, and
  a stale registry row REDs too. Five sites found; five registered.
- **§2 · resolution.** For each assembled module: strip comments, collect every name a
  MODULE-scope declaration introduces (`const` · `override` · `let` · `var<…>` · `alias` —
  a struct member is **not** one of them), collect every UPPER_SNAKE token that is neither a
  member access nor a member declaration, and assert the difference is empty. Anti-vacuity
  guard on every case: a module that references nothing fails before the emptiness check.
  [2026-08-28 · C1 cure: this bullet previously listed "struct members" among the
  declarations. That was false about WGSL and false about the file — see §5.1.]
- **§3 · the requirements are real.** `OKLCH_MATRICES_WGSL` and `PALETTE_RAMP_WGSL` are shown
  to *require* PI **from their own text** rather than from their comments; every module that
  splices a PI-requiring chunk is shown to declare PI; and the fourier render module is
  named as one of them.

**Why UPPER_SNAKE is the universe** is argued in the file rather than assumed: every
module-scope value in this tree's WGSL is UPPER_SNAKE, WGSL has no UPPER_SNAKE builtin, and
its keywords, attributes, address spaces and swizzles are lowercase.

**THE FIRST RUN CONVICTED THE DETECTOR, not the tree.** It reported `T` unresolved in
`FOURIER_FIELD_RENDER_WGSL` — a false RED, because `struct HeadFrame { T: vec2<f32>, … }`
puts an upper name in a struct's scope and `fr.T` is a member access, not a module
reference. Both exclusions were added **as facts about WGSL**, and both are stated in the
file's header as found-not-anticipated. A detector that cries wolf gets muted rather than
obeyed; that is unit-3's lesson applied before the file landed rather than after.
[2026-08-28 · C1 cure: "both exclusions" is true only as of the C1 pass. The first cut made
the member-DECLARATION half an INCLUSION on the declares side, which is the same false-GREEN
in the other direction. §5.1.]

### 1.4 · Rider D1a — the frozen clock is a consequence, and what this seat can and cannot say

The chain, re-opened on disk: `wgpu.ts:70-72` — *"The per-frame hook — the clock advances
here, inside the substrate's own frame"* — `:261` `onFrame?.(timeSec);` inside `frame()`;
`useFourierField.ts:106` defines `onFrame` and `:177` wires it. `frame()` is the callback
`setupWGPU` returns, and the substrate only arms it after `createShaderModule` and the
pipelines succeed. A module that fails validation never reaches `:261`, so the clock cannot
tick — which is exactly what `pi-d2p4-FOURIER-clock-untouched-1440-dark.json` measured
(`loop "0.00104375"` at both t=0 and t=3 s).

**What is verified here:** the stated cause is removed, and it was the *only* one of its
class — the born-RED run reports `expected [ 'PI' ] to deeply equal []`, a one-element set,
so no second unresolved global waits behind it. **What is NOT claimed:** that the pipeline
now builds and the clock now advances. That is a browser fact and it is **ENQUEUED**
(`PI-QUEUE.md` → π-RERUN-D1, where the t=0-vs-t=3 s arm is called out as *the one arm that
proves the cure reached the loop and not merely the compiler*). The splice-contract arm
covers module-scope constant resolution and nothing else; a binding mismatch or a type error
would be a different class and is named as such in the queue's KILL clause.

---

## §2 · D2 — THE COLLAPSED CHROME PLATE DID NOT WASH IN DARK

### 2.1 · The root cause is ONE NAME DOING TWO JOBS

`--story-paper-wash` served both `.story-bg-paper` (the full-viewport paper FIELD — it tints
the page) and `.story-page-chrome::before` (the PLATE — it occludes what slides under the
collapsed header). In light the two jobs coincide because `--card` and the page are the same
near-white family. In dark they invert: `--card` is the LIFTED L16 surface and the page is
the deepened L4 floor (`tokens/dark-arm.css:52-54`, `:85-87`), and the token's dark arm is
`--foreground` — the near-white **INK** — at **7%**. Seven per cent of the ink is a film
that *lifts* what passes under it. It cannot cover anything.

### 2.2 · The in-place edit is REFUSED, with the number that refuses it

Changing `.dark { --story-paper-wash }` to an occluding value would repaint
`.story-bg-paper` — a `position: fixed; inset: 0` field on every `paper` hero route
(`StoryHero.vue:136-139`) — at the card colour: the dark page would go from **rgb(11,10,9)**
to **rgb(45,36,29)**, collapsing the page/card distinction that `dark-arm.css:52` declares
in as many words (*"The `--neutral-0` page (hsl 24 9% 4%) is the luminance floor"*, and
`:85-87`, the card *"LIFTS L10→L16 … a clearly distinct surface"*). One token cannot be both
the floor and the lift.

**So the plate takes its own name.** `--story-chrome-plate-wash`, declared at `:root` as
`var(--story-paper-wash)` — in light the plate IS the paper wash, byte for byte — and
re-declared under `.dark`. The paper field keeps its ink film untouched.

### 2.3 · The dark alpha is DERIVED, not picked

The detector is the **ghost-to-ground ratio**: the plate over the passing ink, against the
plate over the field behind it. Light, from the banked capture
(`pi-d4p3-SCROLL-legibility-1440-light.json`: ink `[28,25,23]`, ground `[252,241,230]`, wash
`color(srgb 0.994 0.96 0.926 / 0.7)`) — the field behind the plate back-solves to
`rgb(249,232,216)`, the ghost lands at `rgb(186,179,172)`, and the ratio is **1.864:1**.

Dark, against the field back-solved the same way from the banked dark ground `[43,34,27]`,
with a `--card`-derived wash at α:

| α | ground | ghost | ghost:ground | h1:ground |
|---|---|---|---|---|
| 0.70 | `[46,35,27]` | `[107,98,91]` | 2.578:1 | 12.29:1 |
| 0.75 | `[47,36,28]` | `[98,89,82]` | 2.203:1 | 12.11:1 |
| **0.80** | `[48,38,29]` | `[89,80,72]` | **1.877:1** | **11.93:1** |
| 0.85 | `[49,39,31]` | `[80,70,63]` | 1.597:1 | 11.75:1 |
| 1.00 | `[53,42,34]` | `[53,42,34]` | 1.000:1 | 11.21:1 |

**80%** lands the dark read at **1.877:1** against light's **1.864:1** — the same behaviour,
to within 0.013 — and the h1 still measures **11.93:1**, far above AA. (The predecessor's
7% arm reads **12.527:1** ghost-to-ground: the "ghost" is the ink itself, undimmed. That is
the defect as a number.)

```css
.dark {
    --story-paper-wash: color-mix(in srgb, var(--foreground) 7%, transparent);
    --story-chrome-plate-wash: color-mix(in srgb, var(--card) 80%, transparent);
}
```

The rule's own prose at `:192-193` claimed the wash *"already carries its dark
recalibration"*. It carried one for the PAPER job. That sentence is **struck in place with
a dated bracket** and replaced beside it, per the house discipline for committed text.

### 2.4 · The instrument, named as part of the cure

The battery observes that the dark AA decile arm returned **one** ink/ground pair for **two
differently-coloured subjects** because it locked onto the contaminating glyph — *"the
instrument's failure and the defect are the same phenomenon."* The queue therefore orders
the decile arm **re-run unrepaired**, with BOTH readings stated: if it now returns two
distinct pairs the instrument is un-contaminated and the dark AA figures stop being
computed-colour × measured-ground; if it still returns one pair, that is said plainly and
the token-corroboration file stays load-bearing. **This seat does not claim the
un-contamination; it orders the reading.**

---

## §3 · THE RIDERS — four ordered, four dispositioned, two refused with grounds

### 3.1 · D1d — the pill states the truth · **CURED**

Under `navigator.gpu === undefined` the shared substrate arms its WebGL2 net; the net's
setup is `createFourierUnsupportedSetup()`, which **throws** (`wgpu.ts:387-393`); the failure
propagates through `useGpuSubstrate.ts`'s `onContextError` → `rendererFailure("webgl2", …)`;
and the pill printed **`WebGL 2·[FourierField] WebGPU is required …`** — declaring the
refusal and contradicting it in the same breath.

`setupGL` is a **declaration, not an arm**. The field ships one renderer, so its status names
one engine. `useFourierField.ts` re-points any status arriving under another engine:

```ts
const ownEngine = (status: RendererStatus): RendererStatus =>
    status.engine === "webgpu"
        ? status
        : { ...status, engine: "webgpu", adapter: "WebGPU unavailable" };
```

**The re-point lives at the field's own seam and NOT in the shared substrate**, which is
right to report the engine it armed for every other consumer — the battery's own note that
"the cure may not live wholly in #53" is answered by putting it wholly in #53's consumer
edge instead of editing a surface three other components depend on (and one outside this
unit's fence). One arm added to the fourier battery's ONE LAW group.

### 3.2 · D1b — the slider is ALREADY the real N domain; the ORDER is what was unsourced · **RE-SCOPED**

The order names N ∈ {1, 8, 16, 61}; the banked artifact reads `termMin "1"` / `termMax "15"`.
Three links on disk say the domain is not the defect:

1. `demo/stories/substrates/fourier-field.vue:424` — the Terms slider binds
   `:max="maxHarmonics"`.
2. `:212` — `maxHarmonics = minted.value.terms.length`, the ACTIVE source's own count; and
   `:238-240` clamps `harmonics` down when a source swap shrinks the budget.
3. `renderer/mint.ts:8-10` rules it: *"There is NO ceiling. `N` truncates a fixed,
   amplitude-ordered, paint-floored array, so the slider's maximum IS `spectrum.length`."*

The picker even prints each source's honest count per row (`:215-235`), which is where the
banked `"Elliptic — generated · 15 terms"` came from. `makeEllipticSpectrum` offers
`2 + round(richness · 22)` terms before the paint floor, so 15 is the **default richness**'s
budget and not a ceiling; the curated traces are DFTs of 160/256-point outlines.

**Nothing is cured, because nothing is broken.** The π cell is re-scoped in `PI-QUEUE.md` to
walk N over the active source's stated domain, with the picker's own label transcribed
beside the walk so the domain and the walk are the same number. A slider whose max was
raised to satisfy an order would be the dishonesty the "keep it honest" clause forbids.

### 3.3 · D1c — the per-frame `headT` seam is **REFUSED**, and the cell re-scoped

Grounds, four, all on disk:

1. `useFourierField.ts:93-96, :121-125` — `HEAD_PUBLISH_MS = 100`. `headTLive` is a **10 Hz
   sample** by design (`:68-73`: *"a sample of the frame loop, never a second one"*). A
   `data-` attribute fed from it could not carry a per-frame delta either.
2. Feeding one per-frame would put an attribute write on **every frame** of a substrate whose
   paint law is compositor-only (δ4-π-6 measured `Layout: {count: 0, totalUs: 0}`), and would
   be a **second** surface for the clock in the module whose opening law is *"THE ONE CLOCK …
   no second place a frame can come from."*
3. The number is **already published twice** — `aria-valuenow` at 3 dp
   (`FourierField.vue:173, :238`) and the studio readout at 2 dp (`fourier-field.vue:381`).
   A third copy is not a new fact.
4. **The three ordered detectors are already gated deterministically, at full step
   resolution, with no browser** — `FourierField.smoke.test.ts:222` *"never runs the head
   backward, over an adversarial trace"* · `:248` *"holds one flick's total advance to half a
   figure"* · `:268` *"takes ONE impulse per gesture, not one per frame."* [2026-08-28 ·
   driver C4: pre-image anchors — the unit's own +17 moved them; the committed tree holds
   them at `:239`/`:265`/`:285`]

The aurora settle-beacon is the idiom the order cites, and it is a **one-shot state flag**
(`Aurora.vue:206` `data-aurora-settled`), not a per-frame value — it argues for a discrete
witness, which `aria-valuenow` already is. The re-scoped cell asks the browser only what the
10 Hz sample can honestly answer; the per-frame claim stays where it is provable.

### 3.4 · D1a — see §1.4. Verified as far as source can carry it; the un-freeze is ENQUEUED, not claimed.

---

## §4 · D3 — THE ToC's UNTRACKED LABELS, AND THE RUNG THE LADDER ALREADY HAD

The battery: `1.2 Subsection` / `1.3 Subsection` measure ink `rgb(112, 89, 66)` on ground
`[226,197,185]` → **4.04:1** at 14 px, below the 4.5:1 AA floor. Dark clear at 9.34 / 9.28.
Owner unplaced by the battery; **DRIVER-RULED into this unit** with the #58 chassis family.

**The ink is identified byte-exactly, not guessed.** The nav is `.glass-resting`, and
`glass/ladder.css:207` re-points `--muted-foreground` → `--on-glass-muted` on that plate.
Light `--on-glass-muted` is `hsl(30 26% 35%)` (`tokens/on-glass-fg.css:35`), which computes
to **rgb(112, 89, 66)** — the measured ink exactly — and reads **4.04:1** against both banked
grounds — the measured figure exactly. The token's own comment calibrates it at *"5.76:1 vs
plate"* against a composited **cream** plate; this pane composites over the **aurora**, which
is darker, and the calibration does not survive the move. That is the whole defect, and it is
a placement defect, not a token defect.

**THE LADDER HAS THE RUNG.** `--muted-foreground-strong` (`tokens/color-radius.css:87-90`,
*"One rung less-faint than --muted-foreground"*) re-points on the same glass rule
(`ladder.css:208`) to `--on-glass-muted-strong` = `hsl(28 28% 28%)` = **rgb(91, 70, 51)** →
**5.45:1**. **Nothing is minted.** The utility is live — `bridges.css:114`
`--color-muted-foreground-strong` — and the emitted demo CSS carries
`.text-muted-foreground-strong{color:var(--muted-foreground-strong)}`, verified in
`dist-demo/assets/index-*.css` rather than assumed from the bridge.

```diff
-  : 'text-muted-foreground hover:bg-muted/40',
+  : 'text-muted-foreground-strong hover:bg-muted/40',
```

Both directions checked: the row stays **subordinate** (rgb(91,70,51) against the parents'
`text-foreground` at 10.76:1), and **dark does not regress** — the dark -strong rung
`hsl(36 13% 81%)` is the BRIGHTER of the two, so 9.34 can only rise. The tracked rows are
`text-primary` and are untouched.

---

## §5 · BORN-RED — measured in a `git archive` mirror at `ebb58a0f`, not asserted

Mirror at `…/scratchpad/bornred-d1`: `git archive ebb58a0f src | tar -x`, the post-cut test
file copied in unchanged, `node_modules` symlinked, a four-line vitest config carrying only
the `@glass` alias. **Run with the cwd AT the mirror** — unit-3's lesson: `vitest --root`
does not move `process.cwd()`, so a detector that reads the tree through `process.cwd()`
reads the LIVE one and greens falsely. The mirror's own bytes confirmed first:

```
$ grep -c "const PI" <mirror-ebb58a0f>/src/components/fourier-field/shaders/render.wgsl.ts
0
```

Result, full log at `born-red-D1.log`:

```
 Test Files  1 failed (1)
      Tests  3 failed | 9 passed (12)

→ expected [ 'PI' ] to deeply equal []
→ FOURIER_FIELD_RENDER_WGSL splices a PI chunk: expected false to be true
→ expected '\n// 0 chain · 1 trail · 2 head — a p…' to match /const PI: f32 = 3\.141592653589793;/
```

The headline line is the driver's verbatim defect, re-derived by a source-only detector:
`expected [ 'PI' ] to deeply equal []`. **The nine that pass at RED are not laundering** —
they are true statements about the four modules that were already correct and about the
chunks' requirements, each asserting against a subject that is present. This detector's
shape is "the one broken module fails", not "everything fails", and the born-RED run is what
shows the difference. At the cut, live tree: **12 passed (12)**.

**The two cases added to existing files, falsified the same way** — each detector run against
`git show ebb58a0f:<path>`:

```
D1d arm-1 onStatus->ownEngine  : false     ← RED at ebb58a0f
D1d arm-2 engine re-point      : false     ← RED
D1d pre-cut publishes RAW      : true      ← the defect, positively identified
D2 arm-1 plate reads plate-wash: false     ← RED
D2 arm-2 plate NOT paper-wash  : false     ← RED
D2 arm-3 dark card-derived     : false     ← RED
D2 arm-4 dark paper ink film   : true      ← NOT born-RED, and said so
```

**D2's fourth assertion is stated honestly as a guard, not a detector of the cure.** It
holds before and after; its job is to fire if the de-conflation ever drifts back into the
paper field's arm. It has a present subject and is falsifiable — it is simply not part of the
RED, and calling it one would be the inflation this band forbids.

### 5.1 · THE C1 CURE — 2026-08-28, the detector's own two holes, closed and mutation-killed

The C1 adjudication of this unit convicted the DETECTOR a second time, on two counts. Both
are now closed in `tests/components/fourier-field/wgsl-splice-contract.test.ts`, and each
close is measured by an arm that fails without it.

**COUNT 1 — the member-shadowing window.** The first cut fixed the false `T` RED by adding
struct member names to the DECLARES side. That is false about WGSL: a member binds in the
STRUCT's scope, not the module's. Counting it as a module declaration lets
`struct Foo { PI: f32 }` satisfy a module's reference to `PI` — the D1 defect wearing a hat,
greened by the very arm built to catch it. The member name now comes off the REFERENCES side
only, and is never a declaration: `STRUCT_BODY` (`:104`) isolates the braces,
`MEMBER_DECL` (`:108`) blanks the NAME and deliberately leaves the TYPE (a member typed by an
`alias` IS a real module-scope reference), `stripMemberDeclarations` (`:112-117`) applies it,
and `DECLARES` (`:102`) never had a struct clause to begin with.

**COUNT 2 — property order decided the census.** The old site regex required `label:`
textually BEFORE `code:`. A `code:`-first site escaped the census, and with it §2's
resolution, in silence — the one failure mode this whole file exists to make impossible.
`CALL_SITE` (`:138`) now captures the object literal as one blob and `CODE_PROP` / `LABEL_PROP`
(`:139-140`) read out of it INDEPENDENTLY; `label` became optional and prints as
`(unlabelled)` in the census message. **Deliberately NOT widened:** the walk is still
`.ts`-only (`:79-84`) — a `.vue` or `.js` call site would escape it. That is stated in the
file as KNOWN RESIDUE rather than built, because there is no such site to cover and inventing
coverage for one is speculation.

**The mechanism was probed in both directions before it was adopted** (scratch copy, six
extra rows, `18 passed (18)`, exit **0**): the render module really carries
`struct HeadFrame { T: … }` and `fr.T`; `declared()` does NOT contain `T`; `referenced()`
does NOT contain `T`; `fr.T` alone still yields no reference; `struct Foo { PI: f32 }` +
`return PI` declares nothing and REQUIRES `PI`; and `struct Foo { a: MY_ALIAS }` still
references `MY_ALIAS`.

#### (a) LIVE GREEN — the working tree, real `$?`

```
$ cd /Users/mkbabb/Programming/glass-ui
$ npx vitest run tests/components/fourier-field/wgsl-splice-contract.test.ts; echo $?

 RUN  v4.1.10 /Users/mkbabb/Programming/glass-ui

 Test Files  1 passed (1)
      Tests  12 passed (12)
   Start at  18:02:54
   Duration  305ms (transform 47ms, setup 37ms, import 59ms, tests 5ms, environment 116ms)
REAL EXIT=0
```

The D1 cure is on disk at `src/components/fourier-field/shaders/render.wgsl.ts:43`
(`const PI: f32 = 3.141592653589793;`), verified by `grep -n` before the run.

#### (b) BORN-RED — `git archive ebb58a0f` mirror, cwd AT the mirror

```
$ git archive ebb58a0f src vitest.config.ts tests/setup.ts package.json | tar -x -C <mirror>
$ grep -c "const PI: f32" <mirror>/src/components/fourier-field/shaders/render.wgsl.ts
0
$ cd <mirror> && npx vitest run tests/components/fourier-field/wgsl-splice-contract.test.ts; echo $?

 RUN  v4.1.10 …/scratchpad/mirror

 ❯ tests/components/fourier-field/wgsl-splice-contract.test.ts (12 tests | 3 failed) 9ms
     × FOURIER_FIELD_RENDER_WGSL references no module constant it never declares 4ms
     × every module that splices a PI-requiring chunk declares PI 1ms
     × the fourier render module is one of them — the D1 regression, by name 0ms

AssertionError: expected [ 'PI' ] to deeply equal []
- Expected
+ Received
- []
+ [
+   "PI",
+ ]
 ❯ tests/components/fourier-field/wgsl-splice-contract.test.ts:184:40

AssertionError: FOURIER_FIELD_RENDER_WGSL splices a PI chunk: expected false to be true // Object.is equality
- Expected
+ Received
- true
+ false
 ❯ tests/components/fourier-field/wgsl-splice-contract.test.ts:213:76

AssertionError: expected '\n// 0 chain · 1 trail · 2 head — a p…' to match /const PI: f32 = 3\.141592653589793;/
 ❯ tests/components/fourier-field/wgsl-splice-contract.test.ts:219:43
     [the Received block prints the mirror's whole render module — elided here, banked in
      full at `born-red-D1.log`, whose bytes this run reproduces line for line]

 Test Files  1 failed (1)
      Tests  3 failed | 9 passed (12)
   Start at  18:02:55
   Duration  311ms (transform 39ms, setup 37ms, import 82ms, tests 9ms, environment 91ms)
REAL EXIT=1
```

The cured file still fails at `ebb58a0f` with the SAME headline the first cut produced —
`expected [ 'PI' ] to deeply equal []`, a one-element set. The C1 cure did not soften the
detector: nine rows pass at RED because nine statements are true there.

#### (c) MUTATION-KILL — the member-shadowing window, uncured vs cured on ONE mutated tree

Mutation, planted in a scratch copy only: in `metaball.wgsl.ts` the real
`const PI: f32 = 3.141592653589793;` is replaced by `struct PiShadow { PI: f32, };` — a
module that SPLICES a PI-requiring chunk and declares PI nowhere, spelling the name in a
struct's scope. `METABALL_WGSL` was chosen over the fourier module deliberately, so §3's
by-name literal guard is not the thing that fires and the delta is the RESOLVER's alone.

```
ARM 1 — UNCURED resolver (struct members re-added to declared()), mutated tree
$ cd <scratch>/mut-shadow-uncured && npx vitest run …/wgsl-splice-contract.test.ts; echo $?

 Test Files  1 passed (1)
      Tests  12 passed (12)
   Start at  18:03:15
REAL EXIT=0            ← THE FALSE GREEN, reproduced exactly as adjudicated

ARM 2 — CURED resolver, the SAME mutated tree
$ cd <scratch>/mut-shadow && npx vitest run …/wgsl-splice-contract.test.ts; echo $?

 ❯ tests/components/fourier-field/wgsl-splice-contract.test.ts (12 tests | 2 failed) 8ms
     × METABALL_WGSL references no module constant it never declares 3ms
     × every module that splices a PI-requiring chunk declares PI 1ms

AssertionError: expected [ 'PI' ] to deeply equal []
 ❯ …/wgsl-splice-contract.test.ts:184:40
AssertionError: METABALL_WGSL splices a PI chunk: expected false to be true // Object.is equality
 ❯ …/wgsl-splice-contract.test.ts:213:76

 Test Files  1 failed (1)
      Tests  2 failed | 10 passed (12)
   Start at  18:02:57
REAL EXIT=1            ← THE KILL
```

#### (c′) MUTATION-KILL — the census's property order, the same two-arm shape

Mutation, scratch only: a SIXTH `createShaderModule` call planted in
`blob/composables/wgpuSetup.ts` with `code:` written before `label:`.

```
ARM 1 — UNCURED census (label-then-code regex)
 Test Files  1 passed (1) · Tests  12 passed (12) · REAL EXIT=0
   ← the sixth module is INVISIBLE: never censused, never resolved, and nothing says so

ARM 2 — CURED census (order-blind), same planted site
 × registers every module the tree hands to the GPU, and no phantom 3ms
AssertionError: components/aurora/composables/wgpuSetup.ts  [Aurora] aurora.wgsl  → AURORA_WGSL
components/aurora/composables/wgpuSetup.ts  [Aurora] aurora-image.wgsl  → AURORA_IMAGE_WGSL
components/blob/composables/wgpuSetup.ts  sixth (mutation)  → SIXTH_WGSL
components/blob/composables/wgpuSetup.ts  [GooBlob] metaball.wgsl  → METABALL_WGSL
components/fourier-field/renderer/wgpu.ts  [FourierField] compute.wgsl  → FOURIER_FIELD_COMPUTE_WGSL
components/fourier-field/renderer/wgpu.ts  [FourierField] render.wgsl  → FOURIER_FIELD_RENDER_WGSL: expected [ 'AURORA_IMAGE_WGSL', …(5) ] to deeply equal [ 'AURORA_IMAGE_WGSL', …(4) ]
+   "SIXTH_WGSL",
 ❯ …/wgsl-splice-contract.test.ts:165:32
 Test Files  1 failed (1) · Tests  1 failed | 11 passed (12) · REAL EXIT=1
```

**Every mutation lived in `/private/tmp/.../scratchpad` or a `git archive` mirror; not one
byte was planted in the repo tree, and the scratch was deleted after.** The row count does
not move: the file is still **12 cases**, so this unit's battery contribution stands at
**+14** exactly as §6.2 states.

---

## §6 · VERIFY — real exit codes, `$?` direct, never a piped tail's

Every figure below was captured with the command's own `$?`, redirected to a file. All
re-taken at `eb2e9428` after the driver's two landings.
[2026-08-28 · C1 cure: `npm test` re-run once more after the detector cure landed —
**`Test Files 1 failed | 224 passed (225)` · `Tests 1 failed | 2137 passed | 10 expected fail
(2148)`**, exit **1**, byte-identical to the row below. The one RED is still
`tests/public-surface.spec.ts` reading the stale `dist/` (mtime **Aug 10 14:07**, re-checked)
for `components/dock/styles/overflow.css` where `src/` now has `run.css` — α's rename, α's
close build, not this seat's. The cure moved no row: the splice file is 12 cases before and
after.]

| gate | command | exit | figure |
|---|---|---|---|
| typecheck | `npm run typecheck` | **0** | `vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json` — both clean |
| battery | `npm test` | **1** | `Test Files 1 failed \| 224 passed (225)` · `Tests 1 failed \| 2137 passed \| 10 expected fail (2148)` — **the one failure is FOREIGN**, §6.1 |
| gate receipt | `node scripts/gate-register.mjs` | **0** | `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0` |
| package | `npm run verify:package` | **1** | throws on a FOREIGN arm before reaching the ratchet — §6.3 |
| demo build | `npm run demo:dist:build` | **0** | `✓ built in 748ms` |

### 6.1 · The battery's ONE RED is FOREIGN — a STALE `dist/`, proven four ways

```
FAIL tests/public-surface.spec.ts > Row 8 built-artifact acceptance
     > ships exactly the style closure plus the three generated members
-   "components/dock/styles/run.css"        ← expected, computed from src/
+   "components/dock/styles/overflow.css"   ← shipped, read from dist/
```

1. **Mtime.** `dist/` is **Aug 10 14:07** — eighteen days before this seat's first byte
   (Aug 28 ~14:00). Every file under it carries that stamp.
2. **Subject.** The only differing rows are `src/components/dock/styles/*`. This unit's diff
   contains **zero** dock lines.
3. **History.** `overflow.css` does not exist at `ebb58a0f`
   (`git cat-file -e` → `fatal: path … does not exist`); `run.css` does. The rename landed
   before this session, and `dist/` predates the rename.
4. **Not this seat's build.** The demo build run here writes `dist-demo/`
   (`demo/vite.demo-dist.config.ts:63` `outDir: resolve(repoRoot, "dist-demo")`), whose
   `index.html` is stamped **Aug 28 14:08**. `dist/` was never written by this seat.

This is one of the two stale-`dist` REDs the driver named as standing until the close build.
**Attributed, not papered.**

### 6.2 · The battery figure MOVED, and this seat's contribution is named

The brief's last quiesced-class read is `2015 passed | 7 xf`. Observed here:
**`2137 passed | 10 expected fail`** across 225 files.

**This seat's contribution is exactly +14 rows, all green:** 12 in the new
`tests/components/fourier-field/wgsl-splice-contract.test.ts`, 1 added to
`tests/components/fourier-field/FourierField.smoke.test.ts` (D1d), 1 added to
`tests/demo/page-chrome-shrink.test.ts` (D2). Run alone: `Test Files 3 passed (3)` ·
`Tests 58 passed (58)`, exit **0**.

The remaining drift predates this seat and belongs to the landings between the driver's
reading and `eb2e9428` — γ's handmark cures (`739bf63d`), the π recovery seats
(`eb2e9428`), and α's concurrent close battery now on the tree. The three added `xf` are
likewise not this seat's; no case here is marked expected-fail. Stated, not smoothed.

### 6.3 · `verify:package` — RED, and the first failing arm is NOT the ratchet

```
Error: Invalid package artifact:
components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
requires direct dependency ownership of @mkbabb/pencil-boil
```

The script throws on its first failure, so **the run never reaches the ratchet arm**. The
failing subject is γ's handmark surface as emitted into the same stale `dist/` of §6.1 —
foreign twice over. **G-BUNDLE-RATCHET stands RED by route** (the single batch-close rebind
carries β0's +1215 and the driver's −71) and is **unmeasured this run**, because an earlier
foreign arm throws first. Both facts are stated; neither is papered. This seat's contribution
to the ratchet is **zero bytes of shipped bundle** — every source edit is one shader constant,
one status re-point, and CSS/markup inside `demo/`, which does not enter the library bundle.

### 6.4 · The receipt does not move

Read before the first byte and again at the cut; the two lines are the same string.
**Seats +0. Nothing minted.** `wgsl-splice-contract.test.ts` files as a close-battery row
the way #29's route-grammar arms and #59's layout canon do; no `SEAT-BINDING.json` row moves,
`drift:0` and `violations:0` hold, and `rosterSha256` is unchanged at `282d05cf`.

---

## §7 · π — ENQUEUED, NONE CLAIMED

Every paint-changing cure in this unit has its re-capture cell in **`PI-QUEUE.md`**, beside
this file: **π-RERUN-D1** (with the pill gate arm first, the clock arm named as the one that
proves the cure reached the loop, the re-scoped δ2-π-2 and δ2-π-5, and D1d's four arms),
**π-RERUN-D2** (the computed wash in both themes, the two paired light/dark frames, and the
contaminated decile re-run with both readings ordered), **π-RERUN-D3** (light ≥4.5, dark
non-regression, and the falsifiable ink identity).

**No browser was opened by this seat. No capture is claimed.** Every arm the queue names is
a DELTA against a banked predecessor artifact, and the cells that this unit does not cure —
δ3-π-4's missing `git archive 8a96868d` comparand, δ4-π-1's pre-cut baseline rect, δ4-π-4's
CSS leg under a real reduce, δ3-π-5's browser-seat adjudication — are listed under NOT
ENQUEUED with their grounds so they are not lost by omission.

---

## §8 · FENCE — what this seat wrote

**Six files touched, two created, all inside the unit's fence:**

```
 M src/components/fourier-field/shaders/render.wgsl.ts          +11
 M src/components/fourier-field/useFourierField.ts              +24 −1
 M demo/chassis/hero/story-hero.css                             +37 −2
 M demo/stories/navigation/toc-tracking.vue                     +17 −1
   [2026-08-28 · driver C2: figures corrected to git numstat — the seat's +25−1/+39−3/
   +18−1 rows did not match the bytes]
 M tests/components/fourier-field/FourierField.smoke.test.ts    +17
 M tests/demo/page-chrome-shrink.test.ts                        +25
?? tests/components/fourier-field/wgsl-splice-contract.test.ts  (new, 12 cases)
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit5/        (RECORD · PI-QUEUE · PASTE-BLOCKS · born-red-D1.log)
```

**ONE FENCE EXTENSION, on the driver's own ruling.** `demo/stories/navigation/toc-tracking.vue`
is outside the literal `demo/chassis/**` clause; the brief places D3 in this unit expressly
(*"chassis ToC — DRIVER-RULED this unit's per the #58 chassis family"*), the file is inside
Lane δ's standing `demo/stories/**` fence, and no other lane touches it.

**NOT TOUCHED, and verified so at the cut:** every dock and search surface (α), every
handmark surface (γ), `src/composables/glass/webgpu/**` (shared — D1d's cure was placed at
the consumer edge precisely to avoid it), `src/composables/glass/procedural/color.wgsl.ts`
(the chunk is right; its consumer was wrong), `src/styles/**`,
`src/components/aurora/**`, `src/components/blob/**`, `dist/`, `PI-CENSUS.md`, the π band's
banked artifacts, and every other lane's record. No `git add`, `commit`, `stash` or
`checkout` was run; the driver commits.

---

## §9 · WHAT IS TRUE NOW

- **D1 is cured and gated as a class.** The Fourier render module declares PI; the assembled
  text of all five shader modules resolves; a sixth module cannot escape the arm, and a stale
  registry row cannot hide behind it.
- **D2 is cured by de-conflation.** The plate has its own wash, derived to the light arm's
  own behaviour (1.877 vs 1.864) rather than copied from its number; the paper field is
  untouched and the light arm is byte-identical.
- **D3 is cured by a rung that already existed.** 4.04 → 5.45 in light, dark unregressed,
  zero tokens minted.
- **D1d is cured** at the field's own seam; **D1a** is verified as far as source carries and
  enqueued for the rest; **D1b** and **D1c** are **refused with grounds and re-scoped**, which
  is the honest outcome in both cases and is the only outcome this tree supports.
- **Nothing is claimed as painted.** Three re-capture cells are enqueued to the singleton
  browser seat, each a delta against a banked control, each with a KILL clause.
