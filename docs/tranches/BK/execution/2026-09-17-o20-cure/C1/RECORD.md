# Lane C1 — A-9 · B-6 · A-11d

**Date** 2026-09-17 · **seat** implement · **model** `claude-opus-5` (read from this
seat's own transcript at
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_2bb35ea4-0fb/agent-ab7ad9b538b15ed8f.jsonl`,
found by grepping for this prompt's own phrasing; the assertion gated every command in
the chain with `&&`) · **spec of record**
`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` §A-9, §B-6, §A-11d +
the three cross-cutting facts at its head + the lane table at its tail · **seat evidence**
`investigate__tooltip-slider` / `verify__tooltip-slider`,
`investigate__exports-tabs-timeline` / `verify__exports-tabs-timeline`,
`investigate__button-family` / `verify__button-family`.

## Step-0 baseline

Banked before a byte was written. `git rev-parse HEAD` → `2984e3778a1bbe866b5e3985719007471fcedbd3`.

```
$ git status --porcelain
 M docs/tranches/BK/EXECUTION-PROGRESS.md
$ git diff --stat
 docs/tranches/BK/EXECUTION-PROGRESS.md | 166 ++++++++++++++++++++++++++++++++-
 1 file changed, 162 insertions(+), 4 deletions(-)
```

That one modified file is not this lane's and was left untouched.

## Census

| file | + | − | act |
| --- | --- | --- | --- |
| `src/styles/glass/overlay-plate.css` | 18 | 1 | A-9 — the hint arm's block ceiling (+ the comment that states its two costs) |
| `src/components/slider/styles.css` | 21 | 0 | B-6 — the three cursor rules + their comment |
| `src/components/configurator/ConfiguratorRow.vue` | 1 | 1 | A-11d — `hover:bg-foreground/5 hover:text-foreground` struck from the reset button's class string |
| `src/components/configurator/ConfiguratorLayer.vue` | 1 | 1 | A-11d — `hover:bg-foreground/5` struck from the layer trigger's class string |
| `src/components/configurator/styles.css` | 41 | 0 | A-11d — both hovers authored bare inside `@media (hover: hover)` |
| `tests/styles/emitted-utility-vars.test.ts` | 60 | 0 | A-11d — ONE new arm on the existing seated describe |
| `tests/styles/overlay-plate-available-height.test.ts` | 79 | new | A-9 born-RED |
| `tests/styles/slider-cursor-affordance.test.ts` | 87 | new | B-6 born-RED |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/C1/RECORD.md` | this file | new | the record |

Nine files, all inside the fence. Build outputs (`dist/`, `dist-demo/`) were regenerated
under the shared lock; both are gitignored (`.gitignore:2`, `:65`) and are not repo edits.

## Act ledger

### A-9 · the hint role gets a block ceiling — LANDED

`src/styles/glass/overlay-plate.css`, the `[data-reveal="tooltip"]` arm, two declarations
added to the existing block:

```css
max-block-size: min(
    var(--overlay-max-block),
    var(--reka-popper-available-height, var(--overlay-max-block))
);
overflow-y: auto;
```

Verbatim the menu arm's recipe at `:75-81`, which is the idiom the ledger named. The
channel is `--reka-popper-available-height` and NOT the
`--reka-tooltip-content-available-height` alias the inbound letter asked for: reka sets
the popper var on the floating wrapper, so one declaration inherits to every role, while
the alias is minted on the inner node and would need one spelling per role — a second
seam in the register that exists to have none. Purely additive: nothing removed, nothing
renamed, no token minted (`--overlay-max-block` ships already, `min(24rem,60dvh)`,
confirmed in the rebuilt dist).

Both honest costs are written into the file's own comment rather than left for the
letter alone: a hint tall enough to hit the cap becomes a focusable scroll container
(CSS-Overflow-3), and the popper measure is placement-derived, so a short hint pinned
against a viewport edge is clamped too (the verifier's undisclosed-collateral note,
carried). Capping without the scroller was rejected as the masking fallback it is — the
base rung declares `overflow: hidden`, so a bare cap would swallow the tail silently.

Emitted bytes after the build, `dist/styles/glass/overlay-plate.css`:

```
.glass-overlay-plate[data-reveal="tooltip"]{--radius-ctx: var(--radius-panel);
--radius-inset: var(--overlay-pad-hint);padding: var(--overlay-pad-hint);
font-size: var(--tooltip-text);max-block-size: min( var(--overlay-max-block),
var(--reka-popper-available-height,var(--overlay-max-block)) );overflow-y: auto;}
```

### B-6 · the slider's drag affordance — LANDED

`src/components/slider/styles.css`, three rules with one comment, placed as a contiguous
block immediately after the `.glass-slider` root rule:

```css
.glass-slider { cursor: grab; }
.glass-slider[data-held],
.glass-slider:active { cursor: grabbing; }
.glass-slider[data-disabled] { cursor: not-allowed; }
```

Placement note, stated rather than passed over: the ledger says "beside the existing
`[data-held]`/`[data-disabled]` recipes" (`:165`/`:200`). They are authored as one block
at the top instead, because the resting affordance belongs with the root rule and
splitting a three-rule affordance across two regions of a 481-line file is how the next
reader loses one of them. The hooks the ledger pointed at are the ones the rules read,
and nothing about the cascade changes: all three are `(0,1,0)`/`(0,2,0)` in an unlayered
file, `[data-disabled]` is authored last so it takes a disabled-and-held control, and
the file's own header keeps it outside every `@layer` on purpose.

This is an upgrade, not a restoration — the recipe the consumer lost declared
`cursor: pointer` on the retired `.glass-track`. Pointer says click; a scrubber is
pulled. The idiom is the house one (`sheet/styles.css` :101/:257,
`tabs/styles/drag.css` :22/:27), taken verbatim.

Emitted, `dist/components/slider/styles.css`:

```
.glass-slider{cursor: grab;} · .glass-slider[data-held],.glass-slider:active{cursor: grabbing;}
· .glass-slider[data-disabled]{cursor: not-allowed;}
```

### A-11d · the synthesized foreground-on-foreground fallback — LANDED

Struck from the two class strings:

- `ConfiguratorRow.vue:156` — `hover:bg-foreground/5 hover:text-foreground` (the ink was
  only there to rescue the fill; it goes with it).
- `ConfiguratorLayer.vue:119` — `hover:bg-foreground/5`.

Authored in `src/components/configurator/styles.css`, beside the
`.configurator-layer-trigger` padding rule:

```css
@media (hover: hover) {
    [data-slot="configurator-reset"]:hover {
        background: color-mix(in oklab, var(--foreground) calc(var(--fill-hover) * 100%), transparent);
        color: var(--foreground);
    }
    .configurator-layer-trigger:hover {
        background: color-mix(in oklab, var(--foreground) calc(var(--fill-hover) * 100%), transparent);
    }
}
```

`@media (hover: hover)` is KEPT, per the verifier's correction: Tailwind emitted the
utility inside it, and dropping it would newly apply the fill on coarse pointers, where
it sticks after a tap — a paint change, which would make this the CURE-NEXT-MAJOR it
claims not to be.

**Modern paint is byte-identical — how it was verified, four ways:**

1. `--fill-hover` is `0.05` and nothing else declares it. Grep over the rebuilt dist:
   `--fill-hover: 0.05`, one value, one site (`src/styles/tokens/color-radius.css:149`,
   a plain `:root`). `calc(0.05 * 100%)` is `5%` — the exact percentage the `/5` modifier
   encoded. Same function, same space (`oklab`), same endpoints
   (`var(--foreground)` → `transparent`).
2. The shorthand is inert here. A full rule-level census of the shipped CSS for every
   selector matching `[data-slot="configurator-reset"]` or `.configurator-layer-trigger`
   returns exactly three rules: the trigger's `padding-inline`, and the two new hovers.
   No rest-state `background`, `background-image`, `background-size` or `background-position`
   exists on either control anywhere in the package, so `background` resets nothing that
   was painted. (The one `background-image` in that sheet is
   `.configurator-preset-well.is-loading`, a different element.)
3. The ink is unchanged: `.hover\:text-foreground:hover` emitted `color: var(--foreground)`;
   the replacement declares `color: var(--foreground)` on the same hover of the same
   element.
4. The transition still fires: `@utility transition-control`
   (`src/styles/utilities/btn.css:62`) lists `background-color` in its
   `transition-property`, and the shorthand sets `background-color`.

**Legacy engines change on purpose, and that is the whole item.** The old pair painted
`background-color: var(--foreground)` outside the `@supports` guard — the token at full
strength under ink that also resolves to `--foreground`, 1.00:1. It was real rather than
theoretical because `tokens/light-dark.css` guards its own overrides behind
`@supports (color: light-dark(…))`, so a pre-2023 engine really does keep the dark ink.
A bare mix has no synthesized arm behind it: the engine that cannot parse it DROPS the
declaration and keeps the plate. No masking fallback.

**Cascade, per the verifier's correction:** `styles/index.css` imports
`components.css` with `layer(components)`, so the emitted utility was LAYERED on every
consumer path; `configurator/styles.css` is unlayered and wins by layer, with specificity
never entering. The investigator's import-order reasoning was wrong and is not repeated
in the file's comment.

**Emitted result.** `dist/styles/components.css` after the rebuild: `bg-foreground` → 0
occurrences, `background-color:var(--foreground)` → 0, `hover\:text-foreground` → 0. The
two utilities left the sheet entirely, which is what the tally at the ledger's end
predicted. The emitter scans `dist/*.js` + `dist/glass-ui.css` only
(`vite.utility-emit.ts:90-95`), never `demo/`, so `demo/stories/feedback/toast.vue:81`'s
own `hover:bg-foreground/5` does not keep the utility alive in the library sheet —
checked, not assumed.

### Cure round 1 · three amendments — LANDED 2026-09-17

**1. `postcss.AnyNode` on the guard walk.**
`tests/styles/emitted-utility-vars.test.ts:206`, `let node = declaration.parent;` →
`let node: postcss.AnyNode | undefined = declaration.parent;`. Lines 208-218 unchanged: the
`node.type === "atrule"` discriminant narrows `AnyNode` to `AtRule`, so `node.name` and
`node.params` typecheck as written. The inferred type was `ContainerWithChildren |
undefined` and `node = node.parent` widened it to include `Document_`. RED before:

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
EXIT=2
tests/styles/emitted-utility-vars.test.ts(217,17): error TS2322: Type 'Document_ | ContainerWithChildren | undefined' is not assignable to type 'ContainerWithChildren | undefined'.
```

GREEN after: `npx vue-tsc --noEmit -p tsconfig.test.json` → `EXIT=0`, and
`npm run typecheck` (both projects) → `TYPECHECK-EXIT=0`.

**2. The guard no longer accepts a NEGATED `@supports`.** Same file, `:212`:
`node.params.includes("color-mix")` → `node.params.includes("color-mix") &&
!/\bnot\b/.test(node.params)`. An `@supports not (color: color-mix(…))` block is the exact
masking shape the arm's own comment forbids — it is the LEGACY branch, so a bare
`var(--foreground)` inside it is the defect, not its guard — and the old predicate counted
it as protection. Nothing of that form is in the current dist, but the library already
ships four `@supports not (…)` blocks of its own (`src/styles/tokens/shadow.css:154`,
`src/styles/utilities/base.css:110`, `src/styles/utilities/metal.css:176`,
`src/styles/glass/overlay-plate.css:405`), so the shape is live house idiom.

Proven by mutation on a scratch copy of the published sheet
(`scratchpad/c1-mut/dist/`, the real arm run with that directory as cwd). With
`@supports not (color: color-mix(in lab, red, red)) { .zzz:hover { background-color:
var(--foreground) } }` appended — RED:

```
 FAIL  tests/styles/emitted-utility-vars.test.ts > emitted component utilities > synthesizes no background fallback that paints bare var(--foreground)
AssertionError: expected [ Array(1) ] to deeply equal []
+   ".zzz:hover { background-color: var(--foreground) }",
 Test Files  1 failed (1)
```

The same mutated bytes under the OLD predicate report zero offenders — the hole, measured
side by side:

```
OLD predicate: []
TIGHTENED predicate: [".zzz:hover { background-color: var(--foreground) }"]
```

Injection removed, same scratch dist, same arm — GREEN, so the ten unnegated
`@supports (color:color-mix(in lab,red,red))` blocks in `dist/styles/components.css` still
count as guards:

```
 Test Files  1 passed (1)
      Tests  1 passed | 3 skipped (4)
REAL-EXIT=0
```

**3. The cursor census reads 47, not 45.** `src/components/slider/styles.css:37`
(`the whole published sheet carried 45` → `47`) and
`tests/styles/slider-cursor-affordance.test.ts:4` (`found 45 cursor` → `found 47`). Both
are comments; the code is untouched. 45 was the seats' rule count and the ledger had
already superseded it (`LEDGER.md:503-504`). Re-measured here by postcss over the published
9.0.0 dist at `scratchpad/publish-900/dist`:

```
css files: 124 cursor decls: 47 cursor-bearing rules: 47 slider hits: 0
```

47 declarations, 47 rules carrying one, and not one selector matching `.glass-slider`,
`.slider-track`, `.slider-range`, `.slider-thumb` or `.glass-loupe` — the B-6 premise
stands on the corrected number.

## Born-RED proofs

Every one measured on bytes: the test run BEFORE the change, then AFTER.

### A-9 — `tests/styles/overlay-plate-available-height.test.ts`

RED at `2984e377`, before the cure (the tooltip arm declared only radius/pad/font-size):

```
 FAIL  tests/styles/overlay-plate-available-height.test.ts > overlay plate — the hint role's block ceiling > caps the hint against reka's measured available height
AssertionError: expected null not to be null
 ❯ tests/styles/overlay-plate-available-height.test.ts:59:33

 FAIL  tests/styles/overlay-plate-available-height.test.ts > overlay plate — the hint role's block ceiling > gives the capped hint a scroller instead of clipping it
AssertionError: expected false to be true // Object.is equality
 ❯ tests/styles/overlay-plate-available-height.test.ts:71:59

 Test Files  1 failed (1)
      Tests  2 failed | 1 passed (3)
```

The third arm ("reads the same channel the menu arm reads") passes at RED by design — it
locks the two arms to ONE spelling, so it must be true before and after.

### B-6 — `tests/styles/slider-cursor-affordance.test.ts`

RED at `2984e377` (the subject file had zero `cursor` substrings):

```
 FAIL  … > slider — the drag affordance > declares the pull affordance on the slider root
 FAIL  … > slider — the drag affordance > switches to grabbing while the scrubber is held
AssertionError: expected null to be 'grabbing' // Object.is equality
 ❯ tests/styles/slider-cursor-affordance.test.ts:79:22
 FAIL  … > slider — the drag affordance > says not-allowed when the slider is disabled
AssertionError: expected null to be 'not-allowed' // Object.is equality
 ❯ tests/styles/slider-cursor-affordance.test.ts:83:72

 Test Files  1 failed (1)
      Tests  3 failed (3)
```

(The first arm's assertion body was cut by the `tail` on the capture; its FAIL header and
the `3 failed (3)` summary are the record that all three were RED.)

### A-11d — the new arm on `tests/styles/emitted-utility-vars.test.ts`

The arm reads the BUILT sheet, so the RED was taken against a dist rebuilt from
unchanged source under the shared lock (`npm run build`, exit 0), not against the
stale August artefact:

```
 FAIL  tests/styles/emitted-utility-vars.test.ts > emitted component utilities > synthesizes no background fallback that paints bare var(--foreground)
AssertionError: expected [ Array(1) ] to deeply equal []

- []
+ [
+   ".hover\\:bg-foreground\\/5:hover { background-color: var(--foreground) }",
+ ]

 ❯ tests/styles/emitted-utility-vars.test.ts:230:27

 Test Files  1 failed (1)
      Tests  1 failed | 3 passed (4)
```

RED on exactly one rule, as the ledger predicted. The arm forbids the SHAPE — any
`background`/`background-color` reading a bare `var(--foreground)` outside a color-mix
`@supports` block — not the one class, and it carries a non-vacuity assertion so a build
that emitted no backgrounds at all cannot green it for the wrong reason.

### GREEN, all three, after the cure and a second locked rebuild

```
 Test Files  3 passed (3)
      Tests  10 passed (10)
```

## Verify

**Typecheck.** `npx vue-tsc --noEmit -p tsconfig.json` → **exit 0** at 17:59 ET, taken
before any other lane had written a TypeScript file.

[2026-09-17 · adjudication] This was true of the commands and false of the surface.
Neither `tsconfig.json` (`include: ["src/", "demo/"]`) nor `tsconfig.src.json`
(`include: ["src/"]`) includes `tests/`, so no byte this lane wrote under `tests/` was
typechecked by either run. The lane's three test files are covered only by
`tsconfig.test.json` (`include: ["tests/", "src/", "tests/shims.d.ts"]`), which was RED at
lane close — exit 2 on one error, inside this lane's own hunk:

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
EXIT=2
tests/styles/emitted-utility-vars.test.ts(217,17): error TS2322: Type 'Document_ | ContainerWithChildren | undefined' is not assignable to type 'ContainerWithChildren | undefined'.
```

`npm run typecheck` is `vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json` and is
CI's first step (`.github/workflows/ci.yml:21`, `release.yml:38`), so the lane red-lighted
CI as it stood. Cured in round 1 by the `postcss.AnyNode` annotation; post-cure:

```
$ npm run typecheck
TYPECHECK-EXIT=0
```

Re-run at lane close it is **exit 2**, on one error that is not this lane's:

```
demo/stories/substrates/fourier-field.vue(270,22): error TS2304: Cannot find name 'FOURIER_STROKE_RUNGS'.
```

That file and that symbol are Lane E1's fence and Lane E1's item (CUT-2: the constant
comes off the barrel and the demo deep-imports it; the deep import has not landed yet).
Attributed to Lane E1, not fixed here — a foreign file is not this lane's to touch. This
lane's own surface is clean: `npx vue-tsc --noEmit --project tsconfig.src.json` →
**exit 0**, and none of the five source files this lane edited carries a type surface
(three CSS files, two class-string literals).

**Lane tests.** GREEN, quoted above.

**Gate receipt**, verbatim:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Ends `violations:0`, `seats:60`. Nothing minted: two plain vitest files with no G-id, one
new arm on an already-seated `describe`, `SEAT-BINDING.json` untouched.

**Full battery**, `npx vitest run`, stated as its full line:

```
 Test Files  3 failed | 224 passed (227)
      Tests  6 failed | 2166 passed | 10 expected fail (2182)
```

Every RED attributed:

| RED | owner |
| --- | --- |
| `tests/public-surface.spec.ts` × 4 — `timeline` subpath symbols `accentFor`, `HUE_OFFSET`, `HUE_STRIDE`, `HUE_STOPS` | **Lane E1** — the A-8 hue-law assertions landed ahead of the `./timeline` barrel re-export they assert |
| `tests/gates/overfit-structure.test.ts` — EXPORT-REACH arm, 3 leaks (`useOptionalDockCrossfadeContext`, `FOURIER_STROKE_RUNGS`, `FOURIER_TANGENT_EPS`) | **Lane E1** — its own GATE fix, surfacing exactly the 3 leaks the ledger's GATE item names and its CUT-1/CUT-2 items dispose |
| `tests/gates/boot-graph.test.ts` — `dist-demo` staleness | **wave-level, currently Lane E1's write** — see below |

None is this lane's.

**The boot-graph arm is a wave-level mtime ratchet and needs a closing act.** It requires
`dist-demo/index.html` to be newer than every file under `src/` and `demo/`, so ANY
source edit by ANY lane REDs it until `npm run demo:dist:build` runs. At HEAD with a
clean tree it was green (built 2026-08-29T20:06:23Z vs newest non-lane source
2026-08-29T19:32:58Z, `src/components/handmark/HandMark.vue`). This lane's own edits
broke it and this lane cured its own contribution: `npm run demo:dist:build` under the
shared lock, exit 0, rebuilt at 22:00:42Z — later than all five of this lane's files
(newest 21:58:19Z). It went RED again 3.3 seconds later on `src/composables/glass/index.ts`
(22:00:46Z) and `src/index.ts` (22:00:50Z), neither of which is this lane's. **Residue,
owed to the wave, not to C1: whichever lane lands last must re-run
`npm run demo:dist:build`.**

**Four further REDs appeared in an intermediate battery run and are NOT defects** —
`tests/styles/glass-subtlety.test.ts` (×2), `tests/demo/router-field-ownership.test.ts`,
`tests/components/menu/contract.test.ts`, `tests/components/custom/aurora/atoms.test.ts`,
plus `tests/gates/comment-ratio.test.ts` (whose own arm is named "free of lane dirt").
Each was re-run in isolation immediately after and each passed (36/36, 38/38, 14 passed
| 1 expected fail). They are torn reads: concurrent lanes were writing source files while
the battery read them. Recorded so the next reader does not chase them.

## Fence

The only files created or modified are the nine in the census, every one of them named in
the lane table's C1 row. No sibling repo was read for a write or written, at all. No
`git add`/`commit`/`stash`/`checkout`/`reset` was run — the driver commits by pathspec.
The foreign dirt present in the tree at close (`docs/tranches/BK/EXECUTION-PROGRESS.md`,
`scripts/verify-export-types.mjs`, `tests/public-surface.spec.ts` — Lane P;
`tests/gates/overfit-structure.test.ts`, `src/index.ts`, `src/composables/glass/index.ts`,
`demo/stories/substrates/fourier-field.vue` — Lane E1) was neither touched nor fixed.
`dist/` and `dist-demo/` were rebuilt three times, each under
`scratchpad/build.lock` taken with `mkdir` and released with `rmdir`; the lock was free on
every attempt and was never left held.

## Residue

1. **`dist-demo` must be rebuilt by the wave's last lander** — the boot-graph arm, above.
   Owed to the wave; this lane cleared its own share.
2. **No live-π capture.** A-9 and A-11d both change computed paint, and the paint claims
   here rest on emitted bytes plus the token value (`--fill-hover: 0.05` →
   `calc(0.05 * 100%)` = `5%`), not on a browser probe. The ledger asks for a Chrome
   computed-color witness on C-1's toned glyph (Lane C2) and asks A-11d only to state how
   byte-identity was verified, which §A-11d above does four ways. A screenshot pair on the
   built demo would be strictly stronger and is not taken here: the browser seat is a
   process-wide singleton and other lanes are live in this tree.
3. **A-9's two costs are real and shipped on purpose**, written into the stylesheet's own
   comment: a hint at the cap becomes a focusable scroll container, and a short hint
   pinned against a viewport edge is clamped by the placement-derived measure. 28
   `<TooltipContent>` sites across 5 repos inherit this on their next bump; none sets its
   own ceiling, so nothing breaks, and `value.js` `ColorNutritionLabel.vue:139`
   (`class="contents …"`) is inert under it — `display: contents` generates no principal
   box.
4. **B-6's rule placement departs from the ledger's "beside the existing recipes"** and
   the grounds are in §B-6 above. Refuse-with-grounds is overstating it; it is a placement
   choice, declared so the adjudicator can reverse it in one edit.
5. **`hover:text-foreground` has left the emitted sheet entirely** (0 occurrences after
   the rebuild). It was the row's only library composer. Nothing outside `demo/` read it
   from our sheet, and the emitter never scanned `demo/`, so no consumer loses a utility
   it was importing — but the roster manifest Lane R is building should see this as the
   scanner emission it is, not an `@utility` name, exactly as the ledger's tally says.

## CURE ROUND 1 — 2026-09-17

Adjudicator `claude-fable-5-1` ruled acts A-9, B-6 and A-11d correct on the bytes and
ordered three amendments plus a strike on this record's typecheck claim. Cure seat model
`claude-opus-5`, read from this seat's own transcript at
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_2bb35ea4-0fb/agent-a4383b23b7f7c4cc9.jsonl`
(found by grepping for this prompt's own phrasing); the assertion gated every command in
the chain with `&&`. Nothing outside the five listed cures was changed.

**Step-0 of the round.** `git rev-parse HEAD` → `2984e377…`, tree carrying 19 modified +
3 untracked paths, of which this lane owns the eight in the census; the rest is Lane E1's
and Lane P's and was not touched.

### What changed

| file | change | act |
| --- | --- | --- |
| `tests/styles/emitted-utility-vars.test.ts` | `:206` annotated `postcss.AnyNode \| undefined`; `:212` guard tightened against a negated `@supports` (1 line replaced, 1 split in two) | cure 1 + cure 2 |
| `src/components/slider/styles.css` | `:37` comment, `45` → `47` | cure 3 |
| `tests/styles/slider-cursor-affordance.test.ts` | `:4` comment, `45` → `47` | cure 4 |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/C1/RECORD.md` | the §Verify strike-in-place bracket, the cure-round act rows, this section | cure 5 |

No source behaviour changed in round 1: two of the four edits are comments, one is a type
annotation, one tightens a test predicate. The RED/GREEN quotes for each are in the act
ledger, §Cure round 1.

Challenger A's proposed annotation (`postcss.Container | postcss.Document | undefined`)
was dismissed by the adjudicator and is not used: `Container` is the class, not the
`ContainerWithChildren` union that narrows on `type === "atrule"`, so the loop body fails
TS2339 on `name` and `params`. `AnyNode` narrows correctly and needs no change below
line 206.

### Verify, round 1, real exit codes

**Typecheck** — `npm run typecheck` (= `vue-tsc --noEmit && vue-tsc --noEmit -p
tsconfig.test.json`, CI's first step):

```
$ npm run typecheck
> @mkbabb/glass-ui@9.0.0 typecheck
> vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json
TYPECHECK-EXIT=0
```

The test project alone, the surface the lane's own files sit on:

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
EXIT=0
```

**Lane tests** — the three files, exit 0:

```
$ npx vitest run tests/styles/overlay-plate-available-height.test.ts tests/styles/slider-cursor-affordance.test.ts tests/styles/emitted-utility-vars.test.ts
LANE-EXIT=0
 Test Files  3 passed (3)
      Tests  10 passed (10)
```

**Gate receipt**, verbatim, exit 0:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Sixty seats, `violations:0`. Round 1 minted nothing: no G-id, no seat, no new file.

**Full battery** — `npx vitest run`, stated as its full line, exit 0:

```
BATTERY2-EXIT=0
 Test Files  227 passed (227)
      Tests  2172 passed | 10 expected fail (2182)
```

The first battery of the round was `1 failed | 226 passed (227)` on
`tests/gates/boot-graph.test.ts` — the wave-level mtime ratchet, and this time it was
THIS lane's: the only source file newer than `dist-demo/index.html` was
`src/components/slider/styles.css` (18:34:37, the comment edit). Cured in place:
`npm run demo:dist:build` under `scratchpad/build.lock`, taken with `mkdir` on the first
attempt and released with `rmdir`, exit 0. The battery above is the re-run. The residue
from the lane's first round stands unchanged — whichever lane lands last owes the wave one
more `npm run demo:dist:build`.

### Fence, round 1

Four files touched, every one of them in the C1 fence. No `git add`/`commit`/`stash`/
`checkout`/`reset`. No sibling repo read for a write or written. The mutation proof ran
against a COPY of `dist/` under the session scratchpad
(`scratchpad/c1-mut/dist/`), never against the shared `dist/` itself; the copy was
restored from the real sheet for the GREEN half and is scratch, not a repo artifact.
`dist-demo/` was rebuilt once, under the lock, and the lock was not left held.

### Residue, round 1

1. **The `dist-demo` ratchet is still the wave's**, as before.
2. **No live-π capture** — unchanged; round 1 changed no paint.
3. **The negated-`@supports` hole was latent, not live.** Nothing of that shape is in the
   published sheet today; the arm is now armed against it before it can be.
