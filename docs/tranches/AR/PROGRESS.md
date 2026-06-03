# Tranche AR — PROGRESS

Execution log for tranche AR (the platform-binding uniqueness gate + the modern-web leverage AQ left). Updated at wave boundaries. Plan basis — `docs/tranches/AR/AR.md`; the W0 re-run baseline at `audit/W0-modern-web-baseline.md`; the W1 design slices at `design/W1.{1,2,3,4}-*.md`; the close at `FINAL.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched condition) / USER-DOMAIN (cross-repo perimeter; user's push authority).

## Top-line status

**AR CLOSED at W2 — 3.1.1 shipped, ci.yml green; W3-W6 re-homed to AS.** See `FINAL.md`.
The AS.W0 deep audit ruled AR closes clean at the binding-correctness headline (a SemVer-patch
boundary) rather than bolting a leverage arc onto a correctness tranche; AR's authored-but-unrun
W3-W6 are AS's implementation set, re-derived against HEAD (the A1-era AS-GU roster had gone
stale — OKLab/`--glass-opacity-dock` already ship). AR.W2's execution also surfaced the
gate-integrity class (5× hardcoded constellation, divergent gate lists, tracked-artefact
mutation, the `proof:vt-names` over-claim) — now the AS thesis (inv-θ).

**AR.W2 DONE — 3.1.1 cut (the gate + bug-fix + cohort asks + CI #177).** W0-W1
(audit/design) are folded into the A1 deep-audit + AR.md authoring; W2 shipped
the binding-correctness floor as a 3.1.1 patch: GlassDock `useId()` fix +
`proof:vt-names` gate + the pairwise-distinct unit guard; the two booked cohort
asks (`glass-ui-a11y` inert + `glass-ui-P5-inner-rounding`, the latter corrected
— b6d6cf4's per-section radius DEFORMED the dividers; the fix REMOVES it and lets
the container clip own root rounding); the real CI #177 (registry-resolved
lockfile + node 24); and — as a byproduct of unmasking it — the
`proof:consumers:static` false-witness gate bug. Full gate matrix green. W3-W6
remain PLANNED (the 3.2.0 leverage fold). Evidence: `audit/W2-vt-names-gate.md`.

**ci.yml is GREEN** (run 26849704298, node 24 + registry-resolved lockfile — all
11 gates incl. the new `proof:vt-names`). Fixing the #177 `npm ci` failure
unmasked three `proof:*` gates that assumed the local monorepo sibling layout and
went red on a clean runner — all fixed as post-tag CI-portability follow-ups:
`proof:package` (fixture resolved keyframes via `file:../keyframes.js` → fall back
to the registry peer range when no sibling), `proof:resolution` (skip an absent
sibling publisher rather than flag it), and the latent `proof:consumers:static`
false-witness. `release.yml` on the tag is red — the tag (`ed2add9`) predates
those follow-ups and the publish step needs the user-domain `NPM_TOKEN`; the
published 3.1.1 is unaffected (scripts/ is not in the tarball — `dist`/`src/styles`/
`src/fonts` only).

AR is the dual of AQ's headline: AQ's `color-mix` substrate made the `hsl(var())` paint-failure structurally impossible; AR's `proof:vt-names` gate makes the `view-transition-name`/`anchor-name` collision structurally impossible (inv η). The A1 audit diagnosed a **live** bug in that class — `GlassDock.vue:9` mints its `view-transition-name` from a module-level `let dockInstanceId = 0` counter that restarts per module-graph copy, so a lazy-chunked dock collides with the eager dock's `glass-dock-1`, the browser rejects the transition, and only fourier's console-error e2e catches it (vue-tsc + vitest both pass). AR fixes it via `useId()` (mirroring `DockLayerGroup.vue:69`), ships the static gate, repairs CI #177 (node 20→24 + registry-not-symlink publish), and cuts a **3.1.1 patch** FIRST — then takes the modern-web leverage AQ left (container style queries, scroll-state queries, cross-document VT + types, `scheduler.postTask` priority) and evaluates the AS-GU design bundle at the ≥2-consumer bar, folded as a **3.2.0 minor**.

## Wave status table

| Wave | Title | Phase | Status | Evidence (planned) |
|---|---|---|---|---|
| AR.W0 | Re-run modern-web baseline against HEAD + confirm G1-G8 + classify every VT/anchor-name mint + pin the AS-GU ≥2-consumer roster | DEV | PLANNED | `audit/W0-modern-web-baseline.md` (each gap `file:line` + guide + Baseline; mint-classification table; AS-GU roster; the GlassDock bug + CI #177 confirmation) |
| AR.W1 | Design slice — VT/anchor-name uniqueness substrate (1.1) ‖ container/scroll-state queries (1.2) ‖ cross-document VT + postTask (1.3) ‖ AS-GU disposition map (1.4). **END OF DEV BOUNDARY.** | DEV (boundary) | PLANNED | `design/W1.{1,2,3,4}-*.md` (the `proof:vt-names` scan-shape + mint taxonomy; the `:where()` flat-specificity density ladder + carousel re-expression; the types/directional vocab + postTask priority surface; the AS-GU cluster dispositions) |
| AR.W2 | **The gate + bug-fix wave (lands FIRST, ships 3.1.1)** — GlassDock `useId()` fix + comment + `proof:vt-names` static gate + unit pairwise-distinct guard + the 2 cohort asks (a11y `inert` + P5 root-rounding correction) + CI #177 repair (registry-resolved lockfile + node 24) + the `proof:consumers:static` false-witness fix | IMPL (FIRST) | **DONE** | `audit/W2-vt-names-gate.md` — `proof:vt-names` PASS (4 mints) · 543 tests incl. pairwise-distinct · `proof:consumers:static` PASS (0 unexpected/missing) · full gate matrix green · `npm ci` registry-valid · 3.1.1 published locally (NPM_TOKEN user-domain) |
| AR.W3 | CSS-platform leverage — `@container style(--density:…)` density over kept `[data-density]` (G1) · `@container scroll-state(snapped)` + `scrollsnapchange` carousel (embla → drag-physics fallback) (G2) | IMPL | PLANNED | `audit/W3-container-queries.md` (VR nested density · active-slide highlight · carousel listener-count drop · `@supports` fallback proven · `profile:budget` no regression) |
| AR.W4 | Cross-document VT + scheduling — `@view-transition { navigation: auto }` + types/directional vocab + `rel=expect` (G3) · `usePrioritizedTask`/`postTaskSafe` on `/motion-core` + `TaskController` (G4) | IMPL | PLANNED | `audit/W4-cross-document-vt-posttask.md` (reduced-motion carve · same-document path unbroken · ≥2 consumers for each recipe · postTask ≥2 [the yield consumers re-type]) |
| AR.W5 | AS-GU design wave (≥2-gated) — `--spring-crisp` + stale-comment fix · `deriveAurora`/OKLab-LUT (VAL-1/VAL-9) · whisper-heading rung · dock dark `--glass-opacity-dock` + `always-expanded` overflow fix (correctness) · CompletionSeal token/keyframe (component demo-gated) · standalone-`DockIconButton` floor (S-2) · `GlassNativeSelect` demo-gated (G7) | IMPL | PLANNED | `audit/W5-as-gu-design-wave.md` (each artefact ≥2 consumers OR demo OR not-shipped · `proof:theme` byte-clean · overfitting audit clean · no public-surface leak) |
| AR.W6 | Close — overfitting audit + full gate matrix + `AR/FINAL.md` + the 3.2.0 minor fold | IMPL (LAST) | PLANNED | `audit/W6-close.md` + `FINAL.md` + amended `.changeset/`/`CHANGELOG.md` (3.2.0 atop 3.1.1) |

**Wave count: 7 (AR.W0-AR.W6)** — 2 DEVELOPMENT (W0 audit + W1 design) + 5 IMPLEMENTATION. Dev/impl boundary at W1|W2.

DAG — W0 first; W1 after W0; **W2 ships FIRST and standalone as 3.1.1** (the bug + the gate + the CI #177 repair — a correctness patch the constellation is already waiting on; the CI fix unblocks every later republish); W3 (CSS container queries) ‖ W4 (cross-document VT + scheduling) are largely file-disjoint and parallelize atop W2; W5 (the AS-GU design wave) lands last of the impl set (it co-owns tokens/aurora/typography/dock with W3); W6 closes. The 3.1.1 patch is cut at W2; the 3.2.0 minor folds W3-W5 at W6. Co-ownership: `dock.css` by W3 (density container query) + W5 (dark rung + overflow fix + standalone floor) as disjoint rule-sets, W3 first; `view-transition.css` by W2 (the mint sources the gate proves) + W4 (types/directional vocab) as disjoint sections, W2 first; `package.json` by W2 (CI/no-export-change) + W5 (any new subpath wiring) as disjoint stanzas, W2 first.

## Modern-web spine mapping (which waves bind, which are refuted)

| Spine wave | AR disposition |
|---|---|
| W1 perf/INP | REAL — folded into AR.W4 (`scheduler.postTask` priority; extends AQ's `useYieldToMain`; ≥2 yield consumers re-type) |
| W2 CWV/content-visibility | REFUTED as a standalone wave — AQ shipped `.deferred-section` with a 3-consumer fan-out; no net-new content-visibility lever has a consumer at HEAD |
| W3 forms/a11y | REAL — folded into AR.W5 (standalone-`DockIconButton` floor + `GlassNativeSelect` demo-gated; the full forms vocabulary shipped in AQ.W4) |
| W4 CSS-platform | REAL — AR.W3 (container style queries G1 + scroll-state queries G2; the leverage headline) |
| W5 motion/VT | REAL — AR.W2 floor (the VT-name uniqueness gate + GlassDock fix) + AR.W4 ceiling (cross-document VT + types) |
| W6 security/PWA | REFUTED — no security/PWA lever has a glass-ui consumer; glass-ui is a component substrate not an app shell; Speculation-Rules is the *consumer's* coupling, not a glass-ui surface |

## Cross-tranche posture

AR is **glass-ui-internal + a consumer-correctness republish**. The substrate ships via the published glass-ui (contract-v2 dev-resolution). HEAD is post-AQ (version 3.1.0). The cross-repo perimeter (USER-DOMAIN — surfaced, not absorbed into AR source waves):

- **The 3.1.1 patch publish (W2)** — the GlassDock VT-name collision logs a console error on every VT-capable consumer running ≥2 docks; fourier's console-error e2e is red until it lands. The CI #177 repair (node 20→24, registry-not-symlink publish) is the prerequisite — 3.0.0/3.1.0 were all published locally because the tag-triggered release CI fails. 3.1.1 should publish through the FIXED pipeline as the proof the repair works. Re-bump consumers (muster/fourier/speedtest) to `^3.1.1`; verify fourier CI greens. Highest-priority user-domain action.
- **The 3.2.0 minor publish (W6)** — the W3-W5 additive leverage + design work folds SemVer-minor atop 3.1.1. Each item additive + fallback-guarded.
- **Seed/confirm the `NPM_TOKEN` repo secret** — activates the fixed `release.yml`; load-bearing for the W2 republish proof.
- **The `docs/precepts` submodule** — stays user-domain (the AP-recorded dirty-working-tree reconcile carries forward).

All need the user's GitHub/npm push authority per the standing agent git clause; the orchestrator owns the index and the gates, agents are edit-only/read-only-git.

## Named-forward / watched

- **G6 — CSS `@function`** — Limited/Chromium-only + an *authoring* DRY win NOT a payload win (the AP refuted-premise lesson: gzipped CSS is compression-saturated). Progressive-only; revisit when Baseline lifts.
- **G8 — `interestfor` action-previews** — Limited/experimental; demo-gated only; watch for graduation (the Configurator/dock destructive-action fit).
- **`supportsCssTimeline`/`supportsMoveBefore` consolidation** — if the `@supports` guards proliferate (AR.W4's postTask adds one), consolidate to `src/utils/platformSupport.ts`; a consideration, not a violation today.
- **Demo-gated pilots (`GlassDialogNative`, `HoverPopover :native`, `GlassNativeSelect`)** — graduate from demo-gated to default at Baseline Widely Available.
- **AS-GU CompletionSeal component** — public-surfaces when a 2nd consumer converges (the token/keyframe layer ships in W5; the component stays demo-gated).
- **Watched conditions (inline-edit, dock panel-host, LabeledSlider readout, shadcn parity)** — carried from the AP ledger; promote only on a converging 2nd consumer (J inv 10).

## Close gate matrix (W6 — planned)

| # | Gate | Status | Evidence (planned) |
|---|---|---|---|
| 1 | `typecheck` exit 0 (`vue-tsc --noEmit`) | PLANNED | — |
| 2 | `build` exit 0 (vite arm + vue-tsc dts arm) | PLANNED | — |
| 3 | `test` (vitest) green incl. the GlassDock pairwise-distinct assertion | PLANNED | — |
| 4 | `proof:vt-names` PASS (inv η — every mint `useId()` or documented page-singleton; no module counter) | PLANNED | the new static gate, added to `proof:all` |
| 5 | `proof:theme` PASS (byte-clean post AS-GU tokens) | PLANNED | — |
| 6 | `proof:resolution` PASS (contract-v2) + `verify-export-types` PASS | PLANNED | — |
| 7 | `profile:budget --enforce` PASS (W3-W5 additive; no ceiling regression) | PLANNED | — |
| 8 | fourier console-error e2e green (the VT-name collision class fixed) | PLANNED | the fourier-class catcher the static gate complements |
| 9 | Overfitting audit clean — every AR artefact ≥2 consumers (fan-out) OR demo OR not-shipped; no public-barrel leak | PLANNED | `GlassNativeSelect`/CompletionSeal demo-gated, no leak |
| 10 | `AR/FINAL.md` authored — thesis + gate matrix + inv η + the AS-GU dispositions + the modern-web spine record + successor | PLANNED | — |

## Folded-ledger summary

Every A1-audit deferred + chronically-deferred item routes (full table in `AR.md` §Folded ledger): GlassDock bug + `proof:vt-names` + CI #177 → W2; G1/G2 container queries → W3; G3 cross-document VT + G4 postTask → W4; G7 `GlassNativeSelect` + standalone-`DockIconButton` floor + the AS-GU clusters (aurora/`--spring-crisp`/whisper-heading/dock-dark/CompletionSeal) → W5; G5 `@scope`/`:state()` optional in W5; G6 `@function` + G8 `interestfor` action-previews + the demo-gated pilots + the watched conditions → NAMED-FORWARD.
