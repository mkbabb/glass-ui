# AX.W30 — Slides baseline: land the H working-tree + fix the constellation light-dark()-into-Canvas2D leak

**Band** L · SLIDES · **Severity** blocker · **dependsOn** AX.W17 (the library-side `--constellation-line`
plain-hsl token + the focal/warp seam this slides port reads — gated on the AX cut PUBLISHING per §4 note
12) + AX.W00 (the π visual-runtime discipline this wave's executed e2e + live render-matrix audit run under,
declared binding on the slides repo) · *(separate repo, tracked — glass-ui writes NO library source in this
wave; the orchestrator commits the SLIDES tree)* · **Charter** AX.md §3 (the `### AX.W30` block, lines
1503-1546) + §2b band-L precept row (π visual-runtime binding on the consumer repo; cross-repo coordination +
clean-branch landing; one-path Canvas2D plain-hsl; substrate-with-consumer DeckProgress consumer #2) + §4 note
9 (the slides band is a SEPARATE REPO folded for tracking; most §12 items are RESOLVED at the code level by
G/H but were NEVER browser-verified + the H work is stranded uncommitted) + §4 note 12 (publish-currency: the
slides adoption legs are at-HEAD-only until the AX cut PUBLISHES) + the §3 `### AX.W17` block (lines 925-999,
the LIBRARY-side complement — the `--constellation-line` plain-hsl token W17 ships is what W30 reads
slides-side) · **Audit** `deep-audit-corpus.json` slice `slides-content` (index 28, finding F6 the
stranded-H-working-tree blocker) + slice `slides-visual-mobile` (index 29, finding F0 the CARDINAL constellation
`--foreground` light-dark()-into-Canvas2D leak + F1 the authored-but-unrun e2e specs) +
`constellation-analysis-corpus.json` slice `hist:slides` (the working-tree-is-buried-under-6-commits
sharpening + the FourierField `resolveCanvasColor` adoption + the second `feedback-coder` deck enumeration +
the all-7-specs execution mandate) + slice `idiom:slides` (the version-pin staleness precondition + the
TWO-instance light-dark() leak + the FourierField canvas-lifecycle under-adoption) + slice
`harden:encapsulation-close` (the SELECTIVE-land file-manifest hardening + the access-key-redaction promotion).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on FOUR falsifiable witnesses against the slides repo HEAD `f78f623` (branch
`deck/feedback-coder` — a Fourier-deck commit, NOT a til-briefing commit). The entire H til-briefing visual
pass exists ONLY as uncommitted working-tree state, the constellation paints an 86.3%-red splatter live, and
the e2e guards that would catch it were authored but never executed.

- **RED witness 1 (the H W2-W10 working-tree is UNCOMMITTED + stranded under 6 intervening commits — the
  recoverability blocker).** Verified live against the slides repo: `git branch --show-current` =
  `deck/feedback-coder`; `git log --oneline -1` = `f78f623` (a Fourier-DECK commit). `git status -s` shows
  **12 modified files** (`src/deck/DeckView.vue`, `src/decks/til-briefing/constellation.ts`,
  `src/decks/til-briefing/meta.ts`, `src/styles/deck.css`, and the 8 slide SFCs
  `Slide01/04/08/09/10/Conclusion/Nutrition/Xray.vue`) + **7 untracked e2e specs** (`tests/e2e/{complex-graphs,
  constellation-visibility,deck-progress,dedup-pulse,mobile-reflow,xray-portal}.spec.ts` + the untracked
  `docs/tranches/H/`). Only H.W1 (`97ce874` — the glass-ui 3.4.0 dock-consume) is committed; H W2-W10 (the
  ENTIRE deck visual-refinement pass) is dirty `M` state, buried UNDER `edc23e7` (the feedback-coder deck) + 5
  fourier commits (`8586539`…`f78f623`) that landed ON TOP. The falsifiable assertion: *`git -C
  ~/Programming/slides status --porcelain` returns ≥ 12 dirty/untracked entries AND `git branch --show-current`
  ≠ `tranche/AX-slides` (the branch does not exist).* RED: the dev work is non-recoverable — a `git stash` or a
  branch switch loses it; it is not on any clean reviewable branch.

- **RED witness 2 (the constellation paints an 86.3%-red splatter LIVE — the CARDINAL light-dark()-into-Canvas2D
  leak).** Verified at the source level: `constellation.ts:107` reads the neutral edge color via
  `this.cLine = readVar(c, "--foreground", "#1c1714")`. `--foreground` resolves to
  `light-dark(hsl(24 10% 10%), hsl(48 10% 90%))` — a `light-dark()` value Canvas2D SILENTLY REJECTS (an
  `ctx.strokeStyle = 'light-dark(...)'` assignment leaves `strokeStyle` UNCHANGED at its prior value). In
  `drawEdges` (`:259`) the stroke choice is `ctx.strokeStyle = red ? this.accentColor : this.cLine` — and the
  immediately-prior set value is the red `accentColor` (`#cc0000`) from any anomaly edge, so EVERY neutral edge
  paints RED. The audit measured it live on slide 1 (`?freeze&light`, 1512×862): **red = 15,492 px vs neutral =
  2,353 px (6.6:1 red), 86.3% of painted constellation pixels strong red, 8,544 red pixels > 200px from the
  anomaly anchor** — a RED SPLATTER, not a neutral lattice. H.W4 promoted `--constellation-node/-node-dim/-accent`
  to plain-hex PRECISELY because "Canvas2D rejects light-dark()" but LEFT `cLine` reading raw `--foreground` —
  the single most voluminous element (every inter-node edge). The falsifiable assertion: *`grep -n
  '\-\-foreground' src/decks/til-briefing/constellation.ts` returns the `cLine` read at `:107` AND a live
  pixel histogram on slide 1 measures red > neutral.* RED: the live lattice is a red splatter.

- **RED witness 3 (the e2e guards were AUTHORED but never EXECUTED — the cardinal headless-green/visually-broken
  gap, one tranche later in the consumer repo).** `tests/e2e/constellation-visibility.spec.ts` asserts
  `expect(neutral).toBeGreaterThan(red * 2)` — but the live render is the INVERSE (red 6.6× neutral), so the
  test WOULD FAIL. PROGRESS.md admits it verbatim: *"the e2e specs are authored but NOT executed in this dev
  pass."* The 7 specs are untracked (`??`) with no run record. The spec's sibling "no light-dark in canvas
  tokens" assertion (`:88`) checks only the `--constellation-*` tokens, NOT `--foreground` (which `cLine`
  reads) — the discipline check has a HOLE exactly where the bug lives; the spec's anchor cites x=0.62/0.72
  while the live code uses 0.60 (`Slide01.vue:14` data-anomaly=0.60,0.36) — further proof it was authored from
  the spec, not the render. The falsifiable assertion: *no slides `npm run audit` execution record exists for
  the 7 specs AND running `constellation-visibility.spec.ts` against the live `--foreground`-leak code FAILS
  the `neutral > red*2` assertion.* RED: every H visual wave "closed" on an unrun spec.

- **RED witness 4 (a SECOND identical light-dark()-into-Canvas2D instance exists on the active branch — the
  leak is NOT one site).** `FourierField.vue:223-250` (the net-new feedback-coder deck, ENTIRELY absent from
  the charter until the CONVERGE pass) hand-rolls a `readStroke()` probe-span workaround for the SAME root
  cause — it appends a hidden `<span style="color:var(<token>)">` inside the `.slide.fcm` ancestor, reads back
  `getComputedStyle(probe).color` (a canvas-valid `rgb()`), and removes the probe. So slides carries (a) a
  BUGGY direct read (`constellation.ts:107`) AND (b) a CLEVER-BUT-BESPOKE probe workaround
  (`FourierField.vue`) for the identical light-dark()-Canvas2D rejection — two divergent treatments of ONE
  defect class, neither sharing a token nor a helper. The falsifiable assertion: *`grep -rn
  'light-dark\|getComputedStyle.*color\|probe' src/decks/feedback-coder/components/FourierField.vue` returns
  the `:223-250` probe AND it is UNRELATED to the constellation's direct `--foreground` read.* RED: the
  Canvas2D-color-resolution discipline is NOT generalized — two consumers, two divergent ad-hoc paths.

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN (the clean-branch SELECTIVE land
+ the `--constellation-edge` plain-hsl token + a fail-loud `readCanvasColor` guard + the executed all-7 e2e
specs + the tightened constellation guard) under an EXECUTED live render-matrix audit.

---

## Goal

Land the stranded H W2-W10 til-briefing working-tree on a clean `tranche/AX-slides` branch, fix the
constellation `--foreground` light-dark()-into-Canvas2D leak at its root with a plain-hsl `--constellation-edge`
token + a fail-loud `readCanvasColor` guard, and EXECUTE all 7 authored e2e specs across the render matrix —
converting every H "green-but-unrun" claim into a live-verified visual-truth verdict on a known-good base.

---

## Scope (the gestalt fix — clean-branch recoverability, the root-cause Canvas2D fix, executed visual truth; no workaround)

The audit's findings converge on one architectural truth: the H tranche reproduced the EXACT cardinal AX
failure (a green-claim never run against the live product) inside the consumer repo — and its single most
visible symptom is a one-line light-dark()-into-Canvas2D leak that H.W4 patched everywhere EXCEPT the most
voluminous element. This wave is the slides BASELINE: it makes the dev work recoverable, fixes the leak at its
root (not a workaround), and executes the discipline that should have closed H. It builds NOTHING on
uncommitted/unverified state.

### 1. SELECTIVE clean-branch land — the recoverability precondition (slice 28 F6; hist:slides; harden SELECTIVE-land)

The H working-tree is NOT clean uncommitted state on branch HEAD — it is 12 dirty files + 7 untracked specs
buried UNDER `edc23e7` (the feedback-coder deck) + 5 fourier commits on `deck/feedback-coder`. The orchestrator
(who owns the index — agents stay read-only per the hardened agent git clause) executes a SELECTIVE land:

1. **Capture H's W2-W10 working-tree FIRST** (snapshot the exact 12 modified files + the 7 untracked specs).
   The til-briefing slide files carry BOTH H's uncommitted edits AND the committed feedback-coder/G history —
   capture is by FILE PATH, not a blanket stash that would sweep in the feedback-coder WIP.
2. **Land ONLY the til-briefing manifest** onto a clean `tranche/AX-slides` branch — the EXACT files (the
   harden lane's load-bearing recoverability step): `src/deck/DeckView.vue`, `src/decks/til-briefing/{constellation.ts,
   meta.ts}`, `src/styles/deck.css`, the 8 `src/decks/til-briefing/slides/*.vue`, and the 7
   `tests/e2e/*.spec.ts`. **Leave the feedback-coder deck WIP UNTOUCHED on its branch** — the chronic block
   named in MEMORY (`slides deploy blocked by feedback-coder WIP deck`); landing the H tree must NOT clobber
   or strand the unrelated fourier WIP. State the file manifest IN the wave spec so the orchestrator's
   selective commit cannot accidentally sweep in or strand the unrelated deck.
3. **Decide + RECORD the feedback-coder/fourier deck disposition** relative to the H land (deploys vs
   user-WIP-read-only vs live second deck) in `coordination/CONSTELLATION.md` — the second deck is a NET-NEW
   product (5 commits + `FourierField.vue` + its DESIGN/AUDIT corpus) the charter had zero coverage of;
   enumerate BOTH decks in the L band so neither is lost.

Adopt bbnf's **sibling-baseline-capture ritual** (snapshot the slides HEAD + `git status --porcelain` BEFORE
any cross-repo edit; reconcile at close) so the chronic dirty-tree wall is a recorded delta, not a silent
stall.

### 2. The constellation light-dark()-into-Canvas2D ROOT-CAUSE fix (slice 29 F0 — the CARDINAL blocker)

Promote the neutral edge color OFF raw `--foreground` (a `light-dark()` value Canvas2D rejects) onto a
Canvas2D-safe plain-hsl token, exactly as H.W4 did for the node tokens:

- **Add `--constellation-edge`** (plain-hsl, NEVER `light-dark()`) to `deck.css` §1 (the light arm) and §10
  (`:root.dark .deck`, the dark arm), matching the H.W4 node-token pattern — the LIGHT arm is the ink hairline
  (`#1c1917`-class), the DARK arm is the cream hairline (the lifted-off-the-ink value, so the lattice reads on
  the dark bookends). This is the COMPLEMENT of the library-side `--constellation-line` plain-hsl token AX.W17
  ships — slides reads its own deck-scoped `--constellation-edge` value; the W17 library token is the
  fallback/default a consumer dropping in `<Constellation>` inherits.
- **Change `constellation.ts:107`** from `this.cLine = readVar(c, "--foreground", "#1c1714")` to read
  `--constellation-edge` through the fail-loud resolver below. This closes the LAST light-dark()-into-Canvas2D
  leak so the neutral lattice paints its intended ink/cream hairline and the red anomaly is the single focal
  event.
- **Add a fail-loud `readCanvasColor(c, cssVar, fallback)` helper in `constellation.ts`** (the architectural
  gestalt the audit names — fail-loud per §0): it reads the token and THROWS on any `light-dark(` value (a
  library-internal contract violation per the fail-explicit precept — a slides-DEV defect that must fail
  loudly, NOT a befitting-silent browser-API degradation). Route ALL of the constellation's `readVar` color
  reads (`cNode`/`cNodeDim`/`cLine`/`accentColor`) through it so this class can NEVER silently recur. This is
  the one-path Canvas2D-color discipline: a plain-hex/hsl assertion at the read, not a per-site workaround.

**RATIFY-BEFORE-IMPL — the Canvas2D-color-resolution disposition (the TWO-instance leak; hist:slides +
idiom:slides).** The leak has TWO instances (constellation.ts:107 direct read AND FourierField.vue:231-250
probe-span). There are two paths to the unified fix:

- **(A) PLAIN-HSL TOKENS** — `--constellation-edge` for the constellation + plain-hsl `--viz-fourier`/`--viz-chebyshev`
  tokens for FourierField, so neither reads `light-dark()` into canvas at all (the W17 library precept extended
  to the deck). This is the SIMPLER, one-path-token answer — no runtime probe, no getComputedStyle reflow.
- **(B) SHARED `resolveCanvasColor(cssVar, el)`** — adopt FourierField's probe-span `getComputedStyle()`
  resolution as the shared helper (it ALREADY solves the exact defect live; AUDIT-FOURIER-v2 confirms it
  resolves to clean oklch, not a light-dark string), generalizing to ANY light-dark() token in canvas. This is
  a candidate for the AX.W37 `useCanvas2D` substrate (`resolveCanvasColor`) — a 2D consumer reaching the same
  resolver the WebGL substrate gets.

**RECOMMENDED (RATIFY-BEFORE-IMPL):** **(A) the plain-hsl token path for W30's REQUIRED scope** — it is the
KISS one-path fix that clears the blocker without a runtime probe, and it matches the W17 library precept
(plain-hsl `--constellation-*` tokens, NEVER `light-dark()` into canvas). W30 ships `--constellation-edge`
(REQUIRED) + the fail-loud `readCanvasColor` guard (REQUIRED). The FourierField probe → shared
`resolveCanvasColor` consolidation (B) is the CLEANER long-run gestalt but is the AX.W37 substrate's province
(a glass-ui-side wave shipping `resolveCanvasColor` on `useCanvas2D`); W30 RECORDS the FourierField probe as
the second consumer that justifies the W37 substrate (the ≥2-consumer math: constellation + FourierField) and
flags it in `coordination/CONSTELLATION.md`, but does NOT itself author a shared cross-deck helper (the
feedback-coder deck stays untouched per §1). Plain-hsl tokens for the constellation NOW; the shared resolver
is W37/W17-substrate work the two decks adopt later.

### 3. Execute ALL 7 H e2e specs + tighten the constellation guard (slice 29 F1; hist:slides all-7-execution)

Wire the 7 authored-but-never-run H specs (`constellation-visibility`, `mobile-reflow`, `xray-portal`,
`complex-graphs`, `deck-progress`, `dedup-pulse`, + the rebuilt deck.spec) into the EXECUTED slides `npm run
audit` set and RUN them across the render matrix (390×844 / 768×1024 / 1280×720 / the 1280 export frame, both
`?light` and `?dark`) — converting every H "done" claim from green-but-unrun to live-verified. The π-lane
visual-truth discipline (AX.W00) is BINDING on the slides repo, not only glass-ui.

**Tighten the constellation guard** (the discipline check that had a hole exactly where the bug lived):
- Count only meaningfully-OPAQUE pixels (**alpha-weighted**) so faint AA red can't game the `neutral > red*2`
  heuristic.
- **Include `--foreground` in the no-light-dark-in-canvas assertion** (the spec checked only `--constellation-*`
  tokens — the bug lived in the omitted `--foreground` read).
- **Reconcile the stale anchor** (0.62/0.72 → the live 0.60 per `Slide01.vue:14`) so the spec is authored from
  the render, not the spec.

### 4. Security hygiene — redact the leaked access key (slice 29 F8; harden access-key-promotion)

The live access key `wolfpack-ledger-2026` is leaked in PLAINTEXT across committed docs
(`docs/tranches/H/audit/slides-visual-digest.md:9,202,244,349`, `H.md:19`, E/F tranche docs). The standing
`grep wolfpack-ledger src/` → 0 rule holds for `src/`, but the docs leak the live key. W30 — the FIRST wave to
touch the slides repo — is the natural place to redact-or-rotate BEFORE any further commit propagates the leak
(the harden lane's promotion: routing it as a minor tail of the W31 content wave under-prioritizes a security
item). Redact to a placeholder `<ACCESS_KEY>` + a pointer to the gitignored `.env`; since til-briefing is now
public (`meta.softGated:false`) the key is unused — but the leak must not persist; if genuinely retired,
ROTATE it, don't just redact.

**Explicitly OUT of W30 scope (routes elsewhere):**
- The Slide04 hypothetical/what-if anomaly reframe + the ~$5M figure-clip + the homepage lock affordance + the
  access-key MODAL glass restyle + the mobile-reflow content guards + the dead `SlideNutrition.vue` excision →
  **AX.W31** (the slides content reframe wave; W30 LANDS the working tree those changes sit on + executes the
  guards, W31 authors the content).
- The `reveal.ts`/`useCountup.ts` → glass-ui `vReveal`/`useCountup` motion adoption + the LabeledField error
  pattern + the deploy verification (pptx-200 + CSP frame-src) → **AX.W32** (the slides motion/form adoption
  wave; note `vReveal` is ALREADY in 3.4.0 so its adoption is live-unblocked against the current pin, while
  `useCountup`/`DeckProgress` require the AX bump — split the adoption surface by availability there).
- The LIBRARY-side `--constellation-line` plain-hsl token + the focal-node/`warpTo`/`warpOnClick` seam +
  `readPalette` full-set → **AX.W17** (the glass-ui constellation wave; W30 READS W17's library token + the
  focal/warp seam to delete the slides 510-line `constellation.ts` down to a thin `<Constellation :draw-overlay>`
  wrapper — that DELETION is W17's adoption leg routed here, GATED on the AX cut PUBLISHING per §4 note 12).
- The `useCanvas2D`/`useCanvasLifecycle`/`resolveCanvasColor` substrate authoring → **AX.W37** (W30 records
  the FourierField probe as consumer #2 for that substrate; it does not author the resolver).
- The slides Lighthouse arm (the unrun H.W11) + the feedback-coder deck deep tracking → **AX.W32 deploy-verify
  + the coordination doc** (hist:slides flagged the missing slides-Lighthouse wave; W30 enumerates both decks,
  W32 owns the deploy/Lighthouse close).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

This is a SLIDES-repo wave (separate repo, tracked). glass-ui writes NO library `src/` in this wave; the
glass-ui-side artefacts are the coordination doc + the audit ledger ONLY.

| File (in `~/Programming/slides` unless noted) | Edit |
|------|------|
| `src/decks/til-briefing/constellation.ts` | Change `:107` `cLine` read from `--foreground` to `--constellation-edge`; ADD the fail-loud `readCanvasColor(c, cssVar, fallback)` helper (throws on any `light-dark(` value); route all color `readVar` reads (`cNode`/`cNodeDim`/`cLine`/`accentColor`) through it. (This file is ALREADY dirty `M` from H — the land in §1 captures the H edits FIRST, then this wave's edits layer on the landed base.) |
| `src/styles/deck.css` | ADD `--constellation-edge` (plain-hsl) to §1 (light arm) + §10 (`:root.dark .deck`, dark arm). (ALREADY dirty `M` from H — land first.) |
| `tests/e2e/constellation-visibility.spec.ts` | TIGHTEN: alpha-weight the pixel count; ADD `--foreground` to the no-light-dark-in-canvas assertion; reconcile the stale 0.62/0.72 anchor → 0.60. (Untracked `??` from H — land first.) |
| `package.json` (slides) + `npm run audit` script | Wire the 7 e2e specs into the EXECUTED `audit` set (the spec exists; the runner wiring is the gate registration). |
| `docs/tranches/H/audit/slides-visual-digest.md`, `docs/tranches/H/H.md`, the E/F tranche docs leaking the key | REDACT `wolfpack-ledger-2026` → `<ACCESS_KEY>` + a pointer to the gitignored `.env` (or rotate). |
| `~/Programming/glass-ui/coordination/CONSTELLATION.md` (glass-ui side) | **NEW** — the cross-repo coordination doc: the slides HEAD + branch + `git status --porcelain` sibling-baseline; the SELECTIVE-land file manifest; the feedback-coder/fourier deck disposition; the BOTH-decks L-band enumeration; the writer-vs-reader boundary (glass-ui owns the W17 library token; slides owns the deck read); the AX-publish gate for the W17 adoption leg; the FourierField-probe-as-W37-consumer-#2 note. |
| `~/Programming/glass-ui/docs/tranches/AX/audit/W30-slides-baseline.json` (glass-ui side) | **NEW** — the wave's born-RED→GREEN audit artefact + the SELECTIVE-land manifest + the executed-e2e verdicts + the live render-matrix BEFORE/AFTER + the RATIFY record (plain-hsl token path A). |

**OUT of bounds:** any `src/decks/feedback-coder/**` file (the fourier deck WIP stays UNTOUCHED on its branch
— the load-bearing recoverability constraint); the Slide04/lock/modal/SlideNutrition CONTENT changes (**AX.W31**);
the `reveal.ts`/`useCountup.ts`/deploy adoption (**AX.W32**); any glass-ui library `src/` (the
`--constellation-line` token + focal/warp seam are **AX.W17**, the `resolveCanvasColor` substrate is **AX.W37**
— glass-ui writes no library source in this slides wave); the W17 `Constellation.vue`/`constellationField.ts`
(W30 READS the W17 seam, it does not author it).

---

## Disjointness (sibling waves it must NOT overlap)

W30 is the FIRST wave in band L (SLIDES); it dependsOn AX.W17 + AX.W00 and is the predecessor of W31 + W32.
The disjointness contract:

- **vs AX.W17 (the library-side constellation seam) — SEQUENTIAL + REPO-DISJOINT.** W17 owns the LIBRARY-side
  `--constellation-line` plain-hsl token + `readPalette` full-set + the focal-node/`warpTo`/`warpOnClick` seam
  (`glass-ui/src`). W30 owns the SLIDES-side `--constellation-edge` deck token + the `:107` leak fix + the
  fail-loud `readCanvasColor` guard + (the W17 adoption leg, GATED on publish) the 510-line `constellation.ts`
  deletion onto a thin `<Constellation :draw-overlay>` wrapper. The shared SEMANTIC surface is the Canvas2D-safe
  plain-hsl edge color (W17 ships the library default `--constellation-line`; W30 ships the deck-scoped
  `--constellation-edge` + reads it). **NO shared FILE — different repos.** The W17 adoption is gated on the AX
  cut PUBLISHING (§4 note 12 — slides MEASURED published 3.6.0 which ships NO `/constellation`); coordinate via
  `coordination/CONSTELLATION.md`.

- **vs AX.W00 (the π lane) — SEQUENTIAL (dependsOn).** W00 codifies the π visual-runtime discipline + the
  live-re-diagnosis wave-open ritual + the paired-π BEFORE/AFTER + DELTA close protocol. W30 RUNS its executed
  e2e + live render-matrix audit UNDER that discipline (declared binding on the slides repo). The slides e2e
  runner is the slides repo's OWN `npm run audit` (slides ships no `proof:*` runner — H.md confirms); W00's
  `tests-visual/` workspace is a glass-ui workspace. DISJOINT by repo + file; W30 inherits the DISCIPLINE, not
  W00's spec files.

- **vs AX.W31 (slides content reframe) — SEQUENTIAL (W31 dependsOn W30).** W30 LANDS the working tree + fixes
  the constellation leak + executes the guards (the known-good BASE); W31 authors the CONTENT (Slide04 reframe,
  $5M clip, lock affordance, modal restyle, mobile content guards, SlideNutrition excision) ON that base.
  Shared FILES (the slide SFCs + deck.css are dirty for both) but SEQUENTIAL — W30 lands them, W31 edits the
  landed versions. No concurrent write: W31 cannot start until W30's clean-branch land is GREEN (the §0 mandate
  — no content wave builds on uncommitted/unverified state).

- **vs AX.W32 (slides motion + form adoption) — SEQUENTIAL (W32 dependsOn W31 + W24).** W32 owns the
  `reveal.ts`/`useCountup.ts`/`DeckProgress` adoption + deploy verification + the slides Lighthouse arm.
  DISJOINT by file (motion composables + DeckSettings, not the constellation or the slide content). W32 is
  gated on the AX PUBLISH for `useCountup`/`DeckProgress` (`vReveal` is already in 3.4.0).

- **vs the feedback-coder/fourier deck (NOT a wave — a live WIP on the branch).** The ONE hard
  collision-avoidance: W30 must NOT touch `src/decks/feedback-coder/**`. The SELECTIVE land by file manifest
  (§1) is the mechanism: the orchestrator commits ONLY the 12 til-briefing files + 7 specs, leaving the
  fourier WIP on `deck/feedback-coder`. Get this wrong and either the H work or the feedback-coder WIP is lost
  (the harden lane's load-bearing warning).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

This is a slides-repo wave; the orchestrator owns the index (the SELECTIVE land + commits); agents stay
read-only on git per the hardened agent git clause (K W0).

- **Implement (≤1 agent — the constellation leak fix + the deck token + the spec tightening + the doc
  redaction; the orchestrator does the SELECTIVE land).** Add `--constellation-edge` (plain-hsl, light + dark
  arms) to `deck.css`; change `constellation.ts:107` to read it via the new fail-loud `readCanvasColor` helper;
  route all constellation color reads through the helper. Tighten `constellation-visibility.spec.ts`
  (alpha-weight + `--foreground` in the no-light-dark assertion + the 0.60 anchor). Wire the 7 specs into the
  executed `npm run audit`. Redact the leaked key. Lint + typecheck at every interval. (The orchestrator —
  NOT this agent — executes the SELECTIVE clean-branch land of the 12 H files + 7 specs onto `tranche/AX-slides`
  BEFORE the agent's edits, so the edits layer on the landed base. The agent writes NO `src/decks/feedback-coder/**`.)
- **Adversarially-verify (≤1 read-only lane).** (a) Re-runs the four RED witnesses on the patched + landed
  tree: the working tree is on `tranche/AX-slides` (not `deck/feedback-coder`) and the 12 til-briefing files +
  7 specs are committed; `constellation.ts:107` no longer reads `--foreground` (it reads `--constellation-edge`
  through `readCanvasColor`); the live slide-1 pixel histogram measures neutral > red (the splatter is gone);
  the 7 specs RUN and PASS. ADVERSARIAL twists: (i) confirms `readCanvasColor` THROWS on a synthetic
  `light-dark()` token (the fail-loud guard is honest — feed it `--foreground` and it must throw, not silently
  fall through); (ii) confirms the feedback-coder deck files are UNTOUCHED (`git diff` on
  `src/decks/feedback-coder/**` = empty — the SELECTIVE land did not sweep or strand the fourier WIP); (iii)
  confirms the tightened `constellation-visibility.spec.ts` would FAIL on the OLD `--foreground`-leak code (the
  guard actually bites — revert the fix, run the spec, it reds); (iv) confirms the leaked key is gone from the
  committed docs (`grep -rn wolfpack-ledger-2026 docs/` = 0 in the landed tree); (v) confirms the
  `--constellation-edge` token is PLAIN-hsl (no `light-dark(` substring) in BOTH the light and dark arms.
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors the tightened `constellation-visibility.spec.ts`
  assertion (alpha-weighted neutral > red×2 + `--foreground` in the no-light-dark-in-canvas check) + the
  executed-all-7-specs audit-set wiring; confirms the assertion FAILS at the pre-wave `--foreground`-leak tree
  and PASSES on the patched tree. Registers the 7 specs in the slides `npm run audit` runner.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / executed-test gate — born-RED→GREEN (in the slides `npm run audit` set).**

- **The clean-branch SELECTIVE-land proof (born-RED — a deletion/recoverability artefact).** Assert the 12
  til-briefing files + the 7 e2e specs are COMMITTED on a clean `tranche/AX-slides` branch (`git log` shows the
  land commit; `git status --porcelain` on those paths is clean) AND `src/decks/feedback-coder/**` is UNTOUCHED
  (the fourier WIP preserved). **Born-RED at HEAD** (the branch does not exist; the files are dirty `M`/`??` on
  `deck/feedback-coder`). This is an explicit-document-reconciliation + deletion-proof artefact (an accepted
  SPEC.md §Hard-Gates form — a git-state observation, NOT a grep-for-runtime-behaviour).

- **The tightened `constellation-visibility` e2e spec (born-RED — EXECUTED, the constellation leak gate).**
  Runs against the LIVE deck: render slide 1, measure the alpha-weighted painted-constellation pixel histogram,
  assert **neutral > red × 2** (the lattice reads as a neutral web, NOT a red splatter), AND assert no
  `--constellation-*` token NOR `--foreground` carries a `light-dark(` value read into a Canvas2D stroke/fill.
  **Born-RED at HEAD** (the live render is red 6.6× neutral — the spec, when actually RUN, FAILS on the
  `--foreground` leak). This is a **runtime-observation** artefact (a real browser render + per-pixel readback,
  the precept-valid form — NOT a grep for a source string).

- **The fail-loud `readCanvasColor` guard (born-RED — a throw-on-violation runtime assertion).** A unit/e2e
  assertion that `readCanvasColor` THROWS when fed a `light-dark()` value (the library-internal contract
  violation fails LOUDLY per the fail-explicit precept — a slides-DEV defect, not a befitting-silent
  browser-API degradation). **Born-RED at HEAD** (no `readCanvasColor` helper exists; `cLine` silently absorbs
  the rejected `--foreground`). Runtime-observation artefact.

- **The all-7-specs executed-audit gate (born-RED — the discipline gate).** All 7 H specs
  (`constellation-visibility`, `mobile-reflow`, `xray-portal`, `complex-graphs`, `deck-progress`,
  `dedup-pulse`, deck.spec) are wired into the EXECUTED slides `npm run audit` and RUN GREEN across the render
  matrix. **Born-RED at HEAD** (the specs are untracked `??` with no run record; PROGRESS.md admits they were
  never executed). Test-output artefact.

This is a **git-state + runtime-observation + test-output** gate quartet (the precept-valid artefact forms per
SPEC.md §Hard Gates), NOT a "grep found a source string for runtime behaviour" invalid form: the land proof is
a git-state observation, the constellation + readCanvasColor gates are real browser renders + readbacks, the
all-7 gate is executed test output.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** An EXECUTED live
Playwright + frontend-design pass across the slides render matrix — **390×844 / 768×1024 / 1280×720 / the 1280
export frame**, both `?light` and `?dark`:

- **The constellation reads as a NEUTRAL lattice with ONE red anomaly** on cream AND ink — NOT the 86.3%-red
  splatter (the §3.gestaltFix ask + the §4.2 ask: the neutral web with the single red focal event). The neutral
  edge hairlines paint their intended ink/cream tone; the red anomaly is the ONLY red.
- **BOTH decks preserved** — the feedback-coder/fourier deck still boots and renders (the SELECTIVE land did
  not break it); the til-briefing deck boots public.
- **The 7 e2e specs PASS live** — the xray window flex-fills the column with no dead band, the graph
  aspect-ratios clear ≥80px, the mobile markers thread their spine ≥32px, the dedup pulse de-dups — converting
  every H "done" claim to a live-verified verdict.
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the executed e2e gate alone** — the live render-matrix audit (captured as a
paired-π BEFORE/AFTER + DELTA artefact per the W00 protocol: the 86.3%-red-splatter BEFORE vs the neutral
lattice + single-red-anomaly AFTER, at the 4 frames × light/dark) is the binding close criterion. A green spec
proves the heuristic; only the executed live audit proves the lattice reads as a neutral web and both decks
survive the land. (The H tranche's cardinal failure was a green-but-unrun spec — W30 must not repeat it.)

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual + sibling-baseline capture (W00 wave-open).** Re-confirm the four RED witnesses
   against the slides HEAD: `git -C ~/Programming/slides status --porcelain` shows the 12 dirty + 7 untracked;
   branch = `deck/feedback-coder`, HEAD `f78f623` (a fourier commit); `constellation.ts:107` reads
   `--foreground`; a live slide-1 pixel histogram measures red > neutral; the 7 specs have no run record.
   Record the slides HEAD + `git status --porcelain` as the sibling-baseline in `coordination/CONSTELLATION.md`.
   Do NOT proceed on the audit's word — re-prove the splatter live.
2. **RATIFY the Canvas2D-color-resolution disposition (RATIFY-BEFORE-IMPL).** The orchestrator confirms path
   (A) — plain-hsl `--constellation-edge` token + fail-loud `readCanvasColor` guard for W30's REQUIRED scope —
   over the shared-`resolveCanvasColor` path (B), which is AX.W37 substrate work. Record the ratification + the
   FourierField-probe-as-W37-consumer-#2 note in `coordination/CONSTELLATION.md` + the audit ledger.
3. **The orchestrator executes the SELECTIVE clean-branch land** (the index is the orchestrator's). Capture the
   exact 12 til-briefing files + 7 specs; create `tranche/AX-slides`; commit ONLY that manifest; leave
   `src/decks/feedback-coder/**` untouched. Record + decide the feedback-coder/fourier deck disposition. (Agents
   stay read-only on git.)
4. **Fix the constellation leak.** Add `--constellation-edge` (plain-hsl light + dark arms) to `deck.css` §1 +
   §10; add the fail-loud `readCanvasColor` helper to `constellation.ts`; change `:107` to read
   `--constellation-edge` through it; route all color reads through the guard. Lint + typecheck.
5. **Tighten the constellation guard + wire the all-7 audit.** Alpha-weight the pixel count in
   `constellation-visibility.spec.ts`; add `--foreground` to the no-light-dark assertion; reconcile the anchor
   to 0.60. Wire all 7 specs into the executed `npm run audit`. Confirm the tightened spec FAILS on the
   pre-wave `--foreground`-leak code and PASSES on the patched tree.
6. **Redact the leaked access key** across the committed docs (digest, H.md, E/F docs) → `<ACCESS_KEY>` + a
   pointer to the gitignored `.env`; rotate if genuinely retired.
7. **Gate GREEN + VISUAL-TRUTH.** Run the 7 specs across the render matrix; run the live Playwright +
   frontend-design audit (neutral lattice + single red anomaly on cream + ink; both decks preserved; the
   xray/graph/marker/dedup specs PASS live) at the 4 frames × light/dark; capture the paired-π BEFORE/AFTER +
   DELTA (the 86.3%-red splatter BEFORE vs the neutral lattice AFTER); write `W30-slides-baseline.json` GREEN.
8. **Hand off to AX.W31 (the content reframe) + record the publish gate.** Record in
   `coordination/CONSTELLATION.md` that the H tree is landed + the constellation leak is fixed + the guards are
   executed (the known-good base); W31 builds the content reframe on it. Note the W17 adoption leg (the
   `constellation.ts` 510-line deletion onto `<Constellation :draw-overlay>`) is gated on the AX cut PUBLISHING
   (§4 note 12 — slides dev-resolves the published line; 3.6.0 ships no `/constellation`).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W30-slides-baseline.json` (glass-ui side) — the born-RED→GREEN ledger: the four RED
  witnesses (the stranded-uncommitted-under-6-commits git state, the `constellation.ts:107` `--foreground`
  leak + the measured 86.3%-red splatter, the authored-but-unrun 7 specs, the second FourierField probe
  instance), the RATIFY record (path A plain-hsl token over path B shared resolver), the SELECTIVE-land file
  manifest (the exact 12 + 7) with the feedback-coder-untouched proof, the per-finding (slice 29 F6 + slice 30
  F0/F1 + the hist:slides/idiom:slides/harden refinements) disposition with the OUT-of-scope routes (W31
  content / W32 motion+deploy / W17 library seam / W37 substrate), and the post-wave GREEN measurements (the
  neutral-lattice pixel histogram, the executed-7-specs verdicts, the readCanvasColor throw-on-light-dark
  proof, the key-redaction grep-0).
- `coordination/CONSTELLATION.md` (glass-ui side) — the cross-repo coordination doc (REQUIRED per §0 — AX has
  the three triggers; this wave is the slides-band entry): the slides HEAD + branch + `git status --porcelain`
  sibling-baseline at coordination time, the SELECTIVE-land manifest, BOTH decks enumerated (til-briefing +
  feedback-coder) with the fourier deck's disposition, the writer-vs-reader boundary (glass-ui owns the W17
  library `--constellation-line` token; slides owns the `--constellation-edge` deck read), the AX-publish gate
  for the W17 adoption leg, the FourierField-probe-as-W37-consumer-#2 note, and the conflict-resolution
  protocol (the SELECTIVE land leaves the fourier WIP untouched).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the 86.3%-red-splatter BEFORE vs the
  neutral lattice + single-red-anomaly AFTER, at the 4 render-matrix frames × light/dark, on cream + ink.
- The EXECUTED 7-spec run record (the slides `npm run audit` output — the discipline gate's evidence that
  converts every H "green-but-unrun" to live-verified) + the tightened `constellation-visibility.spec.ts`.

---

## CommitPlan (conventional-commit messages, one per sub-step — in the SLIDES repo unless noted)

1. `chore(slides): SELECTIVE-land H W2-W10 til-briefing working-tree onto tranche/AX-slides (12 files + 7 e2e specs; feedback-coder WIP untouched) (AX.W30 slice29-F6)`
2. `fix(constellation): --constellation-edge plain-hsl token (light+dark arms) — close the --foreground light-dark()-into-Canvas2D leak (AX.W30 slice30-F0)`
3. `feat(constellation): fail-loud readCanvasColor guard — throw on any light-dark() value, route all color reads through it (AX.W30 §0-fail-explicit)`
4. `test(slides): tighten constellation-visibility (alpha-weighted neutral>red×2 + --foreground in no-light-dark assertion + 0.60 anchor) + wire all 7 H specs into npm run audit (AX.W30 slice30-F1)`
5. `chore(slides): redact the leaked access key wolfpack-ledger-2026 from committed docs → <ACCESS_KEY> + .env pointer (AX.W30 slice30-F8)`
6. `docs(AX): W30 close — coordination/CONSTELLATION.md sibling-baseline + both-decks ledger + the RATIFY record + W30-slides-baseline.json GREEN + paired-π BEFORE/AFTER + DELTA (glass-ui side)`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash/branch
per the hardened agent git clause, K W0. Commits 1-5 land in the SLIDES repo on `tranche/AX-slides`; commit 6
lands the glass-ui-side coordination + audit artefacts. The W17 adoption leg — the `constellation.ts` 510-line
deletion onto `<Constellation :draw-overlay>` — is a SEPARATE later slides commit GATED on the AX publish.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W17 (the library-side constellation seam) — HARD (the charter §3 `### AX.W30` header declares
  `dependsOn AX.W17`).** W17 ships the LIBRARY `--constellation-line` plain-hsl token + `readPalette` full-set
  + the focal-node/`warpTo`/`warpOnClick` seam that the slides `constellation.ts` 510-line DELETION (the W17
  adoption leg routed here) reads — the drift+warp cannot move through a read-only overlay, so the deletion is
  CONTINGENT on the focal/warp seam landing in W17. The W30 REQUIRED scope (the `--constellation-edge` deck
  token + the leak fix + the executed guards) does NOT itself need W17 to LAND the H tree or fix the leak — but
  the charter sequences W30 after W17 so the slides port (the deletion onto the thin wrapper) is unblocked, and
  that port is GATED on the AX cut PUBLISHING (§4 note 12 — slides MEASURED published 3.6.0 which ships NO
  `/constellation`; the seam is at-HEAD-only until the AX publish).
- **AX.W00 (the π visual-runtime lane) — HARD (implicit; §2b makes π binding on the consumer repo).** W00
  codifies the executed-visual-truth discipline + the live-re-diagnosis wave-open ritual + the paired-π
  BEFORE/AFTER + DELTA close protocol. W30's close is an EXECUTED live render-matrix audit (not the authored-spec
  claim that sank H) — that discipline is W00's, declared binding on the slides repo (hist:slides: "the π-lane
  visual-truth discipline must be declared binding on the slides repo, not only glass-ui").
- **Downstream (NOT a W30 dependsOn — W30 is the predecessor):** **AX.W31** dependsOn AX.W30 (the content
  reframe builds on the landed + leak-fixed + guard-executed BASE — no content wave builds on
  uncommitted/unverified state); **AX.W32** dependsOn AX.W31 + AX.W24 (motion + form adoption + deploy verify).
- **Coordinate (NOT a hard dependency):** **AX.W37** ships `useCanvas2D`/`resolveCanvasColor` — W30 records the
  FourierField probe as that substrate's consumer #2 (the ≥2-consumer math) but does NOT author the resolver;
  the shared-helper consolidation (path B) is W37/W17-substrate work the two decks adopt later.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **slides `f78f623`** (the slides HEAD at audit time — a Fourier-DECK commit, branch `deck/feedback-coder`) —
  the live-verified evidence that the H til-briefing work is stranded: the branch moved on to a DIFFERENT deck
  (the fourier deck, `edc23e7`…`f78f623`, 5 commits today) while the H W2-W10 til-briefing changes sit as dirty
  `M`/`??` working-tree state UNDER that stack. Re-proved live: `git status -s` returns the exact 12 modified +
  7 untracked manifest the audit names (`DeckView.vue` + `constellation.ts` + `meta.ts` + `deck.css` + the 8
  slide SFCs + the 7 `tests/e2e/*.spec.ts`).
- **slides `97ce874`** (H.W1 — the ONLY committed H wave: `feat(tranche-H): H.W1 consume glass-ui 3.4.0 — the
  AW dock-collapse fix`). H.W1 consumed only the dock-collapse fix; H W2-W10 (the deck visual-refinement pass)
  was left dirty for orchestrator commit/verify, then the branch advanced to the feedback-coder deck — the
  exact headless-green/visually-broken GAP the AX mandate (§0, §13) names the cardinal lesson.
- **The H.W4 visibility tuning** (slides `constellation.ts:100-112` + `deck.css` §1/§10) — H.W4 promoted
  `--constellation-node/-node-dim/-accent` + the edge-alpha MULTIPLIERS to plain-hex tokens PRECISELY because
  "Canvas2D rejects light-dark()" (the comment at `:104` says "PLAIN-HEX only (Canvas2D)") — but LEFT `cLine`
  at `:107` reading raw `--foreground`, the single most voluminous element (every inter-node edge). The fix was
  INCOMPLETE: it patched the node fills + the anomaly accent + the alpha multipliers but missed the neutral edge
  STROKE color. W30 closes the last leak — the `--constellation-edge` plain-hsl token + the fail-loud guard.
- **The feedback-coder `FourierField.vue:223-250`** (the net-new fourier deck, `8586539`…`f78f623`) — ALREADY
  solves the EXACT Canvas2D light-dark() defect via a hidden probe-span `readStroke()`
  (`getComputedStyle(probe).color` → a canvas-valid `rgb()`). AUDIT-FOURIER-v2 confirms it resolves to clean
  oklch, not a light-dark string. This is the POSITIVE cross-pollination: the correct gestalt already
  implemented in the newer deck — the second consumer that justifies the AX.W37 `resolveCanvasColor` substrate,
  and the proof that the slides corpus had the answer (a GENUINELY-EXECUTED headless Playwright render audit, 9
  gates) the H til-briefing pass failed to apply.
- **§4 note 9 (the slides band is a SEPARATE REPO, folded for tracking).** Most §12 items are RESOLVED at the
  code level by tranches G + H but were NEVER browser-verified, and the H work is stranded as uncommitted state.
  W30 lands + executes; the genuinely-unaddressed content gap (the Slide04 hypothetical reframe) is W31.
- **§4 note 12 (publish-currency, not code).** slides MEASURED published 3.6.0 (it pins `^3.4.0`, resolves
  3.4.0); 3.6.0 ships NO `/constellation`. The W17 focal/warp seam + the `--constellation-line` library token
  are at-HEAD-only until the AX cut PUBLISHES. The W17 adoption leg (the slides `constellation.ts` 510-line
  deletion) is gated on the AX publish — W30's REQUIRED scope (land + leak-fix + executed guards) runs against
  the slides-local code TODAY; the library-seam adoption is the publish-gated tail.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-L (SLIDES) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **π visual-runtime binding on the CONSUMER repo (`instructions/tranche/SPEC.md §"The π visual-runtime lane"` —
  "binding for every tranche that ships visual changes"; ≥3 viewports, animation-timing samples,
  contrast-vs-background, per-story consumption sweep; the AW cardinal "Runtime Truth Beats Source Claims").**
  W30's close is an EXECUTED live Playwright + frontend-design render-matrix audit at 4 frames × light/dark
  (the constellation neutral lattice + both decks preserved + the 7 specs PASS live), NEVER the authored-spec
  claim that sank H. The H tranche reproduced the cardinal failure (a green-but-unrun spec) IN the consumer
  repo; W30 makes the π discipline binding here. MUST NOT close on a headless/authored gate alone.
- **one-path / no-legacy-code — Canvas2D-safe plain-hsl tokens, NEVER `light-dark()` into canvas (the band-L
  precept).** The fix is the ROOT-CAUSE one-path answer — a plain-hsl `--constellation-edge` token (light
  `:root` + dark `:root.dark .deck` arm) that Canvas2D accepts, NEVER `--foreground` (a `light-dark()` value
  Canvas2D silently rejects). NOT a workaround (no try/catch around the rejected assignment, no per-site patch).
  The fail-loud `readCanvasColor` guard makes the discipline a one-path invariant: any `light-dark()` read into
  canvas THROWS. MUST NOT introduce a `light-dark()` token read into a Canvas2D stroke/fill or a per-site
  workaround.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation
  (`instructions/README.md §Edicts`; SPEC.md §Hard-Gates "silent `console.warn` + return is an invalid hard
  gate").** The `readCanvasColor` guard THROWS on a `light-dark()` value — a DEV-side contract violation
  (a deck author passing the wrong token) fails LOUDLY, never silently absorbs the rejected assignment (the
  exact silent-failure that produced the 86.3%-red splatter). This is a library-internal-style violation (a
  slides-DEV defect), NOT a befitting-silent browser-API degradation — the two are never collapsed. MUST NOT
  ship a silent fall-through on a `light-dark()` read.
- **cross-repo coordination doc + sibling-baseline-capture + clean-branch landing (`instructions/tranche/SPEC.md`
  cross-repo coordination clause; the bbnf sibling-baseline ritual).** W30 authors `coordination/CONSTELLATION.md`
  (the three-trigger requirement is met: separate repo tracked + deferred cross-repo handoff + shared
  touchpoint) declaring the slides HEAD + branch + `git status --porcelain` sibling-baseline, the SELECTIVE-land
  manifest, the writer-vs-reader boundary, and the conflict-resolution protocol (the fourier WIP stays
  untouched). The SELECTIVE clean-branch land is the recoverability precondition. MUST NOT land the H tree
  without the coordination doc + the sibling-baseline snapshot, and MUST NOT clobber or strand the
  feedback-coder WIP.
- **substrate-with-consumer / wire-before-retire (precepts README "Substrate and consumer land together").**
  The W17 library `--constellation-line` token + focal/warp seam land WITH slides as consumer #2 — but the
  slides `constellation.ts` 510-line DELETION (the consumer adoption) is GATED on the AX publish (§4 note 12),
  so W30's REQUIRED scope is the slides-local leak fix on a known-good base; the publish-gated adoption tail is
  a SEQUENCED cross-repo handoff (recorded in the coordination doc), NOT a silent deferral. The FourierField
  probe is recorded as the W37 `resolveCanvasColor` substrate's consumer #2 (the ≥2-consumer math: constellation
  + FourierField). MUST NOT retire the slides duplication un-routed or ship a single-consumer substrate.
- **no-silent-deferrals (the W31 content + the W17 adoption + the W37 substrate are SEQUENCED, not "deferred to
  next tranche").** Every out-of-scope item is explicitly ROUTED with a named successor wave: the Slide04
  reframe + lock + modal → AX.W31; the motion/form/deploy → AX.W32; the `constellation.ts` deletion → the W17
  adoption leg (publish-gated); the shared `resolveCanvasColor` → AX.W37. MUST NOT close W30 leaving any item
  with a generic "future tranche" placeholder.
- **cross-repo-dev-resolution contract-v2 (`docs/precepts/cross-repo-dev-resolution.md` invariant 30; §4 note
  12).** slides dev-resolves the BUILT `dist/` of the published glass-ui line (3.6.0 ships no `/constellation`),
  so the W17 library-seam adoption is gated on the AX cut PUBLISHING — W30's REQUIRED scope runs against the
  slides-local code TODAY, the library-seam adoption is the publish-currency-gated tail. MUST NOT assume slides
  resolves the at-HEAD library seam before the AX publish.
- **security hygiene / key-isolation (the standing `grep wolfpack-ledger src/` → 0 rule).** The leaked key
  `wolfpack-ledger-2026` in committed DOCS is redacted-or-rotated in W30 (the first slides-repo wave) BEFORE any
  further commit propagates it. MUST NOT propagate the live key in a new commit.
