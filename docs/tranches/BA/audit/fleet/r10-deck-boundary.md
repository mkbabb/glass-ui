# r10-deck-boundary — the DECK-DOTS / SLIDE-COMPONENT boundary (R10-3)

Lane: the deliberate PARTIAL fold of the slides deck chassis. R10-3 verbatim — "We
should have first class side deck dots, slide component, support, though within reason
— some of those facilities should be left to slides repo — perhaps." This REVISES the
R9 blanket external-gating of the whole deck family (R9-2, the `deck-subpath` chronic).
The job is the cut: what lands in a BA wave (≥2 consumers, substrate-WITH-consumer, no
speculative API) vs what stays slides-local (router/deck-app-coupled) vs what stays
BOOK'd on the 2-repo trigger.

Anchored against the R8 fleet (do not re-derive): the `deferred-census.md:228-242`
DC-EXT-5 deck rows, the `DISPOSITION-REGISTER.json` `deck-subpath`/`directional-view-
transition` rows, `BA.W-CLOSE.md:25,84` (scope 7, already R10-3-amended), and the R9
fold accounting. Live-probed both servers (glass-ui :5210 carousel, slides :5273 deck).

---

## 1 — THE HEADLINE: the dots already converged once, against the slides oracle

glass-ui ALREADY SHIPS the dots primitive. `src/components/ui/carousel/CarouselDots.vue`
was **re-authored from first principles against the slides `DeckPager` oracle** — the
scoped-CSS header says so verbatim (`CarouselDots.vue:69-72`: "Re-authored from first
principles against the slides `DeckPager` oracle (`~/Programming/slides/src/deck/
DeckPager.vue`)") and the body lifts DeckPager's exact values: the inactive dot
`color-mix(in srgb, var(--foreground) 52%, transparent)` (DeckPager.vue:124 ↔
CarouselDots.vue:119), the 72% hover (both), the `::before`-painted-dot-in-a-24px-hit-
box (WCAG 2.5.8; both), the active ELONGATION morph, and the same `--spring-dock`/
`--spring-snappy` register. **They are the same component, divergent on exactly three
axes** — verified live, not asserted:

| axis | CarouselDots (glass-ui) | DeckPager (slides) | π readback |
|---|---|---|---|
| active FILL | `--foreground` (`rgb(232,231,227)` on dark) | `--ncsu-red` (`rgb(204,0,0)`) | live-probed both |
| elongation | `1.5rem` flat (`24px`) | `d·φ²` golden (`≈15.7px`) | both pill `radius:9999px` |
| windowing | shows ALL dots | windows to `--deck-pager-fit` @media rung (`DeckPager.vue:34-49,106-110`) | dock-allotment one-way bridge |
| RING host | bare on page (**R10-1 DEFECT**) | flush inside `.deck-dock` glass pill | see §2 |

The active-fill hue is a TOKEN (`--ncsu-red` is a deck-local presets-in-consumer); the
windowing is the only real behavioral fork. **The convergence already happened in code;
R10-3 makes it explicit and closes the R10-1 ring gap.**

---

## 2 — THE R10-1 RING is the SAME finding, NOT a separate one (coordination with r10-carousel-pager)

Live-probed the exact computed register on both surfaces:

- **glass-ui carousel** (`:5210/navigation/carousel`): `.carousel-dots` wrapper is
  `bg:rgba(0,0,0,0)`, `border:0px`, `radius:0px`, `padding:0`, `blur:none` — BARE on the
  page. The sibling counter pill (`[data-slot=carousel-pager-counter]`,
  `CarouselPager.vue:78`) is `bg:rgb(28,25,23)` (`--card`), `border:1px`, `radius:9999px`,
  `pad:4px 12px` — the encapsulating RING the user names. The dots owe that ring; the
  counter has it.
- **slides deck** (`:5273/til-briefing`): `.deck-pager` is ALSO `bg:rgba(0,0,0,0)`,
  `border:0px`, `radius:0px` — BUT it sits INSIDE `.deck-dock` (`bg:0.6α`, `border:1px`,
  `radius:9999px`, `blur(11px)`). The dock IS the ring; the dots are correctly FLUSH on it
  (`DeckPager.vue:92-96`: "FLUSH on the dock glass — no inset well; the dock owns the only
  surface"). Active dot `::before` = `rgb(204,0,0)` (`--ncsu-red`, DeckPager.vue:134).

**So the "encapsulating ring" the dots owe is the GLASS-PILL HOST.** In the deck the host
is the dock; in the carousel there is NO host, so the carousel dots float. The fix is one
register: a glass-pill ring around the dot rail when there is no ambient dock host — which
is the **carousel-pager wave's** territory. **I concur with lane r10-carousel-pager: the
carousel pager-ring and the deck dots are ONE register**; the ≥2-consumer bar is met BY
CONSTRUCTION (CarouselDots [glass-ui demo] + the deck-dots fold + the slides DeckPager
consume the same `.carousel-dot`/`--dot-*` recipe). I do not author the ring geometry
here (that is the pager lane); I name the boundary that the dots-primitive is the SHARED
artefact and the ring is its optional host-pill, not a deck-only concern.

---

## 3 — INVENTORY: the slides deck chassis (`/Users/mkbabb/Programming/slides/src/deck/`, 15 files)

| file | LOC | what it is | coupling | glass-ui sibling? |
|---|---|---|---|---|
| `DeckPager.vue` | 139 | **the dots** — dot-per-slide, active elongates to a Wolfpack pill, windows to dock-allotted `--deck-pager-fit`, focus-recovery on recompute | DOM-light (reads own `getComputedStyle` rung; `pagerWindow` is pure) | **YES — `CarouselDots.vue` is its re-auth** |
| `pagerWindow.ts` | 25 | pure DOM-free windowing fn (the dot window math) | NONE (pure, unit-tested) | NO — but trivial; rides the dots fold |
| `DeckSlide.vue` | 35 | per-slide host: renders the slide component + applies `[data-state]{active\|prev\|next}` + dark/aria via attr fall-through | Vue provide/inject (`slideContext`); manifest-coupled | partial — the `[data-state]` contract = the BOOK'd page-turn |
| `slideContext.ts` | 24 | per-slide `provide`/`inject` (index/total/active) so nested chrome reads position | Vue DI; deck-internal | NO |
| `DeckView.vue` | 402 | the ORCHESTRATOR: mounts slides, hash-sync (`location.hash`↔index), the dock chrome, edge-zone arrows, the `.deck-progress` bar, the gear, force-dark ground crossfade | router (`RouterLink`), `location.hash`, `history`, `GlassDock`, deck-app shell | NO — deck-app shell |
| `useDeckNav.ts` | 122 | input glue: keyboard + swipe + capture-modes (`?export`/`?print`/`?freeze`) + count-up wiring | DOM listeners, `document.body` class toggles, capture modes | NO — deck-app glue |
| `useDeck.ts` | 47 | **headless core**: pure reactive `index`+`progress`, `go/next/prev/first/last`, NO DOM | NONE (pure reactive) | NO (its own comment books the eventual `/deck` lift) |
| `deckKeys.ts` | 75 | keyboard map (arrows/space/digits/Home/End + focus-guard) | KeyboardEvent; deck-semantics | NO |
| `deckSpring.ts` | 61 | pins `--spring-deck` + the `deckEase` count-up TimingFunction (keyframes.js) | keyframes.js; CSS var pin | partial — `--spring-deck`=`--spring-smooth` already (deck.css:278) |
| `captureMode.ts` | 17 | `?export`/`?print`/`?freeze` URL-flag readers | `location.search`; export pipeline | NO — slides export pipeline |
| `useEdgeZones.ts` | 37 | edge-hover arm for the side arrows (fine pointer) | pointer DOM; deck chrome | NO |
| `useCountup.ts` | 70 | editorial count-up walker on the active slide (one site) | live-DOM walk; keyframes.js | YES — glass-ui ships `useCountup` (motion); slides has a fork |
| `reveal.ts` | 15 | staggered-reveal helper | CSS class; deck-local | partial — glass-ui `vReveal`/`useStaggerReveal` |
| `types.ts` | 61 | `DeckMeta`/`SlideEntry`/`DeckContent`/`DeckEntry` manifest types | none (types) | NO — deck-app manifest |
| `DeckSettings.vue` | 271 | the gear menu (theme/export/lock rows) | reka Popover portal, `useDeckUnlock`, router | the menu-ROW recipe → **already folded W-MENU-GLASS** |

CSS spine: `slides/src/styles/deck.css` (1331 lines) — owns `--turn-*` (the page-turn,
§PAGE-TURN/`:329-361`), the `.slide`/`.deck`/`.deck__ground` stage + scale-fit (`cqi`
@1280 export frame, `.deck:414-448`), the `--ncsu-red` family, the deck glass re-point
(`--glass-bg-*`/`--glass-frost`, the R9 gray seam), and the `.deck-progress`/`.deck-pager`
chrome looks. Plus `deck-theme.css` (the @utility recipes) + `Footer.vue`/`SlideFooter.vue`
(per-deck, NOT chassis).

**glass-ui's existing deck footprint** (verified): `proof:deck-progress-rail`
(`scripts/proof-deck-progress-rail.mjs`) + `src/styles/glass/progress-rail.css` ship a
**CSS-ONLY** `.glass-progress-rail` restyle over `<Progress variant="default">` — the one
deck-position primitive that cleared the bar. The `DeckProgress.vue` WRAPPER + `/deck`
subpath + the math leaf were RETIRED at AY.W-CLOSE1 (PRUNE-LEDGER R2, 0 real consumers).
**There is NO `/deck` subpath and NO `DeckProgress.vue` at HEAD** — the gate's job is to
KEEP the `/deck` name RESERVED (its arm 4: "no `src/subpaths/deck.ts`, no `./deck` export,
no `deckProgress()` math leaf").

---

## 4 — THE BOUNDARY (the "within reason" cut)

### FIRST-CLASS GLASS-UI (lands in a BA wave)

**A. The deck DOTS → fold into the carousel-pager ring wave.** The artefact ALREADY
exists (`CarouselDots.vue`, the DeckPager re-auth). The fold is NOT a net-new component —
it is (1) the R10-1 ring host-pill (the pager lane authors it), (2) generalizing the
active-FILL to a token (`--carousel-dot-active`, default `--foreground`) so a deck re-points
it to `--ncsu-red` with zero fork, and (3) lifting `pagerWindow`'s windowing into the dots
recipe (the `--carousel-dot-fit`/overflow-window behavior CarouselDots currently lacks —
DeckPager's `--deck-pager-fit` @media rung is the reference). Consumers: **CarouselDots
[glass-ui carousel demo] + the slides DeckPager [adopts the windowing + ring] = 2 by
construction; ≥2 bar MET.** Destination: **the carousel-pager ring BA wave** (the R10
amendment routes the carousel-ring + deck-dots together — `BA.W-CLOSE.md:84` R10-3 note:
"the dots fold lands as its own BA wave scope if the carousel-pager ring register unifies
with it (≥2 consumers by construction)"). This is the deliberate "first-class deck dots"
the user wants — within reason, because it is a DOTS register, not the deck engine.

### STAYS SLIDES-LOCAL (router/deck-app-coupled; the "left to slides repo" half)

**B. The slide-component CHASSIS** — `DeckView.vue` (402 LOC), `useDeckNav.ts` (hash-sync,
capture-modes, swipe/keyboard), `useEdgeZones.ts`, `deckKeys.ts`, `captureMode.ts`,
`types.ts` (the manifest). These are deck-APP machinery: router-coupled (`RouterLink`,
`location.hash`↔index two-way sync, `history.replaceState`), export-pipeline-coupled
(`?export`/`?print`/`?freeze` → PPTX/PDF), and `document.body`-class-toggling. A glass-ui
"slide component" lift here would be a speculative API (1 repo consumer; the `deck-subpath`
chronic's exact un-MET trigger). `DeckSlide.vue` + `slideContext.ts` are the slide-host
shell — they belong WITH the chassis, not the dots. **This is the "within reason — left to
slides" cut the user explicitly invited.**

**C. The `.slide`/`.deck` stage + scale-fit** (`deck.css:414-448`) — the `cqi`-@1280
export-faithful 16:9 query-container stage is the deck-engine identity. Slides-local.

### STAYS BOOK'd (the 2-repo trigger; unchanged by the dots fold)

**D. The page-turn primitive (R5-9 / DC-EXT-5).** The `[data-state]{active|prev|next}` +
`--turn-*` cast-shadow gutter (`deck.css:329-361,572-722`). The dots fold does NOT change
its calculus: the page-turn is the deck ENGINE (it drives the slide-to-slide transition,
not a dot rail), single-repo-consumer (slides), and CROSS-LINKED to `directional-view-
transition` (the `--vt-direction` JS driver, also BOOK'd) — neither fires alone
(`BA.W-CLOSE.md:84` R9 amendment). Re-stamp BOOK'd at W-CLOSE, destination named: "lifts
WHOLESALE on the deck-subpath 2-repo trigger; reference rides slides `deck.css`."

**E. The headless `useDeck` core (47 LOC).** Pure reactive index+progress, NO DOM — the
cleanest lift candidate by SHAPE, but its own header (`useDeck.ts:5-8`) books it
correctly: "Kept LOCAL until a second real consumer exists." The dots fold does NOT supply
that 2nd consumer (CarouselDots drives off `useCarousel`/embla, not `useDeck`). Stays
BOOK'd — a glass-ui `useDeck` export with 1 consumer is the substrate-without-consumer
anti-pattern (L inv-8). Re-stamp under the `deck-subpath` chronic.

### ALREADY RESOLVED (no action)

- **`useCountup` / `reveal`** — glass-ui ships `useCountup` (`/motion`, AV.W3) +
  `vReveal`/`useStaggerReveal`. The slides forks (`deck/useCountup.ts`, `reveal.ts`) are
  ADOPT candidates (slides migrates TO the library), not lift candidates. Note for the
  slides W-ADOPT, not a BA glass-ui wave.
- **The deck MENU-ROW** (`DeckSettings.vue`) — **already folded** into W-MENU-GLASS (R5-10
  gained its 2nd consumer: the library dropdown/context-menu glass defaults R8-12 mandates).
- **`--spring-deck`** — already pinned to `--spring-smooth` (`deck.css:278`); the CSS fork
  was retired. No action.
- **The `.glass-progress-rail`** — already shipped CSS-only. The slides `.deck-progress`
  bar stays slides-local (deck-pinned chrome: `position:fixed`, `env(safe-area)`,
  `--ncsu-red` fill); the `proof:deck-progress-rail` `/deck`-reserved guard is UNTOUCHED.

---

## 5 — VERDICT TABLE (the digest)

| facility | verdict | consumers | BA destination |
|---|---|---|---|
| deck DOTS (`DeckPager`/`CarouselDots`+`pagerWindow`) | **FIRST-CLASS** | CarouselDots + slides DeckPager = 2 ✓ | the carousel-pager ring wave (R10 amend) |
| the dots RING host-pill (R10-1) | **FIRST-CLASS** | carousel (bare→pill) + deck (dock host) | carousel-pager ring wave (pager lane authors) |
| slide CHASSIS (`DeckView`/`useDeckNav`/keys/edges/capture) | **SLIDES-LOCAL** | 1 repo (router/export-coupled) | none — left to slides (within reason) |
| `.slide`/`.deck` stage + scale-fit (`cqi`@1280) | **SLIDES-LOCAL** | 1 repo (deck-engine identity) | none — slides |
| page-turn (`[data-state]`+`--turn-*`, R5-9) | **BOOK'd** | 1 repo < 2 (cross-linked to directional-VT) | W-CLOSE re-stamp; deck-subpath 2-repo trigger |
| headless `useDeck` core | **BOOK'd** | 1 repo < 2 (dots don't supply #2) | W-CLOSE re-stamp; deck-subpath chronic |
| `useCountup`/`reveal`/menu-row/`--spring-deck` | **RESOLVED** | already shipped / folded | slides W-ADOPT (countup) / W-MENU-GLASS (menu) |

**The cut in one line:** the DOTS are first-class glass-ui (they already converged once,
in code, against the DeckPager oracle — R10-3 closes the ring gap + tokenizes the fill +
lifts the windowing); the deck ENGINE (chassis, stage, page-turn, headless core) stays
slides-local/BOOK'd on the un-MET 2-repo trigger. The boundary the user named ("some
facilities left to slides — perhaps") falls exactly between a reusable position-dot RAIL
and a router-coupled deck APPLICATION.

**Coordination with r10-carousel-pager: CONCUR — the carousel pager-ring and deck dots are
ONE register** (CarouselDots already cites DeckPager as its oracle; both probed structurally
identical bar the active-fill token + windowing). That lane authors the ring geometry +
the active-fill token; this lane names the dots-primitive as the shared artefact and the
ring as its optional host-pill. No contradiction.

Evidence: `r10-deck-boundary-carousel-dots.png` (the bare-dots-vs-pill defect, this dir).
