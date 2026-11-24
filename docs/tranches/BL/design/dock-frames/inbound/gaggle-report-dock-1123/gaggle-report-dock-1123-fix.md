# gaggle report dock: G1 fixed, refilmed

**Site** studentsafety report, route R, gaggle-site `site-redesign` at `35c9ebe` plus one uncommitted change to `dashboard/src/report/page/PageDock.vue`. Built 13:51 ET, not deployed. **glass-ui** 11.1.0, unchanged. **Engines** Chromium 149 headless shell and WebKit 2311, Playwright 1.61.1. Filmed Mon 2026-11-23, 15:03 to 15:42 ET, from fixtures (scene `nov23`).

## The short read

- **G1 is fixed.** At 390 and 360 the dock's row now fits its run. Seat sideways travel is 0 px in every motion, both engines, both lenses, both schemes, with and without reduced motion.
- Run overflow is 0 px and run scroll travel is 0 px. Find is cut 0 px.
- **G3 is untouched, as glass ruled.** `disable-transitions` is not passed, and no glass transition rule is overridden. The flip is still a tween, and the words still fade through low contrast for about 0.2 s.
- 1440 and 768 are unchanged: the same seat boxes, the same first-screen record, and the same theme-toggle faults.
- G2, G2b, G4 and G5 are glass's and are unchanged.

## The change

Only gaggle's `max-width: 480px` block in `PageDock.vue` changed:

| Rule | Before | After | Row |
|---|---|---|---|
| Each seat's side padding (`[data-seat]`) | 8 px | 4 px | −24 px |
| The two rules' side margins | 2 px | 0 | −8 px |
| The lamp's words' end pad (gaggle's `page.css`) | 4 px | 0 | none; it keeps the lamp's words inside its 9rem seat |
| The band's side gutter (`.r-dock-seat` padding) | 8 px | 4 px | none; the dock may be 352 px wide at 360 |

- The row went from 365 px to 333 px. The dock is fit-content, so its run's port equals the row.
- Labels stay 14 px. No colour, token, word or glass rule changed, and nothing above 480 px.

## Numbers

Geometry, from a probe added beside the film's (`geom.mjs`, kept in gaggle-site `docs/site/tranches/S/analysis/R-W3/dock-fix-1123/probe/`). Before is Chromium's read of the 10:34 build. After, both engines read the same to 0.01 px.

| Read | 390 | 360 |
|---|---|---|
| Dock width | 374 → 348.64 px | 344 → 348.64 |
| Dock's gap to each screen edge | 8 → 20.69 px | 8 → 5.69 |
| Run port / row | 358 / 365 → 333 / 333 | 328 / 365 → 333 / 333 |
| Overflow | 7 → **0** px | 37 → **0** |
| Find cut at rest | 2.64 → **0** px | 32.64 → **0** |
| Run scroll after a Find press | 7 → **0** px | 37 → **0** |
| Touch targets, coarse pointer (w × h) | menu 90 × 44 → 82.5 × 44; lamp 159.5 × 38 → 152.5 × 38; Find 62.5 × 44 → 57.5 × 44 | the same |

The lamp's 38 px height is the dock's own and is unchanged.

The refilm: this folder's `probe/film.mjs`, copied to scratch, with 360 cells added (360 × 780) and `--film 0`. One browser per run and a new context per cell.

- **390 and 360:** team light, team dark, Gaggle light, and team light with reduced motion. Motions: Find open and close, the section menu (open, Escape, outside tap, a section picked), theme hover in and out, and the theme toggle both ways.
- **1440 and 768:** team light and dark. Motions: theme hover in and out, and the theme toggle both ways.

| Read (target) | Chromium, 12 cells | WebKit, 12 cells | This folder's film |
|---|---|---|---|
| Seat sideways travel (0) | **0 px** | **0 px** | 7 px in every 390 cell |
| Run overflow (0) | **0** | **0** | 7 px at 390 |
| Run scroll travel (0) | **0** | **0** | 7 px |
| Find cut (0) | **0** | **0** | 2.64 px |
| Outer box drift | 0.00 px | 0.00 px | 0.00 px |
| Theme hover: toggle centre / width | 0 / 0 px | 0 / 0 px | 0 / 0 px |
| Theme press: toggle width; centre | −1.17 to −1.2 px; within 0.01 | −1.19 to −1.21 px; within 0.01 | −1.0 to −1.2 px; within 0.01 |
| Theme flip, longest frame | 28 to 64 ms (86 to 113 reduced) | 72 to 188 ms (733 to 879 reduced) | 24 to 104 (74 to 196); 107 to 312 (649 to 2,386) |

- The faults left are of the film's kinds. G2's 3 % press shrink shows on every theme press.
- At 1440 the press leaves a 0.6 px excursion in Chromium and a one-step release in WebKit, as in the film.
- WebKit's reduced-motion cells show G2b: a pressed seat shrinks for one frame with its centre fixed. Find is 2.27 px narrower at 360 and the menu 3.28 px at 390. That is a size change, not a sideways one.

## The theme flip, G3

Read with this folder's `probe/diag/flip.mjs` (base and width made settings) at 1440, Chromium on both builds and WebKit on the new one:

- The plate swaps at once; the words ease over about 0.2 s. The flip is still a tween.
- Light to dark: 1.46:1 at the flip in both builds, about 4.5:1 some 110 ms later, 14.42:1 at the end. WebKit dips to 1.01:1 on the way.
- Dark to light: 1.03:1 at the flip in both builds, 20.34:1 at the end.
- So G3 is present as before. It waits for glass 11.1.2's one clock for plate and words.

## For glass

- G1's own note stands: a run a few px over its port hops in one frame on focus, rather than gliding. Gaggle's dock no longer overflows, so it no longer shows it.
- At 320 px gaggle's row still overflows by 37 px (77 before). It is outside this fix.

## Gates (gaggle)

All held: the build with typecheck, the vendor gate (clean; 0 pins moved), the edge guard, roles (387 of 387), motion, palette, first-screen `all` (gate 8 holds, 0 dock seats off-screen, 88 of 88 rest and band cells as before), and vitest (518 of 521, the same 3 older failures). gaggle-site `docs/site/tranches/S/analysis/R-W3/BUILD.md` section 11 has the full table.

## Correction (gaggle main session, 11-23)
The non-author recheck found the lamp end-pad rule changes no measured width; "Updated 59 min ago" ends 1.2 px inside the seat with or without it. The claim above that it keeps that age inside is withdrawn.
