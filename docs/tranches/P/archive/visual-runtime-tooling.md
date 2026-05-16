# Archive—π visual-runtime tooling

**Disposition**: ARCHIVED-PERMANENT (opt-in tooling-only for future tranches).
**Date**: 2026-05-16 (P.W6 close).
**Source**: N.W4 (1st deferral) → O.W7 (2nd deferral) → P.W6 (3rd deferral; permanent archive).

## § History—3 consecutive deferrals

| Tranche close | Lane | Disposition | Proof doc |
|---|---|---|---|
| N.W4 (2026-05-12) | π visual-runtime | TOOLING-DEFERRED (1st) | `docs/tranches/N/audit/N-audit-pi-visual-runtime.md` |
| O.W7 (2026-05-14) | π visual-runtime | TOOLING-DEFERRED (2nd) | `docs/tranches/O/audit/W7-pi-visual-runtime.md` |
| P.W6 (2026-05-16) | π visual-runtime | TOOLING-DEFERRED (3rd → permanent archive) | `docs/tranches/P/audit/W6-audit-epsilon-pi-iota.md` §3 |

Per P.W6.md spec §"π visual-runtime: 3rd consecutive deferral if MCP still unreachable. Authorized to formal-archive if tooling fix isn't identifiable"—the archive trigger fired.

## § Probe outcome (P.W6 attempt)

```
ToolSearch select:mcp__claude-in-chrome__tabs_context_mcp,...,read_page → 3/3 schemas loaded
mcp__claude-in-chrome__tabs_context_mcp() → "Browser extension is not connected.
  Please ensure the Claude browser extension is installed and running
  (https://claude.ai/chrome), and that you are logged into claude.ai with the
  same account as Claude Code."
```

Schema surface available; runtime bridge unreachable. Identical disposition to N.W4 + O.W7.

## § Permanent rationale

1. **Tooling-side root cause is out of glass-ui scope.** The MCP browser-extension bridge is a Claude Code infrastructure dependency. Glass-ui cannot fix the connectivity gap from inside the library repo.

2. **Consumer-side visual probes DO run and provide coverage.** Speedtest's headless harness (per AC tranche docs at `/Users/mkbabb/Programming/speedtest/docs/tranches/AC/`) exercises live runtime behavior on the substrate that glass-ui ships—visual regression at the consumer end will surface glass-ui-side breakage. Substrate-level static-analysis (read-source verification at every close ceremony α/β/γ/δ lanes) plus consumer-side runtime probes constitute sufficient coverage at v1.x maturity.

3. **Playwright alternative was not wired in P.** P.W6.md spec mentioned "Playwright + Chrome MCP probe IF tooling reconnects"—the OR clause was tooling-conditional. No `playwright` dep exists in glass-ui's `package.json`; adding one would require a separate infrastructure decision (out of audit-lane scope).

4. **Three-strike rule per the close-honesty checklist.** Two prior deferrals (N.W4 + O.W7) carried forward as named items. A third deferral without infrastructure progress is no longer a "carry-forward"—it is a structural gap that should be made explicit via formal archive rather than perpetually deferred.

## § Recommendation for future tranches

**Future tranches treat π visual-runtime as OPT-IN tooling-only.** Specifically:

- π lane is NOT a default audit lane. Tranche-open documents must explicitly enumerate π in the lane plan IF (a) tooling has reconnected (verified via `mcp__claude-in-chrome__tabs_context_mcp` smoke probe at tranche open), OR (b) the tranche has chosen to wire a Playwright runner.
- Default substrate-runtime coverage is the consumer-side responsibility:
  - speedtest AC tranche → headless harness + dev-server runtime probe.
  - words/frontend → user-driven smoke at consumer release boundaries.
  - keyframes.js → gh-pages deploy smoke.
- Library-side coverage at close ceremonies is static-analysis-only (α/β/γ/δ lanes)—sufficient for v1.x maturity given the binary substrate-without-consumer invariant (L invariant 8).

## § Carry-forward items that no longer block (permanent)

The O.W7 π proof doc enumerated 8 carry-forward items for P.π. Per this archive, those items are now retired:

| Item from O.W7 carry-forward | Final disposition |
|---|---|
| `dock-with-slider.vue` runtime regression sweep | RETIRED—consumer-side smoke covers; static-analysis on Slider/Dock at each α/β lane suffices |
| `useClipboard` demo story | LANDED at P (consumer adoption sites: value.js 19-site flip + fourier-analysis + bbnf-buddy via CR-1/CR-2/CR-5) |
| `HeaderRibbon` demo story | LANDED at P (consumer adoption: keyframes.js CR-3 + value.js CR-4 HeaderRibbon retire+re-adopt) |
| `.dock-icon-button` token-ladder demo story | RETIRED—token ladder is backward-compatible no-op for default consumers; runtime override is opt-in (no demo needed) |
| `@utility scale-on-hover` demo story | LANDED at P (consumer adoption: keyframes.js + words/frontend P.W5 cross-walks) |
| Fira Code woff2 binary integration | LANDED at AC.W6b (speedtest-side self-host subsystem v1.5.0) |
| WCAG `--chart-{phase}-label` contrast measurement | RETIRED—consumer-side audit covers (speedtest AC.W6c) |
| 375×667 touch-viewport sweep | RETIRED—`@media (pointer: coarse)` is static-CSS-verifiable; runtime probe is luxury |
| Playwright runner addition | DEFERRED-INDEFINITE—opt-in only per recommendation above |

## § Disposition

ARCHIVED-PERMANENT.

Subsequent tranches MAY re-open π if (a) the MCP bridge reconnects and a tranche-open smoke probe confirms it, or (b) a Playwright runner is wired as a separate infrastructure decision. Until then, π is not a default lane and is not a close-blocker.
