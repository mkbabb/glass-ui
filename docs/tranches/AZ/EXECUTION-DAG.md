# AZ — the execution DAG (the hardened roadmap)

The one sequencing artefact for the AZ tranche (glass-ui primary + the slides/keyframes cross-repo
arm). It expands `AZ.md §"EXECUTION DAG"`'s 7-batch table into the full dependency rationale: why
each edge is load-bearing, why W-GATES is Batch 0, why taxonomy precedes rail-extend, the hinge
gates per batch, and the W-ADOPT early-run option. Authored in the AUTHORING phase — NO
implementation runs until the user greenlights (AZ invariant 2).

**HEAD:** glass-ui `tranche/AZ` (base `tranche/AY @ v3.10.1`, the AY close cut published with
provenance; registry `latest` carries 3.11.0). slides `tranche/til-briefing-M` (M-owned; AZ reads
M rows to confirm supersession, never edits one). keyframes.js `~3.9.0` installed (carries the
B4-5 phantom-subpath debt).

**Numbering:** ONE scheme — the `W-*` named system from `AZ.md`'s 24-wave roster. The five
user-domain hinges (H1–H5) gate the named batches; everything else is agent-dispatchable on
read-only git.

---

## §0 — the user-domain hinges (the manual gates the agents NEVER execute)

Agents are READ-ONLY on git (the hardened agent git clause). The irreversible legs the orchestrator
or user owns:

- **[H1] de-red scope** — at Batch 1 (W-REGISTER-IOS): how far the red retires from the interactive
  register. Recommendation (a) red leaves ALL state registers (hover/active/selected become the iOS
  luminance-lift glass register; red survives only as brand ink — the ℱ wordmark, data-viz strokes,
  the gold/red CTA family). Both arms specced; the agent does not pick.
- **[H2] dock taxonomy naming** — at Batch 2 (W-DOCK-TAXONOMY): ONE `GlassDock` + ONE `orientation`
  axis (a), vs a named pair `DockBar`/`DockRail` (b). Recommend (a). This is a clean-break rename;
  MIGRATION.md carries the table (AZ invariant 5 — no aliases).
- **[H3] luma observer default** — at Batch 1 (W-ADAPTIVE-AUTO): default-ON sampled-luminance
  observer for the dock family (a), vs opt-in prop (b). Recommend (a) — the "just works" iOS-27
  behavior; the declarative bucket stays the floor + the override.
- **[H4] V↔H morph architecture** — at Batch 4 (W-MORPH-SHOWCASE): the metaball-bridge (a), the
  full-time SVG-goo overlay (b), or the View-Transitions crossfade (c). Recommend (a) — the
  topology jump-cut (AX.W42 fold 7) is hidden inside the goo merge at the occluded midpoint.
- **[H5] deploy creds** — at Batch 6 (W-DEPLOY): `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
  in the environment. The agent does the pre-push arm + the BEFORE capture + STOPS at the hinge; the
  CF push is USER/CI domain.

The two IRREVERSIBLE cross-repo legs are the publish (already cleared at 3.10.1 — the AZ cut does
not re-publish unless it touches a shared dist surface) and the deploy (H5). Everything between is
agent-dispatchable.

---

## §1 — why W-GATES is Batch 0 (the infra-first barrier)

`proof:all` is CRASHABLE at HEAD. `gates.mjs:689-691` is a MALFORMED manifest row — `{ tags:
["local"] }` with NO `id` and NO `cmd`. `gatesFor('local')` includes it (index 107 of 142);
`runMode('local')` reaches it and runs `execSync('npm run undefined')` → `Missing script:
'undefined'` → exit 1 → the local `proof:all` aggregate DIES at that row (B5-1, S2). Worse, BOTH
parity meta-gates are BLIND to it: `proof:gate-script-parity` regex-parses `cmd:"…"` literals so a
cmd-less row is never parsed (reports "0 ghost cmds"); `proof:tag-parity`'s `scriptFor()` returns
falsy and `continue`s. So no downstream wave can run a clean local `proof:all` until this lands,
AND the blind-spot must be hardened or the next malformed row recurs silently.

W-GATES also carries the tranche's infra floor that every later wave reads:
- the content-hash freshness model REPLACES git-ancestry (AZ invariant 4) — kills the treadmill
  where an unrelated commit to a shared file re-stales every dock DELTA (the 3 graced AY NOTEs
  close);
- the `:5173` script defaults → `:5199` (7 live-gate scripts) — the convention sweep so a stale
  port never silently no-ops a live gate;
- the dead `/navigation/dock-layers` route → `/dock/layers` (the dock-orchestrator-single gate);
- the blob shader-split gate re-points (blob-tempo-suppression / blob-interaction-prm);
- the R6 dock-animation-live PASS re-persisted on a quiet server;
- the W-DELTA0 own-wave-id re-captures paid (the W-DOCK1/W-CON1/W-DOCK2 freshness NOTEs).

**Zero source risk** (it mutates gate scripts + the manifest + DELTA docs, not `src/`), so it
parallelizes cleanly within its own bounds and unblocks correct dispatch of all else. It is the one
node every other batch's local-green depends on.

---

## §2 — the dependency edges (the real graph)

`[X-REPO]` = cross-repo; `[H#]` = hinge-gated.

| # | edge (blocker → dependent) | why load-bearing |
|---|---|---|
| E1 | **W-GATES → every wave's local `proof:all`** | `proof:all` is crashable at HEAD (B5-1); no local green until the malformed row is fixed + the parity blind-spot hardened |
| E2 | **W-DOCK-RAIL → W-DOCK-TAXONOMY** | the in-dock switcher rail is rebuilt to the hairline register (the indicator/gutter/glyph fixes) BEFORE the taxonomy rename MOVES the surface; the taxonomy edit must rename a CORRECT rail, not a broken one |
| E3 | **W-DOCK-TAXONOMY → W-RAIL-EXTEND** | W-RAIL-EXTEND is the NET-NEW "hairline-rail-beyond-dock" facility that CLAIMS the "rail" noun; taxonomy FREES the noun first (the `variant="rail"` expression collapses into orientation+density). Building rail-extend before the noun is freed re-collides the overload (E3G-1/E3G-2) |
| E4 | **W-DOCK-TAXONOMY → W-DOCK-NORMALIZE** | the C3 census + the `proof:dock-unify` extension grade the RENAMED dock surface; normalizing pre-rename would assert against names about to break |
| E5 | **W-DOCK-TAXONOMY → W-DOCK-CONTEXT** | the route→layer seam binds the layering system that taxonomy makes first-class on BOTH orientations; the contextual facility needs the renamed layer API |
| E6 | **W-DOCK-CONTEXT ↔ W-RAIL-EXTEND** | the rail-extend END-ICON drives the SAME `active` layer model the context seam selects; the two coordinate on the layer registry (the §6 coordination in both specs) — disjoint file bounds, shared contract |
| E7 | **W-DOCK-TAXONOMY → W-MORPH-SHOWCASE** | the showcase morphs BETWEEN two real docks; taxonomy gives the VERTICAL dock the collapse/morph/shrink machinery the mandate names (today the vertical-rail branch CANNOT morph — `useDockShellProps.ts:217` resolves `startCollapsed:false` for a non-`dock` branch). The showcase needs two morphable docks to morph between |
| E8 | **W-REGISTER-IOS ↔ W-ADAPTIVE-AUTO** | both edit the shared `.glass-dock` surface but own DISJOINT token regions — W-REGISTER-IOS owns the selected-glyph/accent register, W-ADAPTIVE-AUTO owns the `--glass-tint-*` darken axis. The selected glass plate must stay legible over the bright bucket; they run in parallel with a coordinated file-bound split |
| E9 | **W-REGISTER-IOS → W-SHELL-IDENTITY** | the home-control hover pill consumes the POST-de-red glass hover register; the identity fix re-grounds against the W-REGISTER-IOS register before applying it to the ℱ home control |
| E10 | **W-HIERARCHY → W-BLOB-STUDIO + the aurora studio** | W-HIERARCHY produces the configurator-hierarchy VOCABULARY (section weight, label registers, control rhythm) that the blob/aurora studios inherit. If W-HIERARCHY (Batch 4) has not landed when W-BLOB-STUDIO (Batch 3) runs, the studio applies the idioms INLINE and W-HIERARCHY RATIFIES them as the shared vocabulary at Batch 4 (the soft edge — the studio does not BLOCK on it) |
| E11 | **B1-W-LIQUID (the Siri primitive) → W-MORPH-SHOWCASE** | W-LIQUID (planned-not-landed at AY) is the amorphous flex+squish substrate; it folds IN as the showcase's substrate wave under H4-(a) — the metaball-bridge composes the existing contained-creature goo-blob as the decorative bridge |
| E12 | **B1-W-BLOB-GLASS (uBackdrop refraction) → W-BLOB-STUDIO** | the booked W-BLOB-GLASS folds into the studio wave under its ORIGINAL G-PERF (the M5-Max frame baseline) + G-BROWSER (three-engine capture) BINDING gates, inherited verbatim from `AY.W-BLOB-GLASS.md` (the user's conditional greenlight: "if performant and works on all browsers, absolutely") |
| E13 | **W-GATES (content-hash freshness) → every visual wave's CLOSE** | the DELTA edge gates ~12 visual waves; the freshness model migration (AZ invariant 4) is what makes those captures stop re-staling — the migration must land before the captures it governs |
| E14 | **(all AY/AZ waves green) → W-CLOSE → the 3.11.0 cut** | W-CLOSE is the terminal node — `proof:az-final` (born-RED) requires every gate green + W-CARVE's ratchet drain + the overfitting audit + FINAL.md; the cut is USER-DOMAIN and cannot precede the close |
| E15 | **W-CLOSE → W-ADOPT → W-DEPLOY** [X-REPO] | the engagement-terminal cross-repo chain: the deploy ships the re-pinned, bespoke-free deck and `proof:no-bespoke-constellation` is a precondition gate. BUT — W-ADOPT has NO AZ dependency (see §3 the early-run option); it can run at Batch 0 against the already-published 3.10.1 |
| E16 | **W-KF-CONSUMER ⟂ the AZ spine** [X-REPO] | the keyframes phantom-subpath re-point (B4-5, S1) + the glass-ui re-pin have no AZ-source dependency — they run at Batch 5 for close-batching convenience, but could move earlier; they wait only on the published 3.10.1 (already live) |

---

## §3 — the 7 batches (HEAD → convergence)

Each batch is a barrier: every wave in batch N closes (gates green + DELTA where visual) before
batch N+1 dispatches. Within a batch, waves run in parallel (≤6-agent ceiling) on DISJOINT file
bounds.

### BATCH 0 — INFRA (blocks EVERYTHING; zero source risk)

| node | does | gate |
|---|---|---|
| **W-GATES** | the gate-manifest repair (the malformed-row crash + the parity blind-spot); the `:5173`→`:5199` sweep; the dead-route re-point; the shader-split re-points; the content-hash freshness migration; the R6 re-persist; the W-DELTA0 re-captures | `proof:all` runnable locally; both parity meta-gates assert the cmd-less-row blind spot; the freshness model reads a content hash, not git ancestry |

Rationale (§1): `proof:all` crashes at HEAD; nothing downstream can green its local battery until
the malformed row is fixed AND the parity gates harden so the next malformed row cannot recur
silently. Docs + gate scripts only — parallelizes cleanly, unblocks correct dispatch of all else.

**W-ADOPT may ALSO run here** (the early-run option, §"the W-ADOPT early-run" below). It has no AZ
dependency — it consumes the already-published 3.10.1.

### BATCH 1 — the S1 quartet (the four re-opened bands the R3 audit re-opened in person)

| node | does | gate | hinge |
|---|---|---|---|
| **W-DOCK-RAIL** | the in-dock switcher rail to the hairline register: the `--surface-tint-8` plate retires, the TabsIndicator utility-bake loses to the token rule (fix at the wrapper seam), the 4px-squish root-caused, tabs sized/contrasted to the nav-glyph canon | `proof:dock-rail-hairline` (born-RED): indicator paints the token rule not the baked `--glass-bg-quiet`, the rail is a hairline (no fused gutter), the glyph computes ≥14px wide | — |
| **W-DOCK-FLICKER** | the collapse-onset scale pop killed at the paint-order seam: `.collapsed:hover` scale gates on `:not([data-morphing])`; hover gains geometric hysteresis (re-check containment post-morph). The F2 width-instrument reading is recorded as the WRONG observable, not a refutation of the user | `proof:dock-no-scale-pop` (born-RED): source witness + a frame-sampled collapse-onset trace shows ZERO ≥10px right-edge pop (the C2 ±24–34px jump eliminated) | — |
| **W-ADAPTIVE-AUTO** | the self-engage no-op fixed at the mechanism (the bucket moves to the dock's PARENT seam OR an unconditional dock-self rule); the sampled-luminance observer ships writing `--glass-backdrop-luma` (the declarative bucket stays the floor); the all-glass-views readability sweep with π contrast readbacks as the binding gate | `proof:adaptive-glass` extended + a π contrast readback ≥4.5:1 over the actual shipping glass-over-bright on ALL glass views | **[H3]** observer default |
| **W-REGISTER-IOS** | the ROOT selected/hover/active register redefined to the iOS luminance-lift glass model; the demo `--demo-nav-accent→--viz-fourier` overrides retire; the library default `--primary` selected tint re-pointed to the glass register | `proof:glass-cohesion`/a register gate: no state register paints brand-red; the glyph ink stays semantic | **[H1]** de-red scope |

Rationale: these are the four bands the AY close marked `live-verified` that the R3 audit re-opened
in person — three of them S1, all four root-caused by the fleet (the dock rail's three stacked
causes, the morph paint-order seam, the dock-over-light self-engage no-op, the red register). The
two register waves (R band) and the two dock waves (D band) split into DISJOINT file bounds:
W-DOCK-RAIL/W-DOCK-FLICKER touch the dock shell/layer-group surfaces; W-REGISTER-IOS/W-ADAPTIVE-AUTO
share `.glass-dock` but own disjoint token regions (E8). Front-loading the quartet clears the worst
live contradictions first.

### BATCH 2 — the dock taxonomy + the dependent facilities (taxonomy renames FIRST)

| node | does | gate | hinge |
|---|---|---|---|
| **W-DOCK-TAXONOMY** | one orientation axis; the `variant`×`orientation` redundancy collapsed; the "rail" noun de-overloaded (4 constructs → named registers); the layering system + collapse/morph/shrink first-class on BOTH orientations; clean break + MIGRATION table | `proof:dock-taxonomy` (born-RED): the redundant expression is gone, the MIGRATION table is complete, both orientations morph | **[H2]** naming |
| **W-RAIL-EXTEND** | the net-new hairline-rail facility — an extended dividing line BEYOND the dock with a leading/trailing end-icon controlling the dock's layer context; rendered OUTSIDE the clipped pane so it survives collapse; ≥2 demo consumers at birth | `proof:rail-extend` (born-RED): the facility paints beyond the dock edge, the end-icon switches the active layer, ≥2 consumers | — |
| **W-DOCK-NORMALIZE** | the C3 census executed: every NAV dock carries the home-left `#persistent` + `<DockSeparator>` pattern (zero hand-rolled home chrome); the FEATURE-demo docks are census-EXEMPT and the exemption recorded | `proof:dock-unify` EXTENDED — the census matrix bound as gate witnesses | — |
| **W-DOCK-CONTEXT** | the page/route→layer-set seam (provide/inject from the shell); the demo shell becomes the reference consumer | `proof:dock-contextual-layers` (born-RED): a source witness + a live witness (navigating between two contexts swaps the active DockLayer set) | — |

Rationale (E2–E7): **taxonomy precedes rail-extend** because W-RAIL-EXTEND CLAIMS the "rail" noun
that `variant="rail"` currently overloads (E3) — building the net-new facility before the noun is
freed re-collides the overload. **W-DOCK-RAIL (Batch 1) precedes taxonomy** (E2) because the
taxonomy rename moves the rail surface — it must rename a CORRECT (hairline-rebuilt) rail, not the
broken plate. Once taxonomy lands, W-RAIL-EXTEND ‖ W-DOCK-NORMALIZE ‖ W-DOCK-CONTEXT run in
parallel on disjoint bounds (rail-extend = a new chrome slot; normalize = the census over NAV docks;
context = the route seam) — with rail-extend ↔ context coordinating on the shared layer registry
(E6, contract-only, no file overlap).

### BATCH 3 — the studios + the shell + motion (parallel; each closes on a captured DELTA)

| node | does | gate |
|---|---|---|
| **W-BLOB-PAGE** | the TRUE blob defect: the watercolor-dot swatch fidelity (the feTurbulence CSS-px read), satellites enabled/morphing on the demo mount, the page staging so the GL bead LEADS. The GL renderer is NOT re-opened (refuted-crisp) | `proof:blob-page` (born-RED): device-px swatch edge, hero-first staging, VISIBLE separated satellites (orbitRadius > bodyRadius); π DELTA |
| **W-BLOB-STUDIO** | interaction feel, metaball merge quality, satellite controls surfaced in the configurator, shadow tuning, configurator hierarchy; the folded W-BLOB-GLASS uBackdrop refraction under its G-PERF + G-BROWSER gates | `proof:blob-studio` (born-RED) + the folded `proof:blob-glass` under the inherited binding gates |
| **W-MOTION-SUITE** | the full curve canon (value.js ~18 easings + keyframes timing curves + steps + editable bezier); the `springs.vue` LOCAL fork killed onto `SPRING_PRESETS`; a live spring playground; the scroll facilities demoed; `foundations/motion.vue` de-duplicated; ppmycota purple DEMO-LOCAL (E1-7 — never a library token) | `proof:motion-demo` (born-RED): the gallery plots ALL families each driven by its REAL JS twin; no local spring solver |
| **W-SHELL-CONFIG** | the gear opens the demo CONFIGURATOR (density · ui-scale · glass-level · theme · motion/PRM); the composables view + the floating PresetEditor FAB REMOVED; the dark-mode toggle folds INTO the configurator | `proof:shell-config` (born-RED): the FAB gone, the composables category deleted, the standalone toggle removed, the post-W54 axes exposed; π DELTA |
| **W-SHELL-IDENTITY** | ℱ becomes the Foundations entry (the Compass dup drops), demarcated by a DockSeparator, slightly larger; the glyph optically centered by the measured dx=+2.38/dy=+3.25 ink-mass offset (a transform nudge); the hover pill gains its glass register | `proof:shell-identity` (born-RED): the Compass dup gone, the optical nudge applied, the hover pill paints glass |

Rationale: independent surfaces — the blob page (demo + one library default), the blob studio (demo
chrome + library tuning), the motion demo (demo buildout — the substrate is READY, R3-11 is
DEMO-CONSUMPTION not a new-API port), the shell gear (demo-private chrome), the shell identity
(demo-shell defect). W-BLOB-STUDIO ‖ W-BLOB-PAGE coordinate `types.ts` disjointness. W-SHELL-IDENTITY
re-grounds against the W-REGISTER-IOS hover register (E9 — a soft cross-batch read, not a hard
block). The blob studio's configurator hierarchy soft-depends on W-HIERARCHY (E10) — it applies the
idioms inline if W-HIERARCHY has not landed, and W-HIERARCHY ratifies them at Batch 4.

### BATCH 4 — the morph showcase + the design band (parallel)

| node | does | gate | hinge |
|---|---|---|---|
| **W-MORPH-SHOWCASE** | the vertical↔horizontal liquid morph showcase — deterministic, keyframes-driven, bidirectional; the metaball-bridge hides the topology jump-cut at the occluded midpoint; W-LIQUID (the Siri amorphous-blob facility) folds in as the substrate | `proof:morph-showcase` (born-RED): the bridge carries the V↔H travel deterministically + bidirectionally; the topology jump-cut is occluded | **[H4]** architecture |
| **W-HIERARCHY** | the D1 incongruence set (10 findings: no canonical section-heading rung, inverted scales, competing titles); the Configurator controls column gains hierarchy/proportion — the vocabulary the blob/aurora studios inherit | `proof:design-hierarchy` (born-RED): a canonical section-heading rung applied uniformly; the configurator hierarchy lands | — |
| **W-SUFFUSE** | the suffusion pass: the audacious-type uplift (D2), the color-pop map under the one-color-event rule (D3 — incl. the motion purple event), the glass/grid/math thin-spots (D4); each surface gets its ONE deliberate event; restraint counters recorded | `proof:suffuse`: each declared surface carries exactly ONE event; the restraint counters hold | — |
| **W-METRIC-UNIFY** | the Metric* family (Badge/Pill/Cell/Row) converges on ONE value-display core (killing the `amount \|\| placeholder` zero-value bug); ConfiguratorRow vs LabeledField get a shared chassis or a documented divergence | `proof:metric-unify`: ONE value core; the zero-value bug REDs born-RED then GREEN | — |

Rationale (E10): W-HIERARCHY produces the configurator-hierarchy vocabulary the Batch-3 studios
inherit — it runs at Batch 4 (after the studios apply the idioms inline) and RATIFIES them as the
shared vocabulary, rather than blocking Batch 3 on it. W-SUFFUSE + W-METRIC-UNIFY are independent
design surfaces. W-MORPH-SHOWCASE depends on W-DOCK-TAXONOMY (E7 — it needs two morphable docks) so
it sits here, after the taxonomy makes the vertical dock morphable; W-LIQUID folds in as its
substrate (E11) and the metaball-bridge composes the existing contained-creature goo-blob (E12-adjacent).

### BATCH 5 — cross-repo consumer + the hygiene drain (parallel)

| node | does | gate |
|---|---|---|
| **W-CARVE** | dock-controls.css (636) + theme.css (530) carve to @import-root partials < 500; the dock-controls-reading gates re-point composed; the two ratchet rows DRAIN (the monotonic close) | the carved partials are cascade-order-safe + < 500; the ratchet rows drain; bundle byte-equivalent |
| **W-PRUNE2** | the round-2 prune verdicts (E4 — 4 candidates incl. status-dot's drop to 1 non-self consumer); the carried books (W-AUR-T5 Kuwahara, W-LIGHTHOUSE) re-dispositioned with explicit triggers or executed; every BOOK marker re-audited | `proof:component-orphan` honest; each candidate keep-evidenced or retired with rationale |
| **W-KF-CONSUMER** | keyframes.js: the phantom-subpath imports (`/header-ribbon`, `/glass-panel` — retired at 3.10.x) re-pointed to the surviving primitives + the glass-ui re-pin; fourier-analysis applies its pending phantom-classes patch; bbnf-lang's hard dist alias removed (closes the two documented-expected local CI reds) | the 2 import sites migrate + resolve against 3.10.1; the documented-expected reds close |

Rationale (E16): W-KF-CONSUMER has no AZ-source dependency — it consumes the already-published
3.10.1, so it COULD move earlier; it sits at Batch 5 for close-batching convenience with the hygiene
drain. W-CARVE drains the chronic central-CSS ratchet rows (the monotonic close requires them
drained before W-CLOSE asserts them). W-PRUNE2 re-disposes the round-2 prune candidates + the
carried books before the close re-audits every marker.

### BATCH 6 — the terminal close + the cross-repo deploy chain [H5]

| node | does | gate | hinge |
|---|---|---|---|
| **W-CLOSE** | the terminal close: overfitting audit, FINAL.md, `proof:az-final` (born-RED, the staged-or-cut machine inherited), budget rebaseline, the full release battery, the 3.11.0 cut [USER-DOMAIN] | `proof:az-final` GREEN (requires the AZ-pathed cardinal gate + W-CARVE green + every wave's gate green); FINAL written | the 3.11.0 cut is USER-DOMAIN |
| **W-ADOPT** | slides: exact-pin `3.10.1`, the 547-line bespoke `constellation.ts` deleted onto `@mkbabb/glass-ui/constellation` (three declarative mounts → TWO surviving canvases + `drawOverlay` skins + the `?freeze` seam); `proof:no-bespoke-constellation` homed; frame-budget + perceptual-diff DELTAs | deletion proof + import resolves + frame-budget DELTA + `?freeze` static captures render identically | — |
| **W-DEPLOY** | slides.friday.institute via `deploy.sh` (wrangler → CF Pages); the gate DECOMPOSED (agent local-green → USER push → agent post-push live-200 + paired DELTA) | `slides.friday.institute/til-briefing` 200 + paired before/after DELTA | **[H5]** CF creds |

Rationale (E14–E15): W-CLOSE is the terminal AZ node — `proof:az-final` requires every gate green
(W-CARVE's ratchet drain included). The 3.11.0 cut is USER-DOMAIN. Then the cross-repo deploy chain:
**W-ADOPT → W-DEPLOY** — the deploy ships the re-pinned, bespoke-free deck and
`proof:no-bespoke-constellation` is a precondition gate. W-ADOPT is gate-decomposed: the agent
re-architects (delete bespoke → N declarative `<Constellation>` mounts → `drawOverlay` skin →
`?freeze` hook) + captures the frame-budget DELTA; W-DEPLOY's three-phase decomposition keeps the
HARD BOUNDARIES (the agent never holds the CF token or the access key — H5).

---

## §4 — the W-ADOPT early-run option (the parallel-slack the prose misses)

W-ADOPT has **NO AZ dependency**. It consumes the ALREADY-published 3.10.1 — the constellation
seams (the W-CON1/W-CON2/W-CON3 refit + warp + `?freeze` hooks) all ship in the published 3.10.1
dist (the AY close cut). So W-ADOPT can run at **Batch 0** against the published 3.10.1, in parallel
with W-GATES, rather than waiting for the AZ terminal close at Batch 6.

The ONLY reason to hold it to Batch 6: if the user prefers **ONE** slides re-pin (to the AZ cut,
3.11.0) over **TWO** (3.10.1 now, then 3.11.0 at the AZ close). The decision:

- **Early-run (Batch 0):** the slides headline — "consume perfected glass-ui, no bespoke copies" —
  clears soonest; the deck re-pins to 3.10.1 immediately, the 547-line god-module dies, the deploy
  chain unblocks early. Cost: a second re-pin if the AZ cut (3.11.0) touches the constellation
  surface.
- **Batch-6 (default):** ONE re-pin to the AZ cut. Cost: the slides headline waits the full AZ
  close.

**The gating fact:** W-ADOPT must re-pin to the AZ cut ONLY IF AZ touches the constellation surface.
AZ's wave roster does NOT name a constellation edit (the constellation closed live-verified at AY:
W-CON1/2/3). So absent a scope-reveal that drags a constellation file into an AZ wave, the early-run
is SAFE and the second re-pin is unnecessary — W-ADOPT can run at Batch 0 against 3.10.1, deletion
proof + frame-budget DELTA captured immediately on greenlight.

---

## §5 — the critical path (the longest dependency chain HEAD → convergence)

```
HEAD (tranche/AZ @ v3.10.1 base)
 └─ W-GATES                                       [BATCH 0 — proof:all runnable]
     └─ W-DOCK-RAIL                               [BATCH 1 — the hairline rebuild, E2]
         └─ W-DOCK-TAXONOMY [H2]                  [BATCH 2 — the rename, E2]
             └─ W-RAIL-EXTEND ‖ W-DOCK-CONTEXT    [BATCH 2 — the noun freed, E3/E5/E6]
                 └─ W-MORPH-SHOWCASE [H4]         [BATCH 4 — two morphable docks, E7]
                     └─ W-CARVE (ratchet drain)   [BATCH 5 — the monotonic close, E14]
                         └─ W-CLOSE → 3.11.0 cut  [BATCH 6 — USER, E14]
                             └─ W-ADOPT (if held) [BATCH 6 — the re-pin, E15]
                                 └─ W-DEPLOY [H5] [BATCH 6 — USER]
                                     └─ CONVERGENCE
```

The critical path is the **DOCK REDESIGN spine** — the engagement's headline (R3-1/R3-2/R3-13: the
rail rebuilt, the taxonomy disambiguated, the V↔H morph showcased). Every other band (register,
blob, motion, shell, design, the hygiene drain) is PARALLEL slack off this spine. The W-ADOPT
early-run (§4) lifts the entire cross-repo arm OFF this critical path — run at Batch 0, it converges
the slides headline in parallel rather than at the terminal node. The two user-domain hinges that
sit ON the path are H2 (taxonomy, the rename the rail-extend + morph depend on) and H4 (the morph
architecture); H5 (deploy) gates the terminal deploy node. Front-loading W-DOCK-RAIL + W-DOCK-TAXONOMY
is what unblocks the dock headline soonest.

---

## §6 — the cardinal-lesson DELTA discipline (the close-edge on the visual waves)

Every VISUAL-load-bearing wave NAMES `proof:live-verified-ledger:az` as a close-edge — NOT prose
"capture." The visual waves: W-DOCK-RAIL, W-DOCK-FLICKER, W-ADAPTIVE-AUTO, W-REGISTER-IOS,
W-RAIL-EXTEND, W-DOCK-NORMALIZE, W-DOCK-CONTEXT, W-BLOB-PAGE, W-BLOB-STUDIO, W-MOTION-SUITE,
W-SHELL-CONFIG, W-SHELL-IDENTITY, W-MORPH-SHOWCASE, W-HIERARCHY, W-SUFFUSE, W-METRIC-UNIFY, W-ADOPT,
W-DEPLOY. Each wave's DELTA references ≥1 PNG OF ITS OWN SURFACE at ≥2 viewports × {light,dark},
with a π readback where the criterion is a measured ratio/geometry. The non-visual waves (W-GATES,
W-CARVE, W-PRUNE2, W-KF-CONSUMER, W-CLOSE) close `dev-complete`/`complete` on their device-free gates
with no live DELTA owed (W-CARVE/W-CLOSE add their wave-id to the allowlist ONLY if they change
pixels — they do not).

W-GATES (Batch 0) stands up the AZ visual home + the `proof:live-verified-ledger:az`
parameterization + the content-hash freshness model (AZ invariant 4). A green source gate over a
still-broken live render is NOT done — the STOP bar is "all gates green AND every visual-load-bearing
row has a fresh on-disk PNG DELTA." This is the exact forcing function that BUILT this tranche: AY
closed four bands `live-verified` that the R3 live audit re-opened in person.
