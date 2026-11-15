# fourier.babb.dev: findings whose cure is in glass-ui

2026-11-12. From `critique/fourier.md` (ids match). Fourier runs glass-ui 11.0.1 (`fourier-analysis` at `cc8613e`). Frames are under `~/.dev-logs/design-study/frames/fourier/`. The site's part in each is to relay and adopt, never to shim.

Already booked, not repeated here: dock rows overflow 4 to 8 px (11.0.2); the slider contract "the fill's leading edge is the handle"; fusion of the theme seat (11.2.0).

```
site:      fourier
page:      every page
element:   the collapsed dock (GlassDock, shape="pill", collapse="open", .collapsed)
check:     R2 (P11)
severity:  first
kind:      defect
evidence:  frames/fourier/paper-1440-dark-rest.png, paper-1440-light-rest.png, paper-390-light-rest.png, paper-1440-dark-strip-dock-collapse-03.png; CENSUS "Corner at arm and settle"
seen:      the 56 x 56 seal (60 x 60 at 390) rests with its left corners at about 28 px and its right corners at about 4 px; a squared block shows mid-collapse
correct:   one even rounding on all four corners at rest and in every frame of the morph; likely the visible face of the booked row overflow
owner:     glass-ui
```

```
site:      fourier
page:      every page
element:   hover plate on a dock seat (DockControl) and a dock trigger (DockTrigger)
check:     A2 (P2)
severity:  first
kind:      defect
evidence:  frames/fourier/equation-1440-dark-strip-hover-enter-icon-01..08.png, equation-1440-dark-hover-trigger.png, paper-1440-light-strip-hover-enter-icon-01..02.png; CENSUS facts 5 and 6
seen:      dark: no visible change over eight frames; light: the plate is absent at -268 ms and whole at 26 ms, and gone in the first frame of the leave
correct:   a plate with enough contrast to see in dark, growing from the seat and leaving the same way over about 200 ms
owner:     glass-ui
```

```
site:      fourier
page:      every page
element:   the theme flip (useGlobalDark)
check:     B1 (P1)
severity:  first
kind:      defect
evidence:  CENSUS "Theme flip (light to dark)"; no strip in the fourier set
seen:      per the census the page re-tints in one frame
correct:   a short tween between themes
owner:     glass-ui
```

```
site:      fourier
page:      every page
element:   icons in dock seats, icon buttons, buttons and menu rows
check:     A3 (P2)
severity:  second
kind:      defect
evidence:  frames/fourier/equation-1440-dark-strip-hover-enter-icon-01..08.png, equation-1440-dark-hover-iconbtn.png
seen:      no glyph moves on hover
correct:   the animated-icon piece: one small motion per hover that means the action, a calm return, nothing at rest
owner:     glass-ui
```

```
site:      fourier
page:      every page
element:   the theme toggle's seat
check:     D3 (P6)
severity:  second
kind:      defect
evidence:  frames/fourier/paper-1440-dark-hover-dockseat.png
seen:      the toggle is the last seat inside the dock row
correct:   a separate seat with a dock background to the right, fusing on collapse (11.2.0); fourier should take the pinned sibling dock until then
owner:     glass-ui
```

```
site:      fourier
page:      every page
element:   press on a dock seat and an icon button
check:     B3 (P2)
severity:  second
kind:      OPEN (awaiting Mike)
evidence:  frames/fourier/equation-1440-dark-pressed.png, paper-1440-dark-pressed.png
seen:      the held frame shows no visible change
correct:   (open)
owner:     glass-ui
```

```
site:      fourier
page:      /morph
element:   radial light on hover in a Card (the stage card, the Harmonic Levels card)
check:     F2 (P4)
severity:  second
kind:      defect
evidence:  frames/fourier/morph-1440-dark-strip-size-morph-toggle-on-03..08.png, morph-1440-dark-hover-card.png
seen:      a lighter radial patch about 200 px across appears in the card on hover and stays; the site's source has no such rule
correct:   no radial light on a card; flat-lit
owner:     glass-ui
```

```
site:      fourier
page:      /equation, /morph
element:   Slider track in the light theme
check:     R3, E1 (P7)
severity:  second
kind:      defect
evidence:  frames/fourier/equation-1440-light-rest.png, morph-1440-light-rest.png
seen:      the empty track is near-white on a cream card and all but vanishes; at a low value the control is a lone dot, at the minimum nothing
correct:   a track token that reads at rest on a light warm surface
owner:     glass-ui
```

```
site:      fourier
page:      /gallery, /equation
element:   SegmentedTabs (pill) hover
check:     A2 (P2)
severity:  second
kind:      defect
evidence:  frames/fourier/gallery-1440-dark-hover-tab.png, equation-1440-dark-hover-tab.png; CENSUS "SegmentedTabs, pill"
seen:      hover changes the label's colour only
correct:   a plate grows under the hovered tab
owner:     glass-ui
```

```
site:      fourier
page:      every page (light theme)
element:   glass fill of the dock, the tab pill and popovers
check:     F1 (P7)
severity:  second
kind:      defect
evidence:  frames/fourier/paper-1440-light-rest.png, gallery-390-light-rest.png, gallery-390-light-open-filters-and-sorting.png
seen:      a neutral grey-beige beside cream cards
correct:   the glass takes the ground's warmth; if this is a token fourier sets, say which and the site re-themes
owner:     glass-ui
```

```
site:      fourier
page:      /visualize, not-found
element:   Button emphasis="text" ("Browse the gallery")
check:     A1 (P5)
severity:  second
kind:      defect
evidence:  frames/fourier/visualize-390-light-rest.png, notfound-1440-light-rest.png, visualize-1440-dark-rest.png
seen:      plain black text in light, purple in dark
correct:   the same link ink in both themes; if the ink is the site's token, the site sets it
owner:     glass-ui
```

```
site:      fourier
page:      every page
element:   reduced motion (the universal carve)
check:     R4 (P1)
severity:  second
kind:      defect
evidence:  CENSUS worst 11; fourier's own rules at AppDock.vue:431, style.css:755 (site half)
seen:      transitions are removed outright
correct:   a short opacity fade is kept
owner:     glass-ui
```

```
site:      fourier
page:      /paper (390)
element:   PopoverContent fill (the contents list)
check:     R3 (P11)
severity:  second
kind:      defect
evidence:  frames/fourier/paper-390-light-open-0-1-introduction.png
seen:      the article's text reads through the surface and collides with its last row
correct:   opaque enough that nothing behind can be read
owner:     glass-ui
```

```
site:      fourier
page:      every page
element:   DropdownMenuItem rows (the section menu)
check:     D4, C3 (P10)
severity:  polish
kind:      defect
evidence:  frames/fourier/paper-1440-dark-open-navigate-current-section-pap.png, gallery-390-dark-open-navigate-current-section-gal.png
seen:      24 px glyphs touch their labels (gap 0 to 2 px); the current row has no visible mark; at 390 the row text is larger than the dock's
correct:   one golden gap; a visible current-row mark; row text at the trigger's size
owner:     glass-ui
```

```
site:      fourier
page:      /visualize, /gallery, /equation, not-found
element:   Button emphasis="primary"
check:     F2, G2 (P4)
severity:  polish
kind:      defect
evidence:  frames/fourier/visualize-1440-dark-rest.png, notfound-1440-dark-rest.png, equation-1440-light-rest.png
seen:      in dark a soft halo lighter than the card surrounds the button; the label is bold
correct:   one neutral shadow; regular weight
owner:     glass-ui
```

```
site:      fourier
page:      /gallery
element:   SelectTrigger chevron (inside a popover)
check:     A1 (P5)
severity:  polish
kind:      defect
evidence:  frames/fourier/gallery-390-light-open-filters-and-sorting.png, gallery-1440-dark-open-filters-and-sorting.png
seen:      closed selects show an up chevron
correct:   down at rest, turning on open
owner:     glass-ui
```

```
site:      fourier
page:      /morph (390)
element:   SelectContent
check:     R2, R3 (P11)
severity:  polish
kind:      defect
evidence:  frames/fourier/morph-390-light-open-linear.png
seen:      the list covers the whole viewport, the dock and its trigger included
correct:   bounded to the trigger's region with the trigger in view
owner:     glass-ui
```

```
site:      fourier
page:      /equation
element:   the play and pause control
check:     E3, F2 (P9, P4)
severity:  polish
kind:      defect
evidence:  frames/fourier/equation-1440-dark-rest.png, equation-390-light-rest.png
seen:      about 36 px at 1440; at 390 in light it appears to carry a lighter centre
correct:   44 px; flat
owner:     glass-ui
```

Two rows glass should confirm rather than cure blind: whether the dim "Reset" on /morph (`morph-1440-dark-rest.png`, `Button emphasis="quiet"`, enabled) is the quiet Button's default ink, and whether the bold selected chip on /equation (`equation-1440-dark-rest.png`) is the chip's own weight.
