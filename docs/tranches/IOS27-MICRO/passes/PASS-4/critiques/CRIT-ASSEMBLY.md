# CRIT-ASSEMBLY — pass 4 fresh adversarial critique (proto-assembly · V-MORPHDOCK · V-THINKFIELD · their PASS-4 paint rows)

verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat
p4:CRIT-ASSEMBLY, 2026-07-19. Non-author of every artifact read. No browser driven (the
singleton honored); every claim below is disk arithmetic, re-run batteries, or re-derived
spring math on the pages' own registers — paint demands are named as re-run orders, never
asserted. Synthetic-clock sims are labeled as such.

Inputs consumed whole: `prototypes/proto-assembly/{index.html,check.mjs,PROBE-NOTES.md}`,
`prototypes/novelties/v-morphdock/{index.html,check.mjs,PROBE-NOTES.md}`,
`prototypes/novelties/v-thinkfield/{index.html,check.mjs,PROBE-NOTES.md}`,
`passes/PASS-4/{PAINT-LEDGER.md,cures-assembly.md,OWNER-RULING-TERMINAL-PASS.md}`,
`passes/PASS-3/{AGGLOMERATION.md,CHARTER.md,PAINT-LEDGER.md}`, `analysis/NOVELTY-ROSTER.md`,
`analysis/MARKS-C-APPS.md` (6.2/6.5/7.4/8.x re-read against the builds). Method: all three
node batteries re-run by THIS seat — proto-assembly **189/189**, v-morphdock **58/58**,
v-thinkfield **66/66**, all exit 0 — and every load-bearing mechanism claim re-derived;
three reproduction sims banked at the scratchpad (`crit-kv.mjs`, `crit-seam.mjs`,
`crit-orphan.mjs` under `scratchpad/`), each transcribing the pages' own constants, never
re-tuning them.

**Verdict: 1 blocker · 6 majors · 6 minors. Pass 4 is NOT clean on this surface.** The
assembly cure batch itself held under hostile re-read — A4/A5/A7/A9/n3/n4/D7/D8 all
re-pinned and sound, and the D6/D7/D8 paint clears are honest. The findings below sit
elsewhere: the two NEW bodies re-instantiate three defect classes this campaign already
convicted and cured on other pages (tautology gates, light-as-event, stale release
velocity), the N1 duel decider's banked evidence contradicts its own script narrative —
provably, from the ledger's own cells — and one freshly minted defect (D10) convicts the
page for an instrument error.

THE DRAFTING LAW was checked page by page: all three bodies are generalized facilities
(role FSMs, registers, texture grammars) — no screen recreation found; warm canon held in
every arm the batteries can see. No adoption-language inflation found; morphdock/thinkfield
PROBE-NOTES honesty fences are correctly worded.

---

## 0. THE BLOCKER

### B-1 — The N1 duel's banked evidence contradicts its own script: no arm ran the re-engage leg as claimed, and the morph arm's interrupt leaves immortal orphan writers

**The code facts (CONFIRMED on disk, all three arms).** In v-morphdock, no dismiss path
cancels its arm's engage drives, and every engage settle branch promotes state
unconditionally:

- `dismissMorph` (`index.html:518-541`) never calls `st.stop?.()` and never stops the
  engage label drive (`:512-516`) — after an interrupt, the engage geometry spring (toward
  `G.fillL`), the engage label spring (toward −64), the dismiss evaporation decay, and the
  dismiss label return ALL write the same shared state (`st.sL`, `st.xR`, `st.labelY`,
  `--md-t`, the clip) each frame.
- `engageMorph`'s settle branch (`:506-508`) sets `st.engaged = true` and calls
  `st.stop(); st.stop = null` with no generation check — it fires regardless of an
  intervening dismissal, and if a re-engage has reassigned `st.stop` (`:494`), the orphan's
  settle removes the NEW drive; on the next frame the same branch calls `st.stop()` on
  null — a TypeError inside `tick`'s drive loop, which kills the PAGE-WIDE conductor
  (`ensureRaf`'s `rafLive` stays true forever; all three arenas go dead). Latent,
  timing-dependent.
- `dismissFlip` (`:562-577`) and `dismissGrowth` (`:596-606`) never clear `st.morphing`;
  `engageFlip`/`engageGrowth` settle on LOCAL spring state (`:559`, `:593`), so ~375–410ms
  after engage they set `st.engaged = true` even when a dismissal ran at +120ms.

**The proof from the ledger's own cells (MEASURED — no browser needed).** The duel script
is engage → interrupt-dismiss(+120ms) → re-engage(+620ms) → dismiss(+1320ms). On arm 1 a
full double cycle re-parents the label FOUR times (engage 1, dismiss 2, engage 3,
dismiss 4). The banked QP-1 cell reads **reparents 3** (`PASS-4/PAINT-LEDGER.md:102`).
Three is exactly the no-op parity: engageFlip's local settle fires at ~+375ms
(e^(−ζωt) < 0.004 at t ≈ 0.375s for {0.35, ζ0.82}) → `st.engaged = true` → the +620ms
re-engage returns at the `if (st.engaged || st.morphing) return` guard → only the final
dismiss runs (re-parent 3, a spurious re-home of an already-home label with dx=dy=0). Arm 2
is the same class (local settle ~+410ms → engaged=true → re-engage no-op; its banked
maxStep 0 is consistent). **The QP-1 evidence sentence "the SAME label node through
engage → interrupt(+120ms) → re-engage → dismiss" is false for the banked run on arms 1–2,
and unreliable on arm 3.**

**Arm 3's terminal state (MEASURED in sim — synthetic fixed clock, the page's own
constants, `crit-orphan.mjs`).** Post-interrupt, the orphaned engage label spring
({0.35, ζ0.82} → −64) and the dismiss return spring ({0.12, ζ1.0} → 0) alternate on the
shared `st.labelY` every frame. At fixed 100Hz they deadlock: label locked oscillating
near −2.9px with |v| ≈ 115/s — neither drive's stop window (|v|<2) is ever satisfied —
so the geometry orphan's settle (which requires labelY within 0.25 of −64) NEVER fires:
**`--md-t` pins at 1.000 on a dismissed dock (the halo annulus fully bloomed over an idle
capsule — paint-visible in the banked video between roughly +0.3s and +0.62s of arm 3's
cycle and again after its close), and rAF never parks.** This directly contradicts the
banked QP-7 "post-duel park 0 ×2" for this page — the fixed-dt model and the ledger's park
row cannot both be true as stated; real variable-dt may escape the lock through a lucky
|v|<2 frame, and the re-run adjudicates which story holds.

**The seam number is contaminated too (MEASURED in sim, `crit-seam.mjs`).** The banked
arm-3 interrupt seam of 16.9px (CHR) is reproduced EXACTLY by the two-writer double-step
at 100Hz (the display class the ledger names): the same trajectory with the engage drive
properly cancelled reads 14.0px. So O-2's framing (`PAINT-LEDGER.md:189` — "the retarget
velocity spike at the interrupt is real; whether the roster's 'seam ≈0' re-words or the
spring catch gains a velocity clamp is the LEAD's call") hands the lead a physics decision
for what is substantially a code defect: part of the spike is the stiff retarget (real,
~14px — the roster wording does need honesty), part is the uncancelled second writer
stepping the same state twice per frame.

**What survives:** the duel VERDICT itself — arm 3 census 1 / reparents 0 vs the foils'
2-bodies/3-reparents — is by-construction and structurally banked; nothing here argues the
arm choice. What does NOT survive: the interrupt-seam bound, the re-engage claim on all
three arms, O-2's diagnosis, and QP-7's park truth for this page.

**Failure scenario (live, no instrumentation needed):** any user interrupt of a morph
(dismiss mid-engage) leaves the halo at full bloom on a dismissed dock, the label hovering
or jittering off its slot, rAF live indefinitely — and on the unlucky timing branch, one
TypeError kills every arena on the page.

**Cure class:** per-arm generation guards on ALL drives (the assembly A5 pattern, one
directory over) — dismiss bumps the arm's gen, every drive callback checks it; settle
branches gate on gen too; then re-run QP-1 (all cells), the seam read, and the QP-7 park
row. Feed #7's dependency stays on the RE-RUN, not the banked row.

## 1. MAJORS

### A1 — D10 convicts the page for an instrument error: the k·v law is crossing-anchored, and the page paints its own physics EXACTLY

The pass-4 ledger's row 5 band-FAIL and the D10 mint (`PASS-4/PAINT-LEDGER.md:75,186`)
divide painted overshoot by the RELEASE velocity ("painted k = overshoot/v ≈ 0.0016–0.0039s
vs the chartered ≈0.023s — the arrival under-carries the seed by 6–10×; this page's release
path damps or re-seeds the spring"). But the chartered constant is defined at the
CROSSING: the corpus fits it from events that release at/beyond the target, and the page's
own `kvLaw` sim seeds AT x=1 (`index.html:703-707`). The assembly ladder releases at
g≈0.70 with 0.30 of travel remaining — a ζ0.82 spring dissipates most of the seed en route.

Re-derivation on the page's own register at the ledger's own release points (MEASURED,
`crit-kv.mjs`, substepped like `ASM.makeSpring`):

| release @0.70, v0 | sim overshoot | painted (ledger) | k vs release-v | k vs crossing-v |
|---|---|---|---|---|
| 2.5/s | 0.38% | 0.41–0.45% | 0.0015s | **0.0233s** |
| 4.9/s | 0.91% | 0.86% | 0.0019s | **0.0232s** |
| 7.4/s | 3.05% | 2.87% | 0.0041s | **0.0231s** |

The painted numbers ARE the register's lawful output to within capture tolerance, and k at
the crossing sits dead inside the chartered [0.016, 0.030]. Nothing on the page damps or
re-seeds anything. **D10 as minted is false**; the honest disposition is: row 5 mechanism
AND band PASS at the crossing anchor; D10 re-classes to an instrument/definition note (the
ladder must measure v at the crossing, or seed its rungs at the target as the SC Maps
overpull rungs effectively do — which is why THOSE read k 0.019). The lead should not
spend a tuning decision on this.

### A2 — proto-assembly's release estimators carry the convicted D2 stale-velocity class in BOTH organs, and the pass-4 ledger's "UNIQUE to v-vapor" claim is false on disk

The ledger's D2 row (`PASS-4/PAINT-LEDGER.md:141`) reproduces the still-hold false commit
on v-vapor and declares "the defect is now UNIQUE to this page's un-cured estimator."
It is not. Proto-assembly prunes its velocity boxcars ONLY in pointermove — Organ A
`index.html:1069`, Organ B `:1214` — and neither release path ages the window
(no `lastMoveT`, no wall-clock check anywhere on the page: grep clean). Flick, then hold
DEAD STILL >500ms, then release: the boxcar still spans the last ≤120ms OF MOVEMENT, so
v reads the pre-hold velocity. Organ B's consequence is the convicted crime verbatim:
stale v > `commitAt.v` (1.2/s) fires `vapor-handoff` — a FALSE COMMIT (destructive
dismissal) from a still hold (`:1219-1223`). Organ A's is milder (false velocity purchase;
a still hold at g just under `underG` with stale v > `underV` deploys instead of
returning, `:1078`).

The ledger's assembly "still-hold@0.70" rung read 0.37–0.42% — but that equals the
register's zero-seed-from-0.70 intrinsic (~0.33%, `crit-kv.mjs` with v0=0), i.e. the rung's
scripted approach happened to decelerate to rest before the hold, so the stale window was
never exercised; it certifies nothing about flick-then-freeze. Meanwhile v-morphdock, one
directory over, carries the exact house cure (`stillHoldMs` age-out at consumption,
`v-morphdock/index.html:370,676`) — proving the cure was in-hand the same day this page's
cure batch landed. **Cure:** the morphdock age-out (or the SC M-1 wall-clock aging) on both
assembly estimators + a flick-then-freeze rung in the re-run; the D2 register row re-words
from "unique" to "present wherever the prune-in-move-only pattern ships."

### A3 — v-morphdock's C1-catch gate is a tautology, and the real catch path teleports the fill edge

`catchSim` (`v-morphdock/index.html:377-384`) copies the live spring state and measures the
distance from the copy to itself: `jump = |seized.x − sL.x| + |seized.v − sL.v|` — zero BY
CONSTRUCTION; the gate "catch jump at 80ms" [0, 1e-9] (`check.mjs:70`) can never fail. Its
`midFlight` field is `? 1 : 1` — a dead ternary. This is the A7 class (gates that gate a
definition) SUSTAINED in pass 3 and re-instantiated in a body built the following pass.

And the page's actual catch is NOT continuous: pointerdown mid-morph seizes state
(`:649`) — fine — but the first pointermove of the ensuing scrub hard-sets
`st.sL.x = G.fillL` (`:665`). Caught at, say, sL ≈ 150 mid-sweep, the fill's painted LEFT
edge teleports ~140px to the track edge in one frame. The duel never scrubs, QP-5 scrubbed
only from settled-engaged, so paint has never seen this path. **Failure scenario:** user
presses mid-morph and drags — the fill snaps open discontinuously, the exact "no teleport
frame" claim the battery stamps green. **Cure:** on a mid-morph catch, scrub the LEFT edge
from its seized position on the finger's clock (or land it on the release register), and
replace `catchSim` with a sim that steps the caught state through the actual first-scrub
write so the gate can fail.

### A4 — v-morphdock breaks law 12's value truth on re-engage (a dead knob the page itself documents) and on the keyboard path

`engageMorph` computes `targetR` ("sweep lands at the current value") and then discards it:
`void targetR;` — the right edge always sweeps to `G.fillR_` (`index.html:492-493,501`).
The value scalar `st.frac` survives dismissal, so: engage → scrub to Low (0.22) → release →
dismiss → re-engage paints a **100% fill under a "Low" label** — value ≠ occupied length,
the exact grammar the roster row and MARKS-C-APPS 6.2 mint this body for. Separately, the
keyboard path (`:635-641`) updates `st.frac` and the label text but never restamps the
clip/`st.xR` — arrow-key value changes paint NOTHING (a11y value-truth breach on the one
non-pointer path). Node cannot see either (no re-engage or keyboard gate); no QP row
exercises them. **Cure:** honor `targetR` (delete the `void`), stamp the clip on keydown,
and add a re-engage-at-Low gate to the battery.

### A5 — v-thinkfield's chip is light-as-event with a commit-on-pointerdown: the n3 class, cured on assembly THIS pass, re-shipped in the new body

The chip has ONLY a pointerdown listener (`v-thinkfield/index.html:427-445`; no
pointerup/pointercancel anywhere on it). The "law-20 envelope" it runs: attack until
x > 0.985 (~+292ms at τ0.0695) then AUTO-RELEASES — while the finger is still down. Light
is a fixed-duration pulse, not held state; there is no sustain and no cancel: `answer()`
fires unconditionally at +50ms of pointerDOWN, so a press that would drain anywhere else in
the house commits here — a lost/cancelled pointer commits too. The battery's "sustain at
+2s hold" gate (`check.mjs:78`) gates the analytic `envelope()` object, which the wiring
never implements — the σ8 stamp-vs-paint split, in a body whose PROBE-NOTES cite law 20 by
name. QP-5's paint half honestly deferred the light clocking, so nothing painted has
certified this either. **Cure:** the assembly `makeHoldLight` pattern verbatim (attack on
down, SUSTAIN while held, release on up/cancel on the envelope's own clock; commit on UP
inside the target), then the QP-5 light row re-runs with the press held ≥2s.

### A6 — PRM discipline is incomplete on both new bodies, exactly on the paths the PRM paint rows did not probe

- v-thinkfield chip press: `stopLight = drive(...)` starts the rAF envelope BEFORE the
  `if (prm.matches) { answer(); }` line (`index.html:427-445`) — under PRM the press
  animates a ~1s light arc on rAF (and `answer()` fires twice: once synchronously, once at
  +50ms inside the drive — the second is guard-absorbed but the drive runs to completion).
- v-morphdock scrub release: the detent glide spring (`index.html:679-687`) has no PRM
  branch — engage/dismiss single-step correctly, the release animates.

The banked PRM rows (morphdock QP-8, thinkfield QP-7) probed engage/dismiss and
think-landing only — green there, unprobed exactly here. The one-flip law admits no
exempt paths. **Cure:** PRM guards on both (instant-set light + instant detent land), plus
battery structural gates that grep the two handlers for the PRM branch.

## 2. MINORS

1. **Invalid `font` shorthand ×5 — the declarations drop whole (BOUNDED, spec-read, not
   painted).** `font: 600 14px/40px inherit` and kin (`v-morphdock/index.html:147,183`;
   `v-thinkfield/index.html:134,145,157`): a CSS-wide keyword is invalid as a shorthand
   component, so the entire declaration is dropped in both engines — chip/send/controls
   typography falls back to inherited 15px/400 (morphdock's label is rescued by
   `.md-label`'s own longhands; thinkfield's "answer now" chip and ↑ send are not).
   Cure: longhands (`font-family: inherit; font-size: …; font-weight: …; line-height: …`).
2. **v-thinkfield's press-ack light paints on the wrong body.** `--tf-light` is consumed
   only by `.composer::after` (`index.html:124-128`) — pressing the CHIP blooms the
   composer 90px away while the pressed chip shows nothing, and the send button (the
   actual commit control) has no press light at all. The C-MUSIC mark-1 grammar is the
   pressed control's own light leading its own change. Rides the A5 cure.
3. **v-morphdock law-12 dots deviation + one more unfalsifiable gate.** The dots layer
   paints ALL detent dots above the fill (DOM order `:201-203`; dots at every detent,
   `:464-468`) — the measured grammar is "EMPTY detents render as dots" (MARKS-C-APPS
   6.2, DESIGN note 3). And `scrubSim`'s `minFill` applies the capsule floor inside its
   own `Math.max` (`:363`), so the check.mjs:60 floor gate gates the clamp expression
   against itself — honest as a mirror, unfalsifiable as a gate.
4. **v-thinkfield instrument hygiene.** Idle-mote lightness 0.78/0.58 hand-inlined in
   `paintIdle` (`:350`) outside `tokens` — the one paint constant the mirror locks cannot
   see; the HUD's "sweep N °/s" is an EMA of the token constant printed as if measured
   (`:411-413`) — the paint arm correctly measured the real rate elsewhere, but the page's
   own cell is an echo; `paintThink` reassigns `canvas.width` every frame via `sizeCanvas`
   (`:362`) — a per-frame buffer realloc that QP-6 shows this hardware absorbs, still a
   free cost cut.
5. **proto-assembly `?hud=0` bypasses.** Two direct `hud.textContent` writes skip the HUD
   flag: the PRM handoff branch (`index.html:1246`) and Reset (`:1289`) — trace arms that
   press Reset or run PRM write into the DOM they swore silent. One-line `hudSay` routing.
6. **Dead code + a confirm-in-place.** v-morphdock's PRM rule sets `transition: none` on
   `.halo-layer` which has no transition (`:185-188`); `catchSim.midFlight`'s `? 1 : 1`
   (`:383`, part of A3's surface). And D9 re-verified STILL-OPEN as the ledger states
   (`v-thinkfield/index.html:104` yield defeated by the paused `:90` animation) — noting
   for the cure's scope that the co-shipped `transition: opacity 420ms` (`:91`) is equally
   dead under the running animation; the cure must land the yield through BOTH facts
   (`animation: none` on the thinking state, or hoist the yield to the un-animated wrap).

## 3. What was hunted and HELD (the clean half, stated so the cures are not re-litigated)

- **The pass-4 assembly cure batch is sound.** A5 gen-guards + seam cancel (`:1227,1240`),
  A4 seize + scope declaration (`:1054-1063`), A7 painted-beat anchor (the `contentOutD`
  inverse re-derived by this seat: D≈0.949, contentOut 132ms, delay 287ms — arithmetic
  exact; the negative control honestly fails the gates), A9 stamps + darkmass stop-parse,
  n3 hold light, n4 tokens, the D7 fence arithmetic (172.8 / 352.88 re-computed), the D8
  substepped integrator (convergence gate fails a single-step revert — verified failable
  by inspection of the band). 189/189 reproduced.
- **The D6/D7/D8 paint clears are honest** — instrumented anchors, printed fences, printed
  bases; the D7 autopsy (probe-inside-the-grown-extent) is the campaign's best method note
  and O-4 is correctly promoted to law.
- **The two new bodies' REGISTER arithmetic is right**: morphdock f_d 1.635Hz on the R-1
  amended row, sweep/evaporation/label-flight/asymmetry all re-derived in-band; thinkfield
  sweep 55°/s dt-integrated (rate-invariant), law-11 floor 7.62px/s / ±19% / floor 0.68,
  lattice deterministic, bloom 1.545. The physics blocks are honest; the defects above
  live in the WIRING and the GATES, not the constants.
- **No screen recreation, no supports-gates, no SVG filters, no light-dark insets, no
  Math.random, no :root publication** — re-greppcd clean on all three bodies.

## 4. Named re-runs this critique creates (for the terminal-pass adjudication)

1. QP-1 duel re-run POST-cure (B-1): all cells, the seam pair (cancelled-writer vs banked),
   the +0.3–0.6s halo window read on the EXISTING banked video (no new session needed to
   confirm the bloom artifact), the QP-7 park row re-read for this page.
2. Assembly flick-then-freeze rungs on BOTH organs (A2) after the age-out lands — Organ B's
   is the destructive one.
3. Morphdock catch-then-scrub row (A3) + re-engage-at-Low row (A4) — node gates first,
   then one paint session.
4. Thinkfield held-press light row (A5) + PRM press trace (A6).
5. D10 re-class needs NO browser: it is a ledger-text cure (row 5 → PASS at the crossing
   anchor; D10 → instrument note) — the lead can rule it from `crit-kv.mjs`'s table.

## Honesty line

This seat drove no browser. The three batteries were re-run by this seat (189/58/66, all
exit 0). The B-1 parity proof consumes the ledger's own banked cell (reparents 3) — that
part is MEASURED against pass-4's own evidence; the arm-3 deadlock and the crash branch are
fixed-dt sims (100Hz, the pages' own constants, banked in the scratchpad) and are labeled
BOUNDED — real variable-dt may escape the lock, which is exactly what the named re-run
adjudicates; the seam reproduction (16.9px vs the ledger's 16.9px CHR) is sim-to-paint
correspondence, not paint. A1's table is arithmetic on the page's own register — the
painted numbers themselves are the ledger's and are not disputed, only their divisor. The
font-shorthand minor is spec-reading (BOUNDED), not a painted verdict. Nothing in §3 was
taken on faith from the cure log — every pin there was re-opened on disk. The tree gains
exactly this file plus three scratchpad sims; the commit is the user's gate.
