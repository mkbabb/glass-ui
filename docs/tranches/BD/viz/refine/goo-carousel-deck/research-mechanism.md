# RESEARCH-3 — the FIX MECHANISM (glass-ui internals, goo-carousel-deck)

**Role.** Map the EXACT tokens/recipes to retune to fix the goo-carousel-deck defects — GRAY-GLASS
(the carousel/deck pager chassis + container reads gray, not warm-cream luminous) and MOTION (the
dot indicator must goo-morph with inertia/weight/bounce/squish). COMPOSE shipped primitives; NO
re-fork, NO dual path. Extend the existing gates in place.

**North star (binding).** `design.md` six-layer optical composite (backdrop blur+saturate · warm
tint · edge rim · inner catch-light · drop shadow · grain) · iOS-27 Liquid Glass · glass+PAPER
morphism · `CLAUDE.md` §BA.W-NO-GRAY (glass is warm MATERIAL, never gray) · §W-DARK-MATERIAL ·
`[[feedback-liquid-weight-universal]]` (inertia/weight/bounce/squish on ALL motion).

---

## 0. The de-dup verdict — carousel(embla) vs deck(useDeck) are DISTINCT substrates; the DOTS are ONE

The prompt asks: "ONE substrate if they are the same thing." **They are NOT the same thing — KEEP
both substrates; the de-dup is already DONE at the only place it applies (the dots).**

| Surface | Substrate | Role | Verdict |
|---|---|---|---|
| `/carousel` | `embla-carousel-vue` (`useCarousel.ts` → `CarouselApi`) | an item-SCROLLER — N slides scroll in a track, snap points, drag-momentum | KEEP — embla is the peer-depended carousel engine |
| `/deck` | `useDeck.ts` (headless index/progress/`liveMessage`, ZERO DOM) + `useDeckKeyboard` + `useDeckSpring` | the full-viewport keyboard-paged aria-live PRESENTATION register (slides app, speedtest survey-deck) | KEEP — a DOM-free index core, NOT an item-scroller |

They are deliberately distinct (CLAUDE.md `/deck` note: *"DISTINCT from /carousel's embla
item-scroller"*). Folding them onto one substrate would be a re-fork in the wrong direction.

**The de-dup that IS real — and already shipped — is the DOTS.** Both consume ONE dot register:

- `PagerDots.vue` (`/pager`) is the ONE dot rail + the ONE `pagerWindow.ts` windowing oracle.
- `CarouselPager.vue` composes `Button` chevrons + the `.glass-pager-ring` counter (no dots) —
  the chevron-pager arm.
- `GlassCarouselPager.vue` is the audacious chevron+counter+toggle row (no dots).
- `DeckPager.vue` is a THIN wrapper over `<PagerDots pattern="group">` — ZERO `pagerWindow`
  re-implementation (the deck-boundary fence). It inherits the worm/goo-morph for FREE.

So the goo-morph lands ONCE in PagerDots; DeckPager + the carousel-dots consumer inherit it (the
≥2-consumer bar met by construction). **No substrate merge is owed.** The fence: `pagerWindow.ts`
is NEVER re-forked (no third copy); DeckPager carries NO worm re-implementation.

---

## 1. The MOTION half — VERIFY-then-WIRE; the worm engine is SHIPPED, the deck slide is the gap

The pager goo-morph WORM is **already built** (`useWormMorph.ts` + the `.goo-worm`/`.pager-goo-layer`
recipe in `PagerDots.vue`, BUILD-SPEC `goo-morph/`). It composes the five shipped leaves with no
re-fork. The mechanism is correct and on the right clocks. The refine's motion job is **VERIFY the
worm reads liquid + wire the DECK SLIDE settle to the same weight** — mint nothing.

### 1a. The worm tokens (SHIPPED — verify, do not re-mint)

| Token | Ship value (`PagerDots.vue:308-345`) | Mechanism |
|---|---|---|
| `--pager-dot-size` | `0.8125rem` (13px) | the worm rest length W (a fat liquid pip, not a 6px speck) |
| `--pager-dot-active` | `var(--foreground)` | warm-ink fill — NOT gray (✓ already warm) |
| `--pager-dot-inactive` | `color-mix(in srgb, var(--foreground) 52%, transparent)` | dim warm pip |
| `--pager-worm-flow` | a custom `linear()` (rise→DWELL@mid→gentle overshoot land) | the worm's geometry-law travel curve (the FAT NECK held open ~800ms@1.8s) |
| `--pager-worm-duration` | `1.8s` | the weight/inertia clock (genuinely honored — the rAF samples it) |
| `--pager-worm-max-stretch` | `1.45` | the velocity-swell — a VISIBLE liquid squish (`useLiquidFlex` cap) |
| `--pager-goo-layer-opacity` | `0.65` | the rail translucency, ONCE at the layer (opaque-layer technique) |
| `--pager-goo-filter` | `url(#pager-goo)` | the metaball merge (the `morph-bridge.css` blur→alpha-threshold trick) |

These are correct per `[[feedback-liquid-weight-universal]]`. The `1.8s` slow-flow + the `1.45`
max-stretch + the `GIRTH_FLOOR=0.72` (fat worm, never a hairline thread) + the goo neck =
the inertia/weight/bounce/squish the law demands. **Fence: do NOT re-tune these without a live-π
read defect** (the worm is already the FIX for the old P5 width-transition).

### 1b. The DECK SLIDE settle — wire to `--spring-bouncy`-class weight (the motion gap)

`useDeckSpring.ts` rides `DECK_SPRING` (response 0.5, ζ 0.85 — the calm `.smooth` preset) →
`--spring-deck: var(--spring-smooth)` (`scheme-motion.css:274`). That is the CALM no-overshoot
register — correct for a full-page slide (an overshooting full-viewport slide is nauseating, the
vestibular floor). **The slide settle is NOT the gap; the DOT morph is.** The deck's DOTS get the
worm goo-morph for free via DeckPager. So the deck motion is: calm slide (`--spring-deck`) + liquid
dot (`--pager-worm-flow`). KEEP both — they are the two-register split (full-page = calm,
small-indicator = bouncy), NOT a desync.

**Motion verdict: VERIFY only — the worm + the deck slide are both shipped on the correct clocks.
Mint no spring, no scale token. If a live-π capture shows the worm reads as a flat pill (the
rejected read), the fix is the `--pager-worm-max-stretch`/`GIRTH_FLOOR` already in place — re-run
the π, do not re-engineer.** No motion-token change is owed by this refine.

---

## 2. The GRAY-GLASS half — the keystone is LANDED; the CHASSIS substitution-trap is the open hole

### 2a. The keystone (W-GLASS-ABROGATE-GRAY) is ALREADY APPLIED in source — verify, don't re-warm

`--card` is the SOLE fill source for every glass rung. It is already warmed on-disk:

| Token | On-disk value (HEAD) | OKLab | Source |
|---|---|---|---|
| light `--card` | `hsl(30 85% 96%)` | C 0.0124 H 68.5 L 0.976 (warm-cream) | `color-radius.css:72` + `light-dark.css:101` light arg |
| dark `--card` | `hsl(26 22% 17%)` | C 0.0182 H 59.2 (warm-luminous) | `dark-arm.css:74` + `light-dark.css:101` dark arg |
| light `--glass-saturate-{wash,quiet,resting}` | `1.4` | toward apple.com nav 1.8 | `glass.css:113-116` |
| light `--glass-saturate-{floating,overlay}` | `1.6` | load-bearing transmission term | `glass.css:116-117` |

The `--glass-bg-*` compose recipe (`glass.css:261-265`) `color-mix(in srgb, var(--card) …%,
transparent)` faithfully carries the warm chroma. **FIX-A/C/D from W-GLASS-ABROGATE-GRAY are
LANDED.** The no-gray gate already carries the `WARM_PLATE_FLOOR = 0.010` G1-G6 witnesses
(`proof-no-gray.mjs`). So the GENERAL card/button/select-panel gray is fixed. **Do NOT re-warm
`--card` or the saturate ladder** — that work is done; re-touching it is the no-backwards-compat /
double-fix trap.

### 2b. THE OPEN HOLE — `.glass-pager-ring` reads the RAW `--glass-bg-floating` (the substitution-vs-inheritance trap)

This is the precise carousel/deck-SPECIFIC gray-glass mechanism, and it is the recurring
substitution-trap (the AX.W55 / dock `--glass-bg-dock` class).

**The defect.** `.glass-pager-ring` (`glass/surfaces.css:360`) — the chassis that hosts BOTH the
`<PagerDots ring>` dot rail AND the `<CarouselPager>`/`<GlassCarouselPager>` counter — paints:

```css
background: var(--glass-bg-floating);   /* ← RAW pre-substituted token, NOT the element-level tint mix */
backdrop-filter: var(--glass-blur-floating);
```

`--glass-bg-floating` is composed at `:root` (`glass.css:264`) at the `:root` `--glass-tint-strength`
(0% / the floor). Reading it RAW means the chassis NEVER engages the W55 adaptive tint seam — over a
BRIGHT carousel image or a light page it does not darken-toward-ink (the bright bucket), and over a
dark substrate it does not lift-toward-luminous (the W-DARK-MATERIAL tint arm). So a pager pill
floating over a bright photo carousel reads as a flat, slightly-translucent GRAY plate — the exact
"glass cards far too gray" defect, on the navigation/carousel band.

**The contrast.** `menu.css:37` (the menu-row, the CORRECT pattern) and `ladder.css:43-121` (the
content tiers) and `glass.css:271` (`--glass-bg-dock`) all compose the ELEMENT-level tint:

```css
background: color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source) var(--glass-tint-strength));
```

`.glass-pager-ring` is the ONE pager chassis that was left on the raw token.

**THE FIX (token-first, ZERO new recipe, mirrors the dock's own re-point).** Re-point the chassis
background onto the element-level oklab tint mix — the SAME seam `ladder.css`/`menu.css`/the dock
already compose. ONE edit in `glass/surfaces.css:367`:

```css
.glass-pager-ring {
    background: color-mix(
        in oklab,
        var(--glass-bg-floating),
        var(--glass-tint-source) var(--glass-tint-strength)
    );
    /* backdrop-filter, box-shadow, rim, transition — BYTE-UNCHANGED */
}
```

**Why this is correct + safe:**
- At the `:root` default (`--glass-tint-strength: 0%`) the mix resolves byte-identical to the raw
  `--glass-bg-floating` (`color-mix(in oklab, X, src 0%) ≡ X`) — the no-op floor; existing pager
  pixels over a flat page are unchanged.
- Over a declared/sampled BRIGHT backdrop (the `@container style(--glass-backdrop: light)` bright
  bucket — a carousel that sets it, or the dock observer) the pill darkens-toward-ink → a real
  silhouette over the bright image, text AA preserved (the W55 `--glass-tint-strength-aa` ≤24%
  clamp keeps it translucent).
- Under `.dark` the W-DARK-MATERIAL tint arm (`--glass-tint-source: var(--glass-tint-ink)` resolving
  the light-cream ink at the bounded 12% `--glass-tint-strength-aa`) LIFTS the pill toward luminous
  warm-dark — never a charcoal slab.
- `in oklab` is the glass-tint perceptual family (NOT the in-srgb `--surface-tint-*` brand fence —
  AW.W26 untouched).

The `.dark .glass-pager-ring` box-shadow arm + the rim/specular + the bezier transition are
byte-unchanged. This is the dock's own `--glass-bg-dock` self-re-point precedent applied to the
pager chassis — the documented retune path, not a new mechanism.

### 2c. The dot fills already warm — no change

`--pager-dot-active: var(--foreground)` / `--pager-dot-inactive: color-mix(in srgb, var(--foreground)
52%, transparent)` (`PagerDots.vue:315-316`) are warm-ink derived. The goo layer paints
`currentColor` = `--pager-dot-active` = `--foreground`. **No gray in the dots.** No change owed.

### 2d. HELD — the container backdrop is the demo's job, not the library's

The carousel/deck DEMO stories sit over a `CATEGORY_DEFAULT_BG` (`navigation → aurora`,
`motion(deck) → constellation` — `manifest.ts:181`). Over a live warm aurora the glass transmits
warm. If a live-π read still shows gray on the carousel CONTENT band, the lever is the demo
backdrop (presets-in-consumers — the demo story sets `--glass-backdrop: light` on the carousel
ancestor so the pill engages the bright bucket over its image content), NOT a library token. The
library ship is the §2b chassis re-point; the demo wiring is the consuming half.

---

## 3. THE GATE IMPACT — extend `proof:no-gray` in place (no new gate, no new KEY)

The §2b chassis re-point needs ONE new SOURCE witness (the substitution-trap is invisible to the
existing composite-floor witnesses, which read `--card`/`--glass-bg-*` directly, not the chassis
rule). Extend `proof-no-gray.mjs` in place:

- **G7 (NEW source witness) — `pager-ring-reads-element-tint`.** Assert `.glass-pager-ring`'s
  `background` is the `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source)
  var(--glass-tint-strength))` element-level seam, NOT the raw `var(--glass-bg-floating)`. Read
  `src/styles/glass/surfaces.css` (strip comments first), regex the `.glass-pager-ring`
  `background:` declaration. Born-RED on HEAD (`background: var(--glass-bg-floating);` raw), GREEN
  after the re-point. + a self-test bite: a planted raw-token `.glass-pager-ring` background REDS.
  This closes the substitution-trap on the pager chassis the same way the dock's `--glass-bg-dock`
  oklab compose closed it on the dock.

**Cross-asserts GREEN by construction (no impact):**
- `proof:no-gray` G1-G6 (the `--card`/saturate keystone) — untouched; the chassis re-point reads
  the SAME warmed `--glass-bg-floating`.
- `proof:glass-cohesion` — the chassis stays glass (translucent, reads the substrate through it);
  the re-point ADDS the tint, never an opaque `bg-card` plate. No allowlist change.
- `proof:menu-glass` — the menu-row already composes this exact seam; the pager joins the pattern.
- `proof:dark-material` / `proof:adaptive-glass` — the chassis now ENGAGES the W55/dark tint arm
  it was missing (a fix, not a regression); `--glass-tint-*`/`--glass-tint-ink`/the strength clamp
  are byte-untouched.
- `proof:pager-goo` (the worm gate) — unaffected (the chassis is the pill, not the worm).

**The binding π — `tests-visual/no-gray.spec.ts` G7 arm.** Mount `<PagerDots ring>` (and the
carousel counter) over a bright synthetic plate with `--glass-backdrop: light` set on an ancestor;
`getComputedStyle` the composited `.glass-pager-ring` `background-color`; assert OKLab C ≥ 0.010 at
warm hue H ∈ [45,85] AND the silhouette darkens vs the flat-page no-op default. BOTH modes. Maps
1:1 to the live carousel/deck capture. (The motion arm rides the shipped `pager-goo.spec.ts` —
verify, not re-author.)

---

## 4. THE PRECISE CHANGE LIST (the buildable summary)

| # | File:line | Change | Class | Gate |
|---|---|---|---|---|
| 1 | `src/styles/glass/surfaces.css:367` | `.glass-pager-ring { background: var(--glass-bg-floating) }` → `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength))` | token-first, no-op@default, substitution-trap close | `proof:no-gray` G7 (NEW witness, born-RED) |
| 2 | `scripts/proof-no-gray.mjs` | ADD G7 `pager-ring-reads-element-tint` source witness + self-test bite | gate extend-in-place | — |
| 3 | `tests-visual/no-gray.spec.ts` | ADD the G7 pager-ring composited-plate OKLab readback (bright bucket, both modes) | binding π | — |
| 4 (demo, HELD) | the carousel/deck story ancestor | set `--glass-backdrop: light` IFF a live-π read shows residual gray on the image-content band | presets-in-consumers | π read |

**Everything ELSE is VERIFY-only (shipped + correct):**
- the worm engine (`useWormMorph.ts` + the `.goo-worm`/`.pager-goo-layer` recipe + the goo filter)
  — the MOTION half, on the right clocks, liquid-weight law met.
- the `--card`/`--glass-saturate-*` keystone (W-GLASS-ABROGATE-GRAY FIX-A/C/D) — the general
  gray-glass, already landed in source, gated by `proof:no-gray` G1-G6.
- the `--pager-dot-*` warm-ink fills — already warm.
- the deck slide settle (`--spring-deck` = `--spring-smooth`) — the calm full-page register, correct.

---

## 5. THE FENCES (binding, both halves)

1. **NO substrate merge** — carousel(embla) + deck(useDeck) stay distinct; the DOTS are the one
   shared register (already de-duped onto PagerDots). No re-fork in either direction.
2. **NO re-warm of `--card`/saturate** — W-GLASS-ABROGATE-GRAY landed it; re-touching is the
   double-fix trap.
3. **NO new spring/scale/clock** — the worm rides shipped `--pager-worm-*`; the deck rides shipped
   `--spring-deck`. The W-GLASS-CAL spring fence holds.
4. **NO new recipe/class for the chassis** — the §2b fix is a token-first background re-point onto
   the EXISTING element-level oklab tint seam (`menu.css`/`ladder.css`/`--glass-bg-dock` precedent).
5. **NO-OP at the default** — `color-mix(in oklab, X, src 0%) ≡ X`; existing pager pixels over a
   flat page are byte-unchanged.
6. **`in oklab` for the glass-tint** — NEVER the in-srgb `--surface-tint-*` brand fence (AW.W26).
7. **Gate EXTEND-in-place** — `proof:no-gray` gains G7, no new gate, no new KEY; G1-G6 + the
   KEEP-NEUTRAL byte-asserts + the AA re-ratify arms untouched.
8. **Compositor-only / PRM-carved / Safari** — the chassis re-point touches only `background`
   (paint, not layout); the worm is transform+scale+opacity+filter (the shipped recipe), PRM snaps
   + drops the goo, `@supports (filter: url(#x))`-gated with the plain-worm floor, static filter
   (WebKit #184601 cleared).

---

## Sources read (in-repo, HEAD)

- `docs/tranches/BD/union/waves/W-PAGER-GOO-MORPH.md` + `viz/goo-morph/BUILD-SPEC.md` (the worm
  mechanism, shipped).
- `docs/tranches/BD/union/waves/W-GLASS-ABROGATE-GRAY.md` (the `--card`/saturate keystone, landed).
- `src/components/custom/pager-dots/{PagerDots.vue, useWormMorph.ts, pagerWindow.ts}` (the dot rail
  + worm + windowing oracle).
- `src/components/custom/deck/{DeckPager.vue, composables/useDeck.ts, useDeckSpring.ts}` (the deck
  substrate — distinct from embla; DeckPager wraps PagerDots).
- `src/components/ui/carousel/{CarouselPager.vue, GlassCarouselPager.vue, useCarousel.ts}` (the
  embla carousel + chevron pagers + the `.glass-pager-ring` counter).
- `src/styles/glass/surfaces.css:360` (`.glass-pager-ring` — THE OPEN HOLE, raw `--glass-bg-floating`).
- `src/styles/glass/ladder.css` (the element-level oklab tint seam — the correct pattern) +
  `src/styles/menu.css` (the menu-row, same seam) + `src/styles/dock/morph-bridge.css` (the goo trick).
- `src/styles/tokens/glass.css` (`--glass-bg-*` compose, `--glass-saturate-*`, `--glass-bg-dock`) +
  `color-radius.css` / `dark-arm.css` / `light-dark.css` (`--card` warmed) +
  `scheme-motion.css` (`--spring-*` + `--spring-deck`/`--spring-bouncy` clocks).
- `scripts/proof-no-gray.mjs` (the WARM_PLATE_FLOOR G1-G6 gate to extend with G7).
