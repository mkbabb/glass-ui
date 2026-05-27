# Tranche AM — FINAL (close report)

**Tranche letter**: AM — consumer-gap root-redress.
**Close-state**: `complete_with_misses` — one documented pre-existing, out-of-scope miss (gate 9 aggregate `proof:all`, isolated to sibling consumer-repo debt). All 16 consumer gaps dispositioned; all in-glass-ui release gates green.
**Span**: 2026-05-26 (single session).
**Predecessor**: AJ (v2.0.0). **Version**: v2.0.0 unchanged (no release bump — additive fixes; consumers pick up via the contract-v2 `file:` seam).
**Origin**: muster (dine-vote) E-tranche cross-repo audit; the binding directive "all gaps addressed at the glass-ui root."

## §1 — Thesis recap

AM closed the glass-ui root gaps a downstream consumer (muster) worked around across its A-E stack. Of 16 gaps: 10 LANDED at the root, 3 were already closed at HEAD, 4 ARCHIVED on the substrate-without-consumer-binary 2-consumer gate (with named realisation conditions), 1 is correctly consumer-side. Aurora was hardened with an adaptive `renderMode` substrate and a config-default — never retired. The close-ceremony proof gates surfaced two pre-existing in-glass-ui packaging-contract failures, both fixed at the root.

## §2 — Gate table

| # | Tranche gate | Status | Evidence |
|---|---|---|---|
| 1 | build + typecheck clean | MET | `typecheck` exit 0; `build` exit 0 (1m1s after W1) |
| 2 | tw-animate-css peer | MET | `package.json` peer + optionalPeer; `5befe07` |
| 3 | `--muted-foreground` AA | MET | light 5.23:1 / dark 7.39:1; `audit/W0-token-contrast.md` |
| 4 | NumberField input aria | MET | `v-bind="$attrs"` → reka input; `audit/W0-forms-a11y.md` |
| 5 | Aurora renderMode + config default | MET | `renderMode.ts` + withDefaults factory; `audit/W1-aurora-rendermode.md` |
| 6 | chunk disclosure + root-barrel shake | MET | per-subpath table; aurora.js absent from glass-ui.js reach; `profile:budget` green; `audit/W2-bundle-disclosure.md` |
| 7 | consumer-wiring docs | MET | CLAUDE.md §Consumer wiring + §Component architecture |
| 8 | disposition ledger complete | MET | all 16 gaps; `audit/W3-disposition-ledger.md` |
| 9 | proof gates green | MET (in-scope) / MISS (aggregate) | `verify-export-types` ✓, `proof:package` ✓, `proof:theme` ✓, `proof:resolution` ✓; **`proof:all` aggregate RED only at `proof:consumers:static`** — pre-existing sibling-consumer-repo debt, named successor (§4) |
| 10 | cross-repo seam | MET | `dist/` rebuilt (gitignored — propagates to muster via the `file:` symlink); E.W8 handoff named (§5) |

## §3 — Commits

| Commit | Wave | What |
|---|---|---|
| `4951c82` | plan | AM plan — 4 waves, 16-gap disposition ledger |
| `5befe07` | W0.1 | tw-animate-css peerDep + `--muted-foreground` AA darken |
| `222a90c` | W0.2 | NumberField input-level aria forward |
| `442460d` | W0 close | token-contrast + forms-a11y evidence |
| `6666d25` | W1 | Aurora config-default + renderMode adaptive substrate |
| `d083703` | W1 close | aurora render-mode runtime probe |
| `26204a4` | W2 | per-subpath gzipped-size disclosure |
| `b5f3c6f` | W2 | CLAUDE.md consumer-wiring docs |
| `ae84e0c` | W2 close | bundle-disclosure evidence |
| (this) | W3 | verify/proof script asset-export fixes + close docs |

## §4 — Misses + named successors

**Gate 9 aggregate `proof:all` — pre-existing, out-of-scope.** RED only at `proof:consumers:static`, which scans sibling consumer repos. Every failure is speedtest-side (root-barrel imports that should be subpaths; stale `@mkbabb/glass-ui/metaballs` references broken at `5e79443`; src-relative style paths) or keyframes.js-side (root-barrel `useTouchGate`), plus stale `.claude/worktrees/agent-*` copies. None introduced by AM; none a muster consumer gap. **Named successor**: a glass-ui-constellation consumer-import-discipline tranche (speedtest-side import migration + retired-subpath cleanup + stale-worktree sweep). The in-glass-ui proof gates are all green; AM's own surface is clean.

No other misses. The 4 ARCHIVED gaps (7/8/9/12) are not misses — they are correct substrate-without-consumer-binary dispositions with named realisation conditions (§W3-disposition-ledger §1).

## §5 — Cross-repo handoff (muster E.W8)

muster consumes the AM `dist/` through `"@mkbabb/glass-ui": "file:../../glass-ui"` under the contract-v2 seam. The rebuilt `dist/` (post-W1 build) carries every AM fix. muster's E.W8 (seam verification) consumes:

- Badge `variant="warning"` (already-shipped) — consume directly, retire any local fallback.
- Aurora `:render-mode="'auto'"` (AM.W1) — now resolves against a REAL prop (was a passthrough no-op before AM); the warm wash adapts per device.
- `--muted-foreground` AA (AM.W0) — muster's dine-vote-side override may now be redundant; reconcile/retire.
- NumberField input aria (AM.W0) — muster's labelled NumberFields announce their inputs.
- ChipField + graduated tokens (gaps 7/8/9/12) — ARCHIVED at AM; muster's dine-vote-side fallbacks STAY; E.W8 re-confirms the deferral.

## §6 — Net substrate delta AJ → AM

- **2 packaging fixes** — tw-animate-css peerDependency declaration; vestigial-export hygiene (none removed — `./fonts/*` confirmed load-bearing; the verify-script learned to tolerate the asset wildcard).
- **1 token darken** — `--muted-foreground` light + dark rungs (AA).
- **1 a11y fix** — NumberFieldInput attr forwarding.
- **1 new prop + 1 new module** — `<Aurora renderMode>` + `src/components/custom/aurora/renderMode.ts` (exported `resolveRenderMode` + `AuroraRenderMode`).
- **1 profiling feature** — per-subpath gzipped-size table.
- **2 release-gate repairs** — `verify-export-types` asset-export tolerance; `proof:package` stale-probe fix.
- **CLAUDE.md** — 5 consumer-wiring + architecture doc sections.
- **ZERO new subpath exports**; **ZERO new whole primitives** (4 candidates ARCHIVED on the 2-consumer gate); **ZERO consumer breaks** (every change additive or a transparent fix).

## §7 — Authority

- Plan: `docs/tranches/AM/AM.md`. Log: `docs/tranches/AM/PROGRESS.md`. Waves: `docs/tranches/AM/waves/W{0,1,2,3}.md`. Audit: `docs/tranches/AM/audit/W{0,1,2,3}-*.md`.
- Cross-repo origin: muster `docs/tranches/E/audit/GLASS-UI-{gap-matrix,aurora-lazy-init,cross-repo-plan}.md`.
- Consumption handoff: muster `docs/tranches/E/waves/W8.md`.
