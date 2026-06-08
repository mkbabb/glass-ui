# A-prune-carousel — Prune glass-carousel (P4) + Apple-glassify the carousel (P5)

**Lane** AUDIT. **Severity** major. **Verdict** net-new-wave for P4 (the `custom/glass-carousel` excision — no
existing wave owns it) + re-open/augment **W23** for P5 (the iOS-26 liquid-pill morph the W23-complete pass
did not reach). **Cross-ref** W23 (carousel reauthor — COMPLETE), W19 (primitive prune A), W18 (storybook IA),
W42 (liquid-morph substrate), R-apple-liquid (the SOTA recipe).

---

## TL;DR

Two asks, two dispositions:

- **P4 (remove glass-carousel)** — there is a TWO-COMPONENT carousel surface in the tree: the `ui/carousel/`
  embla family (the canonical `<Carousel>`/`CarouselDots`/`GlassCarouselPager` — the surviving one) and a
  SEPARATE `custom/glass-carousel/` scroll-overflow composite (`GlassCarousel`/`GlassCarouselItem`/
  `useGlassCarousel`). P4 prunes the LATTER. It has **exactly ONE consumer** (its own demo story) and **zero
  sibling-repo consumers**. **NO existing wave owns this deletion** — W19 is "primitive prune A" but scoped to
  header-ribbon/glyph-face/disco-glyph; W18 explicitly does NOT delete prune-wave rows. → **net-new-wave**
  (or fold into W19's prune-A scope as a 4th excision).

- **P5 (Apple-glassify the carousel)** — **W23 already shipped** the glass-atoms restyle (dot-rail contrast
  fix + `.glass-wash` chrome + four-state + `--spring-dock`), per the DeckPager dot-rail oracle. But the
  pass-2 ask pivots to the **iOS-26 liquid-pill indicator** (a single morphing glass body, NOT discrete
  dots) + **`.interactiveSpring` drag-follow** + elastic overscroll — which W23-complete did NOT reach.
  R-apple-liquid routed P5 to "augment W23," but W23 is `complete`. → **re-open W23 (live-pending) OR a
  W23b** for the liquid-pill upgrade, consuming the W42 morph substrate.

**The cardinal cross-wave contradiction:** W23 (complete) SPENT a fold glass-atomizing `custom/glass-carousel`
(`F5_carouselChromeGlassAtoms` — moved the shell onto `.glass-wash`, gave `GlassCarouselItem` a four-state
contract, re-pointed the springs). P4 now wants that EXACT component DELETED. The convergence must record this
so the prune wave does not "preserve" W23's just-landed restyle, and so the effort is recognized as superseded.

---

## P4 — the glass-carousel prune (net-new, full source audit)

### The two carousels (do not conflate)

`grep` confirms TWO distinct carousel surfaces:

1. **`src/components/ui/carousel/`** — the canonical embla-backed family: `Carousel`, `CarouselContent`,
   `CarouselDots`, `CarouselItem`, `CarouselNext`, `CarouselPager`, `CarouselPrevious`, `GlassCarouselPager`,
   `useCarousel`, `CarouselApi`. Published via the `@mkbabb/glass-ui/carousel` subpath (`src/carousel.ts`).
   **This is the SURVIVING carousel** (P5's target). The `/navigation/carousel` story mounts it.

2. **`src/components/custom/glass-carousel/`** — a SEPARATE scroll-overflow composite: `GlassCarousel.vue`,
   `GlassCarouselItem.vue`, `useGlassCarousel.ts` (+ `UseGlassCarouselOptions`). Published via the
   `@mkbabb/glass-ui/glass-carousel` subpath (`src/subpaths/glass-carousel.ts`). **This is P4's target.** The
   `/navigation/glass-carousel` story mounts it.

Note: `GlassCarouselPager` lives in `ui/carousel/` (NOT in `custom/glass-carousel/`) — it is a separate
audacious-pager primitive on the `/carousel` subpath, consumed by the glass-carousel story but ALSO part of
the surviving carousel family. **It must NOT be deleted by the P4 prune** (it survives with the embla family).

### Consumer census — glass-carousel is single-consumer (demo-only)

The ONLY binary consumer of `GlassCarousel`/`GlassCarouselItem`/`useGlassCarousel` is its own demo story
`demo/stories/navigation/glass-carousel.vue`. There are **zero** consumers in:
- `src/` (no other src file imports the custom/glass-carousel barrel),
- `~/Programming/slides/src` (grep clean),
- `~/Programming/muster/src` (grep clean).

This fails the overfitting bar exactly the way W19's three primitives did (J invariant 10 / L invariant 8 —
substrate-without-consumer; "has a demo story" is not "≥2 binary consumers"). **The `useGlassCarousel`
scroll-overflow + collapse logic has no second consumer** — it is a one-off the speedtest-era story exercised.

### The full excision FileBound (mirrors W19's surgical sweep)

A clean P4 prune touches:

| Surface | Action |
|---|---|
| `src/components/custom/glass-carousel/` (whole dir: GlassCarousel.vue, GlassCarouselItem.vue, useGlassCarousel.ts, index.ts) | **DELETE** |
| `src/subpaths/glass-carousel.ts` | **DELETE** (the `vite.library.ts` glob auto-drops the chunk) |
| `package.json` `./glass-carousel` exports block (`:296-298`) + `typesVersions['*']['glass-carousel']` (`:49-50`) | **DELETE** |
| `src/index.ts` — the cherry-pick-rationale comment mentions `glass-carousel` as a vueuse-bearing internal (`:67`) | trim the comment reference (NOT on the root barrel — verify no export line) |
| `demo/stories/navigation/glass-carousel.vue` | **DELETE** (the sole consumer) |
| `demo/stories/manifest.ts` `:168` (`s("navigation","glass-carousel",…)`) | **DELETE the row** (per W18's export→row coupling: the wave that ships the export removal drops the row) |
| `scripts/proof-storybook-ia.mjs:54` — the `glass-carousel` slug in the navigation cohort | **DELETE the slug** |
| `src/api/index.ts` | verify-only — no glass-carousel type re-export (grep clean; `GlassCarousel*` not on `/api`) |

**OUT of bounds:** `src/components/ui/carousel/` (the surviving embla family + `GlassCarouselPager` — P5's
target, NEVER touched by P4); the `@mkbabb/glass-ui/carousel` subpath (`src/carousel.ts` — survives);
`CarouselDots.vue` (W23-owned, survives).

### Caveat — the glass-carousel story is the W23 live-audit surface

W23's HardGate names `/navigation/glass-carousel` as a binding live-audit viewport ("a live Playwright pass
over `/navigation/carousel` AND `/navigation/glass-carousel`"). Deleting the glass-carousel story removes one
of W23's two audit surfaces. **Sequence:** P4 must land AFTER W23's live audit is captured (W23 is already
complete, so this is moot — but the prune wave should note the W23 paired-π capture is historical, not a live
re-audit target). The W23 audit json (`W23-carousel-indicator.json:53-54,79`) records the now-superseded
glass-carousel restyle — annotate it as superseded-by-P4, do not silently orphan it.

---

## P5 — Apple-glassify the surviving carousel (re-open W23 / W23b)

### What W23 already shipped (COMPLETE — do not re-do)

W23 (`audit/W23-carousel-indicator.json`, status complete) re-authored `CarouselDots.vue` from the slides
DeckPager oracle: inactive dots = `color-mix(in srgb, var(--foreground) 52%, transparent)` (4.788 dark /
3.525 light, both ≥3:1), active emphasis = a REAL emitted scoped `.carousel-dot[data-active]::before`
width/height elongation morph on `--spring-dock`, `.tap-squish` + `.focus-ring`, 24×24 hit target. This is a
SOLID dot-rail — the contrast/dead-class/four-state defects are GONE. **P5 does not re-litigate any of this.**

### What W23 did NOT reach — the iOS-26 liquid-pill idiom (the pass-2 P5 delta)

Per R-apple-liquid §4, the pass-2 Apple-SOTA carousel idiom is:

- **A liquid-pill page-indicator** — the dots are **a single glass body** where the active dot
  stretches/morphs (the iOS-26 "dots quietly morphing into Search" idiom is the SAME liquid-pill substrate),
  NOT N discrete elongating-`::before` dots. W23's dot rail is the right CONTRAST/affordance substrate but
  is still discrete-dots, not a unified morphing pill.
- **Slide-to-slide on the `.interactiveSpring` gesture-follow register** — drag tracks the finger (Apple
  `.interactiveSpring()` ≈ response 0.15s, ζ 0.86, blendDuration 0.25 → glass-ui's between-`--spring-snappy`-
  and-`--spring-dock` register), settling on snappy. W23's `useGlassCarousel`/`CarouselDots` motion is
  click-to-scroll + size-FLIP on `--spring-dock`, NOT a drag-follow gesture register.
- **Elastic overscroll squish** at the edges (the `interactive()` warp-on-grab idiom).

### The gestalt P5 fix (consumes W42, not a per-component hack)

R-apple-liquid §4/§5 is explicit: the cross-element fusion (dots ↔ Search, the liquid-pill morph) is a
**W42 `useLiquidMorph`/`MorphGroup` CONSUMER**, not a bespoke carousel animation. The decision boundary:
self-reshape → single-scalar spring (the pill elongation); element-to-element/route → View-Transitions named
element. The W42 substrate (`useLiquidMorph(elRef)` + `--morph-t` + `MorphGroup`) is planned; the carousel
liquid-pill indicator is named as a W42 FIRST CONSUMER alongside the tabs indicator. **P5 is: re-author
`CarouselDots` (again) onto the W42 liquid-pill substrate + add the `.interactiveSpring` drag-follow register
to `useCarousel`/the embla gesture path.**

### Disposition — re-open W23 (live-pending) OR mint W23b

W23 is `complete`; R-apple-liquid said "augment W23." But augmenting a complete wave is the exact AX cardinal
failure (`A-session-soundness`: "complete" was inflated). Two clean options:

1. **Re-open W23 → live-pending**, add a P5/liquid-pill SCOPE block + FileBound (`CarouselDots.vue` liquid-pill
   re-author + `useCarousel.ts` interactiveSpring drag-follow), dependsOn W42. This keeps the carousel work in
   ONE wave but contradicts "W23 is done."
2. **Mint W23b (carousel liquid-pill upgrade)** as a W42 consumer — the cleaner record: W23 fixed the
   defects (contrast/dead-class/four-state); W23b is the NET-NEW Apple-liquid aesthetic upgrade on the W42
   substrate. dependsOn W42, W23, W52. **Recommended** — it does not falsify W23's complete status and it
   names the W42-consumer dependency honestly.

Either way P5 **dependsOn W42** (the morph substrate must land first — the liquid-pill is a W42 consumer, not
a re-hand-rolled animation) and **W52** (the `.glass-material` the pill body composes).

---

## DEDUP table

| Ask | Existing wave | Verdict | Why |
|---|---|---|---|
| P4 — delete `custom/glass-carousel` (dir + subpath + exports + story + manifest row + IA slug) | none (W19 is prune-A but scoped to 3 OTHER primitives; W18 does not delete prune rows) | **net-new-wave** (or fold as W19's 4th excision) | single demo consumer, zero sibling consumers — fails the overfitting bar exactly like W19's three; no wave currently owns the deletion |
| P5 — carousel dot-rail contrast/dead-class/four-state fix | **W23** | **already-fixed** | W23 complete shipped the DeckPager-oracle dot rail + `.glass-wash` chrome + four-state |
| P5 — iOS-26 liquid-pill indicator + `.interactiveSpring` drag-follow + elastic overscroll | **W23 (complete)** / W42 (substrate) | **net-new (W23b) OR re-open W23** | the pass-2 Apple-liquid delta W23-complete did not reach; a W42 CONSUMER per R-apple-liquid §4/§5 — not a bespoke animation |
| The W23 `custom/glass-carousel` chrome restyle (F5 — `.glass-wash` + four-state) | **W23** | **prune (superseded by P4)** | W23 glass-atomized the component P4 now deletes — record as superseded so the prune does not "preserve" it |

---

## Cross-wave contradiction to record (the convergence must reconcile)

W23 (complete, `W23-carousel-indicator.json` F5) spent an implementation fold glass-atomizing
`custom/glass-carousel` — moved the shell onto `.glass-wash`, gave `GlassCarouselItem` a four-state contract,
re-pointed the size-FLIP springs onto `--spring-dock`. **P4 deletes that exact component.** The prune wave
MUST:
1. delete the W23-restyled `custom/glass-carousel/` dir (NOT "preserve the W23 restyle"),
2. annotate `W23-carousel-indicator.json` F5/postFix as superseded-by-P4 (documentation honesty),
3. confirm the `/carousel` subpath + `CarouselDots` + `GlassCarouselPager` (the SURVIVING family W23 also
   touched) are UNAFFECTED — only the `custom/glass-carousel` half goes.

This is the kind of "effort on a soon-to-be-pruned surface" the convergence pass exists to catch.

---

## Recommended wave shape

- **W53 (or W19 4th-excision fold) — glass-carousel prune (P4).** net-new. Excise `custom/glass-carousel`
  dir + `/glass-carousel` subpath + package.json exports/typesVersions + the demo story + manifest row + IA
  slug; annotate W23's superseded restyle; verify the surviving `/carousel` family untouched. dependsOn: none
  hard (W23 already captured its live audit). Coordinate with W18 (the manifest row drop ships WITH this src
  change per the export→row coupling — W18 frames the surviving tree).
- **W23b (or W23 re-open) — carousel liquid-pill upgrade (P5).** net-new on the W42 substrate. Re-author
  `CarouselDots` onto the W42 liquid-pill (single morphing glass body); add `.interactiveSpring` drag-follow
  to the embla gesture path; elastic overscroll squish. dependsOn W42 (substrate), W23 (the defect-fixed
  baseline), W52 (the glass body). Pin the drag-follow register to the R-apple-liquid §2 confirmed
  `.interactiveSpring` (response 0.15s, ζ 0.86) and the settle to `--spring-snappy` (Apple snappy, bounce
  0.15) — NOT bouncy.
