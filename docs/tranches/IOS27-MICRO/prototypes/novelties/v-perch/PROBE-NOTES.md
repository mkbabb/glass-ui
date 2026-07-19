# PROBE-NOTES — V-PERCH, the corner-perched close

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-2
(PROTO-ATTENTION-EXIT), 2026-07-18. Status: RUNS; `node check.mjs` 39/39 PASS at write time.
Files: `index.html` (self-contained), `check.mjs` (extracts the physics block and
cross-checks every CSS stamp against the physics constants — seat offset, rim ramp, scale
gain, the three close clocks — single-source discipline, no drifting literals).

## What the prototype claims to prove

Roster card 6 whole: the dismissal affordance perched ASTRIDE the top-left corner border,
half outside the surface by construction — the seat is the 45° border point r(1−1/√2) from
each edge (8.2px at R=28, stamped into CSS from the physics), giving 6.8px of visual
protrusion past the plate box (inside the D-LENS 6-10px precedent band). The architecture is
the F5 plane vocabulary, node-proven structurally: the plate owns its clip
(`overflow:hidden`), the surface-root never clips, and the perch is a SIBLING of the plate
(div nesting depth returns to zero before the button — chrome escapes by construction, not by
overflow hack). Press-charge: attack t90 129ms, drain t10 279ms; the press state machine
commits only from a held charge released inside (slide-off cancels, slide-back re-commits,
stray up never commits). Rim light is engagement-only (0.18 hairline → 0.68 charged — MARKS
§4 note 3); dot pop 1.11 under the φ^¼ cap. Commit dispatches the `vapor-handoff` event and
runs the honest close-order stub (content 170ms → beat 140ms → medium tail ~500ms).

## JUDGE CORRECTIONS (the union adjudication, 2026-07-19)

- **MECH M2 SUSTAINED and CURED.** The original build started the medium relax on the beat
  delay ALONE — the medium was 30ms into relax when content died; the empty-medium beat was
  −30ms. The relax delay is now `content + beat` (CSS and physics mirrored, cross-checked),
  and `closeOrder().orderOK` demands a real ≥100ms held beat after content is out — the old
  gate was positivity, not order.
- **MECH M7 SUSTAINED and CURED.** mediumTau 0.12 → 0.14: relax = τ·ln20 = 419ms, inside the
  MARKS §5 ~400-450ms class and equal to the painted 420ms (3τ). The old sim passed the tail
  band only because the beat was summed in.
- **MECH M5 SUSTAINED and CURED.** `--engage-t`/`--perch-seat` publish on `#phone`, never
  `documentElement`.
- **DESIGN m2 PARTIALLY CURED.** The a11y ring is house cream (`rgba(255,226,178,.95)`),
  never the banned cyan class; the warm-cream stage arm for paint judging is pass-3 work.
- `?hud=0` silences the HUD for the browser arm's traces (MECH minor 2).

## QUEUED-PAINT (the serialized browser arm's ledger — video path only)

1. **QUEUED-PAINT / the protrusion reads.** Screenshot both themes: the dot must visibly
   straddle the plate's corner arc — half on glass, half on world — with the plate's own clip
   untouched. If any ancestor gains a clip in integration, this dies silently; the structural
   gate holds only for this page.
2. **QUEUED-PAINT / the charge register.** Video a press-hold-release and a press-slide-off:
   the rim brightens and the dot swells under the finger (sub-200ms), drains visibly slower on
   cancel. iOS's X does none of this — the charge is the bested claim.
3. **QUEUED-PAINT / squircle seat (k).** The seat law assumes a circular corner arc (k=1).
   Against a true squircle plate (continuous-corner), the 45° border point sits slightly
   differently; `SQUIRCLE_K` is the correction dial. Judge on the video whether k=1 reads
   seated ON the border of the CSS `border-radius` arc; tune k only when the library's
   squircle corners land.
4. **QUEUED-PAINT / handoff composition.** This page runs the close-order STUB. The composed
   organ — perch commit driving ../v-vapor's full 3-layer dissolve — is integration work for
   the campaign's assembly pass; the `vapor-handoff` event is the declared seam.
5. **QUEUED-PAINT / backdrop-filter on a 30px dot.** The dot carries blur(10px) at tiny area —
   confirm WebKit pays it (tiny backdrop surfaces have historically been fine, but the claim
   rides the video, not the gate).

## Known dishonesties and limits

1. The slide-off boundary test uses the 44px hit rect, not the 30px visual — deliberate (the
   finger's world is the hit target), but it means the charge holds while visually off the
   dot's edge. Judge on device whether that reads honest.
2. `pointermove` reads `getBoundingClientRect` per move during a press — event-scoped and
   press-bounded, not per-frame idle cost, but the library form should cache the rect at
   pointerdown (the perch is static while pressed; one read suffices).
3. The corner is top-LEFT per the exemplar (EXEMPLARS-2 S1). RTL and top-right variants are a
   parameter, not new physics — unproven here.
