# BK #71 W-EYEGLASS — COMPLETION SEAT RECORD

**Model asserted at seat open, before the first byte: `claude-opus-5[1m]`** (Opus 5, 1M
context). Opus, as the lane requires.

**Seat:** completion, not design. The lane was designed and mostly implemented in-tree; this
seat closed the one routed item it still owed, struck the three committed texts that item
falsified, gave the engine its first direct coverage, and fenced the result.

---

## §0 · STEP-0 BASELINE, banked before any byte

| item | value |
|---|---|
| baseline diff | `/tmp/bk-lane71-baseline-1786242213.diff` (`git diff -U0`, 175,055 B, 2,947 ln) |
| HEAD | `727f672327fcd5cdc18e37a43d2da0e15f171bf6` |
| porcelain | **63** |
| untracked (`-U0` is blind to them, enumerated separately) | **7** — `docs/tranches/BK/execution/2026-08-08-lane32-completion/` · `…lane33-completion/` · `…lane35-completion/` · `src/components/slider/styles.css` · `src/composables/motion/morph/eyeglass.ts` · `tests/gates/feedback-tint-seam.test.ts` · `tests/gates/tabs-seam.test.ts` |
| post-seat porcelain | **66** (+3 = `MIGRATION.md`, `src/components/toggle-group/ToggleGroup.vue`, `tests/composables/motion/useSelectionIndicator.test.ts`) |
| post-seat untracked | **8** (+1 = the test file) |

**THE TREE WAS RE-DERIVED, NOT INHERITED FROM THE PROMPT.** HEAD is unchanged from #33's,
#35's and #32's opens, so **all three lanes' dirt is still in-tree, pending-commit by the
driver** — foreign, untouched. #40 W-PAGER's bytes are absent (`85c322dd`), which is what
keeps `npm run build` green; #84 W-TOGGLE-ROW's are committed (`60a64339`), which is why
`ToggleGroup.vue` was clean at this seat's open.

---

## §1 · THE ADJUDICATION, READ OFF THE CURSOR AND OFF THE PRIOR SEATS

⊕⁶⁰ measures the split per-hunk, taken before #84 wrote a byte
(`EXECUTION-PROGRESS.md:2583`):

> `useSelectionGroup.ts` 84 of which **60** (#32/#35's `deform` owns 24) ·
> `useSelectionIndicator.ts` 204 of which **35** (**#71 W-EYEGLASS owns 169**)

and ⊕⁵⁹ (`:2544`) puts **10 / 18** of `scale-paper.css` on this row. Both figures still
reproduce at this seat. #32's own completion seat then claimed `segmented.css` (199/131)
**wholly** and routed `useSelectionIndicator.ts` · `eyeglass.ts` · `scale-paper.css` here
(`lane32-completion/RECORD.md:46,48,97`). So:

- **`useSelectionIndicator.ts` · `eyeglass.ts` · `scale-paper.css` are #71's** — mine.
- **`useSelectionGroup.ts`'s `deform` hunks are #32's** — foreign; this seat added two hunks
  of its own to that file and they are fenced to the line in §3.
- **`segmented.css` is #32's by #32's own claim**, including the eyeglass PAINT. #71 owns the
  LAW (`eyeglass.ts`) and the WRITER (`useSelectionIndicator.ts`); #32 owns the sheet that
  arms and paints it. Not re-claimed here — that would double-count a banked census.

---

## §2 · THE COMPLETION LEDGER

### C-1 · RT-84O — the dead measure, economized at its source `[LANDED]`

⊕⁶⁰ convicted #84 of writing a false comment while convicting eleven others of the same
class, and separated the truth from the fix: *"Both the truth and the economization were
separable, and only the truth was this row's to take — RT-84O routes the dead measure to
**#71**, which holds 169/204 of that file in flight."*

`updateSingleSlider` now returns before its first `getBoundingClientRect()` when
`indicatorRef` is null. **Measured: the pre-change engine took 4 rect reads on mount alone
for a caller with no indicator** (two per pass, two passes — the `containerRef` post-flush
watcher and `onMounted`), plus two more per model change and per `ResizeObserver` callback,
into a `singleSliderStyle` nothing could paint. It now takes zero.

**THIS IS ONLY SAYABLE BECAUSE THE SENTINEL WAS DE-OVERLOADED**, and that is the whole reason
the routing pointed here rather than at #84. `indicatorRef` used to mean two things at once —
"this group has no single slider" to `useSelectionGroup`, "this material does not squish" to
the writer — so acting on either meaning lied about the other. This lane's `deform` param took
the second meaning; what is left means exactly one thing, and one thing can be acted on.

**The `ResizeObserver` still attaches unconditionally.** #84's Safari-identical guarantee is
about there being one measure PATH, not about running it into nothing. Untouched.

### C-2 · a speculative watcher, written and struck in the same seat `[STRUCK]`

The guard was first paired with a `watch(indicatorRef, …, { flush: "post" })` so a
late-arriving indicator would re-measure. **It was struck when a scratch-copy probe showed it
greened nothing the container watcher did not.** The grounds are structural and on disk: the
indicator is a CHILD of the container in both consumers that read the style
(`SegmentedTabs.vue:333` holds `containerRef` on the strip root and `:361` the indicator
inside it; `DockLayerGroup.vue:225`/`:266` the same), so the two can only arrive together and
the existing `containerRef` watcher already re-measures on arrival. A guard against a shape
the library does not have is a shape nobody maintains. The arrival path is now held by a
CASE instead of by an assumption.

### C-3 · three committed texts struck in place, dated `[LANDED]`

The economization falsified three pieces of committed prose. All three are struck with `~~`
and bracketed, never deleted — the routing that produced the fix stays legible.

| file | what it asserted | disposition |
|---|---|---|
| `src/composables/motion/morph/useSelectionGroup.ts:83-87` | *"The MEASURE does not no-op … Economizing it is the indicator writer's own change to make."* | struck + `[2026-08-08 · BK #71 W-EYEGLASS, RT-84O …]` — true at #84's HEAD, false at this one |
| `src/components/toggle-group/ToggleGroup.vue:100-107` | *"It does NOT silence the measure … routed RT-84O → #71"* | struck + dated bracket; the route it names is now closed |
| `MIGRATION.md:1188` | *"there is no named eyeglass variant"* | still TRUE and kept; bracketed because a consumer now meets `--eyeglass-span-max` in the tabs sheet and needs to know it is a different construct wearing the same name, and that **none of the three struck `--eyeglass-*` tokens comes back** |

### C-4 · the engine's first direct coverage `[LANDED]`

`tests/composables/motion/useSelectionIndicator.test.ts` (221 ln, untracked). **SEATS +0** —
it claims no §B.5 gate name and lives with the engine's siblings
(`tests/composables/motion/useElementMorph.test.ts`), not in `tests/gates/`. The register
receipt is byte-identical, confirmed after it landed.

Three cases, and the record states which is born-RED and which is not:

| case | verdict against the pre-change engine |
|---|---|
| no indicator element → **zero** layout forced, mount through model change through resize | **BORN-RED**: `expected 4 to be +0` |
| indicator present → measures exactly as it always did (`100px` × `40px`, `opacity: "1"`, resize re-measures) | **GREEN both sides** — it asserts nothing changed, and nothing did |
| REGRESSION — a strip that arrives late (container + indicator in one `v-if`, the `DockLayerGroup` shape) is measured on arrival | **GREEN both sides**, and it says so in its own title and header. Not born-RED: the old engine measured nothing either while the strip was absent, having no buttons to measure. It holds the structural fact C-2's strike leans on |

Born-RED was taken **on scratch copies, never `git checkout`**: the current engine was copied
to the scratchpad, the guard excised, its relative imports re-pointed at `@glass`, and the
case run against it through a scratch vitest config aliasing
`@glass/composables/motion/morph/useSelectionIndicator` at the RED file. A second variant
(guard PRESENT, watcher ABSENT) is what convicted the watcher in C-2.

### C-5 · SE-5's negative, verified on disk `[VERIFIED]`

`TERMINAL-ROSTER.md:221` rules that C1/C5's `armGlassRefract`/`supportsBackdropRefract`
construction is dead by #2's Φ0 delete and states it *"so no build re-imports what Φ0
removed"*. Detector, verbatim: `rg -n "armGlassRefract|supportsBackdropRefract" src demo` →
**no output**. The pair is absent from the tree and nothing in the eyeglass path reaches for
it.

### C-6 · the lane's designed surface, re-verified rather than re-built `[VERIFIED]`

Everything else the row owns was already on disk and gated by #32's `tabs-seam` arm (e). Not
touched at this seat; confirmed present:

- `eyeglass.ts` (231 ln) — the law: `EYEGLASS_SPAN_MAX 1.6` · `EYEGLASS_SWELL_MAX 1.22` ·
  `EYEGLASS_EDGE_RATIO 2` with `EYEGLASS_ORIGIN_FRACTION` **derived** from it (`f = 1/(1+R)`)
  and `EYEGLASS_OVERFLOW_LICENSE` **derived** from the swell — two independent measurements
  agreeing at ~11%/~10%, written once so they cannot drift · `CASCADE_RANKS` + `CASCADE_RANK_MS`
  reconciling the codex's rank ladder and its milliseconds through the display frame.
- `useSelectionIndicator.ts` — the writer: the `deform` policy (`plate`/`mark`/`none`), the
  surface-armed eyeglass block, and the DELETION of the second area-inflation channel
  (`--tab-blob` + `DEFAULT_INDICATOR_BLOB_MAX` + the `blob × stretch ≤ ~1.14` composed-area
  fence). `rg "tab-blob|BLOB_MAX|liquidBlob"` finds it only in prose recording its removal.
- `scale-paper.css` (10 / 18) — `--tab-indicator-blob-max` gone with its channel.

---

## §3 · THE FENCE, measured per-hunk, foreign totals taken BEFORE the first byte

| file | baseline | now | **this seat's** | foreign |
|---|---|---|---|---|
| `src/composables/motion/morph/useSelectionIndicator.ts` | 123 / 46 | 156 / 46 | **+33 / −0** | 0 — the file is wholly #71's (169/204 at ⊕⁶⁰) |
| `src/composables/motion/morph/useSelectionGroup.ts` | 18 / 3 | 27 / 5 | **+9 / −2** (two `-U0` hunks: `@@ -83 +84 @@` 1/1 and `@@ -87 +88,8 @@` 8/1) | **18 / 3 — #32's, byte-identical to baseline** |
| `src/components/toggle-group/ToggleGroup.vue` | clean | 11 / 2 | **+11 / −2** | 0 |
| `MIGRATION.md` | clean | 8 / 1 | **+8 / −1** | 0 |
| `tests/composables/motion/useSelectionIndicator.test.ts` | absent | ?? 221 ln | **all** | 0 |
| `src/styles/tokens/scale-paper.css` | 10 / 18 | 10 / 18 | 0 — #71's, untouched this seat | — |
| `src/components/tabs/styles/segmented.css` | 199 / 131 | 199 / 131 | 0 | **#32's, by #32's own claim** |
| `src/composables/motion/morph/eyeglass.ts` | ?? 231 ln | ?? 231 ln | 0 — #71's, untouched this seat | — |

**The `useSelectionGroup.ts` split reproduces arithmetically to the line**: 27 − 9 = 18 and
5 − 2 = 3, exactly the baseline figures. That is the check ⊕⁵⁹ paid for one file over and
this seat ran rather than assumed.

**ONE COUPLING, DISCLOSED — the same one #32 disclosed, from the other side.** #32's
`useSelectionGroup` hunk imports `type SelectionDeform` from #71's `useSelectionIndicator`.
Neither share compiles alone. They land in either order or together; the driver's index
surgery is the `#80` per-hunk precedent.

---

## §4 · ROUTED, no bytes taken

| id | finding | owner |
|---|---|---|
| RT-71A | **the dispersion-rim register** (RT-32A, routed to "#22 / #71" with #32 as first consumer). **NOT BUILT, and this seat concurs with #32's three grounds rather than overriding them**: the register's home is shared across the codex's four C1 rows (`#32 · #47 W4 · #2 · #22`), a completion seat inventing an ungated unmeasured light channel by taste is what `eyeglass.ts` refuses in its own header (*"Nothing here is tuned by taste"*) and what the no-masking-fallback law forbids, and its paint would land in `segmented.css` — **#32's file**. Two things this seat adds: SE-5's negative is now VERIFIED on disk (C-5), and the substrate the substitution would sit on EXISTS — `--specular-x` / `--specular-y` / `--specular-intensity` are live `@property` registrations at `src/styles/tokens/property-regs.css:55,61,93`. **#22 is CURE-CUT per the cursor, so the register currently has no live executing owner** | driver — needs a live seat named, or a design loop, not a completion seat |
| RT-71B | `G-TABS-SEAM` seat binding (#32's RT-32B) re-observed and unchanged: the seat is EXECUTABLE (`tests/gates/tabs-seam.test.ts` names it in its live `describe`) but NOT bound in `SEAT-BINDING.json`, so the receipt reads `bound:8 … unbound:50`. Binding it moves the receipt and the file is still untracked, so a clean checkout would RED. Not bound here either | driver / batched binding cut |
| RT-71C | `tests/composables/**` is OUTSIDE the standing verify's subset (`tests/styles tests/components tests/gates`), so this lane's new case — and the 41 files / 222 tests already living there — do not run in the battery every lane reports. Run separately here and GREEN; flagged because a suite nobody's standing gate executes is a suite that rots | driver / #66 |
| RT-71D | **an observed flake, recorded so it is not later mistaken for a lane regression.** `tests/components/dropdown-menu.contract.test.ts > keeps the click branch to one portaled menu and restores focus on execute` failed on ONE of four battery runs at this seat (`expected <body><div data-v-app>…` to be `<button …>`) and passed on the other three, including both post-edit runs. This lane touches nothing within reach of it | driver |

---

## §5 · STANDING VERIFY — verbatim

```
$ npx vue-tsc --noEmit
(no output — exit 0)

$ npx vitest run tests/styles tests/components tests/gates
 FAIL  tests/styles/emitted-utility-vars.test.ts > emitted component utilities > routes the emitted transition-duration chain through --duration-fast
 FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the eager graph stays under the modulepreload and byte ceilings
 Test Files  2 failed | 160 passed (162)
      Tests  2 failed | 1543 passed | 5 expected fail (1550)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0

$ npm run build
✓ built in 476ms
declaration entries: projected 61 public entries
{"type":"glass-ui:ready","generation":"ddf6eae9101a27ae5be2a297de2e6f678a6a54d3384341b95dd31355c5e570f9",…}

$ npm run demo:dist:build
✓ built in 1.10s

$ node scripts/regen-exports.mjs
SYMBOL-FIDELITY EXISTENCE: 61 sources checked, 0 failed
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.

$ npx vitest run tests/composables            # the lane's own new case + its siblings
 Test Files  41 passed (41)
      Tests  222 passed (222)
```

**ZERO failures added; zero subtracted.** The two standing failures are the banked pair —
`boot-graph` → **#66** (63 modulepreloads vs a ceiling of 60) and `emitted-utility-vars` →
**#85** (`expected '0s' to contain 'var(--duration-fast'`). The expectation was hit on the
pre-byte baseline run and on **two consecutive post-edit runs**.

**ONE ORDERING FACT WORTH THE NEXT SEAT'S TIME.** `boot-graph`'s *staleness* arm
(`dist-demo/index.html is STALE … run npm run demo:dist:build`) fires as a THIRD failure the
moment any source file is edited, and clears only after `npm run demo:dist:build`. It is not
a regression and it is not the ceiling arm — a seat that reads "3 failed" before rebuilding
the dist-demo has read a clock, not a defect.

---

## §6 · THE LESSON THIS SEAT PAID FOR

**A SAFETY WATCHER IS A CLAIM, AND CLAIMS GET MEASURED.** The `indicatorRef` watcher in C-2
was written for the best possible reason — an economization must not turn into a silent
dead-indicator bug on the library's own dock — and it was wrong, because the shape it guarded
does not exist: every consumer nests the indicator inside the container, so the container
watcher already covers arrival. It cost one scratch-copy run to find out, and the run was only
possible because the case had been written FIRST. **The general form: a guard added "just in
case" is untested by construction — the case that would prove it necessary is the case nobody
writes, because writing it is what shows it isn't.** Two scratch variants (guard-out, and
guard-in/watcher-out) separate a fix from its speculation in about a minute, and the second
variant is the one seats skip.

**AND THE SECOND, WHICH IS ⊕⁶⁰'S OWN LESSON ARRIVING ONE ROW LATER.** #84 was convicted of
writing a twelfth false comment in the cut that convicted eleven. The comment it wrote was
*accurate* — and it became false the moment the routing it named was executed. **A comment
that describes a routed defect has an expiry date the routing sets**, and the row that closes
the route owns striking every site that described it. Three sites here, in three different
files, two of which no grep for `RT-84O` would have found (`MIGRATION.md` names neither the
route nor the row).
