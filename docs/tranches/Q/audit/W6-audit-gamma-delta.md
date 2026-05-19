# Q.W6 strengthened audit — Lanes γ (doc-drift) + δ (idiomatic-gestalt)

**Wave**: Q.W6 close. **Mode**: read-only audit. **Date**: 2026-05-18.
**HEAD**: master (post-W5; glass-ui at v1.9.1).

## Charter

Two strengthened audit lanes of the Q.W6 13-lane close audit:

- **γ doc-drift** — verify `CLAUDE.md` / `DESIGN.md` / `CHANGELOG.md` reflect HEAD
  after the W3 component DEMOTE (`scroll-pane/` + `cartoon-card/` retired), the W3
  Lane D token-home rule, and the W4 `--scale-press` disposition.
- **δ idiomatic-gestalt** — verify every Q remediation was a fossil-deletion /
  idiomatic transposition, not new machinery; no legacy alias, no `variant=` compat
  path, no deferred TODO survives (invariant 28; `feedback_no_backwards_compat`).

Each γ finding is tagged **BLOCKING** (must fix before close) or **MINOR-absorb-inline**
(fix at close, non-blocking) per the P.W6 γ/δ precedent.

---

## Lane γ — doc-drift

### Method

- Counted `src/components/ui/` dirs: **42** total (`_shared` + `index.ts` + 40
  component dirs... corrected: 41 component package dirs + `_shared` = 42, `index.ts`
  is a file). `ls -1d src/components/ui/*/` = 42 dirs; minus `_shared` = **41 component
  packages**.
- Counted root-barrel `ui/` re-exports: `grep -c '^export \* from "./components/ui/'`
  in `src/index.ts` = **37**.
- Counted library build entries: `vite.library.ts` `resolve(rootDir, ...)` = **42**
  JS entries (root `index` + 41 flat subpaths).
- `grep` for `scroll-pane` / `cartoon-card` in `package.json`: **zero** — neither
  ever had a flat subpath (root-barrel-only components; confirmed by W3 Lane H proof).
- Verified `cards.css` cascade line, DESIGN.md token-home + scale-press blocks,
  CHANGELOG version headers.

### γ findings

| # | File:line | Drift | Verdict |
|---|---|---|---|
| γ-1 | `CLAUDE.md:172` | "It re-exports the **40** vueuse-free `ui/` package barrels" — stale. With 41 component packages post-W3 (was 43) minus 4 vueuse-bearing (`input`/`textarea`/`combobox`/`carousel`), the root barrel re-exports **37** `ui/` barrels. `grep -c` on `src/index.ts` confirms 37. The figure `40` was correct only when `ui/` held 44 component packages (44 − 4). The W3 Lane H proof scoped its CLAUDE.md edits to line 28 + line 247 + the `index.css` cascade comment — it did NOT sweep line 172. | **MINOR-absorb-inline** — single stale numeral; fix `40 → 37`. |
| γ-2 | `CLAUDE.md:14` | "with the **44-entry matrix** the per-entry type-graph walk allocates ≈6.7 GB" — stale. The library build matrix is **42 JS entries** (`vite.library.ts`: 42 `resolve()` calls). The `44` is a P.W4-era figure. W3 Lane H reduced the entry count by retiring 2 component packages (though neither had a flat subpath, the root barrel's re-export surface shrank and the per-entry dts walk count tracks the entry map). The W3 Lane H proof did not touch this prose. | **MINOR-absorb-inline** — heap-sizing prose; the 8 GB bump is unaffected, only the entry-count numeral is stale. Fix `44 → 42`. |

### γ items verified CLEAN (no drift)

- `CLAUDE.md:28` — `# 41 shadcn-vue base component packages + _shared (reka-ui)—42
  dirs total`. **Correct.** Matches `ls` (41 packages, 42 dirs). The charter's premise
  that this still reads `44`/`44` is stale — W3 Lane H already corrected it.
- `CLAUDE.md:150` — `cards.css # .paper-texture + @utility cartoon-surface
  (decoration-only; layers on a glass tier)`. **Correct.** Names `cartoon-surface`,
  not the deleted `.cartoon-card`. (Charter premise stale — already corrected.)
- `CLAUDE.md:247` — "ships **41 flat JS subpaths** ... (43 entries total in
  `package.json` exports)". **Correct.** `package.json` `exports` has 43 keys (`.` +
  `./styles` + 41 flat subpaths). The `/scroll-pane` + `/cartoon-card` subpaths never
  existed (W3 Lane H confirmed), so the subpath count is unaffected by the DEMOTE —
  the count is genuinely consistent, not coincidentally so.
- `DESIGN.md:31-40` — "Feature token home rule (Q-coh-4)" block present and accurate
  (W3 Lane D artefact). Names the `§<feature>` block convention; the W4 forward-ref
  at line 59 is consistent.
- `DESIGN.md:317,330-344` — `--scale-press` disposition documented. The "Press-scale
  tokens" block names the 3 shipped amplitudes (`--scale-press` / `--scale-press-sm`
  aka `-btn` / `--scale-press-dock`) and explicitly records the Q.W4 Lane D retiral
  of the `{xs,md,lg}` rungs. Cross-checked against `tokens.css:743-759` — matches HEAD
  exactly (`--scale-press`, `--scale-press-dock`, `--scale-press-sm`, `--scale-press-btn`
  alias; no `xs`/`md`/`lg`).
- `CHANGELOG.md` — entries `1.8.5` / `1.8.6` / `1.8.7` / `1.9.0` / `1.9.1` all present
  (lines 45 / 41 / 37 / 29 / 20). Content cross-checked against `PROGRESS.md` wave-close
  summaries: W0 proof gate + precept doc + AB+2 retrospective; W1 phantom-devDep retiral
  + `default` key + resolver sweep; W2 Card fail-explicit + bbnf-buddy migration; W3
  component DEMOTE + 3 substrate REVERTs + cohesion transpositions; W4 token co-location
  + CSS budget rebaseline. The `1.9.0` entry's "`ui/` package count 43 → 41" matches the
  W3 Lane H proof. All accurate.

### γ verdict — **MINOR**

Two stale numerals in `CLAUDE.md` (γ-1, γ-2), both numeral-only, both in prose the W3
Lane H CLAUDE.md edit did not sweep. Neither is BLOCKING — they are MINOR-absorb-inline
(the P.W6 γ precedent: stale `/api` count refreshed inline at close). DESIGN.md and
CHANGELOG.md are CLEAN. No structural or semantic doc-drift.

---

## Lane δ — idiomatic-gestalt

### Method

- Read the W1 Lane B (`default` key), W2 Lane A (Card fail-explicit), W3 Lanes B/E/F/G/H
  (cohesion + reverts + DEMOTE), W5 Lane DF (idiomatic-deadcode) proof docs.
- `grep` for `TODO` / `FIXME` / `@deprecated` / `backwards-compat` / `legacy alias` /
  `compat path` across `src/`.
- `grep` for `variant` in `Card.vue` + `card/index.ts` (the `variant=` compat-path
  probe).
- Cross-checked invariant 30/31 language between `Q.md §2`, the W0 precept doc
  `cross-repo-dev-resolution.md`, and the close docs.

### δ findings

**δ-1 — W1 is a deletion-class fix. CONFIRMED.** W1 Lane B retired the
`@mkbabb/value.js` phantom devDep ("the P.W5 band-aid") — a *deletion*. The publisher
`default` exports key it adds is the canonical terminal fallback the AD.W4
conditional-exports model omitted — not new machinery, the missing fourth key of an
existing 4-key contract shape (`development`/`types`/`import`/`default`). The proof doc
frames it explicitly: "the test runner now resolves nested-graph resolution, not the
retired phantom hoist." No alias, no shim.

**δ-2 — W3 reverts re-promote retired recipes. CONFIRMED.** W3 Lane E re-promoted
`.rainbow-vivid` / `.rainbow-pastel` / `.btn-interactive` as `@utility` recipes — undoing
the `b0debec` D.W2.D false-zero-site retiral. W3 Lane F retired the redundant
`typography.css` `:root` font-stack literals (`6ce14e5`). W3 Lane G retired the
IconTooltip `inline-flex` wrap-span (`25e1b5a`). All three are *deletions of a fossil
that fought an existing mechanism* (the consumer `@theme` override; the `w-full`
descendant contract) — re-promotion of a wrongly-retired recipe and retiral of wrongly-
added machinery. No new component, no new prop, no compat path.

**δ-3 — `<ScrollPane>` / `<CartoonCard>` DEMOTE is component-deletion folded into an
orthogonal prop. CONFIRMED.** W3 Lane H deleted both `ui/scroll-pane/` and
`ui/cartoon-card/` dirs (`rm -rf`, clean break). The replacement is Card's new
orthogonal `surface?: "glass" | "cartoon"` prop — *orthogonal* to `tier`/`shadow`/`grain`,
NOT a `tier` rung (Qχ §3 Shape A rejected precisely because a `tier="cartoon"` would
force/override sibling props — that would be API corruption). `<ScrollPane>` folds to a
pure consumer-side `<Card tier="wash" :grain="false">` recipe — no substrate addition at
all. The proof doc verification line confirms `grep -rn 'ScrollPane\|CartoonCard' src/`
returns only 2 prose doc-comment mentions (migration context), zero live code. No alias
per `feedback_no_backwards_compat`.

**δ-4 — Card `variant=` is NOT a compat path. CONFIRMED.** `Card.vue:53-55` references
`variant` only inside the W2 Lane A `useStalePropWarning` dev-WARN machinery — a
diagnostic that *names the stale prop and the canonical recipe* in a dev-only
`console.warn`, NOT a code path that honours `variant=`. The proof doc (W2 Lane A:142)
states explicitly: "dev-WARN posture, not typed-reject; no backwards-compat shim." A
consumer passing `variant="pane"` gets a warning and the prop is swallowed (falls to
`tier:"resting"`) — the component does not silently *accept* it as a working alias.

**δ-5 — zero deferred TODO / legacy alias in `src/`. CONFIRMED.** `grep` for `TODO` /
`FIXME` / `@deprecated` / `backwards-compat` / `legacy alias` across `src/` returns 2
hits, both negative-context prose: `installDarkModeSync.ts:17` ("SEMVER-VISIBLE rename
... no backwards-compat") and `utilities.css:613` ("Not a backwards-compat ..."). Both
*disclaim* compat machinery rather than introduce it. No `@deprecated`, no stub, no
deferred-work marker. invariant 28 (zero deferral) holds.

**δ-6 — invariant 30/31 language consistent. CONFIRMED.** `Q.md §2` items 30 + 31, the
W0 precept doc `cross-repo-dev-resolution.md` (`**Invariant**: Q invariant 30`), and the
W6.md precept-advance section all use consistent framing: 30 = cross-repo dev-resolution
contract (publisher 4-key shape + consumer `resolve.conditions` + zero `dist/` aliases,
gated by `proof-resolution-contract.mjs`); 31 = component props fail-explicit (extends O
invariant 24 from composables to the component-prop surface, dev-WARN posture).
Invariant 31 is not yet in the precept submodule file — expected: W6 codifies it
(authored-not-yet-codified, the standard pre-close state; cf. v1.8.5 PROGRESS note
"precept submodule file authored, held uncommitted until W6 codification").

### δ verdict — **CLEAN**

Every Q remediation audited is a fossil-deletion or an idiomatic transposition. W1 =
phantom-devDep deletion + the missing `default` contract key. W3 reverts = re-promotion
of wrongly-retired recipes + retiral of wrongly-added machinery. The DEMOTE = component
deletion folded into an orthogonal Card prop (explicitly NOT a `tier` rung — API
corruption was the rejected alternative). No legacy alias, no `variant=` compat path, no
deferred TODO survives. invariants 28 / 30 / 31 language is consistent across the plan,
precept, and close docs.

---

## Overall verdict

| Lane | Verdict | Blocking? |
|---|---|---|
| γ doc-drift | **MINOR** (2 stale numerals: `CLAUDE.md:172` `40→37`, `CLAUDE.md:14` `44→42`) | **No** — MINOR-absorb-inline at close |
| δ idiomatic-gestalt | **CLEAN** | No |

**Nothing BLOCKS the Q close.** The two γ findings are numeral-only doc-drift in
CLAUDE.md prose the W3 Lane H edit did not sweep — fix inline at the W6 close commit
(`CLAUDE.md:172` `40 → 37`; `CLAUDE.md:14` `44 → 42`), exactly as P.W6 absorbed its γ
`/api`-count finding inline. δ is fully CLEAN: the Q remediations are textbook
fossil-deletion / idiomatic-transposition with zero backwards-compat machinery.
