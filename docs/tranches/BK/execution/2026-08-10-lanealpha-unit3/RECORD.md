# LANE α — UNIT 3 (α3) · RECORD

**SCOPE AS DISPATCHED:** #47 GF-DOCK **W1–W9** per the ratified lane text.
**SEAT:** implement · `modelId: claude-opus-5[1m]` (asserted at open; the assertion gated the chain).
**TREE:** SHARED. Zero `git add` / `commit` / `stash` / `checkout` by this seat. The driver commits.
**DATE:** 2026-08-10.

**THE ONE-LINE VERDICT.** W1–W9 does **not** fit inside Lane α's fence, and this is measurable
rather than arguable: the smallest possible first act of #47 — the W1 prop cut alone — mints
**60 type errors, 36 of them on 13 files outside the fence**, and GF-DOCK's own §9 ROUTED already
assigns those files to *a marked consumer addendum*, i.e. to a different commit in a different
tranche. So this seat banked the measurement, landed the four in-fence acts that are provably
**dead by construction** (zero possible paint delta, zero consumer reach), and refused the rest
**on fence and on the spec's own routing** — not on merit.

---

## §0 · STEP-0 BASELINE — banked before a byte

```
$ git diff -U0 > /tmp/bk-lanealpha-baseline-1786385663.diff
  408,529 bytes
$ git status --porcelain | wc -l
  50
```

Untracked at open, enumerated (16 paths — none α's):

```
docs/tranches/BK/execution/2026-08-10-lanebeta-unit2/{PASTE-BLOCKS,RECORD}.md
docs/tranches/BK/execution/2026-08-10-lanedelta-unit2/{PASTE-BLOCKS,RECORD}.md
docs/tranches/BK/execution/2026-08-10-lanegamma-unit2/{PASTE-BLOCKS,RECORD}.md
scripts/comment-census.mjs
src/components/fourier-field/clock.ts
src/components/fourier-field/renderer/{mint,uniforms,wgpu}.ts
src/components/fourier-field/shaders/{compute,render}.wgsl.ts
src/components/fourier-field/useFourierField.ts
tests/components/custom/aurora/harness.test.ts
tests/gates/comment-ratio.test.ts
```

HEAD at open `612717e5`. **HEAD moved under this seat mid-run** to `79d9ca2f`
(*"feat(aurora): land BK #49 W0 W-AURORA-HARNESS"* — Lane γ). No α surface was touched by it;
re-verified at close. Porcelain fell 50 → 40 as concurrent lanes committed their own dirt.

**Foreign dirt, named and left alone:** `src/components/aurora/**`, `src/components/fourier-field/**`,
`src/styles/tokens/**`, `demo/stories/substrates/**`, `tests/public-surface.spec.ts`,
`tests/styles/material-css-syntax.test.ts`, the three sibling lanes' unit-2 records. Not α's, not
touched.

---

## §1 · CENSUS — the born-RED figures re-derived on disk at open

The lane text ordered the censuses re-derived rather than inherited. They are, and **two of the
three handed figures had already moved**.

| figure | roster / lane text | **measured this seat** | detector |
|---|---|---|---|
| dock files | 45 (roster) / 43 (lane text) | **44** | `find src/components/dock -type f \| wc -l` |
| dock lines | 8,046 | **8,182** | `find src/components/dock -type f -exec wc -l {} + \| tail -1` |
| CSS partials | 19 | **19** ✓ | `find src/components/dock -name "*.css" \| wc -l` |
| `DockProps` members | 14 | **14** ✓ | enumerated from `useDockShellProps.ts:18-158` |

The 14, enumerated so the 14→6 cut has a written subject: `fitContent` · `position` ·
`backdropMode` · `alwaysExpanded` · `shape` · `orientation` · `size` · `overflow` ·
`collapseDelay` · `startCollapsed` · `interaction` · `layout` · `backgroundCanvas` · `search`.

**The lattice is entirely unbuilt** — confirming W3 is greenfield, not a retune:

```
grep -rn "dock-pitch|dock-seat|dock-open-pitches|useDockRun" src/   → 0
grep -rn "scroll-snap-type" src/components/dock/                    → 0   (5 elsewhere in src/)
```

---

## §2 · THE FENCE MEASUREMENT — why W1–W9 did not land, in figures

Not asserted. Reproduced **born-RED via git-archive scratch-copy**, the mandated route.

**Control** — clean `git archive HEAD`, no edits:

```
$ npx vue-tsc --noEmit                        → CTRL_TSC1_EXIT=0   0 errors
$ npx vue-tsc --noEmit -p tsconfig.test.json  → CTRL_TSC2_EXIT=2   2 errors
    tests/components/custom/fourier-field/FourierField.smoke.test.ts   (foreign, HEAD-state)
```

**Probe** — same archive + **only** the W1 surface cut (the 7 struck props deleted, the 2 folded
props removed; `DockProps` left holding exactly `backdropMode · backgroundCanvas · fitContent ·
orientation · shape`, which with the new `collapse` member is the spec's 6):

```
$ npx vue-tsc --noEmit                        → PROBE_TSC1_EXIT=2   45 errors / 14 files
$ npx vue-tsc --noEmit -p tsconfig.test.json  → PROBE_TSC2_EXIT=2   17 errors /  4 files
```

Attributed (probe minus control):

| area | errors | in Lane α's fence? |
|---|---|---|
| `demo/**` — 12 files | **33** | **NO** |
| `tests/components/custom/dock/GlassDock.interaction-manual.test.ts` | **3** | **NO** |
| `src/components/dock/{GlassDock.vue,composables/useDockShellProps.ts}` | 24 | yes |

The 12 demo files: `stories/dock/{overview,layers,controls,vertical,sections,overflow,dock-search,cta-receive}.vue` ·
`stories/feedback/progress.vue` · `stories/display/dark-mode-toggle.vue` · `shell/{BottomDock,SidebarDock}.vue`.

`tsconfig.json` includes `src/` **and** `demo/`; `tsconfig.test.json` includes `tests/`. So the
verify gate's own command — `vue-tsc 0` — cannot be satisfied by an in-fence-only W1.

**And the cure is not merely out of fence, it is already routed elsewhere.** GF-DOCK §9 ROUTED:

> `demo/shell/BottomDock.vue` edits (FadingScroll, the 672 cap, chevron bodies, command-aperture
> strip) → **marked consumer addendum** per the consumer-updates ruling

with `GlassDock.scroll-overflow.test.ts:22,27` routed to *"the close battery, listed, never an
unlisted RED."* The spec assigns these bytes to another commit. A lane that wrote them anyway
would be taking work the spec gave away.

### §2b · The second, independent fence collision — W2's subject is under another lane's hand

W2 SCALE strikes the ×1.17 coarse inflation (`--ui-scale 1.5 × --dock-coarse-scale .78`). Its
subject is split across two files, and **only one is in fence**:

- `src/components/dock/styles/overflow.css:250-337` — in fence, but W3 deletes the whole file
- `src/styles/tokens/sizing.css` — **out of fence, and dirty under a concurrent lane right now**

```
$ git status --porcelain src/styles/tokens/sizing.css        →  M
$ git diff -U0 -- src/styles/tokens/sizing.css | grep -c dock
    added dock lines: 40 · removed dock lines: 108
```

That concurrent diff is a comment-compression pass over **exactly** the `--dock-scale` /
`--dock-local-scale` / `--dock-mobile-scale` / `--dock-coarse-scale` definitions W2 must rewrite.
Writing W2 now is a head-on collision on a shared file mid-edit. Where the dock's tokens are
defined, measured:

```
src/components/dock/styles/*.css   →  ~114 --dock-* definitions   (in fence)
src/styles/tokens/sizing.css       →    31                        (OUT, and dirty)
src/styles/tokens/{offsets,scroll-tokens,glass}.css → 5           (OUT)
```

### §2c · Why the in-fence deletions could not lead

Each of the remaining early strikes is in fence but **removes a live capability with no
replacement**, because its replacement is a later, paint-gated wave:

- `styles/shape.css:61-110` — the no-op `from≡to≡--radius-dock` lerp. Confirmed no-op on disk. But
  shell.css:161 names shape.css *"the single radius authority"*, so striking it alone leaves the
  dock **square** until W5's cut cap lands. Sequenced, not deferred by choice.
- `styles/overflow.css` (339) + `useDockOverflowFit.ts` (88) — the only overflow handling the dock
  has until W3's lattice replaces it.
- `useDockTouchGate.ts` (97) — *"superseded outright by touch-action + snap"*. The snap scroller
  does not exist (`scroll-snap-type` → 0 hits in dock). Deleting first removes tap-to-expand on
  touch with nothing behind it — a masking-free but functionality-deleting act.

---

## §3 · WHAT LANDED — four acts, each dead by construction

The bar this seat held: **land only what cannot change a rendered pixel**, since per-wave paint
acceptance requires the singleton browser seat and this seat has none. All four clear it by
detector, not by argument.

### ACT 1 · `@container dock` producer-or-delete — o19 A-17 G-6 @W1 · DISCHARGED

`src/components/dock/styles/density.css` — the two `@container dock` blocks at `:432` and `:437`
deleted; a dated strike-in-place bracket carries the ruling and the detector.

A `@container <name>` query matches only against an ancestor carrying both `container-name` and a
`container-type`. Neither exists:

```
$ grep -rn "container-type" src/                          → 10 hits, ALL prose;
                                                            0 declarations in src/components/dock/**
$ grep -rn "containerName|container-name" src demo tests   →  8 hits, ALL prose
$ DockProps members                                        → 14, and containerName is not one
```

`shell.css:141-162` named the producer as a `containerName` prop and **that prop was never
authored**. Delete beats author here on the tree's own evidence: `container-type: inline-size`
carries `contain: inline-size`, which shell.css:136-147 records as the exact cause of the 3.3.0
sliver regression (every horizontal dock collapsed to its padding floor). The producer is the
known defect; the consumer was its only caller.

**Born-RED → GREEN, by the mandated scratch-copy route:**

```
detector: grep -rnE "^[[:space:]]*@container[[:space:]]+[a-zA-Z-]+[[:space:]]*\(" src/components/dock/

  git-archive HEAD control  →  2 hits (density.css:432, :437)   · producers: 0   → RED
  working tree, this seat   →  0 hits                            · producers: 0   → GREEN
```

### ACT 2 · `.dock-items-draggable` — GF-DOCK **R-E**, all dock drag struck

`src/components/dock/styles/controls.css:53,56` — both rules deleted, ruling bracketed in place.

```
$ grep -rn "dock-items-draggable" src/ demo/ tests/  → 2 hits, and BOTH were these two selectors.
                                                       ZERO emitters, anywhere.
$ grep -rn "useDockItemDrag" src/                    → 1 hit, the PROSE above them.
```

A mechanism documented in the present tense, gated on a class nothing sets, driven by a composable
never on disk. No computed style can differ. R-E rules the merits independently (under
`touch-action: pan-x` the inline gesture is the scroller's; a block-axis drag on a route dock has
no named commit semantics; commit is tap/click/keyboard).

**Deliberately NOT touched:** `.glass-drag-lift` is **live** on the layer switcher
(`DockLayerGroup.vue:270`, `.glass-drag-grabbable` at `:230`), with rules in
`src/components/tabs/styles/drag.css`. That is switcher drag, not dock-item drag — out of scope
and out of fence.

### ACT 3 · `containerName` prose — struck as **never-true**

`shell.css` — two paragraphs promising a `containerName` opt-in, bracketed `[2026-08-10 · BK #47
W1]`. Struck as never-true rather than newly-retired: `DockProps` has held 14 members for the life
of the file and `containerName` was never among them, so the opt-in had no way to be taken. It was
the **sole documentation of a prop that does not exist.**

### ACT 4 · `.glass-dock-frame` prose — struck as describing a retired surface

`GlassDock.vue:38-44` — the attrs-contract comment described `.glass-dock-frame` as live
structural chrome. `styles/dock.css:206` retired that frame when the fan/menu/search surfaces
became top-layer popovers:

```
$ grep -rn "glass-dock-frame" src demo tests → 2 hits, BOTH prose (this comment + the
                                               dock.css line that retired it).
                                               0 CSS rules · 0 rendered elements.
```

Rewritten so `inheritAttrs: false` is justified by what it actually does (single `.glass-dock`
root) rather than by keeping a wrapper transparent.

**Diffstat, this seat — 4 files, all inside `src/components/dock/**`:**

```
 src/components/dock/GlassDock.vue       | 22 ++++++-----    (+15 −7)
 src/components/dock/styles/controls.css | 46 +++++++------   (+29 −17)
 src/components/dock/styles/density.css  | 56 +++++++-------   (+32 −24)
 src/components/dock/styles/shell.css    | 34 +++++++-----    (+23 −11)
 4 files changed, 99 insertions(+), 59 deletions(-)
```

---

## §4 · HANDOFF CENSUS — which named W-items are already void

Measured, so the next seat does not re-scout them:

| handoff | wave | on disk | disposition |
|---|---|---|---|
| `@container dock` producer-or-delete (o19 A-17 G-6) | W1 | 2 consumers, 0 producers | **DISCHARGED this seat** |
| dock-tinted-chip named-or-struck | W2 | `grep "tinted-chip" src/` → **0** | **STRUCK by absence** — no subject |
| embla-momentum (D43/D66) | W3 | `grep -rln embla demo/ src/ tests/` → **0** | **no subject in this repo** |
| U-21 `useDockItemDrag` RETIRE | W3 | prose only; class had 0 emitters | **DISCHARGED this seat** (ACT 2) |
| U-21 drill-in STRUCK | W3 | `grep "drill-in\|drillIn" src/` → **0** | **already struck by absence** |
| U-21 silhouette RETIRE | W3 | 25 hits in dock | live — open |
| #72 `--dock-vertical-{padding,extend-length}` | W-reach | 4 hits (`density.css:21,35`, `shell.css:338,396`) | live — open |
| #80 capsule rung (`DockControl.vue:92`) | own seat | live | **not α3's** — lane text seats it separately |
| o19 B-6 `DockCrossfade` export carry | → #76 | path unmoved | no carry owed this unit |

**The #7 fence, cited as the lane text requires it cited in every wave record:**
`src/components/dock/styles/morph.css:67-76` — *NO FILTER ON AN ANCESTOR OF A LENS.* A `filter` on
`.glass-dock`, or on any ancestor of a backdrop-filtered box, `blur(0px)` included, makes that
ancestor a backdrop root and the lens beneath goes flat. **No act of this unit authored a
`filter`** on any dock element; verified `git diff -- src/components/dock/ | grep -c "^+.*filter"`
→ 0.

---

## §5 · VERIFY — real exit codes, this seat, at the close

Every figure carries its own command's exit status. **No piped tail's status was read.**

```
$ npx vue-tsc --noEmit                          → TSC1_EXIT=0    0 errors
$ npx vue-tsc --noEmit -p tsconfig.test.json    → TSC2_EXIT=0    0 errors
$ node scripts/gate-register.mjs                → GATE_EXIT=0
  seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11
  bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
$ npx vitest run                                → BATTERY_EXIT=1
   Test Files  1 failed | 224 passed (225)
        Tests  1 failed | 2005 passed | 6 expected fail (2012)
```

**seats:60 · violations:0 — unmoved, and nothing was minted.** The four DOCK gates the lane text
names are ORDINARY TESTS by the roster's own law
(`GATE-SEMANTIC-ROSTER-C20.json` → `ordinaryTestLaw.ordinaryTestsConsumeBudget: false`), so they
never were seat-budget rows; C20 contains **zero** dock seats and the 60 is untouched either way.

**vue-tsc is 0 on BOTH arms** — including the test project, which the control proved was `2` at
HEAD from the fourier-field lane's in-flight rename. That lane's working-tree state cures it; the
figure is theirs, not this seat's.

### The battery line has lawfully moved, and the ONE failure is not this seat's

The dispatch handed this seat *"1538 passed | 5 xf"*. Measured: **2005 passed | 6 expected fail
(2012)**. It had already moved once at α2 (*1967 passed | 5 expected fail (1975)*); three lanes
have added tests since (`tests/gates/comment-ratio.test.ts`,
`tests/components/custom/aurora/harness.test.ts`, `tests/styles/material-css-syntax.test.ts` are
all untracked additions). Stated with its detector, never reconciled by assertion.

**The single failure was RED at step-0, before this seat wrote one byte:**

```
FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm
     "the dist-demo it measures is NEWER than every source it is built from"
     dist-demo/index.html built 2026-08-10T18:06:53.542Z
     newest source              2026-08-10T18:12:43.392Z
```

At step-0 the sources newer than the build were exactly two, **both foreign, zero dock**:

```
$ find src demo -type f -newer dist-demo/index.html     (at step-0)
    src/styles/tokens/sizing.css                 ← foreign lane
    src/components/aurora/composables/useAurora.ts ← Lane γ
$ ... | grep -c dock  →  0
```

**Pre-change and post-change battery lines are byte-identical** (`1 failed | 2005 passed |
6 expected fail (2012)`, same single test). This unit's acts moved **zero** test statuses.

**NOT cured, deliberately.** The cure is `npm run demo:dist:build`, which would bake three
concurrent lanes' in-flight source into a committed build artifact — a foreign write and a masking
act in one. Stated, never papered.

**The structural finding under it, for the driver:** `boot-graph.test.ts` compares source mtimes
against a **committed** `dist-demo/` build. Under concurrent lanes it is RED for every lane
whenever *any* lane holds dirty `src/` — it cannot be green for α while γ and the token lane are
mid-flight. Like G-BUNDLE-RATCHET, **it is RED by route, and no lane can discharge it alone.**

**G-BUNDLE-RATCHET**, as the dispatch requires it stated: still **RED by route** — the single
batch-close rebind carries β0's +1215 and the driver's −71, so `verify:package`'s ratchet arm REDs
lawfully. Not this seat's, not papered.

**CSS parse re-verified** on all three edited stylesheets (postcss, a direct devDependency):

```
$ node -e "postcss.parse(...)"  → OK density.css (@container=0) · OK shell.css · OK controls.css
  PARSE_EXIT=0
```

---

## §6 · REFUSALS — with grounds, scoped

**REFUSED THIS UNIT — #47 W1–W9 as a build, on FENCE + the spec's own ROUTING, not on merit.**
Grounds are §2's measured figures: 36 of 60 minted type errors land on 13 files outside the fence;
GF-DOCK §9 ROUTED already assigns those files to a marked consumer addendum; W2's remaining
subject is dirty under a concurrent lane; and every early in-fence strike removes a live
capability whose replacement is a later paint-gated wave.

This is the **same fence ambiguity α2 refused and banked**, unresolved in this dispatch. α2 wrote:

> One driver word — *"α owns the #67 src surfaces"* — and the next seat lands all of it without a
> re-scout.

That word did not arrive; the dispatch repeats *"touch ONLY files inside YOUR lane's fence."* This
seat held it for α2's reason, which has only strengthened: **four** lanes wrote this tree during
this run and HEAD moved under it mid-flight. A wrongly-held fence costs one driver word; a
wrongly-crossed one costs a collision on a shared tree with no index acts available to unwind it.

**What the driver needs to decide (one of two, either unblocks the whole of #47):**

1. **α owns #47's consumer cure** — `demo/**` + the dock `tests/**` — as one commit with the src
   cut, GF-DOCK §9's routing notwithstanding; **or**
2. **the consumer addendum is scheduled as a named commit-unit** that lands in the same batch as
   α's src cut, so neither is RED alone.

Until one lands, W1 cannot be committed by anyone without leaving `vue-tsc` RED.

**Additionally refused — per-wave paint acceptance (W3–W9).** The lane's VERIFY GATE requires
*"per-wave owner-paint acceptance as captured DELTA artifacts via the singleton seat (never
commit-message claims)"*, and GF-DOCK §6 conditions the design on π-RUN · π-CUT · π-REACH ·
π-CROSS · π-MORPH · π-SWAP · π-SEAT · π-STATIC in Chromium 149 **and real Safari 26.4**. This seat
owns no browser and correctly opened none. **π cells ENQUEUED to the singleton seat, not claimed.**

Two of those cells are load-bearing enough to name: **π-CUT needs ≥500ms settle plus screenshot
corroboration on Safari** (a synchronous read already nearly banked a false REFUTE of the whole
cut-cap mechanism), and **π-SEAT's dark arm has never been photometered.**

**Standing driver-ratified refusals, NOT re-litigated:** footage (R-7 CONSUMING folds), the
device-matrix rows (real hardware), Safari-app columns (GUI-checkbox class), the physical classes.

**NOT opened, per dispatch:** α4 (#42 W-SEARCH — gated on Lane β's #21 export motion, β2 unrun)
and α5 (#76-tail + #22 cure-cut). `package.json` · `scripts/lib/subpath-policy.mjs` ·
`tests/public-surface.spec.ts` **untouched** — the last is additionally foreign dirt right now.

---

## §7 · FENCE — held

Wrote **4 files, all `src/components/dock/**`**: `GlassDock.vue` · `styles/controls.css` ·
`styles/density.css` · `styles/shell.css` — plus this record and its PASTE-BLOCKS under
`docs/tranches/BK/execution/2026-08-10-lanealpha-unit3/`.

Zero writes to: `demo/**` · `tests/**` · `src/styles/**` · `package.json` ·
`scripts/lib/subpath-policy.mjs` · any sibling repo · any other lane's surface or record. No
`git add` / `commit` / `stash` / `checkout`. Scratch work confined to the session scratchpad
(`w1probe/`, `ctrl/` — git-archive copies, `node_modules` symlinked, never written back).

**Carried open for the next α seat:** OWED-1 / OWED-2 / OWED-4 from α2 (untouched here) · the #47
build in full, awaiting the §6 driver decision · the demo's documented-but-nonexistent
`container-name` prop (`demo/stories/dock/overview.vue:447`, `:503`) — a shipped documentation
falsehood, out of fence, belonging to the consumer addendum.
