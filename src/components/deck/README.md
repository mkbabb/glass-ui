# `@mkbabb/glass-ui/deck` — the windowed-sequence substrate

ONE motion engine under both the presentation deck and the carousel.

Before the fold these were two registers with one contract between them: a
headless clamped index with no rendering half, and an item-scroller with no
announcer. Between them they carried three `[data-state]` vocabularies, three
keyboard tables, two window oracles and two motion vocabularies. There is one of
each now, and `/carousel` is a component register composed over this substrate.

## The core

```ts
const deck = useDeck(slides.length, { label: (i) => slides[i].title });
```

`index` is the authority and `go()` is its only writer, so the two-authority
reconciliation class — a delta guard, an echo watcher, a mirror ref per chrome
element — cannot be written against it. `progress`, `canNext`, `canPrev`,
`stateFor(i)` and `liveMessage` are derived.

`position` and `velocity` are an **optional producer-fed** channel. A continuous
producer (a scroll-snap strip, a drag scrub) calls `feed()` and the member
projection gets a real timeline; a discrete producer never calls it, `position`
mirrors `index`, and the projection arm simply does not run. The library offers
the channel; the consumer chooses.

## Two clocks, never mixed

**Travel is inertial.** `useDeckSnap` puts the strip on the platform's own
scroll-snap: momentum, rubber-banding, trackpad and touch scrubbing and the snap
itself all come free and correct in both engines. The settled index arrives from
`scrollsnapchange`, or from one `IntersectionObserver` where that has not shipped
— never from scroll arithmetic.

**Expansion is fired**, on governed spring presets only. The authored page turn is
the travel arm for a stage that transforms rather than scrolls; it rides the
`world` preset's emitted curve, so a retune of that row retunes the turn and no
literal has to be chased.

## The rendering pair

```vue
<DeckStage :deck="deck" register="turn" fullscreen aria-label="Slides">
  <template #ground><MyGround /></template>
  <DeckSlide v-for="(s, i) in slides" :key="s.id" :index="i" :entry="s">
    <h2>{{ s.title }}</h2>
  </DeckSlide>
</DeckStage>
```

`<DeckStage>` is the letterboxed room: `position: fixed; inset: 0; margin: auto`
plus an aspect ratio gives the largest box of that ratio that fits, centred, with
no measurement. It publishes `--cqx` — one percent of its own inline size — which
is the invariant the export path rides: geometry authored in `--cqx` is the same
picture at 1280 and at 3840.

It hosts ONE ground behind every member (per-member grounds are both on screen for
the whole duration of a turn, and the seam between them is the frame that gives
the transition away), and it hosts the `aria-live` region that `liveMessage` never
had.

`<DeckSlide>` is attribute fall-through with zero DOM reach. It carries the ONE
`[data-state]` vocabulary and the manifest's `dark`/`ariaLabel` flags — which live
on the entry, not the node, so reordering the sequence cannot leave a slide
wearing its neighbour's name.

## The lift boundary, redrawn

**Substrate surface**: hash sync (`useDeckHashSync`), the swipe driver
(`useDeckSwipe` — 44 px and axis dominance), edge zones (`useEdgeZones`, fine
pointer only) and the capture/settle contract (`useDeckCapture` — print, export,
freeze, live). Each is content-free, every deck needs it, and each was being
rebuilt per app.

**App policy, and it stays with the app**: a settings panel, an app shell, an
access gate, a slide registry, a build pipeline.

## The stylesheets

Optional, tokens-first, identity-free — `src/components/deck/styles/`. The
`--turn-*` contract is ten tokens; override any of them and the turn retunes with
no rule rewrite. Two details there are invisible until they are missing: the
`visibility` join (a discrete property held across the travel, so neither end of a
turn flickers) and the iOS flat-push arm, which is **not optional wherever the
turn ships** — WebKit cannot composite a `preserve-3d` element that is also a
scroll container, and without the arm the entering page flashes blank.

Every identity value belongs in the consumer's own overlay sheet over these
data-attributes. Nothing here paints one.

## Wrap is refused, not deferred

The sequence clamps. Native scroll-snap has no circular scrolling and the core
has never wrapped; `loop` died with the tween engine that was the only place it
existed. This is a named decision, not a gap.
