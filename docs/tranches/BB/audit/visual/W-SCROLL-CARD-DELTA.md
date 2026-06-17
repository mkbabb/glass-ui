# W-SCROLL-CARD — DELTA (the scroll-shrink card family + the scoped-slot `:slotted()` fix + the scroll-driven header-bg + the `<ScrollCard>` family)

## Freshness headers (AZ-form)

| field | value |
|---|---|
| capture date | 2026-06-17 |
| branch | `tranche/BB` |
| tranche-base commit | `58c1d080` |
| gate | `proof:no-layout-animation` (the device-free SOURCE arm, extended with the W4 `:slotted()` clause) |
| gate runner | `node scripts/proof-no-layout-animation.mjs` |
| measurement tool | node 26.0.0 (the device-free source scan); the binding live CLS + π frame-pairs ride W-REFLECT3 (Batch 7) over the production `vite preview` |
| demo surface | `/display/card` — the `card-shrink-host` (`<CardHeader shrink>`) + the NEW `scroll-card-host` (`<ScrollCard>`/`<ScrollCardHeader>`) sections |

## Re-ground drift (the §0 mandatory re-grep found the wave's premises STALE)

The spec's "born-RED at HEAD" premises for **Defect B (the A'-3 layout-animation, CLS 1.03)** are STALE. Re-grep at `58c1d080` found:

- **W-CARD-COMPOSITE has ALREADY LANDED** (the spec ABSORBS it; a prior/sibling agent landed the CLS arm). At HEAD the gate `proof:no-layout-animation` EXISTS (`scripts/proof-no-layout-animation.mjs`), is registered in `gates.mjs:413-418` (tags `["ci"]`) AND `package.json:600`, and is GREEN — `CardHeader.vue` is ALREADY compositor-safe (the three lanes animate `translateY`/`scale`/`scaleY+opacity`, NOT `padding`/`font-size`/`grid-template-rows`). The `CardHeader.vue:110-141` four-reflow-property premise no longer holds.
- **CardHeader ALREADY used `:deep([data-slot])`** (NOT `:slotted()`) to reach the slotted content — the W-CARD-COMPOSITE minimal stopgap for ITS lanes 2+3 (recorded verbatim in the PROGRESS W-CARD-COMPOSITE row: "the minimal in-bound enabler `:deep([data-slot=…])` applied so MY lanes 2+3 bind; the broader slot-match work (scroll-driven header bg + ScrollCard family) stays W-SCROLL-CARD's scope").
- **The live `/display/card` scroll-shrink demo surface ALREADY exists** (`card.vue:434-487`, `data-testid="card-shrink-host"`) — added by W-CARD-COMPOSITE.

So W-SCROLL-CARD's genuine, still-owed scope (per the explicit W-CARD-COMPOSITE handoff) is the **broader slot-match work**, and that is what this wave executed:

1. **The `:slotted()` re-target (W4 — the precise idiom over the `:deep()` sledgehammer).** The §Scope explicitly forbids `:deep` ("no `:deep` sledgehammer where `:slotted()` is the precise tool"). The two text lanes re-target from `.card-header--shrink > :deep([data-slot="card-title"])` → `.card-header--shrink > :slotted([data-slot="card-title"])` (and the description twin) — the EXACT idiom `MetricRow.vue:284-285` already speaks. `:slotted()` targets content the PARENT passed into `<slot/>` (the precise contract for a slotted `<CardTitle>`), without the descendant-leak of `:deep()`.
2. **The scroll-driven header-bg lift (A4 — lane 4).** HEAD had a STATIC `background: var(--card-header-bg)`. Replaced with a `::before` BACKPLATE fading `opacity: 0 → 1` on the same `--card-scroll` timeline — a stuck header reads transparent at scroll-top and lifts to the painted tint as it sticks. `opacity` is the compositor-safe channel.
3. **The `<ScrollCard>`/`<ScrollCardHeader>` family** — the first-class scroll-shrink card.

## Gate — born-RED → GREEN (the W4 `:slotted()` clause; this wave's genuine architectural arm)

The layout-animation arm (W1/W2/W3) was born-RED→GREEN at W-CARD-COMPOSITE (10 reflow-set hits → `violations: []`, 37 keyframes scanned). THIS wave adds the W4 `:slotted()` source-companion clause + its self-test bite; the W4 born-RED→GREEN is proven against the HEAD CardHeader:

**Born-RED (HEAD `:deep([data-slot])` form):**
```
HEAD W4 facts: {"usesSlotted":false,"noBareDirectChild":true,"noDeepDataSlot":false}
HEAD W4 pass:  false   (born-RED — noDeepDataSlot=false because HEAD uses :deep([data-slot]))
```

**GREEN (close `:slotted([data-slot])` form):**
```
CLOSE W4 facts: {"usesSlotted":true,"noBareDirectChild":true,"noDeepDataSlot":true}
CLOSE W4 pass:  true
checks: [(W1-no-layout-animation,True),(W2-self-test-bite,True),(W3-inventory-complete,True),
         (W4-slotted-source-assert,True),(W4-slotted-self-test-bite,True)]
[proof:no-layout-animation] LOCKED — 38 keyframes scanned, 0 layout-property animations
  (the reflow set is forbidden; 4 named CLS-bounded reclaim(s) allowlisted).
```

The W4 self-test bite (anti-evasion): the scoped-slot detector flags a synthetic bare `> [data-slot]` AND a synthetic `:deep([data-slot])` selector, and passes a synthetic `:slotted([data-slot])` one — the precise-idiom partition bites every run. The keyframe count rose 37 → 38 (the new compositor-safe `card-header-bg-lift` opacity keyframe — opacity only, the gate stays GREEN).

## (5a) the CLS measure — the layout-animation already killed (W-CARD-COMPOSITE), preserved here

The A'-3 CLS arm landed at W-CARD-COMPOSITE: the live `/display/card` shrink demo reads CLS=0 over the 0..120px sweep (both modes); the prior layout-property animation forced ~84% more per-frame reflow (20.6ms vs 11.2ms / 60 frames). This wave does NOT regress it — the W1/W2/W3 gate arms stay GREEN; the lane-4 backplate animates only `opacity` (compositor-safe). The binding re-measure over the production preview rides W-REFLECT3.

## (5b) the SCOPED-SLOT proof — the `:slotted()` fix's binding visual truth

- **At HEAD (`:deep`):** the choreography bound, but via the descendant-reaching `:deep()` sledgehammer (which would leak onto unrelated nested cards). The §Scope forbids it.
- **At close (`:slotted`):** the title-font + description-fade lanes MATCH the consumer-SLOTTED `<CardTitle>`/`<CardDescription>` via the precise Vue slotted-content selector — the slotted title shrinks IN PLACE as the host scrolls (the lane-2 `scale(--card-title-shrink-ratio)`, transform-origin leading edge), the description fades + scaleY-collapses (lane 3). The binding frame-pair (slotted title frozen at the start rung at scroll-top → shrunk at 120px) rides W-REFLECT3's live capture over `data-testid="card-shrink-title"` + `scroll-card-title`.

## (5c) choreography-reads-identically — the mechanism changed, the gestalt did not

The header compresses (lane 1 `translateY`), the title shrinks in place (lane 2 `scale`), the description fades + retires (lane 3 `opacity`+`scaleY`), and the header background lifts (lane 4 `::before` opacity). All compositor-safe; the 3-lane gestalt the consumer reads is identical to the original layout-animating choreography, plus the new sticky-header bg lift.

## (5d) the `<ScrollCard>` family capture

`<ScrollCard>` owns the `.card-scroll-host` scroll-port + the `--card-scroll` timeline internally (no consumer `class="card-scroll-host overflow-auto"`); `<ScrollCardHeader>` is the LARGER-header-items hero-rung header — the slotted `<CardTitle>` rests at `--type-display-1` (φ², ~2.6rem) and shrinks via the SAME `card-*-shrink` lanes (NO second keyframe set, NO parallel scroll engine). The demo surface is `data-testid="scroll-card-host"` at `/display/card`. The speedtest WV1 `CardHeader variant="hero"` + `card-scroll-host` composition interim retires onto this family (speedtest's `^4.1.0` consume — OUT of this wave's bounds, the by-name ask delivered).

## (5e) the gate logs

Born-RED (W4): `noDeepDataSlot:false` (HEAD `:deep`). GREEN-at-close: `{usesSlotted:true, noBareDirectChild:true, noDeepDataSlot:true}` + `violations: []` (38 keyframes scanned). The artefact is `.cache/gates/BB-no-layout-animation.json` (now carries the `slottedSource` facts).

## (5f) AZ-form freshness headers

Above (capture date + tranche-base commit + measurement tool/version).

## W6 — the `proof:ba-gestalt` card-band verdict (booked to W-REFLECT3)

The whole-page card-band gestalt capture (both modes, mobile + desktop, over the real backdrop — "does the scroll-shrink card read as ONE coherent, alive facility — the header compressing, the title shrinking on a real slotted title, the family first-class?") rides W-REFLECT3 (Batch 7), the single authorized gestalt-verdict-flipper. The per-mechanism W1-W4 greens do NOT close the visual wave alone (the AZ source-green/visually-broken close-class); the binding live π is W-REFLECT3's.

## Files written

- `src/components/ui/card/CardHeader.vue` — `:deep([data-slot])` → `:slotted([data-slot])` (W4) + the lane-4 scroll-driven `::before` header-bg lift + the `z-index` slot stacking + the doc-comment reconcile.
- `src/components/ui/card/ScrollCard.vue` — created (the family root: a `<Card>` + the internal `.card-scroll-host` scroll-port; `ScrollCardProps`).
- `src/components/ui/card/ScrollCardHeader.vue` — created (the hero-rung larger-header variant composing `<CardHeader shrink>`; `ScrollCardHeaderProps`).
- `src/components/ui/card/index.ts` — export `ScrollCard`/`ScrollCardHeader` + prop types.
- `src/api/index.ts` — publish `ScrollCardProps`/`ScrollCardHeaderProps` to the discovery layer.
- `scripts/proof-no-layout-animation.mjs` — extended with the W4 `:slotted()` source-companion clause + its self-test bite + the `slottedSource` artefact facts.
- `demo/stories/display/card.vue` — the `<ScrollCard>` family demo section.
