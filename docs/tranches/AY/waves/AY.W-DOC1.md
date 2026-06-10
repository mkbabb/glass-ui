# AY.W-DOC1 — README research-backed quality-uplift + strip provenance meta

**Wave** W-DOC1 — README research-backed quality-uplift + strip provenance meta
· **Repo** glass-ui · **Band** D (docs) · **State** OPEN
· **Kind** docs / doc-reconciliation · **Depends on** W-AUR1 (`aurora/RESEARCH.md` — EXISTS at
HEAD, 304 lines; W-AUR1 may revise its content, and DOC1's citation must trace to the final),
W-BLOB1 (`goo-blob/RESEARCH.md` — EXISTS at HEAD, 261 lines; same revise-then-cite ordering),
~~W-AUR-WEBGPU-DECIDE~~ **RESOLVED at HEAD** (Branch A RETIRE EXECUTED — twin deleted grep-0,
README §WebGPU rewritten 702→643 lines; the former HARD block is now a residual deletion-proof,
see §"W14 reconcile"), W-CON1/W-CON2 (the constellation drift-source ship that the README
asserts). The two RESEARCH.md presence-checks (clause 4) are already satisfiable at HEAD; NO
remaining HARD block on a sibling wave's outcome. **Coordination edges:** the CLAUDE.md motion
rows (D5 group M4) are co-owned with W-MOTION2 §2.4/R8 — record which wave lands them (no
double-edit); the FF light-mode caveat (D5 group F1) forks on W-FF2 D5 (see that row).

---

## Defect (source-grounded, file:line)

The seed premise "the 4 READMEs are DEFERRED / from-zero" is FALSE — all four ship at HEAD
(verified at the Batch-2-complete tree): `aurora/README.md` (**643** lines — shrank from 702
when the W-AUR-WEBGPU-DECIDE retire reconcile landed in it), `goo-blob/README.md` (**432**),
`dock/README.md` (299), `constellation/README.md` (**511** — grew with the W-CON3
freeze/anomaly sections). This is a **quality-uplift + meta-strip + doc-vs-source reconcile**,
NOT a write. Five concrete defect classes (D0–D5; D5 is the consolidated as-built STALE
ledger from the research-necessity fleet, `NECESSITY-MATRIX.md §2 W-DOC1`):

### D1 — provenance / version-history meta on the public surface (greenfield-no-meta)

The shipped README is a consumer-facing surface; the wave archaeology belongs in the tranche
docs, not in `src/`. Two READMEs leak it:

- **`constellation/README.md:15-25`** — a "Research-backed" provenance blockquote that is
  pure wave history: *"The primitive lands the `useCanvas2D` + `Constellation` design that
  AV.W8 authored but GATED-NOT-LANDED ... the slides anomaly-ring deck is consumer #2 that
  adopts it at AX.W30 ... AX.W17 completes the abstraction."* This describes the build arc,
  not what IS. (H-constellation FINDING 5.)
- **`aurora/README.md:23-39`** — a "Research-backed" blockquote whose back half is a
  five-wave arc narrative: *"The aurora perfection arc landed across five waves, each gated:
  W4 — painterly ... W5 — color ... W6 — options — AX.W10 converged it ... W7 — WebGPU ...
  W8 — interactive."* The FRONT half (the SOTA-cited / DESIGN.md-authoritative statement) is
  legitimate research framing and STAYS; the back-half wave-by-wave arc is meta and goes.

### D2 — inline wave tags on the public surface (constellation file-heads + aurora prose)

- **`constellation/constellationField.ts:1`** + **`constellation/index.ts:1`** — both
  file-head doc-comments open `// AW.W17 — ...`. These are PUBLIC doc-comments (they ride
  the shipped `dist/` source map / a reader's editor). H-constellation FINDING 5: the headers
  ALSO conflict with the README/warp comments that say **AX.W17** — the work is AX.W17; the
  `AW.W17` headers are stale.
- **`aurora/README.md`** carries inline `AX.W10`/`AX.W11`/`AX.W13` tags in PROSE (`:33`,
  `:39`, `:145`, `:266`, `:329`, `:355`, `:373`, `:409`). The prose tags read as internal
  changelog. (NOTE the distinction in §"Scope boundary" below — internal `:NNN`
  source-line citations stay; tranche-letter prose tags go.)

### D3 — stale W14-restoration prose — **RESOLVED at HEAD; residual is a deletion-proof**

The original D3 (six W14-restoration prose sites at `:35,:373,:395,:422,:432,:468`,
future-tense "until the W14 finalize" over an excised path) was DISCHARGED when
W-AUR-WEBGPU-DECIDE EXECUTED its Branch A RETIRE and reconciled the README itself
(`W-AUR-WEBGPU-DECIDE-DELTA.md`; README 702→643). Verified at the Batch-2-complete tree:
`grep -n 'W14' aurora/README.md` returns exactly TWO hits, both PAST-TENSE excise statements —

- **`aurora/README.md:195`** — *"excised as substrate-without-consumer (AX.W14), so no
  multi-pass finish ships."*
- **`aurora/README.md:392`** — *"Aurora renders on a single-pass WebGL2 fragment shader.
  WebGPU was investigated (AX.W14) and …"* (the honest §Substrate sentence, `:390-395`).

NO restoration/future-tense prose survives. What REMAINS of D3: (a) the two surviving
`AX.W14` literals are tranche-letter PROSE tags — they fold into the D2 strip (rewrite each
sentence to state the fact without the wave tag); (b) the gate's clause-2 deletion-proof
stays as the REGRESSION guard (a re-introduced "until the W14 finalize" flips RED); (c) the
orphaned References `### WebGPU` block is now D5 row A5.

### D4 — "(planned)" prose for work that landed (accurate-status)

Spot-check confirms the two `planned`/`coming` hits are already self-correcting in prose
(`goo-blob/README.md:229` *"it is no longer 'planned'"*; `dock/README.md:139` *"coming alive
on touch"* — not a deferral). The gate still requires a sweep: ZERO `(planned — *)` /
`(coming —)` / `TODO` / "will ship" prose describing LANDED work across all four.

### D0 — the research-citation gap (the headline uplift)

The READMEs cite SOTA techniques inline. **`aurora/README.md:638`**, **`goo-blob/README.md:395`**,
and **`constellation/README.md:372`** each carry a `## References` HEADING; **`dock/README.md`
does NOT** — it carries its citations as INLINE blockquote lines (`> Sources: …` and
`> [NN/g — Liquid Glass](…) — accessed 2026-06-06.` at `:114`), a cited-source-with-access-date
block but NOT under a `## References` heading (verified at HEAD: `grep '## References'
dock/README.md` → 0). NONE of the four READMEs cites the per-lane **`RESEARCH.md`** as the
authoritative research artefact.

**Status of the `RESEARCH.md` artefacts at HEAD (re-verified — the original D0 framing was
STALE):** `aurora/RESEARCH.md` (304 lines) AND `goo-blob/RESEARCH.md` (261 lines) **ALREADY EXIST**
at HEAD `fba6262` (`find src/components/custom -name RESEARCH.md` → both present). The earlier
"they do not exist yet; produced by W-AUR1/W-BLOB1" claim is false against the live tree. This
SOFTENS — does not remove — the W-AUR1/W-BLOB1 dependency: those waves may REVISE the research
artefacts (and DOC1's citation must trace to the FINAL content), but the fail-closed
presence-check (clause 4) is already satisfiable at HEAD. `constellation` has no `RESEARCH.md`
(it cites its proximity-graph ancestry inline — the `## References` block now sits at
`README.md:502-505` after the W-CON3 growth, NOT the stale `:372` cite); `dock` has no
`RESEARCH.md` (it cites the AX dock-research corpus). The uplift binds each README's research
section to its lane's authoritative research artefact — `./RESEARCH.md` where one exists
(aurora, blob), the inline References block elsewhere (constellation, dock).

### D5 — the consolidated doc-vs-source STALE ledger (the research-necessity widen)

The 11-lane research-necessity fleet (`docs/tranches/AY/audit/research-necessity/`, consolidated
in `NECESSITY-MATRIX.md §2 W-DOC1`) graded every README against the as-built tree and produced a
file:line STALE ledger that this wave OWNS. Every row below was RE-VERIFIED at the
Batch-2-complete tree (line-cites current as of this hardening pass; group A line-cites may
shift under further in-flight aurora edits — row A6 re-greps at close).

**Aurora (`src/components/custom/aurora/README.md`, 643 ln) — 6 rows** [lane: `aurora.md §3`]

| Row | Site | Stale claim | As-built truth |
|---|---|---|---|
| A1 | `:12`, `:56`, `:173`, `:336`, `:540` (**FIVE** sites — the lane's "×4" undercounted; `:336` "ACES tonemap, grain) runs in linear" is the fifth) | "ACES tonemap" / "the LOCKED linear→ACES→OETF→dither pipeline" | the shipped tonemap is **Khronos PBR-Neutral** (`constants/shaders/tonemap.glsl.ts:17-31` — startCompression 0.76, hyperbolic highlight compression, luminance-anchored desaturation). The GLSL function KEEPS the name `aces()` so the `aurora.frag.ts` call-site is untouched — the rewrite must NOTE the kept slot-name to pre-empt reader confusion |
| A2 | `:542-547` architecture tree | `composables/` lists 5 entries (color/runtime/useAurora/uniformBridge/useCursorInteraction) | the dir has **10** files — missing `atoms.ts` (THE headline ≤7-atom consumer door), `configSource.ts`, `cursorModel.ts`, `frameLoop.ts`, `glSetup.ts` |
| A3 | `:127-133` mediums table | rows are smooth/pastel/watercolor/oil only | `vangogh`, `oil-pastel`, `crayon` are FIRST-CLASS `medium` values (prose-only at `:142-146`) — add the 3 rows |
| A4 | `:557-575` gate table (12 rows) | misses 7 SHIPPED gates | add rows for `proof:aurora-fill-resize` (`package.json:620`), `proof:aurora-stroke-composite` (`:628`), `proof:aurora-painterly-statistics` (`:629`), `proof:aurora-arresting-ref` (`:630`), `proof:aurora-arresting` (`:633` — MINTED since the lane audit; `scripts/proof-aurora-arresting.mjs` + `tests-visual/aurora-arresting.spec.ts` both on disk), `proof:aurora-chrome-idiomatic` (`:670`), `proof:aurora-preset-roster` (`:671`) |
| A5 | `:637-642` References `### WebGPU` | WGSL spec / WebGPU Fundamentals / WebGL→WebGPU links reference nothing shipped post-retire | PRUNE the block (or one-line it as the investigation record per the retire note at `:392`). The Heckel TSL/WebGPU cite at `:616` STAYS (it grounds the mesh-gradient baseline, not the retired twin). NOTE: `## References` heading is now `:579`, not the pre-retire `:638` |
| A6 | shader line-cites throughout (`aurora.frag.ts:348`/`:372-388` etc.) | drift under the in-flight painterly edits | RE-GREP every `file.ts:NNN` cite at DOC1's close (the W-AUR-PAINTERLY finisher is concurrently writing the shaders) |

**Dock (`src/components/custom/dock/README.md`, 299 ln) — 5 rows** [lane: `dock.md §3, §5.6`]

| Row | Site | Stale claim | As-built truth |
|---|---|---|---|
| K1 | `:78-89` "One driver per concern" + `:94` directional-intent | the "View-Transitions path (native `document.startViewTransition`)" is the primary size-morph driver; typed VTs (`:active-view-transition-type(dock-expand)`) | the VT collapse path is RETIRED root-and-branch — `view-transition.css:47-59` records the AX.W01 deletion ("the `::view-transition-group(.gl-dock-layer)` group + its typed curve fork are DELETED… the dock collapse↔expand now morphs off the ONE `--dock-morph-t` spring scalar"). DELETE/REWRITE both sections; the README is the self-declared SOURCE OF TRUTH (`:7-9`) describing an abrogated architecture |
| K2 | `:289-299` gate table | lists 2 RETIRED gates; misses ~10 shipped; 2 stale descriptions | (−2) `proof:dock-motion-single-source` (`:293`) + `proof:dock-motion-parity` (`:294`) have ZERO `package.json` hits — strike. (+10, `package.json:564-577`) add `proof:dock-rail-cohesion`, `dock-lockstep-bornred`, `dock-items-lag-capture`, `dock-orchestrator-single`, `dock-clip-reveal`, `dock-hold-contract`, `dock-vocabulary`, `dock-region-model`, `dock-perfection`, `dock-unify`. (2 stale) `:291` `proof:dock-animation-live` still says "on both the FLIP and VT paths" (VT retired; the binding witness is the entering-child onset); `:292` `proof:dock-opacity-lockstep` names the DK7-killed `--dock-motion-resize` token |
| K3 | `:37` (and the retune prose `:271`) | `DOCK_SPRING` home cited as `composables/useLayerTransition.ts` | the canonical authority is **`dockMorphContext.ts:39`** post-W-DOCK2 (`useLayerTransition.ts:45-46` says so itself — the mirror carries the `BOOKED: AY.W-GOD1` fold marker) |
| K4 | `:185` API table `shape` row | `"pill" \| "rounded"` | the union is `"pill" \| "rounded" \| "card"` (`GlassDock.vue:55`) |
| K5 | API table (absent row) | no `layout` prop documented | `layout?: "linear" \| "grid"` ships (`GlassDock.vue:138`; the `shape="card" layout="grid"` big-dock pairing + the `layout="grid"` ⇒ `alwaysExpanded` hard contract at `:131-134`) — add the row |

**Constellation (`src/components/custom/constellation/README.md`, 511 ln) — 4 rows** [lane: `constellation.md §3, §4.5`]

| Row | Site | Stale claim | As-built truth |
|---|---|---|---|
| C1 | `:142-152` props table | no `wander`, no `gravityWell` rows | both ship in `defineProps` (`Constellation.vue:67-68` defaults; `wander` type `:109` `boolean \| { minIdle?, jitter? }`; `gravityWell` type `:123`); the README's OWN example at `:363` uses `wander` — internally inconsistent |
| C2 | `:375-403` Tokens section | tables only the 6 color/alpha tokens (`:386-391`) | the **9-member numeric interaction cohort** (`tokens.css:524-532`) is absent: `--constellation-warp-response`/`-warp-zeta`/`-well-gain`/`-well-reach`/`-well-ramp`/`-well-max-speed`/`-well-hold-ms`/`-wander-idle`/`-wander-jitter` — add the table (carry the `:518-523` ANGULAR-period note: warp-response is the keyframes.js ω convention, NOT a settle-duration) |
| C3 | `:478-486` architecture blurb | `constellationField.ts` = "the four neutral draw passes AND the focal seam" | the engine now ALSO carries the `stepWell` well force, the wander cadence (`warpSettled`/`pickWanderTarget`), and the `readInteractionConfig` token readers — update the blurb (and the barrel-surface list if quoted) |
| C4 | `:15-25` provenance blockquote + `constellationField.ts:1` / `index.ts:1` `// AW.W17 —` heads | (the D1/D2 strip — already specced as edit-sites 1–3) | re-verified STILL PRESENT at the Batch-2-complete tree (both file-heads carry `AW.W17`; the work was AX.W17). The struck blockquote repoints to `## References` — now at `:502-505` (Garey-Johnson proximity-graph), NOT `:372` |

**CLAUDE.md — 4 rows** [lanes: `dock.md §5.7`, `glass-material.md §4.6`, `motion-primitives.md §4 R8`]

| Row | Site | Stale claim | As-built truth |
|---|---|---|---|
| M1 | `CLAUDE.md:348` (dock-orientation section) | "The prop is threaded through `useDockTransition` as its `axis` ref—both `useDockTransition` and `useLayerTransition` are axis-aware" | NO `useDockTransition` exists (`dock/composables/` = dockContext, dockLayerContext, dockMorphContext, isTeleportedTarget, useDockHold, useDockState, useLayerTransition) — rewrite onto the real names (`dockMorphContext` owns the morph axis; `useLayerTransition` the layer FLIP) |
| M2 | `CLAUDE.md:330` (W54 canon) | "Machine-locked by `proof:glass-level` + `proof:glass-one-model`" | `proof:glass-one-model` was REMOVED by W-GLASS and SUPERSEDED by **`proof:glass-cohesion`** (`package.json:675`; `grep -c glass-one-model package.json` → 0) |
| M3 | `CLAUDE.md:204` (W55 canon) | "`--glass-backdrop-luma` … ships demo-private" | NOTHING ships — the token is MINT-ONLY (`tokens.css:905,927`) with zero consumers in `src/`, `demo/`, or slides. Reword to match the W-GLASS §4.5 RETIRE-or-RESERVE disposition once decided (if RESERVE: "minted, reserved, no observer ships"; if RETIRE: strike the sentence) |
| M4 | `CLAUDE.md:232` dependency table + `:127-129` composables tree | keyframes peer "`^2.2.0 \|\| ^3.0.0`"; motion tree lists `useSpringOrchestrator` + `useDarkModeSync` | the actual peer is `^2.2.0 \|\| ^3.0.0 \|\| ^4.0.0` (`package.json:715`). `useSpringOrchestrator` has ZERO hits in `src/`; `useDarkModeSync` was renamed `installDarkModeSync` and relocated to `composables/dark/`; the listing omits the real leaves (`useSpring`, `useSpringMount`, `useSpringPress`, `useNumericTransition`, `useTextHighlight`, `usePrioritizedTask`, `useYieldToMain`, `supportsCssTimeline`, the `useStagger` core split). **CO-OWNED with W-MOTION2 §2.4 R8** — whichever wave lands first edits; the other verifies (record the owner at close, no double-edit) |

**Blob (`src/components/custom/goo-blob/README.md`, 432 ln) — 1 row** [lane: `blob.md §3, §4.6`]

| Row | Site | Stale claim | As-built truth |
|---|---|---|---|
| B1 | `:184-185` | default `paletteStops` documented as `["#cbad99","#ebcc99","#f3f1ce"]` (OKLCh L≈0.77→0.95) | the SHIPPED default is `["#b5947f","#d4b27d","#dad6b1"]` (`types.ts:267`, ramp mean L≈0.78) — the README literal is a pre-down-tune artifact of the 0.86-anchor era. Also: the `## References` heading moved to `:405` (edit-site 8's `:395` cite is stale) |

**Fourier-field (`src/components/custom/fourier-field/README.md`) — 1 row** [lane: `fourier-field.md §3 D8`]

| Row | Site | Stale claim | As-built truth |
|---|---|---|---|
| F1 | `:70-71` | "the body survives, never the quadratic that killed the oldest 80% of the trail" | TRUE in dark mode only — at the shipped light floors the effective trail alpha is 0.036 (final, 0.45·0.08) / 0.055 (hero, 0.55·0.10) on cream (B2-ff F3 measured). **FORK:** if W-FF2 D5 (the light-mode survival floor) lands BEFORE DOC1's close, the claim becomes true — verify and keep; otherwise ADD the light-mode caveat. Record which branch fired |

**glass.css header — 1 row** [lane: `glass-material.md §3.3, §4.7`]

| Row | Site | Stale claim | As-built truth |
|---|---|---|---|
| G1 | `src/styles/glass.css:3-19` | the AV.W15 "no-glass-on-glass discipline … a glass surface nested INSIDE another glass surface is a discipline violation" | in TENSION with the shipped W54 maximal default, under which `btn-glass` (a real 10px `backdrop-filter`) inside `.glass-card` inside a glass Dialog is the COMMON sanctioned composition. RE-SCOPE the header: the rule bans **PLATE-in-PLATE** (a second `.glass-*` panel inside a glass panel); **control-on-plate** is sanctioned AND budget-gated by W-A11Y-PERF O-4 (the depth-3 ceiling + `contain: paint`). The gate is the enforcement half; this header is the doc half — amend, do not silently contradict |

---

## Goal criterion

The four shipped component READMEs read as research-backed, meta-free, consumer-facing source
of truth. A fresh reader opening `aurora/README.md` sees the SOTA technique behind each axis
with a citation that traces to the lane's `RESEARCH.md`, NOT a wave-by-wave build arc; opening
`constellation/README.md` sees what the primitive IS, NOT which wave authored it; and no
shipped doc-comment or README prose contradicts the source (no "W14 restoration pending" over
an excised path, no stale `AW.W17` over `AX.W17` work, no "planned" over landed, **and no
D5-class as-built lie** — no "ACES" over PBR-Neutral, no VT-driver section over a retired VT
path, no props/tokens/gates table missing what ships, no CLAUDE.md naming a phantom
composable or a removed gate).

## Completion criterion

The HARD GATE below verifies via a new fail-closed gate `proof:readme-meta-clean` (a
deletion/absence proof over the four shipped READMEs + the two constellation file-heads) PLUS
a per-README research-citation presence check, PLUS the W14-prose reconcile cross-walked
against W-AUR-WEBGPU-DECIDE's landed disposition.

---

## Scope boundary (what the strip does NOT touch)

The meta-strip is SURGICAL — it removes provenance/arc/restoration prose, NOT load-bearing
internal references:

- **KEEP** internal `file.ts:NNN` source-line citations (e.g. `aurora.frag.ts:348`,
  `tokens.css:495-512`) — these are how a maintainer navigates the source; they are reference
  pointers, not version history.
- **KEEP** the `## proof:*` gate-table rows in the aurora README (`:621-634`) that read
  `shipped (AV.W1)` / `shipped (AW.W4)` — these are a CAPABILITY ledger (what each gate
  asserts), and the parenthetical wave is the gate's provenance, which is legitimate for a
  test-coverage table. (If the close-honesty review judges these as meta, they convert to a
  `## Gates` table WITHOUT the wave parenthetical — author's-discretion, recorded so the gate
  does not false-fire on them.)
- **KEEP** the front-half SOTA-cited framing of both blockquotes (the "documents X as it
  ships, with the SOTA technique behind each axis cited" sentence). Only the wave-arc /
  provenance back-half is struck. The blockquote becomes a research-citation pointer to
  `RESEARCH.md`, not a build log.
- **STRIP** tranche-letter PROSE tags (`AX.W10`, `AW.W17`, `AV.W8`, `AX.W30`) wherever they
  narrate WHEN/WHICH-WAVE rather than WHAT.

The boundary is encoded in the gate's allowlist (§"Hard gate" below): the gate forbids
`A[VWX]\.W[0-9]+` in README PROSE and file-head doc-comments, with the gate-table rows
explicitly exempted by section-fence.

---

## Edit sites (exact)

| # | File | Site | Edit |
|---|---|---|---|
| 1 | `src/components/custom/constellation/README.md` | `:15-25` | DELETE the provenance blockquote; replace with a one-line research-citation pointer (`> Research-backed — see [`RESEARCH.md`](./RESEARCH.md) for the cited proximity-graph / Canvas2D-substrate techniques.` — or fold the citation into `## References`) |
| 2 | `src/components/custom/constellation/constellationField.ts` | `:1` | strike `// AW.W17 — ` prefix → meta-free engine description (`// The constellation field engine: a pure, framework-free proximity graph. ...`) |
| 3 | `src/components/custom/constellation/index.ts` | `:1` | strike `// AW.W17 — ` prefix → `// The Constellation package barrel.` |
| 4 | `src/components/custom/aurora/README.md` | `:23-36` (the blockquote — post-retire it ends at `:36`, not `:39`; the W7-WebGPU arc line is already gone) | DELETE the five-wave arc back-half (mid-`:26` "The aurora perfection arc landed across five waves…" through `:36`); KEEP the `:23-26` SOTA/DESIGN.md framing front-half; repoint to `RESEARCH.md` |
| 5 | `src/components/custom/aurora/README.md` | `:33,:142,:195,:264,:325,:327,:341,:392` (RE-GREPPED at the Batch-2-complete tree — the old `:39,:145,:266,:329,:355,:373,:409` set is stale post-retire) | strike tranche-letter PROSE tags (`AX.W10`/`AX.W13`/`AX.W14`/`AV.W1`) — rewrite each sentence to state the design fact without the wave tag (`:33` falls with edit-site 4; `:195`/`:392` are the D3-residual past-tense excise sentences) |
| 6 | `src/components/custom/aurora/README.md` | ~~the SIX W14 prose sites~~ **DISCHARGED** — W-AUR-WEBGPU-DECIDE's retire reconcile already rewrote the §WebGPU section (only past-tense `:195`/`:392` survive; covered by edit-site 5) | residual: the gate clause-2 deletion-proof stays as the regression guard; NO authoring work remains at this site |
| 7 | `src/components/custom/aurora/README.md` | `## References` (**`:579`** — moved from the pre-retire `:638`) | add a `RESEARCH.md` citation row (the authoritative research artefact produced by W-AUR1) |
| 8 | `src/components/custom/goo-blob/README.md` | `## References` (**`:405`** — moved from `:395`; README now 432 ln) | add a `RESEARCH.md` citation row (produced by W-BLOB1); sweep D4 "planned"-prose |
| 9 | `src/components/custom/dock/README.md` | the inline citation blockquote at `:110-114` (`> Sources: …` + `> [NN/g — Liquid Glass](…) — accessed 2026-06-06.`; there is NO `## References` HEADING in this README — verified) | already research-cited (NN/g, 2026-06-06) — ADD a citation to the dock research corpus (`docs/tranches/AX/research/dock-facilities-corpus.json` / `dock-liquidglass-README.md`) as the lane's research artefact, appended to the existing inline blockquote or under a NEW `## References` heading (author's choice; record which). NOTE: the blockquote's two MDN View-Transition links (`:112-113`) cite the K1-RETIRED VT driver — when K1 deletes the VT sections, either drop the two VT links or keep them annotated as the retired-path record. D2 prose-tag absence: VERIFIED tag-clean at HEAD (`grep -E 'A[VWX]\.W[0-9]+' dock/README.md` → 0) — no strip needed |
| 10 | new `scripts/proof-readme-meta-clean.mjs` | — | author the fail-closed gate (§"Hard gate") + wire `proof:readme-meta-clean` into `package.json` scripts |
| 11 | `src/components/custom/aurora/README.md` | `:12,:56,:173,:336,:540` | **D5.A1** — "ACES" → Khronos PBR-Neutral at all FIVE sites; note the kept `aces()` GLSL slot-name (`tonemap.glsl.ts:17-31`) |
| 12 | `src/components/custom/aurora/README.md` | `:542-547` | **D5.A2** — architecture tree: add `atoms.ts`, `configSource.ts`, `cursorModel.ts`, `frameLoop.ts`, `glSetup.ts` (5 of the 10 composables are missing) |
| 13 | `src/components/custom/aurora/README.md` | `:127-133` | **D5.A3** — mediums table: add the `vangogh` / `oil-pastel` / `crayon` first-class rows (prose-only at `:142-146`) |
| 14 | `src/components/custom/aurora/README.md` | `:557-575` | **D5.A4** — gate table: add the 7 shipped-but-missing rows (`proof:aurora-{fill-resize,stroke-composite,painterly-statistics,arresting-ref,arresting,chrome-idiomatic,preset-roster}` — `package.json:620,:628,:629,:630,:633,:670,:671`) |
| 15 | `src/components/custom/aurora/README.md` | `:637-642` | **D5.A5** — prune the orphaned References `### WebGPU` block (keep `:616` Heckel TSL — it grounds the mesh-gradient baseline) |
| 16 | `src/components/custom/aurora/README.md` | every `file.ts:NNN` cite | **D5.A6** — re-grep all shader line-cites at close (in-flight W-AUR-PAINTERLY edits shift them) |
| 17 | `src/components/custom/dock/README.md` | `:78-89` + `:94` | **D5.K1** — DELETE/REWRITE the retired VT-driver + typed-VT sections onto the ONE `--dock-morph-t` spring-scalar truth (`view-transition.css:47-59` is the deletion record) |
| 18 | `src/components/custom/dock/README.md` | `:289-299` | **D5.K2** — gate table: strike `proof:dock-motion-single-source` (`:293`) + `proof:dock-motion-parity` (`:294`); add the 10 shipped gates (`package.json:564-577`); fix the 2 stale descriptions (`:291` "FLIP and VT paths"; `:292` `--dock-motion-resize`) |
| 19 | `src/components/custom/dock/README.md` | `:37` (+ `:271`) | **D5.K3** — re-point the `DOCK_SPRING` home cite to `dockMorphContext.ts:39` (the `useLayerTransition.ts:45-49` copy is the BOOKED mirror) |
| 20 | `src/components/custom/dock/README.md` | `:185` + the API table | **D5.K4+K5** — `shape` adds `"card"` (`GlassDock.vue:55`); add the `layout` prop row (`GlassDock.vue:138`; the grid ⇒ `alwaysExpanded` contract `:131-134`) |
| 21 | `src/components/custom/constellation/README.md` | `:142-152`, `:375-403`, `:478-486` | **D5.C1–C3** — props table adds `wander` + `gravityWell` rows (`Constellation.vue:67-68,:109,:123`); Tokens section adds the 9-member numeric cohort table (`tokens.css:524-532`, carrying the ANGULAR-period note); architecture blurb adds well force + wander cadence + config readers |
| 22 | `CLAUDE.md` | `:348`, `:330`, `:204`, `:232` + `:127-129` | **D5.M1–M4** — phantom `useDockTransition` → `dockMorphContext`/`useLayerTransition`; `proof:glass-one-model` → `proof:glass-cohesion`; the luma "ships demo-private" claim → the W-GLASS §4.5 disposition wording; keyframes peer range → `^2.2.0 \|\| ^3.0.0 \|\| ^4.0.0` + the motion-tree listing fix (CO-OWNED with W-MOTION2 R8 — record the owner) |
| 23 | `src/components/custom/goo-blob/README.md` | `:184-185` | **D5.B1** — the default `paletteStops` literal → the shipped `["#b5947f","#d4b27d","#dad6b1"]` (`types.ts:267`) |
| 24 | `src/components/custom/fourier-field/README.md` | `:70-71` | **D5.F1** — "the body survives": verify-keep if W-FF2 D5's light floor landed, else add the light-mode caveat (B2-ff F3 measured 0.036/0.055 effective on cream); record which branch fired |
| 25 | `src/styles/glass.css` | `:3-19` | **D5.G1** — re-scope the no-glass-on-glass header: PLATE-in-PLATE banned; control-on-plate sanctioned + W-A11Y-PERF O-4 budget-gated |

**Public doc-comment sweep (D2, beyond constellation):** the gate scans the file-head
doc-comment (line 1, the first `//` / `/**` block) of every shipped SFC + barrel under
`src/components/custom/{aurora,goo-blob,dock,constellation}/` for a leading `A[VWX]\.W\d+`
tag. Aurora/blob/dock source heads carry wave tags too (verified: `Aurora.vue`,
`GlassDock.vue`, `gpuRuntime.ts`, etc.) — but these are INTERNAL implementation files whose
heads are NOT consumer-facing the way the README + the package `index.ts` barrel + the
engine free-function module are. **Decision (recorded):** the gate scans ONLY (a) the four
READMEs and (b) the package `index.ts` barrels + the named engine modules
(`constellationField.ts`) — the surfaces a consumer reads via the subpath. Internal
composables/shaders keep their wave-tag heads (they are the source-line-citation class, kept
per the scope boundary). This keeps the gate from churning ~40 internal files for a
public-surface concern.

---

## W14 reconcile (edit site 6) — **RESOLVED: the RETIRE branch FIRED and its reconcile LANDED**

W-AUR-WEBGPU-DECIDE EXECUTED Branch A (RETIRE) ahead of DOC1: `aurora.wgsl.ts` /
`gpuRuntime.ts` / `createGPUCanvas.ts` / `WEBGPU_PARITY` are deleted grep-0 from `src/`, the
deletion is recorded in `docs/tranches/AY/audit/visual/W-AUR-WEBGPU-DECIDE-DELTA.md`, and the
README's `### WebGPU` section was rewritten in the same stroke (702→643 ln; the honest
single-pass §Substrate sentence now at `README.md:390-395`). Verified at the
Batch-2-complete tree: ZERO occurrence of "restoration wave is AX.W14" / "until the W14 …
finalize" / "W14 follow-up" / "staged with the W14" — the gate's clause-2 deletion-proof is
ALREADY satisfiable and ships as the REGRESSION guard, not as pending authoring work.

DOC1's residual at this seam: (a) edit-site 5 strips the two surviving past-tense `AX.W14`
prose tags (`:195`, `:392` — D2 class, rewrite without the wave letter); (b) edit-site 15
(D5.A5) prunes the now-orphaned References `### WebGPU` block (`:637-642`); (c) clause 2's
tense cross-walk pins the RETIRE wording (the non-goal sentinel — the section states the
single-pass design fact, no future tense).

---

## Hard gate

`proof:readme-meta-clean` (new fail-closed gate, `scripts/proof-readme-meta-clean.mjs`,
wired into `package.json`, run by CI) is GREEN, asserting ALL of:

1. **META-STRIP (deletion proof).** Across the four READMEs + the two named public modules
   (`constellation/constellationField.ts`, `constellation/index.ts`) + the four package
   `index.ts` barrels:
   - ZERO `A[VWX]\.W\d+` tranche-letter tag in README PROSE or in a scanned file-head
     doc-comment (the gate-table section in `aurora/README.md` is fenced-out by an explicit
     `## proof` / `## Gates` section marker the gate skips — encoded as an allowlist range,
     NOT a blanket grep);
   - ZERO line matching the provenance-blockquote signature (`> .*(authored but
     GATED-NOT-LANDED|perfection arc landed across|completes the abstraction|consumer #2 that
     adopts)`).
2. **W14-RECONCILE (deletion proof — REGRESSION guard; already satisfiable at HEAD).** ZERO
   occurrence of `restoration wave is AX.W14` / `until the W14 .*finalize` / `W14 follow-up` /
   `W14 painterly finalize` in `aurora/README.md`. The disposition is KNOWN (Branch A RETIRE,
   executed) — the gate pins the RETIRE wording: the substrate prose states the single-pass
   design fact (the `:390-395` honest-sentence class), never the future-tense restoration
   prose; the References `### WebGPU` block is gone (D5.A5).
3. **STATUS-CLEAN (deletion proof).** ZERO `(planned — ` / `(coming — ` / `TODO` / `will ship`
   prose describing landed work across the four READMEs (the gate allows the existing
   self-negating `no longer "planned"` / `coming alive` literals via an exact-phrase
   allowlist).
4. **RESEARCH-CITATION (presence proof, per lane).** Each README's research section cites its
   lane's authoritative research artefact, present on disk:
   - `aurora/README.md` → cites `./RESEARCH.md` AND `src/components/custom/aurora/RESEARCH.md`
     EXISTS (PRESENT at HEAD, 304 lines; W-AUR1 may revise it — the gate `find`-asserts the file
     exists, and DOC1's citation must trace to the final content);
   - `goo-blob/README.md` → cites `./RESEARCH.md` AND `goo-blob/RESEARCH.md` EXISTS (PRESENT at
     HEAD, 261 lines; W-BLOB1 may revise);
   - `dock/README.md` → cites the dock research artefact
     (`docs/tranches/AX/research/dock-facilities-corpus.json` or the lane's research doc) AND
     retains its ≥1 cited external source with an access date (NN/g, present in the inline
     citation blockquote at `:114` — this README has no `## References` heading, so the gate's
     dock-arm asserts the inline blockquote line, NOT a heading);
   - `constellation/README.md` → cites its research references (the Garey-Johnson
     proximity-graph + the particle-network-motif ancestry already at `:372-381`) AND repoints
     the struck blockquote to `## References` / a `RESEARCH.md` pointer.

   The gate fails CLOSED: if a cited `RESEARCH.md` does not exist on disk, the gate is RED
   (this is what binds W-DOC1's close to W-AUR1/W-BLOB1 having shipped their research
   artefacts — a citation to a non-existent file is a broken-link defect, not a pass).

5. **DOC-SYNC (the D5 machine-checkable subset — presence/absence proofs against source).**
   The gate asserts the rows of the D5 ledger that grep can hold honest:
   - `aurora/README.md`: ZERO `ACES` token outside an explicit slot-name parenthetical
     (the `aces()` GLSL-name note is the allowlisted form); contains `PBR-Neutral`; the
     mediums-table region contains `vangogh`, `oil-pastel`, AND `crayon` as table rows; the
     gate table names ALL of `proof:aurora-{fill-resize,stroke-composite,painterly-statistics,
     arresting-ref,arresting,chrome-idiomatic,preset-roster}`; the architecture tree names
     `atoms.ts`, `configSource.ts`, `cursorModel.ts`, `frameLoop.ts`, `glSetup.ts`; ZERO
     References link to `w3.org/TR/WGSL` / `webgpufundamentals.org`.
   - `dock/README.md`: ZERO `startViewTransition` / `:active-view-transition-type` /
     `--dock-motion-resize` / `proof:dock-motion-single-source` / `proof:dock-motion-parity`;
     contains `dockMorphContext.ts` (the DOCK_SPRING home), a `"card"` shape literal, a
     `layout` prop row, and every shipped `proof:dock-*` gate name read LIVE from
     `package.json` (enumerate at run time — no hardcoded list to go stale).
   - `constellation/README.md`: the props table contains `wander` and `gravityWell` rows; the
     Tokens section names all 9 `--constellation-{warp-*,well-*,wander-*}` numeric tokens
     (enumerated live from `tokens.css`).
   - `CLAUDE.md`: ZERO `useDockTransition` / `proof:glass-one-model` / `useSpringOrchestrator`;
     the keyframes peer-range line matches `package.json` `peerDependencies` verbatim; the
     luma sentence matches the recorded W-GLASS §4.5 disposition (sentinel string recorded at
     close).
   - `goo-blob/README.md`: the documented default `paletteStops` literal equals the
     `types.ts` shipped array (parsed from BOTH files — a future retune REDs the README
     until it re-syncs).
   - `glass.css:3-19`: contains the plate-in-plate/control-on-plate re-scope sentinel; ZERO
     bare "a glass surface nested INSIDE another glass surface is a discipline violation"
     un-scoped form.
   - `fourier-field/README.md`: contains EITHER the light-mode caveat sentinel OR (if W-FF2
     D5 landed) the verified survival claim + the recorded branch note.

**Evidence class:** deletion-proof (clauses 1-3) + document-presence proof (clause 4) +
explicit doc-vs-source reconciliation (clause 2 cross-walk + clause 5 source-sync). NOT a
grep-only "the word research appears" check — the gate asserts the ABSENCE of named
meta-strings AND the PRESENCE of named on-disk artefacts AND the tense-match of the
reconciled section AND the live source↔doc sync of the D5 rows (gate names, prop unions,
token cohorts, and the palette literal are read from `package.json`/source at run time, so
the gate cannot itself go stale). The gate is reproducible (`npm run proof:readme-meta-clean`
→ exit 0) and fail-closed (a re-introduced provenance blockquote, a stale W14 line, a
dangling `RESEARCH.md` citation, or a doc-vs-source desync flips it RED).

---

## Named successor (if missed)

- Clause-4 miss: the two `RESEARCH.md` files EXIST at HEAD, so the original "did-not-land"
  miss-path is moot. The residual risk is a CONTENT one — if W-AUR1 / W-BLOB1 REVISE their
  RESEARCH.md and DOC1's README citation points at stale framing, the successor is W-AUR1 /
  W-BLOB1 (DOC1's citation must trace to the FINAL research content; the orchestrator still
  orders DOC1 after the W-*1 revise per the AY EXECUTION-DAG). If a citation points at a
  NON-EXISTENT file (constellation/dock have no RESEARCH.md — they cite inline References), that
  is a DOC1 authoring bug, not a successor handoff.
- ~~Clause-2 miss because W-AUR-WEBGPU-DECIDE has not landed its disposition~~ MOOT — the
  disposition LANDED (Branch A RETIRE, executed + README-reconciled); clause 2 is a pure
  regression guard with no upstream dependency.
- D5.M4 miss (the CLAUDE.md motion rows): successor is W-MOTION2 (§2.4 R8 co-owns them) —
  whichever wave closes second VERIFIES rather than re-edits; the close that lands the edit
  records ownership so the other's gate clause does not double-fire.
- D5.F1 miss (the FF light-mode caveat): if neither the caveat nor the W-FF2 D5 floor lands,
  the successor is W-FF2 (D8 there is the same row) — one of the two waves MUST resolve the
  claim before either closes.
- D5.A6 miss (stale shader line-cites at close): re-run the re-grep; no successor — this is
  a DOC1 close-ritual step, not a handoff.

## Cross-references

- H-aurora FINDING 1 (WGSL comment-lie) + FINDING 7 (W14-restoration drift) →
  `docs/tranches/AY/audit/hardening/H-aurora.md`.
- H-constellation FINDING 5 (provenance blockquote + AW.W17/AX.W17 mixed tags) →
  `docs/tranches/AY/audit/hardening/H-constellation.md:158-170`.
- H-precept-drift F4 (all four READMEs exist; uplift not from-zero) + the greenfield-no-meta
  chronic → `docs/tranches/AY/audit/hardening/H-precept-drift.md:103-116,192-198`.
- **The D5 ledger sources** (the research-necessity fleet, 2026-06-09):
  `docs/tranches/AY/audit/research-necessity/NECESSITY-MATRIX.md §2 W-DOC1` (the consolidated
  row) ← `aurora.md §3` (tonemap/tree/mediums/gates/refs/re-grep) · `dock.md §3,§5.6,§5.7`
  (VT/gates/DOCK_SPRING/props + the CLAUDE.md phantom) · `constellation.md §3,§4.5`
  (props/tokens/blurb) · `glass-material.md §3,§4.6,§4.7` (CLAUDE.md:330/:204 +
  glass.css header) · `motion-primitives.md §4 R8` (CLAUDE.md motion rows) · `blob.md §3,§4.6`
  (stops literal) · `fourier-field.md §3 D8,§5` (the survival overstatement). Every D5 row
  was independently RE-VERIFIED against the Batch-2-complete tree by the HC-doc1-spec
  hardening pass (which also corrected: ACES ×5 not ×4; `proof:aurora-arresting` now MINTED;
  References headings at `:579`/`:405`/`:502`; the W14 set collapsed to 2 past-tense sites).
- The greenfield-no-meta + writing-style memory keeps; the doc-currency precept.
