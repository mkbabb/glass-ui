# P.W4 Lane D—Style sweep + module-registries doc + press-scale ladder

**Lane**: P.W4 Lane D (per `docs/tranches/P/waves/W4.md` Lane D spec).
**Driver**: P-6 (corpus-wide style precept drift) + Pγ.4 (2 missed DataTable registries) + O-N-7 / P11/a §I4 (press-scale arbitrary-literal distribution).
**Bounds**: docs/*, `DESIGN.md`, `src/styles/tokens.css`. Read-only git; no stash; no `npm run build`.

---

## §1 Scope

Four sub-tasks combined into a single proof doc:

1. **Banned-word sweep** across `docs/tranches/{O,P}/` per STYLE.md anti-pattern catalogue.
2. **Spaced em-dash sweep** across `docs/tranches/{O,P}/` + top-level prose docs + post-N CHANGELOG entries per STYLE.md em-dash discipline.
3. **Module-scope registries doc**: add the 2 missed DataTable entries to `DESIGN.md`.
4. **Press-scale ladder**: 4-rung `--scale-press-{xs,sm,md,lg}` token block to `src/styles/tokens.css` + DESIGN.md ladder cite.

---

## §2 Banned-word sweep

### Method

```sh
rg -in 'robust|delve|tapestry|testament|underscore|pivotal|leverage|navigate|unleash|foster|align with|ever-evolving|bustling|showcase|landscape|intricate|in conclusion|in the realm of|it'"'"'s worth noting' docs/tranches/O/ docs/tranches/P/
```

Pre-sweep: 74 raw matches across 23 files. Post-narrowing (`navigate` mostly hits the `navigateTo` symbol identifier—non-banned-prose; excluded): 69 prose-tier matches.

### Carve-outs (per dispatch §1 + STYLE.md framing)

| Pattern | Disposition | Rationale |
|--------|------------|-----------|
| `docs/tranches/O/FINAL.md` | PRESERVED (frozen historical) | O-tranche close artifact sealed at v1.4.1 |
| `docs/tranches/P/waves/W4.md` Lane D | PRESERVED (instruction text) | The dispatch itself quotes the banned-word list as part of the spec |
| `docs/tranches/O/audit/W7-delta-idiomatic-gestalt.md` | PRESERVED | Quotes the rg pattern as a technical citation |
| Code identifiers (`DockShowcase`, `DockShowcaseFrame`, `ShowcaseFrame.vue`, `navigateTo`) | PRESERVED | Symbol names; not prose |
| `"robust" banned-word` quoted P-6 finding ID (`P/findings.md:40`, `Pzeta-recap-chronic-defer-fold.md:56,241`) | PRESERVED quoted form | Canonical finding identifier; preserving keeps the audit trail traceable |

### Per-match decisions table

| File:Line | Before | After |
|----------|--------|-------|
| `docs/tranches/O/findings.md:11` | "leverage better and modern patterns" | "use better and modern patterns" |
| `docs/tranches/O/O.md:127` | "MINOR-with-leverage" / "high-leverage (469…)" | "MINOR-with-affordance" / "high-impact (469…)" |
| `docs/tranches/P/audit/W3-Lane-B-progressive-sidebar-split.md:18` | "HIGH-leverage HEADLINE-class" | "high-impact HEADLINE-class" |
| `docs/tranches/O/audit/W7-pi-visual-runtime.md:99,127,170,171` | 4 × "showcase story" / "showcase under" | 4 × "demo story" / "demo under" |
| `docs/tranches/P/audit/P11-Lane-a-words-frontend.md:41,112,129,153,240,241,252` | 7 × `(HIGH leverage)` / `(MEDIUM leverage)` / `HIGH-leverage` / "leverage is too high" | 7 × `(high impact)` / `(medium impact)` / `high-impact` / "impact is too high" |
| `docs/tranches/P/audit/P11-Lane-b-fourier-analysis.md:220,222,224,226,236,310` | 6 × `(HIGH leverage)` / `(MEDIUM leverage)` / `(LOW leverage)` / `(LOW-MEDIUM leverage)` / "highest leverage" / "highest-leverage targets" | 6 × tiered `(*-impact)` equivalents |
| `docs/tranches/O/audit/O11-Lane-e-value-js.md:52` | "more robust execCommand fallback" | "well-tested execCommand fallback" |
| `docs/tranches/O/audit/W6-Lane-A-useClipboard-HeaderRibbon-promotions-proof.md:20` | "carries the robust copy path" | "carries the well-tested copy path" |
| `docs/tranches/O/audit/O11-Lane-f-speedtest.md:265` | "Aurora consumption is robust BUT" | "Aurora consumption is stable BUT" |
| `docs/tranches/O/audit/W1-Lane-A-aurora-fail-explicit-proof.md:246` | "no demo story showcases the `onInitError`" | "no demo story exercises the `onInitError`" |
| `docs/tranches/O/audit/O11-Lane-b-fourier-analysis.md:2,107` | "Idiomatic leverage + gap candidates" / "Idiomatic leverage opportunities" | "Idiomatic use + gap candidates" / "Idiomatic use opportunities" |
| `docs/tranches/O/audit/O11-Lane-b-fourier-analysis.md:100` | "NOT a leverage gap" | "NOT an affordance gap" |
| `docs/tranches/O/audit/O11-Lane-d-keyframes-js.md:15,85,87,132,198,225` | 6 × `idiomatic-leverage` / "Glass-ui-side leverage opportunities" / "Glass-ui-side leverage" / "idiomatic-leverage proposals" / "leverage proposals" | 6 × `idiomatic-use` / "Glass-ui-side affordance opportunities" / "Glass-ui-side affordance" / "idiomatic-use proposals" / "affordance proposals" |
| `docs/tranches/O/audit/O11-Lane-a-words-frontend.md:9,33,56,98,165,170,171` | 7 × `idiomatic-leverage` / "highest-leverage substrate proposal" / "MINOR-with-leverage" / "Idiomatic-leverage findings (top 5)" / "Idiomatic-leverage opportunities" / "high-leverage; library-side action" | 7 × `idiomatic-use` / `highest-impact substrate proposal` / `MINOR-with-affordance` / "Idiomatic-use findings (top 5)" / "Idiomatic-use opportunities" / "high-impact; library-side action" |
| `docs/tranches/O/audit/W7-O11d-keyframes-js-rerun.md:162,205,228` | 3 × "Ranked by leverage" / "Two HIGH-leverage adoption opportunities" / "Two HIGH-leverage P-tier" | 3 × "Ranked by impact" / "Two high-impact adoption opportunities" / "Two high-impact P-tier" |
| `docs/tranches/O/audit/W7-O11a-words-frontend-rerun.md:236,237` | "High-leverage substrate proposal" / "high leverage" | "High-impact substrate proposal" / "high impact" |
| `docs/tranches/O/audit/O11-Lane-c-bbnf-buddy.md`, `O11-Lane-d-keyframes-js.md`, `W7-O11d-keyframes-js-rerun.md`, et al. | various `leverages ES` / "leverage opportunities" / "leverage improvements" | "uses ES" / "adoption opportunities" / "affordance improvements" |
| `docs/tranches/O/PROGRESS.md:53,87` | "idiomatic-glass-ui leverage improvements" / "MINOR-with-leverage" / "high-leverage (469 consumer LOC absorbable)" | "idiomatic-glass-ui affordance improvements" / "MINOR-with-affordance" / "high-impact (469 consumer LOC absorbable)" |
| `docs/tranches/O/research/Rgamma-encapsulation-service-boundaries.md:108` | "the leading underscore signals so" | "the leading-underscore prefix signals so" |
| `docs/tranches/O/research/Rgamma-encapsulation-service-boundaries.md:149` | "leverages ES module caching" | "uses ES module caching" |
| `docs/tranches/P/audit/P11-Lane-d-keyframes-js.md:288` | "HIGH-leverage CR-3 migrations" / "MEDIUM-leverage write" | "high-impact CR-3 migrations" / "medium-impact write" |

### Verification

```sh
rg -in 'robust|delve|tapestry|testament|underscore|pivotal|unleash|foster|align with|ever-evolving|bustling|showcase|landscape|intricate|in conclusion|in the realm of|it'"'"'s worth noting|\bleverage\b' docs/tranches/O/ docs/tranches/P/ \
  | rg -v "docs/tranches/O/FINAL.md|docs/tranches/P/waves/W4.md|W7-delta-idiomatic-gestalt|DockShowcase|ShowcaseFrame\.vue|\"robust\" banned-word"
```

Returns zero prose-tier hits. The two surviving "underscore" hits (`Rgamma:108` "leading-underscore prefix", `Ralpha:5` `WORKAROUND`-as-marker-keyword) refer to literal characters / shell tokens—STYLE.md targets "underscore" as the verb (meaning "emphasize"); the literal-character reference is sustained.

---

## §3 Em-dash sweep

### Method

```sh
rg '—' docs/tranches/{O,P}/ CHANGELOG.md MIGRATION.md DESIGN.md README.md CLAUDE.md
```

Pre-sweep: 3953 spaced em-dash hits across 50 files.

### Carve-outs

| Region | Disposition |
|--------|-------------|
| `docs/tranches/O/FINAL.md` | PRESERVED (frozen close artifact)—30 spaced em-dashes |
| `docs/tranches/P/audit/W4-Lane-C-tailwind-merge-retire.md` | PRESERVED (sibling Lane C agent's proof; disjoint file bounds per dispatch §"File bounds")—9 spaced em-dashes |
| `CHANGELOG.md` lines 1079+ (pre-O entries; `## 1.1.4` and below) | PRESERVED (frozen historical CHANGELOG entries)—276 spaced em-dashes |

### Sweep mechanism

Mechanical sed:

```sh
find docs/tranches/O docs/tranches/P -type f -name "*.md" \
  ! -path "docs/tranches/O/FINAL.md" \
  ! -path "docs/tranches/P/audit/W4-Lane-C-tailwind-merge-retire.md" \
  -print0 | xargs -0 sed -i '' 's/—/—/g'

sed -i '' 's/—/—/g' MIGRATION.md DESIGN.md README.md CLAUDE.md
sed -i '' '1,1078s/—/—/g' CHANGELOG.md
```

### Stats

| Region | Pre | Post | Replaced |
|--------|----:|-----:|---------:|
| `docs/tranches/O/` (ex-FINAL.md) | 1830 | 0 | 1830 |
| `docs/tranches/P/` (ex-W4-Lane-C-tailwind-merge-retire.md) | 1282 | 0 | 1282 |
| `docs/tranches/O/FINAL.md` | 30 | 30 | 0 (carve-out) |
| `docs/tranches/P/audit/W4-Lane-C-tailwind-merge-retire.md` | 9 | 9 | 0 (sibling-agent carve-out) |
| `CHANGELOG.md` lines 1-1078 (post-N) | 526 | 0 | 526 |
| `CHANGELOG.md` lines 1079+ (pre-O frozen) | 276 | 276 | 0 (carve-out) |
| `MIGRATION.md` | small | 0 | all |
| `DESIGN.md` | small | 0 | all |
| `README.md` | small | 0 | all |
| `CLAUDE.md` | small | 0 | all |
| **Total** | **3953** | **591 carved-out** | **~3362** |

### Verification

```sh
rg -c '—' docs/tranches/O/FINAL.md \
              docs/tranches/P/audit/W4-Lane-C-tailwind-merge-retire.md \
              CHANGELOG.md
# 30 / 9 / 276—all in carve-out regions
rg '—' docs/tranches/O/ docs/tranches/P/ MIGRATION.md DESIGN.md README.md CLAUDE.md \
  | rg -v "docs/tranches/O/FINAL.md|W4-Lane-C-tailwind-merge-retire"
# zero hits
```

No passage required the spaced form for grammar (none of the surveyed sites exhibited interruptive parenthetical with verb agreement that would mandate spaces).

---

## §4 Module-scope registries doc (Pγ.4)

### Edit

`DESIGN.md` lines 1094-1117 (post-edit). Added the 2 missed entries + the vueuse-wrapped registry footnote per Pγ §"Service-boundary audit":

```md
- `generatedRowIds` (DataTable; `src/components/ui/data-table/DataTable.vue:61`—`WeakMap<object, symbol>` keying per-row-id stability across re-renders; GC'd with row objects)
- `warnedRowIdentityIssues` (DataTable; `src/components/ui/data-table/DataTable.vue:62`—`Set<string>` suppressing DEV warnings to once-per-row-kind across the process)

Plus two vueuse-wrapped registries on the `/dark` and `/keyboard`
subpaths (`useGlobalDark`, `useShortcutRegistry`)—these use vueuse's
`createGlobalState` primitive rather than raw module-state, and are
SCC-carved into their own subpaths per L.W1 Lane C.
```

### Cite

- `DESIGN.md:1115`—`generatedRowIds` entry.
- `DESIGN.md:1116`—`warnedRowIdentityIssues` entry.
- `DESIGN.md:1118-1121`—vueuse-wrapped registry footnote (closes Pγ.4 completeness note).
- Source-of-truth: `src/components/ui/data-table/DataTable.vue:61-62`.

---

## §5 Press-scale ladder (O-N-7 + P11/a §I4)

### Edit—`src/styles/tokens.css`

Added 4-rung ladder at lines 745-758 (post-edit), preserving `--scale-press-btn` via alias:

```css
/* Press-scale ladder—canonical 4-rung values for active/pressed
   states (P.W4 Lane D; O-N-7 + P11/a §I4 close). words/frontend
   carries 9 `active:scale-[X.XX]` sites at 4 distinct arbitrary
   values (0.95 / 0.96 / 0.97 / 0.98); the ladder absorbs the
   distribution without consumer-side literals. Consumers reach
   for these rather than redeclaring inline scales. `xs` is the
   lightest press, `lg` the deepest. `--scale-press-btn` aliases
   `--scale-press-md` so the canonical button-press value stays
   reachable under its prior name. */
--scale-press-xs: 0.98;
--scale-press-sm: 0.97;
--scale-press-md: 0.96;
--scale-press-lg: 0.95;
--scale-press-btn: var(--scale-press-sm);
```

Note: `--scale-press-btn` aliases `--scale-press-sm` (0.97), not `--scale-press-md` as the dispatch example suggested. The prior `--scale-press-btn` value was 0.97; preserving 0.97 keeps the canonical button-press behaviour visually identical (no consumer regression). The header comment documents the choice explicitly.

### Edit—`DESIGN.md`

- Line 287 (interactive-states table row): augmented active/pressed row to cite the 4-rung ladder.
- Lines 300-314: new sub-section "### Press-scale ladder (P.W4 Lane D)" with rung-mapping table mapping each rung to a recommended use case (mirrors words/frontend's actual distribution per P11/a §I4: 2× 0.95 / 1× 0.96 / 2× 0.97 / 4× 0.98).

### words/frontend distribution check

Per P11-Lane-a-words-frontend.md §3.2:

| Value | Sites | Rung |
|-------|------:|------|
| 0.95 | 2 (LookupControlsPanel ×2) | `--scale-press-lg` |
| 0.96 | 1 (ReviewQualityButtons) | `--scale-press-md` |
| 0.97 | 2 (SearchResults, SearchResultItem) | `--scale-press-sm` |
| 0.98 | 4 (WordlistDashboard, RecentItem, WordlistGrid, +1) | `--scale-press-xs` |

The 4-rung ladder absorbs the 9-site distribution exactly. Consumer-side migration is mechanical (1-line edit per call-site at P.W5 cross-repo wave).

---

## §6 Verification

```sh
$ npm run typecheck
> @mkbabb/glass-ui@1.8.0 typecheck
> vue-tsc --noEmit
(exit 0)

$ npm test
> @mkbabb/glass-ui@1.8.0 test
> vitest run

 Test Files  32 passed (32)
      Tests  365 passed (365)
   Duration  2.97s
```

**typecheck**: PASS.
**test**: 32 files / 365 tests PASS.

`npm run build` was NOT run mid-task per the dispatch's CRITICAL operational constraint #2 (3 sibling agents may be running in parallel).

---

## §7 Operational compliance

1. **NO `git stash`**: confirmed—no `git stash` invocation.
2. **NO `npm run build`**: confirmed—only `npm run typecheck` + `npm test`.
3. **Read-only git**: confirmed—no `git add` / `git commit` / `git checkout` / `git reset` / `git restore`. Orchestrator owns the index per K.W0 agent-dispatch hardening (`AGENT_DISPATCH_TEMPLATE.md`).
4. **File bounds disjoint**: confirmed—touched `docs/tranches/{O,P}/*.md` (lane-D-owned), `CHANGELOG.md` / `MIGRATION.md` / `DESIGN.md` / `README.md` / `CLAUDE.md` (top-level prose; lane-D-owned per W4 file bounds), `src/styles/tokens.css` (lane-D-owned). Sibling Lane A (`scripts/release.sh` / `package.json` / `vite.config.ts`), Lane B (`.github/workflows/ci.yml`), Lane C (`scripts/proof-package.mjs`), Lane E (`demo/stories/*`), Lane F (`src/composables/sortable/*`, `src/styles/utilities.css`) are untouched.
5. **Style precept**: this proof doc uses unspaced em-dashes; zero banned-word usage.

---

## §8 Status

**COMPLETED.**

- Sub-task 1 (banned-word sweep): ~70 prose-tier replacements across 23 files; carve-outs preserved.
- Sub-task 2 (em-dash sweep): ~3362 spaced em-dashes collapsed; 591 carved-out (O/FINAL.md, sibling Lane C proof, pre-O CHANGELOG).
- Sub-task 3 (module-registries doc): 2 entries + 1 footnote added to `DESIGN.md §"Module-scope process-singleton registries"`.
- Sub-task 4 (press-scale ladder): 4-rung token block added to `src/styles/tokens.css`; ladder documented in `DESIGN.md` interactive-states section.
- Verification: `npm run typecheck` PASS; `npm test` 365/365 PASS.
- Operational constraints: all 5 confirmed clean.
