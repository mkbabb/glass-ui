# BK #19 — W-DEAD-EXPORT · W-SHIM-PURGE · W-SELECTION-ONE

**Row of record:** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` §A row #19.
**Cited specs:** `WAVES.md:341` (W-DEAD-EXPORT) · `:353` (W-SHIM-PURGE) · `:365` (W-SELECTION-ONE) ·
`COMPONENT-WAVES-TERMINAL.md:1300` O-17 **D-19**. Evidence base: `ROUND-1-FINDINGS.md` F2–F11.
**Routed inbound (from #18's §7 residue table):** RT-18B · RT-18G · RT-18H(b).
**Seat:** scout+implement, `claude-opus-5[1m]`.

---

## §0 · SELECTION GROUNDS

Φ5 rows in TR order: **#18 LANDED-IN-PART** (⊕³⁸, `4bf53962` — two refusals routed, RT-18B/G/H(b)
inbound here) → **#19 UNSTARTED** → #21 (blocked: `#17 hard`, and #17 is Φ4-UNSTARTED) → #22
**SEALED** (⊕³⁵) → #23 LANDED (⊕³⁷). #19 is the next canonical
unstarted Φ5 row, is gated by nothing (its own clause is a hard-PRECEDES on #84, not a wait), and
#18's completion-seal delete — the stated precondition for #26's table cut — has already landed, so no
precedence re-orders it. Selected on that ground.

---

## §1 · WHAT THE THREE WAVES OWN

| wave | owns | born-RED gate |
|---|---|---|
| W-DEAD-EXPORT | C-6/C-7/C-8 — runtime exports with no internal consumer | `G-EXPORT-REACH` |
| W-SHIM-PURGE | family D (D-1…D-7 less D-6) — the no-legacy edict enforced | `G-NO-SHIM` |
| W-SELECTION-ONE | D-6 — one selection engine | `G-ONE-SELECTION` |

All three are **declared ARMS of the standing `G-OVERFIT` seat** at TR §B.5
(`STRUCTURE | 5 | G-OVERFIT (+EXPORT-REACH/NO-SHIM/fallback/ONE-SELECTION/…)`), so this cut BINDS
executables under an existing seat and **mints nothing**. Seat budget stays exactly **60**.

---

## §2 · THE BORN-RED CENSUS (detectors verbatim, measured pre-cut)

Detector: `tests/gates/overfit-structure.test.ts` — the COMMITTED file, run against a pristine
`git archive HEAD` tree. Reference census reads `src/` + `demo/` + `tests/` + **`scripts/`**; a module
that only RE-EXPORTS a name is not a use site of it; the published set is the transitive export
closure of `libraryEntryMap()` (never a hand-list).

Repro, verbatim:

```
$ git archive HEAD | tar -x -C /tmp/h
$ cp tests/gates/overfit-structure.test.ts /tmp/h/tests/gates/
$ ln -s "$PWD/node_modules" /tmp/h/node_modules
$ (cd /tmp/h && npx vitest run tests/gates/overfit-structure.test.ts)
 Test Files  1 failed (1)
      Tests  6 failed | 4 passed (10)
```

| arm | pre-cut (detector's own output) | post-cut |
|---|---|---|
| EXPORT-REACH — leaks (zero external site ∧ unpublished) | **33** in place (**37** with the detector held out of the census — see SELF-MASKING) | **0** |
| NO-SHIM — re-export shims | **26** offender symbols across **14** non-entry modules | **0** |
| NO-SHIM — runtime retired-prop deny-lists | **1** (**38** entries, applied on 6 SFCs) | **0** |
| NO-SHIM — `void`-kept dead consts | **5** (3 in `axes.ts` + 2 found by the detector) | **0** |
| ONE-SELECTION — fork rows (a component composing a house part directly) | **2**, both `SegmentedTabs.vue` (indicator + roving) | **0** |
| ONE-SELECTION — live engine consumers (arm's floor is 2) | **1** (`DockLayerGroup.vue` only) | **2** |

**FIGURE DRIFT, STATED — AND THIS SECTION'S OWN FIRST DRAFT STRUCK.** TR's cell says *"the 22
zero-site exports"* and F11 says *"eight re-export shims"*; both are formation-time figures. This
record's first draft then said ~~**38** leaks and **17** shims~~ [CURED 2026-08-05 · the adjudicated
cure (1)/(2): neither figure was the detector's. **17** was hand arithmetic (*"F11's eight + nine"*)
in a section that claims the executable IS the detector; the committed detector prints **26 re-export
shim(s)** across **14** modules, re-measured this seat. **38** was the leak count taken BEFORE
`scripts/` entered the census (§3(d)) — with the census as committed the same detector prints **33**
in place and **37** with itself held out.] The shim gap to F11 is method, not rot — F11 counted only
the eight it enumerated by hand; the executable finds every non-entry module holding a neighbour's
symbol.

**SELF-MASKING, MEASURED (leak arm only).** `externalSites` matches a bare `\bNAME\b` over raw file
text, so a symbol named in ANY comment under the census roots counts as a use site — including the
gate's own header. In place: **33**. Held out of the census: **37**. The 4-name gap is exactly the
leak names the header quotes (`TOGGLE_GROUP_KEY` · `DOCK_MORPH_MAX_STRETCH` · `MOOD_AVA` ·
`WEBGPU_ACQUIRE_TIMEOUT_MS`). **37 + `springSettleDurationSeconds` = the 38** of the first draft: that
symbol is a leak only under a census without `scripts/`, which §3(d) closed. All three figures
reconcile on the bytes; **33** is what a re-runner sees. Hardening the matcher off raw text is routed
**RT-19B → #65** with the seat bind. Both figures ship with their detector or neither ships (TR#65's
law); the committed executable IS the detector, and it is now the executable that supplies every
number above.

---

## §3 · W-DEAD-EXPORT — the cut

**(a) The leaks (33 in place / 37 detector-held-out — §2).** Every one either lost its `export`
keyword (module-private) or was deleted.
Five were referenced **nowhere at all** and went out whole with their docblocks: `AV_MAX_BLOBS`,
`AV_LOOP_DURATION_MIN_S`, `AV_LOOP_DURATION_MAX_S` (`aurora/constants/budget.ts`),
`DOCK_MORPH_MAX_STRETCH` (`dock/constants.ts`), `TOGGLE_GROUP_KEY` (`toggle-group/toggleGroupContext.ts`).

**(b) The 6 root-barrel tuning constants** — `FOURIER_BIAS_GAIN` · `FOURIER_FOLLOW_LEAN` ·
`BLOB_LEAD_K` · `BLOB_STRETCH_GAIN` · `BLOB_STRETCH_MAX` · `AURORA_CURSOR_RADIUS` — **struck from
`src/index.ts`** (the TR cell's `:238-243` pin had drifted; they sat at ~~`:543-548`~~ [CURED
2026-08-05 · adjudicated cure (5): **`:544-549`** at HEAD — `:543` is `snapshotField`, which SURVIVES.
A row that makes its point on pin precision cannot ship an off-by-one pin] at HEAD, and the
strike is recorded ON the barrel where the pin was). Each is the default an options bag already
exposes as an overridable field, so publishing the literal beside the function it defaults gives a
consumer a second way to say the same thing and a way to drift from it. The public-surface pin drops
the six names.

**(c) The stale barrel doc `src/index.ts:36-37`** — the `/carousel` map advertised `CarouselNext` /
`CarouselPrevious`, deleted at `490cc46e`. **STRUCK** (⊕⁴ lane B §3.4). Under the carousel KEEP this
was a live falsifier of the barrel's own map. TR#19's clause on this line has a CONSUMER-SIDE RIDER —
*"words' `:87-88` imports break on adopt"* — which the TR assigns away by name (*"the rider rides §C's
words row"*). Not acted on here, named in the ledger as **RT-19H → #76**, so the row's clause list has
no silent member.

**(d) A CENSUS HOLE FOUND AND CLOSED.** The first pass privatised `springSettleDurationSeconds`
because it has no `src`/`demo`/`tests` consumer. `scripts/regen-spring-tokens.mjs:26` imports it, and
`springTokenMirror.test.ts` went RED at once. `export` restored; the detector's census set **now
includes `scripts/`**, so a build/regen leaf counts as the real consumer it is. Recorded because the
gate would otherwise ship with the same blind spot that produced the defect.

**(e) TWO DELETION PREMISES REFUTED ON THE §1.1 WALK — neither carried out.** F10 names four published
motion composables with "no src or demo consumer"; its wave shape says to start by retiring
`useAnimatedNumberMap`, "which has literally no reader." A per-symbol whole-repo walk (`atlas`,
`speedtest`, `muster`, `words`, `fourier-analysis`, `sci-report`, `slides`, `keyframes.js`,
`value.js`, `pencil-boil`) says otherwise:

| symbol | live cross-repo writers, measured this seat | disposition |
|---|---|---|
| `useAnimatedNumberMap` | speedtest `features/speedtest/composables/useMetricResult.ts:33`,`:115` · `components/dashboard/charts/MetricGaugeCards.vue:66` · muster `components/verdict/RankedVerdict.vue:42` | **KEEP** |
| `useStagger` | speedtest `useResultReveal.ts:36` · `ResultStack.vue:171` · muster `useVerdictMoment.ts:60` (all off `/motion-core`) | **KEEP** (×3, not the barrel's remembered ×2 — figure corrected on the text) |

Existence ⇒ relay, never ⇒ silent delete (Ruling 1). Both barrel comments now carry the measured walk
so the next census reads it off the tree. `useScrollPin` — F10's fourth — died at #18; `useScrollScene`
is handled at §6.

**(f) `engageEnvelopes.ts` (F9) — REFUSED WITH GROUNDS, ROUTED TO #27.** The finding stands on the
bytes: a 117-line register whose only reader is a test comparing the module to itself, with zero CSS
uptake. But F9's disjunction is *"wire the envelopes into a CSS token generator … or delete"*, and
which limb is right is the ENGAGED-rung question that **#27 W-ENGAGE-LADDER+AFFORD** owns (it holds
`G-ENGAGE-RUNG`, and ⊕²¹ already records the ENGAGED rung as having zero consumers pending a wiring
row). TR#19's cell does not name it. Routed, not decided here. → **RT-19A → #27**.

---

## §4 · W-SHIM-PURGE — the cut

| id | shim | act |
|---|---|---|
| D-1 | `floatingContentAttrs` + the **38**-entry `RETIRED_FLOATING_ATTRS` deny-list (counted on `git show HEAD:src/components/_shared/floating.ts` — 38 string literals; ~~30~~ was never a reading of the file), applied on **6** SFCs (tooltip · popover · dropdown-menu ×2 · select · command) | **DELETED.** `$attrs` forwards untouched; each SFC keeps only the destructure of the attrs IT consumes. A retired prop now lands visibly on reka or errors there — it is no longer swallowed with no error, no warning, and no effect (it was eating `as-child`). |
| D-2 | `useCanvasLifecycle` — a literal `export const X = Y` alias on two public subpaths, zero consumers, declared inside a barrel whose comment says "CLEAN BREAK: no alias" | **DELETED** with both barrel re-exports and the contradicting prose. `/canvas` publishes ONE factory name. |
| D-3 | **26** re-export-shim symbols across **14** non-entry modules (the committed detector's own output at pristine HEAD; ~~17~~ *"F11's eight + nine"* was hand arithmetic — CURED 2026-08-05, adjudicated cure (1)) | **DELETED**; every barrel re-points at the real owner. Struck: `asElement` · `controlSizeClass` · 9 constellation constants + `stepWell` + `BASE_WIDTH` + `DEFAULT_PALETTE` · `VB_W`/`VB_H`/`UNDERLINE_GAP`/`naturalUnderlinePoints` · `isNonZeroRadius` · `sizeBacking` · `supportsWebGPU` · `WebGPUInitError` · `WEBGPU_ACQUIRE_TIMEOUT_MS` · `TRAIL_N` · the 3 tabs indicator constants · `mulberry32`/`hashString` · the 4 aurora color primitives. `src/components/tabs/constants.ts` emptied to nothing and was **deleted**, not left as an "empty by design" file. |
| D-4 | `createCanvasLifecycle`'s `dprPolicy` absent-arm — "the migration seam", every consumer supplies it | **DELETED.** `dprPolicy` is REQUIRED and `resize(s: BackingSize)` non-optional on all three leaves; the `else { options.resize(); }` branch and every `s?.w ?? canvas.width` defensive fallback are gone (6 viz setups). |
| D-5 | three module-load `NATIVE_SCROLL_TIMELINE` ladders over ONE capability | **COLLAPSED to one.** The probe memoises inside `supportsCssTimeline.ts`; the two survivors call the function. `useScrollProgress`'s inert arm is **deleted** — the reader always attaches (see §5). |
| D-7 | `@utility touch-hit-area` — a 44px coarse hit halo whose own comment claims six composing form atoms, applied by **zero** markup in `src/` or `demo/` | **DELETED**, with the dangling override prose at `Slider.vue`. |
| — | the three `void`-kept meta-arrays in `_shared/axes.ts` (`AXIS_TUPLES` · `AXIS_TYPE_NAMES` · `ALLOWED_EXPORTS`) — a hand-maintained manifest of the module's own export names, read by a gate that does not exist, shipped as evaluated bytes in `dist/axes.js` | **DELETED.** |

**REFUSED WITH GROUNDS (F8's second clause).** F8's wave shape also says *"delete the six unconsumed
tuples; make `/axes` genuinely types-only."* Not done, and the reason is on the text: each tuple
DERIVES a live union, and the file's whole purpose is the SUB-RANGE LAW (*a component never mints a
size/orientation/motion/surface union — it declares a RESTRICTION of the one union*). Deleting the
tuples forces those unions to become inline literals, i.e. re-mints exactly what `axes.ts` exists to
prevent, for a bundle-byte win. TR#19 names neither the tuples nor `/axes`. The `void` arrays — which
genuinely governed nothing — went out; the vocabulary stays.

**TWO `void` SUPPRESSIONS THE DETECTOR FOUND BEYOND THE SPEC**, both cured rather than exempted:
`useDockClickIntegrity.ts:239` `void pressedWhileCollapsed;` (the variable was written at two sites and
read only by the `void` — dead state, deleted whole with its stale docblock) and
`useScrollTrigger.ts:262` `void r;` (an unread callback parameter — renamed `_reader` with the reason
stated).

---

## §5 · THE ONE MASKING ARM KILLED

`useScrollProgress` gated its ENTIRE machine behind a module-load `supportsScrollTimeline()`: on a
supporting engine it attached no listener and no `ResizeObserver`, so the returned ref **froze at its
mount value while reading alive at every call site**. Its single consumer (aurora `useAurora.ts:169`)
opted out with `reactive: true`, which is precisely how the arm survived untested in both directions.
That is an inert arm, not a fallback — the no-masking-fallback law. **The reader always attaches**;
the `reactive` option is gone with the branch; the CSS registers in `scroll-driven.css` are simply a
different instrument (a CSS-authored axis never calls the composable at all). The prose at
`scroll-driven.css`, `scroll-tokens.css`, and the aurora call site is re-trued to that.

---

## §6 · W-SELECTION-ONE — the cut

`useSelectionGroup` documented itself as *"the library's single headless selection engine … the dock
control run, `<SegmentedTabs>`, and `<ToggleGroup type="single">` are the SAME thing."* The import
graph contradicted it on TWO of the three: only `DockLayerGroup.vue` composed the engine;
**SegmentedTabs assembled `useSelectionIndicator` + `useTabRovingFocus` directly**, and ToggleGroup
composed neither house part. Either it is the engine or the claim is deleted. SegmentedTabs is now
the engine's second real consumer, and **the third name is struck from the claim rather than left
unbacked** (cure (12), below) — the doc, the SFC header, and the gate header all now say TWO and route
the third to #84. The arm's standard applied to the arm's own prose.

- `SegmentedTabs.vue` composes `useSelectionGroup`. Net ~~**−34 lines**~~ [CURED 2026-08-05 ·
  adjudicated cure (3): **−12**. `git diff --numstat` = `46 58` on the SFC (458 → 446 lines); −34 was
  the deletion side read as if it were the net] in the SFC.
- The responsive projection (a desktop subset that excludes the mobile-selected value falls back to an
  enabled sibling) is expressed as a **writable computed** `stripModel` — reads resolve the strip's
  fallback, writes land on the real `v-model`. Zero engine-surface growth for it.
- ONE engine addition: `onSelect?: (value, idx) => void`, a per-commit side effect the CALLER owns.
  SegmentedTabs' press squish hangs there, so it fires on the pointer AND keyboard commit paths
  through the same `select` — previously the keyboard path went through the SFC's own `select`, and a
  wrapper would have lost that.
- **Behaviour delta, stated:** committed selections now also fire the engine's recenter
  (`scrollIntoView({inline:"nearest", block:"nearest"})`). SegmentedTabs is a scrollable strip and this
  is the engine's documented facility — a selection past the fold pulls itself into view. Adopted, not
  suppressed.
- **THE FAMILY-OF-THREE CLAIM, QUALIFIED AT ALL THREE SITES** (cure (12)). ToggleGroup delegates
  roving to reka's `ToggleGroupRoot` (`ToggleGroup.vue:114` `:roving-focus`) and imports neither house
  part, so it does not trip the arm — but naming it a consumer while it is not is the same
  unbacked-claim shape this row struck at `src/index.ts:36-37`. The three sites that named it —
  `src/components/tabs/SegmentedTabs.vue:16-19`, `useSelectionGroup.ts`'s doc, and the gate header
  (`tests/gates/overfit-structure.test.ts` §(C)) — now say the engine's consumer set is **TWO**, name
  ToggleGroup as the same strip BY SHAPE only, and route its adoption to **#84** with the blocker
  named: the C-1 `SelectionOption["value"]` widening (`useSelectionIndicator.ts:35` `string` vs
  `SelectionValue`), unchanged by this cut. **W-SELECTION-ONE hard-precedes #84** is satisfied by the
  engine now being the single assembly point.

---

## §7 · THE ROUTED INBOUND (#18's residue)

**RT-18B — the dead `.draw-rule` / `[data-draw-in]` register.** Membership was ZERO on the tree and
`grep` confirms zero cross-repo writers. The two selectors, both `@keyframes`, and the
`--draw-in-origin` / `--draw-in-delay` knobs are **deleted with `src/styles/draw-in.css` whole** and
its `@import` + the `index.css` prose block. Its ONE live datum — `--draw-in-duration`, read by
`music-staff/styles.css` ×5 — is **re-homed onto its ONE consumer** as `--_music-staff-draw-duration`
(scoped to `.music-staff`, base and expo arrival preserved byte-exact).

**RT-18B / RT-18H(b) — the missing in-repo specimen, PAID.** `demo/stories/motion/scroll.vue` is new:
one page mounting `.scroll-progress`, `[data-scroll-reveal]`, and the `useScrollScene` spine together
(registered in the manifest as *Scroll Register*). This discharges three things at once — the
demo-coverage debt on both live registers, RT-18H(b)'s *"one scroll register"* fold that #18 shipped as
ZERO registers, and `useScrollScene`'s orphan status (228 lines, its sole importer `useScrollPin` died
at #18). The `orphan-css-partial` gate's dead-SFC fixture still holds: a demo consumer does not enter
the library's public reach set, which is what that fixture asserts.

**RT-18G — the `tests-visual/` residue naming #18-deleted subjects.** The suite is unwired, which is
exactly why it was named rather than left to rot.

| item | act |
|---|---|
| `completion-seal.spec.ts` (whole 200-line spec) | **DELETED** — subject gone |
| `phase-palette.spec.ts` (every arm keyed to `/data/instrument-chassis` + `.instrument-chassis`) | **DELETED** — subject gone; no non-chassis arm existed |
| `css-critical.spec.ts:25`,`:109` | deferred-CSS signature re-trued — `completion-seal`, `scroll-pin`, `instrument-` struck from prose AND regex |
| `motion-demo.spec.ts:173-186`,`:225-226` | re-trued onto the rebuilt `/motion/scroll` specimen; the View-Transition reorder-list clause **struck with its subject**, not re-pointed at a stand-in |
| `a11y-splitchars.spec.ts:37` | prose naming `animated-digit` corrected |
| `scroll-motion.spec.ts:41` `ROUTE` | the pre-existing rot #18 flagged: `"/motion/scroll-choreography"` was never in the manifest, so every arm navigated a 404. Re-pointed at `/motion/scroll` |
| `touch-target.spec.ts` (whole 328-line spec) | ~~re-worded: `.relative.touch-hit-area` selectors ×2 re-expressed on the real atoms, header noting the floor is unowned~~ **DELETED** [CURED 2026-08-05 · adjudicated cure (6), DRIVER RULING: re-wording it left a spec asserting a ≥44px floor that NO mechanism guarantees — the masking class, and the #18 arm-(c) precedent (*"the masking class dies with its subject"*) governs. Its subject was `@utility touch-hit-area`, killed by D-7 above; the spec dies with it. `tests-visual/package.json`'s `test:touch` script goes out with it, and `playwright.config.ts`'s coarse-touch project comment now records that the floor has no mechanism at HEAD.] The 44px WCAG floor is UNOWNED and is **#31 W-A11Y**'s to author mechanism-first (`G-COARSE-TARGET ≡ A6`, `binding: "none"` in `SEAT-BINDING.json` — the delete moves no receipt) — **RT-19C** |
| `playwright.config.ts:92-99` (the coarse-touch project comment) | re-trued twice: the deleted utility struck, then — at cure (6) — the comment made to RECORD that the 44px floor has NO mechanism at HEAD and that `G-COARSE-TARGET` is #31's to author mechanism-first. The project itself STAYS: **16** other specs branch on `coarse-touch` (`grep -rl` over `tests-visual/*.spec.ts`), so the delete orphans nothing |

---

## §8 · O-17 D-19 — `/data/search` ships two stacked search fields

The second field was the fuzzy-search OVERLAY, raised by `searchState.open()` on every keystroke and
carrying its own input. At HEAD the overlay component is **not on the package surface at all**
(`components/search/index.ts` publishes `SearchBar` + the composables, nothing else), so the call moved
an `isOpen` flag and raised nothing, while the story's `body` still advertised a *"FuzzySearch
overlay"* row rendering nowhere. Both are struck: the inert `open()` call and the phantom body row.
ONE field on the route, with the reason recorded on the text.

---

## §9 · THE GATE — three arms bound under an existing seat

`tests/gates/overfit-structure.test.ts` (new, 10 cases). Born-RED at the pre-cut tree per §2, flipped
GREEN in the same cut, so it ships as the STANDING regression lock rather than an `it.fails` scaffold
(the RULING-2 *never-RED-at-tag* law, the `type-hygiene` precedent). Teeth are proven by four
self-test bites, not by the population being zero: an unpublished self-referenced-only export IS a
leak; a published-but-unconsumed export is NOT; a barrel re-export does NOT rescue a leak (the
`WEBGPU_ACQUIRE_TIMEOUT_MS` shape); a `void x;` matches while `void (await run());` does not; the
barrel carve-out is a **published-ENTRY** rule derived from `libraryEntryMap()`, never a hand-list
(so `src/forms.ts` and `src/components/blob/config.ts` are exempt by construction, and nothing else
can hide behind an invented exemption). A vacuity guard asserts the census sees >400 rows.

**Seat accounting: +0.** All three names are declared ARMS of `G-OVERFIT` at TR §B.5. The seat-name
BINDING (`SEAT-BINDING.json`) is **#65's act** — routed as **RT-19B → #65** (expect `bound:9`), the
same shape as #23's `G-RADIUS-ROLE`. The register receipt is therefore **byte-identical pre → post**.

---

## §10 · VERIFY GATE — verbatim

```
$ npx vue-tsc --noEmit
(no output)

$ npx vitest run tests/styles tests/components tests/gates    # best of 11 serial runs
 Test Files  148 passed (148)
      Tests  1097 passed | 2 expected fail (1099)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
    roster title: TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)
```

Receipt **byte-identical** to the pre-cut run (`bound:8 · unbound:50 · violations:0`), re-run at the
cure and identical again. The one DRIFT is the pre-existing `reka.tags-input.value-binding` row
already routed to #65 at ⊕³⁶.

**FLAKE DISPOSITION — MEASURED WITH A PRISTINE-HEAD CONTROL, NOT WAVED THROUGH.** The line above is
the BEST of 11 serial runs, and saying so is the point: **the verify triple is not deterministically
green on this box**, and a seat that pastes one green receipt as if it were is doing the thing this
row exists to stop. (This also corrects the adjudication residue's own wording — *"not reproduced in
verify suites"* is FALSE; it reproduces there, repeatedly.) THREE cases flake, all timing/load-bound,
none of them #19's:

| flaking case | shape | working tree (post-#19) | pristine HEAD control |
|---|---|---|---|
| `dropdown-menu.contract.test.ts:118` — `expect(document.activeElement).toBe(trigger.element)` after `setTimeout(…, 30)` | a real-timer sleep racing reka's focus restore | 7 of 11 verify-triple runs FAIL (click branch); 1 of 11 (context branch) | **3 of 4** (components) · **2 of 3** (full) |
| `custom/aurora/atoms.test.ts:141` — `resolveAtoms` total-function fuzz | verbatim `Error: Test timed out in 5000ms` — an exhaustive fuzz over vitest's default `testTimeout`, not a logic red | 7 of 11 verify-triple runs FAIL | **2 of 4** (components) |
| `tests/demo/router-field-ownership.test.ts:10` — one story-owned field across DockStage navigation | same verbatim `Test timed out in 5000ms`; surfaces only in a FULL-suite run | 2 of 3 full-suite runs FAIL | **3 of 3 full-suite runs FAIL** |

All three pass in ISOLATION with no failures at all (dropdown 3/3, aurora 5/5, router 2/2). Method: 11
serial runs of `tests/styles tests/components tests/gates` + 3 full-suite runs on the working tree; 4
serial `tests/components` runs and 3 full-suite runs on a pristine `git archive HEAD` tree — the same
tree §2's census ran on. **All three reproduce at HEAD, at an equal-or-HIGHER rate, in a tree #19 never
touched**, so none is this cut's. Both controls were run rather than assumed, because two of the three
touch things #19 moved: the `$attrs` path in both dropdown SFCs, and the demo manifest the router test
walks (this cut adds a route to it). Measured away, not argued away. Nothing is re-timed, `retry`-ed,
or quarantined to hide it — raising the 30ms sleep or the 5000ms timeout is exactly the masking class
this row exists to kill. → **RT-19G → #65** (band close): a settled/`flush`-based assertion for the
first and declared per-test timeouts for the other two, or an explicit quarantine with grounds. HEAD's
`FourierField.smoke` + `public-surface` Row-8 + `boot-graph` + `backdrop-prefix-normalization` reds in
that control are the archive tree's absent `dist/`/`dist-demo/`, not flakes.

Full suite (beyond the verify gate's three trees), after `npm run build` + `npm run demo:dist:build`
— best of 3 serial runs at the cure; the other 2 carried only the §10 flakes:

```
$ npx vitest run
 Test Files  1 failed | 206 passed (207)
      Tests  1 failed | 1492 passed | 2 expected fail (1495)
  the 1 failure: tests/demo/router-field-ownership.test.ts — Test timed out in 5000ms
  (PRE-EXISTING: 3 of 3 full-suite runs FAIL the same way at pristine HEAD — see FLAKE DISPOSITION)
```

**Stated plainly rather than rounded up:** the row's first draft reported `207 passed / 1493` here.
That reading was never reproduced by either challenger or by this cure seat — the full tree carries
the three timeout flakes above on this box, at HEAD as much as at the cut. The verify GATE (the three
trees) does go fully green, and did on the run pasted above.

Export regeneration is exact:

```
$ node scripts/regen-exports.mjs --write
REGEN (PUBLISH-driven): exportKeys 68/68  jsSubpaths=62  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

**Ratchet, measured and NOT rebound.** Detector verbatim:
`npm pack --ignore-scripts --json --silent --pack-destination /tmp` on the built working tree →
**898,623** bytes (848 entries, 2,595,870 unpacked) against the `903,382` datum, i.e. **−4,759**.
That is BELOW the datum, which `ratchetEvidence()` fails LOUD as a shrink (*"rebind down
deliberately"*) by design. `.bundle-ratchet` is **untouched** here: the rebind is #66's by ⊕²⁰(d) /
⊕²¹ residue (1), and the RATCHET PROTOCOL (⊕¹⁶) forbids a verify seat from moving the datum. → the
figure feeds **RT-18F/#66**.

`git diff --stat` (tail), AT THE CURE: **108 files changed, 471 insertions(+), 1566 deletions(-)** —
net **−1,095** lines. ~~105 files, +435 −1219, net −784~~ [the pre-cure figure; the delta is cure
(6)'s 328-line `touch-target.spec.ts` delete, the cure's prose edits on 8 source/test files, and
cure (7)'s strike-in-place on the committed `EXECUTION-PROGRESS.md` — which is why that tracked file
is in the stat at all].

**FILE ACCOUNTING, EXACT** (cure (4) — the first draft said *"2 new files … and 5 deletions"* then
named four files plus a function body, and the seat's return said *"Five files deleted"* and named
four; both are struck):

- **3 untracked additions** — `demo/stories/motion/scroll.vue` · `tests/gates/overfit-structure.test.ts` ·
  `docs/tranches/BK/execution/2026-08-05-row19-dead-export-shim-selection/` (this record).
- **5 tracked deletions** (`git diff --diff-filter=D --name-only`, verbatim) —
  `src/components/tabs/constants.ts` · `src/styles/draw-in.css` ·
  `tests-visual/completion-seal.spec.ts` · `tests-visual/phase-palette.spec.ts` ·
  **`tests-visual/touch-target.spec.ts`** (the fifth is cure (6)'s, not the `floatingContentAttrs`
  body — a deleted FUNCTION is not a deleted FILE, and counting it as one is what produced the
  four-named-five defect).

---

## §11 · RESIDUE — named, owned, none falsifying the cut

| id | item | owner |
|---|---|---|
| **RT-19A** | `engageEnvelopes.ts` — a 117-line register with zero CSS uptake whose only reader is a test comparing the module to itself. F9's wire-or-delete disjunction is the ENGAGED-rung design call | **#27** (`G-ENGAGE-RUNG`) |
| **RT-19B** | bind the three `G-OVERFIT` arm executables into `SEAT-BINDING.json` (expect `bound:9`) | **#65** (band close) |
| **RT-19C** | the 44px coarse touch floor is now UNOWNED — the utility that named it composed nothing. ~~`tests-visual/touch-target.spec.ts` still measures it~~ [CURED 2026-08-05 · adjudicated cure (6), DRIVER RULING: **the spec is DELETED**, on the #18 arm-(c) precedent — a spec asserting a floor no mechanism guarantees IS the masking class, and re-wording its selectors preserved exactly that. `test:touch` struck from `tests-visual/package.json`; the coarse-touch project comment in `tests-visual/playwright.config.ts` now records the floor as unowned. Receipt unmoved: `G-COARSE-TARGET` is `binding: "none"`, `paths: []` in `SEAT-BINDING.json`.] #31 authors the floor MECHANISM FIRST, then `G-COARSE-TARGET`, then a spec — in that order | **#31 W-A11Y** (`G-COARSE-TARGET ≡ A6`) |
| **RT-19D** | 32 PUBLISHED runtime exports have zero site anywhere (`SURFACE_TIERS`/`ORIENTATIONS`/`PLACEMENTS`/`TRIGGERS`/`BACKDROPS`, `chartColors`/`chartHeights`/`chartMargin`/`minWidthInputSm`/`motionStagger`, the aurora fallback-ground trio, …). Each is legitimate API by the gate's predicate; retiring any of them is an 8.0.0 breaking-surface decision with a §1.1 walk per symbol | **#66** (`R-PUBLIC-8-LEDGER`) |
| **RT-19E** | the `.bundle-ratchet` shrink of −4,759 measured at §10 | **#66** (with RT-18F) |
| **RT-19F** | π/DELTA — the demo story index gains one route (`/motion/scroll`), so the manifest's `s(` rows go **82 → 83** (`grep -c '^\s*s('` on `demo/stories/manifest.ts`: HEAD 82, working tree 83). #18's owed story-index capture therefore rides at **−5**, not −6: 88 → 83. ~~pairs with #18's owed `−6` capture~~ [CURED 2026-08-05 · adjudicated cure (7). #18's committed cursor cells at `EXECUTION-PROGRESS.md:450` and `:506` say −6 and instruct *"check against −6, not −7"*; both are bracketed in place at this cure. The capture is still ONE capture — no second browser seat] | driver browser seat (with #18's owed capture, **at −5**) |
| **RT-19G** | the two PRE-EXISTING flaking cases measured at §10 — `dropdown-menu.contract.test.ts:118` (focus after a 30ms real-timer sleep) and `custom/aurora/atoms.test.ts:141` (`Test timed out in 5000ms` on an exhaustive fuzz). Both reproduce at pristine HEAD at an equal-or-higher rate and both pass in isolation, so neither is #19's — but the verify triple is NOT deterministic on this box and no seat should paste a green receipt as if it were. Fix = a settled assertion + a declared per-test timeout, or an explicit grounded quarantine; never a longer sleep | **#65** (band close) |
| **RT-19H** | TR#19's last clause — *"words' `:87-88` imports break on adopt"* — is the consumer-side rider of the `src/index.ts:36-37` barrel-doc strike at §3(c). NOT this row's: the TR itself assigns it (*"the rider rides §C's words row"*). Named here so the ledger is complete; no act taken | **#76 W-CONSUMER-BAND** (§C words row) |

---

## §12 · CURE LEDGER — the twelve adjudicated cures, applied 2026-08-05

Adjudication: `CURE-REQUIRED` on a SELECTION-CORRECT / CUT-SOUND verdict. Every cure is
record-or-prose; **no mechanism was re-worked**, with the one exception the driver ruled (cure 6, a
delete). Seat: `claude-opus-5[1m]`.

| # | cure | sites touched |
|---|---|---|
| 1 | shim census stated from the committed detector — **26** offender symbols across **14** non-entry modules, replacing the hand arithmetic *"F11's eight + nine = 17"*. Leak figure reconciled the same way (**33** in place / **37** detector-held-out / **38** pre-`scripts/`-census) with the self-masking mechanism stated | `RECORD.md` §2 (table + FIGURE DRIFT + new SELF-MASKING block) · §3(a) · §4 D-3 · `tests/gates/overfit-structure.test.ts:34-56` (BORN-RED + SELF-MASKING) · both paste blocks |
| 2 | deny-list is **38** entries, not 30 (counted on `git show HEAD:src/components/_shared/floating.ts` — 38 string literals at `:18-55`) | `RECORD.md` §2 table · §4 D-1 · `tests/components/popover.contract.test.ts:151` · `tests/gates/overfit-structure.test.ts:44` · both paste blocks |
| 3 | SegmentedTabs net is **−12** (`git diff --numstat` = `46 58`; 458 → 446), not −34 | `RECORD.md` §6 · TR paste block |
| 4 | file accounting exact — **3 untracked additions + 5 tracked deletions** (4 before cure 6); a deleted FUNCTION is not a deleted FILE | `RECORD.md` §10 tail |
| 5 | the six root-barrel tuning constants sit at `src/index.ts:`**`544-549`** at HEAD, not `:543-548` — `:543` is `snapshotField`, which survives | `RECORD.md` §3(b) · TR paste block |
| 6 | **DRIVER RULING — `tests-visual/touch-target.spec.ts` DELETED**, not re-worded. #18 arm-(c) precedent: a spec asserting a 44px floor no mechanism guarantees is the masking class. The floor is unowned until #31 lands `G-COARSE-TARGET` | `tests-visual/touch-target.spec.ts` (deleted) · `tests-visual/package.json:13` (`test:touch` struck) · `tests-visual/playwright.config.ts:92-99` · `RECORD.md` §7 row · §11 RT-19C · TR paste block |
| 7 | π figure **−5** (manifest `s(` 82 → 83 this cut), and #18's committed cells bracketed in place | `RECORD.md` §11 RT-19F · `EXECUTION-PROGRESS.md:450`,`:506` (dated strike-in-place) · ⊕³⁹ paste block |
| 8 | selection grounds re-trued — #22 is **SEALED ⊕³⁵**, #18 is **LANDED-IN-PART** | `RECORD.md` §0 |
| 9 | orphaned JSDoc deleted — the block documented the `NATIVE_SCROLL_TIMELINE` const this cut removed and had rebound to `clamp01` | `src/composables/motion/scroll/useScrollTrigger.ts` (was `:102-108`) |
| 10 | stale precedent cite re-trued — it named the `useScrollProgress.ts:80` early-return THIS cut deleted; now names the live per-value write fence at `:195`/`:275` and states why it is not the inert-arm shape §5 killed | `src/composables/motion/scroll/useScrollTrigger.ts:13-22` |
| 11 | `dprPolicy` stale prose ×3 struck — the arm is REQUIRED now; one site literally said *"(legacy)"*, the word this row exists to kill. `presize()` is idempotent, never conditional | `src/composables/glass/webgpu/useGpuSubstrate.ts:123`,`:328-329` · `src/composables/glass/webgpu/useWebGPUCanvas.ts:427-428` |
| 12 | the family-of-three claim qualified at all three sites — `<ToggleGroup type="single">` is the same strip BY SHAPE but composes neither house part, so the engine's consumer set is **TWO** and its adoption is routed to **#84** with the C-1 blocker named | `src/components/tabs/SegmentedTabs.vue:16-26` · `src/composables/motion/morph/useSelectionGroup.ts:6-7`,`:15-26`,`:34` · `tests/gates/overfit-structure.test.ts:27-36` · `RECORD.md` §6 |
| + | the missing TR-clause ledger line (`words:87-88` import rider) | `RECORD.md` §3(c) · §11 **RT-19H → #76** |
| + | the flake disposition line, MEASURED with a pristine-HEAD control instead of asserted — and it found a THIRD case (`router-field-ownership`, 3/3 red at HEAD) the residue never named | `RECORD.md` §10 FLAKE DISPOSITION · §11 **RT-19G → #65** |

**ONE DEVIATION FROM THE DICTATED TEXT, STATED.** The ruling said to keep the **38** leak figure with
the caveat *"gate-file-present run gives 33 — the gate's own header comments count as sites, a 5-name
gap"*. Re-measured this seat, the gap is **4** names, not 5 (`TOGGLE_GROUP_KEY` ·
`DOCK_MORPH_MAX_STRETCH` · `MOOD_AVA` · `WEBGPU_ACQUIRE_TIMEOUT_MS`), and 33 + 4 = **37**, not 38. The
missing 38th is `springSettleDurationSeconds`, a leak ONLY under a census without `scripts/` — the
hole §3(d) closed. So 38 is a real measurement of a SUPERSEDED census, and all three figures are
recorded with the census each belongs to. Writing the dictated 5-name caveat would have committed a
new false figure into the record on a cure pass whose entire subject is false figures. The ruling's
direction — 38 stands, with its caveat stated — is honored; only the caveat's arithmetic is corrected,
and the correction is shown rather than asserted.

**VERIFY AT THE CURE.** `npx vue-tsc --noEmit` clean (exit 0, no output) · `node
scripts/gate-register.mjs` byte-identical (`seats:60 … bound:8 … unbound:50 … violations:0`) ·
`node scripts/regen-exports.mjs --check` `exportKeys 68/68 … EXACT REPRODUCTION: YES` (exit 0) ·
`npm run demo:dist:build` green · `npx vitest run tests/styles tests/components tests/gates`
**148 passed / 1097 + 2 expected fail** on 3 of 11 serial runs, the other 8 carrying ONLY the
PRE-EXISTING flakes measured at §10 — no other case failed at any point, and all three flakes
reproduce at pristine HEAD at an equal-or-higher rate in a tree #19 never touched.
