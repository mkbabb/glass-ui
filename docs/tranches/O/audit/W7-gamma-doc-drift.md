# O.W7 γ — Doc-drift audit

**Lane**: γ (doc-drift; read-only).
**Tranche**: O close ceremony (W7).
**Auditor**: agent-dispatched read-only audit; HARD-CAP 25 min.
**Window**: O open `18876f4` → W6 close `25e1b5a` (HEAD at audit time; W7 close commit pending).
**Verdict**: **BLOCKER** (1 src/package.json drift requiring inline absorb) + **MINOR** (5 stale-counter docs).

---

## §1 — Per-doc drift inventory

### CLAUDE.md

| Line | Claim | Actual @ HEAD | Verdict |
|---|---|---|---|
| 20 | `src/api/index.ts` — "32 canonical public symbols (28 types + 4 constants)" | 55 symbols (51 types + 4 constants) after W4 Lane A (12 promotions: sidebar 6 + search 5 + triad 3) + W6 Lane A (4 promotions: clipboard 2 + header-ribbon 2). M.W2 Lane B added 5 (`GlassPanelVariant`, `ConfiguratorCloneMode`, 3 Timeline types). | **MINOR** — stale by 3 cohorts (M.W2 + O.W4 + O.W6) |
| 72 | "30 custom package dirs (every dir has a package barrel)" | 31 dirs (header-ribbon added in O.W6) | **MINOR** — off-by-one |
| 73-113 | Tree of `custom/` enumerates 30 packages; `header-ribbon/` missing | `src/components/custom/header-ribbon/` exists with HeaderRibbon.vue + index.ts + types.ts | **MINOR** — tree omits header-ribbon |
| 167 | "remaining 23 `custom/` packages reach consumers only via their dedicated subpath" | 7 cherry-picked + 24 subpath-only = 31 total custom packages (header-ribbon is subpath-only) | **MINOR** — off-by-one |
| 194 | "v1.0 (L.W1) ... 38 flat per-package subpaths ... pure types/constants `@mkbabb/glass-ui/api`" | `package.json.exports` has 38 subpath keys (37 flat JS + `/styles` CSS). With header-ribbon expected per W6 close, would be 39 — see BLOCKER below. | **MINOR** + drift compound with W6 BLOCKER |
| 242 | "v1.0 ships **37 flat JS subpaths** ... (38 entries total in `package.json` exports, excluding `./` root + `./package.json`)" | Currently 38 entries in exports (37 JS + 1 CSS) — count was stable at L.W1; W6 close intended to add `/header-ribbon` but did NOT (see BLOCKER §2). | **MINOR** — would need bump to 38 JS + 1 CSS = 39 after W7 inline absorb |
| 239 | Subpath list mentions `freshness` (correct) but lacks `header-ribbon` | header-ribbon shipped at W6 (per CHANGELOG v1.4.0 and Lane A proof). | **MINOR** — list missing newest subpath |
| (entire file) | No mention of `useClipboard` (W6 Lane A) | `src/composables/dom/useClipboard.ts` exists; root-barrel re-exported via `composables/dom/index.ts` | **MINOR** — not load-bearing (composable list isn't enumerated in CLAUDE.md) |
| (entire file) | No mention of W6 token block `--dock-active-*` or `@utility scale-on-hover` | Both ship per CHANGELOG v1.4.0; verified in `src/styles/tokens.css` + `src/styles/utilities.css` | **MINOR** — granular tokens/utilities not enumerated in CLAUDE.md |

### DESIGN.md

| Line | Claim | Actual @ HEAD | Verdict |
|---|---|---|---|
| 584 | "### Dock subsystem — typed-context DI shape (O.W2; invariant 25)" subsection | Present at line 584; documents `DOCK_CONTEXT_KEY`, `DockContext` shape, strict `useDockContext()` + befitting silent `useOptionalDockContext()` helper-pair, cross-references to `dockLayerContext.ts` + `toggleGroupContext.ts` | CLEAN — matches W2 close declaration |
| 1002 | "## Module-scope process-singleton registries (canonical pattern)" section | Present at line 1002; documents 4 registries (`gateRegistry`, sortable `instances`, typewriter `activeTimers`, `useToast` queue + `toastTimeouts`); cross-references W4 Lane C decision doc | CLEAN — matches W4 Lane C declaration |
| (entire file) | Spot-check: no claim about HeaderRibbon, useClipboard, scale-on-hover — DESIGN.md focuses on architectural patterns rather than per-primitive ledgers | n/a | CLEAN |

### CHANGELOG.md

| Line | Claim | Actual @ HEAD | Verdict |
|---|---|---|---|
| 3 | v1.4.0 — O.W6 HEADLINE entry; "subpath `@mkbabb/glass-ui/header-ribbon`"; "new subpath chunk" | `dist/header-ribbon.js` exists (2.61 KB) AND `vite.library.ts:35` registers entry, BUT `package.json.exports` does NOT register `./header-ribbon` and `typesVersions["*"]` does NOT register the d.ts mapping. Consumer `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"` WILL FAIL to resolve. | **BLOCKER** — see §2 |
| 84 | "`npm run build` — 659 modules (+8 from W6); `dist/header-ribbon.js` 2.61 KB / 1.00 KB gzip emitted as a new subpath chunk" | Module count not re-verified live; `dist/header-ribbon.js` exists at 2.61 KB ✓; no `dist/header-ribbon.d.ts` (vite-plugin-dts skips because no `package.json.exports` entry) | **BLOCKER consequence** — d.ts missing |
| 89 | "`npm run verify-export-types` — PASS (new `/header-ribbon` subpath resolves)" | `scripts/verify-export-types.mjs` iterates `package.json.exports` only — since `/header-ribbon` is NOT in exports, the script DOES NOT verify it. PASS reported by W6 close, but vacuously — the subpath isn't covered. | **BLOCKER** — verification gap concealed regression |
| 197 | v1.3.0 — "`avatarVariant` → `avatarVariants`" rename | `src/components/ui/avatar/index.ts:7` exports `avatarVariants` (plural); `Avatar.vue:4` imports plural form. Source matches doc. | CLEAN |
| 231 | v1.3.0 — "`useDarkModeSync` renamed to `installDarkModeSync`" | `src/composables/motion/installDarkModeSync.ts:25` exports `installDarkModeSync(...)`; no `useDarkModeSync` in src/. Source matches doc. | CLEAN |
| 206 | v1.3.0 — "Surface count 37 → 49 (41 types + 8 constants)" | Actual constants = 4 (`DEFAULT_AURORA_CONFIG`, `MAX_NUCLEI`, `MAX_STOPS`, `DEFAULT_METABALL_CONFIG`); actual types after W4 = 45 (49 − 4); claim "41 types + 8 constants" is a doc arithmetic error (8 constants doubles the actual 4). Also `src/api/index.ts:37` repeats the same `8 constants` error: "Surface count 32 → 37 (29 types + 8 constants)" should be `(33 types + 4 constants)`. | **MINOR** — recurring constant-count off-by-2× (likely originated at M.W2 Lane B inline header comment; W4 Lane A duplicated the error) |
| 437-449 | v1.2.1 — Aurora `onInitError`, WebGL throws, Configurator clone, Typewriter throws | All four migrations verified in source: `useAurora.ts` exposes `onInitError`, metaballs + frost shader sites throw, configurator clone throws, typewriter throws with named message. | CLEAN |
| 469-476 | v1.2.1 — "21 test files now follow one shape" | `find src -name "*.test.ts"` returns 21 files; 0 `*.spec.ts` siblings. | CLEAN |
| 343-345 | v1.2.2 — dock typed-context | `src/components/custom/dock/composables/dockContext.ts` ships `DOCK_CONTEXT_KEY`, `DockContext`, `useDockContext`, `useOptionalDockContext` per Read of DESIGN.md §Dock subsystem. | CLEAN |
| 491-523 | v1.2.0 — AB folder + precept + cosmetic excise | verified by W7 α audit (`audit/W7-alpha-plan-vs-actual.md`); no γ-side drift. | CLEAN |

### MIGRATION.md

| Line | Claim | Actual @ HEAD | Verdict |
|---|---|---|---|
| 453-535 | "v1.2.1 — Aurora init fail-explicit"; before/after code blocks; `onInitError` prop description | `src/components/custom/aurora/Aurora.vue` accepts `onInitError`; `useAurora.ts` invokes the callback per the documented contract. Source matches doc. | CLEAN |
| 538-557 | "v1.3.0 — `avatarVariant` → `avatarVariants`" | Source confirms (already verified §CHANGELOG row). | CLEAN |
| 561-581 | "v1.3.0 — `useDarkModeSync` → `installDarkModeSync`" | Source confirms (already verified §CHANGELOG row). | CLEAN |
| (entire file) | No v1.4.0 entry | v1.4.0 is purely additive (4 new substrate promotions + 1 utility + 6 speedtest cohort tokens; zero renames/removals). MIGRATION.md is contract-bound to document breaking changes; pure-additive minor warrants no entry per L invariant 16 phrasing ("documenting the canonical migration path"). | CLEAN — additive-only minor is not migration-bearing |

### docs/tranches/O/PROGRESS.md

| Line | Claim | Actual @ HEAD | Verdict |
|---|---|---|---|
| 285-318 | W6 HEADLINE close entry; lists Lane A useClipboard + HeaderRibbon "LANDED"; verification block | PROGRESS.md does not separately call out the package.json registration gap for header-ribbon — the BLOCKER is documented in audit/W6-Lane-A proof at lines 80-82 (declared the requirement) and line 97 (declared "38 → 39") but the PROGRESS.md hard-gate evidence (line 316) says `verify-export-types PASS (new /header-ribbon subpath resolves)` — same vacuous PASS as CHANGELOG; the verify probe never ran against `/header-ribbon` because the entry isn't in package.json.exports. | **BLOCKER consequence** — PROGRESS hard-gate evidence vacuously green |
| (other waves) | W0-W5 close entries | Aligned with respective CHANGELOG entries and audit proof docs; no doc-side drift detected. | CLEAN |

---

## §2 — BLOCKER detail: header-ribbon subpath unwired

### Evidence

- `vite.library.ts:35` — `"header-ribbon": resolve(rootDir, "src/header-ribbon.ts")` REGISTERED.
- `src/header-ribbon.ts` — EXISTS (flat subpath entry per W6 Lane A proof line 93).
- `src/components/custom/header-ribbon/{HeaderRibbon.vue, index.ts, types.ts}` — EXIST.
- `dist/header-ribbon.js` — EXISTS (2.61 KB, matches CHANGELOG / proof claim).
- `dist/header-ribbon.d.ts` — **DOES NOT EXIST** (vite-plugin-dts skips because there is no corresponding `package.json.exports` entry to drive type emission).
- `package.json.exports` — **MISSING** `./header-ribbon` key.
- `package.json.typesVersions["*"]` — **MISSING** `header-ribbon` key.
- `git show 25e1b5a -- package.json` confirms the W6 close commit touched only `version` (1.3.1 → 1.4.0) and the `files` array (added `"src/fonts"`); the W6 Lane A proof doc's required edits at lines 80-82 (`Register ./header-ribbon in exports`) were never absorbed.

### Consumer impact

`import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"` will fail at consumer build time with `ERR_PACKAGE_PATH_NOT_EXPORTED` per Node 22 + bundler subpath resolution. CHANGELOG v1.4.0, MIGRATION-adjacent prose, and W6 Lane A proof all advertise the subpath as live.

### Verify-export-types vacuous PASS

`scripts/verify-export-types.mjs` enumerates `Object.keys(pkg.exports)` (line 11 of the script). Since `/header-ribbon` is not in `pkg.exports`, the script does not probe it. The PASS reported by W6 close (CHANGELOG line 89; PROGRESS.md line 316) is vacuous — the BLOCKER class L.W0 Lane III invariant 7 ("subpath publication is binary; verify per-subpath before tag") was meant to close was reopened by this gap.

### Classification

This is a **regression of L invariant 7** — subpath publication binary. The wave proof doc declared the requirement (`audit/W6-Lane-A-useClipboard-HeaderRibbon-promotions-proof.md:80-82`), the wave's CHANGELOG entry advertised the subpath as live, BUT the orchestrator absorb at integration time missed the `package.json.exports` + `typesVersions` writes.

Cross-reference: O.W5 Lane B+D **specifically retired** the L.W0 env-gate (`GLASS_UI_RELEASE_SURFACE_GUARD`) and made `verify-export-types` unconditional in `release.sh` to **prevent** this exact class of silent miss. The miss happened anyway because the probe enumerates `package.json.exports` — not `vite.library.ts` entries or `src/*.ts` flat files. The verification script's source-of-truth is `package.json.exports`; entries reachable in dist but not declared in exports remain invisible to the probe.

### Recommended absorb (inline at W7 close)

Add two entries to `package.json` (W7 close commit; orchestrator-direct edit since this is index-mutation):

```jsonc
// In "typesVersions" → "*":
"header-ribbon": ["dist/header-ribbon.d.ts"],

// In "exports":
"./header-ribbon": {
    "development": "./src/header-ribbon.ts",
    "types": "./dist/header-ribbon.d.ts",
    "import": "./dist/header-ribbon.js"
},
```

Then run `npm run build` → emits `dist/header-ribbon.d.ts`; `npm run verify-export-types` → probes the new entry; ship under W7 close commit (no version bump required — additive subpath registration that was intended at v1.4.0).

Alternative (P-deferral): document the gap in W7 FINAL.md as a deferred fix and ship as v1.4.1 patch. The orchestrator should prefer **inline absorb at W7** because (a) the verbose CHANGELOG v1.4.0 entry already advertises the subpath, (b) external consumers reading v1.4.0 release notes will pull and try to import header-ribbon, (c) the cost of the absorb is one package.json edit + one rebuild.

---

## §3 — MINOR detail: src/api/ surface-count drift

### Evidence

`src/api/index.ts` actual export count:

| Domain | Types | Constants |
|---|---|---|
| Aurora | 12 (AuroraConfig, AuroraCursorApi, AuroraFlow, AuroraInstance, AuroraMedium, AuroraNucleus, AuroraRuntimeMode, AuroraRuntimeOptions, FlowPattern, OklchStop, StrokeMode, WarpMode) | 3 (DEFAULT_AURORA_CONFIG, MAX_NUCLEI, MAX_STOPS) |
| Configurator | 5 (ConfiguratorCloneMode, ConfiguratorPreset, ConfiguratorScrollMode, ConfiguratorState, ConfiguratorStateOptions) | 0 |
| Metaballs | 1 (MetaballConfig) | 1 (DEFAULT_METABALL_CONFIG) |
| Timeline | 3 (TimelineSegment, TimelineSegmentGradient, TimelineSegmentState) | 0 |
| Surface enums | 4 (CardTier, GlassPanelVariant, InstrumentChassisPhase, ToastVariant) | 0 |
| CVA variants | 9 (Alert, Avatar, Badge, Button, Sheet, Slider, Toggle, ToggleChip, MenuItem) | 0 |
| Sidebar domain | 6 (ScrollTrackerOptions, SidebarIndexEntry, SidebarSection, SidebarState, TreeIndexEntry, TreeNode) | 0 |
| Search domain | 5 (FuzzySearchState, SearchableItem, SearchIndex, SearchResult, UseFuzzySearchOptions) | 0 |
| Props triad | 2 (GlassPanelProps, ToastType) | 0 |
| Clipboard (W6) | 2 (UseClipboardOptions, UseClipboardReturn) | 0 |
| HeaderRibbon (W6) | 2 (HeaderRibbonPosition, HeaderRibbonProps) | 0 |
| **Total** | **51 types** | **4 constants** |

Grand total after W6: **55 symbols** (51 + 4).

### Doc claims

- `CLAUDE.md:20` claims "32 canonical public symbols (28 types + 4 constants)" — frozen at L.W1 Lane B; correct at that time but never updated through M.W2 (37 / 33+4), O.W4 (49 / 45+4), O.W6 (53 / 49+4 per Lane A proof; actually 55 / 51+4 because Lane A proof says +4 types but the actual file shows 4 types added).
- `CHANGELOG.md:206` (v1.3.0 entry) — "Surface count 37 → 49 (41 types + 8 constants)" — the 49 total is correct (45 types + 4 constants = 49), but the "(41 types + 8 constants)" parenthetical is arithmetic-wrong by 4 in both columns. Constants doubled; types under-counted by 4.
- `src/api/index.ts:37` (inline M.W2 Lane B header) — "Surface count 32 → 37 (29 types + 8 constants)" — same `8 constants` arithmetic error originated here. Actual was 33 types + 4 constants = 37.
- `src/api/index.ts:51` (inline O.W4 Lane A header) — "Surface count 37 → 49 (41 types + 8 constants)" — duplicates the same `8 constants` error from M.W2.

### Origin diagnosis

The `8 constants` figure first appeared at M.W2 Lane B (`src/api/index.ts:37`) when the surface was 33 types + 4 constants = 37. The author likely conflated types and constants or double-counted. O.W4 Lane A inherited the error verbatim. O.W6 Lane A's proof doc says "Types-only delta — no new constants" (correctly) and gives `49 → 53` (correct for that delta on a 49-baseline, but the baseline itself was wrong).

### Classification

**MINOR** — the doc claim is internally inconsistent (the totals are right; the type/constant split is doubled-up on the constants side). No consumer-visible impact; `/api` resolves correctly regardless of the inline comment arithmetic.

### Recommended absorb (inline at W7 close, OR P-deferral)

Single-line edit at three sites:

1. `CLAUDE.md:19-20` — refresh from "32 canonical public symbols (28 types + 4 constants)" to **"55 canonical public symbols (51 types + 4 constants)"**.
2. `src/api/index.ts:37` — refresh from "32 → 37 (29 types + 8 constants)" to **"32 → 37 (33 types + 4 constants)"**.
3. `src/api/index.ts:51` — refresh from "37 → 49 (41 types + 8 constants)" to **"37 → 49 (45 types + 4 constants)"** AND extend the comment block with a parallel O.W6 Lane A note: "O.W6 Lane A extensions (v1.4.0): 4 type promotions — UseClipboardOptions + UseClipboardReturn (clipboard cohort) + HeaderRibbonProps + HeaderRibbonPosition (header-ribbon cohort). Surface count 49 → 53 (49 types + 4 constants)." — **note**: 49 → 53 if W6 Lane A claim of "+4 types" is correct; actual count after Lane A is 51 types + 4 constants = 55 (because the new entries include 4 types AND a HeaderRibbon `Props` was actually authored; 2 + 2 = 4 types is correct; my Lane A 49 → 53 count drops by 2 vs my §3 51-types because of a Lane A 2-prior-vs-2-new accounting check needed; see §6 spot-verification).

---

## §4 — MINOR detail: CLAUDE.md custom/ tree drift

`CLAUDE.md:72` declares "30 custom package dirs". `find src/components/custom -maxdepth 1 -type d` shows 31 sub-dirs after `header-ribbon/` was added at W6 close. The structure-tree at lines 73-113 enumerates 30 packages and omits `header-ribbon/`.

`CLAUDE.md:167` "remaining 23 `custom/` packages reach consumers only via their dedicated subpath" — should be "remaining 24" (header-ribbon is subpath-only per W6 Lane A proof line 71; "Not added to the root barrel — per the v1.0 cherry-pick acceptance bar in src/index.ts:58-74, this is a 'vertical/themed substrate'").

**Recommended absorb**: refresh the custom/ tree at CLAUDE.md to add `header-ribbon/` and bump "30" → "31"; bump "23" → "24" at the entry-point section. Inline at W7 close.

---

## §5 — MINOR detail: CLAUDE.md subpath surface count drift

`CLAUDE.md:194` and `CLAUDE.md:242` claim "37 flat JS subpaths" and "38 entries total in package.json exports". With header-ribbon properly wired (per BLOCKER §2 resolution), the corrected counts are:

- 38 flat JS subpaths (37 + header-ribbon)
- 39 entries in package.json.exports (38 JS + 1 CSS /styles)

If the BLOCKER absorb lands at W7 close, refresh CLAUDE.md §Subpath surface accordingly. If P-deferred, refresh at v1.4.1 alongside the package.json fix.

---

## §6 — Spot-verification evidence

### Source-side rename verification (CHANGELOG v1.3.0 claims)

```
$ grep avatarVariants src/components/ui/avatar/index.ts
export const avatarVariants = cva(...
export type AvatarVariants = VariantProps<typeof avatarVariants>
```

→ Plural `avatarVariants` ships; `AvatarVariants` type alias preserved. CHANGELOG v1.3.0 line 236 verified.

```
$ grep installDarkModeSync src/composables/motion/installDarkModeSync.ts
export function installDarkModeSync(onSync: () => void): void { ...
$ grep useDarkModeSync src/  # zero hits
```

→ Rename complete; no `useDarkModeSync` residual. CHANGELOG v1.3.0 line 231 + MIGRATION.md:561-581 verified.

### W2 dock-context verification

```
$ grep -E "DOCK_CONTEXT_KEY|DockContext" src/components/custom/dock/composables/dockContext.ts | head
export const DOCK_CONTEXT_KEY: InjectionKey<DockContext> = Symbol("DOCK_CONTEXT_KEY");
export interface DockContext { id; orientation; keepOpen; release; held }
export function useDockContext(): DockContext { ... throws on null }
export function useOptionalDockContext(): DockContext | null { ... }
```

→ DESIGN.md §Dock subsystem typed-context DI shape (line 584) verified.

### W6 token + utility verification

```
$ grep -- --dock-active src/styles/tokens.css | head
--dock-active-bg: var(--muted);
--dock-active-color: var(--foreground);
--dock-active-scale: 1;
--dock-active-border: none;
--dock-active-shadow: none;

$ grep "@utility scale-on-hover" src/styles/utilities.css
@utility scale-on-hover {
    @apply transition-transform duration-fast ease-standard;
    &:hover { transform: scale(var(--scale-hover)); }
}
```

→ W6 Lane B (token ladder) + Lane C (scale-on-hover utility) source matches CHANGELOG v1.4.0 lines 32-56.

### Test-file canonical shape verification (W1 Lane E)

```
$ find src -name "*.test.ts" | wc -l → 21
$ find src -name "*.spec.ts" | wc -l → 0
```

→ CHANGELOG v1.2.1 lines 469-476 verified.

### /api surface verification

```
$ grep "^export" src/api/index.ts | wc -l → 25 (block-level export statements)
$ # Inline tally (block-by-block): 12 + 3 + 5 + 1 + 1 + 3 + 4 + 9 + 6 + 5 + 2 + 2 + 2 = 55 symbols
$ # Constants tally: DEFAULT_AURORA_CONFIG + MAX_NUCLEI + MAX_STOPS + DEFAULT_METABALL_CONFIG = 4
$ # Types tally: 55 − 4 = 51
```

→ 51 types + 4 constants = 55 symbols. Doc claims (CLAUDE.md "32", CHANGELOG "8 constants") drift confirmed.

### header-ribbon BLOCKER verification

```
$ ls dist/header-ribbon*
dist/header-ribbon.js

$ # Note: no dist/header-ribbon.d.ts

$ grep "header-ribbon" package.json
# (no matches)

$ grep "header" vite.library.ts
"header-ribbon": resolve(rootDir, "src/header-ribbon.ts"),

$ git show 25e1b5a -- package.json | grep -E "^[+-]"
-    "version": "1.3.1",
+    "version": "1.4.0",
-        "src/styles"
+        "src/styles",
+        "src/fonts"
```

→ W6 close commit `25e1b5a` did NOT add `./header-ribbon` to `exports` or `typesVersions`. BLOCKER confirmed.

---

## §7 — Classification summary

| ID | Severity | Site | Disposition |
|---|---|---|---|
| γ-B1 | **BLOCKER** | `package.json.exports` missing `./header-ribbon` + `typesVersions["*"]["header-ribbon"]` | **INLINE ABSORB at W7 close** — add the two-key registration; rebuild; re-run verify-export-types |
| γ-M1 | MINOR | CLAUDE.md `/api` surface count (32) | Inline absorb at W7 close — refresh to "55 canonical public symbols (51 types + 4 constants)" |
| γ-M2 | MINOR | CLAUDE.md `custom/` tree omits header-ribbon (30 → 31 dirs) | Inline absorb at W7 close — add header-ribbon line + bump counts (30→31, 23→24) |
| γ-M3 | MINOR | CLAUDE.md subpath count "37 flat JS / 38 total" | Inline absorb at W7 close (post-BLOCKER fix) — bump to "38 flat JS / 39 total" |
| γ-M4 | MINOR | `src/api/index.ts:37 + :51` inline header comment — `8 constants` arithmetic error (×2 of actual 4) | Inline absorb at W7 close — single-line edit at both sites + add O.W6 Lane A header block |
| γ-M5 | MINOR | CHANGELOG v1.3.0 line 206 — same `8 constants` arithmetic | P-deferral — frozen historical entry; modifying past CHANGELOG entries risks consumer-side referential drift. Acceptable to leave as MINOR-historical artefact (cf. precedent: prior CHANGELOG entries are not retroactively edited unless they BLOCK consumers; this one's parenthetical doesn't block) |

---

## §8 — Recommended absorbs at W7 close vs P-deferral

### Inline absorb at W7 close (REQUIRED)

1. **γ-B1**: `package.json` — add `./header-ribbon` to `exports` + `typesVersions["*"]["header-ribbon"]`. Rebuild → emits `dist/header-ribbon.d.ts`. Re-run `npm run verify-export-types` to confirm subpath resolves. This is a regression of L invariant 7 caught at W7; closing it inline preserves the W7 close ceremony's hard-gate evidence integrity.

2. **γ-M1 + γ-M3**: CLAUDE.md — refresh `/api` surface count line (line 20) + subpath surface line (lines 194 + 242). Single-doc, three-line touch.

3. **γ-M2**: CLAUDE.md — add `header-ribbon/` to the `custom/` tree at line 105-or-similar; bump "30 custom package dirs" → "31"; bump "remaining 23" → "remaining 24". Same doc touch as γ-M1/M3; one commit absorbs all CLAUDE.md drift.

4. **γ-M4**: `src/api/index.ts:37` + `:51` — fix the `8 constants` doubled count to `4 constants` (×2 sites); add the O.W6 Lane A header note documenting the +4 types promotion.

### P-deferral (acceptable)

- **γ-M5**: CHANGELOG v1.3.0 parenthetical (`41 types + 8 constants`). Frozen historical entry; consumer-side impact zero. Leave for now; document the precedent for future P-tranche audit precision pass.

### Out of scope

- MIGRATION.md silence on v1.4.0 — CLEAN per §1 row. v1.4.0 is purely additive; no migration content owed.
- DESIGN.md — CLEAN per §1 rows. Both required new sections (Dock subsystem typed-context DI shape at O.W2; module-scope process-singleton registries at O.W4) landed verbatim per the wave declarations.

---

## §9 — γ verdict

**BLOCKER**: 1 (γ-B1 — header-ribbon subpath unwired; closes inline at W7).
**MINOR**: 4 inline-absorb candidates (γ-M1 to γ-M4; all CLAUDE.md + src/api/index.ts comment edits) + 1 P-deferred historical (γ-M5).

The BLOCKER warrants W7 close commit treatment because v1.4.0 already shipped (`git tag` confirms tag exists) advertising a subpath that doesn't resolve. The fix is one package.json edit + a rebuild + a re-verify. Without it, external consumers attempting `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"` at v1.4.0 will fail with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

The MINORs are cosmetic doc-counter refreshes that have accumulated across M.W2 / O.W4 / O.W6 without rolling forward — γ would ideally roll forward at every close; the W7 ceremony is the canonical roll-up point. All four inline absorbs are single-line touches.

No DESIGN.md drift; no MIGRATION.md drift (additive minor doesn't owe migration content per L invariant 16 phrasing); CHANGELOG drift confined to the BLOCKER consequence (vacuous PASS reporting) and the historical 8-constants typo (P-deferred).

**End of γ doc-drift audit.**
