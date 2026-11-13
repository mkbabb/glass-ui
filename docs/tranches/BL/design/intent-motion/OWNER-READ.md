# Intent-first motion: one page for the owner

2026-11-12. The full study is `STUDY.md` beside this file; the spec is `../../waves/W-B.17.md`. Three recorders measured Google, Apple and the design references (emilkowal.ski, rauno.me, family.co, benji.org), plus keyframes.babb.dev. The pieces were then built in a scratch worktree, measured, challenged and measured again. Shipping Safari was not measured; every Safari reading here is Playwright's WebKit build.

## Three strips from the study

**1. The Google Chat pin you liked** (0 to 500 ms, every 50 ms)

![Google Chat, hover on Board](record/google/strips/chat-hover-board.png)

The plate grows from four fifths of its size and turns into place over half a second; the icon itself does not grow or morph (it is already filled in the first frame), and on leave everything cuts back in one frame.

**2. Apple's store card on hover** (0 to 300 ms, every 37.5 ms)

![Apple store card, hover](record/apple/strips/store-card-hover.png)

The card grows 1 % and its one shadow deepens over 300 ms, the same both ways; you cannot see it in the frames, and that is the touch: one node, two properties, a change felt more than noticed.

**3. Our dock today, as keyframes shows it** (seven frames, 75 ms apart)

![glass dock on keyframes, hover](record/refs/strips/kf-chrome-dock-hover-step75ms.png)

The capsule's width and corner arrive in one frame under a 250 ms scale, so the third frame already shows the full row clipped mid-word; this is the kind of jump the study lists twenty of.

## What was found

- Google's hover is a flat plate that was always there, starting most of the way in. Apple's is one or two properties on one node, with no shadow, rim, gradient or gleam on any glass. Neither animates an icon's shape on hover.
- Both cut where your law forbids it: Google on every leave, Apple on its button's hover and press.
- glass carries more than either on a single control: a pointer gleam on every glass surface, five shadow layers on a capsule, a blur while a menu opens, three gradients behind a Select, a scripted press spring.
- A few small pieces cure most of the twenty snaps, and each deletes more than it adds: a hover plate, an icon that answers, presence for anything that comes or goes, one press, a reduced-motion fade, and a no-snap check consumers can run. A seventh, a box that follows its content, works and is held back until its cost is read on the real components.
- Building them cut the design down. A hover is now two animations, not three. The icon's default grow could not be seen and is gone. The pulsing "idle" and "busy" plate cut in four places and is gone.

## Five questions

Questions 1, 3, 4 and 5 have a default, and silence takes it. **Question 2 has none: the plate waits for your pick.**

1. **Press.** In July you retired the press indent; today you asked that the edit icon "shrink like a click". Built: every button and icon shrinks evenly to 0.97 with its plate at full strength, about a tenth of a second down and back, no bounce, no inset shadow. A quick tap on a trackpad completes the whole shrink (with CSS alone it showed nothing), and an icon inside a trigger shrinks by itself.
   Default: yes on buttons and icons; cards, rows and large surfaces answer by colour alone.

2. **The plate.** You named three things in the Chat bar: a coloured plate, a shape, and an icon that takes the colour. Our first plate kept none of them and can barely be seen.

   ![your frame, then a, b and c](fold/strips/plate-vs-owner-chromium.png)

   Left to right: your frame; **a**, the plate as first built (a 5 % grey fill); **b**, the plate at full strength in the seat's own colour, the icon taking that colour; **c**, b with a soft shape. All three grow and fade the same way, in and out. A shape costs no markup, but each destination would need one drawn.
   Pick a, b or c, or say what is still missing.

3. **The focus ring.** Today it appears in one frame. Google swells its ring over 600 ms; Apple does nothing.
   Default: a 100 ms fade in and out, no swell.

4. **How things leave.** A hover fill leaves the way it came. A thing that appeared (a menu, a tooltip, a mark) leaves in about half the time with less travel. Two icons that trade places (play and pause) cross over, neither ever more than a third visible while the other shows:

   ![play to pause](fold/strips/pair-chromium.png)

   Default: adopt all three.

5. **Idle.** You asked that large and focused elements have idle states. A slow pulse of the plate was built twice; both times it jumped when the pointer arrived or the state ended, in one browser or the other. What holds is a resting fill: the one element a view asks you to act on sits at the hover strength, like Apple's default button.
   Default: the resting fill, no pulse. Say so if you want the pulse; it would cost a second layer and a script.

## Two more strips, for a glance

- **A curve that draws on hover.** A gap passes along the easing curve once, and once more on the click that opens its menu. Top two rows are the build (a small gap, in and back); the bottom row is the first try, which read as a broken icon.

  ![the draw's gap](fold/strips/draw-gap-chromium.png)

- **A busy button** will show the dot ring in its icon's seat, so it does not change width and still reads as working when nothing moves. That strip comes with the build.
