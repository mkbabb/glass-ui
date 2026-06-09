# Research-necessity audit — lane: tabs-slider (SegmentedTabs + the Slider pair)

**Question.** Both surfaces are decided+gated — SegmentedTabs (AX.W53 unified spring-slider family,
`proof:tabs-unified`) and the slider (AX.W59 two-only + AY.W-SLD1's landed round-knob resolution +
AY.W-SLD2's landed consumer-boundary clause). Verdict-check SETTLED, and enumerate any refinement
divinable for the indicator squish that the W-LIQUID re-point (the bespoke stretch deletes onto
`useLiquidFlex`) should inherit.

**Verdict: SETTLED.** No fresh external research is warranted for either surface. Every remaining
refinement is divinable from the corpus + the as-built code, and the ONLY adjacent genuine research
(the Siri-orb reference bands / drive-signal / WWDC26 freshness check) is already owned by the
sibling `research-necessity/liquid-glass.md` lane (§5) — duplicating it here would be churn. The
tabs squish corpus (AX.W53 §HandOff exact magnitudes, `R-tabs-segmented`, the liquid-glass
synthesis §1.1 squash derivation) plus the shipped code answer every open tuning question; the
slider design contradiction is RESOLVED on the record (W-SLD1 resolution (b), user-directed,
captured + π-read) and the consumer boundary is machine-locked (W-SLD2 clause 5, born-RED-proven).

> In-flight note: a Batch-2 finisher workflow is concurrently writing slider source. The W-SLD1 +
> W-SLD2 DELTAs, the inverted ROUND-KNOB gate clause, and AUDIT-LEDGER row 9 = DONE are all on disk
> at audit time; `Slider.vue`/`proof-slider-two-only.mjs` line-cites below are the working-tree
> state and may shift by a few lines at the finisher's commit. `PROGRESS.md:73-74` still reads
> `planned` for both slider waves — the roll-up lags the landed artefacts (see refinement 10).

---

## 1. Existing corpus (read in full)

| Artefact | What it settles |
|---|---|
| `docs/tranches/AX/waves/AX.W53-tabs-unify.md` | The unified family: variant axis, ARIA-role-per-variant, the squish atom (`--stretch` writer, reciprocal pairing, cap 1.08, tune band 1.06–1.10, PRM gate), the §HandOff exact magnitudes + live checks (all executed), and the "vs W23" flag that a shared `useSquish` family is the named future substrate — W-LIQUID is that substrate's second naming. |
| `docs/tranches/AY/audit/hardening/H-slider.md` | The 6-finding adversarial pass that re-scoped W-SLD1/W-SLD2 (stale premise, the design contradiction, the near-empty migration, the spectrum-fallback hole, the source-only gate, doc-currency). All six findings are now closed at HEAD. |
| `docs/tranches/AY/waves/AY.W-SLD1.md` + `audit/visual/W-SLD1-DELTA.md` | Resolution (b) revert+invert-gate LANDED: round knob (`border-radius: 50%`, `aspect-ratio: 1`) riding the continuous glass fill; gate clause 3 inverted to REQUIRE the circle; spectrum fallback lifted to `calc(var(--slider-thumb-size) * 0.7)`; user-judged light+dark captures + the engine-aware π readback (`tests-visual/slider-spectrum-fallback.spec.ts`). |
| `docs/tranches/AY/waves/AY.W-SLD2.md` + `audit/visual/W-SLD2-DELTA.md` | Clause 5 CONSUMER-BOUNDARY LANDED: `scanSliderVariants` exported (`proof-slider-two-only.mjs:139`), `TWO_ONLY_FLOOR` version-pin scope (`:68,398-400`), 7 consumers scanned, born-RED canary + planted-line bite captured. |
| `docs/tranches/AY/waves/AY.W-LIQUID.md` | The re-point plan: SegmentedTabs' bespoke stretch DELETES onto `useLiquidFlex` (gate 3, the deletion-proof) with "`proof:tabs-unified` stays green (behaviour-preserving swap)". |
| `docs/tranches/AY/audit/research-necessity/liquid-glass.md` | The sibling lane's verdict (engine ~85% divinable; research residue = Siri reference bands only) + its §4 divined refinements 1–8, several of which this lane confirms at exact lines. |
| `docs/tranches/AY/audit/hardening/b2/B2-readiness.md` | W-SLD1 RE-GROUND (W-GLASS landed first — honoured by the landed W-SLD1, which preserved the `--glass-level` legs); W-SLD2 READY. Both consumed. |
| `docs/tranches/AY/audit/AUDIT-LEDGER.md:38` (row 9) | DONE with resolution (b) recorded — corpus↔SFC↔gate tell one story. |

## 2. As-built state (grade: matches the corpus)

- **SegmentedTabs** — `src/components/custom/tabs/SegmentedTabs.vue` (689 ln): variant axis +
  multi-select + responsive + role-per-variant exactly per W53; the squish reads
  `scale: var(--stretch) calc(1 / var(--stretch))` at `:479` (underline X-only degenerate at
  `:637`), rest `--stretch: 1` at `:441`, anchor + JS paths both transition `scale` on
  `--spring-snappy`. Writer: `composables/useTabIndicator.ts:152-195` (distance-driven
  `frac = travel/containerW`, cap read off the cascade `:181-183` default 1.08, 60ms release timer
  `:191-194`, PRM early-return `:158`). Token minted `tokens.css:1503` (`1.08`).
  `proof:tabs-unified` (428 ln) locks the token (≤1.10), the reciprocal pairing, the writer, the
  PRM gate, and runs a fail-closed π live arm probing `--stretch > 1` mid-travel.
- **Slider** — `src/components/ui/slider/Slider.vue` (334 ln): round knob `:225-254`
  (`width: var(--slider-thumb-size)`, `aspect-ratio: 1`, `border-radius: 50%`), continuous glass
  fill `:191-215` (W-GLASS `--glass-blur-quiet` routing preserved `:199-206`), spectrum squircle
  `:300-326` (fallback `calc(… * 0.7)` at `:313`, `@supports corner-shape` PE tier `:322-326`).
  `proof-slider-two-only.mjs` (452 ln): inverted ROUND-KNOB clause (`isCircle` REQUIRED `:308-310`,
  `aspect-ratio: 1` asserted `:314-316`) + the W-SLD2 clause 5. `index.ts:14-37` JSDoc names the
  round-knob design (currency done). `demo/stories/compositions/dock-with-slider.vue` EXISTS
  (W-DOCK3 closed the H-slider Finding-5 doc-rot; CLAUDE.md's cite is now true).

## 3. README state

**MISSING (per-package) / CLAUDE.md ACCURATE.** Neither `src/components/custom/tabs/` nor
`src/components/ui/slider/` carries a README (unlike goo-blob/dock) — CLAUDE.md's `### SegmentedTabs`
and `### Slider keep-dock-open contract` sections are the doc home and both grade ACCURATE against
the as-built (variant axis, squish recipe + cap, role-per-variant, PRM gate, `proof:tabs-unified`;
keepDockOpen default-true, `data-held`, the now-real dock-with-slider story path). Two inline-comment
staleness nits, both one-liners (refinements 1 and 8 below). CLAUDE.md carries no slider thumb-shape
glance-line, so the W-SLD1 revert required no CLAUDE.md edit — consistent.

## 4. Divined refinements (no research required; the W-LIQUID-inheritance set)

The squish-specific items the W-LIQUID lane should INHERIT as pre-answered constraints — divined
from code + corpus, not from any new study:

1. **`useTabIndicator.ts:19-21` header says "velocity-driven"; the impl is DISTANCE-driven**
   (`:175-176`, `travel/containerW`). The comment pre-narrates the velocity form the synthesis
   prescribes (liquidglass-synthesis §1.1 "the deform decays exactly as the spring settles").
   Either re-sync the comment now or let the W-LIQUID re-point land the velocity form — but the
   doc must not claim velocity while the code is distance.
2. **Kill the 60ms second clock at the re-point.** `useTabIndicator.ts:143,186-194` releases
   `--stretch` on a `setTimeout(…, 60)` (cleared at `:241`) — the exact "no separate timer" flag in
   the synthesis + the W-MOTION2 one-clock doctrine. The `useLiquidFlex` swap should release on the
   spring's own settle (velocity-decayed), making gate 3 a behaviour-IMPROVING swap. (Confirms
   liquid-glass lane §4.2 with exact lines.)
3. **The deletion-proof is gate-coupled — W-LIQUID's file-bounds must include
   `scripts/proof-tabs-unified.mjs` (+ `tokens.css`, CLAUDE.md).** The source arm reads
   `useTabIndicator.ts` itself (`proof-tabs-unified.mjs:82`) and asserts `setProperty("--stretch"`
   AND the literal `--tab-indicator-max-stretch` INSIDE that file (`:188-190`); it also pins the
   token minted in tokens.css ≤1.10 (`:171-177`) and the literal reciprocal
   `scale: var(--stretch) calc(1 / var(--stretch))` in the SFC (`:182-183`). A clean-break re-point
   (writer moved into `useLiquidFlex`, token renamed `--liquid-max-stretch` per the
   no-backwards-compat rule) REDs all four clauses — so W-LIQUID §4.3's "`proof:tabs-unified` stays
   green" is true only with a lockstep gate re-statement (or a thin `useTabIndicator` adapter that
   keeps the writer call + token read in-file). Decide this in the W-LIQUID spec, not mid-build.
4. **W-LIQUID gate 2 (`sx·sy ≈ 1` every frame) needs the 1-D degenerate exemption.** The underline
   hairline squishes X-only (`SegmentedTabs.vue:637` `scale: var(--stretch) 1` — a 2px rule cannot
   meaningfully compress Y). The facility API wants a dimensionality axis (`both | x-only`); the
   volume-preservation invariant binds 2-D bodies only, else the deletion-proof REDs on underline.
5. **The multi-select squish exemption is a contract, not an accident.** `useTabIndicator.ts:138-140,
   152-157` early-returns under multi-select (N indicators pop in/out; nothing travels). The
   facility must preserve the exemption and record it, so gate 3's "behaviour-preserving" is
   checkable rather than vibes.
6. **Press-register cohesion: the segmented press rides `--spring-snappy` + a hardcoded 220 ms.**
   `SegmentedTabs.vue:220-238` (WAAPI `duration: 220` at `:236`) vs the CLAUDE.md §6 doctrine
   naming `--spring-smooth` as THE one press/scale register. W53 chose snappy deliberately (the
   CONTROL register, RED-4) — so either the doctrine table records the segmented press as the named
   control-register exception, or the W-LIQUID/W-COHERE pass unifies it; independently, lift the
   raw `220` onto the existing `readToken` idiom (`--duration-normal`) for token-first.
7. **One off-convention shadow leg.** `SegmentedTabs.vue:472-473` paints
   `0 1px 3px rgba(0, 0, 0, 0.08)` — the house rule composes shadows via
   `color-mix(in srgb, var(--shadow-color) N%, transparent)` (the sibling ring leg at `:474`
   already does). One-line W-COHERE/W-CSS1 fix; also makes the indicator shadow dark-adaptive.
8. **Stale comment in `Slider.vue`:** `:242` says "the `:active` `scaleX` squish below" but the
   W-SLD1 revert made the press a uniform `scale()` (`:266`, per the DELTA's "now a uniform
   `scale()` (was `scaleX`)"). One-line re-sync — flag to the in-flight finisher.
9. **The cascade-read cap pattern is the `--liquid-*` template.** `useTabIndicator.ts:181-183`
   resolves the cap via `getComputedStyle` per selection (per-instance retune, token-first, default
   in code). `--liquid-max-stretch` should lift this pattern verbatim (default 1.08, tune band
   1.06–1.10 from W53 §HandOff). No external input needed.
10. **PROGRESS roll-up currency.** `docs/tranches/AY/PROGRESS.md:73-74` holds W-SLD1/W-SLD2 at
    `planned` while their DELTAs + the inverted gate + ledger row 9 DONE are on disk — the exact
    roll-up-lag class in MEMORY (`project_workflow…`/live-verify-capture). One-line flip owed at
    the finisher's commit.

## 5. Genuine research gaps

**None for this lane.** The Siri-orb reference bands, the Apple drive-signal model, and the WWDC26
freshness check are real but are ALREADY scoped (narrowly, correctly) by
`research-necessity/liquid-glass.md` §5 — that lane's time-boxed reference-capture arm covers the
squish facility's only external unknowns. Re-opening tabs or slider research would re-tread
`R-tabs-segmented`/`R-apple-liquid` (the W53 inputs), the AX liquid-glass 32-facet corpus, and a
design decision the user has now personally ratified on a captured DELTA.

## 6. Recommendation

Close this lane SETTLED. Route refinements 1–5 + 9 into the W-LIQUID spec as pre-answered
constraints (the inheritance set — they convert gate-3's "stays green" from an assumption into a
plan); 6–7 to W-COHERE/W-CSS1; 8 + 10 as one-line doc-currency with the in-flight Batch-2 finisher.
No new research dispatch for tabs or slider.
