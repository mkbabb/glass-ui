# 10.1.5 — fix round 9 (critique-9.md: P1, P2, P4; inbound O-186/O-187)

Seat: claude-opus-5-5. Commits `a81516114` (P1/P2, first pass); after the reboot `956b1889a`
(O-186/O-187), `9fffeee9c` (ratchet), `26a93c9b4` (q1 judging), `c0cb5e685` (a first D-1
attempt, superseded), `3be8e0bca` (the endpoint hold: D-1, P1 and P2 in their final form), and
the records. The first pass stopped on the guard's zone refusal; the second pass ran every arm.

## Cure (P1, P2), first pass

(Its final form is the endpoint hold, under D-1 below: the reading holds through a morph
unless the host moves the endpoint past a 2 px rounding band, and then reads as this section
describes.)

`publishYield` (dockMorphMeasure.ts) no longer holds its reading through a morph. While the
full pane is active and `[data-morphing]` is set, the run's port is the rest port: the
expanded endpoint (`restSize`, read with the host's constraint as at rest) less the
expanded chrome and the run's edge (`runEdge`, its border box less its port), both read at
rest. At rest the run's own port is read, as before. So a morph reads what its rest reads
(no step at either edge, N1 kept), and a host that resizes the dock mid-expand moves
`data-run-fits` and `--dock-run-room-block` on the frame it lands, not at the settle. No
token added or moved; nothing public changed.

## Witness

`release-10-1-5.spec.ts` `p1` (fine and coarse): `h-to-220`, `h4-to-200` and the vertical
yield-band cell (320 fine, 344 coarse), the host resize at 110 and 300 ms; S1 (net of the
run's scroll, so WebKit's P3 re-snap does not enter) steps no more than 0.5 px at the
settle, and the rest flag is the layout's truth.

| run | result |
|---|---|
| Chromium, branch, `p1` + `n1` (`fix-9/branch-chromium.log` as committed at `58f4c0436`; the second pass overwrote it) | 4/4 GREEN |
| Chromium, `p1` on 51af0f9b5's `dockMorphMeasure.ts` (`fix-9/red-51af0f9b5-chromium.log`) | 2/2 RED (horizontal 10 px at the settle, both cells, both times; vertical fine 3.98 px) |
| `npm run typecheck` (guarded --light) | exit 0 |

## First pass: guarded refused

The first pass's next heavy run (`witness-fix-9.sh chromium g6`) was REFUSED by guarded
(`kernel zone data.kalloc.1024 at 8.02M`). After the reboot every run below was admitted.

## Second pass (after the reboot), on `26a93c9b4`

| run | Chromium | WebKit 2287 |
|---|---|---|
| branch, whole release spec (`branch-*.log`) | 94/94 | 94/94 (`p1` and `n1` among them) |
| `p1` on 51af0f9b5's `dockMorphMeasure.ts` (`red-51af0f9b5-*.log`) | 2/2 RED (first pass) | 2/2 RED: horizontal 11 px (`h-to-220`) and 10 px (`h4-to-200`) at the settle, fine and coarse, both clamp times; vertical fine 3.98 px |
| `q1`-`q3` on the branch (`branch-q-chromium.log`, `branch-webkit.log`) | 6/6 | 6/6 |
| `q1`-`q3` on v10.1.4's src (`red-v1014-q-*.log`) | 6/6 RED | 6/6 RED |
| g6 `release-10-1-4` | 23/23 | 15 + 8 skips |
| g6 `release-10-1-3` | 60/60 | 57 + 2 skips, 1 failed: D-1 (below) |

g7 (`gates.txt`): typecheck, build, demo:dist:build exit 0; vitest 247 files, 2397 passed,
10 expected fail, 1 skipped. verify:package first failed on the bundle ratchet (2953426 >
2952772: +654 B, fix 9's rest-port reading and the scoped run selectors), rebound on the
committed tree at `9fffeee9c`, then CLEAN (`verify-package-2.log`). The vitest run first
caught one source-text gate fix 9 broke: G-DOCK-MORPH matched the literal
`if (!root.hasAttribute("data-morphing")) {`, which fix 9 rewrote as
`const morphing = …; if (!morphing) {` with the same meaning. The gate now reads that form
(`g-dock-lattice.test.ts`).

## Final, on `3be8e0bca` (records in `fix-9/final/`)

| run | Chromium | WebKit 2287 |
|---|---|---|
| branch, whole release spec (`p1`, `n1`, `q1`-`q3` among them) | 94/94 | 94/94 |
| `p1` on 51af0f9b5's src (`red-51af0f9b5-*`) | 2/2 RED | 2/2 RED |
| `q1`-`q3` on v10.1.4's src (`red-v1014-q-*`) | 6/6 RED | 6/6 RED |
| g6 `release-10-1-4` | 23/23 | 15 + 8 skips |
| g6 `release-10-1-3` | 60/60 | 58 + 2 skips (CDP swipe); D-1 green, and 16/16 repeated (`../d1p1.txt`) |

g7 (`final/gates.txt`): typecheck, build, demo:dist:build exit 0; vitest 247 files, 2397
passed, 10 expected fail, 1 skipped; verify:package failed on the ratchet (2953525 > 2953426,
+99 B, the endpoint hold), rebound at `4f5fd4a85`, then CLEAN (`final/verify-package-2.log`).
One run of the two measure unit files, among four, failed `a capture keeps the run's scroll
position` and passed on the three re-runs and in the full suite; I record it as a timing flake
under load, not a defect of this round.

No public API removed or renamed; no token added or moved (`ENDPOINT_BAND_PX` is a module
constant).

## D-1: the WebKit leaving-summary step (cured, `3be8e0bca`)

The WebKit g6 run failed the 10.1.3 bottom-anchored ancestor-zoom D-1 cell at 2.65 px against
the bound of 2. A/B in WebKit, 8 repeats per arm (`d1-ab.txt`; the first branch arm timed out
waiting for its page and is void): branch at `26a93c9b4` 3 failed (2.46, 2.64, 2.24 px);
51af0f9b5 (before fix 9) 1 failed (2.03 px, the step critique 9 recorded); v10.1.4 0 failed.

**Cause, from a per-frame probe** (`release-10-1-5-d1-probe.spec.ts`, `d1probe-*-webkit.jsonl`,
6 expands per arm). Under WebKit's ancestor `zoom` the expanded endpoint, re-read on every
morph frame from the root's ResizeObserver, lands 1 px either side of its rest
(`--dock-expanded-px` 331, 332, 333 frame to frame), and the leaving summary moves with each
re-publish. On 51af0f9b5 that alone gives steps of 1.90 to 2.04 px. Fix 9 then fed each wobbling
reading into the yield, so the run's room changed mid-expand (6, 6.5, 7, 7.5 px) and the steps
grew to 2.64 px. v10.1.4 reads a stable 326 px (no yield padding) and steps 0.87 to 0.93 px.

**Cure.** The endpoint a morph starts from (the last at-rest reading) holds through the morph
while a fresh reading stays within a 2 px rounding band of it (`ENDPOINT_BAND_PX`: two
whole-pixel reads of one box under a zoom differ by up to 2 px). The run's yield holds with it.
A reading past the band is the host resizing the dock: the endpoint follows it, and the yield
is read from the rest port on that frame, as fix 9 had it (P1, P2). A first attempt
(`c0cb5e685`) gated only the yield, at 0.5 px, and made D-1 worse (8 of 16 failed, up to
3.61 px; `c0cb5e685-*.log`, `d1p1-c0cb5e685.txt`), because the wobble passed its threshold and
the endpoint was never held.

**After the cure** (`d1p1.txt`, WebKit 2287): D-1 16/16 (the probe's largest visible step
0.73 to 0.81 px, `d1probe-branch-webkit.jsonl`); `p1` and `n1` 4/4; `p1` on 51af0f9b5 still
2/2 RED.

## O-186 and O-187 (inbound-O-186.md)

**Cure.** Every run rule in `run.css` names the dock's own run,
`.glass-dock :where(.dock-layers) > .dock-run`, never a `.dock-run` a consumer nests among
the seats. The scroll container, the reserve and its spacer boxes, the lattice, the open seat
and the timeline are the run's, and `:where()` keeps each rule's specificity. A nested group
is now plain consumer markup: no scroll container, no padding or negative margin, no second
`--dock-run` timeline. Gregg's reset rule becomes unnecessary. Nothing public changed and no
token moved.

**What reproduced on v10.1.4** (both engines, `red-v1014-q-*.log`): the flat fit-content
static dock at 1440 hovering its trailing icon computes `50% calc(47.9167% + 0.666667px)
calc(47.9167% + 0.666667px) 50%` with the run 2 px over its port (the hover lens, the r1
path), and every rest corner is `9999px`; the nested group is a scroll container that clips
its hovered tab's ink; two elements name `--dock-run`. On the branch before this cure the lens
was already gone (r1 lengths and `data-run-fits`), but the nested group was still a scroll
container with the run's reserve.

**Witnesses** (`release-10-1-5.spec.ts`, harness `seats` with `?backdrop=static`,
`?current=`, `?nest=1`), 1440 and 390, desktop pointer, both engines:
- `q1`: the fit-content static dock, flat and nested, at rest and under hover on every control
  at 150 and 850 ms: one corner of half the cross extent, no percentage, and the run scrolls
  nothing. All reads are banked, so the RED names every failing path.
- `q2`: in the nested group each hovered tab is hover-scaled and its ink lies inside every
  clipping ancestor up to the dock.
- `q3`: exactly one element in the dock names `--dock-run`, the active full pane.

The nested scene has no current tab. With `aria-current` inside the group, the run's open-seat
`:has()` arm sizes the whole group as the open seat (136 px), on v10.1.4 too. That is the
lattice reading the group as one seat. Gregg's measurements show his group is not sized that
way, so the witness does not include it, and I record it rather than change the open-seat rule
in a patch.

## P4

Not cured, not attributed (both passes). It is intermittent (2 in about 80 WebKit expands) and I
did not reproduce it within this round's runs, so no witness can show a cure RED then GREEN. The layered run rests at the narrow layer's extent with the
narrow layer's seats in flow; that path runs through DockCrossfade's face registration,
which this round did not touch. The hold this round removes was not the whole cause
(critique 9: the round-8 tip, with no hold, also missed).
