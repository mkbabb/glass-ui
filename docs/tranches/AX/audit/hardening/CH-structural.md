# CH-structural — adversarial red-team of the structural band (W25a/b, W26, W27a/b)

**Verdict: WEAK** (the gate-extension W25a is sound in design; the carve ROSTER that W25b/W26
clear against is materially STALE + INCOMPLETE at HEAD — three god-modules are unowned by ANY
carve wave, and every owned target has grown 7-22% past its doc-recorded line count).

HEAD `89edffc` (3.8.0 published + convergence W44-W61). Branch `at-dock-convergence`.
All wave docs baseline their measurements at `eaba94f`; the working tree has moved ~hundreds
of commits past that, and the line-count baselines are stale. This is the structural twin of
the AX cardinal lesson: the carve plan was authored against a snapshot and never re-verified
against the live tree it must carve.

---

## THE CARVE IS DEFERRED, AND THE ROSTER IS WRONG. Live `wc -l` at HEAD vs doc-claim:

| File | Doc-claimed | HEAD | Δ | Owner status |
|---|---|---|---|---|
| `tokens.css` | 1728 | **1983** | +255 | W25b (planned, BLOCKED behind W25a→W27a) |
| `dock.css` | 1227 | **1639** | +412 | W06 (planned) |
| `utilities.css` | 1119 | **1154** | +35 | W25b |
| `glass.css` | 691 | **795** | +104 | W25b (cohesion-not-length adjudication) |
| `dock-controls.css` | 486 (AU.W8b.3) | **531** | +45 | **UNOWNED — crossed 500, no carve wave** |
| `theme.css` | (not measured) | **514** | — | **UNOWNED — new >500 violator, in no roster** |
| `useMetaballRenderer.ts` | 569 | **690** | +121 | W26 (planned, blocked on W20) |
| `SegmentedTabs.vue` | (didn't exist) | **683** | — | **UNOWNED in W26 doc (FileBounds excludes it)** |
| `GlassDock.vue` | 476 (warn) | **534** | +58 | **UNOWNED as a `.vue` carve — crossed 500** |
| `constellationField.ts` | 510 | **510** | 0 | **UNOWNED — W17 (complete) pushed it over** |

Gate output at HEAD (`node scripts/proof-no-god-module.mjs`): 4 TS/Vue OVER (metaball 690,
SegmentedTabs 683, GlassDock 534, constellationField 510); 23 in the warn band. The gate is
STILL `.ts`/`.vue`-only (`proof-no-god-module.mjs:47`) and STILL `tags: ["local"]`
(`gates.mjs:344`) — W25a has not run, so the 6 CSS god-modules are invisible to the gate AND
the gate never enters CI. **The carve band is wholly deferred; nothing has been carved.**

---

## CHALLENGE 1 — Three god-modules are owned by NO carve wave (the roster gap)

The structural band's load-bearing premise is "every >500 file is enumerated and assigned to a
carve wave." That premise is false at HEAD on THREE files:

**(a) `constellationField.ts` (510, library component).** `src/components/custom/constellation/
constellationField.ts` is OVER the bound. W26's FileBounds does NOT list it. W17 — `complete` —
is the wave that pushed it over: W17 ADDED the focal-node model + `warpStep` integrator +
`nearestNode` to this exact file (`AX.W17 …:319`), and W17's ONLY deletion target was a SEPARATE
file (`src/decks/til-briefing/constellation.ts`, the 510-line slides-deck scanner — a different
file in a different tree). So a `complete` wave grew a library god-module over the ceiling and no
carve wave inherits it. `grep` for any wave that splits/carves `constellationField` →
empty.

**(b) `SegmentedTabs.vue` (683).** Created by W53 (`live-verified DEVELOPED`). W53's doc never
acknowledges it minted a 683-line violation (grep "683|god-module|500" over W53 → empty). The
MASTER-PLAN Batch 8 line CLAIMS "W26 (incl. the SegmentedTabs 683-line spillover)" — but the
W26 wave doc's FileBounds table has ZERO SegmentedTabs entry, ZERO mention of `tabs/`. The
MASTER-PLAN asserts an ownership the owning wave doc does not encode. W53 already has a
`composables/useTabIndicator.ts` (291 lines) split out, proving the split pattern exists in-tree
— but the 683-line SFC itself was shipped GREEN-by-blind-gate and assigned to a wave that
doesn't list it.

**(c) `GlassDock.vue` (534).** Crossed 500 since W26's doc was written (W26 records it at 476,
warn-band, explicitly OUT of W26 bounds → routed to "the W01 dock rewrite"). But W01 (`complete`)
only touches the VT-name/morph-script REGION of GlassDock.vue — it does NOT carve the file under
500, and W01's FileBounds edit is "remove the collapse startViewTransition + preserve the
route-morph name," not a size carve. W06 touches GlassDock.vue but ONLY type-narrows the rail
prop surface + rewrites JSDoc (`AX.W06 …:168`) — explicitly "NO morph-driver edits." So
GlassDock.vue at 534 is touched by 13 waves and carved-under-500 by NONE. The warn→OVER
transition silently re-homed the file into nobody's bounds.

These three are the structural form of the headless-green recurrence: a `complete`/`developed`
wave shipped a god-module GREEN because the gate is `.ts`/`.vue`-blind-to-CSS AND local-only, and
the OVER-limit TS/Vue files (metaball was the "sole" one W26 names; now there are FOUR) ship
GREEN-in-CI because the gate never runs in CI.

---

## CHALLENGE 2 — Two NEW CSS files crossed 500 and are in no carve roster

`dock-controls.css` is **531** (AU.W8b.3 carved it to 486; it has since grown +45 over the
ceiling). `theme.css` is **514**. W25a/W25b enumerate exactly FOUR CSS born-RED-CORRECT
violations (tokens/dock/utilities/glass). Once W25a's `.css` extension lands, the gate will
report SIX, not four — and W25b's "born-RED-CORRECT roster" (its close-criterion is "the four
are the ONLY new entries the `.css` extension surfaces") will be VIOLATED by construction: the
gate will surface six, the wave expects four, and W25a's adversarial-verify arm (twist ii:
"a fifth file crept over 500 → a non-local signal, halt + triumvirate") will FIRE. The wave is
authored to halt on exactly the condition that is already true at HEAD. `dock-controls.css` 531
+ `theme.css` 514 must be folded into the roster (dock-controls → W06's `src/styles/dock/`
sibling family; theme.css → W25b's tokens carve or its own seam) BEFORE W25a runs, or the
band self-halts on its own staleness.

---

## CHALLENGE 3 — Every owned target grew; W26's "sole TS violation" is now FOUR

W26 RED witness 1 states `useMetaballRenderer.ts` is "the SOLE `proof:no-god-module` TS
violation at HEAD" (569). At HEAD it is 690 (+121, grown through W46 blob-tune churn) and is one
of FOUR TS/Vue OVER-limit files. W26's entire framing — "SURGICAL: split one god-module + close
five gaps" — is built on a single-violation premise that is no longer true. The metaball file
grew +121 lines AFTER its doc froze, which means the ~170-line `uploadMetaballUniforms` extract
W26 specs (`:337-507` in the doc) no longer maps to the same line ranges; the split plan's
line-cited anchors are stale and the implementer will carve against a moved target. W26's
dependsOn (W08✓/W16✓/W20-planned) is partially blocked: W20 is `planned`, and W26's Move-7
detector-only finalize CANNOT land until W20 retires GlassPanel + deletes the filter exports.
W26 cannot start its largest arm cleanly.

---

## CHALLENGE 4 — The legacy-commentary violation count DOUBLED; W27a/b roster is stale

W27a RED witness 1 records 3 tranche-letter refs (`src/index.ts:130`, `api/index.ts:157/209`).
At HEAD `node scripts/proof-no-legacy-commentary.mjs` reports **6** violations — the count
doubled, and the LINE NUMBERS moved (now `api/index.ts:213/216/295/309`, `index.ts:127/170`).
NEW leaks since the doc froze: AX.W17 (`api/index.ts:216`), AX.W37 (`api/index.ts:295/309`,
`index.ts:170`). The W37 refs (`Canvas2D lifecycle substrate (AX.W37)`) landed from a
`complete` wave that re-homed the highlight composable and left tranche archaeology in the
production barrel. W27a scrubs "EXACTLY the 3 barrel refs"; there are now 6. The wave's
born-RED witness undercounts by half, and its close-criterion ("turn the 2-file gate GREEN")
will not be met by scrubbing only the 3 it names. The gate being `["local"]`-only (the exact
defect W27a fixes) is why W17/W37 leaked archaeology through CI unchallenged — the recurrence
W27a targets KEEPS HAPPENING while W27a sits planned.

---

## CHALLENGE 5 — The dependency chain serializes the whole band behind W27a→W25a, and W25b is over-blocked

The carve cannot start: W25b dependsOn `W25a, W06, W09, W22, W29` — FIVE predecessors, of which
W06/W29 are `planned`. W25a dependsOn W27a. W27a dependsOn W00 (✓). So the unblocking order is
W27a → W25a → (W06, W09✓, W22✓, W29) → W25b. The CSS carve — the highest line-count debt
(tokens 1983, dock 1639, utilities 1154) — sits at the BOTTOM of a 5-deep chain, behind two
planned waves. Meanwhile GlassDock.vue/dock.css are co-edited by **13** waves and the band
"cannot run concurrently" (every dock wave serializes on the shared dock files). The structural
band is the most-deferred, most-serialized, most-blocked band in the tranche, and its targets
grow every time an upstream dock/blob/aurora wave touches the shared files — a moving target the
carve never catches because it is gated behind the very waves that grow it.

---

## CHRONIC — the slip history

- **Gate-blindness recurrence (3+ tranches).** `proof:no-god-module` has been `.ts`/`.vue`-only
  AND `["local"]`-tagged since AV.W13. The `gates.mjs:344` note still promises "W6 gates-close
  folds it into the ci aggregate" — a fold that, per W25a's own text, "never bit." Across AV→AW→AX
  the gate shipped GREEN-in-CI-absence over 6 CSS god-modules + (now) 4 TS/Vue ones. W25a is the
  fix and has been `planned` since the AX charter; it has not run. The metaball file grew
  351→569→690 across this window with no CI pressure — the concrete witness W25a/W26 both cite,
  still accreting.
- **Stale-baseline-roster recurrence.** Every structural wave baselines at `eaba94f` and none was
  re-verified against HEAD before being marked ready. The MEMORY "stale-worktree trap" lesson
  (lanes seed at a stale base; mandate a step-0 reset + verify) applies verbatim here — the carve
  plan IS seeded at a stale base, and the W00 "live re-diagnosis ritual" each wave's Cadence
  step 1 mandates would have caught all of CH-1..4, but the waves are planned (not run), so the
  ritual never fired.
- **PROGRESS↔roster inflation.** MASTER-PLAN Batch 8 claims "W26 incl. the SegmentedTabs 683-line
  spillover" — an ownership the W26 doc does not encode. The same status-inflation class the
  cardinal lesson flags for "complete" marks, here at the plan-roster level.

---

## HARDENING ACTIONS (planning only — to PERFECT the structural band)

1. **Re-baseline the entire carve roster against HEAD before W25a runs (a W25a Cadence-step-0
   amendment).** Replace every `eaba94f` line count in W25a/W25b/W26/W27a/W27b with a live `wc -l`
   at HEAD, and re-enumerate the violation set. The CSS roster is SIX (add `dock-controls.css`
   531 + `theme.css` 514), not four; the TS/Vue roster is FOUR (add SegmentedTabs 683 + GlassDock
   534 + constellationField 510), not one. Encode this as a born-RED re-measure in the W00 live
   re-diagnosis ritual so the count never drifts again.

2. **Add a wave (or amend W26 FileBounds) to own the THREE unowned god-modules.** `constellationField.ts`
   (510) → a `constellation/` composable split (extract the `warpStep`/`nearestNode` integrator +
   `readPalette` into a `composables/` leaf, mirroring the tabs `useTabIndicator` precedent);
   `SegmentedTabs.vue` (683) → extract the variant/ARIA-role resolution + the responsive-collapse
   logic into composables (the SFC is 683 because it carries 4 former components' worth of logic
   inline); `GlassDock.vue` (534) → a `.vue` carve (the rail/region/aria surface is separable from
   the morph host). Assign each to a real FileBounds, not a MASTER-PLAN aside.

3. **Fold `dock-controls.css` 531 + `theme.css` 514 into the CSS carve roster (W06 / W25b).**
   dock-controls.css → W06's `src/styles/dock/` family (it is already the dock CSS family);
   theme.css → W25b (the `@theme` bridge can split into a `theme/` directory module along the
   color/radius/font-alias seams). Otherwise W25a's adversarial-verify twist-ii halts the band on
   "a fifth/sixth file crept over 500."

4. **Make the W25a gate extension report the WARN BAND climb as a tripwire, not just OVER.** 23
   files sit 301-500. Several (procedural-color.glsl 486, metaball.frag 476, mediums.glsl 463) are
   within ~25 lines of the ceiling and will cross it on the next shader feature wave. A
   warn-band-trend artefact (file, lines, Δ-since-last-tag) handed to the AX FINAL watch-list
   (W26 Move-8 already specs this — make it MANDATORY, with the re-baselined counts) so the
   roster is self-maintaining.

5. **Run W27a's barrel scrub against the CURRENT 6 violations + widen the gate scope first.** The
   3→6 climb proves the 2-file gate scope is the leak (W17/W37 added refs the 2-file gate didn't
   cover the source of). W27a should scrub all 6 AND its `proof:tag-parity` + `["local","ci","release"]`
   promote must land BEFORE the next dock/blob wave, or the legacy-commentary count climbs to 8.
   This is the forcing function that stops the recurrence — it is currently gated behind nothing
   (W00 is complete) and should run FIRST in the band, immediately.

6. **Prototype: a single `npm run proof:no-god-module` run wired into a re-baseline script** that
   diffs the live roster against the wave-doc-recorded counts and FAILS if any doc count is stale
   by >5%. This makes "the carve plan is seeded at a stale base" a machine-caught condition,
   closing the stale-baseline-roster recurrence for the whole tranche, not just this band.
