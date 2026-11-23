# The choices page, read with the owner's eye

Page: `docs/tranches/BM/study/choices/glass-choices.html` as it stood at 11:24 on 2026-11-23 (295,539 bytes).
Critic: one Opus seat (claude-opus-5-5). Read only; nothing in the repo was changed.

How it was read: the whole source first. Then one headless Chromium run under `guarded` (Playwright 1.61.1), with one browser, a context per cell, and everything closed in `finally`. The cells were 390 px (touch, mobile, 2x, CPU slowed 4x for the load), 390 px with reduced motion, and 1440 px, each in light and dark. The page was wrapped the way `page-check.mjs` wraps it. The run measured:

- every visible text run's size and contrast against its composited ground;
- each before against each after at rest, pixel for pixel;
- every Replay pressed twice and sampled each frame for movement and one-frame jumps;
- hash routing;
- load timing;
- a second geometry pass: what is on screen when Replay is pressed on a phone, scroll traps, and tap targets.

Headless Chromium is not Safari. Where a demo blurs, the screenshots show Chromium's own drawing and are not an iPhone reading.

## What holds

- **The contract.** No doctype, html, head or body tags. A two-word `<title>`, the viewport-fit meta and the style come first. The side gutter is on `body` with the safe-area `max()`, and vertical padding uses `padding-block`. Every colour is a token on bare `:root`, redefined under the dark media query and again under `[data-theme="dark"]`; only `transparent` and `currentColor` appear bare. `body` has an explicit token background. Nothing loads from outside, and no alert, confirm or prompt exists. Focus shows as a 3 px accent outline.
- **Overflow.** None at 390 or 1440 (scroll width equals client width in all four cells).
- **Errors.** No script errors or console errors in any cell.
- **Weight and load.** 295,539 bytes on disk, 107,335 gzipped, about 67 KB of it the one inline photograph. 3,161 elements. With the CPU slowed 4x, first contentful paint lands at 444 to 504 ms and load at about 1.0 s. On desktop, load is 52 to 146 ms. Nothing here is slow or heavy.
- **Motion.** Every Replay plays, and plays again on a second press, in all 28 motion choices. The one-frame jumps the sampler flagged in 8 and 18 (C) happen while the mark is faded out, as specified. With reduced motion on, nothing runs at rest (the only two animations alive are the scroll-linked rim in 26, which waits on scroll), and Replay still plays.
- **Routing.** Loading straight onto `#theme-seat` lands the heading 105 px from the top, under the 61 px bar, and marks the section. `#hover-plate`, `#earlier` and `#dock-defaults` do the same. Whether claude.ai passes the fragment into the page's frame could not be tested here.
- **The earlier studies.** The page lists all 14 studies from `PRIOR-STUDIES.md`, the Google motion study first (row 1 and section 46), each with its state. This answers "what of our previous design studies … mark".
- **Lint.** The register lint finds nothing in the visible text. The only internal ids (`W-B.17`, `pass-2 delivery`) sit in script comments he will not see.

## Objections, first reading

### Major

**E1. On the phone, Replay plays most of the comparison off screen.** At 390 the cells stack. With Replay just under the bar, the demos on screen are:

- 10 (`#menu-grow`): 1 of 3; the span from Replay to the last cell is 1,506 px.
- 12 (`#dialog-veil`): 1 of 3, over 1,274 px.
- 13 (`#sheets`): 1 of 2, over 1,239 px.
- 26 (`#scrolling`): 1 of 2, over 1,033 px.
- 24 (`#theme-seat`): 2 of 4, over 1,190 px.
- 25 (`#fold`): 2 of 3.

In these six, the before and the after never move on screen together; he sees one play while the other plays out of sight. On desktop every motion choice fits on one screen. Remedy: on narrow screens, a Replay beside each cell (or one that replays the cell in view), or a side-by-side strip in its own horizontal scroller.

**E2. The edge (7) shows the same picture twice.** A static look choice, judged "on a screen, in Light and then Dark". At 390 in light, A and B differ in 0.0 % of pixels (no channel moves more than 16 of 255); at 1440 in light, 2.9 %. In dark, B and C are the same by definition. The 10 % white top line and the 4 to 6 % inner lines cannot be seen at this size, on this ground. He cannot tell three hairlines from one. Remedy: a magnified rim crop of each letter (4x, nearest-neighbour) beside the life-size one, on a ground where the top line shows.

**E3. The depth default (48) is drawn so the title loses its word.** At 1440 and at 390 the 96 px Blob covers "ass", so "Glass UI" reads "Gl UI". He is asked "is the amount right?" of a picture whose first word has gone. The sentence inside both boxes is also backwards and cut off mid-line. It reads "A figure sits behind the title's first word and in front of its second", while the caption and the stacking say "Glass" goes behind the Blob. The text is clipped at the 200 px box edge in both before and after. Remedy: size and place the Blob so it overlaps part of one letter of each word, as the spec intends, and fix the sentence or cut it.

**E4. The springs (4) cannot be answered from this page.** The page says "On a screen the two columns look alike, which is the point", and at rest they are pixel-identical. It then sends him to *Four Ways to Settle*, *Scroll Under Load* and *Touch Event Rate*. None of the 20 reading-page mentions on the page is a link: 11 pages are named in italics, and the page has no `http` link at all. He cannot open them from his phone. Yet this page's own Busy page could be the reading: turn it on, press Replay in Safari, and see which column stutters. The foot does not say so. Remedy: link every named reading page, or drop the name. For 4, add one line: "Turn on Busy page, then Replay: in Safari the stalled column is the one on the page's thread."

**E5. The dock's size (1) offers a B he cannot pick.** B is "Name what to drop", but the list of blocks "comes with the dock's latest measurement" and is not on the page. A reads as a contradiction to a visitor: "keep every behaviour; the release waits", then "with every block removed … still about 92 lines over, so A also needs cuts nobody has found yet". So the default never ships 11.2.0 as written. The meters have no stated 100 %, and A (99.62 %) and B (98.98 %) look the same. This is the choice that holds 11.2.0. Remedy: put the list of blocks (lines, who asked) under B as a checklist he can tick, and state each option's outcome in one line: "11.2.0 ships when …".

**E6. Ten dock details, and four of the dots' five questions, are words only.** The request was "visually, with before and after". 36 to 45 are a table of text, though most are visual: how long a dock stays (36), a half icon peeking (40), icon size beside words (41), opening to one side (39), folding after 3 s on desktop (44). The two drawings in the table do not help. 37's square and circle are glass tint on the page ground and nearly invisible. 42's swatches carry 11 px labels ("now", "hover", "rest"). The foot says "The dock's strips for these are Chromium's", but no strip is on the page. In 31 the question line is not a question, and the other four questions ("2." to "5.") have neither a picture nor letters to reply with. Remedy: one small live demo per dock detail (the dock pieces already exist on the page, in 20, 21 and 35), and letters for 31's sub-questions.

**E7. The labels that carry each choice are under 14 px, and the default tag is under 4.5 to 1.** Measured in all four cells:

- The "Before" / "After" / "Your frame" label: 13 px, in 103 places.
- The "Default" (and "Drafted", "Proposed", "Held", "Recommended") tag: 13 px, 34 places. In light it reads **4.18 to 1** on the default cell's ground.
- Group headings and contents headings: 13 px, 16 places.
- The springs' lane labels: 13 px, 12 places.
- The dock labels in 3: 12 px, 6 places.
- "Popover" and "Dialog" in 11: 12 px.
- "Tooltip": 13 px.
- The key in 2: 13 px.
- 42's swatch labels: 11 px.
- Table headers: 13 px.
- "Open" in the studies table: 15 px at 4.43 to 1 in light. The "Source" link in 35 reads 4.43.

Dark passes everywhere for page text. Remedy: 14 px minimum. Darken the light `--accent` by a few points of lightness (hsl 24 70 % 42 % on the well gives 4.2; about 38 % clears 4.5), or draw the tag in `--fg` with an accent border.

### Minor

**E8. The accent ring means "default" on most choices and something else on others.** The intro says "with the default marked". The ring also sits on:

- 6 A, tagged "Drafted", with a note that "the study names no default".
- 7 B, "Proposed", while A ships.
- Both 9 A and 9 B, two rings in one choice.
- 31 (a), "Recommended".
- 32 B, "Held".

A ring and a tag also say the same thing twice. Remedy: keep one sign (the tag in words), and ring only a true default.

**E9. A second ink in the grounds.** The striped test ground carries a red-orange band (`--stripe-c`) across black and white 45° stripes in 10, 11, 14, 24, 25, 26 and 27. Next to the accent ring, the peach plates in 5, the orange Blob in 48 and the accent focus rings in 46, it is the loudest thing on most screens, louder than the controls being judged. The focus-ring demo (46) uses the page's own accent as its ink. In dark, the pressed "Dark" button is the brightest fill on the page. Remedy: a quieter ground (lower-contrast stripes, the photo, or a neutral band) and demo inks that are not the page's accent.

**E10. The Google frame in 5 cuts.** `.pg .ib::before { transition: none }` makes the frame's plate vanish in one frame when the pointer leaves or Replay starts. a, b and c fade over 120 ms. The frame he chose looks harsher than its own option, and harsher than Google's.

**E11. The dark dock (3): today and A look alike at a glance.** At 1440 they differ in 1.2 % of pixels. The page says 1.01 to 1 becomes 1.44 to 1, but the dock is small inside a busy grid, so the default reads as "no change". Remedy: a crop of the dock alone, larger.

**E12. Scroll traps on a 67-screen page.** On the phone, a thumb that lands here stops the page scrolling:

- 26: two 300 px boxes with `overscroll-behavior: contain`.
- 48: two 200 px boxes.
- 13 B: a 380 px scroller.
- `touch-action: none` areas: 13 A's sheet (334 × 152 visible), 14's menu (216 × 192) and 23's three sliders (280 × 78).

Remedy: drop `contain` where the box is only a demo of scrolling, or start the boxes at their own scroll end so a flick chains.

**E13. Length and reading load.** 56,343 px at 390, which is 66.8 phone screens, with 8,059 words of text. The first picture is 2,763 px down, 3.3 screens, behind the intro and the 41-row contents. The tallest sections are 3,545 px (earlier studies), 2,548 px (dock details) and 2,304 px (chrome plate). Each choice carries a question, captions, a note, "What it costs" and "Judge on". The restraint precept asks for less standing text. Remedy: fold "What it costs" behind a disclosure, and put one before/after pair above the contents on the phone.

**E14. Process words he has to translate.** "the 48-step curves", and lane labels named by spring token ("present", "bloom", "panel", "world"). Also:

- "a small player" (3 times)
- "one observer"
- "the 1,546-byte detent engine"
- "two wrappers" (twice)
- "enrolled past the library's fallback"
- "the drafted material floor"
- "the lens study"
- "the old indicator's writer"
- "per-frame plate path"
- "the press rule amended"
- "your ceiling" (4 times)
- "strip 2" and "section 3" references to pages he cannot open

**E15. Small taps and odd numbering.** In the studies table the links are bare digits, 6 to 18 px wide by 18 px tall. The contents rows are 39 px tall and the "#anchor" links 28 px. At 390 the section number sits alone on a line above the title in 8 choices (2, 4, 8, 14, 17, 20, 46, 47). "49–51" heads a table with nothing numbered 49, 50 or 51. "+" stands in for a number. 24 offers A, A2 and C, with no B. The group heading reads "The earlier studies, still open" over a table that also lists landed, settled and superseded studies, while the contents call it "marked".

**E16. "All choices" lands under the bar.** `#choices` has no `scroll-margin-top`, so the first contents heading sits at 18 px under the 61 px sticky bar at both widths.

**E17. The code font (33) shows the wrong face.** "Fetched at the start" is drawn in `ui-monospace` (SF Mono on the phone). glass-ui's code face is Fira Code (`src/styles/typography.css`), which the contract allows from Google Fonts. He compares SF Mono with Courier New, which is not the change.

**E18. Small honesty gaps in captions.** 31's "Today" caption describes the giant rectangle, but the drawing is the cured neck. 10's "Today, and C" leaves by a plain fade, while choice 11 says today's menu leaves with its clip running back. 46's play/pause and draw cells have no before at all.

## Second reading

Each objection was checked again against the source and the measurements.

- **E2 and E3** were re-measured and re-viewed at both widths and both schemes; both hold.
- **E7** was recomputed by hand. hsl(24 70 % 42 %) is rgb(182, 92, 32); the well is rgb(246, 243, 238); the ratio is 4.20. It holds.
- **E1** holds. It is phone-only: at 1440 every motion choice has all its demos on one screen.
- **E4** holds: no `href` to any reading page exists. Removed from the first draft: the claim that 12 A and B "look the same". They do (2.4 % of pixels), but the page states the difference is cost, given in device pixels. That is a fair answer, so it is not an objection.
- **Dropped:**
  - The at-rest sameness of motion choices (4 aside; also 9, 14, 15, 18, 22, 23, 27, 31): Replay is the contract's remedy, and Replay plays.
  - The sampler's cuts in 8 and 18 (by design, while faded out).
  - The finger's first-frame placement in 14 (it is at opacity 0 then).
  - The worry that dark tracks vanish: the dark screenshots show the tracks.
- **Kept as minor rather than major:** E8 to E18. None stops a decision on its own; together they make the page harder to read than it needs to be.

Untested here: Safari itself, live blur on an iPhone, and whether claude.ai forwards `#name` into the page's frame. The bytes and timings above are Chromium's.
