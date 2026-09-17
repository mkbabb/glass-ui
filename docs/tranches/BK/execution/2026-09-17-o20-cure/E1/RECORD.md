# Lane E1 — CUT-1 · CUT-2 · GAP · GATE · A-8 (hue-wrap law)

**Seat** implement · **model** `claude-opus-5`, asserted from this seat's own transcript
(`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_2bb35ea4-0fb/agent-a4bae83e0c4662118.jsonl`,
found by grepping the prompt-unique phrase "EXPORT-REACH named-re-export hole"; `"model":"claude-opus-5"`,
sole value in the file) and gating every command chain below with `&&`.
**Spec of record** `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` —
CUT-1, CUT-2, GAP, GATE, A-8, plus the three cross-cutting facts and the lane table.
**Seat evidence read in full** `investigate__cuts-fourier.json` + `verify__cuts-fourier.json`,
`investigate__exports-tabs-timeline.json` + `verify__exports-tabs-timeline.json`,
`verify__asks-surface.json` (B-7's naming of the same export).

## Step-0 baseline — banked before a byte moved

```
$ git rev-parse HEAD
2984e3778a1bbe866b5e3985719007471fcedbd3

$ git status --porcelain
 M docs/tranches/BK/EXECUTION-PROGRESS.md

$ git diff --stat
 docs/tranches/BK/EXECUTION-PROGRESS.md | 166 ++++++++++++++++++++++++++++++++-
 1 file changed, 162 insertions(+), 4 deletions(-)
```

Lane P and Lane C1 entered the tree during this lane's run (their files appear in the
closing census below, attributed, untouched by me).

## Census — every file this lane touched

| file | +/− | why |
| --- | --- | --- |
| `src/components/fourier-field/constants.ts` | +8 / −8 | CUT-1 delete · CUT-2 `{@link}` → prose + the off-barrel grounds |
| `src/components/fourier-field/index.ts` | +8 / −1 | GAP — `type FourierSource` |
| `src/components/timeline/index.ts` | +13 / −0 | A-8 — `accentFor`, `HUE_OFFSET`, `HUE_STRIDE`, `HUE_STOPS`, `type TimelineSpan` |
| `src/composables/glass/index.ts` | +9 / −0 | GAP — the shared type door (`RendererStatus`, `GpuBackend`) |
| `src/index.ts` | +6 / −0 | GAP — the root barrel lists the pair |
| `src/components/dock/composables/dockCrossfadeContext.ts` | +0 / −3 | GATE leak 3 — `useOptionalDockCrossfadeContext` deleted |
| `src/components/dock/composables/index.ts` | +0 / −1 | the same name off the internal composables barrel |
| `demo/stories/substrates/fourier-field.vue` | +6 / −2 | CUT-2 deep-import · GAP names the type at `:281` |
| `tests/components/fourier-field/FourierField.smoke.test.ts` | +5 / −2 | CUT-2 — the arm iterates the imported constant |
| `tests/gates/overfit-structure.test.ts` | +34 / −6 | GATE — corrected `publishedSurface()` + a bite + the dated bracket (pre-cure the row measured 32 / 5; cure round 1's two prose edits carry it to 34 / 6) |
| `tests/public-surface.spec.ts` | +31 / −0 (3 hunks) | A-8 runtime rows · GAP type-level doors |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/E1/RECORD.md` | new | this file |

`tests/public-surface.spec.ts` is shared with Lane P by the ledger's own fence. My hunks
are `@@ -44,0 +45,8 @@`, `@@ -318,0 +327,10 @@`, `@@ -549,0 +568,13 @@`. The fourth hunk
in that file (`@@ -642,0 +674,54 @@`, the CSS-parse probe) is Lane P's and was not touched.

## Act ledger

### CUT-1 — `FOURIER_TANGENT_EPS` deleted

`src/components/fourier-field/constants.ts:84-88` (the 3-line docblock + the const) is
gone. The guard it documented lives in WGSL and owns its own copy
(`shaders/render.wgsl.ts:45 const TANGENT_EPS: f32 = 1e-4;`, read at `:111`); there is no
TS→WGSL constant splice, so nothing on either side moved. Confirmed on the rebuilt
artifact: `grep -rn FOURIER_TANGENT_EPS dist/` → empty.

### CUT-2 — `FOURIER_STROKE_RUNGS` de-duplicated on the LOWER surface

Per the ledger's ruling (the investigator's own alternative, which the verifier preferred):
the name stays OFF the `/fourier-field` barrel — publishing a name with zero consumers is
the audit's own "minting ahead of the consumer". The two by-value copies are struck and
both readers deep-import the module, which is the house idiom and which the story already
used for `rendererStatus`:

- `demo/stories/substrates/fourier-field.vue:274` — `const STROKE_RUNGS = FOURIER_STROKE_RUNGS.map(String)` (was `["4","8","12"]`), with the import at `:25`.
- `tests/components/fourier-field/FourierField.smoke.test.ts:198` — `for (const stroke of FOURIER_STROKE_RUNGS)` (was `[4, 8, 12]`), folded into the existing `@glass/components/fourier-field/constants` import at `:34`, where the name itself sits at `:36`.
- `constants.ts:111` — the published `{@link FOURIER_STROKE_RUNGS}` on `markStroke` becomes prose: `/** The mark stroke in CSS px — one of 4 | 8 | 12. */`. The shipped types no longer name a symbol a consumer cannot reach. Confirmed: `grep -rn '{@link FOURIER_STROKE_RUNGS}' dist/` → empty.
- The const's own docblock now states why it is off the barrel, so the next close does not re-file it as a cut.

### GAP — three type doors, additive

`FourierSource` → `src/components/fourier-field/index.ts`. It is the type its own
published `FourierFieldConfig.source` spends, so it belongs on the barrel that publishes
the config.

`RendererStatus` + `GpuBackend` → **the root barrel `.` (`@mkbabb/glass-ui`)**, reached
through `src/composables/glass/index.ts`. **This is the door I picked, and the measurement
behind it**, over the published 9.0.0 dist:

- `RendererStatus` is named in a published emit/expose signature on **four** entries —
  `./fourier-field` (`FourierField.vue.d.ts`: the `rendererStatus` emit AND the exposed
  `Readonly<Ref<RendererStatus>>`), `./aurora`, `./blob`, `./constellation`.
- `GpuBackend` is named on **one** — `./fourier-field` (`backend: () => GpuBackend`).
- `grep -ln 'RendererStatus\|GpuBackend' dist/*.d.ts` → **no entry file at all** at 9.0.0.

A component-barrel door would have to be written four times, or once on
`./fourier-field` and then an Aurora consumer would import the type for their own
`@renderer-status` handler out of the fourier package. One shared door answers all four
and adds no runtime: both re-exports are `export type`, and the root barrel's
vueuse-free / keyframes-free law is untouched because a type export is erased. `Object.keys(Glass)`
is unchanged, which the standing "keeps the exact root runtime surface" arm re-proves.

Two files outside the listed fence were touched, **export lines only**, and are named
here as the fence requires: `src/composables/glass/index.ts` (the owning package barrel —
the door's real home, matching the `Canvas2DFrame`/`SpecularWriter` precedent already in
it) and `src/index.ts` (the existing `from "./composables/glass"` list gains the two type
names). Confirmed on the rebuilt artifact: `dist/index.d.ts:32` — the root types entry —
now carries `type GpuBackend, type RendererStatus`.

The demo's cast (`:281` before this edit, `:285` after) reads
`studio.config.source as FourierSource` — see the refusal below.

**The rider ask, answered.** Can `scripts/verify-export-types.mjs` carry a general
nameability arm cheaply ("every type in a published signature is importable from a
published entry")? **Feasible, not cheap — recorded as a ruling, not executed.** The file
already builds a real `ts.Program` over the installed tarball and enumerates each module's
exported value and type symbols through the checker (`installedModuleSurface`, `:398-415`),
so the *entry* half is free. The cost is the other half: collecting every type identifier
referenced by every published signature across 68 entries means walking the whole type
graph, which is thick with `Ref`, `Component`, reka and vue names, structurally inlined
helpers and Vue's generated `.vue.d.ts` shapes. A detector like that needs its own
exclusion policy, and an exclusion policy is the contrived-gate class the gates-abrogation
mandate struck. What IS cheap is what landed: a type-level import in
`tests/public-surface.spec.ts` costs one line per name and bites at `vue-tsc`.

### GATE — the EXPORT-REACH named-re-export hole (rides #19, nothing minted)

`tests/gates/overfit-structure.test.ts` `publishedSurface()`: the `BRACE_RE` branch both
added the listed names AND recursed into the module they came from, so
`export { DEFAULT_FOURIER_CONFIG, type FourierFieldConfig } from "./constants"` published
all 18 consts in `constants.ts`. One line removed — `if (m[2]) collect(resolveSpec(file, m[2]));`
— and a named re-export now publishes exactly its listed names. `export *` still hoovers,
because that is what it means.

The header prose that said "the TRANSITIVE export closure" is contradicted, so it carries
a strike-in-place dated bracket `[2026-09-17 · O-20 GATE]` naming the hole, the corrected
rule and the three leaks.

A new self-test bite locks the rule on the real tree at the barrel that held the hole:
`DEFAULT_FOURIER_CONFIG` (listed) is published; `FOURIER_QUANTUM_FINE` (same file, not
listed) is not; `useLiquidPress` (reached through `/motion`'s `export * from
"./spring/useLiquidPress"` and named nowhere on that barrel) still is. No new G-id, no new
seat, no `it.fails` scaffold.

**Leak 3, disposed on measurement.** `dockCrossfadeContext.ts :: useOptionalDockCrossfadeContext`:
its own docblock read "Befitting silent default; reserved for future consumers" and the
census agrees — its only appearance outside its declaring module is the internal
composables barrel line, which is a re-export, not a use site. `/dock` publishes the three
crossfade *types* and deliberately keeps the context helpers internal
(`dock/index.ts:16-17`), so the name is on no published door either. Dropping the `export`
keyword alone would leave an unread local, so it is **deleted**, with its barrel line
(`src/components/dock/composables/index.ts`, one export-list line — named here, nothing
else in that file touched). No consumer, no shim, no alias.

### A-8 — the hue-wrap law gets a door

`src/components/timeline/index.ts` re-exports `accentFor`, `HUE_OFFSET`, `HUE_STRIDE`,
`HUE_STOPS` and `type TimelineSpan` from `./geometry`. **Names verified on disk first**,
because the seats disagreed: `geometry.ts:22,23,24,27,153` declares exactly
`HUE_OFFSET`/`HUE_STRIDE`/`HUE_STOPS`/`TimelineSpan`/`accentFor`. There is no `ordinalHue`
anywhere in the file, so that spelling is not carried.

`layout` (`:59`), `fillFor` (`:125`) and `aggregate` (`:140`) stay internal, as ruled.

The barrel comment cites the overfitting triage's limb (c) and both named consumers by
name — value.js B-7's L-10 (fourier index-interpolates the 13-stop ramp with no wrap) and
keyframes.js KF-W7 C-15 — so the next close battery does not book four fresh orphans
against a door with zero readers today.

Post-build confirmation (the ledger asked for it explicitly): `dist/timeline.js` ends
`export { v as HUE_OFFSET, b as HUE_STOPS, y as HUE_STRIDE, k as Timeline, T as accentFor };`
— the functions did already bundle as locals, so the barrel line was the whole change, and
`dist/components/timeline/index.d.ts` carries both new lines.

## Born-RED — proven on bytes, before and after

### RED 1 · the corrected gate, run BEFORE any source moved

`npx vitest run tests/gates/overfit-structure.test.ts`, with only the one-line rule fix in
place:

```
 FAIL  tests/gates/overfit-structure.test.ts > gate:G-OVERFIT — EXPORT-REACH arm (the TS twin of orphan-css-partial) > every runtime export is reachable — no export leaks (zero external site AND unpublished)
AssertionError: 3 runtime export(s) are referenced nowhere outside their own module AND ship on no published subpath. An unreachable export is not API — make it module-private or delete it:
  src/components/dock/composables/dockCrossfadeContext.ts :: useOptionalDockCrossfadeContext
  src/components/fourier-field/constants.ts :: FOURIER_STROKE_RUNGS
  src/components/fourier-field/constants.ts :: FOURIER_TANGENT_EPS: expected [ …(3) ] to deeply equal []

 Test Files  1 failed (1)
      Tests  1 failed | 13 passed (14)
```

Exactly the three the ledger predicted, in that order. GREEN after the three disposals
(and after the new bite landed):

```
 Test Files  1 passed (1)
      Tests  15 passed (15)
```

[2026-09-17 · E1 cure] The RED output quoted above was taken before the header bracket at
`:84` was written, and that bracket then spelled `useOptionalDockCrossfadeContext` in
prose. `censusFiles` walks `tests/` (`:111`) and `word.test(read(file))` scores raw text
(`:207`), so the comment counted as an external site for the very symbol the corrected arm
exists to find: with the pre-cure gate file in place the three-row RED is **not
replayable**, and the arm carried a permanent blind spot on that one name. Cure round 1
rewords `:84` off the symbol, and the RED replays. Receipt, run in a scratch rsync copy of
the tree (since removed; the shared tree was never mutated) with the three pre-cure states
restored — `export const useOptionalDockCrossfadeContext = ctx.useOptional;` back in
`dockCrossfadeContext.ts`, `FOURIER_TANGENT_EPS` back in `constants.ts`, and both CUT-2
readers back to their `[4, 8, 12]` literals with their imports removed — against the
**cured** gate file:

```
$ npx vitest run tests/gates/overfit-structure.test.ts   # in the scratch copy
AssertionError: 3 runtime export(s) are referenced nowhere outside their own module AND ship on no published subpath. An unreachable export is not API — make it module-private or delete it:
  src/components/dock/composables/dockCrossfadeContext.ts :: useOptionalDockCrossfadeContext
  src/components/fourier-field/constants.ts :: FOURIER_STROKE_RUNGS
  src/components/fourier-field/constants.ts :: FOURIER_TANGENT_EPS: expected [ …(3) ] to deeply equal []

 Test Files  1 failed (1)
      Tests  1 failed | 14 passed (15)
PROOF_EXIT=1
```

All three rows, in that order, from bytes. On the real tree the cured gate is GREEN:
`Test Files 1 passed (1) · Tests 15 passed (15)`.

### RED 2 · the `/timeline` door, run BEFORE the barrel line

`npx vitest run tests/public-surface.spec.ts`:

```
     × exports 'timeline' subpath symbol 'accentFor' 3ms
     × exports 'timeline' subpath symbol 'HUE_OFFSET' 0ms
     × exports 'timeline' subpath symbol 'HUE_STRIDE' 0ms
     × exports 'timeline' subpath symbol 'HUE_STOPS' 0ms
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯
AssertionError: expected { Timeline: { …(7) }, …(1) } to have property "accentFor"
AssertionError: expected { Timeline: { …(7) }, …(1) } to have property "HUE_OFFSET"
AssertionError: expected { Timeline: { …(7) }, …(1) } to have property "HUE_STRIDE"
AssertionError: expected { Timeline: { …(7) }, …(1) } to have property "HUE_STOPS"
 Test Files  1 failed (1)
      Tests  4 failed | 87 passed (91)
```

### RED 3 · the three type doors, run BEFORE each re-export

`npx vue-tsc --noEmit -p tsconfig.test.json`, with the assertions in place and the doors
shut (the `RendererStatus`/`GpuBackend` arm was re-proven by backing the two `export type`
lines out of `src/composables/glass/index.ts` and restoring them from a scratchpad copy —
no git command was used on the shared tree):

```
src/index.ts(488,10): error TS2305: Module '"./composables/glass"' has no exported member 'GpuBackend'.
src/index.ts(489,10): error TS2305: Module '"./composables/glass"' has no exported member 'RendererStatus'.
tests/public-surface.spec.ts(51,15): error TS2305: Module '"@glass/components/fourier-field"' has no exported member 'FourierSource'.
```

GREEN after: all three resolve; `tests/public-surface.spec.ts` + the fourier smoke battery
→ `Test Files 2 passed (2) · Tests 123 passed (123)`.

## Refusal with grounds — one, and it is small

The ledger's lane note says the demo's `:281` cast "becomes a `FourierSource`
annotation". It becomes a `FourierSource` **assertion**, `studio.config.source as
FourierSource`, and cannot honestly become an annotation. Measured, not assumed: I typed
`FourierViewCfg.source` as `FourierSource` and ran `vue-tsc -p tsconfig.json`:

```
demo/stories/substrates/fourier-field.vue(123,13): error TS2322: Type '"f-mark"' is not assignable to type 'FourierSource'.
demo/stories/substrates/fourier-field.vue(163,13): error TS2322: Type '"star"' is not assignable to type 'FourierSource'.
demo/stories/substrates/fourier-field.vue(183,13): error TS2322: Type '"heart"' is not assignable to type 'FourierSource'.
```

[2026-09-17 · adjudication] ~~`demo/stories/substrates/fourier-field.vue(234,49): error TS2345: Argument of type 'string' is not assignable to parameter of type 'FourierSource'.`~~ — struck
from the block above. The stated trial (`FourierViewCfg.source` annotated `FourierSource`,
the cast dropped, `mintFor` untouched) was re-run at adjudication and yields exactly the
three TS2322 errors above and no TS2345: `mintFor(key: string, richness: number)` at
`demo/stories/substrates/fourier-field.vue:83` accepts every `FourierSource`, and
`FOURIER_SHAPES`'s key is `string`. The quoted TS2345 could only come from an undisclosed
second change, so it is not evidence. The three TS2322 lines stand, and the refusal stands
on them alone.

`FourierSource` is `"elliptic" | keyof typeof FOURIER_FIGURES`, and the studio's own
presets feed it three demo-local `FOURIER_SHAPES` keys that are in no published figure
map. The story's view model is genuinely WIDER than the published union and narrows at
the component boundary, so the assertion is load-bearing. The trial was reverted whole.
What the item actually asked for is delivered: the library's own story names the published
type instead of writing the `FourierFieldConfig["source"]` indexed-access workaround that
existed only because the name had no door.

## Verify — at this lane's end, real exit codes, never a piped tail's

```
$ npx vue-tsc --noEmit -p tsconfig.json ; echo "EXIT=$?"
EXIT_tsconfig.json=0

$ npx vue-tsc --noEmit -p tsconfig.test.json ; echo "EXIT=$?"
tests/styles/emitted-utility-vars.test.ts(217,17): error TS2322: Type 'Document_ | ContainerWithChildren | undefined' is not assignable to type 'ContainerWithChildren | undefined'.
EXIT_tsconfig.test.json=2
```

The single `tsconfig.test.json` error is **Lane C1's**, not mine: `git diff -U0` on that
file gives one hunk, `@@ -171,0 +172,60 @@`, and line 217 sits inside it — it is C1's new
A-11d arm (`tests/styles/emitted-utility-vars.test.ts (new arm)` in their fence), in
flight. Nothing of mine appears. `tsconfig.json` (src + demo, the strict project) is 0.

Lane tests:

```
$ npx vitest run tests/gates/overfit-structure.test.ts
 Test Files  1 passed (1)
      Tests  15 passed (15)

$ npx vitest run tests/public-surface.spec.ts tests/components/fourier-field/FourierField.smoke.test.ts
 Test Files  2 passed (2)
      Tests  123 passed (123)
```

Full battery, stated as its full line:

```
$ npx vitest run ; echo "BATTERY_EXIT=$?"
 Test Files  227 passed (227)
      Tests  2172 passed | 10 expected fail (2182)
BATTERY_EXIT=0
```

Zero RED. The 10 xfail are the standing `it.fails` population, untouched.

[2026-09-17 · adjudication] The line above was true when this lane closed and is true again
now, but it was NOT true continuously: at adjudication (18:35 local) the battery read
`Test Files 1 failed | 226 passed (227) · Tests 1 failed | 2171 passed | 10 expected fail
(2182)`, exit 1. The sole RED was `tests/gates/boot-graph.test.ts`'s dist-demo staleness
arm, owned by **Lane C1** — `src/components/slider/styles.css` at 22:34:37Z postdated the
`dist-demo` build at 22:05:37Z, and no E1 source postdates that build. Residue 3 below
predicts exactly this. Another lane rebuilt `dist-demo` at 22:37:08Z, which is why the
cure-round re-run (18:41 local, below) is green again.

One transient is worth recording because a re-runner will meet it. The first battery run
of this lane went `1 failed | 2171 passed | 10 expected fail`, on
`tests/gates/boot-graph.test.ts > the dist-demo it measures is NEWER than every source it
is built from` — `dist-demo/index.html` built 22:00:42Z against sources newest at
22:03:48Z. That arm goes RED for whichever lane edits `src/` after the last
`demo:dist:build`, and at that instant it was mine. I rebuilt it (under the lock, below)
and it is green (`dist-demo/index.html` now 22:05:37Z). It will re-RED for any lane that
edits `src/` after that stamp; one
`npm run demo:dist:build` at the wave close settles it for everyone. `dist-demo/` is
gitignored (`.gitignore:65`), so nothing enters the commit.

Gate receipt, verbatim, full line:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

(`node scripts/gate-register.mjs`, real exit 0 — re-run with output discarded to read the
process status rather than a pipeline's.) `seats:60` and `violations:0`. Nothing minted:
no new G-id, no new seat, no new spec file. The gate fix is a rule correction inside the
existing #19 arm; the born-RED instruments are arms on files that already existed.

Build, under the shared lock:

```
$ mkdir …/scratchpad/build.lock   → LOCK ACQUIRED at attempt 1
$ npm run build                   → BUILD_EXIT=0
$ npm run demo:dist:build         → DEMO_BUILD_EXIT=0
$ rmdir …/scratchpad/build.lock   → LOCK RELEASED
```

The lock was held for both builds and released; it was never taken twice and is not held now.

## Fence statement

Files created or modified: the twelve in the census, and nothing else. Inside the fence as
written: `src/components/fourier-field/{constants,index}.ts`,
`src/components/timeline/index.ts`, `src/components/dock/composables/dockCrossfadeContext.ts`,
`demo/stories/substrates/fourier-field.vue`,
`tests/components/fourier-field/FourierField.smoke.test.ts`,
`tests/gates/overfit-structure.test.ts`, `tests/public-surface.spec.ts` (export/type
assertions only — three hunks, no probe `it()` touched), and this record's directory.

Outside the listed fence, under the fence's own "name it in the RECORD and touch only its
export lines" clause, export lines only: `src/composables/glass/index.ts` and
`src/index.ts` (the chosen type door), and `src/components/dock/composables/index.ts` (one
export-list line, unavoidable with the leak-3 deletion the fence assigned me).

No git `add`/`commit`/`stash`/`checkout`/`reset` was run. No sibling repo was read for
writing or written. No file belonging to Lane P, C1, C2, E2, D, T1, T2 or R was edited —
their in-flight changes (`scripts/verify-export-types.mjs`, the fourth hunk of
`tests/public-surface.spec.ts`, `tests/styles/*`, `src/components/configurator/*`,
`src/components/slider/styles.css`, `src/styles/glass/overlay-plate.css`) sit in the tree
untouched. No masking fallback, no back-compat shim, no legacy alias: CUT-1 and the dock
leak are plain deletions, CUT-2's rungs keep one home, and every new name is additive.

## Residue — owed, stated, not hidden

1. **`.bundle-ratchet` must be rebound at publish.** The datum is `2549378` and
   `ratchetEvidence` demands **exact equality** in later-coordinate mode, so any byte
   movement in `dist/` fails `verify:package` at release. Every lane in this wave moves
   bytes; mine moves them in `dist/timeline.js` (+4 exported names), `dist/index.d.ts`,
   `dist/components/{timeline,fourier-field}/index.d.ts` and
   `dist/composables/glass/index.d.ts`, and removes `FOURIER_TANGENT_EPS` from
   `dist/components/fourier-field/constants.d.ts`. The rebind is a deliberate, wave-level
   act at the cut and is not in my fence. Flagged, not touched.
2. **`tests/styles/emitted-utility-vars.test.ts(217,17)` TS2322** — Lane C1's A-11d arm,
   in flight, attributed above. It holds `vue-tsc -p tsconfig.test.json` at exit 2 for the
   whole tree until C1 lands. The vitest battery is unaffected (it is green).
3. **`boot-graph`'s dist-demo arm** re-REDs for whichever lane edits `src/` last. One
   `npm run demo:dist:build` at the wave close, after every lane has landed.
4. **`FOURIER_REFERENCE_DIAGONAL_PX` and `FOURIER_PAINT_FLOOR_PX`** — the cuts-fourier
   verifier banked these as a missed cohort: declared in `renderer/mint.ts`, on no barrel,
   with exactly ONE external site each (the fourier smoke battery). They pass the
   corrected EXPORT-REACH rule on that one site, so they are not leaks; under the standing
   "≥ 2 sites or exported" edict their only consumer is a test. They are not in my lane's
   items and I did not grade them. Carried here so the next close has them by name;
   `CUT-3`'s 10.0.0 cure already opens the file they live in.
5. **CUT-3 (`ringsAt`) is untouched**, as ruled — CURE-NEXT-MAJOR, recorded, not executed.
   Its barrel line and its tautology test are exactly as they were.

## CURE ROUND 1 — 2026-09-17

Seven adjudicated cures, applied exactly, nothing else. No item was reopened, no new
instrument written, no G-id or seat minted. Step-0 for this round: `HEAD 2984e377`,
`git status --porcelain` 22 dirty paths, unchanged in count at the end.

| # | where | change |
| --- | --- | --- |
| 1 | `tests/gates/overfit-structure.test.ts:84` | the bracket prose names the file, not the symbol — it now reads "the dock crossfade optional reader in dockCrossfadeContext.ts, deleted with them." The old spelling of the symbol survives nowhere under `src/`, `demo/`, `tests/` or `scripts/` (the arm's own census roots), so the arm can see the name it was corrected to find. Proof appended under born-RED 1 above. |
| 2 | `tests/gates/overfit-structure.test.ts:147` | the `publishedSurface()` docstring no longer says "transitive", which the header's own strike contradicts; it now reads: the runtime-export closure of the published entry map — declarations, the listed names of named re-exports, and recursion through `export *` only. |
| 3 | `RECORD.md:34` | census row for `src/components/fourier-field/constants.ts` → `+8 / −8` (`git diff --numstat`: `8 8`) |
| 4 | `RECORD.md:43` | census row for `tests/gates/overfit-structure.test.ts` → `+34 / −6`, re-measured AFTER cures 1 and 2 (pre-cure it was `32 5`, as adjudicated; the two prose edits carry it to `34 6`) |
| 5 | `RECORD.md:70` | `FourierField.smoke.test.ts:196` → `:198` (import at `:34`, the name at `:36`, the loop at `:198`) |
| 6 | `RECORD.md` refusal | the `(234,49)` TS2345 line struck in place with `[2026-09-17 · adjudication]` and its grounds: the stated trial yields the three TS2322 errors and no TS2345, because `mintFor(key: string, …)` at demo `:83` accepts every `FourierSource`. The three TS2322 lines stand and carry the refusal alone. |
| 7 | `RECORD.md` verify | a dated bracket under the full-battery line recording the adjudication-time reading (`1 failed` / `2171 passed` / `10 expected fail`, exit 1), its sole RED (boot-graph dist-demo staleness) and its owner (Lane C1) |

Files touched this round: `tests/gates/overfit-structure.test.ts` (two prose lines — no
rule, matcher or assertion changed) and this RECORD. Both inside the fence. The scratch
rsync copy used for the cure-1 proof lived under the scratchpad, never the repo, and was
removed; the shared tree was read, not mutated, for that proof.

### Verify, re-run at the end of cure round 1 — real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json ; echo "TSC_EXIT=$?"
TSC_EXIT=0

$ npx vitest run tests/gates/overfit-structure.test.ts tests/public-surface.spec.ts \
      tests/components/fourier-field/FourierField.smoke.test.ts ; echo "LANE_EXIT=$?"
 Test Files  3 passed (3)
      Tests  138 passed (138)
LANE_EXIT=0

$ npx vitest run ; echo "BATTERY_EXIT=$?"
 Test Files  227 passed (227)
      Tests  2172 passed | 10 expected fail (2182)
BATTERY_EXIT=0

$ node scripts/gate-register.mjs ; echo "GATE_EXIT=$?"
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
GATE_EXIT=0
```

Zero RED, every owner accounted: the boot-graph arm that was RED at adjudication is green
again because another lane rebuilt `dist-demo` at 22:37:08Z, past Lane C1's
`src/components/slider/styles.css` at 22:34:37Z. Cure round 1 touched no `src/` or `demo/`
file, so it cannot re-stale that arm. `seats:60` and `violations:0` hold; nothing minted.
No build was needed this round, so the shared lock was neither taken nor held.

`npx prettier --check tests/gates/overfit-structure.test.ts` warns — and the `HEAD` copy of
the same file (`git show HEAD:…` through the same check) warns too, with 37 diff hunks
against 11 in the working copy. The condition predates this lane entirely, and none of the
11 touches either cured line. Pre-existing, not mine, not fixed.

### Residue after cure round 1

Residues 1–5 above stand unchanged. One is added:

6. **The EXPORT-REACH arm scores raw text, so its own prose can blind it.** Cure 1 fixes
   the one instance; the class remains. Any comment, record or test file under `src/`,
   `demo/`, `tests/` or `scripts/` that spells a leaked symbol counts as an external site
   and buys that symbol a pass. Hardening the matcher off raw text is already routed
   `RT-19B→#65` in the file's own header. Not in this lane's items; named so the next close
   has it.
