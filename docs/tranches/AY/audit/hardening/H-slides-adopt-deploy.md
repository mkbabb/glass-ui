# H-slides-adopt-deploy — adversarial hardening: slides glass-ui adoption + deploy (L.W-ADOPT/W5)

**Verdict: GAPS-FOUND (severe — the headline adoption wave is UNAUTHORED + the gate is fictional + the integration is a re-architecture, not a swap).**

Lane scope: RED-TEAM the slides adoption of perfected glass-ui (L.W-ADOPT — delete bespoke
`constellation.ts`, consume `@mkbabb/glass-ui/constellation`, audit every befitting component →
glass-ui) and the L.W5 deploy chain (forward-cut → main → deploy-pages → pptx-200 → live 200 +
DELTA, HARD BOUNDARIES preserved).

Repos read live: `/Users/mkbabb/Programming/slides` @ `main` (HEAD `3765d52`),
`/Users/mkbabb/Programming/glass-ui` @ `at-dock-convergence`.

---

## F1 — L.W-ADOPT does not exist as an authored wave (PLAN-vs-DRAFT desync; the HEADLINE wave is a phantom)

The L tranche has TWO conflicting plan documents:

- `slides/docs/tranches/L/L.md:56` — §2 Track A table lists **`L.W-ADOPT`** ("Adopt the
  perfected glass-ui components (gated on AY): DELETE the bespoke
  `src/decks/til-briefing/constellation.ts`, consume `@mkbabb/glass-ui/constellation` ... audit
  every befitting major component → glass-ui"). `L.md:33` routes the adoption directive to it.
- `slides/docs/tranches/L/L-DRAFT.md:87-95` — the §2 wave table jumps **L.W4 → L.W5 directly**.
  There is NO L.W-ADOPT row, no L.W-MOB row, no L.W-CHR row. The §0 directive table
  (`L-DRAFT.md:48`) routes "slides consume glass-ui" to ... nothing (the row is absent).
- `slides/docs/tranches/L/waves/` — contains ONLY `L.W1..L.W7`. There is **no `L.W-ADOPT.md`,
  no `L.W-MOB.md`, no `L.W-CHR.md`**. Three waves named in `L.md` §2 have zero spec files.

So the single most-cited directive in the entire engagement (corpus §B.1, §C.28, AY.md
headline "no bespoke duplicates", the explicit "slides-local constellation.ts is the exemplar
to KILL") is carried by a one-line table row in `L.md` that the actual draft + the authored
wave set do not contain. There is no objective, no edit-site list, no file inventory, no
evidence-backed hard gate. This is the CHRONIC-MISS pattern (item #1 PARTIAL since H.W4 per
`AUDIT-LEDGER.md:20`) carried yet again into an unauthored row.

## F2 — L.W-ADOPT is gated on AY.W-CON3, which is ALSO unauthored (the gate-chain bottoms out in a void)

`L.md:56` gates L.W-ADOPT on AY (specifically AY.W-CON3 per `AY.md:54`/`AY.md:104`). But
`glass-ui/docs/tranches/AY/waves/` is **EMPTY** (`ls` exit 1 — no files). NONE of AY's 22 waves
have an authored spec. AY.W-CON3's hard gate (`AY.md:54`) names `proof:no-bespoke-constellation`
— a gate that:

- does NOT exist in glass-ui (`grep no-bespoke package.json scripts/` → 0 real hits; the only
  hits are the workflow-script prose).
- does NOT exist in slides either (`grep no-bespoke slides/package.json slides/scripts/` → 0).
- is mis-homed if it ever lands in glass-ui: a gate asserting the SLIDES bespoke copy is gone
  must live in the SLIDES repo (it inspects slides' src), not in the library.

So L.W-ADOPT depends on AY.W-CON3 → which depends on a non-existent gate + an unauthored spec.
The dependency chain has no floor. A wave gated on a phantom is itself a phantom.

## F3 — "consume the lib component, no behavior delta" is FALSE: the two constellations have INCOMPATIBLE integration models (re-architecture, not a swap)

The bespoke and the library constellation are architecturally different animals; the
adoption is a re-architecture the wave treats as a delete-and-import.

- **slides bespoke** (`slides/src/decks/til-briefing/constellation.ts:446`) — an IMPERATIVE
  DOM-scanning controller: `createConstellations(root)` scans `root` for ALL
  `<canvas data-constellation>` elements and drives every one of them from a SINGLE controller
  + ONE shared RAF loop. Mounted once at the deck level (`deck.ts:38-41`,
  `onMount(root){ const c = createConstellations(root); return () => c.destroy() }`). Three+
  slides carry canvases: `SlideTitle.vue:14`, `SlideHandoff.vue:14`, `SlideAsk.vue:39`
  (`data-anomaly="0.60,0.36"`, `data-resolved`).
- **glass-ui** (`src/components/custom/constellation/Constellation.vue` +
  `index.ts`) — a DECLARATIVE per-instance SFC: `<Constellation :seed :warpOnClick
  :drawOverlay />`, each instance owning its OWN canvas, RAF, and palette readback. No
  DOM-scan, no shared controller, no `data-constellation` attribute contract.

Consequences the wave does not address:
1. **PERF regression risk.** Replacing ONE shared RAF (the bespoke deliberate design) with N
   independent `<Constellation>` RAF loops across the deck is a measurable frame-budget change
   on a deck that already has e2e perf specs (`tests/e2e/perceptual.spec.ts`,
   `complex-graphs.spec.ts`). "No behavior delta" is unverifiable without a frame-budget capture.
2. **Anomaly/resolved placement moves to the consumer.** glass-ui's props
   (`Constellation.vue:55-95`) are `count/link/speed/seed/pointerReactive/warpOnClick/
   drawOverlay/class` — there is **no `anomaly` position prop and no `resolved` prop**. The
   slides `data-anomaly="0.60,0.36"` + `data-resolved` + the "clear of the hero/headline type"
   layout-aware seeding (constellation.ts:217, E13) all live in the bespoke engine. To
   reproduce them on the lib component the slides MUST author a `drawOverlay` callback per slide
   — real adoption work the wave does not enumerate.

## F4 — DEPLOY-CHAIN REGRESSION: the glass-ui constellation has NO `?export/?print/?freeze` deterministic-capture seam the slides pptx + shoot pipeline depends on

The slides bespoke constellation reads `location.search` for `export|print|freeze`
(`constellation.ts:450`, `const deterministic = /[?&](export|print|freeze)/.test(...)`) to lay
out a REPRODUCIBLE static frame for the capture pipeline. The deploy chain
(`pages-deploy.sh` step 3b → `export-pptx.mjs`, and `shoot.mjs`) renders the deck under these
flags and relies on a frozen, deterministic constellation.

The glass-ui `Constellation.vue` freezes ONLY under `prefers-reduced-motion`
(`Constellation.vue:28`, "reduced-motion freeze for free"). It has a `seed` prop for a
reproducible field but **no URL-driven `?freeze` static-frame hook**. Swapping the bespoke for
the SFC without porting the deterministic-capture seam REGRESSES the pptx export + the visual
shoot captures (a non-deterministic constellation defeats the perceptual-diff specs +
`?export` static render). This is a deploy-chain break that the L.W-ADOPT "no behavior delta"
gate is blind to, and it directly endangers L.W5's pptx + DELTA-capture gates.

## F5 — L.W5's "pptx-200 manifest asserts IN CI" hard gate is FICTIONAL (describes machinery that does not exist)

`L.W5-deploy.md:39` (HARD GATE 2): "the pptx-200 / slideCount manifest check passes in CI."
`L.md:57` repeats "pptx-200 assert." This machinery does not exist:

- `slides/.github/workflows/ci.yml` runs ONLY `vue-tsc --noEmit` + `vite build`. No pptx step,
  no HTTP 200 check, no e2e, no slideCount assert.
- `slides/.github/workflows/deploy-pages.yml` runs `scripts/pages-deploy.sh`.
- `pages-deploy.sh` step 3b exports pptx **best-effort**: the comment is explicit — "if it is
  unavailable the deploy still ships (the gear links 404 gracefully)" and "deploy continues
  without fresh artifacts." There is NO `200` assertion on the pptx and NO slideCount gate that
  fails the deploy.
- `export-pptx.mjs:43-94` HAS a `slideCount()` manifest-derive, but it is not wired to any CI
  pass/fail; it just counts slides for the render.

So HARD GATE 2 is unverifiable — the gate names an artefact (a CI pptx-200 manifest check) that
no workflow produces. A hard gate that cannot be verified by an artefact is invalid per
`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"` (grep-only / "API exists" insufficient).

## F6 — L.W5's "live HTTP 200" + "CI green" gates conflate two never-server-side-run truths

`L.W5-deploy.md:40` (HARD GATE 3): "CI green: `deploy-pages.yml` completes green (the
`xray-portal.spec.ts` flake covered by `retries: 1`)." But:

- e2e/Playwright runs in NEITHER `ci.yml` NOR `deploy-pages.yml` (`grep playwright|e2e
  .github/` → 0). The 18 e2e specs (`tests/e2e/*.spec.ts`) run LOCALLY only. The gate cites a
  `retries: 1` CI flake-cover that has no CI to run in.
- "live HTTP 200" is a post-deploy probe the agent must run by hand — fine — but it is gated
  AFTER the user-domain CF push, so the agent cannot self-close the wave. The wave does not
  state WHO runs the 200 probe and at what point (the cardinal-lesson DELTA needs the agent to
  capture the LIVE site, but the live site only exists after the user-domain push).

The gate set conflates "the local typecheck+build CI" with a non-existent e2e-bearing CI and a
post-push live probe. It needs decomposition: (a) local proof:deck-copy-conformance + build
green; (b) the user-domain push; (c) the agent's post-push live-200 + DELTA capture.

## F7 — the glass-ui PIN is a CARET, contradicting the explicit-pin contract + the L narrative

`slides/package.json` pins `"@mkbabb/glass-ui": "^3.9.0"` (a CARET range), while
`L-DRAFT.md:73`/`L-DRAFT.md:129` claim "the deck pins ... at 3.9.0 (bumped this session, in the
working tree)" and L.W5's Files line says "the 3.9.0 pin, already in the tree." A caret is NOT
a pin. Three problems:
1. AY publishes a NEW version (perfected constellation + warp + the SOTA components — likely
   3.10.0+). The caret `^3.9.0` would SILENTLY auto-resolve the new minor on the next `npm ci`
   — a stale-dist / surprise-resolution hazard the cross-repo contract-v2 (CLAUDE.md, invariant
   30) exists to prevent. The adoption wave does not sequence the re-pin to the AY-published
   version.
2. L.W-ADOPT cannot consume `@mkbabb/glass-ui/constellation`'s perfected warp+easter-eggs until
   the pin advances to the AY publish — but the pin bump is nowhere in L.W-ADOPT's (absent)
   spec, and L.W5 lists only "the 3.9.0 pin." The version arithmetic is stale before it ships.
3. AY.W7 (the glass-ui publish, USER-DOMAIN) is the upstream hinge; the L plan never states the
   AY-publish → slides-re-pin → L.W-ADOPT → L.W5 sequence. The cross-repo ordering is implicit.

## F8 — "audit EVERY befitting major component → glass-ui" is unscoped; the bespoke `src/deck/` deck-chassis is the elephant the wave never names

The directive (corpus §C.28, `L.md:56` "audit every befitting major component → glass-ui") is
carried as a vague clause with no inventory. The actual befitting-component state in slides:

- **`slides/src/deck/`** is a wholesale BESPOKE deck chassis: `DeckView.vue`, `DeckPager.vue`,
  `DeckSlide.vue`, `DeckSettings.vue`, `useDeck.ts`, `deckSpring.ts`, `useDeckNav.ts`,
  `pagerWindow.ts`. The source comments explicitly mark it as "the local consumer #1 of the
  eventual `@mkbabb/glass-ui/deck`" (`DeckSlide.vue:10`, `DeckPager.vue:15`, `useDeck.ts:4`,
  `deckKeys.ts:2`). But **glass-ui has no `/deck` subpath** — it ships `/deck-progress` only
  (`package.json:340`; `src/subpaths/deck-progress.ts`). So the single largest bespoke surface
  in the slides repo (the entire deck engine) is acknowledged-pending-lift in the SOURCE, yet
  AY has no W-DECK lift wave and L.W-ADOPT names only constellation. This is the real
  "befitting component → glass-ui" body, unaddressed in both tranches.
- **Already-consumed (good):** `DeckGate.vue` (the access-key modal — corpus #25, the "ugly
  modal" ask) ALREADY consumes glass-ui `Dialog/Button/Input` (`DeckGate.vue:3-5`). So the
  W-CHR "glass-ui style the modal" ask is largely DONE — but the unauthored L.W-CHR wave does
  not record this, risking redundant rework.
- **Consumed via subpath (fine):** `StatusDot` (3 sites), `FourierField` (feedback-coder,
  2 sites), `GlassDock`/`DockIconButton` (`DeckView.vue:5`, `DeckSettings.vue:14`),
  `DarkModeToggle`, `ToggleGroup`, `Dialog`. So the deck DOES consume the lib widely; the gap
  is the deck CHASSIS + constellation, not the leaf widgets.

The wave must produce a befitting-component INVENTORY (every bespoke surface × keep-bespoke /
lift-to-glass-ui / already-consumed) with the ≥2-consumer bar applied per surface, not a
hand-wave "audit every befitting component."

## F9 — the constellation `--constellation-alpha` translucency tune (corpus #3) is split-brained between repos with no owner

`L-DRAFT.md:119-121` says the per-mode `--constellation-alpha` tune "is a deck-CSS token
override, not a constellation-engine change (the engine is glass-ui's)." But the deck currently
runs the BESPOKE engine (`constellation.ts`), not glass-ui's. So the token override target is
ambiguous: it overrides a token the bespoke engine reads, which goes away on adoption. The
translucency-tune (item #3 PARTIAL since H.W4, `AUDIT-LEDGER.md:22`) has no clear home —
glass-ui W-CON1 tunes `--constellation-alpha` both modes, but the slides deck won't read it
until L.W-ADOPT swaps the engine. The two waves must be sequenced so the token tune lands in
glass-ui AND the slides re-pin + adopt land together, else the translucency ask falls in the gap
between repos a third time.

---

## Chronic misses (carried ≥2 tranches)
- **Constellation-as-consumed-glass-ui** (corpus #1, AUDIT-LEDGER PARTIAL since H.W4; the
  AY/L "exemplar to KILL") — STILL bespoke at HEAD; the adoption wave that kills it is
  unauthored (F1) and gated on an unauthored upstream (F2).
- **"slides consume glass-ui for every befitting component"** (corpus #28) — unscoped across
  H→AX→L; the deck chassis (the body of it) is named pending-lift in source but in no wave (F8).
- **Cross-repo version sequencing** — the caret-pin / publish-then-repin ordering recurs
  (project_glassui_340_published, the 3.7.0→3.9.0 churn) and is implicit again here (F7).

## Fold-into routing
- F1, F2 → **net-new L.W-ADOPT (AUTHOR IT)** + reconcile `L.md` ↔ `L-DRAFT.md` ↔ `waves/`;
  net-new **AY.W-CON3 spec** with the real `proof:no-bespoke-constellation` (homed in SLIDES).
- F3, F4 → L.W-ADOPT (the integration-model port + the `?freeze` deterministic-capture seam) AND
  back into **AY.W-CON2/CON3** (the glass-ui component must GROW a deterministic-capture seam +
  an anomaly/resolved prop set before it is consumable). This is a glass-ui pre-req, not slides
  work.
- F5, F6 → **rewrite L.W5's hard gate** to verifiable artefacts (decompose CI-build vs
  user-push vs post-push live-200+DELTA; drop the fictional pptx-200-in-CI clause or BUILD the
  assertion).
- F7 → L.W-ADOPT + L.W5 (the AY-publish → re-pin → adopt → deploy sequence, explicit).
- F8 → net-new **AY.W-DECK** (lift the deck chassis to `@mkbabb/glass-ui/deck`, ≥2-consumer bar)
  OR an explicit keep-bespoke decision with rationale; L.W-ADOPT inventory.
- F9 → sequence W-CON1 (token tune) ↔ L.W-ADOPT (engine swap + re-pin) so translucency lands once.

## Convergence criteria (the acceptance bar for this lane)
This lane is "perfected" when: (1) L.W-ADOPT exists as a fully-authored wave with an inventory
of every befitting slides surface (keep / lift / already-consumed), an explicit integration-model
port for constellation (DOM-scan controller → N declarative `<Constellation>` instances WITH a
captured frame-budget proving no perf regression), the `?freeze` deterministic-capture seam ported
into the glass-ui component, and a real `proof:no-bespoke-constellation` gate homed in slides;
(2) the AY.W-CON3 spec exists and the gating export chain bottoms out in real, verified
artefacts; (3) L.W5's hard gate is decomposed into verifiable artefacts (local build/conformance
green; the user-domain push named; the agent's post-push live-200 + paired-DELTA capture per the
cardinal lesson); (4) the AY-publish → slides-re-pin → adopt → deploy sequence is explicit and
the caret is replaced with the exact AY-published pin; (5) the HARD BOUNDARIES
(`CLOUDFLARE_API_TOKEN`, git/tag push, access key `wolfpack-ledger-2026`) are preserved and
named as never-agent-executed (this clause IS present in L.W5:45-49 — good, keep it).

## Wave-spec inputs (material a fully-authored wave needs)
1. **Defect (file:line):** `L.md:56` cites L.W-ADOPT; `L-DRAFT.md:87-95` + `waves/` lack it;
   `AY/waves/` empty; `proof:no-bespoke-constellation` absent both repos; pin is `^3.9.0`
   (caret); bespoke `constellation.ts:446` is an imperative DOM-scan controller while
   glass-ui `Constellation.vue` is a declarative SFC with no anomaly/resolved/freeze seam.
2. **Objective:** author L.W-ADOPT + AY.W-CON3 as real waves; produce the befitting-component
   inventory; port the constellation integration model (incl. `?freeze` capture + anomaly
   placement); decompose L.W5's gate; sequence the cross-repo publish→re-pin→adopt→deploy.
3. **Files/edit-sites:** AUTHOR `slides/docs/tranches/L/waves/L.W-ADOPT.md` (+ reconcile
   `L.md`/`L-DRAFT.md`); AUTHOR `glass-ui/docs/tranches/AY/waves/AY.W-CON3.md`; edit
   `slides/src/decks/til-briefing/deck.ts:38-41` + `slides/src/decks/til-briefing/slides/
   {SlideTitle,SlideHandoff,SlideAsk}.vue` (canvas→`<Constellation>`); DELETE
   `slides/src/decks/til-briefing/constellation.ts`; ADD a `?freeze` seam to
   `glass-ui/src/components/custom/constellation/Constellation.vue`; ADD an `anomaly`/`resolved`
   prop set or document the `drawOverlay` recipe; NEW `slides/scripts/proof-no-bespoke-
   constellation.mjs`; bump `slides/package.json` glass-ui pin to the exact AY publish; rewrite
   `slides/docs/tranches/L/waves/L.W5-deploy.md:36-43` hard gate.
4. **HARD GATE (evidence-backed):** bespoke `constellation.ts` deleted (deletion proof);
   `proof:no-bespoke-constellation` GREEN in slides (grep-clean + build resolves the lib import);
   a captured frame-budget DELTA showing the N-instance RAF model is within budget of the
   shared-RAF baseline; the `?freeze` pptx + `shoot.mjs` static captures render identically
   (perceptual-diff pass); `slides/package.json` carries the exact AY-published version (not a
   caret); `vue-tsc --noEmit && vite build` green; `proof:deck-copy-conformance` green; and the
   live `slides.friday.institute/til-briefing` 200 + a paired before/after DELTA artefact
   captured AFTER the user-domain push (cardinal lesson — not a commit-message claim).
