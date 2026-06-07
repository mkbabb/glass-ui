# L-adopt — fourier glass-ui-adoption tranche (`^3.1.0` → `^3.4.0`, the dock-collapse-regression bump + the `@source` content-scan fix + the `useCanvas2D` substrate swap)

> **HANDOFF ANNEX.** This is a **glass-ui-authored** wave spec. The fourier-analysis maintainer lifts it into fourier's OWN `docs/tranches/L/L.md` (+ `L/PROGRESS.md`) and executes it **in the fourier repo on a clean checkout, gated on fourier's own green CI** (inv-16′). glass-ui owns no write in `fourier-analysis/**`; this annex is the adoption-of-a-published-peer (a caret bump + consumer-local edits), NOT a cross-repo glass-ui write. Every file:line below is cited against fourier HEAD `0167268` (master, read 2026-06-07); re-verify against fourier's HEAD at execution time. The glass-ui surfaces named (3.4.0 dock fix, `useCanvas2D`) are PLANNED in glass-ui tranche AW (W1 → 3.4.0; W17 → a later cut) and are not adoptable until they publish.

**Tranche letter**: **L** — `L-adopt` (the glass-ui-adoption thread). The bare letter **L** was pre-booked for **L-webmcp** (`K/K.md:176`); per the chain-honesty rule (`K/K.md:90` — an infra/feature graduation must not conflate with an adoption tranche) this annex takes the disambiguated **L-adopt** and **slides webmcp to M-webmcp** — the same rename-and-slide precedent K used at `K/K.md:90`. A writer must NOT silently grab the bare letter.
**Ordering**: **ξ′ (xi-prime)** — the next clean Greek symbol after ν′ (`CANONICAL-ORDERING.md §17–§20`: κ′=H → λ′=I → μ′=J → ν′=K-deploy → **ξ′=L-adopt**). Author a new `CANONICAL-ORDERING.md §21 — ordering ξ′` at W0; namespace-partition the new fourier inv (if any) from the glass-ui precept integers (`INVARIANTS.md §3`).
**Predecessor**: **K-deploy** (ordering ν′, `docs/tranches/K/K.md` — AUTHORED-only, awaits "Begin"; no `K/FINAL.md`). L-adopt **supersedes K.W1's stale `^3.2.0` bump target** with `^3.4.0` (the 3.3.0 dock regression post-dated K). J (ordering μ′, `docs/tranches/J/J.md`) STAYS OPEN — no `J/FINAL.md`; J.W6's inv-27 close is downstream of this bump (`K/K.md:13-19`).
**Authored**: 2026-06-07, against the glass-ui AW constellation audit (`docs/tranches/AW/audit/constellation/fourier-*.md`, `dock-regression-blast-radius.md`, `css-wiring-conformance.md`).
**Mode**: authored-now / executed-on-clean-checkout (inv-16′) — the bump wave is publish-gated on glass-ui 3.4.0 (PLANNED), so L-adopt cannot execute today. The `@source` fix (W2) is version-independent and lands NOW.
**Open**: NOT YET — awaits the user's "Begin" AND the glass-ui 3.4.0 publish for the bump waves.

## §0 — Shape verdict (the load-bearing sequencing insight)

fourier is the **deepest** glass-ui consumer in the constellation (40+ import sites, near-total subpath discipline) and the canonical **in-the-wild 3.3.0 dock-collapse-regression victim**. Broad adoption is ALREADY done (GlassDock ×3, Configurator ×3, router View-Transitions, native `.scroll-progress`, AnimatedDigit, InfiniteScroll, sidebar, useClipboard). The openings are surgical and one is BLOCKING, not opportunistic.

The single load-bearing edge: fourier mounts `<GlassDock>` with the simple two-layer `:start-collapsed`+`#collapsed` collapse at THREE co-mounted sites (`CanvasControlsDock.vue:41`, `EditorControlsDock.vue:56`, `AnimationControls.vue:58`) — the EXACT shape the 3.3.0 width-morph regression freezes on first expand. fourier is SAFE today only because node_modules is still linked at 3.1.0; the `^3.1.0` caret would float to the broken 3.3.0 on a fresh `npm install`. **The bump target is `^3.4.0` (the AW.W1 fix), NEVER `^3.3.0` and NEVER an open `^3.2.0`/`^3.3.0` caret** (a caret resolves to 3.3.0). This supersedes the `^3.2.0` framing in EVERY fourier doc (`J/PROGRESS.md`, `K/PROGRESS.md`, `CONSTELLATION.md:141`, `ADOPTION-ASKS.md:160`). fourier's `web/e2e/visualization-ux.spec.ts:60-84` already drives the broken path → a naive `^3.3.0` bump REDS fourier's own CI.

## §1 — Thesis

fourier's glass-ui surface is mature and disciplined; this tranche is a **single version bump plus three surgical carries**, not a broad re-adoption. The bump (`^3.1.0`→`^3.4.0`) clears the 3.3.0 dock regression, delivers the four un-run K.W1 adoptions in one move (asideSide, the inert a11y keystones, the dock-VT `useId` fix, A-1/A-2 which already SHIPPED in 3.3.0), and unblocks two surgical consumer-side improvements: the version-independent `@source` content-scan fix (lands NOW) and the `useCanvas2D` substrate swap (post-3.4.0, dedupes fourier's twice-hand-rolled DPR-Canvas2D). Everything aurora/blob/derive-color/useCountup/vReveal/W16-DeckProgress is an **honest negative** — fourier's paper substrate + fixed semantic viz palette make those poor fits with no consumer pull.

## §2 — Binding question

> **Can fourier consume the glass-ui 3.4.0 dock-collapse fix — clearing the four pending K.W1 adoptions and the missing `@source` content-scan in one disciplined bump — without floating onto the broken 3.3.0 and without manufacturing aurora/blob/derive-color adoption demand that fourier's paper-substrate viz surface does not have?**

## §3 — Goal criterion and completion criterion (paired)

**Goal** (the wave list):
- W0 — DEV: author the charter + `CANONICAL-ORDERING.md §21 ordering ξ′` + slide webmcp to M; spot-verify every cited file:line against fourier HEAD.
- W1 — SHIP: the bump `web/package.json:14` `^3.1.0`→`^3.4.0` + `npm install` + lock-regen + single-keyframes-copy check; the four K.W1 adoptions land WITH the bump (asideSide grid-override deletes, 5 a11y keystones un-`fixme`'d, the dock-VT `useId` collision dissolves, A-1/A-2 arrive free).
- W2 — SHIP (version-INDEPENDENT, lands NOW ahead of W1): add `@source "../../node_modules/@mkbabb/glass-ui/dist";` to `web/src/style.css`.
- W3 — SHIP (post-3.4.0): swap the twice-hand-rolled DPR-Canvas2D onto glass-ui's `useCanvas2D`/`createCanvas2D` substrate.
- W4 — BOOK: the `cartoon-card`-shim fate decision (a glass-ui-side AW.W22-26 verdict; fourier holds the shim until then).
- W5 — FOLD: the `--viz-amber` AA-contrast override carry (a glass-ui-side token rebaseline; fourier holds its `:root` override until upstream absorbs it).
- W6 — DEV: close (`L/FINAL.md`).

**Completion criterion (the evidence)**:
- `web/package.json:14` pins `^3.4.0` AND node_modules resolves ≥3.4.0; a GREEN fourier CI **run id** is cited (inv-27 — "not a blind bump").
- The 3 co-mounted docks morph width on first expand under 3.4.0 (a dock-collapse e2e assert passes — the 3.3.0-regression canary).
- e2e green with the 5 a11y keystones UN-`fixme`'d (no surviving `test.fixme` citing `glass-ui-a11y`).
- `grep grid-template-columns` over `.viz-configurator` in `VisualizationView.vue` = 0 (the 3 overrides deleted; `aside-side="left"` consumed).
- `grep -q "text-destructive-foreground" web/dist/assets/*.css` PASSES after the `@source` add (the glass-ui-only CVA utility now generates).
- `useCanvasSetup.ts` + `ConvergencePlot.vue` route through the glass-ui substrate (W3, post-bump); zero hand-rolled DPR/`setTransform` boilerplate remains.

The §7 hard-gate list is the binding ledger.

## §4 — Wave sequence

| Wave | Disposition | Contents | Consumer (inv-15) |
|------|-------------|----------|-------------------|
| **L.W0** | DEV | Author `L/L.md` + `L/PROGRESS.md`; write `CANONICAL-ORDERING.md §21 — ordering ξ′`; slide webmcp `L`→`M` (`K/K.md:176` booking + `CANONICAL-ORDERING.md:715`); spot-verify the cited file:lines against fourier HEAD. | fourier maintainer (planning) |
| **L.W1** | SHIP | **THE BUMP (publish-gated on glass-ui 3.4.0).** `web/package.json:14` `"@mkbabb/glass-ui": "^3.1.0"` → `"^3.4.0"` + `npm install` + lock-regen. Carries the four K.W1 adoptions in one move: (a) consume `aside-side="left"` on `VisualizationView.vue:194` + DELETE the 3 grid overrides `VisualizationView.vue:322/326/329`; (b) un-`test.fixme` the 5 keystones (`visualization-ux.spec.ts:110/133/192/212` + `visualization-crud.spec.ts:630`) → live asserts (the `inert` fix clears `aria-hidden-focus`); (c) the dock-VT `useId` fix greens e2e at source (the `glass-dock-1` collision dissolves); (d) A-1/A-2 arrive FREE (already SHIPPED in 3.3.0 via AU.W9 `ce44df3` — no fourier action). Single-keyframes-copy check (glass-ui peer is `^2.2.0`; widen fourier's `web/package.json:15` keyframes to `^2.2.0 \|\| ^3.0.0` to match glass-ui ≥3.2.0). | the 3 co-mounted GlassDock SFCs (`CanvasControlsDock.vue`, `EditorControlsDock.vue`, `AnimationControls.vue`) — the bump's acceptance surface |
| **L.W2** | SHIP | **`@source` CONTENT-SCAN FIX (version-INDEPENDENT — lands NOW, ahead of the bump).** Add `@source "../../node_modules/@mkbabb/glass-ui/dist";` to `web/src/style.css` after the `@import "@mkbabb/glass-ui/styles"` line (`:3`). Depth `../../` is correct: `web/src/` → `web/node_modules`. Without it, glass-ui-only CVA utilities (verified-absent `text-destructive-foreground`) silently drop from the built CSS (the AN.W2 failure class). | every glass-ui component fourier mounts whose CVA matrix the app's own `src/` does not coincidentally re-name (Button destructive variant, Dialog, `rounded-pill`) |
| **L.W3** | SHIP | **`useCanvas2D` SUBSTRATE SWAP (post-3.4.0; ≥2 in-repo consumers met).** Route fourier's twice-hand-rolled DPR+ResizeObserver Canvas2D onto glass-ui's `createCanvas2D`: `web/src/components/visualization/composables/useCanvasSetup.ts:16-46` (`setupCanvas()` — the substrate fourier already wishes glass-ui shipped) + the inline twin `web/src/components/equation/ConvergencePlot.vue:80-95`. The swap INHERITS the dpr-clamp + `document.hidden` tab-park + live-PRM-freeze fourier currently LACKS (its offscreen leg via `stores/animation.ts setCanvasVisible` is done; tab-hidden + reduced-motion are missing). EXCLUDE the W17 `Constellation` COMPONENT — fourier draws epicycle chains + convergence curves, not a proximity-graph point field; substrate-only. | `useCanvasSetup.ts` (consumed by `BasisCanvas.vue`) + `ConvergencePlot.vue` (the inline twin) — 2 internal consumers |
| **L.W4** | BOOK | **`cartoon-card` shim fate (glass-ui-side decision; fourier HOLDS).** `web/src/style.css:103-112` `@utility cartoon-card { @apply cartoon-surface; … }` re-binds the recipe glass-ui retired at C.W5 — a legitimate cascade-correct shim, 15 application sites. The glass-ui AW.W22-26 glass-atoms band DECIDES whether a unified `.glass-material`/glass-card re-ships a card surface subsuming `cartoon-surface`, OR affirms "consumers own their card surface." fourier holds the shim until that verdict; on a re-ship, the 15 sites are the retirement target (gate: the shim deletes with zero visual delta on `GalleryCard`/`MorphShapePreview`). | `cartoon-card`'s 15 sites (`MorphShapePreview.vue`, `GalleryCard.vue`, …) — retired only on the glass-ui verdict |
| **L.W5** | FOLD | **`--viz-amber` AA-contrast carry (glass-ui-side token rebaseline; fourier HOLDS its override).** `web/src/style.css:119-127` overrides `:root { --viz-amber: hsl(35 76% 35%); --section-color-5: hsl(35 76% 35%); }` because glass-ui ships light `--viz-amber` ≈ 3.54:1 (fails WCAG AA). The override is on the cascade (correct house pattern), NOT a dead local. The glass-ui AW token-assay (W20) / lighthouse-a11y (W32) should rebaseline the upstream light token to ≈4.6:1 (fourier's override IS the spec value); fourier retires its override on that rebaseline's publish. This is a derive-color NON-ask — a one-token contrast rebaseline, not a palette regen. | the upstream `--viz-amber`/`--section-color-5` light tokens — fourier's override retires on the rebaseline |
| **L.W6** | DEV | Close: `L/FINAL.md` (§0 headline / §1 threads-by-disposition / §2 hard-gate table / §3 commits / §4 rationale), citing a green fourier CI run id per executed wave (inv-27). | fourier maintainer (close) |

### §4.1 — What L-adopt does NOT do (recorded, not dressed as a refuted wave)

- **NO aurora / GooBlob / PaperBackdrop / DockBackgroundToggle / Constellation backdrop adoption.** Grep of `web/src` returns ZERO. The app backdrop is `paper-texture` (`App.vue:23`) — a deliberately quiet paper substrate behind a typeset Fourier treatise (KaTeX via `@mkbabb/latex-paper`) + precision viz canvases. A moving WebGL backdrop would FIGHT legibility + the canvas's own color semantics + battery. Honest negative — no consumer pull, do not invent.
- **NO `useViewTransition` adoption.** `router/index.ts:2` already imports the SHIPPED `supportsViewTransitions` and hand-brackets `document.startViewTransition` in `beforeResolve`/`afterEach` for the `/w/`↔`/v/` viz-morph with a PRM carve (`router/index.ts:130-145`). This is a ROUTE-level VT bracket; `useViewTransition` (AQ.W5) is the list/element-swap substrate — not the right seam. Already SOTA.
- **NO `useCountup` / `vReveal` / W16 DeckProgress.** Coefficient amplitudes already animate via `AnimatedDigit` (`CoefficientsSpectrum.vue:99`, 3 panels) — the reactive-numeral component beats the `[data-countup]` editorial walker. The reading-progress rail (`PaperView.vue:314`) already uses glass-ui's shipped `.scroll-progress` native scroll-driven recipe — the RIGHT mechanic for a reading rail, a DIFFERENT mechanic than W16's `:value`-driven `<Progress>` (deck-position). `[data-reveal]` is a marginal nice-to-have, not a ≥2-consumer demand.
- **NO derive-color front-door adoption.** fourier's palette is a FIXED semantic viz set (`--viz-*`/`--section-color-*`, read via `lib/colors.ts:22`), not a single-brand derivation. The only real color ask is the L.W5 AA rebaseline — a token re-tint, not a one-brand derive door.
- **NO `useTextHighlight` adoption.** `grep useTextHighlight web/src` = 0 consumers (it was booked for an equation-hover/diff-viewer that does not exist). SPECULATIVE — drop it from the bump unless/until those features land (the ≥2-consumer / no-speculative-substrate bar).
- **NO new glass-ui write.** A-1/A-2, the `cartoon-card` re-ship decision, and the `--viz-amber` rebaseline are glass-ui-maintainer-owned `ADOPTION-ASKS` rows (inv-16); fourier's act is consume-on-publish, never a sibling-tree write.

## §5 — Inherited invariants

- **inv-15 (name-the-consumer)** — every §4 row names its consumer; L.W3's `useCanvas2D` swap meets the ≥2-consumer bar INSIDE fourier alone (`useCanvasSetup.ts` + `ConvergencePlot.vue`).
- **inv-16 / inv-16′** — fourier writes ONLY `fourier-analysis/**` (+ `deploy/**`); the bump is adoption-of-a-published-peer, NOT a cross-repo write. Each genuine cross-repo ask (W4/W5) is a NAMED `ADOPTION-ASKS.md` row, glass-ui-maintainer-owned.
- **inv-27 (green-means-green)** — the bump cites a GREEN fourier CI run id covering every job; "not a blind bump."
- **inv-30 (platform-over-library)** — honored by the §4.1 negatives (the router VT bracket + native `.scroll-progress` are the platform path; no library replacement forced).
- **Agent git clause** (glass-ui CLAUDE.md K W0 + fourier inv-16) — a dispatched wave-agent is READ-ONLY on git; the orchestrator owns the index.
- **NEW invariant**: NONE. L-adopt is a bump + three carries; nothing is load-bearing beyond one wave (the I-tranche test fails → no new inv-31 minted). The fresh-integer slot stays at 31, namespace-partitioned from the glass-ui precept integers (`INVARIANTS.md §3`).

## §6 — Cross-repo perimeter (inv-16′)

The executable spine is **fourier-local**: the `web/package.json` caret bump, the `web/src/style.css` `@source` line, the `VisualizationView.vue` grid-override deletes, the e2e `test.fixme` flips, the `useCanvasSetup.ts`/`ConvergencePlot.vue` substrate swap — all under `fourier-analysis/**`. What is NOT a fourier ask: the glass-ui 3.4.0 dock fix (AW.W1 — glass-ui-maintainer-owned), the `useCanvas2D` substrate ship (AW.W17), the `cartoon-card` re-ship decision (AW.W22-26), the `--viz-amber` rebaseline (AW.W20/W32). Those are glass-ui's; fourier consumes them on publish. NO new fourier→glass-ui write.

## §7 — Hard gates (completion criterion)

- **`bump-target`** — `web/package.json:14` pins `^3.4.0` (NOT `^3.2.0`/`^3.3.0`); node_modules resolves ≥3.4.0; single keyframes copy in the tree (peer widened to `^2.2.0 \|\| ^3.0.0`). Bite: a `^3.3.0` caret or a dual keyframes install → RED.
- **`dock-collapse-canary`** — a Playwright assert on the editor/canvas/animation dock width delta: the 3 `:start-collapsed`+`#collapsed` docks morph width on first expand under 3.4.0 (mirrors glass-ui's upstream `proof:dock-animation-live`). Bite: a frozen-at-collapsed-width dock → RED (the 3.3.0 regression's signature).
- **`a11y-keystones-live`** — zero surviving `test.fixme` citing `glass-ui-a11y` across `visualization-ux.spec.ts` + `visualization-crud.spec.ts`; the 5 keystones assert green. Bite: a surviving `test.fixme` → RED.
- **`aside-side-consumed`** — `grep grid-template-columns` over `.viz-configurator` in `VisualizationView.vue` = 0 (the 3 overrides at `:322/326/329` deleted; `aside-side="left"` consumed at `:194`). Bite: a surviving grid override → RED.
- **`source-scan-reaches-templates`** — after the `@source` add, `grep -q "text-destructive-foreground" web/dist/assets/*.css` PASSES (the scan reaches the compiled `dist/*.js` templates, not the `.d.ts`-only `dist/components` tree). Bite: the glass-ui-only CVA utility absent from the built CSS → RED.
- **`canvas2d-substrate-swap`** (W3, post-bump) — `useCanvasSetup.ts` + `ConvergencePlot.vue` route through `createCanvas2D`; zero hand-rolled `devicePixelRatio`/`setTransform(dpr…)`/`ResizeObserver`-lifecycle boilerplate remains; a fourier unit/e2e asserts the epicycle clock parks under `document.hidden` and freezes one frame under PRM. Bite: a surviving hand-rolled DPR init or an unparked tab-hidden loop → RED.
- **`green-run-id`** (inv-27) — `L/FINAL.md` cites a GREEN fourier CI run id covering every job per executed wave. Bite: a "green" claim with no run id → RED.

## §8 — Cross-tranche debt + explicit deferrals (folded)

**Folded (SHIP-as-wave)** — the four un-run K.W1 adoptions (asideSide grid-deletes, the 5 inert keystones, the dock-VT `useId` greening, the keyframes-peer widen) fold INTO L.W1's bump; they ride the 3.4.0 caret. The `@source` fix folds into L.W2 (version-independent).

**Named-forward (BOOKED, not built)** — L.W4 (`cartoon-card` shim fate) is BOOKED against the glass-ui AW.W22-26 glass-atoms verdict. L.W5 (`--viz-amber` AA rebaseline) is BOOKED against the glass-ui AW.W20/W32 token-assay. fourier holds both carries until upstream publishes; neither is built in this tranche.

**KILLED (terminal — never re-booked)** — `glass-ui-P5-inner-rounding` (KILLED-AS-PHANTOM, struck at `ADOPTION-ASKS.md`; `Configurator.vue` owns the radius at the container-root clip — never resurrect). The K.W6 console-filter bridge stays KILLED-BEFORE-BIRTH (born-legacy, `ADOPTION-ASKS.md:162`).

**Disclaimed** — A-1/A-2 are NOT outstanding glass-ui asks: they SHIPPED in 3.3.0 (AU.W9 `ce44df3`) and arrive FREE with the bump. The ledger booking them to "AT/3.3.0" is correct on the destination, stale on the verb. NOTE the A-1 satisfaction-shape divergence: it shipped as a FLAT `border-t` hairline (`ConfiguratorLayer.vue:148-149`), NOT the `.instrument-rail` machined groove the `AS/FINAL.md:146-152` self-booking proposed. Record this so a future "the groove still isn't there" re-book is pre-empted — SATISFIED-PRAGMATICALLY, not a gap.

**Declined (recorded, not deferred)** — every §4.1 negative (aurora/blob backdrops, `useViewTransition`, `useCountup`/`vReveal`, derive-color, W16 DeckProgress, `useTextHighlight`). These are findings, not deferrals — no consumer pull exists, so there is nothing to defer.

## §9 — Brittleness window (provisional)

- The bump is publish-gated on glass-ui 3.4.0 (AW.W1, PLANNED-unimplemented at glass-ui HEAD `afdc485`). Until 3.4.0 publishes, fourier HOLDS at `^3.1.0` (installed 3.1.0 — SAFE). Do NOT bump to `^3.2.0` for the non-dock surfaces alone — it strands the dock fix AND a `^3.2.0` caret floats to the broken 3.3.0. One bump, once, to `^3.4.0`.
- **Silent-float hazard:** the `^3.1.0` caret would resolve to the broken 3.3.0 on a stray `npm update`/lockfile regen during the 3.3.0 window. Until 3.4.0, either hold the lockfile pin at 3.1.0 or skip straight to 3.4.0 — never let the caret float to 3.3.0.
- The L.W2 `@source` fix is version-independent (3.0.0/3.1.0/3.3.0 share the `dist/components`-is-`.d.ts` layout); it can land NOW ahead of the bump, decoupling the conformance fix from the 3.4.0 gate.
- The W3 `useCanvas2D` swap is double-gated: on the 3.4.0 publish AND on glass-ui AW.W17 (`createCanvas2D`) actually shipping (a LATER cut than 3.4.0). Hold W3 until both land.
- fourier still imports `lucide-vue-next` directly (35 src files) while glass-ui 3.x moved its icon peer to `@lucide/vue ^1.16.0`. Not a hard break (fourier imports lucide directly, not through glass-ui), but on the bump the maintainer should align the icon peer to avoid two lucide copies in the bundle.

## §10 — Successor

**M-webmcp** (the slid WebMCP feature graduation, ordering π′ — formerly the bare-`L` booking at `K/K.md:176`, hard-gated on Chromium 146 stable). J's inv-27 close (`J/J.md`, ordering μ′ — still OPEN) is downstream of L.W1's bump (`K/K.md:13-19`) and lands once the bump greens fourier CI at source. The deploy spine cold-start + the CORE inv-15 consumer gap remain the REAL load-bearing chronics (glass-ui-INDEPENDENT) — they outrank this bump but do not gate it.
