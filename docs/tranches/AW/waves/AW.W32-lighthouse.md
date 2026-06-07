# AW.W32 - Lighthouse audit — glass-ui demo (perf/a11y/best-practices/SEO)

## State

**Name**: W32 - Lighthouse audit — glass-ui demo (perf/a11y/best-practices/SEO)
**Opens after**: W31 (animation-coherence + DESIGN.md) — the LAST band-G wave; W32 audits the demo AFTER every glass-atoms restyle (W22-W26) and every band-G dogfood (storybook+demo-dock-nav W28, aurora-configurator W29, carousel W30, animation-coherence + DESIGN.md W31) has landed, so the Lighthouse run measures the FINAL demo surface, not a mid-flight one
**Agents**: 2 parallel (harness/gate-runner + budget-config/page-matrix), then a serial orchestrator close
**Hard gate**: `proof:lighthouse-demo` green — a headless Lighthouse run (lighthouse CLI driven by `scripts/lighthouse-demo.mjs` over a built `dist` preview server) meets a per-category budget for EVERY demo route in the page matrix; a11y ≥95 on every page, best-practices ≥95, SEO ≥90, and perf meets a SUBSTRATE-AWARE floor (≥90 on the canvas-free story pages; ≥75 on the WebGL substrate pages — aurora/goo-blob — and the Canvas2D constellation page); CLS <0.1 and LCP ≤2.5s on EVERY page including the substrate pages; born RED (no Lighthouse harness, gate, or budget JSON exists at HEAD).
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, every demo page has a MEASURED, budget-gated Lighthouse score: the gate `proof:lighthouse-demo` runs the lighthouse CLI per category over the full demo route matrix and fails closed when any page drops below its budget — a11y ≥95 (the WCAG-AA floor over the 40+ glass-atoms states from W25/W26), best-practices ≥95, SEO ≥90, perf ≥90 on canvas-free pages and ≥75 on the WebGL/Canvas2D substrate pages, with CLS <0.1 and LCP ≤2.5s everywhere. The perf floor is SUBSTRATE-AWARE by construction — the aurora WebGL2 backdrop, the goo-blob WebGL2 metaball, and the Canvas2D constellation legitimately carry a heavier main-thread cost than a static story page, so they get a documented lower floor rather than a fake-uniform threshold that would either fail the substrate pages or under-gate the static ones. The budget is the deliverable; the demo is dogfooded, not re-architected (this is a demo-internal audit + a gate-runner script — no library `src/` component is minted or changed).

## 3. Scope

1. **The Lighthouse harness.** Author `scripts/lighthouse-demo.mjs` — a Node ESM runner that (a) builds the demo (`npm run build` for the library `dist`, then the demo `vite build` + `vite preview` on a fixed port), (b) drives the `lighthouse` CLI (programmatic API via `lighthouse` + `chrome-launcher`, headless Chrome) over each route in the page matrix, (c) collects the four category scores + the CLS/LCP/FCP/TBT metrics per page into a JSON report, (d) compares each against the per-page budget, and (e) exits non-zero on any breach. The runner reads the budget from a single `scripts/lighthouse-demo.budget.json` (the SOURCE OF TRUTH for thresholds, DRY — no inline magic numbers in the runner). Add `lighthouse` + `chrome-launcher` as `devDependencies` (NOT peers — this is demo/CI tooling, never shipped to consumers).

2. **The substrate-aware budget.** Author `scripts/lighthouse-demo.budget.json` with two budget tiers keyed by route class:
   - **Static tier** (canvas-free story pages — foundations, primitives, containers, navigation, data, feedback, motion, tools, compositions, composables): perf ≥90, a11y ≥95, best-practices ≥95, SEO ≥90, CLS <0.1, LCP ≤2.5s, TBT ≤300ms.
   - **Substrate tier** (the WebGL2 aurora page, the WebGL2 goo-blob page, the Canvas2D constellation page): perf ≥75 (the documented WebGL/Canvas main-thread allowance), a11y ≥95, best-practices ≥95, SEO ≥90, CLS <0.1, LCP ≤2.5s, TBT ≤600ms. The lower perf + higher TBT floor is RATIONALE'd inline (a comment block in the JSON + the audit doc) — the single-pass aurora budget (W4) + the RAF-loop/intersection-pause constellation (W17) + the offscreen-pause WebGL substrate set the real lower bound; the budget is calibrated to the measured baseline + a regression margin, not an aspiration.

3. **The per-page route matrix.** Enumerate the demo routes from `demo/stories/manifest.ts` (the 11 live category bins + the index `/`) into the matrix: the runner walks the manifest (single-source — the matrix is DERIVED from the manifest, not a hand-kept parallel list that drifts) and runs Lighthouse on the index `/`, each `category:<id>` landing, and the substrate-tier story routes (`/substrates/aurora`, `/substrates/goo-blob`, the constellation story under `/motion` or `/substrates` per its W17 home). Light mode is the canonical run; a dark-mode arm runs the index + one representative substrate page (the `.dark` token-flip CLS surface) to prove the theme-flip carries no CLS regression. The matrix records the route → tier mapping; a new manifest category auto-joins the static tier unless flagged substrate.

4. **The CLS / LCP / font instrumentation.** The runner asserts the font-bridge contract from CLAUDE.md (Plus Jakarta Sans `optional`, Fira Code `swap`, Capsize geometry-neutral fallback → zero-CLS by design) by checking CLS <0.1 on every page AND specifically capturing the theme-flip + canvas-toggle as discrete CLS observations (the dark-mode arm + a substrate page-load). LCP ≤2.5s asserts the font block does not push the largest text/canvas paint past the budget. These are real Lighthouse-metric assertions, not greps.

5. **The gate + registration.** Register `proof:lighthouse-demo` in `package.json` (`"proof:lighthouse-demo": "node scripts/lighthouse-demo.mjs"`) and add it to the `scripts/gates.mjs` `GATES` manifest tagged `{ci}` (it needs a headless-Chrome runner — `{ci}`, not `{local}` default, so a no-Chrome local box does not false-fail; the CI image carries Chrome). It is NOT in the `{release}` set (a Lighthouse run is a CI quality gate, not a tag-blocking release gate — the release set stays `proof:aw-final`). Document the local-run path (`npm run proof:lighthouse-demo` with a Chrome present) + the CI tag in the audit doc.

6. **The audit record.** Write `docs/tranches/AW/audit/W32-lighthouse-demo.md` — the per-page score table (route, tier, the four category scores, CLS, LCP), the budget rationale (why the substrate tier floors at 75/600ms), the top remediation items if any page is born-RED below budget at first run, and the re-run command. The audit cites the measured baseline run-id.

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- the file bounds expand to a library `src/` component edit — if a demo page scores below its a11y budget because a SHIPPED glass-ui primitive emits an axe violation (a missing role, a contrast failure on a W25/W26 atom), that is an AW component wave (W25/W26 territory), NOT a demo-audit edit; halt and book the fix to the implicated band rather than patching the library from the audit wave;
- a substrate page cannot meet even the 75 perf floor on the CI Chrome — the WebGL/Canvas main-thread cost genuinely exceeds the documented allowance — which means the substrate budget premise (W4 single-pass / W17 RAF-pause holds the cost down) is FALSE on real hardware; halt and re-research the substrate cost (it is an aurora/blob/constellation perf regression, not a budget-number tweak);
- the third iteration still cannot make the harness produce a stable score (Lighthouse flake — score variance > ±3 across runs on the same page) — halt and re-research the harness determinism (throttling profile, run-count median, headless flags) rather than re-dispatching the same flaky run.

## 4. File Bounds

| File | Access |
|---|---|
| `scripts/lighthouse-demo.mjs` | create (the harness + gate runner) |
| `scripts/lighthouse-demo.budget.json` | create (the substrate-aware budget — single source of thresholds) |
| `package.json` | modify (register `proof:lighthouse-demo`; add `lighthouse` + `chrome-launcher` devDependencies) |
| `scripts/gates.mjs` | modify (register `proof:lighthouse-demo` in the `GATES` manifest, tagged `{ci}`) |
| `docs/tranches/AW/audit/W32-lighthouse-demo.md` | create (the per-page score table + budget rationale + baseline run-id) |
| `docs/tranches/AW/audit/artifacts/W32-lighthouse/` | create (the per-page Lighthouse JSON/HTML reports) |

Do NOT touch: `docs/precepts/`, any library `src/**` component (the audit measures + gates the SHIPPED demo + library; a sub-budget a11y/perf miss caused by a library primitive BOOKS to its band — W25/W26 for atoms, W4/W17 for substrates — it is not patched here), `demo/**` SFCs (the matrix is DERIVED from `demo/stories/manifest.ts` read-only; a story is not edited to game a score — a real score miss is a real finding), `ci.yml` (the gate is registered in the MANIFEST; `gates:verify-ci` reconciles `ci.yml`, the close wave W33 owns the CI wiring).

## 4a. Disjointness

Two parallel units + a serial close:

- **AW.W32.a** owns the harness — `scripts/lighthouse-demo.mjs` + the `package.json` devDependency/script registration + the `gates.mjs` manifest entry.
- **AW.W32.b** owns the budget + the matrix + the audit — `scripts/lighthouse-demo.budget.json` + `docs/tranches/AW/audit/W32-lighthouse-demo.md` + the artifacts dir.
- The orchestrator close runs the harness against the budget, captures the baseline run-id, and writes the final score table into the audit doc.

No two units share a `modify` path: a owns `lighthouse-demo.mjs`/`gates.mjs`/`package.json`; b owns the budget JSON + audit doc. The runner (a) READS the budget JSON (b) at runtime — a read-only dependency, not a co-write. Sequence: a + b parallel; the orchestrator serializes the baseline run after both land (the run needs both the harness and the budget present).

## 4b. Worktree Plan

Two writers → sibling worktrees, or commit a before parallelizing b:

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AW.W32.a | `/Users/mkbabb/Programming/glass-ui-aw-w32a` | n/a (Node/Vite, no cargo) |
| AW.W32.b | `/Users/mkbabb/Programming/glass-ui-aw-w32b` | n/a (Node/Vite, no cargo) |

The orchestrator runs `git worktree list` + `git worktree add` before dispatch. The baseline Lighthouse run happens on the integrated tree after merge (the headless-Chrome run is single-threaded and needs both files).

## 5. Agent Units

### AW.W32.a The Lighthouse harness + gate runner

- Goal: a deterministic headless-Lighthouse runner walks the demo route matrix, scores each page per category, compares against the budget JSON, and exits non-zero on any breach — registered as `proof:lighthouse-demo` `{ci}`.
- Mechanism: author `scripts/lighthouse-demo.mjs` (build demo → `vite preview` → `lighthouse` programmatic API over each route via `chrome-launcher` headless → median of N runs for determinism → compare to `lighthouse-demo.budget.json` → emit per-page JSON to the artifacts dir → exit non-zero on breach); add `lighthouse` + `chrome-launcher` devDependencies; register the script in `package.json` + the `gates.mjs` manifest tagged `{ci}`. The route matrix is DERIVED from `demo/stories/manifest.ts` (read the manifest, not a hand list).
- Files: `scripts/lighthouse-demo.mjs`, `package.json`, `scripts/gates.mjs`.
- Sub-gate: `node --check scripts/lighthouse-demo.mjs`; `npm run proof:lighthouse-demo` runs end-to-end on a Chrome-bearing box and emits a per-page JSON report; `npm run gates:verify-ci` green (the gate is in the manifest with its `{ci}` tag, reconciled against `ci.yml`).

### AW.W32.b The substrate-aware budget + page matrix + audit

- Goal: a single budget JSON encodes the static-tier (perf ≥90) and substrate-tier (perf ≥75, WebGL/Canvas-aware) thresholds with a documented rationale, mapped to the demo route matrix, and the audit doc records the per-page baseline.
- Mechanism: author `scripts/lighthouse-demo.budget.json` (two tiers — static + substrate — with the a11y ≥95 / BP ≥95 / SEO ≥90 / CLS <0.1 / LCP ≤2.5s floors uniform, and the perf/TBT floors tier-split, each with an inline rationale comment-key); map each manifest category + the aurora/goo-blob/constellation substrate pages to a tier; author `docs/tranches/AW/audit/W32-lighthouse-demo.md` (the score-table skeleton + the substrate-floor rationale + the re-run command + the remediation-booking rule).
- Files: `scripts/lighthouse-demo.budget.json`, `docs/tranches/AW/audit/W32-lighthouse-demo.md`.
- Sub-gate: the budget JSON parses (`node -e "JSON.parse(...)"`) and carries both tiers with every page-class mapped; the audit doc names every page's tier + the substrate rationale; `git diff --check` clean.

## 6. Hard Gate

1. **The gate exists + is registered, born RED.** `npm run proof:lighthouse-demo` is a registered script; it appears in the `scripts/gates.mjs` `GATES` manifest tagged `{ci}`; `npm run gates:verify-ci` is green. On HEAD before the wave, no such script/gate/budget exists — the gate is born RED (cannot run).
2. **Per-category budget met on EVERY page.** The harness runs Lighthouse over every route in the manifest-derived matrix; for each page: a11y ≥95, best-practices ≥95, SEO ≥90. Any page below any floor fails the gate. The per-page JSON in the artifacts dir is the evidence.
3. **Substrate-aware perf floor met.** Static-tier pages score perf ≥90; substrate-tier pages (aurora WebGL2, goo-blob WebGL2, Canvas2D constellation) score perf ≥75. The tier mapping is read from the budget JSON; a substrate page below 75 OR a static page below 90 fails the gate.
4. **CLS <0.1 + LCP ≤2.5s everywhere.** Every page (static AND substrate) scores CLS <0.1 and LCP ≤2.5s. The dark-mode arm (index + one substrate page) proves the `.dark` token-flip carries no CLS regression; the canvas-toggle/substrate page-load CLS is captured discretely. (Asserts the font-bridge zero-CLS contract.)
5. **The audit record cites the baseline.** `docs/tranches/AW/audit/W32-lighthouse-demo.md` carries the per-page score table (route, tier, four category scores, CLS, LCP), the substrate-floor rationale, and the green baseline run-id; the artifacts dir carries the per-page Lighthouse JSON.
6. **No library/demo source edited to pass.** `git diff --name-only` contains no path under library `src/**` or `demo/**` SFCs — the audit measures + gates; a real sub-budget miss is BOOKED to its band (W25/W26/W4/W17), not patched here. (If a real miss exists, the audit records the booking; the wave closes `complete_with_misses` with the booking, not by editing the library.)

## 7. Format And Lint Cadence

- `node --check scripts/lighthouse-demo.mjs` after each harness batch.
- `node -e "JSON.parse(require('fs').readFileSync('scripts/lighthouse-demo.budget.json'))"` to validate the budget JSON.
- `npm run gates:verify-ci` after the manifest registration.
- `npm run proof:lighthouse-demo` (on a Chrome-bearing box) before close — the full matrix run is itself the gate.
- `git diff --check` for whitespace on the audit doc + the JSON.
- No formatter skipped; the Lighthouse run is the generated-format/aggregate check.

## 8. Verification Artefacts

- `scripts/lighthouse-demo.mjs` (the harness) + `scripts/lighthouse-demo.budget.json` (the budget).
- `docs/tranches/AW/audit/artifacts/W32-lighthouse/` — the per-page Lighthouse JSON (+ HTML) reports + the median-run record.
- `docs/tranches/AW/audit/W32-lighthouse-demo.md` — the per-page score table + the substrate-floor rationale + the baseline run-id + the remediation-booking list (if any).
- The green run-id of `proof:lighthouse-demo` (cited in the audit doc + carried into W33 close `FINAL.md`).

## 9. Commit Plan

- `feat(gates): proof:lighthouse-demo harness + substrate-aware budget` — the runner + budget JSON + the `package.json`/`gates.mjs` registration. Body required (gate/profiling change): the two-tier budget rationale (static ≥90 / substrate ≥75), the manifest-derived matrix, the `{ci}` tag rationale (headless Chrome).
- `docs(AW): W32 — Lighthouse demo audit (per-page score table + baseline)` — the audit doc + the artifacts. Body required (audit/profiling change): the per-page scores, the substrate-floor calibration, any booked remediation.

## 10. Dependencies

- **Depends on**: W31 (animation-coherence + DESIGN.md) + the whole band G (W28 storybook-completeness + demo-dock-nav gives the canonical route matrix; W29 aurora-configurator, W30 carousel, W31 animation-coherence restyle/reconcile the surfaces the run measures) + the glass-atoms band (W22-W26 — the a11y ≥95 floor measures their atom states) + W4 (aurora single-pass budget — the substrate perf floor calibrates against it) + W17 (constellation RAF-pause substrate). The Lighthouse run measures the FINAL demo; it must open after every restyle lands.
- **Blocks**: the W33 close `FINAL.md` (the close cites the `proof:lighthouse-demo` green run-id in the gate fleet); paired with H.W11 (the slides-side Lighthouse audit — same budget philosophy, slides route matrix).

## 11. Archaeology

The Lighthouse audit was named in the AW directive (RECAP:145 — "deep Lighthouse audit for every page + slide: perf/a11y/best-practices/SEO") and flagged in the convergence digest as recorded-but-deferred (`audit/cogency-audit-full.md:879` — "noted as a perf-a11y wave, not explicitly waved"), then surfaced across Lanes 25/27/28 of the cogency-harden round as the LOAD-BEARING missing gap: WebGL/font/token-read performance, CLS on theme-flips + visibility-token swaps, and a11y coverage across the 40+ interactive atoms (W25/W26) were UNMEASURED and unmapped to any hard gate. The cogency round seeded it as AW.W31 then re-anchored it to the band-G tail (W32) so the run measures the demo AFTER the glass-atoms restyle + the band-G dogfood waves land (a mid-flight run would score a surface that W28-W31 then changes). The substrate-aware budget is the answer to the digest's substrate-risk table (`cogency-audit-full.md:3781` — WebGL2 aurora "High FCP/LCP on 3G", Canvas2D constellation "High CLS risk on visibility token change", font system "LCP risk if font block > 3.2s"): a uniform perf floor would either fail the legitimately-heavy WebGL pages or under-gate the static ones, so the budget splits by route class with the W4 single-pass / W17 RAF-pause / offscreen-pause substrate cost as the calibrated lower bound. OVERFIT GUARD: this wave mints NO library primitive — it dogfoods the SHIPPED demo + library (the dock, Configurator, carousel are already-shipped with consumers; W28-W31 restyle them, W32 measures them) and adds a CI gate-runner + an audit; a real sub-budget miss BOOKS to the implicated band, it does not grow the library surface (L invariant 8 / ≥2-consumer held — the audit IS the deliverable, not a new component).
