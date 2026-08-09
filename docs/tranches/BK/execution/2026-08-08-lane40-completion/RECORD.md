# BK #40 W-PAGER — COMPLETION SEAT (2026-08-08)

Model: **claude-opus-5[1m]** (Opus 5, 1M context) — asserted at seat open, before the first byte.

Seat scope: COMPLETION of lane #40 W-PAGER (the ✦³ DECK-APOTHEOSIS widening — deck/carousel/
pager-dots rework), which has sat UNCOMMITTED in the shared working tree all session while every
Φ5 implement row fenced around it. Not a redesign: the lane is designed and mostly implemented,
and this seat closes it to green. SHARED TREE — nothing staged, nothing committed, nothing
stashed; the driver commits.

Baseline banked BEFORE the first byte: `/tmp/bk-lane40-baseline-1786236038.diff` (`git diff -U0`,
6,593 lines) + `git status --porcelain | wc -l` = **100**, at HEAD `7e6e3def`. The `-U0` baseline
CANNOT see untracked files, so `git status --porcelain | grep '^??'` was banked separately at
`/tmp/bk-lane40-status-1786236038.txt` (22 untracked entries — 18 in the lane's scope once the 4
foreign untracked in §1's FOREIGN row are set aside) and every one attributed by content in §1.
[FIGURE CORRECTED 2026-08-08, adjudication §7: the artefact holds 22 `??` entries, not 18.]

---

## §1 · LANE CENSUS — every dirty and untracked path attributed

**The whole 100-entry baseline is FOREIGN-OR-#40's; this seat authored none of it.** #40's own
bytes are identified by three converging detectors, not by assumption: (a) subject — deck,
carousel, pager-dots, the shared windowed-sequence substrate and the embla clean break named in
TERMINAL-ROSTER row 40; (b) mtime clustering — the untracked deck/carousel news lands in ONE
2026-08-06 evening span, measured 20:10:42 (`deck/types.ts`) through 20:23:28 (`carousel/styles.css`),
with `useLeadTrail.ts` 20:24 and `worm.ts` 20:29 continuing it (D-6's pre-cure measurements; the
seat's own cures and the build later moved those two mtimes), and `DeckSlide.vue`/`DeckStage.vue`
re-touched 2026-08-08 14:23:55 — those two rest on detectors (a) and (c); (c) import contact with
#40's own untracked files. [FIGURE CORRECTED 2026-08-08, adjudication §7: the span as first
written, "20:24–20:33", did not cover the twelve files measured 20:10–20:23.]

### #40 W-PAGER — tracked, modified

`src/components/carousel/Carousel.vue` · `CarouselContent.vue` · `CarouselItem.vue` ·
`CarouselPager.vue` · `useCarousel.ts` · `carousel/index.ts` · `src/components/deck/README.md` ·
`deck/composables/useDeck.ts` · `useDeckKeyboard.ts` · `deck/constants.ts` · `deck/index.ts` ·
`src/components/pager-dots/PagerDots.vue` · `pager-dots/README.md` · `pager-dots/index.ts` ·
`src/styles/glass/surfaces-pager.css` · `demo/stories/motion/deck.vue` ·
`demo/stories/navigation/carousel.vue` · `package.json` (the embla clean break).

### #40 W-PAGER — tracked, deleted

`src/components/carousel/arrival.ts` · `carousel/interface.ts` ·
`src/components/pager-dots/composables/useLeadTrail.ts` · `composables/usePagerWorm.ts` ·
`pager-dots/constants.ts` · `pager-dots/pagerWindow.ts` ·
`tests/components/carousel.arrival.test.ts` · `carousel.contract.test.ts` ·
`custom/deck/Deck.contract.test.ts` · `pager-dots.contract.test.ts` · `pager-dots.morph.test.ts`.

### #40 W-PAGER — untracked, new

`src/components/carousel/projection.ts` · `carousel/styles.css` · `carousel/types.ts` ·
`src/components/deck/DeckSlide.vue` · `DeckStage.vue` · `deck/composables/useDeckCapture.ts` ·
`useDeckHashSync.ts` · `useDeckSnap.ts` · `useDeckSwipe.ts` · `useEdgeZones.ts` ·
`deck/slideContext.ts` · `deck/styles/` · `deck/types.ts` · `deck/window.ts` ·
`src/components/pager-dots/worm.ts` · `src/composables/motion/morph/useLeadTrail.ts` ·
`tests/components/carousel/`.

### FOREIGN — other uncommitted lanes, untouched by this seat

`#32 W-TABS` (`src/components/tabs/**`, `tests/gates/tabs-seam.test.ts`) · `#33`
(`_shared/feedback/feedback-tone.css`, `tests/gates/feedback-tint-seam.test.ts`) · `#35 W-SLIDER`
(`src/components/slider/**`, `slider/styles.css`, `tests/components/slider.contract.test.ts`,
`tests/components/a11y/focus-visible.test.ts`) · `#71` (`useSelectionGroup.ts`,
`useSelectionIndicator.ts`, `morph/eyeglass.ts`) · plus the aurora/blob/fourier/glass-material
demo dirt, `handmark/**`, `alert/**`, `configurator/styles.css`, `darkModeSyncScript.ts`,
`useDragVelocity.ts`, `procedural/color.glsl.ts`, `prng.ts`, `springPresets.ts`, `src/index.ts`,
`src/styles/**` and the remaining `tests/**` modifications. **Every one of these is exactly as
the baseline left it** — see §5's fence.

---

## §2 · PER-DEFECT COMPLETION LEDGER

Baseline battery (`npx vitest run tests/styles tests/components tests/gates`, banked at
`/tmp/bk-lane40-battery-0.txt`): **12 failed | 1533 passed | 5 expected fail (1550)**, 7 failing
files. Ten of the twelve are the lane's; the ledger below closes eleven — the twelfth (`#7`'s
`stacked-url-filter`) is closed here too because the case's own title and body assign the flip to
this lane by name.

### D-1 · `gate-register` ×3 → the roster `sourcePath` (violations 1 → 0)

**Trace.** `node scripts/gate-register.mjs` reported
`VIOLATION active pager.tabs.panel-linkage: sourcePath missing — tests/components/pager-dots.contract.test.ts`,
and the same missing path threw ENOENT through two more cases
(`gate-register.test.ts:33` `realIo.read`, via `blockVictim` at `:266` and `:289`), so ONE stale
path RED three cases. The lane had MOVED the file to `tests/components/pager-dots/contract.test.ts`.

**THE ORDER'S PROPOSED MECHANISM WAS REFUSED, WITH FIVE CITES.** The seat was told to re-point the
roster row at the new test home. **The roster may not be edited by any lane**, and the record says
so on disk four separate ways:

1. `scripts/gate-register.mjs:66` pins `PINNED_ROSTER_SHA256 = dc05df91…` against
   `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json`; the
   script REDs a new violation the moment the file's sha moves.
2. `SEAT-BINDING.json:591` (#9's own file), verbatim: *"C19 is sha-pinned (dc05df91...) and #9 may
   not edit it"* — the register's OWNER row is barred; a fortiori a component lane is.
3. `SEAT-BINDING.json:28`, the banked `preferredMechanism`, verbatim: *"C19 then stays byte-frozen
   and every committed quotation of dc05df91… remains TRUE as a statement about C19; only
   `ROSTER_PATH` + `PINNED_ROSTER_SHA256` in `scripts/gate-register.mjs` move, **exactly once**"* —
   at the C20 successor cut, which is #65's C-9 batch.
4. #65's `executionDisposition` in the same file: landing a C19 byte early *"spends that pin early
   and forces a SECOND pin"*, and *"the pin is also quoted in THREE committed records outside
   #65's edit fence (`TERMINAL-ROSTER.md:159`, `:215`/§B.5:333, and #68's CANON.md); landing the
   byte here would make all three false on disk with the repair only banked."*
5. RT-89-B is the live precedent for the shape: #89 wanted a test re-home and it was REFUSED
   in-lane and ROUTED to C-10 → #65/#66.

The order's own ACCEPTANCE settles it: *"the receipt's OTHER figures must not move."* Editing C19
moves `rosterSha256` by construction, so the instructed mechanism cannot satisfy the instructed
acceptance. The mechanism that satisfies **both** is the one taken.

**Cut.** `tests/components/pager-dots/contract.test.ts` → `tests/components/pager-dots.contract.test.ts`
and `.../morph.test.ts` → `tests/components/pager-dots.morph.test.ts` (plain `mv`, nothing staged);
the emptied `tests/components/pager-dots/` directory removed.

**THE MOVE COST THE LANE NOTHING, AND THAT IS MEASURED, NOT ASSERTED.** Immediately after the
restore, `git diff --stat` over both files was **EMPTY** — the re-homed files were byte-identical
to HEAD. #40 never edited them; it only relocated them. (This seat's D-2/D-3/D-4 cures then
edited both, so the DELIVERED files differ from HEAD by exactly those dated strikes.) The same
held for the carousel at that same pre-cure moment:
`git show HEAD:tests/components/carousel.contract.test.ts` diffed IDENTICAL against
`tests/components/carousel/contract.test.ts` — D-5's strike then edited that file too (§4 lists it
as a strike site; the delivered diff is 21 lines). The re-home was packaging, not design, and it is
ROUTED to **C-10 → #65/#66** to ride the C20 roster cut, where the `sourcePath` can move with the
pin, exactly once, as the banked mechanism requires.

`tests/components/carousel/` is left where the lane put it: it is UNROSTERED (the C19 census
carries exactly one pager/carousel/deck row, verified by parsing all 64 rows), so it creates no
violation and needs no fence.

**Receipt.** `violations:1` → **`violations:0`**, `rosterSha256` unmoved at `dc05df91`, every
other field character-identical. THE FIRST `violations:0` ALL SESSION.

### D-2 · `pager-dots/contract` ×2 — the SVG-resources describe, STRUCK

**Trace.** `keeps filter and clip ids unique per instance and stable across rerender` and
`allocates a fresh namespace on remount and removes definitions on unmount` both failed on
`Unable to get filter` / `clipPath`. They pin `<filter>`/`<clipPath>` id uniqueness, `url(#…)`
reference from the root style, fresh-namespace-on-remount and removal-on-unmount.

**THE MECHANISM IS DELETED, NOT MOVED.** `PagerDots.vue`'s own header: *"THE WORM IS FILTERLESS"*
— the SVG blur-and-threshold graph and the Bézier clip are gone, and `grep` over the component
finds no `<filter>`, no `<clipPath>` and no `url(#` outside prose. A resource-lifecycle case over
resources that do not exist is a promise, not a detector, so the describe is STRUCK IN PLACE with
a dated bracket that names the successor coverage rather than dropping it silently: the repo-wide
`tests/styles/stacked-url-filter.test.ts` stacked case (D-7), which asserts that NO file in `src/`
paints `filter: url(#…)` beside its own backdrop lens. The id-collision class cannot recur without
a `url(#…)` first, and that is now a live invariant instead of one component's fixture. The
`MultiPager` fixture dies with its only consumers.

### D-3 · `pager-dots/contract` ×2 — the boundary fixture's register

**Trace.** `clamps selection when a dynamic count shrinks` and `normalizes fractional semantic
selection…` both failed on `Unable to get [aria-selected="true"]`, and the rendered DOM in the
failure carries `role="group"` + `aria-current="true"`. The lane flipped `PagerDots` `pattern`
from `"tabs"` (HEAD `:89`) to `"group"` (`:78`) — the presentation register is the common case and
the tablist register is only correct when the caller owns real panels. `BoundaryPager` rode the
default and asserted the tabs register.

**Cut.** `BoundaryPager` now states `pattern="tabs"` explicitly. Chosen over flipping the two
lookups to `aria-current` because `aria-selected` has NO other pager coverage anywhere in `tests/`
(the tabs describe asserts `role` and `aria-controls` only), and the boundary math — clamp on
count shrink, fractional normalisation, integral keyboard steps — is register-independent, so
nothing is weakened. The group register keeps its own describe.

### D-4 · `pager-dots/morph` ×1 — the harness measured the WRONG CHANNEL

**Trace.** `is ONE reunited body at rest — no bridge, no gap`:
`expected 12 to be less than or equal to 1`, i.e. `rest.hi` read **0** against a painted centre of
12. `installBedRectStub` stubbed `getBoundingClientRect`, the PREDECESSOR's channel. The engine it
measures reads offsets: `worm.ts:120-123` (`layer.offsetTop`/`offsetLeft`,
`el.offsetLeft + el.offsetWidth / 2`) and `PagerDots.vue:169-170`. So the rail measured ZERO —
`geometry.origin` 0 and the `DEFAULT_PITCH_PX` fallback of 28.

**THE HARNESS WAS FALSE-GREEN AT TWO OF ITS FOUR CASES, and the arithmetic says why.** With the
broken stub, `centerOf(3) = 0 + 3 × 28 = 84`, and the test's own `centerOfIndex(3) = 3 × 24 + 12 =
84`. The two travel cases agreed with a broken harness **by coincidence at exactly one index**.
Only the rest case, at index 0, could see it.

**Cut.** `installBedOffsetStub()` defines the four offset accessors on `HTMLElement.prototype`
(saving and restoring the native descriptors, so no cross-test leak), giving each `.goo-dot`
`offsetLeft = i × CELL`, `offsetWidth = offsetHeight = CELL`, `offsetTop = 0`, and every other host
the origin. `geometry.origin` becomes 12 and `pitch` becomes CELL **by construction**, so
`centerOf(i)` and `centerOfIndex(i)` agree at EVERY index for the reason they should. 4/4 green.

**BITE PROVED, not asserted.** A planted bridge-kill in `worm.ts:216`
(`neck.style.opacity = "0"`) under the NEW stub REDs the signature case with
`no connective: neck held for … frames < 6 — a cross-fade, not a worm`
(`morph.test.ts:244`). `worm.ts` restored byte-exact from a pre-mutation copy (`diff` clean) and
re-run 4/4.

### D-5 · `carousel/contract` ×1 — the named region's dead tab stop

**Trace.** `exposes a named carousel region — and its tab stop —…`:
`expected undefined to be '0'`. The lane deleted the root's `tabindex` and its keydown handler.
`Carousel.vue`'s own header states the ground, verbatim: *"The one keyboard handler it carried was
unreachable on all five mounts it shipped in — the root took `tabindex` only when it also took an
accessible name, so an unnamed carousel had no way to receive the key it was listening for — and
the ONE paging contract lives on the dot rail now."* `PagerDots.vue` agrees from the other side:
*"THE RAIL OWNS THE ONLY PAGING KEYS IN THE LIBRARY."*

**Cut.** The case asserts `tabindex` **undefined** and its title says so; the stale
"over-application guard" clause is STRUCK IN PLACE with a dated bracket carrying the reason — a
container that answers no key is not a tab stop, and giving it one spends a keyboard user's Tab on
a dead stop. All three cases in the describe now agree, and the paging keys are reached at the
rail's own roving-tabindex button.

### D-6 · `overfit-structure` ×2 offender rows — `useLeadTrail`'s export leak

**OWNERSHIP ADJUDICATED FROM THE CURSOR, AS ORDERED — the file is #40's, not #26's.** RT-89-G
(⊕⁶⁵) routes an untracked `useLeadTrail.ts` to #26. **That routing is a NAME MATCH and it is
false on the bytes**, on five detectors:

1. #26 landed `d27ec5dc` on **Wed Aug 5 03:41:34 2026**, and ⊕⁴¹ records its disposition verbatim:
   *"`useLeadTrail` colocated **to the pager** with both barrel exports struck and its constants
   NAMED — the export was the overfit, not the mechanism, and the pair moves byte-identical."*
   That cut moved the file `motion/morph/` → `pager-dots/composables/` and it is COMMITTED at HEAD.
2. The untracked file runs the OPPOSITE way (`pager-dots/composables/useLeadTrail.ts` deleted,
   `src/composables/motion/morph/useLeadTrail.ts` untracked-new) and is dated **Aug 6 20:24**,
   41 hours AFTER #26 sealed. A landed row does not author an untracked reversal of its own cut.
3. It is not #26's file re-placed: `diff` against `git show HEAD:src/components/pager-dots/composables/useLeadTrail.ts`
   is a **greenfield rewrite**, and it says so in its own header — *"THAT ANSWER IS ARITHMETICALLY
   UNABLE TO ARRIVE, which is the whole reason this is a greenfield and not a retune."*
4. At adjudication its ONLY importer repo-wide was `src/components/pager-dots/worm.ts:26-28` —
   #40's own untracked file, dated Aug 6 20:29, five minutes later. (The cure below then gives
   `trailOffset` its second importer, `carousel/projection.ts:31` — that arrival is the cure.)
5. The cursor attributes the leak to **#40** at ⊕⁵⁸/⊕⁵⁹/⊕⁶⁰/⊕⁶¹/⊕⁶³ (lines 1966, 2254, 2483-2484,
   3362); only #89's row and its RT-89-G say #26. **The 2026-08-08 driver ruling at cursor:2029-2031
   is the precedent for exactly this correction shape** — it corrected the embla bytes from #32 to
   #40 on the ground that #40's cell *"carries the ✦³ DECK-APOTHEOSIS widening that owns the
   deck/carousel rework and the embla removal."* The same sentence owns this file.

**Trace.** Two offender rows: `src/composables/motion/morph/useLeadTrail.ts :: LEAD_TRAIL_TAU_E_S`
and `:: trailOffset` — referenced nowhere outside their own module AND published on no subpath.

**Cut, one per row, and the second one is a design defect, not a lint.**

- `LEAD_TRAIL_TAU_E_S` — module-private. It is this module's default for `options.tau` and has no
  reader anywhere else. The name STAYS (#26's own ruling: *"the export was the overfit, not the
  mechanism"*), only the `export` goes.
- `trailOffset` — **made reachable, because its second consumer was written in prose and never in
  code.** `useLeadTrail.ts:39-41` justifies the export: *"`trailOffset` is exported because the
  carousel's interior content-lag is the same bounded velocity lag over a different quantity
  (LAW 3 — content trails its housing). One law, stated once."* And `carousel/projection.ts:51-56`
  claimed to be that consumer: *"the same `lag = clamp(v·τ, ±ceil)` law the worm's trail edge runs,
  **which is why that law lives in one place and this calls it**."* It did not call it —
  `memberLag` re-typed the clamp inline, three lines of duplicated law under a docstring asserting
  the opposite. `memberLag` calls `trailOffset` now. LAW 3 is true in the bytes, the duplicate
  dies, and the export has the reader it was written for.

`gate:G-OVERFIT` 14/14.

### D-7 · `stacked-url-filter` ×1 — the born-RED latch FLIPPED

**The case assigns itself to this lane by name.** Title: *"— BORN-RED on PagerDots.vue:493, #40
W-PAGER owns the flip"*; body: *"#40 W-PAGER owns emptying this; flip the case from `it.fails` to
`it` when it does."* It was failing with `Error: Expect test to fail` — the `it.fails` latch had
REDDED because the invariant now HOLDS, which is precisely the receipt it was built to emit.

**Cut.** `it.fails(` → `it(`, title and failure message rewritten to describe the held invariant
and the emptied inhabitant, header comment struck in place with a dated bracket. The stale body
note about a RELOCATION leaving the case failing is corrected: nothing was relocated, the filter
is deleted. Re-latching is forbidden in the comment — a green latch over a held invariant reports
RED forever.

### D-8 · the embla lockfile — `npm run build` RED → **GREEN** (the lane's headline)

**Trace.** `npm run build` aborted in `verifyExportTypes` with
`Error: package.json/package-lock.json root metadata mismatch: devDependencies, peerDependencies, peerDependenciesMeta`,
leaving `dist/` stale. `package.json` had dropped `embla-carousel`/`embla-carousel-vue` from
`peerDependencies`, `peerDependenciesMeta` and `devDependencies` — TERMINAL-ROSTER row 40's
*"named embla `loop` clean break"* — and the lockfile still declared them.

**Cut.** `npm install --package-lock-only --ignore-scripts`. **REGISTRY-RESOLVED, and the
dependency was never deleted by hand**: the lock was regenerated FROM `package.json`, npm resolved
every remaining entry against the registry (`up to date, audited 185 packages`), and zero `file:`
links exist in the lock. The dependency is not "deleted" here — it was already gone from
`package.json` as the lane's designed clean break, and `grep -rn embla src/ demo/ tests/ scripts/
vite.library.ts vite.config.ts` returns **zero** live sites.

**THE LOCK DIFF IS EXACTLY THE EMBLA REMOVAL AND NOTHING ELSE** — `diff` against a pre-run copy
shows 4 hunks, all embla: the two `devDependencies` entries, the two `peerDependencies` entries,
the two `peerDependenciesMeta` blocks, and the three `node_modules/embla-carousel*` packages. No
other version moved.

`npm run build` **EXIT 0**.

### D-9 · FOUND AND CURED BESIDE THE ORDER — the Deck contract suite had been LOST

Not in the brief; found in the census. `tests/components/custom/deck/Deck.contract.test.ts` is
DELETED and `tests/components/deck/` exists as an **EMPTY, untracked directory** — a move begun and
never finished, and git cannot show an empty directory, so the loss was invisible to every fence
all session. The suite guards the deck's clean breaks (`installDeckSpring`, `deckEase`,
`DECK_SPRING`, `PagerWindow`, `DeckPager`, `useGooMorph`, `MORPH_SIGNATURES` all absent from three
barrels), `useDeck`'s index/progress/liveMessage/onChange contract, and `handleDeckKey`'s
focus-guard.

**MEASURED BEFORE ADOPTED**: restored byte-identical from HEAD to `tests/components/deck/contract.test.ts`
and run — **2 passed (2)** against the lane's rewritten deck, zero source delta. The deletion was
pure loss and it is recovered at zero cost; the empty directory the lane created is now filled.
This path is UNROSTERED, which is why it may sit at the new home while the pager pair may not.

---

## §3 · VERIFY GATE (verbatim)

    npx vue-tsc --noEmit
      → exit 0, ZERO bytes of output

    npx vitest run tests/styles tests/components tests/gates
      → Test Files  2 failed | 160 passed (162)
        Tests  2 failed | 1543 passed | 5 expected fail (1550)
      TWICE-STABLE (two consecutive runs, identical)

    node scripts/gate-register.mjs
      → seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0

    npm run build
      → exit 0
        ✓ built in 741ms
        declaration entries: projected 61 public entries
        gen-component-styles: wrote …/.glass-generation-dR5BBI/component-styles.css
        {"type":"glass-ui:ready","generation":"b740b602fc2229238553317e35ecf67153b8a053a122060551522cd0664bde06","output":"…/dist","tuple":"js/sfc-css/declarations/relays/styles/fonts/utilities/component-styles"}

    npm run demo:dist:build
      → exit 0, ✓ built in 1.90s

    node scripts/regen-exports.mjs
      → REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
        >>> EXACT REPRODUCTION: YES
        EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.

    npx vitest run tests/public-surface.spec.ts
      → 83 passed (83)   [the two whole-tree failures the brief named are GONE with the build]

    npx vitest run   (FULL, beyond the ordered gate)
      → Test Files  2 failed | 220 passed (222)
        Tests  2 failed | 1945 passed | 5 expected fail (1952)

**Battery delta: 12 failed → 2 failed. All ten of the lane's REDs are gone, and so is #7's.**

### The two remaining, enumerated and attributed

1. `tests/gates/boot-graph.test.ts > the eager graph stays under the modulepreload and byte
   ceilings` — `eager graph: 63 modulepreloads + 1 entry = 64 files / 477311 B: expected 63 to be
   less than or equal to 60`. **→ #66**, per ⊕⁶⁵'s standing route (*"a figure that is a FUNCTION OF
   THE BUILD and must be re-read after any rebuild … routed #66 either way"*). Re-read here after a
   fresh `demo:dist:build`: **63**. The gate's OTHER arm — dist-demo staleness — is GREEN.
2. `tests/styles/emitted-utility-vars.test.ts > routes the emitted transition-duration chain
   through --duration-fast` — `expected '0s' to contain 'var(--duration-fast'`.
   **→ #85 W-EASING. NEW, and this lane UNMASKED it rather than caused it.** The gate reads
   `dist/styles/components.css`, which could not regenerate while `npm run build` was RED on D-8;
   greening the build made the emitted sheet fresh for the first time since the breakage.
   Detector: of 5 emitted `transition-duration` declarations, 2 miss the house chain —
   `.duration-0{…transition-duration:0s}` and `.duration-slow{…transition-duration:var(--duration-slow)}`.
   Both candidates have exactly ONE authoring site repo-wide,
   `src/components/easing/EasingCurve.vue:89-90`, COMMITTED at `1bc09dde`
   (*"land BK #85 W-EASING"*), CLEAN at HEAD, and zero bytes of it in this lane's fence.
   **Note for #85/#65:** the gate's predicate reds on `var(--duration-slow)` too, which is a house
   token — so the case may be over-strict as written, and that is a gate-truth question for its
   owner, not a thing this seat widens or relaxes.

**Neither is #26's.** RT-89-G's EXPORT-REACH arm is CLOSED — `gate:G-OVERFIT` is 14/14 — because
the file it named is #40's and was cured here (D-6).

---

## §4 · HOUSE LAWS

- **Gates exactly 60, nothing minted.** `seats:60` unmoved; zero seats added, bound, or moved.
- **Born-RED where a new gate case is added** — no gate case was added. What happened instead:
  one born-RED latch FLIPPED to live on its own written instruction (D-7, RED banked in
  `/tmp/bk-lane40-battery-0.txt`), two dead cases struck with their successor named (D-2), one
  harness repaired and **MUTATION-PROVED to bite** (D-4), two lost cases restored and measured
  green before adoption (D-9).
- **No masking fallbacks.** The lockfile was reconciled, not suppressed; the roster violation was
  cured at the executable, not allowlisted; the SVG cases were struck because their mechanism is
  deleted, not relaxed to pass.
- **Figures state their detectors verbatim** throughout §2 and §3.
- **Strike-in-place dated brackets on committed text** — used at every strike:
  `tests/components/pager-dots.contract.test.ts`, `pager-dots.morph.test.ts`,
  `tests/styles/stacked-url-filter.test.ts` (×3), `tests/components/carousel/contract.test.ts`,
  `src/components/carousel/projection.ts`.
- **SHARED TREE respected.** No `git add`, `commit`, `stash`, or `checkout`. File moves were plain
  `mv`. The driver commits.

---

## §5 · THE FENCE — final minus baseline

Final `git diff -U0`: `/tmp/bk-lane40-final-1786236038.diff` (6,392 lines, vs 6,593 baseline).
`git status --porcelain | wc -l` = **103** (baseline 100: +1 `package-lock.json` entering, +1
`stacked-url-filter.test.ts` entering, +1 this record's own untracked directory). [FIGURE
CORRECTED 2026-08-08, adjudication §7: first written as 102, which omitted the record's own
self-reference.]

**Tracked files that entered the diff — exactly two, both mine:**

    > diff --git a/package-lock.json b/package-lock.json          (D-8)
    > diff --git a/tests/styles/stacked-url-filter.test.ts …       (D-7)

**Porcelain delta — exactly five lines, all mine:**

    >  M package-lock.json                                  D-8
    -  D tests/components/pager-dots.contract.test.ts   →   >  M …   D-1 restore + D-2/D-3 edits
    -  D tests/components/pager-dots.morph.test.ts      →   >  M …   D-1 restore + D-4 edits
    >  M tests/styles/stacked-url-filter.test.ts             D-7
    -  ?? tests/components/pager-dots/                 →   >  ?? tests/components/deck/   D-1 / D-9

**Untracked, enumerated (the `-U0` baseline cannot see these):** baseline 22 entries, final 23.
One left (`tests/components/pager-dots/`, emptied and removed at D-1), two arrived
(`tests/components/deck/`, filled at D-9; this record's own directory); the other 21 are unchanged
as paths. [FIGURES CORRECTED 2026-08-08, adjudication §7: first written 18 → 18 / "other 17",
which counted the lane's scope, not the artefact.] Two untracked
files were EDITED IN PLACE and therefore show no diff anywhere — both are #40's own:
`src/composables/motion/morph/useLeadTrail.ts` (D-6, `export` struck from one constant) and
`src/components/carousel/projection.ts` (D-6, `memberLag` calls `trailOffset`; one import added).
They are named here because no fence artefact can show them.

**Zero foreign bytes touched.** Every other tracked and untracked path is byte-for-byte as the
baseline left it — the five other uncommitted lanes (#32 · #33 · #35 · #71 and the demo dirt) are
untouched and still need their own seats.

---

## §6 · ROUTES OUT

- **RT-40-A → C-10 / #65 / #66.** The pager test re-home (`tests/components/pager-dots.contract.test.ts`
  → `tests/components/pager-dots/contract.test.ts`) is DEFERRED, not abandoned: it rides the C20
  successor roster where `sourcePath` moves with the pin, exactly once, per SEAT-BINDING.json:28.
  Carrying it: the carousel's home is already at `tests/components/carousel/` and the deck's at
  `tests/components/deck/`, so C20 makes the three consistent in one act.
- **RT-40-B → #85 W-EASING** (cc #65 on the predicate). `emitted-utility-vars`'s
  transition-duration chain, RED on `.duration-0` and `.duration-slow` from
  `EasingCurve.vue:89-90` (`1bc09dde`), unmasked by this lane's build-green. See §3.2.
- **RT-40-C → #66.** `gate:boot-graph` 63-vs-60, re-read after a fresh build as ⊕⁶⁵ requires.
- **RT-40-D → the driver.** RT-89-G is CORRECTED: the untracked
  `src/composables/motion/morph/useLeadTrail.ts` is **#40's**, not #26's, on the five detectors in
  D-6, and it is CURED here. #26 needs no `useLeadTrail` commit seat.
- **#40 is COMMIT-READY.** It owned the `npm run build` RED that gates the 8.0.0 close's
  `--run release`; that RED is GREEN.

---

## §7 · ADJUDICATION (2026-08-08) — COMPLETE, with figure cures applied in place

Adjudicator: **claude-fable-5** (fresh seat; baseline banked before any byte at
`/tmp/bk-lane40-adjudicator-baseline-1786238423.diff`, byte-identical to the seat's final fence).
Two independent challengers preceded this ruling; their claims were treated as leads and every
load-bearing figure re-derived on disk.

**Substance: VERIFIED, all figures reproduce.** Independent re-run: `vue-tsc` exit 0 / 0 bytes ·
battery `2 failed | 1543 passed | 5 expected fail (1550)`, survivors exactly `boot-graph` (→ #66)
and `emitted-utility-vars` (→ RT-40-B → #85) · `gate-register` character-identical with
**`violations:0`**, `rosterSha256:dc05df91` · `npm run build` exit 0, generation `b740b602…de06`
identical · `demo:dist:build` exit 0 · `regen-exports` EXACT, exit 0. C19 measured clean at the
pin (`shasum` = `dc05df91…`, zero hits in the fence diff); the D-1 refusal's cites read verbatim
at `2026-08-03-row9-register/SEAT-BINDING.json:26/:28/:591`; the mechanism refusal is GROUNDED —
editing C19 moves `rosterSha256` by construction, which the order's own acceptance forbids. Deck
restore byte-identical to HEAD (measured). Embla: 0 refs in `package.json`/lock/`src`/`demo`/
`tests`/`scripts`, 0 `file:` links. Strike brackets present and dated at the claimed sites.

**Defects found: SEVEN FIGURE/TENSE ERRORS across the two record documents, zero byte-level.**
All were measured against the tree and CURED IN PLACE above, each at its site with a dated
correction bracket: §0's untracked count (18 → 22), §1's mtime window (did not cover twelve of
its own files; `DeckSlide.vue`/`DeckStage.vue` are Aug 8), D-1's carousel "diffs IDENTICAL"
(present-tensed past fact; delivered diff is 21 lines), D-6's "ONLY importer" (two at delivery —
the cure itself added the second), §5's porcelain (102 → 103) and untracked arithmetic
(18/18/17 → 22/23/21), and PASTE-BLOCKS' same three (the "is EMPTY" present tense, the importer
count, the porcelain figure). The seat's enumeration was COMPLETE throughout — every path
attributed, the errors were counts and tenses, not census gaps.

**One unwitnessed claim, accepted with corroboration** (per Challenger B): D-1's
"byte-identical at the move" for the two pager files has no surviving banked copy — it is
corroborated by the delivered files equalling HEAD plus exactly the seat's dated cures, and by
the deck (exit 0) and carousel (pre-D-5) parallels. Future re-homes: bank the pre-move copy.

**Ruling: COMPLETE. #40 is COMMIT-READY as cured.** The fence after adjudication: only the two
record documents moved; `git diff -U0` unchanged from the seat's final artefact; porcelain 103.
