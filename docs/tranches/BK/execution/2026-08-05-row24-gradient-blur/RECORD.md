# BK #24 · W-GRADIENT-BLUR — the focus primitive

**seat:** scout + implement · **modelId:** `claude-opus-5[1m]` · **date:** 2026-08-05
**base:** `571626cc` (the task's stated `4917a042` was two commits stale at pickup — `bd93c22b`
#19 landing + `571626cc` its ⊕³⁹ receipt had landed; verified docs-and-code past the pin and
re-read the cursor at the real HEAD before selecting).

---

## §1 · SELECTION + GROUNDS

**Row #24 W-GRADIENT-BLUR**, the next canonical unstarted Φ5 row in TR §A order.

The Φ5 walk from the cursor's own table, in roster order, with each skip's ground:

| row | state at pickup | disposition |
|---|---|---|
| 18 W-DELETE | ⊕³⁸ LANDED-IN-PART 2026-08-05 (`4bf53962`) | not unstarted |
| 19 W-DEAD-EXPORT·W-SHIM-PURGE·W-SELECTION-ONE | ⊕³⁹ LANDED 2026-08-05 (`bd93c22b`) | not unstarted |
| 21 W-DAG-REDUCE | UNSTARTED | **SKIPPED — GATED.** `#17` hard-precedes and #17 is Φ4-UNSTARTED; the cursor states the gate verbatim at its `Φ5 procession` line |
| 22 W-FROST | CODE-COMMITTED, DEMOTED→CURE-CUT | IN-FLIGHT — never selectable |
| 23 W-RADIUS-ROLE | ⊕³⁷ LANDED 2026-08-05 (`a6d7db90`) | not unstarted |
| **24 W-GRADIENT-BLUR** | **UNSTARTED** | **SELECTED** |

**Not owner-gated.** #24's cell names `ASK.md g2`, but g2 is a *ratified-default* row, not a
parked ask: BK `ASK.md:21` reads *"**KEEP** if the capture meets its own gate; the primitive
builds either way"*, and RATIFICATION §2 R-6 rules all eight of the unfalsifiable F-rows
converted — *"the primitive builds; the keep/kill call happens at the capture, defaulting KEEP"*.
The build is unconditional; only the F50 keep/kill verdict waits on the paired capture. Silence
never parks (RATIFICATION §4 row 8).

**Precedence honoured.** The task named #18's completion-seal delete as preceding #26's table cut —
#18 landed at `4bf53962`, so that chain is discharged and does not bear on #24. #24 itself carries
no stated predecessor in TR.

---

## §2 · THE DERIVED WORK ORDER — TR §A row #24, VERBATIM

> | 24 | W-GRADIENT-BLUR ⊕⁵ | WAVES:551 + **MOTION-CANON §5 (`:234-274`) — THE TERMINAL MECHANISM** (SE-5) | Φ5 | gate → arm of G-RUNG-ONLY. F50 = in-wave capture row, **default KEEP if the capture meets its own gate** (RATIFICATION §6); the primitive builds either way. **⊕⁵ the WAVES:551 "implements whichever it proves" clause is RULED SETTLED** — §5 already settled it: ONE fixed plate, uniform `backdrop-filter` under the `mask-composite: intersect` double-ramp mask (never graded radius), the five veil tokens, the opacity-only clock law, the four named consumers, file plan `styles/glass/focus-veil.css`; the wave implements §5, it proves nothing mid-execution |

Cited specs read in full: `MOTION-CANON.md` §5 (`:234-274`), `WAVES.md:551`, `NOVELTIES.md` §13 +
its #24 register row, `RATIFICATION.md` §2 R-6, `ASK.md` g2, `IOS27-ARCHIVE.md` §2 (the pixel
study §5 supersedes), `ECOUTE.md` F49/F50, `REGISTRY.md` I-5.

---

## §3 · PER-ITEM LEDGER

| # | item | trace |
|---|---|---|
| W-1 | **The primitive** — ONE fixed full-viewport plate, `pointer-events: none`, uniform `backdrop-filter` under the INTERSECT product of an x and a y double-ramp, centred on `--veil-x`/`--veil-y` | NEW `src/styles/glass/focus-veil.css` (173 lines, `@layer components`, `.glass-focus-veil`) — §5 "Mechanism" + "Files" |
| W-2 | **Reachability** — the partial enters the glass.css closure adjacent to `grasp.css` (the material's answer to the hand; this is the world's answer to the same hand) | `src/styles/glass.css` `@import "./glass/focus-veil.css";`; `tests/gates/orphan-css-partial.test.ts` GREEN |
| W-3 | **The token cohort** — five values, the blur BOUND to the ladder's floating rung rather than an off-ladder literal | `src/styles/tokens/glass.css` `--glass-focus-veil-{blur,core-x,core-y,bloom,dim}`; the private `--glass-halo-{blur,core,bloom}` cohort STRUCK with no alias |
| W-4 | **The dim's per-mode arms** — light 50% / dark 40%, plain `.dark` ancestor, never a `light-dark()` fold | light at `tokens/glass.css`, dark at `tokens/dark-arm.css` beside `--glass-veil-ink` |
| W-5 | **The live centre registered** — `--veil-x`/`--veil-y` as `<percentage>`, `inherits: false`, initial `50%`, so the centre interpolates instead of snapping | `src/styles/tokens/property-regs.css`, beside the `--specular-x/y` pair it mirrors |
| W-6 | **The opacity-only clock** — IN `--duration-normal` lagging by `--duration-instant` (300ms behind the geometry by one rank-6 beat) · OUT `--duration-fast` with the geometry, no lag · `@starting-style` supplies the from-0 a mounted-only-while-engaged plate has no prior style for | `focus-veil.css`; the two rules carry the two clocks (a transition reads its timing from the state it lands in) |
| W-7 | **Consumer 1 — the graded Dialog.** FORM 2 collapses to a BINDING: the same `data-slot="glass-graded-halo"` child gains `class="glass-focus-veil" data-engaged`; the whole private recipe leaves `placement.css` | `ModalOverlay.vue`; `placement.css` −57 lines (FORM 2 rule + its `.dark` dim arm) |
| W-8 | **Consumer 2 — the engaged Slider (F49/F50, the headline).** The veil mounts on the grasp lifecycle already in the file, unmounts on the release fade's own `transitionend`, and is TELEPORTED to `<body>`; the root takes an INLINE `z-index: var(--z-overlay)` for the same window, one rung over the plate's own `calc(var(--z-overlay) - 1)` | `Slider.vue`: `data-focus-veil` on the root, the `<Teleport to="body">`-wrapped `v-if="grasping && graspable"` span, `writeVeilCentre()` + its grasp-scoped capture-phase `scroll` listener, the `hostStyle` computed |
| W-9 | **The gate arm** — `G-RUNG-ONLY` GRADIENT-BLUR arm, born-RED, seats +0 | NEW `tests/styles/focus-veil.test.ts`, 19 cases across four describes (exists · token-driven · applied at its named consumers, two of them mounted-DOM · five mutation bites) |
| W-10 | **The Dialog's own test re-pointed** — it now asserts the BINDING and the Dialog-side behaviour; the recipe's invariants are asserted once, at their new home | `tests/components/ui/dialog/graded-backdrop.test.ts` |

### The centre write, stated exactly

The write is §5's *"JS-written from the control's half-extent"*: viewport-space centre into
`--veil-x`/`--veil-y`, the control's own half-extents into `--glass-focus-veil-core-x/-y`. One
`getBoundingClientRect` on the veil's mount tick, and one more on each `scroll` under a live
grasp — never per frame. A slider does not move under its OWN drag, so the drag loop stays
layout-read free; a page scroll during the hold moves it against the viewport, which is the one
motion a viewport-space centre has to answer. The listener is capture-phase on `window` (`scroll`
does not bubble from a scroller; capture still reaches it, so one listener covers every scroller),
passive (the write never cancels the scroll), and lives exactly as long as the grasp. Both props
are registered `<percentage>`, so the pool interpolates with the page instead of snapping.

---

## §4 · DEVIATIONS FROM THE CITED SPEC, EACH WITH ITS GROUND

**D-1 · The token prefix is `--glass-focus-veil-*`, not §5's `--glass-veil-*`.** §5 was written
before #22 landed; `--glass-veil-*` is now the INK-VEIL PLATE REGISTER (`glass/veil.css`:
`--glass-veil-ink/-base/-step/-tier/-rest/-rung`, the five rungs, and the composed `--glass-veil`
itself). Minting `--glass-veil-blur/-bloom/-core-x/-core-y/-dim` into that prefix puts two
unrelated registers under one name — the G-ONE-NAME class this tranche gates. The cohort takes the
prefix §5's own file and class already carry. Mechanism, values and provenance are unchanged.
**`--veil-x`/`--veil-y` are kept VERBATIM** — they collide with nothing and they match this file's
unprefixed per-element live-channel idiom (`--specular-x`, `--specular-y`, `--flex-vel`).

**D-2 · `saturate(var(--glass-saturate))`, not §5's `var(--glass-saturate-overlay)`.** That token
does not exist on disk and never did; #22 landed the one-saturate law. The shipped FORM 2 already
read `--glass-saturate`. Not a design change — a stale name in the spec.

**D-3 · The blur resolves 20px, not §5's parenthetical "= 11px".** §5's *binding* is
`var(--glass-blur-floating-radius)` and that is what landed, verbatim. Its "= 11px" was a
then-current resolution of that token against the pre-#22 ladder; the ladder is now
10/14/16/20/22 and the floating rung is 20px. The token is the authority, never a remembered
literal. §5's stated ground for the change — stay on the ladder, do not carry an off-ladder
literal — is honoured exactly, and the side effect is that the Dialog's plate radius is unmoved.

**D-4 · `color-mix(… var(--glass-plate-overlay) …)`, not §5's `var(--glass-bg-overlay)`.** §5's
`--glass-veil-dim` recipe (`MOTION-CANON.md:252`) names `--glass-bg-overlay`, which has never
existed anywhere on disk. The implementation substitutes the actually-shipped
`--glass-plate-overlay` (`tokens/glass.css:146` light 50%, `tokens/dark-arm.css:247` dark 40%) —
which is what §5's own *"Already shipped, per-mode arms already correct"* provenance line is
pointing at. The identical never-existed-token class as D-2: a stale name in the spec, not a
design change. **(CURE-5 — this deviation was the count §4 was missing; four, not three.)**

---

## §5 · WHAT THIS ROW DID NOT DO, AND WHY

**Consumers 3 and 4 (select/combobox · dock+command palette) are ROUTED, not skipped.** §5 names
four consumers and requires ≥2; two landed. The other two live in files another row owns, and one
owner per file per cut is the standing law:

| consumer | owning row | route |
|---|---|---|
| popover · dropdown-menu→menu · tooltip | **#89 W-OVERLAY** (TR §A row 89, `CURES.md` §2) | compose `.glass-focus-veil` at the overlay cut — the class is landed and gated |
| select / combobox | **#81 W-PICKER** (TR §A row 81) | same |
| the dock's engaged control | **#47 GF-DOCK** (TR §A row 47) | same |

**Every one of those three inherits a hard precondition**: the plate is `position: fixed`, so a
consumer that mounts it from inside its own tree must PORTAL it to `<body>` or it collapses to the
first ancestor carrying `backdrop-filter`/`transform`/`filter`/`contain: paint` — see §10 CURE-1.
Popover, menu, tooltip, select and the dock all already render through a portal, so for them the
precondition is met by construction; the Slider is the case that had to teleport explicitly.

**The luminous second field is NOT built, and is this row's to build later.** `IOS27-ARCHIVE.md`
§2 measures F50 as *two* independent fields — a σ ramp and a soft additive light band (plateau
L≈32/255, feather 35pt above / 45pt below, full-bleed horizontally) — and NOVELTIES §13 routes the
band to #24 as "the sibling mechanism, opacity-only". It is deliberately held because TR's ⊕⁵
clause is an exhaustive enumeration of what §5 settled and the band is not in it, and because the
band's own escalation gate is the F50 paired capture, which is OWED. Landing it now would be an
unratified addendum to a capture-gated decision.

**The stacked-band ladder is REFUSED, on the record.** `IOS27-ARCHIVE.md` §2 proves from pixels
that the reference grades the blur RADIUS and proposes N stacked `backdrop-filter` bands. NOVELTIES
§13 rejects that construction (P4-class stacking, 4× cost, unmeasured fidelity gain) and TR rules
§5's single plate terminal. ONE plate ships; the arm's `bite[stacked-bands]` case reds on a second
backdrop sample. If the F50 capture judges the single-plate read insufficient, ONE additional band
is the bounded escalation and the ceiling is two.

**The spring-coupled reach experiment is NOT built.** NOVELTIES §13 files it explicitly as *"an
EXPERIMENT inside the wave"* whose falsifier is the F50 capture. The field ships static; the
coupling is the capture's call.

---

## §6 · OWED — routed, not carried

| id | owed | owner |
|---|---|---|
| **RT-24A** | ~~**The F50 paired before/after capture**, light AND dark (X-E's mode assertion), at the engaged Slider and the graded Dialog. ASK g2's KEEP/kill verdict rides it; its default is KEEP. Needs the live browser seat, which is the driver's — the same discipline #23's π-SHAPE-HOLD and #18's story-index capture rode.~~ [⊕ 2026-08-05 · **DISCHARGED by the driver** — nine cells + `cells/CAPTURE.md`: slider and graded-dialog pairs light AND dark (dark dim computes the dark-arm `oklab(0.17 …/0.104)`; the halo carries `mask-composite: intersect, intersect`), PLUS the adjudicator-mandated nested-in-configurator falsifier (post-CURE-1 coverage **1.000**, BODY parent, z 49). The capture meets its own gate; ASK g2's ratified default is recorded: **KEEP**, owner-reversible in one word.] | ~~driver browser seat~~ DONE |
| **RT-24B** | **The P4 plate probe** (NOVELTIES §13, "P4 probe binds the plate") — the cost cell for the one full-viewport backdrop sample under the mask, on both engines. | driver / #67 device cells |
| **RT-24C** | The three unlanded consumers above. | #89 · #81 · #47 |
| **RT-24D** | The luminous band + the reach-coupling experiment, both capture-gated. | #24, re-opened at the RT-24A verdict |

---

## §7 · VERIFY GATE

Run at the cut, in the mandated form. Figures are the POST-CURE run (§10); the pre-cure run
differed only in the arm's own case count (1114 + 2, the cure adds one case).

```
$ npx vue-tsc --noEmit
(no output; exit 0)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  149 passed (149)
      Tests  1115 passed | 2 expected fail (1117)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
```

The receipt is **byte-identical pre and post** — measured at the row's start against `571626cc`
and again at the cut. Nothing in the register moved because nothing was minted: `G-RUNG-ONLY`
already carries `+GRADIENT-BLUR` as a declared arm at §B.5 / `gates/ROSTER.md:23`, the seat stays
`arm-only` at its own declared path (`tests/gates/trap-gates.test.ts`), and `SEAT-BINDING.json`
was not touched.

### Two intermediate REDs, both fixed at the cut, both recorded honestly

1. `tests/gates/boot-graph.test.ts` — *"dist-demo is STALE"*. Editing source made the committed
   `dist-demo/` older than its inputs. Discharged by `npm run demo:dist:build`, the remedy the
   gate's own message names and the same rebuild #68 ran at its seal.
2. `tests/public-surface.spec.ts` — *"ships exactly the style closure plus the three generated
   members"*, expected 112 / received 111. The new partial has to reach the package, not just the
   source graph. Discharged by `npm run build`. **This one is worth naming**: it is the exact
   I-12 class `orphan-css-partial.test.ts` declares itself structurally unable to see
   (source reach ≠ package output), and it caught a real omission that the mandated three suites
   would have shipped past. `.bundle-ratchet` unmoved at `903382` (no exported member added).

### The two suite flakes, with their control

An earlier full pass showed `dropdown-menu.contract.test.ts:118` and
`custom/aurora/atoms.test.ts:141` red. Both are the **pre-existing RT-19G flakes** registered at
`2026-08-05-row19-dead-export-shim-selection/RECORD.md` §10 — verbatim `Error: Test timed out in
5000ms` for the second. Controls run this seat: both pass in isolation
(`2 files, 35 passed`); `atoms.test.ts` reproduces on a pristine `git archive HEAD` tree; and
neither reproduced on the final full pass above. Nothing re-timed, nothing quarantined.

---

## §8 · BORN-RED, MEASURED

The arm was authored first and run against a pristine `git archive HEAD` tree (HEAD `571626cc`,
zero bytes of this cut, `node_modules` symlinked) before any source edit landed:

```
$ cd <pristine HEAD tree> && npx vitest run tests/styles/focus-veil.test.ts
 Test Files  1 failed (1)
      Tests  16 failed | 2 passed (18)
```

**16 of 18 RED at HEAD.** The 2 green are `bite[off-ladder-radius]` and
`bite[unwired-primitive]` — pure-function mutation bites over content the test itself plants, so
they are self-tests of the detector rather than of the subject and are green by construction.
Working tree at the cut: **18/18 GREEN**.

**RE-TAKEN AFTER THE CURES.** CURE-2/-4 changed the arm (one file-text case replaced by a
mounted-DOM case, one mounted scroll case added), so the born-RED evidence was re-measured against
the same pristine `git archive 571626cc` tree with the CURED arm dropped in:

```
$ cd <pristine HEAD tree> && npx vitest run tests/styles/focus-veil.test.ts
 Test Files  1 failed (1)
      Tests  17 failed | 2 passed (19)
```

**17 of 19 RED at HEAD**, same two synthetic self-tests green. Working tree post-cure:
**19/19 GREEN**.

A first pristine run failed at MODULE LOAD (`ENOENT` on the absent partial) and reported **0
tests**. That is ABSENT under the ⊕²⁵ status vocabulary, not RED — the exact reading this register
refuses to accept as a gate result — so the subject file's read was made tolerant and the run
re-taken, which is how the per-arm 16/18 above was obtained. No `it.fails` latch is left on disk:
a latch is a second state to keep true by hand, and the pristine-tree run is stronger evidence
because it reds the real detector rather than an inverted one.

---

## §9 · DIFF

```
 src/components/dialog/ModalOverlay.vue             |  14 ++-
 src/components/dialog/placement.css                |  71 +++-----------
 src/components/slider/Slider.vue                   | 103 ++++++++++++++++++++-
 src/styles/glass.css                               |   6 ++
 src/styles/tokens/dark-arm.css                     |   7 ++
 src/styles/tokens/glass.css                        |  50 ++++++----
 src/styles/tokens/property-regs.css                |  26 ++++++
 tests/components/ui/dialog/graded-backdrop.test.ts |  92 +++++++++---------
 8 files changed, 248 insertions(+), 121 deletions(-)
 + src/styles/glass/focus-veil.css   (new, 173 lines)
 + tests/styles/focus-veil.test.ts   (new, 19 cases)
```

`dist/` and `dist-demo/` were rebuilt (both gitignored) — see §7.

---

## §10 · CURE PASS — the five cures the adjudication dictated

**seat:** cure · **modelId:** `claude-opus-5[1m]` · **date:** 2026-08-05 · **verdict:**
CURE-REQUIRED (selection UPHELD, mechanism spec-faithful, receipt byte-identical; the seal blocked
on D-1). Applied to the same uncommitted tree; nothing staged or committed.

### CURE-1 (BLOCKING, D-1) — the fixed plate is portalled

`position: fixed` resolves against the viewport only while no ancestor carries `backdrop-filter`,
`transform`, `filter`, `contain: paint` or `will-change: transform`. In a glass library those
ancestors are ordinary: the library's OWN Configurator puts `backdrop-filter: blur(20px)
saturate(1.5)` on `.configurator-aside` (`src/components/configurator/styles.css:39-41`), and 79
sliders live inside it on `/substrates/aurora`. Pre-cure the veil collapsed to the aside's box —
the frost landed on the slider's own siblings and the world it exists to quiet was untouched,
silently, with no gate able to see it. The `mask-composite: intersect` double-ramp, the five
tokens, the ONE backdrop sample and the opacity-only clocks are all unchanged byte-for-byte;
what changed is where the plate is parented.

| edit | site |
|---|---|
| the veil span wrapped in `<Teleport to="body">` | `src/components/slider/Slider.vue:332-340` |
| the template comment restated as the constraint (why it must portal), no history | `Slider.vue:320-331` |
| `z-index: -1` → `calc(var(--z-overlay) - 1)`; the comment restated as the real mechanism + the containing-block precondition | `src/styles/glass/focus-veil.css:54-69` |
| the arm's z assertion re-pointed | `tests/styles/focus-veil.test.ts:80-82` |

The Dialog binding is **untouched** — its overlay is already a `RekaDialogPortal` child
(`DialogContent.vue:435`), which is why the library's own working consumer never showed the defect.
The `z-index: -1` "bottom of the engaged host's stacking context" trick dies with the teleport; the
plate now states its tier against the one token the raise reads, one rung under it.

**Live, on Challenger A's own scene** (`/substrates/aurora`, a slider inside `.configurator-aside`,
viewport 1440×907):

| | pre-cure (Challenger A) | post-cure (measured) |
|---|---|---|
| veil rect | `399 × 442 @ (904, 224)` | `1440 × 907 @ (0, 0)` |
| coverage | `0.135` | `1.000` |
| parent | the aside's subtree | `BODY` |
| computed z | — | `49` (host `50`) |

Artefact: `scratchpad/cure1-aurora-veil-portalled.png` — the world diffuses, the pool sits on the
grasped control, the aside's siblings are no longer the only thing frosted.

### CURE-2 (D-2) — the engaged raise is effective, and the arm can fail

The raise was a scoped rule, `.glass-slider[data-focus-veil]`, which ties on specificity (0,3,0)
with the demo's `.specimen-well > :not(.grid-bg) { z-index: 1 }`
(`demo/stories/forms/slider.vue:391-394`) and lost on source order — computed `z-index` was `1`,
not `50`. It is now a reactive INLINE style on the root under the same grasp lifecycle as
`data-focus-veil`; an inline declaration has no tie to lose.

| edit | site |
|---|---|
| `hostStyle` computed — `motionAxis.hostStyle` + `zIndex: "var(--z-overlay)"` while grasped | `Slider.vue:260-274` |
| `:style="hostStyle"` on the root | `Slider.vue:317` |
| the scoped `.glass-slider[data-focus-veil]` rule STRUCK — `isolation: isolate` was there only to make the plate's negative rung mean "under this slider", and the plate is not in this subtree any more | `Slider.vue` `<style scoped>` |
| the arm re-pointed from file-text presence to a mounted-DOM assertion (mounts a real `<Slider>`, dispatches `pointerdown`, requires the plate in `document.body` and the inline raise on the host) | `tests/styles/focus-veil.test.ts:199-235` |

Live at `/forms/slider`, the specimen well that lost the tie: at rest computed `z-index: 1`; under
a live grasp computed **`z-index: 50`**, inline `var(--z-overlay)`; back to `1` on release.
Artefact: `scratchpad/cure2-specimen-well-raise-effective.png` — the grasped control is crisp, its
own well's ruling grid dissolves, the neighbouring wells keep theirs.

**RECORD W-8's page-bands claim is now TRUE, not corrected away**: the raise clears content 10 ·
controls 20 · bar 30 · header 35 · dock 40 · panel 45 in the root stacking context, measured.

### CURE-3 (D-3) — the centre is re-taken on scroll under a live grasp

One `getBoundingClientRect` per grasp stranded the pool on any scroll during the hold (384px drift
after a 400px scroll, reproduced). The write is extracted to `writeVeilCentre()` and a
capture-phase, passive `scroll` listener on `window` re-takes it for exactly as long as the grasp.

| edit | site |
|---|---|
| `writeVeilCentre()` extracted | `Slider.vue:221-236` |
| `trackViewport(on)` — idempotent add/remove, `{ passive: true, capture: true }` | `Slider.vue:238-247` |
| the grasp watch calls both; `onBeforeUnmount` detaches | `Slider.vue:249-258` |
| the comment scoped to SELF-motion (the drag loop stays layout-read free; a page scroll is the one motion a viewport-space centre must answer) | `Slider.vue:207-219` |
| a mounted-DOM detector for it | `tests/styles/focus-veil.test.ts:237-281` |

Live, same scene, `demo-main-scroller` moved 400px under a live hold: slider top `266 → -128`,
`--veil-y` `30.4076% → -13.0323%`, veil centre `-118px` vs control centre `-118px` — **drift 0px**
(pre-cure 384px). `--veil-x`/`--veil-y` are registered `<percentage>` props, so the pool glides
rather than snapping.

### CURE-4 (D-4) — arm honesty, by the STRIKE option

The verdict allowed either a second mounted-DOM composer assertion or striking the header's
over-claim. **Taken: the strike + citation.** `graded-backdrop.test.ts:95-115` already mounts the
graded dialog and requires the class on the rendered halo child, and CURE-2 gives the Slider its
own mounted detector; restating either inside `focus-veil.test.ts` would be exactly the
duplicated-derived-data class this tranche strikes.

The header (`tests/styles/focus-veil.test.ts:9-21`) no longer claims the applied arm catches a
class shipped with zero composers. It now states what its source scan can and cannot see, and
names the two render-level detectors by path.

### CURE-5 (record) — the fourth deviation

§4 now enumerates four deviations, not three: **D-4** `--glass-bg-overlay` → `--glass-plate-overlay`,
the identical never-existed-token class as D-2.

### Post-cure mutation results

| # | mutation | result |
|---|---|---|
| M6 | `ModalOverlay.vue` `v-if="isGraded"` → `v-if="false"`, class intact | `focus-veil.test.ts` **19/19 GREEN** — unchanged, and now HONEST: the header names the source scan's blind spot and cites the detectors by path. `graded-backdrop.test.ts` **6 failed \| 1 passed (7)**, first at `:103` (the mounted halo is null). The battery reds; the arm no longer claims to be what reds it. |
| M7 | D-1 inversion — the `<Teleport>` wrapper dropped, veil left nested | `focus-veil.test.ts` **1 failed \| 18 passed (19)** at `:223` `expect(veil.parentElement).toBe(document.body)`. The defect that was invisible to every gate now reds. |
| M8 | D-3 inversion — `trackViewport(true)` dropped, centre written once per grasp | `focus-veil.test.ts` **1 failed \| 18 passed (19)** at `:272` (`--veil-y` unchanged across the scroll). |
| M9 | D-2 inversion — the inline raise dropped from `hostStyle` | `focus-veil.test.ts` **1 failed \| 18 passed (19)** (`root.style.zIndex` empty under a live grasp). |

All four restored byte-exact (sha256 verified against a pre-mutation baseline;
`scratchpad/cure-backup/CHECKSUMS.txt`).

### Banked, routed, no code

- **RT-19G downgrade (no cure).** Challenger B's "the verify transcript does not reproduce" is
  DOWNGRADED to an intermittency note. The adjudicator reproduced the seat's clean transcript
  (149 files / 1114 + 2 expected fail, 25s); the `dropdown-menu.contract.test.ts:118` +
  `custom/aurora/atoms.test.ts:141` timeout pair is pre-existing **RT-19G**, already routed to #19,
  and cleared of #24 attribution by both challengers' pristine-tree controls. Neither reproduced on
  the post-cure full pass either. Nothing re-timed, nothing quarantined.
- **MOTION-CANON §4 G6 → routed to #27's engage-ladder lane.** This row lands the first two
  `data-engaged` writers in `src/` (`Slider.vue:337`, `ModalOverlay.vue:102-108`). G6 requires at
  most one `[data-engaged]` per document and nothing enforces it; a slider grasped inside a graded
  dialog would yield two. Unreachable in the current demo (reka inerts the background), so it is a
  route, not a defect. TR row **#27** already names `data-engaged` as its own subject and owns the
  at-most-one-writer enforcement.
- **The g2/F50 evidence bar** (driver takes the capture; this seat only records the bar). The owed
  RT-24A paired capture **MUST carry the nested-in-configurator scene as its falsifier** — a slider
  inside `.configurator-aside`'s `backdrop-filter` (`src/components/configurator/styles.css:39-41`),
  the placement 79 of the demo's sliders actually sit in. ASK g2's ratified default is KEEP; a
  capture that shows only the portal-immune Dialog and the flat specimen well would launder that
  default past the one placement that failed. The two artefacts above are the cure's own paint
  evidence, NOT the F50 capture: F50 still owes the paired before/after in light AND dark at both
  named consumers.

### Post-cure verify, verbatim

```
$ npx vue-tsc --noEmit
(no output; exit 0)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  149 passed (149)
      Tests  1115 passed | 2 expected fail (1117)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
```

Receipt byte-identical to the pre-cure cut. `dist/` and `dist-demo/` rebuilt (the same two
intermediate-RED classes §7 records — `npm run build` then `npm run demo:dist:build`).
`.bundle-ratchet` unmoved at `903382`. Nothing staged, committed or stashed.
