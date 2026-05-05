# W6-residuals — leftover gaps that don't qualify for G close

**Wave**: G.W5 close ceremony.
**Date**: 2026-05-04.
**Authority**: orchestrator.

Per W5.md hard gate: "(d) W6-residuals ≤5 or a named follow-up tranche scope is opened."

## Residuals (≤5 ideal)

### R1 — DESIGN.md sync regression recovery (deferred)

**Status**: deferred to a small follow-up pass.
**Cause**: the original W1.docs agent landed the DESIGN.md sync (916→1081 lines, 57 drift rows + 8 NEW-token sections); a downstream Lane 4 residual agent's `git stash` / `git stash pop` round-trip silently reverted DESIGN.md back to master state (915 lines). The orchestrator dispatched a re-sync agent during W5, but it hit the org API limit before writing to disk.
**Scope**: DESIGN.md is currently at master state (915 lines). The token additions (cream + paper + display-mega/ultra + per-rung Fraunces + shadow-cartoon-accent + space-phi + shimmer-blue + blob primitives + icon-2xl/3xl/mega + tracking-tightest + type-formula) are NOT documented in DESIGN.md. The 57 drift rows from `audit/W0-design-md-drift.md` remain unfixed.
**Decision**: open a small follow-up pass (G-II.W1.docs) to apply `audit/W0-design-md-drift.md` + add the 8 NEW-token sections. This is a docs-only edit, no source changes; can run in <1 hour once agent capacity returns. NOT BLOCKING G close — DESIGN.md is documentation, not source-of-truth; consumers and contributors can read tokens.css directly.

### R2 — Wβ3 stress runtime profile capture

**Status**: deferred to consumer-CI capture.
**Cause**: the runtime Performance API metrics (mean frame time, max frame time, memory growth) require an actual browser session with the dev server running. The Wβ3 stress story (`demo/stories/_internal/blob-stress.vue`) is the runtime-loaded artefact; capture happens at consumer adoption time per Wβ3 spec.
**Decision**: not blocking. The story exists, the threshold panel renders, and the budget is documented in `blob/audit/Wβ3-stress-proof.md`. Consumer CI captures the actual numbers.

### R3 — `<Slider variant="glass-track">` (synthesis gap 40)

**Status**: deferred per W3 spec.
**Cause**: needs the dock-keep-open round-trip refactor; per W3 spec "defer to a smaller maintenance wave or split off."
**Decision**: open in a future tranche (likely H or a maintenance pass). Three fourier-analysis sites + 2 EditorControlsDock/EditorToolsPanel inputs evidence the gap; they migrate when the variant ships.

### R4 — `<HarmonicLevelGrid>` / Filmstrip primitive (C gap G_filmstrip)

**Status**: out of scope per W3 spec.
**Cause**: single-consumer (fourier-analysis only); fails ≥2 call-site bar.
**Decision**: defer until ≥2 sites surface. fourier-analysis keeps the consumer-side implementation per `feedback_presets_in_consumer`.

### R5 — Blob Web Worker for state machine (SPEC.md §11.4)

**Status**: deferred per user lock at SPEC.md §11.4.
**Cause**: revisited only at 8+ multi-instance use cases. Currently zero consumers run 8+ concurrent blobs.
**Decision**: stay deferred. Wβ3 stress story exercises 8 instances; if any consumer's CI captures unacceptable performance numbers under the 8-instance budget, a later tranche promotes the worker.

## Count

5 residuals. Hits the ≤5 hard gate exactly.

## Authority

Residuals enumerated at G close. Each has a named destination (follow-up pass for R1; consumer CI for R2; future tranche for R3; ≥2-bar trigger for R4; performance signal for R5). No silent deferrals per the precept.
