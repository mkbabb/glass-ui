# fourier-cohort-residuals — the bump never happened; ALL four named 3.2.0 adoptions still pending AND A-1/A-2 already shipped (3.3.0) — fourier's adoption wave is a single `^3.1.0`→`^3.4.0` bump

fourier-analysis pins `@mkbabb/glass-ui: "^3.1.0"` (`web/package.json:13`) and its on-disk
linked copy is STILL `3.1.0` (`web/node_modules/@mkbabb/glass-ui/package.json` version `3.1.0`).
The CONSTELLATION.md §9 (2026-06-04) ADOPT-NOW `^3.1.0`→`^3.2.0` bump that "belongs at the FRONT
of fourier's chain" (`CONSTELLATION.md:141`) never landed. Every named 3.2.0 adoption is verified
PENDING in fourier code TODAY. The A-1/A-2 booked asks are now SATISFIED-UPSTREAM — they shipped in
glass-ui AU.W9, which is in the 3.3.0 cut (the ledger that booked them to "AT" is stale). This lane
covers the BUMP RESIDUALS (the J/K history, the four named adoptions, the ask dispositions); the
GlassDock blast-radius / useCanvas2D / glass-atoms openings are the sibling `fourier-adoption-gap`
lane's scope and are not re-litigated here.

## Findings

### 1. The bump never happened — what blocked it (J/K tranche history)
fourier authored TWO tranches whose sole glass-ui job was this bump, and both stayed AUTHORED-only:
- **J (Greek head μ′, the data-model tranche)** scoped "W5–W7 after glass-ui 3.2.0", then on
  2026-06-04 re-ground that gate to "ADOPT-NOW, bump-first" (`docs/tranches/J/PROGRESS.md`, the
  `2026-06-04 — glass-ui-3.2.0 re-ground` entry: "the bump is NOT yet done … still `3.1.0`; the
  working tree has not been reinstalled"). J STAYS OPEN — its blockers were never the bump itself
  but four independent things: CI red over HEAD, W5–W8 planned, the CORE has zero frontend consumer
  (binary inv-15 breach), the deploy-of-record never landed (host 29 commits behind).
- **K-deploy (Greek head ν′)** explicitly re-sequenced the bump to **W1 — THE BUMP** ("`^3.1.0`→
  `^3.2.0` ADOPT-NOW; greens CI at source", `docs/tranches/K/PROGRESS.md`, the re-sequence table).
  But K.W8 (close) is `planned` and the BUMP wave was never executed ("AUTHORED + re-grounded only
  — nothing executed. The bump is the FIRST executable move; it is NOT yet done").
- **What blocked it: nothing technical — it awaits "Begin."** Both tranches are DEV/docs-only,
  un-greenlit. The bump is a one-line caret + `npm install`; the gate dissolved on 2026-06-04. The
  real co-blockers are fourier-LOCAL and glass-ui-INDEPENDENT (the deploy spine cold-start, the
  inv-15 consumer gap) — they outrank the bump but don't gate it (`K/PROGRESS.md`: "the deploy spine
  … remains the REAL load-bearing chronic and is glass-ui-independent").

### 2. The named 3.2.0 adoption items — EACH verified still pending in fourier code at HEAD
The ledger named four. Verified TODAY against fourier `web/src` + `web/e2e`:
- **`asideSide` (DEC-2 controls-LEFT) — PENDING.** `VisualizationView.vue:194` mounts
  `<Configurator scroll-mode="auto" class="viz-configurator">` with NO `aside-side` prop (defaults
  `right`). The three `grid-template-columns` overrides the bump would delete are LIVE at
  `VisualizationView.vue:322/326/329` (the `.viz-configurator` lg/xl/2xl bands). glass-ui side
  CONFIRMED shipped: `Configurator.vue:85` (`asideSide?`), `:101` (default `right`), `:162`
  (`lg:col-start-2` flip, no DOM reorder).
- **`inert` a11y keystones — PENDING (still `test.fixme`).** FOUR keystones carry the booked
  `aria-hidden-focus` fixme: `e2e/visualization-ux.spec.ts:110` (workspace default), `:133`
  (Configurator-open), `:192` (AnimationControls dropdown), `:212`; plus the viewport-parameterized
  `e2e/visualization-crud.spec.ts:630` (workspace default @ each vp). All cite the booked
  `glass-ui-a11y` ask pending "the glass-ui `inert` release + the guarded `^2→^3` bump." glass-ui
  side CONFIRMED shipped: `ConfiguratorLayer.vue:137-138` (`:aria-hidden="!open"` + `:inert="!open ||
  undefined"`). On the bump these flip from `test.fixme` to live asserts.
- **`useTextHighlight` on `/dom` — PENDING with ZERO consumers.** `grep useTextHighlight web/src` =
  0 hits. The ledger (`ADOPTION-ASKS.md:188`) booked it for "the equation-hover + diff-viewer
  consumers" — neither exists yet. glass-ui side CONFIRMED shipped on `/dom` (NOT `/motion-core` —
  the ledger fixed that doc-drift): `src/composables/dom/useTextHighlight.ts:129` (export),
  `dom/index.ts:22`. This is a SPECULATIVE adoption — no extant fourier consumer; only book it if the
  equation-hover/diff-viewer features actually land (the ≥2-consumer / no-speculative-substrate bar).
- **the `useId` dock VT-name fix — PENDING (can't adopt; node_modules at 3.1.0).** The dock-VT
  duplicate (`glass-dock-1` collision across co-mounted docks) is the single root cause of fourier's
  e2e red (~13 specs trip the "no console errors" probe). glass-ui side CONFIRMED shipped:
  `GlassDock.vue:144` (`const dockId = \`glass-dock-${useId()}\``), `:226` (the VT-name binding).
  fourier consumes the fix only AFTER the bump + reinstall — until then its e2e stays red on the
  pre-existing collision.

### 3. The A-1/A-2 booked asks — SHIPPED in 3.3.0 (the ledger booking them to "AT" is STALE)
The ADOPTION-ASKS ledger (`ADOPTION-ASKS.md:170-171`, dated 2026-06-04) booked A-1 + A-2
"BOOK-with-kill-date = glass-ui AT/3.3.0 … genuinely absent at 3.2.0 … glass-ui SELF-BOOKED both to
its AT successor (`AS/FINAL.md:146-155`)." Verified against glass-ui src at HEAD — they SHIPPED:
- **A-1 (inter-row divider opt-in) — SHIPPED, but with a DESIGN-SHAPE divergence.** `ConfiguratorLayer.vue:53`
  carries the `dividers?: boolean` prop; `:148-149` emits `[&>*+*]:border-t [&>*+*]:border-border/30
  [&>*+*]:pt-2` when set. Provenance: commit `ce44df3` **"feat(tranche-AU): W9 — ConfiguratorLayer
  A-1 divider opt-in"** (`git merge-base --is-ancestor ce44df3 HEAD` = TRUE; HEAD `afdc485` is the
  3.3.0 cut `e9c4ffc` "the AU+AV cut"). **Divergence:** the AS/FINAL self-booking (`AS/FINAL.md:146-152`)
  proposed porting the `.instrument-rail` *twin-line machined groove* (catch-light over under-shadow,
  `instrument-chassis.css:8-9,231`); what shipped is a FLAT `border-t` hairline. The original ask's
  satisfaction text ("the machined groove, not flush, not a flat line") is therefore NOT met by the
  shipped shape — but the flat opt-in is what AU.W9 chose (SFC-conditional, zero CSS rung, no budget
  rebase). fourier gets a divider; it does not get the rail groove. Treat as SATISFIED-PRAGMATICALLY.
- **A-2 (`label`/`sub` → typography ladder) — SHIPPED.** `ConfiguratorLayer.vue:112` uses
  `text-small font-semibold` and `:117` `text-micro font-mono`. `text-small` is a real typography
  ladder `@utility` (`typography.css:328`), NOT a magic literal — same AU.W9 commit `ce44df3`
  ("A-2 typography-ladder titles"; `AU/PROGRESS.md:81` `configurator-a2-ladder` FOLD row, 2 consumer
  stories). One ladder-rung change now restyles every pane title. SATISFIED-UPSTREAM.
- **Disposition: NEITHER folded into AW, NEITHER dropped — both already DONE in 3.3.0.** `grep` of
  the AW waves tree finds A-1/A-2 only in audit/research files, never in a wave spec. AW.W20
  (styling-assay) and AW.W29 (aurora-Configurator restyle) touch the Configurator but carry NO A-1/A-2
  scope (W29 is a glass-atoms-spine dogfood restyle, not the divider/ladder ask). Correct: there is
  nothing left for AW to do here — the bump to 3.3.0+ delivers both.

### 4. fourier mounts GlassDock — 3.3.0 blast radius; the bump MUST target 3.4.0
fourier mounts `GlassDock` at THREE sites, all using the simple two-layer collapse the 3.3.0
width-morph regression freezes:
- `EditorControlsDock.vue:6` (import) + `:56` (`<GlassDock :collapse-delay="2000" :start-collapsed="true" fit-content>`).
- `CanvasControlsDock.vue:7` + `:41` (`<GlassDock ref="dockRef" fit-content :start-collapsed="true">`).
- `AnimationControls.vue:8` + `:58` (`<GlassDock … :start-collapsed="true">`).
The `^3.1.0` caret resolves to 3.3.0 on a fresh `npm install` — which would adopt the BROKEN dock
collapse. fourier is currently SAFE only because node_modules is still linked at 3.1.0.
**The bump target is 3.4.0 (the AW.W1 fix), NOT 3.3.0.** This single edge re-sequences the
ledger's entire "ADOPT-NOW to 3.2.0" framing: the correct adopt is now a deferred-to-3.4.0 bump.

## Wave-forming input (for fourier's adoption wave — the K-deploy W1 BUMP, re-grounded)

- **The bump version: `^3.1.0` → `^3.4.0`** (NOT `^3.2.0`, NOT `^3.3.0`). 3.4.0 is the AW.W1 dock-
  collapse-regression fix publish; fourier mounts GlassDock at 3 sites so it MUST clear 3.3.0. Edit
  `web/package.json:13` + `npm install` + lock-regen. This SUPERSEDES the stale `^3.2.0` framing in
  `J/PROGRESS.md`, `K/PROGRESS.md`, `CONSTELLATION.md:141`, `ADOPTION-ASKS.md:160` — every one of
  which targets `^3.2.0`. SEQUENCING EDGE: this bump is gated on the glass-ui AW.W1 → 3.4.0 publish
  (PLANNED, unimplemented). It cannot execute today.
- **On the bump, four code changes land together:**
  1. consume `aside-side="left"` on `VisualizationView.vue:194` + DELETE the 3 grid overrides
     (`:322/:326/:329`) — DEC-2 controls-LEFT.
  2. un-`test.fixme` the 5 a11y keystones (`visualization-ux.spec.ts:110/133/192/212` +
     `visualization-crud.spec.ts:630`) → live asserts (the `inert` fix clears `aria-hidden-focus`).
  3. the dock-VT `useId` fix greens fourier e2e at source (the `glass-dock-1` collision dissolves);
     the W6 console-filter bridge stays KILLED-BEFORE-BIRTH (`ADOPTION-ASKS.md:162` — born-legacy).
  4. (verify, don't break) the 3 GlassDock collapse sites animate correctly post-3.4.0 — add a
     dock-collapse e2e assert as the bump's acceptance proof (the regression's canary).
- **`useTextHighlight` is NOT a bump line** — zero fourier consumer. Drop it from the wave unless/
  until the equation-hover or diff-viewer feature lands (no-speculative-adoption).
- **A-1/A-2 need NO fourier action** — already SHIPPED (3.3.0); arrive free with the 3.4.0 bump.
  Strike both from any "outstanding glass-ui ask" list. Note the A-1 flat-divider vs machined-groove
  divergence in the wave doc so a future "the groove still isn't there" re-book is pre-empted.
- **Gate sketch:** `bump-acceptance` = (a) `web/package.json` pins `^3.4.0` AND node_modules resolves
  ≥3.4.0; (b) e2e green with the 5 keystones UN-fixme'd (no `test.fixme` left citing `glass-ui-a11y`);
  (c) a dock-collapse e2e assert passes (the 3.3.0-regression canary); (d) the 3 grid overrides are
  DELETED (`grep grid-template-columns VisualizationView.vue` = 0 for `.viz-configurator`). Bite: a
  surviving `test.fixme`/grid-override, or a frozen dock on expand → RED.
- **File bounds:** `web/package.json:13`; `web/src/components/visualization/VisualizationView.vue`
  (`:194` Configurator, `:322/326/329` grids); `web/e2e/visualization-ux.spec.ts`,
  `web/e2e/visualization-crud.spec.ts` (the 5 fixme keystones); the 3 dock SFCs (collapse canary).

## Anti-findings (verified FINE / already done)

1. **A-1 + A-2 are SHIPPED (3.3.0 via AU.W9, commit `ce44df3`)** — NOT outstanding glass-ui asks.
   The ledger booking them "BOOK-to-AT/3.3.0" is correct on the destination but stale on the verb:
   they are DONE, not pending. No AW work needed.
2. **The asideSide / inert / useId fixes are all genuinely SHIPPED at glass-ui HEAD** — verified at
   `Configurator.vue:85/101/162`, `ConfiguratorLayer.vue:137-138`, `GlassDock.vue:144/226`. The
   ledger's SATISFIED-UPSTREAM claims hold; the only fix to the ledger is the bump TARGET (3.4.0).
3. **P5 inner-rounding is correctly KILLED-AS-PHANTOM** — verified `Configurator.vue` owns the
   radius at the container-root clip (`rounded-panel … overflow-hidden`, the `:92` comment confirms
   "No per-section radius"); the AS/FINAL "misdiagnosis" verdict (`AS/FINAL.md:113-118`) stands.
   Never re-book.
4. **fourier's J/K re-ground discipline is sound** — both tranches correctly dissolved the
   "wait-for-a-future-glass-ui-release" gate to "bump-first," correctly killed the console-filter
   bridge as born-legacy, and correctly flagged the inv-15 consumer gap as the true (glass-ui-
   independent) J critical path. The only correction the AW round forces is the 3.3.0 dock regression
   re-targeting the bump to 3.4.0 — which the J/K docs could not have known (3.3.0 post-dated them).

## Summary
fourier still pins `^3.1.0` (`web/package.json:13`, node_modules at 3.1.0); the ledger's ADOPT-NOW
`^3.2.0` bump never executed — it awaits "Begin" on the authored J/K tranches, not a technical
blocker. All four named 3.2.0 adoptions verified PENDING in fourier code: `asideSide` (3 grid
overrides live at `VisualizationView.vue:322/326/329`), the `inert` a11y keystones (5 `test.fixme`
across the two e2e specs), `useTextHighlight` (ZERO consumers — speculative, drop it), the `useId`
dock fix (unadoptable at 3.1.0). The A-1/A-2 booked asks are NOW SHIPPED (3.3.0 via AU.W9 `ce44df3`),
NOT folded into AW and NOT dropped — done upstream; A-1 shipped as a FLAT divider, not the
instrument-rail machined groove the AS self-booking proposed (a satisfaction-shape divergence worth a
note). fourier mounts GlassDock at 3 sites (Editor/Canvas/Animation), so the 3.3.0 collapse
regression is a blast-radius hit — the adoption wave's bump MUST target **3.4.0** (the AW.W1 fix), not
the ledger's `^3.2.0`. This re-targeting supersedes the version in every fourier tranche doc.
Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/fourier-cohort-residuals.md
