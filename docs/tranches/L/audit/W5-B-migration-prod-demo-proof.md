# L.W5 Lane B — MIGRATION.md + production-demo-build disposition proof

**Wave**: L.W5 — doc cohort + production-demo-build decision + migration guide.
**Lane**: B — MIGRATION.md re-author + production-demo-build binary disposition.
**Status**: COMPLETE.
**Date**: 2026-05-11.
**Read-only git**: confirmed; no `git add` / `commit` / `stash` / `checkout`
/ `reset` / `restore`.

Lane A (parallel — separate agent) handles CLAUDE.md / README.md / DESIGN.md
+ K R3 / R4 status-line bumps and token-rung gaps. Lane B coordinates with
Lane A only via append on `CHANGELOG.md` (each lane appends its section).

---

## § MIGRATION.md structure + section count

The skeleton MIGRATION.md (193 LOC, authored at L.W3 by lanes that landed
W3 retirements) is re-authored comprehensively. Final shape:

| § | Section | Purpose |
|---|---|---|
| 0 | Header + intro paragraph | Identifies v1.0 as L cohort; enumerates the four architectural transpositions; cites L invariant 4 (no backwards-compat shims). |
| 1 | At a glance | 9-bullet summary of every break — vueuse-bearing root-barrel removal, subpath flatten, /carousel, /api, retired composables, retired primitive, composables restructure, production demo build retire, speedtest worked example pointer. |
| 2 | Before you migrate | 5-step pre-flight checklist (pin v0.9.4, run tests, inventory imports, plan atomic commit, read cohabitation note). |
| 3 | Breaking changes | Five top-level breaks: |
| 3.1 | Root-barrel curation (Phase 2 SCC trap) | `/forms`, `/carousel`, `/dark`, `/keyboard` migration tables + before/after snippets. |
| 3.2 | Subpath flatten | `composables/{dark,keyboard}` → flat `/dark` + `/keyboard`; sed codemod hint; `ERR_PACKAGE_PATH_NOT_EXPORTED` retired-subpath verification. |
| 3.3 | Composable retirements | `useOffsetPagination`, `useVirtualSectionWindow`, `useWindowedStore`, `virtualSectionLayout` — REMOVED with rationale + migration path. KEPT-via-cross-repo table (useRAFLoop, useIntersectionPause, useDarkModeSync). |
| 3.4 | Primitive retirements | `<DockShowcaseFrame>` REMOVED (demo-private; no surface impact). KEPT-with-2nd-consumer-wired table (DiscoGlyph, DockGroup, InstrumentChassis). |
| 3.5 | Composables restructure (internal re-org) | Deep-relative-path migration table; new sub-tree layout (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`, `sidebar/`, `sortable/`). |
| 4 | New surfaces in v1.0 | `/api` discovery layer (32 symbols enumerated); `/carousel` pointer back to §3.1.2. |
| 5 | Recommended new surfaces | Per-package subpath imports for tree-shake — speedtest's deltas as worked example. |
| 6 | Cohabitation note | v0.9.4 stays supported indefinitely; no scheduled EOL. |
| 7 | Worked example — speedtest re-link | Commit `98f88325` migration; rewrite-time table; cross-repo verification ledger (modulepreload 1→0; entry chunk -32.5 KB; glass-ui dist -11.2 KB gz / -65 KB raw). |
| 8 | Production demo build — formal retire | Option B disposition + rationale (dev-mode-only; consumer-deploy concerns external; speedtest is reference). |
| 9 | Verification checklist | 7 numbered bash probes (build + typecheck + 4 `rg` zero-hit sweeps + bundle re-probe). |
| 10 | Reference | Pointers to CHANGELOG, L.md, audit proofs (W1-A/B/C, W3-A/B), coordination/speedtest-Y.md, Rε, speedtest re-link commit. |

**Section count**: 11 top-level `##` headings (At a glance, Before you
migrate, Breaking changes, New surfaces, Recommended new surfaces,
Cohabitation note, Worked example, Production demo build, Verification
checklist, Reference + intro). **Subsection count**: 5 under "Breaking
changes" (§3.1–§3.5) + 5 under §3.1 + 2 under §3.2 + 4 under §3.3 + 1
under §3.4. Final file: ~430 LOC (vs. 193 LOC skeleton).

---

## § Total breaks documented

Enumerated across §3.1–§3.5 + §8:

| # | Break | Source proof |
|---|---|---|
| 1 | `Input` root-barrel → `/forms` | W1-A § Symbols removed |
| 2 | `Textarea` root-barrel → `/forms` | W1-A |
| 3 | `Combobox` + 11 `Combobox*` family → `/forms` | W1-A |
| 4 | `Carousel` + 7 `Carousel*` + `useCarousel` + `CarouselApi` → `/carousel` | W1-A + W1-C |
| 5 | `useGlobalDark` root-barrel → `/dark` | W1-A + W1-C |
| 6 | `useKeyboardShortcuts` family (9 symbols) → `/keyboard` | W1-A + W1-C |
| 7 | `/composables/dark` nested subpath → flat `/dark` | W1-C § Before vs After |
| 8 | `/composables/keyboard` nested subpath → flat `/keyboard` | W1-C |
| 9 | `useOffsetPagination` REMOVED | W3-A § Disposition |
| 10 | `useVirtualSectionWindow` REMOVED | W3-A |
| 11 | `useWindowedStore` REMOVED | W3-A |
| 12 | `virtualSectionLayout` helpers (4 fns + 4 types) REMOVED | W3-A |
| 13 | `@mkbabb/glass-ui/pagination` subpath retired | W3-A § Files modified |
| 14 | `@mkbabb/glass-ui/virtual` subpath retired | W3-A |
| 15 | `<DockShowcaseFrame>` REMOVED (demo-private; no public-surface impact) | W3-B |
| 16 | `dist/dark-subpath.{js,d.ts}` artefact rename → `dist/dark.{js,d.ts}` | W1-C |
| 17 | `dist/keyboard-subpath.{js,d.ts}` artefact rename → `dist/keyboard.{js,d.ts}` | W1-C |
| 18 | Composables deep-relative paths (8 paths in W2 restructure) | W2-A § Moves table |
| 19 | Production demo build NOT shipped (formal retire) | this proof (Lane B disposition) |

**Total counts**:
- 17 public-surface breaks (vueuse-bearing root-barrel removal across §3.1
  is 6 break-groups across ~30 symbol names; subpath flatten is 2 breaks;
  composable retirements are 6 retired symbols / 2 subpaths; primitive
  retirement is 1; dist-filename renames are 2).
- 1 demo-private retirement (no consumer impact).
- 8 internal deep-relative path moves (W2 restructure — affects only
  consumers reaching into `node_modules/@mkbabb/glass-ui/src/composables/...`).
- 1 build-target disposition (formal retire).

Speedtest is the canonical second consumer that exercised the migration
end-to-end (commit `98f88325` — 15 files, 4 import-pattern classes,
-32.5 KB entry-chunk gz).

---

## § Codemod hints provided

The guide ships 3 categories of codemod scaffolds:

1. **Inventory rg patterns** (under §"Before you migrate" + §"Verification
   checklist"):
   - `rg 'from "@mkbabb/glass-ui"' src/` — every root-barrel call site.
   - Filter: `rg -l 'from "@mkbabb/glass-ui"' src/ | xargs rg -l '\b(Input|Textarea|Combobox|Carousel|...)\b'` — sites touching moved symbols.
   - `rg '"@mkbabb/glass-ui/composables/(dark|keyboard)"' src/` — retired-subpath sites.
   - `rg '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|...)\b' src/` — retired-composable sites.
   - `rg '"@mkbabb/glass-ui/(pagination|virtual)"' src/` — retired-subpath sites.

2. **Mechanical rewrite patterns** (under §1.5 "Codemod hints"):
   - Single-import-line rewrite (replace root-barrel module path with
     subpath).
   - Mixed-import-line split (factor moved symbols out of a shared
     import).

3. **Sed scripts** (under §2 "Subpath flatten"):
   - `sed -i ''` one-liner for `composables/{dark,keyboard}` → flat
     subpath rewrite.

The guide explicitly cites speedtest's `98f88325` as evidence that a
scripted codemod is NOT required — an editor multi-cursor pass over the
inventory's output is the canonical workflow (~30 min for 15 files).

---

## § Production-demo-build decision

**Disposition**: Option B — formally retire the demo storybook as a
deploy target.

**Rationale**:

1. **The demo is dev-mode authoring substrate** — canonical workflow is
   `npm run dev` → Vite dev server. Demo storybook pages exist to
   exercise components during library development, not to be published.

2. **Lighthouse audits run against dev server** — K.W4 + L.W6 Lighthouse
   passes used `npm run dev` with the documented dev-mode caveat. No
   production demo bundle was needed for those audits; the dev-mode
   caveat is acceptable because audit signal is comparative (pre/post
   token changes, etc.), not absolute.

3. **Consumer-deploy concerns are external** — CloudFlare Pages, Vercel,
   GitHub Pages hosting; cache-TTL; static asset pipelines — these
   belong to consumer repositories. Speedtest is the canonical reference
   for consumers that need a static deploy target with its own
   `vite.config.ts` (the consumer-side build, not glass-ui's).

4. **Shipping a `vite.demo.config.ts` is gold-plating** — would create a
   second build target this library does not need to maintain. The
   bundle-budget gate already covers the library bundle (`dist/glass-ui.js`);
   extending it to cover a demo build adds complexity without a clear
   binding consumer need.

5. **Per the wave spec default**: "Default Option B (less work; pragmatic;
   demo is internal storybook)." User intent at wave-spec authorship time
   was Option B unless a user push for Option A surfaced. No such push
   surfaced.

**Documented in**:
- `CHANGELOG.md` — new "### Production demo build — formal retire" section
  under the v1.0.0 stanza (inserted between W3 Lane B primitive section
  and the v0.9.4 entry).
- `MIGRATION.md` — §"Production demo build — formal retire" section
  (between §"Worked example — speedtest re-link" and §"Verification
  checklist").
- This proof doc (canonical decision record).

**Lane A coordination**: Lane A owns DESIGN.md + README.md. The
production-demo-build retire CAN be referenced in DESIGN.md (architectural
decision record) and/or README.md (consumer-facing doc), but this is
Lane A territory per file bounds. Lane B's CHANGELOG + MIGRATION
disposition is sufficient for the W5 hard gate (f) "production-demo-build
decision binary."

**No files created by Lane B**:
- No `vite.demo.config.ts`.
- No new `npm run build:demo` script in `package.json`.
- No `dist-demo/` output path.
- No extended `profile:budget` gate for demo build sizes.

---

## § Verification status

| Check | Result |
|---|---|
| `npm run typecheck` | PASS — vue-tsc --noEmit clean, zero diagnostics. |
| `npm test` | PASS — 330/330 tests across 27 files (2.99s duration). |
| `NODE_OPTIONS=--max-old-space-size=8192 npm run build` | PASS — built in 30.08s; declaration files in 29.2s. vite-plugin-dts API-Extractor TS 5.9 warnings are pre-existing (cosmetic, not introduced by Lane B). |

---

## § Worktree-diff verification

```
$ git status --short
 M CHANGELOG.md
 M MIGRATION.md
?? docs/tranches/L/audit/W5-B-migration-prod-demo-proof.md
```

Three touched paths total:

1. **`MIGRATION.md`** — re-authored from the 193-LOC W3 skeleton to a
   ~430-LOC comprehensive v0.9.x → v1.0 guide (11 top-level sections,
   17 documented breaks + 1 demo-private retirement + 8 internal moves
   + 1 build-target disposition).

2. **`CHANGELOG.md`** — appended one section under the v1.0.0 stanza
   ("### Production demo build — formal retire (L.W5 Lane B Option B)").
   Lane A may also append to v1.0.0 stanza (CLAUDE/README/DESIGN aligned
   sections) — coordinated via append, no Lane A territory touched by
   Lane B.

3. **`docs/tranches/L/audit/W5-B-migration-prod-demo-proof.md`** — this
   proof doc.

**MUST NOT TOUCH** boundary verification:
- `CLAUDE.md` — not touched (Lane A).
- `README.md` — not touched (Lane A).
- `DESIGN.md` — not touched (Lane A).
- `src/styles/tokens.css` / `theme.css` — not touched (Lane A; K R4 territory).
- Wave-spec status lines (`docs/tranches/L/waves/W*.md`,
  `docs/tranches/K/waves/W*.md`) — not touched (Lane A; K R3 territory).
- W6 territory (Lighthouse cohort) — not touched.
- W7 territory (keyframes lift + aurora chrome) — not touched.
- `package.json` — not touched (no new script added per Option B).
- `vite.library.ts` — not touched.

Read-only git: orchestrator owns the index; this lane authored 3 files
without staging or committing.

---

## § Open questions for orchestrator

1. **CHANGELOG v1.0.0 header date** — the stanza currently reads
   `unreleased`. Should it bump to `2026-05-11` at W5 close (W8 + tag
   land same day)? Lane B did not modify the header date; defer to
   orchestrator's W5 close commit OR the actual `v1.0` tag-push wave.

2. **MIGRATION.md tone vs. CLAUDE-style canon** — Lane B's writing
   follows the user's documented preferences (no grandiloquence, no
   editorializing, no over-punctuation, em dashes without spaces, levity
   maintained). If Lane A finds drift between MIGRATION.md and the
   CLAUDE.md / README.md voice at W5 close ceremony, coordinate via the
   shared review pass.

3. **K R3 status-line bumps** — Lane A territory. Lane B did NOT touch
   any wave-spec status lines; defer to Lane A's proof doc for the
   K W{0..8} + L W{0..6} status reconciliation.

4. **K R4 (--surface-tint rung gaps)** — Lane A territory. Lane B did
   NOT touch tokens.css / theme.css / glass.css / Slider.vue /
   GlassTimeline.vue / UnderlineTabs.vue. Defer to Lane A's K R4
   Option A migration OR Option B documentation.

5. **MIGRATION.md location vs. docs/MIGRATION-v1.md** — the wave spec
   left the location optional ("top-level OR `docs/MIGRATION-v1.md`;
   default top-level for discoverability"). The skeleton lived at
   `/MIGRATION.md` (top-level) so Lane B preserved that location. If
   Lane A's doc cohort surfaces a different convention (e.g., DESIGN.md
   references `docs/MIGRATION-v1.md`), the move is a one-step rename
   that orchestrator handles post-W5.

6. **Consumer-discovery of MIGRATION.md** — README.md (Lane A) should
   include a top-of-file "v1.0 release — see MIGRATION.md for v0.9.x
   migration" callout per L invariant 16. Flag for Lane A.

7. **`scripts/release.sh` subpath probe coverage** — Lane B's
   verification checklist includes `node -e 'import("@mkbabb/glass-ui/<sp>")'`
   probe semantics but the actual release.sh probe list updates (drop
   retired subpaths; add `/api`, `/dark`, `/keyboard`, `/carousel`,
   confirm `/pagination` + `/virtual` removed) are L W0 Lane III
   territory (already landed). Confirm at W8 close ceremony.

8. **Demo build decision propagation** — if Lane A's DESIGN.md walk
   surfaces the production-demo-build disposition as a binding
   architectural decision (per L invariant 5 — design axes), Lane A
   adds a one-line entry referencing MIGRATION.md §"Production demo
   build." Lane B's CHANGELOG + MIGRATION sections are sufficient for
   the hard gate; DESIGN.md cross-reference is polish.

---

## § Hard-gate alignment (W5 Lane B contribution)

Per W5 wave spec, Lane B contributes to:

| Gate | Status |
|---|---|
| (c) MIGRATION.md ships canonical migration path | DONE — ~430-LOC re-author, 17 breaks + 1 retirement + 8 moves + 1 disposition documented; codemod hints; verification checklist; speedtest worked example. |
| (f) Production-demo-build decision binary | DONE — Option B (formal retire); documented in CHANGELOG + MIGRATION + this proof. |
| (g) `npm run typecheck` + build green | DONE — typecheck clean; build 30.08s; tests 330/330. |
| (h.B) Lane B proof doc landed | DONE — this file. |

Gates (a), (b), (d), (e), (h.A) are Lane A territory:
- (a) CLAUDE/README/DESIGN reflect v1.0 HEAD
- (b) CHANGELOG.md v1.0 entry comprehensive (Lane A appends doc-walk
  sections; Lane B already appended W1 + W3 + production-demo-build
  sections)
- (d) Wave-spec status lines bumped (K R3)
- (e) K R4 disposition recorded
- (h.A) `audit/W5-A-doc-cohort-proof.md`

Lane B's deliverables are integration-ready; orchestrator merges with
Lane A at W5 close commit.

---

## Authority

Lane B operated under the hardened agent git clause — read-only git
only, no `git add` / `commit` / `stash` / `checkout` / `reset` /
`restore`. The orchestrator owns integration of Lane A + Lane B diffs
into a single W5 close commit (`docs(tranche-l/w5): v1.0 doc cohort
+ MIGRATION.md + production-demo-build decision`).
