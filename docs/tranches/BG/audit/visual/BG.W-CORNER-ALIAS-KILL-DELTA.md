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

---

## NON-AUTHORING DUAL-ENGINE VERDICT — the wave's THREE routes (2026-07-03)

A fresh non-authoring paint judge (did NOT build this wave) captured the wave's
declared surfaces `[/display/card, /substrates/glass-material, /display/buttons]` —
the corner close-ups over a saturated field, BOTH modes — over the **BUILT** demo
bytes served on `:5200` (`demo:dist:build` → `demo:dist:serve`, NOT the `:5199` dev
server), across BOTH engines: real **Chrome.app** via CDP `:9456` (GL_RENDERER
probe = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal, NOT
SwiftShader) + real system **WebKit** via off-screen WKWebView (`wkshot-live.m`
re-built from source; in-pixel `WEBKIT / Apple GPU` badge at `@2x 2880×1800`).

### The captures (all resolve on disk, this dir)

| route | Chrome light/dark | WebKit light/dark |
|---|---|---|
| `/display/card` | `card-chrome-{light,dark}-full.png` | `card-webkit-{light,dark}-full.png` |
| `/substrates/glass-material` | `glass-material-chrome-{light,dark}-full.png` | `glass-material-webkit-{light,dark}-full.png` |
| `/display/buttons` | `buttons-chrome-{light,dark}-full.png` | `buttons-webkit-{light,dark}-full.png` |

Corner close-ups on the exact defect surface (a rounded card top corner over a
**saturated field**): `buttons-field-chrome-{light,dark}-corner{TL,TR}.png` (the
blue "Launch sequence" field CTA) + `card-{,field-}chrome-{light,dark}-corner{TL,TR}.png`
(the orange tier-gallery field) + `glass-material-{,field-}chrome-{light,dark}-corner{TL,TR}.png`.
Audit JSON: `chrome-audit.json`, `chrome-field-audit.json`.

### The pixel read — NO white square-corner wedge, both engines, both modes

**Pixel forensics on the corner triangle** (the square-corner region behind the
radius curve, where a white backplate wedge would appear). Scanning the extreme
corner triangle of each saturated-field card:

| corner clip | meanL | maxL | white-wedge px | corner-triangle sample (r,g,b) |
|---|---|---|---|---|
| buttons blue field, light TL/TR | 0.771 / 0.780 | 0.903 / 0.912 | **0 / 0** | `(243,228,203)` `(245,228,218)` — warm cream page shows through |
| buttons blue field, dark TL/TR | 0.408 / 0.400 | 0.629 / 0.625 | **0 / 0** | `(39,28,18)` `(30,19,15)` — near-black warm page shows through |
| card orange field, light TL/TR | 0.642 / 0.670 | 0.724 / 0.729 | **0 / 0** | `(211,122,53)` `(214,127,63)` — the ORANGE field paints to the corner |
| card orange field, dark TL/TR | 0.475 / 0.455 | 0.598 / 0.587 | **0 / 0** | `(213,125,59)` `(216,128,64)` — the ORANGE field paints to the corner |

`white-wedge px = 0` in EVERY corner triangle (a white wedge = a near-white L>0.93,
low-chroma <0.05 pixel where the field/page color belongs). Every sampled corner
pixel is warm-CHROMATIC (R>G>B), the field/page color right up to the radius curve —
never a neutral square backplate. The full-page reads confirm it directly: the
`/display/card` orange tier-showcase field, the `/display/buttons` blue CTA field,
and the `/substrates/glass-material` recessive-aurora hero all show their rounded
top corners revealing the field/page through the curve with no light box artifact.

### The computed DOM read — the corner-backplate discipline holds at the CLASS level

The `::before` / backplate audit across all six route×mode captures found the ONLY
opaque-`::before` surfaces are `dock-icon-button` capsules where the host is a full
pill (`hostBR = 9999px`) AND the `::before` radius INHERITS it (`beforeBR = 9999px`,
`hostBR == beforeBR`) — the exact discipline (every backplate inherits the host
radius, one rule not per-site patches). No rounded host anywhere carries a
square-corner (`0px`) `::before` behind its radius. `glContexts` present, route
content renders full (routeChildren ≥ 2, GL substrate live on the aurora routes,
recessive/no-conic/no-oversaturation).

### VERDICT: **PASS**

The class-level corner-backplate discipline reaches PAINT. Both engines (Chrome
Metal + Safari WebKit), both modes, all three wave routes: glass/card corners show
NO white square-corner wedge behind the radius over a saturated field. The aliasing
chronic (USER 2026-07-03) is killed. All capture PNGs resolve on disk.
