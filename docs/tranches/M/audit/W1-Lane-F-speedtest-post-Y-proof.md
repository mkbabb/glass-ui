# M.W1 Lane F — Speedtest post-Y handoff proof

**Lane**: M.W1 Lane F — speedtest post-Y handoff coordination.
**Mode**: READ-MOSTLY (potential thin write per W1 spec).
**Scope**: `/Users/mkbabb/Programming/speedtest`.
**Disposition at lane close**: **HANDOFF DONE** — Y closed; speedtest at HEAD compiles cleanly against glass-ui v1.0.4. No source changes required.

---

## § Y tranche state at lane open

**Y is CLOSED.**

Evidence:
- `docs/tranches/Y/FINAL.md` present at speedtest, with the wave summary table marking Y.W0–Y.W4 all closed and the `y-close` tag recorded.
- `docs/tranches/Y/PROGRESS.md` shows W0–W4 in CLOSED state; W3 explicitly DEFERRED-TO-Z with documented settle-condition.
- Total: 28 commits on speedtest master in the Y range + the `y-close` tag.
- Speedtest has since advanced through `Z` and `AA` tranches — both also CLOSED (per `docs/tranches/Z/FINAL.md` + `docs/tranches/AA/FINAL.md`).
- Most recent commits at lane open: `4bffa90f fix(vite): fs.allow + watch.ignored + optimizeDeps.entries`, `2872d519 fix(dev): restore Vite-idiomatic layout`, `e0a60ba4 docs(AA/FINAL + PROGRESS): close AA tranche`. These are post-AA settle items, not tranche-in-flight artefacts.

Note that CONSTELLATION.md §1 lists speedtest's active tranche as "Y (in flight)" — this is the M.W0-open snapshot and is now stale. Y closed during M's own flight (well before this lane opened); the manifest entry should be revised at M.W1 close to reflect "AA (closed); pre-AB audit substrate in progress" or similar.

## § Disposition

**HANDOFF DONE — no source changes; verification ledger only.**

Per the W1 Lane F decision tree:
> If Y closed: thin post-Y handoff. Verify speedtest at HEAD compiles + builds against glass-ui v1.0.4.

Y is closed (and Z+AA are closed too). Speedtest at HEAD already consumes glass-ui v1.0.x exclusively via the v1.0 subpath surface (the Y.W0 re-link at commit `98f88325` per L coordination ledger established the v1.0 import shape; subsequent Z+AA tranches kept that shape clean). The link target `file:../glass-ui` resolves to v1.0.4 in the worktree where this lane runs.

No v1.0.4 surface is missing for speedtest — the v1.0.4 carousel-subpath defect (orchestrator-direct edit at M.W0; CONSTELLATION.md §9 "N-carousel-defect") is irrelevant here because speedtest has zero `Carousel*` / `useCarousel` consumption.

## § Pre-lane state — glass-ui consumption audit against v1.0.4 subpath surface

Mechanical audit at speedtest HEAD (`4bffa90f`):

| Check | Pattern | Result | Disposition |
|---|---|---|---|
| Retired nested subpaths | `@mkbabb/glass-ui/composables/(dark|keyboard)` | 0 hits | PASS |
| Retired pagination/virtual subpaths | `@mkbabb/glass-ui/(virtual|pagination)` | 0 hits | PASS |
| Retired composable symbols | `useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow` | 0 hits | PASS |
| Carousel consumption (would need `/carousel`) | `Carousel\|useCarousel` in src/ | 0 hits | N/A — no consumer-side dependence on the v1.0.4 carousel-subpath fix |
| Vueuse-bearing surfaces correctly subpath-imported | — | — | — |
| `useGlobalDark` → `/dark` | `from "@mkbabb/glass-ui/dark"` | 2 hits (`src/App.vue`, `src/config/auroraConfig.ts`) | PASS |
| `Input`/`Textarea` → `/forms` | `from "@mkbabb/glass-ui/forms"` | 10 hits (AdminOverviewView, AdminDashboardLayout, SurveyField, AppSettingsButton, AddressAutocomplete, AdminServerManager, AdminSessionsTable, IPLookupManager, ResultsFilters, SubnetSyncDialog, SubnetAddDialog) | PASS |
| `registerShortcut` → `/keyboard` | `from "@mkbabb/glass-ui/keyboard"` | 1 hit (`src/components/dashboard/DashboardMap.vue`) | PASS |
| Per-package subpaths used canonically | `@mkbabb/glass-ui/{dock,aurora,timeline,toggle-chip,infinite-scroll,glyph-face,controls,icon-tooltip,tabs,expandable-container,pulse,tokens}` | numerous hits | PASS |
| Root-barrel imports (vueuse-free) | `from "@mkbabb/glass-ui"` (non-vueuse symbols) | numerous; all symbols verified vueuse-free at v1.0 root barrel (Button, Card, Select, Sheet, Dialog, Toaster, Badge, Separator, HoverCard, ToggleGroup, TooltipProvider, ScrollPane, Slider, Collapsible, Label, ScrollingText, useInterval, useTimer, useAnimatedNumber, useStagger, useResizeObserver, useTokenColor, useRAFLoop, useIntersectionPause, useDarkModeSync, DAMPING, SNAP_THRESHOLD, types: `PausableRuntime`, `RAFLoopTiming`) | PASS — all consumed root-barrel symbols are on the v1.0 vueuse-FREE curated surface |

Link-pin: `package.json` shows `"@mkbabb/glass-ui": "file:../glass-ui"`. `readlink node_modules/@mkbabb/glass-ui` → `../../../glass-ui` (canonical worktree link). The link resolves to glass-ui v1.0.4 at this run.

## § File changes summary

**Empty.** No `src/`, no `package.json`, no `vite.config.ts`, no other speedtest-side changes. Speedtest at HEAD `4bffa90f` already passes the M.W1 Lane F handoff criteria.

## § Verification

### Glass-ui-consumption smoke (canonical handoff signal)

```
$ cd /Users/mkbabb/Programming/speedtest
$ npm run check:client
> vue-tsc --noEmit
(exit 0; no diagnostics)
```

vue-tsc resolves all imports — root-barrel + every subpath consumed — without any type errors against glass-ui v1.0.4. This is the canonical post-Y handoff signal.

### Per-subpath runtime smoke

```
$ node -e 'import("@mkbabb/glass-ui/dark").then(m => console.log(Object.keys(m)))'
[ 'useGlobalDark' ]                                           # PASS

$ node -e 'import("@mkbabb/glass-ui/keyboard").then(m => console.log(Object.keys(m).slice(0,5)))'
[ 'formatCombo', 'formatComboParts', 'isMac', 'registerShortcut', 'useRegisteredShortcuts' ]   # PASS

$ node -e 'import("@mkbabb/glass-ui/forms").then(m => console.log(Object.keys(m).slice(0,5)))'
[ 'Combobox', 'ComboboxAnchor', 'ComboboxCancel', 'ComboboxEmpty', 'ComboboxGroup' ]           # PASS
```

Three of three subpath probes resolve cleanly to v1.0.4 entry points.

### Full `npm run build` — UNRELATED FAILURE (out-of-scope)

```
$ npm run build
[vite-plugin-pwa:build] Failed to resolve entry for package "@mkbabb/value.js".
The package may have incorrect main/module/exports specified in its package.json.
```

This failure is unrelated to glass-ui. value.js declares `./dist/value.js` as its main export but `/Users/mkbabb/Programming/value.js/dist/` does not contain the `value.js` artefact (only `CNAME`, `assets/`, `index.html`, `robots.txt` — appears to be a static demo build, not a library dist). The transitive chain is `speedtest → keyframes.js → @mkbabb/value.js`; speedtest itself does not import `@mkbabb/value.js`.

This is M.W1 Lane B's territory (value.js consumer-side v1.0 audit per CONSTELLATION.md §1). It was a PRE-EXISTING failure mode at lane open and is NOT a regression introduced by glass-ui v1.0.4. The vue-tsc typecheck — the canonical glass-ui consumption signal — passes cleanly regardless.

Lane F does not block on this; it routes the observation to M.W1 Lane B and the constellation M close audit.

## § Open questions for orchestrator

1. **CONSTELLATION.md §1 update at M.W1 close** — the speedtest "Active tranche" cell currently reads "Y (in flight)"; should be revised to reflect Y/Z/AA closed + any current pre-AB audit substrate. Recommend updating at M.W1 close as part of the per-lane close ceremony.

2. **value.js dist artefact (Lane B coupling)** — the `dist/value.js` artefact is missing from value.js's worktree. This blocks speedtest's `npm run build` via the keyframes.js → value.js chain, but does NOT block typecheck. Lane B is the canonical owner; this lane only surfaces the observation.

3. **Speedtest pre-AB audit substrate** — `docs/audits/2026-05-12-pre-AB/` is an untracked directory in the speedtest worktree at lane open. This appears to be speedtest's own next-tranche prep, fully outside M scope. No M-side action required.

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/speedtest status --short
?? docs/audits/2026-05-12-pre-AB/
?? workers/speedtest-edge/tmp/
```

Two untracked entries; both are speedtest-owned (next-tranche audit prep + workers tmp/ dir). **Zero modifications, zero staged changes by M.W1 Lane F.** Hardened-agent-git-clause invariant upheld — read-only git only; orchestrator owns the index.

## § Lane summary for orchestrator

- **Y state**: CLOSED (plus subsequent Z + AA both closed; speedtest is in pre-AB audit substrate prep, fully outside M scope).
- **Disposition**: HANDOFF DONE. No source changes; verification ledger only.
- **Build/test pass**: vue-tsc typecheck PASS (canonical handoff signal). Full `npm run build` blocks on an UNRELATED value.js dist artefact gap — routes to M.W1 Lane B; not a glass-ui regression.
- **Blockers**: none for this lane.
- **Cross-tranche-debt for M FINAL.md**: (a) CONSTELLATION.md §1 staleness on speedtest "active tranche" cell — update at M.W1 close. (b) value.js dist artefact gap surfaced through speedtest build chain — Lane B handoff.
