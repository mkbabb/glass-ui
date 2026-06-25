# Lens B — the CORE liquid dock, greenfield (CROSS-ENGINE / PERF-FIRST)

> Lens: design for FLAWLESS Chrome **and** Safari + performance. The meatball/liquid
> motion must be perfect on WebKit (static SVG goo, sRGB, no `backdrop-filter:url`,
> compositor-only, `@supports`/PRM). Favour the simplest mechanism that hits the bar
> (KISS); GPU-only where it is a viz; offscreen-pause. DEFT union with the shipped
> GlassDock + the dock-core refine — keep what live-verifies, RE-INVENT only what
> still reproduces broken.

---

## 0. The live re-verification I actually ran (default-to-BROKEN, real gesture)

Chrome via chrome-devtools-mcp, `http://localhost:5173/dock/overview`, 1440×900, both
modes. I reproduced the **real hover→collapse→expand** gesture (synthetic pointerenter/
leave driving the REAL `useDockState` collapseDelay, NOT a class toggle) and sampled the
dock geometry + `--dock-root-scale` + computed `scale` EVERY animation frame.

| Item | JUDGE-3 said | What I measured LIVE | Verdict |
|---|---|---|---|
| **A3 grow-from-centre** | cxExcursion 0 → PASS | cx held 765→766 (excursion 1px) across the morph — **cx IS pinned** | the cx-metric is GREEN… |
| **but the MORPH ITSELF** | (not measured) | **collapse onset paints the dock at `w 2452px` (left −447 → right 1978) for ~2 frames** — `--dock-root-scale` resolves to `scale: 55.72 1` | **FAIL — the still-broken gestalt** |
| A7 dropdown recolor | PASS | plate bg byte-identical before/after open (`changed:false`) | PASS (keep) |
| A8 trigger unify | PASS | 3 `.dock-trigger`, byte-identical geometry | PASS (keep) |
| Warm-cream both modes | PASS | light `srgb .944/.903/.865`, dark `srgb .350/.295/.249` (R>G>B) | PASS (keep) |
| A12 draggable items | PASS | 4 `[data-dock-draggable]`, `useDockItemDrag` real (`--stretch`, reorder-on-settle) | PASS (keep) |
| A5 collapsed align | PASS | collapsed = clean warm circle, Home glyph centred | PASS (keep) |

**The decisive find — the cardinal mechanism-vs-gestalt trap reproduced.** JUDGE-3 measured
*cx-excursion* (centre stays put) and declared grow-from-centre fixed. It is — the centre
**is** pinned. But it never measured **width excursion**. On collapse, the box reserves the
small settled `to` footprint (`--dock-root-morph-to: 4.02px`) and the live ratio is
`from/to = 224/4.02 = 55.7`, so `--dock-root-scale` resolves to **55.7** and the box
`scaleX(55.7)`s to **2452px** — a one-to-two-frame **flash across the entire screen**,
centred (so cx never moves) but violently wide. The user sees the pill detonate sideways
every time it collapses. *That* is "still broken."

### Root cause (source-traced, `src/styles/dock/layers.css:129-160`)
```css
--dock-root-scale: max(
    calc(var(--dock-root-ratio) + (1 - var(--dock-root-ratio)) * var(--dock-morph-t, 0)),
    0.06   /* ← FLOOR only. No CEILING. */
);
```
The `max(…, 0.06)` floor protects against `scaleX→0` (the BC.W-LIQUID-MORPH white-void
defect). But on **collapse** the ratio is `from/to` ≈ 55 (large→small), and there is **no
upper clamp**, so for the frames before the spring `t` rises the box `scaleX`es to 55× its
reserved 4px footprint = 2452px. The reserve is layout-correct (4px), but the *transform*
escapes the footprint entirely — a paint that ignores the clip. JUDGE-2/3's whole A3
analysis (re-centre translate vs scaleX-from-centre) is correct **for the centre**; the bug
is one axis over — the **magnitude**, not the **anchor**.

It is also INTERMITTENT (a stale-measurement race: when `to` is measured tiny while the box
is still wide, ratio spikes) — which is exactly why a single static capture or a synchronous
poll can miss it, and why "judge reproduces the real gesture, default-to-broken" is the law.

---

## 1. The core idea — **the dock morph is a SCALE-BOUNDED “liquid gate”, never an unbounded ratio**

The shipped engine is 90% right and I keep almost all of it (warm material, cx-pinned
centre-origin, unified triggers, invariant plate, real draggable items, the weighty
`--spring-dock` 0.68/0.64/0.66s register). The morph’s *gestalt* breaks on ONE structural
flaw: it drives the visible size by an **unbounded `from/to` ratio** that can explode. The
greenfield move is to stop morphing by a *ratio* and morph by a **bounded, perceptually-
even scale envelope** — a “liquid gate” that opens/closes between the two real endpoints
with the size *interpolated in pixel space*, then expressed as a scale that is **clamped to
the physically-possible range `[to/from, from/to]` on BOTH ends**. The box can never paint
larger than its own expanded width or smaller than its collapsed pill. The flash is
impossible by construction, not by a lucky measurement.

Concretely, three deft moves over the extant CSS (no re-fork, no new engine):

### Move 1 — bound the scale envelope (kills the 2452px flash, the headline)
Replace the unbounded ratio-lerp with a **size-space lerp → bounded scale**. Keep the
reserved-footprint trick (one layout solve), but compute the live size in px and divide:

```css
/* live size lerps in PIXEL space between the two MEASURED endpoints */
--dock-root-live: calc(
    var(--dock-root-morph-from) +
    (var(--dock-root-morph-to) - var(--dock-root-morph-from)) * var(--dock-morph-t, 0)
);
/* the visible scale = live ÷ reserved-footprint, CLAMPED to the achievable band.
   on collapse the band ceiling is from/to; on expand it is 1. clamp() bounds BOTH. */
--dock-root-scale: clamp(
    0.06,                                            /* floor — no white void */
    calc(var(--dock-root-live) / max(var(--dock-root-morph-to), 1px)),
    calc(var(--dock-root-morph-from) / max(var(--dock-root-morph-to), 1px))  /* ceiling = the real expanded ratio, never beyond */
);
```
Because the live size is a *pixel lerp between the two real endpoints*, it can never exceed
`from` (the largest real size). The `clamp` ceiling is belt-and-braces against a stale `to`.
The flash cannot occur: the worst a degenerate measurement does is paint the *expanded*
width for a frame — invisible, because that is where the box already is. This is the
single boldest, simplest fix and it is the whole headline defect.

### Move 2 — a single SETTLE-GATED guard against stale measurement (the intermittency)
The race (tiny `to` measured while box is wide) is real. Rather than chase it in JS, gate
the morph paint on a **measurement-valid flag**: the orchestrator (`dockMorphContext.ts`)
already arms `--dock-root-morph-{from,to}` inline; add a one-line invariant — if
`abs(from − to) < 8px` OR either is unset, the `[data-morphing]` rule’s `var()` falls
through to `scale: 1` (the inert at-rest path the file already documents). A degenerate
frame paints the resting box, not a 55× explosion. This is the existing fallback-less-`var()`
discipline (`layers.css:104-108` already relies on it) extended to the magnitude case.

### Move 3 — perceptually-even opening (the LIQUID-WEIGHT feel, not just safety)
A raw `live/to` scale opens linearly in *size* but the eye reads *area*. Drive the inner
content reveal off a **`--dock-gate-t`** = the spring `--dock-morph-t` shaped by the existing
`--spring-dock` `linear()` (already weighty, +7.3% overshoot), but couple the inner
`.dock-layers` scaleX and the per-child center-out stagger to the **same** `--dock-gate-t`
so the plate, the icons, and the gate open as ONE mass with ONE inertia. This is already
~90% wired (the I.4 symmetric stagger, the `--child-reveal` ramp) — the move is to make the
ROOT gate and the INNER reveal read the *identical* shaped scalar so nothing desyncs (A6).
No new spring, no new clock — one `--dock-gate-t` derived from the shipped `--spring-dock`.

---

## 2. The single boldest move

**Re-frame the entire dock collapse/expand as a bounded “liquid GATE”, not a size morph —
and prove the GATE WIDTH never exceeds the expanded footprint with a born-RED π that
measures *width* excursion, not centre excursion.** The bug was never the anchor (centre is
pinned); it was an *unbounded magnitude* with a one-sided floor. By morphing in pixel space
between two measured endpoints and clamping the resulting scale to `[0.06, from/to]`, a
55×-explosion is mathematically unreachable. The gate opens warm, weighty, centre-out,
icons in lockstep — and it *cannot* flash. The audacity is in the discipline: the new gate
π fails the *current* shipped code (2452px) and passes only when the envelope is bounded —
the exact born-RED-on-HEAD bite that the cx-metric gate could never catch.

---

## 3. The rest of the surface (DEFT union — keep, refine, re-invent)

| Item | Disposition | Mechanism (all source-verified to exist) |
|---|---|---|
| A1 broken rail | **KEEP** (live-clean) | shell docks 0 hairline/facet/stack; confirm stays clean in the π regression |
| A2 hover window | **KEEP** | `useDockState.collapseDelay` (3600) + AZ hysteresis — live collapse fired patiently |
| A3 centre-pin | **KEEP** | `transform-origin: center center` (layers.css:142) — cx held 1px |
| **A3 magnitude** | **RE-INVENT** | the bounded `clamp` envelope (§1 Move 1) — the only true break |
| A4 blur | **KEEP** | self-blur peaks 1.25px, clears by t≈0.5 (measured `blur(0.7px)` mid-morph); `--glass-blur-dock` 9px calm |
| A5 collapsed align | **KEEP** | collapsed circle clean, glyph centred |
| A6 synced icons | **REFINE** | couple inner reveal to the SAME `--dock-gate-t` (§1 Move 3) so nothing desyncs at the new bounded clock |
| A7 dropdown recolor | **KEEP** | plate invariant (`changed:false` live) |
| A8 trigger unify | **KEEP** | 3× `.dock-trigger` byte-identical |
| A11 vertical pill | **KEEP** | warm capsule, generous pad (the shipped density bump) |
| A12 draggable items | **KEEP** | `useDockItemDrag` real (`--stretch`, reorder commit) |
| Warm both modes | **KEEP** | light/dark R>G>B measured warm |

> **Source-verify note (anti-invented-lever):** the brief cites `--motion-weight` /
> `--ease-cartoon-punch` as the Band-0 levers. I grepped `src/styles/` — **neither token
> exists**. The REAL weighty register is `--spring-dock` (the `dock` PRESETS row 0.68/0.64,
> emitted `--spring-dock-duration: 0.66s`, scheme-motion.css:263). I cite the real token; I
> do **not** invent the brief’s aspirational names. The cartoon-punch *quality* (anticipation
> /overshoot/follow-through) is delivered by the shipped `--spring-dock` `linear()` overshoot,
> not a phantom token.

---

## 4. Cross-engine (Chrome + Safari) + performance

- **Every channel is compositor-only**: `scale` / `transform` / `transform-origin` /
  `opacity` / a CSS `--*` calc (NOT a layout property). `proof:no-layout-animation` stays
  GREEN by construction. The `clamp()` envelope is a paint-value calc, not a transition.
- **The bounded clamp is a *win* for Safari**: WebKit composites a `scaleX(55)` layer at full
  device-pixel cost (a 2452px×2 layer at DPR2 = ~10M px buffer) — the flash is both ugly AND a
  WebKit raster spike. Clamping to `from/to` caps the layer at the expanded footprint, so
  Safari never allocates the oversized backing store. KISS = faster.
- **Goo/fission** (the A13 register, if exercised) stays the shipped `DockGooFilter` regular
  `filter:url(#dock-fission-goo)` + `color-interpolation-filters="sRGB"` + non-zero host +
  `-50%/200%` region — never `backdrop-filter:url` (WebKit bug 245510). Unchanged.
- **PRM**: the global gate strips `scale`/`transform`/`translate` → the gate snaps to
  endpoint, the fade survives, the gesture confirms. The self-blur PRM carve
  (`morph.css:494-499`) is kept. No new PRM seam.
- **Offscreen**: the morph only runs on a real gesture (hover/click); no steady-state loop,
  nothing to park. The `will-change: transform` is armed only under `[data-morphing]`.

---

## 5. The binding gate (born-RED on HEAD, the gestalt bar)

`tests-visual/dock-core.spec.ts` — extend with the **width-excursion** witness that the
cx-metric missed:

1. **`dock-morph-width-bounded`** (THE born-RED bite): drive a real hover→collapse on the
   `/dock/overview` auto-margin dock; frame-sample `getBoundingClientRect().width` every rAF
   across the morph. Assert `max(width) ≤ expandedWidth + 4px`. **Born-RED on HEAD** (current
   max 2452px); GREEN only with the bounded envelope. This is the gate JUDGE-3 lacked.
2. **`dock-morph-cx-pinned`** (anti-regress): cx excursion ≤ 4px across the morph (keep the
   shipped centre-pin honest).
3. **`dock-morph-no-stale-explosion`**: inject a degenerate `--dock-root-morph-to: 2px` while
   the box is expanded; assert the painted width stays ≤ expandedWidth (the §1 Move-2 guard).
4. **Both modes**, Chromium + (manual) Safari 26 capture — the live capture is binding, not
   the metric. Judge the gestalt AS A USER: a calm warm pill that *closes like a closing eye*,
   never a sideways detonation.

The DELTA-ASSAY (vs the 116 union waves + the dock-core refine): this is **not** a new wave —
it is a **targeted amendment to `BD.W-DOCK-CORE` Move I.2** (the A3 leg). I.2 fixed the
*anchor* (centre-origin scale, shipped + live-confirmed). This amendment fixes the *magnitude*
(bounded envelope + stale-guard + the width-excursion gate). No duplication: it edits the
same `layers.css` rule and the same `dockMorphContext` arming the refine already owns; it adds
ONE clamp ceiling, ONE settle-gate invariant, and ONE born-RED π. Survival of the fittest —
keep the 90% that lives, re-invent only the unbounded ratio that detonates.
