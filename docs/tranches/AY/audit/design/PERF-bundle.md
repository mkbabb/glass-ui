# PERF-bundle — the payload story (AY design audit)

Lane: **PERF-bundle**. Read-only on `src/`; BUILD + measure only. No git.

## Conditions (recorded with every number)

| Axis | Value |
|---|---|
| Machine | Apple M5 Max, 128 GB RAM, macOS Darwin 25.4.0 |
| Node | v26.0.0 |
| glass-ui HEAD | `3622192` (branch `tranche/AY`; AY Batch 2 integrated, execution HALTED) |
| glass-ui build | `npm run profile:bundle` → `npm run iter-build` (`vite build --config vite.iter.config.ts`; JS+CSS chunk emit, NO dts arm) |
| Measurement | gzip via Node `zlib.gzipSync` (the profile script's own method); raw = on-disk byte size |
| slides HEAD | `ca5f9ca`; `npx vite build` (production client), glass-ui resolved `3.9.0` (registry) |
| Throttling | none — these are payload-byte measurements, not runtime-timing measurements |

Artefacts routed OUT of the committed tree (env override → `/tmp/ay-perf/`): the ephemeral
profile JSON + regenerated subpath markdown. The HEAD subpath table is copied beside this report
as `W4-subpath-sizes.HEAD.md` for provenance.

---

## 1. The three HARD budgets (`profile:budget --enforce`)

| Budget key | Raw / ceiling | Gzip / ceiling | Verdict |
|---|---|---|---|
| `dist/glass-ui.js` (root barrel) | 33 257 / 190 000 (17.5%) | 8 457 / 33 700 (25.1%) | **PASS** (huge headroom) |
| `dist/styles/index.css` (resolved draw) | 530 753 / 548 000 (96.9%) | **141 270 / 140 000 (100.9%)** | **FAIL — gzip over by 1 270 B / +0.91%** |
| `dist/aurora.js` (`/aurora` chunk) | 98 637 / 130 000 (75.9%) | 32 916 / 38 000 (86.6%) | **PASS** |

`profile:budget` (the `--enforce` arm) **EXITS NON-ZERO** today: the CSS gzip tipped over.

### CSS FAIL — diagnosis

The gated artefact is the resolved `dist/styles/index.css` draw (the cascade `@import`s inlined
one level — what a consumer's bundler pulls through `@import "@mkbabb/glass-ui/styles"`). `fonts.css`
is NOT in this draw (it is the separate `/styles/fonts` entry; the resolver only inlines `.css`-suffixed
sibling refs, and the `glass-ui/styles/fonts` import has no `.css` suffix — correctly excluded).

Movement vs the last reviewed point (AP D5 baseline, generated 2026-06-08T22:50):

| | Raw | Gzip |
|---|---|---|
| AP baseline | 538 015 (under) | 139 759 (99.8%, just under) |
| **HEAD** | **530 753 (−7 262, under)** | **141 270 (+1 511, OVER)** |

Raw SHRANK, gzip GREW — the AY/AX work added *distinct, low-redundancy* rules (new tokens +
selectors compress poorly) while the `dock.css` carve into `dock/{shell,morph,density,layers,layer-group,overflow}.css`
partials dedup'd the raw bytes. Diffstat `56db9e0..HEAD` over `src/styles/`: `tokens.css` +414,
`glass.css` +396 (W54 glass-first `--glass-level` + W55 adaptive-glass `--glass-tint-*`),
`dock-controls.css` +120, plus the dock partials (+1 762 across 6 new files vs −1 612 from the
monolith). This is exactly the substrate-grows-at-a-feature-landing pattern the script header
documents — and the script's BUDGETS block records SEVEN prior one-time conscious lifts
(AO/AS/AT/AU/AV/AW/AX), each a ~3% close-headroom rebase against measured reality, "re-based ONCE
at close, not bumped per wave."

**This is the legitimate AY-close CSS rebase, NOT runaway creep.** The overrun is 0.91% — knife's-edge,
the same magnitude (AW tipped 0.3% over before its rebase). The correct close action is the
documented one-time lift: `dist/styles/index.css` → gzip **148 000** / raw **548 000** (the
AY ~3% close headroom, sized to also carry W54/W55/W56 squircle + W60 page-redesign CSS the
inventory still owes). See §5 spec edit.

---

## 2. Per-subpath drift gate (D5 — `subpathReport`, entry chunks ≥ 1 KiB, drift > 10% FAILs)

The D5 gate reads the **committed** baseline `docs/tranches/AP/W4-bundle-profile.baseline.json`.
Result this run:

- **One genuine FAIL: `dist/constellation.js` — gzip 4 870 vs baseline 3 177 (+53.3%).**
  `constellation` IS a published subpath (`./constellation` in `package.json` exports). The growth is
  the AY Batch 2 "disjoint component perfection" commit (`8ddddce`/`1151899`): `56db9e0..HEAD` adds
  +904 lines to the component (`constellationField.ts` +459, `Constellation.vue` +312). Intentional
  AY component work, but it trips the 10% drift ceiling against the pre-AY baseline.
- One NEW entry (un-gated): `dist/fourier-math.js` (gzip 126 — a new sub-1-KiB math leaf; reported,
  not failed). Re-baseline adopts it.
- Every other entry ≥ 1 KiB is PASS (≤ +4.3%): aurora −3.5%, goo-blob +4.3%, dock +4.0%, glass-ui
  +0.6%, the rest flat.

**Caveat — the AP baseline is itself stale.** It records `status: fail` (it predates the W53 tabs
unification it drifts against: `tabs.js` FAIL +27.7%, `responsive-tabs.js` MISSING). So D5 is currently
gating HEAD against a known-dirty reference. The AY close owes a `profile:budget -- --rebaseline`
against a canonical `npm run build` dist to re-anchor D5 (which absorbs constellation's intentional
growth, the tabs unification, and the new `fourier-math` leaf in one reviewed commit). See §5.

---

## 3. Per-subpath table vs the K W4 PUBLISHED doc (`docs/tranches/K/audit/W4-subpath-sizes.md`, 2026-06-02)

The K W4 doc is a frozen snapshot from a full release-cycle ago (L→AT→AU→AV→AW→AX→AY). Drifts vs it
are *cumulative multi-tranche feature growth*, each already rebased at its own tranche close — NOT a
publish-gating signal (that is §1 + §2). Regenerated HEAD table: `W4-subpath-sizes.HEAD.md`.

**Entry subpaths in BOTH K W4 and HEAD that GREW > 10% (gzip):**

| subpath | K-W4 gzip | HEAD gzip | drift | What grew it |
|---|---|---|---|---|
| `dark.js` | 246 | 517 | **+110.2%** | FOUC sync script + `useGlobalDark` evolution (AU.W9) — still tiny (517 B) |
| `aurora.js` | 16 564 | 32 916 | **+98.7%** | the AW painterly GLSL band (structure-tensor / impasto / van-Gogh medium) + WGSL twins — the deliberate `dist/aurora.js` budget exists precisely for this (PASS at 86.6% of ceiling) |
| `progress.js` | 82 | 145 | **+76.8%** | gradient-variant rail — 63 B absolute |
| `motion.js` | 963 | 1 530 | **+58.9%** | `useCountup`/`vReveal`/`useViewTransition` adds (AV.W3, AQ.W5) |
| `dock.js` | 5 398 | 7 938 | **+47.1%** | three-region morph + H/V parity + `--dock-scale` + `<DockSeparator>` + glyph ownership (AX.W45) |
| `tabs.js` | 2 467 | 3 563 | **+44.4%** | SegmentedTabs unification — subsumed Bouncy/Underline/Responsive into ONE component (AX.W53) |
| `dom.js` | 261 | 307 | +17.6% | 46 B absolute |

**New entry subpaths since K W4** (no K comparison): `goo-blob` (19 926), `constellation` (4 870),
`fourier-field` (2 368), `watercolor-dot` (1 865), `color` (218), `canvas` (138), `fourier-math` (126),
`deck-progress` (86).

**Retired since K W4:** `glass-carousel` (2 280 — AX.W19), `responsive-tabs` (1 154 — folded into
SegmentedTabs), `glyph-face` (180), `disco-glyph` (84).

Read: every > 10% grower is an explained feature landing, each already a one-time close-rebase in its
tranche; none is an unexplained regression. The two materially-sized ones (`aurora`, `dock`) both sit
inside their own gates.

---

## 4. CSS / font payloads — both repos

### glass-ui `dist/` (HEAD)

| Artefact | Raw | Gzip |
|---|---|---|
| Resolved `/styles` draw (GATED) | 530 753 (518.3 KiB) | 141 270 (138.0 KiB) |
| `/styles/fonts` (`fonts.css` — `@font-face` block) | 139 272 (136.0 KiB) | 103 844 (101.4 KiB) |
| woff2 family (4 files, subsetted) | 98 624 (96.3 KiB) | — (already compressed) |
| └ fira-code latin / latin-ext | 36 276 / 13 272 | |
| └ plus-jakarta-sans latin / latin-ext | 27 348 / 21 728 | |
| All `.js` (151 files: 72 entry + 79 shared) | 607 716 (593.5 KiB) | 217 728 (212.6 KiB) |
| Entry chunks only (72) | 384 591 | 132 817 |
| All `.css` (30 files) | 761 692 | 285 985 |

glass-ui fonts are tightly subsetted woff2 (96.3 KiB for the whole 4-face family) — healthy. Note
`fonts.css` itself is 136 KiB raw / 101 KiB gzip — it is `@font-face`-only and a SEPARATE entry, so it
is NOT in the gated `/styles` draw (consumers that don't want the bundled fonts simply don't import
`/styles/fonts`).

### slides `dist/` (HEAD, glass-ui 3.9.0) — vs L-READINESS reference

L-READINESS recorded: *"deck chunks ~38-40 KB, glass-ui chunk 47.8 KB, vendor 294 KB"* (raw kB).

| Chunk | L-READINESS ref | HEAD raw | HEAD gzip | Verdict |
|---|---|---|---|---|
| `glass-ui-*.js` | 47.8 KB | 47.83 KB | 16.05 KB | **MATCH — no drift** |
| `vendor-*.js` | 294 KB | 294.56 KB | 100.07 KB | **MATCH — no drift** |
| `deck-B7DpLU_y.js` | ~38-40 KB | 38.73 KB | 12.01 KB | MATCH |
| `deck-gPySK6bA.js` | (counted in ~deck) | 55.65 KB | 17.76 KB | the bespoke local constellation/deck content the L tranche plans to thin once 3.10.0 is adopted |
| `index-*.css` | — | 353.36 KB | 60.21 KB | app CSS |
| `deck-*.css` (×2) | — | 47.30 + 58.48 KB | 8.58 + 9.17 KB | |

Slides build is **GREEN** and byte-stable against the L-READINESS reference. No glass-ui-introduced
regression on the consumer side.

### slides fonts — the one outsized payload

| Font family | Format | Files | Total |
|---|---|---|---|
| Computer Modern (cmunrm/cmunbx/cmunbi/cmunti) | `.woff` (NOT woff2, full-codepoint) | 4 | **558 620 B / 545.5 KiB** |

The slides CM math fonts are the single heaviest payload class in the slides build — larger than the
vendor JS chunk, ~5.7× the entire glass-ui woff2 family. They are legacy un-subsetted `.woff`. This is
the DEC-8 "font stays" decision (per project memory), so it is NOT a glass-ui or AY publish blocker —
flagged here only because it dwarfs everything else in the slides payload and is a standing
optimization opportunity for the slides team (woff2 + subset → typical ~70-85% reduction). Out of
this lane's gating scope.

---

## 5. VERDICT — does any budget regression GATE the 3.10.0 publish?

**Two gating signals fire, both are EXPECTED AY-close rebases, NOT runaway regressions. The publish
should be gated on performing the documented one-time close rebases FIRST, then it is clear.**

1. **CSS gzip budget: FAIL by +0.91% (141 270 / 140 000).** This is the legitimate AY-close CSS
   substrate lift (W54 glass-first + W55 adaptive-glass + dock partial carve), the eighth in the
   script's documented one-time-lift sequence. **Action before 3.10.0:** the close rebase
   `dist/styles/index.css` → gzip 148 000 / raw 548 000 (raw is already under; lift gzip with the
   AY ~3% close headroom). Without it, `profile:budget` (CI `--enforce`) blocks the tag.

2. **D5 drift: `constellation.js` FAIL +53.3%.** Intentional AY Batch-2 component growth, gated against
   a *stale, already-failing* AP baseline (which itself predates W53 tabs). **Action before 3.10.0:**
   `npm run profile:budget -- --rebaseline` against a canonical `npm run build` dist, committed — this
   re-anchors D5 in one reviewed move (absorbs constellation, the W53 tabs unification, and the new
   `fourier-math` leaf).

**Nothing here is a TRUE regression** (no accidental bloat, no chunk that grew without a named feature;
the root barrel is at 25% of its gzip ceiling, aurora at 87% of its own dedicated ceiling, the slides
consumer is byte-stable vs L-READINESS). The two FAILs are the routine "substrate grew with the feature
landing → rebase the ceiling once at close" that this repo has executed seven times prior. **3.10.0 is
publish-clear AFTER the two close rebases land** (the CSS ceiling lift + the D5 `--rebaseline`).

### Spec edits owed (for the AY close, NOT in this read-only lane)

- `scripts/profile-bundle.mjs` BUDGETS: `"dist/styles/index.css": { raw: 548_000, gzip: 148_000 }`
  (gzip ceiling 140 000 → 148 000; add an AY-close rationale comment in the existing lift-log block).
- `docs/tranches/AP/W4-bundle-profile.baseline.json`: regenerate via
  `npm run profile:budget -- --rebaseline` against a canonical full `npm run build`.
- `docs/tranches/K/audit/W4-subpath-sizes.md` is a frozen historical snapshot — leave it; the live
  table lives in `.cache/gates/W4-subpath-sizes.md` (and this report's `W4-subpath-sizes.HEAD.md`).
