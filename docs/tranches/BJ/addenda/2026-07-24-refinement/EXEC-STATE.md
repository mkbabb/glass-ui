# EXEC-STATE — durable cursor

**Purpose: nothing is lost, nothing is redone.** Read this before dispatching anything. Update it when a
batch lands. This is the crash bootstrap.

Date 2026-07-24 · HEAD at audit `0371836d` · phase: **tranche development only, no source edits land**.

---

## STANDING CONSTRAINTS

- **Maximum four workflows per batch.** Owner-set. Exceeding it is what killed two prior runs.
- **Model law — OWNER RULING 2026-07-24, standing and final: ALL agents use Opus 5. No Fable seats
  anywhere, in any role.** This supersedes every earlier split. It is also the empirically correct call:
  Fable 5 quota died mid-run twice and took 48/57 and 5/6 seats with it.
- **SAFARI IS LIVE (2026-07-24 ~23:53 ET).** Remote automation enabled; `safaridriver` returns a session.
  Drive it with plain W3C WebDriver over HTTP — no Playwright, no deps. Probe script:
  `safari-probe.mjs` at the repo root. Traps: `pkill -f safaridriver` first (a stale driver started while
  the pref was off keeps failing forever); `DidMigrateWebDriverAllowRemoteAutomation` is NOT the setting;
  `IncludeDevelopMenu` is a different setting; `execute/sync` must `return JSON.stringify(...)`.
- **Playwright `webkit` is the ENGINE BUILD, not the Safari app, and they give OPPOSITE results.**
  Measured: Playwright-WebKit crashes 5/5; **real Safari 26.4 renders every route perfectly** (302 nodes on
  `/`, matching Chromium exactly). Bank `webkit-engine` and `safari-app` as separate cells; never infer one
  from the other. This inverted `W-WEBKIT-CRASH` from a product S0 to a harness defect.
- **THE TRI-FOLD MODEL LAW — OWNER ECOUTE-MOI 2026-07-25, supersedes the 07-24 all-Opus ruling.**
  Fable 5 orchestrates (the lead session runs Fable). All work of **complexity, design, or novelty** runs
  tri-fold: **two instances — one Fable, one Opus 5 — complete the task independently; a Fable
  adjudicator then agglomerates the pair, with serious sagacity and incredulity, into an apotheosis.**
  Every workflow leverages BOTH models; Fable only for the toughest tasks, always beside a corresponding
  Opus arm for novelty and implementation. Mechanical/bounded seats stay Opus. Seats declare `model:`
  explicitly and state their modelId. (Cached seats from pre-ruling runs carry the old "all seats Opus"
  canon text in their prompts — they stand as the OPUS ARM of the tri-fold; only their adjudication is new.)
- **W-WEBKIT-CRASH RE-MINTED — my harness-defect re-scope was TOO ABSOLUTE (corrected 2026-07-25).**
  Both cells are true and neither discharges the other: (a) real Safari 26.4 renders all 8 demo routes at
  dock REST (measured, 302 nodes on `/`); (b) the atlas relay
  (`coordination/atlas-outbound-2026-07-24-q-audit-relay.md` §0) delta-reduced a **WebKit renderer
  SIGABRT on the published 7.0.0 bytes** to `src/components/dock/styles/morph.css:125-144` — an
  `in srgb` color-mix whose BOTH endpoints are themselves `in oklab` mixes, with
  `calc(var(--dock-expand-t) * 100%)`; faulting thread
  `WebCore::Style::Color::resolvedColor → toStyleColor(ColorMix) → applyValueBackgroundColor`. Demo-rest
  probes never drive `--dock-expand-t` through the crash arm. Published-bytes crash logs win on
  consequence: the row is LIVE, S0, owned by the dock lane (GF-DOCK must design the morph without the
  nested-mix construct). RECONCILIATION.md §2 row 3.
- **RECONCILIATION LEDGER BANKED — `RECONCILIATION.md`** (`wf_6b459be5-e21`, 17 seats). 166 candidates →
  **43 distinct real gaps** (114 refuted, 69%); S0 ×4 · S1 ×17. The four S0s: (1) this corpus was
  UNTRACKED in git — cured by the commit that carries this line; (2) HEAD RED on `surface.root.exact`
  (already recorded above); (3) the dock morph SIGABRT (re-minted above); (4) **A12 blob greenfield was
  never rostered and both its gates are born-GREEN** — `grep -ci blob WAVES.md` → 0 while
  `metaball.wgsl.ts` already ships `sceneDistG`/`sminG`/`softShadow2D`, so `G-BLOB-METABALL` as drafted
  passes on arrival; re-author gates against what A12 actually names (cartoon cast, lighting, mood
  distinctness, interactivity). Also: 8 of the 54 unspecced components are already ruled DELETE/DEMOTE
  (carousel, deck, animated-digit, paper-backdrop, header-ribbon, completion-seal, tags-input,
  fourier-field/watercolor-dot) — **do not spend design lanes on them**; 13 components have ZERO design
  material anywhere (net truly cold: 8); five demo categories were never audited at all (containers 14 ·
  data 11 · feedback 7 · navigation 5 · compositions 6 pages).
- **WALL LOG 2026-07-25 ~06:1x-06:2x ET.** Reconcile completed 17/17 post-resume. Greenfield
  `wf_50bff562-da7` died 14/25 (wall + a fold bug: null lanes not filtered). Tier-2 `wf_aaa19aee-da2`
  32/46 (all benches + most jurors done; terminals died). Both resume TRI-FOLD: cached Opus seats = the
  Opus arm; a Fable arm + Fable adjudicator complete the law.
- **SOL AND LUNA ARE DONE. CLAUDE OWNS BI AND BJ — OWNER RULING 2026-07-25, standing and final.**
  The Sol/Codex audit thread and the Luna mechanical seat are dissolved. Consequences, all binding:
  - **The model law is void.** No seat is Sol x-high or Luna x-high. Every seat is Opus 5 (the 07-24
    ruling stands). `model-law RED` is struck as a status everywhere it appears — it was never a
    product defect, and the seat it demanded no longer exists.
  - **The NEEDS-LUNA backlog returns to Claude and is now ACTIONABLE.** 106 files route obligations
    into a seat that was never once filled (`git log --all | grep -ci 'model: *luna'` → **0**). Every
    one of them is Claude's to land: W8 I-2/I-3 detector · W4 nine-step cut · W7 K4 · A11Y I-13 · W6
    namespace reset · the W1/W2 gate redresses · the C3 LUNA-* design packets · P-EX1 gate binding.
  - **The five Sol-owned surfaces revert to Claude:** `ASK.md`, `PLAN.md`, `EXECUTION-PROGRESS.md`,
    `waves/BAND-REDUCTION.md`, `addenda/2026-07-21-convergent-hardening/**`. The convergent-hardening
    corpus is now ARCHIVE — read it for its findings, never for its authority or its gating.
  - **The Sol acceptance bar does not bind.** "Two fresh Sol x-high critics" cannot be satisfied by a
    seat that does not exist; it is replaced by the standing house rule — every implemented wave
    twice-challenged by gestalt passes, adjudicated, against a FINITE invariant checklist.
  - **Byte-changing work is UNBLOCKED.** Steers 21-34's Opus byte-lane halt is discharged with the
    thread that issued it.
- **ENVIRONMENT CORRECTIONS (procedural fold, 2026-07-27 — binding on every future π):**
  **glass-ui dev = port 5400. Port 5199 is sci-report's Connectivity Atlas — the standing "demo: 5199"
  line was FALSE.** Port 4188 was 3 days stale at measurement (built ~07-24; the last source commit is
  07-22, so its bytes DO match HEAD — prior 4188 measurements are substantively intact, but build
  freshness is verified before any future π, always). Evidence cells never cross-inferred:
  A = chrome-devtools/real-Chrome/DPR2/dark · B = playwright/Chromium/DPR1/light. One browser-singleton
  violation logged 15:30-15:50Z (foreign `#BENCH` div) — concurrent chrome findings in that window are
  DISCOUNTED. The blob GL-arm cut is **1,439 LOC, not 1,040** (uploadBlobUniforms 399 + UNIFORM_NAMES 52
  were omitted from the earlier figure above — that row stands corrected by this one).
- **THE BLOB "NO FISSION" COMPLAINT — MECHANICALLY EXPLAINED (procedural ledger D1).** The effective
  satellite radius is NEGATIVE below the 0.120 config-UV existence threshold (hero ships 0.10): **zero
  fission at every point in parameter space, components=1 in every frame, max-separation config paints
  one perfect circle.** Even above threshold, the orbitWiden servo saturates at 1.25 (D4/B3 — three
  anti-separation clamps encode the INVERSE of the owner's intent), and `fissionAmp` — the exact knob
  the owner asked for, fully implemented — has **zero setters anywhere**. The designed mercury-pinch
  (`fissionSnap`) was documented and unreachable. The charter's cure is not a tune; it is the physics
  redesign in PROCEDURAL-LEDGER §2.
- **PROCEDURAL ECOUTE — OWNER RULING 2026-07-25 (third Ecoute of the day):**
  (a) **Every procedural animation/substrate gets a two-sided ledger** — boons AND banes, effects AND
  defects — including its CONFIGURATOR. Owning artefact: `PROCEDURAL-LEDGER.md` (workflow in flight).
  (b) **Configurators:** standardized (the `34681df9` anatomy stands), **made larger, proper expand
  buttons, expressive and configurable — DEFT changes, the extant is "rather alright"**. F09 lineage;
  the A01 modal-expansion precedent is the natural expand mechanism.
  (c) **THE BLOB PHYSICS CHARTER (owner's words, binding):** proper meatballing AND fission — satellites
  properly SEPARATE from and ORBIT the core; **each satellite is an instance of its own Blob with
  potential recursive sub-satellites**; natural, chaotic, ELLIPTICAL orbits; fully coordinated and
  orchestrated up the blob tree — **OR emergent cohesion via simulation** (need not be fully
  coordinated): "**Experiment.**" Experimentation is authorized as tranche-development work in the
  scratchpad (prototypes, measured), never as repo bytes.
  (d) **FOURIER-FIELD — OWNER OVERRULE:** "a complete mess… shall greenfield." This overturns tier-2's
  KEEP-THIN disposition (banked hours earlier at `9c5a7451`) → **GF-FOURIER is MINTED**. The tier-2
  spec's content SURVIVES as constraints into the greenfield: WGPU-only, its 8 corrections, and the
  live slides consumer (deletion denied; relay owed — greenfield ≠ delete).
  (e) "Parts of aurora, etc." — the aurora share folds into GF-AURORA **at its lane boundary** (the
  in-flight run has frozen prompts; same law as the blob WebGPU ruling). BOUNDARY DUTY, lead-owned:
  when `wf_50bff562-da7` lands, reconcile GF-BLOB's terminal against charter (c) and GF-AURORA's
  against this ruling — neither lane may claim either ruling on its own authority.
- **LAYOUT ECOUTE — OWNER RULING 2026-07-25 (second Ecoute of the day):** on ALL pages, mobile variants
  must better take up space — full width (handling pathologically wide screens) AND height — bespoke and
  optimized for mobile. **Without contrivance or extra complexity: ONE layout where befitting; a
  perfectly optimized desktop AND mobile variant only when otherwise. Only the most modern layout
  facilities** (container queries, `dvh/svh`, grid `auto-fit`/`minmax`/subgrid, `clamp()`, logical
  properties, `:has()`). Supersedes/absorbs F14 and the landed `W-RESPONSIVE-AUDIT` (`1be91765`) scope.
  Known priors it must consume: PROPORTION.md's mobile law (every space rung steps down exactly one;
  `--ui-scale` moves the control box only, type never rides it) and its measured indictment — **seven
  transposition factors on one page** and a mobile hierarchy that collapses section into family
  (24:24:12); steer-12's mobile fixed-dock occlusions (Tabs vertical section, Search size fields,
  TagsInput validation); the blob page's chip-rail clipping at desktop 1440 (`right:1618px`); the
  Safari-402px no-horizontal-overflow baseline (8 routes). **CLOSED — `LAYOUT.md` banked at
  `b1e9fa31`** (tri-fold, 8/8, both benches adjudicated row-by-row). The spec in one line: a `100dvh`
  shell grid with the dock as an IN-FLOW ROW (occlusion impossible by construction), an
  orientation-aware rail/dock seat law (`>48rem ∧ landscape` = rail; portrait = dock-only), four derived
  measures (66ch prose · 21rem cel · φ·cel wide · 96rem article = 2× the seat threshold), the cel field
  turning surplus width into COLUMNS never line-length, ONE ladder transposition, and exactly ONE
  surviving fork (the configurator studio, re-keyed viewport→container). Notable catches:
  `viewport-fit=cover` is ABSENT from `index.html:9` so every `env(safe-area-*)` in the tree is inert
  today; the `useBreakpoint` deletion was re-ruled on doctrine merit because its "0 call sites"
  rationale hit the same rg blind spot as the consumer mis-prune (live external consumers exist) —
  routed to LIB-SEAM with consumer addenda. Implementation = execution-phase; owner before/after
  captures owed per §9.
- **GREENFIELDING IS TRANCHE-DEVELOPMENT WORK — OWNER RULING 2026-07-25, standing.** "All greenfielding
  should be done in-tranche development, NOW, rather than deferred until tranche execution time. All
  lanes thereof." This strikes the `EXECUTION-PROGRESS.md` P-EX4 posture that parks the four greenfields
  (and their owed pass-4) behind execution. Every greenfield lane — GF-DOCK, GF-AURORA, GF-BLOB,
  GF-HANDMARK, plus **GF-TIMELINE (new, minted by the apotheosis flip, no spec existed)** — is designed
  to terminal now. Execution consumes a finished design; it does not author one.
- Every seat consumes `ANALYSIS-SPEC.md`. Every finding cites `ROUND-1-FINDINGS.md` by id.

---

## DONE — do not redo

| work | artifact | note |
|---|---|---|
| 12-lens audit, 136 findings | `ROUND-1-FINDINGS.md` | source of record; cite by id |
| Finding families A–N, X, Y, Z | `REGISTRY.md` | includes a **Corrections** section |
| Six laws, band DAG, supersession | `REFINEMENT.md` | **Law 6 added** after an adversarial pass proved the first five insufficient |
| Wave set with born-RED gates | `WAVES.md` | |
| Owner-item reconciliation, 76 rows | `ECOUTE.md` | **1 of 76 closed**; dominant failure = verdict laundering by proximity |
| Reduction, re-authored defect-first | `REDUCTION.md` | §1 records every killed claim so none can be re-raised |
| Deterministic component graph | `DAG.md` + `scratchpad/dag-deterministic.json` | 62 nodes, full feature vectors; generator `scratchpad/dag3.mjs` |
| Graph clusters + cycles | `scratchpad/dag-clusters.json` | **56 clusters, 53 isolated singletons, 1 cycle** |
| Motion law | `MOTION-CANON.md` | 8 spring rows → 6, `settleBand`, rank system |
| iOS-27 photometry | `IOS27-ARCHIVE.md` | graded blur, vaporize, corner affordance, frost quadruple |
| Tier-1 component specs (8) | `COMPONENT-WAVES.md` | **SUPERSEDED** — single-seat, benches died on quota |
| **Tier-1 TERMINAL specs (8) + fold** | **`COMPONENT-WAVES-TERMINAL.md`** (1,376 lines) | `wf_df5ddb7a-134`, 60 seats, 4.9M tokens. Thrice-challenged + juried + re-authored. **All eight changed**; four changed disposition. Cite this, never `COMPONENT-WAVES.md`. |
| **Tier-2 TERMINAL specs (8) + fold — FIRST TRI-FOLD BATCH** | **`COMPONENT-WAVES-TERMINAL-2.md`** | `wf_aaa19aee-da2`, 65 seats. drawer→**MERGE-INTO dialog** (sheet home overturned — sheet was retired one cut ago, 3 on-disk records) · dialog→SPLIT+ABSORB (confirm/gate per C66) · **deck→DELETE** (overturns DAG MOVE-TO) + carousel/pager fold · sortable-list→KEEP+flatten (a11y transaction preserved byte-for-byte) · search→SPLIT (`composables/search/`) · **tags-input demote STRUCK** · **fourier-field deletion DENIED — external consumer (slides) verified 3×** · constellation KEEP-THIN, "0 consumers" overturned (slides imports 6 runtime + 3 types). **16/62 components now terminal.** The adjudication demonstrably worked: five split cells ruled on drawer alone, each arm's errors struck with falsifiers (Fable's LOC double-count; Opus's unearned W3 sequencing block). |
| **THE CONSUMER-DEFINITION LESSON (tier-2, binding on the census question)** | — | The zero-consumer census (45-70% spread) used **src-only** consumers. Tier-2 proved that definition WRONG in kind, not degree: fourier-field and constellation both have live **cross-repo** consumers (slides). The owner sentence that settles the census must rule on: src edges · demo sites · barrels · CSS `@import` · **sibling repos (slides/value.js/atlas/sci/keyframes)**. Until then NO deletion may cite a zero-consumer figure without a fresh cross-repo grep — [[feedback-consumer-updates-ruling]] still governs what a consumer is OWED (nothing), but existence changes the relay duty. |
| Tier-1 band reconciliation | `BAND-FOLD.md` | |
| Audit dimensions | `ANALYSIS-SPEC.md` | D1–D12 + the three benches + rules of judgement |

### Lead-verified facts (do not re-measure)

- 62 components, 56,676 LOC (34,018 code / 17,620 comment). `src` **39.4% comment**; components 34.0%;
  dock 51.7%; `styles/tokens` **72.8%**.
- **42 of 62 components (38,204 LOC, 67%) have zero `src` consumers.**
- Component graph is nearly edgeless: **56 clusters, 53 isolated singletons (43,929 LOC)**; one real
  cluster `dock·slider·select·popover·dropdown-menu` (10,655 LOC); one cycle `dock → dropdown-menu → dock`.
- `npm test` **RED** at HEAD; `release.yml:48` runs it immediately before `npm publish` at `:50`.
- **Optional-peer S0:** `@mkbabb/keyframes.js` declared optional yet statically reachable from the root
  entry via `glass-ui.js → button → useLiquidPress → useSpring`. **`value.js` is NOT reachable — its
  quarantine works; the audit misattributed it.**
- **Types S0:** empty surface under `node16`/`nodenext` (`TS2305` on `Button`); clean under `bundler`.
  Cause: `dist/index.d.ts` re-exports with **extensionless** specifiers in a `"type":"module"` package.
- **WebKit crash — RE-SCOPED, not a product defect.** Playwright-WebKit crashes 5/5 whenever the demo
  mounts: a threshold on the **population of `color-mix()`-valued custom properties** — keep 38 OK, keep 46
  CRASH, 249 shipped. **The `@supports` guards are innocent** (unwrapping them while keeping the
  declarations still crashes); flattening the three largest families (~41 decls) is insufficient, so the
  cure is a restructure, not a trim. **BUT real Safari 26.4 renders all 8 sampled routes at both 1440x900
  and 402x874 with zero crashes** — `/` at 302 nodes, exactly Chromium's 302. It is a **harness defect**;
  `W-WEBKIT-CRASH` leaves Band 0.
- **BLOB — OWNER RULING 2026-07-25: WebGPU ONLY. The WebGL2 arm dies.** Measured live at 1440×900 on
  `/substrates/blob` (screenshot-decoded; never `getContext` on a live WebGPU canvas):

  | sample | rgb | L | C | h |
  |---|---|---|---|---|
  | blob body | `rgb(232,191,137)` | 0.827 | **0.0845** | 73.5° |
  | stage plate | `rgb(240,231,222)` | 0.933 | 0.0158 | 68.5° |
  | page cream | `rgb(239,225,212)` | 0.916 | 0.0228 | 62.9° |

  **Δh from the room is 10.6°** — the creature is the same hue family as its own wallpaper and separates
  only by lightness (ΔL −0.105). That is the inverse of cartoon-technicolor. **No satellites, no fission,
  no merge event in the default state** — the behaviour the component is named for does not appear, while
  the story copy promises "proper metaballing". Owner: *"a total disaster… no notion of proper goo
  meatballing, no visible fission of satellites."*
  **Two renderers ship:** WebGPU (`metaball.wgsl` + `wgpuSetup` + `uniformBridgeWGPU` + `uploadBlobUniforms`,
  **1,582 LOC**) and WebGL2 (`metaball.frag/vert` + 4 `.glsl.ts` + `buildMetaballProgram`, **1,040 LOC**),
  picked once by a `navigator.gpu` feature-detect. `README.md:442` calls the GL arm *"the WebGL2 fallback
  (BYTE-UNTOUCHED — the GL-shader fence)"*. On this machine the badge reads `WebGPU · apple · metal-3`, so
  the 1,040-LOC arm **never paints and is unverified** — a textbook masking fallback under
  [[feedback-no-masking-fallback]]. **CUT IT.** WebGPU only, clean break, no alias, no capability shim; if
  WebGPU is absent the component fails loudly. ~1,040 LOC deleted.
  Also live on that page: the mood chip row **clips mid-word** ("Excited" cut at `right: 1618px` inside a
  1440px viewport), the Interaction panel **occludes the stage canvas**, and the intro copy is pure
  meta-jargon ("the lit static register, the pointer-reactive interaction hero, the pause seam") — the
  exact class `W-STORY-COPY-CANON` (`75c19ead`) was supposed to kill, surviving here.
  **Applies to `GF-BLOB` at its lane boundary** — the greenfield run `wf_50bff562-da7` was launched before
  this ruling and its prompts are frozen, so it is designing against the dual-backend premise. Same
  steer/launch race recorded as E6 against the Sol thread; do not let the lane's output claim the WebGPU
  cut on its own authority.
- **THE PREFIX TRAP — S0, live in PUBLISHED 7.0.0, independently confirmed twice.** The build drops the
  unprefixed `backdrop-filter` declaration and keeps only the `-webkit-` alias, which Chromium does not
  implement. Verified on disk in the **published** `dist/glass-ui.css`:
  `.glass-slider[data-variant=spectrum] .slider-range{-webkit-backdrop-filter:none;…}`. Consequence: the
  spectrum ramp keeps `blur(7px) saturate(1.4) brightness(1.02)` over half its own colour ramp with a hard
  seam at the handle — **the colour picker does not show the colour it picks** (49.6% of the track crop
  changes when fixed; seam at x=643/644). 4 instances on `/forms/slider`, 15 on `/substrates/aurora`.
  **Seven prefixed-only sites total** — Slider, GlassTimeline ×2, SegmentedTimeline, ScrubberTimeline,
  dock `adaptive-legibility.css:128`, tabs `segmented.css:215`. The Sol/codex thread reached the identical
  seven independently (steer 28 / `W4-PREFIX-PIPELINE-ADJUDICATION-C5`, root-caused to installed Lightning
  deleting the unprefixed leg when source authors unprefixed→vendor order). Two independent audits, same
  seven declarations. The dock one also means `[data-backdrop-mode=static]` does **not** disable its blur.
- **THE ZERO-CONSUMER CENSUS IS NOT SETTLED. Carry the spread, never a single number.** Five independent
  runs, four incompatible answers. The variable is the DEFINITION, not the code.

  | run | members | LOC | share | definition |
  |---|---|---|---|---|
  | `DAG.md` (original) | 42 | 38,204 | 67% | — |
  | dag-triumvirate | 42 | 30,594 | 54.0% | code+style edges, 3 barrels excluded |
  | **lead, this session** | **41** | **31,290** | **51.8%** | code edges only, 3 barrels excluded |
  | lead, `@import` counted | 33 | 27,348 | 45.2% | CSS `@import` = a consumer |
  | reckoning reader | 43 | 42,106 | 69.6% | code edges, barrels excluded |
  | reckoning adversary | 42 | 41,016 | 69.5% | — |

  The ~11k LOC spread is whether the giants (aurora 9.0k, dock 8.0k, blob 5.6k) count as consumed.
  **Do not cite 54.0% — I published it prematurely and it is one run of five.** The honest range is
  **45–70%**, and one owner sentence defining "consumer" (do demo/ sites count? do barrels? does a CSS
  `@import`?) collapses it in minutes. **Also STRUCK: my "nine phantom consumers" story ran backwards** —
  counting `@import` as a consumer *removes* exactly 8 members (`card completion-seal dark-mode-toggle
  drawer header-ribbon instrument-chassis metric scroll-progress-rim`; my delta set and the reckoning's
  match exactly), so it shrinks the zero-consumer set, it cannot inflate it. The Configurator
  "slated for demotion" note still falls — it rested on a single `@import`-as-consumer read.
  `EXEC-STATE`'s old "56 clusters / 53 singletons" and the extractor's "36 / 30" are 20 clusters apart:
  **carry neither.**
- **dock↔dropdown-menu SCC — settled; one graph, two granularities.** `dock/DockTrigger.vue:11` →
  `../dropdown-menu/DropdownMenuTrigger.vue`; `dropdown-menu/DropdownMenuContent.vue:11` →
  `../dock/composables/dockContext`. The **directory** cycle is LIVE at HEAD; the **module** cycle is not
  (`dockContext.ts` reaches only `vue`, `composables/context`, `../constants` — a real leaf). Sol's
  `REJECTIONS.md` computed the file-level result correctly and then stated it as an absolute
  component-level verdict. The finding is right; the phrasing is the defect.
- **HEAD IS RED, and BJ broke it — S0.** `npx vitest run tests/public-surface.spec.ts` → **1 failed /
  80 passed**, `surface.root.exact` at `:483`. `44621bb4` (W-REFRACT-LATCH) widened the public root
  surface with `armGlassRefract` + `supportsBackdropRefract`; the governed expectation list was never
  updated. HEAD-intrinsic, not a dirty-tree artefact: committed `src/composables/glass/index.ts:38`
  exports both, committed `src/index.ts:163` re-exports the barrel, and the committed spec greps **0**
  for `armGlassRefract`. `b5e70155` reverted the mount-arm, **not** the export. `release.yml:48` runs
  `npm test` immediately before `npm publish --provenance` at `:50` — this blocks the 8.0.0 cut.
  **Sol adjudicated this exact commit with four named exact-byte critics plus three follow-on commits and
  a NEEDS-LUNA route, and not one of them ran the suite.** One command falsifies the whole W8 review stack.
- **Frost, measured live:** `.segmented-tabs` and `.glass-track-well` both compute
  **`backdrop-filter: none`** — ~50% cream veils, no blur; tabs carries white inset specular at 0.30 alpha.
  The slider's *fill* is correctly frosted (`blur(7px) saturate(1.4)`) while its *track* is not.

---

### Banked from the four-workflow batch (2026-07-24, ~15.6M subagent tokens)

| artifact | content |
|---|---|
| `COMPONENT-WAVES-TERMINAL.md` | **5 terminal specs** that survived thrice-challenge + triumvirate: aurora, handmark, tabs, alert, **dock**. Supersedes the single-seat versions. |
| `DIRECTORY-SHAPE.md` | the measured directory census — zone shape, size distribution, long-running dirs, module-name repetition, tests inside `src/`, barrels, deepest paths |
| `GRAPH-RULINGS.md` | graph adjudications for the `giants`, `mid` and `small` batches |

**The challenge pass changed outcomes rather than ratifying them** — the evidence that the triumvirate is
real work and not theatre:

- **`W-DOCK`: "strip cure / KEEP" → `GREENFIELD`, 14 props → 8**, one state token, a keyboard path, the
  layout bridge. The unchallenged seat had proposed a net-flat edge-trim of the component the owner
  condemned outright.
- **`W-HANDMARK`: KEEP-THIN → `GREENFIELD`**, and the pass discovered a **live external-consumer crash**:
  `shape="path"` throws on all seven brushes, and the same defect ships in the consumer's pinned 6.0.0
  dist. Also found `natural`/`amplitude` is a shipped no-op behind a blurb promising a visible effect — a
  defect absent from `ROUND-1-FINDINGS.md` entirely.
- `W-ALERT`, `W-TABS`, `W-AURORA` re-authored with tightened dispositions.

## IN FLIGHT — see `WORKFLOWS.md` §LIVE RUNS for the current batch (this table is historical;
the run ledger there is the single source of record for run state)

---

## OWED — dated status marks added 2026-07-28 per VALIDATION CURE-7: rows 1 (tier-2/3 done to 33/62 +
roster-ruled remainder), 2 (DAG-RULINGS), 3 (DIRECTORY-SHAPE + STRUCTURE-ZONES), 4 (PROPORTION +
PROPORTION-CATEGORIES), 6 (FROST-TABS Q-1 discharge) are **DISCHARGED**; row 5 (the Safari arm) is
**the one live row** — owner roster #3/#10, the serialized browser seat.

1. **Remaining 54 components** — every component gets its own workflow (tier 1 = dock, aurora, slider,
   tabs, alert, toast, handmark, timeline is done).
2. **DAG triumvirate** over all 56 clusters + the cycle — two benches assuming the graph is WRONG, one
   adjudicator, batch size bespoke per cluster.
3. **Structure settlement** — colocation, goldilocks granularity, module-name stripping, test displacement
   out of `src/`. Library **and** demo.
4. **Aristotelian proportion + full visual state matrix** — every page/component/state, both directions
   (superfluous → remove; insufficient → add affordance).
5. **Safari arm — UNBLOCKED.** Capture the full `safari-app` cell of the π/DELTA matrix across every
   route and state, desktop + mobile, and bank it separately from `webkit-engine`.
6. **The saturate contradiction** — motion canon says down on cream, iOS photometry measures +62% and says
   up. `W-FROST` makes the measured quadruple the gate; the first paired capture settles it.

---

## THE FOURTH + FIFTH ECOUTES — 2026-07-27, standing

**Fourth (the gestalt-audit Ecoute).** Audit the gestalt of the library in totality: modularization
edicts, breath-of-life + momentum suffused into the animations (verified, not asserted), performance
audits, the thrice-audited components, the module DAG, the session history AND codex addenda ("no stone
left unturned"), the 100+ tranche archaeology, the owner's 200+ ecoute-moi's/feedback/steers/screenshots/
videos de-duplicated and distilled, the partial tranche implementations audited for feature completeness
and usability.

**Fifth (the reckoning Ecoute — the long-horizon task, "not to be put on the shelf").** The last 100+
tranches and 100+ sessions audited with lurid, fastidious, exacting detail: what was communicated again
and again interminably · what was properly implemented · what was half-baked — informing friction
minimization and the tranche/wave addenda: **what needs re-exhortation, what needs pruning**. The edicts
restated as law: distillation and reduction of the library into an APOTHEOSIS · **full shadcn abrogation
(components AND style)** · consolidation or pruning of unused/overfit/contrived components · contrivance
rooted out of BOTH the extant wave addenda AND the library gestalt · deft, KISS, colocation,
modularization, no legacy · GOLDEN GLASS, BREATH OF LIFE, MOVEMENT OF MOMENTUM. This requires physically
unearthing the session logs and tranche records (an agent swarm, not memory recall). The owner's pointed
question — "how many more ecoute-moi's must this take" — is answered by §1 of `ARCHAEOLOGY.md` when
`wf_1a9b1bd8-dad` closes: every ≥3-times-said theme gets the friction named and the one structural
change that retires it.

**Labor law restated (supersedes nothing — sharpens the tri-fold):** Opus for all banausic and manual
labor; Fable adjudicates in aggregated, batched passes. ALL design work: Fable ∥ Opus 5 author
independently — **frontend design authoring always through the frontend design plugin (DesignSync)** —
then a Fable agglomerates the two into a choosy apotheosis, scrupulously.

**Durability edict (sworn).** No progress lost to session walls: every run has its script in `./wf/`,
its journal on disk, and its banking target named in `WORKFLOWS.md` §LIVE RUNS before results exist.
The archaeology corpus is rebuildable via `./wf/extract-archaeology.sh`. A fresh session reads this
file → `WORKFLOWS.md` → harvests journals → banks → relaunches only what is missing.

---

## THE RATIFICATION — 2026-07-27, standing

The owner delegated the sitting: *"Ratify the owner decisions with your best judgement."*
**`RATIFICATION.md` is the presented batch** (the E42 cure). Every ask row is RULED with grounds; the
six §D blockers, ASK.md R-1…R-6, the parked-four paint rows, and the archaeology ruling batch are all
dispositioned. Nothing blocking remains owner-only; three capture-time glances carry ratified defaults.
One explicit owner word overrides any row, always. TERMINAL-ROSTER blocker #4 (the owner sitting) is
DISCHARGED by this document.

**The BK decision — RATIFIED 2026-07-27:** the perfected audit warrants a full execution tranche.
**BK** ports the unexecuted remainders of BI + BJ + this refinement corpus into ONE clean cut:
`TERMINAL-ROSTER.md` (post-folding-pass) becomes BK's PLAN-of-record; specs are CITED at their one
source of record, never copied; BI/BJ carry explicit SUPERSEDED-INTO-BK marks for every ported row;
the 60-gate budget is BK's gate roster. Cut by workflow (tri-fold) after tier-3 banks + the folding
pass lands.

---

## THE SIXTH ECOUTE — 2026-07-27 evening, standing

**The exemplar codex expands.** (a) NEW video `ScreenRecording_07-27-2026 18-51-47_1.MP4` marked:
dock/search-bar grow-morph top AND bottom · black siri/control-centre orb expansion · ios27 glass tabs ·
the draggable magnifying selection with glass distortion. (b) The prior `New Folder With Items 4`
analyses (music/chatgpt/gemini exemplars — music and chatgpt "truly") RE-DONE under the tri-fold +
breath-of-life edict + full component set: the owner's full mark-list is embedded VERBATIM in
`wf/ios27-exemplars.wf.js` (double-dock choreography · album-from-dock continuous timeline ·
pages-from-album windowing · eyeglass · siri pull-down/partial black-dock/drawer momentum · dot-matrix
color · notification corner-× + vaporize · waveform · the SMOOTH-not-sharp popover spring). The extant
`IOS27-ARCHIVE` is EXTENDED and cited, never re-measured. Design-language law: never a trite
recreation — warm cream, deft rounding, our palettes, our glass. (c) **Tabs toggle re-audit**: f5 glass
poor · f1 good · f4 "better, but still far too trite, shiny, and bright—not like blurred and frosted
glass"; the slider the same; the IOS27-MICRO demo glass is the good reference. (d) **NO CHROME SPECIAL
BEHAVIOR for any glass items** — engine-conditional glass paint is a defect class; census running.
(e) **Novelties**: FIRST a Fable brainstorming/prototyping session, THEN new novelties unioned into the
extant set, THEN the thrice critical pass — breath of life + GOAL OF GLASS always; survey Safari +
modern web design, performant penchant only; all design authoring per the tri-fold law **via the
frontend design plugin (DesignSync)**.

**The closing sequence (revised):** tier-3 resume ∥ ios27-exemplars (`wf_a31672c0-e81`) ∥ frost-tabs
(`wf_b0b48d79-692`) → novelties run (Fable-led, consumes the codex) → `perfect.wf.js` folds EVERYTHING
(archaeology §4 + gestalt §4 + tier-3 + codex + frost verdict + novelties) into the roster → the BK cut.
Frame corpus at `scratchpad/ios27/` (2fps, 329 frames, SOURCE.txt per dir; rebuild: ffmpeg fps=2 from
the two Downloads paths).

---

## THE SEVENTH ECOUTE — 2026-07-28, standing law

**"Any design, research, or prototyping planned is never to be done mid-tranche but NOW"** — tranche
development owns ALL design/research/prototyping; execution (BK) contains only **fully formed, specified
wave specs pursuant to `precepts/`**. Consequences, immediate: (a) every EXPERIMENT-class row converts —
the experiment runs NOW and its result lands in the spec (GF-BLOB's "Experiment." clause is prototyped
now, not during BK); (b) unowned/absent specs are authored now (GF-FOURIER — N7, no owner; W-CHIP —
roster blocker #5; W-DESIGN-CANON — the canon body itself); (c) NOVELTIES.md rows ruled EXPERIMENT get
a stage-2 prototyping pass at its bank, same law; (d) capture-time ACCEPTANCE glances with ratified
defaults (r7 A/B, F50, DUSK) are NOT design — they stay execution-side, per RATIFICATION §6; a value
solved BEHIND a born-RED gate is likewise acceptance arithmetic, not deferred design. **The instrument
is the thrice design workflow**: Fable ∥ Opus 5 author/prototype independently (frontend via the
frontend design plugin — DesignSync), a Fable agglomerates into the choosy apotheosis, scrupulously.
The stage-2 delta fold amends TERMINAL-ROSTER + BK so no design-deferred row survives into execution.
Engine: `wf/design-now.wf.js` → banks `DESIGN-NOW.md`.

---

## THE RATIFICATION OF 2026-07-28 (night) — the owner's word on the relayed asks

Owner, verbatim in force: "Ratify the above with your judgement. Codex was used, and shall be used
occasionally, for audits. Otherwise we control and drive."

1. **Every relayed row is RATIFIED on the lead's judgments** — g1–g12 defaults now stand on an owner
   word, not silence: g1 HEAVY · g2 KEEP-if-gate · g3 harden-not-delete · g4 fourier-field
   KEEP-in-library · g5 tags-input DELETE at #18 · g6 number-field KEEP at #82 · g7 Kuwahara
   NOT-BUILT · g8 PROSE (no history rewrite) · g9 Op C DECLINED · g10 fence stands · g11
   ℱ-as-Foundations ships · g12 CONSUME perfect-freehand. The glance windows at capture remain open.
2. **The governance sitting is RULED: REJECT-WITH-SALVAGE** (the lead's judgment, owner-ratified).
   Executed at ratification: the entire codex working set reverted to HEAD via a durable stash bank
   (**stash `f37407cd`**; the earlier partial bank `003a8339` + the scratchpad patch/tar stand;
   post-revert `vue-tsc -p tsconfig.test.json` verified GREEN-but-for the 2 pre-existing
   track-well-fold errors). The SALVAGE half — the three detector conversions (boot-graph AST lineage · type-hygiene
   `clamp()` · token-hygiene) + the three hardened bodies (avatar · TypewriterText · reka-binding),
   all annotation-stripped — lands at **Φ0 row #1** from the banked stash, per PROOF-SWEEP lane A §4's
   REJECT path. The dual-60-roster conflict dies with the rejection: `BK/gates/ROSTER.md` is the ONE
   roster of the user-mandated ceiling.
3. **THE CODEX ROLE LAW (standing):** codex is an OCCASIONAL AUDIT instrument — its findings arrive as
   evidence, adjudicated with greps, never as process law; **Claude controls and drives** (the
   tri-fold). The BK `PLAN.md` §3 conflict record is RESOLVED by this word: no Sol/Luna supersession
   was issued; the claimed one is dead. Codex-authored edits to tracked files are adjudicated
   ADOPT/REVERT/HOLD before any commit carries them — the lane-A discipline is the permanent template.

---

## FORMULATION PERFECTED — the compact-ready close, 2026-07-28 night (seal commit `8f00081a`)

THE PERFECTION VERDICT (wf_34cf61fe-f49, 7/7): **YES — the 90 wave specs are perfected pursuant to
`precepts/`; BK is executable at Φ0 at the owner's go.** All BA–BJ tails seated or retired (the 50
union orphans, PROOF-SWEEP lane C); both owner-sitting rounds applied; gates exactly 60.

A fresh session bootstraps: this file §DURABLE PROCESS → `docs/tranches/BK/PLAN.md` →
`docs/tranches/BK/EXECUTION-PROGRESS.md` (header ⊕⁵) → `TERMINAL-ROSTER.md` §00 SE-1..SE-10 → the
live row's cited spec. Pending OWNER words (none block the go): (1) the 31-file governance sitting —
PROOF-SWEEP lane A HOLD class, ADOPT-atomic or REJECT (the dirty tree is exactly this class; REVERT
bank at stash `003a8339`); (2) the BK/ASK.md glance + disposition rows g1–g12, every one carrying a
ratified default and a fires-at trigger — silence advances; (3) the R-7 device footage (owner-only).
Execution NEVER starts without the owner's explicit go; the session compacts before it.

---

## THE OWNER SITTING OF 2026-07-28 (evening) — perfection, tails, dispositions

Owner words, verbatim in force:
1. **All BK wave specs PERFECTED** — pursuant to `precepts/`, ready for thereupon execution.
2. **The BA–BJ tails are not dropped** — every tranche's unclosed residue is folded into BK
   appropriately or explicitly retired; a tails inventory proves it (no orphans).
3. **Execution only at the owner's go; the session compacts beforehand** — this session PREPARES.
   Mode stays TRANCHE-DEVELOPMENT until the go.
4. **The codex edits are scrupulously examined** — every uncommitted modification (35 tracked files
   incl. `src/` + 30 tests + `package.json`/`vitest.config.ts`, plus the untracked governance
   instrument) adjudicated ADOPT/REVERT/HOLD before any commit carries them.
5. **carousel is NOT DELETED** — owner word, overriding the ratified clean-DELETE (which rested on
   the eight-root census; `words` imports `@mkbabb/glass-ui/carousel` at 2 files — CONSUMER-LEDGER
   row `words`). Disposition: KEEP (consolidation into an apotheosis stays legal; deletion does not).
6. **instrument-chassis likely DELETES unless a use case is proven across value.js, speedtest, etc.**
   — the proof condition. Evidence banked same sitting: `speedtest` imports
   `@mkbabb/glass-ui/instrument-chassis` at 4 files (^4.0.1), `muster` at 6 files (^3.1.0); zero at
   value/atlas/keyframes on 7.x. Verdict rests with the owner on the delivered list; the substance
   pass (what those files actually render) runs in the proof sweep.
7. **The full chopping-block/consolidation list is delivered to the owner for ratification** — the
   owner rules per-row; owner words in this sitting bind the stage-2 fold's output (the lead applies
   them as an overlay after the seal if the fold landed contrary rows).

Second round of words, same sitting (the owner ruling on the delivered list):
8. **The metric family consolidates** — "metric pill and crew likely need consolidation": metric +
   metric-badge + metric-cell + metric-stack → ONE metric family apotheosis (the keyframes/sci-active
   7.x `metric` imports migrate to the family, discharging the R-1 relay).
9. **instrument-chassis DELETES — the proof is REJECTED.** The speedtest/muster usage "likely
   leveraged it ineffectively," and **muster is a PROTOTYPE repo, not to be considered outright** —
   a standing census rule from this word forward: muster's consumer counts never bind a disposition.
   The relay addendum notes speedtest migrates off the chassis at its own bump.
10. **watercolor-dot → value.js CONFIRMED** (as WatercolorSwatch or its native name there) — "and
    elements like it": a RELOCATION CENSUS is ordered — find every component whose consumption is
    concentrated in one consumer with consumer-specific semantics; those relocate to their dominant
    consumer rather than staying library surface.
11. **deck consults the slides repo.** The original plan kept slides-specific items in slides; with
    atlas's advent, slides-specific STYLING migrates to atlas — and **the abstract, generalized slide
    facilities migrate INTO glass-ui**. #40's re-hearing widens into a deck apotheosis fed by a
    three-way inventory: slides' deck mechanics (abstract → glass-ui) · slides styling (→ atlas) ·
    atlas's `useStageDeck`/`useDeckDetent` (already-landed prior art).
12. **carousel STAYS and shares the deck's substrate** — carousel leverages the same animations and
    facilities as the slide deck: one windowed-sequence motion engine under both (the EXEMPLARS-CODEX
    pages-from-album windowing + continuous-timeline laws are the design ground).

---

## THE CODEX META-AUDIT — posture ruling, 2026-07-28 (lead-adjudicated on owner direction)

The 07-28 codex audit corpus (`docs/tranches/BJ/audits/2026-07-28-*/`, five dirs +
`BK/AUDIT-REFRESH-2026-07-28.md` + two coordination outbounds) is **EVIDENCE, not law** — the owner's
direction was "read … to aid in your judgements," and the Sol/Luna dissolution stands. Ruling:

- **ADOPTED as factual input** (stage-2 fold adjudicates each with greps): the corrected import-DAG v2
  (890 nodes / 2,308 internal edges, receipt `1f8124e4…81ed`; pass-1's 2,182-edge count dead) · the
  304-cell consumer/page universe + per-repo contract tables · the **fifteen-root census universe**
  (supersedes the 8-repo walk — the Words/bbnf-lang/muster declarations are real; **the carousel
  clean-DELETE is a re-opened contested cell**) · the salvaged **W-DESIGN-CANON candidate**
  (907 lines + 288-line emitter, `--check` GREEN, at `audits/2026-07-28-claude-resume/salvage/
  W-DESIGN-CANON-APOTHEOSIS/`) — answers the canon-body landability question · the five
  pre-implementation gates (state/public-surface/graph-v3/migration/baseline — all map onto extant
  roster rows) · `verify:governed` 48-active+5-reserved receipt · the hotfix ledger.
- **REJECTED as process law**: "route to GPT Sol x-high / GPT Luna x-high," "stop before canonical
  mutation if Luna is unavailable," "do not renew the Fable/Opus model phases" — void under the
  2026-07-25 dissolution and the tri-fold law (both owner words, both later-or-senior). The stage-2
  tri-fold proceeds; historical logs stay literal provenance.
- **CONTESTED, ruled at the fold**: the audit's KEEP list vs the ratified record — instrument-chassis
  (the owner's twice-issued DELETE outranks any audit pass), WatercolorDot (RELOCATE ratified; the
  audit's rename-and-keep is an argument, not a ruling), deck (RE-HEAR — aligned), carousel (re-grep
  at fifteen roots first). Its three-laws narrowing largely restates RATIFICATION R-4; divergences
  adjudicate against the ratified text.

---

## THE NO-INCOMPLETE-WORK EDICT — 2026-07-28, standing

**"Ensure no partial lost progress, ever … Validate all seats … NO incomplete work."** Operationalized:
(1) at every run close the lead verifies `agents_error == 0` — any error class resumes via
`resumeFromRunId` until 0, walls included; (2) the ledger row may read CLOSED only after a
result-vs-expected seat census; (3) **harvested-not-banked journal material is DEBT and blocks CLOSED**
(VALIDATION.md found FIVE instances — structure zones incl. the §6 styles settlement, the six
proportion category rulings → `PROPORTION-CATEGORIES.md`, the three procedural apotheoses →
`PROCEDURAL-APOTHEOSES.md`, the canon-opus CROSS-FOLD → cures-run adjudication — all banked/owned
2026-07-28; bank by seat identity, never size-rank); (4) every QUEUED/stage-2/deferred declaration names its OWNER and TRIGGER at declaration
time — a debt without both is an ORPHAN, the violation class; (5) `wf/validate.wf.js` re-runs the
28-run census on demand; its `VALIDATION.md` is the completeness certificate of record and §4 there
restates this protocol.
