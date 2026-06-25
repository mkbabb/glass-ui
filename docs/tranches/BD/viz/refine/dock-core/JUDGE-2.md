# JUDGE-2 — dock-core liquid morph + generalize (BD.W-DOCK-CORE), ITERATION 2

**VERDICT: FAIL** — one verbatim headline defect (A3 grow-from-centre) STILL fails live,
and A12 (draggable items) is only partially covered. The BIG ONE (A13 split) is now
DECISIVELY fixed, and the Move-I/III hygiene (trigger-unify · recolor-kill · no-gray ·
no-broken-rail · blur dial-back) holds in both modes. But A3 — a defect the user called out
verbatim ("docks GROW FROM THE RIGHT — they MUST grow from the CENTRE") — is reproduced live
as a right-edge-pinned growth path. A harsh judge cannot pass a fix that leaves a named
verbatim motion defect visibly unfixed.

Verified LIVE on Chrome via chrome-devtools-mcp at http://localhost:5173, light + `.dark`.
getComputedStyle + frame-series + screenshots captured.

---

## BLOCKER — A3 (grow-from-centre) STILL FAILS LIVE

The collapsible overview dock's hover-expand growth path is **right-edge-anchored**, not
centre-out. Two clean frame-series captures (both modes-agnostic, the box geometry):

Collapsed: `left 731 · right 799 · cx 765 · w 68`
Expand onset (t≈101ms): `left 799 · right 877 · cx 838 · w 79`  ← **+73px cx lurch RIGHT**
Through the morph (t 101→692): **right edge PINNED at 877 every frame**, left slides
`799 → 637 → 655`, cx swings `838 → 757 → 766`.
Settled: `left 654 · right 878 · cx 766 · w 224` (centred at rest — but the PATH is not).

A true grow-from-centre holds cx≈765 constant across every frame while left and right move
symmetrically outward. Here cx makes an **81px excursion** and the right wall never moves.
The user would see the pill balloon out to the LEFT from a nailed right edge — exactly the
rejected behaviour.

### Root cause (live-traced)

`src/styles/dock/layers.css:118-132` — the center-out re-center translate:
```
.glass-dock[data-morphing]:not(.vertical) {
  --dock-root-live-size: calc(from + (to - from) * t);
  inline-size: var(--dock-root-live-size);
  translate: calc((to - live-size) / 2) 0;   /* +78px at t=0 */
}
```
This is correct for a **flow-anchored (left-edge) dock**. But the overview collapsible dock
is **centred by auto-margins** (measured `margin-left: 358px; margin-right: 358px`). For a
centred flex item the inline-size change ALREADY recenters; the extra `translate` of
`(to-live)/2` (= (224−68)/2 = **+78px** at onset) double-compensates → shoves the pill +78px
RIGHT at t=0, then unwinds to 0 as t→1. Net: a 78px rightward lurch that resolves back,
reading as right-anchored growth. cx 765→838 at onset matches (765 + 73 ≈ 838) exactly.

The build-report verified center-out at the resolved-token / forced-morph level (a
constructed from/to), which the live auto-margin centring contradicts. **Source-green,
visually-broken** — the exact close-class the gestalt bar exists to kill.

### Concrete refinement (A3)
The re-center translate must be **container-justify-aware**. Either:
1. Detect auto-margin / `justify-content: center` containers and ZERO the translate (the
   auto-margins already center; the translate is only needed for flow/left-anchored docks);
   OR
2. Anchor BOTH the inline-size reserve AND a `transform-origin: center` + drive the visible
   morph as a compositor `scaleX(--dock-morph-scale)` over the reserved settled footprint
   (the SAME mechanism `.dock-layers` already uses — `transform-origin: center center`,
   layers.css:92) on the ROOT box too, so the box scales symmetrically about its centroid
   regardless of container justify, and DROP the `inline-size`-lerp + translate pair on the
   root entirely. Option 2 is the idiomatic fix (one mechanism, container-agnostic, already
   proven on the inner layers) and removes the auto-margin double-count by construction.

The same `translate` math is on the `.vertical` arm (block axis) — verify the vertical
collapsible centre-out under the same fix (the SidebarDock is always-expanded so it does not
exercise this, but a collapsible vertical dock would).

---

## WEAK — A12 (dock items not draggable): only partially covered

`useDragMorph` is wired ONLY to the `DockLayerGroup` rail switcher (pull-to-switch-layer:
1 `.glass-drag-grabbable` on /dock/layers). The dock ICON ITEMS themselves are not draggable
on any surface (overview: 0 `.glass-drag-grabbable`, 0 `[data-dock-draggable]`,
0 `[draggable]`, 0 `.glass-drag-lift`). A12 verbatim is "the dock ITEMS are not DRAGGABLE",
and the iOS-27 vision (A13) is grab-an-item-and-pull. The rail pull-to-switch is a switcher
gesture, not draggable dock items.

### Concrete refinement (A12)
Wire the `useDragMorph` (or a `:draggable` axis) onto the dock ICON CONTROLS on at least one
nav/overview dock so a user can grab a dock item and pull/reorder it (the SegmentedTabs
`:draggable` precedent — additive, default-off, roving-tabindex preserved). Demonstrate it
live on /dock/overview or a dedicated story.

---

## PASSING — re-confirmed live this iteration

**F-1 (A13 — THE BIG ONE — the split). DECISIVELY FIXED.** /dock/dock-gallery TabBar, click
"Compose" (+): `data-fissioned` set; the island grows from the dock-box centre (`w 2→145,
h 1→44`, opacity 0→1) and flies DOWNWARD (top 424→481, below the dock at bottom 453) carrying
**3 migrated chips**; `--island-t` rises 0→**1.10** (weighty inertial overshoot) then settles
1.0; goo neck `rotate: 90deg` (aimed at island), opacity bloom 0.2→1→0.35-held;
`bridge.filter: url("#dock-fission-goo")` while fissioning. Visually confirmed — a real second
goo-bridged dock plate spawns below the source pill with content migration.

**A8 (trigger unify). PASS.** select · dropdown · popover all carry `.dock-trigger`,
byte-identical: `padding 4px 8px · border-radius 9999px · gap 4px`. All three mounted live.

**A7 (dropdown recolor). PASS.** Real reka dropdown opened (`role="menu"` present); dock
plate bg byte-identical before/after = `color(srgb 0.944 0.903 0.865 / 0.52)`. No whole-dock
recolor.

**A1 (no broken rail). PASS.** Shell docks: 0 `.dock-hairline-slot`, 0 `.dock-facet-chip`,
0 `[data-testid$="-dock-rail"]`, 0 `.dock-stack`. The /dock/rail hairline-slot is the
LEGITIMATE DockLayerGroup layer-switcher rail (by design), not the broken facets carousel.

**A5 (collapsed icon align). PASS.** Collapsed dock 59×59 (centre 30,30): summary "Home"
glyph centred at (29.5, 29.5); the other controls are `dock-layer--full`, opacity 0 /
visibility hidden / inert.

**A4 (blur dial-back). PASS.** `--glass-blur-dock: blur(9px) saturate(1.30) brightness(1.12)`
— the calm material, not the extreme over-diffusion.

**A10 (gallery). PASS.** No real names (`Mike Babb`/`You Are`/`Sagisu`/etc all false);
TabBar is ONE `<GlassDock>` with the SegmentedTabs facility (4 tabs + Compose + A/B/C),
not two docks; the split works (above).

**A11 (vertical pill). PASS.** /dock/rail vertical dock reads as a clean warm-cream rounded
pill (Home/compass/shapes/nodes) with the active item lifted as a glass tier — proper padding,
no ugly facet carousel.

**M1 (weighty spring). PASS.** `--spring-dock-duration: 0.6s`; `--spring-dock` linear()
overshoots; fission `--island-t` peaked 1.10. ios27-weighty, not tight/springy.

**S1 (no-gray, BOTH modes). PASS.**
- LIGHT dock plate composited over white: **OKLab L 0.964 · C 0.0093 · H 62.6°** — warm-amber.
- DARK (`.dark`) dock plate composited over dark: **OKLab L 0.329 · C 0.0199 · H 60.7°** —
  warm-luminous (clears the dark floor C≥0.008), backdrop `blur(9px) saturate(1.3)
  brightness(1.12)` luminosity-lift. Text readable (white glyphs over the warm translucent
  plate). NOT gray, NOT flat charcoal, in either mode.

---

## SUMMARY

| Defect | Verdict | Evidence |
|---|---|---|
| A13/F-1 split | **PASS** | island w2→145, --island-t→1.10, 3 chips migrated, goo neck 90° |
| A8 popover/dropdown unify | PASS | byte-identical .dock-trigger geometry, all mounted |
| A7 dropdown recolor | PASS | plate bg invariant on real open |
| A1 broken rail | PASS | 0 hairline/facet/rail on shells |
| A5 collapsed icon align | PASS | Home glyph centred (29.5,29.5) |
| A4 blur | PASS | 9px, calm |
| A10 gallery one-dock+tabs+split | PASS | no real names, ONE dock, split live |
| A11 vertical pill | PASS | clean warm pill |
| S1 no-gray both modes | PASS | L0.964/C0.0093 light · L0.329/C0.0199 dark, warm |
| M1 weighty spring | PASS | 0.6s, overshoot 1.10 |
| **A3 grow-from-centre** | **FAIL** | right edge PINNED 877px, cx lurches +73px right at onset |
| A12 draggable ITEMS | WEAK | only rail switcher draggable; icon items 0 draggable |

The fix is ~90% there and the headline split is genuinely impressive. But A3 is a verbatim
named motion defect the user already rejected once, and it reproduces decisively in the live
paint. **Not passing** until the centre-out growth path holds cx constant on the real
auto-margin-centred docks (the container-justify-aware translate / scaleX-from-centre fix),
and A12 wires draggable onto the dock ITEMS (not just the rail switcher).
