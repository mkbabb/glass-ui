# PROBE-NOTES — SPINE-CONDUCTOR merged prototype (IOS27-MICRO pass 3)

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat: p3:SPINE-CONDUCTOR
(the merge seat), 2026-07-19. Status: RUNS; **node battery 87/87 gates PASS (+1 info)** as of
the pass-4 agglomeration (`[P4-KERNEL 2026-07-19]` — the M-1/D2 and M-2 domain.wells cures
added 15 gates to the pass-3 71; `[P4-AGG 2026-07-19]` — the M-2 domain-fence gate joined,
86 → 87, and the LIVE pin cells now gate two-sided against the printed bands, CRIT-KERNEL
M-A/minor-3 cures). Chrome-side live evidence banked this pass (§5 stamps);
WebKit + video-path material reads stay the serialized paint arm's.

Files: `index.html` (self-contained, no build step — the merged kernel `useLiquidSpine`
lives in the `/*SC-KERNEL-BEGIN*/…END*/` block; every gate band lives in
`/*SC-BANDS-BEGIN*/…END*/`, printed = gated), `check.mjs` (extracts both blocks verbatim —
zero drift — and runs the union battery). The parent prototypes
(`../f1-scalar-spine/`, `../f3-channel-conductor/`) stand UNTOUCHED as pass-2 evidence.
Spec: `../../passes/PASS-3/SPEC-SPINE-CONDUCTOR.md`. Instrumentation switch: `?hud=0`
disables all per-frame HUD/badge writes (the novelty minor-2 law).

## 1. What the prototype claims to prove

ARBITRATION §1's ruling in code: F1's scalar spine and F3's channel rack are ONE kernel.
Concretely, on one page:

1. **CC surface** — the full merged rack off one spine: medium (cliff — sat position map
   under scrub, the emergent occupancy rule on release), geometry (the identity channel on
   per-surface register pairs with direction override), content (intent-keyed follow, 65/55ms),
   periphery (delay-gated source-routed follow), light (lead/hold/cool — the law-19 clock,
   law-20 sustain under a held scrub). Buttons run the measured drives; the union interrupt
   scenarios (held g≥sat AND the sub-θ dip) both live here; paint-side sampling mode (G9)
   re-points the recorder at computed style.
2. **Maps surface** — the SAME kernel on the extended domain [−0.10, 1.19]: taffy dead-band,
   clip-path top-edge growth (bottom pinned), the reveal ladder as calc bands of the
   published spine var, rubber overpull with [DESIGN] compression, the declared weak well
   (G3 projected-momentum trigger), the intent latch, and the CONVERGED arrival register.
3. **The charter's physics as gates** — R-1 (dock {0.35, ζ0.82}, overpull converged, k·v
   0.0233s), R-2 (panel {0.40, 0.71} minted), R-3 (orb-drop {0.22, 1.0} minted), the [0,10%]
   fence swept, and the worklist-8 dialect adjudication run live (the superseded arms fail
   or lose on a pre-declared metric IN the battery).

Paint canon: the warm frosted register (NOVELTY-ROSTER §3.5-A) — warm charcoal ground
(R>B), warm tints, cream 42° engagement light. The F1 parent's cool-slate/cyan legs are
HISTORICAL (DESIGN M3); the velocity glow and light rim here are cream.

## 2. Node battery at write time (`node check.mjs` — the banked output; values and verdicts
verbatim, four band-bound prints hand-rounded for line width `[P4-AGG 2026-07-19 — labeled
per CRIT-KERNEL minor 2; "exact" retired]`; the battery now prints 87/87 — the `[P4-AGG]`
domain-fence gate rides after this bank)

```
=== The registers — CHARTER R-1/R-2/R-3 + the [0,10%] fence (R-4) ===
PASS  R-1 dock pair (response, ζ)                         1  band [1, 1] [R-1] 0.30→0.35 AMENDED, ζ HELD; overpull register CONVERGED — no second arrival authority
PASS  R-1 dock f_d (Hz)                              1.6353  band [1.52, 1.7] [MARKS-C-MUSIC dock-event bracket — R-1] 1.52–1.70Hz
PASS  R-1 dock zero-seed overshoot                   0.0111  band [0, 0.03] [MARKS C1/C2] — analytic ~1.1%
PASS  k·v arrival gain (s)                           0.0233  band [0.016, 0.03] [corpus union k·v — 11 fits] — popover attested 0.023–0.025
PASS  R-2 panel f_d (Hz)                             1.7605  band [1.7, 1.85] [MARKS-D-SIRI mark 3 MEASURED — R-2] — the roster's 0.30-0.35 slip corrected
PASS  R-2 panel intrinsic overshoot                  0.0421  band [0.035, 0.055] [MARKS-D-SIRI ζ-bracket-derived] — the ONE not-velocity-bought class (law 14e)
PASS  R-3 orb-drop critical (ζ)                           1  band [1, 1] [MARKS-D-SIRI mark 1 — zero overshoot MEASURED]
PASS  R-3 orb-drop x(215ms)                          0.9846  band [0.97, 0.995] [MARKS-D-SIRI flight bracket — R-3] — flight 215±33ms
PASS  the [0,10%] fence, all registers               0.0421  band [0, 0.1] [REG fence, springPresets.ts:55-58 — STANDS whole (R-4); worst = panel]
PASS  depth grade ×1.20 exact                           1.2  band [1.2, 1.2] [MARKS +20% — normalized form, F3 G7]

=== Overpull return — the CONVERGED arrival register {0.35, ζ0.82} (R-1; C1: no free springback) ===
PASS  zero-seed overshoot (frac of depth)            0.0081  band [0, 0.03] [MARKS C1/C2] velocity-bought only
PASS  zero-seed settle <2px (ms)                        188  band [150, 260] [REG-LOCK on {0.35, 0.82} — re-derived per R-1]

=== Flung landing — corpus parity with C2 (the ONE free spring transient) ===
PASS  overshoot per crossing vel (s)                 0.0234  band [0.015, 0.03] [MARKS C2 — data 0.019]
PASS  settle from rest-crossing (ms)                    176  band [140, 220] [MARKS C2 — model 169–183, data 183]
PASS  crossing velocity sane (/s)                    0.4846  band [0.3, 4] [REG-LOCK flick seed]

=== Pin release (C3: bounds-only, INCONCLUSIVE — register (0.22, 0.75) is DESIGN) ===
PASS  pin covered at 83ms (fraction)                 0.8079  band [0.75, 0.92] [MARKS C3 bounds-only, INCONCLUSIVE]
PASS  pin settle <2px (ms)                              115  band [100, 200] [REG-LOCK — C3 voided the corpus tail]

=== Mid-detent catch — DESIGN vocabulary (C3 voided the corpus instance); G3 projected momentum ===
PASS  catch fires (projected momentum)                    1  band [1, 1] [DESIGN] |v at well| ≥ V_CATCH on the decayRest path
PASS  |v| at well crossing (/s)                        2.65  band [2.2, 20] [DESIGN]
PASS  well dwell (ms)                                   170  band [120, 220] [DESIGN arrival-or-170ms]
PASS  min distance to well during dwell              0.0141  band [0, 0.12] [DESIGN] hesitation AT the well
PASS  land after release (ms, park metric)              628  band [400, 800] [REG-LOCK — park-metric landing on {0.35, 0.82}]
PASS  fast fall from 0.70 catches                         1  band [1, 1] [DESIGN] the G3 counterexample catches
PASS  upward crossing reported (v sign)                   1  band [1, 1] [DESIGN] direction-symmetric helper
PASS  slow ease from 0.60 does NOT catch                  1  band [1, 1] [DESIGN]
PASS  motion away from the well: null                     1  band [1, 1] [DESIGN]
PASS  flick-close (-3.2) does NOT catch                   1  band [1, 1] [DESIGN] the C2 landing scenario stays clean with the well declared

=== The intent law — ONE law, two faces (F1 G6 + F3 G6/OG1); dither at pointer frequency ===
PASS  held jitter flips (latch=1 start)                   0  band [0, 0] [DESIGN] ±0.04 @ 6Hz never strobes
PASS  held jitter flips (latch=0 start)                   0  band [0, 0] [DESIGN]
PASS  slow cross flips exactly once                       1  band [1, 1] [DESIGN]
PASS  slow cross final intent                             1  band [1, 1] [DESIGN]
PASS  fast flick commits early                            1  band [1, 1] [DESIGN] projection lead survives the v̄ filter
PASS  flick commit value < 0.5                        0.416  band [0, 0.5] [DESIGN]

=== Spine C1 invariant: retarget continuity at the catch ===
PASS  C1 position jump at retarget                        0  band [0, 1e-9]
PASS  C1 velocity jump at retarget                        0  band [0, 0.000001]

=== Rubber band + breathe (design vocabulary; the ONE side-breathe constant, OG3) ===
PASS  rubber(100px, D=32) displaced                 20.2299  band [15, 25] [DESIGN] resistive from the first px
PASS  rubber(10000px, D=32) < D                     31.8149  band [25, 32] [DESIGN] saturates at D
PASS  side breathe from the ONE constant             0.0373  band [0.034, 0.041] [REG-LOCK — the ONE side-breathe constant, OG3; measured +3.74% both engines]

=== CC open — the merged rack, 120Hz virtual clock (bands from SC-BANDS, printed = gated) ===
PASS  open: medium 95% (ms)                            76.9  band [0, 100] [MARKS §5 cliff] — occupancy onset + attack 20ms
PASS  open: content 95% (ms)                          198.9  band [150, 250] [MARKS §5]
PASS  open: geometry t99 (ms)                         633.9  band [583, 667] [MARKS §5 600–650 ±17; C6-checked]
PASS  open: geometry s90 (ms)                         371.5  band [300, 650] [MARKS §5 + C6 gesture-owned range] — the 560-620 lock RETIRED with (0.95,1.0)
info  open: fade/stretch (derived)                    0.314  derived-info (F3 G8 demotion adopted) — φ³ ref 0.236; primaries gate it
PASS  open: periphery lag (ms)                        136.9  band [63, 177] [MARKS 80–160 ±17]
PASS  open: light lead t90 (ms)                        50.3  band [0, 60] [DESIGN — law 19 lead class] — light leads, geometry follows
PASS  light: arrival hold (ms)                        214.8  band [180, 240] [DESIGN hold 200ms — R1 input 2]
PASS  light: cool (ms)                                  368  band [333, 417] [MARKS C5 350–400 ±17]
PASS  park after open (pending rAF)                       0  band [0, 0] parked=true @ 1916.7ms — incl. the light tail

=== CC close — the emergent inversion: content out → empty-medium beat → medium relax ===
PASS  close: content out (ms)                         169.1  band [111, 229] [MARKS ~170 ±42 burst ±17] — release τ55ms RATIFIED (R-7)
PASS  close: empty-medium beat (ms)                     102  band [63, 217] [MARKS floor 80−17; ceiling 200+17] — EMERGENT, not authored (worklist 1)
PASS  close: medium gone (ms)                         617.9  band [600, 650] [MARKS §5 ~620 + C6 ~630]

=== Union interrupt arm 1 — HELD (g≥sat at the catch): the medium never moves ===
PASS  held interrupt: medium min                          1  band [0.9995, 1.0001] caught g=0.569 ≥ sat (region asserted); NaN=false
PASS  held interrupt: max step (m/c/p)               0.1303  band [0, 0.1617] law-bounded τ0.055 (light excluded: its attack IS the licensed cut class — SC-BANDS note)
PASS  held interrupt: re-settled + parked                 1  band [1, 1]

=== Union interrupt arm 2 — DIP (caught sub-θ at +330ms): partial relax, re-attack ===
PASS  dip interrupt: medium min                      0.5353  band [0.4, 0.85] [DESIGN, MARKS §5 qualitative anchor] — F1 OG2 retag
PASS  dip interrupt: content min                     0.0025  band [0, 0.1] [MARKS §5] pure blurred field
PASS  dip interrupt: core resettle (ms)                1075  band [300, 1600] [DESIGN]

=== Sub-sat catch — the scrub-arm position map (G4): medium = g/sat under the finger ===
PASS  sub-sat catch: medium = g/sat                  0.8415  band [0.8133, 0.8533] want 0.833 — the N8 sat dial is a register of THIS law
PASS  sub-sat catch: max step (m/c/p)                0.1303  band [0, 0.3919] τ0.02-bounded; parked=true

=== Tempo ×1.3 — ratio invariance ===
PASS  tempo ×1.3: fade/stretch invariance            0.0016  band [0, 0.06] ratio 0.312 vs base 0.314

=== 60Hz held interrupt — continuity at the coarser grid ===
PASS  60Hz interrupt: medium min                          1  band [0.9995, 1.0001]
PASS  60Hz interrupt: max step (m/c/p)               0.2424  band [0, 0.3006] bound 0.301 τ0.055

=== PRM — seats instantly, zero frames (one-poll law, both parents' G7-class) ===
PASS  PRM: release seats                                  1  band [1, 1] x=1, frames=0, light=0 (0 — no hold/cool under PRM)

=== G6 latch — the rack's spring law vs a latched reference (falsification-proven gate) ===
PASS  G6 latch: max dev vs latched ref                    0  band [0, 0.000001] peak 1.308 (must overshoot: >1.05 asserted next)
PASS  G6 latch: episode overshoots (guard)            1.308  band [1.05, 2] falsifiability guard — the row cannot pass on a dead flight

=== H3 lens clock — REG-LOCK demonstration (not corpus): light leads the dock register ===
PASS  H3: light t90 (ms) [REG-LOCK demo]               50.3  band [0, 60] cliff-attack lead
PASS  H3: geometry t90 (ms) [REG-LOCK demo]           170.6  band [120, 400] the dock register follows
PASS  H3: lead ratio [REG-LOCK demo]                 0.2946  band [0, 0.5] emergent from τ ≪ response — never authored

=== useLeadTrail as a two-channel manifest — the substrate-relations proof ===
PASS  lead-trail: trail ≤ lead through the rise           1  band [1, 1] source routing load-bearing; jointly parked=true

=== The sat×source fence (F3 OG3) ===
PASS  sat×source composition throws                       1  band [1, 1] [DESIGN fence] — settled() can never spin on a shaped source

=== M-1/D2 — park-mid-scrub stale velocity (MARKS C1: a still finger's velocity is zero) ===
PASS  still hold: kernel parks mid-scrub                  1  band [1, 1] the defect path is REAL (Maps-class manifest, no core channels); zero-cost held idle stands
PASS  still hold: release velocity (/s)              0.0021  band [0, 0.01] [MARKS C1 — a still finger's velocity is zero; the D2 class] — drag velocity was 3.09/s
PASS  still hold: wall-clock decay parity                 0  band [0, 1e-9] drive-time aging ≡ the closed-form idle law — park cannot freeze the estimator
PASS  still hold: geometry peak                      1.0007  band [0.995, 1.004] [MARKS C1/C2 — overshoot velocity-bought only] — pre-cure 1.0401
PASS  no hold: velocity still buys overshoot (guard)     1.0198  band [1.01, 1.2] [DESIGN falsifiability guard — aging must not kill bought velocity; the 3/s seed decelerates over the 0.1 approach gap]
PASS  m5: parks mid-scrub after convergence               1  band [1, 1] precondition — the pause parks the rack under a live gesture
PASS  m5: periphery live after resume (ms)               50  band [0, 60] [DESIGN — G5 gesture-scoped arming (minor 5)] — park never masquerades as gesture end; pre-cure froze ≥100ms

=== M-2 — domain.wells: the catch scheduler is kernel-owned (G3 in the factory) ===
PASS  wells: kernel scheduler catches                     1  band [1, 1] release(0,-4) consults wellCrossing INSIDE the kernel
PASS  wells: kernel dwell (ms)                          175  band [120, 220] [DESIGN arrival-or-170ms] — kernel-owned, arrival-or-170ms
PASS  wells: onward lands at the TARGET                   1  band [1, 1] the onward C1 glide reaches the gesture target and parks
PASS  wells: scrub mid-dwell cancels the catch            1  band [1, 1] the dwell machine dies with the finger back down
PASS  wells: recapture is C1 (no snap)                    0  band [0, 1e-9]
PASS  wells: dwell preserves gesture intent          0.0521  band [0, 0.2] content keeps CLOSING through the dwell (τ55 ⇒ ~0.05 at 170ms) — the rack reads the ONWARD intent; a well-latch leak holds it at 1.0
PASS  wells: dwell content monotone (guard)               0  band [0, 1e-9] no re-rise mid-dwell
PASS  no wells: passthrough (no phantom catch)            1  band [1, 1] an undeclared domain costs nothing — the fence's letter holds

=== Dialect adjudication (worklist 8) — F1 {20, 65} vs F3 {30, 70} attack arms ===
PASS  superseded medium attack 30ms FAILS the cliff          1  band [1, 1] measured 106.7ms > 100ms — the adjudication is real, not taste
PASS  content 65ms centers ≤ 70ms (declared metric)          1  band [1, 1] |198.9−200| vs |214−200| ms — both in-band; 65 adopted, 70 history

86/86 gates PASS (+1 info)
```

(The pass-3 bank read 71/71; the M-1/D2 and M-2 sections above are the pass-4 additions
`[P4-KERNEL 2026-07-19]` — output re-banked whole from this session's run, exit 0.)

## 3. The dedup ledger (worklist item 2) — every parent row mapped

**F1's 38 → the union.** Kept verbatim: the G3 catch + 10-row truth table (register now the
converged {0.35, 0.82} — dwell/land re-locked), pin (2), intent law (6), C1 retarget (2),
rubber (2). Re-derived on the converged register: overpull overshoot/settle (the old
(0.35, 0.80) overpull row DIED into dock per R-1 — settle lock re-derived 150–260ms), flung
landing (3). MERGED with F3's rows (one mechanism now, one row each): CC open medium/fade,
close fade-out ≡ content-out (F3's derived band kept — the honest ±quantization grammar),
close beat (F3's crossing definition kept: t(m<0.90) − t(c≤0.05); F1's band-pair retired),
close medium-gone (F1's crossing definition kept — m≤0.05 "gone" — with F1's [600, 650]
band; F3's t10 definition retired with reason: under the emergent release arm the relax
START is the beat's edge, the GONE crossing is the corpus's ~620 figure), interrupt
medium-min/fade-min (now the union DIP arm). RETIRED with their register: the ccOpen
(0.95, 1.0) s90 lock 560–620 (the merged CC surface adopts F3's proven (0.60, 1.0) open
pair; s90 gates on the MARKS gesture-owned range instead); the fade:stretch RATIO gate
(demoted to derived-info — the F3 G8 discipline wins: its primaries gate it).

**F3's 19 → the union.** Kept verbatim: geometry t99, periphery lag, park, tempo
invariance, 60Hz continuity rows, PRM one-poll, G6 latch + guard, lead-trail
expressibility. Kept re-labeled: H3 lens-clock rows as [REG-LOCK demonstration], out of the
corpus headline (OG2); the held-interrupt episode (min 1.000 + region assertion + step
bound). Kept re-scoped: the step bounds now run over m/c/p with the LIGHT channel excluded
and the reason printed (its attack is the licensed cut class, law 16b/c; it is gated by its
own lead/hold/cool rows). The sub-sat row kept with the merged approach-from-above note.
SUPERSEDED: the authored close-hold medium arm (hold 0.25 + τ0.17) — the union interrupt
battery adjudicated the emergent occupancy rule (spec §2.1); the F3 attack arms {medium 30,
content 70} — the dialect-adjudication rows carry the failure/metric.

**Added at the union (new evidence, 17 rows — count corrected `[P3-AGG 2026-07-19,
CRIT-SPINE minor 2]`; the enumeration below was always 8+2+3+1+1+2):** the R-1/R-2/R-3 register gates (8), the
fence sweep + depth-grade identity (2), the light channel rows (lead/hold/cool, 3 — corpus
feed #5 landed as clocks), the sat×source fence row, the side-breathe constant row (OG3),
and the 2 adjudication rows.

**Added at pass 4 (`[P4-KERNEL 2026-07-19]`, 15 rows — 71 → 86; `[P4-AGG]` +1 domain-fence
gate — 86 → 87):** the M-1/D2 park-mid-scrub
section (7: park-is-real precondition, aged release velocity, closed-form decay parity,
geometry peak, the no-hold falsifiability guard, and the two minor-5 gesture-scoped-arming
rows) and the M-2 domain.wells seam section (8: kernel-owned catch/dwell/onward, scrub-cancel
+ C1 recapture, dwell-preserves-gesture-intent + monotone guard, no-wells passthrough). The
still-hold row also gates LIVE on the page (`#mStillL`, bands shVel/shLive).

Page-probe dedup: F3's stress-×3 mini-stages are DEDUPED into F1's R1 cost panel (one cost
probe; the inheriting-var price card is already banked both engines). F1's R2
CSS-transition continuity probe carries (the CSS-arm entry ticket, G10).

## 4. Known dishonesties and limits

1. **The node battery is not paint.** The virtual-clock rack and the 1ms sims run the SAME
   code the page ships (extracted verbatim), but every paint claim — material reads, the
   var→CSS binding under real refresh, engine parity — is §5's queue for the serialized
   browser seat. Nothing here says "proven together" about the composed organs (the m9 ban
   stands; PROTO-ASSEMBLY owns that page).
2. **The light hold measures 214.8ms against a 200ms constant.** The +15ms is the arrival
   detector's grid (hold arms on the first sampled core-settled frame after the spine
   parks, and the 0.95 fall crossing adds ~6ms of its own τ). The [180, 240] band is
   [DESIGN] around the constant, not a corpus fit; the C5-fit row is the COOL (368ms inside
   350–400 ±17).
3. **The dialect adjudication's content arm is a centering metric, not a failure** — both
   arms pass every band. The metric (deviation from the MARKS fade-band center) was
   declared before the run and is printed with both numbers; if a future corpus fit moves
   the band, the row re-decides itself. The medium arm IS a failure (106.7 > 100).
4. **The dip-scenario's +330ms catch is scripted** (deterministic for measurement); a
   manual catch via drag behaves identically by construction (same drive path). Same for
   the held-arm catch at +120ms (F3's #6, carried).
5. **The sub-sat held value approaches from above** (0.8415 vs the map's 0.8333) because
   the release-arm decay runs for the ≤1-frame gap between the g-crossing and the scrub;
   the ±0.02 band absorbs it at 120Hz and 60Hz. At very low page refresh the approach term
   grows — the paint row should quote the live value with its dt.
6. **Register names are prototype-local** (`--sc-*`, camelCase register keys). The shipped
   names (`--scrub-t`, the springPresets rows) land at the FINAL wave set per spec §9; the
   kernel carries the R-1-amended dock row {0.35, 0.82} while the on-disk table still says
   {0.30, 0.82} — deliberate, ruled, and labeled in the page footer.
7. **Frame-scale px, not video px** — the phone mocks are 300×620 CSS px; ratios (overshoot
   %, coverage %) are the scale-free contract (F1 #8, carried).
8. **Two pointers on one surface are not handled** (R4 composition is the integration
   seat's artifact, not this page).
9. **The R1 forced-read panel is a proxy** (F1 #6, carried) — only a DevTools trace gives
   honest recalc attribution; WebKit's stays TOOL-DEFER.
10. **CURED `[P4-KERNEL 2026-07-19]` (filed `[P3-AGG]`, CRIT-SPINE M-2): `domain.wells` is a
   KERNEL input now.** `useLiquidSpine` reads `spec.domain.wells` (`index.html:784`); the G3
   momentum-projected trigger is consulted INSIDE `release()` (`wellCatch`,
   `index.html:843-851, 1008-1015`), the dwell machine is kernel-owned (`catchState` in
   `tick()`, `index.html:923-932`), `catching()` is the observation surface
   (`index.html:1038`), and a scrub cancels the dwell C1 (`index.html:994`). The four
   hand-wired call-site copies are
   COLLAPSED: `simMidCatch` runs the kernel path (`index.html:1103-1115`), the Maps
   pointer-up and the scripted button release to the GESTURE target and only observe, the
   onFrame dwell machine is deleted. Seam gates: the 8-row M-2 battery section. What remains
   CONTRACT-ONLY of the domain block, still disclosed: `rubber` (caller-side map — the
   `DragOptions.transform` seam lands at adoption), `muDown/muUp`/`tCommit` (page CSS calc
   bands), `detents` (Draggable.snap at adoption). The §7.1 slot-axis lens obligation now
   has its kernel mechanism.
11. **CURED `[P4-KERNEL 2026-07-19]` (filed `[P3-AGG]`, CRIT-SPINE M-1 + minor 5): stale
   release velocity via park-mid-scrub.** The cure is CLOSED-FORM wall-clock aging applied
   at drive time: `Spine.scrubIdle(now)` decays velocity/intentVel by the idle law from
   `max(_agedTo, _lastSample + idleAfter)` idempotently (`index.html:720-732`), and
   `glideTo()` calls it BEFORE reading the seed (`index.html:681`) — a parked kernel and a
   ticking kernel age identically, so the park may keep its zero-cost held idle. Minor 5
   rides the same root: `parkedMidScrub` (`index.html:804, 956, 969-977`) keeps a
   park-under-live-gesture from re-arming the periphery dead-time gate (G5 stays
   gesture-scoped). Gates: the 7-row M-1/D2 battery section (pre-cure: velocity frozen at
   3.0/s, geometry peak 1.0401; post: 0.0021/s, 1.0007) + the LIVE still-hold cell
   (measured this pass on Chrome: |v| 0.0054/s, peak−1 0.0008).
12. **The live battery has a cold-start measurement seam (first run after load).** Crossing
   t0 anchors at drive time, but exponential channels integrate only from the first rAF —
   a cold first run (fresh tab, automation overhead) shifted the early-open crossings +73–100ms
   (medium 176ms, content 286ms, light lead 123ms, tempo base 0.452) while the closed-form
   geometry rows sat exactly on the node values; the warm re-run in the same tab read 18/18
   with medium 77ms. The R2 clean-run precondition (SPEC §1) applies to the LIVE battery
   whole: warm-run before gating. Kernel behavior is correct (motion starts at the first
   frame with no jump; the wake gap is ≤1 frame outside cold automation).

## 5. QUEUED-PAINT — the merged page's ledger for the serialized browser arm

Every row both engines; WebKit material verdicts on the VIDEO path only (screenshots are
backdrop-filter-blind there); every trace with `?hud=0`; frame-gap statistics, never raw
performance.now deltas; captures stamped and paired with computed samples. This ledger
joins the §O-3 queue at order 9's class (after the seven novelty pages).

**Chrome-side stamps `[P4-KERNEL 2026-07-19]`** — the kernel seat ran the D5-unblocked rows
on Chromium (isolated tab, `?hud=0`, warm-run per §4.12); WebKit halves + video material
reads CARRY to the serialized paint arm:

1. **Full CC battery in paint, internal mode** — **Chrome GREEN: 18/18** (warm run; medium
   77ms, content 187ms, geometry 634/371ms, periphery 142ms, light 39/211/368ms, close
   154/118/619ms, dip 0.55/0.00, held 1.0000/0.169, sub-sat 0.8412, tempo Δ0.016). Cold
   first run 14/18 — the §4.12 seam, warm-run precondition now written. **WebKit CARRIES.**
2. **Paint-side sampling mode (G9)** — **Chrome GREEN: 18/18** (medium 81ms, content 181ms,
   light lead 33ms — every row within 1 display frame of internal; var→CSS binding incl.
   the light rim certified on Chromium). **WebKit CARRIES.**
3. **The union interrupt arms live** — cells GREEN on Chrome inside row 1 (held min prints
   1.0000, dip min 0.55 never clears). **The video no-blur-flicker read CARRIES (both
   engines, video path).**
4. **Sub-sat held scrub** — battery cell GREEN on Chrome (0.8408–0.8412 held). **The paired
   visual-thinning exhibit CARRIES.**
5. **Light channel read** — clock rows GREEN on Chrome (39/211/368ms; rAF parked after the
   light tail). **Video frames paired with `--sc-light` computed samples CARRY.**
6. **Maps battery live** — **Chrome GREEN, all cells**: pin 82%/125ms · overpull 0.8%/188ms
   · flung 0.023s/182ms (the m6 interpolated read — pre-cure this cell rode 0.028–0.032) ·
   catch dwell 175ms/near 0.018/landed 634ms (sim 628 ±40) · breathe 3.73% · **still-hold
   |v| 0.0054/s, peak−1 0.0008** (the D2 live gate) · a real pointer drag ran the full
   down/move/up path with zero errors and an aged release-velocity display. **The
   bottom-edge sub-pixel geometry protocol + WebKit CARRY.**
7. **PRM regression** — **CARRIES** (not run this session).
8. **R1 natural/forced + R2 storm** — **CARRIES** (recording-contention class; the paint
   arm owns capture pairing).
9. **Park honesty** — **Chrome GREEN**: "rAF parked" after every settle incl. the light
   tail; boot parked; **zero console messages** across boot + 3 battery runs + every Maps
   cell + a real drag (pre-cure the pointer path threw ReferenceError — §Honesty, the
   strict-mode residue). **WebKit CARRIES.**
10. **Maps release-velocity ladder** (the M-1 live obligation beyond the still-hold point) —
   **CARRIES to the paint arm**: the ledger row-5 DEFER session, now with the still-hold
   cell as its zero rung banked.

DEVICE-DEFER (fenced, never gates): iOS touch rubber-band feel, real-device Safari.
TOOL-DEFER (fenced): WebKit recalc/residency attribution (Web Inspector — the campaign
§O-4 decision).

## 6. Supersession record (worklist item 8's history clause)

Superseded by this union and recorded here (the parent files stay verbatim as history):
the F3 attack dialect {medium 30ms, content 70ms} and the authored close-hold medium arm
(hold 0.25/τ0.17); F1's overpull register row (0.35, 0.80) — converged into dock {0.35,
0.82} per CHARTER R-1; F1's ccOpen (0.95, 1.0) pair + the 560–620ms s90 REG-LOCK; F1's
`--gl-t` name (dies into `--scrub-t` at the wave set, no alias); the fade:stretch ratio
GATE (derived-info now, F3 G8 discipline). Every retirement carries its register: nothing
was deleted from the parents, and the pass-2 record is untouched.
