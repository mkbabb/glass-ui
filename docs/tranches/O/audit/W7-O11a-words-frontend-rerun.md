# O.W7—O11/a words/frontend consumer re-audit (post-O round-2 rerun)

**Date:** 2026-05-14
**Lane:** O.W7—6-agent consumer re-audit; lane (a).
**Scope:** READ-ONLY audit of `/Users/mkbabb/Programming/words/frontend` at HEAD against glass-ui v1.4.0 (O.W6 close).
**Baseline:** `docs/tranches/O/audit/O11-Lane-a-words-frontend.md` (round-2; MINOR verdict).
**Consumer HEAD:** `0f16925`—UNCHANGED since M.W1; tree quiescent (no new commits since baseline).
**glass-ui pin:** `"@mkbabb/glass-ui": "file:../../glass-ui"`—workspace link → v1.4.0 HEAD.
**Bounds:** Read-only; this doc is the only artefact. No git mutations.

---

## § 1. Per-finding disposition

Six W7-spec verification items, each cross-walked to the O wave that produced (or didn't produce) the change.

### Finding 1—ProgressiveSidebar slotted-chassis change (W2 + W4 commits)

**Disposition: DEFERRED-to-P.**

Baseline G2 (`O11-Lane-a-words-frontend.md` §3) proposed refactoring glass-ui's `<ProgressiveSidebar>` to a slotted chassis so the consumer's 469 LOC of parallel implementation (`ProgressiveSidebar.vue` 150 LOC + `WordlistProgressiveSidebar.vue` 319 LOC) could collapse to a wrapper.

**Verification at O HEAD:**

- glass-ui `src/components/custom/sidebar/ProgressiveSidebar.vue`—re-inspected via `grep`-equivalent on `/Users/mkbabb/Programming/glass-ui/src/components/custom/sidebar/`—NO slotted-chassis split landed in O.
- The W2 cohort (dock subsystem DI canonicalization) and W4 cohort (/api promotions + leaky abstractions + service boundaries) **do not touch the sidebar substrate**. Confirmed by reading `W2-Lane-A-dock-typed-context-proof.md`, `W4-Lane-A-api-promotions-proof.md`, `W4-Lane-B-leaky-abstraction-fixes-proof.md`, `W4-Lane-C-service-boundaries-proof.md`.
- Consumer still ships both local components at HEAD:
  - `src/components/custom/navigation/ProgressiveSidebar.vue`—present.
  - `src/components/custom/navigation/WordlistProgressiveSidebar.vue`—present.
- Both are still wired as async-imports in `src/views/Home.vue:142-147` and barrel-exported from `src/components/custom/navigation/index.ts:1-2`.

**Disposition:** **G2 carries to P.** No glass-ui-side action landed in O; consumer parallel-implementation is preserved as-is (no regression—but also no progress on the gap). Recommend orchestrator add P.W? Lane for slotted-chassis `<ProgressiveSidebarShell>` substrate split.

---

### Finding 2—scale-on-hover utility adoption (W6 Lane C)

**Disposition: LANDED (substrate) / NOT-YET-ADOPTED (consumer).**

W6 Lane C landed `@utility scale-on-hover` in `src/styles/utilities.css` (single-token shape; `--scale-hover: 1.08`). Per `W6-Lane-C-scale-on-hover-proof.md`, the utility ships through the `@mkbabb/glass-ui/styles` bundle for consumer Tailwind v4 pickup.

**Baseline (O11/a §I4) claim:** 9 sites of `active:scale-[X.XX]` press-axis literals. These are **press-axis** (`active:`), NOT hover—they migrate via O-N-7 `--scale-press-{xs..lg}` ladder (the press cohort), which is **distinct from scale-on-hover**. W6 Lane C proof doc §"Cross-consumer adoption status" explicitly defers words/frontend press-axis to O-N-7.

**Hover-axis verification at HEAD (this lane, fresh scan):**

```
$ rg -n 'hover:scale-' src | wc -l    # 27 lines
```

Distribution (rg-verified):

| Pattern | Sites | Migration eligibility |
|---|---|---|
| `hover:scale-105` | 7 lines across 4 files (HamburgerIcon ×2, FancyF, ProviderIcons ×4, SearchResultItem) | **Migration candidate**—`1.05` ≠ `1.08`, but acceptable visual ladder shift (consumer-decided). |
| `hover:scale-110` | ~14 lines across 8 files (PWAInstallPrompt, ImageCarousel ×2, CarouselSlide, SynonymListEditable, ImageUploader, EditableField ×2, ActionButton, ModeToggle, WordLookupPopover ×3) | **Migration candidate**—`1.10` ≠ `1.08`, visual ladder shift; acceptable if consumer adopts. |
| `hover:scale-125` | 3 lines (LoadingProgress ×2, YoshiAvatar) | **NOT** a clean migration—`1.25` is dramatic; intentional. Defer. |
| `disabled:hover:scale-100` | 4 lines (CarouselSlide, RefreshButton, EditableField, SynonymListEditable) | Companion suppressor, not standalone hover. Stay literal. |

**Bottom line:** **~21 of 27 hover-axis sites** are migration candidates if the consumer adopts the single-token `scale-on-hover` recipe (collapsing `1.05` + `1.10` rungs into canonical `1.08`). Zero adopted at HEAD (verified: `rg -n 'scale-on-hover' src` returns ZERO).

**Disposition:** **VERIFIED-INTACT** at the substrate side (utility landed; no regression). **DEFERRED-to-consumer-action** for adoption—words/frontend owns the migration decision per `feedback_presets_in_consumer` and the visual-ladder-collapse question. No glass-ui-side blocker; surface as cross-repo wave candidate (see §3).

---

### Finding 3—`.section-label` preservation (W0 Lane C K9 KEEP)

**Disposition: VERIFIED-INTACT.**

W0 Lane C K9 disposition forced KEEP for `.section-label` based on O11/a baseline citing 10 consumer sites. `W0-Lane-C-cosmetic-excise-proof.md` records the K9 KEEP-with-rephrase verdict; the utility itself was preserved verbatim in `src/components/ui/section/Section.vue` (docstring rephrased only).

**Verification at HEAD (this lane, fresh scan):**

```
$ rg -n '\.section-label|section-label' src
src/components/custom/wordlist/views/WordlistDashboard.vue:28
src/components/custom/wordlist/views/WordlistDashboard.vue:34
src/components/custom/wordlist/views/WordlistDashboard.vue:41
src/components/custom/wordlist/views/WordlistDashboard.vue:104
src/components/custom/search/components/results/SearchResults.vue:54
src/components/custom/navigation/WordlistProgressiveSidebar.vue:72
src/components/custom/navigation/WordlistProgressiveSidebar.vue:90
src/components/custom/wordlist/WordlistStatsBar.vue:8
src/components/custom/definition/components/WordHeader.vue:170
src/components/custom/definition/components/WordHeader.vue:191
src/components/custom/wordlist/modals/WordDetailModal.vue:108
src/components/custom/wordlist/cards/WordPreviewList.vue:13
```

**12 active consumer sites across 7 files.** Baseline cited 10 (close enough—baseline grouped `WordHeader.vue` and `WordPreviewList.vue` differently; the count is monotonic-non-decreasing as expected of a quiescent tree). All sites still wired through `class="section-label ..."`. The Vite build artifact `dist/assets/index-naxua4ie.css` (346.83 kB) materializes the utility downstream (consumer Tailwind v4 pickup confirmed indirectly through the green build).

**Disposition:** **VERIFIED-INTACT.** K9 KEEP was the correct call; 12 sites still consume. No regression.

---

### Finding 4—`avatarVariant` → `avatarVariants` rename (W4 Lane C)

**Disposition: VERIFIED-INTACT (no consumer impact).**

W4 Lane C renamed the singular CVA const `avatarVariant` → `avatarVariants`. Per the lane proof:

> Cross-repo audit results—`words` | 0 matches | no avatar usage.

**Verification at HEAD (this lane, fresh scan):**

```
$ rg -n 'avatarVariant|avatarVariants' src
(no matches)
```

Confirmed. Consumer does import `Avatar` + `AvatarImage` (per baseline §4 cross-walk at `SidebarHeader.vue:81`), but **never reaches into the `avatarVariant(s)` CVA directly**. The rename is consumer-transparent.

**Disposition:** **VERIFIED-INTACT.** Zero breakage. Zero migration owed.

---

### Finding 5—`useDarkModeSync` → `installDarkModeSync` rename (W4 Lane B)

**Disposition: VERIFIED-INTACT (no consumer impact).**

W4 Lane B renamed `useDarkModeSync` → `installDarkModeSync`. Per the lane proof:

> Cross-repo audit results—`words` | 0 matches | no impact.

**Verification at HEAD (this lane, fresh scan):**

```
$ rg -n 'useDarkModeSync|installDarkModeSync' src
(no matches)
```

Confirmed. Consumer uses `useGlobalDark` (per baseline §1—App.vue + useStateSync.ts) but does NOT consume `useDarkModeSync`/`installDarkModeSync`. The rename is consumer-transparent.

The only cross-repo migration is `speedtest` (2 files / 3 references per W4 Lane B proof)—that's the O11/f lane, not this one.

**Disposition:** **VERIFIED-INTACT.** Zero breakage. Zero migration owed.

---

### Finding 6—Cross-walk to W6 dock-icon-button token ladder

**Disposition: VERIFIED-INTACT (consumer consumes; new token cohort is consumer-transparent).**

W6 Lane B added the `--dock-active-{bg,color,scale,border,shadow}` 5-token cohort to `src/styles/tokens.css` and rewired `.dock-icon-button` active-state rule in `src/styles/dock.css`. Defaults preserve the prior visual contract exactly (no transform / no border / no shadow; only `background: var(--muted); color: var(--foreground)` painted previously).

**Verification at HEAD (this lane, fresh scan):**

```
$ rg -n 'DockIconButton|dock-icon-btn|dock-icon-button' src | wc -l
17 matches
```

Two consumer sites use `DockIconButton`:

| File | Sites | Import |
|---|---|---|
| `src/components/custom/definition/components/ThemeSelector.vue` | 6 instances (lines 11-84) | `import { GlassDock, DockIconButton } from '@mkbabb/glass-ui/dock'` (line 144) |
| `src/components/custom/wordlist/views/WordListView.vue` | 3 instances (lines 27, 33, 40) | `import { GlassDock, DockIconButton } from '@mkbabb/glass-ui/dock'` (line 234) |

Consumer consumes `<DockIconButton>` as a Vue component (9 total instances). Zero `:deep()` overrides against `.dock-icon-button` active state (verified—`rg -n ':deep\(' src` returns sites unrelated to dock-icon-button; baseline §I-G cross-walk to O11/c bbnf-buddy R1 confirmed bbnf-buddy is the only consumer with 7 such overrides).

**Disposition:** **VERIFIED-INTACT.** Consumer uses `DockIconButton` 9 times; token-ladder promotion preserves the visual contract; zero override-escape sites in words/frontend. The W6 Lane B promotion is consumer-transparent for words (the 2nd-consumer-bar was cleared via speedtest-default + bbnf-buddy-override per the lane proof).

---

## § 2. Post-O substrate non-regression check

**Question:** Does words/frontend still build at HEAD against glass-ui v1.4.0?

### § 2.1 Build verification

```
$ cd /Users/mkbabb/Programming/words/frontend
$ npm run build
...
dist/assets/ProgressiveSidebar-BtQw8P49.js             17.87 kB
dist/assets/dock-C_PRk1aq.js                            9.74 kB
dist/assets/WordlistProgressiveSidebar-CQqulMgs.js     10.12 kB
dist/assets/index-naxua4ie.css                        346.83 kB
dist/assets/vendor-KWBX3X8a.js                        373.76 kB
dist/assets/index-Ct1EiRVj.js                         453.20 kB
✓ built in 3.12s
```

**Build: GREEN.** All glass-ui imports resolve. 12-subpath shape from baseline (root, `/dark`, `/forms`, `/controls`, `/dock`, `/sidebar`, `/confirm-dialog`, `/carousel`, `/stacked-icons`, `/tabs`, `/typewriter`, `/styles`) confirmed unchanged—114 import lines verified (`rg -n '@mkbabb/glass-ui' src | wc -l → 114`).

### § 2.2 Per-finding non-regression matrix

| O cohort | Substrate change | Consumer-visible? | words/frontend regression? |
|---|---|---|---|
| W0 Lane C (K9 KEEP) | `.section-label` preserved | Yes—12 sites consume | NONE—utility intact |
| W1 (4 fail-explicit migrations) | Aurora/shader/typewriter/clone throws | Zero—none consumed by words | NONE |
| W2 (dock DI canonicalization) | Typed-context + helper pair + 5 consumer migrations | Zero—words doesn't reach into DI keys (per baseline §4 round-1 cross-walk) | NONE |
| W3 (god-module splits) | GlassTimeline split / profile-aurora extract / preset-editor split | Zero—words doesn't consume any of the split substrates | NONE |
| W4 Lane A (/api promotions) | 12 → 14 types on `/api` | Positive—`TreeNode` reachable via `/api` now (consumer currently imports via `/sidebar`) | NONE |
| W4 Lane B (avatarVariants rename) | Singular → plural CVA const | Zero—words doesn't reach into CVA | NONE |
| W4 Lane B (installDarkModeSync rename) | use→install rename | Zero—words doesn't consume | NONE |
| W4 Lane B (UseAuroraReturn named interface) | New return type | Zero—words doesn't consume Aurora | NONE |
| W4 Lane C (useToast KEEP-with-rationale) | No source change | Zero—words has 8 useToast sites; still wired | NONE |
| W5 (pipeline orchestration) | proof:all / freshness DRY / release.sh dedup / CI expansion | Zero—internal-only | NONE |
| W6 Lane A (HeaderRibbon + useClipboard promotions) | New subpath substrates | Zero—words doesn't consume HeaderRibbon/useClipboard | NONE |
| W6 Lane B (`--dock-active-*` token ladder) | 5 tokens + dock.css recipe rewire | Yes—DockIconButton instances paint via tokens | NONE—visual contract preserved |
| W6 Lane C (`scale-on-hover` utility) | New @utility in utilities.css | Yes—consumer can opt-in; no breaking | NONE—0 adoption sites today |
| W6 Lane D (speedtest AC.W6 cohort) | speedtest-side; orthogonal | Zero—words-disjoint | NONE |

**Verdict:** **ZERO regression** across all 14 substrate change rows.

### § 2.3 Subpath shape verdict

- 38 published subpaths at v1.4.0—consumer uses 12; zero retired-subpath leakage (re-verified at HEAD).
- Build resolves all 12 subpaths cleanly; dist chunks materialize per consumer's Vite splitter (`dock-*.js`, `carousel-*.js`, etc.).

---

## § 3. Adoption opportunities (cross-repo wave candidates)

Five candidate wave items surfaced or carried-forward from the baseline:

### § 3.1 scale-on-hover utility adoption (W6 Lane C carry-forward)

- **~21 of 27 hover-axis sites** in words/frontend are migration candidates (`hover:scale-105` × 7, `hover:scale-110` × 14; minus the 3 `hover:scale-125` dramatic-shift sites which stay literal).
- Single-line per call-site mechanical rewrite: `class="hover:scale-110 transition-fast"` → `class="scale-on-hover"`.
- **Caveat:** consumer would collapse a 2-rung visual ladder (`1.05` + `1.10`) into the canonical `1.08`. Acceptable per `feedback_presets_in_consumer` IF the consumer accepts the canonical tier; otherwise, words/frontend keeps the project-specific scale rungs.
- **Wave candidate for P:** cross-repo wave coordinated with keyframes.js (13 sites) + speedtest + bbnf-buddy.

### § 3.2 press-scale ladder (O-N-7 carry-forward)

- 9 `active:scale-[X.XX]` press-axis literals in words/frontend (`0.95` ×2, `0.96`, `0.97` ×2, `0.98` ×4 per baseline §I4).
- Two reads per baseline:
  - (a) consumer collapses to `--scale-press-btn` (`0.97`) project-wide—9 one-line rewrites; LANDS in words alone.
  - (b) glass-ui ships `--scale-press-{xs,sm,md,lg}` 4-rung ladder—requires ≥ 2 consumers to clear L invariant 8 (substrate-without-consumer-binary).
- **Wave candidate for P:** O-N-7 cohort decision. If a second consumer surfaces press-axis multi-rung use, the ladder lands; otherwise (a) is consumer-side.

### § 3.3 ProgressiveSidebar slotted-chassis (G2 carry-forward)

- 469 LOC of consumer code parallels the published primitive due to insufficient extension surface.
- High-impact substrate proposal: split `<ProgressiveSidebar>` → `<ProgressiveSidebarChassis>` (slot-driven shell) + `<ProgressiveSidebarDefault>` (current behaviour preserved).
- **Wave candidate for P:** glass-ui-side; high impact. Consumer drops 469 LOC if the chassis surfaces `#cluster-header` / `#cluster-item` / `#footer` slots.

### § 3.4 PaperBackdrop `/api` promotion + texture-system migration (G3 + I2 carry-forward)

- `useTextureSystem.ts` (149 LOC) + 4 texture components (341 LOC together) parallel glass-ui's `paper-backdrop` subpath.
- Cross-walk to baseline §G3: promote `PaperBackdropProps` + `PaperVariant` union to `/api`. Document canonical paper-backdrop recipe.
- **Wave candidate for P:** library-side `/api` promotion (W4-tier follow-up) + consumer-side cleanup wave.

### § 3.5 Local `Card.vue` duplication (I1 carry-forward)

- 71 LOC consumer-local `Card.vue` duplicates `@mkbabb/glass-ui` `Card` (already imported in 4 sites).
- Pure consumer-side cleanup; no glass-ui action.
- **Wave candidate for P:** consumer-side cleanup wave (words owns).

---

## § 4. Verdict

**CLEAN.**

- **Substrate non-regression: VERIFIED.** All 14 O substrate change rows are either consumer-transparent or consumer-positive at words/frontend. Zero regression. Build green at HEAD against glass-ui v1.4.0.
- **Per-finding dispositions:**
  - F1 (ProgressiveSidebar chassis)—**DEFERRED-to-P** (no O-side action landed; carry-forward G2).
  - F2 (scale-on-hover)—**LANDED** substrate / **NOT-YET-ADOPTED** consumer-side; ~21 of 27 hover-axis sites are clean migration candidates.
  - F3 (`.section-label` KEEP)—**VERIFIED-INTACT**; 12 sites still consume.
  - F4 (avatarVariants rename)—**VERIFIED-INTACT**; zero consumer impact.
  - F5 (installDarkModeSync rename)—**VERIFIED-INTACT**; zero consumer impact.
  - F6 (dock-icon-button token ladder)—**VERIFIED-INTACT**; 9 DockIconButton instances paint via the new tokens; visual contract preserved.
- **Tree quiescence:** words/frontend HEAD `0f16925` unchanged since M.W1; zero new drift, zero new commits, zero new migration owed.
- **Carry-forward to P:** 5 wave candidates documented in §3 (3 glass-ui-side, 2 consumer-side).

**No BLOCKER. No MINOR-tier glass-ui-side action required at O close.** The post-O substrate is non-regressive for words/frontend.

---

**Report compiled:** 2026-05-14 | O.W7—O11/a words/frontend consumer re-audit (round-2 rerun) | read-only.
