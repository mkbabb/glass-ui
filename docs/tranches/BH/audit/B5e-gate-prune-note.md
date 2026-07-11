# BH.B5e — gate-prune execution note (the net-negative instrument)

The residual of `BH.B5-gate-consolidate` after B5a/B5b/B5c landed. B5d (the
164-script detector-kit refactor) stays a **DEFERRED clause** per the row — NOT
built here. This note records what B5e executed + the census-governed remainder.

## The three B5e mechanisms (per the cursor row + PLAN §4.9 / build-map §B5e)

> `--list` byte-identical (B5b) THEN count DROPS (B5e — **family-π collapse** +
> the **14 doc-presence clause deletes** + the **2 readers dissolved to
> regen-freshness**).

### (2) The 14 doc-presence `claudeMd` clause deletes — DONE

Each of the 14 named gates had a doc-presence sub-clause (B5c re-homed it off
`CLAUDE.md` onto a `docs/canon` / `docs/design` home via `readCanon`/`readDesign`).
B5e **DELETES that sub-clause** ("keep every functional clause"). Canon-home
authoring is now asserted SOLELY by `proof:claude-deletable` (content-complete at
the new home) + `proof:doc-consistency` / `proof:claude-structure-sync`
(regen-freshness), so the per-wave gates no longer couple to doc prose.

| # | gate | clause dropped | remaining functional clauses | result |
|---|------|----------------|------------------------------|--------|
| 1 | `proof:surface-axis` | W7 (glass-system canon `<Toast/Button surface=…>` doc-honesty) | W1-W6 (axis factored-once, resolver published, 11 surfaces thread the axis incl. Toast/Button via W3, Dialog clean break, control tier, paper-ink-mark) | PASS |
| 2 | `proof:spa-view` | W5 `claudeNamesComponent` (README names SpaView) | W1-W4 + W5 ≥2-consumer (evidence/demo/delta) | PASS |
| 3 | `proof:easing-primitive` | W5 easing-README + boundary-law + design-idioms idiom-home | W1-W4 + W5 api-publication (functional) | PASS |
| 4 | `proof:dropdown-fix` | D3 `canonNoteExists` (consumer-wiring doc note) | D1-D5 + D3 `.scroll-gutter-stable`-utility-ships | PASS |
| 5 | `proof:phase-palette` | W4 `claudeRecordsSeam` + `idiomsRecordsSeam` (README + design-idioms) | W1-W3 + W4 in-source silver-comment coherence + the W-NO-GRAY silver-source fence | PASS |
| 6 | `proof:dock-unify` | F5 (dock README nav-pattern/collapsed-tokens/glass-selected doc-reconcile) | F1-F4 (functional) | pre-existing F4-census FAIL (see below) |
| 7 | `proof:split-chars` | SP6 `inClaudeStructure` (structure.md `- split-chars/` bullet) | SP1-SP5 + SP6 dir/root-barrel/api (structure.md freshness owned by `proof:claude-structure-sync`) | PASS |
| 8 | `proof:handmark` | W6 `canonHandmark` (handmark README three-register fence) | W1-W7 incl. W6 structural `.paper-ink-mark` STRAIGHT fence | PASS |
| 9 | `proof:on-glass-fg` | W4 `claudeRecorded` + `migrationRecorded` (glass-system canon + MIGRATION) | W1-W3 + W4 consumer-reads (well/track var() reads) | PASS |
| 10 | `proof:readme-meta-clean` | the `readCanonCorpus()` cross-cutting DOC-SYNC block (phantom-composable / keyframes-peer / luma-RESERVE over the 9 canon homes) | the four component-README meta-strip + research-citation + goo-blob/glass.css/fourier-field/constellation source-sync | PASS |
| 11 | `proof:dock-rail-realize` | R5 (dock README doc-reconcile — stale `proof:rail3`/`rail3.spec`/`--dock-rail-seam-offset` gone) | R1-R4 + the extended `proof:dock-stack-rail` S1-S6 | PASS |
| 12 | `proof:close-battery-parity` | clause 4 `claudeCanon` (build-and-gates.md records the close-battery rule) | clauses 1-3 + clause 4 `proof:full` script assert + subprocess self-test | PASS |
| 13 | `proof:doc-override-idiom` | W4 `CANON_SIG` (consumer-wiring canon sentence) | W1-W3 (the CSS example overrides the `-radius` PRIMITIVE at the LIVE glass.css value + byte-parity) | PASS |
| 14 | `proof:accent-tone` | (already dropped by B5c — the `CLAUDE_MD §Structure` WARN-fact + the `src/subpaths/selectable-chip.ts` arm re-point) | A1-A6 | PASS (no B5e edit owed) |

Where the dropped sub-clause left a now-unused `readCanon`/`readDesign` import,
`claudeMd`/`idiomsMd`/`migrationMd` source read, self-test bite, or console line,
each was removed too (the gates carry no dead doc-read residue). `vue-tsc --noEmit`
clean (no `src/` touched). `proof:dock-unify` FAILs on **pre-existing** F4-census
drift (`demo/stories/dock/siri-island.vue` unaccounted + `demo/shell/AppShell.vue`
path-moved) introduced by **BG F7 (2026-07-10 demo-chassis colocation reshape,
`9f0a5285`)** — verified identical at HEAD *before* this wave (the F5 removal
reduced 3 passing doc clauses, added zero redness). The census re-ground is a
dock-band owner's task, out of B5e scope.

### (3) The 2 readers dissolved to regen-freshness — VERIFIED (B5c landed it)

- `proof:claude-structure-sync` clause (a) REGEN-FRESHNESS: `committed
  docs/canon/structure.md == structureFreshness()` (`regen-structure.mjs`) — the
  `committed==regen` form, no `readFileSync(CLAUDE_MD)`. (The clean-tree png-arm
  split to `proof:visual-png-tracked` noted in its header as a further B5e step is
  NOT owed by the cursor row — the reader is already CLAUDE-read-free.)
- `proof:doc-consistency`: reads the GENERATED `docs/canon/structure.md` (custom-dir
  arm) + `docs/canon/dependencies.md` table (dep-rot arm) via `readCanon(…,"strict")`
  — dep-rot over the generated table, no `readFileSync(CLAUDE_MD)`, neither arm
  tautological (a stale regen reds honestly).

No `readFileSync(CLAUDE_MD)` survives in either reader. Discharged.

### (1) The family-π collapse `--list` count DROP — CENSUS-DEFERRED (band-gate infra absent)

The `--list` count DROP is driven by the **family-π collapse** — "the per-wave
π-presence gates collapse into `proof:{glass,motion,dock,feedback}-band` category
gates." That collapse **requires the band category gates to exist as the subsuming
gate**. They do NOT: `proof:{glass,motion,dock,paper,feedback}-band` are absent on
disk (no npm scripts, no `scripts/proof-*-band.mjs`). F8.1
(`W-GATE-FAMILY-CONSOLIDATE`) landed the **transposition MACHINERY** (the detector
kit `scripts/lib/detect/` + the census + `proof:warm-identity` PRIMARY wiring) and
**explicitly recorded that the physical `--list` count DROP rides BH.B5e**, while
warning the mass-delete "would conflict with every landed wave and risk the build."

A safe family-π collapse needs ONE of:
- **the 5 band roster gates built** as real holistic per-surface acceptance gates
  that SUBSUME the ~150 per-wave source/π clauses (extend the `proof:ba-gestalt`
  roster model) — which needs the members to expose composable check-functions =
  the **B5d detector-kit refactor (164-script blast radius), DEFERRED past BH**; or
- **an enumerated safe-to-retire set** where each pruned gate's assertion is proven
  DUPLICATED by a surviving gate.

Neither exists on the current tree. The audit below found **no safe row-retire**:

| candidate class | verdict |
|---|---|
| the 14 doc-clause gates | each retains functional source clauses (W1-W6, D1-D5, …) — clause-drop ≠ row-drop; NONE fully empties |
| `proof:page-redesign` (grep matched `proof:grid-simple` "supersedes") | NOT subsumed — grid-simple = in-card grid ABROGATE; page-redesign = AX.W60 glass-over-background source arm; disjoint. Retiring loses the assertion |
| the 29 live-π PW-spawning gates | the manifest's "binding close" set; retiring relies solely on `--run pi` + `proof:live-verified-ledger` — a real reduction in what `--run full` (the imminent USER-AUTHORIZED 5.0.0 release close) executes. Foldable per the census, but unsafe to unilaterally cut pre-cut without band-gate subsumption |
| dead-script / no-npm gates | 0 found (all backed) |
| `:selftest` dark matter (`proof:blob-affect-interact:selftest`, `proof:viz:selftest`) | NOT `gatesFor()` rows → absent from `--list`; retiring them does not move the count (gate-manifest-sound clause 10 flags them; the parent gates gate `selfTest()` behind `--selftest`, so removing the scripts would drop anti-evasion coverage — a viz `release`-gate behavior change, left as a pre-existing observation) |

**Result: `--list` is BYTE-IDENTICAL (local 377 · ci 345 · release 137 · full
406).** The count DROP is the census-governed remainder — it lands when the band-gate
roster infrastructure (B5d-gated) exists. This note IS the required subsumption
census: it enumerates every count-drop candidate → why it is not yet safely
retireable → its intended subsuming mechanism (the 5 `*-band` gates + `--run pi` +
`proof:live-verified-ledger`). PROTECT set (never folds — F8.1 census):
`live-verified-ledger` · `bg-deferred-ledger` · `profile:budget` · `ui-scale`
(dock-coarse) · `dock-plate-clearance` (`0px`) · `adaptive-reconcile`.

## ci.yml re-emit

`gates:emit-ci` re-generated `.github/workflows/ci.yml` (it had DRIFTED at HEAD —
`proof:eyeglass-tabs` added to the manifest by BG.W-EYEGLASS-TABS without a
re-emit; ci.yml still carried `proof:liquid-tab`). `proof:gen-ci-fresh` GREEN
(byte-identical), `gates:verify-ci` GREEN (345 ci gates match). This drop was NOT
demanded by a gate-row change (B5e removed no gate rows) — it fixed a pre-existing
BG drift blocking the RELEASE-set `proof:gen-ci-fresh`.

## Acceptance-gate status

- `proof:claude-deletable` — **GREEN** (0 reader-form readers · 0 bare readFileSync · 0 dead path-literals · homes content-complete).
- `proof:gen-ci-fresh` — **GREEN** (ci.yml byte-identical to `--emit-ci`).
- `proof:gate-manifest-sound` — clause 11 MANIFEST-EXTRACTED GREEN (`--list` 4-mode byte-identity intact); the overall FAIL is **pre-existing environmental** (dirty-tree scratch-PNGs, stale AZ delta freshness-hashes W-DOCK1/2·W-CON1, the `AX-dock-animation-live.json` server-down cache, `gate-script-parity`/`tag-parity` long-standing orphan scripts, `proof:all` timeout) — the SAME set B5c documented as not-this-wave. B5e added no violation.
- `vue-tsc --noEmit` — clean.
