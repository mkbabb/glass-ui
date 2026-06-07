# Repatriation decision — the resolved policy + verdict set

Authoritative outcome of the speedtest-specific-component repatriation audit
(2026-06-07). Supersedes the per-family digests' individual verdicts where the
user's policy call overrides them. The per-family digests under this dir hold the
consumer census evidence; THIS file holds the binding disposition.

## The policy (user, 2026-06-07)

> "For speedtest, speedtest-specific items should be REMOVED from glass-ui and
> placed natively within speedtest." + "Muster does not count. And the
> instrument chassis is not general enough, too."

The decisive lens (user, refined 2026-06-07 over the scrolling-text question):
the test is **GENERIC ATOM vs DOMAIN-SPECIFIC COMPOSITION**, not a raw
consumer-count. A component stays in glass-ui if it is a **general UI primitive
by KIND** — a value pill, a status dot, a number reel, an overflow marquee, a
loading spinner — even with a single current consumer (it is the kind of atom a
design system ships proactively, and "is exported" satisfies glass-ui's overfit
invariant). A component **repatriates** if it is a **domain-specific instrument
COMPOSITION** — a metric readout tile, a metric ledger stack, an instrument
chassis cluster — tied to the dashboard/instrument domain.

**speedtest and muster do NOT count as keep-justifying consumers for the
COMPOSITIONS** — they are the instrument/domain apps whose bespoke compositions
belong native to them. But a GENERIC ATOM stays shared regardless of which app
consumes it (it is general by construction). So: instrument-chassis "is not
general enough" (a composition) → repatriate; scrolling-text/pulse ARE general
(atoms) → keep, even though only speedtest/muster consume them today.

## The verdict set

| Family | Kind | Verdict | Lands native in |
|---|---|---|---|
| **metric-cell** | domain composition (metric readout tile) | **REPATRIATE** | speedtest + muster |
| **metric-stack** (MetricStack + MetricRow) | domain composition (metric ledger stack) | **REPATRIATE** | speedtest + muster |
| **instrument-chassis** (InstrumentChassis + ChassisDivider) | domain composition — "not general enough" | **REPATRIATE** | speedtest + muster |
| **scrolling-text** (ScrollingText) | **generic atom** (overflow marquee) | **KEEP** | stays shared |
| **pulse** (Pulse) | **generic atom** (loading spinner) | **KEEP** | stays shared |
| **metric-badge** (MetricBadge) | generic atom (value+unit pill) — fourier ×13 | **KEEP** | stays shared |
| **animated-digit** (AnimatedDigit) | generic atom (number reel) — fourier | **KEEP** | stays shared |
| **status-dot** (StatusDot) | generic atom (status dot) — keyframes ×2 | **KEEP** | stays shared |
| **metric-pill** (MetricPill) | zero consumers — demo-only overfit | **PRUNE** | — (delete) |
| **instrument-rail** (InstrumentRail) | zero consumers — speedtest retired it AN-D6 | **PRUNE** | — (delete) |

The repatriation set is the THREE domain-specific instrument compositions:
**metric-cell, metric-stack, instrument-chassis**. The generic atoms
(scrolling-text, pulse, metric-badge, status-dot, animated-digit) STAY shared —
they are general UI primitives by kind, the proactive surface of a design system,
regardless of single-app consumption. metric-pill + instrument-rail are true
orphans (zero consumers) → plain prune.

### Consumer evidence (verified at HEAD, per the per-family digests)

- metric-cell REPATRIATE: speedtest `ResultDetailSheet.vue:7` (×4) + muster `TravelMatrix.vue:27,88`.
- metric-stack REPATRIATE: speedtest `ResultStack.vue:116` (2 stack + 4 row) + muster `RankedVerdict.vue:40` + `WhyThisWonSheet.vue:35`.
- instrument-chassis REPATRIATE: speedtest `App.vue`/`MapView`/`ChartsView` (×4) + muster App-shell `variant="spine"` + `WinnerHero` ×2 + `InstrumentAside` ChassisDivider ×3.
- scrolling-text KEEP (generic marquee): speedtest `AppSettingsButton.vue` (×4) + `ResultDetailSheet.vue` (×1) — only consumer today, but general by kind + exported; re-evaluate if it stays single-consumer long-term.
- pulse KEEP (generic spinner): speedtest (×7) + muster `CommandDock.vue:148`.
- metric-badge KEEP: speedtest `SurveyResultDock.vue` (×2) + fourier (7 files, ×13) + muster (×6).
- animated-digit KEEP: fourier `CoefficientsSpectrum.vue:19,99` (speedtest does NOT consume it).
- status-dot KEEP: muster (×6) + keyframes demo (×2).
- metric-pill PRUNE: zero external; demo story only. (Does NOT compose into metric-cell — that premise was false; metric-cell imports only vue+cn.)
- instrument-rail PRUNE: zero consumers anywhere; speedtest retired the rail posture at AN-D6/D7/D11.

## Cross-repo execution sequencing (inv-16': native-first, prune-after)

A repatriated component must land native in its consumer(s) BEFORE glass-ui prunes
it, so no consumer ever resolves a pruned glass-ui with a dangling import:

1. **speedtest** gains native copies (metric-cell, metric-stack, instrument-chassis) + rewrites its imports to local — on its CURRENT pin (3.1.0 still has them). A speedtest AV repatriate-receive wave. (speedtest KEEPS importing scrolling-text + pulse from glass-ui — those stay shared.)
2. **muster** gains native copies (metric-cell, metric-stack, instrument-chassis) + rewrites its imports to local — on its current pin. A muster L repatriate-receive wave. (muster KEEPS importing pulse from glass-ui.)
3. **glass-ui** prunes the 3 repatriated compositions + the 2 orphans (metric-pill, instrument-rail) — dirs, `src/subpaths/*.ts` mirrors, `api/index.ts` types, `package.json` exports + `typesVersions`, the `components/custom/index.ts` re-exports, the demo stories, the gate-registry lines, the tests. Clean break, no shim. This lands in the AW.W19 (re-scoped) repatriation-prune wave.
4. **glass-ui publishes** the pruned cut (folded into the 3.4.0 dock-fix cut, or a follow-on).
5. **speedtest + muster bump** to the pruned glass-ui — their repatriated imports already point local, so the bump is a clean version-only move.

KEEP families (scrolling-text, pulse, metric-badge, animated-digit, status-dot)
are untouched in glass-ui; their consumers keep importing them from the library.
The `.metric-badge` CSS utilities stay (consumed by all three of speedtest/fourier/muster).

## Net glass-ui surface delta

- **−3 repatriated compositions**: metric-cell, metric-stack, instrument-chassis (+ChassisDivider).
- **−2 pruned orphans**: metric-pill, instrument-rail.
- 5 subpaths retired, 5 `custom/`/`ui/` dirs removed, the corresponding `/api` types + `package.json` exports struck.
- The generic atoms (scrolling-text/pulse/metric-badge/status-dot/animated-digit) stay — the library keeps its general-primitive surface and sheds only the domain-specific instrument compositions + the true orphans.
