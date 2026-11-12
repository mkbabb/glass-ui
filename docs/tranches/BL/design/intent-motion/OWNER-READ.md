# Intent-first motion: one page for the owner

2026-11-12. The full study is `STUDY.md` beside this file. Three recorders measured Google, Apple and the design references (emilkowal.ski, rauno.me, family.co, benji.org), plus keyframes.babb.dev. Shipping Safari was not measured; the WebKit build agreed with Chromium on every technique.

## Three strips

**1. The Google Chat pin you liked** (0 to 500 ms, every 50 ms)

![Google Chat, hover on Board](record/google/strips/chat-hover-board.png)

The plate grows from four fifths of its size and turns into place over half a second; the icon itself does not grow or morph (it is already filled in the first frame), and on leave everything cuts back in one frame.

**2. Apple's store card on hover** (0 to 300 ms, every 37.5 ms)

![Apple store card, hover](record/apple/strips/store-card-hover.png)

The card grows 1 % and its one shadow deepens over 300 ms, the same both ways; you cannot see it in the frames, and that is the touch: one node, two properties, a change felt more than noticed.

**3. Our dock today, as keyframes shows it** (seven frames, 75 ms apart)

![glass dock on keyframes, hover](record/refs/strips/kf-chrome-dock-hover-step75ms.png)

The capsule's width and corner arrive in one frame under a 250 ms scale, so the third frame already shows the full row clipped mid-word; this is the kind of jump the study lists twenty of.

## What the study found

- Google's hover is a flat plate that was always there, starting most of the way in. Apple's is one or two properties on one node, with no shadow, rim, gradient or gleam on any glass. Neither animates an icon's shape on hover.
- Both cut where your law forbids it: Google on every leave, Apple on its button's hover and press.
- glass carries more than either on a single control: a pointer gleam on every glass surface, five shadow layers on a capsule, a blur while a menu opens, three gradients behind a Select, a scripted press spring.
- Seven small pieces would cure most of the twenty snaps, and each deletes more than it adds: a hover plate, an icon that answers, presence for anything that comes or goes, a box that follows its content, one press, a reduced-motion fade, and a no-snap check consumers can run.

## Four questions

Each has a default. Silence takes the default.

1. **Press.** In July you retired the press indent; today you asked that the edit icon "shrink like a click". The proposal is one press for every button and icon: a uniform shrink to 0.97 with the colour a step deeper, about 100 ms down and 150 ms back, no bounce, no inset shadow. A strip will come with the spec.
   Default: yes on buttons and icons; cards, rows and large surfaces answer by colour alone.

2. **The plate's shape.** Google gives each destination its own shape (pentagon, clover, slanted pill), and the turn you see only reads on a shape that is not round.
   Default: the plate takes the control's own rounded shape and grows without a turn; the icon carries the small motion. Say so if you want shaped plates on the dock's page icons.

3. **The focus ring.** Today it appears in one frame. Your law says nothing appears in one frame; restraint says no motion on keyboard actions. Google swells its ring over 600 ms; Apple does nothing.
   Default: a 100 ms fade in and out, no swell.

4. **How things leave.** In the sources a hover fill leaves the way it came, and a thing that appeared (a menu, a tooltip, a mark) leaves in about half the time with less travel.
   Default: adopt both. Hover: up to 200 ms in and out. Appearing things: up to 200 ms in, about 120 ms out.
