# AS.W7 · WAVE-1 · Cluster A5 — SCROLL + DRAG (D3, D9)

Read-only diagnosis. Each defect is grounded at `file:line` with a live-DOM
proof and a precise fix spec for Wave 2 — the exact change, not the edit.

Live verification ran against the demo dev server (`:5173`) via Playwright:
real pointer-drag on the sortable rows + computed-style readback on the ghost,
and a full scroll-chain audit on `/compositions/hero` at 1440×900, 1440×700,
and the default viewport.

---

## D9 — golden drag ring is square, ignores the item's border-radius

### Root cause

Two cooperating surfaces — both library:

- `src/components/custom/sortable-list/SortableList.vue:118-119` — the gold ring
  is the FIRST layer of the `.sortable-drag-ghost` box-shadow stack:
  `box-shadow: 0 0 0 2px var(--color-gold), …`. A `0 0 0 2px` (zero-blur,
  2px-spread) box-shadow ring renders as an outline that follows the
  `border-radius` of *the element the shadow is set on* — here the ghost root.
- `src/composables/sortable/useSortable.ts:304` — `createGhost` builds the ghost
  by `source.cloneNode(true)` where `source` is the **SortableItem root**
  (`elements.get(id)`, registered at `SortableItem.vue:36` `:ref="binding.ref"`).
  The gold ring therefore traces the SortableItem root's corner radius — NOT the
  radius of whatever the consumer actually rounded.

The ring is square exactly when the consumer's SortableItem root has no radius
and the visible rounded surface is an inner child. That is the live demo case:

- `demo/stories/aurora/config/PaletteLayer.vue:49-62` — `<SortableItem as="div">`
  with **no class** → the ghost root computes `border-radius: 0px`. The visible
  rounded card (`rounded-panel`) lives on the INNER `OklchStopRow` div at
  `demo/stories/aurora/OklchStopRow.vue:42`. Result: square gold ring around a
  rounded card — the reported defect.

Contrast (proves it's structural, not a token bug):
`demo/stories/data/sortable-list.vue:107` puts `rounded-md` directly on the
SortableItem root, so its ghost ring follows the radius correctly.

### Live proof

Real pointer-drag on `/data/sortable-list` (radius-on-root case), computed style
of the live `.sortable-drag-ghost`:

```
ghost.borderRadius = "6px"
ghost.boxShadow    = "rgb(225,177,55) 0px 0px 0px 2px, …"   ← gold ring, follows the 6px radius → ROUND
```

Synthetic reproduction of the PaletteLayer structure (square wrapper, rounded
inner child), measured in-page:

```
bareWrapperRadius  = "0px"   ← ghost root in the PaletteLayer case → ring is SQUARE
innerVisibleRadius = "12px"  ← where the real corner is (the rounded child)
```

So the ring is correct when the radius is on the dragged root and square when
the radius is on an inner child. The library must not depend on the consumer
putting the radius on the exact element it clones.

### Fix spec (Wave 2) — library, robust

`src/composables/sortable/useSortable.ts` · `createGhost` (lines 299–322):
after `clone = source.cloneNode(true)` and before `document.body.appendChild`,
adopt the source's *effective visible* radius onto the ghost root so the gold
ring traces the real corner:

- Read `getComputedStyle(source).borderRadius`.
- If it resolves to `0px` (or all-zero), walk descendants (depth-first,
  `source.querySelectorAll('*')`) and take the first element whose computed
  `border-radius` is non-zero; adopt that value.
- Set `clone.style.borderRadius = <adopted value>` explicitly (an inline style
  so nothing in the cascade overrides it on the floating clone).

Net: the ghost root carries the same corner radius as the visible surface, and
the existing `box-shadow: 0 0 0 2px var(--color-gold)` ring (SortableList.vue:118)
follows it — round ring on round items, with zero per-consumer markup. No change
to the box-shadow declaration itself; the ring recipe is already correct, it was
just painting on a square element.

Before → after intent:
- before: ghost root radius = whatever the SortableItem root happens to be
  (often `0px`); gold ring square.
- after: ghost root radius = the deepest *visible* radius of the dragged
  content; gold ring traces the actual card corner.

Severity: medium (cosmetic, but it's the headline drag affordance and reads as
broken on the aurora configurator — the most visible sortable consumer).

> Note for Wave 2: this also un-breaks any future consumer that wraps a rounded
> child in a bare `<SortableItem>`. A demo-only patch (adding `rounded-panel` to
> the PaletteLayer SortableItem) would mask the same defect class everywhere
> else — fix the library, not the one call site.

---

## D3 — `/compositions/hero` does not scroll properly

### What the live audit found

The demo has **no dedicated scroll container**. The whole shell scrolls at the
document level, with a sticky full-height rail:

- `demo/layout/AppShell.vue:62` — root is `min-h-screen` (grows with content;
  no `overflow` / no height cap).
- `demo/layout/AppShell.vue:68` — `<main>` is `flex-1` with no `overflow` and no
  height bound — content sets document height.
- `demo/layout/CategoryRail.vue:28` — the left rail is
  `sticky top-0 flex h-screen` — it pins to the viewport while the document
  scrolls behind it.

Full scroll-chain probe on `/compositions/hero` (html → body → shell → wrapper →
main): every node is `overflow: visible`, `touch-action: auto`,
`overscroll-behavior: auto`. There is NO `overflow:hidden` trap, no `h-screen`
cap on `<main>`, no wheel/touch capture. Measured:

```
1440×900 : docScrollHeight 1269, clientHeight 900, maxScroll 369, heroFrame 792px, main 1203px
1440×700 : docScrollHeight  959, clientHeight 700, maxScroll 259 — window.scrollTo reaches 259.5 (bottom) ✓
```

i.e. at every viewport tested the document **is** scrollable and reaches the
bottom card. The breakage is not a hard overflow trap at HEAD — it is the
fragile document-scroll-with-sticky-`h-screen`-rail pattern:

1. The page has a single shared scroll context (the document). On hero the tall
   `hero-frame` (`py-20 md:py-28` → ~792px) plus the pinned rail and the pager
   fill the viewport, so the scroll affordance is non-obvious — the rail and
   frame appear "fixed" and the route reads as a stuck pane.
2. The same pattern is the root cause of **D12** (the rail/sidebar can't scroll
   when its own content overflows — `CategoryRail.vue:28` is `h-screen` with no
   `overflow-y`). D3 and D12 are one structural fix surface.

### Fix spec (Wave 2) — demo layout, give the content its own scroll container

Reshape the AppShell so the route content scrolls in a dedicated, viewport-bound
container independent of the rail, instead of relying on document scroll:

- `demo/layout/AppShell.vue:62` — change the root wrapper from `min-h-screen` to
  a fixed `h-screen overflow-hidden` flex row (the shell becomes the viewport
  frame; it does not itself scroll).
- `demo/layout/AppShell.vue:65` — the content column (`flex min-w-0 flex-1
  flex-col`) gets `min-h-0` so its flex child is allowed to shrink below content
  height (without `min-h-0` a flex child's `min-height:auto` blocks the scroll
  container from clamping).
- `demo/layout/AppShell.vue:68` — `<main>` becomes the scroll container:
  `flex-1 min-h-0 overflow-y-auto` (keep `min-w-0`, padding). Each route then
  scrolls inside `<main>`; the StoryPager (sibling above main) and the rail stay
  put. Add `scroll-behavior` only if desired — `router.scrollBehavior` at
  `demo/router.ts:68` returns `{ top: 0 }`, which targets `window`; switch the
  reset to scroll the `<main>` element (or rely on the per-route remount) so the
  new container resets to top on navigation.
- `demo/layout/CategoryRail.vue:28` — with the shell now `h-screen
  overflow-hidden`, the rail is already viewport-bound; to also fix D12, drop
  `sticky` (no longer needed — the shell row is fixed height) and make the rail's
  inner scrollable when its content overflows (`overflow-y-auto` + `min-h-0` on
  the rail's flex content), so the long category list scrolls within the rail.

Before → after intent:
- before: one document scroll context; sticky `h-screen` rail; hero reads as a
  stuck pane and the rail itself can't scroll (D12).
- after: shell is the fixed viewport frame; `<main>` owns route scroll; rail owns
  its own scroll. Hero scrolls cleanly inside `<main>`; the rail scrolls
  independently. Resolves D3 and D12 together.

Severity: medium (demo-surface; the route content is reachable via document
scroll today, but the pattern reads as broken and blocks D12).

> Verification note: at HEAD the document scroll *does* reach the bottom of the
> hero content at all tested viewports — Wave 2 should confirm the new `<main>`
> container scrolls and that `router.scrollBehavior` resets the new container (not
> `window`) on route change, otherwise navigation will appear to "remember" the
> prior scroll offset.

---

## Classification summary

| ID | Surface | Root cause (file:line) | Fix surface |
|----|---------|------------------------|-------------|
| D9 | LIBRARY | `useSortable.ts:304` clones the SortableItem root; `SortableList.vue:118` gold box-shadow ring follows that root's radius (often `0px` — radius is on an inner child, e.g. `PaletteLayer.vue:49` + `OklchStopRow.vue:42`) | `createGhost` adopts the source's effective visible radius onto the ghost root |
| D3 | DEMO | document-scroll-with-sticky-`h-screen`-rail; no dedicated scroll container on `<main>` (`AppShell.vue:62,68` + `CategoryRail.vue:28`) | shell `h-screen overflow-hidden`; `<main>` `min-h-0 overflow-y-auto`; rail self-scrolls (also fixes D12) |
