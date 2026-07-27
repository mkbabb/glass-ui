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

## OWED

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
