# H — Deep Post-Close Audit Lane γ (Full-Surface Doc Drift)

**Date**: 2026-05-05.
**Owner**: read-only deep-audit agent (γ lane of the 6-agent post-H deep dispatch at HEAD `c5f196c feat(tranche-h/w6): close ceremony + post-close audit`).
**Baseline**: `audit/H-audit-γ-doc-drift.md` (W6.γ — caught 6 critical findings that were absorbed in W6 and FINAL.md authored after).
**Scope of this deeper pass**: full doc surface — DESIGN.md (1174 lines), CLAUDE.md, README.md, every doc under `docs/`, every wave spec across all tranches (C, D, D-II, E, F, G, H), package.json `exports`+`typesVersions`, `vite.library.ts`, `demo/stories/manifest.ts`. Cross-references doc claims against `src/styles/*.css`, `src/components/*`, `src/composables/*`, `src/index.ts`, and runtime tokens at HEAD.
**Boundaries**: read-only, no destructive git, no source modifications.

---

## Preamble

W6.γ closed clean against the H corpus (CLAUDE.md, PROGRESS.md, H wave specs, H.md, H-pre-close.md). This deeper pass walks the surfaces W6.γ did not cover: README.md, DESIGN.md component-catalog enumerations, the CSS-class line in CLAUDE.md (and its README.md mirror), tokens.css §-section count claim, prior-tranche wave-spec status lines (D, F, G), G FINAL.md / G-FINAL-II.md claim freshness post-H, package.json↔vite.library.ts↔dist alignment, manifest.ts↔story-fs alignment, consumer-evidence README↔fs alignment, and brittleness-window register across all FINAL.mds. Findings are docs-only; they do not invalidate H's substrate close.

Top result: **the H corpus is internally consistent post-W6.γ absorb**, but five doc surfaces W6.γ did not touch carry stale claims that materially mislead a reader at HEAD — the largest residual being README.md, which shipped with claims that are now wrong for the same H.W1 retirements that W6.γ scrubbed from CLAUDE.md.

---

## Per-doc-surface drift table

### README.md (180 lines)

| # | Line | Claim | Source check | Verdict |
|---|---|---|---|---|
| RM1 | 7 | "32 shadcn-vue components (Button, Card, Dialog, Select, Tabs, Popover, Slider, etc.)" | `ls src/components/ui/` returns 39 packages + 1 `index.ts` → 39 ui packages | **stale count — actively misleads** (off by 7) |
| RM2 | 9 | "Convenience shorthands: `.glass-card`, `.glass-pill`, `.glass-btn`, `.floating-panel`" | `grep '\.glass-pill' src/styles/*.css` returns zero hits; DESIGN.md:243 confirms "earlier shorthand that no longer ships" | **stale claim — actively misleads** (`.glass-pill` retired) |
| RM3 | 14 | "Composables: timer, keyboard shortcut, touch gate, dark-mode, glass-renderer, motion, sortable, pagination, and virtual-list substrate" | `composables/index.ts` exports timer, keyboard-shortcuts, touch-gate, dark-mode, glass, motion, pagination, sortable, virtual, sidebar, infinite-scroll/composables, useInterval; **README omits sidebar, infinite-scroll, useInterval** | **partial omission** |
| RM4 | 61 | "ui/ # 32 shadcn-vue components (reka-ui primitives)" | same as RM1; tree comment also stale | **stale count** |
| RM5 | 73-76 | `custom/` tree shows only `dock/`, `aurora/`, `controls/` | actual `src/components/custom/` has 40 dirs at HEAD; the README tree elides 37 packages with no "..." marker | **partial enumeration — acceptable as illustrative if marked, but no marker** |
| RM6 | 92 | "glass.css ... .glass-card, .glass-pill, .glass-btn" (tree comment) | `.glass-pill` not in `glass.css` | **stale claim — actively misleads** |
| RM7 | 94 | "cards.css ... .cartoon-card, .elevated-card, .paper-texture" (tree comment) | `cards.css` defines only `.paper-texture` and `.cream-surface`; `.cartoon-card` and `.elevated-card` absent at HEAD (verified `grep -rE '\.cartoon-card\|\.elevated-card' src/styles/`) | **stale claim — actively misleads** (2 phantom classes) |
| RM8 | 118 | "`.glass-pill` = default tier + `var(--radius-pill)`" | `.glass-pill` retired | **stale claim — actively misleads** |
| RM9 | 132 | "Shadows (cartoon) `--shadow-cartoon-sm`/`md`/`lg`, `--shadow-card`" | `tokens.css` confirms `--shadow-cartoon-{xs,sm,md,lg,accent}` + `--shadow-card`; the `xs`+`accent` rungs are present but README only lists 4. Minor omission. | **partial — under-listed** |
| RM10 | 134 | "Paper `--paper-clean-texture`, `--paper-aged-texture`" | `tokens.css` has `--paper-clean-texture`; `--paper-aged-texture` retired (or never landed). `grep '\-\-paper-aged-texture' src/styles/tokens.css` returns zero hits | **stale claim** |

**README.md verdict**: **6 actively-misleading stale claims** + 4 minor omissions. README.md is the public-facing doc that ships in the published package; it carries the most user-visible drift in the entire corpus. W6.γ scrubbed CLAUDE.md but did not extend to README.md.

### DESIGN.md (1174 lines)

| # | Line | Claim | Source check | Verdict |
|---|---|---|---|---|
| DM1 | 243 | "(`.glass-pill` was an earlier shorthand that no longer ships — pill geometry composes via `.btn-pill` + a glass tier when needed.)" | matches HEAD | **clean** |
| DM2 | 830 | UI primitives enumeration: "accordion · alert · ... · scroll-area · scroll-pane · select · ..." | `ls src/components/ui/` has no `scroll-area/` or `scroll-pane/` directories | **2 phantom claims** (`scroll-area`, `scroll-pane` never existed at HEAD per `git log` — speculative pre-G additions never landed) |
| DM3 | 834 | Custom enumeration: "animation · aurora · confirm-dialog · controls · ... · form · glass-carousel · ..." | `animation/` and `form/` absent from `src/components/custom/` (verified `ls`); these were noted as phantoms in W6.γ for CLAUDE.md but the same drift is present in DESIGN.md | **2 phantom claims** |
| DM4 | 834 | Custom enumeration list | Compared against `ls src/components/custom/` (40 dirs). DESIGN.md list **misses**: `paper-backdrop`, `swatch` (Wβ; despite §1042 referencing it indirectly), `cream-surface`, `display-hero`, `flourish-divider`, `math-formula`, `math-glyph`, `math-surface`. Some are mentioned in body sections but not in the catalog enumeration. | **8 missing from catalog enumeration** |
| DM5 | 1029, 1042, 1073, 1099, 1132, 1147–1152, 1163–1167 | Retired-token roster (paper-bg/-shadow/-border, cartoon-accent-mix, type-formula, shimmer-blue, font-display-3-variation-settings, chartNeutrals, vizColorsHex, spectrumColor, goldenShimmer) — all framed as past-tense retirements | `grep` against `src/styles/tokens.css` + `src/tokens.ts` for each retired token: **zero live hits** for every retired token — DESIGN.md retirement claims correct | **clean** |
| DM6 | DESIGN.md doesn't enumerate styles/* files | n/a | not a drift source | **n/a** |

**DESIGN.md verdict**: catalog enumerations carry phantom + missing rows that W6.γ flagged at the CLAUDE.md mirror but did not propagate to DESIGN.md. **Retirement claims are clean** — the bigger H.W1+W2 thesis ("DESIGN.md synced 916→1174 with retired-token roster") holds at HEAD.

### CLAUDE.md (221 lines)

W6.γ already absorbed the major drift. Re-verifying at HEAD:

| # | Line | Claim | Source check | Verdict |
|---|---|---|---|---|
| CM1 | 18 | "39 shadcn-vue base component packages" | matches HEAD | **clean (W6 fix)** |
| CM2 | 59 | "40 custom package dirs" | matches HEAD | **clean (W6 fix)** |
| CM3 | 60–99 | enumerated `custom/` tree | every entry verified against `ls src/components/custom/`; W6 fix complete (4 retirees + 2 phantoms removed; 14 missing added) | **clean (W6 fix)** |
| CM4 | 102–111 | composables tree shows: glass, motion, pagination, sidebar, sortable, virtual + useGlobalDark + useKeyboardShortcuts | `ls src/composables/` also has `blob/`, `utils/`, `__tests__/`, `useInterval.ts`, `useTimer.ts`, `useTouchGate.ts` — CLAUDE.md tree elides these | **partial — same as W6.γ C7 (tightening opportunity, not blocker)** |
| CM5 | 111 | "9 top-level public export groups" | `composables/index.ts` exports 12 surfaces; W6.γ flagged this as C11 but absorb did not adjust | **stale count — survives W6 absorb** |
| CM6 | 114 | "tokens.css §1–§10: duration, easing, z-index, radius, shadows, glass, paper, colors" | `grep '^/\* §' src/styles/tokens.css` shows §0–§14 (15 sections including viz basis, paper, gold, rainbow palette) | **stale section range — `§1-§10` is wrong; should be `§0-§14`** |
| CM7 | 117 | "glass.css ... `.glass-card`, `.glass-pill`, `.glass-btn`" | `.glass-pill` not in glass.css; W6.γ flagged this as C5 → recommendation 4 in absorb list, but absorb did not land it | **stale claim — survives W6 absorb** |
| CM8 | 118 | "dock.css ... `.dock-icon-btn`, `.dock-select-trigger`, `.dock-separator`, `.dock-layer-grid`" | actual class is `.dock-icon-button` (not `-btn`); `.dock-separator` and `.dock-layer-grid` not present at HEAD per `grep` | **stale + 2 phantom classes** |
| CM9 | 119 | "cards.css ... `.cartoon-card`, `.elevated-card`, `.paper-texture`" | `.cartoon-card` and `.elevated-card` absent from `src/styles/cards.css`; only `.paper-texture` and `.cream-surface` present | **2 phantom classes — actively misleads** |
| CM10 | 112–123 | styles tree | actual `src/styles/` has 18 css files; CLAUDE.md tree shows 11. **Missing**: `paper.css`, `math.css`, `instrument-chassis.css`, `glyph-face.css`, `dock-group.css`, `disco-glyph.css`, `prism-theme.css`. | **7 missing files** |
| CM11 | 140 | "Runtime tokens (`chartHeights`, `chartColors`, `NAMED_EASING_BEZIER`)" | `src/tokens.ts` exports 5: `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER`; CLAUDE.md lists 3 | **partial — under-listed (W6 absorb trimmed too aggressively)** |

**CLAUDE.md verdict**: W6.γ closed the high-severity drift (custom-package list, runtime-tokens, composable groups) but **left 6 lower-severity drift items** (CM4–CM10) in the Structure tree comments. CM7 was specifically called out as recommendation 4 in W6.γ's absorb list and FINAL.md says "absorb completed", but the line still reads `.glass-pill` at HEAD.

### package.json (304 lines) + vite.library.ts (66 lines)

| # | Surface | Cross-check | Verdict |
|---|---|---|---|
| PJ1 | `exports` map subpaths | 31 subpaths (incl. `.` and `./styles*`) | **clean — covered** |
| PJ2 | `typesVersions` map keys | 30 keys (matches `exports` minus `.` and `./styles*`) | **clean** |
| PJ3 | `vite.library.ts` `libraryEntries()` | 31 entries (matches `exports` 1:1) | **clean — perfect alignment** |
| PJ4 | `dist/` artefacts at HEAD | `ls dist/*.d.ts` shows entries for every subpath (verified for aurora, dock, dock-group, disco-glyph, glyph-face, instrument-chassis, etc.) | **clean** |
| PJ5 | `peerDependencies` includes `embla-carousel-vue`, `lucide-vue-next`, `vaul-vue`, `@mkbabb/keyframes.js` | CLAUDE.md:144 lists 7 peers; **misses** `embla-carousel-vue`, `lucide-vue-next` (CLAUDE.md frames lucide as dev-only at line 156, but it's actually a peer per package.json:269); `vaul-vue` similarly framed as dev-only at line 156 but is a peer per package.json:273; `@mkbabb/keyframes.js` not listed in CLAUDE.md at all | **CLAUDE.md drift — peer list under-listed and miscategorized** |

**package.json↔vite verdict**: the build configuration is internally consistent — every `exports` subpath has a matching `typesVersions` entry and a matching `vite.library.ts` entry. Drift is in the *documentation* of the peer-dep set in CLAUDE.md.

### docs/instructions/README.md (26 lines)

| # | Line | Claim | Source check | Verdict |
|---|---|---|---|---|
| DI1 | 17 | "Current proof commands are `npm run typecheck` and `npm run build`. Add Vitest or iter-loop commands only when the local tranche/tooling actually lands them." | `package.json:241,243-248` shows `test`, `iter-check`, `iter-build`, `iter-test`, `iter-test-watch`, `iter` already landed; D-II/D.W4 closed Vitest+iter substrate per `tranches/D-II/D-II.md:25` | **stale claim** — proof commands listed are a subset; vitest + iter are real and have been since D-II close |
| DI2 | 24 | "`docs/audits/overfitting-audit.md` carries the local evidence sweep" | file exists at HEAD; sweep is run per-tranche, not stored in the canned-prompt doc | **clean** |

**docs/instructions/README.md verdict**: 1 stale claim (proof commands).

### docs/audits/{overfitting-audit.md, style-audit.md}

Both files are canned-prompt templates with `{SCOPE_PATHS}` substitution markers. They are not "live spec" documents — drift would manifest only in citations to other tranches. Spot-check:

| # | Line | Claim | Verdict |
|---|---|---|---|
| OA1 | overfitting-audit.md:5 | "Created: tranche C, sub-phase C.W0.A. Substrate for §Invariant 5..." | historical fact, no source check needed | **clean** |
| OA2 | overfitting-audit.md:40 | "Verdict precedence (refined at D)" | refined-D wording matches `tranches/D/FINAL.md:5` | **clean** |
| SA1 | style-audit.md:23 | "`{GLASS_UI_DIR}/src/styles/tokens.css` §1–§14" | matches HEAD (CLAUDE.md is wrong; style-audit is right) | **clean** |

**docs/audits/* verdict**: clean. (Notably, style-audit.md cites `§1–§14` correctly while CLAUDE.md says `§1–§10` — drift is one-sided.)

### docs/consumer-evidence/README.md (37 lines) + 24 evidence-doc files

| # | Surface | Cross-check | Verdict |
|---|---|---|---|
| CE1 | README table rows | 24 rows (one per artefact) | matches `ls docs/consumer-evidence/*.md` minus README → 24 files — **perfect 1:1 alignment** |
| CE2 | `animated-number.md:10` | "`../speedtest/src/components/speedtest/MetricPillCluster.vue:112`" | path removed from speedtest tree per H FINAL.md R-NEW-3 | **stale evidence — known + tracked as R-NEW-3** |
| CE3 | `use-animated-number-options.md`, `use-animated-number.md` | similarly cite removed `MetricPillCluster.vue` / `SpeedtestResults.vue` paths | **stale — same R-NEW-3 disposition** |
| CE4 | All other 21 evidence docs | not re-verified in this audit (out of scope; β audit covered them) | **out of scope** |

**docs/consumer-evidence/ verdict**: README↔fs perfect; 3 evidence-doc Source paths stale per known R-NEW-3.

### docs/tranches/H/* (W6.γ baseline + this deeper check)

| # | Surface | Cross-check | Verdict |
|---|---|---|---|
| TH1 | H.md Wave Schedule Status column | per W6.γ recommendation 9: replaced `open` / `pending` with `closed` (W0–W5) + `in progress` (W6) | absorbed | **clean (W6 fix)** |
| TH2 | H.md cross-tranche debt R-NEW-1 | per W6.γ recommendation 10 | absorbed | **clean (W6 fix)** |
| TH3 | H wave specs Status: lines | per W6.γ recommendation 8 | all updated to "closed (commit ...)" / "in progress" | **clean (W6 fix)** |
| TH4 | PROGRESS.md W1 hash | per W6.γ recommendation 6 | PROGRESS.md:108 now shows `68e4097` | **clean (W6 fix)** |
| TH5 | FINAL.md authoring order | "After absorb completion, per the new binding precept" | matches PROGRESS.md timeline | **clean** |

**H corpus verdict**: W6.γ absorb landed cleanly; nothing residual that this deeper pass surfaces.

### docs/tranches/{C,D,D-II,E,F,G}/waves/*.md status lines (cross-tranche structural drift)

Per the user's spot-check protocol, sample wave-spec Status: lines in long-closed tranches:

| # | File | Status: line | Tranche state | Verdict |
|---|---|---|---|---|
| CT1 | `tranches/D/waves/W4.md:6` | `**Status**: planned` | D closed via D-II; W4 close documented in `tranches/D/PROGRESS.md:178` "W4 close (2026-04-30, D-II redress)" | **stale — wave spec never updated post-close** |
| CT2 | `tranches/D/waves/W5.md:6` | `**Status**: planned` | D closed; W5 close documented in `tranches/D/PROGRESS.md:207` "W5 close (2026-04-30, D-II close)" | **stale** |
| CT3 | `tranches/E/waves/W0.md:6` | `**Status**: complete_with_misses` | E closed; subsequent E waves marked `complete` | **mildly stale — flag never reconciled to canonical `closed`** |
| CT4 | `tranches/F/waves/{W0..W6}.md:6` | all marked `**Status**: complete` | F closed clean per `tranches/F/FINAL.md:3` | **clean** |
| CT5 | `tranches/G/waves/{W0..W5}.md:6` | all marked `**Status**: complete (closed 2026-05-04 — ...)` | G closed clean | **clean** (the format is verbose but accurate) |
| CT6 | `tranches/C/waves/` | dir is **empty** at HEAD (no wave-spec files) | C closed long ago; per `tranches/C/PROGRESS.md`, wave specs were either deleted or never landed in this format | **structural — empty dir but PROGRESS.md references waves** |

**Cross-tranche wave-spec verdict**: D's W4 and W5 wave specs carry stale `planned` Status lines (closed via D-II); E's W0 carries non-canonical `complete_with_misses` (vs canonical `closed`/`complete`). F + G are clean. C has an empty waves dir.

### demo/stories/manifest.ts (288 lines) ↔ filesystem

| # | Surface | Cross-check | Verdict |
|---|---|---|---|
| ST1 | All 9 categories (foundations, primitives, containers, navigation, data, feedback, motion, compositions, _internal) story-id rows | Verified each `s("<cat>", "<id>", ...)` against `demo/stories/<cat>/<id>.vue` filesystem | **perfect 1:1 match — every story file has a manifest entry; every manifest entry resolves a real .vue file** |
| ST2 | `_internal/blob-stress` row gated by `import.meta.env.DEV` | matches dev-only spec from `manifest.ts:75` comment | **clean** |
| ST3 | `FLAT_STORIES` for aurora | matches `demo/stories/aurora.vue` filesystem | **clean** |
| ST4 | `demo/stories/aurora/` directory contains studio components, not story files | manifest does not enumerate them; they're internal helpers | **clean — not a story dir** |

**manifest.ts verdict**: clean. Story catalog is internally consistent.

### vite.library.ts ↔ src/* entry files

Verified each entry → real file exists:

| # | Cross-check | Result |
|---|---|---|
| VL1 | All 31 vite entries map to `src/<entry>.ts` files that exist at HEAD | verified via `ls src/*.ts` | **clean** |
| VL2 | `libraryExternal` lists 10 peer modules; `package.json` peerDependencies lists 10 | matches | **clean** |

**vite.library.ts verdict**: clean.

---

## Critical findings (anything that misleads at HEAD)

The deep-audit residue beyond W6.γ:

### CRIT-D1 — README.md `.glass-pill` claim is wrong in 3 places (lines 9, 92, 118)

README.md is the public-facing doc. It tells consumers `.glass-pill` is a "convenience shorthand", lists it in the `glass.css` tree comment, and provides a code-equivalent expansion. None of these reflect HEAD: `.glass-pill` was retired pre-H. DESIGN.md:243 even says so. A new consumer reading README will copy a class that doesn't exist.

### CRIT-D2 — README.md "32 shadcn-vue components" off by 7 (lines 7, 61)

The component count has been wrong for at least one tranche. `ls src/components/ui/` returns 39 packages at HEAD. README.md still claims 32. CLAUDE.md was corrected to 39 by W6.γ; the same scrub did not extend to README.md.

### CRIT-D3 — CLAUDE.md `.glass-pill` survives W6.γ recommendation 4 (line 117)

W6.γ explicitly recommended (recommendation 4) that CLAUDE.md:117 drop `.glass-pill` from the `glass.css` inline class enumeration. FINAL.md asserts "absorb completed". At HEAD, the line still reads `.glass-card, .glass-pill, .glass-btn`. Either the recommendation was missed in absorb or FINAL.md overstates the absorb scope.

### CRIT-D4 — README.md + CLAUDE.md both claim `.cartoon-card` and `.elevated-card` exist (README:94, CLAUDE.md:119)

Both docs document `cards.css` as defining `.cartoon-card`, `.elevated-card`, `.paper-texture`. `cards.css` at HEAD defines `.paper-texture` and `.cream-surface` only. `.cartoon-card` and `.elevated-card` do not exist anywhere in `src/styles/`. Two phantom classes in two docs — likely retired pre-G but never scrubbed.

### CRIT-D5 — CLAUDE.md `dock.css ... .dock-icon-btn` is wrong (line 118)

CLAUDE.md cites `.dock-icon-btn`. The actual class is `.dock-icon-button` (`dock.css:397`). Plus `.dock-separator` and `.dock-layer-grid` are not present at HEAD per `grep`. One mis-spelled + two phantom class names in a single line.

### CRIT-D6 — DESIGN.md UI primitives enumeration includes `scroll-area` and `scroll-pane` (line 830)

Neither `scroll-area/` nor `scroll-pane/` exists in `src/components/ui/`. They appear to be speculative pre-G additions never landed. DESIGN.md is "documentation-of-source" per H invariant 7; phantom packages in the catalog enumeration violate that contract. Mirror of W6.γ D8/D9 on the custom side.

### CRIT-D7 — D-tranche W4 + W5 wave specs still say `Status: planned` post-D-II close

`tranches/D/waves/W4.md:6` and `W5.md:6` carry `**Status**: planned` at HEAD. D PROGRESS.md confirms both closed via D-II (2026-04-30). This is structural drift in long-closed tranche docs that future readers may use as historical references. H ships the new "wave-spec status updated at close" precept (per H invariant 10 + W6.γ recommendation 8) — applying that precept retroactively to D would close this gap.

### CRIT-D8 — CLAUDE.md tokens.css section range claim is wrong (line 114)

CLAUDE.md says "tokens.css §1–§10". Actual: §0–§14 (15 named sections including viz basis, paper tier, gold, rainbow palette). `style-audit.md:22` correctly cites §1–§14. CLAUDE.md is the only doc with this drift.

### CRIT-D9 — CLAUDE.md peer-dep table omits 4 peers, miscategorizes 2 (lines 144–156)

CLAUDE.md table at line 146–154 lists 7 peers. `package.json:264-275` lists 10: the 7 plus `@mkbabb/keyframes.js`, `embla-carousel-vue`, `lucide-vue-next`, `vaul-vue`. CLAUDE.md:156 says "Dev-only: vaul-vue (drawer), lucide-vue-next (icons)" — but both are peers (consumer must install). Categorization is reversed.

(Findings RM3, RM5, RM9, RM10, DM2, DM4, CM4, CM5, CM10, CM11, DI1 are real but lower-severity — partial enumerations, count omissions, stale-but-plausible flags. They do not meet the "actively misleads" bar.)

---

## Cross-tranche claim consistency post-H

Each prior FINAL.md is a frozen close-time snapshot. H FINAL.md correctly dispositions every prior residual:

- **G FINAL.md:56** lists 17 G additions including `<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`, `<SvgFilters>+<RainbowGradientDef>`, `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`, `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer` — **11 of those retired in H.W1**. Honest as historical snapshot.
- **G FINAL.md:80, 102** R6 + R7 → **closed in H.W1+W4 + H.W2 respectively**; H FINAL.md acknowledges.
- **G-FINAL-II.md:24** "CLAUDE.md synced: 17 new custom packages enumerated" — frozen at G-II close; CLAUDE.md now lists 40 (post-H.W1 retirements) per W6.γ.
- **D FINAL.md** thesis stable at HEAD; H R-NEW-3 names 3 stale D-tranche evidence-doc Source paths (consumer follow-up).
- **F FINAL.md** + **C FINAL.md** — both clean; F-shipped substrate (consumer contract, dock, theme, Aurora) all stable.

**Verdict — agree / contradict**: prior FINAL.mds **agree historically**. The "contradictions" are that prior FINAL.mds list artefacts as live (correct at their close) which are now retired (correct at H close) — expected tranche-close-doc behavior, not drift.

**G FINAL.md has zero internal contradictions with H FINAL.md** — H explicitly acknowledges every G residual disposition.

---

## Brittleness-window register

Per the new SPEC.md §Brittleness clause ("An undeclared brittleness window — a stash-induced regression discovered post-close — is a hard-gate violation"), walked every FINAL.md + PROGRESS.md across all tranches:

| Tranche | Window declared? | Restored? | Source |
|---|---|---|---|
| C | none | n/a | `tranches/C/FINAL.md` |
| D | none in FINAL; D-II opened to absorb post-close discoveries (rail surface + W4 tooling) | yes — D-II.W3 close | `tranches/D-II/D-II.md:25` |
| D-II | none | n/a | `tranches/D-II/PROGRESS.md` |
| E | none | n/a | E.md:176 references brittleness window discipline; no window opened during E |
| F | none | n/a | F.md:101 declares brittleness-window protocol; no window opened |
| G | **de facto unrecorded** at FINAL.md (declared "None opened during G"); **honestly declared post-audit** at G-FINAL-II.md:13; **restored** in G-FINAL-II pass-1 (DESIGN.md re-synced 916→1073) | yes — G-FINAL-II close | `tranches/G/G-FINAL-II.md:10–13` |
| H | none opened; H FINAL.md:75 confirms "None opened during H. Every wave committed at close per the new H invariant 10" | n/a | `tranches/H/FINAL.md:73–75` |

**Open brittleness windows at HEAD**: **0**. Every declared window has a recorded restoration. The G→G-FINAL-II precedent is the canonical fix-up pattern; H closed clean against it.

---

## Recommendations for tranche I doc fixes

Single docs-only commit lands the absorb. Severity-ordered:

1. **README.md:7,61** — "32 shadcn-vue" → "39 shadcn-vue". (CRIT-D2.)
2. **README.md:9,92,118** — drop `.glass-pill` from shorthands list, tree comment, and code expansion. (CRIT-D1.)
3. **README.md:94** — drop phantoms `.cartoon-card`, `.elevated-card`; add `.cream-surface`. (CRIT-D4 README half.)
4. **CLAUDE.md:117** — drop `.glass-pill` from `glass.css` line. (CRIT-D3; W6.γ rec-4 missed.)
5. **CLAUDE.md:118** — `.dock-icon-btn` → `.dock-icon-button`; drop phantoms `.dock-separator`, `.dock-layer-grid`. (CRIT-D5.)
6. **CLAUDE.md:119** — drop phantoms `.cartoon-card`, `.elevated-card`; add `.cream-surface`. (CRIT-D4 CLAUDE half.)
7. **CLAUDE.md:114** — "§1–§10" → "§0–§14". (CRIT-D8.)
8. **CLAUDE.md tree (112–123)** — add 7 missing `*.css` entries.
9. **CLAUDE.md:144–156** — peer-dep table: add 4 peers; fix dev/peer miscategorization. (CRIT-D9.)
10. **CLAUDE.md:140** — re-add `chartMargin` + `minWidthInputSm` to runtime-tokens (W6.γ trimmed too aggressively).
11. **CLAUDE.md:111** — "9 top-level public export groups" → "12".
12. **DESIGN.md:830** — drop phantoms `scroll-area`, `scroll-pane`. (CRIT-D6.)
13. **DESIGN.md:834** — drop phantoms `animation`, `form`; add 8 missing custom packages.
14. **docs/tranches/D/waves/{W4,W5}.md:6** — `planned` → `closed via D-II`. (CRIT-D7.)
15. **docs/tranches/E/waves/W0.md:6** — `complete_with_misses` → canonical `complete`.
16. **docs/instructions/README.md:17** — extend proof commands to landed harness (`iter`, `test`, `iter-test`).
17. **README.md tree (73–86)** — mark `custom/` tree as illustrative or extend.
18. **README.md:14** — extend composables list: sidebar, infinite-scroll, useInterval.
19. **README.md:132** — extend cartoon-shadow list to include `xs`, `accent`.
20. **README.md:134** — drop `--paper-aged-texture` (retired); add live paper-tier token set.
21. **docs/consumer-evidence/{animated-number, use-animated-number-options, use-animated-number}.md** — refresh Source paths per H R-NEW-3 (consumer follow-up; out of glass-ui tranche-I scope unless absorbed proactively).

The full absorb is **docs-only** — no source / test / build implications.

**Tranche I framing**: a small "doc-corpus reconciliation" tranche, 1–2 waves (W0 audit + W1 absorb commit). Extend H invariant 7 ("DESIGN.md is documentation-of-source") to README.md and CLAUDE.md — both should hard-gate against `src/` reality.

---

## Summary

- **DESIGN.md**: 1 retired-token roster clean; 2 phantom UI primitives + 2 phantom custom packages + 8 missing custom packages in catalog enumerations.
- **CLAUDE.md**: W6.γ closed the major drift; 6 lower-severity drift items (recommendation 4 missed; tokens.css range; `dock-icon-btn` typo; `cartoon-card`/`elevated-card` phantoms; styles tree under-listing; peer-dep miscategorization).
- **README.md**: **6 actively-misleading stale claims** (32-count, `.glass-pill` × 3, `.cartoon-card` + `.elevated-card`, `--paper-aged-texture`); not touched by W6.γ.
- **package.json↔vite.library.ts↔dist**: clean — perfect alignment.
- **demo/stories/manifest.ts**: clean — perfect 1:1 with filesystem.
- **docs/consumer-evidence/README.md**: clean 1:1 with fs; 3 evidence-doc Source paths stale (R-NEW-3 named).
- **docs/instructions/README.md**: 1 stale proof-commands claim.
- **docs/audits/{overfitting, style}-audit.md**: clean.
- **Cross-tranche wave specs**: D's W4+W5 carry stale `planned` Status (closed via D-II); E's W0 has non-canonical flag; F + G clean.
- **Brittleness-window register**: 0 open windows at HEAD; G→G-FINAL-II is the canonical declared+restored precedent; H closes clean against it.
- **Cross-tranche FINAL claim consistency**: prior FINAL.mds agree with H FINAL.md as historical close-time snapshots; H FINAL.md correctly dispositions every prior residual.

A single tranche-I docs-only absorb commit closes all 22 recommendations. No source changes, no build implications. Brittleness-window register stays clean.
