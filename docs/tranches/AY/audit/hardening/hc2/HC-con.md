# HC-con — W-CON2 + W-CON3 as-built re-ground (phase Reground)

**Lane:** HC-con · **Verdict:** GAPS-FOUND · **HEAD:** Batch-2 complete (`8ddddce`+, branch `at-dock-convergence`/tranche-AY)
**Inputs read in full:** `NECESSITY-MATRIX.md`, `AY.W-CON2.md`, `AY.W-CON3.md`, `W-CON2-DELTA.md`,
`W-CON3-DELTA.md`, `W-CON1-DELTA.md` + `B2-con1.md` (RG context), `constellationField.ts` (959),
`Constellation.vue` (597), `demo/stories/substrates/constellation.vue`,
`tests-visual/constellation-{egg,freeze,refit}-live.spec.ts`, `constellationField.test.ts`,
`tokens.css §interaction`, `useCanvas2D.ts`. Gates re-run at HEAD: `proof:constellation-field`
**25/25 GREEN**, `proof:constellation-tokens` **PASS**, `proof:constellation-substrate-single` **PASS**.
Constellation research-verdict SETTLED per the matrix — not re-litigated; this is as-built verification only.

**One-line answer:** the engine work is genuinely good (the well physics, the freeze predicate fold, the
raw-vnode omitted-vs-false fix are real craft) — but BOTH waves carry gate-passing-vs-perfected residue:
the freeze gate's overlay-phase leg is a TAUTOLOGY, the well's cool tolerance was silently widened past
its own spec with mobile cooling left ungated, the asymmetric-ramp fix lives only in source+DELTA (the
wave spec was never amended), and the W-CON1 RG2/RG3 debts are STILL OWED — now past-due, since the
"when the build phase runs" trigger fired in this very batch.

---

## §1 — The asymmetric `WELL_RELEASE_RAMP` fix (lane Q1): HAND-SET, spec-unamended, comment-contradicted

**F1.1 (MEDIUM) — three hand-set magic constants, not one, none tokenised, the keep-as-const decision
recorded nowhere binding.** The DELTA names `WELL_RELEASE_RAMP` (22/s) but the as-built fix is THREE
non-token module consts: `WELL_RELEASE_RAMP = 22.0` (`constellationField.ts:555`), `WELL_COOL_HELD = 1.5`
(`:540`), `WELL_COOL_RELEASED = 7.0` (`:541`). None is in the `--constellation-*` numeric cohort
(`tokens.css:521-530`). Keeping them non-token is DEFENSIBLE — they guard the field-cools invariant (a
consumer slowing the release would break the §6 clause-2 gate), invariant machinery rather than feel
knobs — but that decision is recorded only in source doc-comments + DELTA prose. `grep -n
'RELEASE_RAMP|asymmetric|COOL_HELD|COOL_RELEASED' docs/tranches/AY/waves/AY.W-CON2.md` → **0 hits**: the
wave spec still prescribes the SYMMETRIC single-`cfg.ramp` shape (§3 E1c pseudocode) and declares
"Shape (i) is preferred" (route through the steer renorm) when the as-built took shape (ii) PLUS the
invented asymmetry. The Class-G as-built/spec divergence the matrix's B2-style re-grounds exist to
catch. Owed: a W-CON2 §3 amendment recording (a) shape-(ii)-with-asymmetric-ramps as the landed design
+ why (the live `k`-scale divergence), (b) the three consts as deliberate non-tokens.

**F1.2 (MEDIUM, the trap a consumer hits) — the `--constellation-well-ramp` comment is STALE on both
declaration sites and now LIES about the release.** `tokens.css:528` — `--constellation-well-ramp: 4.0;
/* 1/s — the hold/release ramp rate (≈0.25s to full) */` — and `constellationField.ts:675` — `ramp: 4.0,
// 1/s — the hold/release ramp rate (≈0.25s to full)` — both still describe the pre-fix symmetric
design. At HEAD the token governs the ARM only; release is pinned at the non-token 22/s
(`:585` `well.target > 0 ? cfg.ramp : WELL_RELEASE_RAMP`). A consumer tuning the token for a slow,
syrupy release gets nothing. Both comments must say "ARM rate (release is the fixed brisk
WELL_RELEASE_RAMP — the field-cools invariant, not consumer-tunable)".

**F1.3 (LOW) — 22.0 is gate-window-shaped with no stated derivation.** The doc-comment (`:542-554`)
argues briskness QUALITATIVELY; nothing ties 22 to `WELL_EPS` + the ≥30-frame sample (discretised,
strength falls below 1e-3 in ~15 frames at 60fps — about half the gate window, the calibration that
makes the gate fit). Fine to keep, but the derivation (`n ≈ ln(1/EPS)/ln(1/(1−min(rate/60,1)))` vs the
window) belongs in the comment so the next tuner does not treat 22 as free.

**F1.4 (HIGH — gate-passing, not perfected) — the cool tolerance was widened past the spec and mobile
cooling is UNGATED.** The chain, file:line:
- Wave spec §6 clause 2 + E5: "within **±5%** of the pre-hold mean" (`AY.W-CON2.md`).
- Unit oracle: `0.05` (`constellationField.test.ts:551`) — passes on its 800×600 fixture.
- π gate: `COOL_TOL = 0.06` (`constellation-egg-live.spec.ts:39`) while the SAME file's header comment
  (`:18`) still says "±5%" — the file disagrees with itself.
- The binding run read **5.2%** (W-CON2-DELTA §2) — it would FAIL the spec'd ±5%; the tolerance was
  widened to 6% so it passes, and neither the wave spec nor the in-file comment was synced.
- The DELTA's own capture table reads cool-err **6.6%/6.7% desktop and 13.1%/13.1% mobile** — the mobile
  error is >2× the spec tolerance, hand-waved as "a slightly tighter window" with NO longer-window
  re-measure, and the π spec runs at the single Playwright default viewport (`grep -c setViewportSize
  constellation-egg-live.spec.ts` → 0) so mobile cooling has ZERO gate coverage despite the narrow
  canvas being the WORST case the DELTA itself measured (perturb 1.72× vs 1.32×).
Owed: either retune (`WELL_COOL_RELEASED` up / lengthen the cool sample) to genuinely meet ±5%, or amend
the spec to the honest ±6% + add a mobile-viewport arm (or a longer-window mobile sample in the DELTA)
— and fix the `:18` comment either way.

**F1.5 (NOTE) — the always-on ease-back is a standing dynamics change for well-enabled instances.**
`stepWell` runs the `|v|→speed` cool pass for EVERY node EVERY frame whenever `field.well` exists, even
never-armed (`constellationField.ts:597-630`; rest coolRate = 7/s). Byte-identity is gated for
well-ABSENT only (correct). On the constant-speed base field this is a no-op at rest, but any consumer
composing impulses through the public `field` seam ON a well canvas (the supernova recipe shape) gets
them damped ~4× faster than on a non-well canvas. Documented in the `:493-500` comment; record it in the
README recipe section so the composition surprise is named.

## §2 — The wander/well token prop-over-token layering (lane Q2): CLEAN

Verified correct end-to-end. One-shot `interactionRead` guard on the first SIZED frame
(`Constellation.vue:267-269`, `:324-340`); layering is prop > token > built-in default at every member
(`wanderOverride.minIdle ?? cfgs.wander.minIdle` `:335-338`; `{ ...cfgs.well, ...wellOverride }` `:329`);
`readInteractionConfig` (`constellationField.ts:343-369`) is SSR-safe with empty-string + NaN fallbacks
per member; the hot loop never calls `getComputedStyle`. The W-CON2 RG-B closure is real — W-CON2 minted
the ENTIRE numeric cohort (9 members, `tokens.css:521-530`, declared once in `:root` with the
mode-invariant rationale inline) and the DELTA's declared/engine/readback table triangulates it. Two
asymmetries, both defensible, neither recorded: `soften` is the one well member with NO token
(prop-only — the spec's E4 cohort never listed it); the warp spring has NO prop channel (token-only).
One line each in the wave spec or README closes them.

## §3 — The freeze hash protocol (lane Q3): the overlay-phase leg is a TAUTOLOGY

**F3.1 (HIGH — the headline) — `overlayPulseRadius()` recomputes the expected constant; it never
observes the `now` the engine hands `drawOverlay`.** `demo/stories/substrates/constellation.vue:274-277`:

```ts
overlayPulseRadius(): number {
    const phase = (0 % 2600) / 2600; // FROZEN_NOW = 0
    return (12 + phase * 24) * freezeField.k;
},
```

The π spec reads exactly this for its "overlay-phase hash" (`constellation-freeze-live.spec.ts:95`
`pulseRadius: round(f.overlayPulseRadius())`). So the frame-stillness assert "pulse(f1) === pulse(f40)"
and the cross-run "pulse(A) === pulse(B)" can only fail if `field.k` changes — they assert NOTHING about
the frozen-`now` contract. **A regression of the load-bearing D1.2 fix (`Constellation.vue:395` handing
the live `now` under freeze) keeps `proof:constellation-freeze-live` GREEN.** The W-CON3 spec §3 calls
the frozen-`now` handoff "the load-bearing fix" and the DELTA claims "A live `now` handed to
`drawOverlay` would move the pulse radius — it does NOT": that claim is not what the readback measures.
The demo comment (`:269-273` "the spec reads the overlay-phase observable the static frame actually
paints") overstates the same way — it reads the EXPECTED value, not the painted one. The node-position
half of the digest IS genuine (every `field.nodes` position quantised to 0.01px + the warp focal, across
two mounts + 36 rAF — it really catches stepping/drift/warp-advance, and the URL-auto-derive arm's
travel measurement is real). The fix is ~8 lines, demo-side only: a `let lastPaintedNow = -1` captured
by the `drawAnomaly` closure, stamped inside the painter, exposed on `__constellationFreeze`; the spec
asserts `lastPaintedNow === 0` AND stable across the 36-rAF window (or pixel-hash the canvas via
`toDataURL`). Until then the overlay-phase clause of the gate is decorative.

**F3.2 (MEDIUM) — freeze does not PARK: the frozen canvas repaints identical frames at full rAF rate
forever.** `useCanvas2D` parks on PRM (one static frame then park, `useCanvas2D.ts:143-152`), offscreen,
and tab-hidden — `freeze` is component-level and never touches the suspend set, so an on-screen frozen
instance runs `clearRect + drawEdges + drawNodes + drawOverlay` at ~60fps for a static image. The
bespoke slides engine this seam transposes was explicitly "seeded PRNG, **no live RAF**" (quoted at
`AY.W-CON3.md §1 D1`); the spec's "unifies with the reduced-motion one-static-frame path" landed
HALF-unified — predicate folded for stepping/listeners/overlay-`now` (`Constellation.vue:357`, `:426`,
`:459`, `:478`), not for the park. A pptx/`?export` page with several frozen constellations burns
continuous paint work during exactly the capture that wants determinism + quiet. The substrate already
owns the machinery (a suspend reason + `paintStatic`, which also covers the post-resize repaint).
CAVEAT for the fixer: the current repaint loop is what makes the stillness assert observable — land F3.1
(record-at-paint) WITH the park so the protocol stays honest (paint-once → `lastPaintedNow` still
stamps; assert it stays stamped at 0).

**F3.3 (notes, no action) —** the raw-vnode `freeze` read (`Constellation.vue:199-206`) correctly
distinguishes omitted from explicit `false` (the Vue Boolean-cast trap, verified live by the DELTA's
auto-derive arm); the `\b`-bounded URL regex (`:189-191`) does not false-match `?exported`/`?freezer`;
listener registration reads `isFrozen` at MOUNT while stepping reads it per-frame — a consumer toggling
`:freeze` dynamically gets half-live semantics (worth one docstring line, not a defect: the prop is a
capture-pipeline contract, set before mount).

## §4 — W-CON1 RG2 (mobile re-capture) + RG3 (shear arm): STILL OWED, now PAST-DUE

**F4.1 (HIGH, Class-A capture debt) — RG2 unexecuted; the trigger condition has FIRED.** The four
W-CON1 "mobile" PNGs on disk are still 1280×721 desktop shots (IHDR-verified this lane:
`W-CON1-{refit,autodrift}-mobile-{light,dark}.png` → all `1280x721`). The booking
(`AY.W-CON1.md:48-79`) deferred RG2/RG3 to "when the user greenlights the build phase" — Batch-2 WAS
the build phase, the same finisher landed W-CON2/W-CON3 with the working real-mobile protocol
(W-CON2's mobile set is a genuine 390-viewport element capture, `314x421`; W-CON3's is the same box at
2× DSF, `628x842` — both IHDR-verified, the fabrication class did NOT recur), and W-CON1's garbage set
was not back-filled. The debt is past-due and remains machine-invisible: `PROGRESS.md:62` carries the
RG prose note (good) but `proof:live-verified-ledger` still counts the 1280×721 files as valid mobile
(no IHDR dimension assert — the chronic lane's R1, unbuilt). Re-capture is ~30 minutes with the shipped
W-CON2/3 protocol.

**F4.2 (MEDIUM) — RG3 shear arm unbuilt.** `tests-visual/constellation-refit-live.spec.ts` still runs
ONE near-uniform resize (360×240 → 1280×720, sx 3.56 / sy 3.0; `:143-151`) — no portrait→landscape
transpose, no sx≠sy coverage assert. The unit layer gained a non-uniform case but it asserts ONLY
velocity conservation (`constellationField.test.ts:283-294`, 1920×540, sx=3/sy=1.5), not position
coverage under shear. RG3's binding ask (`AY.W-CON1.md:63-74` — the sheared LIVE refit still covers
≥0.9 on both axes) is unmet.

## §5 — Matrix-item verification (the wiring binaries)

- `proof:constellation-egg-live` + `proof:constellation-freeze-live`: **WIRED** at HEAD
  (`package.json:652-653`, beside `-warp-live:651` and `-refit-live:656`). The matrix's "wire into
  package.json" item is DONE — strike it.
- `proof:constellation-field` 25/25, `proof:constellation-tokens` PASS, `proof:constellation-substrate-
  single` PASS (ANOMALY-IS-SKIN held — no anomaly literal in component source) — re-run GREEN this lane.
- AUDIT-LEDGER row 2 (`docs/tranches/AY/audit/AUDIT-LEDGER.md:30`) still reads
  "DONE-VERIFY (warp) · **OPEN (eggs)**" — the eggs half is STALE at HEAD: W-CON2 landed + decided the
  egg scope (well SHIPPED / supernova DEMO-ONLY / flock CUT). Restamp to DONE-W-CON2 (the R7
  finisher-settle restamp class).
- Egg-scope decision (≥2-consumer bar): VERIFIED REAL — `gravityWell` prop + `field.well` + `stepWell`
  shipped (`Constellation.vue:478-515`, `constellationField.ts:570-632`); `grep -rinE 'supernova|nova'
  src/` → 0 (demo-only at `demo/stories/substrates/constellation.vue:281-313`); `grep -rinE
  'konami|flock' src/ demo/` → 0.
- ω-reconcile: VERIFIED REAL — keyframes.js `ω₀ = 2π/response` kept, no second ω; the angular-period
  (not settle) semantics documented at all three sites (`constellationField.ts:645-661`,
  `tokens.css:521-527`); the settle-model + scales-with-response unit asserts exist and pass
  (`constellationField.test.ts:439`, `:474`).

## §6 — Disposition

| finding | severity | owner |
|---|---|---|
| F3.1 overlay-phase readback tautological (gate cannot catch a live-`now` regression) | HIGH | W-CON3 finisher (demo+spec, ~8 lines) |
| F1.4 cool tolerance widened past spec (6% vs 5%), self-contradicting spec file, mobile 13.1% ungated | HIGH | W-CON2 finisher (retune or amend+mobile arm) |
| F4.1 W-CON1 RG2 mobile re-capture past-due (1280×721 still on disk; protocol now exists) | HIGH | W-CON1 RG / W-CARDINAL-INFRA R1 |
| F1.1/F1.2 asymmetric-ramp fix unamended in spec + stale "hold/release" token comments ×2 | MEDIUM | W-CON2 spec amendment + W-DOC1 |
| F3.2 freeze repaints at 60fps (no park; bespoke was "no live RAF") | MEDIUM | W-CON3 finisher (suspend reason + paintStatic) |
| F4.2 RG3 shear arm unbuilt (live spec near-uniform only) | MEDIUM | W-CON1 RG |
| F1.3 22.0 derivation unstated · F1.5 always-on ease-back composition note · §2 soften/warp-prop asymmetries · §5 ledger eggs restamp | LOW | comments / W-DOC1 / R7 restamp |

**Genuinely-perfected vs gate-passing:** the W-CON2 well physics and the W-CON3 freeze engine are real,
careful work (the live-π-caught `k`-scale fix is exactly the harness doing its job, and the
omitted-vs-false vnode fix is the kind of edge most builds miss). What keeps both short of PERFECTED is
the verification residue: one gate leg that cannot fail (F3.1), one tolerance that moved to meet the
measurement instead of the measurement meeting the spec (F1.4), and a spec that no longer describes the
shipped mechanism (F1.1/F1.2) — plus the W-CON1 capture debt that this batch had the tooling to clear
and did not (F4.1).
