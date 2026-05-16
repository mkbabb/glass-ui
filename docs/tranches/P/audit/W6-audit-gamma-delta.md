# P.W6 close audit—γ + δ lanes (doc-drift + idiomatic-gestalt)

**Status**: COMPLETED.
**Lanes**: γ (doc-drift) + δ (idiomatic-gestalt).
**Mode**: read-only git.
**HARD CAP**: 30 min.

---

## §1—Scope

Two strengthened audit lanes of the 7-lane W6 close audit, per `docs/tranches/P/waves/W6.md` §"7 strengthened audit lanes":

- **γ**—doc-drift: verify CLAUDE.md + CHANGELOG.md + MIGRATION.md + demo manifest reflect HEAD source post-P-close.
- **δ**—idiomatic-gestalt (P invariants 4 + 5): substrate consistency + custom-property cascade pattern + no-legacy-aliases + banned-word + em-dash sweep + invariants 28-29 codification status.

---

## §2—γ doc-drift (per-doc verification)

### 2.1—CLAUDE.md /api surface count (L22 running tally)

**Expected** (per dispatch): 66 (62 types + 4 constants).

**Actual at HEAD**:
- `src/api/index.ts` preamble final tally (P.W3 Lane C line): `Surface count 64 → 66 (62 types + 4 constants)`—MATCHES expected.
- Mechanical export enumeration: 62 types + 4 constants = 66—MATCHES expected.
- `CLAUDE.md:22` text: `# 55 canonical public symbols (51 types + 4 constants)—M.W2 + O.W4 + O.W6 extensions; P.W0 resync`—**STALE**. L22 was last rewritten at P.W0 Lane C to "55 (51 types + 4 constants)"; the post-W0 promotions at W1 Lane A (+8: AB+1 cohort), W2 Lane D (+1: UseDockStateReturn), and W3 Lane C (+2: PaperBackdrop) brought the canonical at-HEAD count to 66 but the CLAUDE.md L22 tally was not re-incremented.

**Verdict**: **DRIFT (MINOR)**. CLAUDE.md L22 reads "55 (51 types + 4 constants)" vs actual 66 (62 types + 4 constants). The `src/api/index.ts` preamble running tally at L98 IS current ("Surface count 64 → 66 (62 types + 4 constants)"). The drift is one CLAUDE.md line behind.

### 2.2—CLAUDE.md custom-package dir count (L74)

**Expected** (per dispatch): 35.

**Actual**:
- Filesystem: `ls -d src/components/custom/*/ | wc -l` = 35.
- `CLAUDE.md:74` text: `# 35 custom package dirs (every dir has a package barrel)`.

**Verdict**: **CLEAN**.

### 2.3—CLAUDE.md subpath count (L201 + L249)

**Expected** (per dispatch): 42.

**Actual**:
- `package.json` JS subpath entries (excl. `.`, `./styles`, `./package.json`): 42.
- `CLAUDE.md:201`: "42 flat per-package subpaths".
- `CLAUDE.md:249`: "**42 flat JS subpaths** (37 component packages + `/api` + `/forms` + `/dark` + `/keyboard` + `/carousel`) plus the `/styles` CSS bundle (43 entries total in `package.json` exports, excluding `./` root + `./package.json`)".

Math check: 37 + 5 = 42 JS subpaths. 42 JS + 1 CSS = 43 entries (matches `package.json` exports minus `./` + `./package.json`).

**Verdict**: **CLEAN**.

### 2.4—CHANGELOG v1.7.0 → v1.8.3 dates

**Expected** (per dispatch): all dated 2026-05-16.

**Actual**:
| Tag | Date | Status |
|---|---|---|
| 1.8.3 | 2026-05-16 | matches |
| 1.8.2 | 2026-05-16 | matches |
| 1.8.1 | 2026-05-16 | matches |
| 1.8.0 | 2026-05-16 | matches |
| 1.7.2 | 2026-05-16 | matches |
| 1.7.1 | 2026-05-16 | matches |
| 1.7.0 | 2026-05-14 | **mismatch** |

The v1.7.0 entry retains the AB+1 cohort origin date (`b201b03` package-bump-without-tag landed 2026-05-14); P.W0 Lane B ran the ceremonial gate matrix on 2026-05-16 but the CHANGELOG header retained the substrate's authoring date. The v1.7.0 entry body documents the ceremonial tag explicitly ("P.W0 Lane B ceremonial tag").

**Verdict**: **MINOR**. Defensible (origin date vs ceremonial-tag date is a documented choice), but per the dispatch's literal "dated 2026-05-16" criterion, this is a drift flag. The body text correctly explains the ceremonial vs origin distinction; the date field choice is the only divergence.

### 2.5—MIGRATION.md stale references to retired symbols

**Method**: grep for symbols retired in P-tranche (MetricRow, GlassScrubber, PaperBackdrop, ProgressiveSidebar, useLeaveTimer, usePopupMutex, idle-bob, etc.) + the standing v0.9 retirees (useOffsetPagination, useVirtualSectionWindow, DockShowcaseFrame, etc.).

**Actual**:
- MIGRATION.md is the v0.9.x → v1.0 doc; it documents `useOffsetPagination`, `useVirtualSectionWindow`, `useWindowedStore`, `virtualSectionLayout`, `DockShowcaseFrame` as RETIRED in the §3 + §4 "Breaking changes" sections—these are intentional retirement annotations, not stale references.
- P-tranche retirements (usePopupMutex, idle-bob, useLeaveTimer) are CONSUMER-private retirements (archived at `docs/tranches/P/archive/` per P.W5 Lane F); no MIGRATION.md entry needed because they were never glass-ui public surface.
- P-tranche promotions (GlassScrubber, ProgressiveSidebar slotted-chassis, PaperBackdrop /api) are additive substrate; no migration disruption.

**Verdict**: **CLEAN**.

### 2.6—Demo manifest: 7 W4 Lane E stories registered

**Expected** (per W4 Lane E + CHANGELOG v1.8.1 §"Lane E"):
1. `composables/use-clipboard.vue`
2. `custom/header-ribbon.vue`
3. `dock/icon-button-token-ladder.vue`
4. `utilities/scale-on-hover.vue`
5. `sliders/glass-scrubber.vue`
6. `navigation/progressive-sidebar-section.vue`
7. `foundations/paper-backdrop-texture-system.vue`

**Actual**: all 7 registered in `demo/stories/manifest.ts` (verified via grep; one matching row per story).

**Verdict**: **CLEAN**.

---

## §3—δ idiomatic-gestalt (per-pattern verification)

### 3.1—Substrate consistency: W2 paired-helper completions match per-intent dock-context precedent

Per Pδ §2.2 + invariant 25 "per intent" clause, W2 ships three paired-helper completions, each shaped by the use case rather than the wave-plan template's both-helper default.

| Lane | Symbol | Shape shipped | Rationale (Pδ §2.2 + audit doc) |
|---|---|---|---|
| W2-A | `CONFIGURATOR_DENSITY_KEY` | **optional-only** (`provideConfiguratorDensity` + `useOptionalConfiguratorDensity`) | `<ConfiguratorRow>` can render bare; strict throw would be dead code |
| W2-B | `SORTABLE_CONTEXT` | **strict-only** (`provideSortableContext` + `useSortableContext`) | `<SortableItem>` outside `<SortableList>` has no registration target; optional helper would be dead code |
| W2-C | `GLYPH_FACE_SILHOUETTE_KEY` | **optional-only** (`provideGlyphFaceSilhouette` + `useOptionalGlyphFaceSilhouette`) | `<DiscoGlyph>` cooperates with `<GlyphFace>` when present, otherwise silent no-op |

Matches the canonical O.W2 `useDockContext` (strict) + `useOptionalDockContext` (optional) precedent shape per intent. Audit docs at `audit/W2-Lane-{A,B,C}-*.md` each cite the Pδ §2.2 verbatim disposition for their per-intent shape choice.

**Verdict**: **CLEAN**.

### 3.2—Custom-property cascade pattern: W5 Lane A.1 MetricRow clamp tokens

W5 Lane A.1 follow-on (E.3 unblock) extends `<MetricRow>` value + unit clamp endpoints via four CSS-var tokens with audacious-poster defaults preserved bit-for-bit:

```css
font-size: clamp(
    var(--metric-row-value-clamp-min, 4.5rem),
    ...,
    var(--metric-row-value-clamp-max, var(--type-display-hero))
);
```

Pattern matches:
- `--phase-color-label` (AC.W6c chassis cascade)—consumer overrides at `:root` or per-row scope.
- `--paper-{underpaint,grain-overlay}-*` (W3 Lane C texture-system)—canonical "var(name, default)" with consumer retint at cascade points.
- `--scale-press-{xs,sm,md,lg}` ladder (W4 Lane D)—four-rung token surface with per-scope override.

No compact-variant prop, no mode union, no SFC fork—canonical custom-property cascade.

**Verdict**: **CLEAN**.

### 3.3—No-legacy-aliases: GlyphFaceSilhouetteKey rename + useSortableContext naming

**`GlyphFaceSilhouetteKey` → `GLYPH_FACE_SILHOUETTE_KEY`** (W2 Lane C):
- `rg "GlyphFaceSilhouetteKey" src/` → zero matches at HEAD.
- All consumer sites (`GlyphFace.vue`, `DiscoGlyph.vue`, `keys.ts`, `index.ts`) updated to UPPER_SNAKE_CASE.
- No PascalCase alias preserved at the barrel—clean break per P invariant 5 + L invariant 4.

**`useSortableContext` (NOT `useSortable`)** (W2 Lane B):
- `useSortable<T>` already exists at `src/composables/sortable/useSortable.ts:206` as the underlying primitive.
- W2 Lane B authored `useSortableContext()` at `src/components/custom/sortable-list/context.ts:32` for the strict-DI helper—name disambiguates per Pδ R1 (matching `useDockContext` / `useDockLayerGroupContext` canonical naming).

**Verdict**: **CLEAN**.

### 3.4—Banned-word sweep at W4 Lane D

**Method**: `rg -inE '\b(leverage|leverages|leveraging|delve|tapestry|testament|underscore|pivotal|robust|unleash|foster|ever-evolving|bustling|intricate|in conclusion|in the realm of|it'"'"'s worth noting)\b' docs/tranches/P/`.

**Actual**: residual hits at:
- `docs/tranches/P/findings.md:40`—quoted P-6 finding ID (`"robust" banned-word`); preserved as audit trail.
- `docs/tranches/P/research/Pzeta-recap-chronic-defer-fold.md:56,241`—same quoted P-6 finding ID.
- `docs/tranches/P/waves/W4.md:41`—literal regex pattern in the wave plan documenting the sweep itself.
- `docs/tranches/P/audit/W4-Lane-D-style-sweep-registries-press-scale.md`—the W4 Lane D proof doc itself, documenting the sweep's verbatim replacements (preserved per carve-out clause).

All hits are quoted IDs / regex patterns / audit-trail entries—preserved by design per W4 Lane D carve-outs. Zero prose-tier banned words at HEAD across P docs.

**Verdict**: **CLEAN** (carve-outs respected).

### 3.5—Em-dash sweep at W4 Lane D

**Method**: `grep -rn "—" docs/tranches/P/`.

**W4 Lane D scope** (verified at `audit/W4-Lane-D-style-sweep-registries-press-scale.md` §3): per-file sweep across `docs/tranches/{O,P}/` + `CHANGELOG.md` (lines 1–1078) + `MIGRATION.md` + `DESIGN.md` + `README.md` + `CLAUDE.md`. Carve-outs: `O/FINAL.md` (frozen close; 30 dashes) + `W4-Lane-C-tailwind-merge-retire.md` (sibling-lane disjoint; 9 dashes) + `CHANGELOG.md` lines 1079+ (pre-O frozen; 276 dashes). Total 3953 → 591 carved.

**Post-W4 authoring drift**:
| Region | Spaced em-dashes |
|---|---|
| `docs/tranches/P/audit/W5-*` (6 files) | 122 |
| `docs/tranches/P/archive/*` (8 files) | 33 |

Sources: W5 audit lane docs (Lane A=32, Lane B=54, Lane C=22, Lane D=6, Lane E=1, Lane A1-metric-row=7) + W6-prep archive docs (`vue-passive-listeners.md`=5, `cache-ttl.md`=6, `value-js-wip-branch.md`=4, `use-popup-mutex.md`=3, `keyframes-overfitting.md`=3, `bbnf-buddy-53-findings.md`=3, `idle-bob.md`=2, `words-frontend-substrate-pending.md`=7).

These are NOT in the W4 Lane D scope (W4 closed prior to these files' authoring), but per STYLE.md §"Em-dash discipline" they violate the unspaced-em-dash mandate.

**Verdict**: **MINOR**. W4 Lane D sweep is verified clean per-file at its scope (P + O docs as of W4 close). Post-W4 docs reintroduced 145 spaced em-dashes—authoring-discipline drift in W5/W6-prep docs that should be re-swept at W6 close, but not a W4-Lane-D-scope BLOCKER.

### 3.6—P-invariants 28 + 29 codification status

**Per W6.md**: "Codify in precept submodule (`docs/precepts/`): Invariant 28—Zero deferral at tranche close. ... Invariant 29—AB+1 retrospective discipline. ... LESSONS-LEARNED entry: `2026-05-14 - Zero Deferral + AB+1 Retrospective Discipline Codified at P.W6`. ... Commit + push precept submodule advance from `46ee7e9` → next; bump glass-ui submodule pointer."

**Actual at audit time**:
- Precept submodule HEAD: `46ee7e9` (O.W0 close)—**unchanged**.
- Precept submodule worktree:
  - `M instructions/tranche/SPEC.md`—invariants 28 + 29 authored (verified at SPEC.md L24 + L172).
  - `?? instructions/LESSONS-LEARNED-P-additions.md`—LL entry authored (verified L11-12 for invariant 28; L20 for invariant 29; L27-29 for the audit-stash-list invariant escalation).
- Glass-ui top-level status: `m docs/precepts` (submodule has uncommitted modifications + an untracked file).
- No commit advancing `46ee7e9 → next` exists yet.

**Verdict**: **AUTHORED, NOT-YET-COMMITTED**. The codification text exists in the worktree but the orchestrator-direct lane advancing the submodule (per W6.md §"Precept submodule advance") has not run at audit time. This is the canonical state for the γ + δ audit lanes (read-only, parallel to the orchestrator-direct precept-advance lane); the dispatch γ task explicitly asked to verify status, and the answer is "authored in worktree; commit + push + glass-ui pointer-bump pending W6 close ceremony".

---

## §4—Verdict per lane

| Lane | Verdict | Findings |
|---|---|---|
| **γ doc-drift** | **MINOR** | (a) CLAUDE.md:22 /api tally stale at "55 (51 types + 4 constants)" vs actual HEAD 66 (62 types + 4 constants); the `src/api/index.ts` preamble running tally L98 IS current. (b) CHANGELOG v1.7.0 dated 2026-05-14 (substrate origin) rather than 2026-05-16 (ceremonial tag date)—defensible but flagged per dispatch's literal "dated 2026-05-16" criterion. All other γ checks CLEAN. |
| **δ idiomatic-gestalt** | **MINOR** | (a) Post-W4 docs (W5 audit lanes + W6-prep archives; 14 files) reintroduced 145 spaced em-dashes—authoring-discipline drift, not a W4-Lane-D-scope regression. (b) P-invariants 28 + 29 AUTHORED in precept worktree but NOT COMMITTED at audit time (orchestrator-direct lane pending). All substrate-consistency + cascade-pattern + clean-break checks CLEAN. |

Neither lane returns a BLOCKER. The γ /api tally drift is a 1-line fix at CLAUDE.md:22. The CHANGELOG v1.7.0 date drift is editorial choice. The em-dash post-W4 drift is in 14 W5/W6-prep files and is fixable with one `sed` pass scoped to those files (with appropriate carve-outs for quoted regex patterns or sibling-lane-frozen docs). The precept-submodule codification is on the orchestrator-direct critical path scheduled at this W6 close.

---

## §5—Hardened-git compliance

This lane is read-only per dispatch §"CRITICAL operational constraints":

1. READ-ONLY git only—confirmed; no stage / commit / stash / checkout / reset / restore.
2. NO `npm run build` mid-task—confirmed; no build invocations.
3. Do not modify source files—confirmed; only the audit proof doc at `docs/tranches/P/audit/W6-audit-gamma-delta.md` was authored (orchestrator-owned for index staging).

Repository state at audit-completion time matches state at audit-start time. The precept submodule's pre-existing uncommitted modifications + the W6 audit re-runs + archive docs visible in `git status` are pre-existing orchestrator-managed worktree state, not γ + δ lane mutations.

---

## §6—Status

**COMPLETED**. γ + δ audit returns **MINOR / MINOR** per §4. No BLOCKER. 4 specific drift items cited for orchestrator absorption at W6 close ceremony:

1. CLAUDE.md L22 /api tally: "55 (51 types + 4 constants)" → "66 (62 types + 4 constants)".
2. CHANGELOG v1.7.0 date: optional re-date to 2026-05-16 (ceremonial-tag date) or document the origin-date convention explicitly.
3. Em-dash sweep extension to post-W4 P docs (14 files; 145 spaces; `sed` scoped to W5 audit + W6 archive files with appropriate carve-outs).
4. Precept submodule advance: commit + push the invariants 28-29 codification + LL entry; bump glass-ui submodule pointer (orchestrator-direct lane per W6.md).
