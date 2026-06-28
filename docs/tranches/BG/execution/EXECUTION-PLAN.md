# EXECUTION-PLAN.md — the joint BG+BH 5.0.0 master build plan

> THE MASTER. Ties the six execution-component docs into ONE coherent 48-hour build plan. Tranche-DEV —
> this is the plan, not the run; nothing is on committed `tranche/BG` disk at HEAD
> (`git diff master..HEAD -- src/` is empty). The build phase opens against the frontier this maps, one
> PROVEN slice at a time. Cursor: `EXECUTION-PROGRESS.md`. Engine: `bg-bh-execute.wf.js` (authored by the
> orchestrator from `engine-design.md`).

---

## §A Executive summary

**Two monoliths, one cut.** BG (≈110 waves, 12 workstreams) is the visual/architectural convergence —
routing·field·glass·dock·viz·siri·components·close·glass-deep·paper-deep·de-shadcn·storybook·coherence. BH
(≈30 waves, 8 bands) is the structural restructure — legacy excision·src-reshape·demo-restructure·docs·
backbone·prompts·consumer-asks. They build INTERLEAVED on `tranche/BG` and publish ONCE as **5.0.0** — the
single sanctioned break point (no 4.x transition alias, the no-legacy identity).

**The real-paint gate is the spine.** The disease this tranche cures: a device-free proof reads SOURCE; it
cannot read PAINT. It shipped broken 3× (BB green-lie · BC never-built-cure · BD 77-gates-but-the-live-π-
never-blocked-the-tag). The cure: every paint-gated `[P]` wave closes against the §1 AND — device-free
GREEN **and** an on-disk dual-engine capture **and** a NON-AUTHORING agent's gestalt verdict. WS7's
`BG.W-PAINT-IS-THE-GATE` + `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` build FIRST (the born-RED ground-freeze)
and `proof:ship-attestation` `["ci","release"]` re-couples the verification axis to the `git push --tags`→
`release.yml`→`npm publish` path. See `real-paint-protocol.md`.

**The consumer constellation is narrow.** 6 live source consumers; 2 dev/peer non-consumers owe no ask. The
whole 5.0.0 break = ONE dropped key (`./api`, 203-symbol re-home) + the `--ring → --focus-ring-color` rename
+ a key-preserving viz re-baseline — touching exactly 3 by-name asks (muster·speedtest·atlas). 4 consumers
ride a latent pre-4.0.0 2-major jump across the BA reshape on top. The stalest is **muster (3.1.0)** — the
widest gap AND a `/api` break, double-exposed. See `consumer-constellation.md`.

**The cut is linear + user-gated.** inv-11 forces a strictly-linear master line `4.2.0 → 4.3.0 → 4.4.0 →
5.0.0`, each tag an ancestor of the next. 4.3.0 (parked) publishes first; 4.4.0 carries GU-1 +
GU-3-ASK-A (the `^4`-reachable additive deltas); 5.0.0 is the joint major descending from 4.4.0. The engine
drives every wave to DONE and HALTS at the human gate before `git push --tags`. See `publish-and-cut.md`.

---

## §B The interleaved wave schedule (the single merged timeline)

The BG build order is the gating axis: core `WS1→WS3→WS2→WS5→WS6→WS4→WS7`, deep-morphism
`WS8→WS9→WS10→WS11`, then `WS12` LAST. WS7's Stage-0 ground-freeze builds BEFORE WS1 integration; WS7's
`BG.W-CUT` (the tag-fire) is structurally LAST among BG (after WS12). BH waves slot at their interleave
class: **[C]** now · **[WSn]** after `allDone(WSn)` · **[WS12]** after the full BG close · **B4f** absolute-
last. BG rows are workstream-granular (the full per-wave roster is `bg-build-map.md` + `EXECUTION-PROGRESS.md`);
BH rows are wave-granular.

| seq | wave / phase | tranche/ws | depends-on | gate (representative) | paint? |
|----:|--------------|-----------|-----------|----------------------|:------:|
| 0 | **STAGE 0** — ground-freeze: PAINT-IS-THE-GATE · GESTALT-ROSTER-RE-POINT · SHIP-DISCIPLINE-LIVE-PRECOND · DEFERRED/BE-BF/DISPOSITION ledgers | BG/WS7 | — | `proof:ship-attestation` ["ci","release"] · `proof:ba-gestalt` born-RED | **P** (born-RED 4.2.0 Metal) |
| 1 | B0 W0-scratch-sweep | BH/B0 [C] | — | git-hygiene | H |
| 2 | B1 W1-external-payload · W2-value-destraddle · W3-dragmorph-snap-excise | BH/B1 [C] | — | `profile:budget` rebaseline · typecheck | H |
| 3 | B2.0 W-alias-codemod | BH/B2 [C] | — | typecheck (no semantic delta) | H |
| 4 | B2.1-mech W-regen-mechanism | BH/B2 [C] | — | `proof:subpath-classify` (fail-closed) | H |
| 5 | B2.4a W-bh-carves (carousel/pager worm, useBloomUp) | BH/B2 [C]¹ | — (file-checkpoint × WS10) | `proof:colocation` | **P** (byte-identical) |
| 6 | B4a-archive · B4b-skeleton · B4c-files · B4d-files | BH/B4 [C] | — | resolvers present | H |
| 7 | B6 W-core-prompts | BH/B6 [C] | — | repo-local | H |
| 8 | **WS1** — Shell·Routing·Field (7): ROUTE-TRANSITION(linchpin)·FIELD-AURORA·SCROLL-RAIL·ACCENT-RECONCILE·GRAIN-OPTIN·HERO-FIT·VT-ENHANCE | BG/WS1 | Stage 0 | `proof:route-confounder` · `proof:no-paper-field` · `proof:focal-complete` | **P** |
| 9 | **WS3** — Glass standardization (11): CARTOON-INK·CAST-RETIRE·CLIP·SAFARI-BLUR·TINT-UNIFY·BLUR-PEER·IDIOM-FACTOR·CONSUMER-BAND·LEGIBILITY·DYNAMICS·STYLE-REHOME | BG/WS3 | WS1 (chromatic phases field-gated) | `proof:glass-cal` · `proof:glass-clip` · `proof:glass-foundation` | **P** (Safari Job-B = CEILING) |
| 10 | **WS2** — Dock convergence (11): MORPH-UNIFY→useDockSpring·BUSY-SINGLE·CUT·DECOMPOSE·FISSION-WIRE·PERSISTENT-CUT·CAP-SCROLLS·OVERFLOW-FADE·SHELL-DOCK-DRY·INPLACE-MORPH·STORY-MODULARIZE | BG/WS2 | WS3 blur peer · WS1 swap | `proof:dock-morph-family` · `proof:dock-morph-insitu` | **P** |
| 11 | B2.5 W-dock-leaf-verify (verify-only, ZERO carve) | BH/B2 [WS2] | WS2 | verify GlassDock/fission carved | H |
| 12 | B4c-extraction (precept design-docs; DOCK_SPRING 0.68/0.64) | BH/B4 [WS2] | WS2 | — | H |
| 13 | **WS5** — Viz refinement (9): INTRINSIC-SIZE·SIZER-ADOPT·DEMIGRATE·REVEAL-BLOOM·PREVIEW-LIVE·DOTFLOW-REBUILD·SUBSTRATE-DELETE·GOODOT-SPLIT·BLOB-LEAF | BG/WS5 | precedes WS4 carves | `proof:gpu-substrate-single` · `proof:viz-resize-upload-only` | **P** |
| 14 | B2.4c W-leaf-verify-ws5 (verify blob/goo-dot leaves) | BH/B2 [WS5] | WS5 | verify-only | H |
| 15 | **WS6** — Siri capabilities (4): GLASS-BLUR-ENGAGE·SIRI-ISLAND·SIRI-WAVEFORM·SIRI-DOCK-INTEGRATION | BG/WS6 | WS2 `useDockSpring` (HARD) | `proof:siri-island` · `proof:siri-waveform` | **P** |
| 16 | B5a-deps-currency (split vite.style-assets.ts) | BH/B5 [WS3] | WS3 | deps verdict in docs/canon | H |
| 17 | **WS4** — Components·Demo·Encapsulation (≈22): SCROLL-SHRINK·SHEET-INSET·SPECIMEN·DESHADCN-SWEEP(W0)·FLIP-ONE·CANVAS-LEAVES·12-LAWS·… | BG/WS4 | WS1 (scroll-shrink) · AFTER WS5 (carves) | `proof:de-shadcn` · `proof:bento-specimen` · `proof:no-layout-animation` | **P** |
| 18 | B2.4b W-leaf-verify-ws4 (verify canvas/tabs/luma leaves) | BH/B2 [WS4] | WS4 | verify-only | H |
| 19 | B3 demo restructure (δ1–δ6, 5 waves): code-fold-consume·dock-layers-shell·chassis-colocation·manifest-carve+glob·smoke-repoint | BH/B3 [WS4] | WS4 | `tests/stories.smoke.spec.ts` resolves | H/P |
| 20 | **WS7** — close-machine bands 1–4: SPIKE/JUBILANCE/DEAD-GATE cuts · ROUTING-LIVE·FIELD-AURORA·PREVIEWS·UNIFORM-BLUR gates · SAFARI-PARITY·CONSTRAINT-MANIFEST · DATE-CALENDAR/CHART-FAMILY/DS-COMPLETE | BG/WS7 | WS1–WS4 | `proof:route-navigates` · `proof:safari-parity` · `proof:field-aurora` | H/P |
| 21 | **WS8** — Glass-deep (5): SUFFUSE-UNIVERSAL·REFRACT-WEBGL·BACKDROP-SAMPLE(keystone)·SOTA-LADDER·LIQUID-TRANSITION | BG/WS8 | WS1 shell-aurora · WS3 contain host | `proof:glass-specular-angle` · `proof:ba-gestalt` glass | **P** (C-SAFARI ★★★) |
| 22 | **WS9** — Paper-deep (5 + GU-1 token first): GRAIN-REAL·SUFFUSE·HANDMARK-PERFECT·PENCIL-BOIL·CROSSREPO-ASKS | BG/WS9 | GU-1 `--glass-key-direction` first | `proof:paper-grain` · `proof:handmark-audit` | **P** |
| 23 | **WS10** — De-shadcn / Tailwind v4 (5): CENSUS·TOKEN-REPLACE·TAILWIND4-IDIOM·MATERIAL·GATE | BG/WS10 | WS4 W0 (DESHADCN-SWEEP) | `proof:no-shadcn-default` · `proof:de-shadcn` | **P** (REAL-Safari-dark) |
| 24 | **WS11** — Storybook facility (4): SCROLL-GLASSY·TYPEWRITER-FADEUP·STORY-PAGE-API·STORYBOOK-SUFFUSE | BG/WS11 | WS1+WS4 integration branch · WS8 glass | `proof:story-page-api` · `railHealth()` | **P** |
| 25 | **WS12** — Coherence capstone (6): CENSUS·GATE·DESIGN-LANGUAGE·ANIMATION-CONGRUENCE·GLASS-PAPER-SPINE·PAGE-COMPONENT-AUDIT | BG/WS12 | **WS1–WS11 ALL LANDED** | `proof:coherence-census` · `proof:hue-at-l` · `proof:motion-one-clock` | **P** (480-capture dual-engine) |
| 26 | B2.1-swap · B2.2 (/api-fold) · B2.3 · B2.6 · B4b-content · B4c-gate-repoints · B4d-reg · B4e · B5b · B5c · B7 (11 acts) | BH/[WS12] | WS12 (+ intra-edges: B2.1-mech→swap · B2.2→B7 · B5b→B5c) | `proof:subpath-enumeration` · `public-surface.spec` | H |
| 27 | **WS7 Band-5 — BG.W-CUT** (5.0.0 tag-fire, user-gated) | BG/WS7 | WS12 + BH[WS12] + `--run ship` | `proof:ship-attestation` · real-Safari `webkit.glass/goo==pass` | **P** |
| 28 | **B4f — CLAUDE.md hard-delete** (ABSOLUTE LAST act of the tranche) | BH/B4 [WS12] | B5c + B4b-content + WS12 | `rg -l 'CLAUDE\.md' scripts/proof-*.mjs == 0` | H |

¹ B2.4a's carousel arm is the one [C]×WS10 graze — land the carve before WS10 rewrites `CarouselContent.vue`,
or rebase onto WS10's render (`bh-interleave-map §2`).

**The two FILE-granularity grazes** (coordinate at file, not line): `vite.library.ts` (B1-W1 × WS6 +2 siri
subpaths) and `ui/carousel/CarouselContent.vue` (B2.4a × WS10). The four hot files (`scripts/gates.mjs`,
`package.json`, `src/index.ts`, `CLAUDE.md`) are orchestrator-owned — agents emit `gatesRegistration`/
`sharedFileRequests`, never write them. The interleave classes serialize every other hard collision to [WS12].

---

## §C The real-paint WAVE-DONE bar (binding — `real-paint-protocol.md`)

A `[P]` wave is DONE only when ALL THREE hold (the AND, no shortcut — `real-paint-protocol.md §1`):

1. **Device-free proof GREEN** under `--run ci` siblings-absent (source/structure axis). NECESSARY, never
   SUFFICIENT.
2. **Real-paint π captured-on-disk** — the `tests-visual/<wave>.spec.ts` readback RUNS on a real GPU AND the
   fresh whole-page capture set lands under `docs/tranches/BG/audit/reflect/` — the dual-engine 4-PNG floor
   `{Chrome.app, Safari.app/WebKit 26} × {light, dark} × {desktop, mobile}` (`isRealPng` + `pngDimensions`,
   the resolves-on-disk anti-evasion floor).
3. **Non-authoring gestalt verdict PASS** — a FRESH agent (NOT the builder, model: opus) captures, pixel-reads
   through `proof:ba-gestalt`, and flips the roster row FAIL→PASS with the pixel-read inside the warm-glass
   band (`meanChroma >= 0.02`, `meanAlpha < 0.70` where declared). The building agent NEVER flips its own row;
   there is NO terminal W-REFLECT funnel (`proof:ba-gestalt` G8 reds a wave that defers its verdict).

`[H]` headless-only waves close on device-free GREEN alone (the bg-build-map `[H]` legend). The per-band
cadence captures + verdicts AT each band close — never deferred to one terminal sweep. **C-SAFARI is the ★★★
3-wave chronic** (`real-paint-protocol.md §5`): WS8's Metal-Safari.app capture is the single non-skippable item,
the likeliest to miss a 4th time — a committed real-Metal-Safari.app capture by a non-authoring agent on
Safari.app 26 / AS-Tahoe, NOT a Playwright bundled-WebKit arm (which CORROBORATES wiring, never discharges the
paint). The C18 harness (`?capture=` route + the `#ff00ff` fiducial + the in-pixel engine badge +
`screencapture -o -l <windowID>` window-mode + `safari-fidelity-delta.mjs`) is the load-bearing unbuilt
instrument.

---

## §D The joint 5.0.0 cut + consumer-update cadence (`publish-and-cut.md` · `consumer-constellation.md`)

**The lineage spine (inv-11 — dominates ordering).** The registry line is STRICTLY LINEAR on master:
`4.2.0 → 4.3.0 → 4.4.0 → 5.0.0`, each tag an ancestor of the next, each carrying everything below. `release/4.3.0`
diverged from the BG line — it RECONCILES onto master BEFORE its own tag; no tag is ever pushed from the
divergent branch. The cut ledger:

| Tag | Carries | Cut from | Pre-tag battery | Publish |
|-----|---------|----------|-----------------|---------|
| v4.3.0 | parked Δ1+Δ2+Δ3 (Δ4 deferred) | master ← `release/4.3.0` merged | §1 (no gestalt OR — additive) | gated provenance (push tag → release.yml) |
| v4.4.0 | GU-1 `glass-key-fill` + GU-3 ASK-A | master ← BG-converged + GU commits | §1 + re-approve 7 under-shadow baselines | gated provenance |
| **v5.0.0** | joint BG+BH — `./api` drop + 203 re-home + `--ring` rename + restructure | master ← 4.4.0 ← BH restructure | §1 FULL incl. the gestalt OR over the WS12 surface | gated provenance |

**The PRE-TAG close-battery (every tag).** (1) `verify-siblings-intact.mjs` BEFORE; (2) the siblings-absent
clean checkout in an **in-repo `.claude/worktrees/` worktree, NEVER `/tmp`**; (3) `node scripts/gates.mjs
--run full` (the deduped `local`+`ci`+`release` union — NOT `--run local` alone, the 4.0.0 lesson); (4) the
gestalt OR (5.0.0 only — `proof:ba-gestalt` operative-PASS over the LANDED post-WS12 surface, the 480-capture
verdict its binding paint); (5) `verify-siblings-intact.mjs` AFTER. A RED at any step ABORTS — fix on the
tranche line, never green-wash the tag.

**The consumer cadence (POST-5.0.0, OUT of the 48h build — by-name asks, the sibling owns its edit).** 3 asks,
SAME 5 steps each: bump `^5.0.0` · fallback-first adopt · pin the exact landing COMMIT · the by-name
green-handshake · consume-and-delete the interim shim. The 3 asks: muster→/aurora (`migrate-api-to-aurora`),
speedtest→/timeline (`migrate-api-to-timeline` + drop the dead `vite.config.mjs:1033` string), atlas→`--ring`
(`migrate-ring-to-focus-ring-color`, 12 bare sites, ATOMIC with the cut). bbnf-buddy + slides-K + slides keep
every key (`--ring` self-immune / key-preserving viz re-baseline) — no ask owed, but the 4 pre-4.0.0 consumers
run a JOINT 4.0.0+5.0.0 MIGRATION sweep.

---

## §E The constraints (ABSOLUTE)

- **Foreign-tree fence — LITERAL.** Edit ONLY files under `/Users/mkbabb/Programming/glass-ui`. Read siblings
  under `~/Programming` IN PLACE, read-only (the registry/import scout). NEVER `mv`/`rm`/move/write/touch ANY
  path outside glass-ui except its own `.claude/worktrees/`. The consumer-update cadence (§D) is by-name asks
  POST-CUT; glass-ui edits ZERO sibling trees.
- **NEVER `/tmp`.** Worktrees are `.claude/worktrees/<runId>` off `tranche/BG`. The siblings-absent close-battery
  emulation is a FRESH in-repo worktree (the absence is the fresh checkout, NOT a moved sibling — the
  2026-06-20 park-not-restored orphan incident; `verify-siblings-intact.mjs` is the standing tripwire).
- **Batches of 3.** The rate-wall floor — ≤3 file-disjoint + hot-file-disjoint BUILD agents per batch, Opus
  fanout, the core model orchestrates integration + hot-file registration + paint-judge dispatch + the commit.
- **Real-paint is the gate.** No source-green close. Every `[P]` wave closes born-RED→GREEN with a captured
  dual-engine delta judged by a NON-AUTHORING agent (§C). The headless-green/visually-broken disease is the
  thing the engine exists to kill.
- **4.3.0 / GU-1 sequencing.** 4.3.0 publishes FIRST (parked, do not re-open), 4.4.0 carries GU-1 + GU-3-ASK-A
  (the `^4`-reachable additive deltas — folding them into 5.0.0 strands the atlas), 5.0.0 is the joint major
  descending from 4.4.0. inv-11 linearity is non-negotiable. `BG.W-CUT` is user-gated — the engine HALTS before
  `git push --tags`.

---

## §F Cross-reference index — the 6 component docs

| Doc | Owns | Cited in |
|-----|------|----------|
| `bg-build-map.md` | the BG wave-by-wave BUILD ORDER — id · files · device-free gate · real-paint π · preconds · `[H]`/`[P]` · the CRITICAL PATH (~14 stages) | §B timeline · `EXECUTION-PROGRESS.md` per-wave roster |
| `bh-interleave-map.md` | every BH wave tagged `[C]`/`[WSn]`/`[WS12]` · the hard-collision census + merge-checkpoint protocol · the post-WS12 sequencing DAG · the 5.0.0 export reshape (§5) | §B BH slots + grazes · §D /api fold |
| `consumer-constellation.md` | the 6-consumer 5.0.0 UPDATE plan · the 3-vector break surface · the stalest (muster) · the by-name ask ledger | §A · §D cadence |
| `real-paint-protocol.md` | the WAVE-DONE bar · the dual-engine 4-PNG floor · the non-authoring-judge discipline · `proof:ba-gestalt` verdict-flip · C-SAFARI ★★★ · the C18 capture harness · the re-coupled release axis | §A · §C |
| `publish-and-cut.md` | the inv-11 lineage spine · the PRE-TAG close-battery · the 5.0.0 bump+MIGRATION reshape · the gated provenance publish · the consumer cadence · the 4.3.0/4.4.0/5.0.0 sequencing | §A · §D · §E |
| `engine-design.md` | the `bg-bh-execute.wf.js` DESIGN — the wave DAG model · readiness predicate + `interleaveReady` · the batch composer · the wave-state machine + cursor · the orchestration loop · agent prompt shapes + schemas · worktree isolation · resumability + cron | the engine the orchestrator authors; drives §B against `EXECUTION-PROGRESS.md` |

---

**3-line summary.** ≈140 waves (≈110 BG + ≈30 BH) build interleaved on `tranche/BG` — Stage-0 ground-freeze
first, BG core `WS1→WS3→WS2→WS5→WS6→WS4→WS7` with BH [C] now / [WSn] after `allDone(WSn)` / [WS12] after the
full BG close, deep-morphism `WS8→WS9→WS10→WS11`, WS12 capstone, `BG.W-CUT` + `B4f` absolute last. Every `[P]`
wave closes against the real-paint AND — device-free GREEN + on-disk dual-engine capture + a non-authoring
gestalt verdict — the headless-green/visually-broken disease-cure, with C-SAFARI the ★★★ non-skippable
chronic. The joint 5.0.0 cut is linear (`4.2.0→4.3.0→4.4.0→5.0.0`), user-gated, and breaks exactly 3
by-name consumer asks (muster·speedtest·atlas).
