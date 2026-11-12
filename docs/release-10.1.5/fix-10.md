# 10.1.5 — fix round 10 (critique-10.md: Q2, Q1, P4, Q3)

Seat: claude-opus-5-5. Commits `402c3eed9` (Q2), `bf1ea2941` and `22224a67a` (Q1), `0e45093b6`
(Q3), `824681c62` (witnesses, probes, drivers), and the records. Every browser run went through
`guarded` (WebKit 2287 under `--exclusive webkit`); none was refused. The guard warned the zone
leak ARMED on every admission (by the owner's order it does not hold runs).

## Q2: a nested group holding the current seat (cured, `402c3eed9`)

**Cause.** The open seat's `:has()` arm in `run.css` matched any child of the run that contains
the current mark, so a consumer's nested `.dock-run` of tabs was sized as one open seat (136 px)
and, no longer a scroll container after O-187, painted its tabs over the seats beside it.

**Cure.** The arm reads only a declared seat, `[data-glass-dock-seat]:has([aria-current]…)`,
which is the predicate `useDockRun.openIndexOf` already reads (it walks `declaredSeatsOf`). The
closed-seat arms and the vertical arms negate the same form. A nested group is now plain markup
on every run rule, sized by its own content. A direct child that is itself marked current is
still the open seat, as before. No token or public API changed.

## Q1: a 1-2 px host change across the fit edge (cured, `bf1ea2941`, `22224a67a`)

**Cause.** Fix 9's 2 px endpoint band held any reading within 2 px of the rest endpoint, so a
real 1-2 px host change waited for the settle, and the flag and the reserve stepped every seat
9-11 px there. A second gap sat behind it: a host that loosens the root's own constraint
(a larger `max-inline-size`) mid-morph resizes nothing observed, since the root is held at its
reserved size, so no capture ran until the settle.

**Cure.** The hold is keyed on the cause. `constraintOf` reads what the host constrains the
endpoint with on the morph axis (the parent's client box, the root's computed min and max, the
viewport). It is noted at the morph's first capture (at rest a parent sized by the dock is the
posture's size, so the rest posture is not the baseline). While none of it has moved, a reading
within the band is the rounding wobble and the endpoint holds (fix 9's D-1 stays cured). Once the
host moves any of it, by any amount, every reading is taken and the yield follows from the rest
port on that frame. A MutationObserver on the root's `style` and `class` re-reads mid-morph when
`constraintOf` has moved, which covers the growth case. `ENDPOINT_BAND_PX` stays a module
constant; no token added or moved, nothing public changed.

A first attempt (unrounded `getComputedStyle` reads, no band) was dropped before commit: it left
the rest port and the run's own port 1 px apart at the fit edge in WebKit. The `p2` witness
also first set its starting clamp through the harness's `?maxw=`, which the harness binds as the
dock's style, so the expand's re-render wrote it back over the host's change; the witness now
writes the starting clamp from the page (`fix-10/edge/*.json` banked the read).

## Q3: the no-zoom floor on `.field-control` (cured, `0e45093b6`)

`.field-control` (Input, Textarea, NumberField) reads `max(var(--type-small),
var(--field-text-floor))`: 16 px under a coarse pointer, unchanged on fine. No token added or
moved. The token docblocks, the forms seam gate and the CHANGELOG name the three recipes.

## P4: not reproduced, not cured

The probe `release-10-1-5-fix-10-p4.spec.ts` traces every frame of a layered first expand
(critic-7's `layers` scene, `maxw=260`) and, at rest, every box the endpoint depends on. Of 128
first expands in WebKit 2287 (64 before the cures, `fix-10/p4/`, and 64 on the final branch,
`final/p4-webkit.log`), every plate rested at 260 with the flag true and no misses. With no
reproduction there is no witness that can go RED then GREEN, and no attribution. The probe stays
in the tree for the next round. Its per-frame `getComputedStyle` reads may mask a style
invalidation miss; a lighter probe is the next step.

## Witnesses (`release-10-1-5.spec.ts`)

- `p2` (Q1), fine at 1440 and coarse at 390: the fit edge found at rest by a 1 px sweep, then
  `E→E-1`, `E→E-2`, `E-1→E+1`, `E-2→E` horizontally and `Ev→Ev-1`, `Ev-1→Ev+1`, `Ev+6→Ev+4`
  vertically, each at 110 and 300 ms: no S1 step over 0.5 px at the settle, and the rest flag is
  the layout's truth.
- `r1` (Q2), 1440 fine and 390 coarse, the current seat first and second in the nested group: no
  two seats' boxes intersect, every seat's centre hits it, the run scrolls nothing, the flag is
  its layout.
- `g4` (Q3) also reads the library's Input: at least 16 px at 390 coarse.

## Runs (records in `fix-10/final/`)

| run | Chromium | WebKit 2287 |
|---|---|---|
| branch, whole release spec | 98/98 | 98/98 |
| `p2`, `r1`, `g4` on the round-10 tip 932823b85's src | 5/5 RED | 5/5 RED |
| `r1` on v10.1.4's src | 2/2 RED | 2/2 RED |
| g6 `release-10-1-4` | 23/23 | 14 + 8 skips, 1 failed (F-4 DataTable settle, 2 vs 1; 20/20 on the A/B re-run) |
| g6 `release-10-1-3` | 60/60 | 58 + 2 skips (D-1 green) |
| D-1 zoom cell, repeated | 4/4 (`try/`) | chain 5/16 (steps 2.00-2.03, one 3.82); A/B back to back (`d1ab/`): branch 16/16, tip 932823b85 16/16, branch 16/16 |
| P4 probe | — | 64/64 rest at 260 |

The RED on the tip reproduces critique 10's numbers: S1 steps 10-10.95 px horizontally, 6.48-7.02
px and 0.98 px vertically, at the settle; the nested group's Results seat hits nothing and Methods
overlaps the icons; the Input paints 14 px. The chain's D-1 failures (11 of 16, at 2.00-2.03 px
against a bound of 2) did not recur in the A/B run that followed: 32 of 32 on the branch and 16
of 16 on the tip, at a 1-minute load of 25-27 (`d1ab/d1ab.txt`; the chain did not log its load).
I record them as unattributed and not reproduced, and the D-1 cell as the next critic's to re-read.

## g7

`final/gates.txt`: typecheck, build, demo:dist:build exit 0; vitest 247 files, 2397 passed, 10
expected fail, 1 skipped. verify:package failed on the bundle ratchet (2954283 > 2953525, +758 B:
the constraint-keyed hold and root-style observer, the declared-seat arm, the field floor), was
rebound on the committed tree, then CLEAN (`final/verify-package-2.log`).

No public API removed or renamed; no token added or moved.
