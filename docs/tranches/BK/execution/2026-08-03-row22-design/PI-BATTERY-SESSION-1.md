# W-FROST §12 π battery — session 1 (2026-08-04, ~03:45 ET, driver's serialized browser seat)

Chromium (chrome-devtools MCP), **port 5400**, dev server at HEAD `4b1a9733` (the committed
W-FROST cut), `git status -- src demo` clean. P0 mode asserted in every probe; every probe
asserts its own `location` (a challenge-lane agent opened a stray browser page against its fence
— the singleton risk was live, no probe landed off-target; the fence breach is noted for the
lane's adjudication).

## π-2 — THE GRASP-TRACE MOTION π (the tranche's first; #3's named first consumer)

Subject: the slider range under `[data-held]` (A-11). **Mode: pinned-attribute** — `isHeld` on
the slider binds `dock?.held` (a dock context; the standalone story can never arm it — the
dock-grab STATE wiring is #47's, `Slider.vue:164`), so the paint law is measured by pinning the
attribute, the exact precedent of the row-6 pinned-t cell.

| law | measured | verdict |
|---|---|---|
| entry a TRUE 0 ms discrete step | `setAttribute('data-held')` → **scale(1.02, 0.94) SYNCHRONOUSLY** (same tick, before any frame); identical at +1 frame | **PROVEN** |
| held pose (smear at v=0) | scale(1.02, 0.94) — exactly `1.02+0.16·0, 0.94−0.06·0` | exact |
| release follow-through (the punch curve; a monotonic settle = a dead spring) | declared series from release t₀ (ms → sx/sy): **0** 1.02/0.94 · **61** 1.0207/**0.938** (the ANTICIPATION dip — sy moves AWAY from rest first) · **91** 1.0193/0.942 · **121** 1.0166/0.9503 · **181** 1.0047/0.9858 · **301** **0.9998/1.0005** (the OVERSHOOT past rest) · **451** 1/1 settled | **ALIVE — dip → travel → overshoot → settle** |
| material constant through motion | `backdrop-filter: blur(14px) saturate(1.5)` byte-identical at every sample — zero re-rasterization (the cardinal Safari sin absent) | **PROVEN** |
| the release transition | computed `transform 0.3s linear(0, −0.012 6%, −0.038 12%, …, 1.14 64%, 1.22 70%, …)` — the cartoon-punch curve with negative anticipation knots and >1 overshoot knots, on the transform channel only | matches the authored law |

The timed series is COMPUTED-STYLE numeric (in-page `performance.now()` sampling), the honest
fixed-frame-series form; screenshots cannot time sub-100 ms over the MCP round-trip.

**[⊕³⁰ 2026-08-04 correction, at the challenge-debt verdict: WHAT THIS TRACE MEASURED.** The debt
pass (F-4/F-B1, `DEBT-ADJUDICATION.json`) proved `grasp.css`'s register has ZERO reachable
consumers at `4b1a9733` — so this trace exercised **`Slider.vue`'s own scoped `[data-held]`
recipe** (the smear + cartoon-punch follow-through), NOT the §5 grasp register. Every measured
number stands (the recipe is real, alive, and A-11's follow-through law holds on it); the
*attribution* to the grasp register is corrected here. The grasp register's own trace re-runs
after the cure-cut rewires its topology — π-2 for THAT mechanism is re-owed.]

## π-3 — dark plate separation (the F-3 falsifier)

`/display/card`, dark-MOUNTED. `--glass-material-rim` top leg computes `hsl(0 0% 100% / 0.08)`
dark · `hsl(0 0% 100% / 0.1)` light — **F-3 dark ≤ light EXACT in both computed arms**. Cell
`pi3-dark-plate-separation.png`: plates separate cleanly from the deep field at the quiet rim,
no dead white ring, the Selected card's gold reads at the rim without flooding the plate; light
pair `pi3-light-plate-pair.png`. Shadow elevation-only (no highlight leg in the computed stack).

## The ladder in live paint (π-1's preview, not π-1)

`/display/surface`, light: **quiet 14 · resting 16 · floating 20 · overlay 22**, every rung
`saturate(1.5)` and nothing else — the §3.2 ladder monotone with the ONE-saturate law, live.
(wash=10 not mounted on that page.)

## π-5 — the cel-stamp / O-6 lockstep, one frame

`/display/card`, light: the cartoon Card's computed `box-shadow` is the stepped hard-edge ink
cast (`oklab(0.28 …/0.32) -3px 3px 0 0` · `…/0.26 -5px 5px 0 0` · …, zero blur — the cel idiom)
ON THE SAME ELEMENT as the glass rim (`inset 0 1px 0 hsl(0 0% 100% / 0.1)` …) — **the O-6
cast/rim lockstep holds in one computed style**. Frame: `pi5-cel-stamp-lockstep.png`.

## Honest state of the battery

- ~~**π-1 BLOCKED-ON-#56 (Q-4):** `/navigation/tabs` + `/forms/slider` mount no structured
  backdrop (grep + live check) — the spec's own hard precondition; material π there is
  inadmissible until #56 lands it. The 5-rung × mode × engine matrix waits.~~ [⊕³² 2026-08-04:
  **PRECONDITION LANDED at `7a3dd86c`** — the #56 Q-4 field-well slice (σ 39-43 modeled, both
  modes, both routes). π-1 now waits only on the cure-cut's COMMIT (a live material read against
  the sibling lane's half-written glass tree is inadmissible — P0's own clean-tree clause), then
  runs 5-rung × both-modes on this seat with: the tabs transmission read off
  `.glass-capsule-track` (never the traveling capsule — its own quiet blur double-blurs the
  read) · the measured substrate σ re-stated in the manifest (Q-2/A-10; the modeled 39-43 is not
  the seat of record) · the dark AA-marginal cell captured, findings routed #31/#22 · the
  card-as-backdrop-root composition kept in the model (correct, not a violation).]
- **π-2 Chromium arm DONE** (above); the real-`safari-app` arms of π-1/π-4 stay owner-gated on
  the awake-display environment (the locked-screen black-composite class).
- **π-3 DONE** (computed both arms + paired cells) · **π-5 DONE** (one frame + lockstep).
- **π-6** is #67's device matrix — not this seat's.
- `G-FROST-TRANSMISSION` (F-2): still **armed-not-green** — it closes on π-1 + π-2 together;
  π-2 is banked, π-1 waits on #56. The #22 SEAL therefore remains open on exactly: #56's
  backdrop precondition → π-1, plus the challenge-debt lane's verdict.
