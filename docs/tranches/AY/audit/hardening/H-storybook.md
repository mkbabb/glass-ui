# H-storybook — adversarial hardening of the storybook prune + restructure lane (AY.W-SB1/2/3)

RED-TEAM of the storybook prune/restructure waves against HEAD (`at-dock-convergence`,
`fba6262`). Scope: the corpus §B11 "wtf is X" route list, the W-SB1/2/3 wave authoring, the
sidebar/dock IA, and the speedtest-ownership boundary.

VERDICT: **GAPS-FOUND + UNDER-SPECCED.** The W-SB waves are NOT authored — they are one-line
rows in `AY.md §2 Band C`; there is no `docs/tranches/AY/waves/` dir at all. Worse, the
one-line scope they DO carry is materially STALE: roughly half the named routes were already
actioned in AX (disco-glyph/glyph-face excised, slider zoo collapsed, blob consolidated to one
page, speedtest boundary locked, useTokenColor deliberately kept), and the gates the waves
claim as their hard gates (`proof:no-orphan-demo-route`, `proof:speedtest-boundary`,
`proof:storybook-ia`, `proof:slider-two-only`, `proof:story-language`, `proof:storybook-complete`)
ALREADY PASS at HEAD. A wave authored to its current AY.md text would re-litigate settled
dispositions and "remove" routes that do not exist.

---

## §1 — Structural ground truth (what the storybook IS at HEAD)

- The storybook is **manifest-driven** (`demo/stories/manifest.ts` is the single source of
  truth; `demo/router.ts:11-50` derives every route from `CATEGORIES`). There are **no flat
  standalone routes** and **no orphan SFCs**: 124 SFC files ↔ 124 manifest rows, exactly 1:1
  (verified `proof:no-orphan-demo-route` PASS — 12 categories, 124 rows, 124 files).
- IA = 12 categories (foundations, substrates, forms, display, containers, navigation, dock,
  data, feedback, motion, compositions, composables-reference). `proof:storybook-ia` PASS
  (0 single-story bins, 0 missing SFCs). `proof:storybook-complete` PASS (74 component exports
  → 0 undemonstrated, with a deliberate 5-entry composed-by allowlist). `proof:story-language`
  PASS (142 SFCs, 0 meta-language hits).
- The SidebarDock (`demo/layout/SidebarDock.vue`) is a **category rail** — it lists the 12
  categories at top level only (primary + a Composables reference shelf below a `<DockSeparator>`,
  `SidebarDock.vue:55-56,130-170`). It does NOT render per-story sub-nav, so "sidebar sections
  restructure" reduces to a manifest-CATEGORIES exercise, not a layout-shell exercise.

**Implication for the wave author: the prune is NOT "delete files / remove routes." Every
route already maps 1:1 and every export already has a story. The real work is (a) per-route
KEEP/FIX/RE-SECTION DECISIONS, and (b) closing the handful of genuinely-open items below —
NOT a structural cull. The AY.md W-SB1 framing ("remove header-ribbon/glyph-face/disco-glyph
routes") is the wrong verb for the actual state.**

---

## §2 — Per-route triage (the corpus §B11 list, decided against HEAD)

The §B11 list derives verbatim from `docs/tranches/AX/audit/USER-DEFECTS-2026-06-08.md` (D1-D19).
Disposition of EACH named route:

| §B11 route / item | HEAD reality | DISPOSITION | open? |
|---|---|---|---|
| `header-ribbon` (REMOVE) | live route `navigation/header-ribbon.vue`; `HeaderRibbon` is a public export + ships `/header-ribbon` subpath (`package.json:312`). **Only consumer is its own demo story** (grep: 0 binary consumers in demo/slides). | **DECIDE: retire the component+subpath+story (fails ≥2-consumer bar) OR formally book it with a documented keep + a 2nd consumer.** The corpus says REMOVE; the ≥2-consumer invariant agrees. NOT YET ACTIONED. | **OPEN** |
| `native-top-layer` (FIX/REMOVE) | live route `containers/native-top-layer.vue`; manifest blurb itself says "Folds into Dialog as a `:native` opt-in (FIX-ROUTE)" (`manifest.ts:188`). The fold has NOT happened — it is still a standalone capability-probe page. | **FIX: fold the native `<dialog>`/`commandfor`/`interestfor` demos into the Dialog + HoverPopover stories as a `:native` opt-in section; retire the standalone route.** NOT ACTIONED. | **OPEN** |
| `glyph-face` (REMOVE) | **DOES NOT EXIST.** Excised in AX.W19 (commit `509aed8`: "excise … disco-glyph + glyph-face"). No file, no route, no src component. | **ALREADY DONE (AX.W19).** | closed |
| `disco-glyph` (REMOVE) | **DOES NOT EXIST.** Same commit `509aed8`. | **ALREADY DONE (AX.W19).** | closed |
| `metric-badge` vs `metric-pill` (reconcile) | both live (`display/metric-badge`, `display/metric-pill`). `MetricPill` (`src/components/ui/metric-pill/MetricPill.vue`) is a `MetricBadge` composition (`labelPosition=stacked`+`density=spacious`+`size=lg` baked); manifest blurb states "Not a parallel primitive" (`manifest.ts:175`). | **KEEP both, RE-SECTION: the reconciliation is doc-true but the IA still presents them as two sibling Display rows. Co-locate (one "Metric primitives" sub-section, badge → pill-as-composition) so the "wtf, two metric things" reading is resolved visually, not just in a blurb.** PARTIAL. | **OPEN (minor)** |
| `configurator-as-primitive` | the only `configurator` route is `compositions/configurator` (`manifest.ts:296`); there is NO `/primitives` or stray top-level configurator route. It IS correctly a Composition. | **ALREADY CORRECT.** The §B11 complaint ("configurator is not a primitive") is satisfied — but the BLOCKING D1 defect (the configurator design is NOT idiomatic glass-ui, hand-rolled chrome) is a SEPARATE concern that belongs to the aurora-configurator-redesign lane, NOT this prune. Flag the conflation. | closed-here / forwarded |
| `glass-panel` (quality) | live `substrates/glass-panel`; manifest distinguishes it from `glass-material` ("a substrate, not a UI primitive", `manifest.ts:142`). D8 ("glass-material totally broken") is gated GREEN now (`proof:glass-material-demo`/`-sota`/`-unified` exist). | **KEEP, VERIFY: confirm glass-panel renders cleanly post-AX glass-material overhaul; capture a live DELTA (the cardinal lesson). Not a prune target.** | **OPEN (verify-only)** |
| `card-toggles` (broken) | `display/card.vue` — the shadow/grain `<Switch>` toggles ARE reactive (`card.vue:62-63` refs → `:shadow`/`:grain` bound `:127-128`); the inline comment notes "the toggles already function; this closes the perception gap" by staging the tier matrix over an Aurora backdrop (`card.vue:116-121`). | **LIKELY ALREADY FIXED** (the toggles work + the perception gap is addressed). **VERIFY with a live capture** — the §B11 "broken" claim predates the Aurora-backdrop staging. | **OPEN (verify-only)** |
| `icon-button-token-ladder` (stray route) | **NO such route.** `TokenLadder.vue` is a demo chassis primitive used only inside foundations stories (chart-chassis-palette / surface-tints / overlays-scrims). There is no standalone "icon-button-token-ladder" route to remove. | **NOTHING TO REMOVE** — the named route does not exist; the concern is likely a stale reading of a foundations sub-section. | closed |
| `use-token-color` (stray route) | live ONLY in the reference Composables shelf (`manifest.ts:311`), collapsed below the fold. AX.W19 commit `509aed8` explicitly: "**keep useTokenColor (constellation consumer)**". | **ALREADY DECIDED — KEEP (≥2-consumer bar met; deliberate AX retention).** The §B11 "stray route" framing is stale; do NOT remove. | closed |
| `drawer-live-behind` (placement) | live `compositions/drawer-live-behind` (`manifest.ts:295`). It IS a composition (detented non-modal sheet over a live surface), correctly placed in Compositions, not Containers. | **KEEP as a Composition** — placement is defensible (it's a pattern demo, not the base Drawer primitive which lives in Containers). Optionally cross-link from the Drawer story. | closed / minor |
| `carousel-progress` (bar broken) | **CONFLATION.** The `navigation/carousel` story uses `<CarouselPager>`+`<CarouselDots>` (working, `carousel.vue:70-71,112-114`) — there is NO "progress bar" in it. The actual progress concern is `navigation/deck-progress` (`DeckProgress` + `.glass-progress-rail`), which is the slides bottom rail corpus #5 says must NOT be baked into the dock. `DeckProgress` is NOT baked into the dock (grep of BottomDock + dock/ src: clean). | **DISAMBIGUATE in the wave: (a) carousel pager/dots — verify live; (b) deck-progress — confirm it stays a page element (corpus #5), already satisfied. Two distinct routes, do not merge.** | **OPEN (disambiguate + verify)** |
| `scattered-dock` (dock items across sections) | GlassDock/DockIconButton appear in **8 stories beyond `dock/`**: `aurora/AuroraConfigDock`, `compositions/instrument-chassis`, `data/search`, `display/dark-mode-toggle`, `display/metric-pill`, `foundations/chart-chassis-palette`, `navigation/header-ribbon`. | **TRIAGE each: most are LEGITIMATE compositions-of-dock (a dock hosting other controls is a valid demo), but `dark-mode-toggle`/`metric-pill`/`chart-chassis-palette` using a dock as mere staging chrome is the "scatter" the user means. Decide per-site: keep-as-composition vs. de-dock the staging. The canonical dock demos stay in `dock/` (overview/layers/rail).** PARTIAL. | **OPEN** |
| `sidebar-sections` (audit; where are aurora/blob?) | aurora/blob ARE present: `substrates/aurora` + `substrates/blob` (`manifest.ts:138-139`), and the SidebarDock surfaces the Substrates category. blob consolidated to ONE page (D6 satisfied — `ls substrates/` = single `blob.vue`, no blob-mood/blob-interaction split). | **ALREADY ADDRESSED** (aurora/blob discoverable in Substrates; blob consolidated). The "where are aurora/blob" complaint is stale. Optionally verify the Substrates category icon/ordering reads well. | closed |
| `speedtest-primitives` (do NOT belong; move ownership) | `proof:speedtest-boundary` PASS — the 8 speedtest-origin composables STAY-as-CORE, **MOVED→speedtest = 0**. metric-cell/metric-stack/scrolling-text are documented core (CLAUDE.md: "speedtest consumer", ≥2-consumer bar met). | **ALREADY ADJUDICATED — KEEP as core (gate-locked).** The wave must NOT re-open this; the boundary decision is made. The §B11 "move ownership" instruction is SUPERSEDED by `proof:speedtest-boundary` (AV.W17). Flag the corpus item as RESOLVED-AGAINST (kept, not moved). | closed |

---

## §3 — The headline findings (what is WRONG / MISSED / UNDER-SPECCED)

**F1 — The W-SB waves are UNAUTHORED.** There is no `docs/tranches/AY/waves/` dir. W-SB1/2/3
exist only as one-line rows in `AY.md:79-81`. Per `TRANCHE-AND-WAVE-SPEC.md` a wave needs a
defect→objective→edit-sites→evidence-backed-HARD-GATE spec; none exists. This alone is a
BLOCKER for the lane.

**F2 — The W-SB scope is STALE (the chronic re-litigation trap).** Approx half the §B11 list
is already actioned at HEAD: disco-glyph/glyph-face excised (AX.W19), useTokenColor kept
(AX.W19), blob consolidated to one page (D6/AX.W18), speedtest boundary locked
(`proof:speedtest-boundary`), the slider zoo already collapsed to `standard`+`spectrum`
(`src/components/ui/slider/index.ts:22-24`, gate `proof:slider-two-only`). A wave authored to
the AY.md text would "remove" routes that don't exist and "reconcile" things already reconciled.
The wave-spec MUST re-baseline route-by-route per §2 above before prescribing a single edit.

**F3 — All claimed hard gates ALREADY PASS.** `proof:no-orphan-demo-route`,
`proof:speedtest-boundary`, `proof:storybook-ia`, `proof:storybook-complete`,
`proof:story-language`, `proof:slider-two-only` are all GREEN at HEAD. A wave whose hard gate is
already green is mis-specced — it has no convergence signal. The W-SB waves need NEW gates that
bind the ACTUAL open work (F4-F7), not the already-passing structural gates.

**F4 — header-ribbon fails the ≥2-consumer bar and is unresolved.** `HeaderRibbon` is a public
export + `/header-ribbon` subpath, demonstrated only by its own story; 0 binary consumers
(demo/slides). Per the visual-load-bearing invariant (L invariant 8) it must be retired-with-
rationale OR booked with a trigger + a 2nd consumer. The corpus explicitly says REMOVE. This is
a clean-break decision the wave must MAKE (retire component + subpath + `package.json` entries +
story), not defer.

**F5 — native-top-layer is a self-acknowledged FIX-ROUTE that was never executed.** The manifest
blurb (`manifest.ts:188`) literally says "Folds into Dialog as a `:native` opt-in (FIX-ROUTE)"
— the fold has not happened. The wave must fold the native `<dialog>`/`commandfor`/`interestfor`
+ HoverPopover-`:native` demos into the Dialog/HoverPopover stories and retire the standalone
capability-probe route.

**F6 — "scattered dock" needs a per-site decision, not a blanket move.** 8 stories outside
`dock/` host a GlassDock. Most are valid compositions; the staging-chrome cases
(`dark-mode-toggle`, `metric-pill`, `chart-chassis-palette`) are the genuine scatter. The wave
must triage each site (keep-as-composition vs de-dock) — there is no single gate that captures
this without an enumerated allowlist.

**F7 — The corpus conflates two distinct concerns the wave must disambiguate:**
(a) `carousel-progress` is actually the carousel pager/dots (working) vs the separate
`deck-progress` page rail (corpus #5, already a page element, not dock-baked); (b) the D1
configurator-design defect (a blocking aurora-configurator-redesign concern) is NOT the same as
"configurator is not a primitive" (already satisfied — it IS a Composition). The wave must not
fold D1 into the prune.

**F8 — metric-badge/pill reconciliation is doc-only, not IA-true.** Both still present as two
sibling Display rows; the "two metric things" reading persists visually even though the blurb
says "not a parallel primitive." The fix is a Display sub-section co-location, not just a blurb.

**F9 — language/cardinal-lesson exposure.** W-SB3 ("consistent animation/design/interaction
language across EVERY story") has NO evidence-backed gate beyond the prose "a cross-component
language audit passes." That is not a gate. AND any "fixed" route (card toggles, glass-panel,
carousel) must close on a CAPTURED live DELTA (the cardinal lesson), which the AY.md rows do not
mandate.

---

## §4 — CHRONIC misses (carried ≥2 passes/tranches)

- **The named-route prune SPECIFICS** (corpus item #11, AUDIT-LEDGER §B11 marked PARTIAL): "AX
  W18 IA restructure landed; the specific route-prune list … NOT all actioned." Carried AX→AY.
  Still unauthored.
- **header-ribbon disposition** — the ≥2-consumer overfitting bar has not been applied to it
  across AX→AY despite the standing overfitting-audit precept.
- **native-top-layer FIX-ROUTE** — flagged in the manifest blurb itself (a self-aware deferred
  TODO baked into the source), uncashed across the IA restructure.

---

## §5 — Fold-into routing

- **F1/F2/F3 → AY.W-SB1 (re-author + re-baseline).** Promote W-SB1 from a one-line row to a full
  wave spec; re-baseline its scope to the §2 disposition table (close the already-done, action
  the OPEN).
- **F4 (header-ribbon retire) → AY.W-SB1** (clean-break retire) — coordinate with the
  overfitting-audit close (Band E W-CLOSE1).
- **F5 (native-top-layer fold) → AY.W-SB1.**
- **F6 (scattered dock triage) → AY.W-SB2** (restructure / section coherence).
- **F7 (carousel/deck-progress + configurator disambiguation) → AY.W-SB2** (and forward D1 to the
  aurora-configurator lane, NOT here).
- **F8 (metric badge/pill co-location) → AY.W-SB2.**
- **F9 (language gate + live-DELTA mandate) → AY.W-SB3** (author a real gate; require captures).

---

## §6 — Convergence criteria (the acceptance bar for "perfected storybook")

The lane is DONE when:
1. Every §B11 route has a RECORDED disposition (the §2 table promoted into the wave spec) — no
   route left as "wtf."
2. The OPEN items are actioned: header-ribbon retired-or-booked; native-top-layer folded into
   Dialog/HoverPopover; scattered-dock sites triaged with an enumerated keep/de-dock decision;
   metric badge/pill co-located; carousel/deck-progress disambiguated.
3. The already-done items are CLOSED-WITH-EVIDENCE in the spec (disco-glyph/glyph-face excised,
   useTokenColor kept, blob consolidated, speedtest boundary locked, slider zoo collapsed) so the
   wave does not re-litigate them.
4. A NEW gate binds the open work (e.g. `proof:no-orphan-demo-route` extended with a
   retired-export check + a "no dock outside an allowlisted composition" assertion + a
   native-top-layer-route-absent assertion), GREEN — not the already-passing structural gates.
5. Every FIX/VERIFY route (card toggles, glass-panel, carousel pager) closes on a CAPTURED live
   DELTA screenshot, not a prose claim.
6. W-SB3 carries a real, machine-checkable language-consistency assertion (e.g. every story
   composes the shared `StoryPage`/`StorySection`/`ShowcaseFrame` chassis + the canonical spring
   tokens), not "an audit passes."
