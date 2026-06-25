# JUDGE-2 — BD.W-GOO-CAROUSEL-DECK (iteration 2)

**VERDICT: FAIL (meetsBar = false).** The carousel side is now broadly acceptable (the goo
fires on a real click, warm-cream, fast, Safari-static filter, no rest slab), BUT the **DECK
side is decisively broken on the gestalt**: a permanent GRAY SLAB at rest + a flat-gray,
non-gooey morph. The deck regression alone fails the bar; the carousel's metaball merge also
reads SUBTLE (a warm tray with scalloped edges), not the dramatic blob↔meatball the user named.

Live-verified on `http://localhost:5173` (Chromium, light mode), REAL MCP click + keyboard
gestures + faithful engine-peak pins + frame-series sampling. The BUILD-REPORT-2 claims were
trusted NOTHING; every datum below is independently reproduced.

---

## 1. THE DECK GRAY SLAB AT REST — the #1 hard FAIL (the user forbids gray slabs)

`/motion/deck`, slide 1/6 "Welcome", **at rest, NOT traveling**. Live readback:

```
.deck-goo-layer  opacity: 0.5  (ALWAYS — never gated on [data-traveling])
.deck-goo-plate  opacity: 1    warm-cream  parked dead-center
.deck-goo-worm   opacity: 1
layerTraveling: false
```

The deck goo layer is `opacity: 0.5` **permanently** (`demo/stories/motion/deck.vue:175`), with
NO `[data-traveling]` gate. So the full-alpha plate + worm paint a PERSISTENT visible slab behind
every slide at rest. Composited at 0.5 over the light page, the nominally-warm-cream
(`color-mix(in oklab, var(--card), white 6%)`) plate **READS AS A FLAT DEAD GRAY/TAUPE SLAB** —
a wide gray rounded rectangle filling the stage with the cream "Welcome" panel notched inside it.

This is exactly the **"gray slab at rest"** the user forbids and BA.W-NO-GRAY exists to kill. The
gestalt is gray — the token value being nominally-warm does NOT save it; **the gestalt is the bar.**

**Asymmetry proof:** the CAROUSEL does this CORRECTLY — `.carousel-goo-layer` is `opacity: 0` at
rest (verified live), fades to `0.55` only `[data-traveling]`, so the carousel shows NO slab at
rest. The deck simply never received the same gate. BUILD-REPORT-2 §3 honestly reports the carousel
rest-opacity-0 but is SILENT on the deck rest opacity, and lists deck screenshots only at peak-neck
— hiding this defect.

---

## 2. THE DECK MORPH READS AS A FLAT GRAY BOX, NOT A GOOEY MERGE — the #2 hard FAIL

The deck goo DOES fire (lenRatio swelled `1.0 → 1.83` peak @528ms → `1.0`, the `--deck-goo-duration:
1.1s` clock), so the mechanism number passes. But the **gestalt at peak (faithful engine-pin,
lenRatio 1.83) is a flat medium-GRAY rounded rectangle with a slight rounded bump on the right
edge** — see the captured peak. There is:
- NO warm-glass quality (it is gray, not warm-cream).
- NO legible metaball blob↔meatball merge — plate + worm are the same flat fill at full alpha, so
  the threshold just yields ONE solid gray blob; the "neck/pinch" is invisible at this scale.
- NONE of the iOS-27 six-layer optical read (no edge rim, no inner catch-light, no warm tint).

A mechanism lenRatio of 1.83 passing while the surface LOOKS like a gray box is a FAIL.

---

## 3. THE CAROUSEL — works, but the merge is SUBTLE (a soft miss, not a hard fail)

Independently reproduced a REAL transition via the MCP `click` tool on "Next slide":
```
traveling: true @~2780ms   layerOpacity: 0 → 0.55
worm width: 437 → 902 (peakRatio 2.06)   worm moved 499px
scale: 1.16 / 0.862 (reciprocal volume-preserving squish — real)
plateOps mid-travel: [0,1,0.42,1,0]  (leaving 1.0 + incoming 1.0 + active-dim 0.42 = 2-mass merge)
```
- Rest: layer opacity 0 — NO slab. ✓
- Warm-cream: `oklab(0.976 0.0052 0.0126)`, chroma 0.0137, hue 67.5° — warm, not gray. ✓
- Fast: the live morph peaked at **138ms** then settled — addresses "far too SLOW." ✓
- Filter Safari-static (see §4). ✓

**The gestalt miss:** at the faithful engine peak (lenRatio 1.47, pinch 0.85, two body plates at
A/B), the carousel reads as a warm-cream "tray" with **scalloped/petal bumps** on the left + right
edges — the metaball welling IS present, but it reads as "a soft warm tray with gooey edges," NOT
the decisive "two distinct blobs welling a neck and pinching" the user's Gemini-carousel reference
implies. It is a real, warm, glassy, fast metaball — just UNDER-dramatic. On its own this is a
"refine," not a hard fail; but it does not yet DECISIVELY meet "MORPH BLOB and MEATBALL from one to
another."

---

## 4. SAFARI-SAFETY — structurally intact (the one thing fully confirmed)

`#glass-goo` live readback (both pages):
- `feGaussianBlur stdDeviation="7"` — LITERAL, `hasVar:false`. ✓ (WebKit var-blur bug 283156 absent)
- `feColorMatrix values="… 20 -9"` — static literals. ✓
- `color-interpolation-filters="sRGB"`. ✓ (WebKit linearRGB bug 136418 avoided)
- region `-50% -50% 200% 200%`. ✓
- layer uses regular `filter: url(#glass-goo)`, NOT `backdrop-filter`. ✓ (WebKit bug 245510 avoided)
- per-frame writes are transform/opacity/`--goo-t` only — the consumer never animates the filter. ✓

The Safari-broken class is structurally absent. (Note: not verified in a real WebKit engine — only
the structural facts, which is the correct device-free floor.)

## 5. DE-DUP — reasonable (NOT a fail axis)

`useWormMorph` is DELETED; `useGooMorph` is the ONE shared transition engine (pager + carousel +
deck). The carousel stays embla, the deck stays useDeck — the substrates remain DISTINCT by role
(item-scroller vs presentation register), with the goo-TRANSITION layer de-duped. This is a
defensible answer to "are they the same thing?" — shared transition, distinct substrate. Acceptable.

## 6. CONSOLE — clean

Only the 2 pre-existing unrelated warnings (TooltipProvider `<Transition>` non-element root +
useAurora deferred-init). No goo-related errors during any real transition. ✓

---

## THE SPECIFIC, CONCRETE REFINEMENTS (to pass)

1. **DECK: gate the goo layer on travel — kill the permanent gray slab (BLOCKING).** Mirror the
   carousel exactly. In `demo/stories/motion/deck.vue`:
   - `.deck-goo-layer { opacity: 0; transition: opacity var(--duration-fast) var(--ease-out); }`
   - `.deck-goo-layer[data-traveling] { opacity: var(--deck-goo-layer-opacity, 0.5); }`
   - Wire `markTraveling()` / `data-traveling` in the deck script (the carousel's `markTraveling`
     timer pattern, keyed off `--deck-goo-duration`) so the layer fades in on the `deck.index`
     watch's `travel()` and fades out a beat after settle. At rest the deck must show ZERO slab.

2. **DECK: make the morph read as WARM LIQUID GLASS, not a gray box (BLOCKING).** Even gated, the
   peak currently reads flat-gray. The deck slides have transparent backgrounds, so the goo plate
   is doing double-duty as the slide backing AND the goo — that is what flattens it to gray. Either
   (a) give the deck slide its OWN warm `glass-quiet`/`glass-floating` plate as the legible backing
   and let the goo be a TRANSIENT travel-only bridge ABOVE/behind it (so the goo is only seen
   mid-travel, like the carousel), or (b) lift the plate/worm fill to the same warm-cream
   domed-droplet `radial-gradient` the carousel worm uses (`.deck-goo-plate`/`.deck-goo-worm`
   currently use flat `background: currentColor` — the carousel uses the inner-catch-light gradient;
   the deck's flat fill is why it reads as a dead gray box). Add the inner catch-light so the bridge
   reads as a domed liquid-glass droplet, not a flat slab.

3. **CAROUSEL: make the metaball merge MORE DRAMATIC (refine).** The merge is real but subtle.
   Push the two-mass read: raise the worm peak swell so the neck wells more decisively across the
   gap, and/or lower the `girthFloor`/tune the `#glass-goo` `feGaussianBlur` blur + threshold so the
   neck PINCHES more (a thinner, more obvious neck → a clearer "two blobs merging into one" read).
   The bar is the Gemini-carousel blob↔meatball: it must read as two distinct bodies welling a neck
   and pinching, not a warm tray with wavy edges.

4. **Re-capture the deck at REST (no slab) and at peak (warm gooey merge) in BOTH light AND dark**
   as the binding proof — the current report's deck captures are peak-only and hide the rest slab.

Until the deck shows zero gray slab at rest AND its morph reads as warm liquid glass (not a gray
box), this fails the user's binding bars (no gray, glassy, gooey blob↔meatball, Safari-safe).
