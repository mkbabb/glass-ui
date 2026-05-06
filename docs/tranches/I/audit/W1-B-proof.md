# I.W1 Lane B — Cross-Tranche Silent-Addition Wire-or-Retire Proof

**Date**: 2026-05-05
**Lane**: B (5 cross-tranche silent additions: 4 P-tranche + 1 Q-tranche)
**Method**: read-only walk; `rg` across `src/`, `demo/`, `../speedtest/src`; no source edits.
**Authority**: I.md invariant 3 ("Cross-tranche silent surface additions are owned in I.W1") + W1.md Lane B method.
**Cross-repo reach**: speedtest worktree at `/Users/mkbabb/Programming/speedtest/src/` is filesystem-reachable; speedtest has no `demo/` dir (single-app structure). The bbnf-lang and other cross-repo trees were not enumerated in this lane (W0 §0 named only speedtest as the cross-repo for these 5 packages).

## Summary table

| # | Package | Originating tranche | Verdict | In-repo sites | Cross-repo sites | Total distinct files | Cross-repo evidence reachable |
|---|---|---|---|---:|---:|---:|---|
| 1 | `instrument-chassis` | P | **WIRE** | 1 (demo) | 5 (4 views/host + 1 test stub) | 6 | yes (speedtest) |
| 2 | `glyph-face` | P | **WIRE** | 3 (2 demo + 1 sibling primitive) | 6 (5 .vue + 1 test stub; 2 doc-comment refs in icons/) | 9 | yes (speedtest) |
| 3 | `disco-glyph` | P | **WIRE** | 2 (demo + cross-ref) | 4 (4 disco icon wrappers) | 6 | yes (speedtest) |
| 4 | `dock-group` | P | **WIRE** | 1 (demo) | 1 (`MetricStrip.vue`) | 2 | yes (speedtest) |
| 5 | `hover-popover` | Q | **WIRE** | 1 (demo) | 2 (`SettingsCog.vue` + `ActionCluster.vue`) | 3 | yes (speedtest) |

**Verdict tally**: 5 WIRE, 0 RETIRE-PROPOSED.

## Per-package consumer counts (≥ 2 bar test)

The W1.md Lane B method is: `≥ 2 distinct consumer files → WIRE + emit consumer-evidence doc`. All 5 packages clear this bar with cross-repo evidence reachable.

| Package | Distinct consumer files | Bar (≥ 2) | Evidence doc |
|---|---:|---|---|
| `instrument-chassis` | 6 | clears | `docs/consumer-evidence/instrument-chassis.md` |
| `glyph-face` | 9 | clears | `docs/consumer-evidence/glyph-face.md` |
| `disco-glyph` | 6 | clears | `docs/consumer-evidence/disco-glyph.md` |
| `dock-group` | 2 | clears (at the bar) | `docs/consumer-evidence/dock-group.md` |
| `hover-popover` | 3 | clears | `docs/consumer-evidence/hover-popover.md` |

## Verification commands (re-runnable at any HEAD)

```bash
# 1. instrument-chassis
rg -l 'InstrumentChassis|RegionDivider|InstrumentChassisPhase' \
   src/ demo/ ../speedtest/src 2>/dev/null

# 2. glyph-face
rg -l 'GlyphFace|GlyphFaceSilhouetteKey' \
   src/ demo/ ../speedtest/src 2>/dev/null

# 3. disco-glyph
rg -l 'DiscoGlyph' src/ demo/ ../speedtest/src 2>/dev/null

# 4. dock-group
rg -l 'DockGroup' src/ demo/ ../speedtest/src 2>/dev/null

# 5. hover-popover
rg -l 'HoverPopover' src/ demo/ ../speedtest/src 2>/dev/null
```

Each returns the consumer files cited in the corresponding evidence doc.

## Notes / risks

### Risk 1: `dock-group` is at the bar, not above it

DockGroup has exactly 2 distinct consumer files (one demo + one speedtest non-demo). It clears the ≥ 2 bar but has no headroom; if speedtest's `MetricStrip.vue` ever drops the wrapper in favor of inline-flex utilities (the consumer comment at `MetricStrip.vue:284` already notes "DockGroup ships its own inline-flex / gap / shelf rules" — a hint that the wrapper is a thin convenience), DockGroup falls under the bar and the verdict re-opens. CLAUDE.md catalogs it as `(P)` provisional; this evidence doc is what holds the WIRE verdict at HEAD.

### Risk 2: Cross-repo coordination for any later RETIRE

W1.md Lane B method §4: "If < 2 distinct consumers → propose RETIRE (do NOT actually delete; the originating cross-repo tranche orchestrator must coordinate)". This lane's verdict is uniformly WIRE so no cross-repo coordination is required at I.W1 close. If a future tranche's audit finds any of these 5 packages drop under the bar, the disposition flow is RETIRE-PROPOSED → notify P or Q-tranche orchestrator → coordinate the cross-repo retire.

### Risk 3: bbnf-lang and other cross-repo trees not enumerated

The dispatch prompt named `../speedtest/src` and `../speedtest/demo` as the cross-repo trees to walk. Speedtest is the only cross-repo named for these 5 packages in W0 §0. Other consumer repos (bbnf-lang, words, value, etc.) were not searched in this lane because the wave-spec did not name them as expected consumers for these specific P / Q-tranche additions. The verdict is "WIRE confirmed via reachable trees"; if any unenumerated tree is silently a consumer, this lane's count is a *floor*, not a ceiling — the WIRE verdict only strengthens, never weakens.

### Risk 4: Governance gap that allowed silent additions

W0 §8.1 named the underlying governance issue: 5 silent additions in 2 tranches without a binding precept that requires a glass-ui-side wire-or-retire pass for cross-repo-driven `src/components/custom/` additions. This lane *resolves* the wire-or-retire side for the 5 specific packages but does NOT close the governance gap itself. The W0 §8.1 recommendation to encode a precept-update via I.W0 Lane II is the durable fix; this lane's documentation-only output is the per-package symptomatic close.

## Hard gate

This lane is documentation-only:
- 5 `docs/consumer-evidence/<package>.md` files created (instrument-chassis, glyph-face, disco-glyph, dock-group, hover-popover)
- 1 `docs/tranches/I/audit/W1-B-proof.md` (this file)
- 0 source files modified
- typecheck + build green by construction (no source changes; sanity run at lane close per AGENT_DISPATCH_TEMPLATE.md)

## Files created

1. `docs/consumer-evidence/instrument-chassis.md`
2. `docs/consumer-evidence/glyph-face.md`
3. `docs/consumer-evidence/disco-glyph.md`
4. `docs/consumer-evidence/dock-group.md`
5. `docs/consumer-evidence/hover-popover.md`
6. `docs/tranches/I/audit/W1-B-proof.md` (this file)

## Authority

Read-only wire-or-retire audit at HEAD `5dbfe8a` (HEAD at audit time). 5 packages walked; 5 verdicts WIRE; 5 evidence docs emitted with file:line citations and re-runnable `rg` invocations. No source files modified; no commits made; no destructive git commands run. Speedtest cross-repo tree reachable and walked; bbnf-lang and other cross-repo trees not enumerated (not named in wave-spec for these 5 packages).
