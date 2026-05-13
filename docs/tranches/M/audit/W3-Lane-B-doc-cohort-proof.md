# M.W3 Lane B — Doc cohort across constellation — proof

**Lane**: B (doc cohort).
**Mode**: glass-ui-side worktree-isolated (READ-ONLY for cross-repo per-consumer docs).
**Worktree**: `/Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-aefa2b28a979722c6`.
**Scope**: glass-ui top-level docs + wave-spec status lines + CONSTELLATION manifest non-stale-repo rows + per-consumer doc cross-check (read-only).

---

## § Disposition

**14 docs refreshed in-tranche** (this worktree); **0 per-consumer cross-repo writes** (per Lane B bounds — escalations enumerated below for orchestrator follow-up). All refreshes reflect M HEAD state (`0e0a9a9` W1 close) + M.W3 in-progress.

Closure of two known doc-drift residuals from L-audit-γ (P2 cohort) absorbed in-flight:

- **`38 flat subpaths` phrasing drift** — CLAUDE.md / README.md / DESIGN.md all said "38 flat subpaths plus `/styles` and `/api`" implying 40 total. Actual `package.json` exports: 38 entries (excluding `./` + `./package.json`), of which 1 is the `/styles` CSS bundle. Refreshed to "37 flat JS subpaths plus `/styles` (38 entries total)" — matches the L-audit-γ recommended phrasing.
- **`24 types + 8 constants` count drift** — CLAUDE.md / DESIGN.md / MIGRATION.md all said "32 canonical public symbols (24 types + 8 constants)". Actual: 28 types + 4 constants = 32 symbols (12 Aurora types + 4 Configurator types + 1 Metaballs type + 3 surface enums + 8 CVA variants; 3 Aurora constants + 1 Metaballs constant). Refreshed.

Plus two count drifts surfaced fresh during this walk:

- CLAUDE.md / README.md said "44 shadcn-vue components" + "28 custom composites". Actual: 43 components + `_shared` (44 dirs total in `src/components/ui/`); 30 custom packages (every dir has a package barrel). Refreshed.
- CLAUDE.md said "30 custom package dirs; 28 public package barrels". Actual: 30 dirs, 30 barrels. Refreshed.

Plus one substrate-doc drift from M.W0 v1.0.4 (carousel-subpath substrate alignment):

- DESIGN.md §1217 vueuse-bearing-subpaths table previously listed `/carousel` as exporting "`useCarousel` + `CarouselApi`". v1.0.4 (M.W0) aligned the substrate with MIGRATION.md §1.2's contract — `/carousel` now ships the full `Carousel*` component family. Refreshed the DESIGN.md row to enumerate the family explicitly.

---

## § Doc-by-doc summary

### CLAUDE.md

Edits (this lane):
- `src/api/index.ts` line: `24 types + 8 constants` → `28 types + 4 constants`.
- `src/components/ui/` line: `44 shadcn-vue base component packages + _shared` → `43 shadcn-vue base component packages + _shared (reka-ui) — 44 dirs total`.
- `src/components/custom/` line: `30 custom package dirs; 28 public package barrels` → `30 custom package dirs (every dir has a package barrel)`.
- Subpath count paragraph: `38 flat subpaths plus /styles and /api` → `37 flat JS subpaths (32 component packages + /api + /forms + /dark + /keyboard + /carousel) plus the /styles CSS bundle (38 entries total in package.json exports, excluding ./ root + ./package.json)`.

No M-specific architectural change required — M.W1 was per-consumer migration (no glass-ui src touch); M.W3 doc cohort + stale-repo (no glass-ui src touch). M.W0 v1.0.4 carousel-subpath fix is documented in CHANGELOG; CLAUDE.md does not need a callout because the structural file list is unchanged.

### README.md

Edits (this lane):
- Features bullet: `44 shadcn-vue / reka-ui base components plus 28 custom composites` → `43 ... plus 30 custom composites`.
- Structure tree: `ui/` line `44 shadcn-vue components + _shared` → `43 ... + _shared (44 dirs total)`; `custom/` line `28 custom composites` → `30 custom composites`.
- Subpath surface paragraph: `38 flat per-package subpaths plus the /styles CSS bundle` → `37 flat JS subpaths (32 component packages + /api + /forms + /dark + /keyboard + /carousel) plus the /styles CSS bundle (38 entries total in package.json exports)`.
- Footer subpath reference: `38 flat subpaths plus /styles` → `37 flat JS subpaths plus /styles`.

### DESIGN.md

Edits (this lane):
- §1205 (Subpath surface intro): `38 flat per-package subpaths, and a pure types/constants /api discovery layer` → `37 flat JS subpaths (32 component packages + /forms + /dark + /keyboard + /carousel + /api), and the /styles CSS bundle (38 package.json exports entries total)`.
- §1213 (API discovery layer): `32 canonical public symbols (24 types + 8 constants)` → `32 canonical public symbols (28 types + 4 constants)`.
- §1217 (vueuse-bearing subpaths table) `/carousel` row: previously "`useCarousel` + `CarouselApi` (the embla-carousel-vue + `createInjectionState` composable powering `<Carousel>` and the `Carousel*` family)" → now explicitly "`useCarousel` + `CarouselApi` PLUS the full `Carousel*` component family — `Carousel`, `CarouselContent`, `CarouselDots`, `CarouselItem`, `CarouselNext`, `CarouselPager`, `CarouselPrevious`, `GlassCarouselPager` (substrate aligned with MIGRATION.md §1.2 at v1.0.4 / M.W0; pre-v1.0.4 only re-exported the composable + type)". The mechanism column updated to clarify every `Carousel*.vue` injects `useCarousel`.

No M-specific architectural decision section added. M.W2 may surface F-ε-3 fix path (architectural decision) but W2 has not opened yet — deferred to W2 close doc walk.

### CHANGELOG.md

No edits this lane. State already current:
- v1.0.4 — 2026-05-12 — M.W0 (Carousel subpath substrate alignment with MIGRATION.md §1.2) entry present, accurate.
- M.W1 is non-substrate (per-consumer migration sweep with zero glass-ui src changes) — no version bump warranted, no CHANGELOG entry needed.
- M.W3 Lane A (stale-repo retire-or-refresh) is non-substrate for glass-ui — Lane A's disposition may CREATE entries if a stale repo is REFRESHED into the glass-ui dep graph (none expected per KISS default).
- M.W3 Lane B (this lane) is doc-only — no CHANGELOG entry.

### MIGRATION.md

Edits (this lane):
- §"At a glance" / §"`@mkbabb/glass-ui/api` — type + constant discovery layer": `32 canonical public symbols (24 types + 8 runtime constants)` → `32 canonical public symbols (28 types + 4 runtime constants)`; the paragraph below describing the JS payload — `all 24 type aliases erase at build, leaving only the 4 constants` → `all 28 type aliases erase at build, leaving only the 4 constants`.

M is non-breaking — verified no migration guidance needed:
- M.W0 v1.0.4 carousel-subpath fix is purely additive (MIGRATION.md §1.2 already documented the contract; the fix aligns substrate to contract — pre-v1.0.4 consumers who followed §1.2 verbatim against v1.0.0–v1.0.3 found the components missing; at v1.0.4 the contract resolves). No migration shim, no consumer-side break.
- M.W1 per-consumer migration sweep migrates *consumers* to v1.0; the migration path itself is the existing MIGRATION.md (v0.9.x → v1.0). No additions required.
- The §"New surfaces in v1.0" section accurately reflects /api (now with correct counts post this lane's edit).

### docs/tranches/M/waves/W0.md

Edits (this lane): status line bumped from `open (planning-only at M open; awaits dispatch)` to `**CLOSED 2026-05-12 at e385879**` with close-evidence summary (5 lanes; precept @ `08a2e9c`; v1.0.4 patch; cross-references to the 3 audit proofs at `audit/W0-*.md`).

### docs/tranches/M/waves/W1.md

Edits (this lane): status line bumped from `pending W0` to `**CLOSED 2026-05-12 at 0e0a9a9**` with per-consumer commit hashes (keyframes `b788205` WIP, value WIP, fourier `301a95e`, words `0f16925`, bbnf-buddy `e06d629` no-remote, speedtest n/a). Cross-reference to the 6 per-lane audit proofs.

### docs/tranches/M/waves/W2.md

Edits (this lane): status line clarified from `pending W1` to `pending (W1 closed; W2 may run parallel with W3)`. Wave gate text unchanged.

### docs/tranches/M/waves/W3.md

Edits (this lane): status line bumped from `pending W1` to `**IN-PROGRESS 2026-05-12** — W1 closed at 0e0a9a9; W3 opens parallel with W2. Lane A (stale-repo retire-or-refresh) + Lane B (doc cohort) dispatched in parallel; Lane B authoring at docs/tranches/M/audit/W3-Lane-B-doc-cohort-proof.md.`

### docs/tranches/M/waves/W4.md

Edits (this lane): status line clarified from `pending W2 + W3` to `pending (awaits W2 + W3 close)`. No other changes.

### docs/tranches/M/coordination/CONSTELLATION.md

Edits (this lane — non-stale-repo rows + §9 only; stale-repo rows left for Lane A per task coordination clause):

§ header date line: `2026-05-12 (M open)` → `2026-05-12 (M open) — refreshed at M.W3 Lane B (post-W1 close)`; authoring authority annotated with "refreshes at each M wave close".

§1 — glass-ui row: active tranche `M (this)` + status `active; v1.0.4 patch at W0 close` refreshed to active-tranche `M (this); W0 + W1 CLOSED; W2 pending; W3 IN-PROGRESS` + status `active; v1.0.4 (W0 close); W3 doc cohort + stale-repo dispositions in flight`. Last-tranche-close column gains `→ v1.0.4` tail clarifying the carousel patch was the published outcome of M.W0.

§1 — speedtest row: last-tranche-close `AA (verify)` → `AA closed (per AA/FINAL.md at speedtest); Y closed long ago`; status gains cross-reference to `docs/tranches/M/audit/W1-Lane-F-speedtest-post-Y-proof.md`.

§1 — stale-repo rows (vite-plugin-shebang, mathanim, fourier-animate, parse-that): UNTOUCHED — Lane A territory per task coordination clause. Note: these rows currently reference "M.W5" — that's a pre-revision artefact; the 5-wave plan retires-or-refreshes them at W3. Lane A should refresh these as part of its disposition writeup.

§9 — restructured into three labeled sub-blocks:
- `W0 close state (2026-05-12)` — unchanged from prior version (W0 close evidence ratified at lane V).
- NEW `W1 close state (2026-05-12 at 0e0a9a9)` — N12 / N13 / N17-N24 / N-words-broader / N-bbnf-buddy-broader / N-fourier-dockpopover / N-speedtest-post-Y all marked CLOSED with per-lane commit-hash evidence.
- NEW `W3 open state (2026-05-12)` — N-stale-repos (Lane A) + N-doc-cohort (Lane B) listed.
- NEW `Carry-forward to W2 (substrate residuals, unchanged from M open)` — F-ε-3 P1 + src/api/ extensions P2 + L cosmetic residuals enumerated for W2 absorption.

### docs/tranches/M/PROGRESS.md

Edits (this lane):
- Status table — W0 row gains close hash `e385879`; W1 row gains close hash `0e0a9a9`; W2 wording refined (`pending W1` → `pending (W1 closed; parallel with W3)`); W3 row bumped to `IN-PROGRESS 2026-05-12` with lane-dispatched summary.
- NEW dated entry `## 2026-05-12 — W3 open (Lane B doc cohort)` summarizing Lane A + Lane B dispatch.

---

## § Per-consumer doc check

Mechanical inspection at `/Users/mkbabb/Programming/<consumer>` for each W1-touched consumer:

| Consumer | CHANGELOG.md present? | MIGRATION.md present? | M.W1 commit | Proposed escalation |
|---|---|---|---|---|
| keyframes.js | No | No | `b788205` (user WIP branch `w.w2.1-keyframes-prebuild`) | Per CONSTELLATION.md §3 versioning canon ("each `@mkbabb/*` package ships its own CHANGELOG.md + MIGRATION.md when breaking; canonical at M per W2 deliverable") — keyframes.js is `@mkbabb/keyframes.js@2.0.0` (published); SHOULD have a CHANGELOG. Not present at HEAD. Escalation: propose adding `CHANGELOG.md` with at minimum a v2.0.0 entry + a v2.0.x line for the M.W1 glass-ui-v1.0 subpath migration (consumer-internal demo-only; not a published-API break). |
| value.js | No | No | (commit landed) on user WIP branch `w.w2.1-value-js-prebuild` | Per CONSTELLATION.md §1 pin `file:../glass-ui` + `file:../keyframes.js` — value.js v0.5.1 (per CONSTELLATION manifest); private/demo-only? Verify publish status. Escalation: if value.js publishes, propose adding `CHANGELOG.md`. |
| fourier-analysis | No (at `/Users/mkbabb/Programming/fourier-analysis`) | No | `301a95e` on master + pushed | private app; no published versioning. No CHANGELOG needed. Optional: an `app-internal NOTES.md` could log the v1.0 migration but is not required by any precept. |
| words | No (at `/Users/mkbabb/Programming/words`) | No | `0f16925` on master + pushed | private app (frontend at `words/frontend/`); no published versioning. No CHANGELOG needed. |
| bbnf-buddy | No | No | `e06d629` on master (no origin remote — local-only) | private app; no remote. No CHANGELOG needed. The "no origin remote" is itself a footnote: the M.W1 commit is local-only on this user's machine. Future orchestrator may want to surface this fact more loudly (consumer-doc-state class). |
| speedtest | YES (phase-overhaul style, not SemVer) | No | (no source changes — handoff DONE) | Existing speedtest CHANGELOG is a single "Speedtest Platform Overhaul — April 2026" doc; not a per-release ledger. M.W1 Lane F is non-source (verification only) — no entry warranted. Speedtest's own AA tranche close `e0a60ba4 docs(AA/FINAL + PROGRESS)` documents its own state. |

Escalation summary to orchestrator (for cross-repo commit follow-up, outside Lane B scope):

1. **keyframes.js** — propose `CHANGELOG.md` creation. Cross-repo write; needs orchestrator dispatch + user WIP-branch coordination (current commit `b788205` is on `w.w2.1-keyframes-prebuild`, not master).
2. **value.js** — verify publish status; propose `CHANGELOG.md` only if value.js is a published `@mkbabb/value.js`. Same WIP-branch coordination caveat.
3. **CONSTELLATION.md §3 versioning canon** — currently flagged "canonical at M (per W2 deliverable)" — M.W2 has not opened. If W2 does NOT formally ratify the per-consumer CHANGELOG/MIGRATION canon, the M close should either (a) ratify it at W4 close-ceremony (W4 spec already lists "MIGRATION.md complete vs all v1.x breaking changes" — could extend), or (b) defer to N tranche with named restoration.

The escalations are non-blocking for M.W3 Lane B's hard gate; they belong in M.W4 ι integrity-sweep ledger OR M residuals carry-forward to N.

---

## § Open questions for orchestrator

1. **Stale-repo §1 row "M.W5" annotation**: Lane A is authoring stale-repo dispositions in parallel with this lane. The current §1 rows for `vite-plugin-shebang` / `mathanim` reference "M.W5" (pre-revision wave numbering); the 5-wave plan retires-or-refreshes them at W3. Lane A should normalize these rows to "M.W3 retire-or-refresh". If Lane A finishes before W3 close, the orchestrator can verify the cross-lane consistency in CONSTELLATION.md.

2. **M.W2 per-consumer CHANGELOG/MIGRATION canon ratification**: CONSTELLATION.md §3 says "each `@mkbabb/*` package ships its own CHANGELOG.md + MIGRATION.md (when breaking); the convention is canonical at M (per W2 deliverable)". W2 plan does NOT explicitly enumerate this as a deliverable. Recommend either (a) extending W2 Lane B scope to ratify the canon (purely additive — establishes the precept; no source change to glass-ui), or (b) deferring to N with named restoration in `audit/M-residuals.md` at M.W4 close.

3. **Per-consumer CHANGELOG cross-repo commits**: Per Lane B bounds (`MUST NOT TOUCH` cross-repo source — escalations only), the keyframes.js + value.js CHANGELOG creation proposals are NOT executed here. Orchestrator decision needed on whether to:
   - Dispatch a thin M.W4 cross-repo lane to land per-consumer CHANGELOG.md files, OR
   - Defer to per-consumer next-tranche-stream (keyframes.js has its own H tranche stream; value.js stream is unknown), OR
   - Document in M.W4 FINAL.md as a constellation-wide N-tranche residual.

4. **Typecheck baseline drift**: `npm run typecheck` returns 26 errors, ALL in `demo/stories/data/timeline-{continuous,segmented}.vue` (AA.W1 commits `53c7114` + `adf3018`). These are pre-existing; this lane's docs-only edits do not regress. Surfaced for completeness — likely an AA tranche pre-close residual that escaped the AA close ceremony. May want a follow-up in the M.W4 ι integrity-sweep ledger OR a fast-follow patch independent of M. Not blocking for Lane B hard gate (docs don't affect typecheck).

---

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-aefa2b28a979722c6 status --short
```

(verified at lane close — populated below at orchestrator-staging time)

Files MODIFIED by this lane:
- `CLAUDE.md` — 4 count drifts refreshed.
- `README.md` — 4 count drifts refreshed.
- `DESIGN.md` — 3 drifts refreshed (count + carousel-subpath substrate row).
- `MIGRATION.md` — 2 count drifts refreshed.
- `docs/tranches/M/waves/W0.md` — status: CLOSED + close-evidence.
- `docs/tranches/M/waves/W1.md` — status: CLOSED + close-evidence.
- `docs/tranches/M/waves/W2.md` — status wording refined.
- `docs/tranches/M/waves/W3.md` — status: IN-PROGRESS + lane dispatch.
- `docs/tranches/M/waves/W4.md` — status wording refined.
- `docs/tranches/M/coordination/CONSTELLATION.md` — header date + §1 glass-ui + speedtest rows + §9 restructured.
- `docs/tranches/M/PROGRESS.md` — status table close-hashes + W3 open dated entry.

Files CREATED by this lane:
- `docs/tranches/M/audit/W3-Lane-B-doc-cohort-proof.md` (this file).

No `src/**` writes. No demo-side writes. No cross-repo writes. No precept-submodule writes.

---

## § Verification

- `npm run typecheck` — 26 pre-existing errors in `demo/stories/data/timeline-{continuous,segmented}.vue` (AA tranche residuals from commits `53c7114` + `adf3018`); 0 errors caused by Lane B edits (docs don't affect typecheck). Surfaced in open questions §4.
- Cross-reference resolution — all subpath names (`@mkbabb/glass-ui/{api,dark,keyboard,carousel,forms,...}`) verified against `package.json` exports + `src/api/index.ts` + `src/components/custom/`; all commit hashes referenced (`e385879`, `0e0a9a9`, `08a2e9c`, `b788205`, `301a95e`, `0f16925`, `e06d629`, `4bffa90f`) verified against `git log --oneline` at HEAD.
- File-path references — every doc cross-reference (audit/W0-*, audit/W1-Lane-*, coordination/CONSTELLATION.md, etc.) verified to exist at the worktree path.

---

## § Doc refresh count

**14 docs touched, 1 created**:

- 4 glass-ui top-level docs refreshed: CLAUDE.md, README.md, DESIGN.md, MIGRATION.md.
- 5 wave specs refreshed: W0.md (CLOSED), W1.md (CLOSED), W2.md (refined), W3.md (IN-PROGRESS), W4.md (refined).
- 1 coordination doc refreshed: CONSTELLATION.md (header + §1 + §9).
- 1 progress log refreshed: PROGRESS.md.
- 1 lane proof doc CREATED: this file.

CHANGELOG.md untouched (no M.W1/W3 substrate delta in glass-ui src).
