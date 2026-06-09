# AX Inventory — Lane C-slides: the SLIDES constellation consumer

**Scope.** Audit `/Users/mkbabb/Programming/slides` (the deck system → slides.friday.institute) as
the glass-ui consumer-of-record. State of tranches A-J + the orphaned K branch, the til-briefing +
feedback-coder decks, the AX slides band (W30-W32), the glass-ui /fourier-field + /constellation +
/deck-progress consume edge. Read-only inventory; tranche-development only.

**Repos sampled.** slides `deck/feedback-coder` HEAD `1461683` (2 commits ahead of `origin/main`
`d79091e`, both DOCS-ONLY = the J-tranche scaffold). glass-ui `at-dock-convergence` HEAD, published
registry line **3.8.0** (`v3.8.0` tagged). Production probed live 2026-06-08: `slides.friday.institute/`,
`/til-briefing`, `/feedback-coder` all HTTP/2 **200**.

---

## 1 — Ground-truth pins (verified this audit)

| Pin | Value | Note |
|---|---|---|
| slides default branch | `main` @ `d79091e` | I-tranche close + deploy; production-current |
| working branch | `deck/feedback-coder` @ `1461683` | 2 commits AHEAD of main, both J-scaffold docs (`b927326` scaffold + `1461683` ratify §7) — ZERO code ahead |
| glass-ui pin | `^3.7.0` (package.json) | resolves to published **3.8.0** at install; the deployed `15c1817` pinned 3.7.0 explicitly for the I.W10 deploy gate |
| glass-ui published | **3.8.0** (npm) | the AX cut; carries fourier-field/constellation/deck-progress subpaths |
| Production | `/`, `/til-briefing`, `/feedback-coder` all 200 | both decks LIVE on Cloudflare Pages |

**Two decks ship.** `til-briefing` (Memphis/constellation, the Friday-Institute AI-modernization pitch,
7-slide G.W5 structure) and `feedback-coder` (Fourier/Computer-Modern/split-ground, the coded-turn deck).
Both deployed.

---

## 2 — Tranche-by-tranche status (slides repo's OWN tranches A-K)

| Tranche | Subject | Status | Evidence |
|---|---|---|---|
| **A-F** | deck system buildout, responsive-first, declarative reframe, convergence | **SHIPPED** (closed; FINAL.md each) | LEDGER/FINAL present A-F; G.W5 = the 11→7 til-briefing restructure |
| **G** | til-briefing language/structure (11→7 restructure at G.W5) | **SHIPPED** | `G/` carries G.md + WRITING-CONFORMANCE + waves; the 7-slide manifest is live |
| **H** | til-briefing visual refinement (de-dock chrome, mobile reflow, constellation visibility, XRAY-on-nutrition-idiom, StatusDot single-source) | **SHIPPED + closed under I.W11** | `H/FINAL.md`; impl checkpoint-committed `da173e7`+`b622ac7`; two e2e reds fixed at source |
| **I** | feedback-coder Fourier deck — lift FourierField → glass-ui primitive, Slide-2 coded-turn bank, light↔dark flash fix, de-ceremony copy sweep, H-fold close, **deploy to prod** | **SHIPPED + DEPLOYED** | `I/FINAL`-equiv close at `d9dc9d0`; W10 deploy LANDED `9f08ded`; on main; production 200 |
| **J** | feedback-coder legibility-and-flow — Fourier intensity model, bank glass-container + in-flow gloss + keyboard, mobile gate, atmosphere, PRNG single-source, no-legacy purge, fourier-field citizenship, 3.7.0→main reconcile, a11y gate | **PLANNED ONLY — DEV-COMPLETE PLAN, ZERO IMPL** | `J.md` + 11 wave docs + DEEP-AUDIT-DIGEST present; §7 decisions RATIFIED by user 2026-06-08; the 2 commits ahead of main are the J SCAFFOLD; no J wave executed |
| **K** | til-briefing — single-close 5/6/7 redesign + slide-rename + language sweep + value-prop alignment | **ORPHANED PLAN — STALE BASE, DOCS-ONLY, ZERO IMPL** | exists ONLY as branch `tranche/til-briefing-K` @ `5b546be`; see §3 |

---

## 3 — THE K-BRANCH TRAP (the lane's headline finding — user flagged slides specifically)

**Tranche K is the "5/6/7 redesign" the lane prompt named — and it is in a broken state.**

- K exists ONLY as the git branch `tranche/til-briefing-K` (HEAD `5b546be`, 1 commit), NOT in any
  checked-out tree's `docs/tranches/` (the working dirs show A-J only). It is invisible unless you
  `git branch -a`.
- **The K commit is DOCS-ONLY.** `5b546be` changes 7 files / 605 insertions — all of them
  `docs/tranches/K/**` (K.md, WRITING-CONFORMANCE-K.md, audit/DEEP-AUDIT-DIGEST.md, 4 wave specs).
  **ZERO slide source edited.** K is a fully-authored, user-ratified PLAN that was never executed.
- **The base is STALE.** K forked from `6a79d38` ("docs(tranche-F): develop the convergence tranche") —
  a Tranche-F-era commit, BEFORE the G.W5 11→7 restructure and BEFORE H+I deployed. Consequently the K
  branch's til-briefing tree carries the OLD **11-slide** structure (`Slide01`-`Slide11`, 11-import
  `deck.ts`), which is MORE stale than the deployed 7-slide deck. K's own §1 even ASSERTS "the 11→7
  restructure landed at G.W5" and "K is a content/language pass, not a restructure" — yet the branch it
  lives on predates that restructure. **K cannot be merged or executed as-is; it must be re-seeded onto
  the deployed `main` (the 7-slide tree) first.** This is the slides analogue of the AX
  "stale-worktree trap" (MEMORY: project_workflow_stale_worktree_trap).

**K's intent (from K.md, all ratified):** slide 5 reads like a finale two slides before the actual ask,
so the deck reads twice as if ending. K.W1 makes 5 a bridge into proof(6=Xray) + ask(7); K.W2 renames the
7 files to function (`SlideTitle/Problem/Loop/Monitoring/Handoff/Xray/Ask`) + DELETES the `SlideNutrition`
orphan; K.W3 sweeps AI-tells + spaced em dashes with a built `proof:deck-copy-conformance` gate; K.W4
grounds figures in the Friday-Institute value prop (cut/source the PACE `10yr→2wk` figure, fix nutrition-
label tense + `Nothing hidden`/`as they happen` over-claims). K's §4 declares it pin-INDEPENDENT and the
deploy "rides the AX slides leg (AX.W30/W31/W32)".

---

## 4 — DEPLOYED til-briefing structure (the 7-slide live deck)

Live manifest (deck/feedback-coder = main): `Slide01, Slide04, Slide08, Slide09, Slide10, SlideXray,
SlideConclusion` (7 components; the G.W5 structure). `SlideNutrition.vue` still EXISTS on disk but is
RETIRED from the manifest (its artifact folds into SlideConclusion — H.W10/W11 single-sourced its pulse
dot onto glass-ui StatusDot). The `Slide04` what-if reframe + `~$5M` clip are ALREADY in the deck
(H.W9). The constellation draws via deck-local `constellation.ts`.

---

## 5 — AX SLIDES BAND (W30-W32) vs slides reality — LARGELY STALE / ALREADY-SHIPPED

The AX charter's L-band (`AX.md` §3 W30-W32) was authored against a slides snapshot that PREDATES the
slides repo's own H+I tranches. Most of it is already shipped:

| AX wave | Charter scope | Slides reality | Disposition |
|---|---|---|---|
| **W30** (blocker) | "land the H working-tree on a clean branch; fix the constellation light-dark()-into-Canvas2D leak; execute the authored e2e specs" | H working-tree LANDED + closed (I.W0 checkpoint `da173e7`, I.W11 close); e2e specs EXECUTED (I.W2 fc harness + til specs green). **BUT** `constellation.ts` STILL contains 1 `light-dark(` match — the leak fix may be RESIDUAL/incomplete (H.W4 claims plain-hex Canvas2D-safe tokens, but a `light-dark(` survives in the file) | **MOSTLY DONE by slides H/I; verify the residual `light-dark(`** |
| **W31** (major) | "Slide04 hypothetical/what-if anomaly + $5M figure-clip; lock-affordance; access-modal glass restyle; mobile reflow guards" | Slide04 what-if + `~$5M` clip ALREADY in deck (H.W9 + earlier). til-briefing access gate RETIRED (deck is public, H.W6). Mobile reflow LANDED (H.W3 marker recipe) | **STALE — already shipped by slides G/H** |
| **W32** (minor) | "delete local reveal.ts/useCountup.ts → glass-ui vReveal/useCountup; LabeledField error pattern; deploy verification" | `src/deck/reveal.ts` + `src/deck/useCountup.ts` STILL PRESENT (NOT deleted); vReveal/useCountup from glass-ui NOT yet consumed in their place. Deploy verified (prod 200) | **PARTIAL — the motion-adoption half is genuinely NOT-STARTED**; deploy-verify done |

**Net:** the AX L-band is ~70% already-discharged by the slides repo's own tranches; the genuine
remaining glass-ui-consumer adoption is W32's `reveal.ts`/`useCountup.ts` → `vReveal`/`useCountup` swap
(both local files survive at HEAD), plus the W30 constellation `light-dark(` residual to verify, plus the
LabeledField error-pattern adoption. The AX charter §3 W30-W32 bodies should be RE-GROUNDED against the
post-I slides HEAD, not executed against the stale snapshot.

---

## 6 — The /fourier-field + /constellation + /deck-progress consume edge

glass-ui 3.8.0 ships all three subpaths (`package.json` exports confirm `./fourier-field`,
`./constellation`, `./deck-progress`; `src/components/custom/fourier-field/` = FourierField.vue + math.ts
+ index.ts).

- **fourier-field:** consumed by feedback-coder (I.W1 lifted the deck-local copy into glass-ui, deleted
  the re-typed math). BUT the deployed fourier-field carries the OLD `OUTLINE_PEAK_ALPHA = 0.24` whisper
  ceiling — the J.W1 per-variant intensity model (peakAlpha/head-glow/trailFadeExp bundle + `intensity`
  prop) is NOT yet in the published artifact. **This is the J-tranche / AX-W43 double-home item:** the
  glass-ui-side intensity model is AX **W43** (fourier-field first-class citizenship + the J.W1 intensity
  bundle), and the slides consume is J.W2. They are CROSS-REPO COUPLED — the slides J tranche cannot
  close W2 until glass-ui ships the intensity model (W43) and slides re-pins a `main`-sourced publish
  (J.W9 reconcile).
- **constellation:** glass-ui ships `./constellation` but til-briefing STILL runs deck-local
  `constellation.ts` (the AW.W17 ≥2-consumer swap is GATED/UNDECIDED — H.W4/W11 recorded slides as the
  named consumer-#2 signal; J.W9 is supposed to DECIDE execute-or-close). The swap is now UNBLOCKED
  (3.8.0 ships the component) but unexecuted.
- **deck-progress:** AX W24 exported the `/deck-progress` subpath; the slides consume (the port) was
  routed to AX W32 / the slides side. til-briefing's bar keeps its `position:fixed` placement wrapper as
  the consume seam (H.W2); the actual `DeckProgress` component consume stays gated.

---

## 7 — DONE / PARTIAL / NOT-STARTED / DEFERRED

**DONE (shipped + deployed, audited on prod):**
- Tranches A-I fully closed; both decks live (200).
- til-briefing: 7-slide G.W5 structure, H visual refinement, StatusDot single-source, public (no gate).
- feedback-coder: Fourier deck deployed (I.W10), glass-ui fourier-field lift consumed, Slide-2 coded-turn
  bank, light↔dark ground crossfade, de-ceremony copy sweep behind wired conformance gate.

**PARTIAL:**
- AX W30 (constellation `light-dark(` residual: 1 match survives in `constellation.ts` despite H.W4
  plain-hex claim — verify).
- AX W32 motion-adoption (local `reveal.ts`/`useCountup.ts` survive; glass-ui `vReveal`/`useCountup` not
  swapped in their place).
- glass-ui /constellation + /deck-progress consume (subpaths ship; slides still deck-local/gated).

**NOT-STARTED (planned, dev-complete, zero impl):**
- **Tranche J** (11 waves, feedback-coder legibility — RATIFIED 2026-06-08, no wave executed). The 2
  commits ahead of main are ONLY the J plan scaffold.
- **Tranche K** (4 waves, til-briefing 5/6/7 single-close redesign — ORPHANED on a stale-base docs-only
  branch; see §3). NEEDS re-seed onto deployed main before ANY execution.

**DEFERRED items that must FOLD INTO this tranche (AX or slides-J/K coordination):**
1. **K-branch re-seed + execution** — the user FLAGGED slides specifically; the 5/6/7 single-close
   redesign is a ratified plan stranded on a stale 11-slide base. It must be cherry-picked/re-authored
   onto the live 7-slide main, then executed. This is the single highest-value slides deliverable.
2. **J-tranche Fourier intensity (J.W1/W2 ↔ AX W43)** — the deployed Fourier hero is a near-invisible
   whisper (0.24 ceiling); the user-ratified target is hero head-glow ≈0.55 / final ≈0.45. The glass-ui
   intensity-model half is AX W43; the slides consume + floor gate is J.W2. CROSS-REPO sequenced:
   glass-ui ships W43 → re-pin main-sourced publish → slides consume.
3. **glass-ui 3.7.0/3.8.0 → main provenance reconcile (J.W9 / AX W33)** — slides pins `^3.7.0` resolving
   to 3.8.0, both published from `at-dock-convergence` (a branch tip), NOT glass-ui `main`/`master`. The
   slides standing rule ("only pin a main-sourced publish") is VIOLATED. AX W33 close + the
   `at-dock-convergence → master` merge must land before slides can honestly re-pin.
4. **AW.W17 / constellation ≥2-consumer swap DECISION** — unblocked (3.8.0 ships `./constellation`),
   til-briefing still deck-local; J.W9 owes the execute-or-close decision.
5. **AX L-band re-grounding** — W30/W31 are mostly stale (already-shipped by slides G/H/I); the band must
   be re-pointed at the post-I HEAD so it does not re-execute discharged work or claim false credit.

---

## 8 — GAPS / plan divergences

- **The AX charter's slides band (W30-W32) is a snapshot-mismatch.** It reads as if the slides H+I
  tranches never happened (it asks to "land the H working-tree," reframe Slide04, retire the access gate —
  all DONE in slides). The AX FINAL must not claim these as AX deliverables; they are slides-repo-owned
  and already closed. Only the W32 motion-adoption + the constellation residual are live.
- **Tranche K is invisible to anyone reading `docs/tranches/`** (it is branch-only, off a stale base).
  This is a silent-deferral / lost-work risk. The lane surfaces it explicitly so it folds into the
  convergence ledger rather than rotting on an unmerged branch.
- **J is fully ratified but unexecuted** — 11 waves of planned work (the deployed Fourier deck's two
  signature surfaces both "ship as source that renders to nothing a stakeholder can see"). This is the
  user's exact complaint and is wholly outstanding.
- **Provenance-rule violation is structural** — slides pins a branch-tip publish; until glass-ui closes AX
  (W33) and merges `at-dock-convergence`→`master`, every slides re-pin re-violates J's standing rule. The
  glass-ui-side AX close is a HARD predecessor of the slides J/K close.

---

## 9 — Gestalt PATH FORWARD (planning, not code)

1. **Re-seed Tranche K onto live main, THEN execute (highest value — user-flagged).** The K plan is sound
   and ratified; only its base is wrong. Branch a fresh `tranche/til-briefing-K2` off deployed `main`
   (7-slide tree), cherry-pick the K docs, then execute K.W1 (5→bridge, 6→Xray proof two-column,
   7→sole close) → K.W4 (value-prop fact-grounding) → K.W2 (function-rename + delete SlideNutrition
   orphan) → K.W3 (language sweep + `proof:deck-copy-conformance` gate). Clean break, no compat aliases
   (matches MEMORY no-backwards-compat). The 5/6/7 redesign is editorial/compositional, not a new visual
   system — low pin-coupling, can land independent of the glass-ui AX close.
2. **Sequence the J Fourier-intensity cross-repo hinge correctly.** glass-ui AX **W43** ships the
   per-variant intensity bundle + `intensity` prop on fourier-field (DELETE `OUTLINE_PEAK_ALPHA`, no
   alias — clean break). Close AX (W33) and merge `at-dock-convergence`→`master` so the publish is
   main-sourced. THEN slides J re-pins, consumes the intensity token (hero ≈0.55 / final ≈0.45), and
   J.W2's pre-registered floor gate proves fail-on-old / pass-on-new. The bank glass-container + in-flow
   gloss + keyboard (J.W3-W5) + mobile gate (J.W6) + atmosphere (J.W7) are slides-local and can run
   against the deployed deck in parallel with the glass-ui half.
3. **Decide the constellation ≥2-consumer swap in writing (J.W9).** Either execute til-briefing onto
   `@mkbabb/glass-ui/constellation` (now unblocked) deleting deck-local `constellation.ts` — which also
   resolves the W30 `light-dark(` residual at the source — or formally close with a recorded reason. No
   third carry.
4. **Re-ground the AX L-band against post-I HEAD.** Rewrite AX §3 W30/W31 to credit the slides H/I closes
   and scope W30-W32 to the GENUINE remaining: the W32 `reveal.ts`/`useCountup.ts`→`vReveal`/`useCountup`
   adoption + the LabeledField error pattern + deploy-verify. Do not re-execute discharged work.
5. **Honor the provenance discipline as a constellation invariant.** The glass-ui AX close
   (`at-dock-convergence`→`master` + a provenance-clean re-tag) is the keystone unblocking every slides
   re-pin. Treat it as the sequenced predecessor of both slides J.W9 and any K deploy.

**Cardinal-lesson note:** both decks are LIVE-200, but "deployed" is not "legible" — J's entire thesis is
that the feedback-coder Fourier hero + Slide-2 bank render to near-nothing under green gates (the exact
AX headless-green/visually-broken class). Any slides close must audit on the LIVE product with a measured
floor (coverage-fraction + ground-contrast luminance delta), never a presence check.
