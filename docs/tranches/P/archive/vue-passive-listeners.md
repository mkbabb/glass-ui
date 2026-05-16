# PD-1 archive—Vue passive listeners (L-residual)

**Date**: 2026-05-16.
**Status**: ARCHIVED-PERMANENT—platform-API-level optimization out of glass-ui-substrate scope.
**Source**: L tranche residual → M → N → O → P inheritance ledger PD-1.

## §1—Investigation

The L tranche surfaced a question about Vue 3.5's event-listener defaults vs explicit `{ passive: true }` opt-in for `touchstart` / `touchmove` / `wheel` handlers in glass-ui primitives.

Vue 3.5's @vue/runtime-dom internally applies `{ passive: true }` to `touchstart` / `touchmove` / `wheel` listeners by default (per Vue's DOM patch behaviour—`compileNamesToCheck` + `addEventListener` paths). Consumers needing non-passive behaviour explicitly opt in via the `.passive: false` event modifier (e.g., `@touchmove.passive.prevent="..."` where preventing default is intentional).

## §2—Rationale for permanent-out-of-scope

Three reasons:

1. **Platform-API-level optimization**: passive-listener defaults are a Vue runtime concern, not a glass-ui substrate concern. Glass-ui's primitives compose Vue's standard event syntax; opt-in/out is consumer-controlled at the listener site.
2. **No glass-ui-substrate gap**: every passive-eligible listener in glass-ui primitives is registered through Vue's standard `@touchstart="..."` / `@wheel="..."` syntax—i.e. Vue's defaults flow through. There is no substrate-level "passive policy" to enforce.
3. **Consumer-controlled override**: consumers needing non-passive behaviour explicitly mark via Vue's `.passive: false` modifier. Glass-ui does not need to expose a "passive" prop on every primitive that ships touch handlers; that would be substrate inflation.

## §3—Disposition

ARCHIVED-PERMANENT. The carry-forward chain (L → M → N → O → P) terminates here. Future tranches do NOT inherit PD-1.

If a specific primitive needs non-passive opt-out (e.g., a gesture-binding case where the listener must `preventDefault()`), that's a per-primitive escape-hatch decision at the SFC level—not a substrate-wide opt-out.

## §4—Cross-references

- `docs/tranches/P/waves/W6.md` §"PD-1—L-vue-passive-listeners".
- `docs/tranches/P/findings.md` §2 PD-1.
- Vue 3.5 @vue/runtime-dom event-listener defaults documentation.

## §5—Status: ARCHIVED-PERMANENT.
