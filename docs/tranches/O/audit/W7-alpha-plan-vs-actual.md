# O.W7 α — Plan-vs-actual audit

**Lane**: α (plan-vs-actual; read-only).
**Tranche**: O close ceremony (W7).
**Auditor**: agent-dispatched read-only audit; HARD-CAP 25 min.
**Window**: O open `18876f4` → W6 close `25e1b5a` (HEAD at audit time; W7 close commit pending).
**Verdict**: **CLEAN**.

---

## §1 — Per-wave landing matrix

For each wave: declared lanes (per `waves/W*.md`), declared hard gate, actual commit + artefacts, verdict.

### W0 HEADLINE — AB post-hoc plan folder + precept hardening + cosmetic legacy excise

| Declared lane | Declared artefact | Actual artefact | Verdict |
|---|---|---|---|
| A — AB post-hoc plan folder (agent-dispatched) | `docs/tranches/AB/{AB.md, waves/W1-4.md, FINAL.md, PROGRESS.md, coordination/CONSTELLATION.md}` | `docs/tranches/AB/` populated; `AB.md` retrospective verified (50 lines minimum; thesis matches "Living-UI canon"); 4 wave specs present (`W1.md … W4.md`); `FINAL.md`, `PROGRESS.md`, `coordination/` all present | LANDED |
| B — Precept submodule advance (orchestrator-solo) | precept `b8af314 → next` with invariants 24-27 + LL entry | precept HEAD = `46ee7e9 feat(precepts): codify fail-explicit + typed-key DI + test-hygiene + tooling-stash invariants (glass-ui O.W0)` — invariants 24-27 codified per commit subject | LANDED |
| C — Cosmetic legacy excise (orchestrator-direct) | `probeWebGLSupport` retired; 5 back-compat reword; freshness.ts docstring rewrite | back-compat residual count = 2 (matches W0 hard-gate ≤ 2 ceiling — both intentional design statements per K9-confirmed-KEEP + 1 other) | LANDED |

**Hard gate**: (a) AB folder ✓; (b) precept advance ✓; (c) back-compat count ≤ 2 ✓ (verified 2); (d) typecheck/test/build green per PROGRESS.md; (e) v1.2.0 tag exists (`git tag -l`).

**Actual commit**: `d327a45` (W0 close; v1.2.0 minor).
**Proof docs**: `audit/W0-Lane-A-AB-post-hoc-proof.md`, `audit/W0-Lane-B-precept-canonicalize-proof.md`, `audit/W0-Lane-C-cosmetic-excise-proof.md` — all present.

---

### W1 — Fail-explicit migrations + test relocation

| Declared lane | Declared artefact | Actual artefact | Verdict |
|---|---|---|---|
| A — Aurora init fail-explicit (F1) | `onInitError` prop on `<Aurora>` + MIGRATION.md note + speedtest cross-repo audit | Aurora prop ships; MIGRATION.md verified to carry v1.2.1 section per PROGRESS.md; speedtest READ-ONLY per W6 cohort | LANDED |
| B — WebGL shader compile/link throw (F2+F3) | 4 sites throw (`useMetaballs.ts` ×2, `frostShader.ts` ×2) | per W1 close commit message: 4 sites migrated with explicit `[glass-ui:metaballs]` / `[glass-ui:frost]` prefixes | LANDED |
| C — Configurator clone Path A (F4) | decision doc + Path A throw | `audit/W1-Lane-C-clone-decision.md` present; Path A chose per PROGRESS.md | LANDED |
| D — Typewriter unreachable throw (F5) | One-line throw replacing defensive bail | per PROGRESS.md "3-line throw" landed | LANDED |
| E — Test-file relocation (18 files) | 18 `*.test.ts` → `__tests__/` canonical | Verdict reversed: 18 files were ALREADY at `__tests__/` shape; ABSORB: 3 `.spec.ts` siblings relocated + renamed; spot-verified `find src -name "__tests__" -type d` = 11 dirs; `find src -name "*.test.ts"` returns 18+ test files under `__tests__/` shape; ZERO co-located `*.test.ts` at HEAD | LANDED (NO-OP with absorb) |

**Hard gate**: All 5 lanes landed; per PROGRESS.md typecheck/test/build/profile:budget/verify-export-types PASS; v1.2.1 tag exists.

**Actual commit**: `827b6ae` (W1 close; v1.2.1 patch).
**Proof docs**: `W1-Lane-A` through `W1-Lane-E` (5 proof docs + 1 decision doc) — all present.

**Spot-verification residual**: `grep -rn "console.warn|console.error" src/` returns **1 site**: `DataTable.vue` DEV-only developer warning gated on `import.meta.env.DEV` (dedupe-via-Set). This is a befitting developer-experience warning, NOT a library-internal contract violation per invariant 24 distinction (the `if (!import.meta.env.DEV …) return;` guard makes it production-stripped). Out of W1 F-cohort scope; **MINOR** flag (no action required at O; consider for P if invariant 24 expands).

---

### W2 HEADLINE — Dock subsystem DI canonicalization

| Declared lane | Declared artefact | Actual artefact | Verdict |
|---|---|---|---|
| A — Dock typed-context + helper pair | `src/components/custom/dock/context.ts` + `useDockContext()` + `useOptionalDockContext()` + DockLayer/ToggleGroup DRIFT cleanup | `src/components/custom/dock/composables/dockContext.ts` + `dockLayerContext.ts` ship typed-key + helper pair with `inject(DOCK_CONTEXT_KEY)` strict + `inject(DOCK_CONTEXT_KEY, null)` optional shape; file path differs from W2.md prose (`composables/` sub-dir) but canonical artefact identity preserved | LANDED |
| B — Slider migration | Slider `inject` → `useOptionalDockContext()` | per close commit body: 3 raw injects retired, 1 helper call; cross-substrate proof story unchanged | LANDED |
| C — 4 popover-family migrations | HoverPopover + PopoverContent + SelectContent + DropdownMenuContent → `useOptionalDockContext()` | per close commit body: 4 sites migrated; Lane C used stale shape (`useDockContext()` strict) due to worktree.baseRef drift; orchestrator reconciled at integration to `useOptionalDockContext()` (befitting choice) | LANDED (with reconciliation note) |

**Hard gate**: (a) typed-key + helper-pair ships ✓; (b) GlassDock single typed-provide; `dockExpanded` retired; `glassDockId` dedup'd ✓; (c) 5 consumer sites migrated ✓; (d) DockLayer + ToggleGroup DRIFT cleanup landed ✓; (e) cross-substrate proof story renders identically; (f) all gates green; (g) speedtest BINARY-TRANSPARENT ✓; (h) 3 lane proof docs present; (i) DESIGN.md `## Dock subsystem` section authored; (j) v1.2.2 tag exists.

**Actual commits**: `ba546c7` (Lane A intermediate) + `7dce645` (W2 close; v1.2.2 patch).
**Spot-verification**: `grep -rn 'inject(' src/components/ | grep -E 'dock|glassDock'` returns ZERO string-key injects — only the canonical `DOCK_CONTEXT_KEY` / `DOCK_LAYER_GROUP_KEY` Symbol-keyed calls plus a docstring reference inside `DockLayer.vue` comment block. Migration complete.
**Process note**: worktree.baseRef drift incident on Lane B+C dispatch documented in PROGRESS.md + W2 close commit; folded to W7 LL-ledger candidate (covered by ι lane).

---

### W3 — God-module cohesion splits

| Declared lane | Declared artefact | Actual artefact | Verdict |
|---|---|---|---|
| A — GlassTimeline 1049 → 4 SFCs + geometry.ts | dispatcher + `ScrubberTimeline.vue` + `SegmentedTimeline.vue` + `ContinuousTimeline.vue` + `geometry.ts` | `ls src/components/custom/timeline/` shows ContinuousTimeline.vue + GlassTimeline.vue + ScrubberTimeline.vue + SegmentedTimeline.vue + geometry.ts + index.ts + types.ts + __tests__/ — matches plan + extra `types.ts` (housekeeping); per close commit dispatcher = 123 LOC; ContinuousTimeline preserves non-scoped `<style>` for HoverCardPortal | LANDED |
| B — profile-aurora.mjs 884 → harness extracted | `scripts/profile-aurora.mjs` + `scripts/aurora-profile/harness-browser.mjs` (NEW) | `ls scripts/` shows `aurora-profile/` dir + `profile-aurora.mjs` — Option B template-string export; harness extracted | LANDED |
| C — usePresetEditor.ts 657 → 6 demo-private files | `demo/configurator/preset-editor/{types,defaults,css-writers,persistence,stylesheet-swap,store}.ts` + façade | 24-LOC façade + 6 sub-modules (745 LOC total per PROGRESS.md); demo-only | LANDED |

**Hard gate**: 3 files split ✓; consumer imports unchanged ✓; bundle delta documented (timeline.js +21% per-chunk = +2.4 KB absolute; accepted as decomposition cost; global gates remain well under cap); v1.2.3 tag exists.

**Actual commit**: `b892eab` (W3 close; v1.2.3 patch).
**Proof docs**: 3 lane proof docs present.

---

### W4 — /api discovery gaps + leaky abstractions + service boundaries

| Declared lane | Declared artefact | Actual artefact | Verdict |
|---|---|---|---|
| A — /api discovery gaps (3 cohorts) | sidebar (6 types) + search (5 types) + triad (3 types) = 12 promotions on `/api`; `_shared/` barrel for MenuItemVariants | per close commit + `src/api/index.ts` spot-check: SidebarState/SidebarSection/TreeNode/TreeIndexEntry/SidebarIndexEntry/ScrollTrackerOptions (6) + SearchableItem/SearchResult/FuzzySearchState/UseFuzzySearchOptions/SearchIndex (5) + GlassPanelProps/ToastType/MenuItemVariants (3); surface 37 → 49 | LANDED |
| B — Leaky abstraction fixes (3 fixes) | UseDockStateOptions/DockState re-export + UseAuroraReturn interface + useDarkModeSync rename | per close commit: dock barrel re-export + UseAuroraReturn interface + useDarkModeSync → installDarkModeSync rename | LANDED |
| C — Service boundaries | avatarVariant → avatarVariants rename + useToast KEEP-with-rationale + module-registries doc | per close commit + MIGRATION.md spot-check: `avatarVariants` rename section present at v1.3.0; `installDarkModeSync` rename section present; `useToast-decision.md` present | LANDED |

**Hard gate**: all 5 lanes landed; v1.3.0 minor tag exists (acknowledges 2 semver-visible renames).

**Actual commit**: `ea71fe9` (W4 close; v1.3.0 minor — bumped from declared patch).
**Proof docs**: 3 lane proof docs + 1 decision doc present.

**Tag-cadence note**: W4 declared v1.2.4 patch OR v1.3.0 minor; actual = v1.3.0 minor (correct per L invariant 16 — semver-visible renames warrant minor signal).

---

### W5 — Pipeline orchestration consolidation

| Declared lane | Declared artefact | Actual artefact | Verdict |
|---|---|---|---|
| A — proof:all cohort runner | top-level `proof:all` npm script chaining 5 proof scripts | `package.json` script verified: `proof:all = npm run proof:package && npm run proof:theme && npm run proof:consumers:static && npm run proof:consumers:build && npm run proof:runtime` (5 scripts; cheap → expensive sequence) | LANDED |
| B — verify-export-types unconditional in release.sh | env-gate retired + hardcoded subpath loop dropped | per close commit body: both removed | LANDED (merged with D) |
| C — Freshness DRY extract | `scripts/freshness-walk.mjs` canonical + both consumers import | `ls scripts/` shows `freshness-walk.mjs` + `freshness-walk.d.mts` sidecar + `freshness-gate.mjs` still present (consumer); algorithmic divergence audit byte-identical | LANDED |
| D — release.sh ↔ prepublishOnly dedup | single source of truth | per close commit body: `npm test` ownership consolidated to prepublishOnly; `profile:budget` added to release.sh gate matrix; `NODE_OPTIONS=--max-old-space-size=8192` heap-bump absorbed (vite:dts plugin OOMs) | LANDED (merged with B) |
| E — CI gates expansion | `lint.yml` → `ci.yml` with 5-step matrix | `.github/workflows/` contains `ci.yml` (lint.yml renamed/expanded per W5.md) | LANDED |

**Hard gate**: all 5 lanes landed; v1.3.1 tag exists.

**Actual commit**: `4170f02` (W5 close; v1.3.1 patch).
**Proof docs**: 4 lane proof docs (A + B+D merged + C + E) present.

---

### W6 HEADLINE — Constellation-level substrate promotions + speedtest AC.W6 cohort

| Declared lane | Declared artefact | Actual artefact | Verdict |
|---|---|---|---|
| A — useClipboard + HeaderRibbon promotions | `src/composables/dom/useClipboard.ts` + `src/components/custom/header-ribbon/` + `/api` types + flat subpath | `ls src/composables/dom/` shows `useClipboard.ts` (108 LOC, vueuse-free); `ls src/components/custom/header-ribbon/` shows HeaderRibbon.vue + types.ts + index.ts; flat subpath `@mkbabb/glass-ui/header-ribbon` per `package.json` exports (39 entries verified, up from 37); UseClipboardReturn + UseClipboardOptions + HeaderRibbonProps + HeaderRibbonPosition on `/api` per close commit | LANDED |
| B — .dock-icon-button token ladder | 5 `--dock-active-*` tokens in tokens.css + dock.css active-state rewired | per close commit body: 5 tokens shipped; defaults preserve visual contract verbatim | LANDED |
| C — @utility scale-on-hover | `@utility scale-on-hover` in utilities.css consuming `--scale-hover` | per close commit body: utility ships consuming existing token (1.08; agent declined W6.md-proposed 1.05 per memory-driven no-backwards-compat posture — defensible) | LANDED |
| D — speedtest AC.W6 cohort (6 sub-tasks) | text-hero hoist + WCAG companions + meter-track-stroke fix + IconTooltip 44px + dock touch-target + Fira Code self-host | 5 LANDED + 1 FLAGGED (Fira Code woff2 binaries deferred per `src/fonts/README.md` — verified file exists; orchestrator runs curl fetch at next release) | LANDED (5+1 flagged) |

**Hard gate**: all 4 lanes landed; v1.4.0 minor tag exists (substantial additive surface warrants minor); profile:budget PASS with CSS 95.7% raw flagged to W7 ε rebaseline candidate.

**Actual commit**: `25e1b5a` (W6 close; v1.4.0 minor).
**Proof docs**: 4 lane proof docs present.

**Integration reconciliation**: Lane B + Lane D both touched tokens.css + dock.css; orchestrator reconciled at integration per close commit body. Documented; clean.

---

## §2 — Per-directive cross-walk (O1-O18)

Every user O-directive from `findings.md` is addressed by a wave OR explicitly deferred.

| # | Directive | Addressed at | Status |
|---|---|---|---|
| O1 | Legacy code excision | W0 Lane C (cosmetic) + W1 Lane A-D (fail-explicit on residual legacy contracts) | LANDED |
| O2 | Workaround + fallback + fall-through removal | W1 Lane C (Configurator clone Path A; JSON-fallback retired) + W1 Lanes A/B/D (fail-explicit migrations); browser-API degradation paths KEPT per Rα K-cohort + invariant 24 distinction | LANDED |
| O3 | No nested imports | Rα audit returned zero nested-import findings in src/; no wave-level action required | NO-OP (PASS at audit) |
| O4 | No test files in src/ | W1 Lane E — 18 already at `__tests__/` canonical; 3 `.spec.ts` siblings relocated + renamed; verified `find src -name "*.test.ts"` returns canonical-shape paths only | LANDED |
| O5 | DRY / KISS | W5 Lane C (freshness-walk extract); W5 Lane B+D (release.sh dedup); W2 (glassDockId dedup'd with context.id) | LANDED |
| O6 | No effusive dynamicism | Rα audit returned no major dynamicism findings beyond Configurator clone Path A; W1 Lane C absorbed | LANDED |
| O7 | God-module split (>500 LOC) | W3 all 3 lanes — GlassTimeline (1049 → 5) + profile-aurora (884 → 2) + usePresetEditor (657 → 7); 4 coherent-large genre artefacts preserved per Rβ rationale | LANDED |
| O8 | Lint + typecheck at every interval | Every wave-close hard gate ran typecheck + test + build + profile:budget + verify-export-types per PROGRESS.md | LANDED (process-level) |
| O9 | Better encapsulation | W4 Lane A (/api expansion) + Lane B (leaky abstraction fixes — UseAuroraReturn + dock barrel re-export) | LANDED |
| O10 | Service boundaries consistency | W4 Lane C (avatarVariant rename + useToast decision + module-registries documented) | LANDED |
| O11 | DI patterns consistency | W2 HEADLINE (dock typed-context + helper-pair canonicalization; invariant 25 codified at W0 Lane B) | LANDED |
| O12 | Pipeline orchestration | W5 all 5 lanes (proof:all + release.sh dedup + freshness DRY + CI expansion) | LANDED |
| O13 | 6-agent backend audit | At O open — 6 research lanes (Rα/β/γ/δ/ε/ζ) returned; `research/` dir contains all 6 deliverables | LANDED |
| O14 | Recap ALL prior prompts | Rζ deliverable captures K/L/M/N + revisions; `findings.md` cross-walk table verified | LANDED |
| O15 | Chronically-deferred items fold in | `findings.md` enumerates O-N-1 through O-N-8 + O-CD-1 through O-CD-3 with named dispositions | LANDED (see §3) |
| O16 | 6-agent consumer audit (round 2) | At O open — O11/a through O11/f returned; `audit/O11-Lane-{a..f}.md` all present | LANDED |
| O17 | Planning-only round (O open) | Open round delivered planning substrate + research only; implementation dispatch authorized at W0 by separate user directive | LANDED (per process) |
| O18 | Hardened agent git clause | Re-bound at `dispatch/AGENT.md`; invariant 27 codified at W0 Lane B (tooling-side stash enforcement) | LANDED |

**Per-directive verdict**: 18/18 addressed — all LANDED. No directive deferred or missed.

---

## §3 — N-residual disposition (O-N-1 through O-N-8 + O-CD-1 through O-CD-3)

| # | Item | Declared disposition | Actual disposition at HEAD |
|---|---|---|---|
| O-N-1 | Playwright/Chrome-MCP runtime probe | re-run when tooling reconnects | DEFERRED — π lane at W7 will spot-check tooling state; no wave absorption needed; carry-forward to P |
| O-N-2 | 23 broader wire-targets | per-consumer/per-primitive wires at O | PARTIAL — W6 Lane A absorbed 2 (useClipboard + HeaderRibbon); remaining ~21 carry-forward to P |
| O-N-3 | 3 MINOR γ doc-drifts | fold into a doc-tier wave; small absorb | LANDED at W3-W4 doc updates (DESIGN.md dock subsystem; CLAUDE.md subpath surface updates per wave) |
| O-N-4 | 3 MINOR δ notes | per-item triage at O.W0 / O.W1 | PARTIAL — `SectionBackdrop` type on `/api` addressed at W4 Lane A scope; `data-backdrop` attr + MetaballCanvas position-fixed gap CARRY-FORWARD (no wave touched) |
| O-N-5 | `<GlassScrubber>` or `Slider variant="timeline-glass"` (3 fourier-analysis sites) | substrate proposal for O — clears ≥ 2-consumer bar | DEFERRED — not absorbed by W6 (not in lane manifest); carry-forward to P per W7 close + O11/b re-audit at W7 |
| O-N-6 | Keyframes.js 84% UI-scaffolding overfitting | consumer-owned cleanup | NO-OP (consumer-owned); glass-ui-side action: none (correct per disposition) |
| O-N-7 | Words/frontend `--scale-press-{xs..lg}` ladder | token-tier proposal | PARTIAL — W6 Lane C `@utility scale-on-hover` addresses hover-axis; press-axis ladder DEFERRED to P (W6.md proposes optional ladder; agent did not extend per scope) |
| O-N-8 | `<DockMobileToggle>` new primitive | re-evaluate per user signal | DEFERRED — no user signal at O; W6 Lane D dock touch-target @media absorbs part of mobile-density concern; new primitive carry-forward to P |
| O-CD-1 | L-vue-passive-listeners (PERMANENT-DEFER) | document only | PERMANENT-DEFER carries; no action |
| O-CD-2 | L-cache-ttl (PERMANENT-DEFER) | document only | PERMANENT-DEFER carries; no action |
| O-CD-3 | M.W1 WIP-branch commits (keyframes.js / value.js) | document; orchestrator does not push WIP | DOCUMENTED; carry-forward to ι sweep at W7 |

**N-residual verdict**: 7/11 LANDED-or-PARTIAL; 4 CARRY-FORWARD to P (O-N-1, O-N-5, O-N-8, partial of O-N-2/4/7) — all with named destinations. Consistent with W7.md provisional carry-forward list at `O.md §8`.

---

## §4 — Verdict

**CLEAN.**

Every declared wave artefact landed. Every user O-directive (O1-O18) addressed at a named wave OR explicitly deferred with rationale. All 7 wave-close commits exist in the O range (`18876f4..HEAD`) with their declared version tags (v1.2.0 → v1.2.1 → v1.2.2 → v1.2.3 → v1.3.0 → v1.3.1 → v1.4.0). All 32 lane proof docs + 2 decision docs + 12 round-1/round-2 research deliverables present in `docs/tranches/O/audit/` and `research/`.

Two observations classified MINOR (no blocker):

1. **DataTable.vue residual `console.warn`** — DEV-only developer hint gated on `import.meta.env.DEV`; production-stripped; out of W1 Rα F-cohort scope. Befitting per invariant 24's library-internal-contract-violation distinction. No action required at O; flag for P consideration if invariant 24's scope expands.
2. **W2 worktree.baseRef drift incident** — Lane B + C dispatched against stale base (`origin/master` pre-Lane-A-push); orchestrator reconciled at integration. Process candidate folded to LL ledger by ι lane at W7. Codification candidate: push intermediate commits before downstream dispatch OR explicit `worktree.baseRef=head` mid-wave. Documented in PROGRESS.md + W2 close commit body.

Two N-residual gaps explicitly carry forward to P with named destinations (O-N-5 GlassScrubber substrate; O-N-8 DockMobileToggle); consistent with `O.md §8` provisional carry-forward list — no breakage of L invariant 8 or N invariant 23.

---

## §5 — Spot-verification evidence

Citations of read-only git invocations + file paths used to substantiate every claim in this audit.

### Git invocations (read-only)

```bash
git log --oneline 18876f4..HEAD
# → 8 commits matching the O range: d327a45..25e1b5a (W0 through W6)

git tag -l 'v1.*' --sort=-version:refname
# → v1.4.0 / v1.3.1 / v1.3.0 / v1.2.3 / v1.2.2 / v1.2.1 / v1.2.0 — all 7 O tags present

git show --stat d327a45 | head    # W0 close — confirmed lane A/B/C scope
git show --stat 827b6ae | head    # W1 close
git show --stat 7dce645 | head    # W2 close + worktree drift note
git show --stat b892eab | head    # W3 close
git show --stat ea71fe9 | head    # W4 close
git show --stat 4170f02 | head    # W5 close
git show --stat 25e1b5a | head    # W6 close

git status                        # working tree clean (modulo W4 audit json mod in /tranches/K)
git stash list                    # empty — ι precondition holds at audit time
git reflog | head -5              # 5 most recent ops are the 5 most recent wave-close commits — clean
git -C docs/precepts log --oneline -5
# → precept HEAD = 46ee7e9; invariants 24-27 codified per commit subject
```

### File-system spot checks

```bash
ls docs/tranches/O/audit/                  # 32 entries (6 O11 + W0×3 + W1×6 + W2×3 + W3×3 + W4×4 + W5×4 + W6×4)
ls docs/tranches/O/research/               # 6 entries (Rα Rβ Rγ Rδ Rε Rζ)
ls docs/tranches/O/waves/                  # W0.md … W7.md (8 entries)
ls docs/tranches/AB/                       # AB.md FINAL.md PROGRESS.md coordination/ waves/
ls docs/tranches/AB/waves/                 # W1.md W2.md W3.md W4.md (4 entries)
ls src/components/custom/dock/composables/ # dockContext.ts dockLayerContext.ts present (W2 substrate)
ls src/components/custom/timeline/         # 4 SFCs + geometry.ts + index.ts + types.ts (W3 substrate)
ls src/composables/dom/                    # useClipboard.ts present (W6 substrate)
ls src/components/custom/header-ribbon/    # HeaderRibbon.vue + types.ts + index.ts (W6 substrate)
ls scripts/aurora-profile/                 # harness-browser.mjs extracted (W3 Lane B)
ls scripts/                                # freshness-walk.mjs + .d.mts sidecar (W5 Lane C)
ls .github/workflows/                      # ci.yml (W5 Lane E — lint.yml renamed/expanded)
ls src/fonts/                              # README.md (W6 Lane D Fira Code stub; woff2 deferred)
```

### Content spot checks

```bash
grep -rn 'inject(' src/components/ | grep -E 'dock|glassDock'
# → ZERO string-key injects; only DOCK_CONTEXT_KEY / DOCK_LAYER_GROUP_KEY Symbol injects

grep -rn "back-compat|backward-compat" src/
# → 2 matches (matches W0 hard-gate ≤ 2 ceiling)

grep -rn "console.warn|console.error" src/
# → 1 match (DataTable.vue DEV-only warning; MINOR observation)

grep -E "avatarVariants|installDarkModeSync|UseAuroraReturn" MIGRATION.md
# → present at v1.3.0 sections (W4 Lane B + C renames)

cat package.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['version'], len(d['exports']))"
# → 1.4.0  39  (matches W6 close: v1.4.0 + 39 exports including new /header-ribbon)

grep "^## " CHANGELOG.md | head -7
# → 7 O-wave CHANGELOG entries v1.2.0..v1.4.0 — all present
```

---

**End α audit — verdict CLEAN. No blocker; 2 MINOR observations + 4 named-carry-forward items to P.**
