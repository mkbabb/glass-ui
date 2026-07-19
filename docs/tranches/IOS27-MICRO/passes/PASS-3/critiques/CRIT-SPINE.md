# CRIT-SPINE — fresh adversarial critique of the SPINE-CONDUCTOR pass-3 set

Seat: p3:CRIT-SPINE. Verified-model: claude-fable-5 (the system-context model ID, returned
verbatim). 2026-07-19. Non-author of every artifact read. Targets: `SPEC-SPINE-CONDUCTOR.md`,
`prototypes/spine-conductor/` (index.html + check.mjs + PROBE-NOTES.md), and the
`PAINT-LEDGER.md` order-9a/10 rows. Opening claim-set inherited: AGGLOMERATION §4 +
CHARTER §1 rulings, per §O-4. Assumption of guilt applied on four lenses: physics fidelity to
the corrected registers, merge-ruling residue, battery honesty (re-run by this seat), and
facility abstraction under THE DRAFTING LAW.

**Verdict: NOT clean — 1 blocker, 2 majors, 7 minors.** The kernel's physics are real (every
closed-form figure recomputed independently by this seat lands exactly), the merge is honored
with zero F1/F3 residue found, and the battery is honest about what it runs — but the battery
does not run in a browser at all (the filed D5 cure never landed), a latent stale-velocity
defect of the exact class the paint arm already convicted at v-vapor lives in the NEW kernel,
and the primitive's sworn `domain` register is not implemented by the artifact cited as its
proof.

---

## 1. What this seat verified independently (the clean half)

- **Battery re-run:** `node check.mjs` → **71/71 PASS (+1 info), exit 0**, reproduced this
  session on the exact on-disk blocks. Extraction honesty confirmed: check.mjs consumes
  `SC-KERNEL`/`SC-BANDS` verbatim (`check.mjs:17-25`), the page renders the same
  `SC_BANDS` texts it gates (`index.html:1196-1203`) — printed = gated holds on both sides.
- **Register arithmetic, recomputed from scratch (not from the battery's own helpers):**
  dock {0.35, 0.82} ⇒ f_d = √(1−0.82²)/0.35 = 1.6353Hz ✓; zero-seed = e^(−ζπ/√(1−ζ²)) =
  1.109% ✓; k·v gain via t_p = atan2(ω_d, ζω)/ω_d ⇒ 0.02327s ✓ (inside the popover's
  0.023–0.025); panel {0.40, 0.71} ⇒ 1.7605Hz, 4.21% ✓; orb-drop x(0.215) = 1 −
  e^(−6.140)(1+6.140) = 0.98463 ✓. The R-2 roster-slip correction re-checked: 0.30 ⇒ 2.35Hz,
  0.35 ⇒ 2.01Hz — only ≈0.40 reproduces the fit ✓. The popover residual: 1.70 − 1.6353 =
  0.065Hz ≈ 3.8% ✓ as stated.
- **Rack clocks, recomputed:** ccOpen (0.60, ζ1.0) critical form gives t90 = 371ms and t99 =
  634ms analytically — the battery's 371.5/633.9 are the true closed form, not tuned
  numbers. Light cool = ln(19)·(0.375/3) = 368ms exactly ✓.
- **Src pins, all real on disk:** `glass-reveal-out` mirrored exit + its own "SAME three
  coupled channels" confession (`src/styles/animations.css:146-170`); the one-detent fling
  advance (`src/components/drawer/composables/useDrawerSnap.ts:361-365` — note the spec's
  §2.8/§9 pin omits the `components/drawer/composables/` path segment); the stale
  "dock: (0.68s, ζ=0.64)" comment (`src/styles/tokens/scheme-spring.css:31`, exact); the
  [0,10%] fence text (`springPresets.ts:57`) and the on-disk dock row response 0.3
  (`springPresets.ts:95-96`) — the kernel's deliberate 0.35 carry is labeled in the page
  footer and PROBE-NOTES §4.6 as ruled ✓.
- **Merge residue hunt: CLEAN.** No `--gl-t` anywhere; no cyan/slate paint (only historical
  mentions in comments); no authored close-hold arm (the superseded {30, 70} dialect exists
  only as `SC.SUPERSEDED` feeding the two adjudication rows); ccOpen (0.95, 1.0) and the
  560–620 s90 lock absent; the overpull register converged into dock in every sim
  (`index.html:989-999` uses "dock"). μ pair on-page: 60/316 = 0.19, 32/316 = 0.101 ✓.
- **Canon compliance: PASS on read.** Warm charcoal ground `#171412` (R>B), cream 42°
  engagement light (`--cream: hsl(42 85% 88%)`), ochre/rose/warm-teal aurora walls, no
  gloss, no cool tint (`index.html:23-97`).
- **Drafting law: NO screen-recreation finding.** The deliverable is `useLiquidSpine` — a
  register/contract/state-machine set. The two phone fixtures are abstract warm-canon mocks
  (letter dots, generic "CONNECTIVITY/BRIGHTNESS" tiles, a "Places" card) that exist to
  exercise the corpus SCENARIOS the MARKS bands came from; no Apple iconography, layout
  mimicry held to the minimum the physics need. Consistent with the parents' accepted
  fixture precedent.
- **Paint-ledger spot checks (order 9a):** row 4's 0.0912/0.12 = 0.760 ✓ and 0.0882/0.12 =
  0.735 ✓; row 6's breathe 0.036/0.964 = 3.734% ✓; R1 probe shape matches the page code
  (180 frames · 40 consumers, `index.html:1758-1794`); R2 threshold 0.30 with 10 toggles ✓.
  The BLOCKED/DEFER stamps are honest and the drain-state tally (57+7+3+7 = 74) is
  internally consistent.

---

## 2. BLOCKER

### B-1. The D5 cure never landed — the live battery is still dead on disk

`PAINT-LEDGER` filed D5 ("`setRow` missing `#` selector prefix ⇒ live battery + interrupt
cells crash, both modes, both engines") and routed it to "SPINE-CONDUCTOR seat — blocks its
QP rows 1–3". At critique time the defect is **still present**: `$` is `querySelector`
(`index.html:1168`), `setRow` calls `$(mid)`/`$(vid)` bare (`index.html:1190-1195`), every
call site passes prefix-less ids (`"m-om"`, `"v-om"`, … `index.html:1402-1511`), and the
targets are `id="m-om"`-class table cells (`index.html:400-425`). `$("m-om")` is a tag
selector for a nonexistent `<m-om>` element → null → the battery promise dies at the first
`setRow`.

Consequence chain: QUEUED-PAINT rows 1–3 (full CC battery in paint, the G9 paint-side
sampling mode, the union interrupt arms' cells) remain BLOCKED — and ARBITRATION §3.2
SPINE-CONDUCTOR obligation (i) reads "the merged medium law green under the UNION interrupt
battery, both engines, **paint-side mode**". That obligation is unsatisfiable until this
one-character-class cure lands and the three rows re-run. A pass cannot bank clean carrying
its own headline artifact's dead battery. (The contrast is stark: the fix is trivial —
`$("#" + mid)` — which makes its absence a process finding, not a hard one.)

---

## 3. MAJORS

### M-1. Stale release velocity via park-mid-scrub — the D2 class, alive in the NEW kernel

The kernel parks whenever `settledCore && lightsSettled` (`index.html:903-912`) — including
**during a held scrub**. `scrubIdle` (the wall-clock velocity/intent decay, the very
mechanism that cures the D2 class) runs only inside `tick()` (`index.html:886`), so parking
freezes the estimator. Reproduced by this seat in node on the extracted kernel, virtual
120Hz clock:

- Long drag with converged channels (saturated region, intent stable), final fast move
  0.60→0.90 at 3.0/s, then a DEAD-STILL hold: **the kernel parks 8ms after the last
  pointermove; `spine.velocity` stays frozen at 3.000/s through an 800ms motionless hold**;
  the page's `up()` then releases with that velocity (`cc` at `index.html:1298-1304`
  passes `s.velocity`; `maps` at `index.html:1654-1679` passes `undefined`, which
  `glideTo` fills from the same frozen `this.velocity`) → measured **geometry peak 1.0401 —
  a 4.0% unearned overshoot** from a still finger. Faster final moves buy proportionally
  more (k·v ≈ 0.023s/unit on the dock register).
- The Maps surface is the worst case: its manifest has NO core channels
  (`MAPS_MANIFEST` = identity + light, `index.html:1556-1559`), so `settledCore` is
  vacuously true and it parks ~140ms into ANY scrub pause — most drags will hit this.
- Control: the same scenario with the hold under an unparked kernel decays velocity to
  0.024/s (scrubIdle works when ticks run) — the defect is precisely the park/decay
  interaction, not the estimator.

This violates MARKS C1's law as the spec itself states it ("velocity-bought only" — a still
finger's velocity is zero) and is the **exact defect class the paint arm filed as D2 at
v-vapor** ("the estimator must age out by wall-clock at release"), now reproduced in the
artifact that is supposed to be the family's reference implementation. No battery row covers
release-after-still-hold — a union-battery gap, so 71/71 stays green over it. Cure class:
age the velocity estimate by wall-clock at drive time (`release`/`glideTo` computes the
idle decay from `now − _lastSample` instead of trusting tick-decayed state), or forbid
parking from erasing scrub-regime liveness; add the drag→hold-still(≥240ms)→release gate to
the union battery (the D2 gate, kernel-side). MEASURED (node repro, this session).

### M-2. The sworn `domain` register of `useLiquidSpine` is not implemented by its own evidence artifact — undisclosed

SPEC §1 swears the primitive's signature with a `domain:` block (muDown/muUp, rubber,
tCommit, detents, **wells**) inside the `useLiquidSpine` call. The shipped factory accepts
none of it: `useLiquidSpine(spec)` reads only
`tempo/el/prefix/prm/now/raf/caf/registers/channels` (`index.html:759-785`). On the page:

- rubber is applied caller-side in BOTH drag handlers (`index.html:1291-1295`,
  `1647-1651`) — defensible, since the spec routes it to `DragOptions.transform` at
  adoption, but the prototype proves the map, not the seam;
- μ/tCommit exist only as page CSS calc bands (`index.html:173-176`);
- the **G3 momentum-projected well-catch scheduler — kernel-sworn ("DECLARED, [DESIGN] —
  the momentum-projected catch scheduler") — is hand-wired at THREE separate sites outside
  the kernel**: the Maps pointer-up (`index.html:1670-1675`), the onFrame dwell machine
  (`mCatchUntil`, `index.html:1566-1577`), and the scripted button (`index.html:1712-1723`),
  plus a fourth copy inside `simMidCatch` (`index.html:1036-1059`). The dwell/exit state
  machine (arrival-or-170ms, onward C1 glide) is exactly the kind of per-surface hand-wiring
  the kernel exists to kill, and at the wave set every wells-bearing consumer (drawer ladder,
  slot-axis lens with ≥3 wells, R2's momentum tick) will need it.

The physics are all proven (the 10-row truth table gates `wellCrossing` + the sim), so this
is not a physics finding — it is a **contract↔evidence mismatch on the sworn primitive
surface, and PROBE-NOTES §4 (the known-dishonesties list) does not disclose it**. §4 discloses
nine limits including trivia (frame-scale px, prototype-local names) but omits "the domain
block is not a kernel input; the wells scheduler is call-site-wired." Either the kernel grows
the domain block (at least `wells` + the catch scheduler) before the spec's §1 signature is
cited as proven-by-prototype, or the spec marks the domain block as
CONTRACT-ONLY/wave-set-build and PROBE-NOTES §4 carries the limit. Also honest to note: with
the domain block unimplemented, the slot-axis lens obligation (§7.1, "N strong wells at slot
centers … via the [DESIGN] catch scheduler") currently has no kernel mechanism to mount on.

---

## 4. MINORS

1. **SPEC §5 composition arithmetic is wrong.** "(10) + (27) + (25) + (2)" = 64, not the
   (correct, re-verified) 71 headline. Actual composition: registers 10 · spine 28 (2+3+2+
   10+6+2+3) · rack 31 (9+3+3+3+2+1+2+1+2+3+1+1) · adjudication 2. The rack bullet lists
   G6/H3/lead-trail/fence rows in prose but drops them from its count.
2. **PROBE-NOTES §3's added-rows count contradicts its own enumeration:** "(new evidence,
   15 rows)" then lists 8+2+3+1+1+2 = 17 (`PROBE-NOTES.md:188-191`).
3. **SPEC §4 does not absorb the order-10 GREEN-B residency residual its own paint arm asked
   to record** (PAINT-LEDGER order 10 row 6: ~2/frame doc-level Paint pair, `mapsSurface`
   attribution 13 ≈ 25% of growth frames — under the 50% trigger, "worth one line in the
   spec's residency note"). §4 still quotes only the pass-2 "0 paints intersecting the card
   body" figure.
4. **SPEC §1's R2 entry-ticket clause lacks the ledger's contention caveat** (order 9a row 8:
   the storm gate is GREEN clean but RED under recording/first-run contention — "the CSS-arm
   entry ticket should note" it). The standing entry ticket should name the clean-run
   precondition or the ticket will false-fail in CI-class environments.
5. **Mid-gesture park re-arms the periphery delay gate.** `wake()` arms `gateUntil` on every
   parked→active transition (`index.html:915-928`); because the kernel parks during held
   scrubs (M-1's mechanism), a drag with a ≥1-frame pause in the saturated region re-imposes
   the 100ms dead-time MID-gesture. G5's "arms on wake-from-parked only" intended
   gesture-scoped arming; `parked` currently aliases "gesture over". Same root as M-1 — the
   cure should fix both (park must not masquerade as gesture end).
6. **The live flung k·v cell has a built-in denominator bias:** `w.vCross` is sampled at the
   first frame past zero with no interpolation (`index.html:1599`), so on coarse/janky grids
   the sampled |v| undershoots the true crossing velocity and inflates peak/|v| — which is
   why the live cell rides the band ceiling (0.028–0.030 vs sim 0.0234) and breached to
   0.032 exactly under recording contention. Interpolate v at the crossing (the page already
   interpolates times in `crossing()`); then the contention note shrinks to honesty.
7. **The mount fence's letter is near-vacuous as written.** "≥2 channels with DIFFERENT laws"
   counts the identity channel, so ANY surface plus a light rim qualifies (the Maps fixture
   itself mounts on exactly identity+light) — while the census excludes Carousel as
   "single-scalar", which would equally qualify the moment it gains a light channel. One
   clarifying sentence (e.g., "≥2 non-identity channels, or one non-identity channel plus
   the domain register in use") keeps the fence's bite.

---

## 5. What this critique does NOT find

No physics error in any shipped constant or closed form (every recomputation matched to the
printed precision). No gate that cannot fail among the corpus-banded rows (the G6 latch
carries its falsifiability guard; the adjudication rows genuinely bite — the 30ms arm's
106.7 > 100 failure re-reproduced). No silent upgrade of DEVICE/TOOL-DEFER rows. No second
spring authority, no re-litigated constant, no roster/spec contradiction against CHARTER §1.
The dedup ledger's retirements all carry registers. The honesty lines in both SPEC §10/§Honesty
and PROBE-NOTES §4 are accurate for what they cover (M-2's omission is the exception, named
above). The paint ledger's verdict vocabulary is used honestly, including against its own
seat's interests (D5 filed on the artifact it was serving).

## 6. Disposition demanded for pass-3 cleanliness

B-1: land the `#`-prefix cure, re-run QP rows 1–3 both engines (internal + G9 paint-side),
re-stamp. M-1: kernel-side wall-clock aging at drive time + the still-hold-release battery
row (node + live); re-run the Maps release ladder (the ledger's row-5 DEFER already owes this
page a velocity-ladder session). M-2: implement `domain.wells` + the catch scheduler in the
kernel (preferred — three call sites collapse to one) or re-scope SPEC §1's signature with a
CONTRACT-ONLY stamp and a PROBE-NOTES §4 disclosure. Minors: one editing pass over SPEC
§5/§4/§1 + PROBE-NOTES §3, the vCross interpolation, the fence sentence, and the G5 wording —
all disposable inside the SPINE-CONDUCTOR seat, no cross-seat dependencies.

## Honesty line

This seat drove no browser; every claim above is node-reproduced (`check.mjs` re-run exit 0;
the M-1 repro on the extracted kernel with the virtual clock, numbers quoted verbatim from
the run) or a file:line fact re-read on disk this session. The M-1 scenario is synthetic
(virtual clock, scripted pointer cadence) — the live confirmation belongs to the paint arm's
next window on this page, and the finding is stated as MEASURED-in-node, not proven-in-paint.
Severity calls are this seat's own; the convergence contract (zero blockers + zero majors
from fresh critics) is the bar they were counted against.
