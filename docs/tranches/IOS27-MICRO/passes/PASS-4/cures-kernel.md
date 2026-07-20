# cures-kernel — the PASS-4 SPINE-CONDUCTOR kernel batch (AGGLOMERATION §6.1-1)

Seat: p4:KERNEL. Verified-model: claude-fable-5 (the system-context model ID, returned
verbatim). 2026-07-19. Targets: `../../prototypes/spine-conductor/` (index.html, check.mjs,
PROBE-NOTES.md) + `../PASS-3/SPEC-SPINE-CONDUCTOR.md`. THE DRAFTING LAW governs; nothing
below paints a new surface — this batch is kernel physics, seam ownership, battery honesty,
and the D5-unblocked live evidence. The owner ruling (`OWNER-RULING-TERMINAL-PASS.md`)
makes this pass terminal; every carry below is named for the lead adjudication, never
parked silent.

**Batch verdict: EXECUTED.** Node battery **86/86 gates PASS (+1 info), exit 0** (the
pass-3 71 + 15 cure gates), re-run after every edit this session. Chrome live: CC battery
**18/18 internal + 18/18 paint-side (G9)**, every Maps cell green, zero console messages
end-to-end. WebKit halves carry to the serialized paint arm (browser-singleton discipline —
this seat drove ONE isolated Chromium tab and released it).

**State found at seat start (disclosure).** The kernel-side cures and the 15 battery gates
were already banked at the owner-pause commit `cdc322b9` by the interrupted prior session.
This seat re-verified every one of them on disk and in the battery rather than trusting the
bank — and found the M-2 call-site collapse INCOMPLETE and live-fatal (item 2 below). The
banked intermediate would have failed QP row 9 (zero page errors) on first touch.

---

## 1. M-1 — park-mid-scrub stale velocity (the D2 kin) + minor 5: CURED, node AND live

**Mechanism (verified on disk):** `Spine.scrubIdle(now)` is now a CLOSED-FORM wall-clock
idle decay — from `max(_agedTo, _lastSample + idleAfter)`, idempotent via `_agedTo`
(`index.html:720-732`) — and `glideTo()` applies it AT DRIVE TIME before reading the seed
(`index.html:679-681`, comment + call), so a parked kernel and a ticking kernel age identically and the
park keeps its zero-cost held idle (the defect path is retained BY DESIGN and gated as
such). The page's own release paths age before the velocity is displayed or read
(`index.html:1383, 1760`). Minor 5 rides the same root: `parkedMidScrub`
(`index.html:804, 956, 966-977`) keeps a park-under-live-gesture from counting as
gesture end, so the periphery dead-time gate stays gesture-scoped (G5).

**Gates (node, the 7-row M-1/D2 section):** parks-mid-scrub precondition PASS (the defect
path is real — Maps-class manifest, no core channels); release velocity **0.0021/s** after
an 800ms still hold with drag velocity 3.09/s (band ≤0.01); wall-clock decay parity **0 vs
1e-9** (drive-time aging ≡ the closed-form idle law); geometry peak **1.0007** in
[0.995, 1.004] — **pre-cure 1.0401, the critic's 4.0% unearned overshoot, now inside the
zero-seed class**; the no-hold falsifiability guard 1.0198 in [1.01, 1.2] (aging must not
kill bought velocity); m5 parks-mid-scrub PASS + periphery live **50ms** after resume
(band ≤60; pre-cure froze ≥100ms).

**Live (Chrome, this session):** the `#bStillHold` cell (drag ~3/s → dead-still 700ms →
release) measured **|v| 0.0054/s · peak−1 0.0008** against bands ≤0.01/≤0.002 — the
MARKS C1 law ("a still finger's velocity is zero") holding in paint on the reference
kernel. A real pointer drag (CDP input) ran the full down/move/up path with the
release-velocity display correctly aged to −0.00/s. The live cell did not exist at seat
start: this seat built it (`index.html:472, 485, 1705-1714, 1820-1830, 1859-1863`) —
the `shLive` band was minted in SC-BANDS with nothing consuming it (a printed-band-
with-no-gate drift, now closed; its wrong "ζ1.0" label corrected to the dock-register
derivation, 0.10-step zero-seed = 0.0011 analytic).

**MEASURED** (node + Chrome). The full Maps release-velocity LADDER carries to the paint
arm (PROBE-NOTES §5.10) with two rungs banked: the still-hold zero rung and the −3.2
flick at 0.023s.

## 2. M-2 — the sworn domain/wells register: IMPLEMENTED (wells + scheduler kernel-owned); the remainder disclosed, never undisclosed

**Implemented (verified on disk):** `useLiquidSpine` consumes `spec.domain.wells`
(`index.html:784`); `release()` consults the G3 momentum-projected trigger ITSELF
(`wellCatch`, `index.html:843-851, 1008-1015` — `wellCrossing` stays the single trigger
authority); the arrival-or-170ms dwell machine is kernel-owned (`catchState` in `tick()`,
`index.html:923-932`); `catching()` is the observation surface (`index.html:1038`); a
scrub cancels the dwell C1 (`index.html:994`); during a dwell the rack reads the ONWARD
gesture intent (`intentOf`, `index.html:816` — a well-latch leak cannot flip a channel);
`simMidCatch` runs this kernel path end to end (`index.html:1103-1115`).

**The call-site collapse — finished by THIS seat.** The banked intermediate had collapsed
`simMidCatch` and the onFrame dwell machine but left the Maps pointer-up and the
`#bCatch` button on the old hand-wired path: they released TO `SC.WELL` (bypassing the
kernel scheduler — nothing scheduled the onward glide, stranding the surface parked at
0.55) and wrote a `mCatchUntil` that was (a) read by nothing and (b) UNDECLARED under the
page's `"use strict"` — a ReferenceError on every Maps pointerdown/reset. Cured: both
sites release to the GESTURE target and only observe `catching()`
(`index.html:1771-1778, 1811-1818`); every `mCatchUntil` reference is deleted (grep: 0).
All four pass-3 copies are now genuinely one kernel path.

**Gates (node, the 8-row M-2 section):** kernel catches on `release(0,−4)` · dwell 175ms
in [120, 220] · onward lands at the TARGET and parks · scrub-mid-dwell cancels · recapture
C1 (0 vs 1e-9) · dwell preserves gesture intent (content 0.0521 vs the ≤0.2 leak bound,
with the 0-rerise monotone guard) · no-wells passthrough (an undeclared domain costs
nothing). **Live (Chrome):** the catch cell through the collapsed page path — dwell 175ms
· near 0.018 · landed 634ms vs sim 628 (±40 band).

**Disclosed remainder (implement-or-excise honored, not evaded):** rubber stays
caller-side (the map proven, the `DragOptions.transform` seam lands at adoption),
μ/tCommit stay page CSS calc bands, detents ride Draggable.snap at adoption — SPEC §1's
stamp rewritten to say exactly this (`SPEC-SPINE-CONDUCTOR.md` §1 block quote), and
PROBE-NOTES §4.10 carries the same split. The §7.1 slot-axis lens obligation now has its
kernel mechanism (the F5-shared artifact can mount ≥3 wells on `domain.wells`).

**MEASURED** (node + Chrome).

## 3. Every CRIT-SPINE finding, with its disposition

| # | disposition at this batch |
|---|---|
| B-1 (D5 dead live battery) | Code half was cured at P3-AGG; **evidence half now Chrome-GREEN**: QP rows 1–3 ran this session — internal 18/18 (warm), G9 paint-side 18/18 (every row within 1 display frame; var→CSS binding incl. the light rim certified on Chromium), interrupt cells 1.0000/0.55. **WebKit halves CARRY** to the paint arm — the ARBITRATION §3.2-SC (i) obligation is Chrome-satisfied, engine-pair-open |
| M-1 (stale release velocity) | **CURED** — §1 above; node 7 gates + live cell, pre/post figures printed |
| M-2 (domain register undisclosed) | **CURED** — §2 above; wells+scheduler implemented, remainder disclosed |
| m1 (§5 arithmetic) | cured at P3-AGG; **composition re-stated for 86** this batch (10+28+31+2+7+8) — SPEC §5 |
| m2 (PROBE-NOTES 15-vs-17) | cured at P3-AGG; §3 now also carries the pass-4 "+15 rows, 71 → 86" paragraph |
| m3 (order-10 residual) | cured at P3-AGG (SPEC §4 GREEN-B line) — verified present, untouched |
| m4 (R2 contention caveat) | cured at P3-AGG; **extended this batch**: the cold-start live-battery seam is filed as PROBE-NOTES §4.12 (first run 14/18 with early-open crossings +73–100ms while closed-form geometry sat exact; warm re-run 18/18 — the warm-run precondition now covers the LIVE battery whole) |
| m5 (mid-gesture park re-arms gate) | **CURED** — one root with M-1; the two m5 gates (parks-mid-scrub + periphery live 50ms ≤ 60) |
| m6 (vCross denominator bias) | **CURED** — v AND t interpolated AT the crossing (`index.html:1683-1690`); live flung cell reads **0.023s** dead on the 0.0233 analytic (pre-cure rode 0.028–0.032 and breached under contention) |
| m7 (mount fence vacuous) | cured at P3-AGG (SPEC §3 sharpened fence) — verified present; note the M-1 gates deliberately run a Maps-class HARNESS manifest under the fence's harness license |

## 4. Spec-battery drift: CURED

The on-disk battery grew 71 → 86 while SPEC §5, the SPEC preamble, and PROBE-NOTES
(header, §2 bank, §3 ledger) still swore 71 — every one now states 86 with the composition
(10+28+31+2+7+8) and the two new sections named; the §2 bank was re-banked whole from this
session's run (exit 0). The SPEC §1 signature comment for `wells` upgraded from
"DECLARED, [DESIGN]" to KERNEL-OWNED; §1.1's G5 paragraph rewritten from cure-owed to
cure-landed with the gate figures. No other spec claim was found stale against the battery
(register arithmetic, clocks, and adjudication rows re-verified by the 86-gate run itself).

## 5. The paint re-runs (the batch's tail) — what ran, what carries

Ran this session (Chromium, isolated tab, `?hud=0`, warm-run protocol, singleton honored —
one tab, closed after): QP-1 internal 18/18 · QP-2 G9 paint-side 18/18 · QP-3 interrupt
cells · QP-6 Maps cells whole (pin 82%/125ms · overpull 0.8%/188ms · flung 0.023s/182ms ·
catch 175ms/0.018/634ms · breathe 3.73% · still-hold |v| 0.0054, peak−1 0.0008) · QP-9
park honesty (rAF parked after every settle incl. the light tail; **zero console messages**
across boot + 3 battery runs + every cell + a real CDP drag).

**CARRIES (named, PROBE-NOTES §5 stamps):** every WebKit half + video-path material reads
(rows 1–6, 9) · QP-7 PRM regression · QP-8 R1/R2 capture-paired runs · the full Maps
release-velocity ladder (§5.10) · the bottom-edge sub-pixel geometry protocol. These are
the serialized paint arm's rows; under the owner ruling any left unrun at pass close go to
the lead adjudication as named RERUN-OWED rows, OPEN by the chartered vocabulary.

## Honesty line

> `[P4-AGG 2026-07-19 — CRIT-KERNEL minor 5]`: the live Chrome figures quoted in §1/§5
> were filed WITHOUT a capture bank of their own (a prose quote, against the standing
> live-verify-capture law). The substance was later discharged whole — the paint arm's
> independent session reproduced every figure with banked logs (`CAP4/spine-conductor/`)
> — so this is process residue, stamped here to keep the law's edge.

Everything above was verified THIS session: the battery re-run after every edit (86/86,
exit 0, output re-banked), every file:line pin re-read on the current tree, the live
figures quoted from cells this seat drove and read back. The prior session's banked cures
were re-verified, not trusted — and one of them (the M-2 collapse) was found incomplete
and live-fatal; the finding and its cure are printed in §2, not smoothed over. This seat
claims NO WebKit truth and NO video-path material truth; every such row is stamped CARRY.
The cold-run 14/18 is reported alongside the warm 18/18, with the mechanism and the
protocol note filed (§4.12) rather than the number discarded. The tree is left
modified-uncommitted — the commit is the user's gate.
