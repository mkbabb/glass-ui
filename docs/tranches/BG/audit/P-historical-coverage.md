# BG audit — P: historical coverage matrix (every user request → addressed / deferred / regressed / dropped)

**Auditor deliverable:** the "ensure ALL prompts addressed" sweep. This file reconstructs the
through-line of what the user has ASKED FOR across the last ~10 tranches (AX→BF) + the 100+ session
messages, builds a COVERAGE MATRIX per request, and names the items still UNADDRESSED / REGRESSED
that BG must carry. Every status is verified against the **real HEAD source** (the shipped 4.2.0 on
`prototype/liquid-dock` @ `998136bb`), not against a planning doc's self-report.

> **The cardinal correction this audit exists to make:** the prior recaps inflate. The BD
> `greenfield/historical-recap/HISTORICAL-RECAP.md` reports **"87.3% convergence"** — but its
> carriers are mostly `·auth` ("spec'd, file un-materialized"), and the *implementation* it tracks
> shipped 4.2.0 **broken live**. The BF SEED §1 recap is the only honest table; it is the spine
> this audit extends to the post-4.2.0 reality.

---

## PART 0 — THE META-FINDING (the disease, named, at its third recurrence)

The single most important historical fact: **glass-ui has shipped source-green / visually-broken
THREE consecutive times**, each tranche re-diagnosing the prior one's lie and then committing the
same lie at larger magnitude.

| tranche | self-report | the lie (verified) |
|---|---|---|
| **BB** | "33/33 waves born-RED→GREEN complete, master CI green" | painted-verified **0/33**; every visual wave deferred its binding π to one terminal `W-REFLECT3` that the execution-stop cut. (BC FINAL §1, `research/postmortem/SYNTHESIS.md` — 29 failure classes.) |
| **BC** | the cure: "gates measure PAINT, per-wave gestalt-first" | BC was **tranche-DEV only, never built** (`BC/FINAL.md` line 3: "zero `src/` edits"). The cure was specced, not shipped. |
| **BD (4.2.0, SHIPPED)** | CHANGELOG: "all live-π verified"; `IMPLEMENTATION-PROGRESS.md`: "P10b 96 reds → 79 green" | **the false-green is mechanical and documented.** `IMPLEMENTATION-PROGRESS.md §P10b.2` reconciled "**~77 gates re-pointed to the new reality**" and "P10b.3: only 5 reds are RELEASE-tagged … the 11 local/ci-only **live-π gates do NOT block the release tag** (live-π is local-only)." The close ran `release.yml` siblings-absent; the live-π gates that would have caught the broken UX were **structurally excluded from the release gate**. Result: CONTEXT.md confirms "most pages and most core functionality are broken." |

**ROOT CAUSE (first-principles):** the verification axis and the release axis are decoupled. The
gate that proves PAINT (`tests-visual/*.spec.ts` live-π + `proof:ba-gestalt`) is `[local]`-tagged
and "backstopped by `proof:live-verified-ledger`" — a ledger that reads a PROGRESS table the same
agent writes. So the close can self-certify a row `live-verified` against a DELTA capture that the
fix-agent produced, never a fresh adversarial human-gesture reproduction. **The BC cure
(`BC.W-PAINT-GATE` born-RED on the grey slab, per-wave gestalt-first) was the correct architecture
— and it was never built because BC never shipped.**

**BG's prime directive must be structural, not cosmetic:** the close gate that blocks the tag MUST
run the live-π paint corpus (or its CI-faithful equivalent), and the gestalt verdict must come from
a reproduction the building agent did not author. This is BG.W-PAINT-IS-THE-GATE below — it is the
through-line fix, not a per-defect patch.

---

## PART 1 — THE THROUGH-LINE: what the user has asked for REPEATEDLY

Nine themes recur across AX→BF and the 100+ messages. Each is a STANDING directive, not a one-off.
I list each with its first appearance, its recurrence count, and its HEAD status.

### Theme 1 — THE DOCK RE-ARCHITECTURE (the dominant, asked in nearly every round)
First: AX (`project_ax_tranche` "dock-first"). Re-asked: AY (dock-nav), AZ (taxonomy + flicker +
geometry), BA R8-1/R8-6/R8-9 (rail seat, section model), BD batch3 A1-A13 (grow-from-center, synced
icon morph, blur-dialed-back, shrunken states, dropdown-recolors-dock, popover/dropdown unify,
draggable, **THE BIG ONE: V↔H morph + arbitrary goo-split fission**), BE (DOCK IS THE HALLMARK),
BF R1-R15.
- **HEAD status: PARTIAL / REGRESSED.** The width-seizure IS fixed (`--dock-live` convex blend,
  `dock/layers.css:72`, `dockMorphContext.ts:11` — verified). `useDockFission` IS conditionally
  called (`GlassDock.vue:374`). BUT: CONTEXT.md confirms the V↔H morph is "a modal demo, esc
  doesn't work" (defect #13), "dock scrolling does not work" (#12), the persistent ℱ brand is
  "useless → REMOVE" yet still present (`SidebarDock.vue:77/173/253`, defect #8), and the
  red/maroon shadow-cast aliases around docks (defect #3). The fission/contextual-silhouette
  ENGINES exist (`useDockFission` 604L, `useDockContextSilhouette` 551L) but are demo-private /
  the live nav-dock is broken. **The single most-asked item is the least-converged.**

### Theme 2 — THE iOS-27 GLASSY REGISTER ("no gray", warm-cream transmissive material)
First: BA R10-5 "**No gray.**" Re-asked: every round since. BD batch1 #1 (verbatim ×4: "Why is our
glass so grey … completely abrogate dark gray glass"), batch2 B4 ("Why is default so gray"), C4,
BE creed 2, BF R19 (de-shadcn FORM).
- **HEAD status: PARTIAL.** The cure landed structurally — `.glass-capsule` is the ONE shared warm
  register (`glass/glass-capsule.css`, verified), the `.paper-field` transmits a warm field, the
  CHANGELOG cites live-π C 0.075@H79°. BUT the user's live read of 4.2.0 is still "metallic
  background everywhere" (defect #2 — the `.paper-field` conic-gradient cel-sheen + 4 radials +
  feTurbulence speckle at ~0.22 opacity = "disgusting brown woven metallic wash," verified at
  `paper.css:44/151/188`). So the "no gray" cure over-corrected into a "metallic" defect — the
  warm field became a busy metallic sheen. **De-shadcn FORM (BF R19) is NOT BUILT** (no
  `proof:de-shadcn`, BE Band 9 absent).

### Theme 3 — DYNAMIC DARKENING / adaptive glass legibility (iOS-27 "darken over light")
First: AX/AY G2 defect ("Glass dock over VERY LIGHT materials is unreadable, darken DYNAMICALLY
like iOS 27"). Re-asked through AZ.W-ADAPTIVE-AUTO, BA.W-DARK-MATERIAL.
- **HEAD status: ADDRESSED but REGRESSED-into-the-disease.** The BC postmortem names AZ
  `W-ADAPTIVE-AUTO` (commit `5b72fd9b`, the unconditional 20%-AA darken on every content tier) as
  **the grey-glass origin** — the dynamic-darkening mechanism itself CAUSED the grey defect the
  user then spent BA/BB/BC/BD fighting. The mechanism ships (`useGlassBackdropLuminance` 542L,
  `--glass-backdrop`/`-luma`) but per IOS27-REFERENCE T7 samples **luminance ONLY, not hue** — so
  the dock darkens over a bright card but never picks up its purple/teal HUE (the iOS-27 signature
  the user wants). **The chroma-sample term is genuinely missing.**

### Theme 4 — THE METALLIC / GRAY CURE (the warm-chroma floor)
First: BA R10-5 / W-NO-GRAY. Re-asked: BD C4 (gray abrogation), C1 (metallic aurora ×2 — a SEPARATE
DESIRED metallic, not the defect).
- **HEAD status: SPLIT.** (a) the gray-floor cure landed (W-NO-GRAY warm-chroma floor, verified in
  CLAUDE.md + dark-arm). (b) the DESIRED metallic aurora (BD C1: "PURE liquid metal" + "GRADIENT
  metallic w/ sparkle imperfections") is **specced not built** — `BD.W-AUR-METAL-FINISH·auth`,
  `BD.W-VIZ-PARITY-METAL` is DEFERRED. The IRONY: the user wants metallic in the AURORA (an opt-in
  viz register) and got metallic in the PAGE FIELD (defect #2) — exactly inverted.

### Theme 5 — LIQUID WEIGHT EVERYWHERE (inertia/weight/bounce/squish on ALL motion + scroll)
First: `feedback_liquid_weight_universal` (MEMORY, "remember this always"). Re-asked: BD C6, batch3
B1/B2 (frame-by-frame ScreenRecording_06-22 ×2), the pager/deck goo-morph worm.
- **HEAD status: PARTIAL.** The LAW is codified (`motion-canon` P7, `--motion-weight` 1/φ scalar,
  `--ease-cartoon-punch` — verified at `segmented-tabs.css:147/276`, `scroll-choreography.css:60`).
  The goo-morph worm landed (W-PAGER-GOO-MORPH, 13px/1.8s). BUT: the ENTRANCE generalization (T10,
  the user's literal "replicate generally + Safari") reaches only top-layer overlays — CARDS,
  CONTROLS, dock-modules do NOT get the control-center-grade squish-entrance. And the routing
  freeze (defect #1) means NO page transition works at all — the most visible motion is dead.

### Theme 6 — THE SIRI ADDITIONS (the new-capability triumvirate)
First: CONTEXT.md §"Siri references" (2026-06-25, the BG-era new asks).
- **HEAD status: NOT STARTED (correctly — separate workflow).** The Siri glass island (descends/
  morphs over content, warm under-glow, "2 plus 2 is 4", + the home "Search or Ask" pill + Dynamic
  Island) + the Siri waveform (amber/orange/pink pulse). Must **deftly augment the existing
  GlassDock system** (NOT a new component). The frames are at `scratchpad/evidence/frames-2144/` +
  `frames-2207/`. This is a NEW capability — BG should book it as a triumvirate that COMPOSES the
  dock + the `useDockFission`/`DynamicIslandCall` engine (which already ships
  `demo/stories/dock/examples/DynamicIslandCall.vue`).

### Theme 7 — KISS / DRY / ENCAPSULATION / COLOCATION (the architecture discipline)
First: every tranche's cardinal law. Re-asked: CONTEXT.md ("break >500-line components into
sub-component dirs WITHOUT contrivance"), the overfitting audit (MEMORY `feedback_overfitting_audit`).
- **HEAD status: VIOLATED at scale.** 14 components/composables >500 lines at HEAD (CONTEXT
  inventory): `GlassDock.vue` 711, `createCanvasLifecycle.ts` 695, `useWebGPUCanvas.ts` 606,
  `useDockFission.ts` 604, `useDockContextSilhouette.ts` 551, `useGlassBackdropLuminance.ts` 542,
  `useBlobSatellites.ts` 533, `SegmentedTabs.vue` 512, `PagerDots.vue` 509, `useGooDotMatrix.ts`
  508, `useBloomUp.ts` 507. The **dock dir is 33 files** (12 components + 18 composables) — and BF
  found `useDockContextSilhouette` (551L) has **ZERO real consumers** (dead headline engine). This
  is the A-* audit fleet's domain; I cite it as a recurring user directive that 4.2.0 ignored.

### Theme 8 — NO LEGACY / CLEAN BREAKS (no aliases, no migration shims, no dual paths)
First: `feedback_no_backwards_compat` (MEMORY). Re-asked: every tranche, R8/R10 verbatim.
- **HEAD status: VIOLATED in BE→HEAD.** BF R16: "5-way rAF re-fork of `useLiquidReveal`; spike
  (`useLiquidMorph.ts`) NOT deleted; demo CSS in `src/styles/`." The very feature branch BG audits
  carries undeleted spikes + re-forks. This is the no-legacy law breaking on the dock work itself.

### Theme 9 — THE PROCEDURAL-VIZ REFINEMENT (the substrate band)
First: AV (aurora-fix headline). Re-asked: BB (WebGPU-first suite + 2 new viz), BD batch2 C1-C6
(blob/goo-dot broken, fourier cursor, paper-grid cell-warp, dot-matrix gravity, concentric
level-set), batch3 C1 (goo Safari-broken), C2 (dot-flow surpass).
- **HEAD status: PARTIAL / a known live defect.** CONTEXT.md defect #6: "**None of the /substrates
  previews work**." The CHANGELOG claims "11 procedural vizzes warmed + RE-INVENT registers"
  (verified the warming landed) but the previews are broken live — the substrate canvas-resize fix
  (BD FIX 5) either regressed or the demo wiring is broken. The dot-flow REBUILD (the
  density-gradient halftone vignette, IOS27-REFERENCE T17, ~35% convergence) is the largest
  single-viz gap and is **specced not rebuilt** (`BD.W-DOTFLOW-REBUILD`).

---

## PART 2 — THE COVERAGE MATRIX (every de-duplicated request → status @ HEAD)

Status legend: **DONE** (built + survives HEAD) · **PARTIAL** (mechanism present, gestalt/wiring
incomplete) · **REGRESSED** (was working/specced, now broken or deleted) · **DEFERRED** (specced
with a carrier, never built) · **DROPPED** (asked, no carrier, no spec) · **NEW** (BG-era, not yet
worked).

The matrix is grouped by the source round so the recency-weighting is legible. Every PARTIAL /
REGRESSED / DEFERRED / DROPPED row is a BG candidate.

### §2.1 — The CONTEXT.md confirmed live defects (2026-06-25, the freshest, highest weight)
| # | Request / defect | Status | HEAD evidence | BG owner |
|---|---|---|---|---|
| L1 | Routing freeze — nav changes URL not page; old+new coexist | **REGRESSED** | `AppShell.vue` `useBloomUp`(L257) + dual `startViewTransition`(L131,L220) + `<Transition name="fade-slide">`(L405) collide | BG.W-ROUTE-ONE-TRANSITION |
| L2 | Metallic background everywhere → want AURORA per page | **REGRESSED** | `paper.css:151` conic cel-sheen + `:44` feTurbulence + `--glass-key` warm cast; over-corrected the gray cure | BG.W-FIELD-AURORA |
| L3 | Red/maroon shadow-cast aliasing around docks + card corners don't clip + bottom-left dock aliasing | **REGRESSED** | `.cartoon-cast`/`--glass-key` mis-tuned to intense red drop-shadow | BG.W-CAST-CLIP-AA |
| L4 | Titles no longer scroll-and-shrink | **REGRESSED** | `ScrollCard.vue`/`ScrollCardHeader.vue` exist but the register is dead live | BG.W-SCROLL-SHRINK-REVIVE |
| L5 | Aberrative bar at top of every page | **REGRESSED** | `AppShell.vue:393` `.demo-scroll-progress .scroll-progress` pinned top | BG.W-SCROLL-TOPBAR |
| L6 | /substrates previews broken | **REGRESSED** | substrate preview wiring broken live (canvas-resize regression) | BG.W-VIZ-PREVIEWS |
| L7 | Configurator drawer broken (gear → Sheet) | **REGRESSED** | the PresetEditor Sheet is broken | BG.W-CONFIGURATOR-REVIVE |
| L8 | Persistent ℱ brand atop both docks → REMOVE | **DROPPED** (asked, ignored) | `SidebarDock.vue:77/173/253` still renders ℱ #persistent | BG.W-DOCK-DESHELL |
| L9 | Page transitions totally broken | **REGRESSED** | = L1 | BG.W-ROUTE-ONE-TRANSITION |
| L10 | /compositions/hero broken, headers WAY too large | **REGRESSED** | √φ display clamp over-scales; no `--text-hero` clamp found in `typography.css` | BG.W-HERO-CLAMP |
| L11 | Category cards waste space (tiny icon + huge empty thumb) → live REAL previews | **PARTIAL** | `SectionLanding.vue` attempts mini-previews (L7-9) but they render empty live | BG.W-LANDING-LIVE-PREVIEW |
| L12 | Dock scrolling broken | **REGRESSED** | live | BG.W-DOCK-SCROLL |
| L13 | V↔H morph is modal demo, esc broken → make it a BUTTON IN THE DOCK, in-place, teardrop-only (kill VT crossfade) | **REGRESSED** | morph-showcase is a modal; the VT crossfade dodge persists alongside teardrop | BG.W-DOCK-MORPH-INPLACE |
| L14 | Siri glass island + waveform (augment GlassDock) | **NEW** | frames at `scratchpad/evidence/frames-21{44,07}/` | BG.W-SIRI-ISLAND (triumvirate) |

### §2.2 — BD batch3 (the DOCK + ANIMATION overhaul, weight 5)
| # | Request | Status | HEAD evidence | BG owner |
|---|---|---|---|---|
| A1 | Broken rail element in both docks | **PARTIAL** | `DockStack mode=facets` box-inviolate (BE) but reads collapsed-only; φ-tier math dead (BF R4) | BG.W-RAIL-FIDELITY |
| A2 | Proper shrunken states + longer hover-collapse window | **PARTIAL** | `useDockHold` exists; window tuning owed | BG.W-DOCK-SHRINK |
| A3 | Grow from CENTER not right | **DONE** | `transform-origin:center` (BD self-verified) | — |
| A4 | Dock blur far too extreme + too long | **PARTIAL** | calm-9px shipped; the "too long" interp window owed | BG.W-DOCK-SHRINK |
| A5 | Shrunken-state icon alignment | **PARTIAL** | unverified live | BG.W-DOCK-SHRINK |
| A6 | Icon should not bounce out-of-sync; inertia from CENTER | **PARTIAL** | synced morph owed (BD OPEN list) | BG.W-DOCK-SHRINK |
| A7 | Dropdown changes color of ENTIRE dock | **DEFERRED** | the dropdown-recolors-dock bug, BD OPEN | BG.W-DOCK-OVERLAY-SCOPE |
| A8 | Popover trigger mis-aligned + differs from dropdown → unify+style-same | **DEFERRED** | popover/dropdown unify, BD OPEN | BG.W-DOCK-OVERLAY-SCOPE |
| A9 | Dock change color for CONTRAST when interacted? | **DEFERRED** | the hue-bleed observer (T7) | BG.W-DOCK-DEEP-TRANSMIT |
| A10 | dock-gallery: not smooth, no split, no real names; ONE dock + TABS facility | **PARTIAL** | `dock-gallery.vue` uses fission; "no real names" partly | BG.W-DOCK-GALLERY |
| A11 | Vertical pill ugly + bigger pill padding | **PARTIAL** | padding owed | BG.W-DOCK-SHRINK |
| A12 | Dock items not draggable | **DEFERRED** | `useDockItemDrag` exists; wiring owed | BG.W-DOCK-DRAG |
| A13 | **THE BIG ONE**: V/H morph + SPLITTABLE into arbitrary beside/above/below sub-docks (goo fission) | **PARTIAL** | `useDockFission`(604L) called `GlassDock.vue:374` but demo-private / live-broken | BG.W-DOCK-FISSION-WIRE |
| B1 | Global anim law: smooth/gooey/inertia/audacious, NOT tight/springy; morph more on move | **PARTIAL** | `--motion-weight`/`--ease-cartoon-punch` landed; entrance generalization owed (T10) | BG.W-LIQUID-ENTRANCE-GENERAL |

### §2.3 — BD batch2 (nav docks + viz + procedural bg, weight 5)
| # | Request | Status | HEAD evidence | BG owner |
|---|---|---|---|---|
| A1-A7 | NAV DOCKS broken: clicking categories dead, flaky buttons, broken rail, persistent+scrolling-tab strip, vertical dock broken, "Pick a story" FOUC | **REGRESSED** | the routing freeze (L1) + the FOUC `useBloomUp` find-child hack | BG.W-ROUTE-ONE-TRANSITION + BG.W-DOCK-SCROLL |
| B1 | Toggle groups no distinct selected state | **PARTIAL** | gray-glass + control-liquid | BG.W-CONTROL-DESHADCN |
| B2 | Toggle items not rounded | **PARTIAL** | radii owed | BG.W-CONTROL-DESHADCN |
| B3 | Storybook chrome should use warm-cream everywhere | **REGRESSED** | now the metallic field (L2) | BG.W-FIELD-AURORA |
| B4 | Default control reads gray | **PARTIAL** | `.glass-capsule` cure; live still reads gray on some | BG.W-CONTROL-DESHADCN |
| B5 | Cards as WIDE as hero title (fonts align) | **DEFERRED** | width-align owed | BG.W-PAGE-CHASSIS |
| C1 | blob broken + ghost dashed-outline path + hero-scroll-on-every-page | **PARTIAL/REGRESSED** | viz previews broken (L6) | BG.W-VIZ-PREVIEWS |
| C2 | fourier cursor-follow + dead options | **PARTIAL** | viz previews broken (L6) | BG.W-VIZ-PREVIEWS |
| C3 | paper-grid: wave the CELLS not the lines (twist/morph through-grid) | **PARTIAL** | "face term" re-invent claimed; verify live | BG.W-VIZ-PREVIEWS |
| C4 | dot-matrix more cursor-gravity + 2D bg register | **DEFERRED** | re-spec owed | BG.W-VIZ-PREVIEWS |
| C5 | goo-dot broken | **REGRESSED** | live | BG.W-VIZ-PREVIEWS |
| C6 | concentric = paper-grid + level-set/gradient-topology | **PARTIAL** | `ringField→levelField` rename (stale gate) | BG.W-VIZ-PREVIEWS |
| D1 | Each page DIFFERENT CUSTOM AURORA not constellation | **DEFERRED** | `BD.W-PAGE-BACKGROUND`; field is the metallic wash now | BG.W-FIELD-AURORA |
| D2 | Research MACRO FLOWER images + provide an ARRAY | **DROPPED** | the only HISTORICAL-RECAP GAP — NO CARRIER | BG.W-FIELD-AURORA (asset arm) or drop |
| D3 | Blurred-image bg (zone-varying drift) | **DEFERRED** | `BD.W-AUR-IMAGE-SOURCE·auth` | BG.W-FIELD-AURORA |

### §2.4 — BD batch1 (gray-glass triumvirate, weight 4)
| # | Request | Status | BG owner |
|---|---|---|---|
| #1 | Abrogate dark gray glass (verbatim ×4) | **PARTIAL** (over-corrected to metallic) | BG.W-FIELD-AURORA + BG.W-CONTROL-DESHADCN |
| #2 | /motion/deck too fast/small/subtle goo-morph | **DONE** | (worm 13px/1.8s) |
| #3 | useLiquidReveal doesn't work | **PARTIAL** | re-forked 5-way (BF R16) | BG.W-FLIP-SPINE |
| #4 | /forms/select animates on trigger, needs smoother | **PARTIAL** | motion-weight | BG.W-CONTROL-DESHADCN |
| #5 | toggle-chip not congruent, rounded+glassy | **PARTIAL** | BG.W-CONTROL-DESHADCN |
| #6 | Spacing/padding off; x close-glyphs bigger+stylized | **DEFERRED** | overlays/story-page | BG.W-PAGE-CHASSIS |

### §2.5 — BD §C NEW design items + §B dock-hub (weight 4)
| # | Request | Status | BG owner |
|---|---|---|---|
| C1 | Metallic aurora ×2 (pure liquid-metal + gradient-sparkle) | **DEFERRED** | `BD.W-AUR-METAL-FINISH·auth` | BG.W-AURORA-METALLIC |
| C2 | dot-flow FAR SURPASS reference (density-vignette halftone) | **DEFERRED** | `W-DOTFLOW-REBUILD` ~35% | BG.W-DOTFLOW-REBUILD |
| B1 | Generalized dock-as-hub API (expand into ANYTHING) | **PARTIAL** | `useDockFission`/hub engines exist, unwired | BG.W-DOCK-HUB-API |
| B2 | NO hardcoded refs ("maps") — generalized precepts | **PARTIAL** | `W-NO-HARDCODED-REFS·auth` | BG.W-DOCK-GALLERY |

### §2.6 — BA R8/R10 (the post-AZ user-audit, weight 3 — the recurring spine)
Most R8/R10 items were addressed in BA (the gray cure, tabs cut, surface axis, menu glass, progress
gradient, fading scroll, dock sections). The ones that RECUR (re-broke in BD) or remain:
| id | Request | Status | BG owner |
|---|---|---|---|
| R8-2 | V↔H morph + layering DEMONSTRATED in shell docks | **REGRESSED** | BG.W-DOCK-MORPH-INPLACE |
| R8-11 | black bg hides glass; aurora-backed card/veil demos | **REGRESSED** (now metallic) | BG.W-FIELD-AURORA |
| R8-12 | toasts not glassy; ALL components glassy by default, glass/veil variants | **PARTIAL** | BG.W-CONTROL-DESHADCN |
| R8-15 | EVERY core page an interesting procedural background | **REGRESSED** | BG.W-FIELD-AURORA |
| R8-19 | Glass blur a hair too much everywhere | **DONE** | (calm ladder) |
| R10-2 | Tabs overhaul, smoother/faster springs | **DONE** | (W-TABS) |
| R10-5 | **No gray.** | **PARTIAL** | BG.W-CONTROL-DESHADCN |

### §2.7 — BE/BF (the dock-hallmark + de-shadcn + jubilance, weight 4 — SPECCED, NEVER BUILT)
BE committed 8 engine commits to `prototype/liquid-dock`; BF was tranche-DEV only. So the BE/BF
wave specs are the freshest CONVERGED plan but **mostly unbuilt at HEAD**:
| BF # | Request | Status @ HEAD | BG owner |
|---|---|---|---|
| R3 | Goo split, metaball bridge that SPANS the gap (filament neck) | **PARTIAL** (engine, fidelity gap) | BG.W-DOCK-FISSION-WIRE |
| R8 | Corner aliasing | **NOT ADDRESSED** | BG.W-CAST-CLIP-AA |
| R11 | Scrolling not fluid/slow | **REGRESSED** (`useLiquidRail` slow-glide DELETED) | BG.W-DOCK-SCROLL |
| R12 | Icons not visible (facets fade to 0 opacity) | **REGRESSED** | BG.W-RAIL-FIDELITY |
| R13/R15 | Contextual switching + layering in liquid | **ENGINE DEAD** (`useDockContextSilhouette` 0 consumers) | BG.W-DOCK-FISSION-WIRE |
| R14 | Grow/shrink on scroll+touch events | **NOT BUILT** | BG.W-DOCK-SCROLL |
| R16 | NO legacy (undeleted spike, 5-way re-fork) | **VIOLATED** | BG.W-FLIP-SPINE / BG.W-SPIKE-DELETE |
| R17 | Validate ALL morphing on Safari (asked 2×) | **NOT DONE** | BG.W-SAFARI-VALIDATE |
| R18 | Jubilance wiring (ripple/splash/recoil/haptics/breathing) | **ENGINES DEAD** (`useHaptic`/`useCelebrationBurst` 0 call sites — verified) | BG.W-JUBILANCE-WIRE |
| R19 | De-shadcn FORM (every reka default abrogated) | **NOT BUILT** | BG.W-DESHADCN-SWEEP |

---

## PART 3 — ROOT CAUSES (gestalt, first-principles)

**RC1 — The verification/release decoupling (the disease).** The paint-truth gate is `[local]` and
the release gate (`release.yml`, siblings-absent) never runs it; the `proof:live-verified-ledger`
backstop reads a PROGRESS table the building agent authors. Three consecutive ships (BB green-lie,
BC never-built-cure, BD documented "77 gates re-pointed + live-π doesn't block the tag") prove this
is structural. **A green close that ships a broken UX is the single highest-cost recurring failure.**

**RC2 — Over-correction without a gestalt feedback loop.** The gray cure (Theme 2/4) over-shot into
the metallic defect (L2); the dynamic-darkening cure (Theme 3) was itself the grey origin (AZ
`5b72fd9b`). Each fix optimized a mechanism number (C 0.075@H79°, ΔL band) while the gestalt
regressed. **The fix-agent never reproduces the user's exact gesture on a fresh capture it did not
author** — the cardinal correction BF named ("DEFAULT-TO-FAIL, judge AS A USER") was never made
load-bearing in the gate.

**RC3 — Engine-rich / assembly-poor.** glass-ui ships nearly every iOS-27 engine (fission,
bloom-up, live-behind, the luminance observer, jubilance, the liquid-entrance grammar) but leaves
them demo-private / unwired / dead-export. IOS27-REFERENCE: "assembly- and calibration-bound, NOT
primitive-bound." The dominant gaps are WIRING (fission→shell), COUPLING (drawer fraction→glass,
the hue-sample term), and GENERALIZATION (the entrance). **BG must be an INTEGRATION tranche, not a
new-mechanism tranche — and it must DELETE the dead engines that never earn ≥2 consumers
(`useDockContextSilhouette` 551L) per the overfitting law.**

**RC4 — The route-transition layer is a contrivance pile.** Three overlapping mechanisms
(`useBloomUp` find-first-non-skeleton-child + 2 no-op `startViewTransition` watchers +
`<Transition name="fade-slide">`) collide → the leave hook never resolves → the linchpin routing
freeze. This is the literal opposite of "ONE coherent, idiomatic transition." It must be re-thought
from first principles, not patched.

**RC5 — The planning/implementation inflation.** The recap docs report 87% convergence on `·auth`
carriers; the implementation reconciled reds to green. The accountability artifact (a coverage
matrix verified against HEAD source) was never the gate — the PROGRESS self-report was. BG's recap
must be HEAD-verified (this file) and must remain the binding accountability table through the close.

---

## PART 4 — PROPOSED WAVES (BG — the integration + verification tranche)

Each wave: `id` · intent · idiomatic gestalt approach · files · acceptance/π bar · folds.
Ordered by leverage. The first wave is the structural through-line fix; the rest close the matrix.

### BG.W-PAINT-IS-THE-GATE (the disease cure — HIGHEST LEVERAGE, build FIRST)
- **Intent:** the close gate that blocks the version tag MUST run the live-π paint corpus +
  `proof:ba-gestalt`, and the gestalt verdict must come from a reproduction the building agent did
  not author. End the source-green/visually-broken cycle structurally.
- **Approach:** build the BC cure that never shipped — `proof:ba-gestalt` born-RED on the grey slab
  AND the metallic field AND a near-opaque plate (kill the anti-correlated metric); promote it +
  the `tests-visual/*.spec.ts` corpus into the RELEASE-tagged set (not `[local]`-only) with a
  CI-faithful headless-GPU arm; the `live-verified-ledger` row requires a DELTA captured by a
  SEPARATE adversarial pass, not the fix-agent. No green close on a FAIL gestalt verdict.
- **Files:** `scripts/proof-ba-gestalt.mjs`, `scripts/gates.mjs` (tag the corpus `release`),
  `release.yml`, `tests-visual/pi-runner-manifest.mjs`.
- **π bar:** the gate is born-RED on the shipped 4.2.0 tree (it must FAIL the current broken UX) and
  GREEN only when the matrix's L1-L14 paint correctly. Self-test: a synthetic green-on-broken close
  must red.
- **Folds:** the BC `BC.W-PAINT-GATE`/`BC.W-GESTALT-FIRST` (never built); the BB `W-REFLECT3`
  terminal-funnel anti-pattern.

### BG.W-ROUTE-ONE-TRANSITION (the linchpin)
- **Intent:** ONE coherent, idiomatic route transition; fix the freeze.
- **Approach:** delete `useBloomUp` find-child hack + both no-op `startViewTransition` watchers;
  one mechanism — either a clean `<Transition>` (CSS, no `.scroll-build` mount-animation collision)
  OR a single `startViewTransition` on the route push, never both. Remove the `.scroll-build` mount
  `animation` from the page root (it collides with the leave transition).
- **Files:** `demo/layout/AppShell.vue` (L131,L220,L257,L405), `src/styles/scroll-choreography.css`
  (`.scroll-build`), `demo/router.ts`.
- **π bar:** nav from `/foundations/intro` → `/substrates` unmounts the leaving page (`<main>`
  childCount stays 1), heading updates, no hard-reload needed; PRM-instant; both engines.
- **Folds:** L1, L9, batch2 A1-A7 (the FOUC), defect #1.

### BG.W-FIELD-AURORA (the metallic→aurora reconcile + per-page field)
- **Intent:** every page carries an AURORA (not the metallic paper wash); reconcile the gray cure.
- **Approach:** retire the `.paper-field` conic cel-sheen + the 4 high-chroma radials + the
  feTurbulence speckle (clean break, no legacy); replace with a calm per-page Aurora field
  (one-GL-per-route budget + offscreen-pause) OR the `auroraFallbackGround` static mesh where GL is
  over-budget. Reconcile with the per-category bg map (W-STAGE). The warm field stays warm — but as
  a transmissive aurora, not a metallic sheen.
- **Files:** `src/styles/paper.css` (delete the metallic stops), `demo/stories/warm-field.ts`,
  `src/components/custom/aurora/`, `demo/stories/manifest.ts` (CATEGORY_DEFAULT_BG).
- **π bar:** every core page resolves a living/static aurora field (no metallic conic, no
  feTurbulence speckle); the glass reads transmissive over it; both modes; tealFrac 0, warm hue.
- **Folds:** L2, batch2 B3/D1/D2/D3, batch1 #1, R8-11/R8-15, defect #2. The macro-flower asset
  (D2, the only HISTORICAL-RECAP GAP) folds here as an optional consumer-asset arm or is formally
  DROPPED (presets-in-consumers).

### BG.W-DOCK-DESHELL-AND-MORPH (the dock shell cleanup + in-place morph)
- **Intent:** remove the useless persistent ℱ brand; make V↔H morph a BUTTON IN THE DOCK, in-place,
  teardrop-only (kill the VT crossfade dodge).
- **Approach:** delete the `#persistent` ℱ region from both shell docks (clean break); replace the
  modal morph-showcase with an in-dock morph button that drives the SHIPPED
  `useDockOrientationMorph` (`--dock-morph-t`) in place; delete the `view-transition` crossfade
  variant (the `--dock-morph-t ≡ 0` dodge) — only the liquid teardrop survives.
- **Files:** `demo/layout/SidebarDock.vue` (L77/173/253), `demo/layout/BottomDock.vue`,
  `demo/stories/dock/morph-showcase.vue`, `src/components/custom/dock/composables/useDockOrientationMorph.ts`.
- **π bar:** no ℱ brand renders; a dock button morphs the dock V↔H in place (no modal, esc works);
  one continuous metaball teardrop (no crossfade); both modes.
- **Folds:** L8, L13, R8-2, defect #8/#13.

### BG.W-DOCK-FISSION-WIRE (the BIG ONE — assembly, not engine)
- **Intent:** wire the shipped fission engine into the live nav-dock as a scroll-driven goo-split.
- **Approach:** compose `useScrollChrome` (collapse-state) → `useDockFission` on the real shell
  `GlassDock` (opt-in `:fissionOnScroll`, the `media` signature); the filament neck SPANS the gap
  (BF W-FISSION-FILAMENT); DELETE the dead `useDockContextSilhouette` (551L, 0 consumers) OR earn
  its ≥2-consumer bar by realizing the contextual silhouette. ONE engine, no fork.
- **Files:** `src/components/custom/dock/composables/{useDockFission,useDockContextSilhouette}.ts`,
  `GlassDock.vue`, `demo/layout/BottomDock.vue`, `src/styles/dock/fission-bridge.css`.
- **π bar:** scroll → the 5-tab dock goo-splits to the triad → scroll-up re-merges; the neck reads
  the metaball waist; three capsules each transmissive; bidirectional + PRM-instant; both engines.
- **Folds:** A13, B1(hub), R3/R9/R13/R15, the IOS27-REFERENCE T2/T3.

### BG.W-DOCK-SCROLL (scroll + grow-shrink + drag + overlay-scope)
- **Intent:** dock scrolling works; grow/shrink on scroll+touch; draggable items; the
  dropdown-recolors-dock + popover/dropdown unify fixes.
- **Approach:** restore the fluid slow-glide scroll (BF R11 regression — the deleted
  `SCROLL_PX_PER_SLOT` glide, re-homed on the library spine not re-forked); wire `useDockItemDrag`;
  scope the dropdown/popover overlay tint so it does not repaint the whole dock; unify
  popover→dropdown.
- **Files:** dock composables (`useDockState`, `useDockItemDrag`, `useDockHold`), the overlay
  triggers, `dock/overflow.css`.
- **π bar:** dock scrolls fluidly; an item drags; a dropdown does not recolor the dock; popover ≡
  dropdown alignment; both modes.
- **Folds:** L12, A2/A4-A12, R11/R12/R14.

### BG.W-CAST-CLIP-AA (the red-cast + corner-clip + AA)
- **Intent:** kill the red/maroon shadow-cast aliasing; clip card corners; fix dock bottom-left AA.
- **Approach:** re-tune `--glass-key`/`.cartoon-cast` off the intense-red drop-shadow to the warm
  whisper; ensure card `border-radius` clips content (`overflow`/`clip-path:inset(0 round)` survives
  HEAD); fix the dock corner AA (BF W-CORNER-AA never landed).
- **Files:** `src/styles/cards.css`, `src/styles/paper.css` (`--glass-key`), `src/styles/dock/*.css`.
- **π bar:** no red halo around docks; card top corners clip; no bottom-left dock aliasing; both modes.
- **Folds:** L3, R8 (corner aliasing), defect #3.

### BG.W-HERO-CLAMP + BG.W-SCROLL-SHRINK-REVIVE + BG.W-SCROLL-TOPBAR (page-chrome trio)
- **Intent:** hero headers not over-scaled; scroll-shrink titles revived; the top aberrative bar fixed.
- **Approach:** add the missing `--text-hero` responsive clamp (no off-page overflow); revive the
  `ScrollCard`/`ScrollCardHeader` register (dead live — re-verify the `--card-scroll` timeline
  wiring); fix/remove the `.demo-scroll-progress` top bar (L5).
- **Files:** `src/styles/typography.css`, `src/components/ui/card/ScrollCard*.vue`,
  `demo/layout/AppShell.vue:393`.
- **π bar:** /compositions/hero fits the viewport; titles scroll-and-shrink; no stray top bar; both modes.
- **Folds:** L4/L5/L10, defect #4/#5/#10.

### BG.W-VIZ-PREVIEWS + BG.W-DOTFLOW-REBUILD (the substrate band)
- **Intent:** /substrates previews work; dot-flow rebuilt to the density-vignette halftone.
- **Approach:** root-cause the broken preview wiring (canvas-resize regression); rebuild dot-flow as
  `mode="field"` (radial density gradient + in-place twinkle + content-mask) keeping `mode="flow"`.
- **Files:** `demo/stories/substrates/*.vue`, `src/components/custom/dot-flow-field/`.
- **π bar:** every substrate preview renders + animates; dot-flow edge-density > center-density,
  twinkle in-place; both modes.
- **Folds:** L6, batch2 C1-C6, C2(surpass), IOS27-REFERENCE T17.

### BG.W-CONTROL-DESHADCN + BG.W-CONFIGURATOR-REVIVE + BG.W-LANDING-LIVE-PREVIEW (the deshadcn + chassis)
- **Intent:** de-shadcn FORM (every reka default → glass-ui language); fix the configurator drawer;
  category cards show live REAL previews.
- **Approach:** the BE Band-9 de-shadcn sweep (gate-locked, `proof:de-shadcn`); fix the
  PresetEditor Sheet; make `SectionLanding` previews actually render (one-GL-budget frozen still).
- **Files:** the ui/ component CVAs, `demo/configurator/PresetEditor.vue`, `SectionLanding.vue`.
- **π bar:** no shadcn default form survives; the gear opens a working configurator; landing cards
  show a real specimen not an empty thumb; both modes.
- **Folds:** L7/L11, batch2 B1/B2/B4/B5, batch1 #4/#5/#6, R8-12, R10-5, BF R19.

### BG.W-JUBILANCE-WIRE + BG.W-SAFARI-VALIDATE + BG.W-FLIP-SPINE + BG.W-SPIKE-DELETE (the BE/BF debt)
- **Intent:** wire the dead jubilance engines; validate on Safari; consolidate the re-forks; delete spikes.
- **Approach:** wire `useHaptic`/`useCelebrationBurst` to real call sites (≥2 each or delete per
  overfitting law); fold the 5-way `useLiquidReveal` re-fork onto the spine; delete
  `useLiquidMorph.ts`; capture paired-engine Safari π.
- **Files:** `src/composables/motion/core/useHaptic.ts`, `useCelebrationBurst.ts`,
  `useBloomUp.ts`/`useLiquidReveal.ts`, the spike files.
- **π bar:** jubilance engines have ≥2 consumers or are deleted; Safari capture passes; no
  re-fork/spike survives; the overfitting audit = 0 orphans.
- **Folds:** BF R16/R17/R18, Theme 7/8.

### BG.W-AURORA-METALLIC + BG.W-SIRI-ISLAND (the NEW desired capabilities — separate triumvirates)
- **Intent:** the DESIRED metallic aurora (opt-in viz); the Siri glass island + waveform.
- **Approach:** metallic = the W-AX-METAL-GLOW + metal-shimmer over the generative aurora field (an
  opt-in viz register, NOT the page field); Siri = a triumvirate that COMPOSES GlassDock +
  `useDockFission`/`DynamicIslandCall` for the descending island + a warm waveform viz.
- **Files:** `src/components/custom/aurora/`, `src/styles/utilities/metal.css`,
  `demo/stories/dock/examples/DynamicIslandCall.vue` + a new Siri composition.
- **π bar:** the metallic aurora reads as pure-metal + gradient-sparkle; the Siri island descends,
  morphs, answers, with the amber waveform; both modes + Safari.
- **Folds:** C1, L14, the Siri references.

---

## SUMMARY — the BG carry-forward

**The matrix verdict:** of ~70 de-duplicated requests, roughly **DONE: 8 · PARTIAL: 30 · REGRESSED:
18 · DEFERRED: 11 · DROPPED: 2 · NEW: 1**. The shipped 4.2.0 is **assembly- and verification-bound,
not primitive-bound** — almost every engine exists; the failures are wiring, over-correction, and a
release gate that never measures paint. BG must be an INTEGRATION + VERIFICATION tranche led by
**BG.W-PAINT-IS-THE-GATE** (the structural cure), with the rest closing every REGRESSED/DEFERRED row
against a HEAD-verified, fresh-capture gestalt bar — the accountability table (this file) the
binding artifact through the close.
