# AX — FINAL HARDENING (the drive-readiness certification)

Synthesis of the 30-slice final-hardening pass (completeness · cogency/coherence · coordination · autonomous-resilience · mandate · dock/primitive augmentation · ops · session). Ground-truthed live, not trusted from the specs: HEAD `cdcf331` (`v3.6.0-49-g…`, so **v3.7.0 is NOT tagged in this repo** — only the deltas are on the line), npm `latest = 3.7.0`, local `package.json = 3.7.0` (so **the AX cut is 3.8.0**), 45 wave specs under `waves/`, §4 reconciliation appendix at 27 notes.

**One-line verdict: GO-WITH-BLOCKERS.** The architecture is sound and drives end-to-end; the gates are falsifiable; the DAG is acyclic; the cross-repo sequencing is inv-16'-safe. But the tranche cannot be dispatched into a 12-hour unattended run until **six blocker classes** (all spec-text edits, zero src) are cleared in one pass. They are enumerated in §H below and pre-resolved as concrete edits in §G.

---

## §A — COMPLETENESS verdict: ROUTED-COMPLETE (no dropped requirement; four traceability sharpenings; ZERO new waves needed)

Every REQUIREMENTS §0-§24 line routes to a concrete AX wave or a §4 reconciliation note. Nothing is dropped, deferred-silently, or unowned at the requirement level. The four sharpenings below are traceability/visibility fixes — they make a satisfied-but-diffuse routing self-describing so an autonomous agent cannot mis-read it as a gap.

| Req span | Routing | Status |
|---|---|---|
| §0 Mandate | AX.md §0 + every wave | ROUTED (but see §E: §0 contradicts §21 — blocker) |
| §1 DOCK | W01-W06, W42 (§4 notes 3, 23) | ROUTED |
| §2 AURORA | W07, W10-W14, W38 (§4 notes 7, 14, 25) | ROUTED (W14 = DISCHARGED-AS-EXCISE; add §2.4 note) |
| §3 BLOB | W08, W15, W16 (§4 notes 13, 26) | ROUTED |
| §4 CONSTELLATION | W17 (§4 notes 15, 16, 27) | ROUTED |
| §5 SPECULAR | W09 (§4 note 12 + §20 + §24 third-confirm) | ROUTED |
| §6 STORYBOOK | W18, W19/W20/W29, W40 | ROUTED (**§6.6 diffuse** — add note 28) |
| §7 PRIMITIVES | W19-W22, W29, W06 (§4 note 4) | ROUTED |
| §8 SPEEDTEST | W28, W29 (§4 note 8) | ROUTED |
| §9 SLIDERS | W23 (§4 note 5) | ROUTED |
| §10-§16 | W24, W25a/b, W26, W27a/b, W30-W35, W41 (§4 notes 6, 11, 12, 19-22, 24) | ROUTED (**§11.4/§11.5 implicit** — W33 cross-walk enumerates only §13+§14; add note + extend cross-walk) |
| §17-§20 | 45 wave specs + §5 gating + §20 handoffs (W06/W09/W21/W33/W34/W35) | ROUTED |
| §18 LIQUID-GLASS | W42 + per-wave SOTA | ROUTED |
| §19 DOCK FACILITIES | DOCK-FACILITIES.md matrix + W00-W06/W42 + §5 | **GATE IS A STUB** (blocker) + **§19.6 carousel-dock unadjudicated** (minor) |
| §20 HAND-OFFS | W09/W06/W21/W33; consume-gates → W34/W35 | ROUTED (**USF absent from W34 ledger** — major) |
| §21 EXECUTION MANDATE | — | **ENTIRELY UNROUTED into AX.md** (blocker — §E) |
| §22 FINAL HARDENING | this document | ROUTED (§22.4b absent on all waves; §22.6 unmet; §22.7 unowned — §E) |
| §23 SLIDES live-feedback | W17, W30, W31, W32 | ROUTED |
| §24 SHARED-STATE RECONCILE | W30, W33, W17, W37 | ROUTED (**stale baselines not propagated** — §F) |

### The genuine gaps (none is a routing hole; all are visibility/ownership sharpenings)

1. **§6.6 "perfect EVERY component"** routes DIFFUSELY — it is the union of each component-perfection wave (dock W01-W06, aurora W10-W14, blob W15-W16, sliders W23, primitives W19-W22/W36) + the W40 coherence triad (animation + design + naming) + W18's reads-coherently close. NOT a single wave (a "perfect every component" wave would be unfalsifiable overfit). Fix: new §4 note 28 records the diffuse routing + names the INTERACTION-cohesion axis as W40's third leg.
2. **§11.4/§11.5** (brittle-selector/reactivity audit; library-optimum/gaps-glass-ui-vs-slides) route to W26 + W25b + W34/§16.3, but the W33 inheritance cross-walk enumerates only §13+§14 — so §11 is implicit-only at close. Fix: extend the W33 cross-walk to `§11 + §13 + §14` + a §4 routing note.
3. **§2.4 WebGPU painterly** is DISCHARGED-AS-EXCISE (W14 Branch B) — the multi-pass Kuwahara is deferred-with-rationale (substrate-without-consumer). A reader scanning §2.4 against the cut sees an unmet headline unless it is surfaced. Fix: §4 note recording the EXCISE discharge.
4. **§2.3 derive-color + §2.9/§3.5/§4.4 research READMEs** carry legitimate not-as-literal dispositions (derive-color PUBLIC door is VAL-1 kill-gated but the seam satisfies; the in-tree src READMEs already carry the full research shape, W11/W16/W17 sweep not re-author). Fix: §4 notes 7-extension + note 29.

**No new wave or fold is required for completeness.** Every §-line has a home.

---

## §B — COGENCY / COHERENCE verdict per band

Each band's per-wave specs were audited for concrete-measurable goals + a falsifiable born-RED→GREEN gate + the mandatory VISUAL-TRUTH clause, and the band for internal contradiction. Load-bearing source claims were re-verified against HEAD (the specs are anchored to `eaba94f`; HEAD is `cdcf331`; intervening commits are AX-docs + fourier-field — the `src` baseline for the audited waves is unchanged, so `eaba94f` remains the correct audit baseline, only line offsets drift).

| Band | Waves | Verdict | Load-bearing contradictions found |
|---|---|---|---|
| **A · DOCK** | W01-W06, W42 | SOUND (strongest band) + sharpen | W42 `useLayerTransition` path wrong (`composables/motion/` → `dock/composables/`); W42↔W02 ordering unpinned; **W04↔W01 morph-mechanism contradiction** (W04 gate asserts CSS-transition-on-`--dock-motion-resize`; W01 deletes that list → calc()-off-`--dock-morph-t`); **W42 `--morph-t`↔`--dock-morph-t` scalar-name bridge unspecified**; W01/W42 `data-morph-state` boolean→enum sequencing |
| **B · GRAPHICS** | W07, W08, W09 | SOUND + sharpen | **Opaque-fraction band contradiction** (W00 floor 10-45% vs W08 composed 25-60% — a contained droplet at ~0.5-0.6 fails the shared primitive W08 composes); W07 CI gate Metal-blind to defect 1b; `--mouse-x/--mouse-y` vs `--specular-x/y` vocab drift |
| **C · AURORA** | W10-W14 | SOUND + sharpen | W13 "stunning/congruent to Van Gogh" NOT operationalized for the unattended lane (the cardinal-AW green-structure-over-unvalidated-render risk re-entering at the painterly layer); reference works un-named/un-committed; W13 `strokeMode:"crayon"` clean-break un-guarded against a silent consumer no-op; W14 RATIFY has no autonomous default |
| **D · BLOB / E · CONSTELLATION** | W15, W16, W17 | SOUND + sharpen | **W17 `no-light-dark()` gate transitive-var hole** (forbids the literal substring but `var(--neutral-4)`/`var(--foreground)` resolves to `light-dark()` → re-admits the cardinal Canvas2D defect through the library's own neutral ladder); W17 `toLocal`/pointerdown lexically unreachable from `defineExpose`; W16 `useResolveTokenColor` duplicates existing `useTokenColor` (collides with W21) |
| **F · STORYBOOK / G · PRIMITIVES** | W18-W22 | HAS-CONTRADICTION | **W18 RED witness 2 is FABRICATED** (the "12-vs-11 header lie" is provably false — live manifest = 11 cats, `EXPECTED_TREE = 11`); **three manifest-row ownership contradictions** (W18 vs W19/W20/W06 over the SAME shared `manifest.ts` rows + the `dock-active-tokens` delete-vs-relocate); W21 metric-pill `:101→:95` drift |
| **H · SLIDERS / I · DECK** | W23, W24 | SOUND + sharpen | W23 gate asserts `transform != none` but the cited DeckPager oracle is width-only (over-prescriptive against its own oracle); W32 `^3.4.0` pin stale (slides is ^3.7.0); line-ref drift |
| **J · ENCAPSULATION** | W25a/b, W26, W27a/b | HAS-CONTRADICTION | **W25a RED witness 2 FALSIFIED** (`dist/components/` EXISTS — holds 398 `.d.ts`; the gate tests dir-existence, GREEN at HEAD, ships the real defect = content-scan reaches no class strings); W26 `dock/composables/index.ts` barrel collision vs W01/W02/W03 mis-stated as disjoint |
| **K-N · SPEEDTEST/SLIDES/CROSS-REPO/CLOSE** | W28-W42, W33 | SOUND + sharpen | **W33 drops W42 from its close enumeration** (defeats W33's own anti-renumber-drift purpose); **W32 vReveal-subpath contradiction** (spec says `/motion`; live = root barrel + `/motion-core`, NOT `/motion` → a deploy-path build break); CONSTELLATION.md creator-collision (W28 + W30 both `**NEW**`) + path inconsistency (`coordination/` vs `docs/tranches/AX/coordination/`); W40 header missing dependsOn; W30 over-hard W17 block |

**Cross-band coherence (§22.3):** the §4 reconciliation appendix (27 notes) is the load-bearing strength — it pre-resolves POS_SCALE (notes 13/26), WEBGPU_PARITY (note 14), Fraunces (note 17), the W25/W27 tag-model (notes 19-21), the dock-spring oracle (note 23), constellation-warp-net-new (notes 15/16), W42-as-distinct-wave (note 22). Vocabulary is consistent (`--morph-t`/`--dock-morph-t` lineage, the `--spring-*` register, the glass-material spine, the `data-morph-state` enum). The named contradiction-PAIRS from the hardening brief are CLEAN (W01-single-scalar vs W05-spring-vocab is disjoint; W09-specular vs W20-glass is disjoint; W19/W20↔W35 is the stage-typed LAND/PUBLISH/CONSUME split, not a cycle). **Every real contradiction found is a PROPAGATION FAILURE** of two late-added objects (W42 + the §21/§24 mandate) into the DAG, the gate-fleet, and the dependent specs — surgical, not structural.

**Resolution policy for the contradictions:** all are resolved in §G's concrete edits. The cardinal class — a gate that is GREEN at HEAD while the real defect ships (W18-RW2, W25a-RW2, W17-transitive-var, W08/W00-band) — is the highest-priority sub-class because it is the exact AW headless-green/visually-broken failure re-entering through AX's OWN gates.

---

## §C — COORDINATION artifacts

### C.1 — Topological dispatch order (the DAG)

The as-declared DAG (every per-wave-header dependsOn + the W33 enumerated terminal) is **ACYCLIC** and sorts cleanly across all 45 waves. π-first, dock-first, blocker-first all hold; W33 is strictly last.

```
W00 → W01 → W02 → W03 → W04 → W05 → W06 → W07 → W08 → W09 → W10 → W11
   → W12 → W13 → W14 → W15 → W16 → W17 → W19 → W20 → W22 → W23 → W18
   → W21 → W24 → W26 → W27a → W25a → W27b → W28 → W29 → W25b → W30 → W31
   → W32 → W34 → W35 → W36 → W37 → W38 → W40 → W39 → W41 → W42 → W33
```

Parallelization within the order: the aurora chain `W07→{W10,W11,W12→W13→W14,W38}` and the blob chain `W08→W15→W16` run **in parallel** with the dock band (each roots off W00 independently — the two co-headline graphics blockers W07/W08 are NOT serialized behind the dock). The dock band itself serializes (W00→W01→{W02-W06}→W42; every member mutates `dock.css`/`GlassDock.vue`, so none parallelizes). `W25a→W25b` is gated by the metric-ownership decision (W25b dependsOn W29) — push the utilities carve after the speedtest repatriation, but the tokens-carve half of W25b is unblocked earlier (the spec sub-waves it — honor the split for throughput). W18 is the longest non-close critical-path node (fan-in W06/W19/W20/W22/W23; W20 gates on W07+W09 graphics → W18's earliest start is after the graphics blockers; it is NOT an early-dispatchable IA wave).

**Latent near-cycle (RESOLVED by stage-typing):** W35 dependsOn W19+W20; W19/W20's npm-PUBLISH dependsOn W35-green. Read as a dispatch edge this is a cycle; typed as edges (LAND vs PUBLISH vs CONSUME) it is acyclic — W19/W20 LAND in-repo with no dependsOn on W35; only the PUBLISH is W35-gated; W35's consume-bump is the inverse leg gated on that publish. The only imprecise prose is **AX.md line 1781** (drops the "PUBLISH" qualifier) — an edge-extractor could synthesize the phantom cycle. Fix in §G.

### C.2 — Shared-file collision map + sequencing

The charter §22 collision census is materially **INCOMPLETE** (under-counts every shared file). The lock manager must key off the verified writer matrix below, keyed on **filename/selector — NEVER on the `:NNN` line anchors** (every shared-file line drifts the instant any co-writer in its chain lands first).

| Shared file | Ordered writers → serialization rule |
|---|---|
| `dock.css` | W01 (`:326-340` morph drivers) → W04 (`:904-950` wrap recipe, DELETE `:1154-1192`) → W06 (carve into `src/styles/dock/` partials, LAST). **W25b does NOT touch dock.css** (charter §22 is wrong on this) |
| `glass.css` | W09 (`.glass-material::before` specular) · W24 (`.glass-progress-rail`) · W42 (appended `@supports --glass-refract-scale`) — line-region-disjoint; **W20 does NOT write glass.css**; W25b does NOT carve it. Orchestrator serializes the three writers |
| `tokens.css` | W05 (del `:178/:181`) → W09 (add `:1724`) → **W17 (add `--constellation-*` block)** → W20 (`:1287` comment) → W22 (`:43-44`) → W25b (§-seam carve, LAST, EXHAUSTIVE — absorbs ALL cohorts incl. W09 specular + W17 constellation). Charter §22 misses W17 + W20 |
| `utilities.css` | W21/W22/W28/W29/W36/W37/W38 (additive appends) → W25b (RELOCATE component-coupled recipes, LAST). Charter §22 names only W21/W25b |
| `index.css` @import cascade | W06 (add dock/*) + W19 (del `:130/:131`) + W29 (del `:128/:129`) + W22 (`:129`) → W25b (re-point WHOLE cascade, LAST). **W25b dependsOn must add W19** |
| `demo/stories/manifest.ts` | W06/W10/W19/W20/W21/W29 (each drops/edits its OWN rows WITH the src change) → W18 (authors NEW category tree + re-baselines `EXPECTED_TREE`, LAST, NEVER deletes a prune wave's row) → W40 (nav SHELL, zero manifest) → W39 (READ-only). Charter §22 names only W18/W40 — the single largest under-count |
| `dock/composables/index.ts` | W01 (add `useLayerTransition`) + W02 (morph-context helpers) + W03 (`useDockHold`) → W26 (DROP `useOptionalDockLayerGroupContext` re-export, AFTER the dock band) |
| `api/index.ts:217` | W20 (rewrite the MetricCell comment dropping "parallel to `GlassPanelVariant`" — else its deletion-proof grep returns 1, false-FAILS) |
| `AX.md` / `PROGRESS.md` | **NOT collisions** — orchestrator-owned, agent-read-only (no per-wave spec declares AX.md as a FileBound; PROGRESS.md is a between-wave status surface) |

### C.3 — Cross-repo DAG (inv-16'-safe)

The cross-repo sequencing is the **strongest part of the tranche** and structurally inv-16'-safe.

```
glass-ui (3.8.0)  ──publish──▶  consumer bumps  ──▶  slides deploy  ──▶  prod validation
   [W33: §24 3.7.0-source             [eligible NOW (clean trees):       [W30→W31→W32:        [§21 end-state:
    merge → changeset →               speedtest, bbnf-buddy, fourier]    land H (already      npm view == 3.8.0 (W33)
    v3.8.0 tag → release.yml          [handoff-patch (dirty trees):      committed) →         + slides.friday.institute
    OIDC provenance publish]          muster 89, words 23, value 6,      reframe → adopt →    200 + AX deck + pptx-200
                                       keyframes 37/tranche-h-impl]       MERGE TO main →      on the CUSTOM domain (W32)]
                                      [W28→W29 R-clean→R0-receive→         deploy-pages.yml]
                                       W-prune→R1-bump; W34/W35/W41]
```

`W28→W29` (native-first/prune-after, the clean-sibling gate-0), `W35` (keyframes mirror: migrate→prune-publish→consume-bump), `W30→W31→W32` (slides chain), `W34/W41` as the §16-receiver hub + the publish keystone. CONSTELLATION.md section ownership is disjoint (W28 opens band-K + gate-0; W34 the §16-receiver body; W35 appends band-N migration; W41 band-N supplier-edge; W32 appends the slides leg). **W41 is the keystone** the whole consume-bump chain resolves through (the `build:watch` dts-emit fix is the genuine root-cause close for the value.js stale-dist class).

**Cross-repo blockers (§F):** (a) the **deploy-DAG terminal is unowned** — no wave merges the AX slides line onto `main` so `deploy-pages.yml` (head_branch=='main'-gated) fires; (b) **W30's git premise is stale** (slides is `d79091e`, CLEAN, H committed, leak fixed, deck deployed — `9f08ded`); (c) the **§24 3.7.0→3.8.0 lineage-merge** is absent from W33; (d) **no named AX cut version** (every bump leg says "the AX cut" against a stale 3.6.0 baseline; the cut is **3.8.0**); (e) **no end-to-end prod-validation gate** (no `npm view`-live nor slides.friday.institute-live assertion).

---

## §D — The canonical AUTONOMOUS-RESILIENCE clause (§22.4b) + the halt-vs-work-around decision tree

**Census:** 0 of 45 wave specs carry the §22.4b autonomous-resilience clause; AX.md itself carries none. 5 specs (W01/W18/W27a/W27b/W40) carry only the §3a TRIGGER half (when to HALT + spawn a triumvirate); 2 (W38/W39) carry a divergent-named variant. The "gestalt fix" token across ~41 specs is the waves' OWN design-rationale usage (the root-cause fix), NOT the resilience authorization — a false positive masking the gap. **This is the single highest-value fix for the unattended run:** an agent that hits a roadblock with no authorizing language stalls (asks → deadlock; or improvises a workaround → violates §0).

### D.1 — The canonical clause (master template; lives ONCE in a new AX.md §6, instantiated per wave)

> **Autonomous-resilience clause (REQUIREMENTS §22.4b — mandatory; governs every wave under the §21 autonomous mandate).** A roadblock is a path-forward, not a stop. The implementing agent is AUTHORIZED, without waiting for a user prompt, to:
> 1. **Devise an idiomatic GESTALT fix** when the spec-prescribed approach hits a technical roadblock or proves wrong. If the better idiomatic fix stays WITHIN this wave's FileBounds and violates no precept, apply it directly — re-derive from first principles, no workaround/legacy/special-case (§0). Record the divergence + rationale in the wave's audit JSON.
> 2. **Spawn a tangent triumvirate to work AROUND an error**, never stall. If the fix would expand FileBounds, cross a sibling-wave boundary, re-open a §5.3 ratify, or a hard gate fails non-locally / a diagnostic loop hits its third iteration, HALT the failing unit and dispatch the standard triumvirate (ORCHESTRATION §Triumvirate: research → plan-augment carrying the mandatory `## Exact Wave-Amendment Text` → redress; HARD CAPs 20/15/30 min; artefacts `audit/{COHORT}-research|plan|redress.md`). Work the tangent to resolution, resume the main line. Do NOT redispatch the failing unit alone; do NOT hand-roll a bespoke recovery; do NOT absorb a scope reveal silently.
> 3. **Escalate to the orchestrator ONLY when genuinely user-gated** — which is ONLY when it (i) requires a §21 hard-prohibited action class (financial credentials, account creation, access-control/sharing changes, permanent data deletion, financial trades, security-setting changes, CAPTCHA), (ii) would violate a §21 held invariant (touch `docs/precepts/`; source-embed `wolfpack-ledger-2026`; an agent staging/committing the main index; inv-16' writing a dirty sibling), or (iii) is a §5.3 ratify the charter marks USER-ADJUDICATED (W22 Fraunces, W23 glass-scrubber rename, W42 second-consumer). EVERYTHING ELSE — an ambiguous root cause, a wrong-approach roadblock, a non-local gate failure — is resolved autonomously per (1)/(2). On a server throttle/session cap → ScheduleWakeup + resume, never abort. On cross-session clobber → coordinate (read the sibling branch/locks), sequence, sleep; never corrupt a sibling tree.

### D.2 — The halt-vs-work-around decision tree (4 classes — the closed, decidable boundary)

| Class | Trigger | Action |
|---|---|---|
| **1 · WORK-AROUND** (most cases) | A blocking obstacle that is locally fixable, in-FileBounds, precept-clean | Devise an idiomatic gestalt fix in-line. Resume. No stall, no user-gate. |
| **2 · TRIUMVIRATE** | Scope-reveal (out-of-FileBounds / sibling boundary / §5.3 re-open) · non-local hard-gate failure · 3rd diagnostic-loop iteration | Dispatch research→plan-augment(Exact-Wave-Amendment-Text)→redress (caps 20/15/30). Work AROUND via the amended spec. Scope-reveal is NEVER absorbed in-line. Still no user-gate. |
| **3 · HALT-AND-RATIFY** | A §5.3 ratify-before-drive reached un-ratified, OR any precept the agent would have to VIOLATE to proceed | Stop. Surface to the orchestrator. Never self-ratify. Orchestrator takes the recorded default or escalates. |
| **4 · HALT-AND-USER-GATE** | A §21 held-invariant breach the work genuinely needs, OR a missing deploy credential | Stop. Surface as a user-gate NOW. NEVER perform silently, NEVER silently skip. |

**Vocabulary disambiguation (load-bearing):** §0's banned "workaround" = a shortcut that leaves a legacy/fallback/special-case in the SHIPPED code. §22.4b's sanctioned "work AROUND a roadblock" = an idiomatic gestalt fix that itself satisfies §0. A Class-1/2 fix is sanctioned ONLY when precept-clean. The per-wave "halt" in the existing 5 trigger-blocks means "halt THIS edit-line and spawn a tangent triumvirate that proceeds AUTONOMOUSLY" — NEVER "stop and await a human" during the unattended window.

**Insertion contract:** the clause sits at the tail of every wave's `## Triumvirate` section, directly above `## HardGate`, under ONE canonical heading — `**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**` — carrying the §6.1 authorization grant (wave-agnostic) PLUS the wave-specific §3a trigger list (authorable from each spec's existing FileBounds + HardGate). The W38/W39 divergent heading collapses onto this. The cross-tranche generalization into `docs/precepts/instructions/tranche/WAVE_SPEC.md` is a SEPARATE precepts-PR (the §21 held invariant forbids touching `docs/precepts/` during the AX drive) — the AX edits (§6 + 45 clauses) are self-contained without it.

---

## §E — The TOTALITY MANDATE header (to prepend to AX §0)

The §21/§24 framing is absent from AX.md (0 hits for §21/autonomous/end-to-end/one-shot/ScheduleWakeup/operational-readiness) — §22.6 is structurally UNMET, and AX.md §0 line 54 ("Tranche development ONLY … No merges, no publish") DIRECTLY CONTRADICTS §21 ("publish + deploy pre-authorized, NOTHING user-gated"). §21 is the newer directive (2026-06-08) and supersedes the no-publish framing via a **phase transition**: spec-formation is COMPLETE; execution OPENS. Both are true in sequence.

**Edit 1 — rewrite §0 bullet-1 (line 54) to the phase transition:**

> - **Phase-gated mandate (the §21 transition).** The CONVERGE + HARDEN spec-formation phase — plan / research / write, NO merges, NO publish — is the phase this charter was AUTHORED under, and it is now COMPLETE. Per REQUIREMENTS §21 (the governing directive), AX now OPENS its autonomous EXECUTION phase: end-to-end, one-shot, full-deploy. The two are SEQUENTIAL, not contradictory. The §0b EXECUTION MANDATE block below governs the execution phase; every dispatched agent inherits it.

**Edit 2 — insert §0b EXECUTION MANDATE after the "Cross-repo coordination doc — REQUIRED" paragraph (~line 105):**

> **§0b — EXECUTION MANDATE (governs the DRIVE session; REQUIREMENTS §21 verbatim-faithful).** AX is executed END-TO-END, IN ONE SHOT, over a long-horizon multi-compact autonomous session (12+hr unattended). The user steps away and returns to a COMPLETED session; every agent inherits this frame (§22.6).
>
> **End state (the only acceptable done — three legs, sequential DAG):** (1) glass-ui PUBLISHED to npm at its most-modern version (the AX cut = **3.8.0**), ALL AX features visually-true (rides W33 + the release.yml provenance path); (2) slides.friday.institute DEPLOYED to Cloudflare Pages, live-validated (rides W30-W32 + the merge-to-main → deploy-pages.yml); (3) every ancillary constellation consumer ADOPTED, born-RED consumer gates GREEN (rides W34/W35, greening only on the published bump). The deploy DAG is sequential: glass-ui publish → consumer bumps → slides deploy → prod validation. FINAL.md (W33) closes `complete_with_misses`, NOT `complete`, if any leg is unmet.
>
> **Full authorization (durable, this tranche):** CI, npm publish (release.yml OIDC provenance on tag push), CF-Pages/deploy, AWS CLI — NOTHING user-gated within AX, no per-action confirmation.
>
> **Operating rules under autonomy** (the autonomous-resilience axis — composes WITH each wave's in-spec triumvirate trigger; per-wave governs scope, these govern session-level adversity): rate-limit/session-cap → ScheduleWakeup + resume, never abort; roadblock → tangent gestalt fix (precept-clean, no workaround/legacy), resume; cross-session clobber → DETECT (fetch origin + compare baseline SHA; check `.git/index.lock` on main + each sibling; re-capture each sibling HEAD+branch+porcelain) → orchestrator-owned rebase (agents stay read-only) → sequence → sleep, never corrupt a sibling (inv-16'); work through compaction.
>
> **Held invariants (remain under full authorization — the Class-4 user-gate set):** NEVER touch `docs/precepts/` (verify `precepts staged: 0` every commit); NEVER source-embed `wolfpack-ledger-2026` (gitignored `.env` + GH secret + CF env only); agents NEVER stage/commit/stash/checkout/reset the main index (orchestrator owns it); inv-16' clean-sibling-only; the hard-prohibited action classes cannot be agent-performed — if the deploy chain genuinely needs one, surface as a NOW user-gate, never silently.
>
> **Operational-readiness gate (resolve user-present, BEFORE W00 dispatches):** the orchestrator clears every Class-4 gate before the user steps away — npm-publish auth (CI provenance vs local token; the 3.7.0 run is the proof), CF-Pages secrets (`CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID`/`VITE_TIL_ACCESS_KEY` presence in the slides repo), gh + AWS CLI auth, the keyframes.js dependency state (publish-CI unfixed at last record — consumers registry-resolve; confirm), and the deploy-chain DAG. Any genuine user-gate is surfaced + resolved NOW or recorded as a known late gate — never discovered mid-run.

Also update the §0 header (line 52) to "verbatim-faithful to REQUIREMENTS §0 **+ §21**", and the "Plan basis" line (line 17) from "§0-§17 master directive ledger" to "§0-§24 … §18-§24 all folded".

---

## §F — DEPLOY DAG + prod-validation checklist + cross-session protocol + operational readiness (ZERO hard user-gates confirmed)

### F.1 — Deploy DAG (author as AX.md §5 / `coordination/DEPLOY-DAG.md`, per-step OWNER waves)

```
(1) glass-ui     [W33]  §24 verify-present-or-merge the 3.7.0 source deltas (fourier-field/useCanvas2D/
                        constellation-fix — VERIFIED already at AX HEAD cdcf331) → changeset version →
                        push v3.8.0 tag → release.yml OIDC-provenance publish.  VALIDATE: npm view == 3.8.0
(2) consumer bumps      to ^3.8.0; eligibility gated on sibling tree-cleanliness:
                        bump-NOW (clean): speedtest, bbnf-buddy, fourier  [W28/W29→W34]
                        handoff-patch (dirty): muster, words, value.js, keyframes  [W35, W41, W34]
(3) slides       [W30]  verify the SHIPPED H state (already committed on deck/feedback-coder @ d79091e) →
                 [W31]  content reframe → [W32] motion adopt + pin-bump → MERGE tranche/AX-slides → main →
                        push → ci.yml(push:main) → deploy-pages.yml(workflow_run, head_branch==main)
(4) prod validate       npm view @mkbabb/glass-ui version == 3.8.0  [W33]  +
                        fetch/Playwright https://slides.friday.institute → 200 + AX-deck content marker +
                        pptx links 200 on the CUSTOM domain (not a *.pages.dev preview)  [W32]
```

### F.2 — Prod-validation checklist (the §21 end-state acceptance gate)

- [ ] `npm view @mkbabb/glass-ui version` == `3.8.0` (post-publish re-check)
- [ ] `npm view @mkbabb/glass-ui dist.tarball` resolves; the AX features ship (not the batch-1 broken-visual JS — confirm 3.7.0's "styles/fonts only" claim held)
- [ ] slides.friday.institute → HTTP 200 on the **custom domain**, serves the AX-rebuilt til-briefing deck (content marker)
- [ ] slides pptx export links → 200 (the W32 pptx-200 assertion, on the custom domain)
- [ ] every W34 consumer-adoption leg carry-closed (the **eight-consumer census** — value.js/speedtest/muster/fourier/words/bbnf-buddy/bbnf-playground **+ USF**) or recorded as a `{receiver-session, close-gate}` handoff
- [ ] USF (usf.friday.institute) bump-leg recorded: `^3.6.0 → 3.8.0` + the two born-RED USF visual gates (specular-clean + dock-control optical-parity), sibling-owned redeploy
- [ ] FINAL.md reconciles all three legs → `complete` only if all met, else `complete_with_misses`

### F.3 — Cross-session protocol (clobber detection — the §21 "orchestrate + sleep" made concrete)

The §21 "read its branch/locks" had no mechanism. AX's own line `at-dock-convergence` is UNPUSHED (HEAD `cdcf331`, 47 ahead of `origin @ 246f535`); v3.7.0 is NOT tagged here. The concrete ritual (orchestrator-owned — agents stay read-only per the git clause), run before each integration commit and at each wakeup:

1. `git fetch origin` + compare `origin/at-dock-convergence` vs the recorded baseline (`246f535`) — on a delta, another session pushed: pause, inspect read-only, **orchestrator rebases** the AX line, re-run gates, resume.
2. Check `.git/index.lock` on main + each sibling — a live lock = a concurrent writer → sleep (ScheduleWakeup), retry.
3. Re-capture each sibling HEAD+branch+`git status --porcelain` into `coordination/CONSTELLATION.md`; a dirty/unexpected-branch sibling is NOT a halt — record it, dispatch its leg as a born-RED handoff gate. **This OVERRIDES ORCHESTRATION.md:136-138** (which halts-for-arbitration) for the autonomous run — state the override in §21 and cross-reference the halt clause.

**Satisfied-witness branch (the inv-16' clobber-vs-no-op guard):** if the W00 live re-diagnosis finds a RED witness ALREADY GREEN (upstream landed out-of-band — the slides tranche-I land, the 3.7.0 publish), do NOT execute that witness's fix and do NOT re-create already-committed artefacts. Record it ADDRESSED-out-of-band with the landing commit, COLLAPSE the wave scope to the surviving RED witnesses, verify green holds. A satisfied witness is a scope-collapse, never a re-do.

### F.4 — Operational readiness map — ZERO HARD USER-GATES CONFIRMED

| Gate | State | Disposition |
|---|---|---|
| npm publish auth | release.yml OIDC provenance on `v*` tag push — GREEN (3.2.0/3.7.0 proof, MEMORY `project_publish_ci_broken`) | PRE-CLEARED |
| CF-Pages deploy | `deploy-pages.yml` workflow_run on CI/main-push; secrets `CLOUDFLARE_API_TOKEN`/`ACCOUNT_ID`/`VITE_TIL_ACCESS_KEY` are GH repo secrets | PRE-CLEARED (verify secret presence at drive-open) |
| gh / AWS CLI | assumed authed | verify at drive-open |
| keyframes.js dep | publish-CI unfixed (local publish); consumers registry-resolve | handoff-patch lane, not a hard gate |
| deploy-chain DAG | F.1 above | OWNED (route into W33/W32 close) |

**No hard user-gate stands between the drive and the end-state.** The deploy/publish authority is durable per §21; the only thing that would surface a Class-4 user-gate is a hard-prohibited action class the deploy genuinely needs (none anticipated). Operational-readiness is resolve-at-drive-open, user-present, then the run is unattended.

---

## §G — CONCRETE EDITS to apply (prioritized; one pass; spec-text only, ZERO src)

**TIER 0 — BLOCKERS (must clear before dispatch):**

1. **AX.md §0** — apply §E Edit 1 (phase-transition bullet) + Edit 2 (§0b EXECUTION MANDATE block) + header/Plan-basis updates. *(Closes §21/§22.6 unrouted + the §0↔§21 contradiction.)*
2. **AX.md** — add a new `## §6 Autonomous-resilience governance` (the §D.1 canonical clause + the §D.2 decision tree + the §F.3 cross-session ritual + the held invariants), and mechanically insert the per-wave clause at the tail of every `## Triumvirate` in all 45 wave specs (W01 is the gold-standard exemplar; W38/W39 rename to the canonical heading). *(Closes §22.4b on every wave.)*
3. **waves/AX.W33** — replace every `AX.W34…AX.W41` / `W00..W41` with `…AX.W42` / `W00..W42` (header line 3, regex line 138, lines 352/512/516/563); add `proof:morph-substrate-single` to the gate-fleet roster (line 252); add the §24 lineage-merge sub-step (verify-present-or-merge the 3.7.0 deltas → cut 3.8.0); re-baseline `eaba94f`/3.6.0 → `cdcf331`/3.7.0; add the post-publish `npm view == 3.8.0` prod-validation assertion. *(Closes the W33-drops-W42 contradiction + the §24 lineage + prod-validation.)*
4. **waves/AX.W18** — STRIKE RED witness 2 (the fabricated 12-vs-11 header lie); rewrite §Scope-6/Disjointness so W18 NEVER deletes a prune wave's row (W19/W20/W06/W29 own their own row+slug deletions; W18 authors the tree + re-baselines `EXPECTED_TREE` LAST); remove every `dock-active-tokens` relocate instruction (W06 DELETES it); correct "FOUR categories" → "THREE". *(Closes the fabricated witness + the three manifest-ownership contradictions.)*
5. **waves/AX.W25a** — re-base RED witness 2 + the gate-probe from dir-existence to **class-string-findability** (`dist/components/` EXISTS with only `.d.ts`; assert the `@source` directive reaches a directory with ≥1 class-string-bearing `dist/*.js`, proven by a sentinel-class probe). *(Closes the GREEN-at-HEAD-ships-the-defect trap.)*
6. **waves/AX.W17** — strengthen `proof:constellation-tokens` clause (c): forbid ANY `var(` reference to a `light-dark()`-bearing token (`--neutral-*`/`--foreground`/`--background`/`--card`/…) inside a `--constellation-*` declaration, not just the literal substring; HOIST `toLocal` out of the `if (pointerReactive…)` block + register the warp pointerdown on its own `(warpOnClick && …)` guard. *(Closes the transitive-var Canvas2D re-admit + the unreachable-`toLocal` blocker.)*
7. **waves/AX.W30** — rewrite State to the §24 reality (slides `d79091e`, CLEAN, H committed, leak fixed at `constellation.ts:116`, deck deployed `9f08ded`); replace the SELECTIVE-stranded-land with the branch protocol (cut `tranche/AX-slides` FORWARD from `deck/feedback-coder`; FileBounds = `src/decks/til-briefing/**` + shared, `feedback-coder/**` hard out-of-bounds); add the merge-to-main → deploy terminal. *(Closes the stale-premise + unreachable-deploy blockers.)*
8. **DOCK-FACILITIES.md + PROTOTYPE-HARDEN.md** — materialize the stub TOCs into the actual §19 12-facility matrix (one row per 19.1-19.12: facility · current-state · owning-wave · prototype-effort · GO/NO-GO · visual-truth gate) + the 17-PoC backlog. Resolve §19.6 carousel-dock (NON-GOAL + W06 demo section) and §19.8 useIdle (inline `scheduleCollapse`, owned by W26) inline. *(Closes the §19 drive-readiness gate being an empty stub.)*

**TIER 1 — MAJORS (clear before the band drives):**

9. **AX.md line 1781** — append "PUBLISH" + the in-repo-prune disjunction so no edge-extractor reads W19↔W35 as a cycle (match §1 line 164 + the W19/W20/W35 specs).
10. **AX.md** — add the verified shared-file writer matrix (§C.2) to §22 item 4, replacing the under-counting prose; state the lock-manager-keys-on-filename rule.
11. **AX.md §4** — add notes 28 (§6.6 diffuse routing + W40 interaction-cohesion axis), 29 (§2.9/§3.5/§4.4 README split), extend note 7 (§2.3 derive-color seam), add §2.4-EXCISE-discharge note, §11.4/§11.5 routing note; extend the W33 cross-walk to `§11 + §13 + §14`.
12. **AX.md §4 note (band reconcile)** — add the **opaque-fraction band reconcile**: W00 owns the LOOSE non-flood floor (~0.10-0.70); W08 owns the TIGHT contained band (0.25-0.6) as a strict SUBSET. Update W00 (`:32/:114`) + W08 (gate clause 1) to subset-consistency.
13. **waves/AX.W04** — re-point the morph mechanism from "transitions on `--dock-motion-resize`" to "reads via `calc()` off `--dock-morph-t`" at every site incl. the GATE (lines 256-257) + delete the stale "box-shadow already in the transition list" parenthetical.
14. **waves/AX.W42** — fix the `useLayerTransition` path to `dock/composables/`; add the scalar-name bridge (`useLiquidMorph` writes a consumer-namespaced scalar; the dock supplies `--dock-morph-t`; dock.css reads untouched); add `AX.W02` to dependsOn (encode "W42 follows W02"); add `proof:dock-animation-live` regression-rerun to HardGate; add the §19.11 dock-self-reshape fold (narrowed to superellipse-k-continuous + discrete-custom-presets, NOT "arbitrary silhouettes").
15. **waves/AX.W07** — add the Metal-backend-coverage note (defect 1b is Metal-specific; the non-Metal CI gate proves 1a only; the dev-Mac live audit is the binding 1b GO criterion) + the device-absent befitting-silent-SKIP disposition.
16. **waves/AX.W13** — add `proof:aurora-painterly-statistics` (atomicity gap-fraction + no-flat-fills variance + OKLab overlap-not-grey + four-media-distinct — the operationalized "stunning" bar from the corpus); dual-tier the close (human side-by-side = enrichment; the numeric gate = the unattended close); name a public-domain Starry Night fixture; add the `strokeMode:"crayon"` consumer-sweep cadence step.
17. **waves/AX.W26** — correct the `dock/composables/index.ts` barrel-collision (acknowledge W01/W02/W03 co-edit; serialize W26's edit AFTER the dock band); fix the GlassDock.vue:204 reader-relationship (the consumer is GlassDock.vue, not useLayerTransition); add the §19.8 idle-collapse delay-model ratification + §19.9 click/aria verification (W26 is the only useDockState editor).
18. **waves/AX.W32** — correct the vReveal subpath (root barrel + `/motion-core`, NOT `/motion` — a build break); re-baseline the `^3.4.0` pin to `^3.7.0` (useCountup adoptable NOW; only DeckProgress needs the 3.8.0 cut); add the merge-to-main → deploy + the slides-live prod-validation assertion.
19. **waves/AX.W34** — add **USF as the eighth consumer-adoption ledger row** (`^3.6.0 → 3.8.0` + the two born-RED USF visual gates) + bump every "seven consumers" → "eight" (incl. the carry-closure witness so W33's `proof:ax-final` recognizes the USF leg); enumerate the five §20 named kf consume-gates as explicit `{close-gate}` tags; add per-leg sibling-cleanliness eligibility (clean-NOW vs handoff-patch).
20. **waves/AX.W30/W28** — designate W28 the sole OPENER of `coordination/CONSTELLATION.md` (W30 → EDIT/APPEND); pin ONE canonical path repo-root `coordination/CONSTELLATION.md` (fix W34 witness 1, W33's 3 refs, W30's absolute path); add the W28 born-RED gate-0 that creates the doc before any cross-repo wave reads it.
21. **waves/AX.W20** — re-weight the native-dialog fold to CONDITIONAL (zero constellation demand + reka-portal-bypass risk → default is scrim-root-fix + orphan-DELETE, not fold); add the `api/index.ts:217` comment rewrite (deletion-proof grep) + the `native-top-layer` IA-slug reconcile + the shadow-toggle card-side mechanism (`:data-shadow` + `shadow-none`, keeping glass.css untouched).

**TIER 2 — MINORS (apply in the same pass; non-blocking):**

22. **waves/AX.W40** — add `**dependsOn** AX.W06, AX.W18` to the header line (DAG-parse robustness).
23. **waves/AX.W14** — add the autonomous-default fallthrough to the RATIFY (proceed Branch B EXCISE if no over-ride within the wave window).
24. **waves/AX.W22** — fix `demo/index.html` → repo-root `index.html` (the deletion-PROOF grep false-GREENs on a non-existent path) in 3 places.
25. **waves/AX.W21** — add fold (8) kf-G-3 (`LabeledField orientation="horizontal"` + label-action slot) + the kf-G-6 RATIFY; fix `:101→:95`; note configurator is vueuse-FREE (the demote rests on size, not the SCC trap).
26. **waves/AX.W23** — broaden the gate to "active emits a real morph (width OR transform)" so the width-only DeckPager oracle passes.
27. **waves/AX.W15** — convert the wrapper-linear ~70-80% figure to the canvas opaque-fraction band (unit reconcile vs W08's 0.25-0.6); add `AX.W11` to dependsOn + own the `warmCream` (`metaball.frag.ts:359`) → `/color` re-route; wire the dead `orbitSpeedScale`/`wobbleScale`.
28. **waves/AX.W09** — symmetrize the glass.css co-writer set (vs W24/W42); correct the `--mouse-x/y` (host write) vs `--specular-x/y` (CSS-internal mapped channel) vocab in the §20 prose; ratify the Card `specular` default = `subtle` (rest≈0) per §21's no-user-gate mandate.
29. **All specs (standing note)** — line numbers are `eaba94f`-relative; HEAD is `cdcf331` (src baseline unchanged); re-locate cited symbols BY NAME at impl time, never by raw line. Add to each Cadence step-1 live-re-diagnosis ritual; convert package.json/charter citations to content/grep anchors (W19/W20 package.json blocks drifted ~7 lines).
30. **PROTOTYPE-HARDEN.md** — strike the stale W42-charter-orphan bullet (W42 is now in §1/§2/§3/§5 + W33's enumeration after edit #3); the remaining open hinge is only the §5.3 distinct-wave-vs-fold + second-consumer RATIFY.

---

## §H — DRIVE-READY verdict

**GO — once the eight TIER-0 blockers are cleared.** The tranche is architecturally drive-ready end-to-end: routing is complete, the DAG is acyclic and correctly ordered, the cross-repo sequencing is inv-16'-safe, the gates are falsifiable born-RED→GREEN with the mandatory VISUAL-TRUTH close, and ZERO hard user-gates stand between the drive and the §21 end-state. But it MUST NOT be dispatched into the 12-hour unattended run until the following are cleared in one pass:

**BLOCKERS (TIER 0 — non-negotiable before dispatch):**

1. **§21 EXECUTION MANDATE unrouted into AX.md + §0↔§21 contradiction** — agents inherit "no publish, halt on scope" while the mandate is "publish + deploy end-to-end." *(Edit 1.)*
2. **§22.4b autonomous-resilience clause absent on all 45 waves + AX.md** — a roadblock stalls the run instead of triggering a tangent fix. *(Edit 2.)*
3. **W33 drops W42 from its close enumeration** — the morph substrate ships un-gated through the terminal that exists to prevent exactly that. *(Edit 3.)*
4. **W18 fabricated RED witness + three manifest-row ownership contradictions** — a parallel-dispatch clobber on the shared `manifest.ts` + an unfalsifiable witness. *(Edit 4.)*
5. **W25a + W17 GREEN-at-HEAD-ships-the-defect traps** — the cardinal AW failure re-entering through AX's own gates (dir-existence vs class-strings; literal-substring vs transitive `light-dark()`). *(Edits 5, 6.)*
6. **W30 stale git premise + unreachable deploy terminal** — an agent re-lands already-committed work and never reaches `main`, so the slides deploy never fires. *(Edit 7.)*
7. **DOCK-FACILITIES.md + PROTOTYPE-HARDEN.md are stub TOCs** — the §19 drive-readiness gate the whole dock band routes through contains a description of its table, not the table. *(Edit 8.)*

These eight are all spec-text edits (no src), apply verbatim, change no scope/dependsOn/gate-logic except to fix the contradictions, and are pre-resolved in §G. **Apply TIER 0 + the TIER 1 majors that gate the first bands (the opaque-fraction reconcile #12, W04 #13, W42 #14 for the dock band; W07 #15 for graphics) in the orchestrator's pre-drive pass; the remaining TIER 1/2 land incrementally as their bands open.** With TIER 0 cleared, AX **drives end-to-end in one shot** to glass-ui 3.8.0 published + slides.friday.institute deployed + every consumer adopted, all visually-true under the fail-CLOSED π lane.
