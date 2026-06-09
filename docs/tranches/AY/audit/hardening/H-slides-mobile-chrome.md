# H-slides-mobile-chrome — adversarial hardening of L.W-MOB + L.W-CHR

**Lane:** Slides mobile + chrome waves (L.W-MOB, L.W-CHR).
**Verdict:** GAPS-FOUND (the two waves are UNDER-SPECCED and CHRONIC-MISS-prone — structurally absent from the DRAFT, gated on a non-existent tool, pinned to fragile hash positions, and mis-scoped against substantial already-shipped chrome).
**Repos read:** `/Users/mkbabb/Programming/slides` @ `main`, `/Users/mkbabb/Programming/glass-ui` @ `at-dock-convergence`.

---

## 1. The structural defect: L.W-MOB and L.W-CHR DO NOT EXIST as authored waves

The canonical `L.md` table (`docs/tranches/L/L.md:54-55`) lists L.W-MOB and L.W-CHR. But:

- **No wave spec files.** `docs/tranches/L/waves/` carries `L.W1`..`L.W7` ONLY. There is no
  `L.W-MOB-*.md` and no `L.W-CHR-*.md` (`ls docs/tranches/L/waves/` confirmed). Every other L
  wave has a full spec; these two are a single table row each.
- **Absent from the DRAFT.** `docs/tranches/L/L-DRAFT.md` §2 wave table (`L-DRAFT.md:87-95`) lists
  ONLY L.W1–L.W7. Mobile + chrome are NOWHERE in the DRAFT — not in §0 directive→disposition,
  not in §2 waves, not in §2.1 ordering. They were grafted onto the published `L.md` after the
  DRAFT was written and never back-authored. The DRAFT headline (`L-DRAFT.md:20-24`) enumerates
  W1–W7 and stops.
- **Consequence:** the two CHRONIC asks (the mobile-squish set #24, the chrome set #25/#26) are
  carried by a one-line table row with a vague hard gate ("mobile captures (portrait) for all 7;
  axe + visual no-occlusion" / "modal/locked-slide/pptx captures") and no per-slide objective, no
  edit-site list, no defect file:line. This is exactly the wave-spec the precept forbids
  (`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"` requires an artefact-verifiable condition; a generic
  "captures" is not it). The under-spec is itself the recurrence mechanism: a wave with no per-slide
  defect ledger gets "done" by eyeballing and re-opens next tranche.

## 2. WHY it keeps getting missed (F→H→AX→L): verification against a stale slide set

The mobile work has been declared DONE repeatedly and re-opened every tranche. The cause is
documented in the repo:

- `docs/tranches/F/audit/V04-mobile-squish.md:126` declares "**No critical squish on Slide 10 or
  11.**" — eyeballing `s10-mobile-dark.png`, a screenshot of the **OLD 11-slide deck**.
- The deck was then winnowed 11→7 (`deck.ts:16` "The 11→7 sequence (G.W5)") and renamed to
  function (SlideTitle/Problem/Loop/Monitoring/Handoff/Xray/Ask, K.W2). Every "Slide 10/11
  mobile OK" verdict is now against slides that **no longer exist**.
- The mobile e2e tests carry the rot forward. `tests/e2e/complex-graphs.spec.ts:4-10` and
  `:40-93` test "Slide04", "Slide08", "Slide09" by their `data-slide` markers. Those markers
  survive (`SlideProblem.vue:6` `data-slide="4"`, `SlideLoop.vue:106` `data-slide="8"`,
  `SlideMonitoring.vue:7` `data-slide="9"`), so the resolution accidentally still works — but the
  test PROSE names slides that were renamed two tranches ago. A reader auditing "is mobile
  covered?" cannot map the green test to the live slide.

The chronic miss is NOT that the CSS work isn't done — `SlideLoop.vue:483-545` (drops the
overlapping absolute captions on portrait, stacks nodes, adds a loop-return affordance),
`SlideXray.vue:298-326` (drops the 4:3 cap, flex-fills the portal) show real, careful portrait
work. The miss is that **no gate re-binds the verification to the CURRENT manifest**, so each
tranche fixes real defects, declares done against a stale capture, and the user re-reports the
same class on the next real-device look. L.W-MOB repeats the pattern: its hard gate is "captures
for all 7" with no per-slide acceptance assertion and no manifest-binding.

## 3. The position-pinned mobile gates are FRAGILE to L.W1 adding a slide

L.W1's scope (`L.md:50`, `waves/L.W1-close-arc-rebuild.md`) explicitly permits "Add a slide only
if the arc needs it." The mobile tests navigate by **hash position**:

- `tests/e2e/mobile-layout.spec.ts:197` `await page.goto('/${DECK}?freeze#2')` asserts PROBLEM;
  `:206` `#3` asserts HYBRID/LOOP. These ASSUME PROBLEM is manifest index 1 and LOOP is index 2.
- The 5/6/7 arc (Handoff/Xray/Ask) is referenced throughout by ordinal. If L.W1 inserts a slide
  (a new bridge between Monitoring and Handoff, say), `#2`/`#3` still hit PROBLEM/LOOP but the
  5/6/7 captures shift to 6/7/8, and any position-keyed mobile assertion mis-targets.

There is no gate that asserts "the slide at `#N` IS SlideX" (a manifest↔position contract). L.W-MOB
runs "parallelizable after W1" (`L.md:66`) but nothing forces the mobile tests to be re-pointed
when W1 changes the count. This is a silent-pass trap: the gate goes green while testing the
wrong slide.

## 4. L.W-CHR is mis-scoped — the three chrome surfaces are LARGELY ALREADY SHIPPED

The ledger marks #25/#26 DEFERRED (`AUDIT-LEDGER.md:48-49`) as if un-built. Live source says
otherwise. L.W-CHR's one-line scope ("the access-key modal glass-ui styled; locked slides
slightly blurred + a lock symbol; pptx download icon + a light/dark popover") treats all three as
greenfield. They are not:

- **Access modal — DONE.** `src/views/DeckGate.vue` is already glass-ui-styled: `<Dialog>` +
  `<DialogContent>` + glass-ui `<Input>` + `<Button variant="primary-audacious">`, a focal lock
  disc (`DeckGate.vue:50-52,87-96` — `--red-wash` glass disc with `--glass-highlight`), a shake-on-
  miss, AA-lifted contrast notes (`:104-108`). The wave's "it's ugly" premise is stale.
- **pptx light/dark popover — DONE.** `src/deck/DeckSettings.vue:53-72` is a complete gear popover
  with `Download PowerPoint` → a nested `DropdownMenuSub` light/dark submenu, Sun/Moon glyphs with
  warm/cool tints (`:114-115`), composed from shipped glass-ui subpaths. The "UI affordance not
  built" note (`AUDIT-LEDGER.md:49`) is wrong.
- **Locked-slide blur — PARTIAL with an INVERTED defect the wave doesn't name.** `HomeView.vue`
  has the lock chip (`:35-37`) and a frosted scrim (`:125-139` `backdrop-filter: blur(2.5px)`), but
  the scrim is `opacity: 0` at rest and only blurs **on hover/focus** (`:141-144`). The user asked
  for locked slides to read as **slightly blurred + a lock symbol AT REST** — the locked-state
  signal. The current design inverts it: at rest a locked card is visually identical to an unlocked
  one (only the chip distinguishes), and the blur appears on the wrong gesture. This is the ONE real
  L.W-CHR defect and the wave spec does not capture it (it asks to "add" blur that already exists in
  the wrong state).

L.W-CHR is therefore a wave hunting work that's done while missing the one live defect. It needs
re-scoping to: (a) the at-rest locked-blur inversion, (b) a verification that the already-shipped
modal/popover survive the L.W1 rebuild + a portrait capture, NOT a from-scratch build.

## 5. L.W-MOB ask #24 sub-items are partly STALE; the wave doesn't reconcile

Walking ask #24 (`PROMPT-CORPUS.md:94-96`) against live source:

- **"remove the Open AI XRAY button (the portal launches)" — DONE.** `SlideXray.vue:94-96` the
  window IS the launch (`<a class="window" :href="XRAY_URL">`); there is no separate "Open AI
  XRAY" button in the current SFC. The ask is satisfied; L.W-MOB still lists it as a TODO.
- **"xray full-height on mobile" — DONE.** `SlideXray.vue:315-319` drops the aspect cap and
  flex-fills (`min-height: 48cqh`), with a comment crediting H.W8.
- **"icon+text overlap (the AI-does list)" — DONE on SlideLoop.** `SlideLoop.vue:493` drops the
  overlapping `.band__caption` on portrait; `:502-512` stacks nodes.
- **"graph/flow-chart aspect ratio wrong on mobile" + "no occlusion on complex slides" — UNVERIFIED
  on the renamed slides.** `tests/e2e/complex-graphs.spec.ts` tests a `--chart-min-h` floor
  (`:46`) but only min-height, not aspect-correctness or occlusion, and names stale slides. The
  SlideMonitoring/SlideProblem graph aspect on the CURRENT slides has no live capture in the L
  plan.

The wave must DISTINGUISH the done sub-items (verify-only, capture) from the open ones
(SlideMonitoring/Problem graph aspect + occlusion on the renamed/rebuilt slides), or it re-litigates
solved work and lets the real gap (occlusion on the post-L.W1 complex slides) slip again.

## 6. The hard gate names a tool that does not exist (`axe`)

`L.md:54` L.W-MOB hard gate: "axe + visual no-occlusion". There is **no axe harness in the slides
repo** — `grep -rln "axe|@axe-core|injectAxe|AxeBuilder" tests/ package.json` returns nothing;
`package.json` has exactly one `proof:*` script (`proof:deck-copy-conformance`). An "axe pass"
gate is unverifiable: either the wave must first STAND UP `@axe-core/playwright` (a real sub-task
with its own acceptance), or the gate must be re-stated as the occlusion assertion the existing
Playwright harness CAN make (bounding-box disjointness, the `mobile-layout.spec.ts:175` `disjoint()`
helper precedent). A gate that cites a non-existent tool is the under-specced-gate finding.

## 7. The bespoke constellation (547 lines) is a god-module that runs on mobile

`src/decks/til-briefing/constellation.ts` is **547 lines** (>500 god-module floor,
`PROMPT-CORPUS.md:13`) and is the bespoke copy L.W-ADOPT must delete (gated on AY.W-CON3). It is
mounted deck-wide (`deck.ts:38-41 onMount`) and runs a canvas RAF on every slide including
portrait. While L.W-ADOPT owns the deletion, the **mobile wave** must coordinate: the
constellation's mobile perf-park is honored only for `prefers-reduced-motion`
(`constellation.ts:452`) — there is no offscreen/hidden park (the glass-ui `useWebGLCanvas`
substrate the perfected component rides DOES park on `content-visibility`/`document.hidden`, per
glass-ui CLAUDE.md). So on mobile today the bespoke canvas runs every frame behind every slide.
The mobile wave's occlusion + perf story is entangled with the AY.W-CON3 adoption it is "parallel"
to but never references.

## 8. Stale slide-count rot in the chrome shell

`DeckView.vue:131` comment "(Home · NN / 11 · gear …)" and `:146` still reference 11 slides; the
deck is 7 (`deck.ts:28-36`). Cosmetic, but it is the same stale-count rot that lets the mobile
gates mis-target — the chrome shell's own comments lie about the slide count. Worth a sweep in the
chrome wave since L.W-CHR touches `DeckView`/`DeckSettings`.

---

## Convergence criteria (what "perfected" means for this lane)

L.W-MOB and L.W-CHR are perfected when:

1. **Both waves are FULLY AUTHORED** as `waves/L.W-MOB-*.md` + `waves/L.W-CHR-*.md` with a
   per-slide / per-surface defect ledger (file:line), an objective, edit-sites, and an
   artefact-verifiable hard gate — back-authored into `L-DRAFT.md` §2 so the DRAFT and `L.md`
   agree.
2. **A manifest↔position contract gate** exists: a test asserting "the slide at `#N` is SlideX by
   `data-slide` marker", so a L.W1 slide insertion fails LOUDLY instead of silently mis-targeting
   the mobile assertions. The mobile e2e prose is re-pointed to the renamed slides (no "Slide04"
   for SlideProblem).
3. **Every portrait claim is a CAPTURED DELTA** (the cardinal lesson) at 390×844 against the
   CURRENT 7-(or 8-)slide manifest — not an eyeball of a stale screenshot. The capture set covers
   all live slides, paired with the occlusion (bounding-box disjoint) assertion the harness can
   make.
4. **The occlusion gate is real**: bounding-box disjointness on the complex slides
   (SlideMonitoring/Problem/Loop graph + node figures) at portrait, NOT a min-height-only floor,
   and NOT a phantom "axe pass" unless `@axe-core/playwright` is actually stood up first.
5. **L.W-CHR is re-scoped to the live gap**: the at-rest locked-blur inversion fixed (locked cards
   read blurred + lock symbol at rest, not on hover); the already-shipped DeckGate modal + pptx
   popover verified to survive L.W1 + captured; the 11→7 stale-count rot swept in `DeckView`.
6. **The done-but-mis-tracked sub-items are reconciled**: the ledger + waves mark Open-AI-XRAY-
   button / xray-full-height / AI-does-list as DONE (verify-only), so the wave spends its budget on
   the OPEN items, not re-litigating solved CSS.

## Fold-into routing

- The two-waves-do-not-exist + back-author-the-spec defect → **net-new wave specs `L.W-MOB` +
  `L.W-CHR`** (author them; reconcile DRAFT↔L.md).
- The manifest↔position contract gate + re-point stale mobile e2e → **L.W-MOB** (gate sub-task),
  with a dependency edge on **L.W1** (must run AFTER W1 settles the slide count, not merely
  "parallel").
- The at-rest locked-blur inversion + chrome verify + stale-count sweep → **L.W-CHR**.
- The bespoke-constellation mobile-park entanglement → coordination note between **L.W-MOB** and
  **L.W-ADOPT** (the AY.W-CON3-gated adoption); the perfected glass-ui constellation's
  `useWebGLCanvas` offscreen-park resolves the mobile-perf leg for free, so L.W-MOB's perf story
  should DEPEND on W-ADOPT rather than re-park the bespoke copy.
