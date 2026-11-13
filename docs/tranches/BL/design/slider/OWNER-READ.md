# The Slider: what changed, and three questions

Mike, this is the Slider rebuilt from your four notes of 11 and 12 November. Everything below is built on a scratch branch and measured in Chromium and WebKit; nothing has shipped. Safari itself has not been opened yet.

## Your frame, before and after

![Your frame on top; the same control today and rebuilt; the knob close up](fold/owner-before-after-webkit.png)

Top: your frame from daraksha's Name transport. Middle: the same control on 11.0.1 (left) and rebuilt (right). Bottom: the knob, close.

- The knob is the full height of the band: 12 px in a 12 px band, where it was 8.
- The knob, the end of the fill and the two ends of the track are circles of one size on one line, at every value, 0 and 100 included, in every size and both orientations. The knob sat 2 px off centre before; it now sits within a quarter of a pixel.
- The fill is the colour of the text beside it, at full strength, and it stays that colour while you hold it. It was the text at 22 %, and it greyed further under your finger.
- The magnifier that rose over a held slider is gone, with the frosting behind it. It is replaced by the view below.

## The expanded view

![At rest, four frames of the grow, held; then held, four frames of the shrink, at rest](fold/expanded-strip-dark-webkit.png)

![Held, on daraksha's transport](fold/owner-after-held-webkit.png)

On a press, on Tab, or when the mouse rests on it, a rounded shell grows out of the track and the knob grows inside it; both go back the same way when you let go. Every frame between is a capsule that shares the track's centres. The shell can be pressed anywhere, like the track. When the app gives the value as text (the time, here), it shows above the knob while you are changing it. The light theme is in `fold/expanded-strip-light-webkit.png`.

## Three questions

Each has a default. If you say nothing, the default ships.

**1. The knob's colour.**

![Dark. Rows: the page's colour; today's colour; a light knob. Columns: 0, 50, 100, held](fold/knob-tone-dark-webkit.png)

Top row, the default: the knob takes the page's colour, so it is seen against the fill, against the track and inside the shell, in both themes. Middle row: today's colour, which is nearly the new track's tone, so at 0 it disappears. Bottom row: a light knob, which is the fill's own colour in dark.

One thing no colour fixes: a full-height knob has no track round it, so at 0 and at 100 half of it meets whatever the slider sits on. On a bare dark page the default knob has no outer edge there (the right-hand column of `fold/rest-dark-webkit.png`). A hairline round the knob would settle it for every colour; I have not added one without asking.

*Default: the page's colour, no hairline.* Tell me if you would rather keep today's colour, or want the hairline.

**2. The light theme, and the colour slider's handle.**

![Light. Small, medium and large at 0, 50 and 100; the colour slider below](fold/rest-light-webkit.png)

Two looks change that you did not ask for by name. In light, the fill becomes the text colour (near black) where it was a warm capsule, and the track is that same ink at 16 %, which reads as a grey. And the colour slider's handle becomes a ring of the track's full height where it was a narrow bar that stood proud of the round end.

*Default: both ship as shown, with the rest of the geometry.* Say so if the grey track or the ring is wrong.

**3. Bigger, not finer.**

Your word for this view was "granular". What is built makes the control bigger to see and to hold, and says the value; it does not make the travel finer. A pixel of movement changes the value by exactly what it did before. Finer travel is possible, but it means the Slider taking over how a finger maps to a value, and I would rather you hold this one first.

*Default: the view ships as built, and finer travel stays open as its own piece of work.* Tell me if finer travel has to come with it.

## When

- **11.1.1**: the geometry, the fill's colour, the ring, and the magnifier removed. No setting changes; each app has it when it moves to that version.
- **11.2.0**: the expanded view, which an app turns on with one setting.
- **12.0.0**: the expanded view on by default.
