# B2-con1 — adversarial refinement of AY.W-CON1 (constellation refit + auto-drift, AS-BUILT)

**Lane:** B2-con1 · **Verdict:** GAPS-FOUND · **Target HEAD:** `1151899` (tranche/AY)
**Surface:** `src/components/custom/constellation/{constellationField.ts,Constellation.vue,index.ts}`,
`tests/components/custom/constellation/constellationField.test.ts`,
`tests-visual/constellation-refit-live.spec.ts`, the 12 `W-CON1-*.png` DELTAs.

The engine LOGIC is sound and the gates are genuinely green (18/18 unit, the π spec
tests refit-coverage + auto-drift cadence + PRM-suppression + both-mode alpha for
real). But the wave is NOT perfected: it left a **flagrant god-module violation** it
created, the **"mobile" DELTA captures are evidentiary garbage** (gate-counted, not
gate-meaningful), and the headline "refit-fills-box 0.92" π number is a **near-tautology**
that proves multiplication, not visual quality. Findings below, ruthless + specific.

---

## FINDING 1 (BLOCKER) — constellationField.ts is now a 653-line GOD-MODULE; the wave it self-created the violation and left `proof:no-god-module` RED

The spec's own §5.5 says the file was "currently 510, at the cap." W-CON1 added the
refit + the entire wander cluster (`ConstellationWander` iface, `refitField`,
`warpSettled`, `pickWanderTarget`, the in-`stepField` cadence block, the `WARP_SETTLE_BAND`
const + its essay-length comment) and pushed it to **653 lines** — 153 over the hard cap.

- `proof:no-god-module` (`scripts/proof-no-god-module.mjs`, HARD_LIMIT=500) is **RED at
  HEAD**: I ran it — `constellationField.ts is 653 lines (> 500)` is one of FOUR live
  violations (also useMetaballRenderer 707, SegmentedTabs 689, GlassDock 624). The gate
  `process.exit(1)` on FAIL.
- The §5.5 hand-wave — "W-GOD1 runs AFTER so it carves a settled target" — does NOT make
  the component perfected at THIS HEAD. The user's bar is a perfected component; the
  as-built artefact ships a RED structural gate.
- **W-GOD1's carve plan is now STALE because of this wave.** `AY.W-GOD1.md:18,46,130`
  still grades `constellationField.ts` at **510** ("510 → < 500", "the cleanest carve").
  The real target is 653: the carve must shed **153+** lines, not 10. W-GOD1 already
  flags (its own §77) that its grading was stale by ~190 lines on GlassDock; W-CON1
  silently widened the same staleness on the constellation file. W-GOD1 is still
  `planned` in `AY/PROGRESS.md:86` — no landed remediation exists.
- The CLAUDE.md/precept "NO god-modules (>500)" is a hard precept (wf-ay-l-hardening.js:32).
  A wave that grows a 510→653 file is precept drift, regardless of a future carve promise.

## FINDING 2 (HIGH) — the four "mobile" DELTA PNGs are evidentiary garbage: not mobile, not a filled box, not showing the focal — the cardinal-lesson DELTA is GAMED

The DELTA doc (`W-CON1-DELTA.md:11`) claims "Viewports: desktop 1280×800 + **mobile
375×667**". The as-built "mobile" PNGs falsify every part of that:

- **They are 1280×721, not 375×667.** `file` on `W-CON1-refit-mobile-{light,dark}.png`
  and `W-CON1-autodrift-mobile-{light,dark}.png` → all `1280 x 721`. They are
  desktop-width page screenshots, NOT mobile-viewport renders. The "mobile 375×667"
  protocol claim is fabricated.
- **The lattice does NOT fill the box — it fills a left ~342px column.** I viewed all
  four: the constellation occupies only the leftmost ~27% of the 1280-wide page; the
  right ~73% is flat cream (light) / flat black (dark). For the wave whose HEADLINE is
  "refit FILLS the new canvas," the "refit AFTER mobile" artefact shows a constellation
  that conspicuously does NOT fill its frame. A reviewer trusting the PNG would conclude
  the fix FAILED.
- **The focal ring is absent from all four mobile captures** — no orange focal marker is
  visible. The "auto-drift (focal re-targeted on the cadence)" caption
  (`W-CON1-DELTA.md:29`) has ZERO mobile visual support.
- **refit-mobile and autodrift-mobile are pixel-twins** (same sparse left-column lattice),
  so the mobile set carries no independent refit-vs-autodrift information.
- The `proof:live-verified-ledger:ay` gate PASSES on this because it only checks
  `isRealPng` (≥1024 B + `\x89PNG`) + basename regex + light/dark presence
  (`proof-live-verified-ledger.mjs:104,135,147`). It counts files; it cannot see that the
  "mobile" set demonstrates none of the wave's claims. This is the exact cardinal-lesson
  inflation the gate was built to stop, slipping through on a file-count technicality.

## FINDING 3 (HIGH) — the "refit BEFORE" PNGs do not depict the drift-out defect; the visual before/after pair is decorative, not evidentiary

The DELTA labels `W-CON1-refit-before-*.png` "refit BEFORE (drift-out, small lattice vs
large box)" (`W-CON1-DELTA.md:27`). The actual files are **360×241** and show a
constellation that **fully fills the 360×241 frame** — there is no large box, no
small-lattice-in-big-canvas, no visible drift-out. The "before" artefact is just the
small-canvas state captured at small-canvas size; it cannot show the lag because the lag
is "small lattice positioned inside a LARGE canvas," which no 360×241 PNG can depict.

The binding 0.259-coverage "before" number comes from the π engine readback (the small
lattice's bbox measured against the upcoming 1280 box, `constellation-refit-live.spec.ts:145`)
— which is legitimate. But the registered PNG does NOT visualize it. The before/after
*image* pair proves nothing; only the *number* does. For a "captured DELTA" wave that is
a real weakness — the picture and the claim are decoupled.

## FINDING 4 (MEDIUM) — "refit-fills-box ≥ 0.92" is a near-TAUTOLOGY; it proves refitField multiplies, not that the lattice looks right

`refitField` scales every coord by `sx = w/prevW` uniformly. Therefore bbox coverage is
**invariant under the resize**: `bbox_new/canvas_new = (bbox_old·sx)/(canvas_old·sx) =
bbox_old/canvas_old`. The π spec shrinks to 360×240, lets it settle, then grows to
1280×720 and asserts coverage ≥ 0.92 (`constellation-refit-live.spec.ts:151-153,176`).
The 0.92 "after" is simply the **seed's intrinsic coverage of any box** — it is the same
number before and after by construction. The asymmetry in the DELTA (covW 0.920 vs covH
0.985) is the seed's fixed node-spread signature, not a refit-quality signal.

So the headline π number cannot DISTORT and cannot FALL below the seed's coverage — it is
structurally pinned. It verifies "refitField does a uniform multiply" (which the unit test
`refit-fills-box` already proves directly) but adds no independent quality evidence. The
prompt's question "does the lattice LOOK right after resize, or distorted?" is **not
answered by this gate** — a uniform scale cannot distort, so the gate is trivially green.

**The real distortion case — a NON-UNIFORM (sheared) refit — is captured nowhere.** Spec
§5.2 admits `sx ≠ sy` shears node spacing and calls it "ACCEPTABLE," and the unit test
`refit-conserves-velocity` uses a 3×→0.84× shear — but NO DELTA PNG captures a
portrait→landscape transpose (the actual deck slide-enter scenario the whole wave exists
to fix). All 12 captures are the mild 360×240→1280×720 (sx 3.55, sy 3.0). The aesthetic
question "is a sheared lattice still pleasing" is untested visually. For a wave gated on
"behaviour-preserving swap into slides," the shear path is the one that matters and it has
no artefact.

## FINDING 5 (LOW / CLEARED) — the 24px WARP_SETTLE_BAND is a TRUE fix, not a jitter-fudge

The prompt's concern (the agent loosened `warpSettled` to a 24px band → does the anomaly
jitter?) does NOT hold:

- The cadence period (`minIdle + jitter`: default 8000–16000 ms, demo 1400–2000 ms) is
  **2.5×–29× the warp settle window** (response 0.55 s, ζ=1.0 critically damped). By the
  time `now >= nextAt`, the spring arrived long ago (gap ≪ 24 px), so the 24px band is
  essentially always satisfied at fire time — it does not advance the cadence EARLY.
- The band's actual job (`constellationField.ts:487-517` comment) is correct: a
  critically-damped spring chasing a CONTINUOUSLY-DRIFTING node holds a non-zero
  steady-state tracking lag (≈2ζ/ω·v) forever, so a tight `|gap|<1px` gate would stall the
  cadence permanently. The band cleanly separates a settled-tracking warp (≤ a few px)
  from a fresh click (hundreds of px) — so a click still pre-empts (`warpSettled` false at
  300px, verified by `wander-yields-to-click`).
- If anything the band PREVENTS jitter: were `minIdle` set below ~550 ms with the spring
  mid-flight, `warpSettled`=false would DEFER the fire until arrival, not snap. The fix is
  sound and coheres with the warp (ONE spring, the AX.W17 thesis intact — no second rAF,
  no second mechanic; `stepField` steps the cadence inline after `warpStep`).
- The desktop autodrift PNGs (light + dark) show a clean focal ring on a coherent
  full-canvas lattice — no visible jitter. The logic + the desktop evidence agree.

## What IS perfected (credit where due)

- The engine logic: `refitField` (positions+warp only, velocities untouched — the
  cool-down invariant holds), the wander cadence on the shared warp spring, `warpSettled`,
  `pickWanderTarget` (bias-free skip-the-focal pick). All clean, idiomatic, well-commented.
- Default-OFF byte-identity is genuinely proven (the `default-OFF byte-identity` canary
  steps a wander-absent field identically across the new 7-arg `stepField` signature).
- The barrel (`index.ts`) correctly re-exports `refitField`/`ConstellationWander`/
  `warpSettled`/`pickWanderTarget` for the unit suite + api types.
- The π spec is a real device render with engine-state readback (alpha both-mode,
  PRM-suppression, cadence fires) — not a grep, not a prose claim. 18/18 unit green.
- The `--constellation-alpha` midpoints (0.80 / 0.88) held and the both-mode π readback
  genuinely ratifies the token reaches `palette.alpha`.

---

## Deferred / not-this-wave (legitimately punted, but tracked)

- W-GOD1 carve of constellationField (653 → < 500) — `planned`, plan stale at 510.
- Non-uniform (sheared) refit visual capture — no artefact for the portrait→landscape
  transpose, the actual deck-adoption case.

## Bottom line

The COMPONENT is not perfected: a self-created 653-line god-module leaves
`proof:no-god-module` RED at HEAD; four of twelve "DELTA" PNGs are mislabeled
non-mobile left-column screenshots that demonstrate the OPPOSITE of "fills the box" and
show no focal; the "before" pair depicts no defect; and the headline coverage π is a
uniform-scale tautology with the real shear case uncaptured. The engine code + the
desktop evidence + the unit/π logic are sound (the 24px band is a true fix). GAPS-FOUND.
