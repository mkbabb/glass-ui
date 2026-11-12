# Marks: the challenge to W-B.16

The challenger (claude-fable-5-2), 2026-11-12. I wrote nothing else in this directory. I read `W-B.16.md`, `AB.md`, both proposals, atlas's proposal and their captures, then tried to break the spec on the winning prototype.

**Verdict: the spec does not stand as written.** Nine findings were demonstrated in paint. Three are serious: the clear seat does not clear "by program" (so G-CLEAR is red on a clean build and O-265 is unanswered), a selected highlight in Chromium hides its words, and a mark that is more than half clipped never appears at all. The core of the design held everywhere else I pushed it; those cells are listed at the end.

**How it was run.** A scratch worktree of `release/11.1.0` (`5a27994f3`) with `proposal-A/prototype.patch` applied, one fixture page and one probe (`challenge/harness/`, which sat at `proto/challenge/` in the worktree). Chromium headless shell 149.0.7827.55 and Playwright WebKit 2287 (reports 26.5), 2x, light. Four guarded runs, the WebKit run under `--exclusive webkit`; all exited 0 and none was refused. The worktree is removed.

- Readings: `challenge/data/chromium-run{1,2,3}.json`, `webkit-run1.json`. Run 1's component `held` states read the copies, not the hosts (my selector); run 2 is the corrected reading. Run 3 repeats the clear and selection cells.
- Captures: `challenge/evidence/`. Component strips read top to bottom: the draw at 50 %, the copies landed, rest.
- Static rows are measured the way `AB.md` measures: a glyph-only render and a mark-only render, a pixel counted when it is at least half covered. Each case is set at 4 or 8 sub-pixel line positions.

## Findings

### F1. The clear seat does not clear "by program" (high)

R-6 and G-CLEAR rest on a reading nobody took. Proposal A measured 0.2em under the y and g at 16 px in weight 400, and under the comma at 85 px. The phrase the seat exists for was never set at the clear seat. In weight 700 the descenders of "by program" reach 0.21 to 0.23em under the baseline, so a rule whose top is at 0.2em meets them and the engine's skip-ink cuts it.

"by program", `--mark-offset: 0.2em`, pieces at four sub-pixel positions (G-CLEAR asks for 1 piece and 0 crossings):

| face, weight, size | Chromium pieces; crossings (device px) | WebKit pieces; crossings |
| --- | --- | --- |
| Plus Jakarta Sans 700, 28 px (G-CLEAR's own cell) | 3, 3, 1, 1; 0 | 4, 4, 4, 4; 0 |
| Plus Jakarta Sans 700, 85 px | 3, 3, 3, 3; 0 | 4, 4, 4, 4; 0 |
| Plus Jakarta Sans 700, 42 px | 4, 3, 3, 3; 0, 11, 11, 11 | 3, 3, 3, 3; 0, 0, 11, 0 |
| Plus Jakarta Sans 700, 21 px | 1, 1, 4, 3; 16, 16, 0, 0 | 4, 4, 4, 4; 0 |
| Plus Jakarta Sans 700, 16 px | 3, 1, 1, 3; 0, 12, 12, 0 | 3, 3, 3, 3; 0 |
| Plus Jakarta Sans 400, 28 px | 1, 1, 3, 3; 0 | 4, 4, 4, 4; 0 |
| IBM Plex Sans 600, 42 px | 2, 4, 4, 4; 20, 0, 0, 0 | 2, 2, 2, 2; 0, 0, 0, 22 |
| IBM Plex Sans 600, 16 px | 2, 1, 1, 1; 0, 7, 7, 7 | 4, 4, 4, 4; 0 |
| IBM Plex Sans 600, 28 px | 1, 1, 1, 1; 0 | 1, 1, 1, 1; 0, 0, 12, 12 |

- In WebKit the clear seat gives the same 4 pieces as the default seat at 28 px. In Chromium it depends on where the line lands: half the positions are cut, and at 16 and 21 px the uncut positions cross the descender instead.
- Chromium's rerun (run 3) gave the same counts.
- The gate's named bite does not happen: a seat of 0.14em crossed 0 device px in both engines (it skips into 4 pieces).
- Plex matters here: O-251 (4) moves atlas onto Plex, and atlas is the consumer told to take `seat="clear"` for "by program" and "population". "population" at the clear seat in Plus Jakarta Sans 700 is 1 piece in Chromium and 2 in WebKit.
- A seat that clears these faces has to start below 0.25em (the deepest glyph bottom read was 0.25em), which makes OQ-5's leading problem worse, and the value is per face, so "no face constant is written" does not hold for this seat.

Capture: `evidence/F1-clear-seat.png` (Chromium 28 and 85 px, WebKit 28 and 85 px, then Plex).

### F2. A selected highlight hides its words in Chromium (high)

Select text that carries `mark-highlight` and Chromium repaints the decoration in the text's colour. The band is 0.69em of decoration, so the words become a solid bar in the text colour: "Wake County" cannot be read while selected. WebKit keeps the band's own colour. The underline is unaffected in both.

- This breaks hard constraint (e) in one of the two engines, and it is in the plain class, so it needs no component and no draw.
- No gate selects anything.
- Reproduced in run 3 (22,657 near-black pixels in the row, against a row of ordinary text).

Capture: `evidence/F2-selection.png` (Chromium above, WebKit below).

### F3. A mark more than half clipped never appears (high)

The draw starts when half of the run's box intersects the viewport, and the mark's own decoration is transparent until then. Clipping by an ancestor counts against that half, so a run that is mostly clipped waits forever and shows no mark, where the plain class shows one.

| row | intersection ratio | component after 3 s | mark pixels, component / plain class (underline) |
| --- | --- | --- | --- |
| a 2-line clamp, the marked run going on under it | 0.245 (WebKit 0.24) | `wait` | 0 / 1,864 |
| a heading truncated with an ellipsis | 0.277 | `wait` | 0 / 1,232 |
| a horizontal scroller, the run mostly past the edge | 0.314 | `wait` until scrolled, then draws | 0 / n.a. |

- Both engines, both shapes (highlight: 0 against 8,613 and 5,309).
- `drawn` never fires for the clamp and the ellipsis rows, so a consumer that waits on it (Gregg's hero does) would wait forever.
- This is the masking case the bar rules out: the component paints less than the no-script fallback and reports nothing.
- The same rule would hold back a run taller than two viewports, which proposal A names and did not test.

Capture: `evidence/F3-clipped.png` (each component row above its plain-class twin).

### F4. A mark that is a flex or grid item, or inline-block, draws one misplaced line (medium)

When the host is blockified it has one client rect for the whole block, so the component builds one window with one unwrapped copy, centred on the block's height. On a three-line run the draw inks the middle line only, clipped at the block's width; lines one and three get nothing and then appear all at once when the copies are removed.

| host | landed against rest, differing pixels: Chromium underline / highlight | WebKit |
| --- | --- | --- |
| inline (the control) | 0 / 0 | 0 / 0 |
| flex item | 5,278 / 19,361 | 3,052 / 17,670 |
| grid item | 3,056 / 17,068 | 3,052 / 17,685 |
| `display: inline-block` | 5,278 / 19,361 | 3,052 / 17,670 |

- Hard constraint (d) fails for these hosts. A heading laid out with flex whose direct child is the mark is an ordinary thing to write.
- G-DRAW cannot see it: every harness row is an inline host.

Captures: `evidence/F4-blockified-underline.png`, `F4-blockified-highlight.png`.

### F5. A larger child inside the mark shifts the drawn copy (medium)

"rose **32%** in a year" with the figure at 1.6em inside a 22 px mark: the copy's line box grows to hold the larger child, so the copy sits 5 CSS px lower than the real line (band rows 98 to 127 against 88 to 117 at 2x). The draw inks at the wrong height and jumps up at landing.

- Landed against rest: 3,312 px (underline) and 7,438 px (highlight) in Chromium; 3,304 and 7,548 in WebKit.
- Proposal A's nested row used `<em>` and `<strong>` at one size and read 15 px, so this was not seen.

Capture: `evidence/F5-larger-child.png`.

### F6. G-TEXT and G-SSR are red against the mechanism the spec describes (medium)

The spec's mechanism puts the copies in a layer inside the host. Two gates then assert the opposite.

- **G-TEXT** says the host's `textContent` is the slot's text during the draw. Read during the draw in both engines: `textContent` is `"4,4854,485"` and `innerText` is `"4,485\n4,485"`.
- **G-SSR** says the server emits the slot's text as the host's only content. The prototype's `renderToString` gives `<span class="mark-underline" data-ink="wait"><!--[-->4,485<!--]--><span class="mark-layer" aria-hidden="true"></span></span>`; the host has one child element in the mount task too.
- The copies are described as unselectable. In WebKit the layer computes `-webkit-user-select: text` (the unprefixed property is not applied on this build); Chromium computes `none`.
- Each copy is a clone of the host with every attribute but `id` and `data-ink`, so a consumer's `data-*` attribute matches the host and each copy during the draw (3 extra matches on a three-line run). My own probe was caught by this.

Either the gates change or the layer moves outside the host; the spec has to pick. Readings: `chromium-run2.json` and `webkit-run1.json`, `held`, `atMount`, `ssr`.

### F7. On tracked type the mark runs past the last glyph (low to medium)

The advance box includes the letter-spacing after the last glyph, and the decoration covers it.

| row | end past the glyph ink (both engines) |
| --- | --- |
| "Open", 85 px, no tracking | 3.5 px |
| "Open", 85 px, 0.05em | 7.5 px |
| "ATLAS", 48 px, 0.1em | 7 px |
| a 13 px caps label, 0.14em / 0.2em | 2 / 3 px |

- 7 to 7.5 px is what the owner reported on the control (7.5 to 10 px).
- G-INK's bound of 4 px is tuned to the harness rows, all of which are tracked negatively or not at all. An "H" at 85 px in weight 800 already starts 5.5 px before its ink (Plex 400: 8 px).

Capture: `evidence/F7-tracking.png`.

### F8. A face that arrives during the draw (low; named by the proposal, now captured)

With the draw held at half and the row's face swapped in, the windows stay where the old face put them: the rule is cut mid-word and a stray piece shows under the next line. Landed against rest differs by 11,863 px (underline) and 29,279 px (highlight) in Chromium, 10,296 and 27,520 in WebKit. It corrects itself at landing. It is reachable with glass's own Plex preset, which ships `font-display: swap`, on a hero mark that is in view at mount. This is OQ-4's reflow reading.

Capture: `evidence/F8-late-face.png` (before the face, after it, landed, rest).

### F9. The default ink (low; a design read, shown by capture)

- In glass's light theme `--primary` is `hsl(24 10% 10%)`, the text colour. The default underline is therefore a text-coloured rule under text, which is what a hyperlink looks like. Inside a link the marked words cannot be told from the rest of the link.
- The band takes its hue from the ink at a fixed chroma. An ink with no hue gives a pink band (`#000` and `#1a1a1a`), and white gives salmon. glass's own default is orange only because its near-black carries a hue of 24.

Capture: `evidence/F9-ink.png` (the link row, then the band from the default ink, `#1a1a1a`, `#000`, `#fff`).

## What held

- **The default seat in other faces.** "Wake County", "Google" and "4,485" in IBM Plex Sans, Georgia, the system face, Helvetica Neue and Times, 16 to 85 px, 4 or 8 sub-pixel positions each: 0 crossings in every cell in both engines. One Plus Jakarta Sans cell in Chromium read 2 device px at one position of eight.
- **G-SEAT in a second face.** IBM Plex Sans at 85 px: the underline's top at 0.078 to 0.084em, 6 px thick; the band's top 0.078 to 0.088em above the x-height and its bottom 0.066 to 0.084em below the baseline. Inside the gate's tolerance in both engines.
- **A mark entering view mid-scroll.** The draw began on wheel step 12 and the page kept scrolling under it: landed against rest, 0 px in both engines.
- **A heading sized in `vw`, a tracked run, an inline wrapped run, and the same at 200 % zoom** (half the viewport at 4x): 0 px landed against rest.
- **A mark inside a link.** The draw lands clean in Chromium (0 to 8 px). In WebKit the highlight copy paints over the link's own underline until landing (753 px).
- **G-CLOCK** prints nothing on the clean prototype.

`evidence/held.png` has the mid-scroll, `vw` and zoomed strips.

## Not run

Real Safari, Firefox, dark theme, the stall and byte gates (not rerun), vertical writing, and a planted defect for each gate's named bite other than G-CLEAR's. I formed no demonstrated finding on whether the copy mechanism is more machinery than the ask needs, so I return none.
