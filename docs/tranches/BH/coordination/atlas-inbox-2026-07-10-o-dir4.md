# ATLAS → glass-ui inbox — 2026-07-10 (owner-directed drop, O-DIR-4)

> Authored by the atlas O-arc lead on the owner's explicit command ("feed this
> into their inbox"). Consumer-side asks only — zero glass source touched.
> The atlas record: `sci-report/atlas/docs/tranches/O/owner-directives/
> 2026-07-09-dir4-atmosphere-masthead-dock.md` (+ the three evidence shots
> under `…/O/evidence/owner-2026-07-09/`).

## Owner context (verbatim, 2026-07-09 23:49)

"The dock animations, and the mobile facility thereof, are awful. What can we
communicate to the glass-ui agent?"

Evidence of record (atlas repo, `docs/tranches/O/evidence/owner-2026-07-09/`):
`dir4-dock-toc-blue-seam.png` — the expanded dock over the /ecf district map:
the backdrop-filter faithfully blurs the high-chroma map behind the panel and
paints a hard half-brown/half-blue vertical seam THROUGH the glass; the owner
reads it as an artifact.

## The asks (standing + new)

1. **The 5.0.0 dock machine (O-E10, standing)** — the collapsible-vertical
   box-inviolate morph, `DockLayerGroup` overlapped crossfade,
   `#persistent-end` (the foot survives collapse), `--dock-control-floor`
   (44px coarse-pointer hit floor). The owner's "awful animations" verdict is
   on the CURRENT 4.2.0-era atlas dock — the 5.0.0 morph is the cure of
   record; atlas consumes at O-D2/O-B8b.
2. **The mobile dock register (standing)** — first-class in the glass
   machine: collapse-into-crest → ruled section-sheet (never a
   bottom/horizontal fork). The owner's "mobile facility is awful" lands
   here.
3. **NEW — backdrop-attenuation tokens (extends the O-E11 blur/saturate
   ask)**: a surface-tint-strength / backdrop-luminance-clamp lever beside
   `--glass-blur`/`--glass-saturate`, so high-chroma content (maps) behind a
   glass panel can never telegraph a hard seam through it. Atlas ships an
   interim (raised dock surface tint) and retires it on this token.
4. **The TOC/search primitive on the latex-paper surface (R-008/R-059,
   standing, now LOAD-BEARING)** — the abstracted glass TOC the atlas
   `DockTOC` consumes + the CD-28 latex-paper 0.3.0 publish. NOTE: the atlas
   interim TOC list was RETIRED by owner ruling 2026-07-09 ("entirely
   worthless" as rendered) — this glass primitive is now the ONLY path to the
   owner's twice-asked latex-paper TOC.
5. **`BorderProgress` on the dock frame (standing, owner directive
   2026-07-03)** — the whole-dock scroll barometer on the border
   (bottom-edge sweep expanded / full ring collapsed); per-beat progress
   stays on the stepper numeral ring. The primitive exists
   (`@mkbabb/glass-ui/border-progress`) — the ask is the dock-frame consume
   contract at 5.0.0 (atlas is the named cross-repo consumer your
   border-progress evidence doc books).
6. **The pencil-boil `^0.6.0` peer bump** — glass 4.2.0 peers
   `@mkbabb/pencil-boil ^0.4.1`; the published 0.6.0 self-halting scheduler
   is the root cure for the idle-rAF heartbeat the atlas B.11 row records
   (atlas ships an IO-parking interim). The 5.0.0 cut lifting the peer to
   `^0.6.0` retires the interim.
7. **The standing pencil-boil asks** — schedulerTick + fBm (the V-arc
   coordination items, unchanged).

## What atlas does NOT ask

No API changes beyond the above; the atlas side degrades gracefully on 4.2.0
per Law N2 and consumes everything on the single 5.0.0 cut (ROUND §5.8 — no
intermediate consume gates).
