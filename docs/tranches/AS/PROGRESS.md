# Tranche AS — PROGRESS

Execution log for tranche AS (the gate-integrity class + the modern-web leverage AR left). Updated at wave boundaries. Plan basis — `docs/tranches/AS/AS.md`; the W0 deep audit at `audit/W0-L{1..6}-*.md`; the W1 design slices authored in AS.md §Wave sequence; the close at `FINAL.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched) / TERMINAL-KILL / USER-DOMAIN (cross-repo; name-forward).

## Top-line status

**AS PLANNED — W0 DONE (the deep audit), W1-W6 specified, implementation not yet opened.** AS is the dual of AR's headline lifted one level: AR's `proof:vt-names` (inv-η) made a component's platform binding statically sound; AS's inv-θ makes the *verification fleet* statically sound — one `constellation.mjs` membership + `resolveSibling` policy (collapsing 5 hardcoded copies + 3 absent-sibling forms + the `bbnf-buddy`↔`bbnf-lang/playground` drift), one `gates.mjs` manifest (local == CI == release as filters), pure-function gate output (gitignored `.cache/`, no `generatedAt`, byte-stable), the lockfile re-drift guard, and `proof:vt-names` hardened to its claim (the 4 evasion vectors + per-mint dataflow). It then takes the leverage AR left — re-derived against 3.1.1 HEAD: G4 `postTask` (strongest), G1 density container-queries, G2-rescoped scroll-state(scrollable), G3 downgraded — and folds the chronic deferrals at the ≥2-bar against HEAD reality (no double-mint of the already-shipped OKLab/`--glass-opacity-dock`), as a **3.2.0 minor** published through the repaired CI.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AS.W0 | Deep 6-lens audit + AS-GU roster re-derivation + native-drawer ruling | DEV | **DONE** | `audit/W0-L1-changes-adversarial.md` · `W0-L2-plan-vs-reality.md` · `W0-L3-prompt-completeness.md` · `W0-L4-deferred-ledger.md` · `W0-L5-precepts-architecture.md` · `W0-L6-modern-web-overfitting.md` |
| AS.W1 | Design slices — gate-integrity substrate ‖ `proof:vt-names` hardening ‖ G4/G1/G2-rescoped recipes ‖ AS-GU disposition + deferred fold table. **END OF DEV BOUNDARY.** | DEV (boundary) | **DONE** (authored in AS.md §Wave sequence) | AS.md |
| AS.W2 | **The gate-integrity headline (tooling-only, no publish)** — `constellation.mjs` + `gates.mjs` + pure-output + lockfile guard + `proof:vt-names` harden + `proof:consumers:static` source-aware exclusion. **inv-θ.** | IMPL (FIRST) | PLANNED | `audit/W2-gate-integrity.md` (zero re-listed constellation copies · `git status` clean post-gate-run · `release.sh` runs the floor · `proof:vt-names` covers 4 vectors) |
| AS.W3 | perf/INP — G4 `scheduler.postTask` priority on `/motion-core` + `TaskController` + `@supports` consolidation to `platformSupport.ts` | IMPL | PLANNED | `audit/W3-posttask.md` (≥2 re-type · reduced-motion carve · `MessageChannel` fallback) |
| AS.W4 | CSS-platform — G1 `@container style(--density)` over `[data-density]` · G2-rescoped `@container scroll-state(scrollable)` retiring the overflow-fade listener | IMPL | PLANNED | `audit/W4-container-queries.md` (VR · listener-count drop · `@supports` fallback) |
| AS.W5 | AS-GU re-derived (≥2-gated) + chronic folds + L1 consistency | IMPL | PLANNED | `audit/W5-as-gu.md` (each artefact ≥2 OR demo OR not-shipped · no double-mint · P5 visual · dock floor on the button) |
| AS.W6 | Close — overfitting audit + `gates.mjs` matrix + `AS/FINAL.md` + the 3.2.0 publish through the repaired CI | IMPL (LAST) | PLANNED | `audit/W6-close.md` + `FINAL.md` + the clean-runner tag publish (NPM_TOKEN seeded) |

**Wave count: 7 (AS.W0-AS.W6)** — 2 DEVELOPMENT (W0 audit + W1 design) + 5 IMPLEMENTATION. Dev/impl boundary at W1|W2.

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
