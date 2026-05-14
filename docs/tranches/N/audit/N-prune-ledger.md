# N — Wire Ledger (CORRECTED; replaces prune ledger)

**REVISION HISTORY**:
- 2026-05-12 first draft (prune-focused): proposed 5 retires + 3 demo-privatizations.
- 2026-05-13 corrected after user feedback ("useTouchGate is used, or it should be... Metaballs, paper-backdrop, typewriter should be used elsewhere too"): verdict reversal — these primitives are UNDER-WIRED, not contrived. The right move is WIRE, not retire.

Synthesized from 6 N11 consumer audits + 1 overfitting audit + 1 wiring-target audit. Per user revised KISS+wiring directive: only retire what's TRULY contrived (none surfaced); WIRE the rest into their proper sites.

## Prior audit errors (process failures)

The overfitting audit produced 3 incorrect verdicts:

| Item | Prior verdict | Actual state | Correction |
|---|---|---|---|
| `useGlassAlpha` | `delete-unused` (rg=0) | **HALLUCINATION** — does not exist in codebase. Actual composable is `useGlassRenderer` (in use by GlassPanel.vue). | Remove from ledger |
| J-6 `--{success,warning,info}-foreground` tokens | `delete-unused` (zero consumers; J chronic) | **FALSE POSITIVE** — tokens exist in tokens.css + theme.css; in use | Remove from ledger |
| J-11 stress harness | `delete-unused` | **MOOT** — no harness substrate found in codebase; already retired or never existed | Remove from ledger |
| `useTouchGate` | `inline-and-remove` (rg=1 self-only) | **MISSED CONSUMER** — actually used by `GlassDock.vue:85` (a 2nd consumer); audit counted only the self-definition site | Re-verdict: KEEP + WIRE into more primitives |

**Process failure**: the overfitting audit's rg counts were imprecise; it missed legitimate consumers and hallucinated non-existent items. Codify as a LESSONS-LEARNED entry at N close: every audit verdict must cite the exact rg invocation AND the orchestrator must spot-verify the top 5 retire candidates before committing to retirement. Per LESSONS-LEARNED 2026-05-04 "Empty Returns Are Failed Dispatches" + 2026-05-06 "Read-Only Audits Miss Runtime + tailwind-merge Interactions" — extend to "Read-Only Audits Miss Composable Wirings Without Spot-Verification".

## A — WIRE batch (5 primitives × N wire-targets each; conservative per KISS)

Per `audit/N-wiring-targets.md`: 28 wire-target sites surfaced across 5 primitives. Per KISS posture, N picks the HIGHEST-VALUE strategic wires (~5-8 sites); defers broader wiring to O or beyond.

### A1 — `useTouchGate`

Existing consumer: `GlassDock.vue` (verified at line 85).

Wire-target primitives (per audit; 8 new sites):
- **WIRE**: Slider, Select, DropdownMenu, Combobox, NumberField, Popover, TagsInput, MultiSelect
- NOT-APPLICABLE: Switch, Toggle, ToggleChip, ContextMenu, HoverCard, IconTooltip (instantaneous tap; no scroll conflict)

**N strategic wire**: Slider only (the canonical pointer-event-bearing primitive; aligns with the existing "Slider keep-dock-open contract" per CLAUDE.md). Other 7 deferred to O.

### A2 — `metaballs`

Existing consumer: `demo/stories/motion/metaballs.vue` only.

Wire-target sites:
- glass-ui demo: `compositions/hero.vue` (primary), `compositions/dashboard.vue` (optional)
- Consumers: speedtest dashboard hero, fourier-analysis math hero, keyframes.js easing hero

**N strategic wire**: `demo/stories/compositions/hero.vue` ambient backdrop wire. Demonstrates the primitive in the canonical composition story. Other 6 deferred to O / consumer-side per-consumer tranches.

### A3 — `paper-backdrop`

Existing consumer: demo-only.

Wire-target sites:
- Card variant + CartoonCard
- Section landmark (`src/components/ui/section/Section.vue`)
- Prose/Markdown containers
- speedtest dashboard backdrop, fourier-analysis math hero backdrop

**N strategic wire**: Section landmark — adds an optional `backdrop="paper"` prop on `<Section>` which composes PaperBackdrop. Single library-side wire; demonstrates the primitive on a canonical composition primitive. Other 5 deferred to O.

### A4 — `typewriter`

Existing consumer: `demo/stories/motion/typewriter.vue` only.

Wire-target sites:
- `demo/stories/compositions/hero.vue` headline
- Per-consumer hero composites

**N strategic wire**: `demo/stories/compositions/hero.vue` headline wire. Demonstrates typewriter in the canonical hero story. Other 4 deferred to O / per-consumer.

### A5 — `/freshness` (assertDistFresh)

Existing consumer: zero (V.W3 wire-claim never landed).

Wire-target sites: 6 consumer vite.config.ts files.

**N strategic wire**: speedtest vite.config.ts ONLY (closes the V.W3 wire-claim that was the canonical first-consumer plan). Other 5 deferred to O per-consumer.

## B — KEEP (no action; per KISS + V3 + L invariant 8)

Per the corrected audit, the originally-flagged "demo-only" items (metaballs, paper-backdrop, typewriter) are reclassified to under-wired (A2/A3/A4 above). Demo-privatization batch retracted.

## C — DEFER (5 items; needs more signal; no action at N)

Unchanged from first ledger:
- C1 `disco-glyph` — N-2 production audit deferred
- C2 `status-dot` — consolidation candidate
- C3 `glass-carousel` — niche themed-carousel; defer
- C4 6 dock-family components ONLY consumed by speedtest — reverse-overfitting WATCH
- C5 bbnf-buddy `useLeaveTimer` inline candidate (consumer-local; not glass-ui surface)

## D — KEEP (33 items; substantive but low-reach; semantic value)

Unchanged from first ledger. The 33 keep-current items have semantic value + are re-exported on public surface; conservative posture per KISS = KEEP.

## E — REVERSE-OVERFITTING WATCH

Unchanged from first ledger. 6 dock-family components used ONLY by speedtest — speedtest IS the canonical consumer; WATCH for AB+ if no 2nd consumer emerges.

## F — N-new directives revisited (verdict-corrected)

| ID | Original directive | Revised disposition |
|---|---|---|
| **N6** Storybook mobile + configurators | KEEP per W2 plan |
| **N7** Dock blur reduction | KEEP per W2 plan (likely no-op audit) |
| **N8** `<DockMobileToggle>` new primitive | RECONSIDER per user feedback. The user has signaled "new primitives" are acceptable IF genuinely useful. Mobile-arrow primitive IS load-bearing per the user's verbatim N-open. Re-include? Pending explicit user clarification — keep DEFERRED for now since user did not explicitly authorize this primitive in the KISS revision. |
| **N9** Glass panels frosted-default + typography | KEEP per W1 plan |
| **N10** Bidirectional style audit | EXECUTED at N open via Rγ + Rδ + this corrected ledger |
| **N11** 6-agent consumer post-migration audit | EXECUTED at KISS revision; corrections surfaced + ledger revised |

## G — Cosmetic absorbs (LOW-RISK CLEANUP at N)

Unchanged from first ledger:
- M-residuals N-4 (26 AA timeline typecheck errors) → N.W1 absorb
- M-residuals N-6 (demo carousel/metaballs import-path harmonisation) → N.W1 demo polish
- M-residuals N-8 (`_shared` package naming clarity) → N.W1 docs

## H — Audit-failure LESSONS-LEARNED entry (N-new) — CODIFIED at N.W0 Lane B+C

Per V20 (NO silent deferrals) + the corrections enumerated above, codified at precept submodule:

- **Precept commit**: `b8af314` (`feat(spec+style): canonicalize bidirectional audit + spot-verification gate + wire-before-retire (glass-ui N.W0 Lane B)`).
- **LESSONS-LEARNED entry**: `## 2026-05-13 - Audit Verdicts Require Spot-Verification` (`docs/precepts/instructions/LESSONS-LEARNED.md`).
- **SPEC.md gate**: §"Audit-verdict spot-verification gate" appended to §"Close" sub-tree.
- **README.md edict**: "Wire before retire." added to §"Edicts".
- **RESEARCH.md angles**: 7 (bidirectional style audit) + 8 (overfitting audit) added to §"Canonical Angles".

**Title** (LL entry): "Audit Verdicts Require Spot-Verification".

**Rule** (LL entry): Before authoring a wave-spec that retires `delete-unused` / `library-orphan` / `inline-and-remove` items per an overfitting audit, the orchestrator MUST spot-verify: (a) the item EXISTS at the cited path; (b) the cited rg count is accurate by re-running the audit's grep verbatim through any re-export alias paths; (c) "zero consumers" claims resolve through CSS-only / dynamic-import paths. The wave-spec cites the spot-verification commit before retirement is authorized. Concurrent posture: WIRE BEFORE RETIRE — under-wired primitives default to wire, not retire.

**Check** (LL entry): SPEC.md §"Audit-verdict spot-verification gate" + README.md §"Edicts" wire-before-retire bullet + close-ceremony ι lane confirms every retirement cites the spot-verification result. Future audit-generated prune ledgers MUST include a "spot-verified by orchestrator" column adjacent to each cited verdict.

**Local proof docs**: `audit/W0-Lane-B-precept-canonicalize-proof.md` (cross-repo codification) + `audit/W0-Lane-C-audit-failure-LL-proof.md` (local annotation).

## Summary

| Category | Count | Disposition |
|---|---|---|
| A — WIRE (5 primitives × 1 strategic site each at N; 23 sites deferred) | 5 wires | **N.W0 absorb** |
| B — KEEP (originally demo-privatize; reverted) | 0 actions | reclassified to A2/A3/A4 |
| C — DEFER (5 items) | 5 | DEFER to O |
| D — KEEP (33 items, low-reach semantic value) | 33 | KEEP |
| E — WATCH (reverse-overfitting; 6 dock items) | 6 | WATCH |
| F — N-new directives revisited (6 items) | 6 | KEEP per plan |
| G — Cosmetic absorbs (3 M-residuals) | 3 | inline at appropriate wave |
| H — Audit-failure LESSONS-LEARNED | 1 precept entry | N.W0 codify |

**Net library surface change at N close**: **0 deletions + 0 retirements + 5 strategic wires** of existing primitives into proper sites. Pure additive wiring; zero new primitives invented; KISS-aligned.

## Verdict

The original "prune ledger" was wrong in spirit (overfitting audit failures) but the corrected wire ledger is the right move: the library has NO contrived items to retire. It has 5 under-wired primitives + 23 deferred-wire-targets. N picks 5 strategic wires; defers the rest to O. Conservative; gestalt; per V3 + V4 + KISS.

The audit-failure LESSONS-LEARNED entry hardens the process so future tranches don't retire hallucinated items.
