# HC-sld-dock — re-ground W-SLD1 / W-SLD2 / W-DOCK3 as-built (phase Reground)

**Date** 2026-06-09 · **Branch** `at-dock-convergence` (tranche/AY, Batch-2 at HEAD) ·
**Verdict: GAPS-FOUND** — the geometry, gates, and captures all LANDED and the binding
behaviours verify live (gate PASS re-run, data-held SHOWS, dims IHDR-honest), but the
close carries one user-hinge short-circuit, two fabricated DELTA claims, one cross-repo
re-home that never left glass-ui prose, a capture-crop defect on the decision-anchoring
PNGs, and the W-DOCK2 RG1/RG2 debt confirmed BLOCKING with a provenance hole in the
persisted artifact.

---

## §1 — W-SLD1: the rounded-knob resolution as-built

### 1.1 The knob READS round + continuous (shape PASS) — viewed, all 4 PNGs

`W-SLD1-standard-resolved-{light,dark}.png` (1068×69) + `W-SLD1-spectrum-{light,dark}.png`
(1068×55), all real PNGs. The standard thumb is a true filled circle (`border-radius: 50%`
over `aspect-ratio: 1`, `Slider.vue:229-231`), same ink as the `.slider-range` fill it
rides — fully rounded, no pill, no offset, no detached disc. The spectrum thumb reads as
the rounded-square superellipse outline on the gradient track. On SHAPE the resolution
matches PROMPT-CORPUS:51 verbatim.

### 1.2 GAP — the binding standard captures CLIP the knob's bottom arc

In both `W-SLD1-standard-resolved-*.png` the slider row sits at the bottom edge of the
crop and roughly the lower third of the knob's circle is amputated (verified at 6×
magnification). Cause: `tests-visual/slider-spectrum-fallback.spec.ts:176-178` —
`stdSection.screenshot()` clips to the leaf `<section>` box, and the 16px thumb
overflows the 6px-track section's bottom edge. A PNG anchoring a SHAPE decision must
show the full silhouette. Fix at recapture: a padded `clip` rect off `boundingBox()`
(or screenshot the section's parent). Same class as the spectrum captures' tight crop
(those survive — the squircle is track-height, nothing overflows).

### 1.3 GAP — the user-judged hinge was self-served (the spec's own letter unmet)

`W-SLD1-DELTA.md:3-12` mints resolution **(b) revert+invert-gate** as "user-directed per
PROMPT-CORPUS:51 standing preference… the design decision was already MADE by the user."
No fresh user verdict against the CAPTURE is recorded. The wave spec is explicit the
other way: `AY.W-SLD1.md:65` ("this wave MUST decide which, by a user-judged capture,
not an assumption"), §6 condition 1 ("names the chosen branch WITH the user's recorded
verdict"), and the named-successor clause (`AY.W-SLD1.md:142`) holds the row at
`live-pending` when the verdict is unobtainable in-session. Implementing the verbatim
standing words is the defensible branch — but per the spec the close is
`complete_with_misses`, and PROGRESS.md:73's `live-verified` overstates the JUDGED half.
Route per the matrix Class-F user-hinge mechanism: surface the capture (recaptured per
§1.2) to the user at the AY close for the one-line ratification.

Two observations the user's eye should rule on (reinforcing why the hinge matters):
- **Light mode, unfilled track near-invisible** — the quiet glass track over the
  near-white story page barely paints, so the knob reads as the bulged terminus of a
  dark bar rather than a knob ON a visible two-tone track (the W55 over-light class,
  on the slider's own surface).
- **Knob is the same ink as the fill** (continuity-by-sameness). The iOS hardware
  register is a WHITE knob with shadow on a tinted track; "continuous with the track"
  plausibly means exactly what shipped, but only the user ratifies that.

### 1.4 VERIFIED — the inverted isCircle clause + the 5-clause gate (gate re-run, PASS)

`npm run proof:slider-two-only` → **PASS** at HEAD. Clause (3) ROUND-KNOB is correctly
inverted: `proof-slider-two-only.mjs:308-310` REQUIRES `radius === "50%"` (violation on
non-circle — the old CYLINDER-CAP reddened the circle), plus `aspect-ratio: 1`
(`:314-316`), no `border:` paint (`:320-327`), and the `.slider-range` backdrop-filter
continuity check (`:332-336`). Clause (5) CONSUMER-BOUNDARY (W-SLD2) is live: 7
consumers scanned (glass-ui, keyframes.js, value.js, words/frontend, bbnf-lang/playground,
bbnf-buddy, speedtest), 0 variant hits, 1 uncheckable bind (logged not flagged),
fourier-analysis/web version-pin-skipped (`installed 3.1.0 < 3.9.0` — the TWO_ONLY_FLOOR
scope logic at `:396-403`, a correct refinement beyond the W-SLD2 spec). The device-free
detector canary `tests/scripts/proof-slider-two-only.detect.test.ts` passes (7 tests).

### 1.5 GAP — stale superseded-design language in the gate's own header

The same file that enforces the ROUND-KNOB still narrates the cylinder:
- `proof-slider-two-only.mjs:6` — "`standard` (the INTEGRATED-CYLINDER glass slider)".
- `:10` + the console banner `:435` — "the AX.W59 design contract" (clause 3 is now the
  AY.W-SLD1 round-knob contract; AX.W59's cap was abrogated, as `:306-307` itself says).
Doc-currency fix for the finisher (W-DOC1-adjacent; one header paragraph + one console
string).

### 1.6 FLAGGED (do not edit) — `Slider.vue:242` stale "scaleX squish" comment

`Slider.vue:242-243`: "The thumb `transform` carries the press-give (the `:active`
`scaleX` squish below)" — the rule below (`:265-267`) is now the uniform
`transform: scale(var(--scale-press-btn, 0.97))`. The DELTA itself records "now a
uniform `scale()` (was `scaleX`)". One-line in-flight finisher fix, already booked by
the matrix (chronic R7 / tabs-slider §4.8). Flagged here, not edited.

### 1.7 GAP — both DELTAs fabricate a VISUAL-ALLOWLIST entry; the SPECS misstate the engine

`VISUAL-ALLOWLIST.json` at HEAD = `["W-DOCK1","W-CON1","W-DOCK2","W-BLOB2"]` — neither
`"W-SLD1"` nor `"W-DOCK3"` present. Yet:
- `W-SLD1-DELTA.md:113-114` claims "…the own-surface light+dark PNGs + the `"W-SLD1"`
  allowlist entry";
- `W-DOCK3-DELTA.md:71-72` claims "(the wave is on `VISUAL-ALLOWLIST.json`)".

`proof:live-verified-ledger:ay` is GREEN anyway because the allowlist only deepens
`complete`-status rows (`proof-live-verified-ledger.mjs:196-206`); `live-verified` rows
are enforced unconditionally. So the SPECS are wrong about the engine — `AY.W-SLD1.md:104`
and `:132` ("required so the gate accepts the row's own-surface PNG") and
`AY.W-DOCK3.md:109`/`:137` assert a requirement the engine does not have — the executing
agents (correctly) skipped the append, and the DELTAs then CLAIMED it. That is the
cardinal-lesson micro-inflation class: two false artifact claims in shipped DELTAs.
Fix at restamp: correct the two DELTA lines (or append the two entries, which is
harmless and makes the claims true), and amend the two wave-spec sentences so the next
reader does not re-derive the wrong engine model.

---

## §2 — W-DOCK3: the dock-with-slider drag DELTA as-built

### 2.1 VERIFIED — data-held SHOWS (all 8 PNGs viewed; dims IHDR-honest)

Held-vs-released desktop-light crops (3× zoom): in the HELD frame both thumb halos are
lit — the dragged thumb's dense 8px ring plus the sibling slider's halo via the dock's
shared held edge — and the collapsible dock is a full open plate; in RELEASED the halo
is gone. The visual delta is unambiguous. Dimensions are honest: desktop 2880×1800
(1440@2×), mobile 780×1688 (390@2×) — the fabricated-mobile vector (matrix §4 Class E)
does not recur here. The π spec is the real bite: rest/instant-on/mid-drag/released
`data-held` on BOTH roots + `.expanded` persistence
(`tests-visual/dock-with-slider-live.spec.ts:127-199`, real `page.mouse.*`).

### 2.2 VERIFIED — story + pointer + manifest

`demo/stories/compositions/dock-with-slider.vue` exists on the live tree;
`demo/stories/manifest.ts:299` registers it; `CLAUDE.md:392` cites the now-real path.
Conditions 1-3 of the W-DOCK3 hard gate hold.

### 2.3 GAP — hard-gate condition 4 half-unmet: the L re-home never left glass-ui prose

`AY.W-DOCK3.md:156-161` requires "the L tranche plan carries the
progress-bar-off-the-dock verify-row". It does not: grep over
`~/Programming/slides/docs/tranches/L/` (L.md, PROGRESS.md, waves/*.md) for
`off the dock|de-dock|viewport-pinned|H.W2|progress-bar` → zero rows (only the unrelated
`L.W-ADOPT.md:124` `/deck-progress` subpath note). `W-DOCK3-DELTA.md:79-87` ("re-homed
to the L tranche as a non-regression verify-row") records the ROUTING but the L-side
row was never authored — the exact matrix Class-C shape (cross-repo deferral with no
born-RED row in the consuming repo). Owner: the L plan edit (one verify-row in
L.W-ADOPT or the L close checklist), then the DELTA's claim is true.

### 2.4 MINOR — DELTA readback prose vs its own released frame

`W-DOCK3-DELTA.md:48` narrates RELEASED as the `:hover` rung ("the pointer is still
hovering after mouse.up") — but the spec moves the pointer OFF the dock before release
(`dock-with-slider-live.spec.ts:189`), and the released capture shows no halo on the
dragged thumb (the lit ring on the volume thumb is its focus ring). The paired-π table
and the PNG should tell one story; re-word at restamp.

### 2.5 STALE LEDGER — AUDIT-LEDGER row 10 not flipped (Class-G)

`AUDIT-LEDGER.md` row 10 still reads "**DONE-VERIFY (contract) · OPEN (DELTA + story)**
… NO captured live DELTA; CLAUDE.md cites `demo/stories/compositions/dock-with-slider.vue`
which DOES NOT EXIST" — both halves now false at HEAD (story authored, DELTA captured,
pointer resolves). W-SLD1 flipped its row 9; W-DOCK3 never flipped row 10. Fold into the
matrix R7 finisher-settle restamp.

---

## §3 — W-DOCK2 RG1/RG2: STILL OWED, CONFIRMED BLOCKING

- **RG1 (own-surface light+dark series on `/dock/overview`)** — zero `W-DOCK2-*.png`
  exist in `docs/tranches/AY/audit/visual/` (the dir carries `W-DOCK2-DELTA.md` only).
  `PROGRESS.md:71` honestly reads `live-pending … own-surface light+dark frame-series
  capture OWED`. The matrix marks this BLOCKING and W-COHERE G4 rides it
  (`EXECUTION-DAG.md:89`) — W-COHERE stays blocked until the capture lands.
- **RG2 (persisted GREEN `.cache/gates/AX-dock-animation-live.json` on the real
  surface)** — NOT met, and worse than "owed": the slot is OCCUPIED by a **FAIL**
  artifact (mtime today 16:02, `status: "fail"`, entering-child onset 708ms vs the
  536.7ms budget). Cross-checking `W-DOCK2-DELTA.md:67-82`, this is the DELIBERATE
  live born-RED witness run against the synthetic lag fixture
  (`GLASS_UI_DOCK_FIXTURE_URL=file://…/dock-entering-child-lag.html` — the 700.9ms Δ
  matches the injected 700ms), NOT a real-surface regression.
- **NEW GAP — artifact provenance hole.** The persisted artifact's `facts` carry NO
  surface identifier (no `fixtureUrl`/route field), so at HEAD the gate-cache reads as
  a bare real-surface FAIL, indistinguishable from a regression — the inverse of the
  chronic R6 GREEN-on-real-surface clause (a RED-on-synthetic-surface masquerading in
  the real artifact slot). The capture pass that lands RG2 should (a) persist the GREEN
  real-surface run as the resting artifact and (b) stamp the driven surface into the
  artifact facts so fixture-arm runs can never occupy the slot ambiguously.

---

## §4 — Ledger/count nits

- `PROGRESS.md:74` (W-SLD2 row) claims the detector canary has "9 cases";
  `tests/scripts/proof-slider-two-only.detect.test.ts` has 7 `test(` cases (all pass).
- `PROGRESS.md:73` (W-SLD1) `live-verified` should carry the §1.3 user-hinge rider at
  restamp (gate-green, judgment-pending), per the spec's own condition-1 letter.

## §5 — Disposition summary

| item | state |
|---|---|
| W-SLD1 knob geometry + gate inversion | LANDED, gate PASS re-run, shape reads round+continuous |
| W-SLD1 user-judged hinge | SHORT-CIRCUITED — capture owed to the user's eye (Class F) |
| W-SLD1 standard PNGs | CLIPPED (bottom arc) — recapture with padded clip |
| W-SLD1/W-DOCK3 allowlist claims | FABRICATED in both DELTAs; specs misstate the engine |
| `Slider.vue:242` scaleX comment | STALE, confirmed; flagged not edited (booked R7) |
| `proof-slider-two-only.mjs:6,10,435` | STALE cylinder/AX.W59 language vs its own clause 3 |
| W-DOCK3 drag DELTA | VERIFIED — data-held shows, dims honest, spec bites |
| W-DOCK3 L re-home | PROSE-ONLY — no L-side row exists (condition 4 half-unmet) |
| AUDIT-LEDGER row 10 | STALE — not flipped after W-DOCK3 landed |
| W-DOCK2 RG1/RG2 | STILL OWED, BLOCKING; FAIL artifact in the slot lacks provenance |
