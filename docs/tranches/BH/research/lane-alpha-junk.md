# LANE α — REPO-JUNK + META-FILE CENSUS (BH tranche research)

Read-only census of every top-level item in `/Users/mkbabb/Programming/glass-ui` at HEAD
(branch `tranche/BG`, version 4.2.0). Classification: tracked-status · what-reads-it ·
disposition · why. Built on the BH framing locks (CLAUDE.md DELETED-after-redistribution;
5.0.0 clean-break export reshape; interleaved with live BG tranche).

Disposition legend: `delete` · `migrate` (move to a real home) · `colocate` · `split`
(god-module carve) · `fail-explicit` · `reshape` · `keep`.

---

## 0. HEADLINE FINDINGS

1. **99 root scratch images, 28 MB, ALL correctly gitignored (0 tracked).** The `*.png`/
   `*.jpeg` ignore rules work; no image leaked into git. They are pure local scratch and
   safe-delete. The problem is accretion (no sweep policy), not leakage.
2. **THREE gitignore GAPS** — dirs that exist, are scratch, and are NOT covered:
   `.tmp/` (12K), `.playwright/` (4.2 MB of `liquid-pager-goo-*.png` probe scratch), and
   `test-results/` (36K) — which has **3 ACCIDENTALLY-TRACKED Playwright failure artefacts**
   (`.last-run.json` + 2 `error-context.md`). These are the only real junk leakage.
3. **`.browserslistrc` is DEAD.** Nothing reads it. No `browserslist`/`autoprefixer` package
   is installed; Tailwind v4 (`@tailwindcss/vite` 4.3.1) uses lightningcss with its own
   internal target set and ignores `.browserslistrc`. Zero references in any config/script.
   → `delete`.
4. **"5 vite configs" is really 3 configs + 2 shared modules.** `vite.config.ts` (default
   build+dev), `vite.iter.config.ts` (iter build), `vitest.config.ts` (tests) are the three
   real configs. `vite.library.ts` + `vite.style-assets.ts` are imported MODULES, not
   standalone configs. `vite.style-assets.ts` is **566 lines — a god module** (>500L) and a
   `split` candidate.
5. **18 `proof:*` gates READ CLAUDE.md from disk** (most via a `W<N>: CLAUDE.md must record …`
   doc-honesty clause). All must be re-homed onto the new doc set or retired when CLAUDE.md
   is deleted. This is the single largest BH gate-consolidation surface.
6. **4 tsconfigs, all load-bearing** (`tsconfig.build.json` IS required for `emit-types`).
   `tsconfig.src.json` is a near-dead 1-script alias (`iter-check` only).
7. **BG COLLISION ALERT:** the live BG working tree already shows `D .retired-classes.txt`
   (BG is deleting it) + `M scripts/lib/critical-path-walk.mjs` + `M scripts/proof-ba-gestalt.mjs`.
   BH's scripts/ gate-consolidation band MUST sequence after BG closes or carve around these.

---

## 1. ROOT SCRATCH IMAGES (the ~80–99 PNG/JPEG)

| Fact | Value |
|---|---|
| Count | **99** files (`*.png` + `*.jpeg`) |
| Total size | **28 MB** |
| Tracked in git | **0** (`git ls-files` on root images = 0) |
| Ignored by | `.gitignore` line 3 `*.png`, line 31 `*.jpeg` |
| `git check-ignore` confirms | `aurora-live.png`, `ws12-home-dark.jpeg`, `bg-ws1-hero-live.png` all matched |

These span the entire tranche history (`aurora-live-ax-audit.png` AX · `bc-webgpu-*.jpeg` BC ·
`bd-*.png` BD · `ws11-*`/`ws12-*`/`bg-*` BG · `forms-bento-*` etc.). Every one is single-shot
verification scratch — none is the archived visual-evidence protocol (that lives under
`docs/tranches/*/audit/visual/` and is force-tracked past the ignore via `.gitignore` lines
7–18). **Confirmed coverage: complete. Disposition: `delete` (sweep).** No risk — gitignored,
not in any `package.json` `files[]`, never in a release tarball.

The archived-evidence carve-outs (KEEP, do NOT sweep):
- `!tests-visual/fixtures/*.png` (Van Gogh reference fixture for the painterly gate)
- `!docs/tranches/*/audit/visual/*.png` + `/*/*.png` (live-verified DELTA captures, asserted
  on-disk by `proof:live-verified-ledger`)
- `!docs/tranches/*/audit/reflect/*.png` + `/*/*.png` (AZ reflect captures)

---

## 2. GITIGNORED / SCRATCH DIRECTORIES

| Dir | Exists | Size | Tracked files | Ignored? | Disposition | Why |
|---|---|---|---|---|---|---|
| `.cache/` | yes | 16 MB | 0 | YES (line 26) | keep-ignored, sweep | gate-output pure-function cache (inv-θ) |
| `.playwright-mcp/` | yes | 1.9 MB (351 subdirs) | 0 | YES (line 19) | keep-ignored, sweep | MCP browser scratch |
| `dist/` | yes | 7.6 MB | 0 | YES (line 2) | keep-ignored | build output |
| `node_modules/` | yes | — | 0 | YES (line 1) | keep-ignored | deps |
| `.DS_Store` | — | — | 0 | YES (lines 27–28) | keep-ignored | macOS junk (none tracked ✓) |
| `as-verify/` | NO | — | — | YES (line 39) | n/a | doesn't exist now |
| `demo/dist/` | NO | — | — | YES (line 20) | n/a | doesn't exist now |
| **`.tmp/`** | yes | 12K | 0 | **NO — GAP** | gitignore-add + sweep | holds only `.tmp/.DS_Store`; scratch |
| **`.playwright/`** | yes | **4.2 MB** | 0 | **NO — GAP** | gitignore-add + delete | `liquid-pager-goo-*.png` probe scratch (BE-era) |
| **`test-results/`** | yes | 36K | **3 TRACKED** | **NO — GAP** | untrack + gitignore-add | Playwright run artefacts, partly committed |

### The 3 accidentally-tracked `test-results/` files (real junk leakage)
```
test-results/.last-run.json
test-results/tests-visual-adaptive-glas-004b9-grey-desktop-—-display-card/error-context.md
test-results/tests-visual-adaptive-glas-066c4--grey-mobile-—-display-card/error-context.md
```
These are Playwright last-run state + two failure error-context dumps that slipped into git.
**Disposition: `git rm --cached` (untrack, keep local) + add `test-results/` to `.gitignore`.**
Why: Playwright regenerates these every run; tracking them is noise + churn.

---

## 3. TYPESCRIPT CONFIGS (4 tracked)

| File | Tracked | Extends | What reads it | Disposition | Why |
|---|---|---|---|---|---|
| `tsconfig.json` | yes | — | base; `vue-tsc --noEmit` (typecheck), `components.json` `tsConfigPath` | **keep** | the strict src+demo base (`noEmit`, ES2022/bundler/strict, `include:[src/,demo/]`) |
| `tsconfig.build.json` | yes | `tsconfig.json` | **`emit-types` script** (`vue-tsc --project tsconfig.build.json`) | **keep — LOAD-BEARING** | the ONLY dts-emit config: `emitDeclarationOnly`, `rootDir:src`, `outDir:dist`, excludes tests. CLAUDE.md §Build names it; the whole `.d.ts` ship depends on it. |
| `tsconfig.test.json` | yes | `tsconfig.json` | `typecheck` 2nd arm (`vue-tsc --noEmit -p tsconfig.test.json`) | **keep** | folds `tests/` into the type system (AX.W62 — bites dead test imports); relaxes `noImplicitAny`, shims `.mjs` gates |
| `tsconfig.src.json` | yes | `tsconfig.json` | **ONE script only:** `iter-check` (`vue-tsc --noEmit --project tsconfig.src.json`) | **reshape/consider-delete** | 3-line `{extends, include:[src/]}` — near-identical to base minus the `demo/` include. The `iter-check` script could point at the base config; this file's only value is dropping `demo/` from the iter typecheck. Low-value; a BH `reshape` candidate (fold into a single config + a CLI `--include` arg, or delete if `iter-check` itself is dead). |

**Answer to the framed question:** YES, `tsconfig.build.json` is load-bearing for emit-types/
vue-tsc — it cannot be deleted. `tsconfig.src.json` is the one weak link.

---

## 4. VITE / VITEST CONFIGS — "do we need 5?"

**No — there are 3 real configs + 2 shared modules.** Only `vite.iter.config.ts` is passed via
`--config`; `vite.config.ts` + `vitest.config.ts` are the tool defaults; `vite.library.ts` +
`vite.style-assets.ts` are `import`ed by the configs.

| File | Lines | Tracked | Role | Read by | Disposition |
|---|---|---|---|---|---|
| `vite.config.ts` | 72 | yes | **default config** — `dev` + `build` (lib build, manualChunks recipe) | `vite` (default), `npm run build`/`dev` | **keep** |
| `vite.iter.config.ts` | 34 | yes | iter build (`emptyOutDir:false`, overwrites JS/CSS chunks in place, no sourcemap) | `--config vite.iter.config.ts` in package.json | **keep** (distinct: fast partial rebuild that preserves the dts set) |
| `vitest.config.ts` | 30 | yes | test runner config (happy-dom, `tests/**`+`scripts/**` glob, dev conditions) | `vitest` (default) | **keep** |
| `vite.library.ts` | 74 | yes | **shared MODULE** — `libraryEntries`/`libraryFileName`/`libraryExternal` | imported by `vite.config.ts` + `vite.iter.config.ts` | **keep, but RESHAPE in 5.0.0** — `libraryEntries` Tier-2 batch-globs `src/subpaths/*.ts`; the framing kills `src/subpaths/`, so this glob + the curated/trivial two-tier split must be re-authored for the typed per-subpath surface |
| `vite.style-assets.ts` | **566** | yes | **shared MODULE** — `publishStyleAssets()` plugin (emits `/styles`, critical-partition, component-utility self-emission P9) | imported by `vite.config.ts` + `vite.iter.config.ts` | **split — GOD MODULE** (>500L; the user's no-god-module ratchet applies to build infra too) |

**Disposition summary:** keep all 3 configs (each has a distinct job) but RENAME for clarity is
optional; `split` `vite.style-assets.ts`; `reshape` `vite.library.ts` for the 5.0.0 subpath
death.

---

## 5. OTHER META CONFIG / DIRS

| Item | Tracked | What reads it | Disposition | Why |
|---|---|---|---|---|
| `.browserslistrc` | yes | **NOTHING** (no browserslist/autoprefixer dep; Tailwind v4 ignores it; 0 config/script refs) | **DELETE** | dead config. The only repo hits for "browserslist" are an AX research corpus JSON + `proof-liquid-glass-material.mjs` (unrelated string), neither reads the file |
| `components.json` | yes | shadcn-vue CLI (`npx shadcn-vue add`), `tsConfigPath:./tsconfig.json` | **keep** (conditional) | needed IFF the team still scaffolds shadcn components. If glass-ui is now a fully-owned fork with no `shadcn-vue add` workflow, it is `delete`-eligible — verify with the team. Low cost to keep (384 bytes) |
| `.changeset/` (config.json + README.md) | yes | `@changesets/cli` (baseBranch master, access public) | **keep** | standard release infra; `release.yml` comment references the changesets Version-Packages merge. NOT wired into `package.json` scripts directly but is the canonical bump path. Small. |
| `.githooks/commit-msg` | yes | `git config core.hooksPath=.githooks` (set) | **keep — re-target** | runs `proof:live-verified-ledger --tranche=BB` on every commit. **STALE: hardcodes `--tranche=BB`** while HEAD is BG. BH should re-point to the active tranche (or make it env-driven) |
| `.github/workflows/{ci,release}.yml` | yes | GitHub Actions | **keep** | CI + gated provenance publish |
| `.github/.DS_Store` | NO (ignored) | — | sweep | macOS junk, untracked |
| `.gitmodules` | yes | git submodule (`docs/precepts` → `git@github.com:mkbabb/precepts.git`, at `c9950089`) | **keep — central to BH** | the precepts submodule is the redistribution home for repo-specific CLAUDE.md extraction (see §8) |
| `index.html` | yes | `vite dev` (demo entry), not referenced in configs (vite default root) | **keep** | demo dev-server entry; load-bearing for `npm run dev` |
| `.retired-classes.txt` | yes (**BG is DELETING it** — `D` in working tree) | `proof:phantom-classes` (greps every entry across src/demo + constellation consumers) | **keep IF BG keeps it** — COLLISION | BG's working tree shows `D .retired-classes.txt`; resolve with BG before BH touches the phantom-class gate |
| `.cache/` `.tmp/` `.playwright*/` | — | gates / playwright / MCP | see §2 | — |

---

## 6. ROOT SCRATCH DOC — BD-CONTINUATION-PROMPT.md

| Fact | Value |
|---|---|
| Tracked | **yes** |
| Size | 12 KB |
| Content | BD tranche "continuation prompt" — recaps 50+ user messages, standing directive, points at `docs/tranches/BD/MASTER-REQUEST-RECAP.md` etc. |
| Disposition | **`migrate`** → `docs/tranches/BD/` (it is BD-tranche scratch parked at root) |
| Why | A root-level historical recap of a closed/superseded tranche is exactly the "dead/historical wave-notes ARCHIVED into their owning tranche" rule. Not a live contract — pure recap. Move, do not delete (it documents the BD mission). |

---

## 7. THE FOUR GIANT ROOT DOCS

| Doc | Size | Lines | Tracked | Ships to npm? | Primary readers | Disposition |
|---|---|---|---|---|---|---|
| `CLAUDE.md` | 317 KB | **941** | yes | no (not in `files[]`, but agent-facing) | agents + 18 `proof:*` gates (§8) | **DELETE-after-redistribute** (framing-locked) |
| `CHANGELOG.md` | 267 KB | — | yes | implicitly (npm tarball) | `proof:{ay,az,ba}-final`, `proof:no-legacy-commentary`, `gates.mjs` | **modularize/slim** |
| `DESIGN.md` | 163 KB | — | yes | no | `proof:design-md-current`, `proof:aur-kuwahara`, `proof:aurora-space-gamma`, several `wf-*` | **modularize** |
| `MIGRATION.md` | 97 KB | — | yes | implicitly | `proof:{virtual-window,pager-ring,lineage-probe,blob-mood-resolved,…}`, `gates.mjs` | **slim + reshape for 5.0.0** |
| `README.md` | 17 KB | — | yes | **YES (public npm readme)** | `proof:{readme-meta-clean,doc-override-idiom,completion-seal,border-progress,spa-view,…}`, `verify-export-types` | **keep, refresh for 5.0.0** |
| `CONTRIBUTING.md` | 4 KB | yes | implicitly | — | **keep** |
| `LICENSE` | 1 KB | yes | YES | — | **keep** |

### Per-doc policy

- **CLAUDE.md (DELETE after redistribution).** 941 lines, 322 `W-*` wave-refs, 228 `proof:*`
  refs. It is a 301-wave accretion mixing LIVE contracts (per-component behaviour, token
  registers, gate canons) with DEAD historical wave-notes. **Redistribution map (BH must
  build before deletion):**
  - per-component behaviour blocks → `src/components/custom/<dir>/README.md` (colocation
    already exists for many; CLAUDE.md §Structure is the index)
  - cross-cutting canons (glass-first, no-gray, dark-material, motion-canon, surface-axis,
    adaptive-glass) → a `docs/canon/` set (or fold into the precepts submodule's existing
    `design-idioms.md`/`motion-canon.md`)
  - repo-specific precepts (KISS/DRY/overfitting/no-backcompat etc.) → the `docs/precepts`
    submodule (per framing "the precepts-submodule repo-specific extraction")
  - dead wave-notes → the owning tranche `FINAL.md` (30 already exist under `docs/tranches/`)
  - **Deleting live contracts without redistributing = silent loss = forbidden** (fail-explicit).

- **CHANGELOG.md (267 KB — modularize).** Per-version split (`CHANGELOG/4.x.md`, `archive/`)
  or generate from `.changeset` going forward. The `proof:*-final` + `proof:no-legacy-commentary`
  readers must re-home onto the split (or the slim head).

- **DESIGN.md (163 KB — modularize).** Read by `proof:design-md-current` (freshness gate) +
  shader gates. Split into `docs/design/<topic>.md`; re-home the freshness gate.

- **MIGRATION.md (97 KB — slim + reshape).** The 5.0.0 clean-break adds a NEW migration map
  (subpaths death, api fold, export renames). Slim the pre-4.0 history into an archive; the
  active migration section becomes the 4.x→5.0 by-name-ask map.

- **README.md (KEEP, refresh).** The only public npm-facing doc; load-bearing for consumers +
  6 gates. Refresh the import examples for the 5.0.0 typed per-subpath surface.

---

## 8. GATES THAT PARSE CLAUDE.md — the retire/re-home surface

`grep` over `scripts/`: **42 scripts mention CLAUDE.md; 18 `proof:*` gates READ it from disk.**
The `wf-*` scripts are dev-orchestration (not CI gates) — they reference CLAUDE.md as context
and are tranche-local; ignore for CI but note they assume the file exists.

**The 18 disk-reading `proof:*` gates (each needs RETIRE or RE-HOME onto a new doc home):**
```
proof-accent-tone            proof-doc-override-idiom*    proof-on-glass-fg
proof-claude-structure-sync* proof-dock-rail-realize      proof-phase-palette
proof-close-battery-parity   proof-dock-unify             proof-readme-meta-clean*
proof-crossrepo-asks         proof-dropdown-fix           proof-spa-view
proof-doc-consistency*       proof-easing-primitive       proof-split-chars
                             proof-expandable-part        proof-surface-axis
                             proof-handmark
```
`*` = the framing-named central doc gates + the doc-freshness cluster.

Pattern: most carry a `W<N>: CLAUDE.md must record <contract>` doc-honesty clause (e.g.
`proof-handmark` W6 "CLAUDE.md must record the three-register fence", `proof-spa-view` W5,
`proof-phase-palette` W4, `proof-surface-axis` W7). When CLAUDE.md dies these clauses must
re-point to the redistributed home (per-component README / canon doc) or be retired with
rationale.

**The doc-INFRASTRUCTURE gates (the most coupled, re-home FIRST):**
- `proof:claude-structure-sync` — asserts `ls src/components/custom/` ≡ CLAUDE.md §Structure
  enumeration. **Retire** (the enumeration moves to per-dir READMEs; a successor could assert
  every custom dir has a README instead).
- `proof:doc-consistency` — asserts every `custom/<dir>` CLAUDE.md cites resolves on disk.
  **Re-home** onto the README index or retire.
- `proof:doc-override-idiom` — asserts BOTH CLAUDE.md §Consumer-wiring AND README.md carry the
  `-radius` primitive-override idiom (born-RED on the `blur(12px)` composite form). **Re-home**
  the CLAUDE.md arm onto README + a canon doc (keep the README arm).
- `proof:readme-meta-clean` — README/CLAUDE meta-cleanliness. **Re-home** to README-only.
- `gates.mjs` references `CLAUDE` 11× (registration rows + path constants) — must be edited
  when the gates retire.

These two doc-freshness gates also exist (read DESIGN/CHANGELOG, not CLAUDE): `proof:design-md-current`,
the `proof:*-final` CHANGELOG readers — these survive CLAUDE.md deletion but couple to §7 slimming.

---

## 9. BG-COLLISION PROTOCOL (interleave safety)

Live BG working-tree write-set at HEAD (`git status`):
```
D  .retired-classes.txt              ← BG is DELETING (phantom-class registry)
 M scripts/lib/critical-path-walk.mjs ← BG modifying
 M scripts/proof-ba-gestalt.mjs       ← BG modifying
?? scripts/lib/surface-closure.mjs    ← BG new
?? scripts/proof-de-shadcn.mjs        ← BG new
?? docs/tranches/BG/...               ← BG owns
```
**Implications for BH bands:**
- The **scripts/ gate-consolidation band** (retiring the 18 CLAUDE.md gates) overlaps BG's
  scripts/ writes. **Sequence after BG closes**, OR carve to the exact 18 gate files BG does
  not touch (BG touches `critical-path-walk.mjs`, `proof-ba-gestalt.mjs`, `surface-closure.mjs`,
  `proof-de-shadcn.mjs` — none of the 18 CLAUDE-reading gates, so a narrow carve is feasible).
- **`.retired-classes.txt`** — BG deletes it. The phantom-class gate disposition is BG's call;
  BH must NOT independently touch it.
- The **hygiene/scratch-sweep band** (gitignore + image sweep + dead-config delete) touches
  ZERO src/demo/scripts and can run **truly concurrently** — it is the safe first BH wave.
- The **doc-redistribution band** (CLAUDE.md → homes) writes new files under
  `docs/canon/`, `docs/precepts/` (submodule), per-component READMEs — minimal BG overlap
  (BG owns `docs/tranches/BG/` only). Can run concurrently EXCEPT the gate-retirement coda.

---

## 10. CONCRETE SCRATCH-SWEEP COMMAND LIST (read-only proposal — BH executes)

```sh
# (a) untrack the 3 accidentally-committed Playwright artefacts (keep local copies)
git rm --cached -r test-results

# (b) sweep root scratch images (99 files / 28 MB — all gitignored, safe)
#     guarded: never touch the tracked-evidence carve-outs (they are NOT at root)
git clean -ndX -- '*.png' '*.jpeg'      # DRY-RUN preview first (X = ignored-only)
git clean -fdX -- '*.png' '*.jpeg'      # then execute (only after eyeballing the dry-run)

# (c) sweep scratch dirs
rm -rf .playwright .tmp                  # untracked scratch (4.2 MB + 12K)
git clean -fdX .cache .playwright-mcp    # ignored gate/MCP caches (16 MB + 1.9 MB)
rm -f .DS_Store .github/.DS_Store .tmp/.DS_Store **/.DS_Store

# (d) migrate root scratch doc
git mv BD-CONTINUATION-PROMPT.md docs/tranches/BD/CONTINUATION-PROMPT.md

# (e) delete dead config
git rm .browserslistrc
```

## 11. .gitignore HARDENING PROPOSAL (append block)

```gitignore
# --- BH hygiene: close the three scratch-dir gaps ---
.tmp/
.playwright/          # liquid-pager-goo probe scratch (NOT .playwright-mcp/, already covered)
test-results/         # Playwright run artefacts (.last-run.json + error-context dumps)

# (optional consolidation — already covered individually, kept explicit)
# *.png  *.jpeg  *.jpg  *_time.txt  .cache/  .playwright-mcp/  dist/  demo/dist/  as-verify/
```
Note: keep the existing force-track carve-outs (lines 7–18) AHEAD of any new `*.png` rule —
the visual-evidence protocol depends on them.

---

## 12. APPENDIX — quick facts

- Repo version: **4.2.0** (memory said 4.1.0 published; local is ahead). Framing target: **5.0.0**.
- `package.json` `files[]`: `["dist","src/styles","src/fonts"]` (README/LICENSE auto-shipped by npm).
- `release`: `bash scripts/release.sh` (gated provenance publish via `.github/workflows/release.yml`).
- CLAUDE.md: 941 lines, 322 `W-*` refs, 228 `proof:*` refs, 317 KB.
- 30 `FINAL.md` files across `docs/tranches/{AB..BG, C..V}` — the archive homes for dead wave-notes.
- precepts submodule (`docs/precepts`, `c9950089`): already carries `design-idioms.md`,
  `motion-canon.md`, `cross-repo-dev-resolution.md` — the repo-specific canon redistribution target.
- `vite.style-assets.ts` = 566 L (god-module split candidate).
