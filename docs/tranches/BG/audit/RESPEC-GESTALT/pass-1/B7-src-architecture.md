# B7 — src/ ARCHITECTURE quality (RESPEC-GESTALT pass-1)

**Lens:** god-module census · indirection depth · surviving duplicate mechanisms · colocation coherence.
**Verified on disk 2026-07-01, HEAD `976dc890` (tranche/BG), base v4.2.0. All counts re-run live.**

## Verdict

The src/ tree is **structurally regressing under its own gate**. The no-god-module ratchet — advertised as "drained to ∅ twice" (BB.W-CARVE4/5) — has **fully regrown to 18 files over 500 lines**, and the gate is **RED at HEAD**: `styles/glass/ladder.css` (527) and `styles/dock/shell.css` (510) crossed the bound *during BG* with no ratchet BOOK (`node scripts/proof-no-god-module.mjs` → `status: FAIL`). The ratchet is not a discipline, it is a treadmill: every liquid-glass/viz capability wave re-inflates it, a carve wave drains it, repeat. That is the user's "over-contrivance + poor encapsulation" critique made mechanical.

Beneath the line-count symptom sit three real architecture defects the gate cannot see: (1) the `composables/motion/` barrel has become a **44-file graveyard** of exported-but-unconsumed `liquid-*`/`morph-*` primitives (one fully dead — `useCelebrationBurst`), shielded by the overfitting-audit's "OR is exported" escape hatch; (2) the press abstraction is a **gate-induced dual path** — `useLiquidPress` was built to factor the press pattern once, then `proof:button-glass` forbids Button (its natural #1 consumer) from using it, so Button re-inlines the identical composition and `useLiquidPress` is left with a single real consumer; (3) **pointer-physics is implemented 5 ways** despite `usePointerVelocityField` being minted "the ONE" — CLAUDE.md openly books the aurora/blob fold as a "successor IFF byte-faithful" that never happens. None of these are line-count problems; they are the "N locally-correct patches, not ONE designed system" pathology.

The good news: BH's B2 band already owns the *mechanical* carves (CarouselContent/PagerDots/useBloomUp SFC→composable, the /api fold, the shader exemption). This lens's value is the **quality** deltas BH's list misses — the live-red CSS violators, the dead-primitive prune, the dual-path collapse, the pointer-field consolidation — folded so they don't double-claim BH's carve targets.

---

## Findings (severity-ranked)

### F1 — CRITICAL: no-god-module gate is RED at HEAD; the ratchet fully regrew to 18

`node scripts/proof-no-god-module.mjs` → **`status: FAIL`**, two unbooked violations:
- `src/styles/glass/ladder.css` — **527** (was 489 at v4.2.0; grew **+38** during BG, crossed 500, no BOOK).
- `src/styles/dock/shell.css` — **510** (was 498 at v4.2.0; grew **+12**, crossed 500, no BOOK).

Total files >500 (incl. `.css`, which the gate scans per AY.W-CSS1): **18** (16 grandfathered + 2 live violations). Biggest is `styles/glass/liquid-morph.css` at **850**. The ratchet header (`scripts/proof-no-god-module.mjs:48-88`) narrates the drain-to-∅ at BB.W-CARVE4, the re-grow, the re-drain at CARVE5, then the BD.W-CUT re-grow of "19 files" — i.e. the file *documents its own treadmill*. This is not the ratchet failing to hold; it is the ratchet being the wrong mechanism for a system whose every feature wave legitimately grows a shader/CSS/composable.

Two **stale grandfather baselines** additionally inflate slack (the file is under its frozen row, so the ratchet carries more headroom than the file needs — silent refill room):
- `styles/tokens/property-regs.css` baseline **566**, actual **548** (`proof-no-god-module.mjs:130`).
- `composables/glass/useGlassBackdropLuminance.ts` baseline **542**, actual **534** (`:141`).

The header at `scripts/proof-no-god-module.mjs:16-20` claims "a row that shrinks below its baseline reds (the gate's stale-row guard)" — the live run proves this is **false**: 548<566 and 534<542 both report `grandfathered`, not RED. Doc-contradicts-disk finding.

### F2 — MAJOR: `composables/motion/` is a 44-file barrel of exported-but-unconsumed primitives

`ls composables/motion/*.ts composables/motion/core/*.ts` → **44 files**. Precise JS-importer census (excluding self, barrels, api, demo):

| Primitive | src JS importers | demo files | Status |
|---|---|---|---|
| `useCelebrationBurst` | **0** | **0** | fully DEAD; exported at `motion/index.ts:70` |
| `useLiquidMorph` | 0 | 1 | dead in src; aggregates SpringProgress+useLiquidFlex+useDragMorph+useLiquidReveal |
| `useScrollPin` | 0 | 1 | dead in src (only CSS string-matches) |
| `useScrollScene` | 1 (`useScrollPin` — itself dead) | — | reached only through a dead file |
| `useLiquidReveal` | 1 (`useLiquidMorph` — dead) | 3 | reachable in src only via the dead aggregator |
| `useDockCtaReceive` | 0 | 2 | demo-only; exported at `motion/index.ts:51` |

`useCelebrationBurst` is the smoking gun: **zero src consumers, zero demo consumers, still exported** (`composables/motion/index.ts:62,70`). It survives the overfitting audit purely on the precept's "OR is exported" clause (MEMORY: overfitting-audit — "≥2 sites OR is exported OR private demo helper"). That escape hatch is precisely what lets speculative liquid-* axes accumulate — the user's "speculative axes / single-consumer primitives / over-contrivance" verbatim. A public barrel is not evidence of consumption; it is the *absence* of it dressed as API.

### F3 — MAJOR: the press abstraction is a gate-induced dual path (`no-dual-path` blind spot)

`useLiquidPress` (`composables/motion/useLiquidPress.ts`) exists to "factor the press pattern ONCE" (CLAUDE.md W-PRESS-UNIFY) — it composes `useSpringPress` + `useLiquidFlex` + `writeVelocityWeight` (`:49-51`). Its intended #1 consumer, Button, is **forbidden** from using it: CLAUDE.md records "Button kept on `useSpringPress` DIRECTLY so `proof:button-glass`'s B2 direct-composition assert stays green." So `Button.vue:8-9` re-inlines the exact pair (`useSpringPress` + `useLiquidFlex`) that `useLiquidPress` wraps. Net effect:
- `useLiquidPress` real consumers: **Card.vue only** (the other grep hits are `--*-press-t` CSS token strings).
- The wrapper and its hand-rolled twin **coexist** — a genuine dual path that `proof:no-dual-path` never catches because the two halves straddle the gate boundary.
- **Indirection asymmetry:** Button reaches the physics in 3 hops (`Button → useSpringPress → useSpring → SpringProgress`); Card reaches the *same* physics in 4 (`Card → useLiquidPress → useSpringPress → …`). Two depths for one behavior, dictated by a gate assertion, not a seam. This is "a hop that exists only to satisfy a gate rather than a real seam," inverted: an abstraction whose own consumer is gate-barred from it.

### F4 — MAJOR: pointer-physics is implemented 5 ways; the "ONE field" is aspirational

`usePointerVelocityField` (289L, `composables/motion/`) was minted (BB.B4) as "the procedural-viz family's ONE pointer-dynamics reader." At HEAD the duplication is intact:
- `usePointerVelocityField.ts` (289L) — position/velocity/accel/burst, push-`tick()`.
- `components/custom/aurora/composables/cursorModel.ts` (126L) — aurora's own `advanceCursor`.
- `components/custom/goo-blob/composables/useBlobPointer.ts` (261L) — goo's SpringProgress-driven pointer.
- `composables/dom/useDragVelocity.ts` (224L) — a fourth velocity sampler; **single consumer** `Slider.vue`.
- kf `Draggable`'s velocity-windowed buffer — the fifth, reached via `useDragMorph`.

CLAUDE.md itself concedes the fold never happened: "The aurora/blob pointer models (cursorModel.ts/useBlobPointer.ts) are NOT re-pointed (a fold onto the shared field is a booked successor IFF byte-faithful)." So the primitive was minted to satisfy a ≥2-consumer bar with *future* viz, while the two obvious real consumers (aurora, blob) keep their forks. `usePointerVelocityField`'s actual binary consumers are the new WGPU viz (flow-field/concentric) — legitimate — but the *system* still samples pointer velocity five different ways. That is the anti-gestalt: one concept, five mechanisms.

### F5 — MINOR→MAJOR: `dock/composables/` is an 18-file god-directory; 3 of 18 god-modules are dock

`components/custom/dock/composables/` has **18 files** (next largest: aurora 14, goo-blob 9). It carries **four** near-parallel context/morph files — `dockContext.ts` (65) · `dockLayerContext.ts` (53) · `dockMorphContext.ts` (302) · `dockMorphMeasure.ts` (188) — plus the three dock god-modules: `GlassDock.vue` (711), `useDockFission.ts` (604), `useDockContextSilhouette.ts` (551). The dock is the single most complex subsystem and its carve is deferred in BH to **B2.5 "leaf-verify only, ZERO BH carve"** (SYNTHESIS-PASS3:82). So the largest structural debt in src/ is currently owned by *nobody* — BG grows it (WS2 rewrites DOCK_SPRING), BH only verifies it. This is a coverage seam, not just a size problem.

### F6 — MINOR: residual colocation arbitrariness + the /api god-module is a pure gate artifact

Colocation is *mostly* coherent (component-local `composables/` under each feature dir), but:
- `useDragVelocity.ts` lives in `composables/dom/` while `usePointerVelocityField.ts` lives in `composables/motion/` — two pointer-velocity samplers, two subtrees, no principle distinguishing them (both are "read pointer, derive velocity").
- `api/index.ts` (505L) + `api/types-extra.ts` (349L): the split exists **only** to dodge the 500-line bound (lane-gamma-src.md:68 — "split off to dodge the 500-L god-module bound — itself an artifact of the no-god-module ratchet"). BH B2.2 folds the whole `/api` surface, which dissolves both files. Correctly owned by BH; noted here as the canonical example of the ratchet *manufacturing* indirection.

---

## FOLD CANDIDATES

Aligned to BH bands; none double-claims a BH carve target (CarouselContent/PagerDots/useBloomUp = B2.4a; dock leaf-verify = B2.5; /api fold = B2.2).

### FC-1 — amend-wave (BH B2 / BG close): book + carve the two live-RED CSS violators
`ladder.css` (527) and `shell.css` (510) grew unbooked during BG — the gate is FAIL *now*. Gestalt transposition, not a line-shuffle: `ladder.css` already spawned `glass/rim.css` at BB.W-CARVE4; the +38 BG growth is the W55 bright-bucket + calm-tier re-point group — carve the **adaptive-legibility `@container` block** into a sibling `glass/adaptive.css` (@import immediately after ladder.css, cascade-order-invariant, the rim.css precedent). `shell.css`'s +12 is dock-plate-clearance — fold into the existing `dock/density.css`. Either way, **add both to `RATCHET_BASELINES` with a BOOK marker in the SAME wave that grows them** so the gate never sits red mid-tranche again. Also correct the two stale baselines (property-regs 566→548, useGlassBackdropLuminance 542→534) — a stale higher baseline is silent refill room.

### FC-2 — plan-doc-edit (precepts / overfitting-audit) + amend BH B4d: kill the "OR is exported" escape hatch
The overfitting precept's `≥2 sites OR is exported OR private demo helper` is the loophole that let `useCelebrationBurst` (0/0), `useLiquidMorph`, `useScrollPin/Scene`, `useDockCtaReceive` accrete as dead public API. Transposition: a public barrel export is **not** consumption evidence — require **≥2 real binary consumers OR an honest booked trigger with a named future consumer** (the presets-in-consumers discipline already applied to tokens, applied to primitives). BH B4d already adds `proof:consumer-evidence-live`; extend its scope from `docs/consumer-evidence/*` files to the **motion/ public barrel** — every exported `use*` names ≥2 live consumers or a dated booking, else it reds. (Note: precepts/ is a submodule — author via cross-repo ask per BH B4c discipline.)

### FC-3 — new-wave (prune, CONCURRENT with BH B2.4a): the motion/ dead-primitive sweep
Retire, clean-break (MEMORY: no-backwards-compat): `useCelebrationBurst` (fully dead), `useScrollPin` + `useScrollScene` (dead chain), and re-audit `useLiquidMorph`/`useLiquidReveal`/`useDockCtaReceive` against FC-2's revised bar. Where a demo is the *only* consumer (`useDockCtaReceive`, `useLiquidMorph`), either demote to a demo-local helper or delete with the demo. Target: `composables/motion/` from 44 files toward ~30 by removing the speculative liquid-* tail. This is disjoint from B2.4a (which *adds* carved leaves) — sequence them so the dead sweep runs first (fewer files to carve).

### FC-4 — merge-waves / amend proof:button-glass (BH B2 or a BG press wave): collapse the press dual path
KISS transposition: **retire `useLiquidPress`**; keep Card on the *identical* direct `useSpringPress` + `useLiquidFlex` composition Button already uses (byte-behaviour-identical, one press idiom, zero wrapper). This dissolves F3's dual path at the source and removes an indirection hop from Card. If instead the wrapper is kept, amend `proof:button-glass` B2 to assert Button composes press *through* `useLiquidPress` — but the clean-break direction (delete the wrapper) is the more elegant, fewer-primitives answer the user is asking for. Either way, `no-dual-path` gains a clause that the press composition has exactly one home.

### FC-5 — new-wave (BH viz-substrate band / BG WS5-adjacent): make the pointer-field fold REAL
Discharge the CLAUDE.md "booked successor IFF byte-faithful" for pointer physics: fold `cursorModel.ts` + `useBlobPointer.ts` + `useDragVelocity.ts` onto `usePointerVelocityField` (or a thin shared core it exposes), byte-faithful π per surface. This is the honest completion of the "ONE field" claim; it also drains the aurora (14) and goo (9) composable dirs. Guard: verify byte-faithful aurora/blob pointer response before folding (the reason it was booked, not done). If genuinely not byte-faithful, **defer-honest** with a dated trigger rather than leaving the "ONE" claim standing over five forks.

### FC-6 — amend-wave (BH B2, land the shader exemption): stop counting shader literals as god-modules
BH SYNTHESIS names the "shader-literal exemption" (metaball.wgsl/frag, flow-field.glsl — single GLSL/WGSL strings, data not logic) as the key insight (lane-gamma-src.md:212) but at HEAD they are still 3 ratchet rows. Land the `*.{wgsl,glsl,frag,vert}.ts` exemption in the no-god-module gate — removes 3 phantom rows and stops BH "splitting" a cohesive shader into incoherent fragments. This shrinks the god-module count from 18 to 15 honestly and reframes the ratchet as *logic-only*, which is the correct scope.

### FC-7 — plan-doc-edit (BH B2.5 → real carve, or BG WS2 amendment): give the dock god-directory an owner
The three dock god-modules (GlassDock 711, useDockFission 604, useDockContextSilhouette 551) + the 4-file context/morph cluster are BH-verify-only and BG-grow-only — no wave carves them. Assign the dock carve explicitly: fold `dockContext`/`dockLayerContext`/`dockMorphContext`/`dockMorphMeasure` into a coherent `dockMorph/` sub-tree with one public seam, and split `GlassDock.vue`'s template-vs-orchestration the way SegmentedTabs was split. Sequence after BG WS2 (which owns DOCK_SPRING). Do NOT leave it as leaf-verify — the largest debt needs an owner.
