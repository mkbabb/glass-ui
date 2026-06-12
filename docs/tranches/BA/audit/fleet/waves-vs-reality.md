# LANE: waves-vs-reality — the AZ roster CLAIMS vs the LIVE truth at HEAD

Probed :5199 (dark mode primary, the flagged R8 register) at 1440×900. HEAD is
`e217c3d1` (a BA-fleet commit; the published content is AZ-close 3.13.0). Each AZ wave
marked `live-verified`/`complete` in `docs/tranches/AZ/PROGRESS.md` was spot-probed against
its headline claim. Evidence pngs in `fleet/waves-vs-reality/`.

## Verdict table (the 30+ live-verified/complete AZ rows)

| Wave | Status claimed | Live verdict | Evidence |
|---|---|---|---|
| W-RAIL3 | live-verified | **BROKEN** (caused R8-9 + R8-1) | the in-dock DockLayerGroup DELETED from both shell docks → no section model; floating rail detached |
| W-BLOB-STUDIO | live-verified | **BROKEN** (R8-7) | configurator slider tracks collapse to 0px width at DESKTOP |
| W-BLOB-REDRESS | live-verified | **BROKEN** (R8-7) | claimed M1 grid-collapse fix; the collapse is LIVE at 1440px (fix was coarse-only) |
| W-SHELL-CONFIG | live-verified | **BROKEN** (R8-3) | gear Dark-mode row is a plain `<Switch>` desynced from `html.dark`, does not flip |
| R4-SHELL | live-verified | **ERODED** (R8-3) | "dark-at-TOP" shipped the wrong control (Switch, not DarkModeToggle) |
| W-MOTION2 | live-verified | **ERODED** (R8-16/R8-17) | picker rebuilt ok; the "▶ Play family" control clips ▶+text in a 40px circle; flat-grey on dark |
| W-HIERARCHY | live-verified | **ERODED** (R8-4) | the 3-token vocab minted in the Configurator PRIMITIVE; the aurora studio HAND-AUTHORS its chrome → bypasses it |
| W-DOCK-RAIL | live-verified | **ERODED** (R8-1) | the hairline-rail register HOLDS on /dock/layers; but the SHELL rail floats DETACHED off the divider seam |
| W-RAIL-EXTEND / R4-RAIL | live-verified | **ERODED** (R8-1/R8-6) | `contain:paint` on the dock still clips a scaled in-pill hover plate; the rail seat is wrong |
| W-DOCK-NORMALIZE | complete | **ERODED** (R8-9) | nav-pattern (home-left + separators) present, but the user's SECTION model (rail core + sections + nav) is absent |
| W-DOCK-CONTEXT | live-verified | **ERODED** (R8-1) | the route→facet resolver works; its RENDER (the floating rail) is the R8-1 defect |
| W-SUFFUSE | live-verified | **HOLDS-as-scoped** (R8-15 gap) | display register correctly gated to `variant="hero"`; ~104/121 routes flat near-black BY the wave's own D4-2 scope |
| W-REGISTER-IOS | live-verified | **HOLDS** | no interactive dock state paints `--viz-fourier`; active = warm-ink, accent = oklab luma-lift |
| W-MORPH-SHOWCASE | live-verified | **HOLDS** (R8-2 coverage gap) | V↔H morph intact on the showcase story; the user wants it IN the shell docks (unmet directive, not erosion) |
| W-BLOB-PAGE | live-verified | not re-probed (GL fence) | (the watercolor/satellite surface; R8-7 is the STUDIO not the page) |
| W-ADAPTIVE-AUTO | live-verified | **partial concern** | the light-backdrop self-engage is the design; the DARK register (bg L6% vs card L10%) is the flat-read root |

## The headline erosions (root-caused)

### 1. W-RAIL3 destroyed the dock section model (R8-9) — the close-then-regress headline
`demo/layout/BottomDock.vue` + `demo/layout/SidebarDock.vue`: the R6-redress wave
(`live-verified`) DELETED the in-dock `<DockLayerGroup>` from BOTH shell docks to fix a
box-inflation defect (the group inflated the horizontal dock ~2× / ~3 rows). The
contextual facets re-homed onto a FLOATING `<DockRail>` carousel OUTSIDE the box. Net
effect: the bottom dock is now ONE undifferentiated run — `[menu] | ‹ › | « »` — with
only divider hairlines, no rail-core / sections / nav-arrows three-zone gestalt. The user
(R8-9): "the docks now COMPLETELY lack sections." The fix threw the gestalt away with the
render target. `BottomDock.vue:190-196` (the deletion comment), `SidebarDock.vue:261-270`.
Evidence: `bottom-dock-dark.png`, `sidebar-dock-dark.png`.

### 2. The blob studio sliders are INVISIBLE at desktop (R8-7) — claimed-fixed, live-broken
`ConfiguratorRow.vue:120` — `<div class="flex items-center"><slot /></div>` gives the
slotted control NO `w-full`/`flex-1`/`min-w-0`. A `LabeledSlider` roots at a plain block
`<div class="labeled-field">` (no width), so as a flex child of `flex items-center` it
collapses to **width 0**, and the inner `.glass-slider w-full` resolves `w-full` of a
0-width box → 0. LIVE at 1440px: 32 slider elements present, EVERY track `width:0`,
`visible:false`. The "Interaction" section renders Attraction / Click impulse /
Responsiveness as LABELS WITH NO CONTROLS — exactly R8-7. W-BLOB-REDRESS claimed M1
root-fixed in `Configurator.vue` but scoped the fix to the 390px coarse viewport; the
collapse is live at the DEFAULT desktop width. Aurora's configurator does NOT collapse (it
hand-authors different chrome), proving this is the `ConfiguratorRow`+`LabeledField`
flex-min-width path. Evidence: `blob-configurator-sliders-collapsed-dark.png`,
`blob-studio-dark.png`.

### 3. The gear Dark-mode toggle is wrong AND non-functional (R8-3)
`demo/configurator/PresetEditor.vue:188` — `<Switch v-model="darkModel" />`; `darkModel`
binds `cfg.effective("dark")` / `cfg.setField("dark", …)` (a config-store field), NOT the
global dark toggle. LIVE: the page is dark (`html.dark` present) yet the switch reads
`unchecked` (desynced); clicking it does NOT flip `html.dark`. And the control is a plain
Switch, not the animated `DarkModeToggle` sun/moon the user asked for. W-SHELL-CONFIG /
R4-SHELL both shipped this and the user rejected it in R8-3. Evidence in probe transcript.

### 4. The curve-gallery "Play family" control clips (R8-17)
`demo/stories/motion/curve-gallery.vue:184-190` — a `btn-pill ... px-4 py-2` button whose
inner content is `▶ Play family`, but it resolves to **40×40** at runtime, so the glyph +
text overflow/clip — the "amorphous white blob + clipped triangle + Play colliding" the
user named. On the W-MOTION2 surface (`live-verified`). Evidence:
`ground/R8-17-play-button.png`, `curve-gallery-dark.png`.

### 5. The rail SEAT is detached, not at the divider (R8-1)
Both shell rails (`.dock-hairline-extend`) float DISCONNECTED — the SidebarDock rail chips
sit at the column's vertical midpoint joined by a thin line (NOT at the ℱ-separator seam),
the BottomDock rail floats ~44px ABOVE the dock box (rail y≈759, dock y≈833). The user
(R8-1): anchor on the dock's OWN divider seam; overrun BOTH sides. The W-DOCK-RAIL hairline
register itself HOLDS on the `/dock/layers` STORY (floored 16px icons, thin column), so the
defect is the SHELL seat/geometry, not the primitive. Evidence: `rail-seat-bottom-dark.png`.

### 6. The dock `contain:paint` clips in-pill hover plates (R8-6)
Every `.glass-dock` carries `contain:paint` with only 6px vertical padding around 40px
controls in a 55px box. A scaled hover plate (`--scale-hover-dock`) on an in-pill control
is clipped at the dock edge by the paint containment — the R4-RAIL root cause
(`contain:paint` clips ANY dock child) was patched only for the RAIL (sibling escape),
never for the in-pill hover plate. The round hover plate is "partially cut off."

## The cross-cutting DARK-REGISTER root (R8-11/12/13/15/19)
Not an AZ-wave erosion per se, but the mechanical cause of the dark-register flatness
cluster: `--background: hsl(24 8% 6%)` vs `--card: hsl(24 8% 10%)` — only 4% L apart. Glass
cards barely separate from the page; the 5-rung ladder (glass-wash→overlay) is
near-indistinguishable on dark; ~104/121 routes are flat near-black with no procedural
substrate. The glass blur ladder (resting 12px / floating 16px) is unmodified (R8-19
un-addressed). These are NET-NEW BA-tranche directives the AZ close did not touch.

## What HOLDS (the close that survived)
- **W-REGISTER-IOS** (de-red): no interactive dock register paints brand-red; active = ink,
  accent = oklab luminance-lift, wordmark white-on-dark. Clean.
- **W-MORPH-SHOWCASE**: the V↔H morph is intact on its showcase story (the user's R8-2 is a
  COVERAGE request — put it in the shell docks — not a regression).
- **W-DOCK-RAIL** hairline register on the `/dock/layers` STORY (floored icons, thin column).
- **W-SUFFUSE** as-scoped: the display register is correctly gated to `variant="hero"`; the
  flat-page breadth is the wave's own acknowledged D4-2 out-of-scope (~104/121).

## The close-then-regress pattern (the tranche-formation signal)
The erosions cluster on the LATE corrective waves (R-series + W-RAIL3) that fixed one
defect by deleting the structure another claim depended on:
- W-RAIL3 fixed box-inflation by DELETING the section model → R8-9.
- W-BLOB-REDRESS fixed the coarse 390px collapse but left the desktop collapse → R8-7.
- W-SHELL-CONFIG/R4-SHELL "moved dark-at-TOP" but shipped a desynced Switch → R8-3.
The pattern: a corrective targeted the narrow reported symptom and the live, full-viewport,
gestalt truth was never re-walked. The `live-verified` token was awarded on a scoped capture
(coarse-only, story-only, or source-diff) that did not match the user's actual surface.
