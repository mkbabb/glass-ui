# BK #41 · W-SORTABLE — RECORD

**Row:** TERMINAL-ROSTER §A row #41 · `| 41 | W-SORTABLE | CWT-2 §SORTABLE | Φ5 | a11y transaction
byte-preserved. + FLIP minted + the E4 rect-cache (`dropResolver.ts:36-74`) |`
**Spec of record:** `docs/tranches/BJ/addenda/2026-07-24-refinement/COMPONENT-WAVES-TERMINAL-2.md`
§SORTABLE-LIST + §W-SORTABLE (tri-fold adjudicated, `claude-fable-5`), fold rulings at CWT-2 §5.
**Seat:** scout + implement · modelId `claude-opus-5[1m]` · tree HEAD `e286d992` (SHARED, driver commits).
**Gate budget:** seats **+0**, register receipt byte-identical pre+post.

---

## 0 · SELECTION, AND WHY IT IS THIS ROW

Every Φ5 row ahead of #41 in TR order is gated, in flight, or landed. Re-derived at this seat
against the cursor **and** `git status` (the ⊕⁴⁸ instruction: the cursor alone cannot show a lane
that has not committed):

| row | why not | evidence |
|---|---|---|
| #21 W-DAG-REDUCE | gated on #17, hard; #17 is Φ4-UNSTARTED | `EXECUTION-DAG:32` |
| #25 W-FIELD-WELL | rides #82's `field-control.css` cut + #22's rung, both unbuilt | TR#25 §B.7 C-13k |
| #22 W-FROST | CODE-COMMITTED → DEMOTED-CURE-CUT, never selectable | cursor row 22 |
| #32 · #33 · #35 · #40 · #71 | IN FLIGHT IN THE WORKING TREE | `tests/gates/tabs-seam.test.ts`, `tests/gates/feedback-tint-seam.test.ts`, `src/components/slider/styles.css`, `src/components/{deck,carousel,pager-dots}/*`, `src/composables/motion/morph/eyeglass.ts` — all uncommitted |
| #34 W-TOAST | ~~sequences behind #33~~ [2026-08-07, C6] RULED **SELECTABLE** at ⊕⁴⁷ (`G-FROST-TRANSMISSION` is green on #22's ⊕³⁵ seal); not taken because its DAG dep #33 is itself IN FLIGHT in this tree | `EXECUTION-DAG:45` · `EXECUTION-PROGRESS.md:1085` |
| **#41 W-SORTABLE** | **dep `none`, no ASK gate, no working-tree lane** | `EXECUTION-DAG:52` |

---

## 1 · WHAT LANDED

**Disposition executed as ruled: KEEP + SURFACE-OWNING** — the a11y transaction survives, the
machinery flattens, the paint and the motion are greenfield.

### The vacancy replaces the drawn line
The 7.0.0 component drew a 5px gold shimmer bar at ∓2.5px inside an 8px gap — mass 9.4× the
indicator rung, spending the metal/earned register on a transient, and structurally unable to say
where an EMPTY list would receive. It is gone with `flagsFor`, `computeDropClasses`, both drop
classes and the four class constants. In its place: rows between the lift and the proposal
translate by one pitch, which opens a gap exactly where the row lands, and the lifted row's own
(unpainted) slot travels into it. **One spatial account, the row rendered exactly once, nothing
drawn.** An empty receiving list becomes the vacancy itself — `min-block-size` springs to the
subject's block size on `dock`, so ~~D4's invisible-target-that-accepts-the-drop closes by
construction rather than by a hint~~ **[2026-08-07, C2] D4's EMPTY arm closes by construction, and
that is the whole of what `min-block-size` reaches.** A populated receiver is already taller than
one pitch, so the floor is inert exactly where the arrival displaces a row, and that row ran into
the plate's own `overflow: clip`. The armed list now opens one pitch of `padding-block-end` on the
same `dock` curve: the empty arm keeps the floor, the populated arm gets the room, and "closes by
construction" is banked for the empty column and for nothing else.

### D1 was an ordering bug and is fixed by ordering
`begin()` stamped `SOURCE_DRAGGING_CLASS` on the source at ~~`dragController.ts:71`~~
`dragController.ts:72` [2026-08-07, C6], and `beginPointer` cloned at ~~`:171`~~ `:177`
[2026-08-07, C6] — so the clone inherited `.is-sortable-dragging{opacity:.35}` at
equal specificity, later rule wins, and the entire authored lift kit **had never rendered in any
shipped build** (shipped-`dist` byte order `.sortable-drag-ghost{`~~@45637~~@39189 <
`.is-sortable-dragging{`~~@46026~~@39578 [2026-08-07, C6 — re-measured in `dist/glass-ui.css`,
which still carries the 7.0.0 bytes. The **ORDER** is what the claim rests on and it holds; the two
offsets as first typed were never measured and the "(verified)" they were read under is withdrawn]).
`activate()` now takes the clone and only then marks the source. Nothing else was needed, and
nothing else could be paint-verified until it was.

### Motion — the split, and the ONE rAF spring path
| leg | mechanism | why |
|---|---|---|
| part / close | CSS `transition: transform` on `--spring-dock` (unconditional, on `.sortable-item`) | opening and closing are one mechanism read in two directions; the generated curve IS the spring, and the `a11y-overrides.css` blanket already governs it |
| promotion (radius · frost · swell) | CSS transitions on `--spring-press` | known endpoints, no velocity |
| follow | rAF, `translate3d`, linear, **zero easing** | MOTION-CANON §4:334 — springs never between a finger and the thing it holds (H1, ruled OPUS) |
| release flight | `SpringProgress` on `dock`, seeded with the gesture's own release velocity | the one leg whose initial condition is a velocity — hence **the one rAF spring path, and the one carrying the LOCAL PRM gate** |
| reversal | same flight to the origin rect; the vacancy closes on `press` | a cancel is not a proposal |

The local reduced-motion gate is the Opus arm's catch that the Fable arm missed: the CSS blanket
stops CSS clocks and cannot stop a JS integrator. It lives at `motion.ts:flyProgress` and collapses
the flight to a single frame at the endpoint — an honest cut, not a shortened animation.

### Two elements, two jobs, no timer
The ghost is a `div.sortable-ghost` plate wrapping the cloned row. The plate owns the FOLLOW
channel (`transform`, never transitioned); the clone owns the PROMOTION channel (`rotate` from JS,
`scale` from the stylesheet's `[data-lift]`). Writing both on one element would either force the
follow to share the promotion's transition — the lag the canon forbids — or force a timer to strip
it mid-gesture. Three writers, three properties, no composition order to get wrong.

### The E4 rect cache is a correctness fix, not an optimisation
`getBoundingClientRect()` reports the TRANSFORMED box, and the parting writes transforms on the
very rows the midpoint scan reads — so a live per-frame scan resolves against geometry the previous
frame's resolution produced, and oscillates at the boundary. `resolve.ts:snapshotRows` takes the
RESTING geometry once at lift; every frame resolves against it. One input, one output, no feedback
path. Scroll and resize re-take it (`drag.ts:resnapshot`) — the only layout read the gesture
performs after lift.

### Surviving untouched, as ruled
propose/commit/cancel · the four announcements, verbatim · focus retention · one `reorder` emit ·
cross-list transfer · the O(rows) midpoint scan · `createStrictContext` · clone id-stripping · the
1:1 finger attachment.

---

## 2 · PER-ITEM LEDGER (the §DEFECTS corpus, D1–D17)

| id | disposition | trace |
|---|---|---|
| D1 ghost ≡ source at 0.35 | **FIXED** | `drag.ts:activate` clones then marks; `styles.css` `[data-sortable-vacancy]` |
| D2 zero frames of motion | **FIXED** | `styles.css` `.sortable-item` unconditional dock transition · `drag.ts:releaseGhost` (the ghost outlives `cleanup`) · `motion.ts:flyProgress` |
| D3 stale `disabled` + unbounded `bindings` | **FIXED** | `useSortable.ts:registerItem` (no cache) + `SortableRowBinding.release` + `SortableItem.vue:onUnmounted` |
| D4 receiving list invisible target | ~~**FIXED**~~ **FIXED-EMPTY-ARM-ONLY → CURED BOTH ARMS** [2026-08-07, C2] | `drag.ts:partForExternal` + `styles.css` `[data-sortable-armed]`: `min-block-size` the empty arm, `padding-block-end` the populated one, both off `--sortable-vacancy-block` |
| D5 drop bar off-series, gold, 5s shimmer | **DELETED** | whole indicator gone; `styles.css` carries no `::before`/`::after`/`--color-gold` |
| D6 no row surface (F13's root) | **FIXED** | `styles.css` is the row's one surface; six call-site inventions deleted |
| D7 F13 horizontal | **FIXED (π receipt OWED)** | `.sortable-item__content` two-pole rule + the story's trailing pole; the ≥60% row-ink measure is a π row (§4) |
| D8 keydown unguarded | **already cured at HEAD, PRESERVED** | folded into `useSortable.ts:targetIsGrip`, one predicate both paths; the aurora victim (`AuroraColorSection.vue:254`) still clear |
| D9 row off-series every axis | **FIXED** | every value a series token; proved at `proportion-register.test.ts` per-component rows |
| D10 fine grip 284px² | **FIXED** | `.sortable-handle` sizes itself on both axes from `--icon-md + 2×--space-atom`; coarse floor stays the shared `[data-control-target]` |
| D11 dead at rest | **FIXED** | `@media (hover:hover)` row fill · `.glass-drag-grabbable` composed · `:focus-visible` on the ONE house register · `:active` press |
| D12 `aria-label` swallowed | **FIXED** | `SortableList.vue:ariaLabel` — the consumer wins, the prop is the fallback |
| D13 stationary tap = transaction | **FIXED** | `drag.ts` activation gate: 8px slop **or** the derived hold |
| D14 dead ceremony | **DELETED** | `axis` ×5 files · `dragPosition` · `pointerCaptureActive` + warn latch · `isNonZeroRadius` re-export |
| D15 structure (lying filenames, 4 CSS lanes, displaced test) | **FIXED** | `composables/` deleted; `transitionTiming.ts` + `touchGate.ts` deleted; `drag/ghost/resolve/motion.ts` say what they hold; ONE `<style src>` lane; `tests/composables/sortable/` deleted with its predicate |
| D16 `resolveVisibleRadius` walk | **DELETED** | the corner is authored (`--radius-card` on the plate) |
| D17 keyboard lifts nothing | **FIXED** | `drag.ts:onKeydown` in-place promotion (`[data-sortable-lifted]` + `.glass-floating`), H5's ruling — no clone |

### The five headline rulings, as executed
H1 OPUS (1:1 follow, no spring) · H2 FABLE (continuous list: plate card-16 / pad-12 / edge 0.16,
flush cells r0, seams 0.08, gap 0) · H3 FABLE (frosted promotion on the proven receiver) · H4
FABLE (the slot IS the vacancy — no second spatial marker) · H5 FABLE (keyboard lifts in place).

---

## 3 · DIVERGENCES FROM THE SPEC — every one with grounds

1. **The 400ms activation hold is DERIVED, not minted.** CWT-2 §3 ruled the figure a defect until
   lawed: *"no canon rung for hold durations; law it at MOTION-CANON (long-press rung) or derive;
   the 8px slop half is lawful."* It is derived: `ACTIVATION_HOLD_MS = springPreset("world").response
   × 1000` — a press that outlasts the slowest motion the library can make is no longer a tap. It
   binds by NAME, mints nothing, and moves when the register moves. It resolves to 480ms today.
2. **The lift swell is `--sortable-lift: calc(2 - var(--scale-press))`, not the literal 1.04.** The
   spec calls 1.04 "canon PRESS-swell" but no such token exists on disk; `--scale-press` (0.96)
   does. The swell is that rung mirrored about unity — exact, derived, and it moves with the rung.
   No `1.04` is typed in JS or CSS (gated).
3. **The focus ring composes `var(--focus-ring-shadow)`, not a re-typed `2px @0.48 + 0 0 8px @0.15`.**
   The spec predates #31 W-A11Y, which landed exactly one house focus register. Re-typing the
   grammar would mint a second ring — the failure `--focus-ring-shadow` exists to prevent. The
   spec's intent ("ship the grammar the global wave will land") is satisfied more strictly by
   composing the landed one. **DISCLOSED [2026-08-07, C6] — composing is not the same paint.**
   `tokens/scale-paper.css:61-62` resolves to `0 0 0 2px color-mix(in srgb,
   var(--focus-ring-color) 30%, transparent), 0 0 8px color-mix(…, 15%, transparent)`: the glow leg
   matches the spec's 0.15, but the **band is 30% against the spec's 0.48**, and
   `.sortable-handle:focus-visible` sets `outline: none`, so **the spec's outline half is dropped
   entirely** and the shadow is the sole marker. Both follow from taking the one house register
   instead of minting beside it, and neither byte is this row's to move.
4. **The plate carries the inline padding; the row carries the block padding.** The spec asks for
   plate `pad-inline 12` AND row `pad 12 block/inline`, which double-insets the content to 24 and
   makes the seam run at two different insets. §4:228's flush-cell law is senior (it is what H2 was
   decided on), so the frame's inline padding IS the row's — declared once, seam between the
   frame's own edges (the iOS grouped inset). The pairing law (`pad = r − 4`) is proved arithmetically
   at `proportion-register.test.ts`.
5. **`.sortable-item__content` is a flex row, not a second grid column.** The spec's `grid auto 1fr`
   would require `SortableItem` to render the handle, and the handle is a component the CONSUMER
   places inside the default slot. The flex form buys the identical read at zero API cost, and
   `:has()` carries the whole two-pole law in two rules: one content child fills the measure, two
   or more become poles.
6. **The pointer-capture state is gone but the capture call went with it.** The spec struck
   `pointerCaptureActive` + the warn latch; with no reader left, the boolean the call returned had
   nothing to report, and the document listeners were always the unconditional primary path. The
   whole 40-line `touchGate.ts` retires rather than half of it. Nothing masks: there is one drag
   path and it is the one that always ran.
7. **`MAX_TILT_DEG` is module-private.** Exported it would be an orphan export — `G-OVERFIT`'s
   EXPORT-REACH arm flags it, and it did (verified, then fixed).

## 4 · LOC — MEASURED, AND THE SPEC'S PROJECTION MISSED

Stated plainly rather than flattered. Component only, excluding `README.md`, excluding the test:

| | nonblank | code (comments stripped) |
|---|---|---|
| HEAD (7.0.0) | 1,048 | 832 |
| landed | 1,400 | 1,082 |
| **Δ** | **+352** | **+250** |

**The spec projected 1128 → ~950 (−178) and that projection is wrong by ~600 lines.** The strike
half executed in full — every named strike is gone (gold bar, shimmer, both drop classes,
`flagsFor`/`computeDropClasses`, the four class constants, `transitionTiming.ts`, `touchGate.ts`,
the `axis` thread, `dragPosition`, `pointerCaptureActive` + latch, the radius hunt and its displaced
test, the `rotate(1.5deg)` constant, both `transition:none !important`, the tan `--border`, the
binding cache, the aria shadow, the unconditional README 44, all three SFC style blocks). What the
spec under-costed is the ADD: it budgeted `motion.ts ~60` + `guards/bindings/local-PRM ~35` for the
whole greenfield, and the greenfield is **five mechanisms that did not exist** — the activation
gate, the vacancy engine (local + cross-list + empty-receive), the velocity-seeded release flight,
the two-channel ghost, and the snapshot invalidation. `drag.ts` alone is 421 code lines against
`dragController.ts`'s 267 for that reason.

Deletions elsewhere in the cut: `tests/composables/sortable/drag-ring-radius.test.ts` (−65, dies
with its predicate) · `demo/stories/data/sortable-list.vue` 265 → 173 (−92, the six invented row
treatments, three hand-rolled grips and the three duplicated kanban columns).

---

## 5 · GATES — seats +0, exactly 60, nothing minted

CWT-2 §5's FOLD RULING is what this cut obeys. Of the spec's 14:

| gate | home | seats |
|---|---|---|
| G-8 SERIES | `tests/styles/proportion-register.test.ts` — the CWT-2:1533 tranche-wide register's **per-component rows** (6 cases) | +0 (existing bound seat) |
| G-6 GRIP | `tests/components/a11y/coarse-target.test.ts` — the **A6 seat's arm** (4 cases) | +0 (existing seat) |
| G-14 FROST | **ROUTED to #22 W-FROST's receiver matrix**, which owns every `backdrop-filter` receiver claim; the paired π row travels with it | +0 |
| G-1 · G-2 · G-3 · G-4 · G-5 · G-7 · G-9 · G-10 · G-11 · G-12 · G-13 | `tests/components/sortable-list/battery.test.ts` — **tier-2 close-battery** (§B.5's declared acceptance class), ~~28~~ **30** cases [2026-08-07 — the C1 and C2 arms, joined to G-3 and G-4; no `G-*` id minted] | +0 |

**G-5 is valid only paired with G-2 and says so in its own title** — "nothing is drawn" greens on a
deleted component. Both live in one file so neither can be run without the other; the spec ruled
this openly and it is carried, not quietly dropped.

Register receipt, byte-identical pre and post:
```
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```
`violations:1` is **not this row's**: `pager.tabs.panel-linkage` names
`tests/components/pager-dots.contract.test.ts`, which #40 W-PAGER has deleted in the working tree
and not yet committed. It is present in the PRE receipt at the same value.

### Born-RED census — 24 of 28, re-derived not remembered
*(The two cure cases are counted separately and against a DIFFERENT baseline — the PRE-CURE working
tree, not pristine HEAD, since the bytes they falsify are this row's own. Both were RED there and
GREEN after; §CURE holds the two failure strings.)*
The battery was run against a pristine `git archive HEAD` tree (`scratchpad/pristine`, HEAD
`e286d992`, sortable at 7.0.0):

```
Tests  24 failed | 4 passed (28)
```

The four GREEN-at-HEAD cases are honest regression arms and are named as such rather than counted
as born-RED: *"the parting is compositor-only"* (vacuously true when nothing moved), *"crossing the
slop opens the transaction"* (HEAD announced too, just at pointerdown), *"the prop is still the
fallback"*, and *"the promotion is released when the transaction ends"* (true because nothing was
ever promoted).

### Mutation bites — 12 named, 12 bite
Each applied to an isolated overlay tree and reverted; `Tests N failed` is the bite.

| # | mutation | reds |
|---|---|---|
| M1 | stamp the vacancy BEFORE the clone | G-1 (1) |
| M2 | `partLocal` no-ops (remove the FLIP) | ~~G-2 (3)~~ **G-2 (2) + G-13 (1)** [2026-08-07, C6 — re-planted and re-read at the cured bytes: the third red is *"the keyboard path parts the rows exactly as the pointer path does"*, which is G-13's, and the mis-homing hid that `partLocal` is the keyboard path's engine too] |
| M3 | destroy the ghost synchronously at release | G-3 (2) |
| M4 | delete the armed-receive state | G-4 (1) |
| M5 | drop the activation slop | G-9 (1) |
| M6 | restore the binding cache | G-10 (2) |
| M7 | restore the aria-label bind order | G-11 (1) |
| M8 | remove the in-place keyboard lift | G-13 (1) |
| M9 | re-add a drawn `::after` insertion line | G-5 (1) |
| M10 | re-add an idle `animation-name` at rest | G-7 (1) |
| M11 | plate radius → `10px` literal | PROPORTION arm (1) |
| M12 | grip inline-size → `20px` (under 2.5.8) | A6 arm (2) |

---

## 6 · VERIFY GATE (verbatim)

```
$ npx vue-tsc --noEmit
(no output — exit 0)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 150 passed (157)
      Tests  12 failed | 1366 passed | 2 expected fail (1380)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

**RE-RUN AT THE CURED BYTES [2026-08-07]** — the same seven files, the same twelve failures, +2
passes from the two cure cases:

```
$ npx vue-tsc --noEmit
(no output — exit 0)

$ npx vitest run tests/components/sortable-list/
 Test Files  1 passed (1)
      Tests  30 passed (30)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 150 passed (157)
      Tests  12 failed | 1368 passed | 2 expected fail (1382)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

`npm run build` **BUNDLES GREEN AND THEN FAILS FOREIGN** — `✓ 704 modules transformed`,
`✓ built in 501ms`, the style closure written, and then `closeBundle` throws
`package.json/package-lock.json root metadata mismatch: devDependencies, peerDependencies,
peerDependenciesMeta`. Read directly out of the two files, the mismatch is exactly
`embla-carousel` + `embla-carousel-vue` present in the LOCK and absent from `package.json` on all
three keys: **#40 W-CAROUSEL's uncommitted peer removal with the lock not regenerated**, the same
byte §6 above already names as #40's in the `public-surface.spec.ts` failures. This row touches no
dependency metadata, and the bundle that carries its files completed before the check ran.

**The 12 failures are all pre-existing and all owned by other lanes** — banked at this seat BEFORE
the cut (13 failed / 8 files, of which `dropdown-menu.contract`, `sheet/sheet-reach` and
`aurora/atoms` are intermittent and passed on the post run). None is sortable's:
`stacked-url-filter` (#40, self-declaring) · `boot-graph` build arm (stale dist) ·
`gate-register` ×3 (the #40 uncommitted test deletion above) · `overfit-structure`
(~~#19's~~ **the #40/#71 morph lane's** [2026-08-07, C6 — it names
`src/composables/motion/morph/useLeadTrail.ts :: LEAD_TRAIL_TAU_E_S` and `:: trailOffset`, nothing
of #19's], and verified to name no sortable export after `MAX_TILT_DEG` was un-exported) ·
`carousel/contract`,
`pager-dots/contract` ×4, `pager-dots/morph` (#40, in the working tree).

`tests/public-surface.spec.ts` was also run (not part of the gate): the `sortable-list` subpath row
passes; its 2 failures are the stale-`dist` closure and the `package.json` embla removal, both
#40's.

---

## 7 · π — OWED, with its route

No live-browser claim is made at this seat and none may be read into this record. The §7 obligations
stand OWED, route `/data/sortable-list`, light AND dark, paired RED/GREEN in the same frame:

| claim | measure | viewport | engine |
|---|---|---|---|
| lift sole + legible | ghost opacity ≥0.9, source slot = vacancy | 1440×900 | chromium AND safari-app |
| ghost frosts | computed `backdrop-filter` ~~`blur(11px) saturate(1.6)`~~ **`blur(20px) saturate(1.5)`** [2026-08-07, C6] mid-drag — **screenshot/computed-style only, never `getContext()`** | 1440×900 | chromium AND safari-app |
| momentum | 6-frame strip across the drop + pointerup+0…330ms | 1440×900 | chromium; safari-app pair |
| **release lands in the RECEIVER** [2026-08-07, C1] | the plate's settled rect lies inside the TARGET list's box, at the gap it opened — not back at the source's slot | 1440×900 | chromium AND safari-app |
| the gap opens | populated list AND emptied kanban column, paired PNG | 1440×900 | chromium AND safari-app |
| **populated receiver keeps its last row** [2026-08-07, C2] | the row the arrival displaces is fully visible — no `overflow: clip` truncation — paired against the empty column | 1440×900 | chromium AND safari-app |
| F13 receipt | row ink fraction ≥60% at the ROW **AND the trailing pole's inline end within one `--space-body` of the row's content edge** [2026-08-07, C3 — a centred-thirds paint clears an ink fraction and fails this] | **1440 AND 1920** | chromium |
| targets | ≥32×32 fine / 44 coarse | 1440 fine + 390×844 coarse | chromium AND safari-app |
| series | plate r16/edge 0.16, pad 12, seam 0.08, one type size, PRM sweep | 1440 + 390 | chromium AND safari-app |

Safari is BLOCKING at the cut per the spec (`pkill -f safaridriver` then `scripts/safari-probe.mjs`);
unavailable ⇒ the receipt reads "WebKit NOT run", never "both engines", and never Safari inferred
from Playwright-WebKit.

**The frost figure, and what it costs [2026-08-07, C6].** The ghost is `.glass-floating`, which reads
`backdrop-filter: var(--glass-blur-floating)` (`glass/ladder.css:103`), and that rung composes
`tokens/glass.css:88` (radius **20px**) × `--glass-level` with `:98` (saturate **1.5**) at `:110`.
The `11px`/`1.6` pair was never on disk at any level — it is not this component's paint and the
criterion cannot be measured against it. The 20px itself is the figure `MOTION-CANON.md:95`/`:248`
struck as busting the ladder's own ≤15px budget band, which row #38 already routed as **RT-38C** to
the glass lane; this row states the painted value, measures against it, and adds nothing to that
route but a second consumer.

---

## 8 · ROUTED (§10, carried forward unchanged)

| what | owner |
|---|---|
| `.glass-drag-*` register home move out of `tabs/styles/` | **#32 W-TABS** — this wave composes `.glass-drag-grabbable` only |
| ONE `.sr-only` rule in `src/styles/` | W-TIMELINE (#46) / W-A11Y-LIVE-REGIONS — whichever lands first mints; this wave consumes |
| `OklchStopRow.vue` + `AuroraColorSection.vue` → `<SortableHandle>` adoption | aurora consumer lane, marked addendum per the consumer-updates ruling. **Still functional at this cut** (the hand-rolled `data-sortable-handle` button satisfies the grip selector unchanged, and the single-content-child rule makes its grid fill the row) |
| `MOTION-CANON.md:219` stale `--spring-dock` literal | canon owner; every consumer here binds by name |
| `material.css:66` subtree-inheritance defect | PROPORTION §5a owner; measured not to affect `.glass-floating` |
| G-14 FROST + the "ghost frosts" π row | **#22 W-FROST** receiver matrix |
| `--border` divider-ink retirement library-wide | the token wave; this wave stopped consuming it |

**RT-41A (opened by this cut):** the `dropIndex` computed on `UseSortableReturn` now has no reader
inside the family — the drop classes it fed are deleted. It is kept because it is the only public
read of the live proposal and the demo/consumer surface may want it; if #64's TIER-3 RESIDUAL sweep
finds no site, it dies there rather than being guessed at here.

---

## 9 · FILES

**Added:** `src/components/sortable-list/{drag.ts, ghost.ts, motion.ts, resolve.ts, types.ts,
useSortable.ts, styles.css}` · `tests/components/sortable-list/battery.test.ts`
**Rewritten:** `SortableList.vue` · `SortableItem.vue` · `SortableHandle.vue` · `README.md` ·
`index.ts` · `context.ts` · `demo/stories/data/sortable-list.vue`
**Deleted:** `src/components/sortable-list/composables/` (7 files) ·
`tests/composables/sortable/drag-ring-radius.test.ts` (and the now-empty directory)
**Amended:** `tests/components/sortable-list.contract.test.ts` (the pointercancel case crosses the
slop — the stationary-tap half is D13 and is asserted in the battery) ·
`tests/components/a11y/key-scope.test.ts` (the predicate arm re-expressed BEHAVIOURALLY through the
component, which is stronger than the deep-import unit fake it replaced) ·
`tests/components/a11y/coarse-target.test.ts` (+A6 arm) ·
`tests/styles/proportion-register.test.ts` (+per-component rows) ·
`tests/styles/radius-role-canon.test.ts` (the drop-indicator case struck **in place, dated**, with
its subject; the role binding it was really testing moves to the two live corners)

**NOT THIS ROW'S BYTES, carried in the shared tree [2026-08-07, C6].** Two `slider/Slider.vue` →
`slider/styles.css` re-points sit inside files this row also amends —
`tests/components/a11y/coarse-target.test.ts:38` (`const SLIDER`) and
`tests/styles/radius-role-canon.test.ts:636` (the `FORKS` row). They are **#35 W-SLIDER's**, whose
uncommitted lane moved the Slider's CSS out of its SFC; they ride in this row's diff only because
the files are shared, and they must not be read as this row's edit.

---

## CURE (2026-08-07) — the Φ5 adjudication's residue, executed

Adjudicated **CURE-REQUIRED** at HEAD `e286d992`; the driver ratified the residue verbatim as the
cure order (`CURE-ORDER-41.md`). What STOOD and was not redone: the selection, the whole strike
half, D1's stamp-before-clone, the a11y transaction, the same-list vacancy engine, seats +0, the
24/28 born-RED census, the mutation bites, the LOC honesty, the three derivations, the routes.

**C1 · every cross-list release flew the plate back to the list it had just left.** `commit()`
measured `sourceEl` unconditionally, and on a foreign proposal `partLeaving` leaves the source row
at its OWN resting slot — so the endpoint was the source's slot in the source's list while the item
went somewhere else entirely. The endpoint is now the RECEIVER's to answer, because the receiver
owns the gap: `InstanceHandle.getVacancyOrigin(index)` → `drag.ts:vacancyOrigin`, resolved from an
`Arrival` anchor the receiver takes on the frame its arm OPENS (before any of its rows carries a
parting transform) and holds as an **offset from the container box** rather than in viewport
coordinates. The container never carries a transform, so re-reading it at release survives a scroll
and cannot pick up a row's mid-transition position — the same reason the source snapshots once at
lift (E4). One formula spans `index` 0…rows.length, the last being the append slot after the final
row; an EMPTY receiver has no rows to offset from, so its own box IS the landing, exactly as the
cure order words it. `RowRect` stores `top`/`left` in place of `mid` (the midpoint is derived at
the one site that scans, so a landing corner and a scan midpoint cannot drift apart), and
`releaseGhost` takes `Origin | null` so an unmeasurable endpoint still RETIRES the plate.
**Born-RED:** *"a cross-list release flies to the RECEIVER's gap, not the source's slot"* — two
grouped lists at disjoint inline ranges, `expected 0 to be greater than or equal to 100`, the plate
landing at the source's `x = 0` against a receiver at `x ∈ [100, 190]`. GREEN post-cure at
`(100, 40)`, the gap the receiver actually opened. The flight is read under the family's own local
reduced-motion gate, which writes the endpoint on frame one — the shipped mechanism, not a hook.

**C2 · D4 was fixed on the EMPTY arm only.** `min-block-size` cannot exceed a populated receiver's
natural height, so the floor is inert exactly where the arrival displaces a row, and that row met
the plate's `overflow: clip`. `.sortable-list[data-sortable-armed]` now adds
`padding-block-end: var(--sortable-vacancy-block, 0px)` with `padding-block-end` extended onto the
base transition list, so the room arrives on the same `dock` curve the rows travel on. The empty
arm keeps `min-block-size` and pays nothing twice — the floor already covers that height.
**Born-RED:** *"a POPULATED receiver opens block room, so the displaced row is not clipped"* — the
armed rule carried `background-color` and nothing else. The runtime half (a populated receiver arms,
sets the vacancy block, and parts BOTH rows by one pitch) was green pre-cure and is named here as a
regression arm rather than counted as born-RED; happy-dom lays nothing out, so the ROOM is asserted
where it is authored and the painted cell is π-41's.

**C3 · the two-pole rule painted a centred label in thirds, against its own comment.**
`justify-content: space-between` distributes every flex item, the `order: -1` grip included, so
three items put the label in the middle third. The grip is not a pole: the free space now belongs
between the content children, taken as a leading auto margin by any content child that FOLLOWS
another content child. `justify-content: flex-start` stands on the base rule, and the sibling
combinator already carries "two or more", so the `:has()` wrapper retires with it — one rule, the
same predicate as the single-child rule read the other way, and DOM-order-agnostic (the grip is
excluded by selector, not by position, which is what `order: -1` exists for). The owed F13 π
criterion is tightened in §7 so a centred-thirds paint cannot clear it on ink fraction alone.

**C4 · the vanished-source path orphaned the ghost.** `commit()`'s `sourceIndex < 0` early-return
ran `cleanup()`, which never touches the ghost, and the next `activate()` overwrote the reference —
leaving a `position: fixed` z-9999 plate on `document.body` for the life of the page. That path now
routes through `releaseGhost(sourceOrigin())` BEFORE `cleanup()`; with no measurable slot the plate
dissolves where it is, which is a retirement, not a landing.

**C5 · a foreign proposal's parting dropped on every scroll and resize.** `resnapshot()` calls
`clearShifts()` and then re-applied `partLocal` only on the `target === null` arm, so a cross-list
drag left the source list standing open at its full height until the next pointermove. The foreign
arm now re-applies `partLeaving(source)` and refreshes the receiver with the re-measured block
(`setExternalSubjectBlock` then `setExternalDropIndex`, the same order `propose()` uses). The
receiver's `Arrival` anchor is deliberately NOT re-taken there — it is an offset from a box that is
re-read at release, so it is already scroll-invariant.

**C6 · the record's own false figures, struck in place and dated** — §0's `EXECUTION-DAG` cite and
the ⊕⁴⁷ selectable ruling · §1's `dragController` coordinates and the never-measured dist offsets ·
§2's D4 disposition · §3's focus-ring divergence disclosure · §5's M2 homing · §6's
`overfit-structure` owner · §7's frost figure and F13 criterion · §9's two #35 bytes. The battery
header's duplicated `dragController` coordinates are struck at their site rather than re-corrected:
the RECORD is the one source for them.

**C7 ·** both paste blocks re-drafted at `PASTE-BLOCKS.md` in this directory. The pre-cure drafts
banked "closes by construction", an unqualified vacancy claim and a release-flight claim that C1 and
C2 falsify; they are not appended as written.

**π-41 remains OWED in full** — no live-browser claim is made at this seat either. The route is §7,
now carrying two more cells (the C1 endpoint, the C2 populated receiver) and the corrected frost
figure; Safari is BLOCKING via `scripts/safari-probe.mjs`, never Playwright-WebKit.

**Files touched by the cure:** `src/components/sortable-list/{drag.ts, resolve.ts, types.ts,
useSortable.ts, styles.css}` · `tests/components/sortable-list/battery.test.ts` (+2 cases, 28 → 30)
· this record · `PASTE-BLOCKS.md` (new).
