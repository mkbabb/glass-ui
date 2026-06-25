# Pass-D — DEEP-CHALLENGE of the DOCK HALLMARK (the user's NORTH STAR)

**Lane** BD viz / Pass-D first-principles · **Branch** `prototype/liquid-dock` · **Method** TRACE THE CODE, not the doc. Read `src/components/custom/dock/{GlassDock.vue, constants.ts, index.ts}` + `composables/{useDockState, useDockContextSilhouette, useDockFission, dockMorphContext, useLayerTransition, index}.ts` + `scripts/{proof-dock-context, proof-dock-fission, gates}.mjs` + the union waves `BD.W-DOCK-{CONSTELLATION,GOO-SPACING,LINK-API,NOWPLAYING-PILL,SUBDOCK}.md` + `fleet2/dock-sequence-hallmark.md` + the critiques `dock-hallmark.md`/`dock-hub-generality.md`. **5-POINT BAR per claim** NECESSITY · CORRECTNESS(traced) · SOTA · NOT-OVERFIT · WORKS(paints/measures?). Zero `src/` edits.

**HEADLINE.** The dock hallmark is a CHARTER, not a wired organism. Every "one-organism" claim traces to code that either (a) doesn't compose the engines it names, (b) doesn't exist as a file, or (c) is dead code a gate greens against. The mechanisms are individually SOTA-correct (real ElementMorph FLIP, compositor-only, box-inviolate per-engine) but the INTEGRATION — the thing that makes it the hallmark — is unbuilt and its build plan is missing its first two dependency nodes.

---

## (a) The D5 gap — GlassDock composes 2 of 5 engines; the silhouette engine is DEAD; useDockLink doesn't exist

**TRACED at HEAD (`GlassDock.vue:8-27`).** GlassDock composes: `useDockState`, `useDockShellProps`, `useDockMorphWindow`, `useDockClickIntegrity`, `useGlassBackdropLuminance`, `useDockMorphOrchestrator` (dockMorphContext), `provideDockContext`. It composes **NONE** of `useDockContextSilhouette`, `useDockFission`, `useLayerTransition` (that one is composed by `DockLayerGroup.vue`, a sibling, not the dock root), and there is no `useDockLink`.

- **`useDockLink` is NOT a file.** `ls composables/useDockLink*` → no match. It is the *orchestrator* the entire W-DOCK-SEQUENCE plan names as its driver (`fleet2:§mechanism` "The orchestrator is `useDockLink`"). The hallmark's spine verb-facade is vapor.
- **`useDockContextSilhouette` is DEAD CODE.** 13 exports (`grep -nE "^export"` → 13, NOT the 1c-claimed "15"). ZERO barrel exports (absent from `index.ts`, `composables/index.ts`, `api/index.ts` — grep returns empty). ZERO runtime call-sites — the only two hits are its own `export function` (`:281`) and a doc-comment example (`:269`). It is a composable with a unit test (`tests/.../useDockContextSilhouette.test.ts` exercises only the PURE helpers `diffSilhouetteSlots`/`detachVector`) and a gate (`proof:dock-context`) — and nothing constructs it. **`proof:dock-context` is tagged `["local","ci","release"]` and greens against a composable with zero call-sites.** That is a regex-presence gate masquerading as a behavioural one — the exact systemic false-green class Pass-D was opened to find, on the hallmark surface.
- **The mechanism, where it exists, is honest.** `useDockContextSilhouette` DOES import `ElementMorph` + `springTimingFunction` from `@mkbabb/keyframes.js` (`:55-56`), DOES FLIP survivors rect→rect (`:302,368`), writes ONLY `--silhouette-fuse-t` + `transform`/`transformOrigin` (`:327`) — compositor-only, no fork. So the engine CAN deliver one-organism. It just isn't wired to anything. **NECESSITY met, CORRECTNESS of the isolated engine met, WORKS=NO (never constructed).**

**Verdict (a): the D5 "one organism on one orchestrator" charter is wired into ZERO src. The orchestrator file is missing; the silhouette engine is gate-greened dead code; the dock composes 2 of its 5 named engines.**

## (b) W-DOCK-SEQUENCE continuity — scripted timer over a missing driver; the cancelRaf snap is a real flash vector

**TRACED.** `fleet2/dock-sequence-hallmark.md:§drive-surface` admits it: *"a SCRIPTED orchestrator that walks the cycle on a timer (auto-play, the showcase loop)."* C4 codifies the sequence as "a recorded ordered verb list," and the driver is `useDockLink` — **which doesn't exist (§a).** So the continuity wave is downstream of a file that hasn't been written, walking a timer.

- **C3 is vacuously-passable.** The gate checks the five scalars (`--dock-morph-t`/`--dock-split-t`/`--silhouette-fuse-t`/`--dock-grow`/`--neck-t`) for NON-COLLISION, but the silhouette engine writes only `--silhouette-fuse-t` (`:327`) and GlassDock composes neither fission nor silhouette — so at HEAD only ~1 scalar is even driven from the dock root. A fuse-only auto-loop GREENs C3 (non-collision of scalars that aren't driven is trivially true). C3 must assert each scalar has a NON-ZERO excursion DRIVEN FROM THE COMPOSED DOCK, not just non-collision.
- **The `cancelRaf`+`clearFlips` snap is a measurable disease vector.** `setSilhouette:344-345` calls `cancelRaf(); clearFlips()` on every re-entrant trigger; `clearFlips` (`:310`) instantly clears transforms. A mid-flight re-trigger (a user re-press during a transition — the INTERACTIVE path, not the auto-loop) hard-snaps the box. C2's "same DOM node survives" assert is necessary-not-sufficient: it passes while the FLIP is cancelled and the box flashes. The π must drive the INTERACTIVE interrupt, never the auto-loop (an auto-loop never interrupts itself).

**Verdict (b): NO real continuous re-flow exists — only a planned scripted timer over a non-existent driver, and the one shipped engine's re-entrant snap flashes on interrupt. Continuity is provable-in-principle, unbuilt-in-fact, and the gate as specced greens a fuse-only loop.**

## (c) The D9 enum-demotion — PUBLISHED API + load-bearing record-key + a gate that asserts the deleted literals (precept-inversion, FATAL if unamended)

**TRACED — every leg confirmed.**

- **`DockSplitContext = "search"|"media"|"nav"` is PUBLISHED** from BOTH `index.ts:122` (`/dock` subpath) and `composables/index.ts:65`. Demoting it is a published-API clean break — NO union wave models a MIGRATION row or a `proof:subpath-enumeration`/`api` resync.
- **It is LOAD-BEARING at runtime, not just a type.** `useDockFission.ts:92` types `DOCK_SPLIT_SIGNATURES` as `Record<DockSplitContext, DockSplitSignature>` — the union is the record-completeness key (`:71` `context: DockSplitContext`). Two LIVE demo call-sites pass it: `liquid-playground.vue:180` + `DynamicIslandCall.vue:29` both `DOCK_SPLIT_SIGNATURES.media`. The demotion must keep `DOCK_SPLIT_SIGNATURES` an exported VALUE while killing the public TYPE identity — stated in `dock-hub-generality.md:H2` but carried into ZERO union wave.
- **THE FATAL COLLISION (born-RED-then-stuck-RED).** `proof:dock-context` C1 (`proof-dock-context.mjs:90-94`) string-matches the four literal kinds in the silhouette source: `/["']bar["']/ && /["']bar\+pill["']/ && /["']split["']/ && /["']search["']/`. The gate ASSERTS the very `DockSilhouetteKind` literals D9 deletes. The instant the union opens, `fourKinds=false` → C1 reds and STAYS red — and the gate is `release`-tagged. You cannot both demote the closed union (D9) and keep C1's literal-match. **No wave reconciles this.** D9's demotion wave MUST amend C1 in the SAME wave (re-point "the four literal kinds present" → "the descriptor `kind` is consumer-DATA + ≥1 preset descriptor ships") — a recorded precept-inversion, not a silent edit. There is an extra irony: C1 guards a composable with zero call-sites (§a), so the gate that blocks the demotion is itself protecting dead code.

**Verdict (c): demoting REALLY does red C1 (traced to the regex at `proof-dock-context.mjs:90-94`). The demotion is correct-in-principle but its blast radius — published API, the Record-key runtime use, 2 live demo call-sites, and the self-contradicting `release`-tagged gate — is unmodeled in every union wave. Fatal unless the gate is amended in-wave.**

## (d) Box-INVIOLATE + compositor-only — holds PER-ENGINE, ABSENT for the composed dock

**TRACED.** Per-engine the floor holds: `GlassDock.vue` writes no `inline-size`/`block-size`/`style.width|height` (grep empty); `useDockContextSilhouette` writes only transform/`--silhouette-fuse-t`; `proof-dock-fission.mjs:F6` asserts compositor-only on `fission-bridge.css`. Box-inviolate proofs exist: `proof:dock-fission`, `proof:dock-morph-family`, `proof:dock-rail-realize`, `proof:dock-search`.

**The gap:** every inviolate/CLS proof is PER-ENGINE-IN-ISOLATION. There is NO proof that the COMPOSED five-engine dock (clip-meld `--silhouette-fuse-t` over a `scale`-morphed `--dock-morph-t` box over a fission-detached `--neck-t` child) stays compositor-only on a reserved footprint — **because the composition doesn't exist (§a).** The hallmark's CLS-safety is unproven precisely where it would matter most. When INTEGRATE lands the composition, the SEQUENCE wave is the only place the five clip/transform stacks coexist; it must own a "composed paint is compositor-only on a RESERVED box, deltaW=deltaH=0" assert — none is specced.

**Verdict (d): box-inviolate holds for each shipped engine alone; it is UNPROVEN (and unprovable today) for the composed organism the hallmark IS.**

---

## VERDICT (HARDEST first)

1. **(c) FATAL & FIRST.** The D9 enum-demotion stick-REDs `proof:dock-context` C1 — the gate's regex (`proof-dock-context.mjs:90-94`) literal-matches `"bar"|"bar+pill"|"split"|"search"`, the exact `DockSilhouetteKind` members D9 deletes; `DockSplitContext` is published (`index.ts:122`+`composables/index.ts:65`), is the `Record` key (`useDockFission.ts:92`), and rides 2 live demo call-sites — a precept-inversion + published-API break + record-key blast radius that NO union wave models. The demotion wave MUST amend C1 in-wave or the `release`-tagged gate stays red.
2. **(a) The hallmark is unwired.** GlassDock composes 2 of 5 engines; `useDockLink` (the spine orchestrator) is NOT a file; `useDockContextSilhouette` is DEAD (13 exports, 0 barrels, 0 call-sites) yet `proof:dock-context` greens against it `release`-tagged — a false-green on the NORTH STAR. The "one organism on one orchestrator" charter is wired into zero src.
3. **(b) Continuity is a planned timer.** W-DOCK-SEQUENCE's driver (`useDockLink`) doesn't exist; it's an admitted auto-play SCRIPT; C3 greens a fuse-only loop (only ~1 of 5 scalars is driven); the `setSilhouette:344` `cancelRaf`+`clearFlips` snap flashes on an interactive interrupt the auto-loop never exercises.
4. **PLAN INTEGRITY.** W-DOCK-LINK-API's union wave declares `depends: W-DOCK-INTEGRATE · W-SILHOUETTE-REALIZE`, but NEITHER exists as a wave file in `union/waves/` (only CONSTELLATION/GOO-SPACING/LINK-API/NOWPLAYING-PILL/SUBDOCK) — the dock-organism dependency chain is missing its first two nodes.
5. **(d) Composed inviolate is unproven** — per-engine CLS proofs exist; the five-engine composed paint has none, because the composition is unbuilt.

**One line:** the dock mechanisms are SOTA-honest in isolation (real ElementMorph FLIP, compositor-only, box-inviolate per-engine) but the HALLMARK — the wired one-organism — is a charter over dead code, a missing orchestrator file, two missing dependency-wave specs, and a release-gate that both false-greens dead code AND self-contradicts the demotion the generality story requires.
