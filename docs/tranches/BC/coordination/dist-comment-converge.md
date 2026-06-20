# BC.W-DIST-COMMENT-FIX — the dist-CSS-comment convergence record

**Status:** CONFIRMED-LANDED (4.0.1) + source-side harden landed (BC.W-DIST-COMMENT-FIX).
**Wave:** `BC.W-DIST-COMMENT-FIX` (Band 10) — a CONFIRM-and-harden wave, NOT a re-build.

This is the no-silent-drop ledger for the dist-CSS-comment "Unterminated string" build bug: the
landed-fix confirm, the cross-repo convergence note, the source-side harden rationale, and the
deferral re-decide. The wave does NOT re-author the fixed source (`vite.style-assets.ts` + the
index.css comment region are correct at HEAD); it CONFIRMS + HARDENS.

## 1. The bug class (what shipped at 4.0.0)

`vite.style-assets.ts` injected its dist-only `@import` fold-comment by locating the `@source`
at-rule via a bare `indexOf("@source")`. The authored `src/styles/index.css` mentions the token
`@source` INSIDE comment prose (the BA.W-EMISSION block narrates the dead `../components` glob and
the re-pointed `@source "../*.js"` directive). The bare `indexOf` matched that PROSE occurrence
FIRST and sliced the injection into the MIDDLE of an open `/* … */` block. The injected
fold-comment carried a `*/` close that prematurely terminated the OUTER prose comment, orphaning
the remaining prose as live CSS — the apostrophe in the prose (`apostrophe's`, `consumer's`) became
an unterminated-string token, and EVERY consumer's Tailwind v4 build died with "Unterminated
string" / `Missing opening (`. The bug broke the consumer BUILD, a SEPARATE failure class from the
visually-broken primitives the rest of BC repairs.

## 2. The landed fix (4.0.1, commit 2935609d — an ancestor of HEAD)

- **The source fix — `atSourceIndex` line-start anchor** (`vite.style-assets.ts:35-38`):
  `atSourceIndex(css)` anchors on the REAL trailing at-rule via `const m = /^[ \t]*@source\b/m.exec(css)`
  (a line-start regex), NOT the bare `indexOf("@source")` that matched the prose mention first. The
  function header (`:18-34`) documents the exact bug class. The two fold-injection call sites
  (`:309`, `:443`) call `atSourceIndex(...)`.
- **The `url()` split** — the split `--glass-refract-filter` property was re-authored as ONE complete
  `url("data:image/svg+xml,…")` token (data: URIs are skipped by url()-rewriters).
- **The guard gate — `proof:dist-css`** (`scripts/proof-dist-css.mjs`; registered in `scripts/gates.mjs`,
  tags `["local","ci","release"]`): a lightningcss parse (`errorRecovery:false`, the SAME engine
  Tailwind v4 uses) + a `url()`-safety scan over the emitted `dist/styles/**/*.css`. A parse here is a
  parse in a consumer's build.
- **The registry** — `package.json` version = `4.0.1`; the registry LIVE `4.0.1` carries the fix + the
  gate.

## 3. The cross-repo convergence (the SAME fix)

The speedtest fleet ROOT-FIXED the same bug in its read of `vite.style-assets.ts` — it anchored on the
line-start at-rule, split the `url()` in `glass-refract.css`, and moved the Drawer onto its subpath API.
**The fleet's fix and glass-ui's 4.0.1 `atSourceIndex` fix are the SAME root fix — they converged.** The
fleet's BUILD is unblocked by `@mkbabb/glass-ui@^4.0.1`'s dist INDEPENDENTLY of the visual repair (the
dist-comment bug broke the consumer Tailwind BUILD; the visually-broken primitives are a disjoint
concern). This wave RECORDS the convergence (the by-name ledger); it does NOT edit the speedtest tree
(the foreign-tree fence — inv-26; the fleet fixed its own read). Source: `research/cross-repo-asks.md §1`.

## 4. The source-side harden (the one net-new piece — DC3/DC4)

The dist-side `proof:dist-css` catches the bug in the EMITTED dist (AFTER the build). The harden adds
SOURCE-SIDE clauses that catch it BEFORE the build, folded into the SAME gate (extend-in-place, NOT a
second `proof:dist-css-balanced` gate — the AW.W26 discipline; the dist-side and source-side are ONE
concern):

- **DC3 (source comment-balance)** — every `src/styles/**/*.css` is walked by a STATEFUL comment
  tokenizer (NOT a naive `/\*` vs `*/` regex count, which false-fires on a JSDoc `* theme/*.css` line
  or a `*/` inside a string literal — both legitimately present in the real cascade). A block comment
  left UNCLOSED at EOF (or an unterminated string at EOF) is the imbalance that, once the vite fold
  injects, poisons the downstream prose. CSS comments do NOT nest, so a `/*` already inside a comment
  is literal text — the only real failure is the EOF-unclosed case.
- **DC4 (fold-anchor confirm)** — `vite.style-assets.ts` MUST carry the line-start `atSourceIndex`
  regex (`/^[ \t]*@source\b/m`) AND must NOT use a bare `indexOf("@source")` for the fold-injection (in
  comment-stripped code, so the prose mention of `indexOf` in the docstring is not mistaken for a live
  call). A regression to either form REDs — a future un-fix is machine-impossible.

Born-RED → GREEN: a planted source-side unclosed comment REDs DC3; a synthetic `indexOf("@source")`
fold REDs DC4 (validated by the inline self-test bites D/D'/E/E' AND by a controlled plant-and-restore
over the real tree). The gate is GREEN on HEAD (90 dist files + 87 src files clean, fold anchor present).

## 5. The unterminated-string class is closed at all THREE layers

| Layer | Clause | Status |
|---|---|---|
| SOURCE (`src/styles/**/*.css` + `vite.style-assets.ts`) | DC3 comment-balance + DC4 fold-anchor | GREEN (this wave) |
| EMITTED DIST (`dist/styles/**/*.css`) | DC1 lightningcss parse + DC2 url()-safety | GREEN (shipped 4.0.1) |
| CONSUMER BUILD (the fleet's `npm run build`) | the EXECUTION-phase witness | green on `^4.0.1` (fleet's own repo) |

The convergence the fleet and glass-ui reached at 4.0.1, made permanent.

## 6. Deferral re-decide

- `deferral/memory.md` `mem-dist-css-comment-build-bug` (FOLD-LEDGER `mem-dist-css-comment-build-bug`)
  + `deferral/ay.md` `dist-css-comment-build-bug` (FOLD-LEDGER `ay-dist-css-comment-build-bug`) — both
  authored UN-ADDRESSED with a BUILD disposition (before the 4.0.1 land was confirmed). RE-DECIDED to
  **MET**: the fix landed at 4.0.1 (the `atSourceIndex` line-start anchor), the guard gate
  `proof:dist-css` is present + registered, the source-side harden (DC3/DC4) closes the last gap. NOT a
  phantom-BUILD (claiming a build that already happened is forbidden — BC.W-FOLD-LEDGER F3
  no-undecided + dest-soundness). Both rows keep their `BC.W-DIST-COMMENT-FIX` destination (a real
  wave-spec on disk) and flip `disposition: BUILD → MET`.
- `research/cross-repo-asks.md §1` — CONFIRMED: `BC.W-DIST-COMMENT-FIX` is the CONFIRM-and-retire wave
  the corpus named; the source comment + guard-gate converged with the fleet's fix at 4.0.1.
