# glass.babb.dev: what changes, in one page

For Mike, 2026-11-15. This is the plan that answers your thirteen points. Nothing is built yet.
The detail is beside this file: `FORM.md` (the page, the editor, the shell), `ROUTES.md` (every
page's fate), `LIBRARY-FAULTS.md`, `PACKETS.md` (the build order).

## What changes

**Every page becomes one thing.** A title, one sentence, then the working component, large, at the
top of the screen. Under it, at most three rows of variants. A page carries 30 to 60 words in all;
the dock overview carries 706 today. Build history, "stage 1 / stage 2", shader and token talk,
badges and counters are gone from every page. Props and API notes leave the site for each
component's README.

**The two unreadable pages** (Paper & Glass, Buttons) were four-column grids squeezed into a
410-pixel column. Each becomes one full-width stage laid out to its own width.

**Editor pages fill the screen.** Aurora, Blob, Constellation, Fourier, Springs and the
Configurator: the stage is about 884×664 on a laptop (it was 830×242 on Aurora) with the editor
400×664 beside it. On a phone the stage is 358×300 and the editor is never under 288 pixels tall
(it was 1 pixel). The preset ribbon becomes a row of chips; the helper line under every slider
goes.

**One of everything.** One Blob. One Constellation, with its six behaviours as presets. One front
door (`/`; the Intro page was a copy of it). The glass tiers on one page instead of five. Search,
floating panels and springs on one page each.

**The dock section becomes ten pages, one per way the apps really use a dock**: site navigation,
app chrome with a seal, the vertical rail, a figure's tools, a figure's dials, canvas tools,
transport, a pager, a corner controls seat, an inline action row. Each page is one live dock in
place. The dock index is ten cards, each a live dock, with no text but the title.

**The site's own two docks fold and move.** The rail starts open, folds to the current section's
icon when you press into the page, and opens on hover. The pager at the bottom folds to the page's
title with Previous and Next always live, and opens to the page tabs. Both are full pills.

**Content scrolls under the pager dock**, and that dock gets a firmer plate so it reads over
anything.

**The sticky page header goes.** The folded pager already shows the page's name.

**No black flash.** The warm ground is painted by the page's first bytes, before any script, on
every route. The aurora fades in over it.

**Cards are live components.** Every card on the front door and the section pages mounts the real
thing (the Substrates card runs the real Aurora, parked). No picture, no empty card, no blurb.
Corners go from 16 to 24 pixels.

## What is cut

- 92 pages become 78: 67 kept and rebuilt, 19 merged into another page, 6 cut, 11 new (the ten
  dock pages and Select, which had no page of its own).
- Cut outright: CSS Utilities, Dock Overflow, CTA to Dock Morph, Dock Search (it throws on load),
  Virtual Section Window, Story Chassis.
- All eight old dock pages. Their useful parts live in the ten new ones.
- The page backgrounds (grid, paper, page-wide constellation and aurora). The site has one ground;
  a field appears only inside a stage, and never under text.
- The stack-icon menu on both docks, the tab switchers that packed several components into one
  page, and the 132-pixel drawn previews.
- Old addresses for merged and cut pages show the not-found page. No redirects.

## What is the library's, not the demo's

Fixed in glass-ui itself, not papered over on the site. In the next patch: a dock that overflows
keeps its round ends; the scroll-header recipe's square shadow; muted grey text at 4.36:1 in
light; disabled and destructive button text; the configurator's editor collapsing to nothing. In
11.2.0 with the dock redesign: the dock's plate strength, the non-pill dock shapes, a dock that
starts closed being slow to answer, the dock search helper, and a ground colour in the theme
script.

## Your questions, each with what happens if you say nothing

1. **Giant titles.** The very large title stays only on the front door and the eleven section
   pages, held to about a fifth of the screen. Component pages get the compact title so the
   component is first. *Default: yes, as described.*
2. **The sticky header.** Removed, because the pager names the page. The alternative is a small
   round glass capsule at the top holding the back arrow and the title. *Default: removed.*
3. **The rail's fold.** It starts open and folds when you press into the page. The alternative is
   closed from the start, opening on hover, which hides the section list on arrival. *Default:
   starts open.*
4. **Card corners in the library.** The site's cards go to 24 pixels now. Should the library's own
   card radius (16) rise too, for every app, in 11.2.0? *Default: no; the site only.*
5. **Code on the page.** Each page may end with one short usage snippet, closed until opened.
   The alternative is no code on the site at all, only a link to the README. *Default: one closed
   snippet.*
6. **Old addresses.** Merged and cut pages show not-found, per the no-aliases rule. Say so if any
   address you have shared should forward instead (`/foundations/intro` is the likely one).
   *Default: not-found.*
7. **Disabled text.** The standard exempts disabled controls from contrast. I have set a floor of
   3:1 for the library's disabled labels. *Default: 3:1.*
