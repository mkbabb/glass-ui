# AV.W9 - Dock Rebuild

## State

**Name**: W9 - Dock Rebuild
**Opens after**: AV.W3 (motion) lands — the W3.5 `flip()` FLIP-batching fold and the C3 velocity-continuity seam are recorded against `useLayerTransition.ts`; W9 takes the file from there.
**Agents**: 5 serial
**Hard gate**: `proof:dock-animation-live` born-RED on HEAD goes GREEN — a real-browser rAF probe asserts the dock container width AND child opacity both change over ≥3 frames and co-settle within ±1 frame on collapse/expand/switch.
**Status**: planned

## Goal criterion

This wave succeeds if the dock reads as one iOS-grade physical object that animates **live** at runtime: a single driver owns the size morph on every engine, the layer stack crossfades and morphs as one coherent layering model, an interrupted re-toggle continues from the live spring's velocity rather than restarting from rest, and a behavioral gate that samples painted frames proves the motion actually happens — the dual-driver freeze the syntactic gates could not see is gone.

## Scope

1. Collapse the dock size-morph to ONE driver per swap. Retire the dual-driver race introduced at AU.W8b: the `@supports (interpolate-size: allow-keywords)` native CSS arm (`dock.css:400-409`) and the JS `SpringProgress` FLIP driver (`useLayerTransition.ts:203-257`) both write `width` on Chrome 129+, cancelling the motion. Make the fork a strict XOR.
2. Re-author the layering model as ONE design: how the two stacked panes crossfade, how the container width morphs, how the visibility-fork hands hit-testing between active/leaving/inactive — chosen at construction per capability tier, never overlapping.
3. Re-seat the live `SpringProgress` from its current `(value, velocity)` on an interrupted/retargeted swap instead of `disposeSpring()` + `new SpringProgress(...)` from the static `DOCK_SPRING` preset (`useLayerTransition.ts:185,237`), which throws away in-flight velocity.
4. Convert dock-control press to a momentum-gated spring: 100% damping (no overshoot) for taps; bounce reserved for gesture-momentum surfaces.
5. Confirm the reka-ui Tabs rail (`DockLayerGroup.vue:132-162`) does not extend the transition window or hold the dock open past the morph (`railHolds` timing).
6. Author `proof:dock-animation-live` — the born-RED Playwright frame-sampling gate. Demote `proof:dock-motion-single-source` and `proof:dock-opacity-lockstep` to "structure" severity.

## Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory, not an orchestrator re-dispatch, when:

- **File-bounds expansion**: the single-driver decision requires editing a file outside `{useLayerTransition.ts, dock.css, dock-controls.css}` — e.g. `GlassDock.vue`/`DockLayerGroup.vue` need a structural change beyond removing the now-dead `view-transition-name` style binding, or `tokens.css`/`scripts/regen-spring-tokens.mjs` need a press-spring preset. Any of these invalidates the disjointness model below.
- **Non-local-recoverable gate failure**: `proof:dock-animation-live` stays RED after AV.W9.0 lands (the freeze persists — the chosen driver still does not paint), OR it flakes across 3 consecutive runs (the ±1-frame settle bar is wrong for the real-browser scheduler and must be re-derived, not loosened ad hoc).
- **Diagnostic third iteration**: a third round of "tweak the XOR condition, re-probe, still frozen" must halt — the capability-detection model is wrong (e.g. `interpolate-size` support does not predict the freeze on a given engine) and needs re-research, not a fourth tweak.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify |
| `src/styles/dock.css` | modify |
| `src/styles/dock-controls.css` | modify |
| `scripts/proof-dock-animation-live.mjs` | create |
| `package.json` | modify (register `proof:dock-animation-live`; demote the two static gates' severity in their `proof:*` wiring) |
| `scripts/proof-dock-motion-single-source.mjs` | modify (severity → structure) |
| `scripts/proof-dock-opacity-lockstep.mjs` | modify (severity → structure) |

Do NOT touch: `docs/precepts/` (read-only), `node_modules/@mkbabb/keyframes.js` (inv-16 — the fix is glass-ui-side; the live solver already tracks velocity, the wiring is the work), `src/components/custom/glass-carousel/` (the W3.5 carousel FLIP fold is its own seam), `GlassDock.vue`/`DockLayerGroup.vue` structure (only the dead VT-style binding may be pruned, and only if AV.W9.1 needs it — else triumvirate).

## Disjointness

The five units run **serial**, not parallel, because AV.W9.0 (the driver XOR), AV.W9.1 (the layering model), and AV.W9.2 (velocity-continuity) all modify `useLayerTransition.ts` + `dock.css` and cannot be made file-disjoint — the layering model is the same edit surface as the driver collapse. AV.W9.3 (press spring) is the only `dock-controls.css`-local unit and could float, but it is sequenced after W9.1 so the press physics layer on the settled motion model. AV.W9.4 (the behavioral gate) creates a new file + edits `package.json`/the two static scripts, and must run LAST so it validates the landed fix (born-RED before W9.0, GREEN after). No two units share a write within a single sub-wave because they do not overlap in time. No sibling worktree — serial on one branch.

## Worktree Plan

Single agent at a time on the wave branch; no sibling worktrees (the units are serial and share `useLayerTransition.ts`/`dock.css`). The orchestrator commits each unit before dispatching the next so every unit starts on a clean tree.

## Agent Units

### AV.W9.0 The driver XOR — the headline fix

- Goal: exactly one authority writes the dock container size per swap, on every engine.
- Mechanism: **DECISION — option (b): retire the W8b `interpolate-size`/`calc-size` native size arm; the JS `SpringProgress` FLIP driver owns the width morph on all engines.** Delete the `@supports (interpolate-size: allow-keywords)` block (`dock.css:400-409`) — the `interpolate-size: allow-keywords` opt-in AND the `width: calc-size(auto, size)` destination on both `.glass-dock.expanded > .dock-layers` and `.dock-layer-group .dock-layer-item-host.is-active`. The FLIP+spring path (already the unconditional fallback, already proven, already velocity-aware after W9.2) becomes the sole size driver. RATIONALE for (b) over (a) "always native": the native arm only ever ran on Chrome 129+ (LIMITED availability — no Firefox/Safari), so option (a) would still leave Firefox/Safari on the spring AND demand a runtime `CSS.supports` fork that disables the JS driver per-engine — two driver worlds to keep coherent across the outer GlassDock pair and the inner DockLayerGroup pair. Option (b) is ONE driver everywhere: the same `SpringProgress` curve, the same settle, no per-engine fork to drift. It is the `e8380d7` "one driver owns the morph" invariant re-expressed on the modern FLIP+spring architecture, minus the native arm W8b never made mutually exclusive. The View-Transitions native path (`NATIVE_VT`, `useLayerTransition.ts:72,147`) is ORTHOGONAL and STAYS — it owns size+crossfade as a true single mutation inside `startViewTransition`, never coexists with the spring (the `if (NATIVE_VT) return` early-exit already forks it cleanly), and does not touch `width` inline. The `view-transition-name`/`view-transition-class` style bindings on `.dock-layers`/`.dock-layer-stack` stay (they drive the VT path).
- Files: `src/styles/dock.css` (delete `:400-409`), `src/components/custom/dock/composables/useLayerTransition.ts` (confirm the FLIP branch is now unconditional below the VT + PRM forks; no code change needed if the W8b arm was CSS-only — verify and document).
- Sub-gate: `dock.css` contains no `interpolate-size` or `calc-size` token; `proof:dock-animation-live` (authored in W9.4) flips from RED to GREEN on this unit; `proof:dock-motion-parity` + `proof:dock-motion-single-source` + `typecheck` + `build` stay green.

### AV.W9.1 The first-principles layering model

- Goal: the layer stack stacks, crossfades, and morphs as ONE coherent design with one authority per concern, not a three-strategy patched fork.
- Mechanism: with the native size arm gone (W9.0), reduce the opacity/visibility fork to ONE authority too. The hand-rolled 3-state visibility fork (`dock.css:457-493` — inactive `visibility:hidden`, leaving `visibility:visible` + `pointer-events:none`, active immediate `visibility 0s`) is the kept fallback and is correct; the `@supports (transition-behavior: allow-discrete)` discrete-visibility arm (`dock.css:510-547`) is the THIRD opacity authority the digest flags. With size on the spring (not the native arm), the discrete arm no longer pairs with a native size morph — **retire it too** so opacity has one owner, matching the one-owner size decision (Principle 4: opacity and size always agree on which world they're in). The layering model is then: two panes on a 1/1 CSS grid (`.dock-layer{,-item-host}`); the container width morphs off the single `SpringProgress` clock; opacity crossfades off the `--dock-motion-resize` CSS transition on the pane host (lockstep with the morph by shared token, the AU.W2 invariant — keep it); the visibility-fork hands hit-testing between active/leaving/inactive via the delayed `visibility 0s linear var(--duration-normal)` hold (keep — it is the a11y-006 bite-anchor, the LOAD-BEARING `AU.W8b-visibility-fork` marker at `dock.css:420`). Net: one size authority (spring/VT), one opacity authority (CSS `--dock-motion-resize`), one visibility authority (the delayed-hold fork). Confirm the outer (GlassDock) and inner (DockLayerGroup) `useLayerTransition` instances both inherit this single model — one capability read, same value across instances on a given engine, so a compound gesture (expand → switch layer) never splits one stack onto a different authority than the other.
- Files: `src/styles/dock.css` (delete the `@supports (transition-behavior: allow-discrete)` block `:510-547` and the `@starting-style` anchor; keep the fallback fork + the visibility marker).
- Sub-gate: `dock.css` has no `transition-behavior: allow-discrete` arm under the dock-layer rules; the visibility-fork marker comment + its 3-state rules remain; `proof:dock-opacity-lockstep` (now structure-tier) stays green (both rules still name `--dock-motion-resize`); `proof:dock-a11y-contract` green.

### AV.W9.2 Velocity-continuity on retarget

- Goal: an interrupted/retargeted swap continues from the live spring's current velocity, the iOS interruptible-spring contract.
- Mechanism: the C3 seam the AV charter recorded-not-edited now lands here. Today `useLayerTransition.ts:185` `disposeSpring()` + `:237` `new SpringProgress({...DOCK_SPRING})` reconstruct from rest on every swap — a rapid re-toggle restarts the morph from velocity 0 (Apple: "springs are the only animation that maintains continuity both for static cases and cases with an initial velocity"). The fix: when a swap arms while a prior swap's spring is still live (the closure `spring` is non-null and unsettled, `transitionId` pending), read the live solver's current `(value, velocity)` and RE-TARGET the existing `SpringProgress` to the new destination instead of dispose+reconstruct — re-seating the morph's `from` at the interrupted pixel value and carrying the velocity. The solver already tracks velocity (inv-16 — no keyframes edit; the wiring is glass-ui-side). On a fresh swap (no live spring) the construct-from-`DOCK_SPRING` path stays. The `setDim` per-frame remap (`fromSize + (toSize - fromSize) * p`) re-derives against the re-seated `fromSize` so the pixel math stays continuous across the retarget.
- Files: `src/components/custom/dock/composables/useLayerTransition.ts`.
- Sub-gate: a unit/probe shows a re-toggle within the morph window carries non-zero velocity into the retarget (no dispose+new on the live-spring path); `proof:dock-animation-live` (W9.4) includes a rapid-retarget case that does not snap; `typecheck` + `build` green.

### AV.W9.3 Momentum-gated press spring

- Goal: dock-control press squishes and settles on a real spring — 100% damping for taps, bounce only for momentum.
- Mechanism: dock-control `:active` press is today `scale var(--dock-press-spring)` (`dock-controls.css:48,75,208,216`) — a fixed-time bouncy `linear()` curve, not a momentum-gated spring. Apple's rule (Designing Fluid Interfaces): default 100% damping (no overshoot) for taps; add bounce only when the driving gesture carries momentum. Convert the `:active` squish-toward-`--scale-press-dock` to settle on a no-overshoot spring curve (ζ≈1 → no bounce on tap release); reserve a bouncy curve token for momentumed surfaces (none today, so taps settle smooth). Token-routed: the press curve reads a `--*-spring` token, not a raw cubic-bezier. No new src tokens unless a press-spring preset is genuinely absent (a preset add would need `tokens.css` + `regen-spring-tokens.mjs` → triumvirate per File Bounds).
- Files: `src/styles/dock-controls.css`.
- Sub-gate: every dock-control `scale` press transition reads a `--*-spring` token (no raw cubic-bezier); the tap-release shows no overshoot in the live probe; `proof:dock-motion-parity` green.

### AV.W9.4 The behavioral gate — proof:dock-animation-live

- Goal: a real runtime probe proves the dock animates — the gate the syntactic gates could not be.
- Mechanism: author `scripts/proof-dock-animation-live.mjs` — a Playwright-driven gate (the Playwright MCP harness is available in THIS environment; the two existing static gates explicitly delegated their perceptual half downstream and never mounted a browser — this gate closes that gap in-repo). It (1) navigates the demo to the dock route (`/navigation/dock`); (2) records the collapsed `.dock-layers` `boundingBox().width = W0` and the active-layer child `opacity = O0` via `getComputedStyle`; (3) triggers expand (hover/click); (4) polls on `requestAnimationFrame` inside `browser_evaluate`, sampling `.dock-layers` width and active-layer opacity every frame into two timelines until both settle (Δ < 0.5px width, < 0.01 opacity over 3 consecutive frames); (5) asserts BEHAVIOR not structure — width morphs `W0 → W1` monotonically over **≥3 frames** (a single-frame snap or zero-delta timeline FAILS: the frozen dock is exactly that), opacity morphs `O0 → O1` monotonically, the two settle **within ±1 frame (±16.7ms)** of each other, total morph ≈ `--duration-normal` ± tolerance; (6) repeats for collapse, the DockLayerGroup inner pair, the rapid-retarget case (W9.2), and the dock-with-slider drag-hold (`/compositions/dock-with-slider`); (7) emits a timeline JSON artefact (`width-keyframe-times`, `opacity-keyframe-times`, `frame-difference`, `settle-delta-ms`) via the `gate-output.mjs` house helper. **Born RED on current HEAD** (the dual-driver freeze fails the monotonic-≥3-frames assert); GREEN only after W9.0+W9.1 land. House style mirrors `proof-dock-opacity-lockstep.mjs`: ESM `.mjs`, byte-stable JSON artefact, human summary, `process.exit(1)` on violation. Demote `proof:dock-motion-single-source` + `proof:dock-opacity-lockstep` to "structure" severity (kept as cheap pre-checks, no longer the source of truth for motion correctness).
- Files: `scripts/proof-dock-animation-live.mjs` (create), `package.json` (register `proof:dock-animation-live`), `scripts/proof-dock-motion-single-source.mjs` + `scripts/proof-dock-opacity-lockstep.mjs` (severity → structure).
- Sub-gate: `proof:dock-animation-live` is RED on the pre-W9.0 tree (checked out / stashed-verify by the orchestrator) and GREEN on the post-W9.1 tree; the artefact JSON shows ≥3 morph frames + a settle-delta ≤16.7ms; the two static gates run with structure severity and stay green.

## Hard Gate

1. `npm run proof:dock-animation-live` — GREEN on the landed tree; the emitted artefact shows width AND opacity each morph monotonically over ≥3 frames and co-settle within ±1 frame (≤16.7ms). Demonstrated born-RED on the pre-W9.0 tree (the freeze fails the ≥3-frame assert), proving the gate bites.
2. `grep -c 'interpolate-size\|calc-size' src/styles/dock.css` → 0 (the native size arm is deleted).
3. `grep -c 'transition-behavior: allow-discrete' src/styles/dock.css` under the dock-layer rules → 0 (the third opacity authority is deleted); the `AU.W8b-visibility-fork` LOAD-BEARING marker + its 3-state fallback rules remain.
4. `useLayerTransition.ts` has no `dispose()` + `new SpringProgress()` pair on the live-spring retarget path (the velocity-continuity invariant — re-seat, don't reconstruct).
5. Every dock-control `scale` press transition in `dock-controls.css` reads a `--*-spring` token, not a raw cubic-bezier.
6. `npm run proof:dock-motion-parity`, `proof:dock-motion-single-source` (structure), `proof:dock-opacity-lockstep` (structure), `proof:dock-a11y-contract`, `proof:dock-css-split`, `proof:dock-vocabulary`, `typecheck`, `build` — all green.

## Format And Lint Cadence

Run `npm run typecheck` + `npm run build` after AV.W9.0, AV.W9.2, and AV.W9.4 (each integration batch). Run `npx prettier --write` on the touched `.ts`/`.css`/`.mjs` before each unit commit. Run the full dock gate matrix (`proof:dock-*`) + `git diff --check` before the wave closes. The behavioral gate (`proof:dock-animation-live`) is itself a runtime check, run at W9.4 close and once more on the integrated tree.

## Verification Artefacts

- `artefacts/gate/dock-animation-live.json` (or the repo's `gate-output.mjs` path) — the width/opacity keyframe timelines, frame-difference, settle-delta-ms, for collapse/expand/switch/retarget/slider-hold.
- A born-RED capture: the same artefact run against the pre-W9.0 tree showing the zero-delta / single-frame width timeline (the freeze), saved alongside as the bite proof.
- The post-fix `proof:dock-*` matrix green output + `typecheck`/`build` logs.
- The wave-close commit hashes per the plan below.

## Commit Plan

- `fix(tranche-AV): W9.0 — retire the interpolate-size native size arm (single-driver collapse)` — body required (deletion + the dual-driver-race rationale).
- `fix(tranche-AV): W9.1 — single opacity authority + the first-principles layering model` — body required (deletion of the discrete-visibility arm + the one-authority-per-concern model).
- `feat(tranche-AV): W9.2 — dock velocity-continuity (re-seat the live SpringProgress on retarget)`.
- `feat(tranche-AV): W9.3 — momentum-gated dock-control press spring`.
- `test(tranche-AV): W9.4 — proof:dock-animation-live behavioral gate + demote the static gates to structure` — body required (gate, born-RED rationale, severity demotion).
- `docs(tranche-AV): W9 close — status + artefacts` — orchestrator status commit at close.

## Dependencies

- **Depends on**: AV.W3 (motion) — the W3.5 `flip()` FLIP-batching fold and the C3 velocity-continuity seam are recorded against `useLayerTransition.ts`; W9.2 lands the C3 wiring W3 deliberately left recorded-not-edited. The demo dock route + `dock-with-slider` composition must mount for the gate.
- **Blocks**: the F-arm slides Playwright dock validation (it consumes the published dock; W9 is what makes that validation pass at runtime), and any AV close that asserts dock-motion correctness.
- **Supersedes**: the AV charter's treatment of the dock motion as the AU.W8b "DONE" baseline (`AV.md §"DONE — AU W2→W10"` cites the dock-motion overhaul as complete). It is NOT complete — the AU.W8b native arm froze the dock at runtime. W9 corrects AU.W8b: the native `interpolate-size` arm is the regression, not the perfected baseline.
- **inv-16**: `@mkbabb/keyframes.js` is READ-ONLY. The velocity-continuity fix (W9.2) is glass-ui-side — the `SpringProgress` solver already tracks velocity; the wiring (re-seat vs reconstruct) is the work, no engine edit.

## Archaeology

Prior attempt: the AU.W8/W8b dock-motion overhaul (cited DONE in `AU.FINAL.md §1`, `AV.md`).

- **AU.W8** (`6dd0d14`) added the `SpringProgress` LIGHT driver — the per-frame inline-`width` FLIP morph. Correct, single-driver at that point.
- **AU.W8b** (`2a4a50f`) added the `@supports (interpolate-size: allow-keywords)` native arm (`dock.css:400-409`) AND the `@supports (transition-behavior: allow-discrete)` discrete-visibility arm (`:510-547`). NEITHER was made mutually exclusive with the spring driver. On Chrome 129+ the native arm interpolates `.dock-layers` width on the browser's clock WHILE the spring writes inline `width` per frame — a dual-driver race that cancels the motion and freezes the dock. This is the runtime regression.
- **Why the gates stayed green**: `proof:dock-motion-single-source` and `proof:dock-opacity-lockstep` are STRING-MATCH scans of `useLayerTransition.ts`/`dock.css` source — they assert intent (one rAF body; both rules name `--dock-motion-resize`) and never parse `@supports`, never mount a browser, never observe a painted frame. Both scripts' headers EXPLICITLY delegate the perceptual half downstream ("validated DOWNSTREAM by the slides deck's Playwright dock validation"). The bite never came back upstream, so the freeze shipped green.
- **The git "perfected baseline"**: the dock animated correctly at `e8380d7` (genesis) through `9e3c92c` — one driver, a single fade→swap→width CSS-transition sequence, no spring, no `calc-size`. That is a CONCEPTUAL reference ("one driver owns the morph"), not a commit to revert to; W9 re-expresses that invariant on the modern FLIP+spring (+VT) architecture, deleting only the native arm W8b forgot to make exclusive.
- **New guardrail**: `proof:dock-animation-live` — the born-RED real-browser frame-sampling gate. It is the gate the syntactic pair could not be: it fails on a zero-delta / single-frame width timeline (the freeze), so this regression class cannot ship green again.
