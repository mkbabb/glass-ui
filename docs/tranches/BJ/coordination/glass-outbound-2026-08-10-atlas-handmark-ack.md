# glass-ui → atlas — the GF-HANDMARK relay ACK request (BK #51 W2 gate)

**From** glass-ui BK Φ5 row #51 (GF-HANDMARK W0-W5) · **date** 2026-08-10 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/GREENFIELD-TERMINAL.md`
§GF-HANDMARK (PASS 4 TERMINAL, adjudicated) + roster cell
`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:201` ·
**precedent form** the #85 outbound (`glass-outbound-2026-08-08-easing-consumer-addenda.md`)
and the #76 atlas addendum (`glass-outbound-2026-08-09-atlas-8.0.0-addendum.md`).

This is an **ACK REQUEST**, not an adopt addendum. It is dispatched at the lane's open so
the answer is already in flight when W2 reaches its sub-close; the terminal's own risk
register states the gate in one line — *"W2 cannot close green before the atlas addendum
is filed (three real imports, pinned 6.0.0, live `shape="path"` call site); if the SFC's
`path` member is cut before `strokeRibbon` publishes over an arbitrary polyline, atlas has
nothing to migrate to."*

Under the consumer-updates ruling, **consumer dependence never preserves an obsolete
API**: glass-ui cuts on merit and atlas updates via a marked addendum in ITS OWN tranche.
**No edits were made in either atlas tree** — the census below is read-only.

**Silence law**: every row carries a ratified default and silence advances. Atlas silence
is a **disclosed cross-repo hold on W2's sub-close only** — never a deferral of the wave,
never a park.

---

## 0 · Census — read-only, at this seat, 2026-08-10

Detectors stated verbatim: `git -C <root> rev-parse --abbrev-ref HEAD` ·
`git -C <root> log --oneline -1` · `git -C <root> status --porcelain | wc -l` ·
`grep -n "glass-ui" <root>/package.json`.

| checkout | branch | dirty | HEAD | glass-ui pins |
|---|---|---|---|---|
| `/Users/mkbabb/Programming/atlas` (the legacy line) | `master` | 0 | `1e2b911` *refactor(W-close/tokens): delete the retired Drawer width seam* | `package.json:121` `^6.0.0` · `:144` `6.0.0` |
| `/Users/mkbabb/Programming/.p-totality/atlas` (atlas-active) | `p/totality` | 0 | `6dd96b9` *refactor(W-MEMBRANE/E25): the bounded dock-lifecycle redress (claim-handle ownership)* | `package.json:111` `^7.0.0` · `:139` `7.0.0` |

Both trees clean; the §C two-line law of the #76 form holds unchanged.

### The import edges — exhaustive `grep -rn "glass-ui/handmark" <root>`

Six hits per tree; **three are real import statements**, three are prose.

| tree | real import | symbols |
|---|---|---|
| master | `src/editorial/AnimatedRule.vue:34` | `import { HandMark } from "@mkbabb/glass-ui/handmark";` |
| master | `src/charts/glyph/HandMark.vue:21-26` | `HandMark as GlassHandMark, BRUSHES, type BrushName, type HandShape` |
| master | `src/motion/useMarkMorphology.ts:40` | `import type { HandShape } from "@mkbabb/glass-ui/handmark";` |
| active | `src/editorial/AnimatedRule.vue:32` | same one-name form |
| active | `src/charts/glyph/HandMark.vue:21-26` | same four-symbol block |
| active | `src/motion/useMarkMorphology.ts:40` | same type-only form |

Prose (no edge, listed so a mechanical sweep does not re-flag them): master
`AnimatedRule.vue:7` · `charts/scene/usePaperCallout.ts:19` · `charts/scene/PaperCallout.vue:15`;
active the same three at `:7` / `:19` / `:15`.

> **One CORRECTION and one AMPLIFICATION to the terminal's own PASS-4 verification**
> (`GREENFIELD-TERMINAL.md:715`, the §GF-HANDMARK PASS 4 header), recorded rather than
> silently absorbed:
>
> **CORRECTION (path).** PASS-4 cites `useMarkMorphology.ts:40` **with no directory**.
> This seat supplies it: the file is at **`src/motion/useMarkMorphology.ts:40`** in both
> trees. PASS-4 attributes it to no wrong directory — an earlier draft of this ACK said it
> placed the file under `src/platform/composables/`, and that attribution is **WITHDRAWN**:
> `grep -n "src/platform/composables" GREENFIELD-TERMINAL.md` returns **zero hits** (exit 1).
> That path belongs to sci-report's tree, not atlas's — see
> `docs/tranches/BB/BB-AMENDMENT-constellation-modernize.md:385`
> (`src/platform/composables/useScrollProgress.ts`), the likely source of the conflation.
>
> **AMPLIFICATION (symbols), not a correction.** PASS-4's *"three real import statements"*
> is **TRUE** and is affirmed here, not corrected — the census above lands on the same
> three. What this ACK **adds** is the symbol enumeration PASS-4 never attempted: those
> three statements bind **six symbols** (`HandMark`, `BRUSHES`, `BrushName`, `HandShape`,
> plus the two duplicate-name edges at `useMarkMorphology.ts:40` and
> `charts/glyph/HandMark.vue:21-26`). Statements 3, symbols 6; both figures are right, and
> they count different things.
>
> **Scope note on the pin.** The pin figure PASS-4 carries ("pinned 6.0.0") is the legacy
> line only — atlas-active is at `7.0.0`.

---

## 1 · The four breaking deltas — what the greenfield cuts

Current shipped surface for reference: `src/components/handmark/types.ts:18-25`
(`HandShape` = **seven** members — `underline` · `strikethrough` · `highlight` · `circle` ·
`box` · `bracket` · `path` — one per line at `:19`-`:25`), `:27-29` (`HandAnimation`,
default `"none"`), `:36-90` (the full prop set), and the barrel
`src/components/handmark/index.ts`.

### 1.1 · `shape="strikethrough"` → `shape="strike"` — no alias

LIVE, literal, both trees: master `src/editorial/AnimatedRule.vue:124` · active
`src/editorial/AnimatedRule.vue:105` — both bind `shape="strikethrough"`.

The greenfield's `HandShape` is a **four**-member union (`underline` · `strike` ·
`circle` · `highlight`). The rename breaks **compile-visibly** — that is deliberate.

### 1.2 · `shape="path"` — CUT; `strokeRibbon(points, w)` is the successor

LIVE, both trees, one call site each:

```
src/charts/scene/PaperCallout.vue:118
  <HandMark shape="path" :path="leader.path" clock="scroll" :seed="seed" />
```

The `d` producer is atlas's own: `src/charts/scene/usePaperCallout.ts:154` — *"Serialize a
chip-edge → anchor leader to the `M x1 y1 L x2 y2` `d`"*, with the seat re-mapping it into
the brush viewBox (`usePaperCallout.ts:19-20`, `PaperCallout.vue:15`).

The successor is the exported pure function **`strokeRibbon(points, w)`**, which accepts
**any caller-supplied polyline**. Atlas samples its own leader via `getPointAtLength`
(~8 lines at the `PaperCallout` seat) and inks the returned ribbon.

**SEQUENCING — this is the whole gate.** `strokeRibbon` publishes at **W1**; the `path`
member is cut at **W2**. If that order ever inverts, atlas has nothing to migrate to. The
order is the library's obligation, not atlas's.

### 1.3 · `weight` px → dimensionless — a SILENT semantic break

`:weight="6"` meant **6 px**; it now means **6 × the L1 ink law**
(`w = weight · 0.20 · fs^0.75`, `weight` default `1`). **vue-tsc cannot see this** — the
type is `number` on both sides of the cut. It is named here because a typecheck-green
adopt is exactly how it would ship broken.

Atlas feeds this prop through its morphology solver, both trees:
- `src/charts/glyph/HandMark.vue:144` — `weight: HIGHLIGHT_WEIGHT_VB` (the constant-viewBox
  hull weight, `charts/marks/mark-tokens.ts`)
- `src/charts/glyph/HandMark.vue:151` — `weight: bandWeight.value`

**The scar already on disk, named so it is not re-cut**: `charts/glyph/HandMark.vue:10-16`
records that `weight:40` once *"rendered a full-viewBox amber BLOB — hull bbox 40.4
VB-units … its weight is a viewBox UNIT"*. Atlas already carries a units-confusion history
at this exact prop; this cut changes the unit **again**, and the constant-VB fix that
cured the blob is expressed in viewBox units that the new law does not speak.

`src/motion/useMarkMorphology.ts` re-derives six constants that **L1 supersedes
wholesale** — the solver does not need porting, it needs deleting down to the caller's
`weight` multiplier.

### 1.4 · `HandShape` keeps its NAME

`export const SHAPES = [...] as const; export type HandShape = typeof SHAPES[number]`.
The two type imports (`useMarkMorphology.ts:40`, `charts/glyph/HandMark.vue:25`) keep
compiling; **members** change compile-visibly. The bare-`Shape` rename was proposed and
**struck** (terminal §TRI-FOLD T-6 / R-A5) — a bare `Shape` in a library barrel is a
collision hazard. Atlas compatibility was recorded as *incidental, not grounds*; this row
exists so atlas can say whether it wants what it incidentally got.

---

## 2 · Props LIVE in atlas that are NOT in the greenfield five-prop surface

The greenfield public surface is exactly five: `shape` · `color` · `weight` · `seed` ·
`draw`. Everything below is bound today and is **stated, not yet ruled** — under
`vueCompilerOptions.checkUnknownProps` each retained binding is a **hard typecheck
error**; without the flag, a **silent no-op**.

| prop | master | active | note |
|---|---|---|---|
| `brush` | `AnimatedRule.vue:125` | `AnimatedRule.vue:106` | + `BRUSHES` / `type BrushName` imported at `charts/glyph/HandMark.vue:22-24` |
| `overrides` | — | `AnimatedRule.vue:107` (`:overrides="HAIRLINE_BRUSH"`) | **mirror divergence** — master does not bind it |
| `animation` | `AnimatedRule.vue:128` | `AnimatedRule.vue:110` | shipped default already `"none"` (`types.ts:27-29`) |
| `appear` | `AnimatedRule.vue:129` | `AnimatedRule.vue:111` | `"mount" \| "visible" \| "manual"` (`types.ts:54`) |
| `path` | `PaperCallout.vue:118` | `PaperCallout.vue:118` | dies with §1.2 |

**`clock` is NOT ours.** `<HandMark clock="scroll">` at master/active `StoryBeat.vue:55`,
active `EssayTitle.vue:85-90`, both `PaperCallout.vue:118` is **atlas's own wrapper prop**
(`charts/glyph/HandMark.vue` + `useHandMarkClock`), not a glass-ui prop. Stated so the
adopt does not chase it into the library.

**The optional peer**: `@mkbabb/pencil-boil` (named in the shipped barrel header,
`src/components/handmark/index.ts`) is **REMOVED** at W2; its removal receipt is W2-in-lane
(re-run the `ROUND-1-FINDINGS.md:567` hidden-peer probe on `/handmark`).

---

## 3 · What is actually being ASKED — three rows, each with a ratified default

| # | ask | ratified default (holds on silence) |
|---|---|---|
| A-1 | Is `strokeRibbon(points, w)` + a ~8-line `getPointAtLength` sampler an acceptable successor to `shape="path"` at `PaperCallout.vue:118`, or does atlas need `path` held? | **`path` is CUT; `strokeRibbon` publishes at W1 first.** Terminal §1 + the W2 relay row |
| A-2 | Does atlas want `HandShape` to keep its NAME (vs a bare `Shape`)? | **`HandShape` KEEPS its name.** Terminal T-6 / R-A5 |
| A-3 | Does atlas acknowledge the `weight` px→dimensionless break, given vue-tsc is blind to it and the `HIGHLIGHT_WEIGHT_VB` fix speaks the old unit? | **ACKNOWLEDGED and adopted in atlas's own tranche**; `weight ≈ 1.86` reproduces the marker rung. Terminal §RISKS |

`g12` (the `perfect-freehand` consume of the measurably-live `freehand.ts`) is an **owner**
row, not an atlas row — it fires at W2's brush-engine cut with ratified default **CONSUME**
(`docs/tranches/BK/ASK.md` g12). Named here only so the two W2 gates are not confused.

## Not restated here

The five laws, the two-arm band, the ring `k = 2^(1/3)`, the DOM-derived seed, the ink-lag
kill criterion, the deletion list, the LOC ceiling — `GREENFIELD-TERMINAL.md` §GF-HANDMARK,
cited whole.

## Owed back to glass-ui

Nothing blocking. Breaks or objections beyond these rows reply on this thread and route to
#51's W2 sub-close; anything touching the 8.0.0 adopt itself belongs to the #76 thread
(`glass-outbound-2026-08-09-atlas-8.0.0-addendum.md`), which the DockCrest π10 gate still
fronts.
