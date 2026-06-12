# BA.W-PAGER — the unified pager-dots register in a glass ring (carousel + deck, ONE primitive)

**Name**: W-PAGER - PagerDots + the glass pager chassis (the R10-1 ring + the R10-3 deck-dots fold)
**Opens after**: BA Batch 5 (runs ‖ W-ICON-CHIP — disjoint bounds); depends Batch 1 landed (the ring is glass-floating — it composites over the rebuilt registers; never opaque `bg-card`)
**Agents**: 1
**Hard gate**: `proof:pager-ring` (born-RED) — the dots are encapsulated in the glass-floating ring, the counter pill is OFF opaque `bg-card` (the dark-slab class dead), `<PagerDots>` ships with the carousel as consumer #1 and the slides DeckPager adopt-path as #2 (the ≥2 bar by construction) — plus the π both-modes readback + the `proof:ba-gestalt` verdict on `/navigation/carousel`.
**Status**: SPEC

## Goal criterion

ONE pager register: a glass pill chassis that hosts counter, arrows, and dots as one
encapsulated control (the R10-1 "encapsulated in a ring like the other"), and ONE
`<PagerDots>` primitive that the carousel ships and the slides deck adopts — the same
dots that already share an oracle stop being two implementations.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

Grounding: `audit/fleet/r10-carousel-pager.md` + `audit/fleet/r10-deck-boundary.md`
(read both WHOLE — they CONCUR on the unified register) + `ground/R10-01-carousel-dots-no-ring.png`
+ `fleet/r10-carousel-pager-{light,dark}.png`. The user (R10-1/R10-3, binding): "The
carousel dots should be encapsulated in a ring like the other." / "first class side
deck dots… though within reason — some of those facilities should be left to slides
repo."

The live-proven anatomy (BA invariant 3):

1. **The asymmetry is a two-component split.** `/navigation/carousel`
   (`demo/stories/navigation/carousel.vue:69-72`) composes bare `<CarouselPager>` +
   `<CarouselDots>`: the counter span sits in a ring (`CarouselPager.vue:75-81` —
   `rounded-pill border border-border bg-card px-3 py-1`), the dots row has NO
   surface at all (`CarouselDots.vue:39-65` — bg/border/shadow/radius all none,
   live-confirmed).
2. **The counter's ring is the WRONG material.** Opaque `bg-card` — light
   `rgb(251,250,249)`, dark `rgb(28,25,23)` = the ground capture's dark slab (the
   no-gray offender class). The house's correct "controls in a glass pill" idiom
   already exists: the DockRail chip recipe (`dock/rail-extend.css:234-249` —
   `--glass-bg-floating` + `--glass-blur-floating` + `--glass-edge-light`/
   `--glass-specular` + `.dark` arm + `--radius-pill`) and the dock collapsed pill
   (`morph.css:281`).
3. **The carousel dots and the slides DeckPager are ALREADY one register.**
   `CarouselDots.vue:68` header: "Re-authored against the slides DeckPager oracle";
   `slides/src/deck/DeckPager.vue:115-138` — both 24px hit-box / 6px pip /
   `--foreground 52%` inactive / elongate-on-active; `DeckPager.vue:14` already
   names "the eventual `@mkbabb/glass-ui/deck <DeckPager>` generalizes this."
   Divergences are PRESETS: the active-fill token (`--foreground` vs `--ncsu-red`)
   and the `--deck-pager-fit` windowing rung — presets-in-consumers by construction.
4. **A third pager silhouette** (bare `‹ › « »`, no counter/ring) lives at
   `carousel.vue:113` — reconciles onto the chassis.
5. **The boundary (r10-deck-boundary, binding the R10-3 "within reason")**: deck DOTS
   + the ring host = FIRST-CLASS here; the slide chassis/stage/scale-fit =
   SLIDES-LOCAL (router/export-coupled, 1 repo); the page-turn + headless `useDeck`
   core = stay BOOK'd on the deck-subpath 2-repo trigger (W-CLOSE re-stamp, already
   cross-linked to directional-VT). glass-ui ships NO `/deck` subpath (retired
   AY.W-CLOSE1; `.glass-progress-rail` is a progress RAIL, not dots — do not
   conflate).

## The design (BINDING — Fable, R10)

**`<PagerDots>`** (`src/components/custom/pager-dots/`, subpath `/pager-dots`): the
dots primitive — props `count` / `active` (v-model) / `orientation` / `windowFit?`
(the DeckPager windowing generalized; default off) / `ring?: boolean` (default
`true`). The pip anatomy is the shared oracle (24px hit-box, 6px pip, elongate-on-
active, `--pager-dot-*` tokens: active fill defaults `--foreground`, inactive 52%);
a consumer retints via the tokens (slides sets `--pager-dot-active: var(--ncsu-red)`
— presets-in-consumers).

**The glass pager CHASSIS**: the ring is the DockRail-chip recipe (glass-floating +
blur + edge-light + radius-pill — NEVER opaque `bg-card`), minted as ONE recipe
(`.glass-pager-ring`) that `<PagerDots ring>` composes AND the counter pill
re-registers onto (the `CarouselPager` counter leaves `bg-card`; the dark slab dies
in the same edit). Counter + arrows + dots can sit in one chassis or in matched
sibling rings (the demo shows the canonical composition); the third bare-arrows
silhouette at `carousel.vue:113` reconciles onto the same chassis.

**Consumers (≥2 by construction)**: the carousel (`CarouselDots` re-points/retires
onto `<PagerDots>` — clean break, MIGRATION row) + the slides DeckPager (adopts at
the BA cut via the W-CLOSE adopt book — recorded there; the slides edit itself is the
slides session's, inv-10).

## Scope

1. Mint `<PagerDots>` per the design (component + tokens + the `windowFit`
   generalization of `--deck-pager-fit`); `CarouselDots` retires onto it (clean
   break).
2. Mint `.glass-pager-ring` (the glass-floating pill chassis recipe) consumed by
   `<PagerDots ring>` AND the `CarouselPager` counter (off `bg-card`); reconcile the
   bare-arrows silhouette onto the chassis.
3. Register the `/pager-dots` subpath (the batch-resolved mirror barrel) + the api/
   types row; the carousel story (`carousel.vue`) re-composes the canonical chassis.
4. MIGRATION rows (CarouselDots retirement, the counter re-register) + the adopt-book
   note (slides DeckPager → `<PagerDots>` + `--pager-dot-active` preset — W-CLOSE
   scope 11 already pins the book; add this row there at close).
5. `proof:pager-ring` + `tests-visual/pager-ring.spec.ts` + the DELTA.

## Triumvirate Dispatch

- **Scope-reveal**: if the windowing generalization (`windowFit`) forces a
  deck-engine import (router/deck coupling leaking in), HALT — the boundary verdict
  fences the engine slides-local; triumvirate on the prop shape, never import deck
  state.
- **Ring material failure**: if the glass-floating ring cannot clear legibility over
  the carousel's image content in either mode (the counter text floor), that is a
  register tension → triumvirate (the W-DARK-MATERIAL/W-NO-GRAY rebuilt registers
  are the substrate; a local opaque fallback is the forbidden workaround).
- **Diagnostic loop**: three iterations on any composited-paint defect → halt (the
  utility-over-layer precedence class).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/pager-dots/*` | create (PagerDots.vue + index.ts + README) |
| `src/components/ui/carousel/CarouselDots.vue` | delete (retires onto PagerDots) |
| `src/components/ui/carousel/CarouselPager.vue` | modify (the counter ring re-register onto `.glass-pager-ring`) |
| `src/components/ui/carousel/index.ts` + `src/carousel.ts` | modify (the export re-cut) |
| `src/styles/glass/surfaces.css` | modify (the `.glass-pager-ring` recipe — VERIFY no Batch-4 sibling still holds this file at Batch 5; it does not: W-DEMO-AFFORDANCES's negative-predicate is Batch 6, sequenced after — record the order in PROGRESS) |
| `src/subpaths/pager-dots.ts` + `src/api/index.ts` | create/modify (the subpath + types) |
| `demo/stories/navigation/carousel.vue` | modify (the canonical chassis composition; the third silhouette reconciles) |
| `scripts/proof-pager-ring.mjs` + `tests-visual/pager-ring.spec.ts` | create |
| `package.json` + `scripts/gates.mjs` | modify (append-own-row) |
| `MIGRATION.md` | modify |
| `docs/tranches/BA/audit/visual/W-PAGER-DELTA.md` | create |

Do NOT touch: the slides tree (the DeckPager adopt is the slides session's, via the
W-CLOSE book); the dock rail-extend.css chip recipe (READ as the model, never edited
here); `embla`/Carousel primitives beyond the pager pair; the deck-progress
`.glass-progress-rail` (a different primitive); GL shaders; ppmycota purple.

### Disjointness

One agent. Across Batch 5: W-ICON-CHIP writes icon-chip/* + its demo collapses —
no shared path. The one watched file (`glass/surfaces.css`) is sequenced (Batch 4
siblings landed; W-DEMO-AFFORDANCES's Batch-6 negative-predicate edit comes after).

## Hard Gate

`proof:pager-ring` (born-RED) + the π (`tests-visual/pager-ring.spec.ts`):

1. **W1 — the dots are ringed.** π: on `/navigation/carousel` the dots row's host
   computes a translucent glass plate (`background-color` α in (0.05, 0.95),
   `backdrop-filter` non-none, radius pill) — RED at HEAD (all none/0).
2. **W2 — the counter is off `bg-card`.** Source + π: `CarouselPager.vue` no longer
   composes `bg-card`; the counter plate computes translucent in BOTH modes (the
   dark `rgb(28,25,23)` slab dead). RED at HEAD (`CarouselPager.vue:75-81`).
3. **W3 — ONE register.** Source: `CarouselDots.vue` GONE; `<PagerDots>` +
   `.glass-pager-ring` exist; the ring recipe is composed by BOTH the dots host and
   the counter (one recipe, two consumers — grep-positive); the `--pager-dot-*`
   preset tokens declared. **Anti-evasion**: a survivor `CarouselDots` import
   anywhere in src/ or demo/ reds.
4. **W4 — the consumer truth.** The subpath publishes (`verify-export-types` probe);
   the adopt-book row for the slides DeckPager is authored (the 2nd consumer's
   named path); the MIGRATION rows present.
5. **The gestalt verdict (BA invariant 4)**: `/navigation/carousel` whole-page BOTH
   modes — the pager reads as ONE encapsulated glass control; recorded at W-REFLECT2.

## Commit Plan

- `feat(pager)!: <PagerDots> + the glass pager ring — carousel dots encapsulated, the counter off bg-card, the deck-dots register unified (BA.W-PAGER)`
