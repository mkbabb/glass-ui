# P2 — THE 18 CLAUDE-READER GATE DISPOSITION TABLE

Repo `/Users/mkbabb/Programming/glass-ui` @ `tranche/BG`, 4.2.0 → BH 5.0.0.
Unblocks B4 (CLAUDE delete) + B5c (gate re-home). The silent-loss fence: every gate
that `readFileSync`s CLAUDE.md ENOENT/RED-breaks on deletion unless re-homed FIRST.

Artifacts (all RAN): `detect-claude-readers.mjs` (heuristic classifier),
`disposition-table.mjs` → `DISPOSITION-TABLE.json` (hand-verified), `canon-doc.mjs`
(the resolver seam), `worked-repoints.mjs` (3 gates re-pointed, executed).

## 1. COUNT RECONCILIATION (13 vs 18 vs 26)

`grep -rl CLAUDE.md scripts/` = 42 files; of those, 12 are `wf-*.js` workflow
authoring scripts + `lighthouse/.../vite.config.mts` + a `__tests__` unit = 14
non-gate. **26 `scripts/proof-*.mjs` reference CLAUDE.md** — the reference-total.

| count | meaning | members |
|---|---|---|
| **26** | reference-total — any proof-*.mjs containing the string `CLAUDE.md` | all below |
| **18** | code-level touch — CLAUDE.md appears in CODE (not just a `//` comment) | 16 content-readers + 1 FENCE + 1 DEAD_VAR |
| **16** | content-readers — read CLAUDE bytes into a clause | 15 HARD_ASSERT + 1 WARN_DEGRADE |
| **13** | byte-parse subset — the canonical `safeRead(P.CLAUDE_MD)→claudeMd` pattern | 16 content-readers MINUS 3 bespoke-named readers (handmark `rd`, dock-rail-realize `readRel`, readme-meta-clean `cm`) + the unguarded-direct structure-sync = the strict-pattern set the byte census saw |

The "18" the synthesis carried = the 18 code-level touchers. The真 must-re-home set
is the **16 content-readers** (the FENCE + DEAD_VAR are 2-line edits, not re-homes).

## 2. THE DISPOSITION TABLE (26 rows; 16 must re-home)

KIND legend: HARD_ASSERT = REDs/ENOENT on delete · WARN_DEGRADE = silently loses a
WARN-fact · FENCE = CLAUDE.md only in a write-allowlist · DEAD_VAR = defines a path
it never reads · MENTION = comment only.

### HARD_ASSERT (15) — re-home BEFORE delete

| gate | asserts (PATH:LINE) | disposition | NEW readFileSync target | canon key |
|---|---|---|---|---|
| proof:claude-structure-sync | §Structure custom/ ≡ disk + count (L74 **ENOENT-unguarded**, L129/143) | RE-HOME (split) | docs/canon/structure.md | `structure` (+ split png-arm → new proof:visual-png-tracked) |
| proof:doc-consistency | cited custom/<dir> resolve (L83/164) + Dependencies-table pkgs resolve (L120/173); **CI+local** | RE-HOME (split) | structure.md + dependencies.md | `structure`+`dependencies` |
| proof:doc-override-idiom | override-the-primitive example + canon, byte-parity (L113/143/192/202) | RE-HOME (drop CLAUDE arm) | README.md (sole) | `readme` |
| proof:dock-unify | F5 nav-pattern + collapsed-floor tokens + glass active register (L630, L534-554) | RE-HOME | dock/README.md (after BG WS2) | `component:dock` |
| proof:dock-rail-realize | R5 stale proof:rail3/seam-offset GONE + facet mode documented (L258, L266-280) | RE-HOME | dock/README.md | `component:dock` |
| proof:dropdown-fix | D3 .scroll-gutter-stable discipline (L401, L255-259) | RE-HOME | docs/canon/consumer-wiring.md | `consumer-wiring` |
| proof:easing-primitive | W5 EasingPicker/easing + boundary law (L87, L270-281) | RE-HOME (split) | easing/README.md + motion-system.md | `component:easing`+`motion-system` |
| proof:on-glass-fg | on-glass-muted/--input-on-glass/--progress-track-on-glass (L399, L230-232) | RE-HOME | docs/canon/glass-system.md | `glass-system` |
| proof:phase-palette | W4 InstrumentChassis phase canon / --phase-complete-color (L73/335, L227) | RE-HOME | instrument-chassis/README.md | `component:instrument-chassis` |
| proof:readme-meta-clean | no phantom composable / removed-gate; kf peer ^5; no stale luma claim (L20/221, L222-233); **CI+local CANARY** | RE-HOME (split; PARTIAL RETIRE) | README.md + dependencies.md | `readme`+`dependencies` |
| proof:spa-view | W5 SpaView + /spa-view (L74, L228-233) | RE-HOME (split) | spa-view/README.md + structure.md | `component:spa-view`+`structure` |
| proof:split-chars | SP6 §Structure enumerates split-chars/ (L99, L311) | RE-HOME (fold) | docs/canon/structure.md | `structure` |
| proof:surface-axis | W7 doc-honest <Toast/Button surface=…> example ⟺ .vue prop (L499, L438-465) | RE-HOME | docs/canon/glass-system.md | `glass-system` (constraint §4) |
| proof:close-battery-parity | clause-4 --run full = local∪ci∪release siblings-absent canon (L88/93) | RE-HOME | docs/canon/build-and-gates.md | `build-and-gates` |
| proof:handmark | W6 three-register fence + HandMark family (L249/252) | RE-HOME | handmark/README.md | `component:handmark` |

### WARN_DEGRADE (1) — re-home or drop the soft read

| proof:accent-tone | §Structure selectable-chip/ WARN-fact, "NOT a hard violation" (L353/361) | **DROP the read** (structure-sync owns the hard arm) | — | `structure` (or delete) |

### FENCE / DEAD_VAR / MENTION — 2-line edits / no-op (10)

- **FENCE** proof:crossrepo-asks (L56) — CLAUDE.md in the allowed-touch array; **EDIT**: drop the entry. No doc home.
- **DEAD_VAR** proof:expandable-part (L66) — defines `CLAUDE_MD`, never reads it; **EDIT**: delete the key.
- **MENTION** (8, comment-only, NO action): page-chassis, page-hierarchy, peer-optional, scroll-trigger, spring-tokens-synced, storybook-meta, visual-runner, viz-configurator-suite. Optional comment scrub.

## 3. THE RESOLVER SEAM — scripts/lib/canon-doc.mjs

DRY: one map (`CANON_HOMES`) names every home; 16 gates re-point through `canonDoc(key)`
/ `readCanon(key)`. Re-homing a contract later = edit ONE entry, not N gates.
Fail-explicit: `canonDoc` THROWS on unknown key; `readCanon(key,"strict")` THROWS
ENOENT on an absent home (a re-homed gate REDs loud, never passes on a vanished doc —
the silent-loss fence). `auditCanonHomes()` is the standing BH-close check.
`readCanon(key,"soft")` is the ONLY escape (the accent-tone WARN reader, if kept).

Worked + RAN (`worked-repoints.reporoot.mjs`): handmark.W6 → **RED** (README resolves
but lacks the contract text yet → proves the contract must be ADDED first);
on-glass-fg.W4 + close-battery.clause4 → **THROW fail-explicit** (homes absent → loud).

## 4. DOC-HOME DEPENDENCY LIST — the order constraint (redistribute → re-home → delete)

`auditCanonHomes()` (RAN) — these homes are ABSENT and MUST be authored BEFORE the
named gates re-point:

**docs/canon/ (entirely absent — author all 9; 6 are gate-load-bearing):**
- structure.md ← claude-structure-sync, doc-consistency(DIRS), split-chars, spa-view, accent-tone
- dependencies.md ← doc-consistency(DEPS), readme-meta-clean
- build-and-gates.md ← close-battery-parity
- glass-system.md ← on-glass-fg, surface-axis
- motion-system.md ← easing-primitive(boundary-law arm)
- consumer-wiring.md ← dropdown-fix
- conventions.md / design-axes.md / exports-and-subpaths.md ← (no gate; B4b authoring completeness)

**per-component READMEs — 1 absent, 4 exist-but-need-contract-text:**
- instrument-chassis/README.md — **ABSENT, must author** ← phase-palette
- dock/README.md — exists; **add** nav-pattern + collapsed-floor + active-register + facet-mode + (stale proof:rail3 GONE) ← dock-unify, dock-rail-realize. Author **after BG WS2**.
- easing/README.md — exists; **add** EasingPicker/easing naming ← easing-primitive
- handmark/README.md — exists; **add** three-register fence + family ← handmark (proven RED today)
- spa-view/README.md — exists; **add** SpaView + /spa-view note ← spa-view

**README.md (exists) — verify it carries:** the override-the-primitive example + canon
(doc-override-idiom), the kf-peer ^5 + no-phantom discipline (readme-meta-clean).

ORDER (load-bearing): (1) author docs/canon/* + instrument-chassis README + inject the
contract text into the 4 existing READMEs + README.md → (2) re-point the 16 gates through
canon-doc.mjs (single post-BG gates.mjs pass, after WS1/7/10/12) → (3) DELETE CLAUDE.md
(B4f, absolute last). `auditCanonHomes()` GREEN is the gate on step (1)→(2).

## 5. UN-REHOMABLE / WRINKLE FLAGS (no gate is strictly un-rehomable; 3 carry constraints)

1. **proof:readme-meta-clean — PARTIAL RETIRE.** Its "no phantom composable in CLAUDE.md
   / no removed-gate-name in CLAUDE.md" arm has nothing to scan once CLAUDE.md is gone
   (the monolith was the phantom-bearing surface). Disposition: the deps-line + luma arms
   RE-HOME (dependencies.md / glass-system.md); the CLAUDE-phantom scan either RETIRES or
   GENERALIZES to scan the docs/canon SET. Recommend retire the phantom-scan (canon docs
   are authored fresh, no legacy phantoms) — flag for B5c author decision.
2. **proof:surface-axis W7 — AUTHORING CONSTRAINT.** The doc-honesty check needs the
   LITERAL `<Toast surface=…>` / `<Button surface=…>` example strings to exist in
   glass-system.md (it cross-checks the documented example ⟺ the .vue prop). glass-system.md
   MUST carry the literal surface-prop examples, not prose-only — else W7 has nothing to bite.
3. **proof:accent-tone WARN read — DROP not re-home.** It duplicates structure-sync's hard
   arm as a soft WARN. Cleanest: delete the CLAUDE read (let structure-sync own it via
   structure.md). No new home needed; net −1 reader.

Net: 16 content-readers → after migration, 15 re-home through canon-doc.mjs, 1 (accent-tone)
drops; 1 (readme-meta-clean) splits with a partial retire; 2 (crossrepo/expandable) are 2-line edits.
