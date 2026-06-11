# AZ tranche — PROGRESS

The dock-redesigned-from-first-principles tranche: 24 waves over 8 bands (6 Dock, 2
Register, 2 Blob, 2 Motion, 2 Shell, 3 Design, 3 cross-repo, 4 hygiene+close), grounded in
the user's round-3 live audit (`audit/USER-AUDIT-2026-06-10-R3.md`, 15 binding items) and the
32-lane deep audit (`audit/FLEET-DIGEST.md`, 374 findings). Base **tranche/AY @ v3.10.1** (the
AY close cut, published with provenance). **NO implementation has begun — this tranche is in the
AUTHORING phase; the wave specs are the deliverable until the user greenlights (AZ invariant 2).**

The cardinal-lesson forcing function is inherited from AY: `proof:live-verified-ledger` is
tranche-parameterizable and reads the home this PROGRESS lives in. AZ.W-GATES (Batch 0) migrates
the freshness model OFF git-ancestry onto a content-hash of the declared surface files (AZ
invariant 4 — an unrelated commit to a shared file no longer re-stales every dock DELTA) and
re-persists the AY-pathed visual ledger against the AZ home. Until W-GATES lands, `proof:all`
is CRASHABLE at HEAD (the malformed `gates.mjs:689-691` row) — no downstream wave's local
`proof:all` can green.

**Binding done-definition + run order: [`EXECUTION-DAG.md`](./EXECUTION-DAG.md).** The DAG is
the source of truth for the wave SET, the 7-batch order (Batch 0 → Batch 6), the five user-domain
hinges (H1 de-red scope, H2 dock taxonomy, H3 luma observer default, H4 morph architecture, H5
the deploy creds), and the W-ADOPT early-run option. "Done" is the DAG's close-criteria GREEN
with falsifying gates, NOT a row count.

## Status legend (the reconciled vocabulary, inherited from AY; `(DEVELOPED)` stays RETIRED)

- `planned` — spec authored or not yet authored; no code landed. `planned (spec authored)` marks
  a wave whose tranche-format wave-doc exists under `waves/` (Status: SPEC) but is unbuilt. Every
  AZ wave is `planned` until the user greenlights; the authored rows are `planned (spec authored)`.
- `in-progress` — code landing.
- `dev-complete` — the device-free gates closed GREEN; no live DELTA owed (a NON-visual wave — a
  doc/gate/decision/taxonomy-rename wave that changed no pixels, OR a cross-repo gate wave whose
  effect is a deletion proof + import resolve, not a render).
- `live-pending` — the device-free gates closed GREEN but the binding on-disk `.png` DELTA capture
  is OWED (a visual wave whose code landed but whose own-surface capture has not been written), OR
  the real-device audit surfaced a CONTRADICTION (the wave RE-OPENS until the live truth is GREEN
  — the re-open rule below).
- `live-verified` — GATE-DEFINED (a fresh on-disk own-surface capture exists at ≥2 viewports ×
  {light,dark}, matched to the wave's own surface, with a π readback where the criterion is a
  measured ratio/geometry), never author-asserted. A visual wave is "done" ONLY at this state. The
  cardinal lesson: a green headless proof over a black/broken live canvas is NOT done; `complete`
  never collapses to `headless-green` (MEMORY `feedback_live_verify_capture`).
- `complete` — a non-visual wave whose device-free gates closed GREEN. A `complete` wave that
  CHANGED PIXELS adds its wave-id to the AZ visual allowlist and is then held to the SAME
  own-surface DELTA bar as `live-verified` (the gate covers `complete`, so no visual wave hides
  behind the token).

**The re-open rule (the R3 precedent that BUILT this tranche):** a real-device contradiction
re-opens a wave the close had marked `live-verified`. AY closed four bands as live-verified that
the R3 audit re-opened in person (the dock rail, the morph flicker, the dock-over-light
illegibility, the blob page). A row that re-opens drops from `live-verified` back to `live-pending`
and names the mechanism finding (AZ invariant 3: re-opened ≠ rebuilt-blind — the lane starts from
the fleet's root-cause, never a fresh diagnosis).

**The DELTA-owed contract:** every `live-pending` row owes a captured before/after `.png` to the
AZ visual home before it can flip to `live-verified`; an allowlisted `complete` row owes the same
own-surface light+dark capture. The capture IS the close criterion. The visual home + the
`proof:live-verified-ledger:az` parameterization are stood up by AZ.W-GATES (Batch 0).

## The wave board (24 roster waves; run order is `EXECUTION-DAG.md §3`, NOT alphabetical)

The Status column reflects each wave's reconciled state. The Grounding column carries the
FLEET-DIGEST finding ids + the R3 user item the wave closes; the Batch column is the
EXECUTION-DAG position. The AZ waves are NET-NEW relative to a build — the board fills as waves
roster-named here but un-authored; the authoring phase is INCOMPLETE until each gains a spec.

| Wave | Band | Grounding (finding ids · R3 item) | Batch | Status |
|---|---|---|---|---|
| W-GATES | Z | B5-1 (the malformed `gates.mjs:689-691` crash), F3-4, B5-2/3/4/5 (route/port/shader-split/freshness), D7 (font-cascade-live moved-token-file false RED — AY-§3 residual, not in FLEET) | 0 | dev-complete — D1-D7 discharged: the malformed-row crash GONE, parity pre-pass hardened born-RED, the :5173→:5199 sweep zeroed (4 scripts + playwright config), /dock/layers re-point, the blob shader-split gates wired+GREEN, the content-hash freshness model live (3 AY DELTAs re-stamped FRESH), the :az ledger arm + AZ allowlist minted, R6 re-persisted; proof:gate-manifest-sound authored born-RED; clause-3 bash-3.2 local env limitation recorded (greens on CI) |
| W-DOCK-RAIL | D | C1-R3-1-indicator-glass-plate, C1-R3-1-rail-fused-gutter, F2-R3-1, D6-1, A1-1 · R3-1 | 1 | live-verified — the hairline register: indicator token-wins (TabsIndicator surface-gate, :surface=false), the surface-tint-8 plate retired → transparent + the --dock-layer-rail-divider hairline, the svg floored 16px (the 4px sliver killed), rail-active → --glass-bg-floating; proof:dock-rail-hairline born-RED(7)→GREEN + the π /dock/layers DELTA (light 6.51:1 / dark 5.25:1 AA) |
| W-DOCK-FLICKER | D | C2-1/C2-2 (mechanism), C2-7, D5-7 (S1), F2-R3-3 (refuted-as-literal) · R3-3 | 1 | live-verified — the collapse-onset scale-pop + FLIP-thrash killed at the paint-order seam (.collapsed:hover scale gated :not([data-morphing]) + the useDockState intent-dwell + edge-sweep recheck); proof:dock-no-scale-pop born-RED→GREEN (W1/W2 source + W3/W4 live + the C2 561-frame self-test) |
| W-ADAPTIVE-AUTO | R | C5-2..C5-10, B3-1/B3-2, E3G-4, F2-R3-7, A5-1 (modal-scrim double-wrap, Arm-3 sweep) · R3-7 [H3] | 1 | live-verified — Arm1 the unconditional self-engage (dock + content tiers; the substitution trap fixed on the collapsed endpoint + rail; muted→fg lift; AA floor 18→20%), Arm2 useGlassBackdropLuminance default-ON dock (H3-a; writes --glass-backdrop-luma), Arm3 the in-situ π 36/0 + the A5-1 modal-scrim fix; proof:adaptive-glass-live + proof:adaptive-observer GREEN |
| W-REGISTER-IOS | R | C4-hover-register, D6-2, D3-2 · R3-6 [H1] | 1 | live-verified — the de-red (H1-a): --dock-selected-accent (oklab fg 14% luminance-lift, auto-flips) + --dock-control-press-bg minted at the root; the demo --viz-fourier interactive overrides retired; red survives as wordmark/viz/CTA ink only; proof:register-ios 12/12 + the π 20/20 light+dark |
| W-DOCK-TAXONOMY | D | C1-R3-2-taxonomy-overload, E2-3, E3G-2, C1-dock-api-inventory · R3-2 [H2] | 2 | live-verified — arm (a): ONE GlassDock, ONE orientation axis (the variant discriminant removed → ONE DockProps; rail-ness = orientation="vertical"; instrument-strip removed, 0 consumers; the vertical force-pin lifted — vertical morphs height 104→334px captured light+dark); .dock-layer-rail the only surviving rail noun; proof:dock-taxonomy born-RED(T1+T2)→GREEN; MIGRATION rows staged |
| W-RAIL-EXTEND | D | E3G-1 (net-new GAP S1), C1-R3-2-hairline-rail-netnew · R3-2 | 2 | live-verified — the net-new <DockRail> facility: the --border-hairline whisper running 39px BEYOND the dock edge with the end-icon switching layer context; the #rail slot escapes the morph clip (persists on collapse); 2 demo consumers; proof:rail-extend born-RED(5)→GREEN + the π captures |
| W-DOCK-NORMALIZE | D | C3-DOCK-CENSUS-SHELL, C3-NORMALIZATION-SCOPE (the 26-dock census) · R3-5 | 2 | complete — the re-census found ZERO divergent nav docks (the fleet target was the overflow-wrap FEATURE demo; the no-op recorded honestly per the HC ruling); the gate-extension landed: shell rows promoted pendingW40→STRICT, the FEATURE_EXEMPT positive contract, the W5 census-CLOSURE (7 dock-bearing SFCs each on exactly one list, born-RED ×4) |
| W-DOCK-CONTEXT | D | E3G-7 (absent contextual facility), C1-R3-14-contextual-layers-absent, E3-gaps · R3-14 | 2 | live-verified — the page-driven contextual layer seam: CONTEXT_LAYER_MAP (11 contexts, 26 facet layers) + useContextualDockLayers (route.meta.categoryId indexed); BOTH shell docks render the seam (BottomDock route-driven DockLayerGroup; SidebarDock secondary facet group); proof:dock-contextual-layers born-RED→GREEN |
| W-BLOB-PAGE | B | C6-1/F2-R3-9-pixelation (REFUTED — GL crisp), C6-2, C6-3, C6-4 · R3-9 | 3 | live-verified — the TRUE surfaces fixed (GL refuted-closed, untouched): the WatercolorDot filter device-px-crisped (fling-specks 7-21→0), the satellites orbit 0.17→0.30 past the body (CV 0.026→0.057, intermittent separation, containment held), hero-first IA; proof:blob-page (3/3 live) + proof:blob-page-fence (device-free, ci) born-RED→GREEN |
| W-BLOB-STUDIO | B | C6-5, C6-6, C6-7, C6-8, C6-10, B1-W-BLOB-GLASS (folded) · R3-10 | 3 | live-verified — stage-fill re-based (π 1.246), the circular merge-bridge (identity-preserved: the studio seeds 0.06, the library default smoothK stays 0.05), the geometry/satellite live knobs, the two-rung gel-dome shadow; the uBackdrop refraction CONDITIONS-UNMET (the enamel stands — the user conditional honored); proof:blob-studio + proof:blob-studio-config born-RED→GREEN |
| W-MOTION-SUITE | M | B4-1/B4-2/B4-3/B4-4, C7-2/C7-3, D5-4, E1-7/C7-5 (ppmycota demo-local) · R3-11 | 3 | live-verified — the FULL curve canon (value.js + keyframes + steps + the editable bezier), the spring fork KILLED onto SPRING_PRESETS, the scroll/VT facilities demoed, ppmycota demo-local; proof:motion-demo born-RED→GREEN + the π captures both modes |
| W-SHELL-CONFIG | S | C3-GEAR-WIRING, C3-GEAR-MISSING-AXES, C3-DARKTOGGLE-PLACEMENTS, C3-COMPOSABLES-VIEW, E1-10 · R3-4 | 3 | live-verified — the FAB dead, the gear opens the re-framed glass-ui demo Configurator (the PresetEditor surface) with the dark Switch at TOP + --glass-level/--ui-scale/PRM axes threaded through the store (the scale writes GLOBAL --ui-scale); proof:shell-config born-RED→GREEN |
| W-SHELL-IDENTITY | S | C8-R3-12-a (MEASURED), C8-R3-15-b (ink-mass offset MEASURED), C1-R3-12-foundations-logo-corroborate, F2 · R3-12, R3-15 | 3 | live-verified — the ℱ IS the Foundations entry (Compass dup dropped) + DockSeparator + 2rem; the ink-lean RE-MEASURED at HEAD (+2.63/+3.75, the transform-removed dpr-4 baseline — not the stale authoring seed) and nudged within ±0.5px; the glass hover register; proof:shell-identity born-RED→GREEN |
| W-MORPH-SHOWCASE | M | C8-R3-13-engine/-goo/-w42/-archA/B/C, C1-R3-13-axis-morph-absent, E3G-3, B1-W-LIQUID (folded) · R3-13 [H4] | 4 | live-verified — the V↔H morph: useLiquidFlex (the W-LIQUID fold, 2 consumers — the dock orientation morph + the tab indicator byte-identical) + useDockOrientationMorph on ONE scalar (deterministic, bidirectional, PRM-snap); HG5 DECIDED MECHANICALLY — arm-a missed the 4×-throttle budget (p50 13.7-15.1ms) → arm-c VT-crossfade SHIPPED (p50 7.7-8.1ms), the teardrop a perf-gated preview BOOKED; proof:morph-showcase born-RED→GREEN |
| W-HIERARCHY | G | D1-1..D1-10 (7 findings headline), D6-3 · R3-8 | 4 | live-verified — the canonical section-heading rung (the 3-pattern divergence killed → 20.4px), the inverted-scale/double-h1/skipped-rung D1 set closed, the Configurator hierarchy vocabulary (3 named tokens, spatial preset-row lift); proof:hierarchy born-RED(6)→GREEN + the π readback 2vp×2modes |
| W-SUFFUSE | G | D2-typography, D3-color-pop, D4-glass/grid/math thin-spots | 4 | live-verified — the D2 hero display-h1 on the starved substrate pages (67.78px π), the D3 one-color-event map (--motion-accent; the last 2 --viz-fourier strays re-pointed), the D4 thin-spots, the motion reveal discipline PRM-guarded, each item with its restraint counter; proof:suffuse born-RED→GREEN |
| W-METRIC-UNIFY | G | E2-1, E2-3 (the `amount \|\| placeholder` zero-value bug; ConfiguratorRow vs LabeledField) | 4 | live-verified — coalesceMetric (the ONE empty-check: a valid 0 renders 0), all four Metric* consume it, the amount→value clean break (MIGRATION staged; the speedtest surfaces unchanged); proof:metric-core born-RED→GREEN |
| W-CARVE | Z | the chronic central-CSS rows (dock-controls.css 636, theme.css 530; the 2 ratchet rows) | 5 | complete — the two central-stylesheet ratchet rows DRAINED (RATCHET_BASELINES → the booked Batch-3/4 trio only); the @import-root carve + 9 partials all <500; ~23 reader gates on the composed read; dist byte-isomorphic |
| W-PRUNE2 | Z | E4 (4 candidates incl. status-dot 1-consumer), B1 books (W-AUR-T5 Kuwahara, W-LIGHTHOUSE) | 5 | complete — the E4 verdicts executed (incl. the rainbow-vivid KEEP re-confirm — keyframes binds them; H6/H7 arms a); THE RESTORE: header-ribbon + glass-panel back as published surfaces (the census missed the live keyframes consumer; evidence docs wired; the MIGRATION claim narrowed; proof:glass-panel-tiers restored GREEN); census-as-of model landed |
| W-KF-CONSUMER | X | B4-5 (S1 — the phantom `/header-ribbon` + `/glass-panel` subpaths), B4-7 (pin census) | 5 | complete — fourier 8 phantom-class re-points (the silent-unstyled → styled rungs, captured) + the bbnf hard-alias removal → proof:resolution CLOSED exit 0; the keyframes arm honestly DROPPED (the scope-reveal: the registry lineage re-published the subpaths; the consumer resolves clean — the restore ruling supersedes) |
| W-CON-GEN | ad-hoc (R5-6, the triumvirate) | the slides wish-list | 4 | live-verified — 5/6 items ADDITIVE default-OFF on the protected quintet (pin, accent edges, palette knobs, pinned drift, auto-release + settled signal); G4 labels SPEC'D-NOT-BUILT (no 2nd consumer — the honest book); proof:constellation-gen born-RED→GREEN + the live spec |
| W-BLOB-REDRESS | ad-hoc (the reflect loop) | the blob reflection misses M1 (the studio bead 0×0 on the 390px coarse viewport — the configurator grid-track collapse) + M2 (the raw-camelCase double-label leak, 11+4 rows) | 6 | live-verified — M1 root-fixed in `Configurator.vue` (the single-column band gains an explicit `minmax(var(--configurator-stage-min),auto)` stage track, desktop byte-unchanged; + the bead wrapper re-based to a true square `min(78%w,78%h)`); M2 wired the existing `hideLabel` seam on BOTH leaking consumers (raw key → the `name` mono slot, ONE human label; the aurora studio was already correct); live π: canvas 0×0→300×300, 0 raw-key labels (was 15), 0 console errors; proof:blob-render 3/3 + blob-warm-default 2/2 GREEN on coarse-touch (both FAILED pre-fix) + desktop unregressed + proof:blob-studio-config + proof:hierarchy + typecheck 0; the W-BLOB-REDRESS-DELTA.md mobile light/dark pair (hash-fresh; the defect was mobile-scoped — the desktop truth rides the standing blob DELTAs) |
| W-RAIL3 | ad-hoc (R6, the triumvirate) | USER-AUDIT R6-1/R6-2 (the third rail failure: box inflation, orphan indicator, clipped rotated label, invisible hairline) | 6 | live-verified — the contextual facets MOVED OUT of the dock body (the in-dock `DockLayerGroup` ~2× inflators DELETED from both shell docks) onto the `<DockRail>` floating-carousel chip strip OUTSIDE the box on a visible connective hairline; DOCK BOX INVIOLATE (π deltaW=deltaH=0 rail-mounted vs removed; sidebar 115→59px, bottom 578×111→235×55); axis-aware (column beside the vertical dock, row ABOVE the bottom dock); the rotated label + orphan indicator buried; the dead `entries` prop clean-broken onto `items: DockRailItem[]` (zero consumers lost); proof:rail3 born-RED→GREEN R1-R6 + π 10/10 (2 viewports × 2 modes × fine+coarse) + the dock fleet GREEN + 93/93 units + typecheck 0; W-RAIL3-DELTA.md + the rail3/ capture set |
| W-MOTION2 | ad-hoc (R7, the triumvirate) | USER-AUDIT R7-1/R7-2/R7-3/R7-4 (the curve gallery: muted register, hairline strokes, cramped picker, no keyframes isomorphism) | 6 | live-verified — the 0..1-frame 3px non-scaling stroke, the dead `--surface-tint-1/-2` reads re-pointed to defined rungs (the transparent-backplate BUG), the picker on `variant="underline"` at the section rung with `:responsive`, curve-families rebuilt 1:1 to the keyframes canon (12 families: +CSS keywords, +smooth-step-3, +Linear(), springs own family, hyphen register), the `background:"grid"` calm substrate; proof:motion2 born-RED→GREEN 14/14 + the π 11/11 + proof:motion-demo parity 17/17 + the light/dark DELTA pair (W-MOTION2-DELTA.md, hash-fresh); G7 live-steps generator → W-MOTION3 |
| W-REFLECT | Z | the USER EDICT 2026-06-11 (the per-surface reflection completion bar + the mid-tranche triumvirate redress loop) | 6 | planned (spec authored) |
| R5-TAP | corrective | R5-3 (the slides consumer replay) | 3.5 | live-verified — useDockClickIntegrity (identity-scoped pass-through + the morph-settle window + the no-witnessed-press AT pass-through); real-input replay clean (touch + fine-pointer race; the settled click reaches the control); the iOS one-tap contract preserved (the frozen-clock invoker trap documented in the test); proof:dock-tap-integrity born-RED→GREEN |
| R4-SHELL | corrective | R4-3/R4-4/R5-4 | 3.5 | live-verified — the gear IS the PresetEditor (dark-at-TOP), the two off-register rows → SegmentedTabs, the --panel-padding rung minted at the root (dropdowns 4→6px); aria-expanded + focus-trap a11y |
| R5-SCOPED | corrective | R5-5 (3rd recurrence) | 3.5 | live-verified — the ONE survivor fixed (configurator dark bloom 0.056→0.162 chroma), the consumer sweep reported (words ×2 hits, slides/speedtest clean), design-idioms §8 codified, proof:no-scoped-global born-RED→GREEN |
| R4-RAIL | corrective | R4-1/R4-2 (re-opened W-RAIL-EXTEND) | 3.5 | live-verified — the black blob root-caused (contain:paint + backdrop-filter clip ANY dock child) → the .glass-dock-frame sibling escape; the hairline visibly overruns 40px on the shell; the end-icon a floating-glass register; W-RAIL-EXTEND re-stamped + R6 shell witness |
| R5-TOKENS | corrective | R5-1/R5-2 (the substitution trap, 3rd recurrence) | 3.5 | live-verified — --dock-scale re-declared in the coarse block (the knob reaches geometry: 55→109px monotone), --dock-coarse-scale 0.78 minted (pill 80→61px, the 44px floor held); proof:ui-scale extended |
| R5-VEIL | corrective | R5-7 (3 slides consumers on arrival) | 3.5 | dev-complete — @utility veil-surface (borderless/rimless wash-fill on the W55 tint axis + --veil-feather), the Card surface union + api re-sync, ≥2 demo consumers; proof:card-veil born-RED→GREEN |
| W-CLOSE | Z | the AY close pattern (overfitting audit, FINAL.md, `proof:az-final`, budget rebaseline) | 6 | planned |
| W-ADOPT | X | A4L-11 (un-started S1), A4L-13 (the exact enumeration), B4-7 (pin → 3.10.1) | 6 (or 0) | planned (spec authored) |
| W-DEPLOY | X | the standing slides.friday.institute requirement; A4L-2/A4L-12 (8 served slides) · H5 | 6 | planned (spec authored) |

### Authoring-phase status (LOUD)

**All 24 roster waves carry an authored `waves/AZ.W-*.md` spec** (the Band-Z trio —
W-CARVE/W-PRUNE2/W-CLOSE — was authored by the orchestrator after the fanout lane hit the
session wall; same binding format).

(The Band-G trio — `AZ.W-HIERARCHY.md`, `AZ.W-SUFFUSE.md`, `AZ.W-METRIC-UNIFY.md` — and the
cross-repo `AZ.W-KF-CONSUMER.md` are now AUTHORED; this board reflects the dir at the time of
writing.)

The authoring phase is INCOMPLETE until these 3 Band-Z specs land in tranche format (header with
track/type/depends/status SPEC; §0 RE-GROUND with the re-grep mandate; the file:line defect table;
goal + completion criteria; the born-RED gate spec; a scope fence; named successors). W-CLOSE's
`proof:az-final` is the terminal gate and W-CARVE's ratchet-drain is its precondition; neither can
dispatch without a spec, and the close cannot run before both are authored AND landed.

## Hinge ledger (answer before or at the named batch)

| id | decision | gates batch | status |
|---|---|---|---|
| H1 | how far the de-red goes (R3-6 vs the prior warm-red-selected decision) — recommend (a) red retires from ALL state registers | Batch 1 (W-REGISTER-IOS) | OPEN |
| H2 | the dock taxonomy naming (R3-2) — recommend (a) ONE `GlassDock` + ONE `orientation` axis | Batch 2 (W-DOCK-TAXONOMY) | OPEN |
| H3 | the automatic luma observer default (R3-7) — recommend (a) default-ON for the dock family | Batch 1 (W-ADAPTIVE-AUTO) | OPEN |
| H4 | the V↔H morph architecture (R3-13) — recommend (a) the metaball-bridge | Batch 4 (W-MORPH-SHOWCASE) | OPEN |
| H5 | `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` in the env at the deploy hinge | Batch 6 (W-DEPLOY) | OPEN |

Each authored hinge-gated wave specs BOTH arms (the recommendation first); the impl agent does not
pick — the orchestrator carries the user's decision into dispatch.

## Scope fences (carried from AZ.md)

- NO slides `docs/tranches/M/**` edits (foreign session owns it).
- The GL blob renderer + the aurora painterly pipeline are NOT re-opened (refuted/closed) — only
  the named surfaces (watercolor swatches, satellites-config, studio chrome) are in scope.
- The `in srgb` surface-tint family, the `cn()` deduplicator, and the `.focus-ring` divergences
  remain deliberate keeps (AW.W26) — no "fixes."
- ppmycota purple never enters library tokens (E1-7) — it is a DEMO-LOCAL accent only; the motion
  family's library purple anchor is the existing `--viz-legendre`.
- `:5173` is never a default anywhere after W-GATES (the `:5199` convention sweep).
