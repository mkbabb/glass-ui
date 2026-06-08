# AX.W30 — Slides baseline: cut tranche/AX-slides FORWARD + verify the committed H state + the merge-to-main → deploy terminal

**Band** L · SLIDES · **Severity** blocker · **dependsOn** AX.W17 (the library-side `--constellation-line`
plain-hsl token + the focal/warp seam this slides port reads — gated on the AX cut PUBLISHING per §4 note
12) + AX.W00 (the π visual-runtime discipline this wave's executed e2e + live render-matrix audit run under,
declared binding on the slides repo) + AX.W28 (the sole OPENER of `coordination/CONSTELLATION.md` band-K +
gate-0 — W30 EDIT/APPENDs the band-L section onto W28's doc, it does NOT create it) · *(separate repo, tracked
— glass-ui writes NO library source in this wave; the orchestrator commits the SLIDES tree)* · **Charter**
AX.md §3 (the `### AX.W30` block, lines 1503-1546) + §2b band-L precept row (π visual-runtime binding on the
consumer repo; cross-repo coordination + clean-branch landing; one-path Canvas2D plain-hsl;
substrate-with-consumer DeckProgress consumer #2) + §4 note 9 (the slides band is a SEPARATE REPO folded for
tracking; most §12 items are RESOLVED at the code level by G/H and — per the §24 reality — NOW committed +
browser-verified + deployed) + §4 note 12 (publish-currency: the slides adoption legs are at-HEAD-only until
the AX cut PUBLISHES) + §24 SHARED-STATE RECONCILE (the live slides state: `d79091e`, CLEAN, H committed, the
constellation leak fixed, the deck deployed) + the §3 `### AX.W17` block (lines 925-999, the LIBRARY-side
complement — the `--constellation-line` plain-hsl token W17 ships is what W30 reads slides-side) · **Audit**
`deep-audit-corpus.json` slice `slides-content` (index 28, finding F6 — the H working-tree, NOW committed at
`da173e7`/`b622ac7`/`fb2ad39`, the recoverability concern DISCHARGED) + slice `slides-visual-mobile` (index 29,
finding F0 the constellation `--foreground` light-dark()-into-Canvas2D leak — NOW fixed at
`constellation.ts:116` reading `--constellation-line` first + F1 the e2e specs, NOW committed + the two reds
fixed at source per `fb2ad39`) + `constellation-analysis-corpus.json` slice `hist:slides` (the FourierField
`resolveCanvasColor` adoption + the second `feedback-coder` deck enumeration) + slice `idiom:slides` (the
version-pin currency + the TWO-instance light-dark() leak class) + slice `harden:encapsulation-close` (the
branch-protocol forward-cut hardening + the access-key-redaction confirmation).

---

## State (born-RED — the gate must fail at HEAD before the wave; re-grounded to the §24 reality)

**The §24 SHARED-STATE re-ground (the live slides state, re-proved at this hardening pass).** The W30 born-RED
premise was authored against a stale slides HEAD (`f78f623`, the H working-tree uncommitted). The live slides
repo has since converged: HEAD `d79091e` (branch `deck/feedback-coder`), tree CLEAN (`git status --porcelain`
returns only the untracked `?? docs/tranches/J/` — a NEW tranche folder, NOT the H working-tree). The H
til-briefing visual pass is COMMITTED (`da173e7` "H.W2..W10 implementation", `b622ac7` "commit H e2e specs",
`fb2ad39` "I.W11 — fix the two e2e reds at the source"); the constellation `--foreground`
light-dark()-into-Canvas2D leak is FIXED (`constellation.ts:116` reads `--constellation-line` first —
`readVar(c, "--constellation-line", readVar(c, "--foreground", "#1c1714"))`; `--foreground` survives only as a
last-ditch fallback, and `deck.css` carries the plain-hex `--constellation-line` token in both arms — `#1c1815`
light, `#e8e6df` dark); the e2e specs are TRACKED (`git ls-files tests/e2e/` lists `constellation-visibility`,
`complex-graphs`, `deck-progress`, `dedup-pulse`, `deck.spec`, …); and the deck is DEPLOYED to production
(`9f08ded` "W10 LANDED — deck deployed to production", pinning the registry-published 3.7.0 at `15c1817`). The
three stranded-work + leak + unrun-spec witnesses (the prior W1-W3) are DISCHARGED-out-of-band per the §F.3
satisfied-witness rule — a satisfied witness is a scope-collapse, never a re-do. W30 does NOT re-land already-
committed work, does NOT re-fix the closed leak, does NOT re-author the committed specs.

The surviving RED is the BRANCH PROTOCOL + the unreachable deploy terminal: the H state is committed but it is
NOT on a clean reviewable `tranche/AX-slides` branch, and NOTHING merges the AX slides line onto `main` so the
`head_branch=='main'`-gated `deploy-pages.yml` fires for the AX cut. The wave is born-RED on TWO falsifiable
witnesses against the live slides repo HEAD `d79091e`.

- **RED witness 1 (the `tranche/AX-slides` branch does not exist — the H state is committed on
  `deck/feedback-coder`, NOT on the AX line).** The H til-briefing work is committed, but it rides on
  `deck/feedback-coder` alongside the unrelated fourier WIP — there is no clean `tranche/AX-slides` branch the
  AX slides band drives on. The branch protocol is the FORWARD CUT: cut `tranche/AX-slides` FORWARD from
  `deck/feedback-coder` (the committed H + I history is reachable from there — a forward branch carries it for
  free; no stash, no selective land, no recoverability risk, the feedback-coder fourier deck rides along
  untouched ON the same base). The falsifiable assertion: *`git -C ~/Programming/slides branch --list
  tranche/AX-slides` returns EMPTY at HEAD (the branch does not exist) AND `git branch --show-current` =
  `deck/feedback-coder`.* RED: the AX slides band has no clean branch to drive on.

- **RED witness 2 (the deploy terminal is unreachable — no wave merges the AX slides line onto `main`, so the
  `head_branch=='main'`-gated `deploy-pages.yml` never fires for the AX cut).** `deploy-pages.yml` is gated on
  a `workflow_run` of CI with `head_branch == 'main'`; the AX slides work lands on `tranche/AX-slides`, which
  the deploy workflow does NOT watch. Without the merge-to-main → push terminal, the AX-rebuilt til-briefing
  deck never re-deploys to slides.friday.institute on the custom domain (the §21 end-state leg 2). The
  falsifiable assertion: *`git -C ~/Programming/slides log origin/main..tranche/AX-slides --oneline` is
  NON-EMPTY (the AX line carries unmerged commits) AND no `deploy-pages.yml` run records a `head_branch==main`
  build of the AX slides cut.* RED: the deploy DAG terminal is unowned — the slides leg of the §21 end-state
  cannot complete.

The wave is RED at HEAD on both; the HardGate below drives each to GREEN (the FORWARD-cut clean
`tranche/AX-slides` branch carrying the committed H state with `feedback-coder/**` untouched + the
merge-to-main → push → `deploy-pages.yml` terminal) under an EXECUTED live render-matrix audit that re-proves
the constellation paints a neutral lattice (the leak is fixed — W30 VERIFIES it live, it does not re-fix it)
and both decks survive on the AX line.

---

## Goal

Cut a clean `tranche/AX-slides` branch FORWARD from `deck/feedback-coder` (carrying the already-committed H
til-briefing state — the leak is fixed, the specs are committed, the deck is deployed), VERIFY that committed
state live (the constellation paints a neutral lattice with one red anomaly across the render matrix — the
§24-fixed leak proven live, not re-fixed), keep `feedback-coder/**` hard out-of-bounds, and establish the
merge-to-main → push → `deploy-pages.yml` terminal so the AX-rebuilt til-briefing deck re-deploys to
slides.friday.institute on the custom domain (the §21 end-state leg 2). This wave is the slides BASELINE on the
AX line: it makes the AX slides band recoverable on a clean branch and wires its deploy terminal, on a
known-good, already-converged base.

---

## Scope (the gestalt fix — the FORWARD-cut branch protocol, live-verify the converged base, reach the deploy terminal; no workaround)

The §24 re-ground inverts the wave's premise: the H tranche's once-stranded work is NOW committed
(`da173e7`/`b622ac7`/`fb2ad39`), the leak is fixed at the source (`constellation.ts:116` reads
`--constellation-line` first), the specs are tracked + their two reds fixed at source, and the deck is deployed
(`9f08ded`). The architectural truth W30 now serves is the BRANCH PROTOCOL + the deploy terminal: the AX slides
band needs a clean `tranche/AX-slides` branch to drive on, and a merge-to-main → push terminal so its rebuilt
deck re-deploys. This wave is the slides BASELINE on the AX line: it forward-cuts the branch off the converged
base, VERIFIES that base live (the leak-fixed neutral lattice + both decks), and wires the deploy terminal. It
builds on already-committed + already-deployed state — there is nothing to re-land, re-fix, or re-author.

### 1. The FORWARD-cut branch protocol — the recoverability + drive-line precondition (slice 28 F6 DISCHARGED; hist:slides; harden branch-protocol)

The H working-tree is NO LONGER dirty uncommitted state — it is COMMITTED on `deck/feedback-coder`
(`da173e7`/`b622ac7`/`fb2ad39`), reachable from HEAD `d79091e`, alongside the committed fourier WIP. The
recoverability blocker the prior SELECTIVE-land step addressed is DISCHARGED: there is nothing to stash, no
selective by-path capture, no clobber risk. The orchestrator (who owns the index — agents stay read-only per
the hardened agent git clause) executes the FORWARD CUT:

1. **Capture the sibling baseline FIRST** (the slides HEAD `d79091e` + branch `deck/feedback-coder` + `git
   status --porcelain` — CLEAN save the untracked `docs/tranches/J/`) into the band-L section of W28's
   `coordination/CONSTELLATION.md`. Re-prove the CLEAN-tree + committed-H + fixed-leak + deployed-deck state
   live (do not trust the spec's word) per the W00 wave-open ritual.
2. **Cut `tranche/AX-slides` FORWARD from `deck/feedback-coder`** — a forward branch off the converged base
   carries the committed H + I til-briefing history AND the feedback-coder fourier deck for free, with NO
   stash, NO by-path selective land, NO recoverability risk. The FileBounds (below) scope the wave's EDITS to
   `src/decks/til-briefing/**` + the shared deck chrome (`src/deck/**`, `src/styles/deck.css`,
   `tests/e2e/*.spec.ts` for the til-briefing matrix); `src/decks/feedback-coder/**` is HARD out-of-bounds —
   the wave RIDES the fourier deck forward on the same base but writes NOT ONE feedback-coder file. The
   chronic block named in MEMORY (`slides deploy blocked by feedback-coder WIP deck`) dissolves: the forward
   cut neither clobbers nor strands the fourier deck — both decks ride the AX line untouched.
3. **EDIT/APPEND the band-L section onto W28's `coordination/CONSTELLATION.md`** (W28 is the sole OPENER —
   W30 NEVER creates the doc): record the FORWARD-cut protocol + the BOTH-decks enumeration (til-briefing +
   feedback-coder, both rideable forward — the second deck is a NET-NEW product with `FourierField.vue` + its
   DESIGN/AUDIT corpus the charter had zero coverage of, enumerated so neither is lost) + the feedback-coder
   HARD-out-of-bounds boundary + the merge-to-main → deploy terminal.

Adopt bbnf's **sibling-baseline-capture ritual** (snapshot the slides HEAD + `git status --porcelain` BEFORE
any cross-repo edit; reconcile at close) so the cross-repo state is a recorded delta, not a silent stall.

### 2. VERIFY the constellation light-dark()-into-Canvas2D fix live (slice 29 F0 — DISCHARGED at the source; W30 proves it)

The leak is FIXED at the source in the committed H/I work — `constellation.ts:116` reads
`this.cLine = readVar(c, "--constellation-line", readVar(c, "--foreground", "#1c1714"))` (the plain-hex
`--constellation-line` token first; `--foreground` survives ONLY as a last-ditch fallback), and `deck.css`
carries `--constellation-line` plain-hex in BOTH arms (`#1c1815` light at `:279`, `#e8e6df` dark at `:809`).
This matched the H.W4 node-token pattern AND closed the last edge-stroke leak the audit named. W30 does NOT
re-author this fix (it ships in the forward-cut base); W30 VERIFIES it LIVE under the AX line's render-matrix
audit — the discharged-out-of-band satisfied-witness rule (§F.3): a fixed leak is proven, not re-implemented.

- **VERIFY live (the binding close, not a re-fix):** on the forward-cut `tranche/AX-slides` branch, render
  slide 1 across the matrix (`?light`/`?dark`) and measure the alpha-weighted painted-constellation pixel
  histogram: **neutral > red × 2** (the lattice reads as a neutral ink/cream web with the single red anomaly
  as the only red focal event — NOT the historical 86.3%-red splatter the prior premise measured against the
  stale stranded tree). The neutral edge hairlines paint their intended `--constellation-line` tone on cream
  AND ink.
- **CONFIRM the discipline holds:** the committed `constellation-visibility.spec.ts` (now tracked) carries the
  no-`light-dark()`-in-canvas assertion; W30 confirms it RUNS GREEN on the AX line, and confirms the
  `--constellation-line` token is plain-hex (no `light-dark(` substring) in both arms. This is the
  verification leg of the one-path Canvas2D-color discipline (plain-hsl/hex tokens, NEVER `light-dark()` into
  canvas), proven live rather than re-asserted in source.

**The TWO-instance leak class + the shared-resolver future (hist:slides + idiom:slides — RECORD, do not
author).** The Canvas2D-light-dark() defect had a second instance — `FourierField.vue` (the feedback-coder
deck) hand-rolls a probe-span `getComputedStyle()` workaround for the SAME root cause. Both instances are now
resolved at their own sources (the constellation via plain-hex `--constellation-line`; FourierField via its
probe-span), but the discipline is NOT yet generalized to ONE shared helper. W30 RECORDS the FourierField
probe as the second consumer that justifies the AX.W37 `resolveCanvasColor` substrate (the ≥2-consumer math:
constellation + FourierField — a 2D consumer reaching the same resolver the WebGL substrate gets) in the
band-L section of `coordination/CONSTELLATION.md`, but does NOT itself author a shared cross-deck helper (the
feedback-coder deck is HARD out-of-bounds per §1 — W30 writes NOT ONE `src/decks/feedback-coder/**` file). The
shared resolver is W37/W17-substrate work the two decks adopt later; W30's leg is the live VERIFICATION of the
already-shipped constellation fix on the AX line + the consumer-#2 record.

### 3. VERIFY the committed e2e specs across the render matrix + the merge-to-main → deploy terminal (slice 29 F1 DISCHARGED; hist:slides; §F.1 deploy DAG)

The H e2e specs are COMMITTED (`b622ac7`) and their two reds were FIXED at source (`fb2ad39` "I.W11 — fix the
two e2e reds at the source"); `tests/e2e/` is tracked (`constellation-visibility`, `complex-graphs`,
`deck-progress`, `dedup-pulse`, `deck.spec`, …). The "authored-but-never-run" witness is DISCHARGED. W30's leg
is to RUN them on the forward-cut `tranche/AX-slides` branch across the render matrix (390×844 / 768×1024 /
1280×720 / the 1280 export frame, both `?light` and `?dark`) and confirm GREEN — the live VERIFICATION that
the converged base holds on the AX line. The π-lane visual-truth discipline (AX.W00) is BINDING on the slides
repo, not only glass-ui: the close is the EXECUTED live render-matrix audit, never a green-but-unrun claim.

**The merge-to-main → deploy terminal (RED witness 2 — the §21 end-state leg 2; §F.1 step 3).** Once the
forward-cut branch is GREEN (committed H state verified + the matrix passes), the orchestrator MERGES
`tranche/AX-slides` → `main` and PUSHES — `ci.yml` (push:main) runs, then `deploy-pages.yml`
(`workflow_run`, `head_branch=='main'`-gated) fires and re-deploys the AX-rebuilt til-briefing deck to
slides.friday.institute on the custom domain. This is the deploy DAG terminal the prior premise lacked. The
W17 library-seam adoption (the `constellation.ts` 510-line deletion onto `<Constellation :draw-overlay>`)
stays the publish-gated tail (§4 note 12) — W30's merge ships the slides-local, leak-fixed, verified deck; the
library-seam deletion is a SEQUENCED later slides commit gated on the AX cut PUBLISHING. (Agents stay
read-only on git — the orchestrator owns the merge + push + the deploy trigger per the hardened agent git
clause.)

### 4. Security hygiene — confirm the access-key redaction holds (slice 29 F8; harden access-key-confirmation)

The live access key `wolfpack-ledger-2026` must not persist in PLAINTEXT in committed docs. The standing
`grep wolfpack-ledger src/` → 0 rule holds for `src/`; W30 — the first AX wave on the slides line — CONFIRMS
the docs do not leak the live key on the forward-cut branch and redacts any surviving occurrence to a
placeholder `<ACCESS_KEY>` + a pointer to the gitignored `.env`. Since til-briefing is public
(`meta.softGated:false`) the key is unused; if genuinely retired, ROTATE it, don't just redact. The leak must
not propagate in any new AX-line commit.

**Explicitly OUT of W30 scope (routes elsewhere):**
- The Slide04 hypothetical/what-if anomaly reframe + the ~$5M figure-clip + the homepage lock affordance + the
  access-key MODAL glass restyle + the mobile-reflow content guards + the dead `SlideNutrition.vue` excision →
  **AX.W31** (the slides content reframe wave; W30 forward-cuts the branch those changes drive on + verifies
  the converged base, W31 authors the content).
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
glass-ui-side artefacts are the coordination doc + the audit ledger ONLY. The FileBounds scope EDITS to
`src/decks/til-briefing/**` + the shared deck chrome ONLY; `src/decks/feedback-coder/**` is HARD
out-of-bounds. The constellation leak + the e2e specs are ALREADY fixed/committed in the forward-cut base — the
slides-side legs are VERIFY (render-matrix audit) + the orchestrator's branch/merge ops, not source re-edits.

| File (in `~/Programming/slides` unless noted) | Edit |
|------|------|
| `tranche/AX-slides` branch (git op — orchestrator) | CUT FORWARD from `deck/feedback-coder` (HEAD `d79091e`) — carries the committed H + I til-briefing history; `feedback-coder/**` rides forward untouched. Agents stay read-only on git. |
| `src/decks/til-briefing/constellation.ts` | VERIFY-ONLY — the `:116` `cLine` read already resolves `--constellation-line` first (the leak is fixed in the committed base). W30 does NOT edit it; the render-matrix audit proves the neutral lattice live. Any in-scope render-truth fix surfaced live stays WITHIN `src/decks/til-briefing/**`. |
| `src/styles/deck.css` | VERIFY-ONLY — `--constellation-line` plain-hex already present in both arms (`#1c1815` light `:279`, `#e8e6df` dark `:809`). W30 does NOT edit it. |
| `tests/e2e/*.spec.ts` (til-briefing matrix) | RUN-ONLY — the committed specs (`constellation-visibility`, `complex-graphs`, `deck-progress`, `dedup-pulse`, `deck.spec`, …) RUN GREEN across the render matrix on the forward-cut branch. The two prior reds were fixed at source (`fb2ad39`). |
| `main` branch merge + push (git op — orchestrator) | MERGE `tranche/AX-slides` → `main` + PUSH once the branch is GREEN — triggers `ci.yml`(push:main) → `deploy-pages.yml`(`workflow_run`, `head_branch==main`) → the custom-domain re-deploy. Agents stay read-only on git. |
| any committed slides doc leaking `wolfpack-ledger-2026` | CONFIRM the redaction holds; redact any surviving occurrence → `<ACCESS_KEY>` + a pointer to the gitignored `.env` (or rotate). |
| `~/Programming/glass-ui/coordination/CONSTELLATION.md` (glass-ui side) | **EDIT/APPEND** — W28 is the sole OPENER; W30 APPENDs the band-L section: the slides HEAD `d79091e` + branch + `git status --porcelain` sibling-baseline; the FORWARD-cut protocol; the feedback-coder/fourier deck disposition (HARD out-of-bounds, rides forward); the BOTH-decks L-band enumeration; the writer-vs-reader boundary (glass-ui owns the W17 library token; slides owns the deck read); the AX-publish gate for the W17 adoption leg; the merge-to-main → `deploy-pages.yml` terminal; the FourierField-probe-as-W37-consumer-#2 note. |
| `~/Programming/glass-ui/docs/tranches/AX/audit/W30-slides-baseline.json` (glass-ui side) | **NEW** — the wave's born-RED→GREEN audit artefact + the FORWARD-cut record (the §24 satisfied-witness discharge of the prior 3 witnesses) + the verified-e2e verdicts + the live render-matrix BEFORE/AFTER + the merge-to-main → deploy verdict. |

**OUT of bounds:** any `src/decks/feedback-coder/**` file (HARD out-of-bounds — the fourier deck rides the
forward cut untouched, NOT edited; the load-bearing recoverability + no-clobber constraint); the
Slide04/lock/modal/SlideNutrition CONTENT changes (**AX.W31**); the `reveal.ts`/`useCountup.ts`/deploy-verify
adoption (**AX.W32**); any glass-ui library `src/` (the `--constellation-line` token + focal/warp seam are
**AX.W17**, the `resolveCanvasColor` substrate is **AX.W37** — glass-ui writes no library source in this slides
wave); the W17 `Constellation.vue`/`constellationField.ts` (W30 READS the W17 seam, it does not author it);
the source re-authoring of the already-committed constellation leak fix + the e2e specs (DISCHARGED at source
per §24 — W30 VERIFIES, it does not re-implement).

---

## Disjointness (sibling waves it must NOT overlap)

W30 is the FIRST wave in band L (SLIDES); it dependsOn AX.W17 + AX.W00 and is the predecessor of W31 + W32.
The disjointness contract:

- **vs AX.W17 (the library-side constellation seam) — SEQUENTIAL + REPO-DISJOINT.** W17 owns the LIBRARY-side
  `--constellation-line` plain-hsl token + `readPalette` full-set + the focal-node/`warpTo`/`warpOnClick` seam
  (`glass-ui/src`). W30 owns the SLIDES-side branch protocol (the forward cut + the merge-to-main → deploy
  terminal) + the LIVE VERIFICATION that the committed `--constellation-line` deck token reads the neutral
  lattice (the leak fix already shipped in the H/I base) + (the W17 adoption leg, GATED on publish) the
  510-line `constellation.ts` deletion onto a thin `<Constellation :draw-overlay>` wrapper. The shared SEMANTIC
  surface is the Canvas2D-safe plain-hsl edge color (W17 ships the library default `--constellation-line`; the
  slides deck carries its own deck-scoped `--constellation-line` value + reads it). **NO shared FILE —
  different repos.** The W17 adoption is gated on the AX cut PUBLISHING (§4 note 12 — slides MEASURED published
  3.6.0/3.7.0 which ships NO `/constellation`); coordinate via the band-L section of W28's
  `coordination/CONSTELLATION.md`.

- **vs AX.W00 (the π lane) — SEQUENTIAL (dependsOn).** W00 codifies the π visual-runtime discipline + the
  live-re-diagnosis wave-open ritual + the paired-π BEFORE/AFTER + DELTA close protocol. W30 RUNS its executed
  e2e + live render-matrix audit UNDER that discipline (declared binding on the slides repo). The slides e2e
  runner is the slides repo's OWN `npm run audit` (slides ships no `proof:*` runner — H.md confirms); W00's
  `tests-visual/` workspace is a glass-ui workspace. DISJOINT by repo + file; W30 inherits the DISCIPLINE, not
  W00's spec files.

- **vs AX.W28 (the CONSTELLATION.md opener) — SEQUENTIAL (dependsOn) + DOC-DISJOINT.** W28 is the SOLE OPENER
  of `coordination/CONSTELLATION.md` (it authors the band-K + gate-0 section before any cross-repo wave reads
  it). W30 EDIT/APPENDs the band-L (SLIDES) section onto that same doc — it NEVER creates the file (the prior
  `**NEW**` creator-collision is resolved: W28 opens, W30/W34 extend). The path is the ONE canonical repo-root
  `coordination/CONSTELLATION.md`. Section-disjoint: W28 owns band-K, W30 owns band-L, W34 owns the §16
  receiver bands.

- **vs AX.W31 (slides content reframe) — SEQUENTIAL (W31 dependsOn W30).** W30 forward-cuts the branch + reaches
  the deploy terminal + verifies the converged base (the known-good BASE); W31 authors the CONTENT (Slide04 reframe,
  $5M clip, lock affordance, modal restyle, mobile content guards, SlideNutrition excision) ON that base.
  Shared FILES (the slide SFCs + deck.css) but SEQUENTIAL — W30 forward-cuts + verifies them, W31 edits the
  committed versions on the AX-slides branch. No concurrent write: W31 cannot start until W30's forward-cut
  branch is GREEN (the §0 mandate — no content wave builds on an unverified base).

- **vs AX.W32 (slides motion + form adoption) — SEQUENTIAL (W32 dependsOn W31 + W24).** W32 owns the
  `reveal.ts`/`useCountup.ts`/`DeckProgress` adoption + deploy verification + the slides Lighthouse arm.
  DISJOINT by file (motion composables + DeckSettings, not the constellation or the slide content). W32 is
  gated on the AX PUBLISH for `useCountup`/`DeckProgress` (`vReveal` is already in 3.4.0).

- **vs the feedback-coder/fourier deck (NOT a wave — a committed deck on the base branch).** The ONE hard
  collision-avoidance: W30 must NOT touch `src/decks/feedback-coder/**` (HARD out-of-bounds in FileBounds).
  The FORWARD-cut protocol (§1) is the mechanism: cutting `tranche/AX-slides` forward from `deck/feedback-coder`
  carries the committed fourier deck along on the same base — it rides forward untouched, neither clobbered nor
  stranded. The forward cut dissolves the chronic dirty-tree wall: there is no stash, no selective by-path
  land, nothing to lose. W30 EDITS only `src/decks/til-briefing/**` + the shared deck chrome; the fourier deck
  is read-along-only.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

This is a slides-repo wave; the orchestrator owns the index (the FORWARD cut + the merge-to-main + commits);
agents stay read-only on git per the hardened agent git clause (K W0).

- **Implement (≤1 agent — the live VERIFICATION pass + the band-L coordination append + the key-redaction
  confirmation; the orchestrator does the FORWARD cut + the merge-to-main).** Run the committed til-briefing
  e2e specs across the render matrix on the forward-cut branch; confirm GREEN. APPEND the band-L section to
  W28's `coordination/CONSTELLATION.md` (the sibling-baseline + the FORWARD-cut protocol + the both-decks
  enumeration + the merge-to-main → deploy terminal + the FourierField-W37-consumer-#2 note). Confirm the
  key-redaction holds; redact any surviving occurrence. Lint + typecheck at every interval. (The orchestrator —
  NOT this agent — cuts `tranche/AX-slides` FORWARD from `deck/feedback-coder` BEFORE the verification pass,
  and MERGES to `main` + pushes once GREEN. The agent writes NO `src/decks/feedback-coder/**`; the
  constellation leak + the e2e specs are already fixed/committed in the forward-cut base — the agent VERIFIES,
  it does not re-author.)
- **Adversarially-verify (≤1 read-only lane).** (a) Re-runs the TWO surviving RED witnesses on the forward-cut
  tree: `tranche/AX-slides` exists and carries the committed H til-briefing history; the merge-to-main →
  `deploy-pages.yml` terminal is reachable (the branch merges to `main` and the deploy workflow fires on the
  `head_branch==main` build). It also CONFIRMS the §24 satisfied-witness discharges hold: `constellation.ts:116`
  reads `--constellation-line` first (the leak is fixed in the base); the live slide-1 pixel histogram measures
  neutral > red (the splatter is gone); the committed specs RUN and PASS. ADVERSARIAL twists: (i) confirms the
  `--constellation-line` token is PLAIN-hex (no `light-dark(` substring) in BOTH arms of `deck.css`; (ii)
  confirms the feedback-coder deck files are UNTOUCHED on the forward-cut branch (`git diff
  deck/feedback-coder..tranche/AX-slides -- src/decks/feedback-coder/**` = empty — the forward cut neither
  swept nor stranded the fourier WIP, and W30 edited none of it) AND the fourier deck still boots; (iii)
  confirms the committed `constellation-visibility.spec.ts` would FAIL on a synthetic re-introduction of the
  `--foreground`-leak code (the guard actually bites); (iv) confirms the leaked key is gone from the committed
  docs (`grep -rn wolfpack-ledger-2026 docs/` = 0 on the AX-slides branch); (v) confirms `CONSTELLATION.md` was
  EDIT/APPENDed (W28's band-K section is intact above W30's band-L append — W30 did not overwrite the opener).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors the two surviving born-RED gate assertions: the
  forward-cut branch-existence + committed-H proof, and the merge-to-main → `deploy-pages.yml` reachability
  proof; confirms both FAIL at HEAD (`tranche/AX-slides` does not exist; the AX line is unmerged to `main`) and
  PASS post-wave. Confirms the committed e2e specs run GREEN in the slides `npm run audit` runner on the
  forward-cut branch.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**
The wave-agnostic authorization grant is by-reference — AX.md §6.1 (the canonical autonomous-resilience clause) +
§6.2 (the halt-vs-work-around decision tree) + §6.3 (the cross-session clobber ritual — load-bearing on this
slides-repo wave). The implementing agent works AROUND a roadblock with an idiomatic gestalt fix in-FileBounds
rather than stall; it spawns a tangent triumvirate (research→plan-augment carrying `## Exact Wave-Amendment
Text`→redress; caps 20/15/30) on a scope-reveal, a non-local gate failure, or a 3rd diagnostic-loop iteration; it
escalates ONLY on a §21 held-invariant breach or a §6.2 Class-3/4 user-gate. **The wave-specific §3a auto-triggers
(authored from this wave's FileBounds + HardGate):** (1) an edit reveal OUTSIDE FileBounds — the forward-cut
VERIFICATION needs a touch of `src/decks/feedback-coder/**` (HARD out-of-bounds — the fourier deck rides forward
un-edited) or a re-author of the already-committed constellation/e2e fix the agent is meant only to VERIFY (a
satisfied-witness that must be re-opened = triumvirate, never an in-line re-author); (2) the constellation
neutral-lattice e2e gate or the committed-specs executed-audit gate fails NON-LOCALLY on the forward-cut branch —
the `--constellation-line` plain-hex fix did not hold, a transitive `var(--…)→light-dark()` leak re-admits into a
Canvas2D stroke/fill, or a committed spec reds against the live render; (3) the 3rd diagnostic-loop iteration on
the merge-to-main → `deploy-pages.yml` terminal reachability (a deploy that will not fire on the `head_branch==main`
build — the §21 end-state leg-2 keystone); (4) the cross-session clobber ritual detects a delta on
`origin/at-dock-convergence` or a sibling `.git/index.lock`, or a satisfied-witness already-GREEN out-of-band — the
orchestrator-owned rebase/sleep path per §6.3, agents stay read-only, never corrupt the slides tree; (5) the
VISUAL-TRUTH render-matrix audit shows the lattice still reads as the historical red splatter or a deck fails to
boot. The FORWARD-cut + merge-to-main + every commit are ORCHESTRATOR-owned (agents read-only on git per K W0); a
genuine deploy credential is the only Class-4 user-gate.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / executed-test gate — born-RED→GREEN (in the slides `npm run audit` set).**

- **The forward-cut clean-branch proof (born-RED — a branch-protocol + recoverability artefact).** Assert
  `tranche/AX-slides` EXISTS, was cut FORWARD from `deck/feedback-coder`, and carries the committed H + I
  til-briefing history (`git log tranche/AX-slides` shows `da173e7`/`b622ac7`/`fb2ad39`) AND
  `src/decks/feedback-coder/**` is UNTOUCHED on it (`git diff deck/feedback-coder..tranche/AX-slides --
  src/decks/feedback-coder/**` = empty — the fourier deck rides forward un-edited). **Born-RED at HEAD** (the
  branch does not exist; the AX slides band has no clean line). This is a git-state observation (an accepted
  SPEC.md §Hard-Gates form, NOT a grep-for-runtime-behaviour).

- **The merge-to-main → deploy-terminal proof (born-RED — the §21 end-state leg-2 reachability gate).** Assert
  `tranche/AX-slides` MERGES to `main` and the push triggers `ci.yml`(push:main) → `deploy-pages.yml`
  (`workflow_run`, `head_branch==main`) → the custom-domain re-deploy (a recorded `deploy-pages.yml` run on the
  AX-slides cut). **Born-RED at HEAD** (`git log origin/main..tranche/AX-slides` is non-empty / the branch does
  not exist; no `head_branch==main` deploy of the AX slides cut). Git-state + CI-run-record observation.

- **The constellation neutral-lattice e2e spec (born-RED→GREEN — VERIFYING the §24-shipped fix).** The committed
  `constellation-visibility.spec.ts` runs against the LIVE deck on the forward-cut branch: render slide 1,
  measure the alpha-weighted painted-constellation pixel histogram, assert **neutral > red × 2** (the lattice
  reads as a neutral web, NOT a red splatter), AND assert no `--constellation-*` token carries a `light-dark(`
  value read into a Canvas2D stroke/fill. **Born-RED against a synthetic re-introduction of the `--foreground`
  leak** (the spec bites if the fix is reverted), GREEN on the committed `--constellation-line` base. This is a
  **runtime-observation** artefact (a real browser render + per-pixel readback — NOT a grep for a source
  string). W30 VERIFIES the shipped fix live; it does not re-author it.

- **The committed-specs executed-audit gate (born-RED→GREEN — the discipline gate).** The committed til-briefing
  e2e specs (`constellation-visibility`, `complex-graphs`, `deck-progress`, `dedup-pulse`, `deck.spec`, …) RUN
  GREEN across the render matrix in the slides `npm run audit` on the forward-cut branch. **Born-RED against an
  un-run state** (the §24-discharged "authored-but-never-run" witness — W30's leg is the EXECUTED run record on
  the AX line). Test-output artefact.

This is a **git-state + CI-run-record + runtime-observation + test-output** gate quartet (the precept-valid
artefact forms per SPEC.md §Hard Gates), NOT a "grep found a source string for runtime behaviour" invalid form:
the forward-cut + merge proofs are git-state + CI-run observations, the constellation gate is a real browser
render + readback, the executed-specs gate is test output.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** An EXECUTED live
Playwright + frontend-design pass across the slides render matrix — **390×844 / 768×1024 / 1280×720 / the 1280
export frame**, both `?light` and `?dark`:

- **The constellation reads as a NEUTRAL lattice with ONE red anomaly** on cream AND ink — NOT the historical
  86.3%-red splatter (the §2 verify ask: the neutral web with the single red focal event, the §24-shipped fix
  proven live). The neutral edge hairlines paint their intended `--constellation-line` ink/cream tone; the red
  anomaly is the ONLY red.
- **BOTH decks preserved** — the feedback-coder/fourier deck still boots and renders on the forward-cut branch
  (the forward cut carried it untouched); the til-briefing deck boots public.
- **The committed e2e specs PASS live** — the xray window flex-fills the column with no dead band, the graph
  aspect-ratios clear ≥80px, the mobile markers thread their spine ≥32px, the dedup pulse de-dups — the
  live-verified verdict on the AX line.
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the executed e2e gate alone** — the live render-matrix audit (captured as a
paired-π BEFORE/AFTER + DELTA artefact per the W00 protocol: the historical 86.3%-red-splatter BEFORE — the
audit baseline against the stale stranded tree — vs the neutral lattice + single-red-anomaly AFTER on the
forward-cut branch, at the 4 frames × light/dark) is the binding close criterion. A green spec proves the
heuristic; only the executed live audit proves the lattice reads as a neutral web, both decks survive the
forward cut, and the merge-to-main → deploy terminal fires. (The H tranche's cardinal failure was a
green-but-unrun spec — W30 must not repeat it.)

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual + sibling-baseline capture (W00 wave-open).** Re-confirm the §24 reality against
   the slides HEAD: `git -C ~/Programming/slides status --porcelain` is CLEAN save `?? docs/tranches/J/`;
   branch = `deck/feedback-coder`, HEAD `d79091e`; `constellation.ts:116` reads `--constellation-line` first
   (the leak is fixed); `deck.css` carries `--constellation-line` plain-hex in both arms; the e2e specs are
   tracked; the deck is deployed (`9f08ded`). Confirm the §24 satisfied-witness discharges hold (do NOT
   re-land, re-fix, or re-author). Record the slides HEAD + branch + `git status --porcelain` as the band-L
   sibling-baseline in W28's `coordination/CONSTELLATION.md`.
2. **The orchestrator cuts `tranche/AX-slides` FORWARD from `deck/feedback-coder`** (the index is the
   orchestrator's). A forward branch off HEAD `d79091e` carries the committed H + I til-briefing history AND the
   feedback-coder fourier deck on the same base — no stash, no by-path selective land, no recoverability risk.
   Confirm `src/decks/feedback-coder/**` is byte-identical between the two branches. (Agents stay read-only on
   git.)
3. **EDIT/APPEND the band-L section to W28's `coordination/CONSTELLATION.md`.** Record the FORWARD-cut protocol,
   the BOTH-decks enumeration (til-briefing + feedback-coder, both rideable forward; feedback-coder HARD
   out-of-bounds), the writer-vs-reader boundary, the AX-publish gate for the W17 adoption leg, the
   merge-to-main → `deploy-pages.yml` terminal, and the FourierField-probe-as-W37-consumer-#2 note. (W28 is the
   sole OPENER — W30 NEVER creates the doc.)
4. **VERIFY the constellation neutral lattice live.** On the forward-cut branch, render slide 1 across the
   matrix; measure the alpha-weighted pixel histogram (neutral > red × 2 — the §24-shipped fix proven live);
   confirm `--constellation-line` is plain-hex (no `light-dark(` substring) in both arms of `deck.css`. W30
   VERIFIES the shipped fix; it does NOT re-edit `constellation.ts` or `deck.css`.
5. **Run the committed e2e specs across the render matrix.** Execute the slides `npm run audit` til-briefing
   set on the forward-cut branch; confirm GREEN. (The specs are committed; their two prior reds were fixed at
   source per `fb2ad39` — this is the live run record on the AX line, not a re-author.)
6. **Confirm the access-key redaction holds.** `grep -rn wolfpack-ledger-2026 docs/` on the forward-cut branch;
   redact any surviving occurrence → `<ACCESS_KEY>` + a pointer to the gitignored `.env`; rotate if genuinely
   retired. MUST NOT propagate the live key in a new AX-line commit.
7. **Gate GREEN + VISUAL-TRUTH.** Run the matrix audit; run the live Playwright + frontend-design pass (neutral
   lattice + single red anomaly on cream + ink; both decks boot; the xray/graph/marker/dedup specs PASS live)
   at the 4 frames × light/dark; capture the paired-π BEFORE/AFTER + DELTA (the historical 86.3%-red splatter
   BEFORE vs the neutral lattice AFTER on the forward-cut branch); write `W30-slides-baseline.json` GREEN.
8. **Merge-to-main → deploy + hand off to AX.W31.** Once the forward-cut branch is GREEN, the orchestrator
   MERGES `tranche/AX-slides` → `main` + PUSHES — `ci.yml`(push:main) → `deploy-pages.yml`(`head_branch==main`)
   re-deploys the AX-rebuilt deck to slides.friday.institute on the custom domain. Record in
   `coordination/CONSTELLATION.md` that the AX slides base is on a clean branch + verified + deployed (the
   known-good base); W31 builds the content reframe on it. Note the W17 adoption leg (the `constellation.ts`
   510-line deletion onto `<Constellation :draw-overlay>`) is gated on the AX cut PUBLISHING (§4 note 12 —
   slides dev-resolves the published line; 3.6.0/3.7.0 ships no `/constellation`).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W30-slides-baseline.json` (glass-ui side) — the born-RED→GREEN ledger: the §24
  re-ground (the live slides state `d79091e`, CLEAN, H committed, leak fixed at `constellation.ts:116`, deck
  deployed `9f08ded`) discharging the prior three witnesses (stranded-tree, the leak, the unrun specs) as
  satisfied-out-of-band, the TWO surviving RED witnesses (the absent `tranche/AX-slides` branch + the
  unreachable merge-to-main → deploy terminal), the FORWARD-cut record with the feedback-coder-untouched proof,
  the per-finding (slice 28 F6 + slice 29 F0/F1 + the hist:slides/idiom:slides/harden refinements) disposition
  with the OUT-of-scope routes (W31 content / W32 motion+deploy / W17 library seam / W37 substrate), and the
  post-wave GREEN measurements (the neutral-lattice pixel histogram VERIFYING the shipped fix, the
  executed-specs verdicts, the merge-to-main → deploy verdict, the key-redaction grep-0).
- The band-L section APPENDED to W28's `coordination/CONSTELLATION.md` (glass-ui side — W28 is the sole OPENER;
  W30 EDIT/APPENDs, NEVER creates): the slides HEAD `d79091e` + branch + `git status --porcelain`
  sibling-baseline at coordination time, the FORWARD-cut protocol, BOTH decks enumerated (til-briefing +
  feedback-coder, both rideable forward) with the fourier deck's HARD-out-of-bounds disposition, the
  writer-vs-reader boundary (glass-ui owns the W17 library `--constellation-line` token; slides owns its
  deck-scoped `--constellation-line` read), the AX-publish gate for the W17 adoption leg, the merge-to-main →
  `deploy-pages.yml` terminal, the FourierField-probe-as-W37-consumer-#2 note, and the conflict-resolution
  protocol (the forward cut leaves the fourier deck untouched).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the historical 86.3%-red-splatter BEFORE
  (the stale-tree audit baseline) vs the neutral lattice + single-red-anomaly AFTER on the forward-cut branch,
  at the 4 render-matrix frames × light/dark, on cream + ink.
- The EXECUTED committed-spec run record (the slides `npm run audit` output on the forward-cut branch — the
  live-verified verdict on the AX line) + the merge-to-main → `deploy-pages.yml` run record.

---

## CommitPlan (conventional-commit messages, one per sub-step — in the SLIDES repo unless noted)

1. (git op, not a commit) Orchestrator cuts `tranche/AX-slides` FORWARD from `deck/feedback-coder` (HEAD `d79091e`) — carries the committed H + I til-briefing history + the feedback-coder deck on the same base, untouched.
2. `docs(coordination): append CONSTELLATION.md band-L — slides forward-cut protocol + both-decks ledger + merge-to-main→deploy terminal + FourierField-W37-consumer-#2 (AX.W30)` (glass-ui side; W28 opened the doc)
3. `chore(slides): confirm wolfpack-ledger-2026 redaction holds on tranche/AX-slides → <ACCESS_KEY> + .env pointer (AX.W30 slice29-F8)` (only if a surviving occurrence is found)
4. (git op, not a commit) Orchestrator MERGES `tranche/AX-slides` → `main` + PUSHES once GREEN — triggers `ci.yml`(push:main) → `deploy-pages.yml`(`head_branch==main`) → the custom-domain re-deploy.
5. `docs(AX): W30 close — W30-slides-baseline.json GREEN (forward-cut + verified neutral lattice + merge-to-main→deploy verdict) + paired-π BEFORE/AFTER + DELTA (glass-ui side)`

(The orchestrator owns the index — agents NEVER stage/commit/stash/branch/merge per the hardened agent git
clause, K W0; the forward cut + the merge-to-main are orchestrator git ops. The constellation leak + the e2e
specs are already fixed/committed in the forward-cut base — there is NO leak-fix or spec-tightening commit
(those were the stale-premise commits, discharged per §24). The glass-ui-side coordination append + close land
on the glass-ui line; any surviving key redaction lands on the SLIDES `tranche/AX-slides` branch. The W17
adoption leg — the `constellation.ts` 510-line deletion onto `<Constellation :draw-overlay>` — is a SEPARATE
later slides commit GATED on the AX publish.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W17 (the library-side constellation seam) — HARD (the charter §3 `### AX.W30` header declares
  `dependsOn AX.W17`).** W17 ships the LIBRARY `--constellation-line` plain-hsl token + `readPalette` full-set
  + the focal-node/`warpTo`/`warpOnClick` seam that the slides `constellation.ts` 510-line DELETION (the W17
  adoption leg routed here) reads — the drift+warp cannot move through a read-only overlay, so the deletion is
  CONTINGENT on the focal/warp seam landing in W17. The W30 REQUIRED scope (the forward-cut branch + the live
  VERIFICATION of the already-shipped leak fix + the merge-to-main → deploy terminal) does NOT itself need W17
  — but the charter sequences W30 after W17 so the slides port (the deletion onto the thin wrapper) is
  unblocked, and that port is GATED on the AX cut PUBLISHING (§4 note 12 — slides MEASURED published 3.6.0/3.7.0
  which ships NO `/constellation`; the seam is at-HEAD-only until the AX publish).
- **AX.W00 (the π visual-runtime lane) — HARD (implicit; §2b makes π binding on the consumer repo).** W00
  codifies the executed-visual-truth discipline + the live-re-diagnosis wave-open ritual + the paired-π
  BEFORE/AFTER + DELTA close protocol. W30's close is an EXECUTED live render-matrix audit (not the authored-spec
  claim that sank H) — that discipline is W00's, declared binding on the slides repo (hist:slides: "the π-lane
  visual-truth discipline must be declared binding on the slides repo, not only glass-ui").
- **AX.W28 (the CONSTELLATION.md opener) — HARD (the doc-ownership edge).** W28 is the SOLE OPENER of
  `coordination/CONSTELLATION.md` (band-K + gate-0); W30 EDIT/APPENDs the band-L (SLIDES) section onto that same
  doc and NEVER creates it. W30 must dispatch AFTER W28 has opened the doc so the band-L append lands on an
  existing file — the prior `**NEW**` creator-collision (W28 + W30 both claiming creation) is resolved by this
  ordering edge (W28 opens, W30/W34 extend).
- **Downstream (NOT a W30 dependsOn — W30 is the predecessor):** **AX.W31** dependsOn AX.W30 (the content
  reframe builds on the forward-cut + verified BASE — no content wave builds on an unverified base); **AX.W32**
  dependsOn AX.W31 + AX.W24 (motion + form adoption + deploy verify).
- **Coordinate (NOT a hard dependency):** **AX.W37** ships `useCanvas2D`/`resolveCanvasColor` — W30 records the
  FourierField probe as that substrate's consumer #2 (the ≥2-consumer math) but does NOT author the resolver;
  the shared-helper consolidation (path B) is W37/W17-substrate work the two decks adopt later.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **slides `f78f623` (audit baseline) → `d79091e` (live HEAD — the §24 convergence).** At AUDIT time the slides
  HEAD was `f78f623` (a Fourier-DECK commit) with the H til-briefing work STRANDED as dirty `M`/`??`
  working-tree state under the fourier stack. The live state has since CONVERGED: the H W2-W10 til-briefing pass
  is COMMITTED (`da173e7` "H.W2..W10 implementation"), the e2e specs are COMMITTED (`b622ac7`), the two e2e reds
  were fixed at source (`fb2ad39` "I.W11"), and HEAD is now `d79091e` with a CLEAN tree (only `?? docs/tranches/J/`
  untracked). The recoverability blocker the audit named is DISCHARGED — the forward cut off `deck/feedback-coder`
  carries the committed work onto the AX line. The audit's `f78f623` baseline is preserved here as the lineage
  anchor; the live re-ground is `d79091e`.
- **slides `97ce874`** (H.W1 — the ONLY committed H wave: `feat(tranche-H): H.W1 consume glass-ui 3.4.0 — the
  AW dock-collapse fix`). H.W1 consumed only the dock-collapse fix; H W2-W10 (the deck visual-refinement pass)
  was left dirty for orchestrator commit/verify, then the branch advanced to the feedback-coder deck — the
  exact headless-green/visually-broken GAP the AX mandate (§0, §13) names the cardinal lesson.
- **The H.W4 + I.W11 visibility close** (slides `constellation.ts:100-118` + `deck.css` §1/§10) — H.W4 promoted
  `--constellation-node/-node-dim/-accent` + the edge-alpha MULTIPLIERS to plain-hex tokens PRECISELY because
  "Canvas2D rejects light-dark()", and the I.W11 pass closed the LAST edge-stroke leak: `constellation.ts:116`
  now reads `this.cLine = readVar(c, "--constellation-line", readVar(c, "--foreground", "#1c1714"))` — the
  plain-hex `--constellation-line` token first (`#1c1815` light at `deck.css:279`, `#e8e6df` dark at `:809`),
  with `--foreground` surviving only as a last-ditch fallback. The leak is FIXED at the source in the
  forward-cut base — W30 VERIFIES it paints the neutral lattice live; it does NOT re-author the fix.
- **The feedback-coder `FourierField.vue:223-250`** (the net-new fourier deck, `8586539`…`f78f623`) — ALREADY
  solves the EXACT Canvas2D light-dark() defect via a hidden probe-span `readStroke()`
  (`getComputedStyle(probe).color` → a canvas-valid `rgb()`). AUDIT-FOURIER-v2 confirms it resolves to clean
  oklch, not a light-dark string. This is the POSITIVE cross-pollination: the correct gestalt already
  implemented in the newer deck — the second consumer that justifies the AX.W37 `resolveCanvasColor` substrate,
  and the proof that the slides corpus had the answer (a GENUINELY-EXECUTED headless Playwright render audit, 9
  gates) the H til-briefing pass failed to apply.
- **§4 note 9 (the slides band is a SEPARATE REPO, folded for tracking).** Most §12 items are RESOLVED at the
  code level by tranches G + H and — per the §24 reality — are NOW committed + browser-verified + deployed
  (`9f08ded`). W30 forward-cuts + verifies the converged base + reaches the deploy terminal; the
  genuinely-unaddressed content gap (the Slide04 hypothetical reframe) is W31.
- **§4 note 12 (publish-currency, not code).** slides MEASURED published 3.6.0/3.7.0 (the I.W10 deploy gate
  pinned 3.7.0 from the registry at `15c1817`); neither ships `/constellation`. The W17 focal/warp seam + the
  `--constellation-line` library token are at-HEAD-only until the AX cut PUBLISHES. The W17 adoption leg (the
  slides `constellation.ts` 510-line deletion) is gated on the AX publish — W30's REQUIRED scope (forward-cut +
  verify + merge-to-main → deploy) runs against the slides-local code TODAY; the library-seam adoption is the
  publish-gated tail.

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
  precept).** The shipped fix is the ROOT-CAUSE one-path answer — the plain-hex `--constellation-line` token
  (light `:root` + dark `:root.dark .deck` arm at `deck.css:279`/`:809`) that Canvas2D accepts, read first at
  `constellation.ts:116`, NEVER `--foreground` (a `light-dark()` value Canvas2D silently rejects, kept only as
  a last-ditch fallback). NOT a workaround (no try/catch around the rejected assignment, no per-site patch).
  W30 VERIFIES this one-path invariant holds live (the neutral lattice + the no-`light-dark(`-in-canvas
  assertion in the committed spec). MUST NOT introduce a `light-dark()` token read into a Canvas2D stroke/fill
  or a per-site workaround.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation
  (`instructions/README.md §Edicts`; SPEC.md §Hard-Gates "silent `console.warn` + return is an invalid hard
  gate").** The committed `constellation-visibility.spec.ts` is the LOUD gate — a real browser render + per-pixel
  readback that REDS on the exact silent-failure class that produced the historical 86.3%-red splatter (a
  `light-dark()` value read into a Canvas2D stroke). W30's close runs it; the discipline is a runtime-observation
  gate, never a silent fall-through. MUST NOT close on a headless/authored gate that cannot catch the
  silent-reject class.
- **cross-repo coordination doc + sibling-baseline-capture + clean-branch landing (`instructions/tranche/SPEC.md`
  cross-repo coordination clause; the bbnf sibling-baseline ritual).** W30 EDIT/APPENDs the band-L section to
  W28's `coordination/CONSTELLATION.md` (W28 is the SOLE OPENER — W30 NEVER creates the doc) declaring the
  slides HEAD `d79091e` + branch + `git status --porcelain` sibling-baseline, the FORWARD-cut protocol, the
  writer-vs-reader boundary, and the conflict-resolution protocol (the fourier deck stays untouched). The
  FORWARD cut off `deck/feedback-coder` is the clean-branch recoverability mechanism (carries the committed
  work onto the AX line with no stash/no by-path land/no clobber). MUST NOT cut the branch without the
  coordination append + the sibling-baseline snapshot, MUST NOT create the doc (W28 owns the open), and MUST
  NOT edit or strand the feedback-coder deck.
- **deploy-DAG terminal reachability (the §21 end-state leg 2 + §F.1 deploy DAG).** W30 establishes the
  merge-to-main → push → `deploy-pages.yml` (`head_branch==main`) terminal so the AX-rebuilt til-briefing deck
  re-deploys to slides.friday.institute on the custom domain. Without it the AX slides leg of the §21 end-state
  cannot complete (the deploy workflow does not watch `tranche/AX-slides`). MUST NOT close W30 leaving the AX
  slides line unmerged to `main` (the deploy terminal unreachable).
- **substrate-with-consumer / wire-before-retire (precepts README "Substrate and consumer land together").**
  The W17 library `--constellation-line` token + focal/warp seam land WITH slides as consumer #2 — but the
  slides `constellation.ts` 510-line DELETION (the consumer adoption) is GATED on the AX publish (§4 note 12),
  so W30's REQUIRED scope is the forward-cut + live VERIFICATION of the already-shipped leak fix on the
  known-good base; the publish-gated adoption tail is a SEQUENCED cross-repo handoff (recorded in the
  coordination doc), NOT a silent deferral. The FourierField probe is recorded as the W37 `resolveCanvasColor`
  substrate's consumer #2 (the ≥2-consumer math: constellation + FourierField). MUST NOT retire the slides
  duplication un-routed or ship a single-consumer substrate.
- **no-silent-deferrals (the W31 content + the W17 adoption + the W37 substrate are SEQUENCED, not "deferred to
  next tranche").** Every out-of-scope item is explicitly ROUTED with a named successor wave: the Slide04
  reframe + lock + modal → AX.W31; the motion/form/deploy → AX.W32; the `constellation.ts` deletion → the W17
  adoption leg (publish-gated); the shared `resolveCanvasColor` → AX.W37. MUST NOT close W30 leaving any item
  with a generic "future tranche" placeholder.
- **cross-repo-dev-resolution contract-v2 (`docs/precepts/cross-repo-dev-resolution.md` invariant 30; §4 note
  12).** slides dev-resolves the BUILT `dist/` of the published glass-ui line (3.6.0/3.7.0 ships no
  `/constellation`; slides pins 3.7.0 from the registry per `15c1817`), so the W17 library-seam adoption is
  gated on the AX cut PUBLISHING — W30's REQUIRED scope runs against the slides-local code TODAY, the
  library-seam adoption is the publish-currency-gated tail. MUST NOT assume slides resolves the at-HEAD library
  seam before the AX publish.
- **security hygiene / key-isolation (the standing `grep wolfpack-ledger src/` → 0 rule).** The leaked key
  `wolfpack-ledger-2026` must not persist in committed DOCS; W30 CONFIRMS the redaction holds on the
  forward-cut branch and redacts-or-rotates any surviving occurrence BEFORE any further AX-line commit
  propagates it. MUST NOT propagate the live key in a new commit.
