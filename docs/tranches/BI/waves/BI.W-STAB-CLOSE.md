# BI.W-STAB-CLOSE — the release `test` step goes green (the STAB-B trio)

Band B0 (cut-blocker). Born-RED at HEAD.

## Mandate

- **STAB-B-1 [P0]**: the ci/release gate battery FAILS at the release-tagged `test` step (50 vitest failures, 6 errors, 12 files) at step 2, BEFORE the FAM-1 proof gates run — the 5.0.0 tag cannot fire at the first substantive gate. (`gates.manifest.mjs:60-63`, `test` tagged `local/ci/release`.)
- **STAB-B-2 [P1]**: `GlassDock` `autoLuminance` default-TRUE (BG.W-GLASS-SIGNAL-TRUTH) calls `document.elementsFromPoint` (undefined in happy-dom), crashing ~30 dock unit tests; the wave never re-ran the dock suite.
- **STAB-B-3 [P1]**: `proof-doc-consistency.test.ts` 6/6 red — the gate re-homed to docs/canon at BH.B5c but the test still expects the CLAUDE.md parser (the gate itself PASSES).
- **STAB-B-4 [P2]**: the `/dock` public runtime surface grew 22→27 with 5 unregistered `siri-*` symbols; the frozen snapshot was never updated (+ aurora `derive-aurora` L-monotonic 1 fail, `demo-dock-nav.detect` 3/8).

## Design

The `test` step is `local/ci/release`-tagged (`gates.manifest.mjs`), promoted to the RELEASE set so a stale unit test fails the release BEFORE the publish. It halts the battery before `proof:encapsulation/demo/no-god-module` even run. The cut-precondition is a GREEN `--run full` aggregate (BB.W-CLOSE-BATTERY canon — the deduped `local ∪ ci ∪ release` union siblings-absent), NOT the individual proof gates. This wave clears the deterministic test-step reds:

1. **autoLuminance × happy-dom** — the product path is CORRECT (autoLuminance default-TRUE is the shipped signal, BG.W-GLASS-SIGNAL-TRUTH; NOT to be reverted). The test env lacks `document.elementsFromPoint`. Fix = a happy-dom POLYFILL in `tests/setup.ts` (stub `document.elementsFromPoint` → `[]`), NOT a product-side capability-gate that would silently no-op the primary (the NO-MASKING-FALLBACK edict — a test-env stub is honest; a product fallback that hides a dead primary is the crime). Add the dock unit suite to the autoLuminance close obligation.
2. **doc-consistency test** — the gate PASSES (re-homed to docs/canon at BH.B5c); the CLAUDE.md-parser test fixtures are stale AND CLAUDE.md is hard-deleted at B9. Clean break: DELETE `proof-doc-consistency.test.ts` in favour of the gate's own `--selftest` (no legacy CLAUDE.md-shaped fixture survives).
3. **/dock surface snapshot** — update `tests/public-surface.spec.ts` to the TRUE current surface. The `siri-*`-belongs-on-public-`/dock` adjudication is a D-DOCK (B3) concern (the greenfield restructures the dock); this wave makes the snapshot HONEST to the current tree so the battery unblocks. Fix the luminance-independent reds too (aurora L-monotonic, `demo-dock-nav.detect`) OR route them to their owning bands (D-VIZ / D-DOCK) if not deterministic here — but the `--run full` GREEN is the collective cut-precondition.

## Work

- `tests/setup.ts` — polyfill `document.elementsFromPoint` (→ `[]`) for the happy-dom env (unblocks ~30 dock tests: DockLayerRail.a11y, scroll-overflow, touch-gate, vertical-collapse, motion-parity, dock-orchestrator, dock-hold, components.smoke, vt-names).
- `scripts/__tests__/proof-doc-consistency.test.ts` — DELETE (the gate `proof:doc-consistency` carries its own `--selftest`; the CLAUDE.md-parser fixture is doubly-stale, CLAUDE.md deleted at B9).
- `tests/public-surface.spec.ts:110-118` — update `keeps-exact-dock-runtime-surface` to the current 27-symbol surface (register or exclude the 5 `siri-*` symbols per the D-DOCK adjudication); fix the aurora `derive-aurora` L-monotonic + `demo-dock-nav.detect` reds or route to D-VIZ/D-DOCK.
- Re-run `node scripts/gates.mjs --run ci` — the `test` step exits 0 (the battery reaches the proof gates).

## Acceptance

Gate: **the `test` step (vitest) in `gates.mjs --run full`** — exit 0 at close (BORN-RED at HEAD: 50 failures / 6 errors / 12 files).

Clauses:
- S1 the dock unit suite passes (autoLuminance polyfill in tests/setup.ts).
- S2 `proof-doc-consistency.test.ts` absent; `proof:doc-consistency --selftest` GREEN.
- S3 `tests/public-surface.spec.ts` reflects the true `/dock` surface (snapshot honest).
- S4 `gates.mjs --run ci`/`--run full` reaches + passes the proof gates (the battery unblocked).
- Bite: re-introducing the CLAUDE.md-parser fixture, or a stale snapshot count, REDs the battery again (the standing test-step contract).

## π/DELTA

None — device-free test-harness repair; zero pixel change. (The autoLuminance PRODUCT paint is unchanged — only the happy-dom test env gains a stub.)

## Obligations

- **Adjudication carry to D-DOCK (B3)**: whether the 5 `siri-*` symbols belong on the public `/dock` surface — the greenfield decides terminally; this wave only makes the snapshot honest so the cut battery runs.
- **Cut-precondition**: a GREEN `--run full` aggregate siblings-absent (BB.W-CLOSE-BATTERY) is the B10 close bar; this wave clears the `test` step so the battery reaches the FAM-1 proof gates.

## Dispositions

- Discharges the **STAB-B** trio (STAB-B-1/2/3/4). Terminalizes the "the wave never re-ran the dock suite" stale-gate-green class for the autoLuminance signal.
