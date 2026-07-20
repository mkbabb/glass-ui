# CRIT-KERNEL—fresh adversarial critique of SPINE-CONDUCTOR post-cure (pass 4)

Seat: p4:CRIT-KERNEL. Verified-model: claude-fable-5 (the system-context model ID, returned
verbatim). 2026-07-19. Non-author of everything read. Targets: `cures-kernel.md`,
`../PASS-3/SPEC-SPINE-CONDUCTOR.md` (as amended), `prototypes/spine-conductor/`
(index.html + check.mjs + PROBE-NOTES.md), and `PAINT-LEDGER.md` order 1 + the SC rows of
orders 5–6. Opening claim-set: AGGLOMERATION §6.1-1 + the CRIT-SPINE findings ledger.
Assumption of guilt applied on four lenses: cure fidelity (every claimed cure re-derived and
falsification-probed), regression (the pass-3→pause→working diffs read whole), half-cures
billed whole, undisclosed excisions (gate deletions, band widenings, roll-up inflation).

**Verdict: 0 blockers · 2 majors · 6 minors.** The cure chain itself is SOUND—every one of
B-1/M-1/M-2/m5/m6 verified on disk, in a fresh battery run, against the banked capture
artifacts, and (for M-1) under an active falsification probe this seat built. What survives
hostile read is gate-honesty residue: two live cells on the reference page gate differently
from their printed bands (one banked reading escaped the printed band under an [ok] stamp),
and the order-1 roll-up claims a named carry redeemed that no pass-4 row ran. Both majors
are of classes this apparatus has already convicted by name (A1's unfailable-gate loop, A8's
roll-up-outruns-the-rows); under the terminal-pass ruling they route to the lead.

---

## 1. What this seat verified independently (the clean half)

- **Battery re-run, exit code read directly**: `node check.mjs` → **86/86 PASS (+1 info),
  node exit 0** (not read through a pipe—the 7.0.0 piped-runner lesson honored). PASS count
  86, FAIL count 0, grep-counted on the raw output.
- **Composition recounted by hand against check.mjs**: registers 10 · spine 28 (2+3+2+10+
  6+2+3) · rack 31 (9+3+3+3+2+1+2+1+2+3+1+1) · adjudication 2 · M-1/D2 7 · M-2 8 = **86**.
  SPEC §5's 10+28+31+2+7+8 arithmetic is correct.
- **Zero excisions across the whole pass**: `git diff 4053ac10 cdc322b9` on check.mjs shows
  **zero deleted lines**—the 15 cure gates are pure additions; the only SC-BANDS edits are
  the five new band rows plus the shLive label rewording. No pass-3 gate weakened, no band
  widened, diff-verified through both hops (pass-3 close → pause → working).
- **M-1 re-derived**: `scrubIdle` (`index.html:720-732`) is the correct closed form—decay
  from `max(_agedTo, _lastSample + idleAfter)`, idempotent via `_agedTo` (repeated calls
  compose to exactly `exp(−(now−t_idle)/τ)`); `glideTo` applies it at drive
  (`index.html:679-681`), `release()` at `:1004`, both page up() paths at `:1383` and
  `:1760`. A ticking kernel and a parked kernel age identically by construction, and the
  parity gate (0 vs 1e-9) pins it.
- **M-1 falsification probe, run by this seat**: a scratch copy with the drive-time aging
  reverted (both `this.scrubIdle(now)` in glideTo and the release-side call) fails exactly
  the cure gates—release velocity **3.0891/s** (band ≤0.01), parity 3.087, peak 1.0198—
  83/86. The gates bite; the cure is load-bearing, not decorative. MEASURED.
- **M-2 collapse verified whole**: `mCatchUntil` grep = **0** occurrences (at cdc322b9 it
  had **4 assignment sites and NO declaration**—under the page IIFE's `"use strict"`
  (`index.html:1246`) that is a ReferenceError on every Maps pointerdown/reset, exactly as
  cures-kernel §2 discloses; the disclosure is accurate, not theater). Both former
  hand-wired sites now release to the GESTURE target and only observe `catching()`
  (`index.html:1771-1779, 1812-1819`); the kernel owns catch/dwell/onward
  (`wellCatch :843-851`, consulted inside `release()` :1008-1015, dwell machine in `tick()`
  :925-932, scrub-cancel :994, `intentOf` :816); `simMidCatch` runs the kernel path
  (:1103-1133). The old pointer-up released TO `SC.WELL`—wellCatch's strict-betweenness
  (`(w.t−x0)·(w.t−target) >= 0 → skip`) confirms that path would have stranded parked at
  0.55 with nothing scheduling onward. The stranding claim is arithmetic, not narrative.
- **D5 cure on disk**: `setRow` prefixes `"#" + mid`/`"#" + vid` (`index.html:1270-1276`);
  zero bare `$("` selectors remain (grep).
- **m6 interpolation correct**: bracketing-sample linear interp in x-fraction for both v and
  t (`index.html:1682-1692`), stored pre-crossing samples, honest raw fallback when the
  first sample is already past. The live flung cells read 0.023s on BOTH engines
  (`CAP4/spine-conductor/log-*.json`, `mFlOvL`), dead on the 0.0233 analytic.
- **The banked capture artifacts corroborate order 1**: this seat parsed
  `CAP4/spine-conductor/log-{webkit,chromium}.json` + `log2-webkit.json` directly. Battery
  summaries: cold 18/18 AND warm 18/18 AND paint-side 18/18 on BOTH engines (so WebKit's
  cold-green non-reproduction of §4.12 is real); still-hold rung overshoot **0.0000 (WK) /
  0.0001 (CHR)** with relV 0.00/s; flick rungs 9.20/s→0.1803 (k=0.0196) and 7.76/s→0.1471
  (k=0.0190), both inside [0.015, 0.030]; `consoleMsgs: []` and `parkRaf: 0` on both; R2
  main-run RED 0.5/0.6 under video vs clean-arm GREEN 0.183 ×2 (the contention story is in
  the logs, exactly as told); PRM clean-arm 0→1→1 / 1→0→0 transitions banked. The ledger's
  numbers are the artifacts' numbers everywhere this seat checked—with the two exceptions
  filed below.
- **Banked §2 output vs fresh run**: every VALUE and verdict identical (deterministic
  battery reproduced to the printed digit). The exceptions are cosmetic and filed (minor 2).
- **Register/canon/law spot-audit**: REG rows carry R-1 {0.35, 0.82} / R-2 {0.40, 0.71} /
  R-3 {0.22, 1.0} exactly; codex laws 19 and 20 exist as cited (light-overshoot,
  hold-envelope—`IOS27-CODEX.md:42-43`); warm canon holds (`#171412` R>B ground, cream 42°,
  no cool leg in the pass-4 additions). THE DRAFTING LAW: the batch painted no new surface—
  the still-hold button/row/cell (diff-verified as the only DOM additions) is battery
  harness, not UI recreation.

## 2. MAJORS

### M-A. Two live pin cells gate differently from their printed bands—and a banked reading escaped the printed band under an [ok] stamp

The page swears "printed = gated" in the header comment, the SC-BANDS block, the table
header, and the battery summary line (F3 G8, carried family-wide). The live pin cells break
it:

- `#mPinCovL` gates **lower bound only**: `cov >= B.pinCov.lo` (`index.html:1720`) against
  the printed "75–92%" (`index.html:478`). The sim cell beside it gates BOTH bounds
  (`inBand(p.coverage83, B.pinCov)`, `:1849`). The live gate's upper half cannot fail.
- `#mPinSetL` gates `set <= 0.220`, hi-only, hardcoded (`index.html:1722`) against the
  printed "100–200ms [REG-LOCK]" (`:479`) and the sim's two-sided `B.pinSettle`
  ([0.100, 0.200], `:1850`). Neither the 220 nor the missing lo is printed anywhere.

And the escape is not hypothetical: **the pass-4 WebKit run banked `mPinCovL: "94%[ok]"`**
(`CAP4/spine-conductor/log-webkit.json`)—outside the printed 75–92% band, displayed [ok],
and PAINT-LEDGER order-1 row 6 then rolled it up as "every cell [ok] ×2 engines: pin
81%/115–121ms"—quoting the SIM coverage figure while the live 94% (WK) / 85% (CHR) goes
unprinted. The 94% is most plausibly a sampling-late v83 artifact (the WK main run carried
774 gaps >24ms under video recording; a late first-frame-past-83ms sample reads more
coverage)—which is precisely the kind of drift a two-sided gate exists to catch and the
lo-only gate silently absorbed. Gate shape predates pass 4 (present at 4053ac10:1618-1620),
but the escape happened THIS pass and the pass-4 row quoted around it. This is A1's
unfailable-gate class on the artifact that is supposed to be the family's gate-honesty
reference. Cure: `inBand` both live cells against the printed bands (or print the +1-frame
settle allowance as a band edit), and re-state the ledger row with the live figures.
MEASURED (gate code + banked log + ledger text, all pinned).

### M-B. The order-1 roll-up claims every §5 carry redeemed; the bottom-edge sub-pixel geometry protocol was never run

PAINT-LEDGER order-1 tally: "PROBE-NOTES §5's CARRY stamps are all redeemed." PROBE-NOTES §5
row 6 stamps, verbatim: "**The bottom-edge sub-pixel geometry protocol + WebKit CARRY.**"
The WebKit half of the cells drained (order-1 row 6, corroborated in the logs)—but the
bottom-edge sub-pixel protocol appears in NO pass-4 ledger row (grep across
`PASS-4/PAINT-LEDGER.md`: zero hits for "bottom-edge"/"sub-pixel"). The only standing
evidence anywhere is pass-3 order 9a row 6's coarse "bottom edge immobile"—a cell-level
observation, not a protocol-grade sub-pixel run. So the roll-up sentence is false in the
letter for one named carry.

The trim, stated honestly: the underlying geometric risk is small (the bottom edge is
pinned by construction—`clip-path` top-edge growth, `index.html:190-192`—and pass-3
observed it immobile on both engines), so this is a roll-up-honesty defect, not a physics
one. But it is the EXACT class CRIT-ASSEMBLY's A8 convicted last pass ("the roll-up words
outrun the rows"), sustained and cured by charter amendment, and the standing user law says
this inflation recurs at exactly this seam. Under the terminal-pass ruling every un-run row
must go to the lead BY NAME—a carry silently marked redeemed is the one disposition the
ruling forbids. Cure: restate the order-1 tally ("all redeemed EXCEPT the bottom-edge
sub-pixel protocol—pass-3 coarse evidence stands, protocol-grade run owed or lead-adjudicated"),
and hand the row to the lead ledger by name. MEASURED (three documents pinned).

## 3. MINORS

1. **SPEC's honesty line still swears 71/71** ("the merged prototype and its node battery
   (71/71 + 1 info…)", `SPEC-SPINE-CONDUCTOR.md:466-467`) against the spec's own 86/86
   evidence line (`:25-28`). As a pass-3 seat's historical statement it is defensible; as
   text in a spec whose §4-drift cure swore "no other spec claim was found stale against
   the battery" (cures-kernel §4), it is the one that got away. One bracketed stamp fixes it.
2. **PROBE-NOTES §2 calls its bank "the exact banked output"; it is not exact.** Four gate
   lines carry hand-rounded band bounds vs the live print (banked `[0, 0.1617]` vs actual
   `[0, 0.1616844099782143]`; same for `0.8133/0.8533`, `0.3919`, `0.3006`) plus trimmed
   trailing whitespace. Every VALUE and verdict matches this seat's fresh run—the bank is
   honest in substance, cosmetically edited in form. Either re-bank raw or label the
   rounding; "exact" is load-bearing vocabulary in this campaign.
3. **The factory silently ignores unimplemented domain keys.** `useLiquidSpine` consumes
   `domain.wells` only (`index.html:784`); a consumer declaring `domain.rubber`,
   `muDown/muUp`, `tCommit`, or `detents` gets a silent no-op—while the sat×source fence
   THROWS at construction (`:794-796`). The CONTRACT-ONLY split is disclosed in SPEC §1 and
   PROBE-NOTES §4.10, but disclosure lives in docs, not in the seam; this repo has a named
   history of silent no-op bindings surviving every static gate. Fence-consistent cure: throw
   (or warn) on unimplemented domain keys at construction until they land at adoption.
4. **The still-hold geometry-peak gate reads through the park epsilon.** The spine parks at
   `|x−target| < 0.0015 && |v| < 0.02` (`index.html:741`), which snaps the trajectory before
   the analytic peak: the 0.10-step zero-seed peak is 1.00111, the gate measures 1.0007—the
   printed figure partially measures the park clamp (0.13px-class at page scale), not the
   spring. Falsifiability is intact (this seat's revert probe read 1.0198 FAIL; the band's
   floor still bites), and the parity + velocity gates carry the physics whole. Worth one
   disclosure line in the gate note so a cold reader does not fit 1.0007 as trajectory truth.
5. **The kernel seat's live Chrome figures were filed without banked artifacts.**
   cures-kernel §1/§5 quotes cell readings from a session with no capture bank of its own
   (the CAP4 logs are the PAINT arm's later, independent session). The standing
   live-verify-capture law wants the delta artifact at claim time, not a prose quote. The
   substance is fully discharged—the paint arm reproduced every figure with banked logs—so
   this is process residue, filed to keep the law's edge.
6. **Order-1 row 5's peak-time figures do not reproduce from the banked artifact.** "peak
   1.00 @ 127ms (CHR) / 162ms (WK)": the banked `lightSeries` gives first-sample-at-1.00 =
   189/224ms, trough-anchored 174/182ms, first ≥0.995 = 96/130ms—no derivable anchor yields
   127/162. The row's substantive claims all corroborate (peak 1.0 reached, cool <0.1 by
   ~1.7s, tail exactly 0, both engines); the anchor/threshold behind the printed times needs
   naming or the numbers re-derived from the series.

## 4. What this critique does NOT find

No physics error (the idle law, the well arithmetic, the register table, and the light
clocks all re-derived clean; the closed forms match to the printed digit). No regression
introduced by either cure batch (the diffs read whole; the M-2 intentOf guard closes the
well-latch leak rather than opening one; park-mid-scrub's zero-cost idle survives the M-1
cure by design and is gated as such). No gate deleted, no band widened, anywhere in the
pass (diff-verified both hops). No half-cure billed whole in the B-1/M-1/M-2/m5/m6 chain—
each carries node gates + live cells + both-engine paint rows, and the disclosed remainders
(rubber/μ/tCommit/detents CONTRACT-ONLY) are stamped in both the spec and the notes. The
undeclared-variable disclosure in cures-kernel §2 is verifiably TRUE (4 bare assignments,
no declaration, strict mode—checked at cdc322b9), which is the apparatus working: the seat
found its predecessor's live-fatal residue and printed it instead of smoothing it. The
drafting law holds—no new painted surface, no screen recreation. Zero console messages,
park honesty, and the R2 contention protocol are all in the banked logs as claimed.

## 5. Disposition demanded

Under OWNER-RULING-TERMINAL-PASS there is no pass 5; everything above routes to the lead
adjudication. M-A: two-sided gates on the live pin cells (one-line each) + the ledger row
restated with live figures—local, mechanical, no re-run needed beyond one battery refresh.
M-B: one tally sentence restated + the bottom-edge protocol either run at the next paint
window or handed to the lead by name. Minors 1–2 are single-line stamps; minor 3 is a
two-line fence; minors 4–6 are disclosure lines. Nothing here reopens the kernel.

## Honesty line

This seat drove NO browser (singleton honored; every paint claim above is read from the
pass-4 arm's banked CAP4 logs, which this seat parsed directly and quotes with their
filenames). Work performed this session: the full battery re-run with the exit code read
directly (86/86, exit 0); the falsification probe (scratch copy, aging reverted, 3 FAILs
reproduced—the probe lives in the session scratchpad, not the tree); every file:line pin
above re-read on the working tree; the three-way diff (pass-3 close → pause commit →
working) read whole for the spine-conductor set; the banked battery output diffed against
the fresh run; the light-series, pin, rung, R2, and PRM claims recomputed from the raw
JSON. The two majors are honesty-of-record findings, not physics findings—stated at major
because both are named recurrences of classes this campaign has already convicted, on the
artifact that anchors the family's evidence discipline. Severity calls are this seat's own.
