# The mark, redesigned: your read

You asked, on atlas on 2026-11-11, for the underline and highlight to be redesigned from first principles. Three designs were built and measured side by side (two of glass's, one from atlas). This page is the one that won, on the comma headline. In each strip the **first panel is today's mark** (11.1.0) and the **second panel is the new one**. The third and fourth are the designs not chosen.

**Light** ("4,485" at 112 px, Plus Jakarta Sans 800)

![the comma headline, light](AB/sheets/closeup-chromium-h112-underline-light.png)

**Dark**

![the comma headline, dark](AB/sheets/closeup-chromium-h112-underline-dark.png)

**The highlight, light and dark**

![the highlight, light](AB/sheets/closeup-chromium-h112-highlight-light.png)
![the highlight, dark](AB/sheets/closeup-chromium-h112-highlight-dark.png)

| at 112 px | today | new |
| --- | --- | --- |
| past the text, start / end | 7.5 / 9 px | 3.5 / 0 px (the 4's own side bearing) |
| crossing the comma | 311 device px | 0 |
| weight | 6.9 px, thinner as type grows | 8 px: 0.07em at every size, never under 2 px |
| shape | seeded wobble, taper, hook | a straight rule |

What changed: the mark is now the browser's own text decoration, placed from the font. It stops where the words stop (on letter-spaced type, one letter-space after), breaks around descenders, wraps line by line, and prints. The only thing left of the hand is the draw: the ink is laid once along the line, in 200 ms on the shared spring, when you scroll to it. With motion off it is simply there.

## Four questions

1. **A plain rule, or a round-ended stroke?** The third panel keeps round ends and a faint bow. *Default: the plain rule (second panel).*
2. **Drop the strike-through and the ring?** Our searches found nothing in Gregg, atlas, sci-report or slides that mounts either; atlas confirms before the cut. They would go in 12.0.0; the new mark ships beside today's in 11.2.0. *Default: yes, drop both.*
3. **A phrase full of descenders ("by program") breaks into dashes** in every design ([capture](AB/sheets/closeup-chromium-byprog-underline-light.png)). The cure is one unbroken rule set just below the descenders, a quarter of an em under the baseline, chosen per phrase by the author ([capture](fold/evidence/F1-clear-seat.png): the first strip is the dashes, the next six the cure at three sizes, the last a seat set too high). *Default: yes; automatic choice waits until it has been measured.*
4. **In glass's own light theme the default ink is the text colour**, so an unstyled underline looks like a link ([capture](challenge/evidence/F9-ink.png)). That default is today's, from your order of 2026-11-06; Gregg and atlas set their own ink. *Default: keep it.*

The full spec is `docs/tranches/BL/waves/W-B.16.md`; the measurements are `AB.md`, `challenge.md` and `fold.md` beside this file.
