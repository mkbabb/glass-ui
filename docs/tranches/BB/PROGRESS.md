# BB — PROGRESS

Tranche development opened 2026-06-16 (post-4.0.0-publish). Status legend: `SPEC` (authored, not executed) · `WIP` · `live-verified` (own-surface DELTA + paired-π, AZ-form freshness headers) · `complete`.

## Batch 0 — INTEGRITY FLOOR
| wave | status | gate | note |
|---|---|---|---|
| W-CI-GREEN | SPEC | (the master-CI-red set) | the siblings-absent real-failure list is the spec input — see audit/ci-red-census.md |
| W-CLOSE-BATTERY | SPEC | proof:close-battery-parity (new) | the close must run local∪ci∪release siblings-absent before the tag |
| W-LEDGER-REPAIR | SPEC | proof:live-verified-ledger (repair) | the gate parses 0 BA rows — a silent no-op |
| W-DISPOSITION-RESTAMP | SPEC | proof:disposition-live | ~28 books re-evaluated; the HELD-prose reconcile |

## Batch 1 — GESTALT-BAR HARDENING
| wave | status | gate | note |
|---|---|---|---|
| W-GESTALT-GATE2 | SPEC | proof:ba-gestalt (harden) | mobile + content + dimension + freshness; today desktop-PNG-existence only |
| W-VISUAL-RUNNER | SPEC | proof:visual-runner (new) | execute the ~93 tests-visual π specs in CI/close |
| W-CHIP-GRAZE | SPEC | proof:ba-gestalt verdict | the SWEPT /forms/inputs form-field collision |

## Batch 2 — FINISH BA + RETIRE DEAD
| wave | status | gate | note |
|---|---|---|---|
| W-SCROLL-FADE-RETIRE | SPEC | proof:fading-scroll (extend) | dead code shipping; 4 docs claim retired |
| W-SURFACE-AXIS-COMPLETE | SPEC | proof:surface-axis (extend) | Toast + Button; the phantom Toast.surface doc |
| W-DEAD-SWEEP | SPEC | proof:no-dead-token (new/extend) | ~32 dead tokens + 3 orphan scripts + 24 unmanifested gates |
| W-DOCK-RAIL-SEAT-FINAL | SPEC | proof:dock-sections + proof:ba-gestalt | the chronic seat, zero content graze |

## Batch 3 — PERFORMANCE
| wave | status | gate | note |
|---|---|---|---|
| W-LIGHTHOUSE | SPEC | proof:lighthouse (new) | the 3-4 tranche chronic, zero gate |
| W-CSS-CRITICAL | SPEC | proof:css-critical (new) | critical/deferred /styles split |
| W-CARD-COMPOSITE | SPEC | proof:no-layout-animation (new) | A'-3 CardHeader CLS, shipped in 4.0.0 |
| W-PERF-PRODUCER | SPEC | — | the value.js A′ cluster |
| W-PAYLOAD-DEFER | SPEC | profile:budget (extend) | lazy WebGL + value.js off critical path |

## Batch 4 — ARCHITECTURE TRANSPOSITIONS
| wave | status | gate | note |
|---|---|---|---|
| W-CARVE3 | SPEC | proof:no-god-module | 3 god-modules + FourierField renderer extract |
| W-CANVAS-UNIFY | SPEC | proof:webgl-substrate-single (extend) | useCanvas2D ← createCanvasLifecycle |
| W-DARK-INK-WARM | SPEC | proof:no-gray (extend) | dark surface-tint/foreground warm + relative-color |
| W-INVALID-RING | SPEC | proof:input-invalid-aria (extend) | the 3-recipe aria-invalid ring |
| W-EYEBROW-UNION | SPEC | — | section-label register union |

## Batch 5 — CROSS-REPO ADOPT
| wave | status | gate | note |
|---|---|---|---|
| W-PEER-SPINE | SPEC | proof:peer-optional (extend) | F-2: value.js range excludes 0.12.0 (4.0.1) |
| W-ADOPT-RECONCILE | SPEC | proof:consumer-staleness | own staleness+phantom+resolution as one loop |
| W-SLIDES-HANDOFF | SPEC | — | coordination only (slides pins 3.13.0; deck re-fork) |
| W-EASING-PRIMITIVE | SPEC | proof:fourier-studio (extend) | StepsEditor → published <EasingPicker> |
| W-LINEAGE-PROBE | SPEC | proof:disposition-live (extend) | invariant 11 registry-probe mechanized |

## Batch 6 — CHRONIC RESIDUALS + DOC SYNC
| wave | status | gate | note |
|---|---|---|---|
| W-NDA-DECIDE | SPEC | — | the FOUNDING 5-tranche chronic: build or retire |
| W-AUR-KUWAHARA | SPEC | — | the 3-tranche painterly residual: build or retire |
| W-PRECEPT-SYNC | SPEC | proof:precept-current (new) | design-idioms.md stale, no gate |
| W-DELTA-RESHOOT | SPEC | proof:live-verified-ledger --strict | 5 AY DELTAs + arm --strict-freshness |
| W-DOC-FRESHEN | SPEC | proof:readme-meta-clean | CLAUDE.md examples + README gate tables |

## Batch 7 — CLOSE
| wave | status | gate | note |
|---|---|---|---|
| W-REFLECT3 | SPEC | proof:ba-gestalt (hardened) | fresh both-mode mobile+desktop reflection |
| W-CLOSE | SPEC | proof:bb-final (new) | 4.1.0 cut; full-set release battery; zero re-book |

---

## Event log
- **2026-06-16** — BB seeded by the 32-agent deep audit. 4.0.0 published + d6 fork closed during the seed turn (the audit straddled the publish; it flagged the release gaps, which were fixed: pencil-boil devDep, lockfile, consumers-static, 5 release gates). Master CI confirmed RED on the full ci set (the close over-claim) — Batch-0's W-CI-GREEN input. BB.md + EXECUTION-DAG authored; the wave specs follow.
