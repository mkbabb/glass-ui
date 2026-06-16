# BB.W-SLIDES-DRIVE — drive slides Tranche N to completion: the H-BA-gated adopt arm executes (4.0.0 published), then the deck consume-back at 4.1.0

**Name**: W-SLIDES-DRIVE - the slides union DRIVEN home (supersedes the coordination-only W-SLIDES-HANDOFF)
**Opens after**: Batch 5 open (the cross-repo adopt band). Phase 1's ADOPT arm needs only the published 4.0.0 (CLEARED — `npm latest = 4.0.0`); Phase 2's consume-back needs BB **W-DECK** shipped at the 4.1.0 cut (Batch P / §A1). Coordinates with W-ADOPT-RECONCILE + W-LINEAGE-PROBE (the same Batch-5 cross-repo hinge — slides is the named consumer constellation those waves add).
**Agents**: 2 serial — `.1` drives the slides N adopt arm (FC3-verified + ADOPT, foreign tree, agents read-only on git, orchestrator owns the slides index); `.2` is the Phase-2 deck consume-back (gated on W-DECK at 4.1.0 — slides retires its `src/deck/` onto `@mkbabb/glass-ui/deck`). The two phases sequence on the 4.1.0 cut, never run parallel.
**Hard gate**: the slides N tranche reaches its terminal state — Phase 1: the slides repo at the BA adopt (pin `4.0.0` exact, `DeckGate.vue` `solid`, the `deck.css` gray-arm opt-out DELETED) with the full slides proof suite + `vite build` green AND `fc-fourier G4` flipped GREEN against 4.0.0 with NO deck-side fourier edit, captured as a PAIRED DELTA on the slides fourier surface (the cardinal lesson — own-surface, not a commit claim); Phase 2: slides `src/deck/` retired onto `@mkbabb/glass-ui/deck`, re-pinned 4.1.0, the ≥2-consumer zero-duplication law closed. N.W-DEPLOY is NOT this wave's gate — it waits on H-DEPLOY (the user's re-publish greenlight; push/deploy USER-DOMAIN). This wave's terminal is "the slides tree is adopt-ready + consume-back-complete, locally green, captured", NOT "deployed".
**Status**: SPEC

## The charge

The user directed BB to **drive the extant slides Tranche N in totality** — the foreign-tree fence is LIFTED for slides ONLY (the orchestrator owns the slides index; agents stay read-only on git; the push/deploy is USER-DOMAIN per slides N §4.7 invariant 7). H-BA (the BA 4.0.0 publish) is CLEARED — published this turn (`npm view @mkbabb/glass-ui version` = `4.0.0`). So the entire H-BA-gated arm of slides N is unblocked.

**The state at HEAD (re-grounded this authoring — the slides repo has ADVANCED past N.md's `c943a49` authoring base to `b538506`/`f3c4170e`).** The slides executable-now band is ALREADY LANDED and committed:
- **N.W-FC1** (honesty pass) is `live-verified` (`slides docs/tranches/N/PROGRESS.md:59`): the metric is named `L2 macro-F1` (`PRESENTATION.md:41,68`, `BRIEF.md:62`), `grep "balanced acc\|balanced score\|balanced measure" src/decks/feedback-coder/ = 0` (confirmed), the retracted-0.72-floor sites are GONE (rephrased to "below the panel, by one class"), machine-locked by `proof:feedback-coder-honesty` (`slides package.json:18`, born-RED 25 hits → GREEN).
- **N.W-FC2** (J-unstrand) is `complete`: `git ls-tree main -- docs/tranches/J` resolves (13 files, the `J.md` unexecuted-marker banner present) — the A-clean cherry-pick, NEVER a branch merge.
- **N.W-GATE** (parity + machine-lock) is `complete`, and a W-GATE-surfaced **N.W-FC4** (the 266 sub-floor type-lift) is `live-verified` — both past the original N.md scope (the orchestrator discovered + fixed the feedback-coder legibility floor in the executable-now band).

So Phase 1's "executable NOW" half (FC1/FC2/GATE) is DONE; this wave does NOT re-do it. **The live remaining Phase-1 work is the H-BA-gated arm** the slides repo still carries as `planned` (`slides PROGRESS.md:63-65`):
- **N.W-FC3-verified** — `fc-fourier G4` (the hero warm-hue lean) is the ONE failing e2e at the R14 baseline (`tests/e2e/fc-fourier.spec.ts`, the nine-gate Fourier audit; banked R5-11). The deck is CORRECTLY WIRED — it consumes glass-ui's `FourierField` faithfully; G4 is a glass-ui 3.13.0 FourierField-rebuild consumer-regression, not a deck defect (slides N decision 3 / §4.3 invariant: NO deck workaround). It resolves when the BA FourierField root fix lands — which is IN 4.0.0. This wave re-pins, re-runs, and flips G4 GREEN with zero deck-side fourier edit.
- **N.W-ADOPT** — the BA 4.0.0 adopt, a 1-pin + 2-edit clean break (slides N decision 4 / §4.4): (pin) `@mkbabb/glass-ui` `3.13.0` → exact `4.0.0` (`slides package.json:30`, NOT a caret — the no-backwards-compat rule); (edit 1) `DeckGate.vue:70` `variant="primary-audacious"` → `variant="solid"` (re-grounded: still `primary-audacious` at HEAD — BA retires the audacious default register onto `solid`, the opaque-fill escape); (edit 2) DELETE the gray-arm self-engage opt-out `src/styles/deck.css:1013-1023` (re-grounded: the `.deck :where(.glass-material, …) { --glass-tint-strength: 0% … }` rule starting `:1013`, the `0%` at `:1017`, the `--muted-foreground` restore at `:1022` — it RETIRES per its own comment at `deck.css:1011` once BA W-DARK-MATERIAL scope 7 conditionalizes the self-engage, which it DID).

**The deck re-fork is the deeper why.** The slides deck RE-FORKED the glass ladder past slides Tranche A onto a COOL `--glass-frost` register that collides with W-NO-GRAY's warm floor (the BB.md §3 R9 row); the 3.13.0 unconditional self-engage then GRAYED the deck's frosted surfaces, forcing the `deck.css:1013-1023` opt-out as a defensive `--glass-tint-strength: 0%` block. BA 4.0.0 now SOLVES the exact problem at the library root — the self-engage is conditionalized to the bright bucket (the content tier self-engages only the sub-perceptual `--glass-tint-strength-floor`, not the full AA darken), so the deck's defensive opt-out is dead weight that DELETES. The adopt is not a mechanical pin-bump; it is the deck's fork RECONCILING onto the library's warm-glass identity that finally fits it.

**Phase 2 — the deck consume-back (the ≥2-consumer law's close).** BB **W-DECK** (§A1 P0) lifts slides' own `src/deck/` (~1,600 LoC, unit+e2e-tested — slides is the NAMED donor) into a SIBLING `@mkbabb/glass-ui/deck` subpath. Once W-DECK ships at the 4.1.0 cut, slides retires its `src/deck/` onto the published glass-ui deck and re-pins 4.1.0 — the zero-duplication law the L invariant-8 ≥2-consumer bar demands (speedtest's survey machine is consumer #1; slides consuming-back is consumer #2). This is direction-(b) of the deck-subpath disposition book, finally closed.

## §0 — RE-GROUND (mandatory step-0; re-read the slides sibling at HEAD before any edit; agents read-only on git everywhere)

This wave DRIVES a foreign tree (slides) that the orchestrator owns the index of — so the §0 discipline is doubly binding: the slides repo has ADVANCED past N.md's authoring base, and a stale cite is re-located against the SLIDES HEAD, never trusted from the N.md table. Before any edit the executor re-reads the slides N PROGRESS (the terminal-state truth, not N.md's planned table) + the three adopt-edit sites + the fc-fourier spec at the slides HEAD; if a cite has drifted (a slides commit moved a line, a row already flipped), the agent records the drift in PROGRESS and re-locates — it does NOT re-invent. The slides agents are READ-ONLY on git (the slides §4.7 invariant 7 + the hardened-agent git clause); the re-pin, the cherry-pick, the ledger flip, the push are ORCHESTRATOR/USER acts.

Grounding findings — re-verified at the slides HEAD this authoring (`/Users/mkbabb/Programming/slides` on `main` at `f3c4170e`, the executable-now band committed at `b538506`):

```
# ── glass-ui side (the publish state — H-BA cleared) ──
npm view @mkbabb/glass-ui version                       # 4.0.0 (CONFIRMED — the exact pin target)
npm view @mkbabb/glass-ui dist-tags                     # { latest: '4.0.0' }

# ── slides side (re-read at HEAD — the foreign tree this wave drives, read-only on git) ──
cd /Users/mkbabb/Programming/slides
git log --oneline -2                                    # f3c4170e (coord), b538506 (the executable-now band)
sed -n '58,66p' docs/tranches/N/PROGRESS.md             # the LIVE row state: FC1 live-verified, FC2/GATE complete, FC4 live-verified, FC3/ADOPT/DEPLOY/CLOSE planned

# 1. The executable-now band is DONE (do NOT re-do — confirm, then move to the gated arm)
grep -rn "balanced acc\|balanced score\|balanced measure" src/decks/feedback-coder/   # 0 hits (FC1 landed)
grep -rn "macro-F1\|L2 macro" src/decks/feedback-coder/PRESENTATION.md                # macro-F1 named (FC1 landed)
git ls-tree main -- docs/tranches/J                     # the J tree resolves on main (FC2 landed)
grep -n "feedback-coder-honesty\|deck-copy-conformance\|type-floor:feedback" package.json  # the parity gates (GATE landed)

# 2. N.W-FC3-verified — the ONE failing e2e (the BA root fix resolves it)
sed -n '1,30p' tests/e2e/fc-fourier.spec.ts             # the nine-gate Fourier audit; G4 is the hero warm-hue lean
grep -rn "G4\|fc-fourier" docs/tranches/M/audit/visual/W-R15-DELTA.md   # banked R5-11 (the pre-existing 3.13.0 regression)

# 3. N.W-ADOPT — the 1 pin + 2 edits (re-grounded; all THREE still at the pre-adopt state)
grep -n '"@mkbabb/glass-ui"' package.json               # "3.13.0" (pin still pre-adopt — re-pin to 4.0.0 exact)
grep -n 'primary-audacious' src/views/DeckGate.vue      # :70 variant="primary-audacious" (STILL — re-point to solid)
sed -n '1011,1024p' src/styles/deck.css                 # the gray-arm opt-out block (1013-1023; the :1011 RETIRES comment)

# 4. The deploy fence (NOT this wave's gate — recorded for the hand-off)
grep -n "noindex\|holding\|H-DEPLOY" docs/tranches/N/N.md   # production is a noindex holding page; the deploy waits on the user
```

Captures / authority cross-references:
- `/Users/mkbabb/Programming/slides/docs/tranches/N/N.md` (the tranche being driven; §0 directives, §3 the two hinges, §4.7 the agents-read-only-on-git + push-USER-DOMAIN invariant) and `docs/tranches/N/PROGRESS.md` (the LIVE row state — the terminal-state truth that supersedes N.md's planned table).
- `docs/tranches/BB/BB-AMENDMENT-crossrepo.md §A2` (the SLIDES-DRIVE band charge: Phase 1 NOW, Phase 2 after W-DECK at 4.1.0, the fence LIFTED for slides) + `§A4` (the cross-repo dep graph + consume cadence).
- `docs/tranches/BB/BB.md §3` (the slides reports row — the deck's re-fork onto `--glass-frost`; the R9 "why so gray" lineage) + `§4` (the fold-all → 4.1.0 version strategy; the deploy rides the user's separate re-publish greenlight).
- BB **W-DECK** (`BB-AMENDMENT §A1` P0) — the named owner of the `@mkbabb/glass-ui/deck` subpath the Phase-2 consume-back retires slides' `src/deck/` onto.
- `[project_slides_tranche_n_union]` (the union memory: executable-now band committed at `b538506`; production HELD; adopt waits on BA publishing — now unblocked).

## The defect/work table (file:line — RE-GREP at the SLIDES HEAD)

| # | slides wave | file:line (the state at the slides HEAD) | the work | phase |
|---|---|---|---|---|
| 1 | N.W-FC3-verified | `tests/e2e/fc-fourier.spec.ts` (the nine-gate audit; G4 the hero warm-hue lean); banked R5-11 (`M/audit/visual/W-R15-DELTA.md`) | re-run G4 against the 4.0.0 pin; it flips GREEN on the BA FourierField root fix with NO deck-side fourier edit; PAIRED DELTA on the fourier surface | P1 |
| 2 | N.W-ADOPT (pin) | `package.json:30` `"@mkbabb/glass-ui": "3.13.0"` | re-pin to exact `4.0.0` (orchestrator git act; NOT a caret — the clean-break rule) | P1 |
| 3 | N.W-ADOPT (edit 1) | `src/views/DeckGate.vue:70` `variant="primary-audacious"` | re-point to `variant="solid"` (BA retired the audacious default onto the opaque-fill escape) | P1 |
| 4 | N.W-ADOPT (edit 2) | `src/styles/deck.css:1013-1023` (the `.deck :where(…) { --glass-tint-strength: 0% … }` opt-out; the `:1011` RETIRES comment) | DELETE the block (the self-engage conditionalization in BA W-DARK-MATERIAL scope 7 makes the deck's defensive opt-out dead weight) | P1 |
| 5 | N.W-DEPLOY | production is a noindex holding page (taken down 2026-06-12) | NOT this wave's gate — waits on H-DEPLOY (the user's re-publish greenlight); the orchestrator runs pre-flight + post-push live DELTA, THE USER pushes/deploys | hand-off |
| 6 | Phase-2 consume-back | `slides src/deck/` (~1,600 LoC; the W-DECK donor) | once W-DECK ships at 4.1.0: retire `src/deck/` onto `@mkbabb/glass-ui/deck`, re-pin 4.1.0, zero duplication | P2 |

## Scope (gestalt, not workaround — the deck's fork RECONCILES onto the library identity; no slides legacy code; idiomatic transpositions)

1. **Drive N.W-FC3 to its VERIFIED state (the no-deck-workaround proof).** The slides deck consumes glass-ui's `FourierField` faithfully (slides N decision 3 — the hero warm-hue lean is a LIBRARY regression, the deck stays correctly wired). Once the pin moves to 4.0.0 (scope 2), re-run the slides fc-fourier e2e suite; `fc-fourier G4` flips GREEN against the BA FourierField root fix WITHOUT a single deck-side fourier edit (the slides §4.3 invariant — no deck hue patch). The proof is a PAIRED DELTA on the slides fourier surface (the hero hue resolves to the design ink, not the warm lean) under the slides capture protocol (`audit/visual/CAPTURE-PROTOCOL.md`). If G4 does NOT flip on the 4.0.0 pin, that is a glass-ui FourierField-fix-incomplete finding owed BACK to the glass-ui side (a triumvirate to the FourierField root, NOT a deck workaround) — recorded, never patched in the deck.

2. **Drive N.W-ADOPT — the 1-pin + 2-edit clean break (the deck's fork onto the warm-glass identity).** The three edits, each re-grounded at the slides HEAD: (pin) `package.json:30` `"3.13.0"` → exact `"4.0.0"` (NO caret — the no-backwards-compat clean pin; the orchestrator's git act); (edit 1) `DeckGate.vue:70` `variant="primary-audacious"` → `variant="solid"` (BA retired the audacious default register; `solid` is the opaque-fill escape, no alias); (edit 2) DELETE `deck.css:1013-1023` — the gray-arm self-engage opt-out block — in FULL (its own `:1011` comment names the retirement trigger: "RETIRES when glass-ui BA W-DARK-MATERIAL scope 7 conditionalizes the self-engage", which it did). The deletion is the headline: the deck's defensive `--glass-tint-strength: 0%` fork dies because the LIBRARY now does the right thing — the deck's `--glass-frost` cool register reads through the conditionalized self-engage without graying. Re-run the full slides proof suite + `vue-tsc --noEmit && vite build`; capture PAIRED DELTAs confirming the DeckGate button + the deck glass surfaces render correctly under BA (1280×720 + 390×844, light + dark).

3. **Record the deploy hand-off (N.W-DEPLOY waits on H-DEPLOY — NOT this wave's gate).** Production is a noindex holding page (taken down 2026-06-12 by user directive); the deploy waits on the user's explicit re-publish greenlight. This wave's terminal is "the slides tree is adopt-ready, locally green, captured" — NOT "deployed". The orchestrator runs the local pre-flight (the full slides proof suite + `vite build` green at the BA-adopted HEAD; both decks present in the gallery) and BOOKS the post-push live DELTA (`curl -sI` home + `/til-briefing` + `/feedback-coder` → 200; a live capture from `slides.friday.institute` for both decks) to the moment the user pushes. THE USER pushes/deploys (slides §4.7 invariant 7 + the hardened-agent git clause); the agent NEVER pushes. Both decks publish together (one Vite build, one CF Pages project — slides §4.1 invariant 1; there is no per-deck deploy seam).

4. **Phase 2 — the deck consume-back (gated on BB W-DECK at 4.1.0; the ≥2-consumer law's close).** Once BB W-DECK ships the `@mkbabb/glass-ui/deck` subpath at the 4.1.0 cut, slides retires its `src/deck/` (~1,600 LoC — the W-DECK donor) onto the published glass-ui deck: replace the local `useDeck`/`useDeckKeyboard`/`<DeckPager>`/`pagerWindow`/the `aria-live` announcer/`--spring-deck` consumers with imports from `@mkbabb/glass-ui/deck`, delete the donated `src/deck/` tree (clean break — no parallel fork survives), re-pin `4.1.0` exact. The slides deck e2e suite (focus-guard, pager-window-focus-survival, the aria-live announcer) re-runs GREEN against the published deck — the zero-duplication law (L inv-8 ≥2-consumer bar: speedtest survey = consumer #1, slides consume-back = consumer #2) closed. This phase does NOT run until W-DECK lands; it is the §A2 Phase-2 charge, sequenced on the 4.1.0 cut.

5. **The orchestrator owns the slides index; agents read-only on git; the fence LIFTED for slides ONLY.** Every git act in the slides tree (the re-pin, the ledger `--tranche` flip if it moves, the deck-retire commit, the Phase-2 consume-back) is an ORCHESTRATOR act; the fanout agents READ the slides tree and AUTHOR the DELTAs/PROGRESS rows but NEVER `git add`/`commit`/`push` (slides §4.7 invariant 7). The push + the CF Pages deploy are USER-DOMAIN. The fence is LIFTED for slides ONLY — kf/vjs/speedtest stay by-name-asks (W-CROSSREPO-ASKS owns those; no edits to their trees).

## Triumvirate Dispatch

- **G4 does NOT flip on the 4.0.0 pin.** If re-running `fc-fourier G4` against the exact 4.0.0 pin leaves the hero warm-hue lean (the deck correctly wired, the library fix incomplete), that is a glass-ui FourierField-root finding, NOT a license for a deck hue patch (slides §4.3 invariant — no deck workaround). Triumvirate to the glass-ui FourierField root (research whether the BA fix reached the hero-seed warm path; decide the glass-ui-side fix or the honest "G4 is a 4.1.0-deferred glass-ui book"). The deck stays correctly wired; the slides side never patches around a library bug.
- **The adopt reveals a SECOND surface the deck re-forked.** If deleting the `deck.css:1013-1023` opt-out un-covers a NEW gray/legibility defect on a slides surface the 3.13.0 self-engage was MASKING (a second deck `--glass-frost` fork the opt-out also shielded), that is a deck-fork-deeper-than-cited scope-reveal — triumvirate (research the deck's full `--glass-frost` fork surface vs the BA warm-glass identity; decide the deck-reconcile edits or a glass-ui-side seam gap). Do NOT re-add a defensive opt-out (the workaround the adopt is meant to retire); the deck reconciles onto the library, never re-forks.
- **The deck consume-back reveals a `@mkbabb/glass-ui/deck` shape gap.** If Phase 2 finds the published deck subpath cannot carry a slides consumer's need (a `pagerWindow` option the donated shape dropped, a focus-guard the lift missed), that is a W-DECK seam-shape reveal — triumvirate back to W-DECK (the donor wave), NOT a slides-local re-fork of the deck. The consume-back is zero-duplication by law; a shape gap is fixed at the published primitive.
- **Diagnostic loop halt** — if the slides full proof suite still reds after the adopt edits and three iterations have not isolated whether it is a residual deck-fork surface, a stale slides gate reading the pre-adopt shape, or a genuine 4.0.0 consumer-break, halt and triumvirate. The suspect is the deck's `--glass-frost` fork still colliding with the warm floor on a surface the cited opt-out did not name.

## File Bounds

This wave's edits live in the FOREIGN slides tree (the fence LIFTED for slides) + the glass-ui-side DELTA/PROGRESS record. Agents are READ-ONLY on git in BOTH trees; the orchestrator owns the slides index.

| File | Access |
|---|---|
| `slides:package.json` | modify (the `3.13.0` → exact `4.0.0` pin; ORCHESTRATOR git act — the re-pin) |
| `slides:src/views/DeckGate.vue` | modify (`:70` `primary-audacious` → `solid`) |
| `slides:src/styles/deck.css` | modify (DELETE the `1013-1023` gray-arm opt-out block in full) |
| `slides:src/deck/**` | modify/delete-IF (Phase 2 ONLY, gated on W-DECK at 4.1.0 — retire onto `@mkbabb/glass-ui/deck`; the consume-back) |
| `slides:src/decks/**` (the deck consumers of `src/deck/`) | modify-IF (Phase 2 — re-point the local `useDeck`/`<DeckPager>` imports onto the glass-ui deck subpath) |
| `slides:docs/tranches/N/PROGRESS.md` | modify (flip FC3 → live-verified, ADOPT → live-verified; the Phase-2 consume-back row; the deploy hand-off note) |
| `slides:docs/tranches/N/audit/visual/N.W-FC3-DELTA.md` | create (the fourier-surface PAIRED DELTA — G4 resolves to the design ink under 4.0.0) |
| `slides:docs/tranches/N/audit/visual/N.W-ADOPT-DELTA.md` | create (the DeckGate button + the deck glass surfaces under BA; 1280×720 + 390×844, light + dark) |
| `docs/tranches/BB/audit/visual/W-SLIDES-DRIVE-DELTA.md` | create (the glass-ui-side record: the slides adopt-readiness proof + the cross-repo consume cadence + the deploy hand-off) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge rows; the Phase-1-done / Phase-2-gated ledger; the H-DEPLOY hand-off) |

Do NOT touch:
- **The slides executable-now band (FC1/FC2/GATE/FC4)** — already LANDED + machine-locked at the slides HEAD (`b538506`). This wave drives the H-BA-gated arm ONLY; it does NOT re-author the honesty pass, the J-unstrand, or the parity gates (re-grounded as DONE; a re-do would re-strand or churn the committed band).
- **The slides deck COPY (the honesty corrections)** — `proof:feedback-coder-honesty` machine-locks them; the adopt is a pin + 2 surface edits + a fourier re-verify, NOT a copy edit. No re-touch of the metric name / the rephrased floor / the 258-vs-1845 framing.
- **The slides push + the CF Pages deploy** — USER-DOMAIN (slides §4.7 invariant 7). The agent runs the local pre-flight + authors the post-push live-DELTA protocol; THE USER pushes. N.W-DEPLOY is the user's act on H-DEPLOY.
- **The kf/vjs/speedtest trees** — the foreign-tree fence HOLDS for them (W-CROSSREPO-ASKS owns the by-name asks; no edits). The fence is LIFTED for slides ONLY.
- **The glass-ui FourierField root + `aurora.frag`/`metaball.frag`** — the BA FourierField fix is SHIPPED in 4.0.0; this wave CONSUMES it (the G4 re-verify), it does not re-touch the library renderer. If G4 fails to flip, the finding is BOOKED to the glass-ui FourierField root (triumvirate), never patched.
- **The 4.1.0 deck subpath (`@mkbabb/glass-ui/deck`)** — W-DECK (Batch P) owns the donor lift + the subpath mint. This wave's Phase 2 CONSUMES the published subpath; it does not author it. A shape gap routes back to W-DECK.

### Disjointness

Two phases, serial on the 4.1.0 cut:
- **W-SLIDES-DRIVE.1 (Phase 1 — the 4.0.0 adopt arm)** drives the slides FC3-verify + ADOPT (the pin + DeckGate + deck.css-delete + the two DELTAs). It needs only the published 4.0.0 (cleared). It writes the slides adopt-edit sites + the slides FC3/ADOPT DELTAs + the BB-side record. It does NOT touch the deck subpath (W-DECK's) or re-author the executable-now band.
- **W-SLIDES-DRIVE.2 (Phase 2 — the deck consume-back)** retires slides' `src/deck/` onto `@mkbabb/glass-ui/deck` + re-pins 4.1.0. It is GATED on W-DECK shipping at the 4.1.0 cut — it does NOT run until W-DECK lands. It reads the published deck subpath; it does not author it.

Across Batch 5: W-PEER-SPINE (the value.js peer range), W-ADOPT-RECONCILE (the consumer-staleness/phantom-classes/resolution close-loop — slides is a named consumer it adds), W-EASING-PRIMITIVE (the EasingPicker), W-LINEAGE-PROBE (the registry-consumer probe gate — adds slides + the Atlas to the constellation). This wave is the slides-DRIVE concern; W-ADOPT-RECONCILE + W-LINEAGE-PROBE NAME slides as a consumer in the constellation but do NOT edit the slides tree (this wave owns the slides edits). The ONE coordination seam: the slides pin this wave moves (4.0.0 → 4.1.0 across the phases) is the consumer-truth W-LINEAGE-PROBE's probe reads — sequence the pin (this wave moves it, the probe reads it).

## Hard Gate

The slides N tranche reaches its terminal state — Phase 1 + Phase 2 each with born-RED falsifiable witnesses (each red at HEAD pre-wave):

1. **W1 — N.W-FC3 flips to VERIFIED (the no-deck-workaround proof).** With the pin at exact 4.0.0, `fc-fourier G4` passes in the slides e2e suite WITH zero deck-side fourier edit (a `git diff` of the slides fourier surface across the adopt shows the pin + the two adopt edits ONLY, no hue patch). RED at HEAD: G4 fails against the 3.13.0 pin (the banked R5-11 regression). Assert shape: the slides `fc-fourier` spec exits 0 against 4.0.0 AND the `N.W-FC3-DELTA.md` records the fourier-surface PAIRED DELTA (the hero hue resolves to the design ink, not the warm lean) with the AZ-form freshness header (capture date, slides HEAD sha, the 4.0.0 pin).
2. **W2 — N.W-ADOPT lands the clean break.** The slides pin is exact `4.0.0` (NOT a caret); `DeckGate.vue:70` reads `variant="solid"`; the `deck.css:1013-1023` gray-arm opt-out block is GONE (deletion proof — `grep "--glass-tint-strength: 0%" src/styles/deck.css` returns ZERO on the opt-out selector). RED at HEAD: pin `3.13.0`, `DeckGate.vue:70` `primary-audacious`, the opt-out block present (all three re-grounded at HEAD). Assert shape: the slides full proof suite + `vue-tsc --noEmit && vite build` green at the adopt HEAD; the `N.W-ADOPT-DELTA.md` records the DeckGate button + the deck glass surfaces under BA (1280×720 + 390×844, light + dark) with the freshness header.
3. **W3 — the deploy hand-off is recorded, NOT executed (the USER-DOMAIN guard).** The slides tree is adopt-ready (W1 + W2 green, both decks present in the gallery, the local pre-flight green) AND the push is BOOKED to H-DEPLOY (the user's greenlight), NOT executed by an agent. RED-equivalent at HEAD: vacuously — W3 is the FENCE guard. Assert shape: the BB-side record names N.W-DEPLOY as a USER-gated hand-off (the agent ran pre-flight + authored the post-push live-DELTA protocol; the agent did NOT push); a `git log` of the slides tree shows ZERO agent-pushed commit (the orchestrator's index ownership + the user's push are the only git acts).
4. **W4 — the Phase-2 consume-back closes the zero-duplication law (gated on W-DECK at 4.1.0).** Once W-DECK ships `@mkbabb/glass-ui/deck` at the 4.1.0 cut, slides' `src/deck/` is RETIRED onto it (the donated tree deleted, the consumers re-pointed at the subpath, the pin re-bumped 4.1.0), and the slides deck e2e suite (focus-guard, pager-window-focus, the aria-live announcer) re-runs GREEN against the published deck. RED at HEAD: slides carries its OWN `src/deck/` (the duplication; W-DECK has not yet shipped — this witness is INERT until the 4.1.0 cut, by design). Assert shape: at the 4.1.0-cut close, `slides src/deck/` is GONE (deletion proof), the consumers import `@mkbabb/glass-ui/deck`, the pin is `4.1.0`, the deck e2e green — the ≥2-consumer zero-duplication law closed (speedtest survey = #1, slides = #2). **Bite (anti-evasion):** the consume-back must DELETE `src/deck/` (a re-pin that leaves the local fork alongside the import is the duplication the law forbids — caught by the deletion proof).

**The DELTA capture (the cardinal lesson — own-surface, AZ-form freshness):** the slides-side `N.W-FC3-DELTA.md` (the fourier surface — G4 resolved under 4.0.0) + `N.W-ADOPT-DELTA.md` (the DeckGate button + the deck glass surfaces, both viewports, both modes) are the binding visual truth, each with the AZ-form freshness header (capture date, slides HEAD sha, the exact pin); the glass-ui-side `W-SLIDES-DRIVE-DELTA.md` records the cross-repo adopt-readiness proof + the consume cadence + the deploy hand-off. There is NO `proof:ba-gestalt` requirement on the glass-ui side (this wave paints zero new glass-ui pixels — the BA register fixes it consumes are already gestalt-verified in the BA close); the binding truth is the SLIDES surface DELTAs (the deck rendering correctly under the adopted library) + the slides proof suite green. The cardinal-lesson inflation the user named (a "live-verified" commit claim with no captured DELTA) is forbidden — the slides flip past `live-pending` needs the on-disk PAIRED capture (slides §4.6 invariant 6).

## Format And Lint Cadence

In the slides tree (read-only on git): `vue-tsc --noEmit && vite build` after the adopt edits (the pin + DeckGate + deck.css-delete must build clean under 4.0.0); the full slides proof suite (`proof:deck-copy-conformance` over BOTH decks, `proof:type-floor` over both, `proof:feedback-coder-honesty`, `proof:live-verified-ledger --tranche=N`) green at the adopt HEAD; the slides `fc-fourier` e2e run against 4.0.0 (G4 green) before the FC3 flip; the slides capture protocol (`audit/visual/CAPTURE-PROTOCOL.md`) for the two PAIRED DELTAs. Phase 2: `vue-tsc --noEmit && vite build` + the slides deck e2e after the consume-back, against the 4.1.0 pin. `git diff --check` before each orchestrator commit. No glass-ui-side build/typecheck (this wave does not edit glass-ui source — it consumes the published 4.0.0/4.1.0).

## Verification Artefacts

- `slides:docs/tranches/N/audit/visual/N.W-FC3-DELTA.md` — the fourier-surface PAIRED DELTA (G4 resolved to the design ink under 4.0.0; freshness header).
- `slides:docs/tranches/N/audit/visual/N.W-ADOPT-DELTA.md` — the DeckGate button + the deck glass surfaces under BA (1280×720 + 390×844, light + dark; freshness header).
- `docs/tranches/BB/audit/visual/W-SLIDES-DRIVE-DELTA.md` — the glass-ui-side cross-repo record: the slides adopt-readiness proof, the consume cadence (4.0.0 NOW → 4.1.0 deck consume-back), the deploy hand-off to H-DEPLOY.
- The slides full proof suite green log at the adopt HEAD (`proof:live-verified-ledger --tranche=N` green).
- The slides `fc-fourier` e2e green-against-4.0.0 log (G4).
- Phase 2: the slides `src/deck/`-deletion proof + the deck e2e green-against-4.1.0 log.

## Commit Plan

(Every slides git act is an ORCHESTRATOR commit — agents author the edits + DELTAs, the orchestrator owns the slides index; the push is USER-DOMAIN.)

- slides adopt commit (orchestrator, P1): `N: the BA 4.0.0 adopt — pin 3.13.0→4.0.0 exact · DeckGate primary-audacious→solid · DELETE the gray-arm opt-out (deck.css:1013-1023) · fc-fourier G4 resolved at the BA FourierField root (N.W-ADOPT + N.W-FC3-verified)` — body names the three edits + the G4 flip + the no-deck-workaround proof.
- slides DELTA/status commit (orchestrator, P1): the `N.W-FC3-DELTA.md` + `N.W-ADOPT-DELTA.md` + the slides PROGRESS flips (FC3/ADOPT → live-verified; the deploy hand-off note).
- slides consume-back commit (orchestrator, P2 — gated on W-DECK at 4.1.0): `N phase-2: retire src/deck/ onto @mkbabb/glass-ui/deck · re-pin 4.1.0 (the zero-duplication ≥2-consumer law closed)` — body names the deletion + the re-point + the deck e2e green.
- glass-ui-side doc commit: the `W-SLIDES-DRIVE-DELTA.md` + the BB PROGRESS rows (the Phase-1-done / Phase-2-gated / H-DEPLOY-handoff ledger).

## Dependencies

- **Depends on**: H-BA (the BA 4.0.0 publish — CLEARED, `npm latest = 4.0.0`) for Phase 1's adopt arm; BB **W-DECK** (Batch P, the `@mkbabb/glass-ui/deck` subpath shipped at the 4.1.0 cut) for Phase 2's consume-back. It reads the slides N PROGRESS (the live terminal-state truth) but re-verifies every cite at the slides HEAD. The slides executable-now band (FC1/FC2/GATE/FC4) is a PREREQUISITE that is already LANDED — this wave drives only the gated arm.
- **Blocks**: nothing in the glass-ui tranche structurally (it is a cross-repo DRIVE, not a library surface). It feeds W-LINEAGE-PROBE's consumer constellation (slides is a named registry consumer — the pin this wave moves is the consumer-truth the probe reads) and W-ADOPT-RECONCILE's close-loop (slides is the named adopt). N.W-DEPLOY (the user's act on H-DEPLOY) is BLOCKED on the user's re-publish greenlight, NOT on this wave — this wave's terminal is adopt-readiness + the deploy hand-off, never the deploy itself.

## Archaeology

Prior state: BB.md's Batch-5 **W-SLIDES-HANDOFF** was COORDINATION-ONLY ("no slides edit"). The user's 2026-06-16 directive (BB-AMENDMENT §A2) SUPERSEDES it — BB now DRIVES slides N in totality (the fence LIFTED for slides; the orchestrator owns the index; agents read-only on git; the push USER-DOMAIN). The slides union itself is the THIRD pass at the feedback-coder honesty work (skipped across slides L AND M); N does not skip a third time — and the executable-now band is now LANDED (the honesty pass machine-locked at `b538506`), so this wave inherits an honest, gate-covered deck and drives the last mile: the BA adopt (the deck's `--glass-frost` fork RECONCILING onto the library's warm-glass identity — the gray-arm opt-out finally dying because the LIBRARY does the right thing) + the fourier re-verify (the deck stays correctly wired; the library fix resolves G4) + the Phase-2 deck consume-back (the zero-duplication ≥2-consumer law closed). The cardinal lesson holds: the binding evidence is the captured slides-surface PAIRED DELTA with a freshness header, not a commit-message claim; the deploy is the user's act on the user's greenlight, never an agent push.

## Named successors

- **N.W-DEPLOY (the user's act on H-DEPLOY)** — the shared re-publication (both decks, one CF Pages project) on the user's re-publish greenlight. The orchestrator runs the pre-flight + the post-push live DELTA; THE USER pushes/deploys. NOT this wave's gate; the hand-off is recorded.
- **BB W-DECK (Batch P)** — the named owner of the `@mkbabb/glass-ui/deck` subpath the Phase-2 consume-back retires slides' `src/deck/` onto. A deck-subpath shape gap surfaced in the consume-back routes BACK to W-DECK (the donor wave), never a slides-local re-fork.
- **W-LINEAGE-PROBE (Batch 5)** — adds slides to the registry-consumer constellation (the d6 lesson's exact consumer). The pin this wave moves (4.0.0 → 4.1.0) is the consumer-truth the probe reads before any future prune.
- **The ONE conditional**: if N.W-FC3's G4 does NOT flip on the 4.0.0 pin (the BA FourierField fix incomplete on the hero-seed warm path), the finding is BOOKED to the glass-ui FourierField root (a 4.1.0 glass-ui-side book), NOT patched in the deck — the slides side stays correctly wired, the no-deck-workaround invariant absolute.
