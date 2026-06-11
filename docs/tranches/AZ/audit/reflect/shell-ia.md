# RE-REFLECTION (pass 2) — surface: shell-ia (the shell + demo IA)

- **Lane:** shell-ia
- **Auditor:** re-reflection auditor (AZ.W-REFLECT, second pass)
- **Date:** 2026-06-11
- **Base:** tranche/AY @ HEAD (full AZ build landed incl. the W-RAIL3 third-rail redress, committed `83ea0ef9`; the pass-1 record + its addendum committed `4a13bee4`)
- **Live target:** :5199 (isolated context `shell-ia-rerefl`, page 19); both modes; desktop 1440×900 + mobile ≈390 (UA min-width floored to 500)
- **VERDICT: PASS** — the pass-1 close-gating miss (SHELL-IA-M1, the facet-chip-over-`<h1>` collision) is INDEPENDENTLY CONFIRMED REDRESSED on its own evidence routes plus a third multi-facet route, both modes; the midline seat reads well; every other shell-IA item re-verifies live. ONE new soft observation (the duplicated facet carousel on desktop) is recorded as a NOTE/S3, not a verdict-flipping miss — it is two genuine, functional, route-tracking navigation affordances, not a bug, and per the prompt's own bar (only a load-bearing-chrome or title-band collision is a miss) it does not gate.

---

## 1. RECAPITULATION — the pass-1 record, its misses, the redress, and the fresh re-verify

### 1a. Pass-1 misses × redress evidence (re-judged this pass)

| miss | pass-1 sev | what | redress (commit) | THIS-PASS independent re-verify | status |
|---|---|---|---|---|---|
| **SHELL-IA-M1** | S2 | The vertical W-RAIL3 facet strip extended to x≈212 while the page `<h1>` started at x≈186 — a ~26px overlap clipping the title's first glyph on EVERY desktop multi-facet content route ("Buttons"→"uttons", "Spring Orchestrator"→"pring…", "Inputs" with the "I" clipped). | `83ea0ef9` — the strip re-seated to the dock's vertical MIDLINE: `.glass-dock-frame[data-has-rail].vertical .dock-hairline-slot { inset-block-start: 50%; inset-block-end: auto; translate: 0 -50% }` in `src/styles/dock/rail-extend.css`. | π readback on the SAME evidence routes + a third: `/display/buttons` h1 y∈[58,89] vs vertical strip y∈[290,352] → `h1StripOverlap:false`; `/motion/springs` h1 y∈[58,89] vs strip y∈[274,368] → `h1VertStripOverlap:false`; `/forms/inputs` DARK h1 y∈[58,89] vs strip y∈[274,368] → `h1VertStripOverlap:false`. The horizontal-axis overlap that pass-1 measured (strip.right 212 > h1.x 186) STILL holds on X, but the vertical seat now puts the strip ~200px BELOW the title band, so the boxes never co-occupy → no occlusion. Visually confirmed clean in caps rr2-01/03/04. | **DISCHARGED — CONFIRMED** |
| **SHELL-IA-M2** | S3 | The R3-15 ℱ optical-centering ±0.5px ink-mass band is provable here only structurally (the transform), not by ink-mass (a `getBoundingClientRect` proxy reads the transform, not the painted ink). | none owed — delegated to `tests-visual/shell-identity.spec.ts` π arm. | Re-confirmed structurally this pass: span transform `matrix(1, 0, 0, 1, -2.63, -3.75)`, font-size 32px, glyph "ℱ", `WONK 1 / SOFT 0`; the ℱ reads visually seated in caps rr2-08/09. The ink-mass band still reads off the π spec at close. | **RECORDED-NOT-A-DEFECT (unchanged)** |

### 1b. Every audit item on this surface × discharging wave × this-pass live re-verify

| id | the user's words (condensed) | discharging wave | this-pass LIVE re-verify | status |
|---|---|---|---|---|
| R3-4 | Gear → demo CONFIGURATOR; REMOVE composables view; REMOVE floating-config; FOLD dark toggle in | W-SHELL-CONFIG | dialog title "glass-ui demo Configurator"; `hasComposables:false`; NO floating FAB; dark toggle folded in as FIRST control (cap rr2-05) | **PASS** |
| R4-3 | Gear opens the editor with the dark toggle at the TOP | W-SHELL-CONFIG | first section "Appearance" → first control "Dark mode" ("the single chrome dark control"); then Glass level / UI scale / Reduce motion (cap rr2-05, π `firstHeading:["…Configurator","Appearance","Preset"]`) | **PASS** |
| R4-4 | Preset options = proper glassy/pill tabs/selects — no bare buttons/radios/native selects | W-SHELL-CONFIG | π: `nativeSelects:0`, `comboboxes:4` (reka), `segmentedGroups:2` (PRESET + DENSITY pills); cap rr2-05 shows segmented pills + glass comboboxes | **PASS** |
| (`,`/event open) | the keyboard/event open path survives | W-SHELL-CONFIG | `window.dispatchEvent(new CustomEvent('glass-ui-demo:toggle-configurator'))` toggled the dialog open then closed | **PASS** |
| R3-12 | The ℱ logo IS the Foundations entry (no dup compass), divider, slightly larger | W-SHELL-IDENTITY | π: ℱ glyph 32px vs 16px category glyphs; `compassDup:0`; `hasSeparatorAfterHome:true`; the Foundations CATEGORIES card featured larger (cap rr2-09) | **PASS** |
| R3-15 | ℱ NOT centered in its hover/shadow area; needs a rail | W-SHELL-IDENTITY | inner span `matrix(1,0,0,1,-2.63,-3.75)` — the non-trivial optical-center nudge; ink-mass band delegated to the π spec (M2) | **PASS** (transform present + non-trivial) |
| R3-14 / R3-2 | dock displays layers per the PAGE's context; redesign from first principles; +RAIL beyond the dock | W-DOCK-CONTEXT → W-RAIL3 | the route→facet RESOLVER (`useContextualDockLayers` + `CONTEXT_LAYER_MAP`) is route-indexed; LIVE facet mapping sensible per section — Substrates→Surfaces/Atoms, Motion→Engines/Text FX/Entrance, Forms→Text/Selection/Toggles; chip CLICK navigates (`/motion/springs`→`/motion/countup` on "Text FX") + the active highlight tracks the route (`activeChips:["Text FX"]` both strips post-nav) — the ONE-registry contract holds | **PASS** |
| R3-5 | ALL docks normalized: persistent controls for nav/home | W-DOCK-NORMALIZE | SidebarDock + BottomDock carry home-left (ℱ / category trigger) `#persistent` + `<DockSeparator>`s + nav; census scoping is canon | **PASS** (shell docks carry it) |
| R4-2 / B11 | "wtf are these other options even" / hierarchy — walk EVERY category as a first-timer | W-HIERARCHY + W-SUFFUSE + W-SHELL-CONFIG | every story page lands its title then sections at ONE rung; composables noise category DELETED; CATEGORIES grid clean 11-card directory (cap rr2-09); no oversized type screams | **PASS** |
| (suffuse) | display heroes, one-color-events, restraint | W-SUFFUSE | front-door display hero "Glass, paper, and the golden ratio." (cap rr2-08); facet/motion accents restrained; body ink untinted | **PASS** |
| R6-1/R6-2 | docks far too wide / 3 rows tall / rotated clipped label / orphan indicator | W-RAIL3 | sidebar dock box w=59 (x12→71), bottom dock 235×55 — TIGHT pills, box INVIOLATE (π `sidebarDock.w:59`); ZERO rotated/clipped labels; ZERO orphan indicator (caps rr2-01/03/04) | **PASS** |
| NOTE-1 | scroll-spy concern (programmatic scroll re-writes route) | — | not re-exercised this pass; pass-1 found no IntersectionObserver route write; clean deep-links stable (every navigation this pass was deterministic) | **PASS — not a miss for this lane** |

---

## 2. THE PERFECTION QUESTION — fresh first-time-auditor walk (the R4-2 bar)

Walked the shell as a brand-new auditor: front door (desktop + mobile), the CATEGORIES directory, three multi-facet content routes (`/display/buttons`, `/motion/springs`, `/forms/inputs`), a single-facet route (`/navigation/tabs`), the gear=Configurator, both modes.

**Reads as finished:**
- **The front door** (caps rr2-08/07) — full-bleed aurora hero, the "ℱ glass-ui" wordmark, the "Glass, paper, and the golden ratio." display hero, descriptive body, the 11-card CATEGORIES directory with Foundations featured larger (cap rr2-09). Strong, coherent first impression in both viewports.
- **The gear=Configurator** (cap rr2-05) — one coherent options dialog, dark-at-top, every row a house register (segmented pills + glass comboboxes + switches), composables-gone, FAB-gone, re-framed title + subtitle. Polished.
- **The ℱ home identity** — one demarcated, optically-nudged, slightly-larger Foundations entry; no compass dup.
- **The title band is now CLEAN on every multi-facet route, both modes** — the pass-1 "wtf" (chopped page titles behind floating chips) is GONE. The midline seat reads as the carousel riding the dock's vertical center, well clear of the title.
- **The facet carousel is a real affordance** — chips navigate and the active highlight tracks the route; a single-facet section renders NO strip (no clutter). The conditional render is correct.
- **Mobile collapses cleanly** — the vertical sidebar hides, navigation drives off the bottom dock + its single facet strip; no overlap, no clutter (caps rr2-06/07).

**The one thing a first-timer clocks (recorded as a NOTE, below):**
- On DESKTOP the SAME contextual facet carousel renders TWICE simultaneously — the vertical strip beside the SidebarDock AND a horizontal strip above the BottomDock, both showing the identical facet set (e.g. "Surfaces/Atoms", "Tokens/Type/Material", "Text/Selection/Toggles"). It is visible in every desktop multi-facet capture (rr2-01/03/04/08/09). This is a noticeable redundancy, but NOT a collision, NOT illegible, NOT broken: both are functional, route-tracking, mutually-consistent affordances (each dock surfaces the section's facets from wherever you are). Per this pass's bar it does not flip the verdict; it is logged as a candidate refinement (SHELL-IA-N1, S3).

---

## 3. MISSES + NOTES (severity-graded, evidence-anchored)

### SHELL-IA-N1 (S3 — NOTE, non-gating) — the contextual facet carousel renders TWICE on desktop
- **What:** On the desktop shell both docks mount the SAME `useContextualDockLayers` facet set via their own `<DockRail>` floating strip — the vertical strip beside the SidebarDock AND a horizontal strip above the BottomDock — so the identical chips ("Surfaces/Atoms" on Substrates, "Tokens/Type/Material" on Foundations, "Text FX/…" on Motion) appear in two places at once.
- **Evidence:** π `/display/buttons` → 2 strips, both `labels:["Surfaces","Atoms"]` (vertical x115→212 y290; horizontal x603→785 y759); `/motion/springs` → both `["Engines","Text FX","Entrance"]`, both `activeLabel:["Engines"]`; post-click both track `["Text FX"]`. Caps rr2-01, rr2-02 (bottom-dock zoom), rr2-03, rr2-04, rr2-08, rr2-09.
- **Why NOT a verdict-flipping miss:** (1) the prompt's explicit bar — "only a load-bearing-chrome or title-band collision is a miss"; this duplication collides with nothing. (2) Both strips are genuine, working, consistent navigation affordances (chip click navigates; active highlight tracks the route on both), not dead decoration or a render bug. (3) The two docks are distinct affordances by design (sidebar = category nav, bottom = story prev/next), and each surfacing the facets is a defensible "facets reachable from either dock" pattern. It IS a candidate for a future refinement (e.g. show the facet carousel on only ONE dock per viewport, or differentiate their roles), and is recorded here so the close/a successor can weigh it — but it does not gate this lane.

### SHELL-IA-M2 (S3 — recorded-not-a-defect, unchanged from pass 1)
- **What:** the R3-15 ±0.5px ink-mass band is proven here only structurally (the `matrix(…,-2.63,-3.75)` transform). The binding painted-ink-mass acceptance is the `tests-visual/shell-identity.spec.ts` π arm — a `getBoundingClientRect` proxy reflects the transform, not the ink.
- **Evidence:** span transform present + at the spec'd magnitude (32px glyph); the ℱ reads visually seated in caps rr2-08/09. No remediation owed; the close reads the band off the π spec.

**No open S1/S2 misses on this surface.**

---

## 4. CAPTURE LIST (fresh, this pass — stored beside the record under `reflect/shell-ia-png/`)

| file | route / state | viewport | mode |
|---|---|---|---|
| `rr2-01-display-buttons-desktop-light.png` | display/buttons — H1 clean, midline facet strip | 1440×900 | light |
| `rr2-02-display-buttons-bottomdock-zoom.png` | display/buttons — bottom-dock + its facet strip (the dup) | 1440×900 | light |
| `rr2-03-motion-springs-desktop-light.png` | motion/springs — H1 clean, Engines/Text FX/Entrance | 1440×900 | light |
| `rr2-04-forms-inputs-desktop-dark.png` | forms/inputs — H1 "Inputs" clean (pass-1 dark case) | 1440×900 | dark |
| `rr2-05-gear-configurator-dark.png` | gear=Configurator open (dark-at-top, glass rows) | 1440×900 | dark |
| `rr2-06-forms-inputs-mobile-light.png` | forms/inputs — mobile IA (single bottom strip) | ≈500×844 | light |
| `rr2-07-frontdoor-mobile-light.png` | foundations/intro — mobile front door | ≈500×844 | light |
| `rr2-08-frontdoor-desktop-light.png` | foundations/intro — desktop hero + nav | 1440×900 | light |
| `rr2-09-frontdoor-categories-desktop-light.png` | foundations/intro — CATEGORIES directory | 1440×900 | light |

(9 fresh captures across 2 viewports × both modes — the AZ.W-REFLECT freshness bar met; ≥4 required.)

---

## 5. VERDICT

**PASS.** The pass-1 close-gating miss (SHELL-IA-M1) is independently confirmed redressed: on its own evidence routes (`/display/buttons`, `/motion/springs`) PLUS a third multi-facet route (`/forms/inputs`), in BOTH modes, the vertical facet strip now seats at the dock midline (~y290–368) and never co-occupies the title band (h1 y58–89) → `h1Overlap:false` every time, visually clean. The midline seat reads well — the carousel rides the dock's vertical center, clear of the title, the mid-body chip overlap being the accepted floating-overlay paradigm (content scrolls behind). The full shell-IA surface re-verifies: the gear=Configurator flow (dark-at-top, glassy rows, composables-gone, FAB-gone, re-framed), the ℱ Foundations identity (dedup + separator + optical nudge + larger glyph), the route-driven facet MAPPING (general + per-section sensible + chip-click navigates + active-highlight tracks + single-facet renders no strip), the hierarchy rung, the suffusion outcomes, the noise-bar prune, and the mobile IA. The one new observation (SHELL-IA-N1, the desktop dual-facet carousel) is a non-gating S3 NOTE — two genuine functional affordances, no collision — logged for the close/a successor to weigh, not a defect that blocks this lane.
</content>
</invoke>
