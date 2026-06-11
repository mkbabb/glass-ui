# REFLECTION RECORD — surface: shell-ia (the shell + demo IA)

- **Lane:** shell-ia
- **Auditor:** reflection auditor (AZ.W-REFLECT)
- **Date:** 2026-06-11
- **Base:** tranche/AY @ HEAD (full AZ build landed: Batches 0-5 + R4/R5 corrective; the W-RAIL3 floating-carousel redress is MID-FLIGHT in the working tree — `demo/layout/{SidebarDock,BottomDock}.vue` + `dock-nav.css` modified-uncommitted)
- **Live target:** :5199 (isolated context `shell-ia-reflect`, page 14); both modes; desktop 1440×900 + mobile 390×844
- **VERDICT: FAIL** — narrowly, on ONE first-time-auditor "wtf" (the floating facet chips occlude the page `<h1>` on every desktop multi-facet content route). Every other item on the surface — the gear=Configurator flow, the ℱ Foundations identity, the route-driven facet MAPPING, the hierarchy rung, the suffusion outcomes, the scroll-spy stability, the mobile IA — PASSES live in both modes. The single open miss is owned by the IN-FLIGHT W-RAIL3 redress; the FAIL is the close-gate on that one collision, not on the IA's substance.

---

## 1. RECAPITULATION — every audit item on this surface × discharging wave × live re-verification

| id | the user's words (condensed) | discharging wave | gate | LIVE re-verify (this audit) | status |
|---|---|---|---|---|---|
| R3-4 | Gear → display the demo CONFIGURATOR; REMOVE composables view; REMOVE floating-config option; FOLD dark toggle into the configurator | W-SHELL-CONFIG | `proof:shell-config` | Gear opens dialog "glass-ui demo Configurator"; NO floating FAB over page; NO `composables` category in sidebar nav (10 categories: Substrates…Compositions, Foundations=ℱ home); dark toggle folded in, FIRST control | **PASS** |
| R4-3 | The gear opens the PRESET EDITOR with the dark toggle at the TOP (not bottom); refines R3-4 | W-SHELL-CONFIG | `proof:shell-config` | APPEARANCE section is FIRST; "Dark mode" switch is the FIRST control ("the single chrome dark control"); then Glass level / UI scale / Reduce motion | **PASS** |
| R4-4 | Preset options must be proper glassy/pill tabs or selects — no bare buttons/radios/native selects | W-SHELL-CONFIG | `proof:shell-config` | PRESET = segmented pill buttons (Glass-UI default / Neutral / Custom); TYPOGRAPHY = glass comboboxes; DENSITY = pill buttons; cartoon-shadow = glass switch; π readback confirms reka comboboxes (role=combobox haspopup=listbox), not native `<select>` | **PASS** |
| (R4-3 axes) | the post-W54 axes a demo configurator should teach | W-SHELL-CONFIG | bite 4 AXES-PRESENT | `--glass-level` slider (0..1.5), `--ui-scale` slider (0.85..1.5), `--demo-reduce-motion` switch all present; LIVE-APPLY VERIFIED: drove `--ui-scale` slider to 1.1 → `:root --ui-scale`=1.1 + `--dock-scale`=`calc(1.1 * 1)` derived for free; Reset all → 1 | **PASS** |
| (re-frame) | renamed from "Preset Editor" | W-SHELL-CONFIG | bite 5 RE-FRAMED | title reads "glass-ui demo Configurator" + subtitle "Live-tune the post-W54 design axes…" in BOTH modes | **PASS** |
| (`,` shortcut/event) | the keyboard/event open path survives | W-SHELL-CONFIG | bite 1 runtime | `window.dispatchEvent(new CustomEvent('glass-ui-demo:toggle-configurator'))` toggles the dialog open AND closed | **PASS** |
| R3-12 | The ℱ logo IS the Foundations entry (not a dup compass), divider, slightly larger | W-SHELL-IDENTITY | `proof:shell-identity` S1/S4 | ℱ is the single Foundations affordance; NO Compass home dup; a `<DockSeparator>` (y=78, h=1) demarcates below; ℱ glyph 32px vs 16px category glyphs | **PASS** |
| R3-15 | The ℱ is NOT centered in its hover/shadow area; needs a rail | W-SHELL-IDENTITY | `proof:shell-identity` S2/S5 | inner `<span>` carries `matrix(1,0,0,1,-2.63,-3.75)` — the non-trivial optical-center nudge (≈ −2.63/−3.75, the re-measured value near the spec'd −2.38/−3.25). NOTE: the binding ±0.5px ink-mass band is the `tests-visual/shell-identity.spec.ts` painted-pixel probe's job (a `getBoundingClientRect` proxy cannot read ink-mass); the transform is present + at magnitude | **PASS** (transform present + non-trivial; band assert delegated to π spec) |
| R3-14 | Dock displays a layering system with layers per the PAGE's context; redesign from first principles | W-DOCK-CONTEXT → W-RAIL3 (in-flight) | `proof:rail3` (born-RED) | The route→facet RESOLVER (`useContextualDockLayers` + `CONTEXT_LAYER_MAP`) is general + route-indexed off `route.meta.categoryId`; every category mapped to sensible 2-3 facet clusters; LIVE: substrates→Fields/Creatures, motion→Engines/Text FX/Entrance, navigation→Switchers (single → no strip, correct) | **MAPPING PASS** / render = the R6 miss below |
| R3-5 | ALL docks normalized: persistent controls for nav/home | W-DOCK-NORMALIZE | `proof:dock-unify` F4 | SidebarDock + BottomDock carry the home-left ℱ `#persistent` + DockSeparators + nav; the census scoping (nav-strict SHOWCASE/SHELL vs FEATURE_EXEMPT) is canon | **PASS** (scoped to dock lane; shell docks carry it) |
| R4-2 / B11 | "wtf are these other options even" / text WAY too large / awful hierarchy — walk EVERY category as a first-timer | W-HIERARCHY + W-SUFFUSE + W-SHELL-CONFIG | `proof:hierarchy` | Every story page: ONE canonical section rung (20.4px/600 `text-subheading`), page title above at 25.9px/700, NO mixed/below-body/title-dup patterns; composables noise category DELETED; π readback across forms/display/navigation/data | **PASS** |
| (suffuse) | display heroes, one-color-events, restraint | W-SUFFUSE | `proof:suffuse` | hero `<h1>` 86px/600 display register; `--motion-accent` resolves oklch hue 317-318 (the ppmycota violet `--viz-legendre` twin); body ink UNTINTED (prose = warm-ink `--foreground` oklab(0.216…), eyebrows = neutral muted, NO section/viz/chart tint on `<p>`) | **PASS** |
| R6-1/R6-2 | docks far too wide / 3 rows tall / rotated clipped label / orphan indicator | W-RAIL3 (in-flight redress) | `proof:rail3` G1/G4 | docks shrink-wrap to tight pills (Sidebar V w=59, Bottom H w=235×55 — NOT inflated); ZERO rotated/clipped text labels; ZERO orphan indicator | **PASS** (box-inflation + corpses fixed by the in-flight redress) |
| NOTE-1 | scroll-spy concern: programmatic scrollIntoView re-writes the route mid-probe | — (shell router) | — | Clean deep-link loads are stable; manual scroll-to-bottom + `scrollIntoView()` on a deep section do NOT change `location.pathname` or hash; `AppShell.vue` only RESETS `<main>` scroll on route change; the only `router.push` is the explicit dock category-switcher — NO IntersectionObserver route write | **PASS — not a miss for this lane** |

---

## 2. THE PERFECTION QUESTION — first-time-auditor walk (the R4-2 bar)

Walked all 11 demo categories at desktop + mobile, both modes, as a first-time auditor.

**Reads as finished:**
- The front door (foundations/intro) — full-bleed aurora hero (B22 honored), the ℱ glass-ui wordmark + the "Glass, paper, and the golden ratio." display hero, an 11-card CATEGORIES directory with the Foundations card featured larger. Strong first impression. (cap 01, 07, 08, 11)
- The gear=Configurator — opens as one coherent options dialog, dark-at-top, every row a house register, live-apply works (the `--ui-scale`→`--dock-scale` derivation readback proves it). Both modes clean. (cap 02, 10)
- The ℱ home identity — one demarcated, optically-centered, slightly-larger Foundations entry.
- The hierarchy — every story page lands on its title, then its sections at one rung; no page screams oversized type. (cap 04, 05)
- The route-driven facets read sensibly per section (Fields/Creatures on Substrates, Engines/Text FX/Entrance on Motion, etc.).
- Mobile collapses the sidebar and drives navigation off the bottom dock — no clutter, no overlap. (cap 08, 09)
- The pruned `/compositions/dashboard` route resolves to a tasteful constellation 404 ("Lost in the lattice"), not a hard error.

**The "wtf" (the one that fails the bar):**
- On EVERY desktop multi-facet content route, the vertical floating facet chips (the W-RAIL3 carousel riding the SidebarDock hairline) extend rightward to x≈212px and OCCLUDE the page `<h1>` which starts at x≈186px — a measured ~26px overlap that clips the first glyph of the title. Live-read: "Buttons"→"uttons" (display/buttons), "Spring Orchestrator"→"pring Orchestrator" (motion/springs), "Inputs"→"Inputs" with the "I" clipped (forms/inputs, dark). A first-timer's eye lands on a chopped page title behind floating chips. This is the classic "source-green / shell-broken" class the W-RAIL3 spec itself exists to break — and the new floating render trades the old box-inflation for a new content collision that the RAIL3 gates (G1 box-equality, G2 outside-the-box paint, G3 carousel-cycle, G4 no-clipped-label/orphan) do NOT cover. (cap 05, 06, 12)

---

## 3. MISSES (severity-graded, evidence-anchored)

### SHELL-IA-M1 (S2) — the floating facet chips occlude the page `<h1>` on desktop multi-facet routes
- **What:** On desktop, the vertical W-RAIL3 facet strip (`.dock-hairline-extend.vertical`) extends to x-right≈212px while the page `<h1>` starts at x≈186px — a ~26px overlap that clips the title's first glyph on every multi-facet content route.
- **Evidence:** π readback `/display/buttons`: `h1.x=186, chipExtendRight=212, overlapPx=26` ("Buttons"→visually "uttons"). Reproduced `/motion/springs` (h1 x=186, railOverlapsH1=true, "pring Orchestrator"), `/data/table` (h1 x=186, railOcc=true), `/forms/inputs` dark ("I" clipped). Captures `05-display-buttons-desktop-light.png`, `06-motion-springs-rail-overlap-light.png`, `12-rail-overlap-h1-evidence-light.png`. SCOPED OUT on mobile (vertical chips hidden, h1 x=16 clean) and on single-facet sections (navigation → no strip renders) and on hero pages (content pushed below the chip band).
- **Ownership:** The IN-FLIGHT W-RAIL3 redress (the third-rail triumvirate). The floating-carousel render is live in the working tree (uncommitted) and HAS fixed the R6 box-inflation + the rotated-label/orphan corpses, but introduced this NEW page-content collision. The RAIL3 §4 gate roster (G1-G4) does not assert non-collision with page content — recommend the redress add a content-collision guard (the strip's rightward extent must clear the `<main>` content inset, e.g. a left-gutter reservation or a z-order/inset that keeps the strip out of the page-title column) before close. This is the close-gating item that flips this lane's verdict.

### SHELL-IA-M2 (S3) — the shell-identity ink-mass ±0.5px band is unverified IN THIS LANE
- **What:** R3-15 optical centering is proven here only structurally (the `matrix(…,-2.63,-3.75)` transform is present + non-trivial). The binding HG2/S5 acceptance is the ±0.5px painted-ink-mass band, which requires the `C8-fourier-f-livescan.mjs` pixel scan (the `tests-visual/shell-identity.spec.ts` arm) — a `getBoundingClientRect` proxy reflects the transform, not the ink. This is not a defect (the transform is at the spec'd magnitude and the ℱ reads visually centered in caps 01/07), but the load-bearing measured truth lives in the π spec, not in this audit's reach.
- **Evidence:** span transform `matrix(1, 0, 0, 1, -2.63, -3.75)`, font-size 32px, FVS `"SOFT" 0, "WONK" 1`. The visual capture (01-frontdoor) shows the ℱ visually seated. No remediation required; recorded for completeness so the close reads the band off the π spec, not this record.

---

## 4. CAPTURE LIST (fresh, this audit — stored beside the record under `reflect/shell-ia-png/`)

| file | route / state | viewport | mode |
|---|---|---|---|
| `01-frontdoor-desktop-light.png` | foundations/intro (full) | 1440×900 | light |
| `02-gear-configurator-desktop-light.png` | gear=Configurator open | 1440×900 | light |
| `03-substrates-rail-desktop-light.png` | substrates/aurora — facet rail (Fields/Creatures) | 1440×900 | light |
| `04-forms-inputs-desktop-light.png` | forms/inputs — hierarchy | 1440×900 | light |
| `05-display-buttons-desktop-light.png` | display/buttons — rail-overlap visible | 1440×900 | light |
| `06-motion-springs-rail-overlap-light.png` | motion/springs — overlap + motion-purple | 1440×900 | light |
| `07-frontdoor-desktop-dark.png` | foundations/intro (full) | 1440×900 | dark |
| `08-frontdoor-mobile-light.png` | foundations/intro — mobile IA | 390×844 | light |
| `09-display-buttons-mobile-light.png` | display/buttons — mobile (no overlap) | 390×844 | light |
| `10-gear-configurator-dark.png` | gear=Configurator open | 1440×900 | dark |
| `11-categories-grid-desktop-light.png` | foundations/intro CATEGORIES grid | 1440×900 | light |
| `12-rail-overlap-h1-evidence-light.png` | display/buttons — overlap evidence | 1440×900 | light |

(≥4 fresh captures across ≥2 viewports × both modes — the AZ.W-REFLECT freshness bar met.)

---

## 5. VERDICT

**FAIL** — on the single S2 first-time-auditor miss (SHELL-IA-M1, the facet-chip-over-`<h1>` collision), which is owned by the in-flight W-RAIL3 redress and not yet covered by its gates. The IA's substance is sound and PASSES live: the gear=Configurator flow (dark-at-top, glassy rows, verified live-apply, re-framed, FAB-gone, composables-gone, single-dark-home), the ℱ Foundations identity (dedup + separator + optical nudge + larger glyph), the route-driven facet MAPPING (general + per-section sensible), the hierarchy rung (one canonical 20.4px section register), the suffusion outcomes (display heroes, motion-purple, untinted-body restraint), the scroll-spy stability (no route-write on scroll — NOTE-1 is not a miss here), and the mobile IA. Re-reflect after W-RAIL3 lands the content-collision fix; that is the only item gating this lane's flip to PASS.

---

## REDRESS ADDENDUM (orchestrator, post-record)

**SHELL-IA-M1 — DISCHARGED** by the W-RAIL3 orchestrator refinement (commit `83ea0ef9`): the
vertical facet strip re-seated from the top-anchored offset to the dock's vertical MIDLINE
(`inset-block-start: 50%` + `translate: 0 -50%`, `src/styles/dock/rail-extend.css`) — stable
across viewport heights and clear of the H1/breadcrumb band. Live π re-readback on the record's
own evidence routes: `/display/buttons` h1 y∈[58,89] vs strip y∈[289,351] → `h1Overlap: false`;
`/motion/springs` h1 y∈[58,89] vs strip y∈[273,367] → `h1Overlap: false`. Mid-body chip overlap
remains by design — the floating-overlay paradigm (content scrolls behind), per the R6
"floating carousel" redirect. `proof:rail3` + the π spec re-ran GREEN at the new seat;
the rail3/ captures + surface-hash re-stamped.

**SHELL-IA-M2 (S3) — accepted as recorded:** the ±0.5px ink-mass band reads off the
`tests-visual/shell-identity.spec.ts` π arm at the close, not this record. No remediation owed.

The surface verdict stands as the auditor wrote it; the close-gating miss is now discharged.
Re-stamp owed at W-CLOSE (the verdict matrix).
