# AP.W0 ALPHA — prompt + precept coverage across the glass-ui arc

Audit lane ALPHA of AP (glass-ui's development-phase successor to the just-closed AO). Read-only on git + source; tranche-development only. Greenfield voice, em dashes unspaced. HEAD is the AO close (`e3ac16d`, v3.0.0 staged).

Brief: recapitulate every user prompt/request across the whole glass-ui arc, verify each is addressed, and confirm the precept canon held over the AO window. Adversarial — actively hunt for back-compat slips, greenfield-voice breaches, overfit substrate, and workarounds in the AO changes.

---

## §0 — Headline

The AO window is **clean on the precept canon** — all 9 memory feedbacks and the load-bearing invariants HELD. No back-compat slip, no greenfield-voice breach, no overfit substrate, no workaround. `useSpringOrchestrator` truly deleted (grep 0 in src); `useIdleReady` truly ≥2-consumer-justified (5 named speedtest sites).

But there is **one survivor**: the speedtest-AQ consumer request is a **seven**-item handoff (R0G-1..7), and AO folded only **five** (R0G-1..5). **R0G-6** (DockIconButton coarse-pointer 44px floor) and **R0G-7** (motion-barrel keyframes split) are confirmed-not-speculative consumer items, surfaced during AQ R2 implementation, and AO dispositioned them **NOWHERE** — not DELIVERED, not DOCUMENTED, not ARCHIVED, not declined-with-rationale. This is a zero-deferral (P inv 28) miss that AP must fold or formally dispose.

---

## §1 — User-prompt ledger (the whole arc)

Disposition vocabulary: DELIVERED · PARTIAL · UNADDRESSED · SUPERSEDED. Prompts 1-6 are the standing/session prompts named in the brief; 7-8 are derived from the tranche docs (the consumer-request fold).

| # | Prompt / request (WHAT) | Disposition | Evidence (wave / commit) |
|---|---|---|---|
| 1 | Standing tranche directive — "complete the plan IN TOTALITY, NO quick solutions, NO workarounds: idiomatic, gestalt approaches; agent orchestration + deep parallelization" (drove G, then AO impl this session) | DELIVERED | AO ran 6/6 waves all-green under this authority (FINAL §Authority cites it verbatim); orchestrator-led, 4+2+4+2 parallel agents per wave; zero brittleness windows declared (`PATH-FORWARD.md §Brittleness`). |
| 2 | "Continue the glass-ui tranche." (drove AN) | DELIVERED | AN closed at `4869b74` (2.1.0); 5 DELIVERED / 3 DOCUMENTED / 2 ARCHIVED (`AO/audit/ALPHA-prompt-precept-recap.md §1.2`). AO is its named successor. |
| 3 | Screenshot bug report (cards not glassy, font off, dock overflowing) — diagnosed transient | DELIVERED (SUPERSEDED as a bug) | Diagnosed transient in the AN/AO arc; no standing source defect. AO's CSS-truth pass (W2 gate-blindness, W4 cascade consolidation, `drawer.css` double-`hsl()` fix `d30f251`) hardened the cascade against exactly this class of visual drift. No open card/font/dock visual gap survives. |
| 4 | Canonical deep-audit directive — "DEEPLY audit with 6 agents in parallel, devise a path forward, recapitulate prompts/plans/precepts, fold deferred items, recap ALL prompts, NOT an implementation phase, tranche development only" (drove H + AO dev, now AP dev) | DELIVERED (for AO); IN-FLIGHT (for AP) | AO.W0 ran the 6-lane audit (ALPHA/BETA/GAMMA/DELTA/EPSILON/OMEGA → `audit/PATH-FORWARD.md`); W0/W1 are the dev phase, W2 the impl boundary (`PATH-FORWARD.md §Wave shape`). This AP.W0 lane is the same directive re-invoked. |
| 5 | "Deploy another 6 agents in parallel to refine the glass-ui tranche. Same discipline." (drove AO dev) | DELIVERED | AO's 6-lane W0 audit + the orchestrated impl waves are the realisation; `dfdd7dd`→`e3ac16d` (22 commits, FINAL §Commits). |
| 6 | Operational/security constraints (NPM/crates.io tokens SECRET; Maps key server-side only; never commit .env/creds; never `--no-verify`; agents READ-ONLY on git; pushes user-domain) | DELIVERED (HELD) | `W5-close.md §ι sweep`: secrets-clean (only `NPM_TOKEN` NAME references in perimeter prose, no VALUE); every AO commit orchestrator-authored, no agent git mutation; publish + push held user-domain (FINAL §Cross-repo user-domain perimeter, 4 items). No `--no-verify` in the arc. |
| 7 | speedtest-AQ consumer fold R0G-1..5 (Aurora loop · chassis reserve · useIdleReady · Toaster position · surface token) | DELIVERED | AO.W3 (`f934fed` `f76f7bf` `029d052` `8e299a6` `ab93d38`) + AO.W4 `--surface-public-data-panel` (`1470d38`); `W3-consumer-gap.md` gate table 1-5 MET; π re-probe at W5 (`46ac5a6` caught + fixed a dock-specificity regression). |
| 8 | speedtest-AQ consumer fold **R0G-6 + R0G-7** (DockIconButton 44px floor · motion-barrel split) | **UNADDRESSED** | Present in `CONSUMER-REQUEST-speedtest-AQ.md` "The seven" table (rows R0G-6/R0G-7) and the authoritative `speedtest/.../AQ/R0-GLASS-COORDINATION.md` ("**seven** consumer-driven items"). Folded/dispositioned in **zero** AO wave spec, AO.md, PATH-FORWARD, or FINAL — every AO doc says "**five**". Source confirms neither landed (see §3). **SURVIVOR.** |

**Tally: 8 prompts/requests → 6 DELIVERED · 1 DELIVERED-for-AO-IN-FLIGHT-for-AP · 1 UNADDRESSED.** No PARTIAL, no SUPERSEDED-as-dropped.

---

## §2 — Precept-canon check over the AO window

Adversarial verdicts. Each precept HELD unless a breach is cited.

### §2.1 — The 9 memory feedbacks

| Precept | Verdict | Evidence / adversarial probe |
|---|---|---|
| No backwards compat (clean breaks, no aliases/shims) | **HELD** | `useSpringOrchestrator` alias DELETED (`9f90bb4`); `grep -rn useSpringOrchestrator src/` = **0** (re-verified this lane). The version routes the break through a `major` changeset → 3.0.0 (`147f078`), no compat alias retained. The residual `back-compat`/`legacy` strings in src are all greenfield *negations* ("no back-compat shims") or a CSS adjacent-sibling robustness pattern (`utilities.css:402` metric-badge single/dual-slot — forward-compat, predates AO), not versioned shims. |
| Presets in consumers (lib ships own default tokens) | **HELD** | `--surface-public-data-panel` (`1470d38`) is a library identity surface token in `tokens.css`/`theme.css`, not a consumer preset absorbed into the lib; the chassis reserve tokens (`--instrument-dial-min-height-mobile` etc.) are token-first defaults consumers retune. |
| Writing style (no grandiloquence, levity, em dashes unspaced) | **HELD** | AO FINAL + audit docs read in greenfield voice; em dashes unspaced throughout; no banned-word drift flagged on read. |
| Architectural approach (gestalt over patches, no workarounds) | **HELD** | AO's organizing move was gestalt — fix the *blind gate* at the cause (`combinedStylesDraw` measures the real `dist/styles` graph, `f79df28`) rather than tune a phantom number; the `publishStyleAssets` share (`b10c66f`) RETIRES the "re-run build last" workaround. No band-aid landed. |
| Tailwind-first (CSS refs re-expressed via @theme/@utility) | **HELD** | W4 consolidation is `:where()` hoists + dedup + token-first reserves (`d30f251` `1470d38`), not pasted raw CSS; the chassis reserve is `grid-template-rows` + `min-height` reading custom properties. |
| Analyze in full (read whole corpus before planning) | **HELD** | AO.W0 ran a 6-lane parallel audit reading the full AM→AN arc + the speedtest-AQ spec before the W1 design slice. |
| Tranche format (bbnf-lang `docs/tranches/{LETTER}/`, hard gates, FINAL) | **HELD** | AO ships AO.md + PROGRESS.md + FINAL.md + waves/ + audit/ + design/; per-wave hard-gate tables; gate matrix in FINAL. |
| Overfitting audit (≥2 sites OR exported OR demo-private) | **HELD** | `W5-close.md §Overfitting`: every AO change is correctness / deletion / additive-with-default / a gate-cleared promotion. The one new exported substrate — `useIdleReady` — carries 5 named consumer sites (verified against `R0-GLASS-COORDINATION.md:33`: App.vue, MapView.vue, DashboardMap.vue, useAutoStart.ts, useIPInfo.ts). Not an overfit invention. |
| Greenfield, no meta (no "ported from" / version history / migration language) | **HELD (with the standing named carve)** | The library's OWN surface carries no version-history/ported-from prose. The cross-repo consumption-handoff language (speedtest-AQ fold) is seam-documentation at the tranche-doc layer — the same allowed carve ALPHA recorded for AN; not in-library migration narration. `CHANGELOG.md` is changeset-generated release metadata, not source-embedded history. No breach. |

### §2.2 — Load-bearing invariants the AO close cites

| Invariant | Verdict | Evidence / adversarial probe |
|---|---|---|
| No legacy alias (inv 47 / L inv 4) | **HELD** | The alias deletion is the AO headline (`9f90bb4`); the surface-manifest test dropped the stale assertions (`ab93d38`), completing the purge; grep 0. |
| Substrate-binary at ≥2 consumers (J inv 10 / L inv 8) | **HELD** | `useIdleReady` is the only new exported primitive and clears the gate at 5 sites. The 2 AN ARCHIVED items + the inline-edit convergence stay correctly gated as watched conditions (FINAL §Watched-conditions ledger); none gained a 2nd consumer, none promoted speculatively. |
| vueuse-FREE root barrel (L.W1) | **HELD** | `useIdleReady` imports only from `vue` (`W3-consumer-gap.md` R0G-3 — "vueuse-FREE, so it surfaces through dom/index.ts → root barrel automatically"); no AO addition reintroduced `@vueuse/core` into a root-reachable symbol. |
| Contract-v2 cross-repo-dev-resolution (inv 30) | **HELD** | `proof:resolution` green (FINAL gate matrix); the root-surface-contract proof RESYNCED to the real barrel (`c2c5b3c`) — a stale-proof correction that would have false-failed CI, fixed *toward* truth, not worked around. |
| Zero deferral at close (P inv 28) | **BREACHED (minor, recoverable)** | R0G-6 + R0G-7 are confirmed consumer-surfaced items with **no named disposition** anywhere in AO. P inv 28 / the AN sub-invariant requires every gap to dispose to DELIVERED/DOCUMENTED/ARCHIVED/declined-with-rationale. Two items silently absent — not "deferred-with-destination", just absent. This is the §3 survivor; AP carries it. |

**Net precept verdict:** 9/9 memory feedbacks HELD; 4/5 cited invariants HELD; **P inv 28 has one minor breach** — the un-dispositioned R0G-6/R0G-7. No back-compat slip, no greenfield-voice violation, no overfit artefact, no workaround. The breach is a *coverage* miss (two items fell out of the "five" framing), not a quality/architecture breach.

---

## §3 — SURVIVORS into AP

### Survivor 1 — R0G-6: DockIconButton coarse-pointer 44px floor (UNADDRESSED)

- **What**: `DockIconButton` must measure ≥44×44 on a coarse pointer; fine-pointer desktop unchanged.
- **Why it is real, not speculative**: the authoritative spec measured it **at 40×40 on the real edge** — "disproves the prior 'dock already has a 44px floor' assumption" (`CONSUMER-REQUEST-speedtest-AQ.md:24`). The `--dock-tab-h: 44px` in `src/styles/dock.css:122` is the **tab**-button floor, NOT the icon-button — it does not cover this case.
- **Source state (verified this lane)**: no coarse-pointer / `@media (pointer: coarse)` 44px floor on the icon-button path in `DockIconButton.vue` / `dock.css`. Confirmed UNADDRESSED.
- **AP disposition**: an a11y/touch correctness fix on an existing primitive (the AO ethos — elegance/perf transposition of shipped surface). Fold into AP, or formally decline with rationale.

### Survivor 2 — R0G-7: split the `motion` barrel (keyframes eager-pull) (UNADDRESSED)

- **What**: a consumer importing only cheap motion utils should build a dist with `@mkbabb/keyframes.js` (~125 KB) OFF the entry/eager graph (sourcemap-verified); the animation primitives stay available on their own lazy path.
- **Why it is real**: surfaced during AQ R2 implementation, measured on the real built dist (`CONSUMER-REQUEST-speedtest-AQ.md:25`).
- **Source state (verified this lane)**: `src/composables/motion/index.ts` is a single barrel that `export *`s the keyframes-backed primitives alongside the cheap utils (`useScrollProgress`, `useRAFLoop`, etc.). No split entry exists. Confirmed UNADDRESSED.
- **AP disposition**: a bundle-shape/perf transposition of an existing barrel. This is the heavier of the two (it touches the subpath/chunk topology that L.W1 + the 76-entry split established) and wants a design-slice decision. Fold into AP with a design wave, or ARCHIVE with a named realisation condition if a single-consumer item does not yet clear the bar.

### Non-survivors (proof of closure for everything else)

- Prompts 1-7: DELIVERED (§1).
- All 9 memory feedbacks: HELD (§2.1).
- The 2 AN ARCHIVED-on-2-consumer items (interruptible reorder, dock panel-host): correctly stay archived as watched conditions (FINAL ledger); not survivors — the binary substrate gate working as designed.
- The cross-repo user-domain perimeter (push held commits, seed NPM_TOKEN, cut 3.0.0, reconcile precepts submodule): surfaced-not-absorbed; user-domain by the operational constraint (prompt 6), not glass-ui survivors.
- The `fourier-analysis` phantom-classes handoff + speedtest's own consumer debt: documented cross-repo residuals (FINAL §Cross-repo residuals), absent from glass-ui CI; not glass-ui survivors.

**Survivor count: 2** (R0G-6, R0G-7) — both consumer-surfaced, both confirmed-not-speculative, both un-dispositioned at the AO close, both must carry into AP.

---

## §4 — Authority

- AO close: `docs/tranches/AO/{FINAL.md, AO.md, PROGRESS.md}` + `audit/{PATH-FORWARD.md, W3-consumer-gap.md, W4-css-rebase-consolidation.md, W5-close.md, ALPHA-prompt-precept-recap.md}`.
- Consumer fold: `docs/tranches/AO/CONSUMER-REQUEST-speedtest-AQ.md` ("The seven") + the authoritative `speedtest/docs/tranches/AQ/R0-GLASS-COORDINATION.md` ("seven consumer-driven items"; useIdleReady 5-site enumeration line 33).
- AN basis: `docs/tranches/AN/` + the AO ALPHA recap §1.2.
- Memory feedbacks: `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/memory/`.
- Commit arc: `dfdd7dd`→`e3ac16d` (`git log --oneline`).
