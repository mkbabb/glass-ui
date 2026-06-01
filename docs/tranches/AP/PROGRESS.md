# Tranche AP — PROGRESS

Execution log for tranche AP (derive, don't duplicate — cascade derivation + the AQ-contract completion). Updated at wave boundaries. Plan basis — `docs/tranches/AP/AP.md`; per-wave specs at `docs/tranches/AP/waves/W<N>.md`; synthesis at `docs/tranches/AP/audit/PATH-FORWARD.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched condition, named realisation) / USER-DOMAIN (cross-repo perimeter; user's push authority).

## Top-line status

**IMPLEMENTATION — W0+W1 closed, the dev/impl boundary CROSSED on the standing tranche directive. W2-W5 in flight.** AP's development half (W0 audit + W1 design slice) is DONE; the 3 design docs at `design/W1.{1,2,3}-*.md` bind W2-W5. The implementation half opened under the standing tranche directive (the explicit authorization to cross the W1|W2 boundary). Orchestrator-led: agents are edit-only/read-only-git; the orchestrator owns the index, runs the authoritative gates, and commits per wave to avoid dist races.

W1 review-of-design findings folded into the implementation contract: (1) gui-W1.1's T1 investigation CONFIRMED the declared "raw HSL-channel brittleness window" is stale — HEAD uses complete `hsl()` values + `color-mix` alpha (zero `hsl(var(--x)/α)` sites), so the merge moves only the namespace layer and the real merge constraint is `proof-theme-style.mjs`'s `selfReferences` scan; (2) the W1.1 grain shared group was CORRECTED from `:where([class*="glass-"])` (over-matches the non-tier `.glass-card`/`.glass-btn`/`.glass-pill`/`.glass-dock` shorthands → grain regression) to the explicit five-tier `:where()` list; (3) W3's R0G-6 `::before` hit-area shape is bound CONDITIONAL — W3 measures with the real acceptance probe and falls back to `min-block/inline-size` on the button if the `::before` does not lift the measured box to 44px.

AP opens against a **repaired ledger** — the AP.W0 audit found AO left two facts load-bearing-open. First, AO under-folded the speedtest-AQ request: it was a seven-item ask (R0G-1..7), but the committed handoff captured only five — R0G-6 (DockIconButton no coarse-pointer 44px floor; measured 40×40) and R0G-7 (the `/motion` barrel mixes keyframes-free leaves with the keyframes-bearing engine, so a cheap import eager-pulls ~125 KB) surfaced later and were never dispositioned, a P inv 28 zero-deferral breach AP repairs. Second, the CSS cascade hand-mirrors itself: the token system declares every token twice (raw `:root` + `@theme` bridge, 198 lines) and the glass tiers + dock four-state are copy-pasted ~20×, the draw at 90.9% of cap. AO made the library's self-measurement TRUE; AP makes the library DERIVE rather than DUPLICATE — the dual move.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AP.W0 | 6-lane audit + path-forward synthesis | DEV | DONE | `audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md` + `audit/PATH-FORWARD.md` + `AP.md` + `waves/W{0..5}.md` + this PROGRESS |
| AP.W1 | Design slice — cascade-derivation (T1+T2) + motion-carve (R0G-7) + dock-a11y (R0G-6) + aurora-suspend-set (T3) + false-witness coda + hygiene. **END OF DEV BOUNDARY.** | DEV (boundary) | PLANNED | `design/W1.1-cascade-derivation.md` · `design/W1.2-motion-carve-and-dock.md` · `design/W1.3-aurora-and-coda.md` |
| AP.W2 | The cascade derives itself — `@theme` single-source (T1, investigate-then-derive) + shared tier/four-state recipes (T2) | IMPL | PLANNED | `audit/W2-cascade-derivation.md` (proof:theme byte-clean · ~7-12 KiB reclaim vs the 74995 draw · re-based ceiling · π re-probe · inv-α probe) |
| AP.W3 | Consumer-contract completion + control-flow derivation — `/motion` SCC carve (R0G-7) · dock 44px floor (R0G-6) · aurora suspend-source set (T3) · DockLayerGroup vertical-overflow investigation | IMPL | PLANNED | `audit/W3-consumer-contract.md` (keyframes-free leaf engine-free · dock 44px coarse · resume-while-suspended unreachable · DockLayerGroup disposition) |
| AP.W4 | False-witness coda + hygiene — proof scan-scope (`.claude`/worktrees) · D5 self-erasing baseline · stray cleanup + `.gitignore` · keyframes.js pin · §Build + cherry-pick-count reconcile | IMPL | PLANNED | `audit/W4-coda-hygiene.md` (proof:consumers:static green locally · D5 stable · git clean of stray · prose reconciled) |
| AP.W5 | Close ceremony + release — π/ι + overfitting + `AP/FINAL.md` + the 3.0.0 changeset amendment | IMPL (LAST) | PLANNED | `audit/W5-close.md` + `FINAL.md` + amended `.changeset/`/`CHANGELOG.md` (fold AP into the unpublished 3.0.0) |

**Wave count: 6 (AP.W0-AP.W5)** — 2 DEVELOPMENT (W0 audit + W1 design) + 4 IMPLEMENTATION. Dev/impl boundary at W1|W2.

DAG — W0 first; W1 after W0; W2 (cascade CSS) ‖ W3 (motion/dock/aurora) are largely file-disjoint and parallelize; W4 (proof scripts + hygiene) disjoint from both; W5 closes. W2 is the headline (deepest reclaim + simplicity); W3 repairs the zero-deferral gap; W4 is the cheap on-thesis coda. dock.css is co-owned by W2 (four-state recipe) + W3 (size/coarse floor) as disjoint rule-sets, W2 first; profile-bundle.mjs by W2 (ceiling re-base) + W4 (D5 baseline split) as disjoint sections, W2 first; package.json by W3 (exports) + W4 (keyframes pin) as disjoint stanzas, W3 first.

## Cross-tranche posture

AP is **glass-ui-internal + the AQ-contract completion**. The cross-repo state (OMEGA): glass-ui is **99 commits unpushed** to `origin`; `package.json` is 3.0.0 but npm carries only 2.1.0 — 3.0.0 is staged-local, a provenance liability. speedtest pins `^2.1.0`, its AQ Gate-2 is complete, and it waits ONLY on the 3.0.0 publish (the 5 shipped R0G items; R0G-6/R0G-7 join when AP lands). AP folds R0G-6/R0G-7 into the unpublished 3.0.0 so the user makes ONE release. User-domain perimeter items (OMEGA) — surfaced, not absorbed into AP source waves:

- **Push the 99 held commits to `origin`** — the provenance gap. npm 2.1.0 is live and consumed (speedtest resolves it), but its source tree is single-copy local until pushed; one `git push` reconciles source with the already-published artifact. Highest-priority user-domain action.
- **Tag `v3.0.0` + `npm publish`** — the single user-domain blocker that unblocks speedtest AQ. Outward-facing → confirm-first.
- **Seed the `NPM_TOKEN` repo secret** — activates `release.yml` (the publish-on-tag contract is real-but-unexercised).
- **Reconcile the precepts submodule** — commit + push its 3 dirty files inside `mkbabb/precepts`, bump glass-ui's gitlink, include in the push. Does NOT block AP (no gitlink drift; working-tree-only dirtiness).

All four need the user's GitHub/npm push authority. The precepts submodule stays user-domain.

---

## AP.W0 — 6-lane audit + path-forward synthesis — 2026-05-30 — DEV-CLOSED

- **Opens:** 2026-05-30
- **Closes:** 2026-05-30
- **Agents:** 6 audit (read-only, one per lane) + 1 synthesis
- **Disposition:** DONE — the audit ran; the synthesis is the binding basis for the AP plan.

### Events

- The 6-lane audit landed (`audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md`) + `audit/PATH-FORWARD.md` + `AP.md` + the W0-W5 wave specs + this PROGRESS.
- **The two load-bearing facts (the headline).** Four independent lanes (ALPHA, BETA, EPSILON, OMEGA) converged on the first: AO under-folded the speedtest-AQ request — a SEVEN-item ask (R0G-1..7), but the committed handoff captured only five; R0G-6 + R0G-7 surfaced later in AQ's R2 strand and were dispositioned NOWHERE (not delivered, documented, archived, or declined-with-rationale). A P inv 28 zero-deferral breach AP repairs. DELTA found the second: the CSS cascade hand-mirrors itself — every token declared twice (raw `tokens.css` `:root` + `theme.css` `@theme` bridge, 198 lines, the §4 radius literal-duplicated), the five `.glass-{tier}` blocks + the dock four-state copy-pasted ~20×, the resolved draw 74995 gzip = 90.9% of the 82500 cap.
- **The R0G-6 + R0G-7 survivors (the zero-deferral repair).** R0G-7 — carve the `/motion` barrel into a keyframes-FREE leaf surface (`useIntersectionPause`, `useRAFLoop`, `useScrollProgress`, `useStaggerReveal`, `useStagger`, `installDarkModeSync`, the `DAMPING`/`SNAP_THRESHOLD`/`RAFLoopTiming` constants) and the keyframes-BEARING surface (`useSpring*`, `useNumericTransition`, `useAnimatedNumber*`), mirroring the L.W1 vueuse-FREE SCC closure — a cheap import stops statically reaching the 125 KB engine. EPSILON named it the architectural keystone. R0G-6 — the DockIconButton coarse-pointer 44px floor, confirmed against the measured 40×40; OMEGA flagged the trap (the v1.4.0 `dock.css:1036` `.glass-dock` coarse block exists yet the real edge measured 40×40, so it is an open correctness question, not a closed one-line add). Both ride AP.W3.
- **The cascade hand-mirror (the headline re-architecture — DELTA T1+T2).** T1: make `@theme` the single token source, `tokens.css` keeps only the non-namespaced compositional intermediates; the raw HSL-channel alpha-composition form is load-bearing and PRESERVED (investigate-then-derive — the one brittleness window). T2: a tier `@utility` + a shared `dock-control` four-state base. ~7-12 KiB gzip reclaim + three drift classes killed. Rides AP.W2 (the headline).
- **The cascade hand-mirror is hand-maintained mirroring of a thing that should derive (the dual of AO inv α).** AP introduces inv ζ — the cascade derives from a single source; a token is defined ONCE (`@theme`), a visual recipe expressed ONCE and applied by utility/selector, not copy-pasted.
- **The false-witness coda (DELTA T4 + GAMMA).** `proof-consumers-static.mjs` `ignoredDirs` lacks `.claude`/`worktrees`, so the gate lints dozens of stale `speedtest/.claude/worktrees/agent-*` copies (78 violations, 100% stale-worktree noise — the live trees are clean; CI never sees the siblings via `existsSync`); `profile-bundle.mjs` reads its D5 drift baseline from the same path it overwrites (a self-erasing baseline). Both ride AP.W4 — cheap, on AO's self-measurement-truth thesis.
- **The aurora suspend refcount (DELTA T3).** Three uncoordinated owners toggle one `running` boolean with no refcount, so resume-while-still-scrolled-off-screen is structurally reachable (AO patched the symptom). The gestalt fix is a suspend-source SET — derive-don't-duplicate applied to control flow. Rides AP.W3.
- **The hygiene + stale self-descriptions (BETA + GAMMA + DELTA minor).** ~2 MB of untracked root scratch (8 jpegs + `build_time.txt`/`emit_time.txt`) → delete + `.gitignore`; the `keyframes.js ^2.0.0` pin-floor is stale → bump to `^2.1.1`; CLAUDE.md prose says the root barrel cherry-picks "7" in one place and "6" in another → reconcile to 7; confirm the AO §Build resync landed on disk. Ride AP.W4.
- **No promotion (J inv 10).** EPSILON re-tested substrate promotion at HEAD: no ≥2-consumer pattern clears the binary gate. The inline-edit watched condition MOVED (a 3rd consumer appeared — keyframes.js `EditableLabel`) but did NOT converge (3 divergent shapes: `<input>` numeric click vs `<input>` string dblclick vs `contenteditable`); the dock panel-host has 1 realised consumer (bbnf-buddy `LeftToolsDock`). AP promotes neither — both stay watched. The DockLayerGroup vertical-overflow gap bbnf-buddy hit is correctness-not-promotion, investigated in W3.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | The 6 lane docs exist with measured evidence | MET | `audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md` |
| 2 | `audit/PATH-FORWARD.md` names the two load-bearing facts + the five resolved findings + the wave shape + the folded ledger + the cross-repo posture + the brittleness window | MET | `audit/PATH-FORWARD.md` |
| 3 | `AP.md` exists with the §Wave table + §Resolved decisions + §Folded ledger + §Critical files + inv ζ | MET | `AP.md` |
| 4 | The W0-W5 wave specs + PROGRESS derive from the synthesis; every candidate routes | MET | `waves/W{0..5}.md` + this PROGRESS |
| 5 | `git status -- src/` clean (no source); no agent-attributed git mutation | MET | read-only audit |

---

## AP.W1 — Design slice — END OF DEVELOPMENT BOUNDARY — 2026-05-31 — DEV-CLOSED

- **Opens:** 2026-05-31
- **Closes:** 2026-05-31
- **Status:** DONE
- **Agents:** 3 (W1.1 cascade-derivation ‖ W1.2 motion-carve-and-dock ‖ W1.3 aurora-and-coda — dispatched in one dual-repo design workflow, all read-only on source)
- **Disposition:** the 3 design docs bind W2-W5; every open question resolved (T1 alpha-mechanism investigated-not-assumed, T2 recipe shapes named per-rung, R0G-7 leaf-split map fixed, R0G-6 40×40 bypass PROVEN by specificity, T3 suspend-set + coda + hygiene named). **The dev/impl boundary is CROSSED on the standing tranche directive.**

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `design/W1.1-cascade-derivation.md` — T1 `@theme` alpha-mechanism investigation CONCRETE + the merge scope + T2 tier/four-state recipe shapes per-rung | MET | `design/W1.1` — T1 confirms full-`hsl()`+`color-mix` (no channels-form), per-cluster DERIVES/STAYS-RAW table, `selfReferences`-scan merge constraint; T2a `@utility glass-*` + `--glass-shadow-composed-*` knob + corrected five-tier grain group; T2b shared `dock-control` base |
| 2 | `design/W1.2-motion-carve-and-dock.md` — R0G-7 leaf-split map (leaves + subpath + rename + sourcemap gate) + R0G-6 40×40 confirmation against the rendered box | MET | `design/W1.2` — 13-leaf transitive classification, new flat `/motion-core` subpath, `installDarkModeSync`→`/dark` (vueuse), no-alias rename table; R0G-6 bypass PROVEN ((0,2,0) density selector shadows the (0,1,0) coarse floor), `::before` shape (W3-conditional) |
| 3 | `design/W1.3-aurora-and-coda.md` — suspend-source-set design + proof scan-scope + D5 baseline split + hygiene list | MET | `design/W1.3` — `Set<SuspendReason>` 4-step unreachability trace, `ignoredDirs += .claude/worktrees`, D5 committed-baseline split, hygiene (8 jpegs + keyframes pin + cherry-pick count = 7) |
| 4 | `git status -- src/` clean; no source touched | MET | `git status -- src/ scripts/` empty post-workflow |
| 5 | The dev/impl boundary marked (END OF DEVELOPMENT BOUNDARY) | MET | boundary crossed on the standing directive; W2-W5 in flight |

---

## AP.W2 — The cascade derives itself (T1 + T2) — 2026-05-31 — CLOSED: PREMISE REFUTED, no source change

- **Opens:** 2026-05-31 (boundary crossed)
- **Closes:** 2026-05-31
- **Status:** DONE — the reclaim premise is REFUTED by measurement; the cascade ships as-is.
- **Agents:** 2 (Carve A T1 tokens/theme ‖ Carve B T2 glass/dock — both executed cleanly; both byte-NEGATIVE; both reverted)
- **Disposition:** **W2's "cascade derives itself for ~7-12 KiB reclaim" is REFUTED by direct measurement** (deterministic build). Full var-indirection refactor: **+1665 gzip**. T1-surgical: +356. §radius-dedup + grain-collapse: +100. The cascade is compression-saturated — gzip already folds the copy-paste, the `@theme` bridge is idiomatic namespace-registration (not duplication), and the §radius dup is INERT (shadowed dead-weight). Per "performance above all," W2 ships **NO cascade source change** (all 4 files byte-identical to HEAD). **inv ζ RETIRED** (premise refuted). AP's headline pivots to W3 (the zero-deferral consumer repair) + W4. Evidence: `audit/W2-cascade-derivation.md` (the full measurement table + the 3 sub-findings + the inv-ζ retirement). The aurora T3 control-flow derivation is a CORRECTNESS fix (not a byte play) and stands in W3.

### Gates (re-read against the refutation)

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` + `build` exit 0 | MET | green at HEAD (no source change) |
| 2 | `proof:theme` byte-clean (every rung + token still ships) | MET | passed on every refactor variant AND at HEAD; the cascade is unchanged |
| 3 | Reclaim measured — resolved draw drops by ~7-12 KiB | **VACATED — REFUTED** | every variant byte-NEGATIVE (+1665 / +356 / +100 gzip); deterministic build; `audit/W2-cascade-derivation.md` |
| 4 | `profile:budget --enforce` exit 0 against the re-based ceiling | MET (no re-base) | 74995 / 82500 unchanged; the draw is identical to HEAD |
| 5 | Visual π re-probe — glass tiers + dock controls zero canon regression | MET (trivially) | cascade byte-identical to HEAD → canon-identical |
| 6 | Synthetic cascade regression still trips the gate (AO inv α preserved) | MET | inv α intact (AO's `combinedStylesDraw` unchanged; the refactor variants moved the gated number, proving it measures the real artifact) |

---

## AP.W3 — Consumer-contract completion + control-flow derivation — 2026-05-31 — CLOSED (the AP headline)

- **Opens:** 2026-05-31
- **Closes:** 2026-05-31
- **Status:** DONE — the real AP headline (W2 refuted). All gates MET.
- **Agents:** 3 (∥ disjoint — motion R0G-7 ‖ dock R0G-6+DockLayerGroup ‖ aurora T3); orchestrator landed the inv-47 call-site renames + surface-manifest updates + comment trim.
- **Disposition:** the zero-deferral repair LANDED — R0G-7 `/motion-core` SCC carve (cheap-leaf import proven engine-free, 0 keyframes/0 vueuse) + R0G-6 dock 44px coarse floor (orchestrator-overrode the W1.2 `::before` shape with a specificity fix that lifts `--dock-control-size` so the button box AND the dock width-math both reach 44px — no overflow) + T3 aurora suspend-source set (resume-while-suspended unreachable; `drawFrame` byte-identical) + DockLayerGroup vertical-overflow (CONFIRMED bug, fixed). Evidence: `audit/W3-consumer-contract.md`.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` + `build` exit 0 | MET | 0 typecheck errors; build ok; `dist/motion-core.{js,d.ts}` emitted |
| 2 | R0G-7 — keyframes-free leaf import proven engine-free; keyframes-bearing surface resolves; `verify-export-types` passes; NO back-compat alias (inv 47) | MET | `dist/motion-core.js` 0 keyframes/0 vueuse; `dist/motion.js` keyframes present; `verify-export-types` + `proof:resolution` + `proof:package` green; inv 47 grep clean |
| 3 | R0G-6 — 44px floor on the rendered button box at coarse pointer; fine-pointer box byte-identical | MET | `.glass-dock[data-density]` (0,2,0) wins by source order; lifts `--dock-control-size` read by button box + dock-math; `@media coarse` isolated |
| 4 | T3 — resume-while-suspended structurally unreachable; reduced-motion static; `drawFrame` byte-identical | MET | 4-step suspend-set trace; 0 draw-line diffs; reduced-motion gate untouched |
| 5 | DockLayerGroup vertical-overflow investigation recorded with disposition | MET | CONFIRMED bug (hardcoded row pane, no vertical analogue), fixed; horizontal byte-identical |
| 6 | Tests green (`vitest run` exit 0) | MET | `vitest` 523/523 (6 surface-manifest assertions updated for the relocation) |

---

## AP.W4 — False-witness coda + hygiene — 2026-05-31 — CLOSED

- **Opens:** 2026-05-31
- **Closes:** 2026-05-31
- **Status:** DONE — all gates MET; one design assumption corrected.
- **Agents:** 1 (code/doc edits) + orchestrator (git hygiene + the comment-stripping false-witness fix + commits).
- **Disposition:** the coda landed. The scan-scope fix surfaced a SECOND false witness the W1 design missed — the scanner flagged `@import`/`@source` directives inside CONSUMER COMMENTS (documenting retired patterns), so the orchestrator added a string-aware `stripComments()` to the CSS-directive scan; `proof:consumers:static` now exits 0 honestly (212 → 0). D5 baseline split proven stable (sha identical across 3 runs; motion-core adopted). Strays deleted + `.gitignore`d. keyframes pin converged. CLAUDE.md cherry-pick count reconciled to the empirical 7 (the prose's named list was wrong — `dock-group` → `instrument-rail`). The AQ handoff record updated to "the seven" (R0G-6/R0G-7). Evidence: `audit/W4-coda-hygiene.md`.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `proof:consumers:static` exit 0 locally — stale-worktree violations gone; live trees clean (zero signal loss) | MET | 212 → 0 (`ignoredDirs += .claude/worktrees` + the comment-stripping false-witness fix); a live directive still fails |
| 2 | D5 baseline stable across runs — committed reference, no self-erase; `--rebaseline` the only update path | MET | committed baseline SHA `7777bbf5…` identical across seed + 3 runs; `dist/motion-core.js` adopted ([PASS] +0.0%) |
| 3 | `git status` clean of the 8 jpegs + 2 `*_time.txt`; `.gitignore` carries the scratch pattern | MET | 10 strays deleted; re-emitted scratch stays ignored |
| 4 | `package.json` single converged keyframes.js floor (`^2.1.1`); `typecheck` exit 0 | MET | both stanzas `^2.1.1`; typecheck 0 errors |
| 5 | CLAUDE.md §Build matches the `vue-tsc` toolchain on-disk; cherry-pick count reads 7 (CLAUDE.md + `src/index.ts` header) | MET | §Build clean on-disk; count + named list reconciled to the empirical 7 |

---

## AP.W5 — Close ceremony + release — PLANNED

- **Opens:** after W2 + W3 + W4 close
- **Status:** PLANNED
- **Agents:** orchestrator-led close sweep
- **Disposition:** π/ι + overfitting + `AP/FINAL.md` + the 3.0.0 changeset amendment (fold AP into the unpublished 3.0.0; bump only if cause).

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | Full glass-ui-internal gate matrix green; cross-repo residuals documented | PLANNED | — |
| 2 | π re-probe — canon + 4 motion primitives + W3 surfaces (R0G-6 dock, aurora idle) unregressed; `proof:theme` byte-clean | PLANNED | — |
| 3 | ι sweep — stash-clean; no agent mutation; secrets-clean; no `--no-verify` | PLANNED | — |
| 4 | Overfitting audit clean — every AP change derivation/correctness/the 2 deferred items + hygiene; watched conditions stay gated (AP promotes nothing) | PLANNED | — |
| 5 | `AP/FINAL.md` authored — gate matrix + watched-conditions ledger (inline-edit 3-divergent; dock panel-host 1-consumer) + cross-repo perimeter | PLANNED | — |
| 6 | The unpublished 3.0.0 changeset/CHANGELOG amended to fold AP (or justified bump); user-domain push/tag/publish/submodule perimeter recorded | PLANNED | — |
