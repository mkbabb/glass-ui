# BD.W-DOCK-CORE — the CORE liquid dock FIXED + GENERALIZED (iOS-27)

**Band:** BD / dock-core refine.
**Status:** SPEC (born-RED gate sketched).
**Build-spec:** `docs/tranches/BD/viz/refine/dock-core/BUILD-SPEC.md` (the exact token/recipe
changes, files+lines, before/after, acceptance, gate impact, a11y/PRM/Safari rules).
**Research:** `research-root-cause.md` (live), `research-target.md` (SOTA north star),
`research-mechanism.md` (the token map).

## Mandate (verbatim defects A1–A13)

The CORE liquid dock animation DOES NOT WORK PROPERLY and must be fixed + GENERALIZED.
A1 broken rail in both shell docks · A2 proper shrunken states + longer hover window ·
A3 docks grow-from-right, must grow/shrink from CENTRE · A4 blur far too extreme/long ·
A5 shrunken icons not aligned · A6 icon bounces out-of-sync + right-to-left, must be SYNCED +
inertia FROM CENTRE · A7 dropdown recolors ENTIRE dock (bug) · A8 popover trigger misaligned +
differs from dropdown — UNIFY · A10 /dock/dock-gallery: none smooth/no inertia/no grow-shrink/
docks DO NOT SPLIT/tab-bar is TWO docks in one (make it ONE dock + our TABS, no real names) ·
A11 vertical pill ugly + pills need BIGGER PADDING · A12 dock items not DRAGGABLE · A13 (BIG)
GENERALIZE: morph V/H + SPLITTABLE into arbitrary parts (grab item → morphs + goos → new dock
beside/above/below; the iOS demos). Engine 100% / assembly 0% — WIRE the shipped
`useDockFission`/`DockGooFilter`/`fission-bridge.css`. All animations smooth/gooey/inertial/
audacious, NOT tight/springy, ios27-tuned, morph-more-on-move. MUST work on SAFARI.

## North star

design.md six-layer Liquid Glass composite · BA.W-NO-GRAY warm-chroma floor (glass is warm
MATERIAL, never gray) · W-DARK-MATERIAL dark arm · [[feedback-liquid-weight-universal]]
(inertia/weight/bounce/squish on ALL motion). NO legacy, idiomatic, gestalt, compositor-only,
PRM-carved, Safari-compatible. NO quick workarounds.

## The build (three structural moves — see BUILD-SPEC for exact lines)

- **MOVE I — the WEIGHTY center-out morph register.** Re-tune the `dock` SPRING_PRESETS row
  `{0.32, 0.7}` → `{0.56, 0.58}` (slow inertial, audacious overshoot ~+11%; regen re-emits
  `--spring-dock` + `--spring-dock-duration ≈ 0.78s`; `MORPH_SETTLE_MS` → 840). `transform-origin:
  center` both axes (`layers.css:88,137,148`) + a root re-center `translate` so the box grows
  symmetrically center-out on ANY container. Dial the self-blur 3px→1.25px + front-load its decay
  to clear by expand-t 0.5 (`morph.css:79-80`). Re-key the child stagger SYMMETRIC about center +
  swap the `translateY` rise for a center-coupled `scale` (`layers.css:337-375`). Center the
  collapsed persistent glyph both axes (A5). `collapseDelay` 2500→3600 (A2).
- **MOVE II — wire the shipped fission engine into a first-class `<GlassDock split>`.** Mount
  `<DockGooFilter>` ONCE at shell root. Add the opt-in `splittable`/`splitContext`/`splitPlacement`
  prop surface → `useDockFission` (the box-INVIOLATE consuming seam). Draggable dock items (the
  drag IS the split gesture, morph-more-on-move; A12). Remove the broken `mode="facets"` rail from
  both shell docks (A1). Rebuild the gallery TabBar as ONE `<GlassDock>` + `<SegmentedTabs>` +
  in-dock "+", generic labels, a REAL split demo (A10).
- **MOVE III — surface/trigger/recolor hygiene.** DELETE the `:has([data-state="open"])`
  whole-plate recolor (A7). Unify the dock overlay-trigger family — ONE `.dock-trigger` recipe +
  a new `DockPopoverTrigger`, hover-scale off on all (A8). Raise the pill padding tokens (A11).
  Mint the warm-chromatic dock ink `--glass-tint-ink-dock: oklch(from var(--foreground) 0.42 0.05 h)`
  + re-point `morph.css:427` + lift `--glass-opacity-dock` 0.42→0.50 + the dark §2c twin (the
  dock-specific gray → warm-material darken).

## Fences

NO re-fork / no-dual-path · NO gray (warm-chromatic dock ink) · token-first · compositor-only ·
PRM-carved · Safari-compatible · §2c per-mode lockstep (dark AA 12% FROZEN) · presets-in-consumers
· NO legacy · box-INVIOLATE (fission beside the morph engine, never editing `dockMorphContext`/
`DOCK_SPRING`).

---

## THE GATE — `proof:no-gray` EXTENDED IN PLACE + the binding π (`tests-visual/dock-core.spec.ts`)

Two arms, BOTH born-RED on HEAD: the SOURCE arm (the dock-plate-with-tint gray hole — the gate
NEVER applied the `:where(.glass-dock)` self-engage tint, so the gray dock sailed past) and the
binding π (the live paint — center-out morph + warm plate + the fission goo neck on Safari).

### Arm A — `proof:no-gray` source extension (device-free, `ci`; NO new gate, NO new KEY)

Add to `scripts/proof-no-gray.mjs` (reuse the existing `composite` + oklab `mix` + `rgbToOklab`
helpers the dark-tint witnesses use; reuse `WARM_PLATE_FLOOR = 0.01`, `WARM_HUE_LO = 45`,
`WARM_HUE_HI = 85` — no new const). The hole: the gate composites `--card` over the page at the
content rungs but NEVER applies the dock self-engage tint-toward-ink mix, so the dock's gray
plate (C0.0075 at the 20% AA engage) is invisible to every existing witness.

```js
// BD.W-DOCK-CORE — the DOCK self-engaged plate (the gray hole). Composite --card@dockAlpha
// over the page, THEN oklab-mix toward the DOCK tint ink at the AA ceiling — the literal
// worst-case bright-bucket state the user sees. Born-RED on HEAD (--foreground ink → C0.0075).
const dockAlpha = Number((glassCss.match(/--glass-opacity-dock:\s*([\d.]+)/) ?? [])[1]); // 0.50 after D3
// resolve --glass-tint-ink-dock (the light arg of oklch(from var(--foreground) 0.42 0.05 h))
// via the existing relative-color resolver the dark-surface-tint witnesses use; null pre-fix.
const dockTintInk = resolveRelativeColor(
    glassFxCss, "--glass-tint-ink-dock", foregroundLightRgb,
); // → rgb of oklch(from --foreground 0.42 0.05 h); MISSING on HEAD → null → born-RED
const aaStrength = 0.20; // --glass-tint-strength-aa light

let dockPlateOk = null, dockInkOk = null;
if (cardRgb && pageRgb && dockTintInk) {
    const dockBase = composite(cardRgb, dockAlpha, pageRgb);
    const dockTinted = oklabMix(dockBase, aaStrength, dockTintInk); // the SAME oklab mix
    dockPlateOk = rgbToOklab(dockTinted);
    dockInkOk = rgbToOklab(dockTintInk);
}
facts.dockPlate = dockPlateOk
    ? { L: +dockPlateOk.L.toFixed(4), C: +dockPlateOk.C.toFixed(4), H: +dockPlateOk.H.toFixed(1) }
    : null;

// W1 — the self-engaged dock plate composites WARM (not the near-black-ink gray darken).
add(
    "dock-plate-warm-at-aa-engage",
    dockPlateOk !== null && dockPlateOk.C >= WARM_PLATE_FLOOR &&
        dockPlateOk.H >= WARM_HUE_LO && dockPlateOk.H <= WARM_HUE_HI,
    `the self-engaged dock plate (card@${dockAlpha} over page, oklab-tinted toward the DOCK ink @ ${aaStrength*100}% AA) composites OKLab C = ${dockPlateOk?.C.toFixed(4)} at H ${dockPlateOk?.H.toFixed(1)}° (≥ ${WARM_PLATE_FLOOR} warm). HEAD ≈ 0.0075 gray → born-RED; FIX → ≈0.0161 GREEN.`,
);
// W2 — the dock tint INK is warm-CHROMATIC (anti-regress: a revert of D2 → --glass-tint-ink reds).
add(
    "dock-tint-ink-is-warm-chromatic",
    dockInkOk !== null && dockInkOk.C >= 0.030 &&
        dockInkOk.H >= WARM_HUE_LO && dockInkOk.H <= WARM_HUE_HI,
    `the dock tint ink (--glass-tint-ink-dock) carries OKLab C = ${dockInkOk?.C.toFixed(4)} at H ${dockInkOk?.H.toFixed(1)}° (≥ 0.030 chromatic — NOT the near-black --foreground C0.0062). Born-RED if D2 reverts.`,
);
// W3 — morph.css reads the DOCK ink, not the global tint ink (anti-regress source assert).
const morphCss = read("src/styles/dock/morph.css");
add(
    "dock-self-engage-reads-dock-ink",
    /:where\(\.glass-dock\)[\s\S]*?--glass-tint-source:\s*var\(--glass-tint-ink-dock\)/.test(morphCss),
    "the :where(.glass-dock) self-engage re-points --glass-tint-source onto --glass-tint-ink-dock (the warm-chromatic dock ink), NOT the global --glass-tint-ink (which darkens to gray).",
);
// W4 — the §2c dark lockstep twin is present.
add(
    "dock-tint-ink-dark-lockstep",
    /--glass-tint-ink-dock:\s*oklch\(from var\(--foreground\)/.test(read("src/styles/tokens/dark-arm.css")),
    "the dark arm declares its own --glass-tint-ink-dock (the §2c per-mode pair — the dark dock lifts toward warm-luminous cream).",
);
```

**Born-RED on HEAD:** `--glass-tint-ink-dock` does not exist (→ `dockTintInk` null → W1/W2 RED),
`morph.css` reads `--glass-tint-ink` (W3 RED), the dark twin is absent (W4 RED). **GREEN after
the fix:** dock plate C ≈ 0.0161 warm at H 61.9° (W1), ink C ≈ 0.05 (W2), morph.css reads the
dock ink (W3), dark twin present (W4).

### Arm B — the binding π (`tests-visual/dock-core.spec.ts`, LOCAL real-GPU, both modes, rides W-REFLECT3)

The source floor can NEVER substitute for the paint. The π is the binding truth — born-RED on
the current defects:

1. **DC-WARM (A7 + the warm ink):** navigate `/dock/overview` over a BRIGHT backdrop (set
   `--glass-backdrop-luma` high or place over the aurora so the clamp lerps to the AA ceiling).
   `getComputedStyle(".glass-dock").backgroundColor` → `parseOklab` → assert H ∈ [45,85], C ≥
   0.010 light / 0.008 dark, BOTH modes. THEN open a dock-hosted `<DropdownMenu>` and assert the
   dock plate `backgroundColor` is UNCHANGED (A7 — born-RED on HEAD: the `:has([data-state=open])`
   recolor flips 44%α→80.8%α; FIX → invariant).
2. **DC-CENTER (A3):** capture the collapse→expand morph frame-series on a LEFT-ANCHORED dock
   (the bottom shell or a gallery tile). Assert the box CENTROID is STABLE across the series
   (|center_t − center_settled| ≤ 2px every frame) — born-RED on HEAD (the left edge pins, the
   right edge sweeps, centroid drifts ~50px+).
3. **DC-WEIGHT (M1/A6):** sample `--dock-morph-t` across the morph — assert it OVERSHOOTS PAST
   1.0 (peak ≥ 1.08) then settles, over a clock ≥ 0.6s (born-RED on HEAD's tight 0.32 register
   peaking ~1.046 over ~0.28s). Assert the children's reveal is SYNCED — at any frame, the
   center children's opacity ≥ the edge children's (center-out, NOT right-to-left; born-RED on
   the index cascade where leftmost leads).
4. **DC-BLUR (A4):** sample the dock root `filter` across the morph — assert the blur peak ≤
   1.25px AND blur reaches 0 by expand-t ≤ 0.5 (born-RED on HEAD's 3px peak lingering past
   expand-t 0.5 to ~230ms). At REST assert `filter: none`/0px.
5. **DC-FISSION (A13/F2-F5):** on the split demo, assert REST = one pill (one
   `.glass-dock` silhouette, `[data-fissioning]` absent), then `split()` and assert a piece
   DETACHES (its `--neck-t` > 0, `[data-fissioning]` present) and the goo neck PAINTS (a
   non-transparent pixel in the inter-piece gap — the metaball bridge). **Run the SAME assertion
   on the Safari/WebKit project** (F5 — the regular `filter:url()` goo paints on WebKit; born-RED
   if fission is unwired → `gooFilter:0, fissionEls:0` per RESEARCH-1 A13). Merge and assert the
   gold splash fires (`[data-merging]` + a gold pixel at convergence).
6. **DC-PILL (A11/S3-S4):** assert the collapsed dock is 1:1 (|w − h| ≤ 2px, both orientations)
   and the vertical pill carries the raised inline pad (painted plate inset ≥ the new pad floor).
7. **DC-PRM (M6/F7):** under `prefers-reduced-motion: reduce`, assert ONE paint per state (no
   in-between transform/blur/neck frames — the morph + fission snap to endpoint, the fade survives).

The π is LOCAL-only (a real browser + demo + GPU), enrolled in the `--run pi` runner, backstopped
on CI by `proof:live-verified-ledger`. The whole-page gestalt rides the `proof:ba-gestalt` dock
verdict (re-earned on a FRESH capture at W-REFLECT3, BOTH modes, Chromium AND Safari 26).

## MIGRATION

None for the public library surface that changes behavior silently: the spring re-tune + center-out
+ blur dial-back + warm ink are internal identity evolution (presets-in-consumers). The `split`
prop surface is ADDITIVE default-off. The `:has([data-state=open])` recolor, the broken facets
rail, the hand-rolled TabBar plates, the `translateY` stagger rise, and the index-cascade onsets
are CLEAN BREAKS (no alias — MEMORY no-backwards-compat). `DockPopoverTrigger` is a NEW export.
`DockDropdownTrigger`'s hover-scale drops onto the shared no-scale `.dock-trigger` register (a
visual unify, no prop break). The demo shell + gallery edits are demo-private.
