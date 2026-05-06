# I.W7.γ — Doc-Drift Re-Audit (HEAD `864e882`)

**Date**: 2026-05-06.
**Owner**: read-only deep-audit agent (γ lane of the I close-ceremony 6-agent dispatch).
**Method**: full-surface verification of README.md, CLAUDE.md, DESIGN.md, PROGRESS.md, and I-tranche wave-spec Status: lines against actual repo state at HEAD `864e882`. Strictly read-only; cited rg/ls/grep commands inline.
**Inputs**: `docs/tranches/I/audit/W5-doc-reconciliation.md` (24 γ doc-fix item dispositions) + `docs/tranches/H/audit/H-deep-audit-γ-doc-drift.md` (H baseline: CRIT-D1…D9 + 21 numbered recommendations).

---

## §1. README.md verification

Walking each W5-claimed fix at HEAD:

| # | Claim (W5 §) | Probe | Result | Verdict |
|---|---|---|---|---|
| RM1 | Component count "37 shadcn-vue" (lines 7, 61) | `ls -d src/components/ui/*/ \| wc -l` | `37` | **VERIFIED** |
| RM2 | `.glass-pill` retired across 3 sites (lines 9, 92, 118) | `grep -nE 'glass-pill' README.md` | 0 hits | **VERIFIED** |
| RM3 | `.cartoon-card` / `.elevated-card` phantoms dropped (line 94) | `grep -nE 'cartoon-card\|elevated-card' README.md` | 0 hits | **VERIFIED** |
| RM4 | `cards.css` tree comment lists `.paper-texture, .cream-surface` (line 99) | `sed -n '99p' README.md` content matches | comment reads `.paper-texture, .cream-surface` | **VERIFIED** |
| RM5 | Composables list extended (line 14) | line 14 reads `timer, interval, keyboard shortcut, touch gate, dark-mode, resize-observer, glass-renderer, motion, sortable, pagination, virtual-list, sidebar, and infinite-scroll substrate` | matches `composables/index.ts` 13 export lines | **VERIFIED** |
| RM6 | `custom/` tree marked illustrative (lines 73-77) | line 73 ends with `… see CLAUDE.md for the full list`, line 77 ends `…` | confirmed | **VERIFIED** |
| RM7 | Cartoon-shadow rungs listed (line 144) | line 144 reads `--shadow-cartoon, --shadow-cartoon-{hover,sm,md,lg,accent}, --shadow-card` | tokens.css §7 + theme.css confirm rungs exist | **VERIFIED** |
| RM8 | `--paper-aged-texture` claim dropped (line 146 area) | `grep -nE 'paper-aged-texture' README.md` | 0 hits | **VERIFIED** |
| RM9 | `text-mono-prose` mention added (line 169) | `grep -n 'text-mono-prose' README.md` returns line 169 ("Mono utilities (Fira Code) … `text-mono-micro`, `text-mono-caption`, `text-mono-small`, `text-mono-prose`") | matches `typography.css:255` `@utility text-mono-prose` | **VERIFIED** |
| RM10 | Styles tree adds 8 new files (paper, math, instrument-chassis, glyph-face, dock-group, disco-glyph, hover-popover, prism-theme) | lines 100-110 enumerate each | confirmed | **VERIFIED** |
| RM11 | Peer-dep table (lines 186-194) | 7 peer rows | `package.json:242-253` lists 11 peers; README still has 7 — missing `lucide-vue-next`, `vaul-vue`, `embla-carousel-vue`, `@mkbabb/keyframes.js` | **DRIFTED — README peer-dep table not in W5 scope (CLAUDE-only fix), still under-listed** |

**README verdict**: 10/11 claims VERIFIED; 1 DRIFT — README peer-dep table is short by 4 entries (W5 CRIT-D9 only addressed CLAUDE.md; READMEpeer table never covered by H γ rec set or W5 audit).

---

## §2. CLAUDE.md verification

Walking each W5-claimed fix at HEAD:

| # | Claim (W5 §) | Probe | Result | Verdict |
|---|---|---|---|---|
| CM1 | UI count "37 shadcn-vue base component packages" (line 18) | `ls -d src/components/ui/*/ \| wc -l` | `37` | **VERIFIED** |
| CM2 | Custom count "37 custom package dirs" (line 57) | `ls -d src/components/custom/*/ \| wc -l` | `37` | **VERIFIED** |
| CM3 | `multi-select`, `tags-input` retired from ui/ tree | `grep -nE 'multi-select\|tags-input' CLAUDE.md` | 0 hits | **VERIFIED** |
| CM4 | `glass-panel`, `metaballs`, `paper-backdrop`, `status-dot` retired from custom/ tree | `grep -nE 'glass-panel\|metaballs\|paper-backdrop\|status-dot' CLAUDE.md` | 0 hits | **VERIFIED** |
| CM5 | `<HoverPopover>` added to custom/ tree (line 72) | `grep -n 'hover-popover/' CLAUDE.md` | line 72 — alphabetical between `glyph-face/` and `icon-stamp/` | **VERIFIED** |
| CM6 | tokens.css §0–§14 (line 115) | `grep -E '§[0-9]' src/styles/tokens.css` | shows §0…§14 (15 sections incl. §6b viz basis) | **VERIFIED** |
| CM7 | `.glass-pill` removed from glass.css line (line 118) | `grep -n 'glass-pill' CLAUDE.md` | 0 hits | **VERIFIED** |
| CM8 | `.dock-icon-button` (not `-btn`) in dock.css line (line 119) | `grep -n 'dock-icon-button\|dock-icon-btn' CLAUDE.md` | line 119 reads `.dock-icon-button`; 0 `-btn` hits | **VERIFIED** |
| CM9 | `.dock-layer-grid` phantom dropped, `.dock-separator` kept (line 119) | `grep -nE 'dock-(separator\|layer-grid)' CLAUDE.md src/styles/dock.css` | CLAUDE keeps `.dock-separator` (real, dock.css:32,262,272,275,875), drops `.dock-layer-grid` (0 hits in dock.css) | **VERIFIED** |
| CM10 | `cards.css` line lists `.paper-texture, .cream-surface` (line 121) | `grep -n 'cards.css' CLAUDE.md` | line 121 reads `.paper-texture, .cream-surface`; phantoms gone | **VERIFIED** |
| CM11 | Styles tree adds 8 missing css files (lines 113-132) | `ls src/styles/*.css \| wc -l` | 19 css files; CLAUDE tree enumerates all 19 (paper, math, instrument-chassis, glyph-face, dock-group, disco-glyph, hover-popover, prism-theme present) | **VERIFIED** |
| CM12 | Composables tree (lines 97-112) | `ls src/composables/` plus `useResizeObserver.ts` | matches: blob, glass, motion, pagination, sidebar, sortable, utils, virtual + 6 top-level .ts (useGlobalDark, useInterval, useKeyboardShortcuts, useResizeObserver, useTimer, useTouchGate) + index.ts | **VERIFIED** |
| CM13 | "13 top-level public export groups" (line 112) | `wc -l src/composables/index.ts` | 13 export lines (incl. infinite-scroll re-export from custom/) | **VERIFIED** |
| CM14 | Runtime tokens enumerated (line 149) | `grep -nE '^export ' src/tokens.ts` | exports: `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER` (5); CLAUDE matches verbatim | **VERIFIED** |
| CM15 | Peer-dep table 11 entries (lines 156-167) | `grep -E 'peerDependencies' -A 13 package.json` | 11 peers in package.json (`vue`, `reka-ui`, `@vueuse/core`, `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-vue-next`, `vaul-vue`, `embla-carousel-vue`, `@mkbabb/keyframes.js`); CLAUDE table lists all 11 | **VERIFIED** |
| CM16 | "Dev-only" miscategorization line dropped | `grep -n 'Dev-only' CLAUDE.md` | 0 hits | **VERIFIED** |
| CM17 | `## Design Axes` section exists with 3 axes (lines 205-229) | section headers `### Glass tier` (line 209), `### Design language` (line 215), `### Instrument-cluster` (line 221) | 3 axes named | **VERIFIED** |

**CLAUDE verdict**: 17/17 claims VERIFIED. CLAUDE.md is the cleanest doc surface post-W5.

---

## §3. DESIGN.md verification

Walking each W3.α-claimed addition + W5-deferred CRIT-D6 / rec 12 / rec 13:

| # | Claim | Probe | Result | Verdict |
|---|---|---|---|---|
| DM1 | `## Substrate Hierarchy` section exists | `grep -n '^## Substrate Hierarchy' DESIGN.md` | line 19 | **VERIFIED** |
| DM2 | Substrate Hierarchy cites canonical primitives per tier | lines 23-48: Paper (`<Card variant="paper">` canonical + `.paper-{1..4}`), Cream (`<CreamSurface>` canonical + `.cream-surface`), Glass (`.glass-{tier}` canonical + `<Card variant=…>`) | each tier has explicit canonical + alternate roles | **VERIFIED** |
| DM3 | `## Story Fidelity Policy` section exists | `grep -n '^## Story Fidelity Policy' DESIGN.md` | line 52 | **VERIFIED** |
| DM4 | Story Fidelity bifurcation documented (bold-maximalist + specimen-quiet) | lines 56-68 split into `### Bold-maximalist` + `### Specimen-quiet` + binary-by-category enforcement | binary-by-category clearly stated | **VERIFIED** |
| DM5 | `## Accessibility Posture` section exists | `grep -n '^## Accessibility Posture' DESIGN.md` | line 72 | **VERIFIED** |
| DM6 | Accessibility Posture: library-tier vs consumer-tier | lines 76-92 split into `### Library-tier commitments` (PRM, contrast, transparency, keyboard, focus contract) + `### Consumer-tier (out of scope)` (WCAG AA, screen-reader copy, keyboard conflicts, session a11y) | clean split, both halves authored | **VERIFIED** |
| DM7 | UI primitives enumeration (line 908) phantoms cleaned (`scroll-area`, `scroll-pane`) per H γ CRIT-D6 / W5 rec 12 | `sed -n '908p' DESIGN.md` content | **line still reads** `… radio-group · scroll-area · scroll-pane · select …`; AND **multi-select** + **tags-input** still listed despite I.W1 retire | **DRIFTED — 4 phantoms (`scroll-area`, `scroll-pane`, `multi-select`, `tags-input`) survive at line 908** |
| DM8 | Custom enumeration (line 912) phantoms cleaned (`animation`, `form`) per W5 rec 13 | `sed -n '912p' DESIGN.md` | **line still reads** `animation · aurora · confirm-dialog · controls · … form · glass-carousel · glass-panel · …`; phantoms `animation`, `form`, `glass-panel`, `metaballs` still listed; **8+ missing**: `bezier-canvas`, `blob`, `cream-surface`, `display-hero`, `dock-group` (only mentioned within `dock` parens), `flourish-divider`, `icon-stamp`, `live-snippet`, `math-formula`, `math-glyph`, `math-surface`, `notification-dot`, `pipeline-flow`, `swatch` | **DRIFTED — 4 phantoms + 14 missing in custom catalog** |
| DM9 | Storybook category copy (line 1070) lists `Multi-Select`, `StatusDot` | `grep -nE 'Multi-Select\|StatusDot' DESIGN.md` | line 1070 (Primitives row): "…NumberField, Select, Combobox, **Multi-Select**, Toggle, Label, Badge, MetricBadge, **StatusDot**, Pulse, Separator"; line 1073 (Data row): "Table, DataTable, **TagsInput**, Avatar…" | **DRIFTED — 3 retired primitives surviving in storybook category copy (Multi-Select, StatusDot, TagsInput)** |
| DM10 | Accessibility Posture body references `<StatusDot aria-label>` (line 82) | `grep -n 'StatusDot' DESIGN.md` | line 82 retains `<StatusDot aria-label>` example; StatusDot retired in I.W1 | **DRIFTED — retired component example in W3-authored Accessibility Posture body** |

**DESIGN verdict**: 6/10 claims VERIFIED (the 3 W3-added sections all exist and are well-authored); 4 DRIFTS — DM7+DM8 are the W5-named deferrals (rec 12 / rec 13) still unresolved at HEAD; DM9 + DM10 are *new* drifts introduced by I.W1 retires (`MultiSelect`, `TagsInput`, `StatusDot`) that were not propagated into DESIGN.md storybook category copy or the Accessibility Posture body.

---

## §4. PROGRESS.md verification

`docs/tranches/I/PROGRESS.md` Status table (lines 53-63):

| Wave | PROGRESS.md status | Wave-spec Status: line | Verdict |
|---|---|---|---|
| W0 | `complete` | `complete (commit pending; submodule pin bumped to 67c1412)` | **VERIFIED — semantic match** |
| W1 | `complete` | `complete (commit pending)` | **VERIFIED** |
| W2 | `complete` | `complete (commit pending)` | **VERIFIED** |
| W3 | `open (ready to dispatch)` | `complete (commit pending)` (W3.md:6) | **DRIFTED — PROGRESS table still says open; W3 closed at `987fc41`** |
| W4 | `pending W3` | `complete (commit pending)` (W4.md:6) | **DRIFTED — PROGRESS table says pending; W4 closed at `864e882`** |
| W5 | `open (ready to dispatch — parallel with W3)` | `complete (commit pending)` (W5.md:6) | **DRIFTED — PROGRESS table says open; W5 closed at `73c40fa`** |
| W6 | `open (ready to dispatch — parallel with W3 + W5)` | `complete (commit pending)` (W6.md:6) | **DRIFTED — PROGRESS table says open; W6 closed at `63e29e4`** |
| W7 | `pending W4 + W5 + W6` | `pending W4 + W5 + W6.` (W7.md:6) | **VERIFIED — both correctly pending** (this audit fires inside W7) |

**Probe**: `git log --oneline | grep tranche-i` confirms W3+W4+W5+W6 commits present:
```
864e882 feat(tranche-i/w4): pre-G story aesthetic uplift (R-NEW-1) — 32 stories repaired
73c40fa docs(tranche-i/w5): doc reconciliation wave 2 — README + CLAUDE + γ residue + R-NEW-3
63e29e4 feat(tranche-i/w6): perf infrastructure + bundle-budget gate + ay-close.sh retire
987fc41 feat(tranche-i/w3): substrate hierarchy + cartoon hoist + dock keep-open + easing-accent rename + slider CVA
35773c4 feat(tranche-i/w1+w2): surface trim wave 2 + alias retire + diary scrub + runtime fixes
c3bf0a2 feat(tranche-i/w0): reconciliation audit + 6-agent close pattern
```

**PROGRESS verdict**: 4 status entries DRIFTED — W3 / W4 / W5 / W6 wave-spec Status: lines say `complete` but `PROGRESS.md` table still shows `open` / `pending`. PROGRESS.md was never updated after W3+W4+W5+W6 closes; the per-wave commits exist but the PROGRESS log stops at `## 2026-05-05 — W1 + W2 close`.

---

## §5. Wave-spec Status verification

| Wave spec | Status: line | Reality at HEAD | Verdict |
|---|---|---|---|
| `tranches/I/waves/W0.md:6` | `complete (commit pending; submodule pin bumped to 67c1412)` | commit `c3bf0a2` landed | **VERIFIED — wording is "complete" + commit-pending stale clause; commit IS pending no longer (`c3bf0a2`)** — wording stale but Status itself canonical |
| `tranches/I/waves/W1.md:6` | `complete (commit pending)` | commit `35773c4` (W1+W2 merged) | **VERIFIED — Status canonical; "commit pending" stale wording** |
| `tranches/I/waves/W2.md:6` | `complete (commit pending)` | commit `35773c4` (W1+W2 merged) | **VERIFIED — same as W1** |
| `tranches/I/waves/W3.md:6` | `complete (commit pending)` | commit `987fc41` | **VERIFIED — Status canonical; commit-pending stale** |
| `tranches/I/waves/W4.md:6` | `complete (commit pending)` | commit `864e882` (HEAD) | **VERIFIED — Status canonical; commit-pending stale** |
| `tranches/I/waves/W5.md:6` | `complete (commit pending)` | commit `73c40fa` | **VERIFIED — Status canonical; commit-pending stale** |
| `tranches/I/waves/W6.md:6` | `complete (commit pending)` | commit `63e29e4` | **VERIFIED — Status canonical; commit-pending stale** |
| `tranches/I/waves/W7.md:6` | `pending W4 + W5 + W6.` | this audit fires inside W7 | **VERIFIED** |

**Wave-spec verdict**: All 8 Status: lines say `complete` (or pending for W7). All commits exist. The trailing `(commit pending)` parenthetical wording in W0–W6 is stale — those commits HAVE landed — but the load-bearing Status word ("complete") is canonical. **0 outright DRIFTS** at the Status: line level; **6 stale parentheticals** ("commit pending" applies before commit, not after) — this is a cosmetic residue from the W7 close-ceremony precedent that wave-spec Status: lines are usually rewritten to `closed (commit ...)` at tranche close (per H invariant 10).

Cross-tranche W5-fixed Status: lines:

| Wave spec | Status: line | Verdict |
|---|---|---|
| `tranches/D/waves/W4.md:6` | `closed (2026-04-30, D-II redress; see tranches/D/PROGRESS.md:178 and tranches/D-II/PROGRESS.md)` | **VERIFIED — W5 fix landed** |
| `tranches/D/waves/W5.md:6` | `closed (2026-04-30, D-II close; see tranches/D/PROGRESS.md:207 and tranches/D-II/PROGRESS.md)` | **VERIFIED — W5 fix landed** |
| `tranches/E/waves/W0.md:6` | `complete (canonical retroactive; non-canonical complete_with_misses flag was reconciled at I.W5 …)` | **VERIFIED — W5 fix landed** |

---

## §6. Since-H additions documented

| Addition | Doc surface | Probe | Verdict |
|---|---|---|---|
| `<HoverPopover>` (Q-tranche `0cb88c2`) | CLAUDE.md custom catalog | `grep -n 'hover-popover/' CLAUDE.md` → line 72; `grep -n 'HoverPopover' CLAUDE.md` → line 225 (Design Axes instrument-cluster row) | **VERIFIED** |
| `<HoverPopover>` | DESIGN.md component spec | `grep -n 'HoverPopover' DESIGN.md` → line 933 (component spec); line 912 (catalog row, but in a phantom-polluted line) | **VERIFIED — spec landed; catalog enumeration drift unrelated** |
| `<HoverPopover>` | README.md | `grep -nE 'hover-popover\|HoverPopover' README.md` → line 105 only (`hover-popover.css` style line) | **VERIFIED — appears in styles tree; not in custom/ tree because tree is illustrative per W5 §17 (fine)** |
| `useResizeObserver` (`e62c787`) | CLAUDE.md composables tree | `grep -n 'useResizeObserver' CLAUDE.md` → line 109 (own row); line 149 (entry-point composable utilities list) | **VERIFIED** |
| `useResizeObserver` | README.md | `grep -nE 'useResizeObserver\|resize-observer' README.md` → line 14 (composables bullet "resize-observer"); line 88 (own row in composables tree) | **VERIFIED** |
| `text-mono-prose` (`4fb163d`) | README.md typography section | line 169 mono-utilities paragraph after type-scale table | **VERIFIED** |
| `text-mono-prose` | CLAUDE.md typography.css comment | line 117 reads `typography.css` comment includes `text-mono-{micro,small,caption,prose}` | **VERIFIED** |
| `text-mono-prose` | DESIGN.md type table | line 471 (`.text-mono-prose` row); line 920 (MetricBadge xl rung consumes it) | **VERIFIED — bonus DESIGN.md coverage** |

**Since-H additions verdict**: 8/8 documentation sites VERIFIED. All three additions are well-documented; W5 Phase E landed clean.

---

## §7. Drifts not addressed by W5 (named in W5 as deferred)

| Item | W5 deferral target | HEAD state | Verdict |
|---|---|---|---|
| **rec 12 / CRIT-D6** — DESIGN.md:830 (now 908) phantoms `scroll-area`, `scroll-pane` | "deferred to W3.α" | line 908 still has `scroll-area · scroll-pane`; also retains `multi-select`, `tags-input` (post-I.W1 retires) | **DRIFTED — W3.α did not address; surfaced in §3 DM7** |
| **rec 13** — DESIGN.md:834 (now 912) phantoms + 8 missing custom packages | "deferred to W3.α" | line 912 still has `animation · form · glass-panel · metaballs` phantoms; missing 14 packages (bezier-canvas, blob, cream-surface, display-hero, flourish-divider, icon-stamp, live-snippet, math-formula, math-glyph, math-surface, notification-dot, pipeline-flow, swatch — `dock-group` is mentioned within parens of `dock` row but not as an own row) | **DRIFTED — W3.α did not address; surfaced in §3 DM8** |
| **rec 16** — `docs/instructions/README.md:17` proof commands stale | "deferred to next precept-submodule update" | line 17 still reads "Current proof commands are `npm run typecheck` and `npm run build`. Add Vitest or iter-loop commands only when…" — `package.json:220-227` lists `test`, `iter-check`, `iter-build`, `iter-test`, `iter-test-watch`, `iter` | **DRIFTED — still stale; precept-submodule update did not occur in W0 Lane II per W5 §16** |

**§7 verdict**: 3/3 named-deferral items remain DRIFTED. None of them were silently absorbed; they were honestly deferred with named destinations per I invariant 1, but those destinations did not deliver during the W3 / precept-submodule passes that followed.

---

## §8. Findings

Aggregating §1 + §3 + §4 + §7 (§2 + §5 + §6 returned all-green):

### Critical (actively misleads at HEAD)

1. **DESIGN.md:908 — UI primitives catalog has 4 phantoms** (`scroll-area`, `scroll-pane`, `multi-select`, `tags-input`). The first two never existed; the latter two were retired in I.W1. Catalog enumeration violates I invariant 9 (DESIGN.md is documentation-of-source).

2. **DESIGN.md:912 — Custom composites catalog has 4 phantoms + 14 missing**. Phantoms: `animation`, `form`, `glass-panel`, `metaballs`. Missing: `bezier-canvas`, `blob`, `cream-surface`, `display-hero`, `dock-group` (own row), `flourish-divider`, `icon-stamp`, `live-snippet`, `math-formula`, `math-glyph`, `math-surface`, `notification-dot`, `pipeline-flow`, `swatch`. Same I invariant 9 violation, larger scope.

3. **DESIGN.md:1070, 1073 — Storybook category copy lists retired primitives**. `Multi-Select` + `StatusDot` (line 1070, Primitives row); `TagsInput` (line 1073, Data row). All three retired in I.W1; copy never reconciled.

4. **DESIGN.md:82 — Accessibility Posture body cites `<StatusDot aria-label>` as an example**. StatusDot retired in I.W1. The W3.α-authored section uses a stale example. Mild misleads (the *technique* is still correct; the *exhibit* is gone).

5. **PROGRESS.md status table stale by 4 entries** (lines 56-62). W3 / W4 / W5 / W6 wave-spec Status: lines all say `complete`; PROGRESS.md table still says `open` / `pending`. Per H invariant 10 + I invariant 1 (PROGRESS.md updates at every wave boundary), the table is 4 wave-closes behind reality.

### Lower severity

6. **README.md peer-dep table under-listed by 4** (lines 186-194). Same drift CLAUDE.md had at H close (W5 fixed CLAUDE; never touched README). Consumers reading README.md install only 7 of 11 required peers.

7. **`docs/instructions/README.md:17` proof commands stale** (rec 16 deferred). Lists only `typecheck` + `build`; the harness ships `test`, `iter`, `iter-test`, etc. Honestly deferred to next precept-submodule update; that update did not happen.

8. **6 wave-spec Status: lines carry stale "(commit pending)" parenthetical** (W0–W6). Per the H W6.γ canonical "closed (commit ...)" precedent, these should be rewritten at tranche close. Not a blocker — the load-bearing Status word ("complete") is canonical — but the parenthetical mis-states reality (commit landed, not pending).

---

## §9. Verdict

**FOUND-8 drift items.**

| Severity | Count |
|---|---|
| Critical (actively misleads) | 5 |
| Lower severity | 3 |
| **Total** | **8** |

**Summary**:
- README.md is **clean post-W5** for the 11 W5-named claims (1 partial: peer-dep table never in W5 scope).
- CLAUDE.md is **fully clean post-W5** — all 17 audited claims VERIFIED.
- DESIGN.md has **4 critical drifts**: 2 catalog enumerations carry phantoms + missing rows the W5 audit explicitly deferred to W3.α (which did not address them); 2 W3.α-authored body sections cite I.W1-retired components.
- PROGRESS.md status table has **4 stale entries** — never updated after W3/W4/W5/W6 closes.
- Since-H additions (`<HoverPopover>`, `useResizeObserver`, `text-mono-prose`) are **fully documented** across CLAUDE.md, README.md, and DESIGN.md.
- W5-named-deferral items rec 12 + rec 13 + rec 16 remain DRIFTED at HEAD — none silently absorbed.

The drift count (8) is contained. 3 of the 8 are stale-parenthetical / lower-severity items that don't actively mislead. The 5 critical drifts are concentrated in DESIGN.md (4) + PROGRESS.md (1) — both single-file, mechanical fixes.

I-close cannot be authored before these 8 drifts either land or are formally re-deferred with named destinations.

**Sanity probe**: `npm run typecheck` — green at HEAD `864e882` (vue-tsc --noEmit, no source changes during this audit).
