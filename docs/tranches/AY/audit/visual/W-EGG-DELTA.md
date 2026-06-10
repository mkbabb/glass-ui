# W-EGG — the six divined easter eggs, each PRM-fenced — DELTA

**Wave:** AY.W-EGG · **Status:** live-verified · **Verdict:** PASS
(G-FREDRAW / G-KONAMI / G-CMDK / G-MASCOT / G-ECLIPSE / G-PRM / G-DELTA).

Six eggs, each a COMPOSITION of shipped machinery, each
`prefers-reduced-motion`-fenced. The ℱ wordmark redraws itself as a Fourier
epicycle curve, konami reveals the full-bleed aurora, ⌘K fuzzy-navigates every
story (first-class — half affordance), the empty-states page carries a
pointer-leaning blob mascot + the missing 404 lattice, and a long-press on the
shell dark toggle plays a slow eclipse. The ONE new code unit is `dftFromPoints`
(the forward-DFT sibling of the shipped `positionsAt` inverse — general, not an
ℱ-overfit). Device: Chrome-headless-new against the live demo on `:5199`; each
egg born-RED at HEAD (the interaction produced no reaction) and π-witnessed
firing.

---

## G-CMDK — ⌘K opens the shipped CommandDialog + navigates (born-RED: no global ⌘K)

The shell mounts `CommandPalette` (dogfooding the shipped `CommandDialog`), ⌘K /
Ctrl+K bound in the `registerShortcut` registry (`allowInInput` so it works
anywhere, `preventDefault` so the browser's find isn't hijacked). **π readback
(1280-desktop, light + dark):** ⌘K opens the palette (`[data-slot="command"]`
visible); typing `dialog` filters to **Dialog (Containers) + Confirm Dialog
(Feedback)**; Enter selects → `location.pathname` CHANGED off
`/foundations/intro`. **Born-RED at HEAD:** no ⌘K in the registry, `CommandDialog`
unused by the shell. The OPEN/CLOSE rides the shipped dialog grammar (already
PRM-honoring); navigation works under reduce (the affordance, not a gag).
Captures: `W-EGG-cmdk-palette-desktop1280-light.png`,
`W-EGG-cmdk-palette-desktop1280-dark.png`.

## G-FREDRAW — the ℱ wordmark redraws as an epicycle curve (born-RED: navigate-only)

`dftFromPoints(points)` lands in `fourier-field/math.ts` (the forward DFT — the
inverse of the shipped `positionsAt`; general points→spectrum, exported from
`/fourier-field`). The hand-traced ℱ outline (`demo/eggs/fGlyphPoints.ts`,
arc-length-resampled, robust over a variable-font SVG walk) feeds it; the
`FRedrawOverlay` reconstructs the glyph on a Canvas2D epicycle chain, then fades.
The wordmark long-press / dbl-click dispatches the redraw. **π readback
(1280-desktop, light + dark):** the `canvas[data-egg="f-redraw"]` overlay paints
**>200 non-blank pixels** (the red ℱ epicycle reconstruction mid-sweep, the
counter-rotating arms visible over the intro aurora). **Born-RED at HEAD:** the
wordmark was a navigate emit only; no `dftFromPoints`. PRM-fence: under reduce
the overlay paints the COMPLETED ℱ curve once (no animated reconstruction, no
arms). Captures: `W-EGG-f-redraw-desktop1280-light.png`,
`W-EGG-f-redraw-desktop1280-dark.png`.

## G-KONAMI — the konami sequence reveals the full-bleed aurora (born-RED: runtime-dead)

The konami buffer detector (`demo/eggs/useKonami.ts`, gated off input focus) →
the `KonamiAurora` full-bleed `<Aurora>` at `opacityCeiling: 1` for a bounded
~9s window, then fades + restores. **π readback (1280-desktop):** dispatching
↑↑↓↓←→←→ B A live → `[data-egg="konami-aurora"]` present with `data-shown="true"`;
the rose/blue/amber painterly field fills the viewport. **Born-RED at HEAD:** the
sequence dispatched live gave zero DOM reaction (298→298 element count). PRM-fence:
under reduce the reveal snaps to the static painted frame (no fade drift). Capture:
`W-EGG-konami-aurora-desktop1280-light.png`.

## G-MASCOT — the empty-states mascot + the 404 lattice (born-RED: 0 blob, no 404)

- **The 404.** The router catch-all now renders `demo/eggs/NotFound.vue` (was a
  root redirect) — a constellation lattice + "404 / Lost in the lattice" + a
  glass card. **π readback (1280-desktop, light + dark):** navigating
  `/this/route/does/not/exist` → the body carries "Lost in the lattice". Reuses
  the shipped Constellation `warpOnClick` (auto-off under reduce — the PRM fence).
  Captures: `W-EGG-404-lattice-desktop1280-light.png`,
  `W-EGG-404-lattice-desktop1280-dark.png`.
- **The mascot.** `compositions/empty-states` mounts a small pointer-leaning
  `<GooBlob>` (`data-egg="empty-states-mascot"`) + the "Nothing here yet — but the
  blob's keeping you company" copy. **π readback (390-mobile, light):** the mascot
  element is mounted. The pointer-lean is the shipped `useBlobPointer`; under
  reduce the `useWebGLCanvas` substrate PRM-freezes (static droplet). Capture:
  `W-EGG-mascot-mobile390-light.png`. The blob SUBSTRATE seam (the page backdrop)
  is W-SB-STAGE's; W-EGG drives the MASCOT register.

## G-ECLIPSE / E6 — the shell dark toggle + the long-press eclipse (born-RED: no register)

E6 — `DarkModeToggle` is placed in the rail `#persistent` region beside ℱ (the
affordance E5 hangs off; FD §9.2.12: the dark register was hidden on its own
story page). E5 — an opt-in `eclipse` prop arms a long-press slow-eclipse register
(the sun↔moon cross-fade stretched to ~1.6s via `data-eclipsing`); the bare
`@click` flip is byte-identical to HEAD (the default-path canary, `eclipse:false`).
**π readback (1280-desktop, light + dark):** the `.demo-sidebar-dark-toggle` is
visible in the rail; a long-press (650ms hold) sets `data-eclipsing="true"` and
flips the mode through the stretched register. **Born-RED at HEAD:**
`DarkModeToggle` was click-only, no long-press, no eclipse, lived only on its
story page. PRM-fence: under reduce the long-press flips INSTANTLY (the
`data-eclipsing` transitions are `none`). Captures:
`W-EGG-eclipse-desktop1280-light.png`, `W-EGG-eclipse-desktop1280-dark.png`.

## G-PRM — every egg is motion-fenced

Each egg suppresses or goes static under `prefers-reduced-motion: reduce`:
ℱ-redraw paints the completed curve once (the `prefersReduced` branch in
`FRedrawOverlay`); konami snaps to a static aurora frame (the `@media
(prefers-reduced-motion: reduce)` block in `KonamiAurora`); the blob mascot +
404 lattice freeze (the `useWebGLCanvas` PRM-freeze + `warpOnClick` auto-off);
the eclipse flips instantly (the `prefersReduced` instant-flip + the
`transition: none` block); ⌘K navigation still works (only the dialog open/close
is motion-gated, via the shipped grammar). Asserted by `proof:easter-eggs`
(21/21 seams present incl. each egg's PRM fence) + the source witnesses above.

## Egg inventory (the §1.2 ledger)

| egg | mechanism (shipped) | the new seam | PRM fence |
|---|---|---|---|
| E1 ℱ-redraw | `positionsAt` + the wordmark | `dftFromPoints` + `FRedrawOverlay` | completed curve once |
| E2 konami | `<Aurora>` + `registerShortcut` | `useKonami` + `KonamiAurora` | static aurora frame |
| E3 ⌘K | `CommandDialog` + the manifest | `CommandPalette` (⌘K-bound) | nav works (dialog grammar) |
| E4 mascot + 404 | `<GooBlob>` + `Constellation` | `NotFound` route + the mascot | substrate PRM-freeze |
| E5 eclipse | `DarkModeToggle` SVG | the `eclipse` opt-in long-press | instant flip |
| E6 shell toggle | `DarkModeToggle` | placed in the rail `#persistent` | n/a (affordance) |

## Captures (10 PNG, honest dimensions)

- `W-EGG-cmdk-palette-desktop1280-light.png` (1280×800), `W-EGG-cmdk-palette-desktop1280-dark.png` (1280×800)
- `W-EGG-f-redraw-desktop1280-light.png` (1280×800), `W-EGG-f-redraw-desktop1280-dark.png` (1280×800)
- `W-EGG-konami-aurora-desktop1280-light.png` (1280×800)
- `W-EGG-404-lattice-desktop1280-light.png` (1280×800), `W-EGG-404-lattice-desktop1280-dark.png` (1280×800)
- `W-EGG-mascot-mobile390-light.png` (390×844)
- `W-EGG-eclipse-desktop1280-light.png` (1280×800), `W-EGG-eclipse-desktop1280-dark.png` (1280×800)
