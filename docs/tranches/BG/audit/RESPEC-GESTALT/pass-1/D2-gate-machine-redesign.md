# D2 — The verification machine, from first principles

**Lens:** D2 of 32 · **Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `976dc890`
**Scope:** what SHOULD the gate machine be for a design system whose binding truth is PAINT — and what is the
consolidation map that gets it there (this is BH-B5's amended spec).

---

## Verdict

The verification machine is the single clearest artifact of the "over-contrivance + lacking elegance" critique the
user levelled. At HEAD it is **378 registered gates / 360 proof scripts / 127,269 lines of gate code** — roughly
**as much code as the library it guards** — and yet the one axis that matters, "does the page paint correctly,"
is verified by a *single* gate (`proof:ba-gestalt`) that A-gate-system already proved vacuous (frozen BC roster,
author-declared surface-paths, 20%×12% probe boxes, warm-cream-vs-grey only). The machine has inverted its own
economy: ~99% of the code proves SOURCE STRUCTURE and PAPERWORK (a token ceiling, a class present, a fork absent,
a self-test bite that a synthetic mutation reds), and the ~1% that decodes real pixels (156 `tests-visual` specs,
the `paint-arm`/`reflect-capture-verify` leaves) is `local`-only and **severed from the shipping tag**. The
duplication is industrial: **197 of 360 scripts hand-inline the same comment-strip detector; only ~8 import a
shared `scripts/lib/` leaf**. The self-test ceremony is 3,154 references — a co-equal second copy of the machine
whose only job is to prove the first copy's regexes still match a synthetic string.

This is not "add more gates." It is a *paint-first inversion*: make the gestalt capture battery the PRIMARY release
gate, demote source gates to being its **derived explainers**, collapse the 360 per-wave scripts into ~40 **family
gates over a data-driven detector kit**, and archive the ~155 pre-BA gates whose invariant has not moved in six
tranches into a single frozen-invariant regression sweep. The machine should be ~15k lines, not 127k. BH-B5 as
currently specced (manifest-extract B5b + gate-rehome B5c, with the detector-kit B5d *deferred past BH*) is the
right skeleton but **defers the one change that fixes the economy** — the detector-kit consolidation is not a
nice-to-have, it is the load-bearing move, and D2 folds it back IN with a bounded, family-gated shape.

---

## Findings (severity-ranked, file:line)

### F1 (CRITICAL) — The machine's code economy is inverted: 127k lines of gate for a paint-truth system, ~1% of which reads paint

`wc -l scripts/proof-*.mjs` = **127,269 lines** across 360 scripts (largest: `proof-animation-coherence.mjs` 1,284L,
`proof-no-gray.mjs` 949L, `proof-ba-gestalt.mjs` 906L). The paint-decoding surface is the whole of
`scripts/lib/paint-arm.mjs` (244L) + `scripts/reflect-capture-verify.mjs` (337L) + `scripts/lib/surface-closure.mjs`
(259L) = **840 lines, 0.66% of the machine**. A design system whose binding truth is pixels spends two-thirds of one
percent of its verification budget on pixels. Every other line asserts a *proxy* for paint (a token value, a class
name, a source-order rule) — proxies that A-gate-system F8/RC3 already showed miss the real defects (metallic field,
red cast, frozen route, dead previews all shipped GREEN in 4.2.0).

### F2 (CRITICAL) — 197/360 scripts duplicate the comment-strip detector; the shared-lib pattern exists but is used ~8 times

`grep -l 'blockComments|lineComments|\.replace(/\/\*' scripts/proof-*.mjs` = **197 files**. The number of scripts that
import ANY `scripts/lib/` leaf = **~8** (`fold-ledger-core`, `gl-renderer-probe`, `critical-path-walk`,
`surface-closure`, `paint-arm` — grep of `from "./lib/`). The detector kit the BH synthesis names (SYNTHESIS-PASS1.md:90,
"the 164× duplicated comment-strip") is real and larger than they logged (197). This is the single biggest elegance
defect: the same 20-line CSS-comment-strip + class-token regex is pasted 197 times, each with its own drift risk, each
carrying its own self-test bite to prove the paste still works. **This is what "poor encapsulation + lacking elegance"
looks like at the tooling layer.** BH currently DEFERS this (B5d "DEFER past BH — 164-script blast radius",
PLAN.md:100) — deferring the fix to the core disease.

### F3 (CRITICAL) — The paint layer is severed from the tag; the only pixel-reading gates are `local`-only

156 `tests-visual/*.spec.ts` exist (`ls tests-visual/*.spec.ts | wc -l`). The GATES table has **0 `pi`-tagged
entries** — `--run pi` is a runner MODE, not a tag, and is in no CI/release aggregate (`gatesFor("full")` is the
deduped union of `local ∪ ci ∪ release` tags; `pi` is none of them). 55 gates are `local`-only. So the release tag
(`--run full` on ubuntu/SwiftShader per `gates.mjs:2343`) is gated by SOURCE + the paperwork ledger
(`proof:live-verified-ledger`) + the frozen gestalt (`proof:ba-gestalt`). **"The pixels painted" is never a
precondition of the tag.** A-gate-system RC2 named this; it is the architectural root of the "headless-green /
visually-broken" chronic that recurs every tranche (BA 6 re-opened rounds, BB roster-never-grew, BD 4.2.0 shipped
broken). The `proof:ship-attestation` (gates.mjs:459, `['ci','release']`) is a *partial* fix — it recomputes a
surfaceHash of a Mac-Metal capture — but it verifies a DIGEST of an author-declared file list, not the render.

### F4 (MAJOR) — The self-test ceremony is a co-equal second machine (3,154 refs) proving the first machine's regexes still match a synthetic string

`grep -c 'selfTest|self-test|synthetic|bite'` sums to **3,154 references** across the scripts; 171 scripts carry an
explicit self-test bite, 201 mention born-RED. The born-RED + self-test-bite convention is *sound in principle* — a
gate that cannot demonstrate it flags a planted violation is a gate you cannot trust. But at 360 gates it has become
**half the machine's mass**: every per-wave gate ships a synthetic mutation corpus proving its own detector fires.
When the detector is the SAME comment-strip regex pasted 197 times (F2), the self-test is 197 near-identical proofs
that the same regex works. Consolidate the detector (F2) and the self-test collapses with it: you self-test the
*detector-kit primitive once*, and family gates declare data, not regexes, so there is nothing per-gate to self-test.

### F5 (MAJOR) — Gate lifecycle is monotonic accretion: ~155 gates predate BA and assert invariants that have not moved in 4-6 tranches, yet every one runs on every close

Gates tagged by originating tranche in their `note:` field: **AT 1 · AU 20 · AV 22 · AW 15 · AX 45 · AY 26 · AZ 25**
= **154 gates from tranches that closed ≥4 tranches ago**, plus BA 25. The machine has no archival lifecycle — a gate
minted to lock a one-time decision (e.g. `proof:nda-decided` locks a *retire* verdict that can never change;
`proof:spring-crisp` locks a *no-op* "we did not mint `--spring-crisp`"; `proof:no-dual-path`,
`proof:disposition-live`) runs in the `--run full` battery on every release forever. A gate whose invariant is a
*frozen historical decision* is not a regression sentinel; it is ceremony. `proof:spring-crisp` is the reductio: a
360th-of-the-battery gate whose entire job is to assert that a token *was not created*. The lifecycle question the
machine never answers: **once an invariant has held for N tranches with zero true-positive fires, does it get
archived into a batched frozen-invariant sweep, or keep its own script + tag + self-test?**

### F6 (MAJOR) — `proof:ba-gestalt`, the keystone PAINT gate, is a single point of vacuity (A-gate-system F1-F9, verified)

Re-verified at HEAD: `scripts/proof-ba-gestalt.mjs:70-73` still point `REFLECT_DIR/ROSTER/WAVES_DIR/TRANCHE_DIR` at
`docs/tranches/BC/...`; `ls docs/tranches/BD/audit/reflect/` is empty; the specced `BD.W-GESTALT-ROSTER-GROW` never
ran. The freshness whitelist watches ~13 author-declared style files and NOTHING in `demo/layout/`, `demo/router.ts`,
`demo/stories/SectionLanding.vue`, or `paper.css`'s `.paper-field` (A-gate-system F2). The probe is mean-L + mean-chroma
over a 20%×12% box (RC3) — a warm-cream-vs-grey test with no hue band, no chroma ceiling, no edge/clip/route check. This
is the paint machine's ONE gate and every input to it is author-self-certified and narrow. **The fix is not "harden
ba-gestalt"; it is to make the derived paint battery primary (see the redesign) so ba-gestalt is one enrolled surface
among a computed roster, not the sole oracle.**

### F7 (MAJOR) — Dead/demo-private mechanisms are gate-locked into the release close (D32, verified via P-chronic-deferred)

`proof:dock-fission`, `proof:bloom-up`, `proof:celebration-burst`, `proof:liquid-morph` are BE-era gates registered in
`gates.mjs` + `package.json`, carrying `release`, that lock mechanisms with **zero live call-sites** (P-chronic-deferred
D9: `useHaptic(`/`useCelebrationBurst(` real call-sites = 0; only a prose comment). A gate that locks a mechanism no
component consumes is over-contrivance twice: the mechanism failed the ≥2-consumer bar, AND its gate runs on every
release. These are the first archival candidates.

### F8 (MINOR) — `gates.mjs` is a 2,640-line god-file mixing a 378-row data table, prose notes, the runner, and the ship ceremony

`scripts/gates.mjs` is 2,640 lines: the `GATES` array (378 rows, each with a paragraph-long `note:`), `gatesFor()`,
`runMode()`, `runPi()`, `runShip()`, and the ship-attestation ceremony all in one module. BH-B5b already specs the
extract (table → `gates.manifest.mjs`, runner → ~300L). This is correct and low-risk (byte-identical `--list`); D2
only adds that the manifest should be the **derived** surface (F-redesign §2), not just a moved array.

---

## The machine redesigned, from first principles

### §1 — The minimal gate taxonomy (three kinds, not 378 scripts)

Every gate is exactly one of three kinds, and the kind determines where it runs and how it is authored:

| Kind | Truth it proves | Runs where | Author model |
|---|---|---|---|
| **PAINT-VERDICT** | the rendered pixels are correct (hue band, chroma ceiling, edge/clip, route-navigates, live preview) | release (on the close machine w/ browser) + local | a **roster row** (data), decoded by ONE shared paint kernel |
| **BUILD-INVARIANT** | the built artifact is well-formed (dist parses, subpaths resolve, critical-CSS byte-complete, bundle budget, dts flat) | ci + release | a **family gate** over `dist/` |
| **SOURCE-INVARIANT** | the source declares the identity correctly (warm-chroma floor, compositor-only keyframes, token-first, ≥2-consumer, no-legacy-alias) | ci + release | a **family gate** over a data-driven detector kit |

That is the whole taxonomy. There is no fourth kind. The 378 current gates collapse because ~340 are SOURCE-INVARIANT
scripts that should be **rows in a handful of family gates**, ~20 are BUILD-INVARIANT (already roughly family-shaped:
`proof:css-critical`, `profile:budget`, `proof:subpath-enumeration`, `proof:emission`), and the paint layer is one
PAINT-VERDICT family (the derived roster).

### §2 — Derived-not-hand-authored (the single most important principle the machine violates)

The recurring disease across every finding is **author self-certification**: the ba-gestalt roster is author-filled,
`surface-paths` are author-declared, the `GATES` tag set is author-assigned, the 197 detectors are author-pasted. The
redesigned machine derives each of these:

- **The paint roster's `surface-paths` are DERIVED, not declared.** For each enrolled surface (route), compute the
  transitive paint-source closure (the CSS/SFC/router files that route renders) via `scripts/lib/surface-closure.mjs`
  (which ALREADY EXISTS — `routeSeeds`/`surfaceClosure`, 259L, used by exactly one gate). A surface whose route renders
  a file outside its computed closure REDs. This mechanically closes F6's whitelist hole: `paper.css`/`AppShell.vue`/
  `SectionLanding.vue` land in the watched set because the route renders them, not because an author remembered them.
- **The detector kit is data-driven, not pasted.** ONE `scripts/lib/detect/` kit (comment-strip, class-token extract,
  CSS-var resolve, `@keyframes` walk, token-ceiling read). A SOURCE family gate is a **table of `{detector, target,
  predicate, rationale}` rows**, not a 400-line script. The detector self-tests ONCE; the rows carry no regex to
  self-test (F4 collapses).
- **The `--spring-<name>-duration` clock, the critical-CSS partition, the subpath enumeration, the ci.yml** already
  derive from generators (`regen-spring-tokens.mjs`, `critical-partition.mjs`, `proof:gen-ci-fresh`). This is the
  correct pattern — extend it: the `GATES` manifest's tag assignment should DERIVE from the kind (PAINT → local+release,
  BUILD → ci+release, SOURCE → ci+release), not be hand-assigned per row (which is how the `:5199`/`:5175` default
  drift and the `ci ⊂ local` 18-red gap happened — hand-assigned tags drift).

### §3 — The paint-first inversion (the load-bearing architectural transposition)

Today: SOURCE is primary (gates the tag), PAINT is secondary (`local`-only, severed). **Invert it.** PAINT-VERDICT
becomes the PRIMARY release gate; SOURCE-INVARIANT gates become its **explainers** — they exist to tell you WHY the
paint is wrong (which token, which class), and they are gated *behind* the paint battery, not in front of it.

Concretely:
1. The release close runs the **derived paint battery** on the close machine (which has a browser — the BD close ran
   on a Mac; `proof:ship-attestation` proves the close machine can capture Metal). The battery is the computed roster:
   every route × both modes × both engines (Chromium + WebKit, closing the Safari-parity chronic P-firstprinciples-gaps
   BG.W-SAFARI-PARITY-GATE), decoded by the ONE `paint-arm`/`reflect-capture-verify` kernel with the WIDENED predicate
   vocabulary A-gate-system BG.W-GATE-UNIFORM-BLUR names (hue band, chroma CEILING, edge-cast probe, y=0 top-bar probe,
   corner-clip probe, route-navigates DOM check).
2. **A source gate can only fail a surface the paint battery already flagged, OR assert an invariant with no paint
   proxy** (e.g. "no legacy alias exists" is a pure source fact with no pixel). This is the key inversion: you do not
   ship green on 340 source gates while the page is broken, because the page's PAINT is the gate and the source gates
   are its footnotes.
3. The anti-re-stamp bite (A-gate-system BG.W-SHIP-DISCIPLINE): a gestalt PASS that only re-stamps an existing capture
   with no corresponding paint-source diff REDs — F9's shortcut (the BD close re-shot frozen captures) becomes
   mechanically impossible.

This is not more work per close; it is the SAME captures, made PRIMARY and DERIVED instead of secondary and
self-certified.

### §4 — Gate lifecycle (the archival discipline the machine lacks)

Introduce three lifecycle states with a mechanical transition rule:

- **ACTIVE** — the gate's invariant belongs to the current or immediately-prior tranche; it runs in the full battery.
- **FROZEN** — the invariant has held for **≥3 tranches with zero true-positive fires** (mine the tranche close logs;
  a gate that never went RED-for-a-real-reason is a candidate). A FROZEN gate is MOVED into a single batched
  **`proof:frozen-invariants`** family sweep — its assertion survives (the identity is still protected) but it loses its
  own script, tag row, and self-test. The ~155 pre-BA source gates (F5) are the founding FROZEN cohort.
- **RETIRED** — the invariant locks a *historical decision that can no longer change* (`proof:nda-decided`,
  `proof:spring-crisp`, the D32 dead-mechanism gates F7). A RETIRED gate's fact moves to a doc ledger row; the gate is
  DELETED (no-legacy-alias law applies to the gate machine too). A one-time "we decided X" needs no standing sentinel.

The transition is auditable: `proof:gate-lifecycle` (a new meta-gate, replacing the ceremony of many old ones) asserts
every ACTIVE gate has fired true within its window OR carries an honest "sentinel-for-live-surface X" rationale, and
every FROZEN gate is in the batched sweep. This is the gate-machine analogue of the disposition register the library
already runs on its tokens.

### §5 — Target script count + the consolidation map

Target: **~40 gate scripts, ~15k lines** (from 360 scripts / 127k lines) — an ~8× reduction, achieved by family
consolidation + detector kit + archival, NOT by dropping coverage.

| Family gate (target) | Absorbs (representative) | Mechanism |
|---|---|---|
| `proof:paint` (PAINT-VERDICT, PRIMARY) | `ba-gestalt`, all 156 `tests-visual` specs, `black-bar`, `adaptive-glass-live`, the per-band gestalt verdicts | ONE derived roster × modes × engines, ONE `paint-arm` kernel, widened predicates |
| `proof:warm-identity` | `no-gray`, `dark-material`, `on-glass-fg`, `card-tier-alpha`, `glass-accent`, `suffuse` (source arms) | detector-kit table: OKLab-floor + warm-hue rows over token cascade |
| `proof:motion-law` | `no-layout-animation`, `animation-coherence`, `motion-one-clock`, `spring-ease`, `press-unify`, `motion-canon` | one `@keyframes`/transition corpus walk + the spring-clock derivation |
| `proof:glass-cohesion` | `glass-level`, `glass-cal`, `glass-depth`, `lensing`, `liquid-reveal`, `feedback-tone`, `menu-glass`, `surface-axis` | surface-inventory walk + the tint-seam predicate table |
| `proof:dock` | the ~15 `proof:dock-*` gates | ONE dock-invariant table |
| `proof:viz-substrate` | `gpu-substrate-single`, `webgl-substrate-single`, `canvas2d-substrate`, `offscreen-pause`, `aurora-*`, per-viz gates | substrate-compose + parity-table |
| `proof:encapsulation` | `colocation`, `no-test-in-src`, `subpath-enumeration`, `surface-axis` W1 anti-fork, ≥2-consumer bars | structural family over the dir/export tree |
| `proof:build` (BUILD-INVARIANT) | `css-critical`, `emission`, `profile:budget`, `resolution`, `verify-export-types`, `gen-ci-fresh` | already family-shaped; keep |
| `proof:meta` | `gate-manifest-sound`, `tag-parity`, `close-battery-parity`, `visual-runner`, `live-verified-ledger`, `gate-lifecycle` (new) | the gate-the-gates layer, derived tags |
| `proof:frozen-invariants` | the ~155 pre-BA FROZEN cohort (F5) | one batched sweep over the archived assertions |
| `proof:fold-ledger` / `proof:disposition-live` | keep (the no-silent-drop floor is load-bearing and already fired true — BC.W-FOLD-LEDGER) | keep |

The ~10 family gates + `proof:build` + `proof:meta` + the derived paint battery + ~15 kept singletons (the ones that
fired TRUE — see "respect what works") ≈ **40 scripts**.

### §6 — Respect what WORKS (the gates that fired true-positive get protected)

The machine is not all ceremony; the archival must not throw out the sentinels that caught real regressions. Mined
from the corpus:

- **`proof:live-verified-ledger` + the P10b.2 gate reconciliation caught 11 REAL regressions** at the BD close
  (`docs/tranches/BD/IMPLEMENTATION-PROGRESS.md:75` — morph.css/useFlowParticles god-module splits, the fourier WGSL
  `ref` reserved-keyword shader bug, the dropped `.scroll-progress` bar, the `:deep(*)` PRM trap). The ledger + the
  full-battery reconciliation is the machine's proven true-positive engine — **protect it, do not consolidate it away.**
- **`proof:fold-ledger` (BC.W-FOLD-LEDGER)** is the no-silent-drop floor that would have caught the BD 43-item
  plan-vs-cut drop had it existed one tranche earlier (P-chronic-deferred). It is derived, it fired, it stays.
- **`profile:budget` + `proof:css-critical`** caught real bundle/critical-path regressions — the BUILD family is sound.
- **The born-RED + self-test convention itself is correct** — it just needs to move from per-gate ceremony to
  per-detector-primitive (F4/§2). The convention that "a gate must demonstrate it flags a planted violation" is the
  right discipline; it should be paid ONCE per detector, not 197 times per paste.

The ceremony to prune is: the 197 pasted detectors (F2), the ~155 frozen pre-BA singletons (F5), the D32
dead-mechanism gates (F7), the no-op/decision-lock gates (`spring-crisp`, `nda-decided` — F5), and the 3,154-ref
self-test mass that consolidates with the detector kit (F4).

---

## Fold candidates (BH-B5's amended spec)

### FC1 — AMEND B5d: the detector-kit is NOT deferred; it is the load-bearing consolidation (kind: amend-wave)

**Current:** `B5d-detector-kit — DEFER past BH (164-script blast radius). Do the closed-wave gate-census subset only.`
(PLAN.md:100). **Amended:** the detector-kit is the load-bearing move (F2 — 197 pasted detectors are the core elegance
defect), NOT a deferrable. Ship it BOUNDED as **`scripts/lib/detect/`** (comment-strip, class-token, css-var-resolve,
`@keyframes`-walk, token-ceiling) with each primitive born-RED self-tested ONCE, then migrate the SOURCE-INVARIANT gates
onto family tables incrementally, each migration bite-gated (the swap preserves detection). The "164-script blast
radius" is exactly why it must be a family consolidation, not 164 individual edits — a family gate over a data table has
no blast radius. **Gestalt approach:** a SOURCE gate becomes a `{detector, target, predicate, rationale}` row in one of
the §5 family gates, not a script. **Gate:** `proof:detect-kit` self-tests each primitive; per-family migration bite
proves parity.

### FC2 — AMEND B5b: the extracted manifest is DERIVED, not just moved (kind: amend-wave)

**Current:** B5b extracts the `GATES` table → `gates.manifest.mjs`, `--list` byte-identical. **Amended:** while
extracting, make the manifest **derive its tags from the gate KIND** (§1/§2) — PAINT→local+release, BUILD→ci+release,
SOURCE→ci+release — so the hand-assigned-tag drift class (`:5199`/`:5175` defaults, `ci ⊂ local` 18-red gap) cannot
recur. The manifest row becomes `{id, cmd, kind}`; tags are computed. **Gate:** `proof:tag-parity` re-expressed as "tags
== derive(kind)"; byte-identical `--list` after the derivation.

### FC3 — NEW WAVE: the paint-first inversion (kind: new-wave)

Fold A-gate-system's five paint waves (BG.W-GATE-ROUTING-LIVE, BG.W-GATE-FIELD-AURORA, BG.W-GATE-PREVIEWS-RENDER,
BG.W-GATE-UNIFORM-BLUR, BG.W-GESTALT-ROSTER-RE-POINT) + BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION into ONE coherent
**`proof:paint` family** (§3). The roster is DERIVED (surface-closure over routes, §2), the predicates are WIDENED
(hue band + chroma ceiling + edge + top-bar + corner-clip + route-navigates), the kernel is the ONE existing
`paint-arm`/`reflect-capture-verify` leaf, both engines (Chromium + WebKit), and it is the PRIMARY release gate.
**Gestalt approach:** stop having ONE keystone gate (ba-gestalt) as a single point of vacuity; make the paint battery
the computed roster and let ba-gestalt be one enrolled surface. **This is the wave that closes the headless-green
chronic at its root.** Design arm: FABLE authors the roster's expected bands per surface (a gestalt judgement, per the
frontend-design routing directive); the mechanical fan-out wires the kernel.

### FC4 — NEW WAVE: gate lifecycle + the frozen-invariant sweep (kind: new-wave / plan-doc-edit)

Introduce `proof:gate-lifecycle` (§4) + the batched `proof:frozen-invariants` sweep. Move the ~155 pre-BA source
singletons (F5) into the frozen sweep (assertion survives, script/tag/self-test collapse). This is the archival
discipline the machine lacks — the gate-machine analogue of the token disposition register. **Gate:** every ACTIVE gate
has a true-positive-within-window OR a live-surface-sentinel rationale; every FROZEN gate is in the sweep.

### FC5 — PRUNE WAVE: retire the decision-lock + dead-mechanism gates (kind: prune-wave)

DELETE `proof:spring-crisp` (locks a no-op non-mint), `proof:nda-decided` (locks a retire verdict that cannot change),
and the D32 dead-mechanism gates `proof:dock-fission`/`proof:bloom-up`/`proof:celebration-burst`/`proof:liquid-morph`
(F7 — zero live consumers). Their historical FACTS move to a doc ledger row (the fold-ledger already holds decided
dispositions). Applying the no-legacy-alias law to the gate machine: a one-time decision needs no standing sentinel.
**Gate:** `proof:fold-ledger` records the retirement disposition; the deleted gates' `package.json` keys are gone
(`proof:gate-manifest-sound` clause-10 stays green).

### FC6 — MERGE WAVES: collapse the per-wave source gates into the §5 family map (kind: merge-waves)

The consolidation map (§5) is the executable target: `proof:warm-identity`, `proof:motion-law`,
`proof:glass-cohesion`, `proof:dock`, `proof:viz-substrate`, `proof:encapsulation`. Each family gate is a data table
over the detector kit (FC1). This is the ~360→~40 reduction. **Sequencing:** this runs INSIDE the single post-WS12
`gates.mjs` pass BH already mandates (the 5-way contention point, SYNTHESIS-PASS1.md:117) — the family consolidation IS
that pass, not a separate one. **Gate:** per-family migration bite proves each absorbed gate's detection survived.

### FC7 — PLAN-DOC-EDIT: record the machine's target economy as a standing canon

The machine currently has no stated target size or taxonomy — it accretes. Record in `docs/canon` (post-B4f, the CLAUDE
homes): the three-kind taxonomy (§1), the ~40-script / ~15k-line target, the derived-not-declared principle (§2), the
paint-first inversion (§3), and the lifecycle states (§4). Without a stated economy, the next tranche re-accretes to 500
gates. **This is the artifact that prevents the disease from recurring** — the machine needs a governing precept, the
same way the tokens have the ≥2-consumer bar.

---

## One-line summary

The verification machine is 127k lines proving proxies for paint while 840 lines read paint and never gate the tag;
invert it — DERIVED paint battery primary, ~40 family gates over a data-driven detector kit as its explainers, ~155
frozen pre-BA singletons archived, the decision-lock/dead-mechanism ceremony deleted — and fold the detector-kit BACK
INTO BH-B5 as the load-bearing move it deferred.
