# AX.W01 — Dock single-scalar morph: one spring, one clock, the whole box

**Band** A · DOCK · **Severity** blocker · **dependsOn** AX.W00

---

## State

**Name**: W01 - Dock single-scalar morph: one spring, one clock, the whole box
**Opens after**: AX.W00 (the π visual-runtime lane stands up first; its deterministic-drive design for `proof:dock-animation-live` is the precondition this wave's gate consumes)
**Agents**: 3 (1 implement · 1 adversarial-verify read-only · 1 gate-author) — within the ≤6 implementation / ≤7 read-only ceiling; the implement + gate-author units serialize on the shared dock files (§Disjointness), the verify lane is read-only-parallel
**Hard gate**: born-RED → GREEN `proof:dock-animation-live` (fail-CLOSED, DEFAULT engine, root-box-vs-inner-content lead/lag ≤ 1 frame) + `proof:vt-names` route-morph-seam preservation + the MANDATORY live Playwright + frontend-design visual-truth audit (reads as one continuous iOS spring; fourier two-dock co-mount renders both route-morphs)
**Status**: planned

### Born-RED witness (falsifiable, at HEAD `eaba94f`)

The gate must FAIL before the wave. Three concrete RED witnesses at HEAD:

1. **The morph desyncs on the DEFAULT engine and the gate cannot see it.** `proof:dock-animation-live` (`scripts/proof-dock-animation-live.mjs`) samples ONLY `.dock-layers` width + active-layer opacity (the inner pair) — it never samples the `.glass-dock` ROOT padding-inline / border-radius / bounding-width, so the user-visible "box shrinks first, items lag a frame" defect (slice 0 F0, slice 1 F0, slice 5 F0) ships GREEN today. The deterministic-drive π-lane re-author (per AX.W00) sampling the root-box geometry against a representative child on the SAME rAF timeline FAILS at HEAD because the root box leads the inner content by ~16ms (the `nextTick→rAF→void offsetWidth` deferral at `useLayerTransition.ts:340,344,360` pushes the inner-width spring one frame behind the always-synchronous root CSS transition at `dock.css:326-340`).

2. **The gate fail-OPENs.** `proof-dock-animation-live.mjs:544-559` exits SKIPPED with `process.exit(0)` when no Playwright harness is present — a green CI line over an unrun probe. The π-lane promotion (AX.W00) makes the no-harness path fail-CLOSED; the same gate run against HEAD then RED-fails on witness 1.

3. **The dock morph runs on TWO+ clocks on the engine most users hit.** At HEAD `GlassDock.vue:191` mints `glass-dock-${useId()}` and `useLayerTransition.ts:280` applies `view-transition-name` to the inner `.dock-layers` element only; the root box morphs on its own CSS-transition clock (`dock.css:326-340`). The fourier consumer's two co-mounted docks (CanvasControlsDock + EditorControlsDock) both mint `glass-dock-1` → the duplicate name silently DROPS the morph snapshot + reds ~13 e2e specs — the live, file-cited reproduction that VT is the wrong primitive for a layout morph (constellation slice 12 F1; §4 note 23).

---

## Goal

Collapse the dock collapse↔expand morph onto ONE analytic spring whose single normalized scalar (`--dock-morph-t`, 0→1) is written once per frame to the `.glass-dock` root and drives EVERY animated axis — box size, padding, border-radius, scale, background/border color, AND the child stagger — so the whole box and its contents move on one clock, identically on every engine, with the View-Transitions COLLAPSE fork retired and the route-morph `view-transition-name` seam preserved.

---

## Scope

The gestalt fix from slice 0 F0/F1/F2 + slice 1 F0/F1/F5 + slice 5 F0/F1 — one driver, one clock, no per-engine personality fork, no legacy accretion. No workaround, no compatibility bridge, no second codepath.

1. **One scalar owns the whole box.** Drive the morph from a single normalized analytic-spring progress scalar (0→1) written once per frame to a CSS custom property on the `.glass-dock` root (`--dock-morph-t`). Express EVERY animated axis — width/inline-size, padding, border-radius, scale, background/border color, AND the child stagger — as pure `calc()`/interpolation off that one scalar. The AW.W3 child stagger already proves the pattern with `--dock-morph-progress`; this generalizes it to the whole box.

2. **No CSS `transition` on the root morph properties.** DELETE the root CSS transition list at `dock.css:326-340` (padding/scale/border-radius on `--dock-motion-resize`, background/border-color on `--dock-motion-standard`) as morph drivers — they become `calc()` reads off `--dock-morph-t`. This removes the second `--dock-motion-standard` curve (background/border was on `--duration-normal` cubic, a different duration AND curve than everything else — slice 0 F0 clock #3) and the `nextTick→rAF→void offsetWidth` deferral skew (everything starts the same frame).

3. **RETIRE the View-Transitions COLLAPSE fork entirely.** VT crossfades rasterized PIXELS — the wrong primitive for a layout morph, and the source of the uncaptured-animating-ancestor desync (slice 0 F1, slice 1 F0/F5, slice 5 F0). Delete the `NATIVE_VT` branch (`useLayerTransition.ts:108,262-288`), the asymmetric VT curve fork (`view-transition.css:76-86` — `dock-expand → --spring-dock@0.3s` vs `dock-collapse → --spring-snappy@0.2s`), and the dead-on-VT `armStagger`/`setStaggerProgress` gating. The single live `SpringProgress` ODE then runs on EVERY engine — iOS interruptible physics + velocity-continuity retarget (`useLayerTransition.ts:311-332`, currently FLIP-only) for free, universally.

4. **PRESERVE the route-morph `view-transition-name` seam.** Per the W00 wave-open ritual, the dock-COLLAPSE VT and the consumer ROUTE-MORPH VT are SEPARABLE concerns the prior charter conflated. W01 retires the COLLAPSE fork while PRESERVING the per-instance `glass-dock-${useId()}` named-element seam (`GlassDock.vue:191`) that fourier's J+K critical path route-morphs through — and the `proof:vt-names` gate that polices its app-unique mint-source (invariant η). The name stays on the root for the consumer's PAGE/route geometry-morph; it is no longer the dock's OWN collapse mechanism. **RATIFY-BEFORE-IMPL** — live re-diagnose (per W00) that the COLLAPSE VT and the ROUTE-MORPH VT are genuinely separable on the real device before deleting; the recommended path keeps the name + `proof:vt-names`. If the live re-diagnosis finds the name truly must die, an inv-16'-style cross-repo annex coordinates fourier's K.W1 + e2e onto the replacement with a born-RED fourier-side gate (do NOT remove the seam unilaterally).

5. **Keep the clip-reveal aperture as the sole reveal model.** Content laid out once at natural size; the single spring grows the box; `overflow:clip` on the morph axis makes the box the aperture; the spring-keyed stagger fades children in-step as the aperture uncovers them (slice 1 F5). Drop the VT-snapshot crossfade reveal entirely — the two reveal models were incompatible stapled together.

6. **Re-derive `useLayerTransition` from first principles (479 → ~130 lines).** The regression is pure accretion (e8380d7 was a correct 135-line single-clock impl; AQ.W6 VT fork → AU.W8 single-frame rAF → AV.W9 dual-driver excision → AW.W2 clip-reveal → AW.W3 stagger each bolted a coordination layer onto the prior layer's seam). Re-derive as ONE small composable: measure to-size once, drive one `SpringProgress` from-size→to-size, expose normalized progress as the `--dock-morph-t` CSS var; everything else is declarative CSS keyed off it with ZERO additional JS lifecycle. Velocity-continuity (retarget) is the one piece of genuine iOS value — keep it. Delete the `will-change` micro-lifecycle (static hint on `[data-morphing]` in CSS) and the `--spring-dock` baked-linear / `DOCK_SPRING` hand-mirror for the morph (the live ODE is the single authority; the "A retune MUST touch BOTH" drift warning disappears).

7. **EXPOSE the rebuilt single-scalar `useLayerTransition` on the `/dock` subpath barrel.** Add `export { useLayerTransition } from "./composables"` to `src/components/custom/dock/index.ts` so value.js DELETES its local FLIP-width fork (`value.js demo/@/components/custom/dock/composables/useLayerTransition.ts` — the EXACT box-leads-content algorithm; the fork exists ONLY because the barrel never re-exported the primitive — constellation slice 10 F0; substrate-with-consumer). The consumer-adoption leg (value.js deletes the fork + re-points `ActionBarLayer.vue`) routes to AX.W34.

8. **COMPOSE with the published `(0.32, 0.7)` `--spring-dock`.** The single-scalar morph must compose with the published `(0.32,0.7)` curve (sampled ramp peak ~+4.6%, the keyframes.js system-dock baseline ORACLE — §4 note 23) with NO re-bounce. The retune of the single spring (if any) is a W05 concern (the governed dock register); W01 keeps the published curve as the morph's spring constant. The `--spring-dock` token MAY survive only for non-morph decorative transitions if any remain; for the morph it is the SpringProgress constant, not a parallel baked curve.

---

## SOTA deepening (liquid-glass research)

The iOS-26 Liquid-Glass corpus (`docs/tranches/AX/research/liquidglass-synthesis.md` + the 32-facet corpus) UNANIMOUSLY ratifies W01's single-scalar/one-clock thesis and the retire-VT-for-the-collapse decision — every facet that touches the dock independently re-derives this architecture (facets 1, 2, 7, 14, 16, 17, 26, 27, 28, 29, 30). The corpus is the direct web transposition of Apple's `glassEffect` + `withAnimation(.bouncy)`-one-clock pattern. Concrete deepenings to fold into the §Scope:

1. **`--dock-morph-t` MUST be `@property`-registered** `{ syntax:"<number>"; inherits:false; initial-value:0 }` (facets 27, 30). An UNREGISTERED custom property animates **discretely** (jumps, no tween) and on the main thread; a registered `<number>` interpolates composited. `inherits:false` is also the **inheritance-bomb guard** — writing the scalar to `:root` or any inherited var forces a whole-subtree style recalc every frame (a cited production case measured 8ms/frame over 1300 elements, facet 30). Write the scalar LOCALLY on the `.glass-dock` root, never `:root`.

2. **Drive the MATERIAL off the same scalar, not just geometry** (facets 2, 14, 17, 21). Apple's "the material thickens when it flexes larger" (deeper shadow, more pronounced lensing, softer light scatter — WWDC25 §219) becomes a free fold: the radius axis, `--shadow-dock-wrap` (W04), and the `--glass-specular-intensity-*` ladder (W09) all read `calc(… * var(--dock-morph-t))` so the surface reads THICKER as it expands. This is why W01 couples to W04/W09, not sequences before them — though W01 KEEPS its own §FileBounds (the material reads happen in those waves' files, off the scalar W01 mints).

3. **Velocity-continuity retarget is the ONE load-bearing iOS-feel piece** (facets 14, 15, 17, 26, 28). A re-toggle mid-flight re-seats the live `SpringProgress` from `(value, velocity)` — the thing CSS `linear()`/`transition` springs and VT fundamentally CANNOT do (the spec's reversing-shortening-factor discards inertia; a 1600ms spring re-runs at 400ms). Preserve the AV.W9.2 retarget through the 479→~130 rewrite; it is the interruptibility Emil Kowalski/Family.co demand.

4. **Audit-feasibility (load-bearing for the gate).** The W01 box morph drives D-tier (`inline-size`, `padding`) and C-tier (`border-radius`, `background`, `border-color`, `box-shadow`) per frame — the EXPENSIVE corner of the 16.67ms budget (facet 30: S-tier transform/opacity/clip-path off the main thread, D-tier layout-recalc-per-frame). Acceptable ONLY because the clip-reveal aperture makes it paint-bounded (content laid out once, box-as-window) not reflow-per-frame; audit which axes can move to S-tier `transform`/`clip-path` and keep the morphing subtree small. And the gate CANNOT poll `getBoundingClientRect` — keyframes device-proved 181 rAF rect samples captured NO morph because VT runs off the live box clock (facets 17, 24, 26, 28); the gate must deterministically drive the readable spring arm and assert box-geometry vs a child's opacity onset on ONE rAF timeline (already the §HardGate.1 design).

5. **VT-is-wrong-for-layout-morph, confirmed from every angle** (facets 1, 6, 12, 14, 16, 17, 26, 28, 30). VT crossfades RASTERIZED snapshots — a 150×150 morphing to 600×300 becomes "taffy"-stretch + text-blur; an animating ancestor desyncs; co-mounted docks minting `glass-dock-1` DROP the snapshot. The corpus preserves the SEPARABLE per-instance `view-transition-name` route-morph seam (the web `glassEffectID` for genuinely-different DOM / route morphs) exactly as §Scope.4 states. The matched-geometry seam stays BIFURCATED: spring+FLIP for self-reshape, VT for shared-element/route.

6. **The squircle profile rides the morph clock** (facets 0, 11, 24). `corner-shape: superellipse()`/`squircle` (Chrome 139+) interpolating on the scalar is the literal iOS continuous-corner curve — `@supports`-gated over `border-radius` round (the arc is the CONTRACT, the squircle is the BETTER tier). Already shipped in glass.css/dock.css; ensure the radius axis reads `--dock-morph-t` through it.

7. **Do NOT reintroduce `interpolate-size`/`calc-size` on the morph axis.** The corpus is firm (facets 7, 8, 14, 17, 24, 26): AV.W9.0 retired exactly this because it second-drove width against the spring and FROZE the dock (born-RED under `proof:dock-animation-live`). It is Chromium-129+-only, NOT Baseline, and viable only as a one-time MEASUREMENT primitive read once — never a co-driver on the spring's axis. One authority per property, always.

---

## FileBounds

| File | Access |
|---|---|
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify (re-derive 479 → ~130 lines; delete the `NATIVE_VT` fork) |
| `src/components/custom/dock/GlassDock.vue` | modify (remove the collapse `startViewTransition` call + the `.dock-layers`-only VT-name application; PRESERVE the `glass-dock-${useId()}` root route-morph name) |
| `src/components/custom/dock/index.ts` | modify (add `export { useLayerTransition } from "./composables"`) |
| `src/components/custom/dock/composables/index.ts` | modify (ensure `useLayerTransition` is re-exported so the barrel reach resolves) |
| `src/styles/dock.css` | modify (delete the `:326-340` root CSS-transition morph drivers; re-express the morphing axes as `calc()` reads off `--dock-morph-t`; KEEP the file unsplit — the dock.css→partials split is W06, LAST in the band) |
| `src/styles/view-transition.css` | modify-carve (delete the `:59-86` dock VT-group recipe + the `:76-86` asymmetric dock-expand/dock-collapse curve fork; KEEP any non-dock VT recipes intact) |
| `scripts/proof-dock-animation-live.mjs` | modify (gate-author unit: promote to fail-CLOSED + sample the root-box geometry against a child on one rAF timeline; the deterministic-drive design lands in W00, the dock-specific assertions land here) |

**Do NOT touch**: `src/components/custom/dock/composables/useDockState.ts` (the OPEN/CLOSE intent state half is correct as-is — keep it, slice 1 F1), `src/components/custom/dock/composables/useDockHold.ts` (NEW in W03 — do not pre-create), `Slider.vue` (W03), the `dock.css` `@media (min-width:640px)` wrap block + `--dock-overflow-bp` (W04), `tokens.css`/`theme.css` spring tokens + the 4 apple-spring SFC consumers (W05), any `src/styles/dock/` partials directory (W06 creates it), `src/components/custom/dock/DockLayerGroup.vue` inner-orchestrator DI (W02). `scripts/proof-spring-tokens-synced.mjs` (W05) and `scripts/proof-vt-names.mjs` (consumed read-only, not modified here).

---

## Disjointness

The entire dock band (W01-W06) mutates `dock.css` and/or `GlassDock.vue` — these CANNOT run concurrently (harden:dock-graphics slice 28 F2). W01 is the FIRST writer; the band serializes behind it. Specific shared-surface collisions and how W01 avoids them:

- **W03 (keepDockOpen rebuild)** — also touches `GlassDock.vue` + creates `dock/composables/useDockHold.ts`. W03 dependsOn W01 and re-seats the hold onto the W01 collapse-machinery rebuild (slice 2 F0 CAVEAT). W01 does NOT create `useDockHold.ts` and does NOT touch `Slider.vue`. The `held`-as-first-class-morph-input contract is W03's; W01 leaves the morph state machine with a clean seam for it.
- **W04 (overflow/wrap)** — also touches `dock.css` (the `@media (min-width:640px)` block, the `--shadow-dock-wrap`/`--dock-card-radius` tokens) + `GlassDock.vue` (the wrap-guard). W04 dependsOn W01. W01 touches ONLY the `:326-340` morph-driver block in `dock.css`; it does NOT touch the wrap `@media` block or the radius-divergence tokens.
- **W05 (one iOS-spring vocabulary)** — touches `tokens.css`/`theme.css` (the `--spring-*`/`--ease-apple-spring` tokens) + 4 SFC consumers. W01 does NOT delete or re-author any spring TOKEN; it consumes the published `(0.32,0.7)` `--spring-dock` constant as the SpringProgress input. The `DOCK_SPRING`-const-vs-token hand-mirror that W01 collapses is the JS-side morph duplication, not the token vocabulary W05 governs.
- **W06 (dock.css split + consolidation)** — splits `dock.css` into `src/styles/dock/` partials, LAST in the band, AFTER W01+W04 churn settles (corrected per §4 note 19 / harden slice 28 F3 — a pre-churn split guarantees three-way merge conflicts across the whole band). W01 keeps `dock.css` a single file; W06 carves the FINAL settled model.

**No two units in W01 share a `modify` path**: the implement unit owns the 6 source files; the gate-author unit owns `proof-dock-animation-live.mjs` (disjoint); the verify unit is read-only. If the implement + gate-author units must be parallelized, the gate-author unit works in a sibling worktree (§Worktree). The recommended serialization: implement → gate-author → verify.

---

## Triumvirate

The implement / adversarially-verify / gate-author split (≤6 impl, ≤7 read-only):

- **Implement (1 agent)** — owns the 6 source files. Re-derives `useLayerTransition` to one-scalar one-clock (~130 lines), deletes the VT collapse fork, re-expresses the `dock.css` morph axes as `calc()` off `--dock-morph-t`, exposes `useLayerTransition` on the `/dock` barrel, preserves the `glass-dock-${useId()}` route-morph seam.
- **Adversarially-verify (1 read-only lane)** — the δ idiomatic-gestalt + π visual-runtime adversary. Confirms (a) NO second clock survives anywhere (greps for any residual root CSS `transition` on a morph property + any `startViewTransition` call in the dock path + any `armStagger`-only-on-FLIP branch), (b) the line-count target is met without stub-hiding, (c) the velocity-continuity retarget survives, (d) the `proof:vt-names` route-morph seam is intact, (e) the fourier two-dock co-mount renders both route-morphs in the live π-lane. RATIFIES the §Scope.4 RATIFY-BEFORE-IMPL VT-name-keep decision against the live re-diagnosis.
- **Gate-author (1 agent)** — owns `proof-dock-animation-live.mjs`. Promotes it fail-CLOSED (no-harness no longer `exit(0)`) and adds the root-box-geometry-vs-inner-content lead/lag ≤ 1 frame assertion on the SAME rAF timeline on the DEFAULT engine, plus the `--spring-dock` token-peak parse as the flake-free secondary (per the W00 deterministic-drive design). Authors the born-RED proof (the gate FAILS at HEAD, PASSES after the implement unit lands).

**Triumvirate auto-triggers** (mandatory, not optional): the FileBounds whose expansion would invalidate the wave — any need to touch `Slider.vue`, `useDockState.ts`, the wrap `@media` block, or a spring TOKEN (those belong to W03/W04/W05; touching them is a scope-reveal → halt + triumvirate, do NOT absorb). The hard-gate failures that are not local-edit-recoverable: if the live π-lane CANNOT deterministically drive the morph to a readable measurement (the keyframes-device-proven un-measurability — VT on invisible snapshots, the internal SpringProgress clock with no handle), the gate-author unit escalates to the W00 SpringProgress-test-seam design, not a hand-patched probe. The diagnostic loop whose third iteration halts: if the single-scalar `calc()` interpolation surface does NOT reproduce the published `(0.32,0.7)` feel after three retunes, dispatch research+plan+redress rather than re-rolling the spring constant.

---

## HardGate

Numbered, evidence-backed, born-RED → GREEN. Precept-valid artefact forms (runtime behavioral test + diff + deletion proof — NOT grep-only for the runtime morph behavior, per SPEC.md §Hard Gates):

1. **`proof:dock-animation-live` — fail-CLOSED, DEFAULT engine (π-lane).** Sample the dock-root box geometry (computed `padding-inline` + `border-radius` + bounding `width` of `.glass-dock`) AND a representative child's `opacity`/`transform` on the SAME rAF timeline across the collapse↔expand morph; assert the box-chrome and the child morph onsets occur in the SAME frame (lead/lag ≤ 1 frame). BORN-RED at HEAD (the root box leads the inner content by a frame; the no-harness path no longer fail-opens). GREEN after the single-scalar redesign (one scalar drives both → trivially co-temporal).
2. **`--spring-dock` token-peak parse (flake-free secondary).** Parse the `--spring-dock` `linear()` ramp peak ≤ the published +4.6% (0.32,0.7) baseline — the trivially-falsifiable non-live secondary that catches a re-bounce regression without depending on live `getBoundingClientRect` timing.
3. **`proof:vt-names` — route-morph seam preservation.** The per-instance `glass-dock-${useId()}` named-element mint survives the collapse-fork retirement (invariant η: app-unique mint-source intact). Assert the dock root still carries the route-morph `view-transition-name`. GREEN before AND after (a preservation assertion, not a born-RED).
4. **Deletion proof.** `useLayerTransition.ts` line count drops to ~130 (from 479); a diff shows the `NATIVE_VT` branch, the `view-transition.css:59-86` dock VT recipe, the asymmetric `:76-86` curve fork, the `dock.css:326-340` root CSS-transition morph drivers, and the `DOCK_SPRING` hand-mirror are DELETED (not renamed, not flag-hidden — no-legacy-code).
5. **Barrel-reach proof.** A consumer-probe `import { useLayerTransition } from "@mkbabb/glass-ui/dock"` resolves (substrate-with-consumer; the value.js fork-deletion target now reachable).

**MANDATORY VISUAL-TRUTH (non-negotiable per AX.W00; appearance/interaction axis, NOT a headless proof alone).** The wave does NOT close on the numeric gates. Its close criterion is an EXECUTED live Playwright + frontend-design audit on the real device:

- a frontend-design screenshot-diff across the collapse↔expand morph (≥ 5 frames spanning the named duration, ≥ 3 viewports per SPEC.md §π) confirming the box-chrome and the children move in-step, no box-leads-content lag;
- a live frontend-design read that the morph "reads as ONE continuous iOS spring" — overshoot, settle, interruptible retarget — identical on the DEFAULT engine (the engine most users hit), not a capability-gated second personality;
- the fourier two-co-mounted-docks regression fixture (CanvasControlsDock + EditorControlsDock) renders BOTH route-morphs with NO VT-name collision dropping a snapshot (the §4 note 23 / slice 12 F1 corroborating witness, added to the W00 π-lane / W01 live-audit fixtures).

**Visual-truth gate one-liner**: a live Playwright + frontend-design audit confirms the whole dock box and its children morph as one continuous iOS spring on the DEFAULT engine with the box-chrome and content co-temporal (lead/lag ≤ 1 frame), and the fourier two-dock co-mount route-morphs both without VT-name collision — the numeric gate alone does NOT close the wave.

---

## Cadence

Sub-steps in order:

1. **Live re-diagnosis (W00 wave-open ritual).** Drive the HEAD dock morph in the π-lane; capture the root-box-vs-inner-content lead/lag as the born-RED baseline (the paired-π BEFORE state). RATIFY the §Scope.4 VT-name-keep decision against the live re-diagnosis (COLLAPSE VT vs ROUTE-MORPH VT genuinely separable). Record the re-diagnosis in §Archaeology.
2. **Gate-author born-RED.** Promote `proof:dock-animation-live` to fail-CLOSED + add the root-box-vs-child assertion; confirm it RED-fails at HEAD (witness 1+2). Author the `proof:vt-names` preservation assertion.
3. **Re-derive `useLayerTransition`** to one-scalar one-clock (~130 lines): one `SpringProgress`, `--dock-morph-t` written once per frame, velocity-continuity retarget kept, VT fork + will-change micro-lifecycle + `DOCK_SPRING` hand-mirror deleted.
4. **Re-express `dock.css` morph axes** as `calc()` reads off `--dock-morph-t`; delete the `:326-340` root CSS-transition drivers; keep the clip-reveal aperture as the sole reveal model.
5. **Delete the `view-transition.css:59-86` dock VT recipe** + the `:76-86` asymmetric curve fork; remove the collapse `startViewTransition` from `GlassDock.vue`; PRESERVE the `glass-dock-${useId()}` root route-morph name.
6. **Expose `useLayerTransition` on the `/dock` barrel** (`index.ts` + `composables/index.ts`); confirm the consumer-probe resolves.
7. **Run the gates GREEN** (`proof:dock-animation-live` fail-CLOSED, `--spring-dock` peak parse, `proof:vt-names`, deletion + barrel-reach proofs); typecheck + lint.
8. **Execute the MANDATORY visual-truth audit** (paired-π AFTER + DELTA.md compare; the screenshot-diff, the "one continuous iOS spring" read, the fourier two-dock co-mount fixture). The wave closes ONLY on this executed live audit.

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (step 3, step 5, step 7) and before close; `git diff --check` on the doc/status commit.

---

## Artefacts

- `docs/tranches/AX/audit/W01-dock-morph-single-scalar.json` — the per-finding fold record (slice 0 F0/F1/F2, slice 1 F0/F1/F5, slice 5 F0/F1; root-cause → gestalt-fix → evidence-path) + the live re-diagnosis baseline.
- `docs/tranches/AX/audit/W01-DELTA.md` — the paired-π BEFORE (HEAD lead/lag) / AFTER (co-temporal) / DELTA compare-at-close (the muster paired-π protocol per AX.W00 CONVERGE fold d).
- π-lane screenshot set: the ≥5-frame morph capture at ≥3 viewports (BEFORE + AFTER), the fourier two-dock co-mount render, saved under the W00 visual-test workspace's evidence dir; commit hashes referenced in PROGRESS.md.
- The gate run logs: `proof:dock-animation-live` born-RED (HEAD) + GREEN (post-fix) transcripts; the `useLayerTransition.ts` line-count + deletion diff; the barrel-reach consumer-probe transcript.

---

## CommitPlan

Conventional-commit, one per sub-step (the implement scopes identify the owned surface, not only the tranche; commit bodies required for the deletion + gate changes):

1. `test(dock): born-RED proof:dock-animation-live — fail-CLOSED + root-box-vs-inner-content lead/lag assertion (AX.W01)` — body: names the HEAD desync witness + the deterministic-drive design inherited from W00.
2. `refactor(dock): re-derive useLayerTransition to one-scalar one-clock morph (479→~130) (AX.W01)` — body: enumerates the deleted accretion layers (NATIVE_VT fork, will-change micro-lifecycle, DOCK_SPRING hand-mirror) + the single `--dock-morph-t` authority; cites e8380d7 single-clock high-water.
3. `style(dock): re-express dock.css morph axes as calc() off --dock-morph-t; delete root CSS-transition drivers (AX.W01)` — body: the clip-reveal aperture as sole reveal model.
4. `refactor(dock): retire the View-Transitions COLLAPSE fork; preserve the route-morph view-transition-name seam (AX.W01)` — body: the SEPARABLE-concerns split (collapse VT vs route-morph VT), the fourier route-morph + proof:vt-names preservation, the RATIFY-BEFORE-IMPL live re-diagnosis outcome.
5. `feat(dock): export useLayerTransition on the /dock subpath barrel (AX.W01)` — body: substrate-with-consumer — the value.js fork-retirement target (adoption leg → W34).
6. `docs(tranche-AX): W01 dock-morph fold record + paired-π DELTA + PROGRESS (AX.W01)` — body: the visual-truth audit verdict + the artefact paths.

---

## Dependencies

- **Depends on**: AX.W00 (the π visual-runtime lane). W01's hard gate IS the W00-designed `proof:dock-animation-live` promoted fail-CLOSED with the deterministic-drive + token-peak design; the live-re-diagnosis ritual, the paired-π BEFORE/AFTER/DELTA protocol, and the fourier two-dock co-mount regression fixture are all W00 machinery W01 consumes. W01 cannot close its visual-truth gate without the W00 workspace. (The §4-note-12 publish-currency caveat: the consumers MEASURED published 3.6.0; the box-vs-content desync is a genuine HEAD code defect, NOT a publish-currency gap — verify against HEAD, fix, then the AX cut publishes.)
- **Blocks**: AX.W02 (one morph orchestrator per dock — folds the inner DockLayerGroup pair onto the W01 outer driver via DI), AX.W03 (keepDockOpen rebuild — re-seats the hold onto the W01 collapse-machinery; held as first-class morph-state), AX.W04 (overflow/wrap — content-driven reflow on the W01 box), AX.W05 (one iOS-spring vocabulary — pins the governed dock register to the W01 morph's published `(0.32,0.7)` curve), AX.W06 (dock.css split + consolidation — LAST in the band, carves the W01+W04 settled model). The value.js fork-deletion consumer-adoption leg → AX.W34; the fourier ^3.1.0→^3.6.0 pin-bump (the dock-VT-name `useId` fix + the W01 morph) → AX.W34 (after the dock band ships).

---

## Archaeology

The audit cited a clean single-clock high-water that the regression eroded by pure accretion:

- **`e8380d7`** (`feat: glass-ui design system — components, composables, styles, presets`) — `src/components/custom/dock/composables/useLayerTransition.ts` was 135 lines: ONE element, width via a single CSS `width` transition, class-driven opacity, class-swap synchronous at watch-fire — one clock by construction. This is the model W01 re-derives to (slice 0 F0 evidence, slice 1 F0/F1 evidence).
- **`6dd0d14`** (`feat(tranche-AU): W8 — dock-motion overhaul`) — 291 lines; added the `nextTick→rAF→void offsetWidth` single-frame deferral (to co-locate the class-swap + the width-set in one frame relative to EACH OTHER), which inadvertently pushed BOTH a frame behind the always-synchronous root CSS transition (slice 0 F0 root-cause).
- The accretion chain AQ.W6 (VT fork) → AU.W8 (`6dd0d14`, single-frame rAF) → AV.W9 (dual-driver excision) → AW.W2 (clip-reveal, `53c1b07` retuned `--spring-dock` off `(0.5,0.5)/+18.5%` to the `(0.32,0.7)` settled band) → AW.W3 (spring-keyed stagger, FLIP-only) — each bolted a coordination layer onto the prior layer's seam rather than re-deriving (slice 1 F0/F1 root-cause; the comment-density is itself the scar-tissue evidence).
- **`9e3c92c`** (`refactor(dock): axis-aware useDockTransition and useLayerTransition`) — `useDockTransition` was merged AWAY but its FLIP logic was folded into `useLayerTransition` without consolidating, doubling the surface (slice 1 F1 evidence).
- **Cross-repo ORACLE (§4 note 23).** keyframes.js's first dock (the single-clock high-water `e82633e`/`e8380d7`) and the published `(0.32,0.7)` `--spring-dock` (sampled ramp peak ~+4.6%) are the CORRECT references the §1.2 directive names — the dock the AX dock band measures against, NOT a defect to re-fix. The fourier two-co-mounted-docks `glass-dock-1` duplicate-name collision (dropped morph snapshot + ~13 red e2e) is the corroborating WITNESS that VT is the wrong primitive for the layout morph.
- **Live re-diagnosis BEFORE the fix (AX.W00 ritual; §4 note 11).** The AW.W1 plan misdiagnosed the dock simple-collapse regression from a hypothesis (blamed `useLayerTransition` measurement, forbade touching dock.css); the live HEAD re-diagnosis falsified it (the real cause was `container-type: inline-size`, since fixed in 3.4.0). The §1.1 "box shrinks first" defect W01 fixes is a DIFFERENT, still-open defect (the box-vs-content desync). W01's Cadence step 1 records the live re-diagnosis as the new guardrail against re-misdiagnosis.

---

## PreceptAlignment

Pursuant to `docs/precepts/` (pinned `63240e6`); the A·DOCK band-bound invariants (§2b) this wave pursues + must not violate:

- **One path** (`README.md §Edicts` "Two orthogonal codepaths for the same logic is a code smell") — the headline. W01 collapses the VT-vs-FLIP morph fork to ONE driver, one clock, on every engine. The `NATIVE_VT` branch, the asymmetric VT curve, and the dead-on-VT stagger are the two-codepath smell; W01 deletes them, keeping the consumer (the live SpringProgress) that survives.
- **No legacy code** (`README.md §Edicts` "Delete dead code. Do not rename it, hide it behind a feature flag, or leave commented remnants") — the deleted VT fork + `DOCK_SPRING` hand-mirror + root CSS-transition drivers are DELETED, not flag-hidden; the deletion proof (HardGate 4) is the artefact. No tombstone comments survive in the touched morph blocks.
- **Abrogate before patch** (`README.md §Edicts` "ask 'can we delete?' before 'can we patch?'") — the dock morph is re-derived from first principles (479 → ~130), not patched with a seventh coordination layer; the accretion-of-patches IS the root cause (slice 1 F1). Abrogation (delete the VT fork + re-derive) is shorter total than another compensating patch.
- **Substrate with consumer** (`README.md §Edicts`) — the rebuilt single-scalar `useLayerTransition` lands on the `/dock` subpath barrel WITH the value.js fork-deletion as its named consumer (constellation slice 10 F0). It does NOT ship as an unconsumed export; the consumer-adoption leg has a named destination (W34). Must NOT violate: no forward hook without a consumer — the barrel re-export is justified by the existing value.js fork, not speculative.
- **Typed-key + paired DI** (`README.md §Code Discipline`, `tranche/SPEC.md`) — W01 does NOT itself collapse a provide/inject pair (that is W02's `DockLayerGroup`-onto-outer-driver DI + the band-wide collapse onto `createStrictContext`), but it must LEAVE the morph state machine with a clean DI seam W02 can inject through (the held-input seam for W03, the orchestrator seam for W02). Must not bake a string-key inject the band then has to unwind.
- **Fail-explicit on library-internal violations vs befitting-silent browser-API degradation** (`README.md §Edicts`; `tranche/SPEC.md §Hard Gates`) — the rebuilt composable throws on a library-internal contract violation (a missing measure target is a should-not-reach bug, not a silent return); a genuine browser-API absence (no `requestAnimationFrame`, reduced-motion) stays a befitting-silent fallback. The two are never collapsed. The gate is a runtime behavioral test, NOT a grep-only runtime gate (the invalid-hard-gate class).
- **π visual-runtime lane** (`tranche/SPEC.md §π`; AX.W00) — the wave closes on an EXECUTED live Playwright + frontend-design audit (≥3 viewports, ≥5 animation-timing frames), not a headless proof. The "reads as one continuous iOS spring" + the box-content co-temporal read + the fourier two-dock fixture are the binding close criterion. Must not violate: no closing on the numeric gate alone (the cardinal AW failure this whole tranche corrects).
- **Goal + completion criterion paired** (`README.md §Edicts`; `WAVE_SPEC.md §2a/§6`) — the §Goal (one-scalar one-clock whole-box morph) and the §HardGate (born-RED→GREEN `proof:dock-animation-live` + visual-truth) are paired and distinct; a gate-pass with a goal-miss (e.g. the numbers pass but it does NOT read as one spring) closes `complete_with_misses`, not `complete`.
