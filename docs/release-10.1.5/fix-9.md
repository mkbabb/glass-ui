# 10.1.5 — fix round 9 (critique-9.md: P1, P2, P4) — STOPPED by the guard

Seat: claude-opus-5-5. Commit `a81516114`.

## Cure (P1, P2)

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
| Chromium, branch, `p1` + `n1` (`fix-9/branch-chromium.log`) | 4/4 GREEN |
| Chromium, `p1` on 51af0f9b5's `dockMorphMeasure.ts` (`fix-9/red-51af0f9b5-chromium.log`) | 2/2 RED (horizontal 10 px at the settle, both cells, both times; vertical fine 3.98 px) |
| `npm run typecheck` (guarded --light) | exit 0 |

## Not run: guarded refused

The WebKit `p1`/`n1` arm queued for the `webkit` lock and was stopped by me to requeue one
full chain; the next heavy run (`witness-fix-9.sh chromium g6`) was REFUSED by guarded:
`kernel zone data.kalloc.1024 at 8.02M ... reboot the Mac`. So not measured: WebKit (branch
and RED), the full branch spec and g6 in both engines, g7 (build, demo:dist:build, vitest,
verify:package; the bundle ratchet will likely need a rebind), the c9e/c9f re-runs.

## P4

Not cured, not attributed. The layered run rests at the narrow layer's extent with the
narrow layer's seats in flow; that path runs through DockCrossfade's face registration,
which this round did not touch. The hold this round removes was not the whole cause
(critique 9: the round-8 tip, with no hold, also missed).
