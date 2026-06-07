# css-wiring-conformance — one defect class dominates: 5/6 repos lack the explicit `@source "...dist"`; the rest of the contract is clean

Audit of the consumer-wiring BINDING requirements (glass-ui CLAUDE.md "Consumer wiring") across the 6 constellation repos, verified against each main CSS entry + each installed `node_modules/@mkbabb/glass-ui/dist` at HEAD on 2026-06-07.

## Conformance table

| repo | main CSS entry | installed gui | (1) single `/styles` import | (2) explicit `@source …/dist` | (3) `tw-animate-css` (all mount Dialog/Sheet/Popover/DropdownMenu) | (4) `@variant dark` | (5) cartoon dead-local |
|------|----------------|---------------|------|------|------|------|------|
| fourier-analysis | `web/src/style.css` | 3.1.0 | ✅ (style.css:3) | ❌ ABSENT | ✅ (style.css:2) | ✅ inherited from gui theme.css:364 | ✅ none |
| value.js | `demo/@/styles/style.css` | 3.3.0 | ❌ STALE TWO-import (23+24) | ❌ ABSENT | ✅ (style.css:2) | ✅ inherited from gui theme.css:416 | ✅ none (real `:root` token override) |
| keyframes.js | `demo/@/styles/style.css` | 3.3.0 | ✅ (style.css:3) | ❌ ABSENT | ✅ (style.css:2) | ✅ own `@custom-variant` (style.css:9) | ✅ none |
| speedtest | `styles/style.css` | 3.1.0 | ✅ (style.css:14) | ❌ ABSENT (retired w/ false rationale) | ✅ (style.css:2) | ✅ inherited from gui theme.css | ✅ none |
| muster | `frontend/src/styles.css` | 3.1.0 | ✅ (styles.css:3) | ✅ CORRECT (styles.css:12) | ✅ (styles.css:2) | ✅ own (styles.css:14) | ✅ none |
| words | `frontend/src/assets/index.css` | 3.0.0 (root nm) | ✅ (index.css:3) | ❌ ABSENT | ✅ (index.css:2) | ✅ own (index.css:6) | ✅ none (local `--shadow-cartoon-color-*` helpers, not gui token names) |

## Findings

1. **`@source "…/dist"` is ABSENT in 5 of 6 repos — utilities silently drop. (HIGH, the headline.)** Only `muster/frontend/src/styles.css:12` carries the explicit `@source "../node_modules/@mkbabb/glass-ui/dist"` (depth verified correct: `frontend/src/../node_modules/@mkbabb/glass-ui/dist` EXISTS; the flat `dist/*.js` chunks it scans DO contain the util strings — confirmed `shrink-0` in `dist/CommandShortcut-*.js`). fourier (`web/src/style.css`), value.js, keyframes.js, speedtest, words ALL lack it. CLAUDE.md ("glass-ui's component templates emit Tailwind utility classes that the consumer's content-scan must reach") makes this binding for any consumer mounting glass-ui components — all 6 mount Dialog/Sheet/Popover/DropdownMenu + GlassDock.

2. **speedtest + fourier rely on a transitive `@source` that does NOT reach the compiled utilities — the rationale comment is FALSE. (HIGH.)** `speedtest/styles/style.css:19-28` explicitly RETIRED its local `@source` on the belief that glass-ui's own `dist/styles/index.css` ships `@source "../components"` which "resolves through the consumer's `node_modules/@mkbabb/glass-ui/` install in every environment." Verified at HEAD: that line is real (`dist/styles/index.css:121`, also :112 in 3.0.0) but it resolves to `node_modules/@mkbabb/glass-ui/dist/components`, which contains **only `.d.ts` declarations** (347 files in 3.1.0, 382 in 3.3.0 — 0 `.js`). The compiled utility class strings (`text-destructive-foreground`, `shrink-0`, `h-full`) live **only in the flat `dist/*.js` chunks at `dist/` top-level**, NOT in `dist/components/`. So the transitive scan scans the wrong tree; the explicit whole-`dist` `@source` (muster's shape) is the only one that reaches them. Same false-reliance applies to fourier (no `@source` at all, same transitive assumption).

3. **Materiality is proven for fourier + speedtest.** `text-destructive-foreground` (a glass-ui-only CVA button-variant class) has **0 references in fourier's own `web/src/` and 0 in speedtest's own `src/`** — so with no `@source` and no own-src usage to coincidentally generate it, the destructive-button variant utility is **dropped** in both. (value.js 1 / keyframes.js 4 / words 2 own-src refs partially mask it, but the full glass-ui CVA matrix — `rounded-pill`, the dock/aurora layout utilities — still drops wherever own-src does not coincidentally name them.)

4. **value.js carries the STALE pre-AN.W1 TWO-import shape. (MEDIUM.)** `value.js/demo/@/styles/style.css:23-24` imports BOTH `@import "@mkbabb/glass-ui/styles"` AND `@import "@mkbabb/glass-ui/styles.css"`, with a 20-line header comment (3-21) asserting the two are "complementary, not substitutes." Verified false at HEAD: glass-ui 3.3.0's `dist/styles/index.css` folds the SFC-scoped surface in itself via `@import "../glass-ui.css"` (`dist/styles/index.css` line near :120), so the single `/styles` import already carries cascade + compiled SFC CSS. The second `/styles.css` line is the v0.9 shape CLAUDE.md marks "no longer needed" (Consumer-wiring §). Harmless-but-redundant double-paint of `glass-ui.css`; the header comment is now misleading. (speedtest already documents the correct single-import collapse at `style.css:5-14`; value.js did not get the AN.W1 follow-through.)

5. **`@variant dark` is satisfied everywhere — three repos inherit it transitively, three declare their own.** glass-ui's shipped `dist/styles/theme.css` declares `@variant dark (&:where(.dark, .dark *))` (line 416 in 3.3.0, 364 in 3.1.0), so fourier / value.js / speedtest (which have NO own `@variant`) inherit it through `@import "@mkbabb/glass-ui/styles"`. muster (`styles.css:14`), words (`index.css:6`) re-declare it explicitly; keyframes.js uses the canonical-v4 `@custom-variant dark` spelling (`style.css:9`). All resolve `.dark`-class discipline identically. No defect — but the three inheriting repos are one upstream theme.css edit away from a silent break, so an explicit local declaration is the safer shape (note as advisory, not a required fix).

6. **The cartoon-shadow dead-local anti-pattern is ABSENT constellation-wide. (clean.)** value.js (`style.css:78-81, 182-183`) overrides bare `--shadow-cartoon` / `-hover` on `:root` + `.dark` and routes `--shadow-card` through them — these are REAL glass-ui tokens (`dist/styles/tokens.css:476-477` ships bare `--shadow-cartoon`; the `cartoon-surface` utility reads `--shadow-cartoon-md`/`-lg` at `cards.css:35,46`, which value.js leaves at gui defaults — a deliberate `--shadow-card` redirect, cascade-correct, not a dead orphan). words' `theme.css:86-89,125-128` `--shadow-cartoon-color-*` are word-private color helper names, NOT a re-declaration of gui's `--shadow-cartoon-{sm,md,lg}` — no off-cascade orphan. No repo re-declares `--shadow-cartoon-lg` as a dead local.

7. **3.3.0 GlassDock regression gates EVERY repo's bump. (sequencing, cross-cuts all lanes.)** All 6 repos mount `<GlassDock>` (fourier 4, value.js 2, keyframes.js 2, speedtest 4, muster 5, words 3 sites). Per the 3.3.0 known regression (simple two-layer collapse width-morph freeze), NONE may bump to `^3.3.0`; the consume path for every repo is **3.4.0 after AW.W1**. value.js + keyframes.js are ALREADY on 3.3.0 installed — they are carrying the regression at HEAD and must move to 3.4.0, not stay.

## Wave-forming input

**Scope (a single CSS-wiring conformance wave, post-3.4.0 publish):**
- Add `@source "<rel>/node_modules/@mkbabb/glass-ui/dist"` to the 5 missing repos. Exact fix lines (depth computed per each entry's location):
  - fourier `web/src/style.css` (after line 3): `@source "../../node_modules/@mkbabb/glass-ui/dist";` (file at `web/src/` → `../../node_modules` reaches `web/node_modules`).
  - value.js `demo/@/styles/style.css` (after the `/styles` import): `@source "../../../node_modules/@mkbabb/glass-ui/dist";` (file at `demo/@/styles/` → `../../../` reaches `demo/node_modules`; VERIFY the demo's install root — value.js installs glass-ui via `file:../glass-ui`; the `@source` must point at the resolved `dist`, confirm the symlinked depth at wave time).
  - keyframes.js `demo/@/styles/style.css` (after line 3): same `../../../node_modules/@mkbabb/glass-ui/dist` shape; verify depth.
  - speedtest `styles/style.css` (replace the false-rationale comment block 19-28 with the real line): `@source "../node_modules/@mkbabb/glass-ui/dist";` (file at `styles/` → `../node_modules`).
  - words `frontend/src/assets/index.css` (after line 3): glass-ui resolves at the REPO-ROOT `node_modules` (the `frontend/node_modules/@mkbabb/` is empty; root `words/node_modules/@mkbabb/glass-ui` = 3.0.0) → `@source "../../../../node_modules/@mkbabb/glass-ui/dist";` — VERIFY the up-depth from `frontend/src/assets/` to the root `node_modules` at wave time (the vendored `frontend/glass-ui/` 3.1.1 source dir is STALE/inactive; do not point `@source` at it).
- Collapse value.js's stale two-import: delete `style.css:24` (`@import "@mkbabb/glass-ui/styles.css"`) and rewrite the 3-21 header to the single-import truth (mirror speedtest `style.css:5-14`).
- Advisory: add an explicit `@variant dark (&:where(.dark, .dark *));` to fourier / value.js / speedtest so dark-mode does not depend on glass-ui's theme.css continuing to ship it.

**Gate sketch (`proof:consumer-css-wiring`, per-repo, runs in each consumer's CI or a glass-ui cross-repo probe):**
- Locate the repo's main CSS entry (the file that `@import "@mkbabb/glass-ui/styles"`).
- ASSERT exactly one `@import "@mkbabb/glass-ui/styles"` AND zero `@import "@mkbabb/glass-ui/styles.css"` (kills the stale two-import).
- ASSERT one `@source` whose resolved target is a directory containing flat `*.js` chunks that grep-match a sentinel glass-ui-only utility (`text-destructive-foreground`) — i.e. the scan reaches the COMPILED templates, not the `.d.ts` tree. (This is the check that would have caught the `dist/components` false-positive.)
- ASSERT `@import "tw-animate-css"` present (all 6 mount the animated primitives).
- ASSERT a `@variant dark` / `@custom-variant dark` is reachable (own-declared OR present in the imported glass-ui theme.css).

**Sequencing edges:**
- This wave is publish-gated on 3.4.0 (AW.W1 dock fix) ONLY for the version bump; the `@source` / two-import fixes are version-independent and can land NOW against the installed pins (3.0.0/3.1.0/3.3.0 all ship the same `dist/components`-is-`.d.ts` layout — verified both 3.1.0 and 3.3.0).
- Pair with the per-repo `^3.3.0 → 3.4.0` bump (Finding 7) so the regression fix and the wiring fix land in one consumer PR each.

## Anti-findings (verified FINE)

- **muster is the reference implementation** — single `/styles` import, correct-depth explicit `@source …/dist` reaching the flat `.js`, `tw-animate-css`, own `@variant dark`. Use it as the canonical shape (`muster/frontend/src/styles.css:1-14`).
- **`tw-animate-css` is present in all 6 entries** (each line 2) and IS required in all 6 (every repo mounts Dialog/Sheet/Popover/DropdownMenu). No gap.
- **`@variant dark` resolves everywhere** (Finding 5) — no `.dark`-discipline break; the three inheriting repos work today.
- **No cartoon-shadow dead-local anti-pattern anywhere** (Finding 6) — value.js's `--shadow-cartoon` overrides and words' `--shadow-cartoon-color-*` helpers are both cascade-correct / library-token-respecting.
- **The single `/styles` import is correct in 5 of 6** (only value.js carries the stale second line).

## Summary
- One defect class dominates: 5/6 repos (fourier, value.js, keyframes.js, speedtest, words) LACK the explicit `@source "…/dist"`; only muster has it correct. Verified at HEAD: glass-ui's transitive `@source "../components"` resolves to the `.d.ts`-only `dist/components` tree and does NOT reach the compiled utility class strings, which live in flat `dist/*.js`. speedtest (`style.css:19-28`) + fourier rely on that transitive scan on a FALSE rationale.
- Materiality proven: `text-destructive-foreground` has 0 own-src refs in fourier + speedtest, so that CVA utility is dropped there today.
- value.js additionally carries the stale pre-AN.W1 TWO-import shape (`style.css:23-24`) — the second `/styles.css` is redundant; the 20-line header asserting they are "complementary" is false at 3.3.0.
- CLEAN: `tw-animate-css` present + required in all 6; `@variant dark` resolves everywhere (3 own-declare, 3 inherit from gui theme.css:416/364); NO cartoon-shadow dead-local anti-pattern anywhere; single-import correct in 5/6.
- Cross-cut: all 6 mount GlassDock → all gated on 3.4.0 (AW.W1) for the bump; value.js + keyframes.js already sit on 3.3.0 (carrying the regression). The `@source` + two-import fixes are version-independent (3.0.0/3.1.0/3.3.0 share the layout) and can land now.
- Digest: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/css-wiring-conformance.md`
