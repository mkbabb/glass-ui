# DEV-B — the BH restructure + the 5.0.0 cut story + the engine Stage-0 spec

**Lane DEV-B of RESPEC-GESTALT Pass 2 (the LAST pass).** Repo `/Users/mkbabb/Programming/glass-ui`,
branch `tranche/BG`, HEAD `306c3059`, tree clean. Every claim disk-verified 2026-07-01. This file is one of
three disjoint develop outputs; it owns the BH plan reshape, the cut-choreography single-sourcing, and the
executable engine Stage-0 preconditions. It is the fold-source for the build agent — every edit below is
anchored to an exact `file:line` and requires no further interpretation.

Binding inputs: SYNTHESIS-PASS1 §2 rulings 2/3/8/9/10, §3 F8 family, §4 protected set; GROUP-C §4
GC-FC2/FC3/FC4/FC5/FC8/FC10/FC11; lenses C4 (FOLD-1..4), C5 (FC1..7), C6 (FC1..6), D8 (FC1..6).

---

## SECTION 1 — THE BH RESTRUCTURE (~43 expanded rows → ~14 family rows)

### 1.0 Disk truth (the resync baseline — verified, not asserted)

Both prior audits violated the landed-vs-pending re-verify once each (the §3-A adjudication: C3 correct, C5
wrong on the ratchet). The Pass-2 fold re-verified against disk:

- **B1 is 3/3 LANDED.** W1-external-payload `7813a695` (`vite.library.ts:85` has `"@lucide/vue"` in
  `libraryExternal`; dead `lucide-vue-next`/`vaul-vue` survive only in the `:65` comment;
  `scripts/proof-external-payload.mjs` registered `gates.mjs:1273`). W2-value-destraddle LANDED
  (`package.json:1080` = single `"@mkbabb/value.js": "^1.0.0"`, no straddle). W3-dragmorph-snap-excise
  `ba23c086`.
- **B2.4a is LANDED** — `useCarouselWorm.ts` / `usePagerWorm.ts` / `bloomUpField.ts` present; the 3 carve
  rows are DELETED from `RATCHET_BASELINES`.
- **The ratchet is NOT drained to ∅.** `proof-no-god-module.mjs:138-172` carries **16 live baseline
  entries** (the 3 B2.4a rows are the only ones commented-DELETED): `liquid-morph.css:850`,
  `GlassDock.vue:711`, `createCanvasLifecycle.ts:695`, `useWebGPUCanvas.ts:606`, `useDockFission.ts:604`,
  `property-regs.css:566`, `fission-bridge.css:552`, `useDockContextSilhouette.ts:551`,
  `useGlassBackdropLuminance.ts:542`, `useBlobSatellites.ts:533`, `metaball.wgsl.ts:529`,
  `flow-field.glsl.ts:517`, `SegmentedTabs.vue:512`, `metaball.frag.ts:510`, `useGooDotMatrix.ts:508`,
  `api/index.ts:505`. Of the 16: **3 are shader-exempt** (`metaball.wgsl.ts`, `flow-field.glsl.ts`,
  `metaball.frag.ts` — the `src/**/*.{wgsl,glsl,frag,vert}.ts` exemption); **13 are carve-able** and drain
  across BG WS2/WS4/WS5/WS8 + `api/` at B2.2. `RATCHET_BASELINES == {}` is the **BG.W-CUT close-state
  precondition** (`proof-no-god-module.mjs:20` comment), NOT B2.4a's close-state. The B2.4a row's parenthetical
  "drained to ∅" is the false claim to correct.
- **Worktree pollution is real (GA-12):** `git worktree list` = **100**, `.claude/worktrees/` = **83G / 101
  dirs / ~99 stale**. Spec'd in Section 3.4.

### 1.1 The collapsed band table (~14 rows)

Legend: **[C]** concurrent-safe now · **[WSn]** after `allDone(WSn)` · **[WS12]** after full BG close ·
**[WS12-LAST]** the absolute-last act. "Consolidates" names the expanded rows this family row absorbs.
Every family row authors its OWN device-free gate CLAUSE (GC-FC1(b), no gate-only rows).

| # | Family wave | Class | Consolidates (expanded rows) | Gate clause |
|---|---|---|---|---|
| 1 | **B0 · scratch-sweep** | [C] | W0-scratch-sweep | `git status` scratch-clean + `git ls-files\|rg 'test-results/\|\.browserslistrc' = 0` |
| 2 | **B1 · payload+dep-floor (LANDED)** | [C] | W1 + W2 + W3 — all landed; verify-only residual | `proof:external-payload` GREEN · `proof:peer-conformance` non-vacuous over `^1.0.0` (the floor-LIFT is row 7's) |
| 3 | **B2.0 · alias-codemod** | [C] | W-alias-codemod | `test` + `typecheck` + demo route-walk GREEN (pure depth-decouple) |
| 4 | **B2.1-mech · regen-mechanism** | [C] | W-regen-mechanism | real→exit0 EXACT_REPRODUCTION · `--inject-unclassified`→exit1 · `--break-fidelity`→exit1 · **+ net-indirection acceptance measure** (C5-FC6, §1.4) |
| 5 | **B2.4a · bh-carves (LANDED)** | [C] | W-bh-carves | `proof:no-god-module` GREEN w/ shader exemption; **ratchet claim corrected** (§1.3) |
| 6 | **B2 · leaf-verify** | [WS2·WS4·WS5] | B2.4b + B2.4c + B2.5 (the verify-only trio) | ONE row, 3 preconds; "re-point BH reader-gate expectations iff BG's landed leaf diverged" (C5-FC4) |
| 7 | **B2 · export-reshape** | [WS12] | B2.1-swap + B2.2 + B2.3 + B2.6 | `verify-export-types` GREEN · 203-row map arm GREEN · `proof:subpath-enumeration` re-pinned · `diff -r dist/styles_before _after` EMPTY · the FINAL single-writer peer-floor block (§1.5) |
| 8 | **B3 · demo-restructure** | [WS4] | δ1 + δ2 + δ3/δ4 + δ5 + δ-smoke — **δ6 glob DROPPED** | runtime route-walk (non-null per manifest row) + stories.smoke GREEN; **adopts B8-F8 depth-nest** (§1.6) |
| 9 | **B4 · canon-redistribute** | [C skeleton+archive / WS12 content] | B4a + B4b-skeleton + B4b-content + B4d-evidence-prune | `auditCanonHomes("content")==[]` + `proof:consumer-evidence-live` GREEN + `structure.md`/`dependencies.md` **generated-from-disk** (§1.7) |
| 10 | **B4c · precept-extract** | [C files / WS2 extract / WS12 gate-repoints] | B4c-precept-extract | 10 precept-readers via `design-docs.mjs`; **records the sharing-inversion judgment + confirm-no-sibling precondition on the ask** (C6-FC4) |
| 11 | **B4e · CUT-AUTHORING** | [WS12] | B4e-doc-slim — **PROMOTED to the cut-authoring wave** | MIGRATION `## 5.0.0` + 203-row TABLE + `--ring` row + non-`v2.0` title + blockquote collapse + CHANGELOG `## 5.0.0` + zero `## Unreleased` (§1.8) |
| 12 | **B5 · gate-consolidate** | [WS3 deps / WS12] | B5a + B5b + B5c + **B5e (ADDED)** | `--list` byte-identical (B5b) THEN `--list` count DROPS (B5e); `proof:gate-manifest-sound` + `proof:claude-deletable` + `proof:gen-ci-fresh` GREEN (§1.9) |
| 13 | **B4f · claude-delete** | [WS12-LAST] | B4f-claude-delete | `proof:claude-deletable` GREEN (file gone + zero live readers over all 6 alias forms) |
| 14 | **B6+B7 · prompts + cross-repo asks** | [C prompts / WS12 asks] | B6 folded INTO B7 (both by-name asks, C6-FC5) | `proof:crossrepo-asks:bh` GREEN (`>=4` covered-floor); prompts dogfooded by B2/B3/B5 dispatches (§1.10) |

**Net: 43 expanded → 14 family rows.** B5d stays a recorded deferral CLAUSE on row 12 (not a row). The `[C]`
concurrent-now set is unchanged in content; the collapse is in row granularity, not scheduling.

### 1.2 B1 renamed LANDED (row 2 — C5-FC5)

Retitle the band header `PLAN.md:60` from "Legacy excision + payload fix" to **"Payload + dep-floor fixes
(LANDED)"**. The "legacy excision" title is a misnomer — a `TODO`/`FIXME` grep (=0, verified) is not a
mechanism census, and the band excises no legacy. Two honesty edits:
- Mark `PLAN.md:61` (W1) **LANDED `7813a695`, `proof:external-payload` GREEN**.
- Keep `PLAN.md:62-63` (W2/W3) as landed-verify residual; the floor-LIFT to `^1.1.1` is explicitly row 7's
  (B2.1-swap single-writer), NOT this band's.
- State the deferred deep sweep plainly: legacy-MECHANISM excision (dead exports, orphan tokens, dual paths)
  is DEFERRED to the B5d detector-kit past BH; the latent-dead-export surface is the B2 reshape (203 `/api`
  symbols re-homed), which row 7 gates on. Do not claim a census the band does not run.

### 1.3 The §71 ratchet correction (PLAN.md:71 — GC-FC8(d))

`PLAN.md:71` reads `RATCHET_BASELINES` **drained to ∅**. FALSE on disk (16 live baselines, §1.0). Replace the
parenthetical with:

> the 3 BH carve ROWS drained (CarouselContent/PagerDots/useBloomUp deleted from `RATCHET_BASELINES`); **16
> BG-owned baselines REMAIN** (`proof-no-god-module.mjs:138-172`) — 13 carve-able across BG WS2/WS4/WS5/WS8 +
> `api/index.ts` at B2.2, plus 3 shader-exempt (`metaball.wgsl`/`flow-field.glsl`/`metaball.frag`).
> `RATCHET_BASELINES == {}` is the **BG.W-CUT** close-state precondition, NOT this wave's.

This is the same finding GC-FC8(c) surfaces as the cut-gate: the build-map must carry an explicit
"ratchet-drain dependency chain" enumerating each of the 16 → its owning carve wave → its band, so
`BG.W-CUT`'s `RATCHET_BASELINES == {}` precondition is a VISIBLE cut gate (that build-map edit is DEV-A/A-gate
territory; row 12's B5e references it).

### 1.4 B2.1-mech net-indirection measure (row 4 — C5-FC6)

The regen wave's headline is "3 export dialects → 1 source" (79 `src/subpaths/` mirrors + 854L `src/api/` +
7 flat barrels → ONE generated entry-set). The gate must PROVE the de-indirection is real, not assert it. Add
to the B2.1-mech gate clause an acceptance measure: **total export-wiring LOC + indirection-depth before vs
after** (the 79 files were dumb but greppable; the replacement is a `regen-exports.mjs` + 3 policy maps + a
shared map module + a fail-closed `proof:subpath-classify` — a mechanism that needs a fail-closed gate to be
trustworthy is itself machinery). The gate reds if net export-wiring LOC does not drop. "79 files deleted +
fidelity 96/96" is not the measure.

### 1.5 The FINAL single-writer peer-floor block (row 7)

B2.1-swap is the LITERAL sole `package.json` writer between WS9's pf-drop and `BG.W-CUT` (verified
`PLAN.md:68`, `bh-interleave-map.md:40`). It carries BOTH peer bumps, unchanged from the plan:
- `@mkbabb/keyframes.js` `^5.0.0 → ^5.1.0` (discharges the B1-W3 `ba23c086` pairing-debt: `snap:` ships
  against kf-5.1.0's `DragOptions.snap` while the floor stayed `^5.0.0`).
- `@mkbabb/value.js` `^1.0.0 → ^1.1.1` (the `wcagContrastRatio`-bearing npm-latest; `^1.2.0` ⊆ `^1.1.1`).
  **The floor is `^1.1.1`, NEVER `^1.2.0`** — `^1.2.0` excludes npm-latest 1.1.1 and reds
  `proof:peer-conformance`. This is the number the cut docs must single-source TO (Section 2 fixes the two
  drift sites). The gate-LITERAL pin (`proof-peer-conformance.mjs:41/46` `1.2.0→1.1.1`) is BG-owned
  (`BG.W-GATE-FIELD-AURORA`, cursor 12.5); the floor-EDIT is BH's — the T4/T2 seam, do NOT re-litigate.

The WS7→WS12 born-RED window on `proof:peer-conformance` (the kf clause lands at WS7 on the still-`^5.0.0`
tree; the bump lands at WS12) is EXPECTED / BY DESIGN — the joint cut gates on BOTH landing.

### 1.6 B3 consumes the REDUCED demo set; δ6 glob dropped (row 8 — C5-FC3/GC-FC11a)

Two amendments to the demo-restructure family:
- **Drop the δ6 glob-to-`index.vue` migration.** Disk: 120 flat `<cat>/<id>.vue` stories, ZERO `index.vue`
  dir-form. A mixed glob (`./*/*.vue` + `./*/*/index.vue`) to migrate ~40 stories-with-parts while leaving
  ~80 flat is over-contrivance. **Adopt Group B B8-F8's depth-nest instead** (cross-reference it explicitly
  in the wave so the lenses agree): `git mv demo/stories/aurora/ → demo/stories/substrates/aurora/` (nest one
  level deeper, matching `dock/examples/`'s 3-segment shape) removes the leak from the `./*/*.vue` glob "for
  free" — all 120 stories stay flat, NO glob change, sub-component dirs colocate under a sibling `<cat>/<id>/`
  reached by relative import.
- **Consume the REDUCED demo set.** B3 runs AFTER BG-WS4's demo cluster (`BG.W-DEMO-CHASSIS-CONSOLIDATE`,
  `BG.W-MANIFEST-COLOCATE`, and the B8-derived `BG.W-DEMO-DUP-MERGE` −4-page merge — Timeline×3/Scroll×3).
  Per ruling #5 the manifest direction is DECIDED at develop: **consolidate-and-STOP** —
  `BG.W-MANIFEST-COLOCATE` keeps `manifest.ts` as the single source and folds the 4 string-keyed maps onto the
  `s()` rows; B3 does NOT re-carve `manifest.ts` out into `rows/<category>`. The opposite-direction split
  (`PLAN.md:82` δ5/δ6) is DROPPED. One manifest decision by one owner; no consolidate-then-re-fragment.
- **One owner.** The demo restructure is owned ONCE (the BG-WS4 demo cluster); the BH-B3 δ2-δ5 `demo/` writes
  fold into it or verify-against it (dissolve `demo/composables/`, chassis-colocate, `layout/`→`shell/`). BG
  owns `demo/` per `PLAN.md:5`.

### 1.7 B4 canon-redistribute — generated docs dissolve the drift-check gates (row 9 — GC-FC4/C6-FC3)

Fold B4a + B4b-skeleton + B4b-content + B4d-evidence-prune into ONE canon-redistribute family. The load-bearing
amendment (also referenced by B5e in row 12): **generate `structure.md` + `dependencies.md` from disk**, so
the two real CLAUDE-readers dissolve rather than re-home:
- `structure.md` generated from the colocated-barrel glob (the same glob `regen-exports` uses) →
  `proof:claude-structure-sync`'s dir-diff becomes TAUTOLOGICAL (regen-from-disk matches disk by
  construction) → collapse it to a `committed == regen` freshness assert (the `proof:gen-ci-fresh` pattern);
  finish the png-arm split to `proof:visual-png-tracked`.
- `dependencies.md` authored **AS A MARKDOWN TABLE** (`| \`pkg\` ^x | role |` — the binding acceptance shape;
  `citedDeps` at `canon-doc.mjs:120` parses ONLY a table, so a prose-only doc GREENs `auditCanonHomes` while
  `doc-consistency`'s dep-rot arm parses 0 deps and stays permanently vacuous). Point `doc-consistency`'s
  dep-rot arm at the generated table. No `readFileSync(CLAUDE_MD)` survives.
- Per-component READMEs (~28, 22 exist) are DRY colocated docs — keep them, but do NOT GATE their prose
  (row 12 B5e drops the doc-presence clauses).

### 1.8 B4e PROMOTED to the cut-AUTHORING wave (row 11 — D8-FC1/FC2, C4)

B4e is currently specced "slim + reshape" (`PLAN.md:92`, cursor 18.8), but the cut's PRIMARY consumer surface
does not exist — so B4e is the AUTHORING wave. Disk: `MIGRATION.md:1` = `# MIGRATION—v0.9.x → v1.0 → v2.0`
with ZERO 5.0.0 content (grep `5.0.0`/`drop.*api`/`203`/`focus-ring-color` = nothing); the 4.x migrations rode
as 16 appended blockquotes. `CHANGELOG.md:212` carries a stale `## Unreleased` (Tranche AX.W07) mis-ordered
between `## 3.3.0` and `## 3.2.0`. Retitle the band and its deliverables:

**Deliverable set (from a blank slate — "slim" undersells it):**
1. Retitle `MIGRATION.md:1` off `v2.0` → `# MIGRATION` (version-agnostic).
2. Author the `## 5.0.0` section as a first-class heading, leading with:
   - the **203-row `/api` re-home as a real markdown TABLE** (not prose — mirror the `dependencies.md`
     table-form lesson so a downstream parser consumes it; the input contract for `public-surface.spec`'s map
     arm);
   - the **`--ring → --focus-ring-color` rename ROW** with the pinned landing COMMIT + fallback-first guidance
     (`var(--focus-ring-color, var(--ring))` until the rename lands);
   - a one-line key-preserving note for the flat-barrel relocations (B2.3) + `src/subpaths/` delete (B2.1).
3. Collapse the 16 accreted 4.x blockquotes into proper `## 4.x.0` sections (a clean break, not another
   append).
4. CHANGELOG: author the `## 5.0.0` section (export reshape · `--ring` rename · BG visual-convergence
   one-paragraph summary · the lucide payload fix `7813a695` · the value de-straddle) AND **delete the stale
   `## Unreleased` at `CHANGELOG.md:212`** in the same pass (an "Unreleased" section is a lie the moment a
   version ships).
5. **Acceptance witness (device-free arm):** assert MIGRATION.md has a `## 5.0.0` heading, a 203-row table, a
   `--focus-ring-color` row, and a title that no longer says `v2.0`; assert CHANGELOG has exactly one
   `## 5.0.0` and zero `## Unreleased`. A "slim that appended one paragraph" must FAIL this witness. (Fable
   arm: none — mechanical/prose doc-authoring, no DesignSync surface.)

Dual-doc coordination unchanged: `proof:on-glass-fg`+`proof:surface-axis` read CLAUDE.md AND MIGRATION.md —
move the two parse-targets TOGETHER with B5c (row 12).

### 1.9 B5 gate-consolidate + B5e-gate-prune ADDED (row 12 — GC-FC4, C6-FC1/FC2/FC3)

The band positioned to answer the "360 ceremony gates" complaint. As-authored, B5 restructures the runner and
prunes ZERO (B5b byte-identical extract, B5c re-homes, B5d deferred past BH). Fold B5a/B5b/B5c into the family
and **ADD B5e-gate-prune [WS12, after B5b]** — the highest-value single amendment for the user's headline
complaint. Exact scope:

**B5a clause:** record deps/shadcn-vue verdict in `docs/canon`; split `vite.style-assets.ts` (566L) → 3
sub-plugins (`style-fold`/`utility-emit`/`critical-split`).

**B5b clause:** extract `gates.mjs` table+prose → `scripts/gates.manifest.mjs`; runner → ~300L; `--list`
byte-identical pre/post (the PREREQUISITE for a data-driven prune).

**B5c clause (amended — DROP, do not re-home, the doc-presence clauses):** re-home the 16 CLAUDE-readers via
`canon-doc.mjs` + 10 precept-readers via `design-docs.mjs`. But of the 16, **~14 are doc-PRESENCE ceremony**
(they regex-test that a prose sentence EXISTS — nothing functional). **DELETE the `claudeMd` clause from all
14** (keep every functional clause): `surface-axis:438`, `spa-view:228`, `easing:270`, `dropdown:255`,
`phase-palette:199`, `dock-unify:534`, `split-chars:289`, `handmark:249`, `on-glass-fg:399`,
`readme-meta-clean:221`, `dock-rail-realize:258`, `close-battery-parity:149`, `doc-override-idiom:113`,
`accent-tone:440`. **Dissolve the 2 real readers** (per §1.7): `claude-structure-sync:74` → `committed==regen`
freshness over generated `structure.md`; `doc-consistency:197` → dep-rot over generated `dependencies.md`
table. Result: `canon-doc.mjs`'s cross-cutting map + `auditCanonHomes()` + the >200-char body floor shrink to
the genuinely-load-bearing set. **The accent-tone dual-arm** stays the trickiest — DROP its CLAUDE arm AND
re-point its `src/subpaths/selectable-chip.ts` arm onto `src/components/custom/selectable-chip/index.ts` (row
7 deletes `src/subpaths/`, so both arms ENOENT-break unless re-pointed together). Re-home the RELEASE crasher
(`doc-consistency:197`) FIRST (it THROWS ENOENT mid-`--run full`, aborting `git tag`). Re-emit `ci.yml`
(`gates:emit-ci`) + `proof:gen-ci-fresh` GREEN. `proof:claude-deletable` is B5c-MINTED (born-RED-at-HEAD →
GREEN), making the B5c→B4f edge HARD.

**B5e-gate-prune clause (ADDED — the net-negative instrument):**
1. **Family-π collapse.** Collapse the per-wave π-presence gates into `proof:{glass,motion,dock,feedback}-band`
   category gates — extend the `proof:ba-gestalt` roster model (ONE holistic per-surface acceptance gate that
   already replaced N per-mechanism π clauses). The ~150 local-π-adjacent + self-test-only gates collapse
   toward ~1/band.
2. **The 14 doc-presence clause deletes** (named above in B5c) land as gate-count-REDUCING edits here.
3. **The 2 real readers dissolved to regen-freshness** (structure-sync → `committed==regen`; doc-consistency
   → dep-rot over the generated table) — no `readFileSync(CLAUDE_MD)` survives, and neither check is
   tautological (a stale regen reds honestly).
4. **Retire self-test-bite-only gates** whose mechanism is otherwise π/source-covered.
- **Target: 360 → ~250 with ZERO behavioral assertion lost.** Gate for B5e: `--list` count DROPS (the inverse
  of B5b's byte-identical); a manifest diff enumerates every pruned gate + its subsuming category gate;
  `--run full` still GREEN.

**B5d clause:** the 164-script detector-kit refactor stays DEFERRED past BH (recorded, not a row) — but B5e's
prune is NOT the detector-kit; it is the ceremony-gate cull B5d never gated.

### 1.10 B6 folds into B7; the prompts get dogfooded (row 14 — C6-FC5)

B6's 3 prompts (`LEGACY-EXCISION`/`RESTRUCTURE-BACKEND`/`RESTRUCTURE-FRONTEND`) are already authored
(tranche-dev). As a WAVE, B6 is near-empty (a trivial existence gate over done work) and its live work is a
by-name promotion ask to `mkbabb/precepts` — the same KIND as every B7 row. Fold:
- Every B2/B3/B5a/B5b restructure-wave dispatch cites its matching `RESTRUCTURE-{BACKEND,FRONTEND}` /
  `LEGACY-EXCISION` prompt as the *Scope + Non-negotiables* payload (the tranche dogfoods its own tooling —
  the dogfood gap C6-F5 named).
- The `mkbabb/precepts` promotion-ask folds into the B7 roster.
- B7's roster is **4 by-name asks** (§2.3), not 2 — `bh-interleave-map.md:83` currently says "the 2 by-name
  asks"; resync it to 4 (the `asks-and-consumes.md` roster is authoritative). Label BH's OWN break as the
  `./api` drop = 2 sibling asks (muster, speedtest); rows 3-4 (atlas `--ring`, bbnf `--glass-blur-dock`) are
  token asks the relay carries for completeness (C6-FC6).

### 1.11 PLAN.md disk-resync list (exact line edits)

The cleanup tranche's plan must itself pass the discipline bar it enforces (GC-FC10). Exact edits:

| Line | Current | Edit |
|---|---|---|
| `PLAN.md:17` (§1-#4) | present-tense "@lucide/vue **is** bundled … every consumer double-loads" | replace with "**LANDED `7813a695`**, `proof:external-payload` GREEN; the value straddle de-straddled at B1-W2 (`package.json:1080` = `^1.0.0`)" |
| `PLAN.md:57` (B0) | "the 99 root scratch images (28MB)" | refresh to the disk count of loose ROOT `.png`/`.webp` (verify at execution; do NOT sweep the `docs/` visual-capture archives — the B0 gate is correctly root-scoped) |
| `PLAN.md:60` (B1 header) | "Legacy excision + payload fix · 2-3 waves" | "**Payload + dep-floor fixes (LANDED)** · verify-only residual" |
| `PLAN.md:61` (W1) | listed as a wave to author | mark **LANDED `7813a695`** |
| `PLAN.md:71` (B2.4a) | "`RATCHET_BASELINES` drained to ∅" | the §1.3 correction (3 BH rows drained; 16 BG baselines remain; `== {}` is BG.W-CUT's state) |
| `PLAN.md:12-17` §1 | five convergent facts, no develop-rule | ADD the develop-rule: **"every BH band re-verifies landed-vs-pending against disk before fold"** (the coherence audit's miss of B1-W1 AND this audit's own ratchet mis-read are the two proofs); ADD the F7 fact: **"BH's export-reshape payoff is the tail of BG — all swap waves are `[WS12]`, the 203-row map provisional until the post-WS12 re-derive"** |
| `PLAN.md:67` (B2.1-mech) | gate = 3 RAN cases | ADD the net-indirection acceptance measure (§1.4) |
| `PLAN.md:106` / `PLAN.md:29` | "exactly 4 by-name asks" already correct — keep | no change (the roster is right; the CUT DOC is the drift site, Section 2) |

Cross-doc resync (same finding, other files): `bh-interleave-map.md:28` (W2 row) stale `→^1.2.0` → `→^1.1.1`
(single-sourced to B2.1-swap); `bh-interleave-map.md:83` (B7 row) "the 2 by-name asks" → "the 4 by-name asks"
(the 2 `/api` + atlas `--ring` + bbnf `--glass-blur-dock`).

---

## SECTION 2 — THE CUT STORY, SINGLE-SOURCED

The cut choreography is architecturally sound (the inv-11 spine, the `release/4.3.0` divergence reconcile —
verified `28cf1cd1` NOT an ancestor of BG — the `--run full` siblings-absent pre-tag battery, the 5-step
consume-and-delete cadence). But it is spread across 4 homes that drifted into TWO number-contradictions the
release gates trip on (D8, C4). The fix is single-sourcing, not mechanism change. **`publish-and-cut.md` is
designated THE canonical home.**

### 2.1 The canonical-home header (D8-FC5)

Add to `publish-and-cut.md` immediately after `:5` (the "Authority read" line):

> **THIS is THE canonical 5.0.0 cut choreography.** BH `PLAN.md §2/§7`, the cursor cut-rows (`18.1` peer/
> version-writer · `18.8` MIGRATION/CHANGELOG author · `19.1` tag-fire), `bh-interleave-map.md §4-§5`,
> `consumer-constellation.md`, and `EXECUTION-PLAN §D` all POINT here for the cut NUMBERS — the value.js
> floor, the ask count, the lineage order. They state obligations; THIS doc owns the values. No downstream
> mention restates a number owned here.

### 2.2 The value.js floor (publish-and-cut.md:54 + :103 — D8-FC3, F1)

`:54` (§2.1) is doubly wrong on disk: the `^0.13.0 || ^1.0.0` straddle is GONE (`package.json:1080` = single
`^1.0.0`), and the target `^1.2.0` is the WRONG number that REDS `proof:peer-conformance` (`^1.2.0` excludes
npm-latest 1.1.1). Rewrite `:54`:

> De-straddle already landed at B1-W2 (`package.json` = single `^1.0.0`). The 5.0.0 floor-LIFT `^1.0.0 →
> **`^1.1.1`** is **B2.1-swap's** (cursor `18.1`, the LITERAL sole `package.json` writer between WS9's pf-drop
> and `BG.W-CUT`) — do NOT restate the range here. `^1.1.1` is the `wcagContrastRatio`-bearing npm-latest;
> `^1.2.0` ⊆ `^1.1.1` but as a PEER floor `^1.2.0` excludes npm-latest 1.1.1 and reds
> `proof:peer-conformance`. `proof:peer-conformance`/`proof:constellation-spine` must be non-vacuously GREEN.

`:103` (the §4 interims note) — "the pinned keyframes 5.1.0 / **value.js 1.2.0**" → "**value.js 1.1.1**".

### 2.3 The ask count: 3 → 4 everywhere (publish-and-cut.md:85 / :95-101 table / :141 ledger — D8-FC4, C4-F4)

`asks-and-consumes.md:11` is authoritative: **exactly 4 by-name asks**, with a `proof:crossrepo-asks:bh`
`>=4` covered-floor that fails LOUD below it. `publish-and-cut §4` says 3 and asserts bbnf owes nothing — a
cut operator issues 3 asks and reds the `>=4` floor. Fix all three sites:

- `:85` — "exactly **3** by-name asks (NOT the whole constellation): muster, speedtest, atlas. Every other
  live consumer (bbnf-buddy, slides-K) keeps every key — no ask owed." → "exactly **4** by-name asks: muster,
  speedtest, atlas, **and bbnf-buddy** (`--glass-blur-dock` token-retire, `preset.css:230` live — a no-op
  retune for bbnf, but a gate-witnessed row on the `>=4` covered-floor). **slides-K keeps every key — no ask
  owed.**"
- `:95-101` (the ask table) — ADD **row 4**:

  | 4 | **bbnf-buddy** | `src/styles/preset.css:230` (live `--glass-blur-dock` override) | `--glass-blur-dock` (token-retire) | (token retire — resolves to composed default) | `bbnf-glass-blur-dock-retune-no-op` — drop the dead override; **witness = the MIGRATION.md `--glass-blur-dock` retire ROW + `proof:crossrepo-asks:bh` `>=4` floor** (NOT `proof:retired-token-consumers` — see §2.5) |

- `:141` (§6 cut ledger, v5.0.0 row) — "§4 cadence — **3** by-name asks (muster/speedtest/atlas)" →
  "**4** by-name asks (muster/speedtest/atlas/bbnf-buddy)".
- Cross-doc: `EXECUTION-PLAN.md:187` ("breaks exactly **3** by-name consumer asks (muster·speedtest·atlas)")
  → **4** (muster·speedtest·atlas·bbnf-buddy).

### 2.4 The 4-consumer joint-4.0.0+5.0.0-migration honesty (publish-and-cut §4 — C4-F4)

`publish-and-cut §4`'s "keeps every key / no ask owed" is key-preserving-TRUE but materially understates the
lift the constellation scout (`consumer-constellation.md:38-42,155-166`) found. Add a paragraph after `:85`:

> **Key-preserving ≠ zero-lift (the fourth latent vector).** muster (3.1.0), slides-K (3.2.0), and bbnf-buddy
> (3.9.0) install BELOW 4.0.0, and slides is exact-pinned 3.13.0 — so their `^5` bump crosses the ENTIRE 4.x
> BA reshape FIRST, with a live witness: `slides-K DeckGate.vue:41`'s `DialogContent variant="opaque"`
> silently no-ops post-4.0.0 (`BA.W-SURFACE-AXIS` retired `variant`→`surface`). For these four the 5.0.0
> update is a **4.0.0 + 5.0.0 JOINT migration**, not a narrow re-point. The foreign-tree fence means
> glass-ui's own cut is NOT blocked — but the cadence doc must state the real reach so it stops disagreeing
> with the constellation scout.

### 2.5 The bbnf ask re-base off the killed sibling-probe gate (ruling #3 + GC-FC3 cross-ref)

The bbnf row-4's born-RED witness WAS `proof:retired-token-consumers` (`asks-and-consumes.md:18`,
`PLAN.md:106`) — a BG-owned gate minted by `BG.W-CLOSEFIX-9SITE`. But ruling #3 + GC-FC3 KILL that gate (it
probes a SIBLING repo to gate-block glass-ui retiring its own internal token — the foreign-tree fence inv-26
run backwards into a coupling). So the bbnf ask must **re-base its witness onto the MIGRATION.md
`--glass-blur-dock` retire ROW + the `proof:crossrepo-asks:bh` `>=4` covered-floor** (the same self-contained,
in-repo witnesses every other ask uses). Concretely:
- `asks-and-consumes.md:18` (row 4 witness column): `proof:retired-token-consumers` → **"MIGRATION.md
  `--glass-blur-dock` retire row + `proof:crossrepo-asks:bh` `>=4`"**.
- `PLAN.md:106` (B7 gate): drop "`proof:retired-token-consumers` (BG-owned, `BG.W-CLOSEFIX-9SITE`-minted) as
  the born-RED witness for the bbnf row-4" → the born-RED witness is the MIGRATION row + the `>=4` floor.
- `bh-interleave-map.md:83` B7 row: same re-base.
- The `--glass-blur-dock` token RETIREMENT itself is recorded in MIGRATION.md (the sibling resolves the built
  `dist/` on its own bump per contract-v2 — no glass-ui gate probes the sibling). This is the CLOSEFIX-9SITE
  strip (GC-FC3): keep the two `<500` carves + the `--glass-blur-dock` delete; PRUNE the planned
  `proof:retired-token-consumers` mint; wave shrinks from 18-file/15-gate to ~5 source files + a routine
  ci-emit. (The CLOSEFIX-9SITE wave-body strip is DEV-A/A-gate territory; DEV-B owns the cut-side re-base of
  the bbnf ask that depended on the killed gate.)

### 2.6 release.sh header fix (release.sh:12-19 — D8-FC6, F5)

The header docstring (`:12-19`) documents a 4-gate matrix ("a) typecheck b) build c) verify-export-types d)
profile:budget --enforce") the body no longer runs — `:84` runs only `node scripts/gates.mjs --run full`. All
four named gates ARE covered by the union (`verify-export-types` is gate row `gates.mjs:72`), so the behavior
is correct; the header lies. Rewrite `:12-19`:

> #   4. Runs `node scripts/gates.mjs --run full` — the DEDUPED union of the `local`, `ci`, and `release` tag
> #      sets (the BB.W-CLOSE-BATTERY union-not-subset discipline; `verify-export-types`/`profile:budget`/
> #      typecheck/build all covered as union rows — a subset run is the BA close-lie this kills).
> #   5. Performs a post-build smoke check on `dist/index.d.ts`.
> #   6. Tags the release with an annotated tag.

Keep the release-machine otherwise UNTOUCHED — the `--run full` union at the cut is protected (SYNTHESIS §4;
D8 §3: keep the union, do NOT prune the release gate set — the over-contrivance lives UPSTREAM in the 360
scripts, which B5e culls; the CUT running the union over the culled set is correct).

### 2.7 The final `>=4` ask roster

The authoritative, single-sourced roster (all four in-repo-witnessed):

| # | Sibling | Site | Break | New home | Witness (in-repo) |
|---|---|---|---|---|---|
| 1 | muster | `frontend/src/composables/useAuroraConfig.ts:47` | `DEFAULT_AURORA_CONFIG`, `AuroraConfig` off `/api` | `/aurora` | 203-row MIGRATION table + `proof:crossrepo-asks:bh` |
| 2 | speedtest | `src/features/speedtest/ui/PhaseTimeline.vue:52` | `TimelineSegment` off `/api` (+ drop dead `vite.config.mjs:1033` optimizeDeps string) | `/timeline` | 203-row MIGRATION table + `proof:crossrepo-asks:bh` |
| 3 | atlas | 12 bare `var(--ring)` across 11 files | `--ring` → `--focus-ring-color` (clean break, no alias) | (token rename) | MIGRATION `--ring` rename row + pinned commit |
| 4 | bbnf-buddy | `src/styles/preset.css:230` | `--glass-blur-dock` token-retire (no-op retune) | (token retire) | MIGRATION `--glass-blur-dock` retire row + `proof:crossrepo-asks:bh` `>=4` |

BH's OWN 5.0.0 break vector is the `./api` drop = rows 1-2 (2 sibling consumers); rows 3-4 are token asks the
relay carries. `words/frontend/glass-ui/` is a vendored d6 fork (inv-11 lineage), NOT a registry consumer —
owes no ask (disposition note, not a row). slides-K keeps every key.

---

## SECTION 3 — THE ENGINE STAGE-0 SPEC (a HARD pre-build precondition)

Ruling #9 + C4-F1/F2/F3: engine repairs are Stage-0 preconditions, not prose. The coherence audit AUTHORED the
fix and left it un-applied — `grep -c 'doneBuilding|buildComplete|paintComplete|FAIL-PAINT'
bg-bh-execute.wf.js` = **0** on disk. No build cycle opens until the engine emits these markers and a boot
dry-run witnesses `cutReady` is `paintComplete`-gated. This section is the code-level spec; the build agent
applies it to `docs/tranches/BG/execution/bg-bh-execute.wf.js` (canonical, 249 lines — verified) before the
first sweep.

### 3.1 The DAG-deadlock repair (bg-bh-execute.wf.js — C4-FOLD-1)

**The disease.** `:204` `const paintWaves = []` retired the in-cycle judge; a `[P]` wave that builds green is
set `PAINT-PENDING` (`:200`), never DONE; `allDone` (`:87`), `ready` (`:100`), and `cutReady` (`:243`) all
test the literal `w.status === 'DONE'`. No code path flips `[P]` PAINT-PENDING→DONE, so `cutReady` is `false`
forever AND every downstream wave whose precond is a `[P]` wave is not `ready()`. The only operator escape is
to relax the gate — firing a cut with unverified paint (the exact disease this protocol cures).

**The fix — five exact edits:**

1. **Add the ordering helper** (after `:86` `byId`):
   ```js
   const doneBuilding = (w) => w.status === 'DONE' || w.status === 'PAINT-PENDING'
   ```
   Rationale: a `[P]` wave that lands device-free-green + committed `[paint-pending]` is DONE-BUILDING for
   ORDERING purposes — its paint is decoupled, not its build. Downstream builds must not stall on its paint.

2. **`:87` `allDone`** — route through `doneBuilding`:
   ```js
   const allDone = (waves, ws) => waves.filter(w => w.tranche === 'BG' && w.ws === ws).every(doneBuilding)
   ```
   (A `[WSn]` BH wave unblocks when every WSn BG wave is DONE-or-PAINT-PENDING — the interleave no longer
   stalls behind a `[P]` wave's paint.)

3. **`:100` `ready` precond** — route through `doneBuilding`:
   ```js
   if (!w.preconds.every(p => map[p] && doneBuilding(map[p]))) return false
   ```
   (A wave whose precond is a `[P]` wave builds once that precond is PAINT-PENDING; the paint is decoupled.)

4. **`:153` the build-frontier exit** — the loop must exit when no wave can BUILD (all DONE or PAINT-PENDING),
   letting the paint edge drain PAINT-PENDING. Replace the `pendingLeft` line:
   ```js
   const buildFrontierLeft = waves.some(w => ['PENDING', 'BUILDING', 'FAIL', 'FAIL-PAINT'].includes(w.status))
   if (!buildFrontierLeft && !waves.some(w => w.status === 'PAINT-PENDING')) { log('All waves DONE — frontier reached the cut.'); break }
   ```
   PAINT-PENDING is NO LONGER a build-frontier blocker; it is drained by the paint edge (3.2). Keep FAIL and
   the new FAIL-PAINT in the frontier (the fix loop).

5. **`:243` split `cutReady`** — the tag stays coupled to painted truth while the frontier is unblocked by
   pending paint:
   ```js
   const buildComplete = waves.filter(w => w.tranche === 'BG').every(doneBuilding)
     && waves.filter(w => w.interleaveClass === 'WS12-LAST').every(doneBuilding)
   const paintComplete = !waves.some(w => ['PAINT-PENDING', 'FAIL-PAINT'].includes(w.status))
   const cutReady = buildComplete && paintComplete
   ```
   `buildComplete` uses `doneBuilding` (PAINT-PENDING counts as built); `paintComplete` demands ZERO
   PAINT-PENDING/FAIL-PAINT (the paint is actually captured). `cutReady = buildComplete ∧ paintComplete` — the
   tag never fires on unverified paint, and the deadlock is structurally impossible.

Also amend the status enum (`:48`) to add `'FAIL-PAINT'`:
```js
status: { type: 'string', enum: ['PENDING', 'BUILDING', 'PAINT-PENDING', 'DONE', 'BLOCKED', 'FAIL', 'FAIL-PAINT'] },
```
And amend the DAG-LOADER prompt clause (`:136`) that codifies the stall ("a PAINT-PENDING row STAYS
PAINT-PENDING … MUST NOT re-enter the build frontier") to: "a PAINT-PENDING row stays PAINT-PENDING and does
NOT re-enter the BUILD frontier, but it IS `doneBuilding` for interleave/precond ORDERING, and the PAINT EDGE
(`Workflow(bg-paint.wf.js)`) drains it to DONE or FAIL-PAINT."

### 3.2 The paint edge — the scheduled `Workflow(bg-paint.wf.js)` call (bg-bh-execute.wf.js — C4-FOLD-3 option a)

**The disease.** `bg-paint.wf.js` (the decoupled dual-engine flip workflow) is ORPHANED — the main engine
contains no `Workflow(` call and no `bg-paint` reference (verified). The paint-flip depends on a human
remembering to run a second workflow between sweeps. Make it a scheduled edge.

**The fix — insert the paint edge in the sweep loop, after the integrate block, before the tail log.** Insert
between `:201` (the status-apply loop close) and `:203` (the retired `paintWaves` comment). Add near the top,
beside `MAX_FIX`:
```js
const PAINT_DRAIN_THRESHOLD = 3   // fire the paint edge when the PAINT-PENDING backlog reaches this, or when the build frontier drains
```
Replace `:204-233` (the retired in-cycle judge block, `const paintWaves = []` through the closer) with:
```js
  // ----- PAINT EDGE (scheduled — the decoupled dual-engine flip, wired as an edge not a human ritual) -----
  const paintPending = waves.filter(w => w.status === 'PAINT-PENDING')
  const frontierLeftNow = waves.some(w => ['PENDING', 'BUILDING', 'FAIL', 'FAIL-PAINT'].includes(w.status))
  if (paintPending.length >= PAINT_DRAIN_THRESHOLD || (!frontierLeftNow && paintPending.length)) {
    log(`Paint edge — Workflow(bg-paint.wf.js) over ${paintPending.length} PAINT-PENDING wave(s)`)
    await Workflow({ scriptPath: `${EXEC}/bg-paint.wf.js` }).catch(() => null)   // bg-paint reads the cursor's PAINT-PENDING set, dual-engine-captures, flips PASS→DONE (writes the cursor) + leaves FAIL→PAINT-PENDING with a mustFix DELTA
    // RE-HYDRATE from the cursor the workflow just wrote: a fresh loader pass reads DONE / still-PAINT-PENDING per row.
    const reload = await agent(`Re-read ${EXEC}/EXECUTION-PROGRESS.md and return, for each wave that was PAINT-PENDING before the paint run, its CURRENT status (DONE if the paint judge PASSed + flipped it; PAINT-PENDING if it left a FAIL DELTA). ${FENCE}`,
      { schema: { type: 'object', additionalProperties: false, required: ['rows'], properties: { rows: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['wave', 'status'], properties: { wave: { type: 'string' }, status: { type: 'string', enum: ['DONE', 'PAINT-PENDING'] } } } } } }, model: 'opus', label: 'paint-reload', phase: 'Build' }).catch(() => null)
    const rows = (reload && reload.rows) || []
    for (const w of paintPending) {
      const r = rows.find(x => x.wave === w.id)
      if (r && r.status === 'DONE') { w.status = 'DONE'; continue }
      // still PAINT-PENDING after a paint run = a FAIL verdict → FAIL-PAINT + bounded fix-agent recovery
      w.status = 'FAIL-PAINT'
      w._fix = (w._fix || 0) + 1
      if (w._fix > MAX_FIX) { w.status = 'BLOCKED'; log(`${w.id} BLOCKED — ${MAX_FIX} paint fixes exhausted; escalate.`) }
      else { w.status = 'PENDING'; w._mustFix = w._mustFix || []; log(`${w.id} paint FAIL → fix ${w._fix}/${MAX_FIX} (re-queued for a FIX agent — NOT the builder — reading the DELTA mustFix)`) }
    }
  }
```
The named call site is the `await Workflow({ scriptPath: `${EXEC}/bg-paint.wf.js` })` inside the sweep loop
body — a scheduled edge after each build sweep, guarded by `PAINT_DRAIN_THRESHOLD` (batch the heavy capture)
or the frontier draining (never leave a PAINT-PENDING backlog at cut). `bg-paint.wf.js` is UNCHANGED — it
already reads the live `[paint-pending]` set from the cursor, validates the C-SAFARI pipeline end-to-end
BEFORE fan-out (HARD-STOPs on a blocked real-Safari path — never a faked PASS), and flips PASS→DONE. The FIX
agent re-implements at root (the non-authoring fence: the builder never judges its own paint, and a FAIL is
re-built by a fresh FIX agent reading the DELTA's `mustFix`, not the builder).

### 3.3 The W-REFLECT3 scrub under the ONE rule (ABOLISHED)

**The ONE canonical rule** (C4-FOLD-2; reconciles the THREE inconsistent corpus positions):

> `W-REFLECT3` is ABOLISHED. There is NO terminal reflect funnel wave. EVERY live-π (gestalt OR non-gestalt)
> closes at its owning wave's OWN non-authoring paint close. `proof:ba-gestalt` G8 reds any wave that DEFERS
> its π/verdict to a future terminal wave.

Every surviving occurrence, with its re-home (grep-verified on the canonical tree — `.claude/worktrees/`
copies are stale mirrors, ignore them):

**Cursor `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`:**
| Line | Current | Re-home |
|---|---|---|
| :52 | "BG.W-FIELD-AURORA's own **W-REFLECT3** gestalt re-paint stays owed" | "BG.W-FIELD-AURORA's own **non-authoring paint close** stays owed" |
| :98 (2.7 VT-ROUTE, ×3) | "re-attempt at **W-REFLECT3**" / "deferred to **W-REFLECT3**" / "when **W-REFLECT3** runs" | "re-attempt under live dual-engine paint at **2.7's own re-open** (verifiable via the C18 harness)" — 2.7 is DEFERRED-NOT-BUILT/optional; its own close owns the re-attempt, no funnel |
| :237 (12.4a) | "Model-B → **W-REFLECT3**" | "Model-B late-capture sweep → **BG.W-GESTALT-CURSOR-PARITY's OWN non-authoring close**" (12.4a IS the parity keystone) |
| :239 (12.5) | "F-AA-LIVE `_anchor` re-shoot at `ebf6e45b` → **W-REFLECT3**" | "→ **BG.W-GATE-FIELD-AURORA's OWN non-authoring dual-engine close**" |
| :242 (12.8) | "non-authoring Metal capture → close / **W-REFLECT3**" | "→ **BG.W-SAFARI-PARITY-GATE's OWN non-authoring Metal close**" |
| :253 (13.2) | "→ 13.3/close/**W-REFLECT3**" | "→ 13.3 keystone calibration + **BG.W-GLASS-REFRACT-WEBGL's OWN close**" |
| :254 (13.3) | "non-authoring dual-engine Metal capture → close / **W-REFLECT3**" | "→ **BG.W-GLASS-BACKDROP-SAMPLE's OWN non-authoring dual-engine Metal close**" |

**Build-map `docs/tranches/BG/execution/bg-build-map.md`:**
| Line | Current | Re-home |
|---|---|---|
| **:72-74** | "A NON-ba-gestalt π deferral **may still legitimately name W-REFLECT3** (the light-eyebrow lift, the refract-shader live π) — only the `proof:ba-gestalt` VERDICT phrasing is the G8a-forbidden form." | **DELETE the carve-out** (C4-FOLD-2b — it re-legitimizes the phantom and is the source of the 3-way inconsistency). Replace with: "EVERY live-π (gestalt OR non-gestalt) closes at its owning wave's OWN non-authoring paint close — there is no W-REFLECT3 wave; the G8a arm forbids ANY `proof:ba-gestalt` verdict naming a terminal-reflect wave." |
| :224 | "un-regressed (rides **W-REFLECT3**)" | "un-regressed (rides **the wave's OWN non-authoring close**)" |
| :589 | "**NOT W-REFLECT3**; this wave's grain-tail deferral is its own non-authoring re-capture" | **KEEP** (already the model re-home) |
| :733 | "**W-REFLECT3** + the light-eyebrow polish landing" | "**the wave's OWN non-authoring close** + the light-eyebrow polish landing (`3.12`)" |
| :862 | "LOCAL-only, rides **W-REFLECT3**" | "LOCAL-only, rides **the wave's OWN non-authoring close**" |
| :882 | "+ **W-REFLECT3** / the close" | "+ **the wave's OWN non-authoring close**" |
| :1318 (D-G4) | "**NOT W-REFLECT3**; G4's deferral is `BG.W-CLOSEFIX-9SITE`'s own non-authoring re-capture" | **KEEP** (already the model) |
| :1320 (D-G6) | "`BG.W-GATE-FIELD-AURORA` + `BG.W-EYEBROW-LIGHT-POLISH` + **W-REFLECT3**" | drop the "+ W-REFLECT3" tail (the two named waves own the close) |

**FINAL.md `docs/tranches/BG/FINAL.md`:**
| Line | Current | Re-home |
|---|---|---|
| **:344-347** | "The **W-REFLECT3-deferred** human FEEL verdicts — WS12 defers the human read … to a post-integration reflection pass. (NB: WS1 SCRUBBED the literal 'W-REFLECT3' wave-label — there is no W-REFLECT3 wave in BG; it is the name for the deferred post-integration human-verdict step, not a build wave.)" | **DELETE the re-legitimizing framing** (C4-FOLD-2c). Replace: "The cross-page harmonized-whole human read (Card-press feel, deck-slide read, 'one light reads coherent', the 480-capture verdict) is **WS12 `BG.W-PAGE-COMPONENT-AUDIT`'s OWN non-authoring close** — a real wave, not a terminal funnel. There is NO W-REFLECT3 wave; the phantom is abolished." |
| :549 (table row 2) | "`BG.W-GATE-FIELD-AURORA` + `BG.W-EYEBROW-LIGHT-POLISH` + **W-REFLECT3**" | drop the "+ W-REFLECT3" tail |
| :550 (table row 3) | "**W-REFLECT3** (rides the WS12/close gestalt sweep)" | "**BG.W-DOCK-BLUR-RETIRE-CARVE's OWN non-authoring grain-tail close**" (the renamed CLOSEFIX-9SITE; matches build-map :589/:1318 — the grain-tail is that wave's own re-capture) |
| :655 (G1 row) | "the 2 live G8 'rides W-REFLECT3' hits content-anchored re-homed" | update to "**ALL** W-REFLECT3 hits scrubbed (not just the 2 G8a-blocking) — every live-π re-homed to its owning wave's own close" (the scrub is now COMPLETE, not partial) |

`FINAL.md:551` (table row 4 — "WS12 `BG.W-PAGE-COMPONENT-AUDIT` + the close") is ALREADY correctly re-homed —
KEEP as the model.

### 3.4 The worktree-GC tripwire (GA-12)

**The pollution.** `.claude/worktrees/` = **83G / ~99 stale dirs** (verified). These are dead build-agent
worktrees from prior runs (the `wf_c4e77ac4-079-*` series). This is the GA-12 fold — a standing tripwire the
engine runs at boot and the cut-battery runs BEFORE the tag.

**Spec `scripts/worktree-gc.mjs` (a NEW gate/tool, in-repo):**
- **Scope-fenced ABSOLUTELY** — operates ONLY under `${REPO}/.claude/worktrees/`. NEVER touches
  `~/Programming` siblings; NEVER `/tmp`; NEVER moves/reads-parks a sibling tree (the inv-26 foreign-tree
  fence + the 2026-06-20 park-not-restored law). Runs `scripts/verify-siblings-intact.mjs --quiet` FIRST and
  aborts if it reds.
- **Prune logic:** (1) `git worktree prune` (removes admin refs for already-deleted dirs); (2) enumerate
  `.claude/worktrees/*` dirs whose runId is NOT the active run (`args.runId`) AND whose HEAD is merged into
  `tranche/BG` or has no un-pushed unique commits → `git worktree remove --force <dir>` then `rm -rf` the leaf
  (in-repo only); (3) report freed bytes.
- **Tripwire thresholds (WARN/RED at boot):** RED if `.claude/worktrees/` dir-count > **20** OR total size >
  **20 GB** (at HEAD: 99 dirs / 83G — born-RED, the tripwire's own witness). The boot RED does not abort the
  build (a warn), but the pre-CUT battery RED DOES abort the tag (a bloated worktree tree at the cut is a
  hygiene failure — `verify-siblings-intact` companion).
- **Idempotent + safe under an in-flight run:** never removes the ACTIVE run's worktrees (guard on
  `args.runId` + a BUILDING/PAINT-PENDING liveness check against the cursor).

**Wire it:**
- **Boot phase** in `bg-bh-execute.wf.js` — add a first step in the `Load` phase (before the DAG loader,
  after `:132`): an agent runs `node scripts/worktree-gc.mjs --runId <active> --report` and logs the freed
  bytes + a WARN if over threshold. (The engine control-flow has no fs access — it runs THROUGH the loader
  agent, same pattern as every other file op.)
- **Pre-cut battery** in `publish-and-cut.md §1` — add `1.0` before `1.1`: "Run `node scripts/worktree-gc.mjs
  --report` — RED if `.claude/worktrees/` exceeds 20 dirs / 20 GB (a bloated worktree tree at the cut aborts;
  fix by pruning, never by moving a sibling)."
- **Standing gate** — register `proof:worktree-hygiene` (`local` only — it is machine-local state, not a CI
  concern) that reds over the threshold, so the pollution cannot silently re-accrete.

### 3.5 The boot dry-run witness (C4-FOLD-1 — the Stage-0 precondition)

Before the first build sweep opens, the engine emits a one-line witness proving the Stage-0 markers are
present and `cutReady` is `paintComplete`-gated. Add to `bg-bh-execute.wf.js` at the top of the `Build` phase
(after `:147` `phase('Build')`):
```js
// STAGE-0 WITNESS — the engine must be paint-decoupled before any build cycle opens (RESPEC-GESTALT ruling #9).
log(`Stage-0 witness: doneBuilding = {DONE, PAINT-PENDING} (allDone/ready/frontier); cutReady = buildComplete ∧ paintComplete; paint edge = Workflow(bg-paint.wf.js) after each sweep (threshold ${PAINT_DRAIN_THRESHOLD}); FAIL-PAINT→FIX-AGENT recovery armed (MAX_FIX=${MAX_FIX}); worktree-GC tripwire wired.`)
if (typeof doneBuilding !== 'function' || typeof PAINT_DRAIN_THRESHOLD === 'undefined') { log('STAGE-0 NOT APPLIED — engine still deadlocks (no doneBuilding/paint-edge). Abort — apply DEV-B §3.1-3.2 first.'); return { ok: false, reason: 'stage-0-unapplied' } }
```
This is the "no build cycle opens until the engine emits `doneBuilding`/`buildComplete`/`paintComplete`/
`FAIL-PAINT`; a boot dry-run witnesses that `cutReady` is `paintComplete`-gated" precondition, elevated to a
cut-blocker checklist item in `publish-and-cut.md §1` (add: "the engine boot log MUST carry the Stage-0
witness line; a run without it built against the deadlocked engine and its cut is void"). Record the same in
`engine-design.md` (which owns the engine DESIGN, §2 wave-state machine `:73` + §3 orchestration loop `:104`)
so the design doc and the code agree — the coherence audit's failure was the fix landing in prose but not
code; this closes it in BOTH.

---

## APPENDIX — the fold destinations (where each section lands)

- **Section 1** → BH `PLAN.md` (§1 reframe, §4 band table collapse, §5), `bh-interleave-map.md` (the 14-row
  table + the 3→4 / `^1.2.0`→`^1.1.1` resyncs), `EXECUTION-PLAN.md §B` (BH slot count).
- **Section 2** → `publish-and-cut.md` (:5 header, :54/:103 value floor, :85/:95-101/:141 ask count, §4
  4-consumer honesty), `release.sh:12-19`, `asks-and-consumes.md:18` + `PLAN.md:106` + `bh-interleave-map.md:83`
  (the bbnf ask re-base), `EXECUTION-PLAN.md:187`.
- **Section 3** → `bg-bh-execute.wf.js` (the engine patch — §3.1/§3.2/§3.5), `EXECUTION-PROGRESS.md` +
  `bg-build-map.md` + `FINAL.md` (the W-REFLECT3 scrub — §3.3), NEW `scripts/worktree-gc.mjs` + `publish-and-cut.md
  §1.0` + `engine-design.md §2/§3` (the tripwire + witness — §3.4/§3.5).

**Protected (do NOT touch — SYNTHESIS §4):** the paint-decoupled dual-engine per-wave verify, batch-3,
null-guarded agents, literal `const PASS`, the disposition/deferral ledger, the `--run full` union at the cut,
the foreign-tree fence, the inv-11 lineage spine, `release.yml` gated provenance, the 5-step consume-and-delete
cadence. Section 3's engine patch RESTORES the paint-decoupling the plan already designed; it does not re-plumb
the discipline.
