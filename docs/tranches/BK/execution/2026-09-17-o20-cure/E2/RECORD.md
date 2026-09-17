# Lane E2 — B-1, A-10, CUT-4/5 doc half, A-6 demo

**Seat** implement · **model** `claude-opus-5` (read from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_4cc3afc1-169/agent-a06ca0f1813c36309.jsonl`,
found by grepping the workflows tree for a phrase unique to this lane's prompt
("ShowcaseFrame bare read"); the `model` field is `claude-opus-5` on every assistant turn) ·
**date** 2026-09-17 · **base** `master` @ `46ab4124` ·
**spec of record** `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`
§B-1, §A-10, §CUT-4/5, §A-6.

The id was asserted FIRST and gated the chain with `&&`: the step-0 baseline ran as
`MODEL_ID=$(grep -o '"model":"[^"]*"' <transcript> | …) && case "$MODEL_ID" in
claude-opus-5*) echo "MODEL OK: $MODEL_ID";; *) exit 1;; esac && cd … && git status
--porcelain && git diff --stat && git rev-parse --short HEAD`, one command, `&&` throughout.
Printed: `MODEL OK: claude-opus-5`.

## Step-0 baseline

Banked before this lane's first byte, in the gated command above:

```
$ git status --porcelain
(empty)
$ git diff --stat
(empty)
$ git rev-parse --short HEAD
46ab4124
```

The tree was CLEAN at first read — no foreign dirt to attribute. Register receipt, also read
before the first byte:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Census

| file | + | − | note |
| --- | --- | --- | --- |
| `src/components/chip/chipVariants.ts` | 7 | 1 | B-1: `SIZE.xs`, `ICON_SIZE.xs` (the const reflowed to one key per line) |
| `src/components/chip/README.md` | 4 | 1 | B-1: the size axis reads `xs \| sm \| md \| lg` + the coarse-pointer caveat |
| `tests/components/chip.contract.test.ts` | 16 | 0 | B-1 born-RED: ONE new `it()` beside the `:127` icon case |
| `docs/tranches/BJ/addenda/2026-07-24-refinement/DESIGN-NOW.md` | 27 | 0 | B-1: three dated brackets (§3.5 union, §3.6 pads, X-G4) — additions only, no committed line rewritten |
| `src/components/slider/Slider.vue` | 10 | 5 | A-10: the drag-hold docblock |
| `src/components/dock/composables/useDockHold.ts` | 16 | 12 | A-10: the "Why NATIVE host listeners" paragraph |
| `tests/components/ui/slider/dock-hold-contract.test.ts` | 9 | 8 | A-10: the "failure mode this guards" paragraph |
| `tests/components/ui/slider/attrs-pointerdown-channel.test.ts` | new (101) | — | A-10 born-RED + the durable channel lock |
| `src/composables/color/index.ts` | 12 | 6 | CUT-4/5 docs: the two docblocks that named a dead prop |
| `src/composables/dom/useResolveTokenColor.ts` | 1 | 1 | CUT-4/5 docs: the `@returns` line naming `ColorResolver` |
| `demo/chassis/showcase/ShowcaseFrame.vue` | 1 | 1 | A-6: the bare `--type-mono-caption` read |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/E2/RECORD.md` | new | — | this record |

Nothing else. No published byte moves except through `src/` — `package.json` carries
`files: ["dist"]`, and the two docs, the demo file and the three test files ship nothing.
`dist-demo/` was rebuilt once (below); it is a gitignored artifact and not in the census.

## Act ledger

### B-1 · Chip `xs` rung + the W-CHIP spec amendment — LIVE → CURE-NOW. DONE.

1. `chipVariants.ts`: `SIZE` gains `xs: "gap-0.5 px-1 py-0.5 text-micro"` and `ICON_SIZE`
   gains `xs: "size-6"`. Both, in one edit, because `chipVariants` indexes
   `ICON_SIZE[size]` at `:35` with `size: keyof typeof SIZE` under `strict` — widening one
   without the other is a tsc error, not a style choice. `ICON_SIZE` reflowed from a
   one-liner to one key per line; no value changed.
2. The union WIDENS and nothing moves: `md` is still `chipVariants`'s bare default
   (`options.size ?? "md"`), still `Chip.vue`'s, and no rung's string is touched. Nothing
   removed, nothing renamed, no export/class/token/subpath moved. Non-breaking by the
   vocabulary's own test.
3. `README.md`: `size: sm | md | lg` → `size: xs | sm | md | lg`, plus the two facts a
   consumer needs to use it: what `xs` is (4/2px pads, fixed 11px roman) and the caveat the
   O-20 letter carries — `@media (pointer: coarse)` gives every INTERACTIVE chip a 44px min
   box whatever the rung, so `xs` is the static pill's rung.
4. `DESIGN-NOW.md`, three dated brackets, each placed against the line it contradicts and
   each verified by line number first:
   - §3.5 at `:445` (`size?: "sm" | "md" | "lg"`, inside the `ts` fence) → bracket after the
     closing fence, before the `mode` **dies** paragraph;
   - §3.6 at `:454` (pads 8/12/20) → bracket after that section's last sentence;
   - §5's X-G4 row at `:467` (`pad-inline ∈ {8,12,20}`) → bracket after the gate table,
     before the acceptance-rows line.
   Each states the ground (O-20 B-1), the admitted value (`xs` / 4), that 4 is series-legal
   on the spec's own terms (§ADJ names the space series 4·8·12·20 — only the chip's admitted
   subset excluded it), and why it lands ahead of row #43: this rung is additive, #43's cut
   is breaking (`mode` dies, `ChipMode` is removed), so coupling them holds a three-line
   addition behind a major for nothing. The X-G4 bracket also records that no seat moves —
   X-G4 is a born-RED row against a standing seat, the budget stays 60, and its
   RED-at-HEAD column ("italic; 10/14") is still true of sm/md. Committed prose is
   bracketed, never rewritten: the diff is `27 0`.

### A-10 · the three false DROPPED docblocks + the durable mount test — LIVE → CURE-NOW. DONE.

The render was right and the prose was false, at every pin measured. The three sites now
say what the bytes say:

1. `src/components/slider/Slider.vue:59-64` → the hold is host-native NOT because a binding
   would be lost: `<SliderRoot>` sets `inheritAttrs: false` and then re-merges `$attrs` by
   hand through `mergeProps` (`SliderRoot.js:149`), which CHAINS `onX` handlers, so a
   consumer `@pointerdown` lands — LAST, after reka's own slide start, which is the one real
   limit (it cannot `preventDefault` ahead of the slide). The three true reasons are named:
   one acquire for `pointerdown` AND `touchstart`, a window-scoped release surviving
   `setPointerCapture` retarget, capture-independent instant-on.
2. `src/components/dock/composables/useDockHold.ts` — the "Why NATIVE host listeners"
   paragraph, same truth, plus the pointer to the standing arm. The stray unbalanced `)` at
   the old paragraph's end went with it.
3. `tests/components/ui/slider/dock-hold-contract.test.ts` — the "failure mode this guards"
   paragraph. "shadows the merged handler" was separately false (`mergeProps` chains) and is
   gone. The gate's real subject is named instead: the ACQUIRE — one owner, host element,
   pointer and touch alike, window-scoped release. The gate's assertions are untouched; it
   passes unchanged.
4. `tests/components/ui/slider/attrs-pointerdown-channel.test.ts` — the new file, two arms:
   the prose arm (no file among the three may re-assert the drop or the shadow) and the
   durable channel arm (mount the library's `<Slider>` with an `onPointerdown` fallthrough
   listener, dispatch a real `pointerdown` on the resolved `[data-slot="slider"]`, assert it
   ran). The second is the regression the docblocks were guessing at: it goes RED the day a
   reka major really does sever the channel.

**Placement, stated as the fence requires:** the new test went BESIDE the existing slider
tests, at `tests/components/ui/slider/`, not in a new `tests/components/slider/`. Grounds:
`tests/components/slider/` does not exist, the slider's mount tests live at
`tests/components/ui/slider/` (`dock-hold-contract.test.ts`, `Slider.marks.test.ts`), and
this file is the other half of that same story — it reads the dock-hold test's own comment as
one of its three subjects. Minting a third slider test location for one file would scatter
what the fence's own alternative keeps together.

### CUT-4/5 doc half · the `colorResolver` docblock lies — CURE-NOW. DONE.

Re-measured at this end on the published 9.0.0 dist before writing: `grep -rn colorResolver
<dist900>/components/fourier-field/` → zero hits; the shipped props are
`config`/`spectrum`/`getPalette`/`color`/`seed`/`freeze`/`interactive`
(`FourierField.vue.d.ts:20-37`). The prop died at `4a86570b` (2026-08-12, "land BK #53
GF-FOURIER"), whose diff shows `- colorResolver?: ColorResolver;`. The docblocks shipped the
contradiction in the same tarball (`dist/composables/color/index.d.ts:11`, `:66-67`).

1. `src/composables/color/index.ts:36-43` (the `ColorResolver` docblock) — the false clause
   ("the `<FourierField>` ambient background takes it as an optional `colorResolver` prop")
   replaced by the measured truth: no shipped component takes one; the prop was removed at
   `4a86570b`; `color` is the ambient seam; so the type has no in-library caller.
2. `src/composables/color/index.ts:149-153` (the `defaultBlobColorResolver` docblock) — same
   correction, plus what it actually is: a one-line composition of two exports on this same
   subpath.
3. Both carry the one-line statement the ledger asks for: the type and the const stay
   published until the 10.0.0 cut, which is the owner's. Neither is removed here.
4. `src/composables/dom/useResolveTokenColor.ts:46` — `@returns the concrete color string the
   ColorResolver can parse` → `… a (css) => rgb resolver can parse`. This closes the
   verifier's `missed` row: the old line ships at
   `dist/composables/dom/useResolveTokenColor.d.ts:17`, so a 10.0.0 strike of the type would
   otherwise have left a published `.d.ts` naming a type the tarball no longer declares.
   The file's LEADING line-comment block (`:1-27`) also says `ColorResolver` four times, but
   there it means VALUE.JS's injected renderer resolver, a different thing on the other side
   of the seam — true as written, out of fence, untouched.

### A-6 demo · the bare `--type-mono-caption` read — DEAD → KILL (demo half). DONE.

`demo/chassis/showcase/ShowcaseFrame.vue:87` `font-size: var(--type-mono-caption)` →
`var(--type-micro)`. The token is defined nowhere and read nowhere else in this repo
(`grep -rn -- "--type-mono-caption" src/ demo/ tests/` → empty after the edit), so the bare
read was invalid at computed-value time and that caption silently inherited its parent size.
`--type-micro` is real: `src/styles/typography/scale.css:86`, `0.6875rem`, fixed. Demo only —
unpublished.

## Born-RED proof

### B-1, leg 1 — runtime

Test written FIRST, run at `46ab4124` with `chipVariants.ts` untouched:

```
$ npx vitest run tests/components/chip.contract.test.ts
 ❯ tests/components/chip.contract.test.ts (11 tests | 1 failed) 28ms
     × carries an xs rung on both the pad and the icon ladder 2ms

 FAIL  tests/components/chip.contract.test.ts > Chip semantic modes > carries an xs rung on both the pad and the icon ladder
AssertionError: expected 'glass-chip glass-capsule accent-tone …' to contain 'text-micro'

Expected: "text-micro"
Received: "glass-chip glass-capsule accent-tone inline-flex items-center justify-center font-sans text-muted-foreground select-none"

 Test Files  1 failed (1)
      Tests  1 failed | 10 passed (11)
```

The predicted shape exactly: `SIZE["xs"]` is `undefined`, `joinClassValues` drops falsy
values (`src/components/_shared/class-names.ts`, `if (!value) return`), so the call returns
BASE alone and the assertion FAILS rather than throwing.

### B-1, leg 2 — the type plane

Same tree, before the fix:

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
tests/components/chip.contract.test.ts(135,37): error TS2322: Type '"xs"' is not assignable to type '"sm" | "md" | "lg" | null | undefined'.
tests/components/chip.contract.test.ts(141,46): error TS2322: Type '"xs"' is not assignable to type '"sm" | "md" | "lg" | null | undefined'.
```

Assignability, as the verifier corrected the sketch (`tsconfig.test.json` sets
`noImplicitAny: false`, so it is not an index error).

### B-1 — GREEN after

```
$ npx vitest run tests/components/chip.contract.test.ts
 Test Files  1 passed (1)
      Tests  11 passed (11)
```

### A-10 — RED before, on three files

New test written FIRST, run with all three docblocks still as committed:

```
$ npx vitest run tests/components/ui/slider/attrs-pointerdown-channel.test.ts
 ❯ tests/components/ui/slider/attrs-pointerdown-channel.test.ts (2 tests | 1 failed) 22ms
     × is claimed dead by no file in the tree 5ms

 FAIL  … > the $attrs.onPointerdown channel through reka's SliderRoot > is claimed dead by no file in the tree
AssertionError: no source may re-assert that the fallthrough listener is dropped or shadowed: expected [ …(3) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "src/components/slider/Slider.vue",
+   "src/components/dock/composables/useDockHold.ts",
+   "tests/components/ui/slider/dock-hold-contract.test.ts",
+ ]

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
```

Three, not two — the third site is the one the ledger's verifier caught, and the arm's
pattern (`/\bDROPPED\b|\bshadows the merged\b/`) takes both spellings so it cannot pass over
it. The channel arm passed in the same run, which is the point: the claim was false when it
was written.

### A-10 — GREEN after

```
$ npx vitest run tests/components/ui/slider/
 Test Files  3 passed (3)
      Tests  14 passed (14)
```

### CUT-4/5 docs and A-6 — no born-RED, by fence

Both are prose/demo edits and the fence grants this lane no test file that could hold an
assertion about either (`tests/` in fence: the chip contract file, the dock-hold comment, and
the one slider mount test). Folding a `./color` docblock assertion or a demo token assertion
into the slider's channel test would be an overfit arm in the wrong file. Both are instead
proven by measurement quoted above — the dist grep and the `4a86570b` diff for CUT-4/5, the
post-edit repo-wide grep for A-6 — and stated as residue below.

## Verify

All four run at this lane's end, exit codes read directly (never a pipe's):

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSC_MAIN_EXIT=0        (no output)

$ npx vue-tsc --noEmit -p tsconfig.test.json
TSC_TEST_EXIT=0        (no output)

$ npx vitest run tests/components/chip.contract.test.ts tests/components/ui/slider/ tests/components/slider.contract.test.ts
 Test Files  5 passed (5)
      Tests  32 passed (32)
LANE_TESTS_EXIT=0
```

Full battery, first run:

```
$ npx vitest run
 Test Files  2 failed | 226 passed (228)
      Tests  2 failed | 2196 passed | 10 expected fail (2208)
BATTERY_EXIT=1
```

Both REDs attributed, and BOTH are now gone:

1. `tests/gates/boot-graph.test.ts > the dist-demo it measures is NEWER than every source it
   is built from` — "built 2026-09-17T22:37:08.315Z, newest source 2026-09-17T23:03:28.618Z".
   `newestSourceMtime()` (`:543-555`) walks `demo/` and `src/` only. **Part of this is
   mine and is not dodged:** the first `src/` byte in this batch to postdate the 18:37:08
   `dist-demo` build was `src/components/chip/chipVariants.ts` at 18:59:53, this lane's. By
   the time the battery measured, the newest source was `src/styles/tokens/light-dark.css`
   at 19:03:28 — Lane C2's — with Lane D's `src/composables/dark/darkModeSyncScript.ts`
   between. It is a wave-level freshness gate, not a content defect: it goes RED on any
   `src/`-or-`demo/` edit until someone rebuilds. Discharged rather than attributed away —
   lock taken at `mkdir …/scratchpad/build.lock` (acquired first try, 19:05:16),
   `npm run demo:dist:build` → `✓ built in 1.33s`, `DEMO_BUILD_EXIT=0`, lock released
   19:05:21. Held 5 seconds; never left held.
2. `tests/composables/dark/darkModeSyncScript.test.ts > G-NO-FLASH · glass-ui's OWN demo
   stamps at parse time` — `TypeError: The URL must be of scheme file` at `:460`, inside
   `loadConfigFromFile(…, fileURLToPath(new URL("../../../vite.config.ts", import.meta.url)))`.
   That file and `vite.config.ts` are **Lane D's** fence (CUT-6..8), both dirty and both
   mid-edit at measure time (mtimes 19:03:43 / 19:03:59). Not this lane's, not touched by
   it. Lane D closed it between the two runs.

Full battery, second run — whole green:

```
$ npx vitest run
 Test Files  228 passed (228)
      Tests  2198 passed | 10 expected fail (2208)
BATTERY_EXIT=0
```

Gate receipt, verbatim and in full, `GATE_EXIT=0`:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
```

Identical to the baseline receipt: `seats:60 … violations:0`, `rosterSha256:282d05cf`
unchanged. Nothing was minted — no `G-` id, no seat, no roster row. Both new test artifacts
are plain vitest: one `it()` on an existing file, one new file that names no gate.

## Fence

Every file written is inside the lane's fence, and nothing outside it was created, modified
or deleted. No sibling repo was read for a write or written. No `git add`, `commit`, `stash`,
`checkout` or `reset` ran at any point; the only git commands were `status`, `diff`,
`rev-parse`, `log`, `show` and `grep`, all read-only. The published 9.0.0 dist under
`scratchpad/publish-900/` was read, never written. `dist-demo/` was rebuilt once under the
shared lock, which was released immediately; `dist/` was not built.

Four fence LOCATORS were overrun by a handful of lines, stated rather than hidden, each
inside a file the fence grants and inside the same docblock it names:

1. `useDockHold.ts` — the fence reads "the docblock at `:19-30` only". The false claim's own
   sentence does not end at `:30`: it runs to `:34` ("A native `addEventListener` on the
   RESOLVED host element is immune… would re-introduce the same forwarding fragility)").
   Stopping at `:30` would have left "is immune" with no antecedent and the fragility
   corollary of a claim just withdrawn still standing — an incoherent docblock carrying half
   a falsehood. The whole paragraph (`:23-34`) was rewritten. `:6-22` and `:36` onward are
   untouched.
2. `dock-hold-contract.test.ts` — the fence reads "its `:11-15` comment only". Same shape:
   the counterfactual chain runs to `:18` ("`keepOpen()` never fires… turning this gate
   GREEN"). The paragraph `:11-18` was rewritten; the file's other prose and every assertion
   in it are untouched (its diff is `9 8`, all inside that paragraph).
3. `src/composables/color/index.ts`, first docblock — the fence reads `:38-41`. The false
   sentence's tail (`without dependency injection.`) sits at HEAD `:42`, so `:39-42` were
   rewritten and `:38` (the opening `/**`) was left alone. Inside the granted file and inside
   the named docblock.
4. `src/composables/color/index.ts`, second docblock — the fence reads `:152`. The false
   sentence opens at HEAD `:151` (``<FourierField>` can pass it as its`), so `:151-152` were
   rewritten. Inside the granted file and inside the named docblock.

## Residue

Owed, stated, not hidden:

1. **MIGRATION rows are Lane R's, and this lane wrote none.** The `<FourierField
   colorResolver>` prop removal still has zero `MIGRATION.md` rows (`grep -ci colorresolver
   MIGRATION.md` → 0 at the disposition pass), as do `ColorResolver`, `ColorHarmony` and
   `DeriveBlobPaletteOptions` in the `/color` published-type census, and `MIGRATION:1020`
   still lists `FourierFieldProps` as live on `/fourier-field` though it has zero hits in
   the 9.0.0 dist. All of that is R's fence and R runs last.
2. **The 10.0.0 cut is the owner's, and nothing was cut here.** `ColorResolver` and
   `defaultBlobColorResolver` are still exported on `./color`; both docblocks now say so and
   say why. slides binds `defaultBlobColorResolver` to a prop that no longer exists at 9.0.0
   (Slide01.vue:11,35 · Slide05.vue:24,43) — the consumer's own edit, in its own tranche, per
   the consumer-updates ruling. No sibling was written.
3. **A-6's consumer half is not this lane's.** All three value.js readers still name
   `--type-mono-caption` (ApiOfflineChip.vue:47, DockStatusLamp.vue:54,
   ComponentSliders.vue:310), all fallback-guarded, zero paint delta. The letter's "consumer
   cure landed" is stale; the bump is theirs.
4. **`xs` has no paint witness.** It is proven on the class string and on the type plane, not
   on pixels. No browser ran in this lane (the batch's singleton browser seat is C2's), and
   no story mounts an `xs` chip today. If the wave wants the rung witnessed, that is a π row
   on row #43's ledger, not a gate this lane may mint.
5. **Row #43 W-CHIP stays OPEN and everything else in its spec is still owed** — the `mode`
   death, the `ChipMode` removal, the sm/md/lg re-ladder to −2/−1/0, the italic kill on the
   other three rungs. This lane moved exactly one additive rung ahead of it and bracketed the
   spec at all three places it contradicts.
6. **`dist-demo/` freshness will re-RED** the moment another lane writes `src/` or `demo/`
   after 19:05. One `npm run demo:dist:build` under the shared lock at batch close clears it;
   it is a build-freshness gate, not a content gate.

## CURE ROUND 1 — 2026-09-17

Model: `claude-opus-5`. Transcript:
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_4cc3afc1-169/agent-a29beb1a82271b393.jsonl`.
Adjudicator `claude-fable-5-1` read the lane at HEAD 46ab4124 and sustained every
substantive act; what failed was citation accuracy. Four prose cures, no code, no test
logic, no gate touched.

1. `tests/components/ui/slider/attrs-pointerdown-channel.test.ts:11` — the shipped-falsehood
   locator `dist/components/dock/composables/useDockHold.d.ts:25` → `:24`. Measured on the
   published 9.0.0 dist: `grep -n DROPPED
   <dist900>/components/dock/composables/useDockHold.d.ts` returns `24: * `@pointerdown`
   arrives as `$attrs.onPointerdown` and is DROPPED across that`. `:25` is that sentence's
   continuation line. The wrong number was inherited from `LEDGER.md:245`, which is outside
   this lane's fence and is left for its owner.
2. `RECORD.md:133` — `dist/composables/color/index.d.ts:40-41` → `:11`. The false
   `<FourierField> … optional colorResolver prop` clause sits wholly on `:11` of the shipped
   `.d.ts`; `:38-42` there is the invalid-anchor-throws paragraph, a different subject. The
   `:66-67` half of the citation was correct and stands.
3. `RECORD.md:332-345` — "Two fence LOCATORS were overrun" → "Four", with items 3 and 4
   added: `src/composables/color/index.ts` first docblock (fence `:38-41`, the false
   sentence's tail `without dependency injection.` at HEAD `:42`, so `:39-42` rewritten and
   `:38` left alone) and second docblock (fence `:152`, the false sentence opening at HEAD
   `:151`, so `:151-152` rewritten). Both inside the granted file and the named docblock;
   `git diff -U0 src/composables/color/index.ts` shows exactly those two hunks.
4. `src/components/dock/composables/useDockHold.ts:31-32` — "holds that as a standing arm."
   → "holds the arrival as a standing arm; the order was measured at the seat and is not
   asserted there." The sentence before it states the merged order, so `that` claimed the
   test asserts the order. It does not: the channel arm asserts
   `toHaveBeenCalledTimes(1)` and nothing about ordering. Same defect class the lane was
   curing, caught by the adjudicator. The prose arm's regex is
   `\bDROPPED\b|\bshadows the merged\b` and the new wording does not match it.

### Verify — cure round 1, unpiped exit codes

```
npx vue-tsc --noEmit -p tsconfig.json         → exit 0
npx vue-tsc --noEmit -p tsconfig.test.json    → exit 0
npx vitest run tests/components/ui/slider/    → exit 0 · Test Files  3 passed (3) · Tests  14 passed (14)
npx vitest run tests/components/chip.contract.test.ts → exit 0 · Test Files  1 passed (1) · Tests  11 passed (11)
npx vitest run (full battery)                 → exit 0 · Test Files  228 passed (228) · Tests  2199 passed | 10 expected fail (2209)
node scripts/gate-register.mjs                → exit 0
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Two REDs appeared on the way and both were cleared, stated rather than hidden:

- `tests/gates/boot-graph.test.ts` — `dist-demo/index.html is STALE (built
  2026-09-17T23:05:21.508Z, newest source 2026-09-17T23:35:37.924Z)`. Residue item 6 called
  this exactly. Jointly caused: this cure's `useDockHold.ts` docblock write (19:35:37) and
  another lane's `src/styles/tokens/{light-dark,color-radius}.css` writes (19:35:12,
  19:35:16). Cleared by one `npm run demo:dist:build` under the shared lock
  (`mkdir` acquired first attempt, `rmdir` released immediately, exit 0). It is a
  build-freshness gate, not a content gate.
- `tests/demo/router-field-ownership.test.ts` — `Test timed out in 5000ms` on the run right
  after the demo build. A load flake, not a defect: the file alone re-ran exit 0
  (`Test Files 1 passed (1)` · `Tests 3 passed (3)`) and the next full battery was green.
  Concurrent lanes were building and testing on the same machine.

The battery's total moved from 2208 at adjudication to 2209 here (2199 passed vs 2198): one
test was added by a concurrent lane between the two runs. Not this lane's — E2 added no test
in this round.

### Fence — cure round 1

Three files written, all inside the fence:
`tests/components/ui/slider/attrs-pointerdown-channel.test.ts` (1 comment line),
`src/components/dock/composables/useDockHold.ts` (2 docblock lines, still inside the
`:19-30` docblock and the overrun already declared at item 1 of the Fence section), and this
RECORD. `dist-demo/` was rebuilt under the shared lock and the lock released; `dist/` was
not built. No `git add`, `commit`, `stash`, `checkout` or `reset`. No sibling repo written.
Nothing minted: gates stay at 60, `violations:0`, roster sha unchanged at `282d05cf`.

### Residue — cure round 1

1. `LEDGER.md:245` still carries the `useDockHold.d.ts:25` locator this round corrected in
   E2's own files. The ledger is outside this fence; its owner should take the same `:24`.
2. Residue item 6 above stands unchanged: `dist-demo/` freshness will re-RED the moment any
   lane writes `src/` or `demo/` after 19:37. One locked `npm run demo:dist:build` at batch
   close clears it.
