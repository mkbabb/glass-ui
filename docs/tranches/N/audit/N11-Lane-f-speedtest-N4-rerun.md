# N11/f Consumer Re-Audit — Lane F: speedtest (N.W4 N4 rerun)

**Re-audit span:** glass-ui HEAD (post-N substrate, ι sweep) vs speedtest @ master = `19940554` (origin = `b7173fb7`, ahead 1)
**Target:** `/Users/mkbabb/Programming/speedtest` (READ-ONLY)
**Glass-ui reference:** `/Users/mkbabb/Programming/glass-ui` (this repo, N.W4)
**Audit date:** 2026-05-14
**Baseline doc:** `docs/tranches/N/audit/N11-Lane-f-speedtest.md` (CLEAN + 1 motion drift + 6 dock reverse-overfitting candidates)

---

## TL;DR

**Status: CLEAN — no new drift introduced post-N. A5 wire intact. AC tranche scope did NOT stomp the A5 wire.**

The earlier N11/f baseline already classed speedtest as CLEAN against glass-ui v1.0.5 with one motion-vocabulary drift (220ms / 280ms choreography) and 6 dock-family reverse-overfitting candidates. This re-audit confirms no axis flipped, no consumer-side import drift was introduced by speedtest's in-flight AC tranche, and the cross-repo A5 wire (`assertDistFresh` in vite.config.ts) is intact on both speedtest's local master and origin/master.

---

## Cross-Repo State

### Push status (orchestrator ι sweep concern)

The N.W0 Lane A5 push at speedtest commit `b7173fb7` piggybacked two of the user's in-flight AC commits. All three are now on **origin/master**:

```
origin/master = b7173fb7  build(vite/freshness): wire glass-ui assertDistFresh into vite.config.ts (glass-ui N.W0 Lane A5)
                ec7e4cde  docs(AC/r2-r): precept-reiteration redress — architectural distribution + gestalt-2 fixes
                5b3e01fc  docs(AC/r2): 6-agent revision-2 audit cohort + A7 synthesis + plan amendments
```

Local master (`19940554` — docs(AC/r3.B1) read-only server-side audit) is **ahead 1**; that delta is the user's own subsequent AC.r3 docs commit and is NOT a piggyback or contamination. No further orchestrator action needed.

### Working tree (READ-ONLY confirm)

```
?? f2-initial-snapshot.md          # untracked audit artefact, consumer-owned
?? workers/speedtest-edge/tmp/     # untracked worker temp dir
```

No modifications in working tree at the consumer side; ι sweep clean from glass-ui orchestrator's perspective.

---

## A5 Wire Verification

**Status: INTACT.**

`/Users/mkbabb/Programming/speedtest/vite.config.ts` line 9 + line 14:

```ts
import { assertDistFresh } from "@mkbabb/glass-ui/freshness";

// glass-ui N.W0 Lane A5 — fail-closed if `file:../glass-ui` is symlinked
// against a stale `dist/`. Closes the V.W3 wire-claim (the freshness
// helper shipped at V; the consumer-side invocation deferred until N).
assertDistFresh({ root: path.resolve(__dirname, "..", "glass-ui") });
```

Verified surface:
- Import path matches glass-ui's published `@mkbabb/glass-ui/freshness` subpath (dist artefacts: `dist/freshness.js` + `dist/freshness.d.ts`; source: `src/freshness.ts`).
- Invocation passes the upstream library root (`../glass-ui` relative to speedtest), matching the cross-repo file-protocol install convention.
- Commit `b7173fb7` author = user; the wire commit message correctly cites V.W3 deferred-wire closure and N.W0 Lane A5 routing.

**AC tranche stomp risk: NONE.** AC's in-flight wave docs (`docs/tranches/AC/`) and audit artefacts (`docs/audits/2026-05-13-pre-AC-r2/`, `…r3/`) are pure-docs writes; they do not touch `vite.config.ts`. The four src/-touching commits in the AC tranche window (`0d112bc1`, `ed094a96`, `eb8edb54`, plus earlier AB.W5 lifts) are all confined to `src/components/dock/Dock.vue` + `src/components/speedtest/MeterColumn.vue` + `src/components/speedtest/utils/canvas/meter/{dial,rings}.ts`. None modify the freshness wire.

---

## 7-Axis Re-Audit (delta vs baseline)

### 1. Token alignment — **CLEAN (unchanged)**
No token-vocabulary drift introduced. Speedtest's two custom tokens (`--meter-background-color`, `--meter-track-stroke`) remain documented at `tokens.css:65-87`. The AC.W meter refactors (commits `89400ece` → `805fe79a`) extracted geometry/completion/render helpers but did not introduce new tokens or violate the existing two-token split.

### 2. Utility / `@apply` hygiene — **CLEAN (unchanged)**
Zero new `@apply` declarations. Zero `@layer components` redefinitions. No Tailwind soup introduced by the AC.W5 meter shell refactor.

### 3. Interactive consistency — **CLEAN (unchanged)**
All interactive elements still route through glass-ui's barrel (Button, Dialog, Sheet, ToggleGroup, Select) and per-package subpaths (`/dock`, `/forms`, `/tabs`, `/icon-tooltip`, `/aurora`, `/dark`, `/keyboard`, etc.). Subpath surface tally:

| Subpath                          | Sites |
|----------------------------------|-------|
| `@mkbabb/glass-ui` (root barrel) | 42    |
| `@mkbabb/glass-ui/forms`         | 11    |
| `@mkbabb/glass-ui/tabs`          | 7     |
| `@mkbabb/glass-ui/pulse`         | 3     |
| `@mkbabb/glass-ui/aurora`        | 2     |
| `@mkbabb/glass-ui/dark`          | 2     |
| `@mkbabb/glass-ui/dock`          | 2     |
| `@mkbabb/glass-ui/expandable-container` | 2 |
| `@mkbabb/glass-ui/icon-tooltip`  | 2     |
| `@mkbabb/glass-ui/infinite-scroll` | 2   |
| `@mkbabb/glass-ui/api`           | 1     |
| `@mkbabb/glass-ui/controls`      | 1     |
| `@mkbabb/glass-ui/freshness`     | 1 (vite.config.ts; A5 wire) |
| `@mkbabb/glass-ui/keyboard`      | 1     |
| `@mkbabb/glass-ui/timeline`      | 1     |
| `@mkbabb/glass-ui/toggle-chip`   | 1     |
| `@mkbabb/glass-ui/tokens`        | 1     |
| **Total**                        | **82** (81 src + 1 vite.config) |

No deep-path imports, no nested subpaths, no v0.9.x retired-path consumption. Subpath surface fully aligned with v1.0+ canon.

### 4. Variant orthogonality and rooting — **CLEAN (unchanged)**
No new `:deep()` workarounds. The AC.W3 meter refactor (commit `ed094a96`: "drop :deep hacks") in fact **reduced** `:deep` use, retiring prior workarounds — net improvement on this axis.

### 5. Overlay / motion vocabulary — **MINOR DRIFT carried forward (unchanged from baseline)**
Same 220ms / 280ms choreography durations documented in the baseline audit. No new durations introduced by the AC.W refactors. Reduced-motion bracket at `tokens.css:370-376` intact.

### 6. Typography / structural hierarchy — **CLEAN (unchanged)**
The AC.W3 commit `dcfcc67e` (`fix(speedtest/typography): drastically reduce meter number vertical margin`) tuned `.text-hero` line-height and `.metric-display` min-height for speedtest's local hero state machine. Both rules remain confined to speedtest's `tokens.css` and consume canonical glass-ui type-scale variables. No hoisting needed.

### 7. Accessibility resilience — **CLEAN (unchanged)**
Reduced-motion bracket intact. `useDarkModeSync()` still drives canvas refresh in `MeterColumn.vue`. No new surfaces would require contrast-mode fallbacks.

---

## Dock-Family Reverse-Overfitting Re-Verification

The N11/f baseline flagged 6 dock-family components as speedtest-only:

| Component          | Status N.W4 | Notes |
|--------------------|-------------|-------|
| `GlassDock`        | Still speedtest-only (external) | demo/stories use it (demo-private, not external consumer) |
| `DockLayer`        | Still speedtest-only (external) | same |
| `DockLayerGroup`   | Still speedtest-only (external) | same |
| `DockIconButton`   | Still speedtest-only (external) | same |
| `DockTabButton`    | Still speedtest-only (external) | same |
| `DockSelectTrigger`| Still speedtest-only (external) | same |

The AC tranche did NOT introduce a second consumer for any dock-family component. `GlassDock` has 45 dock-family-symbol references in speedtest's `src/components/dock/Dock.vue` alone (single composition site) — the substrate is still single-consumer-externally.

Glass-ui's own `demo/stories/navigation/dock.vue` and `demo/stories/compositions/dock-with-slider.vue` exercise these components as proof surfaces, but per L.W2 Lane A precedent ( `useStoryDemo` demo-private demotion), demo-private consumption does NOT clear the substrate-without-consumer-binary bar.

**Verdict: dock-family reverse-overfitting WATCH carried forward unchanged into AB+.** No AC-introduced second consumer; no action needed in N.

### Tests-only mocks (no consumer impact)

`src/__tests__/App.surveyEntry.test.ts` lines 76 + 84 mock `@mkbabb/glass-ui/instrument-chassis` and `@mkbabb/glass-ui/glyph-face`. These are vi.mock declarations, not real consumers — they don't move either component into the ≥2-consumer column.

---

## AC Tranche Scope vs A5 Wire Interaction

Per CONSTELLATION.md MULTI-WRITER mode, speedtest is running its own AC tranche in parallel to glass-ui's N tranche. The cross-tranche commit interleave looks like:

```
19940554  AC.r3.B1 audit              (local-only, ahead 1)
b7173fb7  N.W0 Lane A5 (glass-ui)     ← cross-repo write, orchestrator-authored
ec7e4cde  AC.r2-r redress             (user, piggybacked to origin via A5 push)
5b3e01fc  AC.r2 audit cohort          (user, piggybacked to origin via A5 push)
... (earlier AC + AB + Y cells, user-authored)
```

**Risk class checked:** could the AC tranche's audit/refactor recommendations or in-flight writes regress the A5 wire? **No.** The AC audit artefacts are pure-docs writes. The four src/-touching commits during this window are confined to meter rendering internals + Dock.vue shadow-canon adoption. None touch `vite.config.ts`, `package.json`'s `@mkbabb/glass-ui` pin (`file:../glass-ui` unchanged), or the freshness subpath import.

**Regression vs M.W1-baselined glass-ui consumption:** none. The 17 distinct glass-ui subpaths consumed at M.W1 baseline all remain consumed at the same or higher fidelity. The new `@mkbabb/glass-ui/freshness` subpath consumption is **additive** (the A5 wire itself).

---

## Summary Tally (N.W4 N4 rerun)

| Axis | Baseline N11/f | This rerun | Delta |
|------|----------------|------------|-------|
| Token alignment            | CLEAN         | CLEAN         | 0 |
| Utility / `@apply` hygiene | CLEAN         | CLEAN         | 0 |
| Interactive consistency    | CLEAN         | CLEAN         | 0 |
| Variant rooting            | CLEAN         | CLEAN (improved — fewer `:deep`) | 0 |
| Motion vocabulary          | 1 drift       | 1 drift (carried) | 0 |
| Typography hierarchy       | CLEAN         | CLEAN         | 0 |
| Accessibility resilience   | CLEAN         | CLEAN         | 0 |
| A5 wire intact             | n/a           | YES           | n/a |
| AC tranche stomp           | n/a           | NONE          | n/a |
| Dock reverse-overfitting   | 6 candidates  | 6 candidates (no new 2nd consumer) | 0 |
| Cross-repo push contamination | n/a        | NONE — piggybacked AC commits are user-authored, on origin, expected | n/a |

---

## Recommendations

1. **Carry the dock-family reverse-overfitting watch forward to AB+ post-close.** AC's parallel tranche did not introduce a second consumer; the bar remains at "external single-consumer only."
2. **No N.W4 action needed for speedtest consumer-side.** The cross-repo wire holds; no token, import, or pattern drift introduced.
3. **Local master ahead 1 on speedtest is benign** — that delta is `19940554` (the user's own AC.r3.B1 docs commit) and will push under the user's normal cadence. No orchestrator intervention required.

---

**Audit completed by:** N.W4 N11/f consumer re-audit sub-agent (read-only, 25 min cap)
**Target:** speedtest @ master `19940554` (origin `b7173fb7`)
**Glass-ui version:** N.W4 HEAD (post-N substrate, ι sweep)
**Method:** A5 wire verify + 7-axis delta sweep + AC stomp check + dock-family reverse-overfitting re-verification
