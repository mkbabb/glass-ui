# AX.W34 — Cross-constellation analysis + idiom-maximization + consumer-adoption ledger (the §16 receiver)

**Band** N · CROSS-REPO · **Severity** major · **dependsOn** AX.W00 *(separate-repo / tracked;
tranche-development-only — glass-ui writes NO sibling source)* · **Charter** AX.md §3 (the `### AX.W34`
block, lines 1623-1701) + the §1 summary row (line 144) + the §1 cross-repo close-clause (lines 157-161)
+ the §2 band-N membership (lines 195-201) + the §2b band-N precept row (line 226) + §4 note 12
(publish-currency — the consumer "still broken" findings are a stale-registry gap the AX cut PUBLISH
resolves, lines 2057-2067) + §4 note 22 (the DEDUP ledger — the §16 receiver + per-consumer idiom census
routes onto W34, lines 2169-2181) · **Audit** `constellation-analysis-corpus.json` slice 25
`edict-recap-completeness` (the §16 single-largest recap-to-charter gap — all four sub-directives unrouted)
+ slice 26 `chronic-deferrals` (the §16 zero-loss meta-mandate + the chronic-closure / phantom-owner
anti-pattern) + slice 27 `precept-alignment` (the §16 cardinal precept violation + the missing
coordination/CONSTELLATION.md artefact) + the per-consumer idiom slices 10 `idiom:value.js`, 12
`idiom:fourier-analysis`, 14 `idiom:speedtest`, 15 `idiom:muster`, 16 `idiom:words`, 17 `idiom:bbnf-buddy`
(the §16.3 census evidence) + the leverage slices 19-23 `leverage:{slides,value.js,keyframes.js,fourier,speedtest}`
(the §16.2 constellation-leverage survey, including the warpTo-routes-to-W17 boundary)

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD on **three falsifiable witnesses** that do NOT hold today. Per the §0 cardinal
"re-verify before acting" + the AX.W00 wave-open ritual, each witness is re-confirmed LIVE at write-time
against the live trees — glass-ui `at-dock-convergence @ eaba94f`, and the consumer pins as installed
(speedtest `^3.6.0`, muster `^3.1.0`, fourier `^3.1.0`, words `^3.0.0`, value.js / bbnf-buddy / bbnf-playground
on their declared ranges).

- **RED witness 1 — `coordination/CONSTELLATION.md` does NOT exist (the required cross-repo artefact is
  absent).** AX has all three SPEC.md §Document-Set triggers for a coordination doc (authors handoff annexes
  W28; tracks a separate repo, L-band slides; carries deferred cross-repo handoffs, the W34/W35 consumer
  legs), yet `grep -rn "coordination\|CONSTELLATION.md\|porcelain\|tree-clean" AX.md` returns ZERO
  coordination-artefact hits and `ls docs/tranches/AX/coordination/` is empty (slice 27 finding 3). *The
  falsifiable RED: the file does not exist; the gate that asserts it exists with a per-consumer
  HEAD/branch/`git status --porcelain` column FAILS at HEAD. (Note: W28 OPENS this same doc with the band-K +
  gate-0 section first; W34 EXTENDS it with the §16 receiver bands — see Disjointness.)*

- **RED witness 2 — the §16 directive is ENTIRELY UNROUTED; zero AX wave folds §16.1/§16.2/§16.3.** A
  `grep -E "cross.constellation|last 10|leverage.*constellation|maximize.*idiom|library-optimum"` over AX.md
  found ZERO hits before this band was authored (slice 25 finding 1 — "the single largest recap-to-charter
  gap: a top-level new directive that the charter never operationalizes"). The §16.4 zero-loss meta-mandate
  ("NOTHING DEFERRED OR DROPPED") is itself the governing reason the gap cannot be silently closed. *The
  falsifiable RED: a carry-closure meta-assertion (bbnf BD-G7 form) that EVERY §16-harvested item carries an
  explicit `{receiver-wave, close-gate}` tag returns non-zero un-receivered carries at HEAD — because the
  per-consumer idiom census + the leverage survey + the last-10-tranches harvest residue are unrecorded.*

- **RED witness 3 — every consumer hand-rolls / under-adopts a glass-ui idiom with NO recorded adoption
  leg.** Live-confirmed across the seven consumers: value.js carries a LOCAL FORK of `useLayerTransition`
  (the exact FLIP-width algorithm AX.W01 names as the dock-desync root) + a goo-blob fork + a WatercolorDot
  global-singleton-filter fork (slice 10 F0/F2/F3); words runs the BROKEN pre-3.4.0 dock (`container-type:
  inline-size` at `node_modules/@mkbabb/glass-ui/dist/dock.js:219`), 5 never-paint `hsl(var(--token))` sites,
  a missing `@source` directive, and 142 import sites with NONE of the new idioms adopted (slice 16
  F0/F2/F3); fourier hand-rolls 14 `.cartoon-card` dead-class divs + a `SliderControl.vue` re-deriving
  `LabeledSlider` (slice 12); muster decomposes `--signal-*`/`--origin-hue-*` into `hsl(var(--token))`
  channel-triples + under-adopts `LabeledField` (slice 15); bbnf-buddy ABANDONS `DockLayerGroup` for both
  editor docks + works around the broken `overflow="wrap"` with hand-rolled scroll/mask (slice 17 F0/F1);
  speedtest inherits `--ease-apple-spring` at 4 EXTERNAL sites + hand-rolls a 232-line `auroraConfig.ts`
  (slice 14). *The falsifiable RED: the §16.3 per-consumer idiom census + adoption ledger does not exist; the
  gate that asserts every census-enumerated adoption routes to a `{receiver-wave, close-gate}` FAILS at HEAD
  (the census is unwritten).*

The HardGate drives all three witnesses RED→GREEN by AUTHORING the coordination doc + the §16 receiver
ledger — **NO glass-ui `src/` change and NO sibling source**. W34 is a coordination / analysis wave: it is
the HUB that RECORDS each consumer leg + each newly-surfaced glass-ui debt's routing; the legs DISPATCH from
their own sibling sessions, gated on the AX publish. The §16.4 zero-loss mandate is the forcing function —
every harvested item is closed in a wave OR carries an explicit `{receiver, close-gate}`; the W33
carry-closure gate asserts zero un-receivered carries at tranche close.

---

## Goal

`coordination/CONSTELLATION.md` exists with the §16 receiver bands (per-consumer HEAD/branch/tree-cleanliness
+ commit-vs-handoff-patch disposition) and the §16.3 per-consumer idiom census is authored such that every
harvested §16.1 finding, every §16.2 constellation-leverage opportunity, and every §16.3 idiom adoption is
routed to an explicit `{receiver-wave, close-gate}` carry-tag — so a machine-checkable meta-assertion returns
ZERO un-receivered §16 items, discharging the §16.4 zero-loss forcing-function without one glass-ui `src/`
edit.

---

## Scope (the gestalt fix — the §16 zero-loss forcing-function, no workaround, no silent deferral)

The root cause is a **recap-to-charter routing gap, NOT a code defect** (slice 25 F1; slice 27 F2): the
entire REQUIREMENTS §16 directive (the 2026-06-07 cross-constellation analysis + idiom-maximization mandate)
landed AFTER the 32-agent deep-audit corpus was built, so the corpus never routed it. The 32-agent §16.1
harvest ALREADY RAN read-only — it IS the `constellation-analysis-corpus.json` + `converge-digest.md`. W34
is therefore the **forcing-function RECEIVER, NOT a re-run**: it routes each harvested finding to its wave +
records the residue with an explicit `{receiver, close-gate}` carry-tag (the §16.4 zero-loss mandate). It may
SPAWN further consumer-adoption sub-waves, but those are held read-only / tranche-development-only — the legs
are sibling-session PRs gated on the AX publish. **glass-ui writes NO sibling source** (it authors annexes;
the sibling sessions execute under their own tranches).

**(1) Author `coordination/CONSTELLATION.md` — the §16 receiver bands (slice 27 F3 — the required artefact
the prior charter omitted).** EXTEND the doc W28 opens (band-K + gate-0) with the per-consumer §16 bands:
each consumer's HEAD + branch + `git status --porcelain` tree-cleanliness at coordination time, the shared
write surfaces, the writer-vs-reader boundaries (glass-ui = reader / annex-author; the consumer sessions =
writers of their own `src/`), and the conflict-resolution protocol. Capture via the bbnf
**sibling-baseline-capture ritual** (BC.W0c/W5d — snapshot each sibling's HEAD+status BEFORE any cross-repo
edit; reconcile at close) so the chronic dirty-tree wall (the 2026-05-18 Q lesson) is a RECORDED delta, not a
silent stall. Each consumer leg carries its **commit-vs-handoff-patch disposition** — value.js / words /
muster / fourier / bbnf-buddy / bbnf-playground likely carry in-flight trees (handoff-patch lanes, not
orchestrator-commit lanes — per the `project_au_f_finalization` / `project_av_g_tranches` memory).

**(2) Drive §16.1 — the last-10-tranches-per-repo deferred/dropped harvest RECEIVER (slice 25 F1; slice 26
§16-finding).** The harvest across the 10 named repos (glass-ui, keyframes.js, value.js, fourier-analysis,
slides, speedtest, muster, words, bbnf-buddy, bbnf-lang) ALREADY RAN read-only as the converge-digest. W34 is
the RECEIVER: every harvested deferred/dropped item / lesson / cross-repo debt is routed to its AX wave with
a `{receiver-wave, close-gate}` carry-tag OR recorded as a permanent-out-of-scope ARCHIVE with rationale. The
DEDUP ledger (§4 note 22) is the input — W41 is the ONLY genuinely-new wave the harvest surfaced; every other
NEW-WAVE candidate DEDUP'd onto an existing wave (forced-colors → W36, useTextHighlight/Canvas2D → W37,
aurora-configurator restyle → W38, Lighthouse → W39, demo-dock-nav → W40, the §16 receiver itself → W34,
keyframes-prune-DAG → W35). W34 records the dedup dispositions so no harvest residue is unrouted.

**(3) Drive §16.2 — the constellation-leverage survey (slices 19-23).** Record, per consumer, where the
abstracted `/constellation` (+ the W17 `warpTo`) serves a real surface: slides STILL runs its local
`til-briefing/constellation.ts` (510 lines) for Slide01/Slide10 despite the shipped `/constellation` — the
PRIMARY real leverage surface (slice 19), routed to the slides adoption (W30/W32 ride the slides repo).
**The W17 non-goal BOUNDARY is binding** (§4 note 16): the constellation is a DECORATIVE proximity-graph, NOT
a data-graph renderer — the value.js color-space Conversion Graph + slides node-flow charts are EXPLICITLY
OUT (a semantic fixed-topology graph routed through `drawOverlay` would FAIL; a data-graph primitive, if ever
wanted, is a SEPARATE component, not constellation prop-bloat). Record that value.js / keyframes.js / fourier
have NO hand-rolled proximity-graph the constellation would displace 1:1 (slices 20/21/22) — so the §16.2
leverage residue is: slides adoption (routed) + the `warpTo` interaction itself (the §15 mechanic, which
**routes to W17**, not W34 — W34 records that the leverage survey identified `warpTo` as the un-buildable
abstraction gap and that W17 owns the build, closing the §15/§16.2 loop without re-scoping W17 here).

**(4) Drive §16.3 — the per-consumer idiom census + the adoption ledger (slices 10/12/14/15/16/17 — the
census primary evidence).** Author the per-consumer idiom census: enumerate, per consumer, where glass-ui is
hand-rolled / under-adopted / non-idiomatic, and route each adoption to a `{receiver-wave, close-gate}` leg.
**This wave is the HUB that RECORDS each leg; the legs DISPATCH from their sibling sessions, gated on a
glass-ui pin bump past the AX cut.** Each consumer leg's glass-ui-OWNED debt (the dist `@source` deadlink, the
barrel re-exports, the missing tokens) is ALREADY routed to its glass-ui wave (W25a, W01/W02, W21) — W34
records the CONSUMER leg, NOT the library edit (the library edit lands in its named wave). The per-consumer
adoption ledger (the §16.3 receiver):

- **value.js** — delete the local `useLayerTransition` FLIP-width fork → the W01/W02 `/dock`-barrel re-export
  (close-gate: the fork file is deleted + the import resolves the published `/dock` `useLayerTransition`);
  delete the local goo-blob fork → `/goo-blob` (W08/W15/W16, the ColorResolver seam); delete the local
  WatercolorDot + `<SvgFilters>` global-singleton mount → `/watercolor-dot`; add the binding `@source`
  directive; the demo `cssToRgb` DOM-probe → value.js's own `parseCSSColor`. Pin bump past the AX cut.
  (slice 10 F0/F2/F3.)
- **speedtest** — the font-preset removal (delete `data-typography-preset` + the `@theme` re-alias + the
  `--font-serif` body override — W22); the 4 `--ease-apple-spring` sites → the governed `--spring-*` register
  (W05 — the no-`--ease-apple-spring`-in-consumers sweep); the 232-line `auroraConfig.ts` → `resolveAtoms({…})`
  + excise the dead `--aurora-1..6` tokens (W10, the named consumer #2); the R-CONSUME tail (the unbanked
  AT/AU body — VT re-founding + the H10 stopgap-revert checklist + the dark-default pin) against the
  AX-published glass-ui; the X5 null-honesty in-repo defect (`?? 0` at the bridge — recorded,
  speedtest-internal, post-AX, NOT an AX glass-ui wave). (slice 14 F0/F1/F2 + slice 25/26 X5; W28-named,
  W34-routed.)
- **muster** — the `glass-pill` slider sites (SignalsLayer:113 + CommandPalette:485) → the surviving
  standard/glass-scrubber key (W23/§9.3); the `--signal-*`/`--origin-hue-*` channel-triple anti-pattern
  (`hsl(var(--token))` family — 5 files) → complete-`hsl()` tokens + `color-mix`; the LabeledField
  under-adoption (SettingsDialog ×2, ConstraintsLayer ×3) → LabeledInput/LabeledSwitch. The muster
  native-receive (metric-cell/stack/instrument-chassis) is W28; the idiom-adoption legs are W34-recorded.
  (slice 15.)
- **fourier** — the `^3.1.0 → AX` pin bump (holds 4 already-shipped fixes hostage: the dock-VT-name `useId`
  fix, the ConfiguratorLayer `inert` a11y fix, `asideSide`, `useTextHighlight`); the 14 `.cartoon-card`
  dead-class divs → `<Card surface="cartoon">`; the LabeledSlider under-featuring (the feature-gap routes to
  W21's LabeledField scope — optional non-required tooltip + inline numeric input + value-color). fourier is
  the prime downstream-validation target for the dock W01-W06 + graphics W07-W08 ships (heavy dock +
  Configurator + Slider consumer). (slice 12.)
- **words** — the `^3.0.0 → AX` pin bump (running the BROKEN pre-3.4.0 dock — `container-type:inline-size`);
  delete the precomputed `--color-card-*` `color-mix` + `.dock-fade` dock workarounds; repoint
  body/sans/display off Fraunces (W22 adjudication); the 5 `hsl(var(--token))` never-paint sites → direct
  `var()`; the missing `@source` directive; the broad idiom adoption corpus (GlassTimeline/MetricBadge/
  Section/useViewTransition/`.text-display-*`/`--section-color-*`/`.deferred-section`/useYieldToMain — 142
  import sites, NONE of the new idioms adopted — the §16.3 PRIMARY evidence site). words was DROPPED (not
  folded) by the prior charter (slice 16 F7) — W34 closes the §16.4 violation by recording its full leg.
- **bbnf-buddy** — the un-run W13-ζ band wholesale (the complete file:line grand-audit disposition ledger);
  the M0 PRM gap on the 4 mascot rAF loops (route the consumer-coverage census to W15/W16); the
  DockLayerGroup re-adoption after W02 (delete the `.dock-layer-*` keyframes + `v-if`/`<Transition>` swaps —
  the W02 close criterion: "a vertical-overflow consumer can use DockLayerGroup without abandoning it"); the
  BottomDock wrap scroll/mask + `--radius-2xl` workaround deletions after W04; the warm-cream `:root` palette
  + `.dark` mirror dup → glass-ui native `light-dark()` tokens; the ToggleChip active-label token-cohort gap
  (ship `--toggle-chip-active-{color,label-weight}` — route the glass-ui-OWNED arm to W21). (slice 17.)
- **bbnf-playground** — ADD to the ledger (the prior charter dropped it): the dock prop-migration
  (`:wrap`→`overflow="wrap"` per W04; verify `:fit-content`/`:start-collapsed`/`:collapse-delay` survive the
  W01-W06 rebuild via the W03/W00 binding-verification e2e sweep); the `^3.0.0/^2.0.0` pin bump (10-subpath
  consumer — a dock+slider+dialog+tooltip dogfood target for the visual-truth audit). (slice 25/charter
  CORRECTION; AX.md:1681-1684.)

**(5) Apply the chronic-closure meta-invariant + name the phantom-owner anti-pattern (digest hist:keyframes /
hist:bbnf-lang — slice 26 chronic-closure finding).** Every consumer leg + every §16-harvested item carries a
SYSTEM-property gate OR (for the cross-repo handoffs) a born-RED PAIRED gate — a bare "handed off" tag is NOT
a terminal. Adopt bbnf-lang's CARRY-LEDGER discipline (BD-G7 form): every leg is an explicit carry-tag with
`{owner-wave, receiver-wave, concrete-blocker, receiving close-gate}`, recorded in a "Carry-tags TO" /
"Carry-tags FROM" table in the coordination doc. Name the **phantom-owner re-defer anti-pattern** (a wave
declares itself "the home", ships the sliver, books the deep half to a next wave the next tranche descopes —
the M1/M2/M3 re-paper class) so W34's own ledger cannot re-defer the consumer adoptions the AW way. The W33
carry-closure gate (the tranche-close meta-assertion) reads W34's ledger as its primary input.

**(6) Record the publish-currency hinge (§4 note 12 — load-bearing).** A CLASS of consumer "still broken"
findings (the Card specular pointer-wiring, the VT `.ready`-swallow, `useGlobalDark({initialValue})`,
`deriveAurora`/`resolveAtoms`) are AT HEAD but NOT in what a consumer dev-resolves (the consumers MEASURED the
stale published 3.6.0 / their 3.0.0–3.1.0 pins). So these are a PUBLISH-CURRENCY gap, NOT a code gap. W34
records that EVERY consumer leg is gated on the AX cut PUBLISHING (the W41 dts-watch + the W33/W34/W35
pin-bump + republish hinge) — do NOT re-fix what is already at HEAD; the corrective is the pin bump after the
publish. The §16.4 zero-loss mandate is satisfied by recording the publish hinge as the restoration gate, not
by silently treating the publish-currency findings as "still broken" code defects.

**(7) Record the ≥2-consumer WATCH for the pane-slide directional-Transition vocabulary (digest fold d).** The
speedtest hand-rolled pane-slide directional-`<Transition>` grammar (`src/assets/styles/pane-slide.css`, a
self-described glass-ui PROMOTION CANDIDATE) is a candidate glass-ui-OWNED promotion to `transitions.css` —
record it as a `≥2-consumer-gated WATCH` (1 named consumer at HEAD: speedtest; value.js's own pane-left/right
is the candidate 2nd). Promote ONLY on a confirmed 2nd consumer (the substrate-with-consumer / no-overfitting
invariant) — folded as a WATCH, NOT a wave.

NO glass-ui `src/` edit, NO export-surface change, NO sibling source edit, NO consumer PR authored in this
wave (the legs are sibling-executed, gated on the AX publish). NO library edit for a consumer leg's
glass-ui-OWNED debt (that lands in its named wave — W25a/W01/W02/W21/W41). W34 is the coordination doc +
the receiver ledger + the routing record. The W34 product is read-only-analysis + authored-coordination.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

W34 is glass-ui-owned coordination-doc + receiver-ledger AUTHORSHIP. It writes NO glass-ui `src/` and NO
sibling source.

| File | Edit |
|------|------|
| `coordination/CONSTELLATION.md` | **EXTEND** (W28 OPENS this doc with the band-K + gate-0 section; W34 appends the §16 receiver bands — the per-consumer §16 bands: HEAD/branch/`git status --porcelain` tree-cleanliness + commit-vs-handoff-patch disposition for value.js / speedtest / muster / fourier / words / bbnf-buddy / bbnf-playground; the sibling-baseline capture; the writer-vs-reader boundaries; the conflict-resolution protocol; the "Carry-tags TO" / "Carry-tags FROM" BD-G7-form tables; the ≥2-consumer pane-slide WATCH). DISJOINT from W28's band-K section. |
| `docs/tranches/AX/audit/W34-cross-constellation-idiom-consumer-adoption-ledger.json` | **NEW** — the born-RED ledger (the three RED witnesses + their live measurements), the §16.1 last-10-tranches harvest-residue routing record (the DEDUP-ledger dispositions per §4 note 22), the §16.2 constellation-leverage survey (the slides-adoption leg + the `warpTo`→W17 boundary + the data-graph non-goal), the §16.3 per-consumer idiom census (the seven consumer legs with their `{receiver-wave, close-gate}` carry-tags), the publish-currency hinge record (§4 note 12), the chronic-closure / phantom-owner discipline application, and the carry-closure meta-assertion spec (the W33 close-gate input). |
| `docs/tranches/AX/waves/AX.W34-cross-constellation-idiom-consumer-adoption-ledger.md` | This spec (the wave doc). |

**Consumer-executed (NOT glass-ui-written — W34 RECORDS the leg; the consumer session WRITES under its own
tranche, gated on the AX publish):** every consumer-side adoption PR (value.js fork deletions + `@source` +
pin bump; speedtest font-preset/apple-spring/auroraConfig adoptions + R-CONSUME tail; muster glass-pill/
channel-triple/LabeledField adoptions; fourier pin bump + `.cartoon-card` migration; words pin bump + dock
workaround deletions + Fraunces repoint + hsl-wrap fixes + `@source`; bbnf-buddy DockLayerGroup/wrap re-adoptions
+ palette dedup; bbnf-playground dock prop-migration + pin bump) — each gated on its sibling-side close-gate.

**OUT of bounds (the glass-ui-OWNED legs land in their NAMED waves, NOT W34):** the `/dock`-barrel
`useLayerTransition` re-export (W01/W02); the `--ease-apple-spring` excision + consumer-census sweep (W05);
the `resolveAtoms` atoms-door + the dead `--aurora-1..6` (W10); the glass-scrubber slider key (W23); the
`<Card surface="cartoon">` migration target + the LabeledField feature-gap + the `--toggle-chip-active-*`
token cohort + the configurator root-barrel reconcile (W21); the Fraunces adjudication (W22); the dist
`@source` content-scan deadlink fix (W25a); the dock prop-rename binding-verification e2e sweep (W03/W00);
the speedtest/muster native-receive (W28); the keyframes HeaderRibbon/GlassPanel migration DAG (W35); the
publisher-side build + supplier-edge hardening + the publish hinge every consumer leg's pin-bump resolves
through (W41); the carry-closure tranche-close meta-assertion + FINAL (W33).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W28 (speedtest native-first receive + the coordination-doc OPENER).** W28 OPENS
  `coordination/CONSTELLATION.md` with the band-K + gate-0 section (the metric-receive DAG); W34 EXTENDS it
  with the §16 receiver bands. **Disjoint by section:** W28 first — it OPENS the file (the band-K + gate-0 +
  speedtest/muster baseline capture for the metric families); W34 appends the per-consumer §16 idiom bands +
  the leverage survey + the carry-tag tables. The speedtest R-CONSUME AT/AU tail is W28-NAMED but
  W34-ROUTED — W28 routes it here; W34 records its leg + close-gate. Coordinate so the two waves write
  DISJOINT sections of the one doc (W28 owns band-K; W34 owns the §16-receiver bands).

- **vs W35 (primitive-prune consumer-migration DAG — keyframes HeaderRibbon/GlassPanel/dock-spring).** W35
  drives the keyframes.js cross-repo migration DAG (native-first / migrate-before-prune) with its OWN born-RED
  cross-repo gates (`proof:off-headerribbon` / `proof:off-glasspanel` / `proof:dock-morph-settled`).
  **Disjoint by consumer + by gate:** W35 owns the keyframes.js legs (a blocker — W19/W20 dependsOn it); W34
  owns the value.js / speedtest / muster / fourier / words / bbnf-buddy / bbnf-playground idiom-adoption legs
  (a major — gated on the AX publish, not a prune-publish predecessor). The keyframes.js H.W2/H.W4 Card-default
  specular consumption fix is SATISFIED-FOR-FREE by the W09 softened default after the keyframes pin bump —
  W35 confirms no kf-side override remains, and the consumer leg routes through W34's ledger (the pin-bump leg
  is W34-recorded, the migration DAG is W35-executed). W34 records keyframes' idiom legs in the census table;
  W35 owns the keyframes migration IMPL.

- **vs W41 (publisher-side cross-repo build + supplier-edge hardening — the publish hinge).** EVERY W34
  consumer-adoption leg resolves through the AX publish hinge W41 hardens (the `build:watch` dts-freshness
  keystone + the cross-repo-dev-resolution contract-v2 — the consumers dev-resolve the built `dist/`, so a
  stale `dist/` cannot mislead them). **Disjoint by ownership:** W41 is glass-ui's OWN cross-repo obligation
  cohort (a real `src/`/`package.json` edit — the dts-watch arm, the devDep↔peer parity gate, the keyframes-4
  republish handoff); W34 writes NO `src/` (it records the consumer legs + their gating on the publish). W34
  routes every pin-bump leg to W41's publish hinge; W41 hardens the hinge the bumps ride. W34 touches no
  `package.json`.

- **vs the dock band (W01-W06), the graphics band (W07-W16), the primitive band (W19-W22), the encapsulation
  band (W25a).** Each consumer leg's glass-ui-OWNED debt routes to one of these waves (W34 RECORDS the
  consumer leg; the named wave OWNS the library edit). **Disjoint by repo + edit-class:** W34 writes only the
  coordination doc + the receiver-ledger json; the library waves write `src/`. W34 must NOT pre-empt or
  duplicate a library edit (e.g. it does NOT re-export `useLayerTransition` — that is W01/W02; it records that
  value.js's fork deletion is GATED on that re-export landing + publishing). The §4 note 22 DEDUP ledger is
  the boundary contract: W34 records the dedup dispositions, it does not re-scope the absorbing waves.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

This is a CROSS-REPO coordination / analysis wave — the glass-ui side writes NO source, so the "implement"
arm is COORDINATION-DOC + RECEIVER-LEDGER authorship, and the actual consumer-adoption IMPL runs in the
sibling sessions (out of glass-ui's dispatch, gated on the AX publish). The actual glass-ui-side count is **2**
(1 ledger/coordination-doc author + 1 adversarial-verify), under the AX ≤6-implementation / ≤7-read-only
ceiling (NOT the REQUIREMENTS "32-agent" literal — slice 27 finding 4: the §16.1 32-agent harvest already RAN
read-only as the digest; W34 is the receiver, not a re-run). The consumer-side adoption IMPL is each
consumer's own ≤6-agent sibling wave.

- **Ledger + coordination-doc author (≤1 glass-ui agent — the deliverable is the doc + the ledger, not
  source).** Captures the sibling baselines (orchestrator-run read-only `git -C <consumer> status --porcelain
  / branch --show-current / log --oneline HEAD~10..HEAD` for each of the 7 consumers); EXTENDS
  `coordination/CONSTELLATION.md` with the §16 receiver bands + the BD-G7 carry-tag tables + the
  commit-vs-handoff-patch disposition; authors the §16.3 per-consumer idiom census + the §16.2 leverage survey
  + the §16.1 harvest-residue routing record in the audit json; records the publish-currency hinge + the
  chronic-closure / phantom-owner discipline; routes each leg to a `{receiver-wave, close-gate}`. Touches NO
  glass-ui `src/` and NO sibling source — doc + ledger only.

- **Adversarially-verify (≤1 glass-ui read-only lane).** Re-runs all three RED witnesses against the live
  trees: (a) confirms `coordination/CONSTELLATION.md` lacks the §16 bands at HEAD (witness 1, modulo W28's
  band-K opener); (b) confirms zero AX wave folds §16.1/§16.2/§16.3 before W34 (witness 2 — the carry-closure
  meta-assertion returns non-zero un-receivered §16 items); (c) confirms each census idiom IS live-present in
  the consumer (witness 3 — spot-greps value.js's `useLayerTransition` fork header, words' `dock.js:219`
  `container-type`, fourier's 14 `.cartoon-card` divs, muster's `hsl(var(--signal-*))` triples, bbnf-buddy's
  `<Transition name="dock-layer">` BottomDock swap). ADVERSARIAL twists: **(i)** confirms the
  publish-currency findings are AT HEAD (the Card specular pointer-wiring + VT `.ready`-swallow are in the
  HEAD source) so they are NOT re-routed as code defects (§4 note 12) — a wrong route would re-fix landed
  work; **(ii)** confirms the §16.2 leverage residue routes `warpTo` to W17, NOT W34 (the §15 mechanic is a
  W17 build, not a W34 record — a mis-route would double-assign the warp); **(iii)** confirms the W17 data-graph
  non-goal holds (value.js Conversion Graph + slides node-flow charts are OUT — a leverage-survey finding that
  routed a semantic graph through `drawOverlay` would violate no-overfitting); **(iv)** confirms every
  consumer leg's glass-ui-OWNED debt routes to its NAMED wave (W25a/W01/W02/W21), NOT a W34 library edit (W34
  must record the consumer leg only); **(v)** confirms the carry-closure meta-assertion is machine-checkable
  (a BD-G7-form `rg` over the ledger returns zero un-receivered `{receiver, close-gate}`-less items).

- **Gate-author (the carry-closure meta-assertion — SPECIFIED here, the tranche-close run is W33-owned).** The
  W34 audit json SPECIFIES the carry-closure assertion (every §16-harvested item carries a
  `{receiver-wave, close-gate}` carry-tag; zero un-receivered carries — bbnf BD-G7 form: a documented `rg`
  over the ledger returns zero matches IS the gate). W33 RUNS it at tranche close (the `proof:ax-final`
  carry-closure leg reads W34's ledger as input). The sibling-side adoption close-gates (one per consumer leg)
  are SPECIFIED in W34's ledger + AUTHORED sibling-side under each consumer's own tranche, gated on the AX
  publish (W34 writes no sibling gate; it specifies the close-gate the consumer session authors).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an idiomatic gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — by reference, not restated. This wave's §3a auto-triggers (HALT the failing unit + dispatch the research→plan-augment→redress triumvirate, never stall): the FileBounds whose expansion would invalidate the wave — any need to write glass-ui `src/`, a sibling repo's source, or a `package.json` pin (W34 is doc + receiver-ledger ONLY; the glass-ui-OWNED legs land in their NAMED waves — `useLayerTransition` re-export is W01/W02, the apple-spring excision W05, the atoms-door W10, the configurator/metric-pill/Fraunces legs W21/W22, the `@source` deadlink W25a, the speedtest/muster receive W28, the keyframes migration W35, the publish hinge W41 — re-scoping any of them into W34 is a scope-reveal → halt + triumvirate, NEVER absorb in-line); the §16 receiver-body authorship colliding with a co-author's `coordination/CONSTELLATION.md` section (W28 OPENS band-K + gate-0; W35 appends band-N; a write outside the §16-receiver bands is a scope-reveal). The hard-gate failures that are not local-edit-recoverable: if the carry-closure meta-assertion (`rg` over the ledger returns zero un-receivered `{receiver-wave, close-gate}`-less §16 items) cannot be made machine-checkable from the ledger shape, escalate the gate design rather than hand-curating the closure list; if a sibling-baseline capture reveals an unexpected-branch or dirty sibling that blocks recording a leg, that is a §6.3 cross-session-clobber coordinate (record it as a born-RED handoff gate, do NOT halt the wave). The diagnostic loop whose third iteration halts: if a consumer idiom resists a clean `{receiver-wave, close-gate}` route after three census passes (an ambiguous owner between a library wave and a consumer leg), dispatch research+plan+redress to re-adjudicate the §4-note-22 DEDUP boundary rather than re-routing it a fourth time. A §5.3 ratify reaching un-ratified — the USF eighth-consumer ledger row or any consumer-adoption disposition the charter marks USER-ADJUDICATED — → §6.2 Class-3 HALT-AND-RATIFY (record the default, do NOT self-ratify a consumer's migration disposition).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH clause)

**Coordination / analysis gates — born-RED→GREEN (glass-ui-side, document-reconciliation artefacts).** Per
`precepts/instructions/tranche/SPEC.md:96-104` the accepted artefact forms are
build/test/runtime/deletion/explicit-document-reconciliation; W34's gates are document-existence +
explicit-routing-completeness artefacts (a coordination doc + a carry-closure meta-assertion) — precept-valid,
NOT grep-only-for-runtime-behaviour (this is a coordination/analysis wave with NO library runtime surface; the
runtime axis lives in the per-consumer adoption legs' own sibling-session π-lane audits, see the VISUAL-TRUTH
clause).

1. **`coordination/CONSTELLATION.md` exists with the §16 receiver bands — born-RED → GREEN (a
   document-existence + completeness artefact).** Asserts the file exists and carries, per consumer
   (value.js / speedtest / muster / fourier / words / bbnf-buddy / bbnf-playground), a HEAD + branch +
   `git status --porcelain` tree-cleanliness column + the commit-vs-handoff-patch disposition. **Born-RED**
   (the §16 bands do not exist at HEAD); GREEN after W34 authors them (extending W28's band-K opener).
2. **The §16.3 per-consumer idiom census is authored with every leg routed — born-RED → GREEN (a
   routing-completeness artefact).** Asserts every consumer idiom-adoption leg (the seven consumers' census
   rows) carries an explicit `{receiver-wave, close-gate}` carry-tag. **Born-RED** (the census is unwritten);
   GREEN after W34 authors it.
3. **The carry-closure meta-assertion returns ZERO un-receivered §16 items — born-RED → GREEN (the bbnf BD-G7
   carry-closure artefact).** A documented `rg` over the ledger asserts every §16.1/§16.2/§16.3 harvested item
   is closed in an AX wave OR carries an explicit `{receiver, close-gate}` carry-tag (no bare "handed off"
   terminal — the chronic-closure meta-invariant). **Born-RED** (un-receivered §16 items exist at HEAD); GREEN
   after the routing is complete. (W33's `proof:ax-final` carry-closure leg reads this same ledger at tranche
   close — W34's gate is the input, W33's is the terminal assertion.)

**VISUAL-TRUTH clause (the NON-NEGOTIABLE AX.W00 close discipline).** This wave has **NO glass-ui library
surface** — it writes no `src/`, ships no component, changes no rendered pixel. Per the charter `### AX.W34`
gate line: **VISUAL-TRUTH is NOT-APPLICABLE to the glass-ui side** (there is no library surface to live-audit).
The visual-truth obligation is NOT waived — it is DELEGATED: **each consumer-side adoption leg live-audits in
its OWN sibling session POST-PUBLISH**, under the cross-repo π discipline (the π lane is constellation-wide and
binding on the consumer repos, per AX.W00). W34's ledger SPECIFIES, per leg, the consumer-side VISUAL-TRUTH
close-gate (a paired BEFORE/AFTER + DELTA live Playwright + frontend-design audit on the consumer surface — e.g.
value.js's dock morph after the fork deletion reads as one continuous iOS spring; words' dock un-breaks after
the pin bump off `container-type:inline-size`; fourier's Configurator + Slider + dock render correctly on the
AX-rebuilt surfaces; bbnf-playground's dock+slider+dialog+tooltip dogfood renders correctly). W34 RECORDS the
delegation; the consumer sessions EXECUTE the live audit. The W34 glass-ui-side close is the
document-reconciliation gates above — but the wave's ledger is INCOMPLETE if any consumer leg lacks a recorded
consumer-side VISUAL-TRUTH close-gate (so the visual-truth axis is structurally present in the ledger, never a
headless routing exercise alone). This is the §16.4 zero-loss form of the cardinal AW lesson: a consumer
adoption is NOT "done" on a recorded route — it closes on the consumer's own live audit after the AX cut
publishes.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + the 7-consumer sibling-baseline capture.** Orchestrator-run
   read-only `git -C <consumer> status --porcelain / branch --show-current / log --oneline HEAD~10..HEAD` for
   each of value.js / speedtest / muster / fourier / words / bbnf-buddy / bbnf-playground; confirm the three
   RED witnesses (no §16 bands in the coordination doc; zero AX wave folds §16.1/16.2/16.3; each census idiom
   live-present in the consumer). Re-confirm the publish-currency findings are AT HEAD (do NOT re-route them
   as code defects — §4 note 12). Do NOT trust the digest's word — re-verify each census idiom live.
2. **Extend `coordination/CONSTELLATION.md` with the §16 receiver bands.** Append the per-consumer
   HEAD/branch/tree-cleanliness columns + the commit-vs-handoff-patch disposition + the writer-vs-reader
   boundaries + the conflict-resolution protocol, DISJOINT from W28's band-K section. Capture the
   sibling-baseline ritual snapshots.
3. **Author the §16.1 harvest-residue routing record.** Route every digest-harvested deferred/dropped item to
   its AX wave with a `{receiver-wave, close-gate}` carry-tag OR an ARCHIVE-with-rationale; record the §4 note
   22 DEDUP-ledger dispositions (W41 the only NEW wave; the rest DEDUP'd). Confirm no harvest residue is
   unrouted.
4. **Author the §16.2 constellation-leverage survey.** Record the slides leverage (the 510-line local
   `constellation.ts` → the shipped `/constellation`, routed to slides W30/W32); record the `warpTo`→W17
   boundary (the §15 mechanic is a W17 build, W34-noted not W34-scoped); record the data-graph non-goal
   (value.js Conversion Graph + slides node-flow charts OUT, per §4 note 16); record the no-displacement
   findings for value.js/keyframes/fourier/speedtest.
5. **Author the §16.3 per-consumer idiom census + the adoption ledger.** The seven consumer legs with their
   `{receiver-wave, close-gate}` carry-tags + each leg's consumer-side VISUAL-TRUTH close-gate; the
   glass-ui-OWNED debt routing to its NAMED wave (recorded, not edited); the publish-currency hinge (every leg
   gated on the AX publish via W41); the ≥2-consumer pane-slide WATCH.
6. **Apply the chronic-closure discipline + the carry-closure meta-assertion + close.** Author the BD-G7
   "Carry-tags TO" / "Carry-tags FROM" tables; name the phantom-owner re-defer anti-pattern; specify the
   carry-closure meta-assertion (zero un-receivered §16 items — the W33 close-gate input). Write
   `audit/W34-…json` to its born-RED→GREEN state. Confirm the carry-closure assertion returns zero
   un-receivered carries.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W34-cross-constellation-idiom-consumer-adoption-ledger.json` — the born-RED ledger
  (the three RED witnesses with their live measurements + the 7-consumer sibling-baseline capture), the §16.1
  harvest-residue routing record (the DEDUP-ledger dispositions per §4 note 22), the §16.2 constellation-leverage
  survey (the slides-adoption leg + the `warpTo`→W17 boundary + the data-graph non-goal), the §16.3 per-consumer
  idiom census (the seven consumer legs with their `{receiver-wave, close-gate}` carry-tags + each leg's
  consumer-side VISUAL-TRUTH close-gate spec), the publish-currency hinge record (§4 note 12), the
  chronic-closure / phantom-owner discipline application, the ≥2-consumer pane-slide WATCH, and the
  carry-closure meta-assertion spec (the W33 close-gate input).
- `coordination/CONSTELLATION.md` (the §16 receiver bands — DISJOINT from W28's band-K section) — the
  per-consumer HEAD/branch/`git status --porcelain` tree-cleanliness columns + the commit-vs-handoff-patch
  disposition, the sibling-baseline capture, the writer-vs-reader boundaries, the conflict-resolution
  protocol, and the BD-G7-form "Carry-tags TO" / "Carry-tags FROM" tables (each carry-tag:
  `{owner-wave, receiver-wave, concrete-blocker, receiving close-gate}`).
- The per-consumer adoption-leg routing table (in the ledger json) — value.js / speedtest / muster / fourier /
  words / bbnf-buddy / bbnf-playground, each with its idiom-adoption list, its glass-ui-OWNED-debt → NAMED-wave
  routing, its pin-bump → W41-publish-hinge gating, and its consumer-side VISUAL-TRUTH close-gate.
- The consumer-side adoption-PR outcomes (REFERENCED, not glass-ui-owned, POST-PUBLISH) — each consumer
  session's adoption PR + its sibling-side close-gate + its own π-lane VISUAL-TRUTH capture, recorded by
  reference once the AX cut publishes.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `docs(AX.W34): born-RED baseline — no §16 bands in CONSTELLATION.md, zero AX wave folds §16.1/16.2/16.3, every consumer idiom live-present + unrouted (slice 25/26/27 + idiom slices 10/12/14/15/16/17)`
2. `docs(coordination): extend CONSTELLATION.md with the §16 receiver bands — 7-consumer HEAD/branch/tree-cleanliness + commit-vs-handoff-patch disposition + sibling-baseline capture (AX.W34, disjoint from W28 band-K)`
3. `docs(AX.W34): §16.1 harvest-residue routing record — every digest item → {receiver-wave, close-gate} or ARCHIVE; the §4 note 22 DEDUP-ledger dispositions (W41 the only NEW wave)`
4. `docs(AX.W34): §16.2 constellation-leverage survey — slides 510-line local constellation.ts → /constellation (W30/W32); warpTo→W17 boundary; data-graph non-goal (§4 note 16)`
5. `docs(AX.W34): §16.3 per-consumer idiom census + adoption ledger — 7 consumer legs with {receiver-wave, close-gate} + consumer-side VISUAL-TRUTH gate; publish-currency hinge (§4 note 12 → W41)`
6. `docs(AX.W34): chronic-closure discipline + BD-G7 carry-tag tables + carry-closure meta-assertion (zero un-receivered §16 items — the W33 close-gate input); name the phantom-owner re-defer anti-pattern`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash/
checkout per the hardened agent git clause, in glass-ui AND in any peer repo. Cross-repo push is ALWAYS
orchestrator-authored per ORCHESTRATION.md §Cross-repo commit policy. These are the messages the orchestrator
authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (the visual-runtime π lane + the "live re-diagnosis BEFORE the fix" wave-open ritual) — the
  binding dependsOn.** The charter `### AX.W34` block (line 1624) lists `dependsOn AX.W00`. W34 inherits W00's
  wave-open re-diagnosis ritual (re-confirm each census idiom live in the consumer before recording its leg —
  do NOT trust the digest's word, the analogue of AW's dock-misdiagnosis). The per-consumer adoption legs'
  VISUAL-TRUTH close-gates (recorded by W34, executed sibling-side post-publish) run the W00 paired-π
  BEFORE/AFTER + DELTA protocol on the consumer repos (the cross-repo π discipline is binding on the
  consumers) — so W34's ledger structurally carries the visual-truth axis W00 makes non-negotiable.
- **Why NOT a dependsOn on the dock/graphics/primitive/encapsulation bands (W01-W26):** W34 RECORDS the
  consumer legs that depend on those waves' library edits; it does not itself perform them. The recording is
  read-only-analysis + coordination-doc authorship, which is valid the moment W00 stands up the π discipline —
  the consumer legs are GATED on the named waves landing + the AX cut publishing (W41), but the RECORDING is
  not. W34 is the HUB; the spokes (W01/W02/W05/W10/W21/W22/W25a) land independently and the consumer adoption
  fires after the publish.
- **Routes (not blocks): every AX library wave + W41 + W33.** W34 routes each consumer leg's glass-ui-OWNED
  debt to its NAMED wave (W25a/W01/W02/W21/W22), each pin-bump to the W41 publish hinge, and the carry-closure
  meta-assertion to W33's tranche-close terminal. W34 is the §16.4 zero-loss forcing-function the W33
  carry-closure gate reads as input. **Coordinates with W28** (the coordination-doc opener — W28 owns band-K,
  W34 owns the §16-receiver bands of the same doc) and **W35** (the keyframes migration DAG — W34 records
  keyframes' idiom legs in the census, W35 executes the keyframes migration IMPL).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited as evidence)

- **REQUIREMENTS.md:190-204 (§16, the 2026-06-07 cross-constellation directive — all four sub-directives)** —
  the directive that landed AFTER the 32-agent deep-audit corpus was built, so the corpus never routed it
  (slice 25 F1; slice 26 §16-finding). §16.1 (the last-10-tranches-per-repo harvest, fold into ADDITIONAL AX
  waves) + §16.2 (constellation-leverage survey) + §16.3 (per-consumer idiom-maximization / library-optimum)
  + §16.4 ("NOTHING DEFERRED OR DROPPED. Zero loss") — the binding precept the receiver discharges.
- **`constellation-analysis-corpus.json` (the 32-agent §16.1 read-only harvest, already RAN) +
  `converge-digest.md`** — the harvest is DONE; W34 is the RECEIVER, not a re-run (slice 26 chronic-closure
  finding; AX.md CONVERGE fold (a) lines 1686-1688). The digest's `NEW-WAVE? AX.W34` candidate (digest line
  315) is the proposed shape this spec operationalizes.
- **value.js `useLayerTransition` fork header docstring** (the fork "spells out" the FLIP-width + CSS-transition
  algorithm AX.W01 names as the dock-desync root) + the value.js goo-blob fork (343-line `useMetaballRenderer`
  with its own `cssColorToRgb`) + the WatercolorDot global-singleton `<SvgFilters>` mount — the substrate-fork
  evidence the §16.3 census records as adoption legs (slice 10 F0/F2/F3). The forks exist BECAUSE the
  `/dock` barrel never re-exported `useLayerTransition` (the substrate-with-consumer gap W01/W02 close).
- **words `node_modules/@mkbabb/glass-ui/dist/dock.js:219` `container-type:inline-size`** — words runs the
  BROKEN pre-3.4.0 dock on a stale `^3.0.0` pin (slice 16 F0); the 5 `hsl(var(--token))` never-paint sites +
  the missing `@source` directive + the 142-import-sites-zero-new-idioms corpus (slice 16 F2/F3/F6/F7) — the
  §16.3 PRIMARY evidence site. words was DROPPED (not folded) by the prior charter (slice 16 F7) — the §16.4
  violation W34 closes.
- **fourier 14 `.cartoon-card` dead-class divs** (`.cartoon-card` removed from glass-ui at C.W5, resurrected
  locally on `cartoon-surface` in `style.css`) + the `SliderControl.vue` re-deriving `LabeledSlider` + the
  fourier two-co-mounted-docks VT-name collision (`glass-dock-1` duplicate → dropped morph snapshot + ~13 red
  e2e — the W00 π-lane / W01 regression fixture) — slice 12. fourier's `^3.1.0` pin holds 4 already-shipped
  fixes hostage (the dock-VT-name `useId` fix, the ConfiguratorLayer `inert` a11y fix, `asideSide`,
  `useTextHighlight`).
- **muster `--signal-*`/`--origin-hue-*` decomposed channel-triples** (`hsl(var(--signal-X-h) var(--signal-X-s)
  var(--signal-X-l))` — the anti-pattern CLAUDE.md names "NEVER `hsl(var(--token))`") + the LabeledField
  under-adoption + the `glass-pill` slider (a variant W23 RETIRES) — slice 15. muster's native-receive
  (metric-cell/stack/instrument-chassis) is W28; the idiom legs are W34-recorded.
- **bbnf-buddy BottomDock `<Transition name="dock-layer" mode="out-in">` + LeftToolsDock plain `v-if`** (both
  editor docks ABANDONED `DockLayerGroup`, citing "its inner grid chain was the source of the vertical overflow
  fight" + "DockLayerGroup buys nothing") + the BottomDock wrap scroll/mask + `--radius-2xl` workaround + the
  ToggleChip active-label token-cohort gap — slice 17; AX.W02 CONVERGE fold (the demand-side diagnosis the W02
  re-adoption closes).
- **slides `til-briefing/constellation.ts` (510 lines, Slide01 cover + Slide10 closing web)** — STILL run
  locally despite the shipped abstracted `/constellation` (slice 19 — the §16.2 PRIMARY leverage surface, the
  slides adoption routing to W30/W32). The `warpTo` mechanic does NOT exist in EITHER repo (slices
  19/20/22/23 BLOCKER findings; §4 note 15) — it is NET-NEW W17 design, W34-noted not W34-scoped.
- **The publish-currency lineage (§4 note 12; AX.md:2057-2067)** — glass-ui HEAD `eaba94f` (batch-1
  integrated, UNPUBLISHED); the published registry line 3.6.0 (consumers pin 3.0.0-3.6.0). The Card specular
  pointer-wiring (AW.W24), the VT `.ready`-swallow, `useGlobalDark({initialValue})`, and `deriveAurora`/
  `resolveAtoms` are AT HEAD but NOT in what consumers dev-resolve — the "still broken" findings are a
  publish-currency gap, recorded with the W41 publish hinge as the restoration gate.
- **The chronic-closure / phantom-owner lineage (digest hist:keyframes `H/audit/_SYNTHESIS-deferred-ledger.md`
  §0/§1/§2 + hist:bbnf-lang `BC/audit/W6-bd-carry-contract.md`)** — keyframes' M1/M2/M3 re-paper class (four
  chronics "exited" the A→G ledger on PAPER) + bbnf-lang's BD-G7 carry-ledger discipline (`rg -n 'BD->B[A-Z]'`
  returns zero IS the gate) — the carry-tag + chronic-closure discipline W34 adopts so its own ledger cannot
  re-defer the consumer adoptions the AW way.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-N binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **cross-repo coordination doc + sibling-baseline-capture ritual** (`precepts/instructions/tranche/SPEC.md:19`
  "`coordination/<peer-letter>.md` … required when the tranche has a confirmed cross-repo race surface
  (parallel-tranche, shared surface, or deferred cross-repo handoff) … names the other repo's HEAD at
  coordination time, the surfaces both tranches may write, the writer-vs-reader boundaries, and the
  conflict-resolution protocol" + `:38` "`coordination/CONSTELLATION.md` if cross-repo origin"; the bbnf
  sibling-baseline-capture ritual per the charter §0). W34 EXTENDS `coordination/CONSTELLATION.md` with the
  §16 receiver bands and captures each consumer's HEAD + status + branch BEFORE any cross-repo edit. MUST NOT
  record a consumer leg without its baseline + tree-cleanliness + commit-vs-handoff-patch disposition (the
  2026-05-18 Q dirty-tree lesson).

- **no-silent-deferrals + the §16.4 zero-loss forcing-function** (`precepts/instructions/README.md:25-27`
  "Planned work lands, is formally retired with rationale, or moves to a same-tranche named destination.
  Cross-tranche deferral is a scope-reveal trigger, not a routine close path"; `tranche/SPEC.md:191` P
  invariant 28 — "every item LANDS, RETIRES with rationale, or ARCHIVES with permanent-out-of-scope
  justification … 'deferred to next tranche' is not an acceptable close-state"). W34 IS this precept in
  cross-constellation form: it is the receiver that routes every §16.1/§16.2/§16.3 harvested item to a
  `{receiver-wave, close-gate}` or an ARCHIVE-with-rationale. MUST NOT leave any §16 item unrouted (the
  carry-closure meta-assertion FAILS if it does — this is the cardinal precept violation slice 27 named).

- **the chronic-closure meta-invariant (system-gate OR born-RED paired handoff gate — no bare-tag terminal)**
  (digest hist:keyframes `_SYNTHESIS-deferred-ledger.md` §0/§1/§2 — the M1/M2/M3 re-paper + the phantom-owner
  anti-pattern; the BD-G7 carry-ledger form from hist:bbnf-lang). Every consumer leg + every §16 item carries
  a SYSTEM-property close-gate OR (for the cross-repo handoffs) a born-RED PAIRED gate; a bare "handed off" tag
  is NOT a terminal. MUST NOT declare a leg "done" on a recorded route alone — the consumer-side close-gate
  (the consumer's own live audit post-publish) is the terminal. W34 names the phantom-owner re-defer
  anti-pattern so its own ledger cannot re-paper the consumer adoptions.

- **substrate-with-consumer / wire-before-retire** (`precepts/instructions/tranche/SPEC.md:158`
  "substrate-with-consumer wiring … describes the work required to close"; the J inv 10 / L inv 8
  substrate-without-consumer-binary; CLAUDE.md §Design Axes 3). The census records WHY each consumer fork
  exists (e.g. value.js forks `useLayerTransition` because the `/dock` barrel never re-exported it — the W01/W02
  close wires the substrate BEFORE the fork retires) and gates each fork-deletion on the library re-export
  landing + publishing. The ≥2-consumer pane-slide WATCH is the precept's positive form: promote ONLY on a
  confirmed 2nd consumer. MUST NOT record a fork-deletion leg that is not gated on the substrate landing
  (a premature deletion = a build break in the consumer).

- **cross-repo-dev-resolution contract-v2** (`docs/precepts/cross-repo-dev-resolution.md` invariant 30 /
  contract-v2 — "Consumers resolve `dist/`, dev and prod alike; every `@mkbabb/*` publisher exposes a
  `build:watch` script … so that `dist/` is always fresh"). The publish-currency findings (§4 note 12) are a
  contract-v2 currency gap, NOT a code gap — the consumers MEASURED a stale published build. W34 records that
  every consumer leg is gated on the AX cut PUBLISHING (the W41 dts-watch keystone + the pin-bump hinge). MUST
  NOT re-route a publish-currency finding (the Card specular / VT-swallow / `useGlobalDark` / `deriveAurora`
  are AT HEAD) as a code defect to re-fix.

- **the hardened agent git clause + the cross-repo commit policy** (`precepts/instructions/ORCHESTRATION.md`
  §Cross-repo commit policy + `tranche/AGENT_DISPATCH_TEMPLATE.md`). glass-ui writes NO sibling source — it
  authors the coordination doc + the receiver ledger (additive, glass-ui-side); the consumer sessions execute
  their adoption PRs under their own tranches; cross-repo PUSH is ALWAYS orchestrator-authored. Before any
  cross-repo inspection the orchestrator runs read-only `git -C <consumer> status --porcelain / branch / log`.
  MUST NOT have a glass-ui agent stage/commit/checkout in a peer repo or author a consumer-side PR.

- **no-overfitting — the W17 data-graph non-goal** (`precepts/instructions/tranche/SPEC.md` no-overfitting;
  §4 note 16). The §16.2 leverage survey MUST record the constellation as a DECORATIVE proximity-graph, NOT a
  data-graph renderer — the value.js Conversion Graph + slides node-flow charts are EXPLICITLY OUT (a semantic
  graph routed through `drawOverlay` would FAIL). MUST NOT route a semantic fixed-topology graph as a
  constellation leverage surface (a data-graph primitive, if ever wanted, is a SEPARATE component, not
  constellation prop-bloat).
