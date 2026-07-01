# GROUP D SYNTHESIS — First-principles redesign (the north-star group)

**Collector lens** · **Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `976dc890`
**Inputs synthesized:** D1 (ideal architecture) · D2 (gate machine) · D3 (demo gestalt) · D5 (token basis) ·
D6 (motion) · D7 (performance). *(No D4 in this group's roster.)*
**Method:** read all six lenses in full; re-verified the load-bearing/contested numbers on disk 2026-07-01
(counts cited inline). Group D is the "if you designed it today" group — its findings are architectural
transpositions, not defect tickets.

---

## 1 — GROUP VERDICT (against the user's five critique axes)

The six lenses converge on ONE meta-thesis, stated most cleanly by D1 and re-proved independently by every
other lens: **glass-ui is a world-class MATERIAL trapped in an over-articulated SKELETON.** The identity —
the warm HSL ladder, the `(response, ζ)` spring table, the `--glass-level`/`--glass-depth` geometry
composition, the six-layer glass composite, the `createCanvasLifecycle` demand-loop — is genuinely excellent
and must be protected byte-for-byte. But **every DELIVERY, VERIFICATION, and SURFACE layer wrapped around
that material encodes 3–8× the design's intrinsic complexity**, and that excess is not incidental: it *is*
the user's five critique axes made structural.

The mapping is exact and disk-verified:

- **Over-contrivance** — 360 proof gates against ~25 real ideas (14:1, D1/D2); **five** morph/reveal leaves
  that are ONE concept (D1/D6); **two** orphan mechanisms shipped with gates and zero consumers
  (`useLiquidMorph` 462L + 850L CSS, `useCelebrationBurst` 261L — both verified); a WebGPU third backend for
  a library that renders warm fields at 60fps on WebGL2 (D7).
- **Poor encapsulation** — 79 per-component subpath barrels conflating public-API grain with build-chunk
  grain (D1); **197 of 360** gate scripts hand-pasting the same comment-strip detector while 8 use a shared
  lib (D2, verified); the `:root`-frozen glass composite leaking into ≥5 inline re-spell sites (D5); a token
  basis uncountable across four consumption channels (D5).
- **Lacking elegance** — every dark identity color authored **twice** (60-token `dark-arm`∩`light-dark`
  overlap, verified) inside a "no-legacy" design language (D5); 127k lines of gate code, 0.66% of which reads
  paint (D2); the published `/styles` cascade shipping **unminified** — `dist/styles/dock.css` = 173 newlines
  of prose comments to every consumer (verified) (D7).
- **Gestalt cohesion** — the demo is a spec-sheet *inventory* (156 pages tracking component count, no
  narrative arc, compositions buried and polluted) (D3); liquid-weight-UNIVERSAL is a per-site opt-in
  allowlist, not a property of the transition vocabulary (D6); the routing frozen by four overlapping motion
  systems and frozen-still previews (D1/D3).
- **Missing obvious issues** — the ONE gate designed to bridge source→paint (`proof:ba-gestalt`) is vacuous
  (frozen BC roster, author-declared surfaces, warm-cream-vs-grey probe), so **4.2.0 shipped visibly broken
  GREEN over 360 gates** (D1/D2); the budget gate measures 155KB of comment-bloat and never notices (D7).

**The unifying prescription is a single verb: COLLAPSE.** Not "test less," not "ship less" — delete and
consolidate toward the ~25 ideas the design already holds. Every Group D fold REMOVES a mechanism (a gate
family, a morph leaf, a dark arm, a comment payload, a demo page) rather than adding a workaround. The only
two ADDs the group endorses are the two the user explicitly asked for: the Siri glass-island and a data
Chart — and even those are shaped to demonstrate the *reduced* surface grain, not feed the sprawl.

This is the mechanical, disk-grounded confirmation of the user's verdict: the last several tranches grew the
skeleton faster than the material, and the machine that was supposed to catch it grew fastest of all.

---

## 2 — DEDUPLICATED, SEVERITY-RANKED FINDINGS

The six lenses overlap heavily; the ruthless dedup below keeps the strongest statement of each distinct
defect and names every lens that saw it. Findings that change nothing downstream are dropped.

### CRITICAL

**GD-C1 — The gate machine is 127k lines proving proxies for paint, and its one paint gate is vacuous → broken ships green.**
*(D1-F1, D2-F1/F3/F6.)* 360 proof scripts / 127,269 LOC (verified `wc`), ~0.66% of which decodes real
pixels; the paint layer (156 `tests-visual` specs) is `local`-only and **severed from the release tag** (0
`pi`-tagged rows in the `gatesFor("full")` union). `proof:ba-gestalt` still points its roster consts at
`docs/tranches/BC/…`, its freshness whitelist watches ~13 author-declared files and nothing the route
actually renders, and its probe is mean-L/mean-chroma over a 20%×12% box. This is the mechanical root of the
"headless-green / visually-broken" chronic that recurs every tranche. **The single most important structural
finding in the corpus.**

**GD-C2 — 197/360 gate scripts hand-paste the comment-strip detector; the shared-lib pattern is used 8 times — and BH DEFERS the fix.**
*(D2-F2, D2-F4.)* Verified: 197 scripts inline the detector, 8 import `scripts/lib/`. The self-test ceremony
(3,154 refs) is a co-equal second machine proving the 197 pasted regexes still match a synthetic string.
BH-B5d books the detector-kit as "DEFER past BH — 164-script blast radius" — deferring the fix to the *core*
elegance disease. The blast radius is exactly why it must be a data-table family consolidation (which has no
blast radius), not 164 edits.

**GD-C3 — Five morph/reveal leaves are ONE concept; two are orphans shipped with gates and zero consumers.**
*(D1-F2, D6-F1/F2/F3.)* `useLiquidReveal` (285) + `useDockCtaReceive` (349) + `useBloomUp` (449) +
`useCelebrationBurst` (261) + `useLiquidMorph` (462) all instantiate `new ElementMorph(…)` over the identical
hand-rolled rAF `step()` loop, differing only in direction / endpoints / channel-set — all parameters, not
engines. `useLiquidReveal.ts:72` even comments the copy-paste ("kept byte-shape so the bloom family reads as
ONE"). Verified orphans: `useLiquidMorph` (462L + **850L** `liquid-morph.css`) is **not barrel-exported** —
its only references are itself and `demo/stories/manifest.ts`; `useCelebrationBurst` has zero `.vue`
consumer. ~2,000 LOC TS + ~1,000 CSS redundant or dead, ~8 gates guarding it.

**GD-C4 — Every dark identity COLOR is authored twice (60-token dual-arm duplication).**
*(D5-F1.)* Verified: `dark-arm.css` ∩ `light-dark.css` = exactly **60 tokens**, all identity colors
(`--foreground`, `--card`, the 7 `--neutral-*`, the 13 `--section-color-*`, the metal quads, the feedback
tones). `light-dark()` is Baseline-2024; the `.dark {}` color fallback is legacy scaffolding for engines the
product doesn't ship to — inside a "clean break, no aliases" language. It doubles the surface area of the
*most-retuned* family in the system (the warm ladder + dark arm move every visual tranche). The
inset-shadow-trap (MEMORY-documented) means shadows/insets legitimately need `.dark {}` — so the clean rule
is **one mechanism per token TYPE**: colors → `light-dark()` only; shadows/insets → `.dark {}` only.

### MAJOR

**GD-M1 — CSS ships UNMINIFIED; the critical-split wave optimizes 13KB on top of 155KB of comment-bloat the gate never sees.**
*(D7-F1, D7-F2.)* Verified newline asymmetry: `dist/styles/dock.css` = 173 lines of prose;
`dist/glass-ui.css` (the SFC fold) = 1 line minified. The build minifies the SFC bundle but not the
token/recipe cascade it also publishes. Critical subset as-shipped ≈177KB gz *with comments*, ≈22KB gz
comment-stripped — comments are ~87% of the weight. `BC.W-CSS-CRITICAL` built a wave + gate + manifest + a
182KB ceiling to shave a ~13KB split for the *exact same* raw-`<link>` consumer eating ~155KB of comments the
mechanism never touches. `profile:budget` is a 10×-lifted "conscious lift" ratchet measuring the bloated
number — structurally incapable of going down. **The single highest-leverage, cheapest perf fix in the
tranche** (a publish-time build-plugin edit).

**GD-M2 — Liquid-weight-UNIVERSAL is an opt-in allowlist, not architecture.**
*(D6-F4.)* `--motion-weight: 0.618` at `:root`, but weight reaches a surface only if that surface's recipe
*explicitly reads* it (~26 hand-enumerated sites). The DEFAULT interactive-transition register is
`--ease-standard` — a plain bezier, no spring, no weight, no bounce. So a bare `hover:scale` / `transition:
transform` carries zero liquid-weight, and every new surface must remember to join the allowlist. The
headline mandate — "inertia/weight/bounce on ALL motion" — is architecturally *unmet*.

**GD-M3 — The glass-tint composite is `:root`-frozen and breaks inheritance → the recipe is re-spelled ≥5 places.**
*(D5-F2.)* `--glass-bg-*` composes once at `:root` (glass.css:273-277), so a descendant overriding an input
(`--glass-opacity-*` / `--glass-tint-*`) does not re-compose the inherited bg. The fix everywhere is to
re-spell the whole `color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))` inline
— re-authored across `tokens/glass.css`, `glass/ladder.css`, `cards.css`, `dock/search.css`, the `.btn-glass`
`-tinted` mint, the `.glass-menu-row` mint. One recipe, ≥5 spell sites; a tint recalibration is an N-site
edit. CLAUDE.md re-documents this "substitution-vs-inheritance trap" per surface instead of fixing it once.

**GD-M4 — The demo is a spec-sheet inventory: page count = component count, no arc, compositions buried, and the planned restructure cements it.**
*(D3-F1/F2/F3/F5.)* 156 pages resolve to 101 distinct destinations; 8 subpaths are split across ≥2 pages
(data-table×2, timeline×3, metric×6-across-2-categories, toast×2, motion-core×4). Trivial atoms get
standalone routes (`separator.vue` 79L is a rule between two `<p>`). The category order is an inventory, not
a journey; the material identity (substrates) is buried at #2 then abandoned; motion (the entire liquid-weight
language) is #10; compositions (the only "screenshot-for-Apple" category) is dead last, thin, and 4-of-12
polluted by misfiled component demos. **Neither planned wave (WS4, BH-B3) asks the first-principles
question** — B3's per-story-dir move *cements* the 156-page count into the physical layout.

**GD-M5 — 79 subpaths conflate public-API grain with build-chunk grain (the encapsulation critique, structural).**
*(D1-F3.)* 96 exports / 79 one-line mirror barrels for a library whose ideal public grain is ~18 family
barrels. The consumer memorizes 79 names to get chunk-splitting the bundler already does per-file. This is a
BREAKING change (touches every consumer import) → a NEXT-TRANCHE seed, nameable now.

**GD-M6 — Gate lifecycle is monotonic accretion: ~155 pre-BA frozen singletons + dead-mechanism gates run every release.**
*(D2-F5, D2-F7.)* 154 gates carry `note:` tags from tranches that closed ≥4 tranches ago; the machine has no
archival lifecycle. `proof:spring-crisp` locks a *no-op non-mint*; `proof:nda-decided` locks a *retire
verdict that cannot change*; `proof:dock-fission`/`bloom-up`/`celebration-burst`/`liquid-morph` lock
mechanisms with zero live consumers — all in the `--run full` release battery forever. A one-time decision
needs no standing sentinel.

**GD-M7 — Two signature DS families + the Siri headline capability are absent.**
*(D1-F5.)* No data-Chart (the `--chart-*` tokens have no consumer), no Calendar/DatePicker, and ZERO visual
surface for the Siri glass-island + waveform the user named the BG headline (the math ships via `/motion`; no
component). The library is a glass-material showcase that is component-incomplete as a general DS. **The two
genuine ADDs.**

**GD-M8 — aurora.js sits at 98.5% of a 10×-ratcheted ceiling; the WebGPU delete is laundered by the Siri add.**
*(D7-F3, D7-F4.)* `dist/aurora.js` = 53.2KB gz against a 54KB ceiling — the dominant chunk, at the knife's
edge, with the real per-medium lazy-shader transposition perpetually booked (fenced by the byte-identical-GL
discipline; every consumer downloads four painterly mediums to use one). Meanwhile `BG.W-VIZ-DEMIGRATE`
correctly deletes ~37.7KB gz of WebGPU substrate while WS6 *adds* a Siri GL chunk under an L15 "ONE
name-agnostic budget number" re-pin — so whether the demigrate WIN survives the Siri ADD is asserted nowhere.

### MODERATE / MINOR (kept only where they change a fold)

**GD-m1 — The press concept is a 3-tier tower with two public faces** (D6-F5): `useSpring`→`useSpringPress`
→`useLiquidPress`, two public press APIs for one behavior; `useLiquidPress({squish:false})` covers Button.

**GD-m2 — The token basis is uncountable across four consumption channels** (D5-census): `var()` / Tailwind
`@theme` / Tailwind `prop-(--)` shorthand / JS `readNum`. 1069 names / 2555 declaration lines / 74 files; no
manifest answers "is this token alive." Accretion is invisible; every tranche nets tokens. ~30-50 genuinely
dead (verified: `--progress-sectioned-track`, `--tooltip-text`, `--glass-spine-blur/-opacity`,
`--phase-color-label`).

**GD-m3 — The goo/liquid-weight register is N parallel token triples, several dead** (D5-F3, D6): carousel /
deck / pager / dock / tab each mint their own `*-goo-*`/`*-max-stretch`; `--carousel-goo-*`/`--deck-goo-*`/
`--pager-worm-max-stretch` are unwired. No `--goo-*` root basis the edict can be enforced against.

**GD-m4 — Dead "honest-future" mechanisms ship in critical CSS** (D1-F7): `--cartoon-cast-dx/dy` (no writer),
`--glass-depth` lerp (2 static consumers, no host animates), `--glass-spine-*` (0 readers). "No legacy" means
a mechanism with no driver does not exist.

**GD-m5 — `gates.mjs` is a 2,640-line god-file** (D2-F8): 378-row data table + prose + runner + ship
ceremony in one module. BH-B5b already specs the extract; the note is that the manifest should be *derived*
(tags from kind), not just moved.

**GD-m6 — scroll-pin + goo-weld are single-purpose leaves that fold as modes** (D6-F7/FC6): `useScrollPin`→
`useScrollScene` mode; `useGooMorph`→`useMorphField` `edges:2` case. Pure leaf-count discipline.

**GD-m7 — fonts base64-inlined 103KB gz, un-examined tradeoff** (D7-F6): correctly off the critical path, but
uncacheable + ~33% over linked woff2 (which already ship in `dist/fonts/`). A note, not a defect.

---

## 3 — CONTRADICTIONS BETWEEN LENSES (adjudicated on disk)

**X1 — Gate target: D1 says 360→~60, D2 says 360→~40.** *Not a real contradiction — a resolution
difference.* D1 keeps ~35 "genuinely load-bearing" per-feature gates as singletons; D2 folds harder, making
each genuine bite a `{detector, target, predicate, rationale}` ROW in one of ~10 family gates over a
data-driven detector kit. **Adjudication: adopt D2's family-table target.** D2 is more rigorous — a genuine
invariant proven by a *row* is strictly more elegant than the same invariant proven by a 400-line script, and
the detector-kit (verified 197 pastes) is the mechanism that makes the row-form possible. The number is a
range (~40–60); the *shape* (family tables + detector kit + lifecycle archival, keeping the ~15 gates that
fired true-positive per D2-§6) is the executable target. D1's "protect what works" is D2-§6 restated.

**X2 — Detector-kit timing: BH-B5d DEFERS it; D2-FC1 says undo the defer; D1-FC1 makes a NEW BG.W-GATE-DRAIN.**
*These are the same program from two ends.* The drain (fewer gates, D1) is what the detector-kit (shared
primitives, D2) *enables*; you cannot collapse 360→~40 without first factoring the 197 pasted detectors.
**Adjudication: they merge into ONE sequenced wave-cluster** (GD-FOLD-1) — detector-kit → paint-first
inversion → family consolidation. The BH-B5d defer is wrong (D2 correct): it defers the core disease. The
"blast radius" argument is backwards — a family gate over a data table has no blast radius.

**X3 — Liquid-weight-default scope: D6-FC4 wants it a BG wave; D1 buckets "universal liquid-entrance" as next-tranche.**
*These are two different mechanisms conflated.* D6-FC4 is the TRANSITION-register default (spatial legs
inherit a spring-derived `linear()` by default, calm opt-out) — bounded and safe-by-construction (the
existing `--motion-weight: 0` PRM carve + `proof:no-layout-animation` already cover the whole spatial group).
D1's "universal liquid-ENTRANCE" (`v-liquid-enter` every surface opts into, Safari-verified) is broader.
**Adjudication: D6-FC4's transition-default IS BG-reachable** (a base-utility register change + a Fable sweep
of surfaces that correctly gain weight); D1's entrance-general is the next-tranche seed. No contradiction once
separated — but the Fable sweep to catch surfaces that should opt out is the load-bearing bar and must be the
wave's gate.

**X4 — Critical-CSS split: D7 says PRUNE the whole BC.W-CSS-CRITICAL machinery; D2's family map KEEPS `proof:css-critical` under `proof:build`.**
*Adjudication: D7 is right, conditionally.* After the minify (GD-M1), the split saves ~13KB on a ~35KB total
— not worth a wave + gate + manifest + two package exports. **Prune it** (clean break, no alias — the
standing directive), UNLESS a real raw-`<link>` first-paint consumer with the split is named on disk (none
found). D2's `proof:build` family absorbs any residual byte-complete assertion as a thin row. The prune is
*only unlockable by* doing the obvious minify D7-M1 names — which is itself the proof the ceremony obscured
the fix.

**X5 — Demo: D3 wants page-count REDUCTION (156→~90) before BH-B3; D1 wants demo LIVE-render; BH-B3 restructures the 156 as-is.**
*Complementary, but sequencing is load-bearing.* **Adjudication:** the order is IA-redesign (D3-C1, defines
the page SET) → live-render fill (D1: aurora-everywhere + live previews, per page) → manifest-colocate + BH-B3
dir-carve (consume the *reduced* set). BH-B3's per-story-dir move as currently specced pours concrete around
the disease; it MUST sequence after the IA redesign or it restructures the wrong 156.

*(No adjudication needed between D5/D7 — they operate on orthogonal layers, token-structure vs
publish-payload, and agree wherever they touch: e.g. both cite the demand-loop/`regen-spring-tokens` generated
single-source as the reference pattern.)*

---

## 4 — CONSOLIDATED FOLD CANDIDATES (the AMENDED-GESTALT-PLAN inputs)

Eight gestalt-level candidates, deduped across the six lenses. Cross-references name the interacting
group/lens. Every candidate REMOVES a mechanism unless it is one of the two endorsed ADDs.

### GD-FOLD-1 (new-wave cluster) — THE GATE-MACHINE TRANSPOSITION
*Merges D1-FC1, D2-FC1/FC3/FC4/FC5/FC6/FC7, D6-F6. Cross-ref: Group B `A-gate-system`.*
The paint-first inversion, sequenced as ONE coherent program (resolves X1/X2):
1. **Detector kit** `scripts/lib/detect/` (comment-strip, class-token, css-var-resolve, `@keyframes`-walk,
   token-ceiling), each primitive born-RED self-tested ONCE. Undo BH-B5d's defer.
2. **Paint-first inversion** — a DERIVED paint battery (surface-closure over routes via the existing
   `scripts/lib/surface-closure.mjs`) as the PRIMARY release gate, both engines (Chromium + WebKit — closes
   the Safari-parity chronic), widened predicates (hue band + chroma ceiling + edge-cast + top-bar +
   corner-clip + route-navigates), over the ONE `paint-arm`/`reflect-capture-verify` kernel. `ba-gestalt`
   becomes one enrolled surface, not the sole oracle. Folds A-gate-system's five paint waves.
3. **Family consolidation 360→~40** over `{detector, target, predicate, rationale}` tables (`proof:warm-
   identity`, `proof:motion-law`, `proof:glass-cohesion`, `proof:dock`, `proof:viz-substrate`,
   `proof:encapsulation`, `proof:build`, `proof:meta`) + **gate lifecycle** (ACTIVE/FROZEN/RETIRED): the ~155
   pre-BA singletons → one batched `proof:frozen-invariants` sweep.
4. **Prune** the decision-lock + dead-mechanism gates (`spring-crisp`, `nda-decided`, `dock-fission`,
   `bloom-up`, `celebration-burst`, `liquid-morph`) — facts move to the fold-ledger.
5. **Plan-doc:** record the 3-kind taxonomy + ~40-script / ~15k-line economy + derived-not-declared principle
   as a standing precept (without it the next tranche re-accretes to 500 gates).
**Bar:** the retired gates' bites are demonstrably subsumed (census table); `--run full` green over real code
with ~40 gates; born-RED against a synthetic regression the invariants must catch. Protect the true-positive
engine (`live-verified-ledger` caught 11 real BD regressions; `fold-ledger`; `profile:budget` JS ceilings).

### GD-FOLD-2 (merge-waves) — THE MOTION SPINE
*Merges D1-FC2 (motion half), D6-FC1/FC2/FC3/FC5/FC6/FC7. Cross-ref: GD-FOLD-1 step 4 (its orphan gates).*
ONE table → ONE FLIP → ONE weld → thin presets, landed as one coherent refactor (not 6 rows):
- Mint `useElementMorph(surface, {from, to, direction, channels, preset, origin})` over kf `flipShared`
  (verified imported-never-called at `suite.ts:42`); `useLiquidReveal`/`useDockCtaReceive`/`useBloomUp`
  become ~15-line named wrappers (byte-identical public API, clean-break internals).
- **RETIRE** `useLiquidMorph` (462L + 850L CSS — verified orphan) + `useCelebrationBurst` (verified zero
  `.vue` consumer; fold its petals into the `spawn` channel). Re-point the 2 demo stories.
- **Collapse** the press tower (`useSpringPress`→`useLiquidPress({squish:false})`, resolves GD-m1);
  `useScrollPin`→`useScrollScene` mode; `useGooMorph`→`useMorphField` `edges:2` (GD-m6).
- ~8 motion gates → ~2 (`proof:element-morph`); plan-doc the coverage map (4 substrates + N thin wrappers) as
  the "one-engine-N-forms" precept.
**Bar:** ONE π proves each collapse painted identically-or-better; `useLiquidMorph` DEFINITION-ABSENT; ONE
FLIP rAF loop in `src/`. Fable design arm reviews reveal/cta/bloom via DesignSync (bloom frame-series is a
gestalt judgement). **~2,000 LOC TS + ~1,000 CSS reclaimed.**

### GD-FOLD-3 (merge-waves) — THE GLASS + TOKEN BASIS
*Merges D1-FC2 (glass half), D5-FC1/FC2/FC3/FC4/FC5. Cross-ref: Group B tokens; GD-m3 (goo register).*
Two chromatic pairs + two geometry scalars + factored idioms + the single-mechanism-per-type dark arm:
- **Kill the color dual-arm** (`W-DARK-ARM-UNIFY`): delete the 60 duplicate COLOR declarations from
  `dark-arm.css`; colors resolve through `light-dark()` ONLY; `dark-arm.css` carries the shadow/inset dark arm
  only (the inset-trap exception). `proof:dark-arm-disjoint` (born-RED on the verified 60-overlap).
- **Tint composite re-composes at the element** (`W-GLASS-COMPOSITE-AT-ELEMENT`): transpose `--glass-bg-*`
  from a `:root` snapshot to an applied `@utility glass-fill`; delete the ≥5 inline re-spells.
  `proof:glass-fill-single-recipe`.
- **Collapse the glass tint axes** (5→2): drop the inert `--glass-ambient-*` (written nowhere), factor the
  re-pasted floor/squash/loud/warm-zero idioms; **demaroon the cast ink** (delete the `max(c,0.11)` chroma
  surgery — a cel ink is `--foreground` at low alpha, already warm).
- **`--goo-*` root register** (GD-m3): ONE `--goo-{flow, stretch-cap, duration}` with per-surface overrides;
  delete the dead `--carousel-goo-*`/`--deck-goo-*`/`--pager-worm-max-stretch`.
- **`W-TOKEN-MANIFEST`** (GD-m2): build-time manifest of every token → channel → alive|dead;
  `proof:token-manifest` fails on any zero-live-channel token unless allowlisted. The anti-accretion floor.
- Re-home `liquid-morph.css` (GD-FOLD-2 deletes it, but if any residual demo CSS survives, it moves off
  `src/styles/glass/`).
**Bar:** identity values byte-identical both modes (existing `no-gray`/`dark-material` π); ≤2 chromatic tint
pairs; ONE oklab-tint recipe site. Fable DesignSync the glass tiers over a busy backdrop — the moves are
zero-pixel transpositions; any drift is a finding.

### GD-FOLD-4 (new-wave) — LIQUID-WEIGHT DEFAULT (the architectural inversion)
*From D6-FC4. Resolves X3. Cross-ref: GD-FOLD-2 (shares the spring register); D1 (entrance-general → seed).*
Invert liquid-weight from opt-in allowlist to a property of the transition vocabulary: mint a default
`--transition-liquid-spatial` (spring-derived `linear()` on the per-spring clock, generated by
`regen-spring-tokens.mjs`) scoped to the SPATIAL property group; apply it at the base interactive-atom layer
so EVERY interactive surface inherits weight on its spatial legs by default; the calm register becomes an
explicit `.motion-calm` opt-out. PRM + compositor-only fall out for free (existing carves cover the spatial
group). **Bar:** Fable sweeps the storybook for surfaces that correctly gain weight and flags any that should
opt out; `proof:motion-canon`/`no-layout-animation` assert the default register is spring-derived. *(This is
the transition-default only — the universal liquid-ENTRANCE is a successor seed, GD-FOLD-8.)*

### GD-FOLD-5 (new-wave + prune-wave) — THE PERF TRANSPOSITION
*From D7-FC1/FC2/FC3/FC4/FC5. Resolves X4. Cross-ref: GD-M8 (aurora ceiling); GD-FOLD-1 (`proof:build`).*
- **`W-CSS-MINIFY`** (new-wave): extend the SFC-bundle minification to the published `dist/styles/*.css`
  partials (strip comments + collapse whitespace — the same Lightning/esbuild-css pass). `/styles` drops
  ~200KB→~35KB gz; critical subset 177KB→22KB. **The single highest-leverage, cheapest perf change** — a
  build-plugin edit, not a source rewrite. Source keeps its comments (publish-time only).
- **Prune BC.W-CSS-CRITICAL machinery** (prune-wave): after minify, delete `critical-partition.mjs`,
  `proof-css-critical.mjs`, the `./styles/critical`+`/deferred` exports (clean break — no raw-`<link>`+split
  consumer found on disk).
- **`profile:budget` measures MINIFIED bytes** (amend-wave): retire the 10-lift comment-ledger; make down-
  rebase the expected direction; keep the honest per-chunk JS ceilings.
- **Assert the NET budget drop** (amend `W-VIZ-DEMIGRATE`): a signed delta across the WebGPU delete
  (~37.7KB gz) AND the WS6 Siri GL add — not an L15 name-agnostic re-pin that launders the win (GD-M8).
- **Aurora per-medium lazy shader** — KEEP-BOOKED with the REAL trigger `dist/aurora.js gz > 54KB` (the next
  medium MUST build the split, not force an 11th lift). Converts the ratchet into a forcing function.

### GD-FOLD-6 (new-wave, Fable-designed) — THE DEMO AS DESIGNED PRODUCT
*Merges D3-C1/C2/C4/C5/C6/C7, D1-FC (demo). Resolves X5. Cross-ref: Group A `A-demo-arch` (plumbing);
A-motion (route frozen by 4 systems).*
The demo re-DESIGN that must precede the demo re-STRUCTURE:
- **`W-DEMO-IA-REDESIGN`** (Fable): narrative arc re-order (Foundations → Material → Elements → Surfaces →
  Motion → Compositions); family-page collapse (ONE data-table / timeline / metric / toast / scroll / input
  page); atom absorption (separator/pulse/status-dot/label → sections). Target ~90-100 pages from 156.
- **`proof:demo-earns-page`** (rider gate): no two story rows share a component subpath unless it's a declared
  family — born-RED on today's 8 collisions.
- **`W-COMPOSITIONS-PROMOTE`** (Fable): de-pollute the 4 misfiled component demos; add 3-4 real full-system
  scenes; surface a compositions gallery at/near the landing.
- **Substrate gallery + studios** (amend `W-VIZ-STUDIO-ADOPT`): one live-thumbnail gallery + deep studios on
  VizStudio, not 12 flat siblings (one GL context, budget preserved).
- **Live-render fill** (D1): aurora-everywhere (one shared offscreen-paused `<Aurora>` per route) + live cheap-
  DOM previews replacing frozen stills; the route transition = ONE spring-clocked Vue `<Transition>` (the
  linchpin — delete the 2 no-op VT watchers + the bloom hack that freeze routing).
- **Family-tab affordance** on the ONE surviving chassis (dogfoods `SegmentedTabs`) — the mechanism that makes
  the family collapse possible without long-scroll.
- **Sequence hard-wire:** IA-redesign → live-render → `-MANIFEST-COLOCATE` → BH-B3 δ5/δ6 (consume the reduced
  ~90-page set, removing ~50 dir moves). Plan-doc the Fable design routing per the 2026-07-01 directive.

### GD-FOLD-7 (amend-wave) — NEW FAMILIES CARRY THE FAMILY-BARREL POSTURE (the two endorsed ADDs)
*From D1-FC3/FC5, D1-F5, GD-M7. Cross-ref: GD-M5 (the re-grain seed this down-pays).*
Amend the two new-family waves so they demonstrate the reduced surface grain instead of feeding the sprawl:
- **`W-SIRI-ISLAND`** (Fable, headline): the descend/morph/retract glass-island + warm `<SiriWaveform>`,
  composing the SHIPPED FLIP (`useElementMorph` post-GD-FOLD-2) + `--glass-deep` + a NEW
  `--glass-blur-engage-t` backdrop-engage ramp + a warm `--siri-*` gradient family, bridged to the dock so the
  Dynamic-Island *is* the island docked at top. Lands on a `/focal` FAMILY barrel — NOT a 78th singleton
  subpath.
- **`W-CHART-FAMILY`** (Fable): thin SVG-path `<GlassChart>` (native-first, no charting dep) giving the
  `--chart-*` tokens their first consumer. Lands on a `/data` FAMILY barrel.
- **Dynamic-glass split** (D1-FC5): BG builds the hue-BLEED chroma term (feeds `--glass-accent`) + the
  moving/adaptive shadow (both live-π'd); the live-refraction mount (CSSWG #542) + chromatic-aberration rim
  are DEFER-with-trigger.
**Bar:** the island + chart ship under family barrels; the subpath count does NOT grow by 2 singletons; the
BH `/api`-drop is coordinated so families ARE the discovery surface.

### GD-FOLD-8 (plan-doc-edit) — SUCCESSOR-TRANCHE SEEDS (the honest long-horizon)
*From D1-FC4, D1-FC5, D5-FC6, D7-FC6. Cross-ref: GD-M5.*
Record in `AMENDED-GESTALT-PLAN.md` a "Successor-Tranche Seeds" section, each with trigger + first-move +
why-not-BG:
1. **Module-surface re-grain** (79 subpaths → ~18 family barrels; breaking; the BH `/api`-drop is the first
   move, the full re-grain the tranche after). The largest encapsulation win (GD-M5).
2. **DS-completeness tail** (Calendar/DatePicker medium; Kbd/Breadcrumb/Stepper/Tree/Menubar decide-don't-
   overfit census — the census in BG, the builds next).
3. **Full dynamic-glass terms** (live-refraction mount, chromatic-aberration rim — the frontier half of
   GD-FOLD-7).
4. **Universal liquid-ENTRANCE** (`v-liquid-enter`, the broader half of GD-FOLD-4).
5. **Safari-parity cadence maturation** (BG mints the gate in GD-FOLD-1; the cadence matures across tranches).
6. **Spacing/type ladder consolidation** (defer-honest, trigger: after GD-FOLD-3's manifest quantifies
   single-consumer composites vs shared anchors — do NOT speculatively collapse the φ-ladder, it is identity).
7. **Font-inline tradeoff** recorded as an examined KEEP (linked-woff2 is the fold if multi-page caching
   dominates; assets already ship in `dist/fonts/`).

---

## 5 — PROTECTED (the material — no BG/BH wave may re-plumb these)

Every lens independently names the same protected core, and Group D binds it as a no-churn attestation:
- The `SPRING_PRESETS` `(response, ζ)` table + `regen-spring-tokens.mjs` + per-spring `-duration` clock + the
  SPATIAL/EFFECTS split (D1, D5, D6 — the exemplar every basis should be generated toward).
- The `--glass-level`/`--glass-depth` geometry composition + the six-layer glass composite + the
  `.glass-capsule` body unification (D1, D5).
- `createCanvasLifecycle.ts` — the one realized transposition; offscreen-park/suspend-Set/PRM discipline, all
  three backends compose it, claims hold on disk (D7-F5 — the template the CSS/budget re-shapes model on).
- The warm HSL identity values, per-tier alpha ladder, dark `--primary` legendre-violet, the `in srgb`
  surface-tint fence, the 13-stop section ramp, the metal quads, the φ radius/spacing/type constants (D5).
- The 76-entry per-subpath JS split + the per-route 1-GL-context budget (D7).
- The token-home rule + the ≥2-consumer bar as LAWS (only their 360-gate enforcement drains) (D1, D2).

The redesign is entirely STRUCTURAL — mechanism, recipe-site, mode-arm, gate-form, publish-payload, page-set.
Every identity value stays byte-identical. The north star, in one line: **delete and collapse toward the ~25
ideas the design already has; add only the Siri island and the Chart the user asked for; make the demo render
and the gate read pixels — and do not add a single mechanism a simpler transposition of an existing one can
serve.**
