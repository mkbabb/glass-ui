# PROBE-NOTES — PROTO-CONSTELLATION (V-CONST + V-BLACKDOCK + V-TIMELINE + R-MOMENTUM)

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-1,
IOS27-MICRO novelty pass, 2026-07-18. Status: RUNS. Files: `index.html` (self-contained, no
build step — open directly), `check.mjs` (node logic check of the exact physics block shipped
in the page; `node check.mjs` — **64/64 PASS** as of the union adjudication; the old "60/60"
was a stale count from before four gates landed — MECH minor 1, corrected).

## JUDGE CORRECTIONS (the union adjudication, 2026-07-19)

- **MECH M4 SUSTAINED and CURED — event-count-as-clock.** The law-16a sustain gate accrued
  `upHold += 1/60` per pointermove EVENT (fires at ~75ms real time on a 120Hz ProMotion
  stream; never accrues on coalesced streams) and the chip seed fell back to
  `|dyContent|·60` (a fake 60Hz velocity, 2× hot at 120Hz). Cures: the hold is WALL-CLOCKED
  (`now − holdStart`); the chip seed takes a boxcar-windowed velocity (≤120ms of drag
  samples, the useDragVelocity discipline) and seeds 0 when unknown — overshoot is
  velocity-BOUGHT (MARKS C2), so a missing measurement buys none.
- **MECH M3 SUSTAINED and CURED.** `simContinuity`'s comment claimed "4 posture transitions"
  while the loop ran none (a gate that could never fail) — the choreography now actually
  runs four Spine glides alongside the carrier, gated `flips = 4`. `simCensus` is relabeled
  [DECLARED]: a regression lock on the design table, not machinery proof — the live surface
  count is QP-9's frame trace to earn.
- **MECH minor 6 SUSTAINED and CURED.** PhoneB's hand-inlined `value + 0.2·v >= 0.5`
  projections now use `PC.PROJ_TAU` — no re-minted literals.
- **MECH minor 7 SUSTAINED, declared.** The re-home decider proves the RE-HOME FRAME only
  (≤0.5px); after re-parent, `apply()` freezes the art for the remainder of the ferry
  (`parentElement === npBody` guard). The frozen continuation joins the fixed-container arm
  as pass-3 work; adoption language may not call the full ferry re-home-proven.
- `?hud=0` silences per-frame badge/cell instrumentation for QP-9's traces (MECH minor 2).

## What the prototype claims to prove

The roster's nav-chrome body (`../../../analysis/NOVELTY-ROSTER.md` cards 1, 3, 7, 10; brief
§4.1): the dock is not a monolith, not limited in orientation, width, or height — and every
phase of proving that is scrub-reversible and catchable mid-flight.

Two phone mocks (300×620), one physics block, zero build:

1. **Phone A — V-CONST, D-POSTURE at N bodies.** Three glass bodies (main dock, the NOW body,
   the search gird) on ONE posture spine (0.53, ζ1.00 → t90 ≈ 330ms, law 16a). Postures
   STACKED ↔ FUSED ↔ FISSION are banded transfers of that spine — LBL [0,.20] (labels lead
   ~80ms), TRAVEL [.05,.90], GIRD [.33,1] (girds lag the center ~100ms, the F3 desync as a
   t-band), WIDTH [.45,.88] — so the fired timeline recovers law 16a's clocks through the
   register while a scrub holds any phase. Collapse is displacement-gated (120px, 100–150
   band, velocity-agnostic); re-expand fires ONLY on a sustained (≥150ms) up-drag arriving at
   top while still dragging — the momentum-rebound button proves the refusal. The compact
   chip's pop is a critical spring whose overshoot is strictly velocity-bought (MARKS C2),
   the ≤10% fence enforced AT THE SEED (cap −(capC+w)), never by clamping paint. FUSED
   settles to ONE backdrop surface (the chip shares the main body's); the census table tops
   at 3 in FISSION.
2. **Phone A — V-TIMELINE, the continuous-timeline ferry.** The album ferries dock → card →
   page as ONE persistent element on ONE spine: every incarnation is a clip-path sub-rect of
   the page-sized base box; art and marquee are transform-only against their page-home
   layout; chrome for all three incarnations is pre-composed at final layout and revealed by
   bands (law 5), never reflowed. rectAt is C0 by construction (both segments share the card
   rect); detents {0, 0.5, 1} select by velocity projection (τ=0.2, law 7c — flicks skip the
   card both directions); edges land on the seed-clamped critical register (law 7b — exactly
   zero overshoot on a hot seed grid, the spring eats excess energy per law 14c); the card
   detent lands ~2% underdamped. The reveal ladder is a pure function of t (MARKS §6
   position-mapped truth — the purity sim visits t forward, backward, and shuffled). A
   pointer down at ANY moment catches spine or posture C1 (dx=0, dv≤1e-6 asserted); the open
   page is itself a scrub surface (pointer down resumes the same spine from its detent).
   The `re-home art (decider)` button re-parents the art element mid-ferry with FLIP
   compensation and prints the live world-rect delta (gate ≤0.5px).
3. **Phone B — V-BLACKDOCK, the inverted growth grammar.** The assistant surface anchors its
   TOP edge (0px travel by construction — the clip-path insets the bottom), the bottom
   travels 248px, the sides breathe +4.5% (MARKS §1 band 4–5%), and the results ladder
   (handle → title ghost → solid → rows) is a pure function of growth. The register is the
   law-13 smoky material at surface scale: rgba(16,14,12,0.70) fill — a luminance floor,
   never opaque paint — over live `backdrop-filter: blur(10px) saturate(1.2)` (deliberately
   BELOW the container tier's 22px so content ghosts through), thin 0.18-alpha rim. Non-modal
   per codex law 18: the wall dim caps at 0.15 with `pointer-events: none`, and the "tap
   beneath" chip counts taps landing while the surface is open.
4. **Both phones — R-MOMENTUM.** Rows enter carrying the RELEASE velocity captured at the
   spring seam (one hop, β=0.7, N7: row overshoot px ≤ driver overshoot px — sim ratio
   0.33). Amplitude = base·(1+0.2n)·(0.55+0.45·tanh(|v|/2.2)) — depth-graded +20%/row
   (MARKS:215), stagger overlap 1/φ. A flung open (v=3) buys a 6.6%-of-amp settle-up
   overshoot, exactly one zero crossing (law 14c: no second bounce); a placed open (v=0)
   lands dead (MARKS C2). Rows PRESEED their displaced-low offset the moment an entry
   becomes pending, so the ladder fades them in already displaced and the arrival spawn
   continues from x0=1 with zero C0 seam.

PRM: media query AND a simulate checkbox — postures swap single-step, ferries seat, entries
land settled, the marquee stills. The rAF engine parks at settle ("rAF parked (zero-cost
idle)" in the header is the observable).

## The glass registers (the frosted derivation)

The frost register is extracted from F1's good glass — the named referent
(`../../f1-scalar-spine/index.html:110-111` container tier `blur(22px) saturate(1.35)`,
`:163-164` control tier, `:214-217` medium) — declared as three custom properties at
`index.html` `:root`: depth carried by TINT (a warm cream gradient, not brightness), the 1px
top rim as the ONLY idle light, plain per-mode shadow arms (the light-dark() inset trap).
What was deliberately NOT taken — the F4/F5 shine class the cure seat (PROTO-FROSTED-CURE)
owns: idle specular gradients, `brightness(>1)` in backdrop filters, glossy top-half white
ramps, high surface-luminance floors (roster card 9, `NOVELTY-ROSTER.md:300-314`). The black
register is BLOB_GLASS-kin per roster card 7: ~70% black fill + low backdrop ghosting + thin
rims, samples its backdrop always (law 2).

## Sim numbers at write time (check.mjs, same code as the page)

| measure | sim | band (source) |
|---|---|---|
| collapse t90 | 329ms | 300–360 [LAW 16a ~330] |
| labels faded by | 70ms | 55–90 [LAW 16a ~80 lead] |
| gird lag | 100ms | 85–115 [F3 desync, DESIGN] |
| width condensation window | 180ms | 150–210 [REG-LOCK] |
| chip overshoot (seed −35 / zero / at cap) | 3.5% / 0 / 8.5% | ≤10% fence at the seed [MARKS C2 + DESIGN] |
| displacement at fire (60 vs 3000 px/s) | 120.0 / 120.0px | velocity-agnostic [LAW 16a] |
| re-expand truth table | sustained ✓ · rebound ✗ · short ✗ · not-at-top ✗ | [LAW 16a] |
| census max / FUSED | 3 / 1 surface | ≤3 [performance card] |
| ferry rect C0 max step / boundary jump | 0.32px / 0 | no handoff seam [DESIGN] |
| detent projection (slow / flick up / flick down) | 0.5 / 1 / 0 | τ=0.2 [LAW 7c] |
| edge overshoot (hot seed grid) / interior | 0 / 1.99% | 0 [LAW 7b/14c] / ~2% [LAW 7b] |
| seat settle (seeds ±3.2/s) | 649–708ms, spread 59ms | duration-stable [LAW 14a kin; corpus 650–683] |
| catch C1 (dx · dv) | 0 · 0 | [DESIGN] |
| FLIP re-home round-trip | 0px | ≤1e-9 [DESIGN] |
| ladder purity (page / blackdock) | 0 / 0 deviation | pure function of the spine [MARKS §6] |
| blackdock top travel / breathe | 0px / 4.5% | anchored / 4–5% [MARKS §1] |
| momentum: flick overshoot / zero-seed / crossings | 6.6% / 0 / 1 | 2–9.5% velocity-bought [MARKS C2] / dead / one bounce [LAW 14c] |
| momentum: depth ratio / N7 ratio | 1.40 / 0.33 | +20%/row [MARKS:215] / ≤1 [N7] |

## How to judge it visually (the browser arm's checklist)

- **Collapse (drag the library down 120px, or the scroll buttons):** the two docks become ONE
  — the NOW pill travels into the chip seat while both bodies keep their own frost; mid-morph
  the overlap must read as double-darkened goo (two backdrop layers stacking), then the chip's
  own backdrop turns OFF at settle (census 2→1). Labels on the fission girds die in the first
  ~80ms. Slow scroll and fling must fire at the SAME displacement.
- **Fission/fuse:** center body leads, girds lag visibly ~100ms; the main dock's left 96px
  clips open to reveal pre-composed transport controls (revealed, never reflowed); the search
  gird detaches rightward. The marquee NEVER restarts across any posture change (law 17 —
  watch the scroll offset), the badge stays 3.
- **Ferry (drag the mini pill up):** art, marquee, and glass travel as ONE body — no seam, no
  crossfade, no handoff anywhere dock→card→page; hold anywhere and everything holds (the
  held-height proof); mini extras die by t≈0.22, card chrome lives [0.28, 0.68], page rungs
  ladder in from 0.55. Release slow near the middle → card detent with a just-visible ~2%
  soft landing; flick from low → the card is SKIPPED. Touch anything mid-flight — zero jump.
- **Re-home decider:** mid-ferry, press `re-home art` — the art must not move a visible hair
  (the table prints the live delta; ≤0.5px green).
- **Black dock (drag the pill down):** the TOP EDGE NEVER MOVES; bottom grows; sides breathe;
  rows ladder in as a pure function of height — scrub up/down repeatedly and the ladder must
  retrace exactly. The material must read as smoky glass: the CREAM wall word ghosts through
  the black. The chip beneath stays tappable the whole time (counter increments).
- **Momentum entries:** `flick open` — rows arrive displaced-low (deeper rows lower), settle
  UP with one small overshoot, no second bounce; `place open` — same rows land dead calm.
  The difference must be legible at a glance. No teleports at arrival (rows fade in already
  displaced).
- **Idle honesty:** "rAF parked (zero-cost idle)" after every settle, both phones.

## Known dishonesties and limits

1. **The sim column is not paint.** It is a 1ms deterministic integration of the same
   Spine/sampler code that drives the DOM writes; live cells are rAF-sampled wall clock (±1
   frame). Paint truth belongs to the serialized browser arm (QUEUED-PAINT below).
2. **The live census only certifies the ≤3 bound, not the per-phase counts.** Backdrop
   surfaces toggle at posture SETTLE (finishPosture), so mid-transition the live count reads
   low (e.g. FUSED→FISSION travels at 1, settles to 3) while the CENSUS table states the
   design intent per phase. The paint arm should count compositing layers per phase.
3. **The goo is layered-overlap only** (double-darkening of two frost bodies in transit —
   the attested D-POSTURE mechanism, no `filter:url()` anywhere). Whether the overlap reads
   as goo or as mud on WebKit is a video-path judgment.
4. **The re-home decider re-parents between two `position:absolute/relative` containers.**
   The roster's hardest phrasing is a `position:fixed` re-home; the FLIP math is identical
   (proved exact in-node) and the live button gates ≤0.5px, but the literal fixed-container
   arm (fixed under transform ancestors resolves against different containing blocks) is
   deferred to the campaign integration pass.
5. **The release seam of the preseed:** rows preseed their displacement at gesture start
   (floor amp) and re-preseed at release with the true velocity amp — a ≤10px adjustment at
   the release instant, applied while rows are at most partially revealed and screen motion
   is greatest. Arrival is seamless by construction; the release instant is the one place a
   sub-perceptual step remains. A release from beyond the reveal band (t ≥ 0.55 / g ≥ 0.4
   with rows already settled) deliberately carries NO entry choreography.
6. **Ferry scrub velocity is finger-locked to a 380px mapping;** the momentum vRef (2.2/s)
   is tuned to that mapping. Library integration must normalize per-surface travel.
7. **Marquee condensation is a horizontal scale** (0.55× at mini) — text squishes rather
   than truncates. A library build masks instead; law-17 continuity (the offset carrier) is
   what this prototype proves, not the typography.
8. **The FISSION hit model is visual only** — gird controls are `pointer-events: none`
   displays; only the posture/ferry/scroll gestures are interactive. The D-REACH tap-to-seat
   grammar is another card's scope.
9. **`performance.now()` quantizes to 1ms on WebKit** — live ms cells there are frame-gap
   honest only; the bands already carry ±1 frame.
10. **Phone A's per-frame `querySelectorAll` census** (class read, no layout) is
    instrumentation a library build would not ship; same for badge/table text updates.

## QUEUED-PAINT (the serialized browser arm's list — video path per the lying-gate law)

Every row below is a WebKit VIDEO-path check (Playwright-WebKit screenshots are
backdrop-filter-blind — `../../passes/PASS-2/safari-arm.md:22-31`); Chrome runs the same rows
for parity. No `@supports` gates exist in this page (runtime paint only).

- QP-1 **Frost register reads BLURRED-FROSTED on both phones** (tiles ghost through the dock;
  no gloss, no idle specular) — judged against F1's glass and the micro demo's register.
- QP-2 **Goo double-darkening mid-collapse**: video frames during STACKED→FUSED show the two
  overlapping bodies visibly darker/deeper where stacked; no flicker at the surface handoff
  (census 2→1) at settle.
- QP-3 **Black register ghosting**: the CREAM wall word legible through the black surface at
  rest AND at full growth; near-black floor, never opaque.
- QP-4 **Backdrop surface census per posture** via compositing-layer counts (≤3 at any
  instant, FISSION exactly 3, FUSED exactly 1).
- QP-5 **Ferry continuity on video**: dock→card→page at 25fps with no frame showing a seam,
  double image, or crossfade of the art; held mid-ferry frame pairs with its `--np-*`
  computed sample (the paired-π law).
- QP-6 **Re-home decider live**: click mid-ferry on WebKit; table delta ≤0.5px AND no
  visible jump on video across the re-parent frame.
- QP-7 **Momentum legibility**: flick-open vs place-open videos distinguishable by row
  behavior alone; one overshoot max; no arrival teleport frame.
- QP-8 **Non-modal truth**: tap the beneath-chip while the black dock is open on WebKit —
  counter increments, no dead zone from the dim layer.
- QP-9 **Frame-gap budget**: collapse + fission + ferry + momentum back to back; gaps
  stat-summarized (1ms quantization noted), zero long-frame classes attributable to the
  glass stack; rAF parked between.
- QP-10 **PRM sweep**: system PRM on WebKit — single-step postures, seated ferries, settled
  entries, still marquee, zero in-between frames.

## Refine log (this seat, 2026-07-18)

Inherited a complete index.html from this seat's interrupted prior run; physics block adopted
unchanged (all 60 gates land inside law bands on first run). Five wiring defects found and
cured before check/notes were written:

1. `#npPlayMini` sat at x 244 — outside the mini pill's clip band (x 42–242): could never
   paint. Moved to 204/456.
2. The ferry transform math scaled the base offsets (`58·s`): with `transform-origin: 0 0`,
   `translate(T) scale(s)` puts the element corner at static+T — scale never moves the
   corner — so art/marquee were misplaced by up to ~46px at the mini state. Offsets now
   subtract unscaled.
3. The ferry hit test used `npBody.getBoundingClientRect().top` — the UNclipped base box
   (clip-path never shrinks border boxes), i.e. 40px into the phone — so nearly every drag
   became a ferry and the scroll-collapse gesture was unreachable by pointer. Now hit-tests
   the resolved physics rect.
4. Arrival momentum was seeded from the terminal creep velocity (the park epsilon caps
   |v|<0.02 — entries could never carry a flick). Now seeded from the RELEASE velocity
   stashed at the spring seam (the R-MOMENTUM one-hop contract, N7).
5. Rows teleported down `amp` px at spawn (a C0 seam at arrival). Cured with the preseed
   choreography (dishonesty #5 documents the remaining sub-perceptual release step); the
   open page also became a resumable scrub surface (pointer down at a parked detent resumes
   the same spine).

## How to run

- Open `index.html` in Chrome and Safari directly (no server). Buttons drive deterministic
  scenarios and fill the live columns; drag either phone for the scrubbed paths; PASS/FAIL
  colors follow the same bands as check.mjs (±1 display frame).
- `node check.mjs` — extracts the physics block from the HTML and asserts 60 gates
  (law-16a/7/14/17/18 constants, MARKS C2/§1/§6/:215 bands, C0/C1 continuity, census,
  ladder purity, N7, register drift locks).
