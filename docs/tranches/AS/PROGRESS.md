# Tranche AS — PROGRESS

Execution log for tranche AS (the gate-integrity class + the modern-web leverage AR left). Updated at wave boundaries. Plan basis — `docs/tranches/AS/AS.md`; the W0 deep audit at `audit/W0-L{1..6}-*.md`; the W1 design slices authored in AS.md §Wave sequence; the close at `FINAL.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched) / TERMINAL-KILL / USER-DOMAIN (cross-repo; name-forward).

## Top-line status

**AS.W2b gate-fix wave EXECUTED — the gate matrix is green on glass-ui's own surface; 3.2.0 cleared for publish (W6).** AS.W2 (gate-integrity, inv-θ) shipped (`d2d1d0b`); AS W3/W4/W5 (P9 silent-styling fix, G4 postTask, G1/G2 queries, P4/P1/P6/P8, L1) shipped (`8c0cced`) and the rounded-corner chronic is CLOSED (visual-evidence confirmed — `audit/visual/W-cmp-configurator.md`). A second deep audit (W0b — `audit/W0b-path-forward.md` + `W0b-L1/L3/L4`) found AS.W2's own unified `local==ci==release` matrix RED; **AS.W2b (`8114bba`) + follow-up (`fef1b8e`) closed it: R1 externalize value.js (aurora 47.7→16.8 KiB), R2 strip the 68 `development` keys (proof:resolution glass-ui-clean), R3 the P9 `--spacing` base + `proof:components-css` gate, R4 useTextHighlight multiplex, R5 proof:vt-names fixtures, R6 signal merge + G1 style-probe, R7 keyframes peer `^2.2.0 || ^3.0.0` (3.0.0 now the published latest — validated; greens proof:package).** 611 tests green; gates:verify-ci 14-gate match; every glass-ui-own gate green; the residual local REDs (value.js `development` → K.W2.5, bbnf-lang dist-alias fossil, fourier's pending phantom-class patch) are all sibling/handoff conditions, name-forward under inv-16 and CI-green when the siblings are absent. The original W0b RED detail follows:

The W0b audit found AS.W2's own unified `local==ci==release` matrix was RED:
- **R1 release-blocker** — `@mkbabb/value.js` absent from `vite.library.ts` `libraryExternal`, so the cohort's `inv-K-2` aurora rewire inlines 78 KB of value.js into `dist/aurora.js` (+187.6% gzip), failing `profile:budget`. Fix: externalize (mirror keyframes.js).
- **R2 release-blocker (contract)** — the cohort's `inv-K-4` re-added the `development` exports condition (68 keys); `proof:resolution` fails closed (contract-v2 forbids it). Reconcile-vs-strip is a cross-repo user call.
- **R3** P9 ships 140 `var(--spacing)` against an undefined `--spacing` (spacing utilities no-op in a bare consumer) + no `components.css` gate + `/styles` at 98% budget; **R4** P4 multi-instance highlight collision; **R5** `proof:vt-names` fixtures uncommitted; **R6** G1 `@supports` size-vs-style probe + `usePrioritizedTask` signal merge.

These fold into **AS.W2b** (R1+R3 glass-ui-owned, land first; R2 cross-repo) → **AS follow-up** (R4/R5/R6) → W6 close + the 3.2.0 publish once green. The **visual-evidence protocol is executed** (the booked paired-π): 102 root PNGs archived+categorized to `audit/visual/archive/2026-06-03/`; demo captured (`as-verify/`); before/after comparison ran.

**AS.W7 (visual + design correctness) — DONE via the three-wave cycle (audit → frontend-design refine → harden).** The user's live demo review surfaced 13 visual/design defects (D1-D13; `audit/W7-visual-defect-ledger.md`). Wave 1 root-caused each at file:line with deterministic measurements (`audit/W7/W1-A*.md`); Wave 2 fixed all 13 across 6 file-disjoint tracks (`96858c8`); Wave 3 adversarially hardened + confirmed all 13 visually resolved (`00bd5f9`, `audit/W7/W3-H*.md`). Headlines: D10 aurora overhaul (shader K_* time-rate → slowly-alive; `deriveAurora` SHIPS — the user's ask is the ≥2 witness, superseding the P2 BOOK); D1/D13 the muddy dark bg (`--rainbow-pastel-*` had no dark variant → `--section-color-*`); D2/D12 GlassDock `overflow:"scroll"` prop. Wave 3 caught a **silent-no-op**: Wave 2's dock wiring passed a nonexistent `scroll-on-overflow` prop (kebab fall-through vue-tsc+units miss) so the fix was test-green but inert in the running app — fixed. 597 tests, build green. Non-blocking punch-list folded (a dock-prop carry guard test; CategoryRail aria-label→`<aside>`; scroll-edge fade; OIL-preset plateau; configurator-375 above-fold; Derive-panel below-fold-at-1440). The R1/R3/R2 publish gate (AS.W2b) is unchanged — AS.W7 is design correctness riding alongside, not the publish.

AS is the dual of AR's headline lifted one level: AR's `proof:vt-names` (inv-η) made a component's platform binding statically sound; AS's inv-θ makes the *verification fleet* statically sound — one `constellation.mjs` membership + `resolveSibling` policy (collapsing 5 hardcoded copies + 3 absent-sibling forms + the `bbnf-buddy`↔`bbnf-lang/playground` drift), one `gates.mjs` manifest (local == CI == release as filters), pure-function gate output (gitignored `.cache/`, no `generatedAt`, byte-stable), the lockfile re-drift guard, and `proof:vt-names` hardened to its claim (the 4 evasion vectors + per-mint dataflow). It then takes the leverage AR left — re-derived against 3.1.1 HEAD: G4 `postTask` (strongest), G1 density container-queries, G2-rescoped scroll-state(scrollable), G3 downgraded — and folds the chronic deferrals at the ≥2-bar against HEAD reality (no double-mint of the already-shipped OKLab/`--glass-opacity-dock`), as a **3.2.0 minor** published through the repaired CI.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AS.W0 | Deep 6-lens audit + AS-GU roster re-derivation + native-drawer ruling | DEV | **DONE** | `audit/W0-L1-changes-adversarial.md` · `W0-L2-plan-vs-reality.md` · `W0-L3-prompt-completeness.md` · `W0-L4-deferred-ledger.md` · `W0-L5-precepts-architecture.md` · `W0-L6-modern-web-overfitting.md` |
| AS.W1 | Design slices — gate-integrity substrate ‖ `proof:vt-names` hardening ‖ G4/G1/G2-rescoped recipes ‖ AS-GU disposition + deferred fold table. **END OF DEV BOUNDARY.** | DEV (boundary) | **DONE** (authored in AS.md §Wave sequence) | AS.md |
| AS.W2 | **The gate-integrity headline (tooling-only, no publish)** — `constellation.mjs` + `gates.mjs` + `gate-output.mjs` pure-output + `proof:lockfile` guard + `proof:vt-names` harden (4 vectors + per-mint dataflow) + the gate manifest (`proof:all`/`release.sh`/`ci.yml` as filters, `gates:verify-ci`). **inv-θ.** | IMPL (FIRST) | **DONE** | `audit/W2-gate-integrity.md` — 5 hardcoded constellation copies → 1 (`bbnf-lang`/`bbnf-buddy` distinct-repo union) · `git status` clean post-fleet-run (pure output verified) · `release.sh` runs the floor · `gates:verify-ci` PASS (13 ci gates) · `proof:vt-names` 4 vectors + dataflow proven on 6 fixtures · all gates green except `proof:resolution` local-RED on the named pre-existing `bbnf-lang` dist-alias fossil (CI-green; name-forward inv-16) |
| AS.W3 | perf/INP — G4 `scheduler.postTask` priority on `/motion-core` + `TaskController` + `@supports` consolidation to `platformSupport.ts` | IMPL | **DONE** | `8c0cced` (≥2 re-type · reduced-motion carve · `MessageChannel` fallback) |
| AS.W4 | CSS-platform — G1 `@container style(--density)` over `[data-density]` · G2-rescoped `@container scroll-state(scrollable)` retiring the overflow-fade listener | IMPL | **DONE** | `8c0cced` (VR · listener-count drop · `@supports` fallback) |
| AS.W5 | AS-GU re-derived (≥2-gated) + chronic folds + L1 consistency | IMPL | **DONE** | `8c0cced` (each artefact ≥2 OR demo OR not-shipped · no double-mint · P5 visual · dock floor on the button) |
| AS.W2b | **Gate-fix wave + follow-up** — the W0b deep audit found AS.W2's `local==ci==release` matrix RED at HEAD; this greens glass-ui's half. R1 externalize value.js (aurora 47.7→16.8 KiB), R2 strip the 68 `development` keys (proof:resolution glass-ui-clean), R3 P9 `--spacing` + `proof:components-css` gate, R7 keyframes peer `^2.2.0 \|\| ^3.0.0` (3.0.0 is published latest; validated; greens proof:package); follow-up R4 useTextHighlight multiplex, R5 proof:vt-names fixtures spec, R6 signal merge + G1 style-probe. | IMPL | **DONE** | `8114bba` (R1/R2/R3/R7) + `fef1b8e` (R4/R5/R6) — 611 tests green; build green; gates:verify-ci 14-gate match; every glass-ui-own gate green; sibling REDs (value.js `development`, bbnf-lang alias, fourier pending patch) name-forward + CI-green |
| AS.W6 | Close — overfitting audit + `gates.mjs` matrix + `AS/FINAL.md` + the 3.2.0 publish through the repaired CI | IMPL (LAST) | **DONE** | `ba0a117` (close) + `9031972` (proof:package sequenced-run fix — tagged/published) → `v3.2.0` → **release run `26964913257`** (provenance); post-publish verification (`audit/W6-postpublish-verify.md`) confirms the artifact sound — no 3.2.1 |

**Wave count: 7 (AS.W0-AS.W6) + AS.W2b gate-fix sub-wave** — 2 DEVELOPMENT (W0 audit + W1 design) + 6 IMPLEMENTATION (W2, W3, W4, W5, W2b, W6). Dev/impl boundary at W1|W2.

## Modern-web spine mapping

| Spine wave | AS disposition |
|---|---|
| W1 perf/INP | REAL — AS.W3 (G4 postTask; strongest, all-3-engine Baseline; the existing yield consumers re-type) |
| W2 CWV/content-visibility | REFUTED — AQ shipped deferred-section + scroll-driven; no net-new HEAD consumer |
| W3 forms/a11y | REAL-narrow — AS.W5 (standalone-DockIconButton floor + GlassNativeSelect demo-gated; AR.W2 shipped the inert a11y fix) |
| W4 CSS-platform | REAL headline — AS.W4 (G1 density container-queries + G2-rescoped scroll-state(scrollable)) |
| W5 motion/VT | floor SHIPPED (AR.W2 proof:vt-names + GlassDock fix); ceiling WEAK — G3 consumer-owned app-shell, demo-or-named-forward; AS.W2 gate-integrity IS this substrate's verification floor |
| W6 security/PWA | REFUTED — no PWA consumer; glass-ui is a substrate not an app shell |

## Cross-tranche posture

AS is **glass-ui-internal** (the gate substrate + the leverage + the design folds). The honest constellation state (AS.W0 L3): AR.W2 is the only executed impl wave; the other 6 tranches are authored-only; babb.dev is 2-of-5 live; the precepts pin is stale (`63240e6` vs canonical `458c2d1`); value.js J claims EXECUTED+GREEN over an uncommitted tree. All cross-repo items are NAME-FORWARD under inv-16 (see AS.md §Cross-repo perimeter) — AS records them, does not absorb them. NPM_TOKEN was seeded across all three publishers this session; the 3.2.0 tag (AS.W6) is the end-to-end #177-repair proof.

> **Constellation-adoption fold (2026-06-02)** — the value.js-K dev/deploy standard + screenshot inventory (102 loose root PNGs) + paired-π visual-evidence protocol + cruft cleanup folded into glass-ui's record (all BOOKED, additive, nothing executed): `audit/constellation-adoption-2026-06-02.md`.

## Named-forward / watched / terminal

- **G3 cross-document VT** — DEMO-OR-NAMED-FORWARD; `navigation: auto` is consumer-owned app-shell; only opt-in directional vocab is a library candidate (0 ≥2 consumers).
- **G5 `@scope`/`:state()`** — NAMED-FORWARD; authoring-DRY-not-payload; opportunistic-SFC-only.
- **G6 `@function`, G8 `interestfor`, `text-box-trim`** — NAMED-FORWARD; Baseline/flag-gated or 0 consumers.
- **Demo-gated pilots (`GlassDialogNative`, `HoverPopover :native`, `GlassNativeSelect`)** — graduate at Baseline Widely.
- **Watched conditions (inline-edit, dock panel-host, LabeledSlider, shadcn-parity)** — convergence-gated; lean REJECT on shadcn-parity (0 consumers).
- **value.js VAL-9** — TERMINAL KILL (keyframes owns it privately; glass-ui has no lever).
- **`deriveAurora`/VAL-1** — AS.W5 ONLY-IF live ≥2 adoption; else value.js executes the VAL-1 kill.

## Folded-ledger summary

Every deferred + chronic item routes (full table in AS.md §Folded ledger): the gate-integrity findings (5× hardcoded list, tracked-artefact mutation, divergent gate lists, `proof:vt-names` over-claim) → AS.W2; G4 → W3; G1+G2-rescoped → W4; the standalone-DockIconButton floor + the AS-GU clusters (gated against HEAD: no double-mint of OKLab/`--glass-opacity-dock`) + G7-demo-gated + the L1 consistency + P5 visual + the dock doc-drift → W5; G3 demo-or-named-forward; G5/G6/G8/text-box-trim named-forward; VAL-9 terminal-kill; the AR.W2-shipped asks (a11y/P5/cascade-gui) exit the watch.
