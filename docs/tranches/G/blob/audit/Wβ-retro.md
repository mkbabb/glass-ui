# Sub-tranche β — Retrospective

**Tranche**: G sub-tranche β (Blob primitive).
**Closed**: 2026-05-04.

## What worked

- **SPEC.md as load-bearing input.** The 473-line spec was the single source of truth across all four waves; agents pinned to it without drift, and the five §11 user-locked decisions held end-to-end.
- **Wβ0 syntactic-static GLSL validation as compile gate.** Headless WebGL was unavailable; a pure-JS validator (`scripts/playground/blob-shader-compile.mjs`) checked brace balance + uniform-reference completeness + spec-§6 byte-match modulo whitespace. Closed the compile gate without runtime infrastructure.
- **User-direction Q24 absorbing HeroBlob into consumer wrapper.** The single `<Blob>` primitive landed in canon; HeroBlob stays as a value.js consumer-side wrapper. This kept the canon API minimal and pushed palette-mapping concerns out of the library.
- **Instance-local GL context (§11.1).** Per-`<Blob>` instance allocates its own context; deferring the shared compositor avoided premature optimization. Multi-instance tests in the Wβ3 stress story confirm acceptable performance.
- **CSS-variable chromatic aberration (§11.2).** `--blob-chromatic-aberration` exposed as a per-instance CSS custom property; the renderer reads `getComputedStyle(canvas)` each frame. Consumers tune per instance without prop drilling.

## What changed from spec

- **`useRafLoop` → `useRAFLoop` naming.** The original spec named the rAF driver `useRafLoop` (lowercase r); the dispatched agent landed `useRAFLoop` (capital RAF — idiomatic acronym capitalization). The orchestrator reconciled by aligning all consumers to `useRAFLoop` post-dispatch. SPEC.md unchanged on this point because the name is a non-load-bearing implementation detail.
- **Wβ0 absorbed by orchestrator after agent stall.** The dispatched Wβ0 agent stalled at 600s past the post-validator file-write step (after completing the spec consistency check + playground HTML + validator script). Orchestrator absorbed the remaining work (shader-proof.md + value.js ledger pre-fill + Wβ1–Wβ3 amendments) directly per ORCHESTRATION.md scope-reveal absorb default.
- **W1 + W2 token edits regression.** A downstream Lane 4 residual agent's `git stash` / `git stash pop` round-trip silently reverted all W1+W2 orchestrator-direct edits to tokens.css/typography.css/theme.css/tokens.ts/cards.css/paper.css/utilities.css/index.css/package.json. Orchestrator detected via post-close grep and recovered every reverted addition (cream namespace, paper tier, icon-2xl/3xl/mega, shadow-cartoon-accent, space-phi, shimmer-blue, blob primitives, display-mega/ultra, per-rung Fraunces axes, all `@theme` exposures, all 49 utility classes, math.css cascade entry, `./styles/prism-theme` package.json export, all 5 tokens.ts runtime helpers).
- **Wβ3 dispatched agent hit org API limit mid-execution.** Agent landed `primitives/blob.vue` and `_internal/blob-stress.vue` before cutoff; audit docs (Wβ3-stress-proof.md, Wβ3-design-fidelity.md, Wβ-retro.md, BLOB-FINAL.md) authored by orchestrator absorb. Three single-quote-inside-single-quote font-variation-settings typecheck errors fixed by orchestrator post-dispatch.

## Residuals

None for sub-tranche β proper. Open follow-ups belong to consumer migrations (W5 ledger drives those) and to `BlobMood` further-tuning if the five-mood vocabulary turns out to be insufficient under real adoption (no second consumer evidence yet — value.js is the only blob consumer).

## Discipline observations

- The watchdog stall pattern across multiple lanes (Wβ0, Wβ1.III, W3 Lanes 1/3/4/5, W4 Lane I, Wβ3) suggests the agent runtime's 600s cap is hitting a build-verify step rather than the substantive implementation. Each stalled agent had completed ≥80% of its scope per their final transcript message; the killing point was always near `npm run build` finalization. **Recommendation for future tranches**: instruct dispatched agents to run typecheck/build EARLIER in the workflow (pre-final-write) so the stall — if it happens — leaves disk in a more recoverable state.
- The `git stash` regression should never have happened. **Recommendation for future tranches**: add a binding lane prompt clause: "Do not run `git stash`, `git stash pop`, `git checkout HEAD --`, or any other potentially-state-rewinding git command. If a build fails, revert your own edits surgically (Edit tool); do not use git as a recovery mechanism." This is a process precept, not a per-tranche addition.

## Authority

Sub-tranche β closes clean per Wβ0 / Wβ1 / Wβ2 / Wβ3 hard gates. SPEC.md §11 lock compliance verified at every wave. value.js consumer migration ledger reachable per `audit/W5-value-js-migration.md` (pre-loaded by Wβ0; finalized by orchestrator).
