# AX.W32 — Slides motion + form adoption + deploy verification

**Band** L · SLIDES · **Severity** minor · **dependsOn** AX.W24, AX.W31 · *(separate repo, coordinated/tracked
— glass-ui writes NO sibling source beyond the W24 library surface it already owns; the slides edits DISPATCH
from the slides session)* · **Charter** AX.md §3 (the `### AX.W32` block, lines 1585-1619) + the §1 summary
row (line 142) + §2 band-L line (line 192) + §2b band-L precept row (line 224) + §4 note 9 (the slides band is
a SEPARATE REPO folded for tracking; the consumer-adoption half never ran — AX.W32, lines 2038-2042) + §4 note
12 (publish-currency, not code, gates the consumer leg — useCountup/DeckProgress require the AX cut PUBLISHING,
lines 2057-2067) + §4 note 18 (the slides `.deck-progress` → `<DeckProgress>` replacement is W32 NOT W24; the
consumer-#2 clearance + the `--progress-rail-*` override + the PAGE-BOTTOM placement all ride W32, lines
2133-2139) · **Audit** `deep-audit-corpus.json` slice `library-optimum` (index 24, findings F3=vReveal/useCountup
adoption-half-never-ran / F4=/deck-family-stays-slides-local ratify / F5=DeckGate LabeledField error pattern)
+ slice `slides-visual-mobile` (index 30, findings F5=xray full-height commit+live-audit / F6=graph
aspect-ratio commit+regression-guard / F7=pptx deploy-200 verification) · `constellation-analysis-corpus.json`
`idiom:slides` (the version-pin staleness precondition: vReveal adoptable @ `^3.4.0`, useCountup/DeckProgress
require the AX bump FIRST; the reveal.ts byte-equivalent fork; the DeckGate Input-invalid-state contract; the
binding-verification sweep across the major bump) + the §16.3 consumer-adoption-ledger receiver (W34).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on falsifiable witnesses, each re-proven LIVE against the slides HEAD (and the glass-ui
HEAD/published-pin pair) — the §0 cardinal "re-verify before acting," not trusted from the audit:

- **RED witness 1 (slides reinvents two SHIPPED glass-ui primitives — the adoption half never ran).** slides
  defines + globally registers its OWN `src/deck/reveal.ts` (a 16-line `[data-reveal]`/`--d` directive,
  registered `main.ts:25` `.directive("reveal", reveal)`) and its OWN `src/deck/useCountup.ts` (the
  `[data-countup]` walker, `{ easeFn }` signature) — both BYTE-EQUIVALENT contracts to glass-ui's public
  `vReveal` (root barrel `src/index.ts:171`) + `useCountup` (`/motion`, `src/composables/motion/index.ts:32`,
  `{ easeFn }` signature). The grammar is identical because both glass-ui idioms were LIFTED FROM slides
  (AV.W3/AW.W15). The falsifiable RED: *`grep -c "from \"./deck/reveal\"\|from \"./deck/useCountup\"" slides/src/**`
  is > 0 AND `grep -c "@mkbabb/glass-ui.*vReveal\|@mkbabb/glass-ui.*useCountup" slides/src/**` is 0 (RED — local
  forks consumed, library imports absent). After: the local files are DELETED, `main.ts` registers
  `directive("reveal", vReveal)` from glass-ui, the countup host imports glass-ui's `useCountup` threading
  `deckEase.fn` as `easeFn` (GREEN).*

- **RED witness 2 (the slides bottom bar is a hand-rolled parallel rail, not the library `<DeckProgress>` —
  the binary invariant W24 left UNcleared).** slides paints its progress bar as a hand-rolled `.deck-progress`
  `<div>`+`::after` (a `transition: width` mechanic + its own `--deck-progress-*` tokens) instead of the
  library `<DeckProgress>` + `@mkbabb/glass-ui/deck-progress` subpath W24 ships. DeckProgress therefore has
  exactly ONE real consumer (the glass-ui demo story); slides is consumer #2 only ON PAPER. The falsifiable
  RED: *`grep -c "DeckProgress\|@mkbabb/glass-ui/deck-progress" slides/src/**` is 0 AND a `.deck-progress`
  hand-rolled rail exists in `slides/src/deck/DeckView.vue` + `slides/src/styles/deck.css` (RED — two parallel
  rails). After: `<DeckProgress :value class="<viewport-pin>"/>` imported from the subpath, the `.deck-progress`
  `<div>`+`::after` + `--deck-progress-*` tokens DELETED, `--progress-rail-*` overridden in the consumer, the
  bar pinned PAGE-BOTTOM (§10.1) — the binary invariant CLEARED (GREEN).*

- **RED witness 3 (slides pins a glass-ui that does NOT ship useCountup/DeckProgress — the version-pin
  staleness precondition).** `slides/package.json:24` pins `"@mkbabb/glass-ui": "^3.4.0"` and node_modules
  resolves 3.4.0. `vReveal` IS in 3.4.0 (`dist/index.d.ts` exports it — adoptable against the live pin NOW,
  zero grammar change). `useCountup` + `DeckProgress` are NOT in 3.4.0 — they require the AX cut. The
  falsifiable RED: *against the unbumped `^3.4.0` pin, `import { useCountup } from "@mkbabb/glass-ui/motion"`
  and `import "@mkbabb/glass-ui/deck-progress"` FAIL to resolve (RED — the abstraction is published only at
  the AX cut). After: slides bumps its `@mkbabb/glass-ui` pin to the AX release FIRST (gated on the AX PUBLISH
  per §4 note 12), then both resolve (GREEN). The bump crosses a major → the binding-verification sweep is
  obligatory.*

- **RED witness 4 (DeckGate hand-rolls the invalid-state ring + carries a stale BOOK note).** `DeckGate.vue`
  hand-wires an `aria-invalid` ring (`:66` `:aria-invalid="error || undefined"`, `:118`
  `:deep(input[aria-invalid="true"])` destructive-ring CSS) targeting the glass-ui `<Input>`'s inner `<input>`,
  and carries the stale BOOK note `:116-117` "glass-ui Input has no native data-invalid state yet — BOOK
  FG.W-input." That note is OUT OF DATE: glass-ui's `<Input>` forwards `aria-invalid` + ships `useUserInvalidAria`,
  and `<LabeledInput>` provides an `error` slot + `:user-invalid` styling + `aria-errormessage` wiring
  (`LabeledInput.vue:8-19`, `LabeledField.vue:17-24`). The falsifiable RED: *`grep -c "BOOK FG.W-input"
  slides/src/views/DeckGate.vue` is > 0 AND DeckGate hand-rolls its own invalid-ring CSS rather than consuming
  `<LabeledInput>`'s `error` slot (RED — a closed library gap ossified as a stale note). After: EITHER (a)
  DeckGate's field is re-pointed to `<LabeledInput>` with an `error` slot (inheriting the shipped invalid
  styling + a11y wiring, deleting the local aria-invalid CSS), OR (b) the BOOK note is formally RETIRED (the
  capability exists) and the bespoke shake/lock chrome is kept as an INTENTIONAL slides-local micro-styling —
  no stale "gap" survives either way (GREEN). Adjudicated below (RATIFY-BEFORE-IMPL).*

- **RED witness 5 (the xray full-height + graph aspect-ratio fixes are correct-but-UNCOMMITTED + their e2e
  specs are AUTHORED-but-NOT-EXECUTED — the headless-green/visually-broken gap, one repo over).** Slide04's
  drift chart + Slide09's EKG aspect-ratio fix + SlideXray's full-height fix are ADDRESSED + live-verified in
  the slides UNCOMMITTED tree, but the H tranche's e2e specs (`xray-portal.spec.ts`, `complex-graphs.spec.ts`)
  are authored and never run (slides H PROGRESS.md: "The e2e specs are authored but NOT executed in this dev
  pass"). The falsifiable RED: *the xray/graph fixes live only in the working tree (uncommitted) AND
  `xray-portal.spec.ts`/`complex-graphs.spec.ts` have never executed against the built deck (RED — a "closed"
  visual fix on an unrun spec). After: W30 lands the H working-tree on a clean branch (its dependsOn); W32
  routes the COMMIT of these fixes + EXECUTES the authored specs as the live-audit gate (GREEN).*

- **RED witness 6 (the pptx download links 404 unless the deploy export step ran — a deploy-pipeline
  silent-failure class).** `DeckSettings.vue:53-72` ships the icons + light/dark download popover (FileDown →
  Sun/Moon rows linking `/exports/til-briefing[-dark].pptx`), but the `.pptx` artifacts are generated at DEPLOY
  time (`scripts/pages-deploy.sh` → `npm run export:pptx`), NOT committed. The falsifiable RED: *there is NO
  deploy-time or live-site assertion that `/exports/til-briefing.pptx` + `-dark.pptx` resolve 200 — a deploy
  that skips the export step (e.g. Chrome missing per `pages-deploy.sh:60`) ships DEAD download links silently
  (RED). After: a deploy-time / Playwright-on-the-deployed-site check asserts both pptx URLs resolve 200, so a
  skipped export step fails LOUD (GREEN).*

The wave is RED at HEAD on all six; the HardGate drives each to GREEN. **The fix-class is mixed:** witnesses 1
(vReveal leg) is a CODE adoption adoptable against the live pin; witnesses 1 (useCountup leg) + 2 + 3 are CODE
adoptions GATED on the AX pin-bump/publish; witness 4 is a decision-to-ratify + a small code/note edit; witness
5 is a COMMIT + e2e-execution (not a code rewrite — the fix is correct); witness 6 is a DEPLOY-PIPELINE
assertion (not a code wave). Every leg is recorded so none is silently dropped (§16.4 zero-loss).

---

## Goal

slides DELETES its `reveal.ts`/`useCountup.ts`/`.deck-progress` reinventions and consumes glass-ui's
`vReveal`/`useCountup`/`<DeckProgress>` (clearing the DeckProgress binary invariant W24 left UNcleared),
adjudicates the DeckGate LabeledField error pattern, commits + e2e-executes the correct-but-uncommitted
xray/graph fixes, and adds a deploy-time pptx-200 assertion — all behind an ordered glass-ui pin-bump to the
AX release and a binding-verification sweep across that major bump, verified by a live audit that the post-
adoption deck renders identically.

---

## Scope (the gestalt fix — no workaround, no legacy, SLIDES-SIDE consumer-adoption)

This is the CONSUMER-ADOPTION half of the AX library surfaces — the half that never ran for any landed
abstraction (§4 note 9). glass-ui writes NO new sibling source: W24 already shipped the `/deck-progress`
subpath + the cascade-correct rail recipe; W32 is the slides session that ADOPTS them. The one library-side
decision W32 carries is the DeckGate Input-invalid-state CONTRACT (not adoption-only — adjudicated below). Six
folds, in dependency order:

**(0) ORDERED PRECONDITION — slides bumps its `@mkbabb/glass-ui` pin to the AX release FIRST (the
idiom:slides load-bearing precondition).** The adoption surface SPLITS by published-currency (§4 note 12):
`vReveal` is adoptable against the live `^3.4.0` (a byte-equivalent fork — deletable NOW); `useCountup` +
`<DeckProgress>` are NOT in 3.4.0 — they REQUIRE the AX bump. So step 0 is an explicit ordered precondition:
bump `slides/package.json` `@mkbabb/glass-ui` to the AX release (`^3.7.0` or the cut tag), `npm install`, and
run a BINDING-VERIFICATION SWEEP across the major bump (the glass-ui-binding-verification memory: stale reka
prop/emit drift silently no-ops; vue-tsc + units MISS it, only e2e catches — sweep Dialog/Input/DropdownMenu/
GlassDock, the same sweep W03/W00 stand up). The bump is GATED on the AX cut PUBLISHING — W32 cannot land the
useCountup/DeckProgress legs until the AX release resolves on the registry (the W33/W34/W35 pin-bump hinge).

**(1) Delete the local reveal/countup forks → glass-ui `vReveal` + `useCountup` (F3 / witness 1).** Delete
`slides/src/deck/reveal.ts` + `slides/src/deck/useCountup.ts`. In `main.ts`, replace the local-reveal import
with `import { vReveal } from "@mkbabb/glass-ui"` (root barrel — see Open question 1: the charter says
`/motion-core`, but vReveal is on the root barrel + `/motion`, NOT `/motion-core`) and register
`.directive("reveal", vReveal)`. Re-point the countup host to `import { useCountup } from
"@mkbabb/glass-ui/motion"`, threading `deckEase.fn` as the `easeFn` option (the slides-local `useCountup`
already takes `{ easeFn }`, so the call site is a one-line import swap — the signatures match). The
`[data-reveal]`/`[data-countup]`/`--d` attribute grammar already matches (it was lifted FROM slides). The ONE
precondition: confirm glass-ui's `vReveal` keyframes align with deck.css §7's `rise`/`fade` — glass-ui ships
its OWN keyframes; deck.css's slides-specific `wipe-x`/`grow-y` stay slides-local (a possible keyframe-name
reconcile, NOT a grammar change). The no-local-reveal/countup gate asserts `main.ts` imports glass-ui's
`vReveal`, not a local module.

**(2) Port the bottom bar onto `<DeckProgress>` + `/deck-progress` (the §4 note 18 W24→W32 consumer half /
witness 2).** Replace the hand-rolled `.deck-progress` `<div>`+`::after` in `DeckView.vue` with `<DeckProgress
:value class="<viewport-pin>"/>` importing `@mkbabb/glass-ui/deck-progress` (the W24 subpath — minimal
payload). Override `--progress-rail-*` in the slides consumer (the W24 token-override contract that now WINS
the cascade) to match the deck's existing fill/track look. DELETE the hand-rolled rail CSS + the
`--deck-progress-*` tokens from `deck.css`. The bar sits at PAGE-BOTTOM (§10.1) — the de-dock placement is
ALREADY done in slides today (`position:fixed; bottom: env(safe-area-inset-bottom); z-index:40` below the
dock), so the port preserves the placement while converging onto the library primitive. This CLEARS the binary
invariant W24 left UNcleared — slides becomes the REAL consumer #2. One direction, no parallel rails.

**(3) DeckGate LabeledField error pattern — the Input-invalid-state CONTRACT decision (F5 / witness 4).** This
needs a glass-ui Input invalid-state contract DECISION, not adoption-only (idiom:slides). Adjudicate
(RATIFY-BEFORE-IMPL): EITHER (a) slides re-points DeckGate's field to `<LabeledInput>` with an `error` slot —
inheriting the shipped `:user-invalid` styling + `aria-errormessage` wiring, deleting the local aria-invalid
CSS; OR (b) the gate's bespoke shake/lock chrome makes LabeledField overkill → formally RETIRE the stale BOOK
note (the capability exists) and keep the hand-rolled ring as an intentional slides-local micro-styling. EITHER
way no stale "gap" survives. Verify the `useUserInvalidAria` bridge composes with LabeledField's `error` slot
(the contract-decision arm). The muster SettingsDialog/ConstraintsLayer LabeledField under-adoption is the
SAME ask mirrored — it routes to W34 (the muster consumer-adoption leg), NOT W32; W32 owns ONLY the DeckGate
instance + the contract decision.

**(4) Commit + e2e-execute the xray full-height + graph aspect-ratio fixes (F5/F6 slice-30 / witness 5).** The
SlideXray full-height fix (`aspect-ratio:auto + min-height:48cqh` eating the ~260px dead band) + the Slide04
drift-chart / Slide09 EKG aspect-ratio fixes (`--chart-min-h` per-breakpoint floor + `preserveAspectRatio="none"`)
are CORRECT + live-verified, but UNCOMMITTED + their e2e specs unrun. W32 routes the COMMIT (after W30 lands the
H tree on a clean branch) + EXECUTES the authored `xray-portal.spec.ts` + `complex-graphs.spec.ts` as the
live-audit gate. Add the width-driven-starvation REGRESSION GUARD (the per-breakpoint min-height assertion):
live-verify at 390/768/1280 that the drift sliver + EKG spike clear ≥ 80px and the 768 tablet stacks; confirm
desktop 16:9 unregressed at 1512×862. No new code — a COMMIT + an executed spec.

**(5) pptx deploy-200 verification (F7 slice-30 / witness 6) — a deploy-pipeline item, NOT a code wave.** Add
a deploy-time assertion (or a Playwright check on the DEPLOYED site) that `/exports/til-briefing.pptx` +
`-dark.pptx` resolve 200, so a deploy that skips the export step (Chrome missing per `pages-deploy.sh:60`)
fails LOUD rather than shipping dead download links. The DeckSettings popover UI itself is correct + needs no
SFC change.

**(6) Ratify /deck stays slides-local (F4 / witness — the chronic lift-pending debt).** The slides 1168-line
`src/deck/` engine (`useDeck`/`useDeckNav`/`DeckPager`/`deckSpring`/`pagerWindow`) carries lift-pending
comments naming `@mkbabb/glass-ui/deck`, but the cross-repo ≥2-consumer invariant is UNSATISFIED (slides is
the sole real consumer; value.js/words/muster decks were floated, never built). FORMALLY RATIFY continued
local hold (the audit's honest-minimum option A): record that `/deck` stays slides-local until a cross-repo
consumer exists, and STOP carrying the lift-pending comments as debt (they imply work the invariant forbids).
This is a ratification line in the audit json + a one-line comment scrub in the slides deck files, NOT a lift.

**Ratify-before-impl** (recorded below, §Open questions): (a) the vReveal import PATH (root barrel / `/motion`
vs the charter's `/motion-core` — the charter is WRONG, vReveal is not on `/motion-core`); (b) the DeckGate
LabeledField CHANNEL (adopt `<LabeledInput>` `error` slot vs retire the BOOK note + keep bespoke chrome); (c)
the `/deck`-stays-slides-local ratification (option A honest-minimum, not the manufacture-consumer-#2 option B).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

**slides repo (the consumer session writes these — glass-ui writes NO slides source):**

| File | Edit |
|------|------|
| `slides/package.json` | MODIFY — bump `@mkbabb/glass-ui` `^3.4.0` → the AX release (gated on the AX publish). The ordered step-0 precondition. NO other dep touched here. |
| `slides/src/deck/reveal.ts` | **DELETE** — the byte-equivalent fork of glass-ui's `vReveal`. |
| `slides/src/deck/useCountup.ts` | **DELETE** — the duplicate of glass-ui's `useCountup` (`{ easeFn }` signature already matches). |
| `slides/src/main.ts` | MODIFY — replace `import { reveal } from "./deck/reveal"` with `import { vReveal } from "@mkbabb/glass-ui"`; register `.directive("reveal", vReveal)`. |
| `slides/src/deck/DeckView.vue` | MODIFY — replace the `.deck-progress` `<div>`+`::after` with `<DeckProgress :value class="<viewport-pin>"/>` (import `@mkbabb/glass-ui/deck-progress`); the countup host call site swaps to glass-ui's `useCountup` threading `deckEase.fn` as `easeFn`. |
| `slides/src/styles/deck.css` | MODIFY — DELETE the hand-rolled `.deck-progress` rail CSS + `--deck-progress-*` tokens; override `--progress-rail-*` to match the deck look; reconcile any `vReveal` keyframe-name vs `rise`/`fade` (keep `wipe-x`/`grow-y` slides-local). |
| `slides/src/views/DeckGate.vue` | MODIFY — adopt `<LabeledInput>` `error` slot (channel a) OR retire the stale `BOOK FG.W-input` note + keep bespoke ring (channel b); delete dead aria-invalid CSS if channel a. |
| `slides/src/deck/useDeck.ts` (+ the `src/deck/` lift-comment carriers) | MODIFY — scrub the lift-pending `@mkbabb/glass-ui/deck` comments per the F4 ratify (one-line comment scrub, NOT a lift). |
| `slides/src/decks/til-briefing/SlideXray.vue`, `Slide04.vue`, `Slide09.vue` | COMMIT (after W30 clean-branch landing) — the correct-but-uncommitted xray full-height + graph aspect-ratio fixes. NO new code; the COMMIT of the live-verified tree. |
| `slides/tests/e2e/xray-portal.spec.ts`, `complex-graphs.spec.ts` | EXECUTE (authored-not-run) — as the live-audit gate; add the per-breakpoint min-height regression guard if not present. |
| `slides/scripts/pages-deploy.sh` (or a `slides/tests/e2e/deploy-exports.spec.ts`) | MODIFY/CREATE — the deploy-time / live-site pptx-200 assertion. |

**glass-ui repo (the ONLY library-side surface W32 may touch — the Input-invalid-state contract decision arm):**

| File | Edit |
|------|------|
| `docs/tranches/AX/audit/W32-slides-adoption.json` | **CREATE** — the born-RED→GREEN ledger (the six witnesses + per-finding disposition + the per-leg published-currency gating + the binary-invariant clearance + the F4 /deck ratify + the binding-verification sweep result + the paired-π BEFORE/AFTER deck capture). |
| `docs/tranches/AX/coordination/CONSTELLATION.md` | APPEND — the slides leg entry (slides HEAD + branch + `git status --porcelain` at coordination time; the shared write surface = the slides repo; the writer = the slides session; the pin-bump precondition). (The doc is AUTHORED in W34; W32 APPENDS its slides leg if W34 has not yet run — coordinate the writer boundary.) |

**glass-ui Input-invalid-state CONTRACT (the ONE library-side code arm — ONLY if channel (a) needs it):** the
idiom:slides finding flags that DeckGate "adopt the LabeledField error pattern" needs a glass-ui Input
invalid-state CONTRACT (not adoption-only). At HEAD glass-ui ALREADY ships `<Input>` `aria-invalid` forwarding
+ `useUserInvalidAria` + `<LabeledInput>` `error` slot + `aria-errormessage` (verified) — so the contract
EXISTS and channel (a) is adoption-only with no library edit. **The library code arm is empty unless the
verify step finds the `useUserInvalidAria` bridge does NOT compose with the `error` slot** — in which case the
fix is a SMALL `LabeledInput.vue`/`Input.vue` reconcile (in FileBounds for that contingency only, recorded as
RATIFY). If the bridge composes (the likely case), W32 touches NO glass-ui component source.

**OUT of bounds (W32 does NOT touch):**
- ANY glass-ui component / composable / style source beyond the contingent Input-invalid-state reconcile (W24
  already shipped the DeckProgress subpath + rail recipe; vReveal/useCountup are already shipped).
- The slides `/deck` ENGINE files beyond the comment scrub (`useDeck`/`useDeckNav`/`DeckPager` STAY slides-
  local per F4 — NOT lifted; lifting manufactures substrate-without-consumer).
- `MIGRATION.md` (no glass-ui retirement; the slides forks are slides-side deletions, not library API churn).
- The muster LabeledField under-adoption (SettingsDialog/ConstraintsLayer) — routes to W34, NOT W32.
- `demo/stories/navigation/deck-progress.vue` (the glass-ui consumer-#1 render fixture — W24 owns it; W32 is
  the slides consumer #2, a different repo).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W24 (Deck-progress LIBRARY-side — the cross-repo LIBRARY half).** This is the load-bearing W24/W32
  split (§4 note 18 / harden `result[30]`). **Disjoint by repo:** W24 writes ONLY glass-ui src (the
  `/deck-progress` subpath + the cascade-correct rail recipe + the registered render gate); W32 writes ONLY
  slides src (the `<DeckProgress>` port + the `--progress-rail-*` override + the hand-rolled-rail deletion +
  the binary-invariant clearance). **W24 does NOT claim "making slides consumer #2" — W32 CLEARS the binary
  invariant.** W32 dependsOn W24: it cannot port until W24 ships (a) the importable subpath and (b) the
  cascade-correct + glow-true recipe (a broken recipe would force a fork). The shared LOGICAL contract is the
  `--progress-rail-*` token-override surface (W24 makes it WIN the cascade; W32 SETS it in the consumer) — but
  NO shared FILE.
- **vs W31 (Slides content reframe — the SLIDES-SIDE content sibling).** W31 reframes Slide04 (the
  hypothetical/what-if anomaly + the $5M figure-clip), the lock-affordance, the access-modal glass restyle,
  the mobile reflow guards. W32 dependsOn W31. **Disjoint by surface within the slides repo:** W31 owns the
  CONTENT/COPY/access-modal-glass of Slide04 + DeckGate; W32 owns the MOTION/FORM-ADOPTION + the xray/graph
  COMMIT + deploy. The shared files are `DeckGate.vue` (W31: access-modal glass restyle / lock-affordance; W32:
  the LabeledField error-pattern adoption) and `Slide04.vue` (W31: the content reframe + figure-clip; W32: the
  graph aspect-ratio COMMIT). **Sequence W31 BEFORE W32** (W32 dependsOn W31) so the content/glass restyle
  lands first and W32's form-adoption + graph-commit ride the settled file — NOT a three-way merge. W32's
  DeckGate edit is the FIELD-error-pattern only (the LabeledInput swap / BOOK-note retirement); W32's Slide04
  edit is the graph-figure COMMIT only (the `--chart-min-h` aspect fix) — both disjoint from W31's content
  regions, but co-located, so W31-then-W32 ordering is binding.
- **vs W30 (Slides baseline — the clean-branch landing + Canvas2D leak fix).** W30 lands the H working-tree
  on a clean branch + fixes the `light-dark()`-into-Canvas2D leak + EXECUTES the authored e2e specs. W32
  dependsOn W30 transitively (via W31 → W30). **Disjoint:** W30 owns the BASELINE (the clean branch, the
  Canvas2D fix, the FIRST execution of the deck/constellation specs); W32's xray/graph COMMIT rides ON the
  clean branch W30 establishes (the xray/graph fixes are part of the H tree W30 lands — W32 routes their
  COMMIT + executes the xray-portal/complex-graphs specs specifically, which W30 may or may not have run). If
  W30 already commits + runs them, W32's witness-5 leg is a VERIFY-already-done (recorded as MET, not re-done).
  Coordinate the W30/W32 boundary in CONSTELLATION.md so the xray/graph commit is not double-claimed.
- **vs W34 (Cross-constellation consumer-adoption ledger / §16.3 receiver).** W34 is the HUB that records EACH
  consumer-adoption leg + authors `coordination/CONSTELLATION.md`. **Disjoint by role:** W34 RECORDS + ROUTES
  (the slides leg is one row in W34's ledger; the muster LabeledField under-adoption is ANOTHER row routed to
  the muster session, NOT to W32); W32 EXECUTES the slides leg. W32 does NOT author the CONSTELLATION.md doc
  (W34 owns it) — W32 APPENDS its slides leg if it runs before W34, with the writer-boundary coordinated. W32
  does NOT touch the muster/words/fourier/value.js adoption legs (those are W34's routes to OTHER sessions).
- **vs W33 (AX close).** W33 runs the fleet meta-gate + `proof:ax-final` + the inheritance-ledger cross-walk.
  **Disjoint:** W32's adoption is a SLIDES-side leg gated on the AX PUBLISH (W33's pin-bump hinge); W33 records
  the slides leg's CLOSURE status (CLEARED the DeckProgress binary invariant / routed the deploy item). W32
  must close its own audit json; W33 cross-walks it into the inheritance ledger (ADDRESSED, not deferred).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — the slides consumer session; file-disjoint arms).** Arm A (motion + form
  adoption): after the step-0 pin-bump, delete `reveal.ts`/`useCountup.ts`; swap `main.ts` to `vReveal`; swap
  the countup host to glass-ui's `useCountup` (`easeFn: deckEase.fn`); reconcile the vReveal keyframe names vs
  `rise`/`fade`; adjudicate + apply the DeckGate LabeledField channel; scrub the `/deck` lift-pending comments
  (F4 ratify). `vue-tsc` + the slides build + dev-server boot at every interval; render the deck after each
  swap (the reveal/countup grammar must paint identically). Arm B (DeckProgress port + xray/graph commit +
  deploy): replace the `.deck-progress` `<div>`+`::after` with `<DeckProgress>` from the subpath; override
  `--progress-rail-*`; delete the hand-rolled rail CSS + tokens; COMMIT the xray/graph fixes (post-W30
  clean-branch); add the deploy pptx-200 assertion. The two arms share `DeckView.vue` (Arm A: the countup
  host call site; Arm B: the `<DeckProgress>` swap) + `deck.css` (Arm A: keyframe reconcile; Arm B: rail
  deletion + `--progress-rail-*` override) — sequence the two arms' writes to those two files (Arm A's
  countup/keyframe blocks vs Arm B's rail blocks are disjoint regions; co-landing needs an ordered merge).
- **Adversarially-verify (≤1 read-only lane — the binding-verification sweep + the no-reinvention audit).**
  (1) The BINDING-VERIFICATION sweep across the major bump (the glass-ui-binding-verification memory): mount
  the deck's Dialog/Input/DropdownMenu/GlassDock surfaces against the bumped pin and confirm every reka
  prop/emit binding still FIRES (stale `:pressed`/`v-model:search-term`/`tag=` silently no-op; vue-tsc + units
  MISS them — only e2e catches). (2) `grep -c "from \"./deck/reveal\"\|from \"./deck/useCountup\"" slides/src/**`
  is 0 + `main.ts` imports glass-ui's `vReveal` (the no-local-reveal/countup assertion). (3) `grep -c
  ".deck-progress" slides/src` is 0 (the no-parallel-rail assertion — the hand-rolled rail is gone) + slides
  imports `@mkbabb/glass-ui/deck-progress`. (4) ADVERSARIAL twists: render the deck WITH the override
  `--progress-rail-*` and confirm the library rail paints the deck look (the W24 cascade fix WINS in the
  consumer); confirm the reveal/countup grammar paints byte-identically pre/post-swap (the `[data-reveal]`/
  `[data-countup]` attributes + `--d` stagger are unchanged); confirm the xray full-height + graph aspect at
  390/768/1280 (the regression guard). (5) Confirm NO glass-ui component source was touched (unless the
  contingent Input-invalid reconcile fired, recorded).
- **Gate-author (≤1 agent).** Authors the slides-side `no-local-reveal`/`no-local-countup`/`no-parallel-rail`
  assertions (grep the slides tree — these are SLIDES-repo gates, not glass-ui gates; the audit json records
  them), wires the EXECUTION of `xray-portal.spec.ts` + `complex-graphs.spec.ts` as the live-audit gate, and
  authors the deploy pptx-200 assertion. Confirms each FAILS at the slides HEAD (local forks present; parallel
  rail present; specs unrun; no deploy assertion) and PASSES post-adoption. The glass-ui-side artefact is the
  `W32-slides-adoption.json` ledger + the CONSTELLATION.md slides-leg append; the slides-side gates live in
  the slides repo.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement + 1
verify + 1 gate. NOTE: the slides-side arms DISPATCH from the slides session per the cross-repo coordination
boundary; glass-ui authors the annex + the contract decision, the slides session executes the slides edits.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN (slides-side, plus the glass-ui ledger).**

1. **The ordered pin-bump RESOLVES + the binding-verification sweep is GREEN.** `slides/package.json` pins
   the AX release; `npm install` resolves a glass-ui that exports `useCountup` (`/motion`) + `DeckProgress`
   (`/deck-progress`); the binding-verification e2e sweep over Dialog/Input/DropdownMenu/GlassDock passes (no
   stale reka prop/emit silently no-ops across the major bump). **Born-RED** at HEAD (`^3.4.0` lacks
   useCountup/DeckProgress; no sweep run); GREEN after the bump + sweep. A build/resolution + e2e artefact.
2. **`no-local-reveal` + `no-local-countup` assertion (slides-side).** `slides/src/deck/reveal.ts` +
   `useCountup.ts` are DELETED; `grep` confirms ZERO `from "./deck/reveal"`/`from "./deck/useCountup"` in
   `slides/src`; `main.ts` imports glass-ui's `vReveal`; the countup host imports glass-ui's `useCountup`.
   **Born-RED** at HEAD (the forks exist + are consumed); GREEN after deletion. A deletion/diff artefact.
3. **`no-parallel-rail` assertion (slides-side) — the binary invariant CLEARED.** The `.deck-progress`
   `<div>`+`::after` + `--deck-progress-*` tokens are GONE; `slides/src` imports `@mkbabb/glass-ui/deck-progress`
   + renders `<DeckProgress>`; the DeckProgress binary invariant is CLEARED (slides is the REAL consumer #2).
   **Born-RED** at HEAD (two parallel rails; one demo consumer); GREEN after the port. A deletion + import
   artefact + the W24-deferred binary-invariant-CLEARED annotation in the audit json.
4. **The DeckGate LabeledField adjudication is RESOLVED (no stale BOOK note survives).** EITHER `<LabeledInput>`
   `error` slot is adopted (the `useUserInvalidAria` bridge composes — verified) and the local aria-invalid
   CSS is deleted, OR the `BOOK FG.W-input` note is RETIRED + the bespoke ring kept as intentional slides-local
   chrome. `grep -c "BOOK FG.W-input"` is 0 either way. **Born-RED** at HEAD (stale note + hand-rolled ring on
   a closed library gap); GREEN after. A diff/deletion artefact.
5. **The xray/graph fixes are COMMITTED + their e2e specs EXECUTE GREEN.** Post-W30 clean-branch, the
   SlideXray full-height + Slide04/Slide09 aspect-ratio fixes are committed; `xray-portal.spec.ts` +
   `complex-graphs.spec.ts` RUN GREEN (the drift sliver + EKG spike clear ≥ 80px at 390/768/1280; the 768
   tablet stacks; desktop 16:9 unregressed). **Born-RED** at HEAD (uncommitted fixes + authored-not-run specs —
   the headless-green/visually-broken gap one repo over); GREEN after commit + execution. An executed-spec
   artefact (NOT an authored-but-unrun spec).
6. **The pptx deploy-200 assertion FAILS LOUD on a skipped export.** A deploy-time / live-site check asserts
   `/exports/til-briefing.pptx` + `-dark.pptx` resolve 200; a deploy that skips the export step (Chrome
   missing) REDS the assertion rather than shipping dead links. **Born-RED** at HEAD (no assertion — a silent
   404 class); GREEN after. A deploy-pipeline / live-200 artefact.

These are build / resolution / e2e / executed-spec / deletion / live-200 artefacts (the precept-valid forms per
SPEC.md §Hard Gates) — NOT grep-only runtime gates (the `no-local-reveal`/`no-parallel-rail` greps are
deletion-verification of source presence, paired with the live render-equivalence audit below — not a runtime-
behaviour claim made by grep).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass over the slides deck on the DEPLOYED-equivalent build, in **light AND dark** at **≥ 3
viewports** (375×667 / 1280×800 / 1440×900 — and the slides mobile target 390×844):
- **The reveal/countup grammar renders IDENTICALLY post-adoption** (the slice's own close criterion: "live
  audit that the reveal/countup grammar + the page-bottom DeckProgress bar render identically post-adoption").
  Step through the slides that consume `v-reveal` (Slide01/09/10/Conclusion/HomeView) + the `[data-countup]`
  figures and confirm the entrance choreography + the 0→target tween paint byte-identically to the pre-swap
  deck (the glass-ui `vReveal`/`useCountup` produce the same animation the local forks did).
- **The page-bottom DeckProgress bar renders the deck look** (thin track, the `--progress-rail-*`-overridden
  token fill matching the deck, the leading-edge glow inside the clip — the W24 inset-glow fix) at PAGE-BOTTOM
  below the dock, advancing across slides, in light + dark — identical to the hand-rolled bar it replaced.
- **The DeckGate field reads correct** (the invalid-state ring on a wrong access key — the LabeledInput `error`
  slot OR the kept bespoke ring — with the shake/lock affordance intact).
- **The xray portal is full-height on mobile** (no ~260px dead cream band; footer flush) + **the drift/EKG
  graphs read at the right aspect** (the sliver/spike clear ≥ 80px; the 768 tablet stacks).
- **No occlusion / affordance hold / no console error** across the bump (the binding-verification visual leg).

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, showing the hand-rolled-rail / local-fork
BEFORE vs the library-primitive / glass-ui-import AFTER rendering identically) is the binding close criterion.
The xray-portal + complex-graphs spec EXECUTION (not their authoring) is part of this binding live close — the
exact headless-green/visually-broken gap the cardinal AX precept forbids.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against the slides HEAD +
   the glass-ui published-pin pair LIVE: `grep` the local reveal/countup forks + their consumption; confirm
   the `.deck-progress` hand-rolled rail; confirm `^3.4.0` lacks useCountup/DeckProgress; confirm the stale
   `BOOK FG.W-input` note + hand-rolled ring; confirm the xray/graph fixes are uncommitted + their specs unrun;
   confirm no pptx-200 assertion. Record in `audit/W32-slides-adoption.json` as the born-RED baseline. Do NOT
   proceed on the audit's word — re-prove (and re-prove the glass-ui side: `vReveal` on the root barrel,
   `useCountup` on `/motion`, the `error` slot on `<LabeledInput>`).
2. **GATE: the AX cut is PUBLISHED (the ordered precondition / §4 note 12 hinge).** W32's useCountup/
   DeckProgress legs are GATED on the AX release resolving on the registry (W33/W34/W35 pin-bump hinge). The
   vReveal leg + the DeckGate decision + the xray/graph commit + the deploy item can land against `^3.4.0` (the
   vReveal-only adoption) — but the FULL wave waits for the AX publish. Record the split explicitly.
3. **Bump the pin + binding-verification sweep (step 0).** Bump `slides/package.json` to the AX release; `npm
   install`; run the Dialog/Input/DropdownMenu/GlassDock binding-verification e2e sweep across the major bump.
   Confirm no stale reka prop/emit silently no-ops.
4. **Delete the reveal/countup forks → glass-ui imports (F3).** Delete `reveal.ts`/`useCountup.ts`; swap
   `main.ts` to `vReveal`; swap the countup host to glass-ui's `useCountup` (`easeFn: deckEase.fn`); reconcile
   the keyframe names vs `rise`/`fade`. Render the deck; confirm the grammar paints identically.
5. **Port the bottom bar onto `<DeckProgress>` (F-W24-consumer / clear the binary invariant).** Replace the
   `.deck-progress` `<div>`+`::after` with `<DeckProgress>` from the subpath; override `--progress-rail-*`;
   delete the hand-rolled rail CSS + tokens. Render at page-bottom in light/dark; confirm the rail paints the
   deck look + the binary invariant is cleared.
6. **DeckGate LabeledField adjudication (F5).** Apply the ratified channel (LabeledInput `error` slot OR retire
   the BOOK note + keep bespoke chrome); verify the `useUserInvalidAria` bridge composes with the `error` slot;
   confirm no stale gap survives.
7. **Commit + e2e-execute the xray/graph fixes (F5/F6 slice-30).** Post-W30 clean-branch, commit the SlideXray
   + Slide04/Slide09 fixes; RUN `xray-portal.spec.ts` + `complex-graphs.spec.ts`; add the per-breakpoint
   min-height regression guard; live-verify at 390/768/1280 + desktop 16:9.
8. **pptx deploy-200 assertion (F7 slice-30) + /deck ratify (F4).** Add the deploy-time / live-site pptx-200
   check; scrub the `/deck` lift-pending comments + record the slides-local ratify.
9. **Gates GREEN + close.** Run the slides-side assertions (no-local-reveal/countup, no-parallel-rail) + the
   executed e2e specs + the deploy check; run the VISUAL-TRUTH live audit (light/dark × ≥3 viewports + the
   390×844 mobile target); capture the paired-π BEFORE/AFTER + DELTA; APPEND the slides leg to
   `coordination/CONSTELLATION.md`; write `audit/W32-slides-adoption.json` to GREEN with the binary-invariant-
   CLEARED + the /deck-ratify + the per-leg published-currency annotations.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W32-slides-adoption.json` — the born-RED→GREEN ledger: the six RED witnesses (local
  reveal/countup forks; the parallel hand-rolled rail; the stale `^3.4.0` pin lacking useCountup/DeckProgress;
  the DeckGate stale BOOK note + hand-rolled ring; the uncommitted xray/graph fixes + unrun specs; the missing
  pptx-200 assertion), the per-finding (slice-24 F3/F4/F5 + slice-30 F5/F6/F7) disposition, the post-wave GREEN
  measurements (the forks deleted + glass-ui imports; the `<DeckProgress>` port clearing the binary invariant;
  the DeckGate adjudication; the executed specs; the deploy check), the binding-verification sweep result, and
  the explicit "DeckProgress binary invariant CLEARED — slides is now the REAL consumer #2 (the clearance W24
  routed here)" + "/deck stays slides-local (F4 ratify — ≥2-consumer invariant unsatisfied)" + "useCountup/
  DeckProgress legs gated on the AX publish; vReveal leg adoptable against `^3.4.0`" annotations.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the slides deck BEFORE (the local
  reveal/countup forks; the hand-rolled `.deck-progress` rail; the stale DeckGate ring) vs AFTER (the glass-ui
  `vReveal`/`useCountup`; the `<DeckProgress>` page-bottom rail; the adjudicated DeckGate) — rendering
  IDENTICALLY at ≥ 3 viewports × light/dark + the 390×844 mobile target.
- The executed `xray-portal.spec.ts` + `complex-graphs.spec.ts` run logs (the GREEN e2e evidence — the
  authored-not-run specs now RUN) + the per-breakpoint min-height regression-guard assertions.
- The pptx deploy-200 evidence (the deploy-time / live-site check that both `/exports/til-briefing.pptx` +
  `-dark.pptx` resolve 200).
- The `coordination/CONSTELLATION.md` slides-leg append (HEAD + branch + `git status --porcelain` at
  coordination time; the writer = slides session; the pin-bump precondition; the W30/W32 xray-commit boundary).

---

## CommitPlan (conventional-commit messages, one per sub-step)

(The slides-side commits land in the SLIDES repo, authored by the slides session; the glass-ui-side commits —
the audit ledger + the CONSTELLATION.md append — land in glass-ui. The orchestrator owns each index; agents
NEVER stage/commit/stash per the hardened agent git clause.)

slides repo:
1. `chore(deps): bump @mkbabb/glass-ui to the AX release + binding-verification sweep across the major bump (AX.W32 step-0)`
2. `refactor(deck): delete local reveal.ts/useCountup.ts → glass-ui vReveal + useCountup (easeFn: deckEase.fn) (AX.W32 F3)`
3. `refactor(deck): port the bottom bar onto <DeckProgress> + /deck-progress subpath; delete the hand-rolled .deck-progress rail (AX.W32 — clears the W24 binary invariant)`
4. `fix(gate): adopt the glass-ui LabeledField error pattern on DeckGate + retire the stale BOOK FG.W-input note (AX.W32 F5)`
5. `commit(deck): land the xray full-height + Slide04/Slide09 graph aspect-ratio fixes + execute xray-portal/complex-graphs e2e (AX.W32 slice-30 F5/F6)`
6. `ci(deploy): assert /exports/til-briefing.pptx + -dark.pptx resolve 200 + scrub the /deck lift-pending comments (AX.W32 slice-30 F7 + F4 ratify)`

glass-ui repo:
7. `chore(AX.W32): audit ledger GREEN + paired-π identical-render capture + CONSTELLATION.md slides-leg append (binary invariant cleared, /deck ratified slides-local)`

---

## Dependencies (dependsOn from the charter + why)

- **AX.W24 (Deck-progress LIBRARY-side) — the importable subpath + the cascade-correct rail.** W32 ports the
  slides bottom bar onto `<DeckProgress>` via `@mkbabb/glass-ui/deck-progress`; it CANNOT port until W24 ships
  (a) the `/deck-progress` flat subpath (so slides imports on the minimal path) and (b) the cascade-correct +
  inset-glow-true rail recipe (a broken recipe would force a fork — the F1/F2 "blocks a clean port" finding).
  W24 is LIBRARY-SIDE ONLY and does NOT claim "making slides consumer #2"; W32 CLEARS the binary invariant
  W24 left UNcleared (§4 note 18). (Charter `### AX.W32` dependsOn AX.W24, line 1586.)
- **AX.W31 (Slides content reframe) — the settled slides content surface.** W31 reframes Slide04 + restyles
  the access-modal glass + the lock-affordance; W32's form-adoption (DeckGate LabeledField) + graph-commit
  (Slide04 aspect) ride the SAME files (`DeckGate.vue`, `Slide04.vue`). Sequencing W31 BEFORE W32 (W32
  dependsOn W31) keeps the content/glass restyle landed first so W32's form/motion/graph-commit ride the
  settled file — not a three-way merge. (Charter `### AX.W32` dependsOn AX.W31, line 1586.)
- **AX.W30 (Slides baseline) — transitive via W31.** W30 lands the H working-tree on a clean branch (the
  precondition for committing the xray/graph fixes) + fixes the Canvas2D leak + executes the baseline e2e
  specs. W32's xray/graph COMMIT rides on the clean branch W30 establishes; coordinate the W30/W32 boundary so
  the xray/graph commit + the xray-portal/complex-graphs spec execution are not double-claimed.
- **The AX PUBLISH (§4 note 12 publish-currency hinge) — the ordered precondition for the useCountup/
  DeckProgress legs.** slides pins `^3.4.0`; `useCountup` + `DeckProgress` are NOT in 3.4.0 — they require the
  AX cut RESOLVING on the registry. So W32's full landing is GATED on the AX publish (the W33/W34/W35 pin-bump
  hinge). The vReveal leg + the DeckGate decision + the xray/graph commit + the deploy item are adoptable
  against the live `^3.4.0` independently — the wave records the split.
- **Downstream — AX.W33 (close) records W32's closure.** W32 CLEARS the DeckProgress binary invariant + routes
  the /deck ratify + the deploy item; W33 cross-walks the slides leg into the inheritance ledger (ADDRESSED /
  RETIRES / ARCHIVES — never "deferred to next tranche," P-Inv 28). W34 (the §16.3 receiver) records the
  slides adoption as one consumer-ledger row alongside the muster/words/fourier/value.js legs it routes to
  OTHER sessions.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **glass-ui `8036370`** ("AV.W3 — vReveal `[data-reveal]`/`--d` entrance directive on /motion-core + root
  barrel") + **`1aae548`** ("AW.W15 — `useCountup` `[data-countup]` walker on the keyframes NumericAnimation
  engine, on /motion") — the LIBRARY landings of the two idioms slides reinvents. Both were LIFTED FROM slides
  (per CLAUDE.md "lifted from speedtest/slides"), which is WHY the `[data-reveal]`/`[data-countup]`/`--d`
  grammar matches byte-for-byte and the adoption is a pure import swap. The abstraction half SHIPPED; the
  adoption half (slides deletes its copies) never ran — the §13 "consumer adoptions (dirty-tree blocked)"
  deferral bucket (slice-24 F3 `rootCause`).
- **slides `0740c16`** (F.W5 — the LAST slides touch of `src/deck/reveal.ts`/`useCountup.ts`, PRE-DATES the
  glass-ui vReveal/useCountup landing) — the provenance of the drift: glass-ui grew the primitive AFTER the
  slides files were last touched, so nothing closed the loop. The slides F-tranche audit
  (`docs/tranches/F/audit/L05-handrolled-to-gu.md` F02/F03) RECOMMENDED abstracting both; glass-ui DID; slides
  was never re-pointed (slice-24 F3 `evidence`).
- **slides `main.ts:4,25`** — registers the LOCAL `reveal` directive globally
  (`.directive("reveal", reveal)`); `src/deck/reveal.ts` (16-line `[data-reveal]`/`--d` directive) +
  `src/deck/useCountup.ts` (the `{ easeFn }` walker) — the two byte-equivalent forks W32 deletes. The
  slides-local `useCountup` already takes `{ easeFn }` (line 26), so the import swap to glass-ui's
  `useCountup({ easeFn })` is a one-line change with no signature drift.
- **slides `DeckView.vue` + `slides/src/styles/deck.css`** — the hand-rolled `.deck-progress` `<div>`+`::after`
  rail (a `transition: width` mechanic + `--deck-progress-*` tokens) at PAGE-BOTTOM (`position:fixed; bottom:
  env(safe-area-inset-bottom); z-index:40` below the dock). The de-dock placement (§10.1) is MET via this
  hand-rolled bar; W32 converges it onto `<DeckProgress>`. The slides `::after` glow is the TIGHT inset edge
  the W24 F2 inset-glow fix already adopts (the slides bar is the reference oracle).
- **slides `DeckGate.vue:60-72,81,116-118`** — the hand-rolled `aria-invalid` ring targeting the glass-ui
  `<Input>`'s inner `<input>` + the stale BOOK note "glass-ui Input has no native data-invalid state yet — BOOK
  FG.W-input." glass-ui CLOSED that gap (Input `aria-invalid` forwarding + `useUserInvalidAria` +
  `<LabeledInput>` `error` slot, `LabeledInput.vue:8-19` / `LabeledField.vue:17-24`) — verified at HEAD — but
  DeckGate never re-evaluated (slice-24 F5).
- **slides H tranche (PROGRESS.md "The e2e specs are authored but NOT executed in this dev pass")** — the
  authored-not-run `xray-portal.spec.ts` + `complex-graphs.spec.ts`; the SlideXray full-height fix
  (`aspect-ratio:auto + min-height:48cqh`, `SlideXray.vue:289-292`) + the Slide04 drift-chart / Slide09 EKG
  aspect fixes (`--chart-min-h` per-breakpoint floor + `preserveAspectRatio="none"`, `deck.css:807-815`) live
  in the UNCOMMITTED tree — the headless-green/visually-broken gap repeating one repo over (slice-30 F5/F6).
- **slides `DeckSettings.vue:53-72` + `scripts/pages-deploy.sh:64-65` + `scripts/export-pptx.mjs:37`** — the
  pptx download popover (icons + light/dark rows) is correct; the artifacts are deploy-time generated
  (Chrome → pptxgenjs), not committed, so a skipped export ships dead links silently — the deploy-pipeline
  verification W32 adds (slice-30 F7).
- **slides `package.json:24`** (`"@mkbabb/glass-ui": "^3.4.0"`) — the stale pin: `vReveal` IS in 3.4.0
  (adoptable now); `useCountup` + `DeckProgress` are NOT (require the AX bump) — the idiom:slides ordered
  precondition the prior charter missed.
- **glass-ui HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; §4 note 12: the
  published registry line is 3.6.0 / consumers pin 3.4.0–3.6.0; the W32 useCountup/DeckProgress legs are gated
  on the AX cut PUBLISHING.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-L binding precepts (pinned `docs/precepts/` @ `63240e6`): "π visual-runtime binding on the
consumer repo; cross-repo coordination + clean-branch landing; one-path (Canvas2D plain-hsl); substrate-with-
consumer (DeckProgress consumer #2)."

- **substrate-with-consumer / wire-before-retire (precepts/README.md line 8 "Substrate and consumer land
  together. A primitive that is not consumed is unfinished work."; SPEC.md §86 "Every wave lands substrate
  with its consumer or deletes the substrate").** W32 is the CONSUMER that makes DeckProgress consumer #2 —
  CLEARING the binary invariant W24 explicitly left UNcleared (§2b band-I "the binary invariant stays UNcleared
  until W32 lands the slides consumer"). MUST NOT leave DeckProgress with one demo consumer (the
  substrate-without-real-consumer anti-pattern); MUST NOT keep two parallel rails (the hand-rolled
  `.deck-progress` is RETIRED, one direction). Symmetrically, vReveal + useCountup were shipped substrate; W32
  is their first real CONSUMER adoption beyond the lift-source — closing the "lib has the primitive, slides has
  the duplicate, nothing closed the loop" drift (slice-24 F3 `rootCause`).
- **no-silent-deferrals / §16.4 zero-loss (precepts/instructions/tranche/SPEC.md §109 "consumer will be wired
  later is NOT a valid gate"; the P-Inv 28 zero-deferral close, glossary/meta-terms.md:164).** EVERY leg is
  ROUTED, not dropped: the useCountup/DeckProgress legs carry the explicit ORDERED precondition (the AX
  pin-bump + publish — §4 note 12); the vReveal leg is recorded as adoptable-against-`^3.4.0`-now; the /deck
  engine is FORMALLY RATIFIED slides-local with evidence (F4 — not silently assumed; the lift-pending comments
  are scrubbed so they stop implying work the ≥2-consumer invariant forbids); the deploy item is ROUTED as a
  live-deploy verification (not a code wave, but recorded + gated). MUST NOT close with a "BOOK"-style stale
  forward-reference surviving (the DeckGate BOOK note is RETIRED — the ossified-gap class the audit flags).
- **cross-repo coordination + clean-branch landing + sibling-baseline-capture (§2b band-L; AX.md §93-100 the
  CONSTELLATION.md mandate; bbnf-lang's BC.W0c/W5d ritual).** W32 is a SEPARATE-REPO consumer wave: it APPENDS
  the slides leg to `coordination/CONSTELLATION.md` (slides HEAD + branch + `git status --porcelain` at
  coordination time; the writer = the slides session; the pin-bump precondition); it dependsOn W30's
  clean-branch landing for the xray/graph commit; glass-ui writes NO sibling source beyond the contingent
  Input-invalid reconcile. MUST NOT touch slides files from a glass-ui session without the coordination
  boundary; the slides edits DISPATCH from the slides session.
- **binding-verification (the glass-ui-binding-verification memory; SPEC.md §Hard Gates — runtime, not
  source-grep).** The pin bump crosses a MAJOR → stale reka prop/emit bindings (`:pressed`,
  `v-model:search-term`, `tag=`) silently no-op and vue-tsc + units MISS them; only e2e catches. W32 runs the
  binding-verification e2e sweep over Dialog/Input/DropdownMenu/GlassDock as an OBLIGATORY step (the same sweep
  W03/W00 stand up). MUST NOT assume the bump is safe on a green vue-tsc.
- **one-path / no-legacy-code (the no-backwards-compat memory; SPEC.md §"no shadow APIs or temporary
  compatibility layers").** slides DELETES its forks (no parallel reveal/countup directive); slides DELETES the
  hand-rolled rail (no parallel `.deck-progress` div). There is ONE reveal directive (glass-ui's `vReveal`),
  ONE countup walker (glass-ui's `useCountup`), ONE progress rail (`<DeckProgress>`). MUST NOT keep a local
  fork "just in case" or a fallback rail. The slides-local `wipe-x`/`grow-y` keyframes STAY slides-local (they
  are NOT in glass-ui's vReveal — a legitimate consumer extension, not a duplicate).
- **π visual-runtime binding on the consumer repo (precepts/instructions/tranche/SPEC.md §"The π
  visual-runtime lane," lines 216-251; §2b band-L "π visual-runtime binding on the consumer repo").** The wave
  closes on an EXECUTED live audit (the reveal/countup grammar + the page-bottom DeckProgress bar render
  IDENTICALLY post-adoption; the xray full-height; the graph aspect) — NOT on the headless deletion greps. The
  xray-portal + complex-graphs spec EXECUTION (not authoring) is part of the binding close — the exact
  authored-but-unrun gap (the cardinal AW/H lesson repeating one repo over) the π lane exists to close. The π
  coverage MUST include ≥ 3 viewports + the mobile target + light/dark + the contrast-on-the-rail check
  (SPEC.md §228-232).
- **no-overfitting (precepts/README.md line 10; precepts/audits/overfitting-audit.md).** The `/deck` engine
  (`useDeck`/`useDeckNav`/`DeckPager`) is RATIFIED slides-local (F4) — lifting it would manufacture
  substrate-without-consumer (the ≥2-consumer invariant is unsatisfied; slides is the sole real consumer). W32
  does NOT lift it; it scrubs the lift-pending comments. The DeckProgress `deckProgress(index,total)` math
  stays consumer-side (a one-liner `100·(k+1)/N`, not a library abstraction). MUST NOT manufacture a fake demo
  deck to fake a second `/deck` consumer (the audit's option B is NOT chosen — option A honest-minimum is).
- **cross-repo-dev-resolution contract-v2 / invariant 30 (precepts/cross-repo-dev-resolution.md §229-237;
  §4 note 12 publish-currency).** The useCountup/DeckProgress legs are GATED on the AX cut RESOLVING on the
  registry — slides dev-resolves the published `dist/`, so the abstractions must be PUBLISHED before the
  adoption lands. This is the publish-currency hinge (the W33/W34/W35 pin-bump + the W41 dts-watch keystone).
  MUST NOT attempt the useCountup/DeckProgress adoption against the stale `^3.4.0` pin (they 404). The vReveal
  leg is the exception (IT is in 3.4.0 — adoptable now), recorded as the split.
- **canonical-readme-shape (precepts/canonical-readme-shape.md) — N/A this wave** (no README authored; W32 is a
  consumer-adoption + deploy-verification wave, not a substrate-ship). Noted for completeness so the band-L
  precept set is not silently partial.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The `vReveal` import PATH — the charter is WRONG (RATIFY-BEFORE-IMPL).** The charter (§3 W32 + slice-24
   F3) says "imports `vReveal` from `/motion-core`." VERIFIED at glass-ui HEAD: `vReveal` is exported from the
   ROOT BARREL (`src/index.ts:171` `export { vReveal } from "./composables/motion/vReveal"`) and is reachable
   via `/motion` (the motion subtree), but `/motion-core` (`src/motion-core.ts` → `./composables/motion/core`)
   does NOT re-export `vReveal` (grep over `core.ts` returns zero). **Recommendation: import `vReveal` from the
   ROOT barrel `@mkbabb/glass-ui`** (it is vueuse-free + dependency-free per its AV.W3 charter line, so the
   root barrel is correct) — NOT `/motion-core`. RATIFY the import path before impl; if `/motion-core` is the
   INTENDED home, that is a glass-ui-side export addition (a tiny `src/motion-core.ts` re-export) that would
   need its own FileBounds entry + the harden critique. The likely answer: the charter prose drifted; the root
   barrel / `/motion` is the real path, no glass-ui edit needed.
2. **The DeckGate LabeledField CHANNEL (RATIFY-BEFORE-IMPL).** F5 offers two paths: (a) re-point DeckGate's
   field to `<LabeledInput>` with an `error` slot (inheriting the shipped `:user-invalid` styling +
   `aria-errormessage` wiring, deleting the local aria-invalid CSS) — the full-adoption path; vs (b) formally
   RETIRE the stale `BOOK FG.W-input` note (the capability exists) + keep the hand-rolled shake/lock ring as an
   INTENTIONAL slides-local micro-styling. **Recommendation: (a) adopt `<LabeledInput>` if the bespoke
   shake/lock chrome composes with the `error` slot; (b) retire-the-note-and-keep IF the shake/lock chrome
   makes LabeledField overkill.** The deciding factor is whether the `useUserInvalidAria` bridge composes with
   the `error` slot AND whether the gate's bespoke shake animation survives the LabeledInput wrapper — verify
   at impl. Either way no stale "gap" survives (the binding outcome). RATIFY which channel before impl so the
   FileBounds DeckGate edit is scoped (channel a deletes the aria-invalid CSS; channel b keeps it + deletes the
   note).
3. **The `/deck`-stays-slides-local RATIFICATION (RATIFY — option A honest-minimum, not option B
   manufacture-consumer).** F4 offers (A) ratify continued local hold + scrub the lift-pending comments (the
   honest minimum — the ≥2-consumer invariant is unsatisfied); vs (B) MANUFACTURE a second consumer (a glass-ui
   demo story-deck) + lift the engine. **Recommendation: (A)** — the ≥2-consumer invariant is genuinely
   unsatisfied (value.js/words/muster decks were floated, never built); manufacturing a demo-deck to fake the
   bar is the precise overfitting anti-pattern (option B would lift a 1168-line engine on a synthetic
   consumer). RATIFY (A): record the slides-local hold with evidence + scrub the lift-pending comments so they
   stop implying forbidden work. (B) is revisited ONLY when a real cross-repo deck consumer materializes.
4. **The W30/W32 xray/graph-COMMIT boundary (RATIFY).** W30 lands the H working-tree on a clean branch +
   executes the BASELINE e2e specs; W32 routes the COMMIT of the xray/graph fixes + executes
   `xray-portal.spec.ts` + `complex-graphs.spec.ts` specifically. If W30 ALREADY commits + runs them (they are
   part of the H tree), W32's witness-5 leg is a VERIFY-already-done (recorded MET, not re-done). **Recommendation:**
   coordinate in CONSTELLATION.md — W30 lands the tree + runs the deck/constellation baseline specs; W32 owns
   the xray-portal + complex-graphs spec EXECUTION + the regression-guard. RATIFY the boundary so the
   xray/graph commit is not double-claimed across W30/W32.
5. **Whether W32 APPENDS to CONSTELLATION.md or W34 authors it first (RATIFY — writer boundary).** W34 is the
   §16.3 receiver that AUTHORS `coordination/CONSTELLATION.md`; W32 is a slides leg in that ledger. If W34 runs
   first, W32 APPENDS its slides-leg row; if W32 runs first (it dependsOn W24+W31, W34 dependsOn only W00), W32
   may need to SEED the slides section. **Recommendation:** W34 owns the doc; W32 APPENDS its slides leg
   (HEAD/branch/status + the pin-bump precondition) under the writer-boundary W34 declares. RATIFY the writer
   boundary so the doc is not double-authored.
