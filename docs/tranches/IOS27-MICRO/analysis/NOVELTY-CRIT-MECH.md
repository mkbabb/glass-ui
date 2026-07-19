# NOVELTY-CRIT-MECH — the thrice-critical pass, critic 1 (mechanism honesty)

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:CRIT-MECH,
2026-07-18. Lens: mechanism honesty (do the batteries prove what the PROBE-NOTES claim),
Safari honesty, performance cards, scope. No prototype was edited — the judge owns amendments.

## Method

Read whole: `NOVELTY-ROSTER.md`, `REGISTRY.md`, all seven `novelties/*` prototypes
(PROBE-NOTES + check.mjs + index.html, every line), plus the F4/F5 referent sections the cure
pins cite. Ran every battery myself:

| battery | claimed | ran | exit |
|---|---|---|---|
| v-alens | 24/24 | 24 PASS, 0 FAIL | 0 |
| v-dotrel | 43/43 | 43 PASS | 0 |
| v-perch | 39/39 | 39 PASS | 0 |
| v-vapor | 39/39 | 39 PASS | 0 |
| v-wave | 43/43 | 43 PASS | 0 |
| proto-constellation | **60/60** | **63 PASS** | 0 |
| proto-frosted-cure | 68 | 68 PASS | 0 |

All green as run. The findings below are about what the green does and does not prove.

**Verified sound (so the judge does not respend it):** the frosted-cure defect pins are
accurate against the referents (f5 `blur(7px)`/`brightness(1.1)`/`1.5px .45` specular at
`f5-optical-medium/index.html:69-72`, sweep 5.6s at `:181`; f4 `saturate(1.65)` at
`f4-energy-field/index.html:81`, slider `.95→.78` at `:219`, idle ring `0.12 + 0.88·E` at
`:234`, idle cast `0.25` at `:227` — all reproduced verbatim). proto-frosted-cure's battery
is the discipline referent of the set: real pins, real CSS↔JS cross-checks, real fences.
proto-constellation publishes its scalars per-element (the sanctioned wiring), its
ladder-purity probe genuinely detects statefulness (`index.html:828-845` — fwd vs
rndAligned-after-shuffle), and its refine log (PROBE-NOTES:194-216) is honest engineering.
v-perch's seat geometry and press state machine are clean and fully cross-checked. No
`@supports`, no `filter:url()`, no `light-dark(` inset, no `Math.random` anywhere in the
seven pages — the lying-gate and trap laws hold; `-webkit-` prefixes present throughout.

---

## BLOCKERS

None.

---

## MAJORS

### M1 — V-ALENS: the N3 sibling-legibility gate ignores its own declared label alpha; honored, the worst case is BELOW AA. CONFIRMED by arithmetic.

`v-alens/index.html:232` declares `labelColor: [255, 255, 255, 0.92]` — and 0.92 IS the
painted alpha (body color `rgba(255,255,255,0.92)`, `:36`). But `siblingContrast()`
(`index.html:248-258`) computes text luminance from the RGB triple alone
(`this.lum([t.labelColor[0], t.labelColor[1], t.labelColor[2]])`, `:255`) — i.e. opaque
white. Reproducing their own composite with the alpha honored: worst-case bg (accent peak
0.8 over base, panel 0.045, d=0) has L=0.1651 → their reported 4.88:1; text composited at
0.92 over that bg has L=0.898 → contrast **4.41:1 < 4.5**. The battery gate
(`check.mjs:54`, band [4.5, 99]) and the PROBE-NOTES claim ("worst case 4.88 ≥ AA",
`PROBE-NOTES.md:17`) certify a floor the page does not meet on its own declared constants.
**Failure scenario:** the wave adopts the lens with "N3 node-proven" stamped on it; live-π
(QUEUED-PAINT 4) fails or — worse — is skipped because the node gate was green.
**Cure direction (judge's):** honor alpha in the model, then re-earn the floor (label alpha
→ 1.0, or dim the accent under rows, or raise `dim.max`).

### M2 — V-PERCH: the "honest close-order stub" starts the medium relax BEFORE content is out — the beat it claims does not exist. CONFIRMED in code.

`commit()` adds `.leaving` (content fade 170ms, `index.html:79`) and `.relax` (medium
transition delay = `--beat-ms` 140ms, `:61-65`) in the SAME tick (`:263-264`). Timeline from
commit: medium relax begins at 140ms; content finishes leaving at 170ms. The empty-medium
beat — "content fully out, then ~140ms of pure contentless blur, THEN the medium relaxes"
(PROBE-NOTES.md:21-23; MARKS §5's signature moment) — is **−30ms**: the medium is already
30ms into relax when content dies. The honest delay is `contentMs + beatMs` = 310ms. The
battery cannot see it: `closeOrder().orderOK` is `contentMs > 0 && beatMs > 0`
(`index.html:224`) — positivity, not order — and the sim (`:217-226`) returns the constants
without modeling the overlap. **Failure scenario:** the composed V-PERCH→V-VAPOR organ
inherits a beat-less close; QUEUED-PAINT 2's video shows a crossfade where the law demands
the held empty medium.

### M3 — Tautological/vacuous gates recur across four batteries — "node-proven" claims that cannot fail. CONFIRMED (the CRIT-F4 defect class, back again).

- **v-vapor** `catchContinuity` (`index.html:243-250`): `dAfter = xAtCatch; jump =
  |dAfter − xAtCatch|` — identically 0; gate `check.mjs:45` band [0, 1e-9] can never fail.
  PROBE-NOTES calls it "node-proves C¹" (:44) — it proves nothing, and the seam is C0 by
  design (the finger owns v), so the label is doubly wrong. (The page wiring's catch IS
  genuinely continuous — `index.html:335-336` — but that is unproven by the gate.)
- **v-wave** `oneShape.sameTargets` (`index.html:213-216`): `barTarget(4, L)` computed three
  times with the same L and compared to itself. The real claim ("the organ cannot
  distinguish sources") rests only on the keys-equal shape check.
- **v-dotrel** `prmStill` (`index.html:241-245`): constructs `s = {h: to.h, …}` then asserts
  `s.h === to.h` — self-satisfying by construction (the comment admits it).
- **proto-constellation** `simCensus` (`index.html:847-851`): returns max over the hardcoded
  `CENSUS` design table (`:596-600`); gates `check.mjs:71-72` assert a declared constant, not
  machinery. Partially declared (PROBE-NOTES dishonesty 2) — but the gate still reads as
  proof. And `simContinuity` (`:853-865`): the comment claims "4 posture transitions across
  4s — none may touch the carrier" while the loop runs NO posture transitions; `resets`/
  `badge` cannot change.

**Failure scenario:** the pass-2 lesson (four tautological gates, CRIT-F4) recurs at
adoption scale — green batteries laundering unproven claims into the wave.

### M4 — PROTO-CONSTELLATION: event-count-as-clock — the law-16a intent gate and the chip seed assume 60Hz pointer streams. CONFIRMED.

`index.html:1218`: `this.upHold += 1 / 60` per **pointermove event**; the sustain gate
(`REXP.holdS = 0.150`, `:588`) therefore measures event count, not wall time. On a 120Hz
pointer stream (iPad Pro / ProMotion Safari — the campaign's own target class) the "≥150ms
sustained up-drag" fires at ~75ms real time; on coalesced/slow streams it never accrues.
Same family at `:1211`: `Math.abs(dyContent) * 60` as a velocity estimate seeds the chip
spring 2× hot at 120Hz. The battery gates the MATH (`check.mjs:62-65` — holdS ≥ 0.150) while
the wiring feeds it a fake clock; check green, device wrong. **Cure direction:** wall-clock
the hold (`now − holdStart`), and the corpus's windowed LSQ velocity (the Spine already has
`lsqSlope`) instead of per-event dy×60.

### M5 — All five v-* prototypes publish their FAC scalar as an unregistered inheriting var on `:root`, per frame — against the corpus's sanctioned wiring. CONFIRMED.

`v-alens/index.html:319`, `v-vapor:298`, `v-perch:250`, `v-wave:334`, `v-dotrel:306` — all
`document.documentElement.style.setProperty(--engage-t/--scrub-t/--medium-t, …)` inside the
rAF. The survey's own law: `inherits:false` invalidation stays micro-scale on WebKit (35µs
vs 960µs inheriting over 500 children); "@property scalars are the sanctioned wiring"
(`NOVELTY-ROSTER.md:45-47`); F4's risk register names the shared inheriting var a
subtree-storm. proto-constellation does it right (per-element `setProperty`,
`index.html:1323-1362`, `:1515-1521`). Invisible on a 30-node demo page — which is exactly
how it lands in the library unpriced. **Failure scenario:** the lens/vapor/wave mechanisms
adopted verbatim into a real page recalc the whole document per frame on WebKit.

### M6 — The FAC engage-envelope register diverges across four seats — four hand-minted constant pairs, no shared register, no relation-to-vocabulary statement. CONFIRMED.

τ_up/τ_down: v-alens 55/160ms (`index.html:199`), v-perch 55/120ms (`:166`), v-wave 40/220ms
(`:159`), proto-frosted-cure 60/180ms (`:698`). All four are the same mechanism (the FAC
`--engage-t` asymmetric envelope); none names a register or states its relation to the one
spring vocabulary (the cross-family invariant, `REGISTRY.md:349-352`). **Failure scenario:**
the wave lands four different press-acknowledge feels under one token name, and the judge
has no ruling to point at. The judge should mint ONE envelope register (or a per-role
table) before adoption.

### M7 — v-alens/v-vapor: CSS↔JS dual-source with no cross-check, under comments claiming single-sourcing; v-vapor's gate band is fit to its own sim against a mislabeled MARKS citation. CONFIRMED.

- v-alens: the opacity ladder lives twice — CSS calc bands (`index.html:72,81,90`) and
  `ALENS.bands` (`:207-209`) — with the comment "mirrors the CSS exactly" and the tokens
  header "single-sourced: CSS stamps FROM here" (`:227`), which is false: nothing stamps and
  nothing cross-checks (the structural gates check only blur radii presence). v-perch,
  v-wave, and frosted-cure all DO the cross-check — the discipline exists in-house.
- v-vapor: `--beat-ms: 140; --medium-relax-ms: 420` hand-stamped (`index.html:31-32`,
  comment "stamped from VAPOR.close — single-sourced" — false); the sim models the medium as
  exponential τ=0.12s → relax 360ms while paint runs a 420ms bezier. The gate
  `check.mjs:52` ("medium tail", band [400,560], cited "[MARKS §5] relax ~400-450ms") passes
  the sim's 499.5ms only because the 140ms beat is summed in — the sim's actual relax
  (360ms) is OUTSIDE the cited class. That is the systemic defect the registry bans:
  "gate bands derive from MARKS, never from the family's own sim" (`REGISTRY.md:374-376`).

### M8 — V-DOTREL: a mid-relay re-press paints a discontinuous frame — every mid-transition dot snaps to the prior state's flat palette. CONFIRMED in code.

`relay()` (`index.html:316-335`) sets `relayFrom = DOTREL.palettes[state]` — a FLAT palette —
while the lattice is mid-wave; `dotState` returns `from` flat for every dot with `tl <= 0`
(`:161-163`). Press Listening then Focus 300ms later: dots still showing calm→listening
mixes snap to full listening in one frame, then the focus wave crosses. No interrupt gate
exists in the battery; the roster card's own kin (the substrate class, everything-catchable
creed) makes a one-frame pop a paint defect. **Cure direction:** seed the new relay's
per-dot `from` from the currently-evaluated dot state (store last-painted h/s/l per dot),
not from the palette table.

---

## MINORS

1. **proto-constellation PROBE-NOTES claims "60/60 PASS" (`PROBE-NOTES.md:6`); the battery
   prints 63.** Stale count — gates were added after the notes. Notes drift is how sim
   columns rot.
2. **Every page's HUD writes per frame** (`hud.textContent` in each v-* tick;
   `$("#aBadge").innerHTML` per apply in proto-constellation, `:1365`) — the QUEUED-PAINT
   frame-trace gates ("zero layout", "transform-only trace") will be contaminated by the
   instrumentation itself. Declared for proto-constellation (dishonesty 10) but no page
   offers an instrumentation-off switch for the browser arm.
3. **v-wave calls frequency-domain byte energy "mic RMS"** (`index.html:320-322`,
   `getByteFrequencyData` → mean-square of spectrum bytes). Honest level proxy, wrong name;
   `getByteTimeDomainData` is RMS. Gain ×2.6 seat-tuned (declared, PROBE-NOTES 1).
4. **v-vapor's "layers exist only during dismissal" is false as written** — both ghosts are
   always mounted at opacity 0 with `filter: blur()` + masks, and the body's mask +
   backdrop-filter run at rest; only `.closed` removes them. v-alens parks with
   `visibility: hidden`; v-vapor has no parked state. This is exactly the F5 r3 opacity-0
   cost question (`NOVELTY-ROSTER.md:93`) — the reverify queue applies here too.
5. **v-vapor's warm-cream gate tests a property that never paints** (`check.mjs:91,107-108`):
   mask-image uses the alpha channel; the mask's RGB is invisible. And the gate reads ONE
   texel per mask against the claim "R>B on every mask texel" (PROBE-NOTES:9). The honest
   cream evidence is the ghost CSS (`index.html:98-99`) — ungated.
6. **Release-seam estimator drift:** v-vapor seeds release from a single-sample instantaneous
   velocity (`index.html:342-344`) where the corpus discipline is windowed
   (`useDragVelocity` / the Spine's LSQ); proto-constellation PhoneB hand-inlines the
   projection (`this.spine.value + 0.2 * v >= 0.5`, `index.html:1489,1505`) duplicating
   `PROJ_TAU`/`projectDetent` as drift-prone literals.
7. **The re-home decider proves only the instant.** After re-parent, `apply()` guards on
   `parentElement === npBody` (`index.html:1347`) so the art FREEZES for the remainder of
   the ferry — scrub on, art stays. The ≤0.5px claim is honest for the re-home frame;
   PROBE-NOTES 4 declares the fixed-container arm deferred but not the frozen continuation.
8. **proto-frosted-cure pop-overs are not interrupt-safe:** rapid re-toggle leaves the prior
   `openPop` rAF job alive writing transform/opacity against `closePop`'s state
   (`index.html:808-875` — no generation guard). A demo-only seam, but it sits on the one
   page whose register cure the user named, in a campaign whose creed is catchability.
9. **Scope note:** PROTO-ATTENTION-EXIT was chartered as ONE seat (roster §4.2) and landed
   as five pages — acceptable granularity, but the composed organ the roster promises
   (V-PERCH commit → V-VAPOR dissolve; V-WAVE inside V-BLACKDOCK's surface) exists nowhere;
   the `vapor-handoff` CustomEvent (`v-perch/index.html:262`) is the only seam. The judge
   should name the integration owner and wave before adoption language calls these
   "proven together."

---

## Counts

BLOCKER 0 · MAJOR 8 · MINOR 9.

## For the judge

M1 and M2 are arithmetic/code facts with one-line cures — cure before any adoption language.
M3's cure is a gate rewrite, not a mechanism change (the underlying mechanisms mostly ARE
sound; I verified the live wiring by reading). M4-M6 are the adoption-shaped risks: clock
honesty, publication wiring, and one envelope register — each needs a ruling, not a patch.
M7-M8 are battery/paint hygiene in otherwise strong prototypes. Nothing here contradicts the
QUEUED-PAINT ledgers: every paint claim I checked was properly deferred to the video path;
the defect pattern of this pass is node-side overclaim, not paint-side fraud.
