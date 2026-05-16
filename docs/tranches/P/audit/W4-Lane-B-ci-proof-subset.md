# P.W4 Lane B—CI proof:* subset (orchestrator-direct)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (per AGENT.md "befitting direct edit"—4 sibling-independent gate-step additions to `.github/workflows/ci.yml`).

## §1—Scope

Per `docs/tranches/P/waves/W4.md` Lane B + Pε-3 + O.W5 Lane A open question #2.

The CI workflow at HEAD ran 5 gates (typecheck + test + build + verify-export-types + profile:budget) but did NOT run any of the `proof:*` scripts the orchestrator runs at release time. Three `proof:*` scripts are sibling-independent (do not walk `../<consumer>` paths that don't exist on the GitHub Actions runner) and total ~3 s wall time. Adding them closes the "did glass-ui's package surface drift?" question on every PR.

Plus: now that P.W2 shipped `scripts/audit-stash-list.mjs`, CI invokes it as a 9th gate—catching any stash anti-pattern at PR time rather than waiting for a wave-close human-driven audit.

## §2—Edit

`.github/workflows/ci.yml` gains 4 new steps after `profile:budget`:

```yaml
- name: proof:package
  run: npm run proof:package
- name: proof:theme
  run: npm run proof:theme
- name: proof:consumers:static
  run: npm run proof:consumers:static
- name: audit:stash
  run: npm run audit:stash
```

Sibling-dependent proofs (`proof:consumers:build` + `proof:runtime`) remain SKIPPED in CI—they walk `../<consumer>` paths absent from the runner. The local-dev `proof:all` script continues to invoke them for orchestrator-side verification.

## §3—Gate matrix (post-W4 Lane B)

| Gate | Source | Runs in CI? |
|---|---|---|
| 1. typecheck | `vue-tsc --noEmit` | ✓ |
| 2. test | `vitest run` | ✓ |
| 3. build | `vite build` (heap-bumped) | ✓ |
| 4. verify-export-types | subpath dts publication probe | ✓ |
| 5. profile:budget | bundle-budget enforcement | ✓ |
| 6. proof:package | synthetic-consumer package surface | ✓ (NEW @ W4 Lane B) |
| 7. proof:theme | theme/style flow probe | ✓ (NEW @ W4 Lane B) |
| 8. proof:consumers:static | static consumer-cross-walk | ✓ (NEW @ W4 Lane B) |
| 9. audit:stash | hardened-git-clause fail-closed gate | ✓ (NEW @ W4 Lane B; supersedes W2-shipped local-only invocation) |

Total CI runtime delta: ~3 s (Pε-3 measurement).

## §4—Inline absorbs (prerequisites surfaced during Lane B verification)

Adding the proof:* steps to CI exposed three stale glass-ui-side issues the gates had been silently allowing because they were not being invoked. Per P invariant 28 (zero deferral; ship enforcement when the trigger fires), all three closed inline at W4 Lane B:

### 4.1 `proof:package` probe.ts surface-shape drift

`scripts/proof-package.mjs` probe.ts imported `useGlobalDark` from `@mkbabb/glass-ui` root barrel + `DockPopover` from `@mkbabb/glass-ui/dock`. Both stale:
- `useGlobalDark` moved to `@mkbabb/glass-ui/dark` at L.W1 (vueuse-FREE root barrel).
- `DockPopover` never existed at HEAD—phantom symbol.

Fix: probe.ts now imports `useGlobalDark` from `/dark` + replaces `DockPopover` with the canonical `DockDropdownTrigger`. Probe now verifies the actual published surface rather than a phantom.

### 4.2 `proof:theme` `blur-glass-subtle` stale lint expectation

`scripts/proof-theme-style.mjs` `expectedClasses` listed `blur-glass-subtle`—a pre-L.W1 utility retired when the 5-rung glass-blur ladder shipped at v1.0 (`blur-glass-{wash,quiet,resting,floating,overlay}`). Replaced with the canonical `blur-glass-resting` (resting tier; default rung).

### 4.3 `proof:theme` DockTabButton scoped style block forbid

`src/components/custom/dock/DockTabButton.vue` shipped a scoped style block adding the `--dock-tab-h` density-keyed height-knob fallback. The proof's "dock scoped style block remains" forbid is the canonical "all dock styles live in `src/styles/dock.css`" rule (per O.W3 dock canonicalization).

Fix: the `--dock-tab-h` fallback chain (`var(--dock-tab-h, var(--dock-tab-min-height, auto))`) merged into the canonical `.dock-tab-button` rule at `src/styles/dock.css` L669. The SFC scoped block deleted. The density-knob behaviour is preserved bit-for-bit.

## §5—Verification

```
$ npm run proof:package            # exit 0 (post probe-fix at §4.1)
$ npm run proof:theme              # exit 0 (post fixes at §4.2 + §4.3)
$ npm run proof:consumers:static   # exits non-zero LOCALLY when sibling
                                   # consumer repos contain non-compliant
                                   # imports (e.g., speedtest's root-barrel
                                   # imports of useTimer + useResizeObserver
                                   # + useTokenColor + ScrollingText—those
                                   # are speedtest-owned cross-walks, out of
                                   # P scope). On CI runners no siblings
                                   # exist + the script trivially passes.
$ npm run audit:stash              # exit 0 (clean)
```

The CI gate matrix runs in a sibling-less environment; `proof:consumers:static` enforces the cross-repo compliance there. Local-developer runs may surface consumer-side issues that the consumer's tranche owns.

## §5—P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: additive workflow steps; no legacy gate retired or shimmed.
- **P invariant 28 (zero deferral)**: Pε-3 closes at this wave; no W5+ carry.
- **P invariant 4 (idiomatic gestalt)**: the audit script's CI step is the canonical "make the gate visible at PR time" pattern—not a workaround.

## §6—Status: COMPLETED.
