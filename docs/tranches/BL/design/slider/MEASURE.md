# Slider — the measure

Seat: MEASURE (claude-opus-5-5). Source measured: master at `2353cb021`, `src/components/slider/` as it stands. Harness: `measure/harness/` (one page, `?v= &size= &variant= &o= &mode= &consumer=daraksha`, plus `native.html`). The probe (`measure/harness/probe.mjs`) serves the page itself and closes the server and the browser in `finally`, so each engine was one guarded browser run (headless Chromium; Playwright WebKit under `--exclusive webkit`). Raw numbers: `measure/runs/{chromium,webkit}/grid.json` (408 cells each), `grid.md` (every cell as a row), `repro.json`, `clean.json`, `film-*.json`.

Two facts frame everything below.

- **Chromium and WebKit agree to 0.3 px on every box in all 408 cells.** Light and dark agree too. The geometry faults are in the rules, not in an engine.
- **The scrubber's thumb is always smaller than its track, so every offset between them shows.** Native sliders, Apple's and ChatGPT's either make the thumb bigger than the track (so it hides the end of the fill) or put it inside a fill end of the same shape (so the two curves share a centre). Glass-ui does neither.

---

## 1. Today's slider

### 1.1 The height system as shipped

| size | track (cross) | thumb | thumb inset per side | `--radius-pill` | the fill's cap radius at v=0 |
|---|---|---|---|---|---|
| sm | 12 | 8 | 2 | 16 (clamps to 6) | 4 (the fill is 8×12) |
| md | 20 | 16 | 2 | 16 (clamps to 10) | 8 (16×20) |
| lg | 28 | 24 | 2 | 16 (clamps to 14) | 12 (24×28) |

Tokens: `src/styles/tokens/sizing.css:313-318`. The thumb is `min(thumb, track)` (`slider/styles.css:75,79,83`). `--radius-pill` is `1rem`, not a true pill (`src/styles/theme/radius.css:125`). Every box taller than 32 px therefore stops being a capsule: the loupe is the case that ships (§1.5).

### 1.2 Track, fill and thumb at every value (scrubber, WebKit; Chromium identical)

Distances are thumb centre minus cap centre along the main axis, in CSS px. A cap is the circle of radius `min(radius, cross/2, main/2)` at the box's end. Positive means toward max. In the vertical rows max is at the top, so −2 means 2 px toward the top. The full grid, with light and dark, hover, focus and pressed at 0/50/100 and the spectrum variant, is in `measure/runs/webkit/grid.md`.

| size | o | v | track | fill | thumb | cap r: track / fill / thumb | thumb − fill cap | thumb − nearer track cap | pressed fill | pressed: fill past track end | pressed: thumb − fill cap |
|---|---|---|---|---|---|---|---|---|---|---|---|
| sm | h | 0 | 320×12 | 8×12 | 8×8 | 6 / 4 / 4 | 0 | −2 (start) | 8.16×11.28 | — | −0.08 |
| sm | h | 1 | 320×12 | 11.13×12 | 8×8 | 6 / 5.57 / 4 | 1.55 | 1.11 | | | |
| sm | h | 5 | 320×12 | 23.61×12 | 8×8 | 6 / 6 / 4 | 1.98 | | | | |
| sm | h | 50 | 320×12 | 164×12 | 8×8 | 6 / 6 / 4 | 2 | | 167.28×11.28 | | −1.64 |
| sm | h | 99 | 320×12 | 316.89×12 | 8×8 | 6 / 6 / 4 | 1.99 | −1.12 (end) | | | |
| sm | h | 100 | 320×12 | 320×12 | 8×8 | 6 / 6 / 4 | 2 | +2 (end) | 326.4×11.28 | 6.4 | −4.76 |
| md | h | 0 | 320×20 | 16×20 | 16×16 | 10 / 8 / 8 | 0 | −2 (start) | 16.32×18.8 | — | −0.16 |
| md | h | 1 | 320×20 | 19.05×20 | 16×16 | 10 / 9.53 / 8 | 1.5 | 1.03 | | | |
| md | h | 5 | 320×20 | 31.2×20 | 16×16 | 10 / 10 / 8 | 1.99 | | | | |
| md | h | 25 | 320×20 | 92×20 | 16×16 | 10 / 10 / 8 | 2 | | | | |
| md | h | 50 | 320×20 | 168×20 | 16×16 | 10 / 10 / 8 | 2 | | 171.36×18.8 | | −1.96 |
| md | h | 95 | 320×20 | 304.81×20 | 16×16 | 10 / 10 / 8 | 1.99 | | | | |
| md | h | 99 | 320×20 | 316.97×20 | 16×16 | 10 / 10 / 8 | 1.98 | −1.05 (end) | | | |
| md | h | 100 | 320×20 | 320×20 | 16×16 | 10 / 10 / 8 | 2 | +2 (end) | 326.4×18.8 | 6.4 | −5 |
| md | v | 0 | 20×192 | 20×16 | 16×16 | 10 / 8 / 8 | 0 | +2 (start) | 18.8×16.32 | — | 0.16 |
| md | v | 50 | 20×192 | 20×104 | 16×16 | 10 / 10 / 8 | −2 | | 18.8×106.08 | | 0.68 |
| md | v | 100 | 20×192 | 20×192 | 16×16 | 10 / 10 / 8 | −2 | −2 (end) | 18.8×195.84 | 3.84 | 2.44 |
| lg | h | 0 | 320×28 | 24×28 | 24×24 | 14 / 12 / 12 | 0 | −2 (start) | 24.48×26.32 | — | −0.24 |
| lg | h | 50 | 320×28 | 172×28 | 24×24 | 14 / 14 / 12 | 2 | | 175.44×26.32 | | −2.28 |
| lg | h | 100 | 320×28 | 320×28 | 24×24 | 14 / 14 / 12 | 2 | +2 (end) | 326.4×26.32 | 6.4 | −5.24 |
| lg | v | 100 | 28×192 | 28×192 | 24×24 | 14 / 14 / 12 | −2 | −2 (end) | 26.32×195.84 | 3.84 | 2.68 |

What the table says:

1. **The thumb is never concentric with the fill's end.** From v≈5 up it sits 2 px toward the leading edge of the fill's cap, at every size. The `contain` alignment puts the thumb's leading edge on the fill's leading edge. Two circles of radii 4 and 6 (or 8 and 10, or 12 and 14) that touch on one side are off-centre by the difference, 2 px. The gap reads 2 px above, 2 px below and 0 at the tip: the crescent in the owner's frame.
2. **It is never concentric with the track's ends either.** At 0 and 100 the thumb is 2 px off the track's cap centre (it hugs the end), and the fill there is narrower than it is tall: 8×12, 16×20 or 24×28, with a cap of 4/8/12 inside a track cap of 6/10/14. So at the minimum the fill is a standing lozenge whose curve differs from the track's: "the track's end is a different radius".
3. **Between 0 and about 5 the fill's cap radius changes with the value** (4 → 5.57 → 6 at sm; 8 → 9.53 → 10 at md), because `--radius-pill` (16) is scaled down by the box's narrow side. The end visibly reshapes during the first few percent.
4. **Rest layout never makes the fill taller than the track.** Fill cross equals track cross in every rest cell, both engines. §1.4 says where the owner's "taller" comes from.
5. **Pressed, the fill shrinks to 0.94 of the track's height** (11.28 in 12, 18.8 in 20) and widens by 1.02 from its origin. At v=100 it runs 6.4 px past the track's end (3.84 vertical), where the track's rounded clip cuts it. The fill's own curve is gone and the thumb ends up 5 px behind the clipped end. The thumb takes no part in the press.

Hover changes paint only: the fill's tint goes from 19.4 % to 22 % alpha. Focus changes paint only: a ring on the track. No state moves a box.

### 1.3 The spectrum variant

| size | track | handle | handle radius | track radius used |
|---|---|---|---|---|
| sm | 320×12 | 6×12 | 3.2 | 6 (capsule) |
| md | 320×24 | 12×24 | 6.4 | 12 (capsule) |
| lg | 320×36 | 18×36 | 9.6 | **16 (not a capsule)** |

At 0 and 100 the handle is flush with the track's end (`thumb x − track x` = 0 at v=0, `track − handle` at v=100). Its square-ish corners sit outside the track's round end. The lg spectrum track is a rounded rectangle, because 36 > 2 × `--radius-pill`. Crop: `measure/crops/webkit-md-spectrum-v50-dark-light.png`.

### 1.4 The owner's second frame, reproduced

The repro is daraksha's Name transport on glass 11.0.1 (`src/name/NameDock.vue` on daraksha's `glass-11-0-1` branch, read only): `<Slider variant="scrubber" size="sm">` in a 155 px run, dark, on a dock plate, with no `--slider-range-bg` set. It renders the same in both engines and at both pointer types. A coarse pointer only grows the root to 24 px (`styles.css:110-119`); the track stays 12.

![owner frame above, WebKit repro below](measure/crops/repro-vs-owner-frame.png)

Measured on the repro: track 155×12, fill 44.75×12 at v=25, thumb 8×8 at y+2. The thumb's centre is 2 px left of the fill cap's centre and 0 px vertically. Measured on the owner's PNG: fill 100 image px tall, thumb 66 px, a ratio of 0.66 (8/12 = 0.67). The fill's right edge is the thumb's right edge. Same geometry.

Each fault and the rules that produce it:

| fault in the frame | rules |
|---|---|
| The thumb sits inside the round cap and is not concentric with it (2 px toward the tip; 2 px gaps above and below, none at the tip). | `Slider.vue:54` (`thumbAlignment: "contain"`, so the thumb's leading edge travels `p·(track − d)`). `styles.css:183-201` (the lane is cut by the **thumb** diameter, `--slider-lane-cut: var(--slider-thumb-size)`, so the fill's end is the thumb's trailing edge). `styles.css:75` (`thumb = min(8px, 12px)`, so the thumb is 4 px smaller than the cap it sits in). |
| The fill reads taller than the track. | Layout is equal (12 = 12). The read comes from paint at three places: (a) the track ground is `--muted-medium`, i.e. `--muted` at 50 % alpha (`styles.css:130`, `tokens/color-radius.css:237`), so on a dock plate the track takes the plate's own colour and its edge disappears (owner PNG: track 29–30 against a plate of 31–34 luminance); (b) the groove's "recess" edge is an inset top line in `--cartoon-ink` at 16 % (`track-well.css:93-98`), and `--cartoon-ink` clamps its lightness to 0.28–0.34 (`tokens/shadow.css:62`), so on a dark track the line is lighter than the track (Chromium crop: 29 against 22). The top pixel of the track reads as plate, not groove; (c) the fill carries the glass rim on both edges, `--glass-material-rim` (`liquid-fill.css:86-88` → `tokens/dark-arm.css:377-382`): a lit top line and a lighter bottom line in dark, which outline its full 12 px. Net read: a 12 px fill over a track that looks about 10–11 px. The owner's PNG measures 12.4 against 11.2 CSS px. |
| The track's end is a different radius. | `--radius-pill: 1rem` (`theme/radius.css:125`), on the track (`track-well.css:80`) and on the fill (`liquid-fill.css:42`), resolves per box. The fill's cap is 6 only once the fill is at least 12 wide; at small values it is 4 to 5.6 (§1.2 row v=1). The thumb is 4. Three curves, three centres. |
| The fill is greyed out, not the name's colour. | `styles.css:149-152`: in dark the default ink is `color-mix(--foreground 22%, transparent)`, mixed again at `--liquid-fill-strength` 88 % (`liquid-fill.css:68-73`). Painted alpha measured 0.1936 at rest, 0.22 on hover, 0.132 held (the grasp rung × 0.6). daraksha's 11.0.1 branch sets no `--slider-range-bg`; its later `name-r3-hover` branch does (`gilt.css:58-64`). |
| The thumb is a dark hole. | `styles.css:232`: `background: var(--card)`, which is `hsl(26 22% 17%)` in dark (`tokens/dark-arm.css:99`), rgb(53,42,34), over a fill that paints about rgb(64,59,55). The thumb is darker than the fill it sits in. O-273's `--slider-thumb-bg` is the knob this asks for. |

The first frame ("refine view") has the same proportions: thumb 53 px in a fill 81 px tall (0.65), the thumb's trailing edge on the fill's end. The same rules apply. That frame shows no loupe, so whatever "tap to refine" opened on the owner's phone is out of frame.

### 1.5 The current enlarged state: the loupe

On press, the scrubber (horizontal only) teleports a lens to `<body>` (`Slider.vue:333-346`) and frosts the page behind the slider (focus veil). Measured pressed, dark, v=50:

| size | lens box | lens radius | lens bottom vs track top | lens content |
|---|---|---|---|---|
| sm | 120×52 | 16 | 0 (touching) | 3× track clone scaled to 2.6×; fill has a **square** end; 2 px mark at centre |
| md | 120×52 | 16 | 0 | same |
| lg | 120×52 | 16 | 0 | same |

![loupe pressed: md dark, sm dark, md light](measure/crops/webkit-pressed-loupe-md-dark-sm-dark-md-light.png)

Faults, with rules:

1. **The lens is the same size at every size.** It reads `--slider-track-height` (`styles.css:497, 501, 545`), but it is teleported out of the slider, so the variable never reaches it and the 1.25rem fallback always wins: 6 × 20 = 120 wide, 2.6 × 20 = 52 tall.
2. **It is not a capsule.** 52 px tall with `border-radius: var(--radius-pill)` = 16 (`styles.css:516`). This is the "more rounded" the owner asked for.
3. **The fill inside it ends square** (`.glass-loupe-fill`, `styles.css:572-578`, no radius). It ends half a thumb past the centre mark (`Slider.vue:214`, `(x + d/2)·3`), so the mark and the fill's end disagree by `k·d/2`.
4. **It has no gap from the track.** `translate: -50% -100%` from the track's top edge (`styles.css:508`, `Slider.vue:205`). Its bottom edge sits on the focus ring.
5. **It is not "a designed, clearly bounded surface"**: a grey rounded rectangle with a vertical line and a bar.

**The grow is a cut.** A per-frame sampler (`clean.json`) logs the lens's computed `scale`/`opacity` on its first painted frame as `1 / 1`, `data-engaged` already set, in both engines. The lens mounts with `v-if="loupeShown"` and `:data-engaged="isHeld"` true in the same render (`Slider.vue:335-338`). `.glass-loupe[data-engaged] { scale: 1 }` (`styles.css:526-529`) applies to the first style, so the `0.13 → 1` transition (`styles.css:508-513`) never runs. This breaks motion-canon P0 on entry.

**The shrink is a tween.** Release to `scale 0.13 / opacity 0` takes 120–135 ms (WebKit 1048 → 1181 ms; Chromium 1050 → 1176 ms), on `--spring-present-exit-duration` with `--ease-standard` (`styles.css:533-537`). The lens unmounts about 85 ms later, on the grasp carrier's `transitionend` (`Slider.vue:133-135`). The exit is a uniform scale toward its bottom centre. It does not shrink back into the slider; it shrinks into a point above it.

Film: Chromium, with the page clock slowed to 0.1× through CDP, so each frame is about 2.5 ms of real animation. Top row: grow frames 0, 6, 13 and shrink 0. Bottom row: shrink 4, 7, 9, 11. The grow row is already full size. The WebKit frames (real time) are in `measure/runs/webkit/crops/webkit-film-*`.

![loupe grow (top, already full) and shrink](measure/crops/chromium-film-md-loupe-grow-and-shrink.png)

The fill's press also runs on these numbers: `scale(1, 1) → (1.02, 0.94)` over about 130 ms on `--spring-press`. Release overshoots to `(0.995, 1.0126)` and settles by about 300 ms (`styles.css:274-299`). It is smooth.

### 1.6 Focus and press

From fresh contexts (`clean.json`), both engines:

- Keyboard Tab focuses the thumb and rings the track. Correct.
- **A mouse press alone also rings the track** with the keyboard ring. reka focuses the thumb from script on slide start (`reka-ui 2.10.1 dist/Slider/SliderImpl.js:50`, `SliderRoot.js:130`), and both engines treat that focus as `:focus-visible`, so `.glass-slider:has(:focus-visible) .slider-track` (`styles.css:262-264`) matches. The ring then stays after release, for as long as the thumb keeps focus.

![keyboard focus, mouse press, hover (md dark)](measure/crops/webkit-md-dark-keyboard-press-hover.png)

### 1.7 Crops at rest

Dark and light, sm/md/lg, v = 0, 5, 50, 100 (WebKit):

![md dark](measure/crops/webkit-dark-md-rest-v0-5-50-100.png)
![sm light](measure/crops/webkit-light-sm-rest-v0-5-50-100.png)

The others: `measure/crops/webkit-{dark,light}-{sm,md,lg}-rest-v0-5-50-100.png`. Vertical: `measure/crops/webkit-md-vertical-v0-v50-dark-light.png`. In light the warm fill and the cream `--card` thumb read well. The off-centre crescent is still there, smaller against the cream.

---

## 2. The references

### 2.1 Apple: what is published today

**Human Interface Guidelines, Sliders** (developer.apple.com/design/human-interface-guidelines/sliders, read through its JSON data; change log last entry June 21, 2023). It states no dimensions. In its words: "As a slider's value changes, the portion of track between the minimum value and the thumb fills with color." macOS: "the thumb is a narrow lozenge shape". No iOS 26/27- or Liquid Glass-specific slider text is on the page. The HIG card image shows Liquid Glass sliders, and its alt text calls them "transparent components... allow their colored elements, like a blue slider track... to show through, highlighting the Liquid Glass material's lensing effect."

**Adopting Liquid Glass** (developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass): "For controls like sliders and toggles, the knob transforms into Liquid Glass during interaction." The page carries a video of a slider (`adoption-guide-slider.mp4`). I measured frames from it:

![Apple slider: rest (top), held (below)](measure/crops/ref-apple-liquid-glass-slider-rest-and-held.png)

| | measured (video px, 1080 wide) | as ratio of track height |
|---|---|---|
| track (and fill) height | 25 | 1 |
| fill vs track | the same band; the fill ends in a full round cap of the track's radius | 1 |
| knob at rest | about 124 × 82, opaque white capsule with a hairline edge | 5 wide × 3.3 tall |
| knob held | about 183 × 110, clear glass capsule, rim tinted by the fill | 7.3 wide × 4.4 tall (×1.48 w, ×1.34 h) |
| fill end under the held knob | visible through the glass at about 20 px before the knob's centre, still a round cap | |
| what grows on touch | the knob only: bigger, clear, refracting, and it stretches along the drag (contact sheet, `measure/refs/apple-video/contact.png`). Track and fill do not change. | |

The HIG card (`measure/crops/ref-hig-liquid-glass-held.png`) agrees: fill and track 44 px in a 2× image, with the same height and a round fill cap concentric with the track's end. The held glass knob is 232 × 150 (3.4 track heights tall), with the fill's end under it near its centre.

So Apple's geometry is: **a thin track, a fill of exactly the track's height and radius, and a knob much larger than both.** The fill's end is hidden by the opaque knob at rest and seen through the clear one while held. Nothing about Apple's slider depends on a small disc sitting concentrically inside the fill's end. I found no iOS 27- or macOS 27-specific slider page. apple.com product pages were not checked.

### 2.2 The ChatGPT app

`~/.dev-logs/owner-1112/` and `~/.dev-logs/owner-1111/` hold no ChatGPT frames. I listed both folders and their immediate subfolders, and contact-sheeted the `shots/` PNGs (`measure/scratch/owner-shots-contact.png`). They are all daraksha and glass frames. `owner-1111/shots/3.png` is daraksha's transport slider.

What I could see: OpenAI's own animation of the ChatGPT iOS thinking-level slider. It is published as `Chatgpt-thinking-level-slider-anim.gif` (credited to OpenAI) on androidauthority.com/p-3695577/, from the August 2026 GPT-5.6 Sol release. It is a five-detent slider (Instant, Medium, High, Extra High, Pro) that opens from the speedometer icon in the composer. I did not sign in to chatgpt.com, and I have no screenshots of the app itself. The GIF is a promotional render, so its timing may not be the app's.

![ChatGPT open: the gauge icon grows into the slider](measure/crops/ref-chatgpt-open-strip.png)

| | GIF px (408 wide ≈ 1.04 px/pt) | as ratio of the fill height |
|---|---|---|
| outer shell (white capsule, soft shadow) | about 68 tall, inset about 13–15 from the fill | 1.6 |
| fill (purple capsule) | 42 tall | 1 |
| thumb (white disc) | 34 | 0.81 |
| thumb inset in the fill | 4 on every side | |
| thumb centre − fill cap centre | 0 (±0.5) at min, High and Pro | |
| at min | the fill is a 42 px circle, one ring around the thumb | |
| at max | the fill's cap is concentric with the shell's end within 2 px | |
| detents | dots on the shell's axis, grey outside the fill and white inside it | |

![ChatGPT min, High, Pro (2×)](measure/crops/ref-chatgpt-min-2x.png)
![](measure/crops/ref-chatgpt-high-2x.png)
![](measure/crops/ref-chatgpt-max-2x.png)

Three capsules nested on one centre line, each end concentric with the next: **shell ⊃ fill ⊃ thumb**. The thumb is inset by a constant margin, so at every value it shares the fill end's centre. At the minimum the fill is exactly one thumb plus that margin, a circle, which keeps it concentric. The fill never has a straight segment narrower than its own height.

Grow and shrink: the gauge glyph becomes the thumb (a ringed disc). A short capsule grows rightward out of it inside the composer, then the whole control enlarges to the full width over the composer with the label above. About 6 GIF frames. On release it shrinks back into the composer's icon position, the fill running into the gauge glyph (frames 270–274, about 4 frames).

![ChatGPT close: the slider shrinks back into the gauge icon](measure/crops/ref-chatgpt-close-strip.png)

### 2.3 Two web sliders

**Native `input[type=range]`, unstyled** (WebKit and Chromium): the thumb is much larger than the track, and its centre travels `d/2 … W − d/2`. The fill (Chromium blue; WebKit's track is a shaded groove) ends under the thumb, so the end is never visible. Concentricity is free because the thumb covers the fill's end.

![Chromium native](measure/crops/chromium-native-range-plain.png)

**Native, styled the usual way** (the thumb smaller than the track: 16 in 20, with the fill as a gradient stop at the thumb centre; `measure/harness/native.html`): it shows the same 2 px fault as glass. The square stop shows above and below the thumb at mid values. At 0 a sliver of the fill's round cap shows beside the thumb, and at 100 a sliver of track. Making the thumb smaller than its track exposes every offset in every implementation.

![WebKit native: plain (top three), styled (bottom three)](measure/crops/webkit-native-range-plain-and-styled.png)

**`docs/tranches/BL/design/intent-motion/record/`** holds only `google/` (Google Chat mechanics data and scripts, `strips/` empty). It has no slider reference yet.

---

## 3. What the measure hands the design seat

The measured facts, without proposing the law:

- Every reference that looks right does one of two things. Apple and native make the knob **larger** than the track, and the fill is the track's own height and radius. ChatGPT nests **thumb ⊂ fill** with a constant inset and a fill whose minimum is a circle. Glass-ui's scrubber does neither: the thumb is 4 px smaller than a fill whose end is the thumb's trailing edge. That leaves a fixed 2 px offset at every size and a reshaping cap below v≈5.
- `--radius-pill` at 16 px cannot draw a capsule above 32 px. Any expanded surface (the loupe today, a grown slider tomorrow) needs a true pill radius.
- The loupe's size does not follow the slider, its fill ends square, its grow is a cut, and its exit shrinks into a point rather than back into the control. ChatGPT's expanded view grows **out of** and back **into** the control it came from.
- Press paints the keyboard ring. The dark thumb is darker than its fill. The dark fill is 19 % foreground, which reads grey.

## 4. Could not

- No real iOS Safari or Safari.app session. Playwright WebKit and headless Chromium agree on all of the above, but Safari.app was not opened.
- ChatGPT: only OpenAI's promotional GIF, not app screenshots. GIF frame timing is not evidence of real durations.
- Apple: no iOS 27- or macOS 27-specific slider page found. The HIG sliders page states no numbers, so the geometry above is measured from Apple's own published images and video.
- The grid's "focus" rows after the first value in each cell carry focus left over from the previous press. Use `clean.json` for focus and press (§1.6).
- The heavy guard queue was 14 runs deep. Rather than leave a dev server waiting in it, the probe started and stopped its own one-page vite server inside each guarded browser run. No server was left behind.
