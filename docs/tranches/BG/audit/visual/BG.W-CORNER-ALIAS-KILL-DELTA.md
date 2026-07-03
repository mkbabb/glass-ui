# BG.W-CORNER-ALIAS-KILL — DELTA (F2.4, USER-0703)

**The defect (user screenshot 2026-07-03):** WHITE WEDGES at the rounded top corners of
a core StoryPage/landing card over the warm-pink field — an opaque light backplate
painting to the SQUARE corner box behind the radius curve. Reproduced on `/forms`
(the category landing; the forms field hue is the warm pink).

## The paint-proven mechanism (real Chrome.app CDP :9456, Metal M5 Max, :5200 built demo)

Pixel forensics (scanline + `elementsFromPoint` + layer-isolation toggles) found the
offender is the **trapped full-bleed wash**, not a pseudo backplate:

1. `.story-hero-bg--bleed` (`position: fixed; inset: 0; z-index: -5`) mounts INSIDE
   the route article. `.route-enter { animation: … both }` holds a FILLED transform
   forever (`getComputedStyle → matrix(1,0,0,1,0,0)` — a computed transform ≠ `none`),
   so the article is a PERMANENT fixed-position containing block. The "viewport" wash
   silently sized to the ARTICLE box (`bleedRect: 189.5,40 1152×2188` ≡ the card box).
2. `.grid-bg { background-color: var(--background) }` made that trapped layer an
   OPAQUE near-white square-cornered plate exactly behind the un-clipped
   (`[data-full-bleed]` → `overflow: visible; border-radius: 0`) rounded translucent
   card → the white wedge at every corner + the warm field occluded behind the card.
3. The trap was also HIDING a design collision: un-trapped, the opaque wash would
   white-out the BG.W-FIELD-AURORA shell field on every static-wash route (two page
   backgrounds fighting).

## The class-level fixes

| Layer | Fix | File |
|---|---|---|
| The route root releases its transform | `.route-enter` fill `both → backwards` (to ≡ base — paint-identical at rest; the permanent fixed-containing-block dies) | `src/styles/transitions.css` |
| The bleed escapes the route subtree | the bleeding bg arms mount via `<Teleport to="body">` (correct from frame 0; immune to ANY future ancestor promotion) | `demo/stories/StoryHero.vue` |
| One page background | `.grid-bg` drops its opaque `background-color` — the grid is a translucent TEXTURE over the ONE shell warm field | `demo/stories/story-hero.css` |
| The corner-backplate discipline | `.story-hero-bg { border-radius: inherit }` (boxed arm follows the host corner even un-clipped) + the `--bleed` arm resets `0`; `.story-hero` keeps its `overflow: hidden` + radius clip | `demo/stories/story-hero.css` |

## Post-fix paint (this dir)

- `forms-landing-chrome-{light,dark}-full.png` — the landing over the warm field:
  the grid texture bleeds the WHOLE viewport over the pink field (`bleedRect: 0,0
  1440×900`, parent `BODY`), the card corners show the FIELD through the curve.
- `forms-landing-chrome-{light,dark}-corner{TL,TR}.png` — the corner close-ups:
  the wedge GONE in both modes (the pre-fix TR wedge is the scratch capture the
  fix-notes describe; the before-state is reproducible at HEAD~).
- `forms-landing-webkit-{light,dark}-full.png` — the real-WebKit leg (off-screen
  WKWebView, system WebKit.framework/Metal; the in-pixel WEBKIT badge): same clean
  corners + full-viewport grid texture.

## Gate

`proof:glass` arm `corner-backplate` (CB1 route-fill-backwards · CB2 bleed-teleports
· CB3 grid-no-opaque-base · CB4 radius-inherit + bleed-reset + host-clip). Born-RED
at HEAD (5 violations, machine-verified against `git show HEAD:`) → GREEN; 4
self-test bites (both-fill mutant / no-teleport / opaque-base re-add / radius strip
each must flag). NOTE: `proof:glass` overall carries ONE PRE-EXISTING violation
(`safari-blur-var`, in unmodified `vite.style-assets.ts` — red at pristine HEAD too);
the corner-backplate arm is fully green.

## Non-authoring judge

Per real-paint-protocol §3 the building agent does NOT flip any gestalt roster row;
this DELTA + captures are the build-side evidence for the fresh-agent pixel-read.
