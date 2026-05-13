# Rβ — Chronic Deferrals Ledger (N tranche)

Walk every J/K/L/M residual list; identify chronic deferrals (≥ 2 tranches); propose N dispositions per V2 (NO workarounds) + V3 (NO legacy code).

## Methodology

Sources walked:
- `docs/tranches/J/FINAL.md` — 14 named residuals
- `docs/tranches/K/audit/K-residuals.md` — 4 named residuals
- `docs/tranches/L/audit/L-residuals.md` — 4 P2 + 12+ P3 residuals
- `docs/tranches/M/audit/M-residuals.md` — 8 named N-deferred items
- Cross-tranche debt sections in each FINAL.md

## Full open-residual ledger (cross-tranche carry-forward at HEAD)

### J → K (14 items)

| ID | Origin | Severity | Current status | N disposition |
|---|---|---|---|---|
| J-1 / J-2 | J W1 | P1 | CLOSED (K W4 Lane A) | — |
| **J-3** | J W2 | P1 | CLOSED (K W3 Lane B; 5 focus-ring) | — |
| **J-4** | J W2 | P1 | CLOSED (K W3 Lane B; 4 P1 surface-tint) | — |
| J-5 | J W2 | P1 | CLOSED (K W3 Lane B; transition-all decomposed) | — |
| J-6 | J W1 | P2 | **OPEN** (--{success,warning,info}-foreground 0 consumers) | **RETIRE-WITH-RATIONALE** (V3) |
| J-7 / J-8 | J W1 | P2 | CLOSED (K W3 Lane A retired) | — |
| **J-9** | J π | P1 | CLOSED (K W5 story-pager max-width fix) | — |
| J-10 | J π | P2 | CLOSED (K W5 carousel pager flex-wrap) | — |
| J-11 | J ε | P2 | **OPEN** (stress harness retire decision) | **RETIRE-WITH-RATIONALE** (V3) |
| J-12 | J ε | P2 | CLOSED (K W4 Lane B file deleted) | — |
| J-13 | J W6 | P1 | CLOSED (K W6 btn-audacious shipped) | — |
| J-14 | J W5 | P2 | **OPEN** (drag-keep-open story-fidelity gap) | **ABSORB-IN-N** (N8 dock-collapse demo) |

### K → L (4 items)

All 4 CLOSED at L W4/W5 (R1 dock-tab overflow; R2/R3 doc cohorts; R4 surface-tint rungs).

### L → M (16 items)

| ID | Severity | Current status | N disposition |
|---|---|---|---|
| L-F-π-1 / L-F-π-2 | P2 | CLOSED (M W2 Lane C absorbed) | — |
| L-G4 / L-G14 | P3 | CLOSED (M W2 Lane C absorbed) | — |
| L-P3-1 (Textarea duplicate) | P3 | M γ verified no-issue | — |
| **L-P3-2** (GlassPanelVariant promotion) | P3 | CLOSED (M W2 Lane B promoted) | — |
| L-P3-3 (Aurora -inset-6 bloom) | P3 | **OPEN** | DEFER cosmetic |
| **L-F-ε-3** (Configurator recursion) | P2 | CLOSED (M W2 Lane A; CSS grid reveal + prop coercion) | — |
| L-story P3 cohort (G1-G3,G5-G13,G15-G19) | P3 | partially absorbed at M W2 Lane C (G16 + G17); rest **OPEN** | DEFER cosmetic or N10 absorb |
| L-W1-Lane-B git-checkout | P1 process | CLOSED (M W0 precept extension) | — |
| L-precept-submodule-push | P1 process | CLOSED (M W0 Lane II reconciled to `08a2e9c` → `46d6cfb`) | — |
| **L-vue-passive-listeners** | P2 cross-scope | **OPEN** (Vue upstream) | **PERMANENT-DEFER** (out-of-scope) |
| **L-cache-ttl** | P2 cross-scope | **OPEN** (hosting layer) | **PERMANENT-DEFER** (out-of-scope) |

### M → N (8 items)

| ID | Severity | Current status | N disposition |
|---|---|---|---|
| N-1 | P1 substrate | OPEN (`/freshness` 0 consumers) | **ABSORB-IN-N** retire-or-wire |
| N-2 | P1 substrate | OPEN (`DiscoGlyph` production-consumer audit) | **ABSORB-IN-N** (N11 venue) |
| N-3 | P1 substrate | OPEN (`useGlassAlpha` internal-usage check) | **ABSORB-IN-N** (N11 venue) |
| N-4 | P2 fast-follow | OPEN (26 pre-existing AA timeline-story typecheck errors) | **ABSORB-IN-N** fast-follow |
| N-5 | P1 fast-follow | OPEN (NEW dock-layer substrate regression) | **ABSORB-IN-N** (N8 venue) |
| N-6 | P3 cosmetic | OPEN (Demo carousel/metaballs import-path harmonisation) | DEFER cosmetic or N10 absorb |
| N-7 | P2 cross-debt | OPEN (Per-consumer CHANGELOG/MIGRATION proposals) | DEFER (cross-repo; user WIP branches) |
| N-8 | P3 cosmetic | OPEN (`_shared` package naming clarity) | DEFER cosmetic |

## Chronic deferrals (≥ 2 tranches)

| ID | Tranches deferred | Severity | Disposition |
|---|---|---|---|
| J-3 / J-4 / J-9 | J → K → L (absorbed at K) | P1 | CLOSED — historical chronic |
| L-vue-passive-listeners | J → K → L → M | P2 | **PERMANENT-DEFER** (Vue upstream; not glass-ui scope) |
| L-cache-ttl | J → K → L → M | P2 | **PERMANENT-DEFER** (hosting; not glass-ui scope) |

The only ACTIVE chronic deferrals at N open are the two out-of-scope items, which warrant formal PERMANENT-DEFER documentation, not absorption.

## N-new directives × residual intersection

| N-new directive | Residuals absorbed |
|---|---|
| **N6** (storybook mobile + configurators) | K-R1 (verify clean), N-6 (cosmetic), L-P3-3 (Aurora bloom story) |
| **N7** (dock blur reduction) | (no carry-forward; new substrate work) |
| **N8** (dock collapse facilities) | **J-14** (drag-keep-open demo), **N-5** (dock-layer substrate regression) |
| **N9** (glass panels frosted + typography) | L-story P3 cohort (per-story typography sweep) |
| **N10** (bidirectional style audit) | L-story P3 cohort (axis 6 typography), N-6 (cosmetic import-path) |
| **N11** (6-agent consumer post-migration audit) | **N-1** (`/freshness`), **N-2** (DiscoGlyph), **N-3** (useGlassAlpha), **N-4** (AA timeline typecheck), J-6 (color-foreground retire decision) |

## Items proposed RETIRE-WITH-RATIONALE per V3

| ID | Rationale |
|---|---|
| J-6 (`--{success,warning,info}-foreground` 0 consumers) | Substrate-without-consumer; 0 sites since J close; J cited "either wire Notification refit or formally retire"; K/L/M never wired. V3: retire. |
| J-11 (stress harness retire decision) | ε P2; J cited "restore (per I.W6) or formally retire"; K/L/M never revisited. V3: retire. |

## Items proposed PERMANENT-DEFER (out-of-scope)

| ID | Rationale |
|---|---|
| L-vue-passive-listeners | Vue upstream; glass-ui cannot resolve; formal defer-with-rationale documented at N close. |
| L-cache-ttl | Hosting layer; glass-ui cannot resolve; formal defer-with-rationale documented at N close. |

## Summary metrics

| Metric | Count |
|---|---|
| Total open residuals at N open | 34 |
| Already closed at HEAD | 26 |
| Chronic deferrals (≥ 2 tranches) | 5 (3 closed; 2 permanent-defer) |
| ABSORB-IN-N | 9 (5 substrate + 4 story/cosmetic) |
| DEFER-WITH-RATIONALE (cosmetic + cross-debt) | 7 |
| RETIRE-WITH-RATIONALE per V3 | 2 (J-6 + J-11) |
| PERMANENT-DEFER (out-of-scope) | 2 |

## Recommended N wave attribution

Per V2.d (idiomatic gestalt; KISS sizing) and the M-tranche lesson (drop premature abstraction): consolidate into the smallest coherent wave count. Suggested:

- **N.W0** (recon + precept + retire-with-rationale absorbs): J-6, J-11 retirements; PERMANENT-DEFER documentation; possibly N-1 `/freshness` retire (substrate-without-consumer binary).
- **N.W1 HEADLINE** (N9 glass panels frosted-default + typography sweep): glass.css default tier transposition + general typography audit per axis 6 of the style-audit canon. Absorbs L-story P3 typography cohort.
- **N.W2** (N7 + N8 dock substrate): blur reduction + collapse-icon-and-arrows facilities. Absorbs N-5 (dock-layer regression) + J-14 (drag-keep-open demo).
- **N.W3** (N6 storybook mobile + configurators): mobile presentation polish + configurator spacing/padding expressiveness. Absorbs N-6, L-P3-3, K-R1 (verify).
- **N.W4** (N10 + N11 bidirectional + consumer audits): self-audit + 6-agent consumer post-migration audit. Absorbs N-2, N-3, N-4.
- **N.W5** (close ceremony + 7-agent strengthened audit): canonical pattern.

Critical path: W0 → W1 → (W2 ∥ W3) → W4 → W5. 5 sequential edges, peak parallelism at (W2 ∥ W3) + W4's 6-agent audit + W5's 7-agent close.
