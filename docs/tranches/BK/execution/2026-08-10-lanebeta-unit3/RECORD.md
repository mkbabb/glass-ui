# BK · Lane β · unit β2 — #21 W-DAG-REDUCE

**modelId: `claude-opus-5[1m]`** (IMPLEMENT seat; the assertion gates the chain) · base
HEAD `8323c9b7` · date **2026-08-10** · SHARED TREE, three other lanes concurrent
(α5 live on `dock/**`, γ2 adjudicating `blob`/`aurora`, δ4 landed at `8323c9b7`).

**This seat never staged, committed, stashed or checked out.** The driver commits.

---

## 0 · STEP-0 CENSUS, banked before a byte moved

Baseline diff: `/tmp/bk-lanebeta-baseline-1787584310.diff` — **2,381 lines**, `git diff -U0`.

| figure | at step 0 |
|---|---|
| HEAD | `8323c9b7` (δ's `feat(demo/chassis): land BK #73 W-SCROLL-SHRINK`) |
| porcelain | **43** |
| tracked-modified | 39 (37 M + 1 D + the rest) — **38 of them foreign**, enumerated below |
| untracked | **4 entries** — `docs/tranches/BK/execution/2026-08-10-lanegamma-unit3/` (γ, 2 files) · `scripts/import-dag.mjs` (**β2's own**) · `tests/components/custom/blob/gl-excise.test.ts` (γ) · `tests/components/custom/dock/GlassDock.posture.test.ts` (α) |

**β0 HAS LANDED.** The brief describes β0's dirt (`MIGRATION.md` + `darkModeSyncScript.ts`
+ its test) as awaiting cure; on disk it is **committed** — `c4dbf53b`
(`feat(dark): darkModeSyncScript gains defaultDark · queryOverride · normalize`), and
`MIGRATION.md`'s `## 8.1.0 — UNRELEASED` section is committed text, not working-tree dirt.
Recorded because this unit then had to edit that committed section (§1 ACT 3).

**#21's Φ4 GATE ON #17 IS SATISFIED, verified rather than accepted:** #17 landed at
`dc4267fc` (`feat(gates): the ONE comment counter + G-COMMENT-RATIO bound`), and
`TERMINAL-ROSTER.md:167`'s #17 row carries the 2026-08-12 CURE bracket with the live
figure `38.5% at 558c3fa3`. β1's cured instrument and its §D declaration-parity recipe
bind every comment-only edit this unit made (§1 ACT 5).

### 0.1 · THE PRIOR ATTEMPT'S PARTIALS — disposition PER FILE, by content

The brief names five candidate partials from this lane's session-walled prior attempt.
**Four of the five are NOT this lane's, and the content says so in its own words** — ~~each
carries a `[2026-08-12 · BK #47 W1 SURFACE]` bracket and strikes a dock prop~~
[**2026-08-10 · cure C3 — the split restated, because "each" overstated it.** All four
strike a dock prop; **two of the four** carry the `[2026-08-12 · BK #47 W1 SURFACE]`
bracket — `demo/stories/display/dark-mode-toggle.vue:48` and
`demo/stories/feedback/progress.vue:247`, verified 1 occurrence each. The other two,
`demo/shell/BottomDock.vue` and `demo/shell/SidebarDock.vue`, are **bare prop strikes** with
zero brackets (verified 0/0). The disposition is unchanged and does not rest on the
bracket: the prop strike is α's #47 W1 act whether or not the consumer edit is annotated,
and all four stay UNTOUCHED.]:

| file | on-disk content | disposition |
|---|---|---|
| `scripts/import-dag.mjs` | the typed-edge v3 instrument, 610 lines, owner manifest fail-closed | **β2's own — ADOPTED**, §1 ACT 1 |
| `demo/shell/BottomDock.vue` | `always-expanded` → `:collapse="false"` | **α's #47 W1** — untouched |
| `demo/shell/SidebarDock.vue` | `always-expanded` → `:collapse="false"` | **α's #47 W1** — untouched |
| `demo/stories/display/dark-mode-toggle.vue` | the `dockSizes` triple folded to one; `[BK #47 W1 SURFACE]` bracket | **α's #47 W1** — untouched |
| `demo/stories/feedback/progress.vue` | `start-collapsed`/`collapse-delay` → `:collapse="'closed'"`; `[BK #47 W1 SURFACE]` bracket | **α's #47 W1** — untouched |

The brief's own caution ("α5's fence excludes these four but verify") is what the verify
found: the fence line is `dock/**` + demo dock stories, and these four sit outside it —
but they are the **consumer spill of α's prop strike**, which is α's act, not β's. A
subpath cut and a prop strike do not look alike; adopting them would have been adopting
another lane's uncommitted work. **`demo/shell/AppShell.vue` was CLEAN at step 0** and is
the only `demo/shell` file this unit opened.

---

## 1 · WHAT THIS UNIT DID — six acts

### ACT 1 · The typed-edge v3 instrument — ADOPTED, not re-authored

`scripts/import-dag.mjs` was found complete on disk and **runs green (`REAL_EXIT 0`)**, so
the lane text's "RE-AUTHOR" is discharged by adoption rather than by retyping working
bytes. What it is, and why the row needed a third pass:

**v2 resolved specifiers with `ts.preProcessFile`, which reports THAT a file is imported
and never WHY.** `import type { DockAxis } from "../dock"` and
`import { GlassDock } from "../dock"` are the same edge to it. They are not the same edge
to a bundler, to a cycle, or to this wave: **a type-only edge is ERASED at compile time
and cannot participate in a runtime import cycle.** An SCC held together by type edges is
a naming knot, not an initialisation hazard, and the two cost completely different things
to dissolve. v3 emits **two graphs from one walk** — FULL (every edge v2 saw, so the
censuses stay comparable) and VALUE (type edges dropped) — and the delta between their SCC
sets is the work list, derived rather than asserted.

**THE OWNER MANIFEST IS FAIL-CLOSED** (the `regen-exports.mjs` discipline): every module
inside a module SCC of size > 1 must carry an explicit owner or the script exits 1. The v2
census listed its SCCs and named no seat, and the rows sat unowned for a tranche.

**THE DETECTOR, stated verbatim as the command prints it:**

```
detector: typed-edge import graph over src/ + demo/; EDGE TYPES = value |
  type | style | vue-block-src | glob; a `type` edge is erased at compile
  time and is EXCLUDED from the value graph; SCCs by Tarjan, size > 1.
```

### ACT 2 · The full re-census — three corrections, none of them a tree move

`node scripts/import-dag.mjs` at the row's open, verbatim:

```
nodes            852        modules          107
internal edges   2319       external edges   599
unresolved       1 imports · 0 globs        leaf modules     16
edge types:  value 1700 · type 378 · style 126 · glob 98 · vue-block-src 17
file SCCs        full 9 · value 3
module SCCs      full 4 · value 4
```

Against `TERMINAL-ROSTER`'s ⊕² census (`890 nodes · 2,308 internal / 623 external · 112
leaf modules · 10 file SCCs · 3 module SCCs`), **three corrections are load-bearing**:

1. **leaf modules 112 → 16.** v2 counted a leaf by FILE; v3 by MODULE (no outward edge to
   another module). The module is the unit the reduction acts on, so the v2 figure was
   measuring something the row cannot spend.
2. **M02 is EIGHT members, not the recorded nine.** `src/components/tooltip` has LEFT the
   knot and `dropdown-menu` is now `menu`. Standing membership: `_shared · dock · menu ·
   search · select · tabs · composables/glass · composables/motion`.
3. **A FOURTH module SCC the ⊕² census never named** — `src/components/dialog` ↔
   `src/components/sheet`, 2 members.

**The `1 unresolved import` is reported, never swept.** v2 read 0 for the same tree
because its resolver silently classed the specifier external; a figure that improves
because the instrument stopped looking is the class this tranche keeps striking.

Both `TERMINAL-ROSTER` sites carry **dated strike-in-place brackets**, never a silent
overwrite: the ⊕² census sentence (§ACT 6) and the ⊕⁴ routing sentence (§ACT 4).

### ACT 3 · M03 DISSOLVED — one import line, and the cycle was all of it

M03 was `demo` ↔ `demo/shell`, and the instrument's `--module` explain reduces it to three
edges of which exactly **one** points upward:

```
[value] demo/App.vue          -> demo/shell/AppShell.vue  (./shell/AppShell.vue)
[value] demo/router.ts        -> demo/shell/NotFound.vue  (./shell/NotFound.vue)
[value] demo/shell/AppShell.vue -> demo/router.ts         (../router)     ← the back edge
```

The back edge existed for ONE symbol: `shellFieldActive`, a `computed` exported from
`demo/router.ts` reading `!router.currentRoute.value.meta?.suppressesShellField`, imported
by `AppShell.vue` and by nothing else in the repo.

**`AppShell.vue` already held `const route = useRoute()` at `:102`** — and in Vue Router 4
`useRoute()` IS the router's `currentRoute`. So the projection was computed at the router
and shipped down to the one component that already held its input. It now computes where
it is consumed:

```ts
const shellFieldActive = computed(() => !route.meta?.suppressesShellField);
```

`demo/router.ts` loses the export **and its `import { computed } from "vue"`**, which that
export was the sole reason for. **Behaviour is identical by construction**, not by
assertion: same source, same operator, same commit timing — `useRoute()` updates only when
navigation commits, which is the property the original docstring named, and that docstring
moved with the code rather than being deleted.

**MEASURED, both graphs:**

| figure | before | after |
|---|---|---|
| module SCCs FULL | 4 | **3** |
| module SCCs VALUE | 4 | **3** |
| internal edges | 2,319 | **2,318** |
| external edges | 599 | **598** (the dropped `vue` import) |

**A REPORTING HAZARD, stated because the next reader will hit it:** the instrument numbers
SCCs **positionally** (by size, then name). With `demo`↔`demo/shell` gone, the label `M03`
now denotes **`dialog` ↔ `sheet`**. Cite SCCs by MEMBERS, never by label; the labels are
not stable identifiers and this row just moved one.

**THE SEVERANCE IS LOCKED BY A GATE THAT BITES, PROVEN BY MUTANT.**
`tests/demo/router-field-ownership.test.ts` imported the deleted symbol, so it had to be
re-authored — and the re-author is strictly stronger. Its two `shellFieldActive.value`
assertions were **pure negations of the `meta.suppressesShellField` asserted on the line
above them**, so removing them costs the suite nothing. In their place, the structural
arm the defect actually needs, because a single re-added import restores the cycle and no
behavioural test would notice:

```
it("no file under demo/shell/ imports from demo/router — M03 stays dissolved")
```

**MUTANT — one line re-added to `AppShell.vue`, transcript verbatim:**

```
× no file under demo/shell/ imports from demo/router — M03 stays dissolved  4ms
  Tests  1 failed | 2 passed (3)        REAL EXIT: 1
```

**CONTROL after restore (`cmp` verified BYTE-IDENTICAL): `Tests 3 passed (3)`, REAL EXIT 0.**
Killed by the arm whose title names the mechanism, not by a bystander.

### ACT 4 · The export motion — ONE cut, THREE refusals, ONE deferral

**The row's routing was a hole, and that is why this row cut for itself.** `TERMINAL-ROSTER`
⊕⁴ routes these candidates to *"C-10's ONE batched export cut, #65/#66"*. That cut
**LANDED at #66 CLOSE on 2026-08-09** — `public-surface.spec.ts:183`, *"THE CUT LANDED,
whole and once"* — and **carried none of them**. Verified at HEAD before a byte moved:
`package.json` declares **70 export keys** and all five candidates are LIVE. A routing to a
departed vehicle is not a route.

**THE WALK, run FRESH this seat, universe GENERATED never remembered (#76's law):**

```
grep -rn "glass-ui/<sub>" atlas bbnf-buddy bbnf-lang keyframes.js fourier-analysis \
  latex-paper muster oscilloscope parse-that sci-report slides slides-K speedtest \
  value.js words --include='*.ts' --include='*.tsx' --include='*.vue' --include='*.js' \
  --include='*.jsx' --include='*.css' --include='*.json' --include='*.html' \
  --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude-dir=build \
  --exclude-dir=.vite --exclude-dir=coverage --exclude-dir=test-results \
  --exclude-dir=docs --exclude-dir=audit --exclude-dir=audits
```

**The walk is NON-VACUOUS, checked rather than assumed** — all 15 roots exist on disk and
**555 files across them import `@mkbabb/glass-ui`**. Zero of them import any of the five
candidates. A zero from a universe nobody verified is not evidence.

| candidate | walk | disposition |
|---|---|---|
| `./canvas` | 0/15 roots · 0 in-repo | **CUT** |
| `./axes` | 0/15 roots | **REFUSED — ground falsified on disk** |
| `./fonts/*` | 0/15 roots | **REFUSED — live self-reference found by the sweep** |
| `./styles/theme` | 0/15 roots · 0 in-repo | **REFUSED — zero consumers ≠ redundant** |
| `./blob-config` | 0/15 roots | **DEFERRED — this row's own sub-order fence** |
| `./fourier-math` | — | **EXCLUDED by the row** (g4 ratified KEEP) |

**THE CUT — `./canvas`, the one candidate whose ground survives disk.** It published
exactly six names, and the root barrel publishes **all six**:

| `/canvas` (`src/composables/glass/canvas2d/index.ts`) | root barrel |
|---|---|
| `useCanvas2D` · `resolveCanvasColor` | `src/index.ts:474-486`, via `./composables/glass` |
| `Canvas2DFrame` · `Canvas2DHandle` · `Canvas2DOptions` · `Canvas2DSuspendReason` | same block |

A strict superset, so **the cut removes zero reachable names** — a door, never a room.
`canvas2d` stays INTERNAL substrate, unmoved. Executed at the single source
(`scripts/lib/subpath-policy.mjs`, dated strike-in-place) and regenerated, never hand-edited:

```
REGEN (PUBLISH-driven): exportKeys 69/69  jsSubpaths=63  drops=0 adds=0
                        targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.        REAL EXIT: 0
```

**REFUSED — `./axes`, and the candidate's own ground is what refutes it.** §4 calls it
*"root-barrel-redundant, `src/index.ts:265`"*. On disk the root barrel is a strict
**SUBSET**:

| | names |
|---|---|
| `/axes` publishes **18** | 9 runtime tuples `SURFACES · SURFACE_TIERS · SIZES · ORIENTATIONS · MOTIONS · TONES · PLACEMENTS · TRIGGERS · BACKDROPS` + 9 types |
| root barrel re-exports **5** | `Size · Orientation · Motion · Surface · SurfaceTier` — types only, **zero tuples** |

The cut would delete **13 reachable public names with no successor**. And the tuples
cannot simply follow: `src/index.ts:565-568`'s own comment states the re-export is
*"Types-only … so the vueuse-FREE root-barrel discipline is preserved"* — their absence is
a design property, not an oversight. `MIGRATION.md:514,879,1046` told consumers one major
ago that `/axes` **is** the successor home for exactly these vocabularies.

**REFUSED — `./fonts/*`. The incredulity clause paid off exactly as the fold predicted.**
The row fenced this candidate behind a CSS `url()`/`@import` text-reference sweep because
the census instrument cannot see those references. **The sweep found them, in the library's
own shipped stylesheet:**

```
src/styles/fonts.css:85   src: url("@mkbabb/glass-ui/fonts/plus-jakarta-sans/…woff2")
src/styles/fonts.css:101  src: url("@mkbabb/glass-ui/fonts/plus-jakarta-sans/…woff2")
src/styles/fonts.css:123  src: url("@mkbabb/glass-ui/fonts/fira-code/…woff2")
src/styles/fonts.css:138  src: url("@mkbabb/glass-ui/fonts/fira-code/…woff2")
```

Cutting the key breaks **every `@font-face` the package ships**. `demo/demo.css` ~~reads~~
**documents** the same specifier. This is the single most valuable thing the sweep produced
and it would have been invisible to every graph instrument in the repo.

> **[2026-08-10 · cure C2 — one word, struck for accuracy.]** `demo/demo.css` carries the
> package specifier in its header COMMENT only (`:12`, which itself states the bare
> specifier does NOT resolve in Vite's demo context); its four live `src: url(…)` reads at
> `:35,:48,:63,:75` are `../src/fonts/…`. Same strike landed at
> `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:171`. **The `./fonts/*`
> REFUSAL is unaffected** — it stands on `src/styles/fonts.css:85,101,123,138` alone, the
> shipped stylesheet, which was always the whole of the ground.

**REFUSED — `./styles/theme`.** The sweep clears it of hidden references (zero in-repo,
zero across all 15 roots, all file types) — but **zero consumers is not redundancy, and the
two were about to be conflated.** ~~`MIGRATION.md:743-746`~~ `MIGRATION.md:766-769`
[**2026-08-10 · cure C3** — re-pinned: this unit's own `## 9.0.0 — UNRELEASED` section
inserted +23 lines above it, so the cite drifted by exactly that amount; verified on disk]
states its published contract:
register the Tailwind v4 `@theme` aliases and dark variant **"without the component
cascade"**. `./styles` is precisely the entry that brings the cascade
(`src/styles/index.css:202` `@import`s `theme.css` into it). **The narrowness IS the
product**, and it was minted one major ago at 7.0.0.

**DEFERRED — `./blob-config`, by this row's OWN sub-order fence**, which exists so the
G-RELAY walk runs against the post-excise blob tree: *"the `./blob-config` cut serializes
behind Lane γ's #50 W0."* `EXECUTION-PROGRESS.md:5328` reads **#50 GF-BLOB · Φ5 ·
UNSTARTED**, and γ2's `tests/components/custom/blob/gl-excise.test.ts` is untracked in the
tree right now — the excise is in flight, not landed. Today's walk (0/15 roots) is banked
and **re-run at the cut, never carried**. → **RT-21-A**.

**THE PUBLIC BREAK IS DOCUMENTED, AND HONESTLY VERSIONED.** `MIGRATION.md` gains a
`## 9.0.0 — UNRELEASED` section: a removal cannot ride a minor, so the next cut is a MAJOR
and β0's purely-additive `8.1.0` content rides it. **β0's section keeps its heading and its
text** — it carries a dated bracket saying the version it names is superseded, rather than
being silently renumbered. The four `Canvas2DFrame|Handle|Options|SuspendReason` rows in
the symbol table (~~`:931-934`~~ `:954-957` — [**2026-08-10 · cure C3** — re-pinned by the
same +23-line 9.0.0 insertion; `:931-934` now reads the `Aurora*` rows, verified on disk])
are struck in place to `root barrel`, with the fact that
matters: **the names never moved.**

**ONE re-pin of `public-surface.spec.ts`**, exactly the one the row allows: the
`exportKeys 70/70 EXACT` comment at `:185`, struck and dated to **69/69**. The root-symbol
list beneath it **did not change by a byte**, which is the point of citing it — a subpath
cut that touches the root surface is a different act from one that does not.

### ACT 5 · `_shared/feedback` — the charter, and the two routed dispositions

**THE CHARTER.** Three files sat in `src/components/_shared/feedback/` with no statement of
what made them one directory. `src/components/_shared/feedback/README.md` is that
statement — membership rules, not documentation: *composed by ≥2 families · states state,
never identity · owns no color and mints no token.*

**NO BARREL WAS MINTED, and the refusal is the row's own logic applied to itself.**
`DotRing.vue` has three importers reaching it by relative path; an `index.ts` would add a
module and an edge **to the graph this row exists to shrink**, buying a shorter specifier
and nothing else. The two stylesheets are reached by `@import` from `src/styles/index.css`
(entries 7a/7b), whose load ORDER is the cascade's own contract and cannot be delegated to
a barrel without losing it. **The charter is the consolidation.** It also costs the
`G-COMMENT-RATIO` denominator **nothing**: `README.md` is outside the census corpus
(`.ts/.vue/.css/.mjs`), where the same words as a header comment would have worked against
#17 in the same commit.

**`--feedback-tone-rung` — the #33-routed "zero-writers dispose" is DISPOSED as KEEP, and
the routing's premise was the thing that was wrong.** Measured with the gate's own
detector over `git ls-files src`:

```
DECLARATIONS (writers): 1   src/components/_shared/feedback/feedback-tone.css:64
READS via var():        1   src/components/_shared/feedback/feedback-tone.css:83
```

It is **not a dead register**. It is a deliberately-designed `var()` fallback with exactly
one `:root` definition, for a `.feedback-tone` consumer that composes no rung at all — and
`G-FEEDBACK-TINT-SEAM` arm (b) already locks both halves (*"nothing in `src/` re-points
it"* + *"the fallback is declared exactly once"*). Deleting it would remove a documented
safe degenerate **and kill a green gate arm**. Recorded the way #18 recorded its two
re-walked CSS registers: walked, cleared, and not carried out.

**ONE COMMENT SAID SOMETHING SLIGHTLY FALSE AND WAS RE-AUTHORED.**
`src/components/alert/index.ts:57` read *"the token has zero writers in `src/`"*, which the
gate's own comment contradicts (*"the one legal writer"*). Re-authored to the precise
claim: **zero RE-POINTS — one declaration, one read.** Per β1 §D the strike-in-place law
binds committed tranche text, **not source comments** — source prose is re-authored, and
`WAVES.md:847` rules a struck bracket inside a source comment to be the very artefact #17
deletes. **Declaration parity verified mechanically, per β1's recipe:**

```
diff <(git show HEAD:$f | strip-comments | strip-blank | trim) \
     <(strip-comments $f | strip-blank | trim)
→ PARITY OK — alert/index.ts declarations byte-identical to HEAD
```

### ACT 6 · The two `TERMINAL-ROSTER` brackets

Both on row #21's own cell, both dated `2026-08-10 · BK β2`, both strike-in-place with
every struck figure left legible beside the command that re-derives its replacement:

1. **the ⊕² census sentence** — the v2 figures struck, the v3 census stated, the three
   load-bearing corrections separated from the tree move, and the row's close (M03
   dissolved, 4 → 3 in both graphs) recorded on the same cell.
2. **the ⊕⁴ "route to #65/#66" sentence** — the vehicle-sailed finding, and the five
   candidates dispositioned individually with the on-disk falsifier for each refusal.

---

## 2 · WHAT THIS UNIT REFUSED, with grounds

1. **`./axes`** — the candidate's stated ground is false on disk (§1 ACT 4). Not deferred:
   **refuted**.
2. **`./fonts/*`** — live `url()` self-references in the library's own shipped CSS.
   **Refuted.**
3. **`./styles/theme`** — zero consumers is not redundancy; the narrow entry is the
   product. **Refused.**
4. **`./blob-config`** — the row's own sub-order fence, #50 W0 UNSTARTED. **Deferred,
   RT-21-A.**
5. **The M02 residual re-census and any M02 reduction** — the row fences it behind lane α's
   dock W-band ("measure the new tree, not the corpse"), and α5's cure seat is **live on
   `dock/**` right now**, with `dockContext.ts` dirty in the tree. **The finding that makes
   the deferral cheap is banked at §3.**
6. **M01** — explicitly not this row's (`#58`/`#56` own the manifest seam), and δ has not
   opened #58's chassis.
7. **`dialog` ↔ `sheet`** — the fourth module SCC, found by this census and named for the
   first time. Not started: it is a discovery of this run, unowned by any ratified act, and
   minting its cure here would be the ad-hoc addendum this tranche forbids. **RT-21-B.**
8. **The `.bundle-ratchet` rebind** — the single batch-close byte, owner-worded. §4.
9. **`npm run demo:dist:build`** — RT-β1-E, batch close. §4.
10. **Any file under another lane's fence**, including the four #47 W1 partials (§0.1) and
    `src/styles/glass/material.css` — landed attributed, still not a lane surface. §5.

---

## 3 · M02 HANGS ON ONE IMPORT LINE — banked for whoever opens it after α

`node scripts/import-dag.mjs --module src/components/_shared` returns **301 inbound edges
and exactly TWO outbound**:

```
OUT (2):
  [value] src/components/_shared/overlay/participation.ts
            -> src/components/dock/composables/dockContext.ts  (../../dock/composables/dockContext)
  [value] src/components/_shared/useMotionAxis.ts
            -> src/composables/motion/core/useReducedMotion.ts (../../composables/motion/core/useReducedMotion)
```

**`_shared`'s entire membership in the eight-module M02 knot is the first of those two
lines** — a shared overlay leaf reaching DOWN into a specific component's context module.
The second edge is `_shared → composables/motion`, also an M02 member.

This is banked, not acted on: `dockContext.ts` is **dirty in the working tree under α5's
live cure seat**, and the row's own fence says the M02 residual is measured after α's dock
W-band lands. Whoever takes it inherits a one-line question rather than an eight-module
survey — which is what this census was for.

---

## 4 · VERIFY — real exit codes, never a piped tail's

Taken **2026-08-24 in the window `11:19–11:23-0400`**, at working-tree state. Every exit is
`$?` taken directly from the command, never from a pipeline's tail.

| command | real exit | figure |
|---|---|---|
| `npx vue-tsc --noEmit` | **0** | clean |
| `npx vue-tsc --noEmit -p tsconfig.test.json` | **0** | clean (both `npm run typecheck` arms) |
| `node scripts/import-dag.mjs` | **0** | the census, §1 ACT 2 |
| `node scripts/regen-exports.mjs` | **0** | `exportKeys 69/69 · EXACT REPRODUCTION: YES` |
| `npx vitest run tests/demo/router-field-ownership.test.ts` | **0** | `3 passed (3)` — control |
| the M03-lock mutant (one import re-added) | **1** | killed by the arm that names it |
| `npx vitest run` (whole suite) | **1** | `1 failed \| 2014 passed \| 7 expected fail (2022)` · `227` files — **the one failure is `boot-graph`, below** |
| `node scripts/gate-register.mjs` | **0** | the receipt below |
| `npm run verify:package` | **1** | `G-BUNDLE-RATCHET`, below |

**RECEIPT — BYTE-IDENTICAL to the standing line, stated in full:**

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**SEATS +0.** No figure moved, so no act is owed against one. The M03 lock is a **case
inside an existing file under an existing describe** — a case is not a seat, exactly as
β1's four cure arms were not.

**THE BATTERY FIGURE THE BRIEF CARRIES IS STALE, AND THE SCOPES DIFFER — both stated
rather than reconciled by picking the flattering one.** The brief's standing
`1538 passed | 5 xf` matches no scope in this tree. β1 recorded `1828 | 7 xf` over the
FOUR-DIRECTORY subset `tests/styles tests/components tests/gates tests/composables`. Both
readings, taken this seat:

| scope | real exit | figure |
|---|---|---|
| whole suite (`npx vitest run`, 227 files) | 1 | `1 failed \| 2014 passed \| 7 expected fail` |
| β1's four-directory subset (206 files) | 1 | `1 failed \| 1812 passed \| 7 expected fail` |

The single failure is the **same** `boot-graph` case in both. **`7 expected fail` is
UNMOVED from β1's standing figure**, and β2 adds no `it.fails`. **ZERO failures name a β2
surface**, checked by grep over the run output rather than by eye.

**THE `boot-graph` TRIP IS β2's THIS TIME — attributed by measurement, and this is the
correction β1 had to make in the opposite direction:**

```
FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm
  dist-demo/index.html is STALE (built 2026-08-12T16:15:32.298Z,
                                 newest source 2026-08-24T15:21:24.095Z)
```

`max(mtime)` over `src/` + `demo/` resolves to **`demo/shell/AppShell.vue` — this unit's
own file** (2026-08-24T15:21:24.095Z; the mutant restore's `cp`, content byte-identical to
this unit's ACT 3 edit). β1 recorded the trip as foreign and had to strike that; this seat
measured before claiming. **The remedy stays at batch close (RT-β1-E) and is NOT run here**,
for the reason β1 derived and this tree confirms: the gate walks all of `src/` and `demo/`
and takes the max, so **α5 and γ2 are both live on those trees right now** and a rebuild
from this lane would be stale again within minutes — while writing build output into a
four-lane shared tree mid-batch. A gate whose colour is a race between four lanes is a
batch-close reading.

**`G-BUNDLE-RATCHET` STANDS RED BY ROUTE, LAWFULLY — stated, never papered:**

```
Error: G-BUNDLE-RATCHET: bundle ratchet shrink — rebind down deliberately: 2607399 < 2633353
    at ratchetEvidence (scripts/verify-export-types.mjs:784)
```

The arm is a **two-sided** lock by design — `verify-export-types.mjs:781-783`: *"A SHRINK
is as much a rebind as a growth: silent headroom accumulates until the ceiling means
nothing (the N-4 defect class)."* The RED is the SHRINK side, pre-existing and carried by
the single batch-close rebind (β0's `+1,215` and the driver's `−71`). **β2's own
contribution is measured, not guessed: `−171` unpacked bytes** — the two re-export stubs
`dist/canvas.js` (116 B) + `dist/canvas.d.ts` (55 B) that the cut stops emitting; the
implementation lives in a shared chunk that stays. Against a standing gap of `−25,954` that
is 0.7%. **The rebind is ONE batched byte at batch close and is not this seat's.**

---

## 5 · FENCE — re-hashed, not asserted

| surface | verdict |
|---|---|
| `src/styles/glass/material.css` (landed attributed, still not a lane surface) | `d383ab0166db9398…` — **byte-identical to β1's recorded hash**, never opened |
| `tests/styles/material-css-syntax.test.ts` | clean in porcelain, never opened |
| lane α — `src/components/dock/`, `search/`, demo dock stories, **and the four #47 W1 consumer partials** (§0.1) | **UNTOUCHED** |
| lane γ — `aurora/`, `blob/`, `handmark/`, `fourier-field/` | **UNTOUCHED** |
| lane δ — `configurator/`, `demo/chassis/`, story SFCs | **UNTOUCHED** |

β2's paths, and only these:

```
scripts/import-dag.mjs                                              (untracked; ADOPTED)
src/components/_shared/feedback/README.md                           (new — the charter)
demo/router.ts                                                      (ACT 3)
demo/shell/AppShell.vue                                             (ACT 3)
tests/demo/router-field-ownership.test.ts                           (ACT 3, re-authored + locked)
scripts/lib/subpath-policy.mjs                                      (ACT 4, struck in place)
package.json                                                        (ACT 4, GENERATED by regen-exports --write)
MIGRATION.md                                                        (ACT 4)
tests/public-surface.spec.ts                                        (ACT 4, the ONE re-pin)
src/components/alert/index.ts                                       (ACT 5, comment-only; PARITY OK)
docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md    (ACT 6, struck in place)
docs/tranches/BK/execution/2026-08-10-lanebeta-unit3/                (this record)
```

Digests, taken **2026-08-24T15:23-0400**, after the last byte:

```
restricted diff -U3 over β2's tracked paths   fcb2987f49c6f77f6554153d3f098cfc66214c064ee55a548124dc2550cc7fea
scripts/import-dag.mjs                        5f607ea89e2025809c2493d2499c9852a43b8775f812322ee3259a2d90a1925d
src/components/_shared/feedback/README.md     ebb94ce55c7ab75ccd0f9831f4593e8fef6ea3d6619283e3642fbef626f1d5e4
src/styles/glass/material.css (fence)         d383ab0166db9398022fb7f2470b38d31683bdef8c052380359ea1f13a5fbad7  ← unchanged
```

**PORCELAIN IS A SAMPLE AT AN INSTANT, NEVER A PROPERTY** (β1's §5, and this run reproduces
it): **43 at step 0**, **51 at 2026-08-24T15:23:05Z**. Of the 51, **eleven are β2's** — the
ten paths above plus this record's directory. **The index carries no staged entry**, and
this seat ran no `git add`, `commit`, `stash` or `checkout` at any point.

**`package.json` WAS WRITTEN BY A GENERATOR, NOT BY HAND** — `regen-exports.mjs --write`,
whose read-only re-run then reproduces the result EXACTLY (`69/69`). The diff is `7
deletions, 0 insertions`: the `./canvas` export key and its `typesVersions` row.

---

## 6 · ROUTED OUT OF THIS UNIT

- **RT-21-A** — **the `./blob-config` cut**, serialized behind lane γ's **#50 W0**
  (UNSTARTED at this close). Today's walk (0 consumers / 15 roots) is banked and **must be
  re-run against the post-excise blob tree**, never carried. → **#21 tail / γ.**
- **RT-21-B** — **the `dialog` ↔ `sheet` module SCC**, named by this census for the first
  time. Two members, unowned by any ratified act. → **unclaimed; evidence at §1 ACT 2.**
- **RT-21-C** — **M02's residual**, with the finding that makes it cheap: `_shared`'s
  membership is **ONE import line** (§3). Fenced behind lane α's dock W-band. → **#21 tail,
  after α.**
- **RT-21-D** — **the `9.0.0` version reconciliation.** This unit made the next cut a
  MAJOR. `MIGRATION.md`'s `8.1.0` section keeps its heading with a dated supersession
  bracket; whoever cuts the release folds the two sections and bumps `package.json`.
  A **consumer addendum is owed** for the `./canvas` removal — #76's 8.0.0 channel has
  closed, so it rides the next publish. → **the release seat / #76's successor.**
- **RT-21-E** — **the `1 unresolved import`** the v3 census reports and v2 could not see.
  One specifier resolving to no file under `src/` or `demo/`. Not a cycle and not this
  row's cut; banked so the next census does not re-discover it. → **unclaimed.**
- **RT-β1-E** (inherited, re-confirmed) — `boot-graph`'s `npm run demo:dist:build` →
  **batch close**. Re-confirmed as batch-level from the OTHER side this time: the trip is
  **β2's own** by measured mtime, and it is still not β2's to clear (§4).
- **RT-β0-B** (inherited, unchanged in kind) — the `.bundle-ratchet` rebind. β2 moves it by
  a measured **−171 bytes** against a **−25,954** standing gap. → **batch close, one byte.**

---

## 7 · CURE — the adjudicator's C1/C2/C3, executed 2026-08-24

`wf_231fe2f1-842` returned **CURE-REQUIRED**: every β2 act STANDS, nothing overturned, but
three items must not ride the driver's commit as written. Executed here, in β2-owned files
only; **seats +0**, receipt byte-identical, no seat moved and nothing minted.

| cure | file | act |
|---|---|---|
| **C1** | `scripts/import-dag.mjs:82-96` (was `:83-84`) | the two stale M03 owner rows STRUCK to a dated comment — the census now fail-closes on any re-formed `demo` ↔ `demo/shell` |
| **C1 (hardening)** | `tests/demo/router-field-ownership.test.ts:41-48` (annotation) + `:59-65` (pattern) | the arm annotated **tripwire-only**, census named as the resolving lock; regex widened (trivial) to the three bypass shapes |
| **C2** | `TERMINAL-ROSTER.md:171` + this file `:273-274` | `demo/demo.css` ~~reads~~ **documents** the fonts specifier — dated strike at both sites |
| **C3** | this file §0.1 (`:37-46`), `:287-290`, `:308-310` | bracket split restated (2 of 4, not "each"); the two drifted self-cites re-pinned |

Line cites into THIS file are given at post-cure state; the C3 defect they answer is exactly
what happens when they are not re-pinned after an insertion.

### 7.1 · C1 — why the owner rows had to go

The lock was **bypassable**, confirmed statically by the adjudicator on all three classes.
`ownerOf()` is longest-prefix, and `import-dag.mjs:616-622` exits 1 only for **UNOWNED**
cyclic modules —
so a re-formed M03 found `["demo/shell", …]` / `["demo", …]` still sitting in the manifest,
carried an owner, and **passed**. The tripwire could not save it either: its
`/\bfrom\s*["'](\.\.(?:\/\.\.)*\/router)["']/g` misses `"../../demo/router"`,
`"../router.ts"`, and dynamic `import("../router")`.

**One cure closes all three classes**, because the census resolves specifiers **on disk**
and does not care what shape the text took. Verified safe on today's bytes: no member of
M01 (`demo/chassis*` + `demo/stories*`), M02, or `dialog`↔`sheet` is `demo` or `demo/shell`.

### 7.2 · C1 — THE MUTANT PROOF, in scratch, never in the tree

The shared tree is live with concurrent quartets, so **no mutant was planted in the repo**
(`grep -rn MUTANT demo/shell/AppShell.vue` → exit 1, checked while the scratch mutant
existed). Both trees are `git archive HEAD` + an overlay of β2's five uncommitted files
(`scripts/import-dag.mjs`, `demo/router.ts`, `demo/shell/AppShell.vue`,
`src/components/_shared/feedback/README.md`, `src/components/alert/index.ts`) — nothing from
any other lane, so the reading is deterministic against a four-lane tree.

The mutant is the **bypass shape**, planted at `AppShell.vue:12`:

```
import "../../demo/router"; // MUTANT — bypass-shaped M03 restoration (scratch only)
```

It closes the cycle against `demo/router.ts:94`'s `import("./shell/NotFound.vue")`.

**CONTROL** — `node scripts/import-dag.mjs`, `REAL_EXIT=0`:

```
nodes            853
modules          107
internal edges   2318
external edges   598
unresolved       1 imports · 0 globs
leaf modules     16
module SCCs      full 3 · value 3
  M01 (15 members)  demo/chassis* + demo/stories*      #58/#56
  M02 (8 members)   _shared dock menu search select tabs glass motion
  M03 (2 members)   src/components/dialog · src/components/sheet   #21 — library modules
(stderr empty)
```

**MUTANT** — same command, same tree + the one planted line, `REAL_EXIT=1`:

```
internal edges   2319          (value 1699 → 1700)
module SCCs      full 4 · value 4
  M03 (2 members)
     demo                               UNOWNED
     demo/shell                         UNOWNED
  M04 (2 members)
     src/components/dialog              #21 — library modules
     src/components/sheet               #21 — library modules

stderr:
FAIL-CLOSED: 2 module(s) inside a cycle carry no owner in OWNER_MANIFEST: demo, demo/shell
```

**The delta is exactly the cure's claim**: +1 internal value edge, the cycle re-forms, both
its members resolve to no owner, the census exits 1. Before the strike this same mutant
exited **0**.

### 7.3 · C1 hardening — the widened tripwire, stated as a widen

The arm's regex went from `/\bfrom\s*["'](\.\.(?:\/\.\.)*\/router)["']/g` to
`/\b(?:from|import)\s*\(?\s*["']((?:\.\.\/)+(?:demo\/)?router(?:\.ts)?)["']/g`. **Trivial,
so taken.** Behaviour on the eight shapes that matter (NEW / OLD):

```
NEW    OLD    case
true   true   from "../router"
true   true   from "../../router"
true   false  from "../../demo/router"
true   false  from "../router.ts"
true   false  import("../router")
true   false  import "../../demo/router";
false  false  from "./router"          ← deliberately unmatched, still unmatched
false  false  from "vue-router"        ← deliberately unmatched, still unmatched
```

It remains a **tripwire**: it reads text and only ever catches shapes it was taught. The
comment says so, and names the census as the lock.

### 7.4 · C2 — verified on disk before the strike

`demo/demo.css` carries `@mkbabb/glass-ui/fonts/…` at **`:12` only, inside the header
comment**, whose own text says the bare specifier does NOT resolve in Vite's demo context.
Its four live reads are `../src/fonts/…`:

```
35:    src: url("../src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin.woff2")
48:    src: url("../src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin-ext.woff2")
63:    src: url("../src/fonts/fira-code/fira-code-latin.woff2") format("woff2");
75:    src: url("../src/fonts/fira-code/fira-code-latin-ext.woff2")
```

The **`./fonts/*` REFUSAL is unchanged** — it never needed `demo.css`; it stands on the
shipped `src/styles/fonts.css:85,101,123,138`.

### 7.5 · C3 — the two drifted self-cites, verified before re-pinning

Both drifted by exactly the **+23 lines** this unit's own `## 9.0.0 — UNRELEASED` section
inserted into `MIGRATION.md`:

```
MIGRATION.md:931-934  → now the Aurora* rows (AuroraInstance, AuroraInteractivity, …)
MIGRATION.md:954-957  → the four Canvas2D* rows, struck to `root barrel`   ✔ re-pinned
MIGRATION.md:743-746  → now the motion-curves removal paragraph
MIGRATION.md:766-769  → `/styles/theme` "without the component cascade"    ✔ re-pinned
```

Bracket split, counted rather than asserted (`grep -c 'W1 SURFACE'`):

```
demo/shell/BottomDock.vue                      0
demo/shell/SidebarDock.vue                     0
demo/stories/display/dark-mode-toggle.vue      1   (:48)
demo/stories/feedback/progress.vue             1   (:247)
```

**2 of 4**, not "each". The disposition never rested on the bracket and is unchanged: all
four are α's #47 W1 prop strike, all four stay UNTOUCHED.

### 7.6 · POST-CURE RE-VERIFY — real exit codes, `$?` direct

| command | real exit | figure |
|---|---|---|
| `node scripts/import-dag.mjs` | **0** | `853 nodes · 107 modules · 2318 internal · 598 external · 1 unresolved · module SCCs 3/3` — **unchanged by the cure** |
| `npx vue-tsc --noEmit` | **0** | clean, no output |
| `node scripts/gate-register.mjs` | **0** | receipt **byte-identical** |
| `npx vitest run tests/demo/router-field-ownership.test.ts` | **0** | `Test Files 1 passed (1) · Tests 3 passed (3)` |

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**Residue is untouched by the cure.** `G-BUNDLE-RATCHET` stays lawfully RED by route
(`2607399 < 2633353`, β2's share `−171 B`), `RT-β1-E`'s `boot-graph` staleness stays at
batch close, and `RT-21-A..E` / `RT-β0-B` carry as written. The adjudicator's own
observations are banked here so the next reader does not re-discover them: **census nodes
853** (`+1` = β2's `feedback/README.md`; `.md` is resolvable in the walker — no false
figure), and **the instrument now prints `dialog`↔`sheet` positionally as `M03`** — the
dissolved `demo`↔`demo/shell` M03 is a historical label and the two must not be conflated.
