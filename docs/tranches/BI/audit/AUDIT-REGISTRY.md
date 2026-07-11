# BI AUDIT REGISTRY — finding families (living document)

Round 1: 12 lenses, 108 findings (5 P0 / 38 P1 / 48 P2 / 17 P3), 0 agent errors. Raw digest:
`ROUND-1-DIGEST.md`. Findings grouped by DEFECT MECHANISM; two findings sharing a mechanism share a
family. Orchestrator-verified rows are marked ✔ (independently reproduced at HEAD `dfaa2510`).

**The headline correction: the tree is NOT cut-ready.** The prior session's CUT-READY label was
false — three ci-tagged gates are RED at HEAD and the release budget gate fails, because each BG wave
re-ran only its own family gate while later waves regressed earlier greens (the stale-gate-green
disease). The 5.0.0 tag could not honestly fire today even if ordered.

## FAM-1 — cut-blockers at HEAD (stale-gate-green) — ALL ✔ orchestrator-verified

| finding | evidence | disposition |
|---------|----------|-------------|
| `proof:encapsulation` RED ✔ | useGlassBackdropLuminance.ts 554L, no ratchet row | W-ENCAP-REDRAIN |
| `proof:demo` RED ✔ | E1: display/card + containers/card-pressable share undeclared `/card` | W-DEMO-CARD-DECLARE |
| `proof:no-god-module` RED ✔ | dark-arm.css 507L (+7 more per lens; 2 grandfathered w/ phantom successor) | W-STYLE-REDRAIN |
| `profile:budget` FAIL ✔ | "Bundle budget exceeded" (goo-blob 129% ceiling, unbaselined chunks) | W-BUDGET-REBASELINE |
| goo-blob→blob rename UNEXECUTED ✔ | dir + exports still goo-blob; MIGRATION.md §262 documents it as landed — the guide LIES to consumers (incl. value.js repoint) | W-BLOB-RENAME-LAND (or revert the doc) |
| /api dropped but speedtest imports TimelineSegment from it | consumer-migration owed in cut notes | ASK-SPEEDTEST carry |
| Binding-π suite (147 specs) in NO close battery; visual-runner W4 born-RED, DELTA absent | the cut has no machine proof of per-mechanism paint | W-PI-IN-CLOSE |
| PE-GESTALT 3-axis Fable acceptance ledger: ZERO filed verdicts; proof:meta greens on token-presence | close-precondition pending | W-GESTALT-LEDGER-FILE |

**Mechanism wave owed:** the ratchet contract must make GROWTH red the growing wave (not book a
phantom future drain) — the GF5 "ratchet normalizes regrowth" disease.

## FAM-2 — dead interaction bindings (green-over-broken)

| finding | root cause | disposition |
|---------|-----------|-------------|
| Tabs `:draggable` DEAD (UF-H2) — TWO independent kills | (a) useDragMorph.reattach() runs once in setup pre-mount, nothing re-runs it (useDragMorph.ts:311/375; consumer watch non-immediate, stable deps); (b) even attached, `.segmented-indicator` z-0 is occluded by `.segmented-tab` z-10 — pointerdown can't reach (live elementFromPoint probe) | W-DRAG-REATTACH + reachability; gate gains live reachability assert |
| Grain switch no-op (UF-J2) | settings.vue:31,37 refs bound to controls, ZERO downstream consumer | W-DEMO-CONTROL-WIRE (+ dead-ref audit all stories) |
| Escape single-winner (UF-J5) | useKeyboardShortcuts.ts:209 first-match-return; 4 containers register unconditional Escape on mount | W-ESC-STACK (top-open-overlay wins) |
| Command palette jitter (UF-G8) | CommandList scroll port scrollbar-gutter:auto → gutter flicker on filter | fold into W-MOTION repairs |

## FAM-3 — the dock disease (3rd consecutive tranche re-opening) → D-DOCK greenfield inputs

- Hover clip root: `.glass-dock` `contain: layout style paint` (shell.css:151) — the paint box clips
  plates; the BA `--dock-control-safe-inset` 10% mitigation IS the sizing hack the user rejected, and
  still fails end controls (UF-C6/C7). The honest fix renders plates outside the clip (the
  `.glass-dock-frame` escape precedent) — or a greenfield with clipping structurally absent.
- Dock morph (UF-C5): FUNCTIONAL on Chromium (lens drove it 91×806↔640×91). The user's "does not work
  at all" is Safari-specific (UF-C3) or feel. **Round-2: Safari-engine verification owed.**
- Sluggish (UF-C4): PERF-3 (DockStage aurora canvas sized to the FULL ~2365px scroll column = 9.6MP
  FBM surface) + PERF-6 (10 per-dock getImageData readbacks off preserveDrawingBuffer aurora).
- Rail broken (UF-C2, ss-03): geometry overlap — greenfield input.
- Scroll-into-view UX (UF-C8): unbuilt — greenfield requirement.

## FAM-4 — radius/geometry grammar ABSENCE

Confirmed: NO concentric-radius law, NO capsule-vs-card guard exists; `--radius-{tab,control,badge,dock}`
ALL alias `--radius-pill` (9999px) with no box-shape guard.

| finding | evidence | disposition |
|---------|----------|-------------|
| Vertical tabs track balloons (UF-A2) | live-measured 10003px radius on a 92×132 box | W-RADIUS-GRAMMAR |
| Sheet fully square (UF-A3); squircle rule dead on 0-radius box | sheetVariants no radius; vacuous gate | W-SHEET-RADIUS |
| Metal rim border-image squares corners (UF-A7) | metal.css:115-143; proof:metal-shimmer never checks | W-METAL-RIM-MASK (masked-conic; + gate bite) |
| Cartoon-cast rest stamp (UF-A8) | Button.vue:252 + shadow.css:135 triple hard offset visible at rest on loud CTAs | W-CARTOON-CAST-CALM (press-window only) |
| BorderProgress bottom-edge hollow rect (UF-J4) | bottom edge kept CONIC paint; sibling inline-end fixed to linear | W-BP-BOTTOM-LINEAR |
| Configurator sections square + indented (UF-A4/A5) | PresetEditor bypasses `<Configurator>` chassis (bare div) | W-CONFIG-IN-SHEET |
| Badge baseline (UF-A6) | fixed px leading not tracking scaled font | fold into W-RADIUS-GRAMMAR band |

## FAM-5 — perf fill-rate (GPU, not JS — main thread held ~98fps on all named routes)

| finding | mechanism | disposition |
|---------|-----------|-------------|
| P0 Fourier SDF architecture | fullscreen per-pixel loop over ALL 384 segments at dpr2 — O(pixels×segments) | W-FOURIER-REBUILD (line geometry; SDF only for head halo) — folds into D-VIZ |
| P0 auth-shell page bg | heaviest shader as 4.87MP decorative wash + aurora (2-3 GL contexts) | W-FOURIER-PAGE-BG-RETIRE |
| P0 DockStage canvas | field sized to full scroll column (9.6MP), ~800px visible | W-STAGE-FIELD-VIEWPORT-CLAMP |
| Drawer per-frame blur | blur radius driven off per-frame `--glass-drawer-t`; + `--stage-t` written on documentElement; + gBCR in pointermove | W-DRAWER-CHEAP-DRAG |
| Multi-GL routes | studio routes mount hero field + studio viz; grid routes leak an aurora context | W-VIZ-ROUTE-ONE-GL |
| Dock luminance readbacks | 10× getImageData/route; preserveDrawingBuffer | W-DOCK-LUMA-SHARE |

## FAM-6 — motion register drift

- Overlay enter CONVERGED onto one `.glass-reveal` 0.4s clock (good) but ONE CLOCK TOO COARSE:
  tooltip/context-menu/hover-card (transient affordances) need a faster register — the user's
  "tighten" is this. Native `.glass-top-layer` rides a SECOND bouncier 0.62s register (divergence).
- Accordion indent = `tap-squish` scale-0.96 origin-center on a full-width row (~27px shift); AND
  `transition-control` CLOBBERS the scale transition → instant snap (also degrades SelectTrigger).
- Dead `<Transition>` recipes (dialog-scale/dropdown/pop/fade-slide): zero production consumers;
  motion showcase blurbs claim they drive dialogs (false docs).
- The one draw-in divider (chrome-rule-strike) rides `--ease-cartoon-punch` (+22% overshoot) — the
  user's "too bouncy" — vs the codified no-overshoot draw-on register.
- Dispositions → D-MOTION register table + named repairs.

## FAM-7 — meta-language leak (incl. into the PUBLISHED dist)

- SPRING_PRESETS `comment:` fields carry wave names + engine jargon → rendered on /motion/springs AND
  shipped in dist (springPresets.ts; springs.vue:191). curves.ts:143 same.
- ~10-15 blurbs in engineering voice (ElementMorph, springTimingFunction, sibling lib names, unglossed
  PRM). ~179 tranche-ref source comments across demo files.
- Disposition: W-DEMETA (library-data strip + copy rewrite) + the lexicon GATE (rendered-text +
  published-source arms) so it can never return.

## FAM-8 — code-block register

CodeBlock primitive exists; adopted on 1/150 pages; ZERO highlighting; 2 pages hand-roll `<pre>`.
Both siblings use highlight.js ^11.11.1 + house .hljs theme. → D-STORY (the CodeBlock register wave).

## FAM-9 — dead substrate (substrate-without-consumer survived the retire)

- `surface="clear"` full mechanism (union member + CSS + 3 token families): consumer retired, mechanism
  shipped; proof:surface-axis never asserts member consumption (vacuous). → W-FOLD-CLEAR + gate clause.
- floating-panel.css (49L whole file), `.glass-hero` (squircle.css): zero consumers. → delete.

## FAM-10 — consumer truth / overfit

**THE MECHANISM-DISTINCTNESS LAW (user ruling, 2026-07-11):** a consumer count answers "is it
imported," never "should this concept exist." Consumer counts gate substrate-SHIPPING (the J-inv-10
≥2 bar for minting new substrate); they do NOT immunize redundant taxonomy. A component earns a
distinct name iff it owns a MECHANISM no survivor expresses; otherwise it is a fold-with-migration
row (consumers get a relay ask), regardless of how many consumers it has.

- **GlassPanel: RETIRE (fold onto Card/tier classes)** — the law applied, source-verified. Its `tier`
  axis is byte-duplicative of Card's (same TIER_CLASS map), its `surface` axis is the same shared
  resolver Card uses, and its ONE distinct mechanism — `useGlassRenderer`/`createGlassFilter` (a JS
  canvas-generated feDisplacementMap refraction) — is a SECOND refraction path competing with the
  house `.glass-lens`/`#glass-refract` axis, with GlassPanel as its ONLY consumer (a textbook
  no-dual-path violation); its no-backdrop-filter branch is a per-rung opaque legacy ladder of the
  NF-condemned class. A slotless glass surface needs no component at all (`class="glass-resting"`).
  Consumers (sci-report GalleryView/TaxonomyApparatus/VftColophonBeat, atlas chrome) migrate
  mechanically → ASK rows. `useGlassRenderer`/`createGlassFilter` retire with it unless D-GLASS
  research shows a case `.glass-lens` cannot serve (default: retire).
- **hover-popover: re-adjudicated under the same law** — round-1 kept it on consumer count; the law
  says its being "literally reka HoverCard underneath" makes it a fold-onto-HoverCard candidate
  unless it owns a distinct mechanism (the keep-open/hoverOpenDelay behavior — D-GLASS/B8 adjudicates
  mechanism-first, consumers get the migration ask).
- speedtest-ONLY sextet: metric-cell, metric-stack, instrument-chassis, icon-tooltip, pulse,
  scrolling-text → the metrics-transfer ask (UF-K1) generalizes to this set (decide each).
- border-progress: ZERO real consumers; the CLAUDE.md "born ≥2 by construction" claim is FALSE at
  speedtest HEAD (hand-rolls its own bar). completion-seal: 1 (own demo).
- proof:component-orphan counts demo+internal as consumers — structurally cannot catch overfit →
  W-ORPHAN-BINARY-SPLIT.
- compositions band: math-paper remove (user + audit agree); hero re-authored as bento index already;
  4 single-component demos misfiled as compositions.

## FAM-11 — gate-soundness hardening

no-masking Arm E accepts any non-empty owedBy string (no wave-spec resolution); warm-identity labeled
"PRIMARY paint gate" while measuring 0/11 convergence (green by disclosed design — relabel or arm);
ba-gestalt manifest note contradicts its ci tag (CI perpetually red on branch); metal-shimmer +
squircle vacuous on the geometry they decorate; drag-morph device-free with no reachability assert;
ratchet-growth contract. → the gate-hardening wave batch.

## FAM-12 — chronic bookkeeping drift

FOLD-LEDGER stale rows (D27 kf-snap LANDED but still DEFER; deep-glass 20px pair RETIRED by
BG.W-DEEP-GLASS-DECIDE but still DEFER); the audit's own §G detector hardening (bare-word BOOKED ban +
.css arm) prescribed, never applied — 8 bare-word bookings invisible; phantom carve-successor rows.
→ W-LEDGER-TRUE-UP with liveness clauses (gates verify structure, never liveness — add trigger-fired
probes).

## FAM-13 — structure-plan re-sequencing (P0×2)

Repairs/greenfields/prunes MUST land BEFORE the structure spine (census else poisoned; flatten would
move families being deleted/greenfielded); viz deletions are BREAKING export changes → belong in the
MAJOR cut, not the "zero-churn 5.1.0" flatten. PROMOTE-CONTEXT folds into the dock greenfield;
README/FOLD/PROMOTE-PRIMITIVES re-scope post-repair; CSS-COLOCATE-B2's dock arm re-sequences after the
dock greenfield; ASK-SPEEDTEST gains the metrics-transfer carry; ~5 deleted-viz gates orphaned; stale
hardcoded counts stripped. → Band B9 reform (details in the 8 STRUCT findings).

## FAM-14 — storybook truths (better than feared, three gaps)

128/150 pages compose the chassis (adoption is strong). Landing tiles = per-story Canvas2D STILLS (the
user wants LIVE components). StoryHero does NOT shrink on scroll (the ScrollCard shrink lanes exist,
unconsumed by it). The w-full census on buttons/forms/select read clean — but the user's ss-14/15
(popover/context-menu full-width triggers) contradict it → round-2 reconcile on the containers band.

---

## Round-2 targets (gaps the registry demands)

1. **Safari-engine live verification** — dock morph/liquid-playground/dock-gallery/carousel/eyeglass
   on real WebKit (the user's UF-C3/C5 need engine truth).
2. **a11y lens** (absent from round 1).
3. **Doc/canon drift lens** — CLAUDE.md/MIGRATION claims vs disk (two lies already found: blob rename,
   born-≥2 border-progress; sweep the rest).
4. **Containers-band affordance reconcile** (ss-14/15 vs the clean w-full census).
5. **Carousel breakage diagnosis** (riding the D-PAGER codebase-truth researcher).
6. **Cross-repo asks/consumes ledger** (inbound packets → dispositions).
7. **Adversarial re-verify** of round-1 P1s not yet independently confirmed.

Registry state: OPEN (round 1 folded; round 2 pending). Stability bar: two consecutive rounds
surfacing nothing new.
